"use client";

import React, { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search as SearchIcon, X as XIcon } from 'lucide-react';
import { PixelButton } from '../pixel/PixelButton';
import { WorkRow, type IndexItem } from './WorkRow';
import { archiveProjects } from '../../data/projects';
import type { Project, ProjectCategory } from '../../types/portfolio';

type ProjectIndexProps = {
  caseStudies: Project[];
  onOpen: (id: string, e: React.MouseEvent<HTMLElement>) => void;
};

type Filter = 'All' | ProjectCategory;

const PAGE = 8;
const CATEGORIES: ProjectCategory[] = [
  'Developer Tool & CLI',
  'Fullstack & Mobile',
  'Hardware & IoT',
  'Robotics & Simulation',
  'Game Development',
  'Libraries & Packages',
];
const EASE = [0.23, 1, 0.32, 1] as const;

export function ProjectIndex({ caseStudies, onOpen }: ProjectIndexProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const allItems = useMemo<IndexItem[]>(
    () => [
      ...caseStudies.map((project): IndexItem => ({ kind: 'case', project })),
      ...archiveProjects.map((project): IndexItem => ({ kind: 'archive', project })),
    ],
    [caseStudies]
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: allItems.length };
    allItems.forEach(({ project }) => {
      map[project.category] = (map[project.category] ?? 0) + 1;
    });
    return map;
  }, [allItems]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter(({ project }) => {
      if (filter !== 'All' && project.category !== filter) return false;
      if (!q) return true;
      return [project.title, project.client, project.discipline, ...project.tags]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [allItems, filter, query]);

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  const changeFilter = (f: Filter) => {
    setFilter(f);
    setVisible(PAGE);
    setExpandedId(null);
  };

  const showLess = () => {
    setVisible(PAGE);
    setExpandedId(null);
    listRef.current?.scrollIntoView({ block: 'start' });
  };

  return (
    <div ref={listRef} className="scroll-mt-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="font-pixel text-4xl lg:text-5xl">Project index</h3>
          <p className="mt-2 font-mono text-sm text-muted">
            Complete engineering catalog — {allItems.length} projects. Flagship case studies open in full; the rest expand inline.
          </p>
        </div>

        <label className="pixel-corners flex h-11 w-full items-center gap-3 bg-paper-2 px-4 focus-within:bg-ink/10 lg:w-80 border border-line">
          <SearchIcon aria-hidden className="h-4 w-4 shrink-0 text-muted" />
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE);
            }}
            placeholder="Search by name, stack, tag..."
            className="w-full bg-transparent font-mono text-sm placeholder:text-muted focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="text-muted hover:text-ink"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
        </label>
      </div>

      <div role="group" aria-label="Filter by category" className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {(['All', ...CATEGORIES] as Filter[]).map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => changeFilter(f)}
              className={`pixel-corners inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap px-4 font-mono text-sm transition-colors duration-150 ease-out focus-visible:outline-none ${
                active
                  ? 'bg-ink text-paper'
                  : 'bg-paper-2 text-ink hover:bg-ink/10 focus-visible:bg-ink/10'
              }`}
            >
              {f}
              <span className={active ? 'text-paper/60' : 'text-muted'}>
                {counts[f] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {shown.length === 0 ? (
          <div className="border-y border-line py-16 text-center">
            <p className="text-lg">No projects match &ldquo;{query}&rdquo;.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                changeFilter('All');
              }}
              className="mt-4 font-mono text-sm underline decoration-accent decoration-2 underline-offset-4"
            >
              Clear search and filters
            </button>
          </div>
        ) : (
          <ul className="border-b border-line">
            <AnimatePresence initial={false}>
              {shown.map((item, i) => (
                <motion.li
                  key={item.project.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: EASE,
                    delay: Math.min((i % PAGE) * 0.035, 0.25),
                  }}
                >
                  <WorkRow
                    item={item}
                    expanded={expandedId === item.project.id}
                    onToggle={(id) => setExpandedId((cur) => (cur === id ? null : id))}
                    onOpen={onOpen}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      {filtered.length > PAGE && (
        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 font-mono text-sm text-muted">
            <span aria-live="polite">
              Showing {shown.length} of {filtered.length}
            </span>
            <span aria-hidden className="flex gap-0.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2 ${
                    i < Math.round((shown.length / filtered.length) * 16)
                      ? 'bg-accent'
                      : 'bg-ink/10'
                  }`}
                />
              ))}
            </span>
          </div>

          {remaining > 0 ? (
            <PixelButton onClick={() => setVisible((v) => v + PAGE)}>
              Show {Math.min(PAGE, remaining)} more
            </PixelButton>
          ) : (
            <PixelButton variant="soft" onClick={showLess}>
              Show less
            </PixelButton>
          )}
        </div>
      )}
    </div>
  );
}
