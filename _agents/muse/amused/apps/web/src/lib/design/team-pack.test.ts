// Team-pack verification. The port was diffed var-by-var against the original w52
// zpbPackFor for all 32 teams (2,624 values, 0 mismatches, 2026-11-01); these pins
// guard against drift. Run: node --test --experimental-strip-types
//   apps/web/src/lib/design/team-pack.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { packFor, applyTeamTheme, clearTeamTheme } from './team-pack.ts';
import { TEAM_COLORS } from './team-colors-data.ts';

// Pinned from the original w52 run (spot-checks across the tricky cases:
// chromatic red, blue-lifted Bills, warmed-up Raiders, dark-navy 49ers).
const PINS: Array<[string, string, string]> = [
  ['Kansas City Chiefs', '--tA', '#dc1735'],
  ['Kansas City Chiefs', '--tTxM', '#9e2d36'],
  ['Buffalo Bills', '--tA', '#0759e9'],
  ['Buffalo Bills', '--tTxM', '#324f92'],
  ['Las Vegas Raiders', '--tA', '#806d34'],
  ['San Francisco 49ers', '--tA', '#aa0000'],
];

test('all 32 teams produce a pack with 82 vars', () => {
  assert.equal(Object.keys(TEAM_COLORS).length, 32);
  for (const name of Object.keys(TEAM_COLORS)) {
    const pack = packFor(name);
    assert.ok(pack, name);
    assert.equal(Object.keys(pack.vars).length, 82, name);
  }
});

test('pinned values match the original w52 computation', () => {
  for (const [team, v, want] of PINS) {
    assert.equal(packFor(team)!.vars[v], want, `${team} ${v}`);
  }
});

test('unknown team returns null; entry points need a DOM (skipped in node)', () => {
  assert.equal(packFor('Springfield Atoms'), null);
  assert.equal(typeof applyTeamTheme, 'function');
  assert.equal(typeof clearTeamTheme, 'function');
});
