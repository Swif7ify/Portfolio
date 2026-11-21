'use client';

import { useEffect } from "react";
import Lenis from "lenis";
import { useKinetic } from "../contexts/KineticContext";
import { setGlobalLenis } from "../hooks/useSmoothScroll";
import { clamp, lerp } from "../utils/math";

/** Inertial smooth scroll + global velocity variables (--scroll-velocity, --chroma). */
export function SmoothScroll() {
  const { lenisRef, metrics, settingsRef, settings, reducedMotion } = useKinetic();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      lerp: reducedMotion ? 1 : settingsRef.current.smoothness,
      smoothWheel: !reducedMotion,
    });
    lenisRef.current = lenis;
    setGlobalLenis(lenis);
    const root = document.documentElement;
    root.style.setProperty("--chroma", "0");
    let smoothed = 0;
    let lastVelProp = "0.000";
    let id = 0;

    const loop = (t: number) => {
      lenis.raf(t);
      const m = metrics.current;
      m.scroll = lenis.scroll;
      m.limit = Math.max(1, lenis.limit);
      m.progress = clamp(lenis.scroll / m.limit);
      m.velocity = lenis.velocity;

      const target = reducedMotion ? 0 : clamp(lenis.velocity, -60, 60);
      smoothed = lerp(smoothed, target, 0.15);
      if (Math.abs(smoothed) < 0.002) smoothed = 0;
      const nextVelProp = smoothed === 0 ? "0" : smoothed.toFixed(3);
      if (nextVelProp !== lastVelProp) {
        lastVelProp = nextVelProp;
        root.style.setProperty("--scroll-velocity", nextVelProp);
      }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisRef.current = null;
      setGlobalLenis(null);
    };
  }, [lenisRef, metrics, settingsRef, reducedMotion]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis && !reducedMotion) {
      lenis.options.lerp = settings.smoothness;
    }
  }, [settings.smoothness, lenisRef, reducedMotion]);

  return null;
}
