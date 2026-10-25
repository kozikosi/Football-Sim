// Wave 11-B verification: Owner rounds 6+7 new features + FB/P math, zero console errors
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/desktop/wt/zai/Football-Sim-Z-post-blue.html';
const SHOT = '/home/z/my-project/desktop/wt/zai/_agents/zai/evidence/z-post-blue';
const fails = [];
const ok = (name, cond, extra='') => { console.log(`[${cond?'ok':'FAIL'}] ${name}${extra?' — '+extra:''}`); if(!cond) fails.push(name); };
const sleep = ms => new Promise(r=>setTimeout(r,ms));

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport:{width:1280,height:900} });
  page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: '+e.message));
  page.on('dialog', d => d.accept());
  await page.goto(FILE); await sleep(1400);

  // ---- 1. FB/Punter math: real wins, sane scale, QB still king ----
  const eng = await page.evaluate(() => {
    const out = {};
    try{
      out.qb90 = slotWins('QB', 90);
      out.fb90 = slotWins('FB', 90);
      out.p90  = slotWins('P', 90);
      out.fb70 = slotWins('FB', 70);
      out.p70  = slotWins('P', 70);
      out.rb90 = slotWins('RB1', 90);
      out.k90  = slotWins('K', 90);
      out.ord = slotWins('QB',90) > slotWins('RB1',90) && slotWins('RB1',90) > slotWins('FB',90);
    }catch(e){ out.err = e.message; }
    return out;
  });
  ok('engine: slotWins usable', !eng.err, eng.err||'');
  ok('engine: FB 90 OVR yields real wins', eng.fb90 > 0.02, 'fb90='+(eng.fb90||0).toFixed(3));
  ok('engine: P 90 OVR yields real wins', eng.p90 > 0.02, 'p90='+(eng.p90||0).toFixed(3));
  ok('engine: FB/P stay below RB1', eng.ord, JSON.stringify({qb:eng.qb90&&eng.qb90.toFixed(2), rb:eng.rb90&&eng.rb90.toFixed(2), fb:eng.fb90&&eng.fb90.toFixed(3), p:eng.p90&&eng.p90.toFixed(3)}));
  ok('engine: 70 OVR FB/P add ~nothing (replacement level)', eng.fb70 < 0.05 && Math.abs(eng.p70) < 0.3, JSON.stringify({fb70:eng.fb70&&eng.fb70.toFixed(3), p70:eng.p70&&eng.p70.toFixed(3)}));

  // ---- 2. guide: glossary (collapsed details -> read innerHTML) + undo rule ----
  const gl = await page.evaluate(() => {
    const b = document.getElementById('tabGuideBtn'); if(b) b.click();
    const body = document.getElementById('guideBody');
    const t = body ? body.innerHTML : '';
    return {
      fb: /Fullback \(FB\)[\s\S]{0,220}run/.test(t),
      punter: /Punter<\/b>[^]*?field position/.test(t),
      roy: /Rookie of the Year/.test(t),
      cpoy: /Comeback Player of the Year/.test(t),
      coy: /Coach of the Year/.test(t),
      undo: /One Undo per draft/.test(t),
      weights: /1000/.test(t)
    };
  });
  ok('guide: Fullback entry explains the lead-blocker share', gl.fb);
  ok('guide: Punter entry explains field position', gl.punter);
  ok('guide: glossary holds Rookie of the Year', gl.roy);
  ok('guide: glossary holds Comeback Player of the Year', gl.cpoy);
  ok('guide: glossary holds Coach of the Year', gl.coy);
  ok('guide: the one-Undo rule is documented', gl.undo);
  await page.screenshot({ path: SHOT + '/v11b-guide.png' });

  // ---- 3. boot a Saints draft + season so the season views exist ----
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if(b) b.click(); });
  await sleep(500);
  await page.evaluate(() => {
    const sel = document.getElementById('draftSlotSelect');
    sel.value = 'New Orleans Saints';
    sel.dispatchEvent(new Event('change', {bubbles:true}));
  });
  await sleep(250);
  await page.locator('#startDraftBtn').click(); await sleep(1200);
  await page.evaluate(() => { const b = document.getElementById('speedInstantBtn'); if(b) b.click();
    const e = [...document.querySelectorAll('button')].find(x=>/sim to end/i.test(x.textContent)); if(e) e.click(); });
  await sleep(3000);
  for (let i=0;i<12;i++){ if(await page.evaluate(() => !!document.getElementById('newDraftBtn'))) break; await sleep(1000); }
  await sleep(4000);
  await page.evaluate(() => { const b = [...document.querySelectorAll('#draftFinalResults .tabs .tabbtn')].find(x=>x.textContent==='SEASON'); if(b) b.click(); });
  await sleep(1200);
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if(b) b.click(); });
  await sleep(2200);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn') || document.getElementById('beginSeasonBtn2'); if(b) b.click(); });
  await sleep(1600);
  ok('boot: season is live', await page.evaluate(() => !!seasonState && seasonState.phase === 'regular'));

  // ---- simulate week 1 so standings, records and the review all exist ----
  await page.evaluate(() => {
    window.__zpbReplaySrc = zpbGameReplay.toString();
    const _gr = zpbGameReplay;
    zpbGameReplay = function(g, ft){
      try{
        const user = seasonUserTeam();
        const side = g.home===user ? 'home' : 'away';
        const evs = g.result && g.result[side+'Events'];
        if(evs && !evs.some(e=>e.type==='FG')){
          evs.push({q:2, t:0.62, pts:3, type:'FG'}, {q:4, t:0.18, pts:3, type:'FG'});
          g.result[side+'Score'] += 6;
        }
      }catch(e){}
      return _gr.apply(this, arguments);
    };
    const b = document.getElementById('simWeekBtn'); if(b) b.click();
  });
  await sleep(2000);
  await page.evaluate(() => { const ov = document.querySelector('.zpb-replay-ov'); if(ov) ov.remove(); });
  ok('boot: week 1 played', await page.evaluate(() => seasonState.schedule.some(g=>g.played)));

  // ---- 4. matchup card: #x <division> / shimmering #1 <conference> ----
  const rec = await page.evaluate(() => {
    const st = computeStandings(seasonState.schedule, teamNames());
    const teams = NFL_DIVISIONS['NFC South'];
    const ranked = teams.slice().sort((a,b)=> st[b].wins - st[a].wins);
    const top = ranked[0];
    const div = divisionOfTeam(top), conf = conferenceOfTeam(top);
    const confTeams = Object.keys(NFL_DIVISIONS).filter(d=>conferenceOfTeam(NFL_DIVISIONS[d][0])===conf).reduce((a,d)=>a.concat(NFL_DIVISIONS[d]),[]);
    const cRank = rankAmong(st, top, confTeams);
    const s = recFull(st, top);
    return { s, shimmer: s.includes('zpb-shm'), divTag: new RegExp('#\\d+ ' + div).test(s), cRank };
  });
  ok('preview: record tag reads #x <division> (or shimmers #1 <conference> when top seed)',
     rec.cRank === 1 ? rec.shimmer : rec.divTag, rec.s);
  ok('preview: the old "2nd in the AFC · 1st in the ..." wording is gone', !/in the (AFC|NFC) /.test(rec.s), rec.s);

  // ---- 5. matchup @ panel: right team's heavy border on the RIGHT; Cinzel names ----
  const mu = await page.evaluate(() => {
    const S = seasonState, user = seasonUserTeam();
    const g = S.schedule.find(x=>x.week===S.currentWeek && (x.home===user||x.away===user));
    const el = document.createElement('div'); document.body.appendChild(el);
    el.innerHTML = g ? matchupCardHTML(g, (gg,k)=>recFull(computeStandings(S.schedule, teamNames()), gg[k])) : '';
    if(!el.children.length){ el.remove(); return { empty:true }; }
    const card = el.querySelector('.zpb-mu');
    const l = getComputedStyle(card.children[0]), r = getComputedStyle(card.children[2]);
    const name = getComputedStyle(el.querySelector('.zpb-mu-name'));
    const res = { lB:l.borderLeftWidth, rB:r.borderRightWidth, rL:r.borderLeftWidth, cinzel:name.fontFamily.includes('Cinzel Decorative') };
    el.remove(); return res;
  });
  ok('preview: left team keeps its left border', mu.empty !== true && mu.lB === '3px', JSON.stringify(mu));
  ok('preview: right team heavy border moved to the RIGHT', mu.empty !== true && mu.rB === '3px' && mu.rL === '0px', JSON.stringify({right:mu.rB, left:mu.rL}));
  ok('preview: matchup names wear Cinzel Decorative', mu.empty !== true && mu.cinzel);

  // ---- 6. advanced stats cards ----
  const adv = await page.evaluate(() => {
    const html = teamAdvancedHTML();
    if(!html) return { empty:true };
    return {
      empty:false,
      clutch: /IN DA CLUTCH/.test(html),
      oldClose: /Close games/.test(html),
      toInt: /Turnover margin<\/span><b>-?\d+<\/b>/.test(html),
      toPerG: /Turnover margin \/ g/.test(html),
      twoPt: /2-Pt Conversions<\/span><b>(\d+ of \d+|\u2014)<\/b>/.test(html),
      successRate: /success rate/.test(html),
      indSkill: /INDIVIDUAL SKILL/.test(html),
      subpar: /SUBPAR BLOCKING/.test(html),
      cov: /EXCELLENT COVERAGE/.test(html),
      beaten: /Beaten the blocker/.test(html)
    };
  });
  if (adv.empty){ ok('stats: advanced panel available', false, 'empty (no played games at this point)'); }
  else {
    ok('stats: IN DA CLUTCH replaces Close games', adv.clutch && !adv.oldClose);
    ok('stats: turnover margin is an integer total', adv.toInt && !adv.toPerG);
    ok('stats: 2-Pt reads x of y, no success rate', adv.twoPt && !adv.successRate);
    ok('stats: sack causes renamed', adv.indSkill && adv.subpar && adv.cov && !adv.beaten);
  }

  // ---- 7. meeting tag gone; plan text omits "balanced" ----
  ok('preview: Same-division tag line deleted', await page.evaluate(() => meetingTagText({divisional:true}) === ''));
  ok('game plan: "11 personnel" without the ", balanced" tail', await page.evaluate(() => {
    const t = planText({pers:'11', strat:'neutral'});
    return t === '11 personnel';
  }));

  // ---- 8. preview player cards: one per line, OVR-only in week 1 ----
  const pvc = await page.evaluate(() => {
    const S = seasonState, user = seasonUserTeam();
    const g = S.schedule.find(x=>x.week===S.currentWeek && (x.home===user||x.away===user));
    const host = document.createElement('div'); document.body.appendChild(host);
    host.innerHTML = starsFaceoffHTML(g);
    const cards = host.querySelectorAll('.zpb-pvcard');
    const ovrOnly = [...host.querySelectorAll('.zpb-pcard-rt i')].every(i=>i.textContent.trim()==='OVR');
    const star = host.querySelectorAll('.zpb-cstar').length;
    const hd = host.querySelectorAll('.zpb-pvhd b').length;
    host.remove();
    return { n: cards.length, ovrOnly, star, hd };
  });
  ok('preview: star cards render for both teams', pvc.n >= 4 && pvc.hd === 2, JSON.stringify(pvc));
  ok('preview: after week 1 the cards carry season ratings, not just OVR', !pvc.ovrOnly, JSON.stringify(pvc));
  ok('preview: 90+ names carry the team-colored shimmering star', pvc.star > 0, 'stars='+pvc.star);

  // ---- 9. key players / POTG (week 1 already simulated) ----
  const kp = await page.evaluate(() => {
    const S = seasonState, user = seasonUserTeam();
    const g = S.schedule.find(x=>x.played && (x.home===user||x.away===user));
    const host = document.createElement('div'); document.body.appendChild(host);
    host.innerHTML = renderGameResultHTML(g, user);
    const potg = host.querySelectorAll('.zpb-potg').length;   // caption removed by W13-10: expect 0
    const cstar = host.querySelectorAll('.kp-grid .zpb-cstar').length;
    const cards = host.querySelectorAll('.kp-grid .zpb-pcard').length;
    const shm = host.querySelectorAll('.kp-grid .zpb-shm').length;
    const old = host.querySelectorAll('.kp-grid .zpb-kprow').length;
    const chips = host.querySelectorAll('.kp-grid .zpb-pcard-stats span').length;
    host.remove();
    return { potg, cards, shm, old, chips, cstar };
  });
  ok('review: exactly one shimmering player of the game (star only, caption retired by W13-10)', kp.potg === 0 && kp.cstar === 1 && kp.shm >= 1, JSON.stringify(kp));
  ok('review: key players use the card language with game stats', kp.cards >= 6 && kp.old === 0 && kp.chips > 0, JSON.stringify(kp));

  // ---- finish the season so the awards objects exist (awards need gp>=8) ----
  await page.evaluate(() => { const b = document.getElementById('simSeasonBtn'); if(b) b.click(); });
  await sleep(1800);
  await page.evaluate(() => { const b = document.getElementById('zpbRestGo'); if(b) b.click(); });
  await sleep(1200);
  ok('boot: regular season complete, awards computed', await page.evaluate(() => !!seasonState.awardsRS));

  // ---- 10. awards: card-ified, no prose; metric board ----
  const aw = await page.evaluate(() => {
    const host = document.createElement('div'); document.body.appendChild(host);
    host.innerHTML = renderRegularAwardsHTML(seasonState.awardsRS, true);
    const cards = host.querySelectorAll('.zpb-awcard').length;
    const apChips = host.querySelectorAll('.zpb-aprow').length;
    const prose = /Skill and defensive players are ranked/.test(host.innerHTML);
    const host2 = document.createElement('div'); document.body.appendChild(host2);
    host2.innerHTML = generateSeasonReviewRaw();
    const met = host2.querySelectorAll('.zpb-met').length;
    const oldParas = host2.querySelectorAll('p.detail-item').length;
    host.remove(); host2.remove();
    return { cards, apChips, prose, met, oldParas };
  });
  ok('awards: regular-season awards wear the player-card style', aw.cards >= 8, 'cards='+aw.cards);
  ok('awards: All-Pro/Pro Bowl rows as chips', aw.apChips >= 28, 'rows='+aw.apChips);
  ok('awards: the long explanation paragraph is gone', !aw.prose);
  ok('review: metric board covers all nine units', aw.met === 9, 'tiles='+aw.met);
  ok('review: old paragraphs removed from the review', aw.oldParas === 0, 'paras='+aw.oldParas);

  const metPop = await page.evaluate(async () => {
    const host = document.createElement('div'); document.body.appendChild(host);
    host.innerHTML = zpbMetricsHTML();
    const tile = host.querySelector('.zpb-met');
    tile.click();
    await new Promise(r=>setTimeout(r,500));
    const pop = document.getElementById('zpbMetPop');
    const txt = pop ? pop.textContent : '';
    const vis = pop ? getComputedStyle(pop).opacity : '0';
    const order = [...host.querySelectorAll('.zpb-met')].map(b=>b.dataset.u).join(',');
    host.remove(); if(pop) pop.remove();
    return { txt, vis, order };
  });
  ok('review: clicking a metric explains it with a rank', metPop.vis !== '0' && /#\d+/.test(metPop.txt), metPop.txt);
  ok('review: metrics sit in draft-board depth-chart order', metPop.order === 'qb,rb,rec,olRun,olPass,passRush,frontRun,coverage,kicker', metPop.order);

  // ---- 11. replay final block ----
  const fin = await page.evaluate(async () => {
    const user = seasonUserTeam();
    const opp = Object.keys(TEAM_DATA).find(t=>t!==user);
    const g = { home:user, away:opp, roundLabel:'', result:{
      homeEvents:[{q:1,t:0.5,pts:7,type:'TD'},{q:3,t:0.5,pts:3,type:'FG'}],
      awayEvents:[{q:2,t:0.5,pts:3,type:'FG'}],
      homeScore:10, awayScore:3, homeStats:{turnovers:1}, awayStats:{turnovers:0} },
      detail:{ home:{players:[{name:'Al Burrell',slot:'QB',group:'QB',team:user,st:{passTD:1},impact:2,line:'210 pass yds, 1 TD'}],takeaways:[{name:'Cy Dell',type:'INT',from:'OPP',q:1,t:0.3}]},
               away:{players:[{name:'Ed Ford',slot:'QB',group:'QB',team:opp,st:{},impact:0,line:'150 pass yds'}]} } };
    zpbGameReplay(g, user);
    for(let i=0;i<40;i++){ if(document.querySelector('.zpb-rep-final')) break; await new Promise(r=>setTimeout(r,1000)); }
    const ov = document.querySelector('.zpb-replay-ov');
    if(!ov) return { present:false };
    const fs = ov.querySelector('.zpb-rep-fscore');
    const you = ov.querySelector('.zpb-rep-you');
    const out = {
      present:true,
      fsTxt: fs ? fs.textContent.replace(/\s+/g,' ').trim() : null,
      youTxt: you ? you.textContent.trim() : null,
      youShimmer: you ? you.classList.contains('zpb-shm') : false,
      star: !!ov.querySelector('.zpb-rep-star'),
      noFinalWord: !/FINAL \u00b7/.test(ov.querySelector('.zpb-rep-final').textContent),
      noWinWords: !/You win|You lose/.test(ov.querySelector('.zpb-rep-final').textContent)
    };
    const sk = ov.querySelector('#zrepSkip'); if(sk) sk.click();
    const ov2 = document.querySelector('.zpb-replay-ov'); if(ov2) ov2.remove();
    return out;
  });
  ok('replay: final score reads ABBR x - y ABBR', fin.fsTxt && /^[A-Z]{2,3} \d+ - \d+ [A-Z]{2,3}$/.test(fin.fsTxt), fin.fsTxt);
  ok('replay: YOU WON shimmers with the star', fin.youTxt === 'YOU WON' && fin.youShimmer && fin.star, JSON.stringify({you:fin.youTxt, shm:fin.youShimmer, star:fin.star}));
  ok('replay: no FINAL prefix, no You-win words', fin.noFinalWord && fin.noWinWords);

  // ---- 12. cinematics + rest summary ----
  const cin = await page.evaluate(() => {
    const src = window.__zpbReplaySrc || Function.prototype.toString.call(zpbGameReplay);
    return { sb60: /isSB \? 60000/.test(src), po30: /roundLabel \? 30000 : 5000/.test(src) };
  });
  ok('cinematics: Super Bowl gets the full minute', cin.sb60);
  ok('cinematics: every regular game 5 s, playoff games 30 s', cin.po30);
  ok('rest summary: no points-for line or bracket line', await page.evaluate(() => {
    const src = Function.prototype.toString.call(zpbRestSummary);
    return !src.includes('points for') && !src.includes('The bracket awaits');
  }));

  // ---- 13. standings: PF/PA integer totals; your division twice the size ----
  const stand = await page.evaluate(() => {
    const host = document.createElement('div'); document.body.appendChild(host);
    host.innerHTML = renderStandingsHTML();
    const heads = [...host.querySelectorAll('.zpb-divmain th')].map(t=>t.textContent.trim());
    const firstRow = host.querySelector('.zpb-divmain tbody tr');
    const cells = [...firstRow.querySelectorAll('td')].map(t=>t.textContent.trim());
    const dec = cells.slice(2,4).some(c=>/\./.test(c));
    const main = document.createElement('div'); main.appendChild(host.querySelector('.zpb-divmain'));
    const minor = document.createElement('div'); minor.appendChild(host.querySelector('.zpb-smdiv'));
    document.body.appendChild(main); document.body.appendChild(minor);
    const mh = main.querySelector('.zpb-divmain tbody tr').getBoundingClientRect().height;
    const shh = minor.querySelector('.zpb-smrow').getBoundingClientRect().height;
    main.remove(); minor.remove(); host.remove();
    return { heads: heads.join('|'), dec, sample: cells.join(' '), ratio: shh ? mh/shh : 0 };
  });
  ok('standings: PF and PA integer totals', stand.heads.includes('PF') && stand.heads.includes('PA') && !stand.dec, stand.sample);
  ok('standings: your division rows read twice the compact ones', stand.ratio >= 1.7, 'ratio='+stand.ratio.toFixed(2));

  // ---- 14. logos ----
  const lg = await page.evaluate(() => ({
    nyg: (zpbTeamLogo('NY Giants')||'').includes('zpb-logo-bright'),
    rams: (zpbTeamLogo('Los Angeles Rams')||'').includes('zpb-logo-bright'),
    kc: !(zpbTeamLogo('Kansas City Chiefs')||'').includes('zpb-logo-bright')
  }));
  ok('logos: Giants crest brightened', lg.nyg);
  ok('logos: Rams crest brightened', lg.rams);
  ok('logos: every other crest untouched', lg.kc);
  await page.screenshot({ path: SHOT + '/v11b-logos.png' });

  // ---- 15. pick analysis + naming + SIM PLAYOFFS (source-level) ----
  ok('pick analysis: OK + Costly Miss verdicts, no wins left', await page.evaluate(() => {
    const src = Function.prototype.toString.call(pickCritiqueHTML);
    return src.includes("['OK', 'zpb-pv-fine']") && src.includes("['Costly Miss', 'zpb-pv-bad']") && !src.includes('wins left');
  }));
  ok('naming: 100 SEASONS is the report title', await page.evaluate(() => Function.prototype.toString.call(render100).includes('100 SEASONS: ')));
  ok('naming: no "Running the 100 Season Sim" remains', await page.evaluate(() => !Function.prototype.toString.call(runLeague100).includes('100 Season Sim')));
  ok('flow: losing a playoff round swaps the button to SIM PLAYOFFS', await page.evaluate(() => {
    const src = Function.prototype.toString.call(renderPlayoffsView);
    return src.includes("myLost?'SIM PLAYOFFS'") && src.includes('advancePlayoffRound');
  }));

  console.log('ERRORS:', errors.length ? errors.slice(0,8) : 'none');
  ok('v11-B: ZERO console errors end to end', errors.length === 0, errors.slice(0,3).join(' | '));
  await browser.close();
  if (fails.length) { console.log('FAILURES:', fails); process.exit(1); }
  console.log('ALL v11-B CHECKS PASSED');
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
