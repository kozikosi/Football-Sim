#!/usr/bin/env python3
"""Formula refinement, Option B (MUSE, 2026-11-10).

E5 (same-group A halved + cuts 1.5/4/9 + floor) is the best fit so far:
exact 97, off-by-one 2, hard 0. It breaks 1 rule: FS>SS (owner 2, model 0).
FS and SS are both safeties, but the Owner prices FS->SS at 2, so the
same-group discount over-discounts that pair.

Refinements (all run against the live 99-rule Owner table, architect 97d7e9d):
R1 E5, FS<->SS excluded from the discount.
R2 E5, FS<->SS discount x0.75 instead of x0.5.
R3 E5 + EDGE>OLB as an explicit override (price 0).
R4 R1 + EDGE>OLB override.
R5 R2 + EDGE>OLB override.
R6 Targeted discount: halve A only for the 4 pairs the Owner prices at 0
   (CB>FS, CB>SS, SS>DIME, SS>NICKEL), no discount for other same-group pairs.
R7 R6 + EDGE>OLB override.

RESULTS (run 2026-11-10):
  Baseline (floor, 1/4/9): 93/6/0.
  R1 FS<->SS excluded: 98/1/0. Only EDGE>OLB remains. Broke NOTHING.
  R2 FS<->SS x0.75: 97/2/0. Still breaks FS>SS. (x0.75 is not enough.)
  R3 E5 + EDGE>OLB override: 98/1/0. Only FS>SS remains (broken).
  R4 R1 + EDGE>OLB override: 99/0/0. PERFECT FIT. No residuals, broke nothing.
  R5 R2 + EDGE>OLB override: 98/1/0. Still breaks FS>SS.
  R6 targeted discount: 97/2/0. Residuals EDGE>OLB, ILB>OLB. Broke nothing.
  R7 R6 + EDGE>OLB override: 98/1/0. Residual ILB>OLB. Broke nothing.

R4 is the full derivation: Inkling's formula + cross-side floor + same-group
A halved (excluding FS<->SS) + cuts (1.5,4,9) + EDGE>OLB override (0).
Overfit note: R4 has more fitted choices than E3 (96/99, breaks nothing,
only the cut point changed). The FS<->SS exclusion and the EDGE>OLB override
are each defensible on football grounds (FS/SS are different jobs; EDGE/OLB
share the rush job, like EDGE>ILB and EDGE>RB which are already overrides),
but the council should scrutinise whether R4 is the true derivation or the
best-fitting one. E3 is the conservative choice; R4 is the perfect fit.

Read-only: reads flex.json and thetaprice from git; writes nothing to the repo.
"""
import json, subprocess, re
from collections import Counter

def git_show(ref, path):
    return subprocess.run(['git','show',f'{ref}:{path}'], capture_output=True, text=True, cwd='/home/hatch/workspace/football-sim-muse').stdout

# --- 1. The LIVE 99-rule table (architect 97d7e9d) ---
owner = json.loads(git_show('origin/architect/engine-and-seats','tools/mathlab/flex.json'))['flex']
n = sum(len(v) for v in owner.values())
c = Counter(v for t in owner.values() for v in t.values())
print(f'Live Owner table (architect 97d7e9d): {n} rules, tiers {dict(sorted(c.items()))}')
assert n == 99, f'expected 99 rules, got {n}'
assert (c[12], c[6], c[2], c[0]) == (23, 43, 10, 23), f'tier counts mismatch: {dict(sorted(c.items()))}'

# --- 2. Thetaprice D@90 (pre-bump) ---
tp = git_show('origin/architect/engine-and-seats','tools/mathlab/results/thetaprice-2026-11-09.md')
D = {}
for line in tp.split('\n'):
    m = re.match(r'\|\s*([A-Z]+)>([A-Z0-9]+)\s*\|\s*(\d+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|', line)
    if m:
        src, dst = m.group(1), m.group(2)
        D[(src,dst)] = float(m.group(7))
print(f'thetaprice D@90 rows: {len(D)} (nonzero: {sum(1 for v in D.values() if v>0)})')
D_bumped = dict(D)
D_bumped[('OLB','ILB')] = 6.7
D_bumped[('OLB','SS')] = 6.7

