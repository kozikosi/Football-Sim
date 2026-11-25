// The deploy-time dataset asset (T1): player data is served beside the build and never committed. Data-free tests (synthetic rows).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { buildAsset, parseAsset, userDataset, createBootDatasetLoader, DATASET_ASSET_URL } from '../../src/boot/dataset-asset.ts';
import { buildPool } from '../../src/sports/nfl/engine/players.ts';
import { formatIds, syncIds } from '../../src/sports/nfl/engine/playerids.ts';
import { freezePool, thawPool } from '../../src/sports/nfl/app/store.ts';
import { dataVersion } from '../../src/sports/nfl/app/versions.ts';
import { newDraft, runDraft } from '../../src/sports/nfl/engine/draft.ts';
import { makeRng } from '../../src/core/rng.ts';
import { ratingsCsv, EMPTY_FA } from './synth.ts';

const files = (ratings = ratingsCsv()) => {
  const players = ratings.trim().split('\n').slice(1).map((l) => { const [name, pos, team] = l.split(',') as [string, string, string]; return { name, pos, team }; });
  return { ratings, freeAgents: EMPTY_FA, ids: formatIds(syncIds([], players).rows) };
};
const ok = <T>(r: { ok: true; value: T } | { ok: false; error: unknown }): T => { assert.ok(r.ok, JSON.stringify(r)); return r.value; };
const bad = <E>(r: { ok: true; value: unknown } | { ok: false; error: E }): E => { assert.ok(!r.ok, 'expected a failure'); return r.error; };
const res = (status: number, body: string, type = 'application/json') => async () => new Response(body, { status, headers: { 'content-type': type } });

test('asset: round trip gives exactly the pool and data stamp that building from the CSVs gives', async () => {
  const f = files(), direct = freezePool(buildPool(f.ratings, f.freeAgents, f.ids));
  const loaded = ok(await parseAsset((await buildAsset(f)).text));
  assert.deepEqual(loaded.rows, direct);
  assert.equal(loaded.hash, await dataVersion(direct));
  assert.equal(loaded.source, 'bundled');
  assert.ok(!loaded.rows.some((r) => r[2] === 'LS'), 'long snappers are never on the board');
});

test('asset: a file whose rows no longer match its declared dataVersion is refused', async () => {
  const a = JSON.parse((await buildAsset(files())).text);
  a.files.ratings = a.files.ratings.replace(/,(\d+),(\d+),(\d+)\n/, ',99,99,99\n');
  assert.match(bad(await parseAsset(JSON.stringify(a))).message, /does not match/);
});

test('asset: wrong schema, wrong sport, missing file and non-JSON are refused, never thrown', async () => {
  const a = JSON.parse((await buildAsset(files())).text);
  for (const broken of [{ ...a, schema: 'dataset-asset/2' }, { ...a, sport: 'nba' }, { ...a, files: { ratings: a.files.ratings } }, null, 7, []])
    bad(await parseAsset(JSON.stringify(broken)));
  bad(await parseAsset('not json'));
});

test('asset: a pool too small to finish a 32-team draft is refused', async () => {
  await assert.rejects(buildAsset(files(ratingsCsv({ qb: 40, other: 900 }))), /1024/);
  await assert.rejects(buildAsset(files(ratingsCsv({ qb: 31, other: 1100 }))), /32 quarterbacks/);
});

test('asset: the smallest accepted pool really does finish a full draft', async () => {
  const rows = ok(await parseAsset((await buildAsset(files(ratingsCsv({ qb: 32, other: 1024, ls: 0 })))).text)).rows;
  for (const seed of [1, 2, 3]) {
    const rng = makeRng(seed), st = newDraft(thawPool(rows), rng.fork('draft'));
    runDraft(st, rng.fork('run'));
    assert.equal(st.pos, st.order.length);
  }
});

test('user CSV: the six-column ratings file imports, drafts, and takes ids that cannot collide with the shipped ones', async () => {
  const v = ok(await userDataset(ratingsCsv()));
  assert.equal(v.source, 'user');
  assert.ok(v.rows.every((r) => /^nfl-p9\d{4}$/.test(r[0])), v.rows[0]![0]);
  assert.equal(new Set(v.rows.map((r) => r[0])).size, v.rows.length);
  assert.deepEqual(ok(await userDataset(ratingsCsv())).rows, v.rows, 'same file, same ids');
});

