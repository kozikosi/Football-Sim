#!/usr/bin/env python3
"""w29_patch2.py — stage 2: board section, undo-per-round, planMath, comparison dropdowns/panels."""
import io, sys

SRC = '/home/z/my-project/download/Football-Sim-Z-post-blue-w29.stage1.html'
OUT = '/home/z/my-project/download/Football-Sim-Z-post-blue-w29.stage2.html'
html = io.open(SRC, encoding='utf-8').read()
applied = []

def E(tag, old, new, count=1):
    global html
    n = html.count(old)
    if n != count:
        print('FAIL %s: found %d occurrences, expected %d' % (tag, n, count))
        sys.exit(1)
    html = html.replace(old, new)
    applied.append(tag)

# ============================================================
# D1-D5 + E1-E2 (Owner): Reading the Draft Board — [WINS]-style boxed titles,
# the verbatim rewrites with every line centered, the linebacker callout
# rewritten, and CPU DRAFT STRATEGY / UNDO in their own panels.
# ============================================================
E('D_boardmath',
"""function boardMathHTML(){
 // w27 (Owner): the Wins / Priority / Gone explanation, visualized like the other panels — words kept, boxes added
 const col = (word, tone, body)=>'<div class="zpb-bmcol">'
  + '<span class="zrl-badge '+(tone||'')+'">'+word+'</span>'
  + '<div class="narr">'+body+'</div></div>';
 return '<div class="zpb-bmgrid">'
  + col('WINS', 'zpb-shm', '<b>How good is he.</b> How many more games per season a player adds than a 70-rated player at his position, according to the same matchup math that plays the games. It is <i>static</i>: the same number for everyone with that position and rating, on every team and at every point in the draft. If a position has several starting spots (two tackles, three receivers), Wins averages across them. Running back 2, tight end 2 and the strongside linebacker are depth roles and are left out. (Guards and centers are valued the same, which is why a 76 center and a 76 guard have identical Wins.)')
  + col('PRIORITY', '', '<b>Do I need to take him now.</b> What picking him now adds over the best you could expect to still find at that spot at your next pick. To estimate it, the site replays the computer teams\\u2019 picks twelve times between now and your next turn and averages what is left. A big priority means waiting costs you; a priority near zero or negative means someone about as good will probably still be there. Priority changes as your roster fills and as the board thins.')
  + col('GONE', '', '<b>Is he about to leave.</b> The chance that a player of this type (same position group and same value) has been picked before your next turn, across those twelve replays.')
  + '</div>'
  + '<div class="zpb-bmcall"><b>Why can a linebacker show high priority?</b> Because priority is about scarcity, not just size. If the best edge rushers will still be there at your next pick but the elite linebackers will not, the linebacker\\u2019s priority can be higher even though his Wins number is smaller. The Wins column is the clean \\u201chow good is he\\u201d number; Priority is the \\u201cdo I need to take him now\\u201d number.</div>'
  + '<p style="margin:8px 0 0;"><b>How the computer teams pick.</b> Each CPU team takes the player who adds the most wins over a replacement-level starter (never below a 76 rating) at a spot it still needs, with a little personal taste for certain positions and some randomness.</p>';
}""",
"""function boardMathHTML(){
 // w29 (Owner): the titles wear the same box ([WINS] like [PRIORITY] and [GONE]), every line sits
 // centered with the Owner's own line breaks, and CPU DRAFT STRATEGY + UNDO each live in their own panel.
 const col = (word, body)=>'<div class="zpb-bmcol">'
  + '<span class="zrl-badge">'+word+'</span>'
  + '<div class="narr">'+body+'</div></div>';
 return '<div class="zpb-bmgrid zpb-bm-center">'
  + col('WINS', 'How many more games per season a player adds than a 70-rated player at his position<br>WINS are static.')
  + col('PRIORITY', 'Do I need to take him now.<br>What picking him now adds over the best you could expect to still find at that spot at your next pick. Priority changes as your roster fills and as the board thins.')
  + col('GONE', 'Is he about to leave.<br>The chance that a player will be picked by another team before your next turn')
  + '</div>'
  + '<div class="zpb-bmcall zpb-bm-center"><b>Why can a linebacker show high priority?</b><br>Because priority is about scarcity, not just size. If the best edge rushers will still be there at your next pick but the elite linebackers will not, the linebacker\\u2019s priority can be higher even though his Wins number is smaller.<br>The Wins column is the clean \\u201chow good is he\\u201d number.<br>Priority is the \\u201cdo I need to take him now\\u201d number.</div>'
  + '<div class="zpb-swgroup">'
  + zpbSw('CPU DRAFT STRATEGY', 'CPU teams draft by priority with a little personal taste for certain positions and some randomness.')
  + zpbSw('UNDO', 'The \\u21b6 Undo button takes back your most recent pick')
  + '</div>';
}""")

