import { useNotifications } from "../../hooks/useDashboardData";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { Bell, BellRing } from "lucide-react";
import { format, parseISO } from "date-fns";

export function NotificationsWidget() {
  const { data: notifications, isLoading } = useNotifications();

  if (isLoading) {
    return <Skeleton className="h-full min-h-[300px] w-full rounded-2xl" />;
  }

  // Fallback to empty if api doesn't exist yet
  const recentNotifs = notifications && notifications.length > 0 ? notifications.slice(0, 3) : [];

  return (
    <Card className="h-full flex flex-col hover:border-primary/50 transition-colors overflow-hidden">
      <CardHeader className="pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Recent Alerts</CardTitle>
          <div className="p-2 bg-destructive/10 rounded-full relative">
            <Bell className="h-4 w-4 text-destructive" />
            {recentNotifs.some((n: any) => n.status === 'unread') && (
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 py-3 overflow-y-auto min-h-0">
        {recentNotifs.length > 0 ? (
          <ul className="space-y-4">
            {recentNotifs.map((notif: any, idx: number) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`mt-0.5 p-1.5 rounded-full shrink-0 ${notif.status === 'unread' ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}`}>
                  {notif.status === 'unread' ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm ${notif.status === 'unread' ? 'font-bold text-foreground' : 'font-medium text-muted-foreground'}`}>
                    {notif.message}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {format(parseISO(notif.created_at), "MMM d, h:mm a")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-8">
            <div className="p-4 rounded-full bg-muted">
              <Bell className="h-6 w-6 text-muted-foreground/50" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">You're all caught up!</p>
              <p className="text-xs text-muted-foreground mt-1">No new notifications right now.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
