#!/usr/bin/env python3
"""P-345 — the lambda-objective receipts (Z.ai seat, 2026-11-12).

Everything the lambda-objective filing cites, computed in one deterministic pass:

  SECTION B — the row tables (filing sec 1.2)
     the 11 rows the two objectives disagree on, the rows where 0.40's gaps sit
     furthest from the Owner's integers, the three Owner-ruling rows under V2 and
     V3, and the decomposition of the mae difference (where 0.20's mae win comes
     from) + the DISPLAY accounting (|displayed integer - owner integer| — the
     error the user can actually see; the raw-price mae never reaches the screen).

  SECTION C — the draft-board test (filing sec 1.3, VL's receipt)
     for each held-out season E (2023, 2024, 2025, Glyph's held-out convention,
     plus the staged and decade-mean E for reference): price all 97 installs under
     both objectives and count
       (a) visible ordering inversions — pairs of installs whose DISPLAYED price
           order flips between 0.40 and 0.20 (strict on both sides), plus ordering
           collapses (strict under one, tie under the other) and raw-order flips;
       (b) mean gap error on trades — mean |raw - owner| and mean |displayed - owner|,
           unweighted and value-weighted by the destination slot's measured value v;
       (c) where they concentrate — by destination-slot value bucket (the traded
           constant slots vs the rarely-seen slots).

  SECTION D — the LOO extension (MUSE protocol + the 0.40 objective's own rule)
     MUSE's LOO refits lambda per fold by MEAN ERROR — that is the 0.20 objective's
     fitting rule. The 0.40 objective's own rule (refit by EXACT TIERS, tie-break
     mae) was never run. Both are run here on the shipped V2 form, with the
     per-unique-row rendering (the "/97" accounting) and the out-of-sample
     user-visible integer error. The V1-era "0.34 -> 2.63" FB finding is
     re-derived to establish its provenance (plain guard, already repaired by V2).

  SECTION E — the third-way grid (filing sec 1.6)
     E1 V3 per-slot min-collapse at 0.20 (does it buy anything?);
     E2 the full lambda ablation under V2 AND V3-min (is 0.2/0.4 the whole frontier?);
     E3 role-family lambda (2 constants: OL-family srcs vs the rest);
     E4 the blend shape (sum instead of max);
     E5 tier-preserving recompression (move the raws toward the integer ruler
        without touching a single tier — does the mae front collapse?);
     E6 where the guard actually binds (dom=guard row count per lambda — is there
        room for a per-role choice of which layer binds?).

Deterministic: no RNG, no network, no engine edits. Read-only inputs:
  flex-99-live.json          (the live 99-rule table)
  c1_era_e_table.json        (the shipped measured per-season E tables, C1 receipt)
  merge_prototype.py         (the P-340 merged formula, as delivered)

Usage: python3 zai_p345_draftboard_and_thirdway.py <dir-with-inputs> <out-json>
"""
import copy
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
INPUT_DIR = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "inputs")
OUT_JSON = sys.argv[2] if len(sys.argv) > 2 else os.path.join(HERE, "results_p345_draftboard.json")

sys.path.insert(0, os.path.join(HERE, "formula"))
import merge_prototype as MP  # noqa: E402  (the delivered P-340 formula, unmodified)

TIERS = MP.TIERS  # [0, 2, 6, 12]

# ---------------------------------------------------------------- inputs
live = json.load(open(os.path.join(INPUT_DIR, "flex-99-live.json")))["flex"]
pairs97 = [(s, d, o) for s, ds in live.items() for d, o in ds.items() if s != d]
pairs99 = [(s, d, o) for s, ds in live.items() for d, o in ds.items()]
C1 = json.load(open(os.path.join(INPUT_DIR, "c1_era_e_table.json")))

