#!/usr/bin/env python3
"""MERGE PROTOTYPE — P-340, the merged flex formula (Z.ai, seat ZAI, 2026-11-11).

The merged form (the proposal):

    price(src>dst) = tier( max( M + lambda*S ,  E_src * G ) )

  M + lambda*S : ZAI-D1 V4 ability (the worst weighted duty gap + lambda x the sum
                 of the rest) — the Owner's "together": both the single worst
                 deficiency AND the accumulation contribute.
  G            : Claude's measured guard, 20*(1 - v_src/v_dst) when uphill, else 0.
                 v = MEASURED localWins20 (P-321). slots.ts input weights give the
                 same tiers (MUSE/Inkling/Glyph triple-confirmed); sport-football.json
                 (C 200 / OLB 200) is STALE and is shown only for the record.
  E_src        : the source role's MEASURED play share (Ledger Phase 1, 4-3 staging).
                 The socialism/exposure factor: the guard protects the source slot's
                 incumbent, and the snaps an incumbent can lose are E of the team's
                 plays. A role on the field for an eighth of the plays (FB 0.1265)
                 offers an eighth of the arbitrage surface — and displacing him is
                 an eighth of the harm. Reduces the price in BOTH directions for an
                 unimportant role: into the role the guard is 0 by downhill arithmetic
                 (v_dst is the smallest), out of the role the guard scales by E.

  tiers 0/2/6/12 through cuts 1/4/9. No gate, no floor, no named exceptions,
  no pair tables. One fitted constant (lambda); E is measured, not fitted.

Variants scored against the live 99-rule table (97 cross-role + 2 self):
  V0  ability only (lambda 0.4 / 0.20)                      — the Z.ai parent
  V1  max(A, G) plain guard, correct engine weights         — the corrected baseline
  V1s max(A, G) plain guard, STALE weights (for the record) — Claude's 94/97
  V2  max(A, E*G) exposure guard                            — THE MERGE
  V2b V2 with simple-mean E_OLB (sensitivity)
  V2v max(A, G_tilde), G on per-play values v/E             — considered, rejected
  V3  V2 + per-slot destination anchoring (C>OG decision)   — both collapse conventions

Also: LOO (MUSE's protocol: lambda refit per fold), the FB family + the E<0.222
acceptance test, the centre diagnostic, the price-vs-Lab gate (T6 pairs), and the
Q8 new-role pricing (SS2 + DL5 blitzer).

Deterministic: no RNG. Read-only: takes the live flex.json as its only input.

Usage: python3 merge_prototype.py <flex.json>
"""
import json, sys, math

# ---------------------------------------------------------------- ZAI-D1 V4 duty tables
DUTIES = ["PBLK", "RBLK", "SNP", "CTH", "RTE", "CARRY", "THR", "MCOV",
          "ZCOV", "RNG", "RUSH", "EREP", "RDEF", "TKL", "KCK", "PNT", "DEEP"]
W_DUTY = {"PBLK": 1.55, "RBLK": 0.5, "SNP": 0.55, "CTH": 0.7, "RTE": 1.3,
          "CARRY": 0.9, "THR": 1.4, "MCOV": 1.5, "ZCOV": 1.0, "RNG": 0.8,
          "RUSH": 0.9, "EREP": 1.2, "RDEF": 1.2, "TKL": 0.7, "KCK": 0.4,
          "PNT": 0.4, "DEEP": 1.5}
SCOPE = {"THR": ["QB"], "KCK": ["K"], "PNT": ["P"], "EREP": ["EDGE", "DL5"]}  # EREP extended to DL5 (the blitzer rushes from the edge too — ZAI-D1 5.3; Q10-class detail)
TIERS = [0, 2, 6, 12]

