#!/usr/bin/env python3
"""B1 DIAGNOSTIC — the 2020 FB share gap (Z.ai adapter 0.0996 vs MUSE plain filter 0.0736).

Three methods, same file (snap_counts_2020.parquet, game_type=REG):
  A = the shipped v2 adapter (load_snaps_real: season-aggregate, LAST-ROW-WINS position,
      combo labels by first token) -> reproduce 0.0996
  B = MUSE's plain filter (per-row position == 'FB' exactly) -> reproduce 0.0736
  C = per-row first-token FB (combo-aware, no last-row-wins) -> the bridge
Then the player-level diff: who carries FB snaps in A but not in B, with snaps.

Deterministic, read-only on the raw file.
"""
import collections
import pyarrow.parquet as pq

RAW = os.environ.get("NFLVERSE_RAW", "./nflverse-raw")
SEASON = 2020
ST_EVENTS = {"K", "P", "LS", "K/P", "PC", "PR"}


def norm_pos(lab):
    lab = (lab or "").strip().upper()
    if not lab:
        return None
    if lab in ST_EVENTS:
        return lab
    return lab.split("/")[0].strip()


def league_mean(shares):
    return round(sum(shares.values()) / max(len(shares), 1), 4)


def main():
    t = pq.read_table(f"{RAW}/snap_counts_{SEASON}.parquet",
                      columns=["game_id", "game_type", "team", "player", "pfr_player_id",
                               "position", "offense_snaps", "defense_snaps"])
    d = t.to_pydict()
    n = t.num_rows

    # ---- A: the shipped adapter (last-row-wins position, first-token combos)
    players = {}
    for i in range(n):
        if d["game_type"][i] != "REG":
            continue
        pos = norm_pos(d["position"][i])
        if pos is None:
            continue
        key = (d["team"][i], d["pfr_player_id"][i] or d["player"][i])
        p = players.setdefault(key, {"pos": None, "player": "", "off": 0.0, "def": 0.0})
        p["pos"] = pos                      # <-- LAST ROW WINS (the shipped behaviour)
        p["player"] = d["player"][i]
        p["off"] += float(d["offense_snaps"][i] or 0)
        p["def"] += float(d["defense_snaps"][i] or 0)
    fb_off, tot_off = collections.Counter(), collections.Counter()
    for (team, _pid), p in players.items():
        if p["pos"] in ST_EVENTS:
            continue
        tot_off[team] += p["off"]
        if p["pos"] == "FB":
            fb_off[team] += p["off"]
    shares_A = {t_: round(11 * fb_off.get(t_, 0) / tot_off[t_], 4) for t_ in tot_off if tot_off[t_]}
    mean_A = league_mean(shares_A)

    # ---- B: MUSE's plain per-row filter (position string == 'FB' exactly)
    fb_off_B, tot_off_B = collections.Counter(), collections.Counter()
    raw_labels = collections.Counter()
    for i in range(n):
        if d["game_type"][i] != "REG":
            continue
        raw = (d["position"][i] or "").strip().upper()
        if raw in ST_EVENTS or not raw:
            continue
        raw_labels[raw] += 1
        team = d["team"][i]
        off = float(d["offense_snaps"][i] or 0)
        tot_off_B[team] += off
        if raw == "FB":
            fb_off_B[team] += off
    shares_B = {t_: round(11 * fb_off_B.get(t_, 0) / tot_off_B[t_], 4) for t_ in tot_off_B if tot_off_B[t_]}
    mean_B = league_mean(shares_B)

    # ---- C: per-row first-token FB (combo-aware, no last-row-wins)
    fb_off_C = collections.Counter()
    for i in range(n):
        if d["game_type"][i] != "REG":
            continue
        pos = norm_pos(d["position"][i])
        if pos in ST_EVENTS or pos is None:
            continue
        team = d["team"][i]
        off = float(d["offense_snaps"][i] or 0)
        if pos == "FB":
            fb_off_C[team] += off
    shares_C = {t_: round(11 * fb_off_C.get(t_, 0) / tot_off_B[t_], 4) for t_ in tot_off_B if tot_off_B[t_]}
    mean_C = league_mean(shares_C)

    print(f"A shipped adapter (last-row-wins + first-token): {mean_A}")
    print(f"B MUSE plain per-row position=='FB':              {mean_B}")
    print(f"C per-row first-token=='FB':                      {mean_C}")

    # ---- the player-level diff: players whose ADAPTER position is FB vs rows that are FB
    A_fb_snaps = {team: fb_off.get(team, 0) for team in tot_off}
    print("\n-- per-team A vs B (FB offense snaps, share) --")
    for team in sorted(tot_off):
        a, b = A_fb_snaps.get(team, 0), fb_off_B.get(team, 0)
        if abs(a - b) > 1:
            print(f"  {team}: A {a:6.0f} snaps ({shares_A.get(team)})  B {b:6.0f} snaps ({shares_B.get(team)})  diff {a-b:+.0f}")

    # ---- players who are FB-positioned in the ADAPTER (season end label) but whose
    #      per-row FB-labeled snaps differ from their total offense snaps
    print("\n-- players whose label VARIES across games (adapter keeps the last label) --")
    label_sets = collections.defaultdict(set)   # (team,pid) -> set of raw labels
    names = {}
    for i in range(n):
        if d["game_type"][i] != "REG":
            continue
        raw = (d["position"][i] or "").strip().upper()
        if raw in ST_EVENTS or not raw:
            continue
        key = (d["team"][i], d["pfr_player_id"][i] or d["player"][i])
        label_sets[key].add(raw)
        names[key] = d["player"][i]
    interesting = []
    for key, labs in sorted(label_sets.items()):
        normed = {norm_pos(x) for x in labs}
        if len(normed) > 1 and ("FB" in normed or any(x.startswith("FB") for x in labs)):
            # count snaps per label for this player
            per_label = collections.Counter()
            for i in range(n):
                if d["game_type"][i] != "REG":
                    continue
                k2 = (d["team"][i], d["pfr_player_id"][i] or d["player"][i])
                if k2 != key:
                    continue
                raw = (d["position"][i] or "").strip().upper()
                if raw in ST_EVENTS or not raw:
                    continue
                per_label[raw] += float(d["offense_snaps"][i] or 0)
            interesting.append((key, names[key], dict(per_label)))
    for key, name, per in interesting:
        print(f"  {key[0]} {name!r} (pid {key[1]}): {per}   adapter label = "
              f"{players[key]['pos'] if key in players else '?'}")

    # ---- raw label vocabulary of 2020 (non-ST), the combos in particular
    print("\n-- raw position labels containing '/' (2020 REG rows, non-ST) --")
    for lab, c in sorted(raw_labels.items()):
        if "/" in lab:
            print(f"  {lab}: {c} rows")

    # ---- 2025 control: does the same gap exist there? (B said 2025 agrees)
    t25 = pq.read_table(f"{RAW}/snap_counts_2025.parquet",
                        columns=["game_type", "team", "player", "pfr_player_id",
                                 "position", "offense_snaps"])
    d25 = t25.to_pydict()
    fb25_A = collections.Counter(); fb25_B = collections.Counter(); tot25 = collections.Counter()
    players25 = {}
    for i in range(t25.num_rows):
        if d25["game_type"][i] != "REG":
            continue
        raw = (d25["position"][i] or "").strip().upper()
        if raw in ST_EVENTS or not raw:
            continue
        team = d25["team"][i]; off = float(d25["offense_snaps"][i] or 0)
        tot25[team] += off
        if raw == "FB":
            fb25_B[team] += off
        pos = norm_pos(d25["position"][i])
        key = (team, d25["pfr_player_id"][i] or d25["player"][i])
        p = players25.setdefault(key, {"pos": None, "off": 0.0})
        p["pos"] = pos; p["off"] += off
    for (team, _), p in players25.items():
        if p["pos"] == "FB":
            fb25_A[team] += p["off"]
    mean25_A = round(11 * sum(fb25_A.values()) / sum(tot25.values()), 4) if False else league_mean(
        {t_: round(11 * fb25_A.get(t_, 0) / tot25[t_], 4) for t_ in tot25 if tot25[t_]})
    mean25_B = league_mean(
        {t_: round(11 * fb25_B.get(t_, 0) / tot25[t_], 4) for t_ in tot25 if tot25[t_]})
    print(f"\n2025 control: A {mean25_A}  B {mean25_B}  (the two definitions agree in 2025)")

    # ---- all-decade A-vs-B table
    print("\n-- all-decade: A (adapter) vs B (plain per-row FB) --")
    for season in range(2016, 2026):
        ts = pq.read_table(f"{RAW}/snap_counts_{season}.parquet",
                           columns=["game_type", "team", "player", "pfr_player_id",
                                    "position", "offense_snaps"])
        ds = ts.to_pydict()
        fA = collections.Counter(); fB = collections.Counter(); tt = collections.Counter()
        pl = {}
        for i in range(ts.num_rows):
            if ds["game_type"][i] != "REG":
                continue
            raw = (ds["position"][i] or "").strip().upper()
            if raw in ST_EVENTS or not raw:
                continue
            team = ds["team"][i]; off = float(ds["offense_snaps"][i] or 0)
            tt[team] += off
            if raw == "FB":
                fB[team] += off
            pos = norm_pos(ds["position"][i])
            key = (team, ds["pfr_player_id"][i] or ds["player"][i])
            p = pl.setdefault(key, {"pos": None, "off": 0.0})
            p["pos"] = pos; p["off"] += off
        for (team, _), p in pl.items():
            if p["pos"] == "FB":
                fA[team] += p["off"]
        mA = league_mean({t_: round(11 * fA.get(t_, 0) / tt[t_], 4) for t_ in tt if tt[t_]})
        mB = league_mean({t_: round(11 * fB.get(t_, 0) / tt[t_], 4) for t_ in tt if tt[t_]})
        flag = "  <-- GAP" if abs(mA - mB) > 0.005 else ""
        print(f"  {season}: A {mA:.4f}  B {mB:.4f}  diff {mA-mB:+.4f}{flag}")


if __name__ == "__main__":
    main()
