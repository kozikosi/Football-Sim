#!/usr/bin/env python3
# w88 build: patch w87 -> w88 by asserted exact replacements (the zpb_v13 pattern).
# Scope (w88 prompt section 3): numbers and order only. Every w87 weight display becomes the
# NEW Wins table (localWins20, verified on the Colors engine at 4ca9a071). Model + engine untouched.
import hashlib, sys

SRC = '/home/z/my-project/work/w87.html'
DST = '/home/z/my-project/work/w88.html'

src = open(SRC, encoding='utf-8').read()
s = src

def rep(old, new, label, count=1):
    global s
    n = s.count(old)
    if n != count:
        print(f'FAIL [{label}]: found {n} occurrences, expected {count}')
        sys.exit(1)
    s = s.replace(old, new)
    print(f'ok   [{label}]')

# ---- E1 · header comment: a w88 block above the (historical) w85 header ----
rep("""<!--
WAVE: w85 (round 3 — the Owner's 2026-11-08 chat)""",
"""<!--
WAVE: w88 (the Owner's 2026-11-09 directive, delivered 2026-11-10)
BASE: w87 gh-pages (1,900,033 B · md5 bffdccace803ab126b52783e0de8f2e1)
THIS WAVE: the position values leave the QB=1000 weight scale and wear WINS — extra wins per
season for a 20-OVR upgrade, measured at each position's LOCAL rate around its pool average
(the P-321 method: local slope at ±5 around the CSV pool center, slope × 20; pool = the
1,941-player Madden 27 CSV). Every slot re-measured on the Colors engine at snapshot 4ca9a071:
all 32 reproduce the Owner's table to one decimal (OT1 = 1.2497 exact, the known rounding-
boundary artifact, reads 1.2). The weight table (ZPB_SLOTS_W) stays as the model's internal
law — the engine calibration still reads it — but it is no longer displayed anywhere.
Numbers and order only: no engine change, no flex change, no layout change, no brand change.
-->
<!--
WAVE: w85 (round 3 — the Owner's 2026-11-08 chat)""", 'E1 header')

# ---- E2 · wpoLab (local const inside slotRoleRows): labeled wins-per-+1 rides the NEW table ----
rep("""const wpoLab = s=> ZPB_SLOTS_W[s]!=null ? ZPB_SLOTS_W[s]*0.00254/20 : wpo[s]; // w65 (Owner): the labeled wins-per-+1 rides the new table""",
"""const wpoLab = s=> (typeof zpbSlotWinsLocal==='function') ? zpbSlotWinsLocal(s)/20 : wpo[s]; // w88 (Owner): the labeled wins-per-+1 rides the NEW local Wins table (the local slope)""", 'E2 wpoLab')

# ---- E3 · slotRoleTableHTML: the 70->90 column wears the NEW Wins, one decimal ----
rep("""const rows = slotRoleRows().map(r=>Object.assign({up:zpbSlotWins70to90(r.slot)}, r)).sort((a,b)=>b.up-a.up); // w65 (Owner): the 70->90 column wears the new weights""",
"""const rows = slotRoleRows().map(r=>Object.assign({up:(typeof zpbSlotWinsLocal==='function')?zpbSlotWinsLocal(r.slot):zpbSlotWins70to90(r.slot)}, r)).sort((a,b)=>b.up-a.up); // w88 (Owner): the column wears the NEW local Wins table""", 'E3 role rows')

rep("""<td class="score">${r.up.toFixed(2)}</td>""",
"""<td class="score">${r.up.toFixed(1)}</td>""", 'E4 role toFixed')

rep("""<th title="Extra wins per season if this position goes from a 70 to a 90">Wins from a 70\u219290 upgrade</th>""",
"""<th title="Extra wins per season for a 20-OVR upgrade, measured at the position's local rate around its pool average">Wins per season</th>""", 'E5 role th')

# ---- E6/E7 · valueTiersHTML: tier viz on the NEW Wins + honest tier label ----
rep("""const rows = ROSTER_SLOTS.map(s=>({s, w:zpbSlotWins70to90(s)})).sort((a,b)=>b.w-a.w); // w65 (Owner): the Guide's tier viz wears the new weights""",
"""const rows = ROSTER_SLOTS.map(s=>({s, w:(typeof zpbSlotWinsLocal==='function')?zpbSlotWinsLocal(s):zpbSlotWins70to90(s)})).sort((a,b)=>b.w-a.w); // w88 (Owner): the tier viz wears the NEW local Wins table""", 'E6 tier rows')

