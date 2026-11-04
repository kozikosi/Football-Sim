#!/usr/bin/env python3
# w33_patch1.py — wave 33 stage 1: footer theme button (R1), team-detail strength/weakness
# badges (R9), comparison dropdowns + compressed labels + Team B alignment (R10), RUSH/PASS
# (R21), caution modal flip (R23), streak badge (R25), box score F (R30), preview strip team
# colors (R33), K/P 80+ preview rule (R22b), NEW DRAFT three doors (R40).
import sys, hashlib

SRC = '/home/z/my-project/scripts/w33_stage0.html'
DST = '/home/z/my-project/scripts/w33_stage1.html'

E = []
def add(old, new, n=1):
    E.append((old, new, n))

# ---------- R1 · the LIGHT/DARK button: fixed to the bottom-center of the window, every screen ----------
add(
"""<nav class="footnav zpb-footnav" aria-label="More tools"><button class="footlink active" id="tabDraftBtn">SIMULATOR</button><button class="footlink" id="tabRankingsBtn">MADDEN RANKINGS</button><button class="footlink" id="tabPlayersBtn">PLAYER BROWSER</button><button class="footlink" id="tabGroupsBtn">POSITION RANKINGS</button><button class="footlink" id="tabCompareBtn">TEAM COMPARISON</button><button class="footlink" id="tabGuideBtn">GUIDE</button></nav><div class="zpb-foottheme"><button class="footlink" id="themeToggleBtn" title="Switch light / dark">DARK</button></div>""",
"""<nav class="footnav zpb-footnav" aria-label="More tools"><button class="footlink active" id="tabDraftBtn">SIMULATOR</button><button class="footlink" id="tabRankingsBtn">MADDEN RANKINGS</button><button class="footlink" id="tabPlayersBtn">PLAYER BROWSER</button><button class="footlink" id="tabGroupsBtn">POSITION RANKINGS</button><button class="footlink" id="tabCompareBtn">TEAM COMPARISON</button><button class="footlink" id="tabGuideBtn">GUIDE</button></nav><div class="zpb-foottheme"><button class="footlink" id="themeToggleBtn" title="Switch light / dark">DARK</button></div>
<style id="zpb-w33-css">
/* w33 (R1): the LIGHT/DARK button lives centered under the footer, on every screen,
   pinned to the bottom-center of the window so it is always visible */
.zpb-foottheme{display:flex;justify-content:center;margin:10px auto 0;padding-bottom:4px;}
#themeToggleBtn{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(8px + env(safe-area-inset-bottom,0px));z-index:60;margin:0;
 background:var(--panel);border:1px solid var(--border);border-radius:999px;box-shadow:0 2px 10px rgba(0,0,0,.18);
 padding:7px 20px;font-family:'Cinzel Decorative',serif;letter-spacing:.16em;font-size:.72rem;color:var(--sub);}
#themeToggleBtn:hover{color:var(--text);border-color:var(--accent);}
/* w33 (R10): the comparison dropdowns fit the full team names; Team B hugs the far right */
.zpb-cmp-filters{display:flex;gap:12px;align-items:flex-end;justify-content:space-between;}
.zpb-cmp-filters label{flex:1 1 340px;min-width:0;}
.zpb-cmp-filters label.zpb-cmp-b{display:flex;align-items:flex-end;}
.zpb-cmp-filters select{width:100%;min-width:200px;max-width:100%;}
.zpb-cmp-filters label.zpb-cmp-b{margin-left:auto;text-align:right;}
.zpb-cmp-filters label.zpb-cmp-b select{margin-left:auto;}
@media (max-width:640px){ .zpb-cmp-filters{flex-direction:column;align-items:stretch;} .zpb-cmp-filters label.zpb-cmp-b{margin-left:0;text-align:left;} }
/* w33 (R9): the team-detail strengths and weaknesses wear badges, not sentences */
.zpb-sw-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(215px,1fr));gap:9px;margin:6px 0 10px;}
.zpb-swbadge{display:flex;gap:9px;align-items:center;border:1px solid var(--border);border-radius:13px;background:var(--panel2);padding:8px 11px;}
.zpb-swbadge .zpb-sw-rank{font-family:'Cinzel Decorative',serif;font-weight:900;font-size:1.15rem;min-width:2.6ch;text-align:center;}
.zpb-swbadge.zpb-sw-good{border-color:color-mix(in srgb,var(--good,var(--accent)) 55%,var(--border));}
.zpb-swbadge.zpb-sw-good .zpb-sw-rank{color:var(--good,var(--accent));}
.zpb-swbadge.zpb-sw-bad{border-color:color-mix(in srgb,var(--bad,var(--accent2)) 55%,var(--border));}
.zpb-swbadge.zpb-sw-bad .zpb-sw-rank{color:var(--bad,var(--accent2));}
.zpb-swbadge .zpb-sw-body{display:flex;flex-direction:column;min-width:0;}
.zpb-swbadge .zpb-sw-body b{font-size:.8rem;}
.zpb-swbadge .zpb-sw-body i{font-style:normal;font-size:.66rem;color:var(--sub);}
/* w33 (R40): the three doors of the NEW DRAFT modal reuse the try-again law */
.zpb-again-box h4{margin:.2em 0 .6em;font-family:'Cinzel Decorative',serif;letter-spacing:.12em;}
/* w33 (R22b): the preview strip honors the K/P 80+ rule — the bar wears both team colors */
.zpb-strip-bar{background:color-mix(in srgb,var(--th1,var(--accent)) 30%,var(--panel2));}
.zpb-strip-bar i{background:var(--ta1,var(--accent));opacity:.92;}
</style>""")

