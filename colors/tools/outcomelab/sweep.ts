// Outcome Lab — Monte Carlo season sweep + Model Report (Z.ai seat, w71 tooling wave)
//
// What this is: the N4 harness. It runs the engine headless over many seeded seasons,
// aggregates outcome distributions, and checks them against the simulation invariants
// the Architect stated in inbox/20261104-1910 (Q7). It changes NO engine code — it only
// calls the public engine API the same way the golden tests do.
//
// Run:   node --experimental-strip-types tools/outcomelab/sweep.ts [fixedN] [draftN]
//        (defaults: 200 fixed-league seasons, 40 fresh-draft seasons)
// Out:   tools/outcomelab/sweep-results.json + model-report-<date>.md (+ stdout)
//
// Labels: band values marked [R] are the Architect's stated targets, not re-derived from
// nflverse by this tool. Re-deriving them from _agents/data/nflverse-* is a pending item.

import fs from 'node:fs';
import { makeRng } from '../../src/core/rng.ts';
import { TEAMS } from '../../src/sports/nfl/engine/league.ts';
import { simulateSeason, initialRanks } from '../../src/sports/nfl/engine/season.ts';
import type { LeagueTeam } from '../../src/sports/nfl/engine/season.ts';
import { SLOT_IDS } from '../../src/sports/nfl/engine/slots.ts';
import type { SlotId } from '../../src/sports/nfl/engine/slots.ts';
import { teamRatings, spotsFromRecord } from '../../src/sports/nfl/engine/ratings.ts';
import { pool, fixtureLeague } from '../../test/nfl/fixture.ts';

// ---------- league builders (engine public API only) ----------

// Mode A: one fixed 32-team league (a seeded CPU draft over the real Madden ratings),
// then sweep season seeds. Answers: "given these teams, what world of outcomes ships?"
const fixedLeague = (): LeagueTeam[] => fixtureLeague(777).teams.map((t) => ({ name: t.name, ratings: t.ratings }));

// Mode B: fresh CPU draft per seed, then one season. Answers: "across talent worlds,
// how wide is the outcome spread?" (talent variation included)
const draftLeague = (seed: number): LeagueTeam[] => fixtureLeague(seed).teams.map((t) => ({ name: t.name, ratings: t.ratings }));

// Mode C: the synthetic population from test/nfl/season.test.ts — team strength varies
// like the real one (a few OVR points across the lineup, sd = 2.5 around base 80). This is
// the population the Architect's Q7 bands were most plausibly measured on; sweeping it
// separates "band says engine wrong" from "band says population wrong".
const syntheticLeague = (seed: number, sd = 2.5): LeagueTeam[] => {
  const r = makeRng(seed);
  return TEAMS.map((t) => {
    const base = 80 + sd * r.normal();
    const rec = Object.fromEntries(SLOT_IDS.map((s) => [s, Math.max(60, Math.min(99, base + 3 * r.normal()))])) as Record<SlotId, number>;
    return { name: t.name, ratings: teamRatings(spotsFromRecord(rec)) };
  });
};

// ---------- per-season extraction ----------

interface SeasonStats {
  wins: number[];           // per team (TEAMS order), regular season
  tieGames: number;         // tied GAMES this season (each puts a tie on two records)
  points: number;           // total points scored, regular season, both sides
  games: number;
  homeWins: number;
  champion: string;
  champSeed: number;
  champConf: 'AFC' | 'NFC';
  winSd: number;
  has15Plus: boolean;
  has2Minus: boolean;
}

function seasonStats(teams: readonly LeagueTeam[], seed: number, year: number): SeasonStats {
  const s = simulateSeason(teams, makeRng(seed), { year, prevRank: initialRanks(teams) });
  const wins = TEAMS.map((t) => s.table[t.name].w);
  const n = wins.length;
  const mean = wins.reduce((a, b) => a + b, 0) / n;
  let points = 0, homeWins = 0, tieGames = 0;
  for (const g of s.games) {
    points += g.result.homeScore + g.result.awayScore;
    if (g.result.homeScore > g.result.awayScore) homeWins++;
    else if (g.result.homeScore === g.result.awayScore) tieGames++;
  }
  const seeds = s.seeding.seeds;
  const inA = seeds.AFC.includes(s.champion);
  return {
    wins, tieGames, points, games: s.games.length, homeWins,
    champion: s.champion,
    champSeed: (inA ? seeds.AFC : seeds.NFC).indexOf(s.champion) + 1,
    champConf: inA ? 'AFC' : 'NFC',
    winSd: Math.sqrt(wins.reduce((a, b) => a + (b - mean) ** 2, 0) / n),
    has15Plus: wins.some((w) => w >= 15),
    has2Minus: wins.some((w) => w <= 2),
  };
}

// ---------- aggregation ----------

interface Sweep {
  seasons: number; msPerSeason: number;
  totalWins: number; totalLosses: number; totalTieRecords: number;
  meanWinsPerTeam: number;
  ppg: number;
  homeWinRate: number;
  winSdMean: number; winSdMin: number; winSdMax: number;
  shareSeasons15Plus: number; shareSeasons2Minus: number;
  meanTiesPerSeason: number;
  champs: Record<string, number>;
  champSeeds: Record<string, number>;
  champConf: Record<string, number>;
  determinism: boolean;
}

