#!/usr/bin/env python3
# zai_flex_derive.py — Z.ai's own flex-price derivation (ZAI-D1, the "load-bearing deficit" design).
# REV 3. READ-ONLY analysis: derives all 99 flex prices from an ability model and diffs them
# against the live Owner table (flex.json). Writes no product file, touches no branch.
# Per council/muse directive zai-derivation-2026-11-10: design independently of Inkling's P-322.
#
# DESIGN (mine, vs Inkling's):
#   Inkling: tier( D@90 + gated weighted-sum of skill gaps + named U-deltas ), 14 fiat rows,
#            needs the engine's D table as an input.
#   ZAI-D1:  tier( M + lambda*S ), M = worst load-bearing deficit, S = the rest at a discount.
#            NO D term at all. No U-deltas: what Inkling patches with named deltas lives here as
#            scoped duties in NEED (EREP only loads for dst=EDGE; THR only dst=QB; KCK/PNT only
#            for specialists) and as transversal craft in HAVE (OL bodies carry rush/edge craft
#            from blocking against it daily — why OT>EDGE is 6 while OLB>EDGE is 12).
#            NEED and HAVE are separate matrices; constraint need[X] <= have[X] (every job is
#            doable by its own starter — matches the live self-rules at 0).
#   Floor: cross-side (O<->D, non-specialist, dst != FB) never cheaper than 6 — POLICY, as the
#          live header names it. The live table confirms: every cross-side non-FB price is 6 or 12.
import json, sys, itertools

TIERS = [0, 2, 6, 12]
CUTS = [1, 4, 9]
LAMBDA = 0.4
FLOOR = 6
DUTIES = ["PBLK","RBLK","SNP","CTH","RTE","CARRY","THR","MCOV","ZCOV","RNG",
          "RUSH","EREP","RDEF","TKL","KCK","PNT","DEEP"]
W = {"PBLK":1.55,"RBLK":0.5,"SNP":0.55,"CTH":0.7,"RTE":1.3,"CARRY":0.9,"THR":1.4,
     "MCOV":1.5,"ZCOV":1.0,"RNG":0.8,"RUSH":0.9,"EREP":1.2,"RDEF":1.2,"TKL":0.7,
     "KCK":0.4,"PNT":0.4,"DEEP":1.5}
SCOPE = {"THR":["QB"], "KCK":["K"], "PNT":["P"], "EREP":["EDGE"]}

# ---- HAVE: what the role's body does (0-10). Transversal craft (skills carried from the
#      mirror side of the ball) marked with a comment in the write-up appendix. ----
#        PBLK RBLK SNP CTH RTE CARRY THR MCOV ZCOV RNG RUSH EREP RDEF TKL KCK PNT DEEP
HAVE = {
 "QB":  [ 1,  1,  0,  2,  1,  6,  10,  2,  2,  4,  0,  0,  1,  2,  0,  0,  0],
 "RB":  [ 1,  6,  0,  6,  4,  10, 0,   2,  1,  6,  0,  0,  2,  3,  0,  0,  0],
 "FB":  [ 2,  8,  0,  3,  3,  9,  0,   2,  1,  5,  0,  0,  5,  5,  0,  0,  0],
 "WR":  [ 1,  2,  0,  9,  10, 6,  1,   6,  2,  8,  0,  0,  1,  4,  0,  0,  4],
 "TE":  [ 5,  7,  1,  8,  4,  4,  0,   4,  4,  5,  1,  0,  3,  3,  0,  0,  0],
 "OT":  [ 10, 9,  5,  1,  0,  1,  0,   0,  0,  2,  6,  6,  5,  3,  0,  0,  0],
 "OG":  [ 9,  9,  6,  1,  0,  1,  0,   0,  0,  2,  6,  6,  5,  3,  0,  0,  0],
 "C":   [ 9,  9,  10, 1,  0,  1,  0,   0,  0,  2,  3,  5,  3,  3,  0,  0,  0],
 "DT":  [ 5,  5,  0,  1,  0,  1,  0,   0,  0,  2,  6,  6,  9,  6,  0,  0,  0],
 "EDGE":[ 5,  5,  0,  2,  0,  2,  0,   3,  3,  6,  10, 10, 9,  6,  0,  0,  0],
 "ILB": [ 3,  4,  0,  4,  0,  2,  0,   7,  8,  7,  5,  1,  9,  9,  0,  0,  0],
 "OLB": [ 3,  4,  0,  4,  0,  2,  0,   4,  2,  7,  8,  2,  7,  8,  0,  0,  1],
 "SS":  [ 1,  3,  0,  4,  2,  2,  0,   7,  9,  9,  1,  0,  4,  8,  0,  0,  8],
 "FS":  [ 0,  1,  0,  5,  2,  1,  0,   6,  9,  10, 0,  0,  3,  6,  0,  0,  9],
 "CB":  [ 0,  1,  0,  7,  7,  2,  0,   10, 9,  9,  1,  0,  4,  6,  0,  0,  7],
 "K":   [ 0,  0,  0,  3,  0,  1,  0,   1,  1,  3,  0,  0,  0,  2,  10, 5,  0],
 "P":   [ 0,  0,  0,  3,  0,  1,  0,   1,  1,  3,  0,  0,  0,  2,  5,  10, 0],
}
# ---- NEED: what each JOB demands on its snaps (authored independently of HAVE). ----
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
 # situational jobs (never sources in the live table)
 "NICKEL": {"MCOV":5,"ZCOV":4,"RNG":8,"TKL":7,"RDEF":3,"CTH":4,"DEEP":3},
 "DIME":   {"MCOV":4,"ZCOV":7,"RNG":9,"TKL":7,"RDEF":3,"CTH":4,"DEEP":6},
 # DL5 as the Owner reframed it (2026-11-10): a blitzer / heavy-set specialist — NOT a
 # rotational DT/EDGE substitute. Rush from standing and 3-point looks, gap integrity,
 # anchor. Light EREP (no edge bend demanded), zero coverage.
 "DL5":    {"RUSH":9,"EREP":5,"RDEF":8,"TKL":6,"RNG":4},
}
SIDE = {"QB":"O","RB":"O","FB":"O","WR":"O","TE":"O","OT":"O","OG":"O","C":"O",
        "DT":"D","EDGE":"D","ILB":"D","OLB":"D","SS":"D","FS":"D","CB":"D",
        "NICKEL":"D","DIME":"D","DL5":"D","K":"S","P":"S"}

