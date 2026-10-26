import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export function useInView<T extends Element>(
  ref: RefObject<T | null> | { current: T | null },
  rootMargin = '120px'
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
