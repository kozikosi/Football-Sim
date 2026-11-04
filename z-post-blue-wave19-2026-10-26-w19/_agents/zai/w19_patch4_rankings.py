#!/usr/bin/env python3
"""WAVE 19 · PATCH 4 — Madden Rankings + Lineups menu package.
Weights as badges, sentence moved, 70-OVR note to team detail, lineups name-only,
integer group-score badges in one row with Rushing added, no wins in the advice,
static 20-0 nudged right."""
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

# ---- 4a · rankings subtitle: sentence and 70-OVR note leave the top of the page ----
rep(
"""const SUPP_TITLES = {tabRankingsBtn:['Madden Rankings','Adjust any weight on the left and every team\\'s score and rank recalculates instantly. Missing depth-chart slots are filled with a default of 70 OVR. Click any team row for a detailed breakdown.'],""",
"""const SUPP_TITLES = {tabRankingsBtn:['Madden Rankings','Every team graded by the weights below. Click any team row for a detailed breakdown.'],""", '4a subtitle')

# ---- 4b · weights become badges; the moved sentence sits just above the panel ----
rep(
"""function buildControls(){
 const el = document.getElementById('controls');
 let h = '';""",
"""function buildControls(){
 const el = document.getElementById('controls');
 let h = '<p class="zpb-wadj">Adjust any weight and every team\\'s score and rank recalculates instantly.</p>'; // w19 (Owner): moved down here, the word left is gone""", '4b-1 sentence')

rep(
""" GROUPS.forEach(([gname, slots])=>{
  h += `<div class="group"><h3>${gname}</h3>`;
  slots.forEach(s=>{
   h += `<div class="row"><label for="w_${s}">${LABELS[s]}</label><input id="w_${s}" type="number" data-slot="${s}" value="${weights[s]}"></div>`;
  });
  h += `</div>`;
 });""",
""" GROUPS.forEach(([gname, slots])=>{
  h += `<div class="group"><h3>${gname}</h3><div class="zpb-wbadges">`;
  slots.forEach(s=>{
   const w = Math.round(weights[s]||0);
   h += `<button type="button" class="zpb-wbadge${w<=0?' zpb-woff':''}" data-wslot="${s}" title="${LABELS[s]} — click to raise, shift-click to lower">${LABELS[s]}<b>${w}</b></button>`; // w19 (Owner): weights wear badges
  });
  h += `</div></div>`;
 });""", '4b-2 badges markup')

rep(
""" el.querySelectorAll('input[type=number]').forEach(inp=>{
  inp.addEventListener('input', ()=>{
   if(inp.dataset.slot){
    weights[inp.dataset.slot] = parseFloat(inp.value) || 0;
   } else if(synergy.hasOwnProperty(inp.id)){
    synergy[inp.id] = parseFloat(inp.value) || 0;
   }
   render();
  });
 });""",
""" el.querySelectorAll('input[type=number]').forEach(inp=>{
  inp.addEventListener('input', ()=>{
   if(synergy.hasOwnProperty(inp.id)){
    synergy[inp.id] = parseFloat(inp.value) || 0;
   }
   render();
  });
 });
 el.querySelectorAll('.zpb-wbadge').forEach(b=>{
  b.addEventListener('click', e=>{
   const s = b.dataset.wslot, cur = Math.round(weights[s]||0);
   weights[s] = e.shiftKey ? Math.max(0, cur-1) : (cur+1)%11; // click raises, shift-click lowers (w19)
   b.querySelector('b').textContent = Math.round(weights[s]);
   b.classList.toggle('zpb-woff', weights[s]<=0);
   render();
  });
 });""", '4b-3 badge handlers')

rep(
""" const refresh = ()=>{ el.querySelectorAll('input[data-slot]').forEach(inp=>{ inp.value = weights[inp.dataset.slot]; }); render(); };""",
""" const refresh = ()=>{ el.querySelectorAll('.zpb-wbadge').forEach(b=>{ const s = b.dataset.wslot, w = Math.round(weights[s]||0); b.querySelector('b').textContent = w; b.classList.toggle('zpb-woff', w<=0); }); render(); };""", '4b-4 refresh')

# ---- 4c · 70-OVR note fades in and out at the bottom of the team detail panel ----
rep(
"""  <div class="detail-text">
   <h4>Strengths</h4>
   ${strengthItems}
   <h4>Weaknesses</h4>
   ${weaknessItems}
  </div>
 `;""",
"""  <div class="detail-text">
   <h4>Strengths</h4>
   ${strengthItems}
   <h4>Weaknesses</h4>
   ${weaknessItems}
  </div>
  <div class="zpb-70fade">Missing depth-chart slots are filled with a default of 70 OVR</div>
 `;""", '4c detail note')

