/* late.battery.mjs — P-337 (cakepanz-8): the LATE-DRAFT SIMPLE BOARD battery. The Owner's words
 * (questionnaire Q6): "We want the user to really enjoy the first ten rounds of the draft and be
 * able to make simple decisions in the second half, not have to do complex math or planning to
 * make a decent roster." The flip is the USER's own 10th pick (not the overall number — a user
 * picking at 1.32 still gets ten deep rounds). Mode is presentation only: it moves no engine
 * number (L4 proves the board VM sha is identical across the flip, the N25 pattern). Full board
 * is reachable in one click at any time and STAYS full for the rest of the draft (L3).
 * cakepanz-8.1 adds the review round's three laws (§6 of the 8.1 order): L7 the row detail is one
 * click away (the presence partner of L2, per DS's absence-law rule), L8 the last pick lands on
 * Complete (driven through the real UI, not store dispatches), L9 the FULL BOARD choice survives
 * a reload (persisted in the settings model, the one port exception of the round).
 * Run: node --import ./scripts/node-port-register.mjs batteries/late.battery.mjs  (needs
 * `npm run distfile` first + the preview server; CP_PORT picks the port). */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch (e) { throw new Error('playwright is not installed — it is a devDependency: run npm ci (then npx playwright install chromium). Original: ' + e.message); }

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const PORT = process.env.CP_PORT || 4179;
const results = [];
const ok = (law, pass, detail = '') => { results.push({ law, verdict: pass ? 'PASS' : 'FAIL', detail }); console.log(`   ${pass ? 'PASS' : 'FAIL'}  ${law}${detail ? ' — ' + detail : ''}`); };

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const { candidates, sha256Hex } = await import(path.join(ROOT, 'src/lib/port/seam.ts'));

const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
await page.goto(`http://localhost:${PORT}/?dev=1`);
await page.waitForTimeout(2000);

// the real user flow: Team Select → the board (the same door the shell battery uses)
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click(); await page.waitForTimeout(150);
await page.locator('.cp-ts-go').click(); await page.waitForTimeout(900);
// the USER is the team the store recorded (Team Select's index — Chicago is TEAMS[20] in this
// ordering; never hardcode it — the record carries the truth)
let USER = await page.evaluate(() => window.__cp.store.getState().record?.userTeam ?? -1);
if (USER < 0) throw new Error('no user team on the record after START');

// nine REAL picks (the store's own PICK action; the CPU teams pick on after each one). The
// candidate is computed for the USER's own roster state, and the user must be on the clock
// before every dispatch (the N25 guard).
const pickUser = async () => {
  const st = JSON.parse(await page.evaluate(() => JSON.stringify(window.__cp.store.getState())));
  if (st.error) throw new Error('store error before pick: ' + st.error);
  if (!st.draft || st.draft.order[st.draft.pos] !== USER) throw new Error('the user is not on the clock before a pick');
  const c = candidates(st.draft, USER)[0];
  await page.evaluate(([pid, slot]) => { window.__cp.store.dispatch({ type: 'PICK', playerId: pid, slot }); window.__cp.refresh && window.__cp.refresh(); }, [c.player.id, c.slot]);
  await page.waitForTimeout(150);
};
for (let i = 0; i < 9; i++) await pickUser();

const form = () => page.evaluate(() => document.querySelector('.cp-board')?.getAttribute('data-form') ?? null);
const vmSha = async () => await page.evaluate(async () => {
  let v; const un = window.__cp.vmStore.subscribe((x) => (v = x)); un();
  return v ? { header: v.header, rows: v.rows.map((r) => [r.id, r.slotId, r.wins, r.priority, r.gone]), footer: v.footer, sort: v.sort } : null;
});

