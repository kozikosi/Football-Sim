# Unified flex rule evaluation vs flex.json (REV 4)

Rule A (win-cost): penalty = clamp(round(winCost x 10), 0, 10), winCost = (weight[to] - weight[from]) x 0.00254 (design.json primary slot per role, approximation).
Rule B (council PART-1): penalty = min(12, 4 x hops) on the position-group graph; QB and OL (OT/OG/C) banned as flex sources.
Compared 107 slot-pair rules: 12 agree with Rule A, 10 effectively banned, 0 lack a slot mapping, 79 mismatch Rule A.

| from | to | flex.json | ruleA | ruleB (hops) | banned | agree-A | diff |
|----|----|----|----|----|----|----|----|
| QB | FS | 10 | n/a | 8 | YES | no | n/a |
| RB | FB | 2 | 5 | 4 | — | no | 3 |
| RB | WR | 4 | 6 | 4 | — | no | 2 |
| RB | TE | 6 | 1 | 4 | — | no | -5 |
| FB | RB | 4 | 5 | 4 | — | no | 1 |
| FB | TE | 4 | 6 | 4 | — | no | 2 |
| WR | RB | 4 | 6 | 4 | — | no | 2 |
| WR | TE | 4 | 5 | 4 | — | no | 1 |
| WR | SS | 4 | 6 | 4 | — | no | 2 |
| WR | FS | 4 | 5 | 4 | — | no | 1 |
| WR | NICKEL | 4 | 5 | 4 | — | no | 1 |
| WR | DIME | 4 | 10 | 4 | — | no | 6 |
| WR | CB | 6 | 1 | 4 | — | no | -5 |
| TE | WR | 2 | 5 | 4 | — | no | 3 |
| TE | FB | 2 | 6 | 4 | — | no | 4 |
| TE | RB | 4 | 1 | 4 | — | no | -3 |
| TE | C | 6 | 1 | 4 | — | no | -5 |
| TE | OG | 6 | 1 | 4 | — | no | -5 |
| TE | OT | 6 | 4 | 4 | — | no | -2 |
| TE | EDGE | 6 | 6 | 4 | — | yes | 0 |
| TE | DT | 6 | 3 | 4 | — | no | -3 |
| TE | ILB | 6 | 0 | 4 | — | no | -6 |
| TE | OLB | 6 | 1 | 4 | — | no | -5 |
| TE | SS | 6 | 1 | 4 | — | no | -5 |
| TE | FS | 6 | 0 | 4 | — | no | -6 |
| TE | NICKEL | 6 | 0 | 4 | — | no | -6 |
| TE | DIME | 6 | 6 | 4 | — | yes | 0 |
| OT | OG | 0 | 0 | 4 | YES | no | 0 |
| OT | C | 0 | 0 | 4 | YES | no | 0 |
| OT | DT | 4 | n/a | 4 | YES | no | n/a |
| OT | FB | 4 | n/a | 4 | YES | no | n/a |
| OT | RB | 6 | n/a | 4 | YES | no | n/a |
| OG | C | 0 | 0 | 4 | YES | no | 0 |
| OG | OT | 4 | 0 | 4 | YES | no | -4 |
| OG | DT | 4 | n/a | 4 | YES | no | n/a |
| OG | FB | 4 | n/a | 4 | YES | no | n/a |
| OG | RB | 6 | n/a | 4 | YES | no | n/a |
| C | OG | 0 | 0 | 4 | YES | no | 0 |
| C | OT | 4 | 0 | 4 | YES | no | -4 |
| C | DT | 4 | n/a | 4 | YES | no | n/a |
| C | FB | 4 | n/a | 4 | YES | no | n/a |
| C | RB | 6 | n/a | 4 | YES | no | n/a |
| DT | OG | 4 | 3 | 4 | — | no | -1 |
| DT | C | 4 | 2 | 4 | — | no | -2 |
| DT | EDGE | 4 | 3 | 4 | — | no | -1 |
| DT | FB | 4 | 9 | 4 | — | no | 5 |
| DT | OT | 6 | 1 | 4 | — | no | -5 |
| DT | ILB | 4 | 4 | 4 | — | yes | 0 |
| DT | OLB | 4 | 4 | 4 | — | yes | 0 |
| DT | RB | 6 | 4 | 4 | — | no | -2 |
| EDGE | DT | 2 | 3 | 4 | — | no | 1 |
| EDGE | OLB | 0 | 7 | 4 | — | no | 7 |
| EDGE | ILB | 4 | 7 | 4 | — | no | 3 |
| EDGE | FB | 4 | 10 | 4 | — | no | 6 |
| EDGE | TE | 6 | 6 | 4 | — | yes | 0 |
| EDGE | RB | 6 | 7 | 4 | — | no | 1 |
| EDGE | NICKEL | 6 | 6 | 4 | — | yes | 0 |
| ILB | ILB | 0 | 0 | 0 | — | yes | 0 |
| ILB | OLB | 0 | 1 | 4 | — | no | 1 |
| ILB | DT | 4 | 4 | 4 | — | yes | 0 |
| ILB | FB | 4 | 6 | 4 | — | no | 2 |
| ILB | EDGE | 6 | 7 | 4 | — | no | 1 |
| ILB | TE | 6 | 0 | 4 | — | no | -6 |
| ILB | SS | 6 | 1 | 4 | — | no | -5 |
| ILB | FS | 6 | 0 | 4 | — | no | -6 |
| ILB | NICKEL | 6 | 1 | 4 | — | no | -5 |
| ILB | DIME | 6 | 6 | 4 | — | yes | 0 |
| OLB | OLB | 0 | 0 | 0 | — | yes | 0 |
| OLB | ILB | 2 | 1 | 4 | — | no | -1 |
| OLB | EDGE | 4 | 7 | 4 | — | no | 3 |
| OLB | NICKEL | 4 | 1 | 4 | — | no | -3 |
| OLB | DT | 6 | 4 | 4 | — | no | -2 |
| OLB | TE | 6 | 1 | 4 | — | no | -5 |
| OLB | SS | 6 | 0 | 4 | — | no | -6 |
| OLB | FS | 6 | 1 | 4 | — | no | -5 |
| OLB | FB | 6 | 5 | 4 | — | no | -1 |
| OLB | DIME | 6 | 5 | 4 | — | no | -1 |
| SS | NICKEL | 0 | 1 | 4 | — | no | 1 |
| SS | DIME | 0 | 5 | 4 | — | no | 5 |
| SS | FS | 2 | 1 | 4 | — | no | -1 |
| SS | OLB | 4 | 0 | 4 | — | no | -4 |
| SS | CB | 6 | 5 | 4 | — | no | -1 |
| SS | ILB | 6 | 1 | 4 | — | no | -5 |
| SS | WR | 6 | 6 | 4 | — | yes | 0 |
| SS | TE | 6 | 1 | 4 | — | no | -5 |
| SS | RB | 6 | 0 | 4 | — | no | -6 |
| SS | FB | 6 | 5 | 4 | — | no | -1 |
| FS | NICKEL | 0 | 1 | 4 | — | no | 1 |
| FS | DIME | 0 | 6 | 4 | — | no | 6 |
| FS | SS | 2 | 1 | 4 | — | no | -1 |
| FS | CB | 4 | 5 | 4 | — | no | 1 |
| FS | WR | 4 | 5 | 4 | — | no | 1 |
| FS | ILB | 4 | 0 | 4 | — | no | -4 |
| FS | OLB | 4 | 1 | 4 | — | no | -3 |
| FS | TE | 6 | 0 | 4 | — | no | -6 |
| FS | RB | 6 | 1 | 4 | — | no | -5 |
| CB | FS | 0 | 5 | 4 | — | no | 5 |
| CB | NICKEL | 0 | 4 | 4 | — | no | 4 |
| CB | DIME | 0 | 10 | 4 | — | no | 10 |
| CB | SS | 2 | 5 | 4 | — | no | 3 |
| CB | WR | 4 | 1 | 4 | — | no | -3 |
| CB | ILB | 6 | 5 | 4 | — | no | -1 |
| CB | OLB | 4 | 5 | 4 | — | no | 1 |
| CB | TE | 6 | 5 | 4 | — | no | -1 |
| CB | RB | 6 | 6 | 4 | — | yes | 0 |
| K | P | 0 | 3 | 4 | — | no | 3 |
| P | K | 4 | 3 | 4 | — | no | -1 |

