SPEAKER: MiniMax subagent (run-reconciliation) | ROLE: council subagent | TASK: W5 evidence index | DATE: 2026-10-21T00:24:00Z

# Run Reconciliation — v2 (PROPOSED)

**Status: PROPOSAL.** Nothing here is adopted, published, or written over the original. The original
`result.json` was read, hashed and copied — never edited, never moved, never deleted by this session.
This file and `_agents/minimax/recon/run-reconciliation-v2.proposed.json` are the only two files this
session created. No product HTML, no shared document, no git operation.

**Evidence labels.** **VERIFIED** — reproduced by me in this session; the command is in §13.
**REPORTED** — another party's statement, attributed, not reproduced here. **INFERRED** — reasoned, basis
named. **UNKNOWN** — the evidence does not settle it.

---

## 1. Identity — Run A (Ultra's corrected PARTIAL run)

| field                 | value                                                                                                                                                           | label                                                                                            |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| run id                | `test-results/e2e-1792537022298` (directory name = `Date.now()` ms at script load)                                                                              | VERIFIED                                                                                         |
| `runAtUtc`            | `2026-10-20T22:57:02.298Z`                                                                                                                                      | VERIFIED (in the record)                                                                         |
| record mtime          | `2026-10-20T23:14:57.386512Z` — **17 min 5 s after the run ended**                                                                                              | VERIFIED (`stat`)                                                                                |
| overall status        | `PARTIAL` (11 steps: 10 PASS + 1 SKIP `week-1-display`)                                                                                                         | VERIFIED (as recorded)                                                                           |
| artifact under test   | `/Users/kosi/Desktop/Football Sim/merged.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B                            | VERIFIED (4 independent copies, §3.1)                                                            |
| git ref / commit      | `merge/v20-donor` / `ff8c05ae0ef89e9030faa991a942d1c611f891bd`                                                                                                  | VERIFIED (commit is `HEAD` of that local + remote branch; commit date 2026-10-20T09:32:28-10:00) |
| runner                | Playwright 1.64.1 / chromium 156.0.8078.4                                                                                                                       | VERIFIED (record + trace context-options)                                                        |
| executable script     | `test-script.spec.js`, sha256 `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757`, 442 lines — byte-identical to `tests/openchamber-e2e.spec.js` | VERIFIED (both hashed)                                                                           |
| result file           | `result.json`, sha256 `d64a5f9bb3ab6e7b0b97277beb3afdf8858950be1c3b8434a5e2d46426288396`, 14,128 B                                                              | VERIFIED (local copy, MOC preserved copy, release asset — all three identical)                   |
| schema                | `OPENCHAMBER-E2E-RESULT.schema.json`, sha256 `3f2e07cfc1db9b61b4c21dba37e0d360c4fedfbc0677ba2f51b02b25976de879`, Draft 2020-12                                  | VERIFIED (run-dir copy = branch blob `f8c7acf3…` = release asset)                                |
| protocol              | `tests/OPENCHAMBER-E2E.md`, sha256 `88c820d4fd915efbf7e3260cd535dd472cfe7d6e63b34a65ba40adc14c19a208`, 113 lines                                                | VERIFIED (read from `origin/gpt/openchamber-e2e-suite`)                                          |
| trace                 | `trace/trace-1792537070181.zip`, 65,863,244 B, sha256 `05354b056a43095d0605cee8e292756e9bfbdc5a3c40e74880ed32573d84bc92`                                        | VERIFIED (local + release asset hashed)                                                          |
| screenshots           | 26 PNG files; 20 viewport rows + 6 light/dark; widths 10×1280 px, 16×390 px (PNG IHDR)                                                                          | VERIFIED (file header bytes)                                                                     |
| console / page errors | 0 / 0; trace: 142 calls, **0** with an error field                                                                                                              | VERIFIED (record + trace)                                                                        |

---

## 2. The two runs, kept separate

### 2.1 Run A — Ultra's corrected PARTIAL run (the record above)

Runs the merged candidate `40233d6b…` on `merge/v20-donor`; 10 PASS + 1 SKIP; PARTIAL. This is the
run the reconciliation is about. **It is not Lightning's run and contains none of Lightning's
evidence.**

### 2.2 Run B — Lightning's separate run

**No artifacts exist on this machine.** Searches run: `find` for `result.json` and `e2e-*` dirs across
the workspace and `/Users/kosi` (only Run A and the MOC preserved copy of Run A were found);
`find` for `*lightning*` paths (documents only, no run artifacts); `/tmp` (no E2E artifacts);
the mirror clone `Football Sim/` (no `test-results/` directory at all). — **VERIFIED (negative)**
Everything about Run B below is **REPORTED**, never measured here.

| Run B item                         | value                                          | label                                                  |
| ---------------------------------- | ---------------------------------------------- | ------------------------------------------------------ |
| run id / timestamp                 | none recoverable; "earlier" only               | UNKNOWN                                                |
| step count                         | 7 (5 PASS, 2 SKIP) — Lightning's own summary   | REPORTED (Owner's PR #3 comment, 2026-10-20T22:45:33Z) |
| screenshot count                   | "four" in the JSON summary vs nine files named | REPORTED (same comment)                                |
| 100-season run                     | skipped (budget)                               | REPORTED                                               |
| playoffs control                   | absent                                         | REPORTED                                               |
| trace                              | "a 32 MB trace"                                | REPORTED                                               |
| cause of the difference from Run A | —                                              | **UNKNOWN**                                            |

The Owner's 22:45:33Z comment is the **only surviving account of Run B**; it is preserved verbatim in
`_agents/moc/evidence/e2e-2026-10-20T225702Z/SUPERSEDED.md` and as a release asset. — **VERIFIED**
(Read; the quote matches the PR comment byte-for-byte in substance.)

**Do not merge A and B, and do not resolve the difference by inference.** The record's own note 3
("simPlayoffsBtn presence differs from Lightning's run … Difference likely timing/visibility wait
condition, not build limitation") is a **REPORTED** hypothesis inside a **VERIFIED** file; it is not
evidence. Run A and Run B may differ in build, script, runner, viewport, wait conditions, or observer.

### 2.3 Run C — the 2026-10-21 re-run (discovered during this verification; a third run, not Run B)

While I was verifying, a **new** E2E run executed on this machine and **replaced the whole
`test-results/` tree**, deleting Run A's directory. New run: `test-results/e2e-1792542075904`,
`runAtUtc` `2026-10-21T00:21:15.904Z`, result.json sha256
`8379087163cf8a014fc25b60a14c861b3b4c66b4a437790c96642cc42843b4f0` (11,945 B), trace
`trace-1792542135212.zip` (75,956,518 B); a sibling directory `e2e-1792542075522` holds an empty
`trace/` and no record (382 ms earlier — the same two-directory pattern as §8.5). — **VERIFIED**

Run C ran **the same script** (`ee9aaa44…`) against **the same artifact** (`40233d6b…`) and produced:
**10 steps, no `week-1-display`, `skippedChecks: []`, 20 screenshot entries, `status: "PASS"`,
`seasonMetrics` all null except `championVisible`/`reportRendered`.** — **VERIFIED**

Run C is **not** Lightning's run and is **not** a continuation of Run A. It matters because it
**reproduces the script's real output** and therefore proves that Run A's stored record is not
machine output (§8.1). Run C is a _re-run of the same protocol_, not a second opinion on Run A's
content: it says nothing about the Week 1 display, which it also never checks.

---

## 3. VERIFIED facts

### 3.1 The artifact — four copies agree

`40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B) in all four:
`merged.html` (workspace root, **untracked**), `NFL Draft Simulator merged.html` (tracked; blob
`1087b6563ae614e45f580cbcc3480147202d98de`, identical to the working tree), the same path inside
`origin/merge/v20-donor` (commit `ff8c05ae`), and `/tmp` extractions. — **VERIFIED**
`git show origin/merge/v20-donor:"NFL Draft Simulator merged.html"` hashes identically, so **the
artifact content is recoverable by any reviewer from the branch** even though the recorded
`artifactPath` is an owner-machine absolute path to an untracked file. — **VERIFIED**

