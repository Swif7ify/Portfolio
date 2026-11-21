---
trigger: always_on
---

# Code Quality & TypeScript Standards

You MUST follow these strict code quality rules on every task in this repository:

## 1. Maximum 500 Lines of Code per File
- **Hard Limit**: Every source file (`.ts`, `.tsx`, `.js`, `.mjs`, `.css`) MUST be **500 lines of code or fewer** (`<= 500` lines).
- **Pre-Edit Check**: Before adding code to an existing file, check its line count. If an edit would push a file over 500 lines, or if you are touching a file that already exceeds 500 lines, refactor and split it immediately.
- **How to Split**:
  - Extract reusable sub-components into dedicated files (e.g., `src/components/sections/<section>/...` or sibling component files).
  - Extract complex state/animation logic into custom hooks under `src/hooks/`.
  - Move static arrays, copy, and configuration objects into `src/data/`.
  - Move shared TypeScript interfaces and types into `src/types/`.
  - Move pure helper functions into `src/utils/`.

## 2. Strict TypeScript — Zero Usage of `any`
- **Forbidden**: Never use the `any` type anywhere in the codebase. This includes:
  - Explicit annotations (`: any`, `any[]`, `Array<any>`, `Record<string, any>`, `Promise<any>`)
  - Type assertions (`as any`, `<any>`)
  - Function parameters or return types defaulting to implicit `any`
- **Required Alternatives**:
  - Use explicit interfaces or type aliases for all component props, data models, and event payloads.
  - Use `unknown` when a value's type is genuinely dynamic, followed by type guards (`typeof`, `instanceof`, `in`, or custom predicates).
  - Use proper generics (`<T>`) for reusable utilities and hooks.
  - Use framework-provided types (`React.ReactNode`, `React.CSSProperties`, `React.RefObject<HTMLElement | null>`, Framer Motion's `MotionValue<number>`, `Variants`, etc.).

