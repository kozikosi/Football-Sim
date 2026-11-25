/* seedCode.ts — the seed ↔ code contract (cakepanz-12 T2, the PORCA S1 fix; R2).
 *
 * The DEFECT this file fixes: the displayed code was seed.toString(36) while parseSeed() tried the
 * DECIMAL branch first — so any all-digit base-36 code replayed a DIFFERENT seed (700 of the 9,000
 * seeds in the old 1000–9000 draw range mis-replayed: seed 1296 displayed "100" and ?seed=100
 * loaded seed 100). ~7.8% of the draw range silently loaded the wrong draft.
 * THE FIX: the displayed code is PREFIXED — `b36:<base-36>` — and the parser reads the prefix
 * BEFORE the decimal branch. Every displayed code is now self-describing; the plain-integer and
 * legacy base-36 URL forms still parse (back-compat with links already shared).
 *
 * R2 (the shareable-draw range): the auto-draw fallback widens from 1000–9000 (8,000 drafts) to
 * 100,000–9,999,999 (9,900,000 drafts — 1,237× more draft variety) — the seed is the shareable
 * replay handle now, so the random draw should not recycle 8,000 drafts. The range keeps the
 * codes 4–5 base-36 chars (short enough to read aloud), it CONTAINS the battery's named seeds
 * (a3f2 = 470,990 · k1x9 = 935,613 — the laws' tie-exercising draws stay representative; the
 * "511,086" an earlier revision printed here was WRONG: parseInt('a3f2',36) === 470990 and
 * (511086).toString(36) === 'aycu' — corrected S14, the order §4.8; a comment fix, not a data
 * change), and it
 * stays far from the 1..SEED_MAX contract edge (an explicit ?seed= still accepts any integer).
 * The resolved seed is written back to the URL (?seed=b36:…) so a draft is ALWAYS shareable.
 */

export const SEED_MAX = 2147483647;   // the parse contract's ceiling (unchanged from T3, c11)
export const SEED_MIN = 100000;       // R2: the random draw's first seed
export const SEED_RANGE = 9900000;    // R2: 100,000 … 9,999,999 inclusive

// the canonical code — the ONLY string the product mints or displays for a seed
export function seedToCode(n: number): string {
  return 'b36:' + n.toString(36);
}

// the URL parser. Order matters (the PORCA S1 fix): the b36: prefix FIRST, then a plain decimal
// integer, then a legacy bare base-36 code (only reachable for codes that are not all digits —
// the ambiguity class is gone). Returns null for garbage; the caller falls back to the random draw.
export function parseSeedCode(raw: string): number | null {
  const s = String(raw ?? '').trim();
  if (!s) return null;
  if (s.slice(0, 4) === 'b36:') {
    // S13 (Pickle's minor, Ernie's D4): the payload is ANCHORED — a hand-edited or truncated link
    // like `b36:12abc###` / `b36:1.5` / `b36:12 34` used to parse to a DIFFERENT valid seed
    // (parseInt stops at the first non-base-36 char). A malformed code must fall back to the
    // random draw, never silently load another draft. The rejection test is node battery N35.
    if (!/^[0-9a-z]+$/i.test(s.slice(4))) return null;
    const n = parseInt(s.slice(4), 36);
    return Number.isInteger(n) && n >= 1 && n <= SEED_MAX ? n : null;
  }
  if (/^\d{1,10}$/.test(s)) {
    const n = Number(s);
    return Number.isInteger(n) && n >= 1 && n <= SEED_MAX ? n : null;
  }
  if (/^[0-9a-z]{1,6}$/i.test(s)) {
    const n = parseInt(s, 36);
    return Number.isInteger(n) && n >= 1 && n <= SEED_MAX ? n : null;
  }
  return null;
}

// the random draw (R2): the widened shareable range
export function randomSeed(): number {
  return SEED_MIN + Math.floor(Math.random() * SEED_RANGE);
}

// write the resolved seed back to the URL so the draft is always shareable (R2). Silent on any
// environment without history (the file:// law keeps working — the boot never depends on this).
export function writeSeedToUrl(n: number): void {
  try {
    const u = new URL(location.href);
    u.searchParams.set('seed', seedToCode(n));
    history.replaceState(null, '', u.toString());
  } catch { /* file:// or a sandboxed context — the draft still runs; the URL just cannot carry it */ }
}
