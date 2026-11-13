#!/usr/bin/env python3
"""D.8 — the two open data cuts (P-344 team-game summary, 2016-2025).

Cut 1 — home-field advantage, regular season vs playoffs:
  home win rate + mean home margin by season_type, with bootstrap 95% CIs.
  The Owner's question: "is home field advantage more or less significant in
  the playoffs?"

Cut 2 — are upsets more likely in rivalry (divisional) games?
  Proxy (INFERRED, named): "rivalry" = divisional matchup via the static
  post-2002 NFL division map (hardcoded, public knowledge; the P-344 staging
  carries no division flag). "Favorite" = the team with the higher season-to-date
  net points per game entering the week (computed cumulatively, no leakage).
  Upset = the pre-game underdog wins. Reported: upset rate divisional vs
  non-divisional, REG vs PLAY, with counts and bootstrap CIs.

Deterministic except the bootstrap (numpy default_rng seeded 20261113; the seed
is recorded so the CIs are reproducible). Read-only input.

Usage: python3 d8_data_cuts.py <team_game_summary.csv> <out-dir>
"""
import csv, json, os, sys
from collections import defaultdict

IN = sys.argv[1] if len(sys.argv) > 1 else "/home/z/my-project/p344/team_game_summary_2016-2025.csv"
OUT = sys.argv[2] if len(sys.argv) > 2 else "/home/z/my-project/work/fwtest-7/results/d8-cuts"
os.makedirs(OUT, exist_ok=True)
SEED = 20261113

DIVISIONS = {
    "ARI": "NFCW", "ATL": "NFCS", "BAL": "AFCN", "BUF": "AFCE", "CAR": "NFCS",
    "CHI": "NFCN", "CIN": "AFCN", "CLE": "AFCN", "DAL": "NFCE", "DEN": "AFCW",
    "DET": "NFCN", "GB": "NFCN", "HOU": "AFCS", "IND": "AFCS", "JAX": "AFCS",
    "KC": "AFCW", "LV": "AFCW", "LAC": "AFCW", "LAR": "NFCW", "MIA": "AFCE",
    "MIN": "NFCN", "NE": "AFCE", "NO": "NFCS", "NYG": "NFCE", "NYJ": "AFCE",
    "PHI": "NFCE", "PIT": "AFCN", "SF": "NFCW", "SEA": "NFCW", "TB": "NFCS",
    "TEN": "AFCS", "WAS": "NFCE",
}

def load():
    games = defaultdict(dict)  # game_id -> side
    with open(IN, newline="") as f:
        for row in csv.DictReader(f):
            games[row["game_id"]][row["team"]] = {
                "season": int(row["season"]), "week": int(row["week"]),
                "st": row["season_type"], "home": row["home_team"] == row["team"],
                "pts": float(row["points"]), "opp": row["opp"],
            }
    return games

def games_list(games):
    out = []
    for gid, sides in games.items():
        if len(sides) != 2:
            continue
        (ta, a), (tb, b) = sides.items()
        home = ta if a["home"] else tb
        away = tb if a["home"] else ta
        out.append({"gid": gid, "season": a["season"], "week": a["week"], "st": a["st"],
                    "home": home, "away": away,
                    "hpts": sides[home]["pts"], "apts": sides[away]["pts"]})
    return out

def boot_ci(vals, n=10000, seed=SEED):
    import random
    rng = random.Random(seed)
    if not vals:
        return None, None
    means = []
    for _ in range(n):
        means.append(sum(rng.choice(vals) for _ in vals) / len(vals))
    means.sort()
    return means[int(0.025 * n)], means[int(0.975 * n)]

