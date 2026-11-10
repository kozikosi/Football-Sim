#!/usr/bin/env python3
"""
GLYPH-G1: "Role Transfer Cost" (RTC) - a from-scratch, sport-generalizable flex/position-fit model.
Designed by Glyph, 2026-11-10. No ZAI-D1/Inkling/R4 formulas copied; capability set, profiles,
aggregation, and value/context terms authored independently.

Core idea:
  cost(src -> dst job) = tier( max( A_ability(src,dst), V_guard(src,dst) ) + Cxt(src,dst) )
  - A_ability: Lp norm of weighted capability shortfalls (bottleneck-emphasizing, p>1)
  - V_guard: slot-value/criticality floor (high-value destination cannot be cheaply filled by low-value source)
  - Cxt: domain/context incompatibility penalty (parameterized groups), with policy exemptions
All components are inputs/configurable per sport instantiation.

Football instantiation tested against live 99-rule Owner table (97d7e9d).
"""
import json, math, re, subprocess
from collections import Counter

REF = '97d7e9d'
WD = '/Users/kosi/Desktop/wt/glyph'

def gshow(path):
    return subprocess.check_output(['git','show',f'{REF}:{path}'], text=True, cwd=WD)

# -------------------- Load oracle (99-rule table) --------------------
flex_doc = json.loads(gshow('tools/mathlab/flex.json'))
OWNER = flex_doc['flex']
RULES = [(s,d,v) for s,ds in sorted(OWNER.items()) for d,v in sorted(ds.items())]

TIERS = [0,2,6,12]
def tier_of(x, cuts):
    if x < cuts[0]: return 0
    if x < cuts[1]: return 2
    if x < cuts[2]: return 6
    return 12

def step(a,b):
    return abs(TIERS.index(a)-TIERS.index(b))

# -------------------- G1 Football instantiation (authored from scratch) --------------------
# Capabilities (C): 15 dimensions - my own choice
CAPS = [
  'PBLK',  # pass protection / pass blocking technique
  'RBLK',  # run blocking / drive blocking
  'SNAP',  # snap exchange / line calls (center mechanics)
  'HAND',  # hands / catching / ball security in traffic
  'RTE',   # route craft / separation / space finding
  'CARRY', # ball carrying / YAC / run vision
  'THROW', # throwing (QB)
  'SPD',   # speed / range / pursuit
  'AGI',   # agility / COD / short-area quickness
  'STR',   # strength / power / anchor / mass utility
  'TACK',  # tackling
  'RDEF',  # run defense / gap integrity / edge setting vs run
  'MCOV',  # man coverage / press / mirror
  'ZCOV',  # zone / deep awareness / leverage
  'PRSH',  # pass rush / disruption / get-off
]

# Domain groups (parameterized) - football example
OFFENSE = {'QB','RB','FB','WR','TE','OT','OG','C'}
DEFENSE = {'DT','EDGE','ILB','OLB','SS','FS','CB','NICKEL','DIME'}
SPECIAL = {'K','P'}

def domain(r):
    if r in OFFENSE: return 'O'
    if r in DEFENSE: return 'D'
    if r in SPECIAL: return 'S'
    return 'X'

# Role value / slot criticality V(r) (my own scale, 0-100, relative leverage/scarcity intuition)
# Higher = harder/more costly to fill with low-value body. Sport-configurable input.
V = {
  'QB': 100,
  'OT': 85,   # premium pass-pro slot
  'EDGE': 80,
  'WR': 70,   # representative receiver value
  'CB': 70,
  'DT': 65,
  'TE': 55,
  'OG': 55,
  'C': 50,
  'ILB': 50,  # MIKE-like central
  'SS': 50,
  'FS': 50,
  'OLB': 45,
  'RB': 45,
  'NICKEL': 35,
  'DIME': 30,
  'FB': 20,
  'K': 25,
  'P': 25,
}

