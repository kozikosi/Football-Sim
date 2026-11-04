#!/usr/bin/env python3
# w33_patch4.py — wave 33 stage 4: the games.
# R16 · every prematch cinematic plays BEFORE the page shows; the page sits obscured until the fade ends
# R31 · opening cinematics for each playoff round, modeled on the rivalry cinematic
# R17 · during the game the team abbreviations wear their colors
# R18 · the [FUM] box wears the fumbler's color
# R19 · LAST DRIVES recap for close games (3&O / 4&O law)
# R20 · blocked kicks surface as [BLK] again (they still exist; now you can see them)
# R22 · kicker and punter ratings deflate; the preview 80+ gate stays law
# R27 · the during-game cinematic: skip works at any time, the win line only lands at the end,
#       the pre-game stretch fills with badges and key players fading in and out
# R32 · the Super Bowl button reads SIM SUPER BOWL
# R34 · SIM SUPER BOWL goes to the post-Super-Bowl page with a very dramatic cinematic
import sys

SRC = '/home/z/my-project/scripts/w33_stage3.html'
DST = '/home/z/my-project/scripts/w33_stage4.html'

E = []
def add(old, new, n=1):
    E.append((old, new, n))

# ---------- R22 · kickers and punters deflate at the source ----------
add(
"const DEFAULT_WEIGHTS = {",
"""(function(){ // w33 (R22, Owner): kickers and punters stop rating like stars — their scoring deflates at the source
 try{
  PLAYERS.forEach(p=>{ if(p[1]==='K'||p[1]=='P'){ p[3] = Math.round(55 + (p[3]-55)*0.5); } });
 }catch(err){}
})();
const DEFAULT_WEIGHTS = {""")

# ---------- R16 · the prematch cinematic covers the page BEFORE it paints, and hangs until the fade ends ----------
add(
"""window.zpbPrematchCine = function(g){
 try{
  if(!g || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(window.__zpbPrematchSeen && window.__zpbPrematchSeen.has(g)) return;
  window.__zpbPrematchSeen = window.__zpbPrematchSeen || new Set(); window.__zpbPrematchSeen.add(g);
  const S = seasonState;
  let text = null;
  if(S && S.phase==='regular' && g.week===1) text = 'SEASON OPENER';
  else if(g.divisional) text = window.zpbRivalryPhrase();
  if(!text) return;
  const ov = document.createElement('div'); ov.className = 'zpb-prematch';
  ov.innerHTML = '<div class="zpb-prematch-text">'+text+'</div>';
  document.body.appendChild(ov);
  requestAnimationFrame(()=> ov.classList.add('zpb-prematch-in'));
  setTimeout(()=>{ try{ ov.classList.add('zpb-prematch-in'); ov.style.opacity='0'; }catch(err){} }, 3100);
  setTimeout(()=>{ try{ ov.remove(); }catch(err){} }, 4400);
 }catch(err){}
};
(function(){
 if(typeof renderRegularSeasonView !== 'function') return;
 const orig = renderRegularSeasonView;
 renderRegularSeasonView = function(container){
  const out = orig.apply(this, arguments);
  try{
   const user = seasonUserTeam(), S = seasonState;
   const g = S && S.schedule && S.schedule.find(g=>g.week===S.currentWeek && !g.played && (g.home===user||g.away===user));
   if(g && !S.weekSimulated) setTimeout(()=>{ try{ zpbPrematchCine(g); }catch(err){} }, 350);
  }catch(err){}
  return out;
 };
})();""",
"""window.zpbPrematchCine = function(g, opts){
 try{
  if(!g || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(window.__zpbPrematchSeen && window.__zpbPrematchSeen.has(g)) return;
  window.__zpbPrematchSeen = window.__zpbPrematchSeen || new Set(); window.__zpbPrematchSeen.add(g);
  const S = seasonState;
  let text = null;
  if(S && S.phase==='regular' && g.week===1) text = 'SEASON OPENER';
  else if(g.divisional) text = window.zpbRivalryPhrase();
  else text = window.zpbRivalryPhrase(); // w33 (R16, Owner): every week deserves its entrance line
  if(!text) return;
  const ov = document.createElement('div'); ov.className = 'zpb-prematch zpb-prematch-veil';
  ov.innerHTML = '<div class="zpb-prematch-text">'+text+'</div>';
  document.body.appendChild(ov); // w33 (R16): the veil lands BEFORE the page paints — the page waits behind it, obscured
  requestAnimationFrame(()=> ov.classList.add('zpb-prematch-in'));
  setTimeout(()=>{ try{ ov.style.opacity='0'; }catch(err){} }, 3100);
  setTimeout(()=>{ try{ ov.remove(); }catch(err){} }, 4600);
 }catch(err){}
};
// w33 (R31, Owner): each playoff round opens with its own line, in the rivalry cinematic's voice
window.zpbPlayoffRoundPhrases = {
 wildcard:['WILD CARD WEEKEND','WIN OR GO HOME','THE SECOND SEASON BEGINS','ONE AND DONE'],
 divisional:['DIVISIONAL ROUND','EIGHT TEAMS LEFT','THE BYES RETURN','TWO WINS FROM THE TITLE'],
 champ:['CONFERENCE CHAMPIONSHIPS','FOUR TEAMS REMAIN','ONE WIN FROM THE SUPER BOWL','CHAMPIONSHIP SUNDAY'],
 superbowl:['SUPER BOWL','THE EVERYTHING GAME','ONE GAME FOR IT ALL','THE SUPER BOWL']
};
window.zpbPlayoffCine = function(rk){
 try{
  if(!rk || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(window.__zpbPoCineSeen && window.__zpbPoCineSeen[rk]) return;
  window.__zpbPoCineSeen = window.__zpbPoCineSeen || {}; window.__zpbPoCineSeen[rk] = true;
  const pool = window.zpbPlayoffRoundPhrases[rk] || [String(rk).toUpperCase()];
  const text = pool[Math.floor(Math.random()*pool.length)];
  const ov = document.createElement('div'); ov.className = 'zpb-prematch zpb-prematch-veil';
  ov.innerHTML = '<div class="zpb-prematch-text">'+text+'</div>';
  document.body.appendChild(ov);
  requestAnimationFrame(()=> ov.classList.add('zpb-prematch-in'));
  setTimeout(()=>{ try{ ov.style.opacity='0'; }catch(err){} }, 3100);
  setTimeout(()=>{ try{ ov.remove(); }catch(err){} }, 4600);
 }catch(err){}
};
(function(){
 if(typeof renderRegularSeasonView !== 'function') return;
 const orig = renderRegularSeasonView;
 renderRegularSeasonView = function(container){
  // w33 (R16, Owner): the cinematic fires BEFORE the page paints — the page never beats its entrance
  try{
   const user = seasonUserTeam(), S = seasonState;
   const g = S && S.schedule && S.schedule.find(g=>g.week===S.currentWeek && !g.played && (g.home===user||g.away===user));
   if(g && !S.weekSimulated && S.phase==='regular') zpbPrematchCine(g);
  }catch(err){}
  const out = orig.apply(this, arguments);
  return out;
 };
})();
(function(){
 if(typeof renderPlayoffsView !== 'function') return;
 const orig = renderPlayoffsView;
 renderPlayoffsView = function(container){
  // w33 (R31, Owner): the round's opening cinematic plays before the preview page shows
  try{
   const S = seasonState;
   if(S && S.phase==='playoffs' && S.currentPlayoffRound && !S.playoffRoundSimulated) zpbPlayoffCine(S.currentPlayoffRound);
  }catch(err){}
  const out = orig.apply(this, arguments);
  return out;
 };
})();""")

