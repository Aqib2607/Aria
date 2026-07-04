import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Sparkles, Map, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create your profile",
    description: "Input your current skills, background, and career aspirations. Aria parses everything instantly.",
  },
  {
    icon: Sparkles,
    title: "AI Analysis",
    description: "Our engine maps your profile against millions of data points to find your optimal path.",
  },
  {
    icon: Map,
    title: "Get your Roadmap",
    description: "Receive a deeply personalized, step-by-step curriculum to bridge your exact skill gaps.",
  },
  {
    icon: Rocket,
    title: "Land the Job",
    description: "Practice with our AI interviewer, track your progress, and confidently ace your applications.",
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" className="py-24 bg-muted/20 border-y border-border relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            How Aria works
          </h2>
          <p className="text-lg text-muted-foreground">
            From your first login to your first day at the new job, we guide you every step of the way.
          </p>
        </div>

        <div ref={containerRef} className="max-w-3xl mx-auto relative">
          {/* Animated SVG Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block">
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-gradient-to-b from-primary via-secondary to-accent" 
            />
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative flex flex-col md:flex-row gap-8 items-start md:items-center"
              >
                <div className="hidden md:flex absolute -left-4 items-center justify-center h-16 w-16 rounded-full bg-card border-4 border-background z-10 shadow-sm">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                
                <div className="md:ml-24 p-8 rounded-3xl bg-card border border-border shadow-sm w-full">
                  <div className="md:hidden h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
