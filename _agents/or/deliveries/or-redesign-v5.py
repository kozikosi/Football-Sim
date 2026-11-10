#!/usr/bin/env python3
"""OR redesign v5 — final evaluation of the 5-skill dual-profile formula."""
import json, subprocess, itertools

def git_show(ref, path):
    return subprocess.run(['git','show',f'{ref}:{path}'],capture_output=True,text=True,cwd='/Users/kosi/Desktop/wt/or').stdout

d = json.loads(git_show('origin/architect/engine-and-seats','tools/mathlab/flex.json'))
FLEX = d['flex']; ROLES = d['roles']; TIERS=[0,2,6,12]

SKILL_NAMES = ['STR','SPD','HT','TK','MN']
CUT = {0:1, 2:4, 6:9}

def tier(raw):
    if raw < 1: return 0
    if raw < 4: return 2
    if raw < 9: return 6
    return 12

def imp(n):
    return 1.6 if n>=7 else (1.2 if n>=4 else 0.8)

def full_price(src, dst):
    if src==dst: return 0
    if dst in FLEX.get(src,{}): return FLEX[src][dst]
    if src in FLEX.get(dst,{}): return FLEX[dst][src]
    h = {s: FLEX.get(src,{}).get(s,0) for s in SKILL_NAMES}
    NEED = {
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
    need = NEED.get(dst, NEED.get(src, {}))
    fg=0.0; sd=0.0
    for s in SKILL_NAMES:
        n=need.get(s,0); hh=h.get(s,0); w=imp(n)
        fg += max(0, w*(n-hh)) * 0.9
        sd += w*abs(n-hh)
    return tier(fg + 0.5*sd)

results=[]
for s in ROLES:
    for dd in ROLES:
        op = FLEX.get(s,{}).get(dd, FLEX.get(dd,{}).get(s,0))
        mp = full_price(s,dd)
        results.append((s,dd,op,mp))

exact=sum(1 for s,dd,o,m in results if o==m)
print(f"EXACT: {exact}/{len(results)}")
mism=[(s,dd,o,m) for s,dd,o,m in results if o!=m]
print(f"MISMATCHES: {len(mism)}")
from collections import Counter
print("owner distribution:", Counter(o for _,_,_,o in results))
print("model distribution:", Counter(m for _,_,_,m in results))
print("\nFirst 15 mismatches:")
for x in sorted(mism)[:15]: print(f"  {x[0]}->{x[1]}: owner={x[2]} model={x[3]}")