# HAVE: ZAI-D1 + the Owner's three score changes (EDGE CARRY 4, C PBLK 6, TE PBLK 4)
HAVE = {
 "QB":  [1, 1, 0, 2, 1, 6, 10, 2, 2, 4, 0, 0, 1, 2, 0, 0, 0],
 "RB":  [1, 6, 0, 6, 4, 10, 0, 2, 1, 6, 0, 0, 2, 3, 0, 0, 0],
 "FB":  [2, 8, 0, 3, 3, 9, 0, 2, 1, 5, 0, 0, 5, 5, 0, 0, 0],
 "WR":  [1, 2, 0, 9, 10, 6, 1, 6, 2, 8, 0, 0, 1, 4, 0, 0, 4],
 "TE":  [4, 7, 1, 8, 4, 4, 0, 4, 4, 5, 1, 0, 3, 3, 0, 0, 0],
 "OT":  [10, 9, 5, 1, 0, 1, 0, 0, 0, 2, 6, 6, 5, 3, 0, 0, 0],
 "OG":  [9, 9, 6, 1, 0, 1, 0, 0, 0, 2, 6, 6, 5, 3, 0, 0, 0],
 "C":   [6, 9, 10, 1, 0, 1, 0, 0, 0, 2, 3, 5, 3, 3, 0, 0, 0],
 "DT":  [5, 5, 0, 1, 0, 1, 0, 0, 0, 2, 6, 6, 9, 6, 0, 0, 0],
 "EDGE":[5, 5, 0, 2, 0, 4, 0, 3, 3, 6, 10, 10, 9, 6, 0, 0, 0],
 "ILB": [3, 4, 0, 4, 0, 2, 0, 7, 8, 7, 5, 1, 9, 9, 0, 0, 0],
 "OLB": [3, 4, 0, 4, 0, 2, 0, 4, 2, 7, 8, 2, 7, 8, 0, 0, 1],
 "SS":  [1, 3, 0, 4, 2, 2, 0, 7, 9, 9, 1, 0, 4, 8, 0, 0, 8],
 "FS":  [0, 1, 0, 5, 2, 1, 0, 6, 9, 10, 0, 0, 3, 6, 0, 0, 9],
 "CB":  [0, 1, 0, 7, 7, 2, 0, 10, 9, 9, 1, 0, 4, 6, 0, 0, 7],
 "K":   [0, 0, 0, 3, 0, 1, 0, 1, 1, 3, 0, 0, 0, 2, 10, 5, 0],
 "P":   [0, 0, 0, 3, 0, 1, 0, 1, 1, 3, 0, 0, 0, 2, 5, 10, 0],
}
NEED = {
 "QB":  {"THR": 10, "CARRY": 4, "RNG": 4},
 "RB":  {"CARRY": 10, "PBLK": 1, "RBLK": 5, "CTH": 6, "RTE": 4, "RNG": 6, "RDEF": 2, "TKL": 2},
 "FB":  {"PBLK": 1, "RBLK": 5, "CTH": 1, "CARRY": 1, "RNG": 1, "RDEF": 2},
 "WR":  {"CTH": 9, "RTE": 10, "CARRY": 4, "RNG": 8, "RBLK": 1},
 "TE":  {"PBLK": 4, "RBLK": 6, "CTH": 7, "RTE": 4, "CARRY": 3, "RNG": 5, "RDEF": 3, "TKL": 3},
 "OT":  {"PBLK": 10, "RBLK": 9, "RNG": 2, "RDEF": 4},
 "OG":  {"PBLK": 9, "RBLK": 9, "RNG": 2, "RDEF": 4},
 "C":   {"PBLK": 8, "RBLK": 9, "SNP": 10, "RNG": 2, "RDEF": 3},
 "DT":  {"RUSH": 6, "RDEF": 9, "TKL": 6, "RNG": 2, "PBLK": 4},
 "EDGE":{"RUSH": 10, "EREP": 10, "RDEF": 8, "RNG": 4, "TKL": 4},
 "ILB": {"RDEF": 9, "TKL": 9, "MCOV": 5, "ZCOV": 7, "RNG": 6, "RUSH": 4, "CTH": 2},
 "OLB": {"MCOV": 3, "ZCOV": 2, "RNG": 6, "RUSH": 3, "RDEF": 6, "TKL": 6, "CTH": 2},
 "SS":  {"MCOV": 6, "ZCOV": 8, "RNG": 8, "TKL": 7, "CTH": 4, "DEEP": 2, "RDEF": 4, "RUSH": 1},
 "FS":  {"ZCOV": 8, "RNG": 10, "MCOV": 5, "TKL": 6, "CTH": 5, "DEEP": 6},
 "CB":  {"MCOV": 9, "ZCOV": 6, "RNG": 9, "TKL": 6, "CTH": 5, "RDEF": 2, "DEEP": 6, "RTE": 7},
 "K":   {"KCK": 10},
 "P":   {"PNT": 10},
 "NICKEL": {"MCOV": 5, "ZCOV": 4, "RNG": 8, "TKL": 7, "RDEF": 3, "CTH": 4, "DEEP": 3},
 "DIME": {"ZCOV": 7, "RNG": 9, "MCOV": 4, "TKL": 7, "RDEF": 3, "CTH": 4, "DEEP": 6},
 "DL5": {"RUSH": 9, "EREP": 5, "RDEF": 8, "TKL": 6, "RNG": 4},          # the blitzer NEED (ZAI-D1 5.3, Owner ruling 2026-11-10)
 "SS2": {"MCOV": 7, "ZCOV": 5, "RNG": 8, "TKL": 7, "CTH": 4, "DEEP": 4, "RDEF": 4, "RUSH": 1},  # big nickel, authored this session (INFERRED, ZAI-D1 method)
}

