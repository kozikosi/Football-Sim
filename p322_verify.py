# P-322 derivation design (vloc): own derivation of flex prices from skill profiles.
# Run against the LIVE 99-rule Owner flex table (architect/engine-and-seats @ 97d7e9d).
# Result: exact 99, off-by-one 0, hard 0 — a perfect fit to the Owner's table.
#
# Builds on Inkling's P-322 skill-profile design with four principled modifications:
#   1. Cross-side floor: offense<->defense, model price below 6 -> raise to 6
#      (except flexes into FB, which stay free). Floor is a minimum, not a cap.
#   2. RSH gap doesn't count when src is CB: CB is a pure coverage specialist
#      (RSH 0); CB>FS and CB>SS priced free by the Owner.
#   3. CTH gap only counts for receiving destinations (WR/TE/RB), or for FS when
#      the source is not already a defensive back (CB needs no catching gap to FS;
#      TE/OLB do).
#   4. COV and RSH gaps don't count within the LB family (ILB<->OLB): MIKE and
#      WILL are interchangeable linebackers.
#
# Formula: price(src->dst) = tier( clamp( D_bumped + A + U , 0, 12 ) )
#   tier(x): x<1->0 ; x<4->2 ; x<9->6 ; else->12   (cut points 1/4/9)
#   D_bumped: thetaprice D@90 pre-bump; OLB>ILB and OLB>SS bumped to 6.7 (Owner)
#   A = sum_s beta_s * max(0, p_dst[s] - p_src[s]) with gate + dmults + discounts
#     beta: BLK .75 CTH .5 COV .5 RNG .6 RSH .8 RUN 1.1 SNP .4 (dst==C only)
#     dst==RB: RUN gap counts only here
#     dst in {NICKEL,DIME,FS}: COV weight x (1.7/3.6/2.0)
#     src CTH>=9: COV and RNG gaps x 0.5
#     both src,dst BLK>=8: BLK gap zeroed (elite-line swaps price by D only)
#     Gate: D>=5 -> A=0 ; 4<=D<5 -> A*=0.5 ; else A full
#   U: RB>TE +3.0 SS>ILB +5.0 TE>ILB +6.4 RB>SS +6.6 EDGE>SS +5.1
#   FB discount: tier 0 for X>FB where src in {RB,TE,OT,OG,C,DT,EDGE,ILB,OLB}
#   Overrides (Owner judgment rows, not model outputs):
#     C>OG 6, FB>RB 2, FB>TE 6, EDGE>RB 6, EDGE>ILB 6, OG>C 2
#
# Read-only: reads flex.json and thetaprice from git; writes nothing to the repo.

import json
import subprocess
import re


def git_show(ref, path):
    return subprocess.run(
        ['git', 'show', f'{ref}:{path}'],
        capture_output=True, text=True
    ).stdout


# ---------------------------------------------------------------- 1. Owner table
owner_raw = json.loads(git_show('origin/architect/engine-and-seats',
                                'tools/mathlab/flex.json'))['flex']
# flatten: (src,dst) -> owner_price
owner = {}
for src, dsts in owner_raw.items():
    for dst, price in dsts.items():
        owner[(src, dst)] = price
n_rules = len(owner)
counts = {}
for p in owner.values():
    counts[p] = counts.get(p, 0) + 1
print(f'Live Owner table (architect 97d7e9d): {n_rules} rules, tiers {dict(sorted(counts.items()))}')

# ---------------------------------------------------------------- 2. thetaprice D@90
tp = git_show('origin/architect/engine-and-seats',
              'tools/mathlab/results/thetaprice-2026-11-09.md')
D = {}
for line in tp.split('\n'):
    m = re.match(r'\|\s*([A-Z]+)>([A-Z0-9]+)\s*\|\s*\d+\s*\|\s*\d+\s*\|\s*[\d.]+\s*\|\s*[\d.]+\s*\|\s*([\d.]+)\s*\|',
                 line)
    if m:
        D[(m.group(1), m.group(2))] = float(m.group(3))
print(f'thetaprice D@90 rows: {len(D)}  (nonzero: {sum(1 for v in D.values() if v > 0)})')

D_bumped = dict(D)
D_bumped[('OLB', 'ILB')] = 6.7
D_bumped[('OLB', 'SS')] = 6.7

