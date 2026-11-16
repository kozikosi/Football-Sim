# STORE-COST-2x2.md — the store-cost re-baseline (Rev 10 EXT C): wrapper × framework, four cells, files named

Seat: Z.ai · 2026-11-16 · supersedes the Rev 9 one-line comparison ("Pinia setup store 81 L vs plain
reactive({...}) module 45 L — 36 L lighter"). That sentence compared a WRAPPER to a FRAMEWORK — a
category error: one wrapper pattern measured on one framework says nothing about the framework. This
file re-baselines the same SEALED 11-field contract (SEALED-RECIPE.md §2 surface) as a 2×2 and names
the file each cell was measured in. Method: `wc -l` of the store file only, tests excluded — the
same method as PART-A-CLASS-BRIDGE.md Axis 1.

## The four cells (all measured on this tree, 2026-11-16, node v24.22.3)

| pattern \ framework | Vue 3 + Pinia | Svelte 5 ($state) |
|---|---|---|
| **class bridge / wrapper store** | **81 L** — `football-sim-vue/src/stores/weekStore-sealed.ts` (Pinia setup store, `defineStore`) | **84 L** — `football-sim-svelte/src/lib/state/weekStore-sealed.svelte.ts` (class instance bridge, `$state.raw` snapshot) |
| **facade / reactive module** | **45 L** — `football-sim-vue/src/stores/weekStore-sealed-reactive.ts` (plain `reactive({...})` module, no Pinia) | **52 L** — `football-sim-svelte/src/lib/state/weekStore-sealed-reactive.svelte.ts` (module-level `$state.raw` + facade object — authored THIS sitting; no class) |

Reproduce: `node scripts/store-cost-2x2.mjs` → prints the four counts from `wc -l` plus the deltas
(receipts/store-cost-2x2.txt).

## What the 2×2 says

- **The wrapper tax is paid on BOTH frameworks.** Wrapper − module: **Vue 81 − 45 = 36 L**; **Svelte
  84 − 52 = 32 L**. Ernie's falsifier condition — "if the Svelte reactive module is also ~36 L
  lighter than its class bridge, the difference is the wrapper and the framework claim dies" — FIRES:
  the Svelte delta is 32 L, within 4 L of Vue's 36 L (and cross-seat idiom noise was already measured
  at ±11 L in PART-A-CLASS-BRIDGE.md A4b). **The Rev 9 "36 L" is a property of the wrapper pattern
  (instance/class store with per-field glue over a raw engine snapshot), not of Vue.**
- **Restated claim, in the fact-shaped form:** "an instance/wrapper store over this 11-field sealed
  contract costs 32–36 L MORE than a plain reactive module, on both frameworks; the reactive modules
  cost 45 L (Vue) / 52 L (Svelte) — a 7 L framework delta inside noise, measured on files named
  above." The old sentence "Pinia costs 36 L more" survives ONLY as the Vue-column fact; the old
  implication ("therefore part of the Svelte store tax is a Pinia artifact") now has its full
  support: the same tax appears on Svelte's own class bridge.
- **The framework comparison stays a WASH on store cost** — the two reactive-module cells (the
  wrapper-free floor of each framework) differ by 7 L (45 vs 52), consistent with every other line
  count this sitting measured (Rev 8 erratum 0.8: the lines proxy died as a framework signal).
- **Surface dependence, disclosed:** at the Part A surface the class-vs-module delta was only +5 L
  (svelte 50 vs 45); at the sealed surface it is +32 L. The wrapper tax scales with how much
  materialization glue the surface carries (the sealed store embeds pool/fixture/dataset loading);
  it is NOT a constant and NOT a framework property. Both measurements are receipted; neither is
  hidden.

## The Svelte cell is verified, not just counted

The new cell ships with its own contract test (NEW file — no existing test was touched):
`football-sim-svelte/src/lib/state/WeekStepperSealedReactive.test.ts` runs the SAME truth-pinned
assertions as the class bridge's test. Receipted this sitting: `npm run check` → **0 errors, 0
warnings, exit 0** (whole arm, the new file included); `npx vitest run
WeekStepperSealedReactive.test.ts` → **1/1 passed, exit 0**. Neither new file is imported by the app
(a measurement file, exactly like its Vue twin; vitest compiles it, the build does not carry it).

## Falsifier (what would kill THIS claim)

If the Svelte reactive module were NOT lighter than its class bridge (delta ≈ 0), the wrapper story
would be wrong and the Vue-side 36 L would point back at the framework. The measured delta is 32 L —
the wrapper story stands. A second falsifier: `node scripts/store-cost-2x2.mjs --assert` exits 1 if
any of the four counts or the two deltas stop matching this file (the file cannot silently drift
from the tree).