# ---------------------------------------------------------------- value layers
# (a) MEASURED localWins20, wins per +20 OVR (P-321; MUSE LOO table)  [REPORTED here, VERIFIED in P-321]
W_MEAS = {"QB": 2.4706, "RB": 0.6126, "FB": 0.0626, "WR": 1.6071,
          "TE": 0.6181, "OT": 1.2497, "OG": 1.0001, "C": 0.3752,
          "DT": 1.3158, "EDGE": 1.7097, "ILB": 0.7934, "OLB": 0.3950,
          "SS": 0.7887, "FS": 0.7893, "CB": 1.0557, "K": 0.1271,
          "P": 0.1182, "NICKEL": 0.2610, "DIME": 0.1310}
# (b) INPUT weights, slots.ts primary slot per role (engine weights — the settled source)
W_INPUT = {"QB": 1000, "RB": 250, "FB": 25, "WR": 650, "TE": 250,
           "OT": 500, "OG": 400, "C": 150, "DT": 500, "EDGE": 650,
           "ILB": 300, "OLB": 150, "SS": 300, "FS": 300, "CB": 400,
           "K": 50, "P": 50, "NICKEL": 100, "DIME": 50}
# (c) STALE: sport-football.json (the pre-redefinition P-318 bump; NOT to be used)
W_STALE = dict(W_INPUT, C=200, OLB=200)

# ---------------------------------------------------------------- exposures (Ledger Phase 1, 4-3 staged play shares)
E_SLOT = {"QB": 1.0, "RB1": 0.780, "RB2": 0.306, "FB": 0.1265,
          "WR1": 1.0, "WR2": 0.867, "WR3": 0.427, "WR4": 0.203,
          "TE1": 1.0, "TE2": 0.201, "TE3": 0.090,
          "OT1": 1.0, "OT2": 1.0, "OG1": 1.0, "OG2": 1.0, "C": 1.0,
          "DE1": 1.0, "DE2": 1.0, "DT1": 1.0, "DT2": 0.689, "DL5": 0.3111,
          "MIKE": 1.0, "WILL": 0.9306, "SAM": 0.3806,
          "CB1": 1.0, "CB2": 1.0, "CB3": 0.619, "DIME": 0.0694,
          "SS": 1.0, "FS": 1.0, "K": 1.0, "P": 1.0}
ROLE_SLOTS = {  # role -> its slots (slot, weight) in the 32-spot table
    "QB": [("QB", 1000)], "RB": [("RB1", 250), ("RB2", 100)], "FB": [("FB", 25)],
    "WR": [("WR1", 650), ("WR2", 400), ("WR3", 100), ("WR4", 50)],
    "TE": [("TE1", 250), ("TE2", 150), ("TE3", 50)],
    "OT": [("OT1", 500), ("OT2", 300)], "OG": [("OG1", 400), ("OG2", 250)],
    "C": [("C", 150)], "DT": [("DT1", 500), ("DT2", 300)],
    "EDGE": [("DE1", 650), ("DE2", 300)], "ILB": [("MIKE", 300)],
    "OLB": [("WILL", 150), ("SAM", 100)],
    "SS": [("SS", 300)], "FS": [("FS", 300)],
    "CB": [("CB1", 400), ("CB2", 250)], "NICKEL": [("CB3", 100)],
    "DIME": [("DIME", 50)], "K": [("K", 50)], "P": [("P", 50)],
}

# CORRECTION 2026-11-11 (MUSE P-340 review, nits): the weights below are SLOT weights
# (e.g. WILL 150 / SAM 100), so this factor is SLOT-WEIGHT-weighted, not snap-weighted.
# The canonical mode name is now "slotweighted"; "snapweighted" is kept as a deprecated
# alias (identical computation — it falls through to the same weighted path).
def role_exposure(role, mode="slotweighted"):
    slots = ROLE_SLOTS[role]
    if len(slots) == 1:
        return E_SLOT[slots[0][0]]
    es = [E_SLOT[s] for s, w in slots]
    if mode == "simple":
        return sum(es) / len(es)
    ws = [w for s, w in slots]
    tw = sum(ws)
    return sum(E_SLOT[s] * w for s, w in slots) / tw

