#!/usr/bin/env python3
# zpb_w73.py — wave 73 · build from the pristine w70 baseline (79c4a934969d04e17f357e26ec6740e2)
# Pattern law (§5.2): asserted exact replacements + payloads + post-checks. Never hand-edit the product.
import hashlib, subprocess, sys, os

BASE = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'baseline-w70.html')
OUT  = os.path.join(os.path.dirname(__file__), '..', '..', 'Football-Sim-Z-post-blue-w73.html')

src = open(os.path.abspath(BASE), encoding='utf-8').read()
md5_base = hashlib.md5(src.encode()).hexdigest()
assert md5_base == '79c4a934969d04e17f357e26ec6740e2', 'baseline md5 drifted: ' + md5_base

def rep(old, new, n=1):
    global src
    c = src.count(old)
    assert c == n, 'anchor count %d (want %d) for: %s' % (c, n, old[:90])
    src = src.replace(old, new)

# ---------------- R1 · the positions dropdown reads the depth chart (Owner P1) ----------------
rep("{ const pf = document.getElementById('draftPosFilter2'); WV_GROUPS.forEach(g=>{ const o = document.createElement('option'); o.value = g; o.textContent = WV_NAMES[g]; pf.appendChild(o); }); }",
    "{ const pf = document.getElementById('draftPosFilter2'); const WV_MENU = ['QB','RB','WR','TE','OT','OG','C','EDGE','DT','LB','CB','FS','SS','K']; WV_MENU.forEach(g=>{ const o = document.createElement('option'); o.value = g; o.textContent = WV_NAMES[g]; pf.appendChild(o); }); } // w73 (Owner): the dropdown reads the depth chart's order — each group once (TE, never TE2/TE3)")

# ---------------- R2 · soloBase memory on draftUI (Owner P2) ----------------
rep("function newDraftUI(){ return {groups:new Set(WV_GROUPS), prio:{}, rosterView:'depth', sim:null, slotPick:{}, teamFilter:null, showAll:false}; }",
    "function newDraftUI(){ return {groups:new Set(WV_GROUPS), prio:{}, rosterView:'depth', sim:null, slotPick:{}, teamFilter:null, showAll:false, soloBase:null}; } // w73 (Owner): soloBase remembers where a one-group highlight came from — ALL or CLEAR")

# ---------------- R3 · the chip row state machine (Owner P2) ----------------
rep(""" document.getElementById('draftChips').addEventListener('click', e=>{
  const t = e.target.closest('[data-tog],[data-all],[data-none]'); if(!t || !draftSim) return;
  if(t.dataset.tog){ const g = t.dataset.tog; if(draftUI.groups.has(g)) draftUI.groups.delete(g); else draftUI.groups.add(g); }
  else if(t.dataset.all){ WV_GROUPS.forEach(g=>draftUI.groups.add(g)); draftUI.teamFilter = null; }
  else if(t.dataset.none){ draftUI.groups.clear(); }
  renderDraftBoard2();
 });""",
""" document.getElementById('draftChips').addEventListener('click', e=>{
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
 });""")

# ---------------- R3b · ALL and CLEAR take their own line (Owner P3: the break is the separation) ----------------
rep('ch += `<button type="button" class="zpb-srbtn zpb-srutil" data-all="1" title="Show every group">',
    'ch += `<i class="zpb-fx-brk"></i><button type="button" class="zpb-srbtn zpb-srutil" data-all="1" title="Show every group">')

# ---------------- R4 · ALL and CLEAR set apart and reshaped (Owner P3) ----------------
rep(".zpb-srbtn.zpb-srutil{min-width:58px;}",
""".zpb-srbtn.zpb-srutil{min-width:58px;} /* w73 (Owner): ALL and CLEAR read as a different kind of button — set apart, reshaped, quieter */
.zpb-srbtn.zpb-srutil{border-radius:999px;padding:3px 12px;background:transparent;}
.zpb-fx-brk{flex-basis:100%;height:0;margin:0;padding:0;border:0;}
.zpb-srbtn.zpb-srutil + .zpb-srbtn.zpb-srutil{margin-left:5px;}
.zpb-srbtn.zpb-srutil b{letter-spacing:.12em;}
.zpb-srbtn.zpb-srutil:hover{background:var(--panel2);}""")

