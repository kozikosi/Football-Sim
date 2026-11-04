#!/usr/bin/env python3
"""Z-post-blue WAVE 17 build module — Owner round 11 (26 Oct).

Dime joins the position list PURELY VISUALLY (Owner: "YOU ARE NOT RECALCULATING THE MATH
IN THE ENGINE. THIS IS PURELY VISUAL FOR NOW"):
  W17-1  Guide flex section redesigned into the Owner's category position board
         (awards-badge language): DEFENDS THE PASS / PRESSURES THE QB / STOPS THE RUN +
         offense + kicking; 18 position cards (incl. Nickel / Dime), each card carries the
         position's flex chips, hover/focus shows the job (no sentences visible on screen).
  W17-2  Updated flex chart v3 verbatim: RB -6 TE (not S); WR/TE gain NICKEL, DIME;
         DE -4 MIKE, ILB, FB (FB restored) and -6 TE, RB, NICKEL; MIKE -6 gains NICKEL, DIME;
         OLB -4 DE, NICKEL and -6 gains DIME; SS/FS FREE NICKEL, DIME; CB FREE FS, NICKEL, DIME;
         PUNTER -2 K (was -4).
  W17-3  Dime visible in ALL depth charts + rosters, display-only: renderDepthChartHTML
         (Your Full Depth Chart, Roster as drafted), the draft-sidebar depth panel, and both
         lineup-comparison renderers (real teams show their CB4 dimeback; drafted rosters show
         the roster's 4th-best CB). Engine untouched: ROSTER_SLOTS stays 28, DEPTH_CHART_GROUPS
         unchanged (it feeds the interactive lineup), slotWins/flexPenaltyFor/effOvr pinned.
  W17-4  Field map gains the DIME station + legend; glossary gains the Owner's Dime sentence;
         ZPB_FULL gains DIME."""

import sys, hashlib

SRC = '/home/z/my-project/build_w16.html'
OUT = '/home/z/my-project/build_w17.html'
SRC_MD5 = 'c0b449de7e1288fac4b358fdce7f1f85'          # wave 16

html = open(SRC, encoding='utf-8').read()
fails = []

got = hashlib.md5(html.encode()).hexdigest()
if got != SRC_MD5:
    fails.append(f'source md5 {got} != wave-16 pin {SRC_MD5}')

def rep(label, old, new, cnt=1):
    global html
    n = html.count(old)
    if n != cnt:
        fails.append(f'{label}: found {n}x, expected {cnt}')
        return
    html = html.replace(old, new)

def span_replace(label, start_anchor, end_anchor, new):
    """Replace [start_anchor .. end_anchor) keeping end. Both anchors unique."""
    global html
    i = html.find(start_anchor)
    if i < 0 or html.find(start_anchor, i + 1) >= 0:
        fails.append(f'{label}: start anchor not unique'); return
    j = html.find(end_anchor, i + len(start_anchor))
    if j < 0 or html.find(end_anchor, j + 1) >= 0:
        fails.append(f'{label}: end anchor not unique after start'); return
    html = html[:i] + new + html[j:]

# ============ W17-A · CSS: position board + tooltips + Dime depth rows ============

rep('W17-A1 board CSS',
""".zpb-flextree ul li{margin:3px 0;}""",
""".zpb-flextree ul li{margin:3px 0;}
/* W17: the position board — categories -> cards (awards-badge language), chips cascade gold->wine */
.zpb-posboard{display:flex;flex-direction:column;gap:14px;margin-top:10px;}
.zpb-poscat-h{font-size:.62rem;font-weight:800;letter-spacing:.14em;color:var(--sub);text-transform:uppercase;margin:0 0 6px;}
.zpb-poscards{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;}
.zpb-poscard{position:relative;background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:9px 11px;cursor:default;outline:none;}
.zpb-poscard:hover,.zpb-poscard:focus-within{border-color:var(--gold3,var(--border));}
.zpb-poscard .zpb-posname{font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif;font-size:.8rem;color:var(--tA2,var(--gold3));display:block;margin-bottom:6px;}
.zpb-poscard .zpb-ftchip{margin:2px 4px 0 0;}
.zpb-postip{position:absolute;left:8px;right:8px;top:calc(100% + 6px);z-index:40;background:var(--panel);border:1px solid var(--gold3,var(--border));border-radius:8px;padding:8px 10px;font-size:.72rem;line-height:1.45;color:var(--text);box-shadow:0 8px 22px rgba(0,0,0,.5);opacity:0;pointer-events:none;transform:translateY(-3px);transition:opacity .18s ease,transform .18s ease;}
.zpb-poscard:hover .zpb-postip,.zpb-poscard:focus-within .zpb-postip{opacity:1;transform:translateY(0);}
/* W17: depth charts redesigned — slot names read as chips; the Dime package row is dashed gold */
.depth-row:not(.lgrid):not(.dgrid) .slotname{display:inline-block;min-width:54px;text-align:center;font-size:.62rem;font-weight:800;letter-spacing:.08em;color:var(--ongold,var(--text));background:var(--gold2,var(--accent));border:1px solid var(--gold3,var(--border));border-radius:999px;padding:1px 8px;}
.depth-row.zpb-dimerow .slotname{background:transparent;color:var(--tA2,var(--gold3));border-style:dashed;}
.depth-row.zpb-dimerow .playername{color:var(--text);}
.zpb-pkgtag{display:inline-block;margin-left:7px;font-size:.54rem;font-weight:800;letter-spacing:.14em;color:var(--sub);border:1px solid var(--rosehair,var(--border));border-radius:999px;padding:0 6px;vertical-align:1px;}""")

