'use client';

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { servicePanels } from "@/src/data/pageSections";
import { ChapterHeader } from "@/src/components/ChapterHeader";
import { getImagePath } from "@/src/utils/image";

const EASE = [0.23, 1, 0.32, 1] as const;

/** Services as expanding panels: hover or focus opens one, the rest collapse to vertical spines. */
export function ExpandingPanels() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" aria-labelledby="panels-title" className="relative bg-bg px-4 py-32 md:px-6 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <ChapterHeader
          id="panels-title"
          number="16"
          kicker="Capabilities & Disciplines"
          title={
            <>
              What I build,
              <br />
              <span className="text-muted">one domain at a time.</span>
            </>
          }
          description="Interactive breakdown of specialized services: full-stack architecture, creative frontend engineering, 3D interaction, and sub-pixel design execution."
        />

        <div
          role="tablist"
          aria-label="Capabilities"
          className="mt-16 flex h-[110vh] flex-col gap-2 md:h-[78vh] md:flex-row"
          onKeyDown={(e) => {
            if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) return;
            e.preventDefault();
            const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
            const n = (active + d + servicePanels.length) % servicePanels.length;
            setActive(n);
            if (typeof document !== "undefined") {
              document.getElementById(`panel-tab-${n}`)?.focus();
            }
          }}
        >
          {servicePanels.map((s, i) => {
            const on = i === active;
            return (
              <motion.div
                key={s.id}
                id={`panel-tab-${i}`}
                role="tab"
                tabIndex={on ? 0 : -1}
                aria-selected={on}
                aria-label={s.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                animate={{ flexGrow: on ? 6 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 34 }}
                className="relative min-h-[64px] min-w-0 basis-0 cursor-pointer overflow-hidden rounded-2xl bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-w-[72px]"
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: on ? 1 : 1.15 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <Image
                    src={getImagePath(s.image)}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>

                <motion.div className="absolute inset-0 bg-black" animate={{ opacity: on ? 0.35 : 0.65 }} transition={{ duration: 0.25 }} />
                <span className="absolute left-4 top-4 font-mono text-[11px] text-white/70 md:left-5 md:top-5">0{i + 1}</span>

                <AnimatePresence initial={false}>
                  {!on && (
                    <motion.span
                      key="spine"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.2 } }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      className="absolute bottom-4 left-4 whitespace-nowrap font-display text-xl text-white md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:rotate-180 md:text-2xl md:[writing-mode:vertical-rl]"
                      style={{ fontVariationSettings: "'wght' 650, 'wdth' 85" }}
                    >
                      {s.title}
                    </motion.span>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {on && (
                    <motion.div
                      key="body"
                      className="absolute inset-x-0 bottom-0 p-5 text-white md:p-8"
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } }, hidden: {} }}
                    >
                      {[
                        <h3 key="t" className="font-display text-[clamp(2rem,4.5vw,4.5rem)] leading-[0.9] tracking-[-0.03em]" style={{ fontVariationSettings: "'wght' 800, 'wdth' 72" }}>
                          {s.title}
                        </h3>,
                        <p key="b" className="mt-3 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
                          {s.body}
                        </p>,
                        <ul key="g" className="mt-4 flex flex-wrap gap-2">
                          {s.tags.map((t) => (
                            <li key={t} className="rounded-full border border-white/30 px-3 py-1 text-xs">
                              {t}
                            </li>
                          ))}
                        </ul>
                      ].map((node, k) => (
                        <motion.div
                          key={k}
                          variants={{
                            hidden: { opacity: 0, y: 14, transition: { duration: 0.1 } },
                            show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } }
                          }}
                        >
                          {node}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
