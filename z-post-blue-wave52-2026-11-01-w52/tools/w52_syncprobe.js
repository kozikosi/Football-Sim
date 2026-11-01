/* w52_syncprobe.js — reproduce the M1 desync: map stations vs player cards underneath
 * Measures when each station / card / depth-row STARTS its entrance, relative to the map look. */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w52/Football-Sim-Z-post-blue-w52.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 160)));
  await page.goto(FILE); await page.waitForTimeout(800);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);

  // draft fast
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1500);
  const state0 = await page.evaluate(() => ({
    fin: !!document.querySelector('.zpb-fin'),
    finEndsAt: window.__zpbFinCineEndsAt || 0,
    now: Date.now(),
    view: typeof resultsView !== 'undefined' ? resultsView : null,
    hasTable: !!document.querySelector('#draftResultsBody table'),
    detailOpen: (() => { const r = document.querySelector('.detailrow'); return r ? r.style.display : null; })(),
    mapCount: document.querySelectorAll('.zpb-fm').length,
    seenMaps: document.querySelectorAll('.zpb-fm.zpb-seen').length,
    dbkG: document.querySelectorAll('.zpb-dbk-g').length,
    dbkSeen: document.querySelectorAll('.zpb-dbk-g.zpb-seen').length
  }));
  console.log('A · right after draft ends:', JSON.stringify(state0));

  // wait out the finale naturally like a user would (max 8s)
  for (let i = 0; i < 16; i++) {
    const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin'));
    if (!fin) break;
    await page.waitForTimeout(500);
  }
  const state1 = await page.evaluate(() => ({
    fin: !!document.querySelector('.zpb-fin'),
    mapCount: document.querySelectorAll('.zpb-fm').length,
    seenMaps: document.querySelectorAll('.zpb-fm.zpb-seen').length,
    dbkG: document.querySelectorAll('.zpb-dbk-g').length,
    dbkSeen: document.querySelectorAll('.zpb-dbk-g.zpb-seen').length,
    cineMap: (() => { const m = document.querySelector('.zpb-fm'); return m ? m.style.getPropertyValue('--dfc-cine') : null; })(),
    cineG1: (() => { const g = document.querySelector('.zpb-dbk-g'); return g ? g.style.getPropertyValue('--dfc-cine') : null; })()
  }));
  console.log('B · after finale cleared:', JSON.stringify(state1));

  // THE USER MOTION: scroll down to the map slowly (like a reader)
  await page.evaluate(() => { const m = document.querySelector('.zpb-fm'); if (m) m.scrollIntoView({ block: 'center' }); });
  const tLook = Date.now();
  await page.waitForTimeout(600);
  const state2 = await page.evaluate(() => ({
    seenMaps: document.querySelectorAll('.zpb-fm.zpb-seen').length,
    dbkSeen: document.querySelectorAll('.zpb-dbk-g.zpb-seen').length,
    cineMap: (() => { const m = document.querySelector('.zpb-fm'); return m ? m.style.getPropertyValue('--dfc-cine') : null; })(),
    cineG1: (() => { const g = document.querySelector('.zpb-dbk-g'); return g ? g.style.getPropertyValue('--dfc-cine') : null; })(),
    beatOfStation1: (() => { const s = document.querySelector('.zpb-fm .zpb-fm-ini[data-beat]'); return s ? s.getAttribute('data-beat') : null; })(),
    beatOfCard1: (() => { const c = document.querySelector('.zpb-dbk[data-beat]'); return c ? c.getAttribute('data-beat') : null; })()
  }));
  console.log('C · after scroll to map (t+' + (Date.now() - tLook) + 'ms):', JSON.stringify(state2));

  // track animation starts live for 30s: for each beat, when the station and the card begin
  const track = await page.evaluate(() => new Promise(res => {
    const starts = {}; // key: kind+beat -> ms since T0
    const T0 = performance.now();
    const all = document.querySelectorAll('.zpb-fm .zpb-fm-ini[data-beat], .zpb-dbk-g .zpb-dbk[data-beat]');
    all.forEach(el => {
      el.addEventListener('animationstart', e => {
        if (e.animationName !== 'zpbCardIn') return;
        const beat = el.getAttribute('data-beat');
        const kind = el.classList.contains('zpb-fm-ini') ? 'station' : 'card';
        const k = kind + beat;
        if (!starts[k]) starts[k] = Math.round(performance.now() - T0);
      });
    });
    setTimeout(() => res(starts), 30000);
  }));
  const pairs = [];
  Object.keys(track).forEach(k => {
    const beat = k.replace(/^(station|card)/, '');
    pairs[beat] = pairs[beat] || {};
    pairs[beat][k.replace(/\d.*$/, '')] = track[k]; // crude
  });
  // build a clean comparison
  const stat = {}, card = {};
  Object.keys(track).forEach(k => {
    const m = k.match(/^(station|card)(\d+)$/); if (!m) return;
    (m[1] === 'station' ? stat : card)[m[2]] = track[k];
  });
  const rows = [];
  Object.keys(stat).sort((a, b) => a - b).forEach(b => {
    rows.push({ beat: +b, station: stat[b], card: card[b], delta: (card[b] != null && stat[b] != null) ? card[b] - stat[b] : null });
  });
  console.log('D · per-beat start times (ms after look), first 10 + last 3:');
  rows.slice(0, 10).forEach(r => console.log('   ', JSON.stringify(r)));
  rows.slice(-3).forEach(r => console.log('   ', JSON.stringify(r)));
  const synced = rows.filter(r => r.delta != null);
  const maxDelta = synced.reduce((m, r) => Math.max(m, Math.abs(r.delta)), 0);
  console.log('E · pairs measured:', synced.length, ' max |delta| ms:', maxDelta);

  // where are the cards vs the map? does the user see them at the same time?
  const geo = await page.evaluate(() => {
    const m = document.querySelector('.zpb-fm'); const c = document.querySelector('.zpb-dbk-g');
    if (!m || !c) return null;
    const rm = m.getBoundingClientRect(), rc = c.getBoundingClientRect();
    return { mapTop: Math.round(rm.top), cardTop: Math.round(rc.top), vh: innerHeight, cardVisibleNow: rc.top < innerHeight };
  });
  console.log('F · geometry at look+30s:', JSON.stringify(geo));
  console.log('pageerrors:', errors.length ? errors : 'none');
  await browser.close();
})().catch(e => { console.error('HARNESS FAIL', e); process.exit(1); });
