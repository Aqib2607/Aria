import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  KeyRound,
  Eye,
  EyeOff,
  Save,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Copy,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";

interface ApiKeyRecord {
  id: number;
  provider: string;
  key_masked: string;
  is_active: boolean;
  updated_at: string;
}

interface ProviderConfig {
  id: string;
  name: string;
  description: string;
  docsUrl: string;
  placeholder: string;
  gradient: string;
  icon: string;
}

const PROVIDERS: ProviderConfig[] = [
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Google's capable multimodal models.",
    docsUrl: "https://aistudio.google.com/app/apikey",
    placeholder: "AIza••••••••••••••••••••••••••••••••••••",
    gradient: "from-blue-500/10 via-purple-500/10 to-pink-500/10",
    icon: "✦",
  },
  {
    id: "openai",
    name: "OpenAI",
    description: "Industry-leading models like GPT-4o.",
    docsUrl: "https://platform.openai.com/api-keys",
    placeholder: "sk-proj-••••••••••••••••••••••••••••••",
    gradient: "from-green-500/10 via-emerald-500/10 to-teal-500/10",
    icon: "O",
  },
  {
    id: "anthropic",
    name: "Anthropic Claude",
    description: "Highly capable and steerable models like Claude 3.5 Sonnet.",
    docsUrl: "https://console.anthropic.com/settings/keys",
    placeholder: "sk-ant-••••••••••••••••••••••••••••••",
    gradient: "from-orange-500/10 via-amber-500/10 to-yellow-500/10",
    icon: "A",
  },
  {
    id: "groq",
    name: "Groq",
    description: "Ultra-fast LPU inference for open-source models like Llama 3.",
    docsUrl: "https://console.groq.com/keys",
    placeholder: "gsk_••••••••••••••••••••••••••••••••",
    gradient: "from-red-500/10 via-rose-500/10 to-pink-500/10",
    icon: "G",
  },
  {
    id: "zenmux",
    name: "Zenmux",
    description: "Pay-as-you-go API platform.",
    docsUrl: "https://zenmux.ai/platform/pay-as-you-go",
    placeholder: "zm-••••••••••••••••••••••••••••••••",
    gradient: "from-indigo-500/10 via-cyan-500/10 to-blue-500/10",
    icon: "Z",
  }
];

