import { motion } from "framer-motion";

import { WelcomeWidget } from "../components/dashboard/WelcomeWidget";
import { CareerGoalWidget } from "../components/dashboard/CareerGoalWidget";
import { SkillProgressWidget } from "../components/dashboard/SkillProgressWidget";
import { LearningRoadmapWidget } from "../components/dashboard/LearningRoadmapWidget";
import { AnalyticsWidget } from "../components/dashboard/AnalyticsWidget";
import { AIActivityWidget } from "../components/dashboard/AIActivityWidget";
import { QuickActionsWidget } from "../components/dashboard/QuickActionsWidget";
import { NotificationsWidget } from "../components/dashboard/NotificationsWidget";

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-[1600px] mx-auto w-full px-2 sm:px-4 space-y-6 pb-12">
      <WelcomeWidget />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 auto-rows-[minmax(300px,_auto)]"
      >
        {/* Row 1: High level metrics */}
        <motion.div variants={itemVariants} className="xl:col-span-1">
          <CareerGoalWidget />
        </motion.div>
        <motion.div variants={itemVariants} className="xl:col-span-1">
          <SkillProgressWidget />
        </motion.div>
        <motion.div variants={itemVariants} className="xl:col-span-2">
          <AnalyticsWidget />
        </motion.div>

        {/* Row 2: Deep dives */}
        <motion.div variants={itemVariants} className="xl:col-span-2">
          <LearningRoadmapWidget />
        </motion.div>
        <motion.div variants={itemVariants} className="xl:col-span-1">
          <AIActivityWidget />
        </motion.div>
        <motion.div variants={itemVariants} className="xl:col-span-1 flex flex-col gap-6">
          <div className="flex-1 min-h-[140px]">
             <QuickActionsWidget />
          </div>
          <div className="flex-1 min-h-[140px]">
             <NotificationsWidget />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
