SPEAKER: inkling | ROLE: answer to architect ask | TASK: Phase 1 football baseline data (2016–2025) | DATE: 2026-11-14T08:35Z
ANSWER-OF: 20261111-0902-architect-ASK-phase-1-football-baseline-data.md

# Phase 1 football baseline — nflverse 2016–2025, indexed, hashed, and a derived team-game table

**Delivery decision (one line):** the raw parquet set is **not committed to the repo** — it is ~226 MB and the ask allows an index + download statement. The **Owner must download it** from the release URLs below (one `curl` per file, ~226 MB total); every file below carries its sha256 so the download can be verified byte-for-byte. The derived team-game summary **is** committed: `_agents/inkling/deliveries/phase1-football-baseline-2026-11-14/` on `council/inkling @ 11b63867`.

Labels: VERIFIED = re-run this pass · REPORTED = source outside this session · INFERRED = reasoned, not run · UNKNOWN = not established.

## Receipts (four lines each)

**R1 — the download and the hashes.**
- directory: `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/nflverse-data-2016-2025/` (scratch; nothing large entered the repo)
- command: `curl -sL --retry 3 -o <file> https://github.com/nflverse/nflverse-data/releases/download/<tag>/<asset>` (40 files, background-parallel) ; then `sha256sum *.parquet > sha256.txt`
- ref/sha: bytes on disk; sha256 per file below; scratch dir is ephemeral and will vanish when the machine clears it — the hashes are the durable fact
- output neighborhood: `wc -c *.parquet | tail -1` → `235777533 total` (40 files incl. 1 schedules download); all 40 hashes computed, all downloads returned 200; timestamps of the four upstream releases: pbp `2026-11-13 12:11:39 EST`, pbp_participation `2026-02-10 13:54:06 EST`, snap_counts `2026-11-13 07:01:32 EST`, stats_team `2026-11-13 12:14:49 EST`

**R2 — the derived team-game summary.**
- directory: same scratch; output committed to `_agents/inkling/deliveries/phase1-football-baseline-2026-11-14/team_game_summary_2016_2025.csv` (`11b63867`)
- command: `python3` (pandas 3.1.0 / pyarrow 26.0.0) — per season: read pbp parquet, drop `season_type != REG|POST`, per (game, team): drives = unique `drive` count, TOC = Σ parsed `drive_time_of_possession` (`mm:ss`) over unique drives, plays = `pass_attempt + rush_attempt`, yards = `passing_yards + rushing_yards`, sacks = `sack`, giveaways = `interception + fumble_lost` (offense), takeaways = same on `defteam`, points = final `home_score`/`away_score` of the game
- ref/sha: committed at `11b63867`; `team_game_summary_2016_2025.csv` 578,633 B, 5,522 rows (+1 header); `league_mean_sd.json`, `team_game_summary_describe.csv` beside it; sha256 in `deliveries/.../sha256.txt`
- output neighborhood: `rows 5522 games 2761`; REG+POST games per year: 267/267/267/267/269/285/284/285/285/285 (2022 = 271 REG + 13 POST — both pbp **and** nflverse schedules agree on 271; an earlier "missing game" suspicion is ruled out); sanity identity `giveaways == takeaways` holds exactly across the full set (mean 1.302 each way) — expected, since every giveaway is a takeaway for the opponent

**R3 — required-field presence in the pbp extract.**
- directory: scratch
- command: `pd.read_parquet(f'play_by_play_{y}.parquet')`; `missing = [c for c in required_pbp if c not in df.columns]` → `{}` for all ten years (372 columns, identical schema 2016–2025)
- output neighborhood: every ASK item-(1) field is present; exceptions and partials listed in "Field gaps" below; no column required by the ask is absent outright

**R4 — field presence in participation and snap counts.**
- command: `pd.read_parquet(...)` schema + `.notna().mean()` on the key columns, per year (output above in session log; key numbers in "Field gaps")
- output neighborhood: snap counts 2016–2025 all real files (2012 is a 154 B stub — out of scope); participation 2023–2025 near-complete (personnel/box/rushers ≈ 1.0), 2016–2022 sparse (box 0.737, formation 0.723, rushers 0.419 in 2016)

**R5 — 2022 cross-check.**
- command: `curl …/schedules/games.parquet` (523,832 B, sha256 `6fce4badec51a8fbe53d722ffed3e19a29999dbd8f494eda5b01c89f866d497c`, 7,548 rows) then `s[(s.season==2022)&(s.game_type=='REG')]` vs pbp unique REG game_ids
- output neighborhood: `schedules REG 2022: 271`; `in schedules not in pbp: set()` — the extracts agree; 2022 having 271 REG games is a fact of the data, not a hole

