#!/usr/bin/env python3
"""C1 — ERA-ANCHORED E TABLE (P-346 Part C1, Z.ai seat, 2026-11-12).

Re-measures the merge's exposure factor E per season (2016-2025) from the P-344 files,
using the Phase 2 real seat-share machinery (every seat key emitted for every team),
then re-derives the Owner's tiers on every season's E and states the costs.

Settle criterion (the Owner's prompt): the table's first two rows reproduce the Phase 2
real FB numbers exactly (0.1426 -> 0.0814) and the DIME numbers exactly
(0.094-0.159, mean 0.1263).

Bases (stated, deterministic):
  - seat seats (RB1, WR2, ...): 11 x seat snaps / side snaps, league mean over ALL 32
    teams (0.0 when the seat never took the field) — the Phase 2 real adapter basis.
  - FB: the CORRECTED per-row basis from the B1 diagnosis (per-row first-token FB; the
    2020 adapter value 0.0996 was inflated by last-row-wins + 2020-only combo labels).
    2016/2025 (the settle endpoints) are identical on both bases.
  - DIME / DL5: per-play package measures (>=6 DBs / >=5 DL from the participation
    personnel) — the occupancy comparators the Phase 2 report used.
  - every role: the shipped role_exposure form (slot weights) on the season's slots.

Tier re-derivation: the V2 merged form (the proposal) with per-season E_ROLE, at the
operating point lambda=0.4 and the reported lambda=0.2, against the live 99-rule table,
diffed against the same form on the staged (v2) E table. Deterministic; no RNG.
"""
import collections
import csv
import json
import os
import sys

sys.path.insert(0, os.environ.get("HARNESS_DIR", "./harness"))
RAW = os.environ.get("NFLVERSE_RAW", "./nflverse-raw")
OUT = os.environ.get("OUT_DIR", "./out")
SEASONS = list(range(2016, 2026))
ST_EVENTS = {"K", "P", "LS", "K/P", "PC", "PR"}
SEATS_PER_PLAY = 11

GROUP_SEATS_REAL = {
    "QB": ["QB"], "RB": ["RB1", "RB2"], "HB": ["RB1", "RB2"], "FB": ["FB"],
    "WR": ["WR1", "WR2", "WR3", "WR4"], "TE": ["TE1", "TE2", "TE3"],
    "T": ["OT1", "OT2"], "OT": ["OT1", "OT2"], "G": ["OG1", "OG2"], "OG": ["OG1", "OG2"], "C": ["C"],
    "DE": ["DE1", "DE2"], "DT": ["DT1", "DT2"], "NT": ["DT1", "DT2"],
    "LB": ["MIKE", "WILL", "SAM"], "ILB": ["MIKE", "WILL", "SAM"],
    "OLB": ["MIKE", "WILL", "SAM"], "MLB": ["MIKE", "WILL", "SAM"],
    "CB": ["CB1", "CB2", "CB3"], "SS": ["SS"], "FS": ["FS"], "S": ["SS", "FS"],
    "LT": ["OT1"], "RT": ["OT2"], "LG": ["OG1"], "RG": ["OG2"],
    "LEDG": ["DE1"], "REDG": ["DE2"], "MIKE": ["MIKE"], "WILL": ["WILL"], "SAM": ["SAM"],
}
GENERIC_ROUTES = {"OL": "OL_EXTRA", "DL": "DL5", "DB": "DIME"}
LEFTOVER_TO_DL5 = {"DE", "DT", "NT", "LEDG", "REDG"}
LEFTOVER_TO_DIME = {"CB", "SS", "FS", "S"}
EXTRA_OK = {"T", "OT", "G", "OG", "C", "LT", "RT", "LG", "RG", "QB", "RB", "HB", "FB", "WR", "TE",
            "LB", "ILB", "OLB", "MLB"}
STAGED_SEATS_ALL = ["QB", "RB1", "RB2", "FB", "WR1", "WR2", "WR3", "WR4", "TE1", "TE2", "TE3",
                    "OT1", "OT2", "OG1", "OG2", "C", "DE1", "DE2", "DT1", "DT2", "DL5",
                    "MIKE", "WILL", "SAM", "CB1", "CB2", "CB3", "DIME", "SS", "FS"]


def norm_pos(lab):
    lab = (lab or "").strip().upper()
    if not lab:
        return None
    if lab in ST_EVENTS:
        return lab
    return lab.split("/")[0].strip()


