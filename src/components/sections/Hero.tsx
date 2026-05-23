"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Download, ArrowDown, Send } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const HeroScene = dynamic(() => import("@/components/three/HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-void to-transparent" />,
});

function TypeWriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-neon-cyan"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.fromTo(
      titleRef.current.children,
      { y: 100, opacity: 0, rotateX: -40 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.15, duration: 1.2, ease: "power4.out", delay: 0.3 }
    );
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />

      <div className="absolute inset-0 gradient-mesh z-[1]" />
      <motion.div
        className="absolute inset-0 z-[1] opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-10"
        >
          <div className="absolute inset-0 bg-neon-cyan/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative w-full h-full rounded-full border-2 border-neon-cyan/30 p-2 glass-panel">
            <img
              src="/profile.png"
              alt="Rahul Varimadla"
              className="w-full h-full rounded-full object-cover transition-all duration-500 hover:scale-105 contrast-[1.02] brightness-[1.02]"
            />
          </div>
          <motion.div
            className="absolute -bottom-2 -right-2 bg-neon-cyan text-void px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Available
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-neon-cyan/20 text-xs font-mono text-neon-cyan/80 mb-8"
        >
          <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
          {personalInfo.availability}
        </motion.div>

        <h1 ref={titleRef} className="perspective-1000 mb-6" style={{ perspective: "1000px" }}>
          <span className="block font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight">
            <span className="neon-text text-glow">Rahul Varimadla</span>
          </span>
          <span className="block mt-2 text-xl sm:text-2xl text-text-secondary font-light tracking-widest uppercase">
            {personalInfo.title}
          </span>
        </h1>

        <motion.p
          className="text-lg sm:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          data-cursor="text"
        >
          <TypeWriter text={personalInfo.tagline} />
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.8 }}
        >
          <MagneticButton>
            <Button variant="neon" size="lg" asChild>
              <a href={personalInfo.resumeUrl} download data-cursor="button">
                <Download size={18} />
                Download Resume
              </a>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button variant="outline" size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              <Send size={18} />
              Get In Touch
            </Button>
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
      >
        <span className="text-xs text-text-muted font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-neon-cyan"
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
