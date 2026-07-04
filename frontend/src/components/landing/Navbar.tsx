import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20"
          >
            <span className="text-white font-bold text-lg">A</span>
          </motion.div>
          <span className="font-bold text-2xl tracking-tight text-foreground">
            Aria
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
          <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Wall of Love</a>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-3">
            <Link 
              to="/login" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="group relative inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
