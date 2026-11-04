#!/usr/bin/env python3
"""Z-post-blue WAVE 15 build module — Owner round 9 (26 Oct).
P0: the draft could go silently dead in the Owner's browser (kickoff stall / thrown render /
team-filter dead-end). Fix = defense in depth: wave-14 cinematic gate restored (CPU starts at
the DRAFT fade), watchdog, surfaced+retried errors, per-panel guards, minimal fallback board.
(Team-filter auto-clear is already present in the w14-root build — verified by postcheck.)
Plus the round-9 UI directives: ALL/NONE beside KICKER (uppercase, left flow), shimmering
team name by the logo, VS. ACTUAL NFL tab gated to the pre-season post-draft page, Your Roster
tab reorder, X · pos · OVR (−beta) lineup menus, OVR replaces Wins, KR/PR rows unified,
"0 wins" badge removed, group-scores caption removed, flex-brought-down group scores tinted,
returner explainer removed, smaller "CAN YOU GO", "How bold are you", two explainer sentences
removed. UI only — sim math untouched."""

import sys, hashlib

SRC = '/home/z/my-project/root_w14.html'
OUT = '/home/z/my-project/build_w15.html'

html = open(SRC, encoding='utf-8').read()
orig_len = len(html)
fails = []

def rep(label, old, new, cnt=1):
    global html
    n = html.count(old)
    if n != cnt:
        fails.append(f'{label}: found {n}x, expected {cnt}')
        return
    html = html.replace(old, new)

def span_replace(label, start_anchor, end_anchor, new, keep_end=True):
    """Replace [start_anchor .. end_anchor) or (.. end_anchor] with `new`. Both anchors must be unique."""
    global html
    i = html.find(start_anchor)
    if i < 0 or html.find(start_anchor, i + 1) >= 0:
        fails.append(f'{label}: start anchor not unique'); return
    j = html.find(end_anchor, i + len(start_anchor))
    if j < 0 or html.find(end_anchor, j + 1) >= 0:
        fails.append(f'{label}: end anchor not unique after start'); return
    html = html[:i] + new + (html[j:] if keep_end else html[j + len(end_anchor):])

# ============ A. P0: the draft cannot die ============

# A1. CSS: restore the wave-14 stacked cinematic states (the w14 root still carried the old W13 trio CSS)
rep('A1 cine CSS -> wave-14 stacked trio states',
""".zpb-fin.zpb-fin-welcome p{position:absolute;font-size:clamp(1.4rem,4vw,2.4rem);}
.zpb-fin.zpb-fin-welcome p:nth-child(1){transform:translateY(-9vh);}
.zpb-fin.zpb-fin-welcome p:nth-child(3){transform:translateY(9vh);}""",
""".zpb-fin.zpb-fin-welcome p{position:absolute;left:0;right:0;font-size:clamp(1.4rem,4vw,2.4rem);opacity:0;transform:translateY(0);transition:opacity 1.1s ease,transform 2.6s cubic-bezier(.22,.61,.36,1);}
.zpb-fin.zpb-fin-welcome p.zpb-fin-in{opacity:1;}
.zpb-fin.zpb-fin-welcome p:nth-child(1){transform:translateY(-2em);}
.zpb-fin.zpb-fin-welcome p:nth-child(3){transform:translateY(2em);}
.zpb-fin.zpb-fin-welcome.zpb-wt-out p:nth-child(1),.zpb-fin.zpb-fin-welcome.zpb-wt-out p:nth-child(2){opacity:0;transition-duration:1.5s,2.6s;}
.zpb-fin.zpb-fin-welcome p.zpb-draft-center{transform:translateY(0);}
.zpb-fin.zpb-fin-welcome p.zpb-draft-fade{opacity:0;transition-duration:1.7s,2.6s;}
.zpb-fin.zpb-fin-welcome.zpb-fin-fadebg{opacity:0;transition:opacity 1.7s ease;}""")

