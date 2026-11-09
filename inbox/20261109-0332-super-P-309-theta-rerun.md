SPEAKER: super | ROLE: council seat | TASK: P-309 theta rerun on the Colors engine (CORRECTED slope slotWins20/20) | DATE: 2026-11-09T04:25:56Z
FOR: P-309
REVIEW-OF: none (council rerun of theta pricing per the open-work prompt; corrects my earlier 20261109-0332 file which used slotWins20 as slope — off by factor of 20)
VERDICT: ok

## Working definition (NOT Architect-blessed)
Per the open-work prompt, I used Super's ovrEq definition as the WORKING definition, pending Claude's confirmation:
- ovrEq(a->b, ovr) = winsLost / slope[dest]
- winsLost = max(0, slotWins(natural, ovr) − slotWins(dest, ovr))
- slope[dest] = slotWins20(dest) / 20   [wins per 1 OVR point, base '4-3']  ← CORRECTED (was slotWins20, off by ×20)
  Spec basis: weight = wins20 / 0.00254, so 1 OVR point = 0.00254 wins; slope per 1 OVR pt = slotWins20/20.
- natural slot per role = primary (highest-weight) slot with that dest (derived from SLOTS, not hardcoded)
- P(a->b, ovr) = clamp(round2(theta · ovrEq), 0, 30), theta in {0.5, 0.75, 1.0}, ovr in {85, 90}
- Formula source: council long prompt v2 §1 (theta pricing), sent to Claude by the Owner 2026-11-08.

Do NOT claim this grid is Architect-blessed until Claude confirms the ovrEq definition. Do not invent a different definition or formula.

## Command (run in a scratch tree, NOT the repo, against architect/engine-and-seats tip 2039c89 = Colors engine, NOT Pre-Colors)
```
cd /private/.../p309/colors   # scratch tree containing architect/engine-and-seats colors/src at 2039c89
node --experimental-strip-types ../theta-rerun.mjs > /tmp/p309-stdout.txt
```
The script imports `slotWins`/`slotWins20` from `colors/src/sports/nfl/engine/value.ts`, `SLOTS` from `slots.ts`, `FLEX` from `flex.ts`; reads `/tmp/flex-built.json` (built −2/−6/−12 flex.json at tip) and `/tmp/flex-proposal.json` (proposal table from commit 1e6372a); enumerates all 104 unique (role->dest) rules across both tables; prints the grid. Nothing written to the repo. Full JSON grid saved to `/tmp/p309-theta-grid.json`.

