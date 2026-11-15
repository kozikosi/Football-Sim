#!/usr/bin/env python3
"""Player-game join — the λ Lab prerequisite (prompt §2.3).

Builds the player-game table the three plans name as the missing staging piece:
  spine  = nflverse snap_counts_{season}.parquet   (one row per player-game; snaps by unit)
  plays  = nflverse pbp_participation_{season}.parquet (players on each play, gsis ids)
  bridge = nflverse players.parquet crosswalk (gsis_id <-> pfr_id <-> display_name)
  context = P-344 team_game_summary_2016-2025.csv (points, margin, home flag, playoff flag)

Output (one row per player-game):
  season, week, season_type, game_id, team, opponent, home_flag,
  player_name, pfr_player_id, gsis_id, position,
  offense_snaps, offense_pct, defense_snaps, defense_pct, st_snaps, st_pct,
  n_plays_on_field, n_off_plays, n_def_plays,
  team_points, opp_points, team_margin, is_playoff

Deterministic; memory-light (one season in memory at a time).
Sources: P-344 (council/muse c7540b04) manifest-verified downloads
(/home/z/my-project/work/p344-raw, all 20 sha256-verified against the P-344
manifest) + players.parquet crosswalk (public nflverse release, fetched 2026-11-14,
sha recorded in the receipt; P-344 does not pin this file).
"""
import gzip
import sys
import numpy as np
import pandas as pd

RAW = "/home/z/my-project/work/p344-raw"
P344 = "/home/z/my-project/work/extract-p344/_agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11"
OUT_CSV = "/home/z/my-project/work/player_game_2016-2025.csv"
OUT_GZ = "/home/z/my-project/zai-work/_agents/zai/deliveries/zai-sitting-2026-11-14/data/player-game/player_game_2016-2025.csv.gz"
SAMPLE = "/home/z/my-project/zai-work/_agents/zai/deliveries/zai-sitting-2026-11-14/data/player-game/sample-2016-head25.csv"
RECEIPT_LINES = []


def P(*a):
    s = " ".join(str(x) for x in a)
    RECEIPT_LINES.append(s)
    print(s)


# ---- crosswalk: pfr_id -> gsis_id (strict id join; name kept for display) -----
cw = pd.read_parquet(f"{RAW}/players_crosswalk.parquet", columns=["gsis_id", "display_name", "pfr_id", "nfl_id"])
cw = cw.dropna(subset=["gsis_id"])
dup_pfr = cw[cw.pfr_id.notna()].duplicated(subset="pfr_id").sum()
cw_pfr = (cw.dropna(subset=["pfr_id"])
            .sort_values("gsis_id")
            .drop_duplicates(subset="pfr_id", keep="first")
            .set_index("pfr_id"))
cw["nfl_id_str"] = cw.nfl_id.map(lambda v: str(int(v)) if pd.notna(v) else None)
dup_nfl = cw[cw.nfl_id_str.notna()].duplicated(subset="nfl_id_str").sum()
cw_nfl = (cw.dropna(subset=["nfl_id_str"])
            .sort_values("gsis_id")
            .drop_duplicates(subset="nfl_id_str", keep="first")
            .set_index("nfl_id_str"))
P("== player-game join receipt ==")
P("crosswalk: nflverse players.parquet,", len(cw), "players with gsis_id,", cw_pfr.shape[0], "distinct pfr_ids,",
  int(dup_pfr), "duplicate-pfr rows dropped (kept first gsis);", cw_nfl.shape[0], "distinct nfl_ids,",
  int(dup_nfl), "duplicate-nfl rows dropped")
P("")

# ---- team-game context: (game_id, team) -> points; home flag ----------------
tg = pd.read_csv(f"{P344}/team_game_summary_2016-2025.csv")
pts = tg.set_index(["game_id", "team"])["points"].to_dict()
home = tg.assign(is_home=lambda d: d.team == d.home_team).set_index(["game_id", "team"])["is_home"].to_dict()
other = {(g, t): o for g, t, o in zip(tg.game_id, tg.team, tg.opp)}
P("context: P-344 team_game_summary_2016-2025.csv,", len(tg), "team-games,", tg.game_id.nunique(), "games")
P("")

