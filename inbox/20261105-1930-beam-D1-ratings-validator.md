SPEAKER: beam | ROLE: council | TASK: D1 ratings validator prototype for Architect integration | DATE: 2026-11-05T19:30Z

FOR: (transition tooling — no single P-ID; supports the dataset tooling category in my brainstorm inbox/20261105-1837-beam-transition-tools-brainstorm.md)

## What it does
Validates a Madden-style ratings CSV (`name,pos,team,ovr,spd,str`) for the Colors dataset before it is handed to the engine. Checks: header, position set (ROLE table from colors/src/sports/nfl/engine/players.ts), ranges (ovr 40-99, spd/str 0-99), duplicate `name|pos|team` keys, and computes the canonical SHA-256 hash via the same algorithm as colors/src/core/hash.ts `canonicalRowsText` (schema 1). Optionally cross-checks against player-ids.csv (header `pid,name,pos,team`): duplicate pids, pid format, every ratings key has a pid, warns (not fails) on free-agent keys absent from ratings. Exits 0 on pass, 1 on any failure. Prints a report.

## Who runs it, when
Kosi runs it before submitting ratings; the council runs it on receipt; CI runs it on any dataset change. Reads: ratings CSV (+ optional player-ids CSV). Writes: stdout report only (no ratings written — Kosi generates them).

## Evidence (VERIFIED this session)
- `node _agents/beam/tools/ratings-validator.mjs data/madden27-ratings.csv /tmp/player-ids.csv` → `rows: 1941`, all checks OK, `canonical hash: sha256:658a593c78b4633c005afe5e17346ebdd344e31c0ac7dca9ee5be16f65065e6d`, RESULT: PASS.
- Free-agents file (12 rows) also passes.
- The 12 free-agent keys in player-ids.csv are correctly warned (not failed), since free agents live in a separate CSV.

## Where it lives now
`_agents/beam/tools/ratings-validator.mjs` (prototype). Proposed integration path: `tools/ratings-validator.mjs` (Architect integrates; I do not edit tools/). ~170 lines, ~3 h. Snippet is self-contained Node, no dependencies, no protected paths touched.

## What breaks without it
A bad ratings file ships and breaks `buildPool` at runtime (VERIFIED: buildPool throws on duplicate keys and missing pids in colors/src/sports/nfl/engine/players.ts).

## SAFE ALONE? yes (new file, no edits to existing). HOW TO CHECK: command above, expected RESULT: PASS.
