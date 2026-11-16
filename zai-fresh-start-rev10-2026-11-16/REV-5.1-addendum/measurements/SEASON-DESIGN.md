# SEASON DESIGN — one page (the season sim prototype, item 6)

Seat: Z.ai · 2026-11-15 · pin `d3bd81d2` · every number on this page is the engine's own output (node-side validation run recorded in `receipts/season-timing.txt`); nothing here invents engine data.

## What the engine already owns (verified at this pin)

- `engine/season.ts` — `simulateSeason(teams, rng, { year })` → `SeasonResult`: the full 272-game schedule (`buildSchedule`), every game simulated, the standings table (`Record<string, {w,l,t,pf,pa}>`), playoff seeding (`seedPlayoffs` — the NFL tiebreaking procedures), the 13 playoff games (Wild Card → Divisional → Conference → Super Bowl, weeks 19–22), the champion and finalists, and `nextRank` for the next year's schedule strength.
- `engine/seasonrun.ts` — the same season stepped ONE WEEK AT A TIME with a plain-JSON `RunState` ("what a week save holds"); the user's per-week plan choices are not ported yet (teams play their coaching identity) — recorded as a missing view-model, not worked around.
- `engine/standings.ts` — `Book` (records, SOV, SOS, net points) + `seedPlayoffs` with the full tiebreaker chain.
- `engine/awards.ts` — `SeasonStats` + `leaders(ss, key, n)` (13 leader keys from pyd to defTd) and the `Awards` shape.
- The teams themselves: the fixture's own 1,024-pick draft log (seed 1000) is a complete league — rosters per team → `optimalLineup(roster, fieldSlots('4-3'))` → `teamRatings(spots, returner)` → 32 `LeagueTeam`s. Measured node-side: 88 ms; the season sim itself: 130 ms; deterministic (same seed → identical table and champion).

## The screens the season needs (design)

1. **STANDINGS** (built this sitting, both arms): 8 divisions × 4 rows in the engine's real alignment; per row W-L-T, PF, PA; playoff seed badges (1–7) per conference; the champion line on top ("Super Bowl: Houston Texans over Atlanta Falcons — 2027" is the seed-2027 engine result, not a prediction). Every cell is the engine's `table` + `seeding`; the arms must render byte-equal tables from the same seed (the probe asserts cross-arm text equality).
2. **SCHEDULE** (design only): week-by-week from `SeasonResult.schedule` (272 games, 18 weeks), the user's team highlighted per the §1.3 blue-ink law; per-week stepping rides `seasonrun.startSeason`/`playWeek` — the same state a week save holds.
3. **PLAYOFFS** (design only): a 13-game bracket from `SeasonResult.playoffs`, rounds labelled by the engine's own `Round` names; the Super Bowl host alternates by year parity (engine rule), no home-field edge.
4. **AWARDS** (design only): `leaders()` per key — the same engine tables the w89 awards surface needs; no new stats.

## The view-model seam (what is missing — see season-missing-vms.txt)

The app layer has NO season view-models. This sitting builds the one the standings screen needs
(`seasonVM.ts`, shared identical bytes, framework-free: picks→rosters→lineups→ratings→`simulateSeason`→shaped rows).
Everything else is named as missing, not faked: the bracket VM, the awards VM, the week-stepper VM wiring,
and the week-save integration are the next slices' work.