## Mismatches vs Rule A (flex.json penalty != win-cost cap)
| RB->FB | flex.json 2 | ruleA 5 | diff +3 | weights RB=230 FB=30 | winCost -0.5080 wins |
| RB->WR | flex.json 4 | ruleA 6 | diff +2 | weights RB=230 WR=470 | winCost 0.6096 wins |
| RB->TE | flex.json 6 | ruleA 1 | diff -5 | weights RB=230 TE=270 | winCost 0.1016 wins |
| FB->RB | flex.json 4 | ruleA 5 | diff +1 | weights FB=30 RB=230 | winCost 0.5080 wins |
| FB->TE | flex.json 4 | ruleA 6 | diff +2 | weights FB=30 TE=270 | winCost 0.6096 wins |
| WR->RB | flex.json 4 | ruleA 6 | diff +2 | weights WR=470 RB=230 | winCost -0.6096 wins |
| WR->TE | flex.json 4 | ruleA 5 | diff +1 | weights WR=470 TE=270 | winCost -0.5080 wins |
| WR->SS | flex.json 4 | ruleA 6 | diff +2 | weights WR=470 SS=240 | winCost -0.5842 wins |
| WR->FS | flex.json 4 | ruleA 5 | diff +1 | weights WR=470 FS=260 | winCost -0.5334 wins |
| WR->NICKEL | flex.json 4 | ruleA 5 | diff +1 | weights WR=470 NICKEL=280 | winCost -0.4826 wins |
| WR->DIME | flex.json 4 | ruleA 10 | diff +6 | weights WR=470 DIME=40 | winCost -1.0922 wins |
| WR->CB | flex.json 6 | ruleA 1 | diff -5 | weights WR=470 CB=450 | winCost -0.0508 wins |
| TE->WR | flex.json 2 | ruleA 5 | diff +3 | weights TE=270 WR=470 | winCost 0.5080 wins |
| TE->FB | flex.json 2 | ruleA 6 | diff +4 | weights TE=270 FB=30 | winCost -0.6096 wins |
| TE->RB | flex.json 4 | ruleA 1 | diff -3 | weights TE=270 RB=230 | winCost -0.1016 wins |
| TE->C | flex.json 6 | ruleA 1 | diff -5 | weights TE=270 C=320 | winCost 0.1270 wins |
| TE->OG | flex.json 6 | ruleA 1 | diff -5 | weights TE=270 OG=290 | winCost 0.0508 wins |
| TE->OT | flex.json 6 | ruleA 4 | diff -2 | weights TE=270 OT=430 | winCost 0.4064 wins |
| TE->DT | flex.json 6 | ruleA 3 | diff -3 | weights TE=270 DT=400 | winCost 0.3302 wins |
| TE->ILB | flex.json 6 | ruleA 0 | diff -6 | weights TE=270 ILB=260 | winCost -0.0254 wins |
| TE->OLB | flex.json 6 | ruleA 1 | diff -5 | weights TE=270 OLB=240 | winCost -0.0762 wins |
| TE->SS | flex.json 6 | ruleA 1 | diff -5 | weights TE=270 SS=240 | winCost -0.0762 wins |
| TE->FS | flex.json 6 | ruleA 0 | diff -6 | weights TE=270 FS=260 | winCost -0.0254 wins |
| TE->NICKEL | flex.json 6 | ruleA 0 | diff -6 | weights TE=270 NICKEL=280 | winCost 0.0254 wins |
| DT->OG | flex.json 4 | ruleA 3 | diff -1 | weights DT=400 OG=290 | winCost -0.2794 wins |
| DT->C | flex.json 4 | ruleA 2 | diff -2 | weights DT=400 C=320 | winCost -0.2032 wins |
| DT->EDGE | flex.json 4 | ruleA 3 | diff -1 | weights DT=400 EDGE=520 | winCost 0.3048 wins |
| DT->FB | flex.json 4 | ruleA 9 | diff +5 | weights DT=400 FB=30 | winCost -0.9398 wins |
| DT->OT | flex.json 6 | ruleA 1 | diff -5 | weights DT=400 OT=430 | winCost 0.0762 wins |
| DT->RB | flex.json 6 | ruleA 4 | diff -2 | weights DT=400 RB=230 | winCost -0.4318 wins |
| EDGE->DT | flex.json 2 | ruleA 3 | diff +1 | weights EDGE=520 DT=400 | winCost -0.3048 wins |
| EDGE->OLB | flex.json 0 | ruleA 7 | diff +7 | weights EDGE=520 OLB=240 | winCost -0.7112 wins |
| EDGE->ILB | flex.json 4 | ruleA 7 | diff +3 | weights EDGE=520 ILB=260 | winCost -0.6604 wins |
| EDGE->FB | flex.json 4 | ruleA 10 | diff +6 | weights EDGE=520 FB=30 | winCost -1.2446 wins |
| EDGE->RB | flex.json 6 | ruleA 7 | diff +1 | weights EDGE=520 RB=230 | winCost -0.7366 wins |
| ILB->OLB | flex.json 0 | ruleA 1 | diff +1 | weights ILB=260 OLB=240 | winCost -0.0508 wins |
| ILB->FB | flex.json 4 | ruleA 6 | diff +2 | weights ILB=260 FB=30 | winCost -0.5842 wins |
| ILB->EDGE | flex.json 6 | ruleA 7 | diff +1 | weights ILB=260 EDGE=520 | winCost 0.6604 wins |
| ILB->TE | flex.json 6 | ruleA 0 | diff -6 | weights ILB=260 TE=270 | winCost 0.0254 wins |
| ILB->SS | flex.json 6 | ruleA 1 | diff -5 | weights ILB=260 SS=240 | winCost -0.0508 wins |
| ILB->FS | flex.json 6 | ruleA 0 | diff -6 | weights ILB=260 FS=260 | winCost 0.0000 wins |
| ILB->NICKEL | flex.json 6 | ruleA 1 | diff -5 | weights ILB=260 NICKEL=280 | winCost 0.0508 wins |
| OLB->ILB | flex.json 2 | ruleA 1 | diff -1 | weights OLB=240 ILB=260 | winCost 0.0508 wins |
| OLB->EDGE | flex.json 4 | ruleA 7 | diff +3 | weights OLB=240 EDGE=520 | winCost 0.7112 wins |
| OLB->NICKEL | flex.json 4 | ruleA 1 | diff -3 | weights OLB=240 NICKEL=280 | winCost 0.1016 wins |
| OLB->DT | flex.json 6 | ruleA 4 | diff -2 | weights OLB=240 DT=400 | winCost 0.4064 wins |
| OLB->TE | flex.json 6 | ruleA 1 | diff -5 | weights OLB=240 TE=270 | winCost 0.0762 wins |
| OLB->SS | flex.json 6 | ruleA 0 | diff -6 | weights OLB=240 SS=240 | winCost 0.0000 wins |
| OLB->FS | flex.json 6 | ruleA 1 | diff -5 | weights OLB=240 FS=260 | winCost 0.0508 wins |
| OLB->FB | flex.json 6 | ruleA 5 | diff -1 | weights OLB=240 FB=30 | winCost -0.5334 wins |
| OLB->DIME | flex.json 6 | ruleA 5 | diff -1 | weights OLB=240 DIME=40 | winCost -0.5080 wins |
| SS->NICKEL | flex.json 0 | ruleA 1 | diff +1 | weights SS=240 NICKEL=280 | winCost 0.1016 wins |
| SS->DIME | flex.json 0 | ruleA 5 | diff +5 | weights SS=240 DIME=40 | winCost -0.5080 wins |
| SS->FS | flex.json 2 | ruleA 1 | diff -1 | weights SS=240 FS=260 | winCost 0.0508 wins |
| SS->OLB | flex.json 4 | ruleA 0 | diff -4 | weights SS=240 OLB=240 | winCost 0.0000 wins |
| SS->CB | flex.json 6 | ruleA 5 | diff -1 | weights SS=240 CB=450 | winCost 0.5334 wins |
| SS->ILB | flex.json 6 | ruleA 1 | diff -5 | weights SS=240 ILB=260 | winCost 0.0508 wins |
| SS->TE | flex.json 6 | ruleA 1 | diff -5 | weights SS=240 TE=270 | winCost 0.0762 wins |
| SS->RB | flex.json 6 | ruleA 0 | diff -6 | weights SS=240 RB=230 | winCost -0.0254 wins |
| SS->FB | flex.json 6 | ruleA 5 | diff -1 | weights SS=240 FB=30 | winCost -0.5334 wins |
| FS->NICKEL | flex.json 0 | ruleA 1 | diff +1 | weights FS=260 NICKEL=280 | winCost 0.0508 wins |
| FS->DIME | flex.json 0 | ruleA 6 | diff +6 | weights FS=260 DIME=40 | winCost -0.5588 wins |
| FS->SS | flex.json 2 | ruleA 1 | diff -1 | weights FS=260 SS=240 | winCost -0.0508 wins |
| FS->CB | flex.json 4 | ruleA 5 | diff +1 | weights FS=260 CB=450 | winCost 0.4826 wins |
| FS->WR | flex.json 4 | ruleA 5 | diff +1 | weights FS=260 WR=470 | winCost 0.5334 wins |
| FS->ILB | flex.json 4 | ruleA 0 | diff -4 | weights FS=260 ILB=260 | winCost 0.0000 wins |
| FS->OLB | flex.json 4 | ruleA 1 | diff -3 | weights FS=260 OLB=240 | winCost -0.0508 wins |
| FS->TE | flex.json 6 | ruleA 0 | diff -6 | weights FS=260 TE=270 | winCost 0.0254 wins |
| FS->RB | flex.json 6 | ruleA 1 | diff -5 | weights FS=260 RB=230 | winCost -0.0762 wins |
| CB->FS | flex.json 0 | ruleA 5 | diff +5 | weights CB=450 FS=260 | winCost -0.4826 wins |
| CB->NICKEL | flex.json 0 | ruleA 4 | diff +4 | weights CB=450 NICKEL=280 | winCost -0.4318 wins |
| CB->DIME | flex.json 0 | ruleA 10 | diff +10 | weights CB=450 DIME=40 | winCost -1.0414 wins |
| CB->SS | flex.json 2 | ruleA 5 | diff +3 | weights CB=450 SS=240 | winCost -0.5334 wins |
| CB->WR | flex.json 4 | ruleA 1 | diff -3 | weights CB=450 WR=470 | winCost 0.0508 wins |
| CB->ILB | flex.json 6 | ruleA 5 | diff -1 | weights CB=450 ILB=260 | winCost -0.4826 wins |
| CB->OLB | flex.json 4 | ruleA 5 | diff +1 | weights CB=450 OLB=240 | winCost -0.5334 wins |
| CB->TE | flex.json 6 | ruleA 5 | diff -1 | weights CB=450 TE=270 | winCost -0.4572 wins |
| K->P | flex.json 0 | ruleA 3 | diff +3 | weights K=200 P=100 | winCost -0.2540 wins |
| P->K | flex.json 4 | ruleA 3 | diff -1 | weights P=100 K=200 | winCost 0.2540 wins |