# the staged (v2) E table, exactly as shipped in merge_prototype.py
E_STAGED = {"QB": 1.0, "RB1": 0.780, "RB2": 0.306, "FB": 0.1265,
            "WR1": 1.0, "WR2": 0.867, "WR3": 0.427, "WR4": 0.203,
            "TE1": 1.0, "TE2": 0.201, "TE3": 0.090,
            "OT1": 1.0, "OT2": 1.0, "OG1": 1.0, "OG2": 1.0, "C": 1.0,
            "DE1": 1.0, "DE2": 1.0, "DT1": 1.0, "DT2": 0.689, "DL5": 0.3111,
            "MIKE": 1.0, "WILL": 0.9306, "SAM": 0.3806,
            "CB1": 1.0, "CB2": 1.0, "CB3": 0.619, "DIME": 0.0694,
            "SS": 1.0, "FS": 1.0, "K": 1.0, "P": 1.0}


def set_e(slots):
    """Swap the formula's E table (C1's own convention, c1_era_e_table.py set_e)."""
    MP.E_SLOT.clear()
    MP.E_SLOT.update(slots)
    MP.E_ROLE.clear()
    MP.E_ROLE.update({r: MP.role_exposure(r, "slotweighted") for r in MP.ROLE_SLOTS})


def season_slots(s):
    """Season s's E on the C1 convention: seat shares, with FB / DIME / DL5 on their
    corrected per-play bases, K/P at 1.0 (identical to c1_era_e_table.py lines 280-287)."""
    fb = C1["fb_bases_by_season"][str(s)]["corrected_perrow_teammean"]
    sl = dict(C1["e_slot_by_season"][str(s)])
    sl["FB"] = fb
    sl["DIME"] = C1["dime_per_season"][str(s)]
    sl["DL5"] = C1["dl5_per_season"][str(s)]
    sl.setdefault("K", 1.0)
    sl.setdefault("P", 1.0)
    return sl


def dst_primary_slot(dst_role):
    return max(MP.ROLE_SLOTS[dst_role], key=lambda t: t[1])[0]


def v_dst(dst_role):
    """The measured value of the destination (primary slot) — what a trade is buying."""
    return MP.slot_value(dst_role, dst_primary_slot(dst_role))


def e_dst_primary(dst_role):
    return MP.E_SLOT[dst_primary_slot(dst_role)]


def price_rows(pairs, lam, collapse=None):
    out = {}
    for s, d, _ in pairs:
        if collapse:
            raw, dom, _ = MP.raw_price_perslot(s, d, lam, collapse)
        else:
            raw, dom = MP.raw_price(s, d, "merged_exp", lam, MP.W_MEAS)
        out[f"{s}>{d}"] = {"raw": raw, "dom": dom, "tier": MP.tier_of(raw)}
    return out


def owner_of(pairs):
    return {f"{s}>{d}": o for s, d, o in pairs}


def display_err(prices, owner):
    """The error the user can see: |displayed integer - owner integer|."""
    return sum(abs(prices[k]["tier"] - owner[k]) for k in owner) / len(owner)


def raw_err(prices, owner):
    return sum(abs(prices[k]["raw"] - owner[k]) for k in owner) / len(owner)


def vw_display_err(prices, owner, pairs):
    """Value-weighted visible error, weights = destination slot value (v_dst)."""
    tot = sum(v_dst(d) for _, d, _ in pairs)
    return sum(v_dst(d) * abs(prices[f"{s}>{d}"]["tier"] - o) for s, d, o in pairs) / tot


def vw_raw_err(prices, owner, pairs):
    tot = sum(v_dst(d) for _, d, _ in pairs)
    return sum(v_dst(d) * abs(prices[f"{s}>{d}"]["raw"] - o) for s, d, o in pairs) / tot


def order_pairs(prices, keys, use_tier=True):
    """All unordered pairs with a strict displayed (or raw) order under prices."""
    def val(k):
        p = prices[k]
        return p["tier"] if use_tier else p["raw"]
    out = set()
    for i, a in enumerate(keys):
        for b in keys[i + 1:]:
            va, vb = val(a), val(b)
            if va < vb:
                out.add((a, b))
            elif vb < va:
                out.add((b, a))
    return out


def owner_strict_pairs(owner, keys):
    out = set()
    for i, a in enumerate(keys):
        for b in keys[i + 1:]:
            oa, ob = owner[a], owner[b]
            if oa < ob:
                out.add((a, b))
            elif ob < oa:
                out.add((b, a))
    return out