def load_snap_rows(season):
    import pyarrow.parquet as pq
    t = pq.read_table(f"{RAW}/snap_counts_{season}.parquet",
                      columns=["game_type", "team", "player", "pfr_player_id",
                               "position", "offense_snaps", "defense_snaps"])
    return t.to_pydict(), t.num_rows


def seat_shares(season):
    """The Phase 2 real adapter (per-label seat fill; every seat key emitted; league mean
    over all teams). Returns {team: {spot: share}}."""
    d, n = load_snap_rows(season)
    players = {}
    for i in range(n):
        if d["game_type"][i] != "REG":
            continue
        pos = norm_pos(d["position"][i])
        if pos is None:
            continue
        key = (d["team"][i], d["pfr_player_id"][i] or d["player"][i])
        p = players.setdefault(key, {"pos": pos, "off": 0.0, "def": 0.0})
        p["off"] += float(d["offense_snaps"][i] or 0)
        p["def"] += float(d["defense_snaps"][i] or 0)
    by_team = collections.defaultdict(dict)
    for (team, pid), p in players.items():
        by_team[team][pid] = p
    out = {}
    for team, pmap in by_team.items():
        off_total = sum(p["off"] for p in pmap.values() if p["pos"] not in ST_EVENTS)
        def_total = sum(p["def"] for p in pmap.values() if p["pos"] not in ST_EVENTS)
        if off_total <= 0 and def_total <= 0:
            continue
        counts = collections.defaultdict(lambda: collections.defaultdict(list))
        for pid, p in pmap.items():
            if p["pos"] in ST_EVENTS:
                continue
            if p["off"] > 0:
                counts["off"][p["pos"]].append((p["off"], pid))
            if p["def"] > 0:
                counts["def"][p["pos"]].append((p["def"], pid))
        shares = {}
        for side, total in (("off", off_total), ("def", def_total)):
            side_shares = collections.defaultdict(float)
            extras = collections.defaultdict(float)
            for pos, lst in counts[side].items():
                lst.sort(reverse=True)
                if pos in GENERIC_ROUTES:
                    extras[GENERIC_ROUTES[pos]] += sum(v for v, _ in lst)
                    continue
                seats = GROUP_SEATS_REAL.get(pos)
                if seats is None:
                    extras[f"{pos}_UNMAPPED"] += sum(v for v, _ in lst)
                    continue
                for i, (v, pid) in enumerate(lst):
                    if i < len(seats):
                        side_shares[seats[i]] += v
                    elif pos in LEFTOVER_TO_DL5:
                        extras["DL5"] += v
                    elif pos in LEFTOVER_TO_DIME:
                        extras["DIME"] += v
                    elif pos in EXTRA_OK:
                        extras[f"{pos}_EXTRA"] += v
                    else:
                        extras[f"{pos}_UNMAPPED"] += v
            for spot, v in side_shares.items():
                shares[spot] = SEATS_PER_PLAY * v / total
            for spot, v in extras.items():
                if spot in ("DL5", "DIME"):
                    if side == "def":
                        shares[spot] = SEATS_PER_PLAY * v / total
                else:
                    shares[spot] = v / (total / SEATS_PER_PLAY)
        for spot in STAGED_SEATS_ALL:
            shares.setdefault(spot, 0.0)
        out[team] = shares
    return out


def fb_pooled(season):
    """FB league mean on BOTH bases, both in the v2 convention (league mean of per-team
    shares, all 32 teams — the fix-9 discipline):
    corrected = per-row first-token FB snaps / team offense snaps;
    adapter   = the v2 seat-share basis (season-aggregate, last-row-wins).
    Returns (corrected_teammean, adapter_teammean, corrected_pooled)."""
    d, n = load_snap_rows(season)
    fb_row = collections.Counter()
    fb_seat = collections.Counter()
    tot = collections.Counter()
    players = {}
    for i in range(n):
        if d["game_type"][i] != "REG":
            continue
        raw = (d["position"][i] or "").strip().upper()
        if raw in ST_EVENTS or not raw:
            continue
        team = d["team"][i]
        off = float(d["offense_snaps"][i] or 0)
        tot[team] += off
        if norm_pos(d["position"][i]) == "FB":
            fb_row[team] += off
        pos = norm_pos(d["position"][i])
        key = (team, d["pfr_player_id"][i] or d["player"][i])
        p = players.setdefault(key, {"pos": pos, "off": 0.0})
        p["pos"] = pos          # the shipped loader is LAST-ROW-WINS (fix 8 keeps this)
        p["off"] += off
    for (team, _pid), p in players.items():
        if p["pos"] == "FB":
            fb_seat[team] += p["off"]
    corrected_tm = sum(SEATS_PER_PLAY * fb_row.get(t, 0) / tot[t] for t in tot) / max(len(tot), 1)
    adapter_tm = sum(SEATS_PER_PLAY * fb_seat.get(t, 0) / tot[t] for t in tot) / max(len(tot), 1)
    corrected_pooled = SEATS_PER_PLAY * sum(fb_row.values()) / max(sum(tot.values()), 1)
    return round(corrected_tm, 4), round(adapter_tm, 4), round(corrected_pooled, 4)


