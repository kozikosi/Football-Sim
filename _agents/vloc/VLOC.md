# VLOC — lane file (copy to `_agents/vloc/VLOC.md`; rewrite it at the end of every session, never append)

## Identity
- **Seat:** VLOC · **Model / how reached:** OpenChamber VLOC model · **State:** per `_agents/README.md` roster (advisor)
- **ID block:** none (no submissions filed yet) · **First seen:** 2026-10-31
- **Strengths shown so far (evidence, not claims):** council.mjs v8 review mechanics (verified `node --check`, patch hunks apply, classify() prefixes, DISCUSSION section cap=5)

## Current work
- **Claimed / in progress:** none (this session: Owner's open discussion input on the Colors rebuild — not assigned queue work)
- **Done this session:**
  1. Reviewed P-018 (prior session) — `inbox/20261104-1322-vloc-P-018-review.md`, VERDICT: improved, committed 9aa25c88 + bulletin 20261104-1323-vloc.md, pushed to origin council/vloc (verified via git ls-remote).
  2. Examined `colors/` (Colors v1 Svelte rebuild) to ground my input to the Owner's open discussion prompt: VERIFIED `colors/src/engine/rng.ts` (mulberry32 seeded RNG, "never Math.random", fork/forkSeed for replay — draft path confirmed deterministic); VERIFIED `colors/src/app/store.ts` (framework-free, SaveRecord={version,seed,userTeam,picks}, replay() deterministic, SAVE_KEY='20-0:draft'); VERIFIED `grep vite` on colors/package.json + colors/build/ → empty (build uses raw esbuild, not Vite); VERIFIED react+react-dom deps present alongside svelte (discrepancy with "Svelte UI layer only"); VERIFIED build.mjs comment "esbuild-plugin-svelte 0.1.1 is a 2020 package for esbuild 0.8 and Svelte 3" (Svelte 5 rune support of esbuild-svelte ^0.9.5 UNKNOWN — needs `npm ci && npm run build`); VERIFIED `colors/tools/outcomelab/` absent, no sweep.ts (Owner's Outcome Lab is aspirational, not present); gh-pages branch exists (ff7142f3) but 440-season baseline not confirmed.
  3. Wrote Owner-discussion input (all 5 topics: plan critique, workflow, Svelte/Vite, novel ideas, testing) in this lane file + bulletin entry 20261105-1005-vloc.md.
- **Verified items toward core status:** 2 (P-008 review, prior session; P-018 review, Nov 4)
- **Blocked / waiting on:** none

## Owner discussion input (full detail — see bulletin 20261105-1005-vloc.md for summary + FACT lines)

### 1. Critiques of the plan
- Stack gap (VERIFIED): Owner says "Svelte 5 + Vite locked," but colors/package.json has no vite dep and colors/build/build.mjs uses raw esbuild. react+react-dom are listed alongside svelte, contradicting "Svelte is the UI layer only." Either add Vite (and drop react) or restate the stack as esbuild.
- esbuild-svelte + Svelte 5 runes (UNKNOWN): build.mjs itself flags esbuild-plugin-svelte as a Svelte 3 package. Whether esbuild-svelte ^0.9.5 compiles $state/$derived/$props is untested — run `npm ci && npm run build` before any Svelte UI work.
- Determinism (VERIFIED for draft; UNKNOWN for season/sim): rng.ts is mulberry32 seeded with fork/forkSeed; store.replay() rebuilds a draft from {seed,userTeam,picks} byte-identically. Owner's "No Math.random anywhere" holds for draft; season.ts/drives.ts/kicking.ts not yet audited.
- Calibration targets 80/25/10 vs current 38/3 (VERIFIED gap): huge swing. Outcome Lab (sweep.ts) doesn't exist, so there's no measurement harness. Owner's own rule: don't tune to targets without establishing bands first — build the Lab before P-250 tuning.
- "Quarterly/halftime saves" vs deterministic replay (INFERRED tension): mid-game tactical adjustment needs pausable/mutable season state; a pure seeded engine replays identically, so mid-game changes break the replay contract unless the store snapshots mid-season. Clarify whether mid-game edits fork a new seed.
- "Full seed replay not a v1 priority / don't architect against it" (INFERRED contradiction): if the seed is stored, replay is free; if not stored, adding replay later requires re-saving everything. Decide now whether SaveRecord keeps the seed (it does — SaveRecord.seed exists).

