#!/usr/bin/env python3
"""PLAYSIM — the PLAYLED prototype: a bottom-up, play-level football engine.

Z.ai (seat ZAI) for MUSE's full-rebuild attempt, 2026-11-11. Council-legal: self-contained,
touches no engine file. The drive engine's matchup model is the PRIOR (its log-ratios drive
per-play efficiency); per-play baselines are real-NFL shapes (INFERRED) scaled by ONCE
calibration constants fitted to the engine's league-neutral reference, then frozen.

The performance rule (the one rule everything hangs on): a player at a spot performs a duty at
    level = min(HAVE[his body], NEED[the spot's job])
and the PLAY feels the difference between the fielded lineup's levels and the natural lineup's
levels (a natural player IS his job, so his baseline is his own body). Flexing a center to
tackle lowers the line's pass-set level by the center's PBLK gap; the sack rate, completion
rate and run gains move by measured sensitivities (INFERRED anchors, counted in the doc).

Determinism: mulberry32 (the engine's own Rng, ported). Same seed -> identical play log.

Usage:
  python3 playsim.py --games 2000 --matchup even80 --seed0 1 --json out.json
  python3 playsim.py --games 800 --matchup even80 --flex OT1=C,C=OT --json flexC_OT.json
"""
import argparse, json, math, statistics as st

# ----------------------------------------------------------------------------- seeded rng (engine's mulberry32, ported)
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
    def pick(self, xs): return xs[int(self.next() * len(xs))]
    def wpick(self, ws):
        t = sum(ws); r = self.next() * t
        for i, w in enumerate(ws):
            r -= w
            if r < 0: return i
        return len(ws) - 1

def clamp(x, lo, hi): return max(lo, min(hi, x))

# ----------------------------------------------------------------------------- constants
# ---- ported from the engine (receipt A verifies to 1e-6): specs, MC knobs, plan shifts ----
RATING_SPECS = {
    "olRun":   {"OT1": 0.579, "OT2": 0.348, "OG1": 0.705, "OG2": 0.441, "C": 0.263, "TE1": 1.436, "FB": 0.188},
    "olPass":  {"OT1": 0.812, "OT2": 0.488, "OG1": 0.588, "OG2": 0.368, "C": 0.221},
    "rb":      {"RB1": 43.113, "RB2": 12.177},
    "qb":      {"QB": 1.0},
    "rec":     {"WR1": 25.682, "WR2": 19.86, "WR3": 3.251, "TE1": 2.174, "RB1": 4.201, "TE3": 1.264, "WR4": 1.6},
    "passRush":{"DE1": 0.583, "DE2": 0.255, "DT1": 0.303, "DT2": 0.182, "MIKE": 0.053, "WILL": 0.03, "DL5": 0.114},
    "coverage":{"CB1": 0.175, "CB2": 0.107, "CB3": 0.041, "SS": 0.113, "FS": 0.122, "MIKE": 0.069, "WILL": 0.039, "SAM": 0.1},
    "kicker":  {"K": 1.0},
}
DEF_SPECS = {
    "frontBase": {"DT1": 0.456, "DT2": 0.273, "DE1": 0.292, "DE2": 0.158, "MIKE": 0.208, "WILL": 0.099, "SAM": 0.334, "SS": 0.115, "CB1": 0.06, "CB2": 0.034, "CB3": 0.005, "FS": 0.08, "DL5": 0.099},
    "frontNick": {"DT1": 0.456, "DT2": 0.273, "DE1": 0.292, "DE2": 0.158, "MIKE": 0.208, "WILL": 0.099, "SAM": 0.032, "SS": 0.115, "CB1": 0.062, "CB2": 0.048, "CB3": 0.009, "FS": 0.08, "DL5": 0.099},
    "covBase":   {"CB1": 0.175, "CB2": 0.107, "CB3": 0.011, "SS": 0.113, "FS": 0.122, "MIKE": 0.069, "WILL": 0.039, "SAM": 0.135},
    "covNick":   {"CB1": 0.175, "CB2": 0.107, "CB3": 0.045, "SS": 0.113, "FS": 0.122, "MIKE": 0.069, "WILL": 0.039, "SAM": 0.017},
    "covDime":   {"CB1": 0.175, "CB2": 0.107, "CB3": 0.045, "DIME": 0.184, "SS": 0.113, "FS": 0.122, "MIKE": 0.069},
}
MC = {"rb": 0.0208, "olRun": 0.0495, "front": 0.05577, "qb": 0.00655, "rec": 0.02045, "olPass": 0.01403,
      "rush": 0.01579, "cov": 0.0184, "lean": 0.013, "toQb": 0.01471, "toCov": 0.0204, "toRush": 0.0105,
      "skRush": 0.0268, "skOl": 0.0336, "skCov": 0.012, "kick": 0.01215}
PLAN_K = {"pkgFront": 0.8, "pkgCov": 0.8, "defFront": 2.0, "defCov": 1.5, "defRush": 0.6}
DIME_W = 0.15
RUSH_BASE, PASS_BASE, LAM_TO, LAM_SACK = 105.0, 220.0, 1.2, 2.2
PERS_11 = {"run": 0.0, "runB": 0.0, "passB": 0.0, "heavy": 0.0, "tbw": 0.0}
STRAT_neutral = 0.0

def late_game_k(diff, quarter):
    """Port of drives.ts lateGameK (VERIFIED)."""
    if quarter < 4: return 1.0
    if diff <= -9: return 0.55
    if diff <= -4: return 0.75
    if diff >= 17: return 1.85
    if diff >= 9: return 1.55
    if diff >= 4: return 1.25
    if diff <= -1: return 0.9
    if diff >= 1: return 1.1
    return 1.0

