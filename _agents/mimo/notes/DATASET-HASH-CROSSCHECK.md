# DATASET-HASH-CROSSCHECK — independent control hash (MiMo)

SPEAKER: MiMo | TASK: independent recomputation of the dataset hash (P6 / A-assignment) | DATE: 2026-10-25T03:00Z

Status: **my values are VERIFIED and published; the MATCH/MISMATCH verdict is UNKNOWN until MOC's number reaches the bulletin.** I implemented the recipe from the dispatch text only, without reading MOC's implementation.

## Input

`Football-Sim-PreColors.html` — sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B. VERIFIED by `shasum -a 256`. (The recipe named `_agents/pickle/builds/Football-Sim-PreColors.html`; that path does not exist in this worktree, so the resolver falls back to the lane-root copy, which carries the identical pin.)

## Command

```
node _agents/mimo/tools/hash-dataset.mjs
```

## Method (as the recipe specifies)

- **Extraction by bracket matching**, string- and escape-aware — not line grep, not regex-as-parser. The matched slice is then handed to `JSON.parse` (a real parser).
- **Assertions run:** `PLAYERS` is an array; **1,200 rows**; **every row exactly 11 fields**; `TEAM_DATA` has **32** teams. Any failure throws — the run did not throw. VERIFIED.
- **Canonical row:** `JSON.stringify(row)` — original field order, no whitespace, numbers emitted without a trailing `.0` (JS numbers have no integer/float distinction), strings JSON-escaped, `true`/`false` for `xf`.
- **Canonical document:** rows joined with `\n`, original order, UTF-8, **no trailing newline**.
- **Hash:** sha256 of those bytes.

## Values — VERIFIED

| quantity | sha256 |
|---|---|
| **PLAYERS, original row order** (the control) | `e9030c9e4f67f2b1400b39f2b62656e3d3dcf63bd7f0020a51a807825e2f64fa` |
| PLAYERS, sorted by name then team | `5d3f116ef47ba586041df31f8e21e5d63b95d26d82033196b12278d5875de7db` |
| TEAM_DATA, team keys sorted, slot order as shipped | `5af88ccb3e5732e2e5fc959a8656376cc0062a587f954383b4e8c5625b69eb3a` |

- **Row count:** 1,200 · **fields per row:** 11 (all) · **teams:** 32
- **`xf === true` rows:** **49**

## The two failures this was designed to catch — both confirmed live

1. **Whitespace/format drift.** Re-hashing the same rows with a leading space per line and a trailing newline yields `89f98c6f40ef23060a6be07d0ca34cf888d08e23b81170faada9fb98b7cd4023` — **differs from the control.** So a whitespace-only or trailing-newline change is detected. VERIFIED (`driftProbeDiffers: true`).
2. **Order sensitivity.** Sorting by name then team yields `5d3f116e…`, **≠** the control `e9030c9e…`. So a re-ordered `PLAYERS` array is detected even with byte-identical rows. VERIFIED (`orderSensitive: true`).

Together these mean: any single-row edit, any reordering, and any formatting drift changes the hash. The rows are pinned.

## Comparison with MOC's canonical hash — PENDING

| | PLAYERS (original order) | verdict |
|---|---|---|
| MiMo (this note) | `e9030c9e4f67f2b1400b39f2b62656e3d3dcf63bd7f0020a51a807825e2f64fa` | — |
| MOC (canonical) | *not yet received* | **UNKNOWN** |

On receipt: **MATCH** if equal; on **MISMATCH**, bisect the differing byte — most likely candidates, in order: (a) a trailing newline in MOC's document, (b) `\n` vs `\r\n`, (c) MOC hashing the raw source slice instead of re-serialized rows, (d) number formatting such as `71.0`, (e) key order in `TEAM_DATA`. Any of these is a format difference, not a data difference: `JSON.parse` of both must still yield equal arrays before anyone claims a data change.

## Contract note

This protects the Owner's 22 Oct ruling that the 1,200 rows are frozen. **Editing one row is a breach**; this hash makes it detectable. It changes nothing in the data.
