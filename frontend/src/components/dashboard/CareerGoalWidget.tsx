import { useCareers } from "../../hooks/useDashboardData";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { Skeleton } from "../ui/Skeleton";
import { Target, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CareerGoalWidget() {
  const { data: careers, isLoading } = useCareers();

  if (isLoading) {
    return <Skeleton className="h-full min-h-[200px] w-full rounded-2xl" />;
  }

  const currentGoal = careers && careers.length > 0 ? careers[careers.length - 1] : null;

  return (
    <Card className="h-full flex flex-col group hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Current Goal</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <Target className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center py-4">
        <div className="text-2xl font-bold text-foreground mb-1">
          {currentGoal ? currentGoal.target_role : "No target set"}
        </div>
        <p className="text-sm text-muted-foreground">
          {currentGoal ? "Your primary career objective" : "Define your destination to get started"}
        </p>
      </CardContent>
      <CardFooter className="pt-2 border-t border-border mt-auto">
        <Link to="/careers" className="w-full">
          <Button variant="ghost" className="w-full justify-between text-muted-foreground hover:text-foreground">
            {currentGoal ? "Update Goal" : "Set Career Goal"}
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
