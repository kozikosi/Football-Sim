#!/usr/bin/env python3
# zai_basketball_sketch.py — Task 3 of the Muse directive zai-multisport-2026-11-10.
# DESIGN ONLY. No build, no engine, no product file — this is the same read-only
# derivation tool pointed at a second sport, to show the formula travels.
#
# ZAI-D1-B: the load-bearing deficit, basketball calibration (a SKETCH — priors,
# not a calibrated fit; there is no live basketball table to fit).
#
# The formula is unchanged from football: tier(M + 0.4*S) through cuts 1/4/9 onto
# 0/2/6/12. Inputs that change: duties, HAVE (bodies), NEED (jobs), weights.
# The floor changes MEANING, not mechanics: cross-SIDE becomes cross-CLASS
# (G={PG,SG}, W={SF}, B={PF,C} — a guard into a big job costs at least 6).
import itertools

TIERS = [0, 2, 6, 12]
CUTS = [1, 4, 9]
LAMBDA = 0.4
FLOOR = 6

DUTIES = ["HAND","HREP","PLAY","SHOT3","MID","FT","FIN","OFFB","POST","RIM","PDEF","HELP","REB"]
W = {"HAND":1.4,"HREP":1.5,"PLAY":1.3,"SHOT3":1.2,"MID":0.7,"FT":0.4,"FIN":0.9,
     "OFFB":0.7,"POST":0.8,"RIM":1.5,"PDEF":1.0,"HELP":1.0,"REB":1.1}
# HREP = the handler repertoire (PnR reads, set calls, press break) — the basketball
# EREP analog: it is what a SG body lacks at the PG job, not raw handle alone.
# No SCOPE dict: football needed explicit scopes because HAVE carries transversal
# craft (a WR can throw a bit); basketball authoring keeps NEED zeros instead.

CLASS = {"PG":"G","SG":"G","SF":"W","PF":"B","C":"B",
         "SB5":"B","WD3":"W","PWF":"W"}   # situational jobs have classes too (no HAVE rows — NEED only, the DL5 lesson)

# ---- HAVE: what each position's BODY does (0-10, integers) ----
#        HAND HREP PLAY SHOT3 MID FT FIN OFFB POST RIM PDEF HELP REB
HAVE = {
 "PG": [ 10,  10,  10,   7,  8, 7,  5,   5,   0,   1,   6,   4,  3],
 "SG": [  7,   4,   6,   9,  8, 7,  6,   8,   1,   1,   7,   5,  4],
 "SF": [  6,   3,   6,   7,  7, 6,  7,   7,   3,   5,   8,   7,  6],
 "PF": [  4,   1,   3,   6,  5, 5,  7,   5,   6,   6,   6,   7,  8],
 "C":  [  2,   0,   1,   2,  3, 3,  8,   3,   8,   9,   4,   8,  9],
}
# Transversal craft (the football analogues, each carrying a named asymmetry):
#   PG OFFB 5 / SHOT3 7  (PGs learn to play off-ball and shoot off the catch — why PG>SG is cheap)
#   SF medium-everything (the universal fallback body — like the CB supersets of the safety jobs)
#   PF HAND 4 / PLAY 3   (modern forwards initiated in high school; secondary creation is honest)
#   C FIN 8 / HELP 8     (finishing over size and anchoring are native to the body)

# ---- NEED: what each JOB demands on its possessions ----
NEED = {
 "PG": {"HAND":10,"HREP":10,"PLAY":9,"SHOT3":6,"MID":6,"FT":6,"PDEF":5,"OFFB":3},
 "SG": {"SHOT3":9,"OFFB":8,"MID":7,"PDEF":7,"FT":6,"FIN":6,"HAND":6,"PLAY":5,"HREP":3},
 "SF": {"SHOT3":7,"PDEF":8,"OFFB":7,"FIN":7,"REB":6,"MID":6,"PLAY":4,"HAND":5,"HELP":6,"FT":5},
 "PF": {"REB":8,"RIM":6,"HELP":7,"SHOT3":6,"FIN":7,"PDEF":6,"POST":5,"MID":5,"OFFB":5,"FT":4,"HAND":3},
 "C":  {"RIM":9,"REB":9,"FIN":8,"HELP":8,"POST":7,"FT":3,"SHOT3":2,"HAND":2,"OFFB":2,"PDEF":3,"MID":2},
 # situational jobs, NEED-first (the DL5 lesson: author the job, prices fall out)
 "SB5": {"RIM":7,"REB":7,"HELP":9,"PDEF":7,"SHOT3":6,"FIN":7,"FT":5,"OFFB":5},          # small-ball 5
 "WD3": {"SHOT3":9,"PDEF":8,"OFFB":8,"FT":5,"FIN":5,"REB":4,"HELP":6},                    # 3-and-D wing
 "PWF": {"HAND":8,"HREP":6,"PLAY":9,"SHOT3":5,"REB":6,"FIN":7,"PDEF":6},                  # point-forward
}

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
        deficit = v - hv[d]
        if deficit > 0: defs.append((W[d] * deficit, d, deficit))
    if not defs: return 0.0, 0.0, 0.0, None
    defs.sort(reverse=True)
    M, dM, _ = defs[0]
    S = sum(x[0] for x in defs[1:])
    return M + LAMBDA * S, M, S, dM

def tier_of(x): return 0 if x < CUTS[0] else 2 if x < CUTS[1] else 6 if x < CUTS[2] else 12

def price(src, dst):
    r = raw_of(src, dst)
    if r is None: return None
    raw, M, S, top = r
    p = tier_of(raw)
    cross = CLASS[src] != CLASS[dst]
    if cross and p < FLOOR: p = FLOOR
    return p, raw, M, S, top

def run(lam=None, floor=FLOOR):
    out = []
    for s in HAVE:
        for d in NEED:
            r = raw_of(s, d)
            if r is None: continue
            raw, M, S, top = r
            raw2 = M + (LAMBDA if lam is None else lam) * S
            p = tier_of(raw2)
            if floor and CLASS[s] != CLASS[d] and p < floor: p = floor
            out.append({"k": f"{s}>{d}", "raw": raw2, "M": M, "top": top or "-", "S": S, "p": p})
    return out

if __name__ == "__main__":
    bad = check_self()
    print(f"self-doable constraint: {'OK (need <= have for every job)' if not bad else 'VIOLATED ' + str(bad)}")
    rows = run()
    print(f"\nZAI-D1-B (SKETCH): {len(rows)} job pairs | cuts 1/4/9 | lambda {LAMBDA} | cross-class floor {FLOOR}")
    print("derived flex prices (tier: raw  — M on duty, S):")
    for r in sorted(rows, key=lambda r: r["k"]):
        print(f"  {r['k']:>8}: {r['p']:>2}   raw {r['raw']:5.2f}  (M {r['M']:5.2f} on {r['top']}, S {r['S']:5.2f})")
    print("\nlambda ablation (the S-term under correlated duties — see delivery note):")
    for lam in (0.0, 0.2, 0.3, 0.4, 0.5, 0.7, 1.0):
        rr = run(lam=lam, floor=0)
        dist = {t: sum(1 for x in rr if x["p"] == t) for t in TIERS}
        print(f"  lambda {lam:>3}: " + "  ".join(f"tier {t}: {dist[t]}" for t in TIERS))
