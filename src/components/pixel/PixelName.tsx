"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
};

type PixelNameProps = {
  text: string;
  accent: string;
  ready: boolean;
};

export function PixelName({ text, accent, ready }: PixelNameProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyRef = useRef(ready);
  const colorsRef = useRef({ ink: 'rgb(18,18,18)', accent: 'rgb(255,79,26)' });
  const reduce = useReducedMotion();
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    readyRef.current = ready;
  }, [ready]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const s = getComputedStyle(el);
    colorsRef.current = {
      ink: toRgb(s.getPropertyValue('--ink'), 'rgb(18,18,18)'),
      accent: toRgb(s.getPropertyValue('--accent'), 'rgb(255,79,26)'),
    };
  }, [accent]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let h = 0;
    let gap = 6;
    let raf = 0;
    let cancelled = false;
    let visible = true;
    let built = false;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const mouse = { x: -9999, y: -9999 };

    const build = async (scatter: boolean) => {
      try {
        await document.fonts.load(font(100));
      } catch {
        /* fall back to available fonts */
      }
      if (cancelled) return;
      const w = wrap.clientWidth;
      if (!w) return;
      width = w;
      const lines = w < 640 ? text.split(' ') : [text];
      const measure = document.createElement('canvas').getContext('2d');
      if (!measure) return;
      measure.font = font(100);
      const widest = Math.max(...lines.map((l) => measure.measureText(l).width));
      const fontSize = Math.floor((w / widest) * 100 * 0.98);
      const lineHeight = fontSize * 0.9;
      const rawH = Math.ceil(lineHeight * lines.length + fontSize * 0.4);

      const off = document.createElement('canvas');
      off.width = w;
      off.height = rawH;
      const octx = off.getContext('2d', { willReadFrequently: true });
      if (!octx) return;
      octx.font = font(fontSize);
      octx.textBaseline = 'top';
      octx.fillStyle = '#000';
      lines.forEach((line, i) => octx.fillText(line, 0, i * lineHeight));
      const data = octx.getImageData(0, 0, w, rawH).data;

      gap = Math.max(4, Math.round(fontSize / 36));
      const half = Math.floor(gap / 2);
      const pts: { x: number; y: number }[] = [];
      let minY = Infinity;
      let maxY = 0;
      for (let y = 0; y + half < rawH; y += gap) {
        for (let x = 0; x + half < w; x += gap) {
          if (data[((y + half) * w + (x + half)) * 4 + 3] > 128) {
            pts.push({ x, y });
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      if (!pts.length) return;

      h = maxY - minY + gap;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setHeight(h);

      const animateIn = scatter && !reduce;
      particles = pts.map((p) => {
        const tx = p.x;
        const ty = p.y - minY;
        return {
          tx,
          ty,
          x: animateIn ? Math.random() * w : tx,
          y: animateIn ? ty + (Math.random() - 0.5) * h * 3 : ty,
          vx: 0,
          vy: 0,
        };
      });
      built = true;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || !built || !readyRef.current) return;
      ctx.clearRect(0, 0, width, h);
      const R = gap * 18;
      const R2 = R * R;
      const { ink, accent: acc } = colorsRef.current;
      const hot: Particle[] = [];

      ctx.fillStyle = ink;
      ctx.beginPath();
      for (const p of particles) {
        if (!reduce) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R) * 3;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        p.vx = (p.vx + (p.tx - p.x) * 0.055) * 0.8;
        p.vy = (p.vy + (p.ty - p.y) * 0.055) * 0.8;
        p.x += p.vx;
        p.y += p.vy;
        const drift = Math.abs(p.x - p.tx) + Math.abs(p.y - p.ty);
        if (drift > gap * 1.5) {
          hot.push(p);
        } else {
          ctx.rect(Math.round(p.x / gap) * gap, Math.round(p.y / gap) * gap, gap - 1, gap - 1);
        }
      }
      ctx.fill();

      if (hot.length) {
        ctx.fillStyle = acc;
        ctx.beginPath();
        for (const p of hot) {
          ctx.rect(Math.round(p.x / gap) * gap, Math.round(p.y / gap) * gap, gap - 1, gap - 1);
        }
        ctx.fill();
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let lastWidth = wrap.clientWidth;
    const ro = new ResizeObserver(() => {
      if (wrap.clientWidth === lastWidth) return;
      lastWidth = wrap.clientWidth;
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => build(false), 150);
    });
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    build(true);
    raf = requestAnimationFrame(tick);
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    ro.observe(wrap);
    io.observe(wrap);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (resizeTimer) clearTimeout(resizeTimer);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
      ro.disconnect();
      io.disconnect();
    };
  }, [text, reduce]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="relative w-full touch-pan-y select-none"
      style={{ minHeight: height ?? '16vw' }}
    >
      <canvas ref={canvasRef} className="block w-full" />
    </div>
  );
}

function font(size: number) {
  return `600 ${size}px "Pixelify Sans", monospace`;
}

function toRgb(triplet: string, fallback: string) {
  const val = triplet.trim();
  if (val.startsWith('rgb')) return val;
  if (!val) return fallback;
  return `rgb(${val.split(/\s+/).join(',')})`;
}
