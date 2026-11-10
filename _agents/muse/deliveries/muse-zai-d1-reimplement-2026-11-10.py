#!/usr/bin/env python3
"""Independent re-implementation of ZAI-D1 from the write-up (MUSE, 2026-11-10).

Council work Option A: verify the ZAI-D1 + Owner score changes independently.
This script does NOT import or run Z.ai's script. It is written from the
write-up text alone (FLEX-DERIVATION-ZAI-D1-2026-11-10.md, sections 2-3 and
Appendix A) and compared against the live 99-rule table.

Formula (write-up section 2):
  deficit_d = max(0, need_dst[d] - have_src[d])
  M = max over loaded duties of (k_d * deficit_d)
  S = sum of the remaining k_d * deficit_d
  price = tier(M + 0.4 * S)
  cuts 1/4/9, tiers 0/2/6/12.
  Cross-side floor 6 as policy (offense <-> defense, non-specialist,
  dst != FB; FB and K/P exempt).

Loaded duties = duties in the destination's NEED profile, restricted by
scope: THR only for dst=QB, KCK only for dst=K, PNT only for dst=P,
EREP only for dst=EDGE.

Score changes under test (Owner's feedback, 2026-11-10):
  EDGE CARRY 2 -> 4 (edges are the best athletes)
  C PBLK 9 -> 6 (centers much worse in one-on-one pass protection)
  TE PBLK 5 -> 4 (OTs superior in one-on-one pass protection)
  Also tested: C PBLK 7.

Usage: python3 muse-zai-d1-reimplement-2026-11-10.py <flex.json>
"""
import json, sys

DUTIES = ["PBLK", "RBLK", "SNP", "CTH", "RTE", "CARRY", "THR", "MCOV",
          "ZCOV", "RNG", "RUSH", "EREP", "RDEF", "TKL", "KCK", "PNT", "DEEP"]
W = {"PBLK": 1.55, "RBLK": 0.5, "SNP": 0.55, "CTH": 0.7, "RTE": 1.3,
     "CARRY": 0.9, "THR": 1.4, "MCOV": 1.5, "ZCOV": 1.0, "RNG": 0.8,
     "RUSH": 0.9, "EREP": 1.2, "RDEF": 1.2, "TKL": 0.7, "KCK": 0.4,
     "PNT": 0.4, "DEEP": 1.5}
SCOPE = {"THR": ["QB"], "KCK": ["K"], "PNT": ["P"], "EREP": ["EDGE"]}
LAMBDA = 0.4
CUTS = [1, 4, 9]
TIERS = [0, 2, 6, 12]
OFFENSE = {"QB", "RB", "FB", "WR", "TE", "OT", "OG", "C"}
DEFENSE = {"DT", "EDGE", "ILB", "OLB", "SS", "FS", "CB", "NICKEL", "DIME"}

# HAVE, from Appendix A (columns in DUTIES order).
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
# NEED, from Appendix A (only the duties the job loads; 0 means not loaded).
NEED = {
 "QB":  {"THR": 10, "CARRY": 4, "RNG": 4},
 "RB":  {"CARRY": 10, "PBLK": 1, "RBLK": 5, "CTH": 6, "RTE": 4, "RNG": 6, "RDEF": 2, "TKL": 2},
 "FB":  {"PBLK": 1, "RBLK": 5, "CTH": 1, "CARRY": 1, "RNG": 1, "RDEF": 2},
 "WR":  {"CTH": 9, "RTE": 10, "CARRY": 4, "RNG": 8, "RBLK": 1},
 "TE":  {"PBLK": 4, "RBLK": 6, "CTH": 7, "RTE": 4, "CARRY": 3, "RNG": 5, "RDEF": 3, "TKL": 3},
 "OT":  {"PBLK": 10, "RBLK": 9, "RNG": 2, "RDEF": 4},
 "OG":  {"PBLK": 9, "RBLK": 9, "RNG": 2, "RDEF": 4},
 "C":   {"PBLK": 8, "RBLK": 9, "SNP": 10, "RNG": 2, "RDEF": 3},
 "DT":  {"RUSH": 6, "RDEF": 9, "TKL": 6, "RNG": 2, "PBLK": 4},
 "EDGE":{"RUSH": 10, "EREP": 10, "RDEF": 8, "RNG": 4, "TKL": 4},
 "ILB": {"RDEF": 9, "TKL": 9, "MCOV": 5, "ZCOV": 7, "RNG": 6, "RUSH": 4, "CTH": 2},
 "OLB": {"MCOV": 3, "ZCOV": 2, "RNG": 6, "RUSH": 3, "RDEF": 6, "TKL": 6, "CTH": 2},
 "SS":  {"MCOV": 6, "ZCOV": 8, "RNG": 8, "TKL": 7, "CTH": 4, "DEEP": 2, "RDEF": 4, "RUSH": 1},
 "FS":  {"ZCOV": 8, "RNG": 10, "MCOV": 5, "TKL": 6, "CTH": 5, "DEEP": 6},
 "CB":  {"MCOV": 9, "ZCOV": 6, "RNG": 9, "TKL": 6, "CTH": 5, "RDEF": 2, "DEEP": 6, "RTE": 7},
 "K":   {"KCK": 10},
 "P":   {"PNT": 10},
 "NICKEL": {"MCOV": 5, "ZCOV": 4, "RNG": 8, "TKL": 7, "RDEF": 3, "CTH": 4, "DEEP": 3},
 "DIME": {"ZCOV": 7, "RNG": 9, "MCOV": 4, "TKL": 7, "RDEF": 3, "CTH": 4, "DEEP": 6},
}

