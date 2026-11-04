#!/usr/bin/env python3
"""WAVE 19 · PATCH 6 — During the Game + Season Story badges cinematic.
Boxed chips (FG/TD/yardage/FF/FR/INT), turnover badge = dot + winner abbr,
RUSH wording, Cinzel Decorative across the feed, and the season-story badge
cinematic as the first panel of the Regular Season Review."""
import sys

P = '/home/z/my-project/Football-Sim/Football-Sim-Z-post-blue w19.html'
src = open(P, encoding='utf-8').read()
n = 0

def rep(old, new, tag, count=1):
    global src, n
    c = src.count(old)
    if c != count:
        print(f'FAIL [{tag}]: {c} matches (expected {count})'); sys.exit(1)
    src = src.replace(old, new)
    n += 1
    print(f'ok [{tag}]')

# ---- 6a · the play text becomes chips: FG / yardage boxes, RUSH wording ----
rep(
"""   if(e.type==='FG') return (inf.kicker || 'Kicker') + ' field goal, ' + (window.zpbCineYds ? zpbCineYds(e,'fg') : '');""",
"""   const zpbChip = t=>'<span class="zrl-badge zrl-chip">'+t+'</span>'; // w19 (Owner): the play speaks in boxes
   const zpbYds = s=>{ const m = /(\\d+)\\s*yds/.exec(s||''); return m ? zpbChip(m[1]+'Y') : ''; };
   if(e.type==='FG') return (inf.kicker || 'Kicker') + ' ' + zpbChip('FG') + (window.zpbCineYds ? ' ' + zpbYds(zpbCineYds(e,'fg')) : '');""",
count=2, tag='6a-1 FG chips')

rep(
"""    if(inf.rush.length) return inf.rush.shift() + ' run, ' + (window.zpbCineYds ? zpbCineYds(e,'run') : '');""",
"""    if(inf.rush.length) return inf.rush.shift() + ' rush ' + (window.zpbCineYds ? zpbYds(zpbCineYds(e,'run')) : ''); // w19 (Owner): RUSH, yardage box beside it""",
count=2, tag='6a-2 rush')

rep(
"""return (inf.qbName || 'Quarterback') + ' to ' + inf.recs.shift() + ' ' + (window.zpbCineYds ? zpbCineYds(e,'pass') : '');""",
"""return (inf.qbName || 'Quarterback') + ' to ' + inf.recs.shift() + ' ' + (window.zpbCineYds ? zpbYds(zpbCineYds(e,'pass')) : '');""",
count=4, tag='6a-3 pass chips')

# ---- 6b · turnovers: FF/FR/INT boxes in the text; the badge becomes a dot + the winner's abbr ----
rep(
"""      const tk = (tkQ[ev.side] || []).shift();
      const toTxt = tk ? (tk.type==='INT'
        ? ((tk.name || '') + ' int ' + (tk.from || ''))
        : (tk.recoveredBy && tk.recoveredBy===tk.name
           ? ((tk.name || '') + ' strips ' + (tk.from || '') + ' & ' + tk.name + ' recovers')
           : ((tk.name || '') + ' FF' + (tk.recoveredBy ? ', ' + tk.recoveredBy + ' FR' : ''))))
       : (abbr(g[ev.side==='home'?'away':'home']) + ' gives it up');
      line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
       + '<span class="zrl-team">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + toTxt + '</span>'
       + '<span class="zrl-badge" style="color:' + colOf(g[ev.side]) + ';">TO</span>';""",
"""      const tk = (tkQ[ev.side] || []).shift();
      const zpbTc = t=>'<span class="zrl-badge zrl-chip">'+t+'</span>'; // w19 (Owner): FF / FR / INT wear boxes
      const toTxt = tk ? (tk.type==='INT'
        ? ((tk.name || '') + ' ' + zpbTc('INT') + ' ' + (tk.from || ''))
        : (tk.recoveredBy && tk.recoveredBy===tk.name
           ? ((tk.name || '') + ' ' + zpbTc('FF') + ' & ' + zpbTc('FR'))
           : ((tk.name || '') + ' ' + zpbTc('FF') + (tk.recoveredBy ? ', ' + zpbTc('FR') : ''))))
       : (abbr(g[ev.side==='home'?'away':'home']) + ' gives it up');
      const zpbWinner = ev.side==='home' ? g.away : g.home; // the team that won the ball
      line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
       + '<span class="zrl-team">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + toTxt + '</span>'
       + '<span class="zrl-badge" style="color:' + colOf(zpbWinner) + ';">\\u2022 ' + abbr(zpbWinner) + '</span>'; // w19 (Owner): TO is a dot; the box names who takes over""", '6b turnovers')