# ============ W17-B · flex chart v3 + the category position board ============

BOARD = '''// W17: the Owner's position board — categories -> position cards (awards-badge language).
// Chips = the flex chart (gold FREE -> wine -6, one-way: the position playing elsewhere).
// Hover/focus a card for the job it does; nothing sentence-long is visible on the board.
// Display-only: the sim engine is untouched (Owner, 26 Oct 2026).
window.zpbDimeOf = function(slotmap){
 try{
  if(!slotmap) return null;
  if(slotmap.CB4) return slotmap.CB4;
  const ovrOf = p => Array.isArray(p) ? p[3] : (p && p.ovr != null ? p.ovr : 0);
  const posOf = p => Array.isArray(p) ? p[1] : (p && p.pos) || null;
  const cbs = Object.keys(slotmap).map(k=>slotmap[k]).filter(p=>p && posOf(p)==='CB');
  cbs.sort((a,b)=>ovrOf(b)-ovrOf(a));
  return cbs.length>=4 ? cbs[3] : null;
 }catch(err){ return null; }
};
window.zpbDimeCell = function(slotmap, c, s){
 if(s && s!=='CB4') return c || {text:'\\u2014', val:70};
 if(c && c.text && c.text!=='\\u2014') return c;
 const d = window.zpbDimeOf ? window.zpbDimeOf(slotmap) : null;
 if(!d) return c || {text:'\\u2014', val:70};
 const e = (typeof normalizeSlotEntry==='function') ? normalizeSlotEntry(d) : null;
 return (e && e.name!=null) ? {text:`${e.name} ${e.ovr}`, val:e.ovr} : (c || {text:'\\u2014', val:70});
};
window.zpbDimeRow = function(slotmap){
 const d = window.zpbDimeOf ? window.zpbDimeOf(slotmap) : null;
 const e = d ? normalizeSlotEntry(d) : null;
 const nm = (e && e.name!=null) ? `${e.name} (${e.ovr})` : '\\u2014';
 const pkg = (e && e.name!=null) ? '<span class="zpb-pkgtag">PKG</span>' : '';
 return `<div class="depth-row zpb-dimerow"><span class="slotname">Dime</span><span class="${e&&e.name!=null?'playername':'empty'}">${nm}${pkg}</span></div>`;
};
window.zpbDimeDrafRow = function(roster){
 const d = window.zpbDimeOf ? window.zpbDimeOf(roster.slots) : null;
 return `<div class="depth-row dgrid zpb-dimerow"><span class="slotname">Dime</span><span class="${d?'playername':'empty'}">${d?d[0]:'\\u2014'}${d?'<span class="zpb-pkgtag">PKG</span>':''}</span><span class="dovr">${d?d[3]:''}</span><span class="narr dwar"></span></div>`;
};
window.zpbFlexTree = function(){
 const cls = c => c===0 ? 'zpb-ft-free' : c===2 ? 'zpb-ft-2' : c===4 ? 'zpb-ft-4' : 'zpb-ft-6';
 const tag = c => c===0 ? 'FREE' : (c===2 ? '\\u22122' : c===4 ? '\\u22124' : '\\u22126');
 const CARDS = {
  QB:{n:'Quarterback', tip:'Touches the ball on every offensive snap \\u2014 throws it, hands it off, or runs it.', rows:[[6,'WR, S']]},
  RB:{n:'Running Back', tip:'Carries the ball and catches short passes out of the backfield.', rows:[[2,'FB'],[4,'WR'],[6,'TE']]},
  FB:{n:'Fullback', tip:'Leads the block for the runner and catches the occasional short pass.', rows:[[4,'RB, TE']]},
  WR:{n:'Wide Receiver', tip:'Runs the routes and catches the ball downfield.', rows:[[4,'RB, TE, S, Nickel, Dime'],[6,'CB']]},
  TE:{n:'Tight End', tip:'Blocks like a lineman and catches like a receiver.', rows:[[2,'WR, FB'],[6,'RB, C, OG, OT, DE, DT, LB, S, Nickel, Dime']]},
  OT:{n:'Offensive Tackle', tip:"Protects the quarterback's blind side and blocks the edge on runs.", rows:[[0,'OG, C'],[4,'DT, FB']]},
  OG:{n:'Offensive Guard', tip:'Blocks the interior \\u2014 pass protection first, run blocking a close second.', rows:[[0,'C'],[4,'OT, DT, FB']]},
  C:{n:'Center', tip:'Anchors the line, makes the protection calls, and snaps the ball.', rows:[[0,'OG'],[4,'OT, DT, FB']]},
  DT:{n:'Defensive Tackle', tip:'Takes on blockers inside \\u2014 stops runs first, pressures the quarterback second.', rows:[[4,'OG, C, DE, FB'],[6,'OT']]},
  DE:{n:'Defensive Edge', tip:'Rushes the passer off the edge and sets the edge against the run.', rows:[[2,'DT, WILL, SAM, OLB'],[4,'MIKE, ILB, FB'],[6,'TE, RB, Nickel']]},
  MIKE:{n:'MIKE / ILB', tip:'The middle linebacker \\u2014 makes the calls, stops the run, covers the middle.', rows:[[0,'ILB, WILL, SAM, OLB'],[4,'DT, FB'],[6,'DE, TE, S, Nickel, Dime']]},
  OLB:{n:'WILL / SAM / OLB', tip:'The outside linebackers \\u2014 chase runs, cover backs and tight ends, sometimes rush.', rows:[[0,'OLB, WILL, SAM'],[2,'MIKE'],[4,'DE, Nickel'],[6,'DT, TE, S, FB, Dime']]},
  SS:{n:'Strong Safety', tip:'The box safety \\u2014 supports against the run and covers tight ends and backs.', rows:[[0,'Nickel, Dime'],[2,'FS'],[4,'WILL, SAM, OLB'],[6,'CB, MIKE, WR, TE, RB, FB']]},
  FS:{n:'Free Safety', tip:'The deep safety \\u2014 reads the quarterback and takes away the deep pass.', rows:[[0,'Nickel, Dime'],[2,'SS'],[4,'CB, WR']]},
  CB:{n:'Cornerback', tip:'Covers receivers man-to-man on the outside.', rows:[[0,'FS, Nickel, Dime'],[2,'SS'],[4,'WR']]},
  ND:{n:'Nickel / Dime', tip:'Nickel: the third cornerback in five-defensive-back packages. Dime: plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys. Played free by cornerbacks and safeties.', rows:[[0,'CB, SS, FS']]},
  K:{n:'Kicker', tip:'Kicks the field goals and extra points.', rows:[[0,'P']]},
  P:{n:'Punter', tip:'Punts \\u2014 and pins teams back with hidden yards.', rows:[[2,'K']]}
 };
 const CATS = [
  ['DEFENDS THE PASS', ['CB','ND','SS','FS']],
  ['PRESSURES THE QB', ['DE','DT']],
  ['STOPS THE RUN', ['MIKE','OLB']],
  ['MOVES THE OFFENSE', ['QB']],
  ['RUNS THE BALL', ['RB','FB']],
  ['CATCHES PASSES', ['WR','TE']],
  ['PROTECTS THE PASSER', ['OT','OG','C']],
  ['THE KICKING GAME', ['K','P']]
 ];
 const card = k => { const c = CARDS[k];
  return '<div class="zpb-poscard" tabindex="0" aria-label="'+c.n+'. '+c.tip.replace(/"/g,'&quot;')+'">'
   + '<span class="zpb-postip">'+c.tip+'</span>'
   + '<span class="zpb-posname">'+c.n+'</span>'
   + c.rows.map(r=>'<span class="zpb-ftchip '+cls(r[0])+'"><b>'+tag(r[0])+'</b> \\u00b7 '+r[1]+'</span>').join('')
   + '</div>'; };
 return '<div class="zpb-posboard">'
  + CATS.map(cat=>'<div class="zpb-poscat"><div class="zpb-poscat-h">'+cat[0]+'</div><div class="zpb-poscards">'+cat[1].map(card).join('')+'</div></div>').join('')
  + '</div>'
  + '<p class="narr" style="margin:8px 0 0;">Hover any card for the job it does; the chips show what playing elsewhere costs.</p>';
};
'''

