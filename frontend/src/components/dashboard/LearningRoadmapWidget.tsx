import { useProgress } from "../../hooks/useDashboardData";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { Map, CheckCircle, Circle } from "lucide-react";
import { motion } from "framer-motion";

export function LearningRoadmapWidget() {
  const { data: progressList, isLoading } = useProgress();

  if (isLoading) {
    return <Skeleton className="h-full min-h-[300px] w-full rounded-2xl" />;
  }

  // Get steps from the first incomplete roadmap or just the first roadmap
  let activeSteps: any[] = [];
  if (progressList && progressList.length > 0) {
    const activeRoadmap = progressList.find((r: any) => r.percentage < 100) || progressList[0];
    if (activeRoadmap.steps) {
      activeSteps = activeRoadmap.steps.slice(0, 4); // show next 4 steps
    }
  }

  return (
    <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
      <CardHeader className="pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Up Next in Roadmap</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <Map className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 py-4">
        {activeSteps.length > 0 ? (
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {activeSteps.map((step, idx) => {
              const isCompleted = step.completion_status === "completed";
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={step.id} 
                  className="relative flex items-start gap-4"
                >
                  <div className={`mt-0.5 relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background border ring-4 ring-background ${isCompleted ? 'border-success text-success' : 'border-muted-foreground text-muted-foreground'}`}>
                    {isCompleted ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                  </div>
                  <div className="flex flex-col flex-1 pb-1">
                    <span className={`text-sm font-semibold ${isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                      {step.title}
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5">Est: {step.estimated_hours}h</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-4 py-8">
            <div className="p-4 rounded-full bg-primary/5">
              <Map className="h-8 w-8 text-primary/40" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">No active roadmap yet</p>
              <p className="text-xs text-muted-foreground mt-1">Generate your personalized learning path to get started.</p>
            </div>
            <a href="/roadmap" className="text-xs text-primary hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
              Create Roadmap →
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
