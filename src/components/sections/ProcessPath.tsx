'use client';

import React, { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useElementMetrics } from "@/src/hooks/useElementMetrics";
import { useInView } from "@/src/hooks/useInView";
import { clamp, lerp } from "@/src/utils/math";

const PATH = "M50 0 C 88 90, 88 150, 50 200 S 12 310, 50 400 S 88 510, 50 600 S 12 710, 50 800 S 88 910, 50 1000";
const AT = [0.1, 0.3, 0.5, 0.7, 0.9];
const LUT_STEPS = 200;

const lifeRoadmapSteps = [
  {
    id: "step-1",
    phase: "Phase 01",
    title: "The Awakening",
    period: "2018 — 2019",
    body: "First lines of code. Deep curiosity for how websites operate under the hood. Spent hundreds of hours dissecting open-source codebases and experimenting."
  },
  {
    id: "step-2",
    phase: "Phase 02",
    title: "Full-Stack Foundations",
    period: "2020 — 2021",
    body: "Expanding beyond static frontends into distributed architectures, state management, REST/GraphQL APIs, databases, and modern TypeScript ecosystems."
  },
  {
    id: "step-3",
    phase: "Phase 03",
    title: "The Motion & Physics Epiphany",
    period: "2022 — 2023",
    body: "Realizing that utility alone is not enough — software needs soul. Began studying spring physics, WebGL, shaders, kinetic typography, and fluid micro-interactions."
  },
  {
    id: "step-4",
    phase: "Phase 04",
    title: "Production Engineering & Ship Velocity",
    period: "2024 — 2025",
    body: "Delivering production applications for startups and studios. Balancing sub-pixel aesthetics with uncompromising performance and accessibility."
  },
  {
    id: "step-5",
    phase: "Phase 05",
    title: "The Boundless Horizon",
    period: "2026 & Beyond",
    body: "Creating transformative web experiences that inspire. Constantly pushing the technical frontier while keeping people and craft at the center."
  }
];

/** A winding line draws itself down the page; each step lights up the moment the line reaches it. */
export function ProcessPath() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const len = useRef(1);
  const lutRef = useRef<{ x: number; y: number }[]>([]);
  const lastPRef = useRef<number>(-1);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const inView = useInView(wrapRef, "200px");
  const wrapMetrics = useElementMetrics(wrapRef);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = pathRef.current;
    if (!path) return;
    const totalLen = path.getTotalLength();
    len.current = totalLen;
    path.style.strokeDasharray = String(totalLen);

    // Pre-sample lookup table once on mount so scroll RAF never calls path.getPointAtLength()
    const lut: { x: number; y: number }[] = new Array(LUT_STEPS + 1);
    for (let i = 0; i <= LUT_STEPS; i++) {
      const pt = path.getPointAtLength((i / LUT_STEPS) * totalLen);
      lut[i] = { x: pt.x, y: pt.y / 10 };
    }
    lutRef.current = lut;

    setPoints(
      AT.map((t) => {
        const pt = path.getPointAtLength(t * totalLen);
        return { x: pt.x, y: pt.y / 10 };
      })
    );
  }, []);

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    const path = pathRef.current;
    const lut = lutRef.current;
    if (!path || lut.length === 0) return;

    const m = wrapMetrics.current;
    const rTop = m.docTop - window.scrollY;
    const p = clamp((m.vh * 0.6 - rTop) / m.height);
    if (Math.abs(p - lastPRef.current) < 0.0002) return;
    lastPRef.current = p;

    path.style.strokeDashoffset = String(len.current * (1 - p));

    // O(1) lookup table interpolation instead of SVG path.getPointAtLength()
    const idxF = p * LUT_STEPS;
    const idx0 = Math.min(LUT_STEPS, Math.floor(idxF));
    const idx1 = Math.min(LUT_STEPS, idx0 + 1);
    const frac = idxF - idx0;
    const headX = lerp(lut[idx0].x, lut[idx1].x, frac);
    const headY = lerp(lut[idx0].y, lut[idx1].y, frac);

    if (headRef.current) {
      headRef.current.style.left = `${headX.toFixed(2)}%`;
      headRef.current.style.top = `${headY.toFixed(2)}%`;
    }
    AT.forEach((t, i) => {
      const on = p >= t - 0.005;
      const step = stepRefs.current[i];
      const node = nodeRefs.current[i];
      if (step) {
        step.style.opacity = on ? "1" : "0.2";
        step.style.transform = `translate3d(0, ${on ? 0 : 16}px, 0)`;
      }
      if (node) node.dataset.on = on ? "1" : "0";
    });
  }, inView);

  return (
    <section id="process" aria-labelledby="process-title" className="relative bg-bg px-4 py-32 md:px-6 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <h2 id="process-title" className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.03em]" style={{ fontVariationSettings: "'wght' 760, 'wdth' 78" }}>
          The path walked,
          <br />
          <span className="text-muted">drawn step by step.</span>
        </h2>

        <div ref={wrapRef} className="relative mx-auto mt-20 h-[300vh] max-w-5xl">
          <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            <path d={PATH} fill="none" stroke="var(--hairline)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <path ref={pathRef} d={PATH} fill="none" stroke="rgb(var(--accent))" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
          </svg>
          <span
            ref={headRef}
            aria-hidden
            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-8 ring-accent/20"
            style={{ left: "50%", top: 0 }}
          />
          {points.map((pt, i) => {
            const right = pt.x < 50;
            const s = lifeRoadmapSteps[i];
            if (!s) return null;
            return (
              <React.Fragment key={s.id}>
                <span
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  aria-hidden
                  data-on="0"
                  className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-muted bg-bg transition-[background-color,border-color] duration-200 data-[on='1']:border-accent data-[on='1']:bg-accent"
                  style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                />

                <div
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="absolute w-[44%] -translate-y-1/2 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    top: `${pt.y}%`,
                    ...(right ? { left: "54%" } : { right: "54%", textAlign: "right" }),
                    opacity: 0.2
                  }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{s.period}</p>
                  <h3 className="mt-1 text-[clamp(1.5rem,3vw,2.5rem)] leading-[1] tracking-[-0.02em]" style={{ fontVariationSettings: "'wght' 740, 'wdth' 80" }}>
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted md:text-base">{s.body}</p>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
