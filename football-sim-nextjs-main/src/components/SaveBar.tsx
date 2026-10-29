"use client";

import { useState } from "react";
import type { Engine } from "@/engine";
import { api } from "@/lib/api-client";
import type { SaveMeta } from "@/lib/schemas";
import styles from "./SaveBar.module.css";
import { type SyncStatus, useCloudSave } from "./useCloudSave";

function statusText(s: SyncStatus): string {
  switch (s.kind) {
    case "loading":
      return "Loading…";
    case "unsaved":
      return "Not saved";
    case "saving":
      return "Saving…";
    case "saved":
      return `Saved ${new Date(s.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    case "conflict":
      return "Changed in another tab or device";
    case "error":
      return `Error: ${s.message}`;
  }
}

export function SaveBar({ engine }: { engine: Engine }) {
  const { current, status, load, push, detach } = useCloudSave(engine);
  const [open, setOpen] = useState(false);
  const [saves, setSaves] = useState<SaveMeta[] | null>(null);

  const refresh = async () => setSaves(await api.list());
  const toggle = async () => {
    setOpen(!open);
    if (!open) await refresh();
  };
  const remove = async (id: string) => {
    if (!window.confirm("Delete this save? This cannot be undone.")) return;
    await api.remove(id);
    if (current?.id === id) detach();
    await refresh();
  };

  return (
    <aside className={styles.bar} aria-label="Saved games">
      <div className={styles.row}>
        <span className={styles.status} role="status">
          {current ? <b>{current.name}</b> : null} {statusText(status)}
        </span>
        {status.kind === "conflict" ? (
          <>
            <button type="button" onClick={() => current && load(current.id)}>
              Load theirs
            </button>
            <button type="button" onClick={() => push({ baseVersion: status.current.version })}>
              Keep mine
            </button>
          </>
        ) : current ? null : (
          <button type="button" onClick={() => push()}>
            Save
          </button>
        )}
        <button type="button" onClick={toggle} aria-expanded={open}>
          Saves
        </button>
      </div>
      {open && (
        <div className={styles.list}>
          <button type="button" onClick={() => push({ asNew: window.prompt("Name this save", "My season") ?? undefined })}>
            Save as new…
          </button>
          {current && (
            <button type="button" onClick={detach}>
              Stop syncing
            </button>
          )}
          {saves === null ? (
            <p>Loading…</p>
          ) : saves.length === 0 ? (
            <p>No saves yet.</p>
          ) : (
            <ul>
              {saves.map((s) => (
                <li key={s.id} aria-current={s.id === current?.id}>
                  <button type="button" className={styles.load} onClick={() => load(s.id).then(() => setOpen(false))}>
                    <b>{s.name}</b>
                    <small>
                      {s.summary} · {new Date(s.updatedAt).toLocaleString()}
                    </small>
                  </button>
                  <button type="button" onClick={() => remove(s.id)} aria-label={`Delete ${s.name}`}>
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </aside>
  );
}
