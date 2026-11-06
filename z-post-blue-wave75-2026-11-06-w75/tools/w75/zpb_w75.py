#!/usr/bin/env python3
# zpb_w75.py — wave 75 · build from the pristine w73 base (8b72bf725406637790c0457be3e8d97a)
# Pattern law (START-OF-CHAT §5.2): asserted exact replacements + payloads + post-checks. Never hand-edit the product.
import hashlib, subprocess, sys, os

BASE = '/home/z/my-project/work/Football-Sim-Z-post-blue-w73.html'
OUT  = '/home/z/my-project/work/z-post-blue-wave75-2026-11-06-w75/Football-Sim-Z-post-blue-w75.html'

src = open(BASE, encoding='utf-8').read()
md5_base = hashlib.md5(src.encode()).hexdigest()
assert md5_base == '8b72bf725406637790c0457be3e8d97a', 'baseline md5 drifted: ' + md5_base

def rep(old, new, n=1):
    global src
    c = src.count(old)
    assert c == n, 'anchor count %d (want %d) for: %s' % (c, n, old[:90])
    src = src.replace(old, new)

def rep_any(options, new, n=1):
    global src
    for o in options:
        if src.count(o) == n:
            src = src.replace(o, new)
            return
    raise AssertionError('no candidate matched (want %d): %r' % (n, options[0][:90]))

# ---------------- R1 · the buttons start all OFF — the board is still full (Owner P2) ----------------
rep("function newDraftUI(){ return {groups:new Set(WV_GROUPS), prio:{}, rosterView:'depth', sim:null, slotPick:{}, teamFilter:null, showAll:false, soloBase:null}; } // w73 (Owner): soloBase remembers where a one-group highlight came from — ALL or CLEAR",
    "function newDraftUI(){ return {groups:new Set(), prio:{}, rosterView:'depth', sim:null, slotPick:{}, teamFilter:null, showAll:false}; } // w75 (Owner): the buttons start all OFF — the board is still full (every button off is the default)")

# ---------------- R2 · the chip law: on = on the board · off = off · all off = full board (Owner P2) ----------------
rep(""" document.getElementById('draftChips').addEventListener('click', e=>{
  const t = e.target.closest('[data-tog],[data-all],[data-none]'); if(!t || !draftSim) return;
  if(t.dataset.tog){
   const g = t.dataset.tog, S = draftUI.groups;
   if(S.size === WV_GROUPS.length){ S.clear(); S.add(g); draftUI.soloBase = 'all'; } // w73 (Owner): from a fully lit board, one click lights that group alone
   else if(S.size === 1 && S.has(g) && draftUI.soloBase === 'all'){ WV_GROUPS.forEach(x=>S.add(x)); draftUI.soloBase = null; } // w73 (Owner): re-click the soloed group — the whole board lights back up
   else if(S.size === 1 && S.has(g) && draftUI.soloBase === 'none'){ S.clear(); draftUI.soloBase = null; } // w73 (Owner): the same re-click after CLEAR returns the row to CLEAR
   else if(S.size === 0){ S.add(g); draftUI.soloBase = 'none'; } // w73 (Owner): from a cleared board, one click lights that group alone
   else { if(S.has(g)) S.delete(g); else S.add(g); draftUI.soloBase = null; }
  }
  else if(t.dataset.all){ WV_GROUPS.forEach(g=>draftUI.groups.add(g)); draftUI.teamFilter = null; draftUI.soloBase = null; }
  else if(t.dataset.none){ draftUI.groups.clear(); draftUI.soloBase = null; }
  renderDraftBoard2();
 });""",
""" document.getElementById('draftChips').addEventListener('click', e=>{
  const t = e.target.closest('[data-tog],[data-all],[data-none]'); if(!t || !draftSim) return;
  if(t.dataset.tog){ const g = t.dataset.tog; if(draftUI.groups.has(g)) draftUI.groups.delete(g); else draftUI.groups.add(g); } // w75 (Owner): a lit button keeps its players on the board · a dark button keeps them off · every button dark (the default) is the full board
  else if(t.dataset.all){ WV_GROUPS.forEach(g=>draftUI.groups.add(g)); draftUI.teamFilter = null; } // w75 (Owner): ALL lights every button — the board is equally full
  else if(t.dataset.none){ draftUI.groups.clear(); } // w75 (Owner): CLEAR returns every button to off — the default full board
  renderDraftBoard2();
 });""")

