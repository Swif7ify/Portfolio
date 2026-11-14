'use client';

import React, { useEffect, useRef, useState } from "react";
import { useKinetic } from "@/src/contexts/KineticContext";
import { carouselItems } from "@/src/data/exhibits";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useInView } from "@/src/hooks/useInView";
import { clamp } from "@/src/utils/math";
import { ChapterHeader } from "@/src/components/ChapterHeader";

const N = carouselItems.length;
const STEP = 360 / N;

/** A preserve-3d ring of cards: rotated by scroll, drag with inertia, and pointer tilt. */
export function CylinderCarousel() {
  const { metrics, reducedMotion } = useKinetic();
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const radiusRef = useRef(420);
  const drag = useRef({ active: false, lastX: 0, vel: 0, angle: 0 });
  const tilt = useRef({ value: -6, target: -6 });
  const frontRef = useRef(0);
  const [front, setFront] = useState(0);
  const inView = useInView(stageRef);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const measure = () => {
      const w = cardRefs.current[0]?.offsetWidth ?? 260;
      radiusRef.current = w / 2 / Math.tan(Math.PI / N) + 36;
      cardRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `translate(-50%, -50%) rotateY(${i * STEP}deg) translateZ(${radiusRef.current}px)`;
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((dt) => {
    if (typeof window === "undefined") return;
    const d = drag.current;
    if (!d.active) {
      d.angle += d.vel;
      d.vel *= 0.94;
      if (!reducedMotion) d.angle -= 4 * dt;
    }
    tilt.current.value += (tilt.current.target - tilt.current.value) * 0.08;
    const rot = d.angle - metrics.current.scroll * 0.05;
    const ring = ringRef.current;
    if (ring) {
      ring.style.transform = `translateZ(${-radiusRef.current}px) rotateX(${tilt.current.value.toFixed(2)}deg) rotateY(${rot.toFixed(2)}deg)`;
    }
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const facing = Math.cos(((i * STEP + rot) * Math.PI) / 180);
      el.style.opacity = (0.15 + 0.85 * clamp((facing + 0.1) / 1.1)).toFixed(3);
    });
    const idx = ((Math.round(-rot / STEP) % N) + N) % N;
    if (idx !== frontRef.current) {
      frontRef.current = idx;
      setFront(idx);
    }
  }, inView);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current.active = true;
    drag.current.lastX = e.clientX;
    drag.current.vel = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    tilt.current.target = -6 + ((e.clientY - r.top) / r.height - 0.5) * -14;
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.lastX;
    d.lastX = e.clientX;
    d.angle += dx * 0.25;
    d.vel = dx * 0.25;
  };
  const endDrag = () => {
    drag.current.active = false;
    tilt.current.target = -6;
  };
  const nudge = (dir: number) => {
    drag.current.vel = dir * STEP * 0.06;
  };

  const item = carouselItems[front] ?? carouselItems[0];

  return (
    <section id="carousel" aria-labelledby="carousel-title" className="relative overflow-hidden bg-bg px-4 py-32 md:px-6 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <ChapterHeader
          id="carousel-title"
          number="11"
          kicker="Core Disciplines & Pillars"
          title={
            <>
              A revolving ring.
              <br />
              <span className="text-muted">Core creative pillars.</span>
            </>
          }
          description="Drag with inertia or scroll to spin the ring, discovering the foundational craft disciplines that anchor my engineering."
        />
      </div>

      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        className="relative mt-12 h-[min(78vh,640px)] touch-pan-y select-none cursor-grab active:cursor-grabbing"
        style={{ perspective: "1600px" }}
      >
        <div ref={ringRef} className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
          {carouselItems.map((c, i) => (
            <div
              key={c.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute left-0 top-0 aspect-[3/4] w-[clamp(170px,20vw,270px)] overflow-hidden rounded-2xl border border-hair bg-surface"
              style={{ backfaceVisibility: "hidden", transform: `translate(-50%, -50%) rotateY(${i * STEP}deg) translateZ(420px)` }}
            >
              {c.image ? (
                <img src={c.image} alt={c.title} draggable={false} className="h-full w-full object-cover" />
              ) : (
                <div className={`flex h-full w-full items-center justify-center ${i % 2 === 0 ? "bg-fg text-bg" : "bg-accent text-bg"}`}>
                  <span className="font-display text-[clamp(4rem,8vw,7rem)] leading-none" style={{ fontVariationSettings: "'wght' 900, 'wdth' 60" }}>
                    {c.glyph}
                  </span>
                </div>
              )}
              <span className="absolute bottom-3 left-3 rounded-md bg-bg/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-fg backdrop-blur">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-[1440px] flex-wrap items-end justify-between gap-6">
        <div aria-live="polite">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Focus Pillar · {String(front + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </p>
          <p className="mt-2 text-3xl font-display" style={{ fontVariationSettings: "'wght' 700, 'wdth' 80" }}>
            {item.title}
            <span className="ml-3 font-mono text-xs text-muted">{item.tag}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => nudge(1)}
            className="rounded-full border border-hair px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-fg hover:border-fg transition-colors"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() => nudge(-1)}
            className="rounded-full bg-fg px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-bg hover:bg-accent hover:text-bg transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
