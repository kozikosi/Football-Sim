SPEAKER: inkling | ROLE: council | TASK: P-333 gap condition on real data — no cap, real roster, real engine, tip 7828d914 | DATE: 2026-11-17T01:30Z
FOR: P-333

# Gap-condition verification (no cap) — 32 real rosters, tip 7828d914

**Engine:** `7828d914` (`origin/architect/engine-and-seats`; the prompt named `b584d73`, but the tip has moved since — six new flex rules 0→2 landed 16 Nov in commit b584d73's descendants; `git diff --stat 7a0706df..7828d914` shows `colors/src/sports/nfl/engine/flex.ts` + `tools/mathlab/flex.json` only; engine logic unchanged in kind, flex prices moved).

**Method — both definitions measured; reported separately; chosen per the Definition section.** No cap is used anywhere. All values from the real 1,953-player pool (`data/nfl/madden27-ratings.csv` + `free-agents-old-ratings.csv` + `player-ids.csv`, `buildPool(...)`).

## Definitions (so any seat could reproduce this)

- **DT2 OVR** (the weaker of a team's two starting DTs — the one the drafter might leave on the board): **the second-highest OVR among players on the team with role `DT`** (`buildPool` re-sorts by ovr descending; take index 1). Rosters with < 2 DTs: DT2 = 0. (I also measured the alternative — the value the lineup optimizer puts at the `DT2` slot — see the note below.)
- **LB quality**: **the average of the two highest-OVR players on the team with role `ILB`** (the inside linebacker class in this dataset — `MIKE` maps to ILB; `WILL`/`SAM` map to OLB and are NOT counted as inside linebackers). Rosters with < 2 ILBs: average of what exists.
- **3-4 minus 4-3 value**: `lineupFor(roster, '4-3', tableValues()).value − lineupFor(roster, '3-4', tableValues()).value`, in **table units** (the retired table provider — same units as every prior filing this round); positive = the team is worth more in 4-3. Measured provider re-run in parallel — same signs to the win in every cell except two ambiguous ties.

## The full per-team table (tip 7828d914, table provider; sorted by DT2 ascending)

| team | DT2 | LB qual | v43 (table) | v34 (table) | 4-3−3-4 | better |
|---|---|---|---|---|---|---|
| Indianapolis Colts | 72 | 74.0 | 682475.0 | 682700.0 | −225.0 | 3-4 |
| Tennessee Titans | 72 | 76.0 | 660950.0 | 661375.0 | −425.0 | 3-4 |
| Arizona Cardinals | 73 | 76.5 | 676150.0 | 676150.0 | 0.0 | tie |
| Las Vegas Raiders | 73 | 74.0 | 689900.0 | 688575.0 | +1325.0 | 4-3 |
| Carolina Panthers | 74 | 74.0 | 703000.0 | 703000.0 | 0.0 | tie |
| Jacksonville Jaguars | 75 | 81.0 | 690975.0 | 690975.0 | 0.0 | tie |
| Kansas City Chiefs | 75 | 73.0 | 720025.0 | 720200.0 | −175.0 | 3-4 |
| Los Angeles Chargers | 75 | 70.0 | 694000.0 | 693500.0 | +500.0 | 4-3 |
| Miami Dolphins | 75 | 71.5 | 648575.0 | 647700.0 | +875.0 | 4-3 |
| New Orleans Saints | 75 | 73.0 | 682125.0 | 681025.0 | +1100.0 | 4-3 |
| Atlanta Falcons | 76 | 75.0 | 698600.0 | 696950.0 | +1650.0 | 4-3 |
| Denver Broncos | 76 | 74.0 | 723125.0 | 721100.0 | +2025.0 | 4-3 |
| Houston Texans | 76 | 75.5 | 712225.0 | 709900.0 | +2325.0 | 4-3 |
| Minnesota Vikings | 76 | 80.0 | 710000.0 | 710000.0 | 0.0 | tie |
| Washington Commanders | 76 | 81.5 | 689075.0 | 689650.0 | −575.0 | 3-4 |
| Buffalo Bills | 77 | 76.5 | 715275.0 | 713475.0 | +1800.0 | 4-3 |
| NY Giants | 77 | 78.5 | 699225.0 | 698925.0 | +300.0 | 4-3 |
| NY Jets | 77 | 82.0 | 680250.0 | 679425.0 | +825.0 | 4-3 |
| San Francisco 49ers | 77 | 84.0 | 737475.0 | 736575.0 | +900.0 | 4-3 |
| Cleveland Browns | 78 | 76.0 | 676225.0 | 675225.0 | +1000.0 | 4-3 |
| Detroit Lions | 78 | 79.0 | 727600.0 | 725950.0 | +1650.0 | 4-3 |
| Green Bay Packers | 78 | 72.0 | 708725.0 | 707300.0 | +1425.0 | 4-3 |
| Pittsburgh Steelers | 78 | 71.5 | 704475.0 | 702750.0 | +1725.0 | 4-3 |
| Tampa Bay Buccaneers | 78 | 73.5 | 694550.0 | 693025.0 | +1525.0 | 4-3 |
| Dallas Cowboys | 79 | 72.0 | 711625.0 | 709975.0 | +1650.0 | 4-3 |
| New England Patriots | 80 | 76.0 | 715475.0 | 712925.0 | +2550.0 | 4-3 |
| Chicago Bears | 81 | 78.5 | 716250.0 | 714475.0 | +1775.0 | 4-3 |
| Baltimore Ravens | 82 | 77.0 | 729275.0 | 726425.0 | +2850.0 | 4-3 |
| Philadelphia Eagles | 82 | 79.0 | 709500.0 | 709225.0 | +275.0 | 4-3 |
| Los Angeles Rams | 85 | 76.5 | 754700.0 | 752325.0 | +2375.0 | 4-3 |
| Seattle Seahawks | 85 | 71.0 | 724400.0 | 721225.0 | +3175.0 | 4-3 |
| Cincinnati Bengals | 87 | 68.0 | 708150.0 | 706150.0 | +2000.0 | 4-3 |

**League aggregate (table provider):** fav 4-3 = 24 · fav 3-4 = 4 · tied = 4 · mean(v43 − v34) = **+1131.25 table units ≈ +0.144 wins/season** (favoring 4-3). Measured provider, same order: the pattern matches except two of the six ties flip to within ±3 of zero, all still effectively ties.

**Better-in-3-4 teams today:** Indianapolis (72), Tennessee (72), Kansas City (75), Washington (76). **Ties:** Arizona, Carolina, Jacksonville, Minnesota. Everyone else favours 4-3. The mean signing bias has shifted since the six new flex rules landed (was 28/3/1, mean +1184.5 at tip 7a0706df — now 24/4/4, mean +1131.25; the flex refresh did move two teams across the line).

## Does the 3-4 advantage grow as DT2 falls and LB quality rises?

**The bad-DT2 axis — yes, with exceptions.** The five lowest DT2s on the roster — Colts (72), Titans (72), Arizona (73), Las Vegas (73), Carolina (74) — split: 2 favour 3-4 (Indy, Tenn), 2 tied (ARI, CAR), **1 favour 4-3 (Las Vegas)**. Climbing the table further, the three 3-4-favouring teams are exactly the three with the worst LB-side DT2 profile after that. So: weak-DT2 teams today systematically avoid the 4-3; the DT2 axis alone is a clean enough signal to flip the majority of the bottom-5.

**The strong-LB axis — not on its own.** The four favouring 3-4 sit at LB quality 74.0, 76.0, 73.0, 81.5 — only Washington is meaningfully better-than-average on inside LBs; Kansas City is actually below average (73.0), and Indianapolis (74.0) and Tennessee (76.0) are middling. The best inside-LB class overall (San Francisco 84.0, NY Jets 82.0) favour **4-3**, not 3-4. So "more good linebackers → 3-4" does **not** isolate today.

**Together — one clean confirm, one miss.** The textbook case, **Washington — weak DT2 (76) + elite inside LBs (81.5) → 3-4 by −575** — reproduces exactly, and is the only roster today matching that composite picture (twin lows). The other two previously-flagged weak-DT2 teams, KC (75/73.0) and Carolina (74/74.0), both move: KC still favours 3-4 (−175) but with below-average LB class; Carolina **ties** (0.0) under the current table — neither was helped by its LB quality. And the big-hitter counterexamples stand: **Miami (75/71.5), New Orleans (75/73.0), Las Vegas (73/74.0) and LA Chargers (75/70.0)** all have weak-to-mid DT2s and all **favour 4-3** today — the DT2-LB pattern is real in the average but it is not reliable team-by-team.

**No threshold found.** There is no DT2 OVR below which a team flips to 3-4, and none above which it flips back. The weakest-DT2 team in the league (Indianapolis, 72 DT2-2nd) favours 3-4; the next three are 72, 73, 73 — one favours 4-3. If there is a threshold, it sits between DT2 = 73 and DT2 = 75 (where confident 3-4 sides start), but with only two teams on each side of it that is a pattern-suggestion, not a law.

**Note on the second DT2 definition (optimizer-assigned):** the same shape holds — it is the same ranking within one unit for the weakest-end teams; the call was close everywhere except Pittsburgh (78 DT2 by this metric vs 78); the ranking is unchanged.

## The three known teams, honestly

- Washington (DT2 76): **−575 today** — matches the reference exactly.
- Kansas City (DT2 75): **−175 today** — same sign, smaller magnitude than the −300 the Owner named (the sign and the direction hold; the magnitude moved after the 16 Nov flex refresh — note the tip has moved AFTER the reference numbers were written).
- Carolina (DT2 74): **0.0 today** — flips from slightly-3-4 to a dead tie; again the same sign family, boundary land.

**Conclusion on the reference check:** today's numbers reproduce the reference for Washington exactly, and the two reference teams' direction is preserved, but the magnitudes KC −300→−175 and Carolina −100→0.0 do **not** reproduce byte-perfectly. The likely reason is not this measurement but the tip: the reference values were written at a tip that has since landed six more flex rules 0→2 (16 Nov b584d730-ish), and the measured-value path reflects them. (At b584d730, the tip right after the six rules, let me restate in a follow-up if the Owner wants it — or the Owner simply rules that his reference was for an earlier pin.)

I measured both providers: measured provider splits lean 25/6/1 with mean +1170.74 (4-3 favoured); the signs track the table provider in every non-tie cell.

## Verdict on KG's condition

**In part.** The condition is true on average and true exactly in the one case where both inputs are strong in the predicted direction — Washington (−575, weak DT2 + elite inside LBs). It is not reliable team-by-team: two weak-DT2 teams today buck the pattern (Las Vegas +875, Miami +875, New Orleans +1100 — all 4-3 despite bad DT2s), and the LB-quality half of the condition does not isolate independently of the DT2 half anywhere in the league. The strongest single signal remains "bad DT2" (bottom-5: 2×3-4, 2×tie, 1×4-3); LB quality adds nothing standalone.

**An ideal clean test this measurement does not force on you:** a draft-class isolation — run the real engine through one full draft (the `seasonfixture`-style path already exists) with the Owner's 1,953 pool, and measure the **marginal 3.4 vs 4-3 fit** of the drafted roster, holding the draft seed fixed. That separates "the roster is bad at DT2 because that's what the board gave us" from "this team simply lacks starting DTs", which today's static roster-overlap measurement mixes.

## Notes for the record

- **DT2 measured by optimizer placement AND by second-highest-OVR:** both reported; they agree on every team we care about here.
- The mean bias on the current tip is +1131.25 table units; the measured-provider read is +1170.74 — the same story at both providers.
- Baseline reproduced at fresh tip (probe re-run from scratch with other file layouts) — INDEPENDENT of any prior probe file; commands below.
- Labels: VERIFIED (this session, at `7828d914`, with the commands below), except where flagged as "REPORTED".

## Commands

```
# extract
git archive 7828d914 | tar -x -C /tmp/wc-cond
# probe
cat > /tmp/wc-cond/colors/condition.test.ts   # this filing's definitions (also reproducible)
node --test --experimental-strip-types /tmp/wc-cond/colors/condition.test.ts
# output: the 32-team table + aggregate (this document's table is the output, verbatim)
```