# ---- 6c · Cinzel Decorative across the during-the-game feed + chip styling ----
rep(
""".zrl-badge{font-weight:800;font-size:.7rem;letter-spacing:.08em;min-width:30px;text-align:center;""",
""".zpb-replay-ov, .zpb-replay-ov .zpb-rep-line, .zpb-replay-ov .zrl-t, .zpb-replay-ov .zrl-team, .zpb-replay-ov .zrl-play,
.zpb-replay-ov .zrl-sc, .zpb-replay-ov .zrl-badge, .zpb-replay-ov .zpb-rep-q{font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif;} /* w19 (Owner): Cinzel Decorative owns the during-the-game screen */
.zrl-chip{font-weight:800;font-size:.66rem;letter-spacing:.1em;padding:1px 7px;border-radius:6px;border:1px solid currentColor;background:transparent;min-width:0;}
.zrl-badge{font-weight:800;font-size:.7rem;letter-spacing:.08em;min-width:30px;text-align:center;""", '6c feed CSS')

# ---- 6d · shared stat-chip builder (Owner's badge format) ----
rep(
"""function playerBlurb(rec){""",
"""// w19 (Owner): the player-panel format — the stat, then its little boxed label (PassY, TD, INT, 20-0, RushY, SK, QBR, W…)
function zpbStatChipsHTML(rec){
 if(!rec) return '';
 const s = rec.st || {}, g = rec.group, out = [];
 const chip = (v, k)=>'<span class="zpb-schip"><b>' + v + '</b><i>' + k + '</i></span>';
 if(g==='QB'){
  out.push('<span class="zpb-schip zpb-splain"><b>' + fmtN(s.cmp) + '/' + fmtN(s.att) + '</b></span>');
  out.push(chip(fmtN(s.passYds||0), 'PassY'));
  out.push(chip(s.passTD||0, 'TD'));
  out.push(chip(s.int||0, 'INT'));
  out.push(chip(passerRating(s.cmp,s.att,s.passYds,s.passTD||0,s.int||0).toFixed(1), '20-0'));
  if(s.rushYds) out.push(chip(fmtN(s.rushYds), 'RushY'));
  if(s.sackd) out.push(chip(s.sackd, 'SK'));
  if(rec._rating!=null) out.push(chip(rec._rating.toFixed(1), 'QBR'));
 } else if(g==='RB'){
  out.push(chip(fmtN(s.rushYds||0), 'RushY'), chip(s.rushTD||0, 'TD'));
  if(s.recYds) out.push(chip(fmtN(s.recYds), 'RecY'));
  if(s.recTD) out.push(chip(s.recTD, 'RecTD'));
  if(rec._rating!=null) out.push(chip(rec._rating.toFixed(1), 'QBR'));
 } else if(g==='WR'||g==='TE'){
  out.push(chip(fmtN(s.recYds||0), 'RecY'), chip(s.recTD||0, 'TD'));
  if(s.rec) out.push('<span class="zpb-schip zpb-splain"><b>' + fmtN(s.rec) + '/' + fmtN(s.tgt) + '</b></span>');
  if(rec._rating!=null) out.push(chip(rec._rating.toFixed(1), 'QBR'));
 } else if(g==='OL'){
  out.push(chip(fmtN(s.rbk||0), 'RbkY'), chip(s.pk||0, 'PK'), chip(s.sa||0, 'SK'));
  if(rec._rating!=null) out.push(chip(rec._rating.toFixed(1), 'QBR'));
 } else if(g==='K'){
  out.push(chip((s.fg||0) + '/' + (s.fga||s.fg||0), 'FG'), chip(s.pat||0, 'XP'));
  if(rec._rating!=null) out.push(chip(rec._rating.toFixed(1), 'QBR'));
 } else {
  if(s.sack) out.push(chip(s.sack, 'SK'));
  if(s.tkl) out.push(chip(s.tkl, 'TKL'));
  if(s.tfl) out.push(chip(s.tfl, 'TFL'));
  if(s.dint) out.push(chip(s.dint, 'INT'));
  if(s.pd) out.push(chip(s.pd, 'PD'));
  if(s.ff) out.push(chip(s.ff, 'FF'));
  if(rec._rating!=null) out.push(chip(rec._rating.toFixed(1), 'QBR'));
 }
 return out.join('<span class="zpb-sdot">·</span>');
}

function playerBlurb(rec){""", '6d stat chips builder')

