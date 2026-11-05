import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pool } from './fixture.ts';
import { makeRng } from '../src/engine/rng.ts';
import { applyPick, cpuChoose, newDraft } from '../src/engine/draft.ts';
import type { DraftState } from '../src/engine/draft.ts';
import { goneOdds } from '../src/engine/goneodds.ts';
import { boardVM } from '../src/view/draftBoard.ts';

const USER = 3;
function toUser(seed: number, picksOfUser: number): DraftState {
  const st = newDraft(pool, makeRng(seed)), r = makeRng(seed + 1);
  let mine = 0;
  for (;;) {
    const t = st.order[st.pos];
    if (t === USER) { if (mine === picksOfUser) return st; mine++; }
    const c = cpuChoose(st, t, r); applyPick(st, t, c.player, c.slot);
  }
}
const make = (seed: number, n: number, sims = 12) => { const st = toUser(seed, n); return { st, vm: boardVM(st, USER, goneOdds(st, USER, makeRng(9), sims)) }; };

test('board VM: JSON-stable, deterministic, and every printed number is a string', () => {
  const a = make(5, 0).vm, b = make(5, 0).vm;
  assert.deepEqual(JSON.parse(JSON.stringify(a)), a);
  assert.equal(JSON.stringify(a), JSON.stringify(b));
  for (const r of a.rows) for (const k of ['ovr', 'wins', 'priority', 'gone'] as const) assert.equal(typeof r[k], 'string');
});
test('board VM: display rules (one-decimal wins and priority, signed; integer OVR; Gone% never 100)', () => {
  const { vm } = make(5, 1);
  assert.ok(vm.rows.length > 20);
  for (const r of vm.rows) {
    assert.match(r.wins, /^[+-]\d+\.\d$/); assert.match(r.priority, /^[+-]\d+\.\d$/);
    assert.match(r.ovr, /^\d+$/); assert.match(r.gone, /^\d{1,2}%$/); assert.ok(parseInt(r.gone) <= 99);
  }
});
test('board VM: header round follows the draft and the text has no retired words', () => {
  const a = make(5, 0).vm.header, b = make(5, 4).vm.header;
  assert.equal(a.round, 1); assert.equal(a.roundLabel, 'Round 1'); assert.equal(b.roundLabel, 'Round 5');
  assert.equal(a.totalPicks, 1024);
  const text = JSON.stringify(make(5, 2).vm);
  for (const bad of ['Value Here', 'value here', '★', '☆', 'also fits', 'One table']) assert.ok(!text.includes(bad), bad);
});
test('board VM: a natural spot is the primary spot whenever one is open (the Cooper DeJean rule); flex options follow the 2/4 rule', () => {
  const { st, vm } = make(7, 1);
  const open = new Set(Object.keys(st.rosters[USER]));
  assert.ok(open.size >= 1);
  for (const r of vm.rows) {
    for (const f of r.alsoFits) assert.match(f.flex, /^-[24] flex$/);          // round 2: no -6/-8 shown
  }
  // a corner is never primary-listed at a flex spot while a corner spot is open
  for (const r of vm.rows.filter((x) => x.pos === 'CB')) assert.ok(r.natural, r.name + ' at ' + r.slotId);
});
test('gone odds: a deep-board player is rarely taken, the best players often are, and probabilities are in range', () => {
  const st = toUser(11, 0), o = goneOdds(st, USER, makeRng(2), 30);
  assert.ok(o.picksBetween > 0);
  for (const v of o.gone.values()) assert.ok(v > 0 && v <= 1);
  const top = st.pool.slice(0, 10).reduce((s, p) => s + (o.gone.get(p.id) ?? 0), 0) / 10;
  const deep = st.pool.slice(400, 410).reduce((s, p) => s + (o.gone.get(p.id) ?? 0), 0) / 10;
  assert.ok(top > deep + 0.2, `top ${top} deep ${deep}`);
});
test('view layer purity: src/view has no DOM, storage, clock or Math.random', async () => {
  const fs = await import('node:fs');
  const dir = new URL('../src/view/', import.meta.url);
  for (const f of fs.readdirSync(dir)) {
    const src = fs.readFileSync(new URL(f, dir), 'utf8').replace(/\/\/.*$/gm, '');
    for (const bad of [/\bdocument\b/, /\bwindow\b/, /\blocalStorage\b/, /\bMath\.random\b/, /\bDate\.now\b/, /\bnew Date\b/]) assert.ok(!bad.test(src), f + ' ' + bad);
  }
});
test('board VM: a tight end is listed at TE1 even though the flex spot WR1 is worth more (found by search: seed 1, first pick)', () => {
  const st = toUser(1, 0), vm = boardVM(st, USER, goneOdds(st, USER, makeRng(9), 4), { limit: 400 });
  const row = vm.rows.find((r) => r.name === 'Trey McBride');
  assert.ok(row, 'player is on the board'); assert.equal(row.slotId, 'TE1'); assert.ok(row.natural);
  assert.ok(row.alsoFits.every((f) => f.slotId !== 'TE1'));
});
test('board VM: a certain Gone% prints as 99%, never 100%', () => {
  const st = toUser(1, 0), top = st.pool[0];
  const odds = { picksBetween: 5, sims: 1, gone: new Map([[top.id, 1]]) };
  const vm = boardVM(st, USER, odds, { limit: 400 });
  assert.equal(vm.rows.find((r) => r.id === top.id)!.gone, '99%');
});
