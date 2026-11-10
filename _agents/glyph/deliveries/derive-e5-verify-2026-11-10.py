#!/usr/bin/env python3
"""
Glyph independent verification of P-322 derivation E5 hybrid (2026-11-10).
Implements from prompt/MUSE derive-improve definitions (not by running MUSE script):
  - Inkling P-322 base (profiles/betas/dmults/U/OVERRIDE/FB_FREE/D_bumped/gate/tier)
  - Cross-side floor term (prompt-defined role groups; FB dest exempt)
  - Same-group A halved for DB {CB,FS,SS,NICKEL,DIME}, LB {ILB,OLB}, DL {DT,EDGE}
  - Re-fit cuts (1.5,4,9)
  - E5 = floor + same_group='half' + cuts (1.5,4,9)
  - E5 + EDGE>OLB override (=0) prediction check

Reads live 99-rule table and D@90 from origin/architect/engine-and-seats:97d7e9d.
Read-only analysis; writes nothing to repo.
"""
import json, re, subprocess
from collections import Counter

REF = '97d7e9d'
WORKDIR = '/Users/kosi/Desktop/wt/glyph'

def git_show(path):
    return subprocess.check_output(['git', 'show', f'{REF}:{path}'], text=True, cwd=WORKDIR)

# --- live table ---
flex_doc = json.loads(git_show('tools/mathlab/flex.json'))
owner = flex_doc['flex']
rules = [(s, d, v) for s, dests in sorted(owner.items()) for d, v in sorted(dests.items())]
n = len(rules)
counts = Counter(v for _, _, v in rules)
print(f'REF={REF}')
print(f'RULES={n} TIER_COUNTS={dict(sorted(counts.items()))}')
assert n == 99 and (counts[12], counts[6], counts[2], counts[0]) == (23, 43, 10, 23)

# --- D@90 ---
tp = git_show('tools/mathlab/results/thetaprice-2026-11-09.md')
D = {}
row_re = re.compile(r'^\|\s*([A-Z]+)>([A-Z0-9]+)\s*\|\s*\d+\s*\|\s*[\d.]+\s*\|\s*[\d.]+\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|')
for line in tp.splitlines():
    m = row_re.match(line)
    if m:
        D[(m.group(1), m.group(2))] = float(m.group(4))
D_bumped = dict(D)
D_bumped[('OLB', 'ILB')] = 6.7
D_bumped[('OLB', 'SS')] = 6.7
print(f'THETAPRICE_ROWS={len(D)} NONZERO_D={sum(1 for v in D.values() if v>0)} BUMPED_OLB>ILB={D_bumped[("OLB","ILB")]} OLB>SS={D_bumped[("OLB","SS")]}')

# --- prompt-defined groups ---
OFFENSE = {'QB', 'RB', 'FB', 'WR', 'TE', 'OT', 'OG', 'C'}
DEFENSE = {'DT', 'EDGE', 'ILB', 'OLB', 'SS', 'FS', 'CB', 'NICKEL', 'DIME'}
DB = {'CB', 'FS', 'SS', 'NICKEL', 'DIME'}
LB = {'ILB', 'OLB'}
DL = {'DT', 'EDGE'}

def is_cross_side(src, dst):
    s_off, d_off = src in OFFENSE, dst in OFFENSE
    s_def, d_def = src in DEFENSE, dst in DEFENSE
    return (s_off and d_def) or (s_def and d_off)

