#!/usr/bin/env python3
# w89 build: patch w88 -> w89 by asserted exact replacements (the zpb_w86/build_w88 pattern).
# The Owner's round-89: 26 verbatim asks (intake ledger INTAKE-W89.md). One base: pristine w88
# (md5 2f7a4654bff000e4b2365e0bd6fd1e3f). Never hand-edit; every anchor must occur exactly once.
import hashlib, sys

SRC = '/home/z/my-project/work/w88.html'
DST = '/home/z/my-project/work/w89.html'

src = open(SRC, encoding='utf-8').read()
s = src
n_ok = 0

def rep(old, new, label, count=1):
    global s, n_ok
    n = s.count(old)
    if n != count:
        print(f'FAIL [{label}]: found {n} occurrences, expected {count}')
        sys.exit(1)
    s = s.replace(old, new)
    n_ok += 1
    print(f'ok   [{label}]')

# ---------- R0 · the wave header ----------
rep("""<!--
WAVE: w88 (the Owner's 2026-11-09 directive, delivered 2026-11-10)""",
"""<!--
WAVE: w89 (the Owner's 2026-11-10 chat — 26 verbatim asks, intake INTAKE-W89.md)
BASE: w88 gh-pages (md5 2f7a4654bff000e4b2365e0bd6fd1e3f · 1,904,952 B)
THIS WAVE: the search menu's default static page is the word SEARCH · the draft board loses the
all-on/all-off subtitles, the "+wins" depth-chart column and both Cinzel badges · the floating
stage banner retires (the full-width rail with the line across the page is the one banner; TRY
AGAIN rides it too) · the season tab cluster docks at the bottom as the side-scrolling second
footer, RUN IT BACK between NEW DRAFT and 100 SEASONS · SIM GAME leaves the champions page ·
the box score gains team-colored vertical lines and loses the dark-mode name bar · the bye
panel shows the most likely divisional matchup · AFC #1 shimmers gold · the round skies wear
the user's team colors + three new during-game dynamics (tide / command / big-play flash) ·
full names on the draft review fade cards · the preseason panel becomes a cinematic and the
page opens on 1. LINEUP · NEW TO LINEUP? · one WHY THIS STYLE? dropdown with WHAT DO THESE
TERMS MEAN? above it · AUTO statics · the second-dropdown glitch fixed (label activation) ·
the two-point try in badges · sentences on their own lines · the preview strip stacks on the
phone · the bye cinematic reads two lines · the Super Bowl win plays only the victory page,
staggered on second delays with the real season in dynamic text · the champions page opens on
a full-width TRY AGAIN bar with SEASON REVIEW below.
-->
<!--
WAVE: w88 (the Owner's 2026-11-09 directive, delivered 2026-11-10)""", 'R0 wave header')

# ---------- §1 · search menu + draft board ----------
rep("""   <div class="count" id="playerCount"></div>
   <table id="playerTable" data-nostack="1">""",
"""   <div class="zpb-searchsplash" id="playerSearchSplash">SEARCH</div>
   <div class="count" id="playerCount"></div>
   <table id="playerTable" data-nostack="1">""", 'R-splash element')

rep("""function renderPlayers(){
 let rows = PLAYERS.filter(p=>{""",
"""function renderPlayers(){
 const _idle = !playerFilters.search && playerFilters.pos.size===0 && !playerFilters.team; // w89 (Owner): the search menu's default static page is just the word SEARCH
 const _spl = document.getElementById('playerSearchSplash');
 if(_spl) _spl.style.display = _idle ? 'flex' : 'none';
 { const _pt = document.getElementById('playerTable'); if(_pt) _pt.style.display = _idle ? 'none' : ''; }
 if(_idle){ document.getElementById('playerCount').textContent = ''; return; }
 let rows = PLAYERS.filter(p=>{""", 'R-splash logic')

rep("""<button type="button" class="zpb-srbtn zpb-srutil" data-all="1" title="Every button on — the full board"><b>ALL</b><i>all on</i></button><button type="button" class="zpb-srbtn zpb-srutil" data-none="1" title="Every button off — the full board (the default)"><b>CLEAR</b><i>all off</i></button>""",
"""<button type="button" class="zpb-srbtn zpb-srutil" data-all="1" title="Every button on — the full board"><b>ALL</b></button><button type="button" class="zpb-srbtn zpb-srutil" data-none="1" title="Every button off — the full board (the default)"><b>CLEAR</b></button>""", 'R-allon-alloff')

rep(""" document.getElementById('draftRosterTotal').innerHTML = n ? `<span class="zpb-rbadge" style="${(typeof zpbRosterBadgeVars==='function')?zpbRosterBadgeVars():''}"><b>${n}</b><i>of ${ROSTER_SLOTS.length} starters</i></span><span class="zpb-rbadge" style="${(typeof zpbRosterBadgeVars==='function')?zpbRosterBadgeVars():''}"><b>${fmtWar(tot)}</b><i>wins above a replacement-level lineup</i></span>` : ''; // w66 (Owner): two team-tinted Cinzel badges, the plaintext sentence retired""",
""" document.getElementById('draftRosterTotal').innerHTML = ''; // w89 (Owner): "of 32 starters" and "wins above a replacement-level lineup" retire from the draft board""", 'R-roster-badges')

rep("""  const war = p ? `<span class="narr" style="margin-left:6px;" title="Wins above a replacement-level player at this slot">${fmtWar(winsAt(p, sl))}</span>` : '';
  return `<div class="depth-row dgrid zpb-trow" style="${p&&typeof zpbNeutralUserRowVars==='function'?zpbNeutralUserRowVars():''}"><span class="slotname">${extra||''}${LABELS[sl]||sl}</span><span class="${p?'playername':'empty'} zpb-gname ${p&&p[3]>=90?'zpb-shm':(p&&p[3]>=85?'zpb-vib':'')}">${p?p[0]:''}</span><span class="dovr">${p?p[3]:''}</span><span class="narr dwar">${p?fmtWar(winsAt(p, sl)):''}</span></div>`; // w19 (Owner): a filled position shimmers""",
"""  return `<div class="depth-row dgrid zpb-trow" style="${p&&typeof zpbNeutralUserRowVars==='function'?zpbNeutralUserRowVars():''}"><span class="slotname">${extra||''}${LABELS[sl]||sl}</span><span class="${p?'playername':'empty'} zpb-gname ${p&&p[3]>=90?'zpb-shm':(p&&p[3]>=85?'zpb-vib':'')}">${p?p[0]:''}</span><span class="dovr">${p?p[3]:''}</span></div>`; // w19 (Owner): a filled position shimmers · w89 (Owner): the "+wins" column retires from the depth chart""", 'R-depth-row')

rep(""".depth-row.dgrid{display:grid;grid-template-columns:3.4em 1fr 2.6em 3.6em;align-items:baseline;}
.dgrid .dovr{text-align:right;font-weight:600;}.dgrid .dwar{text-align:right;margin:0;}""",
""".depth-row.dgrid{display:grid;grid-template-columns:3.4em minmax(0,1fr) 2.6em;align-items:baseline;} /* w89 (Owner): three columns — the wins column retired */
.dgrid .dovr{text-align:right;font-weight:600;}""", 'R-dgrid-base')

rep(""".depth-row.dgrid{grid-template-columns:3em minmax(0,1fr) 2.4em 3.2em;}""",
""".depth-row.dgrid{grid-template-columns:3em minmax(0,1fr) 2.4em;}""", 'R-dgrid-media')

