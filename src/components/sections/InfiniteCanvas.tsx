'use client';

import React, { useEffect, useRef, useState } from "react";
import { useKinetic } from "@/src/contexts/KineticContext";
import { infiniteTiles } from "@/src/data/exhibits";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useInView } from "@/src/hooks/useInView";
import { clamp } from "@/src/utils/math";
import { ChapterHeader } from "@/src/components/ChapterHeader";

const COLS = 7;
const ROWS = 4;
const GAP = 24;
const COUNT = COLS * ROWS;

const mod = (n: number, m: number) => ((n % m) + m) % m;

/** Endless 2D plane: tiles wrap on both axes, pan with inertia, and scale through a lens at the centre. */
export function InfiniteCanvas() {
  const { metrics, reducedMotion } = useKinetic();
  const viewRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const state = useRef({ x: 0, y: 0, vx: 0, vy: 0, dragging: false, lastX: 0, lastY: 0, moved: 0 });
  const [tile, setTile] = useState({ w: 240, h: 312 });
  const inView = useInView(viewRef);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const measure = () => {
      const w = clamp(window.innerWidth * 0.17, 170, 270);
      setTile({ w, h: w * 1.3 });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((dt) => {
    if (typeof window === "undefined") return;
    const view = viewRef.current;
    if (!view) return;
    const s = state.current;
    if (!s.dragging) {
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.93;
      s.vy *= 0.93;
      if (!reducedMotion) s.x -= 18 * dt;
    }
    s.y -= metrics.current.velocity * 0.5;

    const vw = view.clientWidth;
    const vh = view.clientHeight;
    const cellW = tile.w + GAP;
    const cellH = tile.h + GAP;
    const patW = COLS * cellW;
    const patH = ROWS * cellH;
    const maxD = Math.hypot(vw, vh) / 2;

    for (let k = 0; k < COUNT; k++) {
      const el = tileRefs.current[k];
      if (!el) continue;
      const c = k % COLS;
      const r = Math.floor(k / COLS);
      const stagger = c % 2 ? tile.h * 0.4 : 0;
      const x = mod(c * cellW + s.x, patW) - cellW;
      const y = mod(r * cellH + stagger + s.y, patH) - cellH;
      const dist = Math.hypot(x + tile.w / 2 - vw / 2, y + tile.h / 2 - vh / 2);
      const scale = 1 - clamp(dist / maxD) * 0.22;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
      el.style.opacity = (1 - clamp(dist / maxD) * 0.5).toFixed(3);
    }
  }, inView);

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = state.current;
    s.dragging = true;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.vx = 0;
    s.vy = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = state.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.x += dx;
    s.y += dy;
    s.vx = dx;
    s.vy = dy;
  };
  const onUp = () => {
    state.current.dragging = false;
  };

  return (
    <section id="infinite" aria-labelledby="infinite-title" className="relative bg-bg py-32 md:py-40">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6">
        <ChapterHeader
          id="infinite-title"
          number="17"
          kicker="Infinite Visual Canvas"
          title={
            <>
              An endless canvas.
              <br />
              <span className="text-muted">Boundless exploration.</span>
            </>
          }
          description="An infinite draggable gallery of project artifacts and visual experiments. Click and drag in any direction to explore with fluid momentum."
        />
      </div>
      <div
        ref={viewRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="relative mt-16 h-[80vh] min-h-[480px] touch-pan-y select-none overflow-hidden border-y border-hair bg-surface cursor-grab active:cursor-grabbing"
        aria-label="Infinite draggable gallery"
        role="region"
      >
        {Array.from({ length: COUNT }).map((_, k) => {
          const t = infiniteTiles[k % infiniteTiles.length];
          return (
            <div
              key={k}
              ref={(el) => {
                tileRefs.current[k] = el;
              }}
              className="absolute left-0 top-0 overflow-hidden rounded-xl bg-bg will-change-transform shadow-lg"
              style={{ width: tile.w, height: tile.h }}
            >
              <img src={t.image} alt={t.title} draggable={false} className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-2 bg-bg/85 px-3 py-2 backdrop-blur">
                <span className="truncate text-sm text-fg">{t.title}</span>
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">{t.year}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
