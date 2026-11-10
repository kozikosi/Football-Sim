#!/usr/bin/env python3
"""Derivation prototype + cross-side floor term (MUSE, P-322 direction, Option C).

Extends derive-prototype-2026-11-10.py with the cross-side floor as a term:
if a rule is cross-side (offense to defense or defense to offense) and the
formula's price is below 6, raise it to 6 — except flexes into FB, which stay
free. The floor is a minimum, not a cap: 6 stays 6, 12 stays 12.

MUSE and Claude both predict the fit becomes 93/99 exact, 6 off-by-one-tier,
0 hard. This script confirms or corrects that prediction, and checks whether
the floor term breaks any rule that was previously exact.

Offense roles: QB, RB, FB, WR, TE, OT, OG, C.
Defense roles: DT, EDGE, ILB, OLB, SS, FS, CB, NICKEL, DIME.
Special roles: K, P (K<->P is same-side, not cross-side).

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
def model_price_floor(src, dst):
    """model_price with the cross-side floor: cross-side and price < 6 -> 6,
    except flexes into FB (stay free). Floor is a minimum, not a cap."""
    m = model_price(src, dst)
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
def tier(x):
    if x < 1: return 0
    if x < 4: return 2
    if x < 9: return 6
    return 12
def model_price(src, dst):
    if dst == 'SAM':
        return model_price(src, 'OLB')
    if dst == 'FB' and src in FB_FREE:
        return 0
    if (src, dst) in OVERRIDE:
        return OVERRIDE[(src, dst)]
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
    u = U.get((src, dst), 0.0)
    x = max(0, Dv) + A + u
    return tier(min(max(x, 0), 12))

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

exact, off1, hard, missing = compare(model_price)
print(f'\nBase model vs live Owner table ({n} rules): exact {exact}, off-by-one-tier {len(off1)}, hard misses {len(hard)}, no-profile {len(missing)}')
print(f'Expected (MUSE prototype, Claude prototype): exact 88, off-by-one 11, hard 0.')
print('\nBase off-by-one-tier residuals (src, dst, owner, model):')
for r in sorted(off1): print('  ', r)

exact_f, off1_f, hard_f, missing_f = compare(model_price_floor)
print(f'\nFloor model vs live Owner table ({n} rules): exact {exact_f}, off-by-one-tier {len(off1_f)}, hard misses {len(hard_f)}, no-profile {len(missing_f)}')
print(f'Prediction (MUSE, Claude): exact 93, off-by-one 6, hard 0.')
print(f'Prediction CONFIRMED: {(exact_f, len(off1_f), len(hard_f)) == (93, 6, 0)}')
print('\nFloor off-by-one-tier residuals (src, dst, owner, model):')
for r in sorted(off1_f): print('  ', r)
print('\nFloor hard misses (src, dst, owner, model):')
for r in sorted(hard_f): print('  ', r)

# Did the floor break any rule that was previously exact?
base_exact_set = set()
for src, dests in sorted(owner.items()):
    for dst, o in sorted(dests.items()):
        if model_price(src, dst) == o:
            base_exact_set.add((src, dst))
floor_broken = []
for (src, dst) in sorted(base_exact_set):
    o = owner[src][dst]
    if model_price_floor(src, dst) != o:
        floor_broken.append((src, dst, o, model_price(src, dst), model_price_floor(src, dst)))
print(f'\nRules the floor term BROKE (exact before, wrong after): {len(floor_broken)}')
for r in floor_broken: print('  ', r)
if not floor_broken:
    print('  (none — the floor term only fixed rules, broke none.)')

# Which rules did the floor term change (and fix)?
floor_changed = []
for src, dests in sorted(owner.items()):
    for dst, o in sorted(dests.items()):
        b = model_price(src, dst)
        f = model_price_floor(src, dst)
        if b != f:
            floor_changed.append((src, dst, o, b, f))
print(f'\nRules the floor term CHANGED (src, dst, owner, base-model, floor-model): {len(floor_changed)}')
for r in sorted(floor_changed): print('  ', r)

# --- 5. The formula-versus-table diff (floor model) ---
print('\n--- FORMULA-VERSUS-TABLE DIFF, FLOOR MODEL (all disagreements) ---')
for src, dst, o, m in sorted(off1_f + hard_f):
    print(f'  {src}>{dst}: owner {o}, model {m}')
print(f'\nTotal disagreements (floor model): {len(off1_f) + len(hard_f)} of {n} rules.')
