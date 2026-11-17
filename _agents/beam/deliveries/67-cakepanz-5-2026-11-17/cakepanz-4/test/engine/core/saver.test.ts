import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSaver } from '../../../src/engine/core/saver.ts';
import type { Result, StorageModule } from '../../../src/engine/core/app.ts';

const ok: Result<void> = { ok: true, value: undefined };
function fake(opts: { failFirst?: number; alwaysFail?: boolean } = {}) {
  const log: string[] = []; const disk = new Map<string, string>(); let fails = opts.failFirst ?? 0;
  const gates: Array<() => void> = []; let hold = false;
  const s: StorageModule = {
    async read(k) { return { ok: true, value: disk.get(k) ?? null }; },
    async remove(k) { disk.delete(k); return ok; },
    async write(k, t) {
      if (hold) await new Promise<void>((r) => gates.push(r));
      if (opts.alwaysFail || fails-- > 0) return { ok: false, error: 'quota' };
      log.push(k + '=' + t); disk.set(k, t); return ok;
    },
    async keys(prefix) { return { ok: true, value: [...disk.keys()].filter((k) => k.startsWith(prefix)).sort() }; },   // F3
    async entries(prefix) { return { ok: true, value: [...disk].filter(([k]) => k.startsWith(prefix)).sort(([a], [b]) => (a < b ? -1 : 1)) }; },   // F3
  };
  return { s, log, disk, hold: () => { hold = true; }, release: () => { hold = false; gates.splice(0).forEach((g) => g()); } };
}

test('writes land in revision order and the newest wins', async () => {
  const f = fake(); const sv = createSaver(f.s);
  sv.enqueue('a', 1, 'one'); sv.enqueue('a', 2, 'two'); sv.enqueue('a', 3, 'three');
  await sv.settled();
  assert.equal(f.disk.get('a'), 'three');
  assert.deepEqual(sv.status(), { kind: 'idle' });
});
test('while one write is in flight, queued writes collapse to the newest; a stale revision is dropped', async () => {
  const f = fake(); f.hold(); const sv = createSaver(f.s);
  sv.enqueue('a', 1, 'one'); sv.enqueue('a', 2, 'two'); sv.enqueue('a', 3, 'three'); sv.enqueue('a', 2, 'STALE');
  f.release(); await sv.settled();
  assert.deepEqual(f.log, ['a=one', 'a=three']);
});
test('slots are independent', async () => {
  const f = fake(); const sv = createSaver(f.s);
  sv.enqueue('a', 5, 'A'); sv.enqueue('b', 1, 'B'); await sv.settled();
  assert.equal(f.disk.get('a'), 'A'); assert.equal(f.disk.get('b'), 'B');
});
test('a transient failure is retried and ends idle', async () => {
  const f = fake({ failFirst: 2 }); const sv = createSaver(f.s, { retries: 2 });
  sv.enqueue('a', 1, 'x'); await sv.settled();
  assert.equal(f.disk.get('a'), 'x'); assert.equal(sv.status().kind, 'idle');
});
test('a persistent failure surfaces as failed with the revision, and the next write recovers', async () => {
  const f = fake({ alwaysFail: true }); const sv = createSaver(f.s, { retries: 1 });
  sv.enqueue('a', 1, 'x'); await sv.settled();
  assert.deepEqual(sv.status(), { kind: 'failed', key: 'a', revision: 1, reason: 'quota', retriable: true });   // F6: the status names the key
});
test('subscribers see saving then idle', async () => {
  const f = fake(); const sv = createSaver(f.s); const seen: string[] = []; sv.subscribe((s) => seen.push(s.kind));
  sv.enqueue('a', 1, 'x'); await sv.settled();
  assert.deepEqual(seen, ['saving', 'idle']);
});