rep("""</span><span class="dovr">${e&&e.name!=null?e.ovr:''}</span><span class="narr dwar"></span></div>`; // w33 (R13, Owner): the D of DIME sits directly unde""",
"""</span><span class="dovr">${e&&e.name!=null?e.ovr:''}</span></div>`; // w33 (R13, Owner): the D of DIME sits directly unde""", 'R-dime-empty-1')

rep("""</span><span class="dovr">${d?d[3]:''}</span><span class="narr dwar"></span></div>`; // w19 (Owner): no box, no dash, no PKG chip · w30 (O""",
"""</span><span class="dovr">${d?d[3]:''}</span></div>`; // w19 (Owner): no box, no dash, no PKG chip · w30 (O""", 'R-dime-empty-2')

# ---------- §2 · banners / tabs / dock ----------
rep(""" function zpbUpdateStageBanner(){
  try{
   if(!bar){""",
""" function zpbUpdateStageBanner(){
  return; // w89 (Owner): the floating stage banner retires — the full-width rail (the banner with the line across the whole page) is the one banner; the champion page's own try-again bar and the rail carry the rest
  try{
   if(!bar){""", 'R-stagebar-stub')

rep("""var IDS = ['startSeasonBtn','simWeekBtn','nextWeekBtn','nextRoundBtn','beginPlayoffsBtn','seasonReviewBtn','beginSeasonBtn','beginSeasonBtn2']; // w63 (Muse P1): the review's START PRESEASON pill rides the rail too""",
"""var IDS = ['startSeasonBtn','simWeekBtn','nextWeekBtn','nextRoundBtn','beginPlayoffsBtn','seasonReviewBtn','beginSeasonBtn','beginSeasonBtn2','zpbTryAgainBtn']; // w63 (Muse P1): the review's START PRESEASON pill rides the rail too · w89 (Owner): the try-again joins it — BEGIN PLAYOFFS and TRY AGAIN both live in the scroll-down header""", 'R-ids-tryagain')

rep(""" // w65 (Owner): SIM GAME joins the tab row (the host fills at render time) and SIM SEASON shows only while the regular season is live — never on the Super Bowl review page
 let h = `<div class="zpb-cygops" style="display:flex;justify-content:flex-start;align-items:center;gap:10px;flex-wrap:wrap;"> <!-- W67 (Owner): ONE left-aligned cluster - the sim doors sit right next to 100 SEASONS, never centered mid-panel --><span class="zpb-draftops" id="zpbDraftOps"><button class="tabbtn" id="newDraftBtn" style="font-size:0.78rem;padding:5px 10px;">NEW DRAFT</button></span><span class="zpb-simtabs" id="zpbSimTabsHost">${seasonState&&seasonState.phase==='regular'?'<button class="tabbtn zpb-ctasmall zpb-simseason" id="simSeasonBtn">SIM SEASON</button>':''}${seasonState&&seasonState.phase==='playoffs'?'<button class="tabbtn zpb-ctasmall" id="simPlayoffsBtnTop">SIM PLAYOFFS</button>':''}</span><span class="zpb-simtabs" id="zpbBtsHost"></span><p class="dsub zpb-cygdsub" style="margin:0 0 0 auto;"><span class="zpb-cyg">Can you go </span><b class="zpb-shine">20-0</b><b class="zpb-shine zpb-cygq">?</b></p></div>
  <div class="tabs" style="margin-bottom:10px;flex-wrap:wrap;">
   <button class="tabbtn ${resultsView==='season'?'active':''}" id="resultsSeasonBtn">SEASON</button>
   ${seasonState?'':`<button class="tabbtn ${resultsView==='nfl'?'active':''}" id="resultsNflBtn">VS. ACTUAL NFL TEAMS</button>`}
   <button class="tabbtn ${resultsView==='mine'?'active':''}" id="resultsMineBtn">YOUR ROSTER</button>
   <button class="tabbtn ${resultsView==='compare'?'active':''}" id="resultsCompareBtn">TEAM COMPARISON</button>
  </div>
  <div id="draftResultsBody"></div>
  `;""",
""" // w65 (Owner): SIM GAME joins the tab row · w89 (Owner): the whole tab cluster leaves the top of the page — it docks at the bottom as the side-scrolling second footer (the footer's own strip treatment), and RUN IT BACK rides it between NEW DRAFT and 100 SEASONS
 let h = `<div class="tabs" style="margin-bottom:10px;flex-wrap:wrap;">
   <button class="tabbtn ${resultsView==='season'?'active':''}" id="resultsSeasonBtn">SEASON</button>
   ${seasonState?'':`<button class="tabbtn ${resultsView==='nfl'?'active':''}" id="resultsNflBtn">VS. ACTUAL NFL TEAMS</button>`}
   <button class="tabbtn ${resultsView==='mine'?'active':''}" id="resultsMineBtn">YOUR ROSTER</button>
   <button class="tabbtn ${resultsView==='compare'?'active':''}" id="resultsCompareBtn">TEAM COMPARISON</button>
  </div>
  <div id="draftResultsBody"></div>
  `;""", 'R-dock-cluster')

rep("""panel.innerHTML = h;

 const body = document.getElementById('draftResultsBody');""",
"""panel.innerHTML = h;
 { // w89 (Owner): the dock is the review panel's SIBLING — sticky needs an overflow-visible chain (the footnav lives here too); the host ids stay unique so every existing wiring keeps working
   let _dock = document.getElementById('zpbSeasonDock');
   if(!_dock){ _dock = document.createElement('div'); _dock.id = 'zpbSeasonDock'; _dock.className = 'zpb-cygops zpb-dock'; panel.insertAdjacentElement('afterend', _dock); }
   _dock.innerHTML = `<span class="zpb-draftops" id="zpbDraftOps"><button class="tabbtn" id="newDraftBtn" style="font-size:0.78rem;padding:5px 10px;">NEW DRAFT</button>${seasonState?'<button class="tabbtn" id="dockRunItBackBtn" style="font-size:0.78rem;padding:5px 10px;">RUN IT BACK</button>':''}</span><span class="zpb-simtabs" id="zpbSimTabsHost">${seasonState&&seasonState.phase==='regular'?'<button class="tabbtn zpb-ctasmall zpb-simseason" id="simSeasonBtn">SIM SEASON</button>':''}${seasonState&&seasonState.phase==='playoffs'?'<button class="tabbtn zpb-ctasmall" id="simPlayoffsBtnTop">SIM PLAYOFFS</button>':''}</span><span class="zpb-simtabs" id="zpbBtsHost"></span><p class="dsub zpb-cygdsub" style="margin:0 0 0 auto;"><span class="zpb-cyg">Can you go </span><b class="zpb-shine">20-0</b><b class="zpb-shine zpb-cygq">?</b></p>`;
 }

 const body = document.getElementById('draftResultsBody');""", 'R-dock-mount')

rep(""" document.getElementById('newDraftBtn').addEventListener('click', ()=> confirmDialog('This discards your drafted roster and any season in progress and takes you back to the draft setup.', 'Yes, start a new draft', startNewDraftFlow));
}""",
""" document.getElementById('newDraftBtn').addEventListener('click', ()=> confirmDialog('This discards your drafted roster and any season in progress and takes you back to the draft setup.', 'Yes, start a new draft', startNewDraftFlow));
 { const _drb = document.getElementById('dockRunItBackBtn'); // w89 (Owner): the dock's RUN IT BACK carries the same caution the season options carried
   if(_drb) _drb.addEventListener('click', ()=> zpbCaution('Yes · run it back', ()=>{ startSeason(); renderSeasonTab(document.getElementById('draftResultsBody') || document.body); window.scrollTo(0,0); }, {title:'Caution: Run it back?', body:'You will begin the season again at the preseason with the same roster you have right now. The current season\\u2019s results, stats and awards are erased.'}));
 }
}""", 'R-dock-wiring')

