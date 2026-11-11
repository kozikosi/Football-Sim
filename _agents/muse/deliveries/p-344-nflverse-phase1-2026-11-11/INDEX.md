# P-344 — nflverse Phase 1 football baseline data, 2016–2025

**Answer to the Architect's ask** (`inbox/20261111-0902-architect-ASK-phase-1-football-baseline-data.md`,
`origin/architect/engine-and-seats` `a110ff2`). Fetched and verified by MUSE, 2026-11-11.

**Sources:** `nflverse/nflverse-data` GitHub releases (public, free). All 30 files
downloaded 2026-11-11, sha256-verified after download, and staged on the MUSE VM
at `~/workspace/nflverse-phase1/raw/` (225 MB). The release URLs below are stable;
anyone can re-download the identical bytes (hashes in `manifest.json`).

**What this delivery contains**
- `INDEX.md` — this file (the ask's index: file list, row counts, seasons, fields
  present/missing, source URLs, sha256, rules-regime labels, summary targets).
- `manifest.json` — the 30 raw files with URL, byte size, sha256.
- `team_game_summary_2016-2025.csv` — per-team-game summary, all plays (5,522 rows).
- `team_game_summary_nopenalty_2016-2025.csv` — same, penalty plays removed (5,522 rows).
- `league_means_sds.csv` — league mean + SD per metric: overall, regular-season,
  postseason, per season, per season regular-only (345 rows).
- `verification.json` — machine-readable row counts, columns, games, missing fields.
- `fetch_nflverse.sh`, `analyze_nflverse.py` — the exact scripts used (reproducible).

## 1. The raw files (30)

| File | Bytes | sha256 (first 16) | Source URL |
|---|---|---|---|
| `play_by_play_2016.parquet` | 19,344,382 | `95eba04e2145e3c1…` | https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2016.parquet |
| `play_by_play_2017.parquet` | 19,050,401 | `84eacd963c1fdd45…` | https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2017.parquet |
| `play_by_play_2018.parquet` | 19,072,097 | `2e6f2dce7c7ebd46…` | https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2018.parquet |
| `play_by_play_2019.parquet` | 19,119,729 | `60c3067017db2d28…` | https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2019.parquet |
| `play_by_play_2020.parquet` | 19,286,459 | `8889f5d8782b5c5d…` | https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2020.parquet |
| `play_by_play_2021.parquet` | 20,249,925 | `333ad34378e5339d…` | https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2021.parquet |
| `play_by_play_2022.parquet` | 20,426,548 | `931121d8897779d7…` | https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2022.parquet |
| `play_by_play_2023.parquet` | 20,534,088 | `bd3484731408def6…` | https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2023.parquet |
| `play_by_play_2024.parquet` | 20,597,560 | `3fd2896bc0b911b6…` | https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2024.parquet |
| `play_by_play_2025.parquet` | 20,337,029 | `c6ecedd6d678cc37…` | https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.parquet |
| `pbp_participation_2016.parquet` | 3,076,917 | `e876e5c312749782…` | https://github.com/nflverse/nflverse-data/releases/download/pbp_participation/pbp_participation_2016.parquet |
| `pbp_participation_2017.parquet` | 2,943,355 | `e4b2ce19b0da7a7a…` | https://github.com/nflverse/nflverse-data/releases/download/pbp_participation/pbp_participation_2017.parquet |
| `pbp_participation_2018.parquet` | 2,978,916 | `334f03887775e98f…` | https://github.com/nflverse/nflverse-data/releases/download/pbp_participation/pbp_participation_2018.parquet |
| `pbp_participation_2019.parquet` | 2,992,048 | `5dd6c4ff1610cd4f…` | https://github.com/nflverse/nflverse-data/releases/download/pbp_participation/pbp_participation_2019.parquet |
| `pbp_participation_2020.parquet` | 2,849,568 | `dbabfbef30c7e165…` | https://github.com/nflverse/nflverse-data/releases/download/pbp_participation/pbp_participation_2020.parquet |
| `pbp_participation_2021.parquet` | 2,949,474 | `bc16b14c7043e780…` | https://github.com/nflverse/nflverse-data/releases/download/pbp_participation/pbp_participation_2021.parquet |
| `pbp_participation_2022.parquet` | 2,941,018 | `5f8d349316bf68de…` | https://github.com/nflverse/nflverse-data/releases/download/pbp_participation/pbp_participation_2022.parquet |
| `pbp_participation_2023.parquet` | 4,700,238 | `b157736972248e6f…` | https://github.com/nflverse/nflverse-data/releases/download/pbp_participation/pbp_participation_2023.parquet |
| `pbp_participation_2024.parquet` | 4,644,767 | `5e8cf1f6a11bb2be…` | https://github.com/nflverse/nflverse-data/releases/download/pbp_participation/pbp_participation_2024.parquet |
| `pbp_participation_2025.parquet` | 4,741,443 | `3b26b9487267f011…` | https://github.com/nflverse/nflverse-data/releases/download/pbp_participation/pbp_participation_2025.parquet |
| `snap_counts_2016.parquet` | 212,500 | `02fbeb10dd1369d8…` | https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2016.parquet |
| `snap_counts_2017.parquet` | 212,468 | `46805183af6d987b…` | https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2017.parquet |
| `snap_counts_2018.parquet` | 211,973 | `db5ab19bb95e290c…` | https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2018.parquet |
| `snap_counts_2019.parquet` | 213,089 | `ef9068cc9eebaf01…` | https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2019.parquet |
| `snap_counts_2020.parquet` | 233,598 | `0dee77ab7595cbef…` | https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2020.parquet |
| `snap_counts_2021.parquet` | 240,680 | `1f6ab4c26a7d394c…` | https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2021.parquet |
| `snap_counts_2022.parquet` | 237,678 | `3cfde83eb6d859e3…` | https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2022.parquet |
| `snap_counts_2023.parquet` | 237,882 | `97873cab365dfb39…` | https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2023.parquet |
| `snap_counts_2024.parquet` | 240,862 | `9ec66a0c755939b3…` | https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2024.parquet |
| `snap_counts_2025.parquet` | 242,046 | `47220218fecda7af…` | https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_2025.parquet |


