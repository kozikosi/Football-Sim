/* seasonfixture.mjs — builds a REAL season envelope for the Slice 5 brag laws, entirely with the engine
 * snapshot: the fixture league (the engine tests' own path) -> startSeason -> playWeek to a FINISHED
 * season (weeks 1-18 + the four playoff rounds) -> the SeasonPayload shape the app's season slice will
 * store -> serialize. Nothing is hand-faked: every number the brag card will show (the record row, the
 * champion, the outcome, the seed) is the engine's own, and the node-side replay re-derives them from
 * the same (seed, year, run) to prove the seed card's promise. */
import { TEAMS } from '../src/engine/sports/nfl/engine/league.ts';
import { startSeason, playWeek, table, isFinished } from '../src/engine/sports/nfl/engine/seasonrun.ts';
import { serialize } from '../src/engine/sports/nfl/app/saves.ts';
import { leagueTeams } from './weekfixture.mjs';

/* userOutcome, derived from the engine's own results — the same derivation the app's season slice will
 * make at the season-end write (the hydrate law's consistency pair: champion === userTeam <=> won it). */
export function outcomeOf(champion, userTeam, userResults) {
  if (champion === userTeam) return 'champion';
  const rounds = userResults.map((g) => g.round).filter(Boolean);
  if (rounds.includes('Super Bowl')) return 'super-bowl-loss';
  if (rounds.includes('Conference')) return 'conference';
  if (rounds.includes('Divisional')) return 'divisional';
  if (rounds.includes('Wild Card')) return 'wild-card';
  return 'missed-playoffs';
}

export async function buildSeasonFixture() {
  const teams = await leagueTeams();
  const leagueTeamsOnly = teams.map((t) => ({ name: t.name, ratings: t.ratings }));
  // A brag card should be able to show the flagship case, so the fixture scans seeds deterministically
  // for a championship season (first playoff run found as fallback; the scan window is fixed). Whatever
  // seed lands, the envelope is that season's REAL payload, and the replay law re-derives it from the
  // same (seed, year, run).
  const userTeam = TEAMS[0].name;                  // Buffalo Bills drafts first in the fixture's team order
  const roster = teams[0].roster;
  let s = null, seed = 0, fallback = null, fallbackSeed = 0;
  for (seed = 4242; seed < 4242 + 60; seed++) {
    s = startSeason(leagueTeamsOnly, { seed, year: 2027 });
    while (!isFinished(s)) s = playWeek(leagueTeamsOnly, s).state;
    if (s.champion === userTeam) break;            // first championship seed in the scan — deterministic
    if (!fallback && s.playoffs.some((g) => g.home === userTeam || g.away === userTeam)) { fallback = s; fallbackSeed = seed; }
    s = null;
  }
  if (!s) { s = fallback; seed = fallbackSeed; }   // no championship in the window: the first playoff run
  const year = 2027;
  const tab = table(s);
  const userGames = [...s.scores, ...s.playoffs]
    .filter((g) => g.home === userTeam || g.away === userTeam)
    .map((g) => ({ week: g.week, home: g.home, away: g.away, hs: g.hs, as: g.as, htd: g.htd, atd: g.atd, ...(g.round ? { round: g.round } : {}) }));
  const payload = {
    seed, year, run: s.run,
    userTeam, roster,
    table: Object.entries(tab).map(([team, r]) => ({ team, ...r })),
    userResults: userGames,
    champion: s.champion,
    userOutcome: outcomeOf(s.champion, userTeam, userGames),
    statsRecorded: false,
  };
  const text = serialize('season', 'B', {
    engineVersion: 'battery-seasonfixture',
    dataVersion: 'sha256:battery',
    saveId: 'battery-season-1',
    saveRevision: 1,
    createdAt: '2026-11-10T00:00:00.000Z',
  }, payload, new Date('2026-11-10T00:00:00.000Z'));
  const row = tab[userTeam];
  return {
    text, payload,
    expect: {
      userTeam, seed, year, run: s.run, champion: s.champion, outcome: payload.userOutcome,
      w: row.w, l: row.l, t: row.t, pf: row.pf, pa: row.pa, games: userGames.length,
      saveId: 'battery-season-1', engineVersion: 'battery-seasonfixture',
    },
  };
}

/** The seed card's promise, PROVEN node-side: replay the season from the same (seed, year, run) on the
 *  pinned engine and the champion and the user's record row come out identical. Returns the replayed row. */
export async function replaySeason(payload) {
  const teams = await leagueTeams();
  const leagueTeamsOnly = teams.map((t) => ({ name: t.name, ratings: t.ratings }));
  let s = startSeason(leagueTeamsOnly, { seed: payload.seed, year: payload.year, run: payload.run });
  while (!isFinished(s)) s = playWeek(leagueTeamsOnly, s).state;
  const tab = table(s);
  return { champion: s.champion, row: tab[payload.userTeam], table: tab };
}
