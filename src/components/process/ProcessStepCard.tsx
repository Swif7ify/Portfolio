import React from 'react';
import type { ProcessStep } from '../../types/portfolio';

type ProcessStepCardProps = {
  step: ProcessStep;
  index: number;
  className?: string;
};

export function ProcessStepCard({ step, index, className = '' }: ProcessStepCardProps) {
  return (
    <article className={`flex flex-col border-2 border-ink bg-paper p-8 lg:p-10 pixel-corners ${className}`}>
      <div className="flex items-start justify-between">
        <span className="font-pixel text-7xl leading-none lg:text-8xl">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span aria-hidden className="mt-2 h-4 w-4 bg-accent" />
      </div>

      <h3 className="mt-10 font-pixel text-4xl lg:text-5xl">{step.title}</h3>
      <p className="mt-4 text-lg leading-relaxed text-muted">{step.description}</p>

      <ul className="mt-auto space-y-2 border-t border-line pt-6 font-mono text-sm">
        {step.deliverables.map((d) => (
          <li key={d} className="flex items-center gap-3 text-ink">
            <span aria-hidden className="h-1.5 w-1.5 bg-ink" />
            {d}
          </li>
        ))}
      </ul>
    </article>
  );
}
