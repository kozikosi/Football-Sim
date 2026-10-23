# W2 — Run-by-run forensic reconciliation (two rows, kept separate)

**Author.** MOC · 20 Oct 2026 · ID block S-2500–2599
**Scope.** Read-only forensic reconciliation of the two reported runs. No file was modified, no run was repeated.
**Verdict key.** `VERIFIED` (reproduced by me here) · `REPORTED` (from another member's report) · `INFERRED` · `UNKNOWN`.

---

## 1. The two-row record

| field                           | **Run A — on disk**                                                                                           | **Run B — "Lightning's run"**                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| run id (immutable)              | directory `test-results/e2e-1792537022298`                                                                    | **UNKNOWN** — no identifier exists in any artifact                                                                            |
| timestamp                       | `runAtUtc` `2026-10-20T22:57:02.298Z`; trace written 12:57:52 local                                           | **UNKNOWN** — reported only as "earlier"                                                                                      |
| artifact hash                   | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` — re-derived from `merged.html`, **MATCH** | same hash is **REPORTED**, not verifiable                                                                                     |
| git ref / commit                | `merge/v20-donor` / `ff8c05ae0ef89e9030faa991a942d1c611f891bd`                                                | **UNKNOWN**                                                                                                                   |
| runner / browser                | Playwright 1.64.1 · chromium 156.0.8078.4                                                                     | **UNKNOWN**                                                                                                                   |
| executable script               | `test-script.spec.js` sha256 `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757` (442 lines)   | **UNKNOWN** — no script, log, or result for this run exists on this machine                                                   |
| viewport at the disputed action | `setViewportSize 1280×900` at 22:57:28.754Z, **96 ms before** the click at 22:57:28.850Z                      | **UNKNOWN**                                                                                                                   |
| simulation state at that moment | regular season driven (`#simSeasonBtn` clicked 22:57:23.272Z); playoffs action asserted visible 22:57:23.718Z | **UNKNOWN**                                                                                                                   |
| step results                    | see §2 — **and see §4, the stored JSON is not the runner's output**                                           | REPORTED: 7 steps (5 PASS, 2 SKIP) / later described as 10 steps, 20 screenshots, 100-season skipped, playoffs control absent |
| artifacts on disk               | 26 PNG · 65,863,244 B trace · result JSON · schema · script                                                   | **none**                                                                                                                      |
| evidence status                 | **VERIFIED** from trace + PNG headers                                                                         | **UNKNOWN** — not re-measurable; must not be described as a build limitation                                                  |

**Search performed for Run B's evidence** (`VERIFIED` negative): `find / -name "result.json" -newermt 2026-10-19` → 1 hit (Run A only) ·
`find ~ /tmp -name "*.zip" -o -name "result.json"` → no E2E artifacts ·
`find ~/Library/Application Support/OpenChamber -type f -newermt "2026-10-20 22:30" ! -newermt "2026-10-20 23:10"` → **0 files** (the OpenChamber app kept no run log for that window) ·
`git log --all -- test-results` → empty (never committed) ·
the mirror `Football Sim/` contains no `test-results/`.
The only surviving record of Run B is the Owner's PR comment of 22:45:33Z (reproduced verbatim in
`_agents/moc/evidence/e2e-2026-10-20T225702Z/SUPERSEDED.md`).

**Label for Run B: `UNKNOWN`.** Not "different run", not "build limitation", not "viewport race".

## 2. Run A — what the trace actually shows

142 calls, **0 errored calls in the entire trace**; 26 screenshot calls; 6 `emulateMedia` (light/dark) calls;
291 DOM snapshots; 1,480 screencast JPEGs; 1,497 `screencast-frame` events.

