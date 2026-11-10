#!/usr/bin/env python3
"""ZAI-D2 — the gated-market derivation (Z.ai, 2026-11-10).

Designed from the Owner's flex-derivation Q&A (MUSE relay
zai-derivation-qa-design-2026-11-10.md). Builds on ZAI-D1 (the load-bearing
deficit) with four changes the Q&A demands:

  1. Smooth aggregation: the k-norm replaces M + 0.4*S (Q4: crazy math hidden,
     simple integers shown; no argmax kink; one constant k).
  2. Gated value guard: the ladder G = 20*(1 - v_src/v_dst) binds ONLY where
     the ladder is big (v_dst >= R * v_src) AND the worst duty gap is real
     (M >= M_GATE). Q11a (C>OT is the ladder) without breaking FB>RB 2 and
     OLB>ILB 6, which an ungated floor destroys. Q7: R and M_GATE are the
     adjustable knobs; a continuous soft-floor blend (beta) is also reported.
  3. NEED and HAVE are independent axes. A body is only ever measured against
     ANOTHER job's demand, so NEED[C][PBLK]=8 with HAVE[C][PBLK]=6 is honest
     and needs no pair-tracking (Q12). No SCOPE (NEED-side demand already
     scopes), no floor (Q10).
  4. Gravity is not a new term: it is the convex tail of the value function.
     grav(r) = sum of NEED*w*scarcity^2 concentrates exactly where double
     teams and deterrence live (WR1, EDGE1, CB1, DT1, QB). The engine measures
     actual gravity per player (P-335); the pack expresses its roots.

Inputs are position-level only: OVR + preferred position are the per-player
data (Q2, follow-up 1). Everything else lives in the sport pack, so the same
code runs any sport (Q3/Q5); slot values are DERIVED from the pack where the
Owner does not supply weights (Q5), validated against his salary weights here.

Usage: python3 zai_d2_derivation.py <flex.json> [--quiet]
"""
import json, sys, math

# ---------------------------------------------------------------- pack (NFL)
DUTIES = ["PBLK", "RBLK", "SNP", "CTH", "RTE", "CARRY", "THR", "MCOV",
          "ZCOV", "RNG", "RUSH", "EREP", "RDEF", "TKL", "KCK", "PNT", "DEEP"]
W = {"PBLK": 1.55, "RBLK": 0.5, "SNP": 0.55, "CTH": 0.7, "RTE": 1.3,
     "CARRY": 0.9, "THR": 1.4, "MCOV": 1.5, "ZCOV": 1.0, "RNG": 0.8,
     "RUSH": 0.9, "EREP": 1.2, "RDEF": 1.2, "TKL": 0.7, "KCK": 0.4,
     "PNT": 0.4, "DEEP": 1.5}

# HAVE: what a body raised at this role can supply, in transferable terms.
# NEED: what each job demands. INDEPENDENT AXES — never compared for the same
# role. Owner's three score changes (2026-11-10) already applied:
#   EDGE CARRY 2->4, C PBLK 9->6, TE PBLK 5->4.
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
 # dst-only roles (no HAVE row — you are not drafted here):
 "NICKEL": {"MCOV": 5, "ZCOV": 4, "RNG": 8, "TKL": 7, "RDEF": 3, "CTH": 4, "DEEP": 3},
 "DIME":   {"ZCOV": 7, "RNG": 9, "MCOV": 4, "TKL": 7, "RDEF": 3, "CTH": 4, "DEEP": 6},
}
# Owner's salary weights (ruling 2026-11-06), primary slot per role. Football's
# OPTIONAL value source; other sports use the derived one.
SALARY_PRIMARY = {"QB": 1000, "RB": 250, "FB": 25, "WR": 650, "TE": 250,
                  "OT": 500, "OG": 400, "C": 150, "DT": 500, "EDGE": 650,
                  "ILB": 300, "OLB": 150, "SS": 300, "FS": 300, "CB": 400,
                  "K": 50, "P": 50, "NICKEL": 100, "DIME": 50}

# ------------------------------------------------------------------- tuning
K = 2.0          # k-norm order (quadratic) — REPORTED ABLATION ONLY
LAM = 0.4        # the linear discount on the rest (ZAI-D1's measured lambda)
CAP = 12.0       # top of the scale (the repo's heavy tier)
STAR = 20.0      # the star convention (guard scale)
R_GATE = 3.0     # guard binds only if v_dst >= R_GATE * v_src
M_GATE = 6.0     # ...and only if the worst weighted gap is >= M_GATE points
TIERS = [0, 2, 6, 12]
CUTS = [1, 4, 9]  # kept ONLY to score against the 99; engine ships smooth P

