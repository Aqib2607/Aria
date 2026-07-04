import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Target,
  Map as MapIcon,
  MessageSquare,
  Library,
  User,
  Settings,
  Briefcase
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuthStore } from "../../store/authStore";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Career Goals", href: "/careers", icon: Briefcase },
  { name: "Roadmap", href: "/roadmap", icon: MapIcon },
  { name: "Skill Gap", href: "/skill-gap", icon: Target },
  { name: "Interview Prep", href: "/interview", icon: MessageSquare },
  { name: "Resources", href: "/resources", icon: Library },
];

const bottomNavigation = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="hidden w-64 flex-col border-r border-border bg-sidebar text-sidebar-foreground sm:flex min-h-screen sticky top-0">
      <div className="flex h-16 items-center px-6 border-b border-border/20">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight text-sidebar-foreground">
          <div className="h-8 w-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-sidebar-foreground font-bold text-sm">A</span>
          </div>
          Aria
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-6 flex flex-col px-3 gap-1">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
          Overview
        </div>
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                isActive
                  ? "text-sidebar-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-md bg-primary/10 border border-primary/20"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className="h-4 w-4 relative z-10" />
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}

        {user?.role === "admin" && (
          <>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6 mb-2 px-3">
              Admin
            </div>
            <Link
              to="/admin/dashboard"
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname.startsWith("/admin")
                  ? "text-sidebar-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground"
              )}
            >
              <Target className="h-4 w-4 relative z-10" />
              <span className="relative z-10">Admin Dashboard</span>
            </Link>
          </>
        )}
      </div>

      <div className="mt-auto p-4 border-t border-border">
        {bottomNavigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                isActive
                  ? "bg-sidebar-foreground/10 text-sidebar-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
