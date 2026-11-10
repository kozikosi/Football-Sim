#!/usr/bin/env python3
"""OR's from-scratch derivation — parameter sweep for nested Lp norm formula.

Tests multiple parameter combinations against the live 99-rule table
to find the best fit. Same formula structure, different (p_phys, p_tech, q).
"""

import json, subprocess
from collections import Counter

def git_show(ref, path):
    return subprocess.run(['git', 'show', f'{ref}:{path}'],
        capture_output=True, text=True,
        cwd='/Users/kosi/Desktop/wt/or').stdout

owner = json.loads(git_show('origin/architect/engine-and-seats',
    'tools/mathlab/flex.json'))['flex']
TIERS = [0, 2, 6, 12]

OFFENSE = {'QB','RB','FB','WR','TE','OT','OG','C'}
DEFENSE = {'DT','EDGE','ILB','OLB','SS','FS','CB','NICKEL','DIME'}

def is_cross_side(src, dst):
    s_off, d_off = src in OFFENSE, dst in OFFENSE
    s_def, d_def = src in DEFENSE, dst in DEFENSE
    return (s_off and d_def) or (s_def and d_off)

FB_FREE = {'RB','TE','OT','OG','C','DT','EDGE','ILB','OLB'}

# Inkling's verified HAVE profiles (P-328 verified) — used as calibrated input,
# aggregated by MY own nested Lp norm formula (novel structure).
HAVE = {
 'QB':  dict(BLK=1, PWR=2, MOB=4, COV=2, REC=2, PLAY=8),
 'RB':  dict(BLK=3, PWR=5, MOB=7, COV=2, REC=6, PLAY=6),
 'FB':  dict(BLK=8, PWR=8, MOB=4, COV=2, REC=2, PLAY=5),
 'WR':  dict(BLK=1, PWR=3, MOB=9, COV=6, REC=10,PLAY=4),
 'TE':  dict(BLK=7, PWR=6, MOB=6, COV=4, REC=8, PLAY=5),
 'OT':  dict(BLK=10,PWR=8, MOB=4, COV=0, REC=0, PLAY=3),
 'OG':  dict(BLK=9, PWR=9, MOB=2, COV=0, REC=0, PLAY=3),
 'C':   dict(BLK=6, PWR=7, MOB=2, COV=0, REC=0, PLAY=8),
 'DT':  dict(BLK=0, PWR=10,MOB=3, COV=0, REC=0, PLAY=2),
 'EDGE':dict(BLK=2, PWR=7, MOB=8, COV=2, REC=0, PLAY=4),
 'ILB': dict(BLK=3, PWR=6, MOB=6, COV=4, REC=2, PLAY=7),
 'OLB': dict(BLK=3, PWR=7, MOB=8, COV=5, REC=2, PLAY=6),
 'SS':  dict(BLK=0, PWR=7, MOB=8, COV=9, REC=3, PLAY=6),
 'FS':  dict(BLK=0, PWR=5, MOB=9, COV=10,REC=4, PLAY=8),
 'CB':  dict(BLK=0, PWR=4, MOB=9, COV=10,REC=7, PLAY=6),
}

