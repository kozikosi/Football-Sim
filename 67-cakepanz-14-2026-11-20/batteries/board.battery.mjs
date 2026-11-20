/* board.battery.mjs — cakepanz-9 (2026-11-19): the UNIFORM-BOARD battery. The late-draft simple
 * board is SUPERSEDED by the Owner's ruling ("the whole draft board should be the same for all
 * picks"; the order's §5/B-bis) — batteries/late.battery.mjs is deleted with the flip. This
 * battery carries the laws the product still owns, under the law names of record:
 *   L13 the top THREE available draft controls are highlighted by the board's ACTIVE order
 *       (the Owner: "at least three players' draft buttons highlighted"; sampled early/mid/late)
 *   L8  the completing pick lands on Complete through the REAL UI (+ the 4.4 hash-door leg)
 *       (re-quoted from the 8.1 late battery — the law was true of the product, not of the flip)
 *   L14 Complete prints the roster the engine would field (lineupFor on the record, effOvr per
 *       slot, the three weakest marked; data-only, the order §6/C′2)
 *   L15 the wall-slip reveal at Complete — the staggered cascade (≤2 s), instant under reduced
 *       motion (the Owner: "all for cinematics"; the order §6/C′3)
 *   L10 a NEW draft after a finished draft lands on the BOARD (the C1 defect's law, the order §4/B1)
 *   L11 the Complete screen does not lie in partial state (the C2 defect's law, the order §4/B2)
 *   L16 the ringed rows carry a ONE-CLICK draft button that names player AND slot; one click lands
 *       exactly one pick with no expand and no confirm banner (T2, the Owner's w89 signal, 20 Nov)
 *   L17 undo reverses the one-click pick (order + ring restored); a non-ringed row still expands
 *       into the flex chip path; keyboard Tab reaches the button with visible focus and Enter drafts (T2)
 *   L18 a fast double activation on the one-click button lands EXACTLY ONE pick — the 380 ms guard
 *       window (cakepanz-12 R1)
 *   L19 the staged confirm banner disarms when the pick lands — a second PICK is not possible
 *       (cakepanz-12 S2)
 *   L20 the numeric cells announce their VALUES (accessible name carries the number, never a bare
 *       column name) (cakepanz-12 D2)
 *   L21 the keyboard reaches the gone% METHOD (main → quick → the focusable copy) and it reveals
 *       on focus (cakepanz-12 S3)
 *   L22 a double click on the staged CONFIRM lands exactly one pick, zero page errors — the staged
 *       path is guarded like the one-click path (S13, the optional hardening made law)
 *   L23 the ringed rows' one-click button carries the ported w89 pulse (zpbBtnPulse, 1.5s) and
 *       prefers-reduced-motion turns it off — the w89 :948 guard (S14 §3.5, the glow ported LAST)
 *   L24 the PRIMARY top-three ring is the first three ARRAY POSITIONS of the engine-sorted rows
 *       under EVERY sort — never derived from rendered text or .cp-suggest nodes (S14 §3.4.4, the
 *       scoped no-display-parse law; the tie extension stays INTERIM — display-rounded, awaiting
 *       rawSort, and is NOT asserted here: L13 owns it, paired)
 *   L25 the ring is EXPLAINED (one plain reason per ringed row from the shared VM mapping) and
 *       PERSISTED (the autosave carries suggestIds; a reload shows the SAME three from the stored
 *       data; the next interaction recomputes and re-persists) (S14 §3.6)
 * Run: node --import ./scripts/node-port-register.mjs batteries/board.battery.mjs  (needs
 * `npm run distfile` first + the preview server; CP_PORT picks the port). */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { assertFreshServer } from '../scripts/fresh-server.mjs';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch (e) { throw new Error('playwright is not installed — it is a devDependency: run npm ci (then npx playwright install chromium). Original: ' + e.message); }

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const PORT = process.env.CP_PORT || 4179;
const timeout = 10000;
const results = [];
const ok = (law, pass, detail = '') => { results.push({ law, verdict: pass ? 'PASS' : 'FAIL', detail }); console.log(`   ${pass ? 'PASS' : 'FAIL'}  ${law}${detail ? ' — ' + detail : ''}`); };
// S14 (§4.10): the D-2 stale-server guard, ported to the standalone battery — a zombie preview on
// the port once turned a red run green. A stale or missing served build exits 1, loudly, named.
try { await assertFreshServer(Number(PORT), ROOT); } catch (e) { console.log('FRESH-SERVER FAIL — ' + e.message); process.exit(1); }

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const { sha256Hex, lineupFor } = await import(path.join(ROOT, 'src/lib/port/seam.ts'));
const { rostersOfRecord } = await import(path.join(ROOT, 'src/lib/port/feedVM.ts'));

const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
await page.goto(`http://localhost:${PORT}/?dev=1`);
await page.waitForTimeout(2000);

// the real user flow: Team Select → the board (the same door the shell battery uses)
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click(); await page.waitForTimeout(150);
await page.locator('.cp-ts-go').click(); await page.waitForTimeout(900);
let USER = await page.evaluate(() => window.__cp.store.getState().record?.userTeam ?? -1);
if (USER < 0) throw new Error('no user team on the record after START');

// the VM read helper: the board VM (rows in the ACTIVE order) straight from the app's own store
const vmRead = () => page.evaluate(() => {
  let v; const un = window.__cp.vmStore.subscribe((x) => (v = x)); un();
  return v ? { sort: v.sort, ids: v.rows.map((r) => r.id) } : null;
});
const vmVals = () => page.evaluate(() => {
  let v; const un = window.__cp.vmStore.subscribe((x) => (v = x)); un();
  // INTERIM — display-rounded, awaiting rawSort: this parse reads the DISPLAY strings (the same
  // lossy parse the component's tie extension uses). The oracle and the tie path stay PAIRED
  // until the engine lands rawSort (S14 §3.4.3) — never ship a raw-valued oracle against a
  // display-valued component.
  return v ? v.rows.map((r) => Number(String(r[v.sort]).replace(/[^0-9.\-]/g, '')) || 0) : [];
});
// the suggestion probe: the highlighted rows' ids, from the DOM (data-id rides the row)
const suggestRead = () => page.evaluate(() => [...document.querySelectorAll('.cp-rows .cp-row.cp-suggest')].map((el) => el.getAttribute('data-id')));
// the shared ring-present guard (S14 §4.11): every ring-dependent leg asks ONE locator question —
// a dead ring SKIPs LOUD (the F20 crash class must never crash the battery before L13; no new law
// reintroduces its own unguarded .cp-suggest locator).
const ringPresentGuard = () => page.locator('.cp-rows .cp-row.cp-suggest .cp-quick').count();
// L24 accumulators (declared before every section that fills them — the sweep runs at pick 1,
// the walk checkpoints later; ONE law, L24, owns both halves)
let l24pass = true; const l24walk = [];
const l24sweep = []; let l24sweepOk = true;

