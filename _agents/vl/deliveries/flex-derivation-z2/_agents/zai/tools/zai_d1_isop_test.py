#!/usr/bin/env python3
# zai_d1_isop_test.py — Task 2 receipt: can a dedicated ONE-ON-ONE pass-protection
# duty (ISOP) capture C>OT = 12 naturally?
# Mechanism: split PBLK into team-scheme protection (PBLK stays) and isolated
# one-on-one protection (ISOP, weight 1.5). OT/OG/C jobs NEED ISOP at 10/9/3;
# bodies carry ISOP by length/leverage/recovery tools. Run the full live table.
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import zai_flex_derive as z

LIVE = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "flex.json")))["flex"]

# extend the duty set
z.DUTIES.append("ISOP")
z.W["ISOP"] = 1.5
for r in z.HAVE: z.HAVE[r].append(0)
ISO_HAVE = {"QB":1,"RB":2,"FB":3,"WR":1,"TE":3,"OT":10,"OG":9,"C":4,
            "DT":2,"EDGE":2,"ILB":1,"OLB":1,"SS":0,"FS":0,"CB":0,"K":0,"P":0}
for r, v in ISO_HAVE.items(): z.HAVE[r][z.DUTIES.index("ISOP")] = v
for r in z.NEED: z.NEED[r].pop("ISOP", None)
z.NEED["OT"]["ISOP"] = 10
z.NEED["OG"]["ISOP"] = 9
z.NEED["C"]["ISOP"] = 3

# apply the Owner's other two changes (the ISOP test is run on top of the V4 world,
# C PBLK stays 9 — the whole point is that ISOP replaces the need to deflate it)
CI = z.DUTIES.index("CARRY")
z.HAVE["EDGE"][CI] = 4
z.HAVE["TE"][0] = 4
z.NEED["C"]["PBLK"] = 8  # unchanged — with ISOP carved out, 9 stays honest for team protection

bad = z.check_self()
rows, exact, off1, hard = z.run(LIVE)
terr = sum(abs(z.TIERS.index(r["own"]) - z.TIERS.index(r["model"])) for r in rows)
by = {r["k"]: r for r in rows}
print(f"ISOP test: exact {len(exact)} / off-by-one {len(off1)} / hard {len(hard)} / tier-error {terr}")
print(f"self-doable: {'OK' if not bad else 'VIOLATED ' + str(bad)}")
print("the four feedback rows:")
for k in ("C>OG","C>OT","EDGE>RB","TE>OT"):
    r = by[k]
    print(f"  {k}: owner {r['own']} -> model {r['model']}  raw {r['raw']:.2f}  (M {r['M']:.2f} on {r['top']}, S {r['S']:.2f})")
print("rows broken or moved by ISOP vs V4 (owner -> model):")
for r in sorted(rows, key=lambda r: r["k"]):
    step = abs(z.TIERS.index(r["own"]) - z.TIERS.index(r["model"]))
    if step > 0:
        print(f"  {r['k']}: owner {r['own']} -> model {r['model']}  raw {r['raw']:.2f} (M {r['M']:.2f} on {r['top']})")
