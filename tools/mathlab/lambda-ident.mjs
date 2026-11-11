// tools/mathlab/lambda-ident.mjs — READ-ONLY prototype (no engine or product change).
// P-345 innovation round, Question 1: lambda identification.
//
// Claim under test (DS D3 / DS D4, engine-design-2026-11-11.md):
//   P(k|x) = softmax[ a(x) + sum_c lambda_c * theta_{nu,k,c} * g_c ]
//   lambda = impact scale of one SD of duty c (dispersion matching, derived dial)
//   theta  = shape of how a duty gap splits across outcomes (prior)
//   DS D3: lambda and theta are NOT separately identified.
//   DS D4: analytic dispersion matching overstates lambda by 23-75%.
//
// Method (VERIFIED by computation below, all inputs named):
//   1. Load data/madden27-ratings.csv (1,941 players, 32 teams, Owner paste 28 Oct 2026).
//   2. Compute each team's mean OVR and the spread of team mean OVRs -> Var(z_team).
//   3. Variance matching on team points: Var(points) = beta^2 * Var(z_team) + Var(eps),
//      where beta = lambda*theta (the only slope the observables can see).
//      nflverse P-344 delivery (council/muse c7540b04, VERIFIED): points SD = 10.00
//      per team-game -> Var(points) = 100.
//   4. Show two different (lambda, theta) pairs give the SAME beta -> SAME observable
//      spread -> lambda is not identified from OVR-only data.
//   5. Quantify the DS D4 band: with theta frozen at 1, beta is mistaken for lambda;
//      any theta < 1 makes the true lambda smaller -> overstatement of 23-75% for
//      theta in [0.57, 0.81].
//   6. State what WOULD identify lambda (historical Madden ratings joined to per-play
//      outcomes) and note the Owner ruled it out (design-13d: none, not needed).
//
// Runs: node tools/mathlab/lambda-ident.mjs   (no network, no engine file touched)

import { readFileSync } from 'node:fs';

const CSV = 'data/madden27-ratings.csv';
const POINTS_SD = 10.00;   // nflverse Phase 1 P-344 delivery, league SD per team-game (VERIFIED)

function parseCsv(path) {
  const lines = readFileSync(path, 'utf8').trimEnd().split('\n');
  const header = lines[0].split(',');
  const rows = [];
  let bad = 0;
  for (let i = 1; i < lines.length; i++) {
    const f = lines[i].split(',');
    if (f.length !== 6) { bad++; continue; }
    rows.push({ name: f[0], pos: f[1], team: f[2], ovr: Number(f[3]), spd: Number(f[4]), str: Number(f[5]) });
  }
  return { header, rows, bad };
}

function mean(xs) { return xs.reduce((a, b) => a + b, 0) / xs.length; }
function sd(xs) {
  const m = mean(xs);
  return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / (xs.length - 1));
}

const { header, rows, bad } = parseCsv(CSV);
const valid = rows.filter(r => Number.isFinite(r.ovr));
const byTeam = new Map();
for (const r of valid) {
  if (!byTeam.has(r.team)) byTeam.set(r.team, []);
  byTeam.get(r.team).push(r.ovr);
}
const teams = [...byTeam.entries()].map(([t, ovrs]) => ({ team: t, n: ovrs.length, mean: mean(ovrs), sd: sd(ovrs) }));
const leagueMeanOvr = mean(valid.map(r => r.ovr));
const leagueSdOvr = sd(valid.map(r => r.ovr));
const teamMeans = teams.map(t => t.mean);
const varTeamMean = sd(teamMeans) ** 2;                // spread of team mean OVR
const varZteam = varTeamMean / (leagueSdOvr ** 2);    // Var(z_team) in league-z units

const pointsVar = POINTS_SD ** 2;                     // 100
const beta2timesZvarUpper = pointsVar;                // beta^2 * Var(z_team) <= 100 (eps >= 0)
const betaMax = Math.sqrt(beta2timesZvarUpper / varZteam); // largest beta consistent with data (eps = 0)

// Two (lambda, theta) pairs with identical beta -> identical observable spread.
const pairs = [
  { lambda: 0.40, theta: 1.00 },
  { lambda: 0.80, theta: 0.50 },
  { lambda: 1.00, theta: 0.40 },
  { lambda: 0.55, theta: 0.7272727273 },
];
console.log('inputs:');
console.log(`  players parsed: ${valid.length} (skipped malformed lines: ${bad})`);
console.log(`  teams: ${teams.length}  league mean OVR: ${leagueMeanOvr.toFixed(2)}  league SD OVR: ${leagueSdOvr.toFixed(2)}`);
console.log(`  Var(team mean OVR): ${varTeamMean.toFixed(4)}  -> Var(z_team): ${varZteam.toFixed(6)}`);
console.log(`  nflverse points SD (P-344, VERIFIED): ${POINTS_SD}  Var(points): ${pointsVar}`);
console.log('');
console.log('variance matching: Var(points) = beta^2 * Var(z_team) + Var(eps)');
console.log(`  largest beta consistent with data (eps=0): ${betaMax.toFixed(4)}`);
console.log(`  even with eps=0, beta in [0, ${betaMax.toFixed(4)}] all fit -> beta not pinned, let alone lambda/theta`);
console.log('');
console.log('non-identifiability demonstration (same beta => same observable):');
for (const p of pairs) {
  const beta = p.lambda * p.theta;
  const predVar = beta ** 2 * varZteam;
  console.log(`  lambda=${p.lambda.toFixed(2)}  theta=${p.theta.toFixed(4)}  beta=lambda*theta=${beta.toFixed(4)}  predicted Var(points): ${predVar.toFixed(4)}  (of 100)`);
}
console.log('');
console.log('DS D4 band (theta frozen at 1 => beta mistaken for lambda):');
for (const theta of [1.0, 0.9, 0.8, 0.7, 0.6, 0.57, 0.5]) {
  const impliedLambdaIfFrozen = betaMax;                 // what you report as lambda when theta=1 assumed
  const trueLambda = betaMax * theta;                    // true lambda for that theta
  const overstatement = (impliedLambdaIfFrozen / trueLambda - 1) * 100;
  console.log(`  theta=${theta.toFixed(2)}  reported lambda=${impliedLambdaIfFrozen.toFixed(3)}  true lambda=${trueLambda.toFixed(3)}  overstatement: ${overstatement.toFixed(1)}%`);
}
console.log('');
console.log('conclusion:');
console.log('  OVR-only data + nflverse team aggregates identify at most beta=lambda*theta (and only');
console.log('  up to the unknown noise variance). lambda and theta are NOT separately identified.');
console.log('  DS D4: freezing theta=1 and attributing all spread to lambda overstates lambda by');
console.log('  23-75% exactly when theta in [0.57, 0.81].');
console.log('  What WOULD identify lambda: historical Madden ratings joined to per-play outcomes');
console.log('  (nflverse PBP has passer/rusher/receiver ids + outcomes; join to Madden OVR by name');
console.log('  across multiple seasons). Owner (design-13d): "none, and not needed" -> out of scope.');
console.log('  Recommendation: freeze theta (DS D3), treat lambda as an Owner-visible dial,');
console.log('  validate it only via held-out totals-bar / margin-shape predictions.');
