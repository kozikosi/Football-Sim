#!/usr/bin/env python3
"""
FL-1 "FlexLedger" v2 — Inkling's from-scratch flex derivation (design + measurement).

Inputs per sport: duties, HAVE matrix, NEED per job, the sport's value model
(football: D@90, REPORTED, pre-bump), a regime-floor policy, and an X ledger of
named Owner judgment rows. Nothing else. The architecture ports; the constants
re-fit per sport.

THE FORMULA (points-scale, gap in 0-10 points):
  per demanded duty d:  gap_d = max(0, need_d - have_d)
                        w_d   = need_d / 10            (fraction of the duty scale the job demands)
                        q_d   = beta_d * w_d * gap_d^gamma
  aptitude A            = min(12, max_d(q_d) + K * sum_{other} q_d)     (worst gap dominant + echo)
  value     V           = clamp(D@90, 0, 12)           (football; other sports: their value model)
  raw                   = clamp(max(A,V) + K2 * min(A,V), 0, 12)       ("echo across ledgers")
  price                 = tier(raw via cuts 1/4/9) -> 0/2/6/12
  R floor               = cross-class (O<->D) never cheaper than 6; FB/K/P exempt            (policy)
  X ledger              = named Owner judgment rows, applied after the formula            (countable)

CALIBRATION LOG (Inkling, 2026-11-10):
  Pass 1  normalized gaps (/10, /nv), neutral beta=1.0: 71/99 exact. Demand-share weighting
          hid low-frequency critical duties (DEEP) -> all owner-12 "no deep craft" rows fell out.
  Pass 2  beta v1 (PBLK 1.2 ... DEEP 1.3), w = need/10: 76/99, 0-ish hard misses at 3.
  Pass 3  RELATIVE gaps ((need-have)/need): 86/99. Relative gap rescued RB>SS/SS>RB/etc.
  Pass 4  points-scale gaps (this file): continuity with the tiers; traces readable. Re-tune
          beta_SNP down (snap is teachable - Owner verbatim), beta_DEEP up (never-done-this).
          Every constant below is logged; nothing is row-special-cased except the named X ledger.
  Pass 5  DEEP 1.6 -> 2.0 (fitted ablaton): A-only 80/99 -> 84/99 (ILB>DIME, ILB>FS, OLB>DIME
          fall out natively). EDGE CARRY sensitivity 4/5/6: 84/85/85 (5pins), kept at 4 (Owner's
          accepted ZAI-D1 value; 5/6 buys one row). Unconditional echo k2=0.35 REJECTED by
          ablation (breaks D-exact rows; k2=0 dominates everywhere).

X ledger (THE OWNER'S NAMED JUDGMENT ROWS - every pin nameable to a relay):
  claude-flex-rebuild-2026-11-09.md:  12s: RB>FS RB>SS TE>ILB EDGE>SS ILB>DIME OLB>DIME QB>FS SS>RB
                                       (TE>EDGE RB>WR TE>OT C>DT C>OT OLB>EDGE also named 12; they are D-exact)
                                       (+ item 3: ILB>FS OLB>FS; moves: TE>FS TE>DIME)
                                      6s:  FB>TE C>OG OLB>ILB OLB>SS OT>EDGE SS>CB FS>CB FS>OLB ILB>NICKEL
                                            ILB>TE OLB>NICKEL DT>OT OT>DT SS>TE TE>C TE>NICKEL TE>OLB TE>RB
                                            WR>RB WR>TE RB>TE SS>ILB EDGE>TE
                                      2s:  FS>SS SS>FS ILB>SS OT>C SS>OLB WR>CB WR>DIME WR>NICKEL WR>FS WR>SS FB>RB K>P P>K
  claude-flex-corrections-2026-11-09.md (9): EDGE>ILB EDGE>OG EDGE>OT EDGE>RB EDGE>NICKEL DT>C DT>OG EDGE>C OG>C
  claude-flex-floor-2026-11-10.md (5):        WR>CB WR>DIME WR>FS WR>NICKEL WR>SS  (2->6; R-policy native)
  KG-feedback 2026-11-10 (Owner judgment, not table relays): C>OG 6 (anti-D), C PBLK 6, EDGE CARRY 4, TE PBLK 4

Pin groups used by the scorer (every pin nameable):
  PINS_RELAY  = the rebuild-relay lists + item 3 + corrections + floor family (rows the Owner named)
  PINS_ANTI_D = the rows where the Owner overrules value outright (cannot fall out): C>OG, FB>RB, FB>TE,
                OLB>ILB, OLB>SS, (C>OT is D-exact anyway)
"""
import json, re, sys

