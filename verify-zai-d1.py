#!/usr/bin/env python3
"""
VLOC independent re-implementation of Z.ai's ZAI-D1 flex-price derivation
("the load-bearing deficit"), 2026-11-10.

Written from Z.ai's write-up (zai_flex_derive.py, REV 3) — NOT MUSE's test
script, which is not re-run here. Z.ai's design, in his own words:

    ZAI-D1:  tier( M + lambda*S ), M = worst load-bearing deficit,
             S = the rest at a discount. NO D term at all.
             NEED and HAVE are separate matrices; need[X] <= have[X].
    Floor: cross-side (O<->D, non-specialist, dst != FB) never cheaper
           than 6 — POLICY. tier cuts 1/4/9 -> tiers 0/2/6/12.

Applied score changes (Owner / KG, 2026-11-10, all score cells, no patches):
    EDGE CARRY 2 -> 4   (edges are the best athletes; carry better than credited)
    C   PBLK 9 -> 6     (centers worse in 1-on-1 pass protection than credited)
    TE  PBLK 5 -> 4     (OTs superior in 1-on-1 pass protection)

Variants checked against the live 99-rule table (flex.json @ 97d7e9d):
    V0 baseline:                 ZAI-D1 as authored             -> expect 95/3/1
    V1 EDGE CARRY 4 only         -> expect 96/2/1
    V2 C PBLK 6 only             -> expect 96/3/0
    V3 EDGE CARRY 4 + C PBLK 6   -> expect 97/2/0
    V4 ... + TE PBLK 4           -> expect 98/1/0, only C>OT off by one
    V5 C PBLK 7 instead of 6     -> expect 97/99
    V6 C PBLK 4 instead of 6     -> expect 99/99
"""

import json

TIERS = [0, 2, 6, 12]
CUTS = (1, 4, 9)
LAMBDA = 0.4
FLOOR = 6

DUTIES = ["PBLK", "RBLK", "SNP", "CTH", "RTE", "CARRY", "THR", "MCOV",
          "ZCOV", "RNG", "RUSH", "EREP", "RDEF", "TKL", "KCK", "PNT", "DEEP"]

W = {"PBLK": 1.55, "RBLK": 0.5, "SNP": 0.55, "CTH": 0.7, "RTE": 1.3,
     "CARRY": 0.9, "THR": 1.4, "MCOV": 1.5, "ZCOV": 1.0, "RNG": 0.8,
     "RUSH": 0.9, "EREP": 1.2, "RDEF": 1.2, "TKL": 0.7, "KCK": 0.4,
     "PNT": 0.4, "DEEP": 1.5}

# Duty a job is scoped to: only charged for that destination role.
SCOPE = {"THR": ["QB"], "KCK": ["K"], "PNT": ["P"], "EREP": ["EDGE"]}

# HAVE: what the role's body does (0-10), in DUTIES order.
HAVE = {
    "QB":  [1, 1, 0, 2, 1, 6, 10, 2, 2, 4, 0, 0, 1, 2, 0, 0, 0],
    "RB":  [1, 6, 0, 6, 4, 10, 0, 2, 1, 6, 0, 0, 2, 3, 0, 0, 0],
    "FB":  [2, 8, 0, 3, 3, 9, 0, 2, 1, 5, 0, 0, 5, 5, 0, 0, 0],
    "WR":  [1, 2, 0, 9, 10, 6, 1, 6, 2, 8, 0, 0, 1, 4, 0, 0, 4],
    "TE":  [5, 7, 1, 8, 4, 4, 0, 4, 4, 5, 1, 0, 3, 3, 0, 0, 0],
    "OT":  [10, 9, 5, 1, 0, 1, 0, 0, 0, 2, 6, 6, 5, 3, 0, 0, 0],
    "OG":  [9, 9, 6, 1, 0, 1, 0, 0, 0, 2, 6, 6, 5, 3, 0, 0, 0],
    "C":   [9, 9, 10, 1, 0, 1, 0, 0, 0, 2, 3, 5, 3, 3, 0, 0, 0],
    "DT":  [5, 5, 0, 1, 0, 1, 0, 0, 0, 2, 6, 6, 9, 6, 0, 0, 0],
    "EDGE":[5, 5, 0, 2, 0, 2, 0, 3, 3, 6, 10, 10, 9, 6, 0, 0, 0],
    "ILB": [3, 4, 0, 4, 0, 2, 0, 7, 8, 7, 5, 1, 9, 9, 0, 0, 0],
    "OLB": [3, 4, 0, 4, 0, 2, 0, 4, 2, 7, 8, 2, 7, 8, 0, 0, 1],
    "SS":  [1, 3, 0, 4, 2, 2, 0, 7, 9, 9, 1, 0, 4, 8, 0, 0, 8],
    "FS":  [0, 1, 0, 5, 2, 1, 0, 6, 9, 10, 0, 0, 3, 6, 0, 0, 9],
    "CB":  [0, 1, 0, 7, 7, 2, 0, 10, 9, 9, 1, 0, 4, 6, 0, 0, 7],
    "K":   [0, 0, 0, 3, 0, 1, 0, 1, 1, 3, 0, 0, 0, 2, 10, 5, 0],
    "P":   [0, 0, 0, 3, 0, 1, 0, 1, 1, 3, 0, 0, 0, 2, 5, 10, 0],
}

