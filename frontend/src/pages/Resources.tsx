import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Library, BookOpen, ExternalLink, GraduationCap } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ThinkingIndicator } from "../components/ui/ThinkingIndicator";

interface ResourceItem {
  title: string;
  url: string;
  provider: string;
  type: string;
  difficulty: string;
}

interface ResourcesResponse {
  resources: ResourceItem[];
}

export default function Resources() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ResourcesResponse | null>(null);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      career_title: "Full Stack Developer",
    },
  });

  const onSubmit = async (formData: any) => {
    try {
      setLoading(true);
      const response = await api.post("/ai/generate-resources", formData);
      setData(response.data.data);
      toast.success("Resources curated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to curate resources");
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "beginner": return "success";
      case "intermediate": return "warning";
      case "advanced": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Library className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Learning Resources</h1>
          <p className="text-muted-foreground mt-1">
            AI-curated resources tailored to your specific career path.
          </p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="border-primary/20 bg-primary/5 max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Discover Resources
            </CardTitle>
            <CardDescription>
              Enter a career path to get a curated list of courses, articles, and documentation.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="career_title">Target Career</Label>
                <div className="flex gap-3">
                  <Input 
                    id="career_title" 
                    {...register("career_title")} 
                    className="bg-background flex-1" 
                  />
                  <Button type="submit" isLoading={loading}>
                    Curate
                  </Button>
                </div>
              </div>
            </CardContent>
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
            <span className="text-sm font-medium animate-pulse">Aria is curating the best resources for your career path...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {data && (
        <div className="pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recommended for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {data.resources?.map((resource, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col hover:border-primary/50 transition-colors group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold">
                          {resource.type}
                        </Badge>
                        <Badge variant={getDifficultyColor(resource.difficulty) as any} className="text-[10px] uppercase tracking-wider">
                          {resource.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <BookOpen className="h-4 w-4" />
                        Provider: <span className="font-medium text-foreground">{resource.provider}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-border">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${resource.title} in new tab`}
                        className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
                      >
                        <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          Go to Resource
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
