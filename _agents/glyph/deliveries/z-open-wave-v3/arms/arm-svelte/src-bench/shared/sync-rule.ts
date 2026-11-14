// BENCH-2 Phase G (Z.ai lane, 2026-11-14) — the conflict rule for cross-device sync, tested against
// DELIBERATELY WRONG CLOCKS.
// Owner's rule: "user always play most recent progress." Wall clock is not progress: two offline devices
// have two clocks and either can be wrong. The rule below therefore treats saveRevision (the envelope's
// monotonic counter, core/envelope.ts SaveMeta: "+1 on every committed transition; never decreases, not
// even on undo") as progress, uses the wall clock ONLY to break a genuine revision tie, and never
// destroys the loser: the lower-progress envelope is retained under slot:X:bak and the user is told once.
import type { Envelope, SlotName } from '../engine/core/envelope.ts';
import { parseEnvelope, serialize } from '../engine/core/envelope.ts';
import { sportKey, globalKey } from '../engine/core/keys.ts';

export type AnyEnvelope = Envelope<string, string, unknown>;

export interface ConflictDecision {
  winner: AnyEnvelope;
  loser: AnyEnvelope;
  basis: 'saveRevision' | 'savedAt-tiebreak' | 'same-envelope';
  revisionWinner: number;
  revisionLoser: number;
  toldOnceKey: string;      // the profile key the app sets to surface the one-time notice
  notice: string;
}

// Pure decision: no writes, no clock reads — both clocks come from the envelopes themselves, so the test
// can pass deliberately wrong ones. Different saveIds are different lineages, not conflicts: keep both.
export function resolveConflict(a: AnyEnvelope, b: AnyEnvelope): ConflictDecision | { ok: false; error: string } {
  if (a.saveId !== b.saveId) return { ok: false, error: 'conflict: different saveIds are different lineages, not a conflict (keep both, no resolution)' };
  if (a.saveRevision === b.saveRevision && a.savedAt === b.savedAt) {
    return { winner: a, loser: b, basis: 'same-envelope', revisionWinner: a.saveRevision, revisionLoser: b.saveRevision, toldOnceKey: globalKey('profile'), notice: '' };
  }
  const winner = a.saveRevision > b.saveRevision ? a : b.saveRevision > a.saveRevision ? b : (Date.parse(a.savedAt) >= Date.parse(b.savedAt) ? a : b);
  const loser = winner === a ? b : a;
  const byRevision = a.saveRevision !== b.saveRevision;
  return {
    winner,
    loser,
    basis: byRevision ? 'saveRevision' : 'savedAt-tiebreak',
    revisionWinner: winner.saveRevision,
    revisionLoser: loser.saveRevision,
    toldOnceKey: globalKey('profile'),
    notice: byRevision
      ? `Restored the device with more progress (revision ${winner.saveRevision} > ${loser.saveRevision}). The other device's save is kept in the backup slot; nothing was lost.`
      : `Both devices had the same progress (revision ${winner.saveRevision}); the most recently saved one was restored. The other is kept in the backup slot.`,
  };
}

// The apply step. The caller passes BOTH envelopes' own serialized bytes (the sync path never rebuilds a
// save it does not understand — corrupt-never-repair starts at the write). Winner takes the slot (after
// the engine's F8 slot assertion via serialize's own stamp), loser is RETAINED under slot:X:bak, and the
// told-once flag is written exactly once.
export function applyConflict(
  kv: import('../engine/sports/nfl/app/store.ts').KeyValue,
  decision: ConflictDecision,
  slot: SlotName,
  winnerText: string,
  loserText: string,
): { winnerKey: string; loserKey: string; noticeFlagWritten: boolean; loserBytes: number } {
  const winnerKey = sportKey('nfl', 'slot:' + slot);
  const loserKey = sportKey('nfl', 'slot:' + slot + ':bak');
  kv.setItem(winnerKey, winnerText);
  kv.setItem(loserKey, loserText);
  let noticeFlagWritten = false;
  if (!kv.getItem(decision.toldOnceKey)) { kv.setItem(decision.toldOnceKey, decision.notice); noticeFlagWritten = true; }
  return { winnerKey, loserKey, noticeFlagWritten, loserBytes: loserText.length };
}

// Convenience for tests and the driver: stamp + serialize one envelope with its OWN meta (the bytes a
// device would actually put on the wire).
export function envelopeText(env: AnyEnvelope): string {
  return serialize('nfl', env.kind, env.slot, metaOf(env), env.payload, new Date(env.savedAt));
}
const metaOf = (env: AnyEnvelope) => ({ engineVersion: env.engineVersion, dataVersion: env.dataVersion, saveId: env.saveId, saveRevision: env.saveRevision, createdAt: env.createdAt });

export { parseEnvelope };
