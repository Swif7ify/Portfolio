"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ProcessStepCard } from './ProcessStepCard';
import { processSteps } from '../../data/process';

const SEGMENTS = 32;

export function ProcessScroller() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [lit, setLit] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const container = scrollContainerRef.current;
    if (!track || !container) return;

    const measure = () => {
      const trackWidth = track.scrollWidth;
      const containerWidth = container.clientWidth;
      const newDistance = Math.max(0, trackWidth - containerWidth + 48);
      setDistance(newDistance);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(container);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (v) => -v * distance);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setLit(Math.round(v * SEGMENTS));
    const stepIdx = Math.min(processSteps.length - 1, Math.floor(v * processSteps.length));
    setActiveStep(stepIdx);
  });

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="relative scroll-mt-0"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-14">
        {/* Main Content Area: Pinned Heading on Left, Horizontal Cards on Right */}
        <div className="mx-auto flex w-full max-w-[1520px] items-stretch gap-8 px-6 lg:px-12">
          {/* Pinned Title & Context Column */}
          <div className="flex w-[340px] xl:w-[400px] shrink-0 flex-col justify-between py-4 pr-6 xl:pr-10 border-r border-line bg-paper z-10">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent mb-3">
                <span className="h-2 w-2 bg-accent inline-block" />
                <span>Workflow Architecture</span>
              </div>
              <h2 id="process-heading" className="font-pixel text-6xl leading-[0.95] xl:text-7xl text-ink">
                Engineering process
              </h2>
              <p className="mt-6 text-base xl:text-lg leading-relaxed text-muted">
                Four structured stages, zero theatre. Each one culminates in verified hardware, type-safe APIs, or shipped features.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-line/60">
              <div className="font-mono text-xs uppercase tracking-wider text-muted">
                Stage: <span className="text-ink font-bold">{String(activeStep + 1).padStart(2, '0')} / 04 — {processSteps[activeStep]?.title}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-accent">
                <span>Keep scrolling</span>
                <span className="animate-pulse">→</span>
              </div>
            </div>
          </div>

          {/* Cards Track Runway with Edge Fades */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-hidden py-3 relative [mask-image:linear-gradient(to_right,transparent_0%,transparent_20px,black_64px,black_calc(100%-48px),transparent_100%)]"
          >
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex w-max items-stretch gap-6 pl-4 pr-12"
            >
              {processSteps.map((step, i) => (
                <ProcessStepCard
                  key={step.title}
                  step={step}
                  index={i}
                  className="min-h-[440px] xl:min-h-[480px] w-[380px] xl:w-[440px] shrink-0 shadow-xs"
                />
              ))}
              <div className="w-[6vw] shrink-0" aria-hidden />
            </motion.div>
          </div>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="mx-auto mt-8 flex w-full max-w-[1520px] items-center gap-6 px-6 lg:px-12" aria-hidden>
          <div className="flex flex-1 gap-1">
            {Array.from({ length: SEGMENTS }).map((_, i) => (
              <span
                key={i}
                className={`h-2.5 flex-1 transition-colors duration-150 ${
                  i < lit ? 'bg-accent' : 'bg-ink/10'
                }`}
              />
            ))}
          </div>
          <span className="w-12 text-right font-mono text-xs tabular-nums text-muted">
            {Math.round((lit / SEGMENTS) * 100)}%
          </span>
        </div>
      </div>
    </section>
  );
}