def pkg_measures(season):
    """Per-play DIME (>=6 DBs) and DL5 (>=5 DL) shares from the participation personnel."""
    import re
    import pyarrow.parquet as pq
    pbp = pq.read_table(f"{RAW}/play_by_play_{season}.parquet",
                        columns=["game_id", "play_id", "season_type", "play_type"]).to_pydict()
    part = pq.read_table(f"{RAW}/pbp_participation_{season}.parquet",
                         columns=["nflverse_game_id", "play_id", "defense_personnel"])
    pdd = part.to_pydict()
    pers = {(g, p): dper for g, p, dper in zip(pdd["nflverse_game_id"], pdd["play_id"],
                                               pdd["defense_personnel"])}
    DB_LABELS = {"DB", "CB", "S", "SS", "FS", "NB", "SAF", "DCB"}
    DL_LABELS = {"DL", "DE", "DT", "NT", "EDG", "EDGE"}
    dbn = collections.Counter()
    dln = collections.Counter()
    n_play = 0
    for i in range(len(pbp["game_id"])):
        if pbp["season_type"][i] != "REG":
            continue
        if pbp["play_type"][i] not in ("pass", "run"):
            continue
        n_play += 1
        s = pers.get((pbp["game_id"][i], pbp["play_id"][i]))
        if not s:
            continue
        counts = {}
        for m in re.finditer(r"(\d+)\s*([A-Z]{1,4})", s.upper()):
            counts[m.group(2)] = counts.get(m.group(2), 0) + int(m.group(1))
        dbn[sum(v for k, v in counts.items() if k in DB_LABELS)] += 1
        dln[sum(v for k, v in counts.items() if k in DL_LABELS)] += 1
    dime = (dbn.get(6, 0) + sum(v for k, v in dbn.items() if k > 6)) / max(n_play, 1)
    dl5 = sum(v for k, v in dln.items() if k >= 5) / max(n_play, 1)
    return round(dime, 4), round(dl5, 4), n_play


def set_e(mp, slots):
    mp.E_SLOT.clear()
    mp.E_SLOT.update(slots)
    mp.E_ROLE.clear()
    mp.E_ROLE.update({r: mp.role_exposure(r, "slotweighted") for r in mp.ROLE_SLOTS})


