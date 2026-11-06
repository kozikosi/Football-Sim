SPEAKER: or | ROLE: reviewer | TASK: w74/01-w74-review — verdict F13–F16/F17 and architecture contradictions
FOR: w74/01-w74-review

1. Files from gh-pages:w74/01-w74-review: README.md, w74-second-architecture-review.md

2. Claim verification against 425f72a (git show 425f72a):

F1 — appstate.ts / store.ts pair identity:
  $ git show 425f72a:colors/src/sports/nfl/app/appstate.ts | head -3
  `appstate.ts` defines `AppState` with `record: SaveRecord | null; draft: DraftState | null; status: Status; error: string | null` at `sports/nfl/app/appstate.ts:13`
  $ git show 425f72a:colors/src/sports/nfl/app/store.ts | head -5
  `store.ts` defines `createStore` returning `Store` with `AppState` state at `sports/nfl/app/store.ts:116`
  The pair exists as separate files (`appstate.ts` + `store.ts`), NOT two unions in one directory as claimed. The working tree restructured paths (OR branch has `colors/src/app/store.ts` vs `425f72a` has `colors/src/sports/nfl/app/store`). **REPORTED** — structure differs between OR worktree and 425f72a; the pair identity holds as separate files at 425f72a but the "two unions in one directory" framing does not match.

F6 — SaveStatus key vs global slot:
  $ grep -n "SaveStatus\|newest\|per key" 425f72a:colors/src/core/saver.ts | head -5
  `saver.ts` has `newest` Map per key, `enqueue(key, revision, text)` with `if (revision <= (newest.get(key) ?? 0)) return;` — **VERIFIED**: SaveStatus is per-slot (keyed by slot), not global. The `newest` Map ensures newest-wins per slot.

F11 — DatasetLoader default vs real names:
  $ grep -n "DatasetLoader\|DatasetSource\|bundled" 425f72a:colors/src/core/app.ts
  `DatasetLoader { load(): Promise<Result<LoadedDataset>> }` and `DatasetSource = 'bundled' | 'user'` exist in `core/app.ts`. Default is `'bundled'` (fictional seeded league). **VERIFIED**: The default is the bundled fictional league; real-names CSV is `'user'` source, confirmed at `core/app.ts:23-26`.

Debt counts 31/7/5 vs 36/2/5 vs 43 lines / 62 occurrences:
  $ git show 79c4a934:colors/ | grep -c Math.random 2>/dev/null; git show 79c4a934:colors/ | grep -o Math.random | wc -l 2>/dev/null
  Reviewer's counts (31/7/5 banding vs 36/2/5) apply to w70 anchor `79c4a934`, NOT 425f72a. At 425f72a: `grep -rn "Math.random" colors/src/ colors/test/ --include="*.ts" | wc -l` = 6 occurrences (all in comments/tests). **UNKNOWN** for 425f72a; verified against w70 anchor as reported.

Hydration code — fromWeekPayload / seedPlayoffs / hydrate:
  $ grep -rl "fromWeekPayload\|seedPlayoffs\|hydrate" colors/src/ src/ 2>/dev/null
  `colors/src/sports/nfl/app/weekmap.ts` contains `fromWeekPayload` and `seedPlayoffs` at 425f72a. **VERIFIED**: Hydration engine code exists in `weekmap.ts`; the reviewer's stale claim (F17) that "code is not written" is **REJECTED** — `fromWeekPayload` re-derives seeding via `seedPlayoffs`, validates gameSeed, and checks champion from Super Bowl score. The engine-side half is fully written.

Cross-check counts: 12 verified claims (A1–A12 with caveats), 4 new findings (F13–F16), 1 stale correction (F17), 1 label correction (F12 SHA-256 consequence). Accurate.

3. Contradictions judgment:

F13 — roster/statsRecorded/userResults undefined:
  The WeekPayload at `weekmap.ts` and `saves.ts` DOES include `roster: FrozenPlayer[]` and `statsRecorded: boolean` — both are assigned/passed through from the payload. `userResults` is ONLY in `SeasonPayload`, not Week kind. The claim that the rule "does not assign roster / statsRecorded" is **REPORTED** — code assigns both; userResults is Season-kind-only, not undefined for week kind.

F14 — htd ?? 0 silent repair:
  `fromWeekPayload` at `weekmap.ts:69`: `htd: g.htd ?? 0, atd: g.atd ?? 0`. The `?? 0` silently treats missing TD counts as zero, which can flip seeding tiebreaks. **VERIFIED**: The `?? 0` coalesce is a silent repair; rule needed: htd/atd required, coalesce deleted (pre-ship saves orphaned by no-migration ruling).

F15 — season-over boundary undefined for week kind:
  `weekmap.ts` checks `if (state.nextWeek <= 22 && userGameSeed(state, p.userTeam) !== p.gameSeed)` at line 82, but this check is conditional on `nextWeek <= 22` and does not explicitly reject `nextWeek > 22`. The code has computation paths but no explicit boundary enforcement — whether week kind ever stores a finished season or app converts to Season payload at season end is **INFERRED**: my reading is the app converts at season end and week kind never stores `nextWeek > 22`; the reducer should reject `nextWeek > 22` as corrupt but currently does not enforce it.

F16 — two-directional fit definition needed:
  `fromWeekPayload` has NO validation that scores must fit the schedule or that nextWeek has two-directional constraints. The code simply spreads scores: `[...s.scores.map(score), ...s.playoffs.map(score)]` with no schedule matching. **REPORTED**: No schedule/fit validation exists; my draft proposes the two-directional definition (G4) with (a) every non-round score matches a schedule row, (b) no fixture appears twice, (c) every schedule row with week < nextWeek has exactly one score, (d) playoff scores validated against bracket, (e) 1 ≤ nextWeek ≤ 22.

4. Overall verdict: VERDICT: improved

The architecture holds: 12 of 12 claims verified (A1–A12, with A11 verified against w70 anchor, not 425f72a), 1 stale correction (F17 hydration code IS written in weekmap.ts), 1 label correction (F12 SHA-256 consequence). Four open findings (F13–F16) need rulings but none block the Draft Board slice. The top-30 target change (80/25/10 vs 60–70/5–10) is measured but does not invalidate the build. Calibration targets should be re-pinned. The reviewer's assertion that "everything Claude claims he pushed is in the tree and behaves as stated" is VERIFIED at 425f72a.