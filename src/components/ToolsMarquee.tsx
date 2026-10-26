import React from 'react';
import { tools } from '../data/tools';

export function ToolsMarquee() {
  return (
    <section
      aria-label="Core technologies & stack"
      className="group relative z-10 overflow-hidden bg-ink py-8 text-paper lg:py-10 border-y border-line"
    >
      <p className="sr-only">{tools.join(', ')}</p>
      <div aria-hidden className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {[...tools, ...tools].map((tool, i) => (
          <span
            key={`${tool}-${i}`}
            className="flex items-center gap-10 whitespace-nowrap pr-10 font-pixel text-4xl lg:text-6xl text-paper"
          >
            {tool}
            <span className="h-3 w-3 bg-accent" />
          </span>
        ))}
      </div>
    </section>
  );
}