| UTC                   | call                                                                               | outcome                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 22:57:06.482          | `click #startDraftBtn`                                                             | no error                                                                                           |
| 22:57:09.748          | `click #speedInstantBtn`                                                           | no error                                                                                           |
| 22:57:10.105          | `click #simToEndBtn`                                                               | no error                                                                                           |
| 22:57:14.345          | `click #resultsSeasonBtn`                                                          | no error                                                                                           |
| 22:57:16.770          | `click #startSeasonBtn`                                                            | no error                                                                                           |
| 22:57:19.849          | `click #beginSeasonBtn`                                                            | no error                                                                                           |
| **22:57:20.033**      | **DOM snapshot (390×844)**                                                         | **contains `H3margin:0;Week 1 of 17` and `BUTTONresetbtnsimWeekBtn…Simulate Week 1`**              |
| 22:57:23.272          | `click #simSeasonBtn`                                                              | no error                                                                                           |
| 22:57:23.718          | `expect '#simPlayoffsBtn, button:has-text("Regular Season Review")' to.be.visible` | **passed**                                                                                         |
| 22:57:28.679          | probe `window.seasonState?.gamesPlayed ?? window.regularSeasonGamesPlayed`         | **`null`**                                                                                         |
| 22:57:28.754          | `setViewportSize 1280×900`                                                         | viewport in force for the click                                                                    |
| **22:57:28.850**      | **`click #simPlayoffsBtn`**                                                        | **no error**                                                                                       |
| 22:57:31.226          | `expect` champion locator visible                                                  | **passed**                                                                                         |
| 22:57:32.928 / 33.800 | screenshots                                                                        | `viewport-playoffs-champion-desktop.png` (1280×3953) / `viewport-playoffs-champion.png` (390×6045) |
| 22:57:34.083          | `isVisible` champion locator                                                       | **`true`**                                                                                         |
| 22:57:34.291 / 34.358 | `isVisible #sim100Btn` → `click #sim100Btn`                                        | **`true`** / no error                                                                              |
| 22:57:48.448          | `isVisible` report locator                                                         | **`true`**                                                                                         |
| 22:57:48.541          | `queryCount` "What actually drove winning"                                         | **2**                                                                                              |

**On the playoffs discrepancy (Run A side, `VERIFIED`):** the button was present, visible and clickable; the
viewport was set explicitly by the script 96 ms before the click, so **the viewport is a constant, not a
race**; the champion banner became visible afterwards. The "may be clipped at 390 px" explanation is not
supported by this run — at 390 px the _check_ ran too (22:57:33.306) and produced 0 overflowing elements.
**On Run B's side: `UNKNOWN`** — its viewport, state, locator output and error text are not recoverable,
so the difference is not attributable to the build.

## 3. The two probes that returned null — and why (root cause, `VERIFIED`)

The result JSON records `draftPicks`, `regularSeasonGamesPlayed`, `playoffRoundsCompleted` and
`reportDurationMs` as `null`. The cause is a **probe bug, not a missing capability**:
- `window.seasonState` — **0 occurrences** in the 657,486 B artifact. The build declares
  `let seasonState = null;` (line 3445) and assigns `seasonState = { teams, schedule, currentWeek: 1, … }`
  (line 3457) as a **global lexical binding** — reachable as the bare identifier, never as a `window` property.
  Confirmed live over CDP against this artifact: `typeof seasonState` → `"object"`, `window.seasonState` → `undefined`.
- `window.draftSim` — same pattern (`let draftSim`), and `draftSim.pos` is not a field either.
- There is **no `gamesPlayed`** field anywhere in the build. The count that exists is
  `seasonState.schedule.length` (= 272), which is exactly what `tests/e2e-smoke.mjs` reads.
- `playoffRoundsCompleted` and `lastReportDurationMs` do not exist either.

**Consequence for the record:** "272 games were verified" is **not** supported by this run. The 272 figure
comes from a different instrument (`tests/e2e-smoke.mjs`, which reads `seasonState.schedule.length`) and
must be attributed to it. The **100-season elapsed time is supported**: the step record's `durationMs`
is `14451`.

## 4. **Finding that changes how the result JSON must be read** — the stored JSON is not the runner's output

`VERIFIED`, three independent ways:
1. **The script cannot emit the step that is in the file.**
   `grep -oE "recordStep\(page, '[a-z0-9-]+'" tests/openchamber-e2e.spec.js` →
   `initial-load start-draft select-instant-speed sim-to-end click-results-season start-season begin-season sim-season sim-playoffs sim-100-seasons`.
   There is **no `week-1-display` step** — and `grep -n "week-1\|week1\|Week 1" tests/openchamber-e2e.spec.js` → **0 hits**.
   The stored file contains a step `{id:"week-1-display", status:"SKIP", …}` with a prose reason.
2. **The script cannot produce the `skippedChecks` entry in the file.**
   Its only `skippedChecks.push` is `'100-season simulation (budget/time)'` (line 414, and only when that
   step is SKIP — it was not). The file's `skippedChecks` is the Week 1 string.
3. **The script performs no schema validation at all.**
   `grep -nE "jsonschema|Ajv|schema.*valid" tests/openchamber-e2e.spec.js` → **0 hits**. Yet the file's
   note 5 asserts _"Schema validation: PASS (all 17 required fields, valid enums, suite const,
   schemaVersion=1, gitCommit format, artifactSha256 format, 11 steps, 20 viewport checks, **24
   screenshots**, trace present, 0 console/page errors)"_ — a check no code in the repository performs,
   and with a wrong screenshot count (26, not 24).

