'use client';

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useElementMetrics } from "@/src/hooks/useElementMetrics";
import { useInView } from "@/src/hooks/useInView";
import { clamp, lerp } from "@/src/utils/math";

const AT = [0.1, 0.3, 0.5, 0.7, 0.9] as const;
const LUT_STEPS = 400;

interface Point2D {
  x: number;
  y: number;
}

interface BoxSize {
  w: number;
  h: number;
}

interface ProcessStep {
  id: string;
  phase: string;
  title: string;
  body: string;
}
const buildProcessSteps: ProcessStep[] = [
  {
    id: "step-1",
    phase: "Step 01 · Understand",
    title: "Start with Questions",
    body: "I like to understand how things work before jumping in. I spend time figuring out the problem, exploring different approaches, and learning what I need along the way.",
  },
  {
    id: "step-2",
    phase: "Step 02 · Explore",
    title: "Try Things Out",
    body: "Some things only make sense once you get your hands dirty. I experiment, test different ideas, look things up, and learn from what works and what doesn't.",
  },
  {
    id: "step-3",
    phase: "Step 03 · Create",
    title: "Put Ideas into Practice",
    body: "This is where I bring everything together. Whether it's writing code, working with circuits, or figuring out new tools, I enjoy turning what I've learned into something tangible.",
  },
  {
    id: "step-4",
    phase: "Step 04 · Improve",
    title: "Learn from Mistakes",
    body: "Not everything works on the first try, and that's part of the process. I go back, figure out what went wrong, make changes, and keep improving until things work as they should.",
  },
  {
    id: "step-5",
    phase: "Step 05 · Share",
    title: "Make It Useful",
    body: "For me, learning becomes more meaningful when I can put it to good use. I want the things I create to be useful beyond my own experience and, whenever possible, make a difference to others.",
  },
];

/** Builds a symmetric 5-arch S-curve in exact 1:1 CSS pixel coordinates so strokeDashoffset and getPointAtLength never drift. */
function buildPixelPath(w: number, h: number): string {
  const cx = w * 0.5;
  const rightX = w * 0.88;
  const leftX = w * 0.12;
  return [
    `M ${cx.toFixed(2)} 0`,
    `C ${rightX.toFixed(2)} ${(h * 0.09).toFixed(2)}, ${rightX.toFixed(2)} ${(h * 0.11).toFixed(2)}, ${cx.toFixed(2)} ${(h * 0.2).toFixed(2)}`,
    `S ${leftX.toFixed(2)} ${(h * 0.31).toFixed(2)}, ${cx.toFixed(2)} ${(h * 0.4).toFixed(2)}`,
    `S ${rightX.toFixed(2)} ${(h * 0.51).toFixed(2)}, ${cx.toFixed(2)} ${(h * 0.6).toFixed(2)}`,
    `S ${leftX.toFixed(2)} ${(h * 0.71).toFixed(2)}, ${cx.toFixed(2)} ${(h * 0.8).toFixed(2)}`,
    `S ${rightX.toFixed(2)} ${(h * 0.91).toFixed(2)}, ${cx.toFixed(2)} ${h.toFixed(2)}`,
  ].join(" ");
}

