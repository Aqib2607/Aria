import { useProfile } from "../../hooks/useDashboardData";
import { Skeleton } from "../ui/Skeleton";
import { motion } from "framer-motion";

export function WelcomeWidget() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Welcome back, {profile?.first_name || "Explorer"}! 👋
      </h1>
      <p className="text-muted-foreground mt-1 text-lg">
        Here's what's happening with your career journey today.
      </p>
    </motion.div>
  );
}
