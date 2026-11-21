'use client';

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import type { MotionProps } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import { labProjects, transitionModes } from "@/src/data/motionLab";
import { ChapterHeader } from "@/src/components/ChapterHeader";
import { PixelCurtain } from "@/src/components/transitions/PixelCurtain";
import { FrameMovers } from "@/src/components/transitions/FrameMovers";
import type { Rect } from "@/src/components/transitions/FrameMovers";
import { getImagePath } from "@/src/utils/image";

type Mode = (typeof transitionModes)[number]["id"];
const MOVERS = 8;
const EASE = [0.23, 1, 0.32, 1] as const;

/** Four production page-transition techniques between a grid and a detail view, on one stage. */
export function TransitionLab() {
  const [mode, setMode] = useState<Mode>("pixel");
  const [openId, setOpenId] = useState<string | null>(null);
  const [pixel, setPixel] = useState<"off" | "in" | "out">("off");
  const [movers, setMovers] = useState<{ key: number; image: string; rects: Rect[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const timers = useRef<number[]>([]);
  const moverKeyRef = useRef<number>(0);

  const later = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const runPixel = (swap: () => void) => {
    setBusy(true);
    setPixel("in");
    later(440, () => {
      swap();
      setPixel("out");
    });
    later(900, () => {
      setPixel("off");
      setBusy(false);
    });
  };

  const panelRect = (): Rect => {
    const s = stageRef.current;
    const w = s?.clientWidth ?? 1000;
    const h = s?.clientHeight ?? 600;
    return w >= 768 ? { x: 24, y: 24, w: w / 2 - 36, h: h - 48 } : { x: 16, y: 16, w: w - 32, h: h * 0.45 };
  };

  const open = (id: string) => {
    if (busy) return;
    const project = labProjects.find((p) => p.id === id);
    if (!project) return;
    if (mode === "pixel") return runPixel(() => setOpenId(id));
    if (mode === "frames") {
      const stage = stageRef.current?.getBoundingClientRect();
      const card = cardRefs.current[id]?.querySelector("img")?.getBoundingClientRect();
      if (!stage || !card) return setOpenId(id);
      const from: Rect = { x: card.left - stage.left, y: card.top - stage.top, w: card.width, h: card.height };
      const to = panelRect();
      const rects = Array.from({ length: MOVERS + 1 }, (_, i) => {
        const t = i / MOVERS;
        return {
          x: from.x + (to.x - from.x) * t,
          y: from.y + (to.y - from.y) * t - Math.sin(t * Math.PI) * 70,
          w: from.w + (to.w - from.w) * t,
          h: from.h + (to.h - from.h) * t
        };
      });
      setBusy(true);
      moverKeyRef.current += 1;
      setMovers({ key: moverKeyRef.current, image: project.image, rects });
      later(MOVERS * 50 + 280, () => setOpenId(id));
      later(MOVERS * 50 + 560, () => {
        setMovers(null);
        setBusy(false);
      });
      return;
    }
    setOpenId(id);
  };

  const close = () => {
    if (busy) return;
    if (mode === "pixel") return runPixel(() => setOpenId(null));
    setOpenId(null);
  };

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const project = labProjects.find((p) => p.id === openId);
  const detailMotion: Pick<MotionProps, "initial" | "animate" | "exit" | "transition"> =
    mode === "mask"
      ? {
          initial: { clipPath: "inset(0 0 0 100%)" },
          animate: { clipPath: "inset(0 0 0 0%)" },
          exit: { clipPath: "inset(0 0 0 100%)" },
          transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] as const }
        }
      : mode === "pixel"
      ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0, transition: { duration: 0 } } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.18, ease: "easeOut" } };

  return (
    <section id="transitions" aria-labelledby="transitions-title" className="relative bg-bg px-4 py-32 md:px-6 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <ChapterHeader
          id="transitions-title"
          number="19"
          kicker="View Transitions & Motion Architecture"
          title={
            <>
              One interaction.
              <br />
              <span className="text-muted">Four transition modes.</span>
            </>
          }
          description="Select a transition style below and click any artifact to observe seamless view handoffs and layout morphing."
        />

        <div role="radiogroup" aria-label="Transition technique" className="mt-12 flex flex-wrap gap-2">
          {transitionModes.map((m) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={mode === m.id}
              disabled={busy}
              onClick={() => {
                setOpenId(null);
                setMode(m.id);
              }}
              className={`rounded-xl border px-4 py-2.5 text-left transition-[background-color,border-color,color] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
                mode === m.id ? "border-fg bg-fg text-bg" : "border-hair text-fg hover:border-fg/40"
              }`}
            >
              <span className="block text-sm font-medium">{m.label}</span>
            </button>
          ))}
        </div>

        <LayoutGroup id={`lab-${mode}`}>
          <div ref={stageRef} className="relative mt-6 h-[78vh] min-h-[520px] overflow-hidden rounded-3xl border border-hair bg-surface">
            <div className="flex h-full flex-col p-4 md:p-6">
              <div className="flex items-baseline justify-between">
                <p className="text-lg font-display" style={{ fontVariationSettings: "'wght' 700, 'wdth' 85" }}>
                  Selected Artifacts
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Click any item</p>
              </div>
              <div className="mt-4 grid min-h-0 flex-1 grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {labProjects.map((p) => (
                  <button
                    key={p.id}
                    ref={(el) => {
                      cardRefs.current[p.id] = el;
                    }}
                    type="button"
                    onClick={() => open(p.id)}
                    className="group flex min-h-0 flex-col text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <motion.div
                      layoutId={mode === "flip" ? `lab-img-${p.id}` : undefined}
                      className="relative min-h-0 w-full flex-1 overflow-hidden rounded-xl"
                      transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    >
                      <Image src={getImagePath(p.image)} alt={p.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
                    </motion.div>
                    <span className="mt-3 flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm text-fg">{p.title}</span>
                      <span className="font-mono text-[10px] text-muted">{p.year}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {project && (
                <motion.div key={`${mode}-${project.id}`} className="absolute inset-0 z-20 bg-surface" {...detailMotion}>
                  <motion.div
                    layoutId={mode === "flip" ? `lab-img-${project.id}` : undefined}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    className="absolute left-4 right-4 top-4 h-[45%] overflow-hidden rounded-xl md:bottom-6 md:left-6 md:right-auto md:top-6 md:h-auto md:w-[calc(50%-36px)]"
                  >
                    <motion.div
                      className="relative h-full w-full"
                      initial={mode === "mask" ? { scale: 1.15 } : false}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <Image
                        src={getImagePath(project.image)}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 top-[calc(45%+32px)] flex flex-col md:bottom-6 md:left-[calc(50%+12px)] md:right-6 md:top-6"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.15, ease: EASE }}
                  >
                    <button
                      type="button"
                      onClick={close}
                      className="flex w-fit items-center gap-2 rounded-full border border-hair px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg hover:border-fg transition-colors"
                    >
                      <ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden /> Back
                    </button>
                    <p className="mt-auto font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      {project.role} · {project.year}
                    </p>
                    <h3 className="mt-3 text-[clamp(2rem,5vw,4.5rem)] leading-[0.92] tracking-[-0.03em]" style={{ fontVariationSettings: "'wght' 800, 'wdth' 72" }}>
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{project.body}</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {movers && <FrameMovers key={movers.key} image={movers.image} rects={movers.rects} />}
            {pixel !== "off" && <PixelCurtain phase={pixel} />}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
