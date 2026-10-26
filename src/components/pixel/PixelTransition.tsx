"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IntroLoader } from '../IntroLoader';

export type WipePhase = 'idle' | 'hold' | 'cover' | 'reveal';

type PixelTransitionProps = {
  phase: WipePhase;
  origin: { x: number; y: number };
};

const SPREAD = 0.34;
const STEP = 0.09;

export function PixelTransition({ phase, origin }: PixelTransitionProps) {
  const [dims, setDims] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const grid = useMemo(() => {
    const { w, h } = dims;
    const cell = w < 640 ? 56 : 80;
    const cols = Math.ceil(w / cell);
    const rows = Math.ceil(h / cell);
    const ox = origin.x * (cols - 1);
    const oy = origin.y * (rows - 1);
    let maxD = 1;
    const cells: { key: string; d: number; accent: boolean }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const d = Math.hypot(c - ox, r - oy);
        if (d > maxD) maxD = d;
        cells.push({ key: `${c}-${r}`, d, accent: (c * 7 + r * 13) % 17 === 0 });
      }
    }
    return { cell, cols, cells, maxD };
  }, [dims, origin.x, origin.y]);

  const covered = phase === 'cover' || phase === 'hold';

  return (
    <>
      {phase !== 'idle' && (
        <div
          aria-hidden
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${grid.cols}, ${grid.cell}px)`,
            gridAutoRows: `${grid.cell}px`,
          }}
        >
          {grid.cells.map((cell) => (
            <motion.div
              key={cell.key}
              className={cell.accent ? 'bg-accent' : 'bg-ink'}
              initial={{ opacity: phase === 'cover' ? 0 : 1 }}
              animate={{ opacity: covered ? 1 : 0 }}
              transition={{
                duration: STEP,
                ease: [0.23, 1, 0.32, 1],
                delay: (cell.d / grid.maxD) * SPREAD,
              }}
            />
          ))}
        </div>
      )}
      <AnimatePresence>{phase === 'hold' && <IntroLoader key="loader" />}</AnimatePresence>
    </>
  );
}