def check_self():
    bad = []
    for r, nd in NEED.items():
        if r not in HAVE: continue
        hv = dict(zip(DUTIES, HAVE[r]))
        for d, v in nd.items():
            if hv[d] < v: bad.append((r, d, hv[d], v))
    return bad

def raw_of(src, dst):
    hv = dict(zip(DUTIES, HAVE[src])); nd = NEED.get(dst)
    if nd is None: return None
    defs = []
    for d, v in nd.items():
        sc = SCOPE.get(d)
        if sc and dst not in sc: continue
        deficit = v - hv[d]
        if deficit > 0: defs.append((W[d] * deficit, d, deficit))
    if not defs: return 0.0, 0.0, 0.0, None
    defs.sort(reverse=True)
    M, dM, _ = defs[0]
    S = sum(x[0] for x in defs[1:])
    return M + LAMBDA * S, M, S, dM

def tier_of(x, cuts=CUTS):
    return 0 if x < cuts[0] else 2 if x < cuts[1] else 6 if x < cuts[2] else 12

def price(src, dst, cuts=CUTS, floor=FLOOR, lam=None):
    r = raw_of(src, dst)
    if r is None: return None
    raw, M, S, top = r
    raw2 = raw if lam is None else M + lam * S
    p = tier_of(raw2, cuts)
    cross = SIDE.get(src) != SIDE.get(dst) and SIDE.get(src) not in (None, "S") \
            and SIDE.get(dst) not in (None, "S")
    if floor and cross and dst != "FB" and p < floor:
        p = floor
    return p, raw2, M, S, top

def step(a, b): return abs(TIERS.index(a) - TIERS.index(b))

def run(live, floor=FLOOR, lam=None):
    rows = []
    for s in live:
        for d in live[s]:
            m = price(s, d, floor=floor, lam=lam)
            if m is None: continue
            p, raw, M, S, top = m
            rows.append({"k": f"{s}>{d}", "own": live[s][d], "model": p, "raw": raw,
                         "M": M, "S": S, "top": top})
    exact = [r for r in rows if r["own"] == r["model"]]
    off1  = [r for r in rows if step(r["own"], r["model"]) == 1]
    hard  = [r for r in rows if step(r["own"], r["model"]) > 1]
    return rows, exact, off1, hard

