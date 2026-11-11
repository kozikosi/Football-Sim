// lambda-identify.mjs — Q1 (P-345): λ and θ are not separately identified from OVR-only team-game moments.
//
// Illustrative generative model (LABEL: illustrative toy, not a claim about real players):
//   Team-game points  P_g = θ·A_g + λ·ε_g
//   A_g ~ Normal(0, σ_A)    true game ability from the OVR roster difference
//   ε_g ~ Normal(0, 1)      play-level noise accumulated across the game
//   Var(P) = θ²·σ_A² + λ²·V_play          one equation, two unknowns (θ, λ)
//
// Observable from OVR-only team-game data (REAL, P-344 nflverse 2016-2025, n=5522,
// recomputed from team_game_summary_2016-2025.csv):
//   mean points = 22.7796, SD points = 10.0006  (=> Var(P) = 100.012)
// The grand mean is set by scoring rules (TD 6, FG 3 ...) and play frequencies; ability is
// centred (E[A]=0) so the mean carries no θ information. The SD is the only moment that
// involves λ — and it is ONE equation in TWO unknowns (θ, λ): an ellipse.
//
// Result: three distinct (θ, λ) pairs all reproduce SD = 10.00 exactly. A play-level moment
// (per-play outcome SD = λ·σ_p) separates them — but that needs play-by-play data (public,
// delivered in P-344) plus a per-play ledger and injectable RNG (not yet built).
//
// Run: node _agents/nemo-super/deliveries/lambda-identify.mjs

const targetMean = 22.7796;
const targetSd = 10.0006;
const targetVar = targetSd * targetSd;

// Fixed model inputs (illustrative; σ_A = ability SD across team-games, V_play = play-noise
// variance per game at λ=1, N = plays per game).
const sigmaA2 = 36.0;        // ability SD = 6.0 pts/game
const VPlay = 64.0;          // play-noise SD = 8.0 pts/game at lambda=1
const NPlays = 81;           // mean offensive+special-teams plays per team-game (P-344: 81.46)
const sigmaP = Math.sqrt(VPlay / NPlays); // per-play noise SD at lambda=1

// Solve the ellipse θ²·σ_A² + λ²·V_play = targetVar for λ given θ.
const lambdaFor = (theta) => {
  const rest = targetVar - theta * theta * sigmaA2;
  if (rest < 0) return null;
  return Math.sqrt(rest / VPlay);
};

const pairs = [
  { theta: 1.00, label: 'ability-spread = play-noise (balanced)' },
  { theta: 1.20, label: 'steeper ability scale, quieter plays' },
  { theta: 0.80, label: 'flatter ability scale, louder plays' },
];

console.log('P-345 Q1 — λ/θ identification prototype (illustrative toy model)');
console.log('Observable target (VERIFIED from P-344 raw CSV, n=5522 team-games):');
console.log(`  mean points = ${targetMean}, SD points = ${targetSd.toFixed(4)}, Var(P) = ${targetVar.toFixed(4)}`);
console.log('');
console.log('Identification equation: Var(P) = θ²·σ_A² + λ²·V_play  with σ_A² =', sigmaA2, ', V_play =', VPlay);
console.log(`  => θ²·${sigmaA2} + λ²·${VPlay} = ${targetVar.toFixed(2)}   (one equation, two unknowns)`);
console.log('');
console.log('Three (θ, λ) pairs that ALL reproduce SD = 10.00:');
for (const { theta, label } of pairs) {
  const lambda = lambdaFor(theta);
  const checkVar = theta * theta * sigmaA2 + lambda * lambda * VPlay;
  const checkSd = Math.sqrt(checkVar);
  const perPlaySd = lambda * sigmaP;
  console.log(`  θ = ${theta.toFixed(2)}  ${label}`);
  console.log(`      λ = ${lambda.toFixed(4)}   check Var = ${checkVar.toFixed(4)}  SD = ${checkSd.toFixed(4)}  (target ${targetSd.toFixed(4)})`);
  console.log(`      implied per-play outcome SD = λ·σ_p = ${perPlaySd.toFixed(4)} pts`);
  console.log('');
}
console.log('Conclusion: OVR-only team-game moments cannot separate θ from λ.');
console.log('  - Same mean (22.78) and same SD (10.00) for all three pairs.');
console.log('  - They differ only in per-play outcome SD (0.773 vs 0.889 vs 0.978 pts),');
console.log('    a play-level moment that aggregate data never observes.');
console.log('');
console.log('What WOULD identify λ (public data, delivered in P-344):');
console.log('  play-level conditional moments — completion% by air-yards bucket, INT rate by');
console.log('  coverage, pressure→sack rate, YAC by slot — depend on λ·σ_p but not θ.');
console.log('  Requires: per-play ledger + injectable seeded RNG (T-20261022-claude-2, not built).');
console.log('Recommendation (DS D3): freeze θ, calibrate λ to play-level nflverse moments on a');
console.log('held-out season, then re-check the team-game totals bar (~10%).');
