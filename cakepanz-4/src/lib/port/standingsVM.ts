// port/standingsVM.ts — the playoff picture: the bracket states from the ENGINE'S OWN seeding and
// playoff rows (RunState.seeding + RunState.playoffs). Nothing is invented: the seeding is the
// engine's seedPlayoffs output (division winners 1–4, wild cards 5–7), the matchups are the state's
// own playoff rows, the champion the state's champion. Wild Card → Divisional → Conference → Super
// Bowl states, plus the champion banner state on completion.
import { abbrOf } from './abbr.ts';
import type { RunState, Seeding, Round, Score } from './seam.ts';

export interface BracketPairVM {
  home: string; away: string; homeAbbr: string; awayAbbr: string;
  hs: number | null; as: number | null;
  winner: string | null;
  gameSeed: number;
}
export interface BracketRoundVM {
  round: Round;
  label: string;
  state: 'pending' | 'ready' | 'played';       // pending: pre-seeding; ready: pairs known, not played; played: scores in
  pairs: BracketPairVM[];
}
export interface BracketVM {
  seeded: boolean;
  seeds: Record<'AFC' | 'NFC', { seed: number; team: string; abbr: string; me: boolean }[]>;
  rounds: BracketRoundVM[];
  champion: string | null;
  championAbbr: string | null;
}

const ROUND_LABEL: Record<Round, string> = { 'Wild Card': 'WILD CARD', Divisional: 'DIVISIONAL', Conference: 'CONFERENCE', 'Super Bowl': 'SUPER BOWL' };
const ROUNDS: readonly Round[] = ['Wild Card', 'Divisional', 'Conference', 'Super Bowl'];

const pairsOfRound = (s: RunState, round: Round, seeds: Seeding | null): [string, string][] => {
  if (round === 'Wild Card') {
    if (!seeds) return [];
    const out: [string, string][] = [];
    for (const conf of ['AFC', 'NFC'] as const) {
      const sd = seeds.seeds[conf];
      for (const [h, l] of [[2, 7], [3, 6], [4, 5]] as [number, number][]) out.push([sd[h - 1], sd[l - 1]]);
    }
    return out;
  }
  const played = s.playoffs.filter((g) => g.round === round);
  if (played.length === 0) {
    // derive Divisional/Conference/SB pairs from the previous rounds' winners, engine-style
    const won = (r: Round, conf: 'AFC' | 'NFC'): string[] =>
      s.playoffs.filter((p) => p.round === r && (seeds?.seeds[conf].includes(p.home) ?? false)).map((p) => (p.hs > p.as ? p.home : p.away));
    if (round === 'Divisional' && seeds) {
      const out: [string, string][] = [];
      for (const conf of ['AFC', 'NFC'] as const) {
        const sd = seeds.seeds[conf], seedOf = (t: string) => sd.indexOf(t) + 1;
        const alive = [sd[0], ...won('Wild Card', conf)].sort((a, b) => seedOf(a) - seedOf(b));
        if (alive.length === 4) { out.push([alive[0], alive[3]], [alive[1], alive[2]]); }
      }
      return out;
    }
    if (round === 'Conference' && seeds) {
      const out: [string, string][] = [];
      for (const conf of ['AFC', 'NFC'] as const) {
        const sd = seeds.seeds[conf], seedOf = (t: string) => sd.indexOf(t) + 1;
        const dv = won('Divisional', conf).sort((a, b) => seedOf(a) - seedOf(b));
        if (dv.length === 2) out.push([dv[0], dv[1]]);
      }
      return out;
    }
    if (round === 'Super Bowl') {
      const champs = (['AFC', 'NFC'] as const).map((conf) => won('Conference', conf)[0]).filter(Boolean) as string[];
      if (champs.length === 2) return [[champs[0], champs[1]]];
    }
    return [];
  }
  return played.map((g) => [g.home, g.away]);
};

export function bracketVM(s: RunState, userTeamName: string): BracketVM {
  const seeds = s.seeding;
  const seedRows = (conf: 'AFC' | 'NFC') =>
    (seeds?.seeds[conf] ?? []).map((team, i) => ({ seed: i + 1, team, abbr: abbrOf(team), me: team === userTeamName }));
  const rounds: BracketRoundVM[] = ROUNDS.map((round) => {
    const pairs = pairsOfRound(s, round, seeds ?? null);
    const playedRows: Score[] = s.playoffs.filter((g) => g.round === round);
    const state: BracketRoundVM['state'] = pairs.length === 0 ? 'pending' : playedRows.length === pairs.length ? 'played' : 'ready';
    return {
      round, label: ROUND_LABEL[round], state,
      pairs: pairs.map(([home, away]) => {
        const p = playedRows.find((g) => g.home === home && g.away === away);
        return {
          home, away, homeAbbr: abbrOf(home), awayAbbr: abbrOf(away),
          hs: p ? p.hs : null, as: p ? p.as : null,
          winner: p ? (p.hs > p.as ? home : p.as > p.hs ? away : null) : null,
          gameSeed: 0,   // filled by the caller with the engine's gameSeed when the pair is real
        };
      }),
    };
  });
  return {
    seeded: !!seeds,
    seeds: { AFC: seedRows('AFC'), NFC: seedRows('NFC') },
    rounds,
    champion: s.champion,
    championAbbr: s.champion ? abbrOf(s.champion) : null,
  };
}