# A2. CSS: ALL/NONE chips flow inline (left, next to the KICKER chip) instead of a centered own row
rep('A2 allnone CSS -> display:contents',
    '.zpb-allnone{flex-basis:100%;display:flex;justify-content:center;gap:6px;margin-top:2px;}',
    '.zpb-allnone{display:contents;}')

# A3. CSS: v15 additions (banner name, smaller CAN YOU GO)
rep('A3 v15 CSS block appended after v14 block',
    '/* ============ end v14 ============ */',
    """/* ============ end v14 ============ */
/* ============ v15: Owner round 9 ============ */
.zpb-das-name{font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif;font-size:1.02rem;letter-spacing:.06em;}
.zpb-cygline .zpb-cygt{font-size:.72em;letter-spacing:.1em;}
.dsub .zpb-cyg{font-size:.72em;}
/* ============ end v15 ============ */""")

# A4. JS: the wave-14 welcome cine (done-callback) replaces the old W13 sequential cine; tap still skips.
#     Old text is taken from the product by unique anchors — no literal drift possible.
NEW_CINE = """// W14-1 (restored) + W15: WELCOME / TO THE / DRAFT stacked dead center; 'welcome to the' fades out
// together, DRAFT rises slowly to the center, and done() — the CPU kickoff — fires the instant DRAFT
// begins to fade. A tap anywhere skips (fast fade, immediate kickoff). Fallbacks: reduced motion or
// a repeat call fire done() right away, so the draft can never be left waiting on the cinematic.
window.zpbWelcomeCine = function(done){
 const fire = ()=>{ setTimeout(()=>{ try{ if(typeof done==='function') done(); }catch(err){} }, 0); };
 if(window._zpbWelDone){ fire(); return; } window._zpbWelDone = true;
 if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){ fire(); return; }
 if(typeof window._zpbWelCleanup==='function') window._zpbWelCleanup();
 const ov = document.createElement('div'); ov.className = 'zpb-fin zpb-fin-welcome';
 ['WELCOME','TO THE','DRAFT'].forEach(t=>{ const p = document.createElement('p'); p.innerHTML = t; ov.appendChild(p); });
 document.body.appendChild(ov);
 const ps = [...ov.querySelectorAll('p')], timers = [];
 const at = (ms, fn)=>{ timers.push(setTimeout(fn, ms)); };
 window._zpbWelCleanup = ()=>{ timers.forEach(clearTimeout); window._zpbWelCleanup = null; try{ ov.remove(); }catch(err){} };
 const beginFade = (fast)=>{
  if(ov.dataset.fading) return; ov.dataset.fading = '1';
  fire(); // the CPU draft starts exactly when DRAFT begins to fade — never behind the cinematic
  try{ ps[2].classList.add('zpb-draft-fade'); ov.classList.add('zpb-fin-fadebg'); }catch(err){}
  if(fast){ ov.style.transition = 'opacity .45s ease'; setTimeout(()=>{ try{ ov.remove(); }catch(err){} }, 480); }
 };
 ov.addEventListener('pointerdown', ()=>{ try{ ps.forEach(p=>p.classList.add('zpb-fin-in')); }catch(err){} beginFade(true); });
 at(100,  ()=>ps[0].classList.add('zpb-fin-in'));        // WELCOME
 at(450,  ()=>ps[1].classList.add('zpb-fin-in'));        // TO THE
 at(800,  ()=>ps[2].classList.add('zpb-fin-in'));        // DRAFT
 at(3400, ()=>{ try{ ov.classList.add('zpb-wt-out'); }catch(err){} });   // 'welcome to the' fades out together
 at(4100, ()=>{ try{ ps[2].classList.add('zpb-draft-center'); }catch(err){} }); // DRAFT rises slowly to the center
 at(7400, ()=>beginFade(false));                         // DRAFT starts to fade — the CPU draft may begin
 at(9300, ()=>{ try{ ov.remove(); }catch(err){} window._zpbWelCleanup = null; });
};
// (the old sequential cine was retired in wave 15)
"""
span_replace('A4 zpbWelcomeCine -> wave-14 done-based version',
             'window.zpbWelcomeCine = function(){',
             '// W15-2: WHERE THEY LINE UP',
             NEW_CINE, keep_end=True)

