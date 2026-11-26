// port/suggestWhy.ts — S14/P2 (the ring revival, 2026-11-20): the shell-side ring helpers, ONE
// source for the component, the autosave and the battery (no drifted copies).
//
// PIN-SAFE SPLIT (the S14 order §3.3): the engine-sorted `rows` array IS the active order — the
// engine's own key() ranked it (draftBoard.ts:53-54). The PRIMARY top three are therefore the
// first three ARRAY POSITIONS, never a re-derivation from rendered text or DOM (the scoped
// no-display-parse law, board battery L24). The raw numeric key the view ranks by is discarded by
// the engine's own VM strip (draftBoard.ts:61) — adding it (rawSort) is the ARCHITECT's move;
// the exact §5 proposal rides inbox/ (BLOCKED (engine half)).
//
// The TIE EXTENSION is INTERIM — display-rounded, awaiting rawSort: until the engine exposes the
// raw key, the extension walks past the third row while the DISPLAY string repeats (the same
// lossy parse L13's oracle uses — the two stay PAIRED; never ship a raw-valued oracle against a
// display-valued component).

export interface RingRow { id: string; slotId: string; slotLabel: string; [k: string]: unknown }

// the reason line on a ringed row — from the SAME VM (never parsed text), zero new engine data:
// the first ringed row is the board's best value at its slot; a row that fills one of the user's
// marked needs says so; the rest carry the Wins reading (the board's default ranking).
export function whyFor(row: { slotId: string; slotLabel: string }, rank: number, needs: string[]): string {
  if (rank === 0) return `best value at ${row.slotLabel}`;
  if (needs.includes(row.slotId)) return 'fills your thinnest need';
  return 'most Wins left';
}

// the ring ids: the primary top three BY ARRAY POSITION (the pre-sorted row order — no text
// parse), then the INTERIM display-rounded tie extension (paired with L13's oracle until the
// engine lands rawSort).
export function suggestIdsOf(rows: RingRow[], sort: string): string[] {
  const val = (x: RingRow) => Number(String(x[sort]).replace(/[^0-9.\-]/g, '')) || 0;
  const ids: string[] = [];
  const base = Math.min(3, rows.length);
  for (let i = 0; i < base; i++) ids.push(rows[i].id);   // primary: array position only (L24)
  if (base === 3) {
    const third = val(rows[2]);
    for (let i = 3; i < rows.length && val(rows[i]) === third; i++) ids.push(rows[i].id);   // INTERIM — display-rounded, awaiting rawSort
  }
  return ids;
}

// a STORED ring (the autosave's suggestIds) is honored only when every stored id is still a row
// on the board — auditable against stored data, never a ghost highlight over a stale save.
export function validSavedIds(saved: unknown, onBoard: Set<string>): string[] | null {
  if (!Array.isArray(saved) || saved.length === 0) return null;
  if (!saved.every((x) => typeof x === 'string' && onBoard.has(x))) return null;
  return saved as string[];
}
