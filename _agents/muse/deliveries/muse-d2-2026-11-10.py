#!/usr/bin/env python3
"""MUSE-D2: a flex derivation designed from the Owner's Q&A (council work, 2026-11-10).

Design (from the Q&A, not from the earlier designs):
  Inputs: position + OVR only. No per-player str/speed, no intangibles.
  Ability (A): ZAI-D1's NEED/HAVE duties (the best available ability layer;
  positional requirements, not attributes). A_raw = M + 0.4*S (worst gap +
  discounted rest). NO cross-side floor (out per Q10). NO pair-tracking
  (out per Q12). The C PBLK score change is NOT used (the pair is out);
  the guard handles C>OT instead (Q11a).
  Value (G): the guard, but from ENGINE-MEASURED slot values, not
  Owner-provided weights. The Owner will NOT provide set weights for other
  sports, so the guard must work without Owner-provided weights. The
  engine measures slot values (localWins20); the guard reads those.
  G_raw = 20 * (1 - w_src / w_dst), clamped at 0. Gravity enters here:
  the engine-measured slot values already reflect the attention a slot
  draws (a slot that draws double teams is more valuable, and the engine
  measures that value), so gravity is in the value layer, not a separate
  term. No separate gravity term is added (keeps two ingredients, Q6).
  Blend: raw = max(A, G) + beta * min(A, G), beta in [0, 1] tunable.
  beta=0 is pure max; beta=1 is the sum; beta=0.5 is halfway. This is the
  Owner's "maybe both" + "adjustable ratio" (Q7) — one knob, most malleable.
  price = tier(raw, cuts 1/4/9). User display is a simple integer (Q4);
  the scale is deferred (follow-up Q2), so the continuous raw is reported.
  Dual positions: a player holding both positions plays both for free
  (price 0, the formula does not apply). Unpriced moves: mostly forbidden
  (the allowed set is the 99 + dual positions); the formula prices the
  allowed ones.

Tested here:
  - beta sweep (0, 0.25, 0.5, 0.75, 1.0) x guard weight source
    (input weights vs engine-measured localWins20).
  - Baselines for comparison: ZAI-D1 as written (95/99), ZAI-D1 + Owner
    score changes (98/99, but the pair is out per Q12, so it is a
    reference only, not the design).
  - The 99-rule live table (architect/engine-and-seats, 97d7e9d) is the
    oracle-as-guide (not a target, Q2).

Usage: python3 muse-d2-2026-11-10.py <flex.json>
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

# Role -> primary slot value. Two sources:
#  (a) INPUT weights (SLOTS[].weight, the Owner-provided table).
#  (b) ENGINE-MEASURED weights (localWins20, the P-321 measurement).
# The guard is a ratio, so the scale cancels; what matters is the source.
W_INPUT = {"QB": 1000, "RB": 250, "FB": 25, "WR": 650, "TE": 250,
           "OT": 500, "OG": 400, "C": 150, "DT": 500, "EDGE": 650,
           "ILB": 300, "OLB": 150, "SS": 300, "FS": 300, "CB": 400,
           "K": 50, "P": 50, "NICKEL": 100, "DIME": 50}
W_MEAS = {"QB": 2.4706, "RB": 0.6126, "FB": 0.0626, "WR": 1.6071,
          "TE": 0.6181, "OT": 1.2497, "OG": 1.0001, "C": 0.3752,
          "DT": 1.3158, "EDGE": 1.7097, "ILB": 0.7934, "OLB": 0.3950,
          "SS": 0.7887, "FS": 0.7893, "CB": 1.0557, "K": 0.1271,
          "P": 0.1182, "NICKEL": 0.2610, "DIME": 0.1310}

def tier_of(x):
    return 0 if x < 1 else (2 if x < 4 else (6 if x < 9 else 12))

def ability_raw(src, dst):
    """ZAI-D1 raw ability score (M + 0.4*S), NO floor, NO tiering."""
    have = dict(zip(DUTIES, HAVE[src]))
    gaps = {}
    for d, need in NEED[dst].items():
        if d in SCOPE and dst not in SCOPE[d]:
            continue
        deficit = max(0, need - have[d])
        if deficit > 0:
            gaps[d] = W[d] * deficit
    if not gaps:
        return 0.0, None, 0.0, 0.0
    top = max(gaps, key=lambda d: gaps[d])
    m = gaps[top]
    s = sum(v for d, v in gaps.items() if d != top)
    return m + LAMBDA * s, top, m, s

def guard_raw(src, dst, weights):
    """Value guard from slot values: 20 * (1 - w_src / w_dst), clamped >= 0."""
    ws, wd = weights[src], weights[dst]
    return max(0.0, 20.0 * (1.0 - ws / wd))

def score(live, weights, beta):
    """MUSE-D2: raw = max(A, G) + beta * min(A, G); tier at 1/4/9."""
    rows = []
    for src, dests in live.items():
        for dst, own in dests.items():
            a, top, m, s = ability_raw(src, dst)
            g = guard_raw(src, dst, weights)
            raw = max(a, g) + beta * min(a, g)
            rows.append({"k": f"{src}>{dst}", "own": own, "model": tier_of(raw),
                         "raw": raw, "A": a, "G": g, "top": top})
    exact = [r for r in rows if r["own"] == r["model"]]
    off1 = [r for r in rows if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) == 1]
    hard = [r for r in rows if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) > 1]
    te = sum(abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) for r in rows)
    return rows, len(exact), len(off1), len(hard), te

def zai_baseline(live, floor=True):
    """ZAI-D1 as written (with the cross-side floor), for comparison."""
    OFFENSE = {"QB", "RB", "FB", "WR", "TE", "OT", "OG", "C"}
    DEFENSE = {"DT", "EDGE", "ILB", "OLB", "SS", "FS", "CB", "NICKEL", "DIME"}
    rows = []
    for src, dests in live.items():
        for dst, own in dests.items():
            a, top, m, s = ability_raw(src, dst)
            t = tier_of(a)
            cross = (src in OFFENSE and dst in DEFENSE) or (src in DEFENSE and dst in OFFENSE)
            if floor and cross and dst != "FB" and src not in ("K", "P") and dst not in ("K", "P"):
                t = max(t, 6)
            rows.append({"k": f"{src}>{dst}", "own": own, "model": t, "raw": a})
    exact = sum(1 for r in rows if r["own"] == r["model"])
    off1 = sum(1 for r in rows if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) == 1)
    hard = sum(1 for r in rows if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) > 1)
    te = sum(abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) for r in rows)
    return exact, off1, hard, te, [r["k"] for r in rows if r["own"] != r["model"]]

if __name__ == "__main__":
    live = json.load(open(sys.argv[1]))["flex"]
    print("=== Baselines (for comparison) ===")
    e, o, h, te, res = zai_baseline(live, floor=True)
    print(f"ZAI-D1 as written (floor on): exact {e} / off-by-one {o} / hard {h} / tier-error {te}")
    print(f"  residuals: {sorted(res)}")
    e, o, h, te, res = zai_baseline(live, floor=False)
    print(f"ZAI-D1 floor OFF (Q10: floor is out): exact {e} / off-by-one {o} / hard {h} / tier-error {te}")
    print(f"  residuals: {sorted(res)}")
    print("\n=== MUSE-D2: max(A,G) + beta*min(A,G), guard from INPUT weights ===")
    for beta in (0, 0.25, 0.5, 0.75, 1.0):
        rows, e, o, h, te = score(live, W_INPUT, beta)
        res = sorted([r["k"] for r in rows if r["own"] != r["model"]])
        print(f"beta={beta}: exact {e} / off-by-one {o} / hard {h} / tier-error {te}")
        print(f"  residuals: {res}")
    print("\n=== MUSE-D2: max(A,G) + beta*min(A,G), guard from ENGINE-MEASURED weights (localWins20) ===")
    for beta in (0, 0.25, 0.5, 0.75, 1.0):
        rows, e, o, h, te = score(live, W_MEAS, beta)
        res = sorted([r["k"] for r in rows if r["own"] != r["model"]])
        print(f"beta={beta}: exact {e} / off-by-one {o} / hard {h} / tier-error {te}")
        print(f"  residuals: {res}")
    print("\n=== Detail: best measured-weights run (beta=0) ===")
    rows, e, o, h, te = score(live, W_MEAS, 0)
    for r in rows:
        if r["own"] != r["model"]:
            print(f"  {r['k']}: owner {r['own']} model {r['model']} raw {r['raw']:.2f} (A {r['A']:.2f}, G {r['G']:.2f}, top {r['top']})")
    print("\n=== Detail: C>OT and TE>OT (the guard rows) ===")
    for beta in (0, 0.5, 1.0):
        rows, e, o, h, te = score(live, W_MEAS, beta)
        for k in ("C>OT", "TE>OT", "C>OG"):
            r = next(x for x in rows if x["k"] == k)
            print(f"  beta={beta} {k}: owner {r['own']} model {r['model']} raw {r['raw']:.2f} (A {r['A']:.2f}, G {r['G']:.2f})")