# A5. JS: startDraft2 top — the cine call moves to the gate at the bottom
rep('A5 startDraft2 top: latch reset only',
    " window._zpbWelDone = false; try{ if(typeof zpbWelcomeCine==='function') zpbWelcomeCine(); }catch(err){}\n",
    ' window._zpbWelDone = false; window._zpbKickStarted = false; // W15: kickoff wiring lives at the end of startDraft2\n')

# A6. JS: startDraft2 bottom — guarded first render + wave-14 gate + watchdog + recover helpers.
#     Span: from the gate comment through the line before "function userIsStuck".
NEW_GATE = """ // W15: the first board render is guarded — a throwing render can never leave a dead draft
 try{ renderDraftLive(); }catch(e){ try{ zpbFallbackBoard(e); }catch(e2){} }
 // W14 gate (restored) + W15 self-healing: the CPU draft starts exactly when DRAFT begins to fade —
 // and a watchdog guarantees it can never silently stall (throttled timers, stuck overlay, thrown render)
 const zpbKick = ()=>{ if(window._zpbKickStarted) return; window._zpbKickStarted = true; zpbStopDraftWatchdog(); try{ processUntilUserTurn(); }catch(err){ zpbDraftRecover(err); } };
 window._zpbWelFade = zpbKick;
 try{ if(typeof zpbWelcomeCine==='function') zpbWelcomeCine(zpbKick); else zpbKick(); }catch(err){ zpbKick(); }
 zpbStartDraftWatchdog();
}
// W15: the draft can never go dead — watchdog + surfaced recovery + minimal fallback board
function zpbStartDraftWatchdog(){
 zpbStopDraftWatchdog();
 const t0 = Date.now(); let ticks = 0;
 window._zpbDW = setInterval(()=>{
  ticks++;
  try{
   if(window._zpbKickStarted || typeof draftSim==='undefined' || !draftSim){ zpbStopDraftWatchdog(); return; }
   const cine = document.querySelector('.zpb-fin-welcome');
   if(cine){ if(Date.now()-t0 > 25000){ try{ cine.remove(); }catch(e){} } else return; } // a stuck cinematic is force-closed after 25 s
   if(ticks < 2) return; // give the normal gate a beat before stepping in
   if(draftSim.pos===0 && !draftSim.log.length && !draftSim.awaitingUser){
    window._zpbKickStarted = true; zpbStopDraftWatchdog();
    try{ processUntilUserTurn(); }catch(err){ zpbDraftRecover(err); }
   } else zpbStopDraftWatchdog();
  }catch(e){ zpbStopDraftWatchdog(); }
 }, 1500);
}
function zpbStopDraftWatchdog(){ if(window._zpbDW){ clearInterval(window._zpbDW); window._zpbDW = null; } }
function zpbDraftRecover(err){
 try{ console.warn('Z-post-blue draft auto-recover:', err); }catch(e){}
 try{ const feed = document.getElementById('draftRecentPicks'); if(feed && !feed.children.length) feed.innerHTML = '<div class="narr">The draft engine hiccuped once and recovered — the board below is live.</div>'; }catch(e){}
 try{ processUntilUserTurn(); }catch(e2){ try{ renderDraftLive(); }catch(e3){ try{ zpbFallbackBoard(e2); }catch(e4){} } }
}
function zpbFallbackBoard(err){
 try{
  const S = draftSim; if(!S) return;
  const roster = S.rosters[S.userIndex];
  const rows = S.pool.slice(0,60).map(p=>{
   const slot = findAssignableSlot(roster, p[1]);
   const btn = slot ? `<button class="resetbtn" style="width:auto;margin:0;padding:3px 9px;font-size:0.75rem;" data-pick="${p[0].replace(/"/g,'&quot;')}" data-slot="${slot}">Draft</button>` : '';
   return `<tr class="zpb-trow" style="${typeof zpbRowVars==='function'?zpbRowVars(p[2]):''}"><td class="dc-name">${p[0]}</td><td data-label="Pos">${POS_DISPLAY[p[1]]||p[1]}</td><td data-label="Team">${TEAM_ABBR[p[2]]||p[2]}</td><td class="score dc-ovr" data-label="OVR">${p[3]}</td><td class="narr" colspan="4">${slot?('Fills '+(LABELS[slot]||slot)):''}</td><td class="dc-btn">${btn}</td></tr>`;
  }).join('');
  document.getElementById('draftBody2').innerHTML = rows || '<tr><td colspan="10" class="narr">No players match.</td></tr>';
 }catch(e){}
}
"""
span_replace('A6 startDraft2 gate + self-healing helpers',
             ' // the CPU draft starts exactly when "DRAFT" begins fading off the screen',
             'function userIsStuck(){',
             NEW_GATE, keep_end=True)