# Body supply profiles B(src,cap) 0-10 (my own authored estimates)
B = {
 'QB':  {'PBLK':1,'RBLK':1,'SNAP':0,'HAND':4,'RTE':2,'CARRY':6,'THROW':10,'SPD':5,'AGI':6,'STR':3,'TACK':1,'RDEF':1,'MCOV':1,'ZCOV':2,'PRSH':0},
 'RB':  {'PBLK':2,'RBLK':5,'SNAP':0,'HAND':6,'RTE':4,'CARRY':10,'THROW':1,'SPD':8,'AGI':9,'STR':5,'TACK':2,'RDEF':2,'MCOV':1,'ZCOV':1,'PRSH':0},
 'FB':  {'PBLK':4,'RBLK':9,'SNAP':0,'HAND':3,'RTE':2,'CARRY':7,'THROW':0,'SPD':5,'AGI':5,'STR':8,'TACK':4,'RDEF':4,'MCOV':1,'ZCOV':1,'PRSH':1},
 'WR':  {'PBLK':1,'RBLK':2,'SNAP':0,'HAND':9,'RTE':10,'CARRY':6,'THROW':1,'SPD':9,'AGI':9,'STR':3,'TACK':2,'RDEF':1,'MCOV':4,'ZCOV':3,'PRSH':0},
 'TE':  {'PBLK':5,'RBLK':7,'SNAP':0,'HAND':8,'RTE':6,'CARRY':4,'THROW':0,'SPD':6,'AGI':6,'STR':7,'TACK':3,'RDEF':3,'MCOV':2,'ZCOV':3,'PRSH':1},
 'OT':  {'PBLK':10,'RBLK':9,'SNAP':3,'HAND':1,'RTE':0,'CARRY':1,'THROW':0,'SPD':3,'AGI':4,'STR':9,'TACK':2,'RDEF':4,'MCOV':0,'ZCOV':0,'PRSH':3},
 'OG':  {'PBLK':8,'RBLK':9,'SNAP':4,'HAND':1,'RTE':0,'CARRY':1,'THROW':0,'SPD':3,'AGI':4,'STR':9,'TACK':2,'RDEF':4,'MCOV':0,'ZCOV':0,'PRSH':3},
 'C':   {'PBLK':6,'RBLK':8,'SNAP':10,'HAND':1,'RTE':0,'CARRY':1,'THROW':0,'SPD':3,'AGI':4,'STR':8,'TACK':2,'RDEF':4,'MCOV':0,'ZCOV':0,'PRSH':2},
 'DT':  {'PBLK':4,'RBLK':4,'SNAP':0,'HAND':1,'RTE':0,'CARRY':1,'THROW':0,'SPD':4,'AGI':4,'STR':9,'TACK':6,'RDEF':9,'MCOV':0,'ZCOV':1,'PRSH':7},
 'EDGE':{'PBLK':3,'RBLK':3,'SNAP':0,'HAND':2,'RTE':1,'CARRY':3,'THROW':0,'SPD':8,'AGI':8,'STR':7,'TACK':6,'RDEF':8,'MCOV':2,'ZCOV':3,'PRSH':10},
 'ILB': {'PBLK':2,'RBLK':3,'SNAP':0,'HAND':3,'RTE':1,'CARRY':2,'THROW':0,'SPD':7,'AGI':7,'STR':7,'TACK':9,'RDEF':9,'MCOV':5,'ZCOV':6,'PRSH':5},
 'OLB': {'PBLK':2,'RBLK':3,'SNAP':0,'HAND':3,'RTE':1,'CARRY':2,'THROW':0,'SPD':7,'AGI':7,'STR':7,'TACK':8,'RDEF':7,'MCOV':4,'ZCOV':4,'PRSH':7},
 'SS':  {'PBLK':1,'RBLK':2,'SNAP':0,'HAND':5,'RTE':3,'CARRY':2,'THROW':0,'SPD':8,'AGI':8,'STR':5,'TACK':8,'RDEF':5,'MCOV':6,'ZCOV':7,'PRSH':2},
 'FS':  {'PBLK':0,'RBLK':1,'SNAP':0,'HAND':6,'RTE':3,'CARRY':2,'THROW':0,'SPD':9,'AGI':8,'STR':4,'TACK':6,'RDEF':4,'MCOV':6,'ZCOV':9,'PRSH':1},
 'CB':  {'PBLK':0,'RBLK':1,'SNAP':0,'HAND':7,'RTE':6,'CARRY':3,'THROW':0,'SPD':9,'AGI':9,'STR':3,'TACK':5,'RDEF':3,'MCOV':9,'ZCOV':8,'PRSH':1},
 'K':   {'PBLK':0,'RBLK':0,'SNAP':0,'HAND':2,'RTE':0,'CARRY':1,'THROW':0,'SPD':3,'AGI':3,'STR':2,'TACK':1,'RDEF':0,'MCOV':0,'ZCOV':0,'PRSH':0},
 'P':   {'PBLK':0,'RBLK':0,'SNAP':0,'HAND':2,'RTE':0,'CARRY':1,'THROW':0,'SPD':3,'AGI':3,'STR':2,'TACK':1,'RDEF':0,'MCOV':0,'ZCOV':0,'PRSH':0},
 # situational/slot bodies (can be used as sources if needed)
 'NICKEL': {'PBLK':0,'RBLK':1,'SNAP':0,'HAND':6,'RTE':4,'CARRY':2,'THROW':0,'SPD':9,'AGI':9,'STR':3,'TACK':6,'RDEF':3,'MCOV':8,'ZCOV':6,'PRSH':1},
 'DIME':   {'PBLK':0,'RBLK':1,'SNAP':0,'HAND':6,'RTE':4,'CARRY':2,'THROW':0,'SPD':9,'AGI':9,'STR':3,'TACK':5,'RDEF':3,'MCOV':7,'ZCOV':8,'PRSH':1},
}

