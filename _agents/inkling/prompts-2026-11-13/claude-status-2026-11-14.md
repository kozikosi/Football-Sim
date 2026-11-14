SPEAKER: KG (Owner) + inkling | ROLE: Council · Owner's prompt to Claude | TASK: framework-evaluation status update & ask | DATE: 2026-11-14 | Audience: CLAUDE (Architect)

# Claude — status, and three asks

Short version first: **both public comparison repositories are up and verified.** Read them; no assumption required.
- Vue 3 + Vite: https://github.com/kozikosi/football-sim-vue — `main` at `6b4de5c734898d85f00c779de4f078532e5dadf9` ("chore: prepare Vue 3 Vite comparison scaffold"), tracked against `origin/main`, clean. `CLAUDE.md → AGENTS.md` symlink preserved.
- Svelte 5 + Vite (standalone; **not** SvelteKit): https://github.com/kozikosi/football-sim-svelte — `main` at `86ba63255b34ef87db2cf9cae954511d5631064f` ("chore: add Svelte 5 Vite comparison scaffold"), tracked against `origin/main`, clean. No SvelteKit anywhere.
- Independent receipts of build-green exist for both (`npm run check`/`type-check`, `test:unit`, `test:e2e`, `build` all green on a freshly-cloned machine, not the workspace that created them); neither repo contains engine code.
- v3 nine-arm framework test (Z.ai-lane, VERIFIED by multiple seats including ERNIE and INKLING): all nine arms pass the acceptance suite and contract byte-identity; no append or ranking has been delivered; 9/9 modify-column-tied-at-zero.
- The 50/50 Vue vs Svelte output is not a verdict; it's a hint demand for a properly designed benchmark.

## What changed since your last turn

1. The public repos exist — the comparison is no longer an abstraction.
2. Previously-missing VCS hygiene corrected: Svelte scaffold now lives in git; Vue's tooling delta committed.
3. `AGENTS.md`/`CLAUDE.md` (symlink) landing in both — copies of the same rulings appear in each.
4. Internals went unseen in the initial scaffold review: `LoadedDataset`-leaks (your D0), `build/build.mjs`, Pinia-only-in-Vue, plus the assorted dead `.svelte`/`.ts` files in the `demo/` directories (flagged, not deleted).
5. Playwright scaffolds: two plain `tests/smoke.spec.ts` both asserting HTTP 200 + `__pinia` / `window.__SIM_STATE__`, nobody has run actual browsers against either.
6. MCP wiring is _on disk, not in hand_: configuration ≠ verification. Actual MCP tool calls have not been exercised in any harness this session.

## Your three asks (in order)

### 1. Engine surface inventory (no implementation)
Inspect `colors/src/sports/nfl/engine/` on the architect branch (engine at pin `4ca9a071` — your own earlier receipt verified the pin). Identify:
- the engine's synchronous/asynchronous shape: every function that touches `Math.random()` (should be 0 by your earlier scan), `Date.now()`, `localStorage`, `fetch`, `Math.random` or other non-determinism;
- the functions the UI will call: `simulateGame`, `cpuPick`, `optimalLineup`, `applyOffPlan`, `applyDefPlan`, `matchupModel`, `modelWeights`, `teamRatings`, `slotWinsPerOvr` (the 700-scale contract), `effOvr`, `flexPenaltyFor`;
- the shape of the UI contract: what `the board` calls, what the roster returns, how `Wins`/`Priority`/`OVR` are read, and whether the UI ever re-feeds into the engine;
- where the data boundary sits: `LoadedDataset` (the NFL tuple leaks — already flagged as D0), and where `DatasetRow` is finally pinned to `string | number | null` instead of a fixed NFL tuple.

Write the inventory, cite the functions you actually opened, and note anywhere the API surfaced you did not inspect. Stop short of proposing any implementation.

### 2. Benchmark scope + acceptance criteria for the Owner to approve (no execution yet)
A benchmark is only useful if its acceptance criteria can be run, reproduced, and adjudicated. Propose — do not run — a benchmark that covers: 
- 1,000 synthetic player records (or the first 1k rows of a real slice — your call; reason it)
- 32 team rosters
- A snake draft with at least the first 5 rounds (26, 27, 28 or more if you have a preferred suggestion)
- A single season's worth of game summaries (ratings → matchup → result shape)
- A draft board with sorting, filtering and selection update

For each, propose: what the baseline looks like, what the specific workload is, what the acceptance criteria are (time, determinism, byte hashes, etc.), and what the test strategy is (unit vs E2E). Give the Owner something he can approve or reject — a named spec with explicit thresholds, not a vague "fast enough."

### 3. Estimator-workload division between you and me
Generate a small readiness summary: which of the seven tasks you'd own (review, ETA, API), which should be handed to the council as research, and which are Owner's judgment calls — and do it per-ask, not as one blob.

## Constraints (unchanged)
- Framework-neutral plain TS across the product.
- No production migration; no framework decision; no implementation of any of the above without your approval.
- SvelteKit out. Standalone Svelte 5 + Vite only. React/Next/Nuxt are not candidates.
- nflverse is still the data, not the engine; the engine is the product.
- Labelled claims: VERIFIED / REPORTED / INFERRED / UNKNOWN. If you can't verify, say so - "insufficient evidence" is a welcome answer, not a failure.
- No merging; work on the engine branch (`architect/engine-and-seats`) only; Diego-then-build, not build-then-Diego.
- No weight pinning; the 99-rule flex table stays the live truth, not the point of debate.
- No decisions without the Owner's signature.

## Notes for your own health

You've hit usage limits twice this wave. Your time is the scarcest resource in the room; please read this once rather than re-fetching it from memory, flag contradictions against `council-work-order-2026-11-13.md` rather than working around them, and tell me which of the three questions you can't close before you start — I'll ask the Owner for anything that needs his call instead of guessing.

— inkling (record) for KG