# ---- 6e · the season story: badges, star cards, honors, verdict gate ----
rep(
"""function renderRegularReviewView(container){""",
"""// ================= w19 · THE SEASON IN BADGES =================
// The Owner's order: offense badges, a cinematic of the three offensive stars, defense badges,
// the three defenders, the honors your players earned, then the playoff verdict — one beat per badge.
function zpbSeasonStoryHTML(){
 const F = factsBase(), S = F.S, user = F.user, me = F.me, log = F.log, T = F.T, gp = F.gp, t = T[user];
 const U = S.unitRanks[user] || {};
 const conf = conferenceOfTeam(user);
 const seedEntry = S.seeds ? S.seeds[conf].find(x=>x.team===user) : null;
 const made = !!seedEntry;
 const rankOf = (key, asc)=> rankIn(T, key, user, asc);
 const sk = winLossStreaks(log);
 const wins = log.filter(g=>g.margin>0), losses = log.filter(g=>g.margin<0);
 const big = wins.slice().sort((a,b)=>b.margin-a.margin)[0];
 const marquee = wins.slice().sort((a,b)=>F.st[b.opp].wins-F.st[a.opp].wins)[0];
 const worst = losses.slice().sort((a,b)=>a.margin-b.margin)[0];
 const bad = losses.slice().sort((a,b)=>F.st[a.opp].wins-F.st[b.opp].wins)[0];
 const close = log.filter(g=>Math.abs(g.margin)<=8), cw = close.filter(g=>g.margin>0).length;
 const dv = log.filter(g=>g.divisional), dw = dv.filter(g=>g.margin>0).length;
 const home = log.filter(g=>g.home), hw = home.filter(g=>g.margin>0).length;
 const road = log.filter(g=>!g.home), rw = road.filter(g=>g.margin>0).length;
 const poSet = new Set(S.seeds ? S.seeds.AFC.concat(S.seeds.NFC).map(x=>x.team) : []);
 const vs = log.filter(g=>poSet.has(g.opp)), vw = vs.filter(g=>g.margin>0).length;
 const ppg = t.pf/gp, ppgDiff = (t.pf-t.pa)/gp;
 const rec = F.me.wins+'-'+F.me.losses+(F.me.ties?'-'+F.me.ties:'');
 const expW = F.gp * Math.pow(F.me.pf,2.37)/(Math.pow(F.me.pf,2.37)+Math.pow(F.me.pa,2.37));
 const badge = (k, v, cls)=>({k, v, cls: cls||''});
 const OFF = [
  badge('RECORD', rec, 'zpb-sb-hero' + (F.me.losses===0&&F.me.ties===0 ? ' zpb-sb-perfect' : '')),
  seedEntry ? badge(conf.toUpperCase()+' SEED', '#'+seedEntry.seed, 'zpb-sb-gold') : null,
  sk.best.W.n>=3 ? badge('WIN STREAK', sk.best.W.n+' \u00b7 W'+sk.best.W.s+'\u2013'+sk.best.W.e, 'zpb-sb-good') : (sk.best.L.n>=3 ? badge('LOSING STREAK', sk.best.L.n+' \u00b7 W'+sk.best.L.s+'\u2013'+sk.best.L.e, 'zpb-sb-bad') : null),
  badge('PPG MARGIN', (ppgDiff>=0?'+':'\u2212')+Math.abs(ppgDiff).toFixed(1), ppgDiff>=0?'zpb-sb-good':'zpb-sb-bad'),
  badge('WINS PREDICTED', expW.toFixed(1)),
  big ? badge('BLOWOUT WIN', big.fs+'\u2013'+big.os+' '+(big.home?'VS':'@')+' '+nick(big.opp)+' \u00b7 W'+big.week, 'zpb-sb-good') : null,
  (marquee && (!big || marquee.week!==big.week)) ? badge('BEST WIN', marquee.fs+'\u2013'+marquee.os+' VS '+nick(marquee.opp)+' ('+F.st[marquee.opp].wins+'-'+F.st[marquee.opp].losses+') \u00b7 W'+marquee.week, 'zpb-sb-good') : null,
  worst ? badge('WORST LOSS', worst.fs+'\u2013'+worst.os+' '+(worst.home?'VS':'@')+' '+nick(worst.opp)+' \u00b7 W'+worst.week, 'zpb-sb-bad') : null,
  (bad && (!worst || bad.week!==worst.week) && F.st[bad.opp].wins<=7) ? badge('PAIN', 'W'+bad.week+' VS '+nick(bad.opp)+' ('+F.st[bad.opp].wins+'-'+F.st[bad.opp].losses+')', 'zpb-sb-bad') : null,
  close.length>=3 ? badge('ONE SCORE', cw+'\u2013'+(close.length-cw)) : null,
  dv.length ? badge('VS DIVISION', dw+'\u2013'+(dv.length-dw)) : null,
  badge('AT HOME', hw+'\u2013'+(home.length-hw)),
  badge('ON THE ROAD', rw+'\u2013'+(road.length-rw)),
  vs.length>=3 ? badge('VS PLAYOFF TEAMS', vw+'\u2013'+(vs.length-vw)) : null,
  badge('PTS SCORED PER GAME', ppg.toFixed(1)+' \u00b7 #'+rankOf('pf', false)),
  badge('RUSH YARDS PER GAME', Math.round(t.rush/gp)+' \u00b7 #'+rankOf('rush', false)),
  badge('PASS YARDS PER GAME', Math.round(t.pass/gp)+' \u00b7 #'+rankOf('pass', false)),
  badge('RUN BLOCKING', '#'+(U.olRun||32)),
  badge('PASS PROTECTION', '#'+(U.olPass||32)),
  badge('SACKS ALLOWED', t.skTaken+' \u00b7 #'+rankOf('skTaken', true)),
 ].filter(Boolean);
 const DEF = [
  badge('PTS ALLOWED PER GAME', (t.pa/gp).toFixed(1)+' \u00b7 #'+rankOf('pa', true)),
  badge('RUSH YARDS ALLOWED', Math.round(t.rushA/gp)+' \u00b7 #'+rankOf('rushA', true)),
  badge('PASS YARDS ALLOWED', Math.round(t.passA/gp)+' \u00b7 #'+rankOf('passA', true)),
  badge('SACKS', t.skForced+' \u00b7 #'+rankOf('skForced', false)),
  badge('PASS RUSH', '#'+(U.passRush||32)),
  badge('RUN DEFENSE', '#'+(U.frontRun||32)),
  badge('SECONDARY', '#'+(U.coverage||32)),
  badge('TAKEAWAYS', t.take+' \u00b7 #'+rankOf('take', false)),
 ];
 const mine = teamPlayerStats(user);
 const top3 = groups=> mine.filter(r=>groups.includes(r.group)).sort((a,b)=>(b._rating||0)-(a._rating||0)).slice(0,3);
 const offStars = top3(['QB','RB','WR','TE']), defStars = top3(['DL','LB','DB']);
 const qbRec = mine.find(r=>r.group==='QB');
 const factors = [
  ['RUN BLOCKING', U.olRun], ['PASS PROTECTION', U.olPass], ['PASS RUSH', U.passRush], ['RUN DEFENSE', U.frontRun], ['SECONDARY', U.coverage],
  ['QUARTERBACK', qbRec && qbRec._rank ? qbRec._rank : null],
 ].filter(f=>f[1]!=null).map(f=>({k:f[0], r:f[1]}));
 const worstTwo = factors.slice().sort((a,b)=>b.r-a.r).slice(0,2);
 const bestTwo = factors.slice().sort((a,b)=>a.r-b.r).slice(0,2);
 const KEYF = worstTwo.map(f=>({k:f.k, v:'#'+f.r, cls:'zpb-sb-bad'})).concat(bestTwo.map(f=>({k:f.k, v:'#'+f.r, cls:'zpb-sb-good'})));
 // the honors your players earned
 const A = S.awardsRS || null;
 const honorCards = [];
 if(A){
  A.individual.forEach(a=>{
   if(a.c && a.c.team===user) honorCards.push({t:a.title, n:a.c.name, pos:a.c.pos, sub:a.why, gold:true});
   else if(!a.c && a.team===user) honorCards.push({t:a.title, n:(a.coach?a.coach+' \u00b7 ':'')+a.team, sub:a.why, gold:true});
  });
  ['first','second'].forEach((k,i)=>{
   Object.keys(A.allPro[k]||{}).forEach(pos=>{ (A.allPro[k][pos]||[]).forEach(c=>{ if(c.team===user) honorCards.push({t:(i===0?'FIRST-TEAM':'SECOND-TEAM')+' ALL-PRO', n:c.name, pos:pos, gold:i===0}); }); });
  });
  Object.keys(A.proBowl||{}).forEach(cf=>{ Object.keys(A.proBowl[cf]).forEach(pos=>{ (A.proBowl[cf][pos]||[]).forEach(c=>{ if(c.team===user) honorCards.push({t:'PRO BOWL', n:c.name, pos:pos}); }); }); });
 }
 const starCard = (r, i, sideCls)=>`<div class="zpb-scard ${sideCls||''}" style="${(typeof zpbRowVars==='function')?zpbRowVars(user):''}--beat:${i}" data-beat="${i}"><div class="zpb-scard-hd"><b class="${(r.ovr||0)>=90?'zpb-shm':(r.ovr||0)>=85?'zpb-vib':''}">${r.name}</b><span class="zpb-poschip">${r.pos||r.group}</span></div><div class="zpb-schiprow">${zpbStatChipsHTML(r)}</div></div>`;
 const badgeHTML = (b, i)=>`<span class="zpb-sbadge ${b.cls}" style="--beat:${i}" data-beat="${i}"><b>${b.v}</b><i>${b.k}</i></span>`;
 let beat = 0, oHTML = '', dHTML = '', kHTML = '', hHTML = '';
 OFF.forEach(b=>{ oHTML += badgeHTML(b, beat++); });
 oHTML += `<span class="zpb-sbreak" data-beat="${beat++}"></span>`;
 offStars.forEach(r=>{ oHTML += starCard(r, beat++); });
 DEF.forEach(b=>{ dHTML += badgeHTML(b, beat++); });
 dHTML += `<span class="zpb-sbreak" data-beat="${beat++}"></span>`;
 defStars.forEach(r=>{ dHTML += starCard(r, beat++); });
 KEYF.forEach(b=>{ kHTML += badgeHTML(b, beat++); });
 honorCards.forEach(c=>{ hHTML += `<div class="zpb-scard zpb-shonor" style="--beat:${beat}" data-beat="${beat++}"><div class="zpb-scard-hd"><b class="zpb-shm">${c.n}</b><span class="zpb-poschip">${c.pos||''}</span></div><div class="zpb-shonor-t">${c.t}</div>${c.sub?`<div class="zpb-shonor-w">${c.sub}</div>`:''}</div>`; });
 const beats = beat;
 const perfect = F.me.losses===0 && F.me.ties===0;
 return `<div class="panel zpb-storypanel${perfect?' zpb-story-perfect':''}" style="margin-bottom:14px;" id="zpbStoryPanel">
  <div class="zpb-story-kicker zpb-shm">THE SEASON IN BADGES</div>
  <div class="zpb-story-rail" data-total="${beats}">
   <div class="zpb-story-zone">${oHTML}</div>
   <div class="zpb-story-zone">${dHTML}</div>
   ${honorCards.length?`<div class="zpb-story-zone zpb-story-honors">${hHTML}</div>`:''}
   <div class="zpb-story-zone"><span class="zpb-szonehead" style="--beat:${beat++}">KEY FACTORS</span>${kHTML}</div>
  </div>
  <div class="zpb-story-veil" id="zpbStoryVeil">
   <div class="zpb-story-verdict ${made?'zpb-sv-in':'zpb-sv-out'}">
    <div class="zpb-sv-k zpb-shm">${perfect?'THE PERFECT SEASON':(made?'YOU MADE THE PLAYOFFS':'THE PLAYOFFS GO ON WITHOUT YOU')}</div>
    <div class="zpb-sv-big">${perfect?'17-0':(made?('#'+seedEntry.seed+' SEED'):(rec+' · OUT'))}</div>
    <button class="resetbtn" id="zpbStoryGo" style="width:auto;padding:10px 30px;margin-top:14px;">CONTINUE</button>
   </div>
  </div>
 </div>`;
}
// the veil rises once the last badge lands; CONTINUE releases the page
window.zpbWireStory = function(){
 const panel = document.getElementById('zpbStoryPanel'); if(!panel || panel.dataset.zwired) return;
 panel.dataset.zwired = '1';
 const rail = panel.querySelector('.zpb-story-rail');
 const total = rail ? (+rail.dataset.total||0) : 0;
 const veil = panel.querySelector('.zpb-story-veil');
 const show = ()=>{ if(!veil) return; veil.classList.add('zpb-veil-on'); const b = document.getElementById('zpbStoryGo'); if(b) b.focus(); };
 if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) show();
 else setTimeout(show, Math.min(total*1000 + 1200, 90000));
 const go = document.getElementById('zpbStoryGo');
 if(go) go.addEventListener('click', ()=>{ veil.classList.remove('zpb-veil-on'); veil.classList.add('zpb-veil-off'); try{ FX.play('small','On to the playoffs'); }catch(e){} });
};

function renderRegularReviewView(container){""", '6e story builder')

