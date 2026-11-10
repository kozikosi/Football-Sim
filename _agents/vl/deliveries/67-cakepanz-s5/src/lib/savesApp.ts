// Slice 3 — the app-side save/load service: the ONLY file the UI talks to for saves.
// Everything below is a thin composition of the SNAPSHOT's own modules (pinned 4ca9a071):
//   core/envelope.ts   — the outer contract (SCHEMA_VERSION, SaveMeta, parseEnvelope)
//   app/saves.ts       — the NFL half (serialize / restore / assertSlotMatchesKey, the typed payloads)
//   app/hydrate.ts     — hydrateWeek / hydrateSeasonConsistency (landed unwired; THIS is the wiring)
//   platform/localstorage.ts — the StorageModule (the only browser-storage toucher)
//   core/keys.ts       — sim:nfl:slot:<S> key names + slotOfKey
// Corrupt-never-repair: nothing here edits stored values; every failure is a Result the panel shows verbatim.
import { serialize, restore, assertSlotMatchesKey } from '../engine/sports/nfl/app/saves.ts';
import type { AnyEnvelope, DraftPayload, WeekEnvelope, SeasonEnvelope } from '../engine/sports/nfl/app/saves.ts';
import { hydrateWeek, hydrateSeasonConsistency } from '../engine/sports/nfl/app/hydrate.ts';
import type { HydrateResult } from '../engine/sports/nfl/app/hydrate.ts';
import type { LoadedWeek } from '../engine/sports/nfl/app/weekmap.ts';
import { createLocalStorageModule } from '../engine/platform/localstorage.ts';
import type { StorageModule } from '../engine/core/app.ts';
import { sportKey } from '../engine/core/keys.ts';
import type { SlotName } from '../engine/core/envelope.ts';
import { SLOT_NAMES } from '../engine/core/envelope.ts';
import type { SaveMeta } from '../engine/core/envelope.ts';

export const slotKey = (slot: SlotName): string => sportKey('nfl', 'slot:' + slot);
export const SLOTS: readonly SlotName[] = SLOT_NAMES;

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

/** Serialize + write a week payload (a hydrated-season save, for the load path to prove). */
export async function saveWeekSlot(slot: SlotName, env: WeekEnvelope, now: Date): Promise<string> {
  const text = serialize('week', env.slot, env, env.payload, now);
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
  week?: number; userTeam?: string; nextFixture?: string; played?: number;
  problem?: 'corrupt' | 'newer-version'; message?: string;
}

const fixtureLine = (lw: LoadedWeek): string => {
  const f = lw.state.nextWeek <= 22
    ? lw.teams.length && (lw.state.schedule.find((g) => g.week === lw.state.nextWeek && (g.home === lw.context.userTeam || g.away === lw.context.userTeam))
      ?? null)
    : null;
  if (!f) return lw.state.nextWeek > 22 ? 'season complete' : 'no user game this week';
  return `${f.away} @ ${f.home}`;
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
  return { slot, state: 'ok', kind: 'season', saveId: env.saveId, saveRevision: env.saveRevision, savedAt: env.savedAt, createdAt: env.createdAt, engineVersion: env.engineVersion, dataVersion: env.dataVersion, userTeam: p.userTeam, week: 23, played: p.userResults.length, nextFixture: `champion: ${p.champion}` };
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

/** Slice 5 — read the WHOLE validated envelope (the brag card renders from the save itself: the payload's
 *  own numbers + the envelope's own identity). Same one parser (restore), never throws, never repairs. */
export async function readEnvelope(slot: SlotName): Promise<{ ok: true; env: AnyEnvelope } | { ok: false; message: string }> {
  const r = await storage.read(slotKey(slot));
  if (!r.ok) return { ok: false, message: 'storage unavailable: ' + r.error };
  if (r.value === null) return { ok: false, message: 'slot ' + slot + ' is empty' };
  const parsed = restore(r.value);
  if (!parsed.ok) return { ok: false, message: parsed.message };
  return { ok: true, env: parsed.value };
}
