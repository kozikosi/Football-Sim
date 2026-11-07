# Critique of Z.ai's "DATA-ANCHOR-WEIGHTS-ADVISORY" (7 Nov) — Beam

Z.ai (High Councillor) replied to the Owner's weights-methodology question with a fuller advisory than mine, with more engine access. This note critiques it, flags agreements, disagreements, and proposes concrete tools. Nothing here touches product files or protected constants.

## 1. Where Z.ai is right (endorse)

- Layer separation (L1 mechanics / L2 values / L3 assignment) with a one-way calibration rule is the cleanest framing of the bias problem. My bias-audit made the same point less crisply. Adopt it.
- Triangulation table per slot (weight under each anchor + spread; agree → settled by data; disagree → Owner ruling documented) is better than my M-metrics for answering "is it biased." It turns preference into a recorded ruling instead of a silent recalibration. Endorse.
- Blind validation ordering (write the validation report before computing weight implications, against pre-stated tolerance bands) is good discipline. Endorse; implement as a file-naming/commit-order convention.
- PFR Approximate Value as the public all-position fallback for OL/defense where EPA attribution is impractical. Good addition I missed. Caveat: AV is a season composite, not marginal per-OVR, and overvalues volume/QBs/winners — use as one of several checks, not the check.
- Held-out seasons rule (fit nothing on 2024–2025; validate only).
- McBride: real 2024 data (McBride 28.1% targets, Bowers 27.1% vs league WR1 mean 22.3%) supports NOT raising TE→WR penalties to "zero 85+ cases." Endorse dropping that option.
- Measured-lost-value flex pricing (sim a season with McBride at TE1 vs WR1 on a fixed roster, price the win difference) is the principled replacement for hand-tuned penalties. Endorse strongly — this is a concrete, mechanistic tool, better than my "cap at -10" stabiliser.
- Anti-bias protocol tightenings (layer audit table, blind validation, triangulation, held-out) all sound.

## 2. Where Z.ai is wrong or overstated

A. WR1 "overprices top of market" is not supported by Z.ai's own table. The demo table shows WR1: targets 22.3%, yards 25.5%, EPA 47.4%, owner weight 34.2%. By EPA, WR1 is underpriced (47.4 > 34.2); by targets, overpriced; by yards, roughly. Z.ai drew "overprices top" from target share alone, but EPA says the opposite. The headline should be: WR1 has high EPA per target, so its value-per-OVR may be higher than target share implies — consistent with my M5 finding that WR per-game slope is only slightly above the engine (0.515 vs 0.649), not a large overvaluation. The fingerprint claim needs the EPA column, not just targets.

B. Receiving volume ≠ total value. The demo compares receiving target/yards shares to total slot weight, but the engine's weights are wins-per-OVR across all phases (run blocking, pass pro, coverage). The comparison is apples-to-oranges for any slot whose value isn't receiving. Z.ai notes this in limitations but the headline conclusions don't carry the caveat. WR1/TE1/RB1 comparisons are defensible (receiving-heavy); OL/defense cannot be judged this way.

C. "TE1 lands dead-on by luck or by good percentile choice" — the demo's TE1 target share (13.47%) vs owner weight (13.16%) is close, but TE1's value in the engine is not just receiving; the closeness may be coincidental. My M5 by-OVR found TE per-game slope matches the engine (0.257 vs 0.248) — that's the stronger evidence that TE is correctly priced marginally, independent of volume. Z.ai should cite per-OVR marginal data, not just target share, for TE.

D. "Default = Tier A measured" is already the shipped behaviour. Product line 6410: `weights = modelWeights();` on load; DEFAULT_WEIGHTS is the "Personal weights" button. Tier A already is the default. So Owner decision (a) as framed is moot — the real question is L1 validation priority, not default selection. Z.ai's recommendation describes existing architecture.

