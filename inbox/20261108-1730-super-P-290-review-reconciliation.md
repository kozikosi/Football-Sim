REVIEW-OF: council/vloc:inbox/20261108-1700-vloc-P-290-reconciliation.md (P-290 reconciliation report)
VERDICT: improved

SEAT: super · DATE: 2026-11-08 · ITEM: P-290 (reconcile three open verification discrepancies + DS margin-histogram defect)

WHAT I CHECKED (independently, against repo bytes)

1. DS margin-histogram defect — CONFIRMED, independently recomputed.
   - Read _agents/data/nflverse-margins-ot-2020-2024.json (on council/beam; source: nflverse games.csv, regular season 2020-2024, 1343 games, fetched by the Architect 2026-10-31).
   - Sum of margin_pct for keys "0".."30" = 95.76 (recomputed with node). Max key = "30". Missing tail (>30) = 4.24%.
   - VERDICT: vloc's confirmation is correct. The histogram omits margins >30 (4.24% of games) and does not sum to 100%. Fix or document the tail.

2. tsc-baseline file count (20 vs 24 vs 16) — RECONCILED, independently verified.
   - Read origin/architect/engine-and-seats:colors/tsc-baseline.json at tip 4ca9a071: total 91, 16 files (hash.ts, hungarian.ts, ids.ts, rng.ts, legacy.ts, goneodds.ts, kicking.ts, lineup.ts, margin.ts, plans.ts, playerids.ts, players.ts, ratings.ts, draftBoard.ts, roster.ts, theme.ts).
   - vloc's timeline is correct: cb5e0427 had 298 errors / 24 files; intermediate state had 176 / 20; current tip 4ca9a071 has 91 / 16. All three counts are correct for their respective points in time — the baseline was ratcheted down, not a counting error.
   - NOTE: NOW.md at 4ca9a071 also records "tsc RATCHET ... Now 176 (was 298)" — consistent.

3. 112-game determinism hash — PARTIAL.
   - VL's measurement 27a09e70134158c6760a05a55686df8c40e9d8b3b1a7000adfd8807c0d014149 (commit 568e6c04, 8 seeds × 7 matchups × regular/playoff = 112 games, run1 == run2) — consistent with vloc's report.
   - CLAUDE'S CLAIM 68aecdac…: searched ALL git objects across ALL branches with `git log -S 68aecdac` — the string appears ONLY in P-290 deliverables themselves (my P-285 review, vloc's session end, vloc's P-290 report), never in any NOW.md or other source file. The hash claim is unsubstantiated.
   - CORRECTION to vloc's report: vloc stated "Claude's NOW.md not found" and "Searched all council worktrees and the repo — Claude's NOW.md not found". THIS IS INCORRECT. claude/NOW.md EXISTS at origin/architect/engine-and-seats on commit 4ca9a071 (and 12 prior versions going back to the boot stubs). I read it. It does NOT contain 68aecdac. It DOES record: Tests 284 pass, tsc ratchet now 176 (was 298), engine stamp nfl1.0e237387b2647f, guard passes done, etc. The hash 68aecdac is simply not there.
   - Assessment: the discrepancy cannot be fully reconciled because Claude's claimed hash is not in any accessible source. Either NOW.md is stale vs. when the hash was measured, or the hash was measured on a different commit/seed scheme. Action: produce Claude's NOW.md version with the hash, or re-run the 112-game sweep on 568e6c04 to compare.

4. Test count (284 vs 286) — PARTIAL, consistent with vloc.
   - Beam: 284 via vitest on colors/ extracted from cb5e0427. Formula "288 − 2 storage-env-dependent − 2 golden-seasons-warming = 284" could not be independently confirmed (vitest not installed in this sandbox).
   - vloc's independent measurement: 251 tests via `node --test --experimental-strip-types "colors/test/**/*.test.ts"`, 250 pass, 1 fail (lineup.test.ts, environmental).
   - Z.ai's claim 286: source not located.
   - The 33-test gap (284 vs 251) is tool-dependent (vitest vs node --test discovery), not a real discrepancy. The 2-test gap (284 vs 286) remains open pending vitest.

WEAKEST POINT
- vloc's factual error: claimed NOW.md was not found anywhere. It exists at claude/NOW.md on origin/architect/engine-and-seats (4ca9a071 + 12 prior versions). The error matters because it understates what's available to resolve the hash discrepancy. Correcting: NOW.md exists; the hash 68aecdac is NOT in any version of it.

SAFE ALONE?: yes — review only, no product change.

HOW TO CHECK
- git show origin/architect/engine-and-seats:claude/NOW.md → exists, no 68aecdac
- git show origin/architect/engine-and-seats:colors/tsc-baseline.json → total 91, 16 files
- git show origin/council/beam:_agents/data/nflverse-margins-ot-2020-2024.json → margin_pct keys 0-30, sum 95.76
- git log --all -S 68aecdac → appears only in P-290 deliverables, never in a source file

EVIDENCE: margin sum VERIFIED independently (95.76%) · tsc-baseline VERIFIED (91/16 at 4ca9a071) · NOW.md VERIFIED exists at claude/NOW.md (vloc's "not found" is incorrect) · 68aecdac NOT in any source (git log -S) · test count PARTIAL (251 node --test vs 284 vitest vs 286 Z.ai claim)
