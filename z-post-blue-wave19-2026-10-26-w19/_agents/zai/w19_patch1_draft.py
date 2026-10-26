#!/usr/bin/env python3
"""WAVE 19 · PATCH 1 — Draft board package (Owner round 13).
Asserted exact replacements; aborts loudly if any anchor is missing."""
import sys

P = '/home/z/my-project/Football-Sim/Football-Sim-Z-post-blue w19.html'
src = open(P, encoding='utf-8').read()
orig = src
n = 0

def rep(old, new, tag):
    global src, n
    c = src.count(old)
    if c != 1:
        print(f'FAIL [{tag}]: {c} matches'); sys.exit(1)
    src = src.replace(old, new)
    n += 1
    print(f'ok [{tag}]')

# ---- 1a · userFits: natural-first fills (Owner: flex only when naturals are full) ----
rep(
"""function userFits(roster, p){
 const c = POS_SLOT_MAP[p[1]]; if(!c) return [];
 const byG = {};
 for(const s of eligibleOpen(roster, p)){
  if(roster.slots[s]) continue;
  const g = WV_SLOT_GROUP[s], v = slotWins(s, effOvr(p,s)) - slotWins(s, WINS_BASE);
  if(!byG[g] || v>byG[g].v+1e-9) byG[g] = {slot:s, g, v, flex:isOutOfPosition(p[1],s), pen:flexPenaltyFor(p[1],s)};
 }
 return Object.values(byG);
}""",
"""function userFits(roster, p){
 const c = POS_SLOT_MAP[p[1]]; if(!c) return [];
 let open = eligibleOpen(roster, p).filter(s=>!roster.slots[s]);
 if(!open.length) return [];
 // w19 (Owner): while a slot at his natural position is open, the board only sells him there;
 // a flex fill appears only after every natural spot at his position is already full.
 const nat = open.filter(s=>isNaturalSlot(p[1], s));
 if(nat.length) open = nat;
 const byG = {};
 for(const s of open){
  const g = WV_SLOT_GROUP[s], v = slotWins(s, effOvr(p,s)) - slotWins(s, WINS_BASE);
  if(!byG[g] || v>byG[g].v+1e-9) byG[g] = {slot:s, g, v, flex:isOutOfPosition(p[1],s), pen:flexPenaltyFor(p[1],s)};
 }
 return Object.values(byG);
}""", '1a userFits natural-first')

# ---- 1b · boardEntries: priority & gone never go blank (sim runs from the first render) ----
rep(
" const sim = S.awaitingUser ? simRecs() : null;",
" const sim = simRecs(); // w19 (Owner): priority and gone live from the first render, not just on your turn", '1b always-on sim')

# ---- 1c · cards: no flex fragment, wins stacked over the Draft button, 90+/85+ name treatment ----
rep(
"""    h += `<div class="prow zpb-trow" style="${typeof zpbRowVars==='function'?zpbRowVars(r.p[2]):''}"><div>${topTag(r)}<b>${r.p[0]}</b> <span class="narr">${r.p[3]} OVR ${_cc}· ${typeof zpbTeamCell==='function'?zpbTeamCell(r.p[2]):(TEAM_ABBR[r.p[2]]||r.p[2])}${flexTxt(r)}${r.gone!=null?' · '+pctTxt(r.gone)+' gone':''}</span><div class="mbar"><i style="width:${gp/mx*100}%;background:var(--accent);"></i><i style="width:${(w-gp)/mx*100}%;background:var(--sub);opacity:.55;"></i></div></div><div class="score" title="Wins at this spot on your roster (flex penalty included)">${wavg(r.v)}</div><div>${btn(r)}</div></div>`;""",
"""    h += `<div class="prow zpb-trow" style="${typeof zpbRowVars==='function'?zpbRowVars(r.p[2]):''}"><div>${topTag(r)}<b class="${r.p[3]>=90?'zpb-shm':(r.p[3]>=85?'zpb-vib':'')}">${r.p[0]}</b> <span class="narr">${r.p[3]} OVR ${_cc}· ${typeof zpbTeamCell==='function'?zpbTeamCell(r.p[2]):(TEAM_ABBR[r.p[2]]||r.p[2])}${r.gone!=null?' · '+pctTxt(r.gone)+' gone':''}</span><div class="mbar"><i style="width:${gp/mx*100}%;background:var(--accent);"></i><i style="width:${(w-gp)/mx*100}%;background:var(--sub);opacity:.55;"></i></div></div><div class="zpb-pickcol"><div class="score" title="Wins at this spot on your roster (flex penalty included)">${wavg(r.v)}</div>${btn(r)}</div></div>`;""", '1c cards row')

# ---- 1d · cards stack in depth-chart order ----
rep(
"  const gs = openG.filter(g=>sel.has(g));",
"""  const DG_ORDER = ['QB','RB','WR','TE','OT','OG','C','EDGE','DT','LB','CB','SS','FS','K']; // the depth chart reads top to bottom (w19, Owner)
  const gs = openG.filter(g=>sel.has(g)).sort((a,b)=>{ const x = DG_ORDER.indexOf(a), y = DG_ORDER.indexOf(b); return (x<0?99:x)-(y<0?99:y) || WV_GROUPS.indexOf(a)-WV_GROUPS.indexOf(b); });""", '1d cards depth order')

