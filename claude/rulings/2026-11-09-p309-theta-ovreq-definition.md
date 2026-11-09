# P-309: theta and the ovrEq definition, Architect answer, 9 Nov 2026

STATUS: evidence + a correction proposal. The theta pick (0.5 / 0.75 / 1.0) and the table stay the Owner's. Table unchanged.

## The formula (REPORTED, Z.ai R-005 part 3)
P(a>b, ovr) = clamp(round2(theta x ovrEq(a>b, ovr)), 0, 30), grid theta {0.5, 0.75, 1.0} x ovr {85, 90}. Priced on the branch with `tools/mathlab/thetaprice.mjs` (Colors engine; no `slotWinsPerOvr()` exists, slope = `slotWins20/20`). Output: `tools/mathlab/results/thetaprice-2026-11-09.md`.

## 1. Is the working ovrEq (winsLost / slope[dest]) right? No, not as the basis for this table.
- VERIFIED (council, three seats; Super's grid is 20x low, VL/VLOC are right): it prices 0 for 42 of the 104 rules, including all four proposed rules (RB>WR, TE>EDGE, TE>OT, DT>EDGE). I get the same zeros (W@90 = 0 for each).
- INFERRED reason: winsLost = max(0, slotWins(natural) - slotWins(dest)) is one-sided. It measures what the model loses when a player is forced into a lighter spot. It is 0 whenever the destination is the heavier spot, which is exactly where a penalty is needed to keep a star natural. It also ignores the player the move displaces. The unit conversion (wins / slope = OVR at the destination) is sound; the wins side is the problem. So the grid is a lower bound for a loss, not a price for the deterrent.
- Correction proposed (D, displacement-aware): a star X moves a>b, displaces the incumbent Y at b and leaves a replacement Y at home. He flexes iff slope_b(X-P-Y) > slope_a(X-Y), so ovrEq = (X-Y)(1 - slope_a/slope_b), floored at 0. Same clamp and theta.

## 2. What D says (VERIFIED computation, assumptions named), Y = 70, X = 90, theta 1
| rule | table now | W | D | D at Y=65 | D at Y=75 |
|---|---|---|---|---|---|
| TE>EDGE | 12 | 0 | 12.7 | 15.9 | 9.5 |
| RB>WR | 12 | 0 | 12.3 | 15.4 | 9.2 |
| TE>OT | 12 | 0 | 10.0 | 12.5 | 7.5 |
| DT>EDGE | 12 | 0 | 4.6 | 5.8 | 3.5 |
- So three of the four -12s are supported by displacement as well as by positional fit; DT>EDGE is supported only at about -6 (DT and EDGE slopes are close). The Owner may keep 12 on positional fit.
- 12 of 104 rules sit below D at Y=70 (21 at Y=60, 9 at Y=75). Biggest gaps: FB rules (D 17-19, now 2-12), OLB>EDGE (15.4 vs 12), C>DT 14.3 vs 6, C>OT 14 vs 12, C>OG 12.5 vs 6, OLB>ILB 10 vs 2.
- Caveats: X = 90 and Y = 70 are the same for every role (FB, K, P, C top out lower, so their D is overstated); slopes are the linear 70 to 90 average; D is a first-order price, not an engine run. Next check if wanted: replay the draft scan with each rule set to its D value.

## 3. Not changed / reporting gap closed
- The table is unchanged. If the Owner wants the D grid used, he picks theta (D at theta 0.75, X 90 prints in the results file) and which rules move; that is a new build.
- The -2/-6/-12 table IS measured (REPORTED by Muse, VERIFIED here from `results/flexeval-pick-2026-11-08.json`, measured weights): fresh seeds 607 encouraged off-role stars (117 through a 12-rule, 369 small, 121 second stars), 4.25 flex moves per lineup; tune seeds 1253 (282 / 742 / 229), 4.27. Today's old table: 1319 fresh, 2657 tune.
