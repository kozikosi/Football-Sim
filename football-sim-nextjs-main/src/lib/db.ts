import "server-only";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import type { CreateSaveInput, SaveFull, SaveMeta, UpdateSaveInput } from "./schemas";

// Node's built-in SQLite: no native add-on to install. One file, path set by DATABASE_PATH.
const file = resolve(/*turbopackIgnore: true*/ process.env.DATABASE_PATH ?? "data/fsim.db");

function open(): DatabaseSync {
  mkdirSync(dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS saves (
      id         TEXT PRIMARY KEY,
      name       TEXT NOT NULL,
      summary    TEXT NOT NULL DEFAULT '',
      data       TEXT NOT NULL,
      version    INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS saves_updated ON saves (updated_at DESC);
  `);
  return db;
}

// Reuse one connection across hot reloads in development.
const g = globalThis as unknown as { __fsimDb?: DatabaseSync };
const db = (g.__fsimDb ??= open());

type Row = { id: string; name: string; summary: string; version: number; created_at: string; updated_at: string };
const META = "id, name, summary, version, created_at, updated_at";
const toMeta = (r: Row): SaveMeta => ({
  id: r.id,
  name: r.name,
  summary: r.summary,
  version: r.version,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

export function listSaves(): SaveMeta[] {
  return (db.prepare(`SELECT ${META} FROM saves ORDER BY updated_at DESC LIMIT 100`).all() as Row[]).map(toMeta);
}

export function getSave(id: string): SaveFull | null {
  const r = db.prepare(`SELECT ${META}, data FROM saves WHERE id = ?`).get(id) as (Row & { data: string }) | undefined;
  return r ? { ...toMeta(r), data: r.data } : null;
}

export function createSave(input: CreateSaveInput): SaveMeta {
  const id = randomUUID();
  const now = new Date().toISOString();
  db.prepare("INSERT INTO saves (id, name, summary, data, version, created_at, updated_at) VALUES (?, ?, ?, ?, 1, ?, ?)").run(
    id,
    input.name,
    input.summary,
    input.data,
    now,
    now,
  );
  return { id, name: input.name, summary: input.summary, version: 1, createdAt: now, updatedAt: now };
}

export type UpdateResult = { ok: true; save: SaveMeta } | { ok: false; reason: "not_found" } | { ok: false; reason: "conflict"; current: SaveMeta };

/** Optimistic concurrency: the write succeeds only if nobody saved since `baseVersion`. */
export function updateSave(id: string, input: UpdateSaveInput): UpdateResult {
  const now = new Date().toISOString();
  const res = db
    .prepare(
      `UPDATE saves SET data = ?, summary = ?, name = COALESCE(?, name), version = version + 1, updated_at = ?
       WHERE id = ? AND version = ?`,
    )
    .run(input.data, input.summary, input.name ?? null, now, id, input.baseVersion);
  const row = db.prepare(`SELECT ${META} FROM saves WHERE id = ?`).get(id) as Row | undefined;
  if (!row) return { ok: false, reason: "not_found" };
  if (res.changes === 0) return { ok: false, reason: "conflict", current: toMeta(row) };
  return { ok: true, save: toMeta(row) };
}

export function deleteSave(id: string): boolean {
  return db.prepare("DELETE FROM saves WHERE id = ?").run(id).changes > 0;
}