# NEED: what each job demands on its snaps (authored independently of HAVE).
NEED = {
    "QB":  {"CARRY": 4, "THR": 10, "RNG": 4},
    "RB":  {"PBLK": 1, "RBLK": 5, "CTH": 6, "RTE": 4, "CARRY": 10, "RNG": 6,
            "RDEF": 2, "TKL": 2},
    "FB":  {"PBLK": 1, "RBLK": 5, "CTH": 1, "CARRY": 1, "RNG": 1, "RDEF": 2},
    "WR":  {"CTH": 9, "RTE": 10, "CARRY": 4, "RNG": 8, "RBLK": 1},
    "TE":  {"PBLK": 4, "RBLK": 6, "CTH": 7, "RTE": 4, "CARRY": 3, "RNG": 5,
            "RDEF": 3, "TKL": 3},
    "OT":  {"PBLK": 10, "RBLK": 9, "RNG": 2, "RDEF": 4},
    "OG":  {"PBLK": 9, "RBLK": 9, "RNG": 2, "RDEF": 4},
    "C":   {"PBLK": 8, "RBLK": 9, "SNP": 10, "RNG": 2, "RDEF": 3},
    "DT":  {"RUSH": 6, "RDEF": 9, "TKL": 6, "RNG": 2, "PBLK": 4},
    "EDGE": {"RUSH": 10, "EREP": 10, "RDEF": 8, "RNG": 4, "MCOV": 0, "ZCOV": 0,
             "TKL": 4},
    "ILB": {"RDEF": 9, "TKL": 9, "MCOV": 5, "ZCOV": 7, "RNG": 6, "RUSH": 4,
            "CTH": 2, "DEEP": 0},
    "OLB": {"MCOV": 3, "ZCOV": 2, "RNG": 6, "RUSH": 3, "RDEF": 6, "TKL": 6,
            "CTH": 2},
    "SS":  {"MCOV": 6, "ZCOV": 8, "RNG": 8, "TKL": 7, "CTH": 4, "DEEP": 2,
            "RDEF": 4, "RUSH": 1},
    "FS":  {"MCOV": 5, "ZCOV": 8, "RNG": 10, "TKL": 6, "CTH": 5, "DEEP": 6},
    "CB":  {"MCOV": 9, "ZCOV": 6, "RNG": 9, "TKL": 6, "CTH": 5, "RDEF": 2,
            "DEEP": 6, "RTE": 7},
    "K":   {"KCK": 10},
    "P":   {"PNT": 10},
    # situational jobs (destinations in the live table; never sources)
    "NICKEL": {"MCOV": 5, "ZCOV": 4, "RNG": 8, "TKL": 7, "RDEF": 3,
               "CTH": 4, "DEEP": 3},
    "DIME":   {"MCOV": 4, "ZCOV": 7, "RNG": 9, "TKL": 7, "RDEF": 3,
               "CTH": 4, "DEEP": 6},
}

SIDE = {"QB": "O", "RB": "O", "FB": "O", "WR": "O", "TE": "O", "OT": "O",
        "OG": "O", "C": "O", "DT": "D", "EDGE": "D", "ILB": "D", "OLB": "D",
        "SS": "D", "FS": "D", "CB": "D", "NICKEL": "D", "DIME": "D", "K": "S",
        "P": "S"}


