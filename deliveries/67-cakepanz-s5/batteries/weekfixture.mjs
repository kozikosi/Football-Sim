/* weekfixture.mjs — builds a REAL week envelope for the hydration law, entirely with the engine snapshot:
 * fixture league (the engine tests' own path) -> startSeason -> playWeek x2 -> toWeekPayload -> serialize.
 * Nothing is hand-faked: the payload the battery injects is the payload the engine itself would save. */
import { buildPool } from '../src/engine/sports/nfl/engine/players.ts';
import { DEFAULT_CONFIG, newDraft, runDraft } from '../src/engine/sports/nfl/engine/draft.ts';
import { lineupFor } from '../src/engine/sports/nfl/engine/lineup.ts';
import { leagueBaseline, spotsOf, teamRatings } from '../src/engine/sports/nfl/engine/ratings.ts';
import { returnerRating } from '../src/engine/sports/nfl/engine/returner.ts';
import { netPts } from '../src/engine/sports/nfl/engine/value.ts';
import { TEAMS } from '../src/engine/sports/nfl/engine/league.ts';
import { startSeason, playWeek } from '../src/engine/sports/nfl/engine/seasonrun.ts';
import { toWeekPayload } from '../src/engine/sports/nfl/app/weekmap.ts';
import { serialize } from '../src/engine/sports/nfl/app/saves.ts';
import fs from 'node:fs';

let cache = null;
export async function leagueTeams() {
  if (cache) return cache;
  const ratingsCsv = fs.readFileSync(new URL('../data/nfl/madden27-ratings.csv', import.meta.url), 'utf8');
  const faCsv = fs.readFileSync(new URL('../data/nfl/free-agents-old-ratings.csv', import.meta.url), 'utf8');
  const idsCsv = fs.readFileSync(new URL('../data/nfl/player-ids.csv', import.meta.url), 'utf8');
  const pool = buildPool(ratingsCsv, faCsv, idsCsv);
  const { makeRng } = await import('../src/engine/core/rng.ts');
  const st = newDraft(pool, makeRng(777).fork('draft'), DEFAULT_CONFIG);
  runDraft(st, makeRng(777).fork('run'));
  const rosters = st.rosters.map((r) => Object.values(r));
  const rated = rosters.map((pl) => ['4-3', '3-4'].map((b) => {
    const l = lineupFor(pl, b);
    return { l, R: teamRatings(spotsOf(l), returnerRating(l)) };
  }));
  const lg0 = leagueBaseline(rated.map((b) => b[0].R));
  const teams = rated.map((b, i) => {
    const best = netPts(b[0].R, lg0) >= netPts(b[1].R, lg0) ? b[0] : b[1];
    return { name: TEAMS[i].name, ratings: best.R, roster: rosters[i] };
  });
  cache = teams;
  return teams;
}

/** Returns the envelope TEXT for slot C (a real week save, engine-built, nextWeek = 3). */
export async function buildWeekEnvelope() {
  const teams = await leagueTeams();
  const leagueTeamsOnly = teams.map((t) => ({ name: t.name, ratings: t.ratings }));
  const seed = 4242;
  let s = startSeason(leagueTeamsOnly, { seed, year: 2027 });
  s = playWeek(leagueTeamsOnly, s).state;
  s = playWeek(leagueTeamsOnly, s).state;          // nextWeek = 3, weeks 1-2 scored (htd/atd included)
  const userTeam = TEAMS[0].name;                  // Buffalo Bills drafts first in the fixture's team order
  const roster = teams[0].roster;
  const payload = toWeekPayload(s, leagueTeamsOnly, { userTeam, roster, plan: null, statsRecorded: false });
  return serialize('week', 'C', {
    engineVersion: 'battery-weekfixture',
    dataVersion: 'sha256:battery',
    saveId: 'battery-week-1',
    saveRevision: 1,
    createdAt: '2026-11-10T00:00:00.000Z',
  }, payload, new Date('2026-11-10T00:00:00.000Z'));
}