DUTIES = ["PBLK","RBLK","SNP","CTH","RTE","CARRY","THR","MCOV","ZCOV","RNG","RUSH","EREP","RDEF","TKL","KCK","PNT","DEEP"]

HAVE = {
 "QB":  [1,1,0,2,1,7,10,2,2,4,0,0,1,2,0,0,0],
 "RB":  [2,6,0,6,4,10,0,2,1,6,0,0,2,3,0,0,0],
 "FB":  [3,8,0,3,3,8,0,2,1,5,0,0,5,5,0,0,0],
 "WR":  [1,2,0,9,10,6,1,6,2,8,0,0,1,4,0,0,4],
 "TE":  [5,7,1,8,4,4,0,4,4,5,1,0,3,3,0,0,0],
 "OT":  [10,9,5,1,0,1,0,0,0,2,6,6,5,3,0,0,0],
 "OG":  [9,9,6,1,0,1,0,0,0,2,6,6,5,3,0,0,0],
 "C":   [6,9,10,1,0,1,0,0,0,2,3,5,3,3,0,0,0],   # Owner accepted C PBLK 6; paired NEED below (self-doable)
 "DT":  [5,5,0,1,0,1,0,0,0,2,6,6,9,6,0,0,0],
 "EDGE":[5,5,0,2,0,4,0,3,3,6,10,10,9,6,0,0,0],   # Owner accepted EDGE CARRY 4
 "ILB": [3,4,0,4,0,2,0,7,8,7,5,1,9,9,0,0,0],
 "OLB": [3,4,0,4,0,2,0,4,2,7,8,2,7,8,0,0,1],
 "SS":  [1,3,0,4,2,2,0,7,9,9,1,0,4,8,0,0,8],
 "FS":  [0,1,0,5,2,1,0,6,9,10,0,0,3,6,0,0,9],
 "CB":  [0,1,0,7,7,2,0,10,9,9,1,0,4,6,0,0,7],
 "K":   [0,0,0,3,0,1,0,1,1,3,0,0,0,2,10,5,0],
 "P":   [0,0,0,3,0,1,0,1,1,3,0,0,0,2,5,10,0],
}
NEED = {
 "QB":  {"THR":10,"CARRY":4,"RNG":4},
 "RB":  {"CARRY":10,"PBLK":1,"RBLK":5,"CTH":6,"RTE":4,"RNG":6,"RDEF":2,"TKL":2},
 "FB":  {"PBLK":1,"RBLK":5,"CTH":1,"CARRY":1,"RNG":1,"RDEF":2},
 "WR":  {"CTH":9,"RTE":10,"CARRY":4,"RNG":8,"RBLK":1},
 "TE":  {"PBLK":4,"RBLK":6,"CTH":7,"RTE":4,"CARRY":3,"RNG":5,"RDEF":3,"TKL":3},
 "OT":  {"PBLK":10,"RBLK":9,"RNG":2,"RDEF":4},
 "OG":  {"PBLK":9,"RBLK":9,"RNG":2,"RDEF":4},
 "C":   {"PBLK":6,"RBLK":9,"SNP":10,"RNG":2,"RDEF":3},
 "DT":  {"RUSH":6,"RDEF":9,"TKL":6,"RNG":2,"PBLK":4},
 "EDGE":{"RUSH":10,"EREP":10,"RDEF":8,"RNG":4,"TKL":4},
 "ILB": {"RDEF":9,"TKL":9,"MCOV":5,"ZCOV":7,"RNG":6,"RUSH":4,"CTH":2},
 "OLB": {"MCOV":3,"ZCOV":2,"RNG":6,"RUSH":3,"RDEF":6,"TKL":6,"CTH":2},
 "SS":  {"MCOV":6,"ZCOV":8,"RNG":8,"TKL":7,"CTH":4,"DEEP":2,"RDEF":4,"RUSH":1},
 "FS":  {"ZCOV":8,"RNG":10,"MCOV":5,"TKL":6,"CTH":5,"DEEP":6},
 "CB":  {"MCOV":9,"ZCOV":6,"RNG":9,"TKL":6,"CTH":5,"RDEF":2,"DEEP":6,"RTE":7},
 "K":   {"KCK":10},
 "P":   {"PNT":10},
 "NICKEL": {"MCOV":5,"ZCOV":4,"RNG":8,"TKL":7,"RDEF":3,"CTH":4,"DEEP":3},
 "DIME":   {"ZCOV":7,"RNG":9,"MCOV":4,"TKL":7,"RDEF":3,"CTH":4,"DEEP":6},
 "DL5":    {"RUSH":9,"EREP":5,"RDEF":8,"TKL":6,"RNG":4},
}
OFFENSE = {"QB","RB","FB","WR","TE","OT","OG","C"}
DEFENSE = {"DT","EDGE","ILB","OLB","SS","FS","CB","NICKEL","DIME"}
FLOOR_EXEMPT = {"FB","K","P"}