# ---- 1e · Dime: box and dash removed (draft roster row + season row) ----
rep(
"""window.zpbDimeRow = function(slotmap){
 const d = window.zpbDimeOf ? window.zpbDimeOf(slotmap) : null;
 const e = d ? normalizeSlotEntry(d) : null;
 const nm = (e && e.name!=null) ? `${e.name} (${e.ovr})` : '\\u2014';
 const pkg = (e && e.name!=null) ? '<span class="zpb-pkgtag">PKG</span>' : '';
 return `<div class="depth-row zpb-dimerow"><span class="slotname">Dime</span><span class="${e&&e.name!=null?'playername':'empty'}">${nm}${pkg}</span></div>`;
};""",
"""window.zpbDimeRow = function(slotmap){
 const d = window.zpbDimeOf ? window.zpbDimeOf(slotmap) : null;
 const e = d ? normalizeSlotEntry(d) : null;
 const nm = (e && e.name!=null) ? `${e.name} (${e.ovr})` : ''; // w19 (Owner): no dash placeholder on an empty Dime
 return `<div class="depth-row zpb-dimerow"><span class="slotname">Dime</span><span class="${e&&e.name!=null?'playername':'empty'}">${nm}</span></div>`;
};""", '1e-1 season Dime row')

rep(
""" return `<div class="depth-row dgrid zpb-dimerow"><span class="slotname">Dime</span><span class="${d?'playername':'empty'}">${d?d[0]:'\\u2014'}${d?'<span class="zpb-pkgtag">PKG</span>':''}</span><span class="dovr">${d?d[3]:''}</span><span class="narr dwar"></span></div>`;""",
""" return `<div class="depth-row dgrid zpb-dimerow"><span class="slotname">Dime</span><span class="${d?'playername':'empty'}">${d?d[0]:''}</span><span class="dovr">${d?d[3]:''}</span><span class="narr dwar"></span></div>`; // w19 (Owner): no box, no dash, no PKG chip""", '1e-2 draft Dime row')

rep(
".depth-row.zpb-dimerow .slotname{background:transparent;color:var(--tA2,var(--gold3));border-style:dashed;}",
".depth-row.zpb-dimerow .slotname{background:transparent;color:var(--tA2,var(--gold3));border-color:transparent;padding-left:0;padding-right:0;}", '1e-3 Dime box CSS')

# ---- 1f · toggles: smaller, guaranteed one line ----
rep(
".zpb-viewtoggle button{border:none;background:transparent;color:var(--sub);font-weight:700;font-size:0.68rem;padding:6px 11px;cursor:pointer;letter-spacing:.08em;font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif;}",
".zpb-viewtoggle button{border:none;background:transparent;color:var(--sub);font-weight:700;font-size:0.62rem;padding:4px 8px;cursor:pointer;letter-spacing:.05em;white-space:nowrap;font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif;}", '1f-1 view toggle size')
rep(
".zpb-basetoggle button{border:none;background:transparent;color:var(--sub);font-weight:700;font-size:0.72rem;padding:6px 14px;cursor:pointer;letter-spacing:.1em;}",
".zpb-basetoggle button{border:none;background:transparent;color:var(--sub);font-weight:700;font-size:0.66rem;padding:4px 9px;cursor:pointer;letter-spacing:.06em;white-space:nowrap;}", '1f-2 base toggle size')
rep(
".zpb-rosterhead{display:flex;align-items:center;gap:8px;flex-wrap:nowrap;}",
".zpb-rosterhead{display:flex;align-items:center;gap:6px;flex-wrap:nowrap;}\n.zpb-rosterhead .narr{display:none;}", '1f-3 roster head gap')

# ---- 1g · draft roster: filled slot names shimmer; 90+ shimmer, 85+ vibrant ----
rep(
"""  return `<div class="depth-row dgrid zpb-trow" style="${p&&typeof zpbUserRowVars==='function'?zpbUserRowVars():''}"><span class="slotname">${extra||''}${LABELS[sl]||sl}</span><span class="${p?'playername':'empty'} ${p&&p[3]>=85?'zpb-shm':''}">${p?p[0]:''}</span><span class="dovr">${p?p[3]:''}</span><span class="narr dwar">${p?fmtWar(winsAt(p, sl)):''}</span></div>`;""",
"""  return `<div class="depth-row dgrid zpb-trow" style="${p&&typeof zpbUserRowVars==='function'?zpbUserRowVars():''}"><span class="slotname${p?' zpb-shm':''}">${extra||''}${LABELS[sl]||sl}</span><span class="${p?'playername':'empty'} ${p&&p[3]>=90?'zpb-shm':(p&&p[3]>=85?'zpb-vib':'')}">${p?p[0]:''}</span><span class="dovr">${p?p[3]:''}</span><span class="narr dwar">${p?fmtWar(winsAt(p, sl)):''}</span></div>`; // w19 (Owner): a filled position shimmers; 90+ names shimmer, 85+ burn brighter""", '1g roster shimmer')

# ---- 1h · CSS: stacked wins-over-button column + single-column depth-order card stack ----
rep(
".mbar{height:5px;border-radius:3px;background:var(--border);margin-top:3px;display:flex;overflow:hidden;}",
""".mbar{height:5px;border-radius:3px;background:var(--border);margin-top:3px;display:flex;overflow:hidden;}
/* w19 (Owner): wins stacks on top of the Draft button; position cards stack in depth-chart order */
.zpb-pickcol{display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:4px;min-width:62px;}
.zpb-pickcol .score{line-height:1;}
#draftCards .cardgrid{grid-template-columns:1fr;max-width:860px;}""", '1h pickcol CSS')

open(P, 'w', encoding='utf-8').write(src)
print(f'\nPATCH 1 complete: {n} replacements, {len(orig)} -> {len(src)} bytes')