**File timestamps confirm the sequence (`VERIFIED`):**

| file                                 | mtime (local) | meaning                                                 |
| ------------------------------------ | ------------- | ------------------------------------------------------- |
| `trace/trace-1792537070181.zip`      | 12:57:52      | end of the run — the trace is the runner's own artifact |
| `test-script.spec.js`                | **13:11:28**  | copied into the run folder **14 minutes after the run** |
| `OPENCHAMBER-E2E-RESULT.schema.json` | **13:11:43**  | copied in after the run                                 |
| `result.json`                        | **13:14:57**  | **rewritten 17 minutes after the run**                  |

**Reading, stated carefully.** The stored `result.json` is a **hand-edited file**, not a byte-faithful
machine record. The direction of the edit was **conservative** — the script's own status logic
(`hasFail`→false, `hasBlocked`→false, `result.status !== 'PARTIAL'` → `'PASS'`, lines 428–432) would have
written **`PASS`**, and the edit changed that to **`PARTIAL`** and added a SKIP for a check the script never
attempted. So the edit made the record _stricter_, not looser. But it left three defects in the record:
- the SKIP's **reason is wrong** (see §5);
- note 5 **miscounts its own screenshots** (24 vs 26);
- note 5 **asserts a validation that never ran**, which is exactly the overclaim the brief's rule 6 warns about.

**What survives intact:** the trace, the 26 PNGs, the spec file, the schema — all machine-produced and
unmodified since the run (mtimes 12:57). **What does not:** the chain of custody between the runner's output
and the stored JSON. The runner's own `result.json` was overwritten at 13:14:57 and **is not recoverable**
(no copy in the mirror, no git history, no OpenChamber log). That is the concrete instance of the
"silently rewritten evidence" risk the brief names.

## 5. The Week 1 SKIP reason is factually wrong — the build does render "Week 1 of 17"

`VERIFIED` from the run's own trace and from the artifact:
- The artifact contains `Week ${week} of 17` — `renderRegularSeasonView()`, line 3891:
  `<h3 style="margin:0;">Week ${week} of 17</h3>` plus `<button id="simWeekBtn">Simulate Week ${week}</button>`.
- The trace's DOM snapshot at **22:57:20.033Z** (390×844) contains exactly that markup, and it sits
  between `click #beginSeasonBtn` (22:57:19.849Z) and `click #simSeasonBtn` (22:57:23.272Z) — i.e. at
  the protocol's step 3.4 checkpoint ("Click #beginSeasonBtn. Confirm Week 1 of 17 is shown").
- The selectors the SKIP cites are genuinely absent: `weekDisplay` → 0 occurrences, `week-indicator` → 0,
  `id="currentWeek"` → 0. `currentWeek` appears 6 times as a **JavaScript** identifier, never as a DOM id.

**So the display exists; it is a text node with no id and no matching class.** The script looked for
ids/classes only, so it could not see it. The correct characterisation is:

> **The Week 1 check was NOT IMPLEMENTED in the script** (it searched for selectors the build does not
> use), **not** "the build lacks a Week 1 display" and **not** "a product change is required".

This matters because the board currently carries the opposite conclusion — BOC's `M-97` note §7 says
_"Week 1-of-17 display: still SKIP; **product change required (persistent week indicator element)** before
this can become PASS"_. That would send the architects to add markup the build does not need. The build's
own `seasonState.currentWeek` is initialised to `1` (line 3457) and is also readable.

**Boundary respected:** I am not changing the acceptance rule and not restoring a PASS. The SKIP stands
until the owner and architects accept a specific alternative observation. My recommendation is a
**locator** change in the harness (assert the text `Week 1 of 17`), submitted for architect review — see W3.

## 6. Smallest safe corrections

1. Keep the stored `result.json` **untouched** (`d64a5f9bb3ab6e7b0b97277beb3afdf8858950be1c3b8434a5e2d46426288396`).
2. Publish a **new, versioned** record `_agents/moc/notes/result.v2.proposed.json` that references the
   original by hash, states the chain-of-custody finding, and corrects the three defects above.
3. In every summary, quote **26** screenshots (20 viewport + 6 light/dark) and the result hash
   `d64a5f9b…`; quote the 100-season elapsed time as the **step duration 14,451 ms** while keeping
   `seasonMetrics.reportDurationMs = null` visible until a regenerated record exists.
4. Keep Run B as `UNKNOWN`, with no causal attribution.
