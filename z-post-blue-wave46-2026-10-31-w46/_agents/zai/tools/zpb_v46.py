#!/usr/bin/env python3
# zpb_v46.py — wave 46 build (the Owner's round-46)
# asserted exact replacements on the w45 bytes + the no-dash sweep + post checks
import hashlib, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.path.insert(0, '/home/z/my-project/scripts')
from zpb_v46_sweep import sweep

SRC = '/home/z/my-project/download/Football-Sim-Z-post-blue-w45.html'
OUT = '/home/z/my-project/download/Football-Sim-Z-post-blue-w46.html'

src = open(SRC, encoding='utf-8').read()
md5 = hashlib.md5(src.encode()).hexdigest()
assert md5 == '9990aa033b94a34aaf3c2a2a5d844fef', 'base md5 mismatch: ' + md5
print('base md5 OK', md5, len(src))

def rep(old, new, count=1, tag=''):
    global src
    n = src.count(old)
    assert n == count, f'FAIL {tag}: expected {count} hit(s), found {n}\n---\n{old[:160]}\n---'
    src = src.replace(old, new)
    print(f'ok  {tag} ({count})')

# ============ O1 · the ANCHOR pink softens in light mode ============
rep('.zpb-anch{border-color:#c4899f !important;background:#f0bfd3 !important;color:#43202f !important;}',
    '.zpb-anch{border-color:#cfa3b5 !important;background:#f2dee6 !important;color:#43202f !important;} /* w46 (O1, Owner): the pink softens to the site\'s rose family, the dark chip untouched */',
    1, 'O1 anchor pink')

