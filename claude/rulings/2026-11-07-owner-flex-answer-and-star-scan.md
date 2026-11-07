# Owner flex answer of 7 Nov 2026 and the 85+ off-role scan (NOT adopted)

## Owner said (verbatim, 7 Nov)
"Cb to wr -10. TE to WR -6. Any other weird cases where an 85+ player is encouraged to play out of position. I'm worried about Trey McBride and bowers. I do think McBride. Let's make TE to WR -6. Is that enough to discourage McBride from being encouraged to play WR1. I do think he's worth 92/93 OVR as a receiver. Is anyone 85+ encouraged to FLEX to WR1, DE1, or OT1 or any other position instead of their natural position. If so, you have my permission to increase the flex penalties (still keep them divisible by 2) until there are no more such cases."
The 7 open items of `2026-11-07-owner-flex-table-review.md` are still unanswered (defaults in force). `flex.json` / `FLEX` are UNCHANGED.

## Findings (VERIFIED: engine `lineupFor`, FLEX mutated in memory, drafts re-run per table; tools `flexscan.mjs`, `flextune.mjs`)
- At CB>WR 10, TE>WR 6: -6 is NOT enough. Seeds 1001-1012 (768 lineups): McBride (TE 99) plays WR1 in 17, DE1 in 5, TE1 in 2 of 24 lineups; Bowers WR1 15; Kittle WR1 14 (+DE1 7); Kelce WR1 7, WR2 8. 1,012 of 4,800 star placements are off-role.
- Raising TE>WR alone (CB>WR 10, seeds 1001-1008): TE at WR1 39 (at 6), 20 (8), 10 (10), 0 (14). McBride at WR1 9/24 at 6, 10 at 8, 8 at 10, 0 at 12 and 14. But the stars then move elsewhere (McBride DE1 -10, OT1 -12, SS), so one rule is whack-a-mole.
- Literal "no more cases" (tuned on seeds 1001-1008; promotion = penalised off-role star in a spot heavier than the best spot of his own role; OLB>ILB left alone as the Owner's LB interchange; cap 20): `tools/mathlab/results/flex-tuned-2026-11-07.json`. 34 rules rise, e.g. TE>WR 6->16, CB>WR 10->16, RB>WR 10->20, SS/FS>WR 6->14, TE>OT/EDGE 20, C>OG/OT/DT 4/6/4->20, DT>EDGE 6->14, ILB/OLB>EDGE 6->16, OG>OT 4->16. Result: 0 promotions on the tune seeds; on fresh seeds 3001-3016 15 remain, all at the 20 cap (FB>OLB 7, C>OT 6, FB>TE 1, FB>ILB 1). Raising further cannot help: rule 2 (every rostered player plays) puts a surplus FB or C in some spot at any price.
- Cost of the literal result: it removes the Owner's designed C->OG 4, OG->OT 4, DT/OG->EDGE moves in practice (they become -14 to -20). INFERRED: flex volume falls well below the 0.92x measured for his table (not measured).

## Needs the Owner (default in bold)
1. **Adopt the tuned table as is** / cap at 14 (stars may still flex a little at C/OG/FB) / keep his table with only TE>WR 14 and CB>WR 10 (McBride leaves WR1 in these runs; DE1/OT1/SS cases remain).
2. His 92/93 reading of McBride needs TE>WR 6; this scan says 6 puts him at WR1 on most teams. Higher means he is worth less than 92/93 as a receiver in the engine.
Until he answers: do not touch `flex.json` / `FLEX`; then write both, re-pin the flex hash, rewrite the 7 pinned tests.
