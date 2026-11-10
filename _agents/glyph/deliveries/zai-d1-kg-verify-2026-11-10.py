#!/usr/bin/env python3
"""Glyph independent verification of ZAI-D1 + KG score changes (P-322/ZAI-D1).
Re-implemented from Z.ai's FLEX-DERIVATION-ZAI-D1-2026-11-10 write-up (not by running MUSE's script).
Tests against live flex.json on origin/council/muse (read-only snapshot saved to /tmp).
"""
import json, copy

TIERS = [0, 2, 6, 12]
CUTS = [1, 4, 9]
LAMBDA = 0.4
FLOOR = 6

DUTIES = ["PBLK","RBLK","SNP","CTH","RTE","CARRY","THR","MCOV","ZCOV","RNG",
          "RUSH","EREP","RDEF","TKL","KCK","PNT","DEEP"]

# Weights from ZAI-D1 Appendix A / script
W_BASE = {"PBLK":1.55,"RBLK":0.5,"SNP":0.55,"CTH":0.7,"RTE":1.3,"CARRY":0.9,"THR":1.4,
          "MCOV":1.5,"ZCOV":1.0,"RNG":0.8,"RUSH":0.9,"EREP":1.2,"RDEF":1.2,"TKL":0.7,
          "KCK":0.4,"PNT":0.4,"DEEP":1.5}

SCOPE = {"THR":["QB"], "KCK":["K"], "PNT":["P"], "EREP":["EDGE"]}

# HAVE matrix from ZAI-D1 write-up Appendix A (integers 0-10)
HAVE_BASE = {
 "QB":  {"PBLK":1,"RBLK":1,"SNP":0,"CTH":2,"RTE":1,"CARRY":6,"THR":10,"MCOV":2,"ZCOV":2,"RNG":4,"RUSH":0,"EREP":0,"RDEF":1,"TKL":2,"KCK":0,"PNT":0,"DEEP":0},
 "RB":  {"PBLK":1,"RBLK":6,"SNP":0,"CTH":6,"RTE":4,"CARRY":10,"THR":0,"MCOV":2,"ZCOV":1,"RNG":6,"RUSH":0,"EREP":0,"RDEF":2,"TKL":3,"KCK":0,"PNT":0,"DEEP":0},
 "FB":  {"PBLK":2,"RBLK":8,"SNP":0,"CTH":3,"RTE":3,"CARRY":9,"THR":0,"MCOV":2,"ZCOV":1,"RNG":5,"RUSH":0,"EREP":0,"RDEF":5,"TKL":5,"KCK":0,"PNT":0,"DEEP":0},
 "WR":  {"PBLK":1,"RBLK":2,"SNP":0,"CTH":9,"RTE":10,"CARRY":6,"THR":1,"MCOV":6,"ZCOV":2,"RNG":8,"RUSH":0,"EREP":0,"RDEF":1,"TKL":4,"KCK":0,"PNT":0,"DEEP":4},
 "TE":  {"PBLK":5,"RBLK":7,"SNP":1,"CTH":8,"RTE":4,"CARRY":4,"THR":0,"MCOV":4,"ZCOV":4,"RNG":5,"RUSH":1,"EREP":0,"RDEF":3,"TKL":3,"KCK":0,"PNT":0,"DEEP":0},
 "OT":  {"PBLK":10,"RBLK":9,"SNP":5,"CTH":1,"RTE":0,"CARRY":1,"THR":0,"MCOV":0,"ZCOV":0,"RNG":2,"RUSH":6,"EREP":6,"RDEF":5,"TKL":3,"KCK":0,"PNT":0,"DEEP":0},
 "OG":  {"PBLK":9,"RBLK":9,"SNP":6,"CTH":1,"RTE":0,"CARRY":1,"THR":0,"MCOV":0,"ZCOV":0,"RNG":2,"RUSH":6,"EREP":6,"RDEF":5,"TKL":3,"KCK":0,"PNT":0,"DEEP":0},
 "C":   {"PBLK":9,"RBLK":9,"SNP":10,"CTH":1,"RTE":0,"CARRY":1,"THR":0,"MCOV":0,"ZCOV":0,"RNG":2,"RUSH":3,"EREP":5,"RDEF":3,"TKL":3,"KCK":0,"PNT":0,"DEEP":0},
 "DT":  {"PBLK":5,"RBLK":5,"SNP":0,"CTH":1,"RTE":0,"CARRY":1,"THR":0,"MCOV":0,"ZCOV":0,"RNG":2,"RUSH":6,"EREP":6,"RDEF":9,"TKL":6,"KCK":0,"PNT":0,"DEEP":0},
 "EDGE":{"PBLK":5,"RBLK":5,"SNP":0,"CTH":2,"RTE":0,"CARRY":2,"THR":0,"MCOV":3,"ZCOV":3,"RNG":6,"RUSH":10,"EREP":10,"RDEF":9,"TKL":6,"KCK":0,"PNT":0,"DEEP":0},
 "ILB": {"PBLK":3,"RBLK":4,"SNP":0,"CTH":4,"RTE":0,"CARRY":2,"THR":0,"MCOV":7,"ZCOV":8,"RNG":7,"RUSH":5,"EREP":1,"RDEF":9,"TKL":9,"KCK":0,"PNT":0,"DEEP":0},
 "OLB": {"PBLK":3,"RBLK":4,"SNP":0,"CTH":4,"RTE":0,"CARRY":2,"THR":0,"MCOV":4,"ZCOV":2,"RNG":7,"RUSH":8,"EREP":2,"RDEF":7,"TKL":8,"KCK":0,"PNT":0,"DEEP":1},
 "SS":  {"PBLK":1,"RBLK":3,"SNP":0,"CTH":4,"RTE":2,"CARRY":2,"THR":0,"MCOV":7,"ZCOV":9,"RNG":9,"RUSH":1,"EREP":0,"RDEF":4,"TKL":8,"KCK":0,"PNT":0,"DEEP":8},
 "FS":  {"PBLK":0,"RBLK":1,"SNP":0,"CTH":5,"RTE":2,"CARRY":1,"THR":0,"MCOV":6,"ZCOV":9,"RNG":10,"RUSH":0,"EREP":0,"RDEF":3,"TKL":6,"KCK":0,"PNT":0,"DEEP":9},
 "CB":  {"PBLK":0,"RBLK":1,"SNP":0,"CTH":7,"RTE":7,"CARRY":2,"THR":0,"MCOV":10,"ZCOV":9,"RNG":9,"RUSH":1,"EREP":0,"RDEF":4,"TKL":6,"KCK":0,"PNT":0,"DEEP":7},
 "K":   {"PBLK":0,"RBLK":0,"SNP":0,"CTH":3,"RTE":0,"CARRY":1,"THR":0,"MCOV":1,"ZCOV":1,"RNG":3,"RUSH":0,"EREP":0,"RDEF":0,"TKL":2,"KCK":10,"PNT":5,"DEEP":0},
 "P":   {"PBLK":0,"RBLK":0,"SNP":0,"CTH":3,"RTE":0,"CARRY":1,"THR":0,"MCOV":1,"ZCOV":1,"RNG":3,"RUSH":0,"EREP":0,"RDEF":0,"TKL":2,"KCK":5,"PNT":10,"DEEP":0},
}