# --- 3b. The cross-side floor term (Option C) ---
OFFENSE = {'QB','RB','FB','WR','TE','OT','OG','C'}
DEFENSE = {'DT','EDGE','ILB','OLB','SS','FS','CB','NICKEL','DIME'}
# K, P are special; K<->P is same-side, not cross-side.
def is_cross_side(src, dst):
    s_off = src in OFFENSE
    d_off = dst in OFFENSE
    s_def = src in DEFENSE
    d_def = dst in DEFENSE
    return (s_off and d_def) or (s_def and d_off)
def model_price_floor(src, dst, cuts=(1,4,9), same_group=None, gate_d2=False, extra_overrides=None, sg_exclude=None, sg_factor=None):
    """model_price with the cross-side floor: cross-side and price < 6 -> 6,
    except flexes into FB (stay free). Floor is a minimum, not a cap."""
    m = model_price(src, dst, cuts=cuts, same_group=same_group, gate_d2=gate_d2, extra_overrides=extra_overrides, sg_exclude=sg_exclude, sg_factor=sg_factor)
    if m is None:
        return None
    if dst != 'FB' and is_cross_side(src, dst) and m < 6:
        return 6
    return m

# --- 3. Inkling's P-322 skill profiles (from the design, P-328-verified) ---
S = {
 'QB':  dict(BLK=1, CTH=2, COV=2, RNG=1, RSH=2, RUN=8, SNP=0),
 'RB':  dict(BLK=3, CTH=6, COV=2, RNG=1, RSH=0, RUN=9, SNP=0),
 'FB':  dict(BLK=8, CTH=2, COV=2, RNG=0, RSH=0, RUN=6, SNP=0),
 'WR':  dict(BLK=1, CTH=10,COV=6, RNG=5, RSH=0, RUN=4, SNP=0),
 'TE':  dict(BLK=7, CTH=8, COV=4, RNG=2, RSH=0, RUN=5, SNP=0),
 'OT':  dict(BLK=10,CTH=0, COV=0, RNG=0, RSH=0, RUN=0, SNP=5),
 'OG':  dict(BLK=9, CTH=0, COV=0, RNG=0, RSH=0, RUN=0, SNP=6),
 'C':   dict(BLK=6, CTH=0, COV=0, RNG=0, RSH=0, RUN=0, SNP=10),
 'DT':  dict(BLK=0, CTH=0, COV=0, RNG=0, RSH=8, RUN=0, SNP=0),
 'EDGE':dict(BLK=2, CTH=0, COV=3, RNG=2, RSH=10,RUN=0, SNP=0),
 'ILB': dict(BLK=0, CTH=2, COV=3.5,RNG=3, RSH=5, RUN=1, SNP=0),
 'OLB': dict(BLK=0, CTH=2, COV=4.5,RNG=2, RSH=7, RUN=0, SNP=0),
 'SS':  dict(BLK=0, CTH=3, COV=9, RNG=4, RSH=3, RUN=0, SNP=0),
 'FS':  dict(BLK=0, CTH=4, COV=9, RNG=9, RSH=1, RUN=0, SNP=0),
 'CB':  dict(BLK=0, CTH=7, COV=10,RNG=8, RSH=0, RUN=0, SNP=0),
 'K':   dict(BLK=0, CTH=0, COV=0, RNG=0, RSH=0, RUN=0, SNP=0, KCK=10, PNT=0),
 'P':   dict(BLK=0, CTH=0, COV=0, RNG=0, RSH=0, RUN=0, SNP=0, KCK=0, PNT=10),
 'NICKEL': dict(BLK=0, CTH=5, COV=9, RNG=4, RSH=0, RUN=0, SNP=0),
 'DIME':   dict(BLK=0, CTH=4, COV=9.5,RNG=4, RSH=0, RUN=0, SNP=0),
}
BETA = dict(BLK=0.75, CTH=0.5, COV=0.5, RNG=0.6, RSH=0.8, RUN=1.1, SNP=0.4, KCK=0.2, PNT=0.2)
DMULT = {'NICKEL': 1.7, 'DIME': 3.6, 'FS': 2.0}
U = {('RB','TE'): 3.0, ('SS','ILB'): 5.0, ('TE','ILB'): 6.4, ('RB','SS'): 6.6, ('EDGE','SS'): 5.1}
OVERRIDE = {('C','OG'): 6, ('FB','RB'): 2, ('FB','TE'): 6, ('EDGE','RB'): 6, ('EDGE','ILB'): 6}
FB_FREE = {'RB','TE','OT','OG','C','DT','EDGE','ILB','OLB'}
def tier(x, cuts=(1,4,9)):
    if x < cuts[0]: return 0
    if x < cuts[1]: return 2
    if x < cuts[2]: return 6
    return 12
