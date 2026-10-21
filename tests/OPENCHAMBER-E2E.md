# OpenChamber E2E Acceptance Suite — NFL Simulator

**Status:** Shared run protocol. No result is implied until OpenChamber runs this suite against a named artifact and files a result matching the evidence schema.

**Current review candidate:** merge/v20-donor / NFL Draft Simulator merged.html / SHA-256 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd. This is a V20-base merge candidate, not V21. If a newer candidate is tested, record its exact Git ref and file hash; never reuse the hash above.

## Purpose

Run one repeatable browser acceptance pass using OpenChamber’s built-in Playwright capability. The same suite should be used by Claude, the council, and any future reviewer. Keep the suite in Git; save each run’s JSON, screenshots, and trace as review artifacts associated with the tested hash.

This protocol does not add a Playwright package or change the product. It is separate from the Node-only static test contract.

## Beta posture and current evidence

The Owner confirms that these simulations are beta projects with no active users. The Owner will personally play every simulation and decide whether it works as a product. Automated tests are a safety net for total breakdowns, null results, and fringe cases that ordinary play may miss. A test result is useful, but it is neither a prerequisite for continuing development nor a substitute for the Owner’s product review. A PASS applies only to the stated checks on the identified artifact; it is not Owner acceptance, release approval, or proof that V21 passed.

Continue independent work when a run is PARTIAL or incomplete. Report the result honestly, preserve what was learned, and fix or rerun a missing check when it is useful. Do not inflate SKIP into PASS or describe untested behavior as verified.

### Run A — recorded as PARTIAL

The strongest currently recoverable run is **PARTIAL**, against merge/v20-donor commit ff8c05ae0ef89e9030faa991a942d1c611f891bd, artifact SHA-256 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd (657,486 bytes). The supplied reconciliation reports 10 of 11 flow steps passed and the required visible Week 1 display check was skipped; it records 20 viewport checks, 26 screenshots, no console or page errors, and completion of the 100-season report. The 20 viewport checks reported zero page overflow, but do not by themselves establish full mobile usability. Structured values for several season metrics were absent, so do not fill them from a separate run. The report says its JSON was schema-validated; the browser run has not been replayed in this update.

