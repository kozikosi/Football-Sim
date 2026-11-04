#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ZPB wave-13 patch module (W13-1..20). Every replacement is asserted before use."""

EXACT = []   # (name, old, new, count)
REGEX = []   # (name, pattern, replacement, flags, count)
CUTS  = []   # (name, start_marker, end_marker, replacement, keep_markers=True)  — marker-bounded rewrite

def ex(name, old, new, count=1):
    EXACT.append((name, old, new, count))

def rx(name, pat, new, count=1, flags=0):
    REGEX.append((name, pat, new, flags, count))

def cut(name, start, end, new, keep=True):
    CUTS.append((name, start, end, new, keep))

# ============================================================ W13-7 draft-board cluster
ex("nxpick parens off",
   """npEl.textContent = nx>=0 ? '('+(Math.floor(nx/32)+1)+'.'+((nx%32)+1)+')' : '';""",
   """npEl.textContent = nx>=0 ? (Math.floor(nx/32)+1)+'.'+((nx%32)+1) : '';""")

ex("ticker drop (#overall)",
   """R${p.round}.${String(p.pickInRound).padStart(2,'0')} (#${p.overall}) · """,
   """R${p.round}.${String(p.pickInRound).padStart(2,'0')} · """)

ex("all/none centered wrap",
   """<span class="chip" data-all="1"><span>all</span></span><span class="chip" data-none="1"><span>none</span></span></div>""",
   """<span class="zpb-allnone"><span class="chip" data-all="1"><span>all</span></span><span class="chip" data-none="1"><span>none</span></span></span></div>""")

# ============================================================ W13-2 base defense toggle
ex("4-3 hover title",
   """<button type="button" data-zbase="43" class="${on?'':'zpb-base-on'}">4-3</button>""",
   """<button type="button" data-zbase="43" title="4 Defensive Linemen · 3 Linebackers" class="${on?'':'zpb-base-on'}">4-3</button>""")

ex("3-4 hover title",
   """<button type="button" data-zbase="34" class="${on?'zpb-base-on':''}">3-4</button>""",
   """<button type="button" data-zbase="34" title="3 Defensive Linemen · 4 Linebackers" class="${on?'zpb-base-on':''}">3-4</button>""")

ex("adj-spec cache key fixed (base-state aware)",
   """const key = name + ':' + (window._zpbAdjCache = window._zpbAdjCache || {});""",
   """const key = name + ':' + (window.ZPB34?'34':'43') + ':' + JSON.stringify(spec);""")

ex("adj-spec cache cleared on toggle",
   """window.zpbToggleBase34 = function(on){\n window.ZPB34 = !!on;""",
   """window.zpbToggleBase34 = function(on){\n window._zpbAdjCache = {};\n window.ZPB34 = !!on;""")

rx("3-4 note sentence deleted (toggle)",
   r"if\(note\) note\.textContent = on\s*\?\s*'3-4 front:[^']+'\s*:\s*'4-3 front:[^']+';",
   "if(note) note.textContent = '';")

rx("3-4 note sentence deleted (default fill)",
   r"if\(note\) note\.textContent = window\.ZPB34 \? '' : '4-3 front:[^']+';",
   "if(note) note.textContent = '';")

# ============================================================ W13-3 weights three-state buttons
rx("weights handlers rebuilt",
   r"document\.getElementById\('modelWBtn'\)\.addEventListener\('click', \(\)=>\{ if\(JSON\.stringify\(weights\)!==JSON\.stringify\(modelWeights\(\)\)\) personalWeights = \{\.\.\.weights\}; weights = modelWeights\(\); refresh\(\); \}\);\s*document\.getElementById\('personalWBtn'\)\.addEventListener\('click', \(\)=>\{ weights = \{\.\.\.\(personalWeights\|\|DEFAULT_WEIGHTS\)\}; refresh\(\); \}\);",
   """document.getElementById('modelWBtn').addEventListener('click', ()=>{ weights = modelWeights(); refresh(); if(typeof zpbWeights3State==='function') zpbWeights3State('model'); });
 document.getElementById('personalWBtn').addEventListener('click', ()=>{ if(!window.zpbWDirty) return; personalWeights = {...weights}; window.zpbWDirty = false; if(typeof zpbWeights3State==='function') zpbWeights3State('saved'); });
 if(typeof zpbWeights3State==='function') zpbWeights3State(personalWeights ? 'saved' : 'init');""")

