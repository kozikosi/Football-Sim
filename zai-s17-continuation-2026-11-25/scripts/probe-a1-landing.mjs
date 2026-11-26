/* probe-a1-landing.mjs — the A1 browser probe (cakepanz-8): the done-draft landing outcomes the
 * review ordered. Builds a REAL done-draft autosave node-side (the delivery's own store +
 * hydrateApp), injects it as the shell would have written it, reloads, and asserts:
 *   (1) the boot lands on COMPLETE (never the blank board) with the record rendered;
 *   (2) the DRAFT nav on the finished draft goes to Complete, never blank.
 * Run: node --import ./scripts/node-port-register.mjs scripts/probe-a1-landing.mjs <preview-url>
 * (the register is REQUIRED — the engine snapshot carries a TS parameter property; without it any
 * Node dies with ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX). The mid-season hub landing and the
 * mid-draft board control ride the c8 receipt probes beside this one. */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
const { chromium } = _req('playwright');

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const URL_ = process.argv[2] || 'http://localhost:4179/?dev=1';

const port = await import(path.join(ROOT, 'src/lib/port/seam.ts'));
const { buildPool, createStore, candidates } = port;
const hydrateApp = await import(path.join(ROOT, 'src/lib/port/hydrateApp.ts'));
const CSV = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const pool = buildPool(CSV('data/nfl/madden27-ratings.csv'), CSV('data/nfl/free-agents-old-ratings.csv'), CSV('data/nfl/player-ids.csv'));

const userTeam = 5, seed = 2026;
const store = createStore(pool);
store.dispatch({ type: 'START', seed, userTeam });
while (store.getState().status === 'drafting') {
  const s = store.getState().draft;
  const c = candidates(s, userTeam)[0];
  store.dispatch({ type: 'PICK', playerId: c.player.id, slot: c.slot });
}
const RECORD = JSON.parse(JSON.stringify(store.getState().record));
if (RECORD.picks.length !== 1024) throw new Error('the draft did not complete: ' + RECORD.picks.length);

const memStorage = () => { const m = new Map(); return {
  async read(k) { return { ok: true, value: m.has(k) ? m.get(k) : null }; },
  async write(k, t) { m.set(k, String(t)); return { ok: true, value: undefined }; },
  async remove(k) { m.delete(k); return { ok: true, value: undefined }; },
  async keys(p) { return { ok: true, value: [...m.keys()].filter((k) => k.startsWith(p)).sort() }; },
  async entries(p) { return { ok: true, value: [...m.keys()].filter((k) => k.startsWith(p)).sort().map((k) => [k, m.get(k)]) }; },
}; };
const mod = memStorage();
const meta = { engineVersion: 'nfl1.1ac56c28928eff', dataVersion: 'sha256:probe', saveId: 'probe-donedraft', saveRevision: 1 + RECORD.picks.length, createdAt: '2026-11-18T00:00:00.000Z' };
const dmsg = await hydrateApp.autosaveDraft(RECORD, meta, new Date('2026-11-18T00:01:00.000Z'), mod);
if (dmsg) throw new Error('draft autosave refused: ' + dmsg);
const draftText = (await mod.read(hydrateApp.AUTO_DRAFT_KEY)).value;

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
await page.goto(URL_, { waitUntil: 'load' });
await page.evaluate(([dk, txt]) => { localStorage.clear(); localStorage.setItem(dk, txt); }, [hydrateApp.AUTO_DRAFT_KEY, draftText]);
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(3000);

const atBoot = await page.evaluate(() => ({
  screen: document.querySelector('main')?.getAttribute('data-screen') ?? null,
  complete: document.querySelectorAll('.cp-done').length,
  board: document.querySelectorAll('.cp-board').length,
  rows: document.querySelectorAll('.cp-main').length,
  err: document.querySelector('.cp-error')?.textContent ?? null,
}));
await page.locator('.cp-navbtn', { hasText: 'DRAFT' }).click();
await page.waitForTimeout(600);
const afterDraftNav = await page.evaluate(() => ({
  screen: document.querySelector('main')?.getAttribute('data-screen') ?? null,
  complete: document.querySelectorAll('.cp-done').length,
  board: document.querySelectorAll('.cp-board').length,
  rows: document.querySelectorAll('.cp-main').length,
}));
console.log(JSON.stringify({ atBoot, afterDraftNav, pageErrors: errs.slice(0, 3) }, null, 1));
await browser.close();
const okAll = atBoot.screen === 'complete' && atBoot.complete >= 1 && atBoot.board === 0 && atBoot.rows === 0 && !atBoot.err
  && afterDraftNav.screen === 'complete' && afterDraftNav.complete >= 1 && afterDraftNav.board === 0 && afterDraftNav.rows === 0;
console.log(okAll ? 'A1 DONE-DRAFT OUTCOMES: GREEN (boot lands Complete; the DRAFT nav returns to Complete; never a blank board)' : 'A1 DONE-DRAFT OUTCOMES: RED');
process.exit(okAll ? 0 : 1);
