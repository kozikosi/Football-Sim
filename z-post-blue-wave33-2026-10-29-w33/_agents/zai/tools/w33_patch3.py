#!/usr/bin/env python3
# w33_patch3.py — wave 33 stage 3: the WHERE THEY LINE UP world.
# R4  · guide map geometry: the DTs and the right DE join the line-of-scrimmage row; NICKEL stays; DIME takes the right DE's old spot
# R6  · bigger map, last names instead of initials, guaranteed bubble-text contrast (Vikings purple/gold)
# R5  · reverse highlighting: hover a player card and his station lights up
# R7  · player cards first (grouped, fading in draft order), then the visualization fading the same way
# R8  · the YOUR BREAKDOWN badges stop duplicating under the visualization
import sys

SRC = '/home/z/my-project/scripts/w33_stage2.html'
DST = '/home/z/my-project/scripts/w33_stage3.html'

E = []
def add(old, new, n=1):
    E.append((old, new, n))

# ---------- shared CSS: bigger map, fade-in beats, reverse-highlight hot state ----------
add(
"""/* W15-2: WHERE THEY LINE UP — field map + legend (gold offense / wine defense, palette only) */
.zpb-fm{max-width:430px;margin:12px auto 4px;padding:12px 10px 10px;border:1px solid var(--rosehair,var(--border));border-radius:16px;background:var(--fieldbg,transparent);}
.zpb-fm-row{display:flex;justify-content:center;gap:9px;margin:8px 0;}
.zpb-fm-row i{font-style:normal;display:inline-flex;align-items:center;justify-content:center;min-width:44px;height:30px;padding:0 7px;border-radius:999px;font-weight:800;font-size:.72rem;letter-spacing:.04em;}""",
"""/* W15-2: WHERE THEY LINE UP — field map + legend (gold offense / wine defense, palette only) */
/* w33 (R6, Owner): the map grows so last names fit the bubbles; the fade-in law rides --beat */
.zpb-fm{max-width:600px;margin:12px auto 4px;padding:14px 12px 12px;border:1px solid var(--rosehair,var(--border));border-radius:16px;background:var(--fieldbg,transparent);}
.zpb-fm-row{display:flex;justify-content:center;gap:9px;margin:8px 0;}
.zpb-fm-row i{font-style:normal;display:inline-flex;align-items:center;justify-content:center;min-width:46px;height:32px;padding:0 9px;border-radius:999px;font-weight:800;font-size:.74rem;letter-spacing:.04em;white-space:nowrap;}
/* w33 (R7): cards and bubbles land one per second, in the order the Owner drafted them */
@keyframes zpbCardIn{from{opacity:0;transform:translateY(7px);}to{opacity:1;transform:none;}}
.zpb-dfc2{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--beat,0)*1s);}
.zpb-fm .zpb-fm-ini{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--beat,0)*1s);}
/* w33 (R5): hover a player card and his station lights up — and the old law holds both ways */
.zpb-fm-ini.zpb-fm-hot{box-shadow:inset 0 0 0 2px var(--zrb,var(--accent)),0 0 14px var(--glow,rgba(217,169,76,.4));transform:scale(1.12);}
.zpb-fm-ini{transition:transform .18s ease, box-shadow .18s ease;}
.zpb-dfc2{transition:border-color .15s ease, box-shadow .15s ease;}
.zpb-dfc2.zpb-dbk-hot{border-color:var(--zrb,var(--accent)) !important;box-shadow:0 0 12px var(--glow,rgba(217,169,76,.35));}
@media (prefers-reduced-motion: reduce){ .zpb-dfc2,.zpb-fm .zpb-fm-ini{opacity:1;animation:none;} }""")