## 2. Verification (all VERIFIED by re-reading the downloaded files)

| Dataset | Seasons | Rows total | Rows/season | Columns | Games/season |
|---|---|---|---|---|---|
| play_by_play | 2016–2025 | 484,254 | 47,109–49,922 | 372 | 267 (2016–19), 269 (2020), 285 (2021, 2023–25), 284 (2022) |
| pbp_participation | 2016–2025 | 478,989 | 45,184–50,714 | 20 (2016–22), 26 (2023–25) | matches pbp exactly |
| snap_counts | 2016–2025 | 253,107 | 23,862–26,615 | 16 | matches pbp exactly |

Game-count notes: 2020 has 269 games (playoffs expanded 12 → 14 teams); 2022 has
284 (the Week 17 Bills–Bengals game was cancelled, so 271 regular-season games);
2021 and 2023–2025 have 285 (272 regular + 13 playoff).

**Required fields — present/missing (checked against every season file):**
- **pbp: 0 missing of 40 required.** Every field in the ask is present in all 10
  seasons. Two name notes: the ask's "two_point_result" is nflverse's
  `two_point_conv_result`; punt return yards are in `return_yards` (there is no
  separate `punt_return_yards` / `kick_return_yards` column). `drive_time_of_possession`
  (string "M:SS"), `drive_game_clock_start/end`, `drive_play_count`,
  `drive_start_yard_line`, `drive_end_transition` all present.
