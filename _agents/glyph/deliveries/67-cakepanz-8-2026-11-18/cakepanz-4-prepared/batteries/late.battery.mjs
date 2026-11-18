/* late.battery.mjs — P-337 (cakepanz-8): the LATE-DRAFT SIMPLE BOARD battery. The Owner's words
 * (questionnaire Q6): "We want the user to really enjoy the first ten rounds of the draft and be
 * able to make simple decisions in the second half, not have to do complex math or planning to
 * make a decent roster." The flip is the USER's own 10th pick (not the overall number — a user
 * picking at 1.32 still gets ten deep rounds). Mode is presentation only: it moves no engine
 * number (L4 proves the board VM sha is identical across the flip, the N25 pattern). Full board
 * is reachable in one click at any time and STAYS full for the rest of the draft (L3).
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
const USER = await page.evaluate(() => window.__cp.store.getState().record?.userTeam ?? -1);
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

// L2 — the simple row: exactly one recommendation number + the pick control; no flex chip, no advice panel
{
  const rows = await page.locator('.cp-simplerow').count();
  const recs = await page.locator('.cp-simplerow .cp-rec').count();
  const picks = await page.locator('.cp-simplerow .cp-pickbtn').count();
  const chips = await page.locator('.cp-simplerow .cp-chip').count();
  const adv = await page.locator('.cp-adv').count();
  const gone = await page.locator('.cp-simplerow .cp-gone').count();
  shaSimple = await vmSha();
  ok('L2 simple row anatomy: one recommendation number + the pick control per row; no flex chip, no advice panel; gone% stays (P-337 law 2)',
    rows >= 50 && recs === rows && picks === rows && chips === 0 && adv === 0 && gone === rows,
    `rows=${rows} rec=${recs} pickbtn=${picks} chips=${chips} advice=${adv} gone=${gone}`);
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

// L6 — zero page errors across everything above (including both flip directions and 390px)
ok('L6 zero page errors across the flip, both directions, and the 390px walk', errs.length === 0, errs.slice(0, 2).join(' | '));

await page.close();
await browser.close();
const pass = results.filter((r) => r.verdict === 'PASS').length;
const fail = results.filter((r) => r.verdict === 'FAIL').length;
console.log(`\n== LATE BATTERY (P-337) · ${pass} pass · ${fail} fail ==`);
process.exit(fail ? 1 : 0);