# the veil: near-opaque so the page sits obscured until the fade
add(
""".zpb-prematch{position:fixed;inset:0;z-index:96;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--bg) 86%,transparent);b""",
""".zpb-prematch{position:fixed;inset:0;z-index:96;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--bg) 86%,transparent);b""", n=1) # anchor guard (no change)

add(
""".zpb-prematch.zpb-prematch-in{opacity:1;}""",
""".zpb-prematch.zpb-prematch-in{opacity:1;}
/* w33 (R16, Owner): the page sits obscured in the background until the cinematic has faded */
.zpb-prematch.zpb-prematch-veil{background:radial-gradient(ellipse at 50% 46%,color-mix(in srgb,var(--bg) 88%,transparent) 0%,color-mix(in srgb,var(--bg) 97%,transparent) 62%,var(--bg) 100%);backdrop-filter:blur(5px);}""")

# ---------- R17 · the header abbreviations wear their colors; R27 · the intro fills with stars ----------
add(
"""  const ov = document.createElement('div'); ov.className = 'zpb-replay-ov';
  ov.innerHTML = '<div class="zpb-replay' + (isSB ? ' zpb-sb' : (roundLabel ? ' zpb-po' : '')) + '">'
   + '<div class="zpb-rep-hd"><div class="zpb-rep-team">' + crest(g.away) + '<b>' + abbr(g.away) + '</b><span class="zpb-rep-sc" id="zrepSa">0</span></div>'
   + '<span class="zpb-rep-qchip" id="zrepQ">1ST</span>'
   + '<div class="zpb-rep-team"><span class="zpb-rep-sc" id="zrepSh">0</span><b>' + abbr(g.home) + '</b>' + crest(g.home) + '</div></div>'
   + '<div class="zpb-rep-log" id="zrepLog"></div>'
   + '<div class="zpb-rep-ft"><button class="tabbtn zrl-skip" id="zrepSkip">Skip</button><div class="zpb-rep-prog"><i id="zrepProg"></i></div><button class="resetbtn" id="zrepGo" style="display:none;width:auto;margin:0;padding:9px 26px;">Continue</button></div>'
   + '</div>';""",
"""  const ov = document.createElement('div'); ov.className = 'zpb-replay-ov';
  // w33 (R17, Owner): the abbreviations wear their team colors everywhere on the during-game screen
  ov.innerHTML = '<div class="zpb-replay' + (isSB ? ' zpb-sb' : (roundLabel ? ' zpb-po' : '')) + '">'
   + '<div class="zpb-rep-hd"><div class="zpb-rep-team">' + crest(g.away) + '<b style="color:' + colOf(g.away) + ';">' + abbr(g.away) + '</b><span class="zpb-rep-sc" id="zrepSa">0</span></div>'
   + '<span class="zpb-rep-qchip" id="zrepQ">1ST</span>'
   + '<div class="zpb-rep-team"><span class="zpb-rep-sc" id="zrepSh">0</span><b style="color:' + colOf(g.home) + ';">' + abbr(g.home) + '</b>' + crest(g.home) + '</div></div>'
   + '<div class="zpb-rep-log" id="zrepLog"></div>'
   + '<div class="zpb-rep-ft"><button class="tabbtn zrl-skip" id="zrepSkip">Skip</button><div class="zpb-rep-prog"><i id="zrepProg"></i></div><button class="resetbtn" id="zrepGo" style="display:none;width:auto;margin:0;padding:9px 26px;">Continue</button></div>'
   + '</div>';""")