# ---- 4d · lineups menu: only the player's name inside the clickable boxes ----
rep(
"""    return `<option value="${p[0].replace(/"/g,'&quot;')}" ${cur&&cur[0]===p[0]?'selected':''}>${p[0]} · ${POS_DISPLAY[p[1]]||p[1]} · ${p[3]-fp}${fp?` (−${fp})`:''}</option>`;""",
"""    return `<option value="${p[0].replace(/"/g,'&quot;')}" ${cur&&cur[0]===p[0]?'selected':''}>${p[0]}</option>`; // w19 (Owner): the box carries the name, nothing else""", '4d name-only options')

# ---- 4e · the advice rows: bare numbers, wins gone from the menu ----
rep(
"""function lineupAdviceHTML(roster, hostId){
 const adv = lineupAdvice(roster), wpo = slotWinsPerOvr();""",
"""function lineupAdviceHTML(roster, hostId){
 const adv = lineupAdvice(roster);""", '4e-1 drop wpo')

rep(
"""  return `<tr><td>${LABELS[m.slot]||m.slot}</td><td>${m.from[0]} <span class="narr">(${effB} here)</span></td><td>→ ${m.to[0]} <span class="narr">(${effA} here${isOutOfPosition(m.to[1], m.slot)?`, flex −${flexPenaltyFor(m.to[1], m.slot)}`:''}; ${wpo[m.slot].toFixed(3)} wins per OVR at this slot)</span></td></tr>`;""",
"""  return `<tr><td>${LABELS[m.slot]||m.slot}</td><td>${m.from[0]} <span class="narr">${effB}</span></td><td>→ ${m.to[0]} <span class="narr">${effA}${isOutOfPosition(m.to[1], m.slot)?`, flex −${flexPenaltyFor(m.to[1], m.slot)}`:''}</span></td></tr>`; // w19 (Owner): just the OVR — no wins math in this menu""", '4e-2 rows')

rep(
""" h += `<p style="margin:4px 0;"><b>The math recommends a different lineup worth +${adv.gain.toFixed(2)} wins a season</b> <span class="narr">(about +${(adv.gain*POINTS_PER_WIN/17).toFixed(2)} points a game)</span>. It is a suggestion — you can keep your lineup and play less efficiently.</p>""",
""" h += `<p style="margin:4px 0;"><b>The math recommends a different lineup, worth about +${(adv.gain*POINTS_PER_WIN/17).toFixed(1)} points a game</b>. It is a suggestion — you can keep your lineup and play less efficiently.</p>""", '4e-3 intro')

# ---- 4f · group scores: one row of equal integer badges, Rushing added ----
rep(
"""const LINEUP_GROUPS = [['Offense',['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','OT1','OT2','OG1','OG2','C']],['Receiving',['WR1','WR2','WR3','TE1','TE2']],['Offensive line',['OT1','OT2','OG1','OG2','C']],['Defense',['DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS']],['Defensive line',['DE1','DE2','DT1','DT2']],['Linebackers',['MIKE','WILL','SAM']],['Secondary',['CB1','CB2','CB3','SS','FS']]];""",
"""const LINEUP_GROUPS = [['Offense',['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','OT1','OT2','OG1','OG2','C']],['Rushing',['RB1','RB2','FB']],['Receiving',['WR1','WR2','WR3','TE1','TE2']],['Offensive line',['OT1','OT2','OG1','OG2','C']],['Defense',['DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS']],['Defensive line',['DE1','DE2','DT1','DT2']],['Linebackers',['MIKE','WILL','SAM']],['Secondary',['CB1','CB2','CB3','SS','FS']]]; // w19 (Owner): Rushing joins the row""", '4f-1 groups')

