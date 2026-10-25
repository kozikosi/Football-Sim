// ---- v9 part 2: schedule tiles, lineups, preview strip, stats cards, merged
//      advanced stats, pick analysis visual, season-in-words graphics, flows.

// team dropdowns: every team listed in its own colors, logo beside the name
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
   btn.innerHTML = logo(v) + '<span style="' + (st ? 'color:' + st.accL : '') + '">' + (v || '—') + '</span>';
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
})();

// schedule tiles: no team names, @/vs under the logo, current matchup shimmering, W/L fills
renderUserScheduleHTML = function(){
 const user = seasonUserTeam();
 const mine = seasonState.schedule.filter(g=>g.home===user || g.away===user).sort((a,b)=>a.week-b.week);
 const lg = tm=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(tm) : '';
 const uvars = (typeof zpbRowVars==='function') ? zpbRowVars(user) : '';
 const cw = seasonState.currentWeek;
 const tiles = mine.map(g=>{
  const home = g.home===user, opp = home ? g.away : g.home;
  const isNow = (g.week===cw && !g.played && seasonState.phase==='regular');
  let res = '', cls = 'zst-tile';
  if(g.played){
   const fs = home ? g.result.homeScore : g.result.awayScore, os = home ? g.result.awayScore : g.result.homeScore;
   const o = fs>os ? 'W' : fs<os ? 'L' : 'T';
   cls += ' zst-played zst-' + o.toLowerCase();
   res = '<span class="zst-res"><b class="zst-mine">' + fs + '</b><span>–</span><span>' + os + '</span><em class="zst-o">' + o + '</em></span>';
  } else if(isNow){ cls += ' zst-now'; }
  return '<div class="' + cls + '" data-wk="' + g.week + '" style="' + uvars + '" title="Week ' + g.week + (g.divisional ? ' · division game' : '') + '">'
   + '<span class="zst-wk">' + g.week + '</span><span class="zst-logo">' + lg(opp) + '</span>'
   + '<span class="zst-at">' + (home ? 'vs' : '@') + '</span>' + res + '</div>';
 }).join('');
 return `<div class="panel zpb-glowpanel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Your Schedule &amp; Results <span class="narr" style="font-weight:400;">(tap a played week for the recap)</span></h4><div class="zst-grid">${tiles}</div><div class="zst-details">${mine.filter(g=>g.played && g.summary).map(g=>`<div class="zst-detail" id="sg-detail-${g.week}" style="display:none;"><div class="detailwrap">${renderGameResultHTML(g, user)}</div></div>`).join('')}</div></div>`;
};

// lineups: crest header above each side, no parenthetical; winner wears the
// team color; everyone above 85 wears the 20-0 shimmer
renderLineupTableHTML = function(slotmapLeft, slotmapRight, ownerLeft, ownerRight){
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
};
renderLineupComparisonHTML = function(homeTeam, awayTeam){
 const homeSlotmap = seasonState.teams[homeTeam].slotmap, awaySlotmap = seasonState.teams[awayTeam].slotmap;
 const lg = tm=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(tm) : '';
 const stA = (typeof zpbRowVars==='function') ? zpbRowVars(awayTeam) : '';
 const stH = (typeof zpbRowVars==='function') ? zpbRowVars(homeTeam) : '';
 const hd = '<div class="zpb-lu-row zpb-lu-hd"><span class="zpb-lu-cell zpb-lu-l" style="' + stA + '">' + lg(awayTeam) + ' <b>' + nick(awayTeam) + '</b></span><span class="zpb-lu-c"></span><span class="zpb-lu-cell zpb-lu-r" style="' + stH + '"><b>' + nick(homeTeam) + '</b> ' + lg(homeTeam) + '</span></div>';
 return `<div class="panel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Lineups</h4>${hd}${renderLineupTableHTML(awaySlotmap, homeSlotmap, awayTeam, homeTeam)}</div>`;
};

