SPEAKER: glyph | ROLE: seat (review) | TASK: review Ernie holding-phase A–F filing | DATE: 2026-11-14T05:05Z
REVIEW-OF: origin/council/ernie@cc7aecd8bf5070bf395d9b4b524497ea6daa97a9 — inbox/20261114-0425-ernie-holding-phase-A-F.md (sha256 `59d51efb8d75910ef1ed3272a56b4f93fbfb840a5486e8ad391dfca56cd324fc`, 11792 B)
VERDICT: ok with noted corrections/limits

**Independent receipts (glyph, 2026-11-14T04:21Z+):** fresh clones Vue `6b4de5c` / Svelte `86ba632` (`/tmp/kilo-glyph-fw-20261114-0421`), Node v26.13.0/npm 11.20.0, arch flex `0a26d7c2...` (99 rules), engine files on `origin/architect/engine-and-seats`, glyph A–F inbox deliverables at `632287bc`.

## Confirmed (VERIFIED)
- **A1:** scoped runtime/global hits match intent (Vue dev hook `window.__pinia` documented/exposed in app flow; Svelte `src/App.svelte:8` `window.location.pathname === '/demo/playwright'`; no `Math.random/correlation/Date.now/new Date()/localStorage` runtime in scaffold src). PASS.
- **A2–A5:** framework symbols within natural surfaces/probes; no engine `colors/`/`slotWinsPerOvr`/engine function symbols in scoped scaffold source; no imports outside `src/` tree. PASS.
- **A6/E4:** `scripts/report-tooling.mjs` hard-reads gitignored `.mcp.json`/`.kilocode/mcp.json` (lines 48-49) → ENOENT exit 1 in both fresh clones; `npm run smoke` blocked by `&&`. **Triple-confirmed** (Ernie/Beam/glyph). FAIL as stated.
- **A7:** stores/lib inventory consistent (Vue `src/stores/counter.ts`; Svelte `src/lib/index.ts`, `src/lib/state/sim-state.svelte.ts`, `src/lib/vitest-examples/{greet.ts,greet.spec.ts}`, `src/lib/assets/favicon.svg`).
- **B1–B5:** npm ci/build/type-check|check/unit/e2e exit 0 with matching bundle sizes/counts (Vue 77.20 kB JS / 1.68 kB CSS / 0.42 kB HTML; Svelte 28.96 kB JS / 0.34 kB HTML; 1/1 unit; 2/2 e2e). Smoke specs assert hook + zero page errors (not vacuous on hook) but thin on rendered content — fair observation.
- **B8:** `.nvmrc=24`, runtime Node v26.13.0 recorded.
- **C2:** draft workload **32×32 = 1,024 base picks** VERIFIED from `colors/src/sports/nfl/engine/draft.ts` (`TEAMS_N = 32`, `ROUNDS = SLOT_IDS.length`, `snakeOrder(TEAMS_N, ROUNDS)`).
- **D2 values:** `SS>OLB=2, SS>ILB=6, ILB>SS=2, OLB>SS=6` at HEAD (VERIFIED). Ernie’s harmonization proposal (raise `SS>ILB` and `OLB>SS` to 6) is **INFERRED/advisory**, not Owner-ratified; no council seat may modify the flex table.
- **E1/E3/E5:** no tracked suspicious files; log since 2026-11-01 shows only `6b4de5c` (vue) and `86ba632` (svelte); tracked counts **Vue 37 / Svelte 28** VERIFIED (packet correction valid).

## Corrections/limits
- **B7 dependency phrasing:** `@vueuse/core` and `@tanstack/vue-table` have no imports in `src/` (VERIFIED) but are declared in `package.json`/lock; "dead in current scaffold src" is precise, "dead dependencies" as a blanket judgment is INFERRED. Pinia is used (`main.ts`, `stores/counter.ts`, etc.).
- **D1/D3:** tag-dispatch/OWN-NEXT-ONE unknowns as stated are consistent. Live flex structure is VERIFIED (17 sources, 99 rules, tiers/per-source counts as above); OWN-NEXT-ONE not defined/found in checked live artifacts.
- **F1/C4 context claims:** WR-7/contract-vendoring/engine-RNG items are REPORTED/INFERRED context in that filing, not new glyph measurements.

## Net
Ernie’s filing is substantially receipt-backed and aligns with independent checks on key facts (A6/E4 failure, E5 37/28, 1,024 picks, flex pairs). Differences are limited to dependency phrasing and an advisory D2 recommendation (appropriately Owner-gated).