# ---------------- R3 · the filter proxy: empty row = the full board (Owner P2) ----------------
rep(" const sel = draftUI.groups;\n",
    " const sel = draftUI.groups; const selShow = sel.size ? sel : new Set(WV_GROUPS); // w75 (Owner): every button off (the default) — the full board still shows\n")

rep("const gs = openG.filter(g=>sel.has(g)).sort((a,b)=>{ const x = DG_ORDER.indexOf(a), y = DG_ORDER.indexOf(b); return (x<0?99:x)-(y<0?99:y) || WV_GROUPS.indexOf(a)-WV_GROUPS.indexOf(b); });",
    "const gs = openG.filter(g=>selShow.has(g)).sort((a,b)=>{ const x = DG_ORDER.indexOf(a), y = DG_ORDER.indexOf(b); return (x<0?99:x)-(y<0?99:y) || WV_GROUPS.indexOf(a)-WV_GROUPS.indexOf(b); });")

rep("&& (posF!=='all' || sel.has(WV_TAG_GROUP[r.p[1]]))); // w33 (R15): the chip law holds on the cards too",
    "&& (posF!=='all' || selShow.has(WV_TAG_GROUP[r.p[1]]))); // w33 (R15): the chip law holds on the cards too (w75: the default full board rides selShow)")

rep("if(posF!=='all' ? WV_TAG_GROUP[r.p[1]]!==posF : (!sel.has(r.g) || !sel.has(WV_TAG_GROUP[r.p[1]]))) return; // w33 (R15, Owner): unhighlight a position and those players leave the board, even where they could flex",
    "if(posF!=='all' ? WV_TAG_GROUP[r.p[1]]!==posF : (!selShow.has(r.g) || !selShow.has(WV_TAG_GROUP[r.p[1]]))) return; // w33 (R15, Owner): unhighlight a position and those players leave the board, even where they could flex · w75: the default full board rides selShow")

rep("if(posF!=='all' ? tg!==posF : !sel.has(tg)) return;",
    "if(posF!=='all' ? tg!==posF : !selShow.has(tg)) return;")

# ---------------- R4 · ALL and CLEAR tell the truth again (Owner P2) ----------------
rep('<i class="zpb-fx-brk"></i><button type="button" class="zpb-srbtn zpb-srutil" data-all="1" title="Show every group"><b>ALL</b><i>show</i></button><button type="button" class="zpb-srbtn zpb-srutil" data-none="1" title="Clear the board"><b>CLEAR</b><i>hide</i></button>',
    '<i class="zpb-fx-brk"></i><button type="button" class="zpb-srbtn zpb-srutil" data-all="1" title="Every button on — the full board"><b>ALL</b><i>all on</i></button><button type="button" class="zpb-srbtn zpb-srutil" data-none="1" title="Every button off — the full board (the default)"><b>CLEAR</b><i>all off</i></button>')

# ---------------- R5 · the selected button is FILLED, in both modes (Owner P1) ----------------
rep(".zpb-srbtn.on{border-color:var(--accent);color:var(--text);box-shadow:0 0 9px var(--glow);}",
    ".zpb-srbtn.on{background:var(--accent);border-color:var(--accent);color:#2c1e0c;box-shadow:0 0 9px var(--glow);} /* w75 (Owner): selection is a filled button, not a border hint — unmistakable in light and dark */\n.zpb-srbtn.on b{color:#2c1e0c;}")
rep(".zpb-srbtn.on i{color:var(--accent2,var(--accent));}",
    ".zpb-srbtn.on i{color:#2c1e0c;opacity:.72;}")

