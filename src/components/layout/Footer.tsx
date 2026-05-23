"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.p
          className="font-display text-lg neon-text font-bold"
          whileHover={{ scale: 1.05 }}
        >
          {personalInfo.fullName}
        </motion.p>
        <p className="text-white/30 text-sm font-mono">
          © {new Date().getFullYear()} · All rights reserved.
        </p>
        <p className="text-white/20 text-xs font-mono">
        Thanks for visiting my portfolio.
        </p>
      </div>
    </footer>
  );
}