test('user CSV: bad files give a plain message with the expected header', async () => {
  for (const [text, want] of [['', /name,pos,team,ovr,spd,str/], ['id,name\n1,x\n', /name,pos,team,ovr,spd,str/], [ratingsCsv({ other: 100 }), /1024/], [ratingsCsv() + 'Synth Player 1,QB,Team 1,60,60,60\n', /duplicate/], ['name,pos,team,ovr,spd,str\n' + 'x\n'.repeat(60_001), /60,000/]] as const) {
    const e = bad(await userDataset(text));
    assert.equal(e.code, 'user-invalid');
    assert.match(e.message, want);
  }
});

test('loader: no asset on the host means the empty state, including the single-page-app HTML fallback', async () => {
  for (const f of [res(404, 'not found', 'text/plain'), res(200, '<!doctype html><title>x</title>', 'text/html; charset=utf-8'), res(200, '  <!DOCTYPE html>', 'application/octet-stream')])
    assert.equal(bad(await createBootDatasetLoader({ fetch: f }).load()).code, 'no-dataset');
});

test('loader: a server or network failure is reported as retryable, a broken asset as broken, and nothing throws', async () => {
  const e1 = bad(await createBootDatasetLoader({ fetch: res(503, 'x') }).load());
  const e2 = bad(await createBootDatasetLoader({ fetch: async () => { throw new Error('offline'); } }).load());
  const e3 = bad(await createBootDatasetLoader({ fetch: res(200, '{"schema":"nope"}') }).load());
  assert.deepEqual([e1.code, e2.code, e3.code], ['bundled-missing', 'bundled-missing', 'bundled-missing']);
  assert.match(e1.message, /try again/); assert.match(e2.message, /try again/); assert.doesNotMatch(e3.message, /try again/);
});

test('loader: a good asset loads from the fixed URL; a stored user CSV wins and is revalidated', async () => {
  const { text } = await buildAsset(files()); let asked = '';
  const fetchOk = async (u: string) => { asked = u; return new Response(text, { status: 200, headers: { 'content-type': 'application/json' } }); };
  assert.equal(ok(await createBootDatasetLoader({ fetch: fetchOk }).load()).source, 'bundled');
  assert.equal(asked, DATASET_ASSET_URL);
  asked = '';
  assert.equal(ok(await createBootDatasetLoader({ fetch: fetchOk, stored: async () => ratingsCsv() }).load()).source, 'user');
  assert.equal(asked, '', 'no request when the user file is used');
  assert.equal(bad(await createBootDatasetLoader({ fetch: fetchOk, stored: async () => 'junk' }).load()).code, 'user-invalid');
  assert.equal(ok(await createBootDatasetLoader({ fetch: fetchOk, stored: async () => { throw new Error('storage blocked'); } }).load()).source, 'bundled');
});

test('loader: fetch is called unbound, so passing the browser fetch itself works', async () => {
  const { text } = await buildAsset(files());
  // What window.fetch does when called as a method of some other object.
  const strict = async function (this: unknown): Promise<Response> { if (this !== undefined) throw new TypeError('Illegal invocation'); return new Response(text, { status: 200 }); };
  assert.equal(ok(await createBootDatasetLoader({ fetch: strict }).load()).source, 'bundled');
});

test('no source file imports a CSV: the player data cannot ride inside the bundle', () => {
  const SRC = new URL('../../src/', import.meta.url).pathname;
  const walk = (d: string): string[] => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  const CSV_IMPORT = /(?:from|import)\s*\(?\s*['"][^'"]*\.csv(\?[^'"]*)?['"]/;
  assert.ok(CSV_IMPORT.test("import x from '../../data/a.csv?raw';"), 'the check can fail');
  for (const f of walk(SRC)) { assert.ok(!f.endsWith('.csv'), f); if (/\.(ts|js|svelte)$/.test(f)) assert.ok(!CSV_IMPORT.test(fs.readFileSync(f, 'utf8')), f); }
});
