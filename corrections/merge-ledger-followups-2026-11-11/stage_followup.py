#!/usr/bin/env python3
"""STAGE FOLLOWUP — Ledger Phase 1 follow-ups B1/B2/B3 (Z.ai, seat ZAI, 2026-11-11).

One instrumented stager, three jobs, all read-only against the engine's GameResults
(the drive engine stays authoritative; the Phase 1 conservation law is untouched):

  --sit   B1 support: count the defensive situation buckets (early / 3rd / long)
          and the heavy-package suppression interactions, 4-3 (the Phase 1 config).
  --wr1   B2: re-trigger the WR1 gravity on DEEP TARGETS / route structure instead
          of deep catches. Air yards are drawn from a SEPARATE RNG stream
          (INFERRED, story-only — no gain, package or attribution draw is touched),
          and the old trigger's main-stream draws are BURNED identically, so every
          counter except WR1|double_team must be byte-identical to Phase 1.
  --34    B3: extend the staging to the 3-4 base using the engine's fieldSlots()
          rows (DT2 -> ILB2, MIKE -> ILB1, WILL -> OLB1, SAM -> OLB2, DL5 in both).
          Package substitution mirrors the 4-3 exactly: nickel = base - OLB2 + CB3,
          dime = base - OLB1 - OLB2 + CB3 + DIME. DL5 still comes on for the DT2
          slot (in a 3-4 that seat plays ILB2).

Purity is recomputed in every mode and must reproduce Phase 1's receipt:
countable channels 100% exact, yardage residues only in the named engine-artifact class.

Determinism: mulberry32, per game+side+drive (Phase 1's scheme, unchanged) +
a second stream for story-only air yards (seeded game+side+drive ^ 0x5DEECE66D).

Usage:
  python3 stage_followup.py sit  <engine_games.json> <out.json>
  python3 stage_followup.py wr1  <engine_games.json> <out.json> [--grid]
  python3 stage_followup.py 34   <engine_games.json> <out.json>
(stage_plays.py from the Phase 1 delivery must be importable — it is looked up next
to this script or in a ledger-phase1-2026-11-11/ sibling folder.)
"""
import argparse, json, sys, math, os
# stage_plays: the SHIPPED Phase 1 stager (constants, Rng, rebalance, choose_split, draws).
# Resolve it next to this script first, then in the Phase 1 delivery folder layout.
_here = os.path.dirname(os.path.abspath(__file__))
for _cand in (_here,
              os.path.join(_here, "..", "ledger-phase1-2026-11-11"),
              os.path.join(_here, "ledger-phase1-2026-11-11")):
    if os.path.exists(os.path.join(_cand, "stage_plays.py")):
        sys.path.insert(0, _cand)
        break
import stage_plays as SP   # noqa: E402

# ------------------------------------------------------------------ B2 knobs (INFERRED, anchored to the real band)
AIR_SHAPE = dict(SP.CMP_MIX)            # air yards use the completion shape family (INFERRED)
DEEP_TAU = 15.0                          # deep = air yards >= tau (INFERRED; real "deep" conventions 12-20)
P_DEEP, P_SHORT = 0.70, 0.30             # P(double | WR1 target, deep/short) (INFERRED, calibrated to land
                                         # the rate inside the reported real band 3-6/team-game; charting settles it)
WR1_MATE_WEAK, WR1_MATE_STRONG = SP.GRAVITY["wr1_weak"], SP.GRAVITY["wr1_strong"]

# ------------------------------------------------------------------ B3: the 3-4 templates (fieldSlots mapping, engine-faithful)
DEF_PACKAGES_34 = {
    "base":   ["DE1", "DE2", "DT1", "MIKE", "DT2", "WILL", "SAM", "CB1", "CB2", "SS", "FS"],
    "nickel": ["DE1", "DE2", "DT1", "MIKE", "DT2", "WILL", "CB1", "CB2", "CB3", "SS", "FS"],
    "dime":   ["DE1", "DE2", "DT1", "MIKE", "DT2", "CB1", "CB2", "CB3", "DIME", "SS", "FS"],
}
SPOT_TO_ROLE_34 = {"DT2": "ILB2 (row DT2)", "MIKE": "ILB1", "WILL": "OLB1", "SAM": "OLB2", "DT1": "NT"}

def air_seed(seed, side_i, di):
    return ((seed ^ (0x5DEECE66D * (side_i + 1)) ^ ((di + 1) * 0x9E3779B1)) & 0xFFFFFFFF) or 1

