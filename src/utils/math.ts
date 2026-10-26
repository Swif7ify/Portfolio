export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function mapRange(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return outMin + (outMax - outMin) * clamp((v - inMin) / (inMax - inMin));
}

/** 0 when the section top hits the viewport top, 1 when its bottom hits the viewport bottom. */
export function sectionProgress(el: HTMLElement) {
  if (typeof window === 'undefined') return 0;
  const r = el.getBoundingClientRect();
  const span = r.height - window.innerHeight;
  if (span <= 0) return clamp(-r.top / Math.max(1, r.height));
  return clamp(-r.top / span);
}