### 3.2 The record's own contents

11 steps · 20 viewport rows, every row `pageOverflowPx: 0`, `overflowElements: []` · 26 screenshot
array entries, 26 PNGs on disk, **0 missing** · `consoleErrors: []`, `pageErrors: []` · trace present
· `gitRef`/`gitCommit`/`artifactSha256` well-formed. — **VERIFIED**
The record is **schema-valid**: `jsonschema` 4.25.1, `Draft202012Validator` + `FormatChecker`,
**0 errors, 17/17 required fields**. — **VERIFIED (my own run, §13)**

### 3.3 The trace

142 before/after call pairs, 142 distinct call ids, **0** carrying an `error` field; 6 `emulateMedia`
calls (matching the 6 light/dark PNGs); 26 `screenshot` calls. — **VERIFIED**
The trace's frame-snapshot at **trace-time 18768.135 ms** contains `<h3>Week 1 of 17</h3>` and
`BUTTON#simWeekBtn`. — **VERIFIED (read from the extracted trace)**
The selectors `#weekDisplay`, `#currentWeek`, `.week-indicator` occur **0 times** in the trace. — **VERIFIED**

---

## 4. REPORTED statements (attributed, not reproduced)

| statement                                                                                                               | source                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Lightning's run: 7 steps (5 PASS, 2 SKIP), 4 vs 9 screenshots, 100-season skipped, playoffs control absent, 32 MB trace | Owner's PR #3 comment, 2026-10-20T22:45:33Z (preserved in MOC's `SUPERSEDED.md`)                                                              |
| "simPlayoffsBtn presence differs from Lightning's run … same artifact hash, same suite revision, same runner"           | Run A's own record, note 3                                                                                                                    |
| Earlier Week 1 **PASS** by Ultra, later corrected to PARTIAL                                                            | Owner's PR #3 comment, 2026-10-20T23:53:53Z                                                                                                   |
| The build renders "Week 1 of 17" at the protocol's checkpoint, as a wall-clock time (22:57:20.033Z)                     | MOC, `_agents/moc/notes/W2-run-reconciliation.md` — I reproduce the **fact** from the trace (18768.135 ms) but not that wall-clock conversion |
| Run A's record is hand-edited, not machine output                                                                       | MOC, same note — I reproduce the **conclusion** independently in §8.1                                                                         |

