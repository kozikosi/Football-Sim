#!/usr/bin/env python3
"""Z-post-blue WAVE 11 build module.
Owner eleventh directive (~46 items): Saints-palette fix (no more strange
blue, readable dynamic buttons); footer = bottom nav (all caps, no pink,
bottom 20-0 removed); Random/pick dropdown tinted by the selected team and
styled like the teams dropdown with one-line names; full-bleed static and
moving 20-0s; no setup-panel scrollbar; no desktop h-scroll; board: no sort
arrow, team-icon filter, chips under OVR for 85+ only, bigger logos, Cinzel
everywhere, on-the-clock line gone, priority panel hidden while CPU picks;
100 Seasons: logo ranks, shorter bars, STATS rename, RUN+/PASS+ chips, more
stat bubbles; preview: two-team duel blocks, RECEIVING CORPS, matchup-math
integers + row removal, SCHEDULE/STANDINGS, lineups fixes; roster: shimmer,
SEASON buttons, ranks fade-in; replay: bigger panel, TD/FG badges, detailed
turnovers, spaced score, turnovers footer removed. UI/copy only — protected
math invariants stay byte-identical."""

def apply(html):
    EXACT = []
    REMOVED = []
    def rep(label, old, new, cnt=1):
        EXACT.append((label, old, new, cnt))

    # ---------------- 1. footer: nav moves to the very bottom, caps, no pink ----------------
    rep("theme toggle pink -> neutral",
        "#themeToggleBtn{color:var(--rose);}",
        "#themeToggleBtn{color:var(--sub);}", 1)
    rep("theme toggle labels caps",
        "tbtn.textContent = (t==='dark') ? '\\u2600 Light' : '\\u263E Dark';",
        "tbtn.textContent = (t==='dark') ? '\\u2600 LIGHT' : '\\u263E DARK';", 1)
    old_nav = """ <nav class="footnav" aria-label="More tools">
  <button class="footlink active" id="tabDraftBtn">Simulator</button>
  <button class="footlink" id="tabRankingsBtn">Madden Rankings</button>
  <button class="footlink" id="tabPlayersBtn">Player Browser</button>
  <button class="footlink" id="tabGroupsBtn">Position Rankings</button>
  <button class="footlink" id="tabCompareBtn">Team Comparison</button>
  <button class="footlink" id="tabGuideBtn">Guide</button>
  <button class="footlink" id="themeToggleBtn" title="Switch light / dark">\u263E Dark</button>
 </nav>
"""
    rep("footer nav rebuilt: caps, same bottom-pinned slot",
        old_nav,
        '<nav class="footnav zpb-footnav" aria-label="More tools">'
        '<button class="footlink active" id="tabDraftBtn">SIMULATOR</button>'
        '<button class="footlink" id="tabRankingsBtn">MADDEN RANKINGS</button>'
        '<button class="footlink" id="tabPlayersBtn">PLAYER BROWSER</button>'
        '<button class="footlink" id="tabGroupsBtn">POSITION RANKINGS</button>'
        '<button class="footlink" id="tabCompareBtn">TEAM COMPARISON</button>'
        '<button class="footlink" id="tabGuideBtn">GUIDE</button>'
        '<button class="footlink" id="themeToggleBtn" title="Switch light / dark">\u263E DARK</button>'
        '</nav>\n', 1)
    old_foot = '<footer class="zpb-foot"><div class="zpb-footline"><span class="zpb-fmark">20-0</span></div></footer>'
    REMOVED.append(old_foot)
    html = html.replace(old_foot, "", 1)
    print("[ok] [v11] old bottom 20-0 footer removed")

    # ---------------- 2. legacy blues neutralized ----------------
    rep("tabbtn.active legacy blue",
        ".tabbtn.active{background:linear-gradient(90deg,var(--accent),#6aa6ff);box-shadow:0 4px 14px var(--glow);}",
        ".tabbtn.active{background:linear-gradient(90deg,var(--accent),var(--accent2,var(--accent)));box-shadow:0 4px 14px var(--glow);}", 1)
    rep("resetbtn legacy blue",
        ".resetbtn{background:linear-gradient(90deg,var(--accent),#6aa6ff);border-radius:999px;font-weight:700;box-shadow:0 6px 18px var(--glow);transition:transform .12s ease, box-shadow .12s ease;}",
        ".resetbtn{background:linear-gradient(90deg,var(--accent),var(--accent2,var(--accent)));border-radius:999px;font-weight:700;box-shadow:0 6px 18px var(--glow);transition:transform .12s ease, box-shadow .12s ease;}", 1)
    rep("draftingas legacy blue wash",
        ".draftingas{display:flex;align-items:center;gap:10px;padding:10px 14px;margin-bottom:12px;background:linear-gradient(90deg, rgba(79,140,255,0.15), rgba(255,107,74,0.08));border:1px solid var(--accent);border-radius:10px;}",
        ".draftingas{display:flex;align-items:center;gap:10px;padding:10px 14px;margin-bottom:12px;background:linear-gradient(90deg, var(--tTA,rgba(201,162,75,.14)), var(--tTB,rgba(201,122,142,.10)));border:1px solid var(--accent);border-radius:10px;}", 1)
    rep("old compact dc-ovr blue",
        " #draftTable2 td.dc-ovr{grid-column:9 / 11;grid-row:1;text-align:center !important;font-size:1.15rem;font-weight:900;background:rgba(79,140,255,.16);border-radius:8px;padding:2px 0 !important;}",
        " #draftTable2 td.dc-ovr{grid-column:9 / 11;grid-row:1;text-align:center !important;font-size:1.15rem;font-weight:900;background:color-mix(in srgb,var(--tA,var(--accent)) 15%,transparent);border-radius:8px;padding:2px 0 !important;}", 1)
    rep("old compact dc-val blue (x2 copies)",
        " #draftTable2 td.dc-wins{grid-column:5 / 7;grid-row:2;color:var(--good);} #draftTable2 td.dc-val{grid-column:7 / 10;grid-row:2;color:#6aa6ff;}",
        " #draftTable2 td.dc-wins{grid-column:5 / 7;grid-row:2;color:var(--good);} #draftTable2 td.dc-val{grid-column:7 / 10;grid-row:2;color:var(--accent2,var(--accent));}", 2)
    rep("standings user-row legacy blue",
        ".divtable tr.user-row{background:rgba(79,140,255,0.12);}",
        ".divtable tr.user-row{background:var(--tTC,rgba(201,162,75,0.08));}", 1)
    rep("champion banner legacy blue",
        ".champion-banner{text-align:center;padding:24px;background:linear-gradient(135deg, rgba(79,140,255,0.2), rgba(255,107,74,0.15));",
        ".champion-banner{text-align:center;padding:24px;background:linear-gradient(135deg, var(--tTA,rgba(201,162,75,0.2)), var(--tTB,rgba(201,122,142,0.15)));", 1)
    rep("kp-mvp legacy blue",
        "table.kp tr.kp-mvp{background:rgba(79,140,255,0.10);}",
        "table.kp tr.kp-mvp{background:var(--tTC,rgba(201,162,75,0.10));}", 1)

    # ---------------- 3. sort arrows removed ----------------
    rep("sort arrows removed",
        '#draftTable2 th.sort-sel[data-dir="asc"]::after{content:" \\25B2";font-size:.62em;}\n'
        '#draftTable2 th.sort-sel[data-dir="desc"]::after{content:" \\25BC";font-size:.62em;}',
        "/* sort arrows retired (Owner): the accent color alone marks the active sort */", 1)

    # ---------------- 4. the Saints-class palette fix: no more strange blue ----------------
    rep("flo: near-black/near-neutral brand colors keep the engine hue",
        " const flo = h=>{ const c=zpbHsl(h); return zpbFromHsl(c.h, Math.max(c.s,0.42), Math.min(Math.max(c.l,0.3),0.55)); };",
        " const flo = h=>{ const c=zpbHsl(h); if(c.l<0.18 || c.s<0.15){ const e=zpbHsl(eng); return zpbFromHsl(e.h, Math.max(0.12, Math.min(e.s, 0.34)), c.l<0.18 ? 0.22 : Math.min(Math.max(c.l,0.3),0.72)); } return zpbFromHsl(c.h, Math.max(c.s,0.42), Math.min(Math.max(c.l,0.3),0.55)); };", 1)
    rep("on-colors computed against the real gradient",
        """  on:zpbContrast(zpbMix(acc2L,'#ffffff',0.35),'#ffffff')>2.6 ? zpbReadable(eng,zpbMix(acc2L,'#ffffff',0.35),false,4.4) : '#fffaf2',
  onD:zpbContrast(zpbMix(acc2D,'#ffffff',0.35),'#181114')>2.6 ? zpbReadable(eng,zpbMix(acc2D,'#ffffff',0.35),true,4.4) : '#fffaf2',""",
        """  on:(function(){ const m=zpbMix(zpbMix(accL,acc2L,0.5),acc3L,0.25); return zpbContrast('#2c1e0c',m)>=zpbContrast('#fffaf2',m) ? '#2c1e0c' : '#fffaf2'; })(),
  onD:(function(){ const m=zpbMix(zpbMix(accD,acc2D,0.5),acc3D,0.25); return zpbContrast('#2c1e0c',m)>=zpbContrast('#fffaf2',m) ? '#2c1e0c' : '#fffaf2'; })(),""", 1)

    # ---------------- 5. dropdowns: pick box joins, readable one-line names ----------------
    old_iife = """// team dropdowns: every team listed in its own colors, logo beside the name
(function(){
 const TEAMS = Object.keys(TEAM_DATA);
 const pack = n=> (typeof zpbPackFor==='function') ? zpbPackFor(n) : null;
 const logo = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
 const enhance = sel=>{
  if(!sel || sel.dataset.zpbsel) return;
  sel.dataset.zpbsel = '1';
  const wrap = document.createElement('span'); wrap.className = 'zpb-selwrap';
  sel.parentNode.insertBefore(wrap, sel); wrap.appendChild(sel);
  sel.classList.add('zpb-sel-native');
  const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'zpb-selbtn'; btn.setAttribute('aria-haspopup', 'listbox');
  const pop = document.createElement('span'); pop.className = 'zpb-selpop'; pop.setAttribute('role', 'listbox');
  wrap.appendChild(btn); wrap.appendChild(pop);
  const label = ()=>{
   const v = sel.value; const st = pack(v);
   btn.innerHTML = logo(v) + '<span style="' + (st ? 'color:' + st.accL : '') + '">' + (v || '\u2014') + '</span>';
  };
  const build = ()=>{
   pop.innerHTML = TEAMS.map(t=>{
    const st = pack(t);
    return '<button type="button" class="zpb-selopt" data-v="' + t + '" style="--za:' + (st ? st.accL : 'inherit') + ';--zw:' + (st ? 'color-mix(in srgb,' + st.accL + ' 14%, transparent)' : 'rgba(120,120,120,.12)') + '">'
     + logo(t) + '<span style="color:' + (st ? st.accL : 'inherit') + '">' + t + '</span></button>';
   }).join('');
  };
  const close = ()=> wrap.classList.remove('open');
  btn.addEventListener('click', e=>{
   e.stopPropagation();
   const was = wrap.classList.contains('open');
   document.querySelectorAll('.zpb-selwrap.open').forEach(w=>w.classList.remove('open'));
   if(!was){ build(); wrap.classList.add('open'); }
  });
  pop.addEventListener('click', e=>{
   const o = e.target.closest('.zpb-selopt'); if(!o) return;
   sel.value = o.dataset.v;
   sel.dispatchEvent(new Event('change', {bubbles:true}));
   label(); close();
  });
  sel.addEventListener('change', label);
  document.addEventListener('click', e=>{ if(!wrap.contains(e.target)) close(); });
  label();
  new MutationObserver(label).observe(sel, {childList:true});
 };
 ['draftSlotSelect', 'teamFilter', 'homeCmpA', 'homeCmpB', 'cmpTeamA', 'cmpTeamB'].forEach(id=>{
  const s = document.getElementById(id); if(s) enhance(s);
 });
})();"""
    new_iife = """// team dropdowns: every team listed in its own colors, logo beside the name;
// the pick-order box joins the same custom treatment, tinted by the selected team
(function(){
 const TEAMS = Object.keys(TEAM_DATA);
 const pack = n=> (typeof zpbPackFor==='function') ? zpbPackFor(n) : null;
 const logo = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
 const slotSel = document.getElementById('draftSlotSelect');
 const pickSel = document.getElementById('draftPickNumberSelect');
 const tintTeam = sel=> (sel && sel.id==='draftPickNumberSelect' && slotSel && slotSel.value && slotSel.value!=='__random') ? slotSel.value : null;
 const enhance = sel=>{
  if(!sel || sel.dataset.zpbsel) return;
  sel.dataset.zpbsel = '1';
  const wrap = document.createElement('span'); wrap.className = 'zpb-selwrap';
  sel.parentNode.insertBefore(wrap, sel); wrap.appendChild(sel);
  sel.classList.add('zpb-sel-native');
  const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'zpb-selbtn'; btn.setAttribute('aria-haspopup', 'listbox');
  const pop = document.createElement('span'); pop.className = 'zpb-selpop'; pop.setAttribute('role', 'listbox');
  wrap.appendChild(btn); wrap.appendChild(pop);
  const isPick = sel.id==='draftPickNumberSelect';
  const label = ()=>{
   const v = sel.value;
   const tt = tintTeam(sel);
   const st = pack(tt || v);
   const face = isPick ? (v==='random' ? 'Random' : 'Pick ' + v) : (v==='__random' ? 'Random team' : (v || '\\u2014'));
   btn.innerHTML = logo(isPick ? (tt || '') : v) + '<span style="' + (st ? 'color:' + st.accL : '') + '">' + face + '</span>';
  };
  const build = ()=>{
   const tst = pack(tintTeam(sel));
   const optVars = st=> st
    ? '--zaL:' + st.txL + ';--zaD:' + st.txd + ';--zw:color-mix(in srgb,' + st.accL + ' 13%, transparent)'
    : '--zw:rgba(120,120,120,.12)';
   const items = isPick
    ? ['random'].concat(Array.from({length:32}, (_,k)=>String(k+1)))
    : TEAMS;
   pop.innerHTML = items.map(t=>{
    const st = isPick ? tst : pack(t);
    const txt = isPick ? (t==='random' ? 'Random' : 'Pick ' + t) : t;
    return '<button type="button" class="zpb-selopt" data-v="' + t + '" style="' + optVars(st) + '">'
     + (isPick ? '' : logo(t)) + '<span>' + txt + '</span></button>';
   }).join('');
  };
  const close = ()=> wrap.classList.remove('open');
  btn.addEventListener('click', e=>{
   e.stopPropagation();
   const was = wrap.classList.contains('open');
   document.querySelectorAll('.zpb-selwrap.open').forEach(w=>w.classList.remove('open'));
   if(!was){ build(); wrap.classList.add('open'); }
  });
  pop.addEventListener('click', e=>{
   const o = e.target.closest('.zpb-selopt'); if(!o) return;
   sel.value = o.dataset.v;
   sel.dispatchEvent(new Event('change', {bubbles:true}));
   label(); close();
  });
  sel.addEventListener('change', label);
  document.addEventListener('click', e=>{ if(!wrap.contains(e.target)) close(); });
  label();
  new MutationObserver(label).observe(sel, {childList:true});
 };
 ['draftSlotSelect', 'draftPickNumberSelect', 'teamFilter', 'homeCmpA', 'homeCmpB', 'cmpTeamA', 'cmpTeamB'].forEach(id=>{
  const s = document.getElementById(id); if(s) enhance(s);
 });
 if(slotSel && pickSel) slotSel.addEventListener('change', ()=>{ try{ pickSel.dispatchEvent(new Event('change', {bubbles:true})); }catch(e){} });
})();"""
    rep("dropdown IIFE: pick box + readable tones", old_iife, new_iife, 1)

    # ---------------- 6. draft board: status line, priority panel, filter state ----------------
    rep("on-the-clock line removed",
        """ document.getElementById('draftStatusText').textContent = draftSim.awaitingUser
  ? `On the clock — Round ${round} of ${TOTAL_ROUNDS}, Pick ${pickInRound} (overall ${draftSim.pos+1} of ${draftSim.order.length})`
  : `Round ${round} of ${TOTAL_ROUNDS}, Pick ${pickInRound} — ${teamLabel(draftSim.order[draftSim.pos])} is on the clock...`;""",
        """ document.getElementById('draftStatusText').textContent = draftSim.awaitingUser
  ? ''
  : `Round ${round} of ${TOTAL_ROUNDS}, Pick ${pickInRound} — ${teamLabel(draftSim.order[draftSim.pos])} is on the clock...`;""", 1)
    rep("priority panel hidden while CPU picks",
        """ if(!sim){ ph = '<div class="narr">The CPU teams are picking — your recommendations refresh when you are on the clock.</div>'; }""",
        """ { const _pp = document.getElementById('draftPriorityPanel'); if(_pp) _pp.style.display = sim ? '' : 'none'; }
 if(!sim){ ph = ''; }""", 1)
    rep("team filter state added to draftUI",
        "function newDraftUI(){ return {groups:new Set(WV_GROUPS), prio:{}, rosterView:'depth', sim:null, slotPick:{}}; }",
        "function newDraftUI(){ return {groups:new Set(WV_GROUPS), prio:{}, rosterView:'depth', sim:null, slotPick:{}, teamFilter:null}; }", 1)

    # ---------------- 7. board rows: team-icon filter, chips under OVR (85+), logo only ----------------
    rep("board table row rebuilt",
        """   h += `<tr class="zpb-trow" style="${typeof zpbRowVars==='function'?zpbRowVars(r.p[2]):''}"><td class="dc-name">${topTag(r)}${r.p[0]}</td><td data-label="Pos">${POS_DISPLAY[r.p[1]]||r.p[1]}</td><td data-label="Team"><span class="zpb-teamcol">${typeof zpbTeamCell==='function'?zpbTeamCell(r.p[2]):(TEAM_ABBR[r.p[2]]||r.p[2])}${typeof zpbTeamChips==='function'?zpbTeamChips(r.p[2]):''}</span></td><td class="score dc-ovr" data-label="OVR">${r.p[3]}</td><td class="score dc-wins" data-label="Wins">${wavg(r.w)}</td><td class="score dc-pri" data-label="Priority">${r.pri!=null&&sim?fmtWar(r.pri):'—'}</td><td class="score dc-gone" data-label="Gone">${pctTxt(r.gone)}</td><td class="narr dc-fills" data-label="Fills">${fills}</td><td class="dc-btn">${btn(r)}</td></tr>`;""",
        """   const _tc = (typeof zpbTeamCell==='function') ? zpbTeamCell(r.p[2]) : (TEAM_ABBR[r.p[2]]||r.p[2]);
   const _oc = (r.p[3]>=85 && typeof zpbTeamChips==='function') ? '<span class="zpb-ovrchips">'+zpbTeamChips(r.p[2])+'</span>' : '';
   h += `<tr class="zpb-trow" style="${typeof zpbRowVars==='function'?zpbRowVars(r.p[2]):''}"><td class="dc-name">${topTag(r)}${r.p[0]}</td><td data-label="Pos">${POS_DISPLAY[r.p[1]]||r.p[1]}</td><td data-label="Team"><span class="zpb-teamcol zpb-tfilter" data-ztf="${r.p[2]}" title="Show only ${r.p[2]} players — click again to clear">${_tc}</span></td><td class="score dc-ovr" data-label="OVR"><span class="zpb-ovrstack">${r.p[3]}${_oc}</span></td><td class="score dc-wins" data-label="Wins">${wavg(r.w)}</td><td class="score dc-pri" data-label="Priority">${r.pri!=null&&sim?fmtWar(r.pri):'—'}</td><td class="score dc-gone" data-label="Gone">${pctTxt(r.gone)}</td><td class="narr dc-fills" data-label="Fills">${fills}</td><td class="dc-btn">${btn(r)}</td></tr>`;""", 1)
    rep("board cards row: chips ride with the OVR number",
        """    h += `<div class="prow zpb-trow" style="${typeof zpbRowVars==='function'?zpbRowVars(r.p[2]):''}"><div>${topTag(r)}<b>${r.p[0]}</b> <span class="narr">${r.p[3]} OVR · ${typeof zpbTeamChips==='function'?zpbTeamChips(r.p[2]):''}${typeof zpbTeamCell==='function'?zpbTeamCell(r.p[2]):(TEAM_ABBR[r.p[2]]||r.p[2])}${flexTxt(r)}${r.gone!=null?' · '+pctTxt(r.gone)+' gone':''}</span><div class="mbar"><i style="width:${gp/mx*100}%;background:var(--accent);"></i><i style="width:${(w-gp)/mx*100}%;background:var(--sub);opacity:.55;"></i></div></div><div class="score" title="Wins at this spot on your roster (flex penalty included)">${wavg(r.v)}</div><div>${btn(r)}</div></div>`;""",
        """    const _cc = (r.p[3]>=85 && typeof zpbTeamChips==='function') ? zpbTeamChips(r.p[2])+' ' : '';
    h += `<div class="prow zpb-trow" style="${typeof zpbRowVars==='function'?zpbRowVars(r.p[2]):''}"><div>${topTag(r)}<b>${r.p[0]}</b> <span class="narr">${r.p[3]} OVR ${_cc}· ${typeof zpbTeamCell==='function'?zpbTeamCell(r.p[2]):(TEAM_ABBR[r.p[2]]||r.p[2])}${flexTxt(r)}${r.gone!=null?' · '+pctTxt(r.gone)+' gone':''}</span><div class="mbar"><i style="width:${gp/mx*100}%;background:var(--accent);"></i><i style="width:${(w-gp)/mx*100}%;background:var(--sub);opacity:.55;"></i></div></div><div class="score" title="Wins at this spot on your roster (flex penalty included)">${wavg(r.v)}</div><div>${btn(r)}</div></div>`;""", 1)

    # ---------------- 8. team-only filter logic ----------------
    rep("cards view honors team filter",
        "   let list = entries.filter(r=>r.g===g && matchesSearch(r.p) && (posF==='all' || WV_TAG_GROUP[r.p[1]]===posF));",
        "   let list = entries.filter(r=>r.g===g && matchesSearch(r.p) && (posF==='all' || WV_TAG_GROUP[r.p[1]]===posF) && (!draftUI.teamFilter || r.p[2]===draftUI.teamFilter));", 1)
    rep("table byP honors team filter",
        """  entries.forEach(r=>{
   if(!matchesSearch(r.p)) return;
   if(posF!=='all' ? WV_TAG_GROUP[r.p[1]]!==posF : !sel.has(r.g)) return;""",
        """  entries.forEach(r=>{
   if(!matchesSearch(r.p)) return;
   if(draftUI.teamFilter && r.p[2]!==draftUI.teamFilter) return;
   if(posF!=='all' ? WV_TAG_GROUP[r.p[1]]!==posF : !sel.has(r.g)) return;""", 1)
    rep("table pool pass honors team filter",
        """    if(byP.has(p[0]) || !matchesSearch(p)) return;
    const tg = WV_TAG_GROUP[p[1]];""",
        """    if(byP.has(p[0]) || !matchesSearch(p)) return;
    if(draftUI.teamFilter && p[2]!==draftUI.teamFilter) return;
    const tg = WV_TAG_GROUP[p[1]];""", 1)

    # ---------------- 9. Your Roster (draft page): no parens, shimmer 85+ ----------------
    rep("draft roster row: bare OVR",
        "return `<div class=\"depth-row dgrid zpb-trow\" style=\"${p&&typeof zpbUserRowVars==='function'?zpbUserRowVars():''}\"><span class=\"slotname\">${extra||''}${LABELS[sl]||sl}</span><span class=\"${p?'playername':'empty'}\">${p?p[0]:''}</span><span class=\"dovr\">${p?`(${p[3]})`:''}</span><span class=\"narr dwar\">${p?fmtWar(winsAt(p, sl)):''}</span></div>`;",
        "return `<div class=\"depth-row dgrid zpb-trow\" style=\"${p&&typeof zpbUserRowVars==='function'?zpbUserRowVars():''}\"><span class=\"slotname\">${extra||''}${LABELS[sl]||sl}</span><span class=\"${p?'playername':'empty'} ${p&&p[3]>=85?'zpb-shm':''}\">${p?p[0]:''}</span><span class=\"dovr\">${p?p[3]:''}</span><span class=\"narr dwar\">${p?fmtWar(winsAt(p, sl)):''}</span></div>`;", 1)

    # ---------------- 10. lineup tables: no parens, filled slots, winner shimmer ----------------
    old_v9_lu = """renderLineupTableHTML = function(slotmapLeft, slotmapRight, ownerLeft, ownerRight){
 const zL = (ownerLeft && typeof zpbRowVars==='function') ? zpbRowVars(ownerLeft) : '';
 const zR = (ownerRight && typeof zpbRowVars==='function') ? zpbRowVars(ownerRight) : '';
 const shm = (cell, vars)=> (cell.text !== '—' && cell.val > 85 && vars) ? ' zpb-shm' : '';
 let rows = '';
 DEPTH_CHART_GROUPS.forEach(([gname, gcls, slots])=>{
  rows += `<div class="zpb-lu-grp">${gname}</div>`;
  slots.forEach(s=>{
   const l = lineupCell(slotmapLeft, s), r = lineupCell(slotmapRight, s);
   rows += `<div class="zpb-lu-row">
    <span class="zpb-lu-cell zpb-lu-l ${l.text!=='—'&&zL?'zpb-trow':''} ${l.val>r.val?'zpb-lu-win':''}${shm(l, zL)}" style="${l.text!=='—'&&zL?zL:''}">${l.text}</span>
    <span class="zpb-lu-c">${LABELS[s]||s}</span>
    <span class="zpb-lu-cell zpb-lu-r ${r.text!=='—'&&zR?'zpb-trow':''} ${r.val>l.val?'zpb-lu-win':''}${shm(r, zR)}" style="${r.text!=='—'&&zR?zR:''}">${r.text}</span>
   </div>`;
  });
 });
 return `<div class="zpb-lu">${rows}</div><p class="narr" style="margin:6px 0 0;">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>`;
};"""
    new_v9_lu = """renderLineupTableHTML = function(slotmapLeft, slotmapRight, ownerLeft, ownerRight){
 const zL = (ownerLeft && typeof zpbRowVars==='function') ? zpbRowVars(ownerLeft) : '';
 const zR = (ownerRight && typeof zpbRowVars==='function') ? zpbRowVars(ownerRight) : '';
 const fillOf = (slotmap, owner)=>{
  const pool = (owner && typeof seasonState!=='undefined' && seasonState && seasonState.teams[owner] && seasonState.teams[owner].pool) || [];
  const used = new Set(Object.values(slotmap).filter(Boolean).map(x=>{ const e = normalizeSlotEntry(x); return e ? e.name : ''; }));
  const map = {};
  Object.keys(slotmap).length && DEPTH_CHART_GROUPS.forEach(([, , slots])=>slots.forEach(s=>{
   if(slotmap[s]) return;
   let best = null, bv = -1;
   pool.forEach(p=>{
    const e = normalizeSlotEntry(p);
    if(!e || !e.name || used.has(e.name) || map[e.name]) return;
    const pen = flexPenaltyFor(e.pos, s); if(pen>=8) return;
    const eff = (e.ovr||70) - pen; if(eff>bv){ bv = eff; best = e; }
   });
   if(best) map[s] = {name:best.name, val:bv};
  }));
  return s=> map[s] || null;
 };
 const fL = fillOf(slotmapLeft, ownerLeft), fR = fillOf(slotmapRight, ownerRight);
 const cellOf = (slotmap, s, fb)=>{ const c = lineupCell(slotmap, s); if(c.text!=='—') return c; const f = fb(s); return f ? {text:`${f.name} ${f.val}`, val:f.val} : c; };
 let rows = '';
 DEPTH_CHART_GROUPS.forEach(([gname, gcls, slots])=>{
  rows += `<div class="zpb-lu-grp">${gname}</div>`;
  slots.forEach(s=>{
   const l = cellOf(slotmapLeft, s, fL), r = cellOf(slotmapRight, s, fR);
   const shmL = (l.val>=85 && zL) ? ' zpb-shm' : '', shmR = (r.val>=85 && zR) ? ' zpb-shm' : '';
   rows += `<div class="zpb-lu-row">
    <span class="zpb-lu-cell zpb-lu-l ${l.text!=='—'&&zL?'zpb-trow':''} ${l.val>r.val?'zpb-lu-win zpb-shm':shmL}" style="${l.text!=='—'&&zL?zL:''}">${l.text}</span>
    <span class="zpb-lu-c">${LABELS[s]||s}</span>
    <span class="zpb-lu-cell zpb-lu-r ${r.text!=='—'&&zR?'zpb-trow':''} ${r.val>l.val?'zpb-lu-win zpb-shm':shmR}" style="${r.text!=='—'&&zR?zR:''}">${r.text}</span>
   </div>`;
  });
 });
 return `<div class="zpb-lu">${rows}</div><p class="zpb-fadenote">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>`;
};"""
    rep("lineups v9 override: filled slots, winner shimmer, no parens", old_v9_lu, new_v9_lu, 1)

    old_b_lu = """function lineupCell(slotmap, s){
 const raw = slotmap[s];
 if(!raw) return {text:'—', val:70};
 const e = normalizeSlotEntry(raw);
 if(Array.isArray(raw)){
  const pen = flexPenaltyFor(raw[1], s), eff = raw[3]-pen;
  return {text:`${e.name} (${eff})`, val:eff};
 }
 return {text: e.name ? `${e.name} (${e.ovr})` : '—', val: e.ovr};
}"""
    new_b_lu = """function lineupCell(slotmap, s){
 const raw = slotmap[s];
 if(!raw) return {text:'—', val:70};
 const e = normalizeSlotEntry(raw);
 if(Array.isArray(raw)){
  const pen = flexPenaltyFor(raw[1], s), eff = raw[3]-pen;
  return {text:`${e.name} ${eff}`, val:eff};
 }
 return {text: e.name ? `${e.name} ${e.ovr}` : '—', val: e.ovr};
}"""
    rep("lineups base twin: no parens", old_b_lu, new_b_lu, 1)
    rep("lineups base twin render: fade note",
        " return `<div class=\"zpb-lu\">${rows}</div><p class=\"narr\" style=\"margin:6px 0 0;\">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>`;\n}",
        " return `<div class=\"zpb-lu\">${rows}</div><p class=\"zpb-fadenote\">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>`;\n}", 1)

    # ---------------- 11. unit labels: RUN BLOCKING / PASS PROTECTION / RECEIVING CORPS / no Front Seven ----------------
    rep("olRun label", " olRun:    {label:'Offensive line — run blocking', short:'offensive line (run blocking)'},",
        " olRun:    {label:'Run blocking', short:'run blocking'},", 1)
    rep("olPass label", " olPass:   {label:'Offensive line — pass protection', short:'pass protection'},",
        " olPass:   {label:'Pass protection', short:'pass protection'},", 1)
    rep("rec label", " rec:      {label:'Receivers & tight end', short:'receiving corps'},",
        " rec:      {label:'Receiving corps', short:'receiving corps'},", 1)
    rep("frontRun label", " frontRun: {label:'Run defense (front seven)', short:'run defense'},",
        " frontRun: {label:'Run defense', short:'run defense'},", 1)

    # ---------------- 12. scouting/identity rows: QB first, depth-chart order ----------------
    rep("identity rows order",
        """ const rows = Object.keys(UNIT_INFO).map(u=>{
  const r = rk[u] || 32;""",
        """ const rows = ['qb','rb','rec','olRun','olPass','passRush','frontRun','coverage','kicker'].map(u=>{
  const r = rk[u] || 32;""", 1)

    # ---------------- 13. matchup math: integers, no ranks, no channel rows, right side aligned ----------------
    old_mm = """ const units = ['qb','rb','rec','olPass','olRun','passRush','frontRun','coverage','kicker'];
 const mx = Math.max(...units.map(u=>Math.max(H[u]||0, A[u]||0)), 1);
 const row = u=>{
  const hv = H[u]||0, av = A[u]||0, ra = S.unitRanks[awayTeam][u], rh = S.unitRanks[homeTeam][u];
  return `<div class="zpb-mrow"><div class="zpb-mcell" style="${stA}"><b>${av.toFixed(1)}</b><span class="narr">#${ra}</span><span class="zpb-mbar"><i style="width:${(av/mx*100).toFixed(0)}%;"></i></span></div><span class="zpb-mlab">${UNIT_INFO[u].label}</span><div class="zpb-mcell zpb-mc-h" style="${stH}"><span class="zpb-mbar"><i style="width:${(hv/mx*100).toFixed(0)}%;"></i></span><b>${hv.toFixed(1)}</b><span class="narr">#${rh}</span></div></div>`;
 };
 const sgn = v => (v>=0?'+':'−') + Math.abs(v).toFixed(1);
 const chans = [['Ground game','run'],['Passing game','pass'],['Turnovers','to'],['Sacks','sack'],['Kicking','kick']];
 const chan = ([lab,k])=>{
  const a = ma.channels[k], h = mh.channels[k];
  return `<div class="zpb-mrow"><div class="zpb-mcell" style="${stA}"><b class="${a>h?'zpb-mwin':''}">${sgn(a)}</b></div><span class="zpb-mlab">${lab}</span><div class="zpb-mcell zpb-mc-h"><b class="${h>a?'zpb-mwin':''}">${sgn(h)}</b></div></div>`;
 };
 return `<div class="zpb-mhead"><span>${nick(awayTeam)} ${projA.toFixed(1)}</span><span>${projH.toFixed(1)} ${nick(homeTeam)}</span></div>
  <div class="zpb-mgrid">${units.map(row).join('')}${chans.map(chan).join('')}</div>`;"""
    new_mm = """ const units = ['qb','rb','rec','olRun','olPass','passRush','frontRun','coverage','kicker'];
 const mx = Math.max(...units.map(u=>Math.max(H[u]||0, A[u]||0)), 1);
 const row = u=>{
  const hv = H[u]||0, av = A[u]||0;
  return `<div class="zpb-mrow"><div class="zpb-mcell" style="${stA}"><b>${Math.round(av)}</b><span class="zpb-mbar"><i style="width:${(av/mx*100).toFixed(0)}%;"></i></span></div><span class="zpb-mlab">${UNIT_INFO[u].label}</span><div class="zpb-mcell zpb-mc-h" style="${stH}"><span class="zpb-mbar"><i style="width:${(hv/mx*100).toFixed(0)}%;"></i></span><b class="zpb-mnum">${Math.round(hv)}</b></div></div>`;
 };
 return `<div class="zpb-mhead"><span>${nick(awayTeam)} ${Math.round(projA)}</span><span>${Math.round(projH)} ${nick(homeTeam)}</span></div>
  <div class="zpb-mgrid">${units.map(row).join('')}</div>`;"""
    rep("matchup math: integers, no ranks, channels gone", old_mm, new_mm, 1)

    # ---------------- 14. SCHEDULE / STANDINGS ----------------
    old_sched = "<h4 style=\"margin-top:0;\">Your Schedule &amp; Results <span class=\"narr\" style=\"font-weight:400;\">(tap a played week for the recap)</span></h4><div class=\"zst-grid\">"
    new_sched = "<h4 style=\"margin-top:0;\">SCHEDULE</h4><div class=\"zst-grid\">"
    n_sched = html.count(old_sched)
    if n_sched < 1:
        raise SystemExit("ABORT: [v11] schedule heading anchor not found")
    html = html.replace(old_sched, new_sched)
    REMOVED.append(old_sched)
    print(f"[ok] [v11] SCHEDULE headings replaced: {n_sched}")
    rep("standings heading",
        "<h4 style=\"margin-top:0;\">Standings <span class=\"narr\" style=\"font-weight:400;\">(your division first)</span></h4>",
        "<h4 style=\"margin-top:0;\">STANDINGS</h4>", 1)
    rep("standings W-L left",
        """<table><thead><tr><th></th><th>W-L</th><th>PF/G</th><th>PA/G</th><th>Diff</th></tr></thead><tbody>${rows.map(r=>{
    const gp = r.wins+r.losses+r.ties;
    return `<tr class="${r.team===user?'user-row':''} zpb-standrow" style="${(typeof zpbRowVars==='function')?zpbRowVars(r.team):''}"><td>${lg(r.team)}${nick(r.team)}</td><td class="score">${r.wins}-${r.losses}${r.ties?'-'+r.ties:''}</td><td class="narr">${gp?(r.pf/gp).toFixed(1):'—'}</td><td class="narr">${gp?(r.pa/gp).toFixed(1):'—'}</td><td class="narr">${r.diff>=0?'+':''}${r.diff}</td></tr>`;
   }).join('')}</tbody></table>""",
        """<table><thead><tr><th>W-L</th><th></th><th>PF/G</th><th>PA/G</th><th>Diff</th></tr></thead><tbody>${rows.map(r=>{
    const gp = r.wins+r.losses+r.ties;
    return `<tr class="${r.team===user?'user-row':''} zpb-standrow" style="${(typeof zpbRowVars==='function')?zpbRowVars(r.team):''}"><td class="score">${r.wins}-${r.losses}${r.ties?'-'+r.ties:''}</td><td>${lg(r.team)}${nick(r.team)}</td><td class="narr">${gp?(r.pf/gp).toFixed(1):'—'}</td><td class="narr">${gp?(r.pa/gp).toFixed(1):'—'}</td><td class="narr">${r.diff>=0?'+':''}${r.diff}</td></tr>`;
   }).join('')}</tbody></table>""", 1)
    rep("minor standings W-L left",
        """${rows.map(r=>`<div class="zpb-smrow ${r.team===user?'zpb-smrow-me':''}"><span>${lg(r.team)}${nick(r.team)}</span><span class="narr">${r.wins}-${r.losses}${r.ties?'-'+r.ties:''}</span></div>`).join('')}""",
        """${rows.map(r=>`<div class="zpb-smrow ${r.team===user?'zpb-smrow-me':''}"><span class="narr">${r.wins}-${r.losses}${r.ties?'-'+r.ties:''}</span><span>${lg(r.team)}${nick(r.team)}</span></div>`).join('')}""", 1)

    # ---------------- 15. 100 Seasons page: logo ranks, shorter bars, STATS, personnel, bubbles ----------------
    rep("league rank rows: logo + nickname, no numbers",
        """ const leagueRows = sorted.map((n,i)=>{
  const t = T[n];
  return '<div class="zpb-100bar' + (n===user ? ' zpb-100merow' : '') + '" style="' + (n===user ? uvars : '') + '">'
   + '<span>' + (i+1) + '. ' + nick(n) + '</span><span class="tr"><i style="width:' + (avgW[n]/Math.max(...sorted.map(x=>avgW[x]))*100).toFixed(1) + '%;"></i></span>'
   + '<span class="score">' + avgW[n].toFixed(1) + '</span></div>';
 }).join('');""",
        """ const zlog = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
 const leagueRows = sorted.map(n=>{
  const t = T[n];
  return '<div class="zpb-100bar' + (n===user ? ' zpb-100merow' : '') + '" style="' + (n===user ? uvars : '') + '">'
   + '<span class="zpb-100name">' + zlog(n) + nick(n) + '</span><span class="tr"><i style="width:' + (avgW[n]/Math.max(...sorted.map(x=>avgW[x]))*100).toFixed(1) + '%;"></i></span>'
   + '<span class="score">' + avgW[n].toFixed(1) + '</span></div>';
 }).join('');""", 1)
    rep("personnel chips: RUN+ / EVEN / PASS+",
        """ const planChips = ['11','12','13'].map(p=>{
  const cells = ['run','neutral','pass'].map(s=>{ const e = A.plan[p+'|'+s]; if(!e || e.n < 30) return ''; return '<span>' + STRAT[s].label + ' ' + pctS(e.w/e.n, 1) + '</span>'; }).join('');
  return cells ? '<div class="zpb-adcard"><span>' + (PERS[p] ? PERS[p].label : p) + '</span><i>' + cells + '</i></div>' : '';
 }).join('');""",
        """ const planChips = ['11','12','13'].map(p=>{
  const cells = ['run','neutral','pass'].map(s=>{ const e = A.plan[p+'|'+s]; if(!e || e.n < 30) return ''; return '<span>' + (s==='run' ? 'RUN+' : s==='pass' ? 'PASS+' : 'EVEN') + ' ' + Math.round(e.w/e.n*100) + '</span>'; }).join('');
  return cells ? '<div class="zpb-adcard"><span>' + (PERS[p] ? PERS[p].label : p) + '</span><i>' + cells + '</i></div>' : '';
 }).join('');""", 1)
    rep("stats section: rename + more bubbles + narr removed",
        """  + '<div class="zpb-100sec">Realism check</div><div class="zpb-advgrid">'
  + '<div class="zpb-adcard"><span>Points / game / team</span><b>' + ppg.toFixed(1) + '</b></div>'
  + '<div class="zpb-adcard"><span>Yards / game / team</span><b>' + Math.round(ypg) + '</b></div>'
  + '<div class="zpb-adcard"><span>Seasons simulated</span><b>' + N + '</b></div>'
  + '</div>'
  + '<p class="narr" style="margin:10px 0 0;">Full seasons (17 games + playoffs) with your drafted rosters. Back to season takes you back to your league.</p>'
  + '</div>';""",
        """  + '<div class="zpb-100sec">Stats</div><div class="zpb-advgrid">'
  + '<div class="zpb-adcard"><span>Points / game / team</span><b>' + Math.round(ppg) + '</b></div>'
  + '<div class="zpb-adcard"><span>Yards / game / team</span><b>' + Math.round(ypg) + '</b></div>'
  + '<div class="zpb-adcard"><span>Seasons simulated</span><b>' + N + '</b></div>'
  + '<div class="zpb-adcard"><span>One-score games</span><b>' + Math.round(tt.close/Math.max(tt.g,1)*100) + '%</b></div>'
  + '<div class="zpb-adcard"><span>Blowouts (21+)</span><b>' + Math.round(tt.blow/Math.max(tt.g,1)*100) + '%</b></div>'
  + '<div class="zpb-adcard"><span>Home wins</span><b>' + Math.round(tt.homeW/Math.max(tt.g-tt.ties,1)*100) + '%</b></div>'
  + '<div class="zpb-adcard"><span>Sacks in the sim</span><b>' + Math.round(tt.sacks).toLocaleString('en-US') + '</b></div>'
  + '<div class="zpb-adcard"><span>Turnovers in the sim</span><b>' + Math.round(tt.to).toLocaleString('en-US') + '</b></div>'
  + '<div class="zpb-adcard"><span>Ties</span><b>' + Math.round(tt.ties) + '</b></div>'
  + '<div class="zpb-adcard"><span>5000-yard passers</span><b>' + (A.thresholds ? A.thresholds.p5000 : 0) + '</b></div>'
  + '<div class="zpb-adcard"><span>2000-yard rushers</span><b>' + (A.thresholds ? A.thresholds.r2000 : 0) + '</b></div>'
  + '<div class="zpb-adcard"><span>20-TD scorers</span><b>' + (A.thresholds ? A.thresholds.td20 : 0) + '</b></div>'
  + '</div>'
  + '</div>';""", 1)
    rep("100 seasons button naming (graphical report)",
        " b.className = 'tabbtn'; b.id = 'sim100Btn'; b.textContent = '100 SEASON SIM';",
        " b.className = 'tabbtn'; b.id = 'sim100Btn'; b.textContent = '100 SEASONS';", 1)
    rep("100 seasons button naming (base twin)",
        ' d.innerHTML = `<button class="tabbtn" id="sim100Btn">100 SEASON SIM</button>${league100?\' <button class="tabbtn" id="sim100Re">Re-run</button>\':\'\'}`;',
        ' d.innerHTML = `<button class="tabbtn" id="sim100Btn">100 SEASONS</button>${league100?\' <button class="tabbtn" id="sim100Re">Re-run</button>\':\'\'}`;', 1)

    # ---------------- 16. draft results: SEASON button next to NEW DRAFT ----------------
    rep("draft ops: SEASON button added",
        """<span class="zpb-draftops" id="zpbDraftOps"><button class="tabbtn" id="newDraftBtn" style="font-size:0.78rem;padding:5px 10px;">NEW DRAFT</button></span>""",
        """<span class="zpb-draftops" id="zpbDraftOps"><button class="resetbtn" id="seasonOpsBtn" style="font-size:0.78rem;padding:5px 12px;width:auto;margin:0 6px 0 0;">SEASON</button><button class="tabbtn" id="newDraftBtn" style="font-size:0.78rem;padding:5px 10px;">NEW DRAFT</button></span>""", 1)
    rep("start season hero renamed",
        '<button class="resetbtn zpb-startbtn" id="startSeasonHeroBtn">Start Season</button>',
        '<button class="resetbtn zpb-startbtn" id="startSeasonHeroBtn">SEASON</button>', 1)
    rep("start season renamed",
        '<button class="resetbtn zpb-startbtn" id="startSeasonBtn">Start Season</button>',
        '<button class="resetbtn zpb-startbtn" id="startSeasonBtn">SEASON</button>', 1)
    rep("how-your-draft-ranks: shiny fading block, no table lines",
        """   w.innerHTML = `<h3 style="margin:0 0 6px;">How your draft ranks</h3><p class="zpb-swmini">All 32 simulated rosters, best to worst. Click any row for its full roster.</p><table><thead><tr><th>#</th><th>Team</th><th>Score</th></tr></thead><tbody>${entryRowsHTML(rk,0)}</tbody></table>`;""",
        """   w.innerHTML = `<div class="zpb-ranks-fade"><h3 class="zpb-shm" style="margin:0 0 6px;">How your draft ranks</h3><p class="zpb-swmini">All 32 simulated rosters, best to worst. Click any row for its full roster.</p><table><thead><tr><th>#</th><th>Team</th><th>Score</th></tr></thead><tbody>${entryRowsHTML(rk,0)}</tbody></table></div>`;""", 1)
    rep("entry labels: no Fantasy Draft suffix",
        ' label: `${r.teamName} — Fantasy Draft`, teamName: r.teamName,',
        ' label: `${r.teamName}`, teamName: r.teamName,', 1)
    rep("entry labels: no Actual Roster suffix",
        ' label: `${t} — Actual Roster`, teamName: t,',
        ' label: `${t}`, teamName: t,', 1)
    rep("your roster tab: shimmer on 85+ names",
        """  const effCell = `<span class="score">${e?e.ovr:'—'}</span>`;
  slotRows += `<tr class="zpb-trow" style="${zstM}"><td>${LABELS[s]||s}</td><td>${e&&e.name?e.name:'—'}</td><td>${effCell}</td><td class="narr">${rnd?`Round ${rnd}`:'—'}</td><td class="score">#${rank}/32</td><td class="score">${grade}</td></tr>`;""",
        """  const effCell = `<span class="score">${e?e.ovr:'—'}</span>`;
  const nmCell = (e && e.name) ? `<span class="${e.ovr>=85?'zpb-shm':''}">${e.name}</span>` : '—';
  slotRows += `<tr class="zpb-trow" style="${zstM}"><td>${LABELS[s]||s}</td><td>${nmCell}</td><td>${effCell}</td><td class="narr">${rnd?`Round ${rnd}`:'—'}</td><td class="score">#${rank}/32</td><td class="score">${grade}</td></tr>`;""", 1)
    rep("try again wording",
        "Try again to <b class=\"zpb-shine\">20-0</b>",
        "Try again to go <b class=\"zpb-shine\">20-0</b>", 1)

    # ---------------- 17. game preview: two-team duel instead of the wall of text ----------------
    rep("why-these-plans: duel blocks + team-colored preseason link",
        """  <details style="margin-top:10px;"><summary style="cursor:pointer;font-weight:700;">Why these plans?</summary>
   <p class="detail-item" style="margin-top:8px;">${planPreviewParagraph(g)}</p>
   <p class="narr" style="margin:6px 0 0;">Offense and defense are chosen separately, and every coach (you included) is scored against what the opponent is <i>expected</i> to do; nobody reacts to a plan they cannot see. A trailing team opens it up late. ${S.scriptLocked?'':'Your coaching philosophy is still open on the <a href="#" id="backToPreseason">Preseason page</a>.'} The Guide tab has the math of each choice.</p></details></div>`;""",
        """  <details style="margin-top:10px;"><summary style="cursor:pointer;font-weight:700;">Why these plans?</summary>
   ${zpbDuelHTML(g)}
   <p class="narr" style="margin:6px 0 0;">Coaches are scored against what the opponent is <i>expected</i> to do — nobody reacts to a plan they cannot see — and a trailing team opens it up late. ${S.scriptLocked?'':'Your coaching philosophy is still open on the <a href="#" id="backToPreseason" class="zpb-teamlink">Preseason page</a>.'} The Guide tab has the math of each choice.</p></details></div>`;""", 1)

    # ---------------- 18. the game replay: TD/FG badges, real turnovers, spaced score ----------------
    rep("replay: scorer info gains the defensive-TD queue",
        """   info[sd] = {qbName:qbName, kicker:kicker, recs:recs, rush:rush};
  });
  const describe = e=>{
   const inf = info[e.side] || {recs:[], rush:[], qbName:'', kicker:''};
   if(e.type==='FG') return (inf.kicker || 'Kicker') + ' field goal';
   if(e.type==='SAF') return 'Safety';
   if(e.type==='TD'){
    const total = inf.recs.length + inf.rush.length;
    const isPass = total ? Math.random() < (inf.recs.length/total) : false;
    if(isPass && inf.recs.length) return (inf.qbName || 'Quarterback') + ' to ' + inf.recs.shift();
    if(inf.rush.length) return inf.rush.shift() + ' run';
    if(inf.recs.length) return (inf.qbName || 'Quarterback') + ' to ' + inf.recs.shift();
    return 'Touchdown';
   }
   return 'Score';
  };
  const colOf = tm=>{""",
        """   const dtq = ((g.detail && g.detail[sd] && g.detail[sd].defScores) || []).slice().sort((a,b)=>(a.q-b.q)).map(d=>({name:d.name, kind:d.type}));
   info[sd] = {qbName:qbName, kicker:kicker, recs:recs, rush:rush, dtq:dtq};
  });
  const describe = e=>{
   const inf = info[e.side] || {recs:[], rush:[], qbName:'', kicker:'', dtq:[]};
   if(e.type==='FG') return (inf.kicker || 'Kicker') + ' field goal';
   if(e.type==='SAF') return 'Safety';
   if(e.type==='TD'){
    const total = inf.recs.length + inf.rush.length;
    const isPass = total ? Math.random() < (inf.recs.length/total) : false;
    if(isPass && inf.recs.length) return (inf.qbName || 'Quarterback') + ' to ' + inf.recs.shift();
    if(inf.rush.length) return inf.rush.shift() + ' run';
    if(inf.recs.length) return (inf.qbName || 'Quarterback') + ' to ' + inf.recs.shift();
    const d = (inf.dtq || []).shift();
    if(d) return d.name + (d.kind==='INT' ? ' interception return' : ' fumble return');
    return 'Touchdown';
   }
   return 'Score';
  };
  const colOf = tm=>{""", 1)
    rep("replay: turnover queues + spread clock",
        """  const toEvents = [];
  [['home',toH],['away',toA]].forEach(([sd,n])=>{
   for(let i=0;i<n;i++){
    const q = Math.min(4, 1+Math.floor((i+0.5)/Math.max(n,1)*4));
    toEvents.push({q:q, t:0.5, pts:0, type:'TO', side:sd});
   }
  });""",
        """  const toEvents = [];
  const tkQ = {home:((g.detail && g.detail.home && g.detail.home.takeaways) || []).slice(), away:((g.detail && g.detail.away && g.detail.away.takeaways) || []).slice()};
  [['home',toH],['away',toA]].forEach(([sd,n])=>{
   for(let i=0;i<n;i++){
    const q = Math.min(4, 1+Math.floor((i+0.5)/Math.max(n,1)*4));
    toEvents.push({q:q, t:Math.max(0.08, 0.92 - ((i+0.5)/Math.max(n,1))*0.84), pts:0, type:'TO', side:sd});
   }
  });""", 1)
    rep("replay: game-winning FG index",
        """  const all = evs.concat(toEvents).sort((a,b)=> a.q-b.q || a.t-b.t);
  const abbr = n=> TEAM_ABBR[n] || n;""",
        """  const all = evs.concat(toEvents).sort((a,b)=> a.q-b.q || a.t-b.t);
  const abbr = n=> TEAM_ABBR[n] || n;
  const finH = r.homeScore, finA = r.awayScore;
  let gwIdx = -1;
  { let li = -1, le = null; all.forEach((e,i)=>{ if((e.pts||0)>0){ li = i; le = e; } });
    if(le && le.type==='FG'){ const my = le.side==='home' ? finH : finA, op = le.side==='home' ? finA : finH;
      if(my>op && (my-3)<=op) gwIdx = li; } }""", 1)
    rep("replay: turnover line with detail",
        """     if(ev.type==='TO'){
      const line = document.createElement('div');
      line.className = 'zpb-rep-line zrl-to';
      line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q</span>' + crest(g[ev.side])
       + '<span class="zrl-team">' + abbr(g[ev.side]) + '</span><span class="zrl-play">Turnover</span>'
       + '<span class="zrl-pts" style="color:' + colOf(g[ev.side]) + ';">TO</span>';""",
        """     if(ev.type==='TO'){
      const line = document.createElement('div');
      line.className = 'zpb-rep-line zrl-to';
      const tk = (tkQ[ev.side] || []).shift();
      const toTxt = tk ? (tk.type==='INT'
        ? ((tk.name || '') + ' int ' + (tk.from || ''))
        : (tk.recoveredBy && tk.recoveredBy===tk.name
           ? ((tk.name || '') + ' strips ' + (tk.from || '') + ' & ' + tk.name + ' recovers')
           : ((tk.name || '') + ' FF' + (tk.recoveredBy ? ', ' + tk.recoveredBy + ' FR' : '')))) : '';
      line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
       + '<span class="zrl-team">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + toTxt + '</span>'
       + '<span class="zrl-badge" style="color:' + colOf(g[ev.side]) + ';">TO</span>';""", 1)
    rep("replay: TD/FG badges + spaced score",
        """     const line = document.createElement('div');
     line.className = 'zpb-rep-line' + (((ev.side==='home'&&focusTeam===g.home)||(ev.side==='away'&&focusTeam===g.away)) ? ' zrl-me' : '');
     line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
      + '<span class="zrl-team">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + describe(ev)
      + '</span><span class="zrl-pts" style="color:' + colOf(g[ev.side]) + ';">+' + (ev.pts||0) + '</span>'
      + '<span class="zrl-sc"><b style="color:' + colOf(g.away) + ';">' + as + '</b>–<b style="color:' + colOf(g.home) + ';">' + hs + '</b></span>';""",
        """     const line = document.createElement('div');
     line.className = 'zpb-rep-line' + (((ev.side==='home'&&focusTeam===g.home)||(ev.side==='away'&&focusTeam===g.away)) ? ' zrl-me' : '');
     const _cl = colOf(g[ev.side]);
     const _badge = ev.type==='TD' ? '<span class="zrl-badge zrl-td zpb-shm" style="--zrb:' + _cl + '">TD</span>'
      : ev.type==='FG' ? '<span class="zrl-badge' + (i===gwIdx ? ' zpb-shm' : '') + '" style="--zrb:' + _cl + ';color:' + _cl + ';">FG</span>'
      : '<span class="zrl-badge" style="color:' + _cl + ';">' + (ev.type==='SAF' ? 'SAF' : '+') + '</span>';
     line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
      + '<span class="zrl-team">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + describe(ev)
      + '</span>' + _badge
      + '<span class="zrl-sc"><b style="color:' + colOf(g.away) + ';">' + as + '</b> - <b style="color:' + colOf(g.home) + ';">' + hs + '</b></span>';""", 1)
    rep("replay: turnovers footer removed, spaced final",
        """   fin.innerHTML = star + '<b>FINAL · ' + as + '–' + hs + '</b><span>' + winTxt + '</span>'
    + '<em>Turnovers · ' + abbr(g.away) + ' ' + toA + ' – ' + toH + ' ' + abbr(g.home) + '</em>';""",
        """   fin.innerHTML = star + '<b>FINAL · ' + as + ' - ' + hs + '</b><span>' + winTxt + '</span>';""", 1)

    # ---------------- apply every exact replacement ----------------
    for label, old, new, cnt in EXACT:
        found = html.count(old)
        if found != cnt:
            raise SystemExit(f"ABORT: [v11] {label}: expected {cnt} occurrence(s), found {found}")
        html = html.replace(old, new)
        REMOVED.append(old)
        print(f"[ok] [v11] {label}")

    return html, EXACT, REMOVED