# Job demand profiles J(dst,cap) and importance weights w(dst,cap) 0-10
# w=0 means irrelevant for that job. My own authored demands.
J = {}
WJ = {}

def set_job(role, demands, weights=None):
    J[role] = {c: demands.get(c, 0) for c in CAPS}
    if weights is None:
        # default weight = demand level for demanded caps, else 0 (importance tracks requirement)
        WJ[role] = {c: (1.0 if demands.get(c,0)>0 else 0.0) for c in CAPS}
    else:
        WJ[role] = {c: float(weights.get(c, 1.0 if demands.get(c,0)>0 else 0.0)) for c in CAPS}

set_job('QB',  {'THROW':10,'CARRY':4,'SPD':4,'AGI':5,'HAND':3,'RTE':1}, {'THROW':2.0,'CARRY':0.8,'SPD':0.6,'AGI':0.6,'HAND':0.4,'RTE':0.2})
set_job('RB',  {'CARRY':10,'SPD':8,'AGI':9,'HAND':5,'RTE':4,'RBLK':4,'PBLK':2}, {'CARRY':1.8,'SPD':1.0,'AGI':1.0,'HAND':0.6,'RTE':0.5,'RBLK':0.6,'PBLK':0.5})
set_job('FB',  {'RBLK':8,'PBLK':4,'STR':7,'CARRY':4,'HAND':2,'SPD':4,'RDEF':2}, {'RBLK':1.2,'PBLK':0.7,'STR':0.8,'CARRY':0.4,'HAND':0.2,'SPD':0.3,'RDEF':0.2})
set_job('WR',  {'HAND':9,'RTE':10,'SPD':9,'AGI':9,'CARRY':5,'RBLK':1}, {'HAND':1.4,'RTE':1.4,'SPD':1.2,'AGI':1.0,'CARRY':0.6,'RBLK':0.2})
set_job('TE',  {'HAND':7,'RTE':5,'RBLK':7,'PBLK':5,'STR':7,'SPD':5,'CARRY':3}, {'HAND':0.8,'RTE':0.6,'RBLK':1.0,'PBLK':1.0,'STR':0.8,'SPD':0.5,'CARRY':0.3})
set_job('OT',  {'PBLK':10,'RBLK':9,'STR':9,'AGI':4,'SPD':3}, {'PBLK':1.8,'RBLK':1.0,'STR':1.0,'AGI':0.4,'SPD':0.3})
set_job('OG',  {'PBLK':8,'RBLK':9,'STR':9,'AGI':4,'SPD':3}, {'PBLK':1.4,'RBLK':1.1,'STR':1.0,'AGI':0.4,'SPD':0.3})
set_job('C',   {'SNAP':10,'RBLK':8,'PBLK':7,'STR':8,'AGI':4}, {'SNAP':1.2,'RBLK':1.0,'PBLK':1.2,'STR':0.8,'AGI':0.4})
set_job('DT',  {'RDEF':9,'STR':9,'TACK':6,'PRSH':6,'SPD':3}, {'RDEF':1.4,'STR':1.0,'TACK':0.7,'PRSH':0.8,'SPD':0.3})
set_job('EDGE',{'PRSH':10,'SPD':7,'AGI':7,'RDEF':7,'STR':7,'TACK':5}, {'PRSH':1.6,'SPD':0.8,'AGI':0.7,'RDEF':0.8,'STR':0.6,'TACK':0.5})
set_job('ILB', {'TACK':9,'RDEF':8,'SPD':7,'AGI':7,'ZCOV':5,'MCOV':4,'PRSH':4}, {'TACK':1.2,'RDEF':1.1,'SPD':0.7,'AGI':0.6,'ZCOV':0.7,'MCOV':0.5,'PRSH':0.4})
set_job('OLB', {'TACK':8,'PRSH':7,'RDEF':6,'SPD':7,'AGI':7,'ZCOV':3,'MCOV':3}, {'TACK':1.0,'PRSH':1.0,'RDEF':0.8,'SPD':0.7,'AGI':0.6,'ZCOV':0.4,'MCOV':0.4})
set_job('SS',  {'TACK':8,'ZCOV':7,'MCOV':6,'SPD':8,'AGI':8,'RDEF':4}, {'TACK':1.0,'ZCOV':1.0,'MCOV':0.8,'SPD':0.8,'AGI':0.7,'RDEF':0.4})
set_job('FS',  {'ZCOV':9,'SPD':9,'AGI':8,'MCOV':6,'TACK':5,'HAND':4}, {'ZCOV':1.4,'SPD':1.0,'AGI':0.7,'MCOV':0.7,'TACK':0.5,'HAND':0.4})
set_job('CB',  {'MCOV':9,'SPD':9,'AGI':9,'ZCOV':7,'HAND':5,'TACK':4}, {'MCOV':1.5,'SPD':1.1,'AGI':1.0,'ZCOV':0.8,'HAND':0.5,'TACK':0.4})
set_job('NICKEL', {'MCOV':8,'SPD':9,'AGI':9,'ZCOV':5,'TACK':5,'HAND':4}, {'MCOV':1.3,'SPD':1.0,'AGI':0.9,'ZCOV':0.6,'TACK':0.5,'HAND':0.3})
set_job('DIME',   {'ZCOV':8,'SPD':9,'AGI':9,'MCOV':6,'TACK':4,'HAND':4}, {'ZCOV':1.2,'SPD':1.0,'AGI':0.9,'MCOV':0.8,'TACK':0.4,'HAND':0.3})
set_job('K',   {'THROW':0}, {'THROW':0.0})  # specialist - minimal (kicking not modeled in caps; treat as special)
set_job('P',   {'THROW':0}, {'THROW':0.0})

