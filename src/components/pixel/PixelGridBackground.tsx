"use client";

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type PixelGridBackgroundProps = {
  enabled: boolean;
  accent: string;
};

const CELL = 32;

export function PixelGridBackground({ enabled, accent }: PixelGridBackgroundProps) {
  const staticRef = useRef<HTMLCanvasElement>(null);
  const dynamicRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const sc = staticRef.current;
    const dc = dynamicRef.current;
    if (!sc || !dc) return;
    const sctx = sc.getContext('2d');
    const dctx = dc.getContext('2d');
    if (!sctx || !dctx) return;

    const styles = getComputedStyle(dc);
    const toRgb = (name: string, fallback: string) => {
      const val = styles.getPropertyValue(name).trim();
      if (val.startsWith('rgb')) return val;
      if (!val) return fallback;
      return `rgb(${val.split(/\s+/).join(',')})`;
    };
    const inkColor = toRgb('--ink', 'rgb(18, 18, 18)');
    const accentColor = toRgb('--accent', 'rgb(255, 79, 26)');

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let lastAmbient = 0;
    let last: { x: number; y: number } | null = null;
    const cells = new Map<number, number>();
    const live = enabled && !reduce;

    const drawStatic = () => {
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.clearRect(0, 0, w, h);
      sctx.fillStyle = inkColor;
      sctx.globalAlpha = 0.16;
      for (let x = CELL; x < w; x += CELL) {
        for (let y = CELL; y < h; y += CELL) {
          sctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }
      sctx.globalAlpha = 1;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      for (const c of [sc, dc]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      drawStatic();
    };

    const mark = (px: number, py: number, intensity: number) => {
      const c = Math.floor(px / CELL);
      const r = Math.floor(py / CELL);
      const k = r * 10000 + c;
      cells.set(k, Math.max(cells.get(k) ?? 0, intensity));
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const p = { x: e.clientX, y: e.clientY };
      if (last) {
        const dist = Math.hypot(p.x - last.x, p.y - last.y);
        const steps = Math.max(1, Math.ceil(dist / (CELL / 2)));
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          mark(last.x + (p.x - last.x) * t, last.y + (p.y - last.y) * t, 1);
        }
      } else {
        mark(p.x, p.y, 1);
      }
      last = p;
    };
    const onLeave = () => {
      last = null;
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - lastAmbient > 160) {
        lastAmbient = t;
        mark(Math.random() * w, Math.random() * h, 0.5);
      }
      dctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dctx.clearRect(0, 0, w, h);
      if (!cells.size) return;
      dctx.fillStyle = accentColor;
      cells.forEach((v, k) => {
        const c = k % 10000;
        const r = Math.floor(k / 10000);
        dctx.globalAlpha = v * 0.32;
        dctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
        const next = v - 0.024;
        if (next <= 0) cells.delete(k);
        else cells.set(k, next);
      });
      dctx.globalAlpha = 1;
    };

    resize();
    window.addEventListener('resize', resize);
    if (live) {
      window.addEventListener('pointermove', onMove);
      document.documentElement.addEventListener('pointerleave', onLeave);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, accent, reduce]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={staticRef} className="absolute inset-0 h-full w-full" />
      <canvas ref={dynamicRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