# ---------------- R5 · the fix-it board joins the shared review body (Owner P4) ----------------
rep(""" html += `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">${user}</h3>${zpbMetricsHTML()}</div>`;
 html += renderPlayoffAwardsHTML(seasonState.awardsPO)""",
""" html += `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">${user}</h3>${zpbMetricsHTML()}</div>`;
 html += zpbFixBoardHTML(); // w73 (Owner): the fix-it board — the rooms below the line and the seasons that hurt, told in bars not paragraphs
 html += renderPlayoffAwardsHTML(seasonState.awardsPO)""")

# ---------------- R6 · the fix-it board generator ----------------
rep("""  return '<div class="zpb-rc-title">UNIT REPORT CARD</div><div class="zpb-rcgrid">'+tiles+'</div>';
 }catch(err){ return ''; }
};
 // w32 (Owner): the hover wiring retired with the tiles""",
"""  return '<div class="zpb-rc-title">UNIT REPORT CARD</div><div class="zpb-rcgrid">'+tiles+'</div>';
 }catch(err){ return ''; }
};
 // w32 (Owner): the hover wiring retired with the tiles

// ---- w73 (Owner): THE FIX-IT BOARD — one panel of what to do better next time, told visually ----
// Section A · the three rooms furthest under the league line, drawn as drain gauges (the fill runs
// from the league tick). Section B · the three weakest contributor seasons, each a card with two bars
// on one scale — the OVR he arrived with vs the season tape he gave; the shortfall hatches. A card
// whose room is on the fix list wears the rose edge, so the fix points at the room, not just the man.
window.zpbFixBoardHTML = function(){
 try{
  const user = seasonUserTeam(), S = seasonState;
  const R = S.unitRatings && S.unitRatings[user], rk = S.unitRanks && S.unitRanks[user];
  if(!R || !rk) return '';
  const pk = (typeof zpbPackFor==='function') ? zpbPackFor(user) : null;
  const uv = pk ? '--zrb:'+pk.accL+';--zr1:'+pk.r1+';--zrd:'+pk.accD+';' : '';
  const roomFill = pk ? pk.accL : 'var(--accent)';
  // ---- section A · the rooms below the line ----
  const UNITS = ['qb','rb','rec','olRun','olPass','passRush','frontRun','coverage','kicker'];
  const rooms = UNITS.map(u=>({u, label:UNIT_INFO[u].label, ovr:Math.round(R[u]||0), rank:rk[u]||32, diff:Math.round((R[u]||0)-((S.league&&S.league[u])||R[u]||0))}))
   .sort((a,b)=> a.diff-b.diff || b.rank-a.rank).slice(0,3);
  const tape = u=>{ // the season proof behind the grade — tooltip only, the gauge stays clean
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
    if(u==='kicker'){ const k = mine.find(r=>r.group==='K'); return k ? (k.st.fg||0)+' of '+(k.st.fga||0)+' FG' : '\\u00b7'; }
   }catch(e){}
   return '\\u00b7';
  };
  const gradeOf = u=>{ const pct = ((32-(rk[u]||32))/31)*100; return (typeof letterGrade==='function') ? letterGrade(pct) : ''; };
  const roomRows = rooms.map(x=>{
   const under = x.diff < 0, w = Math.min(Math.abs(x.diff)/8,1)*50;
   const fill = under ? '<i class="zpb-fx-drain" style="right:50%;width:'+w.toFixed(1)+'%;"></i>'
                      : '<i class="zpb-fx-gain" style="left:50%;width:'+w.toFixed(1)+'%;"></i>';
   return '<div class="zpb-fx-room" title="'+x.label+' · '+x.ovr+' OVR · #'+x.rank+' in the league · the tape says '+tape(x.u)+'">'
    + '<div class="zpb-fx-roomhd"><b>'+x.label+'</b><i>'+x.ovr+' OVR · #'+x.rank+'</i></div>'
    + '<div class="zpb-fx-track">'+fill+'<i class="zpb-fx-mid"></i></div>'
    + '<span class="zpb-fx-grade">'+gradeOf(x.u)+'</span></div>';
  }).join('');
  // ---- section B · the seasons that hurt most (OVR and the season tape, blended evenly) ----
  const games = (()=>{ try{ return (teamSeasonTotals()[user]||{}).g || 0; }catch(e){ return 0; } })();
  const floor = Math.max(3, Math.round(games*0.4));
  const WEAK = {}; // the fix-list rooms, in stat-book group language, so a card can point back at its room
  rooms.forEach(x=>{
   if(x.u==='qb') WEAK.QB = true;
   else if(x.u==='rb') WEAK.RB = true;
   else if(x.u==='rec'){ WEAK.WR = true; WEAK.TE = true; }
   else if(x.u==='olRun'||x.u==='olPass') WEAK.OL = true;
   else if(x.u==='passRush') WEAK.DL = true;
   else if(x.u==='frontRun'){ WEAK.DL = true; WEAK.LB = true; }
   else if(x.u==='coverage') WEAK.DB = true;
   else if(x.u==='kicker') WEAK.K = true;
  });
  const mine = (typeof teamPlayerStats==='function') ? teamPlayerStats(user).filter(r=>r.gp>=floor && (r.ovr||0)>0) : [];
  const worst = mine.map(r=>({r, ovr:Math.round(r.ovr||0), perf:Math.round(r._rating!=null?r._rating:(r.ovr||0))}))
   .map(x=>Object.assign({}, x, {score:(x.ovr+x.perf)/2}))
   .sort((a,b)=> a.score-b.score || a.ovr-b.ovr).slice(0,3);
  const trueOvr = n=>{ try{ const t = window.zpbTrueOvr ? zpbTrueOvr(n) : null; return (t!=null) ? Math.round(t) : null; }catch(e){ return null; } };
  const cards = worst.map(x=>{
   const r = x.r, tO = trueOvr(r.name), shownOvr = (tO!=null) ? tO : x.ovr;
   const star90 = shownOvr>=90, star85 = shownOvr>=85;
   const perfW = Math.max(2, Math.min(100, x.perf)), ovrW = Math.max(2, Math.min(100, shownOvr));
   const gapW = Math.max(0, ovrW-perfW), delta = x.perf-shownOvr, inRoom = !!WEAK[r.group];
   return '<div class="zpb-fx-card'+(inRoom?' zpb-fx-weak':'')+'"'+(inRoom?' title="His room is on the fix list — lift the room, lift him"':'')+'>'
    + '<div class="zpb-fx-hd"><b class="'+(star90?'zpb-shm':(star85?'zpb-vib':''))+'">'+r.name+'</b>'
    + '<span class="zpb-fx-meta"><span class="zpb-fx-pos">'+(LABELS[r.slot]||r.group||'')+'</span>'+(inRoom?'<span class="zpb-fx-tag">FIX THE ROOM</span>':'')+'</span></div>'
    + '<div class="zpb-fx-bars">'
    + '<div class="zpb-fx-bar"><em>OVR</em><span class="zpb-fx-fill"><i style="width:'+ovrW+'%;background:'+roomFill+';"></i></span><u>'+shownOvr+'</u></div>'
    + '<div class="zpb-fx-bar"><em>SEASON</em><span class="zpb-fx-fill"><i style="width:'+perfW+'%;background:var(--sub);opacity:.8;"></i>'+(gapW>0?'<i class="zpb-fx-gap" style="left:'+perfW+'%;width:'+gapW+'%;"></i>':'')+'</span><u>'+x.perf+'</u></div>'
    + '</div>'
    + '<div class="zpb-fx-delta'+(delta<0?' bad':' good')+'">'+(delta<0?'\\u2212':'+')+Math.abs(delta)+' <i>vs the OVR he arrived with</i></div>'
    + '</div>';
  }).join('');
  if(!rooms.length && !worst.length) return '';
  return '<div class="panel zpb-fx-board" style="'+uv+'margin-bottom:14px;">'
   + '<div class="zpb-rc-title">THE FIX-IT BOARD</div>'
   + '<div class="zpb-fx-sub">what this roster could have done better — the rooms under the line, and the players who lift them</div>'
   + (rooms.length ? '<div class="zpb-fx-sec">THE ROOMS BELOW THE LINE · the fill runs from the league tick</div><div class="zpb-fx-rooms">'+roomRows+'</div>' : '')
   + (worst.length ? '<div class="zpb-fx-sec">THE SEASONS THAT HURT MOST · OVR and the season tape blended</div><div class="zpb-fx-cards">'+cards+'</div>' : '')
   + '<div class="zpb-fx-foot">THE NEXT DRAFT IS WHERE YOU FIX THIS</div>'
   + '</div>';
 }catch(err){ return ''; }
};""")