// one REAL UI pick: expand the top row → the primary chip → confirm (the autosaving path)
const uiPick = async () => {
  const st = JSON.parse(await page.evaluate(() => JSON.stringify(window.__cp.store.getState())));
  if (st.error) throw new Error('store error before pick: ' + st.error);
  if (!st.draft || st.draft.order[st.draft.pos] !== USER) throw new Error('the user is not on the clock before a pick');
  try {
    await page.locator('.cp-rows .cp-row .cp-main').first().click({ timeout, trial: false }); await page.waitForTimeout(120);
    await page.locator('.cp-rows .cp-row .cp-chip.cp-primary').first().click({ timeout, trial: false }); await page.waitForTimeout(120);
    await page.locator('.cp-confirm .cp-go').click({ timeout, trial: false }); await page.waitForTimeout(260);
  } catch (e) {
    const dump = await page.evaluate(() => ({
      confirm: document.querySelectorAll('.cp-confirm').length,
      confirmTxt: document.querySelector('.cp-confirm')?.textContent?.trim().slice(0, 60) ?? '(none)',
      rows: document.querySelectorAll('.cp-rows .cp-row').length,
      openFits: [...document.querySelectorAll('.cp-rows .cp-row .cp-fits')].filter((el) => !el.hidden).length,
      chips: [...document.querySelectorAll('.cp-rows .cp-row .cp-fits')].filter((el) => !el.hidden).flatMap((el) => el.querySelectorAll('.cp-chip.cp-primary')).length,
      expandedBtns: [...document.querySelectorAll('.cp-rows .cp-row .cp-main')].filter((el) => el.getAttribute('aria-expanded') === 'true').length,
      err: window.__cp.store.getState().error ?? '',
    }));
    await page.screenshot({ path: '/tmp/r9-uipick-timeout.png', fullPage: false }).catch(() => {});
    throw new Error(`uiPick click failed: ${String(e).split('\n')[0]} · DUMP ${JSON.stringify(dump)}`);
  }
  const st2 = JSON.parse(await page.evaluate(() => JSON.stringify(window.__cp.store.getState())));
  const mine = (st2.record?.picks ?? []).filter((p) => p.team === USER).length;
  const confirmLeft = await page.locator('.cp-confirm').count();
  if (confirmLeft) throw new Error(`uiPick: the confirm paragraph is still up after the click (store error: ${st2.error ?? 'none'}; picks: ${mine}) — the pick was rejected or the click missed`);
  return mine;
};

