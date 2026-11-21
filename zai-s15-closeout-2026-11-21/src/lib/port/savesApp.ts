// port/savesApp.ts — the app-side save/load service (ported from slice 3, engine imports through the
// seam; extended to write/read WEEK and SEASON envelopes for the season shell). The ONLY file the UI
// talks to for saves. A thin composition of the pin's own modules:
//   core/envelope.ts   — the outer contract (SCHEMA_VERSION, SaveMeta, parseEnvelope)
//   app/saves.ts       — the NFL half (serialize / restore / assertSlotMatchesKey, the typed payloads)
//   app/hydrate.ts     — hydrateWeek / hydrateSeasonConsistency (the ONE classification path)
//   platform/localstorage.ts — the StorageModule (the only browser-storage toucher)
//   core/keys.ts       — sim:nfl:slot:<S> key names + slotOfKey
// Corrupt-never-repair: nothing here edits stored values; every failure is a Result the panel shows verbatim.
// A version mismatch is REPORTED, never silently accepted (the engine's restore() refuses newer builds).
import {
  serialize, restore, assertSlotMatchesKey, hydrateWeek, hydrateSeasonConsistency,
  createLocalStorageModule, sportKey, SLOT_NAMES, isFinished,
} from './seam.ts';
import type {
  AnyEnvelope, DraftPayload, WeekEnvelope, SeasonEnvelope, HydrateResult, LoadedWeek,
  StorageModule, SlotName, SaveMeta, WeekPayload, SeasonPayload,
} from './seam.ts';

export const slotKey = (slot: SlotName): string => sportKey('nfl', 'slot:' + slot);
export const SLOTS: readonly SlotName[] = SLOT_NAMES;

// S15 §4.4 (the "+ a shell build sha" half): the SHELL build token — the bundled main module's
// content-hashed name is the build identity the dist carries (every rebuild rehashes it). It rides
// the saves panel DISPLAY only; the frozen envelope carries engineVersion (the N36/S34 law) and
// the freeze forbids adding fields. In node (and the single-file dist, where nothing is a hashed
// module) there is no match — 'dev', honestly.
export const shellBuild = (): string => {
  try { return new URL(import.meta.url).pathname.match(/index-[A-Za-z0-9_-]+\.js/)?.[0] ?? 'dev'; } catch { return 'dev'; }
};

// The storage module with the F8 slot assertion injected (the same call the composition root makes).
export const storage: StorageModule = createLocalStorageModule({ slotCheck: assertSlotMatchesKey });

// The meta the app stamps (engineVersion names the pin: informational, the F5 ruling keeps resume
// determinism within the build that wrote the save; dataVersion is the dataset sha, computed at boot).
export interface AppMeta { engineVersion: string; dataVersion: string; saveId: string; saveRevision: number; createdAt: string }
export const metaOf = (m: AppMeta): SaveMeta => ({ ...m });

/** Serialize + write a draft payload to a slot. Returns '' on success or the refusal. */
export async function saveDraftSlot(slot: SlotName, payload: DraftPayload, meta: AppMeta, now: Date): Promise<string> {
  const text = serialize('draft', slot, metaOf(meta), payload, now);   // saves.ts fixes the sport itself
  const r = await storage.write(slotKey(slot), text);
  return r.ok ? '' : 'storage refused the write: ' + r.error;
}

/** Serialize + write a week payload (the season stepper's save: RunState + ratings + roster). */
export async function saveWeekSlot(slot: SlotName, payload: WeekPayload, meta: AppMeta, now: Date): Promise<string> {
  const text = serialize('week', slot, metaOf(meta), payload, now);
  const r = await storage.write(slotKey(slot), text);
  return r.ok ? '' : 'storage refused the write: ' + r.error;
}

