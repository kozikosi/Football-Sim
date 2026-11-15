// savesService.ts — the app-side save/load service (identical bytes in both arms): the ONLY file the
// UI talks to for saves. A thin composition of the pin's own modules (core/envelope.ts + app/saves.ts +
// platform/localstorage.ts); corrupt-never-repair: nothing here edits stored bytes, every failure is a
// Result the panel shows verbatim. Draft-only for the four-slice surface; week/season saves are refused
// with their kind named, never half-loaded.
import { serialize, restore, assertSlotMatchesKey } from '../engine/sports/nfl/app/saves.ts';
import type { AnyEnvelope, DraftPayload } from '../engine/sports/nfl/app/saves.ts';
import { SCHEMA_VERSION, SLOT_NAMES } from '../engine/core/envelope.ts';
import type { SlotName } from '../engine/core/envelope.ts';
import { createLocalStorageModule } from '../engine/platform/localstorage.ts';
import type { StorageModule } from '../engine/core/app.ts';
import { sportKey } from '../engine/core/keys.ts';

// The meta the app stamps (engineVersion + dataVersion name the pin, informational on resume per F5;
// saveId/createdAt are minted once at boot — the app's one session draft; saveRevision = 1 + the
// record's picks, the same law the Cakepanz panel used).
export interface AppSaveMeta { engineVersion: string; dataVersion: string; saveId: string; saveRevision: number; createdAt: string }

export const slotKey = (slot: SlotName): string => sportKey('nfl', 'slot:' + slot);
export const SLOT_LIST: readonly SlotName[] = SLOT_NAMES;
export const storage: StorageModule = createLocalStorageModule({ slotCheck: assertSlotMatchesKey });

export interface WeekSaveSummary { seed: number; year: number; run: number; nextWeek: number; scores: number; playoffs: number; userTeam?: number }
export interface SlotSummary {
  slot: SlotName;
  state: 'empty' | 'ok' | 'ok-week' | 'refused';
  kind?: 'draft' | 'week' | 'season';
  saveRevision?: number; savedAt?: string;
  picks?: number; userTeamIndex?: number;
  weekSummary?: WeekSaveSummary;           // week-save hydration: the panel shows the week state instead of a bare refusal
  problem?: 'corrupt' | 'newer-version'; message?: string;
}

// The save invariant (Owner ruling): ONE blob per slot + a version check on every read. The version
// check is the engine's restore() (schemaVersion above this build's = refused as newer-version);
// the one-blob half is enforced here: a slot holding anything but a single JSON object is corrupt
// by definition — refused before parse, never repaired, never defaulted.
function oneBlob(text: string): { ok: true } | { ok: false; message: string } {
  const t = text.trim();
  if (!t.startsWith('{') || !t.endsWith('}')) return { ok: false, message: 'envelope: not a single JSON blob' };
  return { ok: true };
}

/** Read one slot and classify it. Never throws; never repairs. */
export async function readSlot(slot: SlotName): Promise<SlotSummary> {
  const r = await storage.read(slotKey(slot));
  if (!r.ok) return { slot, state: 'refused', problem: 'corrupt', message: 'storage unavailable: ' + r.error };
  if (r.value === null) return { slot, state: 'empty' };
  const blob = oneBlob(r.value);
  if (!blob.ok) return { slot, state: 'refused', problem: 'corrupt', message: blob.message };
  const parsed = restore(r.value);                       // outer + inner shape; refuses other sports' saves
  if (!parsed.ok) return { slot, state: 'refused', problem: parsed.reason, message: parsed.message };
  const env = parsed.value as AnyEnvelope;
  if (env.kind === 'week') {
    // Week-save hydration (owed, 2026-11-15): a week envelope is SHOWN, not refused blind — its plain
    // RunState metadata hydrates into the panel. Loading it stays refused (the week-stepper screen
    // does not exist yet; see measurements/season-missing-vms.txt item 3).
    const p = (env as { payload: Record<string, unknown> }).payload;
    return {
      slot, state: 'ok-week', kind: 'week', saveRevision: env.saveRevision, savedAt: env.savedAt,
      weekSummary: {
        seed: Number(p.seed ?? -1), year: Number(p.year ?? 0), run: Number(p.run ?? 0), nextWeek: Number(p.nextWeek ?? 0),
        scores: Array.isArray(p.scores) ? p.scores.length : 0, playoffs: Array.isArray(p.playoffs) ? p.playoffs.length : 0,
        userTeam: typeof p.userTeam === 'number' ? p.userTeam : undefined,
      },
    };
  }
  if (env.kind !== 'draft') return { slot, state: 'refused', problem: 'corrupt', message: 'slot ' + slot + ' holds a ' + env.kind + ' save; this panel loads drafts' };
  const p = (env as AnyEnvelope & { kind: 'draft' }).payload as DraftPayload;
  return { slot, state: 'ok', kind: 'draft', saveRevision: env.saveRevision, savedAt: env.savedAt, picks: p.picks.length, userTeamIndex: p.userTeam };
}

/** Serialize + write the current draft payload to a slot. Returns '' on success or the refusal. */
export async function saveDraft(slot: SlotName, payload: DraftPayload, meta: AppSaveMeta, now: Date): Promise<string> {
  const text = serialize('draft', slot, meta, payload, now);
  const r = await storage.write(slotKey(slot), text);
  return r.ok ? '' : 'storage refused the write: ' + r.error;
}

/** Load a draft slot: returns the parsed payload for the store's LOAD action (the store re-parses — one parser). */
export async function loadDraft(slot: SlotName): Promise<{ ok: true; record: unknown } | { ok: false; message: string }> {
  const r = await storage.read(slotKey(slot));
  if (!r.ok) return { ok: false, message: 'storage unavailable: ' + r.error };
  if (r.value === null) return { ok: false, message: 'slot ' + slot + ' is empty' };
  const blob = oneBlob(r.value);
  if (!blob.ok) return { ok: false, message: blob.message };
  const parsed = restore(r.value);
  if (!parsed.ok) return { ok: false, message: parsed.message };
  if (parsed.value.kind !== 'draft') return { ok: false, message: 'slot ' + slot + ' holds a ' + parsed.value.kind + ' save, not a draft' };
  return { ok: true, record: (parsed.value as AnyEnvelope & { kind: 'draft' }).payload };
}

// The two refusal proofs, plantable from the panel: a structurally broken envelope (the engine's own
// inner check refuses it verbatim) and a valid outer envelope stamped by a NEWER build (schemaVersion
// above this build's). The read path must refuse both verbatim; nothing repaired, nothing defaulted.
export async function injectBroken(slot: SlotName, kind: 'corrupt' | 'newer'): Promise<void> {
  const text = kind === 'corrupt'
    ? '{"sport":"nfl","kind":"week","schemaVersion":1,"engineVersion":"x","dataVersion":"y","saveId":"z","saveRevision":1,"createdAt":"2026-01-01T00:00:00.000Z","slot":"' + slot + '","savedAt":"2026-01-01T00:00:00.000Z","payload":{"roster":[]}}'
    : '{"sport":"nfl","kind":"draft","schemaVersion":' + (SCHEMA_VERSION + 8) + ',"engineVersion":"nfl1.0","dataVersion":"sha256:0","saveId":"newer","saveRevision":1,"createdAt":"2026-01-01T00:00:00.000Z","slot":"' + slot + '","savedAt":"2026-01-01T00:00:00.000Z","payload":{"seed":4242,"userTeam":30,"pool":{},"picks":[]}}';   // payload seed 4242 = FRESH (never used this sitting) — the refusal must be by VERSION, not payload
  await storage.write(slotKey(slot), text);
}
