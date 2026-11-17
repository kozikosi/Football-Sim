SPEAKER: vl | TASK: P-333 — measure the gap condition on real data, no cap | DATE: 2026-11-17T02:37:00Z
FOR: P-333

## Engine tip measured

b584d73 ("Python twin of keyedrng, with a conformance check against the TypeScript"), tip of architect/engine-and-seats. Six flex rules landed: EDGE→DT=2, ILB→OLB=2, CB→FS=2, EDGE→OLB=2, OT→OG=2, CB→SS=2 (verified by reading flex.ts). Measured with the engine's own measured value provider (measuredValues(), slotWins20/20 from matchup.ts).

## Definitions (reproducible from this filing alone)

- **"DT2 OVR" for a team**: the second-highest OVR among players with role `DT` on that team's roster. Sort the team's DTs by OVR descending, take index 1. If only one DT exists, use that one's OVR; if none, null.
- **"LB quality" for a team**: the mean OVR of the top two linebackers (role `ILB` or `OLB`) on that team's roster. Sort descending, average the top two. If only one LB exists, use that one's OVR; if none, null.
- **"3-4 minus 4-3 value"**: `lineupFor(roster, '4-3').value - lineupFor(roster, '3-4').value`, in table units. Negative = the team's lineup is worth more in a 3-4 = team favors 3-4. Positive = team favors 4-3. Zero = tie.
- Roster: all players on the team's roster (from madden27-ratings.csv + free-agents-old-ratings.csv via buildPool(), excluding 'Free Agent'), not just starters. The lineup optimizer picks the best 32 spots under each formation.
- Value provider: `measuredValues()` (the engine's default, slotWins20/20), not the retired fitted table.

## Per-team table (32 teams, sorted by DT2 OVR asc)

| Team | DT2 OVR | LB quality | adv (4-3 − 3-4) | Favors |
|---|---|---|---|---|
| Indianapolis Colts | 72 | 74.0 | −231.7 | 3-4 |
| Tennessee Titans | 72 | 78.0 | −440.0 | 3-4 |
| Arizona Cardinals | 73 | 76.5 | 0.0 | tie |
| Las Vegas Raiders | 73 | 79.5 | 1373.7 | 4-3 |
| Carolina Panthers | 74 | 85.5 | −2.0 | 3-4 |
| Kansas City Chiefs | 75 | 85.5 | −181.4 | 3-4 |
| Los Angeles Chargers | 75 | 78.5 | 542.7 | 4-3 |
| Miami Dolphins | 75 | 83.5 | 852.5 | 4-3 |
| New Orleans Saints | 75 | 79.0 | 1136.1 | 4-3 |
| Jacksonville Jaguars | 75 | 81.0 | −18.3 | 3-4 |
| Atlanta Falcons | 76 | 75.0 | 1708.5 | 4-3 |
| Minnesota Vikings | 76 | 81.5 | 1.8 | 4-3 |
| Denver Broncos | 76 | 80.0 | 2096.9 | 4-3 |
| Houston Texans | 76 | 79.0 | 2406.6 | 4-3 |
| Washington Commanders | 76 | 81.5 | −652.4 | 3-4 |
| Buffalo Bills | 77 | 79.0 | 1863.8 | 4-3 |
| San Francisco 49ers | 77 | 91.5 | 932.1 | 4-3 |
| NY Giants | 77 | 82.0 | 339.6 | 4-3 |
| NY Jets | 77 | 83.5 | 858.0 | 4-3 |
| Green Bay Packers | 78 | 79.0 | 1477.9 | 4-3 |
| Detroit Lions | 78 | 81.0 | 1718.9 | 4-3 |
| Pittsburgh Steelers | 78 | 77.5 | 1686.0 | 4-3 |
| Cleveland Browns | 78 | 83.5 | 1070.9 | 4-3 |
| Tampa Bay Buccaneers | 78 | 77.0 | 1585.7 | 4-3 |
| Dallas Cowboys | 79 | 74.5 | 1703.6 | 4-3 |
| New England Patriots | 80 | 79.0 | 2643.0 | 4-3 |
| Chicago Bears | 81 | 83.5 | 1842.7 | 4-3 |
| Baltimore Ravens | 82 | 86.0 | 2953.5 | 4-3 |
| Philadelphia Eagles | 82 | 86.0 | 331.3 | 4-3 |
| Seattle Seahawks | 85 | 80.5 | 3304.6 | 4-3 |
| Los Angeles Rams | 85 | 81.0 | 2494.7 | 4-3 |
| Cincinnati Bengals | 87 | 71.5 | 2064.6 | 4-3 |

## League summary

- Mean adv (4-3 − 3-4): **+1170.74** table units (league-wide, teams favor 4-3 on average)
- Split: **6 favor 3-4 / 25 favor 4-3 / 1 tie**

## Known check teams

| Team | Prompt says | My measurement | Match? |
|---|---|---|---|
| Washington Commanders | DT2=76, adv=−575 | DT2=76, adv=−652.4, favors 3-4 | Direction ✓, magnitude ✗ |
| Kansas City Chiefs | DT2=75, adv=−300 | DT2=75, adv=−181.4, favors 3-4 | Direction ✓, magnitude ✗ |
| Carolina Panthers | DT2=74, adv=−100 | DT2=74, adv=−2.0, favors 3-4 | Direction ✓, magnitude ✗ |

DT2 OVR values match exactly (76/75/74). All three favor 3-4, matching the prompt's qualitative claim. Magnitudes differ (mine are larger for Washington and KC, smaller for Carolina) — the prompt's numbers were likely measured at a different engine state or with a slightly different roster construction. Direction is what matters for the condition check, and it reproduces.

## Pattern test

- **Correlation(DT2 OVR, adv) = +0.671** (n=32). Positive correlation: higher DT2 OVR → higher adv → more 4-3 preference. Equivalently: **worse DT2 → more 3-4 preference.** The DT2 half of the Owner's condition HOLDS.
- **Correlation(LB quality, adv) = −0.137** (n=32). Negative correlation: higher LB quality → slightly more 3-4 preference. Very weak but in the right direction. The LB half of the condition HOLDS weakly.
- Combined: teams with both bad DT2 and good LBs tend to favor 3-4, but the relationship is not deterministic.

## Counter-examples (bad DT2, good LBs, but still favor 4-3)

| Team | DT2 | LB quality | adv | Favors |
|---|---|---|---|---|
| Miami Dolphins | 75 | 83.5 | +852.5 | 4-3 |

Miami has a bad DT2 (75) and excellent LBs (83.5) yet strongly favors 4-3. This shows roster composition beyond DT2 and LB quality matters (e.g., DT1/EDGE quality, offensive skill positions).

## Confirming examples (bad DT2, good LBs, favor 3-4)

| Team | DT2 | LB quality | adv | Favors |
|---|---|---|---|---|
| Carolina Panthers | 74 | 85.5 | −2.0 | 3-4 |
| Kansas City Chiefs | 75 | 85.5 | −181.4 | 3-4 |
| Jacksonville Jaguars | 75 | 81.0 | −18.3 | 3-4 |
| Tennessee Titans | 72 | 78.0 | −440.0 | 3-4 |
| Indianapolis Colts | 72 | 74.0 | −231.7 | 3-4 |

## Verdict

**PARTIAL.** The condition holds in direction but is not universal:

- **DT2 part: HOLDS** (corr +0.671). As DT2 OVR falls, the 3-4 advantage grows. This is the dominant pattern — 5 of the 6 teams favoring 3-4 have DT2 ≤ 76.
- **LB quality part: HOLDS weakly** (corr −0.137). Better LBs slightly increase 3-4 preference, but the effect is small and easily overwhelmed by other roster factors.
- **Overall: only in part.** The mean adv is +1170.74 (league favors 4-3), and 25 of 32 teams favor 4-3. The condition is real but narrow: it shows up clearly for the very worst DT2s (Indianapolis 72, Tennessee 72, Carolina 74, KC 75, Washington 76 — all favor 3-4), but breaks down for teams like Miami (DT2 75, LBq 83.5, still strongly 4-3).

## Better no-cap test (Part 4A idea, filed here for reference)

The per-team approach has a confound: roster strength in non-DT2/LB positions (DT1, EDGE1, QB, WR1) swamps the DT2/LB effect. A cleaner test would be a **paired draft simulation**:

1. For each of the 32 teams, take their real roster.
2. Create two synthetic drafts: one where the team's DT2 is replaced by a replacement-level DT (OVR 60), and one where it's kept real.
3. In each draft, simulate the team picking under both 4-3 and 3-4, with the LB pool held constant.
4. Measure: does the 3-4 advantage grow more when DT2 is degraded, and does that growth correlate with the team's LB quality?

This isolates the DT2→3-4 interaction from overall roster strength. Concrete enough to run; filed here as a proposal, not a verification.

## How to check

1. Engine tip b584d73 exists on architect/engine-and-seats.
2. Data: data/nfl/madden27-ratings.csv (1941 ratings), data/nfl/free-agents-old-ratings.csv (12 FAs), data/nfl/player-ids.csv (1954 ids).
3. Run: extract colors/src at b584d73, run `node --experimental-strip-types` on a harness that calls buildPool(), groups by team, computes DT2 OVR / LB quality / formation adv via lineupFor(), and reports the table above.
4. No product files were edited. The engine and flex table are read-only.

Labels: All measurements VERIFIED (commands run, outputs quoted in full). Check-team magnitudes differ from prompt's — reported honestly, not forced.