# ============================================================ W13-1 series dropdown
ex("series select injected into controls",
   """h += `<div class="totalwt" id="totalwt"></div>`;""",
   """h += (window.zpbSeriesSelectHTML ? zpbSeriesSelectHTML() : '');  h += `<div class="totalwt" id="totalwt"></div>`;""")

# ============================================================ W13-4 welcome-to-the-draft cinematic
ex("welcome cine hook",
   """function startDraft2(){\n draftUI = newDraftUI();""",
   """function startDraft2(){\n window._zpbWelDone = false; try{ if(typeof zpbWelcomeCine==='function') zpbWelcomeCine(); }catch(err){}\n draftUI = newDraftUI();""")

# ============================================================ W13-5 finish-cine timing + one-line layout
ex("finish cine row layout",
   """const ov = document.createElement('div');\n ov.className = 'zpb-fin';""",
   """const ov = document.createElement('div');\n ov.className = 'zpb-fin zpb-fin-row';""")

ex("finish cine q class",
   """lines.forEach(t=>{ const p = document.createElement('p'); p.innerHTML = t; ov.appendChild(p); });""",
   """lines.forEach((t,li)=>{ const p = document.createElement('p'); p.innerHTML = t; if(li===lines.length-1) p.classList.add('zpb-fin-q'); ov.appendChild(p); });""")  # same single-line body confirmed

rx("finish cine timing",
   r"const step = \(\)=>\{\s*if\(i>0\) ps\[i-1\]\.classList\.remove\('zpb-fin-in'\);\s*if\(i>=ps\.length\)\{\s*setTimeout\(\(\)=>\{ ov\.style\.transition='opacity 1\.6s ease'; ov\.style\.opacity='0';\s*setTimeout\(\(\)=>ov\.remove\(\), 1700\); \}, reduce \? 400 : 2600\);\s*return;\s*\}\s*ps\[i\]\.classList\.add\('zpb-fin-in'\);\s*i\+\+;\s*setTimeout\(step, reduce \? 900 : 5200\);\s*\};",
   """const hold = [1500, 1500, 2900, 3400];
  const step = ()=>{   if(i>=ps.length){    setTimeout(()=>{ ov.style.transition='opacity 1.6s ease'; ov.style.opacity='0';     setTimeout(()=>ov.remove(), 1700); }, reduce ? 400 : 3600);    return;   }   ps[i].classList.add('zpb-fin-in');   i++;   setTimeout(step, reduce ? 900 : (hold[Math.min(i-1,3)] || 3000));  };""")

# ============================================================ W13-9 during-game yardage
ex("FG yardage (both replays)",
   """(inf.kicker || 'Kicker') + ' field goal'""",
   """(inf.kicker || 'Kicker') + ' field goal, ' + (window.zpbCineYds ? zpbCineYds(e,'fg') : '')""",
   count=2)

ex("pass TD yardage (both replays)",
   """+ ' to ' + inf.recs.shift()""",
   """+ ' to ' + inf.recs.shift() + ' ' + (window.zpbCineYds ? zpbCineYds(e,'pass') : '')""",
   count=4)

ex("run TD yardage (both replays)",
   """inf.rush.shift() + ' run'""",
   """inf.rush.shift() + ' run, ' + (window.zpbCineYds ? zpbCineYds(e,'run') : '')""",
   count=2)

# ============================================================ W13-10 POTG star restyle
ex("POTG caption removed + opposite-color star",
   """+ (star ? '<span class="zpb-cstar zpb-shm" style="--zrb:'+col+'">\\u2605</span><span class="zpb-potg">PLAYER OF THE GAME</span>' : '')""",
   """+ (star ? '<span class="zpb-cstar zpb-shm" style="--zrb:'+((typeof zpbPackFor==='function'&&zpbPackFor(p.team||team))?(zpbPackFor(p.team||team).acc2L||col):col)+'">\\u2605</span>' : '')""")

# ============================================================ W13-11 draft-review thresholds
rx("verdict thresholds (visual)",
   r"r\.regret <= 0\.05 \? \['Best available', 'zpb-pv-best'\]\s*: r\.regret <= 0\.2 \? \['OK', 'zpb-pv-fine'\]\s*: \['Costly Miss', 'zpb-pv-bad'\]",
   "r.regret <= 0.05 ? ['Best available', 'zpb-pv-best'] : r.regret < 0.10 ? ['OK', 'zpb-pv-fine'] : r.regret < 0.50 ? ['Costly Miss', 'zpb-pv-bad'] : ['Giveaway', 'zpb-pv-give']")

