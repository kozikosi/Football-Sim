/* hmr-kbd-devserver.mjs — the remaining CATEGORY-WINNERS evidence rows, both arms:
 *   dev server  — vite startup → first 200 on http://localhost:<port>/ (wall-clock);
 *   HMR         — open the dev page, change ONE visible word in the source file, measure the time
 *                 until the DOM text updates (mutation via rAF polling); revert and re-measure once;
 *   keyboard    — Esc→featured-closes latency measured in-page (performance.now around the key
 *                 dispatch to the DOM mutation, rAF-bounded), 10 samples, median.
 * Run: node scripts/hmr-kbd-devserver.mjs
 */
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { writeFileSync, readFileSync } from 'node:fs';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }
const OUT = {};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function devServer(dir, port) {
  const t0 = Date.now();
  const child = spawn('npx', ['vite', '--port', String(port), '--strictPort'], { cwd: dir, stdio: 'pipe' });
  let first200 = -1;
  for (let i = 0; i < 120; i++) {
    await wait(250);
    try {
      const res = await fetch(`http://localhost:${port}/`);
      if (res.ok) { first200 = Date.now() - t0; break; }
    } catch {}
  }
  return { child, first200 };
}

const ARMS = [
  { name: 'vue', dir: new URL('../arm-vue/', import.meta.url).pathname, port: 5189, screen: 'src/components/Cards.vue', from: 'SHARE PNG', to: 'SHARE PNZ' },
  { name: 'svelte', dir: new URL('../arm-svelte/', import.meta.url).pathname, port: 5191, screen: 'src/lib/screens/Cards.svelte', from: 'SHARE PNG', to: 'SHARE PNZ' },
];
const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
for (const arm of ARMS) {
  const { child, first200 } = await devServer(arm.dir, arm.port);
  const row = { devServerFirst200: first200 };
  try {
    const ctx = await browser.newContext({ viewport: { width: 1180, height: 950 } });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:${arm.port}/`);
    await page.waitForSelector('.cp-teambtn', { timeout: 30000 });
    await page.getByRole('button', { name: 'Buffalo Bills', exact: true }).click();
    await page.waitForSelector('.cp-board-row', { timeout: 30000 });
    await page.getByRole('button', { name: 'CARDS', exact: true }).click();
    await page.waitForSelector('.cp-card', { timeout: 30000 });
    await page.locator('.cp-card').first().click();
    await page.waitForSelector('.cp-cards-featcard', { timeout: 5000 });
    await page.waitForTimeout(800);

    // keyboard FIRST (HMR mutates the page; do it last, on a fresh navigation)
    const samples = [];
    for (let i = 0; i < 10; i++) {
      if ((await page.locator('.cp-cards-featcard').count()) === 0) {
        await page.locator('.cp-card').first().click();
        await page.waitForSelector('.cp-cards-featcard', { timeout: 5000 });
      }
      const ms = await page.evaluate(() => new Promise((resolve) => {
        const t0 = performance.now();
        const obs = new MutationObserver(() => { obs.disconnect(); resolve(performance.now() - t0); });
        obs.observe(document.body, { childList: true, subtree: true, attributes: true });
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        setTimeout(() => { obs.disconnect(); resolve(-1); }, 3000);
      }));
      await page.waitForTimeout(250);
      if (ms >= 0) samples.push(ms);
    }
    samples.sort((a, b) => a - b);
    row.escCloseMedianMs = samples.length ? samples[Math.floor(samples.length / 2)] : -1;
    row.escCloseAll = samples;
    await ctx.close();
    // HMR LAST: fresh navigation, change one visible word, time the DOM update
    const f = arm.dir + arm.screen;
    const orig = readFileSync(f, 'utf8');
    const page2 = await ctx.newPage();
    await page2.goto(`http://localhost:${arm.port}/`);
    await page2.waitForSelector('.cp-teambtn', { timeout: 30000 });
    await page2.getByRole('button', { name: 'Buffalo Bills', exact: true }).click();
    await page2.waitForSelector('.cp-board-row', { timeout: 30000 });
    await page2.getByRole('button', { name: 'CARDS', exact: true }).click();
    await page2.waitForSelector('.cp-card', { timeout: 30000 });
    await page2.locator('.cp-card').first().click();
    await page2.waitForSelector('.cp-cards-featcard', { timeout: 5000 });
    await page2.waitForTimeout(800);
    const stamp = Date.now();
    writeFileSync(f, orig.replace(arm.from, arm.to));
    let hmrMs = -1;
    for (let i = 0; i < 400; i++) {
      await wait(25);
      const t = await page2.locator('.cp-sharebtn').first().textContent();
      if ((t || '').includes(arm.to)) { hmrMs = Date.now() - stamp; break; }
    }
    row.hmrOneWordMs = hmrMs;
    writeFileSync(f, orig);   // revert
    await page2.close();
  } catch (e) {
    row.error = e.message.slice(0, 200);
  }
  OUT[arm.name] = row;
  child.kill('SIGTERM');
  await wait(400);
}
await browser.close();
console.log(JSON.stringify(OUT, null, 1));
