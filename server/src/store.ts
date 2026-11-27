// THE ONE DOOR. Every SQL statement that touches saves, save_history, runs or shares lives in this file (contract section 3, test 2).
// A user-owned query is only reachable through scopedDb(db, userId): the id is closed over, so a route handler cannot name another user.
// The single exception is shareByTokenHash (the public read-only route), which looks a row up by the hash of a secret token, never by user.
import type { D1Like } from './d1.ts';

export const KEEP_HISTORY = 3;
export const MAX_RUNS = 5000;
export const MAX_ACTIVE_SHARES = 20;

export interface SaveMeta { slot: string; sport: string; saveId: string; saveRevision: number; serverRev: number; kind: string; savedAt: string; deleted: boolean }
export interface SaveRow {
  user_id: string; sport: string; slot: string; save_id: string; save_revision: number; server_rev: number; kind: string; schema_version: number;
  engine_version: string; data_version: string; device_id: string | null; saved_at: string; updated_at: string; deleted_at: string | null; envelope: string;
}
export interface EnvelopeFacts { saveId: string; saveRevision: number; kind: string; schemaVersion: number; engineVersion: string; dataVersion: string; savedAt: string }
export type WriteResult = { ok: true; serverRev: number; archived: boolean } | { ok: false; reason: 'conflict'; current: SaveMeta | null };
export interface RunRow {
  sport: string; saveId: string; run: number; franchise: string; year: number; outcome: string; w: number; l: number; t: number; pf: number; pa: number;
  undefeated: boolean; perfect: boolean; confSeed: number | null; engineVersion: string; dataVersion: string; recordedAt: string; detail: string;
}
export interface ShareRow { id: string; sport: string; kind: string; created_at: string; expires_at: string | null; revoked_at: string | null; snapshot: string }

const metaOf = (r: SaveRow): SaveMeta => ({ slot: r.slot, sport: r.sport, saveId: r.save_id, saveRevision: r.save_revision, serverRev: r.server_rev, kind: r.kind, savedAt: r.saved_at, deleted: r.deleted_at !== null });