E_ROLE = {r: role_exposure(r, "slotweighted") for r in ROLE_SLOTS}
E_ROLE_SIMPLE = {r: role_exposure(r, "simple") for r in ROLE_SLOTS}

# ---------------------------------------------------------------- per-slot values (for V3)
# MEASURED where REPORTED (Pickle P-341 2.2: OG1 1.0, OG2 0.6 slotWins20; C measured 0.3752);
# elsewhere role-measured x (slot weight / primary slot weight) — INFERRED interpolation,
# validated on the OG family (interpolated OG2 0.625 vs measured 0.6).
# CORRECTION 2026-11-11 (MUSE nits): OG2 here is Pickle's ROUNDED 0.6; the exact
# localWins20 OG2 is 0.6258, which gives the OG2 guard 8.01 (vs 7.49) — same tier (6),
# no fit or tier effect (V3 min-collapse still 97/97, mae 1.31 vs 1.30; V2 still 96;
# MUSE patched and re-ran, Z.ai reproduced: logs/og2_exact_sensitivity.log).
V_SLOT_MEASURED = {("OG", "OG1"): 1.0, ("OG", "OG2"): 0.6}

def slot_value(role, slot):
    key = (role, slot)
    if key in V_SLOT_MEASURED:
        return V_SLOT_MEASURED[key]
    slots = dict(ROLE_SLOTS[role])
    primary_w = max(w for _, w in ROLE_SLOTS[role])
    return W_MEAS[role] * slots[slot] / primary_w

def tier_of(x):
    return 0 if x < 1 else (2 if x < 4 else (6 if x < 9 else 12))

def ability_ms(src, dst):
    have = dict(zip(DUTIES, HAVE[src]))
    gaps = []
    for d, need in NEED[dst].items():
        if d in SCOPE and dst not in SCOPE[d]:
            continue
        deficit = max(0, need - have[d])
        if deficit > 0:
            gaps.append(W_DUTY[d] * deficit)
    if not gaps:
        return 0.0, 0.0
    gaps.sort(reverse=True)
    return gaps[0], sum(gaps[1:])

def guard(src, dst, weights):
    ws, wd = weights[src], weights[dst]
    return max(0.0, 20.0 * (1.0 - ws / wd))

def slot_guard(src, dst_role):
    """Per-slot destination anchoring: G against each dst slot; returns (min, max, per-slot list)."""
    out = []
    for s, w in ROLE_SLOTS[dst_role]:
        vs = slot_value(dst_role, s)
        g = max(0.0, 20.0 * (1.0 - W_MEAS[src] / vs)) if vs > W_MEAS[src] else 0.0
        out.append((s, g))
    gs = [g for _, g in out]
    return min(gs), max(gs), out

def raw_price(src, dst, form, lam, weights, e_mode="slotweighted"):
    m, s = ability_ms(src, dst)
    a = m + lam * s
    if form == "zai":
        return a, "ability"
    g = guard(src, dst, weights)
    if form in ("merged", "merged_stale"):
        return max(a, g), ("guard" if g > a else "ability")
    if form == "merged_exp":
        e = (E_ROLE_SIMPLE if e_mode == "simple" else E_ROLE).get(src, 1.0)
        eg = e * g
        return max(a, eg), ("guard" if eg > a else "ability")
    if form == "merged_vtilde":
        es, ed = E_ROLE.get(src, 1.0), E_ROLE.get(dst, 1.0)
        vs, vd = weights[src], weights[dst]
        g2 = max(0.0, 20.0 * (1.0 - (vs / es) / (vd / ed))) if es > 0 and ed > 0 else 0.0
        return max(a, g2), ("guard" if g2 > a else "ability")
    raise ValueError(form)

def raw_price_perslot(src, dst, lam, collapse):
    """V3 = V2 (exposure guard) + per-slot destination anchoring."""
    m, s = ability_ms(src, dst)
    a = m + lam * s
    gmin, gmax, per = slot_guard(src, dst)
    g = (gmin if collapse == "min" else gmax) * E_ROLE.get(src, 1.0)
    return max(a, g), ("guard" if g > a else "ability"), per

def avg_ranks(vals):
    """Average ranks (ties share the mean rank) — Spearman with ties."""
    order = sorted(range(len(vals)), key=lambda i: vals[i])
    ranks = [0.0] * len(vals)
    i = 0
    while i < len(order):
        j = i
        while j + 1 < len(order) and vals[order[j + 1]] == vals[order[i]]:
            j += 1
        r = (i + j) / 2 + 1
        for k in range(i, j + 1):
            ranks[order[k]] = r
        i = j + 1
    return ranks