## The files — owner downloads (URLs + sha256 + rows + bytes)

Pattern: `https://github.com/nflverse/nflverse-data/releases/download/<tag>/<name>`

| File (tag) | rows × cols | bytes | sha256 |
|---|---|---|---|
| play_by_play_2016.parquet (pbp) | 47651 × 372 | 19,344,382 | 95eba04e2145e3c1c8ca502f2a3a76cfb0a5990680c3fb480f02a74a45f54a3b |
| play_by_play_2017.parquet | 47245 × 372 | 19,050,401 | 84eacd963c1fdd45965f6222c62e9329a7f3412f029d92c1ac5e34a1bb4d3710 |
| play_by_play_2018.parquet | 47109 × 372 | 19,072,097 | 2e6f2dce7c7ebd46e985cabe0c17eb72b39a77f98cb4478409294f50b5820150 |
| play_by_play_2019.parquet | 47260 × 372 | 19,119,729 | 60c3067017db2d28a78f66a79b657268be8578d9a5288e6a827efdcd7fe42540 |
| play_by_play_2020.parquet | 47705 × 372 | 19,286,459 | 8889f5d8782b5c5dce3c3644acdc0322b228a7e9cb13fa36cbac250e260e9f60 |
| play_by_play_2021.parquet | 49922 × 372 | 20,249,925 | 333ad34378e5339d5172717cc83378e908daf02c8699416ab3e17c2ec10f78d8 |
| play_by_play_2022.parquet | 49434 × 372 | 20,426,548 | 931121d8897779d7944e2a293e92ed8799c8e5cceef84096ac42339003fedc09 |
| play_by_play_2023.parquet | 49665 × 372 | 20,534,088 | bd3484731408def6b0ec93225bba2bd7b2c65769ca707a2b9444d891abdc6776 |
| play_by_play_2024.parquet | 49492 × 372 | 20,597,560 | 3fd2896bc0b911b615142d2f1fabae54a4bbba5ab7b73b28187b118ef8af6a3b |
| play_by_play_2025.parquet | 48771 × 372 | 20,337,029 | c6ecedd6d678cc37ed316b23ef84ee1ec6abb69c514bb11868a7ebd5a367df29 |
| pbp_participation_2016.parquet (pbp_participation) | 48434 × 20 | 3,076,917 | e876e5c3127497825baa18c5b49ed953cc685f701819a0d555f9e318b9295087 |
| pbp_participation_2017.parquet | 47998 × 20 | 2,943,355 | e4b2ce19b0da7a7aa6b9e764b00de831003e622e2719c371665ed32bf2f4f3f8 |
| pbp_participation_2018.parquet | 47875 × 20 | 2,978,916 | 334f03887775e98f818ab7f5b22c7973f050cae7c3594e5d4b6f5c9c9890969d |
| pbp_participation_2019.parquet | 48034 × 20 | 2,992,048 | 5dd6c4ff1610cd4f100ec6b29dfbea521099eda06fd199902477edf61f334bc0 |
| pbp_participation_2020.parquet | 48513 × 20 | 2,849,568 | dbabfbef30c7e1657d566cad44dd1a9db434ae6aab1321b38b6a87f0fd963dba |
| pbp_participation_2021.parquet | 50714 × 20 | 2,949,474 | bc16b14c7043e780f995f914331e2f7ebd6661d024e61a2c892d560af04d9af1 |
| pbp_participation_2022.parquet | 50150 × 20 | 2,941,018 | 5f8d349316bf68de487ee0eb926706e65f5a8e37078c1faa37cb07cda2bf9e5e |
| pbp_participation_2023.parquet | 46168 × 26 | 4,700,238 | b157736972248e6f71e0c5ad6c1010b71375a500a63944dc4956c65de263e5a6 |
| pbp_participation_2024.parquet | 45919 × 26 | 4,644,767 | 5e8cf1f6a11bb2be573c3db1533c28a5658907302d1ad45ca769a4ca35890d7c |
| pbp_participation_2025.parquet | 45184 × 26 | 4,741,443 | 3b26b9487267f011fdbafbce133800ce964c963fdb8b27725abf65663cc46e0f |
| snap_counts_2016.parquet (snap_counts) | 23890 × 16 | 212,500 | 02fbeb10dd1369d858ac460ef67b0a2e9a4da689e24149d81dec57863f975198 |
| snap_counts_2017.parquet | 23862 × 16 | 212,468 | 46805183af6d987bac7292a84d787343bd10d5323fba96e9ce624cfe9c085dc5 |
| snap_counts_2018.parquet | 23877 × 16 | 211,973 | db5ab19bb95e290ce38cd73c40795b15ecf9b01cbc90b6f339f8010c51c1d506 |
| snap_counts_2019.parquet | 23862 × 16 | 213,089 | ef9068cc9eebaf01fa78c783a29cc1658a32b35fd7226e98146aa178e13aedc2 |
| snap_counts_2020.parquet | 24999 × 16 | 233,598 | 0dee77ab7595cbef05ce6239f04e7a97c56955e5a9b376dcccf58324f4dd8abc |
| snap_counts_2021.parquet | 26468 × 16 | 240,680 | 1f6ab4c26a7d394c857652234dd39acd4088ffd92cfcf3f91ce03f4dc9fcaa2a |
| snap_counts_2022.parquet | 26381 × 16 | 237,678 | 3cfde83eb6d859e3477aba4238fa2fb8e0592a5fc5ab8b26128fce085d4b7fea |
| snap_counts_2023.parquet | 26540 × 16 | 237,882 | 97873cab365dfb39286bc1de3ac772fa4b51f09cce52ae5f8317e006cc007f62 |
| snap_counts_2024.parquet | 26615 × 16 | 240,862 | 9ec66a0c755939b329d4eba3f90e716bb874b5a6544f325ba220f003991ff99f |
| snap_counts_2025.parquet | 26613 × 16 | 242,046 | 47220218fecda7af7ee5b0272a8ecce7c1bfb1f4e1f0a2c8c90047571728ce20 |
| stats_team_regpost_2016.parquet (stats_team) | 32 × 136 | 65,748 | 7896179afd882bc1af20b04d26cc7e2ed344500b3b2b4ab665312f831b7e4f7f |
| stats_team_regpost_2017.parquet | 32 × 136 | 65,832 | 2f9011482988a1fb074d3967b1c42abddc4a025b2624030b4473461089550ca3 |
| stats_team_regpost_2018.parquet | 32 × 136 | 65,642 | c155d4ee694b8788a189843beeea89388d62693874a7d25d00c5bd12589e2df3 |
| stats_team_regpost_2019.parquet | 32 × 136 | 65,745 | cc8dd2fbf3bccd37be5c7131a81c30405b990727f40644971d7e26e0690720b6 |
| stats_team_regpost_2020.parquet | 32 × 136 | 65,721 | cef0a2067a54226475bf9e55b8e1d10aeb0bb2526b11ebad23205d448a692694 |
| stats_team_regpost_2021.parquet | 32 × 136 | 65,968 | c377d683f774ed707ef7d61b894829e850827cf649e32673c88eb68104a72da7 |
| stats_team_regpost_2022.parquet | 32 × 136 | 66,041 | 3e26da6422eaa5e91d50c30826531cdc4bccd6b9065d10c7b3407ec8ce05186f |
| stats_team_regpost_2023.parquet | 32 × 136 | 66,033 | 6d3a4316b1af2e4c67f529d059811273527f8f8755c6a4f72a25f7f5c36af7f9 |
| stats_team_regpost_2024.parquet | 32 × 136 | 66,244 | 42228b14fb9fb2f855ecb4eb73102bcd4960059d83aa8675871cfb7c75d4a567 |
| stats_team_regpost_2025.parquet | 32 × 136 | 65,821 | 4732e3113c1aa825ffc4fc9cffc4a74aa4ce219215617489defbb86535d74ab2 |

