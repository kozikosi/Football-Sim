SPEAKER: beam | ROLE: Council seat | TASK: ANSWER 20261111-0902-architect-ASK-phase-1-football-baseline-data.md | DATE: 2026-11-14T08:32Z

## Verdict: DATA OBTAINED (already downloaded on Owner's machine) — INDEX + FIELD MAPPING PROVIDED

The four nflverse Phase 1 partitions for seasons 2016–2025 are present on the Owner's machine (downloaded 2026-11-13, source nflverse releases). I copied them to a stable local path and verified every sha256 against the supplied `sha256.txt` (40/40 OK). Full index, row counts, field presence/absence vs the ASK spec, and flags below.

### Stable local path
`_agents/data/nflverse-2016-2025/` (40 parquet files, 225 MB total). Directory is gitignored (binary bulk); the index + sha256 live in this note. Source of truth for hashes: `_agents/data/nflverse-2016-2025/sha256.txt` (copied verbatim from the download).

### Integrity
`sha256sum -c sha256.txt` → 40 OK, 0 FAILED. All files match.

### Source / provenance
- Source: nflverse data releases (https://github.com/nflverse/nflverse-data), parquet partitions.
- Timestamps: pbp 2026-11-13 12:11 EST; pbp_participation 2026-02-10; snap_counts 2026-11-13 07:01; stats_team 2026-11-13 12:14.
- Seasons covered: 2016–2025, regular season (REG) + playoffs (POST) in every play-by-play file (verified distinct `season_type` = {REG, POST}).
- License: nflverse data is CC-BY 4.0; attribute nflverse. No PII beyond public player ids.

---

## Partition 1 — Play-by-play (10 files)

| File | Rows | Season | sha256 (first 16) |
|---|---|---|---|
| play_by_play_2016.parquet | 47,651 | 2016 | 95eba04e2145e3c1 |
| play_by_play_2017.parquet | 47,245 | 2017 | 84eacd963c1fdd45 |
| play_by_play_2018.parquet | 47,109 | 2018 | 2e6f2dce7c7ebd46 |
| play_by_play_2019.parquet | 47,260 | 2019 | 60c3067017db2d28 |
| play_by_play_2020.parquet | 47,705 | 2020 | 8889f5d8782b5c5d |
| play_by_play_2021.parquet | 49,922 | 2021 | 333ad34378e5339d |
| play_by_play_2022.parquet | 49,434 | 2022 | 931121d8897779d7 |
| play_by_play_2023.parquet | 49,665 | 2023 | bd3484731408def6 |
| play_by_play_2024.parquet | 49,492 | 2024 | 3fd2896bc0b911b6 |
| play_by_play_2025.parquet | 48,771 | 2025 | c6ecedd6d678cc37 |
Total rows ≈ 484,254. Columns: 372.

### ASK field presence (play-by-play)
PRESENT (all 47+ named fields): game_id, season, week, season_type, qtr, game_seconds_remaining, down, ydstogo, yardline_100, posteam, defteam, score_differential, posteam_timeouts_remaining, defteam_timeouts_remaining, play_type, yards_gained, air_yards, yards_after_catch, pass_location, run_location, complete_pass, incomplete_pass, interception, sack, qb_scramble, fumble, fumble_lost, touchdown, field_goal_attempt, field_goal_result, kick_distance, punt_attempt, kickoff_attempt, two_point_attempt, two_point_conv_result, penalty, penalty_type, penalty_yards, drive, drive_real_start_time, drive_game_clock_start, drive_game_clock_end, drive_end_transition, fixed_drive_result, no_huddle, shotgun, passer_player_id, rusher_player_id, receiver_player_id, return_yards, return_team, drive_play_count, drive_time_of_possession.

MISSING / not a direct column:
- `onside` flag — NO onside column. Proxy available: `own_kickoff_recovery` (kicking team recovers its own kickoff) plus `kickoff_attempt`. Recommend deriving `onside = kickoff_attempt AND own_kickoff_recovery`.
- `punt net yards` — no net-punt column. Proxy: `return_yards` (return yards allowed) and punt distance not directly given; `ydsnet` is drive net. Recommend computing net punt from play desc or accept `return_yards` as the needed input.
- `drive start/end time` — present as `drive_game_clock_start`/`drive_game_clock_end` (game clock) and `drive_real_start_time`; no wall-clock timestamps beyond those.

All other ASK fields present.

---

## Partition 2 — Participation (10 files)

| File | Rows | Season | sha256 (first 16) |
|---|---|---|---|
| pbp_participation_2016.parquet | 48,434 | 2016 | e876e5c312749782 |
| pbp_participation_2017.parquet | 47,998 | 2017 | e4b2ce19b0da7a7a |
| pbp_participation_2018.parquet | 47,875 | 2018 | 334f03887775e98f |
| pbp_participation_2019.parquet | 48,034 | 2019 | 5dd6c4ff1610cd4f |
| pbp_participation_2020.parquet | 48,513 | 2020 | dbabfbef30c7e165 |
| pbp_participation_2021.parquet | 50,714 | 2021 | bc16b14c7043e780 |
| pbp_participation_2022.parquet | 50,150 | 2022 | 5f8d349316bf68de |
| pbp_participation_2023.parquet | 46,168 | 2023 | b157736972248e6f |
| pbp_participation_2024.parquet | 45,919 | 2024 | 5e8cf1f6a11bb2be |
| pbp_participation_2025.parquet | 45,184 | 2025 | 3b26b9487267f011 |
Total rows ≈ 478,989. Columns: 26.

### ASK field presence (participation)
Columns: nflverse_game_id, old_game_id, play_id, possession_team, offense_formation, offense_personnel, defenders_in_box, defense_personnel, number_of_pass_rushers, players_on_play, offense_players, defense_players, n_offense, n_defense, ngs_air_yards, time_to_throw, was_pressure, route, defense_man_zone_type, defense_coverage_type, offense_names, defense_names, offense_positions, defense_positions, offense_numbers, defense_numbers.

PRESENT: offense_personnel, defense_personnel, offense_formation, defenders_in_box, number_of_pass_rushers, players on field by id (offense_players / defense_players, semicolon-delimited nflverse player ids in gsis format 00-00xxxxx).

MISSING: none of the ASK-named fields. Note: player ids are nflverse (gsis-format), not raw gsis; join to snap_counts/rosters via player id. `nflverse_game_id` joins to play_by_play `game_id` (verified same format).

---

## Partition 3 — Snap counts (10 files)

| File | Rows | Season | sha256 (first 16) |
|---|---|---|---|
| snap_counts_2016.parquet | 23,890 | 2016 | 02fbeb10dd1369d8 |
| snap_counts_2017.parquet | 23,862 | 2017 | 46805183af6d987b |
| snap_counts_2018.parquet | 23,877 | 2018 | db5ab19bb95e290c |
| snap_counts_2019.parquet | 23,862 | 2019 | ef9068cc9eebaf01 |
| snap_counts_2020.parquet | 24,999 | 2020 | 0dee77ab7595cbef |
| snap_counts_2021.parquet | 26,468 | 2021 | 1f6ab4c26a7d394c |
| snap_counts_2022.parquet | 26,381 | 2022 | 3cfde83eb6d859e3 |
| snap_counts_2023.parquet | 26,540 | 2023 | 97873cab365dfb39 |
| snap_counts_2024.parquet | 26,615 | 2024 | 9ec66a0c755939b3 |
| snap_counts_2025.parquet | 26,613 | 2025 | 47220218fecda7af |
Total rows ≈ 257,007. Columns: 16.

### ASK field presence (snap counts)
Columns: game_id, pfr_game_id, season, game_type, week, player, pfr_player_id, position, team, opponent, offense_snaps, offense_pct, defense_snaps, defense_pct, st_snaps, st_pct.

PRESENT (all ASK-named): position, offense/defense/special-teams snaps and pct (offense_snaps, offense_pct, defense_snaps, defense_pct, st_snaps, st_pct). Plus game_type (REG/POST), week, team, opponent, player, pfr_player_id.

MISSING: none of the ASK-named fields. Note: player id is `pfr_player_id` (Pro Football Reference id), not gsis; join to participation via name/team or pfr mapping. `game_type` distinguishes regular season vs playoffs (REG/POST).

---

## Partition 4 — Team-game summary (10 files) — NOTE: these are SEASON-level team stats, not per-game

| File | Rows | Season | sha256 (first 16) |
|---|---|---|---|
| stats_team_regpost_2016.parquet | 32 | 2016 | 7896179afd882bc1 |
| stats_team_regpost_2017.parquet | 32 | 2017 | 2f9011482988a1fb |
| stats_team_regpost_2018.parquet | 32 | 2018 | c155d4ee694b8788 |
| stats_team_regpost_2019.parquet | 32 | 2019 | cc8dd2fbf3bccd37 |
| stats_team_regpost_2020.parquet | 32 | 2020 | cef0a2067a542264 |
| stats_team_regpost_2021.parquet | 32 | 2021 | c377d683f774ed70 |
| stats_team_regpost_2022.parquet | 32 | 2022 | 3e26da6422eaa5e9 |
| stats_team_regpost_2023.parquet | 32 | 2023 | 6d3a4316b1af2e4c |
| stats_team_regpost_2024.parquet | 32 | 2024 | 42228b14fb9fb2f8 |
| stats_team_regpost_2025.parquet | 32 | 2025 | 4732e3113c1aa185 |
Total rows = 320 (32 teams × 10 seasons). Columns: 136.

### ASK field presence (team-game summary)
The provided `stats_team_regpost_*` is a SEASON-AGGREGATE team table (32 rows = 32 teams, one row per team per season), not a per-game table. It contains passing/rushing/receiving/defense/special-teams season totals and efficiency, penalties, etc. (136 columns).

PRESENT (season level): team, season, season_type, games, passing_yards, passing_tds, passing_interceptions, sacks_suffered, rushing_yards, rushing_tds, fumbles, penalties, penalty_yards, fg_*, punt (pt_*) , and many more.

MISSING vs ASK (per-game granularity):
- Per-game points, drives, plays, pass/rush attempts, yards, sacks, giveaways, takeaways, time of possession — NOT present as per-game rows; only season aggregates.
- League mean and SD of each — not computed.
- Penalties-OFF variant — not computed.
- Rules regime labels by season — not in data; must be annotated (2025 overtime rule change, kickoff rule changes).

RECOMMENDATION: derive the per-game team summary from Partition 1 (play_by_play) by grouping on game_id + posteam/defteam: points (from score), drives (count distinct drive), plays (count), pass/rush attempts, yards, sacks, giveaways (fumble_lost + interception), takeaways, time of possession (sum drive_time_of_possession). League mean/SD and penalties-OFF variant can then be computed. I can produce this derived table on request (estimated ~2,800+ team-games × 2 sides). Flagging now rather than silently substituting.

---

## Flags (fields not obtained per ASK instruction "Flag which fields you could not obtain")

1. Play-by-play: `onside` flag not a column (derive from own_kickoff_recovery); punt net yards not a column (use return_yards proxy).
2. Participation: player ids are nflverse (gsis-format), not raw gsis — joinable but note the id namespace.
3. Snap counts: player id is `pfr_player_id`, not gsis — cross-partition joins need a name/team or pfr↔gsis mapping.
4. Team-game summary: provided as season aggregates, not per-game; per-game table must be derived from play-by-play. League mean/SD, penalties-OFF variant, and rules-regime labels not present — to be computed/annotated.
5. No `roster`/`players` partition included in this download (gsis id → name/position/age); snap_counts covers position but not full bio. If the baseline needs player-level (OVR etc.) that is out of scope for this partition and lives in the product's own data.
6. Participation timestamps are stale (2026-02-10) vs pbp/snap_counts/stats (2026-11-13); re-download participation if freshness matters.

## Bottom line
All four requested partitions are present for 2016–2025 with REG+POST coverage; sha256 verified (40/40). Play-by-play and participation and snap_counts satisfy the ASK field list (with the onside/punt-net proxies and id-namespace notes above). The team-game summary is only available as season aggregates; the per-game table + league mean/SD + penalties-OFF variant + regime labels must be derived (offer: I can generate `team_game_summary_2016-2025.parquet` from play_by_play on request). Data is at `_agents/data/nflverse-2016-2025/` (gitignored, 225 MB) for the Owner's baseline work.

## Derived deliverable (produced this session)

Because the ASK requests a per-game team summary and the supplied partition is season-aggregate only, I derived it from Partition 1:

- `_agents/data/nflverse-2016-2025/team_game_summary_2016-2025.parquet` — 5,522 team-game rows (2016–2025, REG+POST), 21 columns: season, week, season_type, game_id, team, points, drives, plays, plays_no_pen, pass_att, rush_att, yards, sacks, giveaways, takeaways, touchdowns, complete_passes, air_yards, yac, penalties, time_of_possession_sec. sha256 `920041e7a4cb43a895a77bdf244e14aeb620ec6a2f91d48c3cac6d4e6ab091c6`.
- `_agents/data/nflverse-2016-2025/league_mean_sd_by_season_REG.csv` — league mean & SD per season (REG, per team-game) for the metrics above; the ~10% totals bar targets. sha256 `17bad13f518fda9ad4da19e204d190dfbcd91d117214e6e68ec2e9cd88ed6fe7`.

Method: group play_by_play by (game_id, posteam) for offense aggregates; drives counted distinct with drive_time_of_possession summed (parsed M:SS → seconds); giveaways = interceptions + fumble_lost by the possessing team; takeaways = same by the defending team; points = max cumulative score by game side. Penalties-OFF variant not yet produced — the `plays_no_pen` column counts plays with penalty==0; a fully penalties-removed re-aggregation is a follow-up if needed.


## Labels
VERIFIED: sha256sum -c sha256.txt → 40 OK, 0 FAILED (run 2026-11-14).
VERIFIED: distinct season_type = {REG, POST} in all 10 play_by_play files.
VERIFIED: row counts and column lists read via pyarrow from the copied files.
VERIFIED: field presence/absence checked against the ASK spec by column-name lookup.
INFERRED: onside derivation proxy; punt net proxy; per-game team summary derivability from play_by_play.
REPORTED: source timestamps and download provenance per the copied sha256.txt/timestamp files (Owner's download, 2026-11-13).