// ---- L16/L17 — T2 (2026-11-20): ONE click drafts a ringed row; the expand path and undo still work ----
// runs at pick 1 (before the L13 walk; the state is restored by undo afterwards)
{
  const ringBefore = await suggestRead();
  const vmBefore = await vmRead();
  const stateOf = () => page.evaluate(() => { const s = window.__cp.store.getState(); return { userPicks: s.record ? s.record.picks.filter((p) => p.team === s.record.userTeam).length : -1, total: s.record ? s.record.picks.length : -1, err: s.error ?? '' }; });
  // L16a: the quick button exists on EXACTLY the ringed rows, and names the slot
  const quick = await page.evaluate(() => [...document.querySelectorAll('.cp-rows .cp-row')].map((el) => ({
    id: el.getAttribute('data-id'), suggest: el.classList.contains('cp-suggest'),
    quick: el.querySelector('.cp-quick')?.textContent?.trim() ?? null,
  })));
  const ringed = quick.filter((q) => q.suggest);
  const ringPresent = ringBefore.length >= 3;   // cakepanz-12 (F20 hardening): the ring EXISTS — an empty every() was a vacuous pass
  const quickOnRingedOnly = ringed.every((q) => q.quick) && quick.filter((q) => q.quick).length === ringed.length && ringed.length === ringBefore.length;
  const named = ringed.every((q) => /^Draft .+ at .+/.test(q.quick ?? ''));
  ok('L16 the ring is PRESENT (3+ rows, C\'1\'s minimum) and the ringed rows carry a ONE-CLICK draft button that names the player AND the slot — and only the ringed rows carry it (T2)',
    ringPresent && quickOnRingedOnly && named, `ringBefore=${ringBefore.length} ringed=${ringed.length} quick=${quick.filter((q) => q.quick).length} named=${named} e.g. "${ringed[0]?.quick ?? '(none)'}"`);
  // L16b: clicking it lands EXACTLY one pick, straight through (no confirm banner), the CPU picks on
  // cakepanz-12 (F20 hardening): a DEAD ring must FAIL this law and skip the walk, never crash the
  // battery (a crash before L13 made the mutant unclassifiable — the false TAUTOLOGY of 2026-11-20)
  const st0 = await stateOf();
  const quickBtn = page.locator('.cp-rows .cp-row.cp-suggest .cp-quick').first();
  const quickUp = await ringPresentGuard();
  if (!quickUp) {
    ok('L16 one click on a ringed row lands EXACTLY one user pick — no expand, no confirm banner — and the CPU picks on (T2)', false, 'the one-click button NEVER APPEARED — the ring is dead; the walk is skipped so the later laws still evaluate');
    ok('L17 undo reverses the one-click pick: zero user picks, the board order and the ring return (T2)', false, 'skipped — the one-click path is dead (the ring died first)');
    ok('L17 a non-ringed row still expands into the flex chip path (the expand path is kept, T2)', false, 'skipped — the one-click path is dead (the ring died first)');
    ok('L17 keyboard-only: Tab reaches the one-click button with a visible focus ring and Enter drafts with it (T2)', false, 'skipped — the one-click path is dead (the ring died first)');
  } else {
  await quickBtn.click({ timeout });
  await page.waitForTimeout(700);
  const confirmSeen = await page.locator('.cp-confirm').count();
  const st1 = await stateOf();
  ok('L16 one click on a ringed row lands EXACTLY one user pick — no expand, no confirm banner — and the CPU picks on (T2)',
    st0.userPicks === 0 && st1.userPicks === 1 && confirmSeen === 0 && st1.total > st0.total && !st1.err,
    `userPicks ${st0.userPicks}→${st1.userPicks} total ${st0.total}→${st1.total} confirmBanner=${confirmSeen} err="${st1.err}"`);
  // L17a: undo reverses it — the board order and the ring come back
  await page.locator('.cp-undo').click({ timeout });
  await page.waitForTimeout(700);
  const st2 = await stateOf();
  const ringAfter = await suggestRead();
  const vmAfter = await vmRead();
  ok('L17 undo reverses the one-click pick: zero user picks, the board order and the ring return (T2)',
    st2.userPicks === 0 && ringAfter.join(',') === ringBefore.join(',') && vmAfter.ids.join(',') === vmBefore.ids.join(','),
    `userPicks=${st2.userPicks} ringRestored=${ringAfter.join(',') === ringBefore.join(',')} orderRestored=${vmAfter.ids.join(',') === vmBefore.ids.join(',')}`);
  // L17b: a NON-ringed row still expands into its flex path
  const nonRinged = quick.find((q) => !q.suggest);
  await page.locator(`.cp-rows .cp-row[data-id="${nonRinged.id}"] .cp-main`).click({ timeout });
  await page.waitForTimeout(250);
  const expanded = await page.evaluate((id) => {
    const row = document.querySelector(`.cp-rows .cp-row[data-id="${id}"]`);
    return { open: row?.querySelector('.cp-main')?.getAttribute('aria-expanded'), fits: row?.querySelector('.cp-fits')?.hidden === false, chips: row?.querySelectorAll('.cp-chip').length ?? 0 };
  }, nonRinged.id);
  await page.locator(`.cp-rows .cp-row[data-id="${nonRinged.id}"] .cp-main`).click({ timeout });
  await page.waitForTimeout(150);
  ok('L17 a non-ringed row still expands into the flex chip path (the expand path is kept, T2)',
    expanded.open === 'true' && expanded.fits && expanded.chips > 0, `aria-expanded=${expanded.open} fitsOpen=${expanded.fits} chips=${expanded.chips}`);
  // L17c: keyboard-only — Tab reaches the quick button with a VISIBLE focus, Enter drafts, undo restores
  await page.locator('.cp-rows .cp-row.cp-suggest .cp-main').first().focus();
  await page.keyboard.press('Tab');   // .cp-main → .cp-quick (the row top's DOM order)
  const kb = await page.evaluate(() => {
    const el = document.activeElement;
    return { cls: el?.className ?? '', outline: el ? getComputedStyle(el).outlineStyle : 'none', width: el ? getComputedStyle(el).outlineWidth : '0' };
  });
  const onQuick = kb.cls.includes('cp-quick');
  const visibleFocus = kb.outline !== 'none' && kb.width !== '0px';
  if (onQuick) { await page.keyboard.press('Enter'); await page.waitForTimeout(700); }
  const st3 = await stateOf();
  ok('L17 keyboard-only: Tab reaches the one-click button with a visible focus ring and Enter drafts with it (T2)',
    onQuick && visibleFocus && st3.userPicks === 1 && !st3.err,
    `focusedClass="${kb.cls}" outline=${kb.outline}/${kb.width} userPicksAfterEnter=${st3.userPicks}`);
  await page.locator('.cp-undo').click({ timeout });   // restore pick 1 for the L13 walk
  await page.waitForTimeout(700);
  }   // cakepanz-12: end the ring-dependent walk (the else leg above)
}

// ---- L24 (S14 §3.4.4) — the scoped no-display-parse law, the SORT SWEEP half (pick 1) ----
// The primary top three must be the first three ARRAY POSITIONS of the engine-sorted rows under
// EVERY sort — never a re-derivation from rendered text or DOM. (The walk checkpoints below add
// the same assertion at picks 1/13/27 on the default sort; ONE law, L24, owns both halves.)
{
  for (const label of ['Wins', 'Priority', 'OVR']) {
    await page.locator('.cp-sort', { hasText: label }).click();
    await page.waitForTimeout(400);
    const vm24 = await vmRead();
    const got24 = await suggestRead();
    const baseOk = got24.length >= 3 && got24.slice(0, 3).join(',') === vm24.ids.slice(0, 3).join(',');
    l24sweep.push(`${label}:${baseOk ? 'array-exact' : 'WRONG (got ' + got24.slice(0, 3).join(',') + ' want ' + vm24.ids.slice(0, 3).join(',') + ')'}`);
    if (!baseOk) l24sweepOk = false;
  }
  await page.locator('.cp-sort', { hasText: 'Wins' }).click();   // back to the default sort — the walk continues on wins
  await page.waitForTimeout(400);
}

