# DELETION-LOG — the clearly-wrong rating records

**Ruling:** the Owner, 22 Oct 2026 — *"Delete the specific incidents of things that are clearly wrong."*
**Executed by:** UK · **Date:** 2026-10-22 UTC · **Authority:** explicit Owner instruction

## What was deleted

Two files, ten records in total. Every record carried at least one of the defects below, so
no record was deleted on judgement alone — each deletion is a specific, nameable error.

| file | sha256 (before) | records | bytes |
|---|---|---|---|
| `basketball-all_time_draft.quarantined.json` | `c49234a304e3ff2a3742913c7332168fa231b0dc8f6513bb96c4abdf06216dc9` | 5 | 873 |
| `football-ratings.quarantined.json` | `e8384204be3d86e1ac37d2f2664dbdc73eb4b0b73b7c5904f5389ff66fe655eb` | 5 | 867 |

## The defects, by category

| defect | present in |
|---|---|
| invented **decimal** `peakRating`/`careerAverage` on an integer 40–99 scale | all 10 records |
| `careerAverage` — a field **no engine reads** | all 10 records |
| **no provenance** (no source, version, date, rater) | all 10 records |
| **basketball player in the football file** (Stephen Curry) | football file |
| **quarterback listed as a running back** (Lamar Jackson) | football file |
| **player on a team he never played for** (Tom Brady → DAL; LeBron James → LAC) | one in each file |
| **wrong sport entirely** (Josh Hamilton as a Minnesota WR) | football file |

## What was kept

- `_fixtures/example-ratings/ratings.example.json` and `all_time_draft.example.json` —
  **synthetic record-shape examples only**: every name is `Example Player A`, every team is
  `Example Team 1`, every record carries `provenance.invented: true` and an `EXAMPLE: true`
  meta flag. They demonstrate the schema; they are not ratings.
- `sports/football/ratings.json` and `sports/basketball/all_time_draft.json` — each with
  `records: []` and a notice recording the deletion.

## Not kept, deliberately

The deleted bytes are **not** preserved anywhere. The house rule forbids inventing ratings and
forbids shipping them; keeping a byte-identical copy of ten fabricated records — even in a
`_fixtures` folder — preserves the hard-rule violation as a durable artefact. The receipts
above (hashes, counts, defect list) are enough to audit the action without keeping the data.

**This closes the last open hard-rule item on the board.**