// preview strip: no "model" text, no logos in the edge chips, edges aligned by
// side, parallelogram bar with the numbers on either side and no % sign
function zpbPreviewStripHTML(g){
 try{
  const S = seasonState; if(!S || typeof topMatchupSwings !== 'function') return '';
  const sw = topMatchupSwings(g.home, g.away, 2, g);
  const hp = sw.projHome, ap = sw.projAway, tot = Math.max(hp+ap, 0.1);
  const pw = Math.min(0.86, Math.max(0.14, hp/tot));
  const lg = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
  const chip = e=>{
   const owner = e.ownerSide==='home' ? g.home : g.away;
   const su = (typeof shortUnit==='function') ? shortUnit(e.unit) : e.unit;
   return '<span class="zpb-edge">' + su + ' <b>' + (e.pts>=0 ? '+' : '\u2212') + Math.abs(e.pts).toFixed(1) + '</b></span>';
  };
  const aChips = (sw.list||[]).filter(e=>e.ownerSide!=='home').slice(0,2).map(chip).join('');
  const hChips = (sw.list||[]).filter(e=>e.ownerSide==='home').slice(0,2).map(chip).join('');
  return '<div class="zpb-strip">'
   + '<div class="zpb-strip-team">' + lg(g.away) + '<b>' + nick(g.away) + '</b></div>'
   + '<div class="zpb-strip-mid"><span class="zpb-strip-pct">' + Math.round((1-pw)*100) + '</span>'
   + '<div class="zpb-strip-bar"><i style="width:' + (pw*100).toFixed(1) + '%;"></i></div>'
   + '<span class="zpb-strip-pct">' + Math.round(pw*100) + '</span></div>'
   + '<div class="zpb-strip-team zpb-strip-h"><b>' + nick(g.home) + '</b>' + lg(g.home) + '</div>'
   + '</div>'
   + ((aChips || hChips) ? '<div class="zpb-strip-edges"><span class="zpb-edges-a">' + aChips + '</span><span class="zpb-edges-h">' + hChips + '</span></div>' : '');
 }catch(err){ return ''; }
}

// season stats: player cards instead of a lateral stat list
userStatsInner = function(){
 const user = seasonUserTeam();
 const rows = teamPlayerStats(user).sort((a,b)=> GROUP_ORDER.indexOf(a.group)-GROUP_ORDER.indexOf(b.group) || ((b.ovr||0)-(a.ovr||0)) || b.impact-a.impact);
 if(!rows.length) return `<p class="narr">${STATS_KIND==='po' ? (playoffMissed() ? 'Your team missed the playoffs.' : 'Your team has not played a playoff game yet, so there are no playoff totals.') : 'No games played yet — your players\' season totals will build here as you go.'}</p>`;
 const uvars = (typeof zpbRowVars==='function') ? zpbRowVars(user) : '';
 const cards = rows.map(r=>{
  const chips = seasonStatLine(r.group, r.st).split(', ').filter(Boolean).slice(0, 6);
  const rtg = r._rating!=null ? r._rating.toFixed(1) : '—';
  return '<div class="zpb-pcard" style="' + uvars + '">'
   + '<div class="zpb-pcard-hd"><b class="' + (r.ovr > 85 ? 'zpb-shm' : '') + '">' + r.name + '</b><span class="zpb-poschip">' + r.group + '</span></div>'
   + '<div class="zpb-pcard-rt">' + rtg + '<i>#' + (r._rank || '–') + ' at ' + r.group + ' · ' + r.gp + ' GP</i></div>'
   + '<div class="zpb-pcard-stats">' + chips.map(c=>'<span>' + c + '</span>').join('') + '</div>'
   + '</div>';
 }).join('');
 return '<div class="zpb-pcards">' + cards + '</div>';
};