// ---- L18–L21 — cakepanz-12 (T7 R1/S2 + T6 D2/S3): the one-click path is SAFE and the cells SPEAK ----
{
  const stateOf2 = () => page.evaluate(() => { const s = window.__cp.store.getState(); return { userPicks: s.record ? s.record.picks.filter((p) => p.team === s.record.userTeam).length : -1, err: s.error ?? '' }; });
  // the ring-dependent legs (L18/L19/L22) need a RINGED ROW to interact with — on the F20 mutant
  // (suggest={false}) the ring is dead, and an unguarded locator click would CRASH the battery
  // before L13 evaluates (the exact false-tautology class the c12 hardening closed for L16/L17;
  // the S13 sitting extends the same guard to the staged-path legs). The guard FAILS LOUD and
  // skips so the later laws (L13/L8/L14/…) still evaluate — never a green, never a crash.
  const ringUp = await ringPresentGuard();
  if (!ringUp) {
    ok('L18 a fast double activation on the one-click button (two clicks in one task — the double-click / Enter auto-repeat class) lands EXACTLY ONE pick — the guard window keeps one interaction one pick (R1)', false, 'skipped loud — the ring is dead (the F20 mutant class); the law needs a ringed row');
    ok('L19 the staged confirm banner is GONE after the pick lands — a second PICK is not possible (S2)', false, 'skipped loud — the ring is dead; the staged path needs a ringed row');
    ok('L22 a fast double click on the staged CONFIRM (two clicks in one task) lands EXACTLY ONE pick, the banner disarms, zero page errors — the staged path is guarded like the one-click path (S13)', false, 'skipped loud — the ring is dead; the staged path needs a ringed row');
  } else {
  // L18: two activations in ONE task (the double-click / Enter auto-repeat class — both land before
  // the first re-render settles) draft EXACTLY ONE player: the 380 ms guard window (R1)
  const stA = await stateOf2();
  const dbl = await page.evaluate(() => {
    const btn = document.querySelector('.cp-rows .cp-row.cp-suggest .cp-quick');
    if (!btn) return false;
    btn.click(); btn.click();
    return true;
  });
  await page.waitForTimeout(900);
  const stB = await stateOf2();
  ok('L18 a fast double activation on the one-click button (two clicks in one task — the double-click / Enter auto-repeat class) lands EXACTLY ONE pick — the guard window keeps one interaction one pick (R1)',
    dbl && stA.userPicks === 0 && stB.userPicks === 1 && !stB.err, `userPicks ${stA.userPicks}→${stB.userPicks} err="${stB.err}"`);
  await page.locator('.cp-undo').click({ timeout }); await page.waitForTimeout(700);
  // L19: stage a pick through the chip path (the confirm banner arms), then one-click a DIFFERENT
  // ringed row — the banner must DISARM when the pick lands: a second PICK is not possible (S2)
  await page.locator('.cp-rows .cp-row.cp-suggest .cp-main').first().click({ timeout }); await page.waitForTimeout(200);
  await page.locator('.cp-rows .cp-row.cp-suggest .cp-chip.cp-primary').first().click({ timeout }); await page.waitForTimeout(200);
  const staged = await page.locator('.cp-confirm').count();
  const stC = await stateOf2();
  await page.locator('.cp-rows .cp-row.cp-suggest .cp-quick').nth(1).click({ timeout }); await page.waitForTimeout(900);
  const bannerAfter = await page.locator('.cp-confirm').count();
  const stD = await stateOf2();
  ok('L19 the staged confirm banner is GONE after the pick lands — a second PICK is not possible (S2)',
    staged === 1 && bannerAfter === 0 && stC.userPicks === 0 && stD.userPicks === 1 && !stD.err,
    `staged=${staged} bannerAfterPick=${bannerAfter} userPicks ${stC.userPicks}→${stD.userPicks} err="${stD.err}"`);
  await page.locator('.cp-undo').click({ timeout }); await page.waitForTimeout(700);
  await page.locator('.cp-rows .cp-row.cp-suggest .cp-main').first().click({ timeout }); await page.waitForTimeout(200);   // collapse the expanded row — the L13 walk starts clean
  // L22 (S13, the optional hardening made law): the STAGED Confirm gets the guard — a fast double
  // click on "Confirm the pick" lands EXACTLY ONE pick, the banner disarms, and no page error
  // fires (before the fix a second click dereferenced the disarmed banner and threw).
  await page.locator('.cp-rows .cp-row.cp-suggest .cp-main').first().click({ timeout }); await page.waitForTimeout(250);
  // idempotent open: the collapse dance above can leave the first ringed row either state — read
  // aria-expanded and only re-click when closed (a blind second click would close it again).
  if ((await page.locator('.cp-rows .cp-row.cp-suggest .cp-main').first().getAttribute('aria-expanded')) !== 'true') {
    await page.locator('.cp-rows .cp-row.cp-suggest .cp-main').first().click({ timeout }); await page.waitForTimeout(250);
  }
  await page.locator('.cp-rows .cp-row.cp-suggest .cp-chip.cp-primary').first().click({ timeout }); await page.waitForTimeout(200);
  const staged22 = await page.locator('.cp-confirm').count();
  const stE = await stateOf2();
  const dbl22 = await page.evaluate(() => {
    const btn = document.querySelector('.cp-confirm .cp-go');
    if (!btn) return false;
    btn.click(); btn.click();
    return true;
  });
  await page.waitForTimeout(900);
  const banner22 = await page.locator('.cp-confirm').count();
  const stF = await stateOf2();
  ok('L22 a fast double click on the staged CONFIRM (two clicks in one task) lands EXACTLY ONE pick, the banner disarms, zero page errors — the staged path is guarded like the one-click path (S13)',
    staged22 === 1 && dbl22 && stE.userPicks === 0 && stF.userPicks === 1 && banner22 === 0 && !stF.err,
    `staged=${staged22} dbl=${dbl22} userPicks ${stE.userPicks}→${stF.userPicks} bannerAfter=${banner22} err="${stF.err}"`);
  await page.locator('.cp-undo').click({ timeout }); await page.waitForTimeout(700);
  await page.locator('.cp-rows .cp-row.cp-suggest .cp-main').first().click({ timeout }); await page.waitForTimeout(200);   // collapse the expanded row — the L13 walk starts clean
  }   // end the ring-dependent staged legs (the else leg above) — L20/L21 below are ring-independent
  // L20: the value cells ANNOUNCE their values (D2) — the accessible name contains the number,
  // never a bare column name
  const cells = await page.evaluate(() => {
    const row = document.querySelector('.cp-rows .cp-row');
    const get = (sel) => { const el = row?.querySelector(sel); return el ? { text: el.textContent.trim(), label: el.getAttribute('aria-label') ?? '' } : null; };
    return { ovr: get('.cp-ovr'), wins: get('.cp-num[aria-label$=" wins"]'), prio: get('.cp-num[aria-label$=" priority"]'), gone: get('.cp-gone') };
  });
  const valOk = !!cells.ovr && cells.ovr.label.includes(cells.ovr.text) && !/^OVR$/.test(cells.ovr.label)
    && !!cells.wins && cells.wins.label.includes(cells.wins.text)
    && !!cells.prio && cells.prio.label.includes(cells.prio.text)
    && !!cells.gone && cells.gone.label.includes(cells.gone.text) && !/^GONE%$/.test(cells.gone.label);
  ok('L20 the numeric cells announce their VALUES to the screen reader — the accessible name contains the number, never a bare column name (D2)',
    valOk, `ovr="${cells.ovr?.label}" wins="${cells.wins?.label}" prio="${cells.prio?.label}" gone="${cells.gone?.label}"`);
  // L21: the keyboard reaches the gone% METHOD — Tab walks main → quick → the focusable copy,
  // which REVEALS on focus (S3). The focus row is the first row, ring or no ring (F20 hardening:
  // the law evaluates on the mutant too — the Tab order is what it asserts).
  await page.locator('.cp-rows .cp-row .cp-main').first().focus();
  await page.keyboard.press('Tab'); await page.waitForTimeout(120);
  const firstStop = await page.evaluate(() => document.activeElement?.className ?? '');
  await page.keyboard.press('Tab'); await page.waitForTimeout(120);
  const kb2 = await page.evaluate(() => {
    const el = document.activeElement;
    return { cls: el?.className ?? '', id: el?.id ?? '', visible: el ? el.offsetParent !== null : false,
             pos: el ? getComputedStyle(el).position : '', outlined: el ? getComputedStyle(el).outlineStyle !== 'none' : false };
  });
  const methodReached = kb2.cls.includes('cp-sr') && kb2.id.startsWith('cp-gone-desc-') && kb2.visible && kb2.pos === 'static';
  ok('L21 the gone% METHOD is keyboard-reachable: the Tab order main → quick → the focusable method copy holds, and the copy reveals on focus (S3)',
    firstStop.includes('cp-quick') && methodReached, `firstStop="${firstStop.slice(0, 24)}" method="${kb2.id}" visible=${kb2.visible} position=${kb2.pos} outlined=${kb2.outlined}`);
}