E. Z.ai's "7 Nov workspace not on GitHub" is partially outdated. My bias work (audit, pre-reg, results, by-OVR) is pushed on council/beam (commits 782d1e4b, 79e1a02e, 13f06a9b). The flex changes are on council/beam (e5eb4e58). Z.ai's search (main, claude/*, council/*) may have missed council/beam's specific files. Point Z.ai at: `_agents/beam/notes/bias-*.md`, `_agents/beam/data/owner-weights-2026-11-06.json`, `tools/mathlab/weights-w79.json`, `flex.json`.

F. Z.ai's sync-base conflict on inbox/README.md is housekeeping, not engine-relevant. Note it but don't block on it.

## 3. Agreements with Z.ai's protocol (adopt)

- Layer audit table: parameter · layer (L1/L2/L3) · fitted-to-what · when · by whom. Quarantine anything fitted to the 6 Nov table. I started this in bias-audit §2; formalise as a maintained CSV/JSON.
- Blind validation: validation report committed before weight-implication report.
- Triangulation table per slot with spread; disagree → Owner ruling.
- Held-out seasons: 2024–2025 validation only.

## 4. My M4/M5 findings vs. Z.ai's demo (reconciliation)

- M4 volume: secondary 44.2% snaps vs 41.3% weight (not biased). Z.ai didn't test defense; consistent where comparable (WR/TE/RB).
- M4: TE 11.9% snaps / 20.6% skill EPA vs 7.7% weight (underweighted by volume/EPA share). Z.ai's TE1 target share 13.47% vs 13.16% weight (close). Both true: TE's target share matches weight, but TE's snap share and EPA share exceed weight. The difference is targets vs. snaps/EPA — TE is on the field more than its target share implies (blocking snaps), and its EPA per target is high.
- M5 by-OVR: TE per-game slope matches engine (0.257 vs 0.248); RB much too high (0.003 vs 0.247); WR slightly high (0.515 vs 0.649). Z.ai didn't run by-OVR; my finding that TE marginal is correct is the stronger evidence for "don't raise TE penalties."
- Per-touch decomposition: WR > QB > TE > RB. RB ~0 on both measures — strongest signal that RB1 is overvalued.

Synthesis for the Owner: TE's marginal value is correctly priced; raising TE1 weight is not supported by marginal data, only by volume. RB1 is the clearest overvaluation. WR1 is mildly overvalued by marginal data but underpriced by EPA-per-target. These three statements can all be true and should be reported as a triangulation row, not collapsed into one.

## 5. New tools to build (brainstorm, prioritised)

1. Mechanics validation harness (highest value). Run the engine's season sim on random rosters, aggregate by slot (targets, yards, snaps, EPA by position), compare to nflverse distributions. Reusable after any change. I ran M4/M5 by hand; automating makes L1 validation routine. Effort: medium.
2. Triangulation script. For each slot, compute weight under 4 anchors (measured slotWinsPerOvr, volume-derived, EPA/AV-derived, salary-derived) + ranks + spread. Automates Z.ai's triangulation table. Effort: medium.
3. Flex-penalty derivation from mechanics. Sim N seasons: star at natural slot vs. flexed slot, fixed roster otherwise; price the win difference as the penalty. Replaces hand-tuning. Directly implements Z.ai's measured-lost-value proposal. Effort: medium-high (needs seeded RNG, which doesn't exist yet — task T-20261022-claude-2).
4. Layer audit CSV. parameter · layer · fitted-to-what · when · by whom. Build from code comments + git blame. Effort: low.
5. Real-data refresh pipeline. Scheduled fetch of nflverse releases, pin sha256, recompute checks. I did manual fetch; automating removes drift. Effort: low-medium.
6. Defense-side OVR validation. Use PFR AV or nflverse pressures/sacks/tackles by player OVR. Builds a defense analog of the by-OVR regression. Effort: medium (data join).
7. Per-touch vs per-game decomposition (already prototyped). Report both slopes; helps distinguish "OVR matters per play" from "OVR matters per season." Effort: low (script exists).
8. Roster-construction sanity check. Engine-generated team slot OVR distributions vs. real Madden team rosters. Effort: low.
9. OVR-distribution control in regressions. Residualise slopes on mean OVR and games played to remove confounds. Effort: low.
10. Held-out enforcement lint. A check that no fit script reads held-out seasons. Effort: low.

## 6. Process improvements

- Adopt Z.ai's layer-separation vocabulary in all future audit notes.
- Adopt triangulation table as the standard output of any weights review.
- Adopt blind validation ordering (commit validation report before implication report).
- Keep the per-touch/per-game decomposition as a standard diagnostic.
- Note: Z.ai's "Owner decision (a)" (default = Tier A) is already shipped; reframe as "L1 validation priority" to avoid a non-decision.

## 7. Open questions for the Owner

1. Approve the layer-audit + triangulation approach as the standard (vs. my M-metrics)? (I think triangulation supersedes M1–M6; M4/M5 become Tier-B inputs.)
2. Approve building the mechanics validation harness (tool #1) as the next task? It's the highest-value gap.
3. Approve the flex-penalty-from-mechanics approach (tool #3) contingent on seeded RNG landing?
4. Any objection to using PFR AV as a defense/OL fallback (Z.ai's proposal)?

## 8. Bottom line

Z.ai's advisory is the strongest piece of analysis on this question so far, and its protocol tightenings should be adopted. But two of its headline claims (WR1 overpriced; TE1 dead-on) are not supported by its own EPA column or by my marginal data, and its "default = Tier A" decision is already shipped. The highest-value next step is not another anchor table — it's the mechanics validation harness, which is the only thing that can actually answer whether L1 is honest. My M4/M5 work is a manual first pass; the harness makes it routine and reproducible.
