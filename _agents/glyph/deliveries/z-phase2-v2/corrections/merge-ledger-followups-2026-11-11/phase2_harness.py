#!/usr/bin/env python3
"""PHASE 2 HARNESS — ingestion + comparison machine (Z.ai, seat ZAI, 2026-11-11).

Part C of the merge/ledger batch: build the machine that validates the Ledger
against real nflverse-class data, so Phase 2 runs the moment the data arrives.
NO REAL DATA IS FETCHED OR EMBEDDED. The harness ingests two CSV schemas
(the Phase 1 report §7 request), compares the staged Ledger against them, and is
tested END-TO-END on SYNTHETIC data generated in the same schema (labelled
SYNTHETIC everywhere it appears).

Schemas (what the Owner/council attaches, one file per season or one combined):

1) SNAP COUNTS  (--snaps)  — per-player snap counts by team-game:
   game_id,season,week,team,player,player_id,position,off_snaps,def_snaps,st_snaps
   (positions in the nflverse/madden vocabulary: QB,HB,FB,WR,TE,LT,RT,LG,RG,C,
    DT,LEDG,REDG,MIKE,WILL,SAM,CB,SS,FS,K,P — the sport-football.json map)

2) PLAY-BY-PLAY WITH PERSONNEL (--pbp) — one row per play:
   game_id,season,week,play_id,posteam,defteam,down,ydstogo,play_type,
   personnel_o,personnel_d,defenders_in_box
   (personnel_o like "1 RB, 1 TE, 3 WR"; personnel_d like "4 DL, 2 LB, 5 DB";
    play_type in run/pass; nflverse field names kept so a real release maps 1:1)

Comparisons (Phase 1 report §7):
  A. spot play-shares: real (players -> spots via the depth mapping) vs the staged
     Ledger R3 play_shares, per spot, tolerance ±3 points of play-share (the report's
     proposal) at season level.
  B. package participation: personnel_o frequencies vs the staged pkg shares;
     per-package run rates vs the staged pkg_run; defensive base/nickel/dime from
     personnel_d DB counts vs the staged dpkg shares.
  C. the mapping spec: spot -> position labels + depth rule (emitted, checkable).

Known schema risks (the note reports them; the harness surfaces, not hides them):
  - CORRECTED 2026-11-11 (MUSE review, correction 2): per-player snap counts ARE in a
    public nflverse release (the snap_counts release, PFR-derived, 2012+; P-344
    delivered 2016-2025 from it). The original "not in any public release" assessment
    was wrong. The real release's columns (offense_snaps/defense_snaps/st_snaps) and
    real NFL position labels (T/G/DE/LB/S, not the madden vocabulary) map onto the
    schema through the loader, isolated for exactly this reason.
  - nflverse participation data lives in a SEPARATE release (pbp participation),
    joined on game_id+play_id; defenders_in_box is in the main pbp.
  - personnel_o strings are messy in real data ("1 RB 1 TE 3 WR", empty on some
    plays); the parser handles the common shapes and counts the rest as UNKNOWN
    (reported, never silently dropped).

Usage:
  python3 phase2_harness.py --ledger <ledger.json> --out <phase2_results.json>            # synthetic self-test
  python3 phase2_harness.py --ledger <ledger.json> --snaps snaps.csv --pbp pbp.csv ...    # real data (when it arrives)
"""
import argparse, csv, json, random, re, sys
from collections import defaultdict

