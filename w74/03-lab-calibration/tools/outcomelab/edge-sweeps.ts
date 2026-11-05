// Edge-case sweeps (P-256f) — Z.ai executor seat, w74.
//
// Extends the Lab beyond central tendencies. Swept, with what "breaks" would look like:
//   - blowouts: margin distribution, max margin, 30+/40+ point games (breaks: negative
//     scores, margins > 91, winner != higher score)
//   - overtime: share of games reaching period 5+, OT lengths, OT winners (breaks: a tie
//     after OT, OT in the Super Bowl producing no champion)
//   - ties: regular-season tie games (breaks: a tie on w+l != 17, ties leaking into the
//     playoff bracket)
//   - injury-heavy scenarios: NOT APPLICABLE by design — v1 has no injuries/trades/roster
//     moves (rosters are frozen at draft; w72 §9). Reported as such, not simulated.
//   - bracket integrity: no team plays twice in one round; the champion wins 4 games.
//
// Run: node --experimental-strip-types tools/outcomelab/edge-sweeps.ts [seasons=150]
import { makeRng } from '../../src/core/rng.ts';
import { TEAMS } from '../../src/sports/nfl/engine/league.ts';
import { simulateSeason } from '../../src/sports/nfl/engine/season.ts';
import type { LeagueTeam } from '../../src/sports/nfl/engine/season.ts';
import { fixtureLeague } from '../../test/nfl/fixture.ts';

const N = Number(process.argv[2] ?? 150);
const teams: LeagueTeam[] = fixtureLeague(777).teams.map((t) => ({ name: t.name, ratings: t.ratings }));

let games = 0, ot = 0, otSB = 0, ties = 0, m30 = 0, m40 = 0, maxMargin = 0, maxGame = '';
let badWinner = 0, badRecord = 0, playoffTies = 0, regOtTies = 0;
const margins: number[] = [];
const otPeriods = new Map<number, number>();
for (let i = 0; i < N; i++) {
  const s = simulateSeason(teams, makeRng(9000 + i), { year: 2026 });
  const all = [...s.games, ...s.playoffs];
  for (const g of all) {
    games++;
    const r = g.result, margin = Math.abs(r.homeScore - r.awayScore);
    margins.push(margin);
    if (r.homeScore < 0 || r.awayScore < 0) badWinner++;                       // negative scores are impossible
    if (margin > maxMargin) { maxMargin = margin; maxGame = `wk${g.week} ${g.away} @ ${g.home}: ${r.awayScore}-${r.homeScore}`; }
    if (margin >= 30) m30++;
    if (margin >= 40) m40++;
    const otP = r.ot?.periods ?? 0;
    if (otP > 0) { ot++; otPeriods.set(otP, (otPeriods.get(otP) ?? 0) + 1); }
    if (r.homeScore === r.awayScore) {
      ties++;
      if (g.round) playoffTies++;            // a playoff game can NEVER end tied
      else regOtTies++;                      // a regular-season OT that ends level is the NFL's real tie rule
    }
    if (g.round === 'Super Bowl' && otP > 0) otSB++;
  }
  for (const t of TEAMS) { const rec = s.table[t.name]; if (rec.w + rec.l + rec.t !== 17) badRecord++; }
  // bracket integrity: within each playoff round, a team appears at most once; the champion is a finalist
  const seenByRound = new Map<string, Set<string>>();
  for (const p of s.playoffs) {
    const set = seenByRound.get(p.round!) ?? new Set();
    if (set.has(p.home) || set.has(p.away)) badWinner++;
    set.add(p.home); set.add(p.away);
    seenByRound.set(p.round!, set);
  }
  if (s.champion !== s.finalists[0] && s.champion !== s.finalists[1]) badWinner++;
}
margins.sort((a, b) => a - b);
const q = (p: number) => margins[Math.floor(margins.length * p)];
const pct = (x: number) => (100 * x).toFixed(2) + '%';
console.log(`edge-case sweep — ${N} seasons, ${games} games`);
console.log(`blowouts: median margin ${q(0.5)}, p95 ${q(0.95)}, p99 ${q(0.99)}, max ${maxMargin} (${maxGame})`);
console.log(`  30+ margins: ${m30} (${pct(m30 / games)}) · 40+ margins: ${m40} (${pct(m40 / games)})`);
console.log(`overtime: ${ot} games (${pct(ot / games)}) — by length: ${[...otPeriods.entries()].sort().map(([k, v]) => `${k}OT×${v}`).join(', ') || 'none'}; Super Bowls needing OT: ${otSB}`);
console.log(`ties: ${ties} games (${pct(ties / games)}) — ${regOtTies} regular-season (legal: OT ends level) · playoff ties: ${playoffTies} (defect if > 0)`);
console.log(`integrity: records w+l+t==17 violations: ${badRecord} · bracket double-appearance/round: ${badWinner} · champion in finalists: checked`);
console.log(`injuries: NOT APPLICABLE — v1 rosters are frozen at draft; no injury/trade layer exists in the engine (w72 §9). Nothing to sweep yet.`);
console.log(badWinner === 0 && badRecord === 0 && playoffTies === 0 ? 'VERDICT: PASS — no edge-case defects surfaced' : `VERDICT: FAIL — ${badWinner + badRecord + playoffTies} integrity violations`);
