// BENCH-2 Phase A browser bridge (Z.ai lane) — exposes the product save path to the A1 driver.
// Same bytes in both arms. Uses ONLY the engine's own contract: envelope (v1) + DraftPayload +
// sync KeyValue writes with the F8 slot assertion + versions.ts stamps. No framework imports.
import { store } from './boot';
import { buildDraftEnvelope, writeDraftSave, readDraftSave, rngPosition, draftSlotKey } from './save-envelope';
import { assertSlotMatchesKey } from '../engine/sports/nfl/app/saves.ts';
import { stamps } from '../engine/sports/nfl/app/versions.ts';
import { userChoose } from '../engine/sports/nfl/engine/draft.ts';
import { makeRng } from '../engine/core/rng.ts';

const SLOT = 'A' as const;
const BAK = 'sim:nfl:slot:A:bak';

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}
const recText = (rec: { seed: number; userTeam: number; pool: unknown; picks: unknown[] }) =>
  JSON.stringify({ seed: rec.seed, userTeam: rec.userTeam, pool: rec.pool, picks: rec.picks });

export const bridge = {
  // Build the envelope from the CURRENT store state and write it to sim:nfl:slot:A (F8-checked).
  async save(): Promise<{ ok: boolean; bytes?: number; error?: string }> {
    const s = store.getState();
    if (!s.record) return { ok: false, error: 'no draft in progress' };
    try {
      const st = await stamps(s.record.pool);
      const env = buildDraftEnvelope(s.record, { ...st, slot: SLOT, saveId: 'bench2-lineage', createdAt: '2026-11-14T00:00:00.000Z', revision: s.record.picks.length + 1 });
      return writeDraftSave(window.localStorage, env);
    } catch (e) { return { ok: false, error: (e as Error).message }; }
  },
  // Read sim:nfl:slot:A, validate, and LOAD it into the store. Returns the resumed state summary.
  async load(): Promise<{ ok: boolean; picks?: number; status?: string; onClock?: number; error?: string }> {
    try {
      const r = readDraftSave(window.localStorage, SLOT);
      if (!r.ok) return { ok: false, error: r.error };
      store.dispatch({ type: 'LOAD', record: r.record });
      const s = store.getState();
      return { ok: true, picks: s.record?.picks.length ?? -1, status: s.status, onClock: s.draft ? s.draft.order[s.draft.pos] : undefined };
    } catch (e) { return { ok: false, error: (e as Error).message }; }
  },
  // Drive the draft to completion with the greedy user policy (the driver's reference policy).
  async completeGreedy(): Promise<{ status: string; picks: number; recordSha: string }> {
    let guard = 0;
    while (store.getState().status === 'drafting' && guard++ < 1200) {
      const cur = store.getState();
      if (!cur.record || !cur.draft) break;
      const st = cur.draft;
      if (st.order[st.pos] === cur.record.userTeam) {
        const c = userChoose(st, st.order[st.pos], makeRng(0).fork('driver'), 'greedy');
        store.dispatch({ type: 'PICK', playerId: c.player.id, slot: c.slot });
      } else break;
    }
    const fin = store.getState();
    return { status: fin.status, picks: fin.record!.picks.length, recordSha: await sha256Hex(recText(fin.record!)) };
  },
  // Make ONE user pick by id+slot (the driver drives the UI for the first picks, then this for speed).
  pickById(playerId: string, slot: string): string { store.dispatch({ type: 'PICK', playerId, slot: slot as never }); return store.getState().status; },
  rngPos(): unknown { const s = store.getState(); return s.record ? rngPosition(s.record) : null; },
  rawSlot(): string | null { return window.localStorage.getItem(draftSlotKey(SLOT)); },
  rawBak(): string | null { return window.localStorage.getItem(BAK); },
  async slotRefusal(): Promise<string | null> {
    // F8 through the real storage module: a slot-B envelope offered under the slot-A key is refused.
    const s = store.getState();
    if (!s.record) return 'no draft';
    const st = await stamps(s.record.pool);
    const envB = buildDraftEnvelope(s.record, { ...st, slot: 'B', saveId: 'bench2-lineage', createdAt: '2026-11-14T00:00:00.000Z' });
    const { LocalStorageModule } = await import('../engine/platform/localstorage.ts');
    const mod = new LocalStorageModule(window.localStorage, { slotCheck: assertSlotMatchesKey });
    const res = await mod.write(draftSlotKey(SLOT), JSON.stringify({ ...envB, savedAt: envB.savedAt }));
    return res.ok ? 'REFUSAL FAILED' : 'refused: ' + res.error;
  },
};
