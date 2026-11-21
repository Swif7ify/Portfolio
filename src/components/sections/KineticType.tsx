'use client';

import React, { useRef } from "react";
import Image from "next/image";
import { useKinetic } from "@/src/contexts/KineticContext";
import { marqueeRows, trailImages } from "@/src/data/exhibits";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useInView } from "@/src/hooks/useInView";
import { getImagePath } from "@/src/utils/image";
import { clamp } from "@/src/utils/math";
import { ScrambleText } from "@/src/components/type/ScrambleText";

const TRAIL_POOL = 12;

export function KineticType() {
  const { metrics, reducedMotion } = useKinetic();
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowHalfWidthsRef = useRef<number[]>([1200, 1200]);
  const trailStageRectRef = useRef<{ left: number; top: number }>({ left: 0, top: 0 });
  const offsets = useRef([0, 0]);
  const dir = useRef(1);
  const trailRefs = useRef<(HTMLImageElement | null)[]>([]);
  const trail = useRef({ i: 0, lastX: 0, lastY: 0, z: 1 });
  const inView = useInView(sectionRef);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const measure = () => {
      rowHalfWidthsRef.current = rowRefs.current.map((row) => (row ? Math.max(1, row.scrollWidth / 2) : 1200));
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((dt) => {
    if (typeof window === "undefined") return;
    const v = metrics.current.velocity;
    if (Math.abs(v) > 0.5) dir.current = v > 0 ? 1 : -1;
    const speed = (reducedMotion ? 0 : 60) + Math.min(Math.abs(v), 50) * 40;
    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      const half = rowHalfWidthsRef.current[i] || 1200;
      const sign = i % 2 === 0 ? -1 : 1;
      let x = offsets.current[i] + sign * dir.current * speed * dt;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      offsets.current[i] = x;
      row.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0) skewX(${(clamp(v, -40, 40) * -0.35).toFixed(2)}deg)`;
    });
  }, inView);

  const onTrailEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    trailStageRectRef.current = { left: r.left, top: r.top };
  };

  const onTrailMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = trailStageRectRef.current;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const t = trail.current;
    if (Math.hypot(x - t.lastX, y - t.lastY) < 90) return;
    const img = trailRefs.current[t.i % TRAIL_POOL];
    t.i++;
    t.lastX = x;
    t.lastY = y;
    if (!img) return;
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.zIndex = String(t.z++);
    const rot = (Math.random() - 0.5) * 16;
    img.animate(
      [
        { opacity: 0, transform: `translate(-50%, -50%) scale(0.9) rotate(${rot}deg)` },
        { opacity: 1, transform: `translate(-50%, -50%) scale(1) rotate(${rot}deg)`, offset: 0.2 },
        { opacity: 1, transform: `translate(-50%, -50%) scale(1) rotate(${rot}deg)`, offset: 0.6 },
        { opacity: 0, transform: `translate(-50%, calc(-50% + 40px)) scale(0.94) rotate(${rot}deg)` }
      ],
      { duration: 1000, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "forwards" }
    );
  };

  return (
    <section ref={sectionRef} id="kinetic-type" aria-labelledby="type-title" className="relative overflow-hidden bg-bg py-32 md:py-40">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          <span className="text-accent">08</span> — Kinetic Typography & Memory Trails
        </p>
        <h2
          id="type-title"
          className="chroma mt-4 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.03em]"
          style={{ fontVariationSettings: "'wght' 760, 'wdth' 78" }}
        >
          <ScrambleText text="TYPE THAT REACTS" />
          <br />
          <span className="text-muted">
            <ScrambleText text="TO HOW YOU EXPLORE." />
          </span>
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
          Speed, direction, and typographic skew are coupled to your scroll velocity. Move your pointer over the interactive canvas below to uncover snapshots from the archives.
        </p>
      </div>

      <div aria-hidden className="mt-16 space-y-2 border-y border-hair py-6">
        {marqueeRows.map((row, i) => (
          <div key={row} className="overflow-hidden">
            <div
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="flex w-max whitespace-nowrap will-change-transform"
            >
              {[0, 1].map((k) => (
                <span
                  key={k}
                  className={`pr-8 font-display text-[clamp(3rem,9vw,8.5rem)] uppercase leading-[1] tracking-[-0.03em] ${
                    i % 2 === 0 ? "text-fg" : "text-outline"
                  }`}
                  style={{ fontVariationSettings: i % 2 === 0 ? "'wght' 900, 'wdth' 60" : "'wght' 300, 'wdth' 120" }}
                >
                  {row} {row}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-[1440px] px-4 md:px-6">
        <div
          onPointerEnter={onTrailEnter}
          onPointerMove={onTrailMove}
          className="relative flex h-[60vh] min-h-[380px] items-center justify-center overflow-hidden rounded-3xl border border-hair bg-surface"
        >
          <div className="pointer-events-none text-center">
            <p className="font-display text-[clamp(2rem,4.5vw,4rem)] leading-none text-fg" style={{ fontVariationSettings: "'wght' 700, 'wdth' 80" }}>
              Move cursor through here.
            </p>
            <p className="mt-3 text-sm text-muted">Trace across the space to reveal archival moments.</p>
          </div>
          {Array.from({ length: TRAIL_POOL }).map((_, i) => (
            <Image
              key={i}
              ref={(el) => {
                trailRefs.current[i] = el;
              }}
              src={getImagePath(trailImages[i % trailImages.length])}
              alt=""
              width={200}
              height={266}
              aria-hidden
              draggable={false}
              className="pointer-events-none absolute left-0 top-0 aspect-[3/4] w-[clamp(120px,14vw,200px)] rounded-xl object-cover opacity-0 shadow-2xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
