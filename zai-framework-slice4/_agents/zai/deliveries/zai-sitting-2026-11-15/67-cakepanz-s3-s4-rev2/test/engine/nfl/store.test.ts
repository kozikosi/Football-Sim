import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pool } from './fixture.ts';
import { createStore, freezePool, loadFrom, parseRecord, restoreDraft, saveTo, thawPool, SAVE_KEY } from '../../../src/engine/sports/nfl/app/store.ts';
import type { KeyValue } from '../../../src/engine/sports/nfl/app/store.ts';
import { selectBoard, selectRoster } from '../../../src/engine/sports/nfl/app/selectors.ts';

const mem = (): KeyValue & { m: Map<string, string> } => { const m = new Map<string, string>(); return { m, getItem: (k) => m.get(k) ?? null, setItem: (k, v) => void m.set(k, v), removeItem: (k) => void m.delete(k) }; };
const mine = (st: ReturnType<typeof createStore>) => st.getState().record!.picks.filter((k) => k.team === st.getState().record!.userTeam);
const topPick = (s: ReturnType<ReturnType<typeof createStore>['getState']>) => { const b = selectBoard(s, { sims: 4, limit: 1 })!; return { playerId: b.rows[0].id, slot: b.rows[0].slotId }; };
function play(store: ReturnType<typeof createStore>, n: number) { for (let i = 0; i < n; i++) { const p = topPick(store.getState()); store.dispatch({ type: 'PICK', ...p }); } }

