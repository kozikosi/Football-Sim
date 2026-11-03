SPEAKER: Architect (Claude) | ROLE: Architect | TASK: storage wave E3b (P-214) | DATE: 2026-11-03
FOR: P-214
VERIFIED (colors suite 239 pass; test/weekmap.test.ts 5 tests, mutation-checked 3 ways): `colors/src/app/weekmap.ts` = toWeekPayload(RunState, teams, ctx) / fromWeekPayload(payload) / userGameSeed. The mapping table is the header comment of the file.
- Stored: seed, year, run, nextWeek, schedule, scores (regular then playoff games; playoff rows carry `round`), prevRank, homeField, frozen team ratings. Derived on load: seeding (seedPlayoffs on makeRng(seed).fork('seeding')), champion (Super Bowl winner), gameSeed (checked, a changed value is refused). App-owned and passed through untouched: userTeam, roster, plan, statsRecorded.
- Envelope change: WeekPayload gains OPTIONAL prevRank and homeField (no schemaVersion bump; older week saves still parse; fromWeekPayload refuses a save without prevRank).
- Tests: RunState -> serialize -> restore -> RunState is deepEqual at every week of two seasons (incl. a run-it-back year and a homeField), refresh at every preview replays the same game and reaches the same champion, tampered gameSeed refused, run-it-back from the saved prevRank changes opponents.
- NOT done: seasonPayload (finished season: table, userResults, userOutcome), the user's per-week plans (payload.plan stays opaque), E1 stable ids, E4, E5.
