// Seed-share URL (w74 item 5f, Z.ai DRAFT — DS's idea): the world seed in a URL so a friend gets the IDENTICAL
// draft class and schedule and plays their OWN choices.
//
// The whole feature is one field and one param: `?w=<seed>`. It does NOT architect against replay — it shares
// the WORLD (draft pool, schedule, CPU behaviour are seed-derived), never the user's actions. What a friend who
// opens the link gets: the same pool and the same draft order for that seed; their picks are theirs.
//
// ENVELOPE FIELD (additive, one line for the freeze doc — item 8b): `worldSeed?: number` on the envelope's
// SaveMeta — the seed the save's world came from. For the v1 draft flow worldSeed === seed (START's seed), and
// the field exists so a later world/seed split (a shared league world, per-save seasons) does not unfreeze the
// envelope. GUESS (flagged for the Architect): optional + additive, schemaVersion stays 1; the conformance test
// treats an absent worldSeed as "worldSeed === seed" for draft saves.
import type { SaveMeta } from '../../../core/envelope.ts';

export const SEED_PARAM = 'w';

/** The URL a friend opens: same world, their own choices. Relative; nothing but the param travels. */
export function seedShareUrl(seed: number): string {
  const base = typeof location !== 'undefined' ? location.origin + location.pathname : '/';
  return `${base}?${SEED_PARAM}=${encodeURIComponent(String(seed))}`;
}

/** Read the seed out of a query string ('' = current location). Returns null when absent or malformed. */
export function seedFromUrl(query: string = typeof location !== 'undefined' ? location.search : ''): number | null {
  const v = new URLSearchParams(query).get(SEED_PARAM);
  if (v === null || !/^-?\d{1,9}$/.test(v)) return null;
  const n = Number(v);
  return Number.isSafeInteger(n) ? n : null;
}

/** The envelope side: write the field (serialize-time) and read it with the draft-save fallback (load-time). */
export function withWorldSeed(meta: SaveMeta & { worldSeed?: number }, seed: number): SaveMeta & { worldSeed: number } {
  return { ...meta, worldSeed: meta.worldSeed ?? seed };
}
export function worldSeedOf(meta: { worldSeed?: number; } & { seedFallback?: number }): number | null {
  if (meta.worldSeed !== undefined) return meta.worldSeed;
  return meta.seedFallback ?? null;   // draft saves pre-worldSeed: the payload's seed IS the world seed
}
