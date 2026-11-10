#!/usr/bin/env python3
"""
GLYPH-G2: Capability-Role Fit Engine (CRFE) - from-scratch, sport-generalizable design.
Glyph, 2026-11-10. Reconsidered after reviewing recent council work (MUSE-D1 failure,
guard verification, ZAI-D1/R4/VL/Inkling findings). Independent capability schema and
instantiation; structure informed by validated lessons (bottleneck-dominant absolute
shortfalls; separate value/context/policy layers).

Formula:
  A(src,dst) = M + alpha * S,  where deficits d_i = w_i(dst)*max(0, R(dst,i)-B(src,i)) over job-relevant caps,
                               M=max(d_i), S=sum(d_i)-M
  Vg(src,dst) = kappa * max(0, 1 - V(src)/V(dst))   (slot-criticality lower bound)
  base = max(A, Vg)
  apply context/policy: cross-domain floor F (except exempt), explicit exemptions, specialist rules
  price = tier(base') with cuts (c1,c2,c3)

Football instantiation authored independently and tested against 99-rule table (97d7e9d).
"""
import json, subprocess, itertools
from collections import Counter

REF='97d7e9d'; WD='/Users/kosi/Desktop/wt/glyph'
def gshow(p): return subprocess.check_output(['git','show',f'{REF}:{p}'], text=True, cwd=WD)
OWNER=json.loads(gshow('tools/mathlab/flex.json'))['flex']
RULES=[(s,d,v) for s,ds in sorted(OWNER.items()) for d,v in sorted(ds.items())]
TIERS=[0,2,6,12]
def tier_of(x,cuts):
    if x<cuts[0]: return 0
    if x<cuts[1]: return 2
    if x<cuts[2]: return 6
    return 12
def step(a,b): return abs(TIERS.index(a)-TIERS.index(b))

# Capability dimensions (my own set)
C=['PASS_PRO','RUN_BLK','SNAP','CATCH','ROUTE','CARRY','THROW','SPEED','AGI','STR','TACKLE','RUN_DEF','COV_MAN','COV_ZONE','RUSH']
OFFENSE={'QB','RB','FB','WR','TE','OT','OG','C'}
DEFENSE={'DT','EDGE','ILB','OLB','SS','FS','CB','NICKEL','DIME'}
SPECIAL={'K','P'}
def dom(r):
    if r in OFFENSE: return 'O'
    if r in DEFENSE: return 'D'
    if r in SPECIAL: return 'S'
    return 'X'

# Slot values V (criticality) - my scale
V={'QB':100,'OT':88,'EDGE':82,'WR':70,'CB':70,'DT':62,'TE':58,'OG':55,'C':52,'ILB':50,'SS':48,'FS':48,'OLB':46,'RB':46,'NICKEL':34,'DIME':30,'FB':22,'K':20,'P':20}

