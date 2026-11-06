// Calibration harness (not a test): drafts, plays the season, and reports how a user following each policy fares.
// Usage: node --experimental-strip-types tools/calibrate-draft.ts [drafts=40] [policy,policy,...] [key=value overrides of DraftConfig]
import fs from 'node:fs';
import { buildPool } from '../src/engine/players.ts';
import { makeRng } from '../src/engine/rng.ts';
import { DEFAULT_CONFIG, newDraft, runDraft, TEAMS_N } from '../src/engine/draft.ts';
import type { DraftConfig, DraftState, UserPolicy } from '../src/engine/draft.ts';
import { lineupFor } from '../src/engine/lineup.ts';
import type { Lineup } from '../src/engine/lineup.ts';
import { leagueBaseline, spotsOf, teamRatings } from '../src/engine/ratings.ts';
import type { Ratings } from '../src/engine/ratings.ts';
import { returnerRating } from '../src/engine/returner.ts';
import { netPts } from '../src/engine/value.ts';
import { TEAMS } from '../src/engine/league.ts';
import { simulateSeason } from '../src/engine/season.ts';

const pool = buildPool(fs.readFileSync(new URL('../../data/madden27-ratings.csv', import.meta.url), 'utf8'), fs.readFileSync(new URL('../../data/free-agents-old-ratings.csv', import.meta.url), 'utf8'));
const N = +(process.argv[2] ?? 40);
const policies = (process.argv[3] ?? 'greedy,top30,favorites').split(',') as UserPolicy[];
const cfg: DraftConfig = { ...DEFAULT_CONFIG };
for (const kv of process.argv.slice(4)) { const [k, v] = kv.split('='); (cfg as unknown as Record<string, number>)[k] = +v; }

function ratingsOf(st: DraftState): { ratings: Ratings; lineup: Lineup }[] {
  const draft = st.rosters.map((r) => Object.values(r) as import('../src/engine/players.ts').Player[]);
  const both = draft.map((pl) => (['4-3', '3-4'] as const).map((b) => { const l = lineupFor(pl, b); return { l, R: teamRatings(spotsOf(l), returnerRating(l)) }; }));
  const lg = leagueBaseline(both.map((b) => b[0].R));
  return both.map((b) => { const best = netPts(b[0].R, lg) >= netPts(b[1].R, lg) ? b[0] : b[1]; return { ratings: best.R, lineup: best.l }; });
}

const rows: Record<string, { playoffs: number; sb: number; wins: number; n: number; cpuWins: number; gap: number[]; val: number }> = {};
for (const pol of policies) rows[pol] = { playoffs: 0, sb: 0, wins: 0, n: 0, cpuWins: 0, gap: [], val: 0 };
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
  if (s.champion === name) r.sb++;
  r.cpuWins += TEAMS.reduce((t, x, k) => (k === user ? t : t + s.table[x.name].w + s.table[x.name].t / 2), 0) / 31;
  r.val += rs[user].lineup.value / 1000;
  for (const p of st.log) if (p.team !== user && p.round <= 4) r.gap.push(p.ovrGap);
}
console.log(`drafts per policy: ${N}, ${((Date.now() - t0) / 1000).toFixed(0)} s, cfg ${JSON.stringify(cfg)}`);
for (const pol of policies) {
  const r = rows[pol], g = r.gap.sort((a, b) => a - b);
  console.log(`${pol.padEnd(10)} wins ${(r.wins / r.n).toFixed(2)} (CPU avg ${(r.cpuWins / r.n).toFixed(2)})  playoffs ${(100 * r.playoffs / r.n).toFixed(0)}%  title ${(100 * r.sb / r.n).toFixed(0)}%  | CPU rounds 1-4 gap to the best on the board: median ${g[g.length >> 1]}, p90 ${g[Math.floor(g.length * 0.9)]}, max ${g[g.length - 1]}`);
}