rx("verdict thresholds (table)",
   r"r\.regret<=0\.05 \? \['Best available','var\(--good\)'\] : r\.regret<=0\.2 \? \['OK','var\(--sub\)'\] : \['Costly Miss','var\(--bad\)'\]",
   "r.regret<=0.05 ? ['Best available','var(--good)'] : r.regret<0.10 ? ['OK','var(--sub)'] : r.regret<0.50 ? ['Costly Miss','var(--bad)'] : ['Giveaway','var(--bad)']")

ex("misses chip threshold",
   """.filter(r=>r.regret > 0.2)""",
   """.filter(r=>r.regret >= 0.10)""")

# ============================================================ W13-12 only your team keeps its colors
ex("results detail owner = you only",
   """renderDepthChartHTML(e.slotmap, e.pickRounds, e.teamName)""",
   """renderDepthChartHTML(e.slotmap, e.pickRounds, e.isUser ? e.teamName : '')""")

# ============================================================ W13-13 SIM SEASON + Play-the-X between panels
ex("sim season button (both)",
   """<button class="tabbtn zpb-ctasmall" id="simSeasonBtn">Sim rest of season</button>""",
   """<button class="tabbtn zpb-ctasmall zpb-simseason" id="simSeasonBtn">SIM SEASON</button>""",
   count=2)

ex("week header split",
   """<h3 style="margin:0;">Week ${week} of 17</h3><div style="display:flex;gap:10px;flex-wrap:wrap;"><button class="resetbtn zpb-ctabig" id="simWeekBtn" style="width:auto;margin:0;padding:12px 30px;">${myGame?'Play the '+nick(myGame.home===user?myGame.away:myGame.home):'Simulate Week '+week}</button><button class="tabbtn zpb-ctasmall zpb-simseason" id="simSeasonBtn">SIM SEASON</button></div></div>`;""",
   """<h3 style="margin:0;">Week ${week} of 17</h3><div style="display:flex;gap:10px;flex-wrap:wrap;">${myGame?'':'<button class="resetbtn zpb-ctabig" id="simWeekBtn" style="width:auto;margin:0;padding:12px 30px;">Simulate Week '+week+'</button>'}<button class="tabbtn zpb-ctasmall zpb-simseason" id="simSeasonBtn">SIM SEASON</button></div></div>`;""")

rx("play-the-x row between panels",
   r"(html \+= `</div>`;\s*if\(myGame\)\{\s*const opp = myGame\.home===user \? myGame\.away : myGame\.home;)",
   """\\1
    html += '<div class="zpb-playrow"><button class="resetbtn zpb-ctabig" id="simWeekBtn" style="width:auto;margin:0;padding:12px 30px;">Play the ' + nick(myGame.home===user?myGame.away:myGame.home) + '</button></div>';""",
   count=1)

# ============================================================ W13-14 leaders text
ex("leaders rank format",
   """<p class="detail-item"><b>${m.label}</b> — #${m.rank} of 32 in the league.</p>""",
   """<p class="detail-item zpb-leadline"><b>#${m.rank}</b> ${m.label}</p>""")

# ============================================================ W13-15 flex menu names (three tiers)
rx("lineup name tiers",
   r"if\(narrow\)\{\s*const nm = o\.dataset\.full\.split\(' \\u2014 '\)\[0\]\.trim\(\)\.split\(' '\);\s*o\.textContent = nm\[nm\.length-1\];\s*\} else \{\s*o\.textContent = o\.dataset\.full;\s*\}",
   """if(window.innerWidth < 700){
     const nm = o.dataset.full.split(' \\u2014 ')[0].trim().split(' ');
     o.textContent = nm[nm.length-1];
    } else if(window.innerWidth < 1024){
     const pr = o.dataset.full.split(' \\u2014 '); const nm = (pr[0]||'').trim().split(' ');
     const last = nm[nm.length-1]; const ini = nm.length>1 ? (nm[0].charAt(0)+'. ') : '';
     o.textContent = (ini + last) + (pr.length>1 ? ' \\u2014 ' + pr.slice(1).join(' \\u2014 ') : '');
    } else {
     o.textContent = o.dataset.full;
    }""")

