'use client';

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { calcSectionProgress, useElementMetrics } from "@/src/hooks/useElementMetrics";
import { useInView } from "@/src/hooks/useInView";
import { getImagePath } from "@/src/utils/image";
import { clamp } from "@/src/utils/math";

const MASK_WORD = "DEDICATION";

/** Giant word used as a mask over a full-bleed image; scroll zooms the camera straight through it. */
export function MaskReveal() {
  const uid = useId().replace(/:/g, "");
  const sectionRef = useRef<HTMLElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const outlineGroupRef = useRef<SVGGElement>(null);
  const coverRef = useRef<SVGRectElement>(null);
  const outlineRef = useRef<SVGTextElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const lastPRef = useRef<number>(-1);
  const [box, setBox] = useState({ w: 1440, h: 900 });
  const inView = useInView(sectionRef, "200px");
  const sectionMetrics = useElementMetrics(sectionRef);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const measure = () => {
      lastPRef.current = -1;
      setBox({ w: window.innerWidth, h: window.innerHeight });
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  const fontSize = Math.min((box.w * 0.88) / 7.2, box.h * 0.28);
  const cx = box.w / 2;
  const cy = box.h / 2;

  const textStyle: React.CSSProperties = {
    fontFamily: '"Roboto Flex", system-ui, sans-serif',
    fontWeight: 860,
    fontStretch: "72%",
    fontVariationSettings: "'wght' 860, 'wdth' 72, 'opsz' 144",
    letterSpacing: "0.045em"
  };

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    const p = calcSectionProgress(sectionMetrics.current, window.scrollY);
    if (Math.abs(p - lastPRef.current) < 0.0001) return;
    lastPRef.current = p;

    const z = clamp(p / 0.72);
    const coverOpacity = 1 - clamp((p - 0.56) / 0.18);
    const outlineOpacity = 1 - clamp((p - 0.18) / 0.22);

    if (coverRef.current) {
      coverRef.current.style.opacity = String(coverOpacity);
      coverRef.current.style.visibility = coverOpacity <= 0.001 ? "hidden" : "visible";
    }
    if (outlineRef.current) {
      outlineRef.current.style.opacity = String(outlineOpacity);
      outlineRef.current.style.visibility = outlineOpacity <= 0.001 ? "hidden" : "visible";
    }
    if (coverOpacity > 0.001) {
      const scale = 1 + Math.pow(z, 3) * 90;
      const tf = `translate(${cx} ${cy}) scale(${scale.toFixed(3)}) translate(${-cx} ${-cy})`;
      if (groupRef.current) groupRef.current.setAttribute("transform", tf);
      if (outlineGroupRef.current && outlineOpacity > 0.001) {
        outlineGroupRef.current.setAttribute("transform", tf);
      }
    }
    if (imgWrapRef.current) imgWrapRef.current.style.transform = `scale(${(1.32 - 0.32 * z).toFixed(4)})`;
    if (scrimRef.current) scrimRef.current.style.opacity = (0.46 - 0.34 * z).toFixed(3);
    if (hintRef.current) hintRef.current.style.opacity = String(1 - clamp(p / 0.15));
    if (captionRef.current) {
      const c = clamp((p - 0.76) / 0.14);
      captionRef.current.style.opacity = String(c);
      captionRef.current.style.transform = `translate3d(0, ${((1 - c) * 24).toFixed(1)}px, 0)`;
    }
  }, inView);

  return (
    <section ref={sectionRef} id="reveal" aria-labelledby="reveal-title" className="relative h-[240vh] bg-bg">
      <h2 id="reveal-title" className="sr-only">
        Dedication — Project METRO Community Launch
      </h2>
      <div className="sticky top-0 h-screen overflow-hidden bg-bg">
        <div ref={imgWrapRef} className="absolute inset-0 will-change-transform">
          <Image
            src={getImagePath("/MaskReveal/1.JPG")}
            alt="Project METRO Provincial Culminating Activity with DTI Zambales and Gordon College CCS"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Dimmed while viewing the cutout so DEDICATION reads clearly; lifts to bright as you zoom through */}
          <div
            ref={scrimRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-black"
            style={{ opacity: 0.46 }}
          />
        </div>

        {/* Oversized by 2px with preserveAspectRatio="none" to prevent subpixel photo bleed at DPI scaling */}
        <svg
          className="pointer-events-none absolute -inset-[2px] h-[calc(100%+4px)] w-[calc(100%+4px)]"
          viewBox={`0 0 ${box.w} ${box.h}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <mask id={`mask-${uid}`} maskUnits="userSpaceOnUse" x={-20} y={-20} width={box.w + 40} height={box.h + 40}>
              <rect x={-20} y={-20} width={box.w + 40} height={box.h + 40} fill="white" />
              <g ref={groupRef}>
                <text
                  x={cx}
                  y={cy + fontSize * 0.355}
                  textAnchor="middle"
                  fill="black"
                  fontSize={fontSize}
                  style={textStyle}
                >
                  {MASK_WORD}
                </text>
              </g>
            </mask>
          </defs>
          <rect
            ref={coverRef}
            x={-20}
            y={-20}
            width={box.w + 40}
            height={box.h + 40}
            fill="rgb(var(--bg))"
            mask={`url(#mask-${uid})`}
          />
          {/* Crisp outline rim so every letter of DEDICATION reads effortlessly against busy photo areas */}
          <g ref={outlineGroupRef}>
            <text
              ref={outlineRef}
              x={cx}
              y={cy + fontSize * 0.355}
              textAnchor="middle"
              fill="none"
              stroke="rgb(var(--fg) / 0.55)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              fontSize={fontSize}
              style={textStyle}
            >
              {MASK_WORD}
            </text>
          </g>
        </svg>

        <p ref={hintRef} className="absolute inset-x-0 bottom-24 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Scroll to explore
        </p>

        <div
          ref={captionRef}
          className="pointer-events-none absolute inset-0 flex flex-col justify-end opacity-0 will-change-[transform,opacity]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 68% 60% at 16% 94%, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.45) 52%, transparent 100%)"
            }}
          />
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-10 md:px-10 md:pb-14">
            <div className="max-w-lg">
              <span aria-hidden="true" className="mb-4 block h-[2px] w-10 bg-accent" />
              <blockquote className="text-balance font-serif text-[clamp(1.65rem,3.4vw,2.1rem)] italic leading-[1.1] text-cream">
                &ldquo;The true measure of what we create is not how far it takes us, but how far it can take others.&rdquo;
              </blockquote>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/70">
                Project METRO · DTI Zambales · 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
