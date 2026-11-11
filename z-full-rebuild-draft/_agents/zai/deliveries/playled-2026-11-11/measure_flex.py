#!/usr/bin/env python3
"""measure_flex.py — the PLAYLED flex-pricing experiment (Receipt F of the design doc).

Prices the four known hard rows from play outcomes alone: two worlds (natural roster vs the
flex applied) under identical seeds; price = points lost / points-per-OVR slope at the
destination slot, where the slope is measured by the prototype itself (+10 OVR probe).

Defensive rows are measured on the opposing offense (the flexed team's defense costs the
OTHER team points), with the slope probed the same way. Offensive rows measure their own team.

Run:  python3 measure_flex.py [--games 1500]
Output: flex_results.json (also the design doc's table).
"""
import argparse, json, playsim as P

BASE = P.flat(80)
SEED = 770000

def world(flexH=None, flexA=None, rosterH=None, rosterA=None, games=1500):
    t, _ = P.run_games(games, rosterH or BASE, rosterA or BASE, SEED, flexH=flexH, flexA=flexA)
    return t

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--games", type=int, default=1500)
    a = ap.parse_args()
    G = a.games
    base = world(games=G)
    bpH, bpA = base["points"]["mean"], base["A_points"]["mean"]
    print(f"baseline points: home {bpH:.2f}, away {bpA:.2f} ({G} paired-seed games)")

    def slope_off(slot):
        up = dict(BASE); up[slot] = 90
        return (world(rosterH=up)["points"]["mean"] - bpH) / 10.0

    def slope_def(slot):
        up = dict(BASE); up[slot] = 90
        return (bpH - world(rosterA=up)["points"]["mean"]) / 10.0

    rows = [("C>OT", "H", {"OT1": "C", "C": "OT"}, "OT1"),
            ("FB>RB", "H", {"RB1": "FB", "FB": "RB"}, "RB1"),
            ("FB>TE", "H", {"TE1": "FB", "FB": "TE"}, "TE1"),
            ("OLB>FS", "A", {"FS": "OLB", "OLB": "FS"}, "FS")]
    owner = {"C>OT": 12, "FB>RB": 2, "FB>TE": 6, "OLB>FS": 12}
    ledger = {"C>OT": 12, "FB>RB": 2, "FB>TE": 2, "OLB>FS": 6}
    print(f'{"row":8s} {"pts lost":>9s} {"slope":>7s} {"PRICE":>6s} {"Owner":>6s} {"Ledger":>7s} {"err":>5s}')
    res = {}
    for name, side, flex, slot in rows:
        if side == "H":
            t = world(flexH=flex); pts = bpH - t["points"]["mean"]; sl = slope_off(slot)
        else:
            t = world(flexA=flex); pts = bpH - t["points"]["mean"]; sl = slope_def(slot)
        price = pts / sl
        res[name] = {"side": side, "pts_lost": pts, "slope": sl, "price": price,
                     "owner": owner[name], "ledger": ledger[name]}
        print(f'{name:8s} {pts:9.2f} {sl:7.3f} {price:6.1f} {owner[name]:6d} {ledger[name]:7d} {abs(price-owner[name]):5.1f}')
    json.dump({"baseline_home": bpH, "baseline_away": bpA, "games_per_world": G, "seed": SEED, "rows": res},
              open("flex_results.json", "w"), indent=1)
    print("saved flex_results.json")

if __name__ == "__main__":
    main()
