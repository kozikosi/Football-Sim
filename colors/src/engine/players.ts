import { idMap, parseIds } from './playerids.ts';
// Player pool. Identity is `name|pos|team` (the new Madden file has three repeated names), never the name alone.
export type Role = 'QB' | 'RB' | 'FB' | 'WR' | 'TE' | 'OT' | 'OG' | 'C' | 'DT' | 'EDGE' | 'ILB' | 'OLB' | 'SS' | 'FS' | 'CB' | 'K' | 'P' | 'LS';
export interface Player {
  id: string;            // stable pid from data/player-ids.csv (p00001 ...). parseCsv alone gives the name|pos|team key; buildPool swaps in the pid.
  name: string;
  pos: string;           // the pos as Madden prints it (HB, LEDG, MIKE ...)
  role: Role;            // the flex-guide role
  team: string;          // NFL team, or 'Free Agent'
  ovr: number; spd: number; str: number;
  freeAgent: boolean;    // cut by a team and kept in the project (Owner 28 Oct); free-agent ratings predate the Week 6 update
}
const ROLE: Record<string, Role> = {
  QB: 'QB', HB: 'RB', FB: 'FB', WR: 'WR', TE: 'TE', LT: 'OT', RT: 'OT', LG: 'OG', RG: 'OG', C: 'C',
  DT: 'DT', LEDG: 'EDGE', REDG: 'EDGE', MIKE: 'ILB', WILL: 'OLB', SAM: 'OLB', CB: 'CB', SS: 'SS', FS: 'FS', K: 'K', P: 'P', LS: 'LS',
};
export function parseCsv(text: string, freeAgent: boolean): Player[] {
  const out: Player[] = [];
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines[0].trim() !== 'name,pos,team,ovr,spd,str') throw new Error('players csv: unexpected header: ' + lines[0]);
  for (let i = 1; i < lines.length; i++) {
    const m = /^(.*),([A-Z]+),([^,]+),(\d+),(\d+),(\d+)$/.exec(lines[i]);
    if (!m) throw new Error(`players csv line ${i + 1}: cannot parse: ${lines[i]}`);
    const [, name, pos, team, ovr, spd, str] = m;
    const role = ROLE[pos];
    if (!role) throw new Error(`players csv line ${i + 1}: unknown position ${pos}`);
    out.push({ id: `${name}|${pos}|${team}`, name, pos, role, team, ovr: +ovr, spd: +spd, str: +str, freeAgent });
  }
  return out;
}
export function buildPool(ratingsCsv: string, freeAgentsCsv: string, idsCsv: string): Player[] {
  const keyed = [...parseCsv(ratingsCsv, false), ...parseCsv(freeAgentsCsv, true)];
  const ids = idMap(parseIds(idsCsv)), pids = new Set<string>(), keys = new Set<string>();
  return keyed.map((p) => {
    if (keys.has(p.id)) throw new Error('duplicate player ' + p.id);
    keys.add(p.id);
    const pid = ids.get(p.id);
    if (!pid) throw new Error('no stable id for ' + p.id + ' (run tools/player-ids.ts sync)');
    if (pids.has(pid)) throw new Error('duplicate pid ' + pid);
    pids.add(pid);
    return { ...p, id: pid };
  });
}
