'use client';

import { useEffect } from "react";
import Lenis from "lenis";
import { useKinetic } from "../contexts/KineticContext";
import { setGlobalLenis } from "../hooks/useSmoothScroll";
import { clamp } from "../utils/math";

/** Inertial smooth scroll synchronized with KineticContext metrics (zero root DOM style mutations per frame). */
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
    let id = 0;

    const loop = (t: number) => {
      lenis.raf(t);
      const m = metrics.current;
      m.scroll = lenis.scroll;
      m.limit = Math.max(1, lenis.limit);
      m.progress = clamp(lenis.scroll / m.limit);
      m.velocity = lenis.velocity;
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
