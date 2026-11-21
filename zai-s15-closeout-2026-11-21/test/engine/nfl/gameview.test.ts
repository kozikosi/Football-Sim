import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { gameKeyOf } from '../../../src/engine/core/keyedrng.ts';
import { makePack } from '../../../src/engine/core/pack.ts';
import type { PackBody } from '../../../src/engine/core/pack.ts';
import { loadPools } from '../../../src/engine/sports/nfl/sim/pools.ts';
import { runGame, TEAMS } from '../../../src/engine/sports/nfl/sim/game.ts';
import { clockLabel, gameView } from '../../../src/engine/sports/nfl/view/gameView.ts';

// The box score view (the dev page renders it): every screen is a sum of the same events, so the screens must agree with each other.
const P = loadPools(makePack(JSON.parse(fs.readFileSync(new URL('../../../data/packs/nfl-pools-fit2016-2022.json', import.meta.url), 'utf8')) as PackBody));

test('clock labels: regulation counts DOWN in the quarter, overtime counts UP into overtime, never a quarter past Q4', () => {
  assert.equal(clockLabel(0, false), 'Q1 15:00'); assert.equal(clockLabel(899, false), 'Q1 0:01'); assert.equal(clockLabel(900, false), 'Q1 0:00');
  assert.equal(clockLabel(3599, false), 'Q4 0:01'); assert.equal(clockLabel(3600, false), 'Q4 0:00');
  assert.equal(clockLabel(3600, true), 'OT 0:00'); assert.equal(clockLabel(3750, true), 'OT 2:30');
});

test('the box score agrees with itself over 300 games: final = totals = last scoring line; drives and plays add up', () => {
  let ot = 0;
  for (let n = 0; n < 300; n++) {
    const g = runGame(P, gameKeyOf('view-' + n)), v = gameView(g), [a, b] = v.teams as [typeof v.teams[0], typeof v.teams[0]];
    assert.deepEqual([a.points, b.points], [g.points[0], g.points[1]]);
    assert.deepEqual([v.final[TEAMS[0]], v.final[TEAMS[1]]], [g.points[0], g.points[1]]);
    const last = v.scoring[v.scoring.length - 1];
    if (last !== undefined) assert.deepEqual([last.away, last.home], [g.points[0], g.points[1]], `game ${n}: running score ends at the final`);
    else assert.deepEqual(g.points, [0, 0]);
    assert.equal(v.scoring.reduce((s, x) => s + (x.team === TEAMS[0] ? x.points : 0), 0), a.points, `game ${n}: scoring lines sum to team A`);
    assert.equal(v.scoring.reduce((s, x) => s + (x.team === TEAMS[1] ? x.points : 0), 0), b.points, `game ${n}: scoring lines sum to team B`);
    assert.equal(v.drives.length, a.drives + b.drives, `game ${n}: one drive row per drive`);
    assert.equal(v.drives.reduce((s, d) => s + d.secs, 0), a.top_dt + b.top_dt, `game ${n}: drive seconds = possession time`);
    assert.equal(v.drives.reduce((s, d) => s + d.yards, 0), a.passYards + a.rushYards + b.passYards + b.rushYards, `game ${n}: drive yards = pass + rush yards`);
    for (const t of [a, b]) assert.equal(t.passYards + t.rushYards, t.yards, `game ${n}: net yards = pass + rush`);
    for (const s of v.scoring) assert.match(s.when, /^(Q[1-4]|OT) \d+:\d\d$/);
    if (v.overtime) ot++;
  }
  assert.ok(ot > 0, 'overtime games were included');
});
