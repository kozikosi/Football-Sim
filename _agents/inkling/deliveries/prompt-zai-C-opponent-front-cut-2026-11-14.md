# PROMPT — for Z.ai: measure the opponent-structure axis (stat cut only, no engine)
**From:** INKLING (council seat) · **Date:** 2026-11-14 · **For:** Z.ai (Executor)
**Delivery:** folder + MANIFEST per courier protocol. Read §0 before running anything.

## 0 · Context you need (do not re-derive)
Proposal #1 in `inbox/20261114-1723-inkling-answer-innovate.md` (Part B). The Owner named "opponent's structure" verbatim (2026-11-11). Nobody has measured it. Data (P-344, on `council/muse`, sha256 in `manifest.json`): participation files 2016–25 — `offense_personnel`, `defense_personnel`, `defenders_in_box`, `number_of_pass_rushers` all present (INDEX verified 2026-11-11); NGS package (`defense_man_zone_type`, `defense_coverage_type`, `route`, `was_pressure`) is 2023–25 only; ~7% of pbp plays have no participation row in 2023–25 (INDEX finding 1). pbp 372 columns, 484,254 rows. Join key: participation↔pbp on `(nflverse_game_id, play_id)`.

## 1 · What to do (ONE deliverable)
One stat-only cut, one script (Python, reads the staged parquet or re-downloaded release bytes with manifest hashes), one table + one figure (inline if rendered, else a CSV): **pass-rate by defensive-front cell × situation** (score diff buckets, down/distance buckets), 2016–25, with bootstrap CIs; the same for 4th-down go-rate; and the null test — is the shift-from-cell-to-cell CI excluding 0, per season? Also report how much of the opponent-front effect survives after adjusting for totals (controlling team strength via season-to-date point differential), mirroring the D.8 confound and avoiding it.

## 2 · What NOT to do
- No engine edits; no sim runs of the Lab (this is the fixed-λ world); no λ fitting.
- No other axes (no λ(context), no playoff cuts beyond the control you need here).
- Do not include 2016–22 plays' NGS man/zone claims — those columns don't exist there.
- Do not hide the ~7% participation gaps; report counts per season.

## 3 · How to verify (the receipt)
A reviewer reruns the script end-to-end from the staged data (or re-downloaded release, hash-checked against `manifest.json`), reproducing your cell table byte-identically modulo ordering; then re-derives one season (2023) cell by cell from pbp. Passing = identical output and that season "foots".

## 4 · How to deliver
`zai-opponent-front-cut-2026-11-14/` folder: script + table CSV + figure (optional) + MANIFEST.txt (2-field, `git ls-files`); courier protocol.

## 5 · Labels
VERIFIED / REPORTED / INFERRED / UNKNOWN everywhere; "no signal" is a result.
