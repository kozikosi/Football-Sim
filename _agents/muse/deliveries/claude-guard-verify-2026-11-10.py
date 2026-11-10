#!/usr/bin/env python3
"""Verify Claude's guard proposal against all 99 rules (MUSE, 2026-11-10).

Claude's proposal (verbatim in _agents/owner-notes/2026-11-10-claude-guard-proposal-verbatim.txt):
  price = tier(max(G, L))
  G = 20 * (1 - w_src / w_dst), from the slot-weight table only, zero fitted constants.
  L = a duty-deficit score in the NEED/HAVE style (ZAI-D1's structure).
  Waivers: only FB>RB, FB>TE, C>OG are priced below the guard.

Method: import Z.ai's script, run it against the live 99-rule table
(architect 678bb06 flex.json), compute G for each rule with the primary-slot
weights, and compare max(G, L) to the Owner's table.

Role -> primary slot weight (input weights, slots.ts / design.json):
  QB 1000, WR 650 (WR1), DT 500 (DT1), EDGE 650 (DE1), OT 500 (OT1),
  CB 400 (CB1), OG 400 (OG1), ILB 300 (MIKE), OLB 150 (WILL),
  SS 300, FS 300, TE 250 (TE1), RB 250 (RB1), C 150,
  NICKEL 100 (CB3), DIME 50, FB 25, K 50, P 50.

NOTE: the role->weight mapping is the crux. Claude did not specify it.
If OLB maps to 300 (same as ILB) instead of 150, OLB>ILB and OLB>SS
are NOT broken by the guard, and his "only three rules below the guard"
claim holds. The mapping decides whether the guard works.

Usage: python3 claude-guard-verify-2026-11-10.py
  Expects zai_flex_derive.py and flex.json in the same directory.
"""
import json, sys
sys.path.insert(0, '.')
import zai_flex_derive as z

live = json.load(open('flex.json'))['flex']
W = {'QB': 1000, 'WR': 650, 'DT': 500, 'EDGE': 650, 'OT': 500, 'CB': 400,
     'OG': 400, 'ILB': 300, 'OLB': 150, 'SS': 300, 'FS': 300, 'TE': 250,
     'RB': 250, 'C': 150, 'NICKEL': 100, 'DIME': 50, 'FB': 25, 'K': 50, 'P': 50}

def tier(x):
    return 0 if x < 1 else (2 if x < 4 else (6 if x < 9 else 12))

rows, exact, off1, hard = z.run(live)
print(f"ZAI-D1 baseline: exact {len(exact)} / off-by-one {len(off1)} / hard {len(hard)}")

below = []
for r in rows:
    src, dst = r['k'].split('>')
    g = 20 * (1 - W[src] / W[dst])
    if r['model'] < tier(g):
        below.append((r['k'], r['own'], r['model'], round(g, 2), tier(g), round(r['raw'], 2)))
print(f"\nZAI-D1 prices below tier(G): {len(below)} rules")
for k, own, mod, g, gt, raw in sorted(below):
    print(f"  {k}: owner {own}, model {mod}, G {g} -> guard tier {gt} (raw {raw})")

fixed, broken = [], []
for r in rows:
    src, dst = r['k'].split('>')
    gt = tier(20 * (1 - W[src] / W[dst]))
    m = max(r['model'], gt)
    if m == r['own'] and r['model'] != r['own']:
        fixed.append((r['k'], r['own'], r['model'], gt))
    if m != r['own'] and r['model'] == r['own']:
        broken.append((r['k'], r['own'], r['model'], gt))
n_exact = sum(1 for r in rows
              if max(r['model'], tier(20 * (1 - W[r['k'].split('>')[0]] / W[r['k'].split('>')[1]]))) == r['own'])
print(f"\nmax(G, L) fit: {n_exact}/99")
print(f"  fixed by guard: {len(fixed)} -> {fixed}")
print(f"  broken by guard: {len(broken)} -> {broken}")

z.HAVE["EDGE"][z.DUTIES.index("CARRY")] = 4
rows2, _, _, _ = z.run(live)
n2 = sum(1 for r in rows2
         if max(r['model'], tier(20 * (1 - W[r['k'].split('>')[0]] / W[r['k'].split('>')[1]]))) == r['own'])
res2 = [r['k'] for r in rows2
        if max(r['model'], tier(20 * (1 - W[r['k'].split('>')[0]] / W[r['k'].split('>')[1]]))) != r['own']]
print(f"\nmax(G, L) + EDGE CARRY 4: exact {n2}/99, residuals: {res2}")
