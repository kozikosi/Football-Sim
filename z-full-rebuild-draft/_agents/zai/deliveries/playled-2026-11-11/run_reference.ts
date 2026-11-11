// PLAYLED reference harness — runs the REAL drive engine (the Architect's tree) for comparison
// distributions. Read-only: no engine file is touched. Z.ai, 2026-11-11.
//
// Usage:   node --experimental-strip-types tools/playled/run_reference.ts <out.json> [games=2000]
// Env:     PLAYLED_ENGINE_ROOT — path to a checkout of `architect/engine-and-seats`
//          (default: ../../.. i.e. the repo root). Example:
//            git archive architect/engine-and-seats colors/src | tar -x -C /tmp/enginetree
//            PLAYLED_ENGINE_ROOT=/tmp/enginetree node --experimental-strip-types tools/playled/run_reference.ts ref.json 2000
//
// Output:  per-matchup means/sds of the HOME team's totals over seeded games + the matchup
//          numbers + the ratings used, so the Python prototype can (a) verify its ported matchup
//          math against the engine and (b) compare play-level distributions to drive-level ones.
const ENGINE = process.env.PLAYLED_ENGINE_ROOT ?? '../../..';
const { simulateGame } = await import(`${ENGINE}/colors/src/sports/nfl/engine/drives.ts`);
const { matchupModel, DEFAULT_PLAN } = await import(`${ENGINE}/colors/src/sports/nfl/engine/matchup.ts`);
const { teamRatings, spotsFromRecord } = await import(`${ENGINE}/colors/src/sports/nfl/engine/ratings.ts`);
const { makeRng } = await import(`${ENGINE}/colors/src/core/rng.ts`);
const { SLOT_IDS } = await import(`${ENGINE}/colors/src/sports/nfl/engine/slots.ts`);
import { writeFileSync } from 'fs';

const outPath = process.argv[2] ?? 'reference.json';
const GAMES = Number(process.argv[3] ?? 2000);

function rosterAt(base: number): Record<string, number> {
  const r: Record<string, number> = {};
  for (const s of SLOT_IDS) r[s] = base;
  return r;
}

// four matchups spanning the league's spread: neutral, +4, +8, and -8 (all spots shifted together,
// the same lever the engine's own tests use; plans default on both sides, home field OFF for a clean read)
const matchups: { name: string; home: number; away: number }[] = [
  { name: 'even80', home: 80, away: 80 },
  { name: 'home_plus4', home: 84, away: 80 },
  { name: 'home_plus8', home: 88, away: 80 },
  { name: 'home_minus8', home: 72, away: 80 },
];

const stats = ['rush', 'pass', 'plays', 'sacks', 'giveaways', 'points', 'drives', 'top'] as const;
type Acc = Record<string, { sum: number; sum2: number; n: number; min: number; max: number }>;
function acc(): Acc { return {}; }
function push(a: Acc, k: string, v: number) {
  const e = (a[k] ??= { sum: 0, sum2: 0, n: 0, min: Infinity, max: -Infinity });
  e.sum += v; e.sum2 += v * v; e.n++; e.min = Math.min(e.min, v); e.max = Math.max(e.max, v);
}
function finish(a: Acc) {
  const o: Record<string, { mean: number; sd: number; n: number; min: number; max: number }> = {};
  for (const [k, e] of Object.entries(a)) {
    const mean = e.sum / e.n;
    o[k] = { mean, sd: Math.sqrt(Math.max(0, e.sum2 / e.n - mean * mean)), n: e.n, min: e.min, max: e.max };
  }
  return o;
}

const result: any = { games: GAMES, homeField: 0, plan: DEFAULT_PLAN, matchups: [] };

for (const m of matchups) {
  const spotsH = spotsFromRecord(rosterAt(m.home));
  const spotsA = spotsFromRecord(rosterAt(m.away));
  const RH = teamRatings(spotsH), RA = teamRatings(spotsA);
  const lg = teamRatings(spotsFromRecord(rosterAt(80)));
  const mh = matchupModel(RH, RA, lg, DEFAULT_PLAN);
  const ma = matchupModel(RA, RH, lg, DEFAULT_PLAN);
  const a: Acc = acc();
  for (let g = 0; g < GAMES; g++) {
    const rng = makeRng(0x504c4159 ^ (g * 2654435761));
    const res = simulateGame(mh, ma, rng, { playoff: false, homeField: 0 });
    const st = res.stats.home;
    push(a, 'rush', st.rush); push(a, 'pass', st.pass); push(a, 'plays', st.plays);
    push(a, 'sacks', st.sacksTaken); push(a, 'giveaways', st.giveaways);
    push(a, 'points', res.homeScore); push(a, 'drives', st.drives); push(a, 'top', st.top);
  }
  result.matchups.push({
    name: m.name,
    engineMatchupHome: { expRush: mh.expRush, expPass: mh.expPass, lamTO: mh.lamTO, lamSack: mh.lamSack, structPts: mh.structPts, vm: mh.vm, sd: mh.sd },
    ratingsHome: RH,
    ratingsAway: RA,
    homeTotals: finish(a),
  });
}

writeFileSync(outPath, JSON.stringify(result, null, 1));
console.log(`wrote ${outPath}: ${GAMES} games x ${matchups.length} matchups`);
for (const m of result.matchups) {
  const t = m.homeTotals;
  console.log(`${m.name.padEnd(12)} rush ${t.rush.mean.toFixed(1)}±${t.rush.sd.toFixed(1)}  pass ${t.pass.mean.toFixed(1)}±${t.pass.sd.toFixed(1)}  plays ${t.plays.mean.toFixed(1)}±${t.plays.sd.toFixed(1)}  pts ${t.points.mean.toFixed(1)}±${t.points.sd.toFixed(1)}  TO ${t.giveaways.mean.toFixed(2)}  sk ${t.sacks.mean.toFixed(2)}  drives ${t.drives.mean.toFixed(1)}`);
}
