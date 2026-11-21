'use client';

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { useKinetic } from "@/src/contexts/KineticContext";
import { workProjects } from "@/src/data/pageSections";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { getImagePath } from "@/src/utils/image";
import { clamp } from "@/src/utils/math";

const EASE_IO = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

interface OpenState {
  index: number;
  rect: { top: number; left: number; width: number; height: number };
}

/** Editorial work index: cursor-chasing preview with clip-path swaps, then the preview expands into a full case-study cover. */
export function WorkIndex() {
  const { lenisRef } = useKinetic();
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<OpenState | null>(null);
  const [order, setOrder] = useState<number[]>(() => workProjects.map((_, i) => i));
  const previewRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, init: false });
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    const el = previewRef.current;
    if (!el) return;
    const p = pos.current;
    p.x += (p.tx - p.x) * 0.12;
    p.y += (p.ty - p.y) * 0.12;
    const rot = clamp((p.tx - p.x) * 0.04, -8, 8);
    el.style.transform = `translate3d(${(p.x - el.offsetWidth / 2).toFixed(1)}px, ${(p.y - el.offsetHeight / 2).toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
  }, hover !== null);

  const close = useCallback(() => {
    setOpen(null);
    lenisRef.current?.start();
    if (typeof window !== "undefined") {
      window.setTimeout(() => lastTrigger.current?.focus(), 50);
    }
  }, [lenisRef]);

  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    lenisRef.current?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, lenisRef]);

  const openProject = (i: number) => {
    const preview = previewRef.current;
    const row = rowRefs.current[i];
    lastTrigger.current = row;
    const useRow = hover === null || !preview || !window.matchMedia("(pointer: fine)").matches;
    const r = (useRow ? row : preview)?.getBoundingClientRect();
    if (!r) return;
    setHover(null);
    setOpen({ index: i, rect: { top: r.top, left: r.left, width: r.width, height: r.height } });
  };

  const project = open ? workProjects[open.index] : null;

  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-bg px-4 py-32 md:px-6 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              <span className="text-accent">15</span> — Curated Catalog & Work Index
            </p>
            <h2 id="work-title" className="mt-4 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.03em]" style={{ fontVariationSettings: "'wght' 760, 'wdth' 78" }}>
              Selected Projects
              <span className="ml-3 align-top font-mono text-sm text-accent">({workProjects.length})</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted">
            Hover to preview, or click any project to expand the complete case study and technical breakdown.
          </p>
        </div>

        <ul
          ref={listRef}
          className="mt-16 border-b border-hair"
          onPointerMove={(e) => {
            const p = pos.current;
            p.tx = e.clientX;
            p.ty = e.clientY;
            if (!p.init) {
              p.x = p.tx;
              p.y = p.ty;
              p.init = true;
            }
          }}
          onPointerLeave={() => {
            setHover(null);
            pos.current.init = false;
          }}
        >
          {workProjects.map((w, i) => {
            const dim = hover !== null && hover !== i;
            return (
              <li key={w.id} className="border-t border-hair">
                <button
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  type="button"
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") {
                      setHover(i);
                      setOrder((o) => [...o.filter((idx) => idx !== i), i]);
                    }
                  }}
                  onFocus={() => setHover(null)}
                  onClick={() => openProject(i)}
                  className={`group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 text-left transition-opacity duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent md:grid-cols-[4rem_1fr_14rem_4rem] md:py-8 ${
                    dim ? "opacity-30" : "opacity-100"
                  }`}
                >
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className="font-display text-[clamp(2rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.03em] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-4"
                    style={{ fontVariationSettings: "'wght' 720, 'wdth' 80" }}
                  >
                    {w.title}
                  </span>
                  <span className="hidden text-sm text-muted md:block">{w.client}</span>
                  <span className="font-mono text-xs tabular-nums text-muted">{w.year}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        ref={previewRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-30 hidden aspect-[4/5] w-[min(22vw,320px)] overflow-hidden rounded-xl transition-opacity duration-200 ease-out md:block ${
          hover !== null ? "opacity-100" : "opacity-0"
        }`}
      >
        {workProjects.map((w, i) => (
          <Image
            key={w.id}
            src={getImagePath(w.image)}
            alt=""
            fill
            sizes="320px"
            className="object-cover"
            style={{
              zIndex: order.indexOf(i),
              clipPath: hover === i || (hover === null && order[order.length - 1] === i) ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
              transform: hover === i ? "scale(1)" : "scale(1.12)",
              transition: `clip-path 300ms cubic-bezier(0.76,0,0.24,1), transform 300ms cubic-bezier(0.23,1,0.32,1)`
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {open && project && (
          <motion.div key="case" role="dialog" aria-modal="true" aria-label={project.title} className="fixed inset-0 z-[60]" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <motion.div
              className="absolute overflow-hidden"
              initial={{ ...open.rect, borderRadius: 12 }}
              animate={{ top: 0, left: 0, width: "100vw", height: "100vh", borderRadius: 0 }}
              transition={{ duration: 0.3, ease: EASE_IO }}
            >
              <Image src={getImagePath(project.image)} alt={project.title} fill sizes="100vw" className="object-cover" />
            </motion.div>
            <motion.div className="absolute inset-0 bg-black/55" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.2 }} />
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white md:p-10">
              <div className="flex items-start justify-between">
                <motion.p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.2 }}>
                  Case Study · {String(open.index + 1).padStart(2, "0")}
                </motion.p>
                <motion.button
                  type="button"
                  autoFocus
                  onClick={close}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35, duration: 0.2 }}
                  className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-black hover:bg-accent hover:text-bg transition-colors"
                >
                  <XIcon className="h-3.5 w-3.5" aria-hidden /> Close
                </motion.button>
              </div>
              <div>
                <h3 className="font-display text-[clamp(3rem,10vw,10rem)] leading-[0.85] tracking-[-0.04em]" style={{ fontVariationSettings: "'wght' 820, 'wdth' 70" }}>
                  {project.title.split("").map((ch, i) => (
                    <span key={i} className="inline-block overflow-hidden align-bottom">
                      <motion.span className="inline-block whitespace-pre" initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 0.3, delay: 0.28 + i * 0.018, ease: EASE_OUT }}>
                        {ch}
                      </motion.span>
                    </span>
                  ))}
                </h3>
                <motion.dl
                  className="mt-8 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/25 pt-6 text-sm md:grid-cols-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.25, ease: EASE_OUT }}
                >
                  {[
                    ["Client", project.client],
                    ["Year", project.year],
                    ["Services", project.services]
                  ].map(([k, v]) => (
                    <div key={k} className={k === "Services" ? "col-span-2" : ""}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">{k}</dt>
                      <dd className="mt-1">{v}</dd>
                    </div>
                  ))}
                </motion.dl>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
