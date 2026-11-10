// Measurement harness (not a test): margin distribution and overtime rate of the drive generator over league-like games.
// Usage: node --experimental-strip-types tools/margins.ts [seasons=60]
import { SLOT_IDS } from '../src/sports/nfl/engine/slots.ts';
import type { SlotId } from '../src/sports/nfl/engine/slots.ts';
import { teamRatings, spotsFromRecord, leagueBaseline } from '../src/sports/nfl/engine/ratings.ts';
import { TEAMS } from '../src/sports/nfl/engine/league.ts';
import { simulateSeason } from '../src/sports/nfl/engine/season.ts';
import { makeRng } from '../src/core/rng.ts';

const N = +(process.argv[2] ?? 60);
const bins: Record<string, number> = {}, fin: Record<string, number> = {}, otm: Record<string, number> = {}; let games = 0, ot = 0, tie = 0, pts = 0, homeWins = 0, decided = 0;
for (let i = 0; i < N; i++) {
  const r = makeRng(500 + i);
  const teams = TEAMS.map((t) => { const base = 80 + 2.5 * r.normal(); const rec = Object.fromEntries(SLOT_IDS.map((s) => [s, Math.max(60, Math.min(99, base + 3 * r.normal()))])) as Record<SlotId, number>; return { name: t.name, ratings: teamRatings(spotsFromRecord(rec)) }; });
  void leagueBaseline;
  const s = simulateSeason(teams, makeRng(i), { year: 2026 });
  for (const g of s.games) {
    const x = g.result; games++; pts += x.homeScore + x.awayScore;
    if (x.ot) { ot++; if (x.ot.tie) tie++; }
    const m = Math.abs(x.regHome - x.regAway); const k = m === 0 ? '0(reg tie)' : m <= 10 ? String(m) : m <= 14 ? '11-14' : '15+';
    bins[k] = (bins[k] ?? 0) + 1;
    const fm = Math.abs(x.homeScore - x.awayScore); const fk = fm <= 10 ? String(fm) : fm <= 14 ? '11-14' : '15+';
    fin[fk] = (fin[fk] ?? 0) + 1; if (x.ot) otm[fk] = (otm[fk] ?? 0) + 1;
    if (x.homeScore !== x.awayScore) { decided++; if (x.homeScore > x.awayScore) homeWins++; }
  }
}
const pct = (n: number) => (100 * n / games).toFixed(2);
console.log('games', games, 'OT rate %', pct(ot), 'ties as % of OT games', (100 * tie / Math.max(1, ot)).toFixed(1), 'pts/team', (pts / games / 2).toFixed(2), 'home win %', (100 * homeWins / decided).toFixed(1));
console.log('bin        reg%   final%  ot-game-final(share of OT games %)');
for (const k of ['0(reg tie)', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11-14', '15+']) console.log(k.padEnd(11), pct(bins[k] ?? 0), pct(fin[k === '0(reg tie)' ? '0' : k] ?? 0), (100 * (otm[k === '0(reg tie)' ? '0' : k] ?? 0) / Math.max(1, ot)).toFixed(1));