// the two advanced menus become one panel: metric cards + sack-cause bars
teamAdvancedHTML = function(){
 const S = seasonState, user = seasonUserTeam(), T = {};
 teamNames().forEach(t=>{ T[t] = {g:0, to:0, tk:0, top:0, run:0, plays:0, td:0, fg:0, tpa:0, tpm:0, close:0, closeW:0, ret:0}; });
 S.schedule.forEach(g=>{
  if(!g.played || !g.result || !g.detail) return;
  ['home','away'].forEach(sd=>{
   const t = g[sd], x = T[t], r = g.result, st = sd==='home' ? r.homeStats : r.awayStats, ost = sd==='home' ? r.awayStats : r.homeStats;
   const my = sd==='home' ? r.homeScore : r.awayScore, op = sd==='home' ? r.awayScore : r.homeScore;
   x.g++; x.to += st.turnovers; x.tk += ost.turnovers; x.top += st.top; x.run += st.rushYards; x.plays += st.rushYards + st.passYards;
   (r[sd+'Events']||[]).forEach(e=>{ if(e.type==='TD'){ x.td++; if(e.pts===8 || (e.pts===6 && e.tpTry)){ x.tpa++; if(e.pts===8) x.tpm++; } } else if(e.type==='FG'){ x.fg++; } });
   if(Math.abs(my-op) <= 7){ x.close++; if(my > op) x.closeW++; }
   const rt = g.detail[sd].returner; if(rt) x.ret += (rt.kry||0) + (rt.pry||0);
  });
 });
 const names = teamNames().filter(t=>T[t].g > 0); if(!names.length) return '';
 const me = T[user]; if(!me || !me.g) return '';
 const leagueAvg = f=> mean_(names.map(n=>f(T[n])));
 const fmtTop = s=> Math.floor(s/60) + ':' + String(Math.round(s%60)).padStart(2, '0');
 const toM = (me.tk-me.to)/me.g, toLg = leagueAvg(x=>(x.tk-x.to)/x.g);
 const rushSh = me.run/Math.max(me.plays, 1)*100, rushLg = leagueAvg(x=>x.run/Math.max(x.plays, 1))*100;
 const twoPt = me.tpa ? Math.round(me.tpm/me.tpa*100) + '% of ' + me.tpa : '—';
 const close = me.close ? me.closeW + '–' + (me.close-me.closeW) : '—';
 const cards = [
  ['Turnover margin / g', (toM>=0 ? '+' : '') + toM.toFixed(2), 'league ' + (toLg>=0 ? '+' : '') + toLg.toFixed(2), toM > toLg],
  ['Time of possession', fmtTop(me.top/me.g), 'per game', null],
  ['Rushing share', rushSh.toFixed(0) + '%', 'league ' + rushLg.toFixed(0) + '%', null],
  ['Touchdowns / g', (me.td/me.g).toFixed(2), 'all touchdowns', me.td/me.g > leagueAvg(x=>x.td/x.g)],
  ['Field goals / g', (me.fg/me.g).toFixed(2), 'made', null],
  ['2-Pt Conversions', twoPt, 'success rate', null],
  ['Close games', close, 'within 7 points', me.close ? me.closeW*2 > me.close : null],
  ['Return yards / g', Math.round(me.ret/me.g), 'kick + punt', null]
 ].map(c=>'<div class="zpb-adcard' + (c[3]===true ? ' zpb-adgood' : c[3]===false ? ' zpb-adbad' : '') + '"><span>' + c[0] + '</span><b>' + c[1] + '</b><i>' + c[2] + '</i></div>').join('');
 // sack causes, drawn as bars
 const tally = (team, key)=>{ const c = {rush:0, ol:0, cov:0}; S.schedule.forEach(g=>{ if(!g.played || !g.detail) return; ['home','away'].forEach(sd=>{ if(g[sd]===team && g.detail[sd].sackCauses) g.detail[sd].sackCauses[key].forEach(x=>{ c[x] = (c[x]||0)+1; }); }); }); return c; };
 const made = tally(user, 'made'), taken = tally(user, 'taken');
 const nm = made.rush + made.ol + made.cov, nt = taken.rush + taken.ol + taken.cov;
 const barRow = (lab, v, n)=> n ? '<div class="zpb-sackbar"><span>' + lab + '</span><span class="zsb-tr"><i style="width:' + Math.max(2, v/n*100).toFixed(0) + '%;"></i></span><span class="score">' + Math.round(v/n*100) + '%</span></div>' : '';
 let sackHTML = '';
 if(nm || nt){
  sackHTML = '<div class="zpb-100sec">Sacks made — why they fell</div>'
   + (nm ? barRow('Beaten the blocker', made.rush, nm) + barRow('Line broke down', made.ol, nm) + barRow('Coverage held', made.cov, nm) : '<p class="narr" style="margin:4px 0;">No sacks recorded yet.</p>')
   + '<div class="zpb-100sec">Sacks taken — why they happened</div>'
   + (nt ? barRow('Rusher won', taken.rush, nt) + barRow('Line broke down', taken.ol, nt) + barRow('Coverage held', taken.cov, nt) : '<p class="narr" style="margin:4px 0;">No sacks allowed yet.</p>');
 }
 return '<div class="panel zpb-glowpanel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Advanced stats</h4>'
  + '<div class="zpb-advgrid">' + cards + '</div>' + sackHTML + '</div>';
};
advancedStatsHTML = function(){ return ''; };

