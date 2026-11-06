# T3 — Advanced stats, generated from the model (not just sacks)

Goal: generate advanced stats for every meaningful position and stat — the two reference documents the user attached describe exactly this spirit (EPA-style value per play, success rate, pressure, separation/expected-completion, etc.). Build them from stages the model ALREADY computes, so nothing printed can contradict the sim.

File: `NFL Draft Simulator.html`.

## Stat catalog (name · formula · source · display)

Formula prefix: all computed per player per game at stat-accumulate time (like current `st` fields in `buildOffenseDetail`/`buildDefenseDetail`), aggregated per season in `accumulatePlayerStats` (~3325–3330).

**Team-level (per game, from `r.homeStats/r.awayStats` + events):**
- `epaLog` (expected-points added proxy): sum over scoring events of `eventPts − expectedPts(atThatPoint)` where expectedPts comes from field position implied by the drive log; FIRST-ORDER version: use quarter-by-quarter `structPts` diffusion — `epaEvent ≈ pts − (BASE_PTS/4)*(4−q)`? NO — keep honest: implement per-drive proxy = `pts − leagueAvgPtsPerDrive(driveStartQ, trailing(context))`. Document ANY shortcut inline.
- `successRate`: share of drive-yards sequences gaining ≥ the "necessary yards" line (40%/50% of distance by down). Requires the drive generator; TODAY compute at possession granularity: successful possession = scored OR gained ≥30 pass+rush yards. Gate behind the drive generator packet.
- `driveEfficiency`: (pts+fieldTurnoverAdj)/drive. drives = events+turnovers+punts; use `seasonState` aggregate counts.
- `winProbAdded` (WPA proxy): for each event, Δwin% from `wpFrom()` with running margin vs. after — this is well-defined TODAY from existing `wpFrom` at each event: computing wp before/after with the same model params is legitimate.

**Offense:**
- QB `cpoeProxy` (completion % over expected): expected cmp% = sigmoid((qbRating − coverageRating)/8) tuned to league-average 65%; `cpoeProxy = (s.cmp/s.att) − sigmoid((qb−cov)/8)`.
- RB/WR/TE `srProxy` (particle success rate): `(rush+rec gains ≥4 yards) / attempts` — derive attempts from existing `car/tgt` and per-split averages.
- OL `blockWinRate`: `1 − (sacksAllowed+pressuresAllowed)/dropbacks` per team, allocated to OL by `rbk` share.
- fumbles lost/forced already exist; add `turnoverPlayPts` (points swing on the play after turnover: TD on next possession credited as +7 swing).

**Defense:**
- DL/LB `pressureProxy`: `sack*1.0 + (qkHurries: use tfl*0.5 + pd*0.25)` as a normalized index (document the hack).
- DB `covStop`: `pd*0.6 + dint*1.4 − cmpAllowedProxy` (cmpAllowed deduced from opponent cpoeProxy inverted sign).
- `tflShare`: team TFL allocated by `tkl` among DL/LB.
- ST `retEPA`: return-yard swing vs. the 20 (existing returner math `RET_PTS` curve).

**Where displayed (all three):**
1. Box score "advanced" toggle: per player row add a second stats line.
2. League Leaders page: two new columns are enough (add `EPA`, `SR`).
3. 100-season report realism audit: correlation of the new stats with team wins.

Steps:
1. Extend `buildOffenseDetail`/`buildDefenseDetail` stat objects with the fields above, computed inline from EXISTING values (no new distributions — everything is arithmetic on stats already generated).
2. Extend `statImpact` ONLY by adding new separately named keys; do not alter existing weights (protected).
3. Aggregate via `accumulatePlayerStats` (the per-game `PER_GAME_CAP` map may need no keys for these new stats — they are indices, not counting stats; document that they bypass caps deliberately).
4. Render: box score new line (only one line, keep compact), league leaders columns, realism-audit rows.
5. Done-when: `node pw4.js` still passes; a 17-week season shows e.g. QB cpoeProxy in [−0.20, +0.20] for ~95% of starts; league leaders columns sort correctly; zero console errors.

Do NOT touch: `MC`, `PLAN_K`, scoring decomposition, schedule, weights. No "AI-generated commentary" — all numbers must trace to a formula in code.
