#!/usr/bin/env python3
"""Verify nflverse Phase 1 files (P-344) and compute the team-game summary.

Memory-light: metadata via pyarrow (no data load) for row counts / columns;
pbp read one season at a time, only the columns the summary needs.
Reads raw/*.parquet (pbp, participation, snap counts, 2016-2025), checks row
counts / seasons / required fields, and builds:
  team_game_summary_2016-2025.csv          (all plays)
  team_game_summary_nopenalty_2016-2025.csv (penalty plays removed)
  league_means_sds.csv                      (overall + per-season + reg/post)
  verification.json                         (row counts, columns, missing fields)
Definitions (documented in INDEX.md):
  points     = final total_home/away score of the game (from last play row)
  drives     = distinct drive ids with posteam = team
  plays      = rows with play_type not null and posteam = team
  pass_att   = pass_attempt == 1 ; rush_att = rush_attempt == 1
  yards      = sum(yards_gained) over pass+run plays (sacks included, negative)
  pass_yards / rush_yards = split of yards by play_type
  sacks_allowed = sack == 1 and posteam = team ; sacks_made = sack == 1, defteam
  giveaways  = interception + fumble_lost (posteam) ; takeaways = same (defteam)
  top_sec    = sum of drive_time_of_possession over the team's drives
  nopenalty  = same, after dropping every row with penalty == 1
"""
import json, re, sys
from pathlib import Path
import pandas as pd
import pyarrow.parquet as pq

RAW = Path(sys.argv[1] if len(sys.argv) > 1 else "raw")
OUT = Path(sys.argv[2] if len(sys.argv) > 2 else "out")
OUT.mkdir(parents=True, exist_ok=True)

PBP_REQ = """game_id season week season_type qtr game_seconds_remaining down ydstogo
yardline_100 posteam defteam score_differential posteam_timeouts_remaining
defteam_timeouts_remaining play_type yards_gained air_yards yards_after_catch
pass_location run_location complete_pass incomplete_pass interception sack
qb_scramble fumble fumble_lost touchdown field_goal_attempt field_goal_result
kick_distance two_point_attempt two_point_conv_result penalty drive no_huddle shotgun
passer_player_id rusher_player_id receiver_player_id""".split()
# NOTE: the ask lists "two_point_result"; nflverse names it two_point_conv_result.
PART_REQ = """nflverse_game_id old_game_id play_id possession_team offense_personnel
defense_personnel offense_formation defenders_in_box number_of_pass_rushers
offense_players defense_players players_on_play""".split()
SNAP_REQ = """game_id season week season_type team player position
offense_snaps offense_pct defense_snaps defense_pct st_snaps st_pct""".split()
PBP_SUMMARY_COLS = ["game_id", "play_id", "season", "week", "season_type",
    "home_team", "away_team", "posteam", "defteam", "play_type", "yards_gained",
    "pass_attempt", "complete_pass", "rush_attempt", "sack", "interception",
    "fumble_lost", "drive", "drive_time_of_possession", "penalty",
    "total_home_score", "total_away_score"]

verif = {"files": {}, "missing_fields": {}, "notes": []}

def meta(path):
    pf = pq.ParquetFile(path)
    return pf.metadata.num_rows, pf.schema_arrow.names

# --- metadata pass (no data loaded) ------------------------------------------
cols_by_file = {}
for prefix in ["play_by_play", "pbp_participation", "snap_counts"]:
    for y in range(2016, 2026):
        f = RAW / f"{prefix}_{y}.parquet"
        rows, cols = meta(f)
        cols_by_file[f.name] = cols
        # seasons + games from cheap single-column reads; participation files
        # carry nflverse_game_id (no season / game_id columns)
        cols_set = set(cols)
        gid_col = "game_id" if "game_id" in cols_set else "nflverse_game_id"
        gids = pq.read_table(f, columns=[gid_col]).column(gid_col).to_pylist()
        if "season" in cols_set:
            seasons = sorted(set(pq.read_table(f, columns=["season"]).column("season").to_pylist()))
        else:
            seasons = sorted(set(int(str(g)[:4]) for g in gids if g))
        verif["files"][f.name] = {"rows": rows, "columns": len(cols),
            "seasons_in_file": seasons, "games": len(set(gids)),
            "game_id_column": gid_col}
        print(f"{f.name}: {rows:,} rows, {len(cols)} cols, seasons={seasons}, games={len(set(gids))} (id col {gid_col})")

def check(cols, req, name):
    missing = [c for c in req if c not in set(cols)]
    verif["missing_fields"][name] = missing
    print(f"{name}: missing {len(missing)} of {len(req)} required: {missing}")