---

## 5. UNKNOWN items

- Run B's build, script, runner, viewport, wait conditions and observer. — **UNKNOWN**
- Why Run A and Run B differ on the playoffs control. — **UNKNOWN**
- The 272 regular-season games. Not measured by Run A; the only occurrence of "272" in the record is
  the _expected_ count in one step's text. — **UNKNOWN / explicitly not verified**
- `draftPicks`, `playoffRoundsCompleted` — the probes return null on this build. — **UNKNOWN**
- Who wrote Run A's `result.json` after the run, and whether it was reviewed before it was published
  as a release asset. — **UNKNOWN**
- Whether Run C's `PASS` differs from Run A's `PARTIAL` in substance: Run C never checks Week 1, so
  the two verdicts are **not comparable**. — **UNKNOWN (and not inferable)**
- Whether the deletion of Run A's directory was deliberate. — **UNKNOWN** (a new run replaced
  `test-results/` wholesale between 00:21:15Z and 00:22:20Z; not this session's action)

---

## 6. Step table (Run A, as recorded — 11 rows)

| #   | id                     | status   | startedAtUtc  | durationMs | note                                       |
| --- | ---------------------- | -------- | ------------- | ---------- | ------------------------------------------ |
| 1   | `initial-load`         | PASS     | 22:57:03.369Z | 3,070      | title + heading                            |
| 2   | `start-draft`          | PASS     | 22:57:06.439Z | 3,229      | live view visible                          |
| 3   | `select-instant-speed` | PASS     | 22:57:09.668Z | 439        | "Instant speed selected"                   |
| 4   | `sim-to-end`           | PASS     | 22:57:10.107Z | 4,138      | "internal pos: unavailable"                |
| 5   | `click-results-season` | PASS     | 22:57:14.245Z | 2,523      | season landing + `startSeasonBtn`          |
| 6   | `start-season`         | PASS     | 22:57:16.768Z | 3,082      | preseason setup + `beginSeasonBtn`         |
| 7   | `begin-season`         | PASS     | 22:57:19.850Z | 3,344      | "Season started, simSeasonBtn visible"     |
| 8   | **`week-1-display`**   | **SKIP** | 22:57:23.194Z | 0          | **hand-added after the run** — see §9      |
| 9   | `sim-season`           | PASS     | 22:57:23.194Z | 5,562      | "games played: unavailable (expected 272)" |
| 10  | `sim-playoffs`         | PASS     | 22:57:28.756Z | 5,474      | champion visible: true; rounds unavailable |
| 11  | `sim-100-seasons`      | PASS     | 22:57:34.230Z | **14,451** | report rendered; "duration: unavailablems" |

