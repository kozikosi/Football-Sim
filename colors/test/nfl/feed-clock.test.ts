import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOT_IDS } from '../../src/sports/nfl/engine/slots.ts';
import type { SlotId } from '../../src/sports/nfl/engine/slots.ts';
import { teamRatings, spotsFromRecord } from '../../src/sports/nfl/engine/ratings.ts';
import { matchupModel, DEFAULT_PLAN } from '../../src/sports/nfl/engine/matchup.ts';
import { makeRng } from '../../src/core/rng.ts';
import { simulateGame } from '../../src/sports/nfl/engine/drives.ts';
import { gameFeed } from '../../src/sports/nfl/app/feed.ts';

// The overtime clock: a drive's clock label never shows a negative remainder or a quarter that is not 1-4, and overtime drives read "OT mm:ss" (time into overtime).
const lg = teamRatings(spotsFromRecord(Object.fromEntries(SLOT_IDS.map((s) => [s, 80])) as Record<SlotId, number>));
const mm = (o: typeof lg, d: typeof lg) => matchupModel(o, d, lg, DEFAULT_PLAN);

test('every drive clock label is well formed; regulation reads Q1-Q4 with time left, overtime reads OT with time in (regular season and playoff)', () => {
  let otDrives = 0, regDrives = 0;
  for (const playoff of [false, true]) {
    for (let i = 0; i < 1200; i++) {
      const g = simulateGame(mm(lg, lg), mm(lg, lg), makeRng(700000 + i), { playoff });
      const f = gameFeed(g, 'H', 'A');
      f.drives.forEach((d, k) => {
        const src = g.drives[k]!;
        if (src.period >= 5) {
          otDrives++;
          assert.match(d.clock, /^OT \d\d:\d\d$/, `drive ${k} of seed ${i}: ${d.clock}`);
          const [m, s] = d.clock.slice(3).split(':').map(Number) as [number, number];
          assert.equal(m * 60 + s, src.start - 3600, 'overtime clock = seconds into overtime');
        } else {
          regDrives++;
          assert.match(d.clock, /^Q[1-4] \d\d:\d\d$/, `drive ${k} of seed ${i}: ${d.clock}`);
          const q = Number(d.clock[1]), [m, s] = d.clock.slice(3).split(':').map(Number) as [number, number];
          assert.ok(m * 60 + s <= 900, 'at most 15:00 left in a quarter');
          assert.equal(900 * q - (m * 60 + s), src.start, 'time left matches the drive start');
        }
      });
    }
  }
  assert.ok(otDrives > 0 && regDrives > 0, 'both kinds of drive were checked');
});