# A7. JS: renderDraftLive — board and roster renders are individually guarded
rep('A7 renderDraftLive: guarded panel renders',
""" renderDraftBoard2();
 renderDraftRoster2();
}""",
""" try{ renderDraftBoard2(); }catch(err){ try{ zpbFallbackBoard(err); }catch(e2){} }
 try{ renderDraftRoster2(); }catch(err){}
}""")

# A8: team-filter auto-clear is ALREADY in the w14-root build (staged P0-1 patch) — verified by postcheck

# A9. JS: stepSlow — a throwing pick never freezes the draft; renders are guarded; the tick always continues
rep('A9 stepSlow: per-tick resilience',
"""function stepSlow(){
 if(draftSim.pos >= draftSim.order.length){ draftSim.awaitingUser=false; finishDraft2(); return; }
 const t = draftSim.order[draftSim.pos];
 if(t === draftSim.userIndex){
  const roster = draftSim.rosters[t];
  if(firstOpenSlotAny(roster)===null){ draftSim.pos++; slowTimer = setTimeout(stepSlow, 750); return; }
  if(userIsStuck()){ finishDraft2(); return; }
  draftSim.awaitingUser = true;
  renderDraftLive();
  return;
 }
 draftSim.awaitingUser = false;
 const pk = cpuPick(t);
 if(pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++;
 renderDraftLive();
 slowTimer = setTimeout(stepSlow, 750);
}""",
"""function stepSlow(){
 try{
  if(draftSim.pos >= draftSim.order.length){ draftSim.awaitingUser=false; finishDraft2(); return; }
  const t = draftSim.order[draftSim.pos];
  if(t === draftSim.userIndex){
   const roster = draftSim.rosters[t];
   if(firstOpenSlotAny(roster)===null){ draftSim.pos++; slowTimer = setTimeout(stepSlow, 750); return; }
   if(userIsStuck()){ finishDraft2(); return; }
   draftSim.awaitingUser = true;
   renderDraftLive();
   return;
  }
  draftSim.awaitingUser = false;
  const pk = cpuPick(t);
  if(pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++;
  draftSim._errs = 0;
 }catch(err){
  draftSim._errs = (draftSim._errs||0)+1;
  try{ console.warn('draft tick error', err); }catch(e){}
  if(draftSim._errs >= 3) draftSim.pos++; // one bad pick never freezes the whole draft
 }
 try{ renderDraftLive(); }catch(err){ try{ zpbFallbackBoard(err); }catch(e2){} }
 slowTimer = setTimeout(stepSlow, 750);
}""")

# ============ B. Draft screen directives ============

# B1. shimmering team name next to the logo at the top of the draft screen
rep('B1 banner: shimmering team name by the logo',
"""`<div class="zpb-das-logo">${typeof zpbTeamLogo==='function'&&zpbTeamLogo(userTeamName)?zpbTeamLogo(userTeamName):abbr}</div><span class="zpb-nextpick" id="zpbNextPick" title="Your next pick: (round.pick)"></span>`;""",
"""`<div class="zpb-das-logo">${typeof zpbTeamLogo==='function'&&zpbTeamLogo(userTeamName)?zpbTeamLogo(userTeamName):abbr}</div><b class="zpb-shine zpb-das-name">${userTeamName}</b><span class="zpb-nextpick" id="zpbNextPick" title="Your next pick: (round.pick)"></span>`;""")

