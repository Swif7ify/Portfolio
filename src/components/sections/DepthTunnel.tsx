'use client';

import React, { useRef } from "react";
import { tunnelLayers } from "@/src/data/showcase";
import { useAnimationFrame } from "@/src/hooks/useAnimationFrame";
import { useInView } from "@/src/hooks/useInView";
import { clamp, sectionProgress } from "@/src/utils/math";

const TRAVEL = 1800;

/** Five planes in a shared perspective, each advancing toward the camera at its own ratio. */
export function DepthTunnel() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastPRef = useRef<number>(-1);
  const inView = useInView(sectionRef, "200px");

  useAnimationFrame(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section) return;
    const p = sectionProgress(section);
    if (Math.abs(p - lastPRef.current) < 0.0001) return;
    lastPRef.current = p;

    tunnelLayers.forEach((layer, i) => {
      const el = layerRefs.current[i];
      if (!el) return;
      const z = layer.baseZ + p * layer.ratio * TRAVEL;
      const y = (0.5 - p) * layer.ratio * 260;
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, ${z.toFixed(1)}px)`;
      el.style.opacity = String(clamp((820 - z) / 260));
    });
  }, inView);

  return (
    <section ref={sectionRef} id="tunnel" aria-labelledby="tunnel-title" className="relative h-[360vh] bg-bg">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: "1000px" }}>
        {/* Background — nested frames */}
        <div ref={(el) => { layerRefs.current[0] = el; }} aria-hidden className="absolute inset-0 flex items-center justify-center will-change-transform">
          {[150, 125, 100, 78, 58, 40].map((s) => (
            <span
              key={s}
              className="absolute rounded-[2vmin] border border-hair"
              style={{ width: `${s}vmin`, height: `${s * 0.62}vmin` }}
            />
          ))}
        </div>

        {/* Far — ambient orbital accents */}
        <div ref={(el) => { layerRefs.current[1] = el; }} aria-hidden className="absolute inset-0 flex items-center justify-center will-change-transform">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-accent/40"
                style={{ transform: `translate(${Math.cos(a) * 46}vmin, ${Math.sin(a) * 30}vmin)` }}
              />
            );
          })}
        </div>

        {/* Mid — title */}
        <div ref={(el) => { layerRefs.current[2] = el; }} className="absolute inset-0 flex items-center justify-center will-change-transform">
          <h2
            id="tunnel-title"
            className="text-center font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.03em]"
            style={{ fontVariationSettings: "'wght' 800, 'wdth' 70" }}
          >
            Entering The Mind.
            <br />
            <span className="text-accent">Diving In Depth.</span>
          </h2>
        </div>

        {/* Near — outlined initials */}
        <div ref={(el) => { layerRefs.current[3] = el; }} aria-hidden className="absolute inset-0 flex items-center justify-between px-[4vw] will-change-transform">
          <span className="text-outline font-display text-[34vmin] leading-none select-none" style={{ fontVariationSettings: "'wght' 900, 'wdth' 40" }}>
            E
          </span>
          <span className="text-outline font-display text-[34vmin] leading-none select-none" style={{ fontVariationSettings: "'wght' 900, 'wdth' 40" }}>
            O
          </span>
        </div>

        {/* Foreground — corner brackets that pass the camera */}
        <div ref={(el) => { layerRefs.current[4] = el; }} aria-hidden className="absolute inset-[8vmin] will-change-transform pointer-events-none">
          <span className="absolute left-0 top-0 h-[14vmin] w-[14vmin] border-l-2 border-t-2 border-fg/60" />
          <span className="absolute right-0 top-0 h-[14vmin] w-[14vmin] border-r-2 border-t-2 border-fg/60" />
          <span className="absolute bottom-0 left-0 h-[14vmin] w-[14vmin] border-b-2 border-l-2 border-fg/60" />
          <span className="absolute bottom-0 right-0 h-[14vmin] w-[14vmin] border-b-2 border-r-2 border-fg/60" />
        </div>
      </div>
    </section>
  );
}
