# More advanced stats — the council's proposals for Claude

**From:** MiniMax (seat S-1900–1999) · **Date:** 21 Oct 2026
**Asked for by:** the Owner (21 Oct): *"I would still like to generate more types of advanced stats to be shown in the draft simulator. The council should work on this and have suggestions for Claude."*

**Nothing here is invented.** Every proposal below uses data the build already computes or already records; where a stat needs a small addition to the play log, that is stated. Measured against the merge candidate `40233d6b…`.

---

## 0. The most useful finding first: the sim already computes most of it

The Season Review shows ten team-level advanced stats (turnover margin, time of possession, rushing share, TDs/game, FGs/game, share of points from TDs, 2-pt conv tries and success, one-score win rate, return yards per game) plus the sack-cause breakdown. But the **player's stat object already carries far more**, and most of it is never displayed: `sack`, `int`, `dint` (defensive interceptions), `ff` (forced fumbles), `fum` / `fumLost`, `tfl` (tackles for loss), `pd` (pass deflections), `hur` (hurries), `blk` (blocks), `sa` (sacks allowed), `dtd` (defensive touchdowns), `saf` (safety), `att` / `cmp` / `tgt` / `rec`, `passYds` / `passTD`, `recYds` / `recTD`, `rushYds` / `rushTD`, `krYds` / `prYds` (returns), `opOL` (the opponent's pass-protection rating, recorded next to a sack), and the team's `pers` (personnel group), `sT` (personnel shift) and `runPct` per game.

**The cheapest "more advanced stats" is therefore a display change, not a simulation change**: the numbers are already in the box score, and the Review simply does not show them. That is the recommendation — nine of the twelve proposals below cost no new modelling at all.

## 1. Season Review — team level (no new modelling)

| # | Stat | What it says | Data it uses |
|---|---|---|---|
| 1 | **Pressure rate** | Hurries + pressures + sacks per game — how often the pass rush gets home, independent of sacks | `hur`, `sack` per player, summed by team |
| 2 | **Sack rate allowed** | Sacks allowed per game, and sacks allowed per dropback (a rate, not a count) | `sa`, `passAtt` |
| 3 | **Turnover creation, split by type** | Interceptions / forced fumbles / fumbles recovered — the modern turnover split, replacing one "turnovers" number | `int`, `ff`, `fumLost` |
| 4 | **Takeaway rate** | Giveaways minus takeaways *per drive*, which is the honest turnover statistic | `turnovers` + drives (see #8) |
| 5 | **Defensive plays that matter** | Tackles for loss, pass deflections, defensive touchdowns, safeties — the "defense generated a play" line | `tfl`, `pd`, `dtd`, `saf` |
| 6 | **Average starting field position** | Where the offense starts, from the return yards the sim already tracks (kickoff and punt returns) | `krYds`, `prYds`, `retYds` |
| 7 | **Red-zone touchdown rate** | Share of red-zone trips that end in a touchdown — the most informative offensive rate in football | scoring events + field position (needs the drive log) |
| 8 | **Points per drive** and **drives per game** | The two numbers that make every other rate meaningful | derived from the drive log |
| 9 | **Fourth-down decisions** | Tries, conversions, and success rate — the sim already chooses to go for it or kick (the aggressiveness setting) | play log + `AGGR_INFO` behaviour |

## 2. Season Review — player level (no new modelling)

| # | Stat | Where it belongs |
|---|---|---|
| 10 | **The pressure/sack split for every pass rusher** | The Review already shows sacks by cause (rusher / weak line / coverage); adding hurries, pressures and pass deflections turns one number into a rusher's real contribution |
| 11 | **Protection report for the offensive line** | Sacks allowed, hurries allowed and pressures allowed per lineman, next to the opponent's `olPass` rating the sim already records (`opOL`) — "he gave up 2 sacks to a 88 protection" |
| 12 | **Receiving efficiency** | Targets, catches, yards per target, drops (if tracked), touchdowns, and yards per route — the sim has `tgt`, `rec`, `recYds`, `recTD` |

## 3. Draft-side analytics (the other reading of "in the draft simulator")

The draft machinery already computes the value of every player at every open spot, the CPU's replacement-level valuation and the flex penalties. That is enough for five statistics nobody has yet:

| # | Stat | What it answers |
|---|---|---|
| 13 | **Wins added per pick** | For each of your picks: the wins the player added at the spot he filled, against the replacement-level player. The single most useful draft number, and it is already in `cpuPick`'s arithmetic |
| 14 | **Need vs. best-player-available** | How much worse the best player at your need was than the best player on the board — the "reach" number, per pick |
| 15 | **The value curve of the board** | For each of your picks: the value of the best player still available when you were on the clock. A chart of "did I wait too long" and "was the board thin" |
| 16 | **Running and sleeping** | The chance the player you took was still there two picks later, and the chance the player you passed on was gone by your next pick — the draft's own version of the board's "Priority" column, over the whole draft rather than one pick |
| 17 | **Roster value by unit** | The wins your 26 starters add over the league average, grouped by unit (trenches, skill, secondary) — the roster's value in the same words the guide uses for positions |

## 4. Two proposals that need a decision, not code

- **Quarterback rushing as a stat.** The sim's QB has no run role at all (`RATING_SPECS` has no QB in any run unit), so "QB rushing yards" would be a stat about a thing the model does not have. The honest version is a *team* rushing stat with the QB's share shown as zero until the model gives the QB a run role. Fixing the model first (see `position-value-adjustments.md` §4) makes the stat real.
- **EPA.** The council's view: do not build it. The sim's matchup model is a *structural* model (expected points from nine unit ratings), not a play-level one, so a true EPA would need a play-level engine that does not exist. The honest substitutes are points per drive (#8), success rate by personnel group, and turnover margin weighted by field position — all derived from data the sim already has.

## 5. What this proposal does not do

- It invents no rating, no statistic and no number; every entry above is either a field the build already sets or a derivation from the recorded play log.
- It does not touch the protected constants, and it does not change any simulated outcome: all of it is display and derivation.
- Items 7, 8 and 9 need the play log to carry the down and the field position. That is a small addition to the play-by-play writer — worth doing once, for all three.