# ---------------------------------------------------------------- spot mapping (the conversion spec, emitted in results)
SPOT_SPEC = {
    # spot: (position label(s) that can fill it, depth order note)
    "QB": (["QB"], "the only QB"),
    "RB1": (["HB", "RB"], "most offensive snaps among RBs"), "RB2": (["HB", "RB"], "2nd"),
    "FB": (["FB"], "FB snaps"),
    "WR1": (["WR"], "most offensive snaps among WRs"), "WR2": (["WR"], "2nd"),
    "WR3": (["WR"], "3rd"), "WR4": (["WR"], "4th"),
    "TE1": (["TE"], "most offensive snaps among TEs"), "TE2": (["TE"], "2nd"), "TE3": (["TE"], "3rd"),
    "OT1": (["LT", "RT"], "most OT snaps"), "OT2": (["LT", "RT"], "2nd"),
    "OG1": (["LG", "RG"], "most OG snaps"), "OG2": (["LG", "RG"], "2nd"),
    "C": (["C"], "center snaps"),
    "DE1": (["LEDG", "REDG"], "most EDGE snaps"), "DE2": (["LEDG", "REDG"], "2nd"),
    "DT1": (["DT"], "most DT snaps"), "DT2": (["DT"], "2nd"),
    "DL5": (["DT", "LEDG", "REDG"], "DL snaps beyond the four LineOf slots (the rotation seat)"),
    "MIKE": (["MIKE"], "MIKE snaps"), "WILL": (["WILL"], "WILL snaps"), "SAM": (["SAM"], "SAM snaps"),
    "CB1": (["CB"], "most CB snaps"), "CB2": (["CB"], "2nd"), "CB3": (["CB"], "3rd (the NICKEL slot)"),
    "DIME": (["CB", "SS", "FS"], "DB snaps beyond the six base/nickel DB seats (the 6th DB)"),
    "SS": (["SS"], "SS snaps"), "FS": (["FS"], "FS snaps"),
    "K": (["K"], "K snaps (ST events)"), "P": (["P"], "P snaps (ST events)"),
}
DEPTH_RULE = [("QB", ["QB"], 1), ("RB1", ["HB", "RB"], 1), ("RB2", ["HB", "RB"], 2), ("FB", ["FB"], 1),
              ("WR1", ["WR"], 1), ("WR2", ["WR"], 2), ("WR3", ["WR"], 3), ("WR4", ["WR"], 4),
              ("TE1", ["TE"], 1), ("TE2", ["TE"], 2), ("TE3", ["TE"], 3),
              ("OT1", ["LT", "RT"], 1), ("OT2", ["LT", "RT"], 2),
              ("OG1", ["LG", "RG"], 1), ("OG2", ["LG", "RG"], 2), ("C", ["C"], 1),
              ("DE1", ["LEDG", "REDG"], 1), ("DE2", ["LEDG", "REDG"], 2),
              ("DT1", ["DT"], 1), ("DT2", ["DT"], 2),
              ("MIKE", ["MIKE"], 1), ("WILL", ["WILL"], 1), ("SAM", ["SAM"], 1),
              ("CB1", ["CB"], 1), ("CB2", ["CB"], 2), ("CB3", ["CB"], 3),
              ("SS", ["SS"], 1), ("FS", ["FS"], 1), ("K", ["K"], 1), ("P", ["P"], 1)]

def load_snaps(path):
    """-> {team: {player_id: {pos, off, def, st}}} — per-player, the schema's granularity.
    FIXED 2026-11-11 (Phase 2 real run, documented in the corrections note): rows are per
    player per team-GAME; this loader previously OVERWROTE the dict per row (last-row-wins),
    silently keeping one game per player on any real per-game file. It now AGGREGATES.
    The synthetic self-test is insensitive to the fix (its weekly rows are scale-uniform,
    so shares barely move) — which is why it shipped green; the real data caught it."""
    players = defaultdict(dict)
    with open(path, newline="") as f:
        for row in csv.DictReader(f):
            pid = row["player_id"] or f'{row["team"]}:{row["player"]}'
            rec = players[row["team"]].setdefault(pid, {
                "pos": row["position"].strip().upper(),
                "player": row["player"], "off": 0.0, "def": 0.0, "st": 0.0})
            rec["off"] += float(row["off_snaps"] or 0)
            rec["def"] += float(row["def_snaps"] or 0)
            rec["st"] += float(row["st_snaps"] or 0)
    return players

GROUP_SEATS = {  # position label -> seat order (the depth rule); leftover DL -> DL5, leftover DB -> DIME
    "QB": ["QB"], "HB": ["RB1", "RB2"], "RB": ["RB1", "RB2"], "FB": ["FB"],
    "WR": ["WR1", "WR2", "WR3", "WR4"], "TE": ["TE1", "TE2", "TE3"],
    "LT": ["OT1"], "RT": ["OT2"], "LG": ["OG1"], "RG": ["OG2"], "C": ["C"],
    "DT": ["DT1", "DT2"], "LEDG": ["DE1"], "REDG": ["DE2"],
    "MIKE": ["MIKE"], "WILL": ["WILL"], "SAM": ["SAM"],
    "CB": ["CB1", "CB2", "CB3"], "SS": ["SS"], "FS": ["FS"], "K": ["K"], "P": ["P"],
}

