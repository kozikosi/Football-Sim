import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { formatPid, parsePid, sportOfPid } from '../../src/core/ids.ts';
import { globalKey, isOurKey, sportKey, sportOfKey } from '../../src/core/keys.ts';
import { emptyProfile, parseProfile, patchSport, sportBlock } from '../../src/core/profile.ts';
import { parseEnvelope, serialize, SPORT_IDS } from '../../src/core/envelope.ts';
import { restore, serialize as serializeNfl } from '../../src/sports/nfl/app/saves.ts';
import { migrateFlatProfile, nflProfile, patchNfl } from '../../src/sports/nfl/app/profile.ts';
import { migrateLegacy, PLAYER_NAMES_KEY } from '../../src/sports/nfl/app/legacy.ts';
import type { MigratableKv } from '../../src/sports/nfl/app/legacy.ts';

test('ids: a player id names its sport; each sport counts from 1; bad input is refused', () => {
  assert.equal(formatPid('nfl', 1), 'nfl-p00001'); assert.equal(formatPid('nba', 123456), 'nba-p123456');
  assert.deepEqual(parsePid('nfl-p00042'), { sport: 'nfl', n: 42 }); assert.equal(sportOfPid('nba-p00001'), 'nba');
  for (const bad of ['p00001', 'nfl-00001', 'NFL-p00001', 'nfl-p1', 'nfl_p00001', '']) assert.equal(parsePid(bad), null, bad);
  assert.throws(() => formatPid('NFL', 1)); assert.throws(() => formatPid('nfl', 0)); assert.throws(() => formatPid('1nfl', 1));
  assert.notEqual(formatPid('nfl', 7), formatPid('nba', 7), 'the same number in two sports is two different ids');
});

test('keys: sim:<name> is shared, sim:<sport>:<name> belongs to one sport, nothing else is accepted', () => {
  assert.equal(globalKey('theme'), 'sim:theme'); assert.equal(sportKey('nfl', 'tab'), 'sim:nfl:tab'); assert.equal(sportKey('nfl', 'slot:A:bak'), 'sim:nfl:slot:A:bak');
  assert.equal(sportOfKey('sim:nfl:slot:A'), 'nfl'); assert.equal(sportOfKey('sim:theme'), null); assert.equal(sportOfKey('zpb:tab'), null);
  assert.ok(isOurKey('sim:theme') && !isOurKey('zpb:theme'));
  assert.throws(() => sportKey('NFL', 'tab')); assert.throws(() => sportKey('nfl', '')); assert.throws(() => sportKey('nfl', 'a::b')); assert.throws(() => sportKey('nfl', 'a b'));
  assert.throws(() => sportKey('theme', 'tab'), /cannot be called/); assert.throws(() => globalKey('tab' as never));
  assert.notEqual(sportKey('nfl', 'slot:A'), sportKey('nba', 'slot:A'), 'two sports never share a slot');
});

test('profile container: a sport patch leaves every other sport (even one this build does not know) untouched', () => {
  let p = emptyProfile(); p.createdAt = '2026-11-01T00:00:00Z';
  p = patchSport(p, 'nfl', { lastTeam: 'KC' });
  const future = { ...p, sports: { ...p.sports, nba: { lastTeam: 'LAL', achievements: [1] } } };
  const again = patchSport(parseProfile(JSON.parse(JSON.stringify(future)))!, 'nfl', { lastTeam: 'BUF' });
  assert.deepEqual(sportBlock(again, 'nba'), { lastTeam: 'LAL', achievements: [1] });
  assert.deepEqual(sportBlock(again, 'nfl'), { lastTeam: 'BUF' }); assert.equal(again.createdAt, '2026-11-01T00:00:00Z');
  assert.equal(parseProfile({ v: 1 }), null); assert.equal(parseProfile(null), null); assert.equal(parseProfile({ v: 2, createdAt: 5, sports: {} }), null); assert.equal(parseProfile({ v: 2, createdAt: null, sports: { nfl: 3 } }), null);
});
test('profile migration: the shell\'s flat profile moves under sports.nfl, once, losing nothing', () => {
  const flat = { createdAt: '2026-10-01T00:00:00Z', lastTeam: 'Buffalo Bills', lastPlayedAt: '2026-11-02T00:00:00Z', achievements: [{ id: 'sb1', label: 'Champion', at: '2026-11-02T00:00:00Z', team: 'Buffalo Bills' }] };
  const v2 = migrateFlatProfile(flat);
  assert.equal(v2.v, 2); assert.equal(v2.createdAt, flat.createdAt);
  assert.deepEqual(nflProfile(v2), { lastTeam: flat.lastTeam, lastPlayedAt: flat.lastPlayedAt, achievements: flat.achievements });
  assert.ok(!('lastTeam' in v2) && !('achievements' in v2), 'no football field is left at the top level');
  assert.deepEqual(migrateFlatProfile(JSON.parse(JSON.stringify(v2))), v2, 'running it again changes nothing');
  assert.deepEqual(nflProfile(migrateFlatProfile(null)), { lastTeam: null, lastPlayedAt: null, achievements: [] });
  assert.deepEqual(nflProfile(migrateFlatProfile({ achievements: 'x', lastTeam: 4 })), { lastTeam: null, lastPlayedAt: null, achievements: [] });
  assert.equal(nflProfile(patchNfl(emptyProfile(), { lastTeam: 'X' })).lastTeam, 'X');
});

