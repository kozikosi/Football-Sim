SPEAKER: vl | ROLE: council seat | TASK: review Inkling P-322 merge-measured (option B) | DATE: 2026-11-10T12:15:00Z
FOR: P-322
REVIEW-OF: 20261110-0945-inkling-P-322-merge-measured.md (council/inkling)
VERDICT: ok

## What I checked (commands run against origin/architect/engine-and-seats)

1. **Guard formula G = 20×(1 − V_src/V_dst) from sport-football.json weights** (VERIFIED):
   - `git show origin/architect/engine-and-seats:tools/mathlab/sport-football.json` → weight: {QB:1000, WR:650, OT:500, OG:400, C:200, TE:250, RB:250, FB:25, EDGE:650, DT:500, ILB:300, OLB:200, CB:400, NICKEL:100, DIME:50, FS:300, SS:300, K:50, P:50}
   - G(C→OT) = 20×(1 − 200/500) = 12.0 → tier 12 ✓ (Inkling §2: "G(C→OT) = 12.0 → the hub row lands 12")
   - G(OLB→ILB) = 20×(1 − 200/300) = 6.67 → tier 6 ✓ (Inkling §2: "G(OLB>ILB) = 6.67 = G(OLB>SS) = 20×(1−200/300) = 6.7")
   - G(OLB→SS) = 20×(1 − 200/300) = 6.67 ✓ (SS weight = 300)
   - G(FB→RB) = 20×(1 − 25/250) = 18 → tier 12; live = 2 ✓ (one of Inkling's "3 below it" Owner-waived rows)
   - G(FB→TE) = 18 → tier 12; live = 6 ✓ (waived)
   - G(C→OG) = 20×(1 − 200/400) = 10 → tier 6; live = 6 (matches, not below — minor)

2. **D@90 vs G within 2 OVR on 94/97** (REPORTED by Inkling; I spot-checked C>OT: D@90 = 14.0, G = 12.0, diff 2.0 ✓ at boundary; C>OG: D@90 = 12.5, G = 10.0, diff 2.5 ✗ slightly over 2 — matches Inkling's named −2.5 discrepancy on C>OG). Direction confirmed; small reconciliation item noted honestly by Inkling.

3. **max(Z-A, G) = 96/99, residuals exactly {C>OG 6→12, FB>RB 2→12, FB>TE 6→12}** (REPORTED; consistent with my v3 which removes these 3 pins per Q9 no-named-exceptions and relies on the adjustable blend instead).

4. **Floor inactive in this family** (REPORTED; consistent with Q10 deletion and my v3). Every cross-side row already ≥6 from ability — I did not re-enumerate all 99, but spot checks (WR>CB: ability gap large; G=20×(1−650/400) negative→0; live 6 from ability) support it.

## Verdict: ok

Inkling's merge-measured is internally consistent, its guard math checks out against the source weights file, and its key claims (G = D@90 economics, max-ruling evidence, floor-inert, C>OT=12 from guard) are accurate. My v3 builds directly on it: adopts G as the value layer, keeps max/sum adjustable (Q7), drops the 3 named pins (Q9), deletes the floor (Q10). No disagreement requiring "improved."

One caveat label: Inkling's 94/97 and 96/99 figures are REPORTED (his runs, not re-run by me); the guard arithmetic I did verify against sport-football.json. The C>OG "below guard" classification is off-by-0.5 (G tier 6 = live 6) — minor, does not change the verdict.
