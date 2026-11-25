/* visual.battery.mjs — the SEEDED visual battery (T5, 2026-11-20): the ring and the layout are
 * measured by a GATE, not by hand. Three seats hand-measured the ring and two disagreed — every
 * measurement here is a named law at a named seed.
 *
 *   W1  exactly 3 top-three rows (.cp-top3) at pick 1 (1180×900, fixed seeds; more ONLY on an
 *       order tie — the interim display-rounded extension, paired with L13's oracle)
 *   W2  the top-three treatment is contiguous from the top (the first three rows carry it)
 *   W3  one-click Draft on a ringed row lands exactly one pick (the T2 path, at a named seed)
 *   W4  no horizontal scroll at 390 (scrollWidth <= clientWidth, the whole walk)
 *   W5  zero console errors across every load (both viewports)
 *   W6  the seed code is displayed in the board footer and matches ?seed= (T3)
 *   W7  two loads at one seed give IDENTICAL boards: the same 60-row id order, the same top-three ids,
 *       the same footer (T3's replayability law — the "byte-identical board" of the order)
 *   W8  a garbage seed falls back to the random draw WITHOUT throwing, and an integer seed pins
 *       the exact integer (T3)
 *   W9  the seed survives save → restore: a reload replays the same seed and the same code (T3)
 *   W10 the displayed code round-trips to the SAME seed — the whole old draw range, the whole
 *       widened range, a strided sweep of the parse contract, the legacy forms (cakepanz-12 T2)
 *   W11 the wrap band holds at 768px — no horizontal scroll, the one-click button usable (cakepanz-12 S5)
 *   W14 the explicit ?seed= link wins over a DIFFERENT autosave (no restore, the URL keeps the
 *       link, the notice shows, the local save untouched) and a SAME-seed reload still restores —
 *       the W9 exception is load-bearing (S14/P0; the naive guard dies under falsifier F23-w14)
 *   S15 (2026-11-21): the ring is RETIRED — every selector above points at the ONE visible Draft
 *       button (.cp-draftbtn) inside the top-three rows (.cp-top3); the click that W3/W4/W11/W12/W14
 *       leg A make is the same one-click dispatch, re-pointed per the continuation order §2.4
 *
 * Run: node --import ./scripts/node-port-register.mjs batteries/visual.battery.mjs
 * Needs `npm run distfile` first + the preview server (CP_PORT, default 4179).
 * Exit 0 = green; exit 1 = a law died. A law that cannot run SKIPs LOUDLY with its reason.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { assertFreshServer } from '../scripts/fresh-server.mjs';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch (e) { console.log(`   SKIP  all laws — playwright is not installed (D-1: no HOME-global fallback): ${e.message}`); process.exit(0); }
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.CP_PORT || 4179);
// the seed↔code contract under test — the PRODUCT's own module (never a battery copy: a copy could
// pass while the product drifted — that is a tautology, not a law)
const seedMod = await import(path.join(ROOT, 'src/lib/port/seedCode.ts'));
const results = [];
const ok = (law, pass, detail = '') => { results.push({ law, verdict: pass ? 'PASS' : 'FAIL', detail }); console.log(`   ${pass ? 'PASS' : 'FAIL'}  ${law}${detail ? ' — ' + detail : ''}`); };
let serving = false;
try { serving = (await fetch(`http://localhost:${PORT}/`)).ok; } catch { serving = false; }
if (!serving) { console.log(`   SKIP  all laws — nothing is served on http://localhost:${PORT} (start vite preview first)`); process.exit(0); }
// S14 (§4.10): the D-2 stale-server guard — a zombie preview on the port once served a stale build
// and turned a red run green. The served build must BE this tree's build, or the battery exits 1.
try { await assertFreshServer(PORT, ROOT); } catch (e) { console.log('   FAIL  fresh-server — ' + e.message); process.exit(1); }

const SEEDS = ['a3f2', 'k1x9'];   // the named seeds (base-36 codes; k1x9 = a second draw for the walk)
const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });

const readBoard = (page) => page.evaluate(() => {
  const rows = [...document.querySelectorAll('.cp-rows .cp-row')];
  const st = window.__cp.store.getState();
  return {
    ids: rows.map((el) => el.getAttribute('data-id')),
    ring: rows.filter((el) => el.classList.contains('cp-top3')).map((el) => el.getAttribute('data-id')),
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
  ok(`W1 seed ${s}: exactly 3 top-three rows (.cp-top3) at pick 1 (more ONLY on an order tie — C′1's rule; the ring class is retired, S15)`,
    tieOk && b.userPicks === 0, `ring=${b.ring.length} userPicks=${b.userPicks}${b.ring.length > 3 ? ' · TIE at the cutoff: vals[2..3]=' + vals[2] + '/' + vals[3] + ', next=' + (vals[b.ring.length] ?? 'end') : ''}`);
  const first3 = b.ids.slice(0, 3);
  ok(`W2 seed ${s}: the top-three treatment is contiguous from the top`, first3.every((id, i) => b.ring[i] === id), `top3=${first3.join(',')} ring=${b.ring.join(',')}`);
  ok(`W6 seed ${s}: the footer shows the PREFIXED seed code and it matches ?seed=`, b.code === seedMod.seedToCode(b.seed) && b.seed === parseInt(s, 36) && seedMod.parseSeedCode(b.code) === b.seed, `code=${b.code} seed=${b.seed} expected=${seedMod.seedToCode(b.seed)} roundtrip=${seedMod.parseSeedCode(b.code)}`);
  if (s === SEEDS[0]) {
    // W3 at the first seed: one click lands exactly one pick, then undo restores for W7's second load
    await page.locator('.cp-rows .cp-row.cp-top3 .cp-draftbtn').first().click();
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
ok('W8 a garbage seed falls back to the widened random draw WITHOUT throwing (a valid record mounts, a prefixed code displays, the resolved seed rides the URL)',
  garbageRenders && g.seed !== null && g.seed >= seedMod.SEED_MIN && g.seed <= seedMod.SEED_MIN + seedMod.SEED_RANGE - 1 && g.code === seedMod.seedToCode(g.seed) && !g.err && new URL(page.url()).searchParams.get('seed') === seedMod.seedToCode(g.seed),
  `seed=${g.seed} code=${g.code} range=[${seedMod.SEED_MIN},${seedMod.SEED_MIN + seedMod.SEED_RANGE - 1}] urlSeed=${new URL(page.url()).searchParams.get('seed')} rendered=${garbageRenders}`);
await page.evaluate(() => localStorage.clear());
await startAt(page, '777777');
const ig = await readBoard(page);
ok('W8 an integer seed pins the exact integer (777777)', ig.seed === 777777 && ig.code === seedMod.seedToCode(777777), `seed=${ig.seed} code=${ig.code}`);

// ---------- W10 (cakepanz-12 T2/PORCA S1): the displayed code round-trips to the SAME seed ----------
// The defect: the code was bare base-36 while parseSeed() tried the DECIMAL branch first — any
// all-digit code replayed a different seed (700 of the 9,000 old-draw seeds mis-replayed). The
// law: the PRODUCT's own parser round-trips EVERY seed the product can mint — the old 1000–9999
// draw (0 failures), the whole widened R2 range 100,000–9,999,999 (0 failures), a strided sweep
// of the full 1…2^31-1 parse contract (0 failures) — and the legacy forms keep their contracts.
{
  let bad = 0, badFirst = -1;
  for (let n = 1000; n <= 9999; n++) if (seedMod.parseSeedCode(seedMod.seedToCode(n)) !== n) { bad++; if (badFirst < 0) badFirst = n; }
  let badWide = 0;
  for (let n = seedMod.SEED_MIN; n <= seedMod.SEED_MIN + seedMod.SEED_RANGE - 1; n++) if (seedMod.parseSeedCode(seedMod.seedToCode(n)) !== n) badWide++;
  let badStride = 0;
  for (let n = 1; n <= seedMod.SEED_MAX; n += 997) if (seedMod.parseSeedCode(seedMod.seedToCode(n)) !== n) badStride++;
  const boundaries = seedMod.parseSeedCode(seedMod.seedToCode(1)) === 1 && seedMod.parseSeedCode(seedMod.seedToCode(seedMod.SEED_MAX)) === seedMod.SEED_MAX;
  const legacy = seedMod.parseSeedCode('777777') === 777777
    && seedMod.parseSeedCode('a3f2') === parseInt('a3f2', 36)
    && seedMod.parseSeedCode('b36:100') === 1296
    && seedMod.parseSeedCode('100') === 100
    && seedMod.parseSeedCode('!!nope!!') === null;
  ok('W10 the displayed code round-trips to the SAME seed: 1000–9999 → 0 failures (the PORCA S1 bug mis-replayed 700), the widened range 100,000–9,999,999 → 0 failures, a strided sweep of 1…2^31-1 → 0 failures, the boundaries hold, and the legacy URL forms keep their contracts',
    bad === 0 && badWide === 0 && badStride === 0 && boundaries && legacy,
    `old-range failures=${bad}${badFirst >= 0 ? ' first=' + badFirst : ''} · wide-range failures=${badWide} · stride failures=${badStride} · boundaries=${boundaries} · legacy=${legacy}`);
}
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
  if (label === 'board') { await ph.locator('.cp-rows .cp-row.cp-top3 .cp-draftbtn').first().click(); await ph.waitForTimeout(800); }
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

// ---------- W11 (cakepanz-12 S5): the wrap band — 768px sits between the 390 and 1180 laws ----------
const p768 = await browser.newPage({ viewport: { width: 768, height: 900 } });
const errs768 = [];
p768.on('pageerror', (e) => errs768.push(String(e)));
await p768.evaluate(() => localStorage.clear()).catch(() => {});
await p768.goto(`http://localhost:${PORT}/?dev=1&seed=${SEEDS[1]}`);
await p768.waitForTimeout(2800);
await p768.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await p768.waitForTimeout(200);
await p768.locator('.cp-ts-go').click();
await p768.waitForTimeout(1200);
const m768 = await p768.evaluate(() => {
  const q = document.querySelector('.cp-rows .cp-row.cp-top3 .cp-draftbtn');
  const box = q ? q.getBoundingClientRect() : null;
  return { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
           quick: !!q, qw: box ? Math.round(box.width) : 0, qh: box ? Math.round(box.height) : 0 };
});
let userPicks768 = -1;
if (m768.quick && m768.qw > 0 && m768.qh > 0) {
  await p768.locator('.cp-rows .cp-row.cp-top3 .cp-draftbtn').first().click();
  await p768.waitForTimeout(800);
  userPicks768 = await p768.evaluate(() => { const s = window.__cp.store.getState(); return s.record ? s.record.picks.filter((p) => p.team === s.record.userTeam).length : -1; });
}
ok(`W11 the wrap band holds at 768px: no horizontal scroll, the one-click button renders and stays usable (one click lands one pick, zero page errors)`,
  m768.sw <= m768.cw && m768.quick && m768.qw > 0 && m768.qh > 0 && userPicks768 === 1 && errs768.length === 0,
  `scrollW=${m768.sw} clientW=${m768.cw} quick=${m768.quick}(${m768.qw}×${m768.qh}) userPicks=${userPicks768} errs=${errs768.length}`);
await p768.close();

// ---------- W12 + W13 (S13): the restore shareability + the new-seed affordance ----------
{
  const ctx13 = await browser.newContext({ viewport: { width: 1180, height: 900 } });
  const p13 = await ctx13.newPage();
  const errs13 = [];
  p13.on('pageerror', (e) => errs13.push(String(e)));
  // W12 (the D2 law): START at a named seed, one pick (the autosave mirrors), then a PLAIN reload
  // (no ?seed= in the URL): the boot rehydration restores the draft — and the URL must carry the
  // store's seed, so the restored draft is shareable too (before the fix only START wrote it).
  await p13.goto(`http://localhost:${PORT}/?dev=1&seed=${SEEDS[0]}`);
  await p13.waitForTimeout(2800);
  await p13.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
  await p13.waitForTimeout(150);
  await p13.locator('.cp-ts-go').click();
  await p13.waitForTimeout(1100);
  await p13.locator('.cp-rows .cp-row.cp-top3 .cp-draftbtn').first().click();
  await p13.waitForTimeout(900);
  const seedBefore = await p13.evaluate(() => window.__cp.store.getState().record.seed);
  await p13.goto(`http://localhost:${PORT}/?dev=1`);   // plain open — the boot path must rehydrate AND share
  await p13.waitForTimeout(3200);
  const w12 = await p13.evaluate(() => ({
    url: new URL(location.href).searchParams.get('seed'),
    store: window.__cp.store.getState().record ? window.__cp.store.getState().record.seed : null,
    screen: document.querySelector('main')?.getAttribute('data-screen'),
  }));
  ok('W12 after a reload-restore the URL seed === the store seed (the restored draft is shareable — the D2 law)',
    w12.store !== null && w12.url !== null && w12.url === 'b36:' + Number(w12.store).toString(36) && errs13.length === 0,
    `url=${w12.url} store=${w12.store} screen=${w12.screen} errs=${errs13.length}`);
  // W13 (the R2 tab-variety law): the restored tab is PINNED — Team Select shows the affordance;
  // "New draft · new seed" clears ?seed= (the affordance hides) and the next START draws a fresh
  // seed (≠ the pinned one) whose code rides the URL. An explicit replay link still pins — the
  // W6/W8 laws prove that; nothing is weakened.
  await p13.evaluate(() => window.__cp.go('team'));
  await p13.waitForTimeout(400);
  const pinned = await p13.locator('.cp-ts-newseed').count();
  if (pinned === 1) {
    await p13.locator('.cp-ts-newseed').click();
    await p13.waitForTimeout(300);
  }
  const cleared = await p13.evaluate(() => ({
    stillPinned: new URL(location.href).searchParams.has('seed'),
    affordance: document.querySelector('.cp-ts-newseed')?.textContent ?? null,
  }));
  await p13.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
  await p13.waitForTimeout(150);
  await p13.locator('.cp-ts-go').click();
  await p13.waitForTimeout(1200);
  const w13 = await p13.evaluate(() => ({
    seed: window.__cp.store.getState().record.seed,
    url: new URL(location.href).searchParams.get('seed'),
    picks: window.__cp.store.getState().record.picks.length,
  }));
  ok('W13 the new-seed affordance clears the tab pin: it shows when pinned, vanishes on click, and the next START draws a FRESH seed whose code rides the URL (explicit replay untouched)',
    pinned === 1 && !cleared.stillPinned && cleared.affordance === null && w13.seed !== seedBefore && w13.url === 'b36:' + Number(w13.seed).toString(36) && errs13.length === 0,
    `pinned=${pinned} cleared=${!cleared.stillPinned} seed ${seedBefore}→${w13.seed} url=${w13.url} errs=${errs13.length}`);
  await p13.close();
  await ctx13.close();
}

// ---------- W14 (S14/P0): the explicit ?seed= link wins over a DIFFERENT autosave; a SAME-seed reload restores ----------
// The defect (S13 bytes, confirmed by four seats): an explicit ?seed=B in a shared link was silently
// overwritten by a stale autosave A — the visitor landed on their own old draft and the URL was
// rewritten to hide the link. The fix: an explicit link beats a different autosave (no restore, no
// URL rewrite, a visible notice, the local save left untouched); a SAME-seed reload still restores
// (W9 — the exception is load-bearing); a plain reload with no seed still restores (S29/W12).
{
  const ctx14 = await browser.newContext({ viewport: { width: 1180, height: 900 } });
  const p14 = await ctx14.newPage();
  const errs14 = [];
  p14.on('pageerror', (e) => errs14.push(String(e)));
  // leg A: seed a3f2, one pick — the autosave mirrors (seed 470990, user picks 1)
  await p14.goto(`http://localhost:${PORT}/?dev=1&seed=${SEEDS[0]}`);
  await p14.waitForTimeout(2800);
  await p14.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
  await p14.waitForTimeout(150);
  await p14.locator('.cp-ts-go').click();
  await p14.waitForTimeout(1100);
  await p14.locator('.cp-rows .cp-row.cp-top3 .cp-draftbtn').first().click();
  await p14.waitForTimeout(900);
  const seedA = parseInt(SEEDS[0], 36);
  const autosaveKey = 'sim:nfl:autosave:draft';   // core/keys.ts sportKey('nfl','autosave:draft') — the port's own key scheme
  // leg B: open ?seed=k1x9 in the SAME context — the LINK wins: no restore, the URL keeps the
  // link's seed, the notice shows, and the local save is left untouched
  await p14.goto(`http://localhost:${PORT}/?dev=1&seed=${SEEDS[1]}`);
  await p14.waitForTimeout(3200);
  const legB = await p14.evaluate((key) => {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(key) ?? 'null'); } catch {}
    return {
      screen: document.querySelector('main.cp-root')?.getAttribute('data-screen'),
      storeSeed: window.__cp.store.getState().record?.seed ?? null,
      notice: document.querySelector('.cp-sharenotice')?.textContent?.trim() ?? null,
      savedSeed: saved?.payload?.seed ?? null,
      savedPicks: Array.isArray(saved?.payload?.picks) ? saved.payload.picks.length : -1,
      urlSeed: new URL(location.href).searchParams.get('seed'),
    };
  }, autosaveKey);
  // leg C: START on the link's seed — the store seeds the LINK's draft and the code rides the URL
  await p14.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
  await p14.waitForTimeout(150);
  await p14.locator('.cp-ts-go').click();
  await p14.waitForTimeout(1200);
  const legC = await p14.evaluate(() => ({
    seed: window.__cp.store.getState().record?.seed ?? null,
    url: new URL(location.href).searchParams.get('seed'),
    picks: window.__cp.store.getState().record?.picks?.length ?? -1,
  }));
  // leg D (the inverse — the load-bearing exception): a reload with the SAME seed still restores
  await p14.goto(`http://localhost:${PORT}/?dev=1&seed=${SEEDS[1]}`);
  await p14.waitForTimeout(3200);
  const legD = await p14.evaluate(() => ({
    screen: document.querySelector('main.cp-root')?.getAttribute('data-screen'),
    seed: window.__cp.store.getState().record?.seed ?? null,
    notice: document.querySelector('.cp-sharenotice')?.textContent?.trim() ?? null,
  }));
  const bOk = legB.screen === 'team' && legB.storeSeed === null && legB.notice === 'shared link opened; your local save is untouched'
    && legB.savedSeed === seedA && legB.savedPicks >= 1 && legB.urlSeed === SEEDS[1] && errs14.length === 0;
  const cOk = legC.seed === parseInt(SEEDS[1], 36) && legC.url === 'b36:' + Number(legC.seed).toString(36) && errs14.length === 0;
  const dOk = legD.screen === 'board' && legD.seed === parseInt(SEEDS[1], 36) && legD.notice === null && errs14.length === 0;
  ok('W14 the explicit ?seed= link wins over a DIFFERENT autosave (no restore, the URL keeps the link, the notice shows, the local save is left untouched) and a SAME-seed reload still restores — the W9 exception is load-bearing (S14/P0)',
    bOk && cOk && dOk,
    `link: screen=${legB.screen} store=${legB.storeSeed} notice=${legB.notice ? 'shown' : 'MISSING'} savedSeed=${legB.savedSeed}(want ${seedA}) savedPicks=${legB.savedPicks} url=${legB.urlSeed} · START: seed=${legC.seed} url=${legC.url} · same-seed reload: screen=${legD.screen} seed=${legD.seed} notice=${legD.notice === null ? 'none' : legD.notice} errs=${errs14.length}`);
  await p14.close();
  await ctx14.close();
}

await browser.close();

const pass = results.filter((r) => r.verdict === 'PASS').length;
const fail = results.filter((r) => r.verdict === 'FAIL').length;
console.log(`\n== SEEDED VISUAL BATTERY · ${pass} pass · ${fail} fail · seeds ${SEEDS.join(', ')} ==`);
if (fail > 0) { console.log('   FAILED LAWS: ' + results.filter((r) => r.verdict === 'FAIL').map((r) => r.law).join(' | ')); process.exit(1); }
fs.mkdirSync(path.join(ROOT, 'deliveries', 'receipts'), { recursive: true });
// the T1 content-freshness field (2026-11-24, the orcads F3 fix): the receipt carries the dist
// fingerprint it was measured against — tools/shell-status.mjs compares it to the shipped dist/
// and prints content FRESH/STALE from BYTES, never from the clock.
const distFingerprint = () => { const h = createHash('sha256'); const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else h.update(path.relative(ROOT, p) + ':' + createHash('sha256').update(fs.readFileSync(p)).digest('hex') + '\n'); } }; walk(path.join(ROOT, 'dist')); return h.digest('hex'); };
fs.writeFileSync(path.join(ROOT, 'deliveries', 'receipts', 'visual-battery-latest.json'), JSON.stringify({ seeds: SEEDS, results, pass, fail, distHash: distFingerprint() }, null, 2));
