# Fresh-start Cardboard Ringers — Vue 3 arm vs Svelte 5 arm (Inkling, 2026-11-15)

FOR: framework comparison (Owner ruling R-13). Not filed under P-345.
Slice: **Cardboard Ringers** — 2 teams × 3 roster slots (QB/RB/WR), one seeded match (24 plays), one stats table.
Repos used for the live build: `kozikosi/football-sim-vue` and `kozikosi/football-sim-svelte` (shallow clones in the approved temp dir, NOT pushed — Z.ai's fresh-start test owns those repos; files here are copies of what was built and verified).

## What is here

- `vue/` — the Vue arm: `src/engine/ringers.ts` (framework-free), `src/engine/ringers.test.ts`,
  `src/stores/ringers.ts` (Pinia setup store), `src/components/RingersMatch.vue`, `src/App.vue`,
  `src/components/ringers.css` (shared), `index.html`, `package.json`.
- `svelte/` — the Svelte arm: identical engine/CSS/test under `src/lib/engine/`,
  `src/lib/state/ringers.svelte.ts` (runes class bridge), `src/components/RingersMatch.svelte`,
  `src/App.svelte`, `index.html`, `package.json`.

`src/engine/ringers.ts` and `ringers.css` are BYTE-IDENTICAL between the arms (cmp CLEAN).

## Receipts (all on 2026-11-15, node v26.13.0, macOS)

Vue arm (clone at 6b4de5c):
- `npm ci` ✓ (exit 0) · `npm run build` ✓ vue-tsc type-check + vite build (exit 0) — **one type error caught first**:
  `src/engine/ringers.ts(74,3): error TS2352/TS2322 — Type 'RingerCard | undefined' is not assignable to type 'RingerCard'`
  under `noUncheckedIndexedAccess: true` (tsconfig.app.json l.7). One-char fix (`!`), then green.
- `npx vitest run` → 4/4 passed (2 files) · vite build ~94–364 ms · index JS 77.84 kB / 30.84 gz

Svelte arm (clone at 86ba632):
- `npm ci` ✓ · `npm run check` → 0 errors, 0 warnings (after one a11y fix: `tabindex="0"` on a noninteractive
  scroll region — `a11y_no_noninteractive_tabindex`; vue-tsc was silent on the same markup)
- `npm run build` ✓ (vite build 105–327 ms) · `npx vitest run` → 4/4 passed · index JS 45.02 kB / 17.74 gz
- `svelte-autofixer` (MCP): component + module + App — 1 suggestion (class attribute object form), applied; final pass clean

Cross-arm fidelity (VERIFIED): both previews served (`vite preview`, ports 4173/4174); clicking Run match on
the default seed 2027 rendered the IDENTICAL result in both arms — AUR 27 — 6 BRB, AUR 359 yds / BRB 212 yds,
same 24-event log, same player lines. dist CSS asset hash identical in both arms (index-B7s0TRL8.css).

Bench caveats (carried into the inbox filing):
- The Svelte arm was built SECOND. Iteration speed, lookups and "it clicked" numbers are order-confounded
  (the same confound the Rev 5 sitting records). One pair, one agent, one order — indicative, not settled.
- Engine + CSS were authored once and copied byte-identical (shared instrumentation pre-paid — the Flip Bench's premise).
- Synthetic fixture: every player/rating is invented for this test and labelled as such in the code and the UI footer.
- The Vue scaffold's convention was followed (Pinia setup store); the Svelte scaffold's convention was followed
  (.svelte.ts runes bridge class) — deliberately different store idioms, per each repo's AGENTS.md.
- Titles changed from scaffold defaults to "Cardboard Ringers" in both clones (scratch-only edits).
