// S3: the context snapshot (plan v3 section 3.3). One frozen value per period; every screen and the simulator read ONLY this.
// Sport-free: ids are opaque strings, so a basketball module reuses it unchanged. Pure: no clock, no storage, no randomness.
//
// Form 0 and "no entry" mean the same thing, so zero entries are dropped on build: the neutral snapshot has exactly one
// canonical text and one hash, however it was constructed. The displayed-versus-underlying law (Owner ruling Q7) rests on
// that: Wins are evaluated at the neutral snapshot and never move in-season.
import { canonicalText } from './events.ts';
import { hash53 } from './hash.ts';

export const SNAPSHOT_SCHEMA = 1;
/** Form is a signed drift about +-5 over a season (Owner ruling Q7); the hard bound only rejects garbage, it is not a tuning value. */
export const FORM_BOUND = 100;

export interface ContextSnapshot {
  readonly schema: typeof SNAPSHOT_SCHEMA;
  readonly season: number;
  readonly week: number;
  /** player id -> form (finite, nonzero; zero is absent). */
  readonly form: Readonly<Record<string, number>>;
  /** team id -> focus id (opaque; the sport defines what a focus is). */
  readonly focus: Readonly<Record<string, string>>;
  readonly flags: Readonly<Record<string, boolean>>;
  readonly packHash: string;
  readonly engineVersion: string;
}

export interface SnapshotInput {
  season: number; week: number; packHash: string; engineVersion: string;
  form?: Record<string, number>; focus?: Record<string, string>; flags?: Record<string, boolean>;
}

const isId = (k: string): boolean => k.length > 0;

/** Validate, normalise (drop zero form, sort keys via canonical text) and deep-freeze. Throws on bad input; it is a builder, not a loader. */
export function makeSnapshot(i: SnapshotInput): ContextSnapshot {
  if (!Number.isInteger(i.season) || i.season < 0) throw new Error('snapshot: bad season');
  if (!Number.isInteger(i.week) || i.week < 0) throw new Error('snapshot: bad week');
  if (!i.packHash || !i.engineVersion) throw new Error('snapshot: packHash and engineVersion are required');
  const form: Record<string, number> = {}, focus: Record<string, string> = {}, flags: Record<string, boolean> = {};
  for (const [k, v] of Object.entries(i.form ?? {})) {
    if (!isId(k)) throw new Error('snapshot: empty form id');
    if (typeof v !== 'number' || !Number.isFinite(v) || Math.abs(v) > FORM_BOUND) throw new Error('snapshot: bad form for ' + k);
    if (v !== 0) form[k] = Object.is(v, -0) ? 0 : v;
  }
  for (const [k, v] of Object.entries(i.focus ?? {})) {
    if (!isId(k) || typeof v !== 'string' || v === '') throw new Error('snapshot: bad focus for ' + k);
    focus[k] = v;
  }
  for (const [k, v] of Object.entries(i.flags ?? {})) {
    if (!isId(k) || typeof v !== 'boolean') throw new Error('snapshot: bad flag ' + k);
    flags[k] = v;
  }
  return Object.freeze({
    schema: SNAPSHOT_SCHEMA, season: i.season, week: i.week,
    form: Object.freeze(form), focus: Object.freeze(focus), flags: Object.freeze(flags),
    packHash: i.packHash, engineVersion: i.engineVersion,
  });
}

/** The snapshot Wins are evaluated at: form 0, no focus, no flags. Season and week are carried only so the value says when it was taken. */
export const neutralSnapshot = (season: number, week: number, packHash: string, engineVersion: string): ContextSnapshot =>
  makeSnapshot({ season, week, packHash, engineVersion });

export const isNeutral = (s: ContextSnapshot): boolean =>
  Object.keys(s.form).length === 0 && Object.keys(s.focus).length === 0 && Object.keys(s.flags).length === 0;

/** The same snapshot with form/focus/flags cleared: what the "Wins" evaluation reads, whatever week it is. */
export const toNeutral = (s: ContextSnapshot): ContextSnapshot => neutralSnapshot(s.season, s.week, s.packHash, s.engineVersion);

export const snapshotText = (s: ContextSnapshot): string => canonicalText(s);
/** Identity of a snapshot (cyrb53: notices change, not a security hash). Equal snapshots, whatever key order they were built in, hash equal. */
export const snapshotHash = (s: ContextSnapshot): string => 'snap53:' + hash53(snapshotText(s));
