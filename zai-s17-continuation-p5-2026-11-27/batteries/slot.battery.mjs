/* slot.battery.mjs — the P-317 battery: the draft-position selector end-to-end. The Owner's ruling
 * (2026-11-09): the user picks BOTH team and draft position (slot 1–32) on Team Select; Slice 2 is
 * NOT accepted until the selector works end-to-end. The store half is the Architect's (pickSlot in
 * START, draftOrder() swap, SaveRecord.pickSlot — verified at pin 408410477); this battery pins the
 * SHELL half: the screen passes the chosen slot, the store's own order builder runs, and the slot
 * is never silently ignored.
 *
 * Two sections, one report:
 *   NODE    — through the port layer (seam.ts), browser-free: START/undo/restore at an early and a
 *             late slot, the independent order oracle, the natural-slot omission, the bad-slot guard.
 *   BROWSER — through the REAL UI (Playwright against the served dist): Team Select → slot → DRAFT,
 *             the displaced team picks first, a real 3-action pick lands on the roster, the mode lock
 *             fires and holds, the boot rehydration replays the same order (no "pick is out of order").
 *
 * The ORACLE is written from the P-317 spec text, not from the store: strict serpentine over a
 * permutation where the user's team and the chosen slot's team trade places, the trade standing in
 * EVERY round. If the shell (or the store) ignored the slot, the order is the plain snake and every
 * on-clock law below DIES.
 *
 * Run: node --import ./scripts/node-port-register.mjs batteries/slot.battery.mjs
 * The browser section needs the built dist served on CP_PORT (default 4179) — the acceptance run
 * starts vite preview before the batteries; standalone, run `npx vite preview --port 4179` first.
 * Exit 0 = green; exit 1 = a law died. A law that cannot run SKIPs LOUDLY with its reason.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const _req = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (rel) => path.join(ROOT, rel);
const PORT = Number(process.env.CP_PORT || 4179);
const results = [];
const ok = (law, pass, detail = '') => { results.push({ law, verdict: pass ? 'PASS' : 'FAIL', detail }); console.log(`   ${pass ? 'PASS' : 'FAIL'}  ${law}${detail ? ' — ' + detail : ''}`); };

// ---------- the independent oracle (P-317 spec text; NOT the store's function) ----------
const N = 32;
const oracleOrder = (userTeam, slot) => {
  const perm = Array.from({ length: N }, (_, i) => i);
  if (slot !== null && slot - 1 !== userTeam) { perm[userTeam] = slot - 1; perm[slot - 1] = userTeam; }
  const out = [];
  for (let r = 0; r < N; r++) for (let i = 0; i < N; i++) out.push(perm[r % 2 === 0 ? i : N - 1 - i]);
  return out;
};

// ---------- the port layer, node-side (no browser, no svelte) ----------
const port = await import(P('src/lib/port/seam.ts'));
const { buildPool, createStore, freezePool, thawPool, parseRecord, candidates, TEAMS } = port;
const hydrateApp = await import(P('src/lib/port/hydrateApp.ts'));
const CSV = (p) => fs.readFileSync(P(p), 'utf8');
const pool = buildPool(CSV('data/nfl/madden27-ratings.csv'), CSV('data/nfl/free-agents-old-ratings.csv'), CSV('data/nfl/player-ids.csv'));
const memStorage = () => { const m = new Map(); return {   // the StorageModule shape over a Map (node has no localStorage)
  async read(k) { return { ok: true, value: m.has(k) ? m.get(k) : null }; },
  async write(k, t) { m.set(k, String(t)); return { ok: true, value: undefined }; },
  async remove(k) { m.delete(k); return { ok: true, value: undefined }; },
  async keys(p) { return { ok: true, value: [...m.keys()].filter((k) => k.startsWith(p)).sort() }; },
  async entries(p) { return { ok: true, value: [...m.keys()].filter((k) => k.startsWith(p)).sort().map((k) => [k, m.get(k)]) }; },
}; };

const EARLY = { team: 0, slot: 2 };    // the Bears: natural slot 1, chosen slot 2 — a NON-natural early slot
const LATE = { team: 30, slot: 32 };   // a late team: natural slot 31, chosen slot 32 — a NON-natural late slot

// ================= SECTION A — NODE LAWS (the store through the port layer) =================
console.log('== P-317 node laws: START/undo/restore carry the chosen slot ==');

for (const c of [EARLY, LATE]) {
  const tag = `slot ${c.slot} · ${TEAMS[c.team].name} (natural ${c.team + 1})`;
  const st0 = createStore(pool);
  st0.dispatch({ type: 'START', seed: 4242, userTeam: c.team, pickSlot: c.slot });
  const s = st0.getState();
  const oracle = oracleOrder(c.team, c.slot);
  ok(`N-S1 ${tag}: the record carries pickSlot=${c.slot} and no error`, s.error === null && s.record && s.record.pickSlot === c.slot,
    `pickSlot=${s.record && s.record.pickSlot} error=${JSON.stringify(s.error)}`);
  ok(`N-S2 ${tag}: the CPU has made exactly ${c.slot - 1} picks, none by the user's team`, s.record.picks.length === c.slot - 1 && s.record.picks.every((k) => k.team !== c.team),
    `logged=${s.record.picks.length}`);
  ok(`N-S3 ${tag}: the user is on the clock at overall pick ${c.slot}`, s.draft.order[s.draft.pos] === c.team && s.draft.pos === c.slot - 1,
    `pos=${s.draft.pos} order[pos]=${s.draft.order[s.draft.pos]}`);
  ok(`N-S4 ${tag}: the full 1,024 order equals the independent oracle (the swap stands in EVERY round)`,
    JSON.stringify(s.draft.order) === JSON.stringify(oracle), `len=${s.draft.order.length}`);
  ok(`N-S5 ${tag}: the displaced team holds the user's natural round-1 position`, oracle[c.team] === c.slot - 1 && s.draft.order[c.team] === c.slot - 1,
    `order[natural]=${s.draft.order[c.team]} expected=${c.slot - 1}`);
  ok(`N-S6 ${tag}: every logged pick rides the oracle order`, s.record.picks.every((k, i) => k.team === oracle[i]), `checked=${s.record.picks.length}`);
}

// undo: the order and the next pick do not move; pickSlot survives
{
  const stU = createStore(pool);
  stU.dispatch({ type: 'START', seed: 4242, userTeam: EARLY.team, pickSlot: EARLY.slot });
  const recPre = JSON.stringify(stU.getState().record);
  const c = candidates(stU.getState().draft, EARLY.team)[0];
  stU.dispatch({ type: 'PICK', playerId: c.player.id, slot: c.slot });
  const afterPick = stU.getState();
  stU.dispatch({ type: 'UNDO' });
  const afterUndo = stU.getState();
  ok('N-S7 undo after a slotted pick: the record (incl. pickSlot) returns byte-for-byte to the pre-pick state and the user is back on the clock',
    afterUndo.draft.pos === EARLY.slot - 1 && afterUndo.record.pickSlot === EARLY.slot && JSON.stringify(afterUndo.record) === recPre,
    `pos=${afterUndo.draft.pos} (pre-pick: ${EARLY.slot - 1}) recordIdentical=${JSON.stringify(afterUndo.record) === recPre}`);
  ok('N-S8 the user pick lands exactly at overall pick 2 and on the user roster (the CPU then picks on)',
    afterPick.record.picks[EARLY.slot - 1].team === EARLY.team && afterPick.record.picks.filter((k) => k.team === EARLY.team).length === 1,
    `pick@2 team=${afterPick.record.picks[EARLY.slot - 1].team} userPicks=${afterPick.record.picks.filter((k) => k.team === EARLY.team).length}`);
}

// restore: the shell's own autosave path — readAutosave + LOAD replays the SAME order (no "pick is out of order")
{
  const stR = createStore(pool);
  stR.dispatch({ type: 'START', seed: 9191, userTeam: LATE.team, pickSlot: LATE.slot });
  const c = candidates(stR.getState().draft, LATE.team)[0];
  stR.dispatch({ type: 'PICK', playerId: c.player.id, slot: c.slot });
  const rec = JSON.parse(JSON.stringify(stR.getState().record));
  const mod = memStorage();
  const meta = { engineVersion: 'battery', dataVersion: 'sha256:battery', saveId: 'p317-lineage', saveRevision: 1 + rec.picks.length, createdAt: '2026-11-20T00:00:00.000Z' };
  const writeErr = await hydrateApp.autosaveDraft(rec, meta, new Date('2026-11-20T00:01:00.000Z'), mod);
  const r = await hydrateApp.readAutosave(mod);
  const stB = createStore(pool);
  stB.dispatch({ type: 'LOAD', record: r.ok ? r.draft.record : rec });
  const s = stB.getState();
  ok('N-S9 save → restore replays the slotted order (no "pick is out of order")',
    writeErr === '' && r.ok && s.error === null && JSON.stringify(s.draft.order) === JSON.stringify(oracleOrder(LATE.team, LATE.slot)) && s.draft.order[s.draft.pos] === LATE.team,
    `writeErr=${JSON.stringify(writeErr)} r.ok=${r.ok} error=${JSON.stringify(s.error)} restoredPickSlot=${s.record && s.record.pickSlot}`);
}

// the natural slot: the store treats pickSlot-1 === userTeam as absent — the record carries NO pickSlot
{
  const stNat = createStore(pool);
  stNat.dispatch({ type: 'START', seed: 777, userTeam: EARLY.team, pickSlot: EARLY.team + 1 });
  const s = stNat.getState();
  ok('N-S10 the natural slot (slot = team index + 1) is OMITTED from the record and the plain snake runs',
    s.error === null && !('pickSlot' in s.record) && JSON.stringify(s.draft.order) === JSON.stringify(oracleOrder(EARLY.team, null)) && s.draft.order[s.draft.pos] === EARLY.team,
    `pickSlotPresent=${'pickSlot' in s.record} onClock=${s.draft.order[s.draft.pos]}`);
}

// the guard: a bad slot is rejected loudly
{
  const stBad = createStore(pool);
  stBad.dispatch({ type: 'START', seed: 777, userTeam: EARLY.team, pickSlot: 33 });
  const e1 = stBad.getState().error;
  const stBad2 = createStore(pool);
  stBad2.dispatch({ type: 'START', seed: 777, userTeam: EARLY.team, pickSlot: 2.5 });
  ok('N-S11 a bad slot (33, 2.5) is REJECTED with a named error, no draft mounts',
    !!e1 && /bad pick slot/.test(e1) && !!stBad2.getState().error && stBad.getState().draft === null,
    `e1=${JSON.stringify(e1)} e2=${JSON.stringify(stBad2.getState().error)}`);
}

// ================= SECTION B — BROWSER LAWS (the real UI flow) =================
console.log('== P-317 browser laws: Team Select → slot → DRAFT through the real flow ==');
let pw; try { pw = _req('playwright'); } catch (e) {
  console.log(`   SKIP  all browser laws — playwright is not installed (D-1: no HOME-global fallback): ${e.message}`);
  results.push({ law: 'browser section', verdict: 'SKIP', detail: 'playwright missing' });
}
let serving = false;
try { serving = (await fetch(`http://localhost:${PORT}/`)).ok; } catch { serving = false; }
if (pw && !serving) {
  console.log(`   SKIP  all browser laws — nothing is served on http://localhost:${PORT} (start vite preview first)`);
  results.push({ law: 'browser section', verdict: 'SKIP', detail: `no server on ${PORT}` });
}
if (pw && serving) {
  // S14 (§4.10): the D-2 stale-server guard — the served build must BE this tree's build
  try { const { assertFreshServer } = await import('../scripts/fresh-server.mjs'); await assertFreshServer(PORT, ROOT); }
  catch (e) { console.log('FRESH-SERVER FAIL — ' + e.message); results.push({ law: 'browser section', verdict: 'FAIL', detail: e.message }); process.exit(1); }
  const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  const state = () => page.evaluate(() => { const s = window.__cp.store.getState(); const mine = s.record ? s.record.picks.filter((k) => k.team === s.record.userTeam).length : -1; return { error: s.error, userTeam: s.record && s.record.userTeam, pickSlot: s.record ? (s.record.pickSlot === undefined ? null : s.record.pickSlot) : null, picks: s.record ? s.record.picks.map((k) => k.team) : [], pos: s.draft ? s.draft.pos : -1, onClock: s.draft ? s.draft.order[s.draft.pos] : -1, orderStr: s.draft ? JSON.stringify(s.draft.order) : '', status: s.status, roster: mine }; });

  // B1: EARLY slot through the real flow — the Bears at slot 2
  await page.goto(`http://localhost:${PORT}/?dev=1`);
  await page.waitForTimeout(3000);
  await page.locator('.cp-ts-team', { hasText: TEAMS[EARLY.team].name }).click();
  await page.waitForTimeout(150);
  await page.locator('.cp-ts-slot').nth(EARLY.slot - 1).click();
  await page.waitForTimeout(150);
  const goText = (await page.locator('.cp-ts-go').textContent()) || '';
  ok('B1 the DRAFT button NAMES the chosen slot', goText.includes(`SLOT ${EARLY.slot}`), goText.trim());
  await page.locator('.cp-ts-go').click();
  await page.waitForTimeout(1200);
  let st = await state();
  const oracleE = oracleOrder(EARLY.team, EARLY.slot);
  ok('B1 EARLY slot: START carried pickSlot through the real flow', st.pickSlot === EARLY.slot && st.userTeam === EARLY.team, `pickSlot=${st.pickSlot} userTeam=${st.userTeam}`);
  ok('B1 EARLY slot: the displaced team made overall pick 1 (the slot is not ignored)',
    st.picks.length === EARLY.slot - 1 && st.picks[0] !== EARLY.team && st.onClock === EARLY.team && st.pos === EARLY.slot - 1,
    `logged=${st.picks.length} first=${st.picks[0]} onClock=${st.onClock} pos=${st.pos}`);
  ok('B1 EARLY slot: the live order equals the independent oracle', st.orderStr === JSON.stringify(oracleE), `len=${st.picks.length}`);
  // a REAL 3-action pick lands on the roster; the mode lock fired at START and holds
  const modeLocked = await page.locator('.cp-mode').first().isDisabled();
  await page.locator('.cp-row .cp-main').first().click(); await page.waitForTimeout(200);
  await page.locator('.cp-chip.cp-primary').first().click(); await page.waitForTimeout(200);
  await page.locator('.cp-go').click(); await page.waitForTimeout(900);
  st = await state();
  ok('B1 the real pick lands exactly at overall pick 2 on the chosen roster (the CPU then picks on)',
    st.picks[EARLY.slot - 1] === EARLY.team && st.picks.filter((t) => t === EARLY.team).length === 1 && st.roster === 1,
    `pick@2=${st.picks[EARLY.slot - 1]} userPicks=${st.picks.filter((t) => t === EARLY.team).length} roster=${st.roster}`);
  ok('B1 the mode lock fired at START and holds after the pick', modeLocked && (await page.locator('.cp-mode').first().isDisabled()), `atStart=${modeLocked} afterPick=${await page.locator('.cp-mode').first().isDisabled()}`);

  // B2: RELOAD — the boot rehydration replays the SAME slotted order (the autosave path)
  const before = st;
  await page.reload();
  await page.waitForTimeout(3500);
  st = await state();
  ok('B2 the reload replays the SAME slotted order (pickSlot restored, no "pick is out of order")',
    st.error === null && st.pickSlot === EARLY.slot && st.orderStr === before.orderStr && st.onClock === before.onClock && st.userTeam === EARLY.team,
    `error=${JSON.stringify(st.error)} pickSlot=${st.pickSlot} sameOrder=${st.orderStr === before.orderStr} onClock=${st.onClock}`);
  // B2b (cakepanz-12 S4): the restore-replay REASSURANCE shows on the RESTORE path — a reloaded
  // session has requestedSlot === null (the prop is live-flow-only), so the note used to be gated
  // off exactly where a user needed it. The gate now reads record.pickSlot too.
  await page.evaluate(() => { location.hash = '#/complete'; window.dispatchEvent(new Event('hashchange')); });
  await page.waitForTimeout(600);
  const note2b = await page.evaluate(() => ({
    present: !!document.querySelector('.cp-done-note'),
    text: document.querySelector('.cp-done-note')?.textContent?.trim() ?? '',
    screen: document.querySelector('main.cp-root')?.getAttribute('data-screen'),
  }));
  ok('B2b the restore-replay reassurance RENDERS on the restore path (a reloaded slotted draft shows the pickSlot note without a live requestedSlot — S4)',
    note2b.present && note2b.screen === 'complete' && note2b.text.includes('slot ' + EARLY.slot) && note2b.text.includes('restore'),
    `screen=${note2b.screen} present=${note2b.present} text="${note2b.text.slice(0, 72)}…"`);
  await page.evaluate(() => { location.hash = '#/board'; window.dispatchEvent(new Event('hashchange')); });
  await page.waitForTimeout(400);

  // B3: LATE slot through the real flow (fresh session: the autosave is cleared first)
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForTimeout(3000);
  await page.locator('.cp-ts-team', { hasText: TEAMS[LATE.team].name }).click();
  await page.waitForTimeout(150);
  await page.locator('.cp-ts-slot').nth(LATE.slot - 1).click();
  await page.waitForTimeout(150);
  await page.locator('.cp-ts-go').click();
  await page.waitForTimeout(1200);
  st = await state();
  ok('B3 LATE slot: START carried pickSlot=32; 31 CPU picks ride the oracle; the user is on the clock at pick 32',
    st.pickSlot === LATE.slot && st.picks.length === LATE.slot - 1 && st.picks.every((t, i) => t === oracleOrder(LATE.team, LATE.slot)[i]) && st.onClock === LATE.team,
    `pickSlot=${st.pickSlot} logged=${st.picks.length} onClock=${st.onClock}`);

  // B4: the NATURAL slot — pickSlot is omitted, the plain snake runs
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForTimeout(3000);
  await page.locator('.cp-ts-team', { hasText: TEAMS[1].name }).click();
  await page.waitForTimeout(150);
  await page.locator('.cp-ts-slot').nth(1).click();   // slot 2 = team index 1's natural spot
  await page.waitForTimeout(150);
  await page.locator('.cp-ts-go').click();
  await page.waitForTimeout(1200);
  st = await state();
  ok('B4 the natural slot omits pickSlot and the plain snake runs (on clock at the natural pick)',
    st.pickSlot === null && st.userTeam === 1 && st.onClock === 1 && st.pos === 1 && st.picks[0] === 0,
    `pickSlot=${st.pickSlot} onClock=${st.onClock} first=${st.picks[0]}`);
  ok('B5 zero page errors across the whole P-317 walk', errs.length === 0, errs.length ? errs[0] : 'clean');
  await browser.close();
}

// ---------- the report ----------
const pass = results.filter((r) => r.verdict === 'PASS').length;
const fail = results.filter((r) => r.verdict === 'FAIL').length;
const skip = results.filter((r) => r.verdict === 'SKIP').length;
console.log(`\n== P-317 SLOT BATTERY · ${pass} pass · ${fail} fail · ${skip} skip ==`);
fs.mkdirSync(path.join(ROOT, 'deliveries', 'receipts'), { recursive: true });
// the T1 content-freshness field (2026-11-24, the orcads F3 fix): the receipt carries the dist
// fingerprint it was measured against — tools/shell-status.mjs compares it to the shipped dist/
// and prints content FRESH/STALE from BYTES, never from the clock.
const distFingerprint = () => { const h = createHash('sha256'); const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else h.update(path.relative(ROOT, p) + ':' + createHash('sha256').update(fs.readFileSync(p)).digest('hex') + '\n'); } }; walk(path.join(ROOT, 'dist')); return h.digest('hex'); };
fs.writeFileSync(path.join(ROOT, 'deliveries', 'receipts', 'slot-battery-latest.json'), JSON.stringify({ results, pass, fail, skip, distHash: distFingerprint() }, null, 2));
if (fail > 0) { console.log('   FAILED LAWS: ' + results.filter((r) => r.verdict === 'FAIL').map((r) => r.law).join(' | ')); process.exit(1); }
