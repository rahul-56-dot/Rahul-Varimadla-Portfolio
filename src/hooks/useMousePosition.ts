"use client";

import { useEffect, useRef, useState } from "react";

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const prev = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(now - prev.current.time, 1);
      const vx = (e.clientX - prev.current.x) / dt;
      const vy = (e.clientY - prev.current.y) / dt;
      setVelocity({ x: vx * 100, y: vy * 100 });
      setPosition({ x: e.clientX, y: e.clientY });
      prev.current = { x: e.clientX, y: e.clientY, time: now };
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);

  return { position, velocity, speed };
}
