"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon, Globe } from 'lucide-react';

function GithubIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg
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
import { PixelImage } from './pixel/PixelImage';
import { Tag } from './Tag';
import type { Project } from '../types/portfolio';

type ProjectDetailProps = {
  project: Project;
  nextProject: Project;
  position: number;
  total: number;
  onClose: (e: React.MouseEvent<HTMLElement> | null) => void;
  onNext: (e: React.MouseEvent<HTMLElement>) => void;
};

export function ProjectDetail({
  project,
  nextProject,
  position,
  total,
  onClose,
  onNext,
}: ProjectDetailProps) {
  const backRef = useRef<HTMLButtonElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    backRef.current?.focus({ preventScroll: true });
    const t = window.setTimeout(() => setRevealed(true), 420);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const [lead, ...supporting] = project.metrics;
  const story = [
    { label: 'Challenge', text: project.challenge },
    { label: 'Approach', text: project.approach },
    { label: 'Outcome', text: project.outcome },
  ].filter((s) => Boolean(s.text));

  const hasLive = project.liveUrl && project.liveUrl !== '#';
  const hasRepo = project.repoUrl && project.repoUrl !== '#';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
      className="fixed inset-0 z-[60] overflow-y-auto bg-paper text-ink"
    >
      <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-12">
          <button
            ref={backRef}
            type="button"
            onClick={(e) => onClose(e)}
            className="pixel-corners group inline-flex h-10 items-center gap-2 bg-paper-2 px-4 font-mono text-sm transition-colors duration-150 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper focus-visible:outline-none"
          >
            <ArrowLeftIcon
              aria-hidden
              className="h-4 w-4 transition-transform duration-150 group-hover:-translate-x-0.5"
            />
            Back to work
            <span className="hidden text-muted group-hover:text-paper/60 sm:inline">Esc</span>
          </button>

          <div className="flex items-center gap-4">
            {hasLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-2 font-mono text-xs uppercase px-3 py-1.5 bg-accent text-accent-ink pixel-corners font-semibold"
              >
                <Globe className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
            {hasRepo && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-2 font-mono text-xs uppercase px-3 py-1.5 bg-ink text-paper pixel-corners"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                Code
              </a>
            )}
            <span className="font-mono text-sm text-muted">
              Case study {position} / {total}
            </span>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-[1440px] px-6 pb-16 pt-12 lg:px-12 lg:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-sm text-muted">
            {project.client} — {project.year}
          </p>
          <div className="flex sm:hidden gap-3">
            {hasLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase px-3 py-1 bg-accent text-accent-ink pixel-corners font-semibold"
              >
                <Globe className="h-3 w-3" />
                Demo
              </a>
            )}
            {hasRepo && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase px-3 py-1 bg-ink text-paper pixel-corners"
              >
                <GithubIcon className="h-3 w-3" />
                Code
              </a>
            )}
          </div>
        </div>

        <h1
          id="project-title"
          className="mt-4 font-pixel text-5xl leading-[0.95] sm:text-7xl lg:text-8xl"
        >
          {project.title}
        </h1>

        <p className="mt-8 max-w-4xl text-xl leading-relaxed tracking-tight lg:text-2xl text-ink">
          {project.summary}
        </p>

        <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-line pt-6 lg:grid-cols-4">
          <div>
            <dt className="font-mono text-xs text-muted">Role</dt>
            <dd className="mt-2 font-medium">{project.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-muted">Discipline</dt>
            <dd className="mt-2 font-medium">{project.discipline}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-muted">Year</dt>
            <dd className="mt-2 font-medium">{project.year}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-muted">Stack</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </dd>
          </div>
        </dl>

        <PixelImage
          src={project.image}
          alt={project.imageAlt ?? project.title}
          active={revealed}
          restingBlock={40}
          className="mt-12 aspect-[4/3] w-full lg:aspect-[16/9] border border-line"
        />

        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-12">
          {lead && (
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="font-pixel text-7xl lg:text-8xl leading-none text-accent">
                  {lead.value}
                </p>
                <p className="mt-3 text-lg font-mono text-muted">{lead.label}</p>
                {supporting.length > 0 && (
                  <dl className="mt-10 space-y-6 border-t border-line pt-6">
                    {supporting.map((m) => (
                      <div key={m.label} className="flex items-baseline justify-between gap-6">
                        <dt className="text-muted text-sm">{m.label}</dt>
                        <dd className="font-pixel text-3xl">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </aside>
          )}

          <div className="space-y-12 lg:col-span-7 lg:col-start-6">
            {story.map((s) => (
              <section key={s.label} className="border-t border-line pt-6">
                <h2 className="font-mono text-sm text-muted uppercase tracking-wider">{s.label}</h2>
                <p className="mt-4 text-lg leading-relaxed lg:text-xl lg:leading-relaxed text-ink">
                  {s.text}
                </p>
              </section>
            ))}
          </div>
        </div>

        <button
          type="button"
          data-cursor="Next"
          onClick={onNext}
          className="group mt-28 block w-full border-t-2 border-ink pt-8 text-left focus-visible:bg-paper-2 focus-visible:outline-none"
        >
          <span className="font-mono text-sm text-muted">Next case study</span>
          <span className="mt-4 flex items-center justify-between gap-6">
            <span className="font-pixel text-4xl sm:text-6xl leading-none transition-transform duration-200 ease-out group-hover:translate-x-3 lg:text-7xl">
              {nextProject.title}
            </span>
            <ArrowRightIcon
              aria-hidden
              className="h-8 w-8 sm:h-12 sm:w-12 shrink-0 text-accent transition-transform duration-200 ease-out group-hover:translate-x-2"
            />
          </span>
        </button>
      </article>
    </div>
  );
}
