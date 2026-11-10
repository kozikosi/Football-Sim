#!/usr/bin/env python3
"""
FL-1 reconsideration harness — Claude's guard + the field's ability layers, max vs sum,
plus the wasted-capability probe. Live table @ 97d7e9d. Nothing built.
"""
import json, itertools, sys
import zai_d1_matrices as Z
import fl1v2 as F

flex = json.load(open('flex-live-97d7e9d.json'))['flex']
rows = [(s, d, flex[s][d]) for s in flex for d in flex[s]]
liv = {(s, d): flex[s][d] for s, ds in flex.items() for d in ds}
TIi = {0: 0, 2: 1, 6: 2, 12: 3}
TIERS, CUTS = [0, 2, 6, 12], (1.0, 4.0, 9.0)
def tier(x, cuts=CUTS):
    lo, mid, hi = cuts
    return 0 if x < lo else 2 if x < mid else 6 if x < hi else 12

# Claude's guard (slot weights from sport-football.json, slots "at a722681 with WILL/C 200")
W = {"QB":1000,"WR":650,"OT":500,"OG":400,"C":200,"TE":250,"RB":250,"FB":25,"EDGE":650,
     "DT":500,"ILB":300,"OLB":200,"CB":400,"NICKEL":100,"DIME":50,"FS":300,"SS":300,"K":50,"P":50}
def guard(s, d):
    if W[s] < W[d]:
        return 20.0 * (1.0 - W[s] / W[d])
    return 0.0

def zai_ability(s, d, have=None):
    have = have or Z.HAVE
    hv = dict(zip(Z.DUTIES, have[s]))
    nd = Z.NEED[d]
    terms = []
    for duty, nv in nd.items():
        if duty in Z.SCOPE and d not in Z.SCOPE[duty]:
            continue
        deficit = max(0, nv - hv[duty])
        if deficit:
            terms.append((Z.W[duty] * deficit, duty, deficit))
    if not terms:
        return 0.0, None
    terms.sort(key=lambda t: -t[0])
    M = terms[0][0]
    S = sum(t[0] for t in terms[1:])
    return M + 0.4 * S, terms[0]

OFFENSE = {"QB","RB","FB","WR","TE","OT","OG","C"}
DEFENSE = {"DT","EDGE","ILB","OLB","SS","FS","CB","NICKEL","DIME"}
EX = {"FB","K","P"}
def floor_6(p, s, d):
    if d != "FB" and (s in OFFENSE) != (d in OFFENSE) and s not in EX and d not in EX:
        return max(p, 6)
    return p

# ZAI-D1 V4 body changes (paired: HAVE + NEED)
H4 = {r: list(v) for r, v in Z.HAVE.items()}
H4["EDGE"][Z.DUTIES.index("CARRY")] = 4
H4["C"][Z.DUTIES.index("PBLK")] = 6
H4["TE"][Z.DUTIES.index("PBLK")] = 4
N4 = {r: dict(v) for r, v in Z.NEED.items()}
N4["C"]["PBLK"] = 6

def zai_ability_v4(s, d):
    hv = dict(zip(Z.DUTIES, H4[s]))
    nd = N4[d]
    terms = []
    for duty, nv in nd.items():
        if duty in Z.SCOPE and d not in Z.SCOPE[duty]:
            continue
        deficit = max(0, nv - hv[duty])
        if deficit:
            terms.append((Z.W[duty] * deficit, duty, deficit))
    if not terms:
        return 0.0
    terms.sort(key=lambda t: -t[0])
    return terms[0][0] + 0.4 * sum(t[0] for t in terms[1:])

def inkling_ability(s, d):
    A, _ = F.aptitude(s, d, F.HAVE, F.NEED, 1.15, 0.35, F.BETA)
    return min(12.0, A)

def wasted_capability(s, d, tau, thresh_have=6, thresh_need=2):
    hv = dict(zip(Z.DUTIES, H4[s]))
    nd = N4[d]
    n = 0
    for duty in Z.DUTIES:
        if hv[duty] >= thresh_have and nd.get(duty, 0) <= thresh_need:
            n += 1
    return tau * n

def score(name, price_fn):
    exact, off1, hard, te = 0, [], [], 0
    for s, d, owner in rows:
        m = price_fn(s, d)
        if m == owner: exact += 1
        else:
            k = abs(TIi[m] - TIi[owner])
            te += k
            (off1 if k == 1 else hard).append((s, d, owner, m))
    print(f"{name}: exact {exact}/99 | off {len(off1)} | hard {len(hard)} | te {te} | residuals {sorted(off1+hard)}")
    return exact, off1, hard