### 2. Workflow
- Wave system built for a single HTML file; anchor old→new patches don't map to multi-file TS. Change the unit of work to per-screen or per-module slices; the inbox patch form needs a "file + anchor" WHERE per file.
- Claude contracts / Z.ai implements: no formal handoff stated. The save-envelope disagreement shows the need for a declared envelope owner + a published freeze process (who declares frozen, how changes get in after).
- Queue: 33 ready to build + 88 awaiting review is a lot. Three-confirmation review is a quality gate but a bottleneck risk — suggest triaging stale items and keeping the governor (<10% new catch) enforced.
- Council process: keep the no-assignment, no-claims rule; it survived the shared-tree failure. Adapt, don't abandon.

### 3. Svelte / Vite
- Nobody on council has shipped a large Svelte 5 app; AI training data is legacy Svelte / React-flavored. Enforce runes ($state, $derived, $props) as the only idiom, or the codebase forks stylistically.
- If the stack is truly "Svelte 5 + Vite," add vite to package.json and migrate build.mjs to Vite; esbuild-svelte's Svelte-3 heritage is a real build risk.
- Patterns that fit: the framework-free app store already matches a Svelte store contract (subscribe/set) — Svelte stores or useSyncExternalStore are natural adapters. $derived view models fit the "view models are the contract" boundary well.

### 4. Novel ideas
- Build Outcome Lab sweep.ts (colors/tools/outcomelab/) — it's the linchpin for P-250 calibration and doesn't exist yet. ~5 minutes for 440 seasons is the stated target.
- N1 council exhibit (six files documenting how this AI council built the game) — strong portfolio differentiator for the "managed AI agents building a complex product" story.
- Port the council's reliability review / scorecard into Colors as a pre-freeze gate on the save envelope and engine contracts.

### 5. Testing
- purity.test.ts + rng.test.ts exist — good start. Extend purity/no-Math.random audit to season.ts, drives.ts, kicking.ts to verify the Owner's "No Math.random anywhere" claim beyond draft.
- Run the Outcome Lab baseline (440 seasons) before any tuning; if a finding contradicts a band, flag the band — don't force the engine to match targets.
- Don't tune the engine to match 80/25/10 without established bands first (Owner's rule #5).

## What the next session needs
- **Read first:** `_agents/PRIORITIES.md`, `COUNCIL-BULLETIN.md` CURRENT ROUND, then `node tools/council.mjs next`.
- **Open reviews visible:** P-153, P-164 (NEEDS-REVIEW); P-165 BLOCKED by P-116; P-167 BLOCKED by P-008 (already reviewed by me, cannot re-review).
- **Do not redo:** orientation (sync-base clean); AGENTS.md read; council.mjs v8 mechanics verified; macOS /tmp symlink breaks `node /tmp/council.mjs` — copy runner into worktree and run from there.

## Files in this lane
`_agents/vloc/VLOC.md` — this lane file (live)
`inbox/20261104-1322-vloc-P-018-review.md` — P-018 review (pushed 9aa25c88)
`bulletin/20261105-1005-vloc.md` — Owner discussion input summary (this session, to push)

## Worktree / branch
- Worktree path: `/Users/kosi/Desktop/wt/vloc`
- Branch: `council/vloc`
- Last commit: 758dd246 (lane + bulletin after P-018 review), pushed to origin council/vloc (verified 758dd246)

## Role
OpenChamber specialist. Admitted by the Owner on 2026-10-31. Advisor level: propose, test, dissent, measure. Core status is the Owner's call after 3 verified items (2 so far).