def inversion_stats(prices_a, prices_b, owner, keys):
    """Pairs whose strict displayed order differs between objectives a and b."""
    ia, ib = order_pairs(prices_a, keys), order_pairs(prices_b, keys)
    inv = ia ^ ib  # symmetric difference = visible inversions + collapses
    collapse = {(x, y) for x, y in inv
                if prices_a[x]["tier"] == prices_a[y]["tier"]
                or prices_b[x]["tier"] == prices_b[y]["tier"]}
    strict = inv - collapse
    oa = owner_strict_pairs(owner, keys)
    return {"strict_inversions": sorted(f"{x}|{y}" for x, y in strict),
            "collapses": sorted(f"{x}|{y}" for x, y in collapse),
            "n_strict": len(strict), "n_collapse": len(collapse),
            "n_total_flips": len(inv),
            "board_vs_owner_errors": {"lam_a": len(oa - ia), "lam_b": len(oa - ib)},
            "owner_strict_pairs": len(oa)}


# ---------------------------------------------------------------- SECTION B
def section_b(owner, keys):
    out = {}
    set_e(E_STAGED)
    p4 = price_rows(pairs97, 0.4)
    p2 = price_rows(pairs97, 0.2)
    p4v3 = price_rows(pairs97, 0.4, collapse="min")
    p2v3 = price_rows(pairs97, 0.2, collapse="min")

    rows = []
    for k in keys:
        if p2[k]["tier"] != owner[k] or p4[k]["tier"] != owner[k]:
            rows.append({"k": k, "owner": owner[k],
                         "raw_0.4": round(p4[k]["raw"], 2), "tier_0.4": p4[k]["tier"],
                         "raw_0.2": round(p2[k]["raw"], 2), "tier_0.2": p2[k]["tier"],
                         "dom_0.2": p2[k]["dom"],
                         "v_dst": round(v_dst(k.split(">")[1]), 3),
                         "gap_err_0.4_display": abs(p4[k]["tier"] - owner[k]),
                         "gap_err_0.2_display": abs(p2[k]["tier"] - owner[k])})
    rows.sort(key=lambda r: -r["gap_err_0.2_display"])
    out["disagree_rows"] = rows

    worst = sorted(keys, key=lambda k: -abs(p4[k]["raw"] - owner[k]))[:12]
    out["worst_raw_gap_at_0.4"] = [{"k": k, "owner": owner[k],
                                    "raw": round(p4[k]["raw"], 2),
                                    "tier": p4[k]["tier"],
                                    "abs_err": round(abs(p4[k]["raw"] - owner[k]), 2)}
                                   for k in worst]

    # the three Owner-ruling rows under V2 and V3-min, both lambdas
    rulings = {}
    for k in ("FB>RB", "FB>TE", "C>OG"):
        rulings[k] = {"owner": owner[k],
                      "V2_0.4": {"raw": round(p4[k]["raw"], 2), "tier": p4[k]["tier"]},
                      "V2_0.2": {"raw": round(p2[k]["raw"], 2), "tier": p2[k]["tier"]},
                      "V3min_0.4": {"raw": round(p4v3[k]["raw"], 2), "tier": p4v3[k]["tier"]},
                      "V3min_0.2": {"raw": round(p2v3[k]["raw"], 2), "tier": p2v3[k]["tier"]}}
    out["owner_ruling_rows"] = rulings

    # mae decomposition: where does 0.20's raw-mae win come from?
    both_exact, only4, only2, off_both = [], [], [], []
    for k in keys:
        e4, e2 = p4[k]["tier"] == owner[k], p2[k]["tier"] == owner[k]
        (both_exact if e4 and e2 else only4 if e4 else only2 if e2 else off_both).append(k)
    def bucket_mae(ks):
        n = len(ks) or 1
        return {"n": len(ks),
                "sum_abs_raw_0.4": round(sum(abs(p4[k]["raw"] - owner[k]) for k in ks), 2),
                "sum_abs_raw_0.2": round(sum(abs(p2[k]["raw"] - owner[k]) for k in ks), 2),
                "mae_0.4": round(sum(abs(p4[k]["raw"] - owner[k]) for k in ks) / n, 3),
                "mae_0.2": round(sum(abs(p2[k]["raw"] - owner[k]) for k in ks) / n, 3)}
    out["mae_decomposition"] = {
        "exact_at_both": bucket_mae(both_exact),
        "exact_only_at_0.4": bucket_mae(only4),
        "exact_only_at_0.2": bucket_mae(only2),
        "exact_at_neither": bucket_mae(off_both),
        "check_mae_0.4": round(sum(abs(p4[k]["raw"] - owner[k]) for k in keys) / 97, 4),
        "check_mae_0.2": round(sum(abs(p2[k]["raw"] - owner[k]) for k in keys) / 97, 4)}

    # the display accounting (the user-visible error)
    out["display_accounting"] = {
        "V2_0.4": {"visible_err_mean": round(display_err(p4, owner), 4),
                   "visible_err_sum": sum(abs(p4[k]["tier"] - owner[k]) for k in keys),
                   "rows_wrong": sum(1 for k in keys if p4[k]["tier"] != owner[k]),
                   "vw_visible_err": round(vw_display_err(p4, owner, pairs97), 4)},
        "V2_0.2": {"visible_err_mean": round(display_err(p2, owner), 4),
                   "visible_err_sum": sum(abs(p2[k]["tier"] - owner[k]) for k in keys),
                   "rows_wrong": sum(1 for k in keys if p2[k]["tier"] != owner[k]),
                   "vw_visible_err": round(vw_display_err(p2, owner, pairs97), 4)},
        "V3min_0.4": {"visible_err_mean": round(display_err(p4v3, owner), 4),
                      "visible_err_sum": sum(abs(p4v3[k]["tier"] - owner[k]) for k in keys),
                      "rows_wrong": sum(1 for k in keys if p4v3[k]["tier"] != owner[k]),
                      "vw_visible_err": round(vw_display_err(p4v3, owner, pairs97), 4)},
        "V3min_0.2": {"visible_err_mean": round(display_err(p2v3, owner), 4),
                      "visible_err_sum": sum(abs(p2v3[k]["tier"] - owner[k]) for k in keys),
                      "rows_wrong": sum(1 for k in keys if p2v3[k]["tier"] != owner[k]),
                      "vw_visible_err": round(vw_display_err(p2v3, owner, pairs97), 4)},
        "raw_mae_V2_0.4": round(raw_err(p4, owner), 4),
        "raw_mae_V2_0.2": round(raw_err(p2, owner), 4),
        "raw_mae_V3min_0.4": round(raw_err(p4v3, owner), 4),
        "raw_mae_V3min_0.2": round(raw_err(p2v3, owner), 4),
        "vw_raw_mae_V2_0.4": round(vw_raw_err(p4, owner, pairs97), 4),
        "vw_raw_mae_V2_0.2": round(vw_raw_err(p2, owner, pairs97), 4)}
    return out, p4, p2, p4v3, p2v3