# ---------- R9 · strengths / weaknesses as badge cards ----------
add(
""" let strengthItems = strengths.length
  ? strengths.map(m=>`<p class="detail-item"><b>${m.label}</b> \u2014 ranked #${m.rank} in the league, led by ${m.top[0] ? m.top[0][0] : 'a thin room'}.</p>`).join('')
  : `<p class="detail-item">No unit cracks the league top 8.</p>`;
 let weaknessItems = weaknesses.length
  ? weaknesses.map(m=>`<p class="detail-item zpb-leadline"><b>#${m.rank}</b> ${m.label}</p>`).join('')
  : `<p class="detail-item">No glaring bottom-tier weakness.</p>`;""",
""" // w33 (R9, Owner): the strengths and weaknesses wear badge cards in the same spot — no more stacked sentences
 let strengthItems = strengths.length
  ? `<div class="zpb-sw-grid">` + strengths.map(m=>`<div class="zpb-swbadge zpb-sw-good"><span class="zpb-sw-rank">#${m.rank}</span><span class="zpb-sw-body"><b>${m.label}</b><i>led by ${m.top[0] ? m.top[0][0] : 'a thin room'}</i></span></div>`).join('') + `</div>`
  : `<div class="zpb-sw-grid"><div class="zpb-swbadge"><span class="zpb-sw-body"><b>No unit cracks the league top 8</b></span></div></div>`;
 let weaknessItems = weaknesses.length
  ? `<div class="zpb-sw-grid">` + weaknesses.map(m=>`<div class="zpb-swbadge zpb-sw-bad"><span class="zpb-sw-rank">#${m.rank}</span><span class="zpb-sw-body"><b>${m.label}</b><i>a bottom-tier unit this year</i></span></div>`).join('') + `</div>`
  : `<div class="zpb-sw-grid"><div class="zpb-swbadge"><span class="zpb-sw-body"><b>No glaring bottom-tier weakness</b></span></div></div>`;""")

# ---------- R21 · Rush att / dropbacks -> RUSH/PASS ----------
add("""['Rush att / dropbacks', g.detail?`${g.detail.away.plays.rush}/${g.detail.away.plays.pass}`:'\u2014', g.detail?`${g.detail.home.plays.rush}/${g.detail.home.plays.pass}`:'\u2014']""",
    """['RUSH/PASS', g.detail?`${g.detail.away.plays.rush}/${g.detail.away.plays.pass}`:'\u2014', g.detail?`${g.detail.home.plays.rush}/${g.detail.home.plays.pass}`:'\u2014']""")

# ---------- R23 · the caution gate: CANCEL left, YES right, "YES · SIMULATE THE SEASON" ----------
add(
"""   + '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">'
   + '<button class="tabbtn" data-ss="no">Cancel</button>'
   + '<button class="resetbtn" data-ss="yes" style="width:auto;margin:0;padding:8px 18px;">Yes \\u2014 simulate the season</button>'
   + '</div></div>';""",
"""   + '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">'
   + '<button class="resetbtn" data-ss="yes" style="width:auto;margin:0;padding:8px 18px;order:2;">YES \\u00b7 SIMULATE THE SEASON</button>' // w33 (R23, Owner): the YES door sits on the right, spelled out
   + '<button class="tabbtn" data-ss="no" style="order:1;">Cancel</button>'
   + '</div></div>';""")