## Output (command output, verbatim — corrected slope)
```
P-309 theta rerun — Colors engine @ architect/engine-and-seats 2039c89, base=4-3
Method (WORKING definition, NOT Architect-blessed): ovrEq = winsLost/slope[dest], winsLost = max(0, slotWins(natural,ovr)-slotWins(dest,ovr)), slope=slotWins20(dest)/20.
Grid: theta x ovr = 0.5/0.75/1 x 85/90. Penalty P = clamp(round2(theta*ovrEq),0,30).
natural slot per role = primary (highest-weight) slot with that dest. 104 unique rules across proposal + built tables.

rule | builtPen | propPen | o85 t0.5 | o85 t0.75 | o85 t1 | o90 t0.5 | o90 t0.75 | o90 t1
--- | --- | --- | --- | --- | --- | --- | --- | ---
C>DT | 6 | 4 | 0 | 0 | 0 | 0 | 0 | 0
C>FB | 2 | 2 | 12.51 | 18.76 | 25.01 | 25.05 | 30 | 30
C>OG | 6 | 4 | 0 | 0 | 0 | 0 | 0 | 0
C>OT | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
CB>DIME | 0 | 0 | 17.51 | 26.26 | 30 | 30 | 30 | 30
CB>FS | 0 | 0 | 0.84 | 1.26 | 1.68 | 1.67 | 2.51 | 3.35
CB>NICKEL | 0 | 0 | 7.56 | 11.34 | 15.13 | 15.03 | 22.54 | 30
CB>RB | 12 | 10 | 1.6 | 2.4 | 3.2 | 2.76 | 4.14 | 5.52
CB>SS | 2 | 2 | 0.84 | 1.25 | 1.67 | 1.67 | 2.5 | 3.33
CB>WR | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
DT>C | 6 | 4 | 6.3 | 9.45 | 12.6 | 12.28 | 18.42 | 24.56
DT>EDGE | 12 | 12 | 0 | 0 | 0 | 0 | 0 | 0
DT>FB | 2 | 2 | 30 | 30 | 30 | 30 | 30 | 30
DT>OG | 6 | 4 | 0.78 | 1.17 | 1.56 | 1.39 | 2.08 | 2.78
DT>OT | 12 | 10 | 0.13 | 0.19 | 0.26 | 0.13 | 0.19 | 0.26
DT>TE | 12 | 10 | 2.62 | 3.92 | 5.23 | 4.59 | 6.88 | 9.18
EDGE>C | 12 | 10 | 8.85 | 13.28 | 17.7 | 17.48 | 26.22 | 30
EDGE>DT | 2 | 2 | 0.73 | 1.09 | 1.46 | 1.48 | 2.22 | 2.97
EDGE>FB | 2 | 2 | 30 | 30 | 30 | 30 | 30 | 30
EDGE>FS | 12 | 10 | 2.91 | 4.37 | 5.82 | 5.74 | 8.62 | 11.49
EDGE>ILB | 12 | 10 | 2.86 | 4.29 | 5.71 | 5.65 | 8.48 | 11.31
EDGE>NICKEL | 12 | 10 | 13.81 | 20.71 | 27.62 | 27.31 | 30 | 30
EDGE>OG | 12 | 10 | 1.74 | 2.6 | 3.47 | 3.34 | 5.01 | 6.68
EDGE>OLB | 2 | 2 | 8.28 | 12.42 | 16.56 | 16.38 | 24.58 | 30
EDGE>OT | 12 | 10 | 0.89 | 1.34 | 1.79 | 1.69 | 2.53 | 3.38
EDGE>RB | 12 | 10 | 4.25 | 6.37 | 8.49 | 7.97 | 11.95 | 15.93
EDGE>SS | 12 | 10 | 2.91 | 4.36 | 5.82 | 5.74 | 8.61 | 11.48
EDGE>TE | 12 | 10 | 4.15 | 6.23 | 8.3 | 7.72 | 11.58 | 15.44
FB>DT | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
FB>EDGE | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
FB>ILB | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
FB>OLB | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
FB>RB | 2 | 2 | 0 | 0 | 0 | 0 | 0 | 0
FB>TE | 6 | 4 | 0 | 0 | 0 | 0 | 0 | 0
FS>CB | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
FS>DIME | 0 | 0 | 12.45 | 18.68 | 24.91 | 24.76 | 30 | 30
FS>NICKEL | 0 | 0 | 5.02 | 7.53 | 10.04 | 9.97 | 14.96 | 19.95
FS>OLB | 12 | 10 | 2.46 | 3.69 | 4.92 | 4.89 | 7.34 | 9.79
FS>SS | 2 | 2 | 0 | 0 | 0 | 0 | 0 | 0
FS>WR | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
ILB>DIME | 12 | 10 | 12.7 | 19.05 | 25.4 | 25.14 | 30 | 30
ILB>EDGE | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
ILB>FB | 2 | 2 | 29.38 | 30 | 30 | 30 | 30 | 30
ILB>ILB | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0
ILB>NICKEL | 12 | 10 | 5.14 | 7.72 | 10.29 | 10.17 | 15.25 | 20.33
ILB>OLB | 0 | 0 | 2.54 | 3.81 | 5.08 | 5.02 | 7.53 | 10.04
ILB>SS | 12 | 10 | 0.03 | 0.05 | 0.07 | 0.05 | 0.08 | 0.11
ILB>TE | 12 | 10 | 0.52 | 0.78 | 1.03 | 0.53 | 0.79 | 1.06
K>P | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0
OG>C | 0 | 0 | 4.22 | 6.33 | 8.45 | 8.57 | 12.86 | 17.14
OG>DT | 6 | 4 | 0 | 0 | 0 | 0 | 0 | 0
OG>EDGE | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
OG>FB | 2 | 2 | 30 | 30 | 30 | 30 | 30 | 30
OG>OT | 6 | 4 | 0 | 0 | 0 | 0 | 0 | 0
OLB>DIME | 12 | 10 | 5.08 | 7.62 | 10.16 | 10.08 | 15.12 | 20.16
OLB>EDGE | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
OLB>FB | 2 | 2 | 13.38 | 20.06 | 26.75 | 26.56 | 30 | 30
OLB>ILB | 2 | 2 | 0 | 0 | 0 | 0 | 0 | 0
OLB>NICKEL | 6 | 4 | 1.31 | 1.97 | 2.63 | 2.59 | 3.88 | 5.18
OLB>OLB | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0
OLB>SS | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
OLB>TE | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
OT>C | 0 | 0 | 5.87 | 8.81 | 11.75 | 11.85 | 17.78 | 23.7
OT>DT | 6 | 4 | 0 | 0 | 0 | 0 | 0 | 0
OT>EDGE | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
OT>FB | 2 | 2 | 30 | 30 | 30 | 30 | 30 | 30
OT>OG | 0 | 0 | 0.62 | 0.93 | 1.24 | 1.23 | 1.85 | 2.46
P>K | 12 | 10 | 0.12 | 0.18 | 0.24 | 0.55 | 0.83 | 1.1
QB>FS | 12 | 10 | 5.48 | 8.22 | 10.95 | 12.22 | 18.34 | 24.45
RB>FB | 2 | 2 | 23.73 | 30 | 30 | 30 | 30 | 30
RB>FS | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
RB>SS | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
RB>TE | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
RB>WR | 12 | 12 | 0 | 0 | 0 | 0 | 0 | 0
SS>CB | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
SS>DIME | 0 | 0 | 12.49 | 18.74 | 24.99 | 24.82 | 30 | 30
SS>FS | 2 | 2 | 0.01 | 0.01 | 0.01 | 0.01 | 0.02 | 0.02
SS>ILB | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
SS>NICKEL | 0 | 0 | 5.04 | 7.56 | 10.08 | 10.01 | 15.01 | 20.01
SS>OLB | 12 | 10 | 2.47 | 3.71 | 4.94 | 4.92 | 7.37 | 9.83
SS>RB | 12 | 10 | 0.53 | 0.79 | 1.06 | 0.63 | 0.95 | 1.26
SS>TE | 12 | 10 | 0.47 | 0.71 | 0.95 | 0.46 | 0.69 | 0.92
SS>WR | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
TE>C | 12 | 10 | 1.95 | 2.93 | 3.91 | 4.65 | 6.98 | 9.31
TE>DIME | 12 | 10 | 10.25 | 15.37 | 20.49 | 22.64 | 30 | 30
TE>DT | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
TE>EDGE | 12 | 12 | 0 | 0 | 0 | 0 | 0 | 0
TE>FB | 2 | 2 | 24.23 | 30 | 30 | 30 | 30 | 30
TE>FS | 6 | 4 | 0 | 0 | 0 | 0 | 0 | 0
TE>ILB | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
TE>NICKEL | 12 | 10 | 3.91 | 5.87 | 7.82 | 8.91 | 13.36 | 17.81
TE>OG | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
TE>OLB | 12 | 10 | 1.72 | 2.58 | 3.44 | 4.19 | 6.28 | 8.37
TE>OT | 12 | 12 | 0 | 0 | 0 | 0 | 0 | 0
TE>RB | 6 | 4 | 0.05 | 0.08 | 0.1 | 0.17 | 0.25 | 0.33
TE>SS | 6 | 4 | 0 | 0 | 0 | 0 | 0 | 0
TE>WR | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0
WR>CB | 6 | 4 | 1.59 | 2.38 | 3.17 | 4.21 | 6.32 | 8.43
WR>DIME | 6 | 4 | 30 | 30 | 30 | 30 | 30 | 30
WR>FS | 6 | 4 | 2.97 | 4.45 | 5.93 | 7.31 | 10.97 | 14.63
WR>NICKEL | 6 | 4 | 13.98 | 20.96 | 27.95 | 30 | 30 | 30
WR>RB | 12 | 10 | 4.32 | 6.48 | 8.63 | 9.98 | 14.96 | 19.95
WR>SS | 6 | 4 | 2.96 | 4.45 | 5.93 | 7.31 | 10.97 | 14.62
WR>TE | 6 | 4 | 4.22 | 6.33 | 8.44 | 9.71 | 14.56 | 19.42
```

