#!/usr/bin/env python3
"""B.4 — the LOO direction analysis (form x refit-rule x direction, with rows).

MUSE's "what would change my mind #1": on the held-out LOO folds, are the misses
UNDER-priced (too cheap — the exploit direction) or OVER-priced (too dear — the
safe direction)? Per form (V2 merged_exp, V3min perslot, V0 zai for reference)
and per refit rule (mae, exact), with counts and the row list.

Direction is judged on the DISPLAY layer (the tier the user sees): the model's
held-out displayed tier below the Owner's tier = under-priced; above = over-priced.

Deterministic; reuses the shipped P-345 machinery (zai_p345_draftboard_and_thirdway.py
+ formula/merge_prototype.py, both unmodified). No RNG, no network.

Usage: python3 b4_loo_direction.py <lambda-sub-dir> <out-json>
"""
import json, os, sys

SUB = sys.argv[1] if len(sys.argv) > 1 else "/home/z/my-project/lambda-sub"
OUT = sys.argv[2] if len(sys.argv) > 2 else "/home/z/my-project/work/fwtest-7/results/b4-loo-direction.json"

# load the delivered machinery unmodified (it reads argv[1]/argv[2] itself at import)
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


def loo_direction(form, rule):
    roles = sorted({s for s, d, o in db.pairs97} | {d for s, d, o in db.pairs97})
    under, over, exact = [], [], []
    for r in roles:
        held = [(s, d, o) for (s, d, o) in db.pairs97 if s == r or d == r]
        train = [(s, d, o) for (s, d, o) in db.pairs97 if s != r and d != r]
        fit = db.fit_fold(train, form, rule)
        for s, d, o in held:
            rr = db.raw_of(s, d, form, fit["lam"])
            t = MP.tier_of(rr)
            rec = {"row": f"{s}>{d}", "fold": r, "lam_fold": fit["lam"],
                   "raw": round(rr, 3), "tier": t, "owner": o,
                   "display_gap": t - o}
            if t == o:
                exact.append(rec)
            elif t < o:
                under.append(rec)
            else:
                over.append(rec)
    return {"form": form, "rule": rule,
            "n_cases": len(under) + len(over) + len(exact),
            "exact": len(exact), "under_priced": len(under), "over_priced": len(over),
            "under_rows": sorted({u["row"] for u in under}),
            "over_rows": sorted({u["row"] for u in over}),
            "under_detail": under, "over_detail": over}


def main():
    out = {}
    for form, tag in (("zai", "V0"), ("merged_exp", "V2"), ("perslot", "V3min")):
        for rule in ("mae", "exact"):
            key = f"{tag}_{rule}_refit"
            out[key] = loo_direction(form, rule)
            r = out[key]
            print(f"{key}: n={r['n_cases']} exact={r['exact']} "
                  f"under={r['under_priced']} over={r['over_priced']}")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        json.dump(out, f, indent=1, sort_keys=True)
        f.write("\n")
    # summary table
    print("\nform x rule x direction (display-layer tier, held-out cases):")
    print(f"{'key':<18}{'n':>5}{'exact':>7}{'under':>7}{'over':>6}")
    for k, r in sorted(out.items()):
        print(f"{k:<18}{r['n_cases']:>5}{r['exact']:>7}{r['under_priced']:>7}{r['over_priced']:>6}")

if __name__ == "__main__":
    main()