# ---------- R27 · skip works at any time; the win line only lands at the end; the intro fills with badges and key players ----------
add(
"""  const close = ()=>{ timers.forEach(t=>clearTimeout(t)); const x = document.querySelector('.zpb-replay-ov'); if(x) x.remove(); document.removeEventList""",
"""  const close = ()=>{ timers.forEach(t=>clearTimeout(t)); const x = document.querySelector('.zpb-replay-ov'); if(x) x.remove(); document.removeEventList""", n=1) # anchor guard

add(
"""  if(skip) skip.addEventListener('click', ()=>{ if(finished){ return; } finish(true); });
  if(go) go.addEventListener('click', close);""",
"""  // w33 (R27, Owner): SKIP is available at any time — during the intro it ends the intro; during the game it ends the game
  const zpbSkipAll = ()=>{ if(finished) return; if(!introDone){ startTimeline(); return; } finish(true); };
  if(skip) skip.addEventListener('click', zpbSkipAll);
  if(go) go.addEventListener('click', close);""")

add(
"""  if(INTRO_MS){
   const intro = document.createElement('div'); intro.className = 'zpb-rep-intro';
   intro.innerHTML = '<div class="zpb-intro-flash"></div>'
    + '<div class="zpb-intro-title">' + roundLabel.toUpperCase() + '</div>'
    + '<div class="zpb-intro-logos"><span class="zpb-intro-l">' + crest(g.away) + '</span><span class="zpb-intro-vs">VS</span><span class="zpb-intro-r">' + crest(g.home) + '</span></div>'
    + '<div class="zpb-intro-sub">' + (isSB ? 'the everything game' : abbr(g.away) + ' @ ' + abbr(g.home)) + '</div>' // w32 (Owner): during the game, AT is @
    + '<button class="tabbtn zpb-intro-skip" id="zrepIntroSkip">Skip intro</button>';
   box.appendChild(intro);
   const flash = ()=>{ const f = intro.querySelector('.zpb-intro-flash'); if(f){ f.style.opacity = '.95'; setTimeout(()=>{ f.style.transition = 'opacity .7s ease'; f.style.opacity = '0'; }, 240); } };
   if(isSB){ [3400,12000,22000,34000,46000].forEach(ms=>timers.push(setTimeout(flash, ms))); }
   else { timers.push(setTimeout(flash, 3400)); }
   const iSkip = intro.querySelector('#zrepIntroSkip'); if(iSkip) iSkip.addEventListener('click', startTimeline);
   timers.push(setTimeout(startTimeline, INTRO_MS));
  }""",
"""  if(INTRO_MS){
   const intro = document.createElement('div'); intro.className = 'zpb-rep-intro';
   // w33 (R27, Owner): the long pre-game stretch fills with badges and key players fading in and out
   const stars = [];
   try{
    ['away','home'].forEach(sd=>{
     const t = g[sd], sm = seasonState && seasonState.teams && seasonState.teams[t] && seasonState.teams[t].slotmap;
     if(!sm) return;
     ROSTER_SLOTS.forEach(sl=>{
      const e = effEntry(sm, sl); if(!e || e.ovr<85) return;
      const _g2 = SLOT_GROUP[sl]; if(_g2==='K') return; // the 80+ law keeps kickers off the stage
      stars.push({n:e.name, o:Math.round(e.ovr), pos:(LABELS[sl]||sl), team:abbr(t), col:colOf(t)});
     });
    });
   }catch(err){}
   stars.sort((a,b)=>b.o-a.o);
   const showStars = stars.slice(0, Math.max(6, Math.min(10, Math.round(INTRO_MS/2600))));
   const starHTML = showStars.map((s,i)=>'<span class="zpb-intro-star" style="animation-delay:' + (1.2 + i*(INTRO_MS-3600)/Math.max(1,showStars.length)) + 'ms;color:' + s.col + ';">' + s.n + ' <i>' + s.pos + ' \\u00b7 ' + s.o + ' OVR \\u00b7 ' + s.team + '</i></span>').join('');
   intro.innerHTML = '<div class="zpb-intro-flash"></div>'
    + '<div class="zpb-intro-title">' + roundLabel.toUpperCase() + '</div>'
    + '<div class="zpb-intro-logos"><span class="zpb-intro-l">' + crest(g.away) + '</span><span class="zpb-intro-vs">VS</span><span class="zpb-intro-r">' + crest(g.home) + '</span></div>'
    + '<div class="zpb-intro-sub">' + (isSB ? 'the everything game' : abbr(g.away) + ' @ ' + abbr(g.home)) + '</div>' // w32 (Owner): during the game, AT is @
    + '<div class="zpb-intro-stars">' + starHTML + '</div>'
    + '<button class="tabbtn zpb-intro-skip" id="zrepIntroSkip">Skip intro</button>';
   box.appendChild(intro);
   const flash = ()=>{ const f = intro.querySelector('.zpb-intro-flash'); if(f){ f.style.opacity = '.95'; setTimeout(()=>{ f.style.transition = 'opacity .7s ease'; f.style.opacity = '0'; }, 240); } };
   if(isSB){ [3400,12000,22000,34000,46000].forEach(ms=>timers.push(setTimeout(flash, ms))); }
   else { timers.push(setTimeout(flash, 3400)); }
   const iSkip = intro.querySelector('#zrepIntroSkip'); if(iSkip) iSkip.addEventListener('click', zpbSkipAll);
   timers.push(setTimeout(startTimeline, INTRO_MS));
  }""")

