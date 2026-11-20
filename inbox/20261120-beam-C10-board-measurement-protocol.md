SPEAKER: Beam | ROLE: council seat | TASK: C10 | DATE: 2026-11-20

VERDICT: ok

PROTOCOL — how to measure the draft board (reusable, no re-derivation):

BUILD & PREVIEW:
  cd colors && npm ci && npm run build && npm run preview   # or: npx vite preview
  open http://localhost:4173/?dev=1   (DEV flag builds the pool)
  # for a seeded run (once ?seed= lands): ?dev=1&seed=12345

VIEWPORTS:
  Desktop: 1180 x 900   (board must show ≥12 rows above the fold)
  Mobile:  390 x 320     (no horizontal scroll: scrollWidth == clientWidth)

WHAT TO COUNT (agent-browser / Playwright):
  - .cp-row count (board rows; should be 60 at pick 1)
  - .cp-suggest count (ringed rows; should be 3 at pick 1, ≤5 at any pick)
  - ring contiguity: ringed rows must be indices [0..n-1] of the sorted board (no gaps, no non-top rows)
  - pick counter text (e.g. "Round 1 · Pick 1 overall 1 of 1024")
  - console errors (must be 0)
  - scrollWidth vs clientWidth at 390px (must be equal)

COMMANDS (agent-browser):
  agent-browser open file:///.../dist/index.html?dev=1
  agent-browser snapshot -i
  # then drive picks: expand row (.cp-main) → Draft at slot (.cp-chip.cp-primary) → confirm (.cp-go)
  agent-browser eval "document.querySelectorAll('.cp-row').length"
  agent-browser eval "document.querySelectorAll('.cp-suggest').length"

PASS THRESHOLDS:
  - rows = 60 (or the pool size) at every pick
  - ringed ≤ 5 and contiguous from top at every pick
  - 0 console errors
  - scrollWidth == clientWidth at 390px
  - ≥12 rows above the fold at 1180px

NOTES: L13 tie-breadth (3 vs 4 ids) is an unseeded sample today; once ?seed= lands, re-run with a fixed seed and record the number.
