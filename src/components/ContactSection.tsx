"use client";

import React from 'react';
import { ArrowUp as ArrowUpIcon, ArrowUpRight as ArrowUpRightIcon, Check as CheckIcon, Copy as CopyIcon } from 'lucide-react';
import { PixelButton } from './pixel/PixelButton';
import { socials } from '../data/socials';
import { useLocalTime } from '../hooks/useLocalTime';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

const EMAIL = 'earl.coding@gmail.com';

export function ContactSection() {
  const time = useLocalTime('Asia/Manila');
  const { status, copy } = useCopyToClipboard();

  return (
    <section id="contact" className="relative z-10 bg-ink px-6 pb-10 pt-28 text-paper lg:px-12 lg:pt-40">
      <div className="mx-auto max-w-[1440px]">
        <p className="flex items-center gap-2.5 font-mono text-sm text-paper/60">
          <span aria-hidden className="pixel-blink h-2 w-2 bg-accent" />
          Available for innovative projects &amp; engineering opportunities
        </p>

        <h2 className="mt-8 font-pixel text-[clamp(3.25rem,9vw,9.5rem)] leading-[0.9]">
          Have something
          <br />
          worth building?
        </h2>

        <div className="mt-16 flex flex-col gap-8 border-t border-paper/15 pt-10 lg:flex-row lg:items-end lg:justify-between">
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="Write"
            className="group inline-flex items-center gap-4 break-all text-3xl font-medium tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-5xl lg:text-6xl"
          >
            <span className="transition-colors duration-150 group-hover:text-accent font-pixel">
              {EMAIL}
            </span>
            <ArrowUpRightIcon
              aria-hidden
              className="h-8 w-8 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 lg:h-12 lg:w-12 text-accent"
            />
          </a>

          <PixelButton
            variant="light"
            onClick={() => copy(EMAIL)}
            icon={status === 'copied' ? <CheckIcon className="h-4 w-4 text-accent" /> : <CopyIcon className="h-4 w-4" />}
          >
            <span aria-live="polite">
              {status === 'copied' ? 'Copied to clipboard!' : status === 'error' ? 'Copy failed' : 'Copy address'}
            </span>
          </PixelButton>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h3 className="font-mono text-sm text-paper/60 uppercase tracking-wider">Connect</h3>
            <ul className="mt-4">
              {socials.map((s) => (
                <li key={s.label} className="border-t border-paper/15 last:border-b">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between py-4 transition-colors duration-150 hover:text-accent focus-visible:text-accent focus-visible:outline-none"
                  >
                    <span className="text-xl font-pixel">{s.label}</span>
                    <span className="flex items-center gap-3 font-mono text-sm text-paper/60 group-hover:text-accent">
                      {s.handle}
                      <ArrowUpRightIcon aria-hidden className="h-4 w-4" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h3 className="font-mono text-sm text-paper/60 uppercase tracking-wider">Based in</h3>
            <p className="mt-4 text-xl font-medium">Olongapo, Philippines</p>
            <p className="mt-1 font-mono text-sm text-paper/60">{time} local time (PHT)</p>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-mono text-sm text-paper/60 uppercase tracking-wider">Response time</h3>
            <p className="mt-4 text-xl font-medium">Prompt reply within 24 hours.</p>
          </div>
        </div>

        <footer className="mt-28 flex flex-col gap-4 border-t border-paper/15 pt-6 font-mono text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Earl Ordovez</span>
          <span>Designed &amp; built by hand, pixel by pixel</span>
          <a
            href="#top"
            className="inline-flex items-center gap-2 transition-colors duration-150 hover:text-paper"
          >
            Back to top <ArrowUpIcon aria-hidden className="h-4 w-4" />
          </a>
        </footer>
      </div>
    </section>
  );
}
