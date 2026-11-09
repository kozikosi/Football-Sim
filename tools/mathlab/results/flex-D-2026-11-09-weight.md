# Flex rebuild from D — flex-D-2026-11-09-weight

Generated 2026-11-09T15:20:26.694Z on the Colors engine (slope = weight, slot weight).
theta 1, X 90, Y 70, tiers 0/2/6/12, cutoffs 1/4/9. Bumps {"WILL":200,"C":200}.
Base table: ../tools/mathlab/flex.json. Owner rules: tools/mathlab/flex-owner-2026-11-09.json.

Rules 104: kept 97, removed 7, **63 rules move** vs the base table.
Tier counts before {"0":14,"2":16,"6":18,"12":56} -> after {"0":30,"2":17,"6":31,"12":19}.
Weight bumps move 8 rule(s) in D (max |delta D| 4).
The other slope definition (wins) rounds 8 rule(s) differently: OG>OT, OLB>ILB, OLB>SS, RB>FS, RB>SS, TE>FS, TE>ILB, TE>SS.
Warnings: none.

## Every rule that moves

| rule | was | now | D | source |
|---|---|---|---|---|
| C>DT | 6 | 12 | 12 | override (agrees with D) |
| C>FB | 2 | 0 | 0 | rounding |
| CB>RB | 12 | REMOVED |  | removed |
| CB>SS | 2 | 0 | 0 | rounding |
| CB>WR | 12 | 6 | 6 | rounding |
| DT>C | 6 | 0 | 0 | rounding |
| DT>EDGE | 12 | 6 | 6 | rounding |
| DT>FB | 2 | 0 | 0 | rounding |
| DT>OG | 6 | 2 | 0 | override |
| DT>OT | 12 | 6 | 0 | override |
| DT>TE | 12 | REMOVED |  | removed |
| EDGE>C | 12 | 2 | 0 | override |
| EDGE>DT | 2 | 0 | 0 | rounding |
| EDGE>FB | 2 | 0 | 0 | rounding |
| EDGE>FS | 12 | REMOVED |  | removed |
| EDGE>ILB | 12 | 0 | 0 | rounding |
| EDGE>NICKEL | 12 | 0 | 0 | rounding |
| EDGE>OG | 12 | 0 | 0 | rounding |
| EDGE>OLB | 2 | 0 | 0 | rounding |
| EDGE>OT | 12 | 0 | 0 | rounding |
| EDGE>RB | 12 | 0 | 0 | rounding |
| EDGE>TE | 12 | 6 | 0 | override |
| FB>DT | 12 | REMOVED |  | removed |
| FB>EDGE | 12 | REMOVED |  | removed |
| FB>ILB | 12 | REMOVED |  | removed |
| FB>OLB | 12 | REMOVED |  | removed |
| FS>CB | 12 | 6 | 6 | override (agrees with D) |
| FS>OLB | 12 | 6 | 0 | override |
| ILB>FB | 2 | 0 | 0 | rounding |
| ILB>NICKEL | 12 | 6 | 0 | override |
| ILB>SS | 12 | 2 | 0 | override |
| ILB>TE | 12 | 6 | 0 | override |
| K>P | 0 | 2 | 0 | override |
| OG>EDGE | 12 | 6 | 6 | rounding |
| OG>FB | 2 | 0 | 0 | rounding |
| OLB>FB | 2 | 0 | 0 | rounding |
| OLB>ILB | 2 | 6 | 6 | override (agrees with D) |
| OLB>SS | 12 | 6 | 6 | override (agrees with D) |
| OLB>TE | 12 | 6 | 6 | rounding |
| OT>C | 0 | 2 | 0 | override |
| OT>EDGE | 12 | 6 | 6 | override (agrees with D) |
| OT>FB | 2 | 0 | 0 | rounding |
| P>K | 12 | 2 | 0 | override |
| RB>FB | 2 | 0 | 0 | rounding |
| RB>TE | 12 | 6 | 0 | override |
| SS>CB | 12 | 6 | 6 | override (agrees with D) |
| SS>ILB | 12 | 6 | 0 | override |
| SS>OLB | 12 | 2 | 0 | override |
| SS>TE | 12 | 6 | 0 | override |
| TE>C | 12 | 6 | 0 | override |
| TE>DIME | 12 | 6 | 0 | override |
| TE>FB | 2 | 0 | 0 | rounding |
| TE>FS | 6 | 2 | 2 | rounding |
| TE>NICKEL | 12 | 6 | 0 | override |
| TE>OG | 12 | 6 | 6 | rounding |
| TE>OLB | 12 | 6 | 0 | override |
| TE>SS | 6 | 2 | 2 | rounding |
| WR>CB | 6 | 2 | 0 | override |
| WR>DIME | 6 | 2 | 0 | override |
| WR>FS | 6 | 2 | 0 | override |
| WR>NICKEL | 6 | 2 | 0 | override |
| WR>RB | 12 | 6 | 0 | override |
| WR>SS | 6 | 2 | 0 | override |

