'use client';

import React, { useRef } from "react";
import { zoomTiles } from "@/src/data/pageSections";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { clamp, lerp, sectionProgress } from "@/src/utils/math";

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Full-bleed hero that pulls back on scroll to reveal it was one tile in a grid all along. */
export function ZoomOutGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    const s = sectionRef.current;
    if (!s) return;
    const r = s.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    const p = sectionProgress(s);
    const z = clamp((p - 0.08) / 0.62);
    const e = easeInOut(z);
    tileRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === 4) {
        const start = Math.max(window.innerWidth / el.offsetWidth, window.innerHeight / el.offsetHeight) * 1.02;
        const sc = lerp(start, 1, e);
        el.style.transform = `scale(${sc.toFixed(4)})`;
        el.style.borderRadius = `${((16 * e) / sc).toFixed(2)}px`;
        return;
      }
      const dx = (i % 3) - 1;
      const dy = Math.floor(i / 3) - 1;
      const dist = Math.abs(dx) + Math.abs(dy);
      const local = clamp((e - 0.3 - dist * 0.08) / 0.55);
      const off = (1 - local) * 140;
      el.style.transform = `translate3d(${(dx * off).toFixed(1)}px, ${(dy * off).toFixed(1)}px, 0) scale(${(0.9 + 0.1 * local).toFixed(4)})`;
      el.style.opacity = local.toFixed(3);
    });
    if (headRef.current) headRef.current.style.opacity = String(1 - clamp(z / 0.28));
    if (captionRef.current) {
      const c = clamp((p - 0.74) / 0.14);
      captionRef.current.style.opacity = String(c);
      captionRef.current.style.transform = `translate3d(0, ${((1 - c) * 16).toFixed(1)}px, 0)`;
    }
  });

  return (
    <section ref={sectionRef} id="zoomout" aria-labelledby="zoomout-title" className="relative h-[320vh] bg-bg">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="grid grid-cols-3 gap-3 md:gap-4" style={{ width: "min(92vw, 100vh)" }}>
          {zoomTiles.map((src, i) => (
            <div
              key={i}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface will-change-transform ${i === 4 ? "z-10" : ""}`}
              style={i === 4 ? undefined : { opacity: 0 }}
            >
              <img
                src={src}
                alt={i === 4 ? "Featured perspective visual" : ""}
                aria-hidden={i !== 4}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div ref={headRef} className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/45 px-4 text-center text-white">
          <h2
            id="zoomout-title"
            className="max-w-4xl font-display text-[clamp(2.75rem,7vw,7rem)] leading-[0.9] tracking-[-0.035em]"
            style={{ fontVariationSettings: "'wght' 800, 'wdth' 72" }}
          >
            Every single milestone is part of a larger canvas.
          </h2>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Scroll to pull back the lens</p>
        </div>

        <div ref={captionRef} className="pointer-events-none absolute inset-x-0 bottom-24 z-20 flex justify-center px-4 opacity-0 md:bottom-28">
          <p className="glass max-w-lg rounded-xl px-5 py-3 text-center text-sm text-fg">
            A single memory expands into the multifaceted mosaic of projects, creative experiments, and visual artifacts.
          </p>
        </div>
      </div>
    </section>
  );
}