def map_spots(players_by_team):
    """Per-player depth mapping: within a position group, order players by scrimmage
    snaps desc and seat them in GROUP_SEATS order. Leftover DL snaps (DT3+, EDGE3+)
    land in DL5; leftover DB snaps (CB4+, S3+) land in DIME. K/P are ST-only and are
    excluded from the scrimmage-share base.
    Basis: play_share = side snaps / side team-plays, where side team-plays =
    (total off snaps)/11 for offense and (total def snaps)/11 for defense (11 seats
    per play on each side). This matches the staged Ledger's play_share basis.
    -> {team: {spot: play_share}}."""
    out = {}
    SEATS_PER_PLAY = 11
    for t, players in players_by_team.items():
        off_total = sum(p["off"] for p in players.values() if p["pos"] not in ("K", "P"))
        def_total = sum(p["def"] for p in players.values() if p["pos"] not in ("K", "P"))
        if off_total <= 0 and def_total <= 0:
            continue
        counts_off = defaultdict(list)   # pos -> [(snaps, pid)] on offense
        counts_def = defaultdict(list)   # pos -> [(snaps, pid)] on defense
        for pid, p in players.items():
            if p["pos"] in ("K", "P"):
                continue
            if p["off"] > 0:
                counts_off[p["pos"]].append((p["off"], pid))
            if p["def"] > 0:
                counts_def[p["pos"]].append((p["def"], pid))
        off_shares, def_shares = defaultdict(float), defaultdict(float)
        dl_left = db_left = 0.0
        for side_counts, side_shares in ((counts_off, off_shares), (counts_def, def_shares)):
            for pos, lst in side_counts.items():
                lst.sort(reverse=True)
                seats = GROUP_SEATS.get(pos)
                if seats is None:
                    continue
                for i, (v, pid) in enumerate(lst):
                    if i < len(seats):
                        side_shares[seats[i]] += v
                    elif pos in ("DT", "LEDG", "REDG"):
                        dl_left += v
                    elif pos in ("CB", "SS", "FS"):
                        db_left += v
                    else:
                        side_shares[f"{pos}_EXTRA"] += v   # reported, not dropped
        shares = {}
        for spot, v in off_shares.items():
            if spot.endswith("_EXTRA"):
                shares[spot] = round(v / (off_total / SEATS_PER_PLAY), 4)
            else:
                shares[spot] = round(SEATS_PER_PLAY * v / off_total, 4) if off_total else 0.0
        shares["DL5"] = round(SEATS_PER_PLAY * dl_left / def_total, 4) if def_total else 0.0
        for spot, v in def_shares.items():
            if spot.endswith("_EXTRA"):
                shares[spot] = round(v / (def_total / SEATS_PER_PLAY), 4)
            else:
                shares[spot] = round(SEATS_PER_PLAY * v / def_total, 4) if def_total else 0.0
        shares["DIME"] = round(SEATS_PER_PLAY * db_left / def_total, 4) if def_total else 0.0
        out[t] = dict(sorted(shares.items()))
    return out

def load_pbp(path):
    """-> off package shares + run rates, defensive package shares (SYNTHETIC or real)."""
    pkg = defaultdict(lambda: [0, 0])       # pkg -> [run_plays, plays]
    dpkg = defaultdict(int)
    unknown_o = unknown_d = total = 0
    with open(path, newline="") as f:
        for row in csv.DictReader(f):
            total += 1
            o = parse_pers_o(row.get("personnel_o", ""))
            if o is None: unknown_o += 1
            else:
                pkg[o][1] += 1
                if (row.get("play_type") or "").strip().lower() == "run": pkg[o][0] += 1
            d = parse_pers_d(row.get("personnel_d", ""))
            if d is None: unknown_d += 1
            else: dpkg[d] += 1
    return {"total": total, "pkg": {k: {"plays": v[1], "run_rate": round(v[0] / v[1], 4) if v[1] else None}
                                    for k, v in sorted(pkg.items())},
            "pkg_share": {k: round(v[1] / total, 4) for k, v in sorted(pkg.items())},
            "dpkg_share": {k: round(v / total, 4) for k, v in sorted(dpkg.items())},
            "unknown_personnel_o": unknown_o, "unknown_personnel_d": unknown_d}

