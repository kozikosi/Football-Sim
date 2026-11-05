// Read-only save sharing (w74 item 5g, Z.ai DRAFT — Beam's idea).
//
// THE FLOW
//   share:   any save screen → "Share read-only" → the app serialises the CURRENT envelope (already validated on
//            load), wraps it (format below) and hands the user a .colors-share.json file (file download; the
//            offline-first product's safest transport — the save IS a file, no server involved).
//   view:    the recipient opens the app and imports the file (the same import path the empty-dataset state
//            already needs) → the app parses the wrapper, loads the inner envelope through the NORMAL restore
//            path (validation is identical — a shared save gets zero extra trust), and boots the viewer.
//   viewer:  app-store.svelte.ts's loadReadOnly() flips the read-only flag; the dispatch guard refuses
//            PICK/UNDO/START/LOAD. The viewer sees everything: board, roster, feed, standings.
//
// WHAT THE VIEWER CAN AND CANNOT DO
//   CAN: look at every screen the save's kind supports; export the SAME share again (copies propagate intact);
//        run nothing that writes (no saver is wired in the viewer session; localStorage is never touched).
//   CANNOT: pick, undo, play a week, run it back, or overwrite a slot (the dispatch guard + no-saver wiring).
//
// FORMAT (versioned, additive): { share: { v: 1, readOnly: true, exportedAt: ISO, note?: string }, save: <envelope JSON text> }
// The inner save stays the EXACT envelope text — byte-identical re-export, no re-serialisation drift.
import { restore } from './saves.ts';
import type { AnyEnvelope } from './saves.ts';

export const SHARE_V = 1;
export const SHARE_EXTENSION = '.colors-share.json';

export interface ShareWrapper {
  share: { v: number; readOnly: true; exportedAt: string; note?: string };
  save: string;                     // the envelope JSON text, byte-exact
}

// `now` is injected (the app-layer purity test bans `new Date` here; the UI layer owns wall-clock — the same
// pattern the envelope's serialize(now) already uses).
export function makeShare(envText: string, now: Date, note?: string): ShareWrapper {
  return { share: { v: SHARE_V, readOnly: true, exportedAt: now.toISOString(), ...(note ? { note } : {}) }, save: envText };
}

export type ShareParseResult =
  | { ok: true; envelope: AnyEnvelope; wrapper: ShareWrapper }
  | { ok: false; reason: 'not-share' | 'share-version' | 'bad-save'; message: string };

/** Parse a share file. The inner envelope goes through the SAME restore() validation as any loaded save. */
export function parseShare(text: string): ShareParseResult {
  let w: unknown;
  try { w = JSON.parse(text); } catch { return { ok: false, reason: 'not-share', message: 'that file is not JSON' }; }
  if (typeof w !== 'object' || w === null || Array.isArray(w) || !('share' in w) || !('save' in w))
    return { ok: false, reason: 'not-share', message: 'that file is not a Colors share (no share/save fields)' };
  const wrapper = w as ShareWrapper;
  if (wrapper.share?.v !== SHARE_V) return { ok: false, reason: 'share-version', message: `share format v${String(wrapper.share?.v)} — this build reads v${SHARE_V}` };
  if (wrapper.share?.readOnly !== true) return { ok: false, reason: 'not-share', message: 'this is not a read-only share' };
  const env = restore(wrapper.save);
  if (!env.ok) return { ok: false, reason: 'bad-save', message: 'the shared save did not validate: ' + env.message };
  return { ok: true, envelope: env.value, wrapper };
}

// The two strings the share button needs.
export function shareFileName(env: AnyEnvelope): string {
  const slug = env.payload && typeof env.payload === 'object' && 'userTeam' in env.payload
    ? String((env.payload as { userTeam: string }).userTeam).toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : 'draft';
  return `${env.kind}-${slug}-${env.saveId.slice(0, 8)}${SHARE_EXTENSION}`;
}