# ============ O2 · the glossary condenses to one line per position family ============
OLD_GLOSS = """window.zpbGlossPositionsHTML = function(){
 const TIPS = {QB:'Touches the ball on every offensive snap \u2014 throws it, hands it off, or runs it.',RB:'Carries the ball and catches short passes out of the backfield.',FB:'Leads the block for the runner and catches the occasional short pass.',WR:'Runs the routes and catches the ball downfield.',TE:'Blocks like a lineman and catches like a receiver.',OT:"Protects the quarterback's blind side and blocks the edge on runs.",OG:'Blocks the interior \u2014 pass protection first, run blocking a close second.',C:'Anchors the line, makes the protection calls, and snaps the ball.',DE:'Rushes the passer off the edge and sets the edge against the run.',DT:'Takes on blockers inside \u2014 stops runs first, pressures the quarterback second.',MIKE:'The middle linebacker \u2014 makes the calls, stops the run, covers the middle.',OLB:'The outside linebackers \u2014 chase runs, cover backs and tight ends, sometimes rush.',CB:'Covers receivers man-to-man on the outside.',SS:'The box safety \u2014 supports against the run and covers tight ends and backs.',FS:'The deep safety \u2014 reads the quarterback and takes away the deep pass.',K:'Kicks the field goals and extra points.',P:'Punts \u2014 and pins teams back with hidden yards.'};
 const FAM = {QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',TE1:'TE',TE2:'TE',FB:'FB',OT1:'OT',OT2:'OT',OG1:'OG',OG2:'OG',C:'C',DE1:'DE',DE2:'DE',DT1:'DT',DT2:'DT',MIKE:'MIKE',WILL:'OLB',SAM:'OLB',CB1:'CB',CB2:'CB',CB3:'NK',FS:'FS',SS:'SS',K:'K',P:'P'};
 const FAMNAME = {QB:'Quarterback',RB:'Running Back',FB:'Fullback',WR:'Wide Receiver',TE:'Tight End',OT:'Offensive Tackle',OG:'Offensive Guard',C:'Center',DE:'Defensive Edge',DT:'Defensive Tackle',MIKE:'Middle Linebacker',OLB:'Outside Linebacker',CB:'Cornerback',SS:'Strong Safety',FS:'Free Safety',K:'Kicker',P:'Punter',NK:'Nickel Cornerback'};
 const NK = 'the extra defensive back in five-defensive-back packages.';
 const DM = 'plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys.';
 const slots = (typeof ROSTER_SLOTS!=='undefined') ? ROSTER_SLOTS : [];
 let out = '<p class="narr" style="margin:4px 0;"><b>Every starting spot, in depth chart order:</b></p><ul class="gl">';
 slots.forEach(s=>{
  const f = FAM[s]; const lb = (typeof LABELS!=='undefined'&&LABELS[s])||s;
  if(s==='CB3'){ out += `<li><b>CB3 \u2014 Nickel Cornerback</b> \u2014 ${NK}</li><li><b>DIME</b> \u2014 ${DM}</li>`; return; }
  if(!f || !TIPS[f]) return;
  out += `<li><b>${lb} \u00b7 ${FAMNAME[f]}</b> \u2014 ${TIPS[f]}</li>`;
 });
 out += '</ul>';
 return out;
};"""
NEW_GLOSS = """window.zpbGlossPositionsHTML = function(){
 // w46 (O2, Owner): the same-position lines condense to one line per family \u00b7 the dots carry the line
 const TIPS = {QB:'Touches the ball on every offensive snap \u00b7 throws it, hands it off, or runs it.',RB:'Carries the ball and catches short passes out of the backfield.',FB:'Leads the block for the runner and catches the occasional short pass.',WR:'Runs the routes and catches the ball downfield.',TE:'Blocks like a lineman and catches like a receiver.',OT:"Protects the quarterback's blind side and blocks the edge on runs.",OG:'Blocks the interior \u00b7 pass protection first, run blocking a close second.',C:'Anchors the line, makes the protection calls, and snaps the ball.',DE:'Rushes the passer off the edge and sets the edge against the run.',DT:'Takes on blockers inside \u00b7 stops runs first, pressures the quarterback second.',MIKE:'The middle linebacker \u00b7 makes the calls, stops the run, covers the middle.',OLB:'The outside linebackers \u00b7 chase runs, cover backs and tight ends, sometimes rush.',CB:'Covers receivers man-to-man on the outside.',SS:'The box safety \u00b7 supports against the run and covers tight ends and backs.',FS:'The deep safety \u00b7 reads the quarterback and takes away the deep pass.',K:'Kicks the field goals and extra points.',P:'Punts \u00b7 and pins teams back with hidden yards.'};
 const FAM = {QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',WR4:'WR',TE1:'TE',TE2:'TE',TE3:'TE',FB:'FB',OT1:'OT',OT2:'OT',OG1:'OG',OG2:'OG',C:'C',DE1:'DE',DE2:'DE',DT1:'DT',DT2:'DT',MIKE:'MIKE',WILL:'OLB',SAM:'OLB',CB1:'CB',CB2:'CB',CB3:'NK',FS:'FS',SS:'SS',K:'K',P:'P'};
 const FAMNAME = {QB:'Quarterback',RB:'Running Back',FB:'Fullback',WR:'Wide Receiver',TE:'Tight End',OT:'Offensive Tackle',OG:'Offensive Guard',C:'Center',DE:'Defensive Edge',DT:'Defensive Tackle',MIKE:'Middle Linebacker',OLB:'Outside Linebacker',CB:'Cornerback',SS:'Strong Safety',FS:'Free Safety',K:'Kicker',P:'Punter',NK:'Nickel Cornerback'};
 const NK = 'the extra defensive back in five-defensive-back packages.';
 const DM = 'plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys.';
 const slots = (typeof ROSTER_SLOTS!=='undefined') ? ROSTER_SLOTS : [];
 let out = '<p class="narr" style="margin:4px 0;"><b>Every starting spot, in depth chart order:</b></p><ul class="gl">';
 const items = []; const famIdx = {};
 slots.forEach(s=>{
  const f = FAM[s];
  if(s==='CB3'){ items.push('<li><b>CB3 \u00b7 Nickel Cornerback</b> \u00b7 ' + NK + '</li><li><b>DIME</b> \u00b7 ' + DM + '</li>'); return; }
  if(!f || !TIPS[f]) return;
  const lb = (typeof LABELS!=='undefined'&&LABELS[s])||s;
  if(famIdx[f]==null){ famIdx[f] = items.length; items.push({f:f, labels:[lb]}); }
  else items[famIdx[f]].labels.push(lb);
 });
 items.forEach(it=>{
  if(typeof it === 'string'){ out += it; return; }
  out += '<li><b>' + it.labels.join(' \u00b7 ') + ' \u00b7 ' + FAMNAME[it.f] + '</b> \u00b7 ' + TIPS[it.f] + '</li>';
 });
 out += '</ul>';
 return out;
};"""
rep(OLD_GLOSS, NEW_GLOSS, 1, 'O2 glossary condense')