- **participation: 0 missing of 12 required.** `offense_personnel`,
  `defense_personnel`, `offense_formation`, `defenders_in_box`,
  `number_of_pass_rushers` all present; players on field are `offense_players` /
  `defense_players` (semicolon-separated gsis ids) plus `players_on_play`.
  Name notes: the game key is `nflverse_game_id` (not `game_id`); the possession
  team is `possession_team` (not `posteam`); there is no `season` column (derive
  from the first 4 chars of `nflverse_game_id`); there is no `defense_formation`
  column in any season. 2023–2025 files add 6 NGS columns (`ngs_air_yards`,
  `time_to_throw`, `was_pressure`, `route`, `defense_man_zone_type`,
  `defense_coverage_type`).
- **snap_counts: 1 missing of 13 required — `season_type` is absent in all 10
  seasons.** Everything else present (`game_id`, `season`, `week`, `team`,
  `player`, `position`, `offense_snaps`, `offense_pct`, `defense_snaps`,
  `defense_pct`, `st_snaps`, `st_pct`). `season_type` is derivable by joining
  `game_id` to pbp (or from week: regular weeks 1–17 pre-2021, 1–18 from 2021).

**Join keys (VERIFIED on 2016, 2023, 2025):** participation joins to pbp on
`(nflverse_game_id, play_id) = (game_id, play_id)`; snap counts join on `game_id`
(+ `team` / `player`).

**Findings (things the Architect should know before using these files):**
1. **Participation coverage drops in 2023–2025.** In 2016–2022 participation is a
   *superset* of pbp (e.g. 2016: 783 participation keys not in pbp, 0 pbp keys
   missing). From 2023 it is a *subset*: 3,497 of 49,665 pbp plays (7.0%) have no
   participation row in 2023; 3,587 of 48,771 (7.4%) in 2025. The 2023 file is
   also when the NGS columns appear, so the likeliest cause is plays without
   tracking data being dropped. Phase 2 snap/participation validation must allow
   for ~7% missing participation in 2023–2025.
2. **An extra 2023 participation file exists** in the release:
   `pbp_participation_old_2023.parquet` (superseded; the current file was used).
3. **Giveaways vs takeaways differ by 14 team-games in 10 seasons**
   (means 1.3024 vs 1.2999). Every giveaway should be a takeaway for the other
   team; the 14-row gap is special-teams fumbles, where the posteam/defteam
   assignment does not follow the recovery. Negligible for the totals bar.

## 3. Rules-regime changes by season (labels for the baseline)

Verified against NFL reporting (search, 2026-11-11). Only changes that move
team-game totals or overtime/kickoff behaviour are listed.

| Season | Change |
|---|---|
| 2016 | Touchback spot moved 20 → 25 (two-year trial; made permanent 2018). |
| 2017 | Regular-season overtime shortened 15 → 10 minutes. |
| 2018 | Kickoff overhaul: no running start, no wedge blocks, setup zone; lowering-the-helmet rule; touchback-to-25 permanent. |
| 2020 | Playoffs expand 12 → 14 teams (13 playoff games instead of 11). |
| 2021 | 17-game regular season (256 → 272 games). |
| 2022 | Playoff overtime: both teams get a possession even after an opening-drive TD. |
| 2023 | Fair catch inside the 25 on a kickoff/safety kick → ball at the 25 (one-year rule). Return rate falls to a record-low 21.8%. |
| 2024 | Dynamic kickoff (one-year trial): coverage lines up at the return team's 40, no movement until the ball lands; touchback to the 30. Return rate 21.8% → 32.8%. |
| 2025 | Dynamic kickoff permanent; touchback moved 30 → 35. Regular-season overtime now matches the playoffs (both teams possess even after an opening TD); OT stays 10 minutes. |

## 4. Team-game summary — definitions

One row per team per game (5,522 rows = 2 × 2,761 games). Columns:

| Column | Definition |
|---|---|
| season, week, season_type, game_id, team, opp, home_team | game identity; `opp` is the opponent |
| points | final total score of the game for the team (from the last play row of the game). **Identical in the nopenalty table by construction** — the final score is a fact about the game, read from the unfiltered file. |
| drives | distinct `drive` values with `posteam` = team |
| plays | rows with `play_type` not null and `posteam` = team. Includes special-teams plays where the team is the possession team (kickoffs, punts, PATs/FGs). |
| off_plays | rows with `play_type` in (pass, run) — the clean offensive-play count (includes sacks, scrambles, kneels, spikes). |
| pass_att | `pass_attempt` = 1. rush_att: `rush_attempt` = 1. completions: `complete_pass` = 1. |
| yards | sum of `yards_gained` over pass+run plays (sacks included, negative). pass_yards / rush_yards split it by `play_type`. |
| sacks_allowed | `sack` = 1 and `posteam` = team. sacks_made: same with `defteam` = team. |
| giveaways | `interception` + `fumble_lost` with `posteam` = team. takeaways: same with `defteam` = team. |
| top_sec | sum of `drive_time_of_possession` ("M:SS" → seconds) over the team's drives. No missing values in any season. |
| (nopenalty table) | same, after dropping every row with `penalty` = 1. Removes ~6.2 plays per team-game (81.46 → 75.28). Drives can drop if a drive consisted only of penalty plays. |

## 5. The ~10% totals-bar targets (league means and SDs)

From `league_means_sds.csv` (n = team-games). The Owner's bar is ~10% on most
metrics; these are the numbers Phase 1 is measured against.

| Metric | All 2016–2025 (n=5,522) | Regular season only (n=5,278) |
|---|---|---|
| points | 22.78 ± 10.00 | 22.73 ± 9.99 |
| drives | 11.09 ± 1.68 | 11.10 ± 1.67 |
| plays | 81.46 ± 9.61 | 81.45 ± 9.60 |
| off_plays | 62.44 ± 8.47 | 62.40 ± 8.43 |
| pass_att | 36.66 ± 8.61 | 36.59 ± 8.56 |
| completions | 21.87 ± 5.93 | 21.85 ± 5.93 |
| rush_att | 26.70 ± 7.57 | 26.72 ± 7.55 |
| yards | 343.67 ± 84.77 | 343.12 ± 84.86 |
| pass_yards | 227.68 ± 76.89 | 227.06 ± 76.89 |
| rush_yards | 115.99 ± 51.33 | 116.06 ± 51.33 |
| sacks_allowed / sacks_made | 2.38 ± 1.75 | 2.38 ± 1.74 |
| giveaways | 1.30 ± 1.19 | 1.31 ± 1.19 |
| takeaways | 1.30 ± 1.19 | 1.31 ± 1.19 |
| top_sec | 1815.6 ± 268.9 (≈ 30:16) | 1815.4 ± 268.7 |

Per-season points means (team-game): 2016: 22.82 · 2017: 21.60 · 2018: 23.16 ·
2019: 22.80 · 2020: 24.75 (highest-scoring season of the window) · 2021: 22.89 ·
2022: 22.01 · 2023: 21.88 · 2024: 22.98 · 2025: 22.98. Full per-season and
per-season-regular tables for every metric are in `league_means_sds.csv`.

## 6. How to reproduce / where the raw files live

- Raw parquet files: staged on the MUSE VM at `~/workspace/nflverse-phase1/raw/`
  (225 MB, 30 files). Re-download with `fetch_nflverse.sh` in that directory
  (or the copy in this delivery); it writes `manifest.json` with URL + sha256.
- Summary tables: regenerate with `analyze_nflverse.py raw out` (needs Python +
  pyarrow + pandas; a venv is at `~/workspace/nflverse-phase1/venv/`).
  The script is memory-light (one season at a time); the first version OOM-killed
  at 6 GB by loading all 10 seasons at once, and was rewritten.
- The Architect's shell may not be able to download from GitHub releases (proxy
  UNKNOWN, per his ask note). If so, the raw files can be supplied from the MUSE
  VM staging copy; the summary CSVs in this delivery are the small files he needs
  first (the totals bar only needs the summary + means/SDs).
