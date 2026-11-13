#!/usr/bin/env python3
"""D.5 — the frontier attempts (2026-11-13 wave).

The comprehensive prompt D.5: "Is there a formula that beats both operating
points on both metrics?" (>=96/97 exact AND mae <= 1.10). The family-grid, the
blend, and the recompression are already killed on the record. This script runs
the two shapes that were NOT on the killed list and are reachable with the same
frozen machinery:

  A1 — guard-collapse variants: V3min collapses a slot's per-slot guards with
       min; try mean and max (a different way to collapse per-slot guards).
  A2 — display-law offset: keep raws and tiers exactly as V3/V2 produce them,
       but move the tier-boundary ruler by a constant delta (display law change,
       not a formula change). delta grid from -1.5 to +1.5 step 0.25.

Both are honest attempts: if nothing beats both operating points, the frontier
holds and the attempts are the result.

Deterministic. Reuses the shipped P-345 machinery unmodified.

Usage: python3 d5_frontier_attempts.py <lambda-sub-dir> <out-json>
"""
import json, os, sys

SUB = sys.argv[1] if len(sys.argv) > 1 else "/home/z/my-project/lambda-sub"
OUT = sys.argv[2] if len(sys.argv) > 2 else "/home/z/my-project/work/fwtest-7/results/d5-frontier-attempts.json"

old_argv = sys.argv[:]
sys.argv = ["x", os.path.join(SUB, "inputs"), os.path.join(SUB, "results", "_import_tmp.json")]
import importlib.util
spec = importlib.util.spec_from_file_location(
    "db", os.path.join(SUB, "zai_p345_draftboard_and_thirdway.py"))
db = importlib.util.module_from_spec(spec)
spec.loader.exec_module(db)
sys.argv = old_argv

MP = db.MP
db.set_e(db.E_STAGED)
TIERS = MP.TIERS


def score(form, lam, collapse=None, delta=0.0):
    """Whole-table score under an optional collapse rule and/or ruler offset."""
    errs, ex = [], 0
    for s, d, o in db.pairs97:
        if form == "perslot" and collapse is not None:
            if collapse == "mean":
                # mean collapse = mean of the per-slot guard list, E-role-scaled
                # exactly as raw_price_perslot scales gmin/gmax
                _, _, per = MP.slot_guard(s, d)
                g = (sum(g for _, g in per) / len(per)) * MP.E_ROLE.get(s, 1.0)
                m, sc = MP.ability_ms(s, d)
                a = m + lam * sc
                rr = max(a, g)
            else:
                rr = MP.raw_price_perslot(s, d, lam, collapse)[0]
        else:
            rr = db.raw_of(s, d, form, lam)
        # ruler offset: shift the raw by delta, boundaries fixed (same tiers)
        t = MP.tier_of(rr + delta)
        errs.append(abs(rr - o))
        ex += t == o
    mae = sum(errs) / len(errs)
    return {"exact": ex, "mae": round(mae, 3)}


def main():
    out = {"reference": {}, "A1_guard_collapse": [], "A2_display_offset": []}

    # reference operating points (on the record; re-confirmed here)
    for form, lam, tag in (("merged_exp", 0.40, "V2@0.40"), ("perslot", 0.40, "V3min@0.40"),
                           ("merged_exp", 0.20, "V2@0.20")):
        out["reference"][tag] = score(form, lam)
    print("reference:", json.dumps(out["reference"], sort_keys=True))

    # A1 — collapse rule ablation at the per-slot form
    for collapse in ("min", "mean", "max"):
        for lam in (0.20, 0.40):
            r = {"collapse": collapse, "lam": lam, **score("perslot", lam, collapse=collapse)}
            out["A1_guard_collapse"].append(r)
            print("A1", r)
    # also the exact-refit lambda per collapse rule
    for collapse in ("min", "mean", "max"):
        best = None
        for lam in db.LAM_GRID:
            s = score("perslot", lam, collapse=collapse)
            key = (-s["exact"], s["mae"])
            if best is None or key < best[0]:
                best = (key, lam, s)
        r = {"collapse": collapse, "lam": best[1], "refit": "exact", **best[2]}
        out["A1_guard_collapse"].append(r)
        print("A1 refit-exact", r)

    # A2 — display-law ruler offset at the two reference forms
    d = -1.5
    while d <= 1.5001:
        for form, lam, tag in (("merged_exp", 0.40, "V2@0.40"), ("perslot", 0.40, "V3min@0.40"),
                               ("merged_exp", 0.20, "V2@0.20")):
            r = {"form_tag": tag, "delta": round(d, 2), **score(form, lam, delta=d)}
            out["A2_display_offset"].append(r)
        d += 0.25
    for r in out["A2_display_offset"]:
        if r["delta"] in (-0.5, -0.25, 0.0, 0.25, 0.5):
            print("A2", r)

    best_exact = max(out["A1_guard_collapse"] + out["A2_display_offset"],
                     key=lambda r: (r["exact"], -r["mae"]))
    out["best_any_attempt"] = best_exact
    out["beats_both"] = bool(best_exact["exact"] >= 96 and best_exact["mae"] <= 1.10)
    print("best attempt:", json.dumps(best_exact, sort_keys=True),
          "| beats_both:", out["beats_both"])

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        json.dump(out, f, indent=1, sort_keys=True)
        f.write("\n")

if __name__ == "__main__":
    main()
