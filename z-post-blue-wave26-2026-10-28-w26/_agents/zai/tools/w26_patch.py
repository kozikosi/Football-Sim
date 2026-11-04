# -*- coding: utf-8 -*-
"""w26_patch.py — build wave 26 from w25 via asserted exact replacements.
Every `old` must occur exactly the expected number of times or the build aborts."""
import sys, hashlib, os
SKIP = set((os.environ.get('W26_SKIP') or '').split(',')) - {''}

SRC = '/home/z/my-project/compare/w25.html'
OUT = os.environ.get('W26_OUT', '/home/z/my-project/compare/w26.html')
sys.path.insert(0, '/home/z/my-project/scripts')
from w26_payload import W26_CSS, W26_JS

src = open(SRC, encoding='utf-8').read()
n0 = len(src)
edits = []

def rep(name, old, new, count=1):
    edits.append((name, old, new, count))

# ================= CSS: shimmer never invisible (Brave hardening) =================
SUP = '@supports ((-webkit-background-clip:text) or (background-clip:text)){'
GRAD = 'background:linear-gradient(100deg,var(--zrb,var(--accent)) 18%,#ffe9c6 38%,var(--zrb,var(--accent)) 55%,#fff6e3 72%,var(--zrb,var(--accent)) 88%) !important;background-size:230% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;'

rep('shm-base-fail-visible',
 '.zpb-shm{background:linear-gradient(100deg,var(--zrb,var(--accent)) 18%,#ffe9c6 38%,var(--zrb,var(--accent)) 55%,#fff6e3 72%,var(--zrb,var(--accent)) 88%);\n background-size:230% 100%;-webkit-background-clip:text;background-clip:text;color:transparent !important;\n animation:zpbshmsweep 3.4s linear infinite;}',
 '/* w26: a shimmer falls back to a solid team color before the gradient is allowed */\n.zpb-shm{color:var(--tA2,var(--zrb,var(--gold3))) !important;-webkit-text-fill-color:var(--tA2,var(--zrb,var(--gold3))) !important;background:none !important;animation:none;}\n' + SUP + '\n.zpb-shm{' + GRAD.replace('background:linear-gradient','background:linear-gradient') + 'color:transparent !important;-webkit-text-fill-color:transparent !important;\n animation:zpbshmsweep 3.4s linear infinite;}}')

rep('shm-lucell-transparent-kill',
 '.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{color:transparent !important;}',
 '.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{color:var(--tA2,var(--zrb,var(--gold3))) !important;-webkit-text-fill-color:var(--tA2,var(--zrb,var(--gold3))) !important;background:none !important;animation:none;}\n' + SUP + '\n.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{' + GRAD + 'color:transparent !important;-webkit-text-fill-color:transparent !important;animation:zpbshmsweep 3.4s linear infinite;}}')

rep('shm-lu-grad-kill',
 '.zpb-lu-cell.zpb-shm{background:linear-gradient(100deg,var(--zrb,var(--accent)) 18%,#ffe9c6 38%,var(--zrb,var(--accent)) 55%,#fff6e3 72%,var(--zrb,var(--accent)) 88%);background-size:230% 100%;-webkit-background-clip:text;background-clip:text;animation:zpbshmsweep 3.4s linear infinite;}',
 '/* w26: folded into the guarded block above */')

rep('shm-second-variant-guarded',
 '.zpb-shm{background:linear-gradient(100deg,var(--tA2,var(--gold3)),var(--tG2,var(--gold2)) 40%,var(--tA2,var(--gold3)) 70%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:fxshine 5.5s linear infinite;}',
 SUP + '\n.zpb-shm{background:linear-gradient(100deg,var(--tA2,var(--gold3)),var(--tG2,var(--gold2)) 40%,var(--tA2,var(--gold3)) 70%) !important;background-size:220% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:fxshine 5.5s linear infinite;}}')

rep('shine-fail-visible',
 '.zpb-shine{background:linear-gradient(90deg,var(--g1),var(--g2) 30%,var(--g5) 50%,var(--g2) 70%,var(--g1));\n background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;\n animation:fxshine 5.5s linear infinite;font-weight:800;}',
 '.zpb-shine{color:var(--g5,#ffe9c6) !important;-webkit-text-fill-color:var(--g5,#ffe9c6) !important;background:none !important;animation:none;}\n' + SUP + '\n.zpb-shine{background:linear-gradient(90deg,var(--g1),var(--g2) 30%,var(--g5) 50%,var(--g2) 70%,var(--g1)) !important;\n background-size:220% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;\n animation:fxshine 5.5s linear infinite;font-weight:800;}}')

