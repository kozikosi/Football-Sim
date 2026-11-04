import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

let db: typeof import("./db");
beforeAll(async () => {
  process.env.DATABASE_PATH = join(mkdtempSync(join(tmpdir(), "fsim-")), "test.db");
  db = await import("./db");
});

describe("saves table", () => {
  it("creates, reads, updates and deletes a save", () => {
    const meta = db.createSave({ name: "A", data: "{}", summary: "s" });
    expect(db.getSave(meta.id)?.data).toBe("{}");
    const up = db.updateSave(meta.id, { data: '{"x":1}', summary: "t", baseVersion: 1 });
    expect(up.ok && up.save.version).toBe(2);
    expect(db.listSaves().map((s) => s.id)).toContain(meta.id);
    expect(db.deleteSave(meta.id)).toBe(true);
    expect(db.getSave(meta.id)).toBeNull();
  });

  it("rejects a stale write instead of overwriting newer data", () => {
    const meta = db.createSave({ name: "B", data: "{}", summary: "" });
    db.updateSave(meta.id, { data: '{"tab":1}', summary: "", baseVersion: 1 });
    const stale = db.updateSave(meta.id, { data: '{"tab":2}', summary: "", baseVersion: 1 });
    expect(stale).toMatchObject({ ok: false, reason: "conflict", current: { version: 2 } });
    expect(db.getSave(meta.id)?.data).toBe('{"tab":1}');
  });

  it("reports a missing save", () => {
    const res = db.updateSave(crypto.randomUUID(), { data: "{}", summary: "", baseVersion: 1 });
    expect(res).toEqual({ ok: false, reason: "not_found" });
  });
});
