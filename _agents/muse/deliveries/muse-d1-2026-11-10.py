#!/usr/bin/env python3
"""MUSE-D1: the "harmonic coverage" model (MUSE's own derivation, 2026-11-10).

Designed from scratch per the Owner's direction: "start from scratch and
really create your own formula rather than piggybacking off what you have
been presented thus far." Take your time, think, design and go.

THE IDEA, in plain words:
  A flex price is set by how much of the destination job the source body
  actually covers. For each duty the job loads, compute the COVERAGE:
  how much of the requirement the body meets, as a fraction.
  Then combine the coverages with a HARMONIC MEAN — which is dominated
  by the worst coverage (a single duty you can't do at all sinks the
  whole price), but accounts for every duty (not just the worst).
  The price is a tier on the overall coverage.

Why this is different from Inkling's and Z.ai's:
  - Inkling: gap = D + skill gaps (absolute differences), combined by a
    SUM with a gate. Needs the D table. 19 fiat rows.
  - Z.ai: gap = need - have (absolute differences), combined by MAX +
    DISCOUNTED SUM (M + 0.4*S). The 0.4 is a fitted discount parameter.
  - MUSE-D1: gap = COVERAGE RATIO (have+1)/(need+1), combined by a
    WEIGHTED HARMONIC MEAN. No discount parameter — the combination is
    determined by the math (multiplication), not by a fitted knob.
    The ratio captures "what fraction of the requirement is met," which
    an absolute difference misses: a 1-point gap on a 1-point need is
    a total failure (coverage 0.5 with smoothing), while a 5-point gap
    on a 10-point need is a partial failure (coverage 0.55) — the
    absolute difference says the second gap is bigger (5 vs 1), but
    the first is a complete miss of a (small) requirement.

The +1 smoothing: scores are integers 0-10, so 1 is the smallest unit.
(have+1)/(need+1) means a body with 0 of a 1-point need gets coverage
0.5 (a moderate shortfall, not a total failure), while a body with 0
of a 10-point need gets coverage 1/11 = 0.09 (nearly a total failure).
Without smoothing, any zero coverage would zero the harmonic mean,
and a 1-point need would count as much as a 10-point need.

The harmonic-mean weights are (w_d * need_d): a duty matters in
proportion to its importance (w) AND how much the job needs of it
(need). This corrects for the coverage ratio normalizing away the
absolute magnitude — the coverage tells you the FRACTION missing, the
need tells you how much that fraction is worth.

Inputs (per sport, not part of the design): positions, duties, HAVE,
NEED, duty weights. The formula takes these and produces prices.
For football I use Z.ai's 17 duties and weights as the INPUTS (they
are the best available estimates, and the duty set is a per-sport
input, not the design). The DESIGN is the formula: coverage ratio +
weighted harmonic mean + tiering. The duty set and weights are shared
inputs; the combination rule is mine.

Cross-side floor 6 is applied as POLICY (the Owner's stated rule),
same as Z.ai. Reported with and without the floor.

Usage: python3 muse-d1-2026-11-10.py <flex.json>
"""
import json, sys

DUTIES = ["PBLK", "RBLK", "SNP", "CTH", "RTE", "CARRY", "THR", "MCOV",
          "ZCOV", "RNG", "RUSH", "EREP", "RDEF", "TKL", "KCK", "PNT", "DEEP"]
W = {"PBLK": 1.55, "RBLK": 0.5, "SNP": 0.55, "CTH": 0.7, "RTE": 1.3,
     "CARRY": 0.9, "THR": 1.4, "MCOV": 1.5, "ZCOV": 1.0, "RNG": 0.8,
     "RUSH": 0.9, "EREP": 1.2, "RDEF": 1.2, "TKL": 0.7, "KCK": 0.4,
     "PNT": 0.4, "DEEP": 1.5}
SCOPE = {"THR": ["QB"], "KCK": ["K"], "PNT": ["P"], "EREP": ["EDGE"]}
EPS = 1.0
TIERS = [0, 2, 6, 12]
OFFENSE = {"QB", "RB", "FB", "WR", "TE", "OT", "OG", "C"}
DEFENSE = {"DT", "EDGE", "ILB", "OLB", "SS", "FS", "CB", "NICKEL", "DIME"}

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

