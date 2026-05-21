"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setPercentage(Math.round(v * 100)));
  }, [scrollYProgress]);

  return (
  <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[9990] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #00f0ff, #a855f7, #3b82f6)",
          boxShadow: "0 0 10px rgba(0,240,255,0.5)",
        }}
      />
      <motion.div className="fixed top-4 right-4 z-[9989] font-mono text-xs text-neon-cyan/60 tabular-nums">
        {percentage}%
      </motion.div>
    </>
  );
}