## Key findings (labelled)
- Correction applied: slope now `slotWins20/20` (wins per 1 OVR point). All non-zero values are now 20x my earlier grid. QB>FS @90 θ1.0 = 24.45, which matches VL's and VLOC's grids exactly (prompt's reconciliation check). ✓ reconciled
- 104 unique rules across the proposal table and the built −2/−6/−12 table; all four proposed rules covered (RB>WR, TE>EDGE, TE>OT, DT>EDGE). All four price at 0 at every (theta, ovr): their destination slot is worth MORE wins than the natural slot, so winsLost = 0. Robust across all three seats (VL, VLOC, Super agree). ✓ robust
- The theta grid is a LOWER BOUND; the −12 stands on positional fit. Many values clamp at the 30 cap (FB moves, EDGE>FB, OT>FB, OG>FB, etc.) because the destination is far less valuable than the natural spot.
- Grid scales roughly linearly with theta; slightly higher at ovr=90 than ovr=85 (slope effect).
- Definition status: WORKING / UNKNOWN until Claude confirms ovrEq. The grid itself is VERIFIED output (command ran cleanly, exit 0, 104 rows).

## HOW TO CHECK
Re-run the command above against architect/engine-and-seats tip 2039c89; the printed table must match verbatim (deterministic given the engine sources). Cross-check QB>FS @90 θ1.0 = 24.45 against VL's (`inbox/20261109-0328-vl-P-309-theta-rerun.md`) and VLOC's (`inbox/20261109-0332-vloc-P-309-theta-rerun.md`) files.

## Next step
Claude (Architect) confirms or corrects the ovrEq definition and prices theta on the branch (covering the four proposed rules and the −2/−6/−12 table). Theta pick (0.5 / 0.75 / 1.0) is the Owner's, from this grid once it lands.

Evidence: VERIFIED (grid computed, reconciled with VL/VLOC) / UNKNOWN (ovrEq definition not yet confirmed by Architect).