export function scopedDb(db: D1Like, userId: string) {
  const one = (sport: string, slot: string) => db.prepare('SELECT * FROM saves WHERE user_id = ? AND sport = ? AND slot = ?').bind(userId, sport, slot).first<SaveRow>();

  // Copies the live row into save_history (only while it is still at `rev`) and keeps the newest KEEP_HISTORY.
  const keepRungBack = (sport: string, slot: string, rev: number, reason: string, now: string) => [
    db.prepare(
      'INSERT INTO save_history (user_id, sport, slot, archived_seq, save_id, save_revision, reason, archived_at, envelope) ' +
      'SELECT user_id, sport, slot, (SELECT COALESCE(MAX(archived_seq), 0) + 1 FROM save_history h WHERE h.user_id = ? AND h.sport = ? AND h.slot = ?), save_id, save_revision, ?, ?, envelope ' +
      'FROM saves WHERE user_id = ? AND sport = ? AND slot = ? AND server_rev = ?',
    ).bind(userId, sport, slot, reason, now, userId, sport, slot, rev),
    db.prepare(
      'DELETE FROM save_history WHERE user_id = ? AND sport = ? AND slot = ? AND archived_seq <= (SELECT MAX(archived_seq) FROM save_history h WHERE h.user_id = ? AND h.sport = ? AND h.slot = ?) - ?',
    ).bind(userId, sport, slot, userId, sport, slot, KEEP_HISTORY),
  ];

  // Shared by PUT and restore. `base` is the server_rev the caller last saw (null = never seen this slot).
  // Compare-and-swap: both the archive INSERT and the UPDATE are conditional on server_rev = base, and a batch is atomic, so a
  // race yields zero changed rows (a conflict), never a half-write.
  async function commit(sport: string, slot: string, base: number | null, f: EnvelopeFacts, text: string, deviceId: string | null, now: string, forceArchive: boolean, reason: string): Promise<WriteResult> {
    const cur = await one(sport, slot);
    if (!cur) {
      if (base !== null) return { ok: false, reason: 'conflict', current: null };
      const r = await db.prepare(
        'INSERT INTO saves (user_id, sport, slot, save_id, save_revision, server_rev, kind, schema_version, engine_version, data_version, device_id, saved_at, updated_at, deleted_at, envelope) VALUES (?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, NULL, ?) ON CONFLICT (user_id, sport, slot) DO NOTHING',
      ).bind(userId, sport, slot, f.saveId, f.saveRevision, f.kind, f.schemaVersion, f.engineVersion, f.dataVersion, deviceId, f.savedAt, now, text).run();
      if (r.meta.changes !== 1) return { ok: false, reason: 'conflict', current: (await one(sport, slot).then((x) => (x ? metaOf(x) : null))) };
      return { ok: true, serverRev: 1, archived: false };
    }
    if (base !== cur.server_rev) return { ok: false, reason: 'conflict', current: metaOf(cur) };
    // An overwritten live save is kept as a rung-back when it is a different lineage (a fork), or when the write does not advance it.
    const archive = cur.deleted_at === null && (forceArchive || cur.save_id !== f.saveId || f.saveRevision <= cur.save_revision);
    const stmts = archive ? keepRungBack(sport, slot, cur.server_rev, reason, now) : [];
    stmts.push(db.prepare(
      'UPDATE saves SET save_id = ?, save_revision = ?, server_rev = server_rev + 1, kind = ?, schema_version = ?, engine_version = ?, data_version = ?, device_id = ?, saved_at = ?, updated_at = ?, deleted_at = NULL, envelope = ? ' +
      'WHERE user_id = ? AND sport = ? AND slot = ? AND server_rev = ?',
    ).bind(f.saveId, f.saveRevision, f.kind, f.schemaVersion, f.engineVersion, f.dataVersion, deviceId, f.savedAt, now, text, userId, sport, slot, cur.server_rev));
    const res = await db.batch(stmts);
    if (res[res.length - 1].meta.changes !== 1) return { ok: false, reason: 'conflict', current: (await one(sport, slot).then((x) => (x ? metaOf(x) : null))) };
    return { ok: true, serverRev: cur.server_rev + 1, archived: archive };
  }

  return {
    async listSaves(): Promise<SaveMeta[]> {
      const r = await db.prepare('SELECT * FROM saves WHERE user_id = ? ORDER BY sport, slot').bind(userId).all<SaveRow>();
      return r.results.map(metaOf);
    },
    async getSave(sport: string, slot: string): Promise<SaveRow | null> {
      const r = await one(sport, slot);
      return r && r.deleted_at === null ? r : null;
    },
    putSave: commit,
    async deleteSave(sport: string, slot: string, base: number, now: string): Promise<WriteResult> {
      const cur = await one(sport, slot);
      if (!cur || cur.server_rev !== base) return { ok: false, reason: 'conflict', current: cur ? metaOf(cur) : null };
      if (cur.deleted_at !== null) return { ok: true, serverRev: cur.server_rev, archived: false };
      // The deleted save stays restorable (contract section 3: history is written on a soft delete); the purge removes both after PURGE_DAYS.
      const res = await db.batch([
        ...keepRungBack(sport, slot, cur.server_rev, 'deleted', now),
        db.prepare('UPDATE saves SET deleted_at = ?, updated_at = ?, server_rev = server_rev + 1 WHERE user_id = ? AND sport = ? AND slot = ? AND server_rev = ?').bind(now, now, userId, sport, slot, cur.server_rev),
      ]);
      if (res[res.length - 1].meta.changes !== 1) return { ok: false, reason: 'conflict', current: (await one(sport, slot).then((x) => (x ? metaOf(x) : null))) };
      return { ok: true, serverRev: cur.server_rev + 1, archived: true };
    },
    async getHistory(sport: string, slot: string, seq: number): Promise<{ envelope: string } | null> {
      return db.prepare('SELECT envelope FROM save_history WHERE user_id = ? AND sport = ? AND slot = ? AND archived_seq = ?').bind(userId, sport, slot, seq).first<{ envelope: string }>();
    },
    async listHistory(sport: string, slot: string): Promise<{ archived_seq: number; save_id: string; save_revision: number; reason: string; archived_at: string }[]> {
      const r = await db.prepare('SELECT archived_seq, save_id, save_revision, reason, archived_at FROM save_history WHERE user_id = ? AND sport = ? AND slot = ? ORDER BY archived_seq DESC').bind(userId, sport, slot).all<{ archived_seq: number; save_id: string; save_revision: number; reason: string; archived_at: string }>();
      return r.results;
    },
    async countRuns(): Promise<number> {
      const r = await db.prepare('SELECT COUNT(*) AS n FROM runs WHERE user_id = ?').bind(userId).first<{ n: number }>();
      return r ? r.n : 0;
    },
    // INSERT OR IGNORE: a retry or a migration replay is a no-op. Returns true when a new row was written.
    async insertRun(x: RunRow): Promise<boolean> {
      const r = await db.prepare(
        'INSERT OR IGNORE INTO runs (user_id, sport, save_id, run, franchise, year, outcome, w, l, t, pf, pa, undefeated, perfect, conf_seed, engine_version, data_version, recorded_at, detail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      ).bind(userId, x.sport, x.saveId, x.run, x.franchise, x.year, x.outcome, x.w, x.l, x.t, x.pf, x.pa, x.undefeated ? 1 : 0, x.perfect ? 1 : 0, x.confSeed, x.engineVersion, x.dataVersion, x.recordedAt, x.detail).run();
      return r.meta.changes === 1;
    },
    async listRuns(sport: string): Promise<Record<string, unknown>[]> {
      const r = await db.prepare('SELECT save_id, run, franchise, year, outcome, w, l, t, pf, pa, undefeated, perfect, recorded_at FROM runs WHERE user_id = ? AND sport = ? ORDER BY recorded_at, save_id, run').bind(userId, sport).all<Record<string, unknown>>();
      return r.results;
    },
    async getRun(sport: string, saveId: string, run: number): Promise<{ detail: string; franchise: string; year: number; outcome: string; w: number; l: number; t: number; pf: number; pa: number; undefeated: number; perfect: number } | null> {
      return db.prepare('SELECT detail, franchise, year, outcome, w, l, t, pf, pa, undefeated, perfect FROM runs WHERE user_id = ? AND sport = ? AND save_id = ? AND run = ?').bind(userId, sport, saveId, run).first();
    },
    // "Delete my account and data": every row this user owns, in our tables and Better Auth's, in ONE atomic batch.
    // (Better Auth's `verification` rows are keyed by identifier, not user, and OAuth-only sign-in leaves none worth chasing.)
    async deleteAccount(): Promise<{ saves: number; history: number; runs: number; shares: number; sessions: number; accounts: number; users: number }> {
      const r = await db.batch([
        db.prepare('DELETE FROM shares WHERE user_id = ?').bind(userId),
        db.prepare('DELETE FROM runs WHERE user_id = ?').bind(userId),
        db.prepare('DELETE FROM save_history WHERE user_id = ?').bind(userId),
        db.prepare('DELETE FROM saves WHERE user_id = ?').bind(userId),
        db.prepare('DELETE FROM "session" WHERE "userId" = ?').bind(userId),
        db.prepare('DELETE FROM "account" WHERE "userId" = ?').bind(userId),
        db.prepare('DELETE FROM "user" WHERE "id" = ?').bind(userId),
      ]);
      const n = (i: number) => r[i].meta.changes;
      return { shares: n(0), runs: n(1), history: n(2), saves: n(3), sessions: n(4), accounts: n(5), users: n(6) };
    },
    async countActiveShares(now: string): Promise<number> {
      const r = await db.prepare('SELECT COUNT(*) AS n FROM shares WHERE user_id = ? AND revoked_at IS NULL AND (expires_at IS NULL OR expires_at > ?)').bind(userId, now).first<{ n: number }>();
      return r ? r.n : 0;
    },
    async createShare(id: string, tokenHash: string, sport: string, kind: string, now: string, expiresAt: string | null, snapshot: string): Promise<void> {
      await db.prepare('INSERT INTO shares (id, token_hash, user_id, sport, kind, created_at, expires_at, revoked_at, snapshot) VALUES (?, ?, ?, ?, ?, ?, ?, NULL, ?)').bind(id, tokenHash, userId, sport, kind, now, expiresAt, snapshot).run();
    },
    async revokeShare(id: string, now: string): Promise<boolean> {
      const r = await db.prepare('UPDATE shares SET revoked_at = ? WHERE id = ? AND user_id = ? AND revoked_at IS NULL').bind(now, id, userId).run();
      return r.meta.changes === 1;
    },
  };
}
export type Scoped = ReturnType<typeof scopedDb>;

export const PURGE_DAYS = 30;
// Scheduled cleanup (cross-user by nature, so it lives here with the rest of the SQL): soft-deleted saves older than PURGE_DAYS go, with their
// rung-back history, and so do share links that expired or were revoked that long ago. One atomic batch; live data is never matched.
export async function purgeExpired(db: D1Like, now: Date): Promise<{ saves: number; history: number; shares: number }> {
  const cutoff = new Date(now.getTime() - PURGE_DAYS * 86400000).toISOString();
  const r = await db.batch([
    db.prepare('DELETE FROM save_history WHERE EXISTS (SELECT 1 FROM saves s WHERE s.user_id = save_history.user_id AND s.sport = save_history.sport AND s.slot = save_history.slot AND s.deleted_at IS NOT NULL AND s.deleted_at < ?)').bind(cutoff),
    db.prepare('DELETE FROM saves WHERE deleted_at IS NOT NULL AND deleted_at < ?').bind(cutoff),
    db.prepare('DELETE FROM shares WHERE (expires_at IS NOT NULL AND expires_at < ?) OR (revoked_at IS NOT NULL AND revoked_at < ?)').bind(cutoff, cutoff),
  ]);
  return { history: r[0].meta.changes, saves: r[1].meta.changes, shares: r[2].meta.changes };
}

// Public, read-only: found by the SHA-256 of a 128-bit random token. Returns no user id.
export async function shareByTokenHash(db: D1Like, tokenHash: string): Promise<ShareRow | null> {
  return db.prepare('SELECT id, sport, kind, created_at, expires_at, revoked_at, snapshot FROM shares WHERE token_hash = ?').bind(tokenHash).first<ShareRow>();
}
