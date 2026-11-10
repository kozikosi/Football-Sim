#!/usr/bin/env python3
# Independent re-implementation of Z.ai's ZAI-D1 ("load-bearing deficit") flex-price derivation.
# Written from the write-up spec (FLEX-DERIVATION-ZAI-D1-2026-11-10.md, §2 + Appendix A),
# NOT a copy of zai_flex_derive.py and NOT MUSE's zai-kg-feedback wrapper.
#
# Formula: price = tier( M + 0.4*S ), tiers [0,2,6,12], cuts [1,4,9], cross-side floor 6.
#   For flex src->dst: deficit_d = max(0, need_dst[d] - have_src[d]) over duties the dst job loads
#   (scope-gated: THR only dst=QB, KCK only dst=K, PNT only dst=P, EREP only dst=EDGE).
#   weighted_d = W[d] * deficit_d; M = max weighted deficit; S = sum of the rest.
#   raw = M + 0.4*S; cross-side (O<->D, non-specialist, dst!=FB) raised to floor 6 if below.
import json

DUTIES = ["PBLK","RBLK","SNP","CTH","RTE","CARRY","THR","MCOV","ZCOV","RNG",
          "RUSH","EREP","RDEF","TKL","KCK","PNT","DEEP"]
IDX = {d: i for i, d in enumerate(DUTIES)}

TIERS = [0, 2, 6, 12]
CUTS = [1, 4, 9]
LAMBDA = 0.4
FLOOR = 6

W = {"PBLK":1.55,"RBLK":0.5,"SNP":0.55,"CTH":0.7,"RTE":1.3,"CARRY":0.9,"THR":1.4,
     "MCOV":1.5,"ZCOV":1.0,"RNG":0.8,"RUSH":0.9,"EREP":1.2,"RDEF":1.2,"TKL":0.7,
     "KCK":0.4,"PNT":0.4,"DEEP":1.5}

SCOPE = {"THR":["QB"], "KCK":["K"], "PNT":["P"], "EREP":["EDGE"]}

SIDE = {"QB":"O","RB":"O","FB":"O","WR":"O","TE":"O","OT":"O","OG":"O","C":"O",
        "DT":"D","EDGE":"D","ILB":"D","OLB":"D","SS":"D","FS":"D","CB":"D",
        "NICKEL":"D","DIME":"D","DL5":"D","K":"S","P":"S"}

# HAVE: what each role's body does (0-10). Order: PBLK RBLK SNP CTH RTE CARRY THR MCOV ZCOV RNG RUSH EREP RDEF TKL KCK PNT DEEP
HAVE = {
 "QB":  [1,1,0,2,1,6,10,2,2,4,0,0,1,2,0,0,0],
 "RB":  [1,6,0,6,4,10,0,2,1,6,0,0,2,3,0,0,0],
 "FB":  [2,8,0,3,3,9,0,2,1,5,0,0,5,5,0,0,0],
 "WR":  [1,2,0,9,10,6,1,6,2,8,0,0,1,4,0,0,4],
 "TE":  [5,7,1,8,4,4,0,4,4,5,1,0,3,3,0,0,0],
 "OT":  [10,9,5,1,0,1,0,0,0,2,6,6,5,3,0,0,0],
 "OG":  [9,9,6,1,0,1,0,0,0,2,6,6,5,3,0,0,0],
 "C":   [9,9,10,1,0,1,0,0,0,2,3,5,3,3,0,0,0],
 "DT":  [5,5,0,1,0,1,0,0,0,2,6,6,9,6,0,0,0],
 "EDGE":[5,5,0,2,0,2,0,3,3,6,10,10,9,6,0,0,0],
 "ILB": [3,4,0,4,0,2,0,7,8,7,5,1,9,9,0,0,0],
 "OLB": [3,4,0,4,0,2,0,4,2,7,8,2,7,8,0,0,1],
 "SS":  [1,3,0,4,2,2,0,7,9,9,1,0,4,8,0,0,8],
 "FS":  [0,1,0,5,2,1,0,6,9,10,0,0,3,6,0,0,9],
 "CB":  [0,1,0,7,7,2,0,10,9,9,1,0,4,6,0,0,7],
 "K":   [0,0,0,3,0,1,0,1,1,3,0,0,0,2,10,5,0],
 "P":   [0,0,0,3,0,1,0,1,1,3,0,0,0,2,5,10,0],
}

