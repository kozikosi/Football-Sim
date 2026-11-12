#!/usr/bin/env python3
"""C3 — GRAVITY FOLD (P-346 Part C3, Z.ai seat, 2026-11-12).

(1) THE RECOVERED DEFINITION (B3 closed): the shipped b2_gravity_index.json is reproduced
    EXACTLY (10/10) by: per team-season, the receiver (pure pbp abbreviated name, no
    snap-count join) with the most deep targets (pass_attempt==1, air_yards>=15, REG);
    his share of the team's deep attempts (ALL team deep attempts — WR+TE+RB+unmatched
    null-name rows); league mean of TEAM MEANS. The v2 filing's "WR1" was in fact the
    season DEEP-TARGET LEADER — the snaps-WR1 the B2 report described is a different
    measure (0.26-0.29 under the same machinery), which is exactly where MUSE's 2016
    recomputation (0.383) diverged from the shipped 0.325.
(2) THE B3 DIAGNOSIS: 2016's team-level table — the deep leader per team, his share, and
    where the deep leader is not the snaps-WR1 (named players).
(3) THE FOLD: per-team-game gravity_index emission format (the fold stub for Phase 1's
    event log) + the event-schema spec (double_team = charting-class, NOT public;
    coverage_assignment; usage_share).
(4) THE STAGED SIDE — said exactly: the staged Ledger DOES emit receiver-level pass-event
    counters per seat (WR1|catch/inc/int_thrown_to in staged.json's gravity counters) but
    carries NO DEPTH AXIS (no air_yards / deep flag on any staged event) — so the staged
    DEEP-target share is NOT computable and is not faked. The comparator that IS
    computable on both sides: WR1's share of ALL pass events (the volume finding).
(5) THE SECOND GRAVITY STAT (the innovation): the Herfindahl of deep-target concentration
    (sum of squared receiver shares of team deep targets) — decade table + stability, and
    the WR2/TE1 deep shares.

Deterministic; read-only on the raw files and on staged.json.
"""
import csv
import json
import os
from collections import defaultdict

import pyarrow.parquet as pq

RAW = "/home/z/my-project/nflverse-raw"
OUT = "/home/z/my-project/work/out"
STAGED = "/home/z/my-project/work/p1/staged.json"
SEASONS = list(range(2016, 2026))
SHIPPED = json.load(open("/home/z/my-project/football-sim/_agents/glyph/deliveries/"
                         "z-phase2-v2/phase2-real-2026-11-11/b2_gravity_index.json"))


def mean(a):
    return sum(a) / len(a)


def sd(a):
    m = mean(a)
    return math.sqrt(sum((x - m) ** 2 for x in a) / (len(a) - 1)) if len(a) > 1 else 0.0


import math