def main():
    flex_path = sys.argv[1] if len(sys.argv) > 1 else "flex.json"
    live = json.load(open(flex_path))["flex"]
    bad = check_self()
    print(f"self-doable constraint: {'OK (need <= have for every job)' if not bad else bad}")

    rows, exact, off1, hard = run(live)
    terr = sum(abs(TIERS.index(r['own']) - TIERS.index(r['model'])) for r in rows)
    print(f"\nZAI-D1: {len(rows)} rules | cuts 1/4/9 | lambda {LAMBDA} | floor {FLOOR}")
    print(f"exact {len(exact)} | off by one tier {len(off1)} | hard misses {len(hard)} | tier-error {terr}")
    print("disagreements (rule: owner -> model, raw, M on duty, S):")
    for r in sorted([*off1, *hard], key=lambda r: r["k"]):
        print(f"  {r['k']}: {r['own']} -> {r['model']}  raw {r['raw']:.2f}  M {r['M']:.2f} on {r['top']}  S {r['S']:.2f}")

    rows0, e0, o0, h0 = run(live, floor=0)
    terr0 = sum(abs(TIERS.index(r['own']) - TIERS.index(r['model'])) for r in rows0)
    print(f"\nfloor OFF: exact {len(e0)} | off {len(o0)} | hard {len(h0)} | tier-error {terr0}")
    for r in sorted([*o0, *h0], key=lambda r: r["k"]):
        print(f"  {r['k']}: {r['own']} -> {r['model']}  raw {r['raw']:.2f}")

    print("\nlambda ablation (floor on):")
    for lam in (0.0, 0.2, 0.3, 0.4, 0.5, 0.7, 1.0):
        _, e, o, h = run(live, lam=lam)
        t = sum(abs(TIERS.index(r['own']) - TIERS.index(r['model'])) for r in run(live, lam=lam)[0])
        print(f"  lambda {lam:>3}: exact {len(e):>2} | off {len(o):>2} | hard {len(h)} | tier-error {t}")

    grid = [x * 0.25 for x in range(1, 57)]
    best = []
    for a, b, c in itertools.combinations(grid, 3):
        n = sum(1 for r in rows if tier_of(r["raw"], [a, b, c]) == r["own"])
        best.append((n, a, b, c))
    best.sort(key=lambda t: -t[0])
    n1 = sum(1 for r in rows if tier_of(r["raw"], CUTS) == r["own"])
    print(f"\ncut refit on my raws (floor off): at 1/4/9 -> {n1} | best {best[0][0]} at {best[0][1]}/{best[0][2]}/{best[0][3]}")

    # quasi-metric scan of the live table (geometry, no model): direct price vs cheapest 1-stop chain
    print("\nquasi-metric scan of the live table (direct vs cheapest 1-stop chain):")
    viols = []
    atbound = 0
    for s in live:
        for d, direct in live[s].items():
            best = None
            for mid in live:
                if mid in (s, d): continue
                if d in live.get(mid, {}) and mid in live.get(s, {}):
                    c = live[s][mid] + live[mid][d]
                    best = c if best is None else min(best, c)
            if best is None: continue
            if direct > best: viols.append((f"{s}>{d}", direct, best))
            elif direct == best: atbound += 1
    print(f"  {len(viols)} triangle violations (direct ABOVE its cheapest chain) — the Owner's hand-set premium rows:")
    for k, d, c in viols: print(f"    {k}: direct {d} > chain {c}")
    print(f"  {atbound} rows sit exactly AT their one-stop chain bound")

    print("\nDL5 under the blitzer NEED profile (Owner reframing, 2026-11-10):")
    for src in ("DT","EDGE","OLB","ILB","SS","TE","OT","OG"):
        r = price(src, "DL5", floor=0)
        if r:
            p, raw, M, S, top = r
            tail = f"  (M {M:.2f} on {top}, S {S:.2f})" if top else "  (no deficits)"
            print(f"  {src}->DL5: tier {p}  raw {raw:.2f}{tail}")

    import os
    os.makedirs("results", exist_ok=True)
    emit_report(live, "results/zai-d1-diff.md")

def emit_report(live, out_path):
    rows, exact, off1, hard = run(live)
    L = []
    L.append("# ZAI-D1 formula-versus-table diff (full 99 rules)")
    L.append("")
    L.append("Design: tier( M + 0.4*S ), M = worst load-bearing deficit (need - have, per scoped duty),")
    L.append("S = remaining deficits at a discount. No D term. Cuts 1/4/9, tiers 0/2/6/12, cross-side floor 6.")
    L.append("Compare: Inkling P-322 88/11/0 (tier-error 11) without floor, 93/6/0 (tier-error 6) with floor.")
    L.append("")
    L.append(f"**exact {len(exact)} / off-by-one {len(off1)} / hard {len(hard)} / tier-error {sum(abs(TIERS.index(r['own'])-TIERS.index(r['model'])) for r in rows)}** — zero fiat rows.")
    L.append("")
    L.append("| rule | owner | model | raw | M on duty | S | verdict |")
    L.append("|---|---|---|---|---|---|---|")
    for r in sorted(rows, key=lambda r: r["k"]):
        v = "exact" if r["own"] == r["model"] else ("off-by-one" if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) == 1 else "HARD")
        L.append(f"| {r['k']} | {r['own']} | {r['model']} | {r['raw']:.2f} | {r['M']:.2f} {r['top'] or '-'} | {r['S']:.2f} | {v} |")
    L.append("")
    L.append("Residuals: C>OG, C>OT = hub rows (the Owner prices the center's EXIT, not the entered job);")
    L.append("EDGE>RB = cross-side policy row (the floor stood in for a judgment); TE>OT = one tier short (8.63 vs the 9 cut).")
    open(out_path, "w").write("\n".join(L))
    print(f"\nfull diff table written to {out_path}")

if __name__ == "__main__":
    main()
