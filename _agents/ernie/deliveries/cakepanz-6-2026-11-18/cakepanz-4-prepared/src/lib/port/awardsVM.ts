// port/awardsVM.ts — the awards view-models. The winners ARE the engine's seasonAwards output
// (awards.ts: mvp/opoy/dpoy from the season's own box-score lines, coach from the table vs expected);
// the shell only shapes the review grammar: winner, line, the one-line team {wins} tie-break phrasing.
// Integers everywhere except Wins (the engine's own display law). The 90+ shimmer (the w89 law) rides
// the recap GRADE when a grade is present — the shell renders it, never computes it.
import { seasonAwards, leaders, LEADER_KEYS, TEAMS, showDecimal } from './seam.ts';
import type { SeasonStats, SeasonLine, Record3 } from './seam.ts';
import { abbrOf } from './abbr.ts';

export interface AwardRowVM {
  key: string;                // MVP / OPOY / DPOY / COACH
  name: string;               // the display name
  winner: string;             // the player (or team, for COACH)
  line: string;               // the engine's own stat line (recap.statLine) or the over-expected phrasing
  team: string; teamAbbr: string;
  teamWins: string;           // the one-line team {wins} phrasing (integer wins, e.g. "13-4")
  shimmer: boolean;           // the w89 law: 90+ shimmer where the grade applies (players only)
}
export interface LeaderRowVM { name: string; team: string; abbr: string; value: string }
export interface AwardsVM {
  regular: AwardRowVM[];
  leaders: { key: string; label: string; rows: LeaderRowVM[] }[];
}

const LABELS: Record<string, string> = { MVP: 'MOST VALUABLE PLAYER', OPOY: 'OFFENSIVE PLAYER OF THE YEAR', DPOY: 'DEFENSIVE PLAYER OF THE YEAR', COACH: 'COACH OF THE YEAR' };
const LEADER_LABELS: Record<string, string> = {
  pyd: 'PASSING YARDS', ptd: 'PASSING TD', ryd: 'RUSHING YARDS', rtd: 'RUSHING TD',
  recYd: 'RECEIVING YARDS', rec: 'RECEPTIONS', recTd: 'RECEIVING TD',
  sack: 'SACKS', intDef: 'INTERCEPTIONS', tkl: 'TACKLES', ff: 'FORCED FUMBLES', fgm: 'FIELD GOALS', defTd: 'DEFENSIVE TD',
};
const TOP_STAT: Record<string, string> = { pyd: 'pyd', ptd: 'ptd', ryd: 'ryd', rtd: 'rtd', recYd: 'recYd', rec: 'rec', recTd: 'recTd', sack: 'sack', intDef: 'intDef', tkl: 'tkl', ff: 'ff', fgm: 'fgm', defTd: 'defTd' };

const teamWinsOf = (table: Readonly<Record<string, Record3>>, team: string): string => {
  const r = table[team];
  return r ? `${r.w}-${r.l}${r.t ? '-' + r.t : ''}` : '';
};

export function awardsVM(ss: SeasonStats, table: Readonly<Record<string, Record3>>): AwardsVM {
  const a = seasonAwards(ss, table);
  const playerRow = (key: string, l: SeasonLine | null): AwardRowVM | null => l && ({
    key, name: LABELS[key] ?? key,
    winner: l.name,
    line: `${l.label} · ${Object.entries(l.stats).filter(([, v]) => v > 0).slice(0, 3).map(([k, v]) => `${k} ${v}`).join(', ')}`,
    team: l.team, teamAbbr: abbrOf(l.team),
    teamWins: teamWinsOf(table, l.team),
    shimmer: false,
  }) || null;
  const regular: AwardRowVM[] = [];
  for (const [key, l] of [['MVP', a.mvp], ['OPOY', a.opoy], ['DPOY', a.dpoy]] as const) {
    const row = playerRow(key, l);
    if (row) regular.push(row);
  }
  if (a.coach) {
    regular.push({
      key: 'COACH', name: LABELS.COACH,
      winner: a.coach.team,
      line: `${showDecimal('wins', a.coach.over)} over expected`,   // Wins: one decimal (the engine's own kind)
      team: a.coach.team, teamAbbr: abbrOf(a.coach.team),
      teamWins: teamWinsOf(table, a.coach.team),
      shimmer: false,
    });
  }
  const leaderRows = LEADER_KEYS.filter((k) => LEADER_LABELS[k]).map((k) => ({
    key: k as string,
    label: LEADER_LABELS[k],
    rows: leaders(ss, k, 5).map((l: SeasonLine) => ({
      name: l.name, team: l.team, abbr: abbrOf(l.team),
      value: String(l.stats[(TOP_STAT[k] ?? k) as keyof SeasonLine['stats']] ?? 0),   // integers: raw stat counts
    })),
  }));
  return { regular, leaders: leaderRows };
}
