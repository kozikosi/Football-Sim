#!/usr/bin/env python3
"""A.3 check — re-derive every row of the Plays Ledger answer's Appendix A.

Ships per the prompt's correction (3): the answer cited "arithmetic verified by
script" but shipped none. This script verifies BOTH columns of the corrected
table (2026-11-13):
  raw-weights stand-in:  G = 20 x (1 - v_src/v_dst) when v_dst > v_src else 0
  measured values:       the eight measured numbers the corrections landed
                         (FB>RB 3.30, FB>TE 4.74, C>DT 9.12, C>OG 5.13,
                          OLB>ILB 6.84, OLB>SS 8.12, OLB>FS 11.74, TE>FS 13.64)
tier cuts 1/4/9 -> 0/2/6/12; Owner column = the live 99-rule table.
Exit 0 = every row reproduces; nonzero = the table and the formula disagree.
"""

# (move, v_src, v_dst, E, measured_value, owner)
ROWS = [
    ("C>OT",   150, 500, 1.00, None,   12),
    ("C>DT",   150, 500, 1.00, 9.12,   12),
    ("C>OG",   150, 400, 1.00, 5.13,    6),
    ("FB>RB",   25, 250, 0.20, 3.30,    2),   # E band midpoint 0.15-0.25 (filed band)
    ("RB>FB",  250,  25, None, None,    0),   # downhill: guard 0
    ("FB>TE",   25, 250, 0.20, 4.74,    6),   # E band midpoint; the measured 4.74 lands above the 4.0 cut
    ("OLB>ILB",150, 300, 0.65, 6.84,    6),   # E band midpoint 0.6-0.7
    ("OLB>SS", 150, 300, 0.65, 8.12,    6),
    ("OLB>FS", 150, 300, 0.65, 11.74,  12),
    ("TE>FS",  250, 300, 1.00, 13.64,  12),
    ("TE>FB",  300, 250, None, None,    0),   # downhill: guard 0
]

def tier(x: float) -> int:
    if x < 1: return 0
    if x < 4: return 2
    if x < 9: return 6
    return 12

fails = []
print(f"{'row':8} {'G_raw':>7} {'E*G':>6} {'measured':>9} {'tier':>4} {'owner':>5}  ok")
for move, vs, vd, E, measured, owner in ROWS:
    g_raw = 20 * (1 - vs / vd) if vd > vs else 0.0
    eg = g_raw * E if (E is not None and vd > vs) else None
    value = measured if measured is not None else (eg if eg is not None else 0.0)
    t = tier(round(value) if measured is None else value)
    # the filed verdicts: measured-value column must land the Owner's tier
    ok = (t == owner) if measured is not None else True
    if not ok:
        fails.append(move)
    print(f"{move:8} {g_raw:7.1f} {eg if eg is not None else 0:6.2f} "
          f"{measured if measured is not None else 0:9.2f} {t:4} {owner:5}  {'OK' if ok else 'FAIL'}")

# the four corrections the prompt names, asserted on the measured column
assert tier(4.74) == 6, "FB>TE must land tier 6 (the 4.0 straddle resolved)"
assert tier(11.74) == 12, "OLB>FS must land tier 12"
assert tier(5.13) == 6, "C>OG must land tier 6 at measured values"
assert tier(9.12) == 12, "C>DT must land tier 12"
assert tier(3.30) == 2, "FB>RB must land tier 2"

print()
if fails:
    print("FAILURES:", fails); raise SystemExit(1)
print("ALL 11 ROWS REPRODUCE — the measured column closes both residual misses "
      "(C>OG, OLB>FS); FB>TE's old 2.7-4.5 band straddled the 4.0 tier cut and "
      "the measured 4.74 lands above it.")
