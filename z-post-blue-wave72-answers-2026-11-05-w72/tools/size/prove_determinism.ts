// Prove order-independence of game seeds + emit one concrete Drive/ScoreEvent sample (Z.ai, 2026-11-05).
import fs from 'node:fs';
import { buildPool } from '../../../colors/src/sports/nfl/engine/players.ts';
import { makeRng, forkSeed } from '../../../colors/src/core/rng.ts';
import { DEFAULT_CONFIG, newDraft, runDraft } from '../../../colors/src/sports/nfl/engine/draft.ts';
import { lineupFor } from '../../../colors/src/sports/nfl/engine/lineup.ts';
import { leagueBaseline, spotsOf, teamRatings } from '../../../colors/src/sports/nfl/engine/ratings.ts';
import { returnerRating } from '../../../colors/src/sports/nfl/engine/returner.ts';
import { netPts } from '../../../colors/src/sports/nfl/engine/value.ts';
import { TEAMS } from '../../../colors/src/sports/nfl/engine/league.ts';
import { matchupModel } from '../../../colors/src/sports/nfl/engine/matchup.ts';
import { teamIdentity } from '../../../colors/src/sports/nfl/engine/plans.ts';
import { simulateGame } from '../../../colors/src/sports/nfl/engine/drives.ts';

const D = new URL('../../../data/nfl/', import.meta.url).pathname;
const pool = buildPool(fs.readFileSync(`${D}/madden27-ratings.csv`, 'utf8'), fs.readFileSync(`${D}/free-agents-old-ratings.csv`, 'utf8'), fs.readFileSync(`${D}/player-ids.csv`, 'utf8'));
const r2 = makeRng(2026); const st2 = newDraft(pool, r2.fork('draft'), DEFAULT_CONFIG); runDraft(st2, r2.fork('run'));
const raw = st2.rosters.map((r) => Object.values(r) as typeof pool).map((pl) => (['4-3', '3-4'] as const).map((b) => { const l = lineupFor(pl, b); return { l, R: teamRatings(spotsOf(l), returnerRating(l)) }; }));
const lg0 = leagueBaseline(raw.map((b) => b[0].R));
const teams = raw.map((b, i) => { const best = netPts(b[0].R, lg0) >= netPts(b[1].R, lg0) ? b[0] : b[1]; return { name: TEAMS[i].name, lineup: best.l, ratings: best.R }; });
const lg = leagueBaseline(teams.map((t) => t.ratings));

const SEED = 4242;
const games = [ // five (home, away) pairings with engine-style labels
  { home: teams[0].name, away: teams[3].name, label: 'w3:' + teams[0].name },
  { home: teams[1].name, away: teams[5].name, label: 'w3:' + teams[1].name },
  { home: teams[2].name, away: teams[7].name, label: 'w3:' + teams[2].name },
  { home: teams[4].name, away: teams[6].name, label: 'w9:' + teams[4].name },
  { home: teams[8].name, away: teams[9].name, label: 'w9:' + teams[8].name },
];
const playOne = (g: (typeof games)[number]) => {
  const H = teams.find((t) => t.name === g.home)!, A = teams.find((t) => t.name === g.away)!;
  const ih = teamIdentity(H.ratings, lg), ia = teamIdentity(A.ratings, lg);
  const mh = matchupModel(H.ratings, A.ratings, lg, { off: ih.off, def: ia.def }), ma = matchupModel(A.ratings, H.ratings, lg, { off: ia.off, def: ih.def });
  return simulateGame(mh, ma, makeRng(forkSeed(SEED, g.label)), {});
};
const run = (order: number[]) => order.map((i) => { const r = playOne(games[i]); return `${games[i].home}|${games[i].away}|${r.homeScore}|${r.awayScore}|${r.drives.length}|${JSON.stringify(r.drives[0])}|${JSON.stringify(r.stats.home)}`; }).sort().join('\n');
const fwd = run([0, 1, 2, 3, 4]);
const rev = run([4, 3, 2, 1, 0]);
const mixed = run([2, 0, 4, 1, 3]);
console.log('ORDER-INDEPENDENCE (same seed, three simulation orders, per-game sorted):');
console.log('  forward vs reverse :', fwd === rev ? 'IDENTICAL' : 'MISMATCH');
console.log('  forward vs shuffled:', fwd === mixed ? 'IDENTICAL' : 'MISMATCH');
console.log(fwd.split('\n')[0]);

const sample = playOne(games[0]);
const d = sample.drives[0];
console.log('\nCONCRETE DRIVE (game ' + games[0].home + ' vs ' + games[0].away + ', seed ' + forkSeed(SEED, games[0].label) + '):');
console.log(JSON.stringify(d));
console.log('\nFIRST THREE ScoreEvents (chronological by construction):');
console.log(JSON.stringify(sample.events.slice(0, 3), null, 1));
console.log('\nSTATS home:', JSON.stringify(sample.stats.home));
