#!/usr/bin/env python3
"""Report tables for the Phase 2 real run (Z.ai, 2026-11-11): reads the two results JSONs
and prints/emits the Owner-readable tables: per-spot pooled + per-season, regime jumps,
B1/B2/B3 settle tables. Deterministic, read-only on the results."""
import json, csv, os

OUT = "/home/z/my-project/work/phase2-real-2026-11-11"
REG = json.load(open(f"{OUT}/phase2_real_results_reg.json"))
ALL = json.load(open(f"{OUT}/phase2_real_results_all.json"))
REGIME = REG["regime_labels"]

rows = REG["spot_comparison_pooled_all_seasons"]["rows"]
n_within = sum(1 for r in rows if r["within_tol"])
print(f"POOLED (reg-only): {n_within}/{len(rows)} within ±3 pts")
for r in sorted(rows, key=lambda r: -abs(r["delta_pts"])):
    print(f"  {r['spot']:>5}: real {r['real']:.3f} staged {r['staged']:.3f}  {r['delta_pts']:+7.2f} pts  {'OK' if r['within_tol'] else 'OVER'}  {r.get('basis','')[:60]}")
print("within list:", [r["spot"] for r in rows if r["within_tol"]])

# per-season within rates (label seats only, snap basis)
by_season = {}
for r in REG["spot_comparison_by_season"]:
    if r.get("basis"): continue
    by_season.setdefault(r["season"], []).append(r)
print("\nper-season within-tolerance (label seats):")
for s in sorted(by_season):
    rs = by_season[s]
    print(f"  {s}: {sum(1 for r in rs if r['within_tol'])}/{len(rs)} within")

# regime jumps: |delta| change >= 2 pts between consecutive seasons at regime years
print("\nregime-year delta jumps (>=2 pts change vs previous season, label seats):")
for r in sorted(REG["spot_comparison_by_season"], key=lambda x: x["spot"]):
    if r.get("basis"): continue
    s = r["season"]
    if s in REGIME and s > 2016:
        prev = next((q for q in REG["spot_comparison_by_season"] if q["spot"] == r["spot"] and q["season"] == s - 1), None)
        if prev and abs(abs(r["delta_pts"]) - abs(prev["delta_pts"])) >= 2.0:
            print(f"  {r['spot']:>5} {s} ({REGIME[s][:40]}): delta {prev['delta_pts']:+.1f} -> {r['delta_pts']:+.1f}")

# B1 settle table
print("\nB1 DIME per season (per-play >=6 DB) vs staged 0.0694 vs engine DIME_W 0.15:")
for p in REG["package_comparison_by_season"]:
    s = p["season"]
    print(f"  {s}: dime {p['dpkg_share']['dime']:.3f} (strict6 {p['dpkg_strict6']:.3f})  base {p['dpkg_share']['base']:.3f} nickel {p['dpkg_share']['nickel']:.3f}  lb4front {p.get('lb4_front_share', 0):.3f}  unknown_d {p['unknown_personnel_d']}")
dm = [p["dpkg_share"]["dime"] for p in REG["package_comparison_by_season"]]
print(f"  league mean 2016-25: {sum(dm)/len(dm):.4f}  min {min(dm):.3f} max {max(dm):.3f}")

# B3 FB
print("\nB3 FB share per season (league mean, all teams) vs staged 0.1265; FB acceptance band E<0.2228:")
for s, v in REG["b3_fb_share_league_mean"].items():
    print(f"  {s}: {v:.4f}  inside_band={v < 0.2228}")
fb = list(REG["b3_fb_share_league_mean"].values())
print(f"  decade mean {sum(fb)/len(fb):.4f}; 2016 {fb[0]:.4f} -> 2025 {fb[-1]:.4f}")
fbd = REG["b3_fb_share_by_season"]["2025"]
print(f"  2025 distribution: teams {fbd['n_teams']} with FB {fbd['n_teams_with_fb']}  median {fbd['median_among_fb_teams']} max {fbd['max_among_fb_teams']}")

# B2 WR1
print("\nB2 WR1 (snap-count WR1, name-join): targets & deep targets per team-game vs staged:")
print("  staged (Ledger trigger at tau=15): WR1 targets/tg 12.4 (staged trigger table), deep targets/tg 1.75")
for s, v in REG["b2_wr1_deep_targets"].items():
    print(f"  {s}: targets {v['wr1_targets_per_tg']:.1f}  deep15 {v["deep_per_tg"]["15"]:.2f}  deep12 {v["deep_per_tg"]["12"]:.2f}  deep20 {v["deep_per_tg"]["20"]:.2f}  conc {v['concordance_snapWR1_vs_mosttargeted']['rate']}")

# unknown / coverage
print("\ncoverage: unknown personnel rates per season (pass+run plays):")
for p in REG["package_comparison_by_season"]:
    print(f"  {p['season']}: unknown_o {p['unknown_personnel_o']}/{p['n_pass_run']} ({100*p['unknown_personnel_o']/p['n_pass_run']:.1f}%)  unknown_d {p['unknown_personnel_d']}  missing_participation {p['missing_participation']}")

# seat-hours
print("\nseat-hours pooled:", REG["dime_dl5_seat_hours_pooled"])

# write the Owner-readable CSV: spot x season real share vs staged
with open(f"{OUT}/spot_table_staged_vs_real.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["spot", "staged_play_share", "real_2016", "real_2017", "real_2018", "real_2019", "real_2020",
                "real_2021", "real_2022", "real_2023", "real_2024", "real_2025", "real_pooled", "delta_pts_pooled",
                "within_3pts_pooled", "basis"])
    idx = {}
    for r in REG["spot_comparison_by_season"]:
        idx.setdefault(r["spot"], {})[r["season"]] = r
    for r in sorted(rows, key=lambda x: -abs(x["delta_pts"])):
        s = r["spot"]
        per = idx.get(s, {})
        w.writerow([s, r["staged"]] + [f"{per.get(y, {}).get('real', ''):.4f}" if per.get(y) else "" for y in range(2016, 2026)]
                   + [f"{r['real']:.4f}", r["delta_pts"], "OK" if r["within_tol"] else "OVER", r.get("basis", "depth-seat snaps (team-season leaders)")])
print(f"\nwrote {OUT}/spot_table_staged_vs_real.csv")
