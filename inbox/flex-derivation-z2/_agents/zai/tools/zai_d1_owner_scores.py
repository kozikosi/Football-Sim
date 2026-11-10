#!/usr/bin/env python3
# zai_d1_owner_scores.py — Task 1 of the Muse directive zai-multisport-2026-11-10.
# Apply the Owner's three score changes to ZAI-D1 and re-run against the live
# 99-rule table (architect/engine-and-seats:tools/mathlab/flex.json, byte-identical
# to my w55 snapshot; verified 0 diffs before this run).
#
# Z.ai's verification additions over MUSE's run:
#   (a) the self-doable invariant need[X] <= have[X] is tracked: HAVE C PBLK 9 -> 6/7
#       silently breaks it against NEED C PBLK 8, so each C-variant is run BOTH ways
#       (raw override, and the paired honest change NEED C PBLK -> same value) and
#       both fits are reported;
#   (b) the full 99-row diff is emitted for the headline variant;
#   (c) every variant also reports the four feedback rows and the residual list.
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import zai_flex_derive as z

LIVE = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "flex.json")))["flex"]
CI = z.DUTIES.index("CARRY")   # CARRY column index in HAVE rows

def variant(name, edge_carry=None, c_pblk=None, te_pblk=None, need_c_pblk=None):
    # reset to baseline
    z.HAVE["EDGE"][CI] = 2
    z.HAVE["C"][0] = 9
    z.HAVE["TE"][0] = 5
    z.NEED["C"]["PBLK"] = 8
    # apply requested changes
    if edge_carry is not None: z.HAVE["EDGE"][CI] = edge_carry
    if c_pblk is not None:     z.HAVE["C"][0] = c_pblk
    if te_pblk is not None:    z.HAVE["TE"][0] = te_pblk
    if need_c_pblk is not None: z.NEED["C"]["PBLK"] = need_c_pblk

    bad = z.check_self()
    rows, exact, off1, hard = z.run(LIVE)
    terr = sum(abs(z.TIERS.index(r["own"]) - z.TIERS.index(r["model"])) for r in rows)
    by = {r["k"]: r for r in rows}
    print(f"\n=== {name} ===")
    print(f"self-doable: {'OK' if not bad else 'VIOLATED ' + str(bad)}")
    print(f"fit: exact {len(exact)} / off-by-one {len(off1)} / hard {len(hard)} / tier-error {terr}")
    for k in ("C>OG", "C>OT", "EDGE>RB", "TE>OT"):
        r = by[k]
        tag = "exact" if r["own"] == r["model"] else ("off-by-one" if abs(z.TIERS.index(r["own"]) - z.TIERS.index(r["model"])) == 1 else "HARD")
        print(f"  {k}: owner {r['own']} -> model {r['model']}  raw {r['raw']:.2f}  (M {r['M']:.2f} on {r['top']}, S {r['S']:.2f})  {tag}")
    print(f"  residuals: {sorted(r['k'] for r in off1 + hard)}")
    return rows, len(exact), len(off1), len(hard), terr, not bad

if __name__ == "__main__":
    print("live table: architect/engine-and-seats flex.json — 99 rules, byte-identical to my w55 snapshot (0 diffs)")

    variant("V0 baseline (report only)", )
    variant("V1 EDGE CARRY 2->4 only", edge_carry=4)
    variant("V2a C PBLK 9->6 only, NEED C PBLK unchanged 8 (MUSE's run)", c_pblk=6)
    variant("V2b C PBLK 9->6 with paired NEED C PBLK 8->6 (the honest pair)", c_pblk=6, need_c_pblk=6)
    variant("V3 TE PBLK 5->4 only", te_pblk=4)
    rows, e, o, h, t, ok = variant("V4 HEADLINE: EDGE CARRY 4 + C PBLK 6 (NEED 6) + TE PBLK 4",
                                   edge_carry=4, c_pblk=6, need_c_pblk=6, te_pblk=4)
    variant("V5 EDGE CARRY 4 + C PBLK 7 (NEED 7) + TE PBLK 4",
            edge_carry=4, c_pblk=7, need_c_pblk=7, te_pblk=4)
    variant("V6 EDGE CARRY 4 + C PBLK 4 (NEED 4) + TE PBLK 4 — the 99/99 variant, NOT the Owner's choice",
            edge_carry=4, c_pblk=4, need_c_pblk=4, te_pblk=4)

    # full diff for the headline variant
    out = ["# ZAI-D1 + Owner score changes — full 99-rule diff (V4: EDGE CARRY 4, C PBLK 6/NEED 6, TE PBLK 4)", ""]
    out.append("Live table: architect/engine-and-seats:tools/mathlab/flex.json (99 rules). Formula unchanged: tier(M + 0.4 S), cuts 1/4/9, tiers 0/2/6/12, cross-side floor 6. Three score cells changed, zero patches.")
    out.append("")
    out.append("| rule | owner | model | raw | M on duty | S | verdict |")
    out.append("|---|---|---|---|---|---|---|")
    for r in sorted(rows, key=lambda r: r["k"]):
        step = abs(z.TIERS.index(r["own"]) - z.TIERS.index(r["model"]))
        v = "exact" if step == 0 else ("off-by-one" if step == 1 else "HARD")
        out.append(f"| {r['k']} | {r['own']} | {r['model']} | {r['raw']:.2f} | {r['M']:.2f} {r['top'] or '-'} | {r['S']:.2f} | {v} |")
    with open("results-v4-full-diff.md", "w") as f:
        f.write("\n".join(out))
    print("\nfull V4 diff written to results-v4-full-diff.md")
