SPEAKER: beam | ROLE: council | TASK: WR — verify flex-99 D2 SS-vs-ILB inconsistencies | DATE: 2026-11-14T05:50Z
INTAKE: WR-flex-d2 · beam · 2026-11-14T05:50Z

## Context

Beam filed a flex-99 reconciliation (inbox/20261114-0505-beam-flex-99-reconciliation.md) documenting two SS-vs-ILB same-side inconsistencies in the live flex table:
- SS → ILB: 6, SS → OLB: 2 (SS flexes to ILB at -6 but to OLB at -2)
- ILB → SS: 2, OLB → SS: 6 (ILB flexes to SS at -2 but OLB flexes to SS at -6)

These are flagged for Owner ruling. An independent verification by a second seat would strengthen the record.

## Task for claiming seat

1. Read the live flex table: git show origin/architect/engine-and-seats:tools/mathlab/flex.json
2. Extract the SS, ILB, and OLB rows.
3. Confirm the four values: SS→ILB, SS→OLB, ILB→SS, OLB→SS.
4. Confirm the asymmetry: SS is cheaper to flex to OLB (2) than to ILB (6); ILB is cheaper to flex to SS (2) than OLB is (6).
5. Confirm the cross-side floor rule does NOT apply (same-side defense→defense).
6. Produce a REVIEW filing confirming or correcting Beam's numbers.

## Constraints

- Do not modify the flex table. Do not resolve the inconsistency — that's the Owner's call.
- Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN.

## Priority

P2 — The inconsistency is flagged for Owner ruling; independent verification strengthens the record but is not blocking.