# ---------------- R7 · the fix-it board CSS ----------------
rep(".zpb-rc-body i{font-style:normal;font-size:.68rem;color:var(--sub);}",
""".zpb-rc-body i{font-style:normal;font-size:.68rem;color:var(--sub);}
/* 7c) the fix-it board (w73): drain gauges for the rooms, two-bar cards for the seasons */
.zpb-fx-sub{text-align:center;font-size:.78rem;color:var(--sub);margin:0 0 4px;}
.zpb-fx-sec{font-size:.6rem;font-weight:800;letter-spacing:.14em;color:var(--sub);text-transform:uppercase;margin:14px 0 8px;}
.zpb-fx-room{display:flex;align-items:center;gap:12px;padding:7px 0;}
.zpb-fx-room + .zpb-fx-room{border-top:1px dashed var(--border);}
.zpb-fx-roomhd{width:190px;min-width:150px;display:flex;flex-direction:column;gap:2px;}
.zpb-fx-roomhd b{font-size:.82rem;}
.zpb-fx-roomhd i{font-style:normal;font-size:.62rem;color:var(--sub);}
.zpb-fx-track{flex:1;height:10px;border-radius:6px;background:var(--panel2);border:1px solid var(--border);position:relative;overflow:hidden;min-width:80px;}
.zpb-fx-mid{position:absolute;left:50%;top:-1px;bottom:-1px;width:1px;background:var(--sub);opacity:.55;}
.zpb-fx-drain,.zpb-fx-gain{position:absolute;top:0;bottom:0;}
.zpb-fx-drain{background:linear-gradient(270deg,var(--bad,var(--accent2)),color-mix(in srgb,var(--bad,var(--accent2)) 45%,transparent));}
.zpb-fx-gain{background:linear-gradient(90deg,var(--good,var(--accent)),color-mix(in srgb,var(--good,var(--accent)) 45%,transparent));}
.zpb-fx-grade{font-family:'Cinzel Decorative',serif;font-weight:900;font-size:1.15rem;min-width:2.2ch;text-align:center;color:var(--bad,var(--accent2));}
.zpb-fx-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(225px,1fr));gap:10px;}
.zpb-fx-card{position:relative;display:flex;flex-direction:column;gap:8px;border:1px solid var(--border);border-left:3px solid var(--border);border-radius:14px;background:var(--panel2);padding:10px 12px;}
.zpb-fx-card.zpb-fx-weak{border-left-color:var(--bad,var(--accent2));}
.zpb-fx-tag{font-size:.5rem;font-weight:800;letter-spacing:.12em;color:var(--bad,var(--accent2));}
.zpb-fx-hd{display:block;min-width:0;}
.zpb-fx-hd b{display:block;font-size:.86rem;line-height:1.25;} /* w55 law · the name leads its own line, whole */
.zpb-fx-meta{display:flex;gap:7px;align-items:center;margin-top:4px;flex-wrap:wrap;}
.zpb-fx-pos{font-size:.62rem;font-weight:800;letter-spacing:.08em;color:var(--zrb,var(--accent));background:var(--zr1,rgba(201,162,75,.12));border:1px solid var(--border);border-radius:999px;padding:1px 8px;flex:none;}
.zpb-fx-bars{display:flex;flex-direction:column;gap:5px;}
.zpb-fx-bar{display:flex;align-items:center;gap:7px;}
.zpb-fx-bar em{font-style:normal;font-size:.52rem;font-weight:800;letter-spacing:.1em;color:var(--sub);width:44px;flex:none;text-align:right;}
.zpb-fx-fill{flex:1;height:7px;border-radius:4px;background:var(--panel);border:1px solid var(--border);position:relative;overflow:hidden;min-width:60px;}
.zpb-fx-fill i{position:absolute;left:0;top:0;bottom:0;border-radius:4px;}
.zpb-fx-gap{position:absolute;top:0;bottom:0;background:repeating-linear-gradient(45deg,color-mix(in srgb,var(--bad,var(--accent2)) 40%,transparent) 0 4px,transparent 4px 8px);}
.zpb-fx-bar u{text-decoration:none;font-size:.62rem;color:var(--sub);min-width:2.4ch;}
.zpb-fx-delta{font-weight:800;font-size:.92rem;}
.zpb-fx-delta.bad{color:var(--bad,var(--accent2));}
.zpb-fx-delta.good{color:var(--good,var(--accent));}
.zpb-fx-delta i{font-style:normal;font-weight:400;font-size:.62rem;color:var(--sub);}
.zpb-fx-foot{text-align:center;font-family:'Cinzel Decorative',serif;font-weight:800;letter-spacing:.18em;font-size:.72rem;color:var(--tA2,var(--gold3));margin-top:16px;}
@media (max-width:640px){ .zpb-fx-roomhd{width:122px;min-width:104px;} .zpb-fx-room{gap:8px;} }""")