rep(""" return `<div class="zpb-seasonopts">${cta}${sim}<button class="tabbtn" id="restartSeasonBtn" style="width:auto;">RUN IT BACK</button><button class="tabbtn" id="newDraftFromSeasonBtn" style="width:auto;">NEW DRAFT</button></div>`;""",
""" return cta ? `<div class="zpb-seasonopts">${cta}</div>` : ''; // w89 (Owner): RUN IT BACK and NEW DRAFT live in the bottom dock now — the season options keep the CONTINUE door""", 'R-seasonopts')

rep("""   var ss = document.getElementById('simSeasonBtn'), pt = document.getElementById('simPlayoffsBtnTop');
   if(S.phase==='regular' && !ss){""",
"""   var ss = document.getElementById('simSeasonBtn'), pt = document.getElementById('simPlayoffsBtnTop');
   if(S.phase==='complete'){ var _sgc = document.getElementById('simGameBtn'); if(_sgc) _sgc.remove(); } // w89 (Owner): SIM GAME retires from the Super Bowl champions page — it has nothing to sim there
   if(S.phase==='regular' && !ss){""", 'R-simgame-guard')

# ---------- §3 · box score / playoffs ----------
rep("""function seedLabel(g, sideKey){ // w85 (Owner): the seed reads AFC #7 — Cinzel Decorative, the side's own ink
 const seed = g[sideKey+'Seed'];
 if(!seed) return '';
 const conf = g[sideKey+'Conf'] || (typeof conferenceOfTeam==='function' ? conferenceOfTeam(g[sideKey]) : '');
 return `<span class="zpb-seedlbl">${conf ? conf+' ' : ''}#${seed}</span>`;""",
"""function seedLabel(g, sideKey){ // w85 (Owner): the seed reads AFC #7 — Cinzel Decorative, the side's own ink · w89 (Owner): the #1 seed wears the golden shimmer
 const seed = g[sideKey+'Seed'];
 if(!seed) return '';
 const conf = g[sideKey+'Conf'] || (typeof conferenceOfTeam==='function' ? conferenceOfTeam(g[sideKey]) : '');
 if(seed===1) return `<span class="zpb-seedlbl zpb-shm zpb-conf1">${conf ? conf+' ' : ''}#${seed}</span>`; // w89 (Owner): "AFC #1" shimmers like the regular season's "#1 AFC"
 return `<span class="zpb-seedlbl">${conf ? conf+' ' : ''}#${seed}</span>`;""", 'R-seed1-shimmer')

rep("""  else html += `<p class="dsub">${user} has a bye this round. Simulate to see who they'll face.</p>`;
  const iPlay = status.status==='playing' && status.round===rk;""",
"""  else { // w89 (Owner): on a bye the top panel shows the matchup of the most likely next opponent — the M11 pick (the lowest seed playing this round)
   let _lo = null; (games||[]).forEach(g=>{ [g.homeSeed, g.awaySeed].forEach(sd=>{ if(sd && (!_lo || sd > _lo.sd)) _lo = {sd, g}; }); });
   html += `<p class="dsub">${user} has a bye this round · the most likely opponent waiting in the ${NEXT_ROUND_LABEL[rk]}</p>`;
   if(_lo) html += matchupCardHTML(_lo.g, (g,k)=>seedLabel(g,k));
   else html += `<p class="dsub">Simulate to see who they'll face.</p>`;
  }
  const iPlay = status.status==='playing' && status.round===rk;""", 'R-bye-matchup')

# ---------- §4 · the round skies wear the user's team colors + the during-game dynamics ----------
rep(""".zpb-replay-ov.zpb-rd-regular::before{opacity:1;
 background:radial-gradient(58% 46% at 28% 22%,color-mix(in srgb,var(--accent) 13%,transparent),transparent 70%),
            radial-gradient(52% 42% at 74% 78%,color-mix(in srgb,var(--accent) 9%,transparent),transparent 70%);""",
""".zpb-replay-ov.zpb-rd-regular::before{opacity:1;
 background:radial-gradient(58% 46% at 28% 22%,color-mix(in srgb,var(--tA,var(--accent)) 13%,transparent),transparent 70%),
            radial-gradient(52% 42% at 74% 78%,color-mix(in srgb,var(--tA,var(--accent)) 9%,transparent),transparent 70%);""", 'R-sky-regular')

rep("""background:conic-gradient(from 0deg at 30% 30%,transparent 0deg,color-mix(in srgb,var(--accent) 15%,transparent) 90deg,transparent 210deg),""",
"""background:conic-gradient(from 0deg at 30% 30%,transparent 0deg,color-mix(in srgb,var(--tA,var(--accent)) 15%,transparent) 90deg,transparent 210deg),""", 'R-sky-wild-div')

rep("""conic-gradient(from 270deg at 50% 58%,transparent 0deg,color-mix(in srgb,var(--accent) 13%,transparent) 80deg,transparent 180deg),""",
"""conic-gradient(from 270deg at 50% 58%,transparent 0deg,color-mix(in srgb,var(--tA,var(--accent)) 13%,transparent) 80deg,transparent 180deg),""", 'R-sky-champ')

rep("""color-mix(in srgb,var(--accent) 10%,transparent) 190deg,transparent 260deg),""",
"""color-mix(in srgb,var(--tA,var(--accent)) 10%,transparent) 190deg,transparent 260deg),""", 'R-sky-sb')

rep(""" + '<div class="zpb-rep-team"><span class="zpb-rep-sc zpb-slsc-hm" style="--scH:' + (pkH?(pkH.txM||pkH.accL):'inherit') + ';--scHd:' + (pkH?(pkH.txMd||pkH.txd||pkH.accD):'inherit') + ';" id="zrepSh">0</span><b style="color:' + colOf(g.home) + ';">' + abbr(g.home) + '</b>' + crest(g.home) + '</div></div>' // w43 (N8, Owner): the top scores wear their teams, never one shared red
   + '<div class="zpb-rep-log" id="zrepLog"></div>'""",
""" + '<div class="zpb-rep-team"><span class="zpb-rep-sc zpb-slsc-hm" style="--scH:' + (pkH?(pkH.txM||pkH.accL):'inherit') + ';--scHd:' + (pkH?(pkH.txMd||pkH.txd||pkH.accD):'inherit') + ';" id="zrepSh">0</span><b style="color:' + colOf(g.home) + ';">' + abbr(g.home) + '</b>' + crest(g.home) + '</div></div>' // w43 (N8, Owner): the top scores wear their teams, never one shared red
   + '<div class="zpb-rep-tide"><i id="zrepTide"></i><span id="zrepCmd"></span></div>' // w89 (Owner): the momentum tide + the command read — the two inks swing with the game
   + '<div class="zpb-rep-log" id="zrepLog"></div>'""", 'R-tide-element')

