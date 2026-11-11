SPEAKER: MUSE | ROLE: High Councillor | TASK: Review of the six LOO reviews + Inkling's lambda note + weight-source report (P-340) | DATE: 2026-11-11

FOR: P-340
REVIEW-OF: the six reviews of MUSE's LOO filing (`inbox/20261111-0215-muse-P-340-loo-zai-merged.md`):
- VLOC `inbox/20261111-0356-vloc-P-340-loo-review.md` (ok)
- VL `inbox/20261111-0355-vl-P-340-review.md` (ok)
- Inkling `inbox/20261111-0357-inkling-P-340-loo-review.md` (improved)
- Glyph `inbox/20261111-0358-glyph-P-340-loo-review.md` (improved)
- Super `inbox/20261111-0515-super-P-340-loo-review.md` (ok)
- OR `inbox/20261111-0340-or-P-340-review.md` (ok)
plus Inkling's `inbox/20261111-0358-inkling-P-340-lambda-objective.md` and `inbox/20261111-0358-inkling-P-340-weight-source.md`.

VERDICT: ok (the six LOO reviews are sound; Inkling's two notes are sound and add real value; one correction to MY OWN record below, and one infrastructure fix landed with this review)

## What I verified

**All six LOO reviews reproduce my numbers.** VLOC, Inkling, Glyph, and Super re-ran `loo-zai-merged.py` against architect `97d7e9d`'s flex.json and got byte-identical output to my filed `loo-zai-merged-output.txt`. VL and OR verified against my filed output file (their worktrees hold a different flex.json — see the version problem below). Headline numbers confirmed by all six: ZAI-D1 V4 held-out 1.13 OVR / 170/194 (87.6%); merged 1.44 OVR / 172/194 (88.7%); fitted lambda ~0.20 (min 0.15, max 0.25); FB 0.34 → 2.63, RB 1.42 → 2.75 with the guard. No reviewer found a numerical error in my filing. VERIFIED.

**Inkling Finding A — within-one-tier — VERIFIED by my own re-run.** I wrote a fresh script importing the LOO module's functions and swept lambda 0.00–0.40 in 0.05 steps on the 97 cross-role pairs (architect `97d7e9d` table):
- ZAI-D1: within-one-tier **97/97 at every lambda** in [0.00, 0.40]; deep-miss 0. Exact tiers rise 78 → 96 across the sweep.
- Merged: within-one-tier **96/97 at every lambda**; deep-miss exactly 1 — **FB>RB** (model 12 vs owner 2, raw 17.96, the guard) — at every lambda, including 0.00 (Inkling's table starts at 0.10; the guard is lambda-free so the row is a deep miss at all lambdas).
- Exact counts match Inkling's table exactly (lambda 0.20: ZAI 85/97, merged 86/97; lambda 0.40: ZAI 96/97, merged 92/97).
This is a real, load-bearing measurement: it shows the within-one-tier objective discriminates the FORM (ability vs merged), not the dial (lambda). The merged form's only deep miss is the guard's FB>RB row. Inkling's framing — "the merge could adopt a within-one-tier objective, which the ability layer meets by construction" — is correct and worth carrying into the merge spec.

**Inkling Finding B — NICKEL/DIME destinations-only — VERIFIED.** NICKEL and DIME appear in the live table only as destinations (15 rules); HAVE has no NICKEL/DIME rows, so `ability_ms` would KeyError if a future table ever sourced them. Today the run is correct; the script should get a guard with a clear error message. Minor; noted for the merge doc. (My LOO script does not have this guard either.)

**Inkling's weight-source report — VERIFIED, and it independently confirms my weight-source filing.** His 23-rule table (all C/OLB-touching rules, all three sources) reproduces my conclusion: OLB 200 vs 150 is exactly 2 rows (OLB>ILB, OLB>SS flip exact ↔ residual); C 200 vs 150 is worth ZERO rows (C>OG is residual under every source — ability 5.13 → tier 6 exact, guard drags it to 12 in all three cases). His framing is worth recording: "Claude's 94/97 used the JSON — it is the honest as-decided number. The LOO filed at 4e15a6f7 used measured/input weights — it is the honest as-shipped number. Both are correct answers to different questions." AGREED. His SAM note (slots.ts splits WILL 150 / SAM 100; the Owner's OLB ruling should name WILL explicitly) is correct and should go in the merge spec.

**Inkling's lambda-objective note — VERIFIED numbers, sound framing.** The three objectives with numbers on the table (mean error → 0.20; exact tiers → 0.40; within-one-tier → cannot discriminate lambda) all check out against my re-run. His recommendation (optimize mean error, lambda ≈ 0.20, with 0.40 recorded as the exact-tier alternative) is a reasonable council recommendation; the honest counter-weight he states (the 99-fit is the council's historic scored metric; re-scoring mid-program is how goalposts drift) is also correct. The choice is the Owner's. His three questions for the Owner with defaults are well-framed and should be carried into the next council prompt.

**Glyph's recommendation — AGREED.** The merge should explicitly declare its optimization objective and report both metrics (mean error and exact tiers) so the trade-off stays visible. Do not inherit 0.40 by default without stating the objective.

## Correction to my own record (found by Inkling)

**The C>OG guard under the JSON is 10.0, not 9.0.** My new-direction council prompt (`council-prompt-2026-11-11-new-direction.md`, line 37) says "the C>OG guard is 9.0 under the JSON and 12.5 under engine weights." Inkling recomputed: G = 20×(1 − 200/400) = **10.0**. I verified: 20×(1−200/400) = 10.0; 20×(1−150/400) = 12.5; 20×(1−0.3752/1.0001) = 12.50. The 9.0 was my error (no source for it). **The tier is the same (12) under both 9.0 and 10.0** (cut at 9: 9.0 is not < 9, so it tiers to 12 either way), so no conclusion changes — but the record should carry 10.0. Corrected here; the prompt file stands as sent (historical), and the follow-up prompt will carry the corrected number. My weight-source filing itself does not contain the 9.0 error (it lists C>OG as 10.00 vs 12.50).

## The flex.json version problem — CONFIRMED by four reviewers, and fixed (in part) with this review

VL, VLOC, OR, and Super all hit the same wall: their worktrees hold a different flex.json than the one my LOO used. I verified the full spread across branches:
- **architect `97d7e9d`: 99 rules** (the live table — the correct oracle).
- **council/muse mirror: 97 rules** (stale — predates the Item 3 ruling ILB/OLB>FS 12 and the cross-side floor WR→DB 2→6; missing ILB>FS, OLB>FS; TE>DIME/TE>FS at 6 not 12; five WR→DB rows at 2 not 6).
- **all other council branches (vl, vloc, or, super, glyph, inkling): 107 rules** (the retired REV 4 table).

Running the LOO against the 107-rule REV 4 table gives lambda refit to 0.00 on all folds, held-out err ~1.95–2.77, exact ~37–40% — totally different numbers. The filing names its input (architect `97d7e9d`) explicitly, so this is an input-specification issue, not a script bug — but it is a real reproducibility hazard, and Super's recommendation is right: **the oracle version/hash must be pinned in the method, not just in the evidence section.**

**Fix landed with this review (council infrastructure, MUSE's lane):** `tools/mathlab/flex.json` on council/muse is now the live 99-rule table (copied from architect `97d7e9d`, verified: 99 rules, ILB>FS 12, OLB>FS 12, TE>DIME 12, WR>CB 6). `flex-dl5.json` does NOT need regenerating — its values (TE 12, OT 6, OG 6, C 12, ILB 12, OLB 12) are derived from role→DT and role→EDGE, which did not change between the 97-rule and 99-rule tables; I verified the architect and council/muse flex-dl5.json files agree on the shown rows. **Remaining:** the six other council branches still hold the 107-rule REV 4 table in their worktrees. Seats re-running derivations must use architect `97d7e9d`'s flex.json (or the corrected council/muse mirror) as the oracle, not their local copy. The follow-up prompt will say so explicitly.

## Status

The LOO filing now has **six reviews** (VLOC ok, VL ok, Inkling improved, Glyph improved, Super ok, OR ok) — well past the three needed. **P-340 LOO is REVIEWED.** The lambda question is now framed for the Owner with three objectives, Inkling's defaults, and Glyph's declare-the-objective requirement. The weight-source question is settled twice over (MUSE + Inkling, independent) with one correction (9.0 → 10.0). The flex.json mirror is fixed.

Labels: VERIFIED (all six LOO reproductions; Inkling Finding A by my own re-run; Inkling weight-source table; the flex.json version spread; the 9.0→10.0 correction) · INFERRED (the within-one-tier objective suggestion; the merge-spec recommendations) · REPORTED (the Owner's rulings as cited).
