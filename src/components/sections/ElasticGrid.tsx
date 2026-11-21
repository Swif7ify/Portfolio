'use client';

import React, { useRef } from "react";
import Image from "next/image";
import { useKinetic } from "@/src/contexts/KineticContext";
import { elasticImages } from "@/src/data/motionLab";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useInView } from "@/src/hooks/useInView";
import { getImagePath } from "@/src/utils/image";
import { clamp } from "@/src/utils/math";
import { ChapterHeader } from "@/src/components/ChapterHeader";

const COLS = 5;
const ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[2/3]"];

/** Columns follow scroll with lag proportional to their distance from the centre column. */
export function ElasticGrid() {
  const { metrics, reducedMotion } = useKinetic();
  const gridRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsets = useRef<number[]>(Array(COLS).fill(0));
  const settledRef = useRef<boolean>(false);
  const inView = useInView(gridRef, "200px");

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    const v = reducedMotion ? 0 : clamp(metrics.current.velocity, -60, 60);
    if (Math.abs(v) < 0.01 && settledRef.current) return;

    const center = (COLS - 1) / 2;
    let allSettled = Math.abs(v) < 0.01;
    colRefs.current.forEach((el, c) => {
      if (!el) return;
      const dist = Math.abs(c - center);
      const target = v * 4.2 * dist;
      const ease = 0.06 + (center - dist) * 0.02;
      offsets.current[c] += (target - offsets.current[c]) * ease;
      if (Math.abs(offsets.current[c]) > 0.04) {
        allSettled = false;
      } else if (Math.abs(v) < 0.01) {
        offsets.current[c] = 0;
      }
      el.style.transform = `translate3d(0, ${offsets.current[c].toFixed(2)}px, 0)`;
    });
    settledRef.current = allSettled;
  }, inView);

  const columns = Array.from({ length: COLS }, (_, c) => elasticImages.filter((_, i) => i % COLS === c));

  return (
    <section id="elastic" aria-labelledby="elastic-title" className="relative overflow-hidden bg-bg px-4 py-32 md:px-6 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <ChapterHeader
          id="elastic-title"
          number="14"
          kicker="Visual Archive & Artifact Grid"
          title={
            <>
              A grid that
              <br />
              <span className="text-muted">stretches with motion.</span>
            </>
          }
          description="An elastic gallery of creative experiments, visual studies, and interface artifacts that react dynamically to your scroll velocity."
        />

        <div ref={gridRef} className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-5">
          {columns.map((col, c) => (
            <div
              key={c}
              ref={(el) => {
                colRefs.current[c] = el;
              }}
              className={`flex flex-col gap-3 will-change-transform md:gap-5 ${c >= 2 ? "hidden md:flex" : ""} ${c % 2 ? "md:pt-24" : ""}`}
            >
              {col.map((src, i) => (
                <figure key={i} className={`relative overflow-hidden rounded-xl bg-surface ${ASPECTS[(c + i) % ASPECTS.length]}`}>
                  <Image src={getImagePath(src)} alt="" aria-hidden fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover" />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