rep("""     if(ev.side==='home') hs += (ev.pts||0); else as += (ev.pts||0);
     sa.textContent = as; sh.textContent = hs;
     const _cl = colOf(g[ev.side]);""",
"""     if(ev.side==='home') hs += (ev.pts||0); else as += (ev.pts||0);
     sa.textContent = as; sh.textContent = hs;
     const _cl = colOf(g[ev.side]);
     { const _td = document.getElementById('zrepTide'), _cm = document.getElementById('zrepCmd'); // w89 (Owner): the during-game dynamics — the tide swings with every event, the command read speaks after every score, the big play pulses the scorer's ink
       if(_td){ if(ov.__tide==null) ov.__tide = 50;
        const _h = (ev.side==='home');
        const _push = (ev.pts||0)>0 ? ((ev.pts>=6)?10:6) : ((ev.type==='TO'||ev.type==='FUM') ? -8 : 0);
        ov.__tide = Math.max(12, Math.min(88, ov.__tide + (_h?_push:-_push)));
        _td.style.width = ((_h?ov.__tide:100-ov.__tide)).toFixed(0)+'%'; _td.style.background = _cl; }
       if(_cm && (ev.pts||0)>0){ const _my = (ev.side==='home'?hs:as), _op = (ev.side==='home'?as:hs); const _lead = _my-_op;
        _cm.textContent = _lead>0 ? (abbr(g[ev.side])+' BY '+_lead) : 'TIED'; _cm.style.color = _cl;
        _cm.classList.remove('on'); void _cm.offsetWidth; _cm.classList.add('on'); }
       if((ev.pts||0)>=6 && ov.classList){ ov.style.setProperty('--bigc', _cl); ov.classList.remove('zpb-bigplay'); void ov.offsetWidth; ov.classList.add('zpb-bigplay'); } }""", 'R-tide-update')

# ---------- §5 · the preseason page ----------
rep("""const hdr = `<div class="panel" style="margin-bottom:14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;"><div><div class="narr" style="text-transform:uppercase;letter-spacing:.05em;font-size:0.7rem;">Preseason</div><h3 style="margin:2px 0;">Set up the ${user} before Week 1</h3></div><button class="resetbtn" id="beginSeasonBtn" style="width:auto;margin:0;padding:10px 24px;">Begin the season →</button></div></div>`;
 const lineup = `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">1. Lineup, flexes and returner</h3>""",
"""const hdr = ''; // w89 (Owner): the setup panel is gone — the story plays as a cinematic before the preseason page reads (zpbPreseasonCine, once per season), and the first thing on the page is 1. LINEUP
 if(!S.__preCineDone){ S.__preCineDone = true; try{ zpbPreseasonCine(user); }catch(err){} }
 const lineup = `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">1. LINEUP</h3>""", 'R-preseason-hdr')

rep("""<summary style="cursor:pointer;font-weight:700;">NEW TO FLEXING? READ THIS FIRST</summary>""",
"""<summary style="cursor:pointer;font-weight:700;">NEW TO LINEUP?</summary>""", 'R-new-to-lineup')

# ---------- §6 · the philosophy panel ----------
rep("""<h3 style="margin-top:0;">2. Coaching philosophy</h3>
  <p style="margin:4px 0;">Your <b>coaching philosophy</b> is how your team likes to play by default. Opponents scout it. In any single game the plan can still change when a matchup calls for it, and the recaps say when it does and why.</p>""",
"""<h3 style="margin-top:0;">2. Coaching philosophy</h3>""", 'R-phil-paragraph')

rep("""Offense<select id="scriptOff" ><option value="auto" ${id.offChoice&&id.offChoice!=='auto'?'':'selected'}>Auto (recommended): ${capFirst(offStyleName(auto.off))}</option>""",
"""Offense<select id="scriptOff" ><option value="auto" ${id.offChoice&&id.offChoice!=='auto'?'':'selected'}>AUTO</option>""", 'R-auto-off')

rep("""Defense<select id="scriptDef" ><option value="auto" ${id.defChoice&&id.defChoice!=='auto'?'':'selected'}>Auto (recommended): ${capFirst(defStyleName(auto.def))}</option>""",
"""Defense<select id="scriptDef" ><option value="auto" ${id.defChoice&&id.defChoice!=='auto'?'':'selected'}>AUTO</option>""", 'R-auto-def')

rep("""function scriptWhyHTML(team){
 const S = seasonState, R = S.unitRatings[team], lg = S.league, rk = S.unitRanks[team], id = S.identity[team], auto = teamIdentity(R, lg);""",
"""function scriptWhyHTML(team, bare){ // w89 (Owner): bare=true returns the inner content only — the combined WHY THIS STYLE? dropdown consumes it
 const S = seasonState, R = S.unitRatings[team], lg = S.league, rk = S.unitRanks[team], id = S.identity[team], auto = teamIdentity(R, lg);""", 'R-why-signature')

rep(""" return `<details class="zpb-dd" style="margin-top:12px;"><summary style="cursor:pointer;">WHY THIS STYLE? (THE SIMPLE MATH)</summary>
  <div style="margin-top:8px;">
   <p class="narr" style="margin:0 0 8px;">The model tries all 15 ways to play and keeps the one that wins the most with your team.</p>""",
""" const _inner = `
   <p class="narr" style="margin:0 0 8px;">The model tries all 15 ways to play and keeps the one that wins the most with your team.</p>""", 'R-why-head')

rep("""   ${override}
  </div></details>`;
}""",
"""   ${override}`;
 if(bare) return _inner; // w89 (Owner): the combined WHY THIS STYLE? dropdown consumes the inner
 return `<details class="zpb-dd" style="margin-top:12px;"><summary style="cursor:pointer;">WHY THIS STYLE? (THE SIMPLE MATH)</summary>
  <div style="margin-top:8px;">${_inner}
  </div></details>`;
}""", 'R-why-tail')

rep("""  ${scriptWhyHTML(user)}
  ${zpbAutoWhyHTML(isAuto)}
  <details class="zpb-dd" style="margin-top:12px;"><summary style="cursor:pointer;">OFFENSE: EVERY STYLE WITH YOUR ROSTER</summary><div style="margin-top:8px;">${tabs.off}</div></details>
  <details class="zpb-dd" style="margin-top:12px;"><summary style="cursor:pointer;">DEFENSE: EVERY STYLE WITH YOUR ROSTER</summary><div style="margin-top:8px;">${tabs.def}</div></details>
  <details class="zpb-dd" style="margin-top:12px;"><summary style="cursor:pointer;">WHAT DO THESE TERMS MEAN? (PERSONNEL, PACKAGES)</summary><div style="margin-top:8px;">${persTableHTML()}${zpbPkgVizHTML()}</div></details></div>`;""",
"""  <details class="zpb-dd" style="margin-top:12px;"><summary style="cursor:pointer;">WHAT DO THESE TERMS MEAN?</summary><div style="margin-top:8px;">${persTableHTML()}${zpbPkgVizHTML()}</div></details>
  <details class="zpb-dd" style="margin-top:12px;"><summary style="cursor:pointer;">WHY THIS STYLE?</summary><div style="margin-top:8px;">${scriptWhyHTML(user, true)}${zpbAutoWhyHTML(isAuto)}<div style="margin-top:10px;">${tabs.off}</div><div style="margin-top:10px;">${tabs.def}</div></div></details></div>`; // w89 (Owner): one dropdown, the Owner's title; WHAT DO THESE TERMS MEAN? sits above it""", 'R-why-combined')

