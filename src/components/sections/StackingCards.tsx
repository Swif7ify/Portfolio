'use client';

import React, { useRef } from "react";
import Image from "next/image";
import { stackCases } from "@/src/data/exhibits";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useInView } from "@/src/hooks/useInView";
import { getImagePath } from "@/src/utils/image";
import { clamp } from "@/src/utils/math";
import { ChapterHeader } from "@/src/components/ChapterHeader";

/** Sticky cards that stack; each earlier card shrinks and dims by the sum of the cards covering it. */
export function StackingCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const shadeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lastScrollRef = useRef<number>(-1);
  const inView = useInView(sectionRef, "200px");

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    const sy = window.scrollY;
    if (Math.abs(sy - lastScrollRef.current) < 0.5) return;
    lastScrollRef.current = sy;

    const vh = window.innerHeight;
    const covers = wrapRefs.current.map((el) => (el ? clamp(1 - el.getBoundingClientRect().top / vh) : 0));
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      let sum = 0;
      for (let j = i + 1; j < covers.length; j++) sum += covers[j];
      card.style.transform = `scale(${(1 - sum * 0.05).toFixed(4)}) rotateX(${(sum * 2).toFixed(2)}deg)`;
      const shade = shadeRefs.current[i];
      if (shade) shade.style.opacity = clamp(sum * 0.3, 0, 0.75).toFixed(3);
    });
  }, inView);

  return (
    <section ref={sectionRef} id="stack" aria-labelledby="stack-title" className="relative bg-bg px-4 pt-32 md:px-6 md:pt-40">
      <div className="mx-auto max-w-[1440px]">
        <ChapterHeader
          id="stack-title"
          title={
            <>
              Flagship files,
              <br />
              <span className="text-muted">stacked in depth.</span>
            </>
          }
          description="Selected flagship projects layered in 3D depth space. Earlier projects scale down and dim as subsequent work stacks above."
        />
      </div>

      <div className="mx-auto mt-16 max-w-[1440px] pb-[20vh]">
        {stackCases.map((c, i) => (
          <div
            key={c.id}
            ref={(el) => {
              wrapRefs.current[i] = el;
            }}
            className="sticky top-0 flex h-screen items-center"
            style={{ paddingTop: `${88 + i * 22}px` }}
          >
            <article
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="relative grid h-[min(70vh,600px)] w-full origin-top overflow-hidden rounded-3xl border border-hair bg-surface will-change-transform md:grid-cols-12 shadow-2xl"
              style={{
                backgroundColor: "rgb(var(--surface))",
              }}
            >
              <div className="relative h-48 md:col-span-6 md:h-auto">
                <Image src={getImagePath(c.image)} alt={`${c.title} illustration`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="flex flex-col p-6 md:col-span-6 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  Case Study 0{i + 1}
                </p>
                <h3 className="mt-4 text-[clamp(1.75rem,3.5vw,3.25rem)] leading-[0.95] tracking-[-0.02em]" style={{ fontVariationSettings: "'wght' 760, 'wdth' 78" }}>
                  {c.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{c.body}</p>
                <div className="mt-auto flex items-baseline justify-between border-t border-hair pt-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Key metric</span>
                  <span className="text-2xl tabular-nums text-fg font-mono" style={{ fontVariationSettings: "'wght' 700" }}>
                    {c.stat}
                  </span>
                </div>
              </div>
              <span
                ref={(el) => {
                  shadeRefs.current[i] = el;
                }}
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0"
                style={{
                  backgroundColor: "rgb(var(--bg))",
                }}
              />
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
