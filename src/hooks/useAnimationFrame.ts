import { useEffect, useRef } from 'react';

/** Runs `callback(dtSeconds, timeMs)` every frame while `active`. Always calls the latest callback. */
export function useAnimationFrame(
  callback: (dt: number, time: number) => void,
  active = true
) {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!active || typeof window === 'undefined') return;
    let id = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min((t - last) / 1000, 1 / 20);
      last = t;
      ref.current(dt, t);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [active]);
}