# ---------- R25 · the win-streak badge reads just the number ----------
add("""  sk.best.W.n>=3 ? badge('WIN STREAK', sk.best.W.n+' \u00b7 W'+sk.best.W.s+'\u2013'+sk.best.W.e, 'zpb-sb-good') : (sk.best.L.n>=3 ? badge('LOSING STREAK', sk.best.L.n+' \u00b7 W'+sk.best.L.s+'\u2013'+sk.best.L.e, 'zpb-sb-bad') : null),""",
    """  sk.best.W.n>=3 ? badge('WIN STREAK', String(sk.best.W.n), 'zpb-sb-good') : (sk.best.L.n>=3 ? badge('LOSING STREAK', String(sk.best.L.n), 'zpb-sb-bad') : null), // w33 (R25, Owner): the streak badge reads just the number""")

# ---------- R30 · the box score reads F for final, never T ----------
add("""${hasOT?'<th>OT</th>':''}<th>T</th></tr></thead>""",
    """${hasOT?'<th>OT</th>':''}<th>F</th></tr></thead>""") # w33 (R30, Owner): F for final

# ---------- R29 · the OT column carries only the overtime points ----------
add("""function renderLineScoreHTML(g){
 const r = g.result;
 const row = (name, q, tot)=>`<tr><td>${name}</td>${q.slice(0, r.ot?5:4).map(x=>`<td class="score">${x||0}</td>`).join('')}<td class="score" style="font-weight:800;">${tot}</td></tr>`;
 const hasOT = !!r.ot;
 return `<table class="linescore"><thead><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th>${hasOT?'<th>OT</th>':''}<th>F</th></tr></thead><tbody>${row(g.away, r.awayQ, r.awayScore)}${row(g.home, r.homeQ, r.homeScore)}</tbody></table>`;
}""",
"""function renderLineScoreHTML(g){
 const r = g.result;
 // w33 (R29, Owner): the OT column shows what each team scored in overtime only \u2014 never the running total
 const otOf = (q, tot, q4)=>{ if(!r.ot) return 0; const listed = q.slice(4).reduce((s,x)=>s+(x||0),0); return listed>0 ? listed : Math.max(0, tot-q4); };
 const row = (name, q, tot)=>{ const q4 = (q[3]||0); const cells = q.slice(0, r.ot?5:4).map(x=>`<td class="score">${x||0}</td>`).join('');
  const otCell = r.ot ? `<td class="score">${otOf(q, tot, q4)}</td>` : ''; return `<tr><td>${name}</td>${cells}${otCell}<td class="score" style="font-weight:800;">${tot}</td></tr>`; };
 const hasOT = !!r.ot;
 return `<table class="linescore"><thead><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th>${hasOT?'<th>OT</th>':''}<th>F</th></tr></thead><tbody>${row(g.away, r.awayQ, r.awayScore)}${row(g.home, r.homeQ, r.homeScore)}</tbody></table>`;
}""")

# ---------- R33 · the 52/48 bar wears each team's colors on its own side ----------
add(
"""  return '<div class="zpb-strip">'
   + '<div class="zpb-strip-team" style="'+stA+'">'+lg(g.away)+'<div><span class="narr">model '+ap.toFixed(1)+'</span></div></div>'
   + '<div class="zpb-strip-bar"><i style="width:'+(pw*100).toFixed(1)+'%;"></i><span>'+Math.round((1-pw)*100)+'% \\u2013 '+Math.round(pw*100)+'%</span></div>'
   + '<div class="zpb-strip-team zpb-strip-h" style="'+stH+'"><div style="text-align:right;"><span class="narr">model '+hp.toFixed(1)+'</span></div>'+lg(g.home)+'</div>'
   + '</div>'""",
"""  // w33 (R33, Owner): the bar splits in the two teams' colors \u2014 the away color fills from the left, the home color owns the rest
  const _pkH = (typeof zpbPackFor==='function') ? zpbPackFor(g.home) : null;
  const _pkA = (typeof zpbPackFor==='function') ? zpbPackFor(g.away) : null;
  const _dk = document.documentElement.getAttribute('data-theme');
  const _dark = _dk==='dark' || (!_dk && !(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches));
  const _lift = (c)=>{ try{ return (_dark && window.zpbLift) ? window.zpbLift(c, 0.62) : c; }catch(e){ return c; } };
  const _cA = _pkA ? _lift(_dark ? _pkA.accL : _pkA.accD) : 'var(--accent)';
  const _cH = _pkH ? _lift(_dark ? _pkH.accL : _pkH.accD) : 'var(--accent2, var(--rose))';
  return '<div class="zpb-strip">'
   + '<div class="zpb-strip-team" style="'+stA+'">'+lg(g.away)+'<div><span class="narr">model '+ap.toFixed(1)+'</span></div></div>'
   + '<div class="zpb-strip-bar" style="--th1:'+_cH+';"><i style="width:'+(pw*100).toFixed(1)+'%;--ta1:'+_cA+';"></i><span>'+Math.round((1-pw)*100)+'% \\u2013 '+Math.round(pw*100)+'%</span></div>'
   + '<div class="zpb-strip-team zpb-strip-h" style="'+stH+'"><div style="text-align:right;"><span class="narr">model '+hp.toFixed(1)+'</span></div>'+lg(g.home)+'</div>'
   + '</div>'""")

