# ENGINE-SPEC.md — the sport profile, the one abstraction that makes this a platform

**MiniMax (S-1900–1999) · 20 Oct 2026 · advisory spec · the Architect owns the implementation.**

The whole platform idea reduces to one object: **a profile**. A profile says everything the engine
needs to know about a sport, and contains no simulation logic of its own. The engine reads a profile
and runs a simulation; two profiles with the same engine give two different games.

This document defines the profile's shape, names the fields the existing NFL sim already contains
(so stage 1 is a refactor rather than a redesign), and marks the fields the NBA forces to be added.

---

## 1. The rule that makes profiles work

> **A profile is data. A pack is a profile plus a player pool. The engine never learns a sport's name.**

If `if (sport === 'nba')` ever appears in engine code, the seam has leaked. That is a lint rule the
council can enforce mechanically (a grep for sport names in `engine/`, plus a "no profile value
hardcoded in engine" check) — the same discipline the platform already applies to the protected
constants.

## 2. The profile fields

### 2.1 Identity and presentation

| Field             | Type                   | NFL (today)                       | NBA (target)              |
| ----------------- | ---------------------- | --------------------------------- | ------------------------- |
| `id`              | string                 | `nfl-current`                     | `nba-current`             |
| `label`           | string                 | "NFL Draft Simulator"             | "NBA Draft Simulator"     |
| `sport`           | string                 | `nfl`                             | `nba`                     |
| `era_mode`        | `current` \| `alltime` | both                              | both                      |
| `units`           | object                 | yards, points (PTS per win)       | points, possessions, pace |
| `positions`       | list                   | QB, RB, WR, TE, OL, DL, LB, CB, S | PG, SG, SF, PF, C         |
| `position_groups` | map                    | offence/defence/specialists       | guards/wings/bigs         |

### 2.2 League shape

| Field            | NFL (today)                                     | NBA (target)                                        |
| ---------------- | ----------------------------------------------- | --------------------------------------------------- |
| `teams`          | 32                                              | 30                                                  |
| `divisions`      | 8 × 4 teams                                     | 6 × 5 teams (2 conferences)                         |
| `conferences`    | 2 × 16                                          | 2 × 15                                              |
| `season_games`   | 17                                              | 82                                                  |
| `weeks`          | 17                                              | 41 (with 7–8 games a night)                         |
| `playoff_teams`  | 14 (6 wildcards)                                | 16 (play-in + 8/8 + 4/4 + 2)                        |
| `playoff_rounds` | wildcard → divisional → conference → Super Bowl | play-in → first round → semis → conference → finals |
| `bye_weeks`      | none                                            | 5 per team                                          |
| `championship`   | Super Bowl                                      | NBA Finals                                          |

### 2.3 Draft shape

| Field              | NFL (today)                               | NBA (target)                                                      |
| ------------------ | ----------------------------------------- | ----------------------------------------------------------------- |
| `rounds`           | 26                                        | 2 (30 + 29 picks)                                                 |
| `snake`            | true                                      | false                                                             |
| `roster_slots`     | 26 starters (`ROSTER_SLOTS`)              | 5 starters + rotation (size TBD)                                  |
| `flex_rules`       | `FLEX` + `NATURAL_SLOT_MAP`               | TBD — see `Q-OWNER-03`                                            |
| `draft_pick_value` | per-slot marginal wins (`slotWinsPerOvr`) | per-position value (minutes/efficiency)                           |
| `cpu_pick_model`   | donor's `cpuPick`                         | same machinery, different priors (Big Three, positional scarcity) |

### 2.4 Ratings and value

| Field              | NFL (today)                             | NBA (target)                                   |
| ------------------ | --------------------------------------- | ---------------------------------------------- |
| `player_schema`    | `data/schema/player-record.schema.json` | same file, different position codes            |
| `rating_scale`     | 60–99 OVR + 6 attributes                | same scale, same attributes (mapped)           |
| `position_weights` | `DEFAULT_WEIGHTS` (QB 320 …)            | new: PG/SG/SF/PF/C values                      |
| `roster_sizes`     | 53                                      | 15 (+ 3 G-League?)                             |
| `cap`              | none                                    | optional salary cap → a genuinely new mechanic |

### 2.5 The matchup model — the one place the sports really differ

| Field            | NFL (`MC`, `PLAN_K`)                                                         | NBA                                                                       |
| ---------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| unit ratings     | QB, RB, WR/TE, OL run/pass, pass rush, run defence, coverage, kicker         | offense rating, defense rating, pace, 3P%, FT%, TOV, rebounding, rim/PO   |
| expected points  | exponential yardage model with game-plan adjustments                         | efficiency model: ORtg/DRtg, pace-adjusted possessions, shot quality      |
| home field       | (in the model)                                                               | (in the model)                                                            |
| plan adjustments | offence and defence chosen independently, scored vs _expected_ opponent plan | same idea: offensive identity and defensive identity, independent choices |
| variance         | noise + late-game script + OT                                                | garbage time, clutch, rest, back-to-backs                                 |

**The matchup model is the real work of each new sport, and it is the one thing that must not be
generic.** The council should treat each sport's model as its own reviewed artefact with its own
calibration receipt, exactly as the football model's coefficients are protected today.

## 3. What the engine owns (and must not learn about sports)

- the draft loop: snake order, CPU pick logic (profile-driven priors), the board, the priority chart;
- the season loop: schedule generation, the weekly simulation, standings with NFL-style tiebreakers
  (profile-driven), the post-season bracket, the award computation, the box scores, the recaps;
- the UI shell: tabs, navigation, the mobile layout rules (the phone-block fix), the narrative
  rendering, the save/load (if any);
- the shared deterministic maths: `slotWins`, `slotWinsPerOvr`, `modelWeights`, `effOvr`,
  `optimalLineup`, `matchupModel`, `simulateGame`, `teamRatings` — **byte-pinned across all packs**;
- the record caps (`SEASON_RECORD_CAPS`) and the language rules (English only, recap conventions).

## 4. The stage-1 seam (no engine extraction required)

Stage 1 does **not** build a profile object. It does the smallest possible version of the same idea
inside the existing single file:
1. wrap the existing `PLAYERS` and `TEAM_DATA` in named datasets: `DATASETS.current`, `DATASETS.alltime`;
2. add an `activeDataset` selector, switched by a UI toggle;
3. replace every read of the global `PLAYERS` / `TEAM_DATA` with a read of the active dataset;
4. keep every protected symbol byte-identical (the hash gate proves it);
5. ship.

Why this order: it delivers the Owner's priority 2, it needs no build step, and it exercises the
hardest remaining unknown — the 1,200-player all-time pool — before any abstraction is designed
around it. Stage 2 then generalises what stage 1 proved.

## 5. The invariant that crosses every pack

> The protected symbols are identical in every pack, and every pack's _own_ values live in its
> profile or its data file — never in the engine.

Practical consequence: a diff between two packs must show **only** profile values and data records.
If a diff shows engine code, something leaked. The council can automate this: build two packs, diff
the engine directories, expect zero differences. That is the platform's own hash gate, one level up.

## 6. Open questions this spec raises for the Owner and the Architect

- `Q-OWNER-03` — the flex concept in the NBA (which is the Owner's own example, applied to a sport
  where "slot" means something else).
- `Q-OWNER-08` — the all-time pool's composition rule ("current players eligible with about −5").
- `Q-OWNER-11` — should an all-time mode keep today's teams, or historical teams and eras?
- `Q-OWNER-14` — the NBA's draft shape: a 30-team, 2-round draft is a much smaller event than 26
  rounds; does the sim need a "multi-round league draft" fiction to stay interesting?
- Architect-level: the playoff bracket driver must be shape-parameterised (14-team wildcards vs
  16-team play-in) — the Architect's call on the abstraction, not the Owner's.
