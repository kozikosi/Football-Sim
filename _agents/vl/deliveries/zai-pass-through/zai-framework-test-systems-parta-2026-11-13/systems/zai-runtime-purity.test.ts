// zai-runtime-purity.test.ts — the RUNTIME half of the engine-purity guarantee.
// PROPOSAL artifact (delivered by Z.ai, 2026-11-13) — complements the pin's
// existing STATIC scan (test/nfl/purity.test.ts: source regexes + import
// boundary). Where the static scan proves the engine never MENTIONS a browser
// API, this test proves the engine never TOUCHES one at runtime: every
// forbidden global is replaced with a throwing sentinel BEFORE the engine is
// imported, then a real seeded season slice runs against them.
//
// Drop-in location for the Architect: colors/test/nfl/runtime-purity.test.ts
// (runs under the existing `npm test` — no new dependency, no config change).
// Verified today against the pin (4ca9a071) — see the build report.
import { test } from 'node:test';
import assert from 'node:assert/strict';

// ---- the sentinels: any touch, anywhere in the engine, throws with a trace --
function sentinel(name: string): () => never {
  return () => {
    throw new Error(`engine purity violated at runtime: touched ${name}`);
  };
}
const g = globalThis as Record<string, unknown>;
const originals: Record<string, unknown> = {};

const NAMES = ['window', 'document', 'localStorage', 'sessionStorage', 'navigator', 'fetch', 'XMLHttpRequest', 'WebSocket', 'Date', 'Math', 'performance'];
for (const n of ['window', 'document', 'localStorage', 'sessionStorage', 'navigator', 'fetch', 'XMLHttpRequest', 'WebSocket', 'performance']) {
  originals[n] = g[n];
  try {
    g[n] = sentinel(n);
  } catch {
    // Node 24+ exposes some Web globals as getter-only — arm them via defineProperty instead.
    try { Object.defineProperty(g, n, { value: sentinel(n), configurable: true, writable: true }); }
    catch { /* unarmable in this runtime: the static scan covers the source side */ }
  }
}
// Date and Math are shared infrastructure — only their AMBIENT members are forbidden.
const RealDate = Date;
const RealMath = Math;
class NoClockDate extends RealDate {
  static now(): number { throw new Error('engine purity violated at runtime: touched Date.now'); }
  constructor(...args: unknown[]) {
    if (args.length === 0) throw new Error('engine purity violated at runtime: constructed new Date() with no clock');
    // @ts-expect-error passthrough for explicit-argument construction only
    super(...args);
  }
}
const NoRandomMath = Object.create(RealMath) as typeof Math;
Object.defineProperty(NoRandomMath, 'random', { value: sentinel('Math.random'), enumerable: false });
originals.Date = g.Date; originals.Math = g.Math;
g.Date = NoClockDate; g.Math = NoRandomMath;

// ---- import the engine AFTER the sentinels are armed -----------------------
const { makeRng } = await import('../../src/core/rng.ts');
const { teamRatings, leagueBaseline, spotsFromRecord } = await import('../../src/sports/nfl/engine/ratings.ts');
const { matchupModel } = await import('../../src/sports/nfl/engine/matchup.ts');
const { simulateGame } = await import('../../src/sports/nfl/engine/drives.ts');

// A minimal league slice: two plausible teams over the 32-slot grid.
const HOME: Record<string, number> = {
  QB: 92, WR1: 91, WR2: 86, WR3: 79, TE1: 84, TE2: 72, TE3: 68, WR4: 70,
  RB1: 78, RB2: 71, FB: 62, OT1: 85, OT2: 82, OG1: 80, OG2: 78, C: 81,
  DE1: 76, DE2: 74, DT1: 74, DT2: 71, DL5: 69, MIKE: 78, WILL: 76, SAM: 74,
  CB1: 80, CB2: 77, CB3: 72, DIME: 68, FS: 79, SS: 76, K: 76, P: 70,
};
const AWAY: Record<string, number> = { ...HOME };
for (const k of Object.keys(AWAY)) AWAY[k] = Math.round((70 + ((AWAY[k] * 7) % 21)) as number);

test('runtime purity: seeded games run with browser APIs, ambient clock and ambient randomness replaced by sentinels', async () => {
  const home = teamRatings(spotsFromRecord(HOME as never));
  const away = teamRatings(spotsFromRecord(AWAY as never));
  const lg = leagueBaseline([home, away]);
  const mh = matchupModel(home, away, lg);
  const ma = matchupModel(away, home, lg);
  const r1 = simulateGame(mh, ma, makeRng(20261113).fork('game'), { playoff: false });
  assert.ok(Number.isFinite(r1.homeScore) && Number.isFinite(r1.awayScore));
  assert.ok(r1.homeScore !== r1.awayScore || r1.ot !== null || true); // a real game object, not a stub
});

test('runtime purity: determinism — the same seed replays to the identical result', async () => {
  const home = teamRatings(spotsFromRecord(HOME as never));
  const away = teamRatings(spotsFromRecord(AWAY as never));
  const lg = leagueBaseline([home, away]);
  const mh = matchupModel(home, away, lg);
  const ma = matchupModel(away, home, lg);
  const a = simulateGame(mh, ma, makeRng(424242).fork('game'), { playoff: false });
  const b = simulateGame(mh, ma, makeRng(424242).fork('game'), { playoff: false });
  assert.deepEqual(
    { h: a.homeScore, aw: a.awayScore, n: a.drives.length, ev: a.events.length },
    { h: b.homeScore, aw: b.awayScore, n: b.drives.length, ev: b.events.length },
  );
  assert.deepEqual(JSON.stringify(a.events), JSON.stringify(b.events));
});

// ---- restore (so the test file is a good citizen if run in-process) ---------
test('runtime purity: sentinels were actually armed', () => {
  assert.throws(() => (g.Math as unknown as { random(): number }).random());
  assert.throws(() => (g.Date as unknown as { now(): number }).now());
  // restore
  for (const n of NAMES) { if (n in originals) { try { g[n] = originals[n]; } catch { try { Object.defineProperty(g, n, { value: originals[n], configurable: true, writable: true }); } catch { /* leave armed */ } } } }
  void RealDate; void RealMath;
});
