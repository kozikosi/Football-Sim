// Season / Standings view models (w74 item 5a, Z.ai DRAFT — awaiting the pattern freeze).
//
// Input: the WeekPayload the envelope carries (saves.ts). TRUSTED fields per the hydration rule are the only
// inputs; everything shown here is DERIVED (never stored, never cached): the standings table and the playoff
// seeding are recomputed by the ENGINE's own code from the trusted scores, exactly as weekmap.ts does on load —
// the screen and the hydration path cannot drift apart because both call the same functions.
//
// G-VM8 (flagged): these VMs take the PAYLOAD, not the whole AppState — the season screens read one payload and
// no ephemeral state except `userTeam`, which the payload itself carries. When the whole-app reducer lands, the
// signature widens to (AppState) and narrows internally.
import { Played, seedPlayoffs } from '../engine/standings.ts';
import { table as leagueTable, type RunState } from '../engine/seasonrun.ts';
import { makeRng } from '../../../core/rng.ts';
import type { WeekPayload, GameScore } from '../app/saves.ts';
import { roundOfWeek } from '../engine/seasonrun.ts';

export interface StandingRowVM { pos: number; team: string; w: string; l: string; t: string; pct: string; pf: string; pa: string; isUser: boolean; inPlayoffs: boolean }
export interface StandingsVM {
  title: string;
  table: StandingRowVM[];          // 1..32, the engine's order
  playoffCut: number;              // the last row inside the 14-team bracket
  userRow: StandingRowVM | null;
  seedingNote: string;             // one line: who leads each conference while the season runs
}
export interface NextGameVM { week: string; round: string | null; home: string; away: string; isHome: boolean; kickoffLabel: string }
export interface SeasonVM {
  userTeam: string;
  record: string;                  // "7-2-0"
  nextGame: NextGameVM | null;     // null after week 22 (season over -> the app converts to a Season payload)
  lastResult: string | null;
  planSummary: string;             // from PlanState: the user's chosen fronts for this week
  runLabel: string;                // "Run 2" when run-it-back > 0
}

const pct = (w: number, l: number, t: number): string => {
  const g = w + l + t;
  return g ? ((w + 0.5 * t) / g).toFixed(3).replace(/^0/, '') : '.000';
};

export function standingsVM(p: WeekPayload): StandingsVM {
  const played: Played[] = p.scores.filter((g) => !g.round).map((g) => ({ home: g.home, away: g.away, hs: g.hs, as: g.as, htd: g.htd ?? 0, atd: g.atd ?? 0 }));
  // G-VM10 (flagged): the engine's table() consumes a RunState but reads only `.scores`; the cast keeps ONE table
  // builder for hydration, screens and tests. If the Architect prefers, table() gains a scores-only signature —
  // an engine one-liner this VM would then call directly.
  const raw = leagueTable({ scores: p.scores.filter((g) => !g.round) } as unknown as RunState);
  const table = Object.entries(raw).map(([team, r]) => ({ team, ...r })).sort((a, b) => (b.w - a.w) || ((b.w + 0.5 * b.t) / Math.max(1, b.w + b.l + b.t)) - ((a.w + 0.5 * a.t) / Math.max(1, a.w + a.l + a.t)) || a.team.localeCompare(b.team));
  const PLAYOFF_CUT = 14;
  const rows: StandingRowVM[] = table.map((r, i) => ({
    pos: i + 1, team: r.team, w: String(r.w), l: String(r.l), t: String(r.t), pct: pct(r.w, r.l, r.t),
    pf: String(r.pf), pa: String(r.pa), isUser: r.team === p.userTeam, inPlayoffs: i < PLAYOFF_CUT,
  }));
  const userRow = rows.find((r) => r.isUser) ?? null;
  const seeding = seedPlayoffs(played, makeRng(p.seed).fork('seeding'));
  const afc1 = seeding.seeds.AFC[0], nfc1 = seeding.seeds.NFC[0];
  return {
    title: `Standings — ${p.year}`,
    table: rows, playoffCut: PLAYOFF_CUT, userRow,
    seedingNote: `AFC 1: ${afc1 ?? '?'} · NFC 1: ${nfc1 ?? '?'}`,
  };
}

export function seasonVM(p: WeekPayload): SeasonVM {
  const wins = p.scores.filter((g) => !g.round && (g.home === p.userTeam || g.away === p.userTeam));
  const w = wins.filter((g) => (g.home === p.userTeam ? g.hs > g.as : g.as > g.hs)).length;
  const l = wins.length - w;
  const round = roundOfWeek(p.nextWeek);
  const next = p.schedule.find((g) => g.week === p.nextWeek && (g.home === p.userTeam || g.away === p.userTeam));
  const last = wins.length ? wins[wins.length - 1] : null;
  const lastWon = last ? (last.home === p.userTeam ? last.hs > last.as : last.as > last.hs) : false;
  return {
    userTeam: p.userTeam,
    record: `${w}-${l}-0`,
    nextGame: next
      ? { week: `Week ${p.nextWeek}`, round, home: next.home, away: next.away, isHome: next.home === p.userTeam,
          kickoffLabel: `${round ?? 'Week ' + p.nextWeek}: ${next.away} @ ${next.home}` }
      : null,
    lastResult: last ? `${lastWon ? 'W' : 'L'} ${Math.max(last.hs, last.as)}-${Math.min(last.hs, last.as)} vs ${last.home === p.userTeam ? last.away : last.home}` : null,
    planSummary: p.plan ? `Plan: ${p.plan.offense ?? 'default'} offense, ${p.plan.defense ?? 'default'} defense${p.plan.note ? ` — ${p.plan.note}` : ''}` : 'No plan set for this week.',
    runLabel: p.run > 0 ? `Run ${p.run + 1}` : 'Season 1',
  };
}

// The user's own results in game order — the Season screen's "your games" strip.
export function userResultsVM(p: WeekPayload, limit = 8): { label: string; result: string }[] {
  const mine = (gs: GameScore[]): GameScore[] => gs.filter((g) => g.home === p.userTeam || g.away === p.userTeam);
  const reg = mine(p.scores.filter((g) => !g.round)).slice(-limit);
  return reg.map((g) => {
    const home = g.home === p.userTeam;
    const won = home ? g.hs > g.as : g.as > g.hs;
    return { label: `W${g.week}${home ? ' vs' : ' @'} ${home ? g.away : g.home}`, result: `${won ? 'W' : 'L'} ${Math.max(g.hs, g.as)}-${Math.min(g.hs, g.as)}` };
  });
}