# ---------------- post-checks ----------------
out = os.path.abspath(OUT)
open(out, 'w', encoding='utf-8').write(src)
md5 = hashlib.md5(src.encode()).hexdigest()
size = len(src.encode())
print('w73 written ·', size, 'bytes · md5', md5)
assert 'zpbFixBoardHTML' in src and src.count('zpbFixBoardHTML') == 2, 'fix board call+def'
assert "WV_MENU = ['QB','RB','WR','TE','OT','OG','C','EDGE','DT','LB','CB','FS','SS','K']" in src
assert src.count('soloBase') >= 8
assert 'THE FIX-IT BOARD' in src and 'THE NEXT DRAFT IS WHERE YOU FIX THIS' in src
assert '"".zpb-srbtn' not in src and '".zpb-srbtn' not in src, 'stray quote before the util CSS'
assert '.zpb-srbtn.zpb-srutil{border-radius:999px;padding:3px 12px;background:transparent;}' in src
assert src.count('zpb-fx-brk') == 2, 'the break rides the row and the sheet'
# quote sanity per style block: an unterminated CSS string would swallow the cascade
import re as _re
for _i, _s in enumerate(_re.findall(r'<style[^>]*>(.*?)</style>', src, _re.S)):
    _q = _s.count('"') - _s.count('\\"')
    assert _q % 2 == 0, 'style block %d has an odd number of double quotes (%d)' % (_i, _q)

# every script block must still parse
import re
blocks = re.findall(r'<script>(.*?)</script>', src, re.S)
print('script blocks:', len(blocks))
os.makedirs('/tmp/w73check', exist_ok=True)
fails = 0
for i, b in enumerate(blocks):
    p = '/tmp/w73check/b%d.js' % i
    open(p, 'w', encoding='utf-8').write(b)
    r = subprocess.run(['node', '--check', p], capture_output=True, text=True)
    if r.returncode != 0:
        fails += 1
        print('BLOCK', i, 'FAILS:', r.stderr[:400])
assert fails == 0, '%d script blocks fail syntax' % fails
print('ALL SCRIPT BLOCKS PARSE ✓')