check(cols_by_file["play_by_play_2025.parquet"], PBP_REQ, "pbp_2025")
check(cols_by_file["pbp_participation_2025.parquet"], PART_REQ, "participation_2025")
check(cols_by_file["snap_counts_2025.parquet"], SNAP_REQ, "snap_counts_2025")
# field presence across all seasons (union/intersection)
for kind, prefix, req in [("pbp", "play_by_play", PBP_REQ),
                          ("participation", "pbp_participation", PART_REQ),
                          ("snap_counts", "snap_counts", SNAP_REQ)]:
    per_year_missing = {}
    for y in range(2016, 2026):
        cols = set(cols_by_file[f"{prefix}_{y}.parquet"])
        m = [c for c in req if c not in cols]
        if m:
            per_year_missing[y] = m
    verif["missing_fields"][f"{kind}_by_year"] = per_year_missing
    print(f"{kind} per-year missing: {per_year_missing if per_year_missing else 'none'}")
# optional columns of interest (2025 file)
pbp25 = set(cols_by_file["play_by_play_2025.parquet"])
part25 = set(cols_by_file["pbp_participation_2025.parquet"])
for col in ["punt_attempt", "kickoff_attempt", "kickoff_returner_player_id",
            "drive_game_clock_start", "drive_game_clock_end",
            "drive_time_of_possession", "drive_play_count",
            "drive_start_yard_line", "drive_end_transition",
            "penalty_team", "penalty_yards", "old_game_id",
            "total_home_score", "total_away_score", "desc", "play_id"]:
    print(f"pbp2025 col {col}: {col in pbp25}")
    verif.setdefault("pbp_optional_cols_2025", {})[col] = col in pbp25
for col in ["offense_players", "defense_players", "offense_formation", "defense_formation"]:
    print(f"part2025 col {col}: {col in part25}")
    verif.setdefault("part_optional_cols_2025", {})[col] = col in part25

# --- team-game summary, one season at a time ---------------------------------
def top_seconds(s):
    if s is None or (isinstance(s, float) and s != s):
        return float("nan")
    m = re.match(r"^\s*(\d+):(\d{1,2})\s*$", str(s))
    return int(m.group(1)) * 60 + int(m.group(2)) if m else float("nan")

def build_summary(df, label, final=None):
    plays = df[df["play_type"].notna()].copy()
    if final is None:
        last = df.sort_values(["game_id", "play_id"]).groupby("game_id").tail(1)
        final = {}
        for _, r in last.iterrows():
            final[r["game_id"]] = (r["total_home_score"], r["total_away_score"],
                                    r["home_team"], r["away_team"], r["season"], r["week"], r["season_type"])
    drv = plays.drop_duplicates(["game_id", "drive", "posteam"])
    drv = drv.assign(top_s=drv["drive_time_of_possession"].map(top_seconds)) \
        if "drive_time_of_possession" in drv else drv.assign(top_s=float("nan"))
    top_map = drv.groupby(["game_id", "posteam"])["top_s"].sum(min_count=1).to_dict()
    agg = plays.groupby(["game_id", "posteam"]).agg(
        plays=("play_type", "size"),
        pass_att=("pass_attempt", "sum"),
        completions=("complete_pass", "sum"),
        rush_att=("rush_attempt", "sum"),
        sacks_allowed=("sack", "sum"),
        giveaways_int=("interception", "sum"),
        fumbles_lost=("fumble_lost", "sum"),
        drives=("drive", "nunique"),
    ).reset_index()
    off = plays[plays["play_type"].isin(["pass", "run"])]
    off_n = off.groupby(["game_id", "posteam"]).size().rename("off_plays").reset_index()
    y = off.groupby(["game_id", "posteam"])["yards_gained"].sum().rename("yards").reset_index()
    py = off[off["play_type"] == "pass"].groupby(["game_id", "posteam"])["yards_gained"].sum().rename("pass_yards").reset_index()
    ry = off[off["play_type"] == "run"].groupby(["game_id", "posteam"])["yards_gained"].sum().rename("rush_yards").reset_index()
    tk = plays[(plays["interception"].fillna(0).eq(1)) | (plays["fumble_lost"].fillna(0).eq(1))]
    tk = tk.groupby(["game_id", "defteam"]).size().rename("takeaways").reset_index().rename(columns={"defteam": "posteam"})
    sk = plays[plays["sack"].fillna(0).eq(1)].groupby(["game_id", "defteam"]).size().rename("sacks_made").reset_index().rename(columns={"defteam": "posteam"})
    out = agg.merge(off_n, on=["game_id", "posteam"], how="left")
    out = out.merge(y, on=["game_id", "posteam"], how="left")
    out = out.merge(py, on=["game_id", "posteam"], how="left")
    out = out.merge(ry, on=["game_id", "posteam"], how="left")
    out = out.merge(tk, on=["game_id", "posteam"], how="left")
    out = out.merge(sk, on=["game_id", "posteam"], how="left")
    out["giveaways"] = out["giveaways_int"].fillna(0) + out["fumbles_lost"].fillna(0)
    out["top_sec"] = [top_map.get((g, t), float("nan")) for g, t in zip(out["game_id"], out["posteam"])]
    meta_rows = []
    for _, r in out.iterrows():
        h, a, ht, at, s, w, st = final[r["game_id"]]
        pts = h if r["posteam"] == ht else a
        opp = at if r["posteam"] == ht else ht
        meta_rows.append((s, w, st, ht, at, opp, pts))
    out[["season", "week", "season_type", "home_team", "away_team", "opp", "points"]] = meta_rows
    out = out.rename(columns={"posteam": "team"})
    cols = ["season", "week", "season_type", "game_id", "team", "opp", "home_team",
            "points", "drives", "plays", "off_plays", "pass_att", "completions", "rush_att",
            "yards", "pass_yards", "rush_yards", "sacks_allowed", "sacks_made",
            "giveaways", "takeaways", "top_sec"]
    out = out[cols].fillna({"off_plays": 0, "yards": 0, "pass_yards": 0, "rush_yards": 0, "takeaways": 0, "sacks_made": 0})
    print(f"{label}: {len(out)} team-games; points mean {out['points'].mean():.2f}, plays mean {out['plays'].mean():.1f}, top_sec NaN {out['top_sec'].isna().sum()}")
    return out

