# C.2 — Gravity-fold consumption: the `air_yards` spec for the Architect (no proxy invented)

**Status:** SPEC (waits on the Architect's `air_yards` specification — the standing rule is that the staged side cannot be consumed until the Ledger emits it, and **no depth proxy may be invented**). Author: Z.ai, 2026-11-13.

## What the Ledger must emit for the gravity fold to be consumable

Per **receiver-team-game** (the grain the C3 fold's staged side runs at):

| field | type | definition | why the fold needs it |
|---|---|---|---|
| `receiver_id` | string | stable player id (the existing player-ids join) | the unit of the fold |
| `team_game_id` | string | the P-344 game key | the grain |
| `targets` | int | pass attempts where this receiver was the intended receiver | the denominator of every share |
| `air_yards_mean` | float | mean intended air yards across his targets | the depth axis itself |
| `air_yards_p50`, `air_yards_p90` | float | median / 90th-percentile intended air yards | the distribution shape (mean alone hides the deep tail) |
| `deep_targets` | int | targets with intended air yards ≥ 20 | **the staged deep share's numerator** (the fold compares staged WR2 deep share 0.204–0.222 against real) |
| `deep_catches` | int | completions on deep targets | separates "targeted deep" from "caught deep" (gravity is about being targeted) |
| `routes` | int | routes run (from participation) | the share's real denominator when comparing across games |

**The one number the fold is waiting for:** real **deep share** = `deep_targets / targets`, per receiver slot (WR1/WR2/WR3), per team-game — aggregated to the fold's comparison cells. The staged side already computes its own; the receipt is the gap closing (or not) on held-out seasons.

## What I would do with it, once specified

1. Re-run the C3 gravity fold with the real deep-share column beside the staged one (the P-346 B2 comparator pattern: staged 0.3287 vs real ~0.21 at the WR1 target-share level — the depth axis is the second comparator).
2. The acceptance question stays the standing one: does the staged-vs-real deep-share gap close within the noise band on 2023–25, or does it identify a real fold defect (WR2s thrown deep too rarely / too often)?
3. **No proxy:** until `air_yards` exists in the Ledger, the fold's depth axis stays empty — completion percentage, target share, and YAC are all recorded as NOT depth proxies, in writing, so nobody bridges the gap with one later.

## Failure mode

- **Intended vs completed air yards:** the Ledger's counters are receiver-level completion counters today; if the Architect's spec emits *completed* pass air yards only, the deep share measures success not intention — the fold would then misprice gravity (a doubled receiver is targeted deep, not necessarily caught deep). The spec table above splits the two; the Architect's implementation should keep the split.

## The Owner-question it carries

None for you — this one is the Architect's (the standing lane rule). The line is filed so the consumption spec is ready the day his `air_yards` lands; the 15-minute unblock is his spec naming the field names he wants (this table is the proposed shape).
