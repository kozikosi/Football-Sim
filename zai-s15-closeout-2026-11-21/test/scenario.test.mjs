import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const server = await createServer({
  root,
  configFile: false,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'silent',
});
const scenarios = await server.ssrLoadModule('/src/lib/dev/scenario.ts');
const SEED = 935613;

test('board scenario uses the live board VM and exposes three suggested rows', () => {
  const snapshot = scenarios.createScenario(SEED, 'board-top-three');
  scenarios.assertScenario(snapshot);
  assert.equal(snapshot.screen, 'board');
  assert.ok(snapshot.board);
  assert.ok(snapshot.suggestedIds.length >= 3);
  const rendered = new Set(snapshot.board.rows.map((row) => row.id));
  for (const id of snapshot.suggestedIds) assert.ok(rendered.has(id));
});

test('share scenario uses the real brag-copy function without leaking the seed', () => {
  const snapshot = scenarios.createScenario(SEED, 'share-paste');
  scenarios.assertScenario(snapshot);
  assert.match(snapshot.shareText, /I went 17-0 and won the Super Bowl/);
  assert.match(snapshot.shareText, /Can you go 20-0\?/);
  assert.doesNotMatch(snapshot.shareText, /b36:|\?seed=/);
});

test('finished-draft scenario completes the real store through 1,024 picks', () => {
  const snapshot = scenarios.createScenario(SEED, 'finished-draft');
  scenarios.assertScenario(snapshot);
  assert.equal(snapshot.status, 'done');
  assert.equal(snapshot.screen, 'complete');
  assert.equal(snapshot.record.picks.length, 1024);
});

test('a damaged scenario fixture is rejected by its acceptance assertion', () => {
  const snapshot = structuredClone(scenarios.createScenario(SEED, 'board-top-three'));
  snapshot.suggestedIds = snapshot.suggestedIds.slice(0, 2);
  assert.throws(() => scenarios.assertScenario(snapshot), /at least three suggested rows/);
});

test('scenario receipts are stable for the same seed and state', async () => {
  const a = scenarios.createScenario(SEED, 'share-paste');
  const b = scenarios.createScenario(SEED, 'share-paste');
  const ra = await scenarios.createScenarioReceipt(a);
  const rb = await scenarios.createScenarioReceipt(b);
  assert.deepEqual(ra, rb);
});

test.after(async () => {
  await server.close();
});