# Body profiles B (0-10), my authored instantiation
B={
 'QB':   {'PASS_PRO':1,'RUN_BLK':1,'SNAP':0,'CATCH':3,'ROUTE':1,'CARRY':6,'THROW':10,'SPEED':5,'AGI':6,'STR':3,'TACKLE':1,'RUN_DEF':1,'COV_MAN':1,'COV_ZONE':1,'RUSH':0},
 'RB':   {'PASS_PRO':2,'RUN_BLK':5,'SNAP':0,'CATCH':6,'ROUTE':4,'CARRY':10,'THROW':1,'SPEED':8,'AGI':9,'STR':5,'TACKLE':3,'RUN_DEF':2,'COV_MAN':1,'COV_ZONE':1,'RUSH':0},
 'FB':   {'PASS_PRO':4,'RUN_BLK':9,'SNAP':0,'CATCH':3,'ROUTE':2,'CARRY':6,'THROW':0,'SPEED':5,'AGI':5,'STR':8,'TACKLE':5,'RUN_DEF':5,'COV_MAN':1,'COV_ZONE':1,'RUSH':1},
 'WR':   {'PASS_PRO':1,'RUN_BLK':2,'SNAP':0,'CATCH':10,'ROUTE':10,'CARRY':6,'THROW':1,'SPEED':9,'AGI':9,'STR':3,'TACKLE':3,'RUN_DEF':1,'COV_MAN':4,'COV_ZONE':3,'RUSH':0},
 'TE':   {'PASS_PRO':4,'RUN_BLK':7,'SNAP':0,'CATCH':8,'ROUTE':6,'CARRY':4,'THROW':0,'SPEED':6,'AGI':6,'STR':8,'TACKLE':4,'RUN_DEF':3,'COV_MAN':2,'COV_ZONE':2,'RUSH':1},
 'OT':   {'PASS_PRO':10,'RUN_BLK':9,'SNAP':2,'CATCH':1,'ROUTE':0,'CARRY':1,'THROW':0,'SPEED':3,'AGI':4,'STR':10,'TACKLE':3,'RUN_DEF':4,'COV_MAN':0,'COV_ZONE':0,'RUSH':3},
 'OG':   {'PASS_PRO':8,'RUN_BLK':9,'SNAP':3,'CATCH':1,'ROUTE':0,'CARRY':1,'THROW':0,'SPEED':3,'AGI':4,'STR':10,'TACKLE':3,'RUN_DEF':4,'COV_MAN':0,'COV_ZONE':0,'RUSH':3},
 'C':    {'PASS_PRO':6,'RUN_BLK':8,'SNAP':10,'CATCH':1,'ROUTE':0,'CARRY':1,'THROW':0,'SPEED':3,'AGI':4,'STR':9,'TACKLE':3,'RUN_DEF':4,'COV_MAN':0,'COV_ZONE':0,'RUSH':2},
 'DT':   {'PASS_PRO':3,'RUN_BLK':3,'SNAP':0,'CATCH':1,'ROUTE':0,'CARRY':1,'THROW':0,'SPEED':4,'AGI':4,'STR':10,'TACKLE':7,'RUN_DEF':9,'COV_MAN':0,'COV_ZONE':1,'RUSH':7},
 'EDGE': {'PASS_PRO':2,'RUN_BLK':2,'SNAP':0,'CATCH':2,'ROUTE':1,'CARRY':4,'THROW':0,'SPEED':8,'AGI':8,'STR':8,'TACKLE':7,'RUN_DEF':7,'COV_MAN':2,'COV_ZONE':2,'RUSH':10},
 'ILB':  {'PASS_PRO':1,'RUN_BLK':2,'SNAP':0,'CATCH':3,'ROUTE':1,'CARRY':2,'THROW':0,'SPEED':7,'AGI':7,'STR':7,'TACKLE':9,'RUN_DEF':9,'COV_MAN':5,'COV_ZONE':6,'RUSH':5},
 'OLB':  {'PASS_PRO':1,'RUN_BLK':2,'SNAP':0,'CATCH':3,'ROUTE':1,'CARRY':2,'THROW':0,'SPEED':7,'AGI':7,'STR':7,'TACKLE':8,'RUN_DEF':7,'COV_MAN':4,'COV_ZONE':4,'RUSH':7},
 'SS':   {'PASS_PRO':0,'RUN_BLK':1,'SNAP':0,'CATCH':4,'ROUTE':2,'CARRY':2,'THROW':0,'SPEED':8,'AGI':8,'STR':5,'TACKLE':8,'RUN_DEF':5,'COV_MAN':6,'COV_ZONE':7,'RUSH':2},
 'FS':   {'PASS_PRO':0,'RUN_BLK':1,'SNAP':0,'CATCH':5,'ROUTE':2,'CARRY':2,'THROW':0,'SPEED':9,'AGI':8,'STR':4,'TACKLE':6,'RUN_DEF':4,'COV_MAN':6,'COV_ZONE':9,'RUSH':1},
 'CB':   {'PASS_PRO':0,'RUN_BLK':1,'SNAP':0,'CATCH':6,'ROUTE':5,'CARRY':3,'THROW':0,'SPEED':9,'AGI':9,'STR':3,'TACKLE':5,'RUN_DEF':3,'COV_MAN':9,'COV_ZONE':8,'RUSH':1},
 'K':    {'PASS_PRO':0,'RUN_BLK':0,'SNAP':0,'CATCH':2,'ROUTE':0,'CARRY':1,'THROW':0,'SPEED':3,'AGI':3,'STR':2,'TACKLE':1,'RUN_DEF':0,'COV_MAN':0,'COV_ZONE':0,'RUSH':0},
 'P':    {'PASS_PRO':0,'RUN_BLK':0,'SNAP':0,'CATCH':2,'ROUTE':0,'CARRY':1,'THROW':0,'SPEED':3,'AGI':3,'STR':2,'TACKLE':1,'RUN_DEF':0,'COV_MAN':0,'COV_ZONE':0,'RUSH':0},
 'NICKEL':{'PASS_PRO':0,'RUN_BLK':1,'SNAP':0,'CATCH':5,'ROUTE':3,'CARRY':2,'THROW':0,'SPEED':9,'AGI':9,'STR':3,'TACKLE':6,'RUN_DEF':3,'COV_MAN':8,'COV_ZONE':6,'RUSH':1},
 'DIME':  {'PASS_PRO':0,'RUN_BLK':1,'SNAP':0,'CATCH':5,'ROUTE':3,'CARRY':2,'THROW':0,'SPEED':9,'AGI':9,'STR':3,'TACKLE':5,'RUN_DEF':3,'COV_MAN':7,'COV_ZONE':8,'RUSH':1},
}

