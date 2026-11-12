#!/usr/bin/env python3
"""C4 — DIME RE-ANCHOR (P-346 Part C4, Z.ai seat, 2026-11-12).

B1 settled the DIME question with data: real DIME personnel share 0.094-0.159 by season,
league mean 0.1263 (the Ledger's 0.0694 is below every real season; the engine's DIME_W
0.15 is the real 2018-2021 share). This build delivers the re-anchor as a PROPOSAL the
Architect can apply (the engine files are not touched — read-only respected):

  (1) the re-anchored package-table DIME row: static 0.126 pooled + the per-season
      vector, in the spot-table verification shape (staged | real | delta per season);
  (2) the DIME_W re-derivation target: 0.126 league-mean, NOT 0.15 (specs.ts:84 owns
      the constant; matchup.ts:51 applies it as an unconditional coverage blend —
      `coverage = (1-DIME_W)*coverage + DIME_W*covDime` — a rating weight, not a snap
      share; if it is re-derived to carry snap meaning, the target is the measured share);
  (3) the re-derived situation blend: the real DIME share BY SITUATION (down bucket,
      distance bucket, score script) per season — the weights x rates table the
      situation-weighted blend needs, with the same verification shape;
  (4) the shape recommendation: per-season packages as the default (the fold emits the
      league snapshot for free — the C1 column), with the cost of each option.

Deterministic; no RNG; engine files untouched.
"""
import csv
import json
import os
import re
from collections import defaultdict

import pyarrow.parquet as pq

RAW = "/home/z/my-project/nflverse-raw"
OUT = "/home/z/my-project/work/out"
STAGED = "/home/z/my-project/work/p1/staged.json"
SEASONS = list(range(2016, 2026))
DB_LABELS = {"DB", "CB", "S", "SS", "FS", "NB", "SAF", "DCB"}


def mean(a):
    return sum(a) / len(a)


def staged_dime():
    """The staged DIME share from the Ledger Phase 1 even80 games (dpkg counters)."""
    st = json.load(open(STAGED))
    out = {}
    for cell, games in st["games"].items():
        base = nickel = dime = 0
        for g in games:
            for side in ("home", "away"):
                dp = g["dpkg"][side]
                base += dp.get("base", 0)
                nickel += dp.get("nickel", 0)
                dime += dp.get("dime", 0)
        out[cell] = {"base": base, "nickel": nickel, "dime": dime,
                     "dime_share": round(dime / max(base + nickel + dime, 1), 4)}
    return out


def real_dime_by_season():
    """Per-play >=6-DB share per season (the B1 machinery)."""
    out = {}
    for season in SEASONS:
        pbp = pq.read_table(f"{RAW}/play_by_play_{season}.parquet",
                            columns=["game_id", "play_id", "season_type", "play_type"]).to_pydict()
        part = pq.read_table(f"{RAW}/pbp_participation_{season}.parquet",
                             columns=["nflverse_game_id", "play_id", "defense_personnel"])
        pdd = part.to_pydict()
        pers = {(g, p): d for g, p, d in zip(pdd["nflverse_game_id"], pdd["play_id"],
                                             pdd["defense_personnel"])}
        n_play = 0
        dbn = defaultdict(int)
        for i in range(len(pbp["game_id"])):
            if pbp["season_type"][i] != "REG":
                continue
            if pbp["play_type"][i] not in ("pass", "run"):
                continue
            n_play += 1
            s = pers.get((pbp["game_id"][i], pbp["play_id"][i]))
            if not s:
                continue
            counts = {}
            for m in re.finditer(r"(\d+)\s*([A-Z]{1,4})", s.upper()):
                counts[m.group(2)] = counts.get(m.group(2), 0) + int(m.group(1))
            dbn[sum(v for k, v in counts.items() if k in DB_LABELS)] += 1
        out[season] = {"dime": round((dbn.get(6, 0) + sum(v for k, v in dbn.items() if k > 6)) / n_play, 4),
                       "strict6": round(dbn.get(6, 0) / n_play, 4),
                       "base": round(dbn.get(4, 0) / n_play, 4),
                       "nickel": round(dbn.get(5, 0) / n_play, 4), "n": n_play}
    return out


def real_dime_by_situation():
    """Real DIME share by situation: down bucket x distance bucket, score script, per play.
    Returns pooled league + per-season pooled tables."""
    res = {"pooled": {}, "by_season": {}}
    situations = defaultdict(lambda: [0, 0])   # key -> [dime_plays, all_plays]
    season_sit = {}

    def key_of(down, ydstogo, score_diff, posteam):
        db = {1: "1st", 2: "2nd", 3: "3rd", 4: "4th"}.get(down, "?")
        dist = "short(1-3)" if ydstogo <= 3 else ("med(4-7)" if ydstogo <= 7 else "long(8+)")
        if score_diff is None:
            script = "?"
        else:
            script = ("tied/one-score(|d|<=8)" if abs(score_diff) <= 8
                      else ("ahead(>8)" if score_diff > 0 else "behind(>8)"))
        return f"{db}+{dist}", script

    for season in SEASONS:
        pbp = pq.read_table(f"{RAW}/play_by_play_{season}.parquet",
                            columns=["game_id", "play_id", "season_type", "play_type", "down",
                                     "ydstogo", "score_differential", "posteam"]).to_pydict()
        part = pq.read_table(f"{RAW}/pbp_participation_{season}.parquet",
                             columns=["nflverse_game_id", "play_id", "defense_personnel"])
        pdd = part.to_pydict()
        pers = {(g, p): d for g, p, d in zip(pdd["nflverse_game_id"], pdd["play_id"],
                                             pdd["defense_personnel"])}
        ssit = defaultdict(lambda: [0, 0])
        for i in range(len(pbp["game_id"])):
            if pbp["season_type"][i] != "REG":
                continue
            if pbp["play_type"][i] not in ("pass", "run"):
                continue
            s = pers.get((pbp["game_id"][i], pbp["play_id"][i]))
            if not s:
                continue
            counts = {}
            for m in re.finditer(r"(\d+)\s*([A-Z]{1,4})", s.upper()):
                counts[m.group(2)] = counts.get(m.group(2), 0) + int(m.group(1))
            db = sum(v for k, v in counts.items() if k in DB_LABELS)
            is_dime = 1 if db >= 6 else 0
            k, script = key_of(pbp["down"][i], pbp["ydstogo"][i], pbp["score_differential"][i],
                               pbp["posteam"][i])
            situations[k][0] += is_dime
            situations[k][1] += 1
            situations[script][0] += is_dime
            situations[script][1] += 1
            ssit[k][0] += is_dime
            ssit[k][1] += 1
            ssit[script][0] += is_dime
            ssit[script][1] += 1
        season_sit[season] = {k: {"dime_share": round(v[0] / v[1], 4), "n": v[1]}
                              for k, v in sorted(ssit.items()) if v[1] >= 200}
    res["pooled"] = {k: {"dime_share": round(v[0] / v[1], 4), "n": v[1]}
                     for k, v in sorted(situations.items()) if v[1] >= 500}
    res["by_season"] = season_sit
    return res


