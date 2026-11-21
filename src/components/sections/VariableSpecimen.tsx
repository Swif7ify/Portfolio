'use client';

import React, { useRef, useState } from "react";
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
  const axes = useRef<{ w: number; d: number; str: string }[]>([]);
  const pointer = useRef({ x: -9999, y: -9999 });
  const settledRef = useRef<boolean>(true);
  const [hovered, setHovered] = useState(false);
  const inView = useInView(blockRef, "200px");

  useAnimationFrame(() => {
    if (!hovered && settledRef.current) return;

    const els = letterRefs.current;
    const px = pointer.current.x;
    const py = pointer.current.y;

    // Pass 1: Read all bounding boxes before mutating any fontVariationSettings to prevent 24x forced reflows
    const distances = new Array<number>(els.length);
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) {
        distances[i] = 99999;
        continue;
      }
      if (!hovered) {
        distances[i] = 99999;
      } else {
        const r = el.getBoundingClientRect();
        distances[i] = Math.hypot(r.left + r.width / 2 - px, r.top + r.height / 2 - py);
      }
    }

    // Pass 2: Interpolate axes and write only changed fontVariationSettings
    let allAtRest = !hovered;
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) continue;
      const k = 1 - clamp(distances[i] / RADIUS);
      const ease = k * k * (3 - 2 * k);
      const targetW = 120 + 880 * ease;
      const targetD = 30 + 121 * ease;
      const a = axes.current[i] ?? (axes.current[i] = { w: 120, d: 30, str: "'wght' 120, 'wdth' 30.0" });
      a.w = lerp(a.w, targetW, 0.14);
      a.d = lerp(a.d, targetD, 0.14);

      if (Math.abs(a.w - 120) > 0.6 || Math.abs(a.d - 30) > 0.15) {
        allAtRest = false;
      } else if (!hovered) {
        a.w = 120;
        a.d = 30;
      }

      const nextStr = `'wght' ${a.w.toFixed(0)}, 'wdth' ${a.d.toFixed(1)}`;
      if (nextStr !== a.str) {
        a.str = nextStr;
        el.style.fontVariationSettings = nextStr;
      }
    }

    if (allAtRest) {
      settledRef.current = true;
    }
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
          description="Interactive variable typography. Every glyph calculates its proximity to your cursor and dynamically interpolates its width and weight axes in real time."
        />

        <div
          ref={blockRef}
          onPointerEnter={(e) => {
            pointer.current = { x: e.clientX, y: e.clientY };
            settledRef.current = false;
            setHovered(true);
          }}
          onPointerMove={(e) => {
            pointer.current = { x: e.clientX, y: e.clientY };
            settledRef.current = false;
            if (!hovered) setHovered(true);
          }}
          onPointerLeave={() => {
            pointer.current = { x: -9999, y: -9999 };
            setHovered(false);
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
                className="whitespace-nowrap text-center font-display text-[clamp(2.5rem,8vw,8rem)] leading-[0.98] tracking-[-0.02em] text-fg py-2"
                style={{ fontFamily: '"Roboto Flex", system-ui, sans-serif' }}
              >
                {line.split("").map((ch, j) => {
                  const n = lineOffset + j;
                  return (
                    <span
                      key={j}
                      ref={(el) => {
                        letterRefs.current[n] = el;
                      }}
                      className="inline-block"
                      style={{
                        fontFamily: '"Roboto Flex", system-ui, sans-serif',
                        fontVariationSettings: "'wght' 120, 'wdth' 30.0",
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