# ---------------------------------------------------------------- SECTION C
def section_c(owner, keys):
    out = {}
    # concentration axes, fixed per destination role
    conc = {}
    for k in keys:
        dst = k.split(">")[1]
        conc[k] = {"v_dst": v_dst(dst),
                   "e_dst": e_dst_primary(dst),
                   "dst": dst}
    # value buckets (measured destination value v): the traded-constant slots vs the rest
    def vbucket(v):
        return "high_v>=1.0" if v >= 1.0 else ("mid_v_0.4-1.0" if v >= 0.4 else "low_v<0.4")
    for k in conc:
        conc[k]["vbucket"] = vbucket(conc[k]["v_dst"])

    scenarios = [("held_out_2023", season_slots(2023)), ("held_out_2024", season_slots(2024)),
                 ("held_out_2025", season_slots(2025)),
                 ("staged_E", dict(E_STAGED)),
                 ("decade_mean_E", C1["e_slot_decade_mean"])]
    for name, slots in scenarios:
        set_e(slots)
        p4 = price_rows(pairs97, 0.4)
        p2 = price_rows(pairs97, 0.2)
        inv = inversion_stats(p4, p2, owner, keys)
        # concentration of the flips (strict + collapse) by destination value bucket
        by_bucket = {}
        for pairstr in inv["strict_inversions"] + inv["collapses"]:
            for k in pairstr.split("|"):
                b = conc[k]["vbucket"]
                d = by_bucket.setdefault(b, {"distinct_rows": set(), "pair_members": 0})
                d["distinct_rows"].add(k)
                d["pair_members"] += 1
        inv["flip_rows_by_value_bucket"] = {
            b: {"n_distinct_rows": len(d["distinct_rows"]),
                "rows": sorted(d["distinct_rows"])} for b, d in by_bucket.items()}
        # gap-error concentration by value bucket (both objectives)
        def bucket_errs(p):
            outb = {}
            for b in ("high_v>=1.0", "mid_v_0.4-1.0", "low_v<0.4"):
                ks = [k for k in keys if conc[k]["vbucket"] == b]
                outb[b] = {"n": len(ks),
                           "raw_mae": round(sum(abs(p[k]["raw"] - owner[k]) for k in ks) / len(ks), 3),
                           "display_mae": round(sum(abs(p[k]["tier"] - owner[k]) for k in ks) / len(ks), 3),
                           "display_err_share_of_sum": round(
                               sum(abs(p[k]["tier"] - owner[k]) for k in ks)
                               / max(1, sum(abs(p[k]["tier"] - owner[k]) for k in keys)), 3)}
            return outb
        block = {"inversions_between_objectives": inv,
                 "gap_errors_by_value_bucket": {"lam0.4": bucket_errs(p4), "lam0.2": bucket_errs(p2)},
                 "scoring": {
                     "lam0.4": {"exact": sum(1 for k in keys if p4[k]["tier"] == owner[k]),
                                "raw_mae": round(raw_err(p4, owner), 3),
                                "display_mae": round(display_err(p4, owner), 3)},
                     "lam0.2": {"exact": sum(1 for k in keys if p2[k]["tier"] == owner[k]),
                                "raw_mae": round(raw_err(p2, owner), 3),
                                "display_mae": round(display_err(p2, owner), 3)}}}
        out[name] = block
    # E role values used (for the record)
    out["E_role_staged"] = {r: round(MP.E_ROLE[r], 4) for r in sorted(MP.E_ROLE)}
    set_e(E_STAGED)
    return out


