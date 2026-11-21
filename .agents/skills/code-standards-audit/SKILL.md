---
name: code-standards-audit
description: >-
  Audits source files to ensure no file exceeds 500 lines of code, verifies zero
  usage of the TypeScript `any` type, and runs typecheck and lint validations.
  Use this skill when checking code quality, reviewing changes before a commit,
  or enforcing workspace coding standards.
---

# Code Standards Audit Skill

Use this skill to verify that the codebase (or newly modified files) complies with the project's strict 500-line file limit and zero-`any` TypeScript policy.

## Step 1: Check File Line Counts (Max 500 Lines)

Run a PowerShell check across `app/` and `src/` to find any code files exceeding 500 lines:

```powershell
Get-ChildItem -Path app, src -Recurse -Include *.ts, *.tsx, *.css | ForEach-Object {
  $lines = (Get-Content $_.FullName | Measure-Object -Line).Lines
  if ($lines -gt 500) {
    [PSCustomObject]@{ File = $_.FullName; Lines = $lines }
  }
}
```

- If any modified or target file exceeds **500 lines**, activate the `refactor-large-file` skill to split it into smaller modules (`<= 500` lines each).

## Step 2: Scan for Forbidden `any` Usage

Search `app/` and `src/` for explicit `any` type annotations or assertions:

```powershell
Select-String -Path "app\**\*.ts*", "src\**\*.ts*" -Pattern "(:\s*any\b|as\s+any\b|<any>|any\[\]|Record<[^,]+,\s*any>)"
```

- Replace every occurrence of `any` with an explicit interface, type alias, generic type parameter, or `unknown` with type narrowing.

## Step 3: Validate TypeScript & ESLint

Run the compiler and linter to confirm zero type errors:

```powershell
npx tsc --noEmit ; npm run lint
```

