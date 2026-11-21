'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { nativeReveals, nativeSteps } from "@/src/data/swiftify";
import { getImagePath } from "@/src/utils/image";

const emptySubscribe = () => () => {};
const getTimelineSupport = () => typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()");
const getServerTimelineSupport = () => null;

/** Scroll choreography written entirely in CSS (animation-timeline), with an IntersectionObserver fallback. */
export function NativeScrollCSS() {
  const supported = useSyncExternalStore<boolean | null>(emptySubscribe, getTimelineSupport, getServerTimelineSupport);
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || supported !== false) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [supported]);

  return (
    <section id="native" aria-labelledby="native-title" className="sda-section relative bg-bg px-4 pt-32 md:px-6 md:pt-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              <span className="text-accent">18</span> — Native Platform Motion
            </p>
            <h2
              id="native-title"
              className="mt-4 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.03em]"
              style={{ fontVariationSettings: "'wght' 760, 'wdth' 78" }}
            >
              Restraint, compiled
              <br />
              <span className="text-muted">by the browser.</span>
            </h2>
          </div>
          <div className="md:col-span-4">
            <p className="text-base leading-relaxed text-muted">
              Pure platform choreography: CSS animations bound smoothly to viewport position, rendering directly on the compositor with zero script overhead.
            </p>
          </div>
        </div>
        <span className="sda-progress mt-10 block h-px w-full origin-left bg-accent" aria-hidden />

        <div className={`sda-scope mt-16 grid gap-10 md:grid-cols-12 ${supported ? "" : "sda-fallback"}`}>
          <div className="md:col-span-6 md:col-start-7 md:row-start-1">
            <div className="sticky top-[14vh] aspect-[4/5] overflow-hidden rounded-3xl bg-surface md:aspect-auto md:h-[72vh] shadow-2xl">
              {nativeSteps.map((s, i) => (
                <Image
                  key={s.title}
                  src={getImagePath(s.image)}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`sda-layer sda-layer-${i} object-cover`}
                  style={{
                    zIndex: nativeSteps.length - i,
                    opacity: supported === false && i < active ? 0 : 1,
                    transition: supported === false ? "opacity 250ms ease-out" : undefined
                  }}
                />
              ))}
            </div>
          </div>
          <div className="md:col-span-5 md:row-start-1">
            {nativeSteps.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-index={i}
                className={`sda-step sda-step-${i} flex min-h-[80vh] flex-col justify-center`}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">Principle 0{i + 1}</p>
                <h3 className="mt-3 text-[clamp(1.75rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.02em]" style={{ fontVariationSettings: "'wght' 760, 'wdth' 80" }}>
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 pb-32 md:grid-cols-3 md:pb-40">
          {nativeReveals.map((src, i) => (
            <figure key={src} className="sda-reveal overflow-hidden rounded-2xl bg-surface shadow-xl">
              <div className="relative aspect-[3/4] w-full">
                <Image src={getImagePath(src)} alt="" aria-hidden fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <figcaption className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                Visual Study 0{i + 1}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
