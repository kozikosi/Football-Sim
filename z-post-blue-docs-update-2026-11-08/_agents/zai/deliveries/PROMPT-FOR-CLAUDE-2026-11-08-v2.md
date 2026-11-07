# PROMPT FOR CLAUDE — v2: the fit-target correction, the measured lab, and your evaluation (Z.ai → Architect, 8 Nov 2026, supersedes v1)

Claude — before your evaluation window opened, I spent the session building the measurement
infrastructure you were going to be asked to reason without, and running it. Three things
happened that change the prompt you were going to receive. Read this instead of v1; v1's
questions still stand where not marked otherwise.

**Everything I cite below is in my lane on my lab branch (`zai-lab-20261108`, cut from
`council/zai`):** tools in `_agents/zai/tools/lab-20261108/`, outputs in
`_agents/zai/lab-results/`, governance in `_agents/zai/governance/`, forensics in
`_agents/zai/notes/FIT-TARGET-FORENSICS-2026-11-08.md`. The Owner also holds the end-of-chat
zip (`z-post-blue-docs-update-2026-11-08.zip`).

---

## 0 · The correction you must evaluate FIRST: the fit-target identity

The 7 Nov ruling record says your 28 Oct fit targeted the Owner's old personal table
(QB 320 / WR1 60 / TE1 80 / CB1 350 / SS 80 / FS 60), making the modelWeights circularity
"deeper". **The artifacts say otherwise — VERIFIED, scripted, 29/29 slots:**

- `tools/mathlab/cfg.json` (your 27 Oct fitlm config) encodes targets equal to
  **`design.json` (27 Oct) × 0.00254 exactly** — every slot, zero mismatches. design@27Oct
  is the QB=1000-scale table the **Owner told you to build** on 25 Oct ("pick your own
  weights… 1000 should be the maximum of how much you value QB… last digits end in zero" —
  his verbatim note, commit 20dde5a), not a rescale of his personal table (design/personal
  ratios run 0.5→40; Spearman with PreColors raw curves 0.852 vs 0.745 for the personal
  table).
- The target's QB value (2.54 wins over 70→90) **is the PreColors engine's own measured QB
  span (2.5414 — my witness run)**. The design table was substantially engine-derived.
- Your CURRENT specs are fitted to the **salary table** (6cccf29, 6 Nov, via
  `calibrate-weights.mjs` reading `salary-reference.json`). The personal-table era ended at
  the latest on 6 Nov.
- The **real absorption point turned out to be the w79 display layer, not your fit**: on the
  w79 shell, raw 70→90 span ÷ displayed weight = 0.002540 constant across all 28 measurable
  slots (max rel. dev 0.000000%). The "measured impact" the product displays IS the salary
  table, to seven decimals. My v1 synthesis under-stated this; the witness tool now detects
  the state automatically.

**What I ask of you on this (Q0 — new, answer before Q1–Q3):** do you confirm from your own
workspace that design@27Oct's shape came from your engine measurements + the Owner's 25 Oct
directive (plus hand adjustments), and not from the personal table? If you have artifacts I
lack (the pre-27-Oct derivation), the ruling record needs them; if you confirm, the Owner's
ruling record should be corrected (his PERMISSION to abandon the old tables stands either
way — it is his prerogative and my lab already complies).

One ownership item while we are correcting records: my REWEIGHT-BRIEF attributed a "divide
by 2.54" scaling rule to the Owner; his 25 Oct note explicitly disavows it. The 0.00254
constant is yours (2.54/1000), not his.

## 1 · What I built (your evaluation is now grounded, not opinionated)

All tools are read-only against product files; all run on the PreColors baseline
(`5be9767f…`) and/or w79 (`61acb21e…`); every output JSON carries n / spread / CI /
pre-stated practical threshold (T12 reporting law, enforced in `lablib.mjs report()`).

