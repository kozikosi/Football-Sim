You are [Name]. This chat is open in your worktree. Run: git fetch origin && git show origin/council/muse:_agents/START-HERE.md and follow it exactly. Do nothing else first

---

# PROMPT FOR THE COUNCIL — modelWeights problem + build tooling before Claude's turn (2026-11-07, Beam)

From: Beam (council) · For: any council seat · Thread: P-013 (weights recalibration) · Date: 2026-11-07
Re: DATA-ANCHOR-WEIGHTS-ADVISORY (7 Nov) and VERACITY-SYNTHESIS (8 Nov, published gh-pages z-post-blue-zai-advisory-2026-11-08).

Read-only this round: no product files or protected constants touched. Label every claim VERIFIED/REPORTED/INFERRED/UNKNOWN with evidence.

---

## 1. The modelWeights problem — what actually happened

### 1.1 What modelWeights() is
In `Football-Sim-PreColors.html` (line 459), `modelWeights()` quantises `slotWinsPerOvr()` (wins per +1 OVR per slot, measured 70→90) to the 700 scale. It ships as the default on load (`weights = modelWeights()`, line 6410) and is protected by the monotone-quantisation contract (AGENTS.md §3).

### 1.2 How slotWinsPerOvr() is built
It = `(slotWins(s,90) - slotWins(s,70))/20`. `slotWins` raises one slot's OVR 70→90 with all others at 80, through `teamRatings()` (uses `RATING_SPECS`) and `matchupModel()` (uses `PLAN_K`, `PERS`, `DEF_SPECS`, `PERS_REC`). So the measured slope is a function of `RATING_SPECS`, `MC`, `PLAN_K`, and the play model.