rep('pcard-shm-no-colormix',
 '.zpb-pcard b.zpb-shm{color:transparent !important;-webkit-text-fill-color:transparent;\n background:linear-gradient(100deg,var(--zrb,var(--accent)) 20%,color-mix(in srgb,var(--zrb,var(--accent)) 45%,#e8c98a) 38%,var(--zrb,var(--accent)) 60%);background-clip:text;}',
 '.zpb-pcard b.zpb-shm{color:var(--zrb,var(--accent)) !important;-webkit-text-fill-color:var(--zrb,var(--accent)) !important;background:none !important;animation:none;}\n' + SUP + '\n.zpb-pcard b.zpb-shm{background:linear-gradient(100deg,var(--zrb,var(--accent)) 20%,#cfb684 38%,var(--zrb,var(--accent)) 60%) !important;background-size:200% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:zpbshmsweep 3.4s linear infinite;}}')

# ================= ANCHOR / LEAK chips (no symbols, word smaller than name) =================
rep('anchor-chips',
 'narr = `<span class="zpb-anch" title="The player this roster leans on"><i>\u2693</i><b>ANCHOR</b> ${best.name} \u00b7 ${best.slot} \u00b7 ${best.ovr}</span>`',
 'narr = `<span class="zpb-anch" title="The player this roster leans on"><b>ANCHOR</b> <span class="zpb-anchname">${best.name} \u00b7 ${best.slot} \u00b7 ${best.ovr}</span></span>`',
 count=2)

rep('leak-chip',
 '+ `<span class="zpb-leak" title="The spot that gives most of it back"><i>\u25CD</i><b>LEAK</b> ${worst.slot} \u00b7 ${worst.ovr}</span>`',
 '+ `<span class="zpb-leak" title="The spot that gives most of it back"><b>LEAK</b> <span class="zpb-anchname">${worst.slot} \u00b7 ${worst.ovr}</span></span>`')

# ================= NO EMOJIS =================
rep('no-trophy-emoji', '<h2>\U0001F3C6 ${champ} \u2014 Super Bowl Champions</h2>', '<h2>${champ} \u2014 Super Bowl Champions</h2>')
rep('no-star-emoji', "${p.name}${star?' \u2B50':''}", '${p.name}')
rep('no-moon-html', '>\u263E DARK</button>', '>DARK</button>')
rep('no-moon-js', "tent = (t==='dark') ? '\\u2600 LIGHT' : '\\u263E DARK'; };", "tent = (t==='dark') ? 'LIGHT' : 'DARK'; };")
rep('no-gameball-star', 'Key Players <span class="narr" style="font-weight:400;">(\u2B50 game ball)</span>', 'Key Players <span class="narr" style="font-weight:400;">(game ball)</span>')
rep('no-sb-banner-stars', "banner('\U0001F3C6 SUPER BOWL CHAMPIONS! \U0001F3C6<small>The Lombardi Trophy is yours</small>')", "banner('SUPER BOWL CHAMPIONS!<small>The Lombardi Trophy is yours</small>')")

# ================= Team comparison page =================
rep('starter-by-starter-gone', '<h4 style="margin:12px 0 4px;text-align:center;">Starter-by-Starter</h4>', '')
rep('dropdown-teams-alphabetical',
 "  const items = isPick\n    ? ['random'].concat(Array.from({length:32}, (_,k)=>String(k+1)))\n    : TEAMS;",
 "  const items = isPick\n    ? ['random'].concat(Array.from({length:32}, (_,k)=>String(k+1)))\n    : [...TEAMS].sort((a,b)=>a.localeCompare(b)); // w26 (Owner): alphabetical everywhere the homepage dropdown is used")
rep('compare-selectors-visible',
 "const zpbHold = document.getElementById('zpbCmpSelHold');\n if(zpbHold){ zpbHold.appendChild(selA); zpbHold.appendChild(selB); }\n const zpbSlotA = document.getElementById('zpbCmpSlotA'); if(zpbSlotA) zpbSlotA.appendChild(selA);\n const zpbSlotB = document.getElementById('zpbCmpSlotB'); if(zpbSlotB) zpbSlotB.appendChild(selB);",
 "const zpbSlotA = document.getElementById('zpbCmpSlotA');\n if(zpbSlotA){ const wA = selA.closest('.zpb-selwrap') || selA; zpbSlotA.appendChild(wA); } // w26: move the whole homepage-style dropdown, wrapper and all\n const zpbSlotB = document.getElementById('zpbCmpSlotB');\n if(zpbSlotB){ const wB = selB.closest('.zpb-selwrap') || selB; zpbSlotB.appendChild(wB); }")

