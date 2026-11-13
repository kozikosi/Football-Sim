#!/usr/bin/env python3
"""P-345 — the ANOVA bridge receipt (Z.ai seat, 2026-11-12).

Runs DS's variance-components (one-way random-effects ANOVA) estimator on the P-344
team-game file and answers OR's Q3 verification question: does the ANOVA confirm the
bridge, and can it adjudicate the 0.20-vs-0.40 objective?

  1. DS's decomposition, reproduced exactly (P-347 sec 3):
       Var(team-season mean points)        [DS: 16.955]
       mean within-team game variance      [DS: 87.148]
       true between-team variance          [DS: 11.905, SD 3.45]
       n_bar                               [DS: 17.26, 320 team-seasons, 5,522 team-games]
       season-level dispersion overstatement   [DS: x1.193]
       game-level dispersion overstatement     [DS: x2.71]
       per-season overstatements           [DS: 1.160 (2016), 1.208 (2020), 1.199 (2025)]
     Points are season-demeaned (the scoring-era mean removed), per DS.

  2. lambda-hat on STATED rulers, with the interval (DS D4: at n=32 clusters the
     per-lambda relative sd is 13-26%):
       z-OVR ruler       g = team mean OVR in league-z units   [Var(g) cross-checks VL]
       raw-OVR ruler     g = team mean OVR in OVR points
       slot-wins ruler   g = team advantage in measured slot-wins (sum over the 32
                         slots of the slot's measured localWins20 per +1 OVR)

  3. THE VERDICT INPUTS — the two checks the ANOVA can actually run on the price
     table (the ANOVA itself identifies ONE beta on the sim ruler; it cannot emit
     a lambda-hat per objective — see the filing):
       (a) the scale-bias test: mae(c * raw) as a function of a pure scale factor c
           on the 0.40 raws. If the mae front's minimum sits at c<1, the mae metric
           is scale-biased toward small raws (the Owner's labels are small integers),
           and part of "0.20 wins mae" is a units artefact, not information.
       (b) the spread test: SD(owner integers) vs SD(raw) at each objective — which
           objective reproduces the table's price DISPERSION (mae tests location,
           this tests spread).

Deterministic, no RNG, no network. Read-only inputs:
  team_game_summary_2016-2025.csv  (P-344, MUSE delivery c7540b04)
  madden27-ratings.csv             (the engine's own ratings input, read-only)
  flex-99-live.json                (the live 99-rule table)
  merge_prototype.py               (the P-340 merged formula, as delivered)

Usage: python3 zai_p345_anova_bridge.py <dir-with-inputs> <out-json>
"""
import csv
import json
import math
import os
import sys
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
INPUT_DIR = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "inputs")
OUT_JSON = sys.argv[2] if len(sys.argv) > 2 else os.path.join(HERE, "results_p345_anova.json")

sys.path.insert(0, os.path.join(HERE, "formula"))
import merge_prototype as MP  # noqa: E402

D4_REL_SD = 0.26  # DS D4: per-lambda relative sd 0.13-0.26 at n=32; report the wide end


def mean(a):
    return sum(a) / len(a)


def var(a, ddof=1):
    m = mean(a)
    return sum((x - m) ** 2 for x in a) / (len(a) - ddof)


# ---------------------------------------------------------------- 1. the decomposition
def load_games(path, reg_only=False):
    rows = []
    with open(path) as f:
        for r in csv.DictReader(f):
            if reg_only and r["season_type"] != "REG":
                continue
            rows.append((int(r["season"]), r["team"], float(r["points"])))
    return rows


