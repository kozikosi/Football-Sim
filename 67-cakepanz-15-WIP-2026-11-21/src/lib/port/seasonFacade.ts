// port/seasonFacade.ts — the week stepper's controller: the fresh-start track's FACADE IDIOM in its
// plain-TypeScript equivalent (no runes, no framework imports — mechanically re-usable under any
// runtime). ONE module-level state slot + one facade object with getters + a minimal subscribe for
// the binding layer. The engine's RunState rides plain module state (not reactive — consumers
// re-render on the subscription, identical semantics to the raw-slot pattern).
// Every derived field re-derives from the engine's own state via the shared weekVM — no new engine
// code, no invented fields.
import { startSeason, playWeek, isFinished, gameSeed, TEAMS } from './seam.ts';
import type { RunState, LeagueTeam, Score, GameResult, FrozenPlayer } from './seam.ts';
import { weekView, totalWeekSlots, standingsThrough, LAST_REGULAR_WEEK } from './weekVM.ts';
import type { WeekVM, StandingsVMw } from './weekVM.ts';
import { weekmapFromSession } from './seasonSession.ts';
import type { WeekPayload } from './seam.ts';

let state: RunState | null = null;         // plain module state (engine-owned)
let teams: LeagueTeam[] | null = null;     // the 32 rated teams the state plays with
let userTeamName = '';                     // the user's team (the "me" flag, the CTA, the outcome)
let roster: FrozenPlayer[] = [];           // the user's frozen roster (the week payload needs it)
let slot = 1;                              // reactive primitive (the stepper's position)
const listeners = new Set<() => void>();
const emit = () => { for (const l of listeners) l(); };

export interface SeasonFacadeState {
  ready: boolean;
  slot: number;
  total: number;
  view: WeekVM | null;
  standings: StandingsVMw | null;
  finished: boolean;
  champion: string | null;
  userTeamName: string;
  label: string;
  atLastPlayed: boolean;       // true when slot == the latest played week (the "step" CTA lives here)
  runState: RunState | null;   // the engine's own state (the bracket/review VMs read it)
}

// THE FACADE — getters only; the binding layer wraps it.
export const seasonFacade = {
  get ready(): boolean { return state !== null; },
  get slot(): number { return slot; },
  get total(): number { return state ? totalWeekSlots(state) : LAST_REGULAR_WEEK + 4; },
  get view(): WeekVM | null { return state ? weekView(state, slot) : null; },
  get standings(): StandingsVMw | null { return state ? standingsThrough(state, slot) : null; },
  get finished(): boolean { return state ? isFinished(state) : false; },
  get champion(): string | null { return state?.champion ?? null; },
  get userTeamName(): string { return userTeamName; },
  get label(): string { return this.view?.label ?? ''; },
  get atLastPlayed(): boolean { return state ? slot === state.nextWeek - 1 : false; },
  get runState(): RunState | null { return state; },
  get userRoster(): FrozenPlayer[] { return roster; },

  subscribe(fn: () => void): () => void { listeners.add(fn); return () => listeners.delete(fn); },

  /** Begin (or resume) a season for the 32 rated teams. seed comes from the draft; year 2027 like the feed. */
  begin(lg: LeagueTeam[], seed: number, year: number, userName: string, userRoster: FrozenPlayer[]): void {
    teams = lg;
    userTeamName = userName;
    roster = userRoster;
    state = startSeason(lg, { seed, year });
    slot = 1;
    emit();
  },
  /** Resume a saved RunState (the week payload's hydrated state). */
  resume(s: RunState, lg: LeagueTeam[], userName: string, userRoster: FrozenPlayer[]): void {
    teams = lg; userTeamName = userName; roster = userRoster; state = s; slot = Math.max(1, Math.min(s.nextWeek, totalWeekSlots(s)));
    emit();
  },
  /** Advance one week: the engine plays every game of the CURRENT slot's week. Returns this week's results. */
  step(): { week: number; games: { home: string; away: string; round: string | null; result: GameResult; gs: number }[] } | null {
    if (!state || !teams) return null;
    // step plays state.nextWeek; move the slot there first so the reveal happens on the played week
    slot = state.nextWeek;
    const r = playWeek(teams, state);
    state = r.state;
    const games = r.games.map((g) => ({ home: g.home, away: g.away, round: g.round as string | null, result: g.result, gs: gameSeed(state!.seed, state!.nextWeek - 1, g.home) }));
    emit();
    return { week: state.nextWeek - 1, games };
  },
  go(n: number): void { slot = Math.max(1, Math.min(this.total, n)); emit(); },
  next(): void { this.go(slot + 1); },
  prev(): void { this.go(slot - 1); },

  /** The week payload for a save (engine-built: weekmap.toWeekPayload). */
  weekPayload(): WeekPayload { return weekmapFromSession(state!, teams!, userTeamName, roster); },
  snapshot(): { state: RunState | null; teams: LeagueTeam[] | null; userTeamName: string; slot: number } {
    return { state, teams, userTeamName, slot };
  },
  scores(): Score[] { return state ? [...state.scores, ...state.playoffs] : []; },
  userTeamIndex(): number { return TEAMS.findIndex((t) => t.name === userTeamName); },
};

export type SeasonFacade = typeof seasonFacade;
