import { test } from 'node:test';
import assert from 'node:assert/strict';
import { goneDisplay } from '../src/engine/display.ts';

test('Gone% is never shown as 100 (Owner 29 Oct): certain, near-certain and rounded-up values show 99', () => {
  assert.equal(goneDisplay(1), 99);
  assert.equal(goneDisplay(0.999), 99);
  assert.equal(goneDisplay(0.996), 99);
  assert.equal(goneDisplay(1.2), 99);
});
test('Gone% below that is the plain rounded percentage, and 0 stays 0', () => {
  assert.equal(goneDisplay(0), 0);
  assert.equal(goneDisplay(0.5), 50);
  assert.equal(goneDisplay(0.984), 98);
  assert.equal(goneDisplay(-0.2), 0);
});
test('Gone% rejects NaN instead of showing a number', () => assert.throws(() => goneDisplay(Number.NaN)));

import { showInt, showDecimal, ONE_DECIMAL_KINDS } from '../src/engine/display.ts';
test('integers: every ordinary number is shown whole, half away from zero, never "-0"', () => {
  assert.equal(showInt(82.4), '82'); assert.equal(showInt(82.5), '83'); assert.equal(showInt(-2.5), '-3'); assert.equal(showInt(2.5), '3');
  assert.equal(showInt(-0.4), '0'); assert.equal(showInt(0), '0'); assert.equal(showInt(1234.9), '1235');
  assert.throws(() => showInt(Number.NaN)); assert.throws(() => showInt(Infinity));
});
test('one decimal: only QBR, wins and priority, always with exactly one decimal place, never "-0.0"', () => {
  assert.deepEqual([...ONE_DECIMAL_KINDS], ['qbr', 'wins', 'priority']);
  assert.equal(showDecimal('qbr', 98.04), '98.0'); assert.equal(showDecimal('wins', 10.25), '10.3'); assert.equal(showDecimal('wins', 10.249), '10.2');
  assert.equal(showDecimal('priority', 7), '7.0'); assert.equal(showDecimal('priority', -0.04), '0.0');
  assert.throws(() => showDecimal('wins', Number.NaN));
});
