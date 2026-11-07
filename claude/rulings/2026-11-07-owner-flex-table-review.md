# Flex table, Owner working version of 7 Nov 2026: Architect review (NOT adopted)

Source (verbatim): `_agents/owner-notes/2026-11-07-flex-table-verbatim.txt`. Encoding: `tools/mathlab/flex-candidate-2026-11-07.json`.
`tools/mathlab/flex.json` and `FLEX` (protected) are UNCHANGED until the Owner answers the open items below.
Method: scratch copy of `colors/src` with the candidate FLEX; the engine's own `lineupFor`, drafts seeded 1001-1012 (384 rosters, 768 lineups over both bases). All numbers VERIFIED by those runs unless labelled.

## Result
- Flex volume is NOT inflated. Off-role placements (free flexes counted): 8.39 -> 7.74 per lineup, ratio 0.92 (flag line was 1.3x). Full re-drafts under each table: same picture. Counting only penalised moves gives 1.20 (same rosters), but that metric ignores the old free moves (EDGE->OLB 0, C->OG 0).
- Cost: same rosters lose 0.28 wins/team on average (lineup value, p5 -0.70, p95 -0.01) because the table is stricter. Only 3 of 384 lineup pairs are identical, so every team's lineup shifts.
- CB->WR1 (the 6 Nov finding): 62 -> 36 lineups of 768 (8% -> 4.7%). Still happens at CB->WR 6; RB->WR1 falls 152 -> 39.
- Biggest drops: C->OG 366 -> 103, OG->C 424 -> 299, DT->SAM 81 -> 0, DT->MIKE 47 -> 0. Biggest rises: DT->TE3 (at 10) 0 -> 105, RB->SS 0 -> 59, SS/FS->SAM 17 -> 116, RB->FB 185 -> 260.
- Existing tests under the candidate: 277 of 284 pass. The 7 failures are pinned to the old table or old numbers (typed-table equals flex.json; "every penalty is 0/2/4/6"; Owner rulings of 28/29 Oct; DL5 prices; two-hop arbitrage 13 > 12; base totals in the 3-4 test; engine stamp). Expected, not bugs; they get rewritten when values are adopted.

## OPEN: needs the Owner (each has the default the Architect would use)
1. EDGE row lists 13 penalties for 12 destinations. INFERRED reading (one surplus 6): DT 2, SAM 2, WILL 2, MIKE 6, C 6, OG 6, OT 6, SS 6, FS 6, RB 6, FB 2, TE 6.
2. QB row says None. The 29 Oct ruling (QB may flex only to FS at -10) is in force. Default: keep FS -10.
3. SAM / MIKE / WILL as separate rows: the engine has only ILB and OLB roles, so SAM and WILL collapse to OLB and MIKE to ILB. WILL->MIKE 2 and SAM->MIKE 4 become OLB->ILB 2 (cheaper). Default: 2.
4. NICKEL and DIME are not in the table. Default: every existing NICKEL/DIME entry stays (CB/SS/FS free, WR 4, others as before).
5. Penalties of 10 and 12 (18 rules: RB->WR/TE, WR->RB, TE->C/OG/OT/DT/ILB/EDGE/OLB, FB->EDGE/DT, OT/OG->EDGE, DT->TE, SS/CB->RB) exceed the -8 emergency fallback, so a listed move costs more than an unlisted one. Effects: the rule-2 "every rostered player plays" makes a DT sit at TE3 at -10 (105 lineups) and an RB at WR4 at -10 (99); players below the 70 replacement rating cost 0.015 -> 0.032 wins per lineup (small). Options: keep as is (default), cap listed at 8, or raise the emergency to 12.
6. Unlisted now means -8: dropped from the old table were DT->ILB/OLB/RB, ILB/OLB->DT, ILB/OLB->FS, CB->ILB/OLB/TE, FS->ILB/TE/RB, SS->FB, C/OT/OG->RB. Confirm the table is complete (default: yes).
7. C->OG is now 4 (was free; OG->C and OT->C stay free, C->OT 6). Noted only; it follows the table.

## When adopted
Update `flex.json` and `flex.ts` together, re-pin the flex hash (engine stamp in `versions.test.ts`, MERGE-MANIFEST), rewrite the 7 pinned tests, run `npm test` and `npm run tsc:check`.