def season_gravity(season):
    """The recovered definition. Returns per-season league mean of team means + per-team
    table + per-team-game fold rows."""
    pbp = pq.read_table(f"{RAW}/play_by_play_{season}.parquet",
                        columns=["game_id", "season_type", "posteam", "pass_attempt",
                                 "air_yards", "receiver_player_name"]).to_pydict()
    n = len(pbp["game_id"])
    tg_deep = defaultdict(int)            # (team, game) -> ALL deep attempts (incl. null-name)
    deep_by_name = defaultdict(int)       # (team, game, name)
    season_deep = defaultdict(int)        # (team, name)
    season_targets = defaultdict(int)     # (team, name) — any depth
    games_of = defaultdict(set)
    for i in range(n):
        if pbp["season_type"][i] != "REG":
            continue
        t = pbp["posteam"][i]
        if not t or not pbp["pass_attempt"][i]:
            continue
        g = pbp["game_id"][i]
        ay = pbp["air_yards"][i]
        ab = pbp["receiver_player_name"][i] or ""
        if ab:
            season_targets[(t, ab)] += 1
        if ay is None or float(ay) < 15:
            continue
        tg_deep[(t, g)] += 1
        games_of[t].add(g)
        if ab:
            deep_by_name[(t, g, ab)] += 1
            season_deep[(t, ab)] += 1
    # season deep-target leader per team (ties -> name ASC, the deterministic shipped rule)
    leader = {}
    for (t, ab), c in season_deep.items():
        cur = leader.get(t)
        if cur is None or c > cur[0] or (c == cur[0] and ab < cur[1]):
            leader[t] = (c, ab)
    # team means of per-season share; game-weighted variant; per-game fold rows
    team_means = {}
    fold_rows = []
    shares_by_team_games = defaultdict(list)
    for (t, g), tot in tg_deep.items():
        if t not in leader or tot == 0:
            continue
        v = deep_by_name.get((t, g, leader[t][1]), 0)
        fold_rows.append({"season": season, "team": t, "game": g,
                          "leader": leader[t][1], "leader_deep": v, "team_deep": tot,
                          "gravity_index": round(v / tot, 4)})
        shares_by_team_games[t].append(v / tot)
    for t, games in shares_by_team_games.items():
        tot_d = leader[t][0]
        tot_t = sum(tg_deep[(t, g)] for g in games_of[t])
        team_means[t] = tot_d / tot_t
    vals = list(team_means.values())
    gw = [x for t in shares_by_team_games for x in shares_by_team_games[t]]
    return {
        "season": season,
        "league_mean_teammeans": round(mean(vals), 3),
        "league_mean_gameweighted": round(mean(gw), 3),
        "n_teams": len(team_means),
        "shipped": SHIPPED[str(season)],
        "exact_match": abs(round(mean(vals), 3) - SHIPPED[str(season)]) < 5e-4,
        "leader_per_team": {t: {"name": ab, "deep": c} for t, (c, ab) in sorted(leader.items())},
        "fold_rows_sample": fold_rows[:3],
        "n_fold_rows": len(fold_rows),
        "all_fold_rows": fold_rows,
    }


TEAM_ALIAS = {"OAK": "LV", "SD": "LAC"}   # snap_counts keeps the historical keys; pbp normalizes to LV/LAC (LA stays LA)


def snap_wr1_comparison(season):
    """The snaps-WR1 (season offense-snap leader among WRs) per team, normalized to
    (first initial, last name) for the comparison against the pbp deep leader.
    Team keys aliased to the pbp convention (OAK->LV, SD->LAC, ...)."""
    snaps_t = pq.read_table(f"{RAW}/snap_counts_{season}.parquet",
                            columns=["game_type", "team", "player", "pfr_player_id",
                                     "position", "offense_snaps"]).to_pydict()
    wr_by_team = defaultdict(dict)
    for i in range(len(snaps_t["team"])):
        if snaps_t["game_type"][i] != "REG":
            continue
        lab = (snaps_t["position"][i] or "").strip().upper()
        if lab.split("/")[0].strip() != "WR":
            continue
        team = TEAM_ALIAS.get(snaps_t["team"][i], snaps_t["team"][i])
        pid = snaps_t["pfr_player_id"][i] or snaps_t["player"][i]
        wr_by_team[team][pid] = wr_by_team[team].get(pid, 0.0) + float(snaps_t["offense_snaps"][i] or 0)
    wr1_pid = {}
    for t, pmap in wr_by_team.items():
        if pmap:
            wr1_pid[t] = max(pmap.items(), key=lambda kv: (kv[1], kv[0]))[0]
    names = {}
    for i in range(len(snaps_t["team"])):
        t = TEAM_ALIAS.get(snaps_t["team"][i], snaps_t["team"][i])
        pid = snaps_t["pfr_player_id"][i] or snaps_t["player"][i]
        if t in wr1_pid and wr1_pid[t] == pid and t not in names:
            names[t] = snaps_t["player"][i]
    out = {}
    for t, full in names.items():
        toks = full.split()
        last = toks[-1] if toks else ""
        if last.upper().rstrip(".") in ("II", "III", "IV", "JR", "SR") and len(toks) > 1:
            last = toks[-2]
        out[t] = (" ".join(toks), f"{toks[0][0].upper()}.{last}" if toks else "")
    return out