# mobile guard for the wider map
add(
"@media (max-width:400px){.zpb-fm-row{gap:5px;}.zpb-fm-row i{min-width:38px;height:27px;font-size:.64rem;padding:0 5px;}}",
"@media (max-width:400px){.zpb-fm{max-width:100%;padding:10px 6px;}.zpb-fm-row{gap:4px;}.zpb-fm-row i{min-width:34px;height:26px;font-size:.6rem;padding:0 4px;}}\n@media (max-width:600px){.zpb-fm{max-width:100%;}.zpb-fm-row i{font-size:.66rem;height:29px;min-width:40px;padding:0 6px;}}")

# ---------- R4 · the guide map: the DTs and the right DE move up; DIME takes the right DE's spot ----------
add(
"""  + '<div class="zpb-fm-side zpb-fm-def">'
  + xrow([['CB',-5],['DE',-3],['CB',5]])
  + xrow([['NICKEL',-3],['DIME',-2.2],['DT',-1],['DT',1],['DE',3]])
  + xrow([['SAM',-2],['MIKE',0],['WILL',2]])
  + xrow([['SS',-2],['FS',2]])
  + '</div>'
  + '</div>'
  + '<div class="zpb-fm-legend">'""",
"""  + '<div class="zpb-fm-side zpb-fm-def">'
  + xrow([['CB',-5],['DE',-3],['DT',-1],['DT',1],['DE',3],['CB',5]]) // w33 (R4, Owner): the tackles and the right DE press the line with the others
  + xrow([['NICKEL',-3],['DIME',3]]) // w33 (R4, Owner): the nickel does not move; the dime takes the right DE's old station
  + xrow([['SAM',-2],['MIKE',0],['WILL',2]])
  + xrow([['SS',-2],['FS',2]])
  + '</div>'
  + '</div>'
  + '<div class="zpb-fm-legend">'""")

# ---------- R4b/R5/R6/R7 · the belong map: same geometry, last names, ink contrast, draft-order beats ----------
add(
"""window.zpbBelongMapHTML = function(entry){
 try{
  if(!entry || !entry.slotmap) return '';
  const nse = (typeof normalizeSlotEntry === 'function') ? normalizeSlotEntry : function(x){ return x; };
  const vars = (entry.teamName && typeof zpbRowVars === 'function') ? zpbRowVars(entry.teamName) : '';
  const ini = n=>{ if(!n) return ''; const w = String(n).trim().split(/\\s+/); return ((w[0][0]||'') + (w.length>1 ? w[w.length-1][0] : '')).toUpperCase(); };
  const cell = (sl, lab)=>{
   let e = null;
   if(sl==='DIME'){ const d = window.zpbDimeOf ? window.zpbDimeOf(entry.slotmap) : null; e = d ? nse(d) : null; }
   else { const p = entry.slotmap[sl]; e = p ? nse(p) : null; }
   if(!e || !e.name) return '<i class="zpb-fm-ini zpb-empty"><b>&middot;</b><i>' + lab + '</i></i>';
   let ov = e.ovr; try{ if(typeof effOvr === 'function' && sl !== 'DIME') ov = effOvr(e, sl); }catch(err){}
   const cls = ov>=90 ? 'zpb-shm' : (ov>=85 ? 'zpb-vib' : '');
   return '<i class="zpb-fm-ini ' + cls + '" data-slot="' + sl + '" title="' + String(e.name).replace(/"/g,'&quot;') + (ov ? ' \\u00b7 ' + Math.round(ov) : '') + '"><b>' + ini(e.name) + '</b><i>' + lab + '</i></i>';
  };""",
"""window.zpbBelongMapHTML = function(entry){
 try{
  if(!entry || !entry.slotmap) return '';
  const nse = (typeof normalizeSlotEntry === 'function') ? normalizeSlotEntry : function(x){ return x; };
  const vars = (entry.teamName && typeof zpbRowVars === 'function') ? zpbRowVars(entry.teamName) : '';
  // w33 (R6, Owner): last names, not initials — the map is wide enough now
  const ini = n=>{ if(!n) return ''; const w = String(n).trim().split(/\\s+/); return (w.length>1 ? w[w.length-1] : w[0]); };
  // w33 (R6, Owner): the bubble ink is chosen against the real bubble color, so Vikings purple never swallows its label
  const inkFor = ()=>{
   try{
    const pk = (entry.teamName && typeof zpbPackFor === 'function') ? zpbPackFor(entry.teamName) : null;
    if(!pk || typeof zpbContrast !== 'function') return '';
    const dark = document.documentElement.getAttribute('data-theme')==='dark' || (!document.documentElement.getAttribute('data-theme') && !(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches));
    const bg = dark ? pk.acc3D : pk.acc3L;
    return zpbContrast('#3a2a14', bg) >= 4.5 ? '#3a2a14' : '#fff7ea';
   }catch(err){ return ''; }
  };
  const _ink = inkFor();
  const beatOf = window.zpbBeatOf || function(){ return ''; };
  const cell = (sl, lab)=>{
   let e = null;
   if(sl==='DIME'){ const d = window.zpbDimeOf ? window.zpbDimeOf(entry.slotmap) : null; e = d ? nse(d) : null; }
   else { const p = entry.slotmap[sl]; e = p ? nse(p) : null; }
   if(!e || !e.name) return '<i class="zpb-fm-ini zpb-empty"><b>&middot;</b><i>' + lab + '</i></i>';
   let ov = e.ovr; try{ if(typeof effOvr === 'function' && sl !== 'DIME') ov = effOvr(e, sl); }catch(err){}
   const cls = ov>=90 ? 'zpb-shm' : (ov>=85 ? 'zpb-vib' : '');
   const beat = beatOf(e.name);
   const ink = _ink ? ';color:' + _ink : '';
   return '<i class="zpb-fm-ini ' + cls + '"' + (beat ? ' data-beat="' + beat + '" style="--beat:' + beat + ink + '"' : (_ink ? ' style="' + ink.slice(1) + '"' : '')) + ' data-slot="' + sl + '" title="' + String(e.name).replace(/"/g,'&quot;') + (ov ? ' \\u00b7 ' + Math.round(ov) : '') + '"><b>' + ini(e.name) + '</b><i>' + lab + '</i></i>';
  };""")

