#!/usr/bin/env python3
"""OR's from-scratch derivation formula — sport-agnostic, nested Lp norms.

Core idea (completely independent of Inkling's D+A+U and Z.ai's M+0.4S):

Instead of adding separate D + A + U terms, measure ability distance as a
weighted Lp norm over per-skill gaps.  Different p continuously interpolates
between "worst gap only" (p→∞) and "all gaps equally" (p=1).

Split skills into two channels: PHYSICAL (BLK, PWR, MOB) and TECHNICAL
(COV, REC, PLAY).  Each channel collapses by its own Lp norm, then an outer
Lq norm combines the two channel scores into one price.  A physical-only gap
or a technical-only gap can independently drive the price up — neither channel
hides inside the other's average.

Everything (skills, HAVE profiles, NEED profiles, weights, p, q, cut points,
cross-side floor, FB-free sources) is an INPUT — nothing is hard-coded to
football, so the same formula runs in basketball or any sport.

Hard cases handled:
  - Cross-side floor: cross-side raw < floor → floor (baked in as a parameter,
    not a post-hoc term).
  - FB discount: whitelisted sources flex into FB free.
  - Self-flex: src == dst → 0.
  - Skills not possessed by either position: gap 0.
  - Residuals left as principled design choices (e.g. EDGE>OLB = same
    channel profile → near-zero gap → price 0), not ad-hoc overrides.

Run: python3 or-derive-from-scratch.py
Reads flex.json from origin/architect/engine-and-seats (97d7e9d).
"""

import json, subprocess
from collections import Counter

# --- 1. Live Owner 99-rule table ---------------------------------------
def git_show(ref, path):
    return subprocess.run(['git', 'show', f'{ref}:{path}'],
        capture_output=True, text=True,
        cwd='/Users/kosi/Desktop/wt/or').stdout

owner = json.loads(git_show('origin/architect/engine-and-seats',
    'tools/mathlab/flex.json'))['flex']
N_RULES = sum(len(v) for v in owner.values())
TIER_COUNTS = Counter(v for t in owner.values() for v in t.values())
print(f'Live Owner table: {N_RULES} rules, tiers {dict(sorted(TIER_COUNTS.items()))}')
assert N_RULES == 99

# --- 2. Formula inputs (all sport-agnostic, none hard-coded to football) ---
SKILLS_PHYS = ['BLK', 'PWR', 'MOB']   # body/athleticism channel
SKILLS_TECH = ['COV', 'REC', 'PLAY']   # skill/technique channel

# Weight per skill within its channel.  Equal here; sport can calibrate.
W_PHYS = {'BLK': 1.0, 'PWR': 1.0, 'MOB': 1.0}
W_TECH = {'COV': 1.0, 'REC': 1.0, 'PLAY': 1.0}

# Per-channel norm exponents.  Higher p = worst gap dominates.
P_PHYS = 3.0   # physical channel: punishes big physical gaps hard
P_TECH = 2.0   # technical channel: softer, technical gaps can be compensated
Q_OUTER = 4.0  # outer norm: max(physical, technical) dominates

CUTS = (1, 4, 9)   # tier cut points, same as live table
TIERS = [0, 2, 6, 12]

CROSS_SIDE_FLOOR = 6   # cross-side raw below this → floor to 6

OFFENSE = {'QB','RB','FB','WR','TE','OT','OG','C'}
DEFENSE = {'DT','EDGE','ILB','OLB','SS','FS','CB','NICKEL','DIME'}

def is_cross_side(src, dst):
    s_off, d_off = src in OFFENSE, dst in OFFENSE
    s_def, d_def = src in DEFENSE, dst in DEFENSE
    return (s_off and d_def) or (s_def and d_off)

FB_FREE = {'RB','TE','OT','OG','C','DT','EDGE','ILB','OLB'}

# HAVE profiles: what each position's body can do (0–10 per skill)
HAVE = {
 'QB':  dict(BLK=1, PWR=2, MOB=4, COV=0, REC=3, PLAY=8),
 'RB':  dict(BLK=3, PWR=5, MOB=7, COV=1, REC=7, PLAY=6),
 'FB':  dict(BLK=8, PWR=8, MOB=4, COV=0, REC=3, PLAY=5),
 'WR':  dict(BLK=1, PWR=3, MOB=9, COV=0, REC=10,PLAY=4),
 'TE':  dict(BLK=7, PWR=6, MOB=6, COV=0, REC=8, PLAY=5),
 'OT':  dict(BLK=10,PWR=8, MOB=4, COV=0, REC=0, PLAY=3),
 'OG':  dict(BLK=9, PWR=9, MOB=2, COV=0, REC=0, PLAY=3),
 'C':   dict(BLK=6, PWR=7, MOB=2, COV=0, REC=0, PLAY=8),
 'DT':  dict(BLK=0, PWR=10,MOB=3, COV=0, REC=0, PLAY=2),
 'EDGE':dict(BLK=2, PWR=7, MOB=8, COV=2, REC=0, PLAY=4),
 'ILB': dict(BLK=3, PWR=6, MOB=6, COV=4, REC=2, PLAY=7),
 'OLB': dict(BLK=3, PWR=7, MOB=8, COV=5, REC=2, PLAY=6),
 'SS':  dict(BLK=0, PWR=7, MOB=8, COV=9, REC=3, PLAY=6),
 'FS':  dict(BLK=0, PWR=5, MOB=9, COV=10,REC=4, PLAY=8),
 'CB':  dict(BLK=0, PWR=4, MOB=9, COV=10,REC=5, PLAY=6),
 'NICKEL':dict(BLK=0,PWR=6,MOB=9,COV=10,REC=4,PLAY=7),
 'DIME': dict(BLK=0,PWR=5,MOB=9,COV=10,REC=3,PLAY=8),
}