def stage_drive_v2(drive, plan_pers, rng, air, base="43", wr_mode=False,
                   p_deep=P_DEEP, p_short=P_SHORT, tau=DEEP_TAU, wr_mate_ovr=80.0):
    """Phase 1 stage_drive, instrumented. base: '43' | '34'. wr_mode: the B2 re-trigger.
    Returns (plays, artifact, notes, overshoots, sit_counters)."""
    plays_total, sacks = drive["plays"], drive["sacks"]
    rush, pass_y, end = float(drive["rush"]), float(drive["pass"]), drive["end"]
    n_scrim = plays_total - sacks
    int_flag = 1 if end == "INT" else 0
    notes = []
    n_run, n_cmp, n_inc = SP.choose_split(rush, pass_y, n_scrim, int_flag)

    plays = [{"ch": "run", "type": "run"} for _ in range(n_run)]
    plays += [{"ch": "cmp", "type": "cmp"} for _ in range(n_cmp)]
    plays += [{"ch": "inc", "type": "inc"} for _ in range(n_inc)]
    if int_flag: plays.append({"ch": "int", "type": "int"})
    artifact = 0.0
    for i in range(len(plays) - 1, 0, -1):
        j = int(rng.next() * (i + 1)); plays[i], plays[j] = plays[j], plays[i]

    total_y = rush + pass_y
    start_fp = 100.0 - total_y if end == "TD" else 25.0
    for _ in range(sacks):
        plays.append({"ch": "sack", "type": "sack"})

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
            reserve = max(1.0, min(35.0, total_y * 0.28))
            reserve = ch_total if others == 0 else clamp_res(total_y, ch_total, others, ch)
            plays[-1]["td_final"] = True
            plays[-1]["gain"] = reserve
    if end == "DOWNS" and plays:
        plays[-1]["downs_final"] = True

    run_plays = [p for p in plays if p["ch"] == "run" and not p.get("td_final")]
    cmp_plays = [p for p in plays if p["ch"] == "cmp" and not p.get("td_final")]
    f_run = (rush / (SP.YP_CARRY * len(run_plays))) if run_plays else 0.0
    f_cmp = (pass_y / (SP.Y_CATCH * len(cmp_plays))) if cmp_plays else 0.0
    for p in run_plays: p["gain"] = SP.draw_run(rng, f_run)
    for p in cmp_plays: p["gain"] = SP.draw_cmp(rng, f_cmp)
    for p in plays:
        if "gain" not in p:
            if p["ch"] in ("inc", "int"): p["gain"] = 0.0
            elif p["ch"] == "sack": p["gain"] = SP.SACK_GAIN_MU + SP.SACK_GAIN_SD * rng.normal()

    for ch, total in (("run", rush), ("cmp", pass_y)):
        fin = plays[-1] if (plays and plays[-1].get("td_final") and plays[-1]["ch"] == ch) else None
        chp = [p for p in plays if p["ch"] == ch and p is not fin]
        tgt = total - (fin["gain"] if fin else 0.0)
        vals = [p["gain"] for p in chp]
        res = SP.rebalance(vals, SP.RUN_LO if ch == "run" else SP.CMP_LO, SP.RUN_HI, tgt) if chp else (tgt if abs(tgt) > 1e-9 else 0.0)
        for p, gv in zip(chp, vals): p["gain"] = gv
        if abs(res) > 1e-6 and chp:
            artifact += res
            notes.append(f"channel {ch} residual {res:.2f} (engine artifact)")
        if not chp and abs(total) > 1e-9 and not (fin and fin.get("td_final")):
            artifact += total
            notes.append(f"channel {ch} holds {total} yards with no play to carry it (engine artifact)")

    if end == "SAFETY":
        sk = [p for p in plays if p["ch"] == "sack"]
        if sk: sk[-1]["type"] = "sack_safety"; sk[-1]["safety"] = True
        else:
            plays[-1]["safety"] = True
            notes.append("SAFETY without a sack: staged as a story event on the last play (no gain mutation)")
    if end == "FUM":
        runs_p = [i for i, p in enumerate(plays) if p["ch"] == "run"]
        if runs_p:
            i = runs_p[-1]
            plays[i], plays[-(sacks if sacks else 0) - 1] = plays[-(sacks if sacks else 0) - 1], plays[i]
            plays[-(sacks if sacks else 0) - 1]["fumble"] = True
        elif sacks:
            sk = [p for p in plays if p["ch"] == "sack"]; sk[-1]["fumble"] = True
        else:
            plays[-1]["fumble"] = True
            notes.append("FUM on a drive with no run and no sack (staged on the last play)")
    if end == "INT" and int_flag:
        i = next(i for i, p in enumerate(plays) if p["ch"] == "int")
        j = len(plays) - (sacks if sacks else 0) - 1
        plays[i], plays[j] = plays[j], plays[i]
    if end == "DOWNS":
        fin = plays[-1]
        if not (fin["ch"] in ("run", "cmp")):
            fin["downs_final"] = False

    fp, down, dist = start_fp, 1, 10.0
    overshoots = 0
    comp_channel, comp_delta = None, 0.0
    sit = {"early": 0, "third": 0, "long": 0, "heavy_suppressed": 0, "plays": 0,
           "heavy_early": 0, "heavy_third": 0, "heavy_long": 0}
    for i, p in enumerate(plays):
        if p.get("td_final"):
            pass
        elif p.get("downs_final") and p["ch"] in ("run", "cmp") and (p["gain"] >= dist):
            comp_channel = p["ch"]
            comp_delta = p["gain"] - (dist - 0.5)
            p["gain"] = dist - 0.5
        gtd = dist >= (100.0 - fp)
        ws = dict(SP.PKG_OFF_RUN if p["ch"] == "run" else (SP.PKG_OFF_LONG if dist >= 7 else SP.PKG_OFF_PASS))
        ws[plan_pers] = ws.get(plan_pers, 0.0) + SP.PLAN_PERS_BOOST
        p["pkg"] = ("11", "12", "13", "21", "22")[rng.wpick([ws[k] for k in ("11", "12", "13", "21", "22")])]
        # ---- defensive situation bucket (B1 instrumentation) + package
        if down >= 3 and dist >= 7:
            bucket = "long"; dws = dict(SP.PKG_DEF_LONG)
        elif down >= 3:
            bucket = "third"; dws = dict(SP.PKG_DEF_3RD)
        else:
            bucket = "early"; dws = dict(SP.PKG_DEF_EARLY)
        sit["plays"] += 1
        sit[bucket] += 1
        if p["pkg"] in ("21", "22", "13"):
            dws["base"] += 0.15; dws["dime"] *= 0.5
            sit["heavy_suppressed"] += 1
            sit[f"heavy_{bucket}"] += 1
        p["dpkg"] = ("base", "nickel", "dime")[rng.wpick([dws["base"], dws["nickel"], dws["dime"]])]
        off = list(SP.OFF_PACKAGES[p["pkg"]])
        sub = {}
        if p["pkg"] in ("21", "22"):
            sub["RB2"] = "FB" if rng.next() < SP.FB_SECOND_BACK else "RB2"
        if p["pkg"] in ("11", "12", "13"):
            sub["RB1"] = "RB1" if rng.next() < (1 - SP.RB2_BREATHER) else "RB2"
        if p["pkg"] in ("12", "22"):
            sub["TE2"] = "TE2" if rng.next() < (1 - SP.TE3_TWELVE) else "TE3"
        if p["pkg"] == "11":
            sub["WR3"] = "WR3" if rng.next() < (1 - SP.WR4_Z_SHARE) else "WR4"
        off = [sub.get(s, s) for s in off]
        dfn = list((DEF_PACKAGES_34 if base == "34" else SP.DEF_PACKAGES)[p["dpkg"]])
        p_dl5 = SP.DL5_P_BASE + (SP.DL5_P_SHORT if (p["ch"] == "run" and dist <= 2) else 0.0) \
                           + (SP.DL5_P_GOAL if gtd else 0.0)
        if "DL5" not in dfn and rng.next() < p_dl5:
            dfn[dfn.index("DT2")] = "DL5"          # the same seat in both bases (in a 3-4 the DT2 slot plays ILB2)
        p["off11"], p["def11"] = off, dfn
        ev = []
        if p["ch"] == "run":
            cands = [s for s in off if s in SP.CARRY_SHARES]
            ev.append((cands[rng.wpick([SP.CARRY_SHARES[s] for s in cands])] if cands else "QB", "carry"))
        if p["ch"] in ("cmp", "inc", "int"):
            cands = [s for s in off if s in SP.TARGET_SHARES]
            if cands:
                what = "int_thrown_to" if p["ch"] == "int" else ("catch" if p["ch"] == "cmp" else "inc")
                ev.append((cands[rng.wpick([SP.TARGET_SHARES[s] for s in cands])], what))
        if p["ch"] == "int": ev.append(("QB", "int"))
        if p["ch"] == "sack":
            ev.append((dfn[rng.wpick([SP.RUSH_W.get(s, .02) for s in dfn])], "sack"))
        elif p["ch"] in ("run", "cmp"):
            cands, wts = [], []
            for role, w in SP.TACKLE_SHARES.items():
                pool = [s for s in SP.TACKLE_MAP.get(role, []) if s in dfn]
                if pool: cands.append(pool[0]); wts.append(w)
            ev.append((cands[rng.wpick(wts)], "tackle"))
        # ---- gravity
        if wr_mode:
            # BURN the old trigger's main-stream draws exactly as Phase 1 burned them
            # (keeps every main-stream counter byte-identical to Phase 1)
            if p["ch"] == "cmp" and p["gain"] >= 18 and "WR1" in off:
                rng.next()
            # the NEW trigger (stream 2, story-only): air yards on every pass play; doubles key on
            # WR1 TARGETS with the route depth, not on catches.
            if p["ch"] in ("cmp", "inc", "int"):
                u = air.next()
                if u < AIR_SHAPE["p_med"]:
                    a = AIR_SHAPE["med_mu"] + AIR_SHAPE["med_sd"] * 0.42 * air.normal()
                else:
                    a = AIR_SHAPE["short_mu"] + AIR_SHAPE["short_sd"] * 0.42 * air.normal()
                p["air"] = max(0.0, a)
                tgt_ev = next((e for e in ev if e[1] in ("catch", "inc", "int_thrown_to")), None)
                if tgt_ev and tgt_ev[0] == "WR1":
                    pr = p_deep if p["air"] >= tau else p_short
                    pr += WR1_MATE_WEAK if wr_mate_ovr < 76 else 0.0
                    pr += WR1_MATE_STRONG if wr_mate_ovr > 84 else 0.0
                    if air.next() < pr:
                        ev.append(("WR1", "double_team"))
        else:
            # Phase 1 placeholder, unchanged (DT1/DE1 + the old WR1 deep-catch trigger)
            if p["ch"] == "cmp" and p["gain"] >= 18 and "WR1" in off:
                pr = SP.GRAVITY["wr1_base"] + (SP.GRAVITY["wr1_weak"] if wr_mate_ovr < 76 else 0.0) \
                     + (SP.GRAVITY["wr1_strong"] if wr_mate_ovr > 84 else 0.0)
                if rng.next() < pr: ev.append(("WR1", "double_team"))
        if p["ch"] != "int" and not p.get("fumble"):
            if "DT1" in dfn and rng.next() < SP.GRAVITY["dt1"]: ev.append(("DT1", "double_team"))
            if "DE1" in dfn and rng.next() < SP.GRAVITY["de1"]: ev.append(("DE1", "double_team"))
        p["events"] = ev
        gained = p["gain"]
        if p["ch"] in ("inc", "int"):
            down += 1
        else:
            fp += gained
            if gained >= dist and fp < 100: down, dist = 1, min(10.0, 100.0 - fp)
            else: dist -= gained; down += 1
        if fp >= 100.0 and not p.get("td_final"):
            overshoots += 1
    if comp_delta > 1e-9 and comp_channel is not None:
        mates = [p for p in plays if p["ch"] == comp_channel and not p.get("td_final") and not p.get("downs_final")]
        vals = [p["gain"] for p in mates]
        lo = SP.RUN_LO if comp_channel == "run" else SP.CMP_LO
        res = SP.rebalance(vals, lo, SP.RUN_HI, sum(vals) + comp_delta)
        for p, gv in zip(mates, vals): p["gain"] = gv
        if abs(res) > 1e-6:
            artifact += res
            notes.append(f"DOWNS compensation residual {res:.2f} (engine artifact)")
    return plays, artifact, notes, overshoots, sit

