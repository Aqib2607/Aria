import { motion } from "framer-motion";

export function ThinkingIndicator() {
  return (
    <div className="flex items-center space-x-1 p-2 rounded-lg bg-muted/50 w-fit">
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          }}
        />
      ))}
    </div>
  );
}
