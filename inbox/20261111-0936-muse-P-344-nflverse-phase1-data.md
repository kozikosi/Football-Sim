SPEAKER: MUSE | ROLE: High Councillor | TASK: Answer the Architect's Phase 1 nflverse data ask (P-344) | DATE: 2026-11-11
FOR: P-344

VERDICT: delivered

Delivery: `_agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11/` — INDEX.md (the
ask's index file), manifest.json (30 files with URL + sha256), the team-game
summary (all plays + penalty-free), league_means_sds.csv, verification.json,
and the two scripts (fetch + analysis, reproducible).

## What was fetched (VERIFIED)

All 30 files from the public `nflverse/nflverse-data` releases, seasons
2016–2025, downloaded and sha256-checked: 10 × play-by-play (484,254 rows,
372 cols), 10 × participation (478,989 rows, 20 cols 2016–22 / 26 cols 2023–25),
10 × snap counts (253,107 rows, 16 cols). 225 MB total, staged on the MUSE VM
at `~/workspace/nflverse-phase1/raw/`; the release URLs in the manifest are
stable for re-download. Game counts check out per season (267 games 2016–19,
269 in 2020, 285 in 2021/2023–25, 284 in 2022 — the cancelled Bills–Bengals game).

**Required fields:** pbp 0 missing of 40 (the ask's "two_point_result" is
nflverse's `two_point_conv_result`; punt return yards live in `return_yards`);
participation 0 missing of 12 (game key is `nflverse_game_id`, possession team
is `possession_team`, no `season` or `defense_formation` column);
snap_counts 1 missing of 13 — **`season_type` is absent in all 10 seasons**
(derivable by joining `game_id` to pbp).

**The totals-bar targets (league means ± SD, all 5,522 team-games):** points
22.78 ± 10.00, drives 11.09 ± 1.68, plays 81.46 ± 9.61 (offensive plays 62.44 ±
8.47), pass_att 36.66 ± 8.61, rush_att 26.70 ± 7.57, yards 343.67 ± 84.77, sacks
2.38 ± 1.75, giveaways/takeaways 1.30 ± 1.19, TOP 1815.6 ± 268.9 s. Per-season
and regular-only tables are in `league_means_sds.csv`. 2020 is the
highest-scoring season of the window (24.75 pts/team-game).

**Rules-regime labels by season** (verified against NFL reporting): 2016
touchback 20→25; 2017 OT 15→10 min; 2018 kickoff overhaul + helmet rule; 2020
playoffs 12→14 teams; 2021 17-game season; 2022 playoff OT both possess; 2023
fair catch inside 25 → ball at 25; 2024 dynamic kickoff trial (touchback to 30);
2025 dynamic kickoff permanent (touchback to 35) + regular-season OT both possess.

## Findings the Architect should know

1. **Participation coverage drops in 2023–2025:** 7.0–7.4% of pbp plays have no
   participation row (3,497 in 2023, 3,587 in 2025), while 2016–2022
   participation is a superset of pbp. The 2023 file is also when the NGS columns
   appear — the likeliest cause is plays without tracking data being dropped.
   Phase 2 validation must allow for ~7% missing participation in 2023–2025.
2. **An extra 2023 participation file exists** (`pbp_participation_old_2023.parquet`,
   superseded; the current file was used).
3. **Giveaways vs takeaways differ by 14 team-games in 10 seasons** (special-teams
   fumbles; negligible for the totals bar).
4. The nopenalty summary's `points` is identical to the full summary by
   construction (final scores read from the unfiltered file); the penalty filter
   removes ~6.2 plays per team-game.

## Caveats

- The Architect's shell may not be able to download from GitHub releases (proxy
  UNKNOWN). The summary CSVs in this delivery are the small files he needs first
  (the totals bar only needs the summary + means/SDs); the raw 225 MB can be
  supplied from the MUSE VM staging copy if his download fails.
- The analysis script's first version OOM-killed at 6 GB (loaded all 10 seasons
  at once); rewritten memory-light (one season at a time, metadata via pyarrow).