# ============ O3a · the glossary extra entries' separators ============
rep("const lis = extra.map(([t,d])=>`<li><b>${t}</b> \u2014 ${d}</li>`).join('');",
    "const lis = extra.map(([t,d])=>`<li><b>${t}</b> \u00b7 ${d}</li>`).join('');",
    1, 'O3 glossary li separator')

# ============ O6 · the position-rank note retires ============
rep("  out += '<p class=\"narr\" style=\"margin:10px 0 0;\">Position rank counts your player against the same spot on all 32 simulated teams.</p>';\n out += '<h4 style=\"margin:14px 0 4px;\">Your Breakdown</h4><div class=\"zpb-dbk-groups\">'",
    " out += '<h4 style=\"margin:14px 0 4px;\">Your Breakdown</h4><div class=\"zpb-dbk-groups\">'", 1, 'O6 note removed')

# ============ O7 · the ten-move table retires; the front speaks in shapes ============
rep(""" return `<div id="${hostId}">${lineupScoresHTML(roster, hostId)}<div id="${hostId}Advice">${lineupAdviceHTML(roster, hostId)}</div><div class="draft-columns zpb-lu-cols" style="grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:8px;">${groups}</div>${bar}</div>`;""",
    """ return `<div id="${hostId}">${lineupScoresHTML(roster, hostId)}<div id="${hostId}Advice">${window.zpbFrontPickHTML ? zpbFrontPickHTML(roster) : ''}</div><div class="draft-columns zpb-lu-cols" style="grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:8px;">${groups}</div>${bar}</div>`; // w46 (O7, Owner): the ten-move recommendation retires \u00b7 the front answers visually""",
    1, 'O7 advice swapped')

rep("""// Slot-by-slot lineup editor: pick who plays where; flexed players show their penalty.""",
    """// w46 (O7, Owner): the lineups page reads the front, never says it \u00b7 two miniature fronts in the
// site's own shapes, the better one lit. His law: the DT2 against the ILB2 (WILL is the site's ILB2).
window.zpbFrontPickHTML = function(roster){
 try{
  const smap = (typeof zpbStageOf==='function') ? zpbStageOf(roster).map : (roster.slots||{});
  const ne = (typeof normalizeSlotEntry==='function') ? normalizeSlotEntry : function(x){ return x; };
  const ov = x=>{ const e = ne(x); return e ? (e.ovr||70) : 70; };
  const dt2 = ov(smap['DT2']), ilb2 = ov(smap['WILL']);
  const b34 = ilb2 > dt2;
  const fp = n=>{ let h=''; for(let k=0;k<n;k++) h+='<i class="fp-dl"></i>'; for(let k=0;k<7-n;k++) h+='<i class="fp-lb"></i>'; return h; };
  let vars = '';
  try{ vars = (typeof zpbRowVars==='function' && typeof seasonUserTeam==='function' && typeof seasonState!=='undefined' && seasonState) ? zpbRowVars(seasonUserTeam()) : ''; }catch(err){}
  return '<span class="zpb-frontpick"'+(vars?' style="'+vars+'"':'')+' role="img" aria-label="Better front: '+(b34?'3-4':'4-3')+'">'
   + '<span class="zpb-fp'+(b34?'':' zpb-fp-on')+'" title="4-3">'+fp(4)+'</span>'
   + '<span class="zpb-fp'+(b34?' zpb-fp-on':'')+'" title="3-4">'+fp(3)+'</span>'
   + '</span>';
 }catch(err){ return ''; }
};
// Slot-by-slot lineup editor: pick who plays where; flexed players show their penalty.""",
    1, 'O7 frontpick fn')

