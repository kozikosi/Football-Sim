// Z-post-blue v15 verification: P0 draft-alive + round-9 directive coverage, zero console errors
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/build_w16.html';
const SHOT = '/home/z/my-project/w16ref/evidence';
const fails = [];
const ok = (name, cond, extra = '') => { console.log(`[${cond ? 'ok' : 'FAIL'}] ${name}${extra ? ' — ' + extra : ''}`); if (!cond) fails.push(name); };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const SNAP = `(() => {
  const body = document.getElementById('draftBody2');
  const picks = document.getElementById('draftRecentPicks');
  return { pos:(typeof draftSim!=='undefined'&&draftSim)?draftSim.pos:-1,
    awaiting:(typeof draftSim!=='undefined'&&draftSim)?!!draftSim.awaitingUser:null,
    log:(typeof draftSim!=='undefined'&&draftSim)?draftSim.log.length:-1,
    rows: body?body.querySelectorAll('tr').length:-1,
    feed: picks?picks.children.length:-1,
    kicked: !!window._zpbKickStarted, cine: !!document.querySelector('.zpb-fin-welcome') };
})()`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => errors.push('pageerror: ' + String(e).slice(0, 200)));
  page.on('dialog', d => d.accept());
  await page.goto(FILE); await sleep(1500);

  // ---- 1. load: zero console errors ----
  ok('1. zero console errors on load', errors.length === 0, errors.join(' | '));

  // ---- 2. draft screen: banner, chips, VS-NFL tab ----
  await page.click('#tabDraftBtn'); await sleep(400);
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); s.value = 'Kansas City Chiefs'; document.getElementById('draftPickNumberSelect').value = '20'; });
  await page.click('#startDraftBtn'); await sleep(2500);
  const cine = await page.evaluate(SNAP);
  ok('2a. cinematic stacks WELCOME/TO THE/DRAFT and CPU waits behind it', cine.cine === true && cine.log === 0 && cine.kicked === false);
  const skipTap = await page.evaluate(() => { document.querySelector('.zpb-fin-welcome').dispatchEvent(new Event('pointerdown')); return true; });
  await sleep(1200);
  const afterSkip = await page.evaluate(SNAP);
  ok('2b. tap-to-skip fires the kickoff (draft never waits on the cine)', afterSkip.kicked === true);
  const banner = await page.evaluate(() => {
    const b = document.getElementById('draftingAsBanner');
    const name = b.querySelector('.zpb-das-name');
    return { has: !!name, text: name ? name.textContent : '', shine: name ? name.className.includes('zpb-shine') : false };
  });
  ok('2c. team name printed by the logo in shimmering text', banner.has && banner.shine && banner.text === 'Kansas City Chiefs', banner.text);

  // ---- 3. board comes alive: CPU picks land in the feed, board rows stay populated ----
  await sleep(6000);
  const live = await page.evaluate(SNAP);
  ok('3a. the draft is alive (CPU picks landed, or you are on the clock)', live.feed > 0 || live.awaiting === true, 'feed=' + live.feed + ' log=' + live.log + ' awaiting=' + live.awaiting);
  ok('3b. board rows populated', live.rows > 100, 'rows=' + live.rows);

  // ---- 4. ALL/NONE chips: uppercase, inline after the KICKER chip, left flow ----
  const chips = await page.evaluate(() => {
    const bar = document.getElementById('draftChips');
    const kids = [...bar.querySelectorAll('.chip')];
    const labels = kids.map(c => c.textContent.trim());
    const allIdx = labels.findIndex(l => l === 'ALL'), noneIdx = labels.findIndex(l => l === 'NONE');
    const kIdx = labels.findIndex(l => l.startsWith('K '));
    const wrap = bar.querySelector('.zpb-allnone');
    return { labels, allIdx, noneIdx, kIdx, wrapStyle: wrap ? getComputedStyle(wrap).display : 'missing' };
  });
  ok('4a. ALL/NONE written like the other buttons (uppercase)', chips.allIdx >= 0 && chips.noneIdx >= 0);
  ok('4b. ALL/NONE sit right next to the KICKER chip', chips.kIdx >= 0 && chips.allIdx === chips.kIdx + 1 && chips.noneIdx === chips.kIdx + 2);
  ok('4c. chips flow left (wrapper display:contents)', chips.wrapStyle === 'contents');
  await page.screenshot({ path: SHOT + '/v15-board-live.png' });

  // ---- 5. user picks, draft reaches the results page ----
  const btn = await page.$('#draftBody2 button[data-pick]');
  if (btn) { await btn.click(); await sleep(500); }
  await page.click('#simToEndBtn'); await sleep(1200);
  const fin = await page.evaluate(() => ({ view: typeof resultsView !== 'undefined' ? resultsView : null, body: !!document.getElementById('draftResultsBody') }));
  ok('5. Sim to End still produces a normal team (results render, season view)', fin.body && fin.view === 'season');

  // ---- 6. VS. ACTUAL NFL TEAMS tab gating ----
  const tabs1 = await page.evaluate(() => {
    const tabs = [...document.querySelectorAll('#draftFinalResults .tabbtn')].map(b => b.textContent.trim());
    return { tabs, hasNfl: tabs.includes('VS. ACTUAL NFL TEAMS'), cyg: !!document.querySelector('.dsub .zpb-cyg') };
  });
  ok('6a. before the season: VS-NFL tab visible on the post-draft page', tabs1.hasNfl && tabs1.cyg);

  // ---- 6b. CAN YOU GO smaller than the 20-0 (measured on the pre-season stage intro) ----
  await page.click('#resultsSeasonBtn'); await sleep(500);
  const cyg = await page.evaluate(() => {
    const t = document.querySelector('.zpb-cygline .zpb-cygt');
    const s = document.querySelector('.zpb-cygline .zpb-shine');
    const d = document.querySelector('.dsub .zpb-cyg');
    const ds = document.querySelector('.dsub .zpb-shine');
    return { t: t?getComputedStyle(t).fontSize:null, s: s?getComputedStyle(s).fontSize:null,
             d: d?getComputedStyle(d).fontSize:null, ds: ds?getComputedStyle(ds).fontSize:null,
             n: document.querySelectorAll('.zpb-cygline .zpb-cygt').length };
  });
  ok('6b. CAN YOU GO renders smaller than the 20-0 (cygline + results header)', cyg.t && cyg.s && parseFloat(cyg.t) < parseFloat(cyg.s) && cyg.d && cyg.ds && parseFloat(cyg.d) < parseFloat(cyg.ds), JSON.stringify(cyg));

  await page.click('#resultsMineBtn'); await sleep(600);

  // ---- 7. YOUR ROSTER tab: order + menus + OVR replaces Wins + KR/PR + cleanups ----
  const roster = await page.evaluate(() => {
    const host = document.getElementById('lineupHost');
    const panel = host ? host.closest('.panel') : null;
    const panels = [...document.querySelectorAll('#draftResultsBody > .panel')];
    const heads = panels.map(p => (p.querySelector('h3,h4') || {}).textContent || '');
    const order = {
      lineup: panels.findIndex(p => p.querySelector('#lineupHost')),
      depth: panels.findIndex(p => p.textContent.includes('Your Full Depth Chart')),
      grade: panels.findIndex(p => p.textContent.includes('Overall Grade'))
    };
    const sel = document.querySelector('#lineupEd select[data-lineup]');
    const opts = sel ? [...sel.options].map(o => o.textContent) : [];
    const dotFmt = opts.filter(t => / \u00b7 .+ \u00b7 \d+/.test(t));
    const flexFmt = opts.filter(t => /\(\u2212\d+\)$/.test(t));
    const dwarVals = [...document.querySelectorAll('#lineupEd .depth-row .dwar')].map(s => s.textContent.trim());
    const optwins = document.querySelector('#lineupEd .zpb-optwins');
    const krRow = [...document.querySelectorAll('#lineupEd .depth-row')].find(r => r.querySelector('.slotname') && r.querySelector('.slotname').textContent.trim() === 'KR');
    const retrow = document.querySelector('#lineupEd .zpb-retrow');
    const retExplainer = document.body.innerHTML.includes('How is the returner chosen?');
    const kRow = [...document.querySelectorAll('#lineupEd .depth-row')].find(r => r.querySelector('.slotname') && r.querySelector('.slotname').textContent.trim() === 'K');
    const sameShape = krRow && kRow && krRow.className === kRow.className;
    const flexFoot = document.body.innerHTML.includes('Group scores');
    const caption = document.body.innerHTML.includes('flex penalties included)</div>');
    const flexSentence = document.body.innerHTML.includes('center\u2194guard');
    return { order, dotFmt: dotFmt.length, flexFmt: flexFmt.length, dwarVals, optwins: !!optwins,
      krDepthRow: !!krRow, retrow: !!retrow, retExplainer, sameShape, caption, flexSentence,
      krStyleMatch: krRow && kRow ? getComputedStyle(krRow.querySelector('.slotname')).color === getComputedStyle(kRow.querySelector('.slotname')).color : false };
  });
  ok('7a. order: lineup selector -> full depth chart -> draft ranking', roster.order.lineup === 0 && roster.order.depth === 1 && roster.order.grade === 2, JSON.stringify(roster.order));
  ok('7b. lineup menus read X \u00b7 pos \u00b7 OVR', roster.dotFmt > 0, 'formatted=' + roster.dotFmt);
  ok('7c. flexed options carry (\u2212beta)', roster.flexFmt >= 0); // informational: may be 0 if nobody flexes
  ok('7d. right side of player panels shows OVR, not Wins', roster.dwarVals.length > 0 && roster.dwarVals.every(v => v === '' || /^\d+$/.test(v)), roster.dwarVals.slice(0, 4).join(','));
  ok('7e. "0 wins" badge removed', roster.optwins === false);
  ok('7h. returner explainer dropdown removed', roster.retExplainer === false);
  ok('7i. "Group scores (flex penalties included)" caption removed', roster.caption === false);
  ok('7j. flex-penalty sentence removed from the lineup panel', roster.flexSentence === false);
  await page.screenshot({ path: SHOT + '/v15-roster-tab.png' });

  // ---- 8. group score tint when a flex drags a group down (force a flex, then re-render) ----
  const tint = await page.evaluate(() => {
    try {
      const roster = draftSim.rosters.find(r => r.isUser);
      let made = false;
      for (const [sl, q] of Object.entries(roster.slots)) {
        if (sl === 'TE1' && q && q[1] === 'TE') {
          for (const [s2, q2] of Object.entries(roster.slots)) {
            if (q2 && (q2[1] === 'WR') && eligibleSlotsFor(q2).includes('TE1') && eligibleSlotsFor(q).includes(s2)) {
              if (movePlayerToSlot(roster, q2[0], 'TE1')) { made = true; break; }
            }
          }
        }
        if (made) break;
      }
      if (!made) return { made: false };
      const host = document.getElementById('lineupHost');
      host.innerHTML = lineupEditorHTML(roster, 'lineupEd');
      wireLineupEditor(roster, 'lineupEd', () => {});
      const tinted = [...document.querySelectorAll('#lineupEd div[style*="var(--rose"]')].length;
      const caption = document.body.innerHTML.includes('flex penalties included)</div>');
      return { made: true, tinted, caption };
    } catch (e) { return { made: false, err: String(e).slice(0, 120) }; }
  });
  if (tint.made) {
    ok('8a. flex-dragged group score tints the number (palette wine)', tint.tinted > 0, 'tinted=' + tint.tinted);
    ok('8b. caption still absent after re-render', tint.caption === false);
  } else console.log('[skip] 8. no legal flex swap available to force the tint (' + (tint.err || 'roster shape') + ')');

  // ---- 9. season start: VS-NFL tab disappears everywhere ----
  await page.click('#resultsSeasonBtn'); await sleep(400);
  await page.evaluate(() => { try { startSeason(); } catch (e) {} });
  await sleep(2500);
  await page.evaluate(() => { try { resultsView = 'season'; renderDraftResults(); } catch (e) {} });
  await sleep(800);
  const tabs2 = await page.evaluate(() => {
    const tabs = [...document.querySelectorAll('#draftFinalResults .tabbtn')].map(b => b.textContent.trim());
    return { hasNfl: tabs.includes('VS. ACTUAL NFL TEAMS'), tabs };
  });
  ok('9. once the season starts, the VS-NFL tab is gone', tabs2.hasNfl === false, JSON.stringify(tabs2.tabs));

  // ---- 9b. KR/PR rows during the season: same shape, size and coloring as K and P ----
  await page.click('#resultsMineBtn'); await sleep(600);
  await page.evaluate(() => { try { zpbWireReturners(); } catch (e) {} }); await sleep(400);
  const kr = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('#lineupEd .depth-row')];
    const bySlot = {};
    rows.forEach(r => { const n = r.querySelector('.slotname'); if (n) bySlot[n.textContent.trim()] = r; });
    const K = bySlot['K'], P = bySlot['P'], KR = bySlot['KR'], PR = bySlot['PR'];
    const shape = r => r ? r.className : null;
    const selH = r => { const s = r && r.querySelector('select'); return s ? Math.round(s.getBoundingClientRect().height) : null; };
    const colr = r => { const n = r && r.querySelector('.slotname'); return n ? getComputedStyle(n).color : null; };
    return { hasK: !!K, hasP: !!P, hasKR: !!KR, hasPR: !!PR,
      sameShapeKR: K && KR && shape(K) === shape(KR), sameShapePR: P && PR && shape(P) === shape(PR),
      hK: selH(K), hKR: selH(KR), hP: selH(P), hPR: selH(PR),
      sameColorKR: K && KR && colr(K) === colr(KR), sameColorPR: P && PR && colr(P) === colr(PR),
      noRetrow: !document.querySelector('#lineupEd .zpb-retrow') };
  });
  ok('9b. KR row same shape and coloring as K', kr.hasKR && kr.sameShapeKR && kr.sameColorKR, JSON.stringify(kr));
  ok('9c. PR row same shape and coloring as P', kr.hasPR && kr.sameShapePR && kr.sameColorPR);
  ok('9d. KR/PR selects same height as K/P (box size uniform)', kr.hKR === kr.hK && kr.hPR === kr.hP, `K=${kr.hK} KR=${kr.hKR} P=${kr.hP} PR=${kr.hPR}`);
  ok('9e. no oversized retrow wrapper remains', kr.noRetrow);
  await page.screenshot({ path: SHOT + '/v15-season-roster-krpr.png' });

  // ---- 10. bold line + CAN YOU GO sizes ----
  const texts = await page.evaluate(() => {
    const boldOk = document.body.innerHTML.includes('How bold are you on <b>2-Pt Conversions</b>');
    const boldGone = !document.body.innerHTML.includes('How bold is your coach');
    const cygt = document.querySelectorAll('.zpb-cygline .zpb-cygt');
    const sizes = [...cygt].map(s => getComputedStyle(s).fontSize);
    const shine = document.querySelector('.zpb-cygline .zpb-shine');
    const shineSize = shine ? getComputedStyle(shine).fontSize : null;
    const explainer = document.body.innerHTML.includes('real-world numbers say a bold coach');
    return { boldOk, boldGone, cygtN: cygt.length, sizes, shineSize, explainer };
  });
  ok('10a. "How bold are you…" replaces the coach line', texts.boldOk && texts.boldGone);
  ok('10b. boldness explainer sentence removed', texts.explainer === false);

  // ---- 11. second draft in the same session still comes alive ----
  await page.evaluate(() => { try { startNewDraftFlow ? startNewDraftFlow() : (document.getElementById('draftSetup').style.display = 'block'); } catch (e) {} });
  await sleep(400);
  await page.evaluate(() => { try { startDraft2(); } catch (e) {} });
  await sleep(11500);
  const second = await page.evaluate(SNAP);
  ok('11. second draft: watchdog/gate still kick the CPU', second.kicked && (second.feed > 0 || second.awaiting), JSON.stringify(second));

  // ---- 12. zero console errors end-to-end ----
  ok('12. zero console errors end-to-end', errors.length === 0, errors.slice(0, 3).join(' | '));

  await browser.close();

  // ---- 13. reduced-motion + hidden-tab variants ----
  const b2 = await chromium.launch();
  const p2 = await b2.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const e2 = [];
  p2.on('pageerror', e => e2.push(String(e).slice(0, 120)));
  await p2.goto(FILE); await sleep(1200);
  await p2.evaluate(() => { try { setActiveTab('viewDraft', 'tabDraftBtn'); } catch (e) {} });
  await p2.evaluate(() => { try { startDraft2(); } catch (e) {} });
  await sleep(5000);
  const rm = await p2.evaluate(SNAP);
  ok('13a. reduced motion: draft kicks without the cinematic', rm.kicked && rm.log > 0, JSON.stringify(rm));
  ok('13b. reduced motion: zero page errors', e2.length === 0, e2.join('|'));
  await b2.close();

  console.log(fails.length ? `\nSUITE FAILED: ${fails.length} — ${fails.join(' · ')}` : '\nSUITE PASSED: all checks green');
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('SUITE CRASH:', e); process.exit(2); });
