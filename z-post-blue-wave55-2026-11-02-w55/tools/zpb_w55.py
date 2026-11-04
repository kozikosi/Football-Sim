#!/usr/bin/env python3
# zpb_w55.py — the Owner's round-55: the phone pass. Asserted exact replacements only.
# Baseline: the Owner's w54 bytes (md5 512d1885ac0a69120bedcaf8e9041f2b).
import hashlib, sys

SRC = '/home/z/my-project/w55/Football-Sim-Z-post-blue-w55.html'
html = open(SRC, encoding='utf-8').read()
n0 = len(html)
print('baseline bytes:', n0, 'md5:', hashlib.md5(html.encode()).hexdigest())

def rep(old, new, count=1, tag=''):
    global html
    found = html.count(old)
    if found != count:
        print(f'FAIL [{tag}] expected {count} occurrence(s), found {found}'); sys.exit(1)
    html = html.replace(old, new, count)
    print(f'ok   [{tag}]')

# ---------- R1 · the season in badges: the honors lead the rail (beats renumbered, pace untouched) ----------
old = """ let beat = 0, oHTML = '', dHTML = '', kHTML = '', hHTML = '';
 OFF.forEach(b=>{ oHTML += badgeHTML(b, beat++); });
 oHTML += `<span class="zpb-sbreak" data-beat="${beat++}"></span>`;
 offStars.forEach(r=>{ oHTML += starCard(r, beat++); });
 DEF.forEach(b=>{ dHTML += badgeHTML(b, beat++); });
 dHTML += `<span class="zpb-sbreak" data-beat="${beat++}"></span>`;
 defStars.forEach(r=>{ dHTML += starCard(r, beat++); });
 KEYF.forEach(b=>{ kHTML += badgeHTML(b, beat++); });
 honorCards.forEach(c=>{ const _pv=(typeof PLAYERS!=='undefined')?PLAYERS.find(function(p){return p[0]===c.n;}):null; const _cls=c.gold?'zpb-shm':(_pv&&_pv[3]>=90?'zpb-shm':(_pv&&_pv[3]>=85?'zpb-vib':'')); hHTML += `<div class="zpb-scard zpb-shonor" style="${(typeof zpbRowVars==='function')?zpbRowVars(user):''}--beat:${beat}" data-beat="${beat++}"><div class="zpb-scard-hd"><b class="zpb-gname ${_cls}">${c.n}</b><span class="zpb-poschip">${c.pos||''}</span></div><div class="zpb-shonor-t">${c.t}</div>${c.sub?`<div class="zpb-shonor-w">${c.sub}</div>`:''}</div>`; });"""
new = """ let beat = 0, oHTML = '', dHTML = '', kHTML = '', hHTML = '';
 // w55 (Owner): the honors lead the rail — the top zone fills first, the blank stage is gone.
 // The appearance order now matches the vertical order; the one-second beat pace and the total
 // are untouched (every card keeps exactly one beat).
 honorCards.forEach(c=>{ const _pv=(typeof PLAYERS!=='undefined')?PLAYERS.find(function(p){return p[0]===c.n;}):null; const _cls=c.gold?'zpb-shm':(_pv&&_pv[3]>=90?'zpb-shm':(_pv&&_pv[3]>=85?'zpb-vib':'')); hHTML += `<div class="zpb-scard zpb-shonor" style="${(typeof zpbRowVars==='function')?zpbRowVars(user):''}--beat:${beat}" data-beat="${beat++}"><div class="zpb-scard-hd"><b class="zpb-gname ${_cls}">${c.n}</b><span class="zpb-poschip">${c.pos||''}</span></div><div class="zpb-shonor-t">${c.t}</div>${c.sub?`<div class="zpb-shonor-w">${c.sub}</div>`:''}</div>`; });
 OFF.forEach(b=>{ oHTML += badgeHTML(b, beat++); });
 oHTML += `<span class="zpb-sbreak" data-beat="${beat++}"></span>`;
 offStars.forEach(r=>{ oHTML += starCard(r, beat++); });
 DEF.forEach(b=>{ dHTML += badgeHTML(b, beat++); });
 dHTML += `<span class="zpb-sbreak" data-beat="${beat++}"></span>`;
 defStars.forEach(r=>{ dHTML += starCard(r, beat++); });
 KEYF.forEach(b=>{ kHTML += badgeHTML(b, beat++); });"""
