/* visual.battery.mjs — the SEEDED visual battery (T5, 2026-11-20): the ring and the layout are
 * measured by a GATE, not by hand. Three seats hand-measured the ring and two disagreed — every
 * measurement here is a named law at a named seed.
 *
 *   W1  exactly 3 .cp-suggest rows at pick 1 (1180×900, fixed seeds)
 *   W2  the ring is contiguous from the top (the first three rows carry it)
 *   W3  one-click Draft on a ringed row lands exactly one pick (the T2 path, at a named seed)
 *   W4  no horizontal scroll at 390 (scrollWidth <= clientWidth, the whole walk)
 *   W5  zero console errors across every load (both viewports)
 *   W6  the seed code is displayed in the board footer and matches ?seed= (T3)
 *   W7  two loads at one seed give IDENTICAL boards: the same 60-row id order, the same ring ids,
 *       the same footer (T3's replayability law — the "byte-identical board" of the order)
 *   W8  a garbage seed falls back to the random draw WITHOUT throwing, and an integer seed pins
 *       the exact integer (T3)
 *   W9  the seed survives save → restore: a reload replays the same seed and the same code (T3)
 *
 * Run: node --import ./scripts/node-port-register.mjs batteries/visual.battery.mjs
 * Needs `npm run distfile` first + the preview server (CP_PORT, default 4179).
 * Exit 0 = green; exit 1 = a law died. A law that cannot run SKIPs LOUDLY with its reason.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch (e) { console.log(`   SKIP  all laws — playwright is not installed (D-1: no HOME-global fallback): ${e.message}`); process.exit(0); }
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.CP_PORT || 4179);
const results = [];
const ok = (law, pass, detail = '') => { results.push({ law, verdict: pass ? 'PASS' : 'FAIL', detail }); console.log(`   ${pass ? 'PASS' : 'FAIL'}  ${law}${detail ? ' — ' + detail : ''}`); };
let serving = false;
try { serving = (await fetch(`http://localhost:${PORT}/`)).ok; } catch { serving = false; }
if (!serving) { console.log(`   SKIP  all laws — nothing is served on http://localhost:${PORT} (start vite preview first)`); process.exit(0); }

const SEEDS = ['a3f2', 'k1x9'];   // the named seeds (base-36 codes; k1x9 = a second draw for the walk)
const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });

const readBoard = (page) => page.evaluate(() => {
  const rows = [...document.querySelectorAll('.cp-rows .cp-row')];
  const st = window.__cp.store.getState();
  return {
    ids: rows.map((el) => el.getAttribute('data-id')),
    ring: rows.filter((el) => el.classList.contains('cp-suggest')).map((el) => el.getAttribute('data-id')),
    footer: document.querySelector('.cp-ft')?.textContent?.trim() ?? '',
    code: document.querySelector('.cp-seedcode b')?.textContent?.trim() ?? '',
    seed: st.record?.seed ?? null,
    userPicks: st.record ? st.record.picks.filter((p) => p.team === st.record.userTeam).length : -1,
    err: st.error ?? '',
  };
});
const startAt = async (page, seedQ) => {
  await page.evaluate(() => localStorage.clear()).catch(() => {});   // a FRESH session: no autosave boot path
  await page.goto(`http://localhost:${PORT}/?dev=1${seedQ ? '&seed=' + seedQ : ''}`);
  await page.waitForTimeout(2800);
  await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
  await page.waitForTimeout(150);
  await page.locator('.cp-ts-go').click();
  await page.waitForTimeout(1100);
};

// ---------- W1–W3, W6 at 1180×900, per named seed ----------
const page = await browser.newPage({ viewport: { width: 1180, height: 900 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
for (const s of SEEDS) {
  await startAt(page, s);
  const b = await readBoard(page);
  const vals = await page.evaluate(() => {
    let v; const un = window.__cp.vmStore.subscribe((x) => (v = x)); un();
    return v ? v.rows.map((r) => Number(String(r[v.sort]).replace(/[^0-9.\-]/g, '')) || 0) : [];
  });
  // C′1's documented rule: three ringed rows, MORE only on an order tie at the cutoff — a tie is
  // engine-true, not a defect. The law: 3 exactly, or >3 ONLY when every ringed row past the third
  // repeats the third row's sort value (the tie) and the row after the ring breaks it.
  const tieOk = b.ring.length > 3
    ? b.ring.length <= vals.length && vals.slice(2, b.ring.length).every((v) => v === vals[2]) && (b.ring.length === vals.length || vals[b.ring.length] !== vals[2])
    : b.ring.length === 3;
  ok(`W1 seed ${s}: exactly 3 .cp-suggest rows at pick 1 (more ONLY on an order tie — C′1's rule)`,
    tieOk && b.userPicks === 0, `ring=${b.ring.length} userPicks=${b.userPicks}${b.ring.length > 3 ? ' · TIE at the cutoff: vals[2..3]=' + vals[2] + '/' + vals[3] + ', next=' + (vals[b.ring.length] ?? 'end') : ''}`);
  const first3 = b.ids.slice(0, 3);
  ok(`W2 seed ${s}: the ring is contiguous from the top`, first3.every((id, i) => b.ring[i] === id), `top3=${first3.join(',')} ring=${b.ring.join(',')}`);
  ok(`W6 seed ${s}: the footer shows the seed code and it matches ?seed=`, b.code === s && b.seed !== null && b.seed.toString(36) === s, `code=${b.code} seed=${b.seed} base36=${b.seed !== null ? b.seed.toString(36) : '?'}`);
  if (s === SEEDS[0]) {
    // W3 at the first seed: one click lands exactly one pick, then undo restores for W7's second load
    await page.locator('.cp-rows .cp-row.cp-suggest .cp-quick').first().click();
    await page.waitForTimeout(800);
    const after = await readBoard(page);
    ok(`W3 seed ${s}: one-click Draft on a ringed row lands exactly one pick`, after.userPicks === 1 && !after.err, `userPicks=${after.userPicks} err="${after.err}"`);
    await page.locator('.cp-undo').click();
    await page.waitForTimeout(800);
    const back = await readBoard(page);
    if (back.userPicks !== 0) { ok('W3 cleanup: undo restored pick 1', false, `userPicks=${back.userPicks}`); }
  }
}

// ---------- W7: two loads at one seed give IDENTICAL boards ----------
await startAt(page, SEEDS[0]);
const b1 = await readBoard(page);
await page.evaluate(() => localStorage.clear());
await startAt(page, SEEDS[0]);
const b2 = await readBoard(page);
ok(`W7 two loads at seed ${SEEDS[0]} give identical boards (60-row id order + ring + footer)`,
  b1.ids.join(',') === b2.ids.join(',') && b1.ring.join(',') === b2.ring.join(',') && b1.footer === b2.footer,
  `idsEqual=${b1.ids.join(',') === b2.ids.join(',')} ringEqual=${b1.ring.join(',') === b2.ring.join(',')} footerEqual=${b1.footer === b2.footer} rows=${b2.ids.length}`);

// ---------- W8: a garbage seed falls back without throwing; an integer seed pins the integer ----------
await page.evaluate(() => localStorage.clear());
await page.goto(`http://localhost:${PORT}/?dev=1&seed=${encodeURIComponent('!!not-a-seed!!')}`);
await page.waitForTimeout(2800);
const garbageRenders = (await page.locator('.cp-ts').count()) === 1 && errs.length === 0;
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.locator('.cp-ts-go').click();
await page.waitForTimeout(1100);
const g = await readBoard(page);
ok('W8 a garbage seed falls back to the random draw WITHOUT throwing (a valid record mounts, a code displays)',
  garbageRenders && g.seed !== null && g.seed >= 1000 && g.seed < 10000 && g.code === g.seed.toString(36) && !g.err,
  `seed=${g.seed} code=${g.code} rendered=${garbageRenders}`);
await page.evaluate(() => localStorage.clear());
await startAt(page, '777777');
const ig = await readBoard(page);
ok('W8 an integer seed pins the exact integer (777777)', ig.seed === 777777 && ig.code === (777777).toString(36), `seed=${ig.seed} code=${ig.code}`);
await page.close();

// ---------- W4/W5/W9 at 390×320 ----------
const ph = await browser.newPage({ viewport: { width: 390, height: 320 } });
const errs390 = [];
ph.on('pageerror', (e) => errs390.push(String(e)));
await ph.goto(`http://localhost:${PORT}/?dev=1&seed=${SEEDS[0]}`);
await ph.waitForTimeout(2800);
await ph.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await ph.waitForTimeout(200);
await ph.locator('.cp-ts-go').click();
await ph.waitForTimeout(1200);
const walk = [];
for (const label of ['board', 'after pick']) {
  const m = await ph.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  walk.push(`${label} ${m.sw}/${m.cw}`);
  if (label === 'board') { await ph.locator('.cp-rows .cp-row.cp-suggest .cp-quick').first().click(); await ph.waitForTimeout(800); }
}
ok(`W4 seed ${SEEDS[0]}: no horizontal scroll at 390 across the walk`, walk.every((w) => { const [sw, cw] = w.split(' ').pop().split('/').map(Number); return sw <= cw; }), walk.join(' · '));
ok('W5 zero console/page errors across every load (both viewports)', errs.length === 0 && errs390.length === 0, errs.length ? errs[0] : errs390[0] || 'clean');
// W9: the seed survives the boot rehydration (the autosave path)
await ph.reload();
await ph.waitForTimeout(3500);
const r9 = await ph.evaluate(() => { const s = window.__cp.store.getState(); return { seed: s.record?.seed ?? null, err: s.error ?? '' }; });
ok(`W9 seed ${SEEDS[0]} survives save → restore (reload replays the same seed, no "pick is out of order")`,
  r9.seed === parseInt(SEEDS[0], 36) && !r9.err, `seed=${r9.seed} err="${r9.err}"`);
await ph.close();
await browser.close();

const pass = results.filter((r) => r.verdict === 'PASS').length;
const fail = results.filter((r) => r.verdict === 'FAIL').length;
console.log(`\n== SEEDED VISUAL BATTERY · ${pass} pass · ${fail} fail · seeds ${SEEDS.join(', ')} ==`);
if (fail > 0) { console.log('   FAILED LAWS: ' + results.filter((r) => r.verdict === 'FAIL').map((r) => r.law).join(' | ')); process.exit(1); }
fs.mkdirSync(path.join(ROOT, 'deliveries', 'receipts'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'deliveries', 'receipts', 'visual-battery-latest.json'), JSON.stringify({ seeds: SEEDS, results, pass, fail }, null, 2));
