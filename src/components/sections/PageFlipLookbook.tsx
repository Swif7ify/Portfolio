'use client';

import React, { useRef } from "react";
import { lookbookPages } from "@/src/data/portfolio";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { clamp, sectionProgress } from "@/src/utils/math";

const LEAVES = Math.floor(lookbookPages.length / 2);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function Page({ page, n, side }: { page: (typeof lookbookPages)[number]; n: number; side: "left" | "right" }) {
  return (
    <div className="flex h-full flex-col bg-[#f3efe6] p-[7%] text-[#161512]">
      <img src={page.image} alt={page.title} className="aspect-[4/5] w-full rounded-sm object-cover" />
      <div className="mt-auto flex items-end justify-between pt-[6%]">
        <div>
          <p className="font-display text-[clamp(0.9rem,2vw,1.75rem)] leading-none" style={{ fontVariationSettings: "'wght' 760, 'wdth' 78" }}>
            {page.title}
          </p>
          <p className="mt-1 font-mono text-[clamp(0.5rem,0.8vw,0.65rem)] uppercase tracking-[0.12em] text-black/50">{page.caption}</p>
        </div>
        <span className={`font-mono text-[clamp(0.5rem,0.8vw,0.65rem)] text-black/50 ${side === "left" ? "order-first mr-auto" : ""}`}>
          {String(n).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/** A printed lookbook whose pages turn in 3D as you scroll — each leaf has a front and a back. */
export function PageFlipLookbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const leafRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadeFront = useRef<(HTMLSpanElement | null)[]>([]);
  const shadeBack = useRef<(HTMLSpanElement | null)[]>([]);

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    const s = sectionRef.current;
    if (!s) return;
    const r = s.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    const f = clamp((sectionProgress(s) - 0.06) / 0.86) * LEAVES;
    leafRefs.current.forEach((leaf, i) => {
      if (!leaf) return;
      const e = easeInOut(clamp(f - i));
      leaf.style.transform = `rotateY(${(-180 * e).toFixed(2)}deg)`;
      leaf.style.zIndex = String(e < 0.5 ? 20 - i : 20 + i);
      const sf = shadeFront.current[i];
      const sb = shadeBack.current[i];
      if (sf) sf.style.opacity = (Math.sin(e * Math.PI) * 0.45).toFixed(3);
      if (sb) sb.style.opacity = (Math.sin(e * Math.PI) * 0.35).toFixed(3);
    });
  });

  return (
    <section ref={sectionRef} id="lookbook" aria-labelledby="lookbook-title" className="relative h-[520vh] bg-bg">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-24">
        <div className="mb-6 text-center">
          <h2 id="lookbook-title" className="font-display text-[clamp(2rem,4.5vw,4rem)] leading-[0.92] tracking-[-0.03em]" style={{ fontVariationSettings: "'wght' 760, 'wdth' 78" }}>
            The physical book, turned by scroll.
          </h2>
        </div>
        <div className="relative aspect-[2/1.35] w-[min(94vw,1000px,calc((100vh_-_14rem)*1.48))]" style={{ perspective: "2400px" }}>
          {/* Left cover */}
          <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden rounded-l-md bg-[#efeadf] shadow-2xl">
            <div className="flex h-full flex-col justify-between p-[9%] text-[#161512]">
              <p className="font-mono text-[clamp(0.5rem,0.8vw,0.7rem)] uppercase tracking-[0.18em] text-black/50">Earl Ordovez</p>
              <p className="font-display text-[clamp(1.5rem,4.2vw,3.75rem)] leading-[0.88] tracking-[-0.03em]" style={{ fontVariationSettings: "'wght' 820, 'wdth' 68" }}>
                Memoirs &
                <br />
                Artifacts
              </p>
              <p className="text-[clamp(0.55rem,0.9vw,0.8rem)] text-black/60">Pages from my life and engineering journey.</p>
            </div>
          </div>

          {/* Right cover */}
          <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden rounded-r-md bg-[#efeadf] shadow-2xl">
            <div className="flex h-full flex-col items-center justify-center p-[9%] text-center text-[#161512]">
              <p className="font-display text-[clamp(1.25rem,3vw,2.75rem)] leading-[0.9]" style={{ fontVariationSettings: "'wght' 780, 'wdth' 72" }}>
                The Story Continues.
              </p>
              <p className="mt-3 text-[clamp(0.55rem,0.9vw,0.8rem)] text-black/60">Next chapter currently being written.</p>
            </div>
          </div>

          {/* Flipping leaves */}
          {Array.from({ length: LEAVES }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                leafRefs.current[i] = el;
              }}
              className="absolute inset-y-0 left-1/2 w-1/2 will-change-transform"
              style={{ transformOrigin: "left center", transformStyle: "preserve-3d", zIndex: 20 - i }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-r-md [backface-visibility:hidden]">
                <Page page={lookbookPages[i * 2]} n={i * 2 + 1} side="right" />
                <span
                  ref={(el) => {
                    shadeFront.current[i] = el;
                  }}
                  className="pointer-events-none absolute inset-0 bg-black opacity-0"
                />
              </div>
              <div className="absolute inset-0 overflow-hidden rounded-l-md [backface-visibility:hidden]" style={{ transform: "rotateY(180deg)" }}>
                <Page page={lookbookPages[i * 2 + 1]} n={i * 2 + 2} side="left" />
                <span
                  ref={(el) => {
                    shadeBack.current[i] = el;
                  }}
                  className="pointer-events-none absolute inset-0 bg-black opacity-0"
                />
              </div>
            </div>
          ))}
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-50 w-px bg-black/20" />
        </div>
      </div>
    </section>
  );
}
