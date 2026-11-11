#!/usr/bin/env python3
"""STAGE PLAYS — the Play Ledger's staging engine (Phase 1: the snap ledger).

Z.ai (seat ZAI) for MUSE's ledger-phase1 prompt, 2026-11-11. PLAYLED-powered: the play shapes,
personnel tables and attribution machinery are the PLAYLED prototype's; what changes is the
ANCHOR — the drive engine's realised totals are the truth, and plays are staged INSIDE each
drive so that they sum to them exactly (the Ledger's conservation law):

    sum(run gains)   == team rush      (engine channel, integer yards)
    sum(cmp gains)   == team pass      (engine convention: pass is GROSS of sack yardage — drives.ts
                                          never subtracts sacks from pass; sack gains are staged for
                                          story and excluded from the sum [report I-2])
    sum(scrim plays) == team plays     (sacks included)
    sack count       == team sacks
    scoring events   == team score     (TD 6 + conv / FG 3; opp points = defTD 7 / safety 2)

Inputs : engine_games.json — GameResults recorded by run_engine.ts from the REAL Architect engine
         (read-only worktree; no engine file touched).
Output : staged.json — per-game purity rows, per-side snap/package/gravity counters, K/P events,
         artifact notes, and a full play-by-play sample per cell.

Determinism: mulberry32 (the engine's own Rng, ported) seeded per game+side+drive. Same seed ->
same staged plays, byte-identical.
Usage:  python3 stage_plays.py engine_games.json staged.json
"""
import argparse, json, math

# ----------------------------------------------------------------------------- seeded rng (engine's mulberry32, ported — same as PLAYLED)
class Rng:
    __slots__ = ("a", "spare")
    def __init__(self, seed):
        self.a = seed & 0xFFFFFFFF
        self.spare = None
    def next(self):
        self.a = (self.a + 0x6D2B79F5) & 0xFFFFFFFF
        t = self.a
        t = ((t ^ (t >> 15)) * (t | 1)) & 0xFFFFFFFF
        t = (t ^ (t + ((t ^ (t >> 7)) * (t | 61)) & 0xFFFFFFFF)) & 0xFFFFFFFF
        return ((t ^ (t >> 14)) & 0xFFFFFFFF) / 4294967296.0
    def normal(self):
        if self.spare is not None:
            s = self.spare; self.spare = None; return s
        u = 0.0
        while u == 0.0: u = self.next()
        v = self.next()
        m = math.sqrt(-2.0 * math.log(u))
        self.spare = m * math.sin(2.0 * math.pi * v)
        return m * math.cos(2.0 * math.pi * v)
    def wpick(self, ws):
        t = sum(ws); r = self.next() * t
        for i, w in enumerate(ws):
            r -= w
            if r < 0: return i
        return len(ws) - 1

def clamp(x, lo, hi): return max(lo, min(hi, x))

# ----------------------------------------------------------------------------- PLAYLED play-shape constants (provenance: PLAYLED, unchanged)
RUN_MIX = {"p_stuff": 0.27, "stuff_mu": -1.0, "stuff_sd": 1.7,
           "p_mid": 0.63, "mid_mu": 3.9, "mid_sd": 2.8,
           "p_break": 0.10, "break_base": 6.0, "break_exp": 10.5}          # INFERRED (PLAYLED)
CMP_MIX = {"p_short": 0.64, "short_mu": 7.3, "short_sd": 3.8,
           "p_med": 0.36, "med_mu": 14.5, "med_sd": 4.6}                    # INFERRED (PLAYLED)
