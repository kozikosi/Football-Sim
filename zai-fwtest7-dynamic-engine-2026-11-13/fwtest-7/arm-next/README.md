# arm-next — Next.js 16 (App Router, `output: 'export'`)

One of the seven Z.ai framework-test arms. Same contract, same fixtures, same
goldens, same `data-testid` names as every other arm; mechanically identical
design, mechanically produced measurements.

## What is arm-owned here

- `src/App.tsx`, `src/state.ts`, `src/components/*.tsx` — **verbatim copies of
  arm-react's arm-owned code**, with two Next.js-mechanical adaptations:
  1. `'use client'` on `src/App.tsx` (hooks/state; everything it imports
     becomes client automatically).
  2. No other edits — the file routing differentiator is deliberately unused
     beyond the single `src/app/page.tsx` route.
- `src/app/layout.tsx`, `src/app/page.tsx`, `next.config.ts`, `tsconfig.json`,
  `package.json` — the Next.js shell.
- `src/engine-contract/` — the vendored contract, byte-identical to every other
  arm (see `engine-contract/PROVENANCE.md` for the pin it comes from). Never
  edited by the arm.

## Static export

`output: 'export'` in `next.config.ts`. `npm run build` produces a fully static
`out/` (no server, no paid anything). `npm run preview` serves `out/` with
`serve` on :4173 (the Playwright drop-in port; see `../playwright/`).

## Type-check

`npm run typecheck` (`tsc --noEmit`). `strict` is off in the arm tsconfig for
the same reason as arm-react: the vendored files' 69 pre-existing strict-mode
errors are pinned by the contract's own ratchet, not by the arm. The
contract-internal strict check runs from inside `src/engine-contract`.
