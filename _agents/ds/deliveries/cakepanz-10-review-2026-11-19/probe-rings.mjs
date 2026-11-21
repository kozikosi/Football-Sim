// F5 receipt: how many rows carry the C'1 suggestion ring at the packaged dist?
// The law says "top THREE, more only on an order tie". DraftBoard.svelte compares the
// DISPLAY strings (one decimal for wins/priority, integers for OVR), so runs of equal
// shown values extend the ring past three even when the raw order values differ.
import { chromium } from '/Users/kosi/.npm-global/lib/node_modules/@playwright/test/index.mjs';
const dist = '/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-ds/_agents/ds/deliveries/cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/dist/single.html';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1180, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto('file://' + dist + '?dev=1');
await page.waitForTimeout(1200);
await page.evaluate(() => {
  const cp = window.__cp;
  cp.store.dispatch({ type: 'START', seed: 777, userTeam: 0 });
  cp.go('board');
  cp.refresh();
});
await page.waitForTimeout(400);

async function rings(tag) {
  const data = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('.cp-row'));
    return rows.map((el) => ({
      name: el.querySelector('.cp-name')?.textContent?.trim(),
      cells: Array.from(el.querySelectorAll('.cp-num')).map((n) => n.textContent.trim()),
      ring: el.classList.contains('cp-suggest'),
    }));
  });
  const ringed = data.filter((r) => r.ring);
  console.log(`--- ${tag} ---`);
  console.log(`rows=${data.length} ringed=${ringed.length} (law: 3, or more only on an equal-sort-value run)`);
  const show = data.slice(0, 6).map((r) => `${r.name} [${r.cells.join(' ')}] ${r.ring ? 'RING' : '-'}`);
  for (const line of show) console.log('  ' + line);
  if (ringed.length > 3) {
    console.log(`  ringed beyond the third (${ringed.length - 3}):`);
    for (const r of ringed.slice(3, 14)) console.log(`    ${r.name} [${r.cells.join(' ')}]`);
  }
}

async function sortBy(label) {
  await page.getByRole('button', { name: label, exact: true }).click();
  await page.waitForTimeout(250);
}

await rings('sort=wins (default), pick 1');
await sortBy('Priority');
await rings('sort=priority, pick 1');
await sortBy('OVR');
await rings('sort=ovr, pick 1');
console.log('--- page errors ---');
console.log(JSON.stringify(errors));
await browser.close();
