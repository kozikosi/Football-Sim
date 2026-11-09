SPEAKER: muse | ROLE: council | TASK: P-294 flex build verification | DATE: 2026-11-09T03:24:00Z

FOR: P-294

REVIEW-OF: architect/engine-and-seats flex table build (commits 4cc3dee + 2039c89), ruling claude/rulings/2026-11-09-flex-table-built.md
VERDICT: improved

BASE BUILD: architect/engine-and-seats tip 2039c89 (HEAD confirmed). Work done in a scratch tree only (/tmp/arch-flex); no repo files written or modified (git status clean after all runs). No product file, AGENTS.md, PRIORITIES.md, or protected constant touched. Labels used per claim.

## What I ran

Cloned architect/engine-and-seats @ 2039c89 into a scratch tree. Read the ruling, flex.json, flex.ts, flexcheck.mjs, flexdl5.mjs, draft.ts (old vs new), seat-check.sh, versions.test.ts, lineup.test.ts. Ran flexcheck, flexdl5, seat-check.sh (from a real council worktree), and the full Colors test suite (npm test, 290 tests).

## 1. Flex table — VERIFIED, every claim matches

- **104 rules total — YES.** Counted from flex.json.
- **Tiers {0: 14, 2: 16, 6: 18, 12: 56} — YES, exact.** flexcheck output: `rows 17 rules 104 tiers {"0":14,"2":16,"6":18,"12":56}`, `FLEXCHECK OK`.
- **QB>FS is 12 — YES.** (flex.json QB: {FS: 12}; flex.ts line 10: `QB: { FS: 12 }`.)
- **Only 0/2/6/12 values present — YES.** No 4s or 10s anywhere in the table. flexcheck enforces it (line 9: `if (![0, 2, 6, 12].includes(p))`).
- **flex.ts equals flex.json rule by rule — YES.** Programmatic comparison of all 104 rules: zero mismatches.
- **REV 4 dropped, no fallback, no switch — YES.** No model|owner switch and no REV 4 fallback in the flex files (the only "fallback" hits are the *emergency* fallback for unlisted moves, a different concept). NOW.md says "NO switch, NO fallback". `tools/mathlab/run-all.sh` has no E3a step (the REV 2 Owner-text parse is gone; the steps are E3b flexcheck, E3d flexdl5, E3c flexengine, E1/E2, E10, E4, witness).
- **DL5 prices re-derived — YES.** `flex-dl5.json` (FB 12, TE 12, OT 6, OG 6, C 6, ILB 12, OLB 12); flexdl5.mjs confirms `FLEXDL5 OK (derived from the guide; flex-dl5.json matches)`.

## 2. Re-pin — VERIFIED

- **Engine stamp nfl1.042b4efe83dcad — YES.** Recorded in `colors/test/nfl/versions.test.ts:17` (`PIN_ENGINE = 'nfl1.042b4efe83dcad'`). The E5 pins test passed, confirming `engineVersion()` matches it. The old stamp (`nfl1.0e237387b2647f`) appears only in the ruling as the "from" value, not in any code or test.
- **Arbitrage count now 16 (was 12) — YES.** `colors/test/nfl/lineup.test.ts:82`: `assert.ok(bad.length <= 16, ...)`, comment "The count is pinned (16 on 8 Nov 2026)". Test passed.
- **Base-totals test rewritten to the new table — YES.** `lineup.test.ts:229` asserts the 4-3 vs 3-4 difference is 1850 and pins the flexed placements `[['DT', 2], ['FB', 12], ['OLB', 2]]`. Test passed.

## 3. seat-check.sh — VERIFIED (including in a real council worktree)

Ran `sh /tmp/arch-flex/tools/seat-check.sh <name>` from `~/workspace/football-sim-muse` (a real council/muse worktree) on `muse` and `glm`.

- **Exists at tools/seat-check.sh — YES.** Prints all three sections: LANE-CHECK, RULES-CHECK, SEAT-STATE.
- **On `muse`:** LANE-CHECK STALE (105 commits landed after the lane file at d852fa77); RULES-CHECK 5 rules commits; SEAT-STATE ok (branch council/muse, lane 4516B; preserve flags unsaved work — 1 stash, 3 local-only commits).
- **On `glm`:** LANE-CHECK fresh; RULES-CHECK 1 rules commit; SEAT-STATE ATTENTION (branch is 'council/muse', expected 'council/glm' — correct, since I ran it from the muse worktree; the branch-mismatch detection works).
- **This addresses Claude's limitation.** He tested only in a single-branch clone; I ran it in a real council worktree and it works correctly. Note: the "preserve: UNSAVED WORK FOUND" is a real finding about the parent agent's worktree state, not a bug in seat-check.sh.

## 4. Draft resume fix — VERIFIED

**The change is exactly one line** in `colors/src/sports/nfl/engine/draft.ts`, function `replacement()`, line 69. Confirmed by reading the old version at 1e6372a and the new version at 2039c89; the rest of the function is byte-identical.

- **Old (1e6372a):** `if (st.pos - st.replAt < 6) return st.repl;`
- **New (2039c89):** `if (st.pos === st.replAt) return st.repl;`

**Plain explanation of what it does and why it fixes the resume:** `replacement()` computes the replacement level for each role from the *current* draft state — which roster spots are still open (demand) and which players are still in the pool (supply). The old code cached that value and reused it for up to 6 picks. But the state changes with every pick, so a cached value from 3–5 picks ago is stale. Worse, the save log records the picks but *not* the cache (`repl` / `replAt`), so on resume the cache is empty and gets recomputed at the resume pick. In the uninterrupted draft, at pick 600 the code might have been reusing a value computed at pick 597; on resume at pick 600 it computes fresh. Those two values differ (the state changed between 597 and 600), so the CPU's player valuations differ, and the CPU pick at 621 diverges. The new code only reuses the cache at the *exact* pick where it was computed (`pos === replAt`). Since the state at a given pick is fully determined by the picks so far — which the log *does* hold — the cached value is now a pure function of the state at that pick. On resume, the recomputed value at pick 600 is identical to what the uninterrupted draft computes at pick 600. So the resumed draft matches the uninterrupted one.

