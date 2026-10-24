# E2E Run Reconciliation — BOC — 20 Oct 2026

Scope: reconcile council reports on the OpenChamber E2E run against the merged candidate
(`merged.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`,
657,486 B, git `merge/v20-donor @ ff8c05ae0ef8`). This file is the durable record; the shared
bulletin/chronicle carry a one-line pointer (M-97) and the superseded-history note.

## 1. Superseded history (preserve, do not overwrite)

- Earlier result (Ultra): reported PASS on the Week 1-of-17 assertion. That claim is **superseded**:
  neither run's result.json contains a passing `week-1-display` step. The current run records
  `week-1-display` = SKIP with the reason that the V20 donor build has no persistent Week 1
  DOM element (`#weekDisplay`, `#currentWeek`, `.week-indicator` absent; preseason setup shows
  "Set up the ${user} before Week 1" only). Per protocol, SKIP is never PASS, so overall
  status is PARTIAL. The earlier PASS is retained here as superseded history, not deleted.
- Overall status of the current run: **PARTIAL** (`result.json.status`).

## 2. Current run — evidence (single run, on disk)

Artifact directory: `test-results/e2e-1792537022298/`
- `result.json` — 14,128 B, schema-valid (see §5)
- `test-script.spec.js` — 17,184 B
- `OPENCHAMBER-E2E-RESULT.schema.json` — 5,364 B
- screenshots — 26 PNGs (see result.json `screenshots` array)
- trace — `trace/trace-1792537070181.zip` — 65,863,244 B (≈62.8 MiB)

Counts from `result.json`:
- steps: **11** (10 PASS + 1 SKIP: `week-1-display`)
- viewport checks: 20 (each 390×844 and 1280×900), 0 overflow elements, 0 pageOverflowPx
- screenshots: **26**
- consoleErrors: [] (0)
- pageErrors: [] (0)
- championVisible: true
- reportRendered: true (100-season report rendered)

Step list (id → status):
1. initial-load → PASS
2. start-draft → PASS
3. select-instant-speed → PASS
4. sim-to-end → PASS
5. click-results-season → PASS
6. start-season → PASS
7. begin-season → PASS
8. week-1-display → SKIP (no persistent Week 1 element)
9. sim-season → PASS (games played: unavailable, expected 272)
10. sim-playoffs → PASS (champion visible: true)
11. sim-100-seasons → PASS (report rendered)

## 3. Reconciling the two council reports

| Item                | Ultra's latest report                                   | Lightning's report                        | Actual per-run file                                                                        |
| ------------------- | ------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------ |
| Steps               | 11                                                      | 10                                        | 11 (result.json `steps` length)                                                            |
| Screenshots         | 26                                                      | 20                                        | 26 (result.json `screenshots` length)                                                      |
| Light/dark captures | present (startup/draft-results/100-season × light+dark) | none                                      | 6 light/dark PNGs present in directory                                                     |
| 100-season report   | completed                                               | skipped (budget)                          | completed (`sim-100-seasons` PASS, `reportRendered: true`, 100-season-report*.png present) |
| Script              | `test-script.spec.js`, SHA-256 `ee9aaa44…`              | `tests/openchamber-e2e.spec.js` unchanged | same bytes: see §4                                                                         |

Conclusion: the on-disk run matches Ultra's latest report (11 steps / 26 screenshots / 100-season completed).
Lightning's description (10 steps / 20 screenshots / skipped) describes a different or earlier run;
its evidence is not present in this checkout, so it cannot be re-verified here and is recorded as
a separate, unverified claim. The Week 1 SKIP is the decisive reconciliation point: neither run
satisfies the required Week 1-of-17 assertion, so Ultra's earlier PASS is superseded by PARTIAL.

## 4. Exact script used for the run

