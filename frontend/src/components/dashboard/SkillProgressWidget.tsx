import { useProgress } from "../../hooks/useDashboardData";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { Skeleton } from "../ui/Skeleton";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function SkillProgressWidget() {
  const { data: progressList, isLoading } = useProgress();

  if (isLoading) {
    return <Skeleton className="h-full min-h-[200px] w-full rounded-2xl" />;
  }

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
          <CardTitle className="text-lg font-medium">Overall Progress</CardTitle>
          <div className="p-2 bg-success/10 rounded-full">
            <TrendingUp className="h-4 w-4 text-success" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center py-4">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-5xl font-bold tracking-tighter text-foreground">{totalPercentage}%</span>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Completed</span>
        </div>
        <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${totalPercentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="h-full bg-success rounded-full"
          />
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