# ---------------- R6 · SIM SEASON wears the neutral of its siblings (Owner P6) ----------------
rep("button.zpb-simseason{background:var(--panel);color:var(--sub);border:1px solid var(--border);box-shadow:none;opacity:1;}",
    "button.zpb-simseason{background:transparent;color:var(--sub);border:1px solid var(--glassbd);box-shadow:none;opacity:1;} /* w75 (Owner): SIM SEASON reads exactly like SIM GAME and SIM PLAYOFFS — never a white panel */")

# ---------------- R7 · the box score wears the score's border (Owner P8) ----------------
rep("table.linescore{border:1px solid var(--rosehair,var(--border));border-radius:12px;overflow:hidden;background:var(--panel2);}",
    "table.linescore{border:1px solid var(--accent);border-radius:12px;overflow:hidden;background:var(--panel2);} /* w75 (Owner): the box score wears the same line the score wears */")

# ---------------- R8 · the preseason dropdowns go plain, like the reference (Owner P3) ----------------
rep('<details class="zpb-dd"><summary>WHY THIS STYLE? (THE SIMPLE MATH)</summary>',
    '<details style="margin-top:12px;"><summary style="cursor:pointer;font-weight:700;">WHY THIS STYLE? (THE SIMPLE MATH)</summary>')
rep('<details class="zpb-dd"><summary>OFFENSE: EVERY STYLE WITH YOUR ROSTER</summary>',
    '<details style="margin-top:12px;"><summary style="cursor:pointer;font-weight:700;">OFFENSE: EVERY STYLE WITH YOUR ROSTER</summary>')
rep('<details class="zpb-dd"><summary>DEFENSE: EVERY STYLE WITH YOUR ROSTER</summary>',
    '<details style="margin-top:12px;"><summary style="cursor:pointer;font-weight:700;">DEFENSE: EVERY STYLE WITH YOUR ROSTER</summary>')
rep('<details class="zpb-dd" style="font-size:0.86rem;"><summary>HOW A 2-PT CONVERSION WORKS</summary>',
    '<details style="margin-top:12px;"><summary style="cursor:pointer;font-weight:700;">HOW A 2 POINT CONVERSION WORKS</summary>')

# ---------------- R9 · 2 point conversion, on the preseason page and in the guide (Owner P4) ----------------
rep('How bold are you on <b>2-Pt Conversions</b> and <b>4th downs</b>?',
    'How bold are you on <b>2 Point Conversions</b> and <b>4th downs</b>?')
rep("desc:'Kicks the extra point almost every time and takes the field goal on most 4th downs inside the 35. Fewer 2-Pt Conversions, a few more field goals, fewer touchdowns.'",
    "desc:'Kicks the extra point almost every time and takes the field goal on most 4th downs inside the 35. Fewer 2 Point Conversions, a few more field goals, fewer touchdowns.'")
rep("desc:'More 2-Pt Conversions, more touchdowns, fewer field goals, and a few more failed 4th downs.",
    "desc:'More 2 Point Conversions, more touchdowns, fewer field goals, and a few more failed 4th downs.")
rep("[\'2-Pt Conversion\',\'One play from the 2-yard line worth two points instead of the one-point kick.\']",
    "[\'2 Point Conversion\',\'One play from the 2-yard line worth two points instead of the one-point kick.\']")

# ---------------- R10 · the offense dropdown loses (x teams run it) (Owner P5) ----------------
rep("${capFirst(k)} (${cnt[k]||0} team${(cnt[k]||0)===1?'':'s'} run it)", "${capFirst(k)}")