# ---------------------------------------------------------------- SECTION D
LAM_GRID = [round(0.05 * i, 2) for i in range(21)]  # MUSE's grid: 0.00-1.00 step 0.05


def raw_of(src, dst, form, lam):
    if form == "perslot":
        return MP.raw_price_perslot(src, dst, lam, "min")[0]
    return MP.raw_price(src, dst, form, lam, MP.W_MEAS)[0]


def fit_fold(train, form, rule):
    """rule 'mae' = MUSE protocol (min mean |raw-owner|);
       rule 'exact' = the 0.40 objective's own rule (max exact tiers, tie-break mae)."""
    best = None
    for lam in LAM_GRID:
        errs, ex = [], 0
        for s, d, o in train:
            r = raw_of(s, d, form, lam)
            errs.append(abs(r - o))
            ex += MP.tier_of(r) == o
        mae = sum(errs) / len(errs)
        key = (-ex, mae) if rule == "exact" else (mae, -ex)
        if best is None or key < best[0]:
            best = (key, lam, mae, ex)
    return {"lam": best[1], "train_mae": round(best[2], 3), "train_exact": best[3]}


def loo(form, rule):
    roles = sorted({s for s, d, o in pairs97} | {d for s, d, o in pairs97})
    folds = []
    tot_err = tot_n = tot_ex = tot_disp = 0
    for r in roles:
        held = [(s, d, o) for (s, d, o) in pairs97 if s == r or d == r]
        train = [(s, d, o) for (s, d, o) in pairs97 if s != r and d != r]
        fit = fit_fold(train, form, rule)
        errs, ex, disp = [], 0, 0
        for s, d, o in held:
            rr = raw_of(s, d, form, fit["lam"])
            errs.append(abs(rr - o))
            t = MP.tier_of(rr)
            ex += t == o
            disp += abs(t - o)
        tot_err += sum(errs); tot_n += len(errs)
        tot_ex += ex; tot_disp += disp
        folds.append({"role": r, "lam": fit["lam"], "held_n": len(held),
                      "held_mae": round(sum(errs) / len(errs), 3),
                      "held_exact": ex, "held_display_err": disp})
    # per-unique-row rendering: each of the 97 rows is held out twice (both endpoints)
    per_row = {}
    for f in folds:
        pass
    row_res = {}
    for f in folds:
        r = f["role"]
        for s, d, o in pairs97:
            if s == r or d == r:
                k = f"{s}>{d}"
                # price this row with THIS fold's lambda
                rr = raw_of(s, d, form, f["lam"])
                ok = MP.tier_of(rr) == o
                row_res.setdefault(k, []).append(ok)
    strict = sum(1 for k, v in row_res.items() if all(v))
    loose = sum(1 for k, v in row_res.items() if any(v))
    return {"form": form, "rule": rule,
            "held_mae": round(tot_err / tot_n, 3), "n_cases": tot_n,
            "held_exact_cases": tot_ex, "held_exact_pct": round(100.0 * tot_ex / tot_n, 1),
            "held_display_err_mean": round(tot_disp / tot_n, 3),
            "per_unique_row_strict_exact": strict,
            "per_unique_row_loose_exact": loose,
            "lam_fitted_min": min(f["lam"] for f in folds),
            "lam_fitted_max": max(f["lam"] for f in folds),
            "lam_fitted_mean": round(sum(f["lam"] for f in folds) / len(folds), 3),
            "folds": folds}


