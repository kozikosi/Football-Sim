/* offline-vanilla-boot.mjs — item 7(iv): the offline test, BOTH modes.
 *   flagged boot — file:// WITH --allow-file-access-from-files (the app tree's probe convention):
 *                  must mount with 0 blocked network requests and 0 console errors.
 *   vanilla boot — file:// with NO flags: MUSE verified 2026-11-15 that it FAILS (the dist's
 *                  `crossorigin` module/stylesheet tags are CORS-blocked on the file:// origin);
 *                  this test captures the verbatim failure as the receipt (fix = a vite-level
 *                  change, filed for the Architect; identical for both arms).
 * Run: node tests/offline/offline-vanilla-boot.mjs <arm dist index.html>
 */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }
const dist = process.argv[2] ?? new URL('../../framework-two-arm/arm-vue/dist/index.html', import.meta.url).pathname;
const URL_ = pathToFileURL(dist).href;
const out = { dist, flagged: {}, vanilla: {} };

// -- flagged boot --
{
  const browser = await pw.chromium.launch({ args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  let blocked = 0; const errors = [];
  await page.route(/^https?:\/\//i, (r) => { blocked++; r.abort(); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.goto(URL_);
  let mounted = false;
  try { await page.waitForSelector('.cp-teambtn', { timeout: 20000 }); mounted = true; } catch {}
  out.flagged = { mounted, blocked, errorCount: errors.length, errors: errors.slice(0, 4) };
  await browser.close();
}
// -- vanilla boot (no flags) --
{
  const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  let blocked = 0; const errors = [];
  await page.route(/^https?:\/\//i, (r) => { blocked++; r.abort(); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.goto(URL_);
  let mounted = false;
  try { await page.waitForSelector('.cp-teambtn', { timeout: 8000 }); mounted = true; } catch {}
  out.vanilla = { mounted, blocked, errorCount: errors.length, errors: errors.slice(0, 4) };
  await browser.close();
}
console.log(JSON.stringify(out, null, 1));
const fOK = out.flagged.mounted && out.flagged.blocked === 0 && out.flagged.errorCount === 0;
console.log(`FLAGGED BOOT: ${fOK ? 'PASS' : 'FAIL'} (mounted=${out.flagged.mounted}, blocked=${out.flagged.blocked}, errors=${out.flagged.errorCount})`);
console.log(`VANILLA BOOT: ${out.vanilla.mounted ? 'PASS — the CORS defect is FIXED, clear this receipt' : 'FAIL (expected on pin d3bd81d2): mounted=false, errors: ' + out.vanilla.errors.join(' | ').slice(0, 300)}`);
process.exit(fOK ? 0 : 1);
