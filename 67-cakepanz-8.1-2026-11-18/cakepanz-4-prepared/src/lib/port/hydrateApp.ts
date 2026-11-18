// port/hydrateApp.ts — Slice 3 (P-316, the cakepanz-7 sitting): the boot rehydration of the FULL
// AppState. The shell already persists settings (port/settings.ts) and offers manual slots
// (Saves.svelte over port/savesApp.ts); what was missing is the AUTO layer: the current draft and
// the running season written to the saver on every state change, read back on boot, so a refresh
// mid-draft lands back on the same board with the same user team, picks and mode.
// Contract-clean by construction:
//   - the envelopes are the engine's OWN serialize()/restore() (one classification path, corrupt-
//     never-repair: a refused blob is returned verbatim, never repaired, never defaulted);
//   - the keys are non-slot keys (sim:nfl:autosave:draft / sim:nfl:autosave:week — core/keys.ts's
//     scheme allows them; F8's slot assertion only binds slot:* keys, and assertSlotMatchesKey
//     returns null for non-slot keys, so the enveloped writes pass the storage module's check);
//   - the slot stamp inside the envelope mirrors the panel conventions ('A' draft / 'C' week) but
//     names no key claim — the key is the autosave's own.
// Framework-blind like the rest of port/ (no svelte, no DOM): the storage module is injectable so
// the node battery (N25) exercises the exact boot path without a browser.
import { serialize, restore, sportKey } from './seam.ts';
import type { DraftPayload, WeekEnvelope, WeekPayload, StorageModule } from './seam.ts';
import { storage as defaultStorage, metaOf } from './savesApp.ts';
import type { AppMeta } from './savesApp.ts';

// the engine's own key scheme (core/keys.ts): non-slot keys, so F8's assertion carries no claim here
export const AUTO_DRAFT_KEY = sportKey('nfl', 'autosave:draft');
export const AUTO_WEEK_KEY = sportKey('nfl', 'autosave:week');

export interface AutosaveLineage { saveId?: string; createdAt?: string; engineVersion?: string; dataVersion?: string; saveRevision?: number; savedAt?: string }
export interface HydratedDraft { kind: 'draft'; record: DraftPayload; lineage: AutosaveLineage }
export interface HydratedWeek { kind: 'week'; env: WeekEnvelope }
export type HydrateRead =
  | { ok: true; draft: HydratedDraft | null; week: HydratedWeek | null }
  | { ok: false; message: string };   // a refusal is the engine's own words, verbatim

/** Write the draft autosave: the WHOLE current record, overwritten whole (never merged). Returns '' or the refusal. */
export async function autosaveDraft(record: DraftPayload, meta: AppMeta, now: Date, mod: StorageModule = defaultStorage): Promise<string> {
  const text = serialize('draft', 'A', metaOf(meta), record, now);
  const r = await mod.write(AUTO_DRAFT_KEY, text);
  return r.ok ? '' : 'autosave refused the write: ' + r.error;
}

/** Write the season autosave: the week payload of the RUNNING season (the stepper's own shape). */
export async function autosaveWeek(payload: WeekPayload, meta: AppMeta, now: Date, mod: StorageModule = defaultStorage): Promise<string> {
  const text = serialize('week', 'C', metaOf(meta), payload, now);
  const r = await mod.write(AUTO_WEEK_KEY, text);
  return r.ok ? '' : 'autosave refused the write: ' + r.error;
}

/** A stale season autosave dies when a NEW draft begins: the season is derived from the draft record. */
export async function clearAutosaveWeek(mod: StorageModule = defaultStorage): Promise<void> {
  await mod.remove(AUTO_WEEK_KEY);
}

/** Read the autosaves back and classify. Never throws, never repairs, never defaults: a blob that
 *  the engine's own restore() refuses comes back as { ok: false, message } verbatim, and the boot
 *  shows it instead of silently landing on an empty shell. */
export async function readAutosave(mod: StorageModule = defaultStorage): Promise<HydrateRead> {
  const draft = await readOne(mod, AUTO_DRAFT_KEY, 'draft');
  if (!draft.ok) return draft;
  const week = await readOne(mod, AUTO_WEEK_KEY, 'week');
  if (!week.ok) return week;
  return { ok: true, draft: draft.value, week: week.value };
}

async function readOne(
  mod: StorageModule, key: string, kind: 'draft' | 'week',
): Promise<{ ok: true; value: HydratedDraft | HydratedWeek | null } | { ok: false; message: string }> {
  const r = await mod.read(key);
  if (!r.ok) return { ok: false, message: 'storage unavailable: ' + r.error };
  if (r.value === null) return { ok: true, value: null };
  const parsed = restore(r.value);
  if (!parsed.ok) return { ok: false, message: parsed.message };        // corrupt-never-repair, verbatim
  const env = parsed.value;
  if (env.kind !== kind) return { ok: false, message: 'autosave: ' + key + ' holds a ' + env.kind + ' save, not a ' + kind };
  const lineageOf = (e: typeof env): AutosaveLineage => ({ saveId: e.saveId, createdAt: e.createdAt, engineVersion: e.engineVersion, dataVersion: e.dataVersion, saveRevision: e.saveRevision, savedAt: e.savedAt });
  if (kind === 'draft') {
    return { ok: true, value: { kind: 'draft', record: (env as typeof env & { kind: 'draft' }).payload as DraftPayload, lineage: lineageOf(env) } };
  }
  return { ok: true, value: { kind: 'week', env: env as unknown as WeekEnvelope } };
}
