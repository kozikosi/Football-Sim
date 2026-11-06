SPEAKER: Beam | ROLE: council | TASK: w74/04-contracts-fixes verdict | DATE: 2026-11-06 UTC

FOR: w74/04-contracts-fixes

VERDICT: improved

FOUND: 7
NEW: 2

1. 286/286 tests pass + all contract files type-check clean under strict config. VERIFIED (README).
2. 301 remaining tsc errors are pre-existing engine/view files (mechanical guards, not design). VERIFIED.
3. F1 rename (appstate.ts is the only AppState) matches the w73 F1 finding. OK.
4. F6 key on SaveStatus saving/failed is the right granularity (key-level saver). OK.
5. NEW: F14 H2 refuses week payloads lacking htd/atd instead of changing GameScore shape — this is a "corrupt-never-repair" choice, but it silently orphans any pre-ship week saves. Consistent with the no-migration ruling, but the Architect must state the orphaning explicitly in the freeze doc. Flagged.
6. NEW: `src/platform/` as storage/a11y home is a guess; the purity tests caught two wrong placements, which proves the tests work, but the Architect should bless the location (or redirect) before the freeze.
7. Engine one-liner (RunState.homeField number | undefined) is small and correct. OK.

Verdict: improved (document orphaning in freeze doc; bless src/platform/ location).