# ---- 6f · the review page: story first, dropdown gone ----
rep(
"""   <p class="dsub" style="margin-top:8px;">${user}: ${s.wins}-${s.losses}${s.ties?'-'+s.ties:''} · ${s.pf} PF · ${s.pa} PA</p>
   <details class="zpb-dd" style="margin-top:8px;"><summary>The season in words</summary><div style="margin-top:8px;">${generateRegularSeasonRecap()}</div></details>
  </div>`;""",
"""   <p class="dsub" style="margin-top:8px;">${user}: ${s.wins}-${s.losses}${s.ties?'-'+s.ties:''} · ${s.pf} PF · ${s.pa} PA</p>
  </div>`;
 html = zpbSeasonStoryHTML() + html; // w19 (Owner): the season in badges IS the first panel — the dropdown is gone""", '6f story first')

# ---- 6g · wire the story after render ----
rep(
""" html += renderRegularAwardsHTML(seasonState.awardsRS, true) + renderReportCardHTML() + pickCritiqueHTML() + renderFieldTableHTML() + renderStatsTabsHTML() + teamAdvancedHTML() + advancedStatsHTML() + renderUserScheduleHTML() + renderStandingsHTML();
 container.innerHTML = html;
 wireScheduleClicks(container); wireStatsTabs();""",
""" html += renderRegularAwardsHTML(seasonState.awardsRS, true) + renderReportCardHTML() + pickCritiqueHTML() + renderFieldTableHTML() + renderStatsTabsHTML() + teamAdvancedHTML() + advancedStatsHTML() + renderUserScheduleHTML() + renderStandingsHTML();
 container.innerHTML = html;
 try{ zpbWireStory(); }catch(e){}
 wireScheduleClicks(container); wireStatsTabs();""", '6g wire story')

