"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, Code2, FolderOpen, Award, Route, Mail, Sun, Moon } from "lucide-react";
import { navItems } from "@/data/portfolio";
import { useApp } from "@/components/providers/AppProviders";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  hero: <Home size={18} />,
  about: <User size={18} />,
  skills: <Code2 size={18} />,
  projects: <FolderOpen size={18} />,
  certificates: <Award size={18} />,
  journey: <Route size={18} />,
  contact: <Mail size={18} />,
};

export function NavDock() {
  const [active, setActive] = useState("hero");
  const { theme, toggleTheme } = useApp();

  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="nav-dock fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 glass-panel rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] max-w-[calc(100vw-1.5rem)] overflow-x-auto hide-scrollbar"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 3, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          data-cursor="button"
          className={cn(
            "relative shrink-0 p-2 sm:p-2.5 rounded-xl transition-all duration-300",
            active === item.id ? "text-neon-cyan" : "text-text-muted hover:text-text-primary"
          )}
          aria-label={item.label}
        >
          {active === item.id && (
            <motion.div
              layoutId="dock-active"
              className="absolute inset-0 bg-neon-cyan/10 rounded-xl border border-neon-cyan/20"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 [&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-[18px] sm:[&_svg]:h-[18px]">{iconMap[item.id]}</span>
        </button>
      ))}

      <div className="w-px h-5 sm:h-6 bg-white/10 mx-0.5 sm:mx-1 shrink-0" />

      <button
        onClick={toggleTheme}
        data-cursor="button"
        className="shrink-0 p-2 sm:p-2.5 text-text-muted hover:text-neon-cyan transition-colors [&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-[18px] sm:[&_svg]:h-[18px]"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </motion.nav>
  );
}
