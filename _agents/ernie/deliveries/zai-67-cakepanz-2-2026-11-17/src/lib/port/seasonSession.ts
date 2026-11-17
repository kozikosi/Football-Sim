// port/seasonSession.ts — the season save/load session: the bridge between the facade's RunState and
// the engine's OWN payload shapes (WeekPayload / SeasonPayload). Nothing here invents a field: the
// ratings freeze is the engine's own spread ({ ...t.ratings } — weekmap.ts's shape), the week payload
// is weekmap.toWeekPayload, the finished-season payload follows app/saves.ts SeasonPayload (table +
// userResults + champion + userOutcome — the engine's userOutcome classifier writes the outcome).
// Corrupt-never-repair holds on the read path via savesApp/hydrate.
import { toWeekPayload, fromWeekPayload, userOutcome, TEAMS } from './seam.ts';
import type { RunState, LeagueTeam, Ratings, WeekPayload, SeasonPayload, FrozenPlayer, GameScore, UserOutcome } from './seam.ts';
import { LAST_REGULAR_WEEK } from './weekVM.ts';

/** The week payload the engine itself would save (toWeekPayload is the ONE writer). */
export function weekmapFromSession(s: RunState, teams: LeagueTeam[], userTeamName: string, roster: FrozenPlayer[]): WeekPayload {
  return toWeekPayload(s, teams, {
    userTeam: userTeamName,
    roster,
    plan: null,                 // the engine's per-week plan state is not ported yet (teams play their identity)
    statsRecorded: false,
  });
}

/** Rehydrate the facade from a loaded WeekPayload (the engine's fromWeekPayload is the ONE reader). */
export interface SessionResume { state: RunState; teams: LeagueTeam[]; userTeamName: string; roster: FrozenPlayer[] }
export function sessionFromWeekPayload(p: WeekPayload): { ok: true; value: SessionResume } | { ok: false; message: string } {
  const teams = TEAMS.map((t) => {
    const r = p.ratings[t.name] as Ratings | undefined;
    return { name: t.name, ratings: { ...(r as Ratings) } };
  });
  const r = fromWeekPayload(p);
  if (!r.ok) return { ok: false, message: r.message };
  return { ok: true, value: { state: r.value.state, teams, userTeamName: r.value.context.userTeam, roster: r.value.context.roster } };
}

/** The finished-season payload: the engine's own pruned SeasonPayload shape (nothing invented). */
export function seasonPayloadFromSession(s: RunState, userTeamName: string, roster: FrozenPlayer[]): SeasonPayload {
  const t = s.table ?? {};
  const table = TEAMS.map((x) => {
    const r = t[x.name] ?? { w: 0, l: 0, t: 0, pf: 0, pa: 0 };
    return { team: x.name, w: r.w, l: r.l, t: r.t, pf: r.pf, pa: r.pa };
  });
  const userResults: GameScore[] = [...s.scores, ...s.playoffs]
    .filter((g) => g.home === userTeamName || g.away === userTeamName)
    .map((g) => ({ week: g.week, home: g.home, away: g.away, hs: g.hs, as: g.as, ...(g.round ? { round: g.round } : {}), htd: g.htd, atd: g.atd }));
  const outcome: UserOutcome = s.champion ? (userOutcome(s, userTeamName) ?? 'missed-playoffs') : 'missed-playoffs';
  return {
    seed: s.seed, year: s.year, run: s.run,
    userTeam: userTeamName,
    roster,
    table,
    userResults,
    champion: s.champion ?? '',
    userOutcome: outcome,
    statsRecorded: false,
  };
}

export const isSeasonFinished = (s: RunState): boolean => s.nextWeek > LAST_REGULAR_WEEK + 4;