span_replace('W17-B1 board replaces flex tree',
 "// W15-3: the Owner's flex rules as a tree",
 '// W13-19: a second row of same-size stat bubbles under the 100-seasons report',
 BOARD)

rep('W17-B2 flex intro wording',
 """<b>What does it cost?</b> The player's rating is reduced while he plays out of position. The full rules:</p>""",
 """<b>What does it cost?</b> The player's rating is reduced while he plays out of position. The full chart, position by position:</p>""")

# ============ W17-C · Dime in the depth-chart renderers ============

rep('W17-C1 renderDepthChartHTML defense groups gain the Dime row',
 """  return `<div class="depth-group ${gcls}"><h4>${gname}</h4>${rows}</div>`;""",
 """  const dime = gcls==='def' ? zpbDimeRow(slotmap) : '';
  return `<div class="depth-group ${gcls}"><h4>${gname}</h4>${rows}${dime}</div>`;""")

rep('W17-C2 draft-sidebar depth panel gains the Dime row',
 """document.getElementById('draftRosterList').innerHTML = DEPTH_CHART_GROUPS.map(([gname, gcls, slots])=>`<div class="depth-group ${gcls}"><h4>${gname}</h4>${slots.map(sl=>row(sl, roster.slots[sl], roster.pickRounds&&roster.pickRounds[sl])).join('')}</div>`).join('');""",
 """document.getElementById('draftRosterList').innerHTML = DEPTH_CHART_GROUPS.map(([gname, gcls, slots])=>`<div class="depth-group ${gcls}"><h4>${gname}</h4>${slots.map(sl=>row(sl, roster.slots[sl], roster.pickRounds&&roster.pickRounds[sl])).join('')}${gcls==='def'?zpbDimeDrafRow(roster):''}</div>`).join('');""")