// ---- L13 — the top THREE available draft controls are highlighted by the ACTIVE order ----
// sampled early/mid/late on the walk; more than three only on an order tie (the code comment's rule).
// INTERIM — display-rounded, awaiting rawSort: this law's oracle derives its expectation from the
// SAME lossy display parse the component's tie extension uses (vmVals above) — the oracle and the
// tie path stay PAIRED until the engine lands rawSort (S14 §3.4.3); the corrected raw-valued pair
// is filed as a §5 proposal (BLOCKED (engine half)).
let l13pass = true; const l13detail = [];
const l13Checkpoint = async (label) => {
  const vm = await vmRead();
  const vals = await vmVals();
  const got = await suggestRead();
  const third = vals[2];
  const expected = vm.ids.slice(0, 3);
  for (let i = 3; i < vm.ids.length && vals[i] === third; i++) expected.push(vm.ids[i]);
  const exact = expected.length === got.length && expected.every((id, i) => got[i] === id);
  l13detail.push(`${label}: ${got.length} highlighted (expected ${expected.length}, ids ${exact ? 'exact' : 'WRONG'})`);
  if (!(got.length >= 3 && exact)) l13pass = false;
  // L24 (S14 §3.4.4): the PRIMARY top three are the first three ARRAY POSITIONS — the pre-sorted
  // row order — never a re-derivation from rendered text or DOM. The tie extension (got[3+]) is
  // INTERIM — display-rounded, awaiting rawSort — and is NOT asserted here (L13 owns it, paired).
  const base3 = got.slice(0, 3).join(',') === vm.ids.slice(0, 3).join(',');
  l24walk.push(`${label}:${base3 ? 'array-exact' : 'WRONG (got ' + got.slice(0, 3).join(',') + ' want ' + vm.ids.slice(0, 3).join(',') + ')'}`);
  if (!base3) l24pass = false;
};
{
  await l13Checkpoint('pick 1 (early)');
  for (let i = 0; i < 12; i++) await uiPick();
  await l13Checkpoint('pick 13 (mid)');
  for (let i = 0; i < 14; i++) await uiPick();
  await l13Checkpoint('pick 27 (late)');
  ok('L13 the top THREE available draft controls are highlighted by the board\'s active order — sampled early/mid/late; ids exact against the VM — INTERIM — display-rounded, awaiting rawSort (the oracle and the tie path stay PAIRED until rawSort lands, S14 §3.4.3); more than three only on an order tie (cakepanz-9 C′1)',
    l13pass, l13detail.join(' · ') + ` · pageErrors=${errs.length}`);
  // L24 (S14 §3.4.4): the scoped no-display-parse law — ONE law, two halves: the sort sweep at
  // pick 1 (every sort) + the base-three assertion at every checkpoint of the walk.
  ok('L24 the PRIMARY top-three ring is the first three ARRAY POSITIONS of the engine-sorted rows — under every sort at pick 1 and at every checkpoint of the walk — never derived from rendered text or .cp-suggest nodes (the scoped no-display-parse law; the tie extension stays INTERIM — display-rounded, awaiting rawSort)',
    l24sweepOk && l24pass, [...l24sweep, ...l24walk].join(' · '));
}