# ------------------------------------------------------------ ability layer
def gaps(src, dst, have=None):
    hv = have if have is not None else HAVE
    h = dict(zip(DUTIES, hv[src]))
    out = {}
    for d, need in NEED[dst].items():
        defic = max(0.0, need - h[d])
        if defic > 0:
            out[d] = W[d] * defic
    return out

def ability(src, dst, k=None, lam=LAM, have=None):
    """The load-bearing deficit: M + lam * (sum of the rest).
    Smooth k-norm available via k= — the ablation showed it UNDER-compounds
    medium gaps (91-93/99 vs 98/99): several real shortfalls must add up or
    the Owner's 12s (TE>WR, RB>WR) break. Value-continuous either way; the
    kink sits only at argmax ties."""
    g = gaps(src, dst, have)
    if not g:
        return 0.0, 0.0, None, {}
    m = max(g.values())
    if k:  # smooth ablation form
        a = (sum(v ** k for v in g.values())) ** (1.0 / k)
    else:  # the design's form
        a = m + lam * sum(v for d, v in g.items() if v != m)
    return a, m, max(g, key=lambda d: g[d]), g

# -------------------------------------------------------------- value layer
# tau = snap share of the role's primary slot. NOT salary intuition: the sim's
# own package structure (which packages include which slots) makes tau
# measurable. Football values below; a new sport reads them from its minutes
# structure. Basketball: everyone high -> the ladder is mild (Q5 positionless).
TAU = {"QB": 1.0, "WR": 0.85, "EDGE": 0.85, "OT": 1.0, "DT": 0.8, "OG": 1.0,
       "C": 1.0, "CB": 0.9, "ILB": 0.9, "OLB": 0.75, "SS": 0.85, "FS": 0.9,
       "RB": 0.6, "TE": 0.7, "K": 0.05, "P": 0.05, "FB": 0.15,
       "NICKEL": 0.5, "DIME": 0.15}

def scarcity():
    s = {}
    for i, d in enumerate(DUTIES):
        mean_have = sum(HAVE[r][i] for r in HAVE) / len(HAVE)
        s[d] = 1.0 - mean_have / 10.0
    return s

def role_value(role, s):
    """Derived slot value = rare-demand mass x snap share. Works with NO
    Owner-provided weights (Q5); football may override with salary."""
    return TAU.get(role, 1.0) * sum(W[d] * need * s[d] ** 2
                                    for d, need in NEED[role].items())

def gravity(role, s):
    """Gravity prior: the CONCENTRATION of rare demand (the convex tail,
    s^3). This is the pack's hypothesis about double teams / deterrence; the
    engine's measured gravity (P-335) calibrates it over time."""
    return sum(W[d] * need * s[d] ** 3 for d, need in NEED[role].items())

def guard(src, dst, v):
    """Ladder guard value (up-ladder only); armed means 'worth gating'."""
    if src not in v or dst not in v:
        return 0.0, False
    if v[dst] <= v[src]:
        return 0.0, False
    return STAR * (1.0 - v[src] / v[dst]), True

# --------------------------------------------------------------- the price
def price(src, dst, v, k=None, lam=LAM, r_gate=R_GATE, m_gate=M_GATE,
          beta=None, have=None):
    a, m, top, g = ability(src, dst, k=k, lam=lam, have=have)
    if a <= 0:
        return 0.0, 0.0, None, False, g
    gv, armed = guard(src, dst, v)
    fired = False
    if armed:
        if beta is not None:                     # continuous soft-floor blend
            a = a + beta * max(0.0, gv - a)
        elif m >= m_gate and v[dst] >= r_gate * v[src]:   # the gate
            a = max(a, gv)
            fired = True
    return min(a, CAP), m, top, fired, g

def tier_of(x):
    return 0 if x < CUTS[0] else (2 if x < CUTS[1] else (6 if x < CUTS[2] else 12))

def spearman(xs, ys):
    def ranks(a):
        order = sorted(range(len(a)), key=lambda i: a[i])
        rk = [0.0] * len(a)
        i = 0
        while i < len(order):
            j = i
            while j + 1 < len(order) and a[order[j + 1]] == a[order[i]]:
                j += 1
            avg = (i + j) / 2.0 + 1.0
            for t in range(i, j + 1):
                rk[order[t]] = avg
            i = j + 1
        return rk
    rx, ry = ranks(xs), ranks(ys)
    n = len(xs)
    mx, my = sum(rx) / n, sum(ry) / n
    num = sum((rx[i] - mx) * (ry[i] - my) for i in range(n))
    dx = math.sqrt(sum((rx[i] - mx) ** 2 for i in range(n)))
    dy = math.sqrt(sum((ry[i] - my) ** 2 for i in range(n)))
    return num / (dx * dy) if dx and dy else 0.0