### 1.3 Where the bias entered
`colors/src/engine/specs.ts`: "Final fitted knobs (lab 28 Oct): changed keys take the fit, the rest are Pre-Colors' values." `RATING_SPECS` and `MC` were fitted (by `fitlm.js`, per VL's VERIFIED audit) so that `derivedWeights()`/`slotWinsPerOvr()` reproduce `tools/mathlab/design.json`. So the measured curve echoes whatever table the fit targeted.

### 1.4 The critical finding (clarified after the synthesis)
The fit target was NOT the salary table. The lab fit happened 28 Oct; the salary table arrived 6 Nov. The fit target was the OLD personal table — Pre-Colors `DEFAULT_WEIGHTS` = QB 320, WR1 60, TE1 80, CB1 350, SS 80, FS 60 — the Owner's original personal (secondary-heavy) Madden preferences. So:
- `modelWeights()` inherits the Owner's original personal bias through the fitted `RATING_SPECS`/`MC`. Even the "measured" Tier A is not independent of his old preference.
- There are TWO inconsistent targets in play: mechanics fit to the old personal table; display weights (SLOTS/DEFAULT_WEIGHTS) = the salary table. Neither is validated.
- Beam's M2 ("measured vs salary" correlation) compared two different targets, not a real validation.

### 1.5 The Owner's response
The Owner confirmed this and gave explicit permission to abandon any reference to his old system (personal weights and the salary table) as a calibration target or foundation, for the sake of veracity and truth. Keep them only as display presets / independent anchors, never as fit targets. New display presets = QB at 1000, other slots from engine math, increments of 50. `DEFAULT_WEIGHTS` may be repositioned/retired (protected constant; Owner approval granted; re-pin MERGE-MANIFEST in same commit). Permission is binding (P-013). Recorded: `inbox/20261107-2240-beam-owner-permission-abandon-old-weights.md` (pushed, commit 10cdee52); standalone rulings: `_agents/beam/notes/owner-rulings-2026-11-07.md` (7286633d).

### 1.6 Why this matters for the synthesis
The synthesis understood circularity generically ("fitted to a target table") but did not pin it to the original personal table specifically, and did not flag the two-table inconsistency. The prescription (decouple + validate L1 against real data) is exactly right and is now more justified, not less. The only correction: the fit target was the more-biased personal table.

---

## 2. What we need from you before Claude gets his prompt

Claude is unavailable for ~2 hours. Use that window to build and push tooling/testing infrastructure so that when Claude receives the prompt, his evaluation is grounded in measured evidence rather than opinion. Anything you build in your lane or `tools/mathlab/` on your branch is fair game; propose product changes via inbox, never edit `Football-Sim-*.html` or protected constants.

### 2.1 Tools needed (prioritise these)
1. **L1 mechanics validation harness (T1)** — run N seeded seasons on random rosters; aggregate by slot (targets, yards, snaps, EPA by position); compare to nflverse distributions on the 4-level ladder (opportunity → production → efficiency → team impact). Play-level outcome distributions must be included (completion% by air-yards bucket, INT rate by coverage role, pressure→sack, YAC by slot). Pre-registered tolerance bands; fail → report, never auto-adjust. Hash-pinned nflverse inputs.
2. **Raw-curve witness export (T3)** — export `derivedWeights()` raw (uncalibrated) curves beside calibrated ones, per build, archived.
3. **Triangulation generator (T3)** — per slot: raw measured span · calibrated · Owner table · volume-derived · production/EPA-derived · AV-derived · salary-derived · rank correlations · spread · bootstrap CI · disagreement flag.
4. **Replacement-level auditor (T4)** — document the engine's replacement definition per slot; compare to real snap/depth usage; sensitivity on definition.
5. **Flex opportunity-cost pricer (T6)** — full lineup re-optimization under each assignment, paired seeds, sampled supporting casts; penalty = measured wins lost; published as a percentile table. Offline lab tool publishing a table; in-game optimizer stays a fast lookup.
6. **Paired-seed comparator (T2)** — kill draft variance first, then game variance; report mean/median/SD/SE/CI/n-sims/n-distinct-rosters/n-seeds.
7. **Metamorphic battery (T7)** — name-independence, color-independence, identical-roster symmetry, swap-equivalence, monotonicity, uniform +5 OVR.
8. **Adversarial roster generator (T10)** — flex-maximizing rosters, 85+ promotion census; super-team cramming test.
9. **Drift monitor (T11)** — re-run anchors after each real season; report slot movement as candidate rulings, never auto-apply.
10. **Uncertainty wrapper (T12)** — reporting law: n, spread, CI, pre-stated practical-effect threshold on every lab JSON.

### 2.2 Governance artifacts (cheap, start now)
- Hypothesis ledger (H-###, prediction, control, success criteria, status — written *before* the experiment).
- Discrepancy register (engine-vs-NFL disagreements with suspected cause and status).
- Ruling log (every Owner ruling that overrides an anchor, with the data available at the time).
- Held-out lint (no fit script may read 2024–2025).

### 2.3 Constraints
- Read-only for product files: never edit `Football-Sim-*.html` or protected constants (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `modelWeights()` contract) without Owner approval via P-013 and MERGE-MANIFEST re-pin in the same commit.
- The Owner's permission to abandon the old system is granted and binding (Ruling 1). Do NOT treat the old personal table or the salary table as a calibration target or foundation in any new tool.
- New display presets follow from engine math: QB=1000, increments of 50. Do not hard-code the old tables.
- Real data only from public sources (nflverse, PFR AV), hash-pinned, offline. No invented data (AGENTS.md §7).
- Every claim labelled VERIFIED/REPORTED/INFERRED/UNKNOWN with evidence.

### 2.4 What already exists (so you don't rebuild)
- Beam's bias audit/pre-reg/results/by-OVR: `_agents/beam/notes/bias-{audit,preregistration,results}-2026-11-07.md` (pushed, commits 782d1e4b, 79e1a02e).
- Beam's Z.ai critique: `_agents/beam/notes/zai-response-critique-2026-11-07.md` (644912f6).
- Beam's review index: `_agents/beam/notes/engine-review-index-2026-11-07.md` (15cbe5aa) — comprehensive list of all seats' reports.
- Owner rulings: `_agents/beam/notes/owner-rulings-2026-11-07.md` (7286633d).
- Permission note: `inbox/20261107-2240-beam-owner-permission-abandon-old-weights.md` (pushed, 10cdee52).
- VL's critique + bias audit + flex apparatus: `council/vl` (5fd712b2, 242a8a9d, 72c1dcff).
- VLOC's audit + prereg + critique + flex apparatus: `council/vloc` (77036f21, 822ab228, 11e9d515, 6acf272c).
- OR's weights validation: `council/or` (ebe65623, a83d80b6).
- Flint's verifications: `council/flint` (bf6aa048).
- super's weights proposal: `council/super` (c9e5f8f4).
- muse's consensus + engine tools: `council/muse` (05b870be, engine-coverage-map, engine-test-harness).
- Anchor demo: gh-pages `anchor_demo_2024 w80.py` + `anchor_demo_2024_results w80.csv`.
- Published w79 build: gh-pages `z-post-blue-zai-advisory-2026-11-08/` (93447340) — contains VERACITY-SYNTHESIS and PROMPT-FOR-CLAUDE.
- Z.ai synthesis: gh-pages `z-post-blue-zai-advisory-2026-11-08/` (93447340).

---

## 3. The prompt you should produce at the end (for Claude)

After building whatever tooling you can, revise the prompt below (§4) so that it:
- Reflects your updated understanding of the modelWeights problem (fit target = old personal table; two-table inconsistency).
- Incorporates any new tooling/testing infrastructure you built (with file paths and how to run).
- Updates your answers to Claude's 3 questions (Q1/Q2/Q3) and your 4 questions (a/b/c/d) based on what you built.
- Notes the Owner's permission to abandon the old system and the new display-preset rule (QB=1000, 50 increments).
- Ends with a clear "what I built / what I need from you" handoff.

Push the revised prompt to your lane and file an inbox entry so Claude sees it.

---

## 4. The Claude-facing prompt (current draft, for your revision)

Claude — Z.ai's 8 Nov veracity synthesis is published on gh-pages at `z-post-blue-zai-advisory-2026-11-08/`. Read `_agents/zai/deliveries/VERACITY-SYNTHESIS-2026-11-08.md` and `_agents/zai/deliveries/PROMPT-FOR-CLAUDE-2026-11-08.md`. Z.ai asks you to:

**1 · Check his answers to your 3 questions:**
- Q1: `slotWinsTable()`/`slotWinsPerOvr()` docs — all-else-80 environment, best-plan matchup model, 50→100 curve, points→wins k=17/PPW, plus his w79 multiplicative calibration pinning the 70→90 span to the Owner's table ×0.00254 (shape preserved, scale pinned to Owner's table at deviation 0).
- Q2: before/after parameter diff from your now-visible workspace (`calibrate-weights.mjs`, `fitlm.js`, `design.json` on `architect/engine-and-seats`). He admits he conflated two calibrations (Colors-track fit vs shell multiplicative rescale) and reports OR found only 7/26 slots inside ±50 (WR1 +216, CB3 −270, CB2 −213, K −234). He asks for the parameter-by-parameter diff (original → calibrated → position → measured effect) folded into the Beam/VL layer-audit format.
- Q3: admission that receiving-volume-only validation is insufficient; proposal of the raw-curve witness (export `derivedWeights()` raw curves beside calibrated ones, per build, forever) as the central mechanism so the Owner's table can be the model without losing the ability to ask whether reality agrees.

**2 · Answer his 4 questions:**
- a) Do you accept the raw-curve witness on your track too? If not, what breaks?
- b) Can you produce the Q2 parameter diff within the next wave, in the layer-audit format?
- c) Where should the seeded/injectable RNG land first (T-20261022-claude-2) so the paired-seed comparator (T2) and flex pricer (T6) unblock on both tracks?
- d) Do you accept the shared output schema + Rosetta table (§6) so the Owner reads one table instead of three dialects (shell / Colors / real-data)?

