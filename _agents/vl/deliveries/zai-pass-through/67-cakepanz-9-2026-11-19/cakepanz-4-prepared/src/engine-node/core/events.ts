// Event log (L0 kernel, Phase 0). A game is an append-only list of events; the box score, drive summary, recap, standings points
// and stat leaders are FOLDS over it (fold.ts), so the numbers and the story cannot disagree. Sport-neutral: the sport module
// owns the `kind` vocabulary and the payload shapes; the kernel owns ordering, validation, canonical text and the hash.
//   i       0-based position, gapless (a log with a hole is rejected)
//   t       game time in seconds elapsed (0 for pre-game events); never decreases along the log
//   kind    event type, defined by the sport module
//   actors  ids of the people/teams involved (may be empty)
//   payload plain data only (numbers, strings, booleans, null, arrays, objects): it must survive JSON and hash identically
import { hash53 } from './hash.ts';

export interface GameEvent<K extends string = string, P = unknown> {
  readonly i: number;
  readonly t: number;
  readonly kind: K;
  readonly actors: readonly string[];
  readonly payload: P;
}

// Appends events with the next index; the only way the engine makes events, so `i` can never be wrong.
export interface LogBuilder<E extends GameEvent> {
  emit(t: number, kind: E['kind'], actors: readonly string[], payload: E['payload']): E;
  readonly events: readonly E[];
}
export function logBuilder<E extends GameEvent = GameEvent>(): LogBuilder<E> {
  const events: E[] = [];
  return {
    emit(t, kind, actors, payload) {
      const e = { i: events.length, t, kind, actors: [...actors], payload } as unknown as E;
      events.push(e);
      return e;
    },
    events,
  };
}

// Throws on a malformed log: gap or repeat in `i`, time going backwards, a non-finite time, an empty kind.
export function validateLog(events: readonly GameEvent[]): void {
  let prevT = 0;
  for (let k = 0; k < events.length; k++) {
    const e = events[k] as GameEvent;
    if (e.i !== k) throw new Error(`validateLog: event ${k} has i=${e.i}`);
    if (!Number.isFinite(e.t) || e.t < 0) throw new Error(`validateLog: event ${k} has bad t=${e.t}`);
    if (e.t < prevT) throw new Error(`validateLog: event ${k} goes back in time (${e.t} < ${prevT})`);
    if (typeof e.kind !== 'string' || e.kind === '') throw new Error(`validateLog: event ${k} has no kind`);
    prevT = e.t;
  }
}

// Canonical text: keys sorted, no whitespace, `undefined` properties treated as absent (as JSON does), non-finite numbers and
// non-plain values rejected so two devices always print the same text for the same log.
export function canonicalText(v: unknown): string {
  if (v === null) return 'null';
  switch (typeof v) {
    case 'string': return JSON.stringify(v);
    case 'boolean': return v ? 'true' : 'false';
    case 'number':
      if (!Number.isFinite(v)) throw new Error('canonicalText: non-finite number');
      return Object.is(v, -0) ? '0' : JSON.stringify(v);
    case 'object': {
      if (Array.isArray(v)) return '[' + v.map((x) => (x === undefined ? 'null' : canonicalText(x))).join(',') + ']';
      const o = v as Record<string, unknown>;
      return '{' + Object.keys(o).filter((k) => o[k] !== undefined).sort().map((k) => JSON.stringify(k) + ':' + canonicalText(o[k])).join(',') + '}';
    }
    default: throw new Error('canonicalText: unsupported value of type ' + typeof v);
  }
}
// Identity of a log: any changed event, order or payload changes it. (cyrb53: notices change, not a security hash.)
export const logHash = (events: readonly GameEvent[]): string => 'log53:' + hash53(canonicalText(events));
