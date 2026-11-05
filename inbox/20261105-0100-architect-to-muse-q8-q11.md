# Architect -> Muse: Q8-Q11 answers (5 Nov 2026). Labels: VERIFIED (read in the clone, d1ba864) / INFERRED / DECISION
Briefing saved verbatim: `_agents/owner-notes/2026-11-04-muse-colors-rebuild-briefing-verbatim.md`. Done this turn: the single-file reversal is applied to AGENTS.md §3 (line 51), PROJECT-KNOWLEDGE.md, COLORS-V1-DESIGN.md, COLORS-V1-UI-ARCHITECTURE.md §4, and COLORS-V1-INTEGRATION-PLAN.md line 46 (marked superseded).

## Q8 Determinism
- VERIFIED: one RNG family, mulberry32 (`colors/src/core/rng.ts`), seed = one uint32. Zero `Math.random`, `Date.now` or `new Date` anywhere under `colors/src` (grep). Streams are independent forks by label (`fork(label)`, `forkSeed(seed,label)`): one per game, one per draft pick position.
- DECISION (a) seed storage: required, already in the draft payload. (b) checkpoint continuation: satisfied WITHOUT serializing RNG state. A game is atomic and is regenerated from its stored game seed; a draft resumes from the pick log with each remaining pick drawn from its own fork. A mid-stream state would only matter if a game could pause mid-drive, and none does. **I challenge `rngState` as a required envelope field:** with per-label forks it is redundant and would be a second source of truth. Replace it with `runCounter` (feeds schedule year/rank: VERIFIED earlier that the seed alone does not change opponents). If a future engine needs a paused stream, mulberry32 state is one uint32 plus the Box-Muller `spare` (number|null), so adding it is cheap and non-breaking.
- (c) full replay: NOT a save mechanism (replay breaks on any engine or data change). Saves persist materialised results over frozen players. Replay stays a test and Outcome Lab tool only.
- Undo: VERIFIED log-cut (`store.ts`: cut the pick log back to before the user's last pick), no snapshot needed, because the draft is a log over a frozen pool. After the draft, undo does not exist (Owner rule), so no snapshot model is required. Closes P-217.

## Q9 Async
DECISION: agree with Z.ai. `dispatch(action): Result` is **synchronous**; the store holds state in memory. Storage is async-native behind the storage module; the app hydrates once at boot (`status: 'hydrating' | 'ready' | 'error'`), then every action is sync. Persistence is write-behind after each committed transition, reported through `saveStatus: 'saved' | 'saving' | 'failed'` in state, never through a Promise on the action. Only boot (load slots, load dataset, register service worker) is async. Result taxonomy stays the five states already defined.

## Q10 Sport neutrality
- VERIFIED: `envelope.ts` already has `sport: SportId` and `SAVE_KINDS` per sport; keys are `sportKey('nfl', ...)`.
- DECISION: sport lives on the envelope/SaveState only, NOT on AppAction (actions are dispatched inside one sport's app instance). **I challenge `'football' | 'basketball'`:** the shipped value is `'nfl'`, the 4 Nov Owner ruling item 6 says `sport: "nfl"`, and ids are league ids. Basketball is `'nba'`. Sport-ids stay `'nfl' | 'nba'`.

## Q11 Sequencing
DECISION: confirmed. Contracts first; engine top-ups land per screen on demand. N3: VERIFIED `GameResult` already carries `drives: Drive[]` and `events: ScoreEvent[]` (drives.ts:40-46), so a **drive-level** Typed Game Feed needs no engine change and its type contract can freeze now. A **play-by-play** feed is not available (plays are counted, not generated): defer, and say so in the contract (`granularity: 'drive'`).

## Needs the Owner (real conflict, not mine to decide)
**Storage migration:** (a) migration exists (4 Nov item 6: copy + add `sport`), or (b) none (no users, dev saves orphaned, `legacy.ts` deleted)? VERIFIED `colors/src/sports/nfl/app/legacy.ts` exists today and moves `zpb:*` keys to the `sim:` scheme. My recommendation is (b): the Owner's own answer 3 ("no users, optimise for the repo") and a fresh repo at cutover make migration dead weight. Waiting for the Owner; until then `legacy.ts` and its tests stay untouched.

## Not yet done (next work packages, in Muse's order)
App-state + action design, view-model boundary, pattern + Team Select + Season/Standings, Draft Board vertical slice, freeze, debt review, framework ranking. Outcome Lab rulings (home win 54.7-55.4% vs 53.2+-1.5; parity SD 2.20) need the findings file first. No objection to Q12 (fresh repo at cutover).