# ============================================================ W13-17 focus badges
rx("emph badges P+/R+/bars",
   r"const badge = kind => kind==='pass'\s*\? '<span class=\"zpb-emph\" title=\"Pass emphasis\"><i class=\"zp\"></i><i class=\"zp zp2\"></i><i class=\"zp zp3\"></i></span>'\s*: kind==='run'\s*\? '<span class=\"zpb-emph\" title=\"Run emphasis\"><i class=\"rn\"></i></span>'\s*: '<span class=\"zpb-emph\" title=\"Balanced\"><i class=\"bal\"></i></span>';",
   """const badge = kind => kind==='pass'
    ? '<span class="zpb-emph zpb-emph-b" title="Pass emphasis"><b>P+</b></span>'
    : kind==='run'
    ? '<span class="zpb-emph zpb-emph-b" title="Run emphasis"><b>R+</b></span>'
    : '<span class="zpb-emph zpb-emph-b" title="Balanced"><span class="zpb-bars"><i></i><i></i><i></i></span></span>';""")

# ============================================================ W13-18 duplicate review header
ex("review h3 dedup",
   """<h3 style="margin-top:0;">Season Review: ${user}</h3>""",
   """<h3 style="margin-top:0;">${user}</h3>""")

# ============================================================ W13-19 extra 100-seasons bubbles (live render100 = the later function declaration)
ex("100 report extra bubbles hook",
   """\n + sec('The league, by average wins', zpbLeagueBarsHTML(avgW, T, N, user), false)""",
   """\n + sec('The league, by average wins', zpbLeagueBarsHTML(avgW, T, N, user), false)
 + (window.zpb100More ? zpb100More(myW, N, mine) : '')""")

# ============================================================ W13-20 strip team names removed
ex("strip away name removed",
   """+ '<div class="zpb-strip-team" style="'+stA+'">'+lg(g.away)+'<div><b>'+g.away+'</b><span class="narr">model '+ap.toFixed(1)+'</span></div></div>'""",
   """+ '<div class="zpb-strip-team" style="'+stA+'">'+lg(g.away)+'<div><span class="narr">model '+ap.toFixed(1)+'</span></div></div>'""")

ex("strip home name removed",
   """+ '<div class="zpb-strip-team zpb-strip-h" style="'+stH+'"><div style="text-align:right;"><b>'+g.home+'</b><span class="narr">model '+hp.toFixed(1)+'</span></div>'+lg(g.home)+'</div>'""",
   """+ '<div class="zpb-strip-team zpb-strip-h" style="'+stH+'"><div style="text-align:right;"><span class="narr">model '+hp.toFixed(1)+'</span></div>'+lg(g.home)+'</div>'""")

# ============================================================ W13-6 lineup guards + row-wash lift
rx("lineupCell undefined guard",
   r"if\(Array\.isArray\(raw\)\)\{\s*const pen = flexPenaltyFor\(raw\[1\], s\), eff = raw\[3\]-pen;\s*return \{text:`\$\{e\.name\} \$\{eff\}`, val:eff\};\s*\}",
   """if(Array.isArray(raw)){
   const pen = flexPenaltyFor(raw[1], s), eff = raw[3]-pen;
   return (e && e.name!=null) ? {text:`${e.name} ${eff}`, val:eff} : {text:'—', val:70};
  }""")

rx("row wash lightness floor",
   r"return '--zr1:'\+zpbRgba\(pk\.accL,0\.12\)\+';--zr2:'\+zpbRgba\(pk\.accL,0\.03\)\+';--zr3:'\+zpbRgba\(pk\.raw\[2\],0\.10\)\+';--zrb:'\+pk\.accL\+",
   """return '--zr1:'+zpbRgba((window.zpbLift?zpbLift(pk.accL,0.58):pk.accL),0.12)+';--zr2:'+zpbRgba((window.zpbLift?zpbLift(pk.accL,0.58):pk.accL),0.03)+';--zr3:'+zpbRgba((window.zpbLift?zpbLift(pk.raw[2],0.58):pk.raw[2]),0.10)+';--zrb:'+pk.accL+""")

rx("custom dropdown text lift (Patriots-dark)",
   r"'--zaL:' \+ st\.txL \+ ';--zaD:'",
   "'--zaL:' + (window.zpbLift?zpbLift(st.txL,0.62):st.txL) + ';--zaD:'",
   count=1)