# ---------- §7 · the aggressiveness panel ----------
rep("""  <label class="narr" style="display:flex;flex-direction:column;gap:2px;font-size:0.72rem;max-width:300px;margin:8px 0;">Style<select id="aggrSel" >${Object.keys(AGGR_INFO).map(k=>`<option value="${k}" ${k===cur?'selected':''}>${AGGR_INFO[k].label}</option>`).join('')}</select></label>""",
"""  <div class="narr" style="display:flex;flex-direction:column;gap:2px;font-size:0.72rem;max-width:300px;margin:8px 0;">Style<select id="aggrSel" >${Object.keys(AGGR_INFO).map(k=>`<option value="${k}" ${k===cur?'selected':''}>${AGGR_INFO[k].label}</option>`).join('')}</select></div>""", 'R-aggr-label')

rep("""  <details class="zpb-dd" style="margin-top:12px;"><summary style="cursor:pointer;">HOW A 2 POINT CONVERSION WORKS</summary>
   <div style="margin-top:8px;">
    <div class="zpb-twop">
     <div><b>Kick</b><span>1 point · makes it about 94% of the time</span></div>
     <div><b>Go for 2</b><span>2 points from the 2-yard line · makes it about 48% of the time</span></div>
    </div>
    <p class="narr" style="margin:8px 0 0;">Both choices are worth about the same over many tries, so the call is about the game situation. One rule above all: <b>losing by 8 or 11 late, every team goes for 2</b>  ·  that is the try that ties the game or leaves a field goal to tie. Every other team has its own style too, and the recap says when a team went for 2.</p>
   </div></details>`;""",
"""  <details class="zpb-dd" style="margin-top:12px;"><summary style="cursor:pointer;">WHAT IS A 2 POINT CONVERSION</summary>
   <div style="margin-top:8px;">
    <div class="zpb-twop">
     <div><b>Kick</b><span class="zpb-tpbadge"><b>1 PT</b><i>· 94%</i></span></div>
     <div><b>Go for 2</b><span class="zpb-tpbadge"><b>2 PT</b><i>· 48%</i></span></div>
    </div>
    <div class="narr" style="margin:8px 0 0;">Both choices are worth about the same over many tries, so the call is about the game situation.<br>One rule above all: <b>losing by 8 or 11 late, every team goes for 2</b>  ·  that is the try that ties the game or leaves a field goal to tie.<br>Every other team has its own style too, and the recap says when a team went for 2.</div>
   </div></details>`;""", 'R-2pt')

# ---------- §8 · the draft review fade cards keep full names ----------
rep(""" var SEL = '.zpb-lu-cell,.zpb-gname,.zpb-awname,.zpb-awme,.zpb-dz-name,.zpb-whyname,'""",
""" var SEL = '.zpb-lu-cell,.zpb-gname:not(.zpb-dbk *),.zpb-awname,.zpb-awme,.zpb-dz-name,.zpb-whyname,' // w89 (Owner): the draft review's fade-in cards keep the full names at every width — the ladder never shortens them""", 'R-ladder-exempt')

# ---------- §9 · game preview / cinematics / champions ----------
rep("""if(e.seed===1 && done('seed1')) _fx('medium', 'NO. 1 SEED \\u00b7 FIRST-ROUND BYE!'); // w51 (Owner): the cinematic message reads ALL CAPS and the colon retires to the dot""",
"""if(e.seed===1 && done('seed1')) _fx('medium', 'NO. 1 SEED<br>FIRST-ROUND BYE!'); // w51 (Owner): the cinematic message reads ALL CAPS · w89 (Owner): two lines, no dot""", 'R-bye-banner')

rep("""  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ window.__zpbSBFinPending = false; try{ if(typeof zpbStoryRelease==='function') zpbStoryRelease(); }catch(err){} try{ if(window.__zpbSBRewardOwed){ window.__zpbSBRewardOwed = false; FX.play('sb'); } }catch(err){} return; }
  const champ = S.champion, pk = (typeof zpbPackFor==='function') ? zpbPackFor(champ) : null;""",
"""  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ window.__zpbSBFinPending = false; try{ if(typeof zpbStoryRelease==='function') zpbStoryRelease(); }catch(err){} try{ if(window.__zpbSBRewardOwed){ window.__zpbSBRewardOwed = false; FX.play('sb'); } }catch(err){} return; }
  try{ if(S.champion === seasonUserTeam() && typeof window.zpbSuperBowlVictoryCine==='function'){ window.__zpbSBFinPending = false; window.zpbSuperBowlVictoryCine(); return; } }catch(err){} // w89 (Owner): winning the Super Bowl skips the conventional SB page — the victory page IS the show
  const champ = S.champion, pk = (typeof zpbPackFor==='function') ? zpbPackFor(champ) : null;""", 'R-sb-skip')

rep("""  const embers = Array.from({length:22}, (_,i)=>'<i style="left:' + ((i*4.5)%100).toFixed(1) + '%;animation-delay:' + ((i%11)*0.66).toFixed(2) + 's;"></i>').join('');""",
"""  const embers = Array.from({length:22}, (_,i)=>'<i style="left:' + ((i*4.5)%100).toFixed(1) + '%;animation-delay:' + ((i%11)*0.66).toFixed(2) + 's;"></i>').join('');
  const _rec = (function(){ let w=0,l=0,t=0; try{ (S.schedule||[]).forEach(gg=>{ if(!gg.result || (gg.home!==user && gg.away!==user)) return; const me=gg.home===user; const my=me?gg.result.homeScore:gg.result.awayScore, op=me?gg.result.awayScore:gg.result.homeScore; if(my>op)w++; else if(my<op)l++; else t++; }); }catch(e){} return w+'-'+l+(t?'-'+t:''); })(); // w89 (Owner): the dynamic lines read the user's real season
  const _po = (function(){ let w=0,l=0; try{ ['wildcard','divisional','champ','superbowl'].forEach(rk=>{ ((S.playoffRounds||{})[rk]||[]).forEach(gg=>{ if(!gg.result||(gg.home!==user&&gg.away!==user)) return; const me=gg.home===user; const my=me?gg.result.homeScore:gg.result.awayScore, op=me?gg.result.awayScore:gg.result.homeScore; if(my>=op)w++; else l++; }); }); }catch(e){} return w+'-'+l; })();
  const _dyn = [ ((_rec==='17-0' && _po==='4-0') ? 'PERFECTION · 20-0' : _rec+' · THE SEASON'), _po+' THROUGH THE PLAYOFFS', 'THE BANNER RISES IN YOUR COLORS' ];
  const _dynHTML = '<div class="zpb-victory-dyn">' + _dyn.map((t,i)=>'<span style="animation-delay:'+(6.2+i*3).toFixed(1)+'s;">'+t+'</span>').join('') + '</div>';""", 'R-victory-dyn-data')

rep("""   + '<div class="zpb-victory-kicker zpb-shm">YOU WON THE SUPER BOWL</div>'
   + '<div class="zpb-victory-orb">""",
"""   + '<div class="zpb-victory-kicker zpb-shm">YOU WON THE SUPER BOWL</div>'
   + '<div class="zpb-victory-sub">THE FINAL WHISTLE</div>'
   + '<div class="zpb-victory-orb">""", 'R-victory-sub')

rep("""   + '<button class="resetbtn zpb-victory-go" style="width:auto;margin:0;padding:11px 30px;">Continue</button>'""",
"""   + _dynHTML
   + '<button class="resetbtn zpb-victory-go" style="width:auto;margin:0;padding:11px 30px;">Continue</button>'""", 'R-victory-dyn-mount')

