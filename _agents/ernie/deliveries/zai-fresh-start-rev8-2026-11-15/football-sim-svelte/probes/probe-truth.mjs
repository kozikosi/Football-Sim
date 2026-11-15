/* probe-truth.mjs — the E1 probe: re-derives the truth NODE-SIDE from the repo's own engine bytes
 * (gate 1: the probe exists BEFORE the code is measured; asserts against the ENGINE's view-models —
 * boardVM/feedVM/SeasonResult via the shared layer — never against constants alone).
 * Same bytes in both repos; layout auto-detected (src/engine vs src/lib/engine).
 * Run: node --experimental-strip-types probes/probe-truth.mjs
 * Writes: probes/truth.json (the battery's expected values, per slice).
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const lib = new URL('../', import.meta.url).pathname;
const P = (p) => (existsSync(lib + 'src/' + p) ? lib + 'src/' + p : lib + 'src/lib/' + p);
const eng = (p) => import(pathToFileURL(P(p.replace(/^src\//, ''))).href);
const sh = (p) => import(pathToFileURL(P(p.replace(/^src\/(lib\/)?/, ''))).href);

const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const [players, storemod, rng, goneodds, draftBoard, cardVM, feedVMmod, weekVMmod] = await Promise.all([
  eng('src/engine/sports/nfl/engine/players.ts'),
  eng('src/engine/sports/nfl/app/store.ts'),
  eng('src/engine/core/rng.ts'),
  eng('src/engine/sports/nfl/engine/goneodds.ts'),
  eng('src/engine/sports/nfl/view/draftBoard.ts'),
  sh('src/shared/cardVM.ts'),
  sh('src/shared/feedVM.ts'),
  sh('src/shared/weekVM.ts'),
]);

const ratings = readFileSync(P('data/madden27-ratings.csv'), 'utf8');
const fa = readFileSync(P('data/free-agents-old-ratings.csv'), 'utf8');
const ids = readFileSync(P('data/player-ids.csv'), 'utf8');
const fxPath = P('fixture.json');
const fx = JSON.parse(readFileSync(fxPath, 'utf8'));

const pool = players.buildPool(ratings, fa, ids);
const s = storemod.createStore(pool);
s.dispatch({ type: 'START', seed: fx.seed, userTeam: fx.userTeam });
const st = s.getState();
const vm = draftBoard.boardVM(st.draft, fx.userTeam, goneodds.goneOdds(st.draft, fx.userTeam, rng.makeRng(fx.seed * 7 + 13), 30), { sort: 'wins', limit: 60 });
const grid = cardVM.toCardGrid(vm);

const rowPub = (r) => ({ id: r.id, name: r.name, pos: r.pos, nflTeam: r.nflTeam, ovr: r.ovr, wins: r.wins, priority: r.priority, slotLabel: r.slotLabel, alsoFits: r.alsoFits.map((a) => a.slotLabel + (a.flex ? ' (' + a.flex + ')' : '')) });

const feed = feedVMmod.feedVM(st.record, fx.seed, fx.userTeam);

const season = JSON.parse(readFileSync(lib + 'probes/season-seed-2027.json', 'utf8'));
const w1 = weekVMmod.weekView(season, 1);
const slots = weekVMmod.totalWeekSlots(season);
const wLast = weekVMmod.weekView(season, slots);
const thru10 = weekVMmod.standingsThrough(season, 10);

const truth = {
  fixtureSha256: sha(fxPath),
  seasonFixtureSha256: sha(lib + 'probes/season-seed-2027.json'),
  engineNote: 'pin d3bd81d2 · 57 files',
  board: { rowCount: vm.rows.length, header: vm.header, row0: rowPub(vm.rows[0]), row1: rowPub(vm.rows[1]) },
  cards: { count: grid.cards.length, teamName: grid.teamName, overall: grid.overall, totalPicks: grid.totalPicks, onClock: grid.onClock, countText: grid.count, card0: grid.cards[0], card1: grid.cards[1], ids: grid.cards.map((c) => c.id) },
  stats: { rows: vm.rows.map(rowPub) },
  feed: {
    home: feed.home, away: feed.away, homeScore: feed.homeScore, awayScore: feed.awayScore,
    driveCount: feed.drives.length, leadChanges: feed.leadChanges, meDrives: feed.meDrives,
    gameSeedLabel: feed.gameSeedLabel,
    drive0: { teamAbbr: feed.drives[0].teamAbbr, badges: feed.drives[0].badges.map((b) => b.label), scoreAfter: feed.drives[0].scoreAfter, me: feed.drives[0].me },
    driveLast: { teamAbbr: feed.drives[feed.drives.length - 1].teamAbbr, badges: feed.drives[feed.drives.length - 1].badges.map((b) => b.label), scoreAfter: feed.drives[feed.drives.length - 1].scoreAfter },
    lineTexts: feed.drives.map((d) => (d.me ? '[ME] ' : '') + d.teamAbbr + ' · ' + d.badges.map((b) => b.label).join('+')),
  },
  week: {
    slots, w1: { label: w1.label, gameCount: w1.games.length, game0: { homeAbbr: w1.games[0].homeAbbr, awayAbbr: w1.games[0].awayAbbr, hs: w1.games[0].hs, as: w1.games[0].as } },
    wLast: { label: wLast.label, gameCount: wLast.games.length, game0: { homeAbbr: wLast.games[0].homeAbbr, awayAbbr: wLast.games[0].awayAbbr, hs: wLast.games[0].hs, as: wLast.games[0].as } },
    thru10: { top: { abbr: thru10.league[0].abbr, w: thru10.league[0].w, l: thru10.league[0].l, pf: thru10.league[0].pf }, rowCount: thru10.league.length, divCount: thru10.divisions.length, firstDivLeader: thru10.divisions[0].rows[0].abbr },
  },
};
writeFileSync(lib + 'probes/truth.json', JSON.stringify(truth, null, 1));
console.log('TRUTH OK · cards', truth.cards.count, '· board rows', truth.board.rowCount, '· drives', truth.feed.driveCount, '· week slots', slots, '· fixture', truth.fixtureSha256.slice(0, 8));
