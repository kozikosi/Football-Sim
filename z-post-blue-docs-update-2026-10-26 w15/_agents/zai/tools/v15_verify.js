// Z-post-blue v15 verification: fix-list round — cinematic beats, instant Skip,
// '@' + star-act intros, series cleanup, add-only fade, two-column key players,
// team-colored comparison scores, brightened dark accents, named turnovers.
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/out-v15/Football-Sim-Z-post-blue.html';
const SHOT = '/home/z/my-project/out-v15/evidence';
const fs = require('fs');
fs.mkdirSync(SHOT, { recursive: true });
const fails = [];
const ok = (name, cond, extra='') => { console.log(`[${cond?'ok':'FAIL'}] ${name}${extra?' — '+extra:''}`); if(!cond) fails.push(name); };
const sleep = ms => new Promise(r=>setTimeout(r,ms));

const FAKE_GAME = {
  home: 'Kansas City Chiefs', away: 'Chicago Bears',
  result: { homeScore: 27, awayScore: 17, ot: false,
    homeEvents: [ {q:1,t:0.9,pts:7,type:'TD'}, {q:2,t:0.5,pts:3,type:'FG'}, {q:3,t:0.7,pts:7,type:'TD'}, {q:4,t:0.8,pts:7,type:'TD'} ],
    awayEvents: [ {q:1,t:0.8,pts:3,type:'FG'}, {q:3,t:0.4,pts:7,type:'TD'} ],
    homeStats: { turnovers: 1 }, awayStats: { turnovers: 1 } },
  detail: {
    home: { players: [
        {name:'P. Mahomes', group:'QB', st:{passTD:2, recYds:0, rushYds:0, rushTD:0, recTD:0}},
        {name:'T. Kelce', group:'TE', st:{recTD:1, recYds:90, rushYds:0, rushTD:0}},
        {name:'C. Jones', group:'DL', st:{}},
        {name:'N. Bolton', group:'LB', st:{}} ],
      takeaways: [ {type:'INT', name:'T. Mathieu', from:'J. Fields'} ] },
    away: { players: [
        {name:'J. Fields', group:'QB', st:{}},
        {name:'D. Swift', group:'RB', st:{rushYds:70}},
        {name:'J. Johnson', group:'DB', st:{}} ],
      takeaways: [] }
  }
};