test('store: START puts the user on the clock; PICK advances to the next user turn; roster shows the pick', () => {
  const st = createStore(pool); st.dispatch({ type: 'START', seed: 5, userTeam: 3 });
  assert.equal(st.getState().status, 'drafting'); assert.equal(st.getState().draft!.order[st.getState().draft!.pos], 3);
  play(st, 2);
  assert.equal(mine(st).length, 2); assert.equal(selectRoster(st.getState())!.filled, 2);
  assert.equal(st.getState().error, null);
});
test('save and restore: a saved log rebuilds exactly the same draft, through JSON and storage', () => {
  const st = createStore(pool); st.dispatch({ type: 'START', seed: 8, userTeam: 11 }); play(st, 3);
  const kv = mem(); saveTo(kv, st.getState().record);
  const rec = loadFrom(kv)!;
  const again = restoreDraft(rec);
  assert.deepEqual(again.log.map((p) => p.player.id), st.getState().draft!.log.map((p) => p.player.id));
  assert.equal(again.pos, st.getState().draft!.pos);
  const other = createStore(pool); other.dispatch({ type: 'LOAD', record: JSON.parse(JSON.stringify(rec)) });
  assert.equal(JSON.stringify(selectBoard(other.getState(), { sims: 4 })), JSON.stringify(selectBoard(st.getState(), { sims: 4 })));
  assert.equal(JSON.stringify(other.getState().record), JSON.stringify(st.getState().record));
});
test('E4: a resume never reads the live data: a store built on a different, damaged pool restores the same draft', () => {
  const st = createStore(pool); st.dispatch({ type: 'START', seed: 8, userTeam: 11 }); play(st, 3);
  const rec = JSON.parse(JSON.stringify(st.getState().record));
  const live = pool.filter((p) => p.ovr < 90).map((p) => ({ ...p, ovr: 50 }));   // the live data lost its stars and every rating changed
  const other = createStore(live); other.dispatch({ type: 'LOAD', record: rec });
  assert.equal(other.getState().error, null);
  assert.deepEqual(other.getState().draft!.log.map((p) => [p.player.id, p.player.ovr]), st.getState().draft!.log.map((p) => [p.player.id, p.player.ovr]));
  assert.equal(JSON.stringify(selectBoard(other.getState(), { sims: 4 })), JSON.stringify(selectBoard(st.getState(), { sims: 4 })));
  other.dispatch({ type: 'PICK', ...topPick(other.getState()) }); assert.equal(other.getState().error, null);   // and play on from it
});
test('E4: logged picks are applied as logged, not re-decided: a log whose CPU picks differ from what the engine would choose still restores', () => {
  const st = createStore(pool); st.dispatch({ type: 'START', seed: 8, userTeam: 11 });
  const rec = JSON.parse(JSON.stringify(st.getState().record));
  const first = rec.picks[0], taken = new Set(rec.picks.map((k: { pid: string }) => k.pid)), other = rec.pool.find((r: string[]) => !taken.has(r[0]) && r[2] === 'QB');   // team 0 "took" a QB the engine did not choose
  rec.picks[0] = { ...first, pid: other[0], slot: 'QB' };
  const d = restoreDraft(parseRecord(rec));
  assert.equal(d.log[0].player.id, other[0]); assert.equal(d.pos, rec.picks.length);
});
test('E4: a log that does not fit is rejected, not repaired: out of order, taken twice, unknown player, illegal spot', () => {
  const st = createStore(pool); st.dispatch({ type: 'START', seed: 8, userTeam: 11 }); play(st, 1);
  const good = JSON.parse(JSON.stringify(st.getState().record));
  const cases: [string, (r: any) => void, RegExp][] = [
    ['order', (r) => { r.picks[2].overall = 9; }, /out of order/], ['team', (r) => { r.picks[1].team = 31; }, /out of order/],
    ['twice', (r) => { r.picks[1].pid = r.picks[0].pid; }, /not available/], ['unknown', (r) => { r.picks[0].pid = 'nfl-p99999'; }, /not available/],
    ['spot', (r) => { r.picks[0].slot = 'K'; r.picks[0].pid = r.pool.find((x: string[]) => x[2] === 'QB')[0]; }, /illegal fit|not available/],
  ];
  for (const [name, f, re] of cases) { const r = structuredClone(good); f(r); assert.throws(() => restoreDraft(parseRecord(r)), re, name); }
});
test('freeze and thaw: the pool round-trips every field (long snappers are not drafted)', () => {
  const rows = freezePool(pool), back = thawPool(JSON.parse(JSON.stringify(rows)));
  assert.equal(back.length, pool.filter((p) => p.role !== 'LS').length);
  assert.deepEqual(back[0], pool.filter((p) => p.role !== 'LS')[0]);
  assert.deepEqual(back, pool.filter((p) => p.role !== 'LS'));
});
test('undo: drops only the last user pick, and picking the same player again gives the same draft as before', () => {
  const st = createStore(pool); st.dispatch({ type: 'START', seed: 2, userTeam: 20 }); play(st, 3);
  const before = st.getState().draft!.log.map((p) => p.player.id), last = (({ pid, slot }) => ({ playerId: pid, slot }))(mine(st)[2]);
  st.dispatch({ type: 'UNDO' });
  assert.equal(mine(st).length, 2);
  assert.ok(st.getState().draft!.log.length < before.length);
  st.dispatch({ type: 'PICK', ...last });
  assert.deepEqual(st.getState().draft!.log.map((p) => p.player.id), before);
});
test('bad input is rejected with a message, never a crash: unknown player, bad record, undo with nothing', () => {
  const warn = console.warn; console.warn = () => {};
  try {
    const st = createStore(pool); st.dispatch({ type: 'UNDO' }); assert.ok(st.getState().error);
    st.dispatch({ type: 'START', seed: 1, userTeam: 0 }); st.dispatch({ type: 'UNDO' }); assert.ok(st.getState().error);
    st.dispatch({ type: 'PICK', playerId: 'nobody|QB|X', slot: 'QB' }); assert.ok(/not available/.test(st.getState().error!));
    assert.equal(mine(st).length, 0);
    for (const bad of [null, 5, [], { version: 9 }, { seed: 1.5, userTeam: 0, picks: [], pool: [] }, { seed: 1, userTeam: 40, picks: [], pool: [] }, { seed: 1, userTeam: 0, picks: [{ overall: 1, team: 0, pid: 'x', slot: 'NOPE' }], pool: [] }, { seed: 1, userTeam: 0, picks: [], pool: [['old', 'seven', 'cols', 'x', 1, 2, 3]] }]) assert.throws(() => parseRecord(bad));
    const kv = mem(); kv.setItem(SAVE_KEY, '{broken'); assert.equal(loadFrom(kv), null);
    const dead: KeyValue = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); }, removeItem() { throw new Error('blocked'); } };
    assert.equal(loadFrom(dead), null); saveTo(dead, null);
  } finally { console.warn = warn; }
});
test('roster VM: roster order, offense / defense / special, flex tag only where a flex is used', () => {
  const st = createStore(pool); st.dispatch({ type: 'START', seed: 5, userTeam: 3 }); play(st, 4);
  const r = selectRoster(st.getState())!;
  assert.deepEqual(r.groups.map((g) => g.unit), ['offense', 'defense', 'special']);
  assert.equal(r.total, 32); assert.equal(r.groups[0].rows[0].slotId, 'QB');
  assert.equal(JSON.stringify(JSON.parse(JSON.stringify(r))), JSON.stringify(r));
  for (const g of r.groups) for (const row of g.rows) if (row.player) assert.match(row.player.flex, /^(|-\d flex)$/);
});
test('app layer purity: no DOM, storage globals, clock or Math.random in src/app', () => {
  const dir = new URL('../../../src/engine/sports/nfl/app/', import.meta.url);
  for (const f of fs.readdirSync(dir)) {
    const src = fs.readFileSync(new URL(f, dir), 'utf8').replace(/\/\/.*$/gm, '');
    for (const bad of [/\bdocument\b/, /\bwindow\b/, /\blocalStorage\b/, /\bsessionStorage\b/, /\bMath\.random\b/, /\bDate\.now\b/, /\bnew Date\b/]) assert.ok(!bad.test(src), f + ' ' + bad);
  }
});
