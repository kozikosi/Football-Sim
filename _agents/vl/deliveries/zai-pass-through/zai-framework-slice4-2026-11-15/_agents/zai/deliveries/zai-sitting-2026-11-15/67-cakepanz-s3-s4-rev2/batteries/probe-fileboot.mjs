/* probe-fileboot.mjs — §2.5 item 4: the built app boots from file:// with zero console errors.
 * Network blocked (any http/https request aborts): file:// must be fully self-sufficient.
 * Uses the dist/ build (npm run build) of THIS tree. No server, no CDN.
 */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const URL_ = pathToFileURL(new URL('../dist/index.html', import.meta.url).pathname).href + '?dev=1';
const MODE = process.env.FB_MODE || 'vanilla';
const FLAGS = MODE === 'vanilla' ? ['--no-sandbox'] : ['--no-sandbox', '--allow-file-access-from-files'];
const browser = await pw.chromium.launch({ args: FLAGS });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const blocked = [];
await page.route(/^https?:\/\//i, (r) => { blocked.push(r.request().url()); r.abort(); });
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

await page.goto(URL_, { waitUntil: 'domcontentloaded' });
let mounted = false;
for (let i = 0; i < 200; i++) {
  if (await page.locator('.cp-ts').count() > 0) { mounted = true; break; }
  await page.waitForTimeout(50);
}
console.log('boot URL:', URL_);
console.log('mode:', MODE, '(chromium flags:', FLAGS.join(' '), ')');
console.log('app mounted at TEAM SELECT from file://:', mounted);
console.log('blocked network requests:', blocked.length, blocked.length ? JSON.stringify(blocked.slice(0, 3)) : '(none — fully self-sufficient)');
console.log('console errors + page errors:', errors.length ? errors : 'none — zero');
await browser.close();
