#!/usr/bin/env python3
"""
anchor_demo_2024.py — Z.ai (High Councillor) demonstration of a data-derived anchor.

Compares the Owner's salary-based slot weights against REAL 2024 NFL receiving
volume, using two public nflverse datasets:
  - depth_charts_2024.csv   (nflverse-data releases, "depth_charts" tag)
  - player_stats_season_2024.csv (nflverse-data releases, "player_stats" tag)

Method:
  1. Map each player to his modal (team, position, depth_team) across REG weeks.
     Slot = position + depth: WR1/WR2/WR3, TE1/TE2, RB1/RB2.
  2. Per team: slot share of team targets and of team receiving EPA.
  3. League mean per slot; same shares computed for the Owner's weight table.
  4. Spearman rank correlation between the two share vectors.

Raw data stays out of git; sha256 of each source file is printed for provenance.
"""
import csv, hashlib, statistics, collections

PS = "/tmp/player_stats_2024.csv"
DC = "/tmp/depth_charts_2024.csv"

def sha256(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()

# ---- Owner's table (from the Owner's 7 Nov message; salary weights, display layer) ----
OWNER = {"WR1": 650, "WR2": 400, "WR3": 100, "TE1": 250, "TE2": 150, "RB1": 250, "RB2": 100}

SLOT_OF_DEPTH = {"WR": {1: "WR1", 2: "WR2", 3: "WR3"}, "TE": {1: "TE1", 2: "TE2"}, "RB": {1: "RB1", 2: "RB2"}}

def main():
    print("source sha256:")
    print("  player_stats_2024.csv", sha256(PS))
    print("  depth_charts_2024.csv", sha256(DC))

    # ---- depth charts: modal depth per player (receiver listings only, returner rows excluded) ----
    depth_votes = collections.defaultdict(collections.Counter)  # gsis -> Counter((team,pos,depth))
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

    # ---- player stats: season aggregates (REG), grouped per player-team (targets used
    #      only as the tie-break when a depth chart lists two players at the same rank) ----
    player_rows = collections.defaultdict(list)  # (player_id, team) -> rows
    with open(PS, newline="") as f:
        for r in csv.DictReader(f):
            if r["season_type"] != "REG":
                continue
            player_rows[(r["player_id"], r["recent_team"])].append(r)
    season_targets = {}
    for (pid, team), rows in player_rows.items():
        season_targets[(pid, team)] = sum(float(r["targets"] or 0) for r in rows)

    # ---- slot assignment: per (team, position) rank players by modal depth; ties broken
    #      by season targets (documented rule), then gsis_id for determinism ----
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

    # ---- player stats: season aggregates (REG), grouped per player-team ----
    team_targets = collections.Counter()
    team_epa = collections.Counter()
    team_yds = collections.Counter()
    slot_targets = collections.defaultdict(collections.Counter)   # slot -> team -> sum
    slot_epa = collections.defaultdict(collections.Counter)
    slot_yds = collections.defaultdict(collections.Counter)
    player_rows = collections.defaultdict(list)  # (player_id, team) -> rows
    with open(PS, newline="") as f:
        for r in csv.DictReader(f):
            if r["season_type"] != "REG":
                continue
            player_rows[(r["player_id"], r["recent_team"])].append(r)
    # merge duplicate rows (traded players have one row per team)
    for (pid, team), rows in player_rows.items():
        tg = sum(float(r["targets"] or 0) for r in rows)
        ep = sum(float(r["receiving_epa"] or 0) for r in rows)
        yd = sum(float(r["receiving_yards"] or 0) for r in rows)
        team_targets[team] += tg; team_epa[team] += ep; team_yds[team] += yd
        slot = slot_of_player.get(pid)
        if slot is not None and team_slot_players[team].get(slot) and pid in team_slot_players[team][slot]:
            slot_targets[slot][team] += tg
            slot_epa[slot][team] += ep
            slot_yds[slot][team] += yd

    slots = ["WR1", "WR2", "WR3", "TE1", "TE2", "RB1", "RB2"]
    teams = sorted(team_targets)
    print(f"\nteams with data: {len(teams)}")

    print(f"\n{'slot':4} {'tgt share':>10} {'epa share':>10} {'yds share':>10}   {'owner wt share':>14}")
    out = []
    for s in slots:
        ts = [slot_targets[s][t] / team_targets[t] for t in teams if team_targets[t] > 0]
        es = [slot_epa[s][t] / team_epa[t] for t in teams if team_epa[t] > 0]
        ys = [slot_yds[s][t] / team_yds[t] for t in teams if team_yds[t] > 0]
        ow = OWNER[s] / sum(OWNER.values())
        row = (s, statistics.mean(ts), statistics.mean(es), statistics.mean(ys), ow)
        out.append(row)
        print(f"{s:4} {row[1]*100:9.1f}% {row[2]*100:9.1f}% {row[3]*100:9.1f}%   {row[4]*100:13.1f}%")

    # Spearman rank correlation real target share vs owner share
    def ranks(v):
        order = sorted(range(len(v)), key=lambda i: v[i])
        r = [0] * len(v)
        for rank, i in enumerate(order): r[i] = rank + 1
        return r
    real = [r[1] for r in out]; own = [r[4] for r in out]
    ra, rb = ranks(real), ranks(own)
    n = len(real)
    d2 = sum((a - b) ** 2 for a, b in zip(ra, rb))
    rho = 1 - 6 * d2 / (n * (n * n - 1))
    print(f"\nSpearman rho (real target share vs owner weight share): {rho:.3f}")

    # McBride-class check: top TEs by targets vs slot averages
    te_rows = []
    for (pid, team), rows in player_rows.items():
        if slot_of_player.get(pid) in ("TE1", "TE2"):
            tg = sum(float(r["targets"] or 0) for r in rows)
            if tg >= 80:
                te_rows.append((name_of.get(pid, pid), team, slot_of_player[pid], tg))
    print("\nTEs with 80+ targets (2024), vs slot mean target share:")
    team_tt = {t: team_targets[t] for t in team_targets}
    for nm, tm, sl, tg in sorted(te_rows, key=lambda x: -x[3])[:8]:
        print(f"  {nm:22} {tm} {sl} {tg:5.0f} tgt = {tg/team_tt[tm]*100:4.1f}% of team targets")
    wr1_mean = statistics.mean(slot_targets["WR1"][t] / team_targets[t] for t in teams)
    print(f"  (league WR1 mean target share: {wr1_mean*100:.1f}%)")

    with open("/home/z/my-project/download/anchor_demo_2024_results.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["slot", "real_target_share", "real_recv_epa_share", "real_yards_share", "owner_weight_share"])
        for s, a, b, c, d in out:
            w.writerow([s, f"{a:.4f}", f"{b:.4f}", f"{c:.4f}", f"{d:.4f}"])
    print("\nwrote /home/z/my-project/download/anchor_demo_2024_results.csv")

if __name__ == "__main__":
    main()
