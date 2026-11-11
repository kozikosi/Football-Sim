#!/usr/bin/env python3
"""LOO on ZAI-D1 V4 + the merged form (zai+G) — P-340 / merge question 9.

Method (matches Claude's flexunify LOO):
  For each role r in the 19 roles:
    - Training set: all 97 cross-role pairs EXCEPT those touching r.
    - Re-fit lambda: sweep 0.0-1.0 step 0.05, pick the lambda minimizing
      mean |raw - owner| on the training set. (HAVE/NEED/W are authored,
      not fitted, so they are held fixed — the same caveat Inkling noted:
      LOO here is sensitivity of the one tunable constant, not a blind
      re-derivation of the matrices.)
    - Held-out set: pairs touching r. Price them with the fitted lambda.
    - Record held-out mean error and exact tiers.
  Report per-role and overall held-out numbers for both forms.

Forms:
  ZAI-D1 V4: ability only, A = M + lambda*S, V4 HAVE (EDGE CARRY 4,
    C PBLK 6, TE PBLK 4), floor OFF (floor is out per KG Q10).
  zai+G (merged): raw = max(A, G), G = 20*(1 - w_src/w_dst) from
    ENGINE-MEASURED localWins20 weights (the P-340 merge baseline).
    Also run with INPUT weights to confirm identical (MUSE-D2 found so).

Oracle: live 99-rule table, architect/engine-and-seats 97d7e9d,
  97 cross-role rules (2 self-rules ILB>ILB, OLB>OLB excluded).
  Tiers 0/2/6/12, cuts 1/4/9.

Usage: python3 loo-zai-merged.py <flex.json>
"""
import json, sys

DUTIES = ["PBLK", "RBLK", "SNP", "CTH", "RTE", "CARRY", "THR", "MCOV",
          "ZCOV", "RNG", "RUSH", "EREP", "RDEF", "TKL", "KCK", "PNT", "DEEP"]
W = {"PBLK": 1.55, "RBLK": 0.5, "SNP": 0.55, "CTH": 0.7, "RTE": 1.3,
     "CARRY": 0.9, "THR": 1.4, "MCOV": 1.5, "ZCOV": 1.0, "RNG": 0.8,
     "RUSH": 0.9, "EREP": 1.2, "RDEF": 1.2, "TKL": 0.7, "KCK": 0.4,
     "PNT": 0.4, "DEEP": 1.5}
SCOPE = {"THR": ["QB"], "KCK": ["K"], "PNT": ["P"], "EREP": ["EDGE"]}
CUTS = [1, 4, 9]
TIERS = [0, 2, 6, 12]