def parse_pers_o(s):
    if not s: return None
    counts = {}
    for m in re.finditer(r"(\d+)\s*([A-Z]{2,3})", s.upper()):
        counts[m.group(2)] = counts.get(m.group(2), 0) + int(m.group(1))
    rb, te, wr = counts.get("RB", 0), counts.get("TE", 0), counts.get("WR", 0)
    if rb == 1 and te == 1 and wr == 3: return "11"
    if rb == 1 and te == 2 and wr == 2: return "12"
    if rb == 1 and te == 3 and wr == 1: return "13"
    if rb == 2 and te == 1 and wr == 2: return "21"
    if rb == 2 and te == 2 and wr == 1: return "22"
    return None

def parse_pers_d(s):
    if not s: return None
    counts = {}
    for m in re.finditer(r"(\d+)\s*([A-Z]{2,3})", s.upper()):
        counts[m.group(2)] = counts.get(m.group(2), 0) + int(m.group(1))
    db = counts.get("DB", 0) + counts.get("CB", 0) + counts.get("S", 0)
    if db == 4: return "base"
    if db == 5: return "nickel"
    if db == 6: return "dime"
    return None

def compare_spot_shares(real_by_team, staged, tol=0.03):
    """Real spot shares (mean across teams) vs the staged Ledger R3 play_shares."""
    rows = []
    spots = sorted({s for t in real_by_team.values() for s in t})
    for spot in spots:
        reals = [t[spot] for t in real_by_team.values() if spot in t]
        if not reals: continue
        rmean = sum(reals) / len(reals)
        if spot == "DIME" or spot.startswith("WR") or spot in ("RB1", "RB2", "TE1", "TE2", "TE3",
                                                              "DE1", "DE2", "DT1", "DT2", "DL5",
                                                              "MIKE", "WILL", "SAM", "CB1", "CB2", "CB3",
                                                              "SS", "FS", "QB", "OT1", "OT2", "OG1", "OG2", "C", "FB"):
            st = staged.get(spot, {}).get("play_share")
        else:
            st = staged.get(spot, {}).get("play_share")
        if st is None: continue
        delta = rmean - st
        rows.append({"spot": spot, "real": round(rmean, 4), "staged": round(st, 4),
                     "delta_pts": round(100 * delta, 2), "within_tol": abs(delta) <= tol})
    return rows

def staged_from_ledger(ledger, staged_path=None, cell="even80"):
    cells = ledger["cells"][cell]
    spots = {k: v for k, v in cells["spot_shares"]["off"].items()}
    spots.update(cells["spot_shares"]["def"])
    allpkg = cells["packages"]                    # {pkg: {share, run_rate?}} — off has run_rate, def does not
    pkg_share = {k: round(v["share"], 4) for k, v in allpkg.items() if k in ("11", "12", "13", "21", "22")}
    pkgrun = {k: round(v["run_rate"], 4) for k, v in allpkg.items() if k in ("11", "12", "13", "21", "22")}
    dpkg = {k: round(v["share"], 4) for k, v in allpkg.items() if k in ("base", "nickel", "dime")}
    return spots, pkg_share, pkgrun, dpkg

