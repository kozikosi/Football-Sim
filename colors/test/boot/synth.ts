// Shared synthetic data (not a test file). Invented names only: nothing here may come from a real ratings file.
const OTHER = ['HB', 'FB', 'WR', 'TE', 'LT', 'RT', 'LG', 'RG', 'C', 'DT', 'LEDG', 'REDG', 'MIKE', 'WILL', 'SAM', 'CB', 'SS', 'FS', 'K', 'P'];
const HEADER = 'name,pos,team,ovr,spd,str';
export function ratingsCsv({ qb = 40, other = 1100, ls = 3 } = {}): string {
  const rows: string[] = [];
  const add = (pos: string, n: number) => rows.push(`Synth Player ${n},${pos},Team ${n % 32},${55 + (n * 7) % 45},${50 + (n * 11) % 49},${50 + (n * 13) % 49}`);
  let n = 0;
  for (let i = 0; i < qb; i++) add('QB', ++n);
  for (let i = 0; i < other; i++) add(OTHER[i % OTHER.length]!, ++n);
  for (let i = 0; i < ls; i++) add('LS', ++n);
  return HEADER + '\n' + rows.join('\n') + '\n';
}
export const EMPTY_FA = HEADER + '\n';