def norm_pbp_name(ab):
    """pbp abbreviated name -> (first initial, last name), suffix stripped.
    Handles 'T.Pryor Sr.' (the suffix carries its own period)."""
    ab = (ab or "").strip()
    if not ab:
        return ""
    toks = [t for t in ab.replace(".", " ").split() if t]
    if toks and toks[-1].upper().rstrip(".") in ("II", "III", "IV", "JR", "SR"):
        toks = toks[:-1]
    if len(toks) < 2:
        return ab
    return f"{toks[0][0].upper()}.{toks[1]}"


def herfindahl(season):
    """The second gravity stat: deep-target concentration Herfindahl per team-season
    (sum of squared receiver shares of team deep targets), league mean of team means."""
    pbp = pq.read_table(f"{RAW}/play_by_play_{season}.parquet",
                        columns=["game_id", "season_type", "posteam", "pass_attempt",
                                 "air_yards", "receiver_player_name"]).to_pydict()
    season_deep = defaultdict(int)
    tot = defaultdict(int)
    for i in range(len(pbp["game_id"])):
        if pbp["season_type"][i] != "REG":
            continue
        t = pbp["posteam"][i]
        if not t or not pbp["pass_attempt"][i]:
            continue
        ay = pbp["air_yards"][i]
        ab = pbp["receiver_player_name"][i] or ""
        if ay is None or float(ay) < 15:
            continue
        tot[t] += 1
        if ab:
            season_deep[(t, ab)] += 1
    hhi = {}
    shares_by_team = defaultdict(dict)
    for (t, ab), c in season_deep.items():
        shares_by_team[t][ab] = c
    for t, names in shares_by_team.items():
        tt = tot[t]
        s = [c / tt for c in names.values()]
        other = 1.0 - sum(s)   # the unmatched (null-name) share as one lump
        hhi[t] = sum(x * x for x in s) + (other * other if other > 0 else 0.0)
    vals = list(hhi.values())
    # WR2/TE1 shares: the #2 deep receiver share and the top TE deep share per team
    wr2, te1 = [], []
    snaps_t = pq.read_table(f"{RAW}/snap_counts_{season}.parquet",
                            columns=["game_type", "team", "player", "pfr_player_id",
                                     "position", "offense_snaps"]).to_pydict()
    te_names = defaultdict(set)
    for i in range(len(snaps_t["team"])):
        if snaps_t["game_type"][i] != "REG":
            continue
        if (snaps_t["position"][i] or "").split("/")[0].strip() == "TE":
            te_names[snaps_t["team"][i]].add(snaps_t["player"][i])
    # match pbp abbr to TE names: build abbr map for TEs
    def abbr(full):
        toks = (full or "").split()
        if not toks:
            return None
        last = toks[-1]
        if last.upper().rstrip(".") in ("II", "III", "IV", "JR", "SR") and len(toks) > 1:
            last = toks[-2]
        return f"{toks[0][0].upper()}.{last}"
    te_ab = {t: {abbr(nm) for nm in names} for t, names in te_names.items()}
    for t, names in sorted(shares_by_team.items()):
        tt = tot[t]
        ordered = sorted(names.items(), key=lambda kv: (-kv[1], kv[0]))
        if len(ordered) >= 2:
            wr2.append(ordered[1][1] / tt)
        te_deep = [(ab, c) for ab, c in ordered if ab in te_ab.get(t, set())]
        if te_deep:
            te1.append(te_deep[0][1] / tt)
    return {"season": season, "hhi_league_mean": round(mean(vals), 4),
            "hhi_league_sd": round(sd(vals), 4),
            "wr2_deep_share_mean": round(mean(wr2), 3) if wr2 else None,
            "te1_deep_share_mean": round(mean(te1), 3) if te1 else None,
            "n_teams": len(hhi)}


