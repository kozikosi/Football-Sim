SPEAKER: vloc | ROLE: council adviser | TASK: Owner final model weights — save, promote to council, test, report | DATE: 2026-11-06T15:44:26Z

FOR: P-013 (P1, Owner decision on protected constants — default weights recalibration). Also satisfies the table half of P-140 (weights rebalance / new position-value table, QB=1000 top spot). Related: P-173 (Position Rankings series follows the weights order), P-172 (Weights page buttons), Guide rerank-by-wins item.

Source: direct Owner (Kosi) message in this chat, 2026-11-06 — "this is what I want to save as my permanent opinion on the weights that the engine should be built around". Saved verbatim: `_agents/owner-notes/2026-11-06-weights-final-verbatim.txt` (AGENTS.md §4 rule 4: long Owner messages saved verbatim). This seat proposes, measures and reports — it never edits Football-Sim-*.html (only the Architect builds) and never touches PRIORITIES.md.

------------------------------------------------------------
PART 1 — THE VALUES (verbatim from the Owner; xM y z = salary Millions | position | weight)
------------------------------------------------------------

Salary data is INTERNAL REFERENCE ONLY per the Owner: never displayed in the app. The Owner's table (salary M | position | weight), QB = 40M at 1000, hand-adjusted ±25 by his own intuition:

QB 1000 · RB1 250 · RB2 100 · FB 25 · WR1 650 · WR2 400 · WR3 100 · WR4 50 · TE1 250 · TE2 150 · TE3 50 · OT1 500 · OG1 400 · C 150 · OG2 250 · OT2 300 · DE1 650 · DE2 300 · DT1 500 · DT2 300 · DL5 150 · MIKE 300 · WILL 150 · SAM 100 · CB1 400 · SS 300 · FS 300 · CB2 250 · NICKEL 100 · DIME 50 · K 50 · P 50

Product-slot mapping (Football-Sim-PreColors.html keys): NICKEL→CB3 ("CB3 / Nickel"), DIME→CB4 ("CB4 / Dime"). TE3 has NO product slot (line ~2040: "TE3 is not drafted: always a generic 70") — excluded from the literal, flagged below. LB4/SS2/FS2 are not in the Owner's list — kept at current 5/5/5 (depth spots).

------------------------------------------------------------
PART 2 — PATCH PROPOSAL (exact WHERE / old → new, per §5 patch form)
------------------------------------------------------------

WHERE: `Football-Sim-PreColors.html` line 452, the `DEFAULT_WEIGHTS` literal (protected constant; grep finds exactly one occurrence).

old -> new:

old:
const DEFAULT_WEIGHTS = {"QB": 320, "RB1": 100, "RB2": 40, "WR1": 60, "WR2": 40, "WR3": 20, "WR4": 5, "TE1": 80, "TE2": 20, "OT1": 295, "OT2": 295, "OG1": 295, "OG2": 295, "C": 295, "DE1": 350, "DE2": 350, "DT1": 320, "DT2": 300, "DL5": 5, "MIKE": 100, "WILL": 100, "SAM": 60, "LB4": 5, "CB1": 350, "CB2": 295, "CB3": 80, "CB4": 20, "SS": 80, "SS2": 5, "FS": 60, "FS2": 5, "K": 5, "P": 1, "FB": 1};

new:
const DEFAULT_WEIGHTS = {"QB": 1000, "RB1": 250, "RB2": 100, "WR1": 650, "WR2": 400, "WR3": 100, "WR4": 50, "TE1": 250, "TE2": 150, "OT1": 500, "OT2": 300, "OG1": 400, "OG2": 250, "C": 150, "DE1": 650, "DE2": 300, "DT1": 500, "DT2": 300, "DL5": 150, "MIKE": 300, "WILL": 150, "SAM": 100, "LB4": 5, "CB1": 400, "CB2": 250, "CB3": 100, "CB4": 50, "SS": 300, "SS2": 5, "FS": 300, "FS2": 5, "K": 50, "P": 50, "FB": 25};

WHY: Owner's final weight opinion (P-013/P-140). The weights on the right are to be the DEFAULT values shown on the Madden Rankings page (`let weights = {...DEFAULT_WEIGHTS}`, line 456) and the goal for the engine math (slotWinsPerOvr revealed impact should land around them, ±50 per the Owner).

