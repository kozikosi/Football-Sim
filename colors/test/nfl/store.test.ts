import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pool } from './fixture.ts';
import { createStore, freezePool, loadFrom, parseRecord, restoreDraft, saveTo, thawPool, SAVE_KEY } from '../../src/sports/nfl/app/store.ts';
import type { KeyValue } from '../../src/sports/nfl/app/store.ts';
import { selectBoard, selectBoardAsync, selectRoster } from '../../src/sports/nfl/app/selectors.ts';

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
  const dir = new URL('../../src/sports/nfl/app/', import.meta.url);
  for (const f of fs.readdirSync(dir)) {
    const src = fs.readFileSync(new URL(f, dir), 'utf8').replace(/\/\/.*$/gm, '');
    for (const bad of [/\bdocument\b/, /\bwindow\b/, /\blocalStorage\b/, /\bsessionStorage\b/, /\bMath\.random\b/, /\bDate\.now\b/, /\bnew Date\b/]) assert.ok(!bad.test(src), f + ' ' + bad);
  }
});

// P-317: the user's chosen draft slot reaches the engine's order, survives a save, and leaves slot-less saves untouched.
test('store: START with a pickSlot puts the user at that round-1 slot (and the snake mirrors it); the choice survives JSON and picks', () => {
  const st = createStore(pool); st.dispatch({ type: 'START', seed: 5, userTeam: 3, pickSlot: 20 });
  const d = st.getState().draft!, o = d.order;
  assert.equal(st.getState().error, null);
  assert.equal(o.length, 32 * 32); assert.equal(o[19], 3); assert.equal(o[32 + 12], 3);          // round 1 slot 20; round 2 reverses: 32-20 = position 12
  assert.equal(new Set(o.slice(0, 32)).size, 32);                                                  // still a permutation of the 32 teams
  assert.equal(d.pos, 19);                                                                         // the 19 CPU teams ahead of the user have picked
  assert.equal(st.getState().record!.pickSlot, 20);
  play(st, 1);
  const back = createStore(pool); back.dispatch({ type: 'LOAD', record: JSON.parse(JSON.stringify(st.getState().record)) });
  assert.deepEqual(back.getState().draft!.order, o); assert.equal(back.getState().record!.picks.length, st.getState().record!.picks.length);
});
test('store: a slot equal to the team\'s own index, or no slot, writes no pickSlot and keeps the plain snake; bad slots are refused', () => {
  const a = createStore(pool); a.dispatch({ type: 'START', seed: 5, userTeam: 3 });
  const b = createStore(pool); b.dispatch({ type: 'START', seed: 5, userTeam: 3, pickSlot: 4 });
  assert.equal('pickSlot' in a.getState().record!, false); assert.equal('pickSlot' in b.getState().record!, false);
  assert.deepEqual(a.getState().record, b.getState().record);
  for (const bad of [0, 33, 1.5, -1]) { const c = createStore(pool); c.dispatch({ type: 'START', seed: 5, userTeam: 3, pickSlot: bad }); assert.notEqual(c.getState().error, null); assert.equal(c.getState().status, 'idle'); }
  assert.throws(() => parseRecord({ ...a.getState().record, pickSlot: 99 }), /pickSlot/);
});

test('S4: dispatchAsync matches sync dispatch, in call order, and never rejects', async () => {
  const a = createStore(pool), b = createStore(pool);
  a.dispatch({ type: 'START', seed: 5, userTeam: 3 });
  const p1 = b.dispatchAsync({ type: 'START', seed: 5, userTeam: 3 });
  const p2 = b.dispatchAsync({ type: 'UNDO' });   // queued behind START; rejected inside dispatch (nothing to undo) -> state.error
  const s1 = await p1; const s2 = await p2;
  assert.deepEqual(s1.record, a.getState().record);
  assert.equal(s2.error, 'nothing to undo');
  assert.deepEqual(b.getState().record, a.getState().record);
});

test('S4: selectBoardAsync equals selectBoard', async () => {
  const st = createStore(pool); st.dispatch({ type: 'START', seed: 5, userTeam: 3 });
  const r = await selectBoardAsync(st.getState(), { limit: 5 });
  assert.equal(r.pending, false);
  assert.deepEqual(r.pending ? null : r.vm, selectBoard(st.getState(), { limit: 5 }));
});

test('S4: a throwing subscriber does not reject the call or poison the queue; the yield is a macrotask', async () => {
  const st = createStore(pool); let boom = true;
  st.subscribe(() => { if (boom) throw new Error('subscriber boom'); });
  const origWarn = console.warn; console.warn = () => {};
  try {
    let ran = false; const p = st.dispatchAsync({ type: 'START', seed: 5, userTeam: 3 });
    Promise.resolve().then(() => { ran = st.getState().status !== 'idle'; });   // microtasks drain before the macrotask yield
    await p;
    assert.equal(ran, false, 'dispatch must not run before a macrotask boundary');
    boom = false;
    const s2 = await st.dispatchAsync({ type: 'UNDO' });   // a later call still runs
    assert.ok(s2.record);
  } finally { console.warn = origWarn; }
});