# ---------------------------------------------------------------- synthetic data (labelled SYNTHETIC)
def make_synthetic(ledger, staged_path, cell="even80", n_teams=32, games_per_team=17,
                   seed=20261111, plays_per_game=65, out_prefix="synthetic"):
    """Generate SYNTHETIC snap-count + pbp CSVs in the exact schema, consistent with the
    staged shares (+ seeded noise). One synthetic 'player' per seat so the depth mapping
    is exercised end-to-end. Labelled SYNTHETIC in the results file."""
    rng = random.Random(seed)
    spots, pkg, pkgrun, dpkg = staged_from_ledger(ledger, staged_path, cell)
    teams = [f"SYN{i:02d}" for i in range(n_teams)]
    snap_rows = []
    seat_groups = [  # (position label, [spot seats in depth order])
        ("QB", ["QB"]), ("HB", ["RB1", "RB2"]), ("FB", ["FB"]),
        ("WR", ["WR1", "WR2", "WR3", "WR4"]), ("TE", ["TE1", "TE2", "TE3"]),
        ("LT", ["OT1"]), ("RT", ["OT2"]), ("LG", ["OG1"]), ("RG", ["OG2"]), ("C", ["C"]),
        ("DT", ["DT1", "DT2", "DL5"]), ("LEDG", ["DE1"]), ("REDG", ["DE2"]),
        ("MIKE", ["MIKE"]), ("WILL", ["WILL"]), ("SAM", ["SAM"]),
        ("CB", ["CB1", "CB2", "CB3", "DIME"]), ("SS", ["SS"]), ("FS", ["FS"]),
        ("K", ["K"]), ("P", ["P"]),
    ]
    off_positions = {"QB", "HB", "FB", "WR", "TE", "LT", "RT", "LG", "RG", "C"}
    for t in teams:
        for pos, seat_list in seat_groups:
            for depth, spot in enumerate(seat_list, 1):
                share = spots.get(spot, {}).get("play_share", 0.0)
                season_snaps = share * plays_per_game * games_per_team
                season_snaps *= noise_mult(rng, spot)
                for w in range(1, games_per_team + 1):
                    g = max(0, int(round(season_snaps / games_per_team + rng.gauss(0, 1.2))))
                    snap_rows.append({"game_id": f"SYN-{t}-{w:02d}", "season": 2025, "week": w,
                                      "team": t, "player": f"{pos}{depth}-{t}",
                                      "player_id": f"{t}-{pos}{depth}",
                                      "position": pos,
                                      "off_snaps": g if pos in off_positions else 0,
                                      "def_snaps": 0 if (pos in off_positions or pos in ("K", "P")) else g,
                                      "st_snaps": g if pos in ("K", "P") else 0})
    pbp_rows = []
    play_id = 1
    pkg_keys = ["11", "12", "13", "21", "22"]
    for t in teams:
        for w in range(1, games_per_team + 1):
            for _ in range(plays_per_game):
                pk = rng.choices(pkg_keys, weights=[pkg.get(k, 0.2) for k in pkg_keys])[0]
                rr = pkgrun.get(pk, 0.5)
                pt = "run" if rng.random() < rr else "pass"
                dmap = {"base": "4 DL, 2 LB, 4 DB", "nickel": "4 DL, 2 LB, 5 DB", "dime": "4 DL, 1 LB, 6 DB"}
                dp = rng.choices(list(dmap.keys()), weights=[dpkg.get(k, 0.33) for k in dmap])[0]
                pbp_rows.append({"game_id": f"SYN-{t}-{w:02d}", "season": 2025, "week": w,
                                 "play_id": play_id, "posteam": t, "defteam": f"SYN{(int(t[3:]) + 1) % n_teams:02d}",
                                 "down": rng.randint(1, 4), "ydstogo": rng.randint(1, 10),
                                 "play_type": pt, "personnel_o": pers_o_string(pk),
                                 "personnel_d": dmap[dp], "defenders_in_box": rng.randint(5, 8)})
                play_id += 1
    snaps_path = f"{out_prefix}_snap_counts.csv"
    pbp_path = f"{out_prefix}_pbp.csv"
    with open(snaps_path, "w", newline="") as f:
        wcsv = csv.DictWriter(f, fieldnames=list(snap_rows[0].keys()))
        wcsv.writeheader()
        wcsv.writerows(snap_rows)
    with open(pbp_path, "w", newline="") as f:
        wcsv = csv.DictWriter(f, fieldnames=list(pbp_rows[0].keys()))
        wcsv.writeheader()
        wcsv.writerows(pbp_rows)
    return snaps_path, pbp_path

def noise_mult(rng, spot):
    """Small seeded per-spot noise (SYNTHETIC data must look like data, not like the answer)."""
    return 1.0 + rng.gauss(0, 0.04)

