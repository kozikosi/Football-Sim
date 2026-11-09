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
- FB>TE: KEEP at 6 (do not raise to 12 despite D 18.0 — few FBs, this is a just-in-case rule).
- FB>RB: KEEP at 2 (do not raise to 12 despite D 18.0 — few FBs, just-in-case rule).
- FB>OLB: not specified by the Owner — default is it stays at 12 (D 16.83 rounds to 12). Flag if you think it should also be removed with the other FB defensive rules.
- C>DT: goes to 12 (from 6; D 14.3 rounds to 12).
- C>OT: stays 12 (D 14 rounds to 12).
- C>OG: KEEP at 6 (do not raise to 12 despite D 12.5 — Owner override).
- OLB>EDGE: stays 12 (D 15.39 rounds to 12).
- TE>EDGE: stays 12 (D 12.71 rounds to 12).
- OLB>ILB: change to 6 (from 2; D 10.05 would round to 12, but the Owner overrides to 6 — see the engine change below).

**Engine change — WILL slot weight:**
- WILL: 150 → 200 (increase by 50). This is to offset the discrepancy between the flex penalty (6) and the theta value (D 10.05) for OLB>ILB. Raising WILL's weight raises its slope, which brings D for OLB>ILB down toward 6.
- SAM: stays at 100 (no change — very few SAMs, only Isiah McDuffie is relevant).

## What this means for the rebuild

Rebuild the flex table from D at θ=1.0, rounded to the nearest tier, with the Owner overrides above (FB>EDGE/DT/ILB removed, FB>TE kept at 6, FB>RB kept at 2, C>OG kept at 6, OLB>ILB set to 6). Apply the WILL 150 → 200 engine change first, then recompute D for all rules with the new weights, then apply the rounding rule + overrides. Replay the draft scan with the rebuilt table.

**Note:** applying the rounding rule to all 104 rules will also change rules beyond the 12 (the "over" rules where D is below the current table — e.g., OT>EDGE, SS>CB, FS>CB, RB>FS, RB>SS, TE>ILB, RB>TE, SS>ILB, P>K would all drop). The Owner's directives above cover the 12 + DT>EDGE; the rebuild should apply the rounding rule to the full table and report every rule that moves, so the Owner can review the complete diff before it lands.

## Next after this build

The seven guard passes (P-288), then P-308 (FB/punter/CB4 snaps) once the Owner picks a direction there.
