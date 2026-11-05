// The save envelope, outer half: the ONE contract between the app side (writes payloads) and the storage module (moves envelopes).
// Plain JSON only: no Maps, no Sets, no class instances, no undefined. This file imports nothing, so storage can copy it.
// Storage treats `payload` as opaque and may call parseEnvelope() to validate the outer shape. Each sport owns its payload shapes and
// its own inner check (the NFL's is sports/nfl/app/saves.ts). `sport` and `kind` together say which check applies.
export const SCHEMA_VERSION = 1;

// Sports the app knows. Adding one is a line here (and its `kind` list below), never a change to an existing sport's saves.
export const SPORT_IDS = ['nfl'] as const;
export type SportId = (typeof SPORT_IDS)[number];
// The kinds of save each sport writes. A kind is the sport's own word (a basketball save need not be a "week").
export const SAVE_KINDS: Readonly<Record<SportId, readonly string[]>> = { nfl: ['draft', 'week', 'season'] };
export type SlotName = 'A' | 'B' | 'C';
export const SLOT_NAMES: readonly SlotName[] = ['A', 'B', 'C'];   // slots belong to a sport: nfl slot A and a later sport's slot A are different saves

// Identity and ordering of one save (a lineage: a draft and the seasons played from it). Minted by the app, never by storage.
export interface SaveMeta {
  engineVersion: string;  // ruleset stamp (the sport's own). Informational on resume (the save carries frozen values).
  dataVersion: string;    // canonical SHA-256 of the player dataset the save was made from ('sha256:<64 hex>', see core/hash.ts canonicalHash). Informational on resume.
  saveId: string;         // uuid minted when a draft starts (and again on run-it-back's new slot). The lineage key for sync history and "keep both".
  saveRevision: number;   // integer >= 1, +1 on every committed transition of this save (a pick, an undo, a week). Never decreases, not even on undo.
  createdAt: string;      // ISO 8601, set once with saveId and never changed by later writes.
}
export interface Envelope<S extends string = SportId, K extends string = string, P = unknown> extends SaveMeta {
  sport: S;               // which game this save belongs to. Written always; a save from before this field existed (never shipped) reads as 'nfl'.
  kind: K;
  schemaVersion: number;  // layout of this envelope + payloads. Higher than SCHEMA_VERSION = written by a newer build: never overwrite it.
  slot: SlotName;
  savedAt: string;        // ISO 8601
  payload: P;
}

export type ParseResult<T> = { ok: true; value: T } | { ok: false; reason: 'corrupt' | 'newer-version'; message: string };
const bad = (message: string): { ok: false; reason: 'corrupt'; message: string } => ({ ok: false, reason: 'corrupt', message });
const isObj = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);
const isInt = (x: unknown): x is number => typeof x === 'number' && Number.isInteger(x);
const isStr = (x: unknown): x is string => typeof x === 'string';

// Outer shape only. Storage may call this on load; it never looks inside the payload beyond "is an object".
export function parseEnvelope(x: unknown): ParseResult<Envelope> {
  if (!isObj(x)) return bad('envelope: not an object');
  const sport = x.sport === undefined ? 'nfl' : x.sport;
  if (!isStr(sport) || !(SPORT_IDS as readonly string[]).includes(sport)) return bad('envelope: unknown sport');
  if (!isStr(x.kind) || !SAVE_KINDS[sport as SportId].includes(x.kind)) return bad('envelope: bad kind for ' + sport);
  if (!isInt(x.schemaVersion) || x.schemaVersion < 1) return bad('envelope: bad schemaVersion');
  if (x.schemaVersion > SCHEMA_VERSION) return { ok: false, reason: 'newer-version', message: 'envelope: written by a newer build (schema ' + x.schemaVersion + ')' };
  if (!isStr(x.engineVersion) || !x.engineVersion) return bad('envelope: bad engineVersion');
  if (!isStr(x.dataVersion) || !x.dataVersion) return bad('envelope: bad dataVersion');
  if (!isStr(x.saveId) || !x.saveId) return bad('envelope: bad saveId');
  if (!isInt(x.saveRevision) || x.saveRevision < 1) return bad('envelope: bad saveRevision');
  if (!isStr(x.createdAt) || Number.isNaN(Date.parse(x.createdAt))) return bad('envelope: bad createdAt');
  if (!isStr(x.slot) || !(SLOT_NAMES as readonly string[]).includes(x.slot)) return bad('envelope: bad slot');
  if (!isStr(x.savedAt) || Number.isNaN(Date.parse(x.savedAt))) return bad('envelope: bad savedAt');
  if (!isObj(x.payload)) return bad('envelope: payload is not an object');
  return { ok: true, value: { ...(x as unknown as Envelope), sport: sport as SportId } };
}

// Serialize: stamps the envelope and returns the JSON string storage writes. Throws on anything JSON would silently change (undefined, NaN, Infinity, Map/Set).
export function serialize<S extends SportId, K extends string, P>(sport: S, kind: K, slot: SlotName, meta: SaveMeta, payload: P, now: Date): string {
  if (!SAVE_KINDS[sport].includes(kind)) throw new Error(`envelope: ${sport} has no save kind '${kind}'`);
  const env: Envelope<S, K, P> = { sport, kind, schemaVersion: SCHEMA_VERSION, engineVersion: meta.engineVersion, dataVersion: meta.dataVersion, saveId: meta.saveId, saveRevision: meta.saveRevision, createdAt: meta.createdAt, slot, savedAt: now.toISOString(), payload };
  assertPlain(env, 'envelope');
  return JSON.stringify(env);
}
function assertPlain(x: unknown, path: string): void {
  if (x === null || typeof x === 'string' || typeof x === 'boolean') return;
  if (typeof x === 'number') { if (!Number.isFinite(x)) throw new Error('not plain JSON at ' + path + ': non-finite number'); return; }
  if (Array.isArray(x)) { x.forEach((v, i) => assertPlain(v, path + '[' + i + ']')); return; }
  if (typeof x === 'object' && Object.getPrototypeOf(x) === Object.prototype) { for (const [k, v] of Object.entries(x)) assertPlain(v, path + '.' + k); return; }
  throw new Error('not plain JSON at ' + path + ': ' + (x === undefined ? 'undefined' : typeof x === 'object' ? 'class instance, Map or Set' : typeof x));
}