def section_d(owner):
    out = {}
    set_e(E_STAGED)
    out["V0_mae_refit"] = loo("zai", "mae")        # MUSE's 170/194 = the "85/97" rendering
    out["V2_mae_refit"] = loo("merged_exp", "mae")
    out["V2_exact_refit"] = loo("merged_exp", "exact")
    out["V3min_mae_refit"] = loo("perslot", "mae")
    out["V3min_exact_refit"] = loo("perslot", "exact")
    # provenance of the "0.34 -> 2.63" FB finding: V0 / V1 / V2 per-fold FB mae
    prov = {}
    for form, tag in (("zai", "V0_ability"), ("merged", "V1_plain_guard"),
                      ("merged_exp", "V2_exposure_guard")):
        roles = sorted({s for s, d, o in pairs97} | {d for s, d, o in pairs97})
        fb_mae = None
        held_fb = [(s, d, o) for (s, d, o) in pairs97 if s == "FB" or d == "FB"]
        train_fb = [(s, d, o) for (s, d, o) in pairs97 if s != "FB" and d != "FB"]
        fit = fit_fold(train_fb, form, "mae")
        errs = [abs(raw_of(s, d, form, fit["lam"]) - o) for s, d, o in held_fb]
        fb_mae = {"lam": fit["lam"], "fb_fold_mae": round(sum(errs) / len(errs), 3)}
        prov[tag] = fb_mae
    out["fb_fold_provenance"] = prov
    return out


