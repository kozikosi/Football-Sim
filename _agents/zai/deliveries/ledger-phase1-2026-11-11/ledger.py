#!/usr/bin/env python3
"""LEDGER — the Play Ledger's output fold (Phase 1: the snap ledger).

Z.ai (seat ZAI) for MUSE's ledger-phase1 prompt, 2026-11-11. Folds the staged play log
(staged.json, produced by stage_plays.py) into the ledger's three standing outputs:

  1. per-SPOT snap shares   — offense: spot snaps / offensive scrimmage snaps (11 per play);
                              defense: spot snaps / defensive snaps (11 per play);
                              K/P: special-teams events per game (kicks, XPs, 2-pt attempts, punts)
  2. per-PACKAGE participation — share of scrimmage snaps per personnel package (off 11/12/13/21/22,
                              def base/nickel/dime) + the run rate inside each package
  3. GRAVITY event counts   — double-team events per spot per game (INFERRED placeholder rates)

Plus the PURITY receipt: staged vs engine totals per channel (the conservation law).

Usage:  python3 ledger.py staged.json engine_constants.json ledger.json
"""
import argparse, json

OFF_SPOTS = ["QB", "RB1", "RB2", "FB", "WR1", "WR2", "WR3", "WR4", "TE1", "TE2", "TE3",
             "OT1", "OT2", "OG1", "OG2", "C"]
DEF_SPOTS = ["DE1", "DE2", "DT1", "DT2", "DL5", "MIKE", "WILL", "SAM", "CB1", "CB2", "CB3", "DIME", "SS", "FS"]
CELLS = ("even80", "home_plus8", "identities")

def mean(xs): return sum(xs) / len(xs) if xs else 0.0

def spearman(pairs):
    """Spearman rank correlation of (x, y) pairs (ties get average ranks)."""
    if len(pairs) < 2: return None
    def ranks(vs):
        order = sorted(range(len(vs)), key=lambda i: vs[i])
        r = [0.0] * len(vs)
        i = 0
        while i < len(order):
            j = i
            while j + 1 < len(order) and vs[order[j + 1]] == vs[order[i]]: j += 1
            avg = (i + j) / 2 + 1
            for k in range(i, j + 1): r[order[k]] = avg
            i = j + 1
        return r
    rx, ry = ranks([p[0] for p in pairs]), ranks([p[1] for p in pairs])
    n = len(pairs)
    mx, my = sum(rx) / n, sum(ry) / n
    num = sum((a - mx) * (b - my) for a, b in zip(rx, ry))
    den = (sum((a - mx) ** 2 for a in rx) * sum((b - my) ** 2 for b in ry)) ** 0.5
    return num / den if den else None

