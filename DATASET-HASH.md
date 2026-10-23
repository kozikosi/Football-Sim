# DATASET-HASH.md — Football Sim / 20-0 (anchor build)

**Speaker:** Beam | **Role:** Advisory (S-1600–1699) | **Date:** 2026-10-23
**Task:** MOC's outstanding leaving item "write DATASET-HASH.md" — claimed and completed by Beam.
**Build:** `_agents/pickle/builds/Football-Sim-PreColors.html` · sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` · 657,486 B.
**Tool:** `_agents/moc/tools/dataset-hash.mjs` (MOC, 22 Oct) — read-only, parses the build's own literals, no grepping.

## Dataset integrity hashes (canonical form)

Canonicalisation (per the tool, reproducible bit-for-bit by an independent implementation):
- PLAYERS: rows in source order; each row a compact JSON array with NO spaces; rows joined by U+000A (LF); UTF-8; **no trailing newline**. Numbers via ECMAScript `Number::toString` (so `1` and `1.0` both spell `1`).
- TEAM_DATA: teams sorted by name (code-unit order); slots sorted by slot name; one line per team `[team,[[slot,ovr,name],…]]`; U+000A joined; no trailing newline.
- Row order IS data (the array is OVR-ordered); sorting would blind the hash to a reordering. TEAM_DATA order is NOT data (object), hence sorted.

## PLAYERS array

| Metric | Value |
|---|---|
| Rows | 1,200 |
| Rows with 11 fields | 1,200 |
| Rows violating | 0 |
| Canonical bytes | 83,697 |
| **sha256** | **`e9030c9e4f67f2b1400b39f2b62656e3d3dcf63bd7f0020a51a807825e2f64fa`** |
| First row | `["Ja'Marr Chase","WR","Cincinnati Bengals",99,96,73,92,96,92,99,true]` (sha256 `e17b82ef…`) |
| Last row | `["Bryce Lance","WR","New Orleans Saints",70,94,69,83,85,90,59,false]` (sha256 `a61abae3…`) |

Fields: `name, pos, team, ovr, spd, str, agi, cod, inj, awr, xf?` (11 columns). `xf` is boolean (0/1 in the source, parsed as boolean). OVR range observed 70–99; attributes 47–99.

## TEAM_DATA

| Metric | Value |
|---|---|
| Teams | 32 |
| Slots (total across all teams) | 1,088 |
| Canonical bytes | 28,406 |
| **sha256** | **`e8665a17e5b832cc5f94b243a776acdf28b05aebe2c1921f91ccfbf189b818f0`** |

32 teams × 34 slots = 1,088. Slot set per team includes starters, depth, and bench entries; `FLEX`/`NATURAL_SLOT_MAP` penalties apply at rating time, not in the raw data.

## Colour table

**State: ABSENT from the anchor build.** No `TEAM_COLORS` / `TEAM_COLOURS` / `teamColors` / `teamColor` literal exists in Pre-Colors. Recorded as absence rather than hashing an empty string (per the tool's rule). The team-colour system shipped later (V22 candidate `d15f6535…`, `_agents/minimax/tools/build-team-colours.mjs` holds GPT's palette).

## Verification (command + output)

```
$ node _agents/moc/tools/dataset-hash.mjs "_agents/pickle/builds/Football-Sim-PreColors.html"
→ exit 0
→ players.sha256 = e9030c9e4f67f2b1400b39f2b62656e3d3dcf63bd7f0020a51a807825e2f64fa
→ team_data.sha256 = e8665a17e5b832cc5f94b243a776acdf28b05aebe2c1921f91ccfbf189b818f0
→ build_sha256 = 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd
→ build_bytes = 657486
```

Cross-check: the PLAYERS hash matches the bulletin's recorded value `e9030c9e…` (MOC, 23 Oct) and MOC's "PLAYERS e9030c9e…" shorthand. No drift.

## Why this matters

- Any future edit to `PLAYERS` or `TEAM_DATA` in a build can be detected by re-running the tool and comparing against these two hashes.
- Protected-constant rule: `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS` are NOT part of this hash (they are code, not data) and change only with the Owner's explicit approval.
- If a build claims "same dataset as Pre-Colors" but either hash differs, the dataset was touched — flag it.

## Labelling
- VERIFIED: hashes above (command + output, exit 0).
- REPORTED: row/field counts and ranges (from the tool's output; not independently re-counted by Beam).
- UNKNOWN: whether the colour-table absence in Pre-Colors is intentional (it is a later addition) — recorded, not judged.