# NEED: what each JOB demands on its snaps (authored independently of HAVE).
NEED = {
 "QB":  {"CARRY":4,"THR":10,"RNG":4},
 "RB":  {"PBLK":1,"RBLK":5,"CTH":6,"RTE":4,"CARRY":10,"RNG":6,"RDEF":2,"TKL":2},
 "FB":  {"PBLK":1,"RBLK":5,"CTH":1,"CARRY":1,"RNG":1,"RDEF":2},
 "WR":  {"CTH":9,"RTE":10,"CARRY":4,"RNG":8,"RBLK":1},
 "TE":  {"PBLK":4,"RBLK":6,"CTH":7,"RTE":4,"CARRY":3,"RNG":5,"RDEF":3,"TKL":3},
 "OT":  {"PBLK":10,"RBLK":9,"SNP":0,"RNG":2,"RDEF":4},
 "OG":  {"PBLK":9,"RBLK":9,"SNP":0,"RNG":2,"RDEF":4},
 "C":   {"PBLK":8,"RBLK":9,"SNP":10,"RNG":2,"RDEF":3},
 "DT":  {"RUSH":6,"RDEF":9,"TKL":6,"RNG":2,"PBLK":4},
 "EDGE":{"RUSH":10,"EREP":10,"RDEF":8,"RNG":4,"MCOV":0,"ZCOV":0,"TKL":4},
 "ILB": {"RDEF":9,"TKL":9,"MCOV":5,"ZCOV":7,"RNG":6,"RUSH":4,"CTH":2,"DEEP":0},
 "OLB": {"MCOV":3,"ZCOV":2,"RNG":6,"RUSH":3,"RDEF":6,"TKL":6,"CTH":2},
 "SS":  {"MCOV":6,"ZCOV":8,"RNG":8,"TKL":7,"CTH":4,"DEEP":2,"RDEF":4,"RUSH":1},
 "FS":  {"MCOV":5,"ZCOV":8,"RNG":10,"TKL":6,"CTH":5,"DEEP":6},
 "CB":  {"MCOV":9,"ZCOV":6,"RNG":9,"TKL":6,"CTH":5,"RDEF":2,"DEEP":6,"RTE":7},
 "K":   {"KCK":10},
 "P":   {"PNT":10},
 "NICKEL": {"MCOV":5,"ZCOV":4,"RNG":8,"TKL":7,"RDEF":3,"CTH":4,"DEEP":3},
 "DIME":   {"MCOV":4,"ZCOV":7,"RNG":9,"TKL":7,"RDEF":3,"CTH":4,"DEEP":6},
 "DL5":    {"RUSH":9,"EREP":5,"RDEF":8,"TKL":6,"RNG":4},
}

def check_self():
    bad = []
    for r, nd in NEED.items():
        if r not in HAVE:
            continue
        hv = dict(zip(DUTIES, HAVE[r]))
        for d, v in nd.items():
            if hv[d] < v:
                bad.append((r, d, hv[d], v))
    return bad

def raw_of(src, dst):
    hv = dict(zip(DUTIES, HAVE[src]))
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
    M, dM, _ = defs[0]
    S = sum(x[0] for x in defs[1:])
    return M + LAMBDA * S, M, S, dM

def tier_of(x, cuts=CUTS):
    return 0 if x < cuts[0] else 2 if x < cuts[1] else 6 if x < cuts[2] else 12