def clamp_res(total_y, ch_total, others, ch):
    """Phase 1's TD-reserve clamp, verbatim (SP.clamp)."""
    lo = SP.RUN_LO if ch == "run" else SP.CMP_LO
    reserve = max(1.0, min(35.0, total_y * 0.28))
    return SP.clamp(reserve, 1.0, max(1.0, min(ch_total - 0.5, ch_total - lo * others)))

def stage_game_v2(g, wr_mate, base="43", wr_mode=False, **kw):
    res = {"cell": g["cell"], "seed": g["seed"], "purity": {}, "artifact": 0.0, "artifact_notes": [],
           "overshoots": 0, "drives_staged": 0,
           "snaps": {}, "pkg": {}, "dpkg": {}, "pkg_run": {}, "gravity": {}, "kp": {},
           "wr1_targets": 0, "wr1_deep_targets": 0,
           "sit": {"early": 0, "third": 0, "long": 0, "heavy_suppressed": 0, "plays": 0,
                   "heavy_early": 0, "heavy_third": 0, "heavy_long": 0}}
    for side_i, side in enumerate(("home", "away")):
        off_c = {k: 0 for k in SP.OFF_SPOTS}; def_c = {k: 0 for k in SP.DEF_SPOTS}
        pkgc = {k: 0 for k in ("11", "12", "13", "21", "22")}
        dpkgc = {k: 0 for k in ("base", "nickel", "dime")}
        pkgrun = {k: [0, 0] for k in ("11", "12", "13", "21", "22")}
        grav = {}; kp = {"fga": 0, "xpa": 0, "two_att": 0, "punts": 0}
        sum_run = sum_cmp = n_plays = n_sacks = 0.0
        points = to_count = 0
        wr1_t = wr1_dt = 0
        plan_pers = g["plans"][side]["off"]["pers"]
        for d in g["drives"]:
            if d["side"] == side: points += d["pts"]
            else: points += d["oppPts"]
        di = -1
        for d in g["drives"]:
            if d["side"] != side: continue
            di += 1
            plays, artifact, notes, over, sitc = stage_drive_v2(
                d, plan_pers, SP.Rng(SP.drive_seed(g["seed"], side_i, di)),
                SP.Rng(air_seed(g["seed"], side_i, di)), base=base, wr_mode=wr_mode,
                wr_mate_ovr=wr_mate[side], **kw)
            res["artifact"] += artifact; res["overshoots"] += over; res["drives_staged"] += 1
            for k in sitc: res["sit"][k] += sitc[k]
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
                for who, what in p["events"]:
                    grav[f"{who}|{what}"] = grav.get(f"{who}|{what}", 0) + 1
                    if who == "WR1" and what in ("catch", "inc", "int_thrown_to"):
                        wr1_t += 1
                        if p.get("air", 0) >= kw.get("tau", DEEP_TAU): wr1_dt += 1
            to_count += 1 if d["end"] in ("INT", "FUM") else 0
            if d["end"] in ("FG", "FG_MISS"): kp["fga"] += 1
            if d["end"] == "PUNT": kp["punts"] += 1
            c = d.get("conv")
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
        res["wr1_targets"] += wr1_t; res["wr1_deep_targets"] += wr1_dt
    return res