## Full table (final)

| rule | was | D | rounded | owner | final |
|---|---|---|---|---|---|
| QB>FS | 12 | 0 | 0 | override | 12 |
| RB>FB | 2 | 0 | 0 | rounding | 0 |
| RB>WR | 12 | 12.31 | 12 | override (agrees with D) | 12 |
| RB>TE | 12 | 0 | 0 | override | 6 |
| RB>SS | 12 | 3.33 | 2 | override | 12 |
| RB>FS | 12 | 3.33 | 2 | override | 12 |
| FB>RB | 2 | 18 | 12 | override | 2 |
| FB>TE | 6 | 18 | 12 | override | 6 |
| FB>ILB | 12 | 18.33 | — | removed | REMOVED |
| FB>OLB | 12 | 17.5 | — | removed | REMOVED |
| FB>EDGE | 12 | 19.23 | — | removed | REMOVED |
| FB>DT | 12 | 19 | — | removed | REMOVED |
| WR>RB | 12 | 0 | 0 | override | 6 |
| WR>TE | 6 | 0 | 0 | override | 6 |
| WR>CB | 6 | 0 | 0 | override | 2 |
| WR>FS | 6 | 0 | 0 | override | 2 |
| WR>SS | 6 | 0 | 0 | override | 2 |
| WR>NICKEL | 6 | 0 | 0 | override | 2 |
| WR>DIME | 6 | 0 | 0 | override | 2 |
| TE>FB | 2 | 0 | 0 | rounding | 0 |
| TE>WR | 12 | 12.31 | 12 | rounding | 12 |
| TE>RB | 6 | 0 | 0 | override | 6 |
| TE>C | 12 | 0 | 0 | override | 6 |
| TE>OG | 12 | 7.5 | 6 | rounding | 6 |
| TE>OT | 12 | 10 | 12 | override (agrees with D) | 12 |
| TE>EDGE | 12 | 12.31 | 12 | override (agrees with D) | 12 |
| TE>DT | 12 | 10 | 12 | rounding | 12 |
| TE>OLB | 12 | 0 | 0 | override | 6 |
| TE>ILB | 12 | 3.33 | 2 | override | 12 |
| TE>SS | 6 | 3.33 | 2 | rounding | 2 |
| TE>FS | 6 | 3.33 | 2 | rounding | 2 |
| TE>NICKEL | 12 | 0 | 0 | override | 6 |
| TE>DIME | 12 | 0 | 0 | override | 6 |
| OT>OG | 0 | 0 | 0 | rounding | 0 |
| OT>C | 0 | 0 | 0 | override | 2 |
| OT>DT | 6 | 0 | 0 | override | 6 |
| OT>EDGE | 12 | 4.62 | 6 | override (agrees with D) | 6 |
| OT>FB | 2 | 0 | 0 | rounding | 0 |
| OG>OT | 6 | 4 | 6 | rounding | 6 |
| OG>C | 0 | 0 | 0 | rounding | 0 |
| OG>DT | 6 | 4 | 6 | rounding | 6 |
| OG>EDGE | 12 | 7.69 | 6 | rounding | 6 |
| OG>FB | 2 | 0 | 0 | rounding | 0 |
| C>OG | 6 | 10 | 12 | override | 6 |
| C>OT | 12 | 12 | 12 | override (agrees with D) | 12 |
| C>DT | 6 | 12 | 12 | override (agrees with D) | 12 |
| C>FB | 2 | 0 | 0 | rounding | 0 |
| DT>EDGE | 12 | 4.62 | 6 | rounding | 6 |
| DT>C | 6 | 0 | 0 | rounding | 0 |
| DT>OG | 6 | 0 | 0 | override | 2 |
| DT>OT | 12 | 0 | 0 | override | 6 |
| DT>FB | 2 | 0 | 0 | rounding | 0 |
| DT>TE | 12 | 0 | — | removed | REMOVED |
| EDGE>DT | 2 | 0 | 0 | rounding | 0 |
| EDGE>OLB | 2 | 0 | 0 | rounding | 0 |
| EDGE>ILB | 12 | 0 | 0 | rounding | 0 |
| EDGE>C | 12 | 0 | 0 | override | 2 |
| EDGE>OG | 12 | 0 | 0 | rounding | 0 |
| EDGE>OT | 12 | 0 | 0 | rounding | 0 |
| EDGE>SS | 12 | 0 | 0 | override | 12 |
| EDGE>FS | 12 | 0 | — | removed | REMOVED |
| EDGE>RB | 12 | 0 | 0 | rounding | 0 |
| EDGE>FB | 2 | 0 | 0 | rounding | 0 |
| EDGE>TE | 12 | 0 | 0 | override | 6 |
| EDGE>NICKEL | 12 | 0 | 0 | rounding | 0 |
| ILB>ILB | 0 | 0 | 0 | rounding | 0 |
| ILB>OLB | 0 | 0 | 0 | rounding | 0 |
| ILB>EDGE | 12 | 10.77 | 12 | rounding | 12 |
| ILB>SS | 12 | 0 | 0 | override | 2 |
| ILB>FB | 2 | 0 | 0 | rounding | 0 |
| ILB>TE | 12 | 0 | 0 | override | 6 |
| ILB>NICKEL | 12 | 0 | 0 | override | 6 |
| ILB>DIME | 12 | 0 | 0 | override | 12 |
| OLB>OLB | 0 | 0 | 0 | rounding | 0 |
| OLB>ILB | 2 | 6.67 | 6 | override (agrees with D) | 6 |
| OLB>EDGE | 12 | 13.85 | 12 | override (agrees with D) | 12 |
| OLB>SS | 12 | 6.67 | 6 | override (agrees with D) | 6 |
| OLB>FB | 2 | 0 | 0 | rounding | 0 |
| OLB>TE | 12 | 4 | 6 | rounding | 6 |
| OLB>NICKEL | 6 | 0 | 0 | override | 6 |
| OLB>DIME | 12 | 0 | 0 | override | 12 |
| SS>NICKEL | 0 | 0 | 0 | rounding | 0 |
| SS>DIME | 0 | 0 | 0 | rounding | 0 |
| SS>FS | 2 | 0 | 0 | override | 2 |
| SS>CB | 12 | 5 | 6 | override (agrees with D) | 6 |
| SS>WR | 12 | 10.77 | 12 | rounding | 12 |
| SS>ILB | 12 | 0 | 0 | override | 6 |
| SS>OLB | 12 | 0 | 0 | override | 2 |
| SS>RB | 12 | 0 | 0 | override | 12 |
| SS>TE | 12 | 0 | 0 | override | 6 |
| FS>NICKEL | 0 | 0 | 0 | rounding | 0 |
| FS>DIME | 0 | 0 | 0 | rounding | 0 |
| FS>SS | 2 | 0 | 0 | override | 2 |
| FS>CB | 12 | 5 | 6 | override (agrees with D) | 6 |
| FS>WR | 12 | 10.77 | 12 | rounding | 12 |
| FS>OLB | 12 | 0 | 0 | override | 6 |
| CB>FS | 0 | 0 | 0 | rounding | 0 |
| CB>NICKEL | 0 | 0 | 0 | rounding | 0 |
| CB>DIME | 0 | 0 | 0 | rounding | 0 |
| CB>SS | 2 | 0 | 0 | rounding | 0 |
| CB>WR | 12 | 7.69 | 6 | rounding | 6 |
| CB>RB | 12 | 0 | — | removed | REMOVED |
| K>P | 0 | 0 | 0 | override | 2 |
| P>K | 12 | 0 | 0 | override | 2 |

## Notes

- D is floored at 0 and clamped to 30 after theta; the tier cutoffs are the midpoints of 0/2/6/12.
- Rules the Owner does not name keep the rounded D. The Owner's named rules supersede the rounding.
- `action` = rounding | override | override (agrees with D) | removed.
- A negative D is the formula saying the destination is the heavier spot; the floor at 0 is what makes 30 rules free.
