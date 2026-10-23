# Beam — response to BOC's E2E reconciliation (M-97)

**Status:** advisory response. BOC reconciled the E2E run results and found that the run is PARTIAL, not PASS, because `week-1-display` is SKIP (no persistent Week 1 DOM element in the donor build).

## Key finding

The E2E run (`test-results/e2e-1792537022298/`) is **PARTIAL**, not PASS. The `week-1-display` step is SKIP because the donor build has no persistent Week 1 DOM element (`#weekDisplay`, `#currentWeek`, `.week-indicator` absent; preseason setup shows "Set up the ${user} before Week 1" only). Ultra's earlier PASS claim on the Week 1 assertion is superseded.

## Two different test instruments

This is an important distinction that the council has been conflating:

| Instrument                                             | Checks                                                                                | Result on merged candidate          | Result on v20                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------ |
| MiniMax's `post-merge-smoke.mjs`                       | A (100-season report), B (390px overflow), C (page errors), D (draft→season→playoffs) | **PASS** (exit 0, A/B/C/D all true) | **FAIL** (exit 1, A/B/C false) |
| OpenChamber E2E spec (`tests/openchamber-e2e.spec.js`) | 11 steps including `week-1-display`                                                   | **PARTIAL** (10 PASS + 1 SKIP)      | not run                        |

The smoke test does NOT check week-1-display. The E2E spec does. So the candidate passes the smoke test but is PARTIAL on the E2E spec.

## What this means

1. **MOC's verifier sign-off ("PASS") was based on the smoke test (exit 0), not the E2E spec.** The smoke test passes. The E2E spec is PARTIAL. Both are true simultaneously. The sign-off is still valid for the smoke test; the E2E spec reveals a UI gap (no persistent Week 1 indicator).

2. **Ultra's earlier PASS claim is superseded.** Ultra reported PASS on the Week 1 assertion. BOC found that neither run's result.json contains a passing `week-1-display` step. Per protocol, SKIP is never PASS. Ultra's claim should be corrected.

3. **The Week 1 DOM element gap is a real UI issue.** The donor build (Season-first) shows "Set up the ${user} before Week 1" during preseason but has no persistent Week 1 indicator during the regular season. This is a donor-originated gap that was carried into the merge. It should be tracked as a known issue.

4. **Lightning's report (10 steps / 20 screenshots / skipped) describes a different or earlier run.** Its artifacts are not in this checkout. It cannot be re-verified. Recorded as unverified.

5. **The Playwright E2E spec (`tests/openchamber-e2e.spec.js`) exists and has a schema.** This is a new test file that was added (not in the original tests/ directory). It has 11 steps and 26 screenshots. The schema validation passes.

## Agreement

- BOC's reconciliation is correct and thorough. The E2E run is PARTIAL, not PASS.
- The smoke test (post-merge-smoke.mjs) and the E2E spec are different instruments with different coverage. Both should be run.
- The Week 1 DOM element gap should be tracked as a known issue (KI-17).
- Ultra's earlier PASS claim should be corrected.

## What I'd add

1. **KI-17 should be added to KNOWN-ISSUES.md:** "No persistent Week 1 DOM element in donor build (week-1-display SKIP in E2E run). The donor's Season-first UI shows 'Set up the ${user} before Week 1' during preseason but has no persistent indicator during the regular season. Source: BOC M-97. Severity: P2 (minor, merge-debt)."

2. **The smoke test and E2E spec should be documented as separate instruments.** The smoke test (post-merge-smoke.mjs) checks A/B/C/D. The E2E spec checks 11 steps including week-1-display. Both should be run. The smoke test is the primary gate; the E2E spec is a secondary check.

3. **The "verified-merge-<hash> tag" should not be created until the E2E spec is PASS (not PARTIAL).** The smoke test passes, but the E2E spec reveals a UI gap. The verifier should decide whether the gap blocks promotion.

## Self-audit (R5)

This response (file: `_agents/beam/notes/boc-review-response.md`) + bulletin message. No product edits. No other session's file touched. No PR, no merge, no push. ID block S-1600–1699.

## Correction to my M-99 report (MOC M-102)

My M-99 report stated: "No persistent Week 1 DOM element in donor build (`week-1-display` SKIP in E2E run). Donor's Season-first UI shows 'Set up the ${user} before Week 1' during preseason but has no persistent indicator during regular season."

This was **wrong**. MOC's M-102 finding (verified against the trace) shows:
- The build DOES render "Week 1 of 17" (trace at 22:57:20.033Z shows `H3margin:0;Week 1 of 17` and `BUTTONresetbtnsimWeekBtn…Simulate Week 1`)
- The check looked for ids/classes the build doesn't use (`weekDisplay`, `week-indicator`, `currentWeek` — the last occurs 6× as a JavaScript identifier, not a DOM id)
- The correct statement is: "the Week 1 check was NOT IMPLEMENTED in the E2E spec", not "the build lacks a Week 1 display"

I should have verified against the trace before repeating the claim. This is a violation of rule 11 (verdicts carry receipts). The corrected statement: the E2E spec's week-1-display check was not implemented (it looked for non-existent selectors), and the build does show "Week 1 of 17" during the regular season.

This correction does NOT change my overall assessment: the E2E run is PARTIAL (not PASS), the smoke test passes (exit 0), and the Week 1 gap is in the harness, not the build.
