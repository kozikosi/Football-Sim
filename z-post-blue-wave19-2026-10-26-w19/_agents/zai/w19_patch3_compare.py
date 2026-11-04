#!/usr/bin/env python3
"""WAVE 19 · PATCH 3 — Team Comparison + Position Rankings + Anchor/Leak package.
Fixes the invisible-shimmer bug (players 'not generated'), pre-season lineup panel,
lineup panel lines, zone titles, Full Depth Chart redesign, group-rankings styling,
and the ANCHOR / LEAK chips that replace the Brewer sentence."""
import sys

P = '/home/z/my-project/Football-Sim/Football-Sim-Z-post-blue w19.html'
src = open(P, encoding='utf-8').read()
n = 0

def rep(old, new, tag):
    global src, n
    c = src.count(old)
    if c != 1:
        print(f'FAIL [{tag}]: {c} matches'); sys.exit(1)
    src = src.replace(old, new)
    n += 1
    print(f'ok [{tag}]')

# ---- 3a · lineup table cells carry their team's palette vars (shimmer colors fixed) ----
rep(
"""   const zpbLuB = (ll, rr, lab)=>`<div class="zpb-lu-row">
    <span class="zpb-lu-cell zpb-lu-l ${ll.val>=90?'zpb-shm':(ll.val>=85?'zpb-vib':'')} ${ll.val>rr.val?'zpb-lu-win':''}"${ll.val>=85?` title="${ll.val} OVR"`:''}>${ll.text}</span>
    <span class="zpb-lu-c">${lab}</span>
    <span class="zpb-lu-cell zpb-lu-r ${rr.val>=90?'zpb-shm':(rr.val>=85?'zpb-vib':'')} ${rr.val>ll.val?'zpb-lu-win':''}"${rr.val>=85?` title="${rr.val} OVR"`:''}>${rr.text}</span>
   </div>`;""",
"""   const zpbLuB = (ll, rr, lab)=>`<div class="zpb-lu-row">
    <span class="zpb-lu-cell zpb-lu-l ${ll.text!=='—'&&zL?'zpb-trow':''} ${ll.val>=90?'zpb-shm':(ll.val>=85?'zpb-vib':'')} ${ll.val>rr.val?'zpb-lu-win':''}" style="${ll.text!=='—'&&zL?zL:''}"${ll.val>=85?` title="${ll.val} OVR"`:''}>${ll.text}</span>
    <span class="zpb-lu-c">${lab}</span>
    <span class="zpb-lu-cell zpb-lu-r ${rr.text!=='—'&&zR?'zpb-trow':''} ${rr.val>=90?'zpb-shm':(rr.val>=85?'zpb-vib':'')} ${rr.val>ll.val?'zpb-lu-win':''}" style="${rr.text!=='—'&&zR?zR:''}"${rr.val>=85?` title="${rr.val} OVR"`:''}>${rr.text}</span>
   </div>`; // w19: each side wears its own team palette so 90+ shimmer is never invisible""", '3a lineup cell vars')

# ---- 3b · CSS: the wash must not kill the shimmer gradient on lineup cells ----
rep(
""".zpb-lu-cell{border:0;box-shadow:none;background:transparent;}
.zpb-lu-cell.zpb-trow{background:var(--zr1,transparent);border-radius:10px;}""",
""".zpb-lu-cell{border:0;box-shadow:none;background:transparent;}
.zpb-lu-cell.zpb-shm{background:linear-gradient(100deg,var(--zrb,var(--accent)) 18%,#ffe9c6 38%,var(--zrb,var(--accent)) 55%,#fff6e3 72%,var(--zrb,var(--accent)) 88%);background-size:230% 100%;-webkit-background-clip:text;background-clip:text;animation:zpbshmsweep 3.4s linear infinite;} /* w19 fix: shimmer survives the transparent wash */
.zpb-lu-cell.zpb-trow{background:var(--zr1,transparent);border-radius:10px;}""", '3b shimmer CSS restore')