// draft pick analysis: floating tinted rows + summary chips, no prose, no table lines
pickCritiqueHTML = function(inner){
 if(typeof draftSim === 'undefined' || !draftSim || !draftSim.log) return '';
 const rows = pickCritique(); if(!rows.length) return '';
 const verdict = r=> r.regret <= 0.05 ? ['Best available', 'zpb-pv-best'] : r.regret <= 0.2 ? ['Fine', 'zpb-pv-fine'] : r.regret <= 0.45 ? ['Left value behind', 'zpb-pv-mid'] : ['Costly miss', 'zpb-pv-bad'];
 const body = rows.map(r=>{
  const vt = verdict(r);
  return '<div class="zpb-pvrow ' + vt[1] + '">'
   + '<span class="zpb-pv-rd narr">R' + r.round + '.' + String(r.pickInRound).padStart(2, '0') + '</span>'
   + '<span class="zpb-pv-p"><b>' + r.player[0] + '</b><i>' + (POS_DISPLAY[r.player[1]] || r.player[1]) + ' · ' + slotName(r.slot) + '</i></span>'
   + '<span class="zpb-pv-val score">' + fmtWar(r.v) + '</span>'
   + '<span class="zpb-pv-alt">' + (r.best && !r.wasBest ? '<b>' + r.best.p[0] + '</b><i>' + (POS_DISPLAY[r.best.p[1]] || r.best.p[1]) + ' · ' + fmtWar(r.best.v) + '</i>' : '<i>your pick</i>') + '</span>'
   + '<span class="zpb-pv-verdict">' + vt[0] + '</span>'
   + '</div>';
 }).join('');
 const misses = rows.slice().sort((a,b)=>b.regret-a.regret).filter(r=>r.regret > 0.2).slice(0, 2);
 const good = rows.filter(r=>r.wasBest && r.v >= 0.5).slice(0, 3);
 const chips = [];
 if(good.length) chips.push('<div class="zpb-pvchip zpb-pv-good"><b>Best calls</b><span>' + good.map(r=>r.player[0]).join(' · ') + '</span></div>');
 if(misses.length) chips.push('<div class="zpb-pvchip zpb-pv-miss"><b>Costliest</b><span>' + misses.map(r=>r.player[0] + ' (' + r.regret.toFixed(1) + ' wins left)').join(' · ') + '</span></div>');
 return '<div class="panel zpb-glowpanel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Draft pick analysis</h4>'
  + (chips.length ? '<div class="zpb-pvchips">' + chips.join('') + '</div>' : '')
  + '<div class="zpb-pvhd"><span>Pick</span><span>Player</span><span>Value</span><span>Best on the board</span><span>Verdict</span></div>'
  + body + '</div>';
};

// game review key players: floating rows, star beside the game ball, shimmer rules
renderKeyPlayersHTML = function(g){
 const mvp = g.detail.mvp;
 const r = g.result || {};
 const winnerSide = r.homeScore > r.awayScore ? 'home' : (r.awayScore > r.homeScore ? 'away' : '');
 function card(team, sd){
  const rows = notablePlayers(sd).map(p=>{
   const star = p.name===mvp.name && p.team===mvp.team;
   const shine = star || (winnerSide && sd===winnerSide);
   const st = (typeof zpbRowVars==='function' && p.team) ? zpbRowVars(p.team) : '';
   return '<div class="zpb-kprow' + (star ? ' kp-mvp' : '') + '" style="' + st + '">'
    + '<span class="pos">' + p.group + '</span>'
    + '<span class="zpb-kpmain"><b class="' + (shine ? 'zpb-shm' : '') + '">' + p.name + '</b>' + (star ? '<span class="zpb-kpstar">★</span>' : '')
    + '<i>' + p.line.replace(/, /g, ' · ') + '</i></span></div>';
  }).join('');
  return '<div class="kp-card"><div class="kp-title">' + team + '</div>' + rows + '</div>';
 }
 return '<h4 style="margin:14px 0 8px;">Key Players</h4><div class="kp-grid">' + card(g.away, g.detail.away) + card(g.home, g.detail.home) + '</div>';
};

