# Claude reply — Owner picks on D (short)

Read this first: `git show origin/council/muse:_agents/START-HERE.md` (boot), then this prompt. Keep it small — this is a relay of Owner decisions, not a new build order.

## Owner decisions (from KG, 2026-11-09)

**Adopt D at θ=1.0, round to the nearest tier (0/2/6/12).** The rounding cutoffs are the midpoints: D < 1 → 0, 1–4 → 2, 4–9 → 6, 9+ → 12. This is the rule for the rebuild. The Owner confirms it is NOT circular: D comes from the engine's slot weights (positional value, REV 5 spec, set before the flex table existed), while the flex table was set by Owner judgment. Convergence is validation, not circularity.

**The four proposed rules:**
- TE>EDGE: stays 12 (D 12.7 rounds to 12).
- RB>WR: stays 12 (D 12.3 rounds to 12).
- TE>OT: stays 12 (D 10.0 rounds to 12 — 10 is closer to 12 than to 6).
- DT>EDGE: drops to 6 (D 4.6 rounds to 6).

**The 12 under-priced rules — Owner overrides:**
- FB>EDGE: REMOVE the rule entirely (do not set to 0 — delete it).
- FB>DT: REMOVE the rule entirely.
- FB>ILB: REMOVE the rule entirely.
- FB>OLB: REMOVE the rule entirely.
- FB>TE: KEEP at 6 (do not raise to 12 despite D 18.0 — few FBs, this is a just-in-case rule).
- FB>RB: KEEP at 2 (do not raise to 12 despite D 18.0 — few FBs, just-in-case rule).
- C>DT: goes to 12 (from 6; D 14.3 rounds to 12).
- C>OT: stays 12 (D 14 rounds to 12).
- C>OG: KEEP at 6 (do not raise to 12 despite D 12.5 — Owner override).
- OLB>EDGE: stays 12 (D 15.39 rounds to 12).
- TE>EDGE: stays 12 (D 12.71 rounds to 12).
- OLB>ILB: change to 6 (from 2; D 10.05 would round to 12, but the Owner overrides to 6 — see the engine change below).

**The 10 over-priced rules — Owner overrides (these do NOT all follow the rounding rule):**
- OT>EDGE: 12 → 6 (D 5.38 rounds to 6). OT playing edge rusher. Follows the rounding rule.
- SS>CB: 12 → 6 (D 5.07 rounds to 6). Strong safety playing cornerback. Follows the rounding rule.
- FS>CB: 12 → 6 (D 5.06 rounds to 6). Free safety playing cornerback. Follows the rounding rule.
- DT>EDGE: 12 → 6 (D 4.61 rounds to 6). Defensive tackle playing edge rusher. (Already listed above.)
- RB>FS: KEEP at 12 (D 4.37 would round to 6, but the Owner overrides — a RB playing free safety is so unlikely in real life it stays heavily penalized).
- RB>SS: KEEP at 12 (D 4.35 would round to 6, but the Owner overrides — same unlikeness reason).
- TE>ILB: KEEP at 12 (D 4.28 would round to 6, but the Owner overrides — same unlikeness reason).
- RB>TE: change to 6 (D 0.21 would round to 0, but the Owner overrides to 6 — a RB playing tight end is unlikely in real life, so it carries a penalty, not free).
- SS>ILB: change to 6 (D 0.12 would round to 0, but the Owner overrides to 6 — same unlikeness reason).
- P>K: change to 2 (D 0.01 would round to 0, but the Owner overrides to 2 — real-life reasons: a punter playing kicker is a different specialist job).
- K>P: change to 2 (D ~0 would round to 0, but the Owner overrides to 2 — same real-life reason: a kicker playing punter is a different specialist job).

Note: RB>TE, SS>ILB, P>K, and K>P would all round to 0 under the pure rounding rule (their D values are near 0 because source and destination have the same slot weight). The Owner overrides all four to a non-zero penalty on real-life/unlikeness grounds — no cross-position move is free.

**Engine changes — slot weights:**
- WILL: 150 → 200 (increase by 50). This is to offset the discrepancy between the flex penalty (6) and the theta value (D 10.05) for OLB>ILB. Raising WILL's weight raises its slope, which brings D for OLB>ILB down toward 6.
- C: 150 → 200 (increase by 50). Same reasoning — raise the center's engine value to offset the discrepancy between the flex penalties and the theta values for the C rules (C>DT D 14.3, C>OG D 12.5, C>OT D 14.0).
- SAM: stays at 100 (no change — very few SAMs, only Isiah McDuffie is relevant).

## What this means for the rebuild

Rebuild the flex table from D at θ=1.0, rounded to the nearest tier, with the Owner overrides above (FB>EDGE/DT/ILB/OLB removed, FB>TE kept at 6, FB>RB kept at 2, C>OG kept at 6, OLB>ILB set to 6). Apply the WILL 150 → 200 and C 150 → 200 engine changes first, then recompute D for all rules with the new weights, then apply the rounding rule + overrides. Replay the draft scan with the rebuilt table. Report every rule that moves, so the Owner can review the complete diff before it lands.

## Next after this build

The seven guard passes (P-288), then P-308 (FB/punter/CB4 snaps) once the Owner picks a direction there.
