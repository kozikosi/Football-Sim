# INKLING — lane file (rewrite in place when seat state changes; never append; ≤60 lines)

**Seat:** INKLING · Inkling 2 Small Free (opencode/inkling-2-small-free) via OpenChamber · admitted 2026-11-09 · **transient, not permanent** — deputized by the Owner while MUSE was out; answers to the Owner alone; holds no standing rank over any seat. If a task contradicts `AGENTS.md` (on `origin/council/muse`) or the Owner, the muse file and the Owner win.

## Boot protocol

1. `git fetch -q origin; git log --oneline -1; git status --short` — worktree clean, branch `council/inkling`.
2. Read this file. Then the task's named files only.
3. **The live rules live on `origin/council/muse`**. Refresh first; treat stale copies as REPORTED.
4. `node tools/preserve.mjs check` — my worktree must be clean; unsaved work elsewhere is not mine to touch.

## Permanent seat rules

- Byte-check everything: every VERIFIED needs directory · exact command · ref/sha · output neighbourhood. Independent re-run is the only confirmation.
- Never edit governance, never touch `colors/src/**`, flex, the product file, or any other seat's bytes. INKLING reviews, measures, advises; does not build the engine/product.
- No new P-IDs without the Owner; dissent in writing, inside the filing.

## Current state (2026-11-16, session end @ `27b77635`; branch pushed)

- **The engine test round ("make every gate prove it can fail") — items A–L filed and pushed.** Headlines: 1b slice re-verified (363/363; ratchet real, refactorRefuses raise) — all 12 new sim-slice tests die on targeted mutations; de-gated tests live (identity test dies on effOvr-misaccounting; E5 omission class caught only by the needles test); **the 1b CI really says green on a failing commit** (every step `continue-on-error`; build exits 1; check-run `success`). Hungarian exact/O(n³)/index-order ties; NaN cell → silently wrong answer (verified). Flex 99 rules, 0 mismatches typed-vs-json; cross-side floor holds. Fresh-start repos are scaffolds (green smoke only). 8 P-345/R-13 mislabels named. **Pin reading: fixed at `d3bd81d2` per the record** (NOW.md's "resolves to the latest" is the Architect's misreading).
- **The emergency-constant defect refuted on real data (item D):** real 32 rosters → 0 fills in both bases under all constants; synthetic-roster artefact (no K/P in draw set); the "strict 1e9" win is achieved by emptying spots (seed 259: no corners); derived ladder byte-identical to shipped on 5,000+32 real rosters. §5 patch filed anyway (derived ladder + a gate that fails today).
- **Rev 8 / Rev 9 / Rev 10 fresh-start deliveries VENDORED (Owner-directed) and REVIEWED:** `_agents/inkling/deliveries/zai-fresh-start-rev{8,9,10}-2026-11-16/`. Each verdict **improved**. Rev 10 ("make the delivery able to fail"): packaged gate reproduced by me — **6 manifests, 1,793 entries, no unlisted files**; the A5 live catch reproduced: **the Rev 10 gate FAILS my pristine Rev 9 tree naming `receipts/clean-extract-rev9.txt`**. Author-run sealed bench now STRUCTURALLY out of evidence (VERDICT-REV-10-ADDENDUM); settle rule pre-registered + hash-pinned (`afbf249f…268`, verified); 2×2 store re-base (wrapper tax 36 L vue / 32 L svelte — framework claim dies on both arms); three Architect-bound §5 proposals (test-scope: 384 = 91 pinned + 293 test-scope unrated; hungarian tie 25/300; boxscore M1/M3 survivors, firstDowns ABSENT-AT-PIN re-verified); one packaging drift flagged (REV-10-ERRATA §1 quotes 1781 vs packaged 1793).
- **P-333 recheck:** gap **2773.0387** VERIFIED at `86f22d10`, stand-ins TE3←FB / DT2←SS / CB3←TE @−6, spot-value difference exactly 0. My sketch distances reproduce ONLY on the 1,941 ratings rows (flagged).
- **Sealed bench claimed and run (the first seat):** both arms built green (vue 0 repairs first-try; svelte 1 import-path repair); node counts ALL EQUAL (871/457/470/125/247/39); 24/24 batteries; contamination caveat — repairs are lower bounds; **WASH stands; no falsifier fired; the pick is the Owner's.**
- **Two prompts filed this session for the Owner (not pasted yet):** `inbox/20261116-1845-inkling-prompt-zai-cakepanz-shell-finish.md` (Z.ai finishes the 67 Cakepanz UI/UX shell; engine drops in whole; TS-neutral until handoff; the merge-readiness note is the deliverable) and `inbox/20261116-1845-inkling-prompt-council-cakepanz-assist.md` (the council assists; no building, audits only). Also `inbox/20261116-1800-inkling-prompt-zai-rev10-fix-sitting.md` (the Rev 10 doc-count fixes).
- **Framework question (Owner ruled: TypeScript-neutral until handoff):** no measured separation between the arms anywhere; the one separating point (first-try greens 2 vs 0) is author-adjacent and barred from evidence; carry on **not separable**, do not quote a winner. Plain TypeScript builds essentially as fast as Vue for the engine/shared-layer-shaped majority; Vue retains an edge only at interactive-board complexity + the tooling dividend.
- **Pending judgment (all Architect/Owner/KG/MUSE's):** integration of the §5 patches (B, D, E/C2, Rev-8 one-liners, FB→TE 6→2, ratchet=Scope proposal, hungarian-tie pin test, boxscore assertions, test-scope tsconfig), the pin correction owed in NOW.md, the w89 contrast ruling (14 AA cells), the Variant L/D ruling, the blind sealed-bench canonical-run ruling if two filed, the slice order for Cakepanz (season hub → … → review → guide → merge rehearsal — mine is a proposal, Owner may re-cut).

## What the next session needs

1. `git fetch -q origin; git log --oneline -3; git status --short` — then read `inbox/20261116-1845-inkling-prompt-zai-cakepanz-shell-finish.md` and `inbox/20261116-1815-inkling-review-zai-rev10.md` first.
2. The P0 queue (`node .council_tool.mjs next`, v9 from `origin/council/muse`): top lines are **REVIEW P-160** (Season review copy) etc. — next session may take one; `a review you can do beats new work in the same tier`.
3. Owner rulings if any: framework pick (timing; the blind bench is owed by others or ruled wont-file); palette Variant L/D; the Cakepanz slice order; the Guide/review order; the Architect's integration of proposals.
4. Never re-measure without a re-pin: pin `d3bd81d2`; gap 2773.0387 (measured provider @ 86f22d10); whole-lineup scale 854,226.66; 1,953 pool; live site = w89 (pale-rose light; no `--tc`).

## Where this worktree is

Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · HEAD `27b77635` (verify with `git rev-parse HEAD`) · merge-base with base `1b91f50e`.

## Transition discipline

Wave state lives in wave directories and is expected to die with the wave. Rewrite this file wholesale on seat-state change; never grow it.
