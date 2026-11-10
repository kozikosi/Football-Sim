#!/usr/bin/env python3
"""Glyph independent R4 verification (P-322, 2026-11-10).
R4 per MUSE derivation-R4: Inkling base + cross-side floor + same-group A halved (DB/LB/DL)
excluding FS<->SS (both directions) + cuts (1.5,4,9) + EDGE>OLB override 0.
Tested against 99-rule live table and D@90 at 97d7e9d (origin/architect/engine-and-seats).
Independent implementation (not running MUSE script).
"""
import json, re, subprocess
from collections import Counter

REF = '97d7e9d'
WD = '/Users/kosi/Desktop/wt/glyph'

def g(path):
    return subprocess.check_output(['git','show',f'{REF}:{path}'], text=True, cwd=WD)

flex_doc = json.loads(g('tools/mathlab/flex.json'))
owner = flex_doc['flex']
rules = [(s,d,v) for s,ds in sorted(owner.items()) for d,v in sorted(ds.items())]
n=len(rules); counts=Counter(v for _,_,v in rules)
print('REF',REF,'RULES',n,'TIER_COUNTS',dict(sorted(counts.items())))

tp = g('tools/mathlab/results/thetaprice-2026-11-09.md')
D={}
for line in tp.splitlines():
    m=re.match(r'^\|\s*([A-Z]+)>([A-Z0-9]+)\s*\|\s*\d+\s*\|\s*[\d.]+\s*\|\s*[\d.]+\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|', line)
    if m: D[(m.group(1),m.group(2))]=float(m.group(4))
D_bumped=dict(D); D_bumped[('OLB','ILB')]=6.7; D_bumped[('OLB','SS')]=6.7
print('THETAPRICE_ROWS',len(D),'NONZERO',sum(1 for v in D.values() if v>0))

OFFENSE={'QB','RB','FB','WR','TE','OT','OG','C'}
DEFENSE={'DT','EDGE','ILB','OLB','SS','FS','CB','NICKEL','DIME'}
DB={'CB','FS','SS','NICKEL','DIME'}; LB={'ILB','OLB'}; DL={'DT','EDGE'}

def is_cross(src,dst):
    return (src in OFFENSE and dst in DEFENSE) or (src in DEFENSE and dst in OFFENSE)

S={
 'QB':{'BLK':1,'CTH':2,'COV':2,'RNG':1,'RSH':2,'RUN':8,'SNP':0},
 'RB':{'BLK':3,'CTH':6,'COV':2,'RNG':1,'RSH':0,'RUN':9,'SNP':0},
 'FB':{'BLK':8,'CTH':2,'COV':2,'RNG':0,'RSH':0,'RUN':6,'SNP':0},
 'WR':{'BLK':1,'CTH':10,'COV':6,'RNG':5,'RSH':0,'RUN':4,'SNP':0},
 'TE':{'BLK':7,'CTH':8,'COV':4,'RNG':2,'RSH':0,'RUN':5,'SNP':0},
 'OT':{'BLK':10,'CTH':0,'COV':0,'RNG':0,'RSH':0,'RUN':0,'SNP':5},
 'OG':{'BLK':9,'CTH':0,'COV':0,'RNG':0,'RSH':0,'RUN':0,'SNP':6},
 'C': {'BLK':6,'CTH':0,'COV':0,'RNG':0,'RSH':0,'RUN':0,'SNP':10},
 'DT':{'BLK':0,'CTH':0,'COV':0,'RNG':0,'RSH':8,'RUN':0,'SNP':0},
 'EDGE':{'BLK':2,'CTH':0,'COV':3,'RNG':2,'RSH':10,'RUN':0,'SNP':0},
 'ILB':{'BLK':0,'CTH':2,'COV':3.5,'RNG':3,'RSH':5,'RUN':1,'SNP':0},
 'OLB':{'BLK':0,'CTH':2,'COV':4.5,'RNG':2,'RSH':7,'RUN':0,'SNP':0},
 'SS':{'BLK':0,'CTH':3,'COV':9,'RNG':4,'RSH':3,'RUN':0,'SNP':0},
 'FS':{'BLK':0,'CTH':4,'COV':9,'RNG':9,'RSH':1,'RUN':0,'SNP':0},
 'CB':{'BLK':0,'CTH':7,'COV':10,'RNG':8,'RSH':0,'RUN':0,'SNP':0},
 'K': {'BLK':0,'CTH':0,'COV':0,'RNG':0,'RSH':0,'RUN':0,'SNP':0,'KCK':10,'PNT':0},
 'P': {'BLK':0,'CTH':0,'COV':0,'RNG':0,'RSH':0,'RUN':0,'SNP':0,'KCK':0,'PNT':10},
 'NICKEL':{'BLK':0,'CTH':5,'COV':9,'RNG':4,'RSH':0,'RUN':0,'SNP':0},
 'DIME':  {'BLK':0,'CTH':4,'COV':9.5,'RNG':4,'RSH':0,'RUN':0,'SNP':0},
}
BETA={'BLK':0.75,'CTH':0.5,'COV':0.5,'RNG':0.6,'RSH':0.8,'RUN':1.1,'SNP':0.4,'KCK':0.2,'PNT':0.2}
DMULT={'NICKEL':1.7,'DIME':3.6,'FS':2.0}
U={('RB','TE'):3.0,('SS','ILB'):5.0,('TE','ILB'):6.4,('RB','SS'):6.6,('EDGE','SS'):5.1}
OVERRIDE={'C,OG':6,'FB,RB':2,'FB,TE':6,'EDGE,RB':6,'EDGE,ILB':6}
# R4 adds EDGE>OLB override 0
OVERRIDE_R4=dict(OVERRIDE); OVERRIDE_R4['EDGE,OLB']=0
FB_FREE={'RB','TE','OT','OG','C','DT','EDGE','ILB','OLB'}

