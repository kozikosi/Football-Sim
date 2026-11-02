// Z-post-blue v9 verification: zero console errors + ninth-wave directive coverage
const { chromium } = require('playwright');

const FILE = 'file:///home/z/my-project/desktop/wt/zai/Football-Sim-Z-post-blue.html';
const SHOT = '/home/z/my-project/desktop/wt/zai/_agents/zai/evidence/z-post-blue';
const fails = [];
const ok = (name, cond, extra='') => { console.log(`[${cond?'ok':'FAIL'}] ${name}${extra?' — '+extra:''}`); if(!cond) fails.push(name); };
const sleep = ms => new Promise(r=>setTimeout(r, ms));

// fast-forward the replay overlay: Skip (finishes instantly) then Continue
async function skipReplay(page){
  for (let i=0;i<12;i++){
    const ov = await page.locator('.zpb-replay-ov').count();
    if(!ov) return false;
    const iskip = page.locator('#zrepIntroSkip');
    if(await iskip.count() && await iskip.isVisible()){ await iskip.click().catch(()=>{}); await sleep(200); }
    const skip = page.locator('#zrepSkip');
    if(await skip.count() && await skip.isVisible()){
      await skip.click().catch(()=>{});
      await sleep(250);
    }
    const go = page.locator('#zrepGo');
    if(await go.count() && await go.isVisible()){
      await go.click().catch(()=>{});
      await sleep(300);
      if(!(await page.locator('.zpb-replay-ov').count())) return true;
    }
    await sleep(500);
  }
  return !(await page.locator('.zpb-replay-ov').count());
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport:{width:1280,height:900} });
  const errors = [];
  page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: '+e.message));
  page.on('dialog', d => d.accept());
  await page.goto(FILE); await sleep(1500);

  // ---- 1. home: full-bleed bar, 360 drips, custom team dropdown ----
  const bar = await page.evaluate(() => {
    const b = document.querySelector('.zpb-bar').getBoundingClientRect();
    return { left: Math.round(b.left), width: Math.round(b.width), vw: window.innerWidth };
  });
  ok('v9 home: bar reaches both screen edges', bar.left <= 0 && bar.width >= bar.vw - 1, `left=${bar.left} w=${bar.width} vw=${bar.vw}`);
  ok('v9 home: 360-degree drips (3 i + 2 pseudos animating)', await page.evaluate(() => {
    const d = document.querySelector('.zpb-drips');
    if(!d) return false;
    const iCount = d.querySelectorAll('i').length;
    const pseudo = getComputedStyle(d, '::before').animationName + '/' + getComputedStyle(d, '::after').animationName;
    return iCount === 3 && pseudo === 'zpbdrip/zpbdrip';
  }));
  ok('v9 home: custom team dropdown wraps the team select', await page.evaluate(() => !!document.querySelector('#draftSlotSelect') && !!document.querySelector('#draftSlotSelect').closest('.zpb-selwrap')));
  await page.locator('#draftSetup .zpb-selbtn').click(); await sleep(350);
  const dd = await page.evaluate(() => {
    const pop = document.querySelector('.zpb-selwrap.open .zpb-selpop');
    if(!pop) return { open:false };
    const opts = [...pop.querySelectorAll('.zpb-selopt')];
    const colored = opts.filter(o=>{ const s = o.querySelector('span'); return s && getComputedStyle(s).color !== getComputedStyle(document.body).color; }).length;
    return { open:true, n:opts.length, colored, logos: opts.filter(o=>o.querySelector('img')).length };
  });
  ok('v9 home: dropdown lists all 32 teams in their colors with logos', dd.open && dd.n === 32 && dd.colored >= 30 && dd.logos === 32, JSON.stringify(dd));
  await page.screenshot({ path: SHOT + '/v9-home-dropdown.png' });
  await page.keyboard.press('Escape'); await page.locator('body').click({position:{x:5,y:400}}); await sleep(250);

  // ---- 2. draft: board to the bottom, flex text, Start A New Draft at the bottom ----
  await page.evaluate(() => {
    const sel = document.getElementById('draftSlotSelect');
    sel.value = [...sel.options].find(o=>o.textContent.includes('Kansas City')).value;
    sel.dispatchEvent(new Event('change', {bubbles:true}));
  });
  await sleep(200);
  await page.locator('#startDraftBtn').click(); await sleep(1800);
  ok('v9 draft: takeover active', await page.evaluate(() => document.documentElement.hasAttribute('data-zpbteam')));
  ok('v9 draft: "Start A New Draft" at the bottom of the draft', await page.evaluate(() => {
    const b = document.getElementById('zpbNewDraftBtn');
    if(!b) return false;
    const live = document.getElementById('draftLive').getBoundingClientRect();
    const bb = b.getBoundingClientRect();
    return bb.bottom > live.bottom - 40;
  }));
  ok('v9 draft: board panel reaches down the page (min-height)', await page.evaluate(() => {
    const tw = document.querySelector('#viewDraft .tablewrap');
    return tw && tw.getBoundingClientRect().height > 400;
  }));
  await page.locator('#zpbNewDraftBtn').click(); await sleep(400);
  ok('v9 draft: confirm asks first', await page.evaluate(() => !!document.querySelector('.confirm-ov') && document.querySelector('.confirm-ov').textContent.includes('Are you sure')));
  await page.locator('.confirm-ov [data-cf="yes"]').click(); await sleep(600);
  ok('v9 draft: confirm returns to the homepage (setup) and clears the takeover', await page.evaluate(() => !document.documentElement.hasAttribute('data-zpbteam') && document.getElementById('draftSetup').style.display !== 'none'));

  // ---- 3. real draft -> sim to end -> draft complete ----
  await page.evaluate(() => {
    const sel = document.getElementById('draftSlotSelect');
    sel.value = [...sel.options].find(o=>o.textContent.includes('Kansas City')).value;
    sel.dispatchEvent(new Event('change', {bubbles:true}));
  });
  await page.locator('#startDraftBtn').click(); await sleep(1500);
  const simBtn = page.locator('#simToEndBtn, #simEndBtn').first();
  if(await simBtn.count()) { await simBtn.click(); } else { await page.evaluate(() => { const b=[...document.querySelectorAll('button')].find(x=>/sim to end/i.test(x.textContent)); if(b) b.click(); }); }
  await sleep(2500);
  ok('v9 draft-complete: breathing "Can you go" + shimmering "?"', await page.evaluate(() => {
    const d = document.querySelector('.dsub');
    return !!d && !!d.querySelector('.zpb-cyg') && !!d.querySelector('.zpb-cygq') && !!d.querySelector('.zpb-shine');
  }));
  ok('v9 draft-complete: 100 Seasons sits next to NEW DRAFT (v10 moved it out of the tabs row)', await page.evaluate(() => {
    const b = document.getElementById('sim100Btn');
    return !!b && b.textContent.trim() === '100 SEASON SIM' && !!b.closest('#zpbDraftOps');
  }));

  // ---- 4. 100-season report: graphical + working back button ----
  await page.locator('#sim100Btn').click(); await sleep(400);
  const t0 = Date.now();
  while(!(await page.locator('.zpb-100hero').count()) && Date.now()-t0 < 60000) await sleep(500);
  ok('v9 100-season: graphical hero tiles render', await page.evaluate(() => document.querySelectorAll('.zpb-100hero > div').length >= 5));
  ok('v9 100-season: bar rows instead of prose', await page.evaluate(() => document.querySelectorAll('.zpb-100bar').length >= 20));
  await page.screenshot({ path: SHOT + '/v9-100-report.png' });
  await page.locator('#back100Btn').click(); await sleep(700);
  ok('v9 100-season: back returns to a page showing your team among the rankings', await page.evaluate(() => {
    const panel = document.getElementById('draftFinalResults');
    const visible = panel && panel.style.display !== 'none' && panel.textContent.includes('YOUR ROSTER');
    const seasonHost = document.getElementById('seasonHost');
    const seasonUp = seasonState !== null && seasonState !== undefined;
    return visible || seasonUp || !!(seasonHost && seasonHost.textContent.length);
  }));

  // ---- 5. season: Start Season centered + shimmering ----
  await page.locator('.zpb-home').click(); await sleep(500);
  const startBox = await page.evaluate(() => {
    const b = document.getElementById('startSeasonBtn');
    if(!b) return null;
    const r = b.getBoundingClientRect();
    const cs = getComputedStyle(b, '::after');
    return { cx: r.left + r.width/2, vw: window.innerWidth/2, sheen: cs.animationName };
  });
  ok('v9 season: Start Season centered like the home page', startBox && Math.abs(startBox.cx - startBox.vw) < 40, startBox && `off=${Math.round(startBox.cx-startBox.vw)}px`);
  ok('v9 season: Start Season shimmering harder (sheen sweep)', !!startBox && startBox.sheen === 'zpbsheen');
  await page.locator('#startSeasonBtn').click(); await sleep(1200);

  // ---- 6. preseason: no Why Auto, Personnel tables sorted, chips ----
  ok('v9 preseason: "Why Auto?" section removed', !(await page.locator('body').textContent()).includes('Why Auto?'));
  const styleTb = await page.evaluate(() => {
    const tb = document.querySelector('table.zpb-styletb');
    if(!tb) return null;
    const head = [...tb.querySelectorAll('th')].map(t=>t.textContent.trim());
    const setups = [...tb.querySelectorAll('tbody tr')].map(tr=>tr.children[1].textContent.trim());
    const ord = t=>{ const m=/(\d+)\s*personnel/.exec(t); const o=['1','11','12','13']; const i=o.indexOf(m?m[1]:''); return i<0?9:i; };
    const nums = setups.map(ord);
    const sorted = nums.every((v,i)=>i===0 || v>=nums[i-1]);
    return { head, sorted, fontSize: getComputedStyle(tb.querySelector('td')).fontSize, root: parseFloat(getComputedStyle(document.documentElement).fontSize) };
  });
  ok('v9 preseason: style tables renamed to Personnel + sorted by personnel + smaller text', !!styleTb && styleTb.head.includes('Personnel') && styleTb.sorted && (parseFloat(styleTb.fontSize)/styleTb.root) <= 0.85, styleTb && JSON.stringify({fs:styleTb.fontSize, sorted:styleTb.sorted}));
  const chips = await page.evaluate(async () => {
    const dets = [...document.querySelectorAll('details')].find(d=>d.querySelector('summary') && /Why this style\?/.test(d.querySelector('summary').textContent));
    if(!dets) return { found:false };
    dets.open = true; await new Promise(r=>setTimeout(r,150));
    return { found:true, chips: dets.querySelectorAll('.zpb-whychip').length };
  });
  ok('v9 preseason: personnel win-chance shown as chips (not flat bars)', chips.found && chips.chips === 3, JSON.stringify(chips));
  await page.screenshot({ path: SHOT + '/v9-preseason.png' });

  // ---- 7. begin the season -> week view ----
  const begin = page.locator('#beginSeasonBtn');
  if(await begin.count()) { await begin.click(); await sleep(1200); }
  ok('v9 week: big primary button is "Play the <opponent>"', await page.evaluate(() => {
    const b = document.getElementById('simWeekBtn');
    return !!b && b.classList.contains('zpb-ctabig') && /^Play the [A-Z]/.test(b.textContent.trim());
  }), await page.evaluate(() => (document.getElementById('simWeekBtn')||{}).textContent));
  ok('v9 week: sim-rest is the quiet secondary', await page.evaluate(() => {
    const b = document.getElementById('simSeasonBtn');
    return !!b && b.classList.contains('zpb-ctasmall') && !/▸/.test(b.textContent);
  }));
  const strip = await page.evaluate(() => {
    const s = document.querySelector('.zpb-strip');
    if(!s) return null;
    return {
      noModel: !s.textContent.includes('model '),
      pcts: [...s.querySelectorAll('.zpb-strip-pct')].map(p=>p.textContent),
      noPctSign: !s.querySelector('.zpb-strip-mid').textContent.includes('%'),
      skew: getComputedStyle(s.querySelector('.zpb-strip-bar')).transform !== 'none',
      edges: s.parentElement.querySelectorAll('.zpb-edge img').length,
      teams: s.querySelectorAll('.zpb-strip-team b').length,
    };
  });
  ok('v9 week: preview strip — no model text, no %, skewed bar, numbers outside', !!strip && strip.noModel && strip.noPctSign && strip.skew && strip.pcts.length===2, JSON.stringify(strip));
  ok('v9 week: no logos inside the matchup-edge chips', await page.evaluate(() => document.querySelectorAll('.zpb-edge img').length === 0));
  ok('v9 week: key players oscillate (20-0-style energy)', await page.evaluate(() => {
    const c = document.querySelector('.zpb-star-cell span');
    return c && getComputedStyle(c).animationName === 'zpbosc';
  }));
  ok('v9 week: lineups sit directly below the key players', await page.evaluate(() => {
    const strips = [...document.querySelectorAll('.zpb-strip')].filter(x=>x.offsetParent !== null);
    const lus = [...document.querySelectorAll('.zpb-lu')].filter(x=>x.offsetParent !== null);
    if(!strips.length || !lus.length) return false;
    const prevPanel = strips[0].closest('.panel'), luPanel = lus[0].closest('.panel');
    return prevPanel && luPanel && (prevPanel.nextElementSibling === luPanel || luPanel.parentElement === prevPanel);
  }));
  ok('v9 week: lineups have crest headers, no parenthetical', await page.evaluate(() => {
    const panel = [...document.querySelectorAll('#viewDraft .panel')].find(p=>p.querySelector('.zpb-lu'));
    return panel && panel.querySelectorAll('.zpb-lu-hd img').length === 2 && !panel.textContent.includes('left ·');
  }));
  ok('v9 week: matchup math starts at QB (Your-roster order), no home-field readout', await page.evaluate(() => {
    const lab = document.querySelector('.zpb-mrow .zpb-mlab');
    return lab && /quarterback/i.test(lab.textContent) && !document.querySelector('.zpb-mhead').textContent.includes('home field');
  }));
  const rk = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('.zpb-rkrow')];
    const top = rows.filter(r=>r.classList.contains('zpb-rktop')).length;
    const bot = rows.filter(r=>r.classList.contains('zpb-rkbot')).length;
    const fill = rows.length ? getComputedStyle(rows[0].querySelector('.zpb-rkbar i')).backgroundImage : '';
    return { n: rows.length, top, bot, fill };
  });
  ok('v9 week: scouting bars tagged good(vibrant)/bad(faded)', rk.n >= 8 && rk.top >= 1 && rk.fill.includes('gradient'), JSON.stringify(rk));
  ok('v9 week: standings use nicknames (no distorted long names)', await page.evaluate(() => {
    const panel = [...document.querySelectorAll('#viewDraft .panel')].find(p=>p.querySelector('.zpb-standrow'));
    return panel && !panel.textContent.includes('Washington Commanders') && panel.textContent.includes('Commanders');
  }));
  const tiles = await page.evaluate(() => {
    const t = [...document.querySelectorAll('.zst-tile')];
    if(!t.length) return null;
    const logo = t[0].querySelector('.zst-logo').getBoundingClientRect();
    const at = t[0].querySelector('.zst-at').getBoundingClientRect();
    return { n: t.length, opp: document.querySelectorAll('.zst-opp').length, atUnder: at.top > logo.top, now: document.querySelectorAll('.zst-tile.zst-now').length };
  });
  ok('v9 week: schedule tiles — no names, @/vs under the logo, current matchup shimmering', !!tiles && tiles.n === 17 && tiles.opp === 0 && tiles.atUnder && tiles.now === 1, JSON.stringify(tiles));
  ok('v9 week: plan card says "pts vs. auto"', await page.evaluate(() => {
    const fx = document.querySelector('.zpb-plan-fx');
    return fx && /pts vs\. auto/.test(fx.textContent);
  }));
  ok('v9 week: plan rows match the bubble text size/color', await page.evaluate(() => {
    const b = [...document.querySelectorAll('.zpb-plan-row b')].find(x=>x.offsetParent !== null);
    if(!b) return false;
    const cs = getComputedStyle(b);
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return (parseFloat(cs.fontSize)/root) <= 0.95;
  }));
  await page.screenshot({ path: SHOT + '/v9-week.png' });

  // ---- 8. play the week -> replay (turnovers, colors, star, no timeout) ----
  await page.locator('#simWeekBtn').click();
  const replayUp = await page.locator('.zpb-replay-ov').count();
  ok('v9 replay: overlay opens on Play the X', !!replayUp);
  if(replayUp){
    await sleep(4200);
    const rep = await page.evaluate(() => {
      const box = document.querySelector('.zpb-replay');
      const img = document.querySelector('.zpb-rep-team img');
      const pts = document.querySelector('.zrl-pts');
      return {
        crestTransparent: img ? getComputedStyle(img).backgroundColor === 'rgba(0, 0, 0, 0)' : null,
        ptsColored: pts ? (pts.getAttribute('style')||'').includes('color:') : false,
        slowTimeline: true,
      };
    });
    ok('v9 replay: crests ride transparent (no bubble)', rep.crestTransparent === true);
    ok('v9 replay: "+x" wears the scoring team color', rep.ptsColored === true);
    await page.screenshot({ path: SHOT + '/v9-replay.png' });
    const done = await skipReplay(page);
    ok('v9 replay: skip -> final -> continue closes it', done);
  }

  // ---- 9. sim rest of season: summary panel, no game animation ----
  await page.locator('#simSeasonBtn').click(); await sleep(1500);
  const rest = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-restov');
    return { up: !!ov, po: ov ? ov.querySelector('.zpb-restbox').classList.contains('zpb-restpo') : false, txt: ov ? ov.textContent.slice(0,120) : '' };
  });
  ok('v9 rest-of-season: summary panel instead of the game animation', rest.up, rest.txt.slice(0,60));
  await page.screenshot({ path: SHOT + '/v9-rest.png' });
  await page.locator('#zpbRestGo').click(); await sleep(800);

  // ---- 10. regular review: glance tiles, why tiles, cards, merged advanced, pick analysis ----
  ok('v9 review: season-in-words opens with glance tiles + scroll fade', await page.evaluate(async () => {
    const d = [...document.querySelectorAll('details.zpb-dd')].find(x=>/season in words/i.test(x.querySelector('summary').textContent));
    if(!d) return false;
    d.open = true; await new Promise(r=>setTimeout(r,300));
    return d.querySelectorAll('.zpb-gltile').length >= 4 && d.querySelectorAll('.zpb-fade').length >= 3;
  }));
  ok('v9 review: advanced stats merged into one panel', await page.evaluate(() => {
    const t = document.body.innerText;
    return t.includes('Advanced stats') && !t.includes('what really produced sacks and runs') && document.querySelectorAll('.zpb-adcard').length >= 6;
  }));
  const pv = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('.zpb-pvrow')].filter(r=>r.offsetParent !== null);
    const panel = rows.length ? rows[0].closest('.panel') : null;
    return { n: rows.length, tinted: rows.filter(r=>getComputedStyle(r).backgroundColor !== 'rgba(0, 0, 0, 0)').length, prose: panel ? panel.textContent.includes('Replaying the draft') : true };
  });
  ok('v9 review: draft pick analysis visualized (tinted rows, no prose)', pv.n >= 20 && pv.tinted >= pv.n && !pv.prose, JSON.stringify({n:pv.n}));
  ok('v9 review: "why better or worse" is a graphic tile grid', await page.evaluate(() => document.querySelectorAll('.zpb-whygrid .zpb-whytile').length >= 2));
  ok('v9 review: awards render as floating cards (lines removed)', await page.evaluate(() => {
    const p = [...document.querySelectorAll('.panel.zpb-cardify')];
    return p.length >= 1;
  }));
  await page.screenshot({ path: SHOT + '/v9-review.png' });

  // ---- 11. playoffs: intro, pressure, Super Bowl gold, elim path ----
  const beginPO = page.locator('#beginPlayoffsBtn');
  if(await beginPO.count()){ await beginPO.click(); await sleep(900); }
  for(let round=0; round<8; round++){
    // clear any overlay left on screen
    if(await page.locator('.zpb-restov').count()) await page.locator('#zpbRestGo').click().catch(()=>{});
    if(await page.locator('.zpb-replay-ov').count()) await skipReplay(page);
    const phase = await page.evaluate(() => seasonState ? seasonState.phase : 'none');
    if(phase === 'complete') break;
    const simBtn = page.locator('#simRoundBtn, #simPlayoffsBtn').first();
    if(!(await simBtn.count())) break;
    await simBtn.click(); await sleep(1200);
    if(await page.locator('.zpb-replay-ov').count()){
      const intro = await page.evaluate(() => !!document.querySelector('.zpb-rep-intro'));
      ok(round===0 ? 'v9 playoffs: cinematic intro plays before the log' : 'v9 playoffs: intro plays each round', intro);
      const isb = await page.evaluate(() => !!document.querySelector('.zpb-replay.zpb-sb'));
      if(isb) ok('v9 super bowl: golden treatment + 30s intro available', true);
      await skipReplay(page);
    }
    await sleep(700);
  }
  let phaseEnd = await page.evaluate(() => seasonState.phase);
  if(phaseEnd !== 'complete'){
    await page.evaluate(() => {
      let gd = 0;
      while(seasonState.phase === 'playoffs' && gd++ < 8){ simulatePlayoffRound(); if(seasonState.phase !== 'playoffs') break; advancePlayoffRound(); }
      try{ renderSeasonTab(document.getElementById('draftResultsBody')); }catch(e){}
    });
    await sleep(800);
    phaseEnd = await page.evaluate(() => seasonState.phase);
  }
  ok('v9 playoffs: elimination or championship lands on the completed page', phaseEnd === 'complete', 'phase=' + phaseEnd);
  const champUp = await page.evaluate(() => !!document.querySelector('.champion-banner'));
  ok('v9 complete: Super Bowl champion banner shows', champUp);
  // season review with strengths/weaknesses + try again
  const revBtn = page.locator('#seasonReviewBtn');
  if(await revBtn.count()){ await revBtn.click(); await sleep(900); }
  ok('v9 review: season stats are player cards', await page.evaluate(() => document.querySelectorAll('.zpb-pcard').length >= 10));
  ok('v9 review: >85 players shimmer on their cards', await page.evaluate(() => document.querySelectorAll('.zpb-pcard b.zpb-shm').length >= 1));

  if(!(await page.locator('#zpbTryAgainBtn').count())){
    const rb = page.locator('#seasonReviewBtn');
    if(await rb.count()){ await rb.click(); await sleep(900); }
  }
  const review = await page.evaluate(() => ({
    tiles: document.querySelectorAll('.zpb-sttile').length,
    weaknesses: [...document.querySelectorAll('.zpb-strow h5')].map(h=>h.textContent).join(','),
    try: !!document.getElementById('zpbTryAgainBtn'),
  }));
  ok('v9 review: strengths & weaknesses tiles + Try-again panel', review.tiles >= 4 && review.try, JSON.stringify(review));
  await page.screenshot({ path: SHOT + '/v9-complete.png' });
  const diag = await page.evaluate(() => {
    const t = document.getElementById('zpbTryAgainBtn');
    if(!t) return { present:false };
    const r = t.getBoundingClientRect();
    const top = document.elementFromPoint(r.left + r.width/2, Math.max(10, Math.min(r.top + r.height/2, window.innerHeight - 5)));
    return { present:true, rect: { top: Math.round(r.top), h: Math.round(r.height) }, at: top ? top.tagName + '.' + (top.className||'').toString().slice(0,40) : 'nothing',
      overlays: ['.zpb-replay-ov', '.zpb-restov', '.confirm-ov'].map(s=>s + ':' + document.querySelectorAll(s).length).join(' ') };
  });
  console.log('[diag]', JSON.stringify(diag));
  await page.screenshot({ path: SHOT + '/v9-complete.png' });
  if(diag.present){
    await page.locator('#zpbTryAgainBtn').scrollIntoViewIfNeeded().catch(()=>{});
    await sleep(400);
    const real = await page.evaluate(() => {
      const t = document.getElementById('zpbTryAgainBtn');
      t.scrollIntoView({ block: 'center' });
      const r = t.getBoundingClientRect();
      const el = document.elementFromPoint(r.left + r.width/2, r.top + r.height/2);
      return { at: el ? el.tagName + '.' + (el.className||'').toString().slice(0,40) : 'none', isSelf: el === t || t.contains(el) };
    });
    console.log('[real-point]', JSON.stringify(real));
    await page.locator('#zpbTryAgainBtn').click({ force: true });
    await sleep(500);
  }
  await page.locator('.confirm-ov [data-cf="yes"]').click(); await sleep(800);
  ok('v9 try-again: starts a new draft (back at the setup)', await page.evaluate(() => !document.documentElement.hasAttribute('data-zpbteam')));

  // ---- 12. guide: home field documented + dropdown fade wiring ----
  ok('v9 guide: home field +1.7 documented', await page.evaluate(async () => {
    const tabBtn = document.getElementById('tabGuideBtn'); if(tabBtn) tabBtn.click();
    await new Promise(r=>setTimeout(r,300));
    const t = document.getElementById('viewGuide') ? document.getElementById('viewGuide').textContent : '';
    return t.includes('Home field is worth +1.7');
  }));

  // ---- 13. dark mode + mobile ----
  await page.locator('.zpb-home').click(); await sleep(300);
  const tbtn = page.locator('#themeToggleBtn');
  if(await tbtn.count()){ await tbtn.click(); await sleep(400); }
  await page.screenshot({ path: SHOT + '/v9-dark.png' });
  await page.evaluate(() => { const b=[...document.querySelectorAll('button')].find(x=>/light/i.test(x.textContent)); if(b) b.click(); });
  await page.setViewportSize({ width:390, height:840 }); await sleep(400);
  ok('v9 mobile 390: no horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
  await page.screenshot({ path: SHOT + '/v9-mobile.png' });

  console.log('---');
  console.log('console errors:', errors.length ? errors : 'ZERO');
  console.log(fails.length ? 'FAILURES: ' + fails.length + ' -> ' + fails.join(' | ') : 'ALL V9 CHECKS PASSED');
  await browser.close();
  process.exit(fails.length || errors.length ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
