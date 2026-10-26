"use client";

import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { PixelImage } from './pixel/PixelImage';
import { experience } from '../data/experience';
import { recognition } from '../data/recognition';

const PORTRAIT = '/EARL_ORDOVEZ.JPG';

export function AboutSection() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const inView = useInView(portraitRef, { amount: 0.5 });

  return (
    <section id="about" className="relative scroll-mt-16 px-6 py-24 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div ref={portraitRef}>
              <PixelImage
                src={PORTRAIT}
                alt="Portrait of Earl Romeo Ordovez"
                active={inView}
                restingBlock={32}
                className="aspect-[4/5] w-full border border-line"
              />
            </div>
            <p className="mt-4 font-mono text-xs text-muted">
              Earl Romeo Ordovez — Fullstack Developer &amp; Tech Enthusiast
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              <div>
                <p className="font-pixel text-4xl lg:text-5xl text-accent">4+</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">Years crafting</p>
              </div>
              <div>
                <p className="font-pixel text-4xl lg:text-5xl text-accent">20+</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">Projects shipped</p>
              </div>
              <div>
                <p className="font-pixel text-4xl lg:text-5xl text-accent">3</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">Awards &amp; Certs</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <h2 className="text-[2rem] font-medium leading-[1.12] tracking-tight lg:text-[3.25rem] lg:leading-[1.06]">
            I believe the best software is felt before it is understood — making every tool a little less boring.
          </h2>

          <div className="mt-10 grid gap-8 text-lg leading-relaxed text-muted md:grid-cols-2">
            <p>
              Most of my work bridges software and physical reality: from high-performance Go CLIs and
              Next.js administrative platforms to Bluetooth LE telemetry and custom ESP32 microcontroller macropads.
            </p>
            <p>
              I leverage 3D modeling, embedded firmware, and modern web architectures to ensure every project
              is structurally rock-solid, visually striking, and memorable to use.
            </p>
          </div>

          <h3 className="mt-16 font-mono text-sm text-muted uppercase tracking-wider">Experience</h3>
          <ol className="mt-4">
            {experience.map((item) => (
              <li
                key={item.period}
                className="grid grid-cols-12 gap-4 border-t border-line py-5 last:border-b"
              >
                <span className="col-span-12 font-mono text-sm text-muted sm:col-span-3">
                  {item.period}
                </span>
                <span className="col-span-8 text-lg font-medium sm:col-span-5 text-ink">
                  {item.role}
                </span>
                <span className="col-span-4 text-right text-base sm:col-span-4 text-muted">
                  {item.company}
                  <span className="block text-xs text-muted">{item.location}</span>
                </span>
              </li>
            ))}
          </ol>

          <h3 className="mt-16 font-mono text-sm text-muted uppercase tracking-wider">Recognition &amp; Honors</h3>
          <ul className="mt-4 grid gap-x-8 sm:grid-cols-3">
            {recognition.map((item) => (
              <li key={item.title} className="border-t border-line py-5">
                <p className="font-pixel text-2xl text-ink">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.detail}</p>
                <p className="mt-3 font-mono text-xs text-muted">{item.year}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