add(
"""  const xrow = a=>'<div class="zpb-fm-row">' + a.map(x=>{
    const c = cell(x[0], x[1]);
    return c.replace('class="zpb-fm-ini', 'style="--x:' + x[2] + '" class="zpb-fm-ini');
  }).join('') + '</div>';""",
"""  const xrow = a=>'<div class="zpb-fm-row">' + a.map(x=>{
    const c = cell(x[0], x[1]);
    if(c.indexOf('style=\"')>=0) return c.replace('style=\"', 'style=\"--x:' + x[2] + ';');
    return c.replace('class=\"zpb-fm-ini', 'style=\"--x:' + x[2] + '\" class=\"zpb-fm-ini');
  }).join('') + '</div>';""")

add(
"""  return '<div class="zpb-fm" role="img" aria-label="Where they belong: your starters at their stations"' + (vars ? ' style="' + vars + '"' : '') + '>'
   + '<div class="zpb-fm-side zpb-fm-off">'
   + xrow([xL('RB1',-2),['FB', lbl('FB'), 2]])
   + xrow([xL('QB',0)])
   + xrow([xL('WR1',-5),xL('TE1',-3),xL('OT1',-2),xL('OG1',-1),xL('C',0),xL('OG2',1),xL('OT2',2),xL('WR3',4),xL('WR2',5)])
   + '</div>'
   + '<div class="zpb-fm-scrim"><span>LINE OF SCRIMMAGE</span></div>'
   + '<div class="zpb-fm-side zpb-fm-def">'
   + xrow([xL('CB1',-5),xL('DE1',-3),xL('CB2',5)])
   + xrow([['NICKEL',lbl('CB3')||'NICKEL',-3],['DIME','DIME',-2.2],['DT1',dt1,-1],['DT2',dt2,1],xL('DE2',3)])
   + xrow([['SAM',sam,-2],['MIKE',mike,0],['WILL',will,2]])
   + xrow([xL('SS',-2),xL('FS',2)])
   + '</div>'
   + '</div>';""",
"""  return '<div class="zpb-fm" role="img" aria-label="Where they belong: your starters at their stations"' + (vars ? ' style="' + vars + '"' : '') + '>'
   + '<div class="zpb-fm-side zpb-fm-off">'
   + xrow([xL('RB1',-2),['FB', lbl('FB'), 2]])
   + xrow([xL('QB',0)])
   + xrow([xL('WR1',-5),xL('TE1',-3),xL('OT1',-2),xL('OG1',-1),xL('C',0),xL('OG2',1),xL('OT2',2),xL('WR3',4),xL('WR2',5),xL('WR4',6.2)])
   + '</div>'
   + '<div class="zpb-fm-scrim"><span>LINE OF SCRIMMAGE</span></div>'
   + '<div class="zpb-fm-side zpb-fm-def">'
   + xrow([xL('CB1',-5),xL('DE1',-3),xL('DT1',-1),xL('DT2',1),xL('DE2',3),xL('CB2',5)]) // w33 (R4, Owner): the tackles and the right DE press the line
   + xrow([['NICKEL',lbl('CB3')||'NICKEL',-3],['DIME','DIME',3]]) // w33 (R4, Owner): the nickel holds; the dime takes the right DE's old station
   + xrow([xL('TE3',-4.6),['SAM',sam,-2],['MIKE',mike,0],['WILL',will,2],xL('DL5',4.6)])
   + xrow([xL('SS',-2),xL('FS',2)])
   + '</div>'
   + '</div>';""")