# lineup comparison A (fallbacks via cellOf): derive the Dime cell, inject the row after CB3
rep('W17-C3 comparison A cellOf derives Dime',
 """const cellOf = (slotmap, s, fb)=>{ const c = lineupCell(slotmap, s); if(c.text!=='\\u2014') return c; const f = fb(s); return f ? {text:`${f.name} ${f.val}`, val:f.val} : c; };""".replace('\\u2014','—'),
 """const cellOf = (slotmap, s, fb)=>{ let c = lineupCell(slotmap, s); if(c.text==='—') c = zpbDimeCell(slotmap, c, s); if(c.text!=='—') return c; const f = fb(s); return f ? {text:`${f.name} ${f.val}`, val:f.val} : c; };""")

rep('W17-C4 comparison A injects the Dime row after CB3',
 """   rows += `<div class="zpb-lu-row">
    <span class="zpb-lu-cell zpb-lu-l ${l.text!=='—'&&zL?'zpb-trow':''} ${l.val>r.val?'zpb-lu-win zpb-shm':shmL}" style="${l.text!=='—'&&zL?zL:''}">${l.text}</span>
    <span class="zpb-lu-c">${LABELS[s]||s}</span>
    <span class="zpb-lu-cell zpb-lu-r ${r.text!=='—'&&zR?'zpb-trow':''} ${r.val>l.val?'zpb-lu-win zpb-shm':shmR}" style="${r.text!=='—'&&zR?zR:''}">${r.text}</span>
   </div>`;
  });""",
 """   const zpbLuA = (ll, rr, lab)=>{ const sl2 = (ll.val>=85 && zL) ? ' zpb-shm' : '', sr2 = (rr.val>=85 && zR) ? ' zpb-shm' : '';
    return `<div class="zpb-lu-row">
    <span class="zpb-lu-cell zpb-lu-l ${ll.text!=='—'&&zL?'zpb-trow':''} ${ll.val>rr.val?'zpb-lu-win zpb-shm':sl2}" style="${ll.text!=='—'&&zL?zL:''}">${ll.text}</span>
    <span class="zpb-lu-c">${lab}</span>
    <span class="zpb-lu-cell zpb-lu-r ${rr.text!=='—'&&zR?'zpb-trow':''} ${rr.val>ll.val?'zpb-lu-win zpb-shm':sr2}" style="${rr.text!=='—'&&zR?zR:''}">${rr.text}</span>
   </div>`; };
   rows += zpbLuA(l, r, LABELS[s]||s);
   if(s==='CB3'){ rows += zpbLuA(cellOf(slotmapLeft,'CB4',fL), cellOf(slotmapRight,'CB4',fR), 'Dime'); }
  });""")

