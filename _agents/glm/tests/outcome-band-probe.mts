// GLM seat probe for ASK 20261105-0105 (outcome-based CI gate): extracts the four metric
// families the band proposal needs from the SAME runs whose RNG streams are identical to
// tools/calibrate-draft.ts (same seeds, same forks), so every number it shares with the
// stock harness must match it exactly. Engine untouched: public API only.
//
// Metrics added over the stock harness: Super Bowl APPEARANCE (finalists), strict 20-0
// (champion + 17-0-0 + bye path = exactly 3 playoff games, all won), CPU loser tail
// (share of seasons whose 31 CPU teams include a <=2-win team, mean of the season-min
// wins, mean within-season SD of CPU wins), rounds 1-4 gap quantiles.
//
// Usage: node --experimental-strip-types _agents/glm/tests/outcome-band-probe.ts <draftsPerPolicy> [policy,...]
import fs from 'node:fs';
import { buildPool } from '../../../colors/src/sports/nfl/engine/players.ts';
import { makeRng } from '../../../colors/src/core/rng.ts';
import { DEFAULT_CONFIG, newDraft, runDraft, TEAMS_N } from '../../../colors/src/sports/nfl/engine/draft.ts';
import type { DraftConfig, UserPolicy } from '../../../colors/src/sports/nfl/engine/draft.ts';
import { lineupFor } from '../../../colors/src/sports/nfl/engine/lineup.ts';
import type { Lineup } from '../../../colors/src/sports/nfl/engine/lineup.ts';
import { leagueBaseline, spotsOf, teamRatings } from '../../../colors/src/sports/nfl/engine/ratings.ts';
import type { Ratings } from '../../../colors/src/sports/nfl/engine/ratings.ts';
import { returnerRating } from '../../../colors/src/sports/nfl/engine/returner.ts';
import { netPts } from '../../../colors/src/sports/nfl/engine/value.ts';
import { TEAMS } from '../../../colors/src/sports/nfl/engine/league.ts';
import { simulateSeason } from '../../../colors/src/sports/nfl/engine/season.ts';

const pool = buildPool(
  fs.readFileSync(new URL('../../../data/nfl/madden27-ratings.csv', import.meta.url), 'utf8'),
  fs.readFileSync(new URL('../../../data/nfl/free-agents-old-ratings.csv', import.meta.url), 'utf8'),
  fs.readFileSync(new URL('../../../data/nfl/player-ids.csv', import.meta.url), 'utf8'),
);
const N = +(process.argv[2] ?? 40);
const raw = (process.argv[3] ?? 'greedy,top30,favorites').split(',');
// The CLI literal is still 'top30' (the code type); the frame label is "skilled" — map for output only.
const LABEL: Record<string, string> = { top30: 'skilled' };
const policies = raw.map((p) => (p === 'skilled' ? 'top30' : p)) as UserPolicy[];
const cfg: DraftConfig = { ...DEFAULT_CONFIG };
for (const kv of process.argv.slice(4)) { const [k, v] = kv.split('='); (cfg as unknown as Record<string, number>)[k] = +v; }

function ratingsOf(st: ReturnType<typeof newDraft>): { ratings: Ratings; lineup: Lineup }[] {
  const draft = st.rosters.map((r) => Object.values(r) as import('../../../colors/src/sports/nfl/engine/players.ts').Player[]);
  const both = draft.map((pl) => (['4-3', '3-4'] as const).map((b) => { const l = lineupFor(pl, b); return { l, R: teamRatings(spotsOf(l), returnerRating(l)) }; }));
  const lg = leagueBaseline(both.map((b) => b[0].R));
  return both.map((b) => { const best = netPts(b[0].R, lg) >= netPts(b[1].R, lg) ? b[0] : b[1]; return { ratings: best.R, lineup: best.l }; });
}