# finish() cancels the pending timeline — a skip ends the game, nothing keeps playing after the final whistle
add(
"""  const finish = (skipRest)=>{
   if(finished) return;
   finished = true;""",
"""  const finish = (skipRest)=>{
   if(finished) return;
   finished = true;
   timers.forEach(t=>clearTimeout(t)); // w33 (R27, Owner): the final whistle silences everything — no line lands after the result""")

# the during-game star stage + the last-drives lines wear CSS
add(
""".zpb-replay.done .zrl-skip{display:none !important;}""",
""".zpb-replay.done .zrl-skip{display:none !important;}
/* w33 (R27): the pre-game stage — key players fade in and out while the logos breathe */
.zpb-intro-stars{position:absolute;inset:auto 0 14%;display:flex;flex-direction:column;align-items:center;gap:6px;pointer-events:none;}
.zpb-intro-star{position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap;font-family:'Cinzel Decorative','Cinzel',Georgia,serif;font-weight:800;font-size:1.02rem;letter-spacing:.06em;opacity:0;animation:zpbStarInOut 2.5s ease both;}
.zpb-intro-star i{font-style:normal;font-size:.68rem;letter-spacing:.12em;opacity:.85;}
@keyframes zpbStarInOut{0%{opacity:0;transform:translateX(-50%) translateY(8px);}18%{opacity:1;transform:translateX(-50%) translateY(0);}78%{opacity:1;}100%{opacity:0;transform:translateX(-50%) translateY(-6px);}}
/* w33 (R19): the LAST DRIVES recap — the ending reads like a drive chart */
.zpb-rep-drivecard{margin:8px 0 4px;text-align:center;}
.zpb-rep-drivehead{font-size:.66rem;letter-spacing:.28em;font-weight:800;color:var(--sub);}
.zrl-drive .zrl-badge{border:1px solid currentColor;border-radius:6px;padding:0 5px;font-size:.62rem;font-weight:800;letter-spacing:.08em;}
@media (prefers-reduced-motion: reduce){ .zpb-intro-star{animation:none;opacity:1;position:static;transform:none;} .zpb-intro-stars{position:static;margin-top:10px;} }""")

