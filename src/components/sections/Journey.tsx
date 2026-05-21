"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Trophy, Calendar, GraduationCap, Wrench } from "lucide-react";
import { timeline } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const typeIcons: Record<string, React.ReactNode> = {
  internship: <Briefcase size={18} />,
  achievement: <Trophy size={18} />,
  event: <Calendar size={18} />,
  workshop: <Wrench size={18} />,
  work: <Briefcase size={18} />,
  education: <GraduationCap size={18} />,
};

const typeColors: Record<string, string> = {
  internship: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10",
  achievement: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  event: "text-neon-purple border-neon-purple/30 bg-neon-purple/10",
  workshop: "text-neon-blue border-neon-blue/30 bg-neon-blue/10",
  work: "text-green-400 border-green-400/30 bg-green-400/10",
  education: "text-white border-white/30 bg-white/10",
};

export function Journey() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="font-mono text-neon-purple text-sm tracking-widest uppercase">Timeline</span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold mt-4 neon-text">My Journey</h2>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-px"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(180deg, #00f0ff, #a855f7, transparent)",
              transformOrigin: "top",
              boxShadow: "0 0 20px rgba(0,240,255,0.3)",
            }}
          />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative pl-16"  
                data-cursor="card"
              >
                <motion.div
                  className={cn(
                    "absolute left-3 w-7 h-7 rounded-full border flex items-center justify-center -translate-x-1/2",
                    typeColors[item.type] || typeColors.education
                  )}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: i * 0.15 + 0.3, type: "spring" }}
                  whileHover={{ scale: 1.3, boxShadow: "0 0 20px rgba(0,240,255,0.5)" }}
                >
                  {typeIcons[item.type]}
                </motion.div>

                <motion.div
                  className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-neon-cyan/20 transition-all duration-300"
                  whileHover={{ x: 8 }}
                >
                  <span className="font-mono text-neon-cyan text-sm">{item.year}</span>
                  <h3 className="font-display text-xl font-bold text-text-primary mt-1">{item.title}</h3>
                  <p className="text-neon-purple/70 text-sm font-medium">{item.company}</p>
                  <p className="text-text-secondary text-sm mt-2 leading-relaxed">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
