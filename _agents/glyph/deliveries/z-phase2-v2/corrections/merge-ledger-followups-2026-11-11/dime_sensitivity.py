#!/usr/bin/env python3
"""DIME SENSITIVITY — Ledger follow-up B1 (Z.ai, seat ZAI, 2026-11-11).

Question (MUSE prompt): Phase 1 stages the DIME spot at 0.0694 play-share vs the
engine's DIME_W 0.15 (-8.06 points). Investigate: (a) how much would the dime share
move if the package tables changed — what dime share would the tables need to
produce 0.15? (b) the mapping question: is DIME_W a rating weight or a snap share —
can a 15% rating blend ever be a 15% snap share?

Method: the staged dime share is a closed-form function of the three INFERRED
package tables and the heavy-package suppression, over the MEASURED situation mix
(the walk's own bucket tallies, from stage_followup.py --sit on the Phase 1 engine
games). No re-tuning of anything — arithmetic only.

Engine fact for (b), REPORTED from matchup.ts (architect/engine-and-seats, line 51):

    out.coverage = (1 - DIME_W) * out.coverage + DIME_W * D.covDime;
    // dime: a fixed passing-down share of coverage, not a plan option

DIME_W = 0.15 blends the covDime UNIT RATING into the coverage rating on EVERY
down, unconditionally. It is a rating weight, not a snap share, in three ways:
it fires on every play (not passing downs only); it blends ratings (not personnel);
and the personnel that is actually on the field is decided by the package tables
(base/nickel/dime), which are a different mechanism entirely.

Usage: python3 dime_sensitivity.py <followup_sit.json>
"""
import json, sys

TABLES = {"early": (0.42, 0.55, 0.03), "third": (0.26, 0.62, 0.12), "long": (0.12, 0.55, 0.33)}

def p_dime(sit, tables, heavy):
    wb, wn, wd = tables[sit]
    if heavy:
        return 0.5 * wd / (wb + 0.15 + wn + 0.5 * wd)
    return wd / (wb + wn + wd)

def overall(mix, tables=None):
    tables = tables or TABLES
    tot = 0.0
    for sit in ("early", "third", "long"):
        f = mix["freq"][sit]
        h = mix["heavy"][sit]
        tot += f * ((1 - h) * p_dime(sit, tables, False) + h * p_dime(sit, tables, True))
    return tot