# Policy exemptions (sport-configurable rules; explicit, not hidden in formula)
# FB destination: in this football sim, many bodies can fill FB role cheaply (utility). Modeled as policy.
FB_FREE_SOURCES = {'RB','TE','OT','OG','C','DT','EDGE','ILB','OLB'}
# Some same-role no-ops
SELF_FREE = {('ILB','ILB'), ('OLB','OLB')}  # if present

# -------------------- G1 core computation --------------------
def ability_cost(src, dst, p=3.0):
    """Lp norm of weighted shortfalls; p>1 emphasizes bottleneck. Returns (cost, details)."""
    if dst not in J or src not in B:
        return None, None
    terms = []
    for c in CAPS:
        demand = J[dst][c]
        if demand <= 0: continue
        w = WJ[dst].get(c, 0.0)
        if w <= 0: continue
        short = max(0.0, demand - B[src].get(c, 0))
        if short > 0:
            terms.append((w * short, c, short, demand, B[src].get(c,0), w))
    if not terms:
        return 0.0, {'max':0.0,'raw_lp':0.0,'top':None,'n':0}
    vals = [t[0] for t in terms]
    m = max(vals)
    top = max(terms, key=lambda x: x[0])[2-2+1] if False else None
    top = max(terms, key=lambda x: x[0])[1]
    lp = (sum(v**p for v in vals)) ** (1.0/p)
    # blend: keep bottleneck dominant but include overall burden (my design choice)
    cost = 0.7*m + 0.3*lp
    return cost, {'max':m,'raw_lp':lp,'top':top,'n':len(terms)}

def value_guard(src, dst, gamma=10.0):
    """Lower bound from slot criticality mismatch: filling high-V dst with much lower-V src is costly."""
    vs = V.get(src, 20)
    vd = V.get(dst, 20)
    if vd <= 0: return 0.0
    ratio = vs / vd
    # no guard if source is at least as valuable; otherwise scale by deficit ratio
    if ratio >= 1.0: return 0.0
    # smooth but firm: 0 at equal, grows toward gamma as ratio -> 0
    return gamma * (1.0 - ratio)

