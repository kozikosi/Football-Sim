#!/usr/bin/env python3
"""Z-post-blue WAVE 10 build module.
Owner tenth directive (~90 items): 100 Season Sim naming/gating/redesign;
full-bleed 20-0 bar; bare bottom footer; slower fades; Madden badges;
scrollable player browser; comparison integers/alignment/colors; graphical
Guide (positions ranked + cumulative series + fading explainers + personnel
boxes + package viz + Glossary); draft-board upgrades; draft-finish
cinematic; preseason reworks; FB + Punter draft slots; new flex matrix;
3-4/4-3 base toggle; philosophy unlocked all season. UI/copy only — the
protected math invariants stay byte-identical except the documented FB/P
slot addition and the 3-4 spec adjustment (both Owner-directed)."""
import re as _re

def apply(html):
    # ---------------- exact replacements ----------------
    EXACT = [
    # -- hint removed everywhere (Owner) --
    ("hint removed",
     "function fillDraftGuide(){ const wire = ()=>{ const a = document.getElementById('zpbHintGuide'); if(a && !a.dataset.ready){ a.dataset.ready = '1'; a.addEventListener('click', e=>{ e.preventDefault(); setActiveTab('viewGuide','tabGuideBtn'); }); } }; if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', wire); } else { wire(); } }",
     "function fillDraftGuide(){ /* the hint is retired (Owner) */ }", 1),
    ("static footer hint removed",
     "<footer class=\"zpb-foot\"><p class=\"zpb-hint\"><a href=\"#\" id=\"zpbHintGuide\">see guide for details</a></p>",
     "<footer class=\"zpb-foot\">", 1),
    ("pager wiring removed",
     "  const prev = document.getElementById('pgPrev'), next = document.getElementById('pgNext');\n  if(prev) prev.addEventListener('click', ()=>{ playerPage--; renderPlayers(); const t=document.getElementById('playerTable'); if(t) t.scrollIntoView({block:'start'}); });\n  if(next) next.addEventListener('click', ()=>{ playerPage++; renderPlayers(); const t=document.getElementById('playerTable'); if(t) t.scrollIntoView({block:'start'}); });",
     "", 1),
    # -- Madden Rankings: default-weights explainer removed --
    ("weights explainer removed",
     " h += `<div class=\"narr\" style=\"margin:6px 0;\">The default is the <b>model weights</b>: what each spot is really worth in wins, scaled so the biggest spot (QB) is 700 and rounded to the nearest 5. Edit any number to build your own set; the buttons switch between the two.</div>\n <button class=\"resetbtn\" id=\"modelWBtn\" style=\"margin-right:6px;\">Use model weights</button><button class=\"resetbtn\" id=\"personalWBtn\">Back to my weights</button>`;",
     " h += ` <button class=\"resetbtn\" id=\"modelWBtn\" style=\"margin-right:6px;\">Use model weights</button><button class=\"resetbtn\" id=\"personalWBtn\">Back to my weights</button>`;", 1),
    # -- badges: no emojis --
    ("emoji can't-run", "\U0001F3C3\U0001F3FF Can't Run Penalty", "Can't Run Penalty", 1),
    ("emoji weak-d", "\U0001F6E1\uFE0F Weak D Penalty", "Weak D Penalty", 1),
    ("emoji can't-pass", "\U0001F6AB Can't Pass Penalty", "Can't Pass Penalty", 1),
    # -- Player Browser: one scrollable panel, pager gone --
    ("player page size", "let playerPage = 1; const PLAYER_PAGE_SIZE = 15; // Z-post-blue player-browser pagination (UI only)",
     "let playerPage = 1; const PLAYER_PAGE_SIZE = 1000000; // every player in one scrollable panel", 1),
    ("player count line",
     "document.getElementById('playerCount').textContent = `${rows.length} player${rows.length===1?'':'s'} · Page ${playerPage} of ${total}`;",
     "document.getElementById('playerCount').textContent = `${rows.length} player${rows.length===1?'':'s'}`;", 1),
    ("pager removed",
     "  pager.innerHTML = `<button class=\"pagbtn\" id=\"pgPrev\" ${playerPage<=1?'disabled':''}>&#8249; Prev</button><span class=\"paginfo\">Page ${playerPage} of ${total}</span><button class=\"pagbtn\" id=\"pgNext\" ${playerPage>=total?'disabled':''}>Next &#8250;</button>`;",
     "  pager.innerHTML = '';", 1),
    # -- Team Comparison: sentence gone, integers, alignment, team colors --
    ("cmp verdict removed",
     "  verdict = `On your current weights, <b>${leader}</b> grades ${gap.toFixed(2)} points ahead of ${trailer}. ${a} holds the edge at ${edges.a} starting spots to ${b}'s ${edges.b}, and wins ${units.aUnits} of ${units.total} unit comparisons to ${b}'s ${units.bUnits}.`;",
     "  verdict = '';", 1),
    ("cmp header integers + grid",
     """   <div style="display:flex;justify-content:space-between;align-items:center;font-size:1.1rem;font-weight:700;gap:10px;flex-wrap:wrap;">
    <span>${a} <span class="narr">(#${rankOf(a)})</span></span>
    <span class="score" style="color:var(--accent);">${scoreA.toFixed(2)} vs ${scoreB.toFixed(2)}</span>
    <span>${b} <span class="narr">(#${rankOf(b)})</span></span>
   </div>
   <p class="detail-item" style="margin-top:10px;">${verdict}</p>""",
     """   <div class="zpb-cmphead">
    <span class="zpb-cmpside">${a} <span class="zpb-cmpsub">(#${rankOf(a)})</span></span>
    <span class="zpb-cmpscore"><span style="color:var(--tA2,var(--accent));">${Math.round(scoreA)}</span> <span class="zpb-cmpsub">vs</span> <span style="color:var(--tA2,var(--accent));">${Math.round(scoreB)}</span></span>
    <span class="zpb-cmpside">${b} <span class="zpb-cmpsub">(#${rankOf(b)})</span></span>
   </div>""", 1),
    ("cmp lineup cell left -> shimmer/vibrant, box gone",
     "<span class=\"zpb-lu-cell zpb-lu-l ${l.text!=='—'&&zL?'zpb-trow':''} ${l.val>r.val?'zpb-lu-win':''}\" style=\"${l.text!=='—'&&zL?zL:''}\">${l.text}</span>",
     "<span class=\"zpb-lu-cell zpb-lu-l ${l.val>=90?'zpb-shm':(l.val>=85?'zpb-vib':'')} ${l.val>r.val?'zpb-lu-win':''}\"${l.val>=85?` title=\"${l.val} OVR\"`:''}>${l.text}</span>", 1),
    ("cmp lineup cell right -> shimmer/vibrant, box gone",
     "<span class=\"zpb-lu-cell zpb-lu-r ${r.text!=='—'&&zR?'zpb-trow':''} ${r.val>l.val?'zpb-lu-win':''}\" style=\"${r.text!=='—'&&zR?zR:''}\">${r.text}</span>",
     "<span class=\"zpb-lu-cell zpb-lu-r ${r.val>=90?'zpb-shm':(r.val>=85?'zpb-vib':'')} ${r.val>l.val?'zpb-lu-win':''}\"${r.val>=85?` title=\"${r.val} OVR\"`:''}>${r.text}</span>", 1),
    ("cmp unit rows: integers + team colors, no green",
     "  rows += `<tr><td style=\"${ma.avg>mb.avg?'font-weight:700;color:var(--good);':''}\">${ma.avg.toFixed(1)}</td><td class=\"narr\" style=\"text-align:center;\">${ma.label}</td><td style=\"${mb.avg>ma.avg?'font-weight:700;color:var(--good);':''}text-align:right;\">${mb.avg.toFixed(1)}</td></tr>`;",
     "  rows += `<tr><td style=\"${ma.avg>mb.avg?'font-weight:700;color:var(--tA2,var(--accent));':''}\">${Math.round(ma.avg)}</td><td class=\"narr\" style=\"text-align:center;\">${ma.label}</td><td style=\"${mb.avg>ma.avg?'font-weight:700;color:var(--tA2,var(--accent));':''}text-align:right;\">${Math.round(mb.avg)}</td></tr>`;", 1),
    ("cmp label A dropped",
     "<label style=\"display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);\">Team A\n     <select id=\"homeCmpA\"></select>\n    </label>",
     "<label style=\"display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);align-items:center;\">\n     <select id=\"homeCmpA\" aria-label=\"Team A\"></select>\n    </label>", 1),
    ("cmp label B dropped",
     "<label style=\"display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);\">Team B\n     <select id=\"homeCmpB\"></select>\n    </label>",
     "<label style=\"display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);align-items:center;\">\n     <select id=\"homeCmpB\" aria-label=\"Team B\"></select>\n    </label>", 1),
    # -- Guide rebuild --
    ("guide intro panel removed",
     "return `<div class=\"panel\" style=\"margin-bottom:14px;\"><h3 style=\"margin-top:0;\">Guide</h3><p class=\"narr\">Short reference sections for the terms the sim uses. Click through only what you need.</p></div>`\n  + sec('Sim Guide', how, true)",
     "return sec('Sim Guide', '<div class=\"zpb-swgroup\">' + zpbSw('Draft.') + zpbSw('Season.') + zpbSw('Playoffs.') + zpbSw('Super Bowl.') + '</div>', true)", 1),
    ("guide draft section -> graphic",
     "sec('Drafting: which positions matter', draft, true)",
     "sec('Drafting: which positions matter', zpbDraftGuideHTML(), true)", 1),
    ("guide flex + values sections -> one 28-spot graphic block",
     "sec('Flexing players, explained', flex, false)\n  + sec('Position values: all 26 starting spots', values, false)",
     "sec('Position values: all 28 starting spots', zpbValuesHTML(), false)", 1),
    ("guide board section fades",
     "sec('Reading the draft board (Wins, Priority, Gone)', board, false)",
     "sec('Reading the draft board (Wins, Priority, Gone)', zpbSwWrap(board), false)", 1),
    ("guide coach section rebuilt",
     "sec('Coaching: personnel, styles and game plans', coach + '<p class=\"narr\" style=\"margin:8px 0 0;\">Home field is worth +1.7 points a game in the model. It is baked into every projection — one reason home teams win slightly more often.</p>', false)",
     "sec('Coaching: personnel, styles and game plans', zpbCoachGuideHTML(coach), false)", 1),
    ("guide terms -> Glossary",
     "sec('Football and site terms', termsHTML(), false)",
     "sec('Glossary', zpbGlossHTML(), false)", 1),
    ("personnel table -> boxes (What it means gone)",
     """function persTableHTML(){
 const rows = Object.keys(PERS).map(k=>{ const rb = +k[0], te = +k[1], wr = 5-rb-te;
  return `<tr><td><b>${k}</b></td><td class="score">${rb}</td><td class="score">${te}</td><td class="score">${wr}</td><td>${PERS[k].long}</td></tr>`; }).join('');
 return `<p class="narr" style="margin:4px 0;">Offenses describe their lineup with a two-digit code: the <b>first digit is the number of running backs</b> and the <b>second is the number of tight ends</b>. Every offense also has a quarterback and five offensive linemen, so the wide receivers fill whatever is left of the 11 (5 minus the backs and tight ends).</p>
  <table><thead><tr><th>Code</th><th>Running backs</th><th>Tight ends</th><th>Wide receivers</th><th>What it means</th></tr></thead><tbody>${rows}</tbody></table>
  <p class="narr" style="margin:6px 0 0;">More blockers (extra tight ends or backs) means a better running game and protection but fewer receivers to throw to, which costs some passing. Only 11 personnel has no built-in cost.</p>`;
}""",
     """function persTableHTML(){
 return `<p class="narr" style="margin:4px 0;">Offenses describe their lineup with a two-digit code: the <b>first digit is the number of running backs</b> and the <b>second is the number of tight ends</b>. Every offense also has a quarterback and five offensive linemen, so the wide receivers fill whatever is left of the 11 (5 minus the backs and tight ends).</p>
  ${zpbPersBoxesHTML()}`;
}""", 1),
    ("built-in cost as negative numbers",
     "Every non-11 set also takes a receiver off the field (a built-in cost of 0.2–0.5 points) that only a better tight end or second back can repay.",
     "Every non-11 set also takes a receiver off the field (−0.2 to −0.5 points a game) that only a better tight end or second back can repay.", 1),
    ("preseason terms dropdown: boxes + package viz, style lists gone",
     "<details style=\"margin-top:12px;\"><summary style=\"cursor:pointer;font-weight:700;\">What do these terms mean? (personnel, styles)</summary><div style=\"margin-top:8px;\">${persTableHTML()}${styleListsHTML()}</div></details>",
     "<details style=\"margin-top:12px;\"><summary style=\"cursor:pointer;font-weight:700;\">What do these terms mean? (personnel, packages)</summary><div style=\"margin-top:8px;\">${persTableHTML()}${zpbPkgVizHTML()}</div></details>", 1),
    ("guide coach: style lists stripped at build time",
     "<h5 class=\"narr\" style=\"margin:14px 0 6px;\">What each style means</h5>${styleListsHTML()}", "", 1),
    ("position chips as pips",
     "  ch += `<span class=\"chip ${on?'on':''} ${f>=t?'full':''}\"><span data-tog=\"${g}\" title=\"Show or hide ${WV_NAMES[g].toLowerCase()}s\">${g} ${f}/${t}</span></span>`;",
     "  ch += `<span class=\"chip zpb-pip${on?' on':''}\" data-tog=\"${g}\" title=\"Show or hide ${WV_NAMES[g].toLowerCase()}s — ${f} of ${t} filled\"><i></i>${g} <b>${f}/${t}</b></span>`;", 1),
    # -- Draft board --
    ("sort label ovr", ">Sort: overall<", ">OVERALL<", 1),
    ("sort label priority", ">Sort: pick priority<", ">PRIORITY<", 1),
    ("sort label wins", ">Sort: wins value<", ">WINS<", 1),
    ("sort label gone", ">Sort: chance gone<", ">GONE<", 1),
    ("sort label name", ">Sort: player name<", ">NAME<", 1),
    ("sort label pos", ">Sort: position<", ">POSITION<", 1),
    ("sort label team", ">Sort: team<", ">TEAM<", 1),
    ("Table / Cards segmented control",
     "<select id=\"draftView2\"><option value=\"table\" selected>One table</option><option value=\"cards\">Position cards</option></select>",
     "<span class=\"zpb-seg\" id=\"draftViewSeg\"><button type=\"button\" data-zview=\"table\" class=\"zpb-seg-on\">Table</button><button type=\"button\" data-zview=\"cards\">Cards</button></span><select id=\"draftView2\" style=\"display:none;\"><option value=\"table\" selected>One table</option><option value=\"cards\">Position cards</option></select>", 1),
    ("position sort follows Your Roster order",
     "sortKey==='pos' ? (POS_DISPLAY[r.p[1]]||r.p[1])",
     "sortKey==='pos' ? zpbSlotOrderOf(r.p[1])", 1),
    ("Drafting as removed",
     "<div class=\"das-text\">Drafting as <b>${userTeamName}</b></div>", "", 1),
    ("Draft Complete gone, NEW DRAFT + ops cluster",
     "<h2 style=\"margin-top:0;\">Draft Complete</h2><button class=\"tabbtn\" id=\"newDraftBtn\" style=\"font-size:0.78rem;padding:5px 10px;\">Start a new draft…</button>",
     "<span class=\"zpb-draftops\" id=\"zpbDraftOps\"><button class=\"tabbtn\" id=\"newDraftBtn\" style=\"font-size:0.78rem;padding:5px 10px;\">NEW DRAFT</button></span>", 1),
    ("draft-complete tabs capitalized, sim tab removed",
     """   <button class="tabbtn ${resultsView==='season'?'active':''}" id="resultsSeasonBtn">Season</button>
   <button class="tabbtn ${resultsView==='sim'?'active':''}" id="resultsSimBtn">Vs. Simulated Teams</button>
   <button class="tabbtn ${resultsView==='nfl'?'active':''}" id="resultsNflBtn">Vs. Actual NFL Teams</button>
   <button class="tabbtn ${resultsView==='mine'?'active':''}" id="resultsMineBtn">Your Roster</button>
   <button class="tabbtn ${resultsView==='compare'?'active':''}" id="resultsCompareBtn">Team Comparison</button>""",
     """   <button class="tabbtn ${resultsView==='season'?'active':''}" id="resultsSeasonBtn">SEASON</button>
   <button class="tabbtn ${resultsView==='nfl'?'active':''}" id="resultsNflBtn">VS. ACTUAL NFL TEAMS</button>
   <button class="tabbtn ${resultsView==='mine'?'active':''}" id="resultsMineBtn">YOUR ROSTER</button>
   <button class="tabbtn ${resultsView==='compare'?'active':''}" id="resultsCompareBtn">TEAM COMPARISON</button>""", 1),
    ("sim tab handler removed",
     "document.getElementById('resultsSimBtn').addEventListener('click', ()=>{ resultsView='sim'; renderDraftResults(); });", "", 1),
    ("draft ranks rows: Type column gone, You shimmers, integers",
     """  h += `<tr class="teamrow" data-idx="${idx}" style="${e.isUser?'font-weight:700;color:var(--accent);':''}"><td class="rank">${i+1}</td><td>${e.label}</td><td class="narr">${e.type}</td><td class="score">${e.score.toFixed(2)}</td></tr>
   <tr class="detailrow" id="detailrow-${idx}" style="display:none;"><td colspan="4"><div class="detailwrap" id="detailwrap-${idx}"></div></td></tr>`;""",
     """  h += `<tr class="teamrow" data-idx="${idx}" style="${e.isUser?'font-weight:700;':''}"><td class="rank">${i+1}</td><td${e.isUser?' class="zpb-shm"':''}>${e.label}</td><td class="score">${Math.round(e.score)}</td></tr>
   <tr class="detailrow" id="detailrow-${idx}" style="display:none;"><td colspan="3"><div class="detailwrap" id="detailwrap-${idx}"></div></td></tr>`;""", 1),
    ("draft ranks header: Type gone",
     "<th>#</th><th>Team</th><th>Type</th><th>Score</th>", "<th>#</th><th>Team</th><th>Score</th>", 2),
    ("how your draft ranks fades",
     "<h3 style=\"margin:0 0 6px;\">How your draft ranks</h3><p class=\"narr\" style=\"margin-top:0;\">All 32 simulated rosters, best to worst. Click any row for its full roster.</p>",
     "<h3 style=\"margin:0 0 6px;\">How your draft ranks</h3><p class=\"zpb-swmini\">All 32 simulated rosters, best to worst. Click any row for its full roster.</p>", 1),
    ("grade line cleaned + visualized",
     "  <h3 style=\"margin-top:0;\">Overall Grade: <span style=\"color:var(--accent);\">${letterGrade(overallPct)}</span> (${myEntry.score.toFixed(2)}, #${rankAmongReal} of 32 vs. real NFL rosters)</h3>",
     "  <h3 style=\"margin-top:0;\">Overall Grade <span style=\"color:var(--accent);\">${letterGrade(overallPct)}</span></h3>\n   <div class=\"zpb-optwins\"><b>#${rankAmongReal}</b><span>of 32 vs. real NFL rosters · score ${Math.round(myEntry.score)}</span></div>", 1),
    ("starter table heading removed",
     "   <h4 style=\"margin-top:0;\">Every Starter, Graded vs. the League</h4>\n", "", 1),
    ("draft-finish cinematic hook",
     "function renderDraftResults(){",
     "function renderDraftResults(){ if(typeof zpbMaybeFinishCine==='function') zpbMaybeFinishCine();", 1),
    ("Start Season hero: glimmering 20-0 underneath (goSeason branch)",
     "   <p class=\"narr\" style=\"margin-top:10px;\">Want to review your roster first? <button class=\"tabbtn\" id=\"backToResultsBtn\" style=\"width:auto;padding:4px 10px;font-size:0.8rem;\">Draft results</button></p>",
     "   <p class=\"zpb-cygline\">Can you go <b class=\"zpb-shine\">20-0</b><b class=\"zpb-shine\" style=\"font-size:1.1em;\">?</b></p>\n   <p class=\"narr\" style=\"margin-top:6px;\"><button class=\"tabbtn\" id=\"backToResultsBtn\" style=\"width:auto;padding:4px 10px;font-size:0.8rem;\">Draft results</button></p>", 1),
    ("Start Season button (live season tab): glimmering 20-0 underneath",
     """ if(!seasonState){
  container.innerHTML = `<div class="zpb-stageintro">
   <button class="resetbtn zpb-startbtn" id="startSeasonBtn">Start Season</button>
  </div>`;
  document.getElementById('startSeasonBtn').addEventListener('click', ()=>{ startSeason(); renderSeasonTab(container); });
  return;
 }""",
     """ if(!seasonState){
  container.innerHTML = `<div class="zpb-stageintro">
   <button class="resetbtn zpb-startbtn" id="startSeasonBtn">Start Season</button>
   <p class="zpb-cygline">Can you go <b class="zpb-shine">20-0</b><b class="zpb-shine" style="font-size:1.1em;">?</b></p>
  </div>`;
  document.getElementById('startSeasonBtn').addEventListener('click', ()=>{ startSeason(); renderSeasonTab(container); });
  return;
 }""", 1),
    # -- 100 Season Sim naming + gating --
    ("100 button label", "b.textContent = league100 ? '100-Season Report' : '100 Seasons';", "b.textContent = '100 SEASON SIM';", 1),
    ("100 button joins the ops cluster",
     " if(tabs){ tabs.appendChild(b); }",
     " const ops = document.getElementById('zpbDraftOps'); if(ops){ ops.appendChild(b); } else if(tabs){ tabs.appendChild(b); }", 1),
    ("100 button label (season site)",
     "id=\"sim100Btn\">${league100?'View 100-season report':'Run 100-season simulation'}</button>",
     "id=\"sim100Btn\">100 SEASON SIM</button>", 1),
    ("100 button move next to NEW DRAFT (season site)",
     "container.insertBefore(d, container.firstChild);\n const b = document.getElementById('sim100Btn');",
     "const ops = document.getElementById('zpbDraftOps'); if(ops) ops.appendChild(d); else container.insertBefore(d, container.firstChild);\n const b = document.getElementById('sim100Btn');", 1),
    ("100 report title (builder)",
     "100-Season Report: ' + user + '", "100 Season Sim: ' + user + '", 1),
    ("100 report title (static)",
     "100-Season Report: ${user}", "100 Season Sim: ${user}", 1),
    ("100 progress line",
     "Simulating 100 seasons…", "Running the 100 Season Sim…", 1),
    ("guide: 100 Season Sim phrasing",
     "a 100-season simulation that shows how much of your result was skill and how much was luck",
     "the 100 Season Sim, which shows how much of your result was skill and how much was luck", 1),
    ("league100 + cinematic reset on new draft",
     "d('draftPosFilter2','all'); d('draftSearch2',''); }",
     "d('draftPosFilter2','all'); d('draftSearch2',''); }\n league100 = null; window._zpbFinDone = false;", 1),
    ("100 report avg wins integer",
     "'<div class=\"zpb-100me\" style=\"' + uvars + '\"><b>' + myAvg.toFixed(1) + '</b><span>avg wins · #' + myRank + ' of 32</span></div>'",
     "'<div class=\"zpb-100me\" style=\"' + uvars + '\"><b>' + Math.round(myAvg) + '</b><span>avg wins · #' + myRank + ' of 32</span></div>'", 1),
    # -- Preseason --
    ("selected line -> bubbles",
     "   <div style=\"font-size:0.92rem;\">Selected: <b>${capFirst(offStyleName(id.off))}</b> (${planText(id.off)}) · <b>${capFirst(defStyleName(id.def))}</b> (${defPlanText(id.def)})</div></div>",
     "   <div class=\"zpb-selrow\"><div class=\"zpb-selbubble\"><em>Offense</em><b>${capFirst(offStyleName(id.off))}</b><span>${planText(id.off)}</span></div><div class=\"zpb-selbubble\"><em>Defense</em><b>${capFirst(defStyleName(id.def))}</b><span>${defPlanText(id.def)}</span></div></div><div id=\"zpbBaseToggleHost2\" style=\"margin-top:10px;\"></div></div>", 1),
    ("wins of optimal card",
     "if(adv.gain<0.02){ h += `<p class=\"narr\" style=\"margin:4px 0;\">No better arrangement exists — within ${Math.max(0,adv.gain).toFixed(2)} wins of optimal.</p>`; return h; }",
     "if(adv.gain<0.02){ h += `<div class=\"zpb-optwins\"><b>${Math.round(Math.max(0,adv.gain))} wins</b><span>of optimal</span></div>`; return h; }", 1),
    ("KR label (no divider line)",
     "<div style=\"margin-top:12px;border-top:1px solid var(--border);padding-top:8px;\"><div class=\"depth-row lgrid\"><span class=\"slotname\">Ret</span>",
     "<div style=\"margin-top:12px;padding-top:8px;\"><div class=\"zpb-retrow\"><span class=\"slotname\" data-zslot=\"KR\" title=\"Kick Returner\">KR</span>", 1),
    # ("preseason intro already text-free since v8 — no lock language remains"),
    ("philosophy text tightened",
     "Your <b>coaching philosophy</b> is how your team likes to play by default, on offense and on defense. It names your team's style all season, and opponents scout it.",
     "Your <b>coaching philosophy</b> is how your team likes to play by default. Opponents scout it.", 1),
    ("balanced aggressiveness rewritten",
     "desc:'Follows the usual NFL chart: kicks the extra point most of the time, goes for 2 in situations where the numbers say to, and goes for it on 4th down when it is short and the field position is good.'}",
     "desc:'Balanced Approach: kicks the extra point most of the time, goes for 2 in situations where the numbers say to, and goes for it on 4th & short when in opponent territory.'}", 1),
    ("aggressive aggressiveness rewritten",
     "desc:'Goes for 2 early and often, and goes for it on 4th down instead of kicking. More 2-Pt Convs, more touchdowns, fewer field goals, and a few more failed 4th downs.'}",
     "desc:'More 2-Pt Conversions, more touchdowns, fewer field goals, and a few more failed 4th downs. Almost always goes for 2 unless you need an XP to win, and almost always goes for it on 4th down unless behind your own 30 or holding a big 4th-quarter lead.'}", 1),
    ("2-Pt Conversion panel",
     "<details class=\"zpb-dd\"><summary>How a 2-Pt Conv works</summary>",
     "<details class=\"zpb-dd\" style=\"font-size:0.86rem;\"><summary>How a 2-Pt Conversion works</summary>", 1),
    ("model tries + strongest/shakiest cards",
     "   <p class=\"narr\" style=\"margin:0 0 8px;\">The computer tried all 15 ways to play and kept the one that wins the most with your team. Your strongest parts are ${shortUnit(best[0])} (#${rk[best[0]]}) and ${shortUnit(best[1])} (#${rk[best[1]]}); the shaky part is ${shortUnit(worst)} (#${rk[worst]}).</p>",
     "   <p class=\"narr\" style=\"margin:0 0 8px;\">The model tries all 15 ways to play and keeps the one that wins the most with your team.</p>\n   <div style=\"display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 8px;\"><div class=\"zpb-optcard\"><b>Strongest</b><i>${shortUnit(best[0])}</i><span>#${rk[best[0]]} in the league</span></div><div class=\"zpb-optcard\"><b>Shakiest</b><i>${shortUnit(worst)}</i><span>#${rk[worst]} in the league</span></div></div>", 1),
    ("flexing explainer to the bottom row",
     "  <details style=\"margin-bottom:8px;\"><summary style=\"cursor:pointer;font-weight:700;\">New to flexing? Read this first</summary><div style=\"margin-top:8px;\">${flexExplainHTML()}</div></details>\n  ${lineupEditorHTML(roster, 'lineupPre')}</div>`;",
     "  ${lineupEditorHTML(roster, 'lineupPre')}\n  <div class=\"zpb-flexfoot\"><details><summary style=\"cursor:pointer;font-weight:700;\">New to flexing? Read this first</summary><div style=\"margin-top:8px;\">${flexExplainHTML()}</div></details></div></div>`;", 1),
    ("preseason philosophy: base toggle host",
     "<h3 style=\"margin-top:0;\">2. Coaching philosophy</h3>",
     "<h3 style=\"margin-top:0;\">2. Coaching philosophy</h3>\n  <div id=\"zpbBaseToggleHost2\" style=\"margin:6px 0 2px;\"></div>", 1),
    # -- Engine: FB + Punter, flex matrix, 3-4, ratings hook --
    ("FB + P added to the draft",
     "const ROSTER_SLOTS = ['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','OT1','OT2','OG1','OG2','C','DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS','K'];",
     "const ROSTER_SLOTS = ['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','FB','OT1','OT2','OG1','OG2','C','DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS','K','P'];", 1),
    ("natural slots: FB for backs, P for kickers",
     " HB:['RB1','RB2'],", " HB:['RB1','RB2','FB'],", 1),
    ("natural slots: P + FB entries",
     " K:['K']\n};", " K:['K'], P:['P'], FB:['FB']\n};", 1),
    ("flex matrix: OLB family (Owner rules)",
     "const LB_FLEX = {DE:6, DT:4, CB3:4, SS:4, FS:4, TE:6, RB:6};",
     "const LB_FLEX = {DE:6, DT:4, CB3:4, SS:2, FS:4, TE:6, RB:6}; // MIKE: DT -4, SS -2 (Owner)\nconst OLB_FLEX = {DE:2, DT:4, CB3:2, SS:4, FS:6, TE:6, RB:6}; // Owner: OLB/WILL/SAM -> edge -2, DT/SS -4, FS -6, Nickel -2", 1),
    ("flex matrix rebuilt (Owner rules)",
     """const FLEX = {
 LT:{OG:0, C:0, DT:4}, RT:{OG:0, C:0, DT:4},            // a tackle plays any line spot for free
 LG:{C:0, OT:4, DT:4}, RG:{C:0, OT:4, DT:4}, C:{OG:0, OT:4, DT:4},   // interior line: guard<->center free, to tackle -4
 DT:{DE:4, MIKE:4, WILL:4, SAM:4, OG:4, C:4, OT:6, RB:6},
 REDG:{DT:2, MIKE:4, WILL:2, SAM:2, TE:6, RB:6}, LEDG:{DT:2, MIKE:4, WILL:2, SAM:2, TE:6, RB:6},
 MIKE:LB_FLEX, WILL:LB_FLEX, SAM:LB_FLEX,
 CB:{SS:2, FS:0, MIKE:4, WILL:4, SAM:4, WR:4, TE:6, RB:6},
 SS:{FS:2, CB:4, MIKE:4, WILL:4, SAM:2, WR:4, TE:6, RB:6},
 FS:{SS:2, CB:4, MIKE:4, WILL:4, SAM:4, WR:4, TE:6, RB:6},
 WR:{TE:4, SS:4, FS:4, CB:4, RB:6},
 TE:{MIKE:6, WILL:6, SAM:6, SS:6, FS:6, RB:6},
 HB:{TE:6}, QB:{}, K:{}
};""",
     """const FLEX = {
 LT:{OG:0, C:0, DT:4, RB:6}, RT:{OG:0, C:0, DT:4, RB:6},   // a tackle plays any line spot free; OL->RB -6 (Owner)
 LG:{C:0, OT:4, DT:4, RB:6}, RG:{C:0, OT:4, DT:4, RB:6}, C:{OG:0, OT:4, DT:4, RB:6},
 DT:{DE:4, MIKE:4, WILL:4, SAM:4, OG:4, C:4, OT:6, RB:6},
 REDG:{DT:2, MIKE:4, WILL:0, SAM:0, TE:6, RB:6}, LEDG:{DT:2, MIKE:4, WILL:0, SAM:0, TE:6, RB:6}, // edges play OLB free (Owner)
 MIKE:LB_FLEX, WILL:OLB_FLEX, SAM:OLB_FLEX,
 CB:{SS:2, FS:0, MIKE:6, WILL:4, SAM:4, WR:4, TE:6, RB:6},  // CB->MIKE -6 (Owner)
 SS:{FS:2, CB:4, CB3:0, MIKE:4, WILL:2, SAM:2, WR:4, TE:6, RB:6}, // SS -> Nickel free (Owner)
 FS:{SS:2, CB:4, MIKE:4, WILL:4, SAM:4, WR:4, TE:6, RB:6},
 WR:{TE:4, SS:4, FS:4, CB:4, RB:6},
 TE:{WR:2, RB:4, MIKE:6, WILL:6, SAM:6, SS:6, FS:6}, // TE -> WR -2, RB -4 (Owner)
 HB:{TE:6}, FB:{}, QB:{RB:6, WR:6}, K:{P:0}, P:{K:0}  // QB/OL -> RB -6, QB -> WR -6, K<->P free (Owner)
};""", 1),
    ("teamRatings consults the 3-4 adjustment",
     " for(const k in RATING_SPECS) r[k] = wavgSlots(slotmap, RATING_SPECS[k]);",
     " for(const k in RATING_SPECS) r[k] = wavgSlots(slotmap, zpbAdjSpec(k, RATING_SPECS[k]));", 1),
    ("3-4 natural slots for linebackers",
     "function isNaturalSlot(pos, slot){ const nat = NATURAL_SLOT_MAP[pos]; return !!(nat && nat.includes(slot)); }",
     "function isNaturalSlot(pos, slot){ if(typeof window!=='undefined' && window.ZPB34 && (pos==='MIKE'||pos==='WILL'||pos==='SAM') && slot==='DT2') return true; const nat = NATURAL_SLOT_MAP[pos]; return !!(nat && nat.includes(slot)); }", 1),
    ("depth chart groups: FB on offense, Punter on special teams",
     " ['Offense', 'off', ['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','OT1','OG1','C','OG2','OT2']],",
     " ['Offense', 'off', ['QB','RB1','RB2','FB','WR1','WR2','WR3','TE1','TE2','OT1','OG1','C','OG2','OT2']],", 1),
    ("depth chart groups: punter",
     " ['Special Teams', 'st', ['K']]", " ['Special Teams', 'st', ['K','P']]", 1),
    ("wv slot groups: FB with backs, Punter with kickers",
     "TE2:'TE',K:'K'};", "TE2:'TE',K:'K',FB:'RB',P:'K'};", 2),
    ("roster head: base toggle host + one-line header",
     "<span><button class=\"tabbtn\" id=\"rosterPickBtn\" style=\"padding:4px 9px;font-size:0.74rem;\">Pick order</button><button class=\"tabbtn active\" id=\"rosterDepthBtn\" style=\"padding:4px 9px;font-size:0.74rem;\">Depth chart</button></span>",
     "<span class=\"zpb-rheadbtns\"><span id=\"zpbBaseToggleHost\"></span><button class=\"tabbtn\" id=\"rosterPickBtn\" style=\"padding:4px 9px;font-size:0.74rem;\">Pick order</button><button class=\"tabbtn active\" id=\"rosterDepthBtn\" style=\"padding:4px 9px;font-size:0.74rem;\">Depth chart</button></span>", 1),
    # -- LABELS + GROUP_DEFS: Nickel / SAM (hover gives the full name) --
    ("label CB3/Nickel -> Nickel", "CB3 / Nickel", "Nickel", 2),
    ("label LB3/SAM -> SAM", "LB3 / SAM", "SAM", 2),
    ]

    removed = []
    for label, old, new, cnt in EXACT:
        found = html.count(old)
        if found != cnt:
            raise SystemExit(f"ABORT: [v10] {label}: expected {cnt} occurrence(s), found {found}")
        html = html.replace(old, new)
        removed.append(old)
        print(f"[ok] [v10] {label}")

    # ---------------- python-side patches ----------------
    # 1) 2-Pt Convs -> 2-Pt Conversions (everywhere)
    n = html.count("2-Pt Convs")
    html = html.replace("2-Pt Convs", "2-Pt Conversions")
    removed.append("2-Pt Convs")
    print(f"[ok] [v10] 2-Pt Convs -> 2-Pt Conversions ({n})")

    # 2) scriptLocked: never locks again (Owner: philosophy editable all season)
    html, n1 = _re.subn(r"(\.scriptLocked\s*=\s*)true", r"\1false", html)
    print(f"[ok] [v10] scriptLocked assignments unlocked: {n1}")
    html, n2 = _re.subn(r"\$\{S\.scriptLocked\?'disabled':''\}", "", html)
    print(f"[ok] [v10] scriptLocked selects enabled: {n2}")
    if n1 < 2 or n2 < 1:
        raise SystemExit(f"ABORT: [v10] scriptLock unexpected counts: assign={n1} selects={n2}")

    # 3) draft search placeholder
    html, n3 = _re.subn(r'(<input id="draftSearch2"[^>]*placeholder=")[^"]*(")', r'\g<1>Search\g<2>', html)
    if n3 != 1:
        raise SystemExit(f"ABORT: [v10] draftSearch2 placeholder patches: {n3}")
    print("[ok] [v10] search placeholder -> Search")

    # 4) GROUP_DEFS: FB + Punter rows appended (Specialists)
    gs = html.index("const GROUP_DEFS = ")
    ge = html.index("];", gs)
    blob = html[gs:ge+2]
    gd = __import__("json").loads(blob[len("const GROUP_DEFS = "):-1])
    keys = {e["key"] for e in gd}
    for extra in ({"key":"FB","label":"FB","pos":["FB"],"n":1,"rankIndex":0,"cat":"Specialists"},
                  {"key":"P","label":"P","pos":["P"],"n":1,"rankIndex":1,"cat":"Specialists"}):
        if extra["key"] not in keys:
            gd.append(extra)
    html = html[:gs] + "const GROUP_DEFS = " + __import__("json").dumps(gd, ensure_ascii=False, separators=(",",":")) + ";" + html[ge+2:]
    print(f"[ok] [v10] GROUP_DEFS now {len(gd)} groups (FB + P added)")
    removed.append(blob)

    # 5) the "label stays the same" sentence: keep the philosophy instance,
    #    drop any second instance in the game-plan panel
    lab = "The label stays the same all season because it describes your usual approach — the plan used in a given game can differ when a matchup calls for it, and the recaps say when it does."
    c = html.count(lab)
    if c >= 1:
        html = html.replace(" " + lab, "", c - 1) if c > 1 else html
        if c > 1:
            removed.append(" " + lab)
        print(f"[ok] [v10] 'label stays the same' instances: {c} (kept {1 if c else 0})")

    return html, EXACT, removed
