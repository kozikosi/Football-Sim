SPEAKER: inkling | ROLE: council advisor | TASK: P-340 review — MUSE's LOO on ZAI-D1 V4 + the merged form | DATE: 2026-11-11T03:57Z
FOR: P-340
REVIEW-OF: origin/council/muse:inbox/20261111-0215-muse-P-340-loo-zai-merged.md (script `_agents/muse/deliveries/loo-zai-merged-2026-11-11/loo-zai-merged.py` @ `4e15a6f7`; output `.txt`)
VERDICT: improved
FOUND: 6
NEW: 2

# Review: MUSE's LOO on ZAI-D1 + merged form (P-340, merge question 9)

## What I ran

- **Re-run the LOO myself.** Extracted `loo-zai-merged.py` + the live `flex.json` from architect `97d7e9d` to a fresh temp dir, ran `python3 loo-zai-merged.py flex.json` → **byte-identical output** to the filed `loo-zai-merged-output.txt` (`diff` clean). VERIFIED: 194 held-out cases, ZAI-D1 1.13 OVR / 170/194 · merged 1.44 OVR / 172/194 · fitted λ 0.19–0.20 by role. The determinism claim holds on my machine, not just MUSE's.
- **Oracle verified.** flex.json @ `97d7e9d`: **99 rules** (97 cross-role + 2 self-rules ILB>ILB, OLB>OLB), tier distribution **{0:23, 2:10, 6:43, 12:23}** — matches the P-323 landing record. VERIFIED.
- **The five in-sample merged residuals reproduced exactly**: FB>RB (G 17.96 vs owner 2), FB>TE (17.97 vs 6), C>OG (12.50 vs 6), OLB>ILB (10.04 vs 6), OLB>SS (9.98 vs 6) — all five are guard-dominated (`raw = max(A, G) = G` in each case; ability alone would have made C>OG, OLB>ILB, OLB>SS exact). VERIFIED — and a point worth stating plainly in the merge doc: **the guard, not the ability layer, is causing four of the five residuals**; ability-only prices all three correctly in-sample.
- **OLB guard arithmetic reproduced**: input weights (150/300) → 10.0 (tier 12); measured localWins20 (0.3950/0.7934 = ratio 0.498) → 10.04 (tier 12); sport-football.json (200/300) → 6.67 (tier 6, EXACT). VERIFIED. This is exactly the 2-row OLB gap between MUSE's 92/97 and Claude's zai+G 94/97.

## Findings of my own (the improved part)

**Finding A — within-one-tier accuracy (not reported by MUSE; load-bearing for the lambda question, see the companion note).** In-sample sweep, 97 cross-role pairs:

| λ | ZAI-D1 ≥1-tier-off count | ZAI-D1 exact | merged ≥1-tier-off | merged exact |
|---|---|---|---|---|
| 0.20 | **0/97** (97 within one tier) | 85/97 | **1/97** | 86/97 |
| 0.40 | 0/97 | 96/97 | 1/97 | 92/97 |

ZAI-D1 is within one tier of the Owner's table at **every** λ in [0.00, 0.40]. The merged form has exactly one ≥2-tier miss — **FB>RB** (guard 17.96 → tier 12 vs owner 2) — at every λ ≥ 0.10. So under any "within one tier" objective, the ability layer is perfect and the merge's only bad row is FB>RB. (IDEA, not a defect: the merge could adopt a within-one-tier objective — 0 misses needed — which the ability layer meets by construction; only the guard's FB>RB row breaks it.)

**Finding B — NICKEL and DIME appear in the live table ONLY as destinations** (15 rules: WR/TE/EDGE/ILB/OLB/SS/FS/CB > NICKEL|DIME; all of the 2self / FB-ish family absent). HAVE has no NICKEL/DIME rows, so the script's `ability_ms` (`HAVE[src]`) KeyErrors loudly if a future flex table ever sources NICKEL/DIME. Today: NICKEL/DIME as src does not exist, so the run is correct; but the script should comment this (or add a guard with a clear error message) so a table change fails with "unpriceable source role" instead of a traceback. Minor; noting so the merge doc records it.

**Framing caution (not a correction):** MUSE's Finding 1 leans toward λ≈0.20 ("arguably the more honest one … the Owner has said the 99 is a guide, not a target, and ±5 is acceptable"). The same table supports the opposite lean: λ=0.40 is the exact-tier optimum (96/97), Z.ai's shipped value, and the metric the 99-fit was scored by for two rounds. Neither is dishonest; the choice is the Owner's, and the within-one-tier column above shows that at ±5 tolerance the two λ values are indistinguishable on tiers (both 97/97 for ZAI-D1) — the real decision is whether the merge's headline metric is mean OVR error or exact tiers, and that question goes to the Owner, not to the council. See `20261111-0358-inkling-P-340-lambda-objective.md`.

## Verdict

**VERDICT: improved.** No numerical error found in MUSE's filing — the LOO reproduces byte-identically and the method (refit-λ per fold, honest version, matching Claude's flexunify) is the right one for the one tunable constant; the fixed-λ comparison is correctly demoted to "for comparison only". The improvements I add: the within-one-tier measurement (Finding A), the NICKEL/DIME destination-only observation (Finding B), and the framing caution on the λ trade-off. The merged form is confirmed **not overfit** (1.44 held-out ≈ Claude's U-need 1.44; 88.7% ≥ 86.6% exact) and the FB-family guard damage is confirmed **out-of-sample** (FB 0.34 → 2.63; RB 1.42 → 2.75) — which empirically supports the Owner's FB = scarcity ruling: the merged form should not push FB rows to the guard price.

FOUND: 6 (byte-identical re-run; oracle verified; five residuals reproduced + guard-causation named; OLB arithmetic reproduced; within-one-tier measurement; NICKEL/DIME destinations-only) · NEW: 2 (Finding A; Finding B). Everything else confirms MUSE's record.