// L1 — the flip, BOTH halves in one law: at the USER's 10th pick the FULL form; at the 11th the
// SIMPLE form carrying the honest one-line switch (asserted from the real UI, not a flag)
let fullHalf;
{
  const f = await form();
  const adv = await page.locator('.cp-adv').count();
  const sorts = await page.locator('.cp-sorts').count();
  const note = await page.locator('.cp-late-note').count();
  fullHalf = f === 'full' && adv === 1 && sorts >= 1 && note === 0;
}
// the 10th pick lands → the 11th decision is the SIMPLE form
await pickUser();
let shaSimple;
let simpleHalfDetail = '';
let simpleHalf;
{
  const f = await form();
  const note = await page.locator('.cp-late-note').count();
  const noteText = note ? (await page.locator('.cp-late-note').textContent()) : '';
  simpleHalf = f === 'simple' && note === 1 && /the board simplified — every number is still one click away/.test(noteText ?? '');
  simpleHalfDetail = `10th: ${fullHalf ? 'full ✓' : 'full ✗'} · 11th: ${simpleHalf ? 'simple ✓' : 'simple ✗'} note="${(noteText ?? '').trim().slice(0, 70)}"`;
  ok('L1 the flip: at the user\'s 10th pick the FULL form (advice + sorts, no switch line); at the 11th the SIMPLE form with the honest switch line (P-337 law 1)',
    fullHalf && simpleHalf, simpleHalfDetail);
}

// L2 — the simple row: exactly one recommendation number + the pick control; no flex chip, no advice panel.
// 4.5(i) extension (cakepanz-8.1): the shown number TRACKS the active sort — sort by Priority through the
// real SORT toggle and assert the row's number is the priority of the VM's first row (with the caption),
// then restore Wins. The number can no longer disagree with the order (the B3 defect).
let sortTracks = false;
let sortDetail = '';
{
  await page.locator('.cp-sorttoggle').click(); await page.waitForTimeout(200);
  await page.locator('.cp-sort', { hasText: 'Priority' }).click(); await page.waitForTimeout(400);
  const shown = await page.evaluate(async () => {
    let v; const un = window.__cp.vmStore.subscribe((x) => (v = x)); un();
    const rec = document.querySelector('.cp-simplerow .cp-rec');
    return { sort: v?.sort, firstPriority: v?.rows?.[0]?.priority, rec: rec?.textContent?.trim(), cap: rec?.getAttribute('aria-label') };
  });
  const priOk = shown.sort === 'priority' && String(shown.rec) === String(shown.firstPriority) && shown.cap === 'PRIO';
  await page.locator('.cp-sort', { hasText: 'Wins' }).click(); await page.waitForTimeout(400);
  const shown2 = await page.evaluate(async () => {
    let v; const un = window.__cp.vmStore.subscribe((x) => (v = x)); un();
    const rec = document.querySelector('.cp-simplerow .cp-rec');
    return { sort: v?.sort, firstWins: v?.rows?.[0]?.wins, rec: rec?.textContent?.trim(), cap: rec?.getAttribute('aria-label') };
  });
  const winsOk = shown2.sort === 'wins' && String(shown2.rec) === String(shown2.firstWins) && shown2.cap === 'WINS';
  sortTracks = priOk && winsOk;
  sortDetail = `priority: rec=${shown.rec} vm=${shown.firstPriority} cap=${shown.cap} · wins: rec=${shown2.rec} vm=${shown2.firstWins} cap=${shown2.cap}`;
  const rows = await page.locator('.cp-simplerow').count();
  const recs = await page.locator('.cp-simplerow .cp-rec').count();
  const picks = await page.locator('.cp-simplerow .cp-pickbtn').count();
  const chips = await page.locator('.cp-simplerow .cp-chip').count();
  const adv = await page.locator('.cp-adv').count();
  const gone = await page.locator('.cp-simplerow .cp-gone').count();
  shaSimple = await vmSha();
  ok('L2 simple row anatomy: one recommendation number + the pick control per row; no flex chip, no advice panel; gone% stays; AND the shown number tracks the active sort (4.5(i)) (P-337 law 2)',
    rows >= 50 && recs === rows && picks === rows && chips === 0 && adv === 0 && gone === rows && sortTracks,
    `rows=${rows} rec=${recs} pickbtn=${picks} chips=${chips} advice=${adv} gone=${gone} · ${sortDetail}`);
}