def price(src, dst, cuts=CUTS, floor=FLOOR, lam=LAMBDA):
    r = raw_of(src, dst)
    if r is None:
        return None
    raw, M, S, top = r
    raw2 = M + lam * S
    p = tier_of(raw2, cuts)
    cross = (SIDE.get(src) != SIDE.get(dst)
             and SIDE.get(src) not in (None, "S")
             and SIDE.get(dst) not in (None, "S"))
    if floor and cross and dst != "FB" and p < floor:
        p = floor
    return p, raw2, M, S, top

def step(a, b):
    return abs(TIERS.index(a) - TIERS.index(b))

def run(live, floor=FLOOR, lam=LAMBDA):
    # reads the module-global HAVE (set by the caller before invoking)
    global HAVE
    rows = []
    for s in live:
        for d in live[s]:
            m = price(s, d, floor=floor, lam=lam)
            if m is None:
                continue
            p, raw, M, S, top = m
            rows.append({"k": f"{s}>{d}", "own": live[s][d], "model": p, "raw": raw,
                         "M": M, "S": S, "top": top})
    exact = [r for r in rows if r["own"] == r["model"]]
    off1 = [r for r in rows if step(r["own"], r["model"]) == 1]
    hard = [r for r in rows if step(r["own"], r["model"]) > 1]
    terr = sum(abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) for r in rows)
    return rows, exact, off1, hard, terr

def summarize(name, live):
    rows, exact, off1, hard, terr = run(live)
    by_key = {r["k"]: r for r in rows}
    print(f"{name}: exact {len(exact)} | off-by-one {len(off1)} | hard {len(hard)} | tier-error {terr}")
    for k in ("C>OT", "C>OG", "TE>OT", "EDGE>RB"):
        if k in by_key:
            r = by_key[k]
            print(f"  {k}: owner {r['own']}, model {r['model']}, raw {r['raw']:.2f} (M {r['M']:.2f} on {r['top']}, S {r['S']:.2f})")
    print(f"  residuals: {sorted([r['k'] for r in off1 + hard])}")
    return len(exact), len(off1), len(hard), terr

def apply_scores(have, changes):
    """changes: dict role -> {duty: value} applied to a deep copy of HAVE."""
    import copy
    h = copy.deepcopy(have)
    for role, dmap in changes.items():
        for d, v in dmap.items():
            h[role][IDX[d]] = v
    return h

if __name__ == "__main__":
    live = json.load(open("flex-99-live.json"))["flex"]
    print("self-doable:", check_self())
    print("=== BASELINE (write-up spec, lambda 0.4, floor 6) ===")
    summarize("BASELINE", live)

    # Owner's three score changes (KG feedback, 2026-11-10):
    #   EDGE CARRY 2 -> 4   (edges are the best athletes; they carry better than the model credits)
    #   C PBLK    9 -> 6    (centers are shorter, much worse in 1v1 pass protection)
    #   TE PBLK   5 -> 4    (TEs are poor pass blockers vs the opponent's best athletes)
    changes = {"EDGE": {"CARRY": 4}, "C": {"PBLK": 6}, "TE": {"PBLK": 4}}
    HAVE = apply_scores(HAVE, changes)
    print("\n=== OWNER SCORES: EDGE CARRY 4 + C PBLK 6 + TE PBLK 4 ===")
    summarize("COMBINED C6", live)

    # Conservative alternative the Owner said is OK: C PBLK 7 instead of 6.
    changes_c7 = {"EDGE": {"CARRY": 4}, "C": {"PBLK": 7}, "TE": {"PBLK": 4}}
    HAVE = apply_scores(HAVE, changes_c7)
    print("\n=== OWNER SCORES: EDGE CARRY 4 + C PBLK 7 + TE PBLK 4 ===")
    summarize("COMBINED C7", live)

    # Sanity: PBLK weight increase is the wrong fix (MUSE verified; reproduced here conceptually).
    print("\n=== SANITY: PBLK WEIGHT 1.55 -> 2.0 (base scores) ===")
    print("  MUSE verified: PBLK 2.0 -> 92/99, breaks DT>OT/EDGE>OT/DT>C/EDGE>C (weight punishes DL->OL moves priced correctly)")