# the victory entrance: the ~1s cadence
rep("""animation:zpbSbRise 1.1s ease both;animation-delay:.25s;}""",
"""animation:zpbSbRise 1.4s ease both;animation-delay:.5s;}""", 'R-vic-kicker-delay')
rep("""animation:zpbVicOrb 1.5s cubic-bezier(.2,.8,.25,1) both;animation-delay:.85s;}""",
"""animation:zpbVicOrb 1.5s cubic-bezier(.2,.8,.25,1) both;animation-delay:1.5s;}""", 'R-vic-orb-delay')
rep("""animation:zpbSbRise 1.7s ease both;animation-delay:2s;}""",
"""animation:zpbSbRise 1.7s ease both;animation-delay:3.2s;}""", 'R-vic-trophy-delay')
rep("""animation:zpbSbRise 1.7s ease both;animation-delay:1.45s;}""",
"""animation:zpbSbRise 1.7s ease both;animation-delay:2.5s;}""", 'R-vic-name-delay')
rep("""animation:zpbSbRise 1.6s ease both;animation-delay:2.05s;}""",
"""animation:zpbSbRise 1.6s ease both;animation-delay:3.5s;}""", 'R-vic-score-delay')
rep("""animation:zpbSbRise 1.8s ease both;animation-delay:2.35s;}""",
"""animation:zpbSbRise 1.8s ease both;animation-delay:4.5s;}""", 'R-vic-final-delay')
rep("""animation:zpbSbRise 2.4s ease both;animation-delay:2.65s;}""",
"""animation:zpbSbRise 2.4s ease both;animation-delay:5.5s;}""", 'R-vic-mvp-delay')
rep("""animation:zpbSbRise 2.8s ease both;animation-delay:3.25s;}""",
"""animation:zpbSbRise 2.8s ease both;animation-delay:7.4s;}""", 'R-vic-go-delay')

# ---------- §10 · the champions page top ----------
rep("""let html = `<div class="panel zpb-sr-own" style="margin-bottom:24px;text-align:center;padding:18px 12px;"><button class="resetbtn zpb-ctabig" id="zpbTryAgainBtn" style="width:auto;margin:0;padding:13px 34px;">TRY AGAIN TO GO <b class="zpb-shine">20-0</b>?</button> <button class="tabbtn zpb-ctabig" id="zpbRunItBackTop" style="width:auto;margin:0;padding:13px 34px;">RUN IT BACK</button> <button class="resetbtn zpb-ctabig" id="seasonReviewBtn" style="width:auto;margin:0;padding:13px 34px;">SEASON REVIEW</button></div>` +""",
"""// w89 (Owner): the try-again is a bar across the entire top — SEASON REVIEW below it; RUN IT BACK lives only in the dock
let html = `<div class="zpb-champtop"><button class="resetbtn zpb-ctabig" id="zpbTryAgainBtn" style="width:auto;margin:0;padding:13px 34px;">TRY AGAIN TO GO <b class="zpb-shine">20-0</b>?</button></div><div class="panel zpb-sr-own" style="margin-bottom:24px;text-align:center;padding:14px 12px;"><button class="resetbtn zpb-ctabig" id="seasonReviewBtn" style="width:auto;margin:0;padding:13px 34px;">SEASON REVIEW</button></div>` +""", 'R-champtop')

rep("""   <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;"><button class="tabbtn" id="zpbRunItBackTop" style="width:auto;">RUN IT BACK</button>${made?'<button class="resetbtn" id="beginPlayoffsBtn" style="width:auto;">Begin Playoffs</button>':''} <!-- w57 (Owner): the inline padding retires — the standing law sizes this button · W67 (Owner): the row centers its children — BEGIN PLAYOFFS keeps its big pill, SIM PLAYOFFS keeps its smaller box, neither stretches to match the other --><button class="tabbtn" id="simPlayoffsBtn">Sim Playoffs</button></div></div>""",
"""   <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">${made?'<button class="resetbtn" id="beginPlayoffsBtn" style="width:auto;">Begin Playoffs</button>':''} <!-- w57 (Owner): the inline padding retires — the standing law sizes this button · W67 (Owner): the row centers its children — BEGIN PLAYOFFS keeps its big pill, SIM PLAYOFFS keeps its smaller box, neither stretches to match the other · w89 (Owner): RUN IT BACK leaves this row — it rides the dock between NEW DRAFT and 100 SEASONS, and BEGIN PLAYOFFS rides the scroll-down rail --><button class="tabbtn" id="simPlayoffsBtn">Sim Playoffs</button></div></div>""", 'R-review-row')

