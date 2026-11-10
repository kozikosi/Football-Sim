#!/usr/bin/env python3
"""P-328: independently verify Inkling's P-322 97/105 fit.

Reads:
  - the live 97-rule flex.json (council/muse mirror of architect 728b2c53)
  - GLM's final-105 flex.json (candidate/reference for the pending 105-rule table)
  - the thetaprice D@90 values (architect branch, P-309)
  - Inkling's P-322 design (scores, beta, gate, dmults, U, tier, FB discount, SAM alias)

Steps:
  1. Construct the final 105-rule table (97 rules + items 3+7 verbatim) and confirm counts.
  2. Verify GLM's final-105 matches that construction.
  3. Implement Inkling's formula and compute model prices rule by rule.
  4. Report exact-match count, residuals, and whether the 8 residuals match Inkling's 8.

D values: thetaprice pre-bump D@90 (architect branch). D_bumped for OLB>ILB and
OLB>SS uses the Owner-estimated ~6.7 (Inkling's design, REPORTED). Rules with no
thetaprice D row are treated as D=0 (thetaprice floors D at 0; a missing row means
the rule was not in the D-picks table, so its D is 0 by the floor). The new item
3+7 rules (ILB>FS, OLB>FS, the 6 SAM mirrors) have no thetaprice D row; they are
handled by the SAM alias (price := price(src->OLB)) and by the item-3 D (see notes).
"""
import json, subprocess, sys, re

def git_show(ref, path):
    return subprocess.run(['git','show',f'{ref}:{path}'], capture_output=True, text=True, cwd='/home/hatch/workspace/football-sim-muse').stdout

# --- 1. The live 97-rule table (council/muse mirror of 728b2c53) ---
flex97 = json.loads(git_show('origin/council/muse','tools/mathlab/flex.json'))['flex']
n97 = sum(len(v) for v in flex97.values())
from collections import Counter
c97 = Counter(v for t in flex97.values() for v in t.values())
print(f'97-rule table: {n97} rules, tiers {dict(sorted(c97.items()))}')

# --- Items 3+7 (verbatim from the Owner's flex answers) ---
# Item 3: TE>DIME 6->12, TE>FS 6->12, ILB>FS new 12, OLB>FS new 12.
# Item 7 (SAM mirrors OLB): EDGE>SAM 0, FS>SAM 6, ILB>SAM 0, OLB>SAM 0, SS>SAM 2, TE>SAM 6.
final = {r: dict(t) for r, t in flex97.items()}
def set_rule(src, dst, val):
    final.setdefault(src, {})[dst] = val
set_rule('TE','DIME',12)
set_rule('TE','FS',12)
set_rule('ILB','FS',12)
set_rule('OLB','FS',12)
for src, val in [('EDGE',0),('FS',6),('ILB',0),('OLB',0),('SS',2),('TE',6)]:
    set_rule(src,'SAM',val)
n105 = sum(len(v) for v in final.values())
c105 = Counter(v for t in final.values() for v in t.values())
print(f'Constructed final table: {n105} rules, tiers {dict(sorted(c105.items()))}')
print(f'Expected counts (23/40/16/26): {"OK" if (c105[12],c105[6],c105[2],c105[0])==(23,40,16,26) else "MISMATCH"}')

# --- 2. GLM's final-105 ---
glm = json.loads(git_show('origin/council/glm','_agents/glm/deliveries/flexrebuild/final-105/flex.json'))['flex']
diffs = []
for r in set(final) | set(glm):
    for d in set(final.get(r,{})) | set(glm.get(r,{})):
        a, b = final.get(r,{}).get(d), glm.get(r,{}).get(d)
        if a != b: diffs.append((r,d,a,b))
print(f'GLM final-105 vs constructed final table: {len(diffs)} differences')
for d in diffs[:10]: print('  ', d)

# --- 3. Thetaprice D@90 (pre-bump) ---
tp = git_show('origin/architect/engine-and-seats','tools/mathlab/results/thetaprice-2026-11-09.md')
D = {}
for line in tp.split('\n'):
    m = re.match(r'\|\s*([A-Z]+)>([A-Z0-9]+)\s*\|\s*(\d+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|', line)
    if m:
        src, dst, now, w85, w90, d85, d90 = m.group(1), m.group(2), int(m.group(3)), float(m.group(4)), float(m.group(5)), float(m.group(6)), float(m.group(7))
        D[(src,dst)] = d90
print(f'thetaprice D@90 rows: {len(D)} (nonzero: {sum(1 for v in D.values() if v>0)})')
# D_bumped: Owner-estimated ~6.7 for OLB>ILB and OLB>SS (Inkling's design, REPORTED).
D_bumped = dict(D)
D_bumped[('OLB','ILB')] = 6.7
D_bumped[('OLB','SS')] = 6.7
print(f"D_bumped overrides: OLB>ILB {D[('OLB','ILB')]} -> 6.7, OLB>SS {D[('OLB','SS')]} -> 6.7")

