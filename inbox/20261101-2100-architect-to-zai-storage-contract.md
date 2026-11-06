SPEAKER: Architect (Claude) | ROLE: Architect | TASK: storage wave, brief for Z.ai (Phase 0 plan + first build) | DATE: 2026-11-02 (1 Nov HST)
Read on branch `architect/engine-and-seats` (fetch it; do not check it out in your worktree): this file, `inbox/20261101-2000-architect-storage-assessment.md`, `_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt`, `2026-11-01-storage-answers-verbatim.txt`, `2026-11-01-run-it-back-slots-stats-verbatim.txt`. Labels: VERIFIED / REPORTED / INFERRED / UNKNOWN.

## 1. Owner decisions since the brief (all locked, verbatim in the notes above)
- **Mid-game refresh replays the SAME game**: same opponent, same events and score. Mechanism: the game's seed is stored when the week's preview is saved. No anti-farming structure ("fine with 17-0").
- **Run it back** = one button, lands on the preseason page with the SAME drafted roster, a new seed, ideally a different schedule. It goes into the next free slot silently; if all 3 are full the user is asked which slot to overwrite (A/B/C). It reuses the frozen roster as it was (Architect's reading; reversible). A run-it-back finishing counts for global stats like any season.
- **New drafts always use the latest player database.** A saved slot must resume without nulls or glitches however the database changes: saves carry their own frozen players and version stamps; resume never reads the live database.
- **Stats are recorded the moment the user's team is eliminated** (misses the playoffs, loses in any round, or wins the Super Bowl), once, flagged on the slot so refresh or finishing the season cannot double count. This REPLACES the brief's "only completed seasons record stats". Abandoned before elimination: nothing. A completed draft that never becomes a season: nothing.
- Everything else in the Architect assessment is accepted by the Owner.

## 2. What you build now (no engine dependency)
Facade (async `list, load, save, delete(soft), migrate`) + localStorage adapter + write safety (temp key, one-deep backup, validate on load) + typed load result `ok | empty | corrupt | newer-version | unavailable` + multi-tab warning + global stores (profile, settings, stats overall AND by franchise, achievements; keyed by franchise, never by slot) + brag share (button on results, clipboard, toast, deployed URL only) + UX (Continue, slot selector, A/B/C overwrite, profile panel with the empty-state sentence, settings) + test rig (Map-backed KV: interrupted write, corruption, quota, unavailable, two tabs). No compression in v1. Your Phase 0 plan should say how empty vs corrupted vs "storage unavailable" read to the user, and must not imply a recovery path after a data clear.

## 3. Contract draft (the envelope; I own its final TypeScript type, due next on this branch)
`{ kind: 'draft'|'week'|'season', schemaVersion: int, engineVersion: string, dataVersion: string, slot: 'A'|'B'|'C', savedAt: ISO string, payload }` - plain JSON, no Maps, no engine objects. Storage treats `payload` as opaque and validates only the envelope. Payload contents (mine): draft = seed, userTeam, picks log by stable pid, frozen pool; week = seed, year, run counter, 32 team ratings, user's 32 frozen players, schedule, scores so far, next week, the game's seed, `statsRecorded`; season = final table, user's results, champion, frozen roster, `statsRecorded`. Facade API takes and returns envelopes only; it must not import anything from `colors/src/engine/**`.
## 4. Do not touch
`colors/src/engine/**`, `colors/src/app/store.ts`, the 39-function seam and its 10 laws, `build/build.mjs`, fork labels, `zpbPackFor` and the team packs, protected constants. Put the storage module in its own payload block (own marker comments, same pattern as `w51-js`); wire screen call sites in a separate commit. You push `council/zai` only.

## 5. Questions for you (answer in your Phase 0 plan)
1. Deployed URL, and is the shipped file ever opened from `file://`? (storage origin; a host change loses all saves.)
2. Safari/iOS: does storage survive a week unused in your tests? (I only INFERRED eviction.)
3. Stats list (~8-10) now has the elimination trigger: define which stat updates at which stage, and the "franchise legend" formula. Per franchise: best W-L, best result (round reached or title), seasons and total record.
4. Which screens exist for "preseason" and "results" in w58, so run-it-back and brag have homes.
5. Cheap timing: JSON.parse + localStorage write of 250 KB on a mid-range phone.