// L7 — the detail IS one click away (cakepanz-8.1 §6; the presence partner of L2 — an absence law
// cannot see a dead control): click the simple row's main button → exactly ONE detail region with
// the flex chips + the OVR/priority fitlbl becomes visible, aria-expanded true; click again →
// hidden, zero chips in the collapsed rows (L2's shape keeps passing).
{
  await page.locator('.cp-simplerow .cp-mainsimple').first().click(); await page.waitForTimeout(250);
  const open1 = await page.evaluate(() => {
    const det = [...document.querySelectorAll('.cp-fits[data-testid="cp-simple-detail"]')];
    const chips = document.querySelectorAll('.cp-simplerow .cp-chip').length;
    const lbl = det[0]?.querySelector('.cp-fitlbl')?.textContent ?? '';
    const btn = document.querySelector('.cp-simplerow .cp-mainsimple');
    const first = det[0] ?? null;
    return { n: det.length, vis: !!first && first.offsetParent !== null && getComputedStyle(first).display !== 'none', chips, lbl, exp: btn?.getAttribute('aria-expanded') };
  });
  await page.locator('.cp-simplerow .cp-mainsimple').first().click(); await page.waitForTimeout(250);
  const closed = await page.evaluate(() => ({
    n: document.querySelectorAll('.cp-fits[data-testid="cp-simple-detail"]').length,
    chips: document.querySelectorAll('.cp-simplerow .cp-chip').length,
    exp: document.querySelector('.cp-simplerow .cp-mainsimple')?.getAttribute('aria-expanded'),
  }));
  ok('L7 the detail is one click away: the simple row expands to exactly one visible detail region with chips and the OVR/priority fitlbl (aria-expanded true); collapse hides it with 0 chips (cakepanz-8.1 §6)',
    open1.n === 1 && open1.vis && open1.chips >= 1 && open1.exp === 'true' && /OVR .+ priority .+ fills /.test(open1.lbl ?? '') && closed.n === 0 && closed.chips === 0 && closed.exp === 'false',
    `open: regions=${open1.n} visible=${open1.vis} chips=${open1.chips} expanded=${open1.exp} lbl="${(open1.lbl ?? '').trim().slice(0, 48)}" · closed: regions=${closed.n} chips=${closed.chips} expanded=${closed.exp}`);
}

// L5 — 390px stays clean in BOTH forms (S25b's law, extended): measured in the simple form first,
// then through the FULL BOARD door on the same page
{
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(400);
  const s1 = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  const f1 = await form();
  await page.locator('.cp-fullbtn').click(); await page.waitForTimeout(400);
  const s2 = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  const f2 = await form();
  ok('L5 390px stays clean in both forms (scrollWidth <= clientWidth, simple AND full — the S25b extension)',
    f1 === 'simple' && f2 === 'full' && s1.sw - s1.cw <= 0 && s2.sw - s2.cw <= 0,
    `simple ${s1.sw}/${s1.cw} · full (via the door) ${s2.sw}/${s2.cw}`);
  await page.setViewportSize({ width: 1180, height: 950 });
  await page.waitForTimeout(300);
}

// L3 — the full board is reachable in one click and STAYS full for the rest of the draft
let shaFull;
{
  const fFull = await form();
  const sortsBack = await page.locator('.cp-sorts').count();
  const advBack = await page.locator('.cp-adv').count();
  shaFull = await vmSha();
  await pickUser(); await page.waitForTimeout(200);   // a further real pick: full STAYS full (never re-simplified)
  const stillFull = await form();
  ok('L3 the full board is reachable in one click and STAYS full for the rest of the draft (mode is presentation only)',
    fFull === 'full' && sortsBack >= 1 && advBack === 1 && stillFull === 'full',
    `after the door: form=${fFull} sorts=${sortsBack} advice=${advBack}; after a further pick: form=${stillFull}`);
}

