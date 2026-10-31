import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inSeasonKickerRating, kickerIsKeyPlayer, leagueMakeProb } from '../src/engine/kicking.ts';
import type { Kick } from '../src/engine/kicking.ts';
const k = (dist: number, made: boolean): Kick => ({ dist, made });
test('no kicks: the preseason rating stands', () => assert.equal(inSeasonKickerRating(82, []), 82));
test('Owner case: an 82 who goes 2/4 in week 1 is not a key player', () => {
  const r = inSeasonKickerRating(82, [k(40, true), k(45, false), k(38, true), k(50, false)]);
  assert.ok(r < 80, `rating ${r}`); assert.equal(kickerIsKeyPlayer(r), false);
});
test('Owner case: a 78 who makes everything, including two from 55+, earns key-player status', () => {
  const r = inSeasonKickerRating(78, [k(35, true), k(38, true), k(41, true), k(44, true), k(47, true), k(56, true), k(58, true)]);
  assert.ok(r >= 80, `rating ${r}`);
});
test('a long make is worth more than a short make', () => {
  const short = inSeasonKickerRating(78, [k(30, true)]), long = inSeasonKickerRating(78, [k(60, true)]);
  assert.ok(long > short);
});
test('monotone: turning a miss into a make never lowers the rating', () => {
  for (const d of [25, 40, 50, 60]) assert.ok(inSeasonKickerRating(78, [k(d, true)]) > inSeasonKickerRating(78, [k(d, false)]));
});
test('bounded movement', () => {
  const miss = Array.from({ length: 40 }, () => k(30, false)), make = Array.from({ length: 40 }, () => k(60, true));
  assert.ok(inSeasonKickerRating(80, miss) >= 64); assert.ok(inSeasonKickerRating(80, make) <= 90);
});
test('league curve falls with distance', () => {
  let prev = 1; for (let d = 18; d <= 70; d += 2) { const p = leagueMakeProb(d); assert.ok(p <= prev); prev = p; }
});
