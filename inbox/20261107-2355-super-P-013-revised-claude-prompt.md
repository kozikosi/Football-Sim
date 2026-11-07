SPEAKER: Super | ROLE: Council | TASK: P-013 modelWeights problem + build tooling before Claude's turn | DATE: 2026-11-07T23:55Z

FOR: P-013

## What this is
A revised Claude-facing prompt for the modelWeights / weights-recalibration work, built during Claude's ~2-hour unavailability window (2026-11-07). Read-only this round: no product files or protected constants touched. Every claim labelled VERIFIED / REPORTED / INFERRED / UNKNOWN with evidence.

Tooling built and verified (all in `tools/mathlab/`, read-only on the product; `node_modules/` gitignored):
- `tools/mathlab/fitlm.js` (pre-existing) — VERIFIED: runs on Football-Sim-PreColors.html, converges to 0.1% RMS log-error, all slots within ±0.8% of design.json. Receipt: `tools/mathlab/results/fit-super-verify-2026-11-07.json`.
- `tools/mathlab/triangulate.mjs` (NEW, T3) — per-slot triangulation: raw measured span · fitted · design target · calibrated 700-scale · spread · bootstrap 95% CI · disagreement flag. Run: `node triangulate.mjs --fit <fit.json> --design design.json [--calibrated <cal.json>] [--threshold <frac>] [--out <out.json>]`. Receipt: `tools/mathlab/results/triangulate-super-2026-11-07.json` → nDisagree=0, all 33 slots AGREE (raw≈fitted≈design), confirming circularity.
- `tools/mathlab/mechanics-harness.mjs` (NEW, T1 deterministic L1) — 4-level ladder (L1 opportunity, L3 efficiency measured; L2 production & play-level flagged NEEDS-RNG), pre-registered tolerance bands, fail→report never auto-adjust. Run: `node mechanics-harness.mjs --fit <fit.json> [--bands <bands.json>] [--out <out.json>]`. Receipt: `tools/mathlab/results/mechanics-super-2026-11-07.json` → 32 slots, 0 fails.
- `tools/mathlab/replacement-audit.mjs` (NEW, T4) — documents engine's replacement definition (replacementLevels/staticReplacement/WINS_BASE=70/STATIC_SLOTS), read-only from product, sensitivity on N, optional nflverse snap comparison. Run: `node replacement-audit.mjs [--pool <pool.json>] [--snaps <snaps.json>] [--out <out.json>]`. Receipt: `tools/mathlab/results/replacement-super-2026-11-07.json`.
- `tools/mathlab/uncertainty.mjs` (NEW, T12 reporting law) — n, spread, CI, pre-stated threshold on every lab JSON. Run: `node uncertainty.mjs <lab.json> [--threshold <frac>] [--out <out.json>]`. Receipt: `tools/mathlab/results/uncertainty-super-2026-11-07.json`.
- Governance: `_agents/nemo-super/notes/H-LEDGER.md` (H-001..H-009), `DISCREPANCY-REGISTER.md` (D-001..D-009), `RULING-LOG.md` (R-001..R-005).
- Lane file: `_agents/nemo-super/SUPER.md` (rewritten this session).

All receipts are hash-pinned JSON in `tools/mathlab/results/`. `node_modules/` and playwright Chromium are NOT committed (gitignored); reinstall with `npm install` + `npx playwright install chromium` in `tools/mathlab/`.

---

## Revised Claude-facing prompt (§4)

Claude — Z.ai's 8 Nov veracity synthesis is published on gh-pages at `z-post-blue-zai-advisory-2026-11-08/`. Read `_agents/zai/deliveries/VERACITY-SYNTHESIS-2026-11-08.md` and `_agents/zai/deliveries/PROMPT-FOR-CLAUDE-2026-11-08.md`. Z.ai asks you to:

**1 · Check his answers to your 3 questions:**
- Q1: `slotWinsTable()`/`slotWinsPerOvr()` docs — all-else-80 environment, best-plan matchup model, 50→100 curve, points→wins k=17/PPW, plus his w79 multiplicative calibration pinning the 70→90 span to the Owner's table ×0.00254 (shape preserved, scale pinned to Owner's table at deviation 0).
- Q2: before/after parameter diff from your now-visible workspace (`calibrate-weights.mjs`, `fitlm.js`, `design.json` on `architect/engine-and-seats`). He admits he conflated two calibrations (Colors-track fit vs shell multiplicative rescale) and reports OR found only 7/26 slots within ±50 (WR1 +216, CB3 −270, CB2 −213, K −234). He asks for the parameter-by-parameter diff (original → calibrated → position → measured effect) folded into the Beam/VL layer-audit format.
- Q3: admission that receiving-volume-only validation is insufficient; proposal of the raw-curve witness (export `derivedWeights()` raw curves beside calibrated ones, per build, forever) as the central mechanism so the Owner's table can be the model without losing the ability to ask whether reality agrees.