# ---- 3c · Lineup & flex panel: pre-season only (Owner) ----
rep(
""" container.innerHTML = `
  <div class="panel" style="margin-bottom:14px;">
   <h4 style="margin-top:0;">Lineup &amp; flex</h4>
   <p class="narr" style="margin-top:0;">Pick who plays where. Players can flex to any spot their position allows.</p>
   <div id="lineupHost"></div>
  </div>
  <div class="panel" style="margin-bottom:14px;">
   <h4 style="margin-top:0;">Your Full Depth Chart (depth-chart order)</h4>
   ${renderDepthChartHTML(myEntry.slotmap, myEntry.pickRounds, myEntry.teamName)}
  </div>""",
""" container.innerHTML = `
  ${seasonState ? `
  <div class="panel" style="margin-bottom:14px;">
   <h4 style="margin-top:0;">Lineup &amp; flex</h4>
   <p class="narr" style="margin-top:0;">Pick who plays where. Players can flex to any spot their position allows.</p>
   <div id="lineupHost"></div>
  </div>` : '' /* w19 (Owner): before the season begins there is nothing to flex yet — the panel waits */}
  <div class="panel" style="margin-bottom:14px;">
   <h4 style="margin-top:0;">Your Full Depth Chart</h4>
   ${zpbDepthZonesHTML(myEntry.slotmap, myEntry.pickRounds, myEntry.teamName)}
  </div>""", '3c pre-season gate + zones')

# ---- 3d · the lineup editor's own line work (Owner: one vertical left, one right, one horizontal bottom) ----
rep(
""" return `<div id="${hostId}">${lineupScoresHTML(roster, hostId)}<div id="${hostId}Advice">${lineupAdviceHTML(roster, hostId)}</div><div class="draft-columns" style="grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:8px;">${groups}</div></div>`;""",
""" return `<div id="${hostId}">${lineupScoresHTML(roster, hostId)}<div id="${hostId}Advice">${lineupAdviceHTML(roster, hostId)}</div><div class="draft-columns zpb-lu-cols" style="grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:8px;">${groups}</div></div>`;""", '3d-1 editor cols class')

# ---- 3e · position rankings: Cinzel Decorative, integers, two palette colors, 90+/85+, floating note ----
rep(
""" document.getElementById('groupCount').textContent = `Ranking by ${def.label} — top ${def.n} player${def.n===1?'':'s'} per team (missing slots filled at 70 OVR)`;
 const body = document.getElementById('groupBody');
 let h = '';
 results.forEach((r, idx)=>{
  const names = r.top.map(p=>`${p[0]} (${p[3]})`).join(', ') || '—';
  h += `<tr><td class="rank">${idx+1}</td><td class="team">${r.team}</td><td class="score">${r.avg.toFixed(1)}</td><td class="narr">${names}</td></tr>`;
 });
 body.innerHTML = h;
}""",
""" document.getElementById('groupCount').textContent = `Ranking by ${def.label} — top ${def.n} player${def.n===1?'':'s'} per team`;
 const body = document.getElementById('groupBody');
 let h = '';
 results.forEach((r, idx)=>{
  const names = r.top.map(p=>zpbGroupPlayerHTML(p)).filter(Boolean).join('<span class="zpb-gsep">·</span>') || '<span class="zpb-gempty">—</span>';
  h += `<tr class="zpb-grow"><td class="rank">${idx+1}</td><td class="team">${r.team}</td><td class="score">${Math.round(r.avg)}</td><td class="narr">${names}</td></tr>`;
 });
 body.innerHTML = h;
 const panel = body.closest('.panel');
 if(panel){ const old = panel.querySelector('.zpb-70note'); if(old) old.remove();
  const note = document.createElement('div'); note.className = 'zpb-70note'; note.textContent = 'Missing slots filled at 70 OVR';
  panel.appendChild(note); } // w19 (Owner): no parentheses, and it floats in at the very bottom
}
// one player in the rankings: his name and his number wear two different colors of his team's palette (w19, Owner)
function zpbGroupPlayerHTML(p){
 if(!p) return '';
 const pk = (typeof zpbPackFor==='function') ? zpbPackFor(p[2]) : null;
 const vars = pk ? `--nm:${pk.txL};--nmd:${pk.txd};--nu:${pk.accL};--nud:${(window.zpbLift?zpbLift(pk.accL,0.55):pk.accL)};--zrb:${pk.accL};` : '';
 const cls = p[3]>=90 ? 'zpb-shm' : (p[3]>=85 ? 'zpb-vib' : '');
 return `<span class="zpb-gplayer" style="${vars}"><span class="zpb-gname ${cls}">${p[0]}</span> <span class="zpb-gnum">${p[3]}</span></span>`;
}""", '3e renderGroups')

