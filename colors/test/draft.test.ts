import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildPool } from '../src/engine/players.ts';
import { SLOTS, SLOT_IDS } from '../src/engine/slots.ts';
import { fit } from '../src/engine/flex.ts';
import { makeRng } from '../src/engine/rng.ts';
import { ROUNDS, TEAMS_N, applyPick, candidates, cpuChoose, newDraft, runDraft, snakeOrder, DEFAULT_CONFIG } from '../src/engine/draft.ts';

const pool = buildPool(fs.readFileSync(new URL('../../data/madden27-ratings.csv', import.meta.url), 'utf8'), fs.readFileSync(new URL('../../data/free-agents-old-ratings.csv', import.meta.url), 'utf8'));

test('snake order: 32 rounds, each team once per round, direction flips', () => {
  const o = snakeOrder();
  assert.equal(o.length, TEAMS_N * ROUNDS);
  assert.deepEqual(o.slice(0, 3), [0, 1, 2]); assert.deepEqual(o.slice(32, 35), [31, 30, 29]);
  for (let r = 0; r < ROUNDS; r++) assert.equal(new Set(o.slice(r * 32, r * 32 + 32)).size, 32);
});
test('a full CPU draft: every team fills every spot, no player twice, all fits legal, deterministic', () => {
  const a = newDraft(pool, makeRng(3)); runDraft(a, makeRng(4));
  const b = newDraft(pool, makeRng(3)); runDraft(b, makeRng(4));
  assert.equal(a.log.length, 1024);
  assert.deepEqual(a.log.map((p) => p.player.id), b.log.map((p) => p.player.id));
  assert.equal(new Set(a.log.map((p) => p.player.id)).size, 1024);
  for (const r of a.rosters) for (const s of SLOT_IDS) assert.ok(r[s], 'spot ' + s);
  assert.ok(a.log.every((p) => fit(p.player.role, SLOTS.find((x) => x.id === p.slot)!.dest).legal));
  assert.equal(a.pool.length, pool.filter((p) => p.role !== 'LS').length - 1024);
});
test('early rounds: every CPU pick is within 5 OVR of the best player on the board (rounds 1-4); K and P wait for round 6', () => {
  let worst = 0;
  for (let seed = 0; seed < 6; seed++) {
    const st = newDraft(pool, makeRng(seed)); runDraft(st, makeRng(seed + 100));
    for (const p of st.log) {
      if (p.round <= DEFAULT_CONFIG.topFloorRounds) worst = Math.max(worst, p.ovrGap);
      if (p.player.role === 'K' || p.player.role === 'P') assert.ok(p.round >= DEFAULT_CONFIG.kpFirstRound, 'K/P in round ' + p.round);
    }
  }
  assert.ok(worst <= 5, 'largest gap in rounds 1-4: ' + worst);
});
test('applyPick refuses a pick out of turn, a taken player, a filled spot', () => {
  const st = newDraft(pool, makeRng(1)), c = cpuChoose(st, 0, makeRng(2));
  assert.throws(() => applyPick(st, 5, c.player, c.slot), /not team 5/);
  applyPick(st, 0, c.player, c.slot);
  const d = candidates(st, 1)[0];
  assert.throws(() => applyPick(st, 0, d.player, d.slot), /not team 0/);
  assert.throws(() => applyPick(st, 1, c.player, d.slot), /already taken/);
});
test('a spot can be filled once: a second pick into it is refused', () => {
  const st = newDraft(pool, makeRng(1), DEFAULT_CONFIG, [0, 0]);
  const qbs = st.pool.filter((p) => p.role === 'QB');
  applyPick(st, 0, qbs[0], 'QB');
  assert.throws(() => applyPick(st, 0, qbs[1], 'QB'), /already filled/);
});
test('candidates are natural fits or listed flexes, never emergency fills, late in the draft too', () => {
  const st = newDraft(pool, makeRng(7)); const r = makeRng(8);
  while (st.pos < 700) { const t = st.order[st.pos]; const c = cpuChoose(st, t, r); applyPick(st, t, c.player, c.slot); }
  for (let t = 0; t < 32; t++) for (const c of candidates(st, t)) assert.equal(fit(c.player.role, SLOTS.find((x) => x.id === c.slot)!.dest).emergency, false);
});