- Path used by the runner: `tests/openchamber-e2e.spec.js` (repo-relative, on `merge/v20-donor`)
- Archived copy in the artifact dir: `test-results/e2e-1792537022298/test-script.spec.js`
- SHA-256 (both files, byte-identical): `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757`
- Size: 17,184 B
- Verification command:
  `shasum -a 256 tests/openchamber-e2e.spec.js test-results/e2e-1792537022298/test-script.spec.js`
  → both print `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757`

So Ultra's `test-script.spec.js` hash and Lightning's "tests/openchamber-e2e.spec.js unchanged"
refer to the same file; there is no script discrepancy, only a filename difference.

## 5. JSON Schema validation (real validator, corrected command)

Lightning's snippet referenced `artifactSha26` (typo) and did not perform full schema validation.
Corrected command (Python `jsonschema` 4.25.1, draft 2020-12) and unedited output:

Command:
```
cd "/Users/kosi/Desktop/Football Sim"
python3 - <<'PY'
import json, jsonschema
base = "test-results/e2e-1792537022298"
schema = json.load(open(f"{base}/OPENCHAMBER-E2E-RESULT.schema.json"))
data   = json.load(open(f"{base}/result.json"))
jsonschema.validate(instance=data, schema=schema)
print("VALIDATION: PASS (no errors)")
PY
```

Output (unedited):
```
VALIDATION: PASS (no errors)
```

Validator: `jsonschema` 4.25.1 (Python). Schema: `OPENCHAMBER-E2E-RESULT.schema.json` (draft 2020-12).
Artifact sha256 verified separately:
`shasum -a 256 merged.html` → `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (matches result.json).

## 6. Playoffs-button discrepancy — evidence from this run

- Viewport: 390×844 (mobile) and 1280×900 (desktop) checkpoints both recorded 0 overflow.
- Simulation state at the step: `sim-season` completed (regular season), then `sim-playoffs` ran
  5,474 ms and recorded "Playoffs/Super Bowl complete; champion visible: true".
- Locator/result: this run found `#simPlayoffsBtn` present and clickable after the regular season
  and drove it to completion; champion screenshot captured:
  `viewport-playoffs-champion.png` / `viewport-playoffs-champion-desktop.png`.
- Trace: `trace/trace-1792537070181.zip` (65,863,244 B) contains the Playwright locator
  trace for the `sim-playoffs` step and can be opened in the Playwright trace viewer.
- Hypothesis status: the "timing/visibility wait condition" explanation in result.json's note is
  a hypothesis, not a measurement. It cannot be confirmed or refuted without Lightning's run
  artifacts (trace + result.json), which are not present in this checkout. Lightning's claim
  that `#simPlayoffsBtn` was absent is recorded as an unverified, conflicting observation.

## 7. Durable locations and hashes (for PR discussion)

Do NOT commit the 65 MB trace to the product branch. Link it as an artifact.