def tier(x,cuts):
    if x<cuts[0]: return 0
    if x<cuts[1]: return 2
    if x<cuts[2]: return 6
    return 12

def same_group_halved(src,dst,exclude_fs_ss=True):
    if exclude_fs_ss and ((src=='FS' and dst=='SS') or (src=='SS' and dst=='FS')):
        return False
    for g in (DB,LB,DL):
        if src in g and dst in g: return True
    return False

def price(src,dst,cuts=(1,4,9),floor=True,group='half',exclude_fs_ss=False,ov=None,blk_any_dest_elite=True):
    if ov is None: ov=OVERRIDE
    if dst=='SAM': return price(src,'OLB',cuts,floor,group,exclude_fs_ss,ov,blk_any_dest_elite)
    if dst=='FB' and src in FB_FREE: return 0
    key=f"{src},{dst}"
    if key in ov: return ov[key]
    if src==dst: return 0
    Dv=D_bumped.get((src,dst),0.0)
    ps=S.get(src); pd=S.get(dst)
    if ps is None or pd is None: return None
    A=0.0
    for skill,beta in BETA.items():
        if skill=='RUN' and dst!='RB': continue
        if skill=='SNP' and dst!='C': continue
        if skill=='KCK' and dst!='K': continue
        if skill=='PNT' and dst!='P': continue
        gap=max(0.0,pd.get(skill,0)-ps.get(skill,0))
        b=beta
        if skill=='COV' and dst in DMULT: b=beta*DMULT[dst]
        if skill in ('COV','RNG') and ps.get('CTH',0)>=9: b=b*0.5
        if skill=='BLK' and ps.get('BLK',0)>=8 and pd.get('BLK',0)>=8:
            if blk_any_dest_elite or dst=='C': gap=0.0
        A += b*gap
    if Dv>=5: Aeff=0.0
    elif Dv>=4: Aeff=A*0.5
    else: Aeff=A
    if group=='half' and same_group_halved(src,dst,exclude_fs_ss=exclude_fs_ss):
        Aeff=Aeff*0.5
    x=max(0.0,Dv)+Aeff+U.get((src,dst),0.0)
    x=min(max(x,0.0),12.0)
    m=tier(x,cuts)
    if floor and dst!='FB' and is_cross(src,dst) and m<6: m=6
    return m

def compare(fn):
    tiers=[0,2,6,12]; ex=0; off=[]; hard=[]; miss=[]
    for s,d,o in rules:
        m=fn(s,d)
        if m is None: miss.append((s,d,o)); continue
        if m==o: ex+=1
        else:
            diff=abs(tiers.index(m)-tiers.index(o))
            (off if diff==1 else hard).append((s,d,o,m))
    return ex,off,hard,miss

def rep(name,fn,base=None):
    ex,off,hard,miss=compare(fn)
    print(f"\n{name}")
    print(f"EXACT {ex} OFF1 {len(off)} HARD {len(hard)} MISSING {len(miss)}")
    if off or hard:
        print('RESIDUALS', sorted(off+hard))
    if base:
        exb,offb,hardb,_=compare(base)
        broke=[]; fixed=[]
        for s,d,o in rules:
            mb=base(s,d); m=fn(s,d)
            if mb==o and m!=o: broke.append((s,d,o,mb,m))
            if mb!=o and m==o: fixed.append((s,d,o,mb,m))
        print('BROKE', len(broke), sorted(broke))
        print('FIXED', len(fixed), sorted(fixed))
    return ex,off,hard

# Baselines
base = lambda s,d: price(s,d,cuts=(1,4,9),floor=True,group=None,exclude_fs_ss=False,ov=OVERRIDE)
e5 = lambda s,d: price(s,d,cuts=(1.5,4,9),floor=True,group='half',exclude_fs_ss=False,ov=OVERRIDE)
r4 = lambda s,d: price(s,d,cuts=(1.5,4,9),floor=True,group='half',exclude_fs_ss=True,ov=OVERRIDE_R4)

print('GROUPS: DB={CB,FS,SS,NICKEL,DIME} LB={ILB,OLB} DL={DT,EDGE} | BLK elite-line (both>=8 any dst) zeroed (MUSE-prototype behavior)')
rep('BASELINE floor cuts(1,4,9)', base)
rep('E5 floor same-group half cuts(1.5,4,9)', e5, base)
rep('R4 = E5 + FS<->SS excluded from discount + EDGE>OLB override 0', r4, base)
# details
print('DETAIL E5 EDGE>OLB', owner['EDGE']['OLB'], e5('EDGE','OLB'), 'FS>SS', owner['FS']['SS'], e5('FS','SS'))
print('DETAIL R4 EDGE>OLB', owner['EDGE']['OLB'], r4('EDGE','OLB'), 'FS>SS', owner['FS']['SS'], r4('FS','SS'))
# confirm perfect
ex,off,hard,_=compare(r4)
print('R4_PERFECT_99_0_0', ex==99 and len(off)==0 and len(hard)==0)