# ---- play-model constants (provenance labeled; ALL counted in the design doc) ----
CAL = {  # ONCE calibration + sensitivity anchors
    "run_scale": 1.095,       # CALIBRATED-ONCE vs engine even80 rush mean
    "cmp_scale": 1.0,         # CALIBRATED-ONCE
    "ypc_scale": 1.0,         # CALIBRATED-ONCE
    "beta_yards": 0.75,       # CALIBRATED-ONCE: share of the matchup log on per-play yardage
    "beta_rate": 0.45,        # CALIBRATED-ONCE: share of the log on completion rate
    "beta_to": 0.7,           # CALIBRATED-ONCE
    "sack_sens": 0.9,         # INFERRED anchor: exp(k * OL pass-set shift) on the sack rate
    "cmp_sens": 0.06,         # INFERRED anchor: pressure also dents completion (exp form)
    "run_sens": 0.10,         # INFERRED anchor: run-block shift on the run-gain mean (exp form)
    "cov_sens": 0.5,          # INFERRED anchor: coverage shift on deep completion rate
    "cov_ypc_sens": 0.15,     # INFERRED anchor: coverage shift on yards per completion
    "third_comp": 0.92,      # CALIBRATED: money-down completion penalty (3rd down)
}
RUN_MIX = {  # INFERRED: real-NFL carry shape (stuff / middle / breakaway mixture)
    "p_stuff": 0.27, "stuff_mu": -1.0, "stuff_sd": 1.7,
    "p_mid": 0.63, "mid_mu": 3.9, "mid_sd": 2.8,
    "p_break": 0.10, "break_base": 6.0, "break_exp": 10.5,
}
CMP_MIX = {  # INFERRED: completion gain shape (short/medium mixture; deep is its own play type)
    "p_short": 0.64, "short_mu": 7.3, "short_sd": 3.8,
    "p_med": 0.36, "med_mu": 14.5, "med_sd": 4.6,
}
PLAY_SECONDS = {  # INFERRED: seconds consumed per play type (stop-page rules folded into means)
    "run": 33.0, "cmp": 31.0, "inc": 9.0, "sack": 27.0, "punt": 17.0, "fg": 12.0,
    "score": 14.0, "changeover": 8.0, "kneel": 40.0,
}
TARGET_SHARES = {"WR1": 0.26, "WR2": 0.19, "WR3": 0.13, "TE1": 0.17, "TE2": 0.06, "RB1": 0.15, "RB2": 0.04}  # INFERRED
CARRY_SHARES = {"RB1": 0.74, "RB2": 0.16, "FB": 0.05, "WR1": 0.05}  # INFERRED (scrambles separate)
TACKLE_SHARES = {"ILB": 0.22, "OLB": 0.18, "DL": 0.14, "CB": 0.21, "SS": 0.12, "FS": 0.07, "NICKEL": 0.06}  # INFERRED
FG_MAKE = [(35, 0.94), (45, 0.84), (50, 0.68), (55, 0.50)]  # INFERRED: real-NFL bucket rates; >55 no attempt
EP_CURVE = {1: -0.6, 10: 0.2, 20: 0.8, 30: 1.3, 40: 1.8, 50: 2.3, 60: 2.9, 70: 3.5, 80: 4.1, 90: 5.0, 95: 5.6, 99: 6.2}  # INFERRED: standard EP
GRAVITY = {"wr1_base": 0.22, "wr1_weak": 0.12, "wr1_strong": -0.08, "dt1": 0.50, "de1": 0.30}  # INFERRED: double-team rates
SHELL = {"cover2_base": 0.30, "cover2_weak_fs": 0.55}  # adaptation rule (b)
# play-mix table (INFERRED): situation -> run probability
RUN_PROB = {
    (1, "any"): 0.50,
    (2, "short"): 0.66, (2, "mid"): 0.50, (2, "long"): 0.33,
    (3, "short"): 0.55, (3, "mid"): 0.14, (3, "long"): 0.07,
}
PKG_OFF_RUN  = {"11": 0.34, "12": 0.20, "13": 0.06, "21": 0.22, "22": 0.18}   # INFERRED
PKG_OFF_PASS = {"11": 0.62, "12": 0.16, "13": 0.04, "21": 0.10, "22": 0.08}   # INFERRED
PKG_OFF_LONG = {"11": 0.78, "12": 0.08, "13": 0.02, "21": 0.06, "22": 0.06}   # INFERRED (3rd&long)
PKG_DEF_EARLY = {"base": 0.42, "nickel": 0.55, "dime": 0.03}                  # INFERRED
PKG_DEF_3RD   = {"base": 0.26, "nickel": 0.62, "dime": 0.12}                  # INFERRED
PKG_DEF_LONG  = {"base": 0.12, "nickel": 0.55, "dime": 0.33}                  # INFERRED
DL5_ROTATION = 0.30   # INFERRED: share of nickel pass snaps with the fifth lineman in for DT2
SCREEN_P, SCREEN_VS_BLITZ_P = 0.06, 0.10        # INFERRED
DEEP_P, DEEP_LONG_P = 0.14, 0.22                # INFERRED
SCRAMBLE_P = 0.07                                # INFERRED
INT_RET_YD, INT_TD_P = 12.0, 0.12                # VERIFIED-consistent: 12% matches the engine's defensive-TD share
FUM_SACK_P = 0.004; SAFETY_P = 0.004             # INFERRED
XP_P, TWO_GO_P = 0.943, 0.5                      # INFERRED: XP rate; go-for-two when trailing by 2/5 late
PUNT_NET, PUNT_RET, PUNT_SD = 40.0, 5.0, 8.0     # INFERRED (+0.2 per punter OVR over 80)
FG_DECISION = {"att_mid": 0.80, "att_long": 0.45}  # INFERRED 4th-down table

# ---- duty profiles: ZAI-D1 NEED/HAVE, positional concepts only (Owner's three score changes applied) ----
DUTIES = ["PBLK","RBLK","SNP","CTH","RTE","CARRY","THR","MCOV","ZCOV","RNG","RUSH","EREP","RDEF","TKL","KCK","PNT","DEEP"]
W = {"PBLK": 1.55, "RBLK": 0.5, "SNP": 0.55, "CTH": 0.7, "RTE": 1.3, "CARRY": 0.9, "THR": 1.4, "MCOV": 1.5,
     "ZCOV": 1.0, "RNG": 0.8, "RUSH": 0.9, "EREP": 1.2, "RDEF": 1.2, "TKL": 0.7, "KCK": 0.4, "PNT": 0.4, "DEEP": 1.5}