# ---------------- R11 · the 0.60 preset — the award names deepen in light mode (Owner P9) ----------------
rep(" }catch(err){ return accD; } })();\n const txd=zpbMix('#f5e9dd',accD,0.14), sud=zpbMix('#c8a48f',accD,0.2);",
""" }catch(err){ return accD; } })();
 const txM60=(function(){ try{ // w75 (Owner): the 0.60 preset — a little more of the team's color in the light ink; the same 5:1 readability floor rides along
  const _base60 = (_txc && _txc.l<0.52) ? zpbFromHsl(_txc.h,_txc.s,0.52) : txL;
  const _m60=zpbMix('#53382b',_base60,0.6), _c60=zpbHsl(_m60);
  let _ink60=zpbFromHsl(_c60.h, Math.min(0.85,Math.max(0.22,_c60.s)), Math.min(0.52,Math.max(0.30,_c60.l)));
  try{ let _g60=0; while(_g60<9 && zpbContrast(_ink60,'#fcf7f1')<5){ const _c62=zpbHsl(_ink60); _ink60=zpbFromHsl(_c62.h,_c62.s,Math.max(0.24,_c62.l-0.02)); _g60++; } }catch(err){}
  return _ink60;
 }catch(err){ return txM; } })();
 const txd=zpbMix('#f5e9dd',accD,0.14), sud=zpbMix('#c8a48f',accD,0.2);""")

rep(" raw:[P,Q,R], accL,accD,acc2L,acc2D,acc3L,acc3D,\n  txL, txM, txMd, txd, sud, hairL, hairD,",
    " raw:[P,Q,R], accL,accD,acc2L,acc2D,acc3L,acc3D,\n  txL, txM, txM60, txMd, txd, sud, hairL, hairD,")

rep("';--tA2:'+(pk.txM||pk.accL)+';--tG2:'",
    "';--nm60:'+(pk.txM60||pk.txM||pk.accL)+';--tA2:'+(pk.txM||pk.accL)+';--tG2:'")

rep("const nl=(window.zpbLift?zpbLift(pk.txL,0.62):pk.txL), nd=pk.txd, nm=(pk.txM||nl);",
    "const nl=(window.zpbLift?zpbLift(pk.txL,0.62):pk.txL), nd=pk.txd, nm=(pk.txM||nl); const nm60=(pk.txM60||nm); // w75 (Owner): the 0.60 preset rides every neutral row")

rep("';--tA2:'+nm+';--tG2:'+nm+';--glo",
    "';--nm60:'+nm60+';--tA2:'+nm+';--tG2:'+nm+';--glo")

rep('.zpb-awcard .zpb-awname{color:var(--nm,var(--text));}\n:root[data-theme="light"] .zpb-awcard .zpb-awname{color:var(--nm,var(--text));}',
    '.zpb-awcard .zpb-awname{color:var(--nm60,var(--nm,var(--text)));}\n:root[data-theme="light"] .zpb-awcard .zpb-awname{color:var(--nm60,var(--nm,var(--text)));} /* w75 (Owner): the light ink wears the 0.60 team preset — the 0.50 law stays in dark */')

# ---------------- R12 · the rating scale — the display translation (Owner P12) ----------------
rep(" S.ratingsDirty = false; S._ratingsReady = true;",
""" { let _s=0,_n=0; Object.values(S.playerStats||{}).forEach(r=>{ if(r._rating!=null){ _s+=r._rating; _n++; } }); S._rtgMean = _n? (_s/_n) : 50; } // w75 (Owner): the scale anchor — the mean raw rating of the regular-season book
 S.ratingsDirty = false; S._ratingsReady = true;""")

rep_any([
  "  const rtg = r._rating!=null ? r._rating.toFixed(1) : '\u00b7';",
  "  const rtg = r._rating!=null ? r._rating.toFixed(1) : '\\u00b7';",
], "  const rtg = String(window.zpbDR(r)); // w75 (Owner): the rating rides the display scale — the average season reads the database's median OVR")

rep_any([
  '''<td class="score">${r._rating!=null?Math.round(r._rating):'\\u00b7'} <span class="narr">#${r._rank||'\u00b7'}</span></td>''',
  '''<td class="score">${r._rating!=null?Math.round(r._rating):'\u00b7'} <span class="narr">#${r._rank||'\u00b7'}</span></td>''',
], '<td class="score">${window.zpbDR(r)} <span class="narr">#${r._rank||\u0027\u00b7\u0027}</span></td>')

rep_any([
  '''>${r._rating!=null?Math.round(r._rating):'\\u00b7'}</td>${b.cols.map(''',
  '''>${r._rating!=null?Math.round(r._rating):'\u00b7'}</td>${b.cols.map(''',
], '>${window.zpbDR(r)}</td>${b.cols.map(')

