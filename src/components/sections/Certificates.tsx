"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { certificates } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState<number | null>(null);

  const next = () => setActive((a) => (a + 1) % certificates.length);
  const prev = () => setActive((a) => (a - 1 + certificates.length) % certificates.length);

  return (
    <section id="certificates" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-neon-cyan text-sm tracking-widest uppercase">Achievements</span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold mt-4 neon-text">Certifications</h2>
        </motion.div>

        <div className="relative flex items-center justify-center gap-4">
          <button onClick={prev} data-cursor="button" className="slider-nav-btn" aria-label="Previous certificate">
            <ChevronLeft size={24} />
          </button>

          <div className="relative w-full max-w-md h-72 perspective-1000" style={{ perspective: "1000px" }}>
            {certificates.map((cert, i) => {
              const offset = i - active;
              const isActive = i === active;
              return (
                <motion.div
                  key={cert.id}
                  className={cn(
                    "absolute inset-0 cursor-pointer",
                    !isActive && "pointer-events-none"
                  )}
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex: isActive ? 10 : 5 - Math.abs(offset)
                  }}
                  animate={{
                    x: offset * 40,
                    z: isActive ? 0 : -100,
                    scale: isActive ? 1 : 0.85,
                    opacity: flipped !== null && !isActive ? 0 : (Math.abs(offset) === 0 ? 1 : Math.abs(offset) > 1 ? 0 : 0.3),
                    rotateY: flipped === i ? 180 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  onClick={() => isActive ? setFlipped(flipped === i ? null : i) : setActive(i)}
                  data-cursor="card"
                >
                  <div
                    className="w-full h-full glass-panel rounded-3xl p-8 border border-white/10 flex flex-col justify-between backface-hidden shadow-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      borderColor: isActive ? `${cert.color}40` : undefined,
                      boxShadow: isActive ? `0 0 40px ${cert.color}20` : undefined,
                      background: isActive ? undefined : "var(--color-card-stack)",
                    }}
                  >
                    <div>
                      <Award size={32} style={{ color: cert.color }} />
                      <h3 className="font-display text-xl font-bold mt-4 text-text-primary">{cert.title}</h3>
                      <p className="text-text-muted text-sm mt-1">{cert.organization}</p>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {cert.skills.map((s) => (
                          <span key={s} className="text-xs px-2 py-0.5 rounded bg-white/5 text-text-secondary">
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="font-mono text-xs text-neon-cyan/80">{cert.date}</p>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute inset-0 w-full h-full glass-panel rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-center text-center shadow-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      borderColor: cert.color,
                      background: "rgba(15, 15, 30, 0.95)",
                    }}
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${cert.color}20` }}>
                      <Award size={32} style={{ color: cert.color }} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{cert.title}</h3>
                    <p className="text-white/70 text-sm mb-6">{cert.organization}</p>
                    {cert.link && cert.link !== "#" ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all inline-block hover:brightness-110"
                        style={{ backgroundColor: cert.color, color: "#fff" }}
                      >
                        View Certificate
                      </a>
                    ) : (
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-not-allowed opacity-50"
                        style={{ backgroundColor: cert.color, color: "#fff" }}
                        disabled
                      >
                        View Certificate
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button onClick={next} data-cursor="button" className="slider-nav-btn" aria-label="Next certificate">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {certificates.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn("slider-dot", i === active && "slider-dot-active")}
              aria-label={`Go to certificate ${i + 1}`}
              data-cursor="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