# ---- 6h · CSS for the story cinematic ----
rep(
"""/* w19 (Owner): the 20-0 question lives in the header row's top-right corner, with air around every word */""",
"""/* ---- w19: the season in badges ---- */
.zpb-storypanel{position:relative;overflow:hidden;}
.zpb-story-kicker{text-align:center;font-size:0.8rem;letter-spacing:.34em;font-weight:800;margin:2px 0 14px;}
.zpb-story-rail{display:flex;flex-direction:column;gap:14px;}
.zpb-story-zone{display:flex;flex-wrap:wrap;gap:8px;align-items:stretch;}
.zpb-sbadge{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-width:118px;flex:1 0 104px;border:1px solid var(--border);border-radius:12px;padding:8px 10px;background:var(--panel2);opacity:0;transform:translateY(10px) scale(.96);animation:zpbsbeat .7s cubic-bezier(.2,.7,.3,1) forwards;animation-delay:calc(var(--beat,0)*1s);}
.zpb-sbadge b{font-size:1.06rem;font-weight:800;line-height:1.1;font-variant-numeric:tabular-nums;}
.zpb-sbadge i{font-style:normal;font-size:0.56rem;letter-spacing:.16em;color:var(--sub);text-align:center;}
.zpb-sbadge.zpb-sb-gold{border-color:var(--gold3,var(--accent));box-shadow:0 0 14px var(--gold2,var(--accent)) inset;}
.zpb-sbadge.zpb-sb-good b{color:var(--good,var(--accent));}
.zpb-sbadge.zpb-sb-bad b{color:var(--bad,var(--accent2));}
.zpb-sbadge.zpb-sb-hero{min-width:180px;flex:2 0 180px;}
.zpb-sbadge.zpb-sb-hero b{font-size:1.7rem;}
.zpb-sbadge.zpb-sb-perfect{border-color:var(--gold3,var(--accent));background:linear-gradient(160deg,var(--gold2,var(--accent)),var(--panel2));}
.zpb-sbreak{flex-basis:100%;height:0;}
.zpb-szonehead{flex-basis:100%;text-align:center;font-size:0.62rem;letter-spacing:.3em;color:var(--sub);padding:4px 0;}
.zpb-scard{flex:1 0 220px;border:1px solid var(--border);border-radius:14px;padding:10px 12px;background:var(--panel2);opacity:0;transform:translateY(14px);animation:zpbsbeat .8s cubic-bezier(.2,.7,.3,1) forwards;animation-delay:calc(var(--beat,0)*1s);}
.zpb-scard-hd{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;}
.zpb-scard-hd b{font-size:0.95rem;}
.zpb-schiprow{display:flex;flex-wrap:wrap;gap:5px;align-items:center;}
.zpb-schip{display:inline-flex;align-items:baseline;gap:4px;border:1px solid var(--rosehair,var(--border));border-radius:8px;padding:2px 7px;}
.zpb-schip b{font-size:0.8rem;font-weight:800;}
.zpb-schip i{font-style:normal;font-size:0.52rem;letter-spacing:.1em;color:var(--sub);}
.zpb-splain{border-style:dashed;}
.zpb-sdot{color:var(--sub);opacity:.6;}
.zpb-shonor{border-color:var(--gold3,var(--accent));}
.zpb-shonor-t{font-size:0.66rem;letter-spacing:.22em;color:var(--gold3,var(--accent));font-weight:800;}
.zpb-shonor-w{font-size:0.7rem;color:var(--sub);margin-top:4px;}
.zpb-story-perfect{background:linear-gradient(180deg,color-mix(in srgb,var(--gold2,var(--accent)) 16%,var(--panel)),var(--panel));}
.zpb-story-veil{position:fixed;inset:0;z-index:70;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--bg) 72%,transparent);backdrop-filter:blur(3px);opacity:0;pointer-events:none;transition:opacity 1.6s ease;}
.zpb-story-veil.zpb-veil-on{opacity:1;pointer-events:auto;}
.zpb-story-veil.zpb-veil-off{opacity:0;pointer-events:none;}
.zpb-story-verdict{text-align:center;border:1px solid var(--gold3,var(--accent));border-radius:18px;background:var(--panel);padding:26px 42px;box-shadow:0 18px 60px rgba(0,0,0,.35);transform:translateY(14px);transition:transform 1.6s cubic-bezier(.2,.7,.3,1);}
.zpb-veil-on .zpb-story-verdict{transform:translateY(0);}
.zpb-sv-k{font-size:0.8rem;letter-spacing:.3em;font-weight:800;}
.zpb-sv-big{font-size:2.2rem;font-weight:900;margin-top:8px;font-family:'Cinzel Decorative','Cinzel',Georgia,serif;}
@media (prefers-reduced-motion: reduce){
 .zpb-sbadge,.zpb-scard{animation:none;opacity:1;transform:none;}
}
@keyframes zpbsbeat{to{opacity:1;transform:translateY(0) scale(1);}}
/* w19 (Owner): the 20-0 question lives in the header row's top-right corner, with air around every word */""", '6h story CSS')

open(P, 'w', encoding='utf-8').write(src)
print(f'\nPATCH 6 complete: {n} replacements')
