import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildPool, parseCsv } from '../src/engine/players.ts';
import { formatIds, formatPid, parseIds, syncIds } from '../src/engine/playerids.ts';
const rd = (n: string) => fs.readFileSync(new URL('../../data/' + n, import.meta.url), 'utf8');
const R = rd('madden27-ratings.csv'), F = rd('free-agents-old-ratings.csv'), I = rd('player-ids.csv');
const cur = [...parseCsv(R, false), ...parseCsv(F, true)].map((p) => ({ name: p.name, pos: p.pos, team: p.team }));

test('the committed crosswalk covers the data exactly: sync would change nothing', () => {
  const r = syncIds(parseIds(I), cur);
  assert.equal(r.added.length, 0); assert.equal(r.moved.length, 0); assert.equal(r.gone.length, 0);
  assert.equal(formatIds(r.rows), I, 'round trip is byte-identical');
});
test('pool ids are pids, unique, in file order', () => {
  const pool = buildPool(R, F, I);
  assert.equal(pool.length, 1953);
  assert.equal(pool[0].id, 'p00001'); assert.equal(pool[1952].id, formatPid(1953));
  assert.ok(pool.every((p) => /^p\d{5}$/.test(p.id)));
  assert.equal(new Set(pool.map((p) => p.id)).size, 1953);
});
test('a player with no crosswalk row fails loudly', () => {
  const short = I.split('\n').filter((l) => !l.includes("Ja'Marr Chase")).join('\n');
  assert.throws(() => buildPool(R, F, short), /no stable id for Ja'Marr Chase\|WR\|Cincinnati Bengals/);
});
test('a duplicate pid or key in the crosswalk is rejected', () => {
  assert.throws(() => parseIds('pid,name,pos,team\np00001,A,QB,X\np00001,B,QB,X\n'), /duplicate pid/);
  assert.throws(() => parseIds('pid,name,pos,team\np00001,A,QB,X\np00002,A,QB,X\n'), /duplicate key/);
  assert.throws(() => parseIds('wrong\n'), /header/);
});
test('sync: a team change keeps the pid; a new player gets the next pid; a departed player keeps his row and his pid is never reused', () => {
  const old = parseIds('pid,name,pos,team\np00001,Ann,QB,Red\np00002,Bob,WR,Red\np00003,Cy,CB,Red\n');
  const r = syncIds(old, [{ name: 'Ann', pos: 'QB', team: 'Blue' }, { name: 'Bob', pos: 'WR', team: 'Red' }, { name: 'Dee', pos: 'K', team: 'Red' }]);
  assert.deepEqual(r.moved, [{ pid: 'p00001', from: 'Red', to: 'Blue' }]);
  assert.deepEqual(r.added.map((x) => x.pid), ['p00004']);
  assert.deepEqual(r.gone.map((x) => x.pid), ['p00003']);
  assert.equal(r.rows.find((x) => x.pid === 'p00001')!.team, 'Blue');
  const again = syncIds(r.rows, [{ name: 'Cy', pos: 'CB', team: 'Red' }]);
  assert.deepEqual(again.added, [], 'a returning player is matched to his old row'); assert.equal(again.rows.length, 4);
});
test('sync: two new players with the same name and position are never guessed to be an old one', () => {
  const old = parseIds('pid,name,pos,team\np00001,Sam Lee,WR,Red\n');
  const r = syncIds(old, [{ name: 'Sam Lee', pos: 'WR', team: 'Blue' }, { name: 'Sam Lee', pos: 'WR', team: 'Green' }]);
  assert.equal(r.moved.length, 0); assert.equal(r.added.length, 2); assert.equal(r.gone.length, 1);
});