# ---------- R22b · a kicker or punter shows on the game-preview face-off only at 80+ ----------
add(
"""  return ROSTER_SLOTS.map(sl=>{ const e = effEntry(sm, sl); return e ? {slot:sl, name:e.name, ovr:e.ovr} : null; }).filter(x=>x && x.ovr>=85).sort((x,y)=>y.ovr-x.ovr).slice(0,9);""",
"""  return ROSTER_SLOTS.map(sl=>{ const e = effEntry(sm, sl); return e ? {slot:sl, name:e.name, ovr:e.ovr} : null; })
   .filter(x=>x && x.ovr>=85)
   .filter(x=>{ const _g = SLOT_GROUP[x.slot]; if(_g!=='K') return true; return x.ovr>=80; }) // w33 (R22b, Owner): a kicker or punter must be 80+ to appear on the preview
   .sort((x,y)=>y.ovr-x.ovr).slice(0,9);""")

# ---------- R10 · the comparison labels: full name wide, "KC CHIEFS" compressed; never city-only ----------
add(
""" function buildOptions(sel, defaultVal){
  const n = t=> t; // w30 (Owner): the full team name at every width \u2014 "Kansas City Chiefs", never "Kansas City" \u2014 and the menu is wide enough for the longest name""",
""" function buildOptions(sel, defaultVal){
  const n = t=> t; // w30 (Owner): the full team name at every width \u2014 "Kansas City Chiefs", never "Kansas City" \u2014 and the menu is wide enough for the longest name
  // w33 (R10, Owner): the CLOSED box shows the full name when there is room and "KC CHIEFS" when the window is tight \u2014 never the bare city""")

add(
""" { // w29 (Owner): crossing the width threshold repaints the labels, selection preserved
  const zpbCmpRelabel = ()=>{ const va = selA.value, vb = selB.value; selA.innerHTML=''; selB.innerHTML=''; buildOptions(selA, va); buildOptions(selB, vb); };
  selA._zpbRelabel = zpbCmpRelabel; selB._zpbRelabel = zpbCmpRelabel;
 }""",
""" { // w29 (Owner): crossing the width threshold repaints the labels, selection preserved
  const zpbCmpRelabel = ()=>{ const va = selA.value, vb = selB.value; selA.innerHTML=''; selB.innerHTML=''; buildOptions(selA, va); buildOptions(selB, vb); };
  selA._zpbRelabel = zpbCmpRelabel; selB._zpbRelabel = zpbCmpRelabel;
 }
 // w33 (R10, Owner): the CLOSED dropdown reads "KC CHIEFS" when the panel is tight \u2014 the opened menu always carries the full name
 (function(){
  const abbrOf = t=>{ try{ const m = (typeof TEAM_ABBR!=='undefined') ? TEAM_ABBR[t] : null; return (m || nick(t)).toUpperCase(); }catch(e){ return t; } };
  const shortName = t=>{ const w = String(t).split(' '); return (abbrOf(t).length<=3 ? abbrOf(t) : w[0].slice(0,3).toUpperCase()) + ' ' + nick(t).toUpperCase(); };
  const paint = ()=>{
   try{
    const tight = window.innerWidth < 760;
    [selA, selB].forEach(sel=>{
     const full = sel.options[sel.selectedIndex] ? sel.options[sel.selectedIndex].textContent : '';
     const raw = full.replace(/ \\((sim|actual|your draft)\\)$/i, '').replace(/^Your Team \\(/,'').replace(/\\)$/,'');
     if(tight && sel.options[sel.selectedIndex] && !sel.options[sel.selectedIndex].dataset.full){
      const team = sel.value.startsWith('SIM:') ? sel.value.slice(4) : sel.value.startsWith('NFL:') ? sel.value.slice(4) : (raw.replace(/^Your Team /,'') || raw);
      sel.options[sel.selectedIndex].dataset.full = full;
      sel.options[sel.selectedIndex].textContent = shortName(team) + (full.includes('(sim)')?' (sim)':full.includes('(actual)')?' (actual)':'');
     } else if(sel.options[sel.selectedIndex] && sel.options[sel.selectedIndex].dataset.full){
      sel.options[sel.selectedIndex].textContent = sel.options[sel.selectedIndex].dataset.full; delete sel.options[sel.selectedIndex].dataset.full;
     }
    });
   }catch(err){}
  };
  let t = null; window.addEventListener('resize', ()=>{ clearTimeout(t); t = setTimeout(paint, 180); }); paint();
 })();""")