def main():
    os.makedirs(OUT, exist_ok=True)
    results = {"staged_dpkg": staged_dime(), "real_dime_by_season": real_dime_by_season(),
               "real_dime_by_situation": real_dime_by_situation()}

    staged_cell = "even80"
    staged_share = results["staged_dpkg"][staged_cell]["dime_share"]
    per_season = {s: v["dime"] for s, v in results["real_dime_by_season"].items()}
    league_mean = round(mean(list(per_season.values())), 4)
    strict_mean = round(mean([v["strict6"] for v in results["real_dime_by_season"].values()]), 4)

    # the re-anchored package table proposal (staged | real | delta per season)
    table_rows = []
    for s in SEASONS:
        r = per_season[s]
        table_rows.append({"season": s, "staged": staged_share, "real": r,
                           "delta_pts": round(100 * (r - staged_share), 2),
                           "reanchored_static": league_mean,
                           "delta_reanchored_pts": round(100 * (r - league_mean), 2)})
    results["reanchored_package_table"] = {
        "cell": staged_cell,
        "staged_dime_share": staged_share,
        "proposal_static": league_mean,
        "proposal_strict6": strict_mean,
        "proposal_per_season": per_season,
        "rows": table_rows,
        "settle": {"pooled_row": league_mean, "expected": "0.126 pooled, per-season row = the B1 table",
                   "b1_table_match": all(abs(per_season[s] - [0.125, 0.136, 0.141, 0.159, 0.147, 0.138,
                                                               0.106, 0.117, 0.100, 0.094][s - 2016])
                                         < 0.0006 for s in SEASONS)}}
    results["dime_w_target"] = {
        "engine_constant": "specs.ts:84 DIME_W = 0.15 (not touched — Architect's file)",
        "engine_usage": "matchup.ts:51: coverage = (1-DIME_W)*coverage + DIME_W*covDime, "
                        "applied unconditionally (both base and nickel plans)",
        "measured_target": league_mean,
        "reading": "a rating weight is not a snap share; 0.15 coincides with the real 2018-2021 "
                   "dime share; if re-derived to carry snap meaning the target is 0.126 "
                   "league-mean (or the per-season vector)",
        "situation_blend": "the engine applies the blend unconditionally; the measured "
                           "unconditional share IS 0.126 — the per-situation table below is "
                           "what a situation-weighted re-derivation consumes"}

    # situation table CSV
    with open(f"{OUT}/c4_dime_situation_table.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["situation", "dime_share_pooled", "n_pooled"] +
                   [f"dime_{s}" for s in SEASONS])
        for k in results["real_dime_by_situation"]["pooled"]:
            p = results["real_dime_by_situation"]["pooled"][k]
            row = [k, p["dime_share"], p["n"]]
            for s in SEASONS:
                v = results["real_dime_by_situation"]["by_season"][s].get(k)
                row.append(v["dime_share"] if v else "")
            w.writerow(row)

    json.dump(results, open(f"{OUT}/c4_dime_tables.json", "w"), indent=1)

    print("C4 — DIME re-anchor")
    print(f"staged ({staged_cell}) dime share: {staged_share}  (base {results['staged_dpkg'][staged_cell]['base']}, "
          f"nickel {results['staged_dpkg'][staged_cell]['nickel']}, dime {results['staged_dpkg'][staged_cell]['dime']})")
    print(f"real per season: {per_season}")
    print(f"league mean {league_mean}  strict6 mean {strict_mean}")
    print(f"settle: b1 table match = {results['reanchored_package_table']['settle']['b1_table_match']}")
    print("\nstaged | real | delta per season:")
    for r in table_rows:
        print(f"  {r['season']}: {r['staged']:.4f} | {r['real']:.4f} | {r['delta_pts']:+.2f} pts "
              f"-> re-anchored {r['reanchored_static']:.4f} ({r['delta_reanchored_pts']:+.2f})")
    print("\nDIME share by situation (pooled, n>=500):")
    for k, v in results["real_dime_by_situation"]["pooled"].items():
        print(f"  {k:32}: {v['dime_share']:.4f}  (n={v['n']})")
    print(f"\nstaged cells present: {list(results['staged_dpkg'])}")


if __name__ == "__main__":
    main()