rep('W17-C5 comparison B injects the Dime row after CB3',
 """   const l = lineupCell(slotmapLeft, s), r = lineupCell(slotmapRight, s);
   rows += `<div class="zpb-lu-row">
    <span class="zpb-lu-cell zpb-lu-l ${l.val>=90?'zpb-shm':(l.val>=85?'zpb-vib':'')} ${l.val>r.val?'zpb-lu-win':''}"${l.val>=85?` title="${l.val} OVR"`:''}>${l.text}</span>
    <span class="zpb-lu-c">${LABELS[s]||s}</span>
    <span class="zpb-lu-cell zpb-lu-r ${r.val>=90?'zpb-shm':(r.val>=85?'zpb-vib':'')} ${r.val>l.val?'zpb-lu-win':''}"${r.val>=85?` title="${r.val} OVR"`:''}>${r.text}</span>
   </div>`;
  });""",
 """   const zpbLuB = (ll, rr, lab)=>`<div class="zpb-lu-row">
    <span class="zpb-lu-cell zpb-lu-l ${ll.val>=90?'zpb-shm':(ll.val>=85?'zpb-vib':'')} ${ll.val>rr.val?'zpb-lu-win':''}"${ll.val>=85?` title="${ll.val} OVR"`:''}>${ll.text}</span>
    <span class="zpb-lu-c">${lab}</span>
    <span class="zpb-lu-cell zpb-lu-r ${rr.val>=90?'zpb-shm':(rr.val>=85?'zpb-vib':'')} ${rr.val>ll.val?'zpb-lu-win':''}"${rr.val>=85?` title="${rr.val} OVR"`:''}>${rr.text}</span>
   </div>`;
   rows += zpbLuB(lineupCell(slotmapLeft, s), lineupCell(slotmapRight, s), LABELS[s]||s);
   if(s==='CB3'){ rows += zpbLuB(zpbDimeCell(slotmapLeft, lineupCell(slotmapLeft,'CB4'), 'CB4'), zpbDimeCell(slotmapRight, lineupCell(slotmapRight,'CB4'), 'CB4'), 'Dime'); }
  });""")

# ============ W17-D · field map, glossary, slot-name hover ============

rep('W17-D1 field map DIME station',
 """  + row(['CB','CB3','CB'])""",
 """  + row(['CB','CB3','DIME','CB'])""")

rep('W17-D2 field map legend DIME',
 """+ '<span><b>CB3</b> Nickel Cornerback</span>'""",
 """+ '<span><b>CB3</b> Nickel Cornerback</span>'
  + '<span><b>DIME</b> Dime Cornerback (CB4)</span>'""")

rep('W17-D3 glossary Dime entry',
 """<li><b>Nickel</b> — a defense with five defensive backs instead of four; the third cornerback comes in for a linebacker.</li>""",
 """<li><b>Nickel</b> — a defense with five defensive backs instead of four; the third cornerback comes in for a linebacker.</li>
  <li><b>Dime</b> — plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys.</li>""")

rep('W17-D4 ZPB_FULL Dime hover name',
 """RB2:'Running Back 2',FB:'Fullback',""",
 """RB2:'Running Back 2',FB:'Fullback',DIME:'Dime Cornerback (CB4)',""")

# ============ engine byte-pins (the sim math must NOT move this wave) ============

