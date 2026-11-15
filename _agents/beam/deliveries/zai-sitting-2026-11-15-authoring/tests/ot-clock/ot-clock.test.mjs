/* ot-clock.test.mjs — item 7(i): the feed.ts clock() OT defect (l.59-60).
 * The engine's clock() clamps to Q1–Q4: `const q = Math.min(4, Math.max(1, Math.ceil(secs / 900)))`
 * — overtime drives render as "Q4". The app's own FeedPanel routes around it
 * (`d.period >= 5 ? OT${d.period - 4} : clockOf(d.clock)`), but gameFeed's OWN DriveEvent.clock
 * still claims Q4 in overtime. This test asserts the DESIRED behaviour (an OT drive's clock names
 * overtime): it is EXPECTED TO FAIL on pin d3bd81d2 — that failure IS the defect receipt. Flip the
 * expectation to a plain assert when the Architect's fix lands at the next re-pin.
 * Run: node --experimental-strip-types tests/ot-clock/ot-clock.test.mjs <arm root>
 */
import { readFileSync } from 'node:fs';
const root = (process.argv[2] ?? new URL('../../..', import.meta.url).pathname).replace(/\/$/, '');
const b = 'file://' + root;
const ratings = readFileSync(root + '/src/data/madden27-ratings.csv', 'utf8');
const fa = readFileSync(root + '/src/data/free-agents-old-ratings.csv', 'utf8');
const ids = readFileSync(root + '/src/data/player-ids.csv', 'utf8');
const FIX = JSON.parse(readFileSync(root + '/src/fixture.json', 'utf8'));
const { buildPool } = await import(b + '/src/engine/sports/nfl/engine/players.ts');
const { makeRng } = await import(b + '/src/engine/core/rng.ts');
const { leagueTeams, runSeason } = await import(b + '/src/lib/seasonVM.ts');
const { gameFeed } = await import(b + '/src/engine/sports/nfl/app/feed.ts');
const { TEAMS } = await import(b + '/src/engine/sports/nfl/engine/league.ts');

const pool = buildPool(ratings, fa, ids);
// scan seasons until a game reaches overtime (playoff games: the engine's own OT rules)
let found = null;
for (let year = 2027; year < 2130 && !found; year++) {
  const s = runSeason(pool, FIX.picks, year, year);
  for (const g of [...s.playoffs, ...s.games]) {
    if (g.result.ot) { found = { game: g, year }; break; }
  }
}
if (!found) { console.log('OT-CLOCK TEST INCONCLUSIVE: no overtime game found in 103 seasons'); process.exit(2); }
const { game, year } = found;
const feed = gameFeed(game.result, game.home, game.away);
const otDrives = feed.drives.filter((d) => d.period >= 5);
const badClocks = otDrives.filter((d) => /^Q[1-4] /.test(d.clock));
console.log(`season ${year}: ${game.home} @ ${game.away} · OT periods ${game.result.ot.periods} · OT drives ${otDrives.length}`);
console.log('OT drive clocks as the ENGINE renders them:', otDrives.map((d) => `p${d.period}:${d.clock}`).join(' · '));
if (otDrives.length === 0) { console.log('OT-CLOCK TEST INCONCLUSIVE: OT game found but no period>=5 drives'); process.exit(2); }
if (badClocks.length > 0) {
  console.log(`DEFECT CONFIRMED at pin d3bd81d2 (feed.ts l.59-60): ${badClocks.length}/${otDrives.length} overtime drive(s) render a REGULATION clock (expected Q5+/OT) — verbatim: ${badClocks.slice(0, 3).map((d) => d.clock).join(', ')}`);
  console.log('OT-CLOCK: FAIL (the desired behaviour is not met) — this failure is the defect receipt; verify the fix at the next re-pin.');
  process.exit(1);
}
console.log('OT-CLOCK: PASS — overtime drives render overtime clocks; the pin has moved, clear filings/OT-clock-fix-PENDING.txt.');