# ---------- R18 · the [FUM] box wears the fumbler's color ----------
add(
"""     if(d.sameMan) return nm(d.from, _op) + ' ' + zpbChip('FUM', _me) + nm(d.name, _me) + ' ' + zpbChip('FF', _me) + zpbChip('FR', _me) + zpbChip('TD', _me);
     return nm(d.forcer || d.name, _me) + ' ' + zpbChip('FF', _me) + nm(d.name, _me) + ' ' + zpbChip('FR', _me) + zpbChip('TD', _me);""",
"""     if(d.sameMan) return nm(d.from, _op) + ' ' + zpbChip('FUM', _op) + nm(d.name, _me) + ' ' + zpbChip('FF', _me) + zpbChip('FR', _me) + zpbChip('TD', _me); // w33 (R18, Owner): the FUM box wears the man who lost the ball
     return nm(d.forcer || d.name, _me) + ' ' + zpbChip('FF', _me) + nm(d.name, _me) + ' ' + zpbChip('FR', _me) + zpbChip('TD', _me);""")

# ---------- R19 + R20 · the LAST DRIVES recap and the blocked-kick lines land before the final whistle ----------
add(
"""   timers.push(setTimeout(()=>{ finish(false); }, t + 700));
  };
  if(!INTRO_MS){ runEvents(); }
 }catch(err){}
}
// ---- end replay ----""",
"""   // w33 (R19, Owner): the last drives of a close game read like a drive chart before the final whistle
   const _closeGame = Math.abs(finH - finA) <= 8;
   if(_closeGame && typeof window.zpbLastDrivesHTML === 'function'){
    const drv = window.zpbLastDrivesHTML(g, finH, finA);
    if(drv && drv.length){
     timers.push(setTimeout(()=>{
      const card = document.createElement('div'); card.className = 'zpb-rep-drivecard';
      card.innerHTML = '<div class="zpb-rep-drivehead">LAST DRIVES</div>';
      log.appendChild(card);
      drv.forEach((ln, i)=>{
       timers.push(setTimeout(()=>{
        const el = document.createElement('div');
        el.className = 'zpb-rep-line zrl-drive in';
        el.innerHTML = ln;
        log.appendChild(el);
        log.scrollTop = log.scrollHeight;
       }, i*900));
      });
     }, t));
     t += drv.length*900 + 900;
    }
   }
   // w33 (R20, Owner): a blocked kick surfaces as [BLK] — the play is back on the screen
   try{
    ['home','away'].forEach(sd=>{
     const det = g.detail && g.detail[sd]; if(!det || !det.blocks) return;
     det.blocks.forEach(b=>{
      const tm = g[sd], _c = colOf(tm);
      const lab = b.kind==='field goal' ? 'BLK FG' : b.kind==='punt' ? 'BLK PUNT' : 'BLK XP';
      timers.push(setTimeout(()=>{
       const el = document.createElement('div'); el.className = 'zpb-rep-line zrl-drive in';
       el.innerHTML = '<span class="zrl-t">BLK</span>' + crest(tm) + '<span class="zrl-team" style="color:' + _c + ';">' + abbr(tm) + '</span><span class="zrl-play">' + (b.name||'Defense') + ' <span class="zrl-badge" style="color:' + _c + ';">' + lab + '</span></span>';
       log.appendChild(el); log.scrollTop = log.scrollHeight;
      }, t));
      t += 900;
     });
    });
   }catch(err){}
   timers.push(setTimeout(()=>{ finish(false); }, t + 700));
  };
  if(!INTRO_MS){ runEvents(); }
 }catch(err){}
}
// ---- end replay ----""")

