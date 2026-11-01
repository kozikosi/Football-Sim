/* w51_live.js — the Owner's round-51 verification battery (v2) */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const fs = require('fs');
const FILE = 'file:///home/z/my-project/w51/Football-Sim-Z-post-blue-w51.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (name, cond, extra) => { if (cond) { pass++; console.log('  ✓ ' + name); } else { fail++; console.log('  ✗ FAIL ' + name + (extra ? '  [' + extra + ']' : '')); } };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 200)));

  // ============ S · source laws ============
  const src = fs.readFileSync('/home/z/my-project/w51/Football-Sim-Z-post-blue-w51.html', 'utf8');
  ok('S1 · the seed message reads ALL CAPS with the dot (his named message)', src.includes("'NO. 1 SEED \\u00b7 FIRST-ROUND BYE!'") && !src.includes('No. 1 seed: first-round bye'));
  ok('S2 · the clock renders the dot (no colon composers left)', !/return mm \+ ':'/.test(src) && !/Math\.floor\(m\) \+ ':'/.test(src));
  ok('S3 · the w51 dot-law sweep block is present', src.includes('id="zpb-w51-js"') && src.includes('THE DOT LAW'));

  // ============ R3 · the homepage DRAFT button ============
  console.log('— R3 · the homepage DRAFT button ink —');
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.waitForTimeout(300);
  const draftInk0 = await page.evaluate(() => {
    const b = document.getElementById('startDraftBtn');
    return { takeover: !!document.documentElement.getAttribute('data-zpbteam'), col: getComputedStyle(b).color, ts: getComputedStyle(b).textShadow !== 'none' };
  });
  ok('R3a · no team: the DRAFT ink is the halfway rose #8e5566 (the black retires)', draftInk0.col === 'rgb(142, 85, 102)', JSON.stringify(draftInk0));
  ok('R3b · the rose wears its cream halo on the liquid metal', draftInk0.ts);
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'Kansas City Chiefs'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(700);
  const draftInk1 = await page.evaluate(() => {
    const b = document.getElementById('startDraftBtn');
    const pk = zpbPackFor('Kansas City Chiefs');
    const hx = h => { h = String(h).replace('#',''); if (h.length===3) h = h.split('').map(c=>c+c).join(''); const n = parseInt(h,16); return `rgb(${(n>>16)&255}, ${(n>>8)&255}, ${n&255})`; };
    return { takeover: !!document.documentElement.getAttribute('data-zpbteam'), col: getComputedStyle(b).color, wantL: hx(pk.txM || pk.accL) };
  });
  ok('R3c · with a team: the DRAFT ink rides the team\'s 0.50 halfway ink', draftInk1.takeover && draftInk1.col === draftInk1.wantL, JSON.stringify(draftInk1));

  // ============ R6 · the dot law, live ============
  console.log('— R6 · the dot law —');
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.evaluate(() => { const b = document.getElementById('tabGuideBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  const colonWalk = sel => page.evaluate(sel2 => new Promise(res => requestAnimationFrame(() => requestAnimationFrame(() => {
    const bad = [];
    const w = document.createTreeWalker(document.querySelector(sel2) || document.body, NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())) { if (/[;:]/.test(n.nodeValue || '')) bad.push(n.nodeValue.trim().slice(0, 60)); }
    res(bad.slice(0, 5));
  }))), sel);
  ok('R6a · the Guide renders zero colons/semicolons (the sweep owns the prose)', (await colonWalk('#viewGuide')).length === 0, JSON.stringify(await colonWalk('#viewGuide')));
  await page.evaluate(() => { const b = document.getElementById('tabRankingsBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  ok('R6b · the rankings pages render zero colons/semicolons', (await colonWalk('#viewRankings')).length === 0, JSON.stringify(await colonWalk('#viewRankings')));

  // ============ draft to results ============
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    const i = document.getElementById('speedInstantBtn'); if (i) i.click();
    const s = document.getElementById('simToEndBtn'); if (s) s.click();
  });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(1200);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); window.zpbReleaseLookGate && window.zpbReleaseLookGate(); document.documentElement.style.setProperty('--dfc-base', '0s'); } catch (e) {} });
  await page.evaluate(() => { try { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); } catch (e) {} });
  await page.waitForTimeout(400);
  await page.evaluate(() => { try { document.getElementById('resultsMineBtn').click(); } catch (e) {} });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { const m = document.querySelector('#draftResultsBody .zpb-fm'); if (m) m.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(2500);
  const mapActive = await page.evaluate(() => { const m = document.querySelector('#draftResultsBody .zpb-fm'); return { vis: m ? !!m.offsetParent : null, hiddenChain: (() => { let p = m, out = []; while (p && p !== document.body) { const cs = getComputedStyle(p); if (cs.display === 'none' || cs.visibility === 'hidden') out.push(p.id || p.className.slice(0, 30)); p = p.parentElement; } return out; })() }; });
  console.log('   map active:', JSON.stringify(mapActive));

  // ============ R2 · NICKEL and DIME on one line ============
  console.log('— R2 · the map twins on one line —');
  const mapGeo = await page.evaluate(() => {
    const scope = document.querySelectorAll('#draftResultsBody .zpb-fm .zpb-fm-ini');
    const find = slot => [...scope].find(e => (e.getAttribute('data-slot') === slot));
    const nk = find('NICKEL'), dm = find('DIME');
    if (!nk || !dm) return { miss: true, n: scope.length };
    const rectOf = el => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width) }; };
    return { nk: rectOf(nk), dm: rectOf(dm), sameRow: nk.parentElement === dm.parentElement, n: scope.length, dmLabel: (dm.querySelector('i') || {}).textContent || '', bracket: nk.closest('.zpb-fm').outerHTML.indexOf('[') >= 0 };
  });
  if (mapGeo.miss) ok('R2a · the map bubbles mount', false, JSON.stringify(mapGeo));
  else {
    ok('R2a · NICKEL and DIME share ONE map row (both at the same line)', mapGeo.sameRow && mapGeo.nk.w > 0 && Math.abs(mapGeo.nk.y - mapGeo.dm.y) <= 8, JSON.stringify(mapGeo));
    ok('R2b · the flank law: the nickel left, the dime mirrored right', mapGeo.dm.x > mapGeo.nk.x, JSON.stringify(mapGeo));
    ok('R2c · no bracket anywhere on the map — the empty dime is a clean middot', !mapGeo.bracket && mapGeo.dmLabel.indexOf('[') < 0, JSON.stringify({ dmLabel: mapGeo.dmLabel }));
  }
  const genMap = await page.evaluate(() => {
    const host = document.getElementById('zpbGuideHost') || document.body;
    const fm = [...host.querySelectorAll('.zpb-fm')].pop();
    if (!fm) return { miss: true };
    const rows = [...fm.querySelectorAll('.zpb-fm-row')];
    const nr = rows.find(r => [...r.querySelectorAll('i')].some(i => i.textContent.trim() === 'NICKEL'));
    const dr = rows.find(r => [...r.querySelectorAll('i')].some(i => i.textContent.trim() === 'DIME'));
    return { one: !!(nr && nr === dr) };
  });
  ok('R2d · the generic field map too: NICKEL and DIME on one station row', genMap.one === true, JSON.stringify(genMap));

  // ============ R5 · the hub buttons ============
  console.log('— R5 · the gold continues —');
  await page.evaluate(() => { try { document.getElementById('resultsSeasonBtn').click(); } catch (e) {} });
  await page.waitForTimeout(800);
  await page.evaluate(() => { try { (document.getElementById('beginSeasonBtn') || document.getElementById('beginSeasonBtn2')).click(); } catch (e) {} });
  await page.waitForTimeout(1200);
  const hubBtns = await page.evaluate(() => {
    const pick = el => { if (!el) return null; const cs = getComputedStyle(el);
      return { text: el.textContent.trim().slice(0, 30), img: cs.backgroundImage, col: cs.color, vis: !!el.offsetParent }; };
    return { simSeason: pick(document.getElementById('simSeasonBtn')) };
  });
  ok('R5a · SIM SEASON gave the gold away (quiet pill, its spot unchanged)', hubBtns.simSeason && hubBtns.simSeason.img === 'none', JSON.stringify(hubBtns.simSeason));
  await page.evaluate(() => { try { const b = document.getElementById('simWeekBtn'); if (b) b.click(); else { const p = [...document.querySelectorAll('button')].find(x => /play the /i.test(x.textContent)); if (p) p.click(); } } catch (e) {} });
  await page.waitForTimeout(3000);
  await page.evaluate(() => { try { const s = document.getElementById('zrepSkip'); if (s) s.click(); } catch (e) {} });
  await page.waitForTimeout(900);
  await page.evaluate(() => { try { const s = document.getElementById('zrepSkip'); if (s) s.click(); } catch (e) {} });
  await page.waitForTimeout(1500);
  const contBtn = await page.evaluate(() => {
    const el = document.getElementById('nextWeekBtn'); if (!el) return null;
    const cs = getComputedStyle(el);
    return { text: el.textContent.trim().slice(0, 40), img: cs.backgroundImage, vis: !!el.offsetParent };
  });
  ok('R5b · CONTINUE TO WEEK X wears the gold franchise pill', contBtn && contBtn.img.indexOf('linear-gradient') >= 0, JSON.stringify(contBtn));

  // ============ R1 + R6 · the during-game screen ============
  console.log('— R1 · only the game time is neutral —');
  await page.evaluate(() => { try { document.documentElement.setAttribute('data-theme', 'dark'); } catch (e) {} });
  await page.waitForTimeout(300);
  const gameScan = await page.evaluate(() => new Promise(res => {
    try {
      document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove());
      const user = seasonUserTeam();
      const played = seasonState.schedule.filter(x => x.played && (x.home === user || x.away === user));
      const g = played[played.length - 1];
      if (!g || !g.result) return res({ skip: 'no game' });
      zpbGameReplay(g, user);
      setTimeout(() => { try { const s = document.getElementById('zrepSkip'); if (s) s.click(); } catch (e) {} }, 700);
      setTimeout(() => { try { const s = document.getElementById('zrepSkip'); if (s) s.click(); } catch (e) {} }, 2400);
      setTimeout(() => {
        const log = document.querySelector('.zpb-replay-ov .zpb-rep-log');
        if (!log) return res({ skip: 'no log' });
        const pk = (typeof zpbPackFor === 'function') ? zpbPackFor(user) : null;
        const hx = h => { h = String(h).replace('#',''); if (h.length===3) h = h.split('').map(c=>c+c).join(''); const n = parseInt(h,16); return `rgb(${(n>>16)&255}, ${(n>>8)&255}, ${n&255})`; };
        const creamLight = 'rgb(83, 56, 43)', creamDark = 'rgb(242, 231, 213)';
        const times = [...log.querySelectorAll('.zrl-t')].map(e => getComputedStyle(e).color);
        const qcol = (() => { const q = log.querySelector('.zpb-rep-q'); return q ? getComputedStyle(q).color : null; })();
        const plays = [...log.querySelectorAll('.zpb-rep-line')].map(ln => { const t = ln.querySelector('.zrl-team'), p = ln.querySelector('.zrl-play'); if (!t || !p) return null;
          const bare = [...p.childNodes].some(nd => nd.nodeType === 3 && (nd.nodeValue || '').trim().length > 0);
          return { teamC: getComputedStyle(t).color, playC: getComputedStyle(p).color, bare, hasTxt: (p.textContent || '').trim().length > 0 }; }).filter(Boolean);
        const chips = [...log.querySelectorAll('.zrl-badge')].map(e => ({ t: e.textContent.trim(), c: getComputedStyle(e).color }));
        const colon = []; const w = document.createTreeWalker(log, NodeFilter.SHOW_TEXT); let n;
        while ((n = w.nextNode())) if (/[;:]/.test(n.nodeValue || '')) colon.push((n.nodeValue || '').trim().slice(0, 40));
        res({ lines: log.querySelectorAll('.zpb-rep-line').length, times: [...new Set(times)], qcol, plays, chips: chips.slice(0, 24), colon: colon.slice(0, 6),
          creamVals: [creamLight, creamDark], pkInk: pk ? hx(pk.txMd || pk.txd || pk.accD) : null, qchip: (() => { const q = document.querySelector('.zpb-replay-ov .zpb-rep-qchip'); return q ? getComputedStyle(q).color : null; })() });
      }, 4200);
    } catch (e) { res({ skip: String(e).slice(0, 120) }); }
  }));
  if (gameScan.skip) { ok('R1 · (replay scan ran)', false, JSON.stringify(gameScan)); }
  else {
    ok('R1a · the game time stays the neutral cream under the takeover', gameScan.lines > 0 && gameScan.times.length > 0 && gameScan.times.every(c => gameScan.creamVals.includes(c)), JSON.stringify({ lines: gameScan.lines, times: gameScan.times }));
    ok('R1b · the quarter marks ride the team ink again (not the cream)', gameScan.qcol && !gameScan.creamVals.includes(gameScan.qcol), JSON.stringify({ qcol: gameScan.qcol, qchip: gameScan.qchip }));
    ok('R1c · the play words wear the benefiting team\'s color', gameScan.plays.filter(p => p.hasTxt && p.bare).length > 0 && gameScan.plays.filter(p => p.hasTxt && p.bare).every(p => p.playC === p.teamC), JSON.stringify({ n: gameScan.plays.length, bare: gameScan.plays.filter(p => p.bare).length, sample: gameScan.plays.slice(0, 2) }));
    ok('R1d · no TO/INT/FF box reads the cream — every chip wears a team color', gameScan.chips.length === 0 || gameScan.chips.every(ch => !gameScan.creamVals.includes(ch.c)), JSON.stringify(gameScan.chips.slice(0, 8)));
    ok('R1e · the clock speaks the dot (1Q 12·34, never a colon)', gameScan.colon.length === 0, JSON.stringify(gameScan.colon));
  }

  // ============ R7 + R8 + R4b · the playoff cinematic (a fabricated Conference Championship on real rosters) ============
  console.log('— R7 · the playoff cinematic —');
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} });
  const introScan = await page.evaluate(() => new Promise(res => {
    try {
      document.documentElement.setAttribute('data-theme', 'dark');
      const user = seasonUserTeam();
      const other = Object.keys(seasonState.teams).find(t => t !== user);
      const g = { home: user, away: other, roundLabel: 'Conference Championship',
        result: { homeScore: 27, awayScore: 24,
          homeEvents: [{ type: 'FG', q: 1, t: 0.9, pts: 3 }, { type: 'TD', q: 2, t: 0.72, pts: 7 }, { type: 'TD', q: 4, t: 0.2, pts: 7 }],
          awayEvents: [{ type: 'TD', q: 1, t: 0.5, pts: 7 }, { type: 'FG', q: 3, t: 0.4, pts: 3 }] },
        detail: { home: { players: [] }, away: { players: [] } } };
      zpbGameReplay(g, user);
      setTimeout(() => {
        const intro = document.querySelector('.zpb-replay-ov .zpb-rep-intro');
        if (!intro) return res({ skip: 'no intro' });
        const out = { beams: intro.querySelectorAll('.zpb-intro-beam').length, rays: intro.querySelectorAll('.zpb-intro-rays').length, embers: intro.querySelectorAll('.zpb-intro-ember').length, ring: !!intro.querySelector('.zpb-intro-ring'), stars: intro.querySelectorAll('.zpb-intro-star').length };
        const t = intro.querySelector('.zpb-intro-title');
        out.title = t ? t.textContent.trim() : '';
        out.titleMt = t ? getComputedStyle(t).marginTop : null;
        out.diamond = t ? (getComputedStyle(t, '::before').content || '') : null;
        const ring = intro.querySelector('.zpb-intro-ring');
        out.fires = 0;
        if (ring) ring.addEventListener('animationstart', () => { out.fires++; });
        setTimeout(() => { out.pairs = Math.round(out.stars / 2); res(out); }, 19000);
      }, 2000);
    } catch (e) { res({ skip: String(e).slice(0, 120) }); }
  }));
  if (introScan.skip) ok('R7 · (playoff intro)', false, JSON.stringify(introScan));
  else {
    ok('R7a · the stage dresses up: two team beams, the rays, seven embers, the ring', introScan.beams === 2 && introScan.rays === 1 && introScan.embers === 7 && introScan.ring, JSON.stringify(introScan));
    ok('R7b · the center flashes ONCE FOR EACH KEY PLAYER (ring pops = pairs)', introScan.pairs >= 1 && introScan.fires === introScan.pairs, JSON.stringify({ fires: introScan.fires, pairs: introScan.pairs }));
    ok('R7c · the title wears the gold diamonds', String(introScan.diamond).indexOf('◆') >= 0, JSON.stringify(introScan.diamond));
    ok('R8a · the round title sits slightly down (16px of room for the top star)', introScan.titleMt === '16px', JSON.stringify({ title: introScan.title, mt: introScan.titleMt }));
  }

  // ============ R4 · light-mode gold + the velvet panel ============
  console.log('— R4 · the light-mode shimmer + the velvet —');
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} });
  const velvet = await page.evaluate(() => new Promise(res => {
    try {
      document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove());
      const user = seasonUserTeam();
      const other = Object.keys(seasonState.teams).find(t => t !== user);
      const g = { home: user, away: other, roundLabel: 'Conference Championship',
        result: { homeScore: 27, awayScore: 24,
          homeEvents: [{ type: 'FG', q: 1, t: 0.9, pts: 3 }, { type: 'TD', q: 2, t: 0.72, pts: 7 }],
          awayEvents: [{ type: 'TD', q: 1, t: 0.5, pts: 7 }] },
        detail: { home: { players: [] }, away: { players: [] } } };
      document.documentElement.setAttribute('data-theme', 'light');
      zpbGameReplay(g, user);
      setTimeout(() => {
        const st = document.querySelector('.zpb-replay-ov .zpb-intro-star');
        if (!st) return res({ skip: 'no star' });
        const cs = getComputedStyle(st);
        const shim = getComputedStyle(document.documentElement).getPropertyValue('--zshim').trim();
        document.documentElement.setAttribute('data-theme', 'dark');
        const shimD = getComputedStyle(document.documentElement).getPropertyValue('--zshim').trim();
        document.documentElement.setAttribute('data-theme', 'light');
        res({ bg: cs.backgroundImage.slice(0, 100), borderColor: cs.borderColor, shim, shimD });
      }, 2400);
    } catch (e) { res({ skip: String(e).slice(0, 120) }); }
  }));
  if (velvet.skip) ok('R4 · (the velvet panel)', false, JSON.stringify(velvet));
  else {
    ok('R4a · light mode: the shimmer gold brightens a step (#ad7f2e) · dark keeps the deep gold', velvet.shim === '#ad7f2e' && velvet.shimD === '#8a5f18', JSON.stringify({ shim: velvet.shim, shimD: velvet.shimD }));
    ok('R4b · the star panel is the team-tinted velvet (a color-mix gradient, not the old flat glass)', /color-mix|linear-gradient/.test(velvet.bg) && velvet.borderColor !== 'rgba(217, 169, 76, 0.4)', JSON.stringify(velvet));
  }

  console.log('pageerrors:', errors.length, errors.slice(0, 3));
  errors.forEach(e => ok('zero page errors', false, e));
  console.log(`\nw51_live: ${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