# ================= Guide =================
rep('fieldmap-flex-math-gone',
 "const strip = fams => { const groups = fams.filter(f=>FM_FLEX[f]).map(f=>'<span class=\"zpb-fm-grp\"><b>'+f+'</b>'+FM_FLEX[f].map(r=>chipOf(f,r)).join('')+'</span>');\n  return groups.length ? '<div class=\"zpb-fm-rowflex\">'+groups.join('')+'</div>' : ''; };",
 "const strip = fams => ''; // w26 (Owner): the flexing math has no place on the field map")

rep('fieldmap-flex-legend-gone',
 "+ '<div class=\"zpb-fm-lh\">FLEX</div>'\n  + '<span><b>FREE</b> plays there free</span>'\n  + '<span><b>\\u22122 / \\u22124 / \\u22126</b> rating points lost playing elsewhere</span>'\n",
 '')

rep('flex-cats-depth-order',
 """const CATS = [
  ['DEFENDS THE PASS', ['CB','ND','SS','FS']],
  ['PRESSURES THE QB', ['DE','DT']],
  ['STOPS THE RUN', ['MIKE','OLB']],
  ['MOVES THE OFFENSE', ['QB']],
  ['RUNS THE BALL', ['RB','FB']],
  ['CATCHES PASSES', ['WR','TE']],
  ['PROTECTS THE PASSER', ['OT','OG','C']],
  ['THE KICKING GAME', ['K','P']]
 ];""",
 """const CATS = [ // w26 (Owner): draft-board depth-chart order, QB first
  ['THROWS THE PASS', ['QB']],
  ['RUNS THE BALL', ['RB','FB']],
  ['CATCHES PASSES', ['WR','TE']],
  ['PROTECTS THE PASSER', ['OT','OG','C']],
  ['PRESSURES THE QB', ['DE','DT']],
  ['STOPS THE RUN', ['MIKE','OLB']],
  ['DEFENDS THE PASS', ['CB','ND','SS','FS']],
  ['THE KICKING GAME', ['K','P']]
 ];""")

rep('values-section-gone', "+ sec('POSITION VALUES: ALL 28 STARTING SPOTS', zpbValuesHTML(), false)", '')
rep('defense-section-moved-up',
 "+ sec('DRAFTING: WHICH POSITIONS MATTER', zpbDraftGuideHTML(), true)\n  + sec('READING THE DRAFT BOARD (WINS, PRIORITY, GONE)', zpbSwWrap(board), false)",
 "+ sec('DRAFTING: WHICH POSITIONS MATTER', zpbDraftGuideHTML(), true)\n  + sec('DEFENSE: 4-3, 3-4, NICKEL, DIME', zpbDefGuideHTML(), true) // w26 (Owner): up below the flex section\n  + sec('READING THE DRAFT BOARD (WINS, PRIORITY, GONE)', zpbSwWrap(board), false)")
rep('defense-section-old-seat-gone',
 "  + sec('COACHING: PERSONNEL, STYLES AND GAME PLANS', zpbCoachGuideHTML(coach), false)\n  + sec('DEFENSE: 4-3, 3-4, NICKEL, DIME', zpbDefGuideHTML(), true)",
 "  + sec('COACHING: PERSONNEL, STYLES AND GAME PLANS', zpbCoachGuideHTML(coach), false)")