TIERS = [0,2,6,12]
CUTS = (1.0, 4.0, 9.0)
def tier(x, cuts=CUTS):
    lo, mid, hi = cuts
    if x < lo: return 0
    if x < mid: return 2
    if x < hi: return 6
    return 12

# duty weights: price of losing the duty AT FULL demand, calibrated from the Owner's table's own asymmetries
BETA = {"PBLK":1.3,"RBLK":0.55,"SNP":0.35,"CTH":0.7,"RTE":1.2,"CARRY":0.95,"THR":1.3,
        "MCOV":1.2,"ZCOV":1.1,"RNG":0.9,"RUSH":1.0,"EREP":1.15,"RDEF":1.1,"TKL":0.65,
        "KCK":0.45,"PNT":0.45,"DEEP":2.0}

def aptitude(src, dst, have=HAVE, need=NEED, gamma=1.15, kappa=0.35, beta=BETA):
    hv = dict(zip(DUTIES, have[src]))
    nd = need[dst]
    contrib = []
    for d, nv in nd.items():
        gap = max(0.0, nv - hv[d])          # points 0..10
        if gap <= 0:
            continue
        w = nv / 10.0
        contrib.append((beta[d] * w * (gap ** gamma), d, gap))
    if not contrib:
        return 0.0, []
    contrib.sort(key=lambda t: -t[0])
    qmax = contrib[0][0]
    rest = sum(c[0] for c in contrib[1:])
    return min(12.0, qmax + kappa * rest), contrib

def clamp12(x):
    return min(12.0, max(0.0, x))

def load_D(path):
    D = {}
    for line in open(path):
        m = re.match(r'\|\s*([A-Z]+)>([A-Z0-9]+)\s*\|\s*(\d+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|', line)
        if m:
            D[(m.group(1), m.group(2))] = float(m.group(7))
    Db = dict(D)
    Db[("OLB","ILB")] = 6.7   # WILL/C bump cells (Owner-decided), REPORTED
    Db[("OLB","SS")] = 6.7
    return Db

def load_table(path):
    flex = json.load(open(path))["flex"]
    return [(s, d, flex[s][d]) for s in flex for d in flex[s]]

# ---- X ledger: the Owner's named judgment rows (every pin nameable to a relay) ----
PINS_REBUILD_12 = {("RB","FS"):12,("RB","SS"):12,("TE","ILB"):12,("EDGE","SS"):12,("ILB","DIME"):12,("OLB","DIME"):12,("QB","FS"):12,("SS","RB"):12,
                    ("TE","FS"):12,("TE","DIME"):12,("ILB","FS"):12,("OLB","FS"):12}
