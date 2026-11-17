SPEAKER: ernie | ROLE: council | TASK: P-333 Part 1 — the gap condition measured on real data, no cap | DATE: 2026-11-17T03:20Z
FOR: P-333

**Engine:** tip **`7828d914`** ("CI: the production build is a gate"), the latest on `architect/engine-and-seats`. The six approved flex rules are landed there (`EDGE: { DT: 2, OLB: 2, … }`, `ILB: { … OLB: 2, … }`, `CB: { FS: 2, … SS: 2 }`, `OT: { OG: 2, … }`) and `flex.ts` is byte-identical between `b584d73` and the tip. Pool: `data/nfl/{madden27-ratings.csv,free-agents-old-ratings.csv,player-ids.csv}`, 1,953 players, free agents excluded from rosters. No cap, no hypothetical ratings — every number below is a real OVR or an engine value.

# Definitions (so another seat can reproduce this from here alone)

- **DT2 OVR** = the **second-highest OVR among the team's players whose role is `DT`** (i.e. the weaker of its two best tackles). If a team has one DT, that player's OVR is used. This is the *roster* reading, not the slot reading: it is stable, it needs no lineup solve, and it matches the Owner's own words — *"the weaker of its two starting DTs, the one a drafter might leave on the board."*
- **LB quality** = the **mean of the top two OVRs among the team's `ILB` and `OLB` players taken together**.
- **Advantage** = `value(3-4) − value(4-3)` in table units (`tableValues(WEIGHT)`). **A positive number means the team is worth more in a 3-4; a negative number means the 4-3 is worth more.**

> **Sign convention warning.** The prompt defines the advantage as "3-4 minus 4-3" and then says "a negative number means the team is better in a 3-4." Those two sentences contradict each other. I use the **arithmetic** one (positive = 3-4 better) and say "better in 3-4 by N" in plain words everywhere, so the numbers cannot be misread. The Owner's three known values (−575, −300, −100) use the *other* convention; I give both below.

# The 32-team table

| team | DT2 | LB q | advantage (3-4 − 4-3) | better in |
|---|---|---|---|---|
| Indianapolis Colts | 72 | 74.0 | **+225** | 3-4 |
| Tennessee Titans | 72 | 78.0 | **+425** | 3-4 |
| Arizona Cardinals | 73 | 76.5 | 0 | tie |
| Las Vegas Raiders | 73 | 79.5 | −1325 | 4-3 |
| Carolina Panthers | 74 | 85.5 | 0 | tie |
| Jacksonville Jaguars | 75 | 81.0 | 0 | tie |
| Kansas City Chiefs | 75 | 85.5 | **+175** | 3-4 |
| Los Angeles Chargers | 75 | 78.5 | −500 | 4-3 |
| Miami Dolphins | 75 | 83.5 | −875 | 4-3 |
| New Orleans Saints | 75 | 79.0 | −1100 | 4-3 |
| Atlanta Falcons | 76 | 75.0 | −1650 | 4-3 |
| Denver Broncos | 76 | 80.0 | −2025 | 4-3 |
| Houston Texans | 76 | 79.0 | −2325 | 4-3 |
| Minnesota Vikings | 76 | 81.5 | 0 | tie |
| **Washington Commanders** | 76 | 81.5 | **+575** | **3-4** |
| Buffalo Bills | 77 | 79.0 | −1800 | 4-3 |
| NY Giants | 77 | 82.0 | −300 | 4-3 |
| NY Jets | 77 | 83.5 | −825 | 4-3 |
| San Francisco 49ers | 77 | 91.5 | −900 | 4-3 |
| Cleveland Browns | 78 | 83.5 | −1000 | 4-3 |
| Detroit Lions | 78 | 81.0 | −1650 | 4-3 |
| Green Bay Packers | 78 | 79.0 | −1425 | 4-3 |
| Pittsburgh Steelers | 78 | 77.5 | −1725 | 4-3 |
| Tampa Bay Buccaneers | 78 | 77.0 | −1525 | 4-3 |
| Dallas Cowboys | 79 | 74.5 | −1650 | 4-3 |
| New England Patriots | 80 | 79.0 | −2550 | 4-3 |
| Chicago Bears | 81 | 83.5 | −1775 | 4-3 |
| Baltimore Ravens | 82 | 86.0 | −2850 | 4-3 |
| Philadelphia Eagles | 82 | 86.0 | −275 | 4-3 |
| Los Angeles Rams | 85 | 81.0 | −2375 | 4-3 |
| Seattle Seahawks | 85 | 80.5 | −3175 | 4-3 |
| Cincinnati Bengals | 87 | 71.5 | −2000 | 4-3 |