# NEED profiles from ZAI-D1 write-up Appendix A (job demands)
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

OFFENSE = {"QB","RB","FB","WR","TE","OT","OG","C"}
DEFENSE = {"DT","EDGE","ILB","OLB","SS","FS","CB","NICKEL","DIME","DL5"}
SPECIAL = {"K","P"}

def side(r):
    if r in OFFENSE: return "O"
    if r in DEFENSE: return "D"
    if r in SPECIAL: return "S"
    return "X"

def is_cross(src, dst):
    a,b = side(src), side(dst)
    if a == "S" or b == "S": return False
    return a != b

def tier_of(x):
    if x < CUTS[0]: return 0
    if x < CUTS[1]: return 2
    if x < CUTS[2]: return 6
    return 12

def compute(src, dst, have, w, floor_on=True):
    hv = have[src]
    nd = NEED.get(dst)
    if nd is None:
        return None
    deficits = []  # (weighted, duty)
    for d, need_v in nd.items():
        sc = SCOPE.get(d)
        if sc and dst not in sc:
            continue
        deficit = max(0, need_v - hv.get(d, 0))
        if deficit > 0:
            deficits.append((w[d] * deficit, d))
    if not deficits:
        raw = 0.0
        M = 0.0
        Ssum = 0.0
        top = None
    else:
        deficits.sort(reverse=True)
        M = deficits[0][0]
        top = deficits[0][1]
        Ssum = sum(x[0] for x in deficits[1:])
        raw = M + LAMBDA * Ssum
    p = tier_of(raw)
    if floor_on and is_cross(src, dst) and dst != "FB" and p < FLOOR:
        p = FLOOR
    return {"raw": raw, "M": M, "S": Ssum, "top": top, "model": p}

def step(a,b): return abs(TIERS.index(a)-TIERS.index(b))

def evaluate(live, have, w, floor_on=True):
    rows = []
    for s in live:
        for d, owner in live[s].items():
            res = compute(s,d,have,w,floor_on=floor_on)
            if res is None: 
                continue
            rows.append({
                "k": f"{s}>{d}", "src": s, "dst": d,
                "own": owner, "model": res["model"],
                "raw": res["raw"], "M": res["M"], "S": res["S"], "top": res["top"],
            })
    exact = [r for r in rows if r["own"]==r["model"]]
    off1 = [r for r in rows if step(r["own"],r["model"])==1]
    hard = [r for r in rows if step(r["own"],r["model"])>1]
    terr = sum(step(r["own"],r["model"]) for r in rows)
    return rows, exact, off1, hard, terr