PKG_OFF_RUN  = {"11": 0.34, "12": 0.20, "13": 0.06, "21": 0.22, "22": 0.18} # INFERRED (PLAYLED)
PKG_OFF_PASS = {"11": 0.62, "12": 0.16, "13": 0.04, "21": 0.10, "22": 0.08} # INFERRED (PLAYLED)
PKG_OFF_LONG = {"11": 0.78, "12": 0.08, "13": 0.02, "21": 0.06, "22": 0.06} # INFERRED (PLAYLED)
PKG_DEF_EARLY = {"base": 0.42, "nickel": 0.55, "dime": 0.03}                # INFERRED (PLAYLED)
PKG_DEF_3RD   = {"base": 0.26, "nickel": 0.62, "dime": 0.12}                # INFERRED (PLAYLED)
PKG_DEF_LONG  = {"base": 0.12, "nickel": 0.55, "dime": 0.33}                # INFERRED (PLAYLED)
TARGET_SHARES = {"WR1": 0.26, "WR2": 0.19, "WR3": 0.13, "TE1": 0.17, "TE2": 0.06, "RB1": 0.15, "RB2": 0.04}  # INFERRED (PLAYLED)
CARRY_SHARES = {"RB1": 0.74, "RB2": 0.16, "FB": 0.05, "WR1": 0.05}          # INFERRED (PLAYLED)
TACKLE_SHARES = {"ILB": 0.22, "OLB": 0.18, "DL": 0.14, "CB": 0.21, "SS": 0.12, "FS": 0.07, "NICKEL": 0.06}   # INFERRED (PLAYLED)
GRAVITY = {"wr1_base": 0.22, "wr1_weak": 0.12, "wr1_strong": -0.08, "dt1": 0.50, "de1": 0.30}                # INFERRED (PLAYLED placeholders)
RUSH_W = {"DE1": .583, "DE2": .255, "DT1": .303, "DT2": .182, "DL5": .114, "MIKE": .053, "WILL": .03}  # engine passRush spec
PLAN_PERS_BOOST = 0.15   # INFERRED: the engine's chosen plan personnel is boosted in the package mix

# ----------------------------------------------------------------------------- staging rules (the report's S-rules)
YP_CARRY, Y_CATCH, Y_PASS_PLAY = 4.35, 11.3, 6.55   # INFERRED plausibility anchors (real-NFL shapes)
INC_RATE_ANCHOR = 0.40                               # INFERRED
RUN_LO, RUN_HI, CMP_LO, CMP_HI = -6.0, 95.0, -2.0, 95.0
SACK_GAIN_MU, SACK_GAIN_SD = -7.0, 2.0               # INFERRED (staged, excluded from the pass sum, I-2)
DL5_P_BASE, DL5_P_SHORT, DL5_P_GOAL = 0.30, 0.20, 0.15   # INFERRED parameters, anchored to the engine's
                                                          # MEASURED DL5_SHARE balanced = 0.33 (slots.ts)
FB_SECOND_BACK = 0.60    # INFERRED (I-4): FB takes the second-back spot in 21/22 personnel
RB2_BREATHER = 0.28      # INFERRED: RB2 rotation share of the single-back spot in 11/12/13
TE3_TWELVE = 0.25        # INFERRED: TE3 rotation share of the second-TE spot in 12/22
WR4_Z_SHARE = 0.32       # INFERRED: WR4 rotation share of the Z spot in 11 personnel

OFF_PACKAGES = {   # PLAYLED templates with the FB gap fixed (I-4): the "RB2" line in 21/22 is the FB spot
    "11": ["QB", "RB1", "WR1", "WR2", "WR3", "TE1", "OT1", "OT2", "OG1", "OG2", "C"],
    "12": ["QB", "RB1", "WR1", "WR2", "TE1", "TE2", "OT1", "OT2", "OG1", "OG2", "C"],
    "13": ["QB", "RB1", "TE1", "TE2", "TE3", "WR1", "OT1", "OT2", "OG1", "OG2", "C"],
    "21": ["QB", "RB1", "RB2", "WR1", "WR2", "TE1", "OT1", "OT2", "OG1", "OG2", "C"],
    "22": ["QB", "RB1", "RB2", "TE1", "TE2", "WR1", "OT1", "OT2", "OG1", "OG2", "C"],
}
DEF_PACKAGES = {
    "base":   ["DE1", "DE2", "DT1", "DT2", "MIKE", "WILL", "SAM", "CB1", "CB2", "SS", "FS"],
    "nickel": ["DE1", "DE2", "DT1", "DT2", "MIKE", "WILL", "CB1", "CB2", "CB3", "SS", "FS"],
    "dime":   ["DE1", "DE2", "DT1", "DT2", "MIKE", "CB1", "CB2", "CB3", "DIME", "SS", "FS"],
}
TACKLE_MAP = {"ILB": ["MIKE"], "OLB": ["WILL", "SAM"], "DL": ["DT1", "DT2", "DE1", "DE2", "DL5"],
              "CB": ["CB1", "CB2"], "SS": ["SS"], "FS": ["FS"], "NICKEL": ["CB3", "DIME"]}