rep('WHY BETTER OR WORSE THAN THE RATINGS?</summary><div style="margin-top:8px;">${parts.map(p=>`<p class="detail-item">${p}</p>`).join(\'\')}</div></details>',
    'WHY BETTER OR WORSE THAN THE RATINGS?</summary><div style="margin-top:8px;"><p class="detail-item">THE PERFORMANCE SCALE · an average season reads ${window.zpbMedianOvr?window.zpbMedianOvr():76} — the database\u2019s median OVR — and a rating under his OVR counts the points he fell short.</p>${parts.map(p=>`<p class="detail-item">${p}</p>`).join(\'\')}</div></details>')

# ---------------- R13 · the fills chip: x (-y), the word FLEX retires (Owner P16) ----------------
rep("const flexLbl = (s0,flex,pen)=> (LABELS[s0]||s0) + (flex ? ' (-'+pen+' FLEX)' : ''); // w66 (Owner): ONE label — \"FS (-10 FLEX)\" — the old \"FS Flex FS (-10)\" double-speak retires",
    "const flexLbl = (s0,flex,pen)=> (LABELS[s0]||s0) + (flex ? ' (-'+pen+')' : ''); // w75 (Owner): x (-y) — the penalty speaks for itself, the word FLEX retires from the fills")

# ---------------- R14 · OFFENSIVE GUARD, everywhere a name label speaks (Owner P15) ----------------
rep("OG:'Guard',C:'Center'", "OG:'Offensive Guard',C:'Center'")
rep("OG1:'Guard 1',OG2:'Guard 2'", "OG1:'Offensive Guard 1',OG2:'Offensive Guard 2'")
rep("OG1:'Guard 1', OG2:'Guard 2'", "OG1:'Offensive Guard 1', OG2:'Offensive Guard 2'")

# ---------------- R15 · the guide ladder shows every depth-chart slot (Owner P14) ----------------
rep("""window.zpbPosRankHTML = function(){
 if(typeof slotWins !== 'function') return '';
 const rows = (typeof ROSTER_SLOTS!=='undefined'?ROSTER_SLOTS:[]).map(s=>({s, w:((slotWins(s,90)-slotWins(s,70)))}))
   .filter(r=>r.w>0.001).sort((a,b)=>b.w-a.w);""",
"""window.zpbPosRankHTML = function(){
 if(typeof slotWins !== 'function') return '';
 const rows = (typeof ROSTER_SLOTS!=='undefined'?ROSTER_SLOTS:[]).map(s=>({s, w:((slotWins(s,90)-slotWins(s,70)))}))
   .sort((a,b)=>b.w-a.w); // w75 (Owner): every slot on the depth chart shows — TE3, DIME, WR4 and DL5 included, even at zero wins""")