async function openReplay(page, game, focus){
  return page.evaluate(([g, f]) => { zpbGameReplay(g, f); return !!document.querySelector('.zpb-replay-ov'); }, [game, focus]);
}
const replayState = page => page.evaluate(() => {
  const ov = document.querySelector('.zpb-replay-ov'); if(!ov) return { open:false };
  return { open:true, lines: ov.querySelectorAll('.zpb-rep-line').length,
    banners: ov.querySelectorAll('.zpb-rep-q').length, fin: ov.querySelectorAll('.zpb-rep-final').length,
    sa: (ov.querySelector('#zrepSa')||{}).textContent, sh: (ov.querySelector('#zrepSh')||{}).textContent,
    skip: (ov.querySelector('#zrepSkip')||{}).style ? ov.querySelector('#zrepSkip').style.display : '',
    go: !!ov.querySelector('#zrepGo') && ov.querySelector('#zrepGo').style.display !== 'none',
    intro: !!ov.querySelector('.zpb-rep-intro'), pvrows: ov.querySelectorAll('.zpb-intro-pvrow').length,
    subTxt: (ov.querySelector('.zpb-intro-sub')||{}).textContent || '',
    toTxts: [...ov.querySelectorAll('.zrl-to .zrl-play')].map(e=>e.textContent),
    fgBadge: (ov.querySelector('.zrl-badge')||{}).outerHTML || '' };
});

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport:{width:1280,height:900} });
  page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: '+e.message));
  page.on('dialog', d => d.accept());
  await page.goto(FILE); await sleep(1000);

  // ---- 1. cinematic: WELCOME alone, then the stack, then the gate ----
  const colCheck = await page.evaluate(() => {
    const lift = c => { const m = /^#([0-9a-f]{6})$/i.exec(c||''); if(!m) return c; const n = parseInt(m[1],16);
      const r=(n>>16)&255, g=(n>>8)&255, b=n&255; const L=(0.2126*r+0.7152*g+0.0722*b)/255; if(L>=0.52) return c;
      const up=v=>Math.round(v+(255-v)*0.52); return '#'+[up(r),up(g),up(b)].map(v=>v.toString(16).padStart(2,'0')).join(''); };
    const pk = zpbPackFor('Chicago Bears'); return { raw: pk.accL, lifted: lift(pk.accL) };
  });
  ok('H-12: dark accents identified and lifted (Chicago)', colCheck.raw !== colCheck.lifted, JSON.stringify(colCheck));
  await page.evaluate(() => { document.getElementById('draftPickNumberSelect').value = '5'; });
  let t0 = Date.now();
  await page.locator('#startDraftBtn').click();
  await sleep(2000);
  const beat1 = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-fin-welcome'); if(!ov) return null;
    const ps = [...ov.querySelectorAll('p')];
    return ps.map(p => ({ t: p.textContent, op: getComputedStyle(p).opacity }));
  });
  ok('cine 2.0s: WELCOME alone visible', beat1 && beat1[0].op === '1' && beat1[1].op === '0' && beat1[2].op === '0',
     beat1 && beat1.map(x=>x.t+':'+x.op).join(' '));
  await sleep(4300); // ~6.3s
  const beat2 = await page.evaluate(() =>
    [...document.querySelectorAll('.zpb-fin-welcome p')].map(p => ({ t: p.textContent, op: getComputedStyle(p).opacity })));
  ok('cine 6.3s: stack fully visible', beat2 && beat2.every(x=>x.op === '1'), beat2 && beat2.map(x=>x.t+':'+x.op).join(' '));
  await sleep(4400); // ~10.7s (stack lingered ~3s past 6.0s; wt-out began 9.0s)
  const gate1 = await page.evaluate(() => ({ log: draftSim.log.length, wt: !!document.querySelector('.zpb-fin-welcome.zpb-wt-out') }));
  ok("cine 10.7s: 'welcome to the' fading, stack held 3s first", gate1.wt);
  ok('GATE: zero CPU picks at ~10.7s', gate1.log === 0, 'log=' + gate1.log);
  await sleep(5200); // ~15.9s (rise 9.7->13.3, linger 3s, fade begins 16.3s)
  const gate2 = await page.evaluate(() => { const ov = document.querySelector('.zpb-fin-welcome');
    const p = ov ? ov.querySelectorAll('p')[2] : null;
    return { log: draftSim.log.length, fade: p ? p.className.includes('zpb-draft-fade') : false,
      y: p ? p.getBoundingClientRect().y + p.getBoundingClientRect().height/2 : 0 }; });
  ok('cine 15.9s: DRAFT centered and lingering (no fade yet)', gate2.y > 430 && gate2.y < 470 && !gate2.fade, 'y=' + Math.round(gate2.y));
  ok('GATE: still zero picks at ~15.9s (before fade)', gate2.log === 0, 'log=' + gate2.log);
  await sleep(1700); // ~17.6s: fade began 16.3s
  const gate3 = await page.evaluate(() => { const ov = document.querySelector('.zpb-fin-welcome');
    const p = ov ? ov.querySelectorAll('p')[2] : null;
    return { log: draftSim.log.length, fade: p ? p.className.includes('zpb-draft-fade') : false, still: !!ov }; });
  ok('cine 17.6s: DRAFT fading', gate3.fade);
  ok('GATE: CPU starts exactly at the fade', gate3.log > 0, 'log=' + gate3.log);
  await page.screenshot({ path: SHOT + '/v15-cine-fade.png' });
  const chain = await page.waitForFunction(() =>
    draftSim.awaitingUser === true && draftSim.pos === 4 && draftSim.log.length === 4,
    null, { timeout: 15000 }).then(() => true).catch(() => false);
  const cineEnd = await page.evaluate(() => ({ ov: !!document.querySelector('.zpb-fin-welcome'), pos: draftSim.pos, log: draftSim.log.length }));
  ok('GATE: exactly one kickoff chain, user on the clock at pick 5', chain && cineEnd.pos === 4 && cineEnd.log === 4);
  ok('cine: overlay removed at the end', !cineEnd.ov);
  await page.screenshot({ path: SHOT + '/v15-cine-stack.png' });

  // ---- 2. instant Skip on the game panel (synthetic playoff game with stars) ----
  const po = Object.assign({}, FAKE_GAME, { roundLabel: 'CONFERENCE CHAMPIONSHIP' });
  const opened = await openReplay(page, po, null);
  ok('replay: playoff overlay opens', opened);
  let st = await replayState(page);
  ok('replay: intro present with 2 star rows (across from each other)', st.intro && st.pvrows === 2, 'rows=' + st.pvrows);
  ok("replay: intro sub uses '@'", st.subTxt.includes('@') && !st.subTxt.includes(' AT ') && !st.subTxt.includes(' at '), st.subTxt);
  await page.screenshot({ path: SHOT + '/v15-intro-stars.png' });
  await page.locator('#zrepIntroSkip').click();
  await sleep(350);
  st = await replayState(page);
  ok('SKIP (from intro): intro removed', !st.intro);
  ok('SKIP: every remaining play flushed at once (8 lines, 4 banners)', st.lines === 8 && st.banners === 4,
     `lines=${st.lines} banners=${st.banners}`);
  ok('SKIP: exact final score on the board (17-27)', st.sa === '17' && st.sh === '27', `${st.sa}-${st.sh}`);
  ok('SKIP: FINAL shown, Continue required', st.fin === 1 && st.go, `fin=${st.fin} go=${st.go}`);
  ok('SKIP: turnover line names players (no "gives it up")',
     st.toTxts.length === 2 && st.toTxts.every(t => t && !/gives it up/i.test(t) && /[A-Z]/.test(t.charAt(0))),
     JSON.stringify(st.toTxts));
  ok('H-12: game-panel badges carry the lifted color', st.fgBadge.includes(colCheck.lifted), st.fgBadge);
  await page.screenshot({ path: SHOT + '/v15-skip-final.png' });
  await page.locator('#zrepGo').click(); await sleep(250);
  ok('replay: Continue closes the panel', !(await page.evaluate(() => !!document.querySelector('.zpb-replay-ov'))));

  // mid-play skip: reopen (regular game, 5s intro), wait past the intro, skip mid-cadence
  await openReplay(page, FAKE_GAME, null); await sleep(5400);
  await sleep(1200); // a few plays rendered
  const mid = await replayState(page);
  await page.locator('#zrepSkip').click(); await sleep(350);
  const after = await replayState(page);
  ok('SKIP (mid-play): flushes the rest instantly', after.lines === 8 && after.fin === 1 && after.go,
     `before=${mid.lines} after=${after.lines}`);
  await page.locator('#zrepGo').click(); await sleep(200);

  // ---- 3. fade: add-only, panels never hidden on scroll ----
  await page.locator('#tabCompareBtn').click(); await sleep(800);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await sleep(300);
  await page.evaluate(() => window.scrollTo(0, 0)); await sleep(2300);
  const fadeOps = await page.evaluate(() =>
    [...document.querySelectorAll('#homeCmpResult .panel')].map(p => getComputedStyle(p).opacity));
  ok('H-8: comparison panels fully visible after fast scroll', fadeOps.length >= 3 && fadeOps.every(o => parseFloat(o) > 0.99), fadeOps.join(','));

  // ---- 5. series dropdown: MODEL · ALL SLOTS gone, 26 steps remain ----
  const series = await page.evaluate(() => {
    const sel = document.getElementById('zpbSeriesSel'); if(!sel) return null;
    const opts = [...sel.options].map(o => o.textContent);
    return { first: opts[0], n: opts.length, hasModel: opts.some(o => /MODEL/i.test(o)) };
  });
  ok('H-7: MODEL · ALL SLOTS entry gone', series && !series.hasModel, series && series.first);
  ok('H-7: the 26 ranking steps remain', series && series.n === 26, 'n=' + (series && series.n));

  // ---- 6. comparison headline scores wear team colors ----
  const cmpCols = await page.evaluate(() => {
    const spans = [...document.querySelectorAll('.zpb-cmpscore span')].filter(s => !s.classList.contains('zpb-cmpsub'));
    return spans.map(s => getComputedStyle(s).color);
  });
  ok('H-11: the two scores wear different (team) colors', cmpCols.length === 2 && cmpCols[0] !== cmpCols[1], cmpCols.join(' | '));

  // ---- 7. key players grid: two columns ----
  const kpGrid = await page.evaluate(g => {
    const fake = Object.assign({}, g); fake.detail.mvp = { name:'P. Mahomes', team:'Kansas City Chiefs' };
    const host = document.createElement('div'); host.style.position='absolute'; host.style.left='-9999px';
    host.innerHTML = renderKeyPlayersHTML(fake); document.body.appendChild(host);
    const cols = getComputedStyle(host.querySelector('.kp-grid')).gridTemplateColumns.split(' ').length;
    host.remove(); return cols;
  }, FAKE_GAME);
  ok('H-9: key-players grid renders two columns', kpGrid === 2, 'tracks=' + kpGrid);

  // ---- 8. heading rename present in the source ----
  const renamed = await page.evaluate(() => document.documentElement.innerHTML.includes('Your most valuable positions'));
  ok('H-1: "Your most valuable positions" heading shipped', renamed);
  const noOld = await page.evaluate(() => !document.documentElement.innerHTML.includes('What drives winning in this model'));
  ok('H-1: old heading fully gone', noOld);

  // ---- 9. reduced motion: no cinematic, instant start ----
  const ctx2 = await browser.newContext({ reducedMotion:'reduce' });
  const p2 = await ctx2.newPage();
  p2.on('pageerror', e => errors.push('rm: '+e.message));
  await p2.goto(FILE); await sleep(800);
  await p2.evaluate(() => { document.getElementById('draftPickNumberSelect').value = '5'; });
  await p2.locator('#startDraftBtn').click();
  const rmOk = await p2.waitForFunction(() => draftSim.awaitingUser === true && draftSim.log.length === 4,
    null, { timeout: 12000 }).then(() => true).catch(() => false);
  ok('reduced-motion: draft starts immediately (no cinematic)', rmOk);
  await ctx2.close();

  ok('zero console/page errors across all scenarios', errors.length === 0, errors.slice(0,3).join(' | '));
  await browser.close();
  console.log(fails.length ? `\nV15 VERIFY: ${fails.length} FAILURE(S)` : '\nV15 VERIFY: ALL PASS');
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('VERIFY CRASH:', e); process.exit(2); });
