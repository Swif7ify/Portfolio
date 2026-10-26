"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

type CursorMode = 'default' | 'link' | 'label';

const SIZES: Record<CursorMode, number> = { default: 12, link: 40, label: 92 };

export function PixelCursor() {
  const enabled = useMediaQuery('(pointer: fine)');
  const [mode, setMode] = useState<CursorMode>('default');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 50, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 900, damping: 50, mass: 0.35 });
  const gx = useTransform(sx, (v) => Math.round(v / 4) * 4);
  const gy = useTransform(sy, (v) => Math.round(v / 4) * 4);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-pixel-cursor');

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target instanceof Element ? e.target : null;
      const labeled = target?.closest<HTMLElement>('[data-cursor]');
      if (labeled) {
        setMode('label');
        setLabel(labeled.dataset.cursor ?? '');
      } else if (target?.closest('a, button, [role="button"], input, select, textarea')) {
        setMode('link');
      } else {
        setMode('default');
      }
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    return () => {
      root.classList.remove('has-pixel-cursor');
      window.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const size = SIZES[mode];

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      style={{ x: gx, y: gy }}
    >
      <motion.div
        className={`flex items-center justify-center font-mono text-xs uppercase tracking-wide ${
          mode === 'link'
            ? 'border-2 border-accent bg-transparent'
            : 'bg-accent text-accent-ink font-bold'
        }`}
        style={{ translateX: '-50%', translateY: '-50%' }}
        animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      >
        {mode === 'label' && label}
      </motion.div>
    </motion.div>
  );
}
