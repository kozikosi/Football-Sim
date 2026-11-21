// D5.2 + P-316 hydration, over real HTTP, through the REAL UI (the autosave writes only in the
// shell's own startDraft/pick paths, never in a direct store.dispatch — the first version of this
// probe bypassed them and therefore proved nothing).
import { chromium } from '/Users/kosi/.npm-global/lib/node_modules/@playwright/test/index.mjs';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
const dir = '/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-ds/_agents/ds/deliveries/cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/dist';
const server = createServer((req, res) => {
  const p = req.url.split('?')[0];
  const file = p === '/' || p === '/index.html' ? '/index.html' : p;
  try { res.writeHead(200, { 'content-type': file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : 'text/html' }); res.end(readFileSync(dir + file)); }
  catch { res.writeHead(404); res.end('no'); }
});
await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1180, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto(`http://localhost:${port}/index.html?dev=1`);
await page.waitForTimeout(1600);

// the real door: Team Select → GO
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.waitForTimeout(150);
await page.locator('.cp-ts-go').click();
await page.waitForTimeout(900);
console.log('after GO:', JSON.stringify(await page.evaluate(() => ({ screen: document.querySelector('main.cp-root')?.dataset.screen, user: window.__cp.store.getState().record?.userTeam }))));

// one REAL UI pick
await page.locator('.cp-rows .cp-row .cp-main').first().click();
await page.waitForTimeout(150);
await page.locator('.cp-rows .cp-row .cp-chip.cp-primary').first().click();
await page.waitForTimeout(150);
await page.locator('.cp-confirm .cp-go').click();
await page.waitForTimeout(400);
await page.getByRole('button', { name: 'Priority', exact: true }).click();
await page.waitForTimeout(300);

const state = () => page.evaluate(() => {
  let vm = null; try { window.__cp.vmStore.subscribe((v) => (vm = v))(); } catch {}
  const st = (() => { try { return window.__cp.store.getState(); } catch { return null; } })();
  return {
    screen: document.querySelector('main.cp-root')?.dataset.screen,
    activeSort: document.querySelector('.cp-sort.cp-on')?.textContent?.trim() ?? null,
    totalPicks: st?.record?.picks?.length ?? null,
    myPicks: st?.record?.picks?.filter((p) => p.team === st?.record?.userTeam).length ?? null,
    vmRows: vm?.rows?.length ?? null,
    vmSort: vm?.sort ?? null,
    hash: location.hash,
    error: document.querySelector('.cp-error')?.textContent ?? '',
  };
});
console.log('before reload:', JSON.stringify(await state()));
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(2000);
console.log('after reload :', JSON.stringify(await state()));
// second reload: the S29b law's own leg (the week key must survive boot1)
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(2000);
console.log('after reload2:', JSON.stringify(await state()));
console.log('page errors:', JSON.stringify(errors));
await browser.close();
server.close();