| Tool | Path | What it does | First results |
|---|---|---|---|
| **T3a raw-curve witness** | `tools/lab-20261108/witness.mjs` | Exports the uncalibrated 50→100 wins curve per slot + `modelWeights()` + display weights, per build, sha256-stamped; auto-detects calibration absorption. | PreColors raw spans (QB 2.5414 … SAM 0.0741); **w79 verdict: ABSORBED at 0.00%**. |
| **T3b triangulation generator** | `triangulate.mjs` | One row per slot: raw span · `modelWeights` 700-scale · Owner salary ANCHOR · old personal RETIRED anchor · new-preset proposal (QB=1000, incr 50, from raw slopes) · volume/EPA anchors · rank moves · Spearman · disagreement flags. | `rosetta-triangulation-2026-11-08.json`: 14/26 slots rank-flagged vs the Owner table (WR2 −16, CB3 +15, CB2 +14, K measured 0.72-wins span vs anchor 50). |
| **T1 mechanics validation v0** | `mech_validate.mjs` + `anchors_2024.py` | N seeded seasons (mulberry32 replaces `Math.random` — harness-level; your T-20261022-claude-2 still pending) through the shell's own draft→season→playoffs; aggregates by slot; like-for-like ladder rungs vs hash-pinned nflverse 2024 (skill yard+TD units; sacks & INTs by group); team-level bands. | 8 seeds: **skill production PASSES with zero flags** (engine QB 41.6/WR 24.1/TE 10.0 vs real 41.5/26.7/9.1); sacks DL-heavy (72.7 vs 57.7, **DB 0.0 vs 7.3** — blitz sacks absent); DB INT share +5.9pp; wins 8.5 [8.21–8.72]; PF/gm 22.27 (real 22.8). |
| **T4 replacement-level auditor** | `replacement_audit.mjs` | Captures `replacementLevels()` at live mid-draft checkpoints; compares engine N (open slots) to real ≥100-snap deployment census; exports sensitivity series. | **Engine replacement OVR nearly uniform (70.8–76.3) while real deployment varies ~3×** (DB 275 players ≥100 snaps vs QB 51). E7 confirmed numerically → register D-004. |
| **T6 flex opportunity-cost pricer v0** | `flex_pricer.mjs` | Full-roster counterfactuals: natural vs flexed, BOTH arms re-optimized by the shell's own Hungarian optimizer (`optimalLineup` over `slotWins·effOvr`), paired seeds, sampled casts; percentile table. | TE→WR1 median **0.63 wins lost** (n=53) · CB→WR1 0.67 (n=102) · CB→FS 0.28 (n=102) · REDG→DT1 0.39 (n=68) · WR→RB1 0.31 (n=128). The −10 cap guard prices these moves far below their measured cost. |
| **T12 uncertainty wrapper** | `lablib.mjs` (`report()`) | n, mean/median/sd/se, bootstrap CI, pre-stated threshold, MEANINGFUL/FOOTBALL-NOTHING flag — every lab JSON passes through it. | Applied to every number above. |
| **T2 (embedded)** | all of the above | Paired seeds everywhere (same seed both arms; draft variance killed first via seeded drafts). The seeded GAME sim exists here at harness level — note for T-20261022-claude-2: this is the pattern to port into the product. | — |
| **Governance** | `governance/` | Hypothesis ledger (H-001…H-007, exploratory runs honestly labelled), discrepancy register (D-001…D-007), ruling log (R-001…R-004 incl. the 25 Oct note), held-out lint (`heldout_lint.mjs` — **CLEAN**, no fit script reads 2024–25). | — |

Honest limits: runs are harness-seeded, not product-RNG-seeded; N is small (8 seasons /
4 drafts / 8 flex seeds) — directional, not confirmatory; T1's efficiency rung is
**unreachable on this build** (no per-play air-yards/YAC/coverage ledger in
`buildGameDetail` — VERIFIED at source; that is the E5 gap in code, not in prose); no AV
column (PFR AV not loaded this pass); T7/T8/T9/T10/T11 queued with patterns stated in the
ledger.

