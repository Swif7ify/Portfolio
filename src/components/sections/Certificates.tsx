'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import { certificates } from '../../data/certificates';

export function Certificates() {
  if (!certificates || certificates.length === 0) return null;

  return (
    <section
      id="certificates"
      className="relative w-full border-t border-line bg-panel px-6 py-24 md:px-10 md:py-36"
      aria-label="Certificates"
    >
      <div className="mb-16 flex items-end justify-between md:mb-24">
        <div>
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-accent">
            (Credentials) — Proof of obsession
          </p>
          <h2 className="font-display text-[13vw] uppercase leading-none text-cream md:text-[8vw]">
            Certifi<span className="text-stroke">cates</span>
          </h2>
        </div>
        <span className="hidden font-sans text-xs uppercase tracking-[0.2em] text-muted md:block">
          ({certificates.length}) Verified
        </span>
      </div>

      <ul>
        {certificates.map((cert, i) => (
          <motion.li
            key={cert.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.33, 1, 0.68, 1] }}
            className="border-t border-line last:border-b"
          >
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Verify"
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 md:grid-cols-[3rem_1fr_1fr_auto_auto] md:gap-8 md:py-8"
              aria-label={`Verify certificate: ${cert.title} by ${cert.issuer}`}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:border-accent group-hover:text-accent"
                aria-hidden="true"
              >
                <Award size={16} />
              </span>

              <span className="min-w-0">
                <span className="block truncate font-display text-lg uppercase tracking-wide text-cream transition-colors duration-300 group-hover:text-accent md:text-2xl">
                  {cert.title}
                </span>
                <span className="mt-1 block font-sans text-xs uppercase tracking-[0.2em] text-muted md:hidden">
                  {cert.issuer} — {cert.year}
                </span>
              </span>

              <span className="hidden font-sans text-sm text-muted md:block">{cert.issuer}</span>
              <span className="hidden font-sans text-xs tabular-nums tracking-[0.2em] text-muted md:block">
                {cert.year}
              </span>

              <span
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink"
                aria-hidden="true"
              >
                <ArrowUpRight size={16} />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
