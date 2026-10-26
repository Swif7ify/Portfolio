"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu as MenuIcon } from 'lucide-react';
import { PixelMark } from './pixel/PixelMark';
import { MobileMenu } from './MobileMenu';
import { navLinks } from '../data/navigation';
import { useActiveSection } from '../hooks/useActiveSection';

type SiteNavProps = {
  accent?: 'ember' | 'lime' | 'cobalt';
  onAccentChange?: (accent: 'ember' | 'lime' | 'cobalt') => void;
};

export function SiteNav({ accent = 'ember', onAccentChange }: SiteNavProps) {
  const active = useActiveSection(navLinks.map((l) => l.id));
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200 ease-out ${
        scrolled
          ? 'border-line bg-paper/85 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-12">
        <a
          href="#top"
          aria-label="Earl Ordovez, back to top"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group"
        >
          <PixelMark className="h-6 w-6 text-ink group-hover:scale-110 transition-transform" />
          <span className="font-pixel text-xl tracking-tight">Earl Ordovez</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`pixel-corners relative block px-4 py-2 font-mono text-sm transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:bg-ink/10 ${
                      isActive ? 'text-paper' : 'text-ink hover:bg-ink/5'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="pixel-corners absolute inset-0 bg-ink"
                        transition={{ type: 'spring', stiffness: 520, damping: 42 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {/* Accent Color Switcher */}
          {onAccentChange && (
            <div
              className="pixel-corners flex items-center gap-1.5 bg-paper-2 p-1 border border-line"
              title="Switch Accent Theme"
            >
              {(['ember', 'lime', 'cobalt'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onAccentChange(mode)}
                  aria-label={`${mode} accent theme`}
                  className={`h-4 w-4 transition-transform ${
                    mode === 'ember'
                      ? 'bg-[#ff4f1a]'
                      : mode === 'lime'
                      ? 'bg-[#b6f03c]'
                      : 'bg-[#2f4bff]'
                  } ${accent === mode ? 'ring-2 ring-ink scale-110' : 'opacity-70 hover:opacity-100'}`}
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-2.5 font-mono text-sm text-muted">
            <span aria-hidden className="pixel-blink h-2 w-2 bg-accent" />
            <span>Open for projects</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="pixel-corners flex h-10 w-10 items-center justify-center bg-ink text-paper md:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}
