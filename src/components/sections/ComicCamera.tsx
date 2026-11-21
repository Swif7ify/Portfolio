'use client';

import React, { useRef, useState } from "react";
import Image from "next/image";
import { comicPanels } from "@/src/data/awardExhibits";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { calcSectionProgress, useElementMetrics } from "@/src/hooks/useElementMetrics";
import { useInView } from "@/src/hooks/useInView";
import { getImagePath } from "@/src/utils/image";
import { clamp, lerp } from "@/src/utils/math";

const PAGE = { w: 1600, h: 1200 };
const PAD = 36;
const KEYS = [
  { x: 0, y: 0, w: PAGE.w, h: PAGE.h },
  ...comicPanels.map((p) => ({ x: p.x - PAD, y: p.y - PAD, w: p.w + PAD * 2, h: p.h + PAD * 2 })),
  { x: 0, y: 0, w: PAGE.w, h: PAGE.h }
];

/** Guided-view comic: scroll flies a camera from panel to panel across one page, then pulls back. */
export function ComicCamera() {
  const sectionRef = useRef<HTMLElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(-1);
  const lastPRef = useRef<number>(-1);
  const [active, setActive] = useState(-1);
  const inView = useInView(sectionRef, "200px");
  const sectionMetrics = useElementMetrics(sectionRef);

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    const page = pageRef.current;
    if (!page) return;

    const m = sectionMetrics.current;
    const p = calcSectionProgress(m, window.scrollY);
    if (Math.abs(p - lastPRef.current) < 0.0001) return;
    lastPRef.current = p;

    const seg = p * (KEYS.length - 1);
    const i = Math.min(KEYS.length - 2, Math.floor(seg));
    const f = seg - i;
    const hold = clamp((f - 0.3) / 0.4);
    const e = hold * hold * (3 - 2 * hold);
    const a = KEYS[i];
    const b = KEYS[i + 1];
    const cam = { x: lerp(a.x, b.x, e), y: lerp(a.y, b.y, e), w: lerp(a.w, b.w, e), h: lerp(a.h, b.h, e) };
    const vw = m.vw;
    const vh = m.vh;
    const s = Math.min(vw / cam.w, vh / cam.h) * 0.92;
    const tx = vw / 2 - (cam.x + cam.w / 2) * s;
    const ty = vh / 2 - (cam.y + cam.h / 2) * s;
    page.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${s.toFixed(4)})`;

    const focus = i + e;
    const overview = clamp(1 - focus) + clamp(focus - (KEYS.length - 2));
    panelRefs.current.forEach((el, j) => {
      if (!el) return;
      el.style.opacity = Math.max(overview, 0.22 + 0.78 * clamp(1 - Math.abs(focus - (j + 1)))).toFixed(3);
    });
    const idx = overview > 0.5 ? -1 : Math.round(focus) - 1;
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }
  }, inView);

  const narration = active >= 0 && active < comicPanels.length ? comicPanels[active].narration : "My journey started with hardware, but curiosity led me far beyond it..";

  return (
    <section ref={sectionRef} id="about" aria-labelledby="comic-title" className="relative h-[560vh] bg-bg">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={pageRef}
          className="absolute left-0 top-0 origin-top-left rounded-lg bg-surface will-change-transform"
          style={{ width: PAGE.w, height: PAGE.h }}
        >
          {comicPanels.map((panel, j) => (
            <div
              key={panel.id}
              ref={(el) => {
                panelRefs.current[j] = el;
              }}
              className="absolute overflow-hidden rounded-md border-[5px] border-fg bg-bg"
              style={{ left: panel.x, top: panel.y, width: panel.w, height: panel.h }}
            >
              {panel.image ? (
                <Image src={getImagePath(panel.image)} alt={panel.narration} fill sizes="800px" className="object-cover" />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-accent"
                  style={{
                    backgroundImage: "radial-gradient(rgb(var(--bg) / 0.25) 2px, transparent 2.5px)",
                    backgroundSize: "18px 18px"
                  }}
                >
                  <span
                    className="-rotate-12 font-display text-[150px] leading-none text-bg"
                    style={{
                      fontVariationSettings: "'wght' 1000, 'wdth' 40",
                      WebkitTextStroke: "6px rgb(var(--fg))",
                      paintOrder: "stroke fill"
                    }}
                  >
                    CRAFT!
                  </span>
                </div>
              )}
              {panel.bubble && (
                <div
                  className="absolute max-w-[320px] rounded-[28px] border-[4px] border-[#111] bg-white px-6 py-4 text-[26px] leading-tight text-[#111]"
                  style={{ left: panel.bubble.x, top: panel.bubble.y, fontVariationSettings: "'wght' 800, 'wdth' 70" }}
                >
                  {panel.bubble.text}
                  <span
                    aria-hidden
                    className="absolute -bottom-[18px] left-10 h-0 w-0 border-l-[14px] border-r-[14px] border-t-[18px] border-l-transparent border-r-transparent border-t-[#111]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 id="comic-title" className="sr-only">
          Life In Comic Panels
        </h2>

        <div className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center px-4 md:bottom-28">
          <p className="glass max-w-xl rounded-xl px-5 py-3.5 text-center text-sm font-medium text-fg shadow-2xl" aria-live="polite">
            {narration}
          </p>
        </div>
      </div>
    </section>
  );
}