# ================= Defense viz rebuild (shapes + colors + in/out legend) =================
NEW_DEF_FN = """zpbDefGuideHTML = function(){
 // w26 (Owner): DL squares, LB triangles, DB circles; DT2, ILB2, SAM, NICKEL and DIME
 // wear their own colors, labeled at the bottom, lit in the fronts where they play.
 const COL = {DT2:'#4fa3a5',ILB2:'#a684e0',SAM:'#d98e4a',NICKEL:'#e8c46a',DIME:'#c96a7e'};
 const dot = (fam, c)=> '<i class="'+fam+(c?' '+c:'')+'"></i>';
 const dots = (lab, arr)=> '<div class="zpb-defdots"><span class="zpb-deflab">'+lab+'</span>' + arr.map(a=>dot(a[0],a[1])).join('') + '</div>';
 const row43  = dots('DL',[['z-dl'],['z-dl'],['z-dl','c-dt2'],['z-dl']]) + dots('LB',[['z-lb','c-sam'],['z-lb'],['z-lb']]) + dots('DB',[[''],[''],[''],['']]);
 const row34  = dots('DL',[['z-dl'],['z-dl'],['z-dl']]) + dots('LB',[['z-lb'],['z-lb','c-ilb2'],['z-lb'],['z-lb','c-sam']]) + dots('DB',[[''],[''],[''],['']]);
 const rowNK  = dots('DL',[['z-dl'],['z-dl'],['z-dl','c-dt2'],['z-dl']]) + dots('LB',[['z-lb'],['z-lb']]) + dots('DB',[[''],[''],['c-nk'],[''],['']]);
 const rowDM  = dots('DL',[['z-dl'],['z-dl'],['z-dl','c-dt2'],['z-dl']]) + dots('LB',[['z-lb']]) + dots('DB',[[''],[''],['c-nk'],[''],[''],['c-dm']]);
 const chipRow = inn=> '<div class="zpb-definout">' + Object.keys(COL).map(k=>'<span class="zpb-dl-chip'+(inn[k]?' in':'')+'"><i style="background:'+COL[k]+'"></i>'+k+'</span>').join('') + '</div>';
 const card = (t, rows, p, tip, inn)=>'<div class="zpb-defcard" title="'+tip.replace(/"/g,'&quot;')+'"><h5>'+t+'</h5>'+rows+'<p>'+p+'</p>'+chipRow(inn)+'</div>';
 return '<div class="zpb-defgrid">'
  + card('4-3', row43, 'Four down linemen and three linebackers \\u2014 the classic front. The SAM walks out over the tight end and the front four does the rushing.', '4-3 front: four defensive linemen, three linebackers, four defensive backs. Stronger against the run; a little thinner in coverage.', {DT2:1,SAM:1})
  + card('3-4', row34, 'Three down linemen and four linebackers. The nose tackle holds the middle while two outside linebackers stand up \\u2014 they rush on one call and drop on the next.', '3-4 front: an end slides out to linebacker, so the two outside linebackers become the pass rush. The same personnel, a different shape.', {ILB2:1,SAM:1})
  + card('NICKEL', rowNK, 'A linebacker comes off and an extra defensive back \\u2014 the nickel \\u2014 comes in: five defensive backs. The modern default when the offense throws.', 'Nickel: the extra defensive back replaces a linebacker. Better in coverage, a little softer against the run.', {DT2:1,NICKEL:1})
  + card('DIME', rowDM, 'A sixth defensive back comes in \\u2014 built for 3rd and long, 4th and long, and the end of the game when only a Hail Mary can beat you.', 'Dime: plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys.', {DT2:1,NICKEL:1,DIME:1})
  + '</div>'
  + '<div class="zpb-deflegend">' + Object.keys(COL).map(k=>'<span class="zpb-dl-chip"><i style="background:'+COL[k]+'"></i>'+k+'</span>').join('') + '</div>'
  + '<p class="narr" style="margin:8px 0 0;text-align:center;">Squares are the defensive line, triangles the linebackers, circles the defensive backs. The five named spots wear their own colors \\u2014 lit where they play, dimmed where they don\\u2019t.</p>';
};"""

i = src.find('zpbDefGuideHTML = function(){')
assert i > 0, 'def guide fn not found'
END_MARK = "the dashed dot is the dime.</p>';\n};"
j = src.find(END_MARK, i)
assert j > 0, 'def guide end not found'
j += len(END_MARK)
edits.append(('def-guide-rebuilt', src[i:j], NEW_DEF_FN, 1))

# ================= Position rankings: spot buttons row + dropdown presets retired =================
rep('rank-btns-host',
 '<div class="filters">\n    <select id="groupSelect"></select>\n   </div>',
 '<div class="filters">\n    <select id="groupSelect"></select>\n   </div>\n   <div id="zpbRankBtns" class="zpb-serrow" role="group" aria-label="Ranking spots"></div>')

rep('series-presets-retired',
 'function zpbEnsureSeriesOptions(){',
 'function zpbEnsureSeriesOptions(){ return; // w26 (Owner): The Series presets retired \u2014 the spot buttons below are individual toggles now')

# ================= Draft board: srbtn chipbar with ALL / CLEAR =================
rep('draft-chips-srbtn',
 """let ch = `<div class="chipbar">`;
 WV_GROUPS.forEach(g=>{
  const f = filled[g]||0, t = SLOT_TOTALS[g]||0, on = sel.has(g);
  ch += `<span class="chip zpb-pip${on?' on':''}" data-tog="${g}" title="Show or hide ${WV_NAMES[g].toLowerCase()}s — ${f} of ${t} filled"><i></i>${g} <b>${f}/${t}</b></span>`;
 });
 ch += `<span class="zpb-allnone"><span class="chip" data-all="1" style="font-size:.62rem;letter-spacing:.08em;padding:3px 8px 3px 6px;gap:0;"><span style="text-align:left;">ALL</span></span><span class="chip" data-none="1" style="font-size:.62rem;letter-spacing:.08em;padding:3px 8px 3px 6px;gap:0;"><span style="text-align:left;">NONE</span></span></span></div>
  `;
 document.getElementById('draftChips').innerHTML = ch;""",
 """let ch = `<div class="chipbar zpb-serrow">`; // w26 (Owner): the spot-button format, ALL and CLEAR in the same format
 const ZORDER = ['QB','RB','WR','TE','OT','OG','C','EDGE','DT','LB','CB','SS','FS','K']; // QB first, then the draft depth chart
 ZORDER.forEach(g=>{
  const f = filled[g]||0, t = SLOT_TOTALS[g]||0, on = sel.has(g);
  ch += `<button type="button" class="zpb-srbtn${on?' on':''}" data-tog="${g}" title="Show or hide ${WV_NAMES[g].toLowerCase()}s — ${f} of ${t} filled"><b>${g}</b><i>${f}/${t}</i></button>`;
 });
 ch += `<button type="button" class="zpb-srbtn zpb-srutil" data-all="1" title="Show every group"><b>ALL</b><i>show</i></button><button type="button" class="zpb-srbtn zpb-srutil" data-none="1" title="Clear the board"><b>CLEAR</b><i>hide</i></button></div>
  `;
 document.getElementById('draftChips').innerHTML = ch;""")

