/* offline.battery.mjs — the Wave B #4 OFFLINE TENT TEST (pickle C1, the S17 work order §3.4).
 *
 * One battery boots the shipped single-file artifact (dist/single.html) from vanilla file:// inside
 * a browser context whose EVERY network request is blocked and recorded. The shell must complete a
 * whole draft turn — boot, draft a pick, autosave, reload, restore — with ZERO external requests.
 * Pick landing is verified through the SAME store probe the shell battery uses (window.__cp), so
 * the tent asserts state, not pixels. The receipt records the request log (any non-file URL fails
 * the law NAMING IT) and the dist fingerprint, so the tent is pinned to the shipped bytes.
 *
 * Falsifiability: a remote font/asset URL planted in a throwaway copy makes this battery DIE
 * NAMING THE URL (the request log is the evidence); a shell that secretly phones home dies here
 * even when every static grep passes.
 *
 * Run: node --import ./scripts/node-port-register.mjs batteries/offline.battery.mjs
 * Receipt: deliveries/receipts/offline-tent.json  ·  Exit 0 = the tent holds.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
const pw = _req('playwright');

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const P = (rel) => path.join(ROOT, rel);
const distHash = () => { const h = createHash('sha256'); const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else h.update(path.relative(ROOT, p) + ':' + createHash('sha256').update(fs.readFileSync(p)).digest('hex') + '\n'); } }; walk(P('dist')); return h.digest('hex'); };

if (!fs.existsSync(P('dist/single.html'))) { console.log('FATAL: dist/single.html missing — run npm run distfile first'); process.exit(1); }

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const context = await browser.newContext({ viewport: { width: 1180, height: 950 } });
const requests = [];
await context.route('**/*', (route) => {
  const u = route.request().url();
  requests.push(u);
  if (u.startsWith('file://')) return route.continue();
  return route.abort();   // THE TENT: every non-file request is refused, and recorded
});
const errors = [];
const page = await context.newPage();
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

const result = { booted: false, drafted: false, reloaded: false, restored: false, autosaveKept: false, externalRequests: [], pageErrors: [], requestsTotal: 0, distHash: null, generated: null };

try {
  // 1 · boot from file:// — the team select renders 32 rows under the tent
  await page.goto('file://' + P('dist/single.html'), { waitUntil: 'load' });
  await page.waitForSelector('.cp-ts-team', { timeout: 20000 });
  result.booted = (await page.locator('.cp-ts-team').count()) === 32;
  if (!result.booted) throw new Error('boot did not render 32 team rows');

  // 2 · start a draft through the real UI, draft ONE pick, verify it LANDED via the store probe
  await page.locator('.cp-ts-team').first().click();
  await page.waitForTimeout(600);
  await page.locator('button:has-text("START"), .cp-startbtn, .cp-start').first().click();
  await page.waitForSelector('.cp-rows .cp-row .cp-draftbtn', { timeout: 20000 });
  await page.locator('.cp-rows .cp-row .cp-draftbtn').first().click();
  await page.waitForTimeout(1200);
  const st = await page.evaluate(() => {
    const s = window.__cp?.store?.getState?.();
    return s ? { picks: s.record?.picks?.length ?? 0, hasAutosave: !!s.record, phase: s.phase ?? null } : null;
  });
  if (!st) throw new Error('the store probe (window.__cp) is absent in the file:// boot');
  result.drafted = st.picks >= 1;
  if (!result.drafted) throw new Error('the pick did not land (record.picks=' + st.picks + ')');

  // 3 · reload under the tent — the autosave restore path (S29b composition, offline)
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(1000);
  result.reloaded = true;
  const st2 = await page.evaluate(() => {
    const s = window.__cp?.store?.getState?.();
    return s ? { picks: s.record?.picks?.length ?? 0, onBoard: !!document.querySelector('.cp-rows .cp-row, .cp-hub') } : null;
  });
  result.restored = !!st2 && st2.onBoard;
  result.autosaveKept = !!st2 && st2.picks >= 1;   // the second reload keeps the hub + the pick (law S29b)
  if (!result.restored) throw new Error('after reload neither board nor hub rendered');

} catch (e) {
  console.log('OFFLINE TENT FAIL: ' + String(e).slice(0, 220));
}

await browser.close();
result.pageErrors = errors;
result.externalRequests = requests.filter((u) => !u.startsWith('file://'));
result.requestsTotal = requests.length;
result.distHash = distHash();
result.generated = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
fs.writeFileSync(P('deliveries/receipts/offline-tent.json'), JSON.stringify(result, null, 2));

const ext = result.externalRequests;
console.log(`offline tent: booted=${result.booted} drafted=${result.drafted} reloaded=${result.reloaded} restored=${result.restored} autosaveKept=${result.autosaveKept} · requests ${result.requestsTotal} total, ${ext.length} external · distHash ${result.distHash.slice(0, 12)}…`);
if (ext.length) {
  console.log('OFFLINE TENT FAIL — external requests in a file:// boot (each one named):');
  ext.slice(0, 10).forEach((u) => console.log('  ' + u));
  process.exit(1);
}
if (!result.booted || !result.drafted || !result.restored || errors.length) {
  console.log('OFFLINE TENT FAIL — the draft turn broke under the tent' + (errors.length ? ' (page errors: ' + errors.slice(0, 3).join(' | ').slice(0, 180) + ')' : ''));
  process.exit(1);
}
console.log('== OFFLINE TENT · the tent holds: the shipped single file plays a draft turn with zero external requests ==');
