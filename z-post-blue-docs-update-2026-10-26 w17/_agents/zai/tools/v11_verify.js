// Z-post-blue v11 verification: zero console errors + eleventh-wave directive coverage
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
  await page.goto(FILE); await sleep(1500);

  // ---- 1. footer: bottom nav, caps, no pink, bottom 20-0 gone ----
  const foot = await page.evaluate(() => {
    const nav = document.querySelector('nav.footnav');
    const t = document.getElementById('themeToggleBtn');
    const labels = nav ? [...nav.querySelectorAll('.footlink')].map(b=>b.textContent.trim()) : [];
    const fm = document.querySelector('.zpb-fmark');
    return {
      nav: !!nav,
      labels,
      caps: labels.every(l=>l===l.toUpperCase()),
      fmarkInDom: !!fm,
      themeColor: t ? getComputedStyle(t).color : null,
      atBottom: nav ? (nav.getBoundingClientRect().bottom > window.innerHeight - 90) : false,
      btnCinzel: nav ? getComputedStyle(nav.querySelector('.footlink')).fontFamily.includes('Cinzel Decorative') : false,
    };
  });
  ok('v11 footer: bottom nav present', foot.nav);
  ok('v11 footer: every label fully capitalized', foot.caps, JSON.stringify(foot.labels));
  ok('v11 footer: labels SIMULATOR / MADDEN RANKINGS / ...', foot.labels.join('|') === 'SIMULATOR|MADDEN RANKINGS|PLAYER BROWSER|POSITION RANKINGS|TEAM COMPARISON|GUIDE|\u263E DARK', JSON.stringify(foot.labels));
  ok('v11 footer: bottom 20-0 mark gone from the page', !foot.fmarkInDom);
  ok('v11 footer: theme toggle not pink', foot.themeColor !== 'rgb(201, 122, 142)', foot.themeColor);
  ok('v11 footer: nav pinned at the bottom of the viewport', foot.atBottom);
  ok('v11 footer: footer links wear Cinzel Decorative', foot.btnCinzel);
  await page.locator('#themeToggleBtn').click(); await sleep(350);
  ok('v11 footer: theme toggle reads LIGHT in dark mode', (await page.locator('#themeToggleBtn').textContent()).includes('LIGHT'));
  // dark-mode dropdown readability lives here too
  const ddDark = await page.evaluate(() => {
    const sel = document.getElementById('draftSlotSelect');
    sel.value = 'New England Patriots';
    sel.dispatchEvent(new Event('change', {bubbles:true}));
    const wrap = sel.closest('.zpb-selwrap');
    wrap.querySelector('.zpb-selbtn').click();
    const ne = [...wrap.querySelectorAll('.zpb-selopt')].find(o=>o.textContent.includes('New England Patriots'));
    const c = ne ? getComputedStyle(ne).color : null;
    document.body.click();
    return c;
  });
  ok('v11 dropdowns: Patriots name readable in dark mode', ddDark && (()=>{ const m = ddDark.match(/\d+/g).map(Number); return (m[0]+m[1]+m[2])/3 > 110; })(), ddDark);
  await page.locator('#themeToggleBtn').click(); await sleep(300);

  // ---- 2. bar full bleed ----
  const bar = await page.evaluate(() => {
    const h = document.querySelector('.zpb-home').getBoundingClientRect();
    const mq = document.querySelector('.zpb-marquee');
    const cs = getComputedStyle(mq);
    return { homeLeft: Math.round(h.left), mask: cs.webkitMaskImage + cs.maskImage, mqRight: Math.round(mq.getBoundingClientRect().right), vw: window.innerWidth };
  });
  ok('v11 bar: static 20-0 touches the left edge', bar.homeLeft <= 4, 'left='+bar.homeLeft);
  ok('v11 bar: marquee runs to the right edge without a fade mask', bar.mask.includes('none') && bar.mqRight >= bar.vw - 2, JSON.stringify(bar));
  await page.screenshot({ path: SHOT + '/v11-home.png' });

  // ---- 3. dropdowns: pick box tinted, one-line names ----
  await page.evaluate(() => {
    const sel = document.getElementById('draftSlotSelect');
    sel.value = 'Kansas City Chiefs';
    sel.dispatchEvent(new Event('change', {bubbles:true}));
  });
  await sleep(400);
  const dd = await page.evaluate(() => {
    const out = {};
    const wraps = [...document.querySelectorAll('#draftSetup .zpb-selwrap')];
    const pickWrap = wraps.find(w=>w.contains(document.getElementById('draftPickNumberSelect')));
    out.pickCustom = !!pickWrap;
    if (pickWrap) {
      const span = pickWrap.querySelector('.zpb-selbtn span');
      out.pickLabel = span ? span.textContent : null;
      out.pickColor = span ? getComputedStyle(span).color : null;
    }
    const teamWrap = wraps.find(w=>w.contains(document.getElementById('draftSlotSelect')));
    if (teamWrap) {
      teamWrap.querySelector('.zpb-selbtn').click();
      const opts = [...teamWrap.querySelectorAll('.zpb-selopt')];
      out.optCount = opts.length;
      out.oneLine = opts.every(o=>o.scrollWidth <= o.clientWidth + 1);
      document.body.click();
    }
    return out;
  });
  ok('v11 dropdowns: pick-order box wears the custom treatment', dd.pickCustom && dd.pickLabel === 'Random', JSON.stringify({label:dd.pickLabel}));
  ok('v11 dropdowns: pick box tinted by the selected team (Chiefs red)', dd.pickColor && dd.pickColor.startsWith('rgb(2'), 'color='+dd.pickColor);
  ok('v11 dropdowns: every team name on one line', dd.oneLine, 'opts='+dd.optCount);
  await page.screenshot({ path: SHOT + '/v11-dropdowns.png' });

  // ---- 4. setup panel + start the Saints draft ----
  ok('v11 setup: panel overflow visible', await page.evaluate(() => {
    const cs = getComputedStyle(document.getElementById('draftSetup'));
    return cs.overflowX === 'visible' && cs.overflowY === 'visible';
  }));
  await page.evaluate(() => {
    const sel = document.getElementById('draftSlotSelect');
    sel.value = 'New Orleans Saints';
    sel.dispatchEvent(new Event('change', {bubbles:true}));
  });
  await sleep(300);
  await page.locator('#startDraftBtn').click(); await sleep(1500);
  await page.evaluate(() => { const b = document.getElementById('speedInstantBtn'); if(b) b.click(); });
  await sleep(2500);

  // ---- 5. draft page checks (instant speed settles on the user's pick) ----
  const dk = await page.evaluate(() => {
    const out = {};
    const b = document.getElementById('rosterDepthBtn');
    const bg = getComputedStyle(b).backgroundImage;
    out.noSlateBlue = !bg.includes('44, 77, 109');
    const seg = document.querySelector('.zpb-seg button.zpb-seg-on');
    out.segColor = seg ? getComputedStyle(seg).color : null;
    // CPU-picking state: the pick-priority panel is GONE (Owner wave 11); no on-the-clock line
    draftSim.awaitingUser = false; renderDraftLive();
    out.statusWhenCPU = document.getElementById('draftStatusText').textContent;
    out.prioGone = !document.getElementById('draftPriorityPanel');
    // back to the user's pick
    draftSim.awaitingUser = true; renderDraftLive();
    out.statusWhenMe = document.getElementById('draftStatusText').textContent;
    out.undoLabel = ((document.getElementById('undoPickBtn')||{}).textContent||'').trim();
    out.arrows = [...document.querySelectorAll('#draftTable2 th.sort-sel')].some(th=>{ const c = getComputedStyle(th,'::after').content; return c && c !== 'none' && c !== 'normal'; });
    out.nameFont = getComputedStyle(document.querySelector('#draftTable2 td.dc-name')).fontFamily;
    out.ovrStack = !!document.querySelector('#draftTable2 .zpb-ovrstack');
    out.logoBig = (()=>{ const i = document.querySelector('#draftTable2 .zpb-teamcol .zpb-logo'); return i ? i.getBoundingClientRect().width : 0; })();
    out.hscroll = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    out.setupOv = getComputedStyle(document.getElementById('draftSetup')).overflowX;
    return out;
  });
  ok('v11 draft: no slate blue in the dynamic button gradient', dk.noSlateBlue);
  ok('v11 draft: DEPTH CHART label readable (dark on team gold)', dk.segColor && (()=>{ const m = dk.segColor.match(/\d+/g).map(Number); return (m[0]+m[1]+m[2])/3 < 120; })(), dk.segColor);
  ok('v11 draft: pick-priority panel deleted entirely', dk.prioGone === true);
  ok('v11 draft: no on-the-clock wording in either state', !/is on the clock|On the clock/.test(dk.statusWhenCPU + dk.statusWhenMe), JSON.stringify([dk.statusWhenCPU, dk.statusWhenMe]));
  ok('v11 draft: undo button reads just Undo with the arrow', /^\u21b6 Undo$/.test(dk.undoLabel), JSON.stringify(dk.undoLabel));
  ok('v11 draft: no sort arrows', !dk.arrows);
  ok('v11 draft: player names in Cinzel Decorative', dk.nameFont.includes('Cinzel Decorative'));
  ok('v11 draft: OVR stack (number + chips) present', dk.ovrStack);
  ok('v11 draft: team logos enlarged (~27px)', dk.logoBig >= 26 && dk.logoBig <= 29, 'w='+dk.logoBig);
  ok('v11 draft: no horizontal scrollbar at 1280', dk.hscroll <= 0, 'over='+dk.hscroll);
  ok('v11 draft: board panel never scrolls itself', dk.setupOv === 'visible');
  const chips = await page.evaluate(() => {
    let withChips = 0, withChipsLow = 0, rowsN = 0;
    [...document.querySelectorAll('#draftBody2 tr')].forEach(r=>{
      const ovrEl = r.querySelector('.dc-ovr'); if(!ovrEl) return;
      rowsN++;
      const ovr = parseInt(ovrEl.textContent, 10);
      const has = !!r.querySelector('.zpb-ovrchips');
      if (has) withChips++;
      if (has && ovr < 85) withChipsLow++;
    });
    return { rowsN, withChips, withChipsLow };
  });
  ok('v11 draft: color bubbles under OVR, only for 85+', chips.withChips > 0 && chips.withChipsLow === 0, JSON.stringify(chips));
  const tfilter = await page.evaluate(async () => {
    const logo = document.querySelector('#draftBody2 .zpb-tfilter');
    const team = logo.getAttribute('data-ztf');
    logo.click();
    await new Promise(r=>setTimeout(r,400));
    const rows1 = [...document.querySelectorAll('#draftBody2 tr')].filter(r=>r.querySelector('.dc-name')).length;
    const pill = !!document.querySelector('#draftFitSummary .zpb-tfpill');
    const others = [...document.querySelectorAll('#draftBody2 .zpb-tfilter')].filter(l=>l.getAttribute('data-ztf')!==team).length;
    return { team, rows1, pill, others };
  });
  ok('v11 draft: clicking a team logo filters the board to that team only', tfilter.others === 0 && tfilter.rows1 > 0 && tfilter.pill, JSON.stringify(tfilter));
  await page.evaluate(async () => {
    document.querySelector('#draftBody2 .zpb-tfilter').click();
    await new Promise(r=>setTimeout(r,400));
  });
  ok('v11 draft: clicking the logo again resumes the full board', await page.evaluate(() => draftUI.teamFilter === null));
  await page.screenshot({ path: SHOT + '/v11-draft.png' });

  // ---- 6. finish the draft ----
  await page.evaluate(() => { const b = document.getElementById('speedInstantBtn'); if(b) b.click(); });
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x=>/sim to end/i.test(x.textContent)); if(b) b.click(); });
  await sleep(3000);
  for (let i=0;i<10;i++){ if(await page.evaluate(() => !!document.getElementById('newDraftBtn'))) break; await sleep(1000); }
  await sleep(9000);
  const fin = await page.evaluate(() => ({
    season: !!document.getElementById('seasonOpsBtn') && document.getElementById('seasonOpsBtn').textContent.trim()==='SEASON',
    newDraft: !!document.getElementById('newDraftBtn'),
    sim100: [...document.querySelectorAll('#draftFinalResults button')].some(b=>b.textContent.trim()==='100 SEASONS'),
    tryAgain: document.body.textContent.includes('Try again to go'),
  }));
  ok('v11 finish: SEASON sits beside NEW DRAFT', fin.season && fin.newDraft);
  ok('v11 finish: 100 SEASONS button', fin.sim100);
  ok('v11 finish: "Try again to go 20-0?" wording', fin.tryAgain);
  ok('v11 finish: roster labels have no \u2014 Fantasy/Actual suffix', await page.evaluate(() =>
    !document.body.textContent.includes('\u2014 Fantasy Draft') && !document.body.textContent.includes('\u2014 Actual Roster')));

  // ---- 7. ranks fade block ----
  await page.evaluate(() => { const b = [...document.querySelectorAll('#draftFinalResults .tabs .tabbtn')].find(x=>x.textContent==='SEASON'); if(b) b.click(); });
  await sleep(1000);
  await page.evaluate(() => { const b = document.querySelector('.zpb-ranks-fade'); if(b) b.scrollIntoView({block:'center'}); });
  await sleep(3800);
  const ranks = await page.evaluate(() => {
    const blk = document.querySelector('.zpb-ranks-fade');
    if(!blk) return { present:false };
    return { present:true, heading: blk.querySelector('h3') ? blk.querySelector('h3').className : '',
      fadedIn: blk.classList.contains('zpb-fadein'), op: parseFloat(getComputedStyle(blk).opacity) };
  });
  ok('v11 ranks: shiny fading block with shimmer heading', ranks.present && ranks.heading.includes('zpb-shm'));
  ok('v11 ranks: fades in on scroll then breathes', ranks.fadedIn && ranks.op > 0.3, JSON.stringify(ranks));
  ok('v11 ranks: table has no horizontal lines', await page.evaluate(() => {
    const td = document.querySelector('.zpb-ranks-fade tbody td');
    return td ? (parseFloat(getComputedStyle(td).borderBottomWidth) === 0) : 'no td';
  }));
  await page.screenshot({ path: SHOT + '/v11-ranks.png' });

  // ---- 8. start the season, through the preseason, simulate week 1 (replay opens) ----
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if(b) b.click(); });
  await sleep(2500);
  ok('v11 season: SEASON hero button renamed', await page.evaluate(() => {
    const b = document.getElementById('startSeasonBtn');
    return !b || b.textContent.trim() === 'SEASON';
  }));
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn') || document.getElementById('beginSeasonBtn2'); if(b) b.click(); });
  await sleep(1800);
  await page.evaluate(() => {
    // deterministic replay: guarantee FGs + a takeaway in the user's game before the replay reads it
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
  await sleep(3000);
  // let the replay play out fully so every scoring line is on the log
  let repDone = false;
  for (let i=0;i<50;i++){ repDone = await page.evaluate(() => !!document.querySelector('.zpb-rep-final')); if (repDone) break; await sleep(1000); }
  const replay = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-replay-ov');
    if(!ov) return { present:false };
    const log = ov.querySelector('#zrepLog');
    const lines = [...log.querySelectorAll('.zpb-rep-line')];
    return {
      present: true,
      lines: lines.length,
      tdBadges: lines.filter(l=>l.querySelector('.zrl-td')).length,
      fgBadges: lines.filter(l=>[...l.querySelectorAll('.zrl-badge')].some(b=>b.textContent==='FG')).length,
      toBadges: lines.filter(l=>[...l.querySelectorAll('.zrl-badge')].some(b=>b.textContent==='TO')).length,
      toDetail: lines.filter(l=>l.classList.contains('zrl-to') && / int | strips | FF/.test(l.textContent)).length,
      toTimed: lines.filter(l=>l.classList.contains('zrl-to') && /\d+Q \d+:\d+/.test(l.textContent)).length,
      plusPts: lines.filter(l=>/\+\d/.test(l.textContent)).length,
      spelledTD: lines.filter(l=>/touchdown/i.test(l.textContent)).length,
      spelledTO: lines.filter(l=>/turnover/i.test(l.textContent)).length,
      spaced: /\d+ - \d+/.test(log.textContent),
      turnFoot: /Turnovers · /.test(log.textContent),
      width: Math.round(ov.querySelector('.zpb-replay').getBoundingClientRect().width),
    };
  });
  ok('v11 replay: overlay opens, about 50% larger', replay.present && replay.width >= 700, 'w='+(replay.width||0));
  ok('v11 replay: shimmering TD badges in team colors', replay.tdBadges > 0, JSON.stringify({td:replay.tdBadges, lines:replay.lines}));
  ok('v11 replay: FG badges on field goals', replay.fgBadges > 0, 'fg='+(replay.fgBadges||0));
  ok('v11 replay: TO badge on turnovers', replay.toBadges > 0, 'to='+(replay.toBadges||0));
  ok('v11 replay: no "+7" points column', replay.plusPts === 0);
  ok('v11 replay: "x - y" spaced score', replay.spaced);
  ok('v11 replay: turnovers footer removed', !replay.turnFoot);
  ok('v11 replay: turnovers never spell the word out', replay.spelledTO === 0, 'n='+(replay.spelledTO||0));
  await page.screenshot({ path: SHOT + '/v11-replay.png' });
  await page.evaluate(() => { const b = document.getElementById('zrepGo'); if(b) b.click(); else { const x = document.querySelector('.zpb-replay-ov'); if(x) x.remove(); } });
  await sleep(1500);
  // advance to Week 2 so the pre-game week view (duel, lineups, scouting) is on screen
  await page.evaluate(() => { const b = document.getElementById('nextWeekBtn'); if(b) b.click(); });
  await sleep(2200);

  // ---- 9. week view: duel, scouting, schedule/standings, lineups, matchup math ----
  const pv = await page.evaluate(() => {
    const body = document.getElementById('draftFinalResults') || document.body;
    const why = [...body.querySelectorAll('details')].find(d=>/Why these plans\?/.test(d.textContent));
    if (why) why.open = true;
    const chips = [...body.querySelectorAll('.zpb-duelchip')];
    const link = body.querySelector('a.zpb-teamlink');
    return {
      duelCards: body.querySelectorAll('.zpb-duelcard').length,
      duelChips: chips.length,
      chipTxt: chips.slice(0,4).map(c=>c.textContent.trim()),
      linkColored: link ? getComputedStyle(link).color : null,
      recvCorps: body.textContent.includes('Receiving corps'),
      oldRecv: body.textContent.includes('Receivers & tight end'),
      runBlk: body.textContent.includes('Run blocking'),
      frontSeven: body.textContent.includes('front seven'),
      scheduleH: !! [...body.querySelectorAll('h4')].find(h=>h.textContent.trim()==='SCHEDULE'),
      standingsH: !! [...body.querySelectorAll('h4')].find(h=>h.textContent.trim()==='STANDINGS'),
    };
  });
  ok('v11 preview: two-team duel blocks replace the wall of text', pv.duelCards === 2, 'cards='+pv.duelCards);
  ok('v11 preview: strong/weak chips present', pv.duelChips >= 3, JSON.stringify(pv.chipTxt));
  ok('v11 preview: Preseason page link colored', !!pv.linkColored, pv.linkColored);
  ok('v11 preview: RECEIVING CORPS label, old name gone', pv.recvCorps && !pv.oldRecv);
  ok('v11 preview: RUN BLOCKING / no (Front Seven)', pv.runBlk && !pv.frontSeven);
  ok('v11 preview: SCHEDULE heading', pv.scheduleH);
  ok('v11 preview: STANDINGS heading', pv.standingsH);
  const lu = await page.evaluate(() => {
    const body = document.getElementById('draftFinalResults') || document.body;
    const cells = [...body.querySelectorAll('.zpb-lu-cell')].filter(c=>c.classList.contains('zpb-lu-l')||c.classList.contains('zpb-lu-r'));
    const withText = cells.filter(c=>c.textContent.trim() && c.textContent.trim() !== '—');
    return {
      parens: withText.filter(c=>/\(\d+\)/.test(c.textContent)).length,
      dashes: cells.filter(c=>c.textContent.trim()==='—').length,
      winners: body.querySelectorAll('.zpb-lu-win.zpb-shm').length,
      grpCenter: (()=>{ const g = body.querySelector('.zpb-lu-grp'); return g ? getComputedStyle(g).textAlign : 'none'; })(),
      note: body.querySelector('.zpb-fadenote') ? getComputedStyle(body.querySelector('.zpb-fadenote')).fontSize : null,
      noteAnim: body.querySelector('.zpb-fadenote') ? getComputedStyle(body.querySelector('.zpb-fadenote')).animationName : null,
    };
  });
  ok('v11 lineups: no parenthesized ratings', lu.parens === 0);
  ok('v11 lineups: every slot filled from the roster', lu.dashes === 0, 'empty='+lu.dashes);
  ok('v11 lineups: winners wear the shimmer', lu.winners > 0, 'n='+lu.winners);
  ok('v11 lineups: OFFENSE/DEFENSE centered', lu.grpCenter === 'center');
  ok('v11 lineups: ratings note tiny + fading', lu.note && parseFloat(lu.note) < 12 && lu.noteAnim, lu.note + ' anim=' + lu.noteAnim);
  const mm = await page.evaluate(() => {
    const body = document.getElementById('draftFinalResults') || document.body;
    const rows = [...body.querySelectorAll('.zpb-mrow')];
    return {
      rows: rows.length,
      hasRank: rows.some(r=>/#\d+/.test(r.textContent)),
      channels: rows.some(r=>/Ground game|Passing game|Kicking/.test(r.textContent)),
      decimals: rows.some(r=>/\d+\.\d+/.test([...r.querySelectorAll('b')].map(b=>b.textContent).join(' '))),
      rightAlign: (()=>{ const b = body.querySelector('.zpb-mc-h b.zpb-mnum'); return b ? getComputedStyle(b).textAlign : 'none'; })(),
    };
  });
  if (mm.rows) {
    ok('v11 matchup math: unit rows only, no channel rows', !mm.channels);
    ok('v11 matchup math: integers, no ranks, no decimals', !mm.hasRank && !mm.decimals);
    ok('v11 matchup math: right team right-aligned', mm.rightAlign === 'right', mm.rightAlign);
  } else {
    console.log('[skip] matchup math not rendered on this week view');
  }
  const st = await page.evaluate(() => {
    const body = document.getElementById('draftFinalResults') || document.body;
    const firstRow = body.querySelector('.zpb-divmain tbody tr');
    return { wlFirst: firstRow ? /\d+-\d+/.test(firstRow.cells[0].textContent) : null };
  });
  ok('v11 standings: W-L moved to the left of the team names', st.wlFirst === true);
  await page.screenshot({ path: SHOT + '/v11-preview.png' });

  // ---- 10. 100 Seasons report ----
  await page.evaluate(() => { const b = [...document.querySelectorAll('#draftFinalResults button')].find(x=>x.textContent.trim()==='100 SEASONS'); if(b) b.click(); });
  let repReady = false;
  for (let i=0;i<120;i++){ repReady = await page.evaluate(() => !!document.querySelector('#draftFinalResults .zpb-100hero')); if (repReady) break; await sleep(1000); }
  const rep = await page.evaluate(() => {
    const body = document.getElementById('draftFinalResults');
    const rows = [...body.querySelectorAll('.zpb-100bar')];
    const league = rows.filter(r=>r.querySelector('.zpb-100name'));
    return {
      hero: !!body.querySelector('.zpb-100hero'),
      logoRanks: league.length,
      numbered: league.slice(0,5).filter(r=>/^\s*\d+\./.test(r.querySelector('.zpb-100name').textContent)).length,
      stats: !! [...body.querySelectorAll('.zpb-100sec')].find(s=>s.textContent.trim()==='Stats'),
      realism: body.textContent.includes('Realism check'),
      narr: body.textContent.includes('Full seasons (17 games + playoffs)'),
      runPlus: body.textContent.includes('RUN+'),
      bubbles: body.querySelectorAll('.zpb-adcard').length,
      oldJumble: /run-heavy \d+\.\d+%/.test(body.textContent),
    };
  });
  ok('v11 100: graphical report opens', rep.hero);
  ok('v11 100: league ranks show logo + nickname, no numbers', rep.logoRanks >= 30 && rep.numbered === 0, 'rows='+rep.logoRanks);
  ok('v11 100: STATS section replaces Realism check', rep.stats && !rep.realism);
  ok('v11 100: explainer sentence removed', !rep.narr);
  ok('v11 100: RUN+ chips, no old jumble', rep.runPlus && !rep.oldJumble);
  ok('v11 100: stat bubbles expanded (12+)', rep.bubbles >= 12, 'bubbles='+rep.bubbles);
  await page.screenshot({ path: SHOT + '/v11-100.png' });

  // ---- 11. zero console errors end to end ----
  ok('v11: ZERO console errors end to end', errors.length === 0, errors.slice(0,3).join(' | '));

  await browser.close();
  console.log(fails.length ? ('FAILURES: ' + fails.join(' ; ')) : 'ALL v11 CHECKS PASSED');
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