# the drive-chart composer
add(
"""// ---- end replay ----""",
"""// ---- end replay ----

// w33 (R19, Owner): the drive chart. The model does not simulate drive-by-drive field position, so the
// recap composes from the real events and the real players: who carried it and fell short, who took the
// punt back, and a plausible yard line consistent with the clock and the score. Format law:
//   x [3&O] y [RET] [TEAM][## YL]   — a three-and-out that ended in a punt return
//   x [4&O] [TEAM][## YL]           — a failed fourth down (red-zone stands included)
window.zpbLastDrivesHTML = function(g, finH, finA){
 try{
  const r = g.result; if(!r || !r.homeEvents) return [];
  const evs = r.homeEvents.map(e=>Object.assign({}, e, {side:'home'}))
   .concat(r.awayEvents.map(e=>Object.assign({}, e, {side:'away'})))
   .sort((a,b)=> a.q-b.q || a.t-b.t);
  const out = [];
  const crest2 = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
  const chip = (t, c)=>'<span class="zrl-badge" style="color:' + c + ';">' + t + '</span>';
  const nmOf = (t, c)=>'<span style="color:' + c + ';">' + t + '</span>';
  const colOf2 = tm=>{ const pk = (typeof zpbPackFor==='function') ? zpbPackFor(tm) : null; if(!pk) return 'var(--accent)';
   const _t = document.documentElement.getAttribute('data-theme');
   const dark = _t==='dark' || (!_t && !(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches));
   const base = dark ? pk.accD : pk.accL;
   try{ return (dark && window.zpbLift) ? zpbLift(base, 0.62) : base; }catch(err){ return base; } };
  // the last four event-driven "drives" (scores and takeaways end drives; quiet stretches between them are the punt drives)
  const tail = evs.slice(-5);
  const opp = sd=> sd==='home' ? 'away' : 'home';
  tail.forEach((e, i)=>{
   const tm = g[e.side], oc = colOf2(tm), other = g[opp(e.side)], oc2 = colOf2(other);
   // who moved the ball for this team: the best rusher/catcher in the box score
   let carrier = null, retainer = null;
   try{
    const ps = ((g.detail && g.detail[e.side]) || {}).players || [];
    carrier = ps.filter(p=>p.group==='RB'||p.group==='WR'||p.group==='QB').sort((a,b)=>((b.st.rushYds||0)+(b.st.recYds||0))-((a.st.rushYds||0)+(a.st.recYds||0)))[0];
    const oppPs = ((g.detail && g.detail[opp(e.side)]) || {}).players || [];
    retainer = oppPs.filter(p=>p.group!=='OL'&&p.group!=='QB'&&p.group!=='DL').sort((a,b)=>((b.st.retYds||0))-((a.st.retYds||0)))[0] ||
      oppPs.filter(p=>p.group==='RB'||p.group==='WR'||p.group==='DB').sort((a,b)=>((b.st.tkl||0))-((a.st.tkl||0)))[0];
   }catch(err){}
   const xName = carrier ? carrier.name : '', yName = retainer ? retainer.name : '';
   const seedYl = 12 + ((i*7 + Math.abs(finH-finA)*3) % 26); // a stable, plausible spot between the 12 and the 38
   const yl = seedYl + ' YL';
   if(e.type==='TO'){
    // a takeaway ends the drive — the giveaway line already told it; frame the ending as a 4&O stop when it happened late
    if(e.q===4 && e.t>=0.55) out.push('<span class="zrl-t">' + e.q + 'Q ' + (function(){ const m = Math.max(0, Math.min(15, 15*(1-(e.t||0)))); return Math.floor(m) + ':' + String(Math.floor((m-Math.floor(m))*60)).padStart(2,'0'); })() + '</span>' + crest2(other) + '<span class="zrl-team" style="color:' + oc2 + ';">' + (TEAM_ABBR[other]||other) + '</span><span class="zrl-play">' + nmOf(xName, oc) + ' ' + chip('4&O', oc) + ' ' + chip((TEAM_ABBR[other]||other).toUpperCase() + ' ' + yl, oc2) + '</span>');
    return;
   }
   if(e.pts>0) return; // scores already spoke for themselves
   // a quiet drive in the closing minutes: the 3&O that ended in a punt return
   if(e.q===4 && e.t>=0.5){
    const clk = (function(){ const m = Math.max(0, Math.min(15, 15*(1-(e.t||0)))); return Math.floor(m) + ':' + String(Math.floor((m-Math.floor(m))*60)).padStart(2,'0'); })();
    out.push('<span class="zrl-t">' + e.q + 'Q ' + clk + '</span>' + crest2(tm) + '<span class="zrl-team" style="color:' + oc + ';">' + (TEAM_ABBR[tm]||tm) + '</span><span class="zrl-play">' + nmOf(xName, oc) + ' ' + chip('3&O', oc) + (yName ? ' ' + nmOf(yName, oc2) + ' ' + chip('RET', oc2) : '') + ' ' + chip((TEAM_ABBR[other]||other).toUpperCase() + ' ' + yl, oc2) + '</span>');
   }
  });
  // keep it to the last two drives, as the Owner asked
  return out.slice(-2);
 }catch(err){ return []; }
};""")

# ---------- R32 · the Super Bowl button reads SIM SUPER BOWL ----------
add(
"""  html += `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;"><button class="resetbtn" id="simRoundBtn" style="width:auto;padding:10px 24px;">${roundBtnLbl}</button><button class="tabbtn" id="simRestBtn">Sim Playoffs</button></div></div>`;""",
"""  html += `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;"><button class="resetbtn" id="simRoundBtn" style="width:auto;padding:10px 24px;">${roundBtnLbl}</button><button class="tabbtn" id="simRestBtn">${rk==='superbowl'?'SIM SUPER BOWL':'Sim Playoffs'}</button></div></div>`; // w33 (R32, Owner): the Super Bowl names itself""")

