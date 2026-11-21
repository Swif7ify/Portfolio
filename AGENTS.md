<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Workspace Agent Rules

1. **Maximum 500 Lines per File**: No source file may exceed 500 lines of code (`<= 500` lines). Split larger files into modular sub-components, hooks (`src/hooks/`), types (`src/types/`), utilities (`src/utils/`), or data modules (`src/data/`).
2. **No `any` Type**: Never use TypeScript's `any` type (`: any`, `as any`, `any[]`, `Record<string, any>`). Always use explicit interfaces, type aliases, generics, or `unknown` with type narrowing.
3. **Commit & Push on Explicit Request Only (This Specific Moment Only)**: Never auto-commit or auto-push. Only run `git commit` and `git push` when the user explicitly says `"commit and push"` in their current message, and apply it to that specific moment only (never carry over auto-push behavior to future turns).