rep(old, new, 1, 'R1 honors-first beats')

# ---------- R2 · the Dime is changeable like every slot (the editor's picker) ----------
old = """ const dimeEd = ()=>{ // w50 (Owner): DIME sits directly below NICKEL on the SAME defense depth chart — never off the list
  const d = window.zpbDimeOf ? window.zpbDimeOf(smap) : null;
  const cls = d ? (d[3]>=90?'zpb-shm':(d[3]>=85?'zpb-vib':'')) : '';
  return `<div class="depth-row lgrid"><span class="slotname">DIME</span><span class="${d?'playername':'empty'} ${cls}">${d?d[0]:''}</span><span class="dwar">${d?Math.round(d[3]):''}</span></div>`; // w19 law: the tier classes ride the resolved name
 };"""
new = """ const dimeEd = ()=>{ // w50 (Owner): DIME sits directly below NICKEL on the SAME defense depth chart — never off the list · w55 (Owner): the Dime is CHANGEABLE like every slot — the same picker, the same staging, the same APPLY
  const cur = smap['CB4'];
  const opts = players.filter(p=>eligibleSlotsFor(p).includes('CB4') || (cur && p[0]===cur[0])).map(p=>{
   return `<option value="${p[0].replace(/"/g,'&quot;')}" ${cur&&cur[0]===p[0]?'selected':''}>${p[0]}</option>`; // the box carries the name, nothing else
  }).join('') || '<option value="" disabled>\\u00b7</option>'; // a depth slot with no eligible player yet still shows its row
  const cls = cur ? (cur[3]>=90?'zpb-shm':(cur[3]>=85?'zpb-vib':'')) : ''; // w27: the tier law rides the picker's row like every sibling
  return `<div class="depth-row lgrid"><span class="slotname">DIME</span><select data-lineup="CB4" style="width:100%;min-width:0;background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:3px 6px;font-size:0.78rem;">${opts}</select><span class="dwar">${cur?effOvr(cur,'CB4'):''}</span></div>`;
 };"""
rep(old, new, 1, 'R2 dime picker')

# ---------- R3+R4 · "(whole corps)" retires from both unit report cards ----------
old = "rec: _rc2.length ? `${fmtN(_cy)} rec yds · ${_cat} catches · ${_ctd} TD (whole corps)` : '·',"
new = "rec: _rc2.length ? `${fmtN(_cy)} rec yds · ${_cat} catches · ${_ctd} TD` : '·',"
rep(old, new, 1, 'R3 whole corps (table card)')
old = "return rs.length ? fmtN(ry)+' rec yds · '+rc+' catches · '+td+' TD (whole corps)' : '\\u00b7'; } // w52 (Owner, M14): the corps as one"
new = "return rs.length ? fmtN(ry)+' rec yds · '+rc+' catches · '+td+' TD' : '\\u00b7'; } // w52 (Owner, M14): the corps as one · w55 (Owner): the parenthetical retires"
rep(old, new, 1, 'R4 whole corps (tile card)')

# ---------- R5 · the linescore opts out of the mstack pass ----------
old = 'return `<table class="linescore"><thead><tr><th></th><th>1</th>'
new = 'return `<table class="linescore" data-nostack="1"><thead><tr><th></th><th>1</th>'
rep(old, new, 1, 'R5 linescore nostack')

# ---------- R6 · remember the tab in localStorage (the small save) ----------
old = """ }); // w46b: the swipe nav centers the tab you chose (touch only)
 }catch(e){}
 try{ if(viewId==='viewRankings')"""
new = """ }); // w46b: the swipe nav centers the tab you chose (touch only)
 }catch(e){}
 try{ if(document.readyState!=='loading'){ localStorage.setItem('zpb:tab', viewId+'|'+btnId); } }catch(e){} // w55 (Owner): a refresh comes back to the tab you were on — boot-time defaults (still parsing) never clobber the saved tab
 try{ if(viewId==='viewRankings')"""
rep(old, new, 1, 'R6 tab persistence (save)')

