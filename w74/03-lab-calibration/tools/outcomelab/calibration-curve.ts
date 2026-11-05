// Calibration curve runner (P-250 / P-255) — Z.ai executor seat, w74.
//
// What this is: the conversion-curve measurement behind CALIBRATION.md. It drafts a
// league per seed (paired: every policy sees the SAME seed within one index i), plays
// the season, and records P(playoffs | policy), P(SB appearance | policy), P(title | policy),
// mean wins, and the league win-SD distribution (parity, report-only).
//
// It changes NO engine code. The CPU-draft spread lever is `midFloor` (rounds 5..8 floor
// below the best available player; rounds 1..4 stay governed by topFloor=5, per the
// Architect's lever from 551af1b §8). Pass overrides as key=value after the flags.
//
// Run:
//   node --experimental-strip-types tools/outcomelab/calibration-curve.ts \
//        --n 1000 --policies greedy,top30,favorites --out results/baseline.json
//   node --experimental-strip-types tools/outcomelab/calibration-curve.ts \
//        --n 300 --policies top30,greedy --midFloor 14 --out results/midfloor14.json
//
// Pre-registration: every run writes the exact argv + config into the output JSON, so an
// experiment cannot silently drift from what was registered (CALIBRATION.md §5).
import fs from 'node:fs';
import { buildPool } from '../../src/sports/nfl/engine/players.ts';
import { makeRng } from '../../src/core/rng.ts';
import { DEFAULT_CONFIG, newDraft, runDraft, TEAMS_N } from '../../src/sports/nfl/engine/draft.ts';
import type { DraftConfig, UserPolicy } from '../../src/sports/nfl/engine/draft.ts';
import { lineupFor } from '../../src/sports/nfl/engine/lineup.ts';
import { leagueBaseline, spotsOf, teamRatings } from '../../src/sports/nfl/engine/ratings.ts';
import type { Ratings } from '../../src/sports/nfl/engine/ratings.ts';
import { returnerRating } from '../../src/sports/nfl/engine/returner.ts';
import { netPts } from '../../src/sports/nfl/engine/value.ts';
import { TEAMS } from '../../src/sports/nfl/engine/league.ts';
import { simulateSeason } from '../../src/sports/nfl/engine/season.ts';

// ---------- args ----------
const arg = (name: string, def?: string): string | undefined => {
  const i = process.argv.indexOf('--' + name);
  return i >= 0 ? process.argv[i + 1] : def;
};
const N = Number(arg('n', '1000'));
const from = Number(arg('from', '0'));            // shard support: seed-index range [from, to) so long runs
const to = Number(arg('to', String(from + N)));   // can resume in chunks (background processes do not survive sandboxes)
const policies = (arg('policies', 'greedy,top30,favorites') ?? '').split(',') as UserPolicy[];
const outPath = arg('out', 'results/calibration.json');
const cfg: DraftConfig = { ...DEFAULT_CONFIG };
const overrides: Record<string, number> = {};
// Config overrides: accept `midFloor=14`, `--midFloor=14` (equals form). The space form
// (`--midFloor 14`) is reserved for the runner's own flags, so it is NOT an override.
for (const raw of process.argv.slice(2)) {
  const kv = raw.startsWith('--') ? raw.slice(2) : raw;
  if (!kv.includes('=') || kv.startsWith('-')) continue;
  const [k, v] = kv.split('=');
  if (!(k in DEFAULT_CONFIG)) continue;
  (cfg as unknown as Record<string, number>)[k] = +v;
  overrides[k] = +v;
}
for (const [k, v] of Object.entries(overrides)) console.error(`[curve] override applied: ${k}=${v}`);

// ---------- data ----------
const pool = buildPool(
  fs.readFileSync(new URL('../../../data/nfl/madden27-ratings.csv', import.meta.url), 'utf8'),
  fs.readFileSync(new URL('../../../data/nfl/free-agents-old-ratings.csv', import.meta.url), 'utf8'),
  fs.readFileSync(new URL('../../../data/nfl/player-ids.csv', import.meta.url), 'utf8'),
);