# the retired advice renderer leaves the source entirely (the sentence goes with it; the lineupAdvice math stays)
_ia = src.index('// A readable explanation of one recommended move set')
_ib = src.index('// w46 (O7, Owner): the lineups page reads the front')
assert 0 < _ia < _ib, 'advice block anchors out of order'
assert 'function lineupAdviceHTML' in src[_ia:_ib], 'advice function not inside the block'
src = src[:_ia] + src[_ib:]
print('ok  O7 advice function retired (', _ib - _ia, 'chars )')

# the front-pick CSS rides the w42 style block's tail
rep("""@media (prefers-reduced-motion: reduce){
 .zpb-fm .zpb-fm-ini,.zpb-dbk-g .zpb-dfc2{opacity:1 !important;animation:none !important;}
}
</style>""",
    """@media (prefers-reduced-motion: reduce){
 .zpb-fm .zpb-fm-ini,.zpb-dbk-g .zpb-dfc2{opacity:1 !important;animation:none !important;}
}
/* w46 (O7, Owner): the front speaks in shapes \u00b7 no words */
.zpb-frontpick{display:inline-flex;gap:10px;align-items:center;margin:0 0 10px;}
.zpb-fp{display:inline-flex;gap:4px;align-items:center;padding:6px 9px;border-radius:10px;border:1px solid var(--border);opacity:.34;transition:opacity .35s ease,border-color .35s ease,box-shadow .35s ease;}
.zpb-fp i{display:inline-block;}
.zpb-fp .fp-dl{width:11px;height:11px;border-radius:2px;background:var(--tn,var(--accent));}
.zpb-fp .fp-lb{width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:10px solid var(--tA2,var(--accent));}
.zpb-fp-on{opacity:1;border-color:var(--zrb,var(--accent));box-shadow:0 0 12px var(--zr1,transparent),inset 0 0 0 1px var(--zrb,var(--accent));}
</style>""",
    1, 'O7 frontpick css')

# ============ O5 · the cadence slows half a second; the panels sync ============
rep(".zpb-fm.zpb-seen .zpb-fm-ini{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.5s);} /* w44 (O8, Owner): half a second per player \u2014 the 0.15s sprint retires */",
    ".zpb-fm.zpb-seen .zpb-fm-ini{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*1s);} /* w44 (O8, Owner): half a second per player \u00b7 w46 (O4, Owner): a half second slower \u00b7 one second per beat */",
    1, 'O5 map cadence')
rep(".zpb-dbk-g.zpb-seen .zpb-dfc2{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.15s);}",
    ".zpb-dbk-g.zpb-seen .zpb-dfc2{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*1s);} /* w46 (O4, Owner): the panels ride the map's beat \u00b7 synced */",
    1, 'O5 panel cadence')
rep("""     el.classList.add('zpb-seen');
     io.unobserve(el);
    });
   }, {threshold:0.16});""",
    """     el.classList.add('zpb-seen');
     io.unobserve(el);
     try{ // w46 (O4, Owner): the panels sync with the map \u00b7 the map's look releases its breakdown groups on the same clock
      if(el.classList && el.classList.contains('zpb-fm')){
       var _anc = el.parentElement;
       while(_anc && _anc !== document.body && !_anc.querySelector('.zpb-dbk-g')) _anc = _anc.parentElement;
       if(_anc){
        Array.prototype.forEach.call(_anc.querySelectorAll('.zpb-dbk-g:not([data-zseen])'), function(g2){
         var remain2 = (window.__zpbFinCineEndsAt||0) - Date.now();
         g2.style.setProperty('--dfc-cine', remain2 > 0 ? (Math.ceil(remain2/100)/10) + 's' : '0s');
         g2.dataset.zseen = '1'; g2.classList.add('zpb-seen'); io.unobserve(g2);
        });
       }
      }
     }catch(err){}
    });
   }, {threshold:0.16});""",
    1, 'O5 gate sync')

# ============ O8 · one voice on the during-game screen ============
# colOf rides the halfway law (both copies share the body; the two are identical bytes)
rep("""   const base = dark ? pk.accD : pk.accL;
   try{ return (dark && window.zpbLift) ? zpbLift(base, 0.62) : base; }catch(err){ return base; } };""",
    """   // w46 (O7, Owner): the whole screen rides the halfway tone \u00b7 light reads txM, dark reads txd \u00b7 one voice with the site
   return dark ? (pk.txd||pk.accD) : (pk.txM||pk.accL); };""",
    2, 'O8 colOf halfway')

