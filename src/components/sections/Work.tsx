'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Globe, Plus, Minus } from 'lucide-react';
import { projects, Project } from '../../data/projects';

const VISIBLE_COUNT = 4;

function GithubIcon({ size = 13, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const hasLiveUrl = project.liveUrl && project.liveUrl !== '#';
  const hasRepoUrl = project.repoUrl && project.repoUrl !== '#';

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30, transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] } }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className={`group flex flex-col gap-4 ${index % 2 === 1 ? 'md:mt-16' : ''}`}
    >
      <div className="relative block overflow-hidden rounded-sm bg-panel border border-line/40">
        {hasLiveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="View"
            className="block"
            aria-label={`View live demo of ${project.title}`}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.title} — ${project.category}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </a>
        ) : (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} — ${project.category}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        )}
        {project.year && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-ink/70 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
            {project.year}
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="flex items-center gap-2 font-display text-xl uppercase tracking-wide text-cream md:text-2xl">
            {hasLiveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors flex items-center gap-2"
              >
                {project.title}
                <ArrowUpRight
                  size={18}
                  className="text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </a>
            ) : (
              project.title
            )}
          </h3>
          <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-muted">
            {project.category}
          </p>
        </div>
      </div>

      <p className="max-w-sm font-sans text-xs leading-relaxed text-muted">
        {project.description}
      </p>

      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line/60 px-2.5 py-0.5 font-sans text-[9px] uppercase tracking-[0.15em] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {(hasLiveUrl || hasRepoUrl) && (
        <div className="flex items-center gap-2.5 pt-1">
          {hasLiveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink"
              aria-label={`Live demo of ${project.title}`}
            >
              <Globe size={12} aria-hidden="true" />
              Live Demo
            </a>
          )}
          {hasRepoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:border-cream hover:text-cream"
              aria-label={`GitHub repository of ${project.title}`}
            >
              <GithubIcon size={12} aria-hidden="true" />
              Code
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

export function Work() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const visibleProjects = showAll ? projects : projects.slice(0, VISIBLE_COUNT);

  return (
    <section id="work" className="relative w-full bg-ink px-6 py-24 md:px-10 md:py-36" aria-label="Selected work">
      <div className="mb-16 flex items-end justify-between border-b border-line pb-6 md:mb-24">
        <h2 className="font-display text-[13vw] uppercase leading-none text-cream md:text-[8vw]">
          Selected<span className="text-accent">*</span>
          <span className="block text-stroke">Work</span>
        </h2>
        <span className="hidden font-sans text-xs uppercase tracking-[0.2em] text-muted md:block">
          ({showAll ? projects.length : VISIBLE_COUNT}/{projects.length}) Projects
        </span>
      </div>

      <motion.div layout className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
        <AnimatePresence initial={false}>
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-20 flex justify-center md:mt-28">
        <button
          onClick={() => setShowAll((v) => !v)}
          data-cursor
          aria-expanded={showAll}
          className="group flex items-center gap-3 rounded-full border border-line px-8 py-4 font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          {showAll ? (
            <>
              Show Less
              <Minus size={14} aria-hidden="true" />
            </>
          ) : (
            <>
              View All Projects
              <Plus
                size={14}
                className="transition-transform duration-300 group-hover:rotate-90"
                aria-hidden="true"
              />
            </>
          )}
          <span className="text-muted">({projects.length})</span>
        </button>
      </div>
    </section>
  );
}
