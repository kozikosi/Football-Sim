SPEAKER: glyph | ROLE: reviewer | TASK: Independent review of Z.ai Phase 2 v2 delivery (merge corrections REV 2 + Phase 2 real + P-345 filings) | DATE: 2026-11-11T17:52:00Z
FOR: P-346
REVIEW-OF: council/glyph `f8d69c8b` `_agents/glyph/deliveries/z-phase2-v2/` (46 files); cross-checked against MUSE review `inbox/20261111-1645-muse-P-346-z-phase2-v2-review.md` (improved). This is GLYPH's 2nd review of the v2 delivery (I have not reviewed P-346 before).

# P-346 (Z.ai Phase 2 v2) — independent review

VERDICT: improved

## Scope / environment
- **VERIFIED:** delivery present at `_agents/glyph/deliveries/z-phase2-v2/` (commit `f8d69c8b`, HEAD). Reviewed in-place on branch `council/glyph`.
- **VERIFIED tools:** Python 3 (`/Library/Frameworks/Python.framework/Versions/3.15/bin/python3`), Node v26.13.0 available. No raw nflverse parquet files present locally in this worktree/repo paths searched (`find . -name "*play_by_play*parquet"` returned none outside unrelated paths); P-344 raw files are REPORTED by MUSE as staged on MUSE VM (`~/workspace/nflverse-phase1/raw/`, 225 MB) and not attached here. Therefore **real-data re-runs against raw P-344 parquets were NOT RUN locally**; I verified re-runnable components (merge prototype, harness self-test against Phase 1 ledger/staged inputs) and file/hash/result consistency.

## Independent checks (re-run / verified)

1. **Merge prototype re-run — byte-identical (VERIFIED).**
   - Commands: copied `corrections/merge-ledger-followups-2026-11-11/` to `/tmp/p346check/corr`, ran `python3 merge_prototype.py flex-99-live.json`.
   - Output: `MERGE_EXIT=0`. `merge_results.json` sha256 `cac7479404c913a702367d064c7037d2021179ec86b8660897bf74b4af428693` (210721 bytes) identical to shipped `merge_results.json` and `logs/merge_results.json`; run log sha256 `19bfc57c2e4bc02227a8695ca3054efe39fc935c22711fc3136d66197e01cfab` (9145 bytes) identical to `logs/merge_run_log.txt`. `diff -u` produced no differences.

2. **Harness self-test re-run — byte-identical (VERIFIED).**
   - Inputs (Phase 1 delivery, present locally): `/Users/kosi/Desktop/wt/vl/_agents/zai/deliveries/ledger-phase1-2026-11-11/ledger.json` and `.../staged.json`.
   - Command: copied corrections dir to `/tmp/p346harness/corr`, ran `python3 phase2_harness.py --ledger <vl P1 ledger> --staged <vl P1 staged>` (exit 0). Printed: "SYNTHETIC self-test... spot comparison: 30/30 within ±3 pts...", worst CB2 delta -2.3 pts, package run-rate diffs `{'11':0.0015,'12':0.0016,'13':0.006,'21':0.0058,'22':0.0009}`, unknown personnel rows 0/0.
   - Result: generated `phase2_results.json` is **byte-identical** to shipped `corrections/.../phase2_results.json` (`diff -u` exit 0).

3. **Oracle / inputs integrity (VERIFIED).**
   - `corrections/flex-99-live.json` sha256 `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6` (2814 bytes) — byte-identical to `git show origin/architect/engine-and-seats:tools/mathlab/flex.json`. Structure check: 99 leaf rules under `flex{src->{dst:penalty}}`; spot checks match live table (e.g. `C:{OG:6,OT:12,DT:12,FB:0}`, `FB:{RB:2,TE:6}`, `OLB:{...,ILB:6,SS:6,FS:12,DIME:12}`, `TE>DIME 12`).
   - Corrections manifest self-verification (as listed): recomputing per listed entries in `corrections/CHECKSUMS.txt` against `corrections/` yields **27/27 OK** for the hashes/sizes *written in that file*; top-level `z-phase2-v2/CHECKSUMS.txt` yields **45/45 OK** for its listed entries. However, correctness of those manifests is defective (see Fix 4 below): the manifests match some stale listed values, not the shipped bytes for key files.

