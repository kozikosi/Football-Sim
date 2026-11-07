#!/usr/bin/env python3
"""
anchors_2024.py — real-data anchor builder for the Z.ai lab (T1/T3/T4 inputs), 2026-11-08.
Reads hash-pinned nflverse 2024 CSVs (already downloaded from nflverse-data releases;
sha256 printed) and emits real_anchors_2024.json with:
  - group snap shares (T1 L-opportunity rung)
  - per-slot target/EPA/yards shares for receiving slots (T3 volume anchors)
  - depth census: players per team per group with >=100/200/300 snaps (T4 replacement reality)
No engine file is touched. Data stays in /tmp; only the JSON summary + hashes are kept.
"""
import csv, json, hashlib, collections

PS = "/tmp/nflverse/player_stats_season_2024.csv"
SC = "/tmp/nflverse/snap_counts_2024.csv"
DS = "/tmp/nflverse/player_stats_def_2024.csv"
DC = "/tmp/nflverse/depth_charts_2024.csv"
OUT = "/tmp/nflverse/real_anchors_2024.json"

def sha256(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()

SLOT_OF_DEPTH = {"WR": {1: "WR1", 2: "WR2", 3: "WR3"}, "TE": {1: "TE1", 2: "TE2"}, "RB": {1: "RB1", 2: "RB2"}}
GROUP_OF_POS = {"LT": "OL", "RT": "OL", "LG": "OL", "RG": "OL", "C": "OL", "T": "OL", "G": "OL",
                "WR": "WR", "TE": "TE", "HB": "RB", "RB": "RB", "QB": "QB", "FB": "FB",
                "DT": "DL", "REDG": "DL", "LEDG": "DL", "DE": "DL", "NT": "DL",
                "MIKE": "LB", "WILL": "LB", "SAM": "LB", "ILB": "LB", "OLB": "LB", "LB": "LB",
                "CB": "DB", "SS": "DB", "FS": "DB", "S": "DB", "DB": "DB", "NB": "DB",
                "K": "K", "P": "K"}

def main():
    hashes = {p.split("/")[-1]: sha256(p) for p in (PS, SC, DC, DS)}
    print("source sha256:")
    for k, v in hashes.items():
        print(" ", k, v)

    # ---- snap counts: group shares + depth census ----
    grp_snaps = collections.Counter()
    depth_by_team_pos = collections.defaultdict(set)   # (team, group) -> set of players
    snaps_by_player = collections.Counter()
    pos_of_player = {}
    with open(SC, newline="") as f:
        for r in csv.DictReader(f):
            if r["season"] != "2024" or r["game_type"] != "REG":
                continue
            g = GROUP_OF_POS.get(r["position"])
            if not g:
                continue
            o = int(r["offense_snaps"] or 0) + int(r["defense_snaps"] or 0)
            st = int(r["st_snaps"] or 0)
            key = (r["team"], r["player"])
            if o > 0:
                grp_snaps[g] += o
                snaps_by_player[key] += o
                pos_of_player[key] = (r["team"], g)
    # per-team group shares then league mean (avoids big-team bias)
    team_grp = collections.defaultdict(lambda: collections.Counter())
    for (team, player), sn in snaps_by_player.items():
        g = pos_of_player[(team, player)][1]
        team_grp[team][g] += sn
    team_share = {}
    for t, c in team_grp.items():
        tot = sum(c.values())
        if tot > 0:
            team_share[t] = {g: c[g] / tot for g in c}
    groups = sorted(grp_snaps)
    mean_share = {g: sum(ts.get(g, 0) for ts in team_share.values()) / len(team_share) for g in groups}
    print("\nreal 2024 group snap shares (league mean of team shares):")
    for g in groups:
        print(f"  {g:4} {mean_share[g]*100:5.1f}%")

    # depth census: players per team per group with meaningful snap totals
    per_team_counts = collections.defaultdict(lambda: collections.Counter())
    for (team, player), sn in snaps_by_player.items():
        g = pos_of_player[(team, player)][1]
        for thr in (100, 200, 300):
            if sn >= thr:
                per_team_counts[thr][g] += 1 / 32  # league per-team mean
    census = {thr: {g: round(v, 2) for g, v in sorted(c.items())} for thr, c in per_team_counts.items()}
    print("\ndepth census (players with >=N snaps, per-team mean):")
    for thr in sorted(census):
        print(f"  >={thr}: {census[thr]}")

    # ---- receiving slot shares (anchor_demo method, kept byte-compatible in spirit) ----
    depth_votes = collections.defaultdict(collections.Counter)
    name_of = {}
    with open(DC, newline="") as f:
        for r in csv.DictReader(f):
            if r["season"] != "2024" or r["game_type"] != "REG":
                continue
            if r["position"] not in SLOT_OF_DEPTH or r["depth_position"] != r["position"]:
                continue
            if not r["depth_team"] or not r["gsis_id"]:
                continue
            d = int(r["depth_team"])
            if d not in SLOT_OF_DEPTH[r["position"]]:
                continue
            depth_votes[r["gsis_id"]][(r["club_code"], r["position"], d)] += 1
            name_of[r["gsis_id"]] = (r["first_name"] + " " + r["last_name"]).strip()
    player_rows = collections.defaultdict(list)
    with open(PS, newline="") as f:
        for r in csv.DictReader(f):
            if r["season_type"] != "REG":
                continue
            player_rows[(r["player_id"], r["recent_team"])].append(r)
    season_targets = {k: sum(float(r["targets"] or 0) for r in rows) for k, rows in player_rows.items()}
    slot_of_player = {}
    team_slot_players = collections.defaultdict(lambda: collections.defaultdict(list))
    by_team_pos = collections.defaultdict(list)
    for gsis, votes in depth_votes.items():
        (team, pos, d) = votes.most_common(1)[0][0]
        by_team_pos[(team, pos)].append((d, -season_targets.get((gsis, team), 0.0), gsis))
    for (team, pos), lst in by_team_pos.items():
        lst.sort()
        for rank, (_, _, gsis) in enumerate(lst, start=1):
            slot = SLOT_OF_DEPTH[pos].get(rank)
            if slot:
                slot_of_player[gsis] = slot
                team_slot_players[team][slot].append(gsis)
    team_targets = collections.Counter(); team_epa = collections.Counter(); team_yds = collections.Counter()
    slot_targets = collections.defaultdict(collections.Counter)
    slot_epa = collections.defaultdict(collections.Counter)
    slot_yds = collections.defaultdict(collections.Counter)
    for (pid, team), rows in player_rows.items():
        tg = sum(float(r["targets"] or 0) for r in rows)
        ep = sum(float(r["receiving_epa"] or 0) for r in rows)
        yd = sum(float(r["receiving_yards"] or 0) for r in rows)
        team_targets[team] += tg; team_epa[team] += ep; team_yds[team] += yd
        slot = slot_of_player.get(pid)
        if slot is not None and team_slot_players[team].get(slot) and pid in team_slot_players[team][slot]:
            slot_targets[slot][team] += tg; slot_epa[slot][team] += ep; slot_yds[slot][team] += yd
    slots = ["WR1", "WR2", "WR3", "TE1", "TE2", "RB1", "RB2"]
    teams = sorted(team_targets)
    recv = {}
    for s in slots:
        recv[s] = {
            "target_share": round(sum(slot_targets[s][t] / team_targets[t] for t in teams if team_targets[t] > 0) / len(teams), 4),
            "epa_share": round(sum(slot_epa[s][t] / team_epa[t] for t in teams if team_epa[t] > 0) / len(teams), 4),
            "yards_share": round(sum(slot_yds[s][t] / team_yds[t] for t in teams if team_yds[t] > 0) / len(teams), 4),
        }
    print("\nreceiving slot shares (league mean):")
    for s in slots:
        r = recv[s]
        print(f"  {s:4} tgt {r['target_share']*100:5.1f}%  epa {r['epa_share']*100:6.1f}%  yds {r['yards_share']*100:5.1f}%")

    # ---- skill production shares (L-production rung): yard+TD units within skill ----
    # TD counted as 20 yds of value, uniformly for pass/rush/receive (stated rule)
    TD_UNITS = 20
    sk_units = collections.Counter()
    for (pid, team), rows in player_rows.items():
        for r in rows:
            pos = r["position"]
            g = GROUP_OF_POS.get(pos)
            if g not in ("QB", "RB", "WR", "TE"):
                continue
            u = 0.0
            if pos == "QB":
                u += float(r["passing_yards"] or 0) + TD_UNITS * float(r["passing_tds"] or 0)
            if pos in ("HB", "RB"):
                u += float(r["rushing_yards"] or 0) + TD_UNITS * float(r["rushing_tds"] or 0)
                u += float(r["receiving_yards"] or 0) + TD_UNITS * float(r["receiving_tds"] or 0)
            if pos in ("WR", "TE"):
                u += float(r["receiving_yards"] or 0) + TD_UNITS * float(r["receiving_tds"] or 0)
            if u:
                sk_units[g] += u
    tot_sk = sum(sk_units[g] for g in ("QB", "RB", "WR", "TE"))
    skill_shares = {g: round(sk_units[g] / tot_sk, 4) for g in ("QB", "RB", "WR", "TE")}

    # ---- defensive production shares: sacks + INTs by group (nflverse player_stats_def) ----
    df_units = collections.defaultdict(collections.Counter)
    with open(DS, newline="") as f:
        for r in csv.DictReader(f):
            if r["season"] != "2024" or r["season_type"] != "REG":
                continue
            g = GROUP_OF_POS.get(r["position"])
            if g not in ("DL", "LB", "DB"):
                continue
            df_units["sacks"][g] += float(r["def_sacks"] or 0)
            df_units["interceptions"][g] += float(r["def_interceptions"] or 0)
    def_shares = {
        "sacks": {g: round(df_units["sacks"][g] / sum(df_units["sacks"].values()), 4) for g in ("DL", "LB", "DB")},
        "interceptions": {g: round(df_units["interceptions"][g] / sum(df_units["interceptions"].values()), 4) for g in ("DL", "LB", "DB")},
    }
    print("\nskill production shares (yard+TD units, TD=20yds):", skill_shares)
    print("defense production shares:", def_shares)

    doc = {
        "schema": "zai-real-anchors/1",
        "season": 2024,
        "source": {
            "player_stats": hashes["player_stats_season_2024.csv"],
            "snap_counts": hashes["snap_counts_2024.csv"],
            "player_stats_def": hashes["player_stats_def_2024.csv"],
            "depth_charts": hashes["depth_charts_2024.csv"],
            "origin": "github.com/nflverse/nflverse-data releases (downloaded 2026-11-08, offline after pinning)",
        },
        "groups": {g: round(mean_share[g], 4) for g in groups},
        "depth_census": census,
        "receiving_slots": recv,
        "skill_production_shares": skill_shares,
        "defense_production_shares": def_shares,
        "method_notes": [
            "group snap share = league mean of per-team snap shares (REG only, ST snaps excluded)",
            "slot mapping = modal depth-chart rank, ties broken by season targets then gsis_id (anchor_demo rule)",
            "EPA shares can be negative (RB1 2024); never clipped",
            "skill_production_shares: yard+TD units within skill positions (QB pass / RB rush+rec / WR rec / TE rec) — the L-production rung",
            "defense_production_shares: sack and INT units by defensive group (DL/LB/DB) — like-for-like with the engine's def stat lines",
        ],
        "generated": "2026-11-08",
    }
    with open(OUT, "w") as f:
        json.dump(doc, f, indent=1)
    print("\nwrote", OUT)

if __name__ == "__main__":
    main()