/** Serialize + write a season payload (finished, pruned). */
export async function saveSeasonSlot(slot: SlotName, payload: SeasonPayload, meta: AppMeta, now: Date): Promise<string> {
  const text = serialize('season', slot, metaOf(meta), payload, now);
  const r = await storage.write(slotKey(slot), text);
  return r.ok ? '' : 'storage refused the write: ' + r.error;
}

export interface SlotSummary {
  slot: SlotName;
  state: 'empty' | 'ok' | 'refused';
  kind?: 'draft' | 'week' | 'season';
  saveId?: string; saveRevision?: number; savedAt?: string; createdAt?: string; engineVersion?: string; dataVersion?: string;
  // draft kind:
  picks?: number; userTeamIndex?: number;
  // week/season kind (the hydrated summary the panel shows — engine-derived, nothing repaired):
  week?: number; userTeam?: string; nextFixture?: string; played?: number; champion?: string;
  problem?: 'corrupt' | 'newer-version'; message?: string;
}

const fixtureLine = (lw: LoadedWeek): string => {
  // the season length is the ENGINE's knowledge (isFinished) — never a duplicated week count here
  if (isFinished(lw.state)) return 'season complete';
  const f = lw.teams.length && (lw.state.schedule.find((g) => g.week === lw.state.nextWeek && (g.home === lw.context.userTeam || g.away === lw.context.userTeam))
    ?? null);
  if (!f) return 'no user game this week';
  return `${f.away} @ ${f.home}`;
};

/** The visible "this save came from another build" state (Part F, 2026-11-17 sitting): the slot
 *  summary carries the engineVersion that WROTE the save; the panel names another build instead of
 *  hiding it. The F5 ruling, shown where the user needs it: logged picks hold; un-made picks may
 *  differ. Pure + node-testable; the RUNNING version comes from the seam's engineVersion(). */
export const olderBuildNote = (sum: SlotSummary, runningVersion: string): string | null => {
  if (sum.state !== 'ok' || !sum.engineVersion) return null;
  if (sum.engineVersion === runningVersion) return null;
  return 'this save came from build ' + sum.engineVersion + ' (running: ' + runningVersion + ') — logged picks hold; un-made picks may differ';
};

/** Read one slot and classify it. Never throws; never repairs. */
export async function readSlot(slot: SlotName): Promise<SlotSummary> {
  const r = await storage.read(slotKey(slot));
  if (!r.ok) return { slot, state: 'refused', problem: 'corrupt', message: 'storage unavailable: ' + r.error };
  if (r.value === null) return { slot, state: 'empty' };
  const parsed = restore(r.value);                       // outer + inner shape, typed; refuses other sports' saves
  if (!parsed.ok) {
    return { slot, state: 'refused', problem: parsed.reason, message: parsed.message };
  }
  const env = parsed.value;
  if (env.kind === 'draft') {
    const p = (env as AnyEnvelope & { kind: 'draft' }).payload as DraftPayload;
    return { slot, state: 'ok', kind: 'draft', saveId: env.saveId, saveRevision: env.saveRevision, savedAt: env.savedAt, createdAt: env.createdAt, engineVersion: env.engineVersion, dataVersion: env.dataVersion, picks: p.picks.length, userTeamIndex: p.userTeam };
  }
  // week / season: the engine's own hydration is the classification (corrupt-never-repair).
  const hydrate: HydrateResult = env.kind === 'week'
    ? hydrateWeek(env as WeekEnvelope)
    : hydrateSeasonConsistency(env as SeasonEnvelope);
  if (!hydrate.ok) return { slot, state: 'refused', problem: 'corrupt', message: hydrate.message };
  if (env.kind === 'week') {
    const lw = (hydrate as Extract<HydrateResult, { ok: true }>).value as LoadedWeek;
    return { slot, state: 'ok', kind: 'week', saveId: env.saveId, saveRevision: env.saveRevision, savedAt: env.savedAt, createdAt: env.createdAt, engineVersion: env.engineVersion, dataVersion: env.dataVersion, week: lw.state.nextWeek, userTeam: lw.context.userTeam, nextFixture: fixtureLine(lw), played: lw.state.scores.length + lw.state.playoffs.length };
  }
  // season: hydrateSeasonConsistency returns a placeholder value; the panel shows the stored summary.
  const p = (env as SeasonEnvelope).payload;
  return { slot, state: 'ok', kind: 'season', saveId: env.saveId, saveRevision: env.saveRevision, savedAt: env.savedAt, createdAt: env.createdAt, engineVersion: env.engineVersion, dataVersion: env.dataVersion, userTeam: p.userTeam, week: 23, played: p.userResults.length, champion: p.champion };
}

