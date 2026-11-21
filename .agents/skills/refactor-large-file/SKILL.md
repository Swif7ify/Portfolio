---
name: refactor-large-file
description: >-
  Refactors and splits any source file that approaches or exceeds the 500-line
  limit into modular sub-components, hooks, types, and data files while
  preserving strict TypeScript typing (no `any`). Use when a file exceeds or
  would exceed 500 lines of code.
---

# Refactor Large File Skill (<= 500 Lines Enforcement)

Use this skill whenever an existing file exceeds 500 lines of code or a planned edit would push a file over 500 lines.

## Decomposition Strategy

1. **Extract Static Data & Constants (`src/data/`)**:
   - Move copy decks, configuration arrays, exhibit lists, and static metadata out of `.tsx` components into typed data modules under `src/data/`.

2. **Extract Shared Types (`src/types/`)**:
   - Move interfaces, union types, and prop definitions into `src/types/` and import them with `import type { ... }`.
   - Never use `any` during extraction.

3. **Extract Animation & Scroll Logic (`src/hooks/`)**:
   - Move complex `useScroll`, `useTransform`, `useAnimationFrame`, or GSAP timeline setup into focused custom hooks in `src/hooks/`.

4. **Split Sub-Components (`src/components/`)**:
   - Break large section files into focused presentational sub-components (e.g., header lockup, card item, background canvas, modal/drawer).
   - Keep each resulting file well under 500 lines (aim for 150–350 lines per file).

5. **Verify**:
   - Confirm line counts of all resulting files are `<= 500`.
   - Run `npx tsc --noEmit` to verify all imports and types resolve cleanly.

