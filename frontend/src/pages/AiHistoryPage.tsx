import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  Search,
  Trash2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Target,
  Map,
  MessageSquare,
  Library,
  Clock,
  Zap,
  Bot,
  Copy,
  Check,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import api from "../services/api";
import { useAiHistories } from "../hooks/useDashboardData";

import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Skeleton";

interface AiHistoryRecord {
  id: number;
  feature: string;
  prompt: string;
  response: any;
  execution_time: number;
  created_at: string;
}

export default function AiHistoryPage() {
  const queryClient = useQueryClient();
  const { data: aiHistories, isLoading } = useAiHistories();
  const [search, setSearch] = useState("");
  const [selectedFeature, setSelectedFeature] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const getFeatureConfig = (feature: string) => {
    switch (feature) {
      case "career_recommendation":
        return { label: "Career Recommendation", icon: Briefcase, color: "bg-purple-500/10 text-purple-600 border-purple-500/20" };
      case "skill_gap_analysis":
        return { label: "Skill Gap Analysis", icon: Target, color: "bg-amber-500/10 text-amber-600 border-amber-500/20" };
      case "learning_roadmap":
        return { label: "Learning Roadmap", icon: Map, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" };
      case "interview_prep":
        return { label: "Interview Prep", icon: MessageSquare, color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" };
      case "resource_recommendation":
        return { label: "Resource Recommendation", icon: Library, color: "bg-rose-500/10 text-rose-600 border-rose-500/20" };
      default:
        return { label: feature.replace(/_/g, " "), icon: Bot, color: "bg-primary/10 text-primary border-primary/20" };
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await api.delete(`/ai-histories/${id}`);
      await queryClient.invalidateQueries({ queryKey: ["ai-histories"] });
      toast.success("History record removed");
    } catch (error: any) {
      toast.error("Failed to delete history record");
    } finally {
      setDeletingId(null);
    }
  };

  const copyToClipboard = (id: number, content: any) => {
    const text = typeof content === "string" ? content : JSON.stringify(content, null, 2);
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Response copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredHistories = (aiHistories || []).filter((item: AiHistoryRecord) => {
    const matchesSearch =
      item.feature.toLowerCase().includes(search.toLowerCase()) ||
      item.prompt.toLowerCase().includes(search.toLowerCase()) ||
      JSON.stringify(item.response || "").toLowerCase().includes(search.toLowerCase());

    const matchesFeature = selectedFeature === "all" || item.feature === selectedFeature;

    return matchesSearch && matchesFeature;
  });

  const featureTabs = [
    { id: "all", label: "All Logs" },
    { id: "career_recommendation", label: "Careers" },
    { id: "skill_gap_analysis", label: "Skill Gaps" },
    { id: "learning_roadmap", label: "Roadmaps" },
    { id: "interview_prep", label: "Interview Prep" },
    { id: "resource_recommendation", label: "Resources" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <History className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Intelligence History</h1>
            <p className="text-muted-foreground mt-0.5">
              Review and revisit your previously generated AI recommendations and responses.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts or responses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>

          <div className="flex flex-wrap gap-1 w-full md:w-auto">
            {featureTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFeature(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedFeature === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* History List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      ) : filteredHistories.length > 0 ? (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredHistories.map((record: AiHistoryRecord, idx: number) => {
              const config = getFeatureConfig(record.feature);
              const FeatureIcon = config.icon;
              const isExpanded = expandedId === record.id;

              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.03 }}
                >
                  <Card className="overflow-hidden border hover:border-primary/40 transition-colors">
                    <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        <div className={`p-2.5 rounded-xl border shrink-0 ${config.color}`}>
                          <FeatureIcon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-foreground text-base capitalize">
                              {config.label}
                            </span>
                            <Badge variant="outline" className={`text-[10px] py-0 px-2 uppercase font-medium ${config.color}`}>
                              AI Generated
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {record.prompt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {format(parseISO(record.created_at), "MMM d, yyyy • h:mm a")}
                            </span>
                            {record.execution_time > 0 && (
                              <span className="flex items-center gap-1">
                                <Zap className="h-3 w-3 text-amber-500" />
                                {record.execution_time.toFixed(2)}s
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(record.id, record.response)}
                          className="h-8 px-2.5 text-xs gap-1 text-muted-foreground hover:text-foreground"
                          title="Copy AI Response"
                        >
                          {copiedId === record.id ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                          <span className="hidden sm:inline">{copiedId === record.id ? "Copied" : "Copy"}</span>
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleExpand(record.id)}
                          className="h-8 px-3 text-xs gap-1"
                        >
                          {isExpanded ? (
                            <>
                              Hide Output <ChevronUp className="h-3.5 w-3.5" />
                            </>
                          ) : (
                            <>
                              View Output <ChevronDown className="h-3.5 w-3.5" />
                            </>
                          )}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(record.id)}
                          isLoading={deletingId === record.id}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          title="Delete Record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Expandable Response Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-border bg-muted/30 p-5 overflow-hidden space-y-4"
                        >
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                              Prompt Context:
                            </h4>
                            <div className="p-3 rounded-lg bg-background border border-border text-xs text-foreground font-mono whitespace-pre-wrap">
                              {record.prompt}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                              Generated AI Output:
                            </h4>
                            <ResponseViewer response={record.response} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <Card className="p-12 text-center space-y-3 border-dashed">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <History className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No AI History Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            {search
              ? "No activities matched your search criteria."
              : "Generate career goals, roadmaps, interview preps, or skill gap analyses to see your history here."}
          </p>
        </Card>
      )}
    </div>
  );
}

function ResponseViewer({ response }: { response: any }) {
  if (!response) {
    return <p className="text-xs text-muted-foreground italic">No response payload stored.</p>;
  }

  // Render structured skill gap response
  if (response.missing_skills || response.recommendations) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {response.missing_skills && (
          <div className="p-3.5 rounded-xl border border-destructive/20 bg-destructive/5 space-y-2">
            <span className="text-xs font-bold text-destructive uppercase tracking-wider">Missing Skills</span>
            <div className="flex flex-wrap gap-1.5">
              {response.missing_skills.map((s: string, i: number) => (
                <Badge key={i} variant="destructive" className="text-xs">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {response.recommendations && (
          <div className="p-3.5 rounded-xl border border-success/20 bg-success/5 space-y-2">
            <span className="text-xs font-bold text-success uppercase tracking-wider">Recommendations</span>
            <ul className="text-xs space-y-1 text-foreground list-disc list-inside">
              {response.recommendations.map((r: string, i: number) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Render structured interview questions
  if (response.questions && Array.isArray(response.questions)) {
    return (
      <div className="space-y-3">
        {response.questions.map((q: any, i: number) => (
          <div key={i} className="p-3.5 rounded-xl border border-border bg-background space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary">Question {i + 1}</span>
              {q.type && <Badge variant="outline" className="text-[10px]">{q.type}</Badge>}
            </div>
            <p className="text-xs font-semibold text-foreground">{q.question}</p>
            {q.explanation && (
              <p className="text-xs text-muted-foreground pt-1 border-t border-border/40 mt-1">
                <span className="font-semibold">Explanation:</span> {q.explanation}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Render structured resources
  if (response.resources && Array.isArray(response.resources)) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {response.resources.map((res: any, i: number) => (
          <div key={i} className="p-3 rounded-xl border border-border bg-background space-y-1">
            <span className="text-xs font-bold text-foreground line-clamp-1">{res.title}</span>
            <p className="text-[11px] text-muted-foreground">Provider: {res.provider} • {res.difficulty}</p>
            {res.url && (
              <a href={res.url} target="_blank" rel="noreferrer" className="text-xs text-primary underline block pt-1">
                Visit Resource
              </a>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Render structured roadmap steps
  if (response.steps && Array.isArray(response.steps)) {
    return (
      <div className="space-y-2">
        {response.steps.map((step: any, i: number) => (
          <div key={i} className="p-3 rounded-xl border border-border bg-background flex justify-between items-start gap-2">
            <div>
              <span className="text-xs font-semibold text-foreground">
                Step {i + 1}: {step.title}
              </span>
              {step.description && <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>}
            </div>
            {step.estimated_hours && (
              <Badge variant="secondary" className="text-[10px] shrink-0">
                {step.estimated_hours}h
              </Badge>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Fallback: Code block / Preformatted JSON
  return (
    <pre className="p-3 rounded-xl bg-background border border-border text-xs font-mono overflow-x-auto text-foreground max-h-60">
      {typeof response === "string" ? response : JSON.stringify(response, null, 2)}
    </pre>
  );
}
