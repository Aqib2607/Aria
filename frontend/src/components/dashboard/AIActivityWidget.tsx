import { useAiHistories } from "../../hooks/useDashboardData";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { Skeleton } from "../ui/Skeleton";
import { Activity, CheckCircle2 } from "lucide-react";
import { format, parseISO } from "date-fns";

export function AIActivityWidget() {
  const { data: aiHistories, isLoading } = useAiHistories();

  if (isLoading) {
    return <Skeleton className="h-full min-h-[300px] w-full rounded-2xl" />;
  }

  const recentActivities = aiHistories ? aiHistories.slice(0, 4) : [];

  return (
    <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
      <CardHeader className="pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">AI Intelligence Logs</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <Activity className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 py-4">
        {recentActivities.length > 0 ? (
          <ul className="space-y-4">
            {recentActivities.map((activity: any, idx: number) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-semibold text-foreground capitalize truncate">
                    {activity.feature.replace("_", " ")}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {format(parseISO(activity.created_at), "MMM d, h:mm a")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-3 py-8">
            <Activity className="h-8 w-8 opacity-20" />
            <p className="text-sm">No recent AI activities.</p>
          </div>
        )}
      </CardContent>
      {recentActivities.length > 0 && (
        <CardFooter className="pt-2 border-t border-border mt-auto">
          <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground">
            View Complete History
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