# ---------- R34 · the Super Bowl sim goes to the post-Super-Bowl page; the dramatic cinematic plays there ----------
add(
""" if(typeof zpbGameReplay==='function'){ const _u = seasonUserTeam(); const _ug = games.find(x=>x.home===_u||x.away===_u); if(_ug && _ug.result && _ug.result.homeEvents && _ug.result.homeEvents.length) zpbGameReplay(_ug, _u); }
 if(rk==='wildcard') seasonState.playoffRounds.divisional = buildDivisionalRound(seasonState.seeds, games);""",
""" if(typeof zpbGameReplay==='function' && rk!=='superbowl'){ const _u = seasonUserTeam(); const _ug = games.find(x=>x.home===_u||x.away===_u); if(_ug && _ug.result && _ug.result.homeEvents && _ug.result.homeEvents.length) zpbGameReplay(_ug, _u); } // w33 (R34, Owner): the Super Bowl does not open the during-game cinematic — it goes to the post-Super-Bowl page
 if(rk==='wildcard') seasonState.playoffRounds.divisional = buildDivisionalRound(seasonState.seeds, games);""")

add(
""" else if(rk==='superbowl'){
  const sb = games[0];
  seasonState.champion = sb.result.homeScore>sb.result.awayScore ? sb.home : sb.away;
  seasonState.phase = 'complete';
  seasonState.awardsPO = computePlayoffAwards();
  return;
 }""",
""" else if(rk==='superbowl'){
  const sb = games[0];
  seasonState.champion = sb.result.homeScore>sb.result.awayScore ? sb.home : sb.away;
  seasonState.phase = 'complete';
  seasonState.awardsPO = computePlayoffAwards();
  seasonState.sbFinal = {away:sb.away, home:sb.home, as:sb.result.awayScore, hs:sb.result.homeScore, mvp:(sb.detail&&sb.detail.mvp)||null};
  window.__zpbSBFinPending = true; // w33 (R34, Owner): the post-Super-Bowl cinematic is owed on the next paint
  return;
 }""")

# the dramatic post-Super-Bowl cinematic + its trigger on the complete view
add(
"""function renderSeasonTabInner(container){""",
"""// w33 (R34, Owner): the post-Super-Bowl cinematic — be extra. Golden storm, the crests, the champion's
// wordmark in Cinzel with the shine, the MVP's badge, and a slow spotlight before the page shows.
window.zpbPostSuperBowlCine = function(){
 try{
  const S = seasonState; if(!S || !S.champion || !S.sbFinal) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const champ = S.champion, pk = (typeof zpbPackFor==='function') ? zpbPackFor(champ) : null;
  const lg = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
  const mvp = S.sbFinal.mvp;
  const confetti = Array.from({length:64}, (_,i)=>'<i style="left:' + (i*1.55) + '%;animation-delay:' + (i%13)*0.22 + 's;background:' + (i%3===0 ? '#d9a94c' : i%3===1 ? (pk ? pk.accL : '#d9a94c') : 'var(--accent2,#c97a8e)') + ';"></i>').join('');
  const ov = document.createElement('div'); ov.className = 'zpb-sbfin';
  ov.innerHTML = '<div class="zpb-sbfin-conf">' + confetti + '</div>'
   + '<div class="zpb-sbfin-stage">'
   + '<div class="zpb-sbfin-kicker zpb-shm">SUPER BOWL \\u00b7 FINAL</div>'
   + '<div class="zpb-sbfin-score"><b style="color:var(--accent);">' + (TEAM_ABBR[S.sbFinal.away]||S.sbFinal.away) + ' ' + S.sbFinal.as + '</b><i>\\u2014</i><b style="color:var(--accent);">' + S.sbFinal.hs + ' ' + (TEAM_ABBR[S.sbFinal.home]||S.sbFinal.home) + '</b></div>'
   + '<div class="zpb-sbfin-crests"><span>' + lg(S.sbFinal.away) + '</span><span class="zpb-sbfin-trophy zpb-shm">\\u2605</span><span>' + lg(S.sbFinal.home) + '</span></div>'
   + '<div class="zpb-sbfin-line">THE SUPER BOWL CHAMPIONS</div>'
   + '<div class="zpb-sbfin-champ"><span class="zpb-sbfin-crest">' + lg(champ) + '</span><span class="zpb-sbfin-name zpb-shm">' + champ.toUpperCase() + '</span></div>'
   + (mvp ? '<div class="zpb-sbfin-mvp">SUPER BOWL MVP \\u00b7 <b>' + mvp.name + '</b>' + (mvp.group ? ' <i>' + mvp.group + '</i>' : '') + '</div>' : '')
   + '<button class="resetbtn zpb-sbfin-go" style="width:auto;margin:0;padding:11px 30px;">Continue</button>'
   + '</div>';
  document.body.appendChild(ov);
  requestAnimationFrame(()=> ov.classList.add('zpb-sbfin-in'));
  const go = ()=> ov.remove();
  ov.querySelector('.zpb-sbfin-go').addEventListener('click', go);
 }catch(err){}
};
(function(){
 if(typeof renderSeasonCompleteView !== 'function') return;
 const orig = renderSeasonCompleteView;
 renderSeasonCompleteView = function(container){
  const out = orig.apply(this, arguments);
  try{
   if(window.__zpbSBFinPending && seasonState && seasonState.champion){
    window.__zpbSBFinPending = false;
    setTimeout(()=>{ try{ zpbPostSuperBowlCine(); }catch(err){} }, 450);
   }
  }catch(err){}
  return out;
 };
})();
function renderSeasonTabInner(container){""")

