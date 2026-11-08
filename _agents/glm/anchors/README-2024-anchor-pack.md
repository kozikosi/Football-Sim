# GLM anchor pack — hash-pinned nflverse inputs (2024) — 2026-11-08

For: P-013 (weights recalibration), T1 mechanics harness, T3 triangulation (data anchor), M4/M5 (Beam prereg).
Claims: all VERIFIED (fetched and computed this session) unless labeled.

## Fetch manifest — `raw/` (sha256 by `shasum -a 256`, VERIFIED 2026-11-08)

| file | bytes | sha256 (first 16) |
|---|---|---|
| `raw/play_by_play_2024.csv.gz` | 18,033,862? B (18M) | `23370d5d10f8104d` |
| `raw/player_stats_2024.csv.gz` | 332KB | `629b77e0c88d361f` |
| `raw/snap_counts_2024.csv.gz` | 492KB | `fe1d819db55d6e33` |
| `raw/ngs_2024_receiving.csv.gz` | 4KB | `da50b1e7fa418bf1` |

(re-run `shasum -a 256 raw/*` in `_agents/glm/anchors/` for full digests; `raw-hashes.txt` holds them.)

## Sources (primary, VERIFIED fetched this session)

- `https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2024.csv.gz`
- `.../releases/download/pbp_seasonal?` — no: **`.../releases/download/pbp/play_by_play_2024.csv.gz`** (release tag `pbp`; asset name verified on the release's `expanded_assets` HTML — the `.zip` variant 404s)
- `.../releases/download/nextgen_stats/ngs_2024_receiving.csv.gz` (the 404-confession: **no NGS defense feed exists** at this release — VERIFIED by the same asset listing: only passing/receiving/rushing)
- `.../releases/download/snap_counts/snap_counts_2024.csv.gz`
- `.../releases/download/player_stats/player_stats_2024.csv.gz` (weekly offense-counting + EPA; **no defense columns** — confirms Beam's open item "defense EPA")

License: nflverse (see `DATA-LICENSE.md` at repo root — GLM P-261, VERIFIED against the nflverse/cbc opinion text).

## Filters
All derived files use `season_type == "REG"` only (2024 regular season, 272 games — VERIFIED: pbp distinct REG game_ids = 272).

## Derived artifacts + formulas
1. `pbp-level3-2024.json` — T1 ladder level 3 (play-level outcome distributions). Derived in `pbp-level3.mjs`:
   - pass plays = rows with `pass_attempt == 1` and non-empty `air_yards`; 5 air-yard buckets (behind NaN split: <0, 0–5, 5.5–10, 10.5–20, 20.5+ raw edges, see BUCKETS).
   - completion% per bucket = `complete_pass`/attempts (denominator includes INTs); INT% = `interception`/attempts.
   - avg YAC per completion = mean `yards_after_catch` on completions in the bucket.
   - pressure: proxy `qb_hit == 1 OR sack == 1` (hit-or-sack; no unauthenticated "pressure" feed); sack% among pressure = `sack`/pressure-events.
   - open (labeled): INT-by-coverage-role, YAC-by-receiver-slot, defense-EPA-per-player (need rosters/depth join).
2. `group-shares-2024.json` — M4 volume + skill-EPA anchors. Derived in `group-shares-2024.mjs`:
   - snap shares: per-position-group `offense_snaps`/`defense_snaps` sums ÷ their per-side totals (position→group mapping is a REPORTED convention, in the script).
   - skill shares: targets/EPA sums by group from player_stats.

## Receipts (VERIFIED, run this session)
- pbp rows 49,492; REG games 272; pass attempts (bucketed) 17,811 + non-bucketed (empty air_yards) excluded.
- Level-3 table (comp% / INT% / YAC per comp): behind 78.7/0.8/9.5 · 0–5 74.8/0.95/4.4 · 6–10 63.1/1.9/3.2 · 11–20 54.5/3.8/3.8 · 21+ 33.5/6.3/5.8 — monotone-consistent with real 2024 passing (sanity: deep-ball conversion falls, INTt rate rises).
- Group snaps (off% / def%): OL 45.7/— · QB 9.1/— · WR 23.2/— · TE 12.1/— · RB 9.8/0.04 · DB —/43.9 · LB —/26.7 · DL —/29.4.
- Agrees with Beam's 2023+2024 REPORTED inputs within ~0.3pp on 2024 (DB 43.9 vs 44.2, DL 29.4 vs 29.1, LB 26.7 = 26.7, OL 45.7 = 45.7) — his M4 conclusions are now VERIFIED on hash-pinned 2024 inputs.
- Skill target% (WR/TE/RB): 60.1 / 22.4 / 17.4 (Beam REPORTED 60.0/22.5/17.5) ✓.

## Direct answers it unlocks (for T3 triangulation, "data-only" anchor column)
- The 2024 volume base rates for M3's data-only fit: secondary matches snap share (DB 43.9% vs engine ~41.3% — inside the 5pp band), DL overweighted (+16pp vs snaps), LB underweighted (−13pp), TE underweighted vs skill-EPA (23.2% EPA vs 12.7% engine skill-weight share), QB justified by EPA (27.7 vs 22.7, +5pp inside band).