function ratingsOf(st: ReturnType<typeof newDraft>): Ratings[] {
  const draft = st.rosters.map((r) => Object.values(r) as import('../../src/sports/nfl/engine/players.ts').Player[]);
  const both = draft.map((pl) => (['4-3', '3-4'] as const).map((b) => teamRatings(spotsOf(lineupFor(pl, b)), returnerRating(lineupFor(pl, b)))));
  const lg = leagueBaseline(both.map((b) => b[0]));
  return both.map((b) => (netPts(b[0], lg) >= netPts(b[1], lg) ? b[0] : b[1]));
}

// ---------- run (streaming: one progress line per 50 seeds) ----------
interface PolicyRow { playoffs: number; sb: number; title: number; wins: number; n: number; winSds: number[]; twoMinus: number; cpuWins: number }
const rows: Record<string, PolicyRow> = {};
for (const p of policies) rows[p] = { playoffs: 0, sb: 0, title: 0, wins: 0, n: 0, winSds: [], twoMinus: 0, cpuWins: 0 };
const t0 = Date.now();
for (let i = from; i < to; i++) {
  for (const pol of policies) {
    // PAIRED SEEDS: the base rng depends only on i, so policy A and policy B at index i
    // draft from the same world and play the same season-seed fork. Differences are the policy.
    const rng = makeRng(1000 + i);
    const st = newDraft(pool, rng.fork('draft'), cfg);
    const user = rng.fork('slot').int(0, TEAMS_N - 1);
    runDraft(st, rng.fork('run'), { team: user, policy: pol });
    const rs = ratingsOf(st);
    const teams = TEAMS.map((t, k) => ({ name: t.name, ratings: rs[k] }));
    const s = simulateSeason(teams, rng.fork('season'), { year: 2026 });
    const name = TEAMS[user].name, r = rows[pol], rec = s.table[name];
    r.n++;
    r.wins += rec.w + rec.t / 2;
    if (s.seeding.seeds.AFC.includes(name) || s.seeding.seeds.NFC.includes(name)) r.playoffs++;
    if (s.finalists.includes(name)) r.sb++;               // reached the Super Bowl game
    if (s.champion === name) r.title++;
    const wins = TEAMS.map((t) => s.table[t.name].w);
    const mean = wins.reduce((a, b) => a + b, 0) / 32;
    r.winSds.push(Math.sqrt(wins.reduce((a, b) => a + (b - mean) ** 2, 0) / 32));
    if (wins.some((w) => w <= 2)) r.twoMinus++;
    r.cpuWins += TEAMS.reduce((t, x, k) => (k === user ? t : t + s.table[x.name].w + s.table[x.name].t / 2), 0) / 31;
  }
  if ((i + 1) % 50 === 0) console.error(`[curve] ${i + 1}/${to} seeds · ${(Date.now() - t0) / 1000 | 0}s`);
}

// ---------- report ----------
const ci95 = (p: number, n: number) => 1.96 * Math.sqrt((p * (1 - p)) / n);
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const result = {
  date: new Date().toISOString(),
  preregistration: { argv: process.argv.slice(2), n: to - from, seedRange: [from, to], policies, configOverrides: overrides, baseConfig: DEFAULT_CONFIG, seedFormula: 'makeRng(1000+i), paired across policies' },
  msTotal: Date.now() - t0,
  curve: Object.fromEntries(policies.map((p) => {
    const r = rows[p];
    return [p, {
      n: r.n,
      pPlayoffs: r.playoffs / r.n, ci95pp: +(100 * ci95(r.playoffs / r.n, r.n)).toFixed(2),
      pSB: r.sb / r.n,
      pTitle: r.title / r.n,
      meanWins: +(r.wins / r.n).toFixed(2),
      meanCpuWins: +(r.cpuWins / r.n).toFixed(2),
      winSdMean: +mean(r.winSds).toFixed(3),
      winSdMin: +Math.min(...r.winSds).toFixed(3),
      winSdMax: +Math.max(...r.winSds).toFixed(3),
      shareSeasonsWith2MinusTeam: r.twoMinus / r.n,
    }];
  })),
};
fs.mkdirSync(new URL('.', import.meta.url).pathname, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
console.log(JSON.stringify(result.curve, null, 2));
console.log(`written: ${outPath}`);
