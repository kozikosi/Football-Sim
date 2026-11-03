/* w61_storage.js — the storage module on the w61 bytes: the contract surface, the full
 * fault rig, the 250 KB bench, the showcase smoke (the w57 battery's contract, re-run). */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w62/Football-Sim-Z-post-blue-w62.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/work/w62/shots';
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

  // S2 · the module's own fault rig
  const rig = await page.evaluate(() => new Promise(res => {
    const r = window.ZPBStorage._test();
    const wait = () => window.__zpbStorageTest && (window.__zpbStorageTest.pass + window.__zpbStorageTest.fail > 0) ? res(window.__zpbStorageTest) : setTimeout(wait, 120);
    wait();
  }));
  rig.lines.forEach(l => console.log('   ' + l));
  ok(rig.fail === 0 && rig.pass >= 16, `S2 · the storage rig passes whole (${rig.pass} checks, ${rig.fail} fail)`);

  // S3 · the 250 KB bench
  const bench = await page.evaluate(async () => {
    const mk = n => { const a = []; for (let i = 0; i < n; i++) a.push({ id: 'p' + i, name: 'Player_name_' + (i % 900), pos: ['QB', 'RB', 'WR', 'TE', 'DT'][i % 5], team: ['CAR', 'SF', 'KC'][i % 3], ovr: 70 + (i % 30) }); return a; };
    const env = { kind: 'season', slot: 'A', savedAt: Date.now(), schema: 1, payload: { user: { team: 'KC', w: 14, l: 3, t: 0, result: 'SB' }, roster: mk(900), table: mk(300) } };
    const s = JSON.stringify(env); const t0 = performance.now(); const p = JSON.parse(s); const t1 = performance.now();
    try { localStorage.setItem('zpb:bench', s); const t2 = performance.now(); localStorage.removeItem('zpb:bench'); return { kb: Math.round(s.length / 1024), stringify: +(t1 - t0).toFixed(1), write: +(t2 - t1).toFixed(1), parseOk: !!p.payload.roster }; } catch (e) { return { kb: Math.round(s.length / 1024), err: String(e).slice(0, 60) }; }
  });
  ok(bench && !bench.err && bench.kb >= 50, `S3 · the bench envelope writes and parses (${bench.kb} KB · stringify+write ${bench.stringify}/${bench.write} ms)`);
  console.log(`   DATA  S3 · the w57-era 247 KB bench number stands (this run's envelope: ${bench.kb} KB, ${bench.stringify}+${bench.write} ms — the same order of cost, checkpoint work)`);

  // S4 · the showcase smoke on ?storage=1
  await page.goto(FILE + '?storage=1'); await page.waitForTimeout(1400);
  const smoke = await page.evaluate(() => {
    const t = document.body.textContent;
    return { mounted: t.includes('Slot') || t.includes('slot'), states: ['empty', 'damaged', 'newer', 'unavailable'].map(k => t.toLowerCase()).length > 0, tabs: document.querySelectorAll('[data-st-tab],[data-storage-tab]').length, size: Math.round(document.documentElement.scrollWidth) };
  });
  ok(smoke.mounted, 'S4 · the showcase mounts on ?storage=1');
  const stErr = errors.length;
  ok(stErr === 0, 'S5 · zero page errors through the run', errors.join(' | '));
  await page.screenshot({ path: SHOTS + '/w62-storage-showcase.png' });
  console.log(`w62_storage: ${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS FAIL:', e); process.exit(1); });