**Test evidence:** the resume-determinism test C2 passed — it cuts the log at picks [40, 101, 333, 600] and asserts the finished draft equals the uninterrupted draft. The pick-600 cut (the one that previously diverged at pick 621) now passes. The full suite passed 290/290, so no other test moved.

## 5. Test suite — VERIFIED: 290 tests, 290 pass, 0 fail

Command (in `/tmp/arch-flex/colors`, no npm install needed): `npm test` (`node --test --experimental-strip-types "test/**/*.test.ts"`), ~64.5s. Result: **tests 290, pass 290, fail 0, cancelled 0, skipped 0.**

I also ran the specific files (`resume-determinism.test.ts`, `lineup.test.ts`, `versions.test.ts`) and confirmed the key tests individually: flex table equals flex.json rule by rule; every penalty is 0/2/6/12; model-first pins; QB only QB or FS (-12); no arbitrage; base totals 1850 with the FB/SAM artifact; draft C2 crash recovery (pick-600 cut); E5 pins.

## 6. FB/SAM artifact — VERIFIED (confirmed, and worth flagging)

Under this table, a 4-3 roster in the 3-4 plays a spare DT at FB (-2) and the natural FB at SAM (-12). Confirmed by:
- The flex rules: **every lineman -> FB is 2** (DT 2, EDGE 2, OT 2, OG 2, C 2), while **FB->OLB is 12** and **FB->ILB is 12**.
- The base-totals test pins it: flexed placements `[['DT', 2], ['FB', 12], ['OLB', 2]]`, with the FB at SAM and the DT at FB.

It is **legal and pinned** (the test asserts it), and it is a direct consequence of the Owner's picked table (the 7 Nov working version lets every lineman play FB at -2, while FB>OLB is 12). It is **odd enough to flag** for the Owner/Architect — a DT playing fullback and the fullback playing SAM linebacker is not realistic football — but it is a property of the Owner's picked table, not a defect in Claude's build. The council flags it; it does not fix it.

## 7. Flexeval counts status — CONFIRMED, with one significant finding

- **The original evidence file is NOT re-run — CONFIRMED.** `tools/mathlab/results/flexeval-2026-11-08.json` is byte-identical between 1e6372a and 2039c89 (md5 `21cb060a…` both). Claude's statement is accurate for this file.
- **But the -2/-6/-12 table IS measured, in a new file Claude did not report in the ruling.** Commit 4cc3dee added `tools/mathlab/results/flexeval-pick-2026-11-08.json`, which measures the Owner's picked table ("pick"). I rebuilt `pickTable()` from the 7 Nov candidate exactly as `flexeval.mjs` does (cap12, then 4s→6s) and compared it to the built `flex.json`: **zero mismatches, same tiers** — so the pick counts ARE the counts for the built table:
  - **Fresh seeds (measured weights): 607 encouraged / 117 via -12, flex/lineup 4.251**
  - **Tune seeds: 1253 encouraged / 282 via -12, flex/lineup 4.272**
  - For comparison (fresh): today 1319/0, cap10 870/246, cap12 787/116, cap10+12on4 812/183. The -2/-6/-12 table cuts encouraged placements to 607 — lower than any measured table (23% below cap12's 787, 54% below today's 1319).
- **The pick counts were computed with the old (pre-fix) cache.** The pick file's today/cap12 counts match the original file exactly, and the ruling states the evidence counts "were computed with the old cache… not re-run." Whether the cache fix would move the pick counts is UNKNOWN (Claude says "not expected to move materially"). The council should re-run flexeval on the new table with the fix to confirm — that is a follow-up, not something I did here.

## Why the verdict is "improved" rather than "ok"

The build itself is correct on every claim I checked — flex table, re-pin, seat-check.sh, draft fix, and 290/290 tests all verify. The one gap is **reporting, not the build**: the ruling does not state the pick table counts (607 encouraged / 117 via -12 on fresh seeds). Those are the key numbers for the Owner's picked table, and the -2/-6/-12 combination is **no longer unmeasured** — it has counts, in a file Claude added but did not mention. The ruling should state them (with the caveat that they were computed with the old pre-fix cache, so a re-run with the fix is still open). The FB/SAM artifact is also worth flagging to the Owner/Architect, though it is a property of his picked table.

## SAFE ALONE? YES

No product file touched, no protected constants touched, no flex.json/FLEX change (only Claude builds the flex table). All work in a scratch tree (/tmp/arch-flex); no repo files written by the verification. This review changes nothing in the build.

EVIDENCE: flex table VERIFIED (104 rules, tiers exact, QB>FS 12, only 0/2/6/12, flex.ts = flex.json, REV 4 dropped, DL5 re-derived), re-pin VERIFIED (stamp nfl1.042b4efe83dcad, arbitrage 16, base totals 1850), seat-check.sh VERIFIED (all three sections, works in a real council worktree), draft resume fix VERIFIED (one-line cache-key change, C2 passes, 290/290), tests VERIFIED (290 pass / 0 fail), FB/SAM artifact VERIFIED (confirmed, flagged), pick counts VERIFIED (607/117 fresh, 1253/282 tune — the -2/-6/-12 table is now measured, pre-fix cache).
