#!/usr/bin/env python3
"""Z-post-blue WAVE 16 build module — Owner flex-chart update (26 Oct).

Owner delivered the updated flex chart (Claude is redoing the math engine; import later).
Directive: "Go ahead and show this in the ui even if it's not true for your current sim math."
=> UI-only change: window.zpbFlexTree() now renders the FULL 17-row chart (adds Fullback,
   MIKE/ILB, WILL/SAM/OLB, Strong Safety, Free Safety, Cornerback, Kicker, Punter rows and
   the Owner's new tier lists). The sim engine (FLEX literal, flexPenaltyFor, effOvr, the
   lineup-menu betas) stays byte-identical — the Owner explicitly accepts the temporary
   UI-vs-math mismatch until Claude's engine is imported."""

import hashlib, re, sys

SRC = '/home/z/my-project/build_w15.html'
OUT = '/home/z/my-project/build_w16.html'
SRC_MD5 = 'd053d4fe194a3f56525c89ca99799fc5'          # wave 15B

html = open(SRC, encoding='utf-8').read()
fails = []

got = hashlib.md5(html.encode()).hexdigest()
if got != SRC_MD5:
    fails.append(f'source md5 {got} != wave-15B pin {SRC_MD5}')

def rep(label, old, new, cnt=1):
    global html
    n = html.count(old)
    if n != cnt:
        fails.append(f'{label}: found {n}x, expected {cnt}')
        return
    html = html.replace(old, new)

OLD_F = """ const F = [
  ['Quarterback',      [[6,'WR, S']]],
  ['Running Back',     [[4,'WR'],[6,'S']]],
  ['Wide Receiver',    [[4,'RB, TE, S'],[6,'CB']]],
  ['Tight End',        [[2,'Wide Receiver'],[6,'RB, C, OG, OT, DE, DT, LB, S']]],
  ['Offensive Tackle', [[0,'OG, C'],[4,'DT']]],
  ['Offensive Guard',  [[0,'C'],[4,'OT, DT']]],
  ['Center',           [[0,'OG'],[4,'OT, DT']]],
  ['Defensive Tackle', [[4,'OG, C, DE'],[6,'OT']]],
  ['Defensive Edge',   [[2,'DT, WILL, SAM, OLB'],[4,'MIKE, ILB'],[6,'TE, RB']]]
 ];"""

NEW_F = """ const F = [
  ['Quarterback',      [[6,'WR, S']]],
  ['Running Back',     [[2,'FB'],[4,'WR'],[6,'S']]],
  ['Fullback',         [[4,'RB, TE']]],
  ['Wide Receiver',    [[4,'RB, TE, S'],[6,'CB']]],
  ['Tight End',        [[2,'WR, FB'],[6,'RB, C, OG, OT, DE, DT, LB, S']]],
  ['Offensive Tackle', [[0,'OG, C'],[4,'DT, FB']]],
  ['Offensive Guard',  [[0,'C'],[4,'OT, DT, FB']]],
  ['Center',           [[0,'OG'],[4,'OT, DT, FB']]],
  ['Defensive Tackle', [[4,'OG, C, DE, FB'],[6,'OT']]],
  ['Defensive Edge',   [[2,'DT, WILL, SAM, OLB'],[4,'MIKE, ILB'],[6,'TE, RB']]],
  ['MIKE / ILB',       [[0,'ILB, WILL, SAM, OLB'],[4,'DT, FB'],[6,'DE, TE, S']]],
  ['WILL / SAM / OLB', [[0,'OLB, WILL, SAM'],[2,'MIKE'],[4,'DE'],[6,'DT, TE, S, FB']]],
  ['Strong Safety',    [[0,'Nickel'],[2,'FS'],[4,'WILL, SAM, OLB'],[6,'CB, MIKE, WR, TE, RB, FB']]],
  ['Free Safety',      [[0,'Nickel'],[2,'SS'],[4,'CB, WR']]],
  ['Cornerback',       [[0,'FS, Nickel'],[2,'SS'],[4,'WR']]],
  ['Kicker',           [[0,'P']]],
  ['Punter',           [[4,'K']]]
 ];"""

rep('W16-1 flex tree data -> Owner 17-row chart', OLD_F, NEW_F)