# ---------------- R16 · SIM PLAYOFFS plays a cinematic page per round again (Owner P10) ----------------
rep("""window.zpbSimRestOfPlayoffs = function(){
 try{
  const S = seasonState; if(!S || S.phase!=='playoffs') return;
  const _user = seasonUserTeam();
  window.__zpbQuietSim = true; window.__zpbSimRestRun = true; // the during-the-game cinematic can never fire from this door
  try{
   const order = ['wildcard','divisional','champ','superbowl'];
   for(let i=order.indexOf(S.currentPlayoffRound); i<4; i++){
    if(!S.playoffRoundSimulated) simulatePlayoffRound();
    if(order[i]!=='superbowl') advancePlayoffRound();
   }
  }catch(err){}
  window.__zpbQuietSim = false;
  renderSeasonTab(document.getElementById('draftResultsBody') || document.body);
  if(window.__zpbSBFinPending && S.champion){
   window.__zpbSBFinPending = false;
   try{ zpbPostSuperBowlCine(); }catch(err){} // W68 (Owner): the Super Bowl page ends the run on every path
  }
  window.__zpbSimRestRun = false;
 }catch(err){ window.__zpbQuietSim = false; window.__zpbSimRestRun = false; }
};""",
"""window.zpbSimRestOfPlayoffs = function(){
 try{
  const S = seasonState; if(!S || S.phase!=='playoffs') return;
  const _user = seasonUserTeam();
  const _story = [];
  window.__zpbQuietSim = true; window.__zpbSimRestRun = true; // the during-the-game cinematic can never fire from this door
  window.__zpbPoRunHold = true; // w75 (Owner): the per-round cinematics are back on this door — the storm waits for the last Continue
  try{
   const order = ['wildcard','divisional','champ','superbowl'];
   for(let i=order.indexOf(S.currentPlayoffRound); i<4; i++){
    if(!S.playoffRoundSimulated) simulatePlayoffRound();
    if(order[i]!=='superbowl'){
     const g = (S.playoffRounds[order[i]]||[]).find(x=>x.home===_user||x.away===_user);
     if(g && g.result){
      const homeWin = g.result.homeScore>=g.result.awayScore;
      const won = g.home===_user ? homeWin : !homeWin;
      _story.push({rk:order[i], win:won, fs:(g.home===_user?g.result.homeScore:g.result.awayScore), os:(g.home===_user?g.result.awayScore:g.result.homeScore), opp:(g.home===_user?g.away:g.home)}); // w75 (Owner): one cinematic page per round the user's team plays
     }
     advancePlayoffRound();
    }
   }
  }catch(err){}
  window.__zpbQuietSim = false;
  renderSeasonTab(document.getElementById('draftResultsBody') || document.body);
  if(_story.length && typeof window.zpbPlayoffRunCine==='function'){ window.zpbPlayoffRunCine(_story); } // w75 (Owner): the round cards play first — the finish gate hands the screen to the Super Bowl page
  else {
   window.__zpbPoRunHold = false;
   if(window.__zpbSBFinPending && S.champion){
    window.__zpbSBFinPending = false;
    try{ zpbPostSuperBowlCine(); }catch(err){} // W68 (Owner): the Super Bowl page ends the run on every path
   }
  }
  window.__zpbSimRestRun = false;
 }catch(err){ window.__zpbQuietSim = false; window.__zpbSimRestRun = false; window.__zpbPoRunHold = false; }
};""")

# ---------------- R17 · the fix-it board becomes DRAFT COMMAND CENTER (Owner P11) ----------------
rep("""// ---- w73 (Owner): THE FIX-IT BOARD — one panel of what to do better next time, told visually ----
// Section A · the three rooms furthest under the league line, drawn as drain gauges (the fill runs
// from the league tick). Section B · the three weakest contributor seasons, each a card with two bars
// on one scale — the OVR he arrived with vs the season tape he gave; the shortfall hatches. A card
// whose room is on the fix list wears the rose edge, so the fix points at the room, not just the man.""",
"""// ---- w75 (Owner): DRAFT COMMAND CENTER — the fix-it board, rebuilt to the Owner's round ----
// Section A · EVERY room below a B on the roster, best to worst, in the report card's own cards
// (smaller, no gauge). Section B · CUTDOWN DAY — every player under all three lines (below 80 OVR,
// kicker or higher on the win math, a season under the average line on the new scale), each wearing
// the pulsing CUT badge and the count of points he fell short of his own OVR.""")

START = src.index('window.zpbFixBoardHTML = function(){')
END_MARK = " }catch(err){ return ''; }\n};"
end = src.index(END_MARK, START) + len(END_MARK)
old_fn = src[START:end]
assert 'THE FIX-IT BOARD' in old_fn and 'zpb-fx-room' in old_fn and len(old_fn) < 16000, 'fix-board extraction went wrong'

