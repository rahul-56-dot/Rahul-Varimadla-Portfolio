"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { cn, lerp } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

type CursorMode = "default" | "button" | "card" | "text" | "image" | "link";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function CustomCursor({ soundEnabled = false }: { soundEnabled?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const particleId = useRef(0);
  const rippleId = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const dotRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const rafRef = useRef<number>(undefined);
  const dotEl = useRef<HTMLDivElement>(null);
  const ringEl = useRef<HTMLDivElement>(null);
  const glowEl = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const playClickSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 520;
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      /* ignore */
    }
  }, [soundEnabled]);

  const spawnParticles = useCallback((x: number, y: number, count = 8, burst = false) => {
    const colors = ["#00f0ff", "#a855f7", "#3b82f6", "#ffffff"];
    const newParticles: Particle[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? Math.random() * 6 + 2 : Math.random() * 3 + 1;
      return {
        id: particleId.current++,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
    setParticles((prev) => [...prev.slice(-60), ...newParticles]);
  }, []);

  const addRipple = useCallback((x: number, y: number) => {
    const id = rippleId.current++;
    setRipples((prev) => [...prev.slice(-5), { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 800);
  }, []);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const isLightTheme = document.body.classList.contains("light-theme");

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseRef.current.x && !mouseRef.current.y) {
        dotRef.current = { x: e.clientX, y: e.clientY };
        ringRef.current = { x: e.clientX, y: e.clientY };
      }
      const dx = e.clientX - mouseRef.current.x;
      const dy = e.clientY - mouseRef.current.y;
      velocityRef.current = Math.sqrt(dx * dx + dy * dy);
      mouseRef.current = { x: e.clientX, y: e.clientY };
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
      setIsIdle(false);
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIsIdle(true), 3000);

      if (velocityRef.current > 5) { // Increased threshold
        spawnParticles(e.clientX, e.clientY, 1); // Reduced count per move
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      addRipple(e.clientX, e.clientY);
      spawnParticles(e.clientX, e.clientY, 8, true);
      playClickSound();
    };

    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorAttr === "button") setMode("button");
      else if (cursorAttr === "card") setMode("card");
      else if (cursorAttr === "text") setMode("text");
      else if (cursorAttr === "image") setMode("image");
      else if (cursorAttr === "link" || target.closest("a")) setMode("link");
      else setMode("default");
    };

    const animate = () => {
      dotRef.current.x = lerp(dotRef.current.x, mouseRef.current.x, 0.35);
      dotRef.current.y = lerp(dotRef.current.y, mouseRef.current.y, 0.35);
      ringRef.current.x = lerp(ringRef.current.x, mouseRef.current.x, 0.15);
      ringRef.current.y = lerp(ringRef.current.y, mouseRef.current.y, 0.15);

      const scale = isClicking ? 0.8 : (1 + velocityRef.current * 0.01);

      if (dotEl.current) {
        dotEl.current.style.transform = `translate3d(${dotRef.current.x}px, ${dotRef.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      if (ringEl.current) {
        ringEl.current.style.transform = `translate3d(${ringRef.current.x}px, ${ringRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (glowEl.current) {
        glowEl.current.style.transform = `translate3d(${ringRef.current.x}px, ${ringRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Batch particle updates - only update state if particles exist
      setParticles((prev) => {
        if (prev.length === 0) return prev;
        return prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.05,
            life: p.life - 0.03, // Faster fade
          }))
          .filter((p) => p.life > 0);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleHover);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleHover);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(idleTimer.current);
    };
  }, [cursorX, cursorY, spawnParticles, addRipple, playClickSound]);

  const sizeMap: Record<CursorMode, number> = {
    default: 8,
    button: 0,
    card: 0,
    text: 2,
    image: 0,
    link: 6,
  };

  const ringSizeMap: Record<CursorMode, number> = {
    default: 36,
    button: 56,
    card: 72,
    text: 48,
    image: 80,
    link: 44,
  };

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={glowEl}
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[9998] rounded-full transition-opacity duration-500",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{
          width: ringSizeMap[mode] * 2.5,
          height: ringSizeMap[mode] * 2.5,
          background: `radial-gradient(circle, rgba(0,240,255,0.1) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)`,
          filter: "blur(20px)",
          mixBlendMode: "screen",
        }}
      />

      <div
        ref={ringEl}
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0",
          isIdle && "animate-[pulse-glow_2s_ease-in-out_infinite]"
        )}
        style={{
          width: ringSizeMap[mode],
          height: ringSizeMap[mode],
        }}
      >
        <div
          className={cn(
            "w-full h-full rounded-full border transition-all duration-300",
            mode === "button" && "border-neon-cyan/80 shadow-[0_0_20px_rgba(0,240,255,0.5)]",
            mode === "card" && "border-neon-purple/60 animate-[spin-slow_4s_linear_infinite]",
            mode === "text" && "border-transparent",
            mode === "image" && "border-neon-cyan/40 border-dashed",
            mode === "link" && "border-white/40",
            mode === "default" && "border-neon-cyan/30"
          )}
          style={{
            borderWidth: mode === "text" ? "1px 0" : "1px",
            borderRadius: mode === "text" ? "0" : "50%",
            borderColor: mode === "default" ? "var(--color-neon-cyan)" : undefined,
            opacity: mode === "default" ? 0.3 : 1,
          }}
        />
      </div>

      <div
        ref={dotEl}
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[10000] rounded-full transition-opacity duration-200",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{
          width: mode === "text" ? 2 : sizeMap[mode] || 8,
          height: mode === "text" ? 24 : sizeMap[mode] || 8,
          background:
            mode === "button"
              ? "transparent"
              : mode === "text"
              ? "linear-gradient(180deg, #00f0ff, #a855f7)"
              : "radial-gradient(circle, #ffffff 0%, #00f0ff 60%, transparent 100%)",
          boxShadow:
            mode === "default"
              ? "0 0 12px #00f0ff"
              : "0 0 20px #a855f7",
          borderRadius: mode === "text" ? "2px" : "50%",
        }}
      />

      {particles.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full"
          style={{
            transform: `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.life,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}

      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="pointer-events-none fixed top-0 left-0 z-[9996] rounded-full border border-neon-cyan/60"
            style={{ left: r.x, top: r.y, transform: "translate(-50%, -50%)" }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 80, height: 80, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      <MouseLight />
    </>
  );
}

function MouseLight() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (lightRef.current) {
        lightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(0,240,255,0.06), transparent 40%)`;
      }
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.div
      ref={lightRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}
