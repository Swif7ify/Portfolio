'use client';

import { useEffect, useRef } from "react";

type FrameCallback = (dt: number, time: number) => void;

const subscribers = new Set<FrameCallback>();
let rafId = 0;
let lastTime = 0;

function masterLoop(t: number) {
  const dt = Math.min((t - lastTime) / 1000, 1 / 20);
  lastTime = t;

  subscribers.forEach((cb) => {
    cb(dt, t);
  });

  if (subscribers.size > 0) {
    rafId = requestAnimationFrame(masterLoop);
  } else {
    rafId = 0;
  }
}

function subscribe(cb: FrameCallback): () => void {
  subscribers.add(cb);
  if (subscribers.size === 1 && typeof window !== "undefined") {
    lastTime = performance.now();
    rafId = requestAnimationFrame(masterLoop);
  }
  return () => {
    subscribers.delete(cb);
    if (subscribers.size === 0 && rafId !== 0 && typeof window !== "undefined") {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };
}

/**
 * Subscribes `callback(dtSeconds, timeMs)` to a single unified global
 * `requestAnimationFrame` ticker while `active` is true.
 */
export function useAnimationFrame(callback: FrameCallback, active = true) {
  const ref = useRef<FrameCallback>(callback);

  useEffect(() => {
    ref.current = callback;
  });

  useEffect(() => {
    if (!active || typeof window === "undefined") return;
    const runner: FrameCallback = (dt, t) => ref.current(dt, t);
    return subscribe(runner);
  }, [active]);
}