## Effectively banned pairs (QB/OL; flex.json still lists them)
| QB->FS | flex.json 10 | unified: banned |
| OT->DT | flex.json 4 | unified: banned |
| OT->FB | flex.json 4 | unified: banned |
| OT->RB | flex.json 6 | unified: banned |
| OG->DT | flex.json 4 | unified: banned |
| OG->FB | flex.json 4 | unified: banned |
| OG->RB | flex.json 6 | unified: banned |
| C->DT | flex.json 4 | unified: banned |
| C->FB | flex.json 4 | unified: banned |
| C->RB | flex.json 6 | unified: banned |

## Free OL swaps preserved (exception to the OL ban)
| OT->OG | flex.json 0 | unified: 0 (free OL swap) |
| OT->C | flex.json 0 | unified: 0 (free OL swap) |
| OG->C | flex.json 0 | unified: 0 (free OL swap) |
| OG->OT | flex.json 4 | unified: 0 (free OL swap) |
| C->OG | flex.json 0 | unified: 0 (free OL swap) |
| C->OT | flex.json 4 | unified: 0 (free OL swap) |

## Interpretation
Rule A prices each flex at its true win cost, hard-capped at 10: downgrades are cheap, upgrades (e.g. TE->WR1) cost proportionally. Rule B (min(12,4xhops)) is topology-based and ignores win value, so a cheap downgrade can still cost 4-8. Neither rule equals flex.json everywhere: flex.json keeps Owner exceptions (QB->FS 10, EDGE->OLB 0, OT<->OG 0, ...). Recommended unified rule: Rule A + carried-over Owner exceptions, with QB/OL banned per PART-1. Flex.json is the Owner's word; this tool only measures deviation, it does not override.
