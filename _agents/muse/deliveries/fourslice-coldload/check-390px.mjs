/* 390px viewport check — heaviest view (board) + all screens, no horizontal scroll. */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const ARMS = [
  { name: 'vue', dist: new URL('./arm-vue/dist/index.html', import.meta.url).pathname },
  { name: 'svelte', dist: new URL('./arm-svelte/dist/index.html', import.meta.url).pathname },
];
const SCREENS = ['team', 'board', 'saves', 'feed'];
const browser = await pw.chromium.launch({ args: ['--no-sandbox', '--allow-file-access-from-files'] });
const res = {};
for (const arm of ARMS) {
  const URL_ = pathToFileURL(arm.dist).href;
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.route(/^https?:\/\//i, (r) => r.abort());
  await page.goto(URL_, { waitUntil: 'domcontentloaded' });
  // wait for the app to mount (team-select buttons)
  await page.locator('.cp-teambtn').first().waitFor({ timeout: 30000 });
  const out = {};
  for (const screen of SCREENS) {
    // nav buttons carry the screen label in uppercase
    const btn = page.locator('.cp-nav button', { hasText: screen.toUpperCase() }).first();
    await btn.click();
    await page.waitForTimeout(500);
    const m = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
    }));
    out[screen] = { ...m, hScroll: m.scrollWidth > 390 };
  }
  res[arm.name] = out;
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(res, null, 1));
for (const arm of ARMS) {
  const worst = Math.max(...SCREENS.map((s) => res[arm.name][s].scrollWidth));
  console.log(`390px ${arm.name}: max scrollWidth=${worst} (limit 390) · ` + SCREENS.map((s) => `${s}=${res[arm.name][s].scrollWidth}`).join(' '));
}
