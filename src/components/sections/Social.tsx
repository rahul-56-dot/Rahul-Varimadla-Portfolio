"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter, Code2, Terminal } from "lucide-react";
import { socialLinks } from "@/data/portfolio";

const iconComponents: Record<string, React.ReactNode> = {
  github: <Github size={22} />,
  linkedin: <Linkedin size={22} />,
  instagram: <Instagram size={22} />,
  twitter: <Twitter size={22} />,
  code: <Code2 size={22} />,
  terminal: <Terminal size={22} />,
};

export function Social() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="font-mono text-text-muted text-sm mb-8 tracking-widest uppercase">Connect Across the Network</p>
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              whileHover={{
                scale: 1.15,
                y: -4,
                boxShadow: "0 0 30px rgba(0,240,255,0.4)",
              }}
              className="social-link-btn group relative w-14 h-14 rounded-2xl glass-panel border flex items-center justify-center transition-colors"
            >
              {iconComponents[link.icon]}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {link.name}
              </span>
              <motion.span
                className="absolute inset-0 rounded-2xl border border-neon-cyan/0 group-hover:border-neon-cyan/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