# ---------- engine byte-guards (the sim math must NOT move this wave) ----------
ENGINE_PINS = [
 ('FLEX literal head',        "const FLEX = {\n LT:{OG:0, C:0, DT:4, RB:6}, RT:{OG:0, C:0, DT:4, RB:6},"),
 ('FLEX literal tail',        " HB:{TE:6}, FB:{}, QB:{RB:6, WR:6}, K:{P:0}, P:{K:0}  // QB/OL -> RB -6, QB -> WR -6, K<->P free (Owner)\n};"),
 ('LB_FLEX',                  "const LB_FLEX = {DE:6, DT:4, CB3:4, SS:2, FS:4, TE:6, RB:6}; // MIKE: DT -4, SS -2 (Owner)"),
 ('OLB_FLEX',                 "const OLB_FLEX = {DE:2, DT:4, CB3:2, SS:4, FS:6, TE:6, RB:6}; // Owner: OLB/WILL/SAM -> edge -2, DT/SS -4, FS -6, Nickel -2"),
 ('EMERGENCY_PENALTY',        "const EMERGENCY_PENALTY = 8;"),
 ('flexPenaltyFor body',      "function flexPenaltyFor(pos, slot){\n const p = flexRule(pos, slot);\n return p==null ? EMERGENCY_PENALTY : p;\n}"),
 ('effOvr body',              "function effOvr(player, slot){\n if(!player) return 70;\n return player[3] - flexPenaltyFor(player[1], slot);\n}"),
]
for label, pin in ENGINE_PINS:
    if html.count(pin) != 1:
        fails.append(f'engine pin {label}: {html.count(pin)}x, expected 1')

# ---------- chart postchecks ----------
for label, pin in [
  ('QB row',      "['Quarterback',      [[6,'WR, S']]]"),
  ('RB row',      "['Running Back',     [[2,'FB'],[4,'WR'],[6,'S']]]"),
  ('FB row',      "['Fullback',         [[4,'RB, TE']]]"),
  ('WR row',      "['Wide Receiver',    [[4,'RB, TE, S'],[6,'CB']]]"),
  ('TE row',      "['Tight End',        [[2,'WR, FB'],[6,'RB, C, OG, OT, DE, DT, LB, S']]]"),
  ('OT row',      "['Offensive Tackle', [[0,'OG, C'],[4,'DT, FB']]]"),
  ('OG row',      "['Offensive Guard',  [[0,'C'],[4,'OT, DT, FB']]]"),
  ('C row',       "['Center',           [[0,'OG'],[4,'OT, DT, FB']]]"),
  ('DT row',      "['Defensive Tackle', [[4,'OG, C, DE, FB'],[6,'OT']]]"),
  ('DE row',      "['Defensive Edge',   [[2,'DT, WILL, SAM, OLB'],[4,'MIKE, ILB'],[6,'TE, RB']]]"),
  ('MIKE row',    "['MIKE / ILB',       [[0,'ILB, WILL, SAM, OLB'],[4,'DT, FB'],[6,'DE, TE, S']]]"),
  ('OLB row',     "['WILL / SAM / OLB', [[0,'OLB, WILL, SAM'],[2,'MIKE'],[4,'DE'],[6,'DT, TE, S, FB']]]"),
  ('SS row',      "['Strong Safety',    [[0,'Nickel'],[2,'FS'],[4,'WILL, SAM, OLB'],[6,'CB, MIKE, WR, TE, RB, FB']]]"),
  ('FS row',      "['Free Safety',      [[0,'Nickel'],[2,'SS'],[4,'CB, WR']]]"),
  ('CB row',      "['Cornerback',       [[0,'FS, Nickel'],[2,'SS'],[4,'WR']]]"),
  ('K row',       "['Kicker',           [[0,'P']]]"),
  ('P row',       "['Punter',           [[4,'K']]]"),
]:
    if html.count(pin) != 1:
        fails.append(f'chart row {label}: {html.count(pin)}x, expected 1')

# stale rows must be gone
for label, stale in [
  ('old RB row',  "[[4,'WR'],[6,'S']]"),
  ('old TE tier', "[[2,'Wide Receiver']"),
  ('old OT row',  "[[0,'OG, C'],[4,'DT']]"),
  ('old OG row',  "[[0,'C'],[4,'OT, DT']]"),
  ('old C row',   "[[0,'OG'],[4,'OT, DT']]"),
  ('old DT row',  "[[4,'OG, C, DE'],[6,'OT']]"),
]:
    if stale in html:
        fails.append(f'stale {label} still present')

# exactly one zpbFlexTree definition; its F block has 17 family rows
if html.count('window.zpbFlexTree = function()') != 1:
    fails.append(f"zpbFlexTree defs: {html.count('window.zpbFlexTree = function()')}")
i = html.find("window.zpbFlexTree = function()")
j = html.find("window.zpb100More", i)
block = html[i:j]
rows = re.findall(r"\n  \['", block)
if len(rows) != 17:
    fails.append(f'flex tree rows: {len(rows)}, expected 17')
for tier in ["zpb-ft-free", "zpb-ft-2", "zpb-ft-4", "zpb-ft-6"]:
    if tier not in html:
        fails.append(f'chip class {tier} missing (CSS stripped?)')

if fails:
    print('BUILD FAILED:'); [print(' -', f) for f in fails]; sys.exit(1)

open(OUT, 'w', encoding='utf-8').write(html)
data = open(OUT, 'rb').read()
src_len = len(open(SRC, 'rb').read())
print(f'OK  build_w16.html  md5 {hashlib.md5(data).hexdigest()}  {len(data):,} B  (src {src_len:,} B, delta {len(data)-src_len:+,} B)')