def model_price(src, dst, cuts=(1,4,9), same_group=None, gate_d2=False, extra_overrides=None, sg_exclude=None, sg_factor=None):
    """Inkling's P-322 formula, parameterised for experiments.
    cuts: tier cut points (default 1/4/9).
    same_group: None | 'half' | 'zero' — discount the A term when src and dst
      are in the same position group (DB: CB/FS/SS/NICKEL/DIME; LB: ILB/OLB;
      DL: DT/EDGE).
    gate_d2: if True, set A = 0 when D < 2 (trust D over the skill gap when
      the jobs are close by displacement).
    extra_overrides: dict of additional (src,dst) -> tier overrides, applied
      before the formula (explicit exceptions, e.g. {('EDGE','OLB'): 0}).
    sg_exclude: set of (src,dst) pairs excluded from the same-group discount
      (e.g. FS<->SS, which the Owner prices at 2).
    sg_factor: dict mapping (src,dst) -> discount factor for the same-group
      term (overrides the 'half'/'zero' factor for those pairs)."""
    if dst == 'SAM':
        return model_price(src, 'OLB', cuts=cuts, same_group=same_group, gate_d2=gate_d2, extra_overrides=extra_overrides, sg_exclude=sg_exclude, sg_factor=sg_factor)
    if dst == 'FB' and src in FB_FREE:
        return 0
    if (src, dst) in OVERRIDE:
        return OVERRIDE[(src, dst)]
    if extra_overrides and (src, dst) in extra_overrides:
        return extra_overrides[(src, dst)]
    if src == dst:
        return 0
    Dv = D_bumped.get((src, dst), 0.0)
    ps, pd = S.get(src), S.get(dst)
    if ps is None or pd is None:
        return None
    A = 0.0
    for skill, beta in BETA.items():
        if skill == 'RUN' and dst != 'RB':
            continue
        if skill == 'SNP' and dst != 'C':
            continue
        if skill == 'KCK' and dst != 'K':
            continue
        if skill == 'PNT' and dst != 'P':
            continue
        gap = max(0, pd.get(skill, 0) - ps.get(skill, 0))
        b = beta
        if skill == 'COV' and dst in DMULT:
            b = beta * DMULT[dst]
        if skill in ('COV','RNG') and ps.get('CTH', 0) >= 9:
            b = b * 0.5
        if skill == 'BLK' and ps.get('BLK',0) >= 8 and pd.get('BLK',0) >= 8:
            gap = 0
        A += b * gap
    if Dv >= 5:
        A = 0.0
    elif Dv >= 4:
        A = A * 0.5
    if gate_d2 and Dv < 2:
        A = 0.0
    if same_group:
        DB = {'CB','FS','SS','NICKEL','DIME'}
        LB = {'ILB','OLB'}
        DL = {'DT','EDGE'}
        if any(src in g and dst in g for g in (DB, LB, DL)):
            if sg_exclude and (src, dst) in sg_exclude:
                pass  # excluded from the discount: A unchanged
            elif sg_factor and (src, dst) in sg_factor:
                A = A * sg_factor[(src, dst)]
            elif same_group == 'half': A = A * 0.5
            elif same_group == 'zero': A = 0.0
    u = U.get((src, dst), 0.0)
    x = max(0, Dv) + A + u
    return tier(min(max(x, 0), 12), cuts)

# --- 4. Compare model vs live Owner table, rule by rule (base AND floor) ---
# The 44 D-priced rules: those NOT in the 53-override list. The flex.json header
# names the 53 overrides only by count and by "see the relay"; we approximate the
# split by the OVERRIDE dict + the 9 corrections + the floor/item-3 changes, and
# report the overall fit (which is what the derivation prototype needs). The
# exact 44/53 split is recomputed from the relay when the design is finalised.
def compare(price_fn):
    exact = 0; off1 = []; hard = []; missing = []
    for src, dests in sorted(owner.items()):
        for dst, o in sorted(dests.items()):
            m = price_fn(src, dst)
            if m is None:
                missing.append((src, dst, o)); continue
            if m == o:
                exact += 1
            else:
                tiers = [0,2,6,12]
                d = abs(tiers.index(m) - tiers.index(o))
                if d == 1: off1.append((src, dst, o, m))
                else: hard.append((src, dst, o, m))
    return exact, off1, hard, missing

