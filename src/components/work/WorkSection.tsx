"use client";

import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { ArrowRight as ArrowRightIcon } from 'lucide-react';
import { PixelImage } from '../pixel/PixelImage';
import { PixelButton } from '../pixel/PixelButton';
import { Tag } from '../Tag';
import { ProjectIndex } from './ProjectIndex';
import { projects } from '../../data/projects';

type WorkSectionProps = {
  onOpen: (id: string, e: React.MouseEvent<HTMLElement>) => void;
};

export function WorkSection({ onOpen }: WorkSectionProps) {
  const [featured, ...rest] = projects;
  const featuredRef = useRef<HTMLDivElement>(null);
  const featuredInView = useInView(featuredRef, { amount: 0.45 });
  const [lead, ...supporting] = featured.metrics;

  return (
    <section id="work" className="relative scroll-mt-16 px-6 py-24 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
          <h2 className="font-pixel text-6xl leading-none lg:text-[7.5rem]">
            Selected work
          </h2>
          <p className="max-w-sm font-mono text-sm text-muted">
            Featured flagship engineering study, followed by the comprehensive searchable index. Fullstack systems, CLI tools, robotics, and hardware IoT.
          </p>
        </div>

        <article className="mt-16 grid gap-8 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <div ref={featuredRef} className="lg:col-span-8">
            <button
              type="button"
              data-cursor="Open"
              onClick={(e) => onOpen(featured.id, e)}
              aria-label={`Open case study: ${featured.title}`}
              className="group relative block w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent"
            >
              <PixelImage
                src={featured.image}
                alt={featured.imageAlt ?? featured.title}
                active={featuredInView}
                restingBlock={36}
                className="aspect-[4/3] w-full border border-line"
              />
              <span className="pixel-corners absolute left-4 top-4 bg-ink px-3 py-1.5 font-mono text-xs text-paper">
                Featured case study
              </span>
            </button>
          </div>

          <div className="flex flex-col lg:col-span-4 justify-between">
            <div>
              <p className="font-mono text-sm text-muted">
                {featured.client} — {featured.year}
              </p>
              <h3 className="mt-3 font-pixel text-4xl lg:text-5xl leading-none">
                {featured.title}
              </h3>
              <p className="mt-6 text-lg leading-snug text-ink">
                {featured.summary}
              </p>

              <div className="mt-8 border-t border-line pt-6">
                <p className="font-pixel text-6xl leading-none text-accent">{lead.value}</p>
                <p className="mt-2 font-mono text-sm text-muted">{lead.label}</p>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6">
                  {supporting.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="font-pixel text-2xl leading-none">{m.value}</dd>
                      <dd className="mt-1 text-xs font-mono text-muted">{m.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>

            <div className="mt-10 lg:pt-10">
              <PixelButton
                onClick={(e) => onOpen(featured.id, e)}
                icon={<ArrowRightIcon className="h-4 w-4" />}
              >
                Read the case study
              </PixelButton>
            </div>
          </div>
        </article>

        <div className="mt-28 lg:mt-36">
          <ProjectIndex caseStudies={rest} onOpen={onOpen} />
        </div>
      </div>
    </section>
  );
}
