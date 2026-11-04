import type { SaveFull, SaveMeta } from "./schemas";

export class ConflictError extends Error {
  constructor(public current: SaveMeta) {
    super("This save was changed somewhere else.");
  }
}

async function call<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "content-type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  if (res.status === 409) throw new ConflictError(((await res.json()) as { current: SaveMeta }).current);
  if (!res.ok) throw new Error(`${init?.method ?? "GET"} ${url} failed: ${res.status}`);
  return (res.status === 204 ? undefined : await res.json()) as T;
}

export const api = {
  list: () => call<{ saves: SaveMeta[] }>("/api/saves").then((r) => r.saves),
  get: (id: string) => call<{ save: SaveFull }>(`/api/saves/${id}`).then((r) => r.save),
  create: (body: { name: string; data: string; summary: string }) =>
    call<{ save: SaveMeta }>("/api/saves", { method: "POST", body: JSON.stringify(body) }).then((r) => r.save),
  update: (id: string, body: { data: string; summary: string; baseVersion: number; name?: string }) =>
    call<{ save: SaveMeta }>(`/api/saves/${id}`, { method: "PUT", body: JSON.stringify(body) }).then((r) => r.save),
  remove: (id: string) => call<void>(`/api/saves/${id}`, { method: "DELETE" }),
};
