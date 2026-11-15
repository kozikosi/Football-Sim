import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
const _req = createRequire(import.meta.url);
const pw = _req('playwright');
const root = process.argv[2], marker = process.argv[3];
// start the DEV server (vite dev) — devtools are a DEV-mode surface
const proc = spawn('npm', ['run', 'dev', '--', '--port', marker === 'vue' ? '5199' : '5200', '--strictPort'], { cwd: root, stdio: 'pipe' });
await new Promise((res) => { let out = ''; proc.stdout.on('data', (d) => { out += d; if (/Local:.*5(19|20)9/.test(out)) res(); }); setTimeout(res, 9000); });
await new Promise((r) => setTimeout(r, 1500));
const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
const errs = []; page.on('pageerror', (e) => errs.push(String(e).slice(0, 120)));
await page.goto('http://localhost:' + (marker === 'vue' ? '5199' : '5200') + '/');
await page.waitForSelector('[data-testid="app-shell"]', { timeout: 15000 });
// 1. the QA hook exists in DEV (house rule) and exposes the store/bridge
const hookInfo = await page.evaluate((m) => {
  if (m === 'vue') { const p = window.__pinia; return { exists: !!p, kind: p ? 'pinia instance (state inspection via __pinia)' : 'MISSING' }; }
  const s = window.__SIM_STATE__; return { exists: !!s, kind: s ? 'bridge instance: screen=' + s.screen + ', sort=' + s.sort : 'MISSING' };
}, marker);
// 2. change a value through the store, WATCH THE UI UPDATE (the interactive-session proof)
const before = await page.locator('[data-testid="cards-count"]').textContent();
await page.evaluate((m) => {
  if (m === 'vue') { const p = window.__pinia._s.get('app'); p.screen = 'cards'; p.setSort('ovr'); }
  else { const s = window.__SIM_STATE__; s.screen = 'cards'; s.setSort('ovr'); }
}, marker);
await page.waitForTimeout(300);
const after = await page.locator('[data-testid="row-' + (await page.evaluate(() => document.querySelector('[data-testid^="row-"]')?.getAttribute('data-testid')?.replace('row-', '') ?? '')) + '"] .tc-ovr').textContent();
// 3. toggle a screen via the hook too
await page.evaluate((m) => { (m === 'vue' ? window.__pinia._s.get('app') : window.__SIM_STATE__).screen = 'feed'; }, marker);
await page.waitForTimeout(300);
const feedShown = await page.locator('[data-testid="feed"]').count();
console.log(JSON.stringify({ arm: marker, hook: hookInfo, countBeforeSort: before, ovrTopAfterSort: after, feedViaHook: feedShown, pageErrors: errs }));
await browser.close(); proc.kill();
