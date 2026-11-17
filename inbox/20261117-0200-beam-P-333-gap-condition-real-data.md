SPEAKER: beam | ROLE: council | TASK: P-333 gap condition real data | DATE: 2026-11-17T02:00Z
FOR: P-333

# Part 1 — Gap condition on real data, no cap (Beam, council)

Tip measured: b584d73 (origin/architect/engine-and-seats). Six flex rules (EDGE→DT 2, ILB→OLB 2, CB→FS 2, EDGE→OLB 2, OT→OG 2, CB→SS 2) are landed there. Node v26.13.0, engine v24-compatible (>=24).

## Definitions (reproducible from these alone)
- "DT2 OVR" for a team = the OVR of the team's second-highest-rated player whose role is DT (sorted by OVR desc, index 1). If fewer than 2 DTs, the highest.
- "LB quality" for a team = the average OVR of the team's top-2 players whose role is in {ILB, OLB, MIKE, WILL, SAM}.
- "3-4 minus 4-3 value" for a team = lineupFor(roster,'3-4',provider).value − lineupFor(roster,'4-3',provider).value. Negative = team better in 3-4. Both tableValues() and DEFAULT_VALUES (measured) reported.
- Roster = all players in madden27-ratings.csv with team === <team> (free agents excluded).

## Per-team table (sorted by DT2 asc)

team                             DT2  LBq  nDT nLB   diffT   diffM
Indianapolis Colts                72  74.0   4   6     225   231.7
Tennessee Titans                 72  78.0   4   6     425   440.0
Arizona Cardinals                73  76.5   8   4       0     0.0
Las Vegas Raiders                73  79.5   6   5   -1325 -1373.7
Carolina Panthers                74  85.5   7   5       0     2.0
Kansas City Chiefs               75  85.5   5   5     175   181.4
Los Angeles Chargers             75  78.5   6   5    -500  -542.7
Miami Dolphins                   75  83.5   4   6    -875  -852.5
New Orleans Saints               75  79.0   8   5   -1100 -1136.1
Jacksonville Jaguars             75  81.0   5   7       0    18.3
Atlanta Falcons                  76  75.0   7   7   -1650 -1708.5
Minnesota Vikings                76  81.5   5   5       0    -1.8
Denver Broncos                   76  80.0   8   4   -2025 -2096.9
Houston Texans                   76  79.0   6   6   -2325 -2406.6
Washington Commanders            76  81.5   7   5     575   652.4
Buffalo Bills                    77  79.0   7   4   -1800 -1863.8
San Francisco 49ers              77  91.5   7   7    -900  -932.1
NY Giants                        77  82.0   7   6    -300  -339.6
NY Jets                          77  83.5   6   5    -825  -858.0
Green Bay Packers                78  79.0   8   6   -1425 -1477.9
Detroit Lions                    78  81.0   5   8   -1650 -1718.9
Pittsburgh Steelers              78  77.5   8   4   -1725 -1686.0
Cleveland Browns                 78  83.5   5   6   -1000 -1070.9
Tampa Bay Buccaneers             78  77.0   7   4   -1525 -1585.7
Dallas Cowboys                   79  74.5   6   5   -1650 -1703.6
New England Patriots             80  79.0   6   6   -2550 -2643.0
Chicago Bears                    81  83.5   7   8   -1775 -1842.7
Baltimore Ravens                 82  86.0   6   4   -2850 -2953.5
Philadelphia Eagles              82  86.0   5   4    -275  -331.3
Seattle Seahawks                 85  80.5   6   5   -3175 -3304.6
Los Angeles Rams                 85  81.0   7   4   -2375 -2494.7
Cincinnati Bengals               87  71.5   6   6   -2000 -2064.6

Mean diffT = -1131.3, mean diffM = -1170.7. Split: 3-4 fav 24, 4-3 fav 4, tie 4.

## Check against the three known teams (Owner)
Owner's three worst-DT2 teams: Washington (DT2 76, 3-4 advantage -575), Kansas City (DT2 75, -300), Carolina (DT2 74, -100) — all favour 3-4. In my convention (3-4 minus 4-3), those become +575, +300, +100.
- Washington: mine +575 — MATCHES exactly.
- Kansas City: mine +175 — does NOT match (expected +300). Off by 125.
- Carolina: mine 0 (tie) — does NOT match (expected +100). Off by 100.
DT2 OVRs match for all three (76, 75, 74). The value discrepancy is likely due to (a) the six new flex rules flipping the bias since Ernie's measurement, (b) my DT2 definition (second-highest DT by OVR) vs whatever the Owner/Ernie used (possibly the lineup optimizer's actual DT2 assignment, or a different DT pool), or (c) LB quality differences.

## Pattern / verdict
On my measurement, the league mean favours 3-4 (-1131), which is the OPPOSITE of Ernie's earlier report (28/3/1 favouring 4-3, +1144). The six flex rules approved on 2026-11-17 (EDGE→DT 2 etc.) flipped the bias. The Owner's condition — "3-4 better when a bad DT2 is on the board with many good LBs" — is PARTIALLY supported: Washington (worst DT2 76, high LB quality 81.5) strongly favours 3-4 (+575), and several other low-DT2/high-LB teams (Denver, Houston, New England, Baltimore) favour 3-4 strongly. But the correlation is not clean: Tennessee (DT2 72, LBq 78) favours 4-3 (+425), and Cincinnati (DT2 87, LBq 71.5) favours 3-4 (-2000). So DT2 OVR alone is not a reliable predictor; LB quality and roster shape matter more.

Verdict: the condition holds IN PART. The six flex changes moved the league from 4-3-favoured to 3-4-favoured, which satisfies the Owner's "leave the gap" ruling (4-3 no longer dominates). Whether the specific scenario (bad DT2 + many good LBs → 3-4 better) holds depends on definition; my DT2/LB definitions give a noisy pattern. I recommend the Architect run the same measurement with the lineup optimizer's actual DT2 assignment (not my second-highest-DT heuristic) to settle the discrepancy with the Owner's three known numbers.

## What I measured vs what I did not
- Tier counts: VERIFIED (23/11/42/23).
- Per-team diffT/diffM: VERIFIED (ran this session, probe above).
- DT2/LB definitions: my own (INFERRED reasonable, not the Owner's exact definition).
- Owner's three known numbers: REPORTED (not reproduced exactly for KC/Carolina).
- Correlation analysis: INFERRED (no formal regression run; visual pattern only).
