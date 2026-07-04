import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Code2, LineChart } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold tracking-wide">AI-Powered Career Intelligence</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 max-w-4xl"
          >
            Navigate your career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">absolute precision</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
          >
            Aria analyzes your skills, uncovers hidden gaps, and builds a hyper-personalized roadmap to land your dream role.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link 
              to="/register" 
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:bg-primary/90 hover:-translate-y-1"
            >
              Start for free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a 
              href="#features" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-background border border-border px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-muted"
            >
              Explore Features
            </a>
          </motion.div>
        </div>

        {/* Dashboard Preview (CSS 3D Transform) */}
        <motion.div 
          style={{ y, opacity, scale }}
          className="mt-20 relative mx-auto max-w-5xl perspective-1000"
        >
          <motion.div 
            initial={{ rotateX: 20, y: 100, opacity: 0 }}
            animate={{ rotateX: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden"
          >
            {/* Fake Window Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/50">
              <div className="h-3 w-3 rounded-full bg-destructive/80" />
              <div className="h-3 w-3 rounded-full bg-warning/80" />
              <div className="h-3 w-3 rounded-full bg-success/80" />
            </div>
            
            {/* Fake Dashboard Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
              <div className="col-span-1 md:col-span-2 space-y-6">
                <div className="h-8 w-1/3 bg-muted rounded-md animate-pulse" />
                <div className="h-48 w-full bg-primary/5 border border-primary/10 rounded-xl relative overflow-hidden flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-primary/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-muted/50 rounded-xl" />
                  <div className="h-24 bg-muted/50 rounded-xl" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-full w-full bg-secondary/5 border border-secondary/10 rounded-xl p-4 flex flex-col gap-4">
                  <div className="h-6 w-1/2 bg-muted rounded-md" />
                  <div className="flex-1 space-y-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Code2 className="h-4 w-4 text-primary/50" />
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Accents */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -right-12 top-1/4 h-24 w-24 rounded-2xl bg-gradient-to-br from-secondary/80 to-primary/80 shadow-xl shadow-secondary/20 backdrop-blur-md border border-white/10 hidden lg:flex items-center justify-center"
          >
            <Sparkles className="h-10 w-10 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