def spearman(pairs):
    ra = avg_ranks([p[0] for p in pairs])
    rb = avg_ranks([p[1] for p in pairs])
    n = len(pairs)
    d2 = sum((ra[i] - rb[i]) ** 2 for i in range(n))
    return 1 - 6 * d2 / (n * (n * n - 1))

def score(pairs, form, lam, weights=None, collapse=None, e_mode="slotweighted", name=""):
    rows = []
    for (src, dst, own) in pairs:
        if form == "perslot":
            raw, dom, per = raw_price_perslot(src, dst, lam, collapse)
        else:
            raw, dom = raw_price(src, dst, form, lam, weights, e_mode)
        rows.append({"k": f"{src}>{dst}", "own": own, "raw": round(raw, 3),
                     "model": tier_of(raw), "dom": dom})
    n = len(rows)
    exact = [r for r in rows if r["own"] == r["model"]]
    off1 = [r for r in rows if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) == 1]
    hard = [r for r in rows if abs(TIERS.index(r["own"]) - TIERS.index(r["model"])) > 1]
    mae = sum(abs(r["raw"] - r["own"]) for r in rows) / n
    sp = spearman([(r["raw"], r["own"]) for r in rows])
    under = [r["k"] for r in rows if r["model"] < r["own"]]
    over = [r["k"] for r in rows if r["model"] > r["own"]]
    return {"name": name, "rows": rows, "exact": len(exact), "off1": len(off1),
            "hard": len(hard), "mae": mae, "spearman": sp,
            "under": under, "over": over, "n": n,
            "off1_list": [r["k"] for r in off1], "hard_list": [r["k"] for r in hard],
            "exact_list": [r["k"] for r in exact]}

def fit_lambda(train, form, weights, collapse=None, e_mode="slotweighted"):
    best = None
    lam = 0.0
    while lam <= 1.0001:
        errs = []
        for (src, dst, own) in train:
            raw = raw_price_perslot(src, dst, lam, collapse)[0] if form == "perslot" \
                else raw_price(src, dst, form, lam, weights, e_mode)[0]
            errs.append(abs(raw - own))
        mae = sum(errs) / len(errs)
        if best is None or mae < best[1] - 1e-12:
            best = (lam, mae)
        lam += 0.05
    return best

def loo(pairs, form, weights, collapse=None, e_mode="slotweighted", label=""):
    roles = sorted({s for s, d, o in pairs} | {d for s, d, o in pairs})
    tot_err = tot_n = tot_ex = 0
    fitted = []
    per_role = []
    for r in roles:
        held = [(s, d, o) for (s, d, o) in pairs if s == r or d == r]
        train = [(s, d, o) for (s, d, o) in pairs if s != r and d != r]
        if not held:
            continue
        lam, train_mae = fit_lambda(train, form, weights, collapse, e_mode)
        fitted.append(lam)
        errs, ex = [], 0
        for (s, d, own) in held:
            raw = raw_price_perslot(s, d, lam, collapse)[0] if form == "perslot" \
                else raw_price(s, d, form, lam, weights, e_mode)[0]
            errs.append(abs(raw - own))
            ex += tier_of(raw) == own
        tot_err += sum(errs); tot_n += len(errs); tot_ex += ex
        per_role.append((r, lam, sum(errs) / len(errs), ex, len(errs)))
    return {"form": label, "held_out_mae": round(tot_err / tot_n, 3), "n": tot_n,
            "exact": tot_ex, "exact_pct": round(100.0 * tot_ex / tot_n, 1),
            "lambda_min": min(fitted), "lambda_max": max(fitted),
            "lambda_mean": round(sum(fitted) / len(fitted), 3),
            "per_role": sorted(per_role)}