# B2. ALL / NONE: same font and case as the other chips, inline right after the KICKER chip, left flow
rep('B2 chips: ALL / NONE uppercase inline',
    """ ch += `<span class="zpb-allnone"><span class="chip" data-all="1"><span>all</span></span><span class="chip" data-none="1"><span>none</span></span></span></div>""",
    """ ch += `<span class="zpb-allnone"><span class="chip" data-all="1"><span>ALL</span></span><span class="chip" data-none="1"><span>NONE</span></span></span></div>""")

# B3. VS. ACTUAL NFL TEAMS: visible only on the post-draft page before the season starts
rep('B3 results tabs: VS-NFL gated to pre-season',
    """   <button class="tabbtn ${resultsView==='nfl'?'active':''}" id="resultsNflBtn">VS. ACTUAL NFL TEAMS</button>\n""",
    """   ${seasonState?'':`<button class="tabbtn ${resultsView==='nfl'?'active':''}" id="resultsNflBtn">VS. ACTUAL NFL TEAMS</button>`}\n""")
rep('B3b results listener guarded',
    """ document.getElementById('resultsNflBtn').addEventListener('click', ()=>{ resultsView='nfl'; renderDraftResults(); });""",
    """ { const _nb = document.getElementById('resultsNflBtn'); if(_nb) _nb.addEventListener('click', ()=>{ resultsView='nfl'; renderDraftResults(); }); }""")

# ============ C. Your Roster tab ============

# C1. reorder: lineup selector -> full depth chart -> draft ranking; flex-penalty sentence trimmed.
#     Old template extracted verbatim from the product (whitespace-proof).
i = html.find('function renderYourRosterTab(container, myEntry, rankAmongReal){')
k2 = html.find('container.innerHTML = `', i)
k3 = html.find('`;', k2)
old_tpl = html[k2:k3+2]
if i < 0 or k2 < 0 or 'Overall Grade' not in old_tpl or 'lineupHost' not in old_tpl:
    fails.append('C1: roster-tab template anchors not found')
else:
    new_tpl = """container.innerHTML = `
  <div class="panel" style="margin-bottom:14px;">
   <h4 style="margin-top:0;">Lineup &amp; flex</h4>
   <p class="narr" style="margin-top:0;">Pick who plays where. Players can flex to any spot their position allows.</p>
   <div id="lineupHost"></div>
  </div>
  <div class="panel" style="margin-bottom:14px;">
   <h4 style="margin-top:0;">Your Full Depth Chart (depth-chart order)</h4>
   ${renderDepthChartHTML(myEntry.slotmap, myEntry.pickRounds, myEntry.teamName)}
  </div>
  <div class="panel" style="margin-bottom:14px;">
   <h3 style="margin-top:0;">Overall Grade <span style="color:var(--accent);">${letterGrade(overallPct)}</span></h3>
   <table><thead><tr><th>Slot</th><th>Player</th><th>Effective OVR</th><th>Drafted</th><th>League Rank</th><th>Grade</th></tr></thead><tbody>${slotRows}</tbody></table>
  </div>
 `;"""
    html = html[:k2] + new_tpl + html[k3+2:]

# C3. lineup menus: "X · pos · OVR (−beta)" — beta only when the player has to flex
rep('C3 lineup option format',
    """>${p[0]} — ${POS_DISPLAY[p[1]]||p[1]} ${p[3]}${fp?` (flex −${fp} = ${p[3]-fp})`:''}</option>`;""",
    """>${p[0]} · ${POS_DISPLAY[p[1]]||p[1]} · ${p[3]-fp}${fp?` (−${fp})`:''}</option>`;""")

# C4. the number on the right of each lineup panel is the player's flex-adjusted OVR (Wins retired here)
rep('C4 dwar -> flex-adjusted OVR',
    """<span class="dwar">${cur?fmtWar(winsAt(cur, sl)):''}</span></div>`;""",
    """<span class="dwar">${cur?effOvr(cur, sl):''}</span></div>`;""")