# ================= Nickel beside Dime at the bottom of the defense =================
rep('nickel-dime-bottom',
 "['Defense', 'def', ['DE1','DT1','DT2','DE2','MIKE','WILL','SAM','CB1','CB2','CB3','FS','SS']]",
 "['Defense', 'def', ['DE1','DT1','DT2','DE2','MIKE','WILL','SAM','CB1','CB2','FS','SS','CB3']], // w26 (Owner): Nickel beside Dime at the bottom")

# ================= 3-4 / 4-3 toggle actually re-renders =================
rep('toggle-renders-board',
 "if(typeof rerenderDraft === 'function') { try{ rerenderDraft(); }catch(err){} }\n if(typeof renderPreseasonView === 'function'){ try{ renderPreseasonView(); }catch(err){} }",
 "['renderDraftBoard2','renderDraftRoster2','renderDraftLive'].forEach(function(fn){ try{ if(typeof window[fn]==='function') window[fn](); }catch(err){} }); // w26: the real renderers (rerenderDraft never existed)\n if(typeof renderPreseasonView === 'function'){ try{ renderPreseasonView(); }catch(err){} }\n try{ if(document.getElementById('viewCompare') && document.getElementById('viewCompare').classList.contains('active') && typeof renderHomeComparison==='function') renderHomeComparison(); }catch(err){}")

# ================= Weights menu =================
rep('weights-series-select-gone', "h += (window.zpbSeriesSelectHTML ? zpbSeriesSelectHTML() : '');", '')

rep('series-injector-gone',
 """// buildControls runs before this payload loads: rebuild once so the series select lands,
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
})();""",
 "// w26 (Owner): the MODEL \u00b7 ALL SLOTS select is retired \u2014 its re-injection observer is retired with it\n// (leaving the observer alive with no select to find would loop buildControls forever).")

SYN_START = 'h += `<div class="synergy-box">'
i = src.find(SYN_START)
assert i > 0, 'synergy chunk start missing'
SYN_END = "passGameMaxPenalty}\"></label>\n   </div>\n  </div>`;"
j = src.find(SYN_END, i)
assert j > 0, 'synergy chunk end missing'
j += len(SYN_END)
edits.append(('synergy-panels-gone', src[i:j], "h += ''; // w26 (Owner): the Can't Run / Weak D / Can't Pass panels are gone completely", 1))

rep('weights-badge-typeable',
 'h += `<button type="button" class="zpb-wbadge${w<=0?\' zpb-woff\':\'\'}" data-wslot="${s}" title="${LABELS[s]} \u2014 click for the next heavier weight, shift-click for the next lighter one">${LABELS[s]}<b>${w}</b></button>`; // w19 (Owner): weights wear badges',
 'h += `<button type="button" class="zpb-wbadge${w<=0?\' zpb-woff\':\'\'}" data-wslot="${s}" title="${LABELS[s]} \u2014 type a number from 0 to 700">${LABELS[s]}<input class="zpb-win" type="number" min="0" max="700" step="1" inputmode="numeric" value="${w}"></button>`; // w26 (Owner): weights are editable by typing')