Rows 8 and 9 carry the **same** `startedAtUtc` to the millisecond. The script's `recordStep` stamps
each call with its own `new Date().toISOString()`, so two different steps cannot share a timestamp.
— **VERIFIED (hand-edit fingerprint)**

---

## 7. Artifact inventory — local-only vs available to every reviewer

| artifact                                                                                           | local only                                                                        | available to all reviewers                                                                                           | label    |
| -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------- |
| `result.json` `d64a5f9b…`                                                                          | was local (untracked)                                                             | **yes** — release `e2e-evidence-2026-10-20T225702Z` asset `result.json`; hash re-verified by download                | VERIFIED |
| `test-script.spec.js` `ee9aaa44…`                                                                  | yes (both copies untracked)                                                       | **yes** — release asset; also `tests/openchamber-e2e.spec.js` in the local checkout (untracked here, byte-identical) | VERIFIED |
| schema`3f2e07cf…`                                                                                  | run-dir copy was local                                                            | **yes** — release asset + `tests/OPENCHAMBER-E2E-RESULT.schema.json` in PR #3                                        | VERIFIED |
| protocol`88c820d4…`                                                                                | no                                                                                | **yes** — `tests/OPENCHAMBER-E2E.md` in PR #3 (branch `gpt/openchamber-e2e-suite`, OPEN)                             | VERIFIED |
| 26 PNGs                                                                                            | were local                                                                        | **yes** — release asset `screenshots.zip` (19,697,908 B, 26 PNGs; sizes match the originals)                         | VERIFIED |
| trace`05354b05…` (65.9 MB)                                                                         | was local                                                                         | **yes** — release asset; **not** on any branch                                                                       | VERIFIED |
| `schema-validation.txt`, `trace-playoffs-forensics.txt`, `validate-e2e-result.py`, `SUPERSEDED.md` | no                                                                                | **yes** — release assets                                                                                             | VERIFIED |
| the artifact `40233d6b…`                                                                           | `merged.html` is untracked                                                        | **yes** — recoverable from `merge/v20-donor:"NFL Draft Simulator merged.html"`                                       | VERIFIED |
| **`test-results/e2e-1792537022298/`**                                                              | **DELETED from the working tree at ≈2026-10-21T00:21–00:22Z** (replaced by Run C) | **no** — but its contents are in the release assets above                                                            | VERIFIED |
| `test-results/.last-run.json`                                                                      | yes                                                                               | **no**                                                                                                               | VERIFIED |
| `_agents/moc/evidence/e2e-2026-10-20T225702Z/`                                                     | yes (0 of its files tracked in git)                                               | **no** — the release assets are its public twin                                                                      | VERIFIED |
| mirror clone `Football Sim/`                                                                       | —                                                                                 | has **no** `test-results/` at all                                                                                    | VERIFIED |

Release: `https://github.com/kozikosi/Football-Sim/releases/tag/e2e-evidence-2026-10-20T225702Z`,
published 2026-10-20T23:28:06Z, 9 assets. — **VERIFIED**

---

## 8. Known stale / contradictory items

**8.1 The record is hand-edited, not machine output.** — **VERIFIED (four independent proofs)**
1. The script has **10** `recordStep` call sites and **no** `week-1` string anywhere; it can emit
   `week-1-display` only if a human typed it. — script grep
2. The script sets `PARTIAL` only when the 100-season step is `SKIP`ped (l.413–415); otherwise it
   writes `BLOCKED`/`FAIL`/`PASS` (l.428–432). Run A's stored record says `PARTIAL` with all steps
   green — unreachable by the script. Run C, same script, same artifact, wrote `PASS`.
3. The script's only `skippedChecks` entry is `'100-season simulation (budget/time)'` (l.414); it
   cannot emit the Week 1 string.
4. The script performs **no** schema validation (the only "schema" token is `schemaVersion: 1`), yet
   the record carries a "Schema validation: PASS" note.
