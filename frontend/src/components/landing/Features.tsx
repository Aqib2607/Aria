import { motion } from "framer-motion";
import { Target, Map as MapIcon, MessageSquare, Library, LayoutDashboard, BrainCircuit } from "lucide-react";

const features = [
  {
    title: "Career Goals & Recommendation",
    description: "Let our AI analyze your profile and suggest the perfect career paths based on market demand and your unique skills.",
    icon: Target,
    colSpan: "md:col-span-2",
  },
  {
    title: "Skill Gap Analysis",
    description: "Instantly identify what's missing between your current resume and your dream role requirements.",
    icon: BrainCircuit,
    colSpan: "md:col-span-1",
  },
  {
    title: "Personalized Roadmap",
    description: "Get a step-by-step learning journey generated specifically for you, complete with milestones and resource links.",
    icon: MapIcon,
    colSpan: "md:col-span-1",
  },
  {
    title: "Interview Prep AI",
    description: "Practice with our AI interviewer. Get real-time feedback on your answers, tone, and technical accuracy.",
    icon: MessageSquare,
    colSpan: "md:col-span-2",
  },
  {
    title: "Curated Resources",
    description: "Access a library of top-tier courses, books, and articles tailored to your exact roadmap milestones.",
    icon: Library,
    colSpan: "md:col-span-2",
  },
  {
    title: "Progress Dashboard",
    description: "Track your learning velocity, interview readiness, and overall career progression in one beautiful interface.",
    icon: LayoutDashboard,
    colSpan: "md:col-span-1",
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Everything you need to <span className="text-primary">accelerate</span> your career
          </h2>
          <p className="text-lg text-muted-foreground">
            Aria provides an end-to-end suite of intelligent tools designed to bridge the gap between where you are and where you want to be.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group ${feature.colSpan}`}
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