# ---------------------------------------------------------------- SECTION E
def section_e(owner, keys):
    out = {}
    set_e(E_STAGED)

    # E2: the full ablation under V2 and V3-min
    abl = []
    for i in range(1, 13):
        lam = round(0.05 * i, 2)
        for collapse, tag in ((None, "V2"), ("min", "V3min")):
            pr = price_rows(pairs97, lam, collapse)
            abl.append({"lam": lam, "form": tag,
                        "exact": sum(1 for k in keys if pr[k]["tier"] == owner[k]),
                        "off1": sum(1 for k in keys if abs(TIERS.index(pr[k]["tier"]) - TIERS.index(owner[k])) == 1),
                        "raw_mae": round(raw_err(pr, owner), 3),
                        "display_err": round(display_err(pr, owner), 4)})
    out["E2_ablation"] = abl

    # E3: role-family lambda (2 constants: OL-family srcs vs the rest)
    OL_SRC = {"OT", "OG", "C"}
    grid = []
    for i in range(0, 13):
        lam_ol = round(0.05 * i, 2)
        for j in range(0, 13):
            lam_o = round(0.05 * j, 2)
            rows = []
            for s, d, o in pairs97:
                lam = lam_ol if s in OL_SRC else lam_o
                raw, _ = MP.raw_price(s, d, "merged_exp", lam, MP.W_MEAS)
                rows.append((raw, o))
            ex = sum(1 for r, o in rows if MP.tier_of(r) == o)
            mae = sum(abs(r - o) for r, o in rows) / len(rows)
            grid.append({"lam_OL": lam_ol, "lam_other": lam_o, "exact": ex,
                         "mae": round(mae, 3)})
    out["E3_family_lambda"] = {
        "best_exact": max(grid, key=lambda g: (g["exact"], -g["mae"])),
        "min_mae_at_exact_ge_96": min((g for g in grid if g["exact"] >= 96),
                                      key=lambda g: g["mae"], default=None),
        "max_exact_at_mae_le_1.076": max((g for g in grid if g["mae"] <= 1.076),
                                         key=lambda g: g["exact"], default=None),
        "beats_both_operating_points": [
            g for g in grid if g["exact"] >= 96 and g["mae"] <= 1.076][:10]}

    # E4: the blend shape price = M + lam*S + t*E*G (sum, guard added linearly)
    blends = []
    for lam in (0.2, 0.4):
        for ti in range(0, 11):
            t = round(0.1 * ti, 1)
            rows = []
            for s, d, o in pairs97:
                m, sa = MP.ability_ms(s, d)
                g = MP.guard(s, d, MP.W_MEAS)
                eg = MP.E_ROLE.get(s, 1.0) * g
                rows.append((m + lam * sa + t * eg, o))
            ex = sum(1 for r, o in rows if MP.tier_of(r) == o)
            mae = sum(abs(r - o) for r, o in rows) / len(rows)
            blends.append({"lam": lam, "t": t, "exact": ex, "mae": round(mae, 3)})
    out["E4_blend_sum"] = {
        "best_exact": max(blends, key=lambda b: (b["exact"], -b["mae"])),
        "beats_both_operating_points": [
            b for b in blends if b["exact"] >= 96 and b["mae"] <= 1.076][:10]}

    # E5: tier-preserving recompression (display-layer scale, tiers untouched)
    CUTS = [0.0, 1.0, 4.0, 9.0, 18.0]   # tier 12's upper reference span authored at 18 (2x the 9-cut; stated)
    LABELS = [0, 2, 6, 12]

    def recompress(x):
        for k in range(4):
            lo, hi = CUTS[k], CUTS[k + 1]
            if x < hi or (k == 3):
                g = (hi - LABELS[k]) / (hi - lo)
                return LABELS[k] + (x - lo) * g
        return x
    rec = []
    for i in range(1, 13):
        lam = round(0.05 * i, 2)
        pr = price_rows(pairs97, lam)
        ex = sum(1 for k in keys if MP.tier_of(recompress(pr[k]["raw"])) == owner[k])
        mae = sum(abs(recompress(pr[k]["raw"]) - owner[k]) for k in keys) / len(keys)
        assert all(MP.tier_of(recompress(pr[k]["raw"])) == pr[k]["tier"] for k in keys)
        rec.append({"lam": lam, "exact_after": ex, "raw_mae_after": round(mae, 3)})
    out["E5_recompression"] = {
        "rule": "T maps each tier interval [c_k, c_{k+1}) linearly onto [L_k, c_{k+1}); "
                "tier-12 upper reference authored at 18. Monotone, tier-preserving for ALL inputs.",
        "table": rec,
        "lam0.4": next(r for r in rec if r["lam"] == 0.4),
        "lam0.2": next(r for r in rec if r["lam"] == 0.2)}

    # E6: where the guard binds (is there room for a per-role choice of binding layer?)
    guard_dom = []
    for i in range(1, 13):
        lam = round(0.05 * i, 2)
        pr = price_rows(pairs97, lam)
        gd = [k for k in keys if pr[k]["dom"] == "guard"]
        guard_dom.append({"lam": lam, "n_guard_dominated": len(gd), "rows": sorted(gd)})
    out["E6_guard_binding"] = guard_dom
    return out