// "why better or worse than the ratings" — graphic tiles, not prose paragraphs
whyBoxHTML = function(F){
 let parts = [];
 try{
  const dw = (defenseWhy(F)||'').trim();
  parts = [offenseWhy(F), (dw && !/^<b>Why/.test(dw) ? '<b>Defense:</b> ' + dw : dw).replace(/^\s*<b>Why (worse|better) than the ratings\?<\/b>/, m=>'<b>Defense, ' + (/worse/.test(m) ? 'worse' : 'better') + ' than the ratings:</b>'), recordWhy(F), passRushWhy(F)].filter(Boolean);
 }catch(e){ parts = []; }
 if(!parts.length) return '';
 const tile = p=>{
  const m = /^<b>([^<]+)<\/b>\s*([\s\S]*)$/.exec(p.trim());
  if(!m) return '<div class="zpb-whytile"><p class="detail-item">' + p + '</p></div>';
  return '<div class="zpb-whytile"><b>' + m[1] + '</b><p class="detail-item">' + m[2] + '</p></div>';
 };
 return '<div class="zpb-whygrid">' + parts.map(tile).join('') + '</div>';
};

// season-in-words: glance tiles on top, paragraphs fade in and out on scroll
function zpbGlanceHTML(){
 const user = seasonUserTeam(), S = seasonState;
 const st = computeStandings(S.schedule, teamNames())[user];
 const gp = Math.max(st.wins + st.losses + st.ties, 1);
 const conf = conferenceOfTeam(user);
 let seed = null, made = null;
 if(S.seeds && S.seeds[conf]){ const e = S.seeds[conf].find(x=>x.team===user); if(e){ seed = e.seed; made = true; } }
 const tile = (k, v, cls)=>'<div class="zpb-gltile ' + (cls||'') + '"><b>' + v + '</b><span>' + k + '</span></div>';
 return '<div class="zpb-glance">'
  + tile('Record', st.wins + '-' + st.losses + (st.ties ? '-' + st.ties : ''))
  + (seed ? tile('Seed', '#' + seed, 'zpb-gl-gold') : '')
  + tile('Points for / g', (st.pf/gp).toFixed(1))
  + tile('Points allowed / g', (st.pa/gp).toFixed(1))
  + tile('Diff', (st.diff>=0 ? '+' : '') + st.diff, st.diff > 0 ? 'zpb-gl-good' : '')
  + (made!==null ? tile('Playoffs', made ? 'Clinched' : 'Out', made ? 'zpb-gl-good' : '') : '')
  + '</div>';
}
(function(){
 if(typeof generateRegularSeasonRecap !== 'function') return;
 const orig = generateRegularSeasonRecap;
 generateRegularSeasonRecap = function(){
  try{ return zpbGlanceHTML() + orig(); }catch(err){ return orig(); }
 };
})();
document.addEventListener('toggle', function(e){
 const d = e.target;
 if(!(d instanceof HTMLDetailsElement) || !d.open || !d.classList || !d.classList.contains('zpb-dd')) return;
 requestAnimationFrame(()=>{
  try{
   d.querySelectorAll('p, .detail-item, .zpb-gltile, .zpb-whytile').forEach(el=>{ if(!el.classList.contains('zpb-fade')) el.classList.add('zpb-fade'); });
   if(typeof zpbFadeScan === 'function') zpbFadeScan();
  }catch(err){}
 });
}, true);