rep('weights-input-wiring',
 """ el.querySelectorAll('.zpb-wbadge').forEach(b=>{
  b.addEventListener('click', e=>{
   const s = b.dataset.wslot, cur = Math.round(weights[s]||0);
   // w19: weights live on the model's 0-700 scale — a click steps to the next heavier tier, shift-click to the next lighter one
   const TIERS = [0, 1, 5, 20, 40, 60, 80, 100, 150, 200, 250, 295, 320, 350, 525, 700];
   let i = TIERS.findIndex(t=>t>=cur); if(i<0) i = TIERS.length-1;
   weights[s] = e.shiftKey ? TIERS[Math.max(0, i-1)] : (cur>=TIERS[TIERS.length-1] ? 0 : TIERS[i+1]);
   b.querySelector('b').textContent = Math.round(weights[s]);
   b.classList.toggle('zpb-woff', weights[s]<=0);
   render();
  });
 });""",
 """ el.querySelectorAll('.zpb-wbadge').forEach(b=>{ // w26 (Owner): type the number, the board recalculates
  const inp = b.querySelector('.zpb-win'); if(!inp) return;
  const apply = v=>{
   const s = b.dataset.wslot;
   const n = Math.max(0, Math.min(700, Math.round(parseFloat(v)||0)));
   weights[s] = n; inp.value = n;
   b.classList.toggle('zpb-woff', n<=0);
   render();
  };
  inp.addEventListener('change', ()=>apply(inp.value));
  inp.addEventListener('input', ()=>{
   const s = b.dataset.wslot;
   const n = Math.max(0, Math.min(700, Math.round(parseFloat(inp.value)||0)));
   weights[s] = n;
   b.classList.toggle('zpb-woff', n<=0);
   render();
  });
 });""")

rep('weights-refresh-inputs',
 "const refresh = ()=>{ el.querySelectorAll('.zpb-wbadge').forEach(b=>{ const s = b.dataset.wslot, w = Math.round(weights[s]||0); b.querySelector('b').textContent = w; b.classList.toggle('zpb-woff', w<=0); }); render(); };",
 "const refresh = ()=>{ el.querySelectorAll('.zpb-wbadge').forEach(b=>{ const s = b.dataset.wslot, w = Math.round(weights[s]||0); const inp = b.querySelector('.zpb-win'); if(inp) inp.value = w; b.classList.toggle('zpb-woff', w<=0); }); render(); }; // w26: inputs refresh")

rep('synergy-toggles-guarded',
 "document.getElementById('runToggle').addEventListener('change', e=>{ synergy.runEnabled = e.target.checked; render(); });\n document.getElementById('passToggle').addEventListener('change', e=>{ synergy.passEnabled = e.target.checked; render(); });\n document.getElementById('passGameToggle').addEventListener('change', e=>{ synergy.passGameEnabled = e.target.checked; render(); });",
 "['runToggle','passToggle','passGameToggle'].forEach(id=>{ const t = document.getElementById(id); if(!t) return; t.addEventListener('change', e=>{ if(id==='runToggle') synergy.runEnabled = e.target.checked; else if(id==='passToggle') synergy.passEnabled = e.target.checked; else synergy.passGameEnabled = e.target.checked; render(); }); }); // w26: null-guarded, the panels are gone")

open('/home/z/my-project/scripts/w26_edits_stage1.py','w').write('# stage1 ok\n')
# ---- (apply loop moved below: every rep() must be registered first) ----

# ================= Player browser =================
PB_OLD = """ let h = '';
 pageRows.forEach(p=>{
  const [name,pos,team,ovr,spd,str_,agi,cod,inj,awr,xf] = p;
  h += `<tr><td>${name}${xf?'<span class="xf">XF</span>':''}</td><td>${pos}</td><td>${team}</td><td class="score">${ovr}</td><td>${spd}</td><td>${str_}</td><td>${agi}</td><td>${cod}</td><td>${inj}</td><td>${awr}</td></tr>`;
 });"""
PB_NEW = """ let h = '';
 const topOfTeam = {}, shimUsed = {}; // w26 (Owner): one shimmer per team on the screen, and only at 90+
 const zpbTvSafe = t => { try{ return (typeof zpbRowVars==='function') ? zpbRowVars(t) : ''; }catch(e){ return ''; } }; // boot-safe: zpbState may not exist yet on first paint
 pageRows.forEach(p=>{ const t = p[2]; if(topOfTeam[t]==null || p[3]>topOfTeam[t]) topOfTeam[t] = p[3]; });
 pageRows.forEach(p=>{
  const [name,pos,team,ovr,spd,str_,agi,cod,inj,awr,xf] = p;
  const zpbTv = zpbTvSafe(team);
  let cls = '';
  if(ovr>=90 && ovr===topOfTeam[team] && !shimUsed[team]){ cls = 'zpb-shm'; shimUsed[team] = 1; }
  else if(ovr>=85){ cls = 'zpb-vib'; }
  h += `<tr style="${zpbTv}"><td class="zpb-pb-name ${cls}">${name}${xf?'<span class="zpb-xfp">XF</span>':''}</td><td><span class="zpb-poschip">${pos}</span></td><td class="zpb-pb-team">${team}</td><td class="score">${ovr}</td><td>${spd}</td><td>${str_}</td><td>${agi}</td><td>${cod}</td><td>${inj}</td><td>${awr}</td></tr>`;
 });"""
