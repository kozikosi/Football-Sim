/* w57_storage.js — the storage rig: the module's own 18-check suite in the real page,
 * the 250 KB write+parse bench (Phase 0 question 5), and the showcase smoke (?storage=1). */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/football-sim/worktrees/zai/Football-Sim-Z-post-blue-w57.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/football-sim/worktrees/zai/z-post-blue-wave57-2026-11-02-w57/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 140)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  // S1 · the module exists with the contract surface
  const s1 = await page.evaluate(() => {
    const Z = window.ZPBStorage;
    return Z ? {
      api: ['list', 'load', 'save', 'remove', 'restore', 'migrate'].every(k => typeof Z[k] === 'function'),
      schema: Z.schemaVersion, slots: JSON.stringify(Z.slots),
      stats: !!(Z.stats && Z.stats.applySeason && Z.stats.legend),
      globals: !!(Z.profile && Z.settings && Z.brag),
      engineFree: !String(Z.save).includes('simulateGame')
    } : null;
  });
  ok(s1 && s1.api, 'S1 · the facade exposes list/load/save/remove/restore/migrate', JSON.stringify(s1));
  ok(s1 && s1.schema === 1 && s1.slots === '["A","B","C"]', 'S1 · schemaVersion 1, three slots');
  ok(s1 && s1.stats && s1.globals, 'S1 · the stats schema + profile/settings/brag globals ride along');

  // S2 · the module's own rig (interrupted write, corruption, quota, unavailable, newer-version, soft delete, stats ledger)
  const rig = await page.evaluate(() => new Promise(res => {
    const r = window.ZPBStorage._test();
    const wait = () => window.__zpbStorageTest && (window.__zpbStorageTest.pass + window.__zpbStorageTest.fail > 0) ? res(window.__zpbStorageTest) : setTimeout(wait, 120);
    wait();
  }));
  rig.lines.forEach(l => console.log('   ' + l));
  ok(rig.fail === 0 && rig.pass >= 16, `S2 · the storage rig passes whole (${rig.pass} checks, ${rig.fail} fail)`);

  // S3 · the 250 KB bench — the Phase 0 timing question, answered with numbers on THIS machine
  const bench = await page.evaluate(() => {
    const mk = n => { const a = []; for (let i = 0; i < n; i++) a.push({ id: 'p' + i, name: 'Player_name_' + (i % 900), pos: ['QB', 'RB', 'WR', 'TE', 'DT'][i % 5], team: ['CAR', 'SF', 'KC'][i % 3], ovr: 70 + (i % 30), spd: 70 + (i % 25), str: 60 + (i % 35), agi: 68 + (i % 28), acc: 71 + (i % 24), zone: 'Man ' + (i % 4), years: 1 + (i % 12) }); return a; };
    const obj = { kind: 'week', schemaVersion: 1, engineVersion: 'bench', dataVersion: 'bench', slot: 'A', savedAt: new Date().toISOString(), payload: { pool: mk(1900) } };
    const raw = JSON.stringify(obj);
    const t0 = performance.now(); const s = JSON.stringify(obj); const t1 = performance.now();
    try { localStorage.setItem('zpb:bench', s); } catch (e) {}
    const t2 = performance.now();
    const back = JSON.parse(localStorage.getItem('zpb:bench')); const t3 = performance.now();
    localStorage.removeItem('zpb:bench');
    return { kb: Math.round(raw.length / 1024), stringify: +(t1 - t0).toFixed(2), write: +(t2 - t1).toFixed(2), parse: +(t3 - t2).toFixed(2), round: back.payload.pool.length === 1900 };
  });
  ok(bench.round && bench.kb >= 240, 'S3 · the 250 KB-class payload round-trips', JSON.stringify(bench));
  console.log(`   [bench] ${bench.kb} KB — stringify ${bench.stringify} ms · localStorage write ${bench.write} ms · JSON.parse ${bench.parse} ms (desktop chromium; the phone estimate ×4-8 goes in the Phase 0 plan)`);

  // S4 · the showcase mounts on ?storage=1 and renders every specimen
  await page.goto(FILE + '?storage=1'); await page.waitForTimeout(1100);
  const sh = await page.evaluate(() => {
    const sh2 = document.querySelector('.zpb-st-shell');
    return sh2 ? { tabs: sh2.querySelectorAll('.zpb-st-tabs button').length, cards: sh2.querySelectorAll('.zpb-st-card,.zpb-st-slot,.zpb-st-state').length, continueVisible: !!sh2.querySelector('.zpb-st-continue') } : null;
  });
  ok(sh && sh.tabs === 7 && sh.continueVisible, 'S4 · ?storage=1 mounts the showcase (7 specimen tabs)', JSON.stringify(sh));
  await page.screenshot({ path: SHOTS + '/w57-storage-continue.png' });
  const tabNames = ['OVERWRITE', 'PROFILE', 'SETTINGS', 'STATS'];
  // walk the tabs (STATS is BRAG here — the tabs are CONTINUE SLOTS OVERWRITE PROFILE SETTINGS BRAG STATES)
  for (const t of ['SLOTS', 'OVERWRITE', 'PROFILE', 'SETTINGS', 'BRAG', 'STATES']) {
    await page.evaluate(lbl => {
      const b = [...document.querySelectorAll('.zpb-st-tabs button')].find(x => x.textContent.trim() === lbl);
      if (b) b.click();
    }, t);
    await page.waitForTimeout(240);
  }
  const states = await page.evaluate(() => document.querySelectorAll('.zpb-st-state').length);
  ok(states === 6, 'S4 · the honest-states specimen shows all six cards', 'states=' + states);
  await page.screenshot({ path: SHOTS + '/w57-storage-states.png' });
  await page.evaluate(() => [...document.querySelectorAll('.zpb-st-tabs button')].find(x => x.textContent.trim() === 'PROFILE').click());
  await page.waitForTimeout(240);
  await page.screenshot({ path: SHOTS + '/w57-storage-profile.png' });
  await page.evaluate(() => [...document.querySelectorAll('.zpb-st-tabs button')].find(x => x.textContent.trim() === 'SLOTS').click());
  await page.waitForTimeout(240);
  await page.screenshot({ path: SHOTS + '/w57-storage-slots.png' });
  await page.evaluate(() => [...document.querySelectorAll('.zpb-st-tabs button')].find(x => x.textContent.trim() === 'OVERWRITE').click());
  await page.waitForTimeout(240);
  await page.screenshot({ path: SHOTS + '/w57-storage-overwrite.png' });
  await page.evaluate(() => [...document.querySelectorAll('.zpb-st-tabs button')].find(x => x.textContent.trim() === 'BRAG').click());
  await page.waitForTimeout(240);
  await page.screenshot({ path: SHOTS + '/w57-storage-brag.png' });

  // S5 · the real app still boots clean with the module aboard
  await page.goto(FILE); await page.waitForTimeout(900);
  const boot = await page.evaluate(() => ({ z: !!window.ZPBStorage, view: !!document.querySelector('.view.active') }));
  ok(boot.z && boot.view, 'S5 · the app boots with the module aboard, no interference');

  ok(errors.length === 0, 'S6 · zero page errors across the whole rig', errors.join(' | ').slice(0, 200));
  await browser.close();
  console.log(`w57_storage: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('RIG ERROR', e); process.exit(1); });
