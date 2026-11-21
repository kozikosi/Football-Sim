// 390 px: TEXT rects (a Range over the text node) vs the numeric cells' boxes.
// The screenshot shows "Washington81" — the team text runs under the OVR number. Element
// boxes do not intersect (the test above returned 0), so the spill is text-level: the
// team span's glyphs overflow its own box. This measures the glyph rect against the OVR box.
import { chromium } from '/Users/kosi/.npm-global/lib/node_modules/@playwright/test/index.mjs';
const dist = '/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-ds/_agents/ds/deliveries/cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/dist/single.html';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('file://' + dist + '?dev=1');
await page.waitForTimeout(1300);
await page.evaluate(() => {
  const cp = window.__cp;
  cp.store.dispatch({ type: 'START', seed: 777, userTeam: 0 });
  cp.go('board');
  cp.refresh();
});
for (let i = 0; i < 12; i++) {
  await page.evaluate(() => {
    let vm = null; window.__cp.vmStore.subscribe((v) => (vm = v))();
    const r = vm?.rows?.[0];
    if (!r) return;
    window.__cp.store.dispatch({ type: 'PICK', playerId: r.id, slot: r.slotId });
    window.__cp.refresh();
  });
}
await page.waitForTimeout(300);
const report = await page.evaluate(() => {
  const textRect = (el) => {
    const r = document.createRange();
    r.selectNodeContents(el);
    const b = r.getBoundingClientRect();
    return { left: b.left, right: b.right, top: b.top, bottom: b.bottom };
  };
  const hits = [];
  for (const row of document.querySelectorAll('.cp-row')) {
    const team = row.querySelector('.cp-nflteam');
    const name = row.querySelector('.cp-name');
    const ovr = row.querySelector('.cp-ovr');
    if (!team || !ovr) continue;
    const t = textRect(team), o = ovr.getBoundingClientRect(), n = name ? textRect(name) : null;
    const over = Math.round(t.right - o.left);
    if (over > 0) {
      const cs = getComputedStyle(team);
      hits.push({
        name: name?.textContent?.trim(), team: team.textContent.trim(), ovr: ovr.textContent.trim(),
        overlapPx: over,
        teamBox: Math.round(team.getBoundingClientRect().width), teamText: Math.round(t.right - t.left),
        whiteSpace: cs.whiteSpace, overflow: cs.overflow, textOverflow: cs.textOverflow, minWidth: cs.minWidth,
      });
    }
    if (n) {
      const nameOver = Math.round(n.right - o.left);
      if (nameOver > 0) hits.push({ kind: 'name', name: name.textContent.trim(), overlapPx: nameOver });
    }
  }
  const row = document.querySelector('.cp-row .cp-main');
  const cs = row ? getComputedStyle(row) : null;
  return { count: hits.length, hits: hits.slice(0, 10), mainCols: cs?.gridTemplateColumns, mainDisplay: cs?.display, mainWidth: Math.round(row?.getBoundingClientRect().width ?? 0) };
});
console.log(JSON.stringify(report, null, 1));
await browser.close();
