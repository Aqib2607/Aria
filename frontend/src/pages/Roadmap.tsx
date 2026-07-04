import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, Sparkles, Map } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import { ThinkingIndicator } from "../components/ui/ThinkingIndicator";

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  estimated_hours: number;
  completion_status: "pending" | "completed";
}

interface RoadmapProgress {
  roadmap_id: number;
  title: string;
  total_steps: number;
  completed_steps: number;
  percentage: number;
  steps?: RoadmapStep[];
}

export default function Roadmap() {
  const [loading, setLoading] = useState(false);
  const [progressData, setProgressData] = useState<RoadmapProgress[]>([]);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await api.get("/progress");
      setProgressData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch progress", error);
    }
  };

  const handleCompleteStep = async (stepId: number) => {
    try {
      const response = await api.post("/progress/complete-step", { step_id: stepId });
      setProgressData(response.data.data);
      toast.success("Step completed!");
    } catch (error) {
      toast.error("Failed to complete step.");
    }
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      career_title: "Full Stack Developer",
      missing_skills: "React, Node.js, TypeScript",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const payload = {
        career_title: data.career_title,
        missing_skills: data.missing_skills.split(",").map((s: string) => s.trim()),
      };

      await api.post("/ai/generate-roadmap", payload);
      toast.success("Roadmap generated successfully!");
      fetchProgress();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Map className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Learning Roadmaps</h1>
          <p className="text-muted-foreground mt-1">
            Track your progress and AI-generated learning paths.
          </p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Generate AI Roadmap
            </CardTitle>
            <CardDescription>
              Tell Gemini your target career and what skills you are missing to get a personalized roadmap.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="career_title">Target Career</Label>
                  <Input id="career_title" {...register("career_title")} className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="missing_skills">Missing Skills (comma separated)</Label>
                  <Input id="missing_skills" {...register("missing_skills")} className="bg-background" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-2">
              <Button type="submit" isLoading={loading}>
                Generate New AI Roadmap
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center space-x-3 text-muted-foreground pt-2"
          >
            <ThinkingIndicator />
            <span className="text-sm font-medium animate-pulse">Aria is analyzing your skills and generating a custom roadmap...</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 pt-4">
        <AnimatePresence>
          {progressData.map((progress, idx) => (
            <motion.div
              key={progress.roadmap_id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>{progress.title}</CardTitle>
                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground mb-1">
                    <span>
                      {progress.completed_steps} of {progress.total_steps} steps completed
                    </span>
                    <span className="font-medium text-foreground">{progress.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </CardHeader>

                {progress.steps && progress.steps.length > 0 && (
                  <CardContent>
                    <div className="space-y-3 pt-2">
                      <h3 className="font-medium text-foreground text-sm uppercase tracking-wider mb-3">
                        Roadmap Steps
                      </h3>
                      {progress.steps.map((step) => {
                        const isCompleted = step.completion_status === "completed";
                        return (
                          <motion.div
                            key={step.id}
                            layout
                            className={`flex items-start p-4 rounded-xl border transition-colors ${
                              isCompleted
                                ? "bg-muted/50 border-border/50"
                                : "bg-card border-border hover:border-primary/50"
                            }`}
                          >
                            <button
                              onClick={() => handleCompleteStep(step.id)}
                              disabled={isCompleted}
                              className={`mt-0.5 flex-shrink-0 transition-colors ${
                                isCompleted ? "text-success cursor-default" : "text-muted-foreground hover:text-primary"
                              }`}
                            >
                              {isCompleted ? <CheckCircle size={22} /> : <Circle size={22} />}
                            </button>
                            <div className="ml-4 flex-1">
                              <p
                                className={`text-sm font-semibold ${
                                  isCompleted ? "text-muted-foreground line-through" : "text-foreground"
                                }`}
                              >
                                {step.title} <span className="text-muted-foreground font-normal ml-1">({step.estimated_hours}h)</span>
                              </p>
                              {step.description && (
                                <p className={`text-sm mt-1.5 ${isCompleted ? "text-muted-foreground/70" : "text-muted-foreground"}`}>
                                  {step.description}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