test('envelope: every save names its sport and the sport\'s kinds are checked; another sport\'s save is refused by the NFL reader', () => {
  assert.deepEqual([...SPORT_IDS], ['nfl']);
  const V = { engineVersion: 'nfl1.x', dataVersion: 'd' }, T = new Date('2026-11-04T00:00:00Z');
  const text = serializeNfl('draft', 'A', V, { seed: 1, userTeam: 0, picks: [], pool: [] }, T);
  assert.equal(JSON.parse(text).sport, 'nfl');
  assert.throws(() => serialize('nfl', 'quarter' as never, 'A', V, {}, T), /no save kind/);
  const o = JSON.parse(text); o.sport = 'nba';
  assert.equal(parseEnvelope(o).ok, false, 'a sport this build does not know is not read');
  const noSport = JSON.parse(text); delete noSport.sport;
  const r = parseEnvelope(noSport); assert.ok(r.ok && r.value.sport === 'nfl', 'a save from before the field existed reads as nfl');
  assert.ok(restore(text).ok);
});

// ---- the one-time move of the shell's old keys ----
const mem = (init: Record<string, string> = {}): MigratableKv & { m: Map<string, string> } => { const m = new Map(Object.entries(init)); return { m, getItem: (k) => m.get(k) ?? null, setItem: (k, v) => void m.set(k, v), removeItem: (k) => void m.delete(k), keys: () => [...m.keys()] }; };
const pidsByName: Record<string, string[]> = { 'Josh Allen': ['nfl-p00003'], 'Justin Jefferson': ['nfl-p00010', 'nfl-p01500'] };
const lookup = (n: string) => pidsByName[n] ?? [];
const OLD = () => ({
  'zpb:theme': 'dark', 'zpb:tab': 'view-draft|btn-draft', 'zpb:base34': '1', 'zpb:st:settings': '{"cinematicsReduced":true}', 'zpb:st:stats': '{"games":3}', 'zpb:st:stats:applied': '{"a":1}',
  'zpb:st:profile': JSON.stringify({ createdAt: '2026-10-01T00:00:00Z', lastTeam: 'Buffalo Bills', lastPlayedAt: null, achievements: [] }),
  'zpb:st:slot:A': '{"kind":"week"}', 'zpb:st:slot:A:bak': '{"kind":"week","old":1}', 'zpb:st:slot:B:tmp': '{half', 'zpb:st:slot:C:del': '1',
  'zpbPlayerProfiles': JSON.stringify({ 'Josh Allen': 'Josh the Great', 'Justin Jefferson': 'JJ', 'Nobody Here': 'X' }),
  'unrelated': 'keep me', 'zpb:st:mystery': '1',
});
test('legacy move: every old key lands under sim:, old keys are gone, unrelated keys are untouched', () => {
  const kv = mem(OLD()), rep = migrateLegacy(kv, lookup);
  const get = (k: string) => kv.m.get(k);
  assert.equal(get('sim:theme'), 'dark'); assert.equal(get('sim:nfl:tab'), 'view-draft|btn-draft'); assert.equal(get('sim:nfl:base34'), '1');
  assert.equal(get('sim:settings'), '{"cinematicsReduced":true}'); assert.equal(get('sim:nfl:stats'), '{"games":3}'); assert.equal(get('sim:nfl:stats:applied'), '{"a":1}');
  assert.equal(get('sim:nfl:slot:A'), '{"kind":"week"}'); assert.equal(get('sim:nfl:slot:A:bak'), '{"kind":"week","old":1}'); assert.equal(get('sim:nfl:slot:C:del'), '1');
  assert.equal(get('sim:nfl:slot:B:tmp'), undefined, 'a half-written temp slot is dropped, not carried over'); assert.deepEqual(rep.dropped, ['zpb:st:slot:B:tmp']);
  const prof = JSON.parse(get('sim:profile')!); assert.equal(prof.v, 2); assert.equal(prof.sports.nfl.lastTeam, 'Buffalo Bills'); assert.equal(prof.createdAt, '2026-10-01T00:00:00Z');
  assert.equal(get('unrelated'), 'keep me');
  for (const k of ['zpb:theme', 'zpb:tab', 'zpb:base34', 'zpb:st:settings', 'zpb:st:stats', 'zpb:st:profile', 'zpb:st:slot:A', 'zpb:st:slot:A:bak']) assert.equal(get(k), undefined, k);
  assert.deepEqual(rep.kept.map((x) => x[0]).sort(), ['zpb:st:mystery', 'zpbPlayerProfiles'], 'only what cannot be moved cleanly stays');
});
test('legacy move: player names are keyed by player id; a name shared by two players or matching nobody is NOT guessed', () => {
  const kv = mem(OLD()), rep = migrateLegacy(kv, lookup);
  assert.deepEqual(JSON.parse(kv.m.get(PLAYER_NAMES_KEY)!), { 'nfl-p00003': 'Josh the Great' });
  assert.equal(rep.names.moved, 1); assert.deepEqual(rep.names.ambiguous, ['Justin Jefferson']); assert.deepEqual(rep.names.unknown, ['Nobody Here']);
  assert.deepEqual(JSON.parse(kv.m.get('zpbPlayerProfiles')!), { 'Justin Jefferson': 'JJ', 'Nobody Here': 'X' }, 'the two unresolved names stay in the old key for the user to re-enter or for a later pass');
});
test('legacy move: running twice moves nothing the second time; an existing different new key is never overwritten', () => {
  const kv = mem(OLD()); migrateLegacy(kv, lookup);
  const snap = JSON.stringify([...kv.m.entries()].sort());
  const again = migrateLegacy(kv, lookup); assert.equal(JSON.stringify([...kv.m.entries()].sort()), snap); assert.equal(again.moved.length, 0);
  const kv2 = mem({ 'zpb:theme': 'dark', 'sim:theme': 'light' }); const r2 = migrateLegacy(kv2, lookup);
  assert.equal(kv2.m.get('sim:theme'), 'light'); assert.equal(kv2.m.get('zpb:theme'), 'dark'); assert.deepEqual(r2.kept, [['zpb:theme', 'new key already holds a different value']]);
  const kv3 = mem({ 'zpb:theme': 'dark', 'sim:theme': 'dark' }); migrateLegacy(kv3, lookup); assert.equal(kv3.m.get('zpb:theme'), undefined, 'an identical new key lets the old one go');
});
test('legacy move: a full or blocked store loses nothing (the old keys stay and are reported); a corrupt profile is kept, not replaced', () => {
  const kv = mem({ 'zpb:tab': 'x', 'zpb:st:profile': '{broken' }); const set = kv.setItem; kv.setItem = (k) => { if (k === 'sim:nfl:tab') throw new Error('quota'); void set; };
  const rep = migrateLegacy(kv, lookup);
  assert.equal(kv.m.get('zpb:tab'), 'x'); assert.equal(kv.m.get('zpb:st:profile'), '{broken');
  assert.deepEqual(rep.kept.map((x) => x[0]).sort(), ['zpb:st:profile', 'zpb:tab']);
});

