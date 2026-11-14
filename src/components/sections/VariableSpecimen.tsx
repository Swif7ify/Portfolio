'use client';

import React, { useRef } from "react";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useInView } from "@/src/hooks/useInView";
import { clamp, lerp } from "@/src/utils/math";
import { ChapterHeader } from "@/src/components/ChapterHeader";

const RADIUS = 320;
const specimenLines = ["EARL ORDOVEZ", "CREATIVE DEV"];

interface LetterAxis {
  w: number;
  d: number;
  y: number;
  s: number;
}

/** Each glyph's weight, width, lift, scale, and luminescence react to cursor proximity. */
export function VariableSpecimen() {
  const blockRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const axes = useRef<LetterAxis[]>([]);
  const pointer = useRef({ x: -9999, y: -9999, active: false });
  const inView = useInView(blockRef);

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    letterRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = pointer.current.active
        ? Math.hypot(r.left + r.width / 2 - pointer.current.x, r.top + r.height / 2 - pointer.current.y)
        : 9999;
      const k = 1 - clamp(d / RADIUS);
      const ease = k * k * (3 - 2 * k);
      const a = axes.current[i] ?? (axes.current[i] = { w: 200, d: 40, y: 0, s: 1 });

      a.w = lerp(a.w, 200 + 780 * ease, 0.16);
      a.d = lerp(a.d, 40 + 111 * ease, 0.16);
      a.y = lerp(a.y, -ease * 26, 0.16);
      a.s = lerp(a.s, 1 + ease * 0.24, 0.16);

      el.style.fontVariationSettings = `'wght' ${a.w.toFixed(0)}, 'wdth' ${a.d.toFixed(1)}`;
      el.style.transform = `translate3d(0, ${a.y.toFixed(1)}px, 0) scale(${a.s.toFixed(3)})`;

      if (ease > 0.08) {
        el.style.color = "rgb(var(--accent))";
        el.style.textShadow = `0 0 ${Math.round(ease * 24)}px rgb(var(--accent) / 0.45)`;
      } else {
        el.style.color = "";
        el.style.textShadow = "";
      }
    });
  }, inView);

  return (
    <section id="specimen" aria-labelledby="specimen-title" className="relative overflow-hidden bg-bg px-4 py-32 md:px-6 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <ChapterHeader
          id="specimen-title"
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
          onPointerEnter={(e) => {
            pointer.current = { x: e.clientX, y: e.clientY, active: true };
          }}
          onPointerMove={(e) => {
            pointer.current = { x: e.clientX, y: e.clientY, active: true };
          }}
          onPointerLeave={() => {
            pointer.current = { x: -9999, y: -9999, active: false };
          }}
          data-cursor="Breathe"
          className="mt-16 select-none border-y border-hair py-16 cursor-crosshair overflow-hidden"
          aria-label={specimenLines.join(" ")}
          role="img"
        >
          {specimenLines.map((line, lineIdx) => {
            const lineOffset = lineIdx === 0 ? 0 : specimenLines[0].length;
            return (
              <p
                key={line}
                aria-hidden
                className="whitespace-nowrap text-center font-display text-[clamp(3rem,9.5vw,9.5rem)] leading-[0.98] tracking-[-0.02em] text-fg py-2"
              >
                {line.split("").map((ch, j) => {
                  const n = lineOffset + j;
                  return (
                    <span
                      key={j}
                      ref={(el) => {
                        letterRefs.current[n] = el;
                      }}
                      className="inline-block transition-colors duration-200 will-change-transform"
                      style={{
                        fontVariationSettings: "'wght' 200, 'wdth' 40",
                        transformOrigin: "50% 80%",
                      }}
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  );
                })}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