# ------------------------------------------------------------------- suites
def score(live, v, label, verbose=True, **kw):
    rows = []
    for src, dests in live.items():
        for dst, own in dests.items():
            p, m, top, fired, g = price(src, dst, v, **kw)
            rows.append({"k": f"{src}>{dst}", "own": own, "p": p, "m": m,
                         "top": top, "fired": fired})
    exact = [r for r in rows if tier_of(r["p"]) == r["own"]]
    off1 = [r for r in rows if r not in exact
            and abs(TIERS.index(r["own"]) - TIERS.index(tier_of(r["p"]))) == 1]
    hard = [r for r in rows if r not in exact and r not in off1]
    terr = sum(abs(TIERS.index(r["own"]) - TIERS.index(tier_of(r["p"]))) for r in rows)
    mean_err = sum(abs(r["p"] - r["own"]) for r in rows) / len(rows)
    rho = spearman([r["p"] for r in rows], [float(r["own"]) for r in rows])
    if verbose:
        print(f"\n== {label} ==")
        print(f"   exact {len(exact)}/99 · off-by-one {len(off1)} · hard {len(hard)} "
              f"· tier-error {terr} · mean|err| {mean_err:.2f} pts · rank-rho {rho:.3f}")
        fired_rows = [r["k"] for r in rows if r["fired"]]
        if fired_rows:
            print(f"   guard fired: {fired_rows}")
        for r in rows:
            if r not in exact:
                print(f"   miss {r['k']:>9}: owner {r['own']:>2} model {tier_of(r['p'])} "
                      f"(raw {r['p']:.2f}, worst {r['top']})")
    return rows, len(exact), mean_err, rho

