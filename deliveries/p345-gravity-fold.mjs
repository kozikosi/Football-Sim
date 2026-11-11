// P-345 prototype (gravity / Q4): can an event log that carries per-play assignments support a "gravity" fold?
// Synthetic micro-model, seeded (mulberry32 — PROTOTYPE RNG, not the product's keyed Philox). No engine files touched.
// 11v11 simplified to the contest that matters: 4 DBs covering {WR1, WR2, WR3, TE}; 4 DL rushing into {C, OG1, OG2, OT1, OT2}.
// Mechanism (mirrors the design's own words: defense weights re-normalised toward the offense's threat distribution):
//   coverage: each DB, independently, picks a target ~ softmax(beta * ovr) — coordinated doubles EMERGE at high concentration.
//   rush: the best rusher is doubled by the OL with probability p = clamp(0.25 + 0.05*(ovr-80), 0, 0.6).
// The fold counts, per player: plays, coverageUnits, doubles (times covered by >=2 DBs), doublesFaced (rush side).
// PROOF TARGET: inject a WR1 OVR gap and a rusher OVR and show the fold recovers them monotonically — the instrument works.
// This says nothing about REAL NFL double rates (needs charting data; see filing). It proves the *mechanism + schema* suffice.
const mulberry32 = (a) => () => {
  a |= 0; a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const softmax = (xs) => {
  const m = Math.max(...xs), e = xs.map((x) => Math.exp(x - m)), s = e.reduce((a, b) => a + b, 0);
  return e.map((x) => x / s);
};
const sample = (probs, r) => {
  let acc = 0; for (let i = 0; i < probs.length; i++) { acc += probs[i]; if (r < acc) return i; }
  return probs.length - 1;
};

const BETA = 1.2;               // coverage softmax sharpness (prototype constant, not fitted)
const PLAYS = 50, GAMES = 400, SEED = 20261111;

function simulateGame(ovr, r) {
  // ovr: {wr: [o1,o2,o3], te, ol: {C,OG1,OG2,OT1,OT2}, rusher}
  const eligibles = [...ovr.wr, ovr.te];
  const log = [];
  for (let p = 0; p < PLAYS; p++) {
    const cov = [0, 0, 0, 0];    // DBs on WR1..TE
    for (let db = 0; db < 4; db++) {
      const t = sample(softmax(eligibles.map((o) => BETA * (o / 100))), r());
      cov[t]++;
    }
    const bestRusher = ovr.rusher;
    const pDouble = Math.min(0.8, Math.max(0, 0.1 + 0.04 * (bestRusher - 80)));   // 85 -> 0.30, 90 -> 0.50, 95 -> 0.70; cap out of range
    const doubled = r() < pDouble;
    log.push({ kind: 'pass', payload: { cov, coverageDoubles: cov.map((n) => (n >= 2 ? 1 : 0)), rushDoubled: doubled } });
  }
  return log;
}

// The gravity fold: reducer over the log. One pass, per player.
function gravityFold(logs, players) {
  const agg = players.map(() => ({ plays: 0, units: 0, doubles: 0, doublesFaced: 0 }));
  for (const log of logs) for (const e of log) {
    const { cov, coverageDoubles, rushDoubled } = e.payload;
    for (let i = 0; i < 4; i++) { agg[i].plays++; agg[i].units += cov[i]; agg[i].doubles += coverageDoubles[i]; }
    agg[4].plays++; if (rushDoubled) agg[4].doublesFaced++;
  }
  return agg;
}

function runScenario(label, wr1Ovr, base, rusherOvr) {
  const r = mulberry32(SEED);
  const players = ['WR1', 'WR2', 'WR3', 'TE', 'DE1'];
  const logs = Array.from({ length: GAMES }, () =>
    simulateGame({ wr: [wr1Ovr, base, base], te: base - 5, ol: { C: base, OG1: base, OG2: base, OT1: base, OT2: base }, rusher: rusherOvr }, r));
  const agg = gravityFold(logs, players);
  const perPlay = (x) => (x / (GAMES * PLAYS)).toFixed(3);
  const g = agg.map((a, i) => (i < 4 ? perPlay(a.doubles) : perPlay(a.doublesFaced)));
  console.log(`${label}: WR1 doubles ${g[0]}/snap | WR2 ${g[1]} | WR3 ${g[2]} | TE ${g[3]} | DE1 doublesFaced ${g[4]}/snap`);
  return g;
}

console.log(`setup: ${GAMES} games x ${PLAYS} snaps, seed ${SEED}, beta ${BETA}, non-rusher base ovr 78, TE = base-5`);
console.log('-- coverage gravity rises with the injected WR1 gap (DE1 held at 92) --');
for (const gap of [0, 10, 20, 30]) runScenario(`gap +${String(gap).padStart(2)}`, 78 + gap, 78, 92);
console.log('-- rush gravity rises with the injected rusher ovr (WR1 gap 0) --');
for (const rusher of [85, 90, 95]) runScenario(`rusher ${rusher}`, 78, 78, rusher);
console.log('-- control: WR1 gap 0 must not create an advantage (within noise) --');
runScenario('control', 78, 78, 92);

// Event-log size receipt (what the schema must carry)
const r = mulberry32(SEED);
const log = simulateGame({ wr: [88, 78, 78], te: 73, ol: {}, rusher: 92 }, r);
const bytes = Buffer.byteLength(JSON.stringify(log), 'utf8');
console.log(`\nlog size: ${log.length} events, ${(bytes / 1024).toFixed(1)} KB for ${PLAYS} snaps -> ~${(bytes / PLAYS / 1024).toFixed(2)} KB/snap, ~${((bytes / 1024) * 3.4).toFixed(1)} KB/game (170 snaps)`);