def run_games(data, base="43", wr_mode=False, cell_filter=None, **kw):
    games, wr_mate = data["games"], data.get("wrMateOvr", {})
    cells = {}
    for g in games:
        if cell_filter and g["cell"] != cell_filter: continue
        wm = wr_mate.get(g["cell"], {"home": 80.0, "away": 80.0})
        r = stage_game_v2(g, wm, base=base, wr_mode=wr_mode, **kw)
        cells.setdefault(g["cell"], []).append(r)
    return cells

def summarize(cells):
    n_games = sum(len(v) for v in cells.values())
    tg = 2 * n_games
    out = {"games": n_games, "team_games": tg, "cells": {}}
    agg = {}
    for cell, rs in cells.items():
        n = len(rs); t = 2 * n
        def spot_share(spot, unit):
            return sum(r["snaps"][s][unit][spot] for r in rs for s in ("home", "away")) / \
                   (t * (sum(r["snaps"][s]["plays"] for r in rs for s in ("home", "away")) / t)) if t else 0
        cs = {"games": n, "dl5_play_share": 0.0, "dime_play_share": 0.0, "def_spot_shares": {}, "sit": None,
              "gravity": {}, "purity_bad": 0}
        tot_def = tot = 0
        counters = {}
        grav = {}
        sit = {"early": 0, "third": 0, "long": 0, "heavy_suppressed": 0, "plays": 0,
               "heavy_early": 0, "heavy_third": 0, "heavy_long": 0}
        purity_bad = 0
        for r in rs:
            for s in ("home", "away"):
                tot += r["snaps"][s]["plays"]
                for spot, c in r["snaps"][s]["def"].items(): counters[spot] = counters.get(spot, 0) + c
                for k2, v2 in r["gravity"][s].items(): grav[k2] = grav.get(k2, 0) + v2
                for k2 in sit: sit[k2] += r["sit"][k2]
                if any(v2 != 0 for v2 in r["purity"][s].values() if isinstance(v2, (int, float)) and v2 != 0):
                    pass
            # purity: countable channels must be exactly 0
            for s in ("home", "away"):
                pu = r["purity"][s]
                if pu["plays"] or pu["sacks"] or pu["points"] or pu["giveaways"]:
                    purity_bad += 1
        cs["def_spot_shares"] = {k: round(v / tot, 4) for k, v in sorted(counters.items())}
        cs["dl5_play_share"] = round(counters.get("DL5", 0) / tot, 4)
        cs["dime_play_share"] = round(counters.get("DIME", 0) / tot, 4)
        cs["gravity_per_tg"] = {k: round(v / (2 * n), 2) for k, v in sorted(grav.items())}
        cs["wr1_targets_per_tg"] = round(sum(r["wr1_targets"] for r in rs) / (2 * n), 2)
        cs["wr1_deep_targets_per_tg"] = round(sum(r["wr1_deep_targets"] for r in rs) / (2 * n), 2)
        cs["purity_bad_countable"] = purity_bad
        cs["sit_mix"] = {k: round(v / max(1, sit["plays"]), 4) for k, v in sit.items() if k != "plays"}
        out["cells"][cell] = cs
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mode", choices=["sit", "wr1", "34"])
    ap.add_argument("engine"); ap.add_argument("out")
    ap.add_argument("--grid", action="store_true")
    a = ap.parse_args()
    data = json.load(open(a.engine))
    if a.mode == "sit":
        cells = run_games(data, base="43", wr_mode=False)
        s = summarize(cells)
        json.dump(s, open(a.out, "w"), indent=1)
        print(json.dumps(s["cells"]["even80"]["sit_mix"], indent=1))
        print("dime share:", s["cells"]["even80"]["dime_play_share"], "DL5:", s["cells"]["even80"]["dl5_play_share"])
    elif a.mode == "wr1":
        if a.grid:
            grid = {}
            for pd in (0.5, 0.6, 0.7, 0.8):
                for ps in (0.2, 0.3, 0.4):
                    cells = run_games(data, base="43", wr_mode=True, cell_filter="even80", p_deep=pd, p_short=ps)
                    s = summarize(cells)["cells"]["even80"]
                    grid[f"pd{pd}_ps{ps}"] = {"doubles_per_tg": s["gravity_per_tg"].get("WR1|double_team", 0.0),
                                              "per_wr1_target": round(s["gravity_per_tg"].get("WR1|double_team", 0.0) / max(0.01, s["wr1_targets_per_tg"]), 3)}
                    print(f"P_deep={pd} P_short={ps}: {grid[f'pd{pd}_ps{ps}']}")
            json.dump(grid, open(a.out, "w"), indent=1)
        else:
            out = {}
            for tau in (12.0, 15.0, 20.0):
                cells = run_games(data, base="43", wr_mode=True, tau=tau)
                s = summarize(cells)
                out[f"tau{int(tau)}"] = s
                e = s["cells"]["even80"]
                print(f"tau={tau}: even80 WR1 doubles/tg {e['gravity_per_tg'].get('WR1|double_team', 0.0)} "
                      f"(targets/tg {e['wr1_targets_per_tg']}, deep targets/tg {e['wr1_deep_targets_per_tg']}) "
                      f"purity_bad {e['purity_bad_countable']}")
            json.dump(out, open(a.out, "w"), indent=1)
    else:
        out = {}
        for base, key in (("43", "base43"), ("34", "base34")):
            cells = run_games(data, base=base, wr_mode=False)
            out[key] = summarize(cells)
            e = out[key]["cells"]["even80"]
            print(f"{key}: DL5 share {e['dl5_play_share']}  DIME {e['dime_play_share']}  purity_bad {e['purity_bad_countable']}")
        json.dump(out, open(a.out, "w"), indent=1)

if __name__ == "__main__":
    main()