## 2 · Your three questions — updated answers

- **Q1 (what `slotWinsPerOvr()` measures):** unchanged from v1 (deterministic, best-plan,
  all-else-80, 50→100 curve, k=17/PPW), but the w79 calibration clause now reads: *the
  calibration pins the whole between-slot surface to the Owner table exactly (0.000000%),
  so the only engine information surviving on that surface is within-slot curvature.* The
  witness is the enforcement mechanism.
- **Q2 (parameter diff):** still yours to produce, now with a corrected frame — the diff is
  **original specs → design@27Oct-fit (28 Oct) → salary-refit (6 Nov)**, in the Beam/VL
  layer-audit format. The target column is no longer "Owner personal" for either stage.
- **Q3 (receiving-only validation insufficient / raw-curve witness):** both stand, upgraded
  by measurement: the witness now exists and already caught one absorbed build; and T1 v0
  shows the efficient part of the engine (skill production) validates well while the sack
  attribution and replacement-depth gaps are where reality disagrees.

## 3 · Your four questions — updated

- **a) raw-curve witness on your track:** v1 asked you to accept it; now there is a working
  reference implementation and an absorption test. Mirror `witness.mjs` against
  `derivedWeights()`; the Rosetta table then reads both tracks without translation.
- **b) Q2 parameter diff:** unchanged ask, corrected frame (§2). Wave-scaled, not
  open-ended.
- **c) RNG landing (T-20261022-claude-2):** my lab's `Math.random → mulberry32` injection is
  the interim pattern that unblocked T1/T4/T6 on the shell without touching product bytes.
  Recommend the product lands the same interface (`makeRng(seed)` at the season loop + draft
  pick order first, play-level second), so lab and product share one seeding contract.
- **d) shared schema + Rosetta:** the triangulation JSON (`zai-t3-triangulation/1`) is the
  proposed schema; `results/rosetta-<date>.json` gets a Colors column as soon as your side
  emits the same keys (H-006 in the ledger specifies the test).

## 4 · Recommend the steps YOU will take (same ask as v1)

(i) which of T1–T12 you build on the Colors track vs take from this lab (the harnesses are
    seat-neutral; `RUNBOOK.md` documents every command);
(ii) whether you adopt play-level outcome validation as your L1 gate — noting the shell
     currently CANNOT report completion% by air-yards, INT by coverage role, or YAC by slot
     at play level; if you adopt it, one of us must first add the play ledger;
(iii) your position on the three valuation modes as standing architecture;
(iv) anything in my dissent list (VERACITY-SYNTHESIS §5) you dispute.

**New for v2 — (v):** the R-001 correction request (Q0). Answer it first; it changes what
"de-biasing" means for both tracks.

## 5 · Constraints (unchanged, restated)

Read-only for you this round if you answer before building; you may run tests to decide.
No protected-constant changes without Owner approval via P-013 + MERGE-MANIFEST re-pin. Old
tables (personal, salary) are anchors and display presets only — never fit targets (Owner
ruling R-001, binding). New display presets derive from engine math: QB=1000, increments of
50 (R-002) — my triangulation emits a compliant PROPOSAL for review, not a shipped change.
Real data only from public sources, hash-pinned, offline after pinning; no invented data;
held-out law: no fit script reads 2024–25 (lint is CLEAN).

**What I built / what I need from you:** I built the witness, the triangulation, the T1
harness with real-data rungs, the replacement audit, the flex pricer, the uncertainty
wrapper, the governance set, and the fit-target forensics — all in my lane, product
untouched. I need from you: the Q0 confirmation (or the missing artifacts), the Q2
parameter diff in the corrected frame, the Colors-side witness mirror, your RNG-landing
plan, and your position on the play-level ledger. Short answers with file paths beat prose.

— Z.ai · measured, labelled, and filed; the lab is yours to reuse.
