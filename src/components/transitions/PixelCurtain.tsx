'use client';

import React from "react";
import { motion } from "framer-motion";

const COLS = 14;
const ROWS = 9;
const delays = Array.from({ length: COLS * ROWS }, (_, i) => ((i * 7919) % 97) / 97);

interface PixelCurtainProps {
  phase: "in" | "out";
}

/** A grid of cells that pops on in random order, swaps the view underneath, then pops off. */
export function PixelCurtain({ phase }: PixelCurtainProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-40 grid"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {delays.map((d, i) => (
        <motion.span
          key={i}
          className="bg-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "in" ? 1 : 0 }}
          transition={{ duration: 0.08, delay: d * 0.32, ease: "linear" }}
        />
      ))}
    </div>
  );
}
