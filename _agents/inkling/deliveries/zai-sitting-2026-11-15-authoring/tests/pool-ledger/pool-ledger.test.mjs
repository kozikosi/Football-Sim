/* pool-ledger.test.mjs — item 7(vi): count the pool and the board, report the gap.
 * The verified arithmetic: 1,941 (madden27-ratings.csv) + 12 (free-agents-old-ratings.csv)
 * = 1,953 = poolCount. The board shows 1,921 — a 32-row gap. This test counts every layer and
 * NAMES the filter: engine/draft.ts l.53 — `players.filter((p) => p.role !== 'LS')` — the 32 long
 * snappers (one per team) are never drafted, so the draftable board is 1,953 − 32 = 1,921.
 * Run: node tests/pool-ledger/pool-ledger.test.mjs <arm root>
 */
import { readFileSync } from 'node:fs';
const root = (process.argv[2] ?? new URL('../../..', import.meta.url).pathname).replace(/\/$/, '');
const b = 'file://' + root;
const ratingsCsv = readFileSync(root + '/src/data/madden27-ratings.csv', 'utf8');
const faCsv = readFileSync(root + '/src/data/free-agents-old-ratings.csv', 'utf8');
const idsCsv = readFileSync(root + '/src/data/player-ids.csv', 'utf8');
const { buildPool } = await import(b + '/src/engine/sports/nfl/engine/players.ts');
const { newDraft } = await import(b + '/src/engine/sports/nfl/engine/draft.ts');
const { makeRng } = await import(b + '/src/engine/core/rng.ts');

const csvCount = (t) => t.split(/\r?\n/).filter((l) => l.trim().length > 0).length - 1;   // minus the header
const madden = csvCount(ratingsCsv), fa = csvCount(faCsv);
const pool = buildPool(ratingsCsv, faCsv, idsCsv);
const ls = pool.filter((p) => p.role === 'LS');
const lsTeams = new Set(ls.map((p) => p.team));
const draftState = newDraft(pool, makeRng(1).fork('draft'));
// the draft's own availability list — newDraft slices the pool through the same filter (draft.ts l.53)
const draftable = draftState.pool.length;
const rows = [
  `madden27-ratings.csv rows : ${madden}`,
  `free-agents-old-ratings.csv rows: ${fa}`,
  `sum                       : ${madden + fa}`,
  `buildPool count           : ${pool.length}`,
  `draftable (draft.ts l.53) : ${draftable}`,
  `LS rows in the pool       : ${ls.length} (teams covered: ${lsTeams.size} of 32 — one per team: ${lsTeams.size === 32})`,
];
console.log(rows.join('\n'));
const checks = [
  [madden + fa === 1953, '1,941 + 12 = 1,953 (the verified poolCount)'],
  [pool.length === 1953, 'buildPool == 1,953'],
  [ls.length === 32, 'the gap is exactly the 32 long snappers'],
  [draftable === 1921, 'draftable == 1,921 (the board count)'],
  [pool.length - ls.length === draftable, '1,953 − 32 = 1,921 — the gap is fully explained'],
];
let bad = 0;
for (const [ok, why] of checks) { console.log(`${ok ? 'ok ' : 'FAIL'} ${why}`); if (!ok) bad++; }
console.log(bad ? `POOL-LEDGER: FAIL (${bad})` : 'POOL-LEDGER: PASS — the 32-row board gap is the LS filter (draft.ts l.53), one long snapper per team; no unexplained rows remain.');
process.exit(bad ? 1 : 0);
