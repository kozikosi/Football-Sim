"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api, ConflictError } from "@/lib/api-client";
import type { SaveFull, SaveMeta } from "@/lib/schemas";
import { decodeState, encodeState } from "@/lib/snapshot";
import type { Engine, EngineSnapshot } from "@/engine";

const POLL_MS = 2000; // how often we check whether the game moved forward
const CURRENT_KEY = "fsim:currentSave";

export type SyncStatus =
  | { kind: "loading" }
  | { kind: "unsaved" }
  | { kind: "saving" }
  | { kind: "saved"; at: string }
  | { kind: "conflict"; current: SaveMeta }
  | { kind: "error"; message: string };

export function summarize(s: EngineSnapshot): string {
  const d = s.draftSim;
  if (!d) return "Not started";
  const team = d.teamNames[d.userIndex] ?? "Unknown team";
  if (s.seasonState) {
    const { phase, currentWeek } = s.seasonState;
    return `${team} · ${phase === "regular" ? `week ${currentWeek}` : phase}`;
  }
  return d.pos >= d.order.length ? `${team} · draft done` : `${team} · pick ${d.pos + 1} of ${d.order.length}`;
}

function initialSaveId(): string | null {
  return new URL(window.location.href).searchParams.get("save") ?? localStorage.getItem(CURRENT_KEY);
}

/**
 * Keeps the running game and one database save in step:
 * autosaves when the game changes, and pulls a newer version saved from another tab or device.
 */
export function useCloudSave(bridge: Engine) {
  const [current, setCurrent] = useState<SaveMeta | null>(null);
  const [status, setStatus] = useState<SyncStatus>(() =>
    typeof window !== "undefined" && initialSaveId() ? { kind: "loading" } : { kind: "unsaved" },
  );
  const lastSig = useRef<string>("");
  const busy = useRef(false);

  const select = useCallback((meta: SaveMeta | null) => {
    setCurrent(meta);
    const url = new URL(window.location.href);
    if (meta) {
      localStorage.setItem(CURRENT_KEY, meta.id);
      url.searchParams.set("save", meta.id);
    } else {
      localStorage.removeItem(CURRENT_KEY);
      url.searchParams.delete("save");
    }
    window.history.replaceState(null, "", url);
  }, []);

  const apply = useCallback(
    (save: SaveFull) => {
      
      bridge.restore(decodeState<EngineSnapshot>(save.data));
      lastSig.current = bridge.signature();
      const { data: _data, ...meta } = save;
      select(meta);
      setStatus({ kind: "saved", at: meta.updatedAt });
    },
    [bridge, select],
  );

  const fail = useCallback(
    (err: unknown) => {
      select(null);
      setStatus({ kind: "error", message: err instanceof Error ? err.message : String(err) });
    },
    [select],
  );

  const load = useCallback((id: string) => api.get(id).then(apply).catch(fail), [apply, fail]);

  const push = useCallback(
    /** `baseVersion` overrides the version we last saw, to overwrite after a conflict. */
    async (opts: { asNew?: string; baseVersion?: number } = {}) => {
      if (busy.current) return;
      busy.current = true;
      setStatus({ kind: "saving" });
      try {
        const snap = bridge.snapshot();
        const sig = bridge.signature();
        const body = { data: encodeState(snap), summary: summarize(snap) };
        let meta: SaveMeta;
        if (opts.asNew || !current) {
          meta = await api.create({ ...body, name: opts.asNew ?? (snap.draftSim?.teamNames[snap.draftSim.userIndex] || "New game") });
        } else {
          meta = await api.update(current.id, { ...body, baseVersion: opts.baseVersion ?? current.version });
        }
        lastSig.current = sig;
        select(meta);
        setStatus({ kind: "saved", at: meta.updatedAt });
      } catch (err) {
        if (err instanceof ConflictError) setStatus({ kind: "conflict", current: err.current });
        else setStatus({ kind: "error", message: err instanceof Error ? err.message : String(err) });
      } finally {
        busy.current = false;
      }
    },
    [bridge, current, select],
  );

  // First load: open the save named in the URL, or the one used last on this device.
  useEffect(() => {
    
    lastSig.current = bridge.signature();
    const id = initialSaveId();
    if (id) api.get(id).then(apply).catch(fail);
    // Run once when the engine is ready.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bridge]);

  // Autosave: when the game state changes and we are attached to a save.
  useEffect(() => {
    if (!current || status.kind === "conflict" || status.kind === "loading") return;
    const t = setInterval(() => {
      if (document.visibilityState === "visible" && bridge.signature() !== lastSig.current) void push();
    }, POLL_MS);
    return () => clearInterval(t);
  }, [bridge, current, status.kind, push]);

  // Pull: when the tab regains focus, fetch a newer version if nothing changed locally.
  useEffect(() => {
    if (!current) return;
    const onFocus = async () => {
      if (busy.current || bridge.signature() !== lastSig.current) return;
      const remote = (await api.list()).find((s) => s.id === current.id);
      if (remote && remote.version > current.version) await load(current.id);
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [bridge, current, load]);

  const detach = useCallback(() => {
    select(null);
    setStatus({ kind: "unsaved" });
  }, [select]);

  return { current, status, load, push, detach };
}