HAVE = {
    "QB":  dict(zip(DUTIES, [1,1,0,2,1,6,10,2,2,4,0,0,1,2,0,0,0])),
    "RB":  dict(zip(DUTIES, [1,6,0,6,4,10,0,2,1,6,0,0,2,3,0,0,0])),
    "FB":  dict(zip(DUTIES, [2,8,0,3,3,9,0,2,1,5,0,0,5,5,0,0,0])),
    "WR":  dict(zip(DUTIES, [1,2,0,9,10,6,1,6,2,8,0,0,1,4,0,0,4])),
    "TE":  dict(zip(DUTIES, [5,7,1,8,4,4,0,4,4,5,1,0,3,3,0,0,0])),   # Owner: TE PBLK 5 -> 4
    "OT":  dict(zip(DUTIES, [10,9,5,1,0,1,0,0,0,2,6,6,5,3,0,0,0])),
    "OG":  dict(zip(DUTIES, [9,9,6,1,0,1,0,0,0,2,6,6,5,3,0,0,0])),
    "C":   dict(zip(DUTIES, [6,9,10,1,0,1,0,0,0,2,3,5,3,3,0,0,0])),  # Owner: C PBLK 9 -> 6
    "DT":  dict(zip(DUTIES, [5,5,0,1,0,1,0,0,0,2,6,6,9,6,0,0,0])),
    "EDGE":dict(zip(DUTIES, [5,5,0,2,0,4,0,3,3,6,10,10,9,6,0,0,0])), # Owner: EDGE CARRY 2 -> 4
    "ILB": dict(zip(DUTIES, [3,4,0,4,0,2,0,7,8,7,5,1,9,9,0,0,0])),
    "OLB": dict(zip(DUTIES, [3,4,0,4,0,2,0,4,2,7,8,2,7,8,0,0,1])),
    "SS":  dict(zip(DUTIES, [1,3,0,4,2,2,0,7,9,9,1,0,4,8,0,0,8])),
    "FS":  dict(zip(DUTIES, [0,1,0,5,2,1,0,6,9,10,0,0,3,6,0,0,9])),
    "CB":  dict(zip(DUTIES, [0,1,0,7,7,2,0,10,9,9,1,0,4,6,0,0,7])),
    "K":   dict(zip(DUTIES, [0,0,0,3,0,1,0,1,1,3,0,0,0,2,10,5,0])),
    "P":   dict(zip(DUTIES, [0,0,0,3,0,1,0,1,1,3,0,0,0,2,5,10,0])),
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
    "CB":  {"MCOV": 10, "ZCOV": 9, "RNG": 9, "CTH": 7, "DEEP": 7, "TKL": 6},
    "NICKEL":{"MCOV": 9, "ZCOV": 8, "RNG": 8, "CTH": 6, "DEEP": 3, "TKL": 6, "RDEF": 3},
    "DIME":{"MCOV": 8, "ZCOV": 9, "RNG": 7, "CTH": 6, "DEEP": 2, "TKL": 5},
    "DL5": {"RUSH": 8, "EREP": 6, "RDEF": 8, "TKL": 5, "RNG": 3},
    "K":   {"KCK": 10, "PNT": 5},
    "P":   {"PNT": 10, "KCK": 5},
}
SLOT_ROLE = {"QB":"QB","RB1":"RB","RB2":"RB","FB":"FB","WR1":"WR","WR2":"WR","WR3":"WR","WR4":"WR",
             "TE1":"TE","TE2":"TE","TE3":"TE","OT1":"OT","OT2":"OT","OG1":"OG","OG2":"OG","C":"C",
             "DE1":"EDGE","DE2":"EDGE","DT1":"DT","DT2":"DT","DL5":"DL5","MIKE":"ILB","WILL":"OLB","SAM":"OLB",
             "CB1":"CB","CB2":"CB","CB3":"NICKEL","DIME":"DIME","SS":"SS","FS":"FS","K":"K","P":"P"}
# the BODY a role fields (dests without their own bodies read the body they are built from):
BODY_ROLE = {"NICKEL": "CB", "DIME": "CB", "DL5": "DT"}   # CB3/DIME are CB bodies; DL5 is a DL body (Owner: a blitzer)
OFF_PACKAGES = {
    "11": ["QB","RB1","WR1","WR2","WR3","TE1","OT1","OT2","OG1","OG2","C"],
    "12": ["QB","RB1","WR1","WR2","TE1","TE2","OT1","OT2","OG1","OG2","C"],
    "13": ["QB","RB1","TE1","TE2","TE3","WR1","OT1","OT2","OG1","OG2","C"],
    "21": ["QB","RB1","RB2","WR1","WR2","TE1","OT1","OT2","OG1","OG2","C"],
    "22": ["QB","RB1","RB2","TE1","TE2","WR1","OT1","OT2","OG1","OG2","C"],
}
DEF_PACKAGES = {
    "base":  ["DE1","DE2","DT1","DT2","MIKE","WILL","SAM","CB1","CB2","SS","FS"],
    "nickel":["DE1","DE2","DT1","DT2","MIKE","WILL","CB1","CB2","CB3","SS","FS"],
    "dime":  ["DE1","DE2","DT1","DT2","MIKE","CB1","CB2","CB3","DIME","SS","FS"],
}
OL_SLOTS = ("OT1","OT2","OG1","OG2","C")

def wavg(pairs):
    s = w = 0.0
    for row, ovr in pairs:
        spec = RATING_SPECS.get(row) or DEF_SPECS.get(row) or {}
        pass
    return None

# ----------------------------------------------------------------------------- ported engine math (receipt A)
def team_units(roster):
    """roster: {slot: ovr} -> the unit dict the engine's matchup reads (port of teamRatings)."""
    spots = [(s, roster[s]) for s in roster]
    g = lambda spec: (sum(roster[s] * wt for s, wt in spec.items()) / sum(spec.values()))
    r = {k: g(RATING_SPECS[k]) for k in ("olRun","olPass","rb","qb","rec","passRush","coverage","kicker")}
    r["frontNick"] = g(DEF_SPECS["frontNick"]); r["covNick"] = g(DEF_SPECS["covNick"])
    r["covDime"] = g(DEF_SPECS["covDime"])
    r["p"] = roster["P"]
    return r

