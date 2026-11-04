// Stable player ids (E1). The Madden file keys a player by `name|pos|team`, which changes on every trade or release.
// data/player-ids.csv (`pid,name,pos,team`) gives each person one id (p00001 ...) that never changes and is never reused.
// The engine, drafts and saves use the pid; the `name|pos|team` key is only how the crosswalk finds the row.
// Rows for players that left the data stay in the file (so their pid is never handed out again); only rows matching the current data are used.
export interface IdRow { pid: string; name: string; pos: string; team: string }
export const IDS_HEADER = 'pid,name,pos,team';
export const keyOf = (name: string, pos: string, team: string): string => `${name}|${pos}|${team}`;
const PID = /^p(\d{5,})$/;

export function parseIds(text: string): IdRow[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0 || lines[0].trim() !== IDS_HEADER) throw new Error('player-ids csv: unexpected header: ' + (lines[0] ?? '(empty)'));
  const rows: IdRow[] = [], pids = new Set<string>(), keys = new Set<string>();
  for (let i = 1; i < lines.length; i++) {
    const m = /^(p\d{5,}),(.*),([A-Z]+),([^,]+)$/.exec(lines[i]);
    if (!m) throw new Error(`player-ids csv line ${i + 1}: cannot parse: ${lines[i]}`);
    const row = { pid: m[1], name: m[2], pos: m[3], team: m[4] };
    if (pids.has(row.pid)) throw new Error('player-ids csv: duplicate pid ' + row.pid);
    const k = keyOf(row.name, row.pos, row.team);
    if (keys.has(k)) throw new Error('player-ids csv: duplicate key ' + k);
    pids.add(row.pid); keys.add(k); rows.push(row);
  }
  return rows;
}
export const formatIds = (rows: readonly IdRow[]): string => IDS_HEADER + '\n' + rows.map((r) => `${r.pid},${r.name},${r.pos},${r.team}`).join('\n') + '\n';
const pidNum = (pid: string): number => +PID.exec(pid)![1];
export const formatPid = (n: number): string => 'p' + String(n).padStart(5, '0');

// Looks every current player up in the crosswalk. Missing row = loud error (run `node --experimental-strip-types tools/player-ids.ts sync`).
export function idMap(rows: readonly IdRow[]): Map<string, string> {
  return new Map(rows.map((r) => [keyOf(r.name, r.pos, r.team), r.pid]));
}

export interface SyncResult { rows: IdRow[]; added: IdRow[]; moved: { pid: string; from: string; to: string }[]; gone: IdRow[] }
// Brings the crosswalk up to date with the current data. `current` is the data's players in file order (name, pos, team).
// 1) an unchanged key keeps its pid. 2) a key with no row whose name|pos matches exactly one UNMATCHED row (and is the only new key with that name|pos) is the same person on a new team: the row's team is updated, pid kept.
// 3) anything else is new: next pid after the highest ever issued. Rows nothing matched are kept untouched ("gone").
export function syncIds(existing: readonly IdRow[], current: readonly { name: string; pos: string; team: string }[]): SyncResult {
  const rows = existing.map((r) => ({ ...r }));
  const byKey = new Map(rows.map((r) => [keyOf(r.name, r.pos, r.team), r]));
  const matched = new Set<IdRow>(), fresh: { name: string; pos: string; team: string }[] = [];
  for (const c of current) {
    const hit = byKey.get(keyOf(c.name, c.pos, c.team));
    if (hit) matched.add(hit); else fresh.push(c);
  }
  const np = (c: { name: string; pos: string }) => c.name + '|' + c.pos;
  const newCount = new Map<string, number>();
  for (const c of fresh) newCount.set(np(c), (newCount.get(np(c)) ?? 0) + 1);
  let next = rows.reduce((m, r) => Math.max(m, pidNum(r.pid)), 0) + 1;
  const added: IdRow[] = [], moved: SyncResult['moved'] = [];
  for (const c of fresh) {
    const cand = rows.filter((r) => !matched.has(r) && r.name === c.name && r.pos === c.pos);
    if (cand.length === 1 && newCount.get(np(c)) === 1) {
      const r = cand[0]; moved.push({ pid: r.pid, from: r.team, to: c.team }); r.team = c.team; matched.add(r);
    } else {
      const r = { pid: formatPid(next++), name: c.name, pos: c.pos, team: c.team }; rows.push(r); matched.add(r); added.push(r);
    }
  }
  return { rows, added, moved, gone: rows.filter((r) => !matched.has(r)) };
}