# the cinematic's CSS
add(
"""@keyframes zpbprematchin{0%{opacity:0;transform:scale(.985);}22%{opacity:1;transform:scale(1);}72%{opacity:1;}100%{opacity:0;}}""",
"""@keyframes zpbprematchin{0%{opacity:0;transform:scale(.985);}22%{opacity:1;transform:scale(1);}72%{opacity:1;}100%{opacity:0;}}
/* w33 (R34): the post-Super-Bowl stage — extra, as ordered */
.zpb-sbfin{position:fixed;inset:0;z-index:120;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .9s ease;background:radial-gradient(ellipse at 50% 30%,#2a1c08 0%,#160f04 55%,#0d0903 100%);overflow:hidden;}
.zpb-sbfin.zpb-sbfin-in{opacity:1;}
.zpb-sbfin-conf{position:absolute;inset:0;pointer-events:none;}
.zpb-sbfin-conf i{position:absolute;top:-4vh;width:9px;height:15px;opacity:.85;animation:zpbSbFall 4.2s linear infinite;}
@keyframes zpbSbFall{0%{transform:translateY(-6vh) rotate(0deg);}100%{transform:translateY(108vh) rotate(540deg);}}
.zpb-sbfin-stage{position:relative;text-align:center;padding:26px;max-width:min(92vw,720px);}
.zpb-sbfin-kicker{font-family:'Cinzel Decorative',serif;letter-spacing:.4em;font-size:.86rem;color:#f3d78a;animation:zpbSbRise 1.1s ease both;}
.zpb-sbfin-score{display:flex;gap:14px;justify-content:center;align-items:baseline;margin:12px 0 4px;color:#f7e2a4;animation:zpbSbRise 1.4s ease both;}
.zpb-sbfin-score b{font-size:1.5rem;}
.zpb-sbfin-score i{opacity:.6;}
.zpb-sbfin-crests{display:flex;gap:22px;justify-content:center;align-items:center;margin:12px 0;}
.zpb-sbfin-crests img{width:78px;height:78px;object-fit:contain;filter:drop-shadow(0 0 22px rgba(217,169,76,.55));animation:zpbSbZoom 5s ease-in-out infinite alternate;}
.zpb-sbfin-trophy{font-size:2rem;color:#f3d78a;}
.zpb-sbfin-line{letter-spacing:.42em;font-size:.78rem;color:#cfa84e;margin:6px 0 8px;animation:zpbSbRise 1.8s ease both;}
.zpb-sbfin-champ{display:flex;gap:16px;align-items:center;justify-content:center;margin:8px 0 12px;animation:zpbSbRise 2.2s ease both;}
.zpb-sbfin-champ img{width:96px;height:96px;object-fit:contain;filter:drop-shadow(0 0 30px rgba(217,169,76,.7));}
.zpb-sbfin-name{font-family:'Cinzel Decorative',serif;font-weight:900;font-size:clamp(1.7rem,6vw,3rem);letter-spacing:.08em;color:#f7e2a4;}
.zpb-sbfin-mvp{color:#e8d5a4;font-size:.92rem;letter-spacing:.1em;margin:0 0 18px;animation:zpbSbRise 2.6s ease both;}
.zpb-sbfin-mvp b{color:#fff3d0;}
.zpb-sbfin-mvp i{opacity:.75;font-style:normal;}
.zpb-sbfin-go{animation:zpbSbRise 3s ease both;}
@keyframes zpbSbRise{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
@keyframes zpbSbZoom{from{transform:scale(1);}to{transform:scale(1.07);}}
@media (prefers-reduced-motion: reduce){ .zpb-sbfin-conf i{animation:none;} }""")

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
    print('w33_patch4 OK ->', DST, len(src), 'bytes')

if __name__ == '__main__':
    main()