/** A winding line draws itself down the page; each step lights up the exact moment the line reaches it. */
export function ProcessPath() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lenRef = useRef<number>(1);
  const lutRef = useRef<Point2D[]>([]);
  const lastPRef = useRef<number>(-1);
  const [size, setSize] = useState<BoxSize | null>(null);
  const [points, setPoints] = useState<Point2D[]>([]);
  const inView = useInView(wrapRef, "200px");
  const wrapMetrics = useElementMetrics(wrapRef);

  // Measure the real pixel dimensions of the track container so SVG user units === CSS pixels (1:1)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const updateSize = () => {
      const w = Math.round(el.clientWidth);
      const h = Math.round(el.clientHeight);
      if (w <= 0 || h <= 0) return;
      setSize((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
    };

    updateSize();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const syncToScroll = useCallback(
    (force: boolean) => {
      if (typeof window === "undefined") return;
      const path = pathRef.current;
      const lut = lutRef.current;
      if (!path || lut.length === 0) return;

      const m = wrapMetrics.current;
      const rTop = m.docTop - window.scrollY;
      const p = clamp((m.vh * 0.6 - rTop) / m.height);
      if (!force && Math.abs(p - lastPRef.current) < 0.0002) return;
      lastPRef.current = p;

      path.style.strokeDashoffset = `${(lenRef.current * (1 - p)).toFixed(2)}`;

      const idxF = p * LUT_STEPS;
      const idx0 = Math.min(LUT_STEPS, Math.floor(idxF));
      const idx1 = Math.min(LUT_STEPS, idx0 + 1);
      const frac = idxF - idx0;
      const headX = lerp(lut[idx0].x, lut[idx1].x, frac);
      const headY = lerp(lut[idx0].y, lut[idx1].y, frac);

      if (headRef.current) {
        headRef.current.style.transform = `translate3d(${headX.toFixed(2)}px, ${headY.toFixed(2)}px, 0) translate(-50%, -50%)`;
        headRef.current.style.opacity = "1";
      }

      AT.forEach((t, i) => {
        const on = p >= t - 0.004;
        const step = stepRefs.current[i];
        const node = nodeRefs.current[i];
        if (step) {
          step.style.opacity = on ? "1" : "0.2";
          step.style.transform = `translate3d(0, ${on ? 0 : 16}px, 0)`;
        }
        if (node) node.dataset.on = on ? "1" : "0";
      });
    },
    [wrapMetrics]
  );

  // Sample exact pixel-space arc-length lookup table whenever the path geometry changes
  useEffect(() => {
    if (!size) return;
    const path = pathRef.current;
    if (!path) return;

    const totalLen = path.getTotalLength();
    if (totalLen <= 0) return;

    lenRef.current = totalLen;
    path.style.strokeDasharray = `${totalLen.toFixed(2)} ${totalLen.toFixed(2)}`;

    const lut: Point2D[] = new Array(LUT_STEPS + 1);
    for (let i = 0; i <= LUT_STEPS; i++) {
      const pt = path.getPointAtLength((i / LUT_STEPS) * totalLen);
      lut[i] = { x: pt.x, y: pt.y };
    }
    lutRef.current = lut;

    setPoints(
      AT.map((t) => {
        const pt = path.getPointAtLength(t * totalLen);
        return { x: pt.x, y: pt.y };
      })
    );

    lastPRef.current = -1;
    syncToScroll(true);
  }, [size, syncToScroll]);

  useEffect(() => {
    if (points.length > 0) syncToScroll(true);
  }, [points, syncToScroll]);

  useAnimationFrame(() => {
    syncToScroll(false);
  }, inView);

  const pathD = size ? buildPixelPath(size.w, size.h) : "";

  return (
    <section id="process" aria-labelledby="process-title" className="relative bg-bg px-4 py-32 md:px-6 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <h2
          id="process-title"
          className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.03em]"
          style={{ fontVariationSettings: "'wght' 760, 'wdth' 78" }}
        >
          How I build,
          <br />
          <span className="text-muted">step by step.</span>
        </h2>

        <div ref={wrapRef} className="relative mx-auto mt-20 h-[300vh] max-w-5xl">
          {size && (
            <svg
              viewBox={`0 0 ${size.w} ${size.h}`}
              width={size.w}
              height={size.h}
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              aria-hidden
            >
              <path d={pathD} fill="none" stroke="var(--hairline)" strokeWidth="1.5" />
              <path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke="rgb(var(--accent))"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          )}
          <span
            ref={headRef}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-4 w-4 rounded-full bg-accent opacity-0 ring-8 ring-accent/20 will-change-transform"
          />
          {size &&
            points.map((pt, i) => {
              const right = pt.x < size.w * 0.5;
              const s = buildProcessSteps[i];
              if (!s) return null;
              return (
                <React.Fragment key={s.id}>
                  <span
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    aria-hidden
                    data-on="0"
                    className="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-muted bg-bg transition-[background-color,border-color] duration-200 data-[on='1']:border-accent data-[on='1']:bg-accent"
                    style={{ left: `${pt.x.toFixed(2)}px`, top: `${pt.y.toFixed(2)}px` }}
                  />

                  <div
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    className="absolute w-[44%] -translate-y-1/2 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                      top: `${pt.y.toFixed(2)}px`,
                      ...(right ? { left: "54%" } : { right: "54%", textAlign: "right" }),
                      opacity: 0.2,
                    }}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{s.phase}</p>
                    <h3
                      className="mt-1 text-[clamp(1.5rem,3vw,2.5rem)] leading-[1] tracking-[-0.02em]"
                      style={{ fontVariationSettings: "'wght' 740, 'wdth' 80" }}
                    >
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