def cut1(glist):
    by = {"REG": [], "POST": []}
    marg = {"REG": [], "POST": []}
    for g in glist:
        hw = 1 if g["hpts"] > g["apts"] else 0
        by[g["st"]].append(hw)
        marg[g["st"]].append(g["hpts"] - g["apts"])
    out = {}
    for k in ("REG", "POST"):
        lo, hi = boot_ci(by[k])
        mlo, mhi = boot_ci(marg[k])
        out[k] = {"n": len(by[k]), "home_win_rate": round(sum(by[k]) / len(by[k]), 4),
                  "home_win_rate_ci95": [round(lo, 4), round(hi, 4)],
                  "mean_home_margin": round(sum(marg[k]) / len(marg[k]), 4),
                  "mean_home_margin_ci95": [round(mlo, 4), round(mhi, 4)]}
    out["playoff_minus_reg_win_rate"] = round(out["POST"]["home_win_rate"] - out["REG"]["home_win_rate"], 4)
    out["playoff_minus_reg_margin"] = round(out["POST"]["mean_home_margin"] - out["REG"]["mean_home_margin"], 4)
    return out

def cut2(glist):
    # season-to-date net points per game (through the week BEFORE this game)
    cum = defaultdict(float)   # (season, team) -> net pts
    cnt = defaultdict(int)     # (season, team) -> games played
    rows = []
    for g in sorted(glist, key=lambda x: (x["season"], x["week"])):
        h, a, s = g["home"], g["away"], g["season"]
        hn, an = cnt[(s, h)], cnt[(s, a)]
        if hn >= 3 and an >= 3:   # need a stable prior (>=3 games each)
            hnet = cum[(s, h)] / hn
            anet = cum[(s, a)] / an
            fav_is_home = hnet >= anet
            dog_won = (hpts := g["hpts"]) < (apts := g["apts"]) if fav_is_home else g["hpts"] > g["apts"]
            div = DIVISIONS.get(h) == DIVISIONS.get(a)
            rows.append({"season": s, "week": g["week"], "st": g["st"], "div": div,
                         "dog_won": dog_won,
                         "margin_abs": abs(g["hpts"] - g["apts"])})
        cum[(s, h)] += g["hpts"] - g["apts"]
        cum[(s, a)] += g["apts"] - g["hpts"]
        cnt[(s, h)] += 1
        cnt[(s, a)] += 1
    cells = {}
    for div in (True, False):
        for st in ("REG", "POST"):
            v = [1.0 if r["dog_won"] else 0.0 for r in rows if r["div"] == div and r["st"] == st]
            if not v:
                continue
            lo, hi = boot_ci(v)
            cells[f"{'divisional' if div else 'non-divisional'}_{st}"] = {
                "n": len(v), "upset_rate": round(sum(v) / len(v), 4),
                "ci95": [round(lo, 4), round(hi, 4)]}
    out = {"definition": {
        "rivalry_proxy": "divisional matchup (post-2002 division map, INFERRED — the staging carries no division flag)",
        "favorite": "higher season-to-date net points per game entering the week (>=3 games played each, no leakage)",
        "upset": "the pre-game underdog wins"},
           "cells": cells}
    dv = cells.get("divisional_REG"); nd = cells.get("non-divisional_REG")
    if dv and nd:
        out["divisional_minus_nondivisional_upset_rate_REG"] = round(dv["upset_rate"] - nd["upset_rate"], 4)
    with open(os.path.join(OUT, "cut2-upsets.json"), "w") as f:
        json.dump(out, f, indent=1, sort_keys=True)
        f.write("\n")
    return out

def main():
    games = load()
    glist = games_list(games)
    c1 = cut1(glist)
    with open(os.path.join(OUT, "cut1-hfa.json"), "w") as f:
        json.dump(c1, f, indent=1, sort_keys=True)
        f.write("\n")
    c2 = cut2(glist)
    print("CUT 1 — home-field advantage, REG vs PLAY:")
    print(json.dumps(c1, indent=1, sort_keys=True))
    print("CUT 2 — upset rate, divisional vs non-divisional:")
    for k, v in sorted(c2["cells"].items()):
        print(f"  {k}: n={v['n']} upset_rate={v['upset_rate']} ci95={v['ci95']}")
    print(f"  divisional - non-divisional (REG): {c2.get('divisional_minus_nondivisional_upset_rate_REG')}")

if __name__ == "__main__":
    main()
