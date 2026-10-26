"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { services } from '../data/projects';
import { Tag } from './Tag';

const EASE = [0.23, 1, 0.32, 1] as const;

export function CapabilitiesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="capabilities" className="relative scroll-mt-16 px-6 py-24 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
          <h2 className="font-pixel text-6xl leading-none lg:text-[7.5rem]">
            Capabilities
          </h2>
          <p className="max-w-sm font-mono text-sm text-muted">
            Specialized engineering capabilities across frontend, systems architecture, embedded microcontrollers, and real-time graphics.
          </p>
        </div>

        <div className="mt-12 border-b border-line">
          {services.map((service, i) => {
            const isOpen = openIndex === i;
            const panelId = `service-panel-${i}`;

            return (
              <div key={service.number} className="border-t border-line">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group flex w-full items-center justify-between py-8 text-left transition-colors hover:bg-paper-2/40 px-2 lg:py-10"
                >
                  <div className="flex items-baseline gap-6 lg:gap-12">
                    <span className="font-mono text-sm text-muted">
                      /{service.number}
                    </span>
                    <span
                      className={`font-pixel text-3xl transition-colors duration-200 lg:text-5xl ${
                        isOpen ? 'text-accent' : 'text-ink group-hover:text-accent'
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>

                  <span
                    className={`pixel-corners flex h-10 w-10 items-center justify-center bg-paper-2 text-ink transition-transform duration-200 ${
                      isOpen ? 'rotate-45 bg-ink text-paper' : 'group-hover:bg-ink group-hover:text-paper'
                    }`}
                    aria-hidden
                  >
                    <Plus className="h-5 w-5" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-8 px-2 pb-10 pt-2 lg:grid-cols-12 lg:pl-20">
                        <p className="max-w-2xl text-lg leading-relaxed text-muted lg:col-span-8">
                          {service.description}
                        </p>
                        <div
                          className="flex flex-wrap content-start gap-2 lg:col-span-4"
                          aria-label={`${service.title} tech`}
                        >
                          {service.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