NEW_FN = r"""window.zpbFixBoardHTML = function(){
 try{
  const user = seasonUserTeam(), S = seasonState;
  const R = S.unitRatings && S.unitRatings[user], rk = S.unitRanks && S.unitRanks[user];
  if(!R || !rk) return '';
  const pk = (typeof zpbPackFor==='function') ? zpbPackFor(user) : null;
  const uv = pk ? '--zrb:'+pk.accL+';--zr1:'+pk.r1+';--zrd:'+pk.accD+';' : '';
  // ---- section A · every room below a B, best to worst, in the report card's own cards (smaller) ----
  const UNITS = ['qb','rb','rec','olRun','olPass','passRush','frontRun','coverage','kicker'];
  const tape = u=>{ // the season proof behind the grade — tooltip only, the small cards stay clean
   try{
    const T = teamSeasonTotals(), t0 = T[user], gp = Math.max(1, t0.g||0), mine = teamPlayerStats(user);
    if(u==='olPass') return t0.skTaken+' sacks allowed · '+Math.round(t0.pass/gp)+' pass yds/gm';
    if(u==='olRun') return Math.round(t0.rush/gp)+' rush yds/gm';
    if(u==='rb'){ const b = mine.filter(r=>r.group==='RB'); return fmtN(b.reduce((a,r)=>a+(r.st.rushYds||0),0))+' rush yds'; }
    if(u==='qb') return Math.round(t0.pass/gp)+' pass yds/gm';
    if(u==='rec'){ const b = mine.filter(r=>r.group==='WR'||r.group==='TE'); return fmtN(b.reduce((a,r)=>a+(r.st.recYds||0),0))+' rec yds'; }
    if(u==='passRush') return t0.skForced+' sacks';
    if(u==='frontRun') return Math.round(t0.rushA/gp)+' rush yds allowed/gm';
    if(u==='coverage') return Math.round(t0.passA/gp)+' pass yds allowed/gm · '+t0.take+' takeaways';
    if(u==='kicker'){ const k = mine.find(r=>r.group==='K'); return k ? (k.st.fg||0)+' of '+(k.st.fga||0)+' FG' : '\u00b7'; }
   }catch(e){}
   return '\u00b7';
  };
  const pctOf = u=>((32-(rk[u]||32))/31)*100;
  const rooms = UNITS.map(u=>({u, label:UNIT_INFO[u].label, ovr:Math.round(R[u]||0), rank:rk[u]||32, pct:pctOf(u)}))
   .filter(x=>x.pct<60) // w75 (Owner): EVERY room below a B on the roster
   .sort((a,b)=> b.pct-a.pct); // best to worst
  const roomCards = rooms.map(x=>{
   const lg = (typeof letterGrade==='function') ? letterGrade(x.pct) : '';
   return '<div class="zpb-fx-mini" title="'+x.label+' · '+x.ovr+' OVR · #'+x.rank+' in the league · the tape says '+tape(x.u)+'">'
    + '<span class="zpb-rc-grade">'+lg+'</span>'
    + '<span class="zpb-fx-minibody"><b>'+x.label+'</b>'
    + '<i>'+x.ovr+' OVR · #'+x.rank+'</i></span></div>';
  }).join('');
  // ---- section B · CUTDOWN DAY — every player under all three lines, recommended to CUT ----
  const med = (window.zpbMedianOvr ? zpbMedianOvr() : 76);
  const games = (()=>{ try{ return (teamSeasonTotals()[user]||{}).g || 0; }catch(e){ return 0; } })();
  const floor = Math.max(3, Math.round(games*0.4));
  const ladder = (typeof slotWins==='function') ? ROSTER_SLOTS.map(s=>({s, w:(slotWins(s,90)-slotWins(s,70))})).sort((a,b)=>b.w-a.w) : [];
  const lidx = {}; ladder.forEach((x,i)=>{ lidx[x.s]=i; });
  const kLine = (lidx.K!=null) ? lidx.K : ladder.length; // KICKER OR HIGHER on the position rankings win math
  const GROUP_SLOTS = {QB:['QB'],RB:['RB1','RB2','FB'],WR:['WR1','WR2','WR3','WR4'],TE:['TE1','TE2','TE3'],OL:['OT1','OT2','OG1','OG2','C'],DL:['DE1','DE2','DT1','DT2','DL5'],LB:['MIKE','WILL','SAM'],DB:['CB1','CB2','CB3','CB4','SS','FS'],K:['K','P']};
  const qualifies = r=>{ // the position he played, read on the win math
   if(r.slot && lidx[r.slot]!=null) return lidx[r.slot] <= kLine;
   const cands = GROUP_SLOTS[r.group]; if(!cands) return false;
   return cands.some(s=>lidx[s]!=null && lidx[s] <= kLine);
  };
  const mine = (typeof teamPlayerStats==='function') ? teamPlayerStats(user).filter(r=>r.gp>=floor && (r.ovr||0)>0) : [];
  const cuts = mine
   .map(r=>({r, ovr:Math.round(r.ovr||0), perf:(window.zpbDispRating ? zpbDispRating(r) : null)}))
   .filter(x=> x.ovr<80 && x.perf!=null && x.perf<med && qualifies(x.r)); // w75 (Owner): all three lines, every player who sits under them
  const trueOvr = n=>{ try{ const t = window.zpbTrueOvr ? zpbTrueOvr(n) : null; return (t!=null) ? Math.round(t) : null; }catch(e){ return null; } };
  const ROOM_GROUPS = {qb:['QB'],rb:['RB'],rec:['WR','TE'],olRun:['OL'],olPass:['OL'],passRush:['DL'],frontRun:['DL','LB'],coverage:['DB'],kicker:['K']};
  const cards = cuts.map(x=>{
   const r = x.r, tO = trueOvr(r.name), shownOvr = (tO!=null) ? tO : x.ovr;
   if(shownOvr>=80) return ''; // the true-OVR law — a name that reads 80+ never lands on cutdown day
   const star90 = shownOvr>=90, star85 = shownOvr>=85;
   const delta = x.perf - shownOvr;
   const groups = ROOM_GROUPS[r.group]||[];
   const inRoom = rooms.some(rm=>groups.indexOf(rm.u)>=0);
   return '<div class="zpb-fx-cutcard'+(inRoom?' zpb-fx-weak':'')+'"'+(inRoom?' title="His room is on the fix list — lift the room, lift him"':'')+'>'
    + '<div class="zpb-fx-hd"><b class="'+(star90?'zpb-shm':(star85?'zpb-vib':''))+'">'+r.name+'</b>'
    + '<span class="zpb-fx-meta"><span class="zpb-fx-pos">'+(LABELS[r.slot]||r.group||'')+'</span></span></div>'
    + '<div class="zpb-fx-cutdown"><span class="zpb-fx-num">'+x.perf+'</span><i>PERFORMANCE</i>'
    + '<span class="zpb-fx-gapnum">'+(delta<0?'\u2212':(delta>0?'+':'\u00b1'))+Math.abs(delta)+' vs his '+shownOvr+' OVR</span>'
    + '<span class="zpb-fx-cut">CUT</span></div>'
    + '</div>';
  }).join('');
  return '<div class="panel zpb-fx-board" style="'+uv+'margin-bottom:14px;">'
   + '<div class="zpb-rc-title">DRAFT COMMAND CENTER</div>'
   + (rooms.length ? '<div class="zpb-fx-sec">EVERY ROOM BELOW A B · BEST TO WORST</div><div class="zpb-fx-minis">'+roomCards+'</div>' : '<div class="zpb-fx-sec">EVERY ROOM AT A B OR BETTER</div>')
   + '<div class="zpb-fx-sec">CUTDOWN DAY · THE LINE IS THE AVERAGE SEASON ('+med+') · BELOW 80 OVR · KICKER OR HIGHER ON THE WIN MATH</div>'
   + (cards.trim() ? '<div class="zpb-fx-cutgrid">'+cards+'</div>' : '<div class="zpb-fx-none">NOBODY FALLS UNDER ALL THREE LINES</div>')
   + '<div class="zpb-fx-foot">THE NEXT DRAFT IS WHERE YOU FIX THIS</div>'
   + '</div>';
 }catch(err){ return ''; }
};"""
src = src[:START] + NEW_FN + src[end:]

open(OUT, 'w', encoding='utf-8').write(src)
md5 = hashlib.md5(src.encode()).hexdigest()
print('w75 stage-1 written ·', len(src.encode()), 'bytes · md5', md5)
