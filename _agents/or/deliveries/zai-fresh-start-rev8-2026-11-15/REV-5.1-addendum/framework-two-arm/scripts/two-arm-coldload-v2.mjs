/* two-arm-coldload-v2.mjs — item 2, the four-slice low-end boot, INDEPENDENT REPLICATION of MUSE's run.
 * 5 trials per arm · 6× CPU throttle · file:// with network blocked · median + per-trial spread reported.
 *
 * PROTOCOL DEFECT FIXED (MUSE's finding, 2026-11-15): the old script's mounted marker polled
 * '.cp-feed-line' — which NEVER appears on a cold load, because the app boots to TEAM SELECT, not the
 * feed. The marker is now the team-select button ('.cp-teambtn' count > 0): the first UI the app
 * actually renders. Stated here and in the receipt, per the sitting's instruction.
 *
 * Booted with --allow-file-access-from-files (the app tree's probe convention): this measures the app
 * ONCE BOOTED, not the vanilla file:// boot — that is a separate check (offline-vanilla-boot.mjs,
 * item 7(iv)), which currently FAILS (crossorigin CORS on the module/stylesheet tags).
 */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const ARMS = [
  { name: 'vue', dist: new URL('../arm-vue/dist/index.html', import.meta.url).pathname },
  { name: 'svelte', dist: new URL('../arm-svelte/dist/index.html', import.meta.url).pathname },
];
const TRIALS = 5, THROTTLE = 6;
const browser = await pw.chromium.launch({ args: ['--no-sandbox', '--allow-file-access-from-files'] });
const res = {};
for (const arm of ARMS) {
  const URL_ = pathToFileURL(arm.dist).href;
  const trials = [];
  for (let t = 0; t < TRIALS; t++) {
    const ctx = await browser.newContext({ viewport: { width: 1180, height: 950 } });
    const page = await ctx.newPage();
    await page.route(/^https?:\/\//i, (r) => r.abort());
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: THROTTLE });
    const t0 = Date.now();
    await page.goto(URL_, { waitUntil: 'domcontentloaded' });
    let mounted = -1;
    for (let i = 0; i < 2400; i++) { if (await page.locator('.cp-teambtn').count() > 0) { mounted = Date.now() - t0; break; } await page.waitForTimeout(25); }
    const paints = await page.evaluate(() => performance.getEntriesByType('paint').map((e) => ({ name: e.name, t: Math.round(e.startTime) })));
    trials.push({ fcp: (paints.find((p) => p.name === 'first-contentful-paint') || {}).t ?? -1, mountedTeamSelect: mounted });
    await ctx.close();
  }
  const med = (a) => a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)];
  const spread = (a) => Math.min(...a) + '..' + Math.max(...a);
  res[arm.name] = {
    trials,
    medianFcp: med(trials.map((x) => x.fcp)), fcpSpread: spread(trials.map((x) => x.fcp)),
    medianMounted: med(trials.map((x) => x.mountedTeamSelect)), mountedSpread: spread(trials.map((x) => x.mountedTeamSelect)),
  };
}

// -- 390 px on the heaviest view (the board: 60 engine rows), 6x throttle, no horizontal scroll --
for (const arm of ARMS) {
  const URL_ = pathToFileURL(arm.dist).href;
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.route(/^https?:\/\//i, (r) => r.abort());
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: THROTTLE });
  await page.goto(URL_, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.cp-teambtn', { timeout: 30000 });
  await page.getByRole('button', { name: 'Buffalo Bills', exact: true }).click();
  await page.waitForSelector('.cp-board-row', { timeout: 30000 });
  await page.waitForTimeout(500);
  const s390 = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth, rows: document.querySelectorAll('.cp-board-row').length }));
  res[arm.name]['390px-board'] = s390;
  res[arm.name]['390px-clean'] = s390.sw <= s390.iw;
  await page.screenshot({ path: new URL(`../shots/coldload-390-${arm.name}.png`, import.meta.url).pathname, fullPage: false });
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(res, null, 1));
console.log(`COLD LOAD ${THROTTLE}x, marker=team-select button, median of ${TRIALS}: vue fcp=${res.vue.medianFcp}ms (${res.vue.fcpSpread}) mounted=${res.vue.medianMounted}ms (${res.vue.mountedSpread}) · svelte fcp=${res.svelte.medianFcp}ms (${res.svelte.fcpSpread}) mounted=${res.svelte.medianMounted}ms (${res.svelte.mountedSpread})`);
console.log(`390px heaviest view (board): vue sw=${res.vue['390px-board'].sw}/${res.vue['390px-board'].iw} rows=${res.vue['390px-board'].rows} clean=${res.vue['390px-clean']} · svelte sw=${res.svelte['390px-board'].sw}/${res.svelte['390px-board'].iw} rows=${res.svelte['390px-board'].rows} clean=${res.svelte['390px-clean']}`);
