#!/usr/bin/env python3
"""
Inkling's independent re-implementation of Z.ai's ZAI-D1 flex derivation,
written from the write-up FLEX-DERIVATION-ZAI-D1-2026-11-10.md (council/glyph),
NOT from MUSE's zai-kg-feedback-2026-11-10.py (which is an import+override of
Z.ai's own script). Uses the live 99-rule table (flex.json @ 97d7e9d,
sha256 0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6).

Usage: python3 zai-d1-reimpl.py <flex.json> [--set ROLE:DUTY:VALUE ...] [--lambda 0.4]
"""
import json, sys, math, itertools

DUTIES = ["PBLK","RBLK","SNP","CTH","RTE","CARRY","THR","MCOV","ZCOV","RNG","RUSH","EREP","RDEF","TKL","KCK","PNT","DEEP"]

W = {"PBLK":1.55,"MCOV":1.5,"THR":1.4,"RTE":1.3,"EREP":1.2,"RDEF":1.2,"CARRY":0.9,"RUSH":0.9,
     "ZCOV":1.0,"RNG":0.8,"CTH":0.7,"TKL":0.7,"SNP":0.55,"RBLK":0.5,"KCK":0.4,"PNT":0.4,"DEEP":1.5}

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

NEED = {
 "QB":  {"THR":10,"CARRY":4,"RNG":4},
 "RB":  {"CARRY":10,"PBLK":1,"RBLK":5,"CTH":6,"RTE":4,"RNG":6,"RDEF":2,"TKL":2},
 "FB":  {"PBLK":1,"RBLK":5,"CTH":1,"CARRY":1,"RNG":1,"RDEF":2},
 "WR":  {"CTH":9,"RTE":10,"CARRY":4,"RNG":8,"RBLK":1},
 "TE":  {"PBLK":4,"RBLK":6,"CTH":7,"RTE":4,"CARRY":3,"RNG":5,"RDEF":3,"TKL":3},
 "OT":  {"PBLK":10,"RBLK":9,"SNP":0,"RNG":2,"RDEF":4},
 "OG":  {"PBLK":9,"RBLK":9,"SNP":0,"RNG":2,"RDEF":4},
 "C":   {"PBLK":8,"RBLK":9,"SNP":10,"RNG":2,"RDEF":3},
 "DT":  {"RUSH":6,"RDEF":9,"TKL":6,"RNG":2,"PBLK":4},
 "EDGE":{"RUSH":10,"EREP":10,"RDEF":8,"RNG":4,"TKL":4},
 "ILB": {"RDEF":9,"TKL":9,"MCOV":5,"ZCOV":7,"RNG":6,"RUSH":4,"CTH":2,"DEEP":0},
 "OLB": {"MCOV":3,"ZCOV":2,"RNG":6,"RUSH":3,"RDEF":6,"TKL":6,"CTH":2},
 "SS":  {"MCOV":6,"ZCOV":8,"RNG":8,"TKL":7,"CTH":4,"DEEP":2,"RDEF":4,"RUSH":1},
 "FS":  {"ZCOV":8,"RNG":10,"MCOV":5,"TKL":6,"CTH":5,"DEEP":6},
 "CB":  {"MCOV":9,"ZCOV":6,"RNG":9,"TKL":6,"CTH":5,"RDEF":2,"DEEP":6,"RTE":7},
 "K":   {"KCK":10},
 "P":   {"PNT":10},
 "NICKEL": {"MCOV":5,"ZCOV":4,"RNG":8,"TKL":7,"RDEF":3,"CTH":4,"DEEP":3},
 "DIME":   {"ZCOV":7,"RNG":9,"MCOV":4,"TKL":7,"RDEF":3,"CTH":4,"DEEP":6},
 "DL5":    {"RUSH":9,"EREP":5,"RDEF":8,"TKL":6,"RNG":4},
}

# scoped duties: load only for these destinations (all others: KCK->K, PNT->P, THR->QB, EREP->EDGE)
SCOPE = {"THR": {"QB"}, "KCK": {"K"}, "PNT": {"P"}, "EREP": {"EDGE"}}

OFFENSE = {"QB","RB","FB","WR","TE","OT","OG","C"}
DEFENSE = {"DT","EDGE","ILB","OLB","SS","FS","CB","NICKEL","DIME"}
EXEMPT_FLOOR = {"FB","K","P"}   # floor exempt per write-up (FB and K/P)