def decomposition(rows, label):
    by_ts = defaultdict(list)
    for season, team, pts in rows:
        by_ts[(season, team)].append(pts)
    n_ts = {k: len(v) for k, v in by_ts.items()}
    means = {k: mean(v) for k, v in by_ts.items()}
    within = {k: var(v, ddof=1) for k, v in by_ts.items() if len(v) > 1}
    # season-demean (scoring era removed, per DS)
    season_means = defaultdict(list)
    for (season, team), m in means.items():
        season_means[season].append(m)
    seas_m = {s: mean(v) for s, v in season_means.items()}
    dm = [means[(s, t)] - seas_m[s] for (s, t) in means]
    nbar = mean(list(n_ts.values()))
    out = {"label": label, "n_team_games": len(rows), "n_team_seasons": len(means),
           "nbar": round(nbar, 3),
           "var_team_means_pop": round(var(dm, ddof=0), 4),
           "var_team_means_sample": round(var(dm, ddof=1), 4),
           "mean_within_var": round(mean(list(within.values())), 4),
           }
    for ddof, tag in ((0, "pop"), (1, "sample")):
        vm = var(dm, ddof=ddof)
        between = vm - out["mean_within_var"] / nbar
        allpts = [p for _, _, p in rows]
        out[f"between_var_{tag}"] = round(between, 4)
        out[f"between_sd_{tag}"] = round(math.sqrt(max(between, 0.0)), 4)
        out[f"overstate_season_{tag}"] = round(math.sqrt(vm / between), 4) if between > 0 else None
        out[f"overstate_game_{tag}"] = round(math.sqrt(var(allpts, ddof=ddof) / between), 4) if between > 0 else None
        # DS's x2.71 basis: the mean WITHIN-game variance as the game-level dispersion
        out[f"overstate_game_withinbasis_{tag}"] = round(math.sqrt(out["mean_within_var"] / between), 4) if between > 0 else None
    # per-season overstatement (season-level, sample var)
    per_season = {}
    for s in sorted({s for s, _ in means}):
        dms = [means[(ss, t)] - seas_m[ss] for (ss, t) in means if ss == s]
        ns = [n_ts[(ss, t)] for (ss, t) in means if ss == s]
        ws = [within[(ss, t)] for (ss, t) in within if ss == s]
        vm = var(dms, ddof=1)
        b = vm - mean(ws) / mean(ns)
        per_season[str(s)] = round(math.sqrt(vm / b), 4) if b > 0 else None
    out["per_season_overstate_sample"] = per_season
    return out


# ---------------------------------------------------------------- 2. Var(g) rulers
def var_g_rulers():
    teams = defaultdict(list)
    with open(os.path.join(INPUT_DIR, "madden27-ratings.csv")) as f:
        for r in csv.DictReader(f):
            if r["team"] == "Free Agent":
                continue
            teams[r["team"]].append(int(r["ovr"]))
    tmeans = {t: mean(v) for t, v in teams.items()}
    vals = list(tmeans.values())
    league_sd = math.sqrt(var(list(ovr_all), ddof=1)) if False else None
    all_ovr = [o for v in teams.values() for o in v]
    sd_ovr = math.sqrt(var(all_ovr, ddof=1))
    out = {"n_teams": len(vals), "league_mean_team_ovr": round(mean(vals), 4),
           "league_sd_player_ovr": round(sd_ovr, 4),
           "var_team_mean_ovr_pop": round(var(vals, ddof=0), 6),
           "var_team_mean_ovr_sample": round(var(vals, ddof=1), 6),
           }
    out["var_z_team_pop"] = round(out["var_team_mean_ovr_pop"] / sd_ovr ** 2, 8)
    out["var_z_team_sample"] = round(out["var_team_mean_ovr_sample"] / sd_ovr ** 2, 8)
    # slot-wins ruler: g = (sum over the 32 slots of v_slot / 20) * (team OVR deviation)
    slots_sum = sum(MP.slot_value(role, slot) for role, slots in MP.ROLE_SLOTS.items()
                    for slot, _ in slots)
    wps = slots_sum / 20.0          # measured slot-wins per +1 team-wide OVR
    out["slot_wins_sum_all_32_slots"] = round(slots_sum, 4)
    out["slot_wins_per_ovr"] = round(wps, 4)
    out["var_g_slotwins_pop"] = round(wps ** 2 * out["var_team_mean_ovr_pop"], 6)
    out["var_g_slotwins_sample"] = round(wps ** 2 * out["var_team_mean_ovr_sample"], 6)
    return out


# ---------------------------------------------------------------- 3. price-table checks
def price_checks():
    live = json.load(open(os.path.join(INPUT_DIR, "flex-99-live.json")))["flex"]
    pairs97 = [(s, d, o) for s, ds in live.items() for d, o in ds.items() if s != d]
    owner = [o for _, _, o in pairs97]
    raws = {}
    for lam in (0.2, 0.4):
        raws[lam] = [MP.raw_price(s, d, "merged_exp", lam, MP.W_MEAS)[0] for s, d, _ in pairs97]
    out = {"owner_label_mean": round(mean(owner), 4),
           "owner_label_sd": round(math.sqrt(var(owner, ddof=0)), 4),
           "owner_label_counts": {str(t): owner.count(t) for t in (0, 2, 6, 12)},
           "mae_floor_at_zero_raws": round(mean([abs(o) for o in owner]), 4)}
    for lam, rr in raws.items():
        out[f"lam{lam}_raw_sd"] = round(math.sqrt(var(rr, ddof=0)), 4)
        out[f"lam{lam}_raw_mean"] = round(mean(rr), 4)
    # (a) the scale-bias test: mae(c * raw) on the 0.40 raws
    curve = []
    for i in range(1, 11):
        c = round(0.1 * i, 1)
        mae4 = mean([abs(c * r - o) for r, o in zip(raws[0.4], owner)])
        mae2 = mean([abs(c * r - o) for r, o in zip(raws[0.2], owner)])
        curve.append({"c": c, "mae_c_times_raw_lam0.4": round(mae4, 4),
                      "mae_c_times_raw_lam0.2": round(mae2, 4)})
    out["scale_bias_curve"] = curve
    best4 = min(curve, key=lambda x: x["mae_c_times_raw_lam0.4"])
    best2 = min(curve, key=lambda x: x["mae_c_times_raw_lam0.2"])
    out["scale_bias_min"] = {"lam0.4": best4, "lam0.2": best2}
    # (b) the spread test
    out["spread_test"] = {
        "owner_sd": out["owner_label_sd"],
        "raw_sd_lam0.4": out["lam0.4_raw_sd"],
        "raw_sd_lam0.2": out["lam0.2_raw_sd"],
        "ratio_0.4_over_owner": round(out["lam0.4_raw_sd"] / out["owner_label_sd"], 3),
        "ratio_0.2_over_owner": round(out["lam0.2_raw_sd"] / out["owner_label_sd"], 3)}
    return out