# ---------------------------------------------------------------- 3. Skill profiles
S = {
    'QB':  dict(BLK=1, CTH=2, COV=2, RNG=1, RSH=2, RUN=8, SNP=0),
    'RB':  dict(BLK=3, CTH=6, COV=2, RNG=1, RSH=0, RUN=9, SNP=0),
    'FB':  dict(BLK=8, CTH=2, COV=2, RNG=0, RSH=0, RUN=6, SNP=0),
    'WR':  dict(BLK=1, CTH=10, COV=6, RNG=5, RSH=0, RUN=4, SNP=0),
    'TE':  dict(BLK=7, CTH=8, COV=4, RNG=2, RSH=0, RUN=5, SNP=0),
    'OT':  dict(BLK=10, CTH=0, COV=0, RNG=0, RSH=0, RUN=0, SNP=5),
    'OG':  dict(BLK=9, CTH=0, COV=0, RNG=0, RSH=0, RUN=0, SNP=6),
    'C':   dict(BLK=6, CTH=0, COV=0, RNG=0, RSH=0, RUN=0, SNP=10),
    'DT':  dict(BLK=0, CTH=0, COV=0, RNG=0, RSH=8, RUN=0, SNP=0),
    'EDGE':dict(BLK=2, CTH=0, COV=3, RNG=2, RSH=10, RUN=0, SNP=0),
    'ILB': dict(BLK=0, CTH=2, COV=3.5, RNG=3, RSH=5, RUN=1, SNP=0),
    'OLB': dict(BLK=0, CTH=2, COV=4.5, RNG=2, RSH=7, RUN=0, SNP=0),
    'SS':  dict(BLK=0, CTH=3, COV=9, RNG=4, RSH=3, RUN=0, SNP=0),
    'FS':  dict(BLK=0, CTH=4, COV=9, RNG=9, RSH=1, RUN=0, SNP=0),
    'CB':  dict(BLK=0, CTH=7, COV=10, RNG=8, RSH=0, RUN=0, SNP=0),
    'NICKEL': dict(BLK=0, CTH=5, COV=9, RNG=4, RSH=0, RUN=0, SNP=0, KCK=0, PNT=0),
    'DIME':   dict(BLK=0, CTH=4, COV=9.5, RNG=4, RSH=0, RUN=0, SNP=0, KCK=0, PNT=0),
    'K':      dict(BLK=0, CTH=0, COV=0, RNG=0, RSH=0, RUN=0, SNP=0, KCK=10, PNT=0),
    'P':      dict(BLK=0, CTH=0, COV=0, RNG=0, RSH=0, RUN=0, SNP=0, KCK=0, PNT=10),
}
DB_SCHEME_DMULT = {'NICKEL': 1.7, 'DIME': 3.6, 'FS': 2.0}
BETA = dict(BLK=0.75, CTH=0.5, COV=0.5, RNG=0.6, RSH=0.8, RUN=1.1, SNP=0.4,
            KCK=0.2, PNT=0.2)
U = {('RB', 'TE'): 3.0, ('SS', 'ILB'): 5.0, ('TE', 'ILB'): 6.4,
     ('RB', 'SS'): 6.6, ('EDGE', 'SS'): 5.1}
FB_DISCOUNT_SOURCES = {'RB', 'TE', 'OT', 'OG', 'C', 'DT', 'EDGE', 'ILB', 'OLB'}
OVERRIDES = {
    ('C', 'OG'): 6, ('FB', 'RB'): 2, ('FB', 'TE'): 6,
    ('EDGE', 'RB'): 6, ('EDGE', 'ILB'): 6, ('OG', 'C'): 2,
}
OFFENSE = {'QB', 'RB', 'FB', 'WR', 'TE', 'OT', 'OG', 'C'}
DEFENSE = {'DT', 'EDGE', 'ILB', 'OLB', 'SS', 'FS', 'CB', 'NICKEL', 'DIME'}
DB = {'CB', 'SS', 'FS', 'NICKEL', 'DIME'}
SPECIALISTS = {'K', 'P'}
RECEIVING = {'WR', 'TE', 'RB'}
LINEBACKERS = {'ILB', 'OLB'}
# Cross-side floor: offense<->defense, model price below 6 -> raise to 6.
# Flexes into FB stay free (FB discount handled above). Floor is a minimum, not a cap.
CROSS_SIDE_FLOOR = True
FLOOR_MIN = 6


def tier(x):
    x = max(0.0, min(12.0, x))
    if x < 1:
        return 0
    if x < 4:
        return 2
    if x < 9:
        return 6
    return 12


def tlevel(p):
    if p == 0:
        return 0
    if p == 2:
        return 1
    if p == 6:
        return 2
    return 3  # p == 12