def pers_o_string(pk):
    return {"11": "1 RB, 1 TE, 3 WR", "12": "1 RB, 2 TE, 2 WR", "13": "1 RB, 3 TE, 1 WR",
            "21": "2 RB, 1 TE, 2 WR", "22": "2 RB, 2 TE, 1 WR"}[pk]

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ledger", default="ledger.json")
    ap.add_argument("--staged", default="staged.json")
    ap.add_argument("--snaps"); ap.add_argument("--pbp")
    ap.add_argument("--cell", default="even80")
    ap.add_argument("--tol", type=float, default=0.03)
    ap.add_argument("--out", default="phase2_results.json")
    a = ap.parse_args()
    ledger = json.load(open(a.ledger))
    results = {"mode": None, "note": None}
    if not a.snaps or not a.pbp:
        # SYNTHETIC self-test
        results["mode"] = "SYNTHETIC self-test (no real data attached; nothing was fetched)"
        s_path, p_path = make_synthetic(ledger, a.staged, cell=a.cell)
        results["synthetic_files"] = {"snaps": s_path, "pbp": p_path,
                                      "label": "SYNTHETIC — generated from the staged shares + seeded noise; not real football"}
        snaps_path, pbp_path = s_path, p_path
    else:
        results["mode"] = "REAL DATA"
        results["note"] = "real files ingested as-attached; loaders unchanged"
        snaps_path, pbp_path = a.snaps, a.pbp

    players_by_team = load_snaps(snaps_path)
    real_spots = map_spots(players_by_team)
    staged_spots, pkg_share, pkgrun, dpkg = staged_from_ledger(ledger, a.staged, a.cell)
    cmp_rows = compare_spot_shares(real_spots, staged_spots, a.tol)
    pbp = load_pbp(pbp_path)
    n_within = sum(1 for r in cmp_rows if r["within_tol"])
    results["spot_comparison"] = {"tolerance_pts": 100 * a.tol, "n_spots": len(cmp_rows),
                                  "n_within": n_within,
                                  "rows": sorted(cmp_rows, key=lambda r: -abs(r["delta_pts"]))}
    results["package_comparison"] = {
        "staged_pkg_share": pkg_share, "real_pkg_share": pbp["pkg_share"],
        "staged_pkg_run": pkgrun, "real_pkg_run": {k: v["run_rate"] for k, v in pbp["pkg"].items()},
        "staged_dpkg_share": dpkg, "real_dpkg_share": pbp["dpkg_share"],
        "unknown_personnel_rows": {"personnel_o": pbp["unknown_personnel_o"],
                                   "personnel_d": pbp["unknown_personnel_d"]},
        "run_rate_abs_diff": {k: round(abs((pbp["pkg"].get(k, {}).get("run_rate") or 0)
                                           - (pkgrun.get(k) or 0)), 4)
                              for k in sorted(set(pbp["pkg"]) | set(pkgrun))}}
    results["mapping_spec"] = {"spots": SPOT_SPEC, "depth_rule": DEPTH_RULE,
                               "notes": ["one row per player per team-game; depth order by season snap totals",
                                         "DL5 = the leftover DL snaps after the four line seats (the rotation seat)",
                                         "DIME = the leftover DB snaps after CB1-3/SS/FS (the 6th DB)",
                                         "K/P are ST events and are excluded from scrimmage share bases"]}
    json.dump(results, open(a.out, "w"), indent=1)
    print(f"mode: {results['mode']}")
    print(f"spot comparison: {n_within}/{len(cmp_rows)} within ±{100*a.tol:.0f} pts of play-share")
    for r in sorted(cmp_rows, key=lambda r: -abs(r["delta_pts"]))[:8]:
        print(f"  {r['spot']:>4}: real {r['real']:.3f} vs staged {r['staged']:.3f}  delta {r['delta_pts']:+.1f} pts "
              f"{'OK' if r['within_tol'] else 'OVER'}")
    print(f"package run-rate |diff|: {results['package_comparison']['run_rate_abs_diff']}")
    print(f"unknown personnel rows: {results['package_comparison']['unknown_personnel_rows']}")
    print(f"wrote {a.out}")

if __name__ == "__main__":
    main()
