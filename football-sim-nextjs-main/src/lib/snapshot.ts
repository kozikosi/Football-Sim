// JSON encoding for game state. The engine keeps a few Set and Map values,
// which plain JSON.stringify turns into `{}`; we tag them so they survive a round trip.

type Tagged = { $set: unknown[] } | { $map: [unknown, unknown][] };

export function encodeState(value: unknown): string {
  return JSON.stringify(value, (_key, v: unknown) => {
    if (v instanceof Set) return { $set: [...v] } satisfies Tagged;
    if (v instanceof Map) return { $map: [...v] } satisfies Tagged;
    return v;
  });
}

export function decodeState<T = unknown>(text: string): T {
  return JSON.parse(text, (_key, v: unknown) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const keys = Object.keys(v);
      if (keys.length === 1 && keys[0] === "$set" && Array.isArray((v as { $set: unknown }).$set)) {
        return new Set((v as { $set: unknown[] }).$set);
      }
      if (keys.length === 1 && keys[0] === "$map" && Array.isArray((v as { $map: unknown }).$map)) {
        return new Map((v as { $map: [unknown, unknown][] }).$map);
      }
    }
    return v;
  }) as T;
}