frames = []
season_type_conflicts = 0
for y in range(2016, 2026):
    sn = pd.read_parquet(f"{RAW}/snap_counts_{y}.parquet")
    part = pd.read_parquet(f"{RAW}/pbp_participation_{y}.parquet",
                           columns=["nflverse_game_id", "players_on_play", "offense_players", "defense_players"])
    # per-player per-game play counts from participation.
    # 2016-2022 files carry numeric NFL ids in players_on_play/offense_players/defense_players;
    # 2023+ carry gsis ids ("00-…"/uuid). Detect per season from the first non-empty token.
    def explode(col):
        e = part[["nflverse_game_id", col]].dropna()
        s = e.assign(pid=e[col].str.split(";")).explode("pid")
        s["pid"] = s["pid"].str.strip()
        s = s[s.pid != ""]
        return s.groupby(["nflverse_game_id", "pid"]).size()

    first_tok = (part.players_on_play.dropna().astype(str)
                 .str.split(";").str[0].str.strip())
    first_tok = first_tok[first_tok != ""]
    if (first_tok.str.match(r"^\d+$")).mean() > 0.5:
        id_mode = "nfl_id"
    else:
        id_mode = "gsis"
    all_p = explode("players_on_play")
    off_p = explode("offense_players")
    def_p = explode("defense_players")
    if id_mode == "nfl_id":
        # rekey play counts onto gsis via the crosswalk
        def rekey(cnt):
            idx = cnt.index.get_level_values(1).map(cw_nfl.gsis_id)
            out = pd.Series(cnt.to_numpy(), index=pd.MultiIndex.from_arrays(
                [cnt.index.get_level_values(0), idx]))
            return out[~out.index.get_level_values(1).isna()]
        all_p, off_p, def_p = rekey(all_p), rekey(off_p), rekey(def_p)
    P(f"   participation id mode: {id_mode}")

    df = sn.rename(columns={"player": "player_name"})
    # snaps game_type codes: REG / WC / DIV / CON / SB (postseason rounds are named,
    # not 'POST'); the P-344 summary's season_type is REG/POST — cross-checked below.
    df["season_type"] = df.game_type
    df["gsis_id"] = df.pfr_player_id.map(cw_pfr.gsis_id)
    df["player_name_cw"] = df.gsis_id.map(cw.drop_duplicates("gsis_id").set_index("gsis_id").display_name)
    key = pd.MultiIndex.from_arrays([df.game_id, df.gsis_id])
    df["n_plays_on_field"] = pd.Series(all_p.reindex(key).to_numpy(), dtype="Float64")
    df["n_off_plays"] = pd.Series(off_p.reindex(key).to_numpy(), dtype="Float64")
    df["n_def_plays"] = pd.Series(def_p.reindex(key).to_numpy(), dtype="Float64")
    # context from the summary
    df["team_points"] = [pts.get((g, t), np.nan) for g, t in zip(df.game_id, df.team)]
    df["opp_points"] = [pts.get((g, o), np.nan) for g, o in zip(df.game_id, df.opponent)]
    df["home_flag"] = [int(bool(home.get((g, t), False))) for g, t in zip(df.game_id, df.team)]
    df["team_margin"] = df.team_points - df.opp_points
    df["is_playoff"] = (df.season_type != "REG").astype(int)
    # cross-check: snaps game_type (!=REG) vs summary season_type ==POST
    st_sum = tg.drop_duplicates("game_id").set_index("game_id")["season_type"]
    conflicts = int(((df.season_type != "REG") != (df.game_id.map(st_sum) == "POST")).sum())
    season_type_conflicts += conflicts

    keep = ["season", "week", "season_type", "game_id", "team", "opponent", "home_flag",
            "player_name", "pfr_player_id", "gsis_id", "position",
            "offense_snaps", "offense_pct", "defense_snaps", "defense_pct", "st_snaps", "st_pct",
            "n_plays_on_field", "n_off_plays", "n_def_plays",
            "team_points", "opp_points", "team_margin", "is_playoff"]
    frames.append(df[keep])
    gsis_cov = df.gsis_id.notna().mean() * 100
    plays_cov = df.n_plays_on_field.notna().mean() * 100
    P(f"{y}: rows {len(df):6d} · games {df.game_id.nunique():3d} · gsis mapped {gsis_cov:5.1f}% · "
      f"play-counts attached {plays_cov:5.1f}% · season_type conflicts vs summary: {conflicts}")

joined = pd.concat(frames, ignore_index=True)
P("")
P(f"TOTAL rows {len(joined)} (P-344 INDEX expects 253,107) · games {joined.game_id.nunique()} (expects 2,761)")
P(f"gsis coverage overall: {joined.gsis_id.notna().mean()*100:.1f}% · play-count coverage: {joined.n_plays_on_field.notna().mean()*100:.1f}%")
P(f"season_type conflicts (snaps game_type vs summary season_type), all seasons: {season_type_conflicts}")
P(f"playoff rows (is_playoff=1): {int(joined.is_playoff.sum())} · REG rows: {int((1-joined.is_playoff).sum())}")
P("position distribution (top 12):")
for pos, n in joined.position.value_counts().head(12).items():
    P(f"   {pos:4s} {n:7d}")
m = joined[(joined.season == 2023) & (joined.team == "WAS") & (joined.opponent == "ARI") & (joined.position == "QB")]
P("spot check (2023 W1 WAS QB vs ARI): " + "; ".join(
    f"{r.player_name}: snaps {r.offense_snaps}, plays {r.n_plays_on_field}, margin {r.team_margin}, home {r.home_flag}"
    for r in m.itertuples()))
P("")

# ---- write -------------------------------------------------------------------
joined.to_csv(OUT_CSV, index=False)
with open(OUT_CSV, "rb") as fin, gzip.open(OUT_GZ, "wb", compresslevel=9) as fout:
    fout.writelines(fin)
head = pd.read_csv(OUT_CSV, nrows=25)
head.to_csv(SAMPLE, index=False)
P(f"wrote {OUT_CSV} ({len(joined)} rows)")
import os
P(f"wrote {OUT_GZ} ({os.path.getsize(OUT_GZ)} bytes gz)")
P(f"wrote sample {SAMPLE} (first 25 rows)")
with open("/home/z/my-project/zai-work/_agents/zai/deliveries/zai-sitting-2026-11-14/measurements/player-game-join-receipt.txt", "w") as f:
    f.write("\n".join(RECEIPT_LINES) + "\n")
print("receipt written")
