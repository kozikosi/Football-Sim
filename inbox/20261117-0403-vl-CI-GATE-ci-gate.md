SPEAKER: vl | TASK: CI-GATE — independently test Claude's engine work, Part 3: is the CI build gate real? | DATE: 2026-11-17T04:03:00Z
FOR: CI-GATE

## Engine tip tested

5c808472 ("Pooled-node conformance: the lab's own Pack is the oracle for the baked pack and the TS loader"), tip of architect/engine-and-seats.

## Workflow reading — VERIFIED

File: `.github/workflows/ci.yml` at 5c808472.

The workflow has three relevant steps:

| Step | continue-on-error? | Gate status |
|---|---|---|
| Type check (ratchet) | `true` | REPORT-ONLY (never blocks) |
| Tests | `true` | REPORT-ONLY (never blocks) |
| Production build | **absent** | **GATE** (a failing build fails the run) |

The build step (`npm run build`) has no `continue-on-error` key, so a failing build fails the CI run. The comment at the top of the file confirms: "The production build is a GATE since 17 Nov 2026 (Owner: flip it when green; it passed on Node 24 in the last three runs)."

By contrast, both `npm run tsc:check` and `npm test` have `continue-on-error: true` — they show red in the log but never block a push or merge (per Owner via Ernie, 14 Nov).

## Last 3 CI runs — VERIFIED via gh CLI

Command: `gh run list --repo kozikosi/Football-Sim --branch architect/engine-and-seats --limit 3`

| Run ID | Commit | Created | Overall status | Overall conclusion | Build step status | Build step conclusion | Statuses match? |
|---|---|---|---|---|---|---|---|
| 44010235789 | 5c808472 (tip) | 2026-11-17T03:26:34Z | completed | success | completed | success | YES |
| 44006643913 | db33bfa0 (cosine) | 2026-11-17T02:56:54Z | completed | success | completed | success | YES |
| 44002436907 | 7828d914 (CI gate flip) | 2026-11-17T02:22:00Z | completed | success | completed | success | YES |

All three runs show `step.conclusion: success` for the "Production build (GATE since 17 Nov 2026...)" step, and `job.conclusion: success` for the overall job. Build step status matches overall status in all three runs.

Command used for per-run detail: `gh run view <id> --repo kozikosi/Football-Sim --json jobs`

## Is the gate real?

**Yes.** The build step lacks `continue-on-error`, so any build failure propagates to job failure and run failure. All three most recent runs passed with the build step green. I did not manufacture a failing build run (the prompt explicitly says not to); instead I confirmed the gate mechanism is correctly scoped (no continue-on-error on build, continue-on-error on report-only steps) and that every recent run's build step passed, matching the overall run status.

One nuance worth noting: the CI gate is real at the workflow level, but no run in the last three actually exercised a build failure — so the gate's failure path hasn't been observed live. The mechanism is correct; the evidence is the absence of `continue-on-error` plus three green build steps.

Labels: workflow reading VERIFIED (file read at tip). CI run data VERIFIED (gh CLI output quoted). Gate-is-real assessment: VERIFIED at mechanism level; failure-path-not-observed noted honestly.
