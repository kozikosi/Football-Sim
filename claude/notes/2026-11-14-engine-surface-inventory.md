# Engine surface inventory (ask 1, 14 Nov 2026). No implementation proposed.

Labels: VERIFIED (I ran or read it myself, command/lines given) / REPORTED (someone else's claim or an in-repo comment) / INFERRED / UNKNOWN.
Basis: `architect/engine-and-seats` at `91fd1f8`, `colors/src/` (read from my own clone; commands re-runnable with `git grep` at that sha).

## 0. Three corrections to the premises, up front

1. **"Engine at pin `4ca9a071`" is stale for this tip.** `4ca9a071` is a real commit in this repo (VERIFIED: `git cat-file -t 4ca9a071` prints `commit`), not an engine stamp. The engine directory differs from it by 5 files, +149/-23 (VERIFIED: `git diff --stat 4ca9a071 HEAD -- colors/src/sports/nfl/engine`): `draft.ts`, `flex.ts`, `slots.ts`, `value.ts` changed and `legacyprovider.ts` is new. That matches commits `97d7e9d` (flex, 99 rules) and `7b34a58` (Phase 0 kernel) landing after the pin. The in-code stamp has also moved: `engineVersion()` now prints `nfl1.14a4e9333e888a`; the last stamp a human looked at (`PIN_ENGINE` in `test/nfl/versions.test.ts`) is `nfl1.108bcc20a9f253` (VERIFIED by running `engineVersion()`). I did not make "my earlier receipt verified the pin" true: I have no such receipt in this session. The benchmark must therefore name the **commit sha** it ran against, not "the pin".
2. **Five of the names you listed do not exist in the code** (VERIFIED: `grep -rn -E "\b<name>\b" colors/src`): `cpuPick`, `modelWeights`, `slotWinsPerOvr`, `effOvr` (as a function), `flexPenaltyFor`. Real names in section 2. The literal `700` appears nowhere in `src/` (VERIFIED: `grep -rn -w 700`); the "700-scale contract" is UNKNOWN to me: INKLING, please give its source.
3. **`DatasetRow` is not pinned to `string | number | null` anywhere** (section 4). `null` is not in the type and would throw in the hash.

## 1. Synchronous/asynchronous shape and non-determinism

- **Engine (`sports/nfl/engine/`, 27 files, 2,491 lines): fully synchronous, zero non-determinism tokens.** VERIFIED: grep for `Math.random|Date.now|new Date|performance.now|localStorage|sessionStorage|indexedDB|fetch(|crypto.|process.|setTimeout|setInterval|await |async ` over `engine/` and `core/` returns hits only in `core/hash.ts` (async SHA-256 via `crypto.subtle`) and `core/saver.ts` (async storage writes). Nothing in `engine/`.
- **Enforcement is a gate, and the gate is now proven to fail:** `test/nfl/purity.test.ts` (per engine file: no DOM/Math.random/Date.now/storage/process/Node imports; imports only siblings or core) and `test/core/namespacing.test.ts` (core imports only core; no clock/storage). Today I found both only parsed `import ... from`, so a bare `import 'node:fs'` or `import()` slipped through; fixed in `91fd1f8`, and `tools/ci/canary.mjs` plants five violations in a scratch copy and requires the right test to go red (VERIFIED: `node tools/ci/canary.mjs` prints `CANARY OK`).
- **Limit of my claim:** the scan is on literal tokens. Aliasing (`const r = Math['random']`, `globalThis` indirection) would pass it and the purity test alike. UNKNOWN beyond literal tokens.
- **Randomness is injected, never ambient.** `core/rng.ts` `Rng { next(); int(lo,hi); normal(); pick(xs); fork(label) }` (VERIFIED, read). `fork(label)` gives an independent stream, same seed+label => same stream; `simulateGame` forks `'aggregates'`, `'margin'`, `'drives'` (VERIFIED, `drives.ts:172-185`). Game seeds are `gameSeed(seed, week, home) = forkSeed(seed, gameLabel(...))` (`seasonrun.ts:48`), so any game is regenerable.
- **Other async in `src/`** (VERIFIED, `grep -rln`): `core/app.ts` (loader contract), `core/hash.ts`, `core/saver.ts`, `platform/localstorage.ts`, `sports/nfl/app/appstate.ts` (a comment: "reducers stay synchronous"), `app/dataset.ts` (load), `app/versions.ts` (`dataVersion` hashes). Clock, storage and network access outside `core/` and `engine/`: only `platform/localstorage.ts` (VERIFIED).
- **Cross-engine float determinism: UNKNOWN, and it matters.** The engine uses `Math.exp`, `Math.tanh` (`softCap`), and `normal()` is Box-Muller. ECMAScript lets implementations approximate these, so a pick log replayed in Safari (JavaScriptCore) or Firefox could in principle diverge from Chrome (V8) in the last bit and then in a CPU pick. I ran the suite under Node 22.23 and Node 24.22 (both 323/323, VERIFIED), which is one engine. No other engine was run. Benchmark BENCH-1 section A3 measures this.

## 2. Functions the UI will call: what exists (opened = signature read; "body" = I read the implementation)

| Your name | In the code | Where | What I opened |
|---|---|---|---|
| `simulateGame` | `simulateGame(mh: Matchup, ma: Matchup, rng: Rng, opts: GameOptions): GameResult` | `engine/drives.ts:172` | signature, `GameOptions {playoff; homeField?; otLimit?}`, `GameResult {homeScore, awayScore, regHome, regAway, drives[], events[], stats, agg, ot, otSecs}`, first ~25 body lines. **Rest of body not read.** |
| `cpuPick` | **`cpuChoose(st, team, rng): {player, slot}`** | `engine/draft.ts:104` | signature only. Also `candidates`, `applyPick`, `userChoose(st, team, rng, policy)`, `runDraft(st, rng, user?)`. |
| `optimalLineup` | `optimalLineup(players, slots, stay?, stayBonus=0): Omit<Lineup,'base'>`; also `lineupFor(players, base)`, `adviseLineup` | `engine/lineup.ts:36,66` | signatures only. Assignment solver is `core/hungarian.ts` (not read). |
| `applyOffPlan` / `applyDefPlan` | `applyOffPlan(O, po)`, `applyDefPlan(D, pd, isLeague)` | `engine/matchup.ts:36,45` | signatures only. |
| `matchupModel` | `matchupModel(O0, D0, lg, plan = DEFAULT_PLAN): Matchup` | `engine/matchup.ts:66` | signature and the first ~6 body lines. Rest not read. |
| `teamRatings` | `teamRatings(spots, returner = RET_NEUTRAL): Ratings` | `engine/ratings.ts:41` | signature only. |
| `modelWeights` | **none.** Closest: `derivedWeights(base)` and `measuredDisplayWeights(base)` | `engine/value.ts` | **whole file read.** `derivedWeights` = `slotWins20 / WEIGHT_UNIT_WINS`; `measuredDisplayWeights` scales so QB = 1000, rounds to 5, "never read back into the engine" (file comment). |
| `slotWinsPerOvr` | **none.** `slotWins(slot, ovr, base)`, `slotWins20`, `WEIGHT_UNIT_WINS = 0.00254`; `WINS_PER_UNIT = 0.00254/20` | `value.ts:32`, `lineup.ts:32` | read in full. |
| `effOvr` | **function is `effectiveOvr(ovr, role, dest) = ovr - fit(role,dest).penalty`**; `effOvr` is a field on `Placement` | `engine/flex.ts:60`, `lineup.ts:22` | read in full. |
| `flexPenaltyFor` | **`fit(role, dest): {penalty, emergency, legal}`**; table `FLEX`; `EMERGENCY_PENALTY` | `engine/flex.ts:50` | read in full. |

Also exported and relevant to a UI (signatures only): `startSeason`, `fixtures`, `playWeek`, `table` (`seasonrun.ts`), `simulateSeason` (`season.ts:36`), `buildSchedule`, `seedPlayoffs`, `buildBoxScore`, `buildRecap`, `goneOdds(st, userTeam, rng, sims=30)`.

## 3. The UI contract (opened: `app/store.ts` lines 29-133, `app/selectors.ts` 1-18, `view/draftBoard.ts` 20-90)

- **A plain-TS store, no framework:** `createStore(players) -> { getState, dispatch, subscribe }`. State `{ record, draft, status: 'idle'|'drafting'|'done', error }`.
- **The only things the UI can send the engine** are four actions: `START {seed, userTeam}`, `PICK {playerId, slot}`, `UNDO`, `LOAD {record}` (VERIFIED, `store.ts:29-33`), plus selector options `{sort, limit, sims}`. The UI never passes ratings, weights, or results back in. The store re-validates every PICK itself (is it your turn, is the slot known, is the player still in the pool, `fit(...).legal`). So: **no, the UI never re-feeds engine numbers into the engine.**
- **The UI reads two selectors:** `selectBoard(state, {sort?, limit?, sims?}) -> BoardVM | null` and `selectRoster(state) -> RosterVM | null`. Every number the user sees arrives as a **string**: `ovr = showInt(p.ovr)`, `wins = signed(showDecimal('wins', w))`, `priority = signed(showDecimal('priority', pr))`, `gone = goneDisplay(g)+'%'`, plus a semantic `tone`. Sorting happens on hidden unrounded `_w`/`_p`, ties by player id, then they are stripped (`draftBoard.ts:63-76`). That is the "displayed is the user's contract, underlying math is free" law (ruling A-g) already structurally enforced in the board: the UI cannot see the underlying numbers.
- **How the three numbers are made:** Wins = best natural open slot's `candidate.wins * WINS_PER_UNIT` (else best flex slot); Priority = Wins x `goneChance(odds, id)`; OVR = the player's rating. `odds` come from `goneOdds`, 30 Monte-Carlo replays of the picks until the user's next turn, seeded `makeRng(record.seed).fork('gone' + draft.pos)` (VERIFIED, `selectors.ts:12`), so a given screen always shows the same numbers.
- **Cost shape that the benchmark must measure (not a fix):** the persistent record is the pick log plus the frozen pool; every action rebuilds the draft by **replaying the log from pick 1** (`restoreDraft`), twice per PICK (once to apply, once inside `settle`), and every board render adds up to 30 `goneOdds` replays. So per-action latency grows with the number of picks already made. I did not read `restoreDraft`'s body; its real cost is UNKNOWN until measured.
- **The season layer** (`seasonrun.ts`) is likewise pure: `startSeason` -> `fixtures` -> `playWeek(teams, state) -> {state, games[]}`; results are regenerable from `gameSeed`, and `appstate.ts:6` records that they are deliberately not persisted (REPORTED in that comment: 1.13 MB/season).
- **`appstate.ts`** carries the screen/phase unions and the `Action` union (lines 19-42 read, signatures only).

## 4. Where the data boundary sits

- `core/app.ts`: `LoadedDataset<Row = unknown>` and `DatasetLoader<Row>` are sport-free since `5a3bb75` (my D0). VERIFIED: `tsc:check` 91/91.
- The NFL tuple `readonly [string, string, string, string, number, number, number, 0 | 1]` is declared **twice**: `DatasetRow` (`app/dataset.ts:29`, readonly) and `FrozenPoolRow` (`app/saves.ts:22`, mutable). Same shape, two names.
- `core/hash.ts` `datasetHash` / `canonicalRowsText` already take `readonly (readonly (string | number)[])[]`: sport-free, integers only, rows sorted by id, text NFC-trimmed, duplicate ids refused. **`null` is not accepted:** `v.normalize` on a `null` throws (READ, not executed). So "pinned to `string | number | null`" is not today's code; whether the contract should admit `null` is a decision about the input contract (D1/§2c in my lane), and I am not making it in this document.
- The real pool: `data/nfl/madden27-ratings.csv` has 1,942 lines (header `name,pos,team,ovr,spd,str`, so 1,941 rows, REPORTED by `wc -l` + `head -1`), `free-agents-old-ratings.csv` 13 lines, `player-ids.csv` 1,954 lines. The draft is `TEAMS_N = 32` x `ROUNDS = SLOT_IDS.length = 32` = **1,024 picks** (VERIFIED, `draft.ts:13-14`).

## 5. What I did not inspect

Bodies of `simulateGame` (past its first ~25 lines), `cpuChoose`, `candidates`, `restoreDraft`, `goneOdds` (past its first lines), `teamRatings`, `optimalLineup`, `matchupModel` (past its first lines); `awards`, `recap`, `boxscore`, `kicking`, `returner`, `standings`, `schedule`, `margin`, `plans`; `app/saves.ts`, `hydrate.ts`, `legacy.ts`, `feed.ts` bodies; `platform/localstorage.ts` body; `core/keyedrng.ts`, `core/saver.ts`, `core/hungarian.ts`. Any claim above about those is limited to their signature or the grep result stated.