rep(""" wins from a 70\u219290 upgrade): """,
""" wins per season, 20-OVR at the local rate): """, 'E7 tier label')

# ---- E8 · guide intro: the bracket story becomes the local-rate story ----
rep("""This is how our math ranks them, from most to least valuable (the number in brackets is the extra wins per season from upgrading that position from a 70 to a 90):</p>""",
"""This is how our math ranks them, from most to least valuable (each tier shows the extra wins per season a 20-OVR upgrade is worth, measured at the position's local rate around its pool average):</p>""", 'E8 guide intro')

# ---- E9 · the "In short" prose: weights -> Wins, exact display values ----
rep("""  <p style="margin:4px 0;">In short: <b>quarterback is in a class by itself</b>. After that the <b>top wide receiver and the top edge rusher</b> are tied at 650, the <b>first offensive tackle and first defensive tackle</b> sit at 500, and the <b>400 tier</b> holds the guards, the top cornerback and the second receiver. The 300 tier is the second tackle, second end and second tackle on defense plus the linebackers and both safeties. Running backs, tight ends and specialists matter less than most fans expect.</p>""",
"""  <p style="margin:4px 0;">In short: <b>quarterback is in a class by itself</b> (2.5 wins). After that come the <b>top edge rusher</b> (1.7) and the <b>top wide receiver</b> (1.6), then the <b>first defensive tackle</b> (1.3) and the <b>first offensive tackle</b> (1.2). The <b>1-win tier</b> holds the second receiver, the top cornerback and the first guard. The <b>0.8 tier</b> is the second offensive tackle, the second end, the second tackle on defense, the middle linebacker and both safeties. Running backs, tight ends and specialists matter less than most fans expect.</p>""", 'E9 prose')

# ---- E10 · values narrative: no weight scale on display anymore ----
rep("""The integer weight scale behind these numbers lives in the weights guide (REWEIGHT-BRIEF), with the quarterback anchored at 1000.</p>""",
"""Each number is Wins: extra games per season for a 20-OVR upgrade, measured at the position's local rate around its pool average (the 1,941-player Madden 27 pool the league is built from).</p>""", 'E10 narrative')

# ---- E11/E12 · the position rankings page buttons: Wins badges, new ranking order ----
rep("""  var wv = '';
  try{ wv = String((typeof ZPB_SLOTS_W!=='undefined' && ZPB_SLOTS_W[s]!=null) ? ZPB_SLOTS_W[s] : Math.round(zpbSlotWins70to90(s)*393.7)); }catch(e){} // w87 (Owner): the buttons wear the recalculated Wins table — integers on the QB=1000 scale
  row.insertAdjacentHTML('beforeend','<button type="button" class="zpb-srbtn" data-rslot="'+s+'" title="Toggle '+(LABELS[s]||s)+' in or out of the ranking"><b>'+(LABELS[s]||s)+'</b><i>'+wv+'</i></button>');""",
"""  var wv = '';
  try{ wv = (typeof zpbSlotWinsLocal==='function') ? zpbSlotWinsLocal(s).toFixed(1)+' w' : ''; }catch(e){} // w88 (Owner): the buttons wear the WINS table — extra wins per season (20-OVR upgrade at the local rate)
  row.insertAdjacentHTML('beforeend','<button type="button" class="zpb-srbtn" data-rslot="'+s+'" title="'+(LABELS[s]||s)+' \u00b7 '+(typeof zpbSlotWinsLocal==='function'?zpbSlotWinsLocal(s).toFixed(1):'')+' wins per season (20-OVR upgrade at the local rate) \u2014 toggle in or out of the ranking"><b>'+(LABELS[s]||s)+'</b><i>'+wv+'</i></button>');""", 'E11 badge')

rep(""" if(typeof ROSTER_SLOTS === 'undefined' || typeof LABELS === 'undefined') return;
 ROSTER_SLOTS.forEach(function(s){""",
""" if(typeof ROSTER_SLOTS === 'undefined' || typeof LABELS === 'undefined') return;
 (window.ZPB_SLOT_UI_ORDER||ROSTER_SLOTS).forEach(function(s){ if(ROSTER_SLOTS.indexOf(s)<0) return; // w88 (Owner): the buttons wear the new ranking order""", 'E12 order')