# C5. the "0 wins" badge is gone completely
rep('C5 0-wins badge removed',
    """ if(adv.gain<0.02){ h += `<div class="zpb-optwins"><b>${Math.round(Math.max(0,adv.gain))} wins</b><span>of optimal</span></div>`; return h; }""",
    """ if(adv.gain<0.02){ return ''; } // W15: the "0 wins" badge is gone (Owner)""")

# C6. KR / PR rows: same shape, size and coloring as every other row in the lineup panels;
#     the "How is the returner chosen?" dropdown is removed with it (Owner).
i = html.find(' return `<div style="margin-top:12px;padding-top:8px;"><div class="zpb-retrow">')
j = html.find('</details></div>`;', i)
if i < 0 or j < 0:
    fails.append('C6: KR row span not found')
else:
    html = html[:i] + """ return `<div class="depth-row lgrid"><span class="slotname" title="Kick Returner">KR</span><select data-returner="1" style="width:100%;min-width:0;background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:3px 6px;font-size:0.78rem;">${cands.map(c=>`<option value="${c.p[0].replace(/"/g,'&quot;')}" ${c.p[0]===cur?'selected':''}>${c.p[0]} — ${POS_DISPLAY[c.p[1]]||c.p[1]} ${c.p[3]}, score ${returnerRating(c.p).toFixed(1)}</option>`).join('')}</select><span class="dwar"></span></div>`;""" + html[j + len('</details></div>`;'):]

rep('C6b PR row -> depth-row shape, same select size',
""" row.className = 'zpb-retrow';
 row.innerHTML = `<span class="slotname" data-zslot="PR" title="Punt Returner">PR</span>`
   + `<select data-returner-pr="1" style="width:100%;min-width:0;background:var(--panel2);border:1px solid var(--border);border-radius:8px;padding:6px 8px;color:var(--text);">`""",
""" row.className = 'depth-row lgrid';
 row.innerHTML = `<span class="slotname" title="Punt Returner">PR</span>`
   + `<select data-returner-pr="1" style="width:100%;min-width:0;background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:3px 6px;font-size:0.78rem;">`""")

# C7. group scores: caption line gone; a group brought down by a flexed player tints its number wine
rep('C7 group scores: flex tint',
    """ const v = wt ? sum/wt : 0, prev = _lineupPrev[hostId+name], d = prev==null ? 0 : v-prev;
  _lineupPrev[hostId+name] = v;
  return `<div style="flex:1;min-width:120px;text-align:center;"><div style="font-size:1.3rem;font-weight:800;">${v.toFixed(1)}""",
    """ const v = wt ? sum/wt : 0, prev = _lineupPrev[hostId+name], d = prev==null ? 0 : v-prev;
  _lineupPrev[hostId+name] = v;
  const flexed = slots.some(sl=>{ const q = roster.slots[sl]; return q && isOutOfPosition(q[1], sl); }); // W15: tint when flexes drag the score down
  return `<div style="flex:1;min-width:120px;text-align:center;"><div style="font-size:1.3rem;font-weight:800;${flexed?'color:var(--rose,var(--accent2));':''}">${v.toFixed(1)}""")
rep('C7b group scores: caption removed',
    """ return `<div class="narr" style="margin:6px 0 2px;"><b>Group scores</b> (flex penalties included)</div><div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">${cells}</div>`;""",
    """ return `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">${cells}</div>`; // W15: caption removed (Owner)""")

# ============ D. Guide + reminder texts ============

# D1. "CAN YOU GO" smaller in the flashing reminders (the 20-0 keeps its shimmer size)
rep('D1 cygline wrap (both instances)',
    """<p class="zpb-cygline">Can you go <b class="zpb-shine">20-0</b><b class="zpb-shine" style="font-size:1.1em;">?</b></p>""",
    """<p class="zpb-cygline"><span class="zpb-cygt">Can you go </span><b class="zpb-shine">20-0</b><b class="zpb-shine" style="font-size:1.1em;">?</b></p>""", 2)

