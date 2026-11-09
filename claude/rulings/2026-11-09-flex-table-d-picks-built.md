# Flex table rebuilt from the Owner's D picks (97 rules), 9 Nov 2026

## Direction (REPORTED, Muse `claude-flex-rebuild-2026-11-09.md` + `claude-context-correction-2026-11-09.md`)
Owner rules supersede theta. 7 removed (FB>EDGE, FB>DT, FB>ILB, FB>OLB, CB>RB, DT>TE, EDGE>FS). 53 Owner overrides (14 at 12, 25 at 6, 14 at 2 by the lists). The other 44 rules: D@90 at theta 1.0 from `tools/mathlab/results/thetaprice-2026-11-09.md`. D is NOT recomputed here (P-321). SLOTS[].weight untouched (WILL/C bump is engine math, P-318, waits on P-321).

## Built (VERIFIED: `npm test` 290/290 in colors/; flexcheck OK; flexdl5 OK)
- `tools/mathlab/flex.json` + `colors/src/sports/nfl/engine/flex.ts`: 97 rules, tiers {0: 30, 2: 16, 6: 32, 12: 19}. Matches the expected counts exactly; no listed rule missing from the table.
- Rounding of D to a tier (INFERRED, not stated in the prompt): nearest of 0/2/6/12, cut points 1 / 4 / 9. It reproduces 19/32/16/30 exactly; the floor variant gives 15/32/20/30 and the geometric-midpoint variant 33/15 at 6/2. Borderline rules: OG>OT D 3.99 -> 2; TE>SS 4.19 and TE>FS 4.2 -> 6.
- `flex-dl5.json` re-derived: TE 12, OT 6, OG 6, C 12 (was 6), ILB 12, OLB 12. FB has neither DT nor EDGE left, so FB takes the -8 fallback at DL5.
- Tests changed on purpose: rule count 97 plus tier counts and the 7 removals; Owner D pins (EDGE>OLB 0, EDGE>TE 6, P>K 2, K>P 2, FB>EDGE emergency); WR>NICKEL/DIME 2; DL5 C 12; base-total 1850 -> 1800 (see 2); PIN_ENGINE nfl1.042b4efe83dcad -> nfl1.1f467e8a89710d.

## For the Owner (INFERRED from the table)
1. EDGE now flexes free almost everywhere: EDGE>DT, OLB, ILB, OG, OT, RB, FB, NICKEL are all 0 (D rounds to 0), EDGE>C 2. Same for every X>FB from linemen, ILB, OLB (0, replacing -2). Legal under "everything else is D", odd to look at.
2. Base totals: 4-3 natives in the 3-4 now lose 1800: a spare EDGE plays an inside spot free, a DT plays DE2 at -6 (300 x 6). Old: 1850.
3. K>P and P>K are both 2 (was 0 and 12).
4. FB can go to RB (2) or TE (6) only; QB>FS stays 12.

## Owner corrections applied (9 Nov, Muse `claude-flex-corrections-2026-11-09.md`)
9 rules listed (the prompt says both "8" and "9"; the counts only reconcile for 9). Owner overrides, not D: EDGE>ILB, EDGE>OG, EDGE>OT, EDGE>RB, EDGE>NICKEL, DT>C, DT>OG, EDGE>C -> 6; OG>C -> 2.
- VERIFIED: tiers now {0: 23, 2: 15, 6: 40, 12: 19} (97 rules). flexcheck OK, flexdl5 OK (flex-dl5.json unchanged, as predicted), `npm test` 290/290. PIN_ENGINE nfl1.108bcc20a9f253.
- DISCREPANCY: the prompt expects the 3-4 base total 3600; the lineup gives 2400. It finds a cheaper arrangement: a stand-in inside at -6 (300 x 6), the spare DT at FB free (DT>FB 0), the natural FB at TE3 -6 (50 x 6), a TE at DIME -6 (50 x 6). Pinned at 2400.
- Test 92 (second natural ILB): the bench is now DT or FB (a tie, since DT>FB is free); pinned as either.