# ---------- R40 · NEW DRAFT opens the three doors ----------
add(
"""function wireSeasonOptions(container){
 const a = document.getElementById('restartSeasonBtn'), b = document.getElementById('newDraftFromSeasonBtn');
 if(a) a.addEventListener('click', ()=> zpbCaution('Yes, start a new season', ()=>{ startSeason(); renderSeasonTab(container); }));
 if(b) b.addEventListener('click', ()=> zpbCaution('Yes, start a new draft', startNewDraftFlow));
}""",
"""function wireSeasonOptions(container){
 const a = document.getElementById('restartSeasonBtn'), b = document.getElementById('newDraftFromSeasonBtn');
 if(a) a.addEventListener('click', ()=> zpbCaution('Yes, start a new season', ()=>{ startSeason(); renderSeasonTab(container); }));
 if(b) b.addEventListener('click', ()=>{
  // w33 (R40, Owner): NEW DRAFT presents the three doors \u2014 RUN IT BACK \\u00b7 SAME TEAM / CALL AN AUDIBLE \\u00b7 NEW TEAM / CANCEL
  const ov = document.createElement('div'); ov.className = 'confirm-ov';
  ov.innerHTML = '<div class="confirm-box zpb-again-box" style="text-align:center;">'
   + '<h4 style="margin-top:0;">NEW DRAFT</h4>'
   + '<p class="narr" style="margin-top:0;">Three doors, one choice.</p>'
   + '<div style="display:flex;flex-direction:column;gap:10px;align-items:stretch;">'
   + '<button class="resetbtn zpb-again-btn" data-nd="runitback" style="width:auto;margin:0;padding:11px 18px;">RUN IT BACK <span class="zpb-again-dot">\\u00b7</span> SAME TEAM</button>'
   + '<button class="resetbtn zpb-again-btn" data-nd="audible" style="width:auto;margin:0;padding:11px 18px;">CALL AN AUDIBLE <span class="zpb-again-dot">\\u00b7</span> NEW TEAM</button>'
   + '<button class="tabbtn zpb-again-btn" data-nd="cancel">Cancel</button>'
   + '</div></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click', ev=>{
   const t = ev.target.closest ? ev.target.closest('[data-nd]') : null;
   if(!t && ev.target!==ov) return;
   const act = t ? t.dataset.nd : 'cancel';
   ov.remove();
   if(act==='runitback'){ try{ zpbCaution('Yes, start a new season', ()=>{ startSeason(); renderSeasonTab(container); }); }catch(err){} }
   else if(act==='audible'){ startNewDraftFlow(); }
  });
 });
}""")

def main():
    src = open(SRC, encoding='utf-8').read()
    for i, (old, new, n) in enumerate(E):
        c = src.count(old)
        if c != n:
            print(f'FAIL entry {i}: expected {n} match(es), found {c}')
            print('--- snippet head ---')
            print(old[:220])
            sys.exit(1)
        src = src.replace(old, new)
    open(DST, 'w', encoding='utf-8').write(src)
    print('w33_patch1 OK ->', DST, len(src), 'bytes')

if __name__ == '__main__':
    main()
