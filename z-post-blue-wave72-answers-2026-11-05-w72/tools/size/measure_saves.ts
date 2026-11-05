//   [paths relative to colors/ — run: cd colors && node --experimental-strip-types ../tools/size/<script>.ts]
// Measure real Colors save-payload sizes through the real engine (Z.ai executor seat, 2026-11-05).
//   [paths relative to colors/ — run: cd colors && node --experimental-strip-types ../tools/size/<script>.ts]
// Builds DraftPayload / WeekPayload / SeasonPayload exactly as sports/nfl/app/saves.ts defines them,
//   [paths relative to colors/ — run: cd colors && node --experimental-strip-types ../tools/size/<script>.ts]
// using the same fixture pipeline the golden tests and the Outcome Lab use. No guessing.
import fs from 'node:fs';
import { gzipSync } from 'node:zlib';
import { buildPool } from '../../../colors/src/sports/nfl/engine/players.ts';
import { makeRng } from '../../../colors/src/core/rng.ts';
import { DEFAULT_CONFIG, newDraft, runDraft, cpuChoose, applyPick } from '../../../colors/src/sports/nfl/engine/draft.ts';
import { lineupFor } from '../../../colors/src/sports/nfl/engine/lineup.ts';
import { leagueBaseline, spotsOf, teamRatings } from '../../../colors/src/sports/nfl/engine/ratings.ts';
import { returnerRating } from '../../../colors/src/sports/nfl/engine/returner.ts';
import { netPts } from '../../../colors/src/sports/nfl/engine/value.ts';
import { TEAMS } from '../../../colors/src/sports/nfl/engine/league.ts';
import { simulateSeason, initialRanks } from '../../../colors/src/sports/nfl/engine/season.ts';
import type { LeagueTeam } from '../../../colors/src/sports/nfl/engine/season.ts';
import { SLOT_IDS } from '../../../colors/src/sports/nfl/engine/slots.ts';
import type { SlotId } from '../../../colors/src/sports/nfl/engine/slots.ts';

const D = new URL('../../../data/nfl/', import.meta.url).pathname;
const pool = buildPool(fs.readFileSync(`${D}/madden27-ratings.csv`, 'utf8'), fs.readFileSync(`${D}/free-agents-old-ratings.csv`, 'utf8'), fs.readFileSync(`${D}/player-ids.csv`, 'utf8'));
console.log('pool players:', pool.length);

const bytes = (x: unknown) => Buffer.byteLength(JSON.stringify(x), 'utf8');
const kib = (n: number) => (n / 1024).toFixed(1) + ' KiB';
const gz = (x: unknown) => gzipSync(Buffer.from(JSON.stringify(x as string))).length;

// ---- 1. Draft: seeded draft, user picks via cpuChoose (same machinery as the shell's auto-draft), freeze per saves.ts
const rng = makeRng(2026);
const st = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG);
const USER = 7; // one team
while (st.pos < st.order.length) {
  const t = st.order[st.pos];
  const c = cpuChoose(st, t, rng.fork(t === USER ? 'user' + st.pos : 'p' + st.pos));
  applyPick(st, t, c.player, c.slot as SlotId);
}
const draftable = pool.filter((p) => p.role !== 'LS');
const poolRows = draftable.map((p) => [p.id, p.name, p.pos, p.team, p.ovr, p.spd, p.str, p.freeAgent ? 1 : 0]);
const draftPayload = { seed: 2026, userTeam: USER, picks: st.log.map((k) => ({ overall: k.overall, team: k.team, pid: k.player.id, slot: k.slot })), pool: poolRows };
console.log('\n[DRAFT] picks:', draftPayload.picks.length, '| pool rows:', poolRows.length);
console.log('  payload bytes:', bytes(draftPayload), '(' + kib(bytes(draftPayload)) + ') | gzip:', gz(draftPayload));
console.log('  pool alone:', kib(bytes(poolRows)), '| picks alone:', kib(bytes(draftPayload.picks)));
console.log('  full envelope string:', kib(bytes({ sport: 'nfl', kind: 'draft', schemaVersion: 1, engineVersion: 'colors-w0', dataVersion: 'h1', slot: 'A', savedAt: '2026-11-05T12:00:00.000Z', payload: draftPayload })));

// ---- 2. Season: full simulateSeason, then assemble WeekPayload (mid-season preview) + SeasonPayload
const { teams } = (() => {
  const r2 = makeRng(2026); const st2 = newDraft(pool, r2.fork('draft'), DEFAULT_CONFIG); runDraft(st2, r2.fork('run'));
  const raw = st2.rosters.map((r) => Object.values(r) as typeof pool).map((pl) => (['4-3', '3-4'] as const).map((b) => { const l = lineupFor(pl, b); return { l, R: teamRatings(spotsOf(l), returnerRating(l)) }; }));
  const lg0 = leagueBaseline(raw.map((b) => b[0].R));
  const tm = raw.map((b, i) => { const best = netPts(b[0].R, lg0) >= netPts(b[1].R, lg0) ? b[0] : b[1]; return { name: TEAMS[i].name, lineup: best.l, ratings: best.R, roster: Object.values(st2.rosters[i]) as typeof pool }; });
  return { teams: tm };
})();
const leagueTeams: LeagueTeam[] = teams.map((t) => ({ name: t.name, ratings: t.ratings }));
const season = simulateSeason(leagueTeams, makeRng(4242), { year: 2026, prevRank: initialRanks(leagueTeams), homeField: 1.7 });

