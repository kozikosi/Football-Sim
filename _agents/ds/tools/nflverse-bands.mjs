#!/usr/bin/env node
// nflverse-bands.mjs — re-derive the Outcome Lab's [R] bands from nflverse games.csv.
//
// Why: `colors/tools/outcomelab/sweep.ts` compares three simulated quantities to bands
// marked [R] (the Architect's numbers, never re-derived). This script computes the same
// three statistics from real NFL regular-season games, using the same definitions as
// sweep.ts, so a band can be checked instead of quoted.
//
// Metric definitions copied from sweep.ts:seasonStats():
//   homeWinRate = games with homeScore > awayScore / all games (ties in the denominator)
//   ppg         = total points / (games * 2)     [points per team-game]
//   winSd       = per-season SD of wins across the 32 teams, then averaged over seasons
//   share15Plus = share of seasons containing a team with >= 15 wins
//   share2Minus = share of seasons containing a team with <= 2 wins
//
// Source: https://github.com/nflverse/nflverse-data/releases/download/schedules/games.csv
//   curl -sL -o games.csv <url>          (2.19 MB, fetched 2026-11-05)
// Run: node nflverse-bands.mjs games.csv 2020 2024
//
// Filters: game_type === 'REG', season in [from, to], both scores finite. This reproduces
// the Architect's snapshot exactly (1,343 games, 4 ties, 79 OT for 2020-2024); the
// cancelled 2023 BUF-CIN game has no score and drops out on the finite-score filter.

import fs from 'node:fs';

const [file = 'games.csv', fromArg = '2020', toArg = '2024'] = process.argv.slice(2);
const from = Number(fromArg);
const to = Number(toArg);

const text = fs.readFileSync(file, 'utf8');
const lines = text.split('\n');
const head = lines[0].split(',');
const ix = Object.fromEntries(head.map((h, i) => [h, i]));

const rows = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;
  const cells = [];
  let cur = '';
  let quoted = false;
  for (const ch of line) {
    if (ch === '"') quoted = !quoted;
    else if (ch === ',' && !quoted) { cells.push(cur); cur = ''; }
    else cur += ch;
  }
  cells.push(cur);
  rows.push(cells);
}
const num = (v) => (v === '' || v == null ? NaN : Number(v));

function seasonRow(season) {
  const rec = { season, games: 0, homeWins: 0, awayWins: 0, ties: 0, points: 0, ot: 0 };
  const table = new Map();
  for (const c of rows) {
    if (c[ix.game_type] !== 'REG' || num(c[ix.season]) !== season) continue;
    const hs = num(c[ix.home_score]);
    const as = num(c[ix.away_score]);
    if (!Number.isFinite(hs) || !Number.isFinite(as)) continue;
    rec.games++;
    rec.points += hs + as;
    if (num(c[ix.overtime]) === 1) rec.ot++;
    let hw = 0, aw = 0, tie = 0;
    if (hs > as) { rec.homeWins++; hw = 1; } else if (as > hs) { rec.awayWins++; aw = 1; } else { rec.ties++; tie = 1; }
    for (const [team, w, l, t] of [[c[ix.home_team], hw, aw, tie], [c[ix.away_team], aw, hw, tie]]) {
      const r = table.get(team) ?? { w: 0, l: 0, t: 0 };
      r.w += w; r.l += l; r.t += t;
      table.set(team, r);
    }
  }
  const wins = [...table.values()].map((r) => r.w);
  const mean = wins.reduce((a, b) => a + b, 0) / wins.length;
  rec.teams = wins.length;
  rec.homeWinRate = rec.homeWins / rec.games;
  rec.ppg = rec.points / (rec.games * 2);
  rec.otRate = rec.ot / rec.games;
  rec.winSd = Math.sqrt(wins.reduce((a, b) => a + (b - mean) ** 2, 0) / wins.length);
  rec.maxWins = Math.max(...wins);
  rec.minWins = Math.min(...wins);
  rec.teamsLE4 = wins.filter((w) => w <= 4).length;
  rec.teamsGE13 = wins.filter((w) => w >= 13).length;
  rec.has15Plus = wins.some((w) => w >= 15);
  rec.has2Minus = wins.some((w) => w <= 2);
  return rec;
}

const seasons = [];
for (let s = from; s <= to; s++) seasons.push(seasonRow(s));
const games = seasons.reduce((a, r) => a + r.games, 0);
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
const sd = (xs) => {
  const m = mean(xs);
  return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / xs.length);
};

const summary = {
  source: `nflverse games.csv REG ${from}-${to} (fetched 2026-11-05)`,
  window: [from, to],
  seasons: seasons.length,
  games,
  homeWinRate: seasons.reduce((a, r) => a + r.homeWins, 0) / games,
  awayWinRate: seasons.reduce((a, r) => a + r.awayWins, 0) / games,
  tieRate: seasons.reduce((a, r) => a + r.ties, 0) / games,
  ppg: seasons.reduce((a, r) => a + r.points, 0) / (games * 2),
  otRate: seasons.reduce((a, r) => a + r.ot, 0) / games,
  winSdMean: mean(seasons.map((r) => r.winSd)),
  winSdSeasonSd: sd(seasons.map((r) => r.winSd)),
  winSdRange: [Math.min(...seasons.map((r) => r.winSd)), Math.max(...seasons.map((r) => r.winSd))],
  shareSeasons15Plus: seasons.filter((r) => r.has15Plus).length / seasons.length,
  shareSeasons2Minus: seasons.filter((r) => r.has2Minus).length / seasons.length,
  teamsLE4PerSeason: mean(seasons.map((r) => r.teamsLE4)),
  teamsGE13PerSeason: mean(seasons.map((r) => r.teamsGE13)),
  minWinsRange: [Math.min(...seasons.map((r) => r.minWins)), Math.max(...seasons.map((r) => r.minWins))],
  maxWinsRange: [Math.min(...seasons.map((r) => r.maxWins)), Math.max(...seasons.map((r) => r.maxWins))],
};

console.log(JSON.stringify({ summary, seasons }, null, 2));