# ---------- §11 · the w89 css + js blocks ----------
rep("""<style id="zpb-w52-css">""",
"""<style id="zpb-w89-css">
/* ============ Z-POST-BLUE W89 (the Owner's round-89) ============ */
/* 1 · the search menu's default static page */
.zpb-searchsplash{display:none;align-items:center;justify-content:center;min-height:240px;font-family:'Cinzel Decorative','Cinzel',Georgia,serif;font-weight:800;font-size:1.25rem;letter-spacing:.4em;text-indent:.4em;color:var(--sub);}
/* 2 · the season dock — the side-scrolling second footer (the footer's own strip treatment) */
.zpb-cygops.zpb-dock{position:sticky;bottom:calc(66px + env(safe-area-inset-bottom,0px));z-index:29;display:flex;flex-wrap:nowrap;justify-content:flex-start;align-items:center;gap:8px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;contain:inline-size;background:var(--panel);border:1px solid var(--border);border-radius:14px;box-shadow:0 10px 26px rgba(0,0,0,.20);padding:8px 10px;margin:26px 0 10px;}
.zpb-cygops.zpb-dock::-webkit-scrollbar{display:none;}
.zpb-cygops.zpb-dock > *,.zpb-cygops.zpb-dock .zpb-draftops > *{flex:0 0 auto;scroll-snap-align:start;}
.zpb-cygops.zpb-dock .zpb-cygdsub{white-space:nowrap;padding-right:2px;}
@media (max-width:760px){ .zpb-cygops.zpb-dock{gap:6px;padding:7px 8px;} }
/* 3 · the champions page's full-width try-again bar */
.zpb-champtop{width:100%;display:flex;justify-content:center;align-items:center;padding:12px;margin:0 calc(50% - 50vw) 16px calc(50% - 50vw);border-top:1px solid var(--rosehair,var(--border));border-bottom:1px solid var(--rosehair,var(--border));background:color-mix(in srgb,var(--panel) 88%,transparent);}
/* 4 · the box score — vertical lines between the quarters and F, in the teams' own inks */
table.linescore th:not(:first-child){border-left:1px solid var(--rosehair,var(--border));}
table.linescore tbody td:not(:first-child){border-left:1px solid color-mix(in srgb,var(--zrb,var(--border)) 55%,transparent);}
:root[data-theme="dark"] table.linescore tbody td:not(:first-child){border-left-color:color-mix(in srgb,var(--zrbd,var(--zr1,var(--border))) 62%,transparent);}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) table.linescore tbody td:not(:first-child){border-left-color:color-mix(in srgb,var(--zrbd,var(--zr1,var(--border))) 62%,transparent);} }
:root[data-theme="dark"] .linescore tr.zpb-trow td:first-child{box-shadow:none;} /* w89 (Owner): the natural vertical bar before each team name retires from the box score */
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .linescore tr.zpb-trow td:first-child{box-shadow:none;} }
/* 5 · the two-point try badges */
.zpb-tpbadge{display:inline-flex;align-items:center;gap:7px;margin-top:5px;border:1px solid var(--rosehair,var(--border));border-radius:999px;padding:4px 12px;background:var(--panel2);font-size:.72rem;letter-spacing:.06em;color:var(--text);}
.zpb-tpbadge b{font-family:'Cinzel','Bodoni Moda',Georgia,serif;font-weight:800;}
.zpb-tpbadge i{font-style:normal;color:var(--sub);font-variant-numeric:tabular-nums;}
/* 6 · the game preview strip stacks on the phone — the 44/56 bar takes its own line */
@media (max-width:640px){
 .zpb-strip{grid-template-columns:1fr 1fr;gap:6px 10px;}
 .zpb-strip-bar{order:3;grid-column:1/-1;justify-self:center;width:100%;max-width:210px;height:12px;}
 .zpb-strip-team{font-size:.76rem;}
 .zpb-strip-team img{width:22px;height:22px;}
 .zpb-strip-team .narr{font-size:.58rem;}
}
/* 7 · the preseason cinematic */
.zpb-precine{position:fixed;inset:0;z-index:120;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 32%,color-mix(in srgb,var(--pc1,#c9a24b) 16%,#1c1307) 0%,#140d06 58%,#0b0703 100%);opacity:0;transition:opacity .8s ease;}
.zpb-precine.zpb-precine-in{opacity:1;}
.zpb-precine.zpb-precine-out{opacity:0;pointer-events:none;}
.zpb-precine-stage{text-align:center;padding:20px;}
.zpb-precine-kicker{font-family:'Cinzel Decorative','Cinzel',Georgia,serif;font-weight:800;font-size:.72rem;letter-spacing:.42em;text-indent:.42em;color:#cfa84e;animation:zpbSbRise 1.2s ease .25s both;}
.zpb-precine-crest img{width:110px;height:110px;object-fit:contain;filter:drop-shadow(0 0 34px color-mix(in srgb,var(--pc1,#c9a24b) 62%,transparent));margin:16px 0 6px;animation:zpbVicOrb 1.4s cubic-bezier(.2,.8,.25,1) 1.1s both;}
.zpb-precine-line{font-family:'Cinzel Decorative','Cinzel',Georgia,serif;font-weight:900;font-size:clamp(1.5rem,5.6vw,2.6rem);letter-spacing:.1em;color:#f7e2a4;animation:zpbSbRise 1.5s ease 2s both;}
.zpb-precine-line2{font-family:'Cinzel Decorative','Cinzel',Georgia,serif;font-weight:800;font-size:clamp(1rem,3.4vw,1.6rem);letter-spacing:.3em;text-indent:.3em;color:#cfa84e;margin-top:8px;animation:zpbSbRise 1.5s ease 3.1s both;}
@media (prefers-reduced-motion: reduce){ .zpb-precine{display:none;} }
/* 8 · the victory page — the ~1s cadence, the sub-line and the cycling dynamic text */
.zpb-victory-sub{font-family:'Cinzel Decorative','Cinzel',Georgia,serif;letter-spacing:.34em;text-indent:.34em;font-size:.62rem;color:#cfa84e;margin-top:6px;animation:zpbSbRise 1.3s ease 1s both;}
.zpb-victory-dyn{position:relative;height:1.5em;margin-top:10px;animation:zpbSbRise 1.6s ease 6s both;}
.zpb-victory-dyn span{position:absolute;left:0;right:0;top:0;font-size:.86rem;letter-spacing:.18em;color:#e8d5a4;opacity:0;animation:zpbVicDyn 9s ease-in-out infinite;}
@keyframes zpbVicDyn{0%{opacity:0;transform:translateY(8px);}4%{opacity:1;transform:none;}30%{opacity:1;}36%{opacity:0;transform:translateY(-8px);}100%{opacity:0;}}
/* 9 · the during-game dynamics — the tide, the command read, the big-play flash */
.zpb-replay .zpb-replay{transition:border-color .4s ease,box-shadow .4s ease;}
.zpb-rep-tide{position:relative;height:4px;margin:8px 12px 0;border-radius:3px;background:var(--border);overflow:hidden;}
.zpb-rep-tide i{display:block;height:100%;width:50%;border-radius:3px;background:var(--accent);transition:width .5s ease,background .5s ease;}
.zpb-rep-tide span{position:absolute;right:10px;top:7px;font-size:.6rem;font-weight:800;letter-spacing:.14em;color:var(--sub);opacity:0;}
.zpb-rep-tide span.on{animation:zpbCmdIn 2.6s ease both;}
@keyframes zpbCmdIn{0%{opacity:0;transform:translateY(4px);}12%{opacity:1;transform:none;}70%{opacity:1;}100%{opacity:0;}}
.zpb-replay-ov.zpb-bigplay .zpb-replay{border-color:var(--bigc,var(--accent)) !important;box-shadow:0 0 44px color-mix(in srgb,var(--bigc,var(--accent)) 55%,transparent) !important;}
/* 10 · the dock side-scrolls on mobile like the footer — the W61-3 column-reverse (written for
   the retired top cluster) must never bend the dock into a stack; the strip stays ONE line */
.zpb-cygops.zpb-dock{flex-direction:row;align-items:center;}
.zpb-cygops.zpb-dock .zpb-draftops{flex-wrap:nowrap;flex:0 0 auto;}
.zpb-cygops.zpb-dock .zpb-cygdsub{margin:0 0 0 auto;flex:0 0 auto;}
</style>
<style id="zpb-w52-css">""", 'R-w89-css-block')

rep("""<script id="zpb-w88-js">""",
"""<script id="zpb-w89-js">
// ============ Z-POST-BLUE W89 · THE PRESEASON CINEMATIC (the Owner's round-89) ============
// The setup panel is gone — the story plays as a cinematic before the preseason page reads.
// Once per season (the seasonState flag carries it), reduced-motion safe, skippable by tap.
window.zpbPreseasonCine = function(user){
 try{
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(document.querySelector('.zpb-precine')) return;
  const pk = (typeof zpbPackFor==='function') ? zpbPackFor(user) : null;
  const lg = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
  const ov = document.createElement('div'); ov.className = 'zpb-precine';
  if(pk) ov.style.setProperty('--pc1', pk.accL);
  ov.innerHTML = '<div class="zpb-precine-stage">'
   + '<div class="zpb-precine-kicker">TRAINING CAMP</div>'
   + '<div class="zpb-precine-crest">' + lg(user) + '</div>'
   + '<div class="zpb-precine-line">SET UP THE ' + String(user).toUpperCase() + '</div>'
   + '<div class="zpb-precine-line2">BEFORE WEEK 1</div>'
   + '</div>';
  document.body.appendChild(ov);
  requestAnimationFrame(()=> ov.classList.add('zpb-precine-in'));
  const go = ()=>{ if(ov.dataset.out) return; ov.dataset.out='1'; ov.classList.add('zpb-precine-out'); setTimeout(()=>ov.remove(), 1150); };
  ov.addEventListener('click', go);
  setTimeout(go, 4600);
 }catch(err){}
};
</script>

<script id="zpb-w88-js">""", 'R-w89-js-block')

# ================= R2 · the Owner's second w89 round (same chat, 10 Nov 2026) =================
# Four verbatim asks on top of the 26: the guide's Wins caption retires; the autosave bubble
# loses its words and its Not-now button (one quiet door back to the season stays — zpbRestoreSeason
# is only reachable through it); the little Style word above the aggressiveness dropdown retires;
# SIM GAME and SIM PLAYOFFS read at the top of the page again while the dock keeps them at the bottom.

