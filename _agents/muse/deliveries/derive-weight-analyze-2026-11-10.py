import json
from collections import defaultdict

flex = json.load(open('/tmp/flex99.json')).get('flex', {})
# Destination role -> primary slot weight (highest-weight slot for that role)
ROLE_W = {'QB':1000,'WR':650,'TE':250,'OT':500,'OG':400,'C':150,'RB':250,'FB':25,
          'DT':500,'EDGE':650,'ILB':300,'OLB':150,'SS':300,'FS':300,'CB':400,
          'NICKEL':100,'DIME':50,'K':50,'P':50}
rules = []
for src, dsts in flex.items():
    for dst, pen in dsts.items():
        rules.append((src, dst, pen, ROLE_W.get(dst)))
print(f"rules: {len(rules)}")
# 1. penalty distribution by destination weight
by_w = defaultdict(list)
for s,d,p,w in rules:
    by_w[w].append(p)
print("\n=== penalty by destination weight (primary slot) ===")
for w in sorted(by_w):
    ps = by_w[w]
    from collections import Counter
    print(f"  w={w:4d} n={len(ps):2d}  {dict(sorted(Counter(ps).items()))}")
# 2. does penalty correlate with destination weight? (mean penalty per weight)
print("\n=== mean penalty by destination weight ===")
for w in sorted(by_w):
    ps = by_w[w]
    print(f"  w={w:4d} mean={sum(ps)/len(ps):.2f}")
# 3. test a simple weight-band formula: w<=50 -> 2, 100-150 -> 6, 250-300 -> 6, 400+ -> 12 (try variants)
def tier_from_weight(w):
    if w <= 50: return 2
    if w <= 150: return 6
    if w <= 300: return 6
    return 12
exact = sum(1 for s,d,p,w in rules if tier_from_weight(w)==p)
print(f"\n=== pure weight-band formula (<=50:2, 100-150:6, 250-300:6, 400+:12) ===")
print(f"exact: {exact}/99")
# show the misses grouped
miss = [(s,d,p,tier_from_weight(w)) for s,d,p,w in rules if tier_from_weight(w)!=p]
print(f"misses: {len(miss)}")
for s,d,p,pred in sorted(miss, key=lambda x:(x[3]-x[2])):
    print(f"  {s}>{d}: owner {p}, formula {pred} (diff {pred-p:+d})")
