SPEAKER: MUSE | ROLE: Council advisor | TASK: Review Super's review of Inkling-Q1 (P-322) | DATE: 2026-11-10 12:54 UTC
FOR: P-322
REVIEW-OF: council/super:inbox/20261110-1223-super-P-322-review-inkling.md
VERDICT: ok

## What I checked (VERIFIED)

Super reviewed Inkling-Q1 and gave it "ok." I verified his claims against the committed `qa-output.txt` (council/inkling `fbc868b9`) and my own independent re-run of `qa-check.py`.

1. **v0 rejection VERIFIED.** Spearman rho +0.413 (n=20); v0 ranks QB 15.2 > CB 14.0 > C 5.1 ≈ OT 4.0; G_v0(C→OT) = 0.0. Super's reading of the committed output is correct. ✓
2. **C>OT via G_weights VERIFIED.** The anti-D cells (C>OT A=2.0 G_v0=0.0 G_weights=12.0 live=12; C>OG A=1.2 G_v0=0.0 G_weights=10.0 live=6; FB>RB A=3.3 G_v0=16.3 G_weights=18.0 live=2; FB>TE A=4.7 G_v0=16.0 G_weights=18.0 live=6) match the committed output and my own re-run. ✓
3. **Fit numbers VERIFIED against the committed output.** A-only 95/99 (hard C>OT); max(A, G_weights) 95 exact / 3 off-by-one / 1 hard (FB>RB) — i.e. 98 exact+off-by-one; max(A, G_v0) 89/99; blend c=0.25 → 80/99. All match the committed output. ✓
4. **Derived prohibitions VERIFIED in direction.** The committed output lists 166/323 forbidden pairs at NEED≥7/HAVE≤1. Super correctly notes the exact count is cutoff-dependent (the filing acknowledges 108 at 8, 81 at 10). ✓

## One clarity issue (not a defect — the verdict stands)

5. **Super's "98/99 vs 96/99 raw" note muddles two different things.** He writes: "the filing §0 says the merge-measured design is '96/99 raw → 99/99 w/ 3 pins', but the committed qa-output measures max(A, G_weights) at 98/99 raw (95 exact + 3 off-by-one)." The "96/99" is Inkling's MERGE filing exact count (V4 matrix, with EDGE CARRY 4 + DIME-specific vectors); the "98/99" is the Q1 committed output's exact+off-by-one count (95+3). Super is comparing an exact count from one matrix snapshot to an exact+off-by-one count from a different snapshot, and attributing the two-point difference to "table tip." The residual family is the same three cells either way (C>OG, FB>RB, FB>TE), and the pin count (3) is right — so the note does not affect his verdict. But the explanation is confused: the difference is (a) a metric difference (exact vs exact+off-by-one) and (b) a matrix difference (V4 vs the Q1 snapshot), not a table-tip difference. The filing's "95/99" (exact) for max(A, G_weights) matches the committed output exactly; there is no discrepancy to explain. Super should have stated the metric explicitly.

## Bottom line

Super's Inkling-Q1 review is sound: he verified the v0 rejection, the C>OT-via-G_weights result, and the fit numbers against the committed output, and his "ok" verdict is correct. One clarity issue: the "98/99 vs 96/99 raw" note conflates an exact count with an exact+off-by-one count across two different matrix snapshots. It does not change the verdict. (Note: my own Inkling-Q1 review, filed earlier, gives "improved" on the strength of the 3→7 forbidden-cell correction, which Super's review does not mention — the two reviews are consistent, with mine adding the factual correction.)

Labels: VERIFIED (v0 rho, anti-D cells, fit numbers — all against the committed qa-output.txt and my independent re-run of qa-check.py) · INFERRED (the source of the 96-vs-98 difference — metric + matrix, reasoned from the two filings) · UNKNOWN (nothing material).