5. Timing: trace and `test-results/.last-run.json` are both stamped 22:57:52Z; the script and schema
   were copied into the run directory only at 23:11:28Z and 23:11:43Z; `result.json` was written at
   23:14:57Z.
   **Consequence:** every field read from that file — `status`, the 11th step, the SKIP reason, the
   "schema validation" note — inherits the edit. The machine evidence (trace, 26 PNGs) is intact.

**8.2 "24 screenshots"** — the note said 24; the array held 26; the machine output holds **20** (the
script pushes only the 20 viewport captures; `captureLightDark`'s return value is discarded at its
three call sites). 26 PNGs exist. Three different numbers for one quantity. — **VERIFIED**

**8.3 `seasonMetrics.reportDurationMs` is null** while the same file's step row 11 carries
`durationMs: 14451`. The measured value is 14,451 ms. — **VERIFIED**

**8.4 `seasonMetrics.regularSeasonGamesPlayed` is null** and 272 occurs **only** as the _expected_
count in step 9's text. **272 is not verified by this record.** — **VERIFIED**

**8.5 `test-results/.last-run.json` says `{"status":"passed","failedTests":[]}`** while the record
says PARTIAL. The marker is written by the runner at the end of a green run and cannot encode the
hand-added SKIP. A reviewer opening only that file concludes the suite passed. — **VERIFIED**

**8.6 A second run directory existed**: `test-results/e2e-1792537022083/` (215 ms before the run
directory) held an empty `trace/` and **no** `result.json` — a first attempt of the same run that
produced no record. Run C reproduced the same pattern (`e2e-1792542075522`, 382 ms earlier).
— **VERIFIED**

**8.7 The recorded `artifactPath` is an owner-machine absolute path** to an **untracked** file; a
reviewer who clones the repo cannot resolve it. The tracked sibling has a different filename.
— **VERIFIED** (mitigated in §7)

**8.8 The record's own Week 1 SKIP reason is contradicted by the run's own trace** (§9).
— **VERIFIED**

**8.9 Checked and _not_ contradictory** (recorded so the next reviewer does not re-open them): the
trace makes 25 `setViewportSize` calls against 20 recorded viewport rows (5 redundant desktop
re-sets, not missing rows); `browserVersion` is empty in the script's initialiser but filled from
`browser.version()` at run time; the 6 light/dark PNGs are produced by the script but simply never
referenced by it. — **VERIFIED**

---

## 9. The Week 1 skip

**Fact: the protocol's Week 1 observation was never asserted by the runner.** The script contains no
Week 1 check, so the step and the `skippedChecks` entry were added by hand. — **VERIFIED**

**The recorded reason is not supported by the run's own evidence.** The record says the build "lacks
persistent Week 1 display element (no `#weekDisplay`, `#currentWeek`, `.week-indicator`)" and that
preseason setup shows only "Set up the ${user} before Week 1" text. But those three selectors occur
**0 times** in the trace, and the trace's frame-snapshot at **trace-time 18768.135 ms** — between
`click #beginSeasonBtn` and `click #simSeasonBtn`, the protocol's own checkpoint — shows
`<h3>Week 1 of 17</h3>` and `BUTTON#simWeekBtn` in the regular-season view. — **VERIFIED**

So the accurate statement is: **the check was not implemented in the script; the display was present
and was never looked for.** The step stays **SKIP** (SKIP, never PASS) and the run stays **PARTIAL**;
what is withdrawn is the _reason_, not the skip. — **VERIFIED** (conclusion)

**Not a product defect, and not a markup change.** No architect should add `#weekDisplay`,
`#currentWeek` or `.week-indicator` to satisfy this run. The fix belongs in the harness: assert the
text `Week 1 of 17` (and `seasonState.currentWeek === 1`) after `click #beginSeasonBtn`.

---

## 10. Mobile-usability coverage gap

**What was measured.** 20 viewport checkpoints, each recording `documentScrollWidth`,
`bodyScrollWidth`, `pageOverflowPx` and a width-only element scan, at 390×844 and 1280×900. Every
row: `pageOverflowPx: 0`, `overflowElements: []`. — **VERIFIED**

**What the protocol requires** (`tests/OPENCHAMBER-E2E.md` §"390px responsive checks", sha256
`88c820d4…`): run at 390×844 at 8 named checkpoints; at every checkpoint record the scroll widths and
page-level overflow, check that the primary heading / phase indicator / primary action are **visible
and within the viewport**, check that key buttons and filters are **not clipped or covered**, record
selector + bounding box + nearest scroll container for every element wider than the viewport,
**verify that intentional table scrollers can actually scroll horizontally**, and take a screenshot.
The protocol then warns that a 390 px document width alone is not sufficient proof, because body
overflow clipping can hide wide descendants. — **VERIFIED**