// ---- L23 (S14 §3.5): the ported w89 glow — the ringed rows' one-click button breathes ----
// w89.html:12849/:12853 ported verbatim in structure onto .cp-quick (the ringed rows' one-click
// Draft button), with the reduced-motion guard w89's :948 gives .zpb-sglow (the pulse needs the
// same guard). The zpbstarglow treatment is NOT ported (it marks a ≥90 OVR star — a surface the
// draft board does not have; porting it would invent one).
{
  const ringUp23 = await ringPresentGuard();
  if (!ringUp23) {
    ok('L23 the ringed rows\' one-click button carries the ported w89 pulse (zpbBtnPulse, 1.5s infinite) and prefers-reduced-motion turns it off (the w89 :948 guard) (S14 §3.5)', false, 'skipped loud — the ring is dead; the glow law needs a ringed row');
  } else {
    const glow = await page.evaluate(() => { const el = document.querySelector('.cp-rows .cp-row.cp-suggest .cp-quick'); if (!el) return null; const cs = getComputedStyle(el); return { name: cs.animationName, dur: cs.animationDuration }; });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(150);
    const reduced23 = await page.evaluate(() => { const el = document.querySelector('.cp-rows .cp-row.cp-suggest .cp-quick'); return el ? getComputedStyle(el).animationName : 'missing'; });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForTimeout(150);
    ok('L23 the ringed rows\' one-click button carries the ported w89 pulse (zpbBtnPulse, 1.5s infinite) and prefers-reduced-motion turns it off (the w89 :948 guard) (S14 §3.5)',
      !!glow && glow.name === 'zpbBtnPulse' && glow.dur === '1.5s' && reduced23 === 'none',
      `animation=${glow ? glow.name + '/' + glow.dur : 'MISSING'} reduced=${reduced23}`);
  }
}

// ---- L25 (S14 §3.6): the ring is EXPLAINED and PERSISTED (own context — the walk continues untouched) ----
{
  const { whyFor } = await import(path.join(ROOT, 'src/lib/port/suggestWhy.ts'));
  const ctx25 = await browser.newContext({ viewport: { width: 1180, height: 900 } });
  const p25 = await ctx25.newPage();
  const errs25 = [];
  p25.on('pageerror', (e) => errs25.push(String(e)));
  await p25.goto(`http://localhost:${PORT}/?dev=1`);
  await p25.waitForTimeout(2000);
  await p25.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
  await p25.waitForTimeout(150);
  await p25.locator('.cp-ts-go').click();
  await p25.waitForTimeout(1100);
  const readRing = (pg) => pg.evaluate(() => [...document.querySelectorAll('.cp-rows .cp-row.cp-suggest')].map((el) => el.getAttribute('data-id')));
  const readWhy = (pg) => pg.evaluate(() => [...document.querySelectorAll('.cp-rows .cp-row.cp-suggest .cp-why')].map((el) => el.textContent?.trim() ?? ''));
  const readSaved = (pg) => pg.evaluate(() => { try { const e = JSON.parse(localStorage.getItem('sim:nfl:autosave:draft') ?? 'null'); return e?.payload?.suggestIds ?? null; } catch { return null; } });   // core/keys.ts sportKey('nfl','autosave:draft')
  // (a) EXPLAIN: every ringed row carries the reason line, matching the shared VM mapping
  const ring0 = await readRing(p25);
  const whys0 = await readWhy(p25);
  const vm25 = await p25.evaluate(() => { let v; const un = window.__cp.vmStore.subscribe((x) => (v = x)); un(); return v ? { rows: v.rows.map((r) => ({ id: r.id, slotId: r.slotId, slotLabel: r.slotLabel })) } : null; });
  const expectedWhy = ring0.map((id, i) => { const row = vm25?.rows.find((r) => r.id === id); return row ? whyFor(row, i, []) : null; });
  const whyOk = ring0.length >= 3 && ring0.length === whys0.length && expectedWhy.every((w, i) => w !== null && whys0[i] === w);
  // (b) PERSIST: after one pick the autosave carries suggestIds === the live ring
  await p25.locator('.cp-rows .cp-row.cp-suggest .cp-quick').first().click();
  await p25.waitForTimeout(900);
  const ring1 = await readRing(p25);
  const savedIds1 = await readSaved(p25);
  const persistOk = Array.isArray(savedIds1) && savedIds1.length > 0 && savedIds1.join(',') === ring1.join(',');
  // (c) RESTORE: a reload shows the SAME three — the stored data, auditable against the display
  await p25.reload();
  await p25.waitForTimeout(3200);
  const ring2 = await readRing(p25);
  const screen2 = await p25.evaluate(() => document.querySelector('main.cp-root')?.getAttribute('data-screen'));
  const savedIds2 = await readSaved(p25);
  const restoreOk = screen2 === 'board' && Array.isArray(savedIds2) && savedIds2.length > 0 && ring2.join(',') === savedIds2.join(',');
  // (d) RECOMPUTE: the next interaction recomputes and re-persists (the stored view moves on)
  let recomputeOk = false; let recomputeDetail = 'skipped';
  const q25 = await p25.locator('.cp-rows .cp-row.cp-suggest .cp-quick').count();
  if (q25 > 0) {
    await p25.locator('.cp-rows .cp-row.cp-suggest .cp-quick').first().click();
    await p25.waitForTimeout(900);
    const ring3 = await readRing(p25);
    const savedIds3 = await readSaved(p25);
    recomputeOk = Array.isArray(savedIds3) && ring3.join(',') === savedIds3.join(',') && savedIds3.join(',') !== savedIds2.join(',');
    recomputeDetail = `after interaction: ring=${ring3.length} rows, saved===ring=${savedIds3 && savedIds3.join(',') === ring3.join(',')} moved=${savedIds3 && savedIds2 && savedIds3.join(',') !== savedIds2.join(',')}`;
  }
  ok('L25 the ring is EXPLAINED (one plain reason per ringed row, from the shared VM mapping — never parsed text) and PERSISTED (the autosave carries suggestIds; a reload shows the SAME three from the stored data; the next interaction recomputes and re-persists) (S14 §3.6)',
    whyOk && persistOk && restoreOk && recomputeOk && errs25.length === 0,
    `why ${whys0.length}/${ring0.length} matched=${whyOk} · persisted=${persistOk} · restored screen=${screen2} ring===stored=${restoreOk} · ${recomputeDetail} errs=${errs25.length}`);
  await p25.close();
  await ctx25.close();
}