const user = teams[USER];
const frozen = (p: (typeof pool)[number]) => ({ id: p.id, name: p.name, pos: p.pos, role: p.role, team: p.team, ovr: p.ovr, spd: p.spd, str: p.str, freeAgent: p.freeAgent });
const ratings32 = Object.fromEntries(teams.map((t) => [t.name, t.ratings]));
const scheduleAll = season.schedule.map((g) => ({ week: g.week, home: g.home, away: g.away, kind: g.kind }));
const gameScore = (g: { week: number; round?: string; home: string; away: string; result: { homeScore: number; awayScore: number } }) => ({ week: g.week, home: g.home, away: g.away, hs: g.result.homeScore, as: g.result.awayScore, ...(g.round ? { round: g.round } : {}) });

// Week payload at the week-9 preview: all regular scores through week 8 in play order + no playoffs yet
const thru8 = season.games.filter((g) => g.week <= 8);
const weekPayload = {
  seed: 4242, year: 2026, run: 0, gameSeed: 909090, nextWeek: 9, userTeam: user.name,
  roster: user.roster.map(frozen), ratings: ratings32, schedule: scheduleAll,
  scores: thru8.map(gameScore), plan: null, statsRecorded: false,
  prevRank: initialRanks(leagueTeams), homeField: 1.7,
};
console.log('\n[WEEK @9] schedule games:', scheduleAll.length, '| scores so far:', weekPayload.scores.length, '| roster:', weekPayload.roster.length);
console.log('  payload bytes:', bytes(weekPayload), '(' + kib(bytes(weekPayload)) + ') | gzip:', gz(weekPayload));
console.log('  ratings32 alone:', kib(bytes(ratings32)), '| schedule alone:', kib(bytes(scheduleAll)), '| roster alone:', kib(bytes(weekPayload.roster)), '| scores alone:', kib(bytes(weekPayload.scores)));

// ---- 3. Season payload (completed, pruned)
const userResults = [...season.games, ...season.playoffs].filter((g) => g.home === user.name || g.away === user.name).map(gameScore);
const table32 = Object.entries(season.table).map(([team, r]) => ({ team, w: r.w, l: r.l, t: r.t, pf: r.pf, pa: r.pa }));
const seasonPayload = { seed: 4242, year: 2026, run: 0, userTeam: user.name, roster: user.roster.map(frozen), table: table32, userResults, champion: season.champion, userOutcome: 'champion' as const, statsRecorded: true };
console.log('\n[SEASON] user games:', userResults.length, '| table rows:', table32.length);
console.log('  payload bytes:', bytes(seasonPayload), '(' + kib(bytes(seasonPayload)) + ') | gzip:', gz(seasonPayload));
console.log('  table alone:', kib(bytes(table32)), '| userResults alone:', kib(bytes(userResults)), '| roster alone:', kib(bytes(seasonPayload.roster)));

// ---- 4. Whole-origin totals: 3 slots (draft+week+season) + stats + settings + profile + theme/tab, both raw and gzip
const stats = { seasons: 4, best: { 'Carolina Panthers': '12-5' }, byTeam: { 'Carolina Panthers': { best: '12-5', bowl: 1 } } };
const misc = bytes(stats) + bytes({ haptics: true }) + bytes({ v: 2, createdAt: '2026-11-05T12:00:00.000Z', sports: { nfl: { lastTeam: user.name } } }) + bytes('preseason|d') + bytes('dark');
const perSlot = bytes(draftPayload) + bytes(weekPayload) + bytes(seasonPayload);
const totalRaw = perSlot + misc;
console.log('\n[TOTALS] one of each slot kind:', kib(perSlot), '| + stats/profile/settings/tab:', kib(misc));
console.log('  whole origin (3 full slots, uncompressed):', kib(totalRaw), 'of ~5,120 KiB localStorage budget =', ((totalRaw / (5 * 1024 * 1024)) * 100).toFixed(1) + '%');
const totalGz = gz(draftPayload) + gz(weekPayload) + gz(seasonPayload) + 400;
console.log('  same origin, gzip-compressed values (base64 +33%):', kib(Math.round((totalGz * 4) / 3)), '=', (((totalGz * 4) / 3 / (5 * 1024 * 1024)) * 100).toFixed(1) + '% of budget');

// ---- 5. Growth stress: 10 run-it-backs x 3 slots of season saves (the long-tail question)
const tenSeasons = 10 * bytes(seasonPayload);
console.log('\n[STRESS] 10 completed-season saves x3 slots (uncompressed):', kib(3 * tenSeasons), '=', ((3 * tenSeasons / (5 * 1024 * 1024)) * 100).toFixed(1) + '% of budget');
console.log('\n[DRIVE-FEED] full GameResult (drives+events+stats+agg+ot) for one game:', kib(bytes(season.games[0].result)), '| drives:', season.games[0].result.drives.length, '| events:', season.games[0].result.events.length);
console.log('  ALL 272 regular games\' GameResults (NOT saved today, for scale):', kib(season.games.reduce((a, g) => a + bytes(g.result), 0)));