def price_max(s, d):
    return floor_6(tier(min(12.0, max(zai_ability_v4(s, d), guard(s, d)))), s, d)
def price_sum(s, d):
    return floor_6(tier(min(12.0, zai_ability_v4(s, d) + guard(s, d))), s, d)
def price_max_ink(s, d):
    return floor_6(tier(min(12.0, max(inkling_ability(s, d), guard(s, d)))), s, d)
def price_sum_ink(s, d):
    return floor_6(tier(min(12.0, inkling_ability(s, d) + guard(s, d))), s, d)
def price_zai_only(s, d):
    return floor_6(tier(min(12.0, zai_ability_v4(s, d))), s, d)
def price_v_only(s, d):
    return floor_6(tier(min(12.0, guard(s, d))), s, d)

if __name__ != "__main__":
    raise SystemExit(0)

print("=== guard vs live (tier only) ===")
liv_count = sum(1 for (s, d), v in liv.items() if tier(guard(s, d)) == v)
print(f"tier(guard) == live on {liv_count}/99 rows (free: {sum(1 for s,d in liv if guard(s,d) == 0.0 and liv[(s,d)] == 0)} of {sum(1 for v in liv.values() if v == 0)} free rows)\n")

PIN3 = {("C","OG"): 6, ("FB","RB"): 2, ("FB","TE"): 6}
def price_max_3(s, d):
    if (s, d) in PIN3: return PIN3[(s, d)]
    return price_max(s, d)
def price_v4_3(s, d):
    if (s, d) in PIN3: return PIN3[(s, d)]
    return price_zai_only(s, d)
def price_guard_nofloor(s, d):
    return tier(min(12.0, guard(s, d)))

print("=== the merge candidates (V4 bodies paired, floor on) ===")
score("ZAI-D1 V4 alone (floor, no guard)  ", price_zai_only)
score("ZAI-D1 V4 + 3 anti-D pins          ", price_v4_3)
score("guard alone (no floor)             ", price_guard_nofloor)
score("guard alone                      ", price_v_only)
score("max(Z-A, G) + 3 anti-D pins        ", price_max_3)
score("max(Z-A, G)                      ", price_max)
score("Z-A + G (natural sum)            ", price_sum)
score("max(FL-A, G)                     ", price_max_ink)
score("FL-A + G (natural sum)           ", price_sum_ink)

print("\n=== wasted-capability probe (tau on V4 + max(Z-A, G)) ===")
def price_wc(tau):
    def fn(s, d):
        return floor_6(tier(min(12.0, max(zai_ability_v4(s, d), guard(s, d)) + wasted_capability(s, d, tau))), s, d)
    return fn
for tau in (1.5, 3.0, 4.0):
    score(f"V4 max + wasted tau={tau}           ", price_wc(tau))

print("\n=== leave-one-role-out sensitivity (fixed constants; caveat: constants fitted in-sample) ===")
for label, fn in [("max(Z-A, G)", price_max), ("Z-A + G", price_sum), ("max(FL-A, G)", price_max_ink), ("FL-A + G", price_sum_ink), ("ZAI V4 alone", price_zai_only)]:
    per_role = {}
    for role in sorted({s for s, _ in liv}):
        sub = [(s, d, liv[(s, d)]) for (s, d) in liv if s == role]
        ok = sum(1 for s, d, o in sub if fn(s, d) == o)
        per_role[role] = (ok, len(sub))
    avg = sum(v[0] for v in per_role.values()) / sum(v[1] for v in per_role.values())
    worst = sorted(per_role.items(), key=lambda kv: kv[1][0]/max(1, kv[1][1]))[:4]
    print(f"{label}: overall {avg:.0%} | hardest roles: {', '.join(f'{r} {v[0]}/{v[1]}' for r, v in worst)}")

print("\n=== raw-value distribution (the 0/2/6/12 vs sliding-scale question) ===")
allraw = []
for s, d, owner in rows:
    allraw.append(min(12.0, max(zai_ability_v4(s, d), guard(s, d))))
allraw.sort()
print("sorted raw (max(Z-A,G)):", " ".join(f"{v:.1f}" for v in allraw))
edges = [0, 1, 4, 9]
bands = {0: 0, 2: 0, 6: 0, 12: 0}
for v in allraw:
    bands[tier(v)] += 1
print(f"natural band counts at cuts 1/4/9: {bands}")
knife = sum(1 for v in allraw if min(abs(v-1), abs(v-4), abs(v-9)) < 0.75)
print(f"rows within 0.75 of a cut (knife-edge): {knife}/99")
