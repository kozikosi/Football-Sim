# Flex capped at -10 + raised lower position weights (EXPERIMENT, NOT adopted)

Owner words: `_agents/owner-notes/2026-11-07-flex-cap-10-verbatim.md`. Supersedes the "tuned table / cap 14" question of `2026-11-07-owner-flex-answer-and-star-scan.md`. `flex.json`, `FLEX`, `slots.ts`, `design.json` are UNCHANGED.
Tool: `tools/mathlab/flexcap.mjs` (run from `colors/`; real `lineupFor`, CPU drafters re-run, seeds 1001-1016 tune, 3001-3016 fresh; FLEX/SLOTS mutated in memory only). Results: `tools/mathlab/results/flexcap10-2026-11-07.json` (tuned, loop), `flexcap10-fixed600-2026-11-07.json` (fixed set below).

## Table used (VERIFIED, 43 rules changed)
Candidate of 7 Nov + his answers CB>WR, TE>WR; every penalty of 6 or 12 -> 10; every 0/2/4 untouched.

## 1. Pairwise answer to his question (INFERRED from the engine's objective, w_nat x ovr >= w_dest x (ovr-10))
A star stays natural iff natural weight >= dest weight x (1 - 10/ovr); worst case is the best player of the role. Rounded up to 50:
- vs WR1 / DE1 650 (-10): need **600**. TE1 250->600 (McBride 99), RB1 250->600 (Bijan 98), CB1 400->600 (Gonzalez 98), OG1 400->600 (Thuney 96), DT1 500->600 (Brown 96), MIKE 300->600 (Warner 98), WILL 150->600 (Baun 93), SS 300->600, FS 300->600.
- vs OT1 500 (-10): need **450**. C 150->450 (Humphrey 96). OT1 itself (Sewell 98) needs 600 vs DE1 650 only if OT>EDGE stays at 10; he said leave OT1 500.
- FB (Juszczyk 88, weight 25) would need 600: left frozen, see section 3.

## 2. Real engine, fixed set (TE1, RB1, CB1, DT1, OG1, SS, FS, MIKE, WILL = 600; C = 450; WR1/DE1/OT1/FB unchanged)
- Before any weight change (cap only): 229 stars placed through a -10 rule into a heavier spot in 1,024 lineups (RB>WR1 93, TE>DE1 32, TE>OT1 18 ...). (the 7 Nov scan had McBride at WR1 in 17 of 24 lineups at TE>WR 6.)
- With the set: **5** such placements (tune), **7** (fresh): RB>WR1 (Gibbs 97, CMC 97: 600 vs 650 loses when the team's WR1 is weak; RB1 650 would end it), DT>DE1 (Lawrence, Vea), FB>WILL. McBride 59/64 TE1 (rest TE>RB1/SS/FS at -4), Bowers 59/64, Kittle 60/64, Kelce 57/64, Bijan 56-58/64 RB1, Gibbs 60, Gonzalez 60 CB1, Thuney 61, Warner 60, Brown 48 DT1, Baun 52 WILL.
- Chasing zero with the loop (steps of 50, chain allowed) converges to C 300, OG1 650, TE1 600, RB1 650, DT1 650, MIKE 600, WILL 350, CB1 500, FS 500, SS 600 but leaves 1-7 cases and makes CB>SS -2 (Gonzalez at SS 33/64) and OLB>MIKE -2 (Baun at MIKE 64/64) worse. The fixed set is the better answer.

## 3. Problems caused by the 2s and 4s he asked to hear about (VERIFIED, fixed set, per 1,024 lineups)
1. **C>OG -4 and C>DT -4**: Humphrey plays OG1 at -4 in 29/64 and DT1 at -4 in 9/64 (C 450 vs OG1/DT1 600). Needs C ~575-600 or those two rules at 10 (cap).
2. DT>OG -4: Brown at OG1 in 16/64. OT>DT -4: Wirfs/Williams at DT1 (7).
3. FB 88 (Juszczyk): TE1 at -4 (43 placements), RB1 at -2 (20), WILL/DE1/DT at -10. A one-man artefact: an 88 fullback has no natural slot worth > 25.
4. Second stars (a role's 2nd 85+ player has no top slot): WR>TE1 -4 (74: Williams, Nabers), WR>SS -4 (30), WR>CB1 -4 (22), EDGE>WILL -2 (95), EDGE>DT1 -2 (23), RB>TE2 -10 (9). These grow when TE1/SS/CB1 go to 600 (second-star total 161 before, 345 after). Cheap fix: WR>TE/SS/FS/CB 4 -> 10.
5. OLB>MIKE -2: Baun at MIKE in 12/64 (WILL 600 = MIKE 600).

## 4. Consequence the Owner should weigh (INFERRED)
His 6 Nov salary weights are PERMANENT and the engine specs are fitted so measured slotWinsPerOvr is within 26 of each weight. Setting TE1 600 (was 250 = $10M) and so on makes the lineup optimiser value TE1 2.4x per OVR while the engine's wins still follow the old numbers, so the model would over-pay TE/RB/CB/OG in the draft and lineups. Options: (a) adopt as model weights and re-run `calibrate-weights.mjs` (the engine would then be refitted to a TE1 that matters as much as WR1), (b) keep win weights and use a separate selection weight for the lineup solver only, (c) keep the weights and use the flex table instead (previous tuned table / cap 14). NOT measured: the wins and standings effect of any of these.

## Questions (default in bold)
1. Weights: **(b) selection-only weights at the fixed set**, (a) adopt and refit, or (c) back to a flex-table fix.
2. C>OG and C>DT: **10 (cap), outside his 2s/4s** or C to 600.
3. WR>TE/SS/FS/CB at 4: **10** or leave.
4. FB: **leave** (Juszczyk artefact) or raise FB.
5. RB1 650 (ends RB>WR1 but pulls TE/FB 4-rules into RB1): **600**.