# ---------- R7 · the draft-review page: cards first, then the map; both fade in draft order ----------
add(
"""function wireRowClicks(panel, allForClick){
 function fillDetail(idx){
  const e = allForClick[idx];
  const metrics = computeDetailMetrics(e.pool);
  const wrap = document.getElementById(`detailwrap-${idx}`);
  let html = `<h4 style="margin-top:0;">WHERE YOUR PLAYERS LINE UP?</h4>${(window.zpbBelongMapHTML ? window.zpbBelongMapHTML(e) : '')}`; // w32 (Owner): the Owner's own title // w27 (Owner): the roster list above the cards is gone — the draft pick wears the field instead
  if(e.isUser && typeof zpbDraftBreakdownHTML === 'function') html += zpbDraftBreakdownHTML(e); // w26 (Owner): the badges breakdown
  html += renderDetailHTML(e.label, metrics).replace(/<button class="closebtn"[^>]*>[^<]*<\/button>/,'');""",
"""// w33 (R7, Owner): the pick-order register — the order every card and bubble lands in
window.zpbSetDraftOrder = function(entry){
 try{
  const order = (draftSim && draftSim.log) ? draftSim.log.filter(l=>l.isUser).map(l=>l.player[0]) : [];
  const seen = new Set(); const idx = {};
  order.forEach(n=>{ if(!seen.has(n)){ seen.add(n); idx[n] = seen.size; } });
  // any starter who never shows in the log (undo edges) lands after the drafted ones
  Object.keys(entry.slotmap||{}).forEach(s=>{ const en = entry.slotmap[s]; const nm = en && en[0]; if(nm && !idx[nm]) idx[nm] = 90 + Object.keys(idx).length; });
  window.zpbBeatOf = n=> idx[n] || '';
  return idx;
 }catch(err){ window.zpbBeatOf = function(){ return ''; }; return {}; }
};
// w33 (R7, Owner): the full player-card list, grouped by position group, fading in draft order — and the map follows it
window.zpbDraftCardsFirstHTML = function(entry){
 try{
  if(!entry || !entry.slotmap) return '';
  const nse = (typeof normalizeSlotEntry === 'function') ? normalizeSlotEntry : function(x){ return x; };
  const groups = (typeof GROUPS !== 'undefined') ? GROUPS : [];
  const vars = (entry.teamName && typeof zpbRowVars === 'function') ? zpbRowVars(entry.teamName) : '';
  const beatOf = window.zpbBeatOf || function(){ return ''; };
  let html = '<h4 style="margin:0 0 4px;">YOUR PLAYERS \u00b7 IN THE ORDER YOU DRAFTED THEM</h4><p class="narr" style="margin:0 0 8px;">Grouped by position. Hover a card and his station lights up on the field below.</p>';
  groups.forEach(function(g){
   const slots = g[1].filter(function(s){ return s!=='CB4'; });
   const rows = slots.map(function(s){ const en = entry.slotmap[s] ? nse(entry.slotmap[s]) : null; return en && en.name ? {s, en} : null; }).filter(Boolean)
     .sort(function(a,b){ return (beatOf(a.en.name)||99) - (beatOf(b.en.name)||99); });
   if(!rows.length) return;
   html += '<div class="zpb-dbk-g"><div class="zpb-dbk-gh">'+g[0].toUpperCase()+'</div><div class="zpb-dbk-row">';
   rows.forEach(function(r){
    const b = beatOf(r.en.name);
    const cls = r.en.ovr>=90 ? ' zpb-shm' : (r.en.ovr>=85 ? ' zpb-vib' : '');
    const rnd = entry.pickRounds ? entry.pickRounds[r.s] : null;
    html += '<span class="zpb-dbk zpb-dfc2" data-slot="'+r.s+'"'+(b?' data-beat="'+b+'" style="--beat:'+b+';'+vars+'"':' style="'+vars+'"')+'><b class="'+cls+'">'+r.en.name+'</b><i>'+((typeof LABELS!=='undefined'&&LABELS[r.s])||r.s)+' \\u00b7 '+r.en.ovr+' OVR'+(rnd?' \\u00b7 R'+rnd:'')+'</i></span>';
   });
   html += '</div></div>';
  });
  html += '</div>';
  return html;
 }catch(err){ return ''; }
};
// w33 (R5, Owner): the highlight runs both ways — card to station, station to card
window.zpbWireReverseHighlight = function(host){
 try{
  const map = host.querySelector('.zpb-fm'); if(!map) return;
  const stationOf = sl=> map.querySelector('.zpb-fm-ini[data-slot="'+sl+'"]');
  host.querySelectorAll('.zpb-dfc2[data-slot], .zpb-dbk[data-slot]').forEach(card=>{
   const sl = card.dataset.slot;
   card.addEventListener('mouseenter', ()=>{ const st = stationOf(sl); if(st){ st.classList.add('zpb-fm-hot'); } });
   card.addEventListener('mouseleave', ()=>{ map.querySelectorAll('.zpb-fm-hot').forEach(x=>x.classList.remove('zpb-fm-hot')); });
   card.addEventListener('focus', ()=>{ const st = stationOf(sl); if(st){ st.classList.add('zpb-fm-hot'); } });
   card.addEventListener('blur', ()=>{ map.querySelectorAll('.zpb-fm-hot').forEach(x=>x.classList.remove('zpb-fm-hot')); });
  });
  map.querySelectorAll('.zpb-fm-ini[data-slot]').forEach(st=>{
   const sl = st.dataset.slot;
   st.addEventListener('mouseenter', ()=>{ host.querySelectorAll('.zpb-dfc2[data-slot="'+sl+'"], .zpb-dbk[data-slot="'+sl+'"]').forEach(c=>c.classList.add('zpb-dbk-hot')); });
   st.addEventListener('mouseleave', ()=>{ host.querySelectorAll('.zpb-dbk-hot').forEach(c=>c.classList.remove('zpb-dbk-hot')); });
  });
 }catch(err){}
};
function wireRowClicks(panel, allForClick){
 function fillDetail(idx){
  const e = allForClick[idx];
  const metrics = computeDetailMetrics(e.pool);
  const wrap = document.getElementById(`detailwrap-${idx}`);
  // w33 (R7, Owner): the cards lead, in draft order; the field follows; the map title rides above the viz
  if(e.isUser && window.zpbSetDraftOrder) window.zpbSetDraftOrder(e);
  let html = '';
  if(e.isUser) html += (window.zpbDraftCardsFirstHTML ? window.zpbDraftCardsFirstHTML(e) : '');
  html += `<h4 style="margin:14px 0 0;">WHERE YOUR PLAYERS LINE UP?</h4>${(window.zpbBelongMapHTML ? window.zpbBelongMapHTML(e) : '')}`; // w32 (Owner): the Owner's own title // w27 (Owner): the draft pick wears the field
  if(e.isUser && typeof zpbDraftBreakdownHTML === 'function') html += zpbDraftBreakdownHTML(e); // w26 (Owner): the badges breakdown
  html += renderDetailHTML(e.label, metrics).replace(/<button class="closebtn"[^>]*>[^<]*<\/button>/,'');""")

