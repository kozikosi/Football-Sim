// F5 receipt (part 2): drive the real PICK dispatch and count the C'1 ring per pick state.
// Ring law: top THREE by the board's active order; more only while the sort value repeats.
// The shell compares the DISPLAY string (wins/priority = one decimal), so two rows whose raw
// values differ but whose shown value is equal extend the ring. This run prints the state.
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

const read = () => page.evaluate(() => {
  let vm = null;
  window.__cp.vmStore.subscribe((v) => (vm = v))();
  const rows = Array.from(document.querySelectorAll('.cp-row')).map((el) => ({
    name: el.querySelector('.cp-name')?.textContent?.trim(),
    cells: Array.from(el.querySelectorAll('.cp-num')).map((n) => n.textContent.trim()),
    ring: el.classList.contains('cp-suggest'),
  }));
  return { sort: vm?.sort, pos: window.__cp.store.getState().draft?.pos, rows };
});

let worst = { ringed: 0 };
for (let i = 0; i < 14; i++) {
  const st = await read();
  const ringed = st.rows.filter((r) => r.ring);
  const over = ringed.length - 3;
  if (over > 0) {
    const third = ringed[2], next = ringed[3];
    console.log(`pos=${st.pos} sort=${st.sort} ringed=${ringed.length}  [third: ${third.name} ${third.cells[1]}] [fourth: ${next.name} ${next.cells[1]}]`);
    for (const r of ringed) console.log(`   RING ${r.name} [${r.cells.join(' ')}]`);
    if (ringed.length > worst.ringed) worst = { ringed: ringed.length, pos: st.pos, rows: ringed };
  }
  // take the top row at its shown slot through the SAME dispatch the shell uses
  const picked = await page.evaluate(() => {
    let vm = null;
    window.__cp.vmStore.subscribe((v) => (vm = v))();
    const r = vm?.rows?.[0];
    if (!r) return null;
    window.__cp.store.dispatch({ type: 'PICK', playerId: r.id, slot: r.slotId });
    window.__cp.refresh();
    return { name: r.name, slot: r.slotId };
  });
  if (!picked) { console.log('no rows left'); break; }
  await page.waitForTimeout(120);
}
console.log('--- parser-level check (the shipped val() on the shipped strings) ---');
console.log(await page.evaluate(() => {
  const val = (s) => Number(String(s).replace(/[^0-9.\-]/g, '')) || 0;
  const rows = Array.from(document.querySelectorAll('.cp-row')).map((el) => ({
    name: el.querySelector('.cp-name')?.textContent?.trim(),
    wins: el.querySelectorAll('.cp-num')[1]?.textContent?.trim(),
  }));
  return { sample: rows.slice(0, 5).map((r) => `${r.wins} -> ${val(r.wins)}`) };
}));
console.log('worst state:', worst.ringed, 'rings at pos', worst.pos);
console.log('--- page errors ---');
console.log(JSON.stringify(errors));
await browser.close();