# --- 4. Experiments: variants of the floor model ---
# Baseline is the floor model (Inkling + cross-side floor), cuts 1/4/9:
# expected exact 93, off-by-one 6, hard 0 (MUSE Option C, confirmed).
def report(name, price_fn, base_exact_set):
    exact, off1, hard, missing = compare(price_fn)
    print(f'\n{name}: exact {exact}, off-by-one {len(off1)}, hard {len(hard)}, no-profile {len(missing)}')
    print(f'  residuals: {sorted(off1 + hard)}')
    broken = []
    for (src, dst) in sorted(base_exact_set):
        o = owner[src][dst]
        if price_fn(src, dst) != o:
            broken.append((src, dst, o, price_fn(src, dst)))
    print(f'  broke {len(broken)} rules the baseline got exact: {broken}')
    return exact, off1, hard

baseline_fn = lambda s, d: model_price_floor(s, d)
base_exact, base_off1, base_hard, _ = compare(baseline_fn)
print(f'\nBASELINE (floor, cuts 1/4/9): exact {base_exact}, off-by-one {len(base_off1)}, hard {len(base_hard)}')
print(f'Expected: exact 93, off-by-one 6, hard 0. Match: {(base_exact, len(base_off1), len(base_hard)) == (93, 6, 0)}')
print(f'Baseline residuals: {sorted(base_off1 + base_hard)}')
base_exact_set = set()
for src, dests in sorted(owner.items()):
    for dst, o in sorted(dests.items()):
        if baseline_fn(src, dst) == o:
            base_exact_set.add((src, dst))

print('\n--- Option B refinements (fix FS>SS without losing the E5 gains) ---')
print('E5 baseline: same-group A halved + cuts (1.5,4,9) + floor = 97/2/0, breaks FS>SS (2->0).')
# R1: E5 but exclude FS<->SS from the same-group discount.
report('R1 E5, FS<->SS excluded from discount', lambda s, d: model_price_floor(s, d, same_group='half', cuts=(1.5,4,9), sg_exclude={('FS','SS'),('SS','FS')}), base_exact_set)
# R2: E5 but FS<->SS get a smaller discount (x0.75 instead of x0.5).
report('R2 E5, FS<->SS discount x0.75', lambda s, d: model_price_floor(s, d, same_group='half', cuts=(1.5,4,9), sg_factor={('FS','SS'): 0.75, ('SS','FS'): 0.75}), base_exact_set)
# R3: E5 + EDGE>OLB as an explicit override (price 0).
report('R3 E5 + EDGE>OLB override (0)', lambda s, d: model_price_floor(s, d, same_group='half', cuts=(1.5,4,9), extra_overrides={('EDGE','OLB'): 0}), base_exact_set)
# R4: R1 + EDGE>OLB override (the combination: fix FS>SS AND EDGE>OLB).
report('R4 R1 + EDGE>OLB override (0)', lambda s, d: model_price_floor(s, d, same_group='half', cuts=(1.5,4,9), sg_exclude={('FS','SS'),('SS','FS')}, extra_overrides={('EDGE','OLB'): 0}), base_exact_set)
# R5: R2 + EDGE>OLB override.
report('R5 R2 + EDGE>OLB override (0)', lambda s, d: model_price_floor(s, d, same_group='half', cuts=(1.5,4,9), sg_factor={('FS','SS'): 0.75, ('SS','FS'): 0.75}, extra_overrides={('EDGE','OLB'): 0}), base_exact_set)
# R6: targeted discount — halve A only for the 4 pairs the Owner prices at 0
# (CB>FS, CB>SS, SS>DIME, SS>NICKEL), no discount for other same-group pairs.
# Implemented by excluding every other same-group pair from the discount.
ALL_SG = set()
for g in ({'CB','FS','SS','NICKEL','DIME'}, {'ILB','OLB'}, {'DT','EDGE'}):
    for a in g:
        for b in g:
            if a != b: ALL_SG.add((a,b))
TARGET = {('CB','FS'),('CB','SS'),('SS','DIME'),('SS','NICKEL')}
report('R6 targeted discount (only the 4 Owner-0 pairs)', lambda s, d: model_price_floor(s, d, same_group='half', cuts=(1.5,4,9), sg_exclude=ALL_SG - TARGET), base_exact_set)
# R7: R6 + EDGE>OLB override.
report('R7 R6 + EDGE>OLB override (0)', lambda s, d: model_price_floor(s, d, same_group='half', cuts=(1.5,4,9), sg_exclude=ALL_SG - TARGET, extra_overrides={('EDGE','OLB'): 0}), base_exact_set)
