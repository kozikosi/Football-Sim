import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { SCHEMA_VERSION, parseEnvelope, parsePayload, restore, serialize } from '../src/app/envelope.ts';
import type { FrozenPlayer, SeasonPayload, WeekPayload } from '../src/app/envelope.ts';

const V = { engineVersion: 'e1', dataVersion: 'd1' };
const T = new Date('2026-11-02T00:00:00Z');
const fp = (i: number): FrozenPlayer => ({ id: 'P' + i + '|QB|KC', name: 'P' + i, pos: 'QB', role: 'QB', team: 'KC', ovr: 80, spd: 70, str: 60, freeAgent: false });
const roster = Array.from({ length: 32 }, (_, i) => fp(i));
const week = (): WeekPayload => ({ seed: 5, year: 2026, run: 0, gameSeed: 99, nextWeek: 3, userTeam: 'Kansas City Chiefs', roster, ratings: { x: { a: 1 } },
  schedule: [{ week: 1, home: 'A', away: 'B', kind: 'div' }], scores: [{ week: 1, home: 'A', away: 'B', hs: 20, as: 17 }], plan: null, statsRecorded: false });
const season = (): SeasonPayload => ({ seed: 5, year: 2026, run: 1, userTeam: 'Kansas City Chiefs', roster, table: [{ team: 'A', w: 10, l: 7, t: 0, pf: 300, pa: 280 }],
  userResults: [], champion: 'A', userOutcome: 'champion', statsRecorded: true });

test('envelope: week and season round-trip byte for byte through serialize and restore', () => {
  const w = serialize('week', 'B', V, week(), T), s = serialize('season', 'A', V, season(), T);
  const rw = restore(w), rs = restore(s);
  assert.ok(rw.ok && rs.ok);
  if (rw.ok) { assert.equal(rw.value.kind, 'week'); assert.equal(rw.value.slot, 'B'); assert.equal(rw.value.savedAt, '2026-11-02T00:00:00.000Z'); assert.equal(JSON.stringify(rw.value.payload), JSON.stringify(week())); }
  if (rs.ok) assert.equal(JSON.stringify(rs.value.payload), JSON.stringify(season()));
});
test('envelope: a draft payload with a compact pool round-trips', () => {
  const d = { seed: 8, userTeam: 11, picks: [{ overall: 1, team: 0, pid: 'a|QB|X', slot: 'QB' }], pool: [['p00001', 'a', 'QB', 'X', 90, 70, 60, 0], ['p00002', 'b', 'HB', 'Free Agent', 70, 80, 50, 1]] };
  const r = restore(serialize('draft', 'C', V, d, T));
  assert.ok(r.ok); if (r.ok) assert.deepEqual(r.value.payload, d);
});
test('envelope: outer shape errors are reported as corrupt, and a newer schema is its own verdict', () => {
  const good = JSON.parse(serialize('week', 'A', V, week(), T));
  const cases: [string, (e: Record<string, unknown>) => void][] = [
    ['kind', (e) => { e.kind = 'tournament'; }], ['slot', (e) => { e.slot = 'D'; }], ['savedAt', (e) => { e.savedAt = 'yesterday'; }],
    ['engineVersion', (e) => { e.engineVersion = ''; }], ['dataVersion', (e) => { delete e.dataVersion; }], ['payload', (e) => { e.payload = [1]; }], ['schemaVersion', (e) => { e.schemaVersion = 0; }],
  ];
  for (const [name, f] of cases) { const e = structuredClone(good); f(e); const r = parseEnvelope(e); assert.ok(!r.ok && r.reason === 'corrupt', name); }
  const n = structuredClone(good); n.schemaVersion = SCHEMA_VERSION + 1;
  const r = parseEnvelope(n); assert.ok(!r.ok && r.reason === 'newer-version');
  assert.ok(!restore('{not json').ok); assert.ok(!restore('null').ok);
});
test('envelope: inner shape errors are caught (roster size, scores, outcome, flags)', () => {
  const mk = (kind: 'week' | 'season', f: (p: Record<string, unknown>) => void) => { const p = JSON.parse(JSON.stringify(kind === 'week' ? week() : season())); f(p); return restore(JSON.stringify({ kind, schemaVersion: 1, ...V, slot: 'A', savedAt: '2026-11-02T00:00:00Z', payload: p })); };
  assert.ok(!mk('week', (p) => { (p.roster as unknown[]).pop(); }).ok);
  assert.ok(!mk('week', (p) => { (p.scores as Record<string, unknown>[])[0].hs = 1.5; }).ok);
  assert.ok(!mk('week', (p) => { p.statsRecorded = 'yes'; }).ok);
  assert.ok(!mk('week', (p) => { p.nextWeek = 0; }).ok);
  assert.ok(!mk('season', (p) => { p.userOutcome = 'won it all'; }).ok);
  assert.ok(!mk('season', (p) => { (p.roster as Record<string, unknown>[])[3].ovr = null; }).ok);
  assert.ok(mk('season', () => {}).ok);
  const env = parseEnvelope({ kind: 'week', schemaVersion: 1, ...V, slot: 'A', savedAt: '2026-11-02T00:00:00Z', payload: { seed: 1.5 } });
  assert.ok(env.ok && !parsePayload(env.value).ok);
});
test('envelope: serialize refuses what JSON would silently change', () => {
  for (const bad of [{ ...week(), seed: NaN }, { ...week(), plan: { m: new Map() } }, { ...week(), plan: { u: undefined } }, { ...week(), plan: { s: new Set() } }, { ...week(), gameSeed: Infinity }])
    assert.throws(() => serialize('week', 'A', V, bad, T), /not plain JSON/);
});
test('envelope: the file imports nothing, so storage can copy it', () => {
  const src = fs.readFileSync(new URL('../src/app/envelope.ts', import.meta.url), 'utf8');
  assert.equal(/^\s*import\s/m.test(src), false);
});
