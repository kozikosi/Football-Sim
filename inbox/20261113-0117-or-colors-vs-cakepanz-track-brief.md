SPEAKER: or | ROLE: council | TASK: P-354 | DATE: 2026-11-13T01:17:39Z

FOR: P-354

# Colors/Cakepanz Track Brief — Evidence-Based Investigation

## Executive Summary
**Colors is the authoritative product track. Cakepanz is a deliberate subset — the framework-testing surface. They are not competing implementations; Cakepanz is a minimal reference surface for the framework experiment.**

## Verified Evidence

### Colors (architect/engine-and-seats)
- Location: `/Users/kosi/Desktop/wt/architect-colors/colors/` (branch `architect/engine-and-seats`)
- **28 engine source files** in `src/engine/`
- **App layer**: `src/app/` (store.ts, selectors.ts)
- **View layer**: `src/view/` (draftBoard.ts, roster.ts, teamColors.ts, theme.ts)
- **213 passing tests** covering full simulation
- Build: esbuild via `build/build.mjs`
- **Zero .svelte files** — framework declared but not used in components
- React 19 declared in package.json, **zero imports in src/** (VERIFIED by grep)

### Cakepanz (council/GH)
- Location: `/Users/kosi/Desktop/wt/GH/colors/` (branch `council/GH`)
- **7 engine source files** in `src/engine/` (flex, hungarian, kicking, lineup, players, rng, slots)
- **No app layer, no view layer**
- **66 passing tests** (subset of Colors' test surface)
- No build script
- Same purity test contract, same test command

### Shared Foundation
- Pre-Colors HTML: `Football-Sim-PreColors.html` (657,486 B, `40233d6be00e987c`) — byte-identical in both
- Same purity test: `purity.test.ts` enforces no DOM/Math.random/Date.now/storage in engine
- Same test runner: `node --test --experimental-strip-types "test/*.test.ts"`

### What is NOT in either track
- No CI/CD workflows anywhere (`.github/workflows/` empty)
- No deployed live product (gh-pages serves old artifact)
- No Vite usage — both use esbuild despite package.json descriptions
- No IndexedDB, no authentication, no database

## Track Relationship
**Cakepanz is a strict subset of Colors' engine.** The 7 files in Cakepanz exist in Colors with identical file names and same purity contract. This is by design — Cakepanz is the framework-testing surface, not a competing product.

## Recommendation
**Colors = primary product track.** Cakepanz remains as the framework-testing surface for the Svelte/React/Vue/Solid experiment.

**Owner decision required:** Confirm Colors as primary, or explicitly choose otherwise. This decision blocks all subsequent work (CI, framework experiment, save versioning, etc.).

## Supporting Deliverables
Full 11-deliverable review attached in this session's analysis, including:
- Prioritized remediation queue (CI, React removal, save versioning)
- D1-D20 decision register (14 defer, 6 implement/decide now)
- Simulation Laboratory spec
- AI-agent operating model
- 30-day implementation roadmap