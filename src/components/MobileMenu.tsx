"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X as XIcon } from 'lucide-react';
import { navLinks } from '../data/navigation';

const EASE = [0.23, 1, 0.32, 1] as const;

export function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="fixed inset-0 z-[70] flex flex-col bg-ink px-6 pb-10 text-paper"
    >
      <div className="flex h-[72px] items-center justify-between">
        <span className="font-pixel text-xl">Menu</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="pixel-corners flex h-10 w-10 items-center justify-center bg-paper text-ink"
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>
      <nav aria-label="Mobile" className="mt-10 flex-1">
        <ul className="space-y-2">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: EASE, delay: 0.05 + i * 0.04 }}
            >
              <a
                href={`#${link.id}`}
                onClick={onClose}
                className="block py-2 font-pixel text-5xl hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
      <p className="flex items-center gap-2.5 font-mono text-sm text-paper/70">
        <span aria-hidden className="pixel-blink h-2 w-2 bg-accent" />
        Open for collaborations • 2026
      </p>
    </motion.div>
  );
}