# the board paragraph in the guide composer — the UNDO panel replaces it
E('E1_boardpara',
""" const board = `${boardMathHTML()}<p style="margin:8px 0 0;"><b>One Undo per draft.</b> The ↶ Undo button takes back your most recent pick — once per draft, and only while you are on the clock.</p>`; // w27: the heading lives on the panel itself now""",
""" const board = `${boardMathHTML()}`; // w29 (Owner): CPU DRAFT STRATEGY and UNDO live in their own panels inside the section now""")

# the guide intro line and the button title follow the once-per-round law
E('E4_intro',
"""One Undo per draft takes your pick back.""",
"""One Undo per round takes your pick back.""")
E('E4_btntitle',
"""title="Take back your last pick (one per draft)\"""",
"""title="Take back your last pick (one per round)\"""")

# ============================================================
# E4 (Owner): Undo is available every round, but only once per round.
# ============================================================
E('E4_startdraft',
""" draftSim = {
  userIndex, rosters, teamNames: shuffled,
  pool: PLAYERS.filter(p=>POS_SLOT_MAP[p[1]]).sort((a,b)=>(b[3]-a[3])||(a[0]<b[0]?-1:1)),
  order: buildSnakeOrder(), pos:0, log:[], awaitingUser:false
 };""",
""" draftSim = {
  userIndex, rosters, teamNames: shuffled,
  pool: PLAYERS.filter(p=>POS_SLOT_MAP[p[1]]).sort((a,b)=>(b[3]-a[3])||(a[0]<b[0]?-1:1)),
  order: buildSnakeOrder(), pos:0, log:[], awaitingUser:false, undoUsedRound:null // w29 (Owner): one undo per round
 };""")

E('E4_visibility',
""" { const ub = document.getElementById('undoPickBtn'); if(ub) ub.style.display = (draftSim.undoStack && draftSim.undoStack.length && draftSim.awaitingUser) ? '' : 'none'; }""",
""" { const ub = document.getElementById('undoPickBtn'); if(ub) ub.style.display = (draftSim.undoStack && draftSim.undoStack.length && draftSim.awaitingUser && draftSim.undoUsedRound !== Math.floor(draftSim.pos/32)+1) ? '' : 'none'; } // w29 (Owner): available every round, once per round""")

E('E4_undofn',
"""function undoUserPick(){
 const u = draftSim && draftSim.undoStack && draftSim.undoStack.pop(); if(!u) return;""",
"""function undoUserPick(){
 if(!draftSim || (draftSim.undoUsedRound === Math.floor(draftSim.pos/32)+1)) return; // w29 (Owner): the undo may be spent once per round
 const u = draftSim.undoStack && draftSim.undoStack.pop(); if(!u) return;
 draftSim.undoUsedRound = Math.floor(draftSim.pos/32)+1; // w29: spent in this round — it returns when the next round begins""")

# ============================================================
# F1+F2+G (Owner): The math of every game-plan choice — OFFENSE / DEFENSE
# subtitles, balanced first in every section, R+ / P+ badges, the verbatim rewrites.
# ============================================================
E('G_11neutral', "'11|neutral':'The default. No lean, no cost.',", "'11|neutral':'The default',")
E('G_11run', "'11|run':'Strong run blockers and backs, or a quarterback that is a liability. Cuts giveaways and variance.',", "'11|run':'Strong run blockers and running backs or a weak quarterback. Reduces giveaways and variance',")
E('G_12neutral', "'12|neutral':'Tight ends clearly better than the third receiver. Adds blocking and a second receiving threat.',", "'12|neutral':'Second tight end is clearly better than third receiver. Adds blocking but fewer long-yardage receptions',")
E('G_13neutral', "'13|neutral':'Three tight ends on the field. Only two are drafted; the third is a generic 70.',", "'13|neutral':'Three tight ends on the field. Great blocking but few big passing plays',")
E('G_13pass', "'13|pass':'Rarely right: one receiver on the field.',", "'13|pass':'Personnel and strategy are paradoxical. Rarely selected. One receiver on the field.',")
E('G_21pass', "'21|pass':'Rarely right.',", "'21|pass':'Personnel and strategy are paradoxical. Rarely selected.',")
E('G_22pass', "'22|pass':'Rarely right.'", "'22|pass':'Personnel and strategy are paradoxical. Rarely selected.'")
E('G_22run', "'22|run':'Goal-line and four-minute offense; the most run-heavy look.',", "'22|run':'Goal-line and four-minute offense; the most <span class=\"zpb-emph zpb-emph-b\" title=\"Run emphasis\"><b>R+</b></span> look.',")

