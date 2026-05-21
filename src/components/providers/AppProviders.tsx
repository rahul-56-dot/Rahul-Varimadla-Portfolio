"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import Lenis from "lenis";
import { CustomCursor } from "@/components/cursor/CustomCursor";

interface AppContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  musicEnabled: boolean;
  toggleMusic: () => void;
  isLoaded: boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProviders");
  return ctx;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );
  const toggleSound = useCallback(() => setSoundEnabled((s) => !s), []);
  const toggleMusic = useCallback(() => setMusicEnabled((m) => !m), []);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        soundEnabled,
        toggleSound,
        musicEnabled,
        toggleMusic,
        isLoaded,
      }}
    >
      <CustomCursor soundEnabled={soundEnabled} />
      {children}
    </AppContext.Provider>
  );
}