# HAVE: ZAI-D1 base + KG's three score changes (EDGE CARRY 4, C PBLK 6, TE PBLK 4).
# (Glyph's independent re-implementation, verified against Z.ai's write-up.)
HAVE = {
 "QB":  [1, 1, 0, 2, 1, 6, 10, 2, 2, 4, 0, 0, 1, 2, 0, 0, 0],
 "RB":  [1, 6, 0, 6, 4, 10, 0, 2, 1, 6, 0, 0, 2, 3, 0, 0, 0],
 "FB":  [2, 8, 0, 3, 3, 9, 0, 2, 1, 5, 0, 0, 5, 5, 0, 0, 0],
 "WR":  [1, 2, 0, 9, 10, 6, 1, 6, 2, 8, 0, 0, 1, 4, 0, 0, 4],
 "TE":  [4, 7, 1, 8, 4, 4, 0, 4, 4, 5, 1, 0, 3, 3, 0, 0, 0],
 "OT":  [10, 9, 5, 1, 0, 1, 0, 0, 0, 2, 6, 6, 5, 3, 0, 0, 0],
 "OG":  [9, 9, 6, 1, 0, 1, 0, 0, 0, 2, 6, 6, 5, 3, 0, 0, 0],
 "C":   [6, 9, 10, 1, 0, 1, 0, 0, 0, 2, 3, 5, 3, 3, 0, 0, 0],
 "DT":  [5, 5, 0, 1, 0, 1, 0, 0, 0, 2, 6, 6, 9, 6, 0, 0, 0],
 "EDGE":[5, 5, 0, 2, 0, 4, 0, 3, 3, 6, 10, 10, 9, 6, 0, 0, 0],
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

# Role -> slot value. (a) ENGINE-MEASURED localWins20 (P-321). (b) INPUT weights (slots.ts).
W_MEAS = {"QB": 2.4706, "RB": 0.6126, "FB": 0.0626, "WR": 1.6071,
          "TE": 0.6181, "OT": 1.2497, "OG": 1.0001, "C": 0.3752,
          "DT": 1.3158, "EDGE": 1.7097, "ILB": 0.7934, "OLB": 0.3950,
          "SS": 0.7887, "FS": 0.7893, "CB": 1.0557, "K": 0.1271,
          "P": 0.1182, "NICKEL": 0.2610, "DIME": 0.1310}
W_INPUT = {"QB": 1000, "RB": 250, "FB": 25, "WR": 650, "TE": 250,
           "OT": 500, "OG": 400, "C": 150, "DT": 500, "EDGE": 650,
           "ILB": 300, "OLB": 150, "SS": 300, "FS": 300, "CB": 400,
           "K": 50, "P": 50, "NICKEL": 100, "DIME": 50}

def tier_of(x):
    return 0 if x < 1 else (2 if x < 4 else (6 if x < 9 else 12))

def ability_ms(src, dst):
    """Return (M, S) for ZAI-D1 ability: M = worst weighted gap, S = sum of the rest."""
    have = dict(zip(DUTIES, HAVE[src]))
    gaps = []
    for d, need in NEED[dst].items():
        if d in SCOPE and dst not in SCOPE[d]:
            continue
        deficit = max(0, need - have[d])
        if deficit > 0:
            gaps.append(W[d] * deficit)
    if not gaps:
        return 0.0, 0.0
    gaps.sort(reverse=True)
    return gaps[0], sum(gaps[1:])

def guard_raw(src, dst, weights):
    ws, wd = weights[src], weights[dst]
    return max(0.0, 20.0 * (1.0 - ws / wd))

def raw_zai(ms, lam):
    m, s = ms
    return m + lam * s

def raw_merged(ms, lam, g):
    return max(raw_zai(ms, lam), g)

def fit_lambda(pairs, form, weights):
    """Sweep lambda 0.0-1.0 step 0.05; pick the lambda minimizing mean |raw - owner|."""
    best = None
    lam = 0.0
    while lam <= 1.0001:
        errs = []
        for (ms, g, own) in pairs:
            r = raw_zai(ms, lam) if form == "zai" else raw_merged(ms, lam, g)
            errs.append(abs(r - own))
        mae = sum(errs) / len(errs)
        if best is None or mae < best[1]:
            best = (lam, mae)
        lam += 0.05
    return best  # (lambda, mae)

def main():
    live = json.load(open(sys.argv[1]))["flex"]
    # 97 cross-role pairs (exclude the 2 self-rules).
    pairs = []  # (src, dst, own, (M,S), G_meas, G_input)
    for src, dests in live.items():
        for dst, own in dests.items():
            if src == dst:
                continue
            ms = ability_ms(src, dst)
            pairs.append((src, dst, own, ms,
                          guard_raw(src, dst, W_MEAS),
                          guard_raw(src, dst, W_INPUT)))
    print(f"pairs: {len(pairs)} (cross-role only)")
    roles = sorted({s for (s, d, *_r) in pairs} | {d for (s, d, *_r) in pairs})

    # In-sample baselines (lambda = 0.4, the Z.ai value) for scale.
    for form, weights in (("zai", None), ("merged", W_MEAS), ("merged", W_INPUT)):
        errs, ex = [], 0
        for (s, d, own, ms, gm, gi) in pairs:
            g = gm if weights is W_MEAS else gi
            r = raw_zai(ms, 0.4) if form == "zai" else raw_merged(ms, 0.4, g)
            errs.append(abs(r - own))
            ex += (tier_of(r) == own)
        print(f"in-sample lam=0.4 {form} ({'meas' if weights is W_MEAS else 'input' if weights else 'n/a'}): "
              f"mean err {sum(errs)/len(errs):.2f} | exact {ex}/{len(pairs)}")

    # LOO per form.
    for form in ("zai", "merged"):
        print(f"\n=== LOO {form} (lambda refit per fold, cuts 1/4/9 fixed) ===")
        tot_err, tot_n, tot_ex = 0.0, 0, 0
        fitted = []
        per_role = []
        for r in roles:
            held = [(ms, g, own) for (s, d, own, ms, gm, gi) in pairs
                    if s == r or d == r for g in [gm]]
            train = [(ms, g, own) for (s, d, own, ms, gm, gi) in pairs
                     if s != r and d != r for g in [gm]]
            if not held:
                continue
            lam, train_mae = fit_lambda(train, form, W_MEAS)
            fitted.append(lam)
            errs, ex = [], 0
            for (ms, g, own) in held:
                raw = raw_zai(ms, lam) if form == "zai" else raw_merged(ms, lam, g)
                errs.append(abs(raw - own))
                ex += (tier_of(raw) == own)
            tot_err += sum(errs); tot_n += len(errs); tot_ex += ex
            per_role.append((r, lam, sum(errs)/len(errs), ex, len(errs)))
        print(f"  held-out mean error {tot_err/tot_n:.2f} OVR over {tot_n} cases, "
              f"exact tiers {tot_ex}/{tot_n} ({100.0*tot_ex/tot_n:.1f}%)")
        print(f"  fitted lambda per fold: min {min(fitted):.2f} max {max(fitted):.2f} "
              f"mean {sum(fitted)/len(fitted):.2f} (Z.ai value 0.40)")
        print(f"  worst roles (held-out mean err): " +
              ", ".join(f"{r} {e:.1f}({n}) lam={l:.2f} ex={x}/{n}"
                        for (r, l, e, x, n) in sorted(per_role, key=lambda t: -t[2])[:5]))
        print(f"  best roles: " +
              ", ".join(f"{r} {e:.1f}({n})"
                        for (r, l, e, x, n) in sorted(per_role, key=lambda t: t[2])[:5]))
        # per-role detail
        for (r, l, e, x, n) in sorted(per_role, key=lambda t: t[0]):
            print(f"    {r:>6}: lam={l:.2f} held-out err {e:.2f} exact {x}/{n}")

if __name__ == "__main__":
    main()
