import React from 'react';

const PATTERN = ['11111', '10000', '11110', '10000', '11111'];

export function PixelMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 5 5" className={className} shapeRendering="crispEdges" aria-hidden>
      {PATTERN.flatMap((row, y) =>
        row.split('').map((cell, x) =>
          cell === '1' ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              className={x === 4 && y === 4 ? 'fill-accent' : 'fill-current'}
            />
          ) : null
        )
      )}
    </svg>
  );
}
