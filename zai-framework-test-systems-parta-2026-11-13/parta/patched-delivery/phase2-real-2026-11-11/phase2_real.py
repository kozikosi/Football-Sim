#!/usr/bin/env python3
"""PHASE 2 REAL RUN — the shipped harness's machine on the real P-344 data (Z.ai, 2026-11-11).

The mapping/comparison functions are the shipped phase2_harness.py's own (imported, unmodified):
  map_spots (via the equivalence-checked real adapter), compare_spot_shares,
  staged_from_ledger, SPOT_SPEC/DEPTH_RULE. The real-mode loaders live here, isolated
  (MUSE-corrected design: only the loaders change; the real columns differ from §1's schema):
  - snap_counts release: offense_snaps/defense_snaps/st_snaps, real NFL position labels,
    plus a game_type column (REG/WC/DIV/CON/SB) — so season_type needs NO pbp join
    (the P-344 INDEX said join; the column is right there — improvement, documented).
  - personnel_o/personnel_d exist ONLY in the pbp_participation release (joined on
    game_id+play_id) — pbp does not carry personnel in ANY season 2016-2025 (verified).
    The harness's §1 schema maps onto the participation join; loaders do that.

Real seat mapping (stated, deterministic, reported in the results) mirrors the shipped
GROUP_SEATS per specific label, and routes only the genuinely generic labels:
    T/OT -> OT1,OT2 ; G/OG -> OG1,OG2 ; C -> C ; leftover OL-family -> <pos>_EXTRA (reported);
    generic OL -> OL_EXTRA (swing/backup; no 6th OL seat in the engine)
    DE -> DE1,DE2 ; DT/NT -> DT1,DT2 ; leftover DE3+/DT3+/NT3+ -> DL5 (the shipped rotation seat);
    generic DL -> DL5 (a rotation lineman IS the DL5 seat)
    CB -> CB1,CB2,CB3 ; SS -> SS ; FS -> FS ; S -> SS,FS (safety pair; both staged 1.0) ;
    leftover CB4+/SS2+/FS2+/S3+ -> DIME (the 6th-DB seat, the shipped rule); generic DB -> DIME
    LB/ILB/OLB/MLB -> MIKE,WILL,SAM (depth order; real seasons do not sub-label LBs) ;
    leftover LB4+ -> LB_EXTRA
    RB/HB -> RB1,RB2 ; FB -> FB ; WR -> WR1-4 ; TE -> TE1-3 ; QB -> QB ; K/P/LS excluded.
  Basis per spot: play_share = 11 x seat snaps / side snap total (the shipped basis).
"""
import argparse, json, sys, collections
import pyarrow.parquet as pq

HARNESS_DIR = "/home/z/my-project/work/ledger-phase2/zai/deliveries/merge-ledger-followups-2026-11-11"
P1_DIR = "/home/z/my-project/work/_agents/zai/deliveries/ledger-phase1-2026-11-11"
RAW = "/home/z/my-project/data/raw"
sys.path.insert(0, HARNESS_DIR)
import phase2_harness as H  # the shipped machine (compare_spot_shares, staged_from_ledger, SPOT_SPEC, DEPTH_RULE)

ST_EVENTS = {"K", "P", "LS", "K/P", "PC", "PR"}
SEATS_PER_PLAY = 11

