# P-294 flex under model-first: evidence and proposal (NOT adopted), 8 Nov 2026

## Owner direction, 8 Nov (REPORTED, Project chat)
Flex is model-first, but his own flex rules stay available as a later option. He likes the -2 / -4 / -10 system and would move -10 to -12 only if it keeps a lot more people at their natural position. He lifted the flex HOLD for the P-294 re-derivation work (price the theta formula, re-derive the table from the measured curve, report evidence + proposal). Adoption is still his pick. `flex.json`, `FLEX`, `slots.ts`, `design.json` are UNCHANGED in this slice.

## 1. Theta formula: UNKNOWN, not priced
The only mentions are Z.ai's T6 / "theta flex formula" in `inbox/20261108-1200-architect-to-zai-ciccp3-answers.md`. VERIFIED: no definition of it in this branch or in `council/zai` (text grep for theta/trait-weighted/flex formula). I will not invent it. Needs: Z.ai (or the Owner) sends the formula (inputs, output, unit) and I price it with `flexeval.mjs` against the same seeds.

## 2. Method that did NOT work (VERIFIED, discarded)
Pricing a lone star against one heavier spot (stays natural iff P >= X(1 - wNat/wDest)) asks for penalties of 25-85 and flags 135 of 146 pulling pairs. It ignores the player the star displaces; the 7 Nov scan shows -14 already keeps McBride off WR1. Not used as evidence; tool removed.

## 3. Evidence: real engine (VERIFIED, `tools/mathlab/flexeval.mjs`, results `tools/mathlab/results/flexeval-2026-11-08.json`)
`lineupFor` on seeded CPU drafts, both bases. "Encouraged" = an 85+ player placed through a penalty into a spot heavier than his own role's best spot (his 7 Nov worry). Tables: today = flex.json; cap10 = his 7 Nov candidate + CB>WR 10, TE>WR 6 with every penalty >= 6 set to 10 (0/2/4 untouched); cap12 = same with 12. Weights: input = SLOTS (what the solver uses today); measured = `measuredDisplayWeights` (QB 1000, nearest 5). Tune seeds 1001-1016 + 3001-3016 (2,048 lineups); fresh seeds 4001-4016 (1,024 lineups) that nothing was selected on.

| fresh seeds, measured weights | encouraged total | of which via a -10/-12 rule | flex moves per lineup |
|---|---|---|---|
| today (flex.json) | 1319 | 0 | 5.22 |
| cap10 | 870 | 246 | 5.11 |
| cap12 | 787 | 116 | 4.92 |
| cap10 + 12 on 4 rules | 812 | 183 | 5.06 |

Tune seeds, measured: today 2657, cap10 1761, cap12 1542, targeted 1628. Input weights give the same picture (fresh: 1347 / 791 / 755 / 766).

## 4. Reading (INFERRED from those counts)
- The -2/-4/-10 system helps a lot: cap10 removes ~34% of encouraged placements vs today's table (fresh, measured 1319 -> 870; tune 2657 -> 1761), cap12 ~40% (787).
- -12 over -10 helps a little, not "a lot": -10% of the total (870 -> 787 fresh; -12% on tune), and it halves the placements through the 10/12 rules (246 -> 116). It costs a bit of flex volume (5.11 -> 4.92) and the 2/4 cases grow slightly (466 -> 499) because stars displaced from one spot land in a cheaper one.
- Four rules carry the gain: RB>WR (RB1 into WR1/WR2), TE>EDGE (DE1), TE>OT (OT1), DT>EDGE. Setting only those to 12 gets ~60-70% of the cap12 gain (fresh 870 -> 812 vs 787) while leaving 48 rules at 10. Selection used the tune seeds; the fresh column is out of sample.
- What remains is mostly his own 2/4 design, not the cap: C>OG1 -4 (~200 lineups of 2,048), OG>OT1 -4 (~190), OLB>MIKE -2 (~155), C>DT1 -4 (~105), EDGE>DT1 -2 and DT>OG1 -4 as second stars. No rule at 10/12 fixes those; that needs a weight change (the 7 Nov cap-10 experiment) or leaving them as designed.
- Measured vs input weights moves the totals by 4-10% and leaks the same rules: the flex table does not need a different solver weight set. Which rules leak is set by the table, not by input-vs-measured.

## 5. Proposal (for the Owner to pick)
1. Flex mode = data, two tables: `model` (this proposal) and `owner` (flex.json REV 4, kept as the fallback he asked for). A switch in the engine, default `model`. Not built.
2. `model` table = `tools/mathlab/flex-model-first-proposal-2026-11-08.json`: his 2/4 untouched, every former 6+ rule at 10, and 12 on RB>WR, TE>EDGE, TE>OT, DT>EDGE. Default pick; alternative: all 12 (787 vs 812 fresh) or all 10.
3. Leave the 2/4 residuals alone unless he wants C>OG/DT or OG>OT at 10.

## 6. Not measured / UNKNOWN / before adopting
- UNKNOWN: wins and standings effect of any table (counts only). Earlier run (7 Nov) showed lineup value moves 0.28 wins/team for a stricter table.
- 10 and 12 exceed EMERGENCY_PENALTY 8, so a listed move costs more than an unlisted one (7 Nov open item 5): emergency placements were 0 in these runs, but not re-checked for roster-fill (every-player-plays) cases.
- On adoption: `flexcheck.mjs` (allows only 0/2/4/6) and the 7 pinned tests change; re-pin the flex hash (`versions.test.ts`, MERGE-MANIFEST); `npm test`, `npm run tsc:check`.
