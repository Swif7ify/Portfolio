---
name: commit-and-push
description: >-
  Stages, commits, and pushes changes to the current Git branch for the current
  moment only. Activate this skill ONLY when the user explicitly says "commit
  and push" (or asks to commit and push) in their current prompt.
---

# Commit and Push (One-Time Moment Execution)

> **CRITICAL**: Only execute this workflow when the user has explicitly asked to `"commit and push"` in their **current** message. This authorization is valid for **this specific moment only** and must never carry over to future turns.

## Workflow Steps

1. **Pre-Commit Standards Check**:
   - Ensure all modified files in this turn are **<= 500 lines of code**.
   - Ensure zero usage of the `any` type in modified `.ts` / `.tsx` files.
   - Verify the project compiles cleanly (`npx tsc --noEmit` or `npm run build`).

2. **Inspect Working Tree**:
   - Run `git status` and `git diff --stat` to verify which files were modified or created.
   - Ensure no temporary scratch files or unintended untracked artifacts are staged.

3. **Stage, Commit, and Push**:
   - Stage the relevant files (`git add <files>`).
   - Commit with a clear, descriptive Conventional Commit message (`feat(...)`, `fix(...)`, `refactor(...)`, `chore(...)`).
   - Push to the current remote branch (`git push origin <current-branch>`).

4. **Reset Authorization State**:
   - Once the push completes, the one-time `"commit and push"` authorization is consumed. Do not auto-commit or auto-push on subsequent user requests unless explicitly asked again.