// season review: strengths & weaknesses tiles, no weaknesses when you won it all,
// and a "Try again to 20-0?" panel that starts a new draft
function zpbStrengthsHTML(){
 const user = seasonUserTeam(), S = seasonState;
 const R = S.unitRatings[user], lg = S.league, rk = S.unitRanks[user];
 const units = Object.keys(UNIT_INFO).filter(u=>u !== 'kicker');
 const rows = units.map(u=>({u, d:R[u]-lg[u], r:rk[u]})).sort((a,b)=>b.d-a.d);
 const tile = (x, good)=>'<div class="zpb-sttile ' + (good ? 'zpb-stgood' : 'zpb-stbad') + '"><b>' + shortUnit(x.u) + '</b><span>#' + x.r + ' in the league</span><i>' + (x.d>=0 ? '+' : '−') + Math.abs(x.d).toFixed(1) + ' vs league</i></div>';
 const champ = S.champion === user;
 return '<div class="zpb-strengths"><div class="zpb-strow"><h5>Strengths</h5>' + rows.slice(0, 3).map(x=>tile(x, true)).join('') + '</div>'
  + (champ ? '' : '<div class="zpb-strow"><h5>Weaknesses</h5>' + rows.slice(-2).reverse().map(x=>tile(x, false)).join('') + '</div>')
  + '</div>';
}
(function(){
 if(typeof generateSeasonReviewRaw !== 'function') return;
 const orig = generateSeasonReviewRaw;
 generateSeasonReviewRaw = function(){
  const user = seasonUserTeam(), S = seasonState;
  const champ = S.champion === user;
  let inner = orig();
  if(champ){
   inner = inner.replace(/<p class="detail-item">(?:(?!<\/p>)[\s\S])*(?:weakness|cost the|holes|price tag|trailed)(?:(?!<\/p>)[\s\S])*<\/p>/gi, '');
  }
  const tryAgain = '<div class="zpb-tryagain"><button type="button" id="zpbTryAgainBtn">Try again to <b class="zpb-shine">20-0</b><span class="zpb-cygq" style="color:var(--accent);">?</span></button></div>';
  return zpbStrengthsHTML() + inner + tryAgain;
 };
})();
document.addEventListener('click', function(e){
 if(e.target && e.target.id === 'zpbTryAgainBtn'){
  confirmDialog('This discards your drafted roster and any season in progress and takes you back to the draft setup.', 'Yes, run it back', startNewDraftFlow);
 }
});

// "Start A New Draft" at the bottom of the live draft
(function(){
 if(typeof renderDraftLive !== 'function') return;
 const orig = renderDraftLive;
 renderDraftLive = function(){
  const out = orig.apply(this, arguments);
  try{
   const host = document.getElementById('draftLive');
   if(host && !host.querySelector('#zpbNewDraftBtn')){
    const w = document.createElement('div'); w.className = 'zpb-newdraft';
    w.innerHTML = '<button class="tabbtn" id="zpbNewDraftBtn">Start A New Draft</button>';
    host.appendChild(w);
    w.querySelector('#zpbNewDraftBtn').addEventListener('click', ()=>{
     confirmDialog('This discards your drafted roster and takes you back to the draft setup.', 'Yes, start a new draft', startNewDraftFlow);
    });
   }
  }catch(err){}
  return out;
 };
})();

// losing in the playoffs goes straight to the season-complete page
(function(){
 if(typeof advancePlayoffRound !== 'function') return;
 const orig = advancePlayoffRound;
 advancePlayoffRound = function(){
  orig();
  try{
   if(!seasonState || seasonState.phase !== 'playoffs') return;
   const u = seasonUserTeam();
   if(typeof userPlayoffStatus !== 'function') return;
   if(userPlayoffStatus(u).status === 'eliminated'){
    window.__zpbSilent = true;
    try{
     let guard = 0;
     while(seasonState.phase === 'playoffs' && guard++ < 8){
      simulatePlayoffRound();
      if(seasonState.phase !== 'playoffs') break;
      orig();
     }
    } finally { window.__zpbSilent = false; }
   }
  }catch(err){}
 };
})();

// awards and report-card tables become floating cards after each season render
function zpbCardify(){
 try{
  document.querySelectorAll('.panel').forEach(p=>{
   const t = (p.querySelector('h3, h4, summary') || {}).textContent || '';
   if(/award|mvp|report card|honors/i.test(t)) p.classList.add('zpb-cardify');
  });
 }catch(err){}
}
(function(){
 if(typeof renderSeasonTab !== 'function') return;
 const orig = renderSeasonTab;
 renderSeasonTab = function(){
  const out = orig.apply(this, arguments);
  try{ zpbCardify(); }catch(err){}
  return out;
 };
})();

// helpers used by the style tables (sort by personnel) and pick analysis
function persOrd(t){
 const m = /(\d+)\s*personnel/.exec(t || '');
 const order = ['1', '11', '12', '13'];
 const i = order.indexOf(m ? m[1] : '');
 return i < 0 ? 9 : i;
}
