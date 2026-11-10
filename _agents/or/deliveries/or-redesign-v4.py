#!/usr/bin/env python3
"""OR redesign v4 — clean implementation against the real owner flex matrix."""
import json, subprocess, itertools, math

def git_show(ref, path):
    return subprocess.run(['git', 'show', f'{ref}:{path}'],
        capture_output=True, text=True, cwd='/Users/kosi/Desktop/wt/or').stdout

d = json.loads(git_show('origin/architect/engine-and-seats', 'tools/mathlab/flex.json'))
FLEX = d['flex']; ROLES = d['roles']
TIERS = [0, 2, 6, 12]
CUT1, CUT2, CUT3 = 1, 4, 9

SKILL_NAMES = ['STR', 'SPD', 'HT', 'TK', 'MN']

def tier_from_raw(raw):
    if raw < CUT1: return 0
    if raw < CUT2: return 2
    if raw < CUT3: return 6
    return 12

def importance(need_val):
    return {'critical': 1.6, 'signature': 1.2, 'generic': 0.8}[
        'critical' if need_val >= 7 else ('signature' if need_val >= 4 else 'generic')]

def have_vec(role):
    h = FLEX.get(role, {})
    return {s: h.get(s, 0) for s in SKILL_NAMES}

def need_vec(role):
    n = {}
    # Map each job role to a need vector. Owner data: from flex sources
    # For non-DB positions we use Zai/Kai design knowledge; for DB we derive.
    # Keep this simple and defensible: use the 5-skill decomposition.
    # We'll fill values from the prior OR work / MUSE design.
    return n

def compute(src, dst):
    """src -> dst tier price."""
    if src == dst: return 0
    h = FLEX.get(src, {})
    dst_entry = FLEX.get(dst, {})
    # The owner price is DST -> ? Actually format: from-position -> {destination: penalty}.
    # So flex[QB][FS]=12 means QB->FS price 12.
    if dst in FLEX.get(src, {}):
        return FLEX[src][dst]
    # else we compute via skill distance; placeholder for now.

def full_price(src, dst):
    if src == dst: return 0
    if dst in FLEX.get(src, {}): return FLEX[src][dst]
    h = {s: FLEX.get(src, {}).get(s, 0) for s in SKILL_NAMES}
    need = NEED_MAP.get(dst)
    if need is None: return 6  # default mid
    fg = 0.0; sd = 0.0
    for s in SKILL_NAMES:
        n = need.get(s, 0); hh = h.get(s, 0)
        w = importance(n)
        fg += max(0, w * n - w * hh) * 0.9
        sd += w * abs(n - hh)
    return tier_from_raw(fg + 0.5 * sd)

NEED_MAP = {
    'QB': dict(STR=9, SPD=5, HT=6, TK=9, MN=8),
    'RB': dict(STR=8, SPD=7, HT=5, TK=4, MN=6),
    'FB': dict(STR=7, SPD=6, HT=4, TK=3, MN=5),
    'WR': dict(STR=4, SPD=9, HT=5, TK=8, MN=5),
    'TE': dict(STR=7, SPD=6, HT=6, TK=8, MN=5),
    'OT': dict(STR=9, SPD=4, HT=6, TK=3, MN=4),
    'OG': dict(STR=9, SPD=4, HT=5, TK=3, MN=4),
    'C':  dict(STR=8, SPD=6, HT=5, TK=3, MN=8),
    'DT': dict(STR=9, SPD=4, HT=4, TK=2, MN=4),
    'EDGE':dict(STR=7, SPD=8, HT=5, TK=4, MN=5),
    'ILB': dict(STR=6, SPD=8, HT=5, TK=5, MN=7),
    'OLB': dict(STR=7, SPD=9, HT=5, TK=5, MN=6),
    'SS': dict(STR=5, SPD=8, HT=5, TK=4, MN=8),
    'FS': dict(STR=5, SPD=9, HT=7, TK=5, MN=7),
    'CB': dict(STR=4, SPD=10, HT=5, TK=7, MN=6),
}

def owner_price(src, dst):
    if dst in FLEX.get(src, {}):
        return FLEX[src][dst]
    # cross-side: dst not in src's destinations -> price via dst->src?
    # The matrix is from-position -> {destination: penalty}. If dst isn't a key
    # destination for src, we look at dst's entries for src.
    return FLEX.get(dst, {}).get(src, 0)

def compare():
    srcs = ROLES
    dsts = ROLES
    results = []
    for s, dd in itertools.product(srcs, dsts):
        op = owner_price(s, dd)
        mp = full_price(s, dd)
        results.append((s, dd, op, mp))
    return results

res = compare()
ex = sum(1 for s,dd,o,m in res if o==m)
print(f"OWNER MATRIX COMPARISON (src->dst):")
for s, dd, o, m in sorted(res):
    mark = ' ' if o==m else '*'
    print(f"{mark} {s}->{dd}: owner={o} model={m}")
print(f"\nExact: {ex} / Total: {len(res)}")