def engine_matchup(Ro, Rd, Rl):
    """Port of matchupModel at the default plan (11 vs nickel-neutral), including the plan's
    package shifts. Verified to 1e-6 against the engine by receipt A."""
    # applyDefPlan(nickel): team gets pkg shifts, league baseline does not
    dFront = (Rd["frontNick"] - PLAN_K["pkgFront"] + PLAN_K["defFront"] * 0) - Rl["frontNick"]
    dCov = (DIME_W * Rd["covDime"] + (1 - DIME_W) * (Rd["covNick"] + PLAN_K["pkgCov"])) \
         - (DIME_W * Rl["covDime"] + (1 - DIME_W) * Rl["covNick"])
    dRush = Rd["passRush"] - Rl["passRush"]
    dRB, dOLr = Ro["rb"] - Rl["rb"], Ro["olRun"] - Rl["olRun"]
    dQB, dRec, dOLp = Ro["qb"] - Rl["qb"], Ro["rec"] - Rl["rec"], Ro["olPass"] - Rl["olPass"]
    lean = MC["lean"] * (0.35 * (Ro["rb"] - Rl["rb"]) + 0.65 * (Ro["olRun"] - Rl["olRun"])
                         - (0.45 * dQB + 0.3 * (Ro["rec"] - Rl["rec"]) + 0.25 * dOLp))
    def soft_cap(x, lo, hi):
        cap = hi if x >= 0 else -lo; k = 0.6 * cap; a = abs(x)
        if a <= k: return x
        v = k + (cap - k) * math.tanh((a - k) / (cap - k))
        return v if x >= 0 else -v
    rOff = soft_cap(MC["rb"] * dRB + MC["olRun"] * dOLr, -1.1, 0.4)
    pOff = soft_cap(MC["qb"] * dQB + MC["rec"] * dRec + MC["olPass"] * dOLp, -0.8, 0.27)
    rush_log = soft_cap(rOff + lean, -1.3, 0.33) - MC["front"] * dFront
    pass_log = soft_cap(pOff - lean, -1.0, 0.29) - (MC["rush"] * dRush + MC["cov"] * dCov)
    to_log = soft_cap(-MC["toQb"] * dQB + MC["toCov"] * dCov + MC["toRush"] * dRush, -0.7, 0.7)
    sk_log = soft_cap(MC["skRush"] * dRush - MC["skOl"] * dOLp + MC["skCov"] * dCov, -0.8, 0.4)
    return {"rush": rush_log, "pass": pass_log, "to": to_log, "sack": sk_log,
            "expRush": RUSH_BASE * math.exp(rush_log), "expPass": PASS_BASE * math.exp(pass_log),
            "lamTO": LAM_TO * math.exp(to_log), "lamSack": LAM_SACK * math.exp(sk_log)}

def ep1(yg):
    ks = sorted(EP_CURVE)
    if yg <= ks[0]: return EP_CURVE[ks[0]]
    for a, b in zip(ks, ks[1:]):
        if yg <= b:
            return EP_CURVE[a] + (yg - a) / (b - a) * (EP_CURVE[b] - EP_CURVE[a])
    return EP_CURVE[ks[-1]]

def fg_make_prob(dist):
    for lim, p in FG_MAKE:
        if dist <= lim: return p
    return 0.0

# ----------------------------------------------------------------------------- the play engine
class TeamSim:
    """One side's roster + duty machinery. flex: {slot: role} -- the player at `slot` plays
    `role` (dual/misfit assignment); everyone else plays their natural role."""
    def __init__(self, roster, flex=None):
        self.roster = {s: {"ovr": roster[s]} for s in roster}
        self.flex = dict(flex or {})
        self.natural_role = {s: SLOT_ROLE[s] for s in roster}
        self.current_role = {s: self.flex.get(s, SLOT_ROLE[s]) for s in roster}
    def have(self, slot):
        return HAVE[BODY_ROLE.get(self.current_role[slot], self.current_role[slot])]
    def nat_have(self, slot):
        return HAVE[BODY_ROLE.get(self.natural_role[slot], self.natural_role[slot])]
    def level(self, slot, duty, dest):
        """Fielded performance: min(HAVE, NEED) -- the job never gets more than the body has."""
        return min(self.have(slot)[duty], NEED.get(dest, {}).get(duty, 0)) if NEED.get(dest, {}).get(duty, 0) else self.have(slot)[duty]
    def nat_level(self, slot, duty, dest):
        return min(self.nat_have(slot)[duty], NEED.get(dest, {}).get(duty, 0)) if NEED.get(dest, {}).get(duty, 0) else self.nat_have(slot)[duty]
    def group_shift(self, slots, duty, dest_of):
        """Fielded minus natural mean duty level over `slots` (the per-play delta a flex causes)."""
        f = n = 0.0
        for sl in slots:
            f += self.level(sl, duty, dest_of(sl))
            n += self.nat_level(sl, duty, dest_of(sl))
        return (f - n) / len(slots)