def rebalance(gains, lo, hi, target):
    """Move a channel's gains so they sum EXACTLY to `target`, each within [lo, hi].
    Returns the unplaceable residual (0.0 when the closure is exact)."""
    n = len(gains)
    if n == 0:
        return target
    for _ in range(400):
        delta = target - sum(gains)
        if abs(delta) < 1e-9:
            return 0.0
        room = [(hi - g) if delta > 0 else (g - lo) for g in gains]
        cap = sum(room)
        if cap <= 1e-9:
            return delta
        share = min(1.0, abs(delta) / cap)
        for i in range(n):
            gains[i] += (room[i] * share) if delta > 0 else -(room[i] * share)
    return target - sum(gains)

def choose_split(rush, pass_y, n_scrim, int_flag):
    """Pick n_run (then n_cmp, n_inc) by plausibility cost. Anchors INFERRED."""
    best = None
    for n_run in range(0, n_scrim - int_flag + 1):   # the INT play needs a scrimmage slot
        n_pass = n_scrim - n_run
        room = n_pass - int_flag
        cost = 0.0
        if n_run == 0:
            cost += 0.0 if rush == 0 else (50.0 + rush)          # unplaceable run yards: never acceptable
        else:
            cost += abs(rush / n_run - YP_CARRY) / YP_CARRY
        if room < 0:
            cost += 50.0
        elif pass_y <= 0:
            cost += 0.0
        elif room == 0:
            cost += 50.0 + pass_y                 # unplaceable pass yards: never acceptable (engine
                                                  # artifacts survive only when NO split can place them)
        else:
            n_cmp = int(clamp(round(pass_y / Y_CATCH), 1, room))
            n_cmp = min(n_cmp, max(1, int(pass_y / 5.5)))
            cost += abs(pass_y / n_cmp - Y_CATCH) / Y_CATCH
            if n_pass > 0:
                inc_rate = (n_pass - n_cmp - int_flag) / n_pass
                cost += 0.35 * abs(inc_rate - INC_RATE_ANCHOR) / INC_RATE_ANCHOR
            cost += 0.55 * abs(pass_y / n_pass - Y_PASS_PLAY) / Y_PASS_PLAY
        if best is None or cost < best[0] - 1e-12:
            best = (cost, n_run)
    n_run = best[1]
    n_pass = n_scrim - n_run
    room = n_pass - int_flag
    if pass_y > 0 and room > 0:
        n_cmp = int(clamp(round(pass_y / Y_CATCH), 1, room))
        n_cmp = min(n_cmp, max(1, int(pass_y / 5.5)))
        n_cmp = max(1, n_cmp)
    else:
        n_cmp = 0
    return n_run, n_cmp, max(0, room - n_cmp)   # room >= 0 by the range constraint

def draw_run(rng, factor):
    m, u = RUN_MIX, rng.next()
    if u < m["p_stuff"]: g = rng.normal() * m["stuff_sd"] + m["stuff_mu"]
    elif u < m["p_stuff"] + m["p_mid"]: g = rng.normal() * m["mid_sd"] + m["mid_mu"]
    else: g = m["break_base"] - math.log(1 - rng.next()) * m["break_exp"]
    return clamp(g * factor, RUN_LO, RUN_HI)

def draw_cmp(rng, factor):
    m = CMP_MIX
    g = (m["short_mu"] + m["short_sd"] * 0.42 * rng.normal()) if rng.next() < m["p_short"] \
        else (m["med_mu"] + m["med_sd"] * 0.42 * rng.normal())
    return clamp(g * factor, CMP_LO, CMP_HI)

