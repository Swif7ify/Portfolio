import React, { useMemo } from 'react';

type PixelIdenticonProps = {
  seed: string;
  className?: string;
};

/** A 5x5 mirrored pixel mark generated from a string — every issuer gets its own procedural badge. */
export function PixelIdenticon({ seed, className = '' }: PixelIdenticonProps) {
  const cells = useMemo(() => {
    let hash = 5381;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) + hash + seed.charCodeAt(i)) >>> 0;
    }
    const out: { x: number; y: number; accent: boolean }[] = [];
    const accentAt = hash % 15;
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 3; x++) {
        const bit = y * 3 + x;
        if ((hash >> bit) & 1 || bit === accentAt) {
          const accent = bit === accentAt;
          out.push({ x, y, accent });
          if (x < 2) out.push({ x: 4 - x, y, accent });
        }
      }
    }
    return out;
  }, [seed]);

  return (
    <svg viewBox="-1 -1 7 7" className={`bg-paper-2 ${className}`} shapeRendering="crispEdges" aria-hidden>
      {cells.map((c) => (
        <rect
          key={`${c.x}-${c.y}`}
          x={c.x}
          y={c.y}
          width={1}
          height={1}
          className={c.accent ? 'fill-accent' : 'fill-ink'}
        />
      ))}
    </svg>
  );
}
