import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildPool, parseCsv } from '../src/engine/players.ts';
const R = fs.readFileSync(new URL('../../data/madden27-ratings.csv', import.meta.url), 'utf8');
const F = fs.readFileSync(new URL('../../data/free-agents-old-ratings.csv', import.meta.url), 'utf8');
const pool = buildPool(R, F);
test('pool size: 1,941 rated + 12 free agents, all ids unique', () => {
  assert.equal(pool.length, 1953);
  assert.equal(new Set(pool.map((p) => p.id)).size, 1953);
  assert.equal(pool.filter((p) => p.freeAgent).length, 12);
});
test('Lane Johnson is not in the project (retired); Joey Porter Jr is', () => {
  assert.ok(!pool.some((p) => p.name === 'Lane Johnson'));
  assert.ok(pool.some((p) => p.name === 'Joey Porter Jr'));
});
test('repeated names stay distinct players', () => {
  const jj = pool.filter((p) => p.name === 'Justin Jefferson');
  assert.equal(jj.length, 2); assert.notEqual(jj[0].id, jj[1].id);
});
test('every rating is a plausible integer and every player has a role', () => {
  for (const p of pool) {
    assert.ok(Number.isInteger(p.ovr) && p.ovr >= 54 && p.ovr <= 99, p.id);
    assert.ok(p.spd >= 10 && p.spd <= 99 && p.str >= 10 && p.str <= 99, p.id);
    assert.ok(p.role, p.id);
  }
});
test('draft supply: enough of each role for 32 teams x the 32-spot table', () => {
  const c = (r: string) => pool.filter((p) => p.role === r).length;
  const need: Record<string, number> = { QB: 32, RB: 64, WR: 128, TE: 96, OT: 64, OG: 64, C: 32, DT: 64, EDGE: 64, SS: 32, FS: 32, CB: 128, K: 32, P: 32 };
  for (const [r, n] of Object.entries(need)) assert.ok(c(r) >= n, `${r}: ${c(r)} < ${n}`);
  assert.ok(c('ILB') + c('OLB') >= 32 * 3);
});
test('a bad line fails loudly', () => {
  assert.throws(() => parseCsv('name,pos,team,ovr,spd,str\nX,QB,Team,abc,1,1\n', false));
  assert.throws(() => parseCsv('wrong\n', false));
});