// ---- layout rules, enforced ----
const SRC = new URL('../../src/', import.meta.url).pathname;
const tsFiles = (d: string): string[] => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? tsFiles(path.join(d, e.name)) : e.name.endsWith('.ts') ? [path.join(d, e.name)] : []));
const importsOf = (f: string): string[] => [...fs.readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1').matchAll(/(?:import|export)[^;'"]*?from\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
test('layout: core imports only core; a sport imports only core and itself, never another sport', () => {
  const sports = fs.readdirSync(path.join(SRC, 'sports'));
  assert.ok(sports.includes('nfl'));
  for (const f of tsFiles(path.join(SRC, 'core'))) for (const i of importsOf(f)) assert.match(i, /^\.\/[\w-]+\.ts$/, `${path.relative(SRC, f)} imports ${i}`);
  for (const s of sports) for (const f of tsFiles(path.join(SRC, 'sports', s))) for (const i of importsOf(f)) {
    const target = path.resolve(path.dirname(f), i), rel = path.relative(SRC, target);
    assert.ok(rel.startsWith('core' + path.sep) || rel.startsWith(path.join('sports', s) + path.sep), `${path.relative(SRC, f)} imports ${rel}`);
  }
});
test('layout: the files storage may copy (envelope, keys) import nothing', () => {
  for (const f of ['envelope.ts', 'keys.ts']) assert.deepEqual(importsOf(path.join(SRC, 'core', f)), [], f);
});
test('layout: core has no DOM, storage, clock or Math.random', () => {
  for (const f of tsFiles(path.join(SRC, 'core'))) {
    const src = fs.readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
    for (const bad of [/\bdocument\b/, /\bwindow\b/, /\blocalStorage\b/, /\bsessionStorage\b/, /\bMath\.random\b/, /\bDate\.now\b/, /\bnew Date\b/, /\bprocess\./]) assert.ok(!bad.test(src), `${path.basename(f)} ${bad}`);
  }
});
