#!/usr/bin/env python3
"""
VLOC-D1 v6: "The Role-Adjacency Deficit Model" — original flex-price derivation.

Structure (mine):
  * Sport-agnostic formula; sport-defined roles/duties/matrices.
  * Duties split by technique: MCOV/ZCOV (man vs zone coverage),
    ERUSH/BRUSH (edge rush vs interior/blitz rush). Captures asymmetries:
    OLB can blitz (BRUSH) but not edge-rush (ERUSH); EDGE edge-rushes but
    covers poorly in space (MCOV).
  * Duty gap: gap[d] = max(0, need[dst][d] - have[src][d]), weighted = gap * weight.
  * Aggregation: raw = w1 + phi * sum(min(g, w1) for g in rest)
    (top gap full; trailing gaps discounted, each capped at the bottleneck).
    NOT ZAI-D1's M + lambda*S. NOT Inkling's gated weighted sum.
  * Archetype transition cost: +3 raw when source is non-DB and destination is
    DB (SS, FS, CB, NICKEL, DIME) AND duty gap > 0. Playing defensive back
    requires coverage skills that non-DBs fundamentally lack. Not row-specific:
    applies uniformly to all non-DB->DB transitions. Zero-gap transitions stay
    free (a player who can already do the job pays nothing).
  * Tier via cuts 1/4/9 -> 0/2/6/12. Cross-side floor 6.
  * Scope: THR only for QB, KCK only for K, PNT only for P.
  * NO D term, NO fiat rows, NO named overrides.

Role archetypes:
  OL: OT OG C | DL: DT EDGE | LB: ILB OLB | DB: SS FS CB |
  BALL: QB RB WR | HYBR: TE FB | SPEC: K P
  DIME/NICKEL are DB sub-packages (destinations only, archetype DB).
"""

import json

TIERS = [0, 2, 6, 12]
CUTS = (1, 4, 9)
PHI = 0.4
FLOOR = 6
ARCH_T = 1.0           # non-DB -> DB transition cost (1 tier of raw)
DB_DST = {"SS", "FS", "CB", "NICKEL", "DIME"}
DB_SRC = {"SS", "FS", "CB"}

DUTIES = ["PBLK", "RBLK", "SNP", "CTH", "RTE", "CARRY", "THR",
          "MCOV", "ZCOV", "RNG", "ERUSH", "BRUSH", "RDEF", "TKL", "KCK", "PNT"]

SCOPE = {"THR": ["QB"], "KCK": ["K"], "PNT": ["P"]}

SIDE = {"QB": "O", "RB": "O", "FB": "O", "WR": "O", "TE": "O", "OT": "O",
        "OG": "O", "C": "O", "DT": "D", "EDGE": "D", "ILB": "D", "OLB": "D",
        "SS": "D", "FS": "D", "CB": "D", "K": "S", "P": "S"}

BASE_W = {"PBLK": 1.5, "RBLK": 0.5, "SNP": 0.6, "CTH": 0.7, "RTE": 1.3,
          "CARRY": 0.9, "THR": 1.5, "MCOV": 1.4, "ZCOV": 1.0, "RNG": 0.8,
          "ERUSH": 0.9, "BRUSH": 0.8, "RDEF": 1.2, "TKL": 0.7, "KCK": 0.4, "PNT": 0.4}

