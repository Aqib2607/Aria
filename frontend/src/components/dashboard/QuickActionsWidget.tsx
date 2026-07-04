import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Zap, Target, Map, MessageSquare, Library } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function QuickActionsWidget() {
  const actions = [
    { title: "Skill Gap Analysis", path: "/skill-gap", icon: Target, color: "text-primary", bg: "bg-primary/10" },
    { title: "Generate Roadmap", path: "/roadmap", icon: Map, color: "text-secondary", bg: "bg-secondary/10" },
    { title: "Mock Interview", path: "/interview", icon: MessageSquare, color: "text-accent", bg: "bg-accent/10" },
    { title: "Discover Resources", path: "/resources", icon: Library, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  return (
    <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
      <CardHeader className="pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <Zap className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 py-4">
        <div className="grid grid-cols-2 gap-3 h-full">
          {actions.map((action, idx) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              key={idx}
            >
              <Link 
                to={action.path}
                className="flex flex-col items-center justify-center p-4 h-full rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors text-center gap-3 group"
              >
                <div className={`p-3 rounded-full ${action.bg} group-hover:scale-110 transition-transform`}>
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <span className="text-xs font-medium text-foreground">{action.title}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