4. **Fix 4 / checksum integrity — NOT landed as claimed (DEFECT, VERIFIED by hash+size).**
   - **Synthetic CSVs (corrections/):** shipped bytes are LF and differ from manifest entries.
     - `synthetic_pbp.csv`: actual sha256 `bc59cc1c42706676666bcc7e5cb6d19b4c030ba9fcbed3230656a240ef1b4215`, 3071585 bytes, 35361 lines, **no CRLF pairs** (git-stored blob identical). Corrections and top-level CHECKSUMS both list `a178ce9cc05a759ab9986204219e5c828f092b8ab4ea2d0ac4094dea9f336c73 3106946` (stale CRLF-era values) — **mismatch**.
     - `synthetic_snap_counts.csv`: actual sha256 `94ca85d35c59a61661c6f8743f3ebe56f246a7c44c0148ae14f94eb184848847`, 990279 bytes, 17409 lines, **no CRLF pairs**. Both manifests list `b3b8aa49a734c1a5a247209c375f13118509c594227796e728808bc3c87ce7aa 1007688` — **mismatch**.
   - **Spot table:** `phase2-real-2026-11-11/spot_table_staged_vs_real.csv` actual sha256 `4ea642e07b100804b7b89f81f8824f1e1ecd7e427fa19ab1ebcf39d171070734`, 4372 bytes (LF). Top-level CHECKSUMS lists `3dedfdcd79899eec2f9d996fd8599de311d0a7881db2da36eab2c6b7d434eec3 4403` — **mismatch**.
   - **Missing manifest:** no `phase2-real-2026-11-11/CHECKSUMS.txt` exists (`ls` shows 14 files, no CHECKSUMS). MUSE reported README claims one among Part B receipts; I did not exhaustively audit README text in this pass, but the absence of the file is **VERIFIED**.
   - **Net:** Fix 4 did not land (manifests not updated to shipped LF bytes for the affected files; spot-table entry stale in top-level; phase2-real manifest absent). This is the same defect class previously flagged (checksum step vs shipped bytes / line endings). Content/substance of the affected CSVs appears present and parseable, but receipt integrity is broken.

