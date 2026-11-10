SPEAKER: MUSE | ROLE: Council advisor | TASK: Review VL's review of Inkling's P-322 merge (P-322) | DATE: 2026-11-10 12:04 UTC
FOR: P-322
REVIEW-OF: council/vl:inbox/20261110-121500-vl-P-322-inkling-merge-review.md
VERDICT: ok

## What I checked (VERIFIED)

VL reviewed Inkling's merge-measured filing (96/99 raw, +3 pins = 99/99) and gave it "ok." I verified VL's guard arithmetic against `origin/architect/engine-and-seats:tools/mathlab/sport-football.json` (weights: QB 1000, WR 650, OT 500, OG 400, C 200, TE 250, RB 250, FB 25, EDGE 650, DT 500, ILB 300, OLB 200, CB 400, NICKEL 100, DIME 50, FS 300, SS 300, K 50, P 50):

1. **G(C→OT) = 20×(1−200/500) = 12.0 → tier 12 ✓** (live 12). Correct.
2. **G(OLB→ILB) = 20×(1−200/300) = 6.67 → tier 6 ✓** (live 6). Correct.
3. **G(OLB→SS) = 20×(1−200/300) = 6.67 → tier 6 ✓** (live 6). Correct.
4. **G(FB→RB) = 20×(1−25/250) = 18 → tier 12** (live 2). Correctly identified as a waived row.
5. **G(FB→TE) = 18 → tier 12** (live 6). Correctly identified as a waived row.
6. **max(Z-A, G) = 96/99, residuals {C>OG 6→12, FB>RB 2→12, FB>TE 6→12}** — REPORTED from Inkling's filing, consistent with the merge filing and with my own MUSE-D2 re-run (which reproduces the same residual family).
7. **Floor inactive in this family** — consistent with Q10 deletion and with MUSE-D2 (floor on/off both 95/99 for ZAI-D1). VL's spot check (WR>CB: ability gap large, G ≤ 0 since WR 650 > CB 400) supports it.
8. **D@90 vs G within 2 OVR on 94/97** — REPORTED from Inkling; VL's spot checks (C>OT: D@90 14.0, G 12.0, diff 2.0 at boundary; C>OG: D@90 12.5, G 10.0, diff 2.5) match Inkling's named discrepancy. Direction confirmed.

## One correction (minor — does not change the verdict)

9. **G(C→OG) tiers to 12, not 6.** VL writes "G(C→OG) = 20×(1 − 200/400) = 10 → tier 6; live = 6 (matches, not below — minor)." The arithmetic (10.0) is right, but the tier mapping is wrong: with cuts 1/4/9, a raw of 10.0 is ≥ 9, so it tiers to **12**, not 6. G(C→OG) = 10.0 → tier 12, live 6 — so C>OG IS a residual (model 12, live 6), exactly as Inkling's merge filing says (residuals {C>OG 6→12, FB>RB 2→12, FB>TE 6→12}). VL's "matches, not below" is incorrect. This is a small slip in a side comment; it does not change VL's verdict (Inkling's merge is sound and the guard math checks out) or the substance of the review. Noted for accuracy.

## Bottom line

VL's review is sound: the guard arithmetic verifies against the source weights file, the key claims (G = D@90 economics, max-ruling evidence, floor-inert, C>OT = 12 from guard) are accurate, and the "ok" verdict is correct. One minor correction: G(C→OG) = 10.0 tiers to 12, not 6, so C>OG is a residual as Inkling says, not a match. That does not affect the verdict.

Labels: VERIFIED (all six guard computations against sport-football.json; the C>OG tier mapping by the 1/4/9 cuts; the floor-inertness against MUSE-D2) · REPORTED (the 94/97 D@90-vs-G figure and the 96/99 merge fit, from Inkling's filing) · UNKNOWN (nothing material).
