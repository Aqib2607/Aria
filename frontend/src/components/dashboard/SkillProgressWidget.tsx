import { useProgress, useCareers } from "../../hooks/useDashboardData";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { Skeleton } from "../ui/Skeleton";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";

export function SkillProgressWidget() {
  const { data: progressList, isLoading: loadingProgress } = useProgress();
  const { data: careers, isLoading: loadingCareers } = useCareers();

  if (loadingProgress || loadingCareers) {
    return <Skeleton className="h-full min-h-[200px] w-full rounded-2xl" />;
  }

  const currentGoal = careers && careers.length > 0 ? careers[careers.length - 1] : null;
  const userSkills: string[] = currentGoal?.current_skills || [];

  let totalPercentage = 0;
  if (progressList && progressList.length > 0) {
    totalPercentage = Math.round(
      progressList.reduce((acc: number, curr: any) => acc + curr.percentage, 0) /
        progressList.length
    );
  }

  return (
    <Card className="h-full flex flex-col group hover:border-success/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Skills & Progress</CardTitle>
          <div className="p-2 bg-success/10 rounded-full">
            <TrendingUp className="h-4 w-4 text-success" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center py-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold tracking-tighter text-foreground">{userSkills.length}</span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Registered Skills</span>
        </div>
        
        {userSkills.length > 0 ? (
          <div className="flex flex-wrap gap-1 mb-3">
            {userSkills.slice(0, 5).map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-[10px] py-0 px-2">
                {skill}
              </Badge>
            ))}
            {userSkills.length > 5 && (
              <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                +{userSkills.length - 5}
              </Badge>
            )}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground mb-3">No skills added yet.</p>
        )}

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Roadmap Completion</span>
            <span className="font-semibold text-foreground">{totalPercentage}%</span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="h-full bg-success rounded-full"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t border-border mt-auto">
        <Link to="/roadmap" className="w-full">
          <Button variant="ghost" className="w-full justify-between text-success hover:text-success hover:bg-success/10">
            View Learning Roadmap
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
