import json
from collections import Counter
flex = json.load(open('/tmp/flex99.json')).get('flex', {})
ROLE_W = {'QB':1000,'WR':650,'TE':250,'OT':500,'OG':400,'C':150,'RB':250,'FB':25,
          'DT':500,'EDGE':650,'ILB':300,'OLB':150,'SS':300,'FS':300,'CB':400,
          'NICKEL':100,'DIME':50,'K':50,'P':50}
# role groups (football sense)
GROUP = {'QB':'QB','WR':'SKILL','TE':'SKILL','RB':'SKILL','FB':'SKILL',
         'OT':'OL','OG':'OL','C':'OL',
         'DT':'DL','EDGE':'DL',
         'ILB':'LB','OLB':'LB',
         'CB':'DB','SS':'DB','FS':'DB','NICKEL':'DB','DIME':'DB',
         'K':'ST','P':'ST'}
SIDE = {'QB':'OFF','WR':'OFF','TE':'OFF','RB':'OFF','FB':'OFF','OT':'OFF','OG':'OFF','C':'OFF',
        'DT':'DEF','EDGE':'DEF','ILB':'DEF','OLB':'DEF','CB':'DEF','SS':'DEF','FS':'DEF','NICKEL':'DEF','DIME':'DEF',
        'K':'ST','P':'ST'}
rules = [(s,d,p,ROLE_W[d]) for s,ds in flex.items() for d,p in ds.items()]

def wband(w):
    if w <= 50: return 2
    if w <= 150: return 6
    if w <= 300: return 6
    return 12

# Formula 2: same-role 0; same-group 0; else weight-band, floored at 6 if cross-side
def f2(s,d,w):
    if s==d: return 0
    if GROUP[s]==GROUP[d]: return 0
    base = wband(w)
    if SIDE[s]!=SIDE[d] and SIDE[s]!='ST' and SIDE[d]!='ST':
        base = max(base, 6)
    return base
ex2 = sum(1 for s,d,p,w in rules if f2(s,d,w)==p)
print(f"Formula 2 (same-role/group 0; else weight-band, cross-side floor 6): exact {ex2}/99")
miss2 = [(s,d,p,f2(s,d,w)) for s,d,p,w in rules if f2(s,d,w)!=p]
print(f"misses: {len(miss2)}")
for s,d,p,pred in sorted(miss2):
    print(f"  {s}>{d}: owner {p}, formula {pred} (diff {pred-p:+d})")
