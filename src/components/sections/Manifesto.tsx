'use client';

import React, { useRef } from "react";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { clamp } from "@/src/utils/math";

const lifeManifestoLines = [
  "Every line of code is intentional.",
  "Curiosity sparked the fire; discipline built the craft.",
  "Interfaces should breathe with organic physics.",
  "Motion is spent with purpose, never sprinkled.",
  "Code that solves problems; aesthetics that endure.",
  "The screen is not just pixels — it is the experience."
];

/** Line-by-line scrubbed reveals: a dim base line plus a bright copy unmasked by a slanted clip-path polygon. */
export function Manifesto() {
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maskRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    const vh = window.innerHeight;
    lineRefs.current.forEach((line, i) => {
      const mask = maskRefs.current[i];
      if (!line || !mask) return;
      const r = line.getBoundingClientRect();
      const lp = clamp((vh * 0.82 - r.top) / (vh * 0.4));
      const x = lp * 112;
      mask.style.clipPath = `polygon(0 0, ${x.toFixed(2)}% 0, ${(x - 12).toFixed(2)}% 100%, 0 100%)`;
      mask.style.opacity = String(0.35 + lp * 0.65);
    });
  });

  return (
    <section aria-label="Life Manifesto" className="relative bg-bg px-4 py-[24vh] md:px-6">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          <span className="text-accent">02.2</span> — Life Principles & Code Ethos
        </p>
        <div className="skew-velocity mt-10 space-y-2">
          {lifeManifestoLines.map((line, i) => (
            <div
              key={line}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className="relative font-display text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.08] tracking-[-0.025em]"
              style={{ fontVariationSettings: "'wght' 720, 'wdth' 75" }}
            >
              <span className="text-fg/[0.12]">{line}</span>
              <span
                ref={(el) => {
                  maskRefs.current[i] = el;
                }}
                aria-hidden
                className="chroma absolute inset-0 text-fg"
                style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