# --- Inkling profiles/constants (from design) ---
S = {
 'QB':   {'BLK':1,'CTH':2,'COV':2,'RNG':1,'RSH':2,'RUN':8,'SNP':0},
 'RB':   {'BLK':3,'CTH':6,'COV':2,'RNG':1,'RSH':0,'RUN':9,'SNP':0},
 'FB':   {'BLK':8,'CTH':2,'COV':2,'RNG':0,'RSH':0,'RUN':6,'SNP':0},
 'WR':   {'BLK':1,'CTH':10,'COV':6,'RNG':5,'RSH':0,'RUN':4,'SNP':0},
 'TE':   {'BLK':7,'CTH':8,'COV':4,'RNG':2,'RSH':0,'RUN':5,'SNP':0},
 'OT':   {'BLK':10,'CTH':0,'COV':0,'RNG':0,'RSH':0,'RUN':0,'SNP':5},
 'OG':   {'BLK':9,'CTH':0,'COV':0,'RNG':0,'RSH':0,'RUN':0,'SNP':6},
 'C':    {'BLK':6,'CTH':0,'COV':0,'RNG':0,'RSH':0,'RUN':0,'SNP':10},
 'DT':   {'BLK':0,'CTH':0,'COV':0,'RNG':0,'RSH':8,'RUN':0,'SNP':0},
 'EDGE': {'BLK':2,'CTH':0,'COV':3,'RNG':2,'RSH':10,'RUN':0,'SNP':0},
 'ILB':  {'BLK':0,'CTH':2,'COV':3.5,'RNG':3,'RSH':5,'RUN':1,'SNP':0},
 'OLB':  {'BLK':0,'CTH':2,'COV':4.5,'RNG':2,'RSH':7,'RUN':0,'SNP':0},
 'SS':   {'BLK':0,'CTH':3,'COV':9,'RNG':4,'RSH':3,'RUN':0,'SNP':0},
 'FS':   {'BLK':0,'CTH':4,'COV':9,'RNG':9,'RSH':1,'RUN':0,'SNP':0},
 'CB':   {'BLK':0,'CTH':7,'COV':10,'RNG':8,'RSH':0,'RUN':0,'SNP':0},
 'K':    {'BLK':0,'CTH':0,'COV':0,'RNG':0,'RSH':0,'RUN':0,'SNP':0,'KCK':10,'PNT':0},
 'P':    {'BLK':0,'CTH':0,'COV':0,'RNG':0,'RSH':0,'RUN':0,'SNP':0,'KCK':0,'PNT':10},
 'NICKEL': {'BLK':0,'CTH':5,'COV':9,'RNG':4,'RSH':0,'RUN':0,'SNP':0},
 'DIME':   {'BLK':0,'CTH':4,'COV':9.5,'RNG':4,'RSH':0,'RUN':0,'SNP':0},
}
BETA = {'BLK':0.75,'CTH':0.5,'COV':0.5,'RNG':0.6,'RSH':0.8,'RUN':1.1,'SNP':0.4,'KCK':0.2,'PNT':0.2}
DMULT = {'NICKEL':1.7,'DIME':3.6,'FS':2.0}
U = {('RB','TE'):3.0, ('SS','ILB'):5.0, ('TE','ILB'):6.4, ('RB','SS'):6.6, ('EDGE','SS'):5.1}
OVERRIDE_BASE = {('C','OG'):6, ('FB','RB'):2, ('FB','TE'):6, ('EDGE','RB'):6, ('EDGE','ILB'):6}
FB_FREE = {'RB','TE','OT','OG','C','DT','EDGE','ILB','OLB'}

def tier(x, cuts=(1, 4, 9)):
    if x < cuts[0]: return 0
    if x < cuts[1]: return 2
    if x < cuts[2]: return 6
    return 12

def model_price(src, dst, cuts=(1,4,9), same_group=None, gate_d2=False, override=None, blk_any_dest_elite=True):
    if override is None:
        override = OVERRIDE_BASE
    if dst == 'SAM':
        return model_price(src, 'OLB', cuts=cuts, same_group=same_group, gate_d2=gate_d2, override=override, blk_any_dest_elite=blk_any_dest_elite)
    if dst == 'FB' and src in FB_FREE:
        return 0
    if (src, dst) in override:
        return override[(src, dst)]
    if src == dst:
        return 0
    Dv = D_bumped.get((src, dst), 0.0)
    ps, pd = S.get(src), S.get(dst)
    if ps is None or pd is None:
        return None
    A = 0.0
    for skill, beta in BETA.items():
        if skill == 'RUN' and dst != 'RB': continue
        if skill == 'SNP' and dst != 'C': continue
        if skill == 'KCK' and dst != 'K': continue
        if skill == 'PNT' and dst != 'P': continue
        gap = max(0.0, pd.get(skill, 0) - ps.get(skill, 0))
        b = beta
        if skill == 'COV' and dst in DMULT:
            b = beta * DMULT[dst]
        if skill in ('COV', 'RNG') and ps.get('CTH', 0) >= 9:
            b = b * 0.5
        if skill == 'BLK' and ps.get('BLK', 0) >= 8 and pd.get('BLK', 0) >= 8:
            if blk_any_dest_elite or dst == 'C':
                gap = 0.0
        A += b * gap
    if Dv >= 5:
        A_eff = 0.0
    elif Dv >= 4:
        A_eff = A * 0.5
    else:
        A_eff = A
    if gate_d2 and Dv < 2:
        A_eff = 0.0
    if same_group:
        if any(src in g and dst in g for g in (DB, LB, DL)):
            if same_group == 'half':
                A_eff = A_eff * 0.5
            elif same_group == 'zero':
                A_eff = 0.0
    u = U.get((src, dst), 0.0)
    x = max(0.0, Dv) + A_eff + u
    x = min(max(x, 0.0), 12.0)
    return tier(x, cuts)

