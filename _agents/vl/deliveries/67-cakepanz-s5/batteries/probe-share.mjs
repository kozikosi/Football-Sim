// smoke-share.mjs — a quick manual probe of the Slice 5 share screen (not the battery; a dev tool).
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }
const PORT = process.env.CP_PORT || 4179;
const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
await page.goto(`http://localhost:${PORT}/?dev=1`);
await page.waitForTimeout(3000);
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.locator('.cp-ts-go').click();
await page.waitForTimeout(800);
const { restoreDraft } = await import('../src/engine/sports/nfl/app/store.ts');
const { candidates } = await import('../src/engine/sports/nfl/engine/draft.ts');
for (let turn = 0; turn < 32; turn++) {
  const st = await page.evaluate(() => {
    const s = window.__cp.store.getState();
    return s.status === 'done' ? 'done' : JSON.parse(JSON.stringify(s.record));
  });
  if (st === 'done') break;
  const ds = restoreDraft(st);
  const c = candidates(ds, st.userTeam);
  if (!c.length) break;
  await page.evaluate(({ pid, slot }) => { window.__cp.store.dispatch({ type: 'PICK', playerId: pid, slot }); }, { pid: c[0].player.id, slot: c[0].slot });
}
await page.locator('.cp-play').click();
await page.waitForTimeout(900);
console.log('share-open count:', await page.locator('.cp-share-open').count());
await page.locator('.cp-share-open').click();
await page.waitForTimeout(700);
console.log('brag cards:', await page.locator('.cp-brag').count(), '· seed cards:', await page.locator('.cp-seedcard').count());
console.log('headline:', (await page.locator('.cp-brag-headline').textContent() || '').trim());
console.log('outcome:', (await page.locator('.cp-brag-outcome').textContent() || '').trim());
console.log('proof:', (await page.locator('.cp-brag-proof').textContent() || '').replace(/\s+/g, ' ').trim());
console.log('seed card:', (await page.locator('.cp-seedcard').textContent() || '').replace(/\s+/g, ' ').trim().slice(0, 220));
// the PNG: intercept the object URL and read the bytes
await page.evaluate(() => {
  window.__urls = [];
  const orig = URL.createObjectURL.bind(URL);
  URL.createObjectURL = (b) => { const u = orig(b); window.__urls.push(u); return u; };
});
await page.locator('.cp-share-save').first().click();
await page.waitForTimeout(900);
const bytes = await page.evaluate(async () => {
  const u = window.__urls[window.__urls.length - 1];
  if (!u) return null;
  return Array.from(new Uint8Array(await (await fetch(u)).arrayBuffer())).slice(0, 8);
});
console.log('PNG magic:', bytes, '· is PNG:', !!bytes && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47);
// dump the full artifact so a human can eyeball the canvas-drawn PNG
const full = await page.evaluate(async () => Array.from(new Uint8Array(await (await fetch(window.__urls[window.__urls.length - 1])).arrayBuffer())));
const fs = await import('node:fs');
fs.writeFileSync(new URL('../shots/probe-share-artifact.png', import.meta.url), Buffer.from(full));
console.log('artifact bytes written:', full.length);
const cardHtml = await page.locator('.cp-brag').innerHTML();
console.log('no link back in card:', !/http|href/.test(cardHtml));
await page.screenshot({ path: 'shots/probe-share.png', fullPage: true });
console.log('page errors:', errs.length, errs.slice(0, 3));
await browser.close();
