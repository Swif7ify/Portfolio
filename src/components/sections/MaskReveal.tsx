'use client';

import React, { useEffect, useId, useRef, useState } from "react";
import { exhibitImages } from "@/src/data/exhibits";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { clamp, sectionProgress } from "@/src/utils/math";

/** Giant word used as a mask over a full-bleed image; scroll zooms the camera straight through it. */
export function MaskReveal() {
  const uid = useId().replace(/:/g, "");
  const sectionRef = useRef<HTMLElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const coverRef = useRef<SVGRectElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const [box, setBox] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const measure = () => setBox({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const fontSize = Math.min((box.w * 0.88) / 3.6, box.h * 0.42);
  const cx = box.w / 2;
  const cy = box.h / 2;

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    const s = sectionRef.current;
    if (!s) return;
    const p = sectionProgress(s);
    const z = clamp(p / 0.72);
    const scale = 1 + Math.pow(z, 3) * 46;
    groupRef.current?.setAttribute("transform", `translate(${cx} ${cy}) scale(${scale.toFixed(3)}) translate(${-cx} ${-cy})`);
    if (coverRef.current) coverRef.current.style.opacity = String(1 - clamp((p - 0.58) / 0.16));
    if (imgRef.current) imgRef.current.style.transform = `scale(${(1.35 - 0.35 * z).toFixed(4)})`;
    if (hintRef.current) hintRef.current.style.opacity = String(1 - clamp(p / 0.15));
    if (captionRef.current) {
      const c = clamp((p - 0.78) / 0.12);
      captionRef.current.style.opacity = String(c);
      captionRef.current.style.transform = `translate3d(0, ${((1 - c) * 24).toFixed(1)}px, 0)`;
    }
  });

  return (
    <section ref={sectionRef} id="reveal" aria-labelledby="reveal-title" className="relative h-[320vh] bg-bg">
      <div className="sticky top-0 h-screen overflow-hidden">
        <img
          ref={imgRef}
          src={exhibitImages.neon || "/EARL_ORDOVEZ.JPG"}
          alt="Atmospheric studio creative visual"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />

        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${box.w} ${box.h}`} aria-hidden>
          <defs>
            <mask id={`mask-${uid}`} maskUnits="userSpaceOnUse" x="0" y="0" width={box.w} height={box.h}>
              <rect width={box.w} height={box.h} fill="white" />
              <g ref={groupRef}>
                <text
                  x={cx}
                  y={cy + fontSize * 0.355}
                  textAnchor="middle"
                  fill="black"
                  fontSize={fontSize}
                  style={{
                    fontFamily: '"Roboto Flex", system-ui, sans-serif',
                    fontVariationSettings: "'wght' 1000, 'wdth' 100",
                    letterSpacing: "-0.03em"
                  }}
                >
                  EARL
                </text>
              </g>
            </mask>
          </defs>
          <rect ref={coverRef} width={box.w} height={box.h} fill="rgb(var(--bg))" mask={`url(#mask-${uid})`} />
        </svg>

        <p ref={hintRef} className="absolute inset-x-0 bottom-24 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Scroll to explore
        </p>

        <div ref={captionRef} className="absolute inset-x-0 bottom-20 px-4 opacity-0 md:bottom-24 md:px-6">
          <div className="glass mx-auto max-w-md rounded-2xl p-5 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">The Journey Unveiled</p>
            <p className="mt-2 text-sm leading-relaxed text-fg">
              Passing beyond the surface into the biography: the experiences, mistakes, breakthroughs, and creations that define who I am today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
