# W1 — Independent artifact audit (LongCat, read-only)

**Work package:** W1 (independent artifact audit). Read-only; no shared file edited.
**Run under audit:** `test-results/e2e-1792537022298/` — the only run on this checkout that carries a
result JSON. Artifact `merged.html`, SHA-256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`.
**Date:** 2026-10-20. **Certainty labels:** VERIFIED / REPORTED / INFERRED / UNKNOWN.

## 1. Audit table

| #     | Check                                                                                 | Command                                                                                          | Observed                                                                                                                                                       | Verdict                     |
| ----- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| W1-1  | Schema validation (corrected: `artifactSha256`, full Draft 2020-12 + format checking) | `python3` + `jsonschema.Draft202012Validator(FormatChecker)`                                     | `[1] schema self-check: OK` · `[2] instance errors: 0` · `[3] required fields: 0 missing of 17` · `RESULT: PASS (no violations)`                               | **VERIFIED**                |
| W1-2  | Build hash                                                                            | `shasum -a 256 merged.html`                                                                      | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` = recorded `artifactSha256`                                                                 | **VERIFIED**                |
| W1-3  | Git ref / commit                                                                      | `git rev-parse HEAD`; `git rev-parse --abbrev-ref HEAD`                                          | `ff8c05ae0ef89e9030faa991a942d1c611f891bd` / `merge/v20-donor` = recorded                                                                                      | **VERIFIED**                |
| W1-4  | result.json hash                                                                      | `shasum -a 256 test-results/e2e-1792537022298/result.json`                                       | `d64a5f9bb3ab6e7b0b97277beb3afdf8858950be1c3b8434a5e2d46426288396`                                                                                             | **VERIFIED**                |
| W1-5  | Script hash                                                                           | `shasum -a 256 tests/openchamber-e2e.spec.js test-results/e2e-1792537022298/test-script.spec.js` | both `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757`                                                                                        | **VERIFIED**                |
| W1-6  | Screenshot entries / files                                                            | parse `screenshots[]`; `os.path.isfile` each                                                     | 26 entries, 26 files exist, **0 missing**                                                                                                                      | **VERIFIED**                |
| W1-7  | Trace                                                                                 | `ls -la …/trace/trace-1792537070181.zip`                                                         | exists, 65,863,244 B                                                                                                                                           | **VERIFIED**                |
| W1-8  | Step statuses                                                                         | parse `steps[]`                                                                                  | 11 steps: 10 `PASS` + 1 `SKIP` (`week-1-display`)                                                                                                              | **VERIFIED**                |
| W1-9  | Viewport checks                                                                       | parse `viewportChecks[]`                                                                         | 20 (10 checkpoints × 2 viewports); all `pageOverflowPx` 0; all `overflowElements` empty                                                                        | **VERIFIED**                |
| W1-10 | Errors                                                                                | parse `consoleErrors` / `pageErrors`                                                             | both empty (0)                                                                                                                                                 | **VERIFIED**                |
| W1-11 | seasonMetrics                                                                         | parse                                                                                            | `draftPicks` null · `regularSeasonGamesPlayed` null · `championVisible` true · `playoffRoundsCompleted` null · `reportRendered` true · `reportDurationMs` null | **VERIFIED**                |
| W1-12 | Script ↔ result step parity                                                           | regex `recordStep\(page,\s*'…'` vs `steps[].id`                                                  | script = **10** ids; result = **11** ids; extra = `week-1-display`                                                                                             | **CONTRADICTION**           |
| W1-13 | Week-1 selectors in script                                                            | grep `#weekDisplay` / `#currentWeek` / `.week-indicator`                                         | 0 hits in `tests/openchamber-e2e.spec.js`                                                                                                                      | **VERIFIED**                |
| W1-14 | Week-1 DOM in build                                                                   | grep in `merged.html`                                                                            | 0 `#weekDisplay` / `.week-indicator`; 6 hits = JS property `seasonState.currentWeek` only                                                                      | **VERIFIED**                |
| W1-15 | Stale note                                                                            | `notes[4]`                                                                                       | says "24 screenshots" (actual 26) and "Schema validation: PASS" (hand-written, not a validator run)                                                            | **STALE**                   |
| W1-16 | reportDurationMs vs step                                                              | `seasonMetrics.reportDurationMs` vs `sim-100-seasons.durationMs`                                 | null vs 14,451 ms (the metric reads `window.lastReportDurationMs`, undefined)                                                                                  | **VERIFIED** (metadata gap) |
| W1-17 | Note provenance                                                                       | script only pushes "Artifact hash verified"                                                      | result has 5 notes; 4 added outside the script                                                                                                                 | **INFERRED**                |