def report(name, live, have, w, keys=("C>OT","C>OG","TE>OT","EDGE>RB")):
    rows, exact, off1, hard, terr = evaluate(live, have, w, floor_on=True)
    byk = {r["k"]: r for r in rows}
    print(f"\n{name}")
    print(f"  exact {len(exact)} | off-by-one {len(off1)} | hard {len(hard)} | tier-error {terr} | rules {len(rows)}")
    for k in keys:
        r = byk.get(k)
        if r:
            print(f"  {k}: owner {r['own']} model {r['model']} raw {r['raw']:.4f} M {r['M']:.4f} on {r['top']} S {r['S']:.4f}")
        else:
            print(f"  {k}: MISSING")
    residuals = sorted([r["k"] for r in off1+hard])
    print(f"  residuals: {residuals}")
    return rows, exact, off1, hard, terr

if __name__ == "__main__":
    live = json.load(open('/tmp/glyph-flex.json'))['flex']
    n = sum(len(v) for v in live.values())
    print(f"Live table rules: {n}")

    # Baseline
    report("BASELINE ZAI-D1 (EDGE CARRY 2, C PBLK 9, TE PBLK 5)", live, HAVE_BASE, W_BASE)

    # KG changes
    have_a = copy.deepcopy(HAVE_BASE)
    have_a["EDGE"]["CARRY"] = 4
    have_a["C"]["PBLK"] = 6
    have_a["TE"]["PBLK"] = 4
    report("KG ALL (EDGE CARRY 4, C PBLK 6, TE PBLK 4)", live, have_a, W_BASE)

    have_b = copy.deepcopy(HAVE_BASE)
    have_b["EDGE"]["CARRY"] = 4
    have_b["C"]["PBLK"] = 7
    have_b["TE"]["PBLK"] = 4
    report("KG ALL (EDGE CARRY 4, C PBLK 7, TE PBLK 4)", live, have_b, W_BASE)

    # Also individual components for clarity
    have_c = copy.deepcopy(HAVE_BASE); have_c["EDGE"]["CARRY"] = 4
    report("EDGE CARRY 4 only", live, have_c, W_BASE)
    have_d = copy.deepcopy(HAVE_BASE); have_d["C"]["PBLK"] = 6
    report("C PBLK 6 only", live, have_d, W_BASE)
    have_e = copy.deepcopy(HAVE_BASE); have_e["TE"]["PBLK"] = 4
    report("TE PBLK 4 only", live, have_e, W_BASE)
    have_f = copy.deepcopy(HAVE_BASE); have_f["EDGE"]["CARRY"]=4; have_f["C"]["PBLK"]=6
    report("EDGE CARRY 4 + C PBLK 6", live, have_f, W_BASE)
    have_g = copy.deepcopy(HAVE_BASE); have_g["EDGE"]["CARRY"]=4; have_g["C"]["PBLK"]=4; have_g["TE"]["PBLK"]=4
    report("KG 99-combo (EDGE CARRY 4, C PBLK 4, TE PBLK 4)", live, have_g, W_BASE)

    # Lambda ablation sanity on baseline
    print("\nLambda ablation (baseline, floor on) quick check:")
    for lam in (0.0,0.2,0.3,0.4,0.5,0.7,1.0):
        # recompute with custom lambda
        old = LAMBDA
        # hack: can't change global easily in function; inline quick eval
        rows=[]
        for s in live:
            for d, owner in live[s].items():
                hv=HAVE_BASE[s]; nd=NEED.get(d)
                if nd is None: continue
                defs=[]
                for duty, need_v in nd.items():
                    sc=SCOPE.get(duty)
                    if sc and d not in sc: continue
                    deficit=max(0, need_v-hv.get(duty,0))
                    if deficit>0: defs.append((W_BASE[duty]*deficit,duty))
                if not defs:
                    raw=0.0
                else:
                    defs.sort(reverse=True)
                    Mv=defs[0][0]; Sv=sum(x[0] for x in defs[1:]); raw=Mv+lam*Sv
                p=tier_of(raw)
                if is_cross(s,d) and d!="FB" and p<FLOOR: p=FLOOR
                rows.append((owner,p))
        ex=sum(1 for o,m in rows if o==m)
        off=sum(1 for o,m in rows if step(o,m)==1)
        hard=sum(1 for o,m in rows if step(o,m)>1)
        terr=sum(step(o,m) for o,m in rows)
        print(f"  lambda {lam}: exact {ex} off {off} hard {hard} terr {terr}")