# the header score chips join the 0.50 tone
rep("""style="--scA:' + (pkA?pkA.accL:'inherit') + ';--scAd:' + (pkA?pkA.accD:'inherit') + ';" id="zrepSa">0</span>""",
    """style="--scA:' + (pkA?(pkA.txM||pkA.accL):'inherit') + ';--scAd:' + (pkA?(pkA.txd||pkA.accD):'inherit') + ';" id="zrepSa">0</span>""",
    1, 'O8 header score A')
rep("""style="--scH:' + (pkH?pkH.accL:'inherit') + ';--scHd:' + (pkH?pkH.accD:'inherit') + ';" id="zrepSh">0</span>""",
    """style="--scH:' + (pkH?(pkH.txM||pkH.accL):'inherit') + ';--scHd:' + (pkH?(pkH.txd||pkH.accD):'inherit') + ';" id="zrepSh">0</span>""",
    1, 'O8 header score H')

# the report abbreviations wear their own team (the "my color" bug)
rep("""+ '<span class="zrl-team">' + abbr(g[teamKey]) + '</span><span class="zrl-play">'""",
    """+ '<span class="zrl-team" style="color:' + colOf(g[teamKey]) + ';">' + abbr(g[teamKey]) + '</span><span class="zrl-play">'""",
    1, 'O8 zrl-team TO line')
rep("""+ '<span class="zrl-team">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + describe(ev)""",
    """+ '<span class="zrl-team" style="color:' + colOf(g[ev.side]) + ';">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + describe(ev)""",
    1, 'O8 zrl-team main line')

# the blocked-kick tails (two identical copies inside zpbGameReplay) wear colOf(tm)
rep("""crest2(tm) + '<span class="zrl-team">' + (TEAM_ABBR[tm]||tm) + '</span><span class="zrl-play">' + xN + ' ' + chip2('BLK')""",
    """crest2(tm) + '<span class="zrl-team" style="color:' + _c + ';">' + (TEAM_ABBR[tm]||tm) + '</span><span class="zrl-play">' + xN + ' ' + chip2('BLK')""",
    2, 'O8 zrl-team blocks')

# the last-drives lines wear colOf2
rep("""crest2(other) + '<span class="zrl-team">' + (TEAM_ABBR[other]||other) + '</span><span class="zrl-play">' + nmOf(xName, oc) + ' ' + chip('4&O', oc)""",
    """crest2(other) + '<span class="zrl-team" style="color:' + oc2 + ';">' + (TEAM_ABBR[other]||other) + '</span><span class="zrl-play">' + nmOf(xName, oc) + ' ' + chip('4&O', oc)""",
    1, 'O8 zrl-team 4&O')
rep("""crest2(tm) + '<span class="zrl-team">' + (TEAM_ABBR[tm]||tm) + '</span><span class="zrl-play">' + nmOf(xName, oc) + ' ' + chip('3&O', oc)""",
    """crest2(tm) + '<span class="zrl-team" style="color:' + oc + ';">' + (TEAM_ABBR[tm]||tm) + '</span><span class="zrl-play">' + nmOf(xName, oc) + ' ' + chip('3&O', oc)""",
    1, 'O8 zrl-team 3&O')

# the final-whistle score separator
rep("""'</span> <i>-</i> <span style="color:' + _cH + ';">'""",
    """'</span> <i>\u00b7</i> <span style="color:' + _cH + ';">'""",
    1, 'O3 final whistle dot')

# the Super Bowl stage reads txd (the stage is always dark)
rep("""<b style="color:' + (pkA ? pkA.accL : 'var(--accent)') + ';">'""",
    """<b style="color:' + (pkA ? (pkA.txd||pkA.accD) : 'var(--accent)') + ';">'""",
    1, 'O8 sb final A')
rep("""<b style="color:' + (pkH ? pkH.accL : 'var(--accent)') + ';">'""",
    """<b style="color:' + (pkH ? (pkH.txd||pkH.accD) : 'var(--accent)') + ';">'""",
    1, 'O8 sb final H')