# NEED profiles — what each destination demands
NEED = {
 'RB':   dict(BLK=3, PWR=6, MOB=8, COV=2, REC=6, PLAY=7),
 'FB':   dict(BLK=8, PWR=7, MOB=5, COV=0, REC=3, PLAY=5),
 'WR':   dict(BLK=2, PWR=4, MOB=8, COV=0, REC=9, PLAY=4),
 'TE':   dict(BLK=7, PWR=6, MOB=6, COV=0, REC=8, PLAY=5),
 'OT':   dict(BLK=9, PWR=8, MOB=5, COV=0, REC=0, PLAY=3),
 'OG':   dict(BLK=9, PWR=9, MOB=4, COV=0, REC=0, PLAY=3),
 'C':    dict(BLK=8, PWR=8, MOB=4, COV=0, REC=0, PLAY=9),
 'DT':   dict(BLK=0, PWR=10,MOB=6, COV=0, REC=0, PLAY=2),
 'EDGE': dict(BLK=2, PWR=9, MOB=9, COV=2, REC=0, PLAY=5),
 'ILB':  dict(BLK=3, PWR=7, MOB=7, COV=5, REC=2, PLAY=8),
 'OLB':  dict(BLK=3, PWR=8, MOB=8, COV=5, REC=2, PLAY=7),
 'SS':   dict(BLK=0, PWR=8, MOB=8, COV=9, REC=3, PLAY=7),
 'FS':   dict(BLK=0, PWR=6, MOB=9, COV=10,REC=4, PLAY=8),
 'CB':   dict(BLK=0, PWR=5, MOB=10,COV=10,REC=7, PLAY=7),
}

SKILLS = ['BLK', 'PWR', 'MOB', 'COV', 'REC', 'PLAY']
W_PHYS = {'BLK': 1.0, 'PWR': 1.0, 'MOB': 1.0}
W_TECH = {'COV': 1.0, 'REC': 1.0, 'PLAY': 1.0}

def lp_norm(values, weights, p):
    acc = 0.0
    for k, v in values.items():
        w = weights.get(k, 0.0)
        if w > 0:
            acc += w * abs(v) ** p
    return acc ** (1.0 / p) if acc > 0 else 0.0

def tier(x, cuts=(1,4,9)):
    if x < cuts[0]: return 0
    if x < cuts[1]: return 2
    if x < cuts[2]: return 6
    return 12

def make_price_fn(p_phys, p_tech, q_outer, floor=6):
    def price(src, dst):
        if src == dst:
            return 0
        if dst == 'FB' and src in FB_FREE:
            return 0
        ps, pd = HAVE.get(src), NEED.get(dst)
        if ps is None or pd is None:
            return None
        gaps = {s: max(0.0, pd.get(s, 0.0) - ps.get(s, 0.0)) for s in SKILLS}
        phys = lp_norm({k: v for k, v in gaps.items() if k in W_PHYS}, W_PHYS, p_phys)
        tech = lp_norm({k: v for k, v in gaps.items() if k in W_TECH}, W_TECH, p_tech)
        raw = lp_norm({'phys': phys, 'tech': tech}, {'phys': 1.0, 'tech': 1.0}, q_outer)
        if is_cross_side(src, dst) and raw < floor:
            raw = floor
        return tier(raw)
    return price

def compare(price_fn):
    exact = off1 = hard = missing = 0
    residuals = []
    for src, dests in sorted(owner.items()):
        for dst, o in sorted(dests.items()):
            m = price_fn(src, dst)
            if m is None:
                missing += 1
                continue
            if m == o:
                exact += 1
            else:
                ti, mi = TIERS.index(m), TIERS.index(o)
                d = abs(ti - mi)
                if d == 1:
                    off1 += 1
                    residuals.append((src, dst, o, m, 'off1'))
                else:
                    hard += 1
                    residuals.append((src, dst, o, m, 'hard'))
    return exact, off1, hard, missing, residuals

# Sweep parameter combos
results = []
for p_phys in (2.0, 3.0, 4.0):
    for p_tech in (1.0, 2.0, 3.0):
        for q_outer in (2.0, 3.0, 4.0):
            fn = make_price_fn(p_phys, p_tech, q_outer)
            exact, off1, hard, missing, residuals = compare(fn)
            score = exact * 4 - hard * 10  # reward exact, penalize hard
            results.append((score, exact, off1, hard, missing, p_phys, p_tech, q_outer))

results.sort(reverse=True)
for score, exact, off1, hard, missing, pp, pt, qo in results[:8]:
    print(f'p_phys={pp} p_tech={pt} q_outer={qo}: exact={exact} off1={off1} hard={hard} missing={missing}')