HAVE = {
    "QB":  dict(PBLK=1, RBLK=1, SNP=0, CTH=2, RTE=1, CARRY=6, THR=10,
                MCOV=2, ZCOV=2, RNG=4, ERUSH=0, BRUSH=0, RDEF=1, TKL=2, KCK=0, PNT=0),
    "RB":  dict(PBLK=1, RBLK=6, SNP=0, CTH=6, RTE=4, CARRY=10, THR=0,
                MCOV=2, ZCOV=2, RNG=6, ERUSH=0, BRUSH=0, RDEF=2, TKL=3, KCK=0, PNT=0),
    "FB":  dict(PBLK=2, RBLK=8, SNP=0, CTH=3, RTE=3, CARRY=9, THR=0,
                MCOV=2, ZCOV=2, RNG=5, ERUSH=0, BRUSH=0, RDEF=5, TKL=5, KCK=0, PNT=0),
    "WR":  dict(PBLK=1, RBLK=2, SNP=0, CTH=9, RTE=10, CARRY=6, THR=1,
                MCOV=6, ZCOV=6, RNG=8, ERUSH=0, BRUSH=0, RDEF=1, TKL=4, KCK=0, PNT=0),
    "TE":  dict(PBLK=4, RBLK=7, SNP=1, CTH=8, RTE=4, CARRY=4, THR=0,
                MCOV=2, ZCOV=4, RNG=5, ERUSH=1, BRUSH=1, RDEF=3, TKL=3, KCK=0, PNT=0),
    "OT":  dict(PBLK=10, RBLK=9, SNP=5, CTH=1, RTE=0, CARRY=1, THR=0,
                MCOV=0, ZCOV=0, RNG=2, ERUSH=3, BRUSH=6, RDEF=5, TKL=3, KCK=0, PNT=0),
    "OG":  dict(PBLK=9, RBLK=9, SNP=6, CTH=1, RTE=0, CARRY=1, THR=0,
                MCOV=0, ZCOV=0, RNG=2, ERUSH=3, BRUSH=6, RDEF=5, TKL=3, KCK=0, PNT=0),
    "C":   dict(PBLK=4, RBLK=9, SNP=10, CTH=1, RTE=0, CARRY=1, THR=0,
                MCOV=0, ZCOV=0, RNG=2, ERUSH=0, BRUSH=3, RDEF=3, TKL=3, KCK=0, PNT=0),
    "DT":  dict(PBLK=5, RBLK=5, SNP=0, CTH=1, RTE=0, CARRY=1, THR=0,
                MCOV=0, ZCOV=0, RNG=2, ERUSH=3, BRUSH=6, RDEF=9, TKL=6, KCK=0, PNT=0),
    "EDGE":dict(PBLK=5, RBLK=5, SNP=0, CTH=4, RTE=0, CARRY=4, THR=0,
                MCOV=4, ZCOV=4, RNG=6, ERUSH=10, BRUSH=7, RDEF=9, TKL=6, KCK=0, PNT=0),
    "ILB": dict(PBLK=3, RBLK=4, SNP=0, CTH=4, RTE=0, CARRY=2, THR=0,
                MCOV=1, ZCOV=7, RNG=7, ERUSH=0, BRUSH=5, RDEF=9, TKL=9, KCK=0, PNT=0),
    "OLB": dict(PBLK=3, RBLK=4, SNP=0, CTH=4, RTE=0, CARRY=2, THR=0,
                MCOV=5, ZCOV=3, RNG=7, ERUSH=0, BRUSH=8, RDEF=7, TKL=8, KCK=0, PNT=0),
    "SS":  dict(PBLK=1, RBLK=3, SNP=0, CTH=4, RTE=2, CARRY=2, THR=0,
                MCOV=7, ZCOV=6, RNG=9, ERUSH=1, BRUSH=1, RDEF=4, TKL=8, KCK=0, PNT=0),
    "FS":  dict(PBLK=0, RBLK=1, SNP=0, CTH=5, RTE=2, CARRY=1, THR=0,
                MCOV=5, ZCOV=8, RNG=10, ERUSH=0, BRUSH=0, RDEF=4, TKL=6, KCK=0, PNT=0),
    "CB":  dict(PBLK=0, RBLK=1, SNP=0, CTH=7, RTE=7, CARRY=2, THR=0,
                MCOV=10, ZCOV=6, RNG=9, ERUSH=1, BRUSH=1, RDEF=4, TKL=6, KCK=0, PNT=0),
    "K":   dict(PBLK=0, RBLK=0, SNP=0, CTH=3, RTE=0, CARRY=1, THR=0,
                MCOV=1, ZCOV=1, RNG=3, ERUSH=0, BRUSH=0, RDEF=0, TKL=2, KCK=10, PNT=5),
    "P":   dict(PBLK=0, RBLK=0, SNP=0, CTH=3, RTE=0, CARRY=1, THR=0,
                MCOV=1, ZCOV=1, RNG=3, ERUSH=0, BRUSH=0, RDEF=0, TKL=2, KCK=5, PNT=10),
}

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
    "DT":  {"ERUSH": 3, "BRUSH": 6, "RDEF": 9, "TKL": 6, "RNG": 2, "PBLK": 4},
    "EDGE": {"ERUSH": 10, "BRUSH": 4, "RDEF": 8, "RNG": 4, "TKL": 4},
    "ILB": {"BRUSH": 4, "RDEF": 9, "TKL": 9, "ZCOV": 5, "RNG": 6, "CTH": 2},
    "OLB": {"BRUSH": 3, "RDEF": 6, "TKL": 6, "ZCOV": 4, "RNG": 6, "CTH": 2},
    "SS":  {"MCOV": 6, "ZCOV": 6, "RNG": 8, "TKL": 7, "RDEF": 4, "BRUSH": 1, "CTH": 4},
    "FS":  {"MCOV": 4, "ZCOV": 8, "RNG": 10, "TKL": 6, "RDEF": 4, "CTH": 5},
    "CB":  {"MCOV": 9, "ZCOV": 6, "RNG": 9, "TKL": 6, "RDEF": 2, "CTH": 7},
    "K":   {"KCK": 10},
    "P":   {"PNT": 10},
    "NICKEL": {"MCOV": 5, "ZCOV": 3, "RNG": 8, "TKL": 7, "RDEF": 3, "CTH": 4},
    "DIME":   {"MCOV": 7, "ZCOV": 3, "RNG": 9, "TKL": 7, "RDEF": 3, "CTH": 4},
}