Upstream release timestamps (from each release's `timestamp.txt`, fetched this pass): pbp 2026-11-13 12:11:39 EST · pbp_participation 2026-02-10 13:54:06 EST · snap_counts 2026-11-13 07:01:32 EST · stats_team 2026-11-13 12:14:49 EST. Participation lags the others — it is the version as of 2026-02-10.

**Coverage window:** all files 2016–2025, regular season + postseason. pbp has `season_type` ∈ {REG, POST} only (no preseason rows). 2026 exists upstream (pbp 2026, partial) and is deliberately excluded.

## Item (1) — play-by-play field status

All ASK-listed pbp fields are present in all ten years (VERIFIED, R3). Exceptions, partials, and notes:

- **punt net yards: PARTIAL.** No `punt_net_yards` column exists. Closest is `ydsnet` (present, float); using it for punt plays as net punt yardage is INFERRED from nflverse conventions, not documented in the schema — treat as INFERRED until checked against a known punt.
- **punt return yards: present.** `return_yards` sits on the punt play row (spot-checked on 2025 sample rows, values plausible: 7/0/…).
- **kickoff onside flag: MISSING as a flag.** `own_kickoff_recovery` (count 5.0 in 2025) marks the kicking team recovering its own kickoff — the closest thing to an onside indicator. There is no boolean "onside" column. Label: PARTIAL, usable with care.
- **drive start/end time: present** as `drive_game_clock_start` / `drive_game_clock_end`. **Drive end reason: present** as `fixed_drive_result` — observed values (2025): `End of half · Field goal · Missed field goal · Opp touchdown · Punt · Safety · Touchdown · Turnover · Turnover on downs`.
- **drive id: present** (`drive`, restarts at 1 per game — usable as unique `(game_id, drive)`).
- **play_id** present for joins to participation (`nflverse_game_id` + `play_id`).
- **penalty plays: present** — `penalty` (flag), `penalty_type`, `penalty_yards`, `penalty_team`, `penalty_player_id/name`. Needed for the ASK's penalty-removed cut.
- **field goal:** `field_goal_attempt`, `field_goal_result` (`made`/`missed`/`blocked`), `kick_distance` ✓. **extra_point** equivalents also present; **two-point:** `two_point_attempt`, `two_point_conv_result`, plus `defensive_two_point_*` ✓.
- **no_huddle / shotgun** ✓ · **passer/rusher/receiver ids:** `passer_player_id`, `rusher_player_id`, `receiver_player_id` ✓ · **personnel/box/rushers** are in the participation file, not pbp (see below).
- **game context:** `game_seconds_remaining`, `qtr`, `down`, `ydstogo`, `yardline_100`, `posteam/defteam`, `score_differential`, `posteam_timeouts_remaining`, `defteam_timeouts_remaining` ✓ · **regime labels:** `season`, `week`, `season_type`, `game_date` ✓.

## Item (2) — participation file

- 2016–2022 (20 cols) vs 2023–2025 (26 cols; adds `offense_names/defense_names/offense_positions/defense_positions/offense_numbers/defense_numbers`).
- `players_on_play` (100% non-null everywhere) carries **gsis ids**, semicolon-delimited — sample 2016: `00-0032933;00-0034623;…` (VERIFIED, R4). `offense_players`/`defense_players` split the same set.
- **Coverage is the real story:** 2016 — offense_formation 0.723, defense_personnel 0.759, defenders_in_box 0.737, number_of_pass_rushers 0.419 (non-null rates). 2023–2025 — defense_personnel/defenders_in_box/number_of_pass_rushers ≈ 0.97–1.00; offense_formation still ≈ 0.80. INFERRED cause: source break between the older charting feed and the newer NGS-based feed at 2023; do not pool 2016–2022 with 2023–2025 without a coverage flag.
- participation rows vs pbp rows: participation 2016 = 48,434 vs pbp 47,651 (participation higher); 2023 = 46,168 vs pbp 49,665 (participation lower). The row-space difference cause is UNKNOWN — probably play-eligibility filtering differences between feeds; flag for whoever builds the join.

## Item (3) — snap counts

- `snap_counts_2016…2025`, one row per player-game-position, 16 cols: `game_id, season, game_type, week, player, position, team, opponent, offense_snaps/pct, defense_snaps/pct, st_snaps/pct` ✓ (position present; offense/defense/ST snaps and pct present).
- game_type observed: `REG, WC, DIV, CON, SB` — postseason covered ✓. Rows/season ≈ 23,862–26,615.
- 2013–2026 exist upstream; 2012 is a 154-byte stub (out of scope; listed here only so nobody grabs it by accident).

## Item (4) — team-game summary (derived; committed)

`_agents/inkling/deliveries/phase1-football-baseline-2026-11-14/team_game_summary_2016_2025.csv` on `council/inkling @ 11b63867` — 5,522 rows, one per team-game, REG+POST, 2016–2025. Columns: `season, season_type, week, game_id, game_date, team, opponent, home, points, opp_points, result, drives, plays, pass_attempts, rush_attempts, yards, sacks, giveaways, takeaways, toc_seconds` + `_nopen` twins (points/TOC unchanged in the penalty-removed cut; count metrics recomputed excluding `penalty==1` plays).

Definitions (exactly what was computed):
- **points/opp_points** = final score from the game (`home_score`/`away_score` max per game) — exact, not summed from scoring plays.
- **drives** = unique `drive` per (game, posteam). **TOC** = Σ `drive_time_of_possession` (parsed `mm:ss`→seconds) over those unique drives. (Alternative clock-diff method not run; the two should agree within a drive or two of stoppage time — UNKNOWN which is off by how much.)
- **plays** = `pass_attempt + rush_attempt` (sacks ride inside `pass_attempt` in nflverse). **yards** = `passing_yards + rushing_yards` (sack yardage is negative `passing_yards` in nflverse).
- **giveaways** = `interception + fumble_lost` by the offense; **takeaways** = the mirrored defensive count. Identity giveaways≡takeaways verified across the set (both means 1.302).
- **sacks** = offensive sacks taken.

**League mean ± SD (ddof=1), all REG+POST team-games, n=5,522** (REG-only and POST-only in `league_mean_sd.json`; POST n=244):

| metric | mean | SD |
|---|---|---|
| points | 22.842 | 9.974 |
| drives | 11.326 | 1.750 |
| plays | 63.359 | 8.512 |
| pass_attempts | 36.658 | 8.615 |
| rush_attempts | 26.702 | 7.571 |
| yards | 358.377 | 80.862 |
| sacks | 2.379 | 1.747 |
| giveaways | 1.302 | 1.189 |
| takeaways | 1.302 | 1.189 |
| toc_seconds | 1,815.6 (≈30:16) | 268.9 (≈4:29) |

Penalty-plays-removed (count metrics): plays 62.391±8.421 · pass 36.146±8.529 · rush 26.245±7.477 · yards 351.770±79.893 · sacks 2.361±1.740 · giveaways 1.255±1.165 · takeaways 1.255±1.165.

REG-only: points 22.791±9.968 · drives 11.337±1.742 · plays 63.307±8.474 · yards 357.853±80.891 · TOC 1,815.5±268.7 (n=5,278). POST-only: points 23.951±10.067 · plays 64.496±9.255 · yards 369.709±79.549 · TOC 1,818.9±273.2 (n=244).

These are the raw per-team-game targets the Owner's ~10%-totals bar would be measured against; nothing here is tuned or smoothed.

## Regime labels (season → rule regime)

- **2016–2020:** 16-game regular season; 12-team postseason (11 games) 2016–2019; 2020 = 14-team postseason expanded (13 games, VERIFIED from data: POST games 13 from 2020 on; REG games 256 in 2020).
- **2021+:** 17-game regular season (REG games 271–272; 2021 = 272, 2022 = 271 in both schedules and pbp — see R5).
- **2022+ (postseason):** overtime — both teams get a possession (postseason OT aligned since 2022 season). REPORTED (NFL Operations rules page).
- **2024:** dynamic kickoff introduced (one-year trial). REPORTED.
- **2025:** dynamic kickoff made permanent; kickoff touchback moved from the 30 to the **35-yard line** (April 2025 annual meeting); regular-season OT aligned with the postseason — both teams get a possession even after a first-drive TD; 10-minute period unchanged. REPORTED (operations.nfl.com 2025 rules changes; NFL.com / Rams.com / ESPN coverage of the April 2025 votes).
- 2017: regular-season OT shortened to 10 minutes (context, pre-2025). REPORTED.
- Label every downstream model/calibration artifact with these season bands; do not pool pre-2024 kickoff data into kickoff-value estimates.

## What could not be obtained / UNKNOWN bins

1. **Onside-kick boolean** — does not exist in any of these files; `own_kickoff_recovery` is the nearest proxy (PARTIAL).
2. **Punt net-yard semantics of `ydsnet`** — present but punt-semantics not documented in-schema; INFERRED, not VERIFIED.
3. **`stats_team_regpost_*.parquet` internal split** — 32 rows/file but split as 20×`REG` + 12×`REG+POST` (2016–2019) and 18 + 14 (2020–2025); the row-selection rule is UNKNOWN from the bytes alone. Not used; the summary above was derived from pbp instead. (REPORTED: nflverse docs describe it as per-team season totals; the REG+POST naming and the subset split are unverified.)
4. **Participation row-space vs pbp** — join key exists (`game_id`+`play_id` → `nflverse_game_id`+`play_id`) but the two files' play sets differ in size by year and the reason is UNKNOWN; the join may drop or fan out rows — whoever builds it must check.
5. **2016–2022 participation sparsity** — formation/box/rushers incomplete pre-2023 (see R4); treat as partial or exclude from formation-based features.
6. **A2 (Node 22)** — not applicable here; nothing in this answer ran under Node 22. (Unrelated to the standing BENCH-1 UNKNOWN, listed so it isn't confused with it.)
7. **Analysis-time application** (bootstrap-CI / tie rules for any future baseline comparisons) — no such procedure was run; UNKNOWN by design.
8. **files must be downloaded by the Owner** — the 40 raw parquet files are NOT in the repo. Verify each against the sha256 above after download; if any hash differs, the file is not what this index measured and every row/col count above is void for that file.

— inkling (answering the top line of `council.mjs next`, 2026-11-14T08:35Z; votes not offered; no product file, governance file or engine touched)
