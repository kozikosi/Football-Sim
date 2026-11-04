import { describe, it, expect } from 'vitest';
import { createSimStore, next } from './simStore';
import type { SimState } from './simStore';

describe('simStore (Svelte store contract proof)', () => {
  it('notifies subscribers immediately and on dispatch', () => {
    const store = createSimStore();
    const seen: SimState[] = [];
    const unsub = store.subscribe((s) => seen.push(s));
    store.dispatch({ type: 'START', seed: 42 });
    store.dispatch({ type: 'PICK', team: 'Pittsburgh Steelers', playerId: 'p00001' });
    unsub();
    expect(seen.length).toBe(3);
    expect(seen[2].picks.length).toBe(1);
    expect(seen[2].seed).toBe(42);
  });

  it('unsubscribe stops notifications', () => {
    const store = createSimStore();
    let calls = 0;
    const unsub = store.subscribe(() => calls++);
    unsub();
    store.dispatch({ type: 'START', seed: 1 });
    expect(calls).toBe(1); // only the immediate call
  });

  it('UNDO cuts exactly one pick; revision is monotonic', () => {
    const store = createSimStore();
    store.dispatch({ type: 'START', seed: 7 });
    store.dispatch({ type: 'PICK', team: 'A', playerId: '1' });
    store.dispatch({ type: 'PICK', team: 'B', playerId: '2' });
    const revBefore = store.get().revision;
    store.dispatch({ type: 'UNDO' });
    expect(store.get().picks.length).toBe(1);
    expect(store.get().revision).toBe(revBefore + 1);
  });

  it('next() is pure — same state + action gives same result', () => {
    const s: SimState = { seed: 1, picks: [], revision: 0 };
    const a = { type: 'PICK' as const, team: 'X', playerId: '9' };
    expect(JSON.stringify(next(s, a))).toBe(JSON.stringify(next(s, a)));
  });
});