## 2. Contradictions and unsupported statements found

1. **11 vs 10 steps (the decisive one).** The archived script (`tests/openchamber-e2e.spec.js`, SHA
   `ee9aaa44…`, byte-identical to the run's `test-script.spec.js`) implements **10** `recordStep` calls
   and contains no `week-1-display` id and no `#weekDisplay` / `#currentWeek` / `.week-indicator`
   selector. The stored result JSON records **11** steps including `week-1-display = SKIP`, plus a
   "PROTOCOL DEVIATION: Week 1 checkpoint…" note and a "Schema validation: PASS" note. Those cannot be
   emitted by that script revision. _Whether the extra step was hand-added or came from a different
   script revision is UNKNOWN._
2. **Stale screenshot count.** `notes[4]` says "24 screenshots"; the `screenshots` array has 26.
3. **"Schema validation: PASS" is a hand-written claim** in `notes[4]`, not validator output. The real
   validator passes (W1-1) — the claim's conclusion is right, its method is not.
4. **Post-processing signature (INFERRED).** The trace zip mtime is 12:57:52; the result JSON mtime is
   13:14:57 and the archived script 13:11:28. The JSON carries step timestamps from 22:57Z (12:57 local)
   but was written ~17 min later. Consistent with the JSON being assembled/annotated after the run.

## 3. Week 1 display — what the files show

- `merged.html` has **no** `#weekDisplay` or `.week-indicator` element (VERIFIED). `currentWeek` is a
  JS state property (`seasonState.currentWeek`), not a DOM node.
- The build _does_ ship week controls — `id="simWeekBtn"`, `id="nextWeekBtn"`, `id="sg-detail-${g.week}"`
  — and text such as "Set up the ${user} before Week 1" (preseason hero) and narrative "Week 1…".
  None is a persistent "Week 1 of 17" indicator.
- The archived script never asserts Week 1: `begin-season` accepts `#simSeasonBtn` visible **or** any
  "week" substring in the body. The stored result's `begin-season` detail is exactly
  "Season started, simSeasonBtn visible" — i.e. the **proxy** path, not a Week 1 observation.
- Conclusion: the Week 1-of-17 requirement is **not satisfied** by this run, and the SKIP step that
  records it is **not script-produced**. The acceptance rule must not be changed on council authority.

## 4. Playoffs-button discrepancy (run-by-run)

**Ultra's run — VERIFIED.**
- Script `tests/openchamber-e2e.spec.js` (SHA `ee9aaa44…`); `sim-playoffs` sets viewport **1280×900** then
  `await page.click('#simPlayoffsBtn')`.
- Sim state: after `sim-season` PASS ("Regular season complete; games played: unavailable (expected 272)").
- Locator result: the click succeeded → step `PASS`; `seasonMetrics.championVisible = true`.
- Screenshot evidence: `viewport-playoffs-champion-desktop.png` (1280×3953) shows the champion banner
  "Houston Texans — Super Bowl Champions"; `viewport-playoffs-champion.png` (390×6045) shows the same
  banner in the stacked mobile layout.
- Trace: `trace/trace-1792537070181.zip` (65,863,244 B).

**Lightning's run — UNKNOWN.** No result JSON, screenshot set or trace for it exists in this checkout.
The only other run location found is `/Users/kosi/test-results/` (12:16–12:18): a **failed** run of the
same spec, `error-context.md` = `Error: Channel closed` / `browserContext.close: Target page, context
or browser has been closed` at `tests/openchamber-e2e.spec.js:156:1`, with a 6,171,034 B trace and
1,214 screencast frames, and **no result JSON**. Its authorship is **UNKNOWN**; it cannot be attributed
to Lightning from the files. Therefore the cause of Lightning's "control absent" report is **UNKNOWN**,
and the viewport/timing explanation remains a **hypothesis**.

## 5. Corrected schema-validation command and unedited output

The circulated snippet read `artifactSha26` (typo) and did not validate. Corrected command:

```bash
cd "/Users/kosi/Desktop/Football Sim"
python3 - <<'PY'
import json
from jsonschema import Draft202012Validator, FormatChecker
base = "test-results/e2e-1792537022298"
schema = json.load(open(f"{base}/OPENCHAMBER-E2E-RESULT.schema.json"))
data   = json.load(open(f"{base}/result.json"))
Draft202012Validator.check_schema(schema)
errs = sorted(Draft202012Validator(schema, format_checker=FormatChecker()).iter_errors(data),
              key=lambda e: list(e.absolute_path))
print("[1] schema self-check: OK (valid Draft 2020-12)")
print("[2] instance errors:", len(errs))
for e in errs: print("    -", "/".join(map(str, e.absolute_path)) or "<root>", ":", e.message)
print("[3] required fields:", len([f for f in schema["required"] if f not in data]), "missing of", len(schema["required"]))
print("[4] artifactSha256 (recorded):", data.get("artifactSha256"))
print("RESULT:", "PASS (no violations)" if not errs else "FAIL")
PY
```

Unedited output:

```
[1] schema self-check: OK (valid Draft 2020-12)
[2] instance errors: 0
[3] required fields: 0 missing of 17
[4] artifactSha256 (recorded): 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd
RESULT: PASS (no violations)
```

Validator: `jsonschema` 4.26.0 (`.conda`) / 4.25.1 (system `python3`); schema draft 2020-12 with
`FormatChecker`. Note: schema PASS proves structure only — the run is still **PARTIAL** because the
Week 1 requirement is unmet and the 390px usability checks are missing.

## 6. Two-run record (W2 content)

| Field                       | Ultra's run                                                                        | Lightning's run                |
| --------------------------- | ---------------------------------------------------------------------------------- | ------------------------------ |
| Run ID                      | `e2e-1792537022298`                                                                | UNKNOWN — not in this checkout |
| Timestamp (UTC)             | `2026-10-20T22:57:02.298Z`                                                         | UNKNOWN                        |
| Artifact / SHA-256          | `merged.html` / `40233d6b…`                                                        | UNKNOWN                        |
| Git ref / commit            | `merge/v20-donor` / `ff8c05ae…`                                                    | UNKNOWN                        |
| Runner / browser            | Playwright 1.64.1 / Chromium 156.0.8078.4                                          | UNKNOWN                        |
| Executable script           | archived `test-script.spec.js` SHA `ee9aaa44…` (= `tests/openchamber-e2e.spec.js`) | UNKNOWN                        |
| Viewport at disputed action | 1280×900                                                                           | UNKNOWN                        |
| Sim state at action         | after `sim-season` PASS                                                            | UNKNOWN                        |
| Locator result              | `page.click('#simPlayoffsBtn')` succeeded; `championVisible` true                  | reported absent (REPORTED)     |
| Screenshot / trace          | `viewport-playoffs-champion*.png`; trace 65,863,244 B                              | not present                    |
| 100-season                  | `PASS`, 14,451 ms                                                                  | reported skipped (budget)      |

## 7. Protocol → script → field matrix (W3 content, §6)

| Protocol requirement                                    | Script implementation                                                                   | Result field                                               | Status                                    |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------- |
| 1.1 load exact artifact                                 | hash check, then `page.goto`                                                            | `artifactSha256`                                           | PASS                                      |
| 1.2 title + heading                                     | `title` + `h1`                                                                          | step `initial-load`                                        | PASS                                      |
| 1.3 start-draft visible+enabled                         | `expect(#startDraftBtn)`                                                                | step `initial-load`                                        | PASS                                      |
| 1.4 page/console errors                                 | `page.on('console'/'pageerror')`                                                        | `consoleErrors`, `pageErrors`                              | PASS (0/0)                                |
| 1.5 scroll widths + startup shot                        | viewport checks + `captureLightDark('startup')`                                         | `viewportChecks[0,1]`, `startup-*.png`                     | PASS                                      |
| 2.1–2.4 draft via UI, "Draft Complete"                  | yes                                                                                     | `start-draft`, `sim-to-end`                                | PASS                                      |
| 2.5 verify `draftSim.pos === 832`                       | reads `window.draftSim?.pos ?? null`                                                    | `seasonMetrics.draftPicks`                                 | **PARTIAL** (null; no equality assertion) |
| 2.6 completion time + screenshot                        | `durationMs` + screenshots                                                              | steps                                                      | PASS                                      |
| 3.1–3.3 season landing / preseason                      | yes                                                                                     | `click-results-season`, `start-season`                     | PASS                                      |
| 3.4 **confirm Week 1 of 17**                            | **NOT ASSERTED** — `#simSeasonBtn` visible OR body contains "week"                      | step `begin-season`                                        | **PROXY / NOT SATISFIED**                 |
| 3.5 click `#simSeasonBtn`, wait review                  | yes                                                                                     | `sim-season`                                               | PASS                                      |
| 3.6 all 17 weeks / 272 games                            | waits for `#simPlayoffsBtn` or "Regular Season Review"; reads `seasonState.gamesPlayed` | `regularSeasonGamesPlayed`                                 | **NOT MEASURED** (null)                   |
| 3.7 playoff action visible                              | implied by the wait                                                                     | `sim-season`                                               | PASS (implicit)                           |
| 3.8 screenshots at preseason / Week 1 / review          | preseason + season-started + review; **no Week-1 checkpoint**                           | `viewportChecks`                                           | **PARTIAL**                               |
| 4.1 click `#simPlayoffsBtn`                             | yes, at 1280×900                                                                        | `sim-playoffs`                                             | PASS                                      |
| 4.2–4.3 final view / champion visible                   | `.champion-banner…` visible                                                             | `sim-playoffs`, `championVisible`                          | PASS                                      |
| 4.4 no new errors; standings usable                     | errors global                                                                           | `pageErrors`/`consoleErrors`                               | PASS (0)                                  |
| 4.5 screenshot + playoff rounds                         | screenshots; rounds read                                                                | `playoffRoundsCompleted`                                   | **PARTIAL** (null)                        |
| 5.1–5.3 100-season report + "drove winning"             | yes                                                                                     | `sim-100-seasons`                                          | PASS                                      |
| 5.4 no errors + **return navigation**                   | errors global; **back control not checked**                                             | `pageErrors`                                               | **PARTIAL**                               |
| 5.5 elapsed time + screenshot                           | `durationMs` + screenshots                                                              | steps, `viewport-100-season-report*`                       | PASS                                      |
| 5 budget skip → at most PARTIAL                         | `statusIfError='SKIP'`                                                                  | `skippedChecks`                                            | N/A (ran)                                 |
| 390px scroll widths + overflow                          | `getViewportChecks`                                                                     | `documentScrollWidth`, `bodyScrollWidth`, `pageOverflowPx` | PASS                                      |
| 390px heading / nav / action visible & in viewport      | **NOT IMPLEMENTED**                                                                     | —                                                          | **MISSING**                               |
| 390px buttons / filters not clipped or covered          | **NOT IMPLEMENTED**                                                                     | —                                                          | **MISSING**                               |
| 390px wide element → selector / bbox / scroll container | width > viewport+1                                                                      | `overflowElements[]`                                       | PASS (0)                                  |
| 390px intentional table scroller scrolls                | **NOT IMPLEMENTED**                                                                     | —                                                          | **MISSING**                               |
| light/dark startup + draft-results                      | `captureLightDark` ×3                                                                   | `*-light.png`, `*-dark.png`                                | PASS (6 files)                            |
| light/dark record unreadable text / contrast            | **NOT IMPLEMENTED**                                                                     | —                                                          | **MISSING**                               |
| verdict rules                                           | computed                                                                                | `status`                                                   | PARTIAL                                   |

## 8. Smallest safe corrections (proposal, not applied)

1. `notes[4]`: change "24 screenshots" → "26 screenshots", and replace the hand-written
   "Schema validation: PASS" with the real validator output (§5). _Preserves the original as history._
2. Record explicitly that `week-1-display` is **not produced by the archived script** (§2.1) — do not
   present the SKIP as script output until the exact executed script is recovered.
3. `seasonMetrics.reportDurationMs`: either keep `null` and document it, or set it to 14,451 with a note
   that it is the step wall-clock, not the report's own duration.
4. Do **not** combine Ultra's and Lightning's runs into one synthetic result.

## 9. Owner / architect decisions required

| #   | Decision                                                                                            | Recommended default                                                                               | Cost of being wrong                                       |
| --- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| D1  | Keep the Week 1-of-17 requirement unchanged for this V20 candidate                                  | **Keep unchanged**; the candidate stays PARTIAL; any protocol change goes to the architects       | Restoring PASS on a proxy would overstate acceptance      |
| D2  | Add the missing 390px checks (control visibility/clipping, horizontal scroller)                     | **Yes**, as a harness enhancement, architect review                                               | A width-only scan can miss off-screen or covered controls |
| D3  | Publish evidence (W4): result JSON + script + 26 screenshots into PR #3, trace as a linked artifact | **Attach JSON/script/screenshots; link the 65 MB trace**                                          | Committing the trace bloats the product branch            |
| D4  | Obtain the exact script the run executed (Ultra) to resolve the 11-vs-10 mismatch                   | **Ask the runner for the executed script hash before treating `week-1-display` as script output** | Accepting a post-processed JSON as a pure run output      |

## 10. Correction appended (rule 2 — append, never rewrite)

**§3 of this audit is WRONG and is corrected here; the original line is left in place.**
- **What I wrote:** "no persistent Week 1-of-17 indicator exists in `merged.html` (VERIFIED by grep: 0 hits for `#weekDisplay`/`.week-indicator`)."
- **What is true:** `renderRegularSeasonView()` emits `<h3 style="margin:0;">Week ${week} of 17</h3>` beside `#simWeekBtn`. Re-measured:
  `grep -o -E ".{0,90}Week \$\{week\} of 17.{0,40}" merged.html` → the `<h3>` is present.
- **Why I missed it:** my grep used the literal `Week [0-9]`, which cannot match the template literal `Week ${week} of 17`.
- **Correct label:** the Week 1 check was **NOT IMPLEMENTED** — it probed `#weekDisplay`/`#currentWeek`/`.week-indicator`, ids/classes the build never used. It is **not** "build limitation" and **not** "product change required". MOC M-102 §2 and Pickle M-112 are right; I accept the correction.
- **Independent corroboration:** the failed run's trace at `/Users/kosi/test-results/.playwright-artifacts-0/traces/689961270647219b10142b8a0a3d7cd5.trace` contains a DOM snapshot with `H3 … "Week 1 of 17"` plus `#simWeekBtn` before it died with `TargetClosedError`.

## 11. Additional evidence found (not in MOC M-102 / Pickle M-112)

A second run's trace exists on this machine and was missed by the "no trace for Run B" sweeps:
`/Users/kosi/test-results/.playwright-artifacts-0/traces/689961270647219b10142b8a0a3d7cd5.trace` (6,171,034 B, mtime 12:18 local) — Playwright 1.64.1, `tests/openchamber-e2e.spec.js >> OpenChamber E2E Suite - Full Flow`, artifact `file:///Users/kosi/Desktop/Football Sim/merged.html`, 1,212 screencast frames, **failed** with `TargetClosedError`, no `result.json`. Authorship **UNKNOWN**; not established as Run B.