c = src.count(PB_OLD)
if c != 1:
    print(f'FAIL player-browser: found {c}'); sys.exit(1)
src = src.replace(PB_OLD, PB_NEW)
print('ok player-browser')

# ================= Tier law sweep =================
HONOR_IIFE = """+ '<div class="zpb-scard-hd"><b class="zpb-shm">' + c.n + '</b>'"""
HONOR_IIFE_NEW = """+ '<div class="zpb-scard-hd"><b class="'+(function(){var pv=(typeof PLAYERS!=='undefined')?PLAYERS.find(function(p){return p[0]===c.n;}):null;return pv&&pv[3]>=90?'zpb-shm':(pv&&pv[3]>=85?'zpb-vib':'');})()+'">' + c.n + '</b>'"""
c = src.count(HONOR_IIFE)
if c != 1:
    print(f'FAIL honor-3281: found {c}'); sys.exit(1)
src = src.replace(HONOR_IIFE, HONOR_IIFE_NEW)
print('ok honor-3281')

HONOR2 = 'honorCards.forEach(c=>{ hHTML += `<div class="zpb-scard zpb-shonor" style="--beat:${beat}" data-beat="${beat++}"><div class="zpb-scard-hd"><b class="zpb-shm">${c.n}</b>'
HONOR2_NEW = 'honorCards.forEach(c=>{ const _pv=(typeof PLAYERS!==\'undefined\')?PLAYERS.find(function(p){return p[0]===c.n;}):null; const _cls=_pv&&_pv[3]>=90?\'zpb-shm\':(_pv&&_pv[3]>=85?\'zpb-vib\':\'\'); hHTML += `<div class="zpb-scard zpb-shonor" style="--beat:${beat}" data-beat="${beat++}"><div class="zpb-scard-hd"><b class="${_cls}">${c.n}</b>'
c = src.count(HONOR2)
if c != 1:
    print(f'FAIL honor-7597: found {c}'); sys.exit(1)
src = src.replace(HONOR2, HONOR2_NEW)
print('ok honor-7597')

for name, old in [
  ('slot-shm-pick', '<span class="slotname${p?\' zpb-shm\':\'\'}">'),
  ('slot-shm-zones', '<span class="slotname${e&&e.name?\' zpb-shm\':\'\'}">'),
  ('slot-shm-dime', '<span class="slotname${nm?\' zpb-shm\':\'\'}">Dime</span>'),
]:
    new = old.replace('${p?\' zpb-shm\':\'\'}','').replace('${e&&e.name?\' zpb-shm\':\'\'}','').replace('${nm?\' zpb-shm\':\'\'}','')
    c = src.count(old)
    if c != 1:
        print(f'FAIL {name}: found {c}'); sys.exit(1)
    src = src.replace(old, new)
    print(f'ok {name} (slotname neutral)')

# ================= Season pages =================
rep('ops-season-dup-gone',
 '<button class="resetbtn" id="seasonOpsBtn" style="font-size:0.78rem;padding:5px 12px;width:auto;margin:0 6px 0 0;">SEASON</button>',
 '')

c = src.count("note.textContent = 'Missing slots filled at 70 OVR';")
if c != 2:
    print(f'FAIL 70note sites: found {c}'); sys.exit(1)
src = src.replace("if(panel){ const old = panel.querySelector('.zpb-70note'); if(old) old.remove();\n  const note = document.createElement('div'); note.className = 'zpb-70note'; note.textContent = 'Missing slots filled at 70 OVR';\n  panel.appendChild(note); }",
                  "if(panel){ const old = panel.querySelector('.zpb-70note'); if(old) old.remove();\n  if(!(function(){ try{ return !!seasonState; }catch(e){ return false; } })()){ const note = document.createElement('div'); note.className = 'zpb-70note'; note.textContent = 'Missing slots filled at 70 OVR';\n  panel.appendChild(note); } } // w26 (Owner): gone once the season starts — even a stale boot note is swept (TDZ-safe probe)")
print('ok 70note gated x2')

rep('fade-70-detail-gone',
 '<div class="zpb-70fade">Missing depth-chart slots are filled with a default of 70 OVR</div>', '')

rep('game-review-stat-badges',
 "chips.map(c=>'<span>'+c+'</span>')",
 "chips.map(c=>'<span class=\"zpb-pstat\">'+c+'</span>')",
 count=2)