function runSweep(N: number, leagueOf: (seed: number) => LeagueTeam[], freshDraftPerSeason: boolean): Sweep {
  const all: SeasonStats[] = [];
  const t0 = Date.now();
  for (let i = 0; i < N; i++) {
    const seasonSeed = 1000 + i * 7919;
    const teams = freshDraftPerSeason ? leagueOf(seasonSeed) : leagueOf(0);
    all.push(seasonStats(teams, seasonSeed, 2026 + (i % 6)));
  }
  const msPerSeason = (Date.now() - t0) / N;

  // exact zero-sum recount: per team-season w + l + t = 17; league ties = tieGames, each
  // contributing one tie record to each of the two teams.
  let W = 0;
  let tieRecords = 0;
  for (const s of all) { for (const w of s.wins) W += w; tieRecords += s.tieGames * 2; }
  const teamSeasonSlots = all.length * 32 * 17;
  const L = teamSeasonSlots - W - tieRecords;

  const champs: Record<string, number> = {};
  const champSeeds: Record<string, number> = {};
  const champConf: Record<string, number> = { AFC: 0, NFC: 0 };
  for (const s of all) {
    champs[s.champion] = (champs[s.champion] ?? 0) + 1;
    const k = `seed ${s.champSeed}`;
    champSeeds[k] = (champSeeds[k] ?? 0) + 1;
    champConf[s.champConf]++;
  }
  const sds = all.map((s) => s.winSd);
  const gamesTotal = all.reduce((a, s) => a + s.games, 0);
  const points = all.reduce((a, s) => a + s.points, 0);
  const homeWins = all.reduce((a, s) => a + s.homeWins, 0);

  // determinism check: same league, same season seed, twice → identical table + champion
  const lg = freshDraftPerSeason ? leagueOf(424242) : leagueOf(0);
  const a = simulateSeason(lg, makeRng(31337), { year: 2026 });
  const b = simulateSeason(lg, makeRng(31337), { year: 2026 });
  const determinism = JSON.stringify(a.table) === JSON.stringify(b.table) && a.champion === b.champion;

  return {
    seasons: N, msPerSeason,
    totalWins: W, totalLosses: L, totalTieRecords: tieRecords,
    meanWinsPerTeam: W / (N * 32),
    ppg: points / (gamesTotal * 2),
    homeWinRate: homeWins / gamesTotal,
    winSdMean: sds.reduce((x, y) => x + y, 0) / N,
    winSdMin: Math.min(...sds), winSdMax: Math.max(...sds),
    shareSeasons15Plus: all.filter((s) => s.has15Plus).length / N,
    shareSeasons2Minus: all.filter((s) => s.has2Minus).length / N,
    meanTiesPerSeason: all.reduce((a, s) => a + s.tieGames, 0) / N,
    champs, champSeeds, champConf, determinism,
  };
}

// ---------- report ----------

const ci95 = (p: number, n: number) => 1.96 * Math.sqrt((p * (1 - p)) / n);
const pct = (x: number) => (100 * x).toFixed(1) + '%';