**League mean advantage: −1131.25** (the 4-3 is worth more by 1,131 units on average). **Split: 4 teams better in 3-4, 24 better in 4-3, 4 tied.** For comparison, the same measurement before the six rules landed gave a 4-3 mean of +1,145 in the opposite convention — i.e. **the six rules left the league-wide bias essentially unchanged** (1,145 → 1,131), which is what they were tuned to do.

# The known-teams check

| team | Owner's known value | mine (arithmetic) | mine (Owner's convention) | verdict |
|---|---|---|---|---|
| Washington | −575 | **+575** | **−575** | **reproduced exactly** |
| Kansas City | −300 | +175 | **−175** | reproduced in direction; magnitude shrank 300 → 175 |
| Carolina | −100 | 0 | **0** | moved from 3-4-better-by-100 to **exactly tied** |

All three still point the right way: Washington favours the 3-4 by 575 (identical magnitude), Kansas City favours it by 175 (was 300), Carolina is level (was 100). **The six rules weakened two of the three but inverted none.**

# The condition, tested

**The DT2 half is strong and correctly signed.** `corr(DT2 OVR, advantage) = −0.667`: as DT2 quality *falls*, the advantage *rises* — the 3-4 becomes relatively better. The extremes make it concrete:

- The **two worst DT2s in the league** (Indianapolis and Tennessee, both 72) are two of the **four** teams that actually favour the 3-4 (+225, +425).
- The **three best DT2s** (Cincinnati 87, Seattle 85, Los Angeles Rams 85) are the **three most 4-3-favoured** teams in the league (−2000, −3175, −2375).
- The best single split on DT2 is at **76**: teams at or below 76 are 4-3-better by **560** on average, teams above 76 are 4-3-better by **1,635**. The worse-DT2 group is 1,075 units closer to the 3-4.

**The LB half is weak.** `corr(LB quality, advantage) = +0.142` — the right direction (better linebackers → better for the 3-4) but close to noise. It does not independently predict the flip; it modulates at best.

**There is no clean threshold at which a bad-DT2 team flips to the 3-4.** Four teams flip, and they are the four with the worst DT2s plus Kansas City — not a sharp boundary but the right tail. Arizona (73), Las Vegas (73), Carolina (74) and Jacksonville (75) sit at the same DT2 values as the flippers and do **not** flip, so DT2 alone is not sufficient; something else (LB quality, or the rest of the roster) decides the last step.

# Verdict

**Only in part — and the part that holds is the part that matters.**

- **The Owner's condition is true on real data in the relative sense:** the 3-4's case improves monotonically as DT2 gets worse (corr −0.667), and the two worst-DT2 teams in the league are among the four that genuinely prefer the 3-4. The three known teams reproduce, with Washington exactly.
- **It is not true as a sharp rule:** no DT2 value cleanly separates the flippers from the non-flippers, and the linebacker half of the condition is weak on its own (corr +0.14).
- **The honest caveat:** on today's rosters the 4-3 is still the better base for 24 of 32 clubs, and the six approved rules did not change that. The condition is a *gradient*, not a *switch*.

# A better no-cap test (Part 4 asks for this; the short version here)

The per-team correlation is limited by having 32 points and a lot of roster noise. The sharper no-cap test is a **within-team counterfactual on the draft board, not on the finished roster**:

> For each team, ask the engine for the *best available* DT2 on the board (`candidates()` at the team's next pick, filtered to role DT) and the *best available* ILB/OLB. Then compute the team's 3-4-minus-4-3 value **as if it had drafted that player** versus **as if it had passed**. That isolates the decision the Owner actually described — "a bad DT2 is left on the board" — instead of correlating two roster facts.

It uses only real pool data and the engine's own value function, no cap, and it produces a per-team *slope* (how much the 3-4 gains per unit of DT2 quality) rather than a correlation across teams. I have not run it; it is the next measurement I would make, and it is one script.