def staged_side():
    """The staged comparators from staged.json (even80). Returns WR1 pass-event share
    (computable both sides) and states the missing depth axis."""
    st = json.load(open(STAGED))
    games = st["games"]["even80"]
    wr1_share = []
    for g in games:
        for side in ("home", "away"):
            ev = g["gravity"][side]
            tot_pass = sum(v for k, v in ev.items() if k.split("|")[-1] in ("catch", "inc", "int_thrown_to"))
            wr1 = sum(v for k, v in ev.items() if k.startswith("WR1|") and
                      k.split("|")[-1] in ("catch", "inc", "int_thrown_to"))
            if tot_pass:
                wr1_share.append(wr1 / tot_pass)
    return {"staged_WR1_pass_event_share": round(mean(wr1_share), 4),
            "n_staged_games": len(games),
            "missing_field": "air_yards (or any deep-target flag) on the staged pass events — "
                             "the staged gravity counters classify catch/inc by seat but carry "
                             "no depth axis, so the staged deep-target share (the gravity index "
                             "at tau=15) is NOT computable from staged.json; not faked here. "
                             "The fold emits it the day the play model stages pass depth "
                             "(the event-schema spec below)."}


def real_wr1_pass_share(season):
    """Real most-targeted WR's share of team pass attempts (the both-sides comparator)."""
    pbp = pq.read_table(f"{RAW}/play_by_play_{season}.parquet",
                        columns=["season_type", "posteam", "pass_attempt",
                                 "receiver_player_name"]).to_pydict()
    targets = defaultdict(int)
    tot = defaultdict(int)
    for i in range(len(pbp["posteam"])):
        if pbp["season_type"][i] != "REG":
            continue
        t = pbp["posteam"][i]
        if not t or not pbp["pass_attempt"][i]:
            continue
        tot[t] += 1
        ab = pbp["receiver_player_name"][i] or ""
        if ab:
            targets[(t, ab)] += 1
    shares = []
    for t in tot:
        best = max((c for (tt, _ab), c in targets.items() if tt == t), default=0)
        shares.append(best / tot[t])
    return round(mean(shares), 4)


def main():
    os.makedirs(OUT, exist_ok=True)
    results = {"gravity_index_recovered": {}, "fold_format": {}, "b3_2016_diagnosis": {},
               "second_gravity_stat": {}, "staged_side": staged_side(),
               "wr1_pass_event_share": {}}
    print("C3 — gravity fold (the recovered definition)")
    print(f"{'yr':>4} {'shipped':>8} {'teammeans':>10} {'gamewt':>8} {'exact':>6}")
    all_rows = []
    for s in SEASONS:
        r = season_gravity(s)
        results["gravity_index_recovered"][str(s)] = {
            k: r[k] for k in ("league_mean_teammeans", "league_mean_gameweighted", "n_teams",
                              "shipped", "exact_match", "leader_per_team")}
        for row in r.pop("all_fold_rows"):
            all_rows.append(row)
        print(f"{s:>4} {r['shipped']:>8} {r['league_mean_teammeans']:>10} "
              f"{r['league_mean_gameweighted']:>8} {str(r['exact_match']):>6}")
    n_exact = sum(1 for s in SEASONS if results["gravity_index_recovered"][str(s)]["exact_match"])
    results["settle"] = {"reproduces_b2_gravity_index_json": f"{n_exact}/10 exact",
                         "definition": "per team-season, the season deep-target leader (pure pbp "
                                       "abbreviated name, no snap-count join); his share of ALL "
                                       "team deep attempts (WR+TE+RB+unmatched null-name rows); "
                                       "league mean of team means; REG; pass_attempt==1; "
                                       "air_yards>=15; ties -> name ASC"}

    # fold emission CSV (the fold stub output shape)
    with open(f"{OUT}/c3_gravity_fold_per_team_game.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["season", "team", "game", "leader_abbr", "leader_deep_targets",
                    "team_deep_targets", "gravity_index"])
        for row in all_rows:
            w.writerow([row["season"], row["team"], row["game"], row["leader"],
                        row["leader_deep"], row["team_deep"], row["gravity_index"]])
    results["fold_format"] = {
        "emission": "gravity_index per team-game (the fold stub output is "
                    "c3_gravity_fold_per_team_game.csv, 10 seasons x 32 teams x ~16 games)",
        "event_schema_ask": {
            "double_team": "bool — CHARTING-CLASS, not in any public release (PFF/SIS-class "
                           "charting is paid; NGS tracking frames public only for Big-Data-Bowl "
                           "week windows); state that in the schema",
            "coverage_assignment": "nearest-defender id + type; public pbp has "
                                   "defense_man_zone_type/defense_coverage_type for 2023+ only",
            "usage_share": "per play — the designed receiver; route is in the 2023+ NGS columns, "
                           "earlier seasons not public",
            "air_yards_deep_flag": "the field the staged Ledger is missing (see staged_side)"}}

    # B3 2016 diagnosis
    g16 = season_gravity(2016)
    wr1_names = snap_wr1_comparison(2016)
    rows = []
    for t, info in sorted(g16["leader_per_team"].items()):
        snap = wr1_names.get(t)
        same = bool(snap) and norm_pbp_name(info["name"]) == snap[1]
        rows.append((t, info["name"], info["deep"], snap[0] if snap else "?", same))
    results["b3_2016_diagnosis"] = {
        "definition_gap": "the shipped index keys on the SEASON DEEP-TARGET LEADER (pure pbp "
                          "names); MUSE's described method keys on the snaps-WR1 via a name "
                          "join. Under the snaps-WR1 the 2016 league mean is ~0.26-0.29 (the "
                          "explore battery), not 0.383 — his 2016 number is not reproducible "
                          "from his description either; the recovered definition reproduces the "
                          "shipped 0.325 EXACTLY.",
        "leader_is_not_snaps_wr1_teams": [
            {"team": t, "deep_leader": ln, "snap_wr1": wn} for t, ln, _d, wn, same in rows
            if not same],
        "n_teams_leader_ne_wr1_2016": sum(1 for _t, _ln, _d, _wn, same in rows if not same),
        "n_teams_leader_is_wr1_2016": sum(1 for _t, _ln, _d, _wn, same in rows if same),
        "note": "the deep leader IS the join-free identification; the snaps-WR1 needs the "
                "abbr join whose 2016 unmatched rate is the decade max (9.5%) — that is the "
                "2016 noise source. The ARI J.Brown collision (John/Jaron) sits in both years.",
        "per_team_2016": [{"team": t, "deep_leader": ln, "leader_deep": d, "snap_wr1": wn,
                           "same_player": same} for t, ln, d, wn, same in rows]}
    print("\nB3 2016: teams where the deep leader is not the snaps-WR1:")
    for r in results["b3_2016_diagnosis"]["leader_is_not_snaps_wr1_teams"]:
        print(f"  {r['team']}: deep leader {r['deep_leader']}  snaps-WR1 {r['snap_wr1']}")
    print(f"  (leader IS the snaps-WR1 on "
          f"{results['b3_2016_diagnosis']['n_teams_leader_is_wr1_2016']} of 32 teams)")

    # second gravity stat
    print("\nsecond gravity stat — Herfindahl of deep-target concentration:")
    for s in SEASONS:
        h = herfindahl(s)
        results["second_gravity_stat"][str(s)] = h
        print(f"  {s}: HHI {h['hhi_league_mean']:.4f} ± {h['hhi_league_sd']:.4f}  "
              f"WR2 deep share {h['wr2_deep_share_mean']}  TE1 {h['te1_deep_share_mean']}")

    # both-sides comparator
    for s in (2016, 2019, 2023, 2025):
        results["wr1_pass_event_share"][str(s)] = {
            "real_most_targeted_WR_share_of_attempts": real_wr1_pass_share(s),
            "staged_WR1_share_of_pass_events": results["staged_side"]["staged_WR1_pass_event_share"]}
    print("\nstaged vs real WR1 pass-event share (the both-sides comparator):")
    for s, v in results["wr1_pass_event_share"].items():
        print(f"  {s}: real {v['real_most_targeted_WR_share_of_attempts']}  "
              f"staged {v['staged_WR1_share_of_pass_events']}")

    json.dump(results, open(f"{OUT}/c3_gravity_results.json", "w"), indent=1)
    print(f"\nwrote {OUT}/c3_gravity_results.json + c3_gravity_fold_per_team_game.csv "
          f"({len(all_rows)} fold rows)")


if __name__ == "__main__":
    main()
