# GAME-MODEL-INTERFACE.md - what the engine ports, what simulates a season, what is missing (Architect, 1 Nov 2026)
Source of truth: branch `architect/engine-and-seats`, `colors/src/engine/`. VERIFIED 1 Nov at commit 02daf99: `cd colors && npm test` = 204 pass, 0 fail. This corrects the module list in Beam's request: council/base is older than this branch and has only flex, hungarian, kicking, lineup, players, rng, slots. The game and season model exists here.

## 1. There is no single `simulate()`. A season is a composition of five pure functions
All take an `Rng` (seeded mulberry32, `makeRng(seed)`, `rng.fork(label)` for independent streams). Nothing touches DOM, storage or `Math.random` (enforced by `colors/test/purity.test.ts`).
```
pool      = buildPool(ratingsCsv, freeAgentsCsv)                       // players.ts
draft     = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG); runDraft(draft, rng.fork('run'), user?)   // draft.ts
lineup    = lineupFor(Object.values(draft.rosters[i]), '4-3' | '3-4')  // lineup.ts (Hungarian optimal assignment + flex penalties)
ratings   = teamRatings(spotsOf(lineup), returnerRating(lineup))       // ratings.ts
season    = simulateSeason(teams: {name, ratings}[32], rng, { year, prevRank?, homeField? })   // season.ts
```
`simulateSeason` returns `SeasonResult { schedule, games[], playoffs[], seeding, table, champion, finalists, nextRank }`. Each game is `simulateGame(mh, ma, rng, {playoff})` from `drives.ts`, whose `GameResult` carries drives, scoring events, team stats, OT. A box score and recap are built on demand: `buildBoxScore(res, homeSide, awaySide, rng)` then `buildRecap(res, box)`; season sums and honours: `awards.ts`.
VERIFIED this session: composing the fixture league (real Madden file, seed 777) into `simulateSeason` with seed 5 twice gives identical champion/finalists/record, and seed 6 gives a different one.

## 2. What an `NFL SportSpec.simulate(scenario, rng)` wrapper should do (for Muse's amused)
Muse's `SportSpec` (`_agents/muse/amused/packages/engine-core/src/sport-spec.ts`) has `simulate(scenario, rng): SimResult` with an opaque `payload`. The honest NFL mapping is a thin wrapper, not a rewrite:
- `scenario.seed` -> `makeRng(seed)`; fork one stream per stage exactly as above (`'draft'`, `'run'`, `'picks'`, `'user'` live inside the draft; `'schedule'`, `'seeding'`, `w<week>:<home>@<away>` inside the season). Changing a fork label changes every result: treat labels as part of `rulesetVersion`.
- payload = `{ draft: Pick[], lineups, season: SeasonResult }`. Games are heavy; keep `GameResult` and rebuild box scores lazily from `(seed, label)`.
- `validateScenario`: seed integer; 32 teams; `dataVersion` = hash of the two CSVs; reject any scenario whose rosters leave a spot unfilled (the draft guarantees 32 rounds x 32 spots).
I have not built this wrapper (it belongs where the SportSpec lives). If the Owner wants it in `colors/`, it is about 40 lines plus a determinism test like the check above.

## 3. Interfaces the UI layer already uses (do not re-derive)
`colors/src/app/store.ts` (save/replay/undo: a save is `{version, seed, userTeam, picks[]}`; the draft is replayed, not serialised), `selectors.ts`, `colors/src/view/draftBoard.ts`, `roster.ts` (view-models; UI prints through `engine/display.ts`).

## 4. Ported vs pending
| Area | State |
|---|---|
| RNG, kicking, pool, slots (32 spots), flex table, Hungarian lineup, returner | ported, tested |
| ratings, matchup model, game plans (`teamIdentity`), drive generator, margin shaping to real distribution | ported, tested |
| schedule, standings, tiebreakers, seeding, playoffs to Super Bowl | ported, tested |
| CPU draft (traits, replacement level, Gone% odds), box score, recap, season awards | ported, tested |
| Store, selectors, draft-board and roster view-models | ported, 6 tests |
| UI (Figma then Svelte 5), `build/build.mjs` | NOT built |
| Late-game script, per-week mixed plans, user's own plan choices (season uses each team's `teamIdentity`) | pending |
| OL stat lines and honours; advanced-stat cards; "why it was decided" text; head-to-head history; game previews; DL5 short-yardage snaps; FG by distance | pending (step 9 gaps) |
| Calibration re-run with the final CPU | pending |

## 5. "E5 / E9b / E9c"
UNKNOWN. I found no module, step or file called E9b or E9c anywhere on council/base, council/beam, council/muse or this branch (`git grep` of origin/council/base finds only `E1..E10` as TEST IDS inside ENGINE-MATH-SPEC.md: E5 = kick + punt return split sums to `RET_PTS`; E9 = DIME empty slot = 70). Those tests are a verification list for the Pre-Colors patch, not engine modules, and E5-E7, E9 were marked "await the build". The engine has its own tests under `colors/test/`: returner.test.ts covers the E5 idea; the 3-4 equivalence (E6) and DIME (E9) live in lineup/matchup tests. If Muse's brief names E9b/E9c, the source of that brief is needed: ask for the file and line.
