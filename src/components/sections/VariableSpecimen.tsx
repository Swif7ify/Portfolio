'use client';

import React, { useRef, useState } from "react";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useInView } from "@/src/hooks/useInView";
import { clamp, lerp } from "@/src/utils/math";
import { ChapterHeader } from "@/src/components/ChapterHeader";
import { ControlSlider } from "@/src/components/sandbox/ControlSlider";

const RADIUS = 280;
const specimenLines = ["EARL ORDOVEZ", "CREATIVE DEV"];

/** Each glyph's weight and width are a function of its distance to the pointer, lerped per frame. */
export function VariableSpecimen() {
  const blockRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const axes = useRef<{ w: number; d: number }[]>([]);
  const pointer = useRef({ x: -9999, y: -9999 });
  const [hovered, setHovered] = useState(false);
  const inView = useInView(blockRef, "200px");
  const [text, setText] = useState("Motion is spent, not sprinkled.");
  const [wght, setWght] = useState(640);
  const [wdth, setWdth] = useState(90);
  const [opsz, setOpsz] = useState(96);
  const [track, setTrack] = useState(-0.02);

  useAnimationFrame(() => {
    letterRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.hypot(
        r.left + r.width / 2 - pointer.current.x,
        r.top + r.height / 2 - pointer.current.y
      );
      const k = 1 - clamp(d / RADIUS);
      const ease = k * k * (3 - 2 * k);
      const a = axes.current[i] ?? (axes.current[i] = { w: 120, d: 30 });
      a.w = lerp(a.w, 120 + 880 * ease, 0.14);
      a.d = lerp(a.d, 30 + 121 * ease, 0.14);
      el.style.fontVariationSettings = `'wght' ${a.w.toFixed(0)}, 'wdth' ${a.d.toFixed(1)}`;
    });
  }, inView || hovered);

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
          description="Interactive variable typography. Every glyph calculates its proximity to your cursor and interpolates weight and width axes in real time. Below, the type tester exposes the variable axes directly."
        />

        <div
          ref={blockRef}
          onPointerEnter={(e) => {
            pointer.current = { x: e.clientX, y: e.clientY };
            setHovered(true);
          }}
          onPointerMove={(e) => {
            pointer.current = { x: e.clientX, y: e.clientY };
            if (!hovered) setHovered(true);
          }}
          onPointerLeave={() => {
            pointer.current = { x: -9999, y: -9999 };
            setHovered(false);
          }}
          data-cursor="Breathe"
          className="mt-16 select-none border-y border-hair py-12 cursor-crosshair overflow-hidden"
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
                      className="inline-block will-change-[font-variation-settings]"
                      style={{
                        fontFamily: '"Roboto Flex", system-ui, sans-serif',
                        fontVariationSettings: "'wght' 120, 'wdth' 30",
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

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <label htmlFor="type-tester" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Type tester — edit me
            </label>
            <textarea
              id="type-tester"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className="mt-4 w-full resize-none bg-transparent font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1] text-fg focus:outline-none"
              style={{
                fontFamily: '"Roboto Flex", system-ui, sans-serif',
                fontVariationSettings: `'wght' ${wght}, 'wdth' ${wdth}, 'opsz' ${opsz}`,
                letterSpacing: `${track}em`,
              }}
            />
          </div>
          <div className="divide-y divide-hair lg:col-span-4">
            <ControlSlider
              label="Weight"
              symbol="wght"
              value={wght}
              min={100}
              max={1000}
              step={1}
              format={(v) => v.toFixed(0)}
              onChange={setWght}
            />
            <ControlSlider
              label="Width"
              symbol="wdth"
              value={wdth}
              min={25}
              max={151}
              step={1}
              format={(v) => v.toFixed(0)}
              onChange={setWdth}
            />
            <ControlSlider
              label="Optical size"
              symbol="opsz"
              value={opsz}
              min={8}
              max={144}
              step={1}
              format={(v) => v.toFixed(0)}
              onChange={setOpsz}
            />
            <ControlSlider
              label="Tracking"
              symbol="em"
              value={track}
              min={-0.08}
              max={0.2}
              step={0.005}
              format={(v) => v.toFixed(3)}
              onChange={setTrack}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