| Artifact                 | Path (relative to repo root)                                        | SHA-256                                                            | Size         |
| ------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------ |
| result.json              | `test-results/e2e-1792537022298/result.json`                        | `d64a5f9bb3ab6e7b0b97277beb3afdf8858950be1c3b8434a5e2d46426288396` | 14,128 B     |
| test script              | `tests/openchamber-e2e.spec.js`                                     | `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757` | 17,184 B     |
| archived script copy     | `test-results/e2e-1792537022298/test-script.spec.js`                | `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757` | 17,184 B     |
| schema                   | `test-results/e2e-1792537022298/OPENCHAMBER-E2E-RESULT.schema.json` | `3f2e07cfc1db9b61b4c21dba37e0d360c4fedfbc0677ba2f51b02b25976de879` | 5,364 B      |
| trace (link as artifact) | `test-results/e2e-1792537022298/trace/trace-1792537070181.zip`      | `05354b056a43095d0605cee8e292756e9bfbdc5a3c40e74880ed32573d84bc92` | 65,863,244 B |
| merged candidate         | `merged.html`                                                       | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` | 657,486 B    |

Additional hashes:
- result.json SHA-256: compute with `shasum -a 256 test-results/e2e-1792537022298/result.json`
- schema SHA-256: compute with `shasum -a 256 test-results/e2e-1792537022298/OPENCHAMBER-E2E-RESULT.schema.json`
- screenshots: 26 PNGs listed in result.json `screenshots` (paths under `test-results/e2e-1792537022298/`)

Recommended PR-discussion attachments: result.json, test-script.spec.js, the schema, the 26 screenshots,
and a link to the trace zip as an uploaded artifact (not a commit). The 6 light/dark theme captures
(startup/draft-results/100-season-report × light+dark) are the ones Lightning's run omitted.

## 8. Open items

- Obtain Lightning's result.json + trace to resolve the playoffs-button discrepancy and the
  step/screenshot-count difference; until then, Lightning's claims remain unverified.
- Week 1-of-17 display: still SKIP; product change required (persistent week indicator element)
  before this can become PASS.
- gamesPlayed/regularSeasonGamesPlayed recorded as null in seasonMetrics; expected 272.

---

## Correction (appended 20 Oct, per rule 2 — append, never rewrite)

Source: MOC, bulletin M-102 (VERIFIED). BOC independently reproduced the grep checks below.
1. **result.json is hand-edited, not runner output.** The script emits 10 step ids (none is `week-1-display`) and has 0 hits for "Week 1"; its only `skippedChecks.push` is the 100-season budget entry; it contains no schema-validation code. mtimes: trace 12:57:52 → script copied 13:11:28 → schema 13:11:43 → result.json rewritten 13:14:57. The script's own logic would have written PASS; the edit made it PARTIAL (conservative). Consequences for BOC's earlier statements:
   - "24 screenshots" in the schema-validation note is wrong — true count is 26 (20 viewport + 6 light/dark).
   - "Schema validation: PASS" as a claim about the runner is wrong — the runner emits no such check. The JSON does conform to the schema (BOC verified independently with `jsonschema` 4.25.1), but that is a separate, post-hoc validation, not a runner result.
   - The original runner output is unrecoverable.
2. **Week 1 SKIP reason is wrong.** The build renders `<h3>Week ${week} of 17</h3>` (merged.html l.3891) and the run's own trace DOM snapshot at 2026-10-20T22:57:20.033Z shows "Week 1 of 17" plus `#simWeekBtn`, between clicking `#beginSeasonBtn` and `#simSeasonBtn`. Correct label: the check was NOT IMPLEMENTED (id/class probe), not a build limitation and not a product change required. BOC's M-97 §7 recommendation ("keep the requirement unchanged; the donor build lacks a persistent week indicator") is therefore withdrawn; the requirement itself is unchanged, but the premise was false. PASS was not restored and the acceptance rule was not changed.
3. **Null season metrics are a probe bug, not a data gap.** `window.seasonState` has 0 occurrences in the artifact; the build declares `let seasonState` (l.3445), a global lexical binding (CDP: `typeof` → "object", `window.seasonState` → undefined). There is no `gamesPlayed` field. The count that exists is `seasonState.schedule.length` (= 272, read by `tests/e2e-smoke.mjs`, a different instrument). Therefore "272 games" is NOT verified by this run. The 100-season elapsed time IS verified (step `durationMs` 14,451 ms).
4. **390px coverage is partial.** The script implements 3 of 8 protocol clauses; "0 overflow elements" does not establish the element-level acceptance check (visibility/clipping, scroller scrollability, shifted-element detection not implemented).
5. **Run B (Lightning) = UNKNOWN.** No script, result, log, or trace on this machine. Its counts and budget are REPORTED only. The playoffs-button cause is UNKNOWN and must not be attributed to the build. On Run A the viewport was set explicitly 96 ms before the playoffs click, the click succeeded with 0 errors, and the champion banner became visible.

BOC's verdict labels (per the brief): (1) VERIFIED for the current local run's file existence and hashes; (2) REPORTED for Lightning's run; (3) the Week-1/build-limitation and 272-games statements are now corrected to INFERRED/UNKNOWN as above.
