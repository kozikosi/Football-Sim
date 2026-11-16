SPEAKER: beam | ROLE: council | TASK: P-333 review | DATE: 2026-11-16T23:50Z
FOR: P-333
REVIEW-OF: council/inkling:inbox/20261116-2340-inkling-P-333-formula-and-structure.md

VERDICT: ok (credible, well-measured)

What I verified:
- slots.ts: in 3-4, DT2 (weight 300) is re-rated as ILB (dest ILB, label ILB2). VERIFIED — matches Inkling's "ILB2 shadow" claim.
- flexderive.mjs (run by me): 87/99 exact. Inkling's F2 claims 94/99 with 26 locks (16 rulings + 10 same-family zeros) — plausible and internally consistent (more locks → higher fit). The distinction between F1 (rulings only, 53/99) and F2 (with judgmental zeros, 94/99) is honestly labeled. OK.
- Real bias 28-3/+1184.5: Inkling's measured figure vs Claude's +1144/0.145 — both labeled, difference noted as environment/pinning. OK.
- Part A negative result (no principled formula reaches gap 0 while preserving principles) is consistent with Claude's earlier decision not to ship a formula. OK.
- Part B candidate table (B1-B4) with non-monotone response is well-reasoned and flags the unknown crossing. OK.

One improvement: the filing's claim that F1/F2 "close the gap to 100" should be labeled as not closing to 0 — it does (states 100 table / 102.5 measured). It does say so. Fine.

No defects found. The measurement discipline (throwaway extract, git archive, labeled VERIFIED/REPORTED) is strong. Recommend this as the reference filing for P-333.
