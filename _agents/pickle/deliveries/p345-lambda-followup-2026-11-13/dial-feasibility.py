#!/usr/bin/env python3
"""dial-feasibility: is lambda one number, and how far can it float?

Reads Z.ai's shipped prototype and the live 99-rule table (read-only, from a git
archive of origin/council/vl). For every cross-role row it recovers the two terms
the formula actually has

    raw(lam) = max( m + lam * s , E * guard )          (merged_exp, V2)
    tier(x)  = 0 if x<1 else 2 if x<4 else 6 if x<9 else 12

then answers four questions exactly (no fitting, no sampling):

  1. tolerance: for each row, the distance from raw(0.40) to its nearest tier cut,
     and the delta-lambda that would cross that cut.  This is how much the dial
     may float before that row's displayed number changes.
  2. feasible set: the interval of lambda for which a row reproduces the Owner's
     tier.  Intersecting all 97 answers "can one number reproduce the table".
  3. minimum dial count: interval stabbing over the feasible sets == the smallest
     number of lambda values the table demands.
  4. robust address: for a fluctuating dial (lam0 +/- delta), the maximin choice
     -- the address whose worst case inside the band loses the fewest rows.

Usage: python3 dial-feasibility.py <merge_prototype.py> <flex-99-live.json>
"""
import json
import sys
import importlib.util

proto_path, live_path = sys.argv[1], sys.argv[2]
spec = importlib.util.spec_from_file_location("mp", proto_path)
mp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mp)

live = json.load(open(live_path))["flex"]
pairs97 = [(s, d, o) for s, ds in live.items() for d, o in ds.items() if s != d]

CUTS = [(0.0, 1.0), (1.0, 4.0), (4.0, 9.0), (9.0, float("inf"))]
TIERS = [0, 2, 6, 12]
INF = float("inf")


def bounds_for(tier):
    return CUTS[TIERS.index(tier)]


def feasible(m, s, cap, tier):
    """Exact lambda interval in [0,1] with tier(max(m+lam*s, cap)) == tier.

    raw is monotone non-decreasing in lam (line max a constant), so the preimage
    of the half-open tier interval [lo,hi) is an interval:
        upper:  max(a,cap) < hi  <=>  a < hi  and  cap < hi
        lower:  max(a,cap) >= lo <=>  a >= lo  or   cap >= lo
    """
    lo_t, hi_t = bounds_for(tier)
    if cap >= hi_t:                       # guard alone already overshoots the tier
        return (None, None, "guard-overshoots")
    # upper bound from the ability branch
    if s > 0:
        u = (hi_t - m) / s if hi_t != INF else INF
        l = 0.0 if cap >= lo_t else (lo_t - m) / s
    else:
        u = INF if m < hi_t else -INF
        l = 0.0 if (cap >= lo_t or m >= lo_t) else INF
    lo, hi = max(0.0, l), min(1.0, u)
    if lo >= hi:
        return (None, None, "infeasible")
    return (lo, hi, "guard-covers" if cap >= lo_t else "ability")


rows = []
for src, dst, own in pairs97:
    m, s = mp.ability_ms(src, dst)
    cap = mp.E_ROLE.get(src, 1.0) * mp.guard(src, dst, mp.W_MEAS)
    lo, hi, kind = feasible(m, s, cap, own)
    r02 = max(m + 0.20 * s, cap)
    r04 = max(m + 0.40 * s, cap)
    # distance to nearest cut at the shipped lambda, converted to a delta-lambda
    d_cut = min(abs(r04 - c) for c in (1.0, 4.0, 9.0))
    tol = d_cut / s if (s > 0 and r04 > cap + 1e-12) else INF
    rows.append(dict(k=f"{src}>{dst}", own=own, m=round(m, 3), s=round(s, 3),
                     cap=round(cap, 3), lo=lo, hi=hi, kind=kind,
                     t02=mp.tier_of(r02), t04=mp.tier_of(r04),
                     r02=round(r02, 3), r04=round(r04, 3),
                     d_cut=round(d_cut, 3), tol=tol))

W = 34
print("# dial-feasibility | the Owner's 99 tiers read as exact constraints on lambda")
print(f"# prototype: {proto_path}")
print(f"# table:     {live_path}  ({len(rows)} cross-role rows)")
print("# raw(lam) = max(m + lam*s, E*guard); tier cuts at 1, 4, 9")

print("\n## 1. replication of the 11 disputed rows (independent re-derivation)")
print("   row          owner   raw@0.20 -> tier   raw@0.40 -> tier")
for r in rows:
    if r["t02"] != r["t04"] or r["k"] == "C>OG":
        print(f"   {r['k']:<12} {r['own']:>5}   {r['r02']:>7.2f} -> {r['t02']:>2}        "
              f"{r['r04']:>7.2f} -> {r['t04']:>2}")

