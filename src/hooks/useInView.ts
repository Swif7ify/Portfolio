'use client';

import { useEffect, useState } from "react";
import type { RefObject } from "react";

export function useInView<T extends Element>(ref: RefObject<T | null>, rootMargin = "120px") {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
