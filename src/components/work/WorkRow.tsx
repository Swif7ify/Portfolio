"use client";

import React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight as ArrowRightIcon,
  ArrowUpRight as ArrowUpRightIcon,
  Plus as PlusIcon,
  Globe,
} from 'lucide-react';
import { Tag } from '../Tag';
import { getImagePath } from '../../utils/image';
import type { ArchiveProject, Project } from '../../types/portfolio';

export type IndexItem =
  | { kind: 'case'; project: Project }
  | { kind: 'archive'; project: ArchiveProject };

type WorkRowProps = {
  item: IndexItem;
  expanded: boolean;
  onToggle: (id: string) => void;
  onOpen: (id: string, e: React.MouseEvent<HTMLElement>) => void;
};

const EASE = [0.23, 1, 0.32, 1] as const;

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

export function WorkRow({ item, expanded, onToggle, onOpen }: WorkRowProps) {
  const { project } = item;
  const isCase = item.kind === 'case';
  const panelId = `work-panel-${project.id}`;

  const live = project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : undefined;
  const repo = project.repoUrl && project.repoUrl !== '#' ? project.repoUrl : undefined;
  const genericHref = 'href' in project && project.href && project.href !== '#' ? project.href : undefined;

  return (
    <div className="border-t border-line">
      <button
        type="button"
        data-cursor={isCase ? 'Read' : undefined}
        onClick={(e) => (isCase ? onOpen(project.id, e) : onToggle(project.id))}
        aria-expanded={isCase ? undefined : expanded}
        aria-controls={isCase ? undefined : panelId}
        className="group grid w-full grid-cols-12 items-center gap-x-4 sm:gap-x-6 gap-y-3 py-5 text-left focus-visible:bg-paper-2 focus-visible:outline-none lg:py-6 transition-colors hover:bg-paper-2/40 px-2"
      >
        {/* Project Thumbnail Image */}
        <div className="col-span-3 sm:col-span-2 lg:col-span-1">
          <div className="relative aspect-[16/10] w-full overflow-hidden pixel-corners border border-line bg-paper-2 shadow-xs">
            <Image
              src={getImagePath(project.image)}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 640px) 25vw, 120px"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            />
          </div>
        </div>

        {/* Title */}
        <div className="col-span-7 sm:col-span-6 lg:col-span-4">
          <span className="font-pixel text-2xl sm:text-3xl lg:text-4xl leading-tight block">
            <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
              {project.title}
            </span>
          </span>
        </div>

        {/* Client & Discipline */}
        <div className="hidden lg:block lg:col-span-3 text-sm leading-snug">
          <span className="font-medium text-ink">{project.client}</span>
          <span className="text-muted block text-xs"> — {project.discipline}</span>
        </div>

        {/* Category & Badge */}
        <div className="hidden sm:flex sm:col-span-3 lg:col-span-2 items-center gap-2">
          <span className="font-mono text-xs sm:text-sm text-muted">{project.category}</span>
          {isCase && (
            <span className="pixel-corners bg-accent px-1.5 py-0.5 font-mono text-[11px] text-accent-ink font-semibold shrink-0">
              Case study
            </span>
          )}
        </div>

        {/* Year */}
        <div className="hidden lg:block lg:col-span-1 text-right font-mono text-sm text-muted">
          {project.year}
        </div>

        {/* Arrow or Expand Icon */}
        <div className="col-span-2 sm:col-span-1 flex justify-end">
          {isCase ? (
            <ArrowRightIcon
              aria-hidden
              className="h-5 w-5 text-ink transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          ) : (
            <PlusIcon
              aria-hidden
              className={`h-5 w-5 transition-transform duration-200 ease-out ${
                expanded ? 'rotate-45 text-accent' : ''
              }`}
            />
          )}
        </div>
      </button>

      {/* Expanded Drawer for Archive Items */}
      <AnimatePresence initial={false}>
        {!isCase && expanded && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 px-2 pb-8 pt-4 border-t border-line/60 bg-paper-2/20">
              {/* Large Image Preview */}
              <div className="md:col-span-4 lg:col-span-4">
                <div className="relative aspect-[16/10] w-full overflow-hidden pixel-corners border-2 border-line bg-paper-2 shadow-sm">
                  <Image
                    src={getImagePath(project.image)}
                    alt={`${project.title} full preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 pixel-corners bg-ink/80 px-2 py-0.5 font-mono text-[10px] text-paper">
                    {project.year}
                  </div>
                </div>
              </div>

              {/* Details & Actions */}
              <div className="md:col-span-8 lg:col-span-8 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-muted uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-muted text-xs">•</span>
                    <span className="font-mono text-xs text-muted">
                      {project.discipline}
                    </span>
                  </div>

                  <p className="max-w-2xl text-base leading-relaxed text-ink/90">
                    {project.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap items-start gap-1.5">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>

                {(live || repo || genericHref) && (
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {live && (
                      <a
                        href={live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-paper bg-ink hover:bg-accent hover:text-accent-ink px-3.5 py-2 pixel-corners transition-colors font-semibold"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        Live Demo
                      </a>
                    )}
                    {repo && (
                      <a
                        href={repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink bg-paper-2 hover:bg-ink hover:text-paper px-3.5 py-2 pixel-corners transition-colors border border-line"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        View Code
                      </a>
                    )}
                    {!live && !repo && genericHref && (
                      <a
                        href={genericHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-sm underline decoration-accent decoration-2 underline-offset-4"
                      >
                        Visit project <ArrowUpRightIcon aria-hidden className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