def tier_of(x):
    return 0 if x < 1 else (2 if x < 4 else (6 if x < 9 else 12))

def price(src, dst):
    """Return (tier, raw, top_duty, M, S) for src -> dst."""
    have = dict(zip(DUTIES, HAVE[src]))
    gaps = {}
    for d, need in NEED[dst].items():
        if d in SCOPE and dst not in SCOPE[d]:
            continue
        deficit = max(0, need - have[d])
        if deficit > 0:
            gaps[d] = W[d] * deficit
    if not gaps:
        raw, top, m, s = 0.0, None, 0.0, 0.0
    else:
        top = max(gaps, key=lambda d: gaps[d])
        m = gaps[top]
        s = sum(v for d, v in gaps.items() if d != top)
        raw = m + LAMBDA * s
    t = tier_of(raw)
    # Cross-side floor (policy): offense <-> defense, dst != FB, K/P exempt.
    cross = (src in OFFENSE and dst in DEFENSE) or (src in DEFENSE and dst in OFFENSE)
    if cross and dst != "FB" and src not in ("K", "P") and dst not in ("K", "P"):
        t = max(t, 6)
    return t, raw, top, m, s

def run(live):
    rows = []
    for src, dests in live.items():
        for dst, own in dests.items():
            t, raw, top, m, s = price(src, dst)
            rows.append({"k": f"{src}>{dst}", "own": own, "model": t,
                         "raw": raw, "top": top, "M": m, "S": s})
    exact = [r for r in rows if r["own"] == r["model"]]
    off1 = [r for r in rows if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) == 1]
    hard = [r for r in rows if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) > 1]
    return rows, exact, off1, hard

def show(name):
    rows, exact, off1, hard = run(live)
    tier_err = sum(abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) for r in rows)
    print(f"\n{name}: exact {len(exact)} / off-by-one {len(off1)} / hard {len(hard)} / tier-error {tier_err}")
    for k in ("C>OT", "C>OG", "TE>OT", "EDGE>RB"):
        r = next(x for x in rows if x["k"] == k)
        print(f"  {k}: owner {r['own']}, model {r['model']}, raw {r['raw']:.2f} (M {r['M']:.2f} {r['top']}, S {r['S']:.2f})")
    print(f"  residuals: {sorted([r['k'] for r in off1 + hard])}")
    return len(exact)

if __name__ == "__main__":
    live = json.load(open(sys.argv[1]))["flex"]
    # Sanity: need[X] <= have[X] for every role's own job (write-up section 2).
    bad = []
    for role in HAVE:
        have = dict(zip(DUTIES, HAVE[role]))
        for d, need in NEED.get(role, {}).items():
            if need > have[d]:
                bad.append(f"{role} {d}: need {need} > have {have[d]}")
    print("need<=have violations:", bad if bad else "none")
    print("=== Baseline (ZAI-D1 as written) ===")
    show("BASELINE")
    print("\n=== Owner score changes: EDGE CARRY 4 + C PBLK 6 + TE PBLK 4 ===")
    HAVE["EDGE"][DUTIES.index("CARRY")] = 4
    HAVE["C"][DUTIES.index("PBLK")] = 6
    HAVE["TE"][DUTIES.index("PBLK")] = 4
    show("EDGE CARRY 4 + C PBLK 6 + TE PBLK 4")
    print("\n=== Variant: C PBLK 7 (Owner: 6 or 7 is OK) ===")
    HAVE["C"][DUTIES.index("PBLK")] = 7
    show("EDGE CARRY 4 + C PBLK 7 + TE PBLK 4")
    print("\n=== Variant: C PBLK 4 (for comparison; Owner did not choose 4) ===")
    HAVE["C"][DUTIES.index("PBLK")] = 4
    show("EDGE CARRY 4 + C PBLK 4 + TE PBLK 4")
