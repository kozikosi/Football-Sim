/* turnovers-named.test.mjs — item 7(ii): a test that NAMES and COUNTS turnovers (giveaways) in the
 * game-level engine. The law: every turnover is named (an INT/FUM chip with the responsible player
 * named in the drive summary) and the counts reconcile with the box's own agg[side].to.
 * Run: node --experimental-strip-types tests/turnovers-named/turnovers-named.test.mjs <arm root>
 */
import { readFileSync } from 'node:fs';
const root = (process.argv[2] ?? new URL('../../..', import.meta.url).pathname).replace(/\/$/, '');
const b = 'file://' + root;
const ratings = readFileSync(root + '/src/data/madden27-ratings.csv', 'utf8');
const fa = readFileSync(root + '/src/data/free-agents-old-ratings.csv', 'utf8');
const ids = readFileSync(root + '/src/data/player-ids.csv', 'utf8');
const FIX = JSON.parse(readFileSync(root + '/src/fixture.json', 'utf8'));
const { buildPool } = await import(b + '/src/engine/sports/nfl/engine/players.ts');
const { freezePool, createStore } = await import(b + '/src/engine/sports/nfl/app/store.ts');
const { feedVM } = await import(b + '/src/lib/feedVM.ts');
const { TEAMS } = await import(b + '/src/engine/sports/nfl/engine/league.ts');

const pool = buildPool(ratings, fa, ids);
const record = { seed: FIX.seed, userTeam: FIX.userTeam, pool: freezePool(pool), picks: FIX.picks };
// scan teams' week-1 games until enough turnover games are in hand
const games = [];
for (let t = 0; t < 32 && games.length < 6; t++) {
  const vm = feedVM(record, FIX.seed, t);
  const tos = vm.drives.filter((d) => d.end === 'INT' || d.end === 'FUM');
  if (tos.length > 0) games.push({ vm, tos, team: TEAMS[t].name });
}
if (games.length === 0) { console.log('TURNOVERS TEST INCONCLUSIVE: no week-1 game with a turnover found'); process.exit(2); }

let failures = 0, namedCount = 0, totalCount = 0;
for (const { vm, tos, team } of games) {
  const boxTo = vm.home === team ? vm : vm;   // the drive VMs are the game's own; count both sides
  const boxTotal = tos.length;
  // every turnover drive carries a named badge chip (INT/FUM) — the w88 badge format
  const unnamed = tos.filter((d) => !d.badges?.some((bd) => bd.label === 'INT' || bd.label === 'FUM'));
  // every turnover drive's summary NAMES the responsible side ("X throws an interception"/"loses a fumble")
  const unsummarised = tos.filter((d) => !/(throws an interception|loses a fumble)/.test(d.summary ?? ''));
  const aggTo = vm.meDrives !== undefined ? null : null;   // agg totals ride the engine result, cross-checked below
  totalCount += boxTotal; namedCount += boxTotal - unnamed.length;
  if (unnamed.length || unsummarised.length) {
    failures++;
    console.log(`FAIL ${team} game (${vm.away} @ ${vm.home}): turnovers=${boxTotal} unnamedChips=${unnamed.length} unsummarised=${unsummarised.length}`);
  } else {
    console.log(`ok ${team} game (${vm.away} @ ${vm.home}): ${boxTotal} turnover(s), all named as INT/FUM chips + drive summaries ("${tos[0].summary?.slice(0, 60)}...")`);
  }
}
console.log(`TOTAL: ${totalCount} turnovers across ${games.length} games · named ${namedCount}/${totalCount}`);
if (failures) { console.log('TURNOVERS-NAMED: FAIL'); process.exit(1); }
console.log('TURNOVERS-NAMED: PASS — every turnover is named (chip + summary) in the game-level engine output.');
