// F5 evidence image: the board at a late pick state (the ring law is "top three").
import { chromium } from '/Users/kosi/.npm-global/lib/node_modules/@playwright/test/index.mjs';
const dist = '/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-ds/_agents/ds/deliveries/cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/dist/single.html';
const out = '/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-ds/_agents/ds/deliveries/cakepanz-10-review-2026-11-19/rings-late-390.png';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await page.goto('file://' + dist + '?dev=1');
await page.waitForTimeout(1300);
await page.evaluate(() => {
  const cp = window.__cp;
  cp.store.dispatch({ type: 'START', seed: 777, userTeam: 0 });
  cp.go('board');
  cp.refresh();
});
let hits = [];
for (let i = 0; i < 12; i++) {
  const n = await page.evaluate(() => {
    let vm = null; window.__cp.vmStore.subscribe((v) => (vm = v))();
    const r = vm?.rows?.[0];
    if (!r) return -1;
    window.__cp.store.dispatch({ type: 'PICK', playerId: r.id, slot: r.slotId });
    window.__cp.refresh();
    return document.querySelectorAll('.cp-row.cp-suggest').length;
  });
  if (n > 0) hits.push(n);
}
const pos = await page.evaluate(() => window.__cp.store.getState().draft?.pos);
const ringed = await page.evaluate(() => document.querySelectorAll('.cp-row.cp-suggest').length);
const rows = await page.evaluate(() => document.querySelectorAll('.cp-row').length);
console.log(JSON.stringify({ pos, rows, ringed }));
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(250);
await page.screenshot({ path: out, fullPage: false });
console.log('image:', out);
await browser.close();