class Game:
    def __init__(self, rosterH, rosterA, seed, flexH=None, flexA=None, record_plays=False):
        self.rng = Rng(seed & 0xFFFFFFFF)
        self.tH = TeamSim(rosterH, flexH)
        self.tA = TeamSim(rosterA, flexA)
        self.record_plays = record_plays
        self.playlog, self.gravity, self.events = [], {}, []
        self.endings = []

    # ---------- situation -> play type (script table + ported late-game tilt)
    def run_prob(self, down, dist, diff, period, secs):
        band = "short" if dist <= 3 else ("mid" if dist <= 6 else "long")
        if down == 1: base = RUN_PROB[(1, "any")]
        elif down == 2: base = RUN_PROB[(2, band)]
        elif down == 3: base = RUN_PROB[(3, band)]
        else: base = 0.30
        k = late_game_k(diff, period)
        if k != 1.0: base *= math.sqrt(k)
        if period >= 4 and secs < 120:
            if diff <= -5: base = 0.05
            elif diff >= 9: base = 0.85
        return clamp(base, 0.02, 0.95)

    def choose_off_pkg(self, run, dist):
        ws = PKG_OFF_RUN if run else (PKG_OFF_LONG if dist >= 7 else PKG_OFF_PASS)
        return OFF_PACKAGES[["11","12","13","21","22"][self.rng.wpick([ws[k] for k in ("11","12","13","21","22")])]]

    def choose_def_pkg(self, down, dist, opp_pkg):
        if down >= 3 and dist >= 7: ws = dict(PKG_DEF_LONG)
        elif down >= 3: ws = dict(PKG_DEF_3RD)
        else: ws = dict(PKG_DEF_EARLY)
        if opp_pkg in ("21", "22", "13"):
            ws["base"] += 0.15; ws["dime"] *= 0.5
        return DEF_PACKAGES[["base","nickel","dime"][self.rng.wpick([ws["base"], ws["nickel"], ws["dime"]])]]

    # ---------- personnel-aware per-play shifts (the flex machinery)
    def play_shifts(self, offsim, pkg):
        """OL pass-set shift, run-block shift: fielded minus natural, over the OL on the field."""
        ol_pass = offsim.group_shift([s for s in OL_SLOTS if s in pkg], "PBLK", lambda s: SLOT_ROLE[s])
        ol_run = offsim.group_shift([s for s in OL_SLOTS if s in pkg] + ([ "TE1","TE2","FB" ] and [s for s in ("TE1","TE2","FB") if s in pkg]), "RBLK", lambda s: SLOT_ROLE[s])
        return ol_pass, ol_run

    def def_shift(self, defsim, dpkg, shell2):
        """Coverage shift over the DBs on the field; deep-void handled by the shell rule."""
        dbs = [s for s in dpkg if SLOT_ROLE[s] in ("CB","SS","FS","NICKEL","DIME")]
        z = defsim.group_shift(dbs, "ZCOV", lambda s: SLOT_ROLE[s])
        deep = defsim.group_shift([s for s in ("FS","SS") if s in dpkg] or ["FS"], "DEEP", lambda s: SLOT_ROLE[s])
        return z, deep, shell2

    # ---------- one play
    def run_play(self, ball, down, dist, fp, diff, period, secs):
        offsim = self.tH if ball == "H" else self.tA
        defsim = self.tA if ball == "H" else self.tH
        run = self.rng.next() < self.run_prob(down, dist, diff, period, secs)
        pkg = self.choose_off_pkg(run, dist)
        dpkg = self.choose_def_pkg(down, dist, pkg)
        if not run and dpkg == "nickel" and self.rng.next() < DL5_ROTATION and "DT2" in defsim.roster:
            dpkg_eff = ["DL5" if s == "DT2" else s for s in dpkg]
        else:
            dpkg_eff = dpkg
        ol_pass_shift, ol_run_shift = self.play_shifts(offsim, pkg)
        cover2 = SHELL["cover2_base"]
        fs_perf = sum((defsim.level(s, "ZCOV", SLOT_ROLE[s]) + defsim.level(s, "DEEP", SLOT_ROLE[s])) for s in ("FS","SS") if s in dpkg)
        if fs_perf < 12: cover2 = SHELL["cover2_weak_fs"]   # adaptation (b): weak deep bodies -> shell
        z_shift, deep_shift, _ = self.def_shift(defsim, dpkg_eff, cover2)
        info = {"off": ball, "down": down, "dist": round(dist, 1), "fp": round(fp, 1),
                "pkg": pkg, "dpkg": dpkg_eff, "run": run, "type": None, "gain": 0.0}
        # ---- outcome
        if not run and self.rng.next() < SCRAMBLE_P:
            gain = max(0.5, 5.0 * (1 + 0.35 * self.rng.normal()) * (0.5 + 0.5 * (offsim.roster["QB"]["ovr"] - 70) / 20))
            self.events.append(("QB", "scramble"))
            info.update(type="run", gain=gain)
            return info, PLAY_SECONDS["run"], pkg, dpkg_eff, ol_pass_shift, ol_run_shift, z_shift, deep_shift
        if run:
            m, u = RUN_MIX, self.rng.next()
            if u < m["p_stuff"]: gain = self.rng.normal() * m["stuff_sd"] + m["stuff_mu"]
            elif u < m["p_stuff"] + m["p_mid"]: gain = self.rng.normal() * m["mid_sd"] + m["mid_mu"]
            else: gain = m["break_base"] - math.log(1 - self.rng.next()) * m["break_exp"]
            gain *= CAL["run_scale"] * math.exp(CAL["beta_yards"] * self.plog_rush)
            gain *= math.exp(CAL["run_sens"] * ol_run_shift)
            carrier = self.pick_carrier(offsim, pkg)
            cdest = "RB" if carrier in ("RB1", "RB2") else SLOT_ROLE[carrier]
            cshift = offsim.level(carrier, "CARRY", cdest) - offsim.nat_level(carrier, "CARRY", cdest)
            gain *= math.exp(0.06 * cshift)   # INFERRED anchor: carrier body vs the job
            self.events.append((carrier, "carry"))
            self.events.append((self.pick_tackler(defsim, dpkg_eff), "tackle"))
            info.update(type="run", gain=gain)
            return info, PLAY_SECONDS["run"], pkg, dpkg_eff, ol_pass_shift, ol_run_shift, z_shift, deep_shift
        # ---- pass
        screen = self.rng.next() < (SCREEN_VS_BLITZ_P if len([s for s in dpkg_eff if SLOT_ROLE[s] in ("EDGE","DT","DL5")]) >= 5 else SCREEN_P)
        deep = (not screen) and self.rng.next() < (DEEP_LONG_P if dist >= 7 else DEEP_P)
        deep *= (1.0 - cover2 * 0.45)   # two-high shell cedes short, takes away deep (adaptation b, part 2)
        base_sack = (LAM_SACK / 36.5) * math.exp(-CAL["sack_sens"] * ol_pass_shift) * (0.3 if screen else 1.0)
        if self.rng.next() < clamp(base_sack, 0.005, 0.30):
            worst_slot, worst_v = None, 99.0
            for sl in pkg:
                if sl in OL_SLOTS:
                    v = offsim.level(sl, "PBLK", SLOT_ROLE[sl])
                    if v < worst_v: worst_v, worst_slot = v, sl
            self.events.append((self.pick_rusher(defsim, dpkg_eff), "sack"))
            if worst_slot: self.events.append((worst_slot, "pressure_allowed"))
            gain = -7.0 + 2.0 * self.rng.normal()
            if self.rng.next() < SAFETY_P:
                info.update(type="sack_safety", gain=gain)
            else:
                info.update(type="sack", gain=gain)
            return info, PLAY_SECONDS["sack"], pkg, dpkg_eff, ol_pass_shift, ol_run_shift, z_shift, deep_shift
        if deep:
            cmp_p = clamp(0.42 * CAL["cmp_scale"] * math.exp(CAL["beta_rate"] * self.plog_pass) * math.exp(-CAL["cov_sens"] * z_shift), 0.20, 0.65)
            int_p = clamp(0.075 * math.exp(CAL["beta_to"] * self.plog_to), 0.01, 0.16)
            ypc = 27.0 * math.exp(0.65 * CAL["beta_yards"] * self.plog_pass) * math.exp(-CAL["cov_ypc_sens"] * z_shift)
            ysd = 12.0
        elif screen:
            cmp_p = clamp(0.80 * CAL["cmp_scale"] * math.exp(0.2 * self.plog_pass), 0.60, 0.93)
            int_p = 0.008
            ypc = 6.2 * math.exp(0.5 * CAL["beta_yards"] * self.plog_pass)
            ysd = 3.0
        else:
            third = CAL.get("third_comp", 1.0) if down == 3 else 1.0
            cmp_p = clamp(0.645 * CAL["cmp_scale"] * third * math.exp(CAL["beta_rate"] * self.plog_pass) * math.exp(CAL["cmp_sens"] * ol_pass_shift), 0.35, 0.82)
            int_p = clamp(0.033 * math.exp(CAL["beta_to"] * self.plog_to), 0.005, 0.09)
            cm = CMP_MIX
            is_short = self.rng.next() < cm["p_short"]
            ypc = (cm["short_mu"] if is_short else cm["med_mu"]) * CAL["ypc_scale"] * math.exp(0.65 * CAL["beta_yards"] * self.plog_pass)
            ysd = cm["short_sd"] if is_short else cm["med_sd"]
        if self.rng.next() < int_p:
            target = self.pick_target(offsim, pkg, deep, screen)
            self.events.append(("QB", "int")); self.events.append((target, "int_thrown_to"))
            self.events.append((self.pick_cover(defsim, dpkg_eff, target), "int_caught"))
            info.update(type="int", gain=0.0)
            return info, PLAY_SECONDS["inc"], pkg, dpkg_eff, ol_pass_shift, ol_run_shift, z_shift, deep_shift
        if self.rng.next() < cmp_p:
            target = self.pick_target(offsim, pkg, deep, screen)
            gain = max(-2.0, ypc + ysd * 0.42 * self.rng.normal())
            tdest = SLOT_ROLE[target]
            tshift = offsim.level(target, "CTH", tdest) - offsim.nat_level(target, "CTH", tdest)
            gain *= math.exp(0.04 * tshift)   # INFERRED anchor: catcher body vs the job
            self.events.append(("QB", "cmp")); self.events.append((target, "catch"))
            self.events.append((self.pick_tackler(defsim, dpkg_eff), "tackle"))
            info.update(type="cmp", gain=gain)
            return info, PLAY_SECONDS["cmp"], pkg, dpkg_eff, ol_pass_shift, ol_run_shift, z_shift, deep_shift
        self.events.append(("QB", "inc"))
        info.update(type="inc", gain=0.0)
        return info, PLAY_SECONDS["inc"], pkg, dpkg_eff, ol_pass_shift, ol_run_shift, z_shift, deep_shift

    def pick_carrier(self, offsim, pkg):
        names, ws = [], []
        for sl, p in CARRY_SHARES.items():
            if sl == "WR1":
                if "WR1" in pkg: names.append(sl); ws.append(p)
                continue
            if sl in pkg:
                cap = clamp(offsim.have(sl)["CARRY"] / 9.0, 0.4, 1.0)   # adaptation (c): weak carrier -> fewer carries
                names.append(sl); ws.append(p * cap)
        if not names: return "QB"
        return names[self.rng.wpick(ws)]

    def pick_target(self, offsim, pkg, deep, screen):
        names, ws = [], []
        for sl, p in TARGET_SHARES.items():
            if sl in pkg:
                d = offsim.have(sl)
                cap = (0.6 + 0.4 * d["RTE"] / 8.0) if sl in ("RB1","RB2","FB") else clamp(d["RTE"] / 8.0, 0.35, 1.0)
                depth = clamp(d["DEEP"] / 4.0, 0.5, 1.4) if deep else 1.0
                short = 1.35 if (screen and sl in ("RB1","RB2")) else 1.0
                names.append(sl); ws.append(p * cap * depth * short)
        if not names: return "QB"
        return names[self.rng.wpick(ws)]

    def pick_rusher(self, defsim, dpkg):
        ws = [RATING_SPECS["passRush"].get(SLOT_ROLE.get(s, s), 0.02) for s in dpkg]
        return dpkg[self.rng.wpick(ws)]

    def pick_cover(self, defsim, dpkg, target):
        mapping = {"WR1": "CB1", "WR2": "CB2", "WR3": "CB3", "TE1": "SS", "TE2": "SS", "TE3": "SS", "RB1": "MIKE", "RB2": "WILL"}
        for cand in (mapping.get(target), "FS", "CB1", "SS"):
            if cand and cand in dpkg: return cand
        return dpkg[-1]

    def pick_tackler(self, defsim, dpkg):
        names, ws = [], []
        for role, p in TACKLE_SHARES.items():
            cands = [s for s in dpkg if SLOT_ROLE[s] == role or (role == "DL" and SLOT_ROLE[s] in ("DT","EDGE","DL5"))]
            if cands: names.append(cands[0]); ws.append(p)
        if not names: return dpkg[0]
        return names[self.rng.wpick(ws)]

    def gravity_check(self, offsim, pkg, dpkg, deep_pass):
        if "WR1" in pkg and deep_pass:
            mates = [offsim.roster[s]["ovr"] for s in ("WR2","WR3") if s in pkg]
            p = GRAVITY["wr1_base"]
            if mates and sum(mates) / len(mates) < 76: p += GRAVITY["wr1_weak"]
            if mates and sum(mates) / len(mates) > 84: p += GRAVITY["wr1_strong"]
            if self.rng.next() < p: self.gravity["WR1"] = self.gravity.get("WR1", 0) + 1
        for dl, p in (("DT1", GRAVITY["dt1"]), ("DE1", GRAVITY["de1"])):
            if dl in dpkg and self.rng.next() < p:
                self.gravity[dl] = self.gravity.get(dl, 0) + 1

    # ---------- 4th-down decision table (INFERRED). Returns ("GO", fp) | ("FG"|"PUNT"|"DOWNS", new_fp)
    def fourth_down(self, t, score, ball, diff, period, secs_left, fp, dist, ep_before, offsim, went4):
        if went4:
            return ("DOWNS", clamp(100.0 - fp, 1, 99))   # second straight failed go: turnover on downs
        kick_yd = (100 - fp) + 17
        desperation = period >= 4 and diff < 0 and diff >= -8 and secs_left < 180
        go = (desperation and dist <= 2) \
             or (dist <= 1 and self.rng.next() < (0.45 if fp >= 40 else 0.15)) \
             or (2 <= dist <= 3 and fp >= 55 and self.rng.next() < 0.45)
        if go:
            return ("GO", fp)
        attempt = kick_yd <= 53 and (kick_yd <= 45 or self.rng.next() < (FG_DECISION["att_mid"] if kick_yd <= 49 else FG_DECISION["att_long"]))
        if attempt:
            if self.rng.next() < fg_make_prob(kick_yd):
                score[ball] += 3; t["fg"] += 1; t["epa"] += 3.0 - ep_before
                return ("FG", 25.0)
            t["fgmiss"] += 1; t["epa"] += -ep1(clamp(fp, 1, 99))
            return ("FG", clamp(100.0 - (fp - 7), 1, 99))   # miss: opponent takes over at the spot of the kick
        net = PUNT_NET + 0.2 * (offsim.roster["P"]["ovr"] - 80) + PUNT_SD * self.rng.normal()
        land = fp + net
        opp_fp = 20.0 if land >= 99 else clamp(100.0 - (land + PUNT_RET + 4.0 * self.rng.normal()), 1, 99)
        t["epa"] += ep1(clamp(fp, 1, 99)) - ep1(opp_fp)   # offense traded its EP for the field-position flip
        t["punts"] += 1
        return ("PUNT", opp_fp)

    # ---------- the game loop
    def simulate(self):
        score = {"H": 0, "A": 0}
        totals = {t: {"rush": 0.0, "pass": 0.0, "plays": 0, "sacks": 0, "giveaways": 0, "drives": 0,
                      "td": 0, "fg": 0, "fgmiss": 0, "punts": 0, "epa": 0.0} for t in ("H", "A")}
        period, secs_left = 1, 900.0
        ball, fp, down, dist = "H", 25.0, 1, 10.0
        went4 = False   # the previous play was a fourth-down go (a failed second go = turnover on downs)
        downs_lost = 0
        while period <= 4:
            off = "H" if ball == "H" else "A"
            offsim = self.tH if ball == "H" else self.tA
            defsim2 = self.tA if ball == "H" else self.tH
            diff = (score["H"] - score["A"]) if ball == "H" else (score["A"] - score["H"])
            # matchup logs for this play, from the units (ported engine prior)
            Ru = {"H": self.unitsH, "A": self.unitsA}
            Rdef = {"H": self.unitsA, "A": self.unitsH}
            lm = engine_matchup(Ru[off], Rdef[off], self.unitsL)
            self.plog_pass, self.plog_to, self.plog_rush = lm["pass"], lm["to"], lm["rush"]
            info, sec, pkg, dpkg_eff, ops, ors, zs, ds = self.run_play(ball, down, dist, fp, diff, period, secs_left)
            if self.record_plays:
                self.playlog.append({**{k: v for k, v in info.items()}, "period": period,
                                     "secs_left": round(secs_left, 1), "score": f'{score["H"]}-{score["A"]}'})
            t = totals[ball]
            t["plays"] += 1
            self.gravity_check(self.tH if ball == "H" else self.tA, pkg, dpkg_eff, info["type"] == "cmp" and info["gain"] >= 18)
            ep_before = ep1(clamp(fp, 1, 99)) + (0.10 if dist < 10 else -0.10 * clamp(dist - 10, 0, 15) / 5.0)
            kind, gain = info["type"], info["gain"]
            fp_prev = fp
            end_drive = False
            sec_extra = 0.0
            if kind in ("run", "cmp"):
                if kind == "run": t["rush"] += gain
                else: t["pass"] += gain
                fp += gain
            elif kind == "sack" or kind == "sack_safety":
                t["sacks"] += 1; t["pass"] += gain; fp += gain
            elif kind == "int":
                t["giveaways"] += 1
                self.endings.append("TO")
                ret = max(0.0, INT_RET_YD + 15.0 * self.rng.normal())
                new_def_own = clamp(100.0 - fp - ret, 1, 99)   # where the defense takes over (its own perspective)
                if self.rng.next() < INT_TD_P:
                    score["A" if ball == "H" else "H"] += 7
                    t["epa"] += -ep1(clamp(fp, 1, 99)) - 1.0
                else:
                    t["epa"] += -ep1(new_def_own) - ep1(clamp(fp, 1, 99))
                end_drive = True
                fp = new_def_own
            elif kind == "sack_safety":
                score["A" if ball == "H" else "H"] += 2
                t["epa"] += -2.0
                self.endings.append("SAFETY")
                end_drive = True
                fp = 40.0   # free kick
            if not end_drive and fp >= 100 and kind in ("run", "cmp"):
                over = fp - 100.0
                if kind == "cmp": t["pass"] -= over
                else: t["rush"] -= over
                score[ball] += 6; t["td"] += 1
                if self.rng.next() < XP_P: score[ball] += 1
                elif diff < -2 and period >= 4 and self.rng.next() < TWO_GO_P: score[ball] += 2
                t["epa"] += 6.94 - ep_before
                self.endings.append("TD")
                fp, down, dist = 25.0, 1, 10.0
                end_drive = True; sec_extra = PLAY_SECONDS["score"]
            if not end_drive:
                if kind in ("run", "cmp", "sack"):
                    gained = fp - fp_prev
                    if gained >= dist and fp < 100:
                        down, dist = 1, min(10.0, 100 - fp)   # goal-to-go inside the 10
                        went4 = False
                    else:
                        dist -= gained
                        down += 1
                        if down == 5:
                            decision, new_fp = self.fourth_down(t, score, ball, diff, period, secs_left, fp, dist, ep_before, offsim, went4)
                            if decision == "GO":
                                down = 4; went4 = True
                            elif decision == "DOWNS":
                                t["downs"] = t.get("downs", 0) + 1
                                fp = new_fp; end_drive = True; self.endings.append("DOWNS")
                            else:
                                fp = new_fp; end_drive = True
                                self.endings.append(decision)
                                sec_extra = PLAY_SECONDS["fg"] if decision == "FG" else PLAY_SECONDS["punt"]
                        else:
                            went4 = False
                elif kind == "inc":
                    down += 1
                    if down == 5:
                        decision, new_fp = self.fourth_down(t, score, ball, diff, period, secs_left, fp, dist, ep_before, offsim, went4)
                        if decision == "GO":
                            down = 4; went4 = True
                        elif decision == "DOWNS":
                            t["downs"] = t.get("downs", 0) + 1
                            fp = new_fp; end_drive = True; self.endings.append("DOWNS")
                        else:
                            fp = new_fp; end_drive = True
                            self.endings.append(decision)
                            sec_extra = PLAY_SECONDS["fg"] if decision == "FG" else PLAY_SECONDS["punt"]
                    else:
                        went4 = False
            if end_drive:
                t["drives"] += 1
                down, dist = 1, 10.0
                went4 = False
                ball = "A" if ball == "H" else "H"
                sec += sec_extra + (6.0 if kind in ("int", "sack_safety") else PLAY_SECONDS["changeover"])
                fp = clamp(fp, 1, 99)
            secs_left -= sec + sec_extra
            if secs_left <= 0:
                if period == 2 or period == 4:
                    # half expires: the live drive dies (HALF), possession flips (no kickoff return modeled)
                    t["drives"] += 1
                    self.endings.append("HALF")
                    down, dist = 1, 10.0
                    went4 = False
                    ball = "A" if ball == "H" else "H"
                period += 1
                secs_left = 900.0
                down, dist = 1, 10.0
                if period == 3:
                    ball = "A"; fp = 25.0
                if period > 4:
                    break
            # kneel protocol (script rule, INFERRED)
            lead = (score["H"] - score["A"]) if ball == "H" else (score["A"] - score["H"])
            if period == 4 and 0 < secs_left < 75 and lead >= 1 and down == 1 and dist >= 8:
                for _ in range(3):
                    if secs_left <= 0: break
                    totals[ball]["plays"] += 1
                    totals[ball]["rush"] -= 1.2
                    secs_left -= PLAY_SECONDS["kneel"]
                if secs_left <= 0:
                    period += 1
                    if period > 4: break
                down, dist = 1, 10.0
        totals["H"]["points"], totals["A"]["points"] = score["H"], score["A"]
        return totals

    # units are computed once per game from the rosters (the per-play shifts are the flex deltas)
    def prepare_units(self, rosterH, rosterA):
        self.unitsH, self.unitsA = team_units(rosterH), team_units(rosterA)
        self.unitsL = team_units({s: 80 for s in SLOT_ROLE})

