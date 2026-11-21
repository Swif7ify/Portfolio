'use client';

import React, { useRef } from "react";
import Image from "next/image";
import { statementTokens } from "@/src/data/pageSections";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useInView } from "@/src/hooks/useInView";
import { getImagePath } from "@/src/utils/image";
import { clamp } from "@/src/utils/math";

/** An editorial statement where images live inside the sentence and open up as you read, reflowing the type around them. */
export function InlineStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const tokenRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lastScrollRef = useRef<number>(-1);
  const lastVhRef = useRef<number>(-1);
  const inView = useInView(sectionRef, "200px");

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    const vh = window.innerHeight;
    const sy = window.scrollY;
    if (Math.abs(sy - lastScrollRef.current) < 0.5 && vh === lastVhRef.current) return;
    lastScrollRef.current = sy;
    lastVhRef.current = vh;

    const els = tokenRefs.current;
    const tops = new Array<number>(els.length);

    // Pass 1: Batch read all bounding rects to avoid forced synchronous reflows
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      tops[i] = el ? el.getBoundingClientRect().top : 0;
    }

    // Pass 2: Batch write all styles
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) continue;
      const p = clamp((vh * 0.82 - tops[i]) / (vh * 0.32));
      const t = statementTokens[i];
      if (t && "image" in t) {
        const e = p * p * (3 - 2 * p);
        el.style.width = `${(e * 2.1).toFixed(3)}em`;
        el.style.marginInline = `${(e * 0.12).toFixed(3)}em`;
        const img = el.firstElementChild as HTMLElement | null;
        if (img) img.style.transform = `scale(${(1.4 - 0.4 * e).toFixed(3)})`;
      } else {
        el.style.opacity = (0.14 + 0.86 * p).toFixed(3);
      }
    }
  }, inView);

  return (
    <section ref={sectionRef} id="statement" aria-labelledby="statement-title" className="relative bg-bg px-4 py-[20vh] md:px-6">
      <div className="mx-auto max-w-[1440px]">
        <h2 id="statement-title" className="sr-only">
          Personal Statement
        </h2>
        <p
          className="font-display text-[clamp(2.5rem,6.2vw,6.5rem)] leading-[1.02] tracking-[-0.035em] text-fg"
          style={{ fontVariationSettings: "'wght' 720, 'wdth' 78" }}
          aria-label={statementTokens.map((t) => "word" in t ? t.word : "").filter(Boolean).join(" ")}
        >
          {statementTokens.map((t, i) =>
            "image" in t ? (
              <span
                key={i}
                ref={(el) => {
                  tokenRefs.current[i] = el;
                }}
                aria-hidden
                className="relative inline-block h-[0.78em] overflow-hidden rounded-full align-[-0.06em]"
                style={{ width: 0 }}
              >
                <Image src={getImagePath(t.image)} alt={t.alt} fill sizes="160px" className="object-cover" />
              </span>
            ) : (
              <React.Fragment key={i}>
                <span
                  ref={(el) => {
                    tokenRefs.current[i] = el;
                  }}
                  aria-hidden
                  style={{ opacity: 0.14 }}
                >
                  {t.word}
                </span>{" "}
              </React.Fragment>
            )
          )}
        </p>
      </div>
    </section>
  );
}
