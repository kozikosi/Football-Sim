#!/usr/bin/env python3
"""Weight-source investigation (council follow-up prompt, option C).

Question: C 200 vs 150, OLB 200 vs 150 — which weight source is correct,
and what is the impact on the guard (and therefore on the merged form)?

Three weight sources (role-level, top slot per role):
  (1) sport-football.json (Claude's flexgates/flexunify tooling): C 200, OLB 200.
  (2) slots.ts (the engine, input weights): C 150, OLB 150.
  (3) localWins20 (engine-measured, P-321): C 0.3752, OLB 0.3950.

For every cross-role pair in the live 99-rule table, compute the guard
G = 20*(1 - w_src/w_dst) under each source and its tier (cuts 1/4/9).
Report every row whose guard tier differs between sources, and the
merged-form exact count under each source (ability = ZAI-D1 V4, raw = max(A,G)).

Also verify the measured-weight ratios against the two input sources:
does localWins20 look like C 150 or C 200 (ratio to OG), OLB 150 or 200 (ratio to ILB)?
"""
import json

CUTS = [1, 4, 9]
def tier_of(x):
    return 0 if x < 1 else (2 if x < 4 else (6 if x < 9 else 12))

# (1) sport-football.json weights (read from the file)
SF = {"QB": 1000, "WR": 650, "OT": 500, "OG": 400, "C": 200, "TE": 250,
      "RB": 250, "FB": 25, "EDGE": 650, "DT": 500, "ILB": 300, "OLB": 200,
      "CB": 400, "NICKEL": 100, "DIME": 50, "FS": 300, "SS": 300, "K": 50, "P": 50}
# (2) slots.ts input weights (top slot per role, from the engine)
SLOTS = {"QB": 1000, "WR": 650, "OT": 500, "OG": 400, "C": 150, "TE": 250,
         "RB": 250, "FB": 25, "EDGE": 650, "DT": 500, "ILB": 300, "OLB": 150,
         "CB": 400, "NICKEL": 100, "DIME": 50, "FS": 300, "SS": 300, "K": 50, "P": 50}
# (3) localWins20 measured weights
MEAS = {"QB": 2.4706, "RB": 0.6126, "FB": 0.0626, "WR": 1.6071,
        "TE": 0.6181, "OT": 1.2497, "OG": 1.0001, "C": 0.3752,
        "DT": 1.3158, "EDGE": 1.7097, "ILB": 0.7934, "OLB": 0.3950,
        "SS": 0.7887, "FS": 0.7893, "CB": 1.0557, "K": 0.1271,
        "P": 0.1182, "NICKEL": 0.2610, "DIME": 0.1310}

def guard(src, dst, w):
    return max(0.0, 20.0 * (1.0 - w[src] / w[dst]))

live = json.load(open("/tmp/weights/tools/mathlab/flex.json"))["flex"]
pairs = [(s, d, own) for s in live for d, own in live[s].items() if s != d]
print(f"cross-role pairs: {len(pairs)}")

# 1. Ratio check: does measured look like 150 or 200?
print("\n=== Ratio check (measured localWins20 vs the two input sources) ===")
print(f"  C/OG: measured {MEAS['C']/MEAS['OG']:.3f} | slots.ts (150/400) {SLOTS['C']/SLOTS['OG']:.3f} | sport-football (200/400) {SF['C']/SF['OG']:.3f}")
print(f"  OLB/ILB: measured {MEAS['OLB']/MEAS['ILB']:.3f} | slots.ts (150/300) {SLOTS['OLB']/SLOTS['ILB']:.3f} | sport-football (200/300) {SF['OLB']/SF['ILB']:.3f}")
print(f"  C/OT: measured {MEAS['C']/MEAS['OT']:.3f} | slots.ts (150/500) {SLOTS['C']/SLOTS['OT']:.3f} | sport-football (200/500) {SF['C']/SF['OT']:.3f}")
print(f"  OLB/SS: measured {MEAS['OLB']/MEAS['SS']:.3f} | slots.ts (150/300) {SLOTS['OLB']/SLOTS['SS']:.3f} | sport-football (200/300) {SF['OLB']/SF['SS']:.3f}")

# 2. Guard tier differences between sources.
print("\n=== Guard tier differences between weight sources ===")
diffs = []
for (s, d, own) in pairs:
    g_sf, g_sl, g_me = guard(s, d, SF), guard(s, d, SLOTS), guard(s, d, MEAS)
    t_sf, t_sl, t_me = tier_of(g_sf), tier_of(g_sl), tier_of(g_me)
    if not (t_sf == t_sl == t_me):
        diffs.append((f"{s}>{d}", own, g_sf, t_sf, g_sl, t_sl, g_me, t_me))
print(f"  rows where the guard tier differs between sources: {len(diffs)}")
for (k, own, g_sf, t_sf, g_sl, t_sl, g_me, t_me) in diffs:
    print(f"  {k}: owner {own} | sport-football G {g_sf:.2f} -> tier {t_sf} | slots.ts G {g_sl:.2f} -> tier {t_sl} | measured G {g_me:.2f} -> tier {t_me}")
# Rows where the guard VALUE differs but the tier is the same (for completeness).
valdiffs = []
for (s, d, own) in pairs:
    g_sf, g_sl = guard(s, d, SF), guard(s, d, SLOTS)
    if abs(g_sf - g_sl) > 0.01 and tier_of(g_sf) == tier_of(g_sl):
        valdiffs.append((f"{s}>{d}", own, g_sf, g_sl))
print(f"  rows where the guard value differs but the tier is the same: {len(valdiffs)}")
for (k, own, g_sf, g_sl) in valdiffs:
    print(f"  {k}: owner {own} | sport-football G {g_sf:.2f} | slots.ts G {g_sl:.2f} (same tier {tier_of(g_sf)})")

# 3. Which rows involve C or OLB as source (the two disputed weights)?
print("\n=== All rows with C or OLB as source (guard under each source) ===")
for (s, d, own) in pairs:
    if s in ("C", "OLB"):
        g_sf, g_sl, g_me = guard(s, d, SF), guard(s, d, SLOTS), guard(s, d, MEAS)
        print(f"  {s}>{d}: owner {own} | sport-football G {g_sf:.2f} (tier {tier_of(g_sf)}) | slots.ts G {g_sl:.2f} (tier {tier_of(g_sl)}) | measured G {g_me:.2f} (tier {tier_of(g_me)})")