# ============ O8 · the Unit Comparison's winning numbers ride the dropdown ink ============
rep("""function unitComparisonHTML(poolA, poolB){
 const mA = computeDetailMetrics(poolA), mB = computeDetailMetrics(poolB);
 let rows='', aUnits=0, bUnits=0;
 mA.forEach((ma,i)=>{
  const mb = mB[i];
  if(ma.avg>mb.avg) aUnits++; else if(mb.avg>ma.avg) bUnits++;
  rows += `<tr><td style="${ma.avg>mb.avg?'font-weight:700;color:var(--tA2,var(--accent));':''}">${Math.round(ma.avg)}</td><td class="narr" style="text-align:center;">${ma.label}</td><td style="${mb.avg>ma.avg?'font-weight:700;color:var(--tA2,var(--accent));':''}text-align:right;">${Math.round(mb.avg)}</td></tr>`;
 });""",
    """function unitComparisonHTML(poolA, poolB, nameA, nameB){
 const mA = computeDetailMetrics(poolA), mB = computeDetailMetrics(poolB);
 let rows='', aUnits=0, bUnits=0;
 const stA = (nameA && typeof zpbNeutralRowVars==='function') ? zpbNeutralRowVars(nameA) : ''; // w46 (O7, Owner): the winning unit number wears the dropdown's halfway ink
 const stB = (nameB && typeof zpbNeutralRowVars==='function') ? zpbNeutralRowVars(nameB) : '';
 mA.forEach((ma,i)=>{
  const mb = mB[i];
  if(ma.avg>mb.avg) aUnits++; else if(mb.avg>ma.avg) bUnits++;
  rows += `<tr><td style="${stA}${ma.avg>mb.avg?'font-weight:700;color:var(--tA2,var(--accent));':''}">${Math.round(ma.avg)}</td><td class="narr" style="text-align:center;">${ma.label}</td><td style="${stB}${mb.avg>ma.avg?'font-weight:700;color:var(--tA2,var(--accent));':''}text-align:right;">${Math.round(mb.avg)}</td></tr>`;
 });""",
    1, 'O8 unit vars')

rep(""" const units = unitComparisonHTML(PLAYERS.filter(p=>p[2]===a), PLAYERS.filter(p=>p[2]===b));""",
    """ const units = unitComparisonHTML(PLAYERS.filter(p=>p[2]===a), PLAYERS.filter(p=>p[2]===b), a, b); // w46 (O7, Owner): the rows wear the teams' halfway ink""",
    1, 'O8 unit call home')
rep("""  const units = unitComparisonHTML(a.pool, b.pool); // w28 (Owner): the grades/edges verdict sentence is gone \u2014 the tables speak""",
    """  const units = unitComparisonHTML(a.pool, b.pool, a.teamName, b.teamName); // w28 (Owner): the grades/edges verdict sentence is gone \u00b7 w46 (O7): the rows wear the teams' halfway ink""",
    1, 'O8 unit call review')

# ============ O4 · the 90+ cells read gold at every phase ============
rep(""".zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{background:linear-gradient(100deg,var(--zshim,var(--zrb,var(--accent))) 18%,#ffe9c6 38%,var(--zshim,var(--zrb,var(--accent))) 55%,#fff6e3 72%,var(--zshim,var(--zrb,var(--accent))) 88%) !important;background-size:230% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:zpbshmsweep 3.4s linear infinite;}}""",
    """.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{background:linear-gradient(100deg,var(--zshim,var(--gold3,#9a6b1f)) 18%,var(--gold2,#e6c67d) 38%,var(--zshim,var(--gold3,#9a6b1f)) 55%,var(--gold2,#e6c67d) 72%,var(--zshim,var(--gold3,#9a6b1f)) 88%) !important;background-size:230% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:zpbshmsweep 3.4s linear infinite;}} /* w46 (O4, Owner): the sweep stays inside the gold family \u00b7 every phase reads gold, the cream bands retire */""",
    1, 'O4 gold cells')

# ============ O3 · the no-dash sweep — acorn-parsed string ranges + a safe HTML pass ============
import re as _re
import subprocess as _sp