rep(""" h += '</div><div class="zpb-prcap">The Wins value of every starting spot  ·  extra wins per season, 20-OVR upgrade at the local rate</div>';""",
""" h += '</div>'; // w89r2 (Owner): the caption leaves the guide — the Wins table reads on its own""", 'R2-guide-cap')

rep("""   var st = sv.stage || 'your season';
   var when = new Date(sv.ts||Date.now());
   var stamp = (when.getMonth()+1)+'/'+when.getDate()+' '+('0'+when.getHours()).slice(-2)+':'+('0'+when.getMinutes()).slice(-2);
   b.innerHTML = '<div class="zpb-bud-in"><div class="zpb-bud-k">Autosave</div><div class="zpb-bud-t">A saved season is waiting — <b>'+st+'</b> <span class="zpb-bud-when">'+stamp+'</span></div>'
    + '<div class="zpb-bud-btns"><button class="resetbtn" data-zbud="go" style="width:auto;margin:0;padding:8px 18px;font-size:.84rem;">Return to your season</button>'
    + '<button class="tabbtn" data-zbud="no" style="width:auto;margin:0;">Not now</button></div></div>';""",
"""   b.innerHTML = '<div class="zpb-bud-in"><div class="zpb-bud-btns"><button class="resetbtn" data-zbud="go" style="width:auto;margin:0;padding:8px 18px;font-size:.84rem;">Return to your season</button></div></div>'; // w89r2 (Owner): the words leave the autosave bubble and the Not-now button retires — one quiet door back to your season (zpbRestoreSeason rides only this door)""", 'R2-autosave-bubble')

rep("""<div class="narr" style="display:flex;flex-direction:column;gap:2px;font-size:0.72rem;max-width:300px;margin:8px 0;">Style<select id="aggrSel" >""",
"""<div class="narr" style="display:flex;flex-direction:column;gap:2px;font-size:0.72rem;max-width:300px;margin:8px 0;"><select id="aggrSel" >""", 'R2-aggr-style')

rep("""  const b = e.target.closest ? e.target.closest('#simSeasonBtn') : null;""",
"""  const b = e.target.closest ? e.target.closest('#simSeasonBtn,#simSeasonBtnHead') : null; // w89r2 (Owner): the top door asks the same SIM SEASON question""", 'R2-a9-selector')

rep("""  var t = e.target.closest ? e.target.closest('#simRestBtn,#simPlayoffsBtnTop,#simPlayoffsBtnFoot') : null;""",
"""  var t = e.target.closest ? e.target.closest('#simRestBtn,#simPlayoffsBtnTop,#simPlayoffsBtnFoot,#simPlayoffsBtnHead') : null; // w89r2 (Owner): the top door rides the same SIM PLAYOFFS warning""", 'R2-w65d-selector')

rep(""" if(simGame) simGame.addEventListener('click', ()=>{
  window.__zpbSilent = true;""",
""" if(simGame && !simGame._zpbW65){ simGame._zpbW65 = true; simGame.addEventListener('click', ()=>{ // w89r2 (Owner): one wiring on the dock door — re-renders may never stack a second sim (a stacked click re-fired zpbGameReplay)
  window.__zpbSilent = true;""", 'R2-dock-guard-open')

rep("""  const rv = document.getElementById('zpbGameReviewNow'); if(rv) rv.scrollIntoView({block:'start', behavior:'smooth'});
 });""",
"""  const rv = document.getElementById('zpbGameReviewNow'); if(rv) rv.scrollIntoView({block:'start', behavior:'smooth'});
 }); }""", 'R2-dock-guard-close')

rep("""</script>
</body>
</html>""",
"""</script>
<style id="zpb-w89r2-css">
/* W89R2 (Owner): the sim doors read at the top of the page — the same small doors the dock carries */
.zpb-topstrip{display:flex;justify-content:flex-end;align-items:center;gap:8px;flex-wrap:wrap;margin:0 0 10px;}
.zpb-topstrip .tabbtn{width:auto;margin:0;font-size:0.78rem;padding:5px 10px;}
@media (max-width:480px){ .zpb-topstrip .zpb-ctasmall{font-size:.66rem !important;padding:5px 9px !important;} }
</style>
<script id="zpb-w89r2-js">
// ================= Z-POST-BLUE W89R2 · THE TOP DOORS (the Owner's second round-89) =================
// W89R2-A (Owner): SIM GAME and SIM PLAYOFFS are visible at the top of the page again — the dock
// keeps the same doors at the bottom. The strip mirrors the dock's doors exactly (SIM GAME rides
// only while this week's game is up; SIM SEASON through the regular season; SIM PLAYOFFS through
// the bracket) and never mounts on the preseason page — that page still opens on 1. LINEUP — or
// on the review/champions pages, where nothing can be simmed. The top doors wire like the dock's:
// SIM GAME plays one real game and lands on the Game Review; SIM SEASON and SIM PLAYOFFS ride the
// A9 and W65-D capture handlers (patched to adopt the Head ids), so every warning still asks first.
(function(){
 'use strict';
 if(typeof renderSeasonTabInner !== 'function' || renderSeasonTabInner._zpbR2) return;
 var orig = renderSeasonTabInner;
 var g = function(container){
  var out = orig.apply(this, arguments);
  try{
   var S = null; try{ S = seasonState; }catch(e){ S = null; }
   var old = document.getElementById('zpbTopSimStrip'); if(old) old.remove();
   if(!S || S.preseason || (S.phase!=='regular' && S.phase!=='playoffs') || !container || !container.isConnected) return out;
   var doors = '';
   if(S.phase==='regular'){
    if(!S.weekSimulated && S.schedule){
     var user = seasonUserTeam();
     if(S.schedule.some(function(gt){ return gt.week===S.currentWeek && (gt.home===user||gt.away===user); }))
      doors += '<button class="tabbtn zpb-ctasmall zpb-simgame" id="simGameBtnHead">SIM GAME</button>';
    }
    doors += '<button class="tabbtn zpb-ctasmall zpb-simseason" id="simSeasonBtnHead">SIM SEASON</button>';
   } else {
    doors += '<button class="tabbtn zpb-ctasmall" id="simPlayoffsBtnHead">SIM PLAYOFFS</button>';
   }
   var strip = document.createElement('div'); strip.id = 'zpbTopSimStrip'; strip.className = 'zpb-topstrip';
   strip.innerHTML = doors;
   container.insertBefore(strip, container.firstChild);
   var sg = document.getElementById('simGameBtnHead');
   if(sg) sg.addEventListener('click', function(){ // the dock door's own wiring, verbatim — a fresh element every render, so it cannot stack
    window.__zpbSilent = true;
    try{ simulateCurrentWeek(); } finally { window.__zpbSilent = false; }
    renderSeasonTab(container);
    var rv = document.getElementById('zpbGameReviewNow'); if(rv) rv.scrollIntoView({block:'start', behavior:'smooth'});
   });
  }catch(err){}
  return out;
 };
 g._zpbR2 = true;
 renderSeasonTabInner = g;
})();
</script>
</body>
</html>""", 'R2-eof-insert')

open(DST, 'w', encoding='utf-8').write(s)
md5 = hashlib.md5(open(DST, 'rb').read()).hexdigest()
print(f'\nw89 written: {len(s):,} B · md5 {md5} · {n_ok} replacements')