def fold_cell(rows):
    n = len(rows)
    out = {"games": n}
    # ---- 1. snap shares per spot (denominator: 11 x staged scrimmage plays, per team-game)
    shares = {u: {} for u in ("off", "def")}
    for unit, spots in (("off", OFF_SPOTS), ("def", DEF_SPOTS)):
        for s in spots:
            per_game, per_game_ps = [], []
            for r in rows:
                tot = 0.0; den = 0.0; pl = 0.0
                for side in ("home", "away"):
                    tot += r["snaps"][side][unit][s]
                    den += r["snaps"][side]["plays"] * 11
                    pl += r["snaps"][side]["plays"]
                per_game.append(tot / den if den else 0.0)
                per_game_ps.append(tot / pl if pl else 0.0)   # play-share: snaps / team plays
            shares[unit][s] = {"share": mean(per_game), "sd": (sum((x - mean(per_game)) ** 2 for x in per_game) / n) ** 0.5,
                               "play_share": mean(per_game_ps)}
    out["spot_shares"] = shares
    # ---- 2. package participation
    pkg = {}
    for pk in ("11", "12", "13", "21", "22"):
        sh, rr = [], []
        for r in rows:
            tot = r["pkg"]["home"][pk] + r["pkg"]["away"][pk]
            plays = sum(r["pkg"][side][k] for side in ("home", "away") for k in ("11", "12", "13", "21", "22"))
            sh.append(tot / plays if plays else 0.0)
            rn, tt = 0, 0
            for side in ("home", "away"):
                rn += r["pkg_run"][side][pk][0]; tt += r["pkg_run"][side][pk][1]
            rr.append(rn / tt if tt else 0.0)
        pkg[pk] = {"share": mean(sh), "run_rate": mean(rr)}
    for pk in ("base", "nickel", "dime"):
        sh = []
        for r in rows:
            tot = r["dpkg"]["home"][pk] + r["dpkg"]["away"][pk]
            plays = sum(r["dpkg"][side][k] for side in ("home", "away") for k in ("base", "nickel", "dime"))
            sh.append(tot / plays if plays else 0.0)
        pkg[pk] = {"share": mean(sh)}
    out["packages"] = pkg
    # ---- 3. gravity per game
    grav = {}
    for key in ("DT1|double_team", "DE1|double_team", "WR1|double_team"):
        per_game = []
        for r in rows:
            tot = sum(r["gravity"][side].get(key, 0) for side in ("home", "away"))
            per_game.append(tot / 2)   # per team-game
        grav[key.split("|")[0]] = {"per_team_game": mean(per_game)}
    # doubled share: DT1/DE1 doubles / defensive snaps
    for spot in ("DT1", "DE1"):
        per_game = []
        for r in rows:
            tot = sum(r["gravity"][side].get(spot + "|double_team", 0) for side in ("home", "away"))
            den = sum(r["snaps"][side]["plays"] for side in ("home", "away"))
            per_game.append(tot / den if den else 0.0)
        grav[spot]["doubled_share_of_def_snaps"] = mean(per_game)
    out["gravity"] = grav
    # ---- K/P special-teams events per team-game
    kp = {}
    for k in ("fga", "xpa", "two_att", "punts"):
        kp[k] = mean([ (r["kp"]["home"][k] + r["kp"]["away"][k]) / 2 for r in rows ])
    out["special_teams"] = kp
    # ---- purity receipt
    pur = {}
    for ch in ("rush", "pass", "plays", "sacks", "points", "giveaways"):
        deltas = [r["purity"][side][ch] for r in rows for side in ("home", "away")]
        exact = sum(1 for v in deltas if v == 0)
        pur[ch] = {"side_games": len(deltas), "exact": exact,
                   "max_abs_delta": max(abs(v) for v in deltas),
                   "sum_abs_delta": sum(abs(v) for v in deltas)}
    out["purity"] = pur
    out["artifact_yards_per_team_game"] = mean([r["artifact"] for r in rows])
    out["overshoots_per_game"] = mean([r["overshoots"] for r in rows])
    out["drives_staged"] = sum(r["drives_staged"] for r in rows)
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("staged"); ap.add_argument("constants"); ap.add_argument("out")
    a = ap.parse_args()
    staged = json.load(open(a.staged))
    ledger = {"cells": {c: fold_cell(staged["games"][c]) for c in CELLS if c in staged["games"]}}
    json.dump(ledger, open(a.out, "w"), indent=1)
    for c, f in ledger["cells"].items():
        p = f["purity"]
        print(f"{c}: games {f['games']}  drives {f['drives_staged']}  "
              f"purity exact plays {p['plays']['exact']}/{p['plays']['side_games']}  "
              f"sacks {p['sacks']['exact']}/{p['sacks']['side_games']}  "
              f"points {p['points']['exact']}/{p['points']['side_games']}  "
              f"giveaways {p['giveaways']['exact']}/{p['giveaways']['side_games']}  "
              f"artifact yd/team-gm {f['artifact_yards_per_team_game']:.2f}")

if __name__ == "__main__":
    main()
