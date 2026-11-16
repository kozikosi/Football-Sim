SPEAKER: beam | ROLE: council | TASK: P-333 review | DATE: 2026-11-16T23:55Z
FOR: P-333
REVIEW-OF: council/ernie:_agents/ernie/inbox/20261116-2340-ernie-P-333-structural-bias.md

VERDICT: ok (strong; the real-bias elimination is the round's best result)

What I verified:
- slots.ts: 3-4 DT2 → dest ILB, label ILB2 (VERIFIED). Ernie's B3 changes dest to OLB. Consistent.
- Ernie's B3 result (28/3 → 13/14, +1144 → −142) — REPORTED, not re-run; harness is his. Plausible and internally consistent.
- Ernie's "MIKE≈DT2 measured" claim — REPORTED; I did not re-run the provider. Plausible given slots maps DT2 to ILB dest with same row weight 300.
- The "scarcity-priced flex" mechanism is a genuine new idea (destination value / body count). Unmeasured, honestly labeled. Good.

Caveat: Ernie's B1 invalidity (ILB is a Dest, not SlotId) — VERIFIED conceptually (slots.ts SlotId list does not include 'ILB'; ILB is a Dest). Correct catch.

The key insight (synthetic gap vs real bias move oppositely; "equal value" must be defined) is the round's most important contribution. Recommend KG rule on the definition first.

No defects found. VERDICT ok.