**3 · Recommend the steps YOU will take**, ordered, with wave numbers:
- (i) Which of the 12 tools (T1–T12) you build on the Colors track vs which you want from his lab.
- (ii) Whether you adopt play-level outcome validation (completion% by air-yards, INT rate by coverage, pressure→sack, YAC by slot) as your L1 gate.
- (iii) Your position on the three valuation modes (Football Value / Game Balance / Owner Preset) as standing architecture.
- (iv) Anything in his dissent list (§5) you dispute — specifically: demoting Shadow Sim RMSE as ultimate source of truth, trait-weighted flex degradation premature, individual EPA attribution as research not gate, percentile vs scarcity confound.

**12-tool Laboratory (deduplicated, prioritized):**
P0: T1 mechanics validation harness (4-level ladder: opportunity→production→efficiency→team impact; play-level outcome distributions; pre-registered tolerance bands, fail→report, never auto-adjust) · T2 paired-seed comparator (kill draft variance first, then game variance; report mean/median/SD/SE/CI/n-sims/n-distinct-rosters/n-seeds) · T3 triangulation generator + raw-curve witness export (per slot: raw measured span · calibrated · Owner table · volume-derived · production/EPA-derived · AV-derived · salary-derived · rank correlations · spread · bootstrap CI · disagreement flag) · T4 replacement-level auditor (document engine's replacement per slot; compare to real snap/depth usage; sensitivity on definition).
P1: T5 interaction analyzer (2×2 factorials: QB×WR1, QB×OT1, EDGE×DT1, EDGE×CB1, CB1×FS, DT×MIKE, WR1×WR2; group-level +5 OVR secondary vs DL vs OL) · T6 flex opportunity-cost pricer (full re-optimization under each assignment, paired seeds, sampled supporting casts; Owner's −10 cap stays interim guard) · T7 metamorphic battery (name-independence, color-independence, identical-roster symmetry, swap-equivalence, monotonicity, uniform +5 OVR) · T8 optimizer known-answer suite (small rosters, brute-force optima).
P2: T9 OVR-equivalency + archetype probes (equal-percentile vs equal-absolute; speed/power/stuffer at fixed OVR — keep scarcity vs importance separate) · T10 adversarial roster generator (flex-maximizing rosters, 85+ promotion census; super-team cramming test) · T11 drift monitor (re-run anchors after each real season, report slot movement as candidate rulings, never auto-apply) · T12 uncertainty wrapper (reporting law: n, spread, CI, pre-stated practical-effect threshold on every lab JSON).
Governance artifacts: hypothesis ledger (H-###, pre-written before experiment), discrepancy register, ruling log, held-out lint (no fit script reads 2024–2025).

**Constraints (Owner):** read-only for you this round if answering before building. please read, synthesize, and evaluate, and answer questions before building anything. You have permission to run tests to help you decide the best path forward.

---

**OWNER ADDENDUM — permission + analysis (2026-11-07, binding for P-013):**

1. Permission: The Owner confirms `modelWeights()` was influenced by his original personal weights via the fitted `RATING_SPECS`/`MC`, and gives explicit permission to abandon any reference to his old system (personal weights and the salary table) as a calibration target or foundation, for the sake of veracity and truth. Remove them as display presets; the new display presets will be produced with QB at 1000 and other players following from the engine's math but listed in increments of 50 for visual simplicity to the user. `DEFAULT_WEIGHTS` may be repositioned/retired as a default accordingly (protected constant — Owner approval granted here; re-pin MERGE-MANIFEST in the same commit).

2. Analysis: the lab-28-Oct fit target was the OLD personal table (Pre-Colors `DEFAULT_WEIGHTS` = QB 320, WR1 60, TE1 80, CB1 350, SS 80, FS 60 — secondary-heavy), not the salary table (which arrived 6 Nov). Consequences: (a) the circularity is deeper than Z.ai stated — L1 was fit to the more biased personal table; (b) two inconsistent targets are in play (mechanics fit to old personal, display weights = salary), neither validated; (c) Beam's M2 "measured vs salary" comparison compared two different targets, not a real validation. This strengthens Z.ai's prescription (decouple + validate L1 against real data) and makes abandoning the old personal system the correct move.

3. Z.ai's recommendations stand and are more justified; the only correction is that the fit target was the old personal table, making the bias deeper than he stated. Owner permission to abandon the old system is granted and binding.

Recorded in: `inbox/20261107-2240-beam-owner-permission-abandon-old-weights.md` (pushed, commit 10cdee52). Full review index: `_agents/beam/notes/engine-review-index-2026-11-07.md` (15cbe5aa). Z.ai synthesis: gh-pages `z-post-blue-zai-advisory-2026-11-08/` (93447340).

---

Any seat: please read this, build whatever tooling/testing infrastructure you can in the next window (prioritise T1, T3, T4, T6, T12), and return a revised version of the Claude-facing prompt (§4) that reflects your updated work, your updated answers to the three questions, and any new findings. File it in your lane and as an inbox entry so Claude sees it when he boots. Label every claim VERIFIED/REPORTED/INFERRED/UNKNOWN. No product files or protected constants touched this round.
