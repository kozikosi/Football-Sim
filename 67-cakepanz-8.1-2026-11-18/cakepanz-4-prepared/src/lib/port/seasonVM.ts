// port/seasonVM.ts — the season construction + standings view-models (permitted shared layer, the
// fresh-start arms' seasonVM ported onto the seam). Every value is the engine's own: the draft's pick
// log is a complete league, each team's roster runs through optimalLineup + teamRatings (ratings are
// ENGINE-DERIVED — no user ratings are generated, per the bounds), and simulateSeason produces
// schedule, table, seeding, playoffs and champion. Nothing here invents or approximates engine data.
import { optimalLineup, fieldSlots, teamRatings, TEAMS, simulateSeason, makeRng } from './seam.ts';
import type { Player, SeasonResult, LeagueTeam } from './seam.ts';

export interface SeasonTeamRow {
  team: string; conf: string; div: string;
  w: number; l: number; t: number; pf: number; pa: number;
  seed: number | null;                     // 1–7 within the conference, null = out
  champ: boolean;                          // the Super Bowl winner
}
export interface StandingsVM {
  year: number;
  champion: string; finalistOther: string;
  games: number; playoffGames: number;
  divisions: { conf: string; div: string; rows: SeasonTeamRow[] }[];
}

export interface PickRow { overall: number; team: number; pid: string; slot: string }

const RET_NEUTRAL = 75;                    // a neutral returner grade: no ratings work, an engine constant for a no-returner league

export function leagueTeams(pool: readonly Player[], picks: readonly PickRow[]): LeagueTeam[] {
  const byId = new Map(pool.map((p) => [p.id, p]));
  const slots = fieldSlots('4-3');
  return TEAMS.map((t, i) => {
    const roster = picks.filter((k) => k.team === i).map((k) => byId.get(k.pid)).filter((p): p is Player => !!p);
    const line = optimalLineup(roster, slots);
    return { name: t.name, ratings: teamRatings(line.placements.map((p) => ({ row: p.slot.row, ovr: p.effOvr })), RET_NEUTRAL) };
  });
}

export function runSeason(pool: readonly Player[], picks: readonly PickRow[], seed: number, year: number): SeasonResult {
  return simulateSeason(leagueTeams(pool, picks), makeRng(seed).fork('season'), { year });
}

export function toStandings(s: SeasonResult): StandingsVM {
  const seedOf = (team: string): number | null => {
    const a = s.seeding.seeds.AFC.indexOf(team), n = s.seeding.seeds.NFC.indexOf(team);
    return a >= 0 ? a + 1 : n >= 0 ? n + 1 : null;
  };
  const divRows: Record<string, SeasonTeamRow[]> = {};
  for (const t of TEAMS) {
    const r = s.table[t.name];
    divRows[t.conf + ' ' + t.div] = divRows[t.conf + ' ' + t.div] ?? [];
    divRows[t.conf + ' ' + t.div]!.push({
      team: t.name, conf: t.conf, div: t.div,
      w: r.w, l: r.l, t: r.t, pf: r.pf, pa: r.pa,
      seed: seedOf(t.name), champ: s.champion === t.name,
    });
  }
  const divisions = Object.entries(divRows).map(([key, rows]) => {
    const [conf, div] = key.split(' ');
    return { conf: conf ?? '', div: div ?? '', rows: rows.sort((a, b) => (b.w - a.w) || (a.pa - b.pa)) };
  });
  return {
    year: s.year, champion: s.champion, finalistOther: s.finalists.find((f) => f !== s.champion) ?? '',
    games: s.games.length, playoffGames: s.playoffs.length, divisions,
  };
}
