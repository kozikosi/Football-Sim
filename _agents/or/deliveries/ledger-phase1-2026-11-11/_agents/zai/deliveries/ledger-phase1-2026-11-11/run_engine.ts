// LEDGER PHASE 1 harness — runs the REAL drive engine (the Architect's tree) and records the
// GameResults the Ledger stages plays inside. Read-only: no engine file is touched.
// Z.ai (seat ZAI) for MUSE's ledger-phase1 prompt, 2026-11-11.
//
// Usage:  node run_engine.ts <out.json>
// Engine root is this script's sibling worktree path passed as env LEDGER_ENGINE_ROOT.
//
// Cells:
//   even80        flat 80 vs flat 80, DEFAULT_PLAN            (primary purity + shares; comparable
//                                                               to playled reference_engine.json)
//   home_plus8    flat 88 vs flat 80, DEFAULT_PLAN            (purity under a lopsided matchup)
//   identities    run-identity roster vs pass-identity roster, teamIdentity plans chosen by the
//                 engine itself                                (PERS/package-mix consistency receipt)
const ROOT = process.env.LEDGER_ENGINE_ROOT ?? '/home/z/my-project/arch-wt';
const { simulateGame } = await import(`${ROOT}/colors/src/sports/nfl/engine/drives.ts`);
const { matchupModel, DEFAULT_PLAN } = await import(`${ROOT}/colors/src/sports/nfl/engine/matchup.ts`);
const { teamRatings, spotsFromRecord } = await import(`${ROOT}/colors/src/sports/nfl/engine/ratings.ts`);
const { teamIdentity } = await import(`${ROOT}/colors/src/sports/nfl/engine/plans.ts`);
const { makeRng } = await import(`${ROOT}/colors/src/core/rng.ts`);
const { SLOT_IDS } = await import(`${ROOT}/colors/src/sports/nfl/engine/slots.ts`);
import { writeFileSync } from 'fs';

const OUT = process.argv[2] ?? 'engine_games.json';
const GAMES_A = 500, GAMES_B = 400, GAMES_C = 400;

function rosterAt(base: number): Record<string, number> {
  const r: Record<string, number> = {};
  for (const s of SLOT_IDS) r[s] = base;
  return r;
}
function patch(roster: Record<string, number>, over: Record<string, number>) {
  return { ...roster, ...over };
}
// a run-identity team: line and back strong, pass game weak; the engine's teamIdentity should
// pick a heavy/running plan. a pass-identity team: the mirror.
const RUN_ID = patch(rosterAt(80), { OT1: 88, OT2: 86, OG1: 88, OG2: 86, C: 86, RB1: 88, RB2: 84, FB: 84, TE1: 84, TE2: 78, QB: 76, WR1: 74, WR2: 72, WR3: 70, WR4: 70, TE3: 70 });
const PASS_ID = patch(rosterAt(80), { QB: 88, WR1: 88, WR2: 84, WR3: 80, WR4: 74, TE1: 80, TE2: 74, OT1: 76, OT2: 74, OG1: 76, OG2: 74, C: 74, RB1: 76, RB2: 72, FB: 70 });

interface Acc { sum: number; sum2: number; n: number }
function acc(): Acc { return { sum: 0, sum2: 0, n: 0 }; }
function push(a: Acc, v: number) { a.sum += v; a.sum2 += v * v; a.n++; }

const games: any[] = [];
const totals: Record<string, Acc> = { rush: acc(), pass: acc(), plays: acc(), sacks: acc(), pts: acc(), drives: acc() };
// the WR2/WR3 mate OVR the gravity cue reads (RUN_ID mates 72/70 -> 71; PASS_ID 84/80 -> 82; flat 80)
const wrMateOvr: Record<string, { home: number; away: number }> = {
  even80: { home: 80, away: 80 }, home_plus8: { home: 80, away: 80 }, identities: { home: 71, away: 82 },
};