PINS_REBUILD_6  = {("FB","TE"):6,("C","OG"):6,("OLB","ILB"):6,("OLB","SS"):6,("OT","EDGE"):6,("SS","CB"):6,("FS","CB"):6,("FS","OLB"):6,
                    ("ILB","NICKEL"):6,("ILB","TE"):6,("OLB","NICKEL"):6,("DT","OT"):6,("OT","DT"):6,("SS","TE"):6,("TE","C"):6,
                    ("TE","NICKEL"):6,("TE","OLB"):6,("TE","RB"):6,("WR","RB"):6,("WR","TE"):6,("RB","TE"):6,("SS","ILB"):6,("EDGE","TE"):6}
PINS_REBUILD_2  = {("FS","SS"):2,("SS","FS"):2,("ILB","SS"):2,("OT","C"):2,("SS","OLB"):2,("WR","CB"):6,("WR","DIME"):6,("WR","NICKEL"):6,
                    ("WR","FS"):6,("WR","SS"):6,("FB","RB"):2,("K","P"):2,("P","K"):2}   # last 5 are floor 2->6
PINS_CORRECTIONS = {("EDGE","ILB"):6,("EDGE","OG"):6,("EDGE","OT"):6,("EDGE","RB"):6,("EDGE","NICKEL"):6,("DT","C"):6,("DT","OG"):6,("EDGE","C"):6,("OG","C"):2}
PINS_ALL = {**PINS_REBUILD_12, **PINS_REBUILD_6, **PINS_REBUILD_2, **PINS_CORRECTIONS}

def price(src, dst, D, cuts=CUTS, gamma=1.15, kappa=0.35, k2=0.0,
          pins=None, floor=True, v_enabled=True, a_enabled=True, beta=None, have=None, need=None):
    if pins and (src, dst) in pins:
        p = pins[(src, dst)]
    else:
        A = aptitude(src, dst, have or HAVE, need or NEED, gamma, kappa, beta or BETA)[0] if a_enabled else 0.0
        V = clamp12(D.get((src, dst), 0.0)) if v_enabled else 0.0
        raw = clamp12(max(A, V) + k2 * min(A, V))
        p = tier(raw, cuts)
    if floor and dst != "FB" and (src in OFFENSE) != (dst in OFFENSE) and src not in FLOOR_EXEMPT and dst not in FLOOR_EXEMPT:
        p = max(p, 6)
    return p

def evaluate(name, rows, D, **kw):
    TIi = {0:0, 2:1, 6:2, 12:3}
    exact, off1, hard = 0, [], []
    for s, d, owner in rows:
        m = price(s, d, D, **kw)
        if m == owner: exact += 1
        else:
            k = abs(TIi[m] - TIi[owner])
            (off1 if k == 1 else hard).append((s, d, owner, m))
    print(f"{name}: exact {exact}/99 | off-by-one {len(off1)} | hard {len(hard)} | te {len(off1)+2*len(hard)} | residuals {sorted(off1+hard)}")
    return exact, off1, hard

if __name__ == "__main__":
    rows = load_table(sys.argv[1])
    D = load_D(sys.argv[2])
    print(f"live rules {len(rows)} | pins available: {len(PINS_ALL)}\n")
    evaluate("FL-1v2 base  (no pins)      ", rows, D)
    evaluate("FL-1v2 + pins (owner's set) ", rows, D, pins=PINS_ALL)
    evaluate("FL-1v2 no value ledger      ", rows, D, pins=PINS_ALL, v_enabled=False)
    evaluate("FL-1v2 no aptitude ledger   ", rows, D, pins=PINS_ALL, a_enabled=False)
    evaluate("FL-1v2 no echo (k2=0)       ", rows, D, pins=PINS_ALL, k2=0.0)
    evaluate("FL-1v2 no floor             ", rows, D, pins=PINS_ALL, floor=False)
    evaluate("FL-1v2 linear gaps (g=1.0)  ", rows, D, pins=PINS_ALL, gamma=1.0)
    evaluate("FL-1v2 steeper (g=1.3)      ", rows, D, pins=PINS_ALL, gamma=1.3)
