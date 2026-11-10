#!/usr/bin/env python3
"""
VLOC-D2b: Refined merged formula.

Changes from VLOC-D2:
  * FB exempt from value guard (FB is the "floor exception" / free flex source
    in Inkling's design; Owner prices FB flexes cheap).
  * Value guard applies only cross-archetype (not within OL: C>OG stays duty-priced).
  * +1 non-DB->DB archetype cost (from VLOC-D1) for coverage-back transitions.
  
Archetypes:
  OL: OT OG C | DL: DT EDGE | LB: ILB OLB | DB: SS FS CB |
  BALL: QB RB WR | HYBR: TE FB | SPEC: K P
"""

import json, math

TIERS = [0, 2, 6, 12]
CUTS = (1.0, 4.0, 9.0)
PHI = 0.4
REFGAP = 20.0
FLOOR = 6.0
ARCH_T = 1.0

DUTIES = ["PBLK", "RBLK", "SNP", "CTH", "RTE", "CARRY", "THR",
          "MCOV", "ZCOV", "RNG", "ERUSH", "BRUSH", "RDEF", "TKL", "KCK", "PNT"]

SCOPE = {"THR": ["QB"], "KCK": ["K"], "PNT": ["P"]}

SIDE = {"QB": "O", "RB": "O", "FB": "O", "WR": "O", "TE": "O", "OT": "O",
        "OG": "O", "C": "O", "DT": "D", "EDGE": "D", "ILB": "D", "OLB": "D",
        "SS": "D", "FS": "D", "CB": "D", "K": "S", "P": "S"}

ARCH = {
    "QB": "BALL", "RB": "BALL", "FB": "HYBR", "WR": "BALL", "TE": "HYBR",
    "OT": "OL", "OG": "OL", "C": "OL", "DT": "DL", "EDGE": "DL",
    "ILB": "LB", "OLB": "LB", "SS": "DB", "FS": "DB", "CB": "DB",
    "K": "SPEC", "P": "SPEC",
}
DB_DST = {"SS", "FS", "CB", "NICKEL", "DIME"}
DB_SRC = {"SS", "FS", "CB"}

SLOT_W = {"QB": 1000, "WR": 650, "OT": 500, "OG": 400, "C": 200,
          "TE": 250, "RB": 250, "FB": 25, "EDGE": 650, "DT": 500,
          "ILB": 300, "OLB": 200, "CB": 400, "NICKEL": 100, "DIME": 50,
          "FS": 300, "SS": 300, "K": 50, "P": 50}

W = {"PBLK": 1.5, "RBLK": 0.5, "SNP": 0.6, "CTH": 0.7, "RTE": 1.3,
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


def value_guard(src, dst):
    """Claude's no-arbitrage guard: V = refGap*(1 - w_src/w_dst) when moving up
    the value ladder. Only applies cross-archetype and when src is not FB
    (FB is the floor exception). Computed from slot weights alone."""
    if src == "FB":
        return 0.0
    if ARCH.get(src) == ARCH.get(dst):
        return 0.0
    ws = SLOT_W.get(src, 0)
    wd = SLOT_W.get(dst, 0)
    if wd <= ws:
        return 0.0
    return REFGAP * (1.0 - ws / wd)


def weighted_gaps(src, dst):
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


def aptitude(gaps):
    if not gaps:
        return 0.0
    w1 = gaps[0]
    rest_cap = sum(min(g, w1) for g in gaps[1:])
    return w1 + PHI * rest_cap


def archetype_cost(src, dst, duty_raw):
    """+1 when a non-DB plays a DB destination (and duty gap > 0)."""
    if duty_raw <= 0:
        return 0.0
    if src not in DB_SRC and dst in DB_DST:
        return ARCH_T
    return 0.0


def tier_of(x):
    return 0 if x < CUTS[0] else 2 if x < CUTS[1] else 6 if x < CUTS[2] else 12


def price(src, dst):
    gaps = weighted_gaps(src, dst)
    A = aptitude(gaps)
    V = value_guard(src, dst)
    T = archetype_cost(src, dst, A)
    raw = max(A, V) + T
    p = tier_of(raw)
    cross = (SIDE.get(src) != SIDE.get(dst)
             and SIDE.get(src) not in (None, "S")
             and SIDE.get(dst) not in (None, "S"))
    if cross and dst != "FB" and p < FLOOR:
        p = FLOOR
    return p, raw, A, V, T


def run(live):
    rows = []
    for src in live:
        for dst, own in live[src].items():
            p, raw, A, V, T = price(src, dst)
            rows.append({"k": f"{src}>{dst}", "own": own, "model": p,
                         "raw": raw, "A": A, "V": V, "T": T})
    exact = [r for r in rows if r["own"] == r["model"]]
    off1 = [r for r in rows
            if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) == 1]
    hard = [r for r in rows
            if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) > 1]
    terr = sum(abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) for r in rows)
    return rows, exact, off1, hard, terr


def main():
    live = json.load(open("flex-live.json"))["flex"]
    rows, exact, off1, hard, terr = run(live)
    print(f"VLOC-D2b (merged: aptitude + value guard + archetype cost): "
          f"exact {len(exact)} / off-1 {len(off1)} / hard {len(hard)} / tier-error {terr}")
    print(f"  phi={PHI}, refGap={REFGAP}, arch_T={ARCH_T}, cuts={CUTS}, floor={FLOOR}")
    by_key = {r["k"]: r for r in rows}
    for k in sorted(by_key):
        r = by_key[k]
        if r["own"] != r["model"]:
            step = abs(TIERS.index(r["own"]) - TIERS.index(r["model"]))
            tag = "HARD" if step > 1 else ("off-1" if step == 1 else "exact")
            tags = []
            if r["V"] > 0 and r["V"] >= r["A"]:
                tags.append("[GUARD]")
            if r["T"] > 0:
                tags.append("[ARCH]")
            tag_s = " " + "".join(tags) if tags else ""
            print(f"  {tag:6} {k}: owner {r['own']}, model {r['model']}, "
                  f"raw {r['raw']:.2f} (A {r['A']:.2f}, V {r['V']:.2f}, T {r['T']:.2f}){tag_s}")


if __name__ == "__main__":
    main()
