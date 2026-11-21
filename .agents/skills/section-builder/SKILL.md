---
name: section-builder
description: >-
  Guides the creation and redesign of portfolio sections and kinetic scroll
  transitions using Next.js 16, React 19, Tailwind CSS v4, Framer Motion, and
  GSAP. Use when building, styling, or animating UI sections in the portfolio.
---

# Portfolio Section Builder Skill

Use this skill when building or updating portfolio sections in `src/components/sections/` or transitions in `src/components/transitions/`.

## Design & Engineering Checklist

1. **Strict File Size & Typing**:
   - Keep every component file **<= 500 lines of code**. If a section requires complex sub-views or data, split them into helper components and `src/data/` modules immediately.
   - Define an explicit `interface <SectionName>Props` for component props. **Never use `any`**.

2. **Styling & Tokens**:
   - Use Tailwind CSS v4 theme tokens defined in `app/globals.css` (`bg-bg`, `bg-surface`, `text-fg`, `text-cream`, `text-muted`, `text-accent`, `border-hair`, `font-display`, `font-serif`, `font-sans`, `font-mono`).
   - Ensure full responsiveness across mobile, tablet (`sm:`, `md:`), and desktop (`lg:`) viewports.

3. **Images & Static Export**:
   - Always use `<Image />` from `next/image` instead of raw `<img />` tags.
   - Wrap all local asset paths with `getImagePath("/asset-name.png")` from `src/utils/image.ts`.
   - Remember `next.config.ts` uses `output: "export"`, so avoid server-only runtime features.

4. **Motion & Accessibility**:
   - Use Framer Motion (`useScroll`, `useTransform`, `motion`) or GSAP for hardware-accelerated animations (`transform`, `opacity`, `clipPath`).
   - Respect `prefers-reduced-motion` and provide semantic HTML landmarks (`<section aria-label="...">`, proper heading hierarchy).

