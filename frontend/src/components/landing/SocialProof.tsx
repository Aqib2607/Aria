import { motion } from "framer-motion";

const companies = [
  "Linear", "Vercel", "Stripe", "OpenAI", "Raycast", "Notion", "Figma", "Supabase"
];

export default function SocialProof() {
  return (
    <section className="py-20 border-y border-border bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
          Powering the next generation of top talent at
        </p>
        
        <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            className="flex items-center gap-16 md:gap-24 whitespace-nowrap px-8"
          >
            {/* Double the array for seamless looping */}
            {[...companies, ...companies].map((company, index) => (
              <div 
                key={index} 
                className="text-2xl md:text-3xl font-bold text-foreground/20 hover:text-foreground/40 transition-colors"
              >
                {company}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
