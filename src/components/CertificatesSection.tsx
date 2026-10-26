"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight as ArrowUpRightIcon, Maximize2 as ZoomIcon, X as XIcon } from 'lucide-react';
import Image from 'next/image';
import { PixelIdenticon } from './pixel/PixelIdenticon';
import { PixelButton } from './pixel/PixelButton';
import { certificates } from '../data/certificates';
import { getImagePath } from '../utils/image';
import type { Certificate } from '../types/portfolio';

const INITIAL = 5;
const EASE = [0.23, 1, 0.32, 1] as const;

export function CertificatesSection() {
  const [showAll, setShowAll] = useState(false);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  const shown = showAll ? certificates : certificates.slice(0, INITIAL);
  const issuerCount = new Set(certificates.map((c) => c.issuer)).size;

  return (
    <section id="certificates" className="relative scroll-mt-16 px-6 py-24 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-pixel text-6xl leading-none lg:text-7xl">Certificates</h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
              Verified technical credentials spanning semiconductor manufacturing, Cisco networking,
              cybersecurity defense, hackathons, and hardware systems servicing.
            </p>
            <dl className="mt-10 flex gap-10 border-t border-line pt-6">
              <div className="flex flex-col-reverse">
                <dt className="mt-2 font-mono text-xs text-muted">Credentials</dt>
                <dd className="font-pixel text-5xl leading-none text-accent">{certificates.length}</dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="mt-2 font-mono text-xs text-muted">Issuers</dt>
                <dd className="font-pixel text-5xl leading-none">{issuerCount}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-b border-line space-y-4">
            <AnimatePresence initial={false}>
              {shown.map((cert, i) => {
                const hasVerification = Boolean(
                  cert.href &&
                  cert.href.trim() !== '' &&
                  cert.href !== '#' &&
                  cert.credentialUrl &&
                  cert.credentialUrl.trim() !== '' &&
                  cert.credentialUrl !== '#'
                );
                const verifyLink = cert.credentialUrl?.trim() || cert.href?.trim();

                return (
                  <motion.li
                    key={cert.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: EASE,
                      delay: Math.max(0, i - INITIAL) * 0.04,
                    }}
                    className="border-t border-line pt-4"
                  >
                    <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-3 sm:p-4 transition-colors duration-150 ease-out hover:bg-paper-2/60 pixel-corners border border-transparent hover:border-line">
                      {/* Certificate Document Thumbnail Preview */}
                      <button
                        type="button"
                        data-cursor="Enlarge"
                        onClick={() => setActiveCert(cert)}
                        className="group/img relative aspect-[4/3] w-full sm:w-36 md:w-44 shrink-0 overflow-hidden pixel-corners border-2 border-line bg-paper-2 shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label={`Preview certificate image for ${cert.title}`}
                      >
                        <Image
                          src={getImagePath(cert.image)}
                          alt={`Certificate: ${cert.title}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 180px"
                          className="object-cover transition-transform duration-300 ease-out group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="pixel-corners bg-ink/90 text-paper text-[10px] font-mono px-2 py-1 flex items-center gap-1 shadow-sm">
                            <ZoomIcon className="h-3 w-3" />
                            View
                          </span>
                        </div>
                        <div className="absolute bottom-1.5 left-1.5 pixel-corners bg-ink/80 px-1.5 py-0.5 font-mono text-[9px] text-paper">
                          {cert.issued}
                        </div>
                      </button>

                      {/* Certificate Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <PixelIdenticon
                            seed={cert.issuer}
                            className="h-5 w-5 border border-line shrink-0"
                          />
                          <span className="font-mono text-xs text-muted uppercase tracking-wider">
                            {cert.issuer}
                          </span>
                          {hasVerification && cert.credentialId && cert.credentialId.trim() !== '' && (
                            <>
                              <span className="text-muted text-xs">•</span>
                              <span className="font-mono text-xs text-muted truncate">
                                ID: {cert.credentialId}
                              </span>
                            </>
                          )}
                        </div>

                        <h3
                          onClick={() => setActiveCert(cert)}
                          className="font-pixel text-xl sm:text-2xl leading-snug text-ink group-hover:text-accent transition-colors cursor-pointer"
                        >
                          {cert.title}
                        </h3>

                        <div className="mt-2.5 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] text-muted">
                          {cert.skills.map((s) => (
                            <span
                              key={s}
                              className="pixel-corners bg-paper-2 px-2 py-0.5 text-ink/80 border border-line/40"
                            >
                              #{s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      {hasVerification && verifyLink && (
                        <div className="sm:self-center shrink-0 flex items-center gap-2">
                          <a
                            href={verifyLink}
                            target="_blank"
                            rel="noreferrer"
                            title="Verify credential at issuer"
                            aria-label={`Verify ${cert.title}`}
                            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-paper bg-ink hover:bg-accent hover:text-accent-ink px-3 py-1.5 pixel-corners transition-colors font-medium"
                          >
                            Verify
                            <ArrowUpRightIcon aria-hidden className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          {certificates.length > INITIAL && (
            <div className="mt-8 flex items-center justify-between">
              <span className="font-mono text-sm text-muted" aria-live="polite">
                Showing {shown.length} of {certificates.length}
              </span>
              <PixelButton
                variant={showAll ? 'soft' : 'solid'}
                onClick={() => setShowAll((v) => !v)}
              >
                {showAll ? 'Show fewer' : `Show all ${certificates.length}`}
              </PixelButton>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Image Lightbox Modal */}
      <AnimatePresence>
        {activeCert && activeCert.image && (() => {
          const hasModalVerification = Boolean(
            activeCert.href &&
            activeCert.href.trim() !== '' &&
            activeCert.href !== '#' &&
            activeCert.credentialUrl &&
            activeCert.credentialUrl.trim() !== '' &&
            activeCert.credentialUrl !== '#'
          );
          const modalVerifyUrl = activeCert.credentialUrl?.trim() || activeCert.href?.trim();

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/85 p-4 sm:p-6 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-paper p-5 pixel-corners border-2 border-ink shadow-2xl"
              >
                <div className="flex items-start justify-between pb-3 border-b border-line gap-4">
                  <div>
                    <h3 className="font-pixel text-2xl leading-snug">{activeCert.title}</h3>
                    <p className="font-mono text-xs text-muted mt-1">
                      {activeCert.issuer} — Issued {activeCert.issued}
                      {hasModalVerification && activeCert.credentialId && activeCert.credentialId.trim() !== '' && (
                        <span> — Credential ID: {activeCert.credentialId}</span>
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveCert(null)}
                    className="p-1.5 text-muted hover:text-ink pixel-corners hover:bg-paper-2 cursor-pointer"
                    aria-label="Close certificate preview"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="relative aspect-[16/11] sm:aspect-[16/10] max-h-[70vh] w-full mt-4 overflow-hidden bg-paper-2 border border-line flex items-center justify-center pixel-corners">
                  <Image
                    src={getImagePath(activeCert.image)}
                    alt={`Certificate: ${activeCert.title}`}
                    fill
                    sizes="(max-width: 1024px) 95vw, 900px"
                    className="object-contain p-2"
                    priority
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {activeCert.skills.map((skill) => (
                      <span key={skill} className="pixel-corners bg-paper-2 px-2.5 py-1 font-mono text-xs text-ink/80">
                        #{skill}
                      </span>
                    ))}
                  </div>

                  {hasModalVerification && modalVerifyUrl && (
                    <PixelButton
                      href={modalVerifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      variant="solid"
                      icon={<ArrowUpRightIcon className="h-4 w-4" />}
                    >
                      Verify at Issuer Portal
                    </PixelButton>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
