'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { certificates, Certificate } from '../../data/certificates';
import { getImagePath } from '../../utils/image';

function CertificateCard({
  cert,
  index,
  onOpen,
}: {
  cert: Certificate;
  index: number;
  onOpen: (cert: Certificate) => void;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.33, 1, 0.68, 1] }}
      className="group"
    >
      <button
        onClick={() => onOpen(cert)}
        data-cursor="Enlarge"
        className="block w-full text-left"
        aria-label={`View certificate: ${cert.title} by ${cert.issuer}`}
      >
        <div className="relative overflow-hidden rounded-sm border border-line bg-ink">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={getImagePath(cert.image)}
              alt={`Certificate: ${cert.title} issued by ${cert.issuer}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          <div className="absolute inset-0 bg-ink/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute left-4 top-4 z-10 rounded-full bg-ink/70 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
            {cert.year}
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg uppercase tracking-wide text-cream transition-colors duration-300 group-hover:text-accent md:text-xl">
              {cert.title}
            </h3>
            <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-muted">
              {cert.issuer}
            </p>
          </div>
        </div>
      </button>
      <a
        href={cert.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor
        className="mt-2 inline-flex items-center gap-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-accent"
        aria-label={`Verify credential for ${cert.title}`}
      >
        Verify credential
        <ArrowUpRight size={12} aria-hidden="true" />
      </a>
    </motion.li>
  );
}

export function Certificates() {
  const [active, setActive] = useState<Certificate | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

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
          ({certificates.length}) Verified — 2022/25
        </span>
      </div>

      <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, i) => (
          <CertificateCard key={cert.id} cert={cert} index={i} onOpen={setActive} />
        ))}
      </ul>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[250] flex items-center justify-center bg-ink/90 p-6 backdrop-blur-md md:p-12"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate: ${active.title}`}
          >
            <motion.figure
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="relative max-h-full w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-line">
                <Image
                  src={getImagePath(active.image)}
                  alt={`Certificate: ${active.title} issued by ${active.issuer}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <figcaption className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-lg uppercase tracking-wide text-cream">
                    {active.title}
                  </p>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted">
                    {active.issuer} — {active.year}
                  </p>
                </div>
                <a
                  href={active.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  className="flex shrink-0 items-center gap-2 rounded-full border border-line px-5 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink"
                >
                  Verify
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </figcaption>
              <button
                onClick={() => setActive(null)}
                data-cursor
                aria-label="Close certificate view"
                className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ink text-cream transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
