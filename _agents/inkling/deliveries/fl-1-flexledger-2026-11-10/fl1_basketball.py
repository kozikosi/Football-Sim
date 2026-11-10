#!/usr/bin/env python3
"""
FL-1 basketball instantiation — INFERRED, UNFITTED. Demonstrates that the
architecture ports unchanged; it is NOT a measurement (basketball has no oracle,
and no basketball work is authorized until 76 Pancakes ships).
All constants below are priors, labeled INFERRED.
"""
import fl1v2 as F

DUTIES = ["RIM","BALL","T3","MD","FT","POST","FIN","REB","PLAY","PERIM","HELP","SCRE","VERS","MOVE","PNR"]
HAVE = {
 "PG": [ 1,10, 8, 8, 9, 1, 4, 3, 9, 7, 6, 2, 7, 9, 7],
 "SG": [ 1, 8, 9, 8, 9, 2, 6, 4, 6, 7, 5, 2, 6, 8, 6],
 "SF": [ 2, 6, 7, 7, 8, 4, 6, 6, 5, 8, 7, 3, 9, 7, 8],
 "PF": [ 6, 4, 5, 6, 7, 7, 6, 8, 4, 5, 7, 8, 6, 5, 6],
 "C":  [ 9, 3, 2, 3, 6, 9, 7,10, 3, 2, 7, 9, 2, 3, 8],
}
NEED = {
 "PG": {"BALL":10,"PLAY":9,"T3":6,"FT":6,"PERIM":6,"PNR":5},
 "SG": {"T3":8,"MD":6,"MOVE":7,"PERIM":6,"BALL":6,"FT":7},
 "SF": {"PERIM":8,"VERS":8,"T3":6,"REB":5,"MOVE":5,"PLAY":4},
 "PF": {"POST":6,"REB":8,"SCRE":7,"RIM":5,"MD":5,"HELP":6},
 "C":  {"RIM":9,"REB":9,"POST":8,"SCRE":8,"HELP":6,"FT":5},
}
# unfitted weights (uniform prior 1.0), lambda's inherited, cuts inherited, regime inactive (basketball has no offense/defense divide)
BETA = {d: 1.0 for d in DUTIES}
def aptitude(src, dst, gamma=1.15, kappa=0.35):
    hv = dict(zip(DUTIES, HAVE[src]))
    nd = NEED[dst]
    contrib = []
    for d, nv in nd.items():
        gap = max(0.0, nv - hv[d])
        if gap <= 0: continue
        contrib.append((BETA[d] * (nv/10.0) * (gap ** gamma), d, gap))
    if not contrib:
        return 0.0, []
    contrib.sort(key=lambda t: -t[0])
    q = contrib[0][0] + kappa * sum(c[0] for c in contrib[1:])
    return min(12.0, q), contrib

print('positions: PG SG SF PF C | 15 duties | INFERRED priors, no oracle, unfitted')
print()
plays = [("C","PF"),("PF","C"),("PG","SG"),("SG","SF"),("SF","PF"),("PF","SG"),("C","SF"),("PG","C")]
for s, d in plays:
    q, contrib = aptitude(s, d)
    tier = F.tier(q)
    c = ", ".join(f"{d2} gap {g}" for _, d2, g in contrib[:3])
    print(f"{s} -> {d}: raw-deficit {q:5.2f} | tier {tier:2d} | top gaps: {c or 'none'}")