def model_price_floor(src, dst, cuts=(1,4,9), same_group=None, gate_d2=False, override=None, blk_any_dest_elite=True):
    m = model_price(src, dst, cuts=cuts, same_group=same_group, gate_d2=gate_d2, override=override, blk_any_dest_elite=blk_any_dest_elite)
    if m is None:
        return None
    # cross-side floor: cross-side and price < 6 -> 6, except flexes into FB (stay free)
    if dst != 'FB' and is_cross_side(src, dst) and m < 6:
        return 6
    return m

def compare(price_fn):
    exact = 0
    off1 = []
    hard = []
    missing = []
    tiers = [0, 2, 6, 12]
    for src, dst, o in rules:
        m = price_fn(src, dst)
        if m is None:
            missing.append((src, dst, o))
            continue
        if m == o:
            exact += 1
        else:
            diff = abs(tiers.index(m) - tiers.index(o))
            rec = (src, dst, o, m)
            if diff == 1:
                off1.append(rec)
            else:
                hard.append(rec)
    return exact, off1, hard, missing

def report(name, price_fn, baseline_fn=None):
    exact, off1, hard, missing = compare(price_fn)
    print(f'\n=== {name} ===')
    print(f'EXACT={exact} OFF_BY_ONE={len(off1)} HARD={len(hard)} MISSING={len(missing)}')
    print('RESIDUALS=')
    for r in sorted(off1 + hard):
        print(f'  {r[0]}>{r[1]} owner={r[2]} model={r[3]}')
    if baseline_fn is not None:
        broken = []
        for src, dst, o in rules:
            if baseline_fn(src, dst) == o and price_fn(src, dst) != o:
                broken.append((src, dst, o, price_fn(src, dst)))
        fixed = []
        for src, dst, o in rules:
            if baseline_fn(src, dst) != o and price_fn(src, dst) == o:
                fixed.append((src, dst, o, baseline_fn(src, dst)))
        print(f'BROKE_FROM_BASELINE={len(broken)} {sorted(broken)}')
        print(f'FIXED_FROM_BASELINE={len(fixed)} {sorted(fixed)}')
    return exact, off1, hard

# Baselines
base = lambda s,d: model_price_floor(s,d, cuts=(1,4,9), same_group=None)
e3 = lambda s,d: model_price_floor(s,d, cuts=(1.5,4,9), same_group=None)
e5 = lambda s,d: model_price_floor(s,d, cuts=(1.5,4,9), same_group='half')
ov_edge_olb = dict(OVERRIDE_BASE); ov_edge_olb[('EDGE','OLB')] = 0
e5_edge0 = lambda s,d: model_price_floor(s,d, cuts=(1.5,4,9), same_group='half', override=ov_edge_olb)

print('\nCLASSIFICATION: OFFENSE={QB,RB,FB,WR,TE,OT,OG,C} DEFENSE={DT,EDGE,ILB,OLB,SS,FS,CB,NICKEL,DIME} K/P special (same-side) | DB={CB,FS,SS,NICKEL,DIME} LB={ILB,OLB} DL={DT,EDGE}')
print('BLK elite-line zeroing: MUSE-prototype behavior (both BLK>=8 => gap 0, any dst) used for E5 verification; spec-literal dst==C differs on OG>OT for base (known from prior glyph verify).')

report('BASELINE floor cuts(1,4,9)', base)
report('E3 floor cuts(1.5,4,9), no same-group', e3, baseline_fn=base)
report('E5 floor cuts(1.5,4,9), same-group half (DB/LB/DL)', e5, baseline_fn=base)
report('E5 + EDGE>OLB override=0', e5_edge0, baseline_fn=base)

# also show EDGE>OLB detail and FS>SS detail under E5
print('\nDETAIL_EDGE>OLB_under_E5:', 'owner', owner['EDGE']['OLB'], 'model', e5('EDGE','OLB'))
print('DETAIL_FS>SS_under_E5:', 'owner', owner['FS']['SS'], 'model', e5('FS','SS'))
print('DETAIL_EDGE>OLB_under_E5+override:', 'owner', owner['EDGE']['OLB'], 'model', e5_edge0('EDGE','OLB'))
print('DETAIL_FS>SS_under_E5+override:', 'owner', owner['FS']['SS'], 'model', e5_edge0('FS','SS'))

# compare E5 residuals against prompt claims
e5_exact, e5_off1, e5_hard, _ = compare(e5)
e5_res = {(a,b) for a,b,_,_ in e5_off1+e5_hard}
print('\nE5_matches_prompt_claim_97_2_0_residuals_EDGE>OLB_FS>SS:', (e5_exact, len(e5_off1), len(e5_hard), e5_res) == (97,2,0,{('EDGE','OLB'),('FS','SS')}))
e5o_exact, e5o_off1, e5o_hard, _ = compare(e5_edge0)
print('E5_with_EDGE>OLB_override_matches_98_1_0:', (e5o_exact, len(e5o_off1), len(e5o_hard)) == (98,1,0))