The result, exact script, schema, screenshots and trace are linked from the [evidence resolution comment](https://github.com/kozikosi/Football-Sim/pull/3#issuecomment-6304124055) and the [durable evidence release](https://github.com/kozikosi/Football-Sim/releases/tag/e2e-evidence-2026-10-20T225702Z). Keep the record at PARTIAL unless a new, identified run satisfies the protocol.

### Open protocol interpretation

The protocol below requires “Week 1 of 17 is shown.” Run A did not assert that user-visible text, and its internal season state (reported as initialized to week 1) is not the same observation as a visible UI confirmation. Its Week 1 step is therefore SKIP. Run A is recorded as PARTIAL, although the current verdict definition below says PARTIAL is for an explicitly optional/budgeted skipped check. That is a protocol inconsistency to resolve explicitly; do not silently relabel Run A or change what the Week 1 check proves. The Architect and Owner should decide whether the visible display remains required or a different observable contract is acceptable, then update both the protocol and the result rules together.

The earlier Run B summary has no recoverable result JSON, script, screenshots, or trace. Retain its claims as reported history only; do not combine its claims with Run A or treat it as independently reproducible.

## Run identity and rules

Before opening the page, record:

- Git ref and commit SHA.
- Exact HTML artifact path and SHA-256.
- Suite revision/commit SHA.
- OpenChamber and browser versions.
- Run timestamp in UTC.

Abort the run if the selected file’s hash differs from the intended build. Do not silently switch files or fall back to a desktop path. Use OpenChamber’s documented way to load the local artifact. Do not change the application or add browser dependencies during the run.

Collect browser page errors and console errors from the first navigation through the final checkpoint. Keep logs even if the run fails. A skipped step is SKIP, never PASS. If the runner cannot access the required local build or expose a required observation, mark the run BLOCKED or the individual step SKIP and explain why.

## Required end-to-end flow

Use a fresh browser context for each run. Default desktop viewport is 1280×900.

### 1. Initial load

1. Load the exact target artifact.
2. Confirm the document title and NFL Draft Simulator heading.
3. Confirm the Start Draft control is visible and enabled.
4. Record page errors and console errors.
5. Record document/body scroll widths and take a startup screenshot.

### 2. Draft

Use the visible UI:

1. Click **#startDraftBtn**.
2. In the live draft, select Instant using **#speedInstantBtn**.
3. Click **#simToEndBtn** and wait for the result view.
4. Confirm **#draftFinalResults** is visible and contains “Draft Complete”.
5. Confirm the user-facing pick count is complete. Where page evaluation is supported, verify **draftSim.pos === 832**; otherwise record the visible count and mark the internal count check as unavailable.
6. Record completion time and screenshot.

Do not invoke finishDraft2, simToEnd, or other application functions directly. The flow must be driven through the same controls a user sees.

### 3. Season

1. Click **#resultsSeasonBtn**.
2. Confirm the season landing panel and **#startSeasonBtn**.
3. Click **#startSeasonBtn**. Confirm preseason setup and the **#beginSeasonBtn** control.
4. Click **#beginSeasonBtn**. Confirm Week 1 of 17 is shown.
5. Click **#simSeasonBtn** and wait for regular-season review.
6. Confirm all 17 weeks completed. Where page evaluation is supported, verify that 272 regular-season games are played (32 teams × 17 games ÷ 2). Record the observed value and method.
7. Confirm the playoff action is visible.
8. Record errors and a screenshot at preseason, Week 1, and regular-season review checkpoints.

### 4. Playoffs and Super Bowl

1. From regular-season review, click **#simPlayoffsBtn**.
2. Wait for the final season view.
3. Confirm the season reaches its completed state and a champion/Super Bowl result is visible.
4. Confirm standings/results remain usable and the page has no new page or console errors.
5. Record screenshot and, if available, the playoff rounds/games completed.

### 5. 100-season report

1. Click **#sim100Btn** through the UI.
2. Wait for the report to finish rendering; allow up to 180 seconds.
3. Confirm report content is visible, including league-wide results and the report’s “What actually drove winning” section.
4. Confirm no unhandled errors occurred and the report can return to the season view using its back control.
5. Record elapsed time and screenshot.

If the run’s agreed budget does not include the 100-season simulation, mark this step SKIP and the overall result at most PARTIAL.

## 390px responsive checks

Run these at 390×844 at each checkpoint: initial load, live draft, draft results, preseason, Week 1, regular-season review, playoffs/champion, and 100-season report.

At every checkpoint:

- Record document and body scroll widths and calculate page-level horizontal overflow.
- Check that the primary heading, navigation/phase indicator, and primary action are visible and within the viewport.
- Check that key buttons and filters are not clipped or covered.
- For each element wider than the viewport, record its selector, bounding box, and nearest horizontal scroll container.
- Verify intentional table scrollers can actually scroll horizontally and do not make the entire page scroll sideways.
- Take a screenshot and preserve it with the run evidence.

A document width of 390px alone is not sufficient proof: body overflow clipping can hide wide descendants. Distinguish a page-level overflow from a wide table inside a working scroll container.

## Light and dark appearance

At minimum, capture the startup and draft-results views with both light and dark color schemes, if the runner can emulate them. Record the selected scheme and any unreadable text, controls, focus indicators, or contrast problems. If theme emulation is unavailable, record that limitation rather than guessing.

## Overall verdict

- PASS: all required flow steps pass; no page/console errors; all 390px checkpoints are recorded and usable; evidence identifies the exact build.
- FAIL: a required assertion fails, the user flow stalls, or an unhandled page/console error occurs.
- PARTIAL: an explicitly optional/budgeted check is skipped, while all run steps pass. State every skipped check.
- BLOCKED: the exact artifact cannot be loaded or a required runner capability is unavailable.

A run must never be called PASS if the artifact hash is missing/mismatched, draft completion is not demonstrated, the regular season or playoffs were not driven, or the 390px checks were not recorded.

## Evidence delivery

Create one result JSON conforming to OPENCHAMBER-E2E-RESULT.schema.json. Attach screenshots and the Playwright trace/report to the same PR or run artifact; do not commit large binary traces into the product branch. Include the JSON and artifact links in the PR discussion. Name evidence with the artifact hash, for example e2e-40233d6b-2026-10-20.json.

A concise result must include: build hash · suite hash · runner/browser version · flow steps and statuses · season/playoff counts · console/page errors · 390px measurements · screenshot/trace links · skipped checks and reasons.