// ---- L8 — the completing pick lands on Complete (through the REAL UI, to the user's 32nd) ----
let l8pass = false; let l8detail = '';
{
  for (let i = 27; i <= 32; i++) {
    const st = JSON.parse(await page.evaluate(() => JSON.stringify(window.__cp.store.getState())));
    if (st.status === 'done') break;
    const mine = await uiPick();
    if (mine !== i) throw new Error(`L8 walk: UI pick ${i} did not land (user picks = ${mine})`);
  }
  await page.waitForTimeout(600);
  const end = await page.evaluate(() => ({
    screen: document.querySelector('main.cp-root')?.getAttribute('data-screen'),
    status: window.__cp.store.getState().status,
    doneVisible: !!document.querySelector('.cp-done'),
    doneText: document.querySelector('.cp-done-h1')?.textContent ?? '',
    errText: document.querySelector('.cp-error')?.textContent ?? '',
    storeErr: window.__cp.store.getState().error ?? '',
  }));
  l8pass = end.screen === 'complete' && end.status === 'done' && end.doneVisible && /Your draft is complete/.test(end.doneText) && !/it is not your pick/.test(end.errText) && !/not your pick/.test(end.storeErr);
  // the hash door (4.4): a hand-edited #/board on a done draft converges on Complete
  await page.evaluate(() => { location.hash = '#/board'; window.dispatchEvent(new Event('hashchange')); });
  await page.waitForTimeout(700);
  const afterHash = await page.evaluate(() => ({ screen: document.querySelector('main.cp-root')?.getAttribute('data-screen'), hash: location.hash, doneVisible: !!document.querySelector('.cp-done') }));
  l8pass = l8pass && afterHash.screen === 'complete' && /complete/.test(afterHash.hash) && afterHash.doneVisible;
  l8detail = `screen=${end.screen} status=${end.status} record=${end.doneVisible} h1="${end.doneText.trim().slice(0, 40)}" · hash door: #/board → ${afterHash.screen}`;
  ok('L8 the last pick lands on Complete: the user\'s 32nd pick, taken through the real UI, hands the screen to Complete — the record renders and "it is not your pick" never appears (re-quoted from the 8.1 late battery; the law survives the flip)',
    l8pass, l8detail);
}

// ---- L14 — Complete prints the roster the engine would field ----
let l14pass = false; let l14detail = '';
{
  const record = JSON.parse(await page.evaluate(() => JSON.stringify(window.__cp.store.getState().record)));
  const mine = rostersOfRecord(record)[record.userTeam] ?? [];
  const best = lineupFor(mine, '4-3');
  const placements = best.placements ?? [];
  const expectRows = placements.map((pl) => ({ label: pl.slot?.label ?? pl.slot?.slot ?? '?', name: pl.player?.name ?? '(empty)', ovr: pl.player ? String(pl.effOvr ?? pl.player.ovr) : '-' }));
  const fielded = expectRows.filter((r) => r.name !== '(empty)' && r.ovr !== '-');
  const weakestNames = fielded.slice().sort((a, b) => Number(a.ovr) - Number(b.ovr)).slice(0, 3).map((r) => r.name);
  const domRows = await page.evaluate(() => [...document.querySelectorAll('.cp-done .cp-rosterline .cp-adv li')].map((li) => ({
    label: (li.querySelector('.cp-sl')?.textContent ?? '').trim(),
    name: (li.querySelector('.cp-sn')?.textContent ?? '').trim(),
    ovr: (li.querySelector('b')?.textContent ?? '').trim(),
    weak: li.classList.contains('cp-weak'),
  })));
  const [shaA, shaB] = await Promise.all([
    sha256Hex(JSON.stringify(expectRows.map((r) => [r.label, r.name, String(r.ovr)]))),
    sha256Hex(JSON.stringify(domRows.map((r) => [r.label, r.name, String(r.ovr)]))),
  ]);
  let firstDiff = 'none';
  for (let i = 0; i < Math.max(domRows.length, expectRows.length); i++) {
    const a = expectRows[i] ? [expectRows[i].label, expectRows[i].name, String(expectRows[i].ovr)] : '(missing)';
    const b = domRows[i] ? [domRows[i].label, domRows[i].name, String(domRows[i].ovr)] : '(missing)';
    if (JSON.stringify(a) !== JSON.stringify(b)) { firstDiff = `@${i}: vm=${JSON.stringify(a)} dom=${JSON.stringify(b)}`; break; }
  }
  const weakDom = domRows.filter((r) => r.weak).map((r) => r.name).sort();
  const weakExp = [...weakestNames].sort();
  const dataLineup = await page.evaluate(() => document.querySelector('.cp-done .cp-rosterline')?.getAttribute('data-lineup') ?? null);
  l14pass = domRows.length === expectRows.length && shaA === shaB && fielded.length >= 11 && JSON.stringify(weakDom) === JSON.stringify(weakExp) && dataLineup === 'complete';
  l14detail = `rows dom=${domRows.length} vm=${expectRows.length} sha ${shaA === shaB ? 'match' : 'MISMATCH ' + firstDiff} fielded=${fielded.length} weakest dom=[${weakDom.join(',')}] vm=[${weakExp.join(',')}] dataLineup=${dataLineup}`;
  ok('L14 Complete prints the roster the engine would field: the lineup rows equal lineupFor on the record (sha-exact labels/names/effOvr), the three weakest are marked, the 11-fielded state is the attribute (cakepanz-9 C′2)',
    l14pass, l14detail);
}