def coverage(src, dst):
    """Weighted harmonic mean of per-duty coverages. Returns (H, worst_duty, worst_cov)."""
    have = dict(zip(DUTIES, HAVE[src]))
    num = 0.0
    den = 0.0
    worst_d, worst_c = None, 1.0
    for d, need in NEED[dst].items():
        if d in SCOPE and dst not in SCOPE[d]:
            continue
        if need <= 0:
            continue
        cov = (have[d] + EPS) / (need + EPS)
        a = W[d] * need
        num += a
        den += a / cov
        if cov < worst_c:
            worst_c, worst_d = cov, d
    H = num / den if den > 0 else 1.0
    return H, worst_d, worst_c

def tier_of(H, cuts):
    if H >= cuts[0]:
        return 0
    if H >= cuts[1]:
        return 2
    if H >= cuts[2]:
        return 6
    return 12

def price(src, dst, cuts, floor=True):
    H, worst_d, worst_c = coverage(src, dst)
    t = tier_of(H, cuts)
    if floor:
        cross = (src in OFFENSE and dst in DEFENSE) or (src in DEFENSE and dst in OFFENSE)
        if cross and dst != "FB" and src not in ("K", "P") and dst not in ("K", "P"):
            t = max(t, 6)
    return t, H, worst_d, worst_c

def run(live, cuts, floor=True):
    rows = []
    for src, dests in live.items():
        for dst, own in dests.items():
            t, H, wd, wc = price(src, dst, cuts, floor)
            rows.append({"k": f"{src}>{dst}", "own": own, "model": t, "H": H, "worst": wd, "wc": wc})
    exact = [r for r in rows if r["own"] == r["model"]]
    off1 = [r for r in rows if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) == 1]
    hard = [r for r in rows if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) > 1]
    return rows, exact, off1, hard

def show(name, cuts, floor=True):
    rows, exact, off1, hard = run(live, cuts, floor)
    tier_err = sum(abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) for r in rows)
    print(f"\n{name} (cuts {cuts}, floor {'on' if floor else 'off'}): exact {len(exact)} / off-by-one {len(off1)} / hard {len(hard)} / tier-error {tier_err}")
    for k in ("C>OT", "C>OG", "TE>OT", "EDGE>RB"):
        r = next(x for x in rows if x["k"] == k)
        print(f"  {k}: owner {r['own']}, model {r['model']}, H {r['H']:.3f} (worst {r['worst']} {r['wc']:.2f})")
    print(f"  residuals: {sorted([r['k'] for r in off1 + hard])}")
    return len(exact), rows

if __name__ == "__main__":
    live = json.load(open(sys.argv[1]))["flex"]
    print("=== MUSE-D1 baseline (Z.ai inputs, no score changes) ===")
    # Sweep the tier thresholds to find the best fit (coarse grid).
    best = None
    for c0 in (0.85, 0.9, 0.95):
        for c1 in (0.6, 0.65, 0.7, 0.75):
            for c2 in (0.3, 0.35, 0.4, 0.45, 0.5):
                if not (c0 > c1 > c2):
                    continue
                rows, exact, off1, hard = run(live, (c0, c1, c2), floor=True)
                te = sum(abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) for r in rows)
                if best is None or (len(exact), -te) > (best[0], -best[1]):
                    best = (len(exact), te, (c0, c1, c2))
    print(f"Best thresholds (floor on): exact {best[0]}, tier-error {best[1]}, cuts {best[2]}")
    show("BASELINE best", best[2], floor=True)
    show("BASELINE best, floor off", best[2], floor=False)
    print("\n=== MUSE-D1 + Owner score changes (EDGE CARRY 4, C PBLK 6, TE PBLK 4) ===")
    HAVE["EDGE"][DUTIES.index("CARRY")] = 4
    HAVE["C"][DUTIES.index("PBLK")] = 6
    HAVE["TE"][DUTIES.index("PBLK")] = 4
    best2 = None
    for c0 in (0.85, 0.9, 0.95):
        for c1 in (0.6, 0.65, 0.7, 0.75):
            for c2 in (0.3, 0.35, 0.4, 0.45, 0.5):
                if not (c0 > c1 > c2):
                    continue
                rows, exact, off1, hard = run(live, (c0, c1, c2), floor=True)
                te = sum(abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) for r in rows)
                if best2 is None or (len(exact), -te) > (best2[0], -best2[1]):
                    best2 = (len(exact), te, (c0, c1, c2))
    print(f"Best thresholds (floor on): exact {best2[0]}, tier-error {best2[1]}, cuts {best2[2]}")
    show("SCORES best", best2[2], floor=True)
    show("SCORES best, floor off", best2[2], floor=False)
