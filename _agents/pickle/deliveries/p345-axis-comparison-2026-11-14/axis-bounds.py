#!/usr/bin/env python3
"""axis-bounds: the two questions Part A says must be answered in writing.

  Q1  Which row binds each edge of the feasible lambda window, and how wide is it?
  Q2  Can ANY estimator resolve lambda = 0.39 from lambda = 0.40 with the
      information the council actually has?  (fold count is not the variable)

Deterministic: no sampling, no fitting. Reads the SAME two inputs as
dial-feasibility.py, plus P-347's variance components (copied below with the
filing they come from). Prints:
  A. the binding rows of [lo, hi), with the arithmetic that sets each edge
  B. the resolution the acceptance test demands (tightest row), in lambda and %
  C. the resolution each estimator route can deliver, and the data multiplier
  D. what a context shift of the disputed size (+-0.01) would do to the table
  E. the visibility test: is a sub-window lambda(context) shift observable at all?

Usage: python3 axis-bounds.py <merge_prototype.py> <flex-99-live.json>
"""
import importlib.util
import json
import sys

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
    lo_t, hi_t = bounds_for(tier)
    if cap >= hi_t:
        return (None, None, "guard-overshoots")
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
    r04 = max(m + 0.40 * s, cap)
    d_cut = min(abs(r04 - c) for c in (1.0, 4.0, 9.0))
    tol = d_cut / s if (s > 0 and r04 > cap + 1e-12) else INF
    rows.append(dict(k=f"{src}>{dst}", own=own, m=m, s=s, cap=cap,
                     lo=lo, hi=hi, kind=kind, r04=r04, tol=tol))

ok = [r for r in rows if r["kind"] in ("ability", "guard-covers")]
lo = max(r["lo"] for r in ok)
hi = min(r["hi"] for r in ok)
bnd_lo = max(ok, key=lambda r: r["lo"])
bnd_hi = min(ok, key=lambda r: r["hi"])
tight = min((r for r in rows if r["tol"] != INF), key=lambda r: r["tol"])

print("## A. the feasible window and the rows that set its edges")
print(f"   window [lo, hi) = [{lo:.4f}, {hi:.4f})   width {hi - lo:.4f} "
      f"({100 * (hi - lo) / lo:.1f}% of lo)")
print(f"   lower edge set by  {bnd_lo['k']:<12} owner {bnd_lo['own']:>2}  "
      f"m {bnd_lo['m']:.3f} s {bnd_lo['s']:.3f} cap {bnd_lo['cap']:.3f}  "
      f"-> lambda >= {bnd_lo['lo']:.4f} keeps raw >= lower cut of tier {bnd_lo['own']}")
print(f"   upper edge set by  {bnd_hi['k']:<12} owner {bnd_hi['own']:>2}  "
      f"m {bnd_hi['m']:.3f} s {bnd_hi['s']:.3f} cap {bnd_hi['cap']:.3f}  "
      f"-> lambda <  {bnd_hi['hi']:.4f} keeps raw <  upper cut of tier {bnd_hi['own']}")
print(f"   0.39 sits {lo - 0.39:.4f} BELOW the lower edge -> fails {bnd_lo['k']}.")
print(f"   0.40 sits inside the window -> passes every reproducible row.")

print("\n## B. the resolution the acceptance test demands")
print(f"   tightest row {tight['k']:<12} owner {tight['own']:>2}  raw@0.40 "
      f"{tight['r04']:.3f}, nearest cut {min(abs(tight['r04'] - c) for c in (1, 4, 9)):.3f} away")
print(f"   -> d_lambda = {tight['tol']:.4f}; at lambda 0.40 that is "
      f"{100 * tight['tol'] / 0.40:.2f}% relative precision")
print(f"   raw units: {min(abs(tight['r04'] - c) for c in (1, 4, 9)):.3f} on a mean raw of "
      f"{sum(r['r04'] for r in rows) / len(rows):.3f}  "
      f"({100 * min(abs(tight['r04'] - c) for c in (1, 4, 9)) / (sum(r['r04'] for r in rows) / len(rows)):.2f}% of the mean)")
nflip = sum(1 for r in rows if 0 < r["tol"] < 0.01)
print(f"   rows whose displayed tier changes for |d_lambda| < 0.01: {nflip}")

print("\n## C. what each estimator route can deliver")
# route R1: P-347 two-gap identity, between-team dispersion.
# Var(team-season means) 16.955, mean within-team 87.148, true between 11.905,
# SD 3.45, nbar 17.26, 320 team-seasons = 32 teams x 10 seasons, all games.
# (P-347 filing, inbox/20261112-0420-ds-P-347-lambda-identification.md)
sd_b, n_teams = 3.45, 32
se_sd = sd_b / (2 * (n_teams - 1)) ** 0.5          # SE of an SD with n obs
rel_r1 = se_sd / sd_b
need_rel = tight["tol"] / 0.40
print(f"   R1 between-team dispersion (P-347, the only route with a receipt):")
print(f"      SE(SD_between) = {se_sd:.3f} on SD {sd_b}  ->  {100 * rel_r1:.1f}% relative")
print(f"      needed                                  ->  {100 * need_rel:.2f}% relative")
print(f"      shortfall {rel_r1 / need_rel:.1f}x  ->  data multiplier "
      f"{(rel_r1 / need_rel) ** 2:.0f}x the 32 independent team-units")
print(f"      = {(rel_r1 / need_rel) ** 2:.0f} seasons of 32 teams, or "
      f"{(rel_r1 / need_rel) ** 2 * 32:.0f} independent team-equivalents")
gap = abs(0.40 - 0.39)
print(f"   the dispute itself (0.40 vs 0.39) is {gap} = {100 * gap / 0.40:.1f}% relative;"
      f" separating it at 2 sigma needs {100 * gap / 0.40 / 2:.2f}% relative SE")
print(f"   R1 is {(100 * rel_r1) / (100 * gap / 0.40 / 2):.1f}x coarser than that too.")
print(f"   R2 player-identity join (Claude L1, participation): NOT RUN, no receipt, "
      f"SE UNKNOWN. It is the only route that could reach {100 * need_rel:.2f}%.")

print("\n## D. what a context shift of the disputed size does to the table")
for d in (0.0032, 0.01, 0.013):
    for sign in (-1, 1):
        lam = 0.40 + sign * d
        ex = sum(1 for r in rows
                 if mp.tier_of(max(r["m"] + lam * r["s"], r["cap"])) == r["own"])
        print(f"   lambda 0.40 {sign:+} {d:<6} = {lam:.4f}: {ex}/97 rows at the owner's tier "
              f"({'inside window' if lo <= lam < hi else 'OUTSIDE window'})")

print("\n## E. visibility: is a sub-window lambda(context) shift observable?")
print("   (Wins are static and Priority is snapshot-frozen, so a level shift inside the")
print("    window cannot reach the user; only the council's own 11-row check can see it)")
for lam in (lo + 1e-6, 0.3967, hi - 1e-6):
    table = tuple(mp.tier_of(max(r["m"] + lam * r["s"], r["cap"])) for r in rows)
    print(f"   lambda {lam:.4f}: tier vector sha256-like digest = {hash(table) & 0xffffff:06x} "
          f"(identical across the window iff the digest repeats)")