# ============================================================ W13-16 flex table -> tree
cut("flex table -> tree",
    "<table><thead><tr><th>Player</th><th>Free</th>",
    "</tbody></table>",
    "${window.zpbFlexTree ? zpbFlexTree() : ''}", False)

# ============================================================ payload anchors
ex("css payload anchor",
   """</style>\n<meta name="theme-color" content="#fcf7f1">""",
   """</style>\n<style id="zpb-w13">/*__ZPB_CSS_V13__*/</style>\n<meta name="theme-color" content="#fcf7f1">""")

ex("js payload anchor",
   """</script>\n\n</body>\n</html>""",
   """</script>\n<script id="zpb-w13">/*__ZPB_JS_V13__*/</script>\n\n</body>\n</html>""")

# ============================================================ payloads ============================================================

ZPB_CSS_V13 = r"""
/* ============ Z-POST-BLUE v13 (wave 13) ============ */
/* W13-1 ranking series dropdown */
.zpb-sessel{margin:2px 0 10px;}
.zpb-sessel select{width:100%;max-width:440px;background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:9px;padding:8px 10px;font-size:.8rem;letter-spacing:.02em;}
/* W13-3 three-state weights buttons */
.zpb-winert{opacity:.42;cursor:default;filter:saturate(.55);}
/* W13-4/5 cinematics */
.zpb-fin.zpb-fin-row{flex-wrap:wrap;gap:1.4vh 2.6vw;}
.zpb-fin.zpb-fin-row p{position:static;font-size:clamp(1rem,2.5vw,1.55rem);letter-spacing:.14em;transition:opacity 1.2s ease;}
.zpb-fin.zpb-fin-row p.zpb-fin-q{font-size:clamp(1.15rem,3vw,1.9rem);}
.zpb-fin.zpb-fin-row p.zpb-fin-q b{font-size:1.12em;}
.zpb-fin.zpb-fin-welcome p{position:absolute;font-size:clamp(1.4rem,4vw,2.4rem);}
.zpb-fin.zpb-fin-welcome p:nth-child(1){transform:translateY(-9vh);}
.zpb-fin.zpb-fin-welcome p:nth-child(3){transform:translateY(9vh);}
/* W13-7 board cluster */
.zpb-allnone{flex-basis:100%;display:flex;justify-content:center;gap:6px;margin-top:2px;}
#draftTable td.dc-pri{font-family:'Cinzel Decorative',serif;letter-spacing:.03em;}
.zpb-seg button{font-family:'Cinzel Decorative',serif;font-weight:700;letter-spacing:.05em;padding:5px 14px;}
select option{background:var(--panel);color:var(--text);}
.zpb-selopt{white-space:nowrap;}
/* W13-8 panels tighten, never expand */
.layout,.panel,.panel>div,.zpb-duel,.zpb-lu,.filters,.tabs,.depth-row,.zpb-pvrow,.zpb-strip,.cardgrid,.zpb-mu,.tablewrap{min-width:0;}
.panel{max-width:100%;}
img{max-width:100%;}
/* W13-11 worse tier */
.zpb-pv-give .zpb-pv-verdict{font-weight:800;}
/* W13-13 */
.zpb-simseason{text-transform:uppercase;letter-spacing:.09em;}
.zpb-playrow{text-align:center;margin:4px 0 14px;}
/* W13-14 */
.zpb-leadline{font-family:'Cinzel Decorative',serif;letter-spacing:.05em;}
/* W13-16 flex tree */
.zpb-flextree{list-style:none;margin:8px 0 0;padding:0;}
.zpb-flextree>li{margin:0 0 10px;}
.zpb-ftnode{font-family:'Cinzel Decorative',serif;letter-spacing:.05em;font-size:.86rem;color:var(--tA2,var(--gold3));}
.zpb-flextree ul{list-style:none;margin:4px 0 0;padding:0 0 0 18px;border-left:1px solid var(--rosehair);}
.zpb-flextree ul li{margin:3px 0;}
.zpb-ftchip{display:inline-block;padding:2px 10px;border-radius:999px;font-size:.7rem;font-weight:700;letter-spacing:.03em;}
.zpb-ft-free{background:color-mix(in srgb,var(--good,var(--accent)) 16%,transparent);color:var(--good,var(--accent));border:1px solid color-mix(in srgb,var(--good,var(--accent)) 45%,transparent);}
.zpb-ft-2{background:var(--glass,transparent);color:var(--text);border:1px solid var(--rosehair,var(--border));}
.zpb-ft-4{background:color-mix(in srgb,var(--bad,var(--accent2)) 12%,transparent);color:var(--text);border:1px solid color-mix(in srgb,var(--bad,var(--accent2)) 35%,transparent);}
.zpb-ft-6{background:color-mix(in srgb,var(--bad,var(--accent2)) 20%,transparent);color:var(--bad,var(--text));border:1px solid color-mix(in srgb,var(--bad,var(--accent2)) 55%,transparent);}
/* W13-17 focus badges */
.zpb-emph-b b{font-size:.66rem;font-weight:800;letter-spacing:.08em;}
.zpb-bars{display:inline-flex;gap:2px;align-items:center;}
.zpb-bars i{width:3px;height:11px;border-radius:1px;background:currentColor;display:inline-block;}
/* W13-19 */
.zpb-100hero2{margin-top:10px;}
/* ============ end v13 ============ */
"""

