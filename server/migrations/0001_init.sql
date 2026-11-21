-- Contract: claude/account-sync-contract-2026-11-21.md section 3. Better Auth creates its own tables (user, session, account, verification).
CREATE TABLE saves (
  user_id TEXT NOT NULL, sport TEXT NOT NULL, slot TEXT NOT NULL,
  save_id TEXT NOT NULL, save_revision INTEGER NOT NULL, server_rev INTEGER NOT NULL,
  kind TEXT NOT NULL, schema_version INTEGER NOT NULL,
  engine_version TEXT NOT NULL, data_version TEXT NOT NULL,
  device_id TEXT, saved_at TEXT NOT NULL, updated_at TEXT NOT NULL, deleted_at TEXT,
  envelope TEXT NOT NULL,
  PRIMARY KEY (user_id, sport, slot)
);
CREATE TABLE save_history (
  user_id TEXT NOT NULL, sport TEXT NOT NULL, slot TEXT NOT NULL, archived_seq INTEGER NOT NULL,
  save_id TEXT NOT NULL, save_revision INTEGER NOT NULL, reason TEXT NOT NULL,
  archived_at TEXT NOT NULL, envelope TEXT NOT NULL,
  PRIMARY KEY (user_id, sport, slot, archived_seq)
);
CREATE TABLE runs (
  user_id TEXT NOT NULL, sport TEXT NOT NULL, save_id TEXT NOT NULL, run INTEGER NOT NULL,
  franchise TEXT NOT NULL, year INTEGER NOT NULL, outcome TEXT NOT NULL,
  w INTEGER NOT NULL, l INTEGER NOT NULL, t INTEGER NOT NULL, pf INTEGER NOT NULL, pa INTEGER NOT NULL,
  undefeated INTEGER NOT NULL, perfect INTEGER NOT NULL,
  conf_seed INTEGER, engine_version TEXT NOT NULL, data_version TEXT NOT NULL, recorded_at TEXT NOT NULL,
  detail TEXT NOT NULL,
  PRIMARY KEY (user_id, sport, save_id, run)
);
CREATE TABLE shares (
  id TEXT PRIMARY KEY, token_hash TEXT NOT NULL UNIQUE,
  user_id TEXT NOT NULL, sport TEXT NOT NULL, kind TEXT NOT NULL,
  created_at TEXT NOT NULL, expires_at TEXT, revoked_at TEXT, snapshot TEXT NOT NULL
);
CREATE INDEX shares_by_user ON shares (user_id);