GROUP_SEATS_REAL = {  # specific-label seats, mirroring the shipped GROUP_SEATS
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
GENERIC_ROUTES = {"OL": "OL_EXTRA", "DL": "DL5", "DB": "DIME"}  # generic labels -> rotation/extra seats
LEFTOVER_TO_DL5 = {"DE", "DT", "NT", "LEDG", "REDG"}            # the shipped leftover rule
LEFTOVER_TO_DIME = {"CB", "SS", "FS", "S"}                      # the shipped leftover rule
EXTRA_OK = {"T", "OT", "G", "OG", "C", "LT", "RT", "LG", "RG", "QB", "RB", "HB", "FB", "WR", "TE",
            "LB", "ILB", "OLB", "MLB"}

def norm_pos(lab):
    """normalize a raw snap_counts position label; ST events pass through; combos take the
    first token as primary; None if empty."""
    lab = (lab or "").strip().upper()
    if not lab: return None
    if lab in ST_EVENTS: return lab
    prim = lab.split("/")[0].strip()
    return prim

def load_snaps_real(season, reg_only=False):
    """-> {(team, pid): {'pos': raw, 'player': .., 'off': .., 'def': ..}} aggregated over the season."""
    t = pq.read_table(f"{RAW}/snap_counts_{season}.parquet",
                      columns=["game_id", "game_type", "team", "player", "pfr_player_id",
                               "position", "offense_snaps", "defense_snaps"])
    d = t.to_pydict()
    players = collections.defaultdict(lambda: {"pos": None, "player": "", "off": 0.0, "def": 0.0})
    skipped_post = 0
    for i in range(t.num_rows):
        if reg_only and d["game_type"][i] != "REG":
            skipped_post += 1
            continue
        pos = norm_pos(d["position"][i])
        if pos is None: continue
        key = (d["team"][i], d["pfr_player_id"][i] or d["player"][i])
        p = players[key]
        p["pos"] = pos; p["player"] = d["player"][i]
        p["off"] += float(d["offense_snaps"][i] or 0); p["def"] += float(d["defense_snaps"][i] or 0)
    return dict(players), skipped_post

STAGED_SEATS_ALL = ["QB", "RB1", "RB2", "FB", "WR1", "WR2", "WR3", "WR4", "TE1", "TE2", "TE3",
                    "OT1", "OT2", "OG1", "OG2", "C", "DE1", "DE2", "DT1", "DT2", "DL5",
                    "MIKE", "WILL", "SAM", "CB1", "CB2", "CB3", "DIME", "SS", "FS"]

def map_spots_real(players_by_team_key):
    """Per-label seat fill with generic-label routing — same math as the shipped map_spots
    (11 x seat snaps / side total). -> {team: {spot: play_share}}"""
    by_team = collections.defaultdict(dict)
    for (team, pid), p in players_by_team_key.items():
        by_team[team][pid] = p
    out = {}
    vocab_used = collections.Counter()
    for team, players in by_team.items():
        off_total = sum(p["off"] for p in players.values() if p["pos"] not in ST_EVENTS)
        def_total = sum(p["def"] for p in players.values() if p["pos"] not in ST_EVENTS)
        if off_total <= 0 and def_total <= 0:
            continue
        counts = collections.defaultdict(lambda: collections.defaultdict(list))  # side -> pos -> [(snaps,pid)]
        for pid, p in players.items():
            if p["pos"] in ST_EVENTS: continue
            vocab_used[p["pos"]] += 1
            if p["off"] > 0: counts["off"][p["pos"]].append((p["off"], pid))
            if p["def"] > 0: counts["def"][p["pos"]].append((p["def"], pid))
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
                shares[spot] = round(SEATS_PER_PLAY * v / total, 4)
            for spot, v in extras.items():
                if spot in ("DL5", "DIME"):
                    if side == "def":
                        shares[spot] = round(SEATS_PER_PLAY * v / total, 4)
                elif spot.endswith("_EXTRA"):
                    shares[spot] = round(v / (total / SEATS_PER_PLAY), 4)
                else:
                    shares[spot] = round(v / (total / SEATS_PER_PLAY), 4)  # unmapped, reported
        # REAL-DATA FIX (Phase 2 real run; documented in the corrections note): the shipped
        # compare_spot_shares means over teams that HAVE the spot key — on the synthetic
        # self-test every team has every seat, so nothing was lost; on real data a seat no
        # FB-labeled player took (e.g. 11 of 32 teams in 2025) would be EXCLUDED from the
        # league mean, a selection bias toward seat-heavy teams. The staged Ledger has every
        # seat on every team, so the apples-to-apples comparator emits every seat key (0.0
        # when the seat never took the field).
        for spot in STAGED_SEATS_ALL:
            shares.setdefault(spot, 0.0)
        out[team] = dict(sorted(shares.items()))
    return out

def equivalence_check():
    """The real adapter must reproduce the shipped mapper's spot shares exactly on the shipped
    SYNTHETIC snaps CSV (same rows -> same 30 spots). Returns (where, max abs diff)."""
    snaps = f"{HARNESS_DIR}/synthetic_snap_counts.csv"
    shipped = H.map_spots(H.load_snaps(snaps))
    real_players = {}
    import csv as _csv
    for row in _csv.DictReader(open(snaps, newline="")):
        pos = norm_pos(row["position"])
        if pos in ST_EVENTS: continue
        p = real_players.setdefault((row["team"], row["player_id"]),
                                    {"pos": pos, "player": row["player"], "off": 0.0, "def": 0.0})
        p["off"] += float(row["off_snaps"] or 0); p["def"] += float(row["def_snaps"] or 0)
    real = map_spots_real(real_players)
    worst = ("", 0.0)
    for team in shipped:
        for spot in set(shipped[team]) | set(real.get(team, {})):
            d = abs(shipped[team].get(spot, 0.0) - real.get(team, {}).get(spot, 0.0))
            if d > worst[1]: worst = (f"{team}:{spot}", d)
    return worst

import re
# Unified personnel parser — the release has TWO grammar eras (verified on the files):
#   2016-2022: "4 DL, 2 LB, 5 DB" (grouped counts)
#   2023-2025: NGS per-position lists, e.g. "3 CB, 2 DE, 2 DT, 1 FS, 1 MLB, 1 OLB, 1 SS"
# Both parse to (dl, lb, db) counts; DB = DB+CB+S+SS+FS+NB+SAF; DL = DL+DE+DT+NT+EDGE.
DB_LABELS = {"DB", "CB", "S", "SS", "FS", "NB", "SAF", "DCB"}
DL_LABELS = {"DL", "DE", "DT", "NT", "EDG", "EDGE"}
LB_LABELS = {"LB", "ILB", "OLB", "MLB", "WLB", "SLB", "BLB"}
def parse_pers_full(s):
    """-> {'dl': int, 'lb': int, 'db': int, 'labels': {...}} or None if unparseable/empty."""
    if not s: return None
    counts = {}
    for m in re.finditer(r"(\d+)\s*([A-Z]{1,4})", s.upper()):
        counts[m.group(2)] = counts.get(m.group(2), 0) + int(m.group(1))
    if not counts: return None
    dl = sum(v for k, v in counts.items() if k in DL_LABELS)
    lb = sum(v for k, v in counts.items() if k in LB_LABELS)
    db = sum(v for k, v in counts.items() if k in DB_LABELS)
    return {"dl": dl, "lb": lb, "db": db, "labels": counts}

def parse_pers_o_compact(s):
    """RB/TE/WR counts -> compact label f'{rb}{te}{wr}' (11 personnel = '113'); None if unparseable."""
    if not s: return None
    counts = {}
    for m in re.finditer(r"(\d+)\s*([A-Z]{2,3})", s.upper()):
        counts[m.group(2)] = counts.get(m.group(2), 0) + int(m.group(1))
    if not counts: return None
    return f"{counts.get('RB', 0)}{counts.get('TE', 0)}{counts.get('WR', 0)}"

def parse_pers_d_dbcount(s):
    """-> int DB count (DB+CB+S, the shipped grammar), None if unparseable."""
    if not s: return None
    counts = {}
    for m in re.finditer(r"(\d+)\s*([A-Z]{2,3})", s.upper()):
        counts[m.group(2)] = counts.get(m.group(2), 0) + int(m.group(1))
    if not counts: return None
    return counts.get("DB", 0) + counts.get("CB", 0) + counts.get("S", 0)

STAGED_PKG_OF = {"113": "11", "122": "12", "131": "13", "212": "21", "221": "22"}

def load_pbp_real(season, reg_only=False):
    """Personnel lives in pbp_participation (joined game_id+play_id); play_type in pbp.
    Basis: pbp play_type in (pass, run) — the off_plays basis (P-344 INDEX §4)."""
    pbp = pq.read_table(f"{RAW}/play_by_play_{season}.parquet",
                        columns=["game_id", "play_id", "season_type", "play_type"]).to_pydict()
    part = pq.read_table(f"{RAW}/pbp_participation_{season}.parquet",
                         columns=["nflverse_game_id", "play_id", "offense_personnel", "defense_personnel"])
    pdd = part.to_pydict()
    pers = {(g, p): (o, d) for g, p, o, d in zip(pdd["nflverse_game_id"], pdd["play_id"],
                                                 pdd["offense_personnel"], pdd["defense_personnel"])}
    pkg = collections.defaultdict(lambda: [0, 0])
    dbn = collections.Counter()
    dln = collections.Counter()
    lbn = collections.Counter()
    unknown_o = unknown_d = n_play = missing_part = 0
    for i in range(len(pbp["game_id"])):
        if reg_only and pbp["season_type"][i] != "REG": continue
        if pbp["play_type"][i] not in ("pass", "run"): continue
        n_play += 1
        key = (pbp["game_id"][i], pbp["play_id"][i])
        po, pdd2 = pers.get(key, (None, None))
        if key not in pers: missing_part += 1
        co = parse_pers_o_compact(po)
        if co is None: unknown_o += 1
        else:
            pkg[co][1] += 1
            if pbp["play_type"][i] == "run": pkg[co][0] += 1
        full = parse_pers_full(pdd2)
        if full is None: unknown_d += 1
        else:
            dbn[full["db"]] += 1; dln[full["dl"]] += 1; lbn[full["lb"]] += 1
    total = max(n_play, 1)
    pkg_share = {k: round(v[1] / total, 4) for k, v in sorted(pkg.items())}
    pkg_run = {STAGED_PKG_OF[k]: round(pkg[k][0] / pkg[k][1], 4) for k in STAGED_PKG_OF if k in pkg and pkg[k][1]}
    db6 = dbn.get(6, 0); db7p = sum(v for k, v in dbn.items() if k > 6)
    dl5p = sum(v for k, v in dln.items() if k >= 5)
    lb4p = sum(v for k, v in lbn.items() if k >= 4)
    return {"season": season, "n_pass_run": n_play, "missing_participation": missing_part,
            "unknown_personnel_o": unknown_o, "unknown_personnel_d": unknown_d,
            "pkg_share_all_labels": pkg_share,
            "pkg_share_staged5": {STAGED_PKG_OF[k]: pkg_share[k] for k in STAGED_PKG_OF if k in pkg_share},
            "pkg_run_staged5": pkg_run, "db_histogram": dict(sorted(dbn.items())),
            "dl_histogram": dict(sorted(dln.items())), "lb_histogram": dict(sorted(lbn.items())),
            "dpkg_share": {"base": round(dbn.get(4, 0) / total, 4), "nickel": round(dbn.get(5, 0) / total, 4),
                           "dime": round((db6 + db7p) / total, 4)},   # dime = >=6 DBs: the 6th DB is on the field
            "dpkg_strict6": round(db6 / total, 4),
            "dl5_play_share": round(dl5p / total, 4),   # share of plays with >=5 DL: the DL5 seat is occupied
            "lb4_front_share": round(lb4p / total, 4)}  # share of plays with >=4 LBs (3-4-ish fronts; 2023+ NGS labels only)

# ---------------------------------------------------------------- B2/B3
def name_abbrev(full):
    toks = (full or "").split()
    if not toks: return None
    last = toks[-1]
    if last.upper().rstrip(".") in ("II", "III", "IV", "JR", "SR") and len(toks) > 1:
        last = toks[-2]
    return f"{toks[0][0].upper()}.{last}"

def wr1_deep_targets(season, reg_only=False, tau_list=(12, 15, 20)):
    """WR1 per team-season by snap-count depth; deep targets = pass attempts with air_yards >= tau
    to the WR1 (abbreviated-name join, collisions counted); concordance vs most-targeted WR."""
    snaps, _ = load_snaps_real(season, reg_only)
    wr_by_team, abbr_map, abbr_coll = collections.defaultdict(list), collections.defaultdict(dict), collections.Counter()
    for (team, pid), p in snaps.items():
        if p["pos"] in ("WR",) and p["off"] > 0:
            wr_by_team[team].append((p["off"], pid, p["player"]))
            ab = name_abbrev(p["player"])
            if ab:
                if ab in abbr_map[team] and abbr_map[team][ab][0] != pid: abbr_coll[team] += 1
                else: abbr_map[team][ab] = (pid, p["player"])
    wr1 = {t: max(v)[1] for t, v in wr_by_team.items() if v}
    wr1_name = {t: max(v)[2] for t, v in wr_by_team.items() if v}
    pbp = pq.read_table(f"{RAW}/play_by_play_{season}.parquet",
                        columns=["game_id", "season_type", "posteam", "pass_attempt", "air_yards",
                                 "receiver_player_name"]).to_pydict()
    tg = collections.defaultdict(lambda: {"targets": 0, **{f"deep{t}": 0 for t in tau_list}})
    rec_targets = collections.Counter()
    n_unmatched = 0
    for i in range(len(pbp["game_id"])):
        if reg_only and pbp["season_type"][i] != "REG": continue
        t = pbp["posteam"][i]
        if not t or not pbp["pass_attempt"][i]: continue
        rn = pbp["receiver_player_name"][i] or ""
        rec_targets[(t, rn)] += 1
        if wr1.get(t) is None: continue
        if rn not in abbr_map[t]: n_unmatched += 1; continue
        if abbr_map[t][rn][0] != wr1[t]: continue
        g = tg[(t, pbp["game_id"][i])]
        g["targets"] += 1
        ay = pbp["air_yards"][i]
        ay = float(ay) if ay is not None else -1.0
        for tau in tau_list:
            if ay >= tau: g[f"deep{tau}"] += 1
    n_games = collections.Counter()
    seen = set()
    for i in range(len(pbp["game_id"])):
        if reg_only and pbp["season_type"][i] != "REG": continue
        k = (pbp["posteam"][i], pbp["game_id"][i])
        if k not in seen and k[0]:
            seen.add(k); n_games[k[0]] += 1
    acc = {"targets": [], **{f"deep{t}": [] for t in tau_list}}
    for (t, g), v in tg.items():
        if n_games.get(t):
            # each tg key IS one team-game: append the counts directly (the v/n_games
            # division here was the 16x deflation bug, fixed 2026-11-11)
            for k in acc: acc[k].append(v[k])
    conc = miss = 0
    for t in n_games:
        cand = [(c, ab) for (tt, ab), c in rec_targets.items() if tt == t and ab in abbr_map[t]]
        if not cand: continue
        if wr1.get(t) == abbr_map[t][max(cand)[1]][0]: conc += 1
        else: miss += 1
    return {"season": season, "n_teams": len(n_games),
            "wr1_targets_per_tg": round(sum(acc["targets"]) / max(len(acc["targets"]), 1), 3),
            "deep_per_tg": {tau: round(sum(acc[f"deep{tau}"]) / max(len(acc[f"deep{tau}"]), 1), 3) for tau in tau_list},
            "concordance_snapWR1_vs_mosttargeted": {"match": conc, "differ": miss,
                                                    "rate": round(conc / max(conc + miss, 1), 3)},
            "abbr_unmatched_passes": n_unmatched, "abbr_collisions": dict(abbr_coll),
            "wr1_by_snaps_names": {t: wr1_name[t] for t in sorted(wr1_name)}}

def fb_shares(season, reg_only=False):
    """FB seat share = 11 x FB-labeled snaps / offensive snaps, per team. Mean is over ALL
    teams (zeros included — teams without an FB-labeled player count as 0, no selection bias).
    CAVEAT (verified on the data): the release's position label is the player's listed
    position, and some de facto backs carry it (e.g. KC 2016: Spencer Ware 544 FB-labeled
    snaps — a lead-back season). The measure is 'share of plays with an FB-labeled player
    on the field', which is the real counterpart of the engine's FB seat; label noise is
    reported via the distribution stats, not tuned away."""
    snaps, _ = load_snaps_real(season, reg_only)
    fb_off = collections.Counter(); tot_off = collections.Counter()
    for (team, pid), p in snaps.items():
        if p["pos"] in ST_EVENTS: continue
        tot_off[team] += p["off"]
        if p["pos"] == "FB": fb_off[team] += p["off"]
    shares = {t: round(11 * fb_off.get(t, 0) / tot_off[t], 4) for t in tot_off if tot_off[t]}
    nonzero = sorted(v for v in shares.values() if v > 0)
    return {"league_mean_all_teams": round(sum(shares.values()) / max(len(shares), 1), 4),
            "n_teams": len(shares), "n_teams_with_fb": len(nonzero),
            "median_among_fb_teams": round(nonzero[len(nonzero) // 2], 4) if nonzero else 0.0,
            "min_among_fb_teams": round(nonzero[0], 4) if nonzero else 0.0,
            "max_among_fb_teams": round(nonzero[-1], 4) if nonzero else 0.0,
            "per_team": shares}

REGIME = {2016: "touchback spot 20->25 (2-yr trial)", 2017: "regular-season OT 15->10 min",
          2018: "kickoff overhaul + lowering-the-helmet + TB-25 permanent",
          2020: "playoffs 12->14 teams", 2021: "17-game regular season",
          2022: "playoff OT both-possess", 2023: "fair-catch inside the 25 (1-yr)",
          2024: "dynamic kickoff trial (TB 30)", 2025: "DK permanent + TB 35 + reg-season OT both-possess"}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--reg-only", action="store_true", help="restrict to regular season (primary)")
    ap.add_argument("--tau", default="12,15,20")
    ap.add_argument("--out", default="phase2_real_results.json")
    a = ap.parse_args()
    tau_list = tuple(int(x) for x in a.tau.split(","))
    reg_only = a.reg_only
    results = {"mode": f"REAL DATA — nflverse P-344 release, 30/30 files sha256-verified against the manifest; "
                       f"basis: {'regular season only (game_type=REG)' if reg_only else 'all games (regular+playoffs)'}",
               "staged_cell": "even80", "tolerance_pts": 3.0}
    eq = equivalence_check()
    results["loader_equivalence_check"] = {
        "what": "the real per-label adapter reproduces the shipped map_spots on the shipped SYNTHETIC snaps",
        "max_abs_share_diff": eq[1], "at": eq[0], "pass": eq[1] < 1e-6}
    ledger = json.load(open(f"{P1_DIR}/ledger.json"))
    staged_spots, pkg_share, pkgrun, dpkg = H.staged_from_ledger(ledger, None, "even80")
    seasons = list(range(2016, 2026))
    # per-season runs
    spot_rows, pkg_rows, skipped_post_by_season = [], [], {}
    pooled = {}
    for s in seasons:
        snaps, skipped = load_snaps_real(s, reg_only)
        skipped_post_by_season[s] = skipped
        real = map_spots_real(snaps)
        for t, sh in real.items(): pooled[f"{s}:{t}"] = sh
        for r in H.compare_spot_shares(real, staged_spots, 0.03):
            spot_rows.append(dict(season=s, **r))
        pkg_rows.append(load_pbp_real(s, reg_only))
    # per-season rows: drop the snap-seat-hour DIME/DL5 rows, append per-play measures
    spot_rows = [r for r in spot_rows if r["spot"] not in ("DIME", "DL5")]
    for p in pkg_rows:
        for spot, real, basis in (("DIME", p["dpkg_share"]["dime"], "per-play >=6 DBs"),
                                  ("DL5", p["dl5_play_share"], "per-play >=5 DL (mapping-limited)")):
            st = staged_spots.get(spot, {}).get("play_share")
            spot_rows.append({"season": p["season"], "spot": spot, "real": real, "staged": round(st, 4),
                              "delta_pts": round(100 * (real - st), 2), "within_tol": abs(real - st) <= 0.03,
                              "basis": basis})
    pooled_rows = H.compare_spot_shares(pooled, staged_spots, 0.03)
    # DIME/DL5 snap-seat measures are SEAT-HOURS (multi-player leftovers dump into one seat;
    # they can exceed 1.0 with rotations) — NOT comparable to the staged play-shares. Remove
    # them from the tolerance table and compare the PER-PLAY package measures instead
    # (DIME = share of plays with >=6 DBs; DL5 = share with >=5 DL — the seat-occupancy
    # comparators), with the seat-hours values reported alongside as the rotation measure.
    pooled_rows = [r for r in pooled_rows if r["spot"] not in ("DIME", "DL5")]
    n_team_seasons = len(pooled)
    pp = [p for p in pkg_rows]
    dime_real = round(sum(p["dpkg_share"]["dime"] for p in pp) / max(len(pp), 1), 4)
    dl5_real = round(sum(p["dl5_play_share"] for p in pp) / max(len(pp), 1), 4)
    dime_hrs = round(sum(t.get("DIME", 0) for t in pooled.values()) / max(n_team_seasons, 1), 4)
    dl5_hrs = round(sum(t.get("DL5", 0) for t in pooled.values()) / max(n_team_seasons, 1), 4)
    for spot, real, basis in (("DIME", dime_real, "per-play share of >=6-DB packages (participation personnel_d)"),
                              ("DL5", dl5_real, "per-play share of >=5-DL packages (mapping-limited: the engine's DL5 is a DT2-substitution seat; see report)")):
        st = staged_spots.get(spot, {}).get("play_share")
        if st is None: continue
        pooled_rows.append({"spot": spot, "real": real, "staged": round(st, 4),
                            "delta_pts": round(100 * (real - st), 2), "within_tol": abs(real - st) <= 0.03,
                            "basis": basis})
    results["dime_dl5_seat_hours_pooled"] = {"DIME": dime_hrs, "DL5": dl5_hrs,
        "note": "seat-hours = leftover snaps (snap_counts) beyond the named seats, per play; can exceed 1.0 "
                "with rotations — the rotation measure, not a seat-occupancy share. The real per-play "
                "occupancy comparators are the dl5_play_share / dpkg_share.dime fields."}
    results["spot_comparison_pooled_all_seasons"] = {"n_team_seasons": n_team_seasons, "rows": pooled_rows}
    results["spot_comparison_by_season"] = spot_rows
    results["package_comparison_by_season"] = pkg_rows
    results["staged_pkg_share"] = pkg_share
    results["staged_pkg_run"] = pkgrun
    results["staged_dpkg_share"] = dpkg
    results["snap_rows_skipped_post_by_season"] = skipped_post_by_season
    results["b3_fb_share_by_season"] = {s: fb_shares(s, reg_only) for s in seasons}
    results["b3_fb_share_league_mean"] = {s: v["league_mean_all_teams"]
                                          for s, v in results["b3_fb_share_by_season"].items()}
    results["b2_wr1_deep_targets"] = {s: wr1_deep_targets(s, reg_only, tau_list) for s in seasons}
    results["regime_labels"] = REGIME
    results["mapping_spec"] = {"shipped_spots": H.SPOT_SPEC, "shipped_depth_rule": H.DEPTH_RULE,
        "real_adaptation": {"group_seats_real": GROUP_SEATS_REAL, "generic_routes": GENERIC_ROUTES,
                            "leftover_to_DL5": sorted(LEFTOVER_TO_DL5), "leftover_to_DIME": sorted(LEFTOVER_TO_DIME),
                            "combo_labels": "first token of X/Y is primary",
                            "st_events_excluded": sorted(ST_EVENTS),
                            "note": "seats mirror the shipped GROUP_SEATS per specific label; only the genuinely "
                                    "generic real labels are routed (generic OL->OL_EXTRA, DL->DL5, DB->DIME; "
                                    "S covers the SS/FS pair, which the Ledger stages at 1.0/1.0); the adapter is "
                                    "equivalence-checked against the shipped mapper on the synthetic files"}}
    json.dump(results, open(a.out, "w"), indent=1)
    print(f"mode: {results['mode']}")
    print(f"loader equivalence vs shipped map_spots on SYNTHETIC: max diff {eq[1]:.6f} ({eq[0]}) -> {'PASS' if eq[1] < 1e-6 else 'FAIL'}")
    pr = sorted(pooled_rows, key=lambda r: -abs(r["delta_pts"]))
    n_within = sum(1 for r in pooled_rows if r["within_tol"])
    print(f"POOLED 2016-2025 spot comparison: {n_within}/{len(pooled_rows)} within ±3 pts")
    for r in pr[:10]:
        print(f"  {r['spot']:>4}: real {r['real']:.3f} vs staged {r['staged']:.3f}  delta {r['delta_pts']:+.1f} pts {'OK' if r['within_tol'] else 'OVER'}")
    print("\nB1 DIME (dime = >=6 DBs, from participation personnel_d) by season vs staged 0.0694:")
    for p in pkg_rows:
        print(f"  {p['season']}: base {p['dpkg_share']['base']:.3f} nickel {p['dpkg_share']['nickel']:.3f} "
              f"dime {p['dpkg_share']['dime']:.3f} (strict6 {p['dpkg_strict6']:.3f}) DL5>=5DL {p['dl5_play_share']:.3f} "
              f"unknown_d {p['unknown_personnel_d']}/{p['n_pass_run']}")
    print("\nB3 FB play share by season vs staged 0.1265:")
    for s, v in results["b3_fb_share_league_mean"].items(): print(f"  {s}: {v:.4f}")
    print("\nB2 WR1 deep targets/team-game by season:")
    for s, v in results["b2_wr1_deep_targets"].items():
        print(f"  {s}: " + " ".join(f"deep{t} {v['deep_per_tg'][t]:.2f}" for t in tau_list)
              + f"  targets/tg {v['wr1_targets_per_tg']:.1f}  conc {v['concordance_snapWR1_vs_mosttargeted']['rate']}")
    print(f"\nwrote {a.out}")

if __name__ == "__main__":
    main()
