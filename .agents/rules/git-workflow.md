---
trigger: always_on
---

# Git Commit & Push Rule (Moment-Specific Execution Only)

You MUST strictly obey the following version control policy:

## 1. No Automatic Commits or Pushes
- **Default Behavior**: Do **NOT** run `git commit` or `git push` automatically after completing code edits, fixes, or builds.
- Leave changes in the working tree so the user can review and test them first.

## 2. Commit and Push Only for the Specific Moment Requested
- **Trigger**: Only execute `git add`, `git commit`, and `git push` when the user **explicitly** instructs you to `"commit and push"` (or explicitly asks to commit/push in their current message).
- **Single-Moment Scope**: When the user says `"commit and push"`, that authorization applies **to that specific moment/turn only**.
- **No Carry-Over**: Never treat a past `"commit and push"` request in the conversation history as permission to automatically commit or push in subsequent turns. After fulfilling a `"commit and push"` request, immediately return to the default behavior (no auto-commit, no auto-push) for all future requests until the user explicitly says `"commit and push"` again.

