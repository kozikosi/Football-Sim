// Player ids carry their sport: `nfl-p00001`. DECISION (Architect, 4 Nov 2026, KG's preference; the alternative was one global p00001 counter):
//  - an id is meaningful on its own: a saved pick, a profile name or a stat row can never be read as another sport's player;
//  - each sport numbers its own players from 1 and owns its own crosswalk file (data/<sport>/player-ids.csv), so adding a sport never touches another's ids;
//  - ids are issued once and never reused; the sport prefix is lower-case letters and digits, starting with a letter ("nfl", "nba", "mlb", "nhl", "soc").
// The number after `-p` is an opaque counter, not a rank and not a roster order.
export const SPORT_ID = /^[a-z][a-z0-9]*$/;
const PID = /^([a-z][a-z0-9]*)-p(\d{5,})$/;
export function formatPid(sport: string, n: number): string {
  if (!SPORT_ID.test(sport)) throw new Error('ids: bad sport id ' + sport);
  if (!Number.isInteger(n) || n < 1) throw new Error('ids: bad number ' + n);
  return `${sport}-p${String(n).padStart(5, '0')}`;
}
export function parsePid(id: string): { sport: string; n: number } | null {
  const m = PID.exec(id);
  return m ? { sport: m[1], n: +m[2] } : null;
}
export const sportOfPid = (id: string): string | null => parsePid(id)?.sport ?? null;
