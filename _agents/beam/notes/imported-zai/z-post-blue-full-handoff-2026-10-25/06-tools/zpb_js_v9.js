// ---- Z-post-blue v9 (ninth wave) ---- Owner: 25 Oct, ~48 directives.
// Part 1: the game replay (30-60 s, turnovers, team colors, star, no timeout,
// clutch + playoff + Super Bowl cinematics), the rest-of-season summary, and
// the graphical 100-season report. UI only - no sim math touched.

function zpbGameReplay(g, focusTeam){
 try{
  if(window.__zpbSilent) return;
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(document.querySelector('.zpb-replay-ov')) return;
  const r = g.result; if(!r || !r.homeEvents) return;
  const evs = r.homeEvents.map(e=>Object.assign({}, e, {side:'home'}))
   .concat(r.awayEvents.map(e=>Object.assign({}, e, {side:'away'})))
   .sort((a,b)=> a.q-b.q || a.t-b.t);
  if(!evs.length) return;
  const info = {};
  ['home','away'].forEach(sd=>{
   const det = (g.detail && g.detail[sd]) || {};
   const ps = det.players || [];
   let qbName = '', kicker = '';
   const recs = [], rush = [];
   ps.forEach(p=>{
    const st = p.st || {};
    if(p.slot==='K') kicker = p.name;
    if(p.slot==='QB' && !qbName) qbName = p.name;
    const rt = st.rushTD || 0; for(let i=0;i<rt;i++) rush.push(p.name);
    const ct = st.recTD || 0; for(let i=0;i<ct;i++) recs.push(p.name);
   });
   info[sd] = {qbName:qbName, kicker:kicker, recs:recs, rush:rush};
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
  const colOf = tm=>{ const pk = (typeof zpbPackFor==='function') ? zpbPackFor(tm) : null; return pk ? pk.accL : 'var(--accent)'; };
  const crest = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
  const isPO = !!(g.roundLabel || (seasonState && seasonState.playoffRounds && seasonState.playoffRounds[g.roundLabel ? seasonState.currentPlayoffRound : ''] === undefined && false));
  const roundLabel = g.roundLabel || ((seasonState && seasonState.phase === 'playoffs' && ROUND_LABELS && ROUND_LABELS[seasonState.currentPlayoffRound]) || '');
  const isSB = /super bowl/i.test(roundLabel || '');
  // turnovers: real totals from the box score, spaced across quarters for the log
  const toH = (r.homeStats && r.homeStats.turnovers) || 0, toA = (r.awayStats && r.awayStats.turnovers) || 0;
  const toEvents = [];
  [['home',toH],['away',toA]].forEach(([sd,n])=>{
   for(let i=0;i<n;i++){
    const q = Math.min(4, 1+Math.floor((i+0.5)/Math.max(n,1)*4));
    toEvents.push({q:q, t:0.5, pts:0, type:'TO', side:sd});
   }
  });
  const all = evs.concat(toEvents).sort((a,b)=> a.q-b.q || a.t-b.t);
  const abbr = n=> TEAM_ABBR[n] || n;
  const ov = document.createElement('div'); ov.className = 'zpb-replay-ov';
  ov.innerHTML = '<div class="zpb-replay' + (isSB ? ' zpb-sb' : (roundLabel ? ' zpb-po' : '')) + '">'
   + '<div class="zpb-rep-hd"><div class="zpb-rep-team">' + crest(g.away) + '<b>' + abbr(g.away) + '</b><span class="zpb-rep-sc" id="zrepSa">0</span></div>'
   + '<span class="zpb-rep-qchip" id="zrepQ">1ST</span>'
   + '<div class="zpb-rep-team"><span class="zpb-rep-sc" id="zrepSh">0</span><b>' + abbr(g.home) + '</b>' + crest(g.home) + '</div></div>'
   + '<div class="zpb-rep-log" id="zrepLog"></div>'
   + '<div class="zpb-rep-ft"><button class="tabbtn zrl-skip" id="zrepSkip">Skip</button><div class="zpb-rep-prog"><i id="zrepProg"></i></div><button class="resetbtn" id="zrepGo" style="display:none;width:auto;margin:0;padding:9px 26px;">Continue</button></div>'
   + '</div>';
  document.body.appendChild(ov);
  const box = ov.querySelector('.zpb-replay');
  const log = ov.querySelector('#zrepLog'), qchip = ov.querySelector('#zrepQ'),
        sa = ov.querySelector('#zrepSa'), sh = ov.querySelector('#zrepSh'), prog = ov.querySelector('#zrepProg'),
        skip = ov.querySelector('#zrepSkip'), go = ov.querySelector('#zrepGo');
  const QN = {1:'1ST QUARTER', 2:'2ND QUARTER', 3:'3RD QUARTER', 4:'4TH QUARTER'};
  const clockOf = e=>{ const m = Math.max(0, Math.min(15, 15*(1-(e.t||0)))); const mm = Math.floor(m), ss = Math.floor((m-mm)*60); return mm + ':' + String(ss).padStart(2,'0'); };
  let hs = 0, as = 0, timers = [], finished = false, clutch = false;
  const close = ()=>{ timers.forEach(t=>clearTimeout(t)); const x = document.querySelector('.zpb-replay-ov'); if(x) x.remove(); document.removeEventListener('keydown', esc); };
  const esc = e=>{ if(e.key==='Escape') close(); };
  document.addEventListener('keydown', esc);
  ov.addEventListener('click', e=>{ if(e.target===ov) close(); });
  if(skip) skip.addEventListener('click', ()=>{ if(finished){ return; } finish(true); });
  if(go) go.addEventListener('click', close);
  // ---- cinematic intro: 5 s for playoff games, 30 s for the Super Bowl ----
  const INTRO_MS = isSB ? 30000 : (roundLabel ? 5000 : 0);
  let introDone = !INTRO_MS;
  const startTimeline = ()=>{
   if(introDone) return;
   introDone = true;
   const intro = box.querySelector('.zpb-rep-intro'); if(intro) intro.remove();
   runEvents();
  };
  if(INTRO_MS){
   const intro = document.createElement('div'); intro.className = 'zpb-rep-intro';
   intro.innerHTML = '<div class="zpb-intro-flash"></div>'
    + '<div class="zpb-intro-title">' + roundLabel.toUpperCase() + '</div>'
    + '<div class="zpb-intro-logos"><span class="zpb-intro-l">' + crest(g.away) + '</span><span class="zpb-intro-vs">VS</span><span class="zpb-intro-r">' + crest(g.home) + '</span></div>'
    + '<div class="zpb-intro-sub">' + (isSB ? 'the everything game' : abbr(g.away) + ' at ' + abbr(g.home)) + '</div>'
    + '<button class="tabbtn zpb-intro-skip" id="zrepIntroSkip">Skip intro</button>';
   box.appendChild(intro);
   const flash = ()=>{ const f = intro.querySelector('.zpb-intro-flash'); if(f){ f.style.opacity = '.95'; setTimeout(()=>{ f.style.transition = 'opacity .7s ease'; f.style.opacity = '0'; }, 240); } };
   if(isSB){ timers.push(setTimeout(flash, 3400)); timers.push(setTimeout(flash, 12000)); timers.push(setTimeout(flash, 22000)); }
   else { timers.push(setTimeout(flash, 3400)); }
   const iSkip = intro.querySelector('#zrepIntroSkip'); if(iSkip) iSkip.addEventListener('click', startTimeline);
   timers.push(setTimeout(startTimeline, INTRO_MS));
  }
  const finish = (skipRest)=>{
   if(finished) return;
   finished = true;
   qchip.textContent = 'FINAL';
   const fin = document.createElement('div'); fin.className = 'zpb-rep-final';
   const winTxt = focusTeam ? ((g.home===focusTeam ? hs>as : as>hs) ? 'You win' : (hs===as ? 'Tie' : 'You lose')) : (hs>as ? g.home + ' win' : (as>hs ? g.away + ' win' : 'Tie'));
   const uWon = focusTeam && ((g.home===focusTeam && hs>as) || (g.away===focusTeam && as>hs));
   const star = uWon ? '<span class="zpb-rep-star" style="--zrb:' + colOf(focusTeam) + '">★</span> ' : '';
   fin.innerHTML = star + '<b>FINAL · ' + as + '–' + hs + '</b><span>' + winTxt + '</span>'
    + '<em>Turnovers · ' + abbr(g.away) + ' ' + toA + ' – ' + toH + ' ' + abbr(g.home) + '</em>';
   log.appendChild(fin);
   log.scrollTop = log.scrollHeight;
   prog.style.width = '100%';
   box.classList.add('done');
   if(skip) skip.style.display = 'none';
   if(go) go.style.display = '';
  };
  const runEvents = ()=>{
   const total = all.length;
   // 30-60 s of play-by-play: slower cadence, quarter banners get room to breathe
   const step = Math.min(3400, Math.max(1500, 34000/total));
   let t = 500;
   timers.push(setTimeout(()=>{ prog.style.width = '4%'; }, 60));
   let lastQ = 0;
   all.forEach((e, i)=>{
    if(e.q !== lastQ){
     lastQ = e.q; const qq = e.q;
     timers.push(setTimeout(()=>{
      qchip.textContent = (QN[qq] || ('Q' + qq)).split(' ')[0];
      const d = document.createElement('div'); d.className = 'zpb-rep-q'; d.textContent = QN[qq] || ('QUARTER ' + qq);
      log.appendChild(d);
     }, t));
     t += 900;
    }
    const ev = e;
    timers.push(setTimeout(()=>{
     if(ev.type==='TO'){
      const line = document.createElement('div');
      line.className = 'zpb-rep-line zrl-to';
      line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q</span>' + crest(g[ev.side])
       + '<span class="zrl-team">' + abbr(g[ev.side]) + '</span><span class="zrl-play">Turnover</span>'
       + '<span class="zrl-pts" style="color:' + colOf(g[ev.side]) + ';">TO</span>';
      log.appendChild(line);
      requestAnimationFrame(()=>{ line.classList.add('in'); });
      log.scrollTop = log.scrollHeight;
      return;
     }
     if(ev.side==='home') hs += (ev.pts||0); else as += (ev.pts||0);
     sa.textContent = as; sh.textContent = hs;
     const line = document.createElement('div');
     line.className = 'zpb-rep-line' + (((ev.side==='home'&&focusTeam===g.home)||(ev.side==='away'&&focusTeam===g.away)) ? ' zrl-me' : '');
     line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
      + '<span class="zrl-team">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + describe(ev)
      + '</span><span class="zrl-pts" style="color:' + colOf(g[ev.side]) + ';">+' + (ev.pts||0) + '</span>'
      + '<span class="zrl-sc"><b style="color:' + colOf(g.away) + ';">' + as + '</b>–<b style="color:' + colOf(g.home) + ';">' + hs + '</b></span>';
     log.appendChild(line);
     requestAnimationFrame(()=>{ line.classList.add('in'); });
     log.scrollTop = log.scrollHeight;
     prog.style.width = (8 + 88*((i+1)/total)).toFixed(1) + '%';
     if(ev.q===4 && Math.abs(hs-as) <= 7 && !clutch){
      clutch = true;
      box.classList.add('zpb-clutch');
      if(roundLabel) box.classList.add('zpb-clutch2');
     }
    }, t));
    t += step;
   });
   timers.push(setTimeout(()=>{ finish(false); }, t + 700));
  };
  if(!INTRO_MS){ runEvents(); }
 }catch(err){}
}
// ---- end replay ----

// ---- rest-of-season: no per-game animation; a summary panel instead ----
function zpbRestSummary(){
 try{
  const user = seasonUserTeam(), S = seasonState;
  const st = computeStandings(S.schedule, teamNames())[user];
  const conf = conferenceOfTeam(user);
  const seeds = S.seeds || null;
  let seed = null, made = false;
  if(seeds && seeds[conf]){ const e = seeds[conf].find(x=>x.team===user); if(e){ seed = e.seed; made = true; } }
  const one = seed===1;
  const ov = document.createElement('div'); ov.className = 'zpb-restov';
  const confetti = made ? '<div class="zpb-restconf">' + Array.from({length:26}, (_,i)=>'<i style="left:' + (i*3.8+2) + '%;animation-delay:' + (i%9)*0.28 + 's;background:' + (i%3===0 ? '#d9a94c' : (i%3===1 ? 'var(--accent)' : 'var(--accent2,var(--rose)')) + '"></i>').join('') + '</div>' : '';
  ov.innerHTML = '<div class="zpb-restbox' + (made ? ' zpb-restpo' : '') + (one ? ' zpb-restone' : '') + '">'
   + confetti
   + '<div class="narr" style="letter-spacing:.14em;text-transform:uppercase;font-size:.68rem;">The regular season is in the books</div>'
   + '<div class="zpb-restbig">' + st.wins + '–' + st.losses + (st.ties ? '–' + st.ties : '') + '</div>'
   + '<div class="narr">' + st.pf + ' points for · ' + st.pa + ' against' + (st.diff>=0 ? ' · +' + st.diff : ' · ' + st.diff) + '</div>'
   + (made ? '<div class="zpb-restseed">' + (one ? '★ #1 SEED — THE BYE IS YOURS' : 'PLAYOFFS CLINCHED — #' + seed + ' SEED') + '</div>'
            + '<p style="margin:6px 0 0;">The bracket awaits. ' + (one ? 'The road to the Super Bowl runs through you.' : 'Four quarters at a time from here.') + '</p>'
      : '<div class="zpb-restseed">Offseason comes early</div><p style="margin:6px 0 0;">The playoffs will play out without you. The draft is where next year starts.</p>')
   + '<div style="margin-top:16px;"><button class="resetbtn zpb-startbtn" id="zpbRestGo" style="font-size:.95rem;padding:12px 30px !important;">Continue</button></div>'
   + '</div>';
  document.body.appendChild(ov);
  ov.querySelector('#zpbRestGo').addEventListener('click', ()=> ov.remove());
 }catch(err){}
}
(function(){
 if(typeof simRestOfSeason !== 'function') return;
 const orig = simRestOfSeason;
 simRestOfSeason = function(){
  window.__zpbSilent = true;
  try{ orig(); } finally { window.__zpbSilent = false; }
  try{ zpbRestSummary(); }catch(err){}
 };
})();

// ---- 100-season report: graphical, sentence-light, and the back button works ----
render100 = function(container){
 const D = league100, A = D.agg, N = A.seasons, user = D.user, names = D.L.names, R = D.L.unitRatings;
 const avgW = {}, T = A.teams; names.forEach(n=>{ avgW[n] = mean_(T[n].w); });
 const sorted = names.slice().sort((a,b)=>avgW[b]-avgW[a]);
 const mine = T[user], myW = mine.w, myAvg = avgW[user], myRank = sorted.indexOf(user)+1;
 const pk = (typeof zpbPackFor==='function') ? zpbPackFor(user) : null;
 const uvars = (typeof zpbRowVars==='function') ? zpbRowVars(user) : '';
 const pctS = (v,d)=> (v*100).toFixed(d===undefined?0:(d||0)) + '%';
 const hist = {}; myW.forEach(w=>{ const k = Math.round(w); hist[k] = (hist[k]||0)+1; });
 const maxH = Math.max(...Object.values(hist));
 const histRows = Array.from({length:18}, (_,k)=>k).map(k=>'<div class="zpb-100bar"><span class="narr">' + k + '-' + (17-k) + '</span><span class="tr"><i style="width:' + Math.max(hist[k] ? 2 : 0, (hist[k]||0)/maxH*100).toFixed(1) + '%;"></i></span><span class="narr">' + (hist[k]||0) + '</span></div>').join('');
 // what drives winning (same math as before, now drawn instead of tabulated)
 const units = ['olRun','olPass','rb','qb','rec','passRush','frontRun','coverage','kicker'];
 const xsW = names.map(n=>avgW[n]), unitCorr = units.map(u=>({u, r:corr(names.map(n=>R[n][u]), xsW)}));
 const z = arr=>{ const m = mean_(arr), s = sd_(arr)||1; return arr.map(v=>(v-m)/s); };
 const zU = {}; units.forEach(u=>{ zU[u] = z(names.map(n=>R[n][u])); });
 const ym = mean_(xsW), yC = xsW.map(v=>v-ym), Zm = names.map((n,i)=>units.map(u=>zU[u][i]));
 const beta = ridgeSolve(Zm, yC, 3), lgR = D.L.league;
 unitCorr.forEach(x=>{ x.beta = beta[units.indexOf(x.u)]; });
 const drvRows = unitCorr.slice().sort((a,b)=>Math.abs(b.beta)-Math.abs(a.beta)).slice(0,6).map(x=>{
  const mx = Math.max(...unitCorr.map(y=>Math.abs(y.beta)));
  const w = Math.max(4, Math.abs(x.beta)/mx*100);
  return '<div class="zpb-100bar"><span>' + (UNIT_INFO[x.u] ? UNIT_INFO[x.u].label : x.u) + '</span><span class="tr"><i style="width:' + w.toFixed(0) + '%;"></i></span><span class="score">+' + x.beta.toFixed(2) + '</span></div>';
 }).join('');
 const leagueRows = sorted.map((n,i)=>{
  const t = T[n];
  return '<div class="zpb-100bar' + (n===user ? ' zpb-100merow' : '') + '" style="' + (n===user ? uvars : '') + '">'
   + '<span>' + (i+1) + '. ' + nick(n) + '</span><span class="tr"><i style="width:' + (avgW[n]/Math.max(...sorted.map(x=>avgW[x]))*100).toFixed(1) + '%;"></i></span>'
   + '<span class="score">' + avgW[n].toFixed(1) + '</span></div>';
 }).join('');
 const PN = Object.keys(A.plan), totalPlans = PN.reduce((a,k)=>a+A.plan[k].n, 0);
 const planChips = ['11','12','13'].map(p=>{
  const cells = ['run','neutral','pass'].map(s=>{ const e = A.plan[p+'|'+s]; if(!e || e.n < 30) return ''; return '<span>' + STRAT[s].label + ' ' + pctS(e.w/e.n, 1) + '</span>'; }).join('');
  return cells ? '<div class="zpb-adcard"><span>' + (PERS[p] ? PERS[p].label : p) + '</span><i>' + cells + '</i></div>' : '';
 }).join('');
 const tt = A.totals;
 const ppg = tt.pts/tt.g/2, ypg = tt.yds/tt.g/2;
 const champPct = pctS(mine.champ/N, 1), poPct = pctS(mine.po/N), divPct = pctS(mine.div/N), sbPct = pctS(mine.sbApp/N, 1);
 const back = ()=>{
  try{ setActiveTab('viewDraft', 'tabDraftBtn'); }catch(err){}
  try{
   if(seasonState) renderSeasonTab(document.getElementById('seasonHost') || container);
   else if(typeof renderDraftResults === 'function') renderDraftResults();
  }catch(err){}
  window.scrollTo(0, 0);
 };
 container.innerHTML = '<div class="panel zpb-glowpanel" style="margin-bottom:14px;">'
  + '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;"><h2 style="margin:0;">100-Season Report: ' + user + '</h2>'
  + '<div style="display:flex;gap:8px;flex-wrap:wrap;"><button class="tabbtn" id="rerun100Btn">Re-run</button><button class="resetbtn" id="back100Btn" style="width:auto;padding:10px 24px;">Back to season</button></div></div>'
  + '<div class="zpb-100hero">'
  + '<div class="zpb-100me" style="' + uvars + '"><b>' + myAvg.toFixed(1) + '</b><span>avg wins · #' + myRank + ' of 32</span></div>'
  + '<div><b>' + poPct + '</b><span>playoff seasons</span></div>'
  + '<div><b>' + divPct + '</b><span>division titles</span></div>'
  + '<div><b>' + sbPct + '</b><span>Super Bowl trips</span></div>'
  + '<div><b>' + champPct + '</b><span>championships</span></div>'
  + '</div>'
  + '<div class="zpb-100sec">Your ' + N + ' seasons by record</div><div class="zpb-100bars">' + histRows + '</div>'
  + '<div class="zpb-100sec">The league, by average wins</div><div class="zpb-100bars">' + leagueRows + '</div>'
  + '<div class="zpb-100sec">What drives winning in this model</div><div class="zpb-100bars">' + drvRows + '</div>'
  + (planChips ? '<div class="zpb-100sec">Plans across the league</div><div class="zpb-advgrid">' + planChips + '</div>' : '')
  + '<div class="zpb-100sec">Realism check</div><div class="zpb-advgrid">'
  + '<div class="zpb-adcard"><span>Points / game / team</span><b>' + ppg.toFixed(1) + '</b></div>'
  + '<div class="zpb-adcard"><span>Yards / game / team</span><b>' + Math.round(ypg) + '</b></div>'
  + '<div class="zpb-adcard"><span>Seasons simulated</span><b>' + N + '</b></div>'
  + '</div>'
  + '<p class="narr" style="margin:10px 0 0;">Full seasons (17 games + playoffs) with your drafted rosters. Back to season takes you back to your league.</p>'
  + '</div>';
 const b = document.getElementById('back100Btn'); if(b) b.addEventListener('click', back);
 const rr = document.getElementById('rerun100Btn'); if(rr) rr.addEventListener('click', ()=>{ league100 = null; runLeague100(100, container); });
};
add100Button = function(container){
 if(!draftSim) return;
 const prev = document.getElementById('sim100Btn'); if(prev) prev.remove();
 const tabs = (document.getElementById('draftFinalResults') && document.getElementById('draftFinalResults').querySelector('.tabs'))
  || (container.querySelector ? container.querySelector('.tabs') : null);
 const b = document.createElement('button');
 b.className = 'tabbtn'; b.id = 'sim100Btn'; b.textContent = league100 ? '100-Season Report' : '100 Seasons';
 b.addEventListener('click', ()=>{ if(league100) render100(container); else runLeague100(100, container); });
 if(tabs){ tabs.appendChild(b); }
 else{
  const d = document.createElement('div'); d.style.cssText = 'margin:0 0 12px;text-align:right;';
  d.appendChild(b); container.insertBefore(d, container.firstChild);
 }
};
