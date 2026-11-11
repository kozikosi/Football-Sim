SPEAKER: glyph | ROLE: reviewer | TASK: Independent review of P-344 nflverse Phase 1 baseline data delivery (summary/manifest/index) | DATE: 2026-11-11T17:58:00Z
FOR: P-344
REVIEW-OF: `origin/council/muse:_agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11/` (INDEX.md, manifest.json, league_means_sds.csv, team_game_summary_2016-2025.csv, team_game_summary_nopenalty_2016-2025.csv, verification.json, fetch_nflverse.sh, analyze_nflverse.py) and `origin/council/muse:inbox/20261111-0936-muse-P-344-nflverse-phase1-data.md` (council/muse `c7540b04` context per prompt). This is GLYPH's 1st review of P-344.

# P-344 (nflverse Phase 1 baseline data) — independent review

VERDICT: improved

## Scope / environment
- **VERIFIED:** delivery files and inbox note readable from `origin/council/muse` via `git show`.
- **Raw parquet access NOT AVAILABLE locally:** `find . -path "*play_by_play*parquet"` found no P-344 raw parquets in this worktree; raw files are REPORTED staged on MUSE VM (`~/workspace/nflverse-phase1/raw/`, 225 MB). Therefore I **did not** recompute summary CSVs or hashes against the 30 raw parquet files. This review verifies internal consistency, the published totals-bar targets, coverage/row counts derivable from the published summaries/verification metadata, and plausibility against the ask; raw-byte/hash verification and parquet-to-summary recomputation remain **NOT RUN**.

## What I verified (independent checks on delivered artifacts)

1. **Team-game summary structure and population (VERIFIED).**
   - `team_game_summary_2016-2025.csv`: 5523 lines total = 5522 data rows + header (verified by line count). Header includes asked-for metrics: `points,drives,plays,off_plays,pass_att,completions,rush_att,yards,pass_yards,rush_yards,sacks_allowed,sacks_made,giveaways,takeaways,top_sec` plus identifiers/season_type.
   - Season/team-game counts from the summary (computed via csv parsing): **2023 REG = 544 team-games**, 2020 REG = 512, 2023 total (incl. postseason) = 570. These are consistent with the delivery's stated game counts logic (2023 has 285 games total; 272 regular-season games × 2 = 544 REG team-games).

2. **Totals-bar targets (league means/SDs) match delivered summary (VERIFIED).**
   - From `league_means_sds.csv`, scope `all_2016_2025` (n_team_games 5522):
     - points mean **22.7796**, sd **10.0015**
     - drives mean **11.0907**, sd **1.6812**
     - plays mean **81.4582**, sd **9.6145**
     - off_plays mean **62.4448**, sd **8.4735**
     - yards mean **343.6704**, sd **84.7732**
     - top_sec mean **1815.5608**, sd **268.9012**
   - These match the values stated in the support-round prompt/inbox note (points 22.78 ± 10.00; drives 11.09 ± 1.68; plays 81.46 ± 9.61; off_plays 62.44 ± 8.47; yards 343.67 ± 84.77; TOP 1815.6 ± 268.9 s). **VERIFIED consistent.**

3. **Manifest and file inventory (VERIFIED as published metadata).**
   - `manifest.json` lists 30 raw files (10 play_by_play, 10 pbp_participation, 10 snap_counts, 2016–2025) with source URLs under `nflverse/nflverse-data` releases, byte sizes, and sha256 hashes (I spot-read multiple entries including pbp 2016 `95eba04e2145e3c1…`, snap_counts 2016 `02fbeb10dd1369d8…`, participation 2023 `b157736972248e6f…`). I did **not** recompute hashes from raw bytes (NOT RUN).

4. **Verification metadata (VERIFIED as published).**
   - `verification.json` reports per-file rows/columns/seasons/games and game_id column names. Examples checked: pbp 2016–2025 rows 47651/47245/47109/47260/47705/49922/49434/49665/49492/48771 (372 cols), participation 48434/47998/47875/48053/45184/49978/49552/46168/46033/50714 (20 cols 2016–22, 26 cols 2023–25 per note), game counts 267/267/267/267/269/285/284/285/285/285. These align with inbox note totals (pbp 484,254; participation 478,989) and season game-count narrative (incl. 2020 expansion, 2022 cancelled game, 17-game era). **Internally consistent; not independently recomputed from raw parquets.**

5. **Participation coverage caveat (REPORTED by delivery, plausibility-checked).**
   - Delivery flags 2023–2025 participation coverage drop (~7.0–7.4% of pbp plays lack participation rows) while 2016–2022 participation is a superset. Row counts in `verification.json` are consistent with this (e.g. 2023 participation 46168 vs pbp 49665; 2025 50714 vs 48771 is not the same gap pattern — needs raw-level interpretation), but without raw joins I cannot independently quantify the missing-play fraction. **Treat as REPORTED/needs raw verification by another seat with parquet access.**

6. **nopenalty variant present (VERIFIED).** `team_game_summary_nopenalty_2016-2025.csv` exists and has the same row count class as the all-plays summary (header+rows structure consistent on read). The delivery notes points are identical by construction and penalty filter removes ~6.2 plays/team-game — **REPORTED; not recomputed**.

## Findings / gaps (why improved, not ok)
- **Raw-data recomputation NOT RUN:** sha256 hashes in `manifest.json`, per-file column/field presence claims (all 40 pbp / 12 participation fields present), participation-missing rate by season, and derivation of summary CSVs from the 30 parquets were not independently re-run here (no local raw parquets). A third-party review with the raw files (or a deterministic script re-run on the VM-staged copies) should confirm these before the Architect treats the dataset as fully verified.
- **Field-name/mapping notes (REPORTED, unverified):** ask's `two_point_result` → nflverse `two_point_conv_result`; punt return yards in `return_yards`; snap_counts lacks `season_type` in all seasons (derivable via join) — plausible and clearly documented, but not re-checked against raw schemas here.
- **Participation coverage nuance:** 2023–2025 drop is important for Phase 2; the exact missing fraction and affected play types should be confirmed from raw pbp↔participation joins.

## Bottom line
Published summary/index artifacts are internally consistent and the key totals-bar targets (points/drives/plays/off_plays/yards/TOP means and SDs, n=5522 team-games 2016–2025) are **VERIFIED** from the delivered CSVs. However, raw parquet integrity (sha256), field-coverage claims, and summary recomputation were **not independently re-run** due to missing local raw files, so the delivery is **improved** pending a raw-data re-verification by a seat with access to the 30 parquet files.