def apply_score_changes(have, edge_carry=None, c_pblk=None, te_pblk=None):
    h = {k: list(v) for k, v in have.items()}
    i = DUTIES.index("CARRY")
    p = DUTIES.index("PBLK")
    if edge_carry is not None:
        h["EDGE"][i] = edge_carry
    if c_pblk is not None:
        h["C"][p] = c_pblk
    if te_pblk is not None:
        h["TE"][p] = te_pblk
    return h


def raw_of(src, dst, have):
    """M + lambda*S over scoped positive deficits (need - have), weighted."""
    hv = dict(zip(DUTIES, have[src]))
    nd = NEED.get(dst)
    if nd is None:
        return None
    defs = []
    for d, v in nd.items():
        sc = SCOPE.get(d)
        if sc and dst not in sc:
            continue
        deficit = v - hv[d]
        if deficit > 0:
            defs.append((W[d] * deficit, d, deficit))
    if not defs:
        return 0.0, 0.0, 0.0, None
    defs.sort(reverse=True)
    M = defs[0][0]
    S = sum(x[0] for x in defs[1:])
    return M + LAMBDA * S, M, S, defs[0][1]


def tier_of(x):
    return 0 if x < CUTS[0] else 2 if x < CUTS[1] else 6 if x < CUTS[2] else 12


def price(src, dst, have, floor=FLOOR):
    out = raw_of(src, dst, have)
    if out is None:
        return None
    raw, M, S, top = out
    p = tier_of(raw)
    cross = (SIDE.get(src) != SIDE.get(dst)
             and SIDE.get(src) not in (None, "S")
             and SIDE.get(dst) not in (None, "S"))
    if cross and dst != "FB" and p < floor:
        p = floor
    return p, raw, M, S, top


def run(live, have, floor=FLOOR):
    rows = []
    for src in live:
        for dst, own in live[src].items():
            m = price(src, dst, have, floor=floor)
            if m is None:
                continue
            p, raw, M, S, top = m
            rows.append({"k": f"{src}>{dst}", "own": own, "model": p,
                         "raw": raw, "M": M, "S": S, "top": top})
    exact = [r for r in rows if r["own"] == r["model"]]
    off1 = [r for r in rows if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) == 1]
    hard = [r for r in rows if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) > 1]
    terr = sum(abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) for r in rows)
    return rows, exact, off1, hard, terr


def show(name, live, have, floor=FLOOR):
    rows, exact, off1, hard, terr = run(live, have, floor=floor)
    by_key = {r["k"]: r for r in rows}
    print(f"{name}: exact {len(exact)} / off-by-one {len(off1)} / hard {len(hard)} "
          f"/ tier-error {terr}")
    for k in ("C>OT", "C>OG", "TE>OT", "EDGE>RB"):
        r = by_key.get(k)
        if r:
            print(f"  {k}: owner {r['own']}, model {r['model']}, raw {r['raw']:.2f}"
                  f" (M {r['M']:.2f} on {r['top']}, S {r['S']:.2f})")
    print(f"  residuals: {sorted(r['k'] for r in off1 + hard)}")
    return len(exact), len(off1), len(hard), terr


def main():
    live = json.load(open("flex-live.json"))["flex"]
    base = HAVE
    variants = [
        ("V0 baseline (as authored)", dict(base)),
        ("V1 EDGE CARRY 4", apply_score_changes(base, edge_carry=4)),
        ("V2 C PBLK 6", apply_score_changes(base, c_pblk=6)),
        ("V3 EDGE CARRY 4 + C PBLK 6", apply_score_changes(base, edge_carry=4, c_pblk=6)),
        ("V4 + TE PBLK 4  (edge4, c6, te4)", apply_score_changes(base, edge_carry=4, c_pblk=6, te_pblk=4)),
        ("V5 edge4 + C PBLK 7 + te4", apply_score_changes(base, edge_carry=4, c_pblk=7, te_pblk=4)),
        ("V6 edge4 + C PBLK 4 + te4", apply_score_changes(base, edge_carry=4, c_pblk=4, te_pblk=4)),
    ]
    for name, have in variants:
        print(f"\n=== {name} ===")
        show(name, live, have)


if __name__ == "__main__":
    main()