# ---------- R7 · restore the tab at boot (the LAST script of the body — after the mstack IIFE's
# own setActiveTab('viewDraft') default, so nothing overrides the restore) ----------
old = """</script>
</body>"""
new = """</script>
<script id="zpb-w55-restore">
// w55 (Owner): small localStorage — a refresh lands on the tab you left. Runs as the last body
// script so the boot's own default (SIMULATOR) can never override it; the simulator tab IS the
// default, so only the five support tabs ever restore.
(function(){
 try{
  var t = localStorage.getItem('zpb:tab');
  if(!t) return;
  var i = t.indexOf('|'); if(i < 1) return;
  var v = t.slice(0, i), b = t.slice(i+1);
  if(v && b && v !== 'viewDraft' && document.getElementById(v) && document.getElementById(b)) setActiveTab(v, b);
 }catch(e){}
})();
</script>
</body>"""
rep(old, new, 1, 'R7 tab persistence (restore script)')

# ---------- R8 · the w55 CSS (appended as the last style sheet, it wins the cascade) ----------
old = """ .zpb-replay.zpb-sb .zpb-intro-cup{opacity:1;transform:translate(-50%,0);}
 .zpb-replay.zpb-sb .zpb-intro-banner{opacity:1;}
}
</style>"""
new = """ .zpb-replay.zpb-sb .zpb-intro-cup{opacity:1;transform:translate(-50%,0);}
 .zpb-replay.zpb-sb .zpb-intro-banner{opacity:1;}
}
</style>
<style id="zpb-w55-css">
/* ================= Z-POST-BLUE W55 (the Owner's round-55) =================
   The phone pass: the draft card reads in two lines, the box score stays ONE table, the
   stars face off one per line, the SB champion name centers, and the page can never be
   panned by a wide child again. Desktop is untouched except where named. */

/* 1 · the wrap never shrinks-to-fit its widest child — body is a flex column and the auto
   margins let .wrap size to min-content; the preview's star face-off row needed ~530px and
   panned the document 221px at 390px. Small windows only: a wide window may still scroll
   sideways so the whole footer stays reachable (the B4 law). */
@media (max-width:1024px){ .wrap{width:100%;} }

/* 2 · THE BOX SCORE IS ONE TABLE — the generic phone law (display:block) split the linescore
   into anonymous tables (two panels, the quarters running down the side). The desktop shape
   returns, compact: one table, the quarters across. */
@media (max-width:760px){
 table.linescore{display:table;min-width:0;width:100%;font-size:.72rem;}
 table.linescore th,table.linescore td{padding:4px 4px;}
 table.linescore td:first-child,table.linescore th:first-child{padding-left:8px;}
 table.zpb-tsstat{display:table;width:100%;font-size:.74rem;}
 table.zpb-tsstat td,table.zpb-tsstat th{padding:5px 4px;}
}

/* 3 · THE DRAFT CARD READS IN TWO LINES — name · OVR · Draft, then one quiet stat line.
   The mini field labels retire on the phone; the values' order carries them (the desktop
   board keeps its full table). */
@media (max-width:760px){
 #draftTable2 tr{row-gap:1px;padding:5px 8px;}
 #draftTable2 td[data-label]::before{display:none;}
 #draftTable2 td{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
 #draftTable2 td.dc-name{grid-column:1/8;grid-row:1;font-size:.88rem;align-self:center;}
 #draftTable2 td.dc-ovr{grid-column:8/10;grid-row:1;font-size:.9rem;padding:1px 0 !important;}
 #draftTable2 .zpb-ovrstack{gap:1px;}
 #draftTable2 td.dc-btn{grid-column:10/13;grid-row:1;text-align:right !important;}
 #draftTable2 td.dc-btn button{padding:4px 9px;font-size:.72rem;max-width:100%;}
 #draftTable2 td:nth-child(2),#draftTable2 td:nth-child(3),#draftTable2 td.dc-wins,#draftTable2 td.dc-val,#draftTable2 td.dc-pri,#draftTable2 td.dc-gone,#draftTable2 td.dc-fills{grid-row:2;font-size:.6rem;padding:0 !important;min-width:0;}
 #draftTable2 td:nth-child(2){grid-column:1/2;}
 #draftTable2 td:nth-child(3){grid-column:2/4;}
 #draftTable2 td.dc-wins{grid-column:4/6;}
 #draftTable2 td.dc-val{grid-column:6/8;}
 #draftTable2 td.dc-pri{grid-column:8/10;}
 #draftTable2 td.dc-gone{grid-column:10/11;text-align:center !important;}
 #draftTable2 td.dc-fills{grid-column:11/13;text-align:right !important;}
 /* the team cell reads as one small crest + abbr on the stat line, never a stacked column */
 #draftTable2 td[data-label="Team"] .zpb-teamcol{flex-direction:row;gap:3px;}
 #draftTable2 td[data-label="Team"] img{max-height:12px;max-width:20px;object-fit:contain;}
 /* the cards view: the name leads, one narr line under it, the pick column rides right, the bar retires */
 #draftCards .prow{grid-template-columns:minmax(0,1fr) auto auto;gap:6px;}
 #draftCards .prow .mbar{display:none;}
 #draftCards .prow>div:first-child{min-width:0;}
 #draftCards .prow .narr{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
}

/* 4 · THE STARS FACE OFF ONE PER LINE on the phone — the paired cards' min-content (~530px)
   stretched the whole page AND bunched the rating number on the position badge. One per line
   the header breathes and the rating rides right; the review's Key Players lead with the name,
   the stat chips wrap below — no mid-word breaks. */
@media (max-width:640px){
 .zpb-pvfrow{grid-template-columns:1fr !important;}
 .zpb-pvcard .zpb-pcard-hd{min-width:0;}
 .kp-grid .zpb-pvcard{flex-wrap:wrap;}
 .kp-grid .zpb-pvcard .zpb-pcard-hd{flex:1 1 100%;}
 .kp-grid .zpb-pvcard .zpb-pcard-stats{flex:1 1 100%;justify-content:flex-start;margin-top:2px;}
}

/* 5 · THE SUPER BOWL CHAMPION NAME CENTERS — the crest stacks above the wordmark on the phone,
   so a long Cinzel name can never drag the pair off-center (the storm AND the banner). */
@media (max-width:740px){
 .zpb-sbfin-champ{flex-direction:column;gap:8px;}
 .zpb-sbfin-champ img{width:60px;height:60px;}
 .zpb-sbfin-name{font-size:clamp(1.35rem,7vw,2.3rem);letter-spacing:.06em;}
 .zpb-sbfin-stage{padding:20px 12px;}
 .zpb-sbfin-crests{gap:14px;} .zpb-sbfin-crests img{width:50px;height:50px;}
 .zpb-sbfin-score{gap:9px;} .zpb-sbfin-score b{font-size:1.12rem;}
 .zpb-champ-team{flex-direction:column;gap:6px;}
 .zpb-champ-name{font-size:1.35rem;}
}

/* 6 · the preview strip squeezes instead of panning on the narrowest phones */
@media (max-width:360px){
 .zpb-strip{gap:6px;}
 .zpb-strip-team b{font-size:.72rem;}
 .zpb-strip-bar{width:80px;}
 .zpb-strip-pct{font-size:.9rem;}
}
</style>"""
rep(old, new, 1, 'R8 w55 CSS block')

open(SRC, 'w', encoding='utf-8').write(html)
print('written:', len(html), 'bytes (delta %+d)' % (len(html)-n0))

# ---------- post-checks ----------
checks = [
 ('w55 css present', 'zpb-w55-css' in html),
 ('restore script present', 'zpb-w55-restore' in html),
 ('linescore nostack', 'class="linescore" data-nostack="1"' in html),
 ('no whole corps left', '(whole corps)' not in html),
 ('dime picker mounted', 'select data-lineup="CB4"' in html),
 ('tab save line', "localStorage.setItem('zpb:tab'" in html),
 ('tab restore line', "localStorage.getItem('zpb:tab')" in html),
 ('honors lead (comment)', 'the honors lead the rail' in html),
 ('wrap width rule', '.wrap{width:100%;}' in html),
 ('pvfrow single col', '.zpb-pvfrow{grid-template-columns:1fr !important;}' in html),
 ('sbfin stack rule', '.zpb-sbfin-champ{flex-direction:column;gap:8px;}' in html),
]
bad = [n for n, okc in checks if not okc]
for n, okc in checks: print(('ok   ' if okc else 'FAIL ') + n)
if bad: sys.exit(1)
print('zpb_w55: all replacements + post-checks passed')