ZPB_JS_V13 = r"""
// ================= Z-POST-BLUE v13 (wave 13) =================
// helpers first: palette lightness lift + deterministic display yardage
window.zpbLift = function(hex, minL){
 try{
  const c = zpbHsl(hex);
  if(!c || c.l >= minL) return hex;
  return zpbFromHsl(c.h, c.s, minL);
 }catch(err){ return hex; }
};
// W13-9: "x yds" for the cinematic replay — display-only, deterministic per event
window.zpbCineYds = function(e, kind){
 try{
  const seed = ((e.q||1)*97 + Math.round((e.t||0)*1000) + (e.side==='home'?7:13) + (e.pts||0)*31) % 997;
  const r = (seed % 1000) / 1000;
  if(kind==='fg')   return (19 + Math.floor(r*35)) + ' yds';
  if(kind==='run')  return (1 + Math.floor(Math.pow(r,1.6)*70)) + ' yds';
  return (3 + Math.floor(Math.pow(r,1.35)*78)) + ' yds';
 }catch(err){ return ''; }
};
// W13-1: the Owner's 26-step cumulative series as ranking entries (P and FB sit outside it)
window.zpbSeriesSteps = function(){
 if(typeof slotWins !== 'function' || typeof ROSTER_SLOTS === 'undefined') return [];
 const SKIP = {P:1, FB:1};
 const rows = ROSTER_SLOTS.filter(s=>!SKIP[s]).map(s=>({s, w: slotWins(s,90)-slotWins(s,70)}))
   .filter(r=>r.w>0.001).sort((a,b)=>b.w-a.w);
 let acc = [];
 return rows.map((r,i)=>{
  acc.push((typeof LABELS!=='undefined' && LABELS[r.s]) || r.s);
  return {n:i+1, slots: rows.slice(0,i+1).map(x=>x.s), label: acc.join(' + ')};
 });
};
window.zpbSeriesSelectHTML = function(){
 const steps = window.zpbSeriesSteps();
 if(!steps.length) return '';
 window.__zpbSeriesSteps = steps;
 let h = '<div class="zpb-sessel"><select id="zpbSeriesSel" aria-label="Ranking series">';
 h += '<option value="all">MODEL · ALL SLOTS</option>';
 steps.forEach(st=>{ h += '<option value="'+st.n+'">'+st.n+' '+st.label+'</option>'; });
 return h + '</select></div>';
};
document.addEventListener('change', e=>{
 const sel = e.target && e.target.id==='zpbSeriesSel' ? e.target : null;
 if(!sel || !window.__zpbSeriesSteps || typeof modelWeights !== 'function' || typeof render !== 'function') return;
 const mw = modelWeights();
 if(sel.value === 'all'){ weights = {...mw}; }
 else {
  const st = window.__zpbSeriesSteps[+sel.value - 1];
  if(!st) return;
  const set = new Set(st.slots);
  weights = {...mw};
  Object.keys(weights).forEach(k=>{ if(!set.has(k)) weights[k] = 0; });
 }
 const el = document.getElementById('controls');
 if(el) el.querySelectorAll('input[data-slot]').forEach(inp=>{ inp.value = weights[inp.dataset.slot]; });
 render();
});
// buildControls runs before this payload loads: rebuild once so the series select lands,
// and re-inject whenever the controls panel is re-rendered without it
(function(){
 const inject = ()=>{
  const el = document.getElementById('controls');
  if(!el || document.getElementById('zpbSeriesSel')) return;
  if(typeof buildControls !== 'function') return;
  try{ buildControls(); }catch(err){}
 };
 inject();
 if('MutationObserver' in window){
  new MutationObserver(inject).observe(document.body, {childList:true, subtree:true});
 }
})();
// W13-3: three-state weights buttons (inert -> armed -> MY WEIGHTS saved)
window.zpbWDirty = false;
window.zpbWeights3State = function(mode){
 const save = document.getElementById('personalWBtn');
 if(!save) return;
 if(mode==='init'){ save.classList.add('zpb-winert'); save.disabled = true; }
 else if(mode==='dirty'){ save.classList.remove('zpb-winert'); save.disabled = false; }
 else if(mode==='saved'){
  save.classList.add('zpb-winert'); save.disabled = true;
  let my = document.getElementById('zpbMyWBtn');
  if(!my && save.parentNode){
   my = document.createElement('button'); my.id = 'zpbMyWBtn'; my.className = 'resetbtn';
   my.style.marginLeft = '6px';
   my.addEventListener('click', ()=>{ if(!personalWeights) return; weights = {...personalWeights}; const el=document.getElementById('controls'); if(el) el.querySelectorAll('input[data-slot]').forEach(inp=>{ inp.value = weights[inp.dataset.slot]; }); if(typeof render==='function') render(); });
   save.parentNode.insertBefore(my, save.nextSibling);
  }
  if(my) my.textContent = 'MY WEIGHTS';
 }
 else if(mode==='model'){ /* model loaded: stays inert until the next manual change */ }
};
document.addEventListener('input', e=>{
 const t = e.target;
 if(t && t.matches && t.matches('#controls input[data-slot]')){
  window.zpbWDirty = true;
  if(typeof zpbWeights3State === 'function') zpbWeights3State('dirty');
 }
}, true);
(function(){
 if(!('MutationObserver' in window)) return;
 const mo = new MutationObserver(()=>{
  const b = document.getElementById('personalWBtn');
  if(!b || b.dataset.zw13) return;
  b.dataset.zw13 = '1';
  zpbWeights3State(window.zpbWDirty ? 'dirty' : (personalWeights ? 'saved' : 'init'));
 });
 mo.observe(document.body, {childList:true, subtree:true});
})();
// W13-4: welcome to the draft — WELCOME / TO THE DRAFT / DRAFT, equidistant from center
window.zpbWelcomeCine = function(){
 if(window._zpbWelDone) return; window._zpbWelDone = true;
 if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 const lines = ['WELCOME', 'TO THE DRAFT', 'DRAFT'];
 const ov = document.createElement('div'); ov.className = 'zpb-fin zpb-fin-welcome';
 lines.forEach(t=>{ const p = document.createElement('p'); p.innerHTML = t; ov.appendChild(p); });
 document.body.appendChild(ov);
 const ps = [...ov.querySelectorAll('p')]; let i = 0;
 const step = ()=>{
  if(i >= ps.length){ setTimeout(()=>{ ov.style.transition='opacity 1.4s ease'; ov.style.opacity='0'; setTimeout(()=>ov.remove(), 1500); }, 1700); return; }
  ps[i].classList.add('zpb-fin-in'); i++; setTimeout(step, 2600);
 };
 step();
};
// W13-16: the flex rules as a tree, depth-chart order (QB -> RB -> WR -> TE -> OL -> DL -> LB -> CB -> S)
window.zpbFlexTree = function(){
 const F = [
  ['Quarterback',        [[2,'cannot play anywhere else']]],
  ['Running back',       [[6,'tight end']]],
  ['Wide receiver',      [[4,'tight end, safety, cornerback'],[6,'running back']]],
  ['Tight end',          [[6,'linebacker, safety, running back']]],
  ['Tackle',             [[0,'any other line spot (guard, center)'],[4,'defensive tackle']]],
  ['Guard / center',     [[0,'guard \u2194 center'],[4,'tackle, defensive tackle']]],
  ['Defensive tackle',   [[4,'edge, linebacker, guard, center'],[6,'tackle, running back']]],
  ['Edge rusher',        [[2,'defensive tackle, WILL, SAM'],[4,'MIKE'],[6,'tight end, running back']]],
  ['Linebacker',         [[0,'any linebacker spot'],[4,'defensive tackle, safety, third corner'],[6,'edge, tight end, running back']]],
  ['Cornerback',         [[0,'free safety'],[2,'strong safety'],[4,'linebacker, wide receiver'],[6,'tight end, running back']]],
  ['Safety',             [[2,'other safety; strong safety to SAM'],[4,'corner, linebacker, wide receiver'],[6,'tight end, running back']]]
 ];
 const cls = c => c===0 ? 'zpb-ft-free' : c===2 ? 'zpb-ft-2' : c===4 ? 'zpb-ft-4' : 'zpb-ft-6';
 const tag = c => c===0 ? 'FREE' : (c===2 ? '\u22122' : c===4 ? '\u22124' : '\u22126');
 return '<ul class="zpb-flextree">'
  + F.map(pair=>{
     const fam = pair[0], rows = pair[1];
     return '<li><span class="zpb-ftnode">'+fam+'</span><ul>'
      + rows.map(r=>'<li><span class="zpb-ftchip '+cls(r[0])+'"><b>'+tag(r[0])+'</b> \u00b7 '+r[1]+'</span></li>').join('')
      + '</ul></li>';
    }).join('')
  + '</ul>';
};
// W13-19: a second row of same-size stat bubbles under the 100-seasons report
window.zpb100More = function(myW, N, mine){
 try{
  if(!Array.isArray(myW) || !myW.length || !N) return '';
  const best = Math.max.apply(null, myW), worst = Math.min.apply(null, myW);
  const ten = Math.round(myW.filter(x=>x>=10).length / N * 100);
  const los = Math.round(myW.filter(x=>x<8).length / N * 100);
  const po = (mine && mine.po != null) ? Math.round(mine.po / N * 100) : null;
  return '<div class="zpb-100hero zpb-100hero2">'
   + '<div><b>'+best+'</b><span>best season</span></div>'
   + '<div><b>'+worst+'</b><span>worst season</span></div>'
   + '<div><b>'+ten+'%</b><span>10+ win seasons</span></div>'
   + '<div><b>'+los+'%</b><span>losing seasons</span></div>'
   + (po!=null ? '<div><b>'+po+'%</b><span>playoff rate</span></div>' : '')
   + '</div>';
 }catch(err){ return ''; }
};
// ================= end v13 =================
"""