export default function ApiKeys() {
  const [keys, setKeys] = useState<Record<string, ApiKeyRecord>>({});
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [revoking, setRevoking] = useState<Record<string, boolean>>({});
  const [activating, setActivating] = useState<Record<string, boolean>>({});
  const [confirmRevoke, setConfirmRevoke] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedProviderId, setSelectedProviderId] = useState<string>("gemini");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const res = await api.get("/api-keys");
      const map: Record<string, ApiKeyRecord> = {};
      res.data.data.forEach((k: ApiKeyRecord) => {
        map[k.provider] = k;
      });
      setKeys(map);
    } catch {
      // silently fail — user simply has no keys saved yet
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (provider: string) => {
    const value = inputs[provider]?.trim();
    if (!value) {
      toast.error("Please enter an API key.");
      return;
    }
    setSaving((s) => ({ ...s, [provider]: true }));
    try {
      await api.post("/api-keys", { provider, api_key: value });
      toast.success("API key saved successfully!");
      setInputs((i) => ({ ...i, [provider]: "" }));
      await fetchKeys();
    } catch {
      toast.error("Failed to save API key. Please try again.");
    } finally {
      setSaving((s) => ({ ...s, [provider]: false }));
    }
  };

  const handleRevoke = async (provider: string) => {
    setRevoking((r) => ({ ...r, [provider]: true }));
    try {
      await api.delete(`/api-keys/${provider}`);
      toast.success("API key revoked.");
      setKeys((k) => {
        const next = { ...k };
        delete next[provider];
        return next;
      });
      setConfirmRevoke(null);
    } catch {
      toast.error("Failed to revoke key. Please try again.");
    } finally {
      setRevoking((r) => ({ ...r, [provider]: false }));
    }
  };

  const handleSetActive = async (provider: string) => {
    setActivating((a) => ({ ...a, [provider]: true }));
    try {
      await api.post(`/api-keys/${provider}/active`);
      toast.success(`${provider} set as active!`);
      await fetchKeys();
    } catch {
      toast.error("Failed to set active provider.");
    } finally {
      setActivating((a) => ({ ...a, [provider]: false }));
    }
  };

  const handleCopyMasked = (provider: string) => {
    const masked = keys[provider]?.key_masked ?? "";
    navigator.clipboard.writeText(masked).catch(() => {});
    setCopied(provider);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start gap-4"
      >
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shadow-sm">
          <KeyRound className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">API Keys</h1>
          <p className="text-muted-foreground mt-1 max-w-lg">
            Connect your AI provider keys to unlock all intelligent features in Aria. Your keys are
            encrypted and never shared.
          </p>
        </div>
      </motion.div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4"
      >
        <ShieldCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">End-to-end encrypted.</span> API keys are
          encrypted with AES-256 before being stored in the database. We never log or transmit your
          key in plaintext.
        </div>
      </motion.div>

      {/* Provider Cards */}
      {loading ? (
        <div className="space-y-4">
          <div className="h-64 rounded-2xl bg-muted animate-pulse" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-2">
            {PROVIDERS.map(p => {
              const hasKey = !!keys[p.id];
              const isActive = hasKey && keys[p.id].is_active;
              return (
                <button 
                  key={p.id}
                  onClick={() => setSelectedProviderId(p.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${selectedProviderId === p.id ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                >
                  {p.name}
                  {isActive && <CheckCircle2 className={`h-3.5 w-3.5 ${selectedProviderId === p.id ? 'text-emerald-300' : 'text-emerald-500'}`} />}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
          {PROVIDERS.filter(p => p.id === selectedProviderId).map((provider) => {
            const saved = keys[provider.id];
            const hasKey = !!saved;

            return (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* Gradient top bar */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${provider.gradient} opacity-80`} />

                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                          {provider.icon}
                        </div>
                        <div>
                          <CardTitle className="text-base flex items-center gap-2">
                            {provider.name}
                            {hasKey && saved.is_active && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="h-3 w-3" />
                                Active
                              </span>
                            )}
                            {hasKey && !saved.is_active && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 text-xs px-2"
                                isLoading={activating[provider.id]}
                                onClick={() => handleSetActive(provider.id)}
                              >
                                Set Active
                              </Button>
                            )}
                            {!hasKey && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-muted border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                <AlertCircle className="h-3 w-3" />
                                Not set
                              </span>
                            )}
                          </CardTitle>
                          <CardDescription className="text-xs mt-0.5">
                            {provider.description}
                          </CardDescription>
                        </div>
                      </div>
                      <a
                        href={provider.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                      >
                        Get API Key
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-5 pb-6">
                    {/* Currently saved key display */}
                    {hasKey && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="rounded-xl bg-muted/60 border border-border/60 p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                            Current Key
                          </Label>
                          <span className="text-xs text-muted-foreground">
                            Last updated:{" "}
                            {new Date(saved.updated_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <code
                            className="flex-1 font-mono text-sm text-foreground/80 tracking-widest truncate"
                          >
                            {showKey[provider.id] ? saved.key_masked : saved.key_masked}
                          </code>
                          <button
                            onClick={() => handleCopyMasked(provider.id)}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            title="Copy masked key"
                          >
                            {copied === provider.id ? (
                              <Check className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Input row */}
                    <div className="space-y-2">
                      <Label htmlFor={`key-${provider.id}`} className="text-sm font-medium">
                        {hasKey ? "Replace Key" : "Enter API Key"}
                      </Label>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <Input
                            id={`key-${provider.id}`}
                            type={showKey[provider.id] ? "text" : "password"}
                            placeholder={provider.placeholder}
                            value={inputs[provider.id] ?? ""}
                            onChange={(e) =>
                              setInputs((i) => ({ ...i, [provider.id]: e.target.value }))
                            }
                            className="pr-10 font-mono text-sm"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSave(provider.id);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowKey((s) => ({ ...s, [provider.id]: !s[provider.id] }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            tabIndex={-1}
                          >
                            {showKey[provider.id] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        <Button
                          onClick={() => handleSave(provider.id)}
                          isLoading={saving[provider.id]}
                          disabled={!inputs[provider.id]?.trim()}
                          className="shrink-0 gap-2"
                        >
                          <Save className="h-4 w-4" />
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Paste your key above and click Save. It will be encrypted immediately.
                      </p>
                    </div>

                    {/* Revoke section */}
                    {hasKey && (
                      <div className="pt-2 border-t border-border/60">
                        <AnimatePresence mode="wait">
                          {confirmRevoke === provider.id ? (
                            <motion.div
                              key="confirm"
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className="flex items-center gap-3 flex-wrap"
                            >
                              <p className="text-sm text-destructive font-medium">
                                Are you sure? This will disable all AI features.
                              </p>
                              <div className="flex gap-2 ml-auto">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setConfirmRevoke(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  isLoading={revoking[provider.id]}
                                  onClick={() => handleRevoke(provider.id)}
                                  className="gap-1.5"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Revoke
                                </Button>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="revoke-btn"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setConfirmRevoke(provider.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Revoke Key
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>
      )}

    </div>
  );
}