E('F_offrows',
""" let off = '';
 OFF_OPTS.forEach(o=>{
  const m = matchupModel(lg, lg, lg, {off:o, def:DEFAULT_DEF});
  off += `<tr><td>${PERS[o.pers].label}</td><td>${STRAT[o.strat].label}</td><td class="score">${sg(m.structPts-n.structPts)}</td><td class="score">${m.expRush.toFixed(0)} / ${m.expPass.toFixed(0)}</td><td class="score">${m.lamTO.toFixed(2)}</td><td class="score">${m.lamSack.toFixed(2)}</td><td class="score">±${m.sd.toFixed(1)}</td><td class="narr">${fit[o.pers+'|'+o.strat]||''}</td></tr>`;
 });""",
""" // w29 (Owner): balanced first in every section; the lean reads as the R+ / P+ badge, never the words
 const ZPB_LEAN_ORD = {neutral:0, run:1, pass:2};
 const ZPB_LEAN = s=> s==='run' ? '<span class="zpb-emph zpb-emph-b" title="Run emphasis"><b>R+</b></span>'
  : s==='pass' ? '<span class="zpb-emph zpb-emph-b" title="Pass emphasis"><b>P+</b></span>' : STRAT[s].label;
 let off = '';
 OFF_OPTS.slice().sort((a,b)=> a.pers===b.pers ? (ZPB_LEAN_ORD[a.strat]-ZPB_LEAN_ORD[b.strat]) : 0).forEach(o=>{
  const m = matchupModel(lg, lg, lg, {off:o, def:DEFAULT_DEF});
  off += `<tr><td>${PERS[o.pers].label}</td><td>${ZPB_LEAN(o.strat)}</td><td class="score">${sg(m.structPts-n.structPts)}</td><td class="score">${m.expRush.toFixed(0)} / ${m.expPass.toFixed(0)}</td><td class="score">${m.lamTO.toFixed(2)}</td><td class="score">${m.lamSack.toFixed(2)}</td><td class="score">±${m.sd.toFixed(1)}</td><td class="narr">${fit[o.pers+'|'+o.strat]||''}</td></tr>`;
 });""")

E('F_defrows',
""" let def = '';
 DEF_OPTS.forEach(d=>{
  const m = matchupModel(lg, lg, lg, {off:NEUTRAL_OFF, def:d});""",
""" let def = '';
 DEF_OPTS.slice().sort((a,b)=> a.pkg===b.pkg ? (ZPB_LEAN_ORD[a.focus]-ZPB_LEAN_ORD[b.focus]) : 0).forEach(d=>{ // w29 (Owner): balanced first in every section
  const m = matchupModel(lg, lg, lg, {off:NEUTRAL_OFF, def:d});""")

E('F_sub_off',
""" return `<h5 class="narr" style="margin:6px 0;">Offense: what each choice does to a league-average team against a league-average defense</h5>""",
""" return `<h5 class="narr" style="margin:6px 0;">OFFENSE</h5>""")
E('F_sub_def',
"""  <h5 class="narr" style="margin:14px 0 6px;">Defense: what each choice does to the offense it faces</h5>""",
"""  <h5 class="narr" style="margin:14px 0 6px;">DEFENSE</h5>""")

E('F_prose',
""""Spread" is the standard deviation of a game's scoring margin: run-heavy narrows it, pass-heavy widens it, which is why an underdog may choose to throw even when throwing costs expected points.""",
""""Spread" is the standard deviation of a game's scoring margin: the <span class="zpb-emph zpb-emph-b" title="Run emphasis"><b>R+</b></span> lean narrows it, the <span class="zpb-emph zpb-emph-b" title="Pass emphasis"><b>P+</b></span> lean widens it, which is why an underdog may choose to throw even when throwing costs expected points.""")

print('stage-2 edits applied:', len(applied))
io.open('/home/z/my-project/scripts/w29-stage2.done', 'w').write('\\n'.join(applied))
io.open(OUT, 'w', encoding='utf-8').write(html)