function runCell(name: string, n: number, rosterH: Record<string, number>, rosterA: Record<string, number>, useIdentity: boolean, seedBase: number) {
  const RH = teamRatings(spotsFromRecord(rosterH));
  const RA = teamRatings(spotsFromRecord(rosterA));
  const lg = teamRatings(spotsFromRecord(rosterAt(80)));
  const planH = useIdentity ? teamIdentity(RH, lg) : null;
  const planA = useIdentity ? teamIdentity(RA, lg) : null;
  const mh = matchupModel(RH, RA, lg, { off: planH ? planH.off : DEFAULT_PLAN.off, def: planA ? planA.def : DEFAULT_PLAN.def });
  const ma = matchupModel(RA, RH, lg, { off: planA ? planA.off : DEFAULT_PLAN.off, def: planH ? planH.def : DEFAULT_PLAN.def });
  for (let g = 0; g < n; g++) {
    const seed = (0x4c454447 ^ ((seedBase + g) * 2654435761)) >>> 0;
    const rng = makeRng(seed);
    const res = simulateGame(mh, ma, rng, { playoff: false, homeField: 0 });
    games.push({
      cell: name, seed,
      homeScore: res.homeScore, awayScore: res.awayScore,
      plans: { home: planH ? { off: planH.off, def: planH.def } : { off: DEFAULT_PLAN.off, def: DEFAULT_PLAN.def },
               away: planA ? { off: planA.off, def: planA.def } : { off: DEFAULT_PLAN.off, def: DEFAULT_PLAN.def } },
      agg: res.agg,
      stats: res.stats,
      drives: res.drives.map((d) => ({ side: d.side, period: d.period, secs: d.secs, plays: d.plays,
        rush: d.rush, pass: d.pass, sacks: d.sacks, end: d.end, pts: d.pts, conv: d.conv ?? null,
        oppPts: d.oppPts, defTD: d.defTD })),
    });
    for (const s of ['home', 'away'] as const) {
      push(totals.rush, res.stats[s].rush); push(totals.pass, res.stats[s].pass);
      push(totals.plays, res.stats[s].plays); push(totals.sacks, res.stats[s].sacksTaken);
      push(totals.pts, s === 'home' ? res.homeScore : res.awayScore);
      push(totals.drives, res.stats[s].drives);
    }
  }
  const ph = planH ? `${planH.off.pers}/${planH.off.strat} vs ${planH.def.pkg}/${planH.def.focus}` : 'default';
  console.log(`cell ${name}: ${n} games, home plan ${ph}`);
}

runCell('even80', GAMES_A, rosterAt(80), rosterAt(80), false, 1);
runCell('home_plus8', GAMES_B, rosterAt(88), rosterAt(80), false, 90001);
runCell('identities', GAMES_C, RUN_ID, PASS_ID, true, 500001);
console.log(`identity plans — run team: off ${JSON.stringify(teamIdentity(teamRatings(spotsFromRecord(RUN_ID)), teamRatings(spotsFromRecord(rosterAt(80)))).off)}, pass team: off ${JSON.stringify(teamIdentity(teamRatings(spotsFromRecord(PASS_ID)), teamRatings(spotsFromRecord(rosterAt(80)))).off)}`);

const mean = (a: Acc) => a.sum / a.n;
writeFileSync(OUT, JSON.stringify({ gamesRecorded: games.length, cells: { even80: GAMES_A, home_plus8: GAMES_B, identities: GAMES_C }, wrMateOvr, games }, null, 1));
console.log(`wrote ${OUT}: ${games.length} games`);
console.log(`engine means/team-game: rush ${mean(totals.rush).toFixed(1)}  pass ${mean(totals.pass).toFixed(1)}  plays ${mean(totals.plays).toFixed(1)}  sacks ${mean(totals.sacks).toFixed(2)}  pts ${mean(totals.pts).toFixed(1)}  drives ${mean(totals.drives).toFixed(1)}`);
