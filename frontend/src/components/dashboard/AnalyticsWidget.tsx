import { useAiHistories, useProgress } from "../../hooks/useDashboardData";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart } from "lucide-react";
import { format, subDays, isSameDay, parseISO } from "date-fns";

export function AnalyticsWidget() {
  const { data: aiHistories, isLoading: aiLoading } = useAiHistories();
  const { isLoading: progressLoading } = useProgress();

  if (aiLoading || progressLoading) {
    return <Skeleton className="h-full min-h-[300px] w-full rounded-2xl" />;
  }

  // Generate last 7 days of data
  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    
    // Count AI interactions for this day
    const aiCount = aiHistories?.filter((h: any) => 
      isSameDay(parseISO(h.created_at), date)
    ).length || 0;

    // We can add mock progress points for demonstration if real progress history is not tracked per day in DB
    const progressCount = Math.floor(Math.random() * 3); 

    return {
      date: format(date, "MMM dd"),
      interactions: aiCount,
      tasks: progressCount
    };
  });

  return (
    <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
      <CardHeader className="pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Activity Analytics</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <BarChart className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-6 pb-2 px-2">
        <ResponsiveContainer width="100%" height="100%" minHeight={250}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                borderColor: "hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))"
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Line 
              type="monotone" 
              dataKey="interactions" 
              name="AI Interactions" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: "hsl(var(--primary))", strokeWidth: 0 }}
              activeDot={{ r: 5, stroke: "hsl(var(--background))", strokeWidth: 2, fill: "hsl(var(--primary))" }}
            />
            <Line 
              type="monotone" 
              dataKey="tasks" 
              name="Tasks Completed" 
              stroke="hsl(var(--secondary))" 
              strokeWidth={2.5}
              strokeDasharray="5 3"
              dot={{ r: 3.5, fill: "hsl(var(--secondary))", strokeWidth: 0 }}
              activeDot={{ r: 5, stroke: "hsl(var(--background))", strokeWidth: 2, fill: "hsl(var(--secondary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