full_parts, nopen_parts, games_per_season = [], [], {}
for y in range(2016, 2026):
    df = pq.read_table(RAW / f"play_by_play_{y}.parquet", columns=PBP_SUMMARY_COLS).to_pandas()
    print(f"season {y}: {len(df):,} rows loaded")
    games_per_season[y] = {st: int(df[df['season_type'] == st]['game_id'].nunique())
                           for st in df['season_type'].dropna().unique()}
    # final scores from the UNFILTERED season (a game's final score is a fact
    # about the game; the penalty filter must not move it)
    last = df.sort_values(["game_id", "play_id"]).groupby("game_id").tail(1)
    final = {r["game_id"]: (r["total_home_score"], r["total_away_score"],
             r["home_team"], r["away_team"], r["season"], r["week"], r["season_type"])
             for _, r in last.iterrows()}
    full_parts.append(build_summary(df, f"full {y}", final))
    nopen_parts.append(build_summary(df[df["penalty"].fillna(0).eq(0)], f"nopenalty {y}", final))
    del df

full = pd.concat(full_parts, ignore_index=True)
nopen = pd.concat(nopen_parts, ignore_index=True)
full.to_csv(OUT / "team_game_summary_2016-2025.csv", index=False)
nopen.to_csv(OUT / "team_game_summary_nopenalty_2016-2025.csv", index=False)

metrics = ["points", "drives", "plays", "off_plays", "pass_att", "completions", "rush_att",
           "yards", "pass_yards", "rush_yards", "sacks_allowed", "sacks_made",
           "giveaways", "takeaways", "top_sec"]
stat_rows = []
scopes = [("all_2016_2025", full),
          ("regular_2016_2025", full[full["season_type"] == "REG"]),
          ("postseason_2016_2025", full[full["season_type"] == "POST"])] + \
         [(f"season_{y}", full[full["season"] == y]) for y in range(2016, 2026)] + \
         [(f"season_{y}_REG", full[(full["season"] == y) & (full["season_type"] == "REG")]) for y in range(2016, 2026)]
for scope, d in scopes:
    for m in metrics:
        stat_rows.append({"scope": scope, "metric": m, "n_team_games": int(d[m].notna().sum()),
                          "mean": round(float(d[m].mean()), 4), "sd": round(float(d[m].std()), 4),
                          "min": float(d[m].min()), "max": float(d[m].max())})
pd.DataFrame(stat_rows).to_csv(OUT / "league_means_sds.csv", index=False)
print("league_means_sds rows:", len(stat_rows))

verif["games_per_season"] = {str(k): v for k, v in games_per_season.items()}
verif["totals"] = {"pbp_rows": sum(v["rows"] for k, v in verif["files"].items() if k.startswith("play_by_play")),
                   "part_rows": sum(v["rows"] for k, v in verif["files"].items() if k.startswith("pbp_participation")),
                   "snap_rows": sum(v["rows"] for k, v in verif["files"].items() if k.startswith("snap_counts")),
                   "team_games_full": int(len(full)), "team_games_nopenalty": int(len(nopen))}
json.dump(verif, open(OUT / "verification.json", "w"), indent=2)
print("WROTE", sorted(p.name for p in OUT.iterdir()))