# ============================================================ apply ============================================================

def apply(html):
    import re as _re
    EXACT_OK, REMOVED = [], []
    for name, old, new, count in EXACT:
        got = html.count(old)
        assert got == count, f"[{name}] expected {count} occurrence(s), found {got}"
        html = html.replace(old, new)
        EXACT_OK.append(name)
    for name, pat, new, flags, count in REGEX:
        ms = list(_re.finditer(pat, html, flags))
        assert len(ms) == count, f"[{name}] expected {count} regex hit(s), found {len(ms)}"
        repl = new if "\\1" in new or "\\g" in new else (lambda m, _n=new: _n)
        html = _re.sub(pat, repl, html, flags=flags)
        EXACT_OK.append(name)
    for name, start, end, new, keep in CUTS:
        i = html.find(start)
        assert i >= 0, f"[{name}] start marker missing"
        j = html.find(end, i + len(start))
        assert j >= 0, f"[{name}] end marker missing"
        removed = html[i + len(start):j]
        if keep:
            html = html[:i + len(start)] + new + html[j:]
        else:
            html = html[:i] + new + html[j + len(end):]
        REMOVED.append((name, removed))
    html = html.replace("/*__ZPB_CSS_V13__*/", ZPB_CSS_V13)
    html = html.replace("/*__ZPB_JS_V13__*/", ZPB_JS_V13)
    assert "__ZPB_CSS_V13__" not in html and "__ZPB_JS_V13__" not in html
    return html, EXACT_OK, REMOVED

if __name__ == "__main__":
    src = "/home/z/my-project/download/Football-Sim-Z-post-blue.html"
    dst = "/home/z/my-project/desktop/wt/zai/Football-Sim-Z-post-blue.html"
    html = open(src, encoding="utf-8").read()
    out, ok, removed = apply(html)
    data = out.encode("utf-8")
    open(dst, "wb").write(data)
    import hashlib
    print(f"[done] replacements: {len(ok)} | cuts: {len(removed)}")
    print(f"[done] {dst} bytes={len(data)} md5={hashlib.md5(data).hexdigest()}")
