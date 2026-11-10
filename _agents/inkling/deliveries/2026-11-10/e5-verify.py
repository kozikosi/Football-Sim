#!/usr/bin/env python3
# e5verify.py — independent re-implementation of Inkling's P-322 formula +
# MUSE's E5 composite (cross-side floor + same-group A-discount + re-fit cuts 1.5/4/9).
# Re-implemented from the DESIGN FILE (inbox/20261110-0104-inkling-P-322-skill-profile-design.md §3)
# and the 2026-11-10 E5 council prompt. MUSE's scripts were not read for the implementation.
# Measured against the LIVE 99-rule table: origin/architect/engine-and-seats flex.json @ 97d7e9d.
import json, re, sys

TMP = '/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/e5-verify/'
table = json.load(open(TMP + 'flex-97d7e9d.json'))['flex']
pairs = [(s, d, p) for s, v in table.items() for d, p in v.items()]

# ---- D (slotWins20 displacement, thetaprice.md = pre-bump Architect data; OLB>ILB/OLB>SS bumped ~6.7 per Owner) ----
D = {}
for line in open('/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/thetaprice.md'):
    m = re.match(r'\| ([A-Z]+)>([A-Z]+) \| \d+ \| [\d.]+ \| [\d.]+ \| [\d.-]+ \| ([\d.-]+) \|', line)
    if m:
        D[(m.group(1), m.group(2))] = float(m.group(3))
D[('OLB','ILB')] = D[('OLB','SS')] = 6.7   # Owner's WILL-bump estimate (~6.7); ILB>FS/OLB>FS absent (item-3 rows, no D yet -> default 0)

# ---- skill profiles, exactly per the design file §2 ----
SKILLS = ['BLK','CTH','COV','RNG','RSH','RUN','SNP','KCK','PNT']
PROF = {
 'QB': [1,2,2,1,2,8,0,0,0], 'RB': [3,6,2,1,0,9,0,0,0], 'FB': [8,2,2,0,0,6,0,0,0],
 'WR': [1,10,6,5,0,4,0,0,0], 'TE': [7,8,4,2,0,5,0,0,0], 'OT': [10,0,0,0,0,0,5,0,0],
 'OG': [9,0,0,0,0,0,6,0,0], 'C' : [6,0,0,0,0,0,10,0,0], 'DT': [0,0,0,0,8,0,0,0,0],
 'EDGE':[2,0,3,2,10,0,0,0,0], 'ILB':[0,2,3.5,3,5,1,0,0,0], 'OLB':[0,2,4.5,2,7,0,0,0,0],
 'SS': [0,3,9,4,3,0,0,0,0], 'FS': [0,4,9,9,1,0,0,0,0], 'CB': [0,7,10,8,0,0,0,0,0],
 'K' : [0,0,0,0,0,0,0,10,0], 'P' : [0,0,0,0,0,0,0,0,10],
 'NICKEL':[0,5,9,4,0,0,0,0,0], 'DIME':[0,4,9.5,4,0,0,0,0,0],
}
BETA = {'BLK':0.75, 'CTH':0.5, 'COV':0.5, 'RNG':0.6, 'RSH':0.8, 'RUN':1.1, 'SNP':0.4, 'KCK':0.2, 'PNT':0.2}
DMULT_COV = {'NICKEL':1.7, 'DIME':3.6, 'FS':2.0}
U = {('RB','TE'):3.0, ('SS','ILB'):5.0, ('TE','ILB'):6.4, ('RB','SS'):6.6, ('EDGE','SS'):5.1}
OVERRIDES = {('EDGE','TE'):6, ('C','OG'):6, ('FB','RB'):2, ('FB','TE'):6, ('EDGE','RB'):6, ('EDGE','ILB'):6}
ALLOWED_FB = {'RB','TE','OT','OG','C','DT','EDGE','ILB','OLB'}   # the nine free FB flexes
OFF = {'QB','RB','FB','WR','TE','OT','OG','C'}
DEF = {'DT','EDGE','ILB','OLB','SS','FS','CB','NICKEL','DIME'}
SPECIAL = {'K','P'}                                             # K<->P is same-side
GROUPS = [{'CB','FS','SS','NICKEL','DIME'}, {'ILB','OLB'}, {'DT','EDGE'}]   # DB / LB / DL

def same_group(a, b):
    return any(a in g and b in g for g in GROUPS)

def cross_side(a, b):
    return (a in OFF and b in DEF) or (a in DEF and b in OFF)

def tier(x, cuts):
    x1, x2, x3 = cuts
    if x < x1: return 0
    if x < x2: return 2
    if x < x3: return 6
    return 12