# Job requirements R and importance weights Wj (demand,weight) - only relevant caps listed
J={}
def sj(role, reqs):
    # reqs: cap -> (demand, weight)
    J[role]={c:(0,0.0) for c in C}
    for c,(d,w) in reqs.items(): J[role][c]=(d,float(w))

sj('QB',  {'THROW':(10,2.0),'CARRY':(4,0.7),'SPEED':(4,0.5),'AGI':(5,0.5),'CATCH':(2,0.2)})
sj('RB',  {'CARRY':(10,1.8),'SPEED':(8,1.0),'AGI':(9,1.0),'CATCH':(5,0.6),'ROUTE':(4,0.5),'RUN_BLK':(4,0.5),'PASS_PRO':(2,0.4)})
sj('FB',  {'RUN_BLK':(8,1.2),'PASS_PRO':(3,0.5),'STR':(7,0.8),'CARRY':(4,0.4),'CATCH':(2,0.2),'SPEED':(4,0.3),'RUN_DEF':(2,0.2)})
sj('WR',  {'CATCH':(10,1.5),'ROUTE':(10,1.4),'SPEED':(9,1.2),'AGI':(9,1.0),'CARRY':(5,0.6),'RUN_BLK':(1,0.1)})
sj('TE',  {'CATCH':(7,0.9),'ROUTE':(5,0.6),'RUN_BLK':(7,1.0),'PASS_PRO':(5,1.1),'STR':(7,0.8),'SPEED':(5,0.5),'CARRY':(3,0.3)})
sj('OT',  {'PASS_PRO':(10,2.0),'RUN_BLK':(9,1.0),'STR':(9,1.0),'AGI':(4,0.4),'SPEED':(3,0.3)})
sj('OG',  {'PASS_PRO':(8,1.4),'RUN_BLK':(9,1.1),'STR':(9,1.0),'AGI':(4,0.4),'SPEED':(3,0.3)})
sj('C',   {'SNAP':(10,1.4),'PASS_PRO':(7,1.4),'RUN_BLK':(8,1.0),'STR':(8,0.8),'AGI':(4,0.4)})
sj('DT',  {'RUN_DEF':(9,1.4),'STR':(9,1.0),'TACKLE':(6,0.7),'RUSH':(6,0.8),'SPEED':(3,0.3)})
sj('EDGE',{'RUSH':(10,1.6),'SPEED':(7,0.8),'AGI':(7,0.7),'RUN_DEF':(7,0.8),'STR':(7,0.6),'TACKLE':(5,0.5)})
sj('ILB', {'TACKLE':(9,1.2),'RUN_DEF':(8,1.1),'SPEED':(7,0.7),'AGI':(7,0.6),'COV_ZONE':(5,0.7),'COV_MAN':(4,0.5),'RUSH':(4,0.4)})
sj('OLB', {'TACKLE':(8,1.0),'RUSH':(7,1.0),'RUN_DEF':(6,0.8),'SPEED':(7,0.7),'AGI':(7,0.6),'COV_ZONE':(3,0.4),'COV_MAN':(3,0.4)})
sj('SS',  {'TACKLE':(8,1.0),'COV_ZONE':(7,1.0),'COV_MAN':(6,0.8),'SPEED':(8,0.8),'AGI':(8,0.7),'RUN_DEF':(4,0.4),'CATCH':(3,0.2)})
sj('FS',  {'COV_ZONE':(9,1.4),'SPEED':(9,1.0),'AGI':(8,0.7),'COV_MAN':(6,0.7),'TACKLE':(5,0.5),'CATCH':(4,0.3)})
sj('CB',  {'COV_MAN':(9,1.5),'SPEED':(9,1.1),'AGI':(9,1.0),'COV_ZONE':(7,0.8),'CATCH':(5,0.5),'TACKLE':(4,0.4)})
sj('NICKEL',{'COV_MAN':(8,1.3),'SPEED':(9,1.0),'AGI':(9,0.9),'COV_ZONE':(5,0.6),'TACKLE':(5,0.5),'CATCH':(4,0.3)})
sj('DIME',  {'COV_ZONE':(8,1.2),'SPEED':(9,1.0),'AGI':(9,0.9),'COV_MAN':(6,0.8),'TACKLE':(4,0.4),'CATCH':(4,0.3)})
sj('K', {}); sj('P', {})