function report(name: string, sw: Sweep): string {
  const L: string[] = [];
  L.push(`### ${name}`);
  L.push('');
  L.push(`- Seasons swept: **${sw.seasons}** · ${sw.msPerSeason.toFixed(0)} ms/season · engine called headless via public API, unmodified`);
  L.push(`- Zero-sum: wins vs losses **${sw.totalWins} / ${sw.totalLosses}** (tie records ${sw.totalTieRecords}) → ${sw.totalWins === sw.totalLosses ? '**EXACT — invariant holds**' : '**VIOLATED**'}`);
  // With tied games present, mean wins per team is 8.5 − ties/32 by arithmetic, not by engine
  // choice: a tied game yields one win fewer in total (0 instead of 1) across 32 teams.
  const expMean = 8.5 - sw.meanTiesPerSeason / 32;
  L.push(`- Mean wins per team: **${sw.meanWinsPerTeam.toFixed(3)}** → tie-adjusted expectation ${(expMean).toFixed(3)} (8.5 − ties/32; with ${sw.meanTiesPerSeason.toFixed(2)} tied games/season, 8.500 is unreachable by arithmetic) → ${Math.abs(sw.meanWinsPerTeam - expMean) < 5e-4 ? '**PASS**' : '**FAIL**'}`);
  L.push(`- Points per team-game: **${sw.ppg.toFixed(2)}** → band [R] 22.8 ± 0.7 → ${Math.abs(sw.ppg - 22.8) <= 0.7 ? '**PASS**' : '**FAIL**'}`);
  L.push(`- Home win rate: **${pct(sw.homeWinRate)}** (95% CI ±${pct(ci95(sw.homeWinRate, sw.seasons * 272))}) → band [R] 53.2% ± 1.5pp → ${Math.abs(sw.homeWinRate - 0.532) <= 0.015 ? '**PASS**' : '**FAIL**'}`);
  L.push(`- Parity: mean SD of team wins **${sw.winSdMean.toFixed(2)}** (per-season range ${sw.winSdMin.toFixed(2)}–${sw.winSdMax.toFixed(2)}) → band [R] 3.0–3.5 → ${sw.winSdMean >= 3.0 && sw.winSdMean <= 3.5 ? '**PASS**' : '**FAIL**'}`);
  L.push(`- Seasons with a 15+-win team: **${pct(sw.shareSeasons15Plus)}** (95% CI ±${pct(ci95(sw.shareSeasons15Plus, sw.seasons))}) → report-only, band pending nflverse re-derivation`);
  L.push(`- Seasons with a ≤2-win team: **${pct(sw.shareSeasons2Minus)}** (95% CI ±${pct(ci95(sw.shareSeasons2Minus, sw.seasons))}) → report-only, band pending nflverse re-derivation`);
  L.push(`- Tied games per season (mean): **${sw.meanTiesPerSeason.toFixed(2)}**`);
  L.push(`- Determinism (same league + same season seed twice → identical table and champion): ${sw.determinism ? '**PASS**' : '**FAIL**'}`);
  L.push('');
  const champs = Object.entries(sw.champs).sort((a, b) => b[1] - a[1]);
  L.push(`Super Bowl winners — ${champs.length} different champions in ${sw.seasons} seasons. Top 10:`);
  L.push('');
  L.push('| Team | Titles | Share |');
  L.push('|---|---|---|');
  for (const [t, c] of champs.slice(0, 10)) L.push(`| ${t} | ${c} | ${pct(c / sw.seasons)} |`);
  L.push('');
  L.push(`Champion by seed: ${Object.entries(sw.champSeeds).sort((a, b) => Number(a[0].slice(5)) - Number(b[0].slice(5))).map(([k, v]) => `${k} ${pct(v / sw.seasons)}`).join(' · ')}`);
  L.push('');
  L.push(`Champion by conference: AFC **${pct(sw.champConf.AFC / sw.seasons)}** · NFC **${pct(sw.champConf.NFC / sw.seasons)}**`);
  L.push('');
  return L.join('\n');
}

// ---------- main ----------

const fixedN = Number(process.argv[2] ?? 200);
const draftN = Number(process.argv[3] ?? 40);

console.log(`Outcome Lab sweep — ${new Date().toISOString().slice(0, 10)} — engine headless via public API, zero engine files touched`);
console.log(`player pool: ${pool.length} players (data/nfl/madden27-ratings.csv)\n`);

const fixed = runSweep(fixedN, () => fixedLeague(), false);
const fixedText = report(`Mode A — fixed league (one seeded CPU draft off the real Madden ratings), ${fixedN} season seeds`, fixed);
console.log(fixedText);

const drafted = runSweep(draftN, (s) => draftLeague(s), true);
const draftedText = report(`Mode B — fresh CPU draft per seed (talent worlds included), ${draftN} seasons`, drafted);
console.log(draftedText);

const synthetic = runSweep(fixedN, (s) => syntheticLeague(s), true);
const syntheticText = report(`Mode C — synthetic population of test/nfl/season.test.ts (OVR base 80 ± 2.5), ${fixedN} season seeds`, synthetic);
console.log(syntheticText);

const outDir = new URL('.', import.meta.url).pathname;
const results = { date: new Date().toISOString(), fixed, drafted, synthetic };
fs.writeFileSync(outDir + 'sweep-results.json', JSON.stringify(results, null, 2));
const md = [
  '# Outcome Lab — Model Report (v0)', '',
  `Generated ${new Date().toISOString()} by \`colors/tools/outcomelab/sweep.ts\` (Z.ai seat, w71 tooling wave).`,
  '', 'What this is: Monte Carlo evidence about the game the engine actually ships. The engine is',
  'called headless through its public API exactly as the golden tests call it; nothing in `src/` is touched.',
  '', 'Three populations, one question each:',
  '- **Mode A (fixed drafted league):** the game as shipped — one CPU draft off the real Madden',
  '  ratings, frozen, then many season seeds. This is what a player\'s season plays out inside.',
  '- **Mode B (fresh draft per seed):** talent-world variation included.',
  '- **Mode C (test synthetic population):** the season.test.ts league (OVR 80 ± 2.5) — the',
  '  population the Q7 bands were most plausibly measured on. It isolates "engine off band" from',
  '  "population off band".',
  '', 'Bands marked **[R]** are the Architect\'s stated simulation invariants (architect branch,',
  '`inbox/20261104-1910-architect-to-muse-architecture-review.md` §Q7); re-deriving them from the',
  'nflverse snapshots in `_agents/data/` is the pending v1 item. Every FAIL below is a finding',
  'for the Architect to rule on — this tool never touches the engine.', '',
  '---', '', fixedText, '---', '', draftedText, '---', '', syntheticText,
].join('\n');
fs.writeFileSync(outDir + `model-report-${new Date().toISOString().slice(0, 10)}.md`, md);
console.log(`written: colors/tools/outcomelab/sweep-results.json`);
console.log(`written: colors/tools/outcomelab/model-report-${new Date().toISOString().slice(0, 10)}.md`);
