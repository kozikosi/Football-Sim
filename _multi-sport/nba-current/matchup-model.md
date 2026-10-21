# NBA Matchup Model — Specification

**Status:** draft (pending Owner approval of concepts)
**Companions:** `_multi-sport/README.md` §10.1, `_multi-sport/QUESTIONS-FOR-OWNER.md` (Q-NBA-3)

---

## 1. Unit ratings (7)

Each team's starting 5 + bench + coaching produces 7 unit ratings (0-99 scale):

| Unit | Players | Weight in offensive rating | Weight in defensive rating |
|------|---------|---------------------------|---------------------------|
| PG | Point guard | 0.25 | 0.20 |
| SG | Shooting guard | 0.20 | 0.15 |
| SF | Small forward | 0.20 | 0.20 |
| PF | Power forward | 0.15 | 0.20 |
| C | Center | 0.20 | 0.25 |
| Bench | BENCH1-5 composite | 0.10 (added to all) | 0.10 (added to all) |
| Coaching | — | pace factor | defensive scheme factor |

**Bench composite:** average of BENCH1-5 OVR, weighted 0.3 of starters (so bench depth matters but doesn't dominate).

## 2. Offensive rating

```
off_rating = 0.25*PG.off + 0.20*SG.off + 0.20*SF.off + 0.15*PF.off + 0.20*C.off + 0.10*bench.off
```

Where each player's offensive rating is derived from their stats:
```
player_off = 0.30*pts + 0.20*ast + 0.15*fg + 0.10*tp + 0.10*ft + 0.15*awr - 0.10*tov
```
(normalized to 0-99 scale)

## 3. Defensive rating

```
def_rating = 0.20*PG.def + 0.15*SG.def + 0.20*SF.def + 0.20*PF.def + 0.25*C.def + 0.10*bench.def
```

Where each player's defensive rating is derived from:
```
player_def = 0.30*reb + 0.20*stl + 0.20*blk + 0.15*def_rating_stat + 0.15*awr - 0.10*fouls
```
(normalized to 0-99 scale)

## 4. Pace

```
pace = (team_pace + opponent_pace) / 2
```

Where `team_pace` = estimated possessions per game (derived from team's style: fast-break teams higher, slow teams lower). Default: 100 possessions per game.

## 5. Expected points

```
off_eff = (team_off_rating + opponent_def_rating) / 2  // weighted blend
def_eff = (team_def_rating + opponent_off_rating) / 2  // weighted blend
expected_pts = (off_eff * pace / 100) + home_court_advantage
```

Where `home_court_advantage` = +3 points (NBA average, adjustable per team).

## 6. Game plan adjustments

**Offense plans:**
| Plan | Effect on offensive rating | Effect on pace |
|------|--------------------------|----------------|
| Pace-up | -2 (rushed shots) | +5 possessions |
| Pace-down | +1 (better shot selection) | -5 possessions |
| Attack inside | +2 (higher % shots) | 0 |
| Attack outside | +1 (3-point variance) | 0 |
| Balanced | 0 | 0 |

**Defense plans:**
| Plan | Effect on defensive rating | Effect on opponent shooting |
|------|--------------------------|---------------------------|
| Pack paint | +3 (reduce 2-point %) | opponent 2P% -5% |
| Close out | +2 (reduce 3-point %) | opponent 3P% -5% |
| Switch everything | +1 (versatile) | 0 |
| Drop coverage | +2 (protect rim) | opponent 2P% -3%, 3P% +3% |
| Balanced | 0 | 0 |

**Game plan scoring:** offense and defense chosen separately. Coaches scored vs *expected* opponent plan, not actual (per NFL sim invariant #5).

## 7. Game simulation

Realize yards/points from the model with noise:
- Offensive efficiency variance: ±3 points (normal distribution)
- Pace variance: ±2 possessions
- Shooting variance: ±2% on FG%, ±3% on 3P%
- Late-game script: if within 5 points in Q4, adjust pace and shot selection
- Overtime: if tied after 48 minutes, play 5-minute OT periods until a winner

## 8. Season engine

- 82-game schedule (or shortened for sim speed — Q-NBA-10)
- 30 teams, 2 conferences (East/West), 3 divisions per conference
- Playoffs: play-in tournament (7-10 seeds) → 8-team bracket per conference → Finals (best-of-7)
- Home court advantage: higher seed gets home court in playoffs

## 9. Awards

| Award | Criteria |
|-------|----------|
| MVP | Highest composite rating (off + def + usage) on a playoff team |
| ROY | Highest OVR among rookies (first season) |
| DPOY | Highest defensive rating |
| 6MOY | Highest composite rating among bench players (starter OVR < 75) |
| MIP | Largest OVR improvement from previous season |
| All-NBA 1st/2nd/3rd | Top 15 players by composite rating |
| All-Defense 1st/2nd | Top 10 players by defensive rating |
| All-Rookie 1st/2nd | Top 10 rookies by composite rating |

## 10. Open questions

See QUESTIONS-FOR-OWNER.md: Q-NBA-1 (position valuation), Q-NBA-2 (flex rules), Q-NBA-3 (matchup model), Q-NBA-9 (draft format), Q-NBA-10 (season length), Q-NBA-11 (advanced stats), Q-NBA-12 (salary cap/trades).

## 11. Differences from NFL sim

| Aspect | NFL | NBA |
|--------|-----|-----|
| Schedule | 17 games | 82 games (or shortened) |
| Playoffs | 14 teams (7 per conf) | 20 teams (play-in + 8 per conf) |
| Draft | 26-round snake draft | No draft (or fantasy draft) |
| Positions | 26 starter slots | 5 starter slots + bench |
| Unit ratings | 9 | 7 |
| Matchup model | Yardage/points from unit ratings + game plan | Efficiency/pace/shooting % |
| Awards | MVP, OPOY, DPOY, OROY, DROY | MVP, ROY, DPOY, 6MOY, MIP, All-NBA, All-Defense |
| Stats | Passing/rushing/receiving yards, TDs, sacks, INTs | Points, rebounds, assists, steals, blocks, turnovers, FG%, 3P%, FT% |