def flat(base):
    return {s: base for s in SLOT_ROLE}

def run_games(n, rh, ra, seed0, flexH=None, flexA=None, record_first=False):
    keys = ("rush","pass","plays","sacks","giveaways","points","drives","td","fg","fgmiss","punts","epa")
    keys_a = ("points","sacks")
    series = {k: [] for k in keys}
    series_a = {k: [] for k in keys_a}
    first = None
    for i in range(n):
        g = Game(rh, ra, (seed0 + i * 2654435761) & 0xFFFFFFFF, flexH=flexH, flexA=flexA)
        g.prepare_units(rh, ra)
        t = g.simulate()
        if record_first and i == 0:
            first = {"plays": g.playlog, "gravity": g.gravity, "events": g.events[:500]}
        for k in keys:
            series[k].append(t["H"][k])
        for k in keys_a:
            series_a[k].append(t["A"][k])
    out = {}
    for k in keys:
        m = sum(series[k]) / n
        sd = st.pstdev(series[k])
        out[k] = {"mean": m, "sd": sd, "min": min(series[k]), "max": max(series[k])}
    for k in keys_a:
        m = sum(series_a[k]) / n
        sd = st.pstdev(series_a[k])
        out["A_" + k] = {"mean": m, "sd": sd}
    return out, first

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--games", type=int, default=100)
    ap.add_argument("--matchup", type=str, default="even80")
    ap.add_argument("--seed0", type=int, default=1)
    ap.add_argument("--json", type=str, default=None)
    ap.add_argument("--plays", action="store_true")
    ap.add_argument("--flex", type=str, default=None, help="slot=role pairs for HOME, e.g. OT1=C,C=OT")
    a = ap.parse_args()
    shift = {"even80": (80, 80), "home_plus4": (84, 80), "home_plus8": (88, 80), "home_minus8": (72, 80)}[a.matchup]
    rh, ra = flat(shift[0]), flat(shift[1])
    flex = None
    if a.flex:
        flex = dict(p.split("=") for p in a.flex.split(","))
    totals, first = run_games(a.games, rh, ra, a.seed0, flexH=flex, record_first=a.plays)
    out = {"games": a.games, "matchup": a.matchup, "flex": a.flex, "totals": totals}
    if first: out["game1"] = first
    txt = json.dumps(out, indent=1)
    if a.json: open(a.json, "w").write(txt)
    else: print(json.dumps({k: v for k, v in out.items() if k != "game1"}, indent=1))

if __name__ == "__main__":
    main()
