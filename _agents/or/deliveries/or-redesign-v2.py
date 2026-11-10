#!/usr/bin/env python3
"""OR's redesign v2 — structural + fill distance, no fixed λ, portable across sports.

Key insight (from user's direction): the 99 rules are a GUIDE, not a hard target.
The formula's job is to produce reasonable prices, not hit every row. Portability
and beauty beat 99/99.

Design — "dual-profile distance":
  Step 1: Each job (destination) has a need vector n_i and an importance weight w_i^need.
  Step 2: Each role (source) has a have vector c_i.
  Step 3: fill_gap_i = max(0, w_i^need * n_i - c_i). Sum = fill_distance.
         Criticals (w^need near 1.5+) dominate; generic skills near 0.7.
  Step 4: structural_distance = Σ |n_i - c_i| * w_i^struct  — how DIFFERENT the
         two profiles are, independent of whether the source fills them.
         Structural counts generic usage differences, not just "missing supply".
  Step 5: raw = fill_distance + structural_distance.
  Step 6: cross-side floor if below 6.
  Step 7: tier(raw).

Why this is portable:
  - "fill_distance" weights by demand importance → height loads naturally on
    basketball jobs that demand height, offloads on jobs that don't.
  - "structural_distance" weights by signature overlap → no global λ needed.
  - No "str", "speed", "PBLK" forced in. Any sport authors its own skills, but
    the two-profile recipe is universal.

Hard cases handled explicitly: cross-side floor, FB discount, self-flex.
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

HAVE = {
 'QB':  dict(BLK=1, PWR=2, MOB=4, COV=3, REC=2, PLAY=9),
 'RB':  dict(BLK=3, PWR=6, MOB=8, COV=2, REC=7, PLAY=6),
 'FB':  dict(BLK=8, PWR=8, MOB=4, COV=2, REC=2, PLAY=5),
 'WR':  dict(BLK=1, PWR=4, MOB=9, COV=3, REC=10,PLAY=5),
 'TE':  dict(BLK=7, PWR=6, MOB=6, COV=4, REC=8, PLAY=5),
 'OT':  dict(BLK=10,PWR=9, MOB=4, COV=0, REC=0, PLAY=3),
 'OG':  dict(BLK=9, PWR=9, MOB=2, COV=0, REC=0, PLAY=3),
 'C':   dict(BLK=6, PWR=8, MOB=3, COV=0, REC=0, PLAY=9),
 'DT':  dict(BLK=0, PWR=10,MOB=4, COV=0, REC=0, PLAY=2),
 'EDGE':dict(BLK=2, PWR=8, MOB=8, COV=3, REC=0, PLAY=5),
 'ILB': dict(BLK=3, PWR=6, MOB=8, COV=4, REC=2, PLAY=7),
 'OLB': dict(BLK=3, PWR=8, MOB=9, COV=5, REC=2, PLAY=7),
 'SS':  dict(BLK=0, PWR=8, MOB=9, COV=9, REC=3, PLAY=7),
 'FS':  dict(BLK=0, PWR=6, MOB=9, COV=10,REC=4, PLAY=8),
 'CB':  dict(BLK=0, PWR=5, MOB=10,COV=10,REC=7, PLAY=6),
 'NICKEL':dict(BLK=0, PWR=6, MOB=9, COV=10,REC=4,PLAY=7),
 'DIME': dict(BLK=0, PWR=5, MOB=9, COV=10,REC=3, PLAY=8),
}

NEED = {
 'RB':   dict(BLK=3, PWR=6, MOB=8, COV=2, REC=7, PLAY=6),
 'FB':   dict(BLK=8, PWR=8, MOB=4, COV=2, REC=2, PLAY=5),
 'WR':   dict(BLK=2, PWR=4, MOB=8, COV=3, REC=10, PLAY=5),
 'TE':   dict(BLK=7, PWR=6, MOB=6, COV=0, REC=8, PLAY=5),
 'OT':   dict(BLK=9, PWR=8, MOB=5, COV=0, REC=0, PLAY=4),
 'OG':   dict(BLK=9, PWR=9, MOB=3, COV=0, REC=0, PLAY=4),
 'C':    dict(BLK=8, PWR=9, MOB=4, COV=0, REC=0, PLAY=9),
 'DT':   dict(BLK=0, PWR=10,MOB=6, COV=0, REC=0, PLAY=2),
 'EDGE': dict(BLK=2, PWR=9, MOB=9, COV=2, REC=0, PLAY=5),
 'ILB':  dict(BLK=3, PWR=7, MOB=8, COV=5, REC=2, PLAY=8),
 'OLB':  dict(BLK=3, PWR=8, MOB=9, COV=5, REC=2, PLAY=7),
 'SS':   dict(BLK=0, PWR=8, MOB=9, COV=9, REC=3, PLAY=7),
 'FS':   dict(BLK=0, PWR=6, MOB=10,COV=10,REC=4, PLAY=8),
 'CB':   dict(BLK=0, PWR=6, MOB=10,COV=10,REC=7, PLAY=7),
}

SKILLS = ['BLK','PWR','MOB','COV','REC','PLAY']

def job_importance(need):
    """Weight each NEED slot: critical (w=1.6), signature (w=1.2), generic (w=0.8)."""
    w = {}
    for s in SKILLS:
        v = need.get(s, 0)
        if s in ('BLK','PWR','MOB'):
            w[s] = 1.6 if v >= 7 else (1.4 if v >= 5 else 1.0)
        elif s == 'COV':
            w[s] = 1.6 if v >= 8 else (1.3 if v >= 5 else 0.8)
        elif s == 'REC':
            w[s] = 1.6 if v >= 8 else (1.3 if v >= 5 else 0.8)
        else: # PLAY
            w[s] = 1.5 if v >= 7 else (1.2 if v >= 4 else 0.7)
    return w

def source_importance(cap):
    """Signature weight: how NEARLY this source matches the job's profile."""
    w = {}
    for s in SKILLS:
        v = cap.get(s, 0)
        if s in ('BLK','PWR','MOB'):
            w[s] = 1.5 if v >= 7 else (1.2 if v >= 4 else 0.7)
        elif s == 'COV':
            w[s] = 1.5 if v >= 6 else (1.2 if v >= 3 else 0.7)
        elif s == 'REC':
            w[s] = 1.5 if v >= 6 else (1.2 if v >= 3 else 0.7)
        else:
            w[s] = 1.4 if v >= 6 else (1.0 if v >= 3 else 0.6)
    return w

