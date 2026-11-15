/* two-arm-coldload.mjs — 5 trials per arm, 6× CPU throttle, file:// with network blocked; median reported. */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const ARMS = [
  { name: 'vue', dist: new URL('./arm-vue/dist/index.html', import.meta.url).pathname },
  { name: 'svelte', dist: new URL('./arm-svelte/dist/index.html', import.meta.url).pathname },
];
const browser = await pw.chromium.launch({ args: ['--no-sandbox', '--allow-file-access-from-files'] });
const res = {};
for (const arm of ARMS) {
  const URL_ = pathToFileURL(arm.dist).href;
  const trials = [];
  for (let t = 0; t < 5; t++) {
    const ctx = await browser.newContext({ viewport: { width: 1180, height: 950 } });
    const page = await ctx.newPage();
    await page.route(/^https?:\/\//i, (r) => r.abort());
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 });
    const t0 = Date.now();
    await page.goto(URL_, { waitUntil: 'domcontentloaded' });
    let mounted = -1;
    for (let i = 0; i < 1200; i++) { if (await page.locator('.cp-teambtn').count() > 0) { mounted = Date.now() - t0; break; } await page.waitForTimeout(25); }
    const paints = await page.evaluate(() => performance.getEntriesByType('paint').map((e) => ({ name: e.name, t: Math.round(e.startTime) })));
    trials.push({ fcp: (paints.find((p) => p.name === 'first-contentful-paint') || {}).t ?? -1, mounted });
    await ctx.close();
  }
  const med = (a) => a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)];
  res[arm.name] = { trials, medianFcp: med(trials.map((x) => x.fcp)), medianMounted: med(trials.map((x) => x.mounted)) };
}
await browser.close();
console.log(JSON.stringify(res, null, 1));
console.log(`COLD LOAD 6x median: vue fcp=${res.vue.medianFcp}ms mounted=${res.vue.medianMounted}ms · svelte fcp=${res.svelte.medianFcp}ms mounted=${res.svelte.medianMounted}ms`);
