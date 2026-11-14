'use client';

import React, { useEffect, useRef } from "react";
import { useKinetic } from "@/src/contexts/KineticContext";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useInView } from "@/src/hooks/useInView";
import { ChapterHeader } from "@/src/components/ChapterHeader";
import { drawRippleSource } from "@/src/utils/rippleSource";

interface Sim {
  w: number;
  h: number;
  cur: Float32Array;
  prev: Float32Array;
  src: Uint8ClampedArray;
  out: ImageData;
}

const DAMP = 0.982;

/** Discrete 2D wave equation on a heightfield; gradients refract and shade a typographic poster. */
export function WaterRipple() {
  const { theme, metrics, reducedMotion } = useKinetic();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sim = useRef<Sim | null>(null);
  const rain = useRef(0);
  const inView = useInView(wrapRef);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const build = () => {
      const w = Math.max(80, Math.floor(wrap.clientWidth / 2));
      const h = Math.max(60, Math.floor(wrap.clientHeight / 2));
      canvas.width = w;
      canvas.height = h;
      drawRippleSource(ctx, w, h);
      sim.current = {
        w,
        h,
        cur: new Float32Array(w * h),
        prev: new Float32Array(w * h),
        src: ctx.getImageData(0, 0, w, h).data,
        out: ctx.createImageData(w, h)
      };
    };
    const raf = requestAnimationFrame(build);
    void document.fonts?.ready.then(build);
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [theme]);

  const drop = (x: number, y: number, radius: number, strength: number) => {
    const s = sim.current;
    if (!s) return;
    for (let j = -radius; j <= radius; j++)
      for (let i = -radius; i <= radius; i++) {
        const px = x + i;
        const py = y + j;
        if (px < 1 || py < 1 || px >= s.w - 1 || py >= s.h - 1 || i * i + j * j > radius * radius) continue;
        s.prev[py * s.w + px] += strength;
      }
  };

  useAnimationFrame((dt) => {
    if (typeof window === "undefined") return;
    const s = sim.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!s || !ctx) return;
    const { w, h, src, out } = s;

    rain.current += dt;
    const v = Math.abs(metrics.current.velocity);
    if (!reducedMotion && (rain.current > 0.45 || (v > 6 && Math.random() < 0.3))) {
      rain.current = 0;
      drop(Math.floor(Math.random() * w), Math.floor(Math.random() * h), 2, 160 + v * 6);
    }

    const { prev } = s;
    const cur = s.cur;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        cur[i] = ((prev[i - 1] + prev[i + 1] + prev[i - w] + prev[i + w]) * 0.5 - cur[i]) * DAMP;
      }
    }
    s.cur = prev;
    s.prev = cur;

    const d = out.data;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        const dx = cur[i - 1] - cur[i + 1];
        const dy = cur[i - w] - cur[i + w];
        let sx = (x + dx * 0.05) | 0;
        let sy = (y + dy * 0.05) | 0;
        if (sx < 0) sx = 0;
        else if (sx >= w) sx = w - 1;
        if (sy < 0) sy = 0;
        else if (sy >= h) sy = h - 1;
        const si = (sy * w + sx) * 4;
        const di = i * 4;
        const shade = (dx + dy) * 0.12;
        d[di] = src[si] + shade;
        d[di + 1] = src[si + 1] + shade;
        d[di + 2] = src[si + 2] + shade;
        d[di + 3] = 255;
      }
    }
    ctx.putImageData(out, 0, 0);
  }, inView);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = sim.current;
    if (!s) return;
    const r = e.currentTarget.getBoundingClientRect();
    drop(Math.floor(((e.clientX - r.left) / r.width) * s.w), Math.floor(((e.clientY - r.top) / r.height) * s.h), 3, 220);
  };
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = sim.current;
    if (!s) return;
    const r = e.currentTarget.getBoundingClientRect();
    drop(Math.floor(((e.clientX - r.left) / r.width) * s.w), Math.floor(((e.clientY - r.top) / r.height) * s.h), 7, 900);
  };

  return (
    <section id="ripple" aria-labelledby="ripple-title" className="relative bg-bg px-4 py-32 md:px-6 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <ChapterHeader
          id="ripple-title"
          number="10"
          kicker="Liquid Surface & Interactive Distortion"
          title={
            <>
              Disturb the surface.
              <br />
              <span className="text-muted">Liquid memory.</span>
            </>
          }
          description="Touch or move your cursor across the surface to awaken ripple dynamics that refract and distort the typography beneath."
        />

        <div
          ref={wrapRef}
          onPointerMove={onMove}
          onPointerDown={onDown}
          className="relative mt-16 h-[70vh] min-h-[420px] touch-pan-y overflow-hidden rounded-3xl border border-hair cursor-pointer"
        >
          <canvas ref={canvasRef} className="h-full w-full" role="img" aria-label="Interactive water surface over a typographic poster" />
        </div>
      </div>
    </section>
  );
}
