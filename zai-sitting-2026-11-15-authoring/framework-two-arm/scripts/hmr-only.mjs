/* hmr-only.mjs — the HMR row only: dev server, one visible word changed, time to DOM update; revert. */
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { writeFileSync, readFileSync } from 'node:fs';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const ARMS = [
  { name: 'vue', dir: new URL('../arm-vue/', import.meta.url).pathname, port: 5189, screen: 'src/App.vue', from: 'four slices', to: 'four slicez', probe: '.cp-track' },
  { name: 'svelte', dir: new URL('../arm-svelte/', import.meta.url).pathname, port: 5191, screen: 'src/App.svelte', from: 'four slices', to: 'four slicez', probe: '.cp-track' },
];
const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const OUT = {};
for (const arm of ARMS) {
  const child = spawn('npx', ['vite', '--port', String(arm.port), '--strictPort'], { cwd: arm.dir, stdio: 'pipe' });
  await wait(2500);
  const row = {};
  try {
    const ctx = await browser.newContext({ viewport: { width: 1180, height: 950 } });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:${arm.port}/`);
    await page.waitForSelector('.cp-teambtn', { timeout: 30000 });
    await page.waitForTimeout(500);
    const f = arm.dir + arm.screen;
    const orig = readFileSync(f, 'utf8');
    const stamp = Date.now();
    writeFileSync(f, orig.replace(arm.from, arm.to));
    let hmrMs = -1;
    for (let i = 0; i < 400; i++) {
      await wait(25);
      const t = await page.locator(arm.probe).first().textContent();
      if ((t || '').includes(arm.to)) { hmrMs = Date.now() - stamp; break; }
    }
    row.hmrOneWordMs = hmrMs;
    writeFileSync(f, orig);
    await wait(800);
    const restored = (await page.locator(arm.probe).first().textContent())?.includes(arm.from);
    row.revertedToLive = restored;
    await ctx.close();
  } catch (e) { row.error = e.message.split('\n')[0].slice(0, 160); }
  OUT[arm.name] = row;
  child.kill('SIGTERM');
  await wait(600);
}
await browser.close();
console.log(JSON.stringify(OUT, null, 1));
setTimeout(() => process.exit(0), 400);