# ---- 3f · series rankings: same treatment ----
rep(
"""   sum += e ? e.ovr : 70;
   names.push(e && e.name ? e.name + ' (' + e.ovr + ')' : '\\u2014 (70)');
  });
  return {team, avg: slots.length ? sum/slots.length : 0, names};
 });
 results.sort((a,b)=>b.avg-a.avg);
 document.getElementById('groupCount').textContent = 'Ranking by the ' + slots.length + ' most valuable spots: ' + slots.join(' + ');
 const body = document.getElementById('groupBody');
 let h = '';
 results.forEach((r, idx)=>{
  h += '<tr><td class="rank">' + (idx+1) + '</td><td class="team">' + r.team + '</td><td class="score">' + r.avg.toFixed(1) + '</td><td class="narr">' + r.names.join(', ') + '</td></tr>';
 });
 body.innerHTML = h;
}""",
"""  sum += e ? e.ovr : 70;
   names.push(e && e.name ? {p:[e.name, e.ovr, team]} : null);
  });
  return {team, avg: slots.length ? sum/slots.length : 0, names};
 });
 results.sort((a,b)=>b.avg-a.avg);
 document.getElementById('groupCount').textContent = 'Ranking by the ' + slots.length + ' most valuable spots: ' + slots.join(' + ');
 const body = document.getElementById('groupBody');
 let h = '';
 results.forEach((r, idx)=>{
  const cells = r.names.map(x=> x ? zpbGroupPlayerHTML(x.p) : '<span class="zpb-gempty">70</span>').filter(Boolean).join('<span class="zpb-gsep">·</span>');
  h += '<tr class="zpb-grow"><td class="rank">' + (idx+1) + '</td><td class="team">' + r.team + '</td><td class="score">' + Math.round(r.avg) + '</td><td class="narr">' + cells + '</td></tr>';
 });
 body.innerHTML = h;
 const panel = body.closest('.panel');
 if(panel){ const old = panel.querySelector('.zpb-70note'); if(old) old.remove();
  const note = document.createElement('div'); note.className = 'zpb-70note'; note.textContent = 'Missing slots filled at 70 OVR';
  panel.appendChild(note); }
}""", '3f series groups')

# ---- 3g · ANCHOR / LEAK chips replace the sentence (Owner: a more creative word, visualized) ----
rep(
"""  let narr = '';
  if(best && worst && best.name !== worst.name){
   narr = `Anchored by ${best.name} (${best.slot}, ${best.ovr} OVR); ${worst.slot} is the soft spot at ${worst.ovr}.`;
  } else if(best){
   narr = `Headlined by ${best.name} (${best.slot}, ${best.ovr} OVR).`;
  }""",
"""  let narr = '';
  if(best && worst && best.name !== worst.name){
   // w19 (Owner): the roster's story is two chips — the ANCHOR that holds, and the LEAK that gives it back
   narr = `<span class="zpb-anch" title="The player this roster leans on"><i>⚓</i><b>ANCHOR</b> ${best.name} · ${best.slot} · ${best.ovr}</span>`
        + `<span class="zpb-leak" title="The spot that gives most of it back"><i>◍</i><b>LEAK</b> ${worst.slot} · ${worst.ovr}</span>`;
  } else if(best){
   narr = `<span class="zpb-anch" title="The player this roster leans on"><i>⚓</i><b>ANCHOR</b> ${best.name} · ${best.slot} · ${best.ovr}</span>`;
  }""", '3g anchor/leak chips')