**Clause coverage of the script this run used** (`ee9aaa44…`, the file in the run directory and in
`tests/`): the scope sentence and the screenshot clause are implemented; the wide-element scan is
implemented; the scroll-width clause is implemented but **partial** (the overflow figure derives from
`bodyScrollWidth` only — `documentScrollWidth` is recorded and never used for detection, and neither
is compared to the viewport); and **three clauses are not implemented at all** — visibility/within-
viewport, clipped-or-covered, and scroller scrollability. The protocol's own caveat (page overflow vs
a wide table in a working scroller) is not implemented either: a width-only scan cannot see an
element that is shifted partly offscreen. — **VERIFIED** (read from the script)

**Therefore "0 overflow elements, 0 page-overflow px" proves** that no element was _wider_ than the
viewport and that `body.scrollWidth` equalled the viewport width at 20 checkpoints. **It does not
prove** that the heading, phase indicator or primary action were visible and unclipped, that buttons
were not covered, that a wide table's horizontal scroller works, or that nothing was shifted partly
offscreen. The run's mobile evidence is therefore a **page-level** check, not the protocol's
**element-level usability** check. — **VERIFIED** (conclusion)
**3 of the 8 clause items are implemented; the 3 that carry the usability meaning are not.** — **VERIFIED**

**Also not covered:** the light/dark clause asks for the _selected scheme_ to be recorded and for
unreadable text / focus indicators / contrast problems to be noted; the script applies
`emulateMedia` but records no scheme per capture (the array is a flat list of paths) and has no
human-review step, and if emulation fails it only logs to the console without recording the
limitation. — **VERIFIED**

---

## 11. Superseded reports and files

| item                                                                                                     | superseded by             | note                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Run A's stored `result.json` "24 screenshots" note                                                       | §8.2                      | the number was wrong three ways; the file is preserved, not rewritten                                                                                                                                        |
| Run A's stored "Schema validation: PASS" claim as the runner's own output                                | §8.1                      | the runner performs no validation; the record is schema-valid, verified independently                                                                                                                        |
| Run A's stored Week 1 SKIP **reason**                                                                    | §9                        | the skip stands; the reason is withdrawn                                                                                                                                                                     |
| Earlier Week 1 **PASS** (Ultra)                                                                          | the corrected **PARTIAL** | Owner's PR #3 comment, 2026-10-20T23:53:53Z                                                                                                                                                                  |
| Lightning's summary counts (7 steps / 4 vs 9 screenshots / skipped 100-season / absent playoffs control) | **nothing**               | **REPORTED only**; no artifact exists to supersede them, and no later account settles them                                                                                                                   |
| `test-results/.last-run.json` "passed"                                                                   | the record's `PARTIAL`    | the marker cannot see the hand-added SKIP                                                                                                                                                                    |
| MOC's `SUPERSEDED.md` §B framing of the 22:45:33Z account as "the earlier run" of _this_ suite           | this record §2.2          | the brief for W5 requires Run A and Lightning's run to be kept **separate**; the account is treated here as **Run B (Lightning)**, whose artifacts do not exist. Both readings agree the artifacts are gone. |
| `test-results/e2e-1792537022298/` as a _local_ path                                                      | the release assets        | deleted from the working tree ≈2026-10-21T00:21–00:22Z                                                                                                                                                       |

**Nothing is deleted or rewritten by this record.** The superseded items are marked here; the files
themselves stay where they are.

---

## 12. What this record does NOT change

- **It does not supersede, edit, move or delete the original `result.json`** (`d64a5f9b…`). The
  correction is a **new, separately versioned file** that points at the original by path and hash
  and lists the differences (§11, and `_proposal` in the JSON).
- **It does not change the run's identity**: artifact, git ref/commit, runner, `runAtUtc`, suite id,
  and the 20 viewport rows and 26 screenshot paths are carried over unchanged.
- **It does not change the verdict of Run A**: still **PARTIAL** (10 PASS + 1 SKIP). The machine
  output's `PASS` (§2.3) is _not_ adopted, because Run C never checks Week 1 and the two are not
  comparable. Choosing between them is the Architect's call, not this record's.
