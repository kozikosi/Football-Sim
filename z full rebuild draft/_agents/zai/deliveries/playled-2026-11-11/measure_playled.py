#!/usr/bin/env python3
"""measure_playled.py — the PLAYLED measurement suite. One command, every receipt.

Run:  python3 measure_playled.py [--quick]
Outputs receipts A (matchup-port identity), B (totals vs the drive engine),
D (determinism), S (hand-translation surface count), and prints where the
flex-pricing numbers come from (flex_results.json, produced by measure_flex.py).
"""
import argparse, json, sys, playsim as P

REF = "reference_engine.json"

def receipt_a():
    ref = json.load(open(REF))
    worst = 0.0
    for m in ref["matchups"]:
        Rh, Ra = m["ratingsHome"], m["ratingsAway"]
        Rl = {k: 80.0 for k in Rh}
        e = P.engine_matchup({k: Rh[k] for k in ("rb", "olRun", "qb", "rec", "olPass")},
                             {"frontNick": Ra["frontNick"], "covNick": Ra["covNick"],
                              "covDime": Ra["covDime"], "passRush": Ra["passRush"]}, Rl)
        em = m["engineMatchupHome"]
        w = max(abs(e["expRush"] - em["expRush"]) / em["expRush"], abs(e["expPass"] - em["expPass"]) / em["expPass"],
                abs(e["lamTO"] - em["lamTO"]) / em["lamTO"], abs(e["lamSack"] - em["lamSack"]) / em["lamSack"])
        worst = max(worst, w)
    print(f"RECEIPT A  matchup-port identity vs the engine: worst relative error {worst:.2e} ->",
          "VERIFIED" if worst < 1e-6 else "FAIL")
    return worst < 1e-6

def receipt_b(games):
    ref = json.load(open(REF))
    print(f"RECEIPT B  totals vs the drive engine ({games} seeded games per cell)")
    print(f'  {"matchup":12s} {"metric":9s} {"PLAYSIM":>8s} {"ENGINE":>8s} {"ratio":>6s}')
    rows = {}
    for m in ref["matchups"]:
        shift = {"even80": (80, 80), "home_plus4": (84, 80), "home_plus8": (88, 80), "home_minus8": (72, 80)}[m["name"]]
        t, _ = P.run_games(games, P.flat(shift[0]), P.flat(shift[1]), 101)
        rows[m["name"]] = {}
        for k in ("rush", "pass", "plays", "points", "drives", "sacks", "giveaways"):
            e = m["homeTotals"][k]["mean"]
            rows[m["name"]][k] = {"sim": t[k]["mean"], "sd": t[k]["sd"], "engine": e}
            print(f'  {m["name"]:12s} {k:9s} {t[k]["mean"]:8.1f} {e:8.1f} {t[k]["mean"]/e:6.2f}')
    json.dump(rows, open("totals_final.json", "w"), indent=1)
    return rows

def receipt_d():
    g1 = P.Game(P.flat(80), P.flat(84), 424242); g1.prepare_units(P.flat(80), P.flat(84)); t1 = g1.simulate()
    g2 = P.Game(P.flat(80), P.flat(84), 424242); g2.prepare_units(P.flat(80), P.flat(84)); t2 = g2.simulate()
    g3 = P.Game(P.flat(80), P.flat(84), 424243); g3.prepare_units(P.flat(80), P.flat(84)); t3 = g3.simulate()
    g4 = P.Game(P.flat(80), P.flat(84), 999001, record_plays=True); g4.prepare_units(P.flat(80), P.flat(84)); g4.simulate()
    g5 = P.Game(P.flat(80), P.flat(84), 999001, record_plays=True); g5.prepare_units(P.flat(80), P.flat(84)); g5.simulate()
    same = json.dumps(t1, sort_keys=True) == json.dumps(t2, sort_keys=True)
    diff = json.dumps(t1, sort_keys=True) != json.dumps(t3, sort_keys=True)
    logs = json.dumps(g4.playlog, sort_keys=True) == json.dumps(g5.playlog, sort_keys=True) and g4.events == g5.events
    print(f"RECEIPT D  determinism: same seed identical totals {same}; different seed differs {diff}; "
          f"play log + events byte-identical {logs} ->", "VERIFIED" if (same and diff and logs) else "FAIL")
    return same and diff and logs

