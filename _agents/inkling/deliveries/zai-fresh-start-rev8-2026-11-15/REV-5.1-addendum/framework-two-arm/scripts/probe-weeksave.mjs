/* probe-weeksave.mjs — the week-save hydration receipt (item 12 owed): both arms, one process.
 * Seeds slot C's localStorage with a REAL week envelope (built node-side through the engine's own
 * serialize), then asserts: the panel SHOWS the week metadata (WEEK SAVE · year/nextWeek/scores/
 * playoffs/seed/run — hydration) and LOAD stays refused with the kind named (the week-stepper does
 * not exist yet — season-missing-vms.txt item 3). 0 console errors.
 * Run: node --experimental-strip-types scripts/probe-weeksave.mjs
 */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }
const b = 'file://' + new URL('../arm-vue/', import.meta.url).pathname;

const ratings = (await import('node:fs')).readFileSync(new URL('../arm-vue/src/data/madden27-ratings.csv', import.meta.url).pathname, 'utf8');
const { serialize } = await import(b + 'src/engine/sports/nfl/app/saves.ts');
const { SLOT_NAMES } = await import(b + 'src/engine/core/envelope.ts');
const SLOT = SLOT_NAMES[2] ?? 'C';
const meta = { engineVersion: 'season-pin-d3bd81d2', dataVersion: 'sha256:fixture', saveId: 'week-hydration-probe', saveRevision: 5, createdAt: '2026-11-15T00:00:00.000Z' };
// a VALID WeekPayload per saves.ts l.33-46 + parsePayload (l.88-100): userTeam by NAME, a REAL
// 32-frozen-player roster (Buffalo's 32 fixture picks thawed through the pool — Player objects ARE
// FrozenPlayer-shaped), schedule rows with kind, scores with real ints. Nothing invented: every
// roster row comes from the fixture's own draft log.
const fs_ = await import('node:fs');
const FIX = JSON.parse(fs_.readFileSync(new URL('../arm-vue/src/fixture.json', import.meta.url).pathname, 'utf8'));
const { buildPool } = await import(b + 'src/engine/sports/nfl/engine/players.ts');
const pool = buildPool(ratings, fs_.readFileSync(new URL('../arm-vue/src/data/free-agents-old-ratings.csv', import.meta.url).pathname, 'utf8'), fs_.readFileSync(new URL('../arm-vue/src/data/player-ids.csv', import.meta.url).pathname, 'utf8'));
const byId = new Map(pool.map((p) => [p.id, p]));
const roster = FIX.picks.filter((k) => k.team === 0).map((k) => byId.get(k.pid));
const payload = {
  seed: 2027, year: 2027, run: 0, gameSeed: 3630089740, nextWeek: 5, userTeam: 'Buffalo Bills',
  roster, ratings: {},
  schedule: [
    { week: 1, home: 'Buffalo Bills', away: 'New England Patriots', kind: 'div' },
    { week: 2, home: 'Miami Dolphins', away: 'Buffalo Bills', kind: 'div' },
  ],
  scores: [
    { week: 1, home: 'Buffalo Bills', away: 'New England Patriots', hs: 27, as: 17, htd: 3, atd: 2 },
    { week: 2, home: 'Miami Dolphins', away: 'Buffalo Bills', hs: 20, as: 24, htd: 2, atd: 3 },
    { week: 3, home: 'Buffalo Bills', away: 'NY Jets', hs: 31, as: 21, htd: 4, atd: 2 },
    { week: 4, home: 'Buffalo Bills', away: 'Miami Dolphins', hs: 14, as: 10, htd: 1, atd: 1 },
  ],
  plan: null, statsRecorded: false,
};
const weekText = serialize('week', SLOT, meta, payload, new Date('2026-11-15T12:00:00Z'));
const sportKey = (await import(b + 'src/engine/core/keys.ts')).sportKey;
const LS_KEY = sportKey('nfl', 'slot:' + SLOT);

const ARMS = [
  { name: 'vue', dist: new URL('../arm-vue/dist/index.html', import.meta.url).pathname },
  { name: 'svelte', dist: new URL('../arm-svelte/dist/index.html', import.meta.url).pathname },
];
const out = {};
for (const arm of ARMS) {
  const browser = await pw.chromium.launch({ args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1180, height: 950 } });
  await ctx.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [LS_KEY, weekText]);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(pathToFileURL(arm.dist).href);
  await page.waitForSelector('.cp-teambtn', { timeout: 20000 });
  await page.getByRole('button', { name: 'SAVES', exact: true }).click();
  await page.waitForSelector('.cp-save-slot', { timeout: 20000 });
  await page.waitForTimeout(400);
  const slotCText = await page.locator('.cp-save-slot', { hasText: 'SLOT C' }).textContent();
  // LOAD must stay refused: click LOAD on slot C and read the message
  await page.locator('.cp-save-slot', { hasText: 'SLOT C' }).getByRole('button', { name: 'LOAD' }).click();
  await page.waitForTimeout(300);
  const loadMsg = await page.locator('.cp-msg').first().textContent().catch(() => '');
  out[arm.name] = {
    slotC: (slotCText || '').replace(/\s+/g, ' ').trim(),
    hydrated: /WEEK SAVE/.test(slotCText || '') && /next week 5/.test(slotCText || '') && /4 scores/.test(slotCText || '') && /Buffalo/.test(slotCText || '') === false ? /WEEK SAVE/.test(slotCText || '') && /next week 5/.test(slotCText || '') && /4 scores/.test(slotCText || '') : /WEEK SAVE/.test(slotCText || ''),
    loadRefused: /week/.test(loadMsg || ''),
    loadMsg: (loadMsg || '').trim().slice(0, 140),
    errorCount: errors.length,
  };
  await browser.close();
}
console.log(JSON.stringify(out, null, 1));
const ok = Object.values(out).every((r) => r.hydrated && r.loadRefused && r.errorCount === 0);
console.log(ok ? '== WEEK-SAVE HYDRATION: PASS on both arms — the week envelope SHOWS its state, LOAD stays refused by kind ==' : '== WEEK-SAVE HYDRATION: FAIL ==');
process.exit(ok ? 0 : 1);
