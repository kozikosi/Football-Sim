// 53-bit string hash (cyrb53): plenty to notice a change, not a security hash. Pure, so storage and tests can call it.
export function hash53(text: string, seed = 0): string {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < text.length; i++) { const c = text.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(14, '0');
}

// ---- Dataset identity (ADR: one canonical form, one named algorithm, so two devices always compute the same hash) ----
// SHA-256 through Web Crypto (browser, worker, Node 20+). It is async: call it when a dataset is loaded, never inside a reducer.
export async function sha256Hex(text: string): Promise<string> {
  const buf = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
// Canonical text of a dataset: rows are fixed-position tuples (no key order to get wrong), sorted by row[0] (the player id) in UTF-16 code-unit order,
// text fields NFC-normalised and trimmed, numbers must be integers (printed as plain integers), no whitespace, a schema marker first.
// Row order, CSV column spacing, line endings and Unicode composition in the source therefore never change the hash; any changed value does.
export const CANONICAL_SCHEMA = 1;
export function canonicalRowsText(rows: readonly (readonly (string | number)[])[]): string {
  const clean = rows.map((r) => r.map((v) => {
    if (typeof v === 'number') { if (!Number.isInteger(v)) throw new Error('canonical dataset: non-integer ' + v); return v; }
    return v.normalize('NFC').trim();
  }));
  clean.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  for (let i = 1; i < clean.length; i++) if (clean[i][0] === clean[i - 1][0]) throw new Error('canonical dataset: duplicate id ' + String(clean[i][0]));
  return JSON.stringify({ schema: CANONICAL_SCHEMA, rows: clean });
}
export const datasetHash = async (rows: readonly (readonly (string | number)[])[]): Promise<string> => 'sha256:' + (await sha256Hex(canonicalRowsText(rows)));
