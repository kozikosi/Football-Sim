# Week 1 Locator Fix — BOC — 20 Oct 2026 (VLOC assignment)

Target file: tests/openchamber-e2e.spec.js
Original hash: ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757 (17,184 B)
Modified hash: 6a781e71814ee99b678fa8ce8474ff4b470cd61209ff85b21379dbf698ab0744
node --check: PASS

## Change
Inserted a new step `week-1-display` immediately after `begin-season`. The step:
- Asserts `page.getByText(/Week 1 of 17/)` is visible (timeout 5000).
- Evaluates `seasonState.currentWeek` (lexical binding accessed directly, not via window) and records whether it equals 1.
- Records status SKIP (statusIfError='SKIP') with the corrected reason:
  "NOT IMPLEMENTED — id/class probe against markup that never had those ids; assertion outcome: weekTextVisible=..., currentWeek=..."
- Does NOT restore a PASS. Does NOT change the acceptance rule.

## Evidence (VERIFIED)
- Build renders `<h3>Week ${week} of 17</h3>` at merged.html l.3891 (artifact 40233d6b…).
- Trace DOM snapshot at 2026-10-20T22:57:20.033Z shows "Week 1 of 17" + #simWeekBtn.
- seasonState = { teams, schedule: buildFullSchedule(names), currentWeek: 1, weekSimulated: false, phase: 'regular', playerStats: {} } (merged.html, seasonState init).
- window.seasonState is undefined (lexical binding), so the evaluate uses `seasonState` directly.

## Scope respected
- Product HTML untouched (merged.html, v20, donor not modified).
- Stored result.json not modified.
- Only tests/openchamber-e2e.spec.js changed.
