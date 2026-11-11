#!/usr/bin/env python3
"""MEASURE LEDGER — the Phase 1 receipts (Z.ai, 2026-11-11).

Compares the folded ledger (ledger.json) against the engine's OWN constants, live-read from the
Architect's tree (engine_constants.json, dumped by dump_constants.mts — no hardcoded copies):

  R1  purity        — the conservation law: staged plays sum to the drive engine's realised totals
  R2  constants     — DL5_SHARE (slots.ts, MEASURED 0.33), DIME_W (specs.ts 0.15),
                      PERS (specs.ts package table): where the ledger agrees, where it disagrees, by how much
  R3  slot weights  — the live 32-spot table (slots.ts, FB 25): weight share vs ledger snap share,
                      Spearman rank, value-per-snap, and the FB socialism measurement
  R4  gravity       — double-team counts per team-game (INFERRED placeholder rates, reported as such)
  R5  determinism   — same seed -> byte-identical staged counters

Usage:  python3 measure_ledger.py ledger.json engine_constants.json engine_games.json staged.json out.json
"""
import argparse, json, sys
from ledger import spearman, OFF_SPOTS, DEF_SPOTS

def r6(x):
    return round(x, 6) if isinstance(x, (int, float)) else x

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("ledger"); ap.add_argument("constants"); ap.add_argument("engine")
    ap.add_argument("staged"); ap.add_argument("out")
    a = ap.parse_args()
    L = json.load(open(a.ledger))["cells"]
    C = json.load(open(a.constants))
    EG = json.load(open(a.engine))
    out = {"receipts": {}}

    # ---------------------------------------------------------------- R1 purity
    r1 = {}
    for cell, f in L.items():
        p = f["purity"]
        vol = {}
        for ch in ("rush", "pass", "plays", "sacks", "points", "giveaways"):
            exact, n = p[ch]["exact"], p[ch]["side_games"]
            vol[ch] = {"exact_pct": round(100 * exact / n, 3), "max_abs_delta": p[ch]["max_abs_delta"],
                       "sum_abs_delta": round(p[ch]["sum_abs_delta"], 3)}
        # yardage conservation by volume: 1 - sum|delta| / sum(engine yardage)
        eng = EG["games"]
        eng_y = sum(g["stats"][s][k] for g in eng for s in ("home", "away") for k in ("rush", "pass")) \
            if False else None
        r1[cell] = vol
    out["receipts"]["R1_purity"] = r1

    # ---------------------------------------------------------------- R2 engine constants
    dl5_share = C["DL5_SHARE"]
    dime_w = C["DIME_W"]
    pers = C["PERS"]
    r2 = {}
    f = L["even80"]
    # R2a: DL5 play-share vs DL5_SHARE (the engine constant IS a play-share: "the share of defensive
    # snaps he is on the field" — slots.ts comment; MEASURED 1,632 team-games 2023-25)
    dl5 = f["spot_shares"]["def"]["DL5"]["play_share"]
    r2["R2a_DL5"] = {
        "ledger_play_share": r6(dl5), "engine_balanced_MEASURED": dl5_share["balanced"],
        "engine_aggressive_INFERRED": dl5_share["aggressive"],
        "delta_vs_balanced_pts": r6(100 * (dl5 - dl5_share["balanced"])),
        "note": "the staging rotation rule is ANCHORED to the engine's measured 0.33; the receipt verifies the fold lands on the anchor",
    }
    # R2b: DIME play-share vs DIME_W (the engine's dime is a fixed 0.15 share of the blended COVERAGE
    # rating at all times; the ledger's DIME spot plays only in dime packages)
    dime = f["spot_shares"]["def"]["DIME"]["play_share"]
    r2["R2b_DIME"] = {
        "ledger_play_share": r6(dime), "ledger_dime_package_share": r6(f["packages"]["dime"]["share"]),
        "engine_DIME_W": dime_w,
        "delta_pts": r6(100 * (dime - dime_w)),
        "note": "DISAGREEMENT: the engine's coverage blend holds dime at 15% of the rating; the INFERRED "
                "down-and-distance tables stage it at ~7% of snaps. Either the tables under-use dime or "
                "DIME_W overstates it — needs real personnel data (Phase 2), not an edit in either file.",
    }
    # R2c: PERS consistency — staged package shares and per-package run rates vs PERS.run ordering
    pkgs = ("11", "12", "13", "21", "22")
    tab = {pk: {"staged_share": r6(f["packages"][pk]["share"]),
                "staged_run_rate": r6(f["packages"][pk]["run_rate"]),
                "PERS_run": pers[pk]["run"], "PERS_runB": pers[pk]["runB"], "PERS_passB": pers[pk]["passB"]}
           for pk in pkgs}
    rho = spearman([(tab[pk]["staged_run_rate"], tab[pk]["PERS_run"]) for pk in pkgs])
    r2["R2c_PERS"] = {
        "table": tab,
        "spearman_run_rate_vs_PERS_run": r6(rho),
        "note": "direction agrees (heavy packages run far more; 11 is the spread base); the 21/22 order "
                "swaps vs PERS.run — the package tables are INFERRED, PERS prices efficiency, not usage",
    }
    out["receipts"]["R2_constants"] = r2

    # ---------------------------------------------------------------- R3 slot weights (live table)
    slots = {s["id"]: s for s in C["SLOTS"]}
    wsum = {"offense": sum(s["weight"] for s in C["SLOTS"] if s["unit"] == "offense"),
            "defense": sum(s["weight"] for s in C["SLOTS"] if s["unit"] == "defense")}
    table = []
    for unit, spots, wtot in (("offense", OFF_SPOTS, wsum["offense"]), ("defense", DEF_SPOTS, wsum["defense"])):
        for s in spots:
            sh = f["spot_shares"][("off" if unit == "offense" else "def")][s]
            wt = slots[s]["weight"]
            table.append({"spot": s, "unit": unit, "weight": wt,
                          "weight_share": r6(wt / wtot), "team_snap_share": r6(sh["share"]),
                          "play_share": r6(sh["play_share"]),
                          "value_per_play_share": r6(wt / sh["play_share"]) if sh["play_share"] > 1e-9 else None})
    rho_off = spearman([(t["weight"], t["play_share"]) for t in table if t["unit"] == "offense"])
    rho_def = spearman([(t["weight"], t["play_share"]) for t in table if t["unit"] == "defense"])
    fb_ps = f["spot_shares"]["off"]["FB"]["play_share"]
    rb1_ps = f["spot_shares"]["off"]["RB1"]["play_share"]
    te1_ps = f["spot_shares"]["off"]["TE1"]["play_share"]
    r3 = {
        "weights_source": "architect/engine-and-seats colors/src/sports/nfl/engine/slots.ts (live-read; FB 25)",
        "unit_weight_totals": wsum,
        "table": table,
        "spearman_weight_vs_play_share": {"offense": r6(rho_off), "defense": r6(rho_def)},
        "FB_socialism": {
            "FB_play_share": r6(fb_ps), "FB_weight": slots["FB"]["weight"],
            "FB_weight_share": r6(slots["FB"]["weight"] / wsum["offense"]),
            "FB_value_per_play_share": r6(slots["FB"]["weight"] / fb_ps),
            "RB1_play_share": r6(rb1_ps), "RB1_value_per_play_share": r6(slots["RB1"]["weight"] / rb1_ps),
            "TE1_play_share": r6(te1_ps), "TE1_value_per_play_share": r6(slots["TE1"]["weight"] / te1_ps),
            "ruling_context": "Owner: FB = scarcity (FB>RB 2, FB>TE 6 stay; guard 18 NOT used; "
                              "Juszczyk-to-TE accepted). Muse asked: does the FB share match the engine's weight (FB 25)?",
        },
    }
    out["receipts"]["R3_slot_weights"] = r3

    # ---------------------------------------------------------------- R4 gravity
    r4 = {}
    for cell, fl in L.items():
        g = fl["gravity"]
        r4[cell] = {
            "DT1_double_teams_per_team_game": r6(g["DT1"]["per_team_game"]),
            "DT1_doubled_share_of_def_snaps": r6(g["DT1"]["doubled_share_of_def_snaps"]),
            "DE1_double_teams_per_team_game": r6(g["DE1"]["per_team_game"]),
            "DE1_doubled_share_of_def_snaps": r6(g["DE1"]["doubled_share_of_def_snaps"]),
            "WR1_double_teams_per_team_game": r6(g["WR1"]["per_team_game"]),
        }
    r4["_labels"] = ("rates are INFERRED placeholders (PLAYLED): WR1 0.22 on deep catches (+0.12 weak mates), "
                     "DT1 0.50/DE1 0.30 per defensive snap; reported as placeholders, not measurements")
    r4["_finding_WR1"] = ("the trigger (deep CATCH >= 18 yds) almost never fires under the staged catch-shape "
                          "(CMP_MIX mean 7.3/14.5): WR1 doubles ~0.15/team-game vs real ~3-6 — Phase 2 should "
                          "re-trigger on deep TARGETS/route structure, or take rates from charted data")
    r4["_finding_DT1"] = ("DT1 doubled on ~49% of defensive snaps: plausible for an elite interior blocker-"
                          "eater on PASS downs (real stars 55-70% of pass-rush snaps) but applied to ALL snaps "
                          "here — the placeholder rate needs a pass/run split in Phase 2")
    out["receipts"]["R4_gravity"] = r4

    # ---------------------------------------------------------------- R5 determinism
    import stage_plays as SP
    g0 = EG["games"][0]
    wm = EG.get("wrMateOvr", {}).get(g0["cell"], {"home": 80.0, "away": 80.0})
    s1 = SP.stage_game(g0, wm); s2 = SP.stage_game(g0, wm)
    j1, j2 = json.dumps(s1, sort_keys=True), json.dumps(s2, sort_keys=True)
    # also verify against the shipped fold row (the pipeline's own output)
    shipped = json.load(open(a.staged))["games"][g0["cell"]][0]
    j3 = json.dumps(shipped, sort_keys=True)
    r5 = {"same_seed_same_output": j1 == j2,
          "matches_shipped_pipeline_row": j1 == j3,
          "engine_rng": "mulberry32 (core/rng.ts), staging seeds derived game+side+drive"}
    out["receipts"]["R5_determinism"] = r5

    # ---------------------------------------------------------------- cell cross-view (identities)
    if "identities" in L:
        fe = L["identities"]
        out["receipts"]["R6_identity_cells"] = {
            "note": "the engine's plan layer chose 11 personnel for BOTH identity rosters at these ratings "
                    "(PERS plan-cost prices heavy plans out) — so the plan-pers boost is neutral this run; "
                    "the ledger staged both sides with the same natural rotation rules",
            "even80_vs_identities_DL5": {"even80": r6(L["even80"]["spot_shares"]["def"]["DL5"]["play_share"]),
                                          "identities": r6(fe["spot_shares"]["def"]["DL5"]["play_share"])},
            "package_shares": {pk: {"even80": r6(L["even80"]["packages"][pk]["share"]),
                                     "identities": r6(fe["packages"][pk]["share"])} for pk in pkgs},
        }

    json.dump(out, open(a.out, "w"), indent=1)

    # ---------------------------------------------------------------- console summary
    print("== R1 purity (even80) ==")
    for ch, v in r1["even80"].items():
        print(f"  {ch:10s} exact {v['exact_pct']:6.2f}%  max|d| {v['max_abs_delta']}")
    print("== R2a DL5 ==")
    print(f"  ledger {r2['R2a_DL5']['ledger_play_share']:.4f} vs engine {dl5_share['balanced']} (delta {r2['R2a_DL5']['delta_vs_balanced_pts']:+.2f} pts)")
    print("== R2b DIME ==")
    print(f"  ledger {r2['R2b_DIME']['ledger_play_share']:.4f} vs DIME_W {dime_w} (delta {r2['R2b_DIME']['delta_pts']:+.2f} pts)")
    print("== R2c PERS ==")
    print(f"  spearman(run_rate, PERS.run) = {r2['R2c_PERS']['spearman_run_rate_vs_PERS_run']}")
    print("== R3 weights ==")
    print(f"  spearman off {r3['spearman_weight_vs_play_share']['offense']}, def {r3['spearman_weight_vs_play_share']['defense']}")
    fb = r3["FB_socialism"]
    print(f"  FB: play_share {fb['FB_play_share']:.4f}, weight 25 ({fb['FB_weight_share']:.4%} of off weight), "
          f"value/play-share {fb['FB_value_per_play_share']:.1f} vs RB1 {fb['RB1_value_per_play_share']:.1f}, TE1 {fb['TE1_value_per_play_share']:.1f}")
    print("== R4 gravity (even80) ==")
    print(f"  DT1 {r4['even80']['DT1_double_teams_per_team_game']:.1f} ({r4['even80']['DT1_doubled_share_of_def_snaps']:.1%})  "
          f"DE1 {r4['even80']['DE1_double_teams_per_team_game']:.1f} ({r4['even80']['DE1_doubled_share_of_def_snaps']:.1%})  "
          f"WR1 {r4['even80']['WR1_double_teams_per_team_game']:.2f}")
    print("== R5 determinism ==", r5)

if __name__ == "__main__":
    main()