# ================= Draft review: auto-open + badges breakdown =================
rep('auto-open-my-breakdown',
 'body.appendChild(w); wireRowClicks(w, rk);',
 'body.appendChild(w); const _wfd = wireRowClicks(w, rk);\n   { const _mi = rk.findIndex(e=>e.isUser); // w26 (Owner): your breakdown drops down by itself\n     if(_mi>=0){ try{ _wfd(_mi); }catch(e){} const _dr = document.getElementById(\'detailrow-\'+_mi); if(_dr) _dr.style.display = \'table-row\'; } }')

rep('breakdown-badges-in-detail',
 'let html = `<h4 style="margin-top:0;">Roster (as drafted)</h4>${renderDepthChartHTML(e.slotmap, e.pickRounds, e.isUser ? e.teamName : \'\')}`;\n  html += renderDetailHTML(e.label, metrics).replace(/<button class="closebtn"[^>]*>[^<]*<\\/button>/,\'\');',
 'let html = `<h4 style="margin-top:0;">Roster (as drafted)</h4>${renderDepthChartHTML(e.slotmap, e.pickRounds, e.isUser ? e.teamName : \'\')}`;\n  if(e.isUser && typeof zpbDraftBreakdownHTML === \'function\') html += zpbDraftBreakdownHTML(e); // w26 (Owner): the badges breakdown\n  html += renderDetailHTML(e.label, metrics).replace(/<button class="closebtn"[^>]*>[^<]*<\\/button>/,\'\');')

# ================= setActiveTab: visible failures =================
rep('tab-fail-visible-rankings',
 "try{ if(viewId==='viewRankings'){ const _rb=document.getElementById('resultsBody'); if(_rb && !_rb.children.length) render(); } }catch(e){}",
 "try{ if(viewId==='viewRankings'){ const _rb=document.getElementById('resultsBody'); if(_rb && !_rb.children.length) render(); } }catch(e){ zpbViewFail('viewRankings', e); }")
rep('tab-fail-visible-compare',
 "try{ if(btnId==='tabCompareBtn') renderHomeComparison(); }catch(e){}",
 "try{ if(btnId==='tabCompareBtn') renderHomeComparison(); }catch(e){ zpbViewFail('viewCompare', e); }")
rep('tab-fail-visible-guide',
 "try{ if(btnId==='tabGuideBtn') document.getElementById('guideBody').innerHTML = guideHTMLCached(); }catch(e){}",
 "try{ if(btnId==='tabGuideBtn') document.getElementById('guideBody').innerHTML = guideHTMLCached(); }catch(e){ zpbViewFail('viewGuide', e); }")

# ---- apply stage 1 ----
for name, old, new, count in edits:
    if name in SKIP:
        print(f'skip {name}')
        continue
    c = src.count(old)
    if c != count:
        print(f'FAIL {name}: found {c}, expected {count}')
        sys.exit(1)
    src = src.replace(old, new)
    print(f'ok {name} (x{count})')

# ================= Append the w26 blocks before </body> =================
TAIL = '</script>\n\n</body>\n</html>'
c = src.count(TAIL)
if c != 1:
    print(f'FAIL tail: found {c}'); sys.exit(1)
if 'append-blocks' not in SKIP:
    blocks = ('</script>\n\n<style id="zpb-w26">' + W26_CSS + '</style>\n'
              '<script id="zpb-w26-js">' + W26_JS + '</script>\n\n</body>\n</html>')
    src = src.replace(TAIL, blocks)
    print('ok w26 blocks appended')
else:
    print('skip append-blocks')

open(OUT, 'w', encoding='utf-8').write(src)
md5 = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'WROTE {OUT}: {len(src)} bytes (was {n0}) md5 {md5}')

# ---- post-checks ----
import re
bad = []
for ch, name in [('\u2693','anchor'), ('\u25CD','leak-dot'), ('\u2B50','star'), ('\U0001F3C6','trophy'), ('\u263E','moon')]:
    if ch in src: bad.append(f'emoji remains: {name}')
for s, name in [('Starter-by-Starter','starter-h4'), ('MODEL \u00b7 ALL SLOTS should be in dead fn','x')]:
    pass
if '<h4 style="margin:12px 0 4px;text-align:center;">Starter-by-Starter</h4>' in src: bad.append('Starter-by-Starter remains')
if "MODEL \u00b7 ALL SLOTS" in src.split('zpbSeriesSelectHTML')[0]: bad.append('series select still wired in buildControls')
if src.count('synergy-box') - src.count('synergy-box{') > 3 and '<div class="synergy-box">' in src: bad.append('synergy boxes remain')
if 'color-mix(in srgb,var(--zrb,var(--accent)) 45%,#e8c98a)' in src: bad.append('color-mix shimmer remains')
if bad:
    print('POST-CHECK FAILURES:'); [print(' -', b) for b in bad]; sys.exit(1)
print('post-checks clean')