def main():
    sit = json.load(open(sys.argv[1]))["cells"]["even80"]["sit_mix"]
    mix = {
        "freq": {"early": sit["early"], "third": sit["third"], "long": sit["long"]},
        "heavy": {s: sit[f"heavy_{s}"] / sit[s] for s in ("early", "third", "long")},
    }
    print("measured situation mix (Ledger Phase 1 engine games, even80-class walk):")
    for s in ("early", "third", "long"):
        print(f"  {s:>5}: freq {mix['freq'][s]:.4f}  P(heavy pkg 13/21/22 | sit) {mix['heavy'][s]:.4f}")
    base = overall(mix)
    print(f"\nclosed-form dime share with the INFERRED tables as shipped: {base:.4f}  "
          f"(the staged walk measured 0.0694-0.0695 — agreement)")

    print("\n-- (a) sensitivities --")
    print("per-bucket: dime share if ONLY that bucket's dime weight scaled to k (other buckets fixed):")
    for s in ("early", "third", "long"):
        f, h = mix["freq"][s], mix["heavy"][s]
        # contribution of this bucket
        contrib = f * ((1 - h) * p_dime(s, TABLES, False) + h * p_dime(s, TABLES, True))
        print(f"  {s:>5}: bucket contributes {contrib:.4f} of the {base:.4f} "
              f"(freq {f:.3f}, P(dime|sit) {(contrib/f):.4f})")
    print("\nscale k on ALL three dime weights (bisection) -> what k yields 0.15:")
    lo, hi = 1.0, 200.0
    for _ in range(80):
        mid = (lo + hi) / 2
        t = {s: (TABLES[s][0], TABLES[s][1], TABLES[s][2] * mid) for s in TABLES}
        if overall(mix, t) < 0.15: lo = mid
        else: hi = mid
    k = (lo + hi) / 2
    t = {s: (TABLES[s][0], TABLES[s][1], TABLES[s][2] * k) for s in TABLES}
    print(f"  uniform k = {k:.1f}x  (dime weights -> early {TABLES['early'][2]*k:.2f}, "
          f"third {TABLES['third'][2]*k:.2f}, long {TABLES['long'][2]*k:.2f})  check {overall(mix, t):.4f}")
    print("  (the dime weight is a RELATIVE weight: scaling it crowds out base/nickel —")
    print("   a k this large means the tables are not 'under-using' dime, they are a different shape)")
    print("\nsuppression OFF (heavy packages no longer halve dime):")
    t_off = TABLES
    tot_off = sum(mix["freq"][s] * p_dime(s, t_off, False) for s in TABLES)
    print(f"  dime share {tot_off:.4f} (vs {base:.4f}) — worth +{100*(tot_off-base):.2f} points; NOT the gap")
    print("\nper-bucket single moves that each reach 0.15 alone:")
    for s in ("early", "third", "long"):
        others = sum(mix["freq"][u] * ((1 - mix["heavy"][u]) * p_dime(u, TABLES, False)
                                       + mix["heavy"][u] * p_dime(u, TABLES, True))
                     for u in TABLES if u != s)
        ceiling = others + mix["freq"][s] * ((1 - mix["heavy"][s]) * 1.0 + mix["heavy"][s] * 0.5)
        if ceiling < 0.15:
            print(f"  {s:>5}: IMPOSSIBLE alone — even at P(dime|{s})=1 the overall share caps at "
                  f"{ceiling:.4f} (the bucket is only {mix['freq'][s]:.1%} of plays)")
            continue
        lo, hi = TABLES[s][2], 5000.0
        for _ in range(80):
            mid = (lo + hi) / 2
            t = {u: TABLES[u] for u in TABLES}
            t[s] = (TABLES[s][0], TABLES[s][1], mid)
            if overall(mix, t) < 0.15: lo = mid
            else: hi = mid
        print(f"  {s:>5}: dime weight would need {lo:.1f} (now {TABLES[s][2]}) — {lo/TABLES[s][2]:.0f}x")
    print("\nthe ceiling: even with dime weight -> infinity, P(dime|sit) saturates at")
    for s in ("early", "third", "long"):
        f, h = mix["freq"][s], mix["heavy"][s]
        cap = f * ((1 - h) * 1.0 + h * (0.5 * 1.0 / (0.5 * 1.0)))
        print(f"  {s:>5}: unsuppressed cap 1.0, suppressed cap 0.5 -> overall ceiling "
              f"{sum(mix['freq'][s] * ((1 - mix['heavy'][s]) * 1.0 + mix['heavy'][s] * 0.5) for s in TABLES):.4f}")

    print("\n-- (b) the mapping answer --")
    print("DIME_W = 0.15 is a RATING WEIGHT: matchup.ts line 51 blends the covDime unit")
    print("rating into coverage on EVERY down (comment: 'a fixed passing-down share of")
    print("coverage, not a plan option'). A rating weight becomes a snap share only if")
    print("(i) dime personnel were on the field 15% of snaps AND (ii) the blend fired only")
    print("when they were AND (iii) the package tables agreed. (i) is the Phase 2 question;")
    print("(ii) is false in the engine today (the blend is unconditional); (iii) is the")
    print("INFERRED tables' 0.0694. The 8-point gap is a CATEGORY difference, not a tuning")
    print("residue: the tables put dime on the field on long passing downs (~11% of plays,")
    print("P(dime|long) 0.24-0.36); DIME_W assumes a flat 15% rating share on every play,")
    print("run downs included. What would settle it: (1) real dime snap share 2023-25")
    print("(Phase 2 data request item 1/2); (2) if the Owner wants DIME_W to carry a snap")
    print("share, re-derive it as the situation-weighted blend the engine already implies:")
    print(f"    DIME_W_eff = sum_sit freq x P(dime|sit) = {base:.4f} on the staged tables")
    print("  — i.e. make the blend conditional on the package, or make the package tables")
    print("  the measured input and retire the flat constant. No file was edited.")

if __name__ == "__main__":
    main()
