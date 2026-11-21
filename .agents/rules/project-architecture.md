---
trigger: always_on
---

# Project Architecture & Stack Conventions

## Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack, static export `output: "export"`). Read relevant guides in `node_modules/next/dist/docs/` before using unfamiliar Next.js APIs.
- **UI Library**: React 19 with strict TypeScript 5.
- **Styling**: Tailwind CSS v4 configured via `@theme` tokens in `app/globals.css`. Prefer semantic theme tokens (`bg-bg`, `text-fg`, `text-cream`, `text-muted`, `text-accent`, `border-hair`, `font-display`, `font-serif`, `font-sans`, `font-mono`).
- **Motion & Scroll**: Framer Motion (`framer-motion`), GSAP (`gsap`), and Lenis smooth scroll (`src/hooks/useSmoothScroll.ts`).

## Asset & Component Guidelines
- **Images**: Always use `<Image />` from `next/image` (never raw `<img />` or `<motion.img />`) and resolve local `/public` image paths using `getImagePath()` from `src/utils/image.ts` to remain compatible with static export and `NEXT_PUBLIC_BASE_PATH`.
- **Client Components**: Mark interactive or animated components with `"use client";` at line 1 and respect `prefers-reduced-motion` where applicable.
- **Preservation**: Do not alter or duplicate global chrome (`Navbar`, `Cursor`, `Preloader`, `SmoothScroll`) when editing individual page sections unless explicitly requested.