ENGINE_PINS = [
 ('ROSTER_SLOTS 28',  "const ROSTER_SLOTS = ['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','FB','OT1','OT2','OG1','OG2','C','DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS','K','P'];"),
 ('DEPTH_CHART_GROUPS unchanged', "['Defense', 'def', ['DE1','DT1','DT2','DE2','MIKE','WILL','SAM','CB1','CB2','CB3','FS','SS']]"),
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

# ============ postchecks ============

for label, pin, *cnt in [
  ('board QB',      "QB:{n:'Quarterback'"),
  ('board RB -6 TE', "rows:[[2,'FB'],[4,'WR'],[6,'TE']]"),
  ('board WR dime', "rows:[[4,'RB, TE, S, Nickel, Dime'],[6,'CB']]"),
  ('board TE dime', "[6,'RB, C, OG, OT, DE, DT, LB, S, Nickel, Dime']"),
  ('board DE FB restored', "rows:[[2,'DT, WILL, SAM, OLB'],[4,'MIKE, ILB, FB'],[6,'TE, RB, Nickel']]"),
  ('board MIKE dime', "[6,'DE, TE, S, Nickel, Dime']"),
  ('board OLB nickel-dime', "[4,'DE, Nickel'],[6,'DT, TE, S, FB, Dime']"),
  ('board SS free nickel dime', "rows:[[0,'Nickel, Dime'],[2,'FS'],[4,'WILL, SAM, OLB'],[6,'CB, MIKE, WR, TE, RB, FB']]"),
  ('board CB free dime', "rows:[[0,'FS, Nickel, Dime'],[2,'SS'],[4,'WR']]"),
  ('board ND dime sentence', "plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys", 2),
  ('board P -2 K', "rows:[[2,'K']]"),
  ('board cats', "['DEFENDS THE PASS', ['CB','ND','SS','FS']]"),
  ('board cats 2', "['PRESSURES THE QB', ['DE','DT']]"),
  ('board cats 3', "['STOPS THE RUN', ['MIKE','OLB']]"),
  ('board tabindex', 'class="zpb-poscard" tabindex="0"'),
  ('dime row helper', 'window.zpbDimeRow = function(slotmap)'),
  ('dime draft helper', 'window.zpbDimeDrafRow = function(roster)'),
  ('dime cell helper', 'window.zpbDimeCell = function(slotmap, c, s)'),
  ('depth dime inject', "const dime = gcls==='def' ? zpbDimeRow(slotmap) : '';"),
  ('draft sidebar dime', "${gcls==='def'?zpbDimeDrafRow(roster):''}"),
  ('lu A dime row', "if(s==='CB3'){ rows += zpbLuA(cellOf(slotmapLeft,'CB4',fL), cellOf(slotmapRight,'CB4',fR), 'Dime'); }"),
  ('lu B dime row', "if(s==='CB3'){ rows += zpbLuB(zpbDimeCell(slotmapLeft, lineupCell(slotmapLeft,'CB4'), 'CB4'), zpbDimeCell(slotmapRight, lineupCell(slotmapRight,'CB4'), 'CB4'), 'Dime'); }"),
  ('field map dime chip', "row(['CB','CB3','DIME','CB'])"),
  ('field map legend', "<span><b>DIME</b> Dime Cornerback (CB4)</span>"),
  ('glossary dime', "<li><b>Dime</b> — plays around 10% of the snaps"),
  ('zpbfull dime', "DIME:'Dime Cornerback (CB4)',"),
]:
    want = cnt[0] if cnt else 1
    if html.count(pin) != want:
        fails.append(f'postcheck {label}: {html.count(pin)}x, expected {want}')

# stale wave-16 tree must be gone
for label, stale in [
  ('old tree RB row', "[[4,'WR'],[6,'S']]"),
  ('old DE row (FB missing)', "[[2,'DT, WILL, SAM, OLB'],[4,'MIKE, ILB'],[6,'TE, RB']]"),
  ('old P -4 K', "[[4,'K']]"),
  ('old flextree fn', "window.zpbFlexTree = function(){\n const F = ["),
]:
    if stale in html:
        fails.append(f'stale {label} still present')

# exactly one board renderer; 18 cards; no leftover tree F array
if html.count('window.zpbFlexTree = function()') != 1:
    fails.append(f"zpbFlexTree defs: {html.count('window.zpbFlexTree = function()')}")
if html.count('.zpb-poscard" tabindex="0"') != 1:  # in template string
    pass  # rendered per card at runtime; template appears once — already checked above
for k in ['QB','RB','FB','WR','TE','OT','OG','C','DT','DE','MIKE','OLB','SS','FS','CB','ND','K','P']:
    if f"{k}:{{n:" not in html:
        fails.append(f'board card {k} missing')

if fails:
    print('BUILD FAILED:'); [print(' -', f) for f in fails]; sys.exit(1)

open(OUT, 'w', encoding='utf-8').write(html)
data = open(OUT, 'rb').read()
src_len = len(open(SRC, 'rb').read())
print(f'OK  build_w17.html  md5 {hashlib.md5(data).hexdigest()}  {len(data):,} B  (src {src_len:,} B, delta {len(data)-src_len:+,} B)')