// L4 — no engine number moves: at a FROZEN draft state (the user's 11th-pick board, same store
// state, same picks), the mode flip simple → full (the FULL BOARD door) leaves the board VM
// byte-identical — the N25 sha pattern. The natural flip direction (full → simple at the 10th
// pick) is entangled with the pick itself: a pick legitimately moves the board, and that sequence
// is receipted by L1 — the frozen-state sha equality here is the proof that the MODE layer adds
// nothing and removes nothing.
{
  const shaOf = (x) => sha256Hex(JSON.stringify(x));
  const [h1, h2] = await Promise.all([shaOf(shaSimple), shaOf(shaFull)]);
  ok('L4 no engine number moves: at the same frozen draft state the board VM sha is identical in the simple form and the full form (the N25 pattern; the mode is presentation only)',
    shaSimple && shaFull && h1 === h2,
    `simple=${h1.slice(0, 12)} full=${h2.slice(0, 12)} — same store state, same picks, same rows`);
}

// L9 — the mode choice survives a reload (cakepanz-8.1 §6; the law of record for the B1/F3 defect —
// L3 has no reload in it, so L3 could not prove this): the FULL BOARD door was taken above
// (persisted in the settings model since 4.3); one REAL UI pick lands first (the store-dispatch
// path below intentionally skips the autosave — without a real pick the autosave would still hold
// the startDraft 0-pick record, the reload would restore an EMPTY draft, and the form assertion
// would pass for the wrong reason); RELOAD; the restored draft must come back with its picks AND
// FULL; then a NEW draft must offer the simple flip again at the user's 11th pick.
let reloadedFull, newDraftFlip;
{
  await page.locator('.cp-rows .cp-row .cp-main').first().click(); await page.waitForTimeout(150);
  await page.locator('.cp-rows .cp-row').first().locator('.cp-chip.cp-primary').click(); await page.waitForTimeout(150);
  await page.locator('.cp-confirm .cp-go').click(); await page.waitForTimeout(400);
  await page.reload(); await page.waitForTimeout(2500);
  await page.waitForSelector('.cp-board', { timeout: 15000 });
  const restored = await page.evaluate(() => { const st = JSON.parse(JSON.stringify(window.__cp.store.getState())); return { picks: (st.record?.picks ?? []).filter((p) => p.team === st.record?.userTeam).length, status: st.status }; });
  const restoredOk = restored.status === 'drafting' && restored.picks >= 10;   // the restore must restore the DRAFT, not an empty one
  reloadedFull = await form();
  // a NEW draft (startDraft resets the persisted choice) offers the flip again — Team Select through the nav
  USER = await page.evaluate(() => window.__cp.store.getState().record?.userTeam ?? -1);
  await page.locator('.cp-navbtn', { hasText: 'TEAM' }).click(); await page.waitForTimeout(400);
  await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click(); await page.waitForTimeout(150);
  await page.locator('.cp-ts-go').click(); await page.waitForTimeout(900);
  USER = await page.evaluate(() => window.__cp.store.getState().record?.userTeam ?? -1);
  for (let i = 0; i < 9; i++) await pickUser();
  const f10 = await form();
  await pickUser();
  const f11 = await form();
  const note11 = await page.locator('.cp-late-note').count();
  newDraftFlip = f10 === 'full' && f11 === 'simple' && note11 === 1;
  ok('L9 the mode choice survives a reload: after the FULL BOARD door a reload restores the draft (its picks AND the persisted FULL form), and a NEW draft offers the simple flip again at the 11th user pick (cakepanz-8.1 §6)',
    reloadedFull === 'full' && newDraftFlip && restoredOk,
    `after reload: form=${reloadedFull} restoredPicks=${restored.picks} status=${restored.status} · new draft at the 10th pick: ${f10}, at the 11th: ${f11} (note=${note11})`);
}

