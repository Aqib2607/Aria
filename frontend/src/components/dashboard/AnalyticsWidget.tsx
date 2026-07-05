import { useAiHistories, useProgress } from "../../hooks/useDashboardData";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { BarChart } from "lucide-react";
import { subDays, isSameDay, parseISO, format } from "date-fns";

/* Custom tooltip rendered inside the chart */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any) => {
        const colorClass = p.dataKey === "AI Interactions" ? "text-primary" : "text-emerald-500";
        return (
          <p key={p.dataKey} className={`mt-0.5 ${colorClass}`}>
            {p.name}: <span className="font-bold">{p.value}</span>
          </p>
        );
      })}
    </div>
  );
};

export function AnalyticsWidget() {
  const { data: aiHistories, isLoading: aiLoading } = useAiHistories();
  const { data: progressList, isLoading: progressLoading } = useProgress();

  if (aiLoading || progressLoading) {
    return <Skeleton className="h-full min-h-[300px] w-full rounded-2xl" />;
  }

  /* Build last-7-days chart data from real records */
  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);

    const aiCount =
      aiHistories?.filter((h: any) =>
        isSameDay(parseISO(h.created_at), date)
      ).length ?? 0;

    // Count steps completed on this day across all roadmaps
    const stepsOnDay = progressList?.reduce((acc: number, roadmap: any) => {
      const completedToday = (roadmap.steps ?? []).filter(
        (s: any) =>
          s.completion_status === "completed" &&
          s.updated_at &&
          isSameDay(parseISO(s.updated_at), date)
      ).length;
      return acc + completedToday;
    }, 0) ?? 0;

    return {
      date: format(date, "MMM d"),
      "AI Interactions": aiCount,
      "Steps Done": stepsOnDay,
    };
  });

  const maxVal = Math.max(
    ...chartData.flatMap((d) => [d["AI Interactions"], d["Steps Done"]]),
    3 // minimum ceiling so the chart doesn't look flat
  );

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
        {/* Legend */}
        <div className="flex items-center gap-4 mb-4 px-2">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-sm bg-primary inline-block" />
            AI Interactions
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500 inline-block" />
            Steps Done
          </span>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <ReBarChart
            data={chartData}
            barCategoryGap="30%"
            barGap={3}
            margin={{ top: 4, right: 16, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              domain={[0, maxVal + 1]}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "hsl(var(--muted))", radius: 4 }}
            />

            <Bar
              dataKey="AI Interactions"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
              fill="hsl(var(--primary))"
            >
              {chartData.map((_, idx) => (
                <Cell
                  key={idx}
                  fill={
                    _["AI Interactions"] > 0
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted))"
                  }
                />
              ))}
            </Bar>

            <Bar
              dataKey="Steps Done"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
              fill="#10b981"
            >
              {chartData.map((_, idx) => (
                <Cell
                  key={idx}
                  fill={_["Steps Done"] > 0 ? "#10b981" : "hsl(var(--muted))"}
                />
              ))}
            </Bar>
          </ReBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
