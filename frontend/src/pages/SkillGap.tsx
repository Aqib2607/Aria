import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Search, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";
import { useCareers } from "../hooks/useDashboardData";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ThinkingIndicator } from "../components/ui/ThinkingIndicator";

interface SkillGapResponse {
  missing_skills: string[];
  recommendations: string[];
}

export default function SkillGap() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SkillGapResponse | null>(null);
  const { data: careers } = useCareers();
  const currentGoal = careers && careers.length > 0 ? careers[careers.length - 1] : null;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      career_title: "Full Stack Developer",
      current_skills: "HTML, CSS, JavaScript",
    },
  });

  useEffect(() => {
    if (currentGoal) {
      reset({
        career_title: currentGoal.target_role || "Full Stack Developer",
        current_skills: currentGoal.current_skills_string || (Array.isArray(currentGoal.current_skills) ? currentGoal.current_skills.join(", ") : ""),
      });
    }
  }, [currentGoal, reset]);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const payload = {
        career_title: data.career_title,
        current_skills: data.current_skills.split(",").map((s: string) => s.trim()).filter(Boolean),
      };

      const response = await api.post("/ai/analyze-skills", payload);
      setAnalysis(response.data.data);
      toast.success("Skill gap analyzed successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to analyze skills");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Target className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Skill Gap Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Discover what you need to learn to reach your career goal.
          </p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Analyze Skills
            </CardTitle>
            <CardDescription>
              Aria auto-filled your target career and saved skills from your Career Goals.
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
                  <Label htmlFor="current_skills">Current Skills (comma separated)</Label>
                  <Input id="current_skills" {...register("current_skills")} className="bg-background" />
                </div>
              </div>

              {currentGoal && currentGoal.current_skills && currentGoal.current_skills.length > 0 && (
                <div className="pt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  <span>Using saved skills from your profile:</span>
                  <div className="flex flex-wrap gap-1">
                    {currentGoal.current_skills.map((s: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-[10px] py-0 px-1.5 bg-background">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end pt-2">
              <Button type="submit" isLoading={loading}>
                Analyze Skill Gap
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
            <span className="text-sm font-medium animate-pulse">Aria is analyzing your skills and identifying gaps...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
        >
          <Card className="border-destructive/20 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                Missing Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.missing_skills?.map((skill, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="flex items-center gap-2"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                    <span className="text-foreground">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-success/20 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-success">
                <Lightbulb className="h-5 w-5" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.recommendations?.map((rec, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="flex items-start gap-2"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-success mt-2 shrink-0" />
                    <span className="text-muted-foreground text-sm leading-relaxed">{rec}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