# ---- E13 · the w88-js block: data + order + the guide graphic (overrides the w87 block) ----
W88JS = """<script id="zpb-w26-js">"""
NEWBLOCK = """<script id="zpb-w88-js">
// ============ Z-POST-BLUE W88 (Owner round, 9-10 Nov 2026) ============
// THE WINS TABLE — the position values leave the QB=1000 weight scale and wear WINS: extra
// wins per season for a 20-OVR upgrade, measured at the position's LOCAL rate around its pool
// average (the P-321 method: local slope at \u00b15 around the CSV pool center, slope \u00d7 20; pool =
// the 1,941-player Madden 27 CSV). Every slot re-measured on the Colors engine at snapshot
// 4ca9a071 \u2014 all 32 reproduce the Owner's table to one decimal (OT1 = 1.2497 exact, the known
// rounding-boundary artifact, reads 1.2). The weight table (ZPB_SLOTS_W) stays as the model's
// internal law (the engine calibration reads it); it is no longer displayed anywhere.
window.ZPB_SLOTS_WINS = {QB:2.4706, DE1:1.7097, WR1:1.6071, DT1:1.3158, OT1:1.2497, WR2:1.1487, CB1:1.0557, OG1:1.0001, MIKE:0.7934, DE2:0.7908, DT2:0.7896, FS:0.7893, SS:0.7887, OT2:0.7510, CB2:0.6593, OG2:0.6258, TE1:0.6181, RB1:0.6126, WILL:0.3950, DL5:0.3939, C:0.3752, TE2:0.2661, CB3:0.2610, WR3:0.2470, CB4:0.1310, SAM:0.1279, K:0.1271, P:0.1182, WR4:0.1019, RB2:0.0971, TE3:0.0805, FB:0.0626}; // w88 (Owner): the NEW Wins table (localWins20) \u2014 one decimal on display; CB4 is the product's DIME (the label law, w34) and carries the Colors engine's DIME value
window.zpbSlotWinsLocal = function(s){ const v = window.ZPB_SLOTS_WINS[s]; return v != null ? v : 0; }; // w88: the slot's Wins \u2014 the accessor every w88 display reads
window.ZPB_SLOT_UI_ORDER = ['QB','DE1','WR1','DT1','OT1','WR2','CB1','OG1','MIKE','DE2','DT2','FS','SS','OT2','CB2','OG2','TE1','RB1','WILL','DL5','C','TE2','CB3','WR3','CB4','SAM','K','P','WR4','RB2','TE3','FB']; // w88 (Owner): the Wins order \u2014 WR2 rises above CB1, SAM falls to 26th, RB2 to 30th (ties read the exact measured values)
window.zpbSlotUIRank = function(){ // w88: same contract as w87 \u2014 the base order, then any future slot behind, best first
 const base = window.ZPB_SLOT_UI_ORDER;
 if(typeof ROSTER_SLOTS === 'undefined') return base.slice();
 const extra = ROSTER_SLOTS.filter(s=>base.indexOf(s)<0); // any future slot the table has not met ranks behind, measured value first
 const rows = extra.map(s=>({s, w:(typeof zpbSlotWinsLocal==='function')?zpbSlotWinsLocal(s):0}))
   .sort((a,b)=>b.w-a.w).map(r=>r.s);
 return base.concat(rows);
};
window.zpbPosRankHTML = function(){ // w88 (Owner): the guide's ranking wears WINS \u2014 the meaning sits on the row (the unit) and in the hover
 const order = (typeof zpbSlotUIRank==='function') ? zpbSlotUIRank() : (typeof ROSTER_SLOTS!=='undefined'?ROSTER_SLOTS:[]);
 if(!order.length) return '';
 let h = '<div class="zpb-posrank">';
 order.forEach((s,i)=>{
  const w = (typeof zpbSlotWinsLocal==='function') ? zpbSlotWinsLocal(s) : 0;
  h += `<div class="zpb-prrow${i===0?' zpb-prtop':''}"><span class="zpb-prank">${i+1}</span>`
     + `<span class="zpb-prname" data-zslot="${s}">${(typeof LABELS!=='undefined'&&LABELS[s])||s}</span>`
     + `<span class="zpb-prbar" style="width:${Math.max(2.5, w/2.5*100).toFixed(1)}%"></span>`
     + `<span class="zpb-prval" title="Extra wins per season for a 20-OVR upgrade at the position's local rate around its pool average">${w.toFixed(1)} wins</span></div>`;
 });
 h += '</div><div class="zpb-prcap">The Wins value of every starting spot  \u00b7  extra wins per season, 20-OVR upgrade at the local rate</div>';
 return h;
};
</script>

<script id="zpb-w26-js">"""
rep(W88JS, NEWBLOCK, 'E13 w88-js block')

open(DST, 'w', encoding='utf-8').write(s)
md5 = hashlib.md5(open(DST, 'rb').read()).hexdigest()
print(f'\nw88 written: {len(s):,} B · md5 {md5}')
