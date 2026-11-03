import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pool } from './fixture.ts';
import { createStore, loadFrom, parseRecord, replay, saveTo, SAVE_KEY } from '../src/app/store.ts';
import type { KeyValue } from '../src/app/store.ts';
import { selectBoard, selectRoster } from '../src/app/selectors.ts';

const mem = (): KeyValue & { m: Map<string, string> } => { const m = new Map<string, string>(); return { m, getItem: (k) => m.get(k) ?? null, setItem: (k, v) => void m.set(k, v), removeItem: (k) => void m.delete(k) }; };
const topPick = (s: ReturnType<ReturnType<typeof createStore>['getState']>) => { const b = selectBoard(s, { sims: 4, limit: 1 })!; return { playerId: b.rows[0].id, slot: b.rows[0].slotId }; };
function play(store: ReturnType<typeof createStore>, n: number) { for (let i = 0; i < n; i++) { const p = topPick(store.getState()); store.dispatch({ type: 'PICK', ...p }); } }

test('store: START puts the user on the clock; PICK advances to the next user turn; roster shows the pick', () => {
  const st = createStore(pool); st.dispatch({ type: 'START', seed: 5, userTeam: 3 });
  assert.equal(st.getState().status, 'drafting'); assert.equal(st.getState().draft!.order[st.getState().draft!.pos], 3);
  play(st, 2);
  assert.equal(st.getState().record!.picks.length, 2); assert.equal(selectRoster(st.getState())!.filled, 2);
  assert.equal(st.getState().error, null);
});
test('save and replay: a saved record rebuilds exactly the same draft, through JSON and storage', () => {
  const st = createStore(pool); st.dispatch({ type: 'START', seed: 8, userTeam: 11 }); play(st, 3);
  const kv = mem(); saveTo(kv, st.getState().record);
  const rec = loadFrom(kv)!;
  const again = replay(pool, rec);
  assert.deepEqual(again.log.map((p) => p.player.id), st.getState().draft!.log.map((p) => p.player.id));
  const other = createStore(pool); other.dispatch({ type: 'LOAD', record: JSON.parse(JSON.stringify(rec)) });
  assert.equal(JSON.stringify(selectBoard(other.getState(), { sims: 4 })), JSON.stringify(selectBoard(st.getState(), { sims: 4 })));
});
test('undo: drops only the last user pick, and picking the same player again gives the same draft as before', () => {
  const st = createStore(pool); st.dispatch({ type: 'START', seed: 2, userTeam: 20 }); play(st, 3);
  const before = st.getState().draft!.log.map((p) => p.player.id), last = st.getState().record!.picks[2];
  st.dispatch({ type: 'UNDO' });
  assert.equal(st.getState().record!.picks.length, 2);
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
    assert.equal(st.getState().record!.picks.length, 0);
    for (const bad of [null, 5, { version: 9 }, { version: 2, seed: 1, userTeam: 0, picks: [] }, { version: 1, seed: 1.5, userTeam: 0, picks: [] }, { version: 1, seed: 1, userTeam: 40, picks: [] }, { version: 1, seed: 1, userTeam: 0, picks: [{ playerId: 'x', slot: 'NOPE' }] }]) assert.throws(() => parseRecord(bad));
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
  const dir = new URL('../src/app/', import.meta.url);
  for (const f of fs.readdirSync(dir)) {
    const src = fs.readFileSync(new URL(f, dir), 'utf8').replace(/\/\/.*$/gm, '');
    for (const bad of [/\bdocument\b/, /\bwindow\b/, /\blocalStorage\b/, /\bsessionStorage\b/, /\bMath\.random\b/, /\bDate\.now\b/, /\bnew Date\b/]) assert.ok(!bad.test(src), f + ' ' + bad);
  }
});