def receipt_s():
    """Count the authored numeric constants the play model carries (the hand-translation surface)."""
    tables = {
        "CAL (calibration + sensitivity anchors)": len(P.CAL),
        "RUN_MIX (carry shape)": len(P.RUN_MIX),
        "CMP_MIX (completion gain shape)": len(P.CMP_MIX),
        "PLAY_SECONDS (clock per play type)": len(P.PLAY_SECONDS),
        "TARGET_SHARES": len(P.TARGET_SHARES),
        "CARRY_SHARES": len(P.CARRY_SHARES),
        "TACKLE_SHARES": len(P.TACKLE_SHARES),
        "FG_MAKE buckets": len(P.FG_MAKE),
        "EP_CURVE points": len(P.EP_CURVE),
        "GRAVITY (double-team rates)": len(P.GRAVITY),
        "SHELL (adaptation b)": len(P.SHELL),
        "RUN_PROB (situation -> run prob)": len(P.RUN_PROB),
        "PKG_OFF (run/pass/long packages)": len(P.PKG_OFF_RUN) + len(P.PKG_OFF_PASS) + len(P.PKG_OFF_LONG),
        "PKG_DEF (early/3rd/long)": len(P.PKG_DEF_EARLY) + len(P.PKG_DEF_3RD) + len(P.PKG_DEF_LONG),
        "scalars (DL5_ROTATION, SCREEN_P, DEEP_P, SCRAMBLE_P, INT_*, FUM, XP, PUNT_*, FG_DECISION, TWO_GO_P, SAFETY_P)": 15,
        "duty W (17 duties)": len(P.W),
        "duty HAVE (17 roles x 17 duties)": 17 * 17,
        "duty NEED (20 dests, ~6.5 duties avg)": 130,
        "adaptation rules (route mix, shell, run mix, carrier/catcher caps)": 5,
        "script rules (kneel, half-kill, desperation, went4-DOWNS)": 4,
        "performance rule (level = min(HAVE, NEED)) + group-shift machinery": 2,
    }
    total = sum(tables.values())
    print("RECEIPT S  hand-translation surface of the play model (authored numbers + rules):")
    for k, v in tables.items():
        print(f"    {k}: {v}")
    print(f"    TOTAL: {total}")
    ledger_count = 47   # the Ledger's personnel + attribution surface (see the design doc, section 8)
    print(f"    Ledger comparison (personnel + attribution models only): ~{ledger_count}")
    return total

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--quick", action="store_true")
    ap.add_argument("--games", type=int, default=1500)
    a = ap.parse_args()
    ok_a = receipt_a()
    rows = receipt_b(400 if a.quick else a.games)
    ok_d = receipt_d()
    total = receipt_s()
    print()
    print("VERDICT INPUTS: receipt A", "PASS" if ok_a else "FAIL", "| receipt D", "PASS" if ok_d else "FAIL",
          f"| surface {total} authored constants/rules")
    ev = rows["even80"]
    resp = {m: (rows[m]["rush"]["sim"] / ev["rush"]["sim"], rows[m]["rush"]["engine"] / ev["rush"]["engine"])
            for m in ("home_plus4", "home_plus8", "home_minus8")}
    print("response elasticities (rush, vs even80):")
    for m, (s, e) in resp.items():
        print(f"    {m}: play engine x{s:.2f} vs drive engine x{e:.2f} -> sensitivity ratio {s/e:.2f}")

if __name__ == "__main__":
    main()