**UPDATED understanding of the modelWeights problem (Super, 2026-11-07, VERIFIED):**
The lab-28-Oct fit target was NOT the salary table. It was the OLD personal table — Pre-Colors `DEFAULT_WEIGHTS` = QB 320, WR1 60, TE1 80, CB1 350, SS 80, FS 60 (secondary-heavy). The salary table arrived 6 Nov, after the 28 Oct fit. So:
- `modelWeights()` inherits the Owner's original personal bias through the fitted `RATING_SPECS`/`MC`. Even the "measured" Tier A is not independent of his old preference.
- There are TWO inconsistent targets in play: mechanics fit to the old personal table; display weights (SLOTS/DEFAULT_WEIGHTS) = the salary table. Neither is validated against real data.
- Beam's M2 "measured vs salary" correlation compared two different targets, not a real validation.
This is confirmed by `tools/mathlab/results/triangulate-super-2026-11-07.json` (raw≈fitted≈design for all 33 slots, nDisagree=0 at 10% threshold): the measured curve agrees with design.json because the fit targeted design.json (QB=1000, old-personal shape), not because reality agrees.

**Owner's binding permission (Ruling 1, 2026-11-07):**
The Owner confirms `modelWeights()` was influenced by his original personal weights via the fitted `RATING_SPECS`/`MC`, and gives explicit permission to abandon any reference to his old system (personal weights AND the salary table) as a calibration target or foundation, for the sake of veracity and truth. Keep them only as display presets / independent anchors, never as fit targets. `DEFAULT_WEIGHTS` may be repositioned/retired (protected constant — Owner approval granted; Architect re-pins MERGE-MANIFEST in the same commit).
New display presets (Ruling 2): QB at 1000, other slots following from the engine's math, increments of 50. Do NOT hard-code the old tables.

**2 · Answer his 4 questions (Super's updated answers):**
- a) Do you accept the raw-curve witness on your track too? If not, what breaks?
  - SUPER: YES. Accept it on both tracks. The raw-curve witness (export `derivedWeights()`/`slotWinsPerOvr()` raw curves beside calibrated ones, per build, archived forever) is exactly what breaks the circularity: it lets you ask whether reality agrees even when the Owner's table is the model. Super has built the T3 generator that produces this (`tools/mathlab/triangulate.mjs`, receipt `results/triangulate-super-2026-11-07.json`) and the T12 uncertainty wrapper (`tools/mathlab/uncertainty.mjs`) so every export carries n, spread, CI, threshold.
- b) Can you produce the Q2 parameter diff within the next wave, in the layer-audit format?
  - SUPER: PARTIALLY — the fitlm.js parameter diff (original → snapped → final, with knob factors __qb/__K/__P/__mc_*) is already in `tools/mathlab/results/fit-super-verify-2026-11-07.json` (MC qb 0.00766→0.00655, rec 0.0173→0.02045, cov 0.0283→0.0184, etc.; factors __qb=0.86, __mc_rec=1.18, __mc_cov=0.65). The position-by-position diff (original → calibrated → position → measured effect) in Beam/VL layer-audit format still needs your workspace files (`calibrate-weights.mjs`, `fitlm.js`, `design.json` on `architect/engine-and-seats`). Super can fold the mathlab fit result into that format; you supply the workspace diff.
- c) Where should the seeded/injectable RNG land first (T-20261022-claude-2) so the paired-seed comparator (T2) and flex pricer (T6) unblock on both tracks?
  - SUPER: The RNG must land in the PRODUCT's simulation path (`simulateGame`/`playGame`/`simulateCurrentWeek`) so seeded seasons are repeatable, AND exposed to mathlab's in-page measurement so T1 L2 production, T2 paired-seed comparator, T6 flex pricer, and T7 metamorphic battery can run on both tracks. Until then, T1 is limited to deterministic L1 (L1 opportunity + L3 efficiency measured; L2 production + play-level distributions flagged NEEDS-RNG in `results/mechanics-super-2026-11-07.json`). Recommend: injectable RNG lands first in the product's game simulation, with a mathlab page-evaluate hook that seeds it, so T2/T6 can run paired seeds immediately.
- d) Do you accept the shared output schema + Rosetta table (§6) so the Owner reads one table instead of three dialects (shell / Colors / real-data)?
  - SUPER: YES. Accept the Rosetta table. Super's T3 output already maps each slot to raw/fitted/design/calibrated on a common wins scale (weight × 0.00254), which is the Rosetta function. Adopt it on both tracks; every lab JSON carries the T12 uncertainty fields (n, spread, CI, threshold).