# ---------------------------------------------------------------- main
def main():
    owner = owner_of(pairs97)
    keys = sorted(owner)
    assert len(keys) == 97
    b, p4, p2, p4v3, p2v3 = section_b(owner, keys)
    c = section_c(owner, keys)
    d = section_d(owner)
    e = section_e(owner, keys)
    blob = {"B_row_tables": b, "C_draftboard": c, "D_loo": d, "E_thirdway": e}
    os.makedirs(os.path.dirname(OUT_JSON) or ".", exist_ok=True)
    json.dump(blob, open(OUT_JSON, "w"), indent=1)

    print("== B: display accounting (in-sample, staged E) ==")
    for k, v in b["display_accounting"].items():
        print(f"  {k}: {v}")
    print("\n== B: mae decomposition ==")
    for k, v in b["mae_decomposition"].items():
        print(f"  {k}: {v}")
    print("\n== B: Owner-ruling rows ==")
    for k, v in b["owner_ruling_rows"].items():
        print(f"  {k}: owner {v['owner']} | V2@0.4 {v['V2_0.4']} | V2@0.2 {v['V2_0.2']} | V3min@0.4 {v['V3min_0.4']} | V3min@0.2 {v['V3min_0.2']}")
    print("\n== C: draft-board test per scenario ==")
    for name in ("held_out_2023", "held_out_2024", "held_out_2025", "staged_E", "decade_mean_E"):
        blk = c[name]
        inv = blk["inversions_between_objectives"]
        print(f"  {name}: strict inversions {inv['n_strict']}, collapses {inv['n_collapse']}, "
              f"flips {inv['n_total_flips']} | board-vs-owner errors @0.4 {inv['board_vs_owner_errors']['lam_a']} "
              f"@0.2 {inv['board_vs_owner_errors']['lam_b']} of {inv['owner_strict_pairs']} strict pairs")
        print(f"    scoring: {blk['scoring']}")
        print(f"    flip rows by value bucket: {json.dumps(blk['inversions_between_objectives']['flip_rows_by_value_bucket'])}")
    print("\n== D: LOO ==")
    for k in ("V0_mae_refit", "V2_mae_refit", "V2_exact_refit", "V3min_mae_refit", "V3min_exact_refit"):
        v = d[k]
        print(f"  {k}: held mae {v['held_mae']} over {v['n_cases']}, exact {v['held_exact_cases']}/{v['n_cases']} "
              f"({v['held_exact_pct']}%), strict-row {v['per_unique_row_strict_exact']}/97, "
              f"loose-row {v['per_unique_row_loose_exact']}/97, display err {v['held_display_err_mean']}, "
              f"lam {v['lam_fitted_min']}-{v['lam_fitted_max']} (mean {v['lam_fitted_mean']})")
    print(f"  FB-fold provenance: {d['fb_fold_provenance']}")
    print("\n== E: third way ==")
    print(f"  E2 ablation (V2): {[ (r['lam'], r['exact'], r['raw_mae']) for r in e['E2_ablation'] if r['form']=='V2']}")
    print(f"  E2 ablation (V3min): {[ (r['lam'], r['exact'], r['raw_mae']) for r in e['E2_ablation'] if r['form']=='V3min']}")
    print(f"  E3 family lambda: best_exact {e['E3_family_lambda']['best_exact']}")
    print(f"  E3 min_mae at exact>=96: {e['E3_family_lambda']['min_mae_at_exact_ge_96']}")
    print(f"  E3 max_exact at mae<=1.076: {e['E3_family_lambda']['max_exact_at_mae_le_1.076']}")
    print(f"  E3 beats both operating points: {e['E3_family_lambda']['beats_both_operating_points']}")
    print(f"  E4 blend: best_exact {e['E4_blend_sum']['best_exact']}; beats both: {e['E4_blend_sum']['beats_both_operating_points']}")
    print(f"  E5 recompression lam0.4: {e['E5_recompression']['lam0.4']}  lam0.2: {e['E5_recompression']['lam0.2']}")
    print(f"  E6 guard-dominated rows per lam: {[(r['lam'], r['n_guard_dominated']) for r in e['E6_guard_binding']]}")
    print(f"\nwrote {OUT_JSON}")


if __name__ == "__main__":
    main()
