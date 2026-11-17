// ERNIE probe for the four D3 box-score survivors. Run from colors/ with:
//   node --experimental-strip-types --test ../../_agents/ernie/deliveries/glm-passclass-2026-11-17/boxscore-assertions/probe.test.ts
// It passes on the clean tip and fails on each of the four mutations in receipt-mutations.txt.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gameKeyOf } from '../../src/core/keyedrng.ts';
import { logBuilder } from '../../src/core/events.ts';
import { runDrive } from '../../src/sports/nfl/sim/drive.ts';
import type { FbEvent, PlayP } from '../../src/sports/nfl/sim/drive.ts';
import { boxScoreView } from '../../src/sports/nfl/sim/box.ts';
import { readRules, toyPack } from '../../src/sports/nfl/sim/toypack.ts';
const rules = readRules(toyPack);
function drive(seed: number | string, opts: { ydl?: number; clock?: number } = {}) {
  const lb = logBuilder<FbEvent>();
  const out = runDrive(lb, { key: gameKeyOf(seed), pack: toyPack }, { drive: 0, team: 'A', opp: 'B', ydl: opts.ydl ?? 75, clock: opts.clock ?? 900, t0: 0 });
  return { events: lb.events, out };
}
const plays = (e: readonly FbEvent[]): PlayP[] => e.flatMap((x) => (x.kind === 'play' ? [x.payload] : []));
const offensive = (p: PlayP) => p.call === 'pass' || p.call === 'run';
test('four box-score assertions over 3000 drives', () => {
  let nFirst = 0, nTd = 0, nPunt = 0, nTo = 0;
  for (let n = 0; n < 3000; n++) {
    const start = 1 + (n * 37) % 99, clock = n % 7 === 0 ? 90 : 900;
    const { events, out } = drive('probe-' + n, { ydl: start, clock });
    const v = boxScoreView(events, rules), a = v.teams[0]!;
    const ps = plays(events);
    assert.equal(a.firstDowns, ps.filter((p) => offensive(p) && p.firstDown).length, 'firstDowns n=' + n);
    assert.equal(a.touchdowns, ps.filter((p) => p.td).length, 'touchdowns n=' + n);
    assert.equal(a.puntYards, ps.filter((p) => p.call === 'punt').reduce((s, p) => s + p.kickYards, 0), 'puntYards n=' + n);
    if (a.firstDowns > 0) nFirst++;
    if (a.touchdowns > 0) nTd++;
    if (a.punts > 0) nPunt++;
    const last = ps[ps.length - 1];
    if (out.end.result === 'to') {
      nTo++;
      assert.equal(out.end.next?.ydl, Math.min(rules.touchbackYdl, Math.max(1, 100 - last!.ydlAfter)), 'turnover spot n=' + n);
    }
  }
  console.log('coverage: firstDowns>0 ' + nFirst + ', touchdowns>0 ' + nTd + ', punts>0 ' + nPunt + ', result "to" ' + nTo);
  assert.ok(nFirst > 0 && nTd > 0 && nPunt > 0 && nTo > 0, 'every assertion must be exercised');
});
