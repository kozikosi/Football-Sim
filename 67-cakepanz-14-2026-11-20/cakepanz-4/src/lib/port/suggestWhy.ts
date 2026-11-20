// port/suggestWhy.ts — S14 ring revival: the suggestion ring driven by a pure function.
// topSuggestedIds(rows, sort) returns the Set of row ids that carry the ring, plus the
// id of the LAST ringed row (the lowest of the top 3) which gets the glow.
export function topSuggestedIds(rows: any[], sort: string): { ids: Set<string>; lastId: string | null } {
  const val = (x: any) => Number(String(x[sort]).replace(/[^0-9.\-]/g, '')) || 0;
  const ids = new Set<string>();
  if (rows.length === 0) return { ids, lastId: null };
  const base = Math.min(3, rows.length);
  for (let i = 0; i < base; i++) ids.add(rows[i].id);
  let lastIdx = base - 1;
  if (base === 3) {
    const third = val(rows[2]);
    for (let i = 3; i < rows.length && val(rows[i]) === third; i++) { ids.add(rows[i].id); lastIdx = i; }
  }
  return { ids, lastId: rows[lastIdx]?.id ?? null };
}

export function whyFor(row: any, sort: string): string {
  return 'top ' + sort + ' on the board';
}
