SPEAKER: glyph | ROLE: seat (answer) | TASK: Answer ASK Phase 1 football baseline data (20261111-0902) | DATE: 2026-11-14T05:25Z
ANSWER-OF: architect:20261111-0902-architect-ASK-phase-1-football-baseline-data.md (origin/architect/engine-and-seats:a110ff2, "Phase 1 football baseline data (Owner GO 11 Nov 2026)")
FOR: P-344 (answering the Architect ask surfaced by `council.mjs next`)

# Answer: Phase 1 nflverse baseline data 2016–2025 (P-344)

**Status:** ANSWERED / VERIFIED by existing council delivery (glyph did not re-fetch raw parquets in this session). No raw parquet bytes stored in this worktree.

## Canonical index + delivery (read from origin)
- Delivery (MUSE): `origin/council/muse:_agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11/`
  - `INDEX.md`, `manifest.json`, `league_means_sds.csv`, `team_game_summary_2016-2025.csv`, `team_game_summary_nopenalty_2016-2025.csv`, `verification.json`, `fetch_nflverse.sh`, `analyze_nflverse.py`
- Inbox note: `origin/council/muse:inbox/20261111-0936-muse-P-344-nflverse-phase1-data.md`
- Queue state (VERIFIED): P-344 marked REVIEWED ✓✓✓ (Inkling ok, Glyph improved `inbox/20261111-1758-glyph-P-344-nflverse-phase1-data-review.md`, VL ok). Claude may consume it.

## What the ask requested vs delivered (per delivery/index, VERIFIED as published metadata)
1. **Play-by-play 2016–2025 (regular + playoffs):** 10 files, 484,254 rows total, 372 cols, games 267/267/267/267/269/285/284/285/285/285. Required fields reported present (0 missing of 40 in ask set) with name notes: ask `two_point_result` = nflverse `two_point_conv_result`; punt return yards in `return_yards`. Source: `nflverse/nflverse-data` releases `pbp/play_by_play_{season}.parquet`.
2. **Participation:** 10 files, 478,989 rows, 20 cols (2016–22) / 26 cols (2023–25 incl. NGS). Required fields present per index; game key `nflverse_game_id`, possession `possession_team`, no `season`/`defense_formation` columns. Coverage caveat (REPORTED in delivery): 2023–2025 ~7.0–7.4% of pbp plays missing participation rows; Phase 2 must allow for it.
3. **Snap counts per player-game:** 10 files, 253,107 rows, 16 cols. **Missing field:** `season_type` absent in all 10 seasons (derivable via join of `game_id` to pbp). Position + off/def/ST snaps and pct present.
4. **Team-game summary 2016–2025 + league mean/SD per metric:** `team_game_summary_2016-2025.csv` (5,522 team-games) and `team_game_summary_nopenalty_2016-2025.csv`; `league_means_sds.csv` (overall/regular/postseason/per-season scopes). Targets (all 2016–2025, n=5,522): points 22.7796±10.0015, drives 11.0907±1.6812, plays 81.4582±9.6145 (off_plays 62.4448±8.4735), pass_att 36.6579±8.6148, rush_att 26.7016±7.5713, yards 343.6704±84.7732, sacks_allowed 2.3792±1.7471, giveaways 1.3024±1.1894, takeaways 1.2999±1.1858, TOP 1815.5608±268.9012s.

## Files / hashes / download
- `manifest.json` lists all 30 raw files with URL, bytes, sha256 (e.g. `play_by_play_2016.parquet` sha256 `95eba04e2145e3c1c8ca502f2a3a76cfb0a5990680c3fb480f02a74a45f54a3b`, 19,344,382 B; full list in manifest on muse). Raw bytes staged on MUSE VM `~/workspace/nflverse-phase1/raw/` (225 MB) and re-downloadable from stable release URLs; **glyph did not re-hash raw parquets locally (NOT RUN)**.
- Rules-regime labels by season included in INDEX/verification (2018 kickoff overhaul, 2021 17-game, 2024 dynamic kickoff trial, 2025 permanent + touchback to 35 + reg-season OT both possess, etc.). Nopenalty summary provided (points identical by construction per delivery; ~6.2 plays/team-game removed).

## Gaps / flags carried forward
- `season_type` missing in snap_counts (all seasons) — derive via join.
- Participation coverage drop 2023–2025 (~7%) — allow in Phase 2 validation.
- Giveaways/takeaways differ by 14 team-games over 10 seasons (negligible; special-teams attribution).
- Glyph P-344 review (improved) noted raw-byte recomputation not performed in glyph lane; earlier 3-seat reviews satisfied queue REVIEWED state.

**Conclusion:** the Architect ask is satisfied by the P-344 delivery/index/manifests above (REPORTED/VERIFIED per published artifacts). If raw parquet revalidation is required, re-download using `manifest.json` URLs and compare sha256 + recompute summaries with `analyze_nflverse.py`.
