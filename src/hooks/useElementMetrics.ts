'use client';

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { clamp } from "../utils/math";

export interface ElementMetrics {
  /** Distance from document top in px */
  docTop: number;
  /** Distance from document left in px */
  docLeft: number;
  /** Element width in px */
  width: number;
  /** Element height in px */
  height: number;
  /** Current viewport width in px */
  vw: number;
  /** Current viewport height in px */
  vh: number;
}

/**
 * Caches an element's document-relative position and dimensions on mount and resize
 * (via ResizeObserver & window resize), so scroll/animation loops can compute progress
 * using pure arithmetic (`docTop - scrollY`) with ZERO `getBoundingClientRect()` calls
 * inside `requestAnimationFrame`.
 */
export function useElementMetrics<T extends HTMLElement>(
  ref: RefObject<T | null>
): RefObject<ElementMetrics> {
  const metricsRef = useRef<ElementMetrics>({
    docTop: 0,
    docLeft: 0,
    width: 1000,
    height: 800,
    vw: 1440,
    vh: 900,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    let rafId = 0;

    const measure = () => {
      const el = ref.current;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (!el) {
        metricsRef.current.vw = vw;
        metricsRef.current.vh = vh;
        return;
      }
      const r = el.getBoundingClientRect();
      const sy = window.scrollY;
      const sx = window.scrollX;
      metricsRef.current = {
        docTop: r.top + sy,
        docLeft: r.left + sx,
        width: Math.max(1, el.offsetWidth || r.width),
        height: Math.max(1, el.offsetHeight || r.height),
        vw,
        vh,
      };
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("resize", scheduleMeasure, { passive: true });

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(scheduleMeasure);
      if (ref.current) ro.observe(ref.current);
      if (document.body) ro.observe(document.body);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", scheduleMeasure);
      ro?.disconnect();
    };
  }, [ref]);

  return metricsRef;
}

/**
 * Pure arithmetic equivalent of `sectionProgress(el)` using cached `ElementMetrics`
 * and current `scrollY`. Zero DOM reads, zero forced reflows.
 */
export function calcSectionProgress(m: ElementMetrics, scrollY: number): number {
  const top = m.docTop - scrollY;
  const span = m.height - m.vh;
  if (span <= 0) return clamp(-top / Math.max(1, m.height));
  return clamp(-top / span);
}

