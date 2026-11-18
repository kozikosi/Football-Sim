// Down-preserving hierarchy, end to end: a seeded, matched-key game run that works on ANY tree (it uses only runGame / gameTotals / the event log), so the same file runs on the pinned
// tree (before) and the fixed tree (after) and the two outputs are paired game by game (same keys 'hier:<g>'). A REPORT: nothing here gates a build.
// Outcome-shaped numbers (no mechanism in them): per game the eleven team totals, and per 4th-down pass or run try: did the drive RESUME WITHOUT A NEW FIRST DOWN (the next snap of the same drive
// is not a 1st down)? In the real 2023-25 records that is 0.2% (pass) and 0.0% (run) of failed tries; the pack has no penalties, so a 4th-down try that goes on without a first down is only ever a
// hierarchy artefact. (The state's own ytg is NOT used: a pool cell groups several distances, so yards < ytg can be a real conversion read from a cell whose members needed less.)
// Usage:  node --experimental-strip-types tools/hier-sim.ts run  <games=20000> <out.json> [pools=nfl-pools-fit2023-2025]
//         node --experimental-strip-types tools/hier-sim.ts diff <before.json> <after.json>
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools, CALL } from '../src/sports/nfl/sim/pools.ts';
import { runGame, TEAMS } from '../src/sports/nfl/sim/game.ts';
import { gameTotals, METRICS } from '../src/sports/nfl/sim/totals.ts';

const mode = process.argv[2];
const COLS = [...METRICS, 'try4_pass', 'try4_run', 'conv4_pass', 'conv4_run', 'resume4_pass', 'resume4_run'] as const;

if (mode === 'run') {
  const N = Number(process.argv[3] ?? 20000), out = process.argv[4] ?? 'hier-sim.json', poolsName = process.argv[5] ?? 'nfl-pools-fit2023-2025';
  const body = JSON.parse(fs.readFileSync(new URL(`../../data/packs/${poolsName}.json`, import.meta.url), 'utf8')) as PackBody;
  const P = loadPools(makePack(body));
  const rows: number[][] = [];
  for (let g = 0; g < N; g++) {
    const r = runGame(P, gameKeyOf('hier:' + g)), tot = gameTotals(r), row: number[] = [];
    for (const m of METRICS) row.push(TEAMS.reduce((s, t) => s + tot[t]![m], 0));
    const c = { tp: 0, tr: 0, cp: 0, cr: 0, rp: 0, rr: 0 };
    const snaps = r.events.filter((e) => e.kind === 'snap');
    for (let k = 0; k < snaps.length; k++) {
      const p = snaps[k]!.payload as { drive: number; down: number; call: number; give: boolean };
      if (p.down !== 4 || (p.call !== CALL.pass && p.call !== CALL.run)) continue;
      const pass = p.call === CALL.pass;
      if (pass) c.tp++; else c.tr++;
      const next = snaps[k + 1]?.payload as { drive: number; down: number } | undefined;
      if (p.give || next === undefined || next.drive !== p.drive) continue;          // a turnover, or the drive ended (score, downs)
      if (next.down === 1) { if (pass) c.cp++; else c.cr++; } else { if (pass) c.rp++; else c.rr++; }
    }
    row.push(c.tp, c.tr, c.cp, c.cr, c.rp, c.rr);
    rows.push(row);
  }
  fs.writeFileSync(out, JSON.stringify({ pools: poolsName, games: N, cols: COLS, rows }));
  console.log(`wrote ${out}: ${N} games`);
} else if (mode === 'diff') {
  const A = JSON.parse(fs.readFileSync(process.argv[3]!, 'utf8')) as { games: number; cols: string[]; rows: number[][] };
  const B = JSON.parse(fs.readFileSync(process.argv[4]!, 'utf8')) as { games: number; cols: string[]; rows: number[][] };
  if (A.games !== B.games) throw new Error('game counts differ');
  const n = A.games;
  console.log(`paired over ${n} matched game keys (per game, both teams summed); diff = after - before`);
  console.log('metric'.padEnd(18) + 'before'.padStart(11) + 'after'.padStart(11) + 'diff'.padStart(10) + 'se'.padStart(9) + 'z'.padStart(8));
  A.cols.forEach((c, j) => {
    let sa = 0, sb = 0, sd = 0, sdd = 0;
    for (let g = 0; g < n; g++) { const a = A.rows[g]![j]!, b = B.rows[g]![j]!; sa += a; sb += b; sd += b - a; sdd += (b - a) * (b - a); }
    const md = sd / n, se = Math.sqrt(Math.max(0, sdd / n - md * md) / n);
    console.log(c.padEnd(18) + (sa / n).toFixed(4).padStart(11) + (sb / n).toFixed(4).padStart(11) + md.toFixed(4).padStart(10) + se.toFixed(4).padStart(9) + (se > 0 ? (md / se).toFixed(1) : 'n/a').padStart(8));
  });
  for (const nm of ['pass', 'run'] as const) {
    const jt = A.cols.indexOf('try4_' + nm), jc = A.cols.indexOf('conv4_' + nm), jr = A.cols.indexOf('resume4_' + nm);
    const f = (T: typeof A, j: number): number => { let t = 0, x = 0; for (const r of T.rows) { t += r[jt]!; x += r[j]!; } return t > 0 ? 100 * x / t : NaN; };
    console.log(`4th-down ${nm} tries: converted (next snap is a 1st down) before ${f(A, jc).toFixed(1)}% after ${f(B, jc).toFixed(1)}%;  RESUMED WITHOUT A FIRST DOWN before ${f(A, jr).toFixed(2)}% after ${f(B, jr).toFixed(2)}%  (real 0%: no penalties in the pack)`);
  }
} else throw new Error('usage: run <games> <out.json> [pools] | diff <before.json> <after.json>');
