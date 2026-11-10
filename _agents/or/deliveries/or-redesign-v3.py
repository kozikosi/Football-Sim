#!/usr/bin/env python3
"""OR's redesign v3 — 5 universal skills, 0/2/6/12 tier, positional-importance weighted.

Key design direction (from user): 99 is a GUIDE; portability + beauty beats perfection;
positional requirements > arbitrary fixed skill values; keep 0/2/6/12 scale for user friendliness.

5 universal skills (per-sport authors fill these):
  STR — physical strength
  SPD — speed/quickness  
  HT  — height/avail (basketball loads here, others may weight differently)
  TK  — technical skill / sport-specific technique
  MN  — mentality / toughness / durability

Each role has HAVE vector of 5 values.
Each job has NEED vector of 5 values.

Two-profile distance:
  1. Fill-gap: weighted deficit per skill → how much the role falls short on what the job
     truly needs (importance-weighted).
  2. Structural: weighted absolute difference → how structurally different the profiles are,
     regardless of fill direction (detects "wrong profile" even if gap is small).

raw = fill_gap + 0.5 * structural_distance
tier:  0 if raw < 1; 2 if raw < 4; 6 if raw < 9; 12 otherwise.
"""
import json, subprocess, math

def git_show(ref, path):
    return subprocess.run(['git', 'show', f'{ref}:{path}'],
        capture_output=True, text=True,
        cwd='/Users/kosi/Desktop/wt/or').stdout

FLEX_JSON = json.loads(git_show('origin/architect/engine-and-seats',
    'tools/mathlab/flex.json'))['flex']

# 5 universal skill names — per-sport fills these in
SKILL_NAMES = ['STR', 'SPD', 'HT', 'TK', 'MN']

# Importance weights per skill: "critical", "signature", "generic"
# These are designed to be sensible defaults but per-sport adjustability is key
SKILL_WEIGHTS = {
    'STR': {'critical': 1.6, 'signature': 1.3, 'generic': 0.8},
    'SPD': {'critical': 1.5, 'signature': 1.2, 'generic': 0.7},
    'HT':  {'critical': 1.5, 'signature': 1.2, 'generic': 0.7},
    'TK':  {'critical': 1.4, 'signature': 1.1, 'generic': 0.7},
    'MN':  {'critical': 1.3, 'signature': 1.0, 'generic': 0.6},
}

def importance_w(need_val, kind='critical'):
    """Return weight for a skill based on its need value."""
    w = SKILL_WEIGHTS[skill_names[k]]
    thresholds = {'critical': 7, 'signature': 4, 'generic': 1}
    t = thresholds[kind]
    if need_val >= t:
        return w
    # interpolate: if between thresholds, partial
    return w * 0.7  # reduced


def fill_gap(have, need):
    """Weighted per-skill deficit: max(0, weighted_need - weighted_have)."""
    total = 0.0
    for i, skill in enumerate(SKILL_NAMES):
        n = need.get(skill, 0)
        h = have.get(skill, 0)
        w = SKILL_WEIGHTS[skill]
        # critical weight if need >= 7, signature if 4-6, generic if 0-3
        if n >= 7: c = w['critical']
        elif n >= 4: c = w['signature']
        else: c = w['generic']
        weighted_need = c * n
        weighted_have = c * h if h > 0 else 0  # have always counts reduced
        gap = max(0, weighted_need - weighted_have)
        total += gap
    return total

def structural_distance(have, need):
    """Weighted absolute profile difference: how structurally different the two profiles are."""
    total = 0.0
    for i, skill in enumerate(SKILL_NAMES):
        n = need.get(skill, 0)
        h = have.get(skill, 0)
        w = SKILL_WEIGHTS[skill]
        if n >= 7: c = w['critical']
        elif n >= 4: c = w['signature']
        else: c = w['generic']
        total += c * abs(n - h)
    return total

def tier(raw):
    if raw < 1: return 0
    if raw < 4: return 2
    if raw < 9: return 6
    return 12

def model_price(src_role, dst_job):
    """Compute tiered price for role->job match."""
    if src_role == dst_job: return 0
    have = HAVE.get(src_role)
    need = NEED.get(dst_job)
    if have is None or need is None: return None

    # Build weight-qualified vectors
    have_w = {skill: importance_w(have.get(skill, 0), 'critical')
              for skill in SKILL_NAMES}
    need_w = {skill: importance_w(need.get(skill, 0), 'critical')
              for skill in SKILL_NAMES}

    fg = fill_gap(have, need)
    sd = structural_distance(have, need)
    raw = fg + 0.5 * sd
    return tier(raw)

def tier_distribution(records):
    """Count distribution across tiers."""
    counts = {t: 0 for t in [0,2,6,12]}
    for _, _, _, t in records:
        counts[t] += 1
    return counts

# ---- Load owner data from flex.json structure into HAVE/NEED ----

# HAVE: role -> {skill: amount} from flex.json asset values
HAVE = {}
for role, assets in FLEX_JSON.items():
    have_map = {}
    for skill in SKILL_NAMES:
        have_map[skill] = assets.get(skill, 0)
    HAVE[role] = have_map

# NEED: build per-job need vectors — use Z.ai's documented 7-skill mapping simplified to 5
# We'll derive NEED from the flex.json structure: each role's flex destinations indicate what
# that role NEEDS from others
NEED = {}
# From the existing HAVE maps in earlier OR work
# Using a compact set: these are the primary 5 skills per position
POSITION_NEEDS = {
    'RB':   dict(STR=8, SPD=7, HT=5, TK=4, MN=6),
    'FB':   dict(STR=7, SPD=6, HT=4, TK=3, MN=5),
    'WR':   dict(STR=4, SPD=9, HT=5, TK=8, MN=5),
    'TE':   dict(STR=7, SPD=6, HT=6, TK=8, MN=5),
    'OT':   dict(STR=9, SPD=4, HT=6, TK=3, MN=4),
    'OG':   dict(STR=9, SPD=4, HT=5, TK=3, MN=4),
    'C':    dict(STR=8, SPD=6, HT=5, TK=3, MN=8),
    'DT':   dict(STR=9, SPD=4, HT=4, TK=2, MN=4),
    'EDGE': dict(STR=7, SPD=8, HT=5, TK=4, MN=5),
    'ILB':  dict(STR=6, SPD=8, HT=5, TK=5, MN=7),
    'OLB':  dict(STR=7, SPD=9, HT=5, TK=5, MN=6),
    'SS':   dict(STR=5, SPD=8, HT=5, TK=4, MN=8),
    'FS':   dict(STR=5, SPD=9, HT=7, TK=5, MN=7),
    'CB':   dict(STR=4, SPD=10, HT=5, TK=7, MN=6),
}

for role, needs in POSITION_NEEDS.items():
    NEED[role] = needs

def compare():
    exact = off1 = hard = 0
    residuals = []
    for src in sorted(HAVE.keys()):
        for dst in sorted(NEED.keys()):
            m = model_price(src, dst)
            if m is None: continue
            if m == 0 and src != dst:  # fallback
                continue
            o = NEED.get(dst, {}).get('_owner_tier', 6)  # will fix
            # get actual owner tier from flex.json
            # The flex.json maps src->dst -> amount. We need the "owner" price.
            # Let's look at what owner prices are...
            pass
    return exact, off1, hard, residuals