import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Bot, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ThinkingIndicator } from "../components/ui/ThinkingIndicator";

interface InterviewQuestion {
  question: string;
  type: string;
  explanation: string;
}

interface InterviewResponse {
  questions: InterviewQuestion[];
}

export default function InterviewPrep() {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<InterviewResponse | null>(null);
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});

  const { register, handleSubmit } = useForm({
    defaultValues: {
      career_title: "Backend Developer",
      difficulty: "Intermediate",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      setShowAnswers({});
      const response = await api.post("/ai/prep-interview", data);
      setSession(response.data.data);
      toast.success("Interview questions generated!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to generate interview");
    } finally {
      setLoading(false);
    }
  };

  const toggleAnswer = (index: number) => {
    setShowAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <MessageSquare className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Interview Prep</h1>
          <p className="text-muted-foreground mt-1">
            Generate mock interview questions tailored to your target role.
          </p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Start Mock Interview
            </CardTitle>
            <CardDescription>
              Select your career and difficulty to generate practice questions.
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
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <select
                    id="difficulty"
                    {...register("difficulty")}
                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-2">
              <Button type="submit" isLoading={loading}>
                Generate Questions
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
            <span className="text-sm font-medium animate-pulse">Aria is crafting tailored interview questions for you...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {session && (
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-semibold text-foreground mb-4">Your Interview Questions</h2>
          <AnimatePresence>
            {session.questions?.map((q, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="px-6 py-4 border-b border-border bg-muted/50 flex justify-between items-center">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      Question {idx + 1}
                    </h3>
                    <Badge variant="secondary">{q.type}</Badge>
                  </div>
                  <CardContent className="pt-6">
                    <p className="text-foreground text-lg mb-4 font-medium leading-relaxed">{q.question}</p>
                    
                    <button
                      onClick={() => toggleAnswer(idx)}
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                    >
                      {showAnswers[idx] ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          Hide Expected Answer
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          Show Expected Answer
                        </>
                      )}
                    </button>

                    <AnimatePresence>
                      {showAnswers[idx] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 p-4 bg-muted rounded-lg border border-border/50 text-muted-foreground leading-relaxed">
                            {q.explanation}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