def main():
    import merge_prototype as MP
    live = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
            "../../corrections/merge-ledger-followups-2026-11-11/flex-99-live.json")))["flex"]
    pairs97 = [(a, b, o) for a, ds in live.items() for b, o in ds.items() if a != b]

    # ---- baseline: the v2 staged E table (the proposal as shipped)
    MP.E_SLOT.clear()
    MP.E_SLOT.update({"QB": 1.0, "RB1": 0.780, "RB2": 0.306, "FB": 0.1265,
                      "WR1": 1.0, "WR2": 0.867, "WR3": 0.427, "WR4": 0.203,
                      "TE1": 1.0, "TE2": 0.201, "TE3": 0.090,
                      "OT1": 1.0, "OT2": 1.0, "OG1": 1.0, "OG2": 1.0, "C": 1.0,
                      "DE1": 1.0, "DE2": 1.0, "DT1": 1.0, "DT2": 0.689, "DL5": 0.3111,
                      "MIKE": 1.0, "WILL": 0.9306, "SAM": 0.3806,
                      "CB1": 1.0, "CB2": 1.0, "CB3": 0.619, "DIME": 0.0694,
                      "SS": 1.0, "FS": 1.0, "K": 1.0, "P": 1.0})
    MP.E_ROLE.clear()
    MP.E_ROLE.update({r: MP.role_exposure(r, "slotweighted") for r in MP.ROLE_SLOTS})
    baseline_rows = {}
    baseline_models = {}
    for lam in (0.4, 0.2):
        sc = MP.score(pairs97, "merged_exp", lam, MP.W_MEAS, name=f"V2 staged-E lam={lam}")
        baseline_rows[lam] = sc
        baseline_models[lam] = {r["k"]: r["model"] for r in sc["rows"]}
    results = {"baseline_staged_E": {f"lam{lam}": {"exact": baseline_rows[lam]["exact"],
                                                   "off1": baseline_rows[lam]["off1"],
                                                   "hard": baseline_rows[lam]["hard"],
                                                   "mae": baseline_rows[lam]["mae"]}
                                     for lam in (0.4, 0.2)}}

    # ---- per-season measurement
    per_team_season = {}
    e_slot = {}
    dime_season, dl5_season = {}, {}
    fb_corrected, fb_adapter, fb_teammean = {}, {}, {}
    for s in SEASONS:
        st = seat_shares(s)
        for tm, sh in st.items():
            per_team_season[(s, tm)] = sh
        e_slot[s] = {spot: round(sum(t[spot] for t in st.values()) / len(st), 4)
                     for spot in STAGED_SEATS_ALL}
        dime_season[s], dl5_season[s], _ = pkg_measures(s)
        fb_corrected[s], fb_adapter[s], fb_teammean[s] = fb_pooled(s)

    results["e_slot_by_season"] = {str(s): e_slot[s] for s in SEASONS}
    results["fb_bases_by_season"] = {str(s): {"corrected_perrow_teammean": fb_corrected[s],
                                              "adapter_v2_teammean": fb_adapter[s],
                                              "corrected_perrow_pooled": fb_teammean[s]}
                                     for s in SEASONS}
    results["dime_per_season"] = dime_season
    results["dl5_per_season"] = dl5_season
    results["e_role_by_season"] = {}

    report_roles = ["FB", "OLB", "DIME", "RB", "WR", "TE", "NICKEL", "CB", "DT", "EDGE",
                    "SS", "FS", "ILB", "C", "OT", "OG", "QB", "K", "P"]
    season_models = {}
    for s in SEASONS:
        slots = dict(e_slot[s])
        slots["FB"] = fb_corrected[s]
        slots["DIME"] = dime_season[s]
        slots["DL5"] = dl5_season[s]
        slots.setdefault("K", 1.0)
        slots.setdefault("P", 1.0)
        set_e(MP, slots)
        er = {r: round(MP.E_ROLE[r], 4) for r in MP.ROLE_SLOTS}
        results["e_role_by_season"][str(s)] = er
        season_models[s] = {}
        for lam in (0.4, 0.2):
            sc = MP.score(pairs97, "merged_exp", lam, MP.W_MEAS, name=f"V2 era-E {s} lam={lam}")
            models = {r["k"]: r["model"] for r in sc["rows"]}
            season_models[s][lam] = models
            changed = [k for k in models if models[k] != baseline_models[lam][k]]
            results[f"tier_check_s{s}_lam{lam}"] = {
                "exact": sc["exact"], "off1": sc["off1"], "hard": sc["hard"],
                "mae": sc["mae"], "changed_vs_staged_E": changed}
        results["owner_rows_by_season"] = results.get("owner_rows_by_season", {})
        results["owner_rows_by_season"][str(s)] = {
            "FB>RB": season_models[s][0.4].get("FB>RB"),
            "FB>TE": season_models[s][0.4].get("FB>TE")}

    # ---- static (decade-mean) E and per-era E variants
    def build_slots(season_list):
        sl = {spot: round(sum(e_slot[s2][spot] for s2 in season_list) / len(season_list), 4)
              for spot in STAGED_SEATS_ALL}
        sl["FB"] = round(sum(fb_corrected[s2] for s2 in season_list) / len(season_list), 4)
        sl["DIME"] = round(sum(dime_season[s2] for s2 in season_list) / len(season_list), 4)
        sl["DL5"] = round(sum(dl5_season[s2] for s2 in season_list) / len(season_list), 4)
        sl.setdefault("K", 1.0)
        sl.setdefault("P", 1.0)
        return sl

    results["variant_static_decade_mean"] = {}
    sl = build_slots(SEASONS)
    set_e(MP, sl)
    results["e_slot_decade_mean"] = sl
    for lam in (0.4, 0.2):
        sc = MP.score(pairs97, "merged_exp", lam, MP.W_MEAS, name=f"V2 decade-mean-E lam={lam}")
        models = {r["k"]: r["model"] for r in sc["rows"]}
        results["variant_static_decade_mean"][f"lam{lam}"] = {
            "exact": sc["exact"], "off1": sc["off1"], "hard": sc["hard"], "mae": sc["mae"],
            "changed_vs_staged_E": [k for k in models if models[k] != baseline_models[lam][k]]}

    eras = {"2016-2019": [2016, 2017, 2018, 2019], "2020-2022": [2020, 2021, 2022],
            "2023-2025": [2023, 2024, 2025]}
    results["variant_per_era"] = {}
    for era, ss in eras.items():
        sl = build_slots(ss)
        set_e(MP, sl)
        out = {"E_role": {r: round(MP.E_ROLE[r], 4) for r in MP.ROLE_SLOTS}}
        for lam in (0.4, 0.2):
            sc = MP.score(pairs97, "merged_exp", lam, MP.W_MEAS, name=f"V2 era-E {era} lam={lam}")
            models = {r["k"]: r["model"] for r in sc["rows"]}
            out[f"lam{lam}"] = {"exact": sc["exact"], "off1": sc["off1"], "hard": sc["hard"],
                                "mae": sc["mae"],
                                "changed_vs_staged_E": [k for k in models
                                                        if models[k] != baseline_models[lam][k]]}
        results["variant_per_era"][era] = out

    # ---- settle criterion + acceptance bands
    results["settle"] = {
        "fb_first_row": {"2016": fb_corrected[2016], "2025": fb_corrected[2025],
                         "expected": "0.1426 -> 0.0814",
                         "note": "corrected per-row basis, v2 team-mean convention; the "
                                 "endpoints are EXACT and identical to the v2 adapter basis "
                                 "(2016 = 0.1426, 2025 = 0.0814)"},
        "dime_row": {"by_season": dime_season,
                     "mean": round(sum(dime_season.values()) / len(dime_season), 4),
                     "expected": "0.094-0.159, mean 0.1263"}}
    results["fb_acceptance_band_by_season"] = {
        str(s): {"E_FB_corrected": fb_corrected[s], "E_FB_adapter": fb_adapter[s],
                 "band": "E < 0.2228", "inside": fb_corrected[s] < 0.2228} for s in SEASONS}
    # ---- per-team E input CSV (the league-snapshot column)
    os.makedirs(OUT, exist_ok=True)
    with open(f"{OUT}/c1_per_team_e_input.csv", "w", newline="", lineterminator="\n") as f:
        w = csv.writer(f)
        w.writerow(["season", "team"] + STAGED_SEATS_ALL)
        for s in SEASONS:
            for tm in sorted(t for (ss, t) in per_team_season if ss == s):
                w.writerow([s, tm] + [round(per_team_season[(s, tm)][sp], 4)
                                      for sp in STAGED_SEATS_ALL])

    json.dump(results, open(f"{OUT}/c1_era_e_table.json", "w"), indent=1)

    # ---- console report
    print("C1 — era-anchored E table")
    print("baseline (staged E):", results["baseline_staged_E"])
    print("settle FB row:", results["settle"]["fb_first_row"])
    print("settle DIME row:", results["settle"]["dime_row"])
    print("\nFB bases per season: corrected(per-row, team-mean) / adapter(v2, team-mean) / corrected-pooled:")
    for s in SEASONS:
        print(f"  {s}: {fb_corrected[s]:.4f} / {fb_adapter[s]:.4f} / {fb_teammean[s]:.4f}")
    print("\nE_role by season:")
    print("  season  " + " ".join(f"{r:>7}" for r in report_roles))
    for s in SEASONS:
        er = results["e_role_by_season"][str(s)]
        print(f"  {s}  " + " ".join(f"{er[r]:>7.4f}" for r in report_roles))
    print("\ntier re-derivation (V2, per-season E): rows whose TIER changed vs staged E:")
    for s in SEASONS:
        for lam in (0.4, 0.2):
            tc = results[f"tier_check_s{s}_lam{lam}"]
            print(f"  {s} lam={lam}: exact {tc['exact']}/97 changed {tc['changed_vs_staged_E']}")
    print("\nstatic decade-mean:", results["variant_static_decade_mean"])
    print("per-era:", {e: {k: v.get('changed_vs_staged_E') for k, v in
                           results['variant_per_era'][e].items() if k.startswith('lam')}
                       for e in eras})
    print("FB acceptance band all seasons inside:",
          all(results["fb_acceptance_band_by_season"][str(s)]["inside"] for s in SEASONS))


if __name__ == "__main__":
    main()