# --- 4. Inkling's scores (from the design file, §2) ---
# Columns: BLK CTH COV RNG RSH RUN SNP ; KCK/PNT for K/P.
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
DMULT = {'NICKEL': 1.7, 'DIME': 3.6, 'FS': 2.0}  # COV weight multiplier for DB-scheme slots
U = {('RB','TE'): 3.0, ('SS','ILB'): 5.0, ('TE','ILB'): 6.4, ('RB','SS'): 6.6, ('EDGE','SS'): 5.1}
OVERRIDE = {('C','OG'): 6, ('FB','RB'): 2, ('FB','TE'): 6, ('EDGE','RB'): 6, ('EDGE','ILB'): 6}
FB_FREE = {'RB','TE','OT','OG','C','DT','EDGE','ILB','OLB'}  # nine whitelisted sources play FB free
def tier(x):
    if x < 1: return 0
    if x < 4: return 2
    if x < 9: return 6
    return 12
def model_price(src, dst):
    # SAM alias (item 7, exact): dst==SAM -> price(src->OLB)
    if dst == 'SAM':
        return model_price(src, 'OLB')
    # FB discount: whitelisted sources play FB free
    if dst == 'FB' and src in FB_FREE:
        return 0
    # Owner overrides (no model can or should produce them)
    if (src, dst) in OVERRIDE:
        return OVERRIDE[(src, dst)]
    # No-op rules (ILB>ILB, OLB>OLB) are 0 by documentation
    if src == dst:
        return 0
    Dv = D_bumped.get((src, dst), 0.0)
    # A: sum of beta * max(0, p_dst - p_src), with the design's modifiers
    ps, pd = S.get(src), S.get(dst)
    if ps is None or pd is None:
        return None  # no profile (should not happen for the 105 rules)
    A = 0.0
    for skill, beta in BETA.items():
        if skill == 'RUN' and dst != 'RB':
            continue  # RUN gap counts ONLY for dst==RB
        if skill == 'SNP' and dst != 'C':
            continue  # SNP only for dst==C
        if skill == 'KCK' and dst != 'K':
            continue
        if skill == 'PNT' and dst != 'P':
            continue
        gap = max(0, pd.get(skill, 0) - ps.get(skill, 0))
        b = beta
        if skill == 'COV' and dst in DMULT:
            b = beta * DMULT[dst]
        if skill in ('COV','RNG') and ps.get('CTH', 0) >= 9:
            b = b * 0.5  # catching specialists stay with balls
        if skill == 'BLK' and ps.get('BLK',0) >= 8 and pd.get('BLK',0) >= 8:
            gap = 0  # elite-line swaps price by D only
        A += b * gap
    # Gate (vs D): D>=5 -> A counts 0; 4<=D<5 -> A x 0.5; else A fully
    if Dv >= 5:
        A = 0.0
    elif Dv >= 4:
        A = A * 0.5
    u = U.get((src, dst), 0.0)
    x = max(0, Dv) + A + u
    return tier(min(max(x, 0), 12))

# --- 5. Compare model vs Owner final table, rule by rule ---
exact = 0; off1 = []; hard = []; missing = []
for src, dests in sorted(final.items()):
    for dst, owner in sorted(dests.items()):
        m = model_price(src, dst)
        if m is None:
            missing.append((src, dst, owner)); continue
        if m == owner:
            exact += 1
        else:
            # tier distance
            tiers = [0,2,6,12]
            d = abs(tiers.index(m) - tiers.index(owner))
            if d == 1: off1.append((src, dst, owner, m))
            else: hard.append((src, dst, owner, m))
print(f'\nModel vs Owner final table ({n105} rules): exact {exact}, off-by-one-tier {len(off1)}, hard misses {len(hard)}, no-profile {len(missing)}')
print(f'Inkling claimed: exact 97, off-by-one 8, hard 0.')
print('\nOff-by-one-tier residuals (owner, model):')
for r in sorted(off1): print('  ', r)
print('\nHard misses (owner, model):')
for r in sorted(hard): print('  ', r)
print('\nNo-profile (could not compute):')
for r in missing: print('  ', r)
print('\nInkling\'s 8 claimed residuals (owner 0, model 2): EDGE>OLB, EDGE>SAM, ILB>OLB, ILB>SAM, SS>NICKEL, SS>DIME, CB>FS, CB>SS')
mine = set((s,d) for s,d,_,_ in off1)
ink = {('EDGE','OLB'),('EDGE','SAM'),('ILB','OLB'),('ILB','SAM'),('SS','NICKEL'),('SS','DIME'),('CB','FS'),('CB','SS')}
print(f'My residuals == Inkling\'s 8: {mine == ink}')
print(f'In my residuals but not Inkling\'s: {sorted(mine - ink)}')
print(f'In Inkling\'s but not mine: {sorted(ink - mine)}')
