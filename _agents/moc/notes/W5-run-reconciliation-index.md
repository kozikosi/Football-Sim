# W5 — Proposed `Run Reconciliation` index (supported facts only)

**Author.** MOC · 20 Oct 2026 · ID block S-2500–2599 · **PROPOSAL — not written to any shared file.**
**Rule applied.** Nothing below is included unless I reproduced it or it is attributed to its source.
`VERIFIED` = reproduced by me here · `REPORTED` = another member's report, not reproduced · `INFERRED` ·
`UNKNOWN`.

**Supersedes:** the summary counts carried in BOC `M-97` and Beam `M-100` (both of which read the
hand-edited result file at face value) — see §5 for the three specific corrections.

---

## 1. Run A — the run with artifacts on disk

| field                 | value                                                                                                                                   | label                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| run id                | `test-results/e2e-1792537022298` (immutable directory name)                                                                             | VERIFIED                                                    |
| timestamp             | `runAtUtc` 2026-10-20T22:57:02.298Z; trace written 12:57:52 local                                                                       | VERIFIED                                                    |
| artifact              | `merged.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B                                     | VERIFIED (re-derived from the file)                         |
| git ref / commit      | `merge/v20-donor` / `ff8c05ae0ef89e9030faa991a942d1c611f891bd`                                                                          | VERIFIED (as recorded; the commit is `HEAD` of that branch) |
| runner                | Playwright 1.64.1, chromium 156.0.8078.4                                                                                                | VERIFIED (from the result + trace)                          |
| executable script     | sha256 `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757`, 442 lines, byte-identical to `tests/openchamber-e2e.spec.js` | VERIFIED                                                    |
| result file           | `result.json` sha256 `d64a5f9bb3ab6e7b0b97277beb3afdf8858950be1c3b8434a5e2d46426288396` — **hand-edited after the run, see §5**         | VERIFIED                                                    |
| screenshots           | **26** = 20 viewport + 6 light/dark; 10 at 1280 px, 16 at 390 px (from PNG IHDR)                                                        | VERIFIED                                                    |
| trace                 | `trace-1792537070181.zip`, 65,863,244 B; 142 calls, **0 errors**                                                                        | VERIFIED                                                    |
| console / page errors | 0 / 0                                                                                                                                   | VERIFIED                                                    |
| 100-season report     | rendered; "What actually drove winning" count = 2; elapsed **14,451 ms** (step `durationMs`)                                            | VERIFIED                                                    |
| playoffs              | `#simPlayoffsBtn` clicked 22:57:28.850Z, no error, viewport 1280×900; champion `isVisible` → true                                       | VERIFIED                                                    |
| 272 games             | **not verified by this run** — the probe cannot work on this build                                                                      | VERIFIED (that it is unverified)                            |
| Week 1 of 17          | **check not implemented**; the build renders "Week 1 of 17" at the checkpoint (trace snapshot 22:57:20.033Z)                            | VERIFIED                                                    |
| 390px coverage        | 3 of 8 protocol clauses implemented; 20 checkpoints, 0 elements wider than 390 px                                                       | VERIFIED                                                    |
| schema validity       | 0 errors, 17/17 required fields (jsonschema 4.25.1, Draft 2020-12 + FormatChecker)                                                      | VERIFIED — but of the **hand-edited** file                  |

## 2. Run B — the "Lightning" run

| field                           | value                                                                | label                                                                                            |
| ------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| run id                          | —                                                                    | UNKNOWN                                                                                          |
| timestamp                       | "earlier" only                                                       | UNKNOWN                                                                                          |
| executable script               | —                                                                    | UNKNOWN (no script, log, result or trace on this machine)                                        |
| viewport at the disputed action | —                                                                    | UNKNOWN                                                                                          |
| simulation state                | —                                                                    | UNKNOWN                                                                                          |
| locator output / error          | —                                                                    | UNKNOWN                                                                                          |
| steps / screenshots             | REPORTED variously as 7 (5 PASS, 2 SKIP) / 10 steps / 20 screenshots | REPORTED                                                                                         |
| 100-season                      | REPORTED skipped for budget                                          | REPORTED                                                                                         |
| playoffs control                | REPORTED absent                                                      | REPORTED                                                                                         |
| cause of the difference         | —                                                                    | **UNKNOWN — must not be described as a build limitation, and must not be described as resolved** |

**Searches performed (all negative):** `find / -name result.json -newermt 2026-10-19` → 1 hit (Run A) ·
`find ~ /tmp -name "*.zip" -o -name result.json` → no E2E artifacts ·
`find ~/Library/Application Support/OpenChamber -newermt "2026-10-20 22:30" ! -newermt "2026-10-20 23:10"` → 0 files ·
`git log --all -- test-results` → empty · mirror `Football Sim/` has no `test-results/`.
The only surviving record of Run B is the Owner's PR comment of 22:45:33Z, preserved verbatim in
`_agents/moc/evidence/e2e-2026-10-20T225702Z/SUPERSEDED.md`.

## 3. Exact hashes (the only two numbers a summary should quote)

