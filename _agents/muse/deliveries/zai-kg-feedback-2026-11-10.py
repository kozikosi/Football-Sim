#!/usr/bin/env python3
"""Test KG's feedback on ZAI-D1 (MUSE, 2026-11-10).

KG's points (verbatim in _agents/owner-notes/2026-11-10-zai-pblk-edge-te-feedback-verbatim.txt):
1. C>OT (and C>OG): the center is shorter and worse in one-on-one pass
   protection, and that pass protection is worth an extra $10M/year.
   "Can we just turn up the pass protection value?"
   -> Vary the PBLK weight (base 1.55) and watch C>OT, C>OG, TE>OT.
2. EDGE>RB (owner 6, model 12): edges are usually the best athletes on the
   field; 6 is more accurate. "You will have to find a way to fix this
   naturally." -> Vary EDGE's CARRY (base 2) — athletes carry the ball
   better than the model credits — and watch EDGE>RB.
3. TE>OT (owner 12, model 6): OTs are that superior in one-on-one pass
   protection and face the opponent's best athletes, so OT pass protection
   must be more heavily prioritized. -> Same PBLK-weight experiment as (1).

Method: import Z.ai's script as a module, override W["PBLK"] and
HAVE["EDGE"][CARRY], re-run run() against the live flex.json (97d7e9d).
Report the fit and the four rows of interest for each variant.
"""
import json, sys
sys.path.insert(0, '/tmp/zai-d1-verify')
import zai_flex_derive as z

live = json.load(open('/tmp/zai-d1-verify/flex.json'))['flex']
CARRY_I = z.DUTIES.index('CARRY')

def show(name):
    rows, exact, off1, hard = z.run(live)
    tier_err = sum(abs(z.TIERS.index(r['own']) - z.TIERS.index(r['model'])) for r in rows)
    by_key = {r['k']: r for r in rows}
    print(f"\n{name}: exact {len(exact)} / off-by-one {len(off1)} / hard {len(hard)} / tier-error {tier_err}")
    for k in ('C>OT', 'C>OG', 'TE>OT', 'EDGE>RB'):
        r = by_key[k]
        print(f"  {k}: owner {r['own']}, model {r['model']}, raw {r['raw']:.2f} (M {r['M']:.2f} {r['top']}, S {r['S']:.2f})")
    print(f"  residuals: {sorted([r['k'] for r in off1 + hard])}")
    return len(exact), len(off1), len(hard)

print("=== Baseline (PBLK 1.55, EDGE CARRY 2) ===")
show("BASELINE")

print("\n=== (1)+(3) Vary PBLK weight ===")
for w in (2.0, 2.5, 3.0):
    z.W["PBLK"] = w
    show(f"PBLK {w}")

print("\n=== (2) Vary EDGE CARRY (PBLK back to 1.55) ===")
z.W["PBLK"] = 1.55
for c in (4, 5, 6):
    z.HAVE["EDGE"][CARRY_I] = c
    show(f"EDGE CARRY {c}")

print("\n=== Combined: best PBLK + best EDGE CARRY ===")
# (filled in after seeing the single-variable results)
