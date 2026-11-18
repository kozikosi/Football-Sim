/* gamelog-fixture.mjs — the Part-B default-off proof fixture (the one that matters most).
 *
 * The GLM pass-class node is OFF by default: runGame without opts.passClass must be bit-for-bit
 * the pools node — the same events, the same points, the same hashes — as the OLD pin's engine,
 * because the pools node did not change at the tip. This script runs 60 keyed games on the tree it
 * sits in and writes the logs to a JSON file; the proof is `cmp` (or diff) between the file written
 * in the OLD-PIN tree and the file written in the PREPARED (tip) tree — two runs, two trees, one
 * byte-identical fixture file.
 *
 * On a tree that CARRIES the pass-class node (the tip), the script also proves the second and
 * third guarantees:
 *   · lambda-0 tilt is a no-op: {passClass} vs {passClass, passGap: 7} — the packs carry lambda 0,
 *     so gap 7 multiplies 0 — the log must replay the neutral GLM log bit for bit;
 *   · absent vs present: turning the node ON changes the log (a control — proof the comparison is
 *     live, not vacuously equal because the option is ignored).
 *
 * Run (no browser, no port, no localStorage — plain strip-types is enough):
 *   node --experimental-strip-types scripts/gamelog-fixture.mjs --out /tmp/gamelogs-old.json
 */
import fs from 'node:fs';
import { makePack } from '../src/engine/core/pack.ts';
import { loadPools } from '../src/engine/sports/nfl/sim/pools.ts';
import { runGame } from '../src/engine/sports/nfl/sim/game.ts';
import { gameKeyOf } from '../src/engine/core/keyedrng.ts';
import { logHash } from '../src/engine/core/events.ts';

const outIdx = process.argv.indexOf('--out');
const OUT = outIdx >= 0 ? process.argv[outIdx + 1] : '/tmp/gamelogs.json';
const N = 60;

const packBody = (n) => JSON.parse(fs.readFileSync(new URL(`../data/packs/${n}.json`, import.meta.url), 'utf8'));
const P = loadPools(makePack(packBody('nfl-pools-fit2016-2022')));

const hasPassClass = fs.existsSync(new URL('../src/engine/sports/nfl/sim/passclass.ts', import.meta.url));
let M = null;
if (hasPassClass) {
  const { loadPassClass } = await import('../src/engine/sports/nfl/sim/passclass.ts');
  M = loadPassClass(makePack(packBody('nfl-passclass-fit2023-2025')));
  console.log(`pass-class node present (lambda: ${M.lambda}, minClassPool: ${M.minClassPool}) — the gap-replay and absent-vs-present checks run`);
} else {
  console.log('pass-class node absent (the old pin) — only the neutral 60-game log is written');
}

const logs = [];
for (let i = 0; i < N; i++) {
  const key = gameKeyOf(`default-off-proof-${i}`);
  const g = runGame(P, key);                       // NO opts — the default-off guarantee
  logs.push({ key: `default-off-proof-${i}`, hash: logHash(g.events), points: g.points, ot: g.ot, events: JSON.stringify(g.events) });
}
const result = { games: N, pack: 'nfl-pools-fit2016-2022', defaultOff: logs };

if (hasPassClass) {
  // lambda-0 tilt no-op: gap 7 must replay the neutral GLM log bit for bit
  const gapReplay = [];
  for (let i = 0; i < N; i++) {
    const key = gameKeyOf(`gap-replay-${i}`);
    const a = runGame(P, key, { passClass: M });                 // lambda 0 from the pack
    const b = runGame(P, key, { passClass: M, passGap: 7 });     // gap 7 × lambda 0 = no tilt
    gapReplay.push({ key: `gap-replay-${i}`, a: logHash(a.events), b: logHash(b.events), same: logHash(a.events) === logHash(b.events) && JSON.stringify(a.events) === JSON.stringify(b.events) });
  }
  result.gapReplay = { games: N, allSame: gapReplay.every((r) => r.same), rows: gapReplay };
  // the control: the node ON changes the log (the comparison is live)
  let diff = 0;
  for (let i = 0; i < N; i++) {
    const key = gameKeyOf(`default-off-proof-${i}`);
    const on = runGame(P, key, { passClass: M });
    const off = logs[i];
    if (logHash(on.events) !== off.hash) diff += 1;
  }
  result.absentVsPresent = { games: N, differingGames: diff, note: 'the ON log differs from the OFF log — the default-off comparison is live, not vacuous' };
}

fs.writeFileSync(OUT, JSON.stringify(result, null, 1) + '\n');
console.log(`wrote ${OUT}: ${N} games`);
if (hasPassClass) {
  console.log(`gap-replay: ${result.gapReplay.allSame ? 'ALL 60 IDENTICAL (lambda-0 tilt is a no-op — bit for bit)' : 'FAILED — a gap changed the neutral log'}`);
  console.log(`absent-vs-present control: ${result.absentVsPresent.differingGames}/60 logs differ with the node ON`);
}