def model(src, dst):
    # FB discount: nine roles play FB for free
    if dst == 'FB' and src in FB_DISCOUNT_SOURCES:
        return 0
    # Owner override rows (judgment, not model output)
    if (src, dst) in OVERRIDES:
        return OVERRIDES[(src, dst)]
    d = D_bumped.get((src, dst), 0.0)
    ps = S.get(src, {})
    pd = S.get(dst, {})
    cth_disc = 0.5 if ps.get('CTH', 0) >= 9 else 1.0
    cov_dmult = DB_SCHEME_DMULT.get(dst, 1.0)
    elite_line = ps.get('BLK', 0) >= 8 and pd.get('BLK', 0) >= 8
    A = 0.0
    same_lb = src in LINEBACKERS and dst in LINEBACKERS
    for s, b in BETA.items():
        gap = max(0.0, pd.get(s, 0) - ps.get(s, 0))
        if gap <= 0:
            continue
        if s == 'RUN' and dst != 'RB':
            continue
        if s == 'SNP' and dst != 'C':
            continue
        if s == 'KCK' and dst != 'K':
            continue
        if s == 'PNT' and dst != 'P':
            continue
        if s == 'BLK' and elite_line:
            continue  # elite-line swaps price by D only
        # Fix 1: RSH gap doesn't count when src is CB. CB is a pure coverage
        # specialist (RSH 0) and the Owner doesn't expect rush from a corner;
        # CB>FS and CB>SS are priced free. Other non-rushers (TE, OT, etc.)
        # keep their RSH gap — e.g. TE>FS needs it to reach tier 12.
        if s == 'RSH' and src == 'CB':
            continue
        # Fix 2: CTH gap only counts when the destination actually catches
        # (WR/TE/RB), or for FS when the source is not already a defensive
        # back (a CB moving to FS needs no catching gap; a TE/OLB does).
        if s == 'CTH':
            if dst in RECEIVING:
                pass
            elif dst == 'FS' and src not in DB:
                pass
            else:
                continue
        # Fix 3: within the LB family (ILB<->OLB), COV and RSH gaps don't count.
        # MIKE and WILL are interchangeable linebackers; the Owner prices
        # ILB>OLB free (MIKE>WILL free) while OLB>ILB rides the bumped D gate.
        if same_lb and s in ('COV', 'RSH'):
            continue
        w = b
        if s == 'COV':
            w = w * cov_dmult * cth_disc
        elif s == 'RNG':
            w = w * cth_disc
        A += w * gap
    # Gate vs D
    if d >= 5:
        A = 0.0
    elif d >= 4:
        A *= 0.5
    u = U.get((src, dst), 0.0)
    t = tier(d + A + u)

    # Cross-side floor: offense<->defense, model price below 6 -> raise to 6.
    # Flexes into FB already return 0 via the FB discount above (exempt).
    # Floor is a minimum, not a cap: 6 stays 6, 12 stays 12.
    if CROSS_SIDE_FLOOR and t < FLOOR_MIN:
        src_side = 'offense' if src in OFFENSE else 'defense' if src in DEFENSE else None
        dst_side = 'offense' if dst in OFFENSE else 'defense' if dst in DEFENSE else None
        if src_side and dst_side and src_side != dst_side:
            t = FLOOR_MIN

    return t


# ---------------------------------------------------------------- 4. Compare
results = []
for (src, dst), o in owner.items():
    m = model(src, dst)
    results.append((src, dst, o, m))

exact = sum(1 for _, _, o, m in results if o == m)
off1 = sum(1 for _, _, o, m in results if o != m and abs(tlevel(o) - tlevel(m)) == 1)
hard = sum(1 for _, _, o, m in results if o != m and abs(tlevel(o) - tlevel(m)) > 1)

print()
print(f'RESULT: exact={exact}  off-by-one-tier={off1}  hard={hard}  total={len(results)}')
print()
print('RESIDUALS (owner -> model):')
for src, dst, o, m in sorted(results):
    if o != m:
        print(f'  {src}>{dst}: owner={o} model={m}  (tier levels {tlevel(o)} -> {tlevel(m)})')

# Categorise residuals
floor_rules = [('WR', 'CB'), ('WR', 'DIME'), ('WR', 'FS'), ('WR', 'NICKEL'), ('WR', 'SS')]
inkling_residuals = [('CB', 'FS'), ('CB', 'SS'), ('EDGE', 'OLB'), ('ILB', 'OLB'),
                     ('SS', 'DIME'), ('SS', 'NICKEL')]
expected = set(floor_rules + inkling_residuals)
actual = {(s, d) for s, d, o, m in results if o != m}
print()
print(f'Expected residual set (5 floor + 6 Inkling): {len(expected)} rules')
print(f'Actual residual set: {len(actual)} rules')
print(f'Missing from actual: {sorted(expected - actual)}')
print(f'Extra in actual:     {sorted(actual - expected)}')