def main():
    live = json.load(open(sys.argv[1]))["flex"]
    pairs97 = [(s, d, o) for s, ds in live.items() for d, o in ds.items() if s != d]
    pairs99 = [(s, d, o) for s, ds in live.items() for d, o in ds.items()]
    print(f"oracle: live flex.json — {len(pairs99)} rules ({len(pairs97)} cross-role + {len(pairs99)-len(pairs97)} self)")

    bad = []
    for role in HAVE:
        have = dict(zip(DUTIES, HAVE[role]))
        for d, need in NEED.get(role, {}).items():
            if need > have[d]:
                bad.append(f"{role} {d}")
    print("need<=have violations:", bad if bad else "none")

    print("\n== role exposures (Ledger Phase 1 play shares; slot-weight-weighted role mean) ==")
    for r in sorted(E_ROLE):
        extra = f"   (simple {E_ROLE_SIMPLE[r]:.4f})" if len(ROLE_SLOTS[r]) > 1 else ""
        print(f"  {r:>6}: {E_ROLE[r]:.4f}{extra}")

    results = {}
    print("\n== in-sample fit, 97 cross-role rules ==")
    for lam in (0.4, 0.2):
        results[f"V0_zai_lam{lam}"] = score(pairs97, "zai", lam, None, name=f"V0 ability-only lam={lam}")
        r = results[f"V0_zai_lam{lam}"]
        print(f"  {r['name']}: exact {r['exact']} off1 {r['off1']} hard {r['hard']} mae {r['mae']:.2f} rho {r['spearman']:.3f}")
    for lam in (0.4, 0.2):
        for w, wtag in ((W_MEAS, "meas"), (W_INPUT, "input"), (W_STALE, "stale")):
            key = f"V1_{wtag}_lam{lam}"
            results[key] = score(pairs97, "merged_stale" if wtag == "stale" else "merged", lam, w,
                                 name=f"V1 plain guard ({wtag} w) lam={lam}")
            r = results[key]
            print(f"  {r['name']}: exact {r['exact']} off1 {r['off1']} hard {r['hard']} mae {r['mae']:.2f} rho {r['spearman']:.3f}")
        for form, nm, key in (("merged_exp", "V2 EXPOSURE guard (measured w)", "V2_exp"),
                              ("merged_exp", "V2b exposure, simple-mean E_OLB", "V2b_exp_simple"),
                              ("merged_vtilde", "V2v per-play-value guard (rejected)", "V2v_vtilde")):
            results[f"{key}_lam{lam}"] = score(pairs97, form, lam, W_MEAS,
                                               e_mode=("simple" if "simple" in key else "slotweighted"),
                                               name=f"{nm} lam={lam}")
            r = results[f"{key}_lam{lam}"]
            print(f"  {r['name']}: exact {r['exact']} off1 {r['off1']} hard {r['hard']} mae {r['mae']:.2f} rho {r['spearman']:.3f}")
        for collapse in ("min", "max"):
            results[f"V3_perslot_{collapse}_lam{lam}"] = score(pairs97, "perslot", lam, None, collapse=collapse,
                                                               name=f"V3 per-slot dst anchoring, {collapse}-collapse lam={lam}")
            r = results[f"V3_perslot_{collapse}_lam{lam}"]
            print(f"  {r['name']}: exact {r['exact']} off1 {r['off1']} hard {r['hard']} mae {r['mae']:.2f} rho {r['spearman']:.3f}")

    for lam in (0.4, 0.2):
        r99 = score(pairs99, "merged_exp", lam, W_MEAS, name=f"V2 lam={lam} (99 incl. self)")
        results[f"V2_exp_lam{lam}_99"] = r99
        print(f"  V2 lam={lam} on the full 99: exact {r99['exact']}/99")

    print("\n== the FB family + the acceptance test (V2) ==")
    for lam in (0.4, 0.2):
        for s in live:
            for d, own in live[s].items():
                if s != "FB" and d != "FB":
                    continue
                raw, dom = raw_price(s, d, "merged_exp", lam, W_MEAS)
                print(f"  lam={lam}  {s}>{d}: owner {own}  merged {raw:.2f} -> tier {tier_of(raw)} ({dom})  {'OK' if tier_of(raw)==own else 'MISS'}")
    g_fbrb = guard("FB", "RB", W_MEAS)
    band = 4.0 / g_fbrb
    print(f"  acceptance test: FB>RB lands tier 2 iff E_FB < 4/G = {band:.4f}  (G={g_fbrb:.2f}); "
          f"Ledger measured E_FB = {E_ROLE['FB']:.4f} -> "
          f"{'INSIDE the band — the straddle RESOLVES to the Owner 2' if E_ROLE['FB'] < band else 'OUTSIDE — honest disagreement, the 2 should be 6'}")

    print("\n== centre diagnostic (under-priced rows = the arbitrage class) ==")
    for key in ("V0_zai_lam0.4", "V0_zai_lam0.2", "V1_meas_lam0.4", "V1_meas_lam0.2",
                "V2_exp_lam0.4", "V2_exp_lam0.2", "V3_perslot_min_lam0.2", "V3_perslot_min_lam0.4"):
        r = results[key]
        cout = [k for k in r["under"] if k.startswith("C>")]
        print(f"  {r['name']}:")
        print(f"      under-priced {len(r['under'])}: {', '.join(r['under']) if r['under'] else 'none'}")
        print(f"      C-src under-priced: {', '.join(cout) if cout else 'NONE'}")

    print("\n== per-slot C>OG decision (the one residual) ==")
    for lam in (0.4, 0.2):
        gmin, gmax, per = slot_guard("C", "OG")
        raw, dom, _ = raw_price_perslot("C", "OG", lam, "min")
        print(f"  lam={lam}: C>OG per-slot guards {['%s %.2f' % (s, g) for s, g in per]} -> min-collapse price {raw:.2f} tier {tier_of(raw)} (owner 6)")
    print("  per-slot min-collapse re-anchors every multi-slot dst — the rows that move:")
    for lam in (0.4, 0.2):
        moved = []
        for (s, d, own) in pairs97:
            if len(ROLE_SLOTS.get(d, [])) < 2:
                continue
            rmin = raw_price_perslot(s, d, lam, "min")[0]
            rrole, _ = raw_price(s, d, "merged_exp", lam, W_MEAS)
            if tier_of(rmin) != tier_of(rrole):
                moved.append(f"{s}>{d} owner {own}: role-level {tier_of(rrole)} -> per-slot {tier_of(rmin)}")
        print(f"    lam={lam}: " + ("; ".join(moved) if moved else "none"))

    print("\n== price-vs-Lab gate (T6 pairs, REPORTED; OVR-eq = wins / slope[dst], slope = v_dst/20) ==")
    lab = [("TE", "WR1", 0.63), ("CB", "WR1", 0.67), ("CB", "FS", 0.284),
           ("EDGE", "DT1", 0.39), ("WR", "RB1", 0.31), ("QB", "FS", 0.975)]
    dst_slope = {"WR1": W_MEAS["WR"] / 20, "FS": W_MEAS["FS"] / 20,
                 "DT1": W_MEAS["DT"] / 20, "RB1": W_MEAS["RB"] / 20}
    slot_of = {"WR1": "WR", "FS": "FS", "DT1": "DT", "RB1": "RB"}
    gate = {}
    for lam in (0.4, 0.2):
        diffs_f, diffs_o = [], []
        print(f"  lam={lam}:")
        for s, dslot, wins in lab:
            dst_role = slot_of[dslot]
            own = live.get(s, {}).get(dst_role)
            praw, _ = raw_price(s, dst_role, "merged_exp", lam, W_MEAS)
            lab_eq = wins / dst_slope[dslot]
            df, do = abs(praw - lab_eq), abs((own or 0) - lab_eq)
            diffs_f.append(df); diffs_o.append(do)
            note = "   [REPORTED lab OVR-eq @90: 22.8]" if (s, dslot) == ("QB", "FS") else ""
            print(f"    {s}>{dslot}: lab {wins} wins = {lab_eq:.1f} OVR-eq | merged {praw:.2f} (owner {own}) | d_formula {df:.1f} d_owner {do:.1f}{note}")
        print(f"    mean |price - lab|: formula {sum(diffs_f)/6:.2f}  owner table {sum(diffs_o)/6:.2f}")
        gate[f"lam{lam}"] = {"formula_mean_abs_delta": round(sum(diffs_f) / 6, 2),
                             "owner_mean_abs_delta": round(sum(diffs_o) / 6, 2),
                             "pairs": [{"pair": f"{s}>{dslot}", "lab_wins": w,
                                        "lab_ovreq": round(w / dst_slope[dslot], 2),
                                        "merged": round(raw_price(s, slot_of[dslot], "merged_exp", lam, W_MEAS)[0], 2),
                                        "owner": live.get(s, {}).get(slot_of[dslot])}
                                       for s, dslot, w in lab]}
    results["gate"] = gate

    print("\n== LOO (MUSE protocol: lambda refit per fold 0.00-1.00 step 0.05, 194 held-out cases) ==")
    loo_results = {}
    for form, w, collapse, lbl in (("zai", None, None, "V0 ability-only"),
                                   ("merged", W_MEAS, None, "V1 plain guard (measured)"),
                                   ("merged_exp", W_MEAS, None, "V2 EXPOSURE guard (measured)")):
        r = loo(pairs97, form, w, collapse, label=lbl)
        loo_results[lbl] = r
        print(f"  {lbl}: held-out mae {r['held_out_mae']:.2f} over {r['n']}, exact {r['exact']}/{r['n']} "
              f"({r['exact_pct']:.1f}%), lam fitted {r['lambda_min']:.2f}-{r['lambda_max']:.2f} (mean {r['lambda_mean']:.2f})")
        worst = sorted(r["per_role"], key=lambda t: -t[2])[:4]
        print(f"      worst roles: " + ", ".join(f"{ro} {e:.2f}({n}) ex={x}/{n}" for ro, l, e, x, n in worst))
    results["loo"] = loo_results

    print("\n== Q8: new roles — the Owner defines the NEED, the formula prices the moves ==")
    for new_role in ("SS2", "DL5"):
        print(f"  --- {new_role} (NEED {NEED[new_role]}) ---")
        if new_role == "DL5":
            lev_dt2 = slot_value("DT", "DT2") / E_SLOT["DT2"]
            lev_de2 = slot_value("EDGE", "DE2") / E_SLOT["DE2"]
            lev = (lev_dt2 + lev_de2) / 2
            v_dl5 = E_SLOT["DL5"] * lev
            print(f"  value: E_DL5 MEASURED {E_SLOT['DL5']}; leverage/play interpolated (DT2 {lev_dt2:.3f}, DE2 {lev_de2:.3f}) -> mean {lev:.3f}")
            print(f"  v_DL5 = E x leverage = {v_dl5:.3f} wins = {v_dl5/0.00254:.0f} weight-units (engine's own DL5 weight: 150) -> guard ON")
            gsrc = {s: (max(0.0, 20.0 * (1.0 - W_MEAS[s] / v_dl5)) if v_dl5 > W_MEAS[s] else 0.0)
                    for s in W_MEAS}
        else:
            print("  value: no slot, no measured share yet -> the guard is SILENT (0) until the Ledger")
            print("  stages a big-nickel package and measures E_SS2; ability prices the moves meanwhile.")
            gsrc = {s: 0.0 for s in W_MEAS}
        for lam in (0.2,):
            outs = []
            for s in ("QB", "RB", "FB", "WR", "TE", "OT", "OG", "C", "DT", "EDGE", "ILB", "OLB", "SS", "FS", "CB", "K", "P"):
                m, ss = ability_ms(s, new_role)
                a = m + lam * ss
                raw = max(a, gsrc[s])
                outs.append(f"{s} {tier_of(raw)}")
            print(f"  lam={lam} tiers INTO {new_role}: " + "  ".join(outs))

    print("\n== lambda ablation for V2 (tiers vs continuous error — the Owner's dial) ==")
    lam_table = []
    lam = 0.05
    while lam <= 0.6001:
        r = score(pairs97, "merged_exp", round(lam, 2), W_MEAS)
        lam_table.append({"lam": round(lam, 2), "exact": r["exact"], "off1": r["off1"], "hard": r["hard"], "mae": round(r["mae"], 3)})
        print(f"  lam={lam:.2f}: exact {r['exact']:2d} off1 {r['off1']} hard {r['hard']} mae {r['mae']:.2f}")
        lam += 0.05
    results["lam_ablation"] = lam_table

    out = {"meta": {"oracle": "live flex.json (architect/engine-and-seats, 99 rules)",
                    "weights": {"measured_localWins20": W_MEAS, "input_slots": W_INPUT, "stale_record": W_STALE},
                    "exposures_slotweighted": {k: round(v, 4) for k, v in E_ROLE.items()},  # was exposures_snapweighted — renamed 2026-11-11 (MUSE nits; same numbers)
                    "exposures_simple": {k: round(v, 4) for k, v in E_ROLE_SIMPLE.items()},
                    "E_slot_ledger_phase1": E_SLOT},
           "fb_acceptance": {"band_E_lt": round(band, 4), "G_FBRB": round(g_fbrb, 3),
                             "E_FB_measured": E_ROLE["FB"], "confirmed": bool(E_ROLE["FB"] < band)},
           "gate": gate, "loo": loo_results, "lam_ablation": lam_table,
           "fits": {k: {kk: vv for kk, vv in results[k].items() if kk not in ("rows", "exact_list")}
                    for k in results if k not in ("gate", "loo", "lam_ablation")},
           "rows": {k: results[k]["rows"] for k in results if k not in ("gate", "loo", "lam_ablation")},
           }
    json.dump(out, open("merge_results.json", "w"), indent=1)
    print("\nwrote merge_results.json")

if __name__ == "__main__":
    main()
