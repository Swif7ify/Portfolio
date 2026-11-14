import React from "react";
import type { ReactNode } from "react";

interface ChapterHeaderProps {
  number?: string;
  kicker?: string;
  title: ReactNode;
  description: string;
  id?: string;
}

export function ChapterHeader({ title, description, id }: ChapterHeaderProps) {
  return (
    <header className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
      <div className="md:col-span-8">
        <h2
          id={id}
          className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.03em]"
          style={{ fontVariationSettings: "'wght' 760, 'wdth' 78" }}
        >
          {title}
        </h2>
      </div>
      <p className="text-base leading-relaxed text-muted md:col-span-4">{description}</p>
    </header>
  );
}
