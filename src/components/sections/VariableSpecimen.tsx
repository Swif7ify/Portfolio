'use client';

import React, { useRef } from "react";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useInView } from "@/src/hooks/useInView";
import { clamp, lerp } from "@/src/utils/math";
import { ChapterHeader } from "@/src/components/ChapterHeader";

const RADIUS = 280;
const specimenLines = ["EARL ORDOVEZ", "CREATIVE DEV"];

/** Each glyph's weight and width are a function of its distance to the pointer, lerped per frame. */
export function VariableSpecimen() {
  const blockRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const axes = useRef<{ w: number; d: number }[]>([]);
  const pointer = useRef({ x: -9999, y: -9999 });
  const inView = useInView(blockRef);

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    letterRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.hypot(r.left + r.width / 2 - pointer.current.x, r.top + r.height / 2 - pointer.current.y);
      const k = 1 - clamp(d / RADIUS);
      const ease = k * k * (3 - 2 * k);
      const a = axes.current[i] ?? (axes.current[i] = { w: 120, d: 30 });
      a.w = lerp(a.w, 120 + 880 * ease, 0.14);
      a.d = lerp(a.d, 30 + 121 * ease, 0.14);
      el.style.fontVariationSettings = `'wght' ${a.w.toFixed(0)}, 'wdth' ${a.d.toFixed(1)}`;
    });
  }, inView);

  let idx = 0;

  return (
    <section id="specimen" aria-labelledby="specimen-title" className="relative overflow-hidden bg-bg px-4 py-32 md:px-6 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <ChapterHeader
          id="specimen-title"
          number="09"
          kicker="Proximity Variable Typography"
          title={
            <>
              Typography that
              <br />
              <span className="text-muted">breathes with you.</span>
            </>
          }
          description="Interactive typography that reacts to your presence and movement in real time. Hover your cursor across the letterforms below."
        />

        <div
          ref={blockRef}
          onPointerMove={(e) => (pointer.current = { x: e.clientX, y: e.clientY })}
          onPointerLeave={() => (pointer.current = { x: -9999, y: -9999 })}
          className="mt-16 select-none border-y border-hair py-16 cursor-crosshair"
          aria-label={specimenLines.join(" ")}
          role="img"
        >
          {specimenLines.map((line) => (
            <p key={line} aria-hidden className="whitespace-nowrap text-center font-display text-[clamp(3rem,9.5vw,9.5rem)] leading-[0.95] tracking-[-0.02em] text-fg">
              {line.split("").map((ch, j) => {
                const n = idx++;
                return (
                  <span
                    key={j}
                    ref={(el) => {
                      letterRefs.current[n] = el;
                    }}
                    className="inline-block transition-transform duration-75"
                    style={{ fontVariationSettings: "'wght' 120, 'wdth' 30" }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