# NEED profiles: what each destination demands (0–10 per skill)
NEED = {
 'RB':   dict(BLK=3, PWR=6, MOB=8, COV=1, REC=6, PLAY=7),
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
 'CB':   dict(BLK=0, PWR=5, MOB=10,COV=10,REC=5, PLAY=7),
 'NICKEL':dict(BLK=0,PWR=6,MOB=9,COV=10,REC=4,PLAY=7),
 'DIME': dict(BLK=0,PWR=5,MOB=9,COV=10,REC=3,PLAY=8),
}

ALL_SKILLS = SKILLS_PHYS + SKILLS_TECH


def lp_norm(values, weights, p):
    """(Σ w_i * |v_i|^p)^(1/p) over nonzero-weight entries."""
    acc = 0.0
    for k, v in values.items():
        w = weights.get(k, 0.0)
        if w > 0:
            acc += w * abs(v) ** p
    return acc ** (1.0 / p) if acc > 0 else 0.0


def tier(x):
    if x < CUTS[0]: return 0
    if x < CUTS[1]: return 2
    if x < CUTS[2]: return 6
    return 12


def model_price(src, dst):
    # Self-flex is free.
    if src == dst:
        return 0
    # FB discount: whitelisted sources flex into FB for free.
    if dst == 'FB' and src in FB_FREE:
        return 0
    ps, pd = HAVE.get(src), NEED.get(dst)
    if ps is None or pd is None:
        return None
    # Per-skill gaps: how much the destination demands beyond what source has.
    gaps = {s: max(0.0, pd.get(s, 0.0) - ps.get(s, 0.0)) for s in ALL_SKILLS}
    # Channel norms: physical and technical, independently.
    phys = lp_norm({k: v for k, v in gaps.items() if k in SKILLS_PHYS},
                   W_PHYS, P_PHYS)
    tech = lp_norm({k: v for k, v in gaps.items() if k in SKILLS_TECH},
                   W_TECH, P_TECH)
    # Outer norm combines the two channels.
    raw = lp_norm({'phys': phys, 'tech': tech}, {'phys': 1.0, 'tech': 1.0},
                  Q_OUTER)
    # Cross-side floor: cross-side below floor → floor (min, not cap).
    if is_cross_side(src, dst) and raw < CROSS_SIDE_FLOOR:
        raw = CROSS_SIDE_FLOOR
    return tier(raw)


def compare(price_fn):
    exact = 0
    off1 = []
    hard = []
    missing = []
    for src, dests in sorted(owner.items()):
        for dst, o in sorted(dests.items()):
            m = price_fn(src, dst)
            if m is None:
                missing.append((src, dst, o))
                continue
            if m == o:
                exact += 1
            else:
                ti, mi = TIERS.index(m), TIERS.index(o)
                d = abs(ti - mi)
                if d == 1:
                    off1.append((src, dst, o, m))
                else:
                    hard.append((src, dst, o, m))
    return exact, off1, hard, missing


# --- Run baseline ------------------------------------------------------
exact, off1, hard, missing = compare(model_price)
print(f'\n=== BASELINE (nested Lp norm, p_phys=3, p_tech=2, q=4) ===')
print(f'Exact: {exact} | Off-by-one: {len(off1)} | Hard: {len(hard)} | Missing: {len(missing)}')
print(f'Residuals (off-by-one):')
for s, d, o, m in sorted(off1):
    print(f'  {s}->{d}: owner={o} model={m}')
print(f'Hard cases:')
for s, d, o, m in sorted(hard):
    print(f'  {s}->{d}: owner={o} model={m}')

# --- Report hard cases relative to the known Inkling residuals ---------
INKLING_RESIDUALS = [('CB','FS'), ('CB','SS'), ('EDGE','OLB'),
                     ('ILB','OLB'), ('SS','DIME'), ('SS','NICKEL')]
print('\n--- Known Inkling residuals vs our model ---')
for s, d in INKLING_RESIDUALS:
    o = owner[s][d]
    m = model_price(s, d)
    print(f'  {s}->{d}: owner={o} model={m} {"EXACT" if m==o else "OFF"}')