# D2. boldness line: "How bold are you…", explainer sentence removed
#     (in-template text swap only — the template literal continues onto the next line)
rep('D2 bold coach -> how bold are you',
    """How bold is your coach on <b>2-Pt Conversions</b> and <b>4th downs</b>? This changes <i>how</i> your team scores, not how many points it is worth: the real-world numbers say a bold coach and a careful one come out about even, so the sim treats them as roughly equal and the difference shows up in the box score and in game-to-game swings.""",
    """How bold are you on <b>2-Pt Conversions</b> and <b>4th downs</b>?""")

# ============ post-checks ============
checks = [
    ('cine stacked string', "['WELCOME','TO THE','DRAFT']" in html),
    ('old cine string gone', "'WELCOME', 'TO THE DRAFT'" not in html and 'zpbWelcomeCine_DEAD' not in html),
    ('watchdog present', html.count('function zpbStartDraftWatchdog') == 1 and html.count(' zpbStartDraftWatchdog();') == 1),
    ('recover present', html.count('function zpbDraftRecover') == 1),
    ('fallback board present', html.count('function zpbFallbackBoard') == 1),
    ('no silent kick swallow', 'window._zpbWelKicked' not in html),
    ('team-filter auto-clear (staged patch intact)', '!entries.some(r => r.p[2] === draftUI.teamFilter)' in html),
    ('guarded renders', html.count('try{ renderDraftRoster2(); }catch(err){}') == 1),
    ('banner shimmer', 'zpb-shine zpb-das-name' in html),
    ('ALL/NONE uppercase', '<span>ALL</span></span><span class="chip" data-none="1"><span>NONE</span>' in html),
    ('allnone display:contents', '.zpb-allnone{display:contents;}' in html),
    ('vs-nfl gated', "id=\"resultsNflBtn\">VS. ACTUAL NFL TEAMS</button>`}\n" in html),
    ('vs-nfl listener guarded', 'const _nb = document.getElementById(\'resultsNflBtn\')' in html),
    ('roster tab order exact', html.find('id="lineupHost"') < html.find('Your Full Depth Chart') < html.find('Overall Grade <span')),
    ('flex sentence trimmed', 'center\u2194guard' not in html and "CPU teams use the math's lineup." not in html),
    ('lineup menu dot format', ' \u00b7 ${POS_DISPLAY[p[1]]||p[1]} \u00b7 ${p[3]-fp}' in html),
    ('old menu format gone', 'flex \u2212${fp} = ' not in html),
    ('dwar = effOvr', '${cur?effOvr(cur, sl):' in html),
    ('0-wins badge gone', 'zpb-optwins"><b>' not in html),
    ('KR row unified', 'class="zpb-retrow"' not in html and 'title="Kick Returner">KR' in html),
    ('PR row unified', 'title="Punt Returner">PR' in html and 'padding:6px 8px' not in html.split('data-returner-pr')[1][:400]),
    ('returner explainer gone', 'How is the returner chosen?' not in html),
    ('group caption gone', 'flex penalties included)</div>' not in html),
    ('flex tint present', "flexed?'color:var(--rose,var(--accent2));':''}" in html),
    ('cygt wrapped x2', html.count('<span class="zpb-cygt">Can you go </span>') == 2),
    ('bold are you', 'How bold are you on <b>2-Pt Conversions</b>' in html and 'your coach on <b>' not in html),
    ('v15 css present', '.zpb-cygline .zpb-cygt' in html and '.zpb-das-name' in html),
    ('single cine definition', html.count('window.zpbWelcomeCine = function(done)') == 1),
    ('kick gate present', html.count('const zpbKick = ') == 1),
]
for name, cond in checks:
    if not cond:
        fails.append('POSTCHECK: ' + name)

if fails:
    print('BUILD FAILED — unresolved:'); [print('  -', f) for f in fails]; sys.exit(1)

open(OUT, 'w', encoding='utf-8').write(html)
md5 = hashlib.md5(html.encode('utf-8')).hexdigest()
print(f'WAVE 15 BUILD OK · {len(html):,} B (was {orig_len:,}) · md5 {md5}')
print('written:', OUT)
