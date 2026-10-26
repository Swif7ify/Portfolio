"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function IntroLoader() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 750);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      aria-hidden
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      className="pointer-events-none fixed inset-0 z-[101] flex items-end justify-between p-6 text-paper lg:p-12"
    >
      <div>
        <p className="font-pixel text-2xl">Earl Ordovez</p>
        <p className="mt-1 font-mono text-sm text-paper/60">Portfolio — 2026</p>
      </div>
      <p className="font-pixel text-[22vw] leading-none tabular-nums lg:text-[12rem]">
        {count}
        <span className="text-accent">%</span>
      </p>
    </motion.div>
  );
}