// L8 — the last pick lands on Complete (cakepanz-8.1 §6; DS F2's law): drive the NEW draft from
// the 11th pick to the USER's 32nd pick THROUGH THE REAL UI (row pick button + the confirm step —
// not store dispatches), then assert the Complete screen owns the landing: the record rendered,
// the stale board never shown, "it is not your pick" never rendered, zero page errors.
let lastPickLands = false;
let l8Detail = '';
{
  const st0 = JSON.parse(await page.evaluate(() => JSON.stringify(window.__cp.store.getState())));
  const startPicks = (st0.record?.picks ?? []).filter((p) => p.team === USER).length;
  for (let i = startPicks + 1; i <= 32; i++) {
    const st = JSON.parse(await page.evaluate(() => JSON.stringify(window.__cp.store.getState())));
    if (st.status === 'done') break;
    if (!st.draft || st.draft.order[st.draft.pos] !== USER) throw new Error(`L8 walk: the user is not on the clock before UI pick ${i}`);
    await page.locator('.cp-simplerow .cp-pickbtn').first().click(); await page.waitForTimeout(120);
    await page.locator('.cp-confirm .cp-go').click(); await page.waitForTimeout(220);
    const st2 = JSON.parse(await page.evaluate(() => JSON.stringify(window.__cp.store.getState())));
    const mine = (st2.record?.picks ?? []).filter((p) => p.team === USER).length;
    if (mine !== i) throw new Error(`L8 walk: UI pick ${i} did not land (user picks = ${mine}; a rejected pick would stall the walk)`);
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
  lastPickLands = end.screen === 'complete' && end.status === 'done' && end.doneVisible && /Your draft is complete/.test(end.doneText) && !/it is not your pick/.test(end.errText) && !/not your pick/.test(end.storeErr);
  // the hash door (4.4, cakepanz-8.1): syncFromHash rides go() now — a hand-edited #/board (Back
  // button, old bookmark) on a done draft converges on Complete, never a blank board
  await page.evaluate(() => { location.hash = '#/board'; window.dispatchEvent(new Event('hashchange')); });
  await page.waitForTimeout(700);
  const afterHash = await page.evaluate(() => ({
    screen: document.querySelector('main.cp-root')?.getAttribute('data-screen'),
    hash: location.hash,
    doneVisible: !!document.querySelector('.cp-done'),
  }));
  const hashLands = afterHash.screen === 'complete' && /complete/.test(afterHash.hash) && afterHash.doneVisible;
  lastPickLands = lastPickLands && hashLands;
  l8Detail = `screen=${end.screen} status=${end.status} record=${end.doneVisible} h1="${end.doneText.trim().slice(0, 40)}" err="${end.errText.trim().slice(0, 40)}" pageErrors=${errs.length} · hash door: #/board → screen=${afterHash.screen} hash=${afterHash.hash} record=${afterHash.doneVisible}`;
  ok('L8 the last pick lands on Complete: the user\'s 32nd pick, taken through the real UI, hands the screen to Complete — the record renders and "it is not your pick" never appears (cakepanz-8.1 §6)',
    lastPickLands, l8Detail);
}

// L6 — zero page errors across everything above: both flip directions, the 390px walk, the row
// detail, the reload + new draft, and the whole 21-pick UI walk to the completing pick
ok('L6 zero page errors across the flip, both directions, the 390px walk, the reload, and the UI walk to the last pick', errs.length === 0, errs.slice(0, 2).join(' | '));

await page.close();
await browser.close();
const pass = results.filter((r) => r.verdict === 'PASS').length;
const fail = results.filter((r) => r.verdict === 'FAIL').length;
console.log(`\n== LATE BATTERY (P-337) · ${pass} pass · ${fail} fail ==`);
process.exit(fail ? 1 : 0);
