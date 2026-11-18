// Season statistics and awards (engine step 9c), summed from the same box scores the recaps are built from. Plain JSON state.
// MVP: the offensive player with the most production, weighted a little by his team's wins. Offensive Player of the Year: the best
// of the other offensive players. Defensive Player of the Year: the most defensive production. Coach of the Year is results-driven:
// wins above what the team was projected to win. The production formulas are `offensePts` / `defensePts` in recap.ts (INFERRED
// weights; the same ones that grade a single game). Offensive linemen carry no stat line yet, so no honours for them here.
import { STAT_KEYS, blankStats } from './boxscore.ts';
import type { BoxScore, Stats, StatKey } from './boxscore.ts';
import type { SlotId } from './slots.ts';
import { defensePts, isDefense, isOffense, offensePts } from './recap.ts';

export interface SeasonLine { id: string; name: string; team: string; slot: SlotId; label: string; games: number; stats: Stats }
export interface SeasonStats { players: Record<string, SeasonLine> }
export const newSeasonStats = (): SeasonStats => ({ players: {} });

export function addBox(ss: SeasonStats, box: BoxScore): void {
  for (const l of box.lines) {
    const p = (ss.players[l.id] ??= { id: l.id, name: l.name, team: l.team, slot: l.slot, label: l.label, games: 0, stats: blankStats() });
    p.games++; p.slot = l.slot; p.label = l.label; p.team = l.team;
    for (const k of STAT_KEYS) p.stats[k] += l.stats[k];
  }
}

export const LEADER_KEYS: readonly StatKey[] = ['pyd', 'ptd', 'ryd', 'rtd', 'recYd', 'rec', 'recTd', 'sack', 'intDef', 'tkl', 'ff', 'fgm', 'defTd'];
export function leaders(ss: SeasonStats, key: StatKey, n = 5): SeasonLine[] {
  return Object.values(ss.players).filter((p) => p.stats[key] > 0).sort((a, b) => b.stats[key] - a.stats[key] || (a.id < b.id ? -1 : 1)).slice(0, n);
}

export interface Awards {
  mvp: SeasonLine | null; opoy: SeasonLine | null; dpoy: SeasonLine | null;
  coach: { team: string; wins: number; expected: number; over: number } | null;
  leaders: Partial<Record<StatKey, SeasonLine[]>>;
}
export interface Rec { w: number; l: number; t: number }
const winsOf = (r: Rec | undefined): number => (r ? r.w + r.t / 2 : 8.5);

export function seasonAwards(ss: SeasonStats, table: Readonly<Record<string, Rec>>, expectedWins?: Readonly<Record<string, number>>): Awards {
  const all = Object.values(ss.players).sort((a, b) => (a.id < b.id ? -1 : 1));
  const best = (xs: SeasonLine[], f: (l: SeasonLine) => number): SeasonLine | null => xs.reduce<SeasonLine | null>((m, x) => (m === null || f(x) > f(m) ? x : m), null);
  const off = all.filter(isOffense), def = all.filter(isDefense);
  const mvp = best(off, (l) => offensePts(l) * (1 + 0.04 * (winsOf(table[l.team]) - 9)));
  const opoy = best(off.filter((l) => l !== mvp), (l) => offensePts(l));
  const dpoy = best(def, (l) => defensePts(l));
  let coach: Awards['coach'] = null;
  for (const team of Object.keys(table).sort()) {
    const wins = winsOf(table[team]), expected = expectedWins?.[team] ?? 8.5, over = wins - expected;
    if (!coach || over > coach.over || (over === coach.over && wins > coach.wins)) coach = { team, wins, expected, over };
  }
  const lead: Awards['leaders'] = {};
  for (const k of LEADER_KEYS) lead[k] = leaders(ss, k, 5);
  return { mvp, opoy, dpoy, coach, leaders: lead };
}