# -- split the file into script blocks and the rest --
parts = []   # ('raw', text) or ('js', text)
pos = 0
for m in _re.finditer(r'<script\b[^>]*>.*?</script\s*>', src, _re.S | _re.I):
    if m.start() > pos: parts.append(('raw', src[pos:m.start()]))
    parts.append(('js', m.group(0)))
    pos = m.end()
if pos < len(src): parts.append(('raw', src[pos:]))
print('script blocks:', sum(1 for k, _ in parts if k == 'js'))

# -- js blocks: acorn-precise replacement --
js_total = 0
js_ranges = 0
new_parts = []
for kind, text in parts:
    if kind != 'js':
        new_parts.append((kind, text)); continue
    m2 = _re.match(r'(<script\b[^>]*>)(.*?)(</script\s*>)$', text, _re.S | _re.I)
    head, body, tail = m2.group(1), m2.group(2), m2.group(3)
    p = _sp.run(['node', '/home/z/my-project/scripts/zpb_v46_nodedash.js'], input=body,
                capture_output=True, text=True, encoding='utf-8')
    assert p.returncode == 0, 'node dash pass failed'
    meta = p.stderr.strip().splitlines()[-1]
    import json as _json
    meta = _json.loads(meta)
    assert meta['parse'] == 'ok', 'acorn parse fail: ' + str(meta)
    js_total += meta['total']; js_ranges += meta['ranges']
    new_parts.append(('js', head + p.stdout + tail))
src = ''.join(t for _, t in new_parts)
print('js sweep replacements:', js_total, 'in', js_ranges, 'literals')

# -- the rest: html text + attribute values only (style content is untouched — no visible text lives there) --
import zpb_v46_sweep as _sw
class HtmlOnly(_sw.Sweeper):
    def _do_style(self, i):
        s = self.src; n = len(s)
        j = s.lower().find('</style>', i)
        end = (j+8) if j >= 0 else n
        self._emit_span(s, i, end)
        return end
    def _do_script(self, i):  # not reached (scripts extracted) — safety passthrough
        s = self.src; n = len(s)
        j = s.lower().find('</script>', i)
        end = (j+9) if j >= 0 else n
        self._emit_span(s, i, end)
        return end
sw2 = HtmlOnly(src)
src, hlog = sw2.run()
print('html sweep replacements:', len(hlog))
with open('/home/z/my-project/tool-results/w46_dash_log.txt', 'w', encoding='utf-8') as f:
    for ln, k, ctx in hlog:
        f.write(f'{ln}\t{k}\t{ctx}\n')

# fixed point: neither pass may change anything any more
src2, _ = HtmlOnly(src).run()
assert src2 == src, 'html pass not idempotent'
ok2 = True
for m in _re.finditer(r'<script\b[^>]*>.*?</script\s*>', src, _re.S | _re.I):
    m2 = _re.match(r'(<script\b[^>]*>)(.*?)(</script\s*>)$', m.group(0), _re.S | _re.I)
    p2 = _sp.run(['node', '/home/z/my-project/scripts/zpb_v46_nodedash.js'], input=m2.group(2), capture_output=True, text=True, encoding='utf-8')
    if p2.stdout != m2.group(2): ok2 = False
assert ok2, 'js pass not idempotent'
print('sweep fixed-point OK')

# post-check: remaining raw em/en dashes must live only in comments (report count)
rem_em = src.count('\u2014'); rem_en = src.count('\u2013')
print('remaining em dashes (comments only):', rem_em, ' en:', rem_en)

# ============ node --check on every script block ============
blocks = _re.findall(r'<script\b[^>]*>(.*?)</script\s*>', src, _re.S | _re.I)
bad = 0
import tempfile as _tf, os as _os
for bi, b in enumerate(blocks):
    with _tf.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as tf:
        tf.write(b); tmpname = tf.name
    p3 = _sp.run(['node', '--check', tmpname], capture_output=True, text=True)
    _os.unlink(tmpname)
    if p3.returncode != 0:
        bad += 1
        print('SYNTAX FAIL block', bi, p3.stderr[:400])
assert bad == 0, f'{bad} script block(s) failed node --check'
print('node --check OK on', len(blocks), 'blocks')

# ============ write + md5 ============
open(OUT, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode()).hexdigest()
print('WROTE', OUT, len(src), 'md5', h)
