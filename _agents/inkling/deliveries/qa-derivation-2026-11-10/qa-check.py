#!/usr/bin/env python3
"""
QA-derivation checks for the Inkling-Q&A design (2026-11-10 Owner questionnaire).

Scratch instrument for inbox/20261110-*-inkling-P-322-qa-derivation-v1.md.
Live flex.json @ origin/architect/engine-and-seats (tip a26a3da4),
sha256 0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6 (99 rules).

Usage: python3 qa-check.py
"""
import json, math, itertools
import zai_d1_matrices as Z

DUTIES = Z.DUTIES
W = Z.W
HAVE, NEED, SCOPE = Z.HAVE, Z.NEED, Z.SCOPE
REAL_ROLES = list(HAVE.keys())          # 17 real bodies (supply roles)
DEST_ROLES = list(NEED.keys())          # 20 destination roles (incl NICKEL/DIME/DL5)
flex = json.load(open('flex-live.json'))['flex']
LIVE = {(s, d): flex[s][d] for s in flex for d in flex[s]}
CUTS = (1.0, 4.0, 9.0)

def tier(x):
    return 0 if x < CUTS[0] else 2 if x < CUTS[1] else 6 if x < CUTS[2] else 12

def have_dict(r): return dict(zip(DUTIES, HAVE[r]))

def ability(src, dst, lam=0.4):
    hv = have_dict(src)
    nd = NEED[dst]
    terms = []
    for duty, nv in nd.items():
        if duty in SCOPE and dst not in SCOPE[duty]:
            continue
        deficit = max(0, nv - hv.get(duty, 0))
        if deficit:
            terms.append(W[duty] * deficit)
    if not terms:
        return 0.0
    terms.sort(reverse=True)
    return terms[0] + lam * sum(terms[1:])

# ---------- value ladder, source 2: demand x scarcity (no Owner weights) ----------
# scarcity_d = 1 / (# real roles with credible supply of duty d, HAVE >= 5)
def scarcity():
    s = {}
    for i, duty in enumerate(DUTIES):
        n = sum(1 for r in REAL_ROLES if HAVE[r][i] >= 5)
        s[duty] = 1.0 / max(1, n)
    return s

def v0(role, sig, scale_ref=None):
    nd = NEED[role]
    return sum(W[d] * nv * sig[d] for d, nv in nd.items())

SIG = scarcity()
V0 = {r: v0(r, SIG) for r in DEST_ROLES}
# weight ladder for comparison (slot weights; FB 25, NICKEL 100, DIME 50)
VW = {"QB":1000,"WR":650,"OT":500,"OG":400,"C":200,"TE":250,"RB":250,"FB":25,"EDGE":650,
      "DT":500,"ILB":300,"OLB":200,"CB":400,"NICKEL":100,"DIME":50,"FS":300,"SS":300,"K":50,"P":50,"DL5":350}

def guard(s, d, V):
    if V[s] < V[d]:
        return 20.0 * (1.0 - V[s] / V[d])
    return 0.0

def report(name, fn):
    exact = one = hard = 0
    hards = []
    for (s, d), live in LIVE.items():
        pred = tier(fn(s, d))
        t_live = live
        if pred == t_live: exact += 1
        elif abs([0,2,6,12].index(pred) - [0,2,6,12].index(t_live)) == 1: one += 1
        else: hard += 1; hards.append((s, d, live, pred))
    print(f"{name}: exact {exact}/99  off-by-one {one}  hard {hard}")
    if hards:
        print('   hard rows:', ' · '.join(f"{s}>{d} {l}→{p}" for s, d, l, p in hards))

print('=== scarcity table (1 / #real roles with HAVE>=5) ===')
for duty, s in sorted(SIG.items(), key=lambda kv: kv[1]):
    n = round(1 / s)
    print(f"  {duty:5s} σ={s:.3f}  ({n} supply roles)")

print()
print('=== v0 ladder (demand x scarcity) vs weight ladder (ratios, both ascending print) ===')
v0s = sorted(V0.items(), key=lambda kv: -kv[1])
vws = sorted(VW.items(), key=lambda kv: -kv[1])
print(' v0:', ' > '.join(f"{r}:{v:.1f}" for r, v in v0s))
print(' VW:', ' > '.join(f"{r}:{v}" for r, v in vws))

print()
print('=== ladder rho (Spearman) v0 vs VW ===')
roles = [r for r in DEST_ROLES if r in VW]
def ranks(vals):
    order = sorted(range(len(vals)), key=lambda i: vals[i])
    r = [0] * len(vals); i = 0
    while i < len(vals):
        j = i
        while j + 1 < len(vals) and vals[order[j+1]] == vals[order[i]]: j += 1
        for k in range(i, j + 1): r[order[k]] = (i + j) / 2 + 1
        i = j + 1
    return r
