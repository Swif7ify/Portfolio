'use client';

import React, { useRef, useState } from "react";
import { ArrowUpIcon, Mail } from "lucide-react";
import { useKinetic } from "@/src/contexts/KineticContext";

const socialLinks = [
  {
    label: "Email",
    href: "mailto:earl.coding@gmail.com",
    icon: <Mail className="h-4 w-4" />
  },
  {
    label: "GitHub",
    href: "https://github.com/Swif7ify",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    )
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/earl-romeo-ordovez-a73a36322",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden>
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.65 1.65 0 1 0 .01 3.3 1.65 1.65 0 0 0-.01-3.3z" />
      </svg>
    )
  },
  {
    label: "Sponsor",
    href: "https://github.com/sponsors/Swif7ify",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    )
  }
];

/** Smooth finale and contact section in the document flow with responsive variable typography. */
export function CurtainFooter() {
  const { scrollToId } = useKinetic();
  const [wordHovered, setWordHovered] = useState(false);

  return (
    <footer
      id="contact"
      className="relative z-10 flex min-h-[90vh] w-full flex-col justify-between border-t border-hair bg-surface px-6 pb-12 pt-24 md:px-12 md:pb-16 md:pt-32"
      aria-label="Footer & Contact"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-12 md:flex-row md:items-end">
        <div className="max-w-xl">
          <h3
            className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] leading-[0.95] tracking-[-0.03em] text-fg"
            style={{
              fontFamily: '"Roboto Flex", system-ui, sans-serif',
              fontVariationSettings: "'wght' 780, 'wdth' 78"
            }}
          >
            Have an idea worth building?
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Crafting digital experiences with heart, velocity, and uncompromising attention to detail. Available for select freelance projects & engineering collaborations worldwide.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="mailto:earl.coding@gmail.com"
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-bg transition-transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <Mail className="h-4 w-4" aria-hidden />
              earl.coding@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start gap-5 md:items-end">
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="rounded-full border border-hair p-3.5 text-muted hover:border-fg hover:text-fg hover:scale-105 transition-all"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToId("hero")}
            className="mt-2 flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bg hover:bg-accent hover:text-bg transition-colors shadow-lg active:scale-95 cursor-pointer"
          >
            <ArrowUpIcon className="h-3.5 w-3.5" aria-hidden />
            Back to top
          </button>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center">
        <p
          onMouseEnter={() => setWordHovered(true)}
          onMouseLeave={() => setWordHovered(false)}
          aria-hidden
          className="select-none whitespace-nowrap text-center font-display text-[15vw] leading-[0.8] tracking-[-0.03em] text-fg transition-all duration-700 cursor-default"
          style={{
            fontFamily: '"Roboto Flex", system-ui, sans-serif',
            fontVariationSettings: wordHovered
              ? "'wght' 950, 'wdth' 145"
              : "'wght' 780, 'wdth' 78",
            transformOrigin: "50% 100%"
          }}
        >
          KINETIC
        </p>
        <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          © 2026 Earl Ordovez — Designed & built with obsession
        </p>
      </div>
    </footer>
  );
}