def context_penalty(src, dst):
    """Domain/context incompatibility - parameterized, not hardcoded labels beyond domain map."""
    ds, dd = domain(src), domain(dst)
    if ds == 'S' or dd == 'S':
        # specialist swaps handled separately if needed
        return 0.0
    if ds == dd:
        return 0.0
    # cross-domain (O<->D) base incompatibility
    return 0.0  # handled via floor/guard interaction below; keep additive 0 for now

def policy_price(src, dst):
    if dst == 'FB' and src in FB_FREE_SOURCES:
        return 0
    if (src,dst) in SELF_FREE:
        return 0
    if src == dst:
        return 0
    return None

def g1_price(src, dst, cuts=(1.6,4.2,8.5), p=3.0, gamma=10.0, cross_floor=6):
    pol = policy_price(src,dst)
    if pol is not None:
        return pol, {'reason':'policy'}
    ac, det = ability_cost(src, dst, p=p)
    if ac is None:
        return None, {'reason':'missing'}
    vg = value_guard(src, dst, gamma=gamma)
    cx = context_penalty(src, dst)
    raw = max(ac, vg) + cx
    pr = tier_of(raw, cuts)
    # cross-domain floor (sport policy): cross-domain moves are rarely trivial except exempted
    if cross_floor is not None and domain(src) != domain(dst) and domain(src) in ('O','D') and domain(dst) in ('O','D'):
        if dst != 'FB' and pr < cross_floor:
            pr = cross_floor
    # specialist handling
    if src in SPECIAL and dst in SPECIAL:
        # K<->P: small but nonzero
        pr = tier_of(max(ac, vg), (1.0,3.0,6.0)) if pr==0 else pr
        if pr==0: pr=2
    if src in SPECIAL or dst in SPECIAL:
        # cross to/from specialist generally prohibitive except defined
        if not (src in SPECIAL and dst in SPECIAL):
            pr = 12
    return pr, {'raw':raw,'ability':ac,'vguard':vg,'p':p,'detail':det}

def evaluate(cuts=(1.6,4.2,8.5), p=3.0, gamma=10.0, cross_floor=6):
    exact=0; off=[]; hard=[]; rows=[]
    for s,d,o in RULES:
        pr, info = g1_price(s,d,cuts=cuts,p=p,gamma=gamma,cross_floor=cross_floor)
        if pr is None: continue
        rows.append((s,d,o,pr,info))
        if pr==o: exact+=1
        else:
            diff=step(o,pr)
            (off if diff==1 else hard).append((s,d,o,pr,info))
    terr = sum(step(o,pr) for _,_,o,pr,_ in rows)
    return exact, off, hard, terr, rows

def report(name, cuts, p, gamma, cross_floor):
    exact, off, hard, terr, rows = evaluate(cuts,p,gamma,cross_floor)
    print(f"\n{name}")
    print(f"cuts={cuts} p={p} gamma={gamma} cross_floor={cross_floor}")
    print(f"EXACT {exact} OFF1 {len(off)} HARD {len(hard)} TIERSUM {terr} / {len(rows)}")
    for r in sorted(off+hard):
        s,d,o,pr,info = r
        det = info.get('detail') or {}
        print(f"  {s}>{d} owner={o} model={pr} raw={info.get('raw')} abil={info.get('ability')} vg={info.get('vguard')} top={det.get('top')}")
    return exact, off, hard, terr

if __name__ == '__main__':
    # grid-ish search small
    best=None
    for p in (2.0,2.5,3.0,3.5,4.0):
      for gamma in (8.0,10.0,12.0,14.0):
        for c1 in (1.2,1.4,1.6,1.8,2.0):
          for c2 in (3.5,4.0,4.5,5.0):
            for c3 in (7.0,8.0,8.5,9.0):
              if not (c1 < c2 < c3): continue
              exact,off,hard,terr,_ = evaluate((c1,c2,c3),p,gamma,6)
              score = (exact, -terr, -len(hard))
              if best is None or score > best[0]:
                  best = (score, (c1,c2,c3), p, gamma)
    print('BEST', best)
    sc,(c1,c2,c3),p,gamma = best
    report('BEST', (c1,c2,c3), p, gamma, 6)
    report('ALT no floor', (c1,c2,c3), p, gamma, None)
    # also a principled manual setting
    report('MANUAL', (1.6,4.2,8.5), 3.0, 10.0, 6)