def stage_drive(drive, plan_pers, rng, wr_mate_ovr=80.0):
    """Stage one drive -> (plays, artifact_yards, notes)."""
    plays_total, sacks = drive["plays"], drive["sacks"]
    rush, pass_y, end = float(drive["rush"]), float(drive["pass"]), drive["end"]
    n_scrim = plays_total - sacks
    int_flag = 1 if end == "INT" else 0
    notes = []
    n_run, n_cmp, n_inc = choose_split(rush, pass_y, n_scrim, int_flag)

    plays = [{"ch": "run", "type": "run"} for _ in range(n_run)]
    plays += [{"ch": "cmp", "type": "cmp"} for _ in range(n_cmp)]
    plays += [{"ch": "inc", "type": "inc"} for _ in range(n_inc)]
    if int_flag: plays.append({"ch": "int", "type": "int"})
    artifact = 0.0

    for i in range(len(plays) - 1, 0, -1):          # Fisher-Yates over the scrimmage plays
        j = int(rng.next() * (i + 1)); plays[i], plays[j] = plays[j], plays[i]

    total_y = rush + pass_y
    start_fp = 100.0 - total_y if end == "TD" else 25.0       # exact (S4) / INFERRED own-25 (I-3)

    # ---- sacks: appended after the scrimmage pool, woven before the drive-ending play
    for _ in range(sacks):
        plays.append({"ch": "sack", "type": "sack"})

    # ---- drive-ending play reservation
    if end == "TD" and n_scrim >= 1:
        ch_pref = "cmp" if (total_y * 0.28 >= 20 and any(p["ch"] == "cmp" for p in plays)) else None
        ch = None
        for c in ([ch_pref] if ch_pref else []) + ["run", "cmp"]:
            if any(p["ch"] == c for p in plays): ch = c; break
        if ch is not None:
            last = max(i for i, p in enumerate(plays) if p["ch"] == ch)
            plays[last], plays[-1] = plays[-1], plays[last]
            chp = [p for p in plays if p["ch"] == ch]
            ch_total = rush if ch == "run" else pass_y
            others = len(chp) - 1
            reserve = max(1.0, min(35.0, total_y * 0.28))      # INFERRED scoring-play share
            if others == 0:
                reserve = ch_total                              # the final play IS the channel
            else:
                reserve = clamp(reserve, 1.0, max(1.0, min(ch_total - 0.5, ch_total - (RUN_LO if ch == "run" else CMP_LO) * others)))
            plays[-1]["td_final"] = True
            plays[-1]["gain"] = reserve
    if end == "DOWNS" and plays:
        plays[-1]["downs_final"] = True                          # a sack there fails naturally; run/cmp gets clamped later

    # ---- per-play gains: per-drive difficulty factor, then exact closure per channel
    run_plays = [p for p in plays if p["ch"] == "run" and not p.get("td_final")]
    cmp_plays = [p for p in plays if p["ch"] == "cmp" and not p.get("td_final")]
    f_run = (rush / (YP_CARRY * len(run_plays))) if run_plays else 0.0
    f_cmp = (pass_y / (Y_CATCH * len(cmp_plays))) if cmp_plays else 0.0
    for p in run_plays: p["gain"] = draw_run(rng, f_run)
    for p in cmp_plays: p["gain"] = draw_cmp(rng, f_cmp)
    for p in plays:
        if "gain" not in p:
            if p["ch"] in ("inc", "int"): p["gain"] = 0.0
            elif p["ch"] == "sack": p["gain"] = SACK_GAIN_MU + SACK_GAIN_SD * rng.normal()

    # ---- exact closure: every non-final play of each channel rebalances to the residual
    for ch, total in (("run", rush), ("cmp", pass_y)):
        fin = plays[-1] if (plays and plays[-1].get("td_final") and plays[-1]["ch"] == ch) else None
        chp = [p for p in plays if p["ch"] == ch and p is not fin]
        tgt = total - (fin["gain"] if fin else 0.0)
        vals = [p["gain"] for p in chp]
        res = rebalance(vals, RUN_LO if ch == "run" else CMP_LO, RUN_HI, tgt) if chp else (tgt if abs(tgt) > 1e-9 else 0.0)
        for p, gv in zip(chp, vals): p["gain"] = gv
        if abs(res) > 1e-6 and chp:
            artifact += res
            notes.append(f"channel {ch} residual {res:.2f} (engine artifact)")
        if not chp and abs(total) > 1e-9 and not (fin and fin.get("td_final")):
            artifact += total
            notes.append(f"channel {ch} holds {total} yards with no play to carry it (engine artifact)")

    if end == "SAFETY":
        sk = [p for p in plays if p["ch"] == "sack"]
        if sk:
            sk[-1]["type"] = "sack_safety"; sk[-1]["safety"] = True
        else:
            # no gain mutation (the closure is already exact): the safety is a STORY event on the
            # last play — the engine's numbers give the drive no yards to spare (rare, noted)
            plays[-1]["safety"] = True
            notes.append("SAFETY without a sack: staged as a story event on the last play (no gain mutation)")
    if end == "FUM":
        runs_p = [i for i, p in enumerate(plays) if p["ch"] == "run"]
        if runs_p:
            i = runs_p[-1]
            plays[i], plays[-(sacks if sacks else 0) - 1] = plays[-(sacks if sacks else 0) - 1], plays[i]
            plays[-(sacks if sacks else 0) - 1]["fumble"] = True
        elif sacks:
            sk = [p for p in plays if p["ch"] == "sack"]; sk[-1]["fumble"] = True   # sack-fumble
        else:
            plays[-1]["fumble"] = True
            notes.append("FUM on a drive with no run and no sack (staged on the last play)")
    if end == "INT" and int_flag:
        i = next(i for i, p in enumerate(plays) if p["ch"] == "int")
        j = len(plays) - (sacks if sacks else 0) - 1        # last scrimmage slot (before sacks)
        plays[i], plays[j] = plays[j], plays[i]

    if end == "DOWNS":
        fin = plays[-1]
        if not (fin["ch"] in ("run", "cmp")):
            fin["downs_final"] = False   # an inc/int/sack there fails naturally, no clamp needed

    # ---- walk the drive: down/distance synthesis + packages + spacers + attribution
    fp, down, dist = start_fp, 1, 10.0
    overshoots = 0
    comp_channel, comp_delta = None, 0.0    # DOWNS clamp compensation (restores the channel sum)
    for i, p in enumerate(plays):
        if p.get("td_final"):
            pass  # the reserve already lands the ball on the goal line in CHANNEL terms; the story
                  # fp may wobble by staged sack yards (the engine's totals are gross of sacks, I-2)
        elif p.get("downs_final") and p["ch"] in ("run", "cmp") and (p["gain"] >= dist):
            comp_channel = p["ch"]
            comp_delta = p["gain"] - (dist - 0.5)      # yards moved OFF the final play
            p["gain"] = dist - 0.5
        gtd = dist >= (100.0 - fp)
        ws = dict(PKG_OFF_RUN if p["ch"] == "run" else (PKG_OFF_LONG if dist >= 7 else PKG_OFF_PASS))
        ws[plan_pers] = ws.get(plan_pers, 0.0) + PLAN_PERS_BOOST
        p["pkg"] = ("11", "12", "13", "21", "22")[rng.wpick([ws[k] for k in ("11", "12", "13", "21", "22")])]
        dws = dict(PKG_DEF_LONG if (down >= 3 and dist >= 7) else (PKG_DEF_3RD if down >= 3 else PKG_DEF_EARLY))
        if p["pkg"] in ("21", "22", "13"): dws["base"] += 0.15; dws["dime"] *= 0.5
        p["dpkg"] = ("base", "nickel", "dime")[rng.wpick([dws["base"], dws["nickel"], dws["dime"]])]
        off = list(OFF_PACKAGES[p["pkg"]])
        sub = {}
        if p["pkg"] in ("21", "22"):
            sub["RB2"] = "FB" if rng.next() < FB_SECOND_BACK else "RB2"
        if p["pkg"] in ("11", "12", "13"):
            sub["RB1"] = "RB1" if rng.next() < (1 - RB2_BREATHER) else "RB2"
        if p["pkg"] in ("12", "22"):
            sub["TE2"] = "TE2" if rng.next() < (1 - TE3_TWELVE) else "TE3"
        if p["pkg"] == "11":
            sub["WR3"] = "WR3" if rng.next() < (1 - WR4_Z_SHARE) else "WR4"
        off = [sub.get(s, s) for s in off]
        dfn = list(DEF_PACKAGES[p["dpkg"]])
        p_dl5 = DL5_P_BASE + (DL5_P_SHORT if (p["ch"] == "run" and dist <= 2) else 0.0) \
                           + (DL5_P_GOAL if gtd else 0.0)
        if "DL5" not in dfn and rng.next() < p_dl5:
            dfn[dfn.index("DT2")] = "DL5"
        p["off11"], p["def11"] = off, dfn
        ev = []
        if p["ch"] == "run":
            cands = [s for s in off if s in CARRY_SHARES]
            ev.append((cands[rng.wpick([CARRY_SHARES[s] for s in cands])] if cands else "QB", "carry"))
        if p["ch"] in ("cmp", "inc", "int"):
            cands = [s for s in off if s in TARGET_SHARES]
            if cands:
                what = "int_thrown_to" if p["ch"] == "int" else ("catch" if p["ch"] == "cmp" else "inc")
                ev.append((cands[rng.wpick([TARGET_SHARES[s] for s in cands])], what))
        if p["ch"] == "int": ev.append(("QB", "int"))
        if p["ch"] == "sack":
            ev.append((dfn[rng.wpick([RUSH_W.get(s, .02) for s in dfn])], "sack"))
        elif p["ch"] in ("run", "cmp"):
            cands, wts = [], []
            for role, w in TACKLE_SHARES.items():
                pool = [s for s in TACKLE_MAP.get(role, []) if s in dfn]
                if pool: cands.append(pool[0]); wts.append(w)
            ev.append((cands[rng.wpick(wts)], "tackle"))
        # gravity events (INFERRED placeholders, S8)
        if p["ch"] == "cmp" and p["gain"] >= 18 and "WR1" in off:
            pr = GRAVITY["wr1_base"] + (GRAVITY["wr1_weak"] if wr_mate_ovr < 76 else 0.0) \
                 + (GRAVITY["wr1_strong"] if wr_mate_ovr > 84 else 0.0)
            if rng.next() < pr: ev.append(("WR1", "double_team"))
        if p["ch"] != "int" and not p.get("fumble"):
            if "DT1" in dfn and rng.next() < GRAVITY["dt1"]: ev.append(("DT1", "double_team"))
            if "DE1" in dfn and rng.next() < GRAVITY["de1"]: ev.append(("DE1", "double_team"))
        p["events"] = ev
        # chains (story only: the conservation already closed above)
        gained = p["gain"]
        if p["ch"] in ("inc", "int"):
            down += 1
        else:
            fp += gained
            if gained >= dist and fp < 100: down, dist = 1, min(10.0, 100.0 - fp)
            else: dist -= gained; down += 1
        if fp >= 100.0 and not p.get("td_final"):
            overshoots += 1      # counted, never mutated: the conservation is already exact
    # DOWNS compensation: push the yards clamped off the failed play onto its channel-mates
    if comp_delta > 1e-9 and comp_channel is not None:
        mates = [p for p in plays if p["ch"] == comp_channel and not p.get("td_final") and not p.get("downs_final")]
        vals = [p["gain"] for p in mates]
        lo = RUN_LO if comp_channel == "run" else CMP_LO
        res = rebalance(vals, lo, RUN_HI, (dist - 0.5) * 0 + sum(vals) + comp_delta)
        for p, gv in zip(mates, vals): p["gain"] = gv
        if abs(res) > 1e-6:
            artifact += res
            notes.append(f"DOWNS compensation residual {res:.2f} (engine artifact)")
    return plays, artifact, notes, overshoots