SAFE ALONE?: YES as a data edit — it's one object literal, no control flow, cannot crash; `node tools/lint.mjs product Football-Sim-PreColors.html` stays clean and `node --check` on the extracted script passes. BUT it is only half of P-013/P-140:
  - modelWeights() (line 459-463) OVERRIDES every measured slot with quantised slotWinsPerOvr impact (700 scale, nearest 5, floor 5, QB anchor) and ignores DEFAULT_WEIGHTS values there — so after this edit, DEFAULT_WEIGHTS (Owner's table) and modelWeights() output (engine math) will still disagree on most slots. Bringing them within the Owner's ±50 requires engine-math tuning (slotWins/matchupModel MC knobs), which is the Architect's P-140 build decision under the protected contract, not a unilateral seat edit.
  - Slots not measured by slotWinsPerOvr (FB, WR4, DL5, CB4, P — not in ROSTER_SLOTS; plus LB4/SS2/FS2 not in the Owner's list) are clamped to ≤5 by modelWeights() (line ~461 `Math.min(out[k],5)`), so the Owner's K=50/P=50/DL5=150/CB4=50/WR4=50 can only be DEFAULT_WEIGHTS display defaults unless the engine measures them.
  - Protected-constant rule (AGENTS §3): any change re-pins the hash in MERGE-MANIFEST.md in the same commit; the Owner's approval here is the approval, the Architect's build integrates it.

HOW TO CHECK:
1. `sha256sum Football-Sim-PreColors.html` → must be 40233d6be00e987c… (Pre-Colors) before applying; the patch's old-string must match line 452 exactly (fails loudly otherwise).
2. Apply the literal edit; `node tools/lint.mjs product Football-Sim-PreColors.html` → no new findings; re-measure sha256 (will change — protected constant, re-pin in MERGE-MANIFEST.md).
3. Re-run the measurement below: every Owner target vs quantised engine impact within ±50 where the Owner allows deviation; flag the 18 slots outside (PART 4).

------------------------------------------------------------
PART 3 — TEST OF THESE COEFFICIENTS IN CLAUDE'S ENGINE (VERIFIED)
------------------------------------------------------------

METHOD: headless Chromium (Playwright) loads the real product page `Football-Sim-PreColors.html` (read-only, in-page evaluation, nothing written to the product), resets the engine caches, and measures:
  - slotWinsPerOvr(s) = (slotWins(s,90) − slotWins(s,70)) / 20 — revealed game impact, wins per +1 OVR near a starter (lines ~1346-1349).
  - modelWeights() quantisation of that impact to the 700 scale, nearest 5, floor 5, QB = mx anchor (the protected contract, AGENTS §3; line ~459).
  - Each slot vs the Owner's target (QB=1000 scale), tolerance ±50 (the Owner's room for deviation).
  - Salary/weight arithmetic: base rule salary_M = weight / 25 (QB 1000 ↔ 40M), tolerance ±1 M = ±25 weight (the Owner's stated ±25-point manipulation).
  - Monotonicity: slotWins(s,90) > slotWins(s,70) for all 26 measured slots (contract: impact only grows with OVR).
  - Guide "rerank players by importance by WINS": playerWar() ranking, which is weight-independent.

TARGET BUILD (re-measured this session):
sha256sum Football-Sim-PreColors.html = 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd (657,486 B) — matches AGENTS.md §2 Pre-Colors exactly. VERIFIED.
Command: `NODE_PATH=/Users/kosi/node_modules node _agents/vloc/deliveries/weights-measure.mjs Football-Sim-PreColors.html`
Exit 2 (expected: it signals 18 slots outside ±50 — a finding, not a crash); page errors 0.
Raw evidence: `_agents/vloc/deliveries/weights-measure-2026-11-06.json` + re-runnable command above.

FULL TABLE (slot | salary M | Owner w | impact w/OVR | quantised x1000 | gap Owner−quant | within ±50 | current DEFAULT | modelWeights() now):

| slot | salary M | Owner w | impact w/OVR | quantised x1000 | gap (Owner − quant) | within ±50 | current DEFAULT | modelWeights() now |
|------|----------|---------|--------------|-----------------|---------------------|------------|-----------------|--------------------|
| QB   | 40 | 1000 | 0.1271 | 1000 | 0 | yes | 320 | 700 |
| RB1  | 10 | 250 | 0.0333 | 260 | −10 | yes | 100 | 185 |
| RB2  | 4 | 100 | 0.0110 | 85 | 15 | yes | 40 | 60 |
| FB   | 1 | 25 | n/a | n/a | n/a | n/a | 1 | 1 |
| WR1  | 25 | 650 | 0.0552 | 435 | +215 | NO | 60 | 305 |
| WR2  | 15 | 400 | 0.0300 | 235 | +165 | NO | 40 | 165 |
| WR3  | 4 | 100 | 0.0191 | 150 | −50 | yes (boundary) | 20 | 105 |
| WR4  | 2 | 50 | n/a | n/a | n/a | n/a | 5 | 5 |
| TE1  | 10 | 250 | 0.0400 | 315 | −65 | NO | 80 | 220 |
| TE2  | 5 | 150 | 0.0072 | 55 | +95 | NO | 20 | 40 |
| OT1  | 20 | 500 | 0.0518 | 410 | +90 | NO | 295 | 285 |
| OG1  | 15 | 400 | 0.0426 | 335 | +65 | NO | 295 | 235 |
| C    | 5 | 150 | 0.0426 | 335 | −185 | NO | 295 | 235 |
| OG2  | 10 | 250 | 0.0426 | 335 | −85 | NO | 295 | 235 |
| OT2  | 12 | 300 | 0.0518 | 410 | −110 | NO | 295 | 285 |
| DE1  | 25 | 650 | 0.0650 | 510 | +140 | NO | 350 | 360 |
| DE2  | 12 | 300 | 0.0550 | 435 | −135 | NO | 350 | 305 |
| DT1  | 20 | 500 | 0.0473 | 370 | +130 | NO | 320 | 260 |
| DT2  | 10 | 300 | 0.0380 | 300 | 0 | yes | 300 | 210 |
| DL5  | 5 | 150 | n/a | n/a | n/a | n/a | 5 | 5 |
| MIKE | 12 | 300 | 0.0432 | 340 | −40 | yes | 100 | 240 |
| WILL | 6 | 150 | 0.0401 | 315 | −165 | NO | 100 | 220 |
| SAM  | 3 | 100 | 0.0037 | 30 | +70 | NO | 60 | 20 |
| CB1  | 15 | 400 | 0.0721 | 570 | −170 | NO | 350 | 395 |
| SS   | 12 | 300 | 0.0442 | 350 | −50 | yes (boundary) | 80 | 245 |
| FS   | 12 | 300 | 0.0427 | 335 | −35 | yes | 60 | 235 |
| CB2  | 10 | 250 | 0.0589 | 465 | −215 | NO | 295 | 325 |
| CB3  | 4 | 100 | 0.0470 | 370 | −270 | NO | 80 | 260 |
| CB4  | 2 | 50 | n/a | n/a | n/a | n/a | 20 | 5 |
| K    | 2 | 50 | 0.0361 | 285 | −235 | NO | 5 | 200 |
| P    | 2 | 50 | n/a | n/a | n/a | n/a | 1 | 1 |

SUMMARY: 26 slots measured (slotWinsPerOvr covers ROSTER_SLOTS; FB/WR4/DL5/CB4/P are not measured slots). Within ±50: 8 (QB, RB1, RB2, WR3 boundary, DT2, MIKE, SS boundary, FS). Outside ±50: 18. Largest misses: CB3 −270, C −185, K −235, CB2 −215, WILL −165, WR1 +215, WR2 +165, CB1 −170, DE1 +140, DT1 +130, DE2 −135, OT2 −110, TE2 +95, OT1 +90, SAM +70, TE1 −65, OG1 +65, OG2 −85.

SALARY/WEIGHT ARITHMETIC (weight / 25 = implied salary M; tolerance ±1 M = ±25 weight; 31 Owner rows mapped to product slots): 21 rows EXACT (QB 40, RB1 10, RB2 4, FB 1, WR3 4, WR4 2, TE1 10, OT1 20, OG2 10, OT2 12, DE2 12, DT1 20, MIKE 12, WILL 6, SS 12, FS 12, CB2 10, CB3 4, CB4 2, K 2, P 2); off by exactly +1 M (+25 weight, the Owner's stated manipulation): WR1, WR2, TE2, OG1, C, DE1, DL5, SAM, CB1 (9 rows); ONE minor violation outside tolerance: DT2 (implied 12 M vs salary 10 M, deviation +2 M = +50 weight — the Owner rounded DT2's 10M roughly). VERIFIED from the harness output (`weights-measure-2026-11-06.json`, `arith`).

SUMS: Owner table sums to 8525 on its QB=1000 scale; current engine quant700 sums to 6330 on the QB=700 scale; different anchor scales, so sums are not directly comparable — not a check that passes or fails.

MONOTONICITY: all 26 measured slots have positive impact slope (min 0.0741, SAM) — the contract's "no rank inversions beyond rounding ties" holds for the current engine math at the 70→90 slope. VERIFIED.

GUIDE RERANK-BY-WINS: playerWar() already produces a weight-independent wins ranking of every player (top: Josh Allen 3.69, Matthew Stafford 3.69, Joe Burrow 3.44, Lamar Jackson 3.23, Patrick Mahomes 2.99, …, Myles Garrett 1.73 as best non-QB). The Guide page reordering is a page-ordering change (P-173/P-143 territory), not a weight change; the weights do not affect it. VERIFIED mechanism.

CROSS-CHECK vs vloc's earlier sweep (this seat's P-282, inbox/20261106-102807): same build, same engine — WR1 impact 0.0552 vs his 0.05517, CB1 0.0721 vs 0.07215, QB 0.1271 vs 0.12707. Identical within rounding. REPORTED (his receipt) + VERIFIED (this re-run).

------------------------------------------------------------
PART 4 — IMPLICATIONS
------------------------------------------------------------

1. Salary-driven vs wins-driven: the Owner's table is built from his salary analysis (weight ≈ salary_M × 25, QB 40M at 1000); the engine's revealed impact is wins-driven (slotWins/matchupModel MC math). They agree within ±50 on only 8 of 26 measured slots. The Owner explicitly chose these by intuition and allowed ±50 deviation — the gaps are his specification, not engine bugs. This seat reports them; it does not argue them away.

2. Two knobs, separate answers: (a) DEFAULT_WEIGHTS = Owner's table (this proposal; protected constant; Owner approves — given here; Architect builds; MERGE-MANIFEST.md re-pin) — this is what shows on the Madden Rankings page as the default. (b) Engine-math tuning so slotWinsPerOvr quantisation lands within ±50 of the targets (Architect, P-140, protected contract; seeded before/after comparisons once the injectable RNG lands, T-20261022-claude-2 — unseeded before/after outcomes do not count as evidence, AGENTS §3).

3. P-013's earlier "agreed ratios" (K .45, WR2 .63, RB1 .58, CB2 .95, DE1 1.38 vs QB=1000) are SUPERSEDED by this table (WR2 = 400/1000 = 0.40, K = 0.05, etc.). The Owner's 2026-11-06 message is his permanent opinion and replaces those analysis ratios. Flag for the Architect: reconcile P-013's text with this table.

4. modelWeights() contract: after this edit, DEFAULT_WEIGHTS ≠ modelWeights() for measured slots by design (modelWeights quantises impact; DEFAULT_WEIGHTS is the static default display). That is consistent with AGENTS §3 as long as modelWeights remains the monotone quantisation of slotWinsPerOvr — unchanged by this edit. VERIFIED: modelWeights() still returns quantised impact (QB 700 on the 700 scale now).

5. `TE3 = 50` (Owner) has no product slot; if the Architect later adds TE3/WR4 as fixed-share spots (mathlab recv-plan experiment exists), they should take 50/50 here.

------------------------------------------------------------
REVIEW REQUEST
------------------------------------------------------------

This is council work product on P-013/P-140. Two reviews by two different seats (not this one) = REVIEWED; then it goes to the Architect's digest. Checks any reviewer can run: the three HOW TO CHECK commands above, plus verifying the old string matches line 452 byte-for-byte (the patch must fail loudly otherwise). Reviews may not be done by this seat; reviews belong in `inbox/<UTC>-<seat>-P-013-review.md`.

EVIDENCE LABELS: VERIFIED (sha256, measurement re-run, arithmetic, monotonicity, cross-check) · REPORTED (vloc P-282 earlier sweep, same build).

End of part.