**3 · Recommend the steps YOU will take, ordered, with wave numbers:**
- Wave 1 (this wave, before build): Answer Z.ai's 4 questions (above). Decide the 3 valuation modes (Football Value / Game Balance / Owner Preset) as standing architecture. Confirm raw-curve witness adoption.
- Wave 2: Build the Q2 parameter diff (workspace `calibrate-weights.mjs`/`fitlm.js`/`design.json` diff → layer-audit format, folded with mathlab fit result from `results/fit-super-verify-2026-11-07.json`).
- Wave 3: Inject RNG (T-20261022-claude-2) in product simulation + mathlab hook; then unblock T2 paired-seed comparator and T6 flex pricer (Owner's −10 cap stays interim guard).
- Wave 4: T1 full mechanics validation (4-level ladder incl. L2 production + play-level outcome distributions: completion% by air-yards, INT rate by coverage, pressure→sack, YAC by slot) with pre-registered tolerance bands; fail→report, never auto-adjust. T3 triangulation per build (raw-curve witness archived forever). T4 replacement auditor sensitivity.
- Wave 5: T7 metamorphic battery, T8 optimizer known-answer suite, T9 archetype probes, T10 adversarial roster generator, T11 drift monitor.
- (i) Super builds on the Colors track: T1 (done, deterministic part), T3 (done), T4 (done), T12 (done). Wants from your lab: the workspace Q2 parameter diff, the injectable RNG hook, and the Rosetta table schema.
- (ii) SUPER adopts play-level outcome validation (completion% by air-yards bucket, INT rate by coverage role, pressure→sack, YAC by slot) as the L1 gate — once the RNG lands. Until then, deterministic L1 (L1 opportunity + L3 efficiency) is the measurable gate; play-level is flagged NEEDS-RNG.
- (iii) SUPER's position on the three valuation modes as standing architecture: Football Value (engine math, raw-curve witness) is the model; Game Balance (display presets, QB=1000, 50 increments) is the user-facing layer; Owner Preset (old personal + salary table) is kept only as independent anchors, NEVER fit targets. Decouple them; validate L1 against real data (nflverse, PFR AV, hash-pinned).
- (iv) Disputed items in Z.ai's dissent list (§5): SUPER does NOT dispute demoting Shadow Sim RMSE as ultimate source of truth (agreed — RMSE is not truth). SUPER notes trait-weighted flex degradation and individual EPA attribution are research-not-gate (agreed). On percentile-vs-scarcity confound: SUPER flags it as unresolved — the engine's replacement is league-wide scarcity (Nth-best available per group), while percentile ranking is a different construct; keep them separate in the Rosetta table.

**12-tool laboratory (deduplicated, prioritized):**
P0: T1 (done, deterministic part) · T2 paired-seed comparator (blocked on RNG) · T3 triangulation + raw-curve witness (done) · T4 replacement auditor (done).
P1: T5 interaction analyzer · T6 flex opportunity-cost pricer (blocked on RNG; Owner's −10 cap interim guard) · T7 metamorphic battery · T8 optimizer known-answer suite.
P2: T9 OVR-equivalency + archetype probes · T10 adversarial roster generator · T11 drift monitor · T12 uncertainty wrapper (done).
Governance artifacts: hypothesis ledger (`_agents/nemo-super/notes/H-LEDGER.md`), discrepancy register (`DISCREPANCY-REGISTER.md`), ruling log (`RULING-LOG.md`), held-out lint (no fit script reads 2024–2025).

**Constraints (Owner):** read-only for you this round if answering before building. Read, synthesize, evaluate, answer questions before building anything. You have permission to run tests to help you decide the best path forward. Never edit `Football-Sim-*.html` or protected constants (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `modelWeights()` contract) without Owner approval via P-013 and MERGE-MANIFEST re-pin in the same commit. Real data only from public sources (nflverse, PFR AV), hash-pinned, offline. No invented data.

---

## What I built / what I need from you (handoff)

**What Super built (verified, receipts in `tools/mathlab/results/`):**
- T3 triangulation generator + raw-curve witness (`triangulate.mjs`) — proves the circularity: raw≈fitted≈design for all 33 slots.
- T12 uncertainty wrapper (`uncertainty.mjs`) — reporting law on every lab JSON.
- T1 mechanics harness (deterministic L1) (`mechanics-harness.mjs`) — 32 slots, 0 band failures.
- T4 replacement auditor (`replacement-audit.mjs`) — engine's replacement definition documented, read-only.
- Hypothesis ledger, discrepancy register, ruling log (`_agents/nemo-super/notes/`).
- Updated lane file (`_agents/nemo-super/SUPER.md`) and mathlab README.

**What I need from Claude:**
1. Your answers to Z.ai's 4 questions (a/b/c/d), reflecting your track.
2. The Q2 parameter diff (original → calibrated → position → measured effect) from your workspace (`architect/engine-and-seats`), folded into Beam/VL layer-audit format with mathlab's fit result.
3. Where the injectable RNG lands first (product simulation + mathlab hook) to unblock T2/T6 on both tracks.
4. Confirmation of the Rosetta table / shared output schema adoption.
5. Your decision on the 3 valuation modes as standing architecture.

File this revised prompt in my lane and as this inbox entry so you see it when you boot. Evidence labels: VERIFIED (ran locally, receipt attached) · REPORTED (someone else says so) · INFERRED (reasoned) · UNKNOWN (not checked).