| item                              | sha256                                                             |
| --------------------------------- | ------------------------------------------------------------------ |
| result JSON (stored, hand-edited) | `d64a5f9bb3ab6e7b0b97277beb3afdf8858950be1c3b8434a5e2d46426288396` |
| proposed v2 record                | `ccddff0dedf51937f828c7ac9e31accd369eb66111ac9a33167c7e8bf378bcc2` |
| test script                       | `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757` |
| schema                            | `3f2e07cfc1db9b61b4c21dba37e0d360c4fedfbc0677ba2f51b02b25976de879` |
| artifact                          | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` |
| trace                             | `05354b056a43095d0605cee8e292756e9bfbdc5a3c40e74880ed32573d84bc92` |

## 4. Local-only vs available to every reviewer

| artifact                        | local only                              | available to all                                         |
| ------------------------------- | --------------------------------------- | -------------------------------------------------------- |
| result JSON, script, schema     | yes (untracked in the owner's checkout) | **yes** — release assets, linked from PR #3              |
| 26 screenshots                  | yes                                     | **yes** — `screenshots.zip`                              |
| 65.9 MB trace                   | yes                                     | **yes** — `trace-1792537070181.zip` (not on any branch)  |
| the protocol + schema in PR #3  | —                                       | yes (in the PR)                                          |
| `tests/openchamber-e2e.spec.js` | yes (untracked, **not in PR #3**)       | **no** — only the byte-identical copy inside the release |

## 5. The three corrections this index makes to the current summaries

1. **The stored result JSON is hand-edited, not machine output.** The script emits **10** steps and cannot
   emit `week-1-display` (it contains no Week 1 logic at all), cannot push the Week 1 `skippedChecks`
   string, and performs **no** schema validation — yet the file contains all three. Its mtime is
   13:14:57 local, **17 minutes after** the trace was written (12:57:52), and the script + schema were
   copied into the run folder only at 13:11. The script's own status logic would have written **`PASS`**;
   the edit changed it to `PARTIAL`. The edit was conservative in direction but left three defects.
   **Consequence: every field read from that file — status, 11 steps, the SKIP reason, the note claiming a
   schema PASS — inherits the edit.** The machine-made evidence (trace, 26 PNGs) is intact and
   unmodified.
2. **The Week 1 SKIP reason is wrong.** The build renders `<h3>Week 1 of 17</h3>` and a `#simWeekBtn`
   ("Simulate Week 1") in the regular-season view; the trace's DOM snapshot at **22:57:20.033Z** shows both,
   between `click #beginSeasonBtn` and `click #simSeasonBtn` — the protocol's own checkpoint. The cited
   selectors (`#weekDisplay`, `#currentWeek`, `.week-indicator`) do not exist, so an id/class-based probe
   was looking for the wrong thing. The correct statement is **"the check was not implemented"**, not
   "the build lacks the display" and not "a product change is required". BOC `M-97` §7 currently states the
   latter; it should be corrected so the architects are not sent to add markup the build does not need.
3. **"272 games" must not be attributed to this run.** `window.seasonState` has 0 occurrences in the
   artifact; the build declares `let seasonState` (line 3445), a global lexical binding reachable as the
   bare identifier only, and it has no `gamesPlayed` field. The 272 comes from `tests/e2e-smoke.mjs`
   reading `seasonState.schedule.length` — a different instrument. Report the 100-season elapsed time as
   the **step duration 14,451 ms** and keep `seasonMetrics.reportDurationMs` null until a regenerated
   record exists.

## 6. Proposed index text (for the owner to place)

> **Run Reconciliation — OpenChamber E2E, merged candidate `40233d6b…`**
>
> **Run A (on disk, `test-results/e2e-1792537022298`, 2026-10-20T22:57:02.298Z):** artifact
> `40233d6b…` (657,486 B) @ `merge/v20-donor` `ff8c05ae`; Playwright 1.64.1 / chromium 156.0.8078.4;
> script `ee9aaa44…`; **26 screenshots** (20 viewport + 6 light/dark); trace 65,863,244 B with **0 errors**;
> console/page errors **0/0**; 100-season report **rendered** in **14,451 ms**; playoffs control clicked and
> champion visible; **overall PARTIAL** because the protocol's **Week 1 observation was never asserted** (the
> build does render "Week 1 of 17" — trace snapshot 22:57:20.033Z — so this is a missing check, not a build
> limitation) and because the **390px coverage implements 3 of 8 protocol clauses**. Result JSON
> `d64a5f9b…` — **hand-edited after the run**; machine evidence (trace, 26 PNGs) intact. Proposed corrected
> record `ccddff0d…` (schema-valid, 0 errors).
>
> **Run B (Lightning):** artifacts **not recoverable**; step/screenshot counts, budget and the playoffs
> observation are **REPORTED, not verified**; cause of the difference **UNKNOWN**; no attribution to the build.
>
> **Superseded:** Ultra's earlier Week 1 **PASS** (superseded by the corrected PARTIAL); the stored result
> JSON's "24 screenshots" note (→ 26); the stored result JSON's "Schema validation: PASS" claim (no such
> check exists in the runner); BOC `M-97` §7's "product change required" note for Week 1.