# ---- 3h · CSS for the new pieces ----
rep(
"""/* w19 (Owner): wins stacks on top of the Draft button; position cards stack in depth-chart order */""",
"""/* ---- w19: team comparison & position rankings ---- */
/* lineup editor line work: keep the left gold line, a right vertical, and a horizontal at the bottom */
#lineupHost .depth-group{border-left:3px solid var(--accent);}
#lineupHost .depth-group.def, #lineupHost .depth-group.st{border-left:none;}
#lineupHost .depth-group h4{text-align:center;}
.zpb-lu-cols{border-right:3px solid var(--accent2);border-bottom:3px solid var(--sub);padding-right:12px;padding-bottom:10px;}
/* Full Depth Chart zones (revisualization) */
.zpb-dz{display:grid;grid-template-columns:1.15fr 1.15fr .62fr;gap:12px;}
@media (max-width:900px){ .zpb-dz{grid-template-columns:1fr;} }
.zpb-dz-zone{border:1px solid var(--border);border-radius:12px;background:var(--panel2);padding:8px 10px;min-width:0;}
.zpb-dz-zone.zpb-dz-off{border-top:3px solid var(--accent);}
.zpb-dz-zone.zpb-dz-def{border-top:3px solid var(--accent2);}
.zpb-dz-zone.zpb-dz-st{border-top:3px solid var(--sub);}
.zpb-dz-zone h4{margin:0 0 6px;text-align:center;font-size:0.74rem;text-transform:uppercase;letter-spacing:.14em;color:var(--sub);}
.zpb-dz-row{display:grid;grid-template-columns:3.2em minmax(0,1fr) 2.4em;gap:8px;align-items:baseline;padding:3px 0;border-top:1px solid var(--border);font-size:0.8rem;}
.zpb-dz-row:first-of-type{border-top:none;}
.zpb-dz-row .slotname{color:var(--sub);font-size:0.68rem;font-weight:800;letter-spacing:.06em;}
.zpb-dz-row .zpb-dz-name{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.zpb-dz-row .zpb-dz-ovr{text-align:right;font-weight:600;}
.zpb-dz-row .narr{font-size:0.68rem;}
/* position rankings: Cinzel Decorative everywhere, two team colors per player */
#viewGroups{font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif;}
#viewGroups table{font-family:inherit;}
.zpb-gplayer{white-space:nowrap;}
.zpb-gname{color:var(--nm,inherit);}
.zpb-gnum{color:var(--nu,inherit);font-weight:700;margin-left:3px;}
:root[data-theme="dark"] .zpb-gname{color:var(--nmd,var(--nm,inherit));}
:root[data-theme="dark"] .zpb-gnum{color:var(--nud,var(--nu,inherit));}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .zpb-gname{color:var(--nmd,var(--nm,inherit));}
 :root:not([data-theme="light"]) .zpb-gnum{color:var(--nud,var(--nu,inherit));}
}
.zpb-gsep{color:var(--sub);margin:0 5px;opacity:.6;}
.zpb-gempty{color:var(--sub);}
.zpb-70note{text-align:center;font-size:0.68rem;letter-spacing:.1em;color:var(--sub);padding:8px 0 2px;opacity:0;transform:translateY(4px);animation:zpb70in 1.6s ease .5s forwards;}
@keyframes zpb70in{to{opacity:1;transform:translateY(0);}}
/* ANCHOR / LEAK chips (Madden rankings rows) */
.zpb-anch,.zpb-leak{display:inline-flex;align-items:center;gap:5px;border:1px solid var(--border);border-radius:999px;padding:1px 9px 1px 6px;font-size:0.7rem;font-weight:600;margin:1px 6px 1px 0;white-space:nowrap;}
.zpb-anch i,.zpb-leak i{font-style:normal;font-size:0.78rem;}
.zpb-anch{border-color:var(--gold3,var(--accent));color:var(--ongold,var(--text));background:var(--gold2,var(--accent));}
.zpb-anch b{font-weight:800;letter-spacing:.1em;}
.zpb-leak{border-color:var(--rosehair,var(--border));color:var(--rosehair,var(--sub));background:transparent;}
.zpb-leak b{font-weight:800;letter-spacing:.1em;}
/* w19 (Owner): wins stacks on top of the Draft button; position cards stack in depth-chart order */""", '3h CSS')