// ---- L15 — the wall-slip reveal: the cascade runs on entering Complete ----
let l15pass = false; let l15detail = '';
{
  const anim = await page.evaluate(() => {
    const pick = (sel) => { const el = document.querySelector(sel); if (!el) return null; const cs = getComputedStyle(el); return { name: cs.animationName, delay: parseFloat(cs.animationDelay || '0'), dur: parseFloat(cs.animationDuration || '0') }; };
    return { h1: pick('.cp-done-h1'), sub: pick('.cp-done-sub'), chips: pick('.cp-chipline') };
  });
  const staggered = !!(anim.h1 && anim.sub && anim.chips && anim.h1.name !== 'none'
    && anim.h1.delay < anim.sub.delay && anim.sub.delay < anim.chips.delay);
  const total = anim.chips ? anim.chips.delay + anim.chips.dur : 99;
  // the reduced-motion half: the same entry is INSTANT under prefers-reduced-motion (the CSS
  // @media rule applies live; the body.cp-reduced class rides the explicit setting)
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => { location.hash = '#/board'; window.dispatchEvent(new Event('hashchange')); });
  await page.waitForTimeout(300);
  await page.evaluate(() => { location.hash = '#/complete'; window.dispatchEvent(new Event('hashchange')); });
  await page.waitForTimeout(400);
  const reduced = await page.evaluate(() => {
    const el = document.querySelector('.cp-done-h1') ?? document.querySelector('.cp-done-sub');
    return { name: el ? getComputedStyle(el).animationName : 'missing', cls: document.body.classList.contains('cp-reduced') };
  });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const instant = reduced.name === 'none';
  l15pass = staggered && total <= 2 && instant;
  l15detail = `cascade h1=${anim.h1?.name}/${anim.h1?.delay}s sub=${anim.sub?.delay}s buttons=${anim.chips?.delay}s total=${total.toFixed(2)}s · reduced: animation=${reduced.name} bodyClass=${reduced.cls} pageErrors=${errs.length}`;
  ok('L15 the wall-slip reveal: entering Complete cascades (title → the stats hint → the buttons), ≤2 s total, and reduced motion renders it instant — CSS only, zero strings (cakepanz-9 C′3)',
    l15pass, l15detail);
}

// ---- L10 — a NEW draft after a finished draft lands on the BOARD ----
let l10pass = false; let l10detail = '';
{
  await page.locator('.cp-navbtn', { hasText: 'TEAM' }).click(); await page.waitForTimeout(400);
  await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click(); await page.waitForTimeout(150);
  await page.locator('.cp-ts-go').click(); await page.waitForTimeout(900);
  USER = await page.evaluate(() => window.__cp.store.getState().record?.userTeam ?? -1);
  const end = await page.evaluate(() => {
    const s = window.__cp.store.getState();
    return {
      screen: document.querySelector('main.cp-root')?.getAttribute('data-screen'),
      status: s.status,
      mine: (s.record?.picks ?? []).filter((p) => p.team === s.record?.userTeam).length,
      total: (s.record?.picks ?? []).length,
      boardVisible: !!document.querySelector('.cp-board'),
      h1: document.querySelector('.cp-done-h1')?.textContent ?? '(none)',
      err: document.querySelector('.cp-error')?.textContent ?? '',
    };
  });
  // "zero picks" = zero picks by the USER: the fresh record holds only the CPU's own picks up to the
  // user's first turn (the standard order runs ahead of the user's slot — Chicago picks 20th), and
  // the finished draft's 1,024-pick record is gone (the C1 defect's lying state must not survive).
  l10pass = end.screen === 'board' && end.status === 'drafting' && end.mine === 0 && end.total < 1024 && end.boardVisible && end.h1 === '(none)' && !end.err;
  l10detail = `after TEAM → same team → DRAFT: screen=${end.screen} status=${end.status} userPicks=${end.mine} (total on the clock=${end.total}, the standard order runs ahead of the user's slot) board=${end.boardVisible} staleH1="${end.h1}" pageErrors=${errs.length}`;
  ok('L10 a NEW draft after a finished draft lands on the BOARD: Team Select → DRAFT → data-screen="board", status="drafting", zero user picks, no stale Complete headline, zero page errors (the C1 law, cakepanz-9 B1)',
    l10pass, l10detail);
}

// ---- L11 — the Complete screen does not lie in partial state ----
let l11pass = false; let l11detail = '';
{
  await page.evaluate(() => { location.hash = '#/complete'; window.dispatchEvent(new Event('hashchange')); });
  await page.waitForTimeout(500);
  const partial = await page.evaluate(() => ({
    state: document.querySelector('.cp-done')?.getAttribute('data-state'),
    h1: document.querySelector('.cp-done-h1')?.textContent ?? '(none)',
    sub: document.querySelector('.cp-done-sub')?.textContent ?? '',
    ctaDisabled: (document.querySelector('.cp-done .cp-cta'))?.disabled ?? null,
    ctaTip: (document.querySelector('.cp-done .cp-cta'))?.getAttribute('title') ?? '',
    screen: document.querySelector('main.cp-root')?.getAttribute('data-screen'),
  }));
  const partialOk = partial.state === 'partial' && partial.h1 === '(none)' && /The draft has \d+ of 1,024 picks in/.test(partial.sub) && partial.ctaDisabled === true && /the season needs a finished draft/.test(partial.ctaTip) && partial.screen === 'complete';
  // the Back path: the hash door returns to the live board (the draft is still going)
  await page.evaluate(() => { location.hash = '#/board'; window.dispatchEvent(new Event('hashchange')); });
  await page.waitForTimeout(500);
  const back = await page.evaluate(() => ({ screen: document.querySelector('main.cp-root')?.getAttribute('data-screen'), board: !!document.querySelector('.cp-board') }));
  l11pass = partialOk && back.screen === 'board' && back.board;
  l11detail = `partial: state=${partial.state} h1=${partial.h1} sub="${partial.sub.trim().slice(0, 44)}" ctaDisabled=${partial.ctaDisabled} · back: ${back.screen} board=${back.board} pageErrors=${errs.length}`;
  ok('L11 the Complete screen does not lie in partial state: a deep link mid-draft renders the partial copy (no "complete" headline), PLAY THE SEASON is disabled with the finished-draft tip, and the Back path returns to the live board (the C2 law, cakepanz-9 B2)',
    l11pass, l11detail);
}

await page.close();
await browser.close();
const pass = results.filter((r) => r.verdict === 'PASS').length;
const fail = results.filter((r) => r.verdict === 'FAIL').length;
console.log(`\n== BOARD BATTERY (uniform) · ${pass} pass · ${fail} fail ==`);
process.exit(fail ? 1 : 0);
