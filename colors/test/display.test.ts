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
