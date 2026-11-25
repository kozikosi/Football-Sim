// DATA-GATED (test/DATA-GATED.json): the deploy-time asset gives the same board, data version and season as a build-time import of the real files.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildAsset, parseAsset, userDataset } from '../../src/boot/dataset-asset.ts';
import { freezePool, thawPool } from '../../src/sports/nfl/app/store.ts';
import { dataVersion } from '../../src/sports/nfl/app/versions.ts';
import { DEFAULT_CONFIG, newDraft, runDraft } from '../../src/sports/nfl/engine/draft.ts';
import { makeRng } from '../../src/core/rng.ts';
import { pool } from '../nfl/fixture.ts';

const read = (n: string) => fs.readFileSync(new URL('../../../data/nfl/' + n, import.meta.url), 'utf8');
const files = () => ({ ratings: read('madden27-ratings.csv'), freeAgents: read('free-agents-old-ratings.csv'), ids: read('player-ids.csv') });
const picks = (players: typeof pool, seed: number) => {
  const rng = makeRng(seed), st = newDraft(players, rng.fork('draft'), DEFAULT_CONFIG);
  runDraft(st, rng.fork('run'));
  return st.log.map((p) => [p.overall, p.team, p.slot, p.player.id]);
};

test('real data: the asset board and data version equal the build-time import', async () => {
  const made = await buildAsset(files()), loaded = await parseAsset(made.text);
  assert.ok(loaded.ok);
  assert.deepEqual(loaded.value.rows, freezePool(pool));
  assert.equal(loaded.value.hash, await dataVersion(freezePool(pool)));
});

test('real data: a draft on the loaded board is pick for pick the build-time draft', async () => {
  const loaded = await parseAsset((await buildAsset(files())).text);
  assert.ok(loaded.ok);
  const board = thawPool(loaded.value.rows as ReturnType<typeof freezePool>);
  const built = thawPool(freezePool(pool));
  for (const seed of [1, 777]) assert.deepEqual(picks(board, seed), picks(built, seed));
});

test('real data: the shipped ratings file imports as a user file', async () => {
  const r = await userDataset(read('madden27-ratings.csv'));
  assert.ok(r.ok, r.ok ? '' : r.error.message);
  assert.ok(r.value.rows.length > 1800);
});