- **It does not verify 272 games**, and does not fill `draftPicks` or `playoffRoundsCompleted`.
- **It does not resolve the difference between Run A and Run B**, and does not attribute it to the
  build.
- **It does not change any acceptance rule, protocol clause, schema, script, product file or shared
  document.** The schema, the protocol and the script are read-only here.
- **It does not adopt Run C's evidence** as a replacement for Run A; Run C is recorded for what it
  proves about the script.
- **It does not publish, push, commit, tag, or branch anything.**

---

## 13. Schema conformance of the proposed JSON

`run-reconciliation-v2.proposed.json` is shaped to the Draft 2020-12 schema
(`OPENCHAMBER-E2E-RESULT.schema.json`, sha256 `3f2e07cf…`): the same field names, the same `suite`
const, the same `status` enum, the same step / viewport shapes, 17/17 required fields, and the
identity fields, the 20 viewport rows, the 26 screenshot paths and the 11 step ids + statuses
carried over unchanged from the original.

**One structural deviation — declared, measured, and not hidden.** The schema root sets
`"additionalProperties": false`, so the top-level `_proposal` object — the field that records that
this file **supersedes nothing** and names the original file and its sha256 — is not permitted by
the schema. There is no schema slot for it, and adding one would be a change to a protocol
artefact, which this seat may not make. Measured with `jsonschema` 4.25.1 / `Draft202012Validator`
- `FormatChecker`:

* the proposed file: **1 error**, of type `additionalProperties` —
  *"Additional properties are not allowed ('_proposal' was unexpected)"*;
* the same document with `_proposal` removed: **0 errors**, 17/17 required fields.

Nothing was bent to fit: every schema-defined field keeps the schema's name, type and enum, the
`suite` const is unchanged, no required field is missing, and the one error is the added key
itself — enumerated inside the file's own `_proposal.schemaConformance`.
**Zero-error alternative:** delete `_proposal`. The document then validates cleanly but no longer
names the original record, its sha256, or the differences — which is the whole point of a
correction. The choice between "strictly valid but silent" and "one declared error that says what
was changed" is the Architect's. — **VERIFIED (the error was produced, not predicted)**

---

## 14. Reproduction commands (read-only)

```sh
cd "/Users/kosi/Desktop/Football Sim"
# hashes (original record + script + schema + artifact + trace)
shasum -a 256 "test-results/e2e-1792537022298/result.json" \
               "test-results/e2e-1792537022298/test-script.spec.js" \
               "tests/openchamber-e2e.spec.js" \
               "test-results/e2e-1792537022298/OPENCHAMBER-E2E-RESULT.schema.json" \
               "merged.html" "NFL Draft Simulator merged.html"
git show "origin/merge/v20-donor:NFL Draft Simulator merged.html" | shasum -a 256
# the script's real output surface
grep -n "recordStep(page" "tests/openchamber-e2e.spec.js"        # 10 call sites
grep -n "result.status\|week-1\|skippedChecks.push" "tests/openchamber-e2e.spec.js"
# the trace
unzip -q "test-results/e2e-1792537022298/trace/trace-1792537070181.zip" -d /tmp/trace
grep -c "Week 1 of 17" /tmp/trace/trace.trace
grep -c "weekDisplay\|currentWeek\|week-indicator" /tmp/trace/trace.trace
grep -c '"error":' /tmp/trace/trace.trace
# schema validation (jsonschema 4.25.1, Draft 2020-12 + FormatChecker)
python3 -c "import json;from jsonschema import Draft202012Validator,FormatChecker; \
s=json.load(open('_agents/moc/evidence/e2e-2026-10-20T225702Z/OPENCHAMBER-E2E-RESULT.schema.json')); \
i=json.load(open('_agents/moc/evidence/e2e-2026-10-20T225702Z/result.json')); \
print(len(list(Draft202012Validator(s,format_checker=FormatChecker()).iter_errors(i))))"
# durable copies
gh release download e2e-evidence-2026-10-20T225702Z --pattern result.json --dir /tmp/rel
shasum -a 256 /tmp/rel/result.json
```

**Local paths in this document refer to the state observed on 2026-10-21T00:19–00:24Z.** Run A's
run directory was deleted inside that window by a concurrent run; §7 lists the durable substitutes.
