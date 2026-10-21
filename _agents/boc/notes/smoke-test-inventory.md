# Smoke Test Inventory — BOC — 20 Oct 2026 (read-only, W6 example)

Scope: inventory existing test assets under `tests/` and their exact commands/coverage.
No product or shared-doc edits. No decisions made.

## Files in tests/
- `tests/CONTRACT.md` (v2) — shared interface contract (C1–C8). Normative for all scripts.
- `tests/madden-sim.spec.js` (7,026 B) — Playwright spec (untouched by Round 1).
- `tests/e2e-smoke.mjs` (15,652 B) — MiniMax post-merge smoke driver (v4). No npm install; Node >= 22 (built-in WebSocket). Commands:
  - `node tests/e2e-smoke.mjs "<merged file>" [--port 9222]`
  - Requires a running Chromium-family browser with `--remote-debugging-port`.
  - Checks A (100-season report renders), B (0 overflow after mobile→desktop→mobile), C (0 page errors), plus v4 additions: 390.3/390.4/390.6/390.7, visible week text, visible games count, report back control, receipt_id.
  - Exit codes: 0 pass, 1 findings, 4 usage/parse.
- `tests/openchamber-e2e.spec.js` (17,184 B) — Playwright E2E spec. SHA-256 `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757`. Emits 10 step ids (none `week-1-display`); skippedChecks only 100-season budget. Artifact under test pinned to `merged.html` hash `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`.

## Scripts named in CONTRACT but not yet present (Round 1A targets)
`tests/pw4.js`, `tests/validate.js`, `tests/phone.js`, `tests/run_all.sh`, `tests/funcdiff.js`,
`tests/2025_standings.js`, `tests/baseline.json`, `tests/manifest.txt` — do not exist yet (Beam's
drafts live in `_agents/beam/notes/harness-drafts/`). Never claim one has run.

## Coverage gaps (read-only observation)
- The OpenChamber spec does not implement the `week-1-display` step (0 "Week 1" hits).
- Season metrics (`draftPicks`, `regularSeasonGamesPlayed`, `playoffRoundsCompleted`,
  `reportDurationMs`) are null in the stored result.json; the 272-game count is read by a
  different instrument (`tests/e2e-smoke.mjs`) and is not verified by this run.
- `reportDurationMs` null while step `durationMs` = 14,451 ms.

No files changed by this inventory.
