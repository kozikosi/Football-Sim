// Folds (L0 kernel, Phase 0): a view of a game is `reduce` applied to its events in order. The box score, drive summary, standings
// points and recap inputs are all folds, so a new statistic is a new fold, never a change to the simulator.
//   init()   makes a FRESH state each call (a fold object holds no state of its own)
//   reduce   takes the state and one event and returns the next state; it MAY mutate and return the state it was given
// Reducers must be pure: same events in, same state out, no clock, no randomness (replay determinism is a gate, see Phase 0 tests).
import type { GameEvent } from './events.ts';

export interface Fold<S, E extends GameEvent = GameEvent> {
  readonly name: string;
  init(): S;
  reduce(state: S, e: E): S;
}

// Fold the first `upTo` events (default all). `upTo` is how a view of "the game after play N" is made without re-simulating.
export function foldLog<S, E extends GameEvent>(f: Fold<S, E>, events: readonly E[], upTo: number = events.length): S {
  if (!Number.isInteger(upTo) || upTo < 0 || upTo > events.length) throw new Error(`foldLog(${f.name}): upTo=${upTo} outside 0..${events.length}`);
  let s = f.init();
  for (let k = 0; k < upTo; k++) s = f.reduce(s, events[k] as E);
  return s;
}

// Several folds in one pass over the log; the result is a record keyed by each fold's key.
export function foldAll<E extends GameEvent, F extends Record<string, Fold<unknown, E>>>(folds: F, events: readonly E[]): { [K in keyof F]: F[K] extends Fold<infer S, E> ? S : never } {
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(folds)) out[k] = (folds[k] as Fold<unknown, E>).init();
  for (const e of events) for (const k of Object.keys(folds)) out[k] = (folds[k] as Fold<unknown, E>).reduce(out[k], e);
  return out as { [K in keyof F]: F[K] extends Fold<infer S, E> ? S : never };
}