rv = ranks([V0[r] for r in roles]); rw = ranks([VW[r] for r in roles])
n = len(roles)
d2 = sum((a - b) ** 2 for a, b in zip(rv, rw))
print(f"  Spearman rho = {1 - 6 * d2 / (n * (n**2 - 1)):+.3f}  (n={n})")

print()
report('A-only (ZAI V4 ability, no value ledger)        ', lambda s, d: ability(s, d))
report('max(A, G_weights)  [the measured merge, no pins]', lambda s, d: max(ability(s, d), guard(s, d, VW)))
report('max(A, G_v0)       [demand x scarcity ladder]   ', lambda s, d: max(ability(s, d), guard(s, d, V0)))
report('blend c=0.25: max + 0.25*min (G_v0)             ', lambda s, d: max(ability(s, d), guard(s, d, V0)) + 0.25 * min(ability(s, d), guard(s, d, V0)))

print()
print('=== the three anti-D cells, by design, under G_v0 ===')
for s, d in [('C', 'OT'), ('C', 'OG'), ('FB', 'RB'), ('FB', 'TE')]:
    a, gv, gw = ability(s, d), guard(s, d, V0), guard(s, d, VW)
    print(f"  {s}>{d}: A={a:.1f}  G_v0={gv:.1f}  G_weights={gw:.1f}  live={LIVE.get((s,d))}")

# ---------- derived forbid rule ----------
print()
print('=== derived prohibitions (core duty = NEED >= 7; forbidden if HAVE <= 1) ===')
def forbidden(src, dst):
    nd = NEED[dst]
    core = [d for d, nv in nd.items() if nv >= 7 and (d not in SCOPE or dst in SCOPE[d])]
    hv = have_dict(src) if src in HAVE else None
    return [d for d in core if hv.get(d, 0) <= 1]

fb_count = 0
fb_list = []
for dst in DEST_ROLES:
    for src in REAL_ROLES:
        if src == dst: continue
        bad = forbidden(src, dst)
        if bad:
            fb_count += 1; fb_list.append((src, dst, bad))
print(f"forbidden pairs (role-level): {fb_count} / {len(REAL_ROLES) * (len(DEST_ROLES) - 1)}")
for s, d, bad in fb_list:
    print(f"  {s:5s} > {d:5s}  missing core: {','.join(bad)}")
live_bad = [(s, d, bad) for s, d, bad in fb_list if (s, d) in LIVE]
print('forbidden cells that the live table PRICES (should be empty):', live_bad if live_bad else 'none ✓')

# ---------- P-338: price the big nickel (SS2) ----------
print()
print('=== P-338: the big nickel (SS2), priced with no hand-written rows ===')
SS2_NEED = {d: round(0.55 * NEED['SS'].get(d, 0) + 0.45 * NEED['NICKEL'].get(d, 0)) for d in set(NEED['SS']) | set(NEED['NICKEL'])}
SS2_NEED = {d: v for d, v in SS2_NEED.items() if v > 0}
HAVE['SS2'] = HAVE['SS'][:]   # big body stands in for the big safety-nickel hybrid
NEED['SS2'] = SS2_NEED
DEST_ALL = DEST_ROLES + ['SS2']
REAL_ALL = REAL_ROLES + ['SS2']
SIG2 = scarcity()  # keep 17-role scarcity (SS2 has no track record yet)
V0['SS2'] = sum(W[d] * nv * SIG[d] for d, nv in SS2_NEED.items())
VW['SS2'] = round(0.55 * 300 + 0.45 * 100)
print('SS2 NEED:', dict(sorted(SS2_NEED.items(), key=lambda kv: -kv[1])))
print(f"SS2 value: v0={V0['SS2']:.1f}   weight blend={VW['SS2']}")

def full_price(src, dst):
    return max(ability(src, dst), guard(src, dst, V0))

print('\n-- every role -> SS2 (who drifts in; guard uses v0) --')
for s in REAL_ROLES:
    a, g = ability(s, 'SS2'), guard(s, 'SS2', V0)
    print(f"  {s:5s} A={a:4.1f} G={g:4.1f} -> price {tier(max(a,g)):2d}   ({tier(a):2d}/{tier(g):2d})")

print('\n-- SS2 -> every role (who SS2 can play; guard uses v0) --')
for d in DEST_ROLES:
    a, g = ability('SS2', d), guard('SS2', 'SO' + d if False else d, V0)
    print(f"  SS2> {d:5s} A={a:4.1f} G={g:4.1f} -> price {tier(max(a,g)):2d}   ({tier(a):2d}/{tier(g):2d})")

print('\n-- derived prohibitions INTO SS2 --')
bad = [s for s in REAL_ROLES if forbidden(s, 'SS2')]
print('  forbidden:', ', '.join(bad) if bad else 'none')
print('-- derived prohibitions OUT of SS2 (SS2 body = big safety) --')
bad2 = [d for d in DEST_ROLES if forbidden('SS2', d)]
print('  forbidden:', ', '.join(bad2) if bad2 else 'none')