/** Load a draft slot: returns the parsed payload for the store's LOAD action (the store re-parses — one parser). */
export async function loadDraftSlot(slot: SlotName): Promise<{ ok: true; record: unknown } | { ok: false; message: string }> {
  const r = await storage.read(slotKey(slot));
  if (!r.ok) return { ok: false, message: 'storage unavailable: ' + r.error };
  if (r.value === null) return { ok: false, message: 'slot ' + slot + ' is empty' };
  const parsed = restore(r.value);
  if (!parsed.ok) return { ok: false, message: parsed.message };
  if (parsed.value.kind !== 'draft') return { ok: false, message: 'slot ' + slot + ' holds a ' + parsed.value.kind + ' save, not a draft' };
  return { ok: true, record: (parsed.value as AnyEnvelope & { kind: 'draft' }).payload };
}

/** Load a WEEK slot (the season stepper's restore): engine hydration classifies; corrupt-never-repair. */
export async function loadWeekSlot(slot: SlotName): Promise<{ ok: true; env: WeekEnvelope } | { ok: false; message: string }> {
  const r = await storage.read(slotKey(slot));
  if (!r.ok) return { ok: false, message: 'storage unavailable: ' + r.error };
  if (r.value === null) return { ok: false, message: 'slot ' + slot + ' is empty' };
  const parsed = restore(r.value);
  if (!parsed.ok) return { ok: false, message: parsed.message };
  if (parsed.value.kind !== 'week') return { ok: false, message: 'slot ' + slot + ' holds a ' + parsed.value.kind + ' save, not a week' };
  const env = parsed.value as WeekEnvelope;
  const hydrate = hydrateWeek(env);
  if (!hydrate.ok) return { ok: false, message: hydrate.message };
  return { ok: true, env };
}

// The two refusal proofs, plantable from the panel: a structurally broken envelope (the engine's own
// inner check refuses it verbatim) and a valid outer envelope stamped by a NEWER build (schemaVersion
// above this build's). The read path must refuse both verbatim; nothing repaired, nothing defaulted.
import { SCHEMA_VERSION } from './seam.ts';
export async function injectBroken(slot: SlotName, kind: 'corrupt' | 'newer'): Promise<void> {
  const text = kind === 'corrupt'
    ? '{"sport":"nfl","kind":"week","schemaVersion":1,"engineVersion":"x","dataVersion":"y","saveId":"z","saveRevision":1,"createdAt":"2026-01-01T00:00:00.000Z","slot":"' + slot + '","savedAt":"2026-01-01T00:00:00.000Z","payload":{"roster":[]}}'
    : '{"sport":"nfl","kind":"draft","schemaVersion":' + (SCHEMA_VERSION + 8) + ',"engineVersion":"nfl1.0","dataVersion":"sha256:0","saveId":"newer","saveRevision":1,"createdAt":"2026-01-01T00:00:00.000Z","slot":"' + slot + '","savedAt":"2026-01-01T00:00:00.000Z","payload":{"seed":4242,"userTeam":30,"pool":{},"picks":[]}}';   // payload seed 4242 = FRESH (never used this sitting) — the refusal must be by VERSION, not payload
  await storage.write(slotKey(slot), text);
}
