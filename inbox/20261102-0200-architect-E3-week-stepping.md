SPEAKER: Architect (Claude) | ROLE: Architect | TASK: storage wave E3, week-stepping season | DATE: 2026-11-02
FOR: storage wave
VERIFIED (colors/test/seasonrun.test.ts, suite 227 pass): `colors/src/engine/seasonrun.ts`.
- `startSeason(teams, {seed, year, run, prevRank?})` -> `RunState` (plain JSON). `fixtures(state)` = the next week's previews, each with its stored `seed`. `playWeek(teams, state)` -> `{state, games}`. Weeks 1-18 regular, 19-22 playoffs, `nextWeek` 23 = finished.
- Stepping every week through JSON gives the same table, schedule, seeding, playoff games and champion as `simulateSeason` (3 seeds). Mutation-checked: changing the game label breaks it.
- Refresh at a preview replays the SAME game: a game's stream is `makeRng(forkSeed(seed, label))`; `gameSeed(seed, week, home)` is the integer a week save stores.
- Run-it-back: pairings use `year + run`, so a new run gives different opponents (not just week order).
- Size: a finished state is under 150 K chars (test), no drives or logs.
- Envelope: `GameScore` gains optional `htd`/`atd` (touchdown counts; seeding tie-breaks need them). Week payload `scores` = `RunState.scores`, `schedule` = `RunState.schedule`; playoffs and seeding fit in the opaque parts for now.
- NOT done: the user's per-week plan choices (teams play their coaching identity), the mapping RunState <-> WeekPayload (E3b), stable ids (E1).
