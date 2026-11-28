/* probe-saves-states.mjs — the BROWSER-level saves-states receipts (Part F, the states sweep).
 *
 * The SHELL-STATUS matrix's named gap: "the CORRUPT/NEWER refusals are receipted node-side (N12b/
 * N12c) and via savesApp.injectBroken's plantable blobs; a browser-level screenshot of the refusal
 * MESSAGE is not separately receipted." This probe closes that gap end to end through the REAL UI:
 * it plants, in the page's own localStorage, (a) a structurally broken envelope, (b) a valid
 * envelope stamped by a NEWER schema version, (c) a valid envelope written by an OLDER build —
 * then reads the saves panel and asserts the VERBATIM refusals and the older-build note, with
 * screenshots as the visual receipts. Corrupt-never-repair, never repaired, never defaulted.
 *
 * Run: node --import ./scripts/node-port-register.mjs scripts/probe-saves-states.mjs
 * Needs the preview server (CP_PORT, default 4179) serving this tree's dist/.
 */
import fs from 'node:fs'; import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch (e) { throw new Error('playwright is not installed — it is a devDependency: run npm ci (then npx playwright install chromium for the browser). D-1: no HOME-global fallback. Original: ' + e.message); }

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = process.env.CP_PORT || 4179;
const { SCHEMA_VERSION, engineVersion } = await import(path.join(ROOT, 'src/lib/port/seam.ts'));

const key = (s) => 'sim:nfl:slot:' + s;
const ENV = (slot, over) => JSON.stringify({
  sport: 'nfl', kind: 'draft', schemaVersion: SCHEMA_VERSION, slot,
  engineVersion: engineVersion(), dataVersion: 'sha256:probe', saveId: 'probe', saveRevision: 1,
  createdAt: '2026-01-01T00:00:00.000Z', savedAt: '2026-01-01T00:00:00.000Z',
  payload: { seed: 4242, userTeam: 30, pool: [], picks: [] },
  ...over,
});
const blobs = {
  A: ENV('A', { kind: 'week', payload: { roster: [] } }),                                                    // structurally broken (the engine's inner check refuses it)
  B: ENV('B', { schemaVersion: SCHEMA_VERSION + 8, engineVersion: 'nfl999.newer', saveId: 'probe-newer' }),  // a NEWER build's stamp — refused by VERSION, never by payload
  C: ENV('C', { engineVersion: engineVersion() + '-older', saveId: 'probe-older' }),                          // a valid save from an OLDER build — loads, and must SAY so
};

const results = [];
const ok = (law, pass, detail = '') => { results.push(pass); console.log(`   ${pass ? 'PASS' : 'FAIL'}  ${law}${detail ? ' — ' + detail : ''}`); };

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 900 } });
page.setDefaultTimeout(8000);
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
console.log('probe: booting the dev build and starting a draft (the saves panel needs a record)…');
await page.goto(`http://localhost:${PORT}/?dev=1`);
await page.waitForTimeout(1500);
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.waitForTimeout(150);
await page.locator('.cp-ts-go').click();                       // the natural slot is offered first (S-law)
await page.waitForTimeout(900);
console.log('probe: opening the saves screen…');
await page.goto(`http://localhost:${PORT}/?dev=1#/saves`);
await page.waitForTimeout(1500);
await page.evaluate(([kA, kB, kC, a, b, c]) => { localStorage.setItem(kA, a); localStorage.setItem(kB, b); localStorage.setItem(kC, c); }, [key('A'), key('B'), key('C'), blobs.A, blobs.B, blobs.C]);
// re-read WITHOUT a page reload — a reload would drop the in-memory draft (the boot returns to
// Team Select with no record); leaving the screen and coming back remounts the panel, whose
// mount effect re-reads every slot through the engine's own parse path
await page.evaluate(() => { location.hash = '#/board'; });
await page.waitForTimeout(600);
await page.evaluate(() => { location.hash = '#/saves'; });
await page.waitForTimeout(1200);

const card = async (s) => {
  const loc = page.locator(`.cp-slot[data-slot="${s}"]`);
  const t = (sel) => loc.locator(sel).first().textContent({ timeout: 5000 }).catch(() => null);
  return { refused: await t('.cp-slot-refused'), msg: await t('.cp-slot-msg'), older: await t('.cp-slot-older'), kind: await t('.cp-slot-kind') };
};
const A = await card('A'), B = await card('B'), C = await card('C');

ok('P-S1 corrupt save refused VERBATIM in the browser (never repaired)', !!A.refused && A.refused.includes('REFUSED (corrupt)') && !!A.msg && A.msg.length > 5, (A.msg || '').slice(0, 90));
ok('P-S2 newer-build save refused by VERSION in the browser', !!B.refused && B.refused.includes('REFUSED (newer-version)'), (B.msg || '').slice(0, 90));
ok('P-S3 the older-build save LOADS and the panel NAMES the other build', !!C.older && C.older.includes('this save came from build') && C.older.includes('logged picks hold; un-made picks may differ'), (C.older || '').slice(0, 90));
ok('P-S4 the older-build card still renders as a normal loadable save', !!C.kind && /DRAFT/i.test(C.kind), (C.kind || '').trim());
ok('P-S5 zero page errors across the saves states', errs.length === 0, errs.slice(0, 2).join(' | '));

fs.mkdirSync(path.join(ROOT, 'shots'), { recursive: true });
for (const [name, loc] of [['saves-states-corrupt-A', `.cp-slot[data-slot="A"]`], ['saves-states-newer-B', `.cp-slot[data-slot="B"]`], ['saves-states-older-C', `.cp-slot[data-slot="C"]`]]) {
  const el = page.locator(loc);
  await el.screenshot({ path: path.join(ROOT, 'shots', `${name}.png`) });
  const size = fs.statSync(path.join(ROOT, 'shots', `${name}.png`)).size;
  console.log(`   shot  ${name}.png (${size} B)`);
}
await browser.close();
const failed = results.filter((r) => !r).length;
console.log(failed ? `\n== SAVES-STATES PROBE · ${results.length - failed}/${results.length} — FAIL ==` : `\n== SAVES-STATES PROBE · ${results.length}/${results.length} PASS ==`);
process.exit(failed ? 1 : 0);