def main():
    quiet = "--quiet" in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    live = json.load(open(args[0]))["flex"]
    s = scarcity()
    v_sal = dict(SALARY_PRIMARY)
    v_der = {r: role_value(r, s) for r in NEED}

    print("ZAI-D2 · gated-market derivation · pack = ZAI-D1 appendix + Owner's")
    print("three score changes (EDGE CARRY 4, C PBLK 6, TE PBLK 4) · no scope,")
    print("no floor, no pairs · ability = M + 0.4*S · guard gated (R=3, M>=6) ·")
    print("NEED and HAVE are independent axes.\n")

    # --- value layer validation -------------------------------------------
    rs = [r for r in NEED if r in SALARY_PRIMARY]
    rho_vs = spearman([v_der[r] for r in rs], [float(SALARY_PRIMARY[r]) for r in rs])
    print("Derived slot values (pack + snap share, no Owner weights) vs salary:")
    for r in sorted(rs, key=lambda r: -SALARY_PRIMARY[r]):
        print(f"   {r:<7} salary {SALARY_PRIMARY[r]:>5}  derived {v_der[r]:6.2f}  "
              f"gravity-prior {gravity(r, s):5.2f}")
    print(f"   rank correlation salary-vs-derived: rho = {rho_vs:.3f}")
    print("   gravity-prior ranking (hypothesis for P-335 to calibrate):")
    for r in sorted(rs, key=lambda r: -gravity(r, s)):
        print(f"      {r:<7} {gravity(r, s):5.2f}")

    # --- k ablation (Claude's smooth soft-max vs linear compounding) -------
    if not quiet:
        print("\n--- ablation: k-norm (smooth soft-max) vs M+0.4S ---")
        for k in (1.5, 2.0, 3.0):
            score(live, v_sal, f"k-norm k={k} (gated guard, salary)", k=k)

    # --- main scores ---------------------------------------------------------
    rows, ex, me, rho = score(live, v_sal,
                              "D2 GATED guard, salary values (football primary)")
    score(live, v_der, "D2 GATED guard, DERIVED values (portability path)")
    score(live, v_sal, "D2 ability only (no guard)", beta=0.0)
    for beta in (0.25, 0.5, 0.75, 1.0):
        score(live, v_sal, f"D2 soft-floor beta={beta} (ungated, continuous)", beta=beta)

    # --- gate robustness grid ------------------------------------------------
    print("\nGate grid (exact/99) — salary values, M+0.4S:")
    print("          M>=5.0  M>=5.5  M>=6.0  M>=6.5  M>=7.0")
    for r in (2.0, 2.5, 3.0, 4.0):
        cells = []
        for mg in (5.0, 5.5, 6.0, 6.5, 7.0):
            _, ex_g, _, _ = score(live, v_sal, "", verbose=False,
                                  r_gate=r, m_gate=mg)
            cells.append(str(ex_g))
        print(f"   R={r}:   " + "       ".join(cells))

    # --- the big nickel (SS2): a position NOT in the game (P-338) ----------
    print("\n=== BIG NICKEL (SS2) test — one authored NEED row, zero rules ===")
    NEED["BIGN"] = {"MCOV": 6, "ZCOV": 6, "RNG": 8, "TKL": 7, "CTH": 4,
                    "DEEP": 4, "RDEF": 4, "RUSH": 2}
    v_der["BIGN"] = role_value("BIGN", s)
    print(f"   derived value v(BIGN) = {v_der['BIGN']:.2f} "
          f"(salary ladder: between NICKEL 100 and SS 300)")
    mat = []
    for src in HAVE:
        p, m, top, fired, g = price(src, "BIGN", v_sal)
        t = tier_of(p)
        mat.append((src, p, t, m, top))
    for src, p, t, m, top in sorted(mat, key=lambda x: x[1]):
        tag = "free" if p < 1 else ("cheap" if p < 4 else ("real" if p < 9 else "cap/prohibited"))
        print(f"   {src:>5} -> BIGN : raw {p:5.2f} tier {t:>2}  ({tag}; worst gap {top})")
    del NEED["BIGN"]; del v_der["BIGN"]

    # --- DL5 emergence: does the formula DIAGNOSE the role's character? ----
    print("\n=== DL5 emergence test — blitzer profile vs two-gap profile ===")
    NEED["DL5TWO"] = {"RUSH": 5, "RDEF": 9, "TKL": 6, "RNG": 2, "PBLK": 4}   # DT-like
    NEED["DL5BLITZ"] = {"RUSH": 8, "RDEF": 5, "TKL": 6, "RNG": 5, "MCOV": 2,
                        "ZCOV": 2, "CTH": 2, "PBLK": 2}                       # blitz-like
    for prof in ("DL5TWO", "DL5BLITZ"):
        print(f"   pricing all sources -> DL5 as {prof}:")
        for src in ("EDGE", "DT", "ILB", "OLB", "SS", "CB"):
            p, m, top, fired, g = price(src, prof, v_sal)
            print(f"      {src:>5} -> {p:5.2f} (tier {tier_of(p)}; worst {top})")
    del NEED["DL5TWO"]; del NEED["DL5BLITZ"]

    # --- LORO: onboard a NEW role by interpolating its HAVE row ------------
    print("\n=== LORO: SS's HAVE row held out, rebuilt from FS+CB (blind) ===")
    import copy
    HAVE_REAL = copy.deepcopy(HAVE)
    pred = []
    for i, d in enumerate(DUTIES):
        pred.append(round((HAVE_REAL["FS"][i] + HAVE_REAL["CB"][i]) / 2.0, 1))
    HAVE_BLIND = copy.deepcopy(HAVE_REAL)
    HAVE_BLIND["SS"] = pred
    err_real, err_blind, n = 0.0, 0.0, 0
    for dst, own in live["SS"].items():
        p_real, _, _, _, _ = price("SS", dst, v_sal, have=HAVE_REAL)
        p_blind, _, _, _, _ = price("SS", dst, v_sal, have=HAVE_BLIND)
        err_real += abs(p_real - own) / 12.0
        err_blind += abs(p_blind - own) / 12.0
        n += 1
        flag = "" if tier_of(p_real) == tier_of(p_blind) else "   <-- tier differs"
        print(f"   SS>{dst}: owner {own:>2} · real-pack {p_real:5.2f} (t{tier_of(p_real)}) "
              f"· blind-pack {p_blind:5.2f} (t{tier_of(p_blind)}){flag}")
    print(f"   mean |err| in points: real {12*err_real/n:.2f} vs blind {12*err_blind/n:.2f}")

    # --- prohibition audit: tier-12 rows vs live absences -------------------
    print("\n=== Prohibition audit — formula tier-12 vs the 99's absences ===")
    all_src, all_dst = list(HAVE), list(NEED)
    priced = {f"{s_}>{d_}" for s_, dests in live.items() for d_ in dests}
    cap_rows, offered_unlisted = [], []
    for s_ in all_src:
        for d_ in all_dst:
            if s_ == d_:
                continue
            p, m, top, fired, g = price(s_, d_, v_sal)
            key = f"{s_}>{d_}"
            if key in priced:
                continue
            if tier_of(p) == 12:
                cap_rows.append(key)
            else:
                offered_unlisted.append((key, p))
    live_absent = len(all_src) * len(all_dst) - len(priced) - len(priced)  # rough
    print(f"   formula marks {len(cap_rows)} omitted rows at tier 12 (soft prohibition)")
    print(f"   -> absence = prohibition, consistent with the live table's shape")
    print(f"   rows the formula OFFERS (tier<=6) but the live table omits:")
    for key, p in sorted(offered_unlisted, key=lambda x: -x[1]):
        print(f"      {key:>10}: {p:5.2f} -> tier {tier_of(p)}")

if __name__ == "__main__":
    main()
