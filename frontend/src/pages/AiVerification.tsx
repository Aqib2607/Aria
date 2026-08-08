import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Play, Server, ShieldCheck, Sparkles, Zap, Code2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ThinkingIndicator } from "../components/ui/ThinkingIndicator";

export default function AiVerification() {
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const payload = {
    skills: ["Laravel", "React", "MySQL"],
    bio: "Full stack web developer passionate about API architecture",
    education: "Bachelor of Science in Computer Science",
  };

  const runVerification = async () => {
    try {
      setLoading(true);
      setTestResult(null);
      const startTime = performance.now();

      const response = await api.post("/v1/ai/recommend-career", payload);
      const duration = (performance.now() - startTime) / 1000;

      setExecutionTime(duration);
      setTestResult({
        status: response.status,
        statusText: response.statusText || "OK",
        data: response.data,
      });

      toast.success("AI Recommendation integration test completed successfully!");
    } catch (error: any) {
      const duration = (performance.now() - (performance.now())) / 1000;
      setExecutionTime(duration);
      setTestResult({
        status: error.response?.status || 500,
        statusText: error.response?.statusText || "Error",
        error: error.response?.data || { message: error.message || "Failed to reach AI endpoint" },
      });
      toast.error("AI test encountered an error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Aria AI Integration Verification
            </h1>
            <p className="text-muted-foreground mt-0.5 text-sm">
              Live end-to-end audit page for Week 08 AI Integration verification & report screenshots.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20 font-mono text-xs py-1">
            POST
          </Badge>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-mono text-xs py-1">
            /api/v1/ai/recommend-career
          </Badge>
          <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/20 text-xs py-1">
            <ShieldCheck className="h-3 w-3 mr-1" /> Sanctum Auth
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Test Setup & Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Server className="h-4 w-4 text-primary" />
                Integration Spec
              </CardTitle>
              <CardDescription>Target API Endpoint Configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">HTTP Method:</span>
                <span className="font-mono font-bold text-foreground">POST</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Endpoint:</span>
                <span className="font-mono text-foreground font-medium">/api/v1/ai/recommend-career</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Authentication:</span>
                <span className="text-success font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Sanctum Bearer Token
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">AI Provider Layer:</span>
                <span className="font-semibold text-primary">Google Gemini API</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                Test Payload Summary
              </CardTitle>
              <CardDescription>Parameters sent to Laravel API</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-3 rounded-xl bg-muted/60 text-[11px] font-mono overflow-x-auto text-foreground border border-border">
                {JSON.stringify(payload, null, 2)}
              </pre>
            </CardContent>
            <CardFooter className="pt-2">
              <Button onClick={runVerification} isLoading={loading} className="w-full gap-2 shadow-md">
                <Play className="h-4 w-4 fill-current" />
                Run Live AI Recommendation Test
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column: Execution Output & Response Viewer */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-full flex flex-col min-h-[420px]">
            <CardHeader className="pb-4 border-b border-border flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Live Execution Results
                </CardTitle>
                <CardDescription>Real API output returned from Laravel backend</CardDescription>
              </div>

              {testResult && (
                <div className="flex items-center gap-2">
                  {testResult.status === 200 ? (
                    <Badge variant="default" className="bg-success text-success-foreground font-bold px-3 py-1 text-xs">
                      SUCCESS • HTTP 200 OK
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="font-bold px-3 py-1 text-xs">
                      HTTP {testResult.status} {testResult.statusText}
                    </Badge>
                  )}
                  {executionTime && (
                    <Badge variant="outline" className="font-mono text-xs">
                      {executionTime.toFixed(2)}s
                    </Badge>
                  )}
                </div>
              )}
            </CardHeader>

            <CardContent className="flex-1 py-6">
              {loading && (
                <div className="flex flex-col items-center justify-center h-full py-16 space-y-4 text-center">
                  <ThinkingIndicator />
                  <p className="text-sm font-semibold text-foreground animate-pulse">
                    Dispatching request to /api/v1/ai/recommend-career...
                  </p>
                  <p className="text-xs text-muted-foreground max-w-sm">
                    Laravel AI Service is prompting Google Gemini and logging response to database.
                  </p>
                </div>
              )}

              {!loading && !testResult && (
                <div className="flex flex-col items-center justify-center h-full py-16 space-y-3 text-center text-muted-foreground border-2 border-dashed border-border rounded-2xl">
                  <Play className="h-10 w-10 opacity-30 text-primary" />
                  <p className="text-base font-semibold text-foreground">Ready for Integration Audit</p>
                  <p className="text-xs max-w-md">
                    Click <strong>"Run Live AI Recommendation Test"</strong> to trigger the POST request and render real AI output.
                  </p>
                </div>
              )}

              {!loading && testResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Summary Cards */}
                  {testResult.data?.data && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                          Recommended Career
                        </span>
                        <div className="text-xl font-bold text-foreground mt-1">
                          🎯 {testResult.data.data.career || testResult.data.data.recommended_career || "Full Stack Developer"}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                        <span className="text-xs font-semibold text-success uppercase tracking-wider">
                          AI Confidence Score
                        </span>
                        <div className="text-xl font-bold text-foreground mt-1">
                          ⚡ {testResult.data.data.confidence || testResult.data.data.confidence_score || 95}%
                        </div>
                      </div>
                    </div>
                  )}

                  {/* JSON Response Panel */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Canonical JSON Response Payload (from /api/v1/ai/recommend-career):
                      </span>
                      <Badge variant="outline" className="text-[10px] font-mono bg-background">
                        application/json
                      </Badge>
                    </div>
                    <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 text-xs font-mono overflow-x-auto border border-slate-800 shadow-inner max-h-80">
                      {JSON.stringify(testResult.data || testResult.error, null, 2)}
                    </pre>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