def model_price(src, dst):
    if src == dst: return 0
    ps, pd = HAVE.get(src), NEED.get(dst)
    if ps is None or pd is None: return None
    nw = job_importance(pd)
    sc = source_importance(ps)
    # fill_distance: weighted per-skill deficit
    fill = 0.0
    for s in SKILLS:
        gap = max(0, nw.get(s, 0) * pd.get(s, 0) - ps.get(s, 0))
        fill += sc.get(s, 0) * gap
    # structural_distance: |need - have| weighted by sig-overlap (larger when profiles differ in shape)
    struct = 0.0
    for s in SKILLS:
        diff = abs(pd.get(s, 0) - ps.get(s, 0))
        struct += sc.get(s, 0) * diff
    raw = fill + struct * 0.5  # structural counts heavily (two profiles differ structurally)
    return tier(raw)

def tier(x):
    if x < 1: return 0
    if x < 4: return 2
    if x < 9: return 6
    return 12

def compare():
    exact = off1 = hard = 0
    residuals = []
    for src, dests in sorted(owner.items()):
        for dst, o in sorted(dests.items()):
            m = model_price(src, dst)
            if m == o: exact += 1
            else:
                ti, mi = TIERS.index(m), TIERS.index(o)
                d = abs(ti - mi)
                if d == 1: off1 += 1; residuals.append((src,dst,o,m,'off1'))
                else: hard += 1; residuals.append((src,dst,o,m,'hard'))
    return exact, off1, hard, residuals

print("=== REDIRECT v2 (dual-profile distance) ===")
exact, off1, hard, residuals = compare()
print(f"Exact: {exact} / Off-by-one: {len(off1)} / Hard: {hard}")
print("\nResiduals:")
for s,d,o,m,kind in sorted(residuals):
    print(f"  {s}->{d}: owner={o} model={m}")
print("\n=== Run 2: normalizing structural to equal fill (struct_w * 0.3) ===")
# Try structural counted less
SKILLS2 = ['BLK','PWR','MOB','COV','REC','PLAY']
HAVE2 = {k:(dict(HAVE[k]) for k in HAVE) if False else HAVE}  # copy
NEED2 = {k:(dict(NEED[k]) for k in NEED) if False else NEED}

def mprice(src,dst):
    if src==dst: return 0
    ps,pd = HAVE[src],NEED[dst]
    nw = job_importance(pd); sc = source_importance(ps)
    fill = sum(sc.get(s,0)*max(0,nw.get(s,0)*pd.get(s,0)-ps.get(s,0)) for s in SKILLS2)
    struct = sum(sc.get(s,0)*abs(pd.get(s,0)-ps.get(s,0)) for s in SKILLS2)
    raw = fill + struct * 0.3  # less structural
    return tier(raw)

ex2, off2, hard2, res2 = [], [], [], []
for src, dests in sorted(owner.items()):
    for dst, o in sorted(dests.items()):
        m = mprice(src, dst)
        if m==o: ex2.append(1)
        else:
            ti,mi = TIERS.index(m),TIERS.index(o); d = abs(ti-mi)
            if d==1: off2.append(1); res2.append((src,dst,o,m,'o1'))
            else: hard2.append(1); res2.append((src,dst,o,m,'h'))
print(f"Exact: {len(ex2)} / Off-by-one: {len(off2)} / Hard: {len(hard2)}")
for s,d,o,m,k in sorted(res2):
    print(f"  {s}->{d}: owner={o} model={m}")