rep(
""" const mw = modelWeights(), cells = LINEUP_GROUPS.map(([name, slots])=>{
  let sum = 0, wt = 0; slots.forEach(sl=>{ const p = roster.slots[sl]; const w = mw[sl]||0; sum += (p ? effOvr(p, sl) : 70)*w; wt += w; });
  const v = wt ? sum/wt : 0, prev = _lineupPrev[hostId+name], d = prev==null ? 0 : v-prev;
  _lineupPrev[hostId+name] = v;
  const flexed = slots.some(sl=>{ const q = roster.slots[sl]; return q && isOutOfPosition(q[1], sl); }); // W15: tint when flexes drag the score down
  return `<div style="flex:1;min-width:120px;text-align:center;"><div style="font-size:1.3rem;font-weight:800;${flexed?'color:var(--rose,var(--accent2));':''}">${v.toFixed(1)}${Math.abs(d)>=0.05?` <span style="font-size:0.75rem;color:${d>0?'var(--good)':'var(--bad)'};">${d>0?'▲':'▼'}${Math.abs(d).toFixed(1)}</span>`:''}</div><div class="narr">${name}</div></div>`;
 }).join('');
 return `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">${cells}</div>`; // W15: caption removed (Owner)""",
""" const mw = modelWeights(), cells = LINEUP_GROUPS.map(([name, slots])=>{
  let sum = 0, wt = 0; slots.forEach(sl=>{ const p = roster.slots[sl]; const w = mw[sl]||0; sum += (p ? effOvr(p, sl) : 70)*w; wt += w; });
  const v = wt ? sum/wt : 0, prev = _lineupPrev[hostId+name], d = prev==null ? 0 : v-prev;
  _lineupPrev[hostId+name] = v;
  const flexed = slots.some(sl=>{ const q = roster.slots[sl]; return q && isOutOfPosition(q[1], sl); }); // W15: tint when flexes drag the score down
  const delta = Math.abs(d)>=0.5 ? `<i class="${d>0?'up':'dn'}">${d>0?'▲':'▼'}${Math.round(Math.abs(d))}</i>` : '';
  return `<div class="zpb-luscore${flexed?' zpb-luflex':''}"><b>${Math.round(v)}</b>${delta}<span>${name}</span></div>`; // w19 (Owner): integers only, badges in one row
 }).join('');
 return `<div class="zpb-luscores">${cells}</div>`; // W15: caption removed (Owner)""", '4f-2 badge cells')

# ---- 4g · the static 20-0 steps half a "0" to the right ----
rep(
""".zpb-home{padding-left:2px;}""",
""".zpb-home{padding-left:10px;} /* w19 (Owner): the 2 clears the screen edge by about half a glyph */""", '4g header nudge')

# ---- 4h · CSS for badges, fading note and score row ----
rep(
"""/* ---- w19: team comparison & position rankings ---- */""",
"""/* ---- w19: Madden rankings weights-as-badges + lineup score badges + fading 70 note ---- */
.zpb-wadj{margin:0 0 10px;font-size:0.8rem;color:var(--sub);}
.zpb-wbadges{display:flex;flex-wrap:wrap;gap:6px;}
.zpb-wbadge{border:1px solid var(--rosehair,var(--border));border-radius:999px;background:var(--panel2);color:var(--text);font-family:'Cinzel','Bodoni Moda',Georgia,serif;font-weight:700;font-size:0.72rem;letter-spacing:.04em;padding:4px 10px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:box-shadow .18s ease,transform .18s ease;}
.zpb-wbadge b{color:var(--tA2,var(--accent));font-size:0.8rem;}
.zpb-wbadge:hover{transform:translateY(-1px);box-shadow:0 0 12px var(--zr1,rgba(201,162,75,.35));}
.zpb-wbadge.zpb-woff{opacity:.45;}
.zpb-wbadge.zpb-woff b{color:var(--sub);}
.zpb-70fade{margin-top:16px;text-align:center;font-size:0.62rem;letter-spacing:.12em;color:var(--sub);animation:zpb70cycle 9s ease-in-out infinite;}
@keyframes zpb70cycle{0%{opacity:0}14%{opacity:.85}46%{opacity:.85}64%{opacity:0}100%{opacity:0}}
.zpb-luscores{display:flex;gap:8px;flex-wrap:nowrap;overflow-x:auto;margin-bottom:8px;}
.zpb-luscore{flex:1 0 0;min-width:88px;text-align:center;border:1px solid var(--border);border-radius:12px;padding:7px 6px 5px;background:var(--panel2);}
.zpb-luscore b{display:block;font-size:1.25rem;font-weight:800;line-height:1.1;}
.zpb-luscore i{font-style:normal;font-size:0.66rem;margin-left:3px;}
.zpb-luscore i.up{color:var(--good,var(--accent));}
.zpb-luscore i.dn{color:var(--bad,var(--accent2));}
.zpb-luscore span{display:block;font-size:0.6rem;letter-spacing:.1em;text-transform:uppercase;color:var(--sub);margin-top:2px;}
.zpb-luscore.zpb-luflex b{color:var(--rose,var(--accent2));}
/* ---- w19: team comparison & position rankings ---- */""", '4h CSS')

open(P, 'w', encoding='utf-8').write(src)
print(f'\nPATCH 4 complete: {n} replacements')