FB_FREE_SOURCES={'RB','TE','OT','OG','C','DT','EDGE','ILB','OLB'}

def ability(src,dst,alpha=0.5):
    if dst not in J or src not in B: return None, None
    defs=[]
    for c in C:
        dem,w = J[dst][c]
        if dem<=0 or w<=0: continue
        short=max(0.0, dem - B[src].get(c,0))
        if short>0: defs.append((w*short,c,short,dem))
    if not defs: return 0.0, None
    defs.sort(reverse=True)
    M=defs[0][0]; top=defs[0][1]; S=sum(x[0] for x in defs[1:])
    return M + alpha*S, top

def vguard(src,dst,kappa=12.0):
    vs=V.get(src,20); vd=V.get(dst,20)
    if vd<=0 or vs>=vd: return 0.0
    return kappa*(1.0 - vs/vd)

def policy_free(src,dst):
    if src==dst: return 0
    if dst=='FB' and src in FB_FREE_SOURCES: return 0
    return None

def is_cross(src,dst):
    a,b=dom(src),dom(dst)
    return a in ('O','D') and b in ('O','D') and a!=b

def g2_price(src,dst,cuts=(1.5,4.0,8.5),alpha=0.5,kappa=12.0,cross_floor=6,use_guard=True):
    pol=policy_free(src,dst)
    if pol is not None: return pol, {'why':'policy'}
    if src in SPECIAL and dst in SPECIAL:
        return 2, {'why':'special-swap'}
    if src in SPECIAL or dst in SPECIAL:
        return 12, {'why':'special-x'}
    A,top = ability(src,dst,alpha)
    if A is None: return None, {'why':'missing'}
    G = vguard(src,dst,kappa) if use_guard else 0.0
    raw = max(A,G)
    pr = tier_of(raw,cuts)
    if cross_floor is not None and is_cross(src,dst) and dst!='FB' and pr < cross_floor:
        pr = cross_floor
    return pr, {'raw':raw,'A':A,'G':G,'top':top}

def eval_model(**kw):
    exact=off=hard=0; terr=0; res=[]
    for s,d,o in RULES:
        pr,info=g2_price(s,d,**kw)
        if pr is None: continue
        st=step(o,pr); terr+=st
        if pr==o: exact+=1
        elif st==1: off+=1; res.append((s,d,o,pr,info))
        else: hard+=1; res.append((s,d,o,pr,info))
    return exact,off,hard,terr,res

def rep(name,**kw):
    exact,off,hard,terr,res=eval_model(**kw)
    print(f"\n{name} {kw}")
    print(f"EXACT {exact} OFF1 {off} HARD {hard} TERR {terr}")
    for r in sorted(res):
        s,d,o,pr,info=r
        print(f"  {s}>{d} o={o} m={pr} raw={info.get('raw')} A={info.get('A')} G={info.get('G')} top={info.get('top')}")
    return exact

if __name__=='__main__':
    rep('BASE', cuts=(1.5,4.0,8.5), alpha=0.5, kappa=12.0, cross_floor=6, use_guard=True)
    rep('NO_GUARD', cuts=(1.5,4.0,8.5), alpha=0.5, kappa=12.0, cross_floor=6, use_guard=False)
    rep('NO_FLOOR', cuts=(1.5,4.0,8.5), alpha=0.5, kappa=12.0, cross_floor=None, use_guard=True)
    # quick search
    best=None
    for alpha in (0.3,0.4,0.5,0.6):
      for kappa in (0.0,8.0,10.0,12.0,14.0):
        for c1 in (1.2,1.5,1.8):
          for c2 in (3.5,4.0,4.5):
            for c3 in (7.5,8.5,9.0):
              ex,off,hard,terr,_=eval_model(cuts=(c1,c2,c3),alpha=alpha,kappa=kappa,cross_floor=6,use_guard=(kappa>0))
              sc=(ex,-terr,-hard)
              if best is None or sc>best[0]: best=(sc,alpha,kappa,(c1,c2,c3))
    print('\nBEST_SEARCH', best)
    sc,alpha,kappa,cuts=best
    rep('BEST', cuts=cuts, alpha=alpha, kappa=kappa, cross_floor=6, use_guard=(kappa>0))
