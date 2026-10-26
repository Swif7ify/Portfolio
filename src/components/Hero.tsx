"use client";

import React from 'react';
import { ArrowDown as ArrowDownIcon } from 'lucide-react';
import { PixelName } from './pixel/PixelName';
import { PixelButton } from './pixel/PixelButton';
import { useLocalTime } from '../hooks/useLocalTime';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

type HeroProps = {
  accent: string;
  ready: boolean;
};

const EMAIL = 'earl.coding@gmail.com';

export function Hero({ accent, ready }: HeroProps) {
  const time = useLocalTime('Asia/Manila');
  const { status, copy } = useCopyToClipboard();

  return (
    <section id="top" className="relative px-6 pb-24 pt-28 lg:px-12 lg:pb-32 lg:pt-36">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="sr-only">Earl Ordovez — Fullstack developer and creative technologist</h1>

        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-sm text-muted">
          <span>Fullstack Developer &amp; Systems Engineer</span>
          <span className="hidden sm:inline">Olongapo, PH — {time} local</span>
        </div>

        <div className="mt-8 lg:mt-12">
          <PixelName text="Earl Ordovez" accent={accent} ready={ready} />
        </div>

        <p className="mt-5 hidden items-center gap-2 font-mono text-xs text-muted lg:flex">
          <span aria-hidden className="h-2 w-2 bg-accent" />
          Move your cursor through the name
        </p>

        <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12">
          <p className="text-[1.75rem] leading-[1.2] tracking-tight lg:col-span-7 lg:text-[2.6rem] lg:leading-[1.12]">
            I design and build software systems that feel{' '}
            <mark className="bg-accent px-1.5 text-accent-ink font-semibold">fast, resilient</mark> and
            quietly powerful — from raw embedded circuits to high-scale cloud platforms.
          </p>

          <div className="flex flex-col justify-between gap-8 lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-muted">
              Software engineer at OneDev PH. Deeply obsessed with Go tooling, Next.js architecture,
              React Native libraries, and IoT microcontroller hardware that refuses to compromise on craft.
            </p>
            <div className="flex flex-wrap gap-3">
              <PixelButton href="#work" icon={<ArrowDownIcon className="h-4 w-4" />}>
                See selected work
              </PixelButton>
              <PixelButton variant="soft" onClick={() => copy(EMAIL)}>
                <span aria-live="polite">
                  {status === 'copied' ? 'Email copied!' : status === 'error' ? EMAIL : 'Copy email'}
                </span>
              </PixelButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