# ---------------------------------------------------------------- main
def main():
    csv_path = os.path.join(INPUT_DIR, "team_game_summary_2016-2025.csv")
    out = {"anova_all_games": decomposition(load_games(csv_path, reg_only=False), "all 5522 team-games"),
           "anova_reg_only": decomposition(load_games(csv_path, reg_only=True), "REG only"),
           "var_g": var_g_rulers(),
           "price_checks": price_checks()}

    # lambda-hat per ruler (season-demeaned, sample-var decomposition — the DS recipe)
    an = out["anova_all_games"]
    vg = out["var_g"]
    between = an["between_var_sample"]
    lamhat = {
        "z_ovr_ruler": {"var_g": vg["var_z_team_pop"],
                        "lamhat": round(math.sqrt(between / vg["var_z_team_pop"]), 3),
                        "points_per_1sd_team_z": an["between_sd_sample"]},
        "raw_ovr_ruler": {"var_g": vg["var_team_mean_ovr_pop"],
                          "lamhat": round(math.sqrt(between / vg["var_team_mean_ovr_pop"]), 3),
                          "points_per_team_ovr_point": round(an["between_sd_sample"] / math.sqrt(vg["var_team_mean_ovr_pop"]), 3)},
        "slot_wins_ruler": {"var_g": vg["var_g_slotwins_pop"],
                            "lamhat": round(math.sqrt(between / vg["var_g_slotwins_pop"]), 3),
                            "points_per_slotwin_of_team_advantage": round(an["between_sd_sample"] / math.sqrt(vg["var_g_slotwins_pop"]), 3)}}
    for k, v in lamhat.items():
        v["interval_plus_minus_26pct"] = [round(v["lamhat"] * (1 - D4_REL_SD), 3),
                                          round(v["lamhat"] * (1 + D4_REL_SD), 3)]
    out["lambda_hat"] = lamhat

    os.makedirs(os.path.dirname(OUT_JSON) or ".", exist_ok=True)
    json.dump(out, open(OUT_JSON, "w"), indent=1)

    print("== DS decomposition, all games ==")
    for k, v in an.items():
        if k != "per_season_overstate_sample":
            print(f"  {k}: {v}")
    print(f"  per-season overstatement: {an['per_season_overstate_sample']}")
    print("\n== REG-only variant ==")
    rg = out["anova_reg_only"]
    for k in ("n_team_games", "n_team_seasons", "nbar", "var_team_means_pop",
              "var_team_means_sample", "mean_within_var", "between_var_sample",
              "overstate_season_sample", "overstate_game_sample"):
        print(f"  {k}: {rg[k]}")
    print("\n== Var(g) rulers ==")
    for k, v in vg.items():
        print(f"  {k}: {v}")
    print("\n== lambda-hat ==")
    for k, v in lamhat.items():
        print(f"  {k}: {v}")
    print("\n== price-table checks ==")
    pc = out["price_checks"]
    for k in ("owner_label_mean", "owner_label_sd", "owner_label_counts",
              "mae_floor_at_zero_raws", "lam0.2_raw_sd", "lam0.4_raw_sd"):
        print(f"  {k}: {pc[k]}")
    print(f"  scale-bias min: {pc['scale_bias_min']}")
    print(f"  scale-bias curve: {pc['scale_bias_curve']}")
    print(f"  spread test: {pc['spread_test']}")
    print(f"\nwrote {OUT_JSON}")


if __name__ == "__main__":
    main()
