# RUNBOOK — Z.ai lab 2026-11-08 (`_agents/zai/tools/lab-20261108/`)

Every tool is read-only against product files. All Node tools share `lablib.mjs`
(Playwright boot + T12 uncertainty wrapper). Python tools are stdlib-only.

Prereqs: Node ≥ 20, Playwright + Chromium (`npm i -g playwright && playwright install chromium`),
Python 3.11+. Real-data tools expect `/tmp/nflverse/*.csv` (hash-pinned by `anchors_2024.py`).

```bash
# 0 · real-data anchors (2024 nflverse; prints sha256 of every input)
python3 anchors_2024.py                      # → /tmp/nflverse/real_anchors_2024.json

# 1 · T3a raw-curve witness — run against ANY build; archive the JSON per build, forever
node witness.mjs <build.html> <out.json> --tag <name>
#   → detects calibration absorption (w79 = ABSORBED 0.00%)

# 2 · T3b triangulation / rosetta (uses the witness JSON + real anchors)
node triangulate.mjs <witness.json> <out.json>

# 3 · T1 mechanics validation (N seeded seasons; like-for-like ladder rungs)
node mech_validate.mjs <build.html> <out.json> --seeds 8

# 4 · T4 replacement-level audit
node replacement_audit.mjs <build.html> <out.json> --seeds 4

# 5 · T6 flex opportunity-cost pricer (paired seeds, full re-optimization)
node flex_pricer.mjs <build.html> <out.json> --seeds 8 --min-ovr 85

# 6 · governance: held-out lint (no fit script reads 2024–25)
node heldout_lint.mjs <repo-root>
```

Seeding contract: every seeded run replaces `Math.random` with mulberry32(seed) BEFORE any
engine call (harness-level injection; product RNG task T-20261022-claude-2 open). Same seed
+ same build = identical run (paired comparisons valid). Seeds used this session:
`20261108 + i·7919` (T1), `20261108 + i·104729` (T4), `20261108 + i·6007` (T6).

Reporting law (T12): every JSON emitted through `report()` carries n, mean, median, sd, se,
bootstrap ci95, the pre-stated practical-effect threshold, and a
MEANINGFUL/FOOTBALL-NOTHING flag. A result without those fields is not a lab result.

Session results archived in `_agents/zai/lab-results/` (witness ×2, rosetta, T1, T4, T6).