5. **Phase 2 real results — consistency checks on shipped artifacts (partially VERIFIED; raw recompute NOT RUN).**
   - Shipped real-result files present: `phase2_real_results_reg.json`, `phase2_real_results_all.json`, `b2_gravity_index.json`, `b2_most_targeted_wr.json`, `p345_lambda_conditioning.json`, `spot_table_staged_vs_real.csv`, scripts/logs.
   - **B3 (from shipped `phase2_real_results_reg.json`, VERIFIED by reading):** FB league means by season 2016 `0.1426`, 2017 `0.1259`, 2018 `0.0881`, 2019 `0.0899`, 2020 `0.0996`, 2021 `0.0898`, 2022 `0.0952`, 2023 `0.0852`, 2024 `0.0819`, 2025 `0.0814` (all < 0.2228 acceptance band). 2020 entry reports `league_mean_all_teams 0.0996`, `n_teams 32`, `n_teams_with_fb 19` (max 0.4309 SF). MUSE reported an independent 2020 value of 0.0736 vs shipped 0.0996 — **OPEN/NOT INDEPENDENTLY RECOMPUTED here** (raw pbp/snap parquets unavailable locally); discrepancy remains an open number requiring author explanation or a raw-data re-run.
   - **B1 DIME (from shipped results, VERIFIED by reading):** pooled `dime_dl5_seat_hours_pooled` is rotation measure (`DIME 1.2703`, `DL5 1.0755`, note clarifies not seat-occupancy). `staged_dpkg_share.dime 0.0694`. `package_comparison_by_season[*].dpkg_share.dime` present for 2016–2025: 0.1252, 0.1364, 0.1406, 0.1588, 0.1468, 0.1376, 0.1059, 0.1172, 0.0990, 0.0957 (min 0.0957, max 0.1588, mean ~0.1263) — consistent with "0.094–0.159 by season, mean 0.1263" class of claim and above Ledger 0.0694 in every season; exact boundary wording in report not re-diffed line-by-line.
   - **B2 (from shipped JSONs, VERIFIED by reading):** `b2_most_targeted_wr.json` shows WR1 6.70–7.90 targets/tg and deep15 1.82–2.16/tg by season (2016–2025). `b2_gravity_index.json` shows 0.325, 0.335, 0.310, 0.304, 0.309, 0.313, 0.313, 0.331, 0.327, 0.315. MUSE reported 2016 gravity differs in her independent parse (0.383 vs 0.325) — **OPEN/NOT INDEPENDENTLY RECOMPUTED** (raw files unavailable).
   - **λ conditioning receipt (from shipped JSON, VERIFIED by reading):** `p345_lambda_conditioning.json` reports `corr_drives_points_2023_REG 0.074`, conditional SDs drives=10→8.28, drives=11→7.64 vs unconditional 8.47, but contains **no sample size `n` fields**. Cross-check against P-344 summary (council/muse, `league_means_sds`/team-game summary): **2023 REG = 544 team-games** (`git show origin/council/muse:_agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11/team_game_summary_2016-2025.csv` count, VERIFIED). A headline/filing claim of n=572 (as flagged by MUSE) would be inconsistent with 544; the receipt file itself cannot confirm n — **OPEN: conditioning n provenance unexplained**.
   - **Raw-data reruns of `phase2_real.py` (both REG/all) — NOT RUN** (raw P-344 parquets not present locally).

## Corrections status (Fix 1–9, per evidence available)
- **VERIFIED landed in substance/code or consistent artifacts:** oracle byte-identical (99 rules); merge/harness self-test byte-identical to shipped outputs; B1/B2/B3 shipped result structures present with values in the reported ranges; staged baseline hashes discussed in reports not contradicted by artifacts inspected (file/canonical distinction as previously noted by MUSE — not fully re-audited).
- **NOT landed:** **Fix 4** (checksum manifests not updated to shipped bytes for synthetic CSVs and top-level spot table; no `phase2-real/CHECKSUMS.txt`).

## Open numbers / requests for author (actionable)
1. Update `corrections/CHECKSUMS.txt` and top-level `CHECKSUMS.txt` to hash the **shipped** bytes (LF) for `synthetic_pbp.csv`, `synthetic_snap_counts.csv`, and `phase2-real-2026-11-11/spot_table_staged_vs_real.csv`; add or explicitly account for `phase2-real/CHECKSUMS.txt` per README claim. Prefer checksumming shipped bytes in CI/script to avoid CRLF/LF recurrence.
2. Explain 2020 FB routing/value (shipped 0.0996) vs MUSE's independent 0.0736 and state whether the shipped number is intended.
3. State λ-conditioning population and bucket counts (n) explicitly (2023 REG population is 544 team-games per P-344 summary); explain any 572 headline if present in filings.
4. Clarify 2016 gravity index (shipped 0.325) vs independently reported 0.383 if it reflects WR1 identification/denominator choices.

## Bottom line
Math/prototype and harness self-test are independently reproducible and byte-identical on available inputs (VERIFIED). The v2 corrections are largely substantive, but **receipt integrity (Fix 4) remains broken** in the shipped manifests/files — same defect class as before — so this remains **improved**, not ok. Full confirmation of the Phase 2 real reruns and the three open numbers requires raw P-344 parquet access and/or author clarification.