# ----------------------------------------------------------------------------- the game fold
OFF_SPOTS = ["QB", "RB1", "RB2", "FB", "WR1", "WR2", "WR3", "WR4", "TE1", "TE2", "TE3",
             "OT1", "OT2", "OG1", "OG2", "C"]
DEF_SPOTS = ["DE1", "DE2", "DT1", "DT2", "DL5", "MIKE", "WILL", "SAM", "CB1", "CB2", "CB3", "DIME", "SS", "FS"]

def drive_seed(seed, side_i, di):
    return ((seed ^ (0x9E3779B9 * (side_i + 1)) ^ ((di + 1) * 2654435761)) & 0xFFFFFFFF) or 1

def stage_game(g, wr_mate):
    res = {"cell": g["cell"], "seed": g["seed"], "purity": {}, "artifact": 0.0, "artifact_notes": [],
           "overshoots": 0, "drives_staged": 0,
           "snaps": {}, "pkg": {}, "dpkg": {}, "pkg_run": {}, "gravity": {}, "kp": {}}
    for side_i, side in enumerate(("home", "away")):
        off_c = {k: 0 for k in OFF_SPOTS}; def_c = {k: 0 for k in DEF_SPOTS}
        pkgc = {k: 0 for k in ("11", "12", "13", "21", "22")}
        dpkgc = {k: 0 for k in ("base", "nickel", "dime")}
        pkgrun = {k: [0, 0] for k in ("11", "12", "13", "21", "22")}
        grav = {}; kp = {"fga": 0, "xpa": 0, "two_att": 0, "punts": 0}
        sum_run = sum_cmp = n_plays = n_sacks = 0.0
        points = to_count = 0
        plan_pers = g["plans"][side]["off"]["pers"]
        # points the engine credits to this side: own-drive pts + oppPts the OPPONENT's drives gave up
        for d in g["drives"]:
            if d["side"] == side: points += d["pts"]
            else: points += d["oppPts"]
        di = -1
        for d in g["drives"]:
            if d["side"] != side: continue
            di += 1
            plays, artifact, notes, over = stage_drive(d, plan_pers, Rng(drive_seed(g["seed"], side_i, di)), wr_mate[side])
            res["artifact"] += artifact; res["overshoots"] += over; res["drives_staged"] += 1
            for nt in notes: res["artifact_notes"].append(f"{g['cell']}/{g['seed']}/{side}: {nt}")
            for p in plays:
                n_plays += 1
                for sl in p["off11"]: off_c[sl] += 1
                for sl in p["def11"]: def_c[sl] += 1
                pkgc[p["pkg"]] += 1; dpkgc[p["dpkg"]] += 1
                pkgrun[p["pkg"]][0] += 1 if p["ch"] == "run" else 0
                pkgrun[p["pkg"]][1] += 1
                if p["ch"] == "run": sum_run += p["gain"]
                elif p["ch"] == "cmp": sum_cmp += p["gain"]
                elif p["ch"] == "sack": n_sacks += 1
                for who, what in p["events"]: grav[f"{who}|{what}"] = grav.get(f"{who}|{what}", 0) + 1
            to_count += 1 if d["end"] in ("INT", "FUM") else 0
            if d["end"] in ("FG", "FG_MISS"): kp["fga"] += 1
            if d["end"] == "PUNT": kp["punts"] += 1
            c = d.get("conv")   # scalar: one conversion per TD drive (engine Drive.conv)
            if c in ("xp", "xp_miss"): kp["xpa"] += 1
            elif c in ("two", "two_fail"): kp["two_att"] += 1
        st = g["stats"][side]
        res["purity"][side] = {
            "rush": round(sum_run - st["rush"], 6),
            "pass": round(sum_cmp - st["pass"], 6),
            "plays": int(n_plays - st["plays"]),
            "sacks": int(n_sacks - st["sacksTaken"]),
            "points": int(points - (g["homeScore"] if side == "home" else g["awayScore"])),
            "giveaways": int(to_count - st["giveaways"]),
        }
        res["snaps"][side] = {"off": off_c, "def": def_c, "plays": int(n_plays)}
        res["pkg"][side] = pkgc; res["dpkg"][side] = dpkgc; res["pkg_run"][side] = pkgrun
        res["gravity"][side] = dict(sorted(grav.items()))
        res["kp"][side] = kp
    return res

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("engine"); ap.add_argument("out")
    ap.add_argument("--sample-per-cell", type=int, default=1)
    a = ap.parse_args()
    data = json.load(open(a.engine))
    games, wr_mate = data["games"], data.get("wrMateOvr", {})
    cells, samples = {}, {}
    for g in games:
        wm = wr_mate.get(g["cell"], {"home": 80.0, "away": 80.0})
        r = stage_game(g, wm)
        cells.setdefault(g["cell"], []).append(r)
        if len(samples.get(g["cell"], [])) < a.sample_per_cell:
            d0 = next(d for d in g["drives"] if d["side"] == "home")
            plays, _, _, _ = stage_drive(d0, g["plans"]["home"]["off"]["pers"], Rng(g["seed"] or 1), wm.get("home", 80.0))
            samples.setdefault(g["cell"], []).append({
                "cell": g["cell"], "seed": g["seed"], "score": f'{g["homeScore"]}-{g["awayScore"]}',
                "drive": {k: d0[k] for k in ("plays", "rush", "pass", "sacks", "end")},
                "note": "sample drive staged with a sample-only seed; aggregate counters use the per-drive seeds",
                "plays": [{**{k: p.get(k) for k in ("ch", "type", "gain", "pkg", "dpkg")},
                           "off11": p.get("off11"), "def11": p.get("def11"), "events": p.get("events", [])}
                          for p in plays]})
    json.dump({"games": cells, "samples": samples}, open(a.out, "w"))
    bad = sum(1 for rs in cells.values() for r in rs for side in ("home", "away")
              if any(v != 0 for v in r["purity"][side].values()))
    art = sum(r["artifact"] for rs in cells.values() for r in rs)
    print(f"staged {sum(len(v) for v in cells.values())} games; side-games with any purity delta: {bad}; artifact yards: {art:.3f}")

if __name__ == "__main__":
    main()
