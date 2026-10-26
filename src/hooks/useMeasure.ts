import { useCallback, useEffect, useRef, useState } from 'react';

/** Returns a ref callback and the element's live content size (for dynamic height/width animations). */
export function useMeasure<T extends HTMLElement>() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ro = useRef<ResizeObserver | null>(null);

  const ref = useCallback((el: T | null) => {
    ro.current?.disconnect();
    if (!el || typeof window === 'undefined') return;
    ro.current = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize?.[0];
      setSize(
        box
          ? { width: box.inlineSize, height: box.blockSize }
          : { width: el.offsetWidth, height: el.offsetHeight }
      );
    });
    ro.current.observe(el);
  }, []);

  useEffect(() => () => ro.current?.disconnect(), []);
  return [ref, size] as const;
}
