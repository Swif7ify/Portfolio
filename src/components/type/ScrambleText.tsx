'use client';

import React, { useEffect, useRef } from "react";
import { useKinetic } from "@/src/contexts/KineticContext";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

/** Decodes from random glyphs left-to-right when it enters view and again on hover. */
export function ScrambleText({ text, className }: ScrambleTextProps) {
  const { reducedMotion } = useKinetic();
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  const run = () => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const total = 600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      const revealed = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        out += i < revealed || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out;
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && run(), { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className} onPointerEnter={run} aria-label={text}>
      <span ref={ref} aria-hidden>
        {text}
      </span>
    </span>
  );
}
