/* w50_probe_sync.js — compare map station delays vs breakdown-card delays per name */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w50work/Football-Sim-Z-post-blue-w50.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 160)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1500);
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
  await page.evaluate(() => {
    const b = document.getElementById('backToResultsBtn') || [...document.querySelectorAll('button')].find(x => /see the results|draft results/i.test(x.textContent || ''));
    if (b) b.click();
  });
  await page.waitForTimeout(1200);
  // click the FIRST team row (the user's team is first in the results table)
  await page.evaluate(() => {
    const tr = document.querySelector('.teamrow');
    if (tr) tr.click();
  });
  await page.waitForTimeout(1400);
  // scroll the map into view to trip the look-gate
  await page.evaluate(() => { const m = document.querySelector('.zpb-fm'); if (m) m.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(1800);
  const data = await page.evaluate(() => {
    const lastW = n=>{ const w = String(n).trim().split(/\s+/); const SUF=/^(jr|sr|ii|iii|iv|v)\.?$/i; let a=[...w]; while(a.length>1&&SUF.test(a[a.length-1])) a.pop(); return a[a.length-1]; };
    const map = document.querySelector('.zpb-fm');
    const out = { mapSeen: map ? map.classList.contains('zpb-seen') : null,
      mapCine: map ? map.style.getPropertyValue('--dfc-cine') : null,
      groups: [] };
    document.querySelectorAll('.zpb-dbk-g').forEach(g => {
      out.groups.push({ seen: g.classList.contains('zpb-seen'), cine: g.style.getPropertyValue('--dfc-cine') });
    });
    // per-name delays
    const stations = {};
    map && map.querySelectorAll('.zpb-fm-ini[data-slot]').forEach(st => {
      const b = st.querySelector('b');
      const nm = b ? lastW(b.textContent.trim()) : '';
      const cs = getComputedStyle(st);
      stations[nm] = { beat: st.style.getPropertyValue('--beat'), delay: cs.animationDelay, dur: cs.animationDuration, name: st.dataset.slot };
    });
    const cards = {};
    document.querySelectorAll('.zpb-dbk.zpb-dfc2[data-slot]').forEach(c => {
      const b = c.querySelector('b');
      const nm = b ? lastW(b.textContent.trim()) : '';
      const cs = getComputedStyle(c);
      cards[nm] = { beat: c.style.getPropertyValue('--beat'), delay: cs.animationDelay, dur: cs.animationDuration, slot: c.dataset.slot, full: b ? b.textContent.trim() : '' };
    });
    out.stations = stations; out.cards = cards;
    // the dfc-base root value
    out.dfcBase = getComputedStyle(document.documentElement).getPropertyValue('--dfc-base');
    out.finCine = window.__zpbFinCineEndsAt ? (window.__zpbFinCineEndsAt - Date.now()) : null;
    return out;
  });
  const names = Object.keys(data.stations);
  console.log('mapSeen:', data.mapSeen, 'mapCine:', JSON.stringify(data.mapCine), 'groups:', JSON.stringify(data.groups.slice(0, 6)));
  console.log('dfcBase:', JSON.stringify(data.dfcBase), 'cineRemaining(ms):', data.finCine);
  let synced = 0, diff = 0, miss = 0;
  names.forEach(n => {
    const s = data.stations[n];
    const c = data.cards[n];
    if (!c) { miss++; if (miss < 8) console.log('NO CARD for', n, JSON.stringify(s)); return; }
    if (s.delay === c.delay) synced++; else { diff++; if (diff <= 14) console.log('DIFF', n, '| station delay', s.delay, 'beat', s.beat, '| card', c.full, 'delay', c.delay, 'beat', c.beat); }
  });
  console.log('names:', names.length, 'synced:', synced, 'diff:', diff, 'no-card:', miss);
  console.log('pageerrors:', errors.length, errors.slice(0, 4));
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
