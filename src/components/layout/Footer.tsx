"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="site-footer relative pt-12 pb-28 sm:pb-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-4">
        <motion.p
          className="font-display text-lg neon-text font-bold"
          whileHover={{ scale: 1.05 }}
        >
          {personalInfo.fullName}
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm font-mono">
          <p className="text-text-muted">
            © {new Date().getFullYear()} · All rights reserved.
          </p>
          <span className="hidden sm:inline text-text-muted/40" aria-hidden>
            ·
          </span>
          <p className="text-text-secondary">
            Thanks for visiting my portfolio.
          </p>
        </div>
      </div>
    </footer>
  );
}
