'use client';

import React, { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { blindSlides } from "@/src/data/portfolio";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useInView } from "@/src/hooks/useInView";
import { getImagePath } from "@/src/utils/image";
import { clamp, sectionProgress } from "@/src/utils/math";

interface Piece {
  x: number;
  y: number;
  w: number;
  h: number;
  order: number;
}

type Pattern = "rows" | "grid" | "cols";
const PATTERNS: Pattern[] = ["rows", "grid", "cols"];

function buildPieces(pattern: Pattern): Piece[] {
  if (pattern === "rows") return Array.from({ length: 10 }, (_, i) => ({ x: 0, y: i / 10, w: 1, h: 0.1, order: i / 9 }));
  if (pattern === "cols") return Array.from({ length: 12 }, (_, i) => ({ x: i / 12, y: 0, w: 1 / 12, h: 1, order: i / 11 }));
  const out: Piece[] = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 6; c++) {
      const d = Math.hypot(c - 2.5, r - 1.5) / Math.hypot(2.5, 1.5);
      out.push({ x: c / 6, y: r / 4, w: 1 / 6, h: 0.25, order: d });
    }
  return out;
}

const LAYERS = PATTERNS.map(buildPieces);

/** Full-bleed project slides that hand over through venetian blinds, a centre-out grid and vertical shutters. */
export function BlindsTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const pieceRefs = useRef<(HTMLDivElement | null)[][]>(LAYERS.map(() => []));
  const activeRef = useRef(0);
  const lastSegRef = useRef<number>(-1);
  const [active, setActive] = useState(0);
  const inView = useInView(sectionRef, "200px");

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    const s = sectionRef.current;
    if (!s) return;
    const seg = clamp((sectionProgress(s) - 0.05) / 0.9) * LAYERS.length;
    if (Math.abs(seg - lastSegRef.current) < 0.0002) return;
    lastSegRef.current = seg;

    LAYERS.forEach((pieces, k) => {
      const local = clamp((seg - k - 0.15) / 0.7);
      const pattern = PATTERNS[k];
      pieces.forEach((pc, j) => {
        const el = pieceRefs.current[k]?.[j];
        if (!el) return;
        const a = clamp((local - pc.order * 0.45) / 0.55);
        const e = a * a * (3 - 2 * a);
        const nextClip =
          pattern === "rows"
            ? `inset(0 0 ${((1 - e) * 100).toFixed(2)}% 0)`
            : pattern === "cols"
            ? `inset(0 ${((1 - e) * 100).toFixed(2)}% 0 0)`
            : `inset(${((1 - e) * 50).toFixed(2)}%)`;
        if (el.dataset.clip !== nextClip) {
          el.dataset.clip = nextClip;
          el.style.clipPath = nextClip;
        }
      });
    });
    const idx = Math.min(blindSlides.length - 1, Math.round(seg));
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }
  }, inView);

  const slide = blindSlides[active] ?? blindSlides[0];

  return (
    <section ref={sectionRef} id="blinds" aria-labelledby="blinds-title" className="relative h-[420vh] bg-bg">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Image src={getImagePath(blindSlides[0].image)} alt="" fill sizes="100vw" className="object-cover" />
        {LAYERS.map((pieces, k) => (
          <div key={k} className="absolute inset-0" aria-hidden>
            {pieces.map((pc, j) => (
              <div
                key={j}
                ref={(el) => {
                  if (!pieceRefs.current[k]) pieceRefs.current[k] = [];
                  pieceRefs.current[k][j] = el;
                }}
                className="absolute overflow-hidden"
                style={{
                  left: `${pc.x * 100}%`,
                  top: `${pc.y * 100}%`,
                  width: `${pc.w * 100 + 0.1}%`,
                  height: `${pc.h * 100 + 0.1}%`,
                  clipPath: "inset(0 0 100% 0)"
                }}
              >
                <Image
                  src={getImagePath(blindSlides[k + 1]?.image || blindSlides[0].image)}
                  alt=""
                  width={1600}
                  height={1000}
                  className="absolute max-w-none object-cover"
                  style={{
                    width: `${100 / pc.w}%`,
                    height: `${100 / pc.h}%`,
                    left: `${(-pc.x / pc.w) * 100}%`,
                    top: `${(-pc.y / pc.h) * 100}%`
                  }}
                />
              </div>
            ))}
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40" aria-hidden />

        <div className="absolute inset-x-0 top-24 px-4 text-white md:top-28 md:px-6">
          <div className="mx-auto flex max-w-[1440px] items-start justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/75">
              <span className="text-accent">13</span> — Curated Visual Series
            </p>
            <p className="font-mono text-sm tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(blindSlides.length).padStart(2, "0")}
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-24 px-4 text-white md:bottom-28 md:px-6">
          <div className="mx-auto max-w-[1440px]">
            <h2 id="blinds-title" className="sr-only">
              Featured projects
            </h2>
            <AnimatePresence mode="wait">
              <motion.div key={slide.title} aria-live="polite">
                <p className="font-display text-[clamp(4rem,14vw,13rem)] leading-[0.82] tracking-[-0.045em]" style={{ fontVariationSettings: "'wght' 850, 'wdth' 62" }}>
                  {slide.title.split("").map((ch, i) => (
                    <span key={i} className="inline-block overflow-hidden align-bottom">
                      <motion.span
                        className="inline-block"
                        initial={{ y: "105%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-105%", transition: { duration: 0.15, delay: i * 0.01 } }}
                        transition={{ duration: 0.3, delay: i * 0.025, ease: [0.23, 1, 0.32, 1] }}
                      >
                        {ch}
                      </motion.span>
                    </span>
                  ))}
                </p>
                <motion.p
                  className="mt-4 text-base text-white/80 max-w-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                >
                  {slide.meta}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