interface Row { n: number; playoffs: number; appear: number; title: number; tight20: number; clean20: number; wins: number; cpuWins: number; tail: number; minWins: number; cpuSd: number; wmax: number; gaps: number[] }
const rows: Record<string, Row> = {};
for (const p of policies) rows[p] = { n: 0, playoffs: 0, appear: 0, title: 0, tight20: 0, clean20: 0, wins: 0, cpuWins: 0, tail: 0, minWins: 0, cpuSd: 0, wmax: 0, gaps: [] };

const t0 = Date.now();
for (let i = 0; i < N; i++) for (const pol of policies) {
  const rng = makeRng(1000 + i), st = newDraft(pool, rng.fork('draft'), cfg), user = rng.fork('slot').int(0, TEAMS_N - 1);
  runDraft(st, rng.fork('run'), { team: user, policy: pol });
  const rs = ratingsOf(st);
  const teams = TEAMS.map((t, k) => ({ name: t.name, ratings: rs[k].ratings }));
  const s = simulateSeason(teams, rng.fork('season'), { year: 2026 });
  const name = TEAMS[user].name, r = rows[pol], rec = s.table[name];
  r.n++; r.wins += rec.w + rec.t / 2;
  if (s.seeding.seeds.AFC.includes(name) || s.seeding.seeds.NFC.includes(name)) r.playoffs++;
  if (s.finalists[0] === name || s.finalists[1] === name) r.appear++;
  if (s.champion === name) r.title++;
  // 20-0: 17-0-0 regular season, champion, no playoff loss. Bye (seed 1) path = 3 playoff games = "20-0"; wild-card path = "21-0".
  if (s.champion === name && rec.w === 17 && rec.t === 0 && s.playoffs.every((g) => (g.home === name ? g.result.homeScore : g.result.awayScore) > (g.home === name ? g.result.awayScore : g.result.homeScore)))
    s.playoffs.length === 3 ? r.tight20++ : r.clean20++;
  const cpu = TEAMS.reduce((acc: number[], _t, k) => (k === user ? acc : acc.concat(s.table[_t.name].w + s.table[_t.name].t / 2)), [] as number[]);
  const mean = cpu.reduce((a, b) => a + b, 0) / cpu.length;
  r.cpuWins += mean; r.minWins += Math.min(...cpu); r.wmax += Math.max(...cpu);
  r.cpuSd += Math.sqrt(cpu.reduce((a, b) => a + (b - mean) ** 2, 0) / cpu.length);
  if (cpu.some((w) => w <= 2)) r.tail++;
  for (const p of st.log) if (p.team !== user && p.round <= 4) r.gaps.push(p.ovrGap);
}
console.log(`probe: drafts per policy ${N}, policies ${policies.join(',')}, ${((Date.now() - t0) / 1000).toFixed(0)} s, cfg ${JSON.stringify(cfg)}`);
const q = (a: number[], t: number): number => a.length ? a[Math.min(a.length - 1, Math.max(0, Math.floor(a.length * t)))] : NaN;
for (const pol of policies) {
  const r: Row = rows[pol], g = r.gaps.slice().sort((a, b) => a - b), n = r.n, pc = (x: number) => (100 * x / n).toFixed(1) + '%';
  console.log([
    (LABEL[pol] ?? pol).padEnd(10), `n=${n}`,
    `wins ${(r.wins / n).toFixed(2)} (CPU avg ${(r.cpuWins / n).toFixed(2)})`,
    `playoffs ${pc(r.playoffs)} appear ${pc(r.appear)} title ${pc(r.title)}`,
    `20-0 ${pc(r.tight20)} (+21-0 ${pc(r.clean20)})`,
    `CPU tail: <=2-win seasons ${pc(r.tail)}, season-min-wins mean ${(r.minWins / n).toFixed(2)}, CPU winSD mean ${(r.cpuSd / n).toFixed(2)}, CPU max-wins mean ${(r.wmax / n).toFixed(2)}`,
    `rounds 1-4 gap: median ${q(g, 0.5)}, p90 ${q(g, 0.9)}, p99 ${q(g, 0.99)}, max ${g[g.length - 1]}`,
  ].join('  |  '));
}
