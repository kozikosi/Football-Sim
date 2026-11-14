// BENCH-2 Phase A (Z.ai lane, 2026-11-14) — the recommended save path, assembled from the ENGINE'S OWN
// contract. Nothing here designs a new schema (that is Claude's): this module RECOMMENDS the engine's
// existing pieces and wires them together so the resume test can prove them:
//   core/envelope.ts        — outer envelope (SCHEMA_VERSION 1, slots A–C, saveRevision monotonic)
//   sports/nfl/app/saves.ts — the NFL payload (kind 'draft' → DraftPayload) + assertSlotMatchesKey (F8)
//   core/storage-local.ts   — LocalStorageModule (slot-refusing writes, F8-injected)
//   sports/nfl/app/versions.ts — engineVersion + dataVersion stamps (E5)
// RNG POSITION (A1): the engine's RNG is label-keyed and stateless (core/rng.ts fork(label) =
// makeRng(seed ^ hashString(label))); the store advances CPU picks via fork('p' + pos) keyed by the pick
// position (store.ts advance). There is NO sequential cursor to save: (seed, picks.length) IS the RNG
// position. rngPosition() below states it explicitly so the envelope's answer is on the record.
import { parseEnvelope, serialize } from '../engine/core/envelope.ts';
import type { Envelope, ParseResult, SaveMeta, SlotName } from '../engine/core/envelope.ts';
import { sportKey } from '../engine/core/keys.ts';
import { assertSlotMatchesKey } from '../engine/sports/nfl/app/saves.ts';
import type { DraftPayload } from '../engine/sports/nfl/app/saves.ts';
import { parseRecord } from '../engine/sports/nfl/app/store.ts';
import type { KeyValue } from '../engine/sports/nfl/app/store.ts';

export type DraftEnvelope = Envelope<'nfl', 'draft', DraftPayload>;

export const draftSlotKey = (slot: SlotName): string => sportKey('nfl', 'slot:' + slot);

export interface EnvelopeOptions {
  slot?: SlotName;              // default 'A'
  saveId?: string;              // default minted here (uuid when available)
  createdAt?: string;           // default now — set ONCE per lineage in a real product
  engineVersion?: string;       // default: caller passes versions.ts stamps()
  dataVersion?: string;
  revision?: number;            // default: picks.length + 1 (every committed transition +1)
  now?: Date;                   // injectable clock for tests
}

export function buildDraftEnvelope(record: DraftPayload, o: EnvelopeOptions = {}): DraftEnvelope {
  const slot = o.slot ?? 'A';
  const meta: SaveMeta = {
    engineVersion: o.engineVersion ?? 'bench2-test',
    dataVersion: o.dataVersion ?? 'sha256:unspecified',
    saveId: o.saveId ?? mintId(),
    saveRevision: o.revision ?? record.picks.length + 1,
    createdAt: o.createdAt ?? (o.now ?? new Date()).toISOString(),
  };
  return { sport: 'nfl', kind: 'draft', schemaVersion: 1, slot, savedAt: (o.now ?? new Date()).toISOString(), payload: record, ...meta };
}

export function mintId(): string {
  const g = globalThis.crypto as Crypto | undefined;
  if (g && 'randomUUID' in g) return g.randomUUID();
  return 'bench2-' + Math.floor(Math.random() * 2 ** 53).toString(36);
}

// The write path: slot-assert (F8) BEFORE the envelope lands under a key naming another slot.
export function writeDraftSave(kv: KeyValue, env: DraftEnvelope): { ok: true; bytes: number } | { ok: false; error: string } {
  try {
    const key = draftSlotKey(env.slot);
    const why = assertSlotMatchesKey(env.slot, key);
    if (why) return { ok: false, error: why };
    const text = serialize('nfl', 'draft', env.slot, metaOf(env), env.payload, new Date(env.savedAt));
    kv.setItem(key, text);
    return { ok: true, bytes: text.length };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}

const metaOf = (env: DraftEnvelope): SaveMeta => ({ engineVersion: env.engineVersion, dataVersion: env.dataVersion, saveId: env.saveId, saveRevision: env.saveRevision, createdAt: env.createdAt });

export function readDraftSave(kv: KeyValue, slot: SlotName): { ok: true; env: DraftEnvelope; record: DraftPayload } | { ok: false; error: string; reason?: 'corrupt' | 'newer-version' | 'empty' } {
  let raw: string | null = null;
  try { raw = kv.getItem(draftSlotKey(slot)); } catch (e) { return { ok: false, error: (e as Error).message }; }
  if (!raw) return { ok: false, error: 'no save in slot ' + slot, reason: 'empty' };
  const outer = parseEnvelope(JSON.parse(raw));
  if (!outer.ok) return { ok: false, error: outer.message, reason: outer.reason };
  try { return { ok: true, env: outer.value as DraftEnvelope, record: parseRecord(outer.value.payload) }; }
  catch (e) { return { ok: false, error: (e as Error).message, reason: 'corrupt' }; }
}

// A1's answer, in one object: the RNG position is DERIVED, not stored, and that is why the save is a
// LOG (every pick) rather than a snapshot. Position-keyed forks make resume exactly reproducible.
export function rngPosition(rec: DraftPayload): {
  model: 'position-keyed-forks'; seed: number; picksMade: number; nextCpuForkKey: string; userFork: string;
  cursorRequired: false; why: string;
} {
  return {
    model: 'position-keyed-forks',
    seed: rec.seed,
    picksMade: rec.picks.length,
    nextCpuForkKey: 'p' + rec.picks.length,
    userFork: 'user',
    cursorRequired: false,
    why: 'core/rng.ts fork(label) = makeRng(seed ^ hashString(label)): same seed + same label = same stream, regardless of draw order. store.ts advance() draws CPU picks from fork("p"+pos), so pick index alone keys the stream; the record carries (seed, picks) and nothing else is needed.',
  };
}