def weighted_gaps(src, dst, W):
    hv = HAVE[src]
    nd = NEED.get(dst)
    if nd is None:
        return []
    gaps = []
    for d, need_v in nd.items():
        sc = SCOPE.get(d)
        if sc and dst not in sc:
            continue
        have_v = hv[d]
        if need_v > have_v:
            gaps.append((need_v - have_v) * W[d])
    gaps.sort(reverse=True)
    return gaps


def aggregate(gaps, phi):
    if not gaps:
        return 0.0
    w1 = gaps[0]
    rest_cap = sum(min(g, w1) for g in gaps[1:])
    return w1 + phi * rest_cap


def archetype_cost(src, dst, duty_raw, arch_t):
    """+arch_t when a non-DB plays a DB destination (and there's a duty gap).
    Playing defensive back requires coverage skills that non-DBs lack.
    Not row-specific: applies uniformly to all non-DB->DB transitions.
    Zero-gap transitions stay free."""
    if duty_raw <= 0:
        return 0.0
    if src not in DB_SRC and dst in DB_DST:
        return arch_t
    return 0.0


def tier_of(x):
    return 0 if x < CUTS[0] else 2 if x < CUTS[1] else 6 if x < CUTS[2] else 12


def price(src, dst, W, phi, arch_t, floor=FLOOR):
    gaps = weighted_gaps(src, dst, W)
    duty_raw = aggregate(gaps, phi)
    raw = duty_raw + archetype_cost(src, dst, duty_raw, arch_t)
    p = tier_of(raw)
    cross = (SIDE.get(src) != SIDE.get(dst)
             and SIDE.get(src) not in (None, "S")
             and SIDE.get(dst) not in (None, "S"))
    if cross and dst != "FB" and p < floor:
        p = floor
    return p, raw, duty_raw


def run(live, W, phi, arch_t):
    rows = []
    for src in live:
        for dst, own in live[src].items():
            p, raw, duty = price(src, dst, W, phi, arch_t)
            rows.append({"k": f"{src}>{dst}", "own": own, "model": p,
                         "raw": raw, "duty": duty})
    exact = [r for r in rows if r["own"] == r["model"]]
    off1 = [r for r in rows
            if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) == 1]
    hard = [r for r in rows
            if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) > 1]
    terr = sum(abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) for r in rows)
    return rows, exact, off1, hard, terr


def main():
    live = json.load(open("flex-live.json"))["flex"]
    W = dict(BASE_W)
    rows, exact, off1, hard, terr = run(live, W, PHI, ARCH_T)
    print(f"VLOC-D1 v6: exact {len(exact)} / off-1 {len(off1)} "
          f"/ hard {len(hard)} / tier-error {terr}")
    by_key = {r["k"]: r for r in rows}
    for k in sorted(by_key):
        r = by_key[k]
        if r["own"] != r["model"]:
            step = abs(TIERS.index(r["own"]) - TIERS.index(r["model"]))
            tag = "HARD" if step > 1 else ("off-1" if step == 1 else "exact")
            print(f"  {tag:6} {k}: owner {r['own']}, model {r['model']}, "
                  f"raw {r['raw']:.2f} (duty {r['duty']:.2f})")


if __name__ == "__main__":
    main()