def A_term(src, dst, blk_general=True, synergy_general=False):
    s, d = PROF[src], PROF[dst]
    tot = 0.0
    for i, sk in enumerate(SKILLS):
        gap = d[i] - s[i]
        if gap <= 0: continue
        if sk == 'SNP' and dst != 'C': continue
        if sk == 'KCK' and dst != 'K': continue
        if sk == 'PNT' and dst != 'P': continue
        if sk == 'RUN' and dst != 'RB': continue                 # RUN prices only RB-the-slot (design §3)
        if sk == 'BLK' and s[0] >= 8 and d[0] >= 8:             # elite-line pair: D prices the swap
            if blk_general or dst == 'C':                       # general reading (3 seats: 88/99; literal dst==C gives 87/99)
                continue
        w = BETA[sk]
        if sk == 'COV' and dst in DMULT_COV:
            w *= DMULT_COV[dst]
        if sk in ('COV', 'RNG') and s[1] >= 9:                  # catching specialists (WR CTH 10)
            if synergy_general or dst in DMULT_COV:
                w *= 0.5
        tot += w * gap
    return tot

def price(src, dst, *, cuts=(1, 4, 9), floor=False, halve_a=False, blk_general=True,
          synergy_general=False, overrides=OVERRIDES):
    if (src, dst) in overrides:
        return overrides[(src, dst)]
    if dst == 'FB' and src in ALLOWED_FB:
        p = 0
        # FB is the floor exception: stays free, never lifted by the cross-side floor
        return p
    dd = D.get((src, dst), 0.0)
    a = A_term(src, dst, blk_general, synergy_general)
    if halve_a and same_group(src, dst):
        a *= 0.5
    if dd >= 5: a = 0.0
    elif dd >= 4: a *= 0.5
    p = tier(max(0.0, dd) + a + U.get((src, dst), 0.0), cuts)
    if floor and cross_side(src, dst) and dst != 'FB' and p < 6:
        p = 6
    return p

TIER = {0: 0, 2: 1, 6: 2, 12: 3}

def run(label, **kw):
    exact = near = hard = 0
    resid = []
    for s, d, o in pairs:
        p = price(s, d, **kw)
        if p == o: exact += 1
        elif abs(TIER[p] - TIER[o]) == 1: near += 1; resid.append((s, d, o, p))
        else: hard += 1; resid.append((s, d, o, p))
    print(f"== {label}: exact {exact} · off-by-one {near} · hard {hard}  (of {len(pairs)})")
    for s, d, o, p in sorted(resid, key=lambda r: (abs(TIER[r[2]]-TIER[r[3]]), r[0], r[1])):
        kind = '±1 tier' if abs(TIER[o] - TIER[p]) == 1 else 'HARD'
        print(f"     {s}>{d}: owner {o}  model {p}   ({kind})")
    return exact, near, hard

print(f"live table @97d7e9d: {len(pairs)} rules, counts {dict(sorted((v for v in table.values() for _ in [0]), key=int)) if False else {k: sum(1 for _,_,p in pairs if p==k) for k in sorted(set(p for _,_,p in pairs))}}")
print("stage 0 — base P-322 (cuts 1/4/9, no floor, no same-group), general BLK reading:")
run("base general-BLK", cuts=(1,4,9))
print("stage 0' — base, literal dst==C BLK reading:")
run("base literal-BLK", cuts=(1,4,9), blk_general=False)
print("stage 0''— base, synergy applied generally (any dst) instead of dmultCOV-only:")
run("base synergy-general", cuts=(1,4,9), synergy_general=True)
print("stage 1 — base + cross-side floor (Option C):")
run("base+floor", cuts=(1,4,9), floor=True)
print("stage 2 — re-fit cuts (1.5,4,9) + floor, no same-group discount (E3):")
run("E3 cuts+floor", cuts=(1.5,4,9), floor=True)
print("stage 2' — same as E3 but cuts 1/4/9 (isolate the floor/cut effects):")
run("floor + cuts 1/4/9", cuts=(1,4,9), floor=True)
print("stage 3 — E5: same-group A halved + re-fit cuts (1.5,4,9) + floor:")
run("E5", cuts=(1.5,4,9), floor=True, halve_a=True)
print("stage 3' — E5 without the re-fit (cuts 1/4/9):")
run("E5 cuts 1/4/9 (no re-fit)", cuts=(1,4,9), floor=True, halve_a=True)
print("stage 3''— E5 without the floor (cuts 1.5/4/9 + halving only):")
run("halving + cuts 1.5/4/9, no floor", cuts=(1.5,4,9), floor=False, halve_a=True)
print("stage 4 — E5 + EDGE>OLB as explicit OVERRIDE (price 0):")
ov = dict(OVERRIDES); ov[('EDGE','OLB')] = 0
run("E5 + override EDGE>OLB=0", cuts=(1.5,4,9), floor=True, halve_a=True, overrides=ov)
