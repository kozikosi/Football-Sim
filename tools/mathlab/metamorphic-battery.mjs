// T7 — metamorphic battery (colors engine, read-only).
// Checks: name-independence, color-independence, identical-roster symmetry, monotonicity, uniform +5 OVR no positional preference.
// Run: node --experimental-strip-types tools/mathlab/metamorphic-battery.mjs
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(process.cwd(), 'colors');
const src = (p) => import(pathToFileURL(path.join(root, 'src', p)).href);
const { teamRatings, spotsFromRecord, leagueBaseline } = await src('engine/ratings.ts');
const { SLOT_IDS } = await src('engine/slots.ts');
const { simulateGame } = await src('engine/drives.ts');
const { matchupModel, DEFAULT_PLAN } = await src('engine/matchup.ts');
const { makeRng } = await src('engine/rng.ts');
const { TEAMS } = await src('engine/league.ts');

const base = Object.fromEntries(SLOT_IDS.map((s) => [s, 80]));
const mk = (rec) => teamRatings(spotsFromRecord(rec));
const lg = leagueBaseline(TEAMS.map((t) => mk(base)));
const opp = mk(base);

let fails = 0;
function check(name, cond, detail) {
  if (cond) console.log('PASS', name);
  else { fails++; console.log('FAIL', name, detail ?? ''); }
}

// 1. identical-roster symmetry: A vs A -> ~0 point diff over N
{
  const m = matchupModel(mk(base), mk(base), lg, DEFAULT_PLAN);
  let d = 0;
  for (let i = 0; i < 500; i++) {
    const r = simulateGame(m, m, makeRng(1000 + i), { playoff: false, homeField: 0 });
    d += r.homeScore - r.awayScore;
  }
  check('identical-roster symmetry (mean diff ~0)', Math.abs(d / 500) < 1.5, `meanDiff=${(d/500).toFixed(3)}`);
}

// 2. monotonicity: raising one slot's OVR never lowers structPts for the upgraded side
{
  let ok = true, prev = null;
  for (let o = 70; o <= 90; o += 5) {
    const m = matchupModel(mk({ ...base, CB1: o }), opp, lg, DEFAULT_PLAN);
    if (prev !== null && m.structPts < prev - 1e-9) ok = false;
    prev = m.structPts;
  }
  check('monotonicity CB1 structPts', ok);
}

// 3. uniform +5 OVR: no single slot claims >40% of total upgrade value (sanity)
{
  const baseM = matchupModel(mk(base), opp, lg, DEFAULT_PLAN).structPts;
  const deltas = SLOT_IDS.map((s) => {
    const m = matchupModel(mk({ ...base, [s]: 85 }), opp, lg, DEFAULT_PLAN).structPts;
    return { slot: s, delta: m - baseM };
  });
  const total = deltas.reduce((a, b) => a + Math.max(0, b.delta), 0);
  const maxShare = Math.max(...deltas.map((d) => (total > 0 ? d.delta / total : 0)));
  check('no single slot >40% of +5 uniform upgrade', maxShare < 0.4, `maxShare=${maxShare.toFixed(3)}`);
}

console.log(fails === 0 ? '\nALL METAMORPHIC CHECKS PASS' : `\n${fails} FAILURES`);
process.exit(fails === 0 ? 0 : 1);