TIERS = [0,2,6,12]
CUTS = (1.0, 4.0, 9.0)

def tier_of(x):
    if x < CUTS[0]: return 0
    if x < CUTS[1]: return 2
    if x < CUTS[2]: return 6
    return 12

def have_dict(role):
    return dict(zip(DUTIES, HAVE[role]))

def price(src, dst, lam=0.4, have=None, need=None):
    have = have or HAVE
    need = need or NEED
    hv = dict(zip(DUTIES, have[src]))
    nd = need[dst]
    terms = []
    for d, need_v in nd.items():
        if d in SCOPE and dst not in SCOPE[d]:
            continue
        deficit = max(0, need_v - hv[d])
        if deficit:
            terms.append((W[d]*deficit, d, deficit, need_v))
    if not terms:
        raw = 0.0
        return 0, 0.0, []
    terms.sort(key=lambda t: -t[0])
    M = terms[0][0]
    S = sum(t[0] for t in terms[1:])
    raw = M + lam*S
    t = tier_of(raw)
    # cross-side floor: offense<->defense, FB/K/P exempt; raises below 6 up to 6
    if (src in OFFENSE) != (dst in OFFENSE):
        if src not in EXEMPT_FLOOR and dst not in EXEMPT_FLOOR:
            t = max(t, 6)
    return t, raw, terms

def load_table(path):
    with open(path) as f:
        data = json.load(f)
    rows = []
    for src, dsts in data["flex"].items():
        for dst, pen in dsts.items():
            rows.append((src, dst, pen))
    return rows

def run(table_path, overrides, need_overrides=(), lam=0.4):
    have = {r: list(v) for r, v in HAVE.items()}
    need = {r: dict(v) for r, v in NEED.items()}
    for key, val in overrides:
        role, duty, v = key.split(":")
        have[role][DUTIES.index(duty)] = int(v)
    for key, val in need_overrides:
        role, duty, v = key.split(":")
        need[role][duty] = int(v)
    rows = load_table(table_path)
    results = []
    n_exact = n_off1 = n_hard = 0
    tier_error = 0
    for src, dst, owner in rows:
        t, raw, terms = price(src, dst, lam, have, need)
        owner_tier = owner
        if t == owner_tier:
            n_exact += 1; tag = "exact"
        else:
            d = abs(TIERS.index(t) - TIERS.index(owner_tier))
            tier_error += d
            if d == 1: n_off1 += 1; tag = "off-by-one"
            else: n_hard += 1; tag = "hard"
        results.append((src, dst, owner_tier, t, raw, tag, terms))
    print(f"overrides: {overrides or 'none'} | lambda {lam}")
    print(f"rows {len(rows)} | exact {n_exact} | off-by-one {n_off1} | hard {n_hard} | tier-error {tier_error}")
    for src, dst, owner_tier, t, raw, tag, terms in results:
        if tag != "exact":
            m = terms[0] if terms else None
            mstr = f"M-duty {m[1]} (Δ{m[2]} vs need {m[3]}) = {m[0]:.2f}" if m else "no deficits"
            print(f"  {tag:10s} {src}>{dst}: owner {owner_tier} model {t} raw {raw:.2f} | {mstr}")
    # self-rules: every role's own job must be doable (need <= have)
    viol = []
    for role in have:
        if role in need:
            for d, nv in need[role].items():
                if dict(zip(DUTIES, have[role]))[d] < nv:
                    viol.append(f"{role} {d}: have {dict(zip(DUTIES, have[role]))[d]} < need {nv}")
    if viol:
        print("self-rule violations:", "; ".join(viol))
    return n_exact, n_off1, n_hard, tier_error, results

if __name__ == "__main__":
    table = sys.argv[1]
    args = sys.argv[2:]
    overrides = []
    need_overrides = []
    lam = 0.4
    i = 0
    while i < len(args):
        if args[i] == "--set":
            overrides.append((args[i+1], None)); i += 2
        elif args[i] == "--need":
            need_overrides.append((args[i+1], None)); i += 2
        elif args[i] == "--lambda":
            lam = float(args[i+1]); i += 2
        else:
            raise SystemExit(f"unknown arg {args[i]}")
    run(table, overrides, need_overrides, lam)

