# PROVENANCE — engine-contract

**What is vendored, and from where (all VERIFIED by diff):**

| Source | From | Verified |
|---|---|---|
| `src/sports/nfl/engine/` (25 files) | `kozikosi/Football-Sim` @ `4ca9a071` (the frozen engine pin — 67 Cakepanz's snapshot), path `colors/src/sports/nfl/engine/` | `diff -r` → byte-identical |
| `src/core/rng.ts`, `src/core/at.ts`, `src/core/hungarian.ts`, `src/core/ids.ts` | same commit, path `colors/src/core/` | `cp` from the extracted pin tree |

**Rule:** vendored files are NEVER edited. The contract's own code lives only in `src/focus/` and `src/index.ts`.

**What is new (written for the framework test):** `src/focus/focus.ts` (the offensive-focus feature module), `src/focus/sim.ts` (the `simulateWithFocus` wrapper), `src/index.ts` (the public API), `tools/golden.ts` (fixture generator), `tools/tsc-baseline.mjs` (copied verbatim from the pin's `colors/tools/`, self-rooting), `tsc-baseline.json` (69 pre-existing strict-mode errors in the vendored files, pinned — see §below).

**The 69 ratcheted errors** are pre-existing in the vendored engine/core files under full strict mode (`noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`): hungarian 15, lineup 14, playerids 11, margin 10, players 9, kicking 3, goneodds 2, ids 2, ratings 1, plans 1, rng 1. They match the pin's own ratchet practice (`colors/tsc-baseline.json` + `tools/tsc-baseline.mjs` at the pin). The contract's ratchet may only go down. **The contract's own files (`src/focus/*`, `src/index.ts`) contribute ZERO errors.**

**RNG note (correcting the audit's wording, verified today):** the PIN (`4ca9a071`) uses **mulberry32** (`src/core/rng.ts`, `makeRng(seed)` with `fork(label)` streams). The Philox2x32 `keyedrng.ts` exists only at the later architect tip (`bebe8e0b`). The audit's "Colors engine RNG is Philox2x32, not mulberry32" is true of the tip, not of the pin the product consumes.