add(
"""  wrap.innerHTML = html;
 }
 panel.querySelectorAll('tr.teamrow').forEach(tr=>{""",
"""  wrap.innerHTML = html;
  if(e.isUser && window.zpbWireReverseHighlight){ try{ window.zpbWireReverseHighlight(wrap); }catch(err){} }
 }
 panel.querySelectorAll('tr.teamrow').forEach(tr=>{""")

# ---------- R8 · the YOUR BREAKDOWN badges stop listing twice ----------
add(
"""  var tier = function(o){ return o>=90 ? 'zpb-shm' : (o>=85 ? 'zpb-vib' : ''); };
  var out = '<div class="zpb-dbk-wrap">'; // w32 (Owner): the player panels list leads; the note and Your Breakdown follow
  groups.forEach(function(g){
   var slots = g[1].filter(function(s){ var en = nse(e.slotmap[s]); return en && en.name; });
   if(!slots.length) return;
   var sum = 0; slots.forEach(function(s){ var en = nse(e.slotmap[s]); sum += en.ovr || 70; });
   var myAvg = sum / slots.length;
   var avgs = rosters.map(function(r){
    var s2 = 0, n = 0;
    slots.forEach(function(s){ var en = r.slots ? nse(r.slots[s]) : null; if(en && en.name){ s2 += en.ovr || 70; n++; } });
    return n ? s2/n : 0;
   });
   var rank = 1 + avgs.filter(function(v){ return v > myAvg + 0.001; }).length;
   var cls = rank <= 8 ? ' zpb-sb-good' : (rank >= 25 ? ' zpb-sb-bad' : '');
   out += '<span class="zpb-sbadge'+cls+'"><b>#'+rank+'</b><i>'+g[0].toUpperCase()+' \\u00b7 '+Math.round(myAvg)+' OVR</i></span>';
  });
  out += '</div>';
  groups.forEach(function(g){""",
"""  var tier = function(o){ return o>=90 ? 'zpb-shm' : (o>=85 ? 'zpb-vib' : ''); };
  var out = ''; // w33 (R8, Owner): the rank badges lived twice — the copy directly under the visualization is gone; the Your Breakdown section keeps them""")

def main():
    src = open(SRC, encoding='utf-8').read()
    for i, (old, new, n) in enumerate(E):
        c = src.count(old)
        if c != n:
            print(f'FAIL entry {i}: expected {n} match(es), found {c}')
            print('--- snippet head ---')
            print(old[:240])
            sys.exit(1)
        src = src.replace(old, new)
    open(DST, 'w', encoding='utf-8').write(src)
    print('w33_patch3 OK ->', DST, len(src), 'bytes')

if __name__ == '__main__':
    main()