mean02 = sum(r["r02"] for r in rows) / len(rows)
mean04 = sum(r["r04"] for r in rows) / len(rows)
print(f"\n   mean raw over the 97 rows: {mean02:.3f} @0.20, {mean04:.3f} @0.40 "
      f"({100 * (mean04 - mean02) / mean04:.1f}% lower at 0.20)")

infeas = [r for r in rows if r["kind"] == "infeasible"]
gos = [r for r in rows if r["kind"] == "guard-overshoots"]
print(f"\n## 2. rows no lambda in [0,1] can satisfy: {len(infeas) + len(gos)}")
for r in infeas + gos:
    print(f"   {r['k']:<12} owner {r['own']:>2}  m {r['m']:>6.2f}  s {r['s']:>5.2f}  "
          f"cap {r['cap']:>6.2f}  ({r['kind']})")

ok = [r for r in rows if r["kind"] in ("ability", "guard-covers")]
lo = max(r["lo"] for r in ok)
hi = min(r["hi"] for r in ok)
print(f"\n## 3. intersection over the other {len(ok)} rows: [{lo:.4f}, {hi:.4f})")
print("   NON-EMPTY: one lambda reproduces every row it is possible to reproduce."
      if lo < hi else "   EMPTY: no single lambda reproduces the table.")

ints = sorted([(r["lo"], r["hi"], r["k"]) for r in ok], key=lambda x: x[1])
stabs = []
for a, b, k in ints:
    if not stabs or a >= stabs[-1]:
        stabs.append(b)
print(f"\n## 4. minimum dial count (interval stabbing over the {len(ok)} rows): {len(stabs)}")
print("   addresses:", ", ".join(f"{x:.3f}" for x in stabs))

print("\n## 5. tolerance: how far lambda may float before the displayed number changes")
print("   (ability-dominated rows only; the tolerance is distance-to-cut / s)")
tolrows = sorted([r for r in rows if r["tol"] != INF], key=lambda r: r["tol"])
for r in tolrows[:12]:
    print(f"   {r['k']:<12} owner {r['own']:>2}  raw@0.40 {r['r04']:>6.3f}  "
          f"nearest cut {r['d_cut']:>5.3f} away  ->  d_lam = {r['tol']:.4f}")
print(f"   ... {len(tolrows)} ability-dominated rows; guard-capped rows are lambda-free "
      f"({len(rows) - len(tolrows)})")
for band in (0.01, 0.02, 0.05, 0.10):
    n = sum(1 for r in tolrows if r["tol"] < band)
    print(f"   d_lam < {band:<4}: {n:>2} row(s) would change their displayed number")

print("\n## 6. the exact-tier surface as lambda moves (V2, role-level)")
print("   lam   exact/97   rows off by >= 2 tiers")
for i in range(0, 21):
    lam = i * 0.05
    ex = sum(1 for r in rows if mp.tier_of(max(r["m"] + lam * r["s"], r["cap"])) == r["own"])
    hard = sum(1 for r in rows
               if abs(mp.tier_of(max(r["m"] + lam * r["s"], r["cap"])) - r["own"]) >= 4)
    print(f"   {lam:<5.2f} {ex:>6}      {hard:>5}")

print("\n## 7. robust address for a fluctuating dial: maximin over lam0 +/- delta")
print("   (worst-case exact count inside the band; a dial that floats must be chosen for its floor)")
for delta in (0.025, 0.05, 0.075, 0.10, 0.15):
    best = None
    lam = 0.0
    while lam <= 1.0 + 1e-9:
        worst = 10 ** 9
        s_lam = max(0.0, lam - delta)
        while s_lam <= min(1.0, lam + delta) + 1e-9:
            ex = sum(1 for r in rows
                     if mp.tier_of(max(r["m"] + s_lam * r["s"], r["cap"])) == r["own"])
            worst = min(worst, ex)
            s_lam += 0.01
        if best is None or worst > best[1] or (worst == best[1] and abs(lam - 0.40) < abs(best[0] - 0.40)):
            best = (lam, worst)
        lam += 0.01
    at40 = min(sum(1 for r in rows
                   if mp.tier_of(max(r["m"] + s * r["s"], r["cap"])) == r["own"])
               for s in [max(0.0, 0.40 - delta) + 0.01 * i
                         for i in range(int(2 * delta / 0.01) + 1)])
    print(f"   band +/-{delta:<5.3f}: maximin lam {best[0]:.2f} floor {best[1]:>2} rows   "
          f"| lam 0.40 floor {at40:>2} rows")
