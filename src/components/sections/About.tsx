"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { aboutContent, stats, education, floatingTechIcons } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-neon-cyan text-sm tracking-widest uppercase">About Me</span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold mt-4 neon-text">The Architect</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            data-cursor="card"
          >
            <div className="glass-panel rounded-3xl p-8 neon-border group hover:shadow-[0_0_60px_rgba(0,240,255,0.1)] transition-all duration-500"
              style={{ transformStyle: "preserve-3d" }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
              }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
            >
              <motion.div className="w-24 h-24 rounded-2xl border-2 border-neon-cyan/20 p-1 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 overflow-hidden mb-6 flex items-center justify-center">
                <img
                  src="/profile.png"
                  alt="Rahul Varimadla"
                  className="w-full h-full rounded-xl object-cover transition-all duration-500 hover:scale-105"
                />
              </motion.div>
              <p className="text-text-secondary leading-relaxed mb-6" data-cursor="text">{aboutContent.intro}</p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-neon-cyan font-mono text-xs uppercase tracking-wider mb-1">Objective</h4>
                  <p className="text-text-muted text-sm">{aboutContent.objective}</p>
                </div>
                <motion.div>
                  <h4 className="text-neon-purple font-mono text-xs uppercase tracking-wider mb-1">Passion</h4>
                  <p className="text-text-muted text-sm">{aboutContent.passion}</p>
                </motion.div>
              </div>
            </div>

            {floatingTechIcons.map((icon, i) => (
              <motion.span
                key={icon}
                className="absolute font-mono text-xs text-neon-cyan/40 glass-panel px-2 py-1 rounded-lg border border-neon-cyan/10"
                style={{
                  top: `${10 + (i % 4) * 20}%`,
                  left: i % 2 === 0 ? "-10%" : "auto",
                  right: i % 2 === 1 ? "-10%" : "auto",
                }}
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
              >
                {icon}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="glass-panel rounded-2xl p-6 text-center hover:border-neon-cyan/30 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  data-cursor="card"
                >
                  <div className="font-display text-3xl sm:text-4xl font-bold neon-text">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-text-muted text-sm mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div>
              <h3 className="font-display text-xl mb-4 text-white/90">Technologies</h3>
              <motion.div className="flex flex-wrap gap-2">
                {aboutContent.technologies.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-sm glass-panel border border-white/10 text-text-secondary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    whileHover={{ borderColor: "rgba(0,240,255,0.5)", color: "#00f0ff" }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <div>
              <h3 className="font-display text-xl mb-4 text-white/90">Future Goals</h3>
              <ul className="space-y-3">
                {aboutContent.goals.map((goal, i) => (
                  <motion.li
                    key={goal}
                    className="flex items-center gap-3 text-text-secondary text-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shrink-0" />
                    {goal}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-xl text-white/90">Education</h3>
              {education.map((edu, i) => (
                <motion.div
                  key={edu.title}
                  className="glass-panel rounded-xl p-4 border-l-2 border-neon-cyan/50"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1 + i * 0.15 }}
                >
                  <span className="text-neon-cyan/60 font-mono text-xs">{edu.year}</span>
                  <h4 className="font-semibold text-white/90 mt-1">{edu.title}</h4>
                  <p className="text-neon-purple/80 text-sm">{edu.institution}</p>
                  <p className="text-text-muted text-sm mt-1">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
