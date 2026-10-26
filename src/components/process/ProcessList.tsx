import React from 'react';
import { ProcessStepCard } from './ProcessStepCard';
import { processSteps } from '../../data/process';

export function ProcessList() {
  return (
    <section id="process" aria-labelledby="process-heading" className="relative scroll-mt-16 px-6 py-24">
      <h2 id="process-heading" className="font-pixel text-6xl leading-[0.95]">
        Engineering process
      </h2>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Four stages, zero theatre. Each phase terminates with verified hardware, functioning APIs, or production code.
      </p>
      <ol className="mt-12 space-y-5">
        {processSteps.map((step, i) => (
          <li key={step.title}>
            <ProcessStepCard step={step} index={i} className="min-h-[380px]" />
          </li>
        ))}
      </ol>
    </section>
  );
}
