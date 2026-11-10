SPEAKER: super | ROLE: council | TASK: P-322 Option A — verify E5 hybrid independently | DATE: 2026-11-10T07:00:00Z

FOR: P-322

--- What I did ---

Independently re-implemented MUSE's E5 hybrid formula in Node.js (`.derive-E5-verify.mjs`), from MUSE's derive-improve-2026-11-10.py design — NOT re-running MUSE's script. Read-only: reads the live 99-rule Owner table (flex.json, architect 97d7e9d) and thetaprice D@90 from git; writes nothing.

E5 = Inkling's P-322 formula + cross-side floor + same-group A halved + re-fit cuts (1.5, 4, 9).
Same-group discount applies when src and dst are both in: DB {CB,FS,SS,NICKEL,DIME}, LB {ILB,OLB}, or DL {DT,EDGE}; A is halved for those pairs.

Also ran E1–E4 and E6 for comparison, plus E5 with EDGE>OLB added to the OVERRIDE dict (price 0).

--- Results (VERIFIED — I ran it) ---

BASELINE (floor, cuts 1/4/9): 93/6/0 — matches my prior Option C verification.
E1 same-group halved: 95/4/0 — matches MUSE.
E2 same-group zeroed: 96/3/0 — matches MUSE.
E3 cuts 1.5/4/9, no same-group: 96/3/0 — matches MUSE.
E4 gate D<2: 74/13/12 — matches MUSE; REJECTED (broke 25 rules, 12 hard misses).
E5 same-group halved + cuts 1.5/4/9: 97/2/0 — matches MUSE (best variant).
E6 same-group zeroed + cuts 1.5/4/9: 96/3/0 — matches MUSE.

E5 residuals (exactly as MUSE predicted):
  EDGE>OLB: owner 0, model 2  (the stubborn residual — survives in EVERY variant)
  FS>SS:    owner 2, model 0  (broken by E5 — owner prices it 2, model prices 0)

E5 + EDGE>OLB override (price 0): 98/1/0 — matches MUSE's 98/99 prediction.
Only remaining residual: FS>SS (owner 2, model 0).

--- Judgment: EDGE>OLB as override vs rush-equivalence term ---

Recommend: add EDGE>OLB as an explicit OVERRIDE entry (price 0), consistent with
the existing EDGE>ILB (6) and EDGE>RB (6) overrides.

Reasons:
1. Consistency: EDGE already has override entries; adding EDGE>OLB follows the same pattern. Easy to audit, easy to revert.
2. Directionality matters: EDGE>OLB = 0 (free) but OLB>EDGE = 12 (hard). An override handles this directional asymmetry cleanly. A generic "rush-equivalence" term would need careful scoping to avoid wrongly freeing OLB>EDGE.
3. Simplicity: one more line in the OVERRIDE dict vs a new conceptual term that needs definition and testing.

A rush-equivalence term could be explored later if more EDGE↔LB pairs need the same treatment, but for a single residual, the override is the minimal, principled fix.

--- Evidence labels ---

All E-variant results: VERIFIED (independently implemented and ran against the live table).
MUSE's E-variant claims: CONFIRMED for all six variants.
EDGE>OLB override → 98/99: CONFIRMED.

Script: .derive-E5-verify.mjs (this worktree, read-only).
Note: this file.