# ---- 3i · the Full Depth Chart zones renderer (new visualization) ----
rep(
"function renderDepthChartHTML(slotmap, pickRounds, owner){",
"""// w19 (Owner): the Full Depth Chart reads as three zones — OFFENSE · DEFENSE · SPECIAL TEAMS —
// titles centered over the names, filled slots shimmering, 90+ names shimmering and 85+ burning brighter,
// the Dime riding inside the defense with no box and no dash.
function zpbDepthZonesHTML(slotmap, pickRounds, owner){
 const zst = (owner && typeof zpbRowVars==='function') ? zpbRowVars(owner) : '';
 const row = s=>{
  const e = normalizeSlotEntry(slotmap[s]);
  const rnd = pickRounds && pickRounds[s];
  const nm = e && e.name ? e.name : '';
  const ovr = e && e.name ? e.ovr : '';
  const cls = e && e.name ? (e.ovr>=90 ? 'zpb-shm' : (e.ovr>=85 ? 'zpb-vib' : '')) : '';
  return `<div class="zpb-dz-row${e&&e.name&&zst?' zpb-trow':''}"${e&&e.name&&zst?` style="${zst}"`:''}><span class="slotname${e&&e.name?' zpb-shm':''}">${LABELS[s]||s}</span><span class="zpb-dz-name ${cls}">${nm}${rnd?` <span class="narr">R${rnd}</span>`:''}</span><span class="zpb-dz-ovr">${ovr}</span></div>`;
 };
 const zone = (title, cls, slots, extra)=>`<div class="zpb-dz-zone ${cls}"><h4>${title}</h4>${slots.map(row).join('')}${extra||''}</div>`;
 const dimeRow = ()=>{ // the Dime rides in the defense zone — same row shape, no box, no dash (w19, Owner)
  const d = window.zpbDimeOf ? window.zpbDimeOf(slotmap) : null;
  const e = d ? normalizeSlotEntry(d) : null;
  const nm = e && e.name!=null ? e.name : '';
  const ovr = e && e.name!=null ? e.ovr : '';
  const cls = e && e.name!=null ? (e.ovr>=90?'zpb-shm':(e.ovr>=85?'zpb-vib':'')) : '';
  return `<div class="zpb-dz-row"><span class="slotname${nm?' zpb-shm':''}">Dime</span><span class="zpb-dz-name ${cls}">${nm}</span><span class="zpb-dz-ovr">${ovr}</span></div>`;
 };
 return `<div class="zpb-dz">
  ${zone('Offense','zpb-dz-off', DEPTH_CHART_GROUPS[0][2])}
  ${zone('Defense','zpb-dz-def', DEPTH_CHART_GROUPS[1][2], dimeRow())}
  ${zone('Special Teams','zpb-dz-st', DEPTH_CHART_GROUPS[2][2])}
 </div>`;
}

function renderDepthChartHTML(slotmap, pickRounds, owner){""", '3i depth zones renderer')

open(P, 'w', encoding='utf-8').write(src)
print(f'\nPATCH 3 complete: {n} replacements')
