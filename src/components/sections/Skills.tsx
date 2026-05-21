"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function SkillBar({ level, name, icon }: { level: number; name: string; icon: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2" data-cursor="card">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-base">{icon}</span>
          {name}
        </span>
        <span className="text-neon-cyan font-mono text-xs">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          style={{ boxShadow: "0 0 10px rgba(0,240,255,0.5)" }}
        />
      </div>
    </div>
  );
}

function SkillSphere({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 20 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group"
      data-cursor="card"
    >
      <motion.div
        className="glass-panel rounded-3xl p-6 h-full border border-white/5 hover:border-neon-cyan/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,240,255,0.1)]"
        whileHover={{ y: -8, scale: 1.02 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center border border-neon-cyan/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span className="font-display text-neon-cyan text-lg font-bold">
              {category.name[0]}
            </span>
          </motion.div>
          <h3 className="font-display text-xl font-bold text-white/90">{category.name}</h3>
        </div>
        <div className="space-y-4">
          {category.skills.map((skill) => (
            <SkillBar key={skill.name} {...skill} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-purple/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="font-mono text-neon-purple text-sm tracking-widest uppercase">Expertise</span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold mt-4 neon-text">Skill Matrix</h2>
          <p className="text-text-muted mt-4 max-w-xl mx-auto">
            A multidimensional arsenal of technologies powering next-generation digital experiences
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <SkillSphere key={cat.name} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
