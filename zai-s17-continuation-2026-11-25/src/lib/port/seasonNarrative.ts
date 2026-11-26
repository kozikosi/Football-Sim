// port/seasonNarrative.ts — the Wave B #7 season-narrative additions (ernie B1/B2/B3, hy4 #8,
// porca N6 — one theme, the gaps that were NOT already built in the 2026-11-23 backlog):
//   1. gameBallOf(feed)  — the game-ball line for a played game, derived from the feed VM's OWN
//      drive data (the top scorer by the feed's points, ties broken by the engine's order) — a
//      pure function, no new math, no scouting: the feed already names every scoring play.
//   2. seedExplainOf(standingsRow, rows) — WHY a bracket seed is what it is, in the engine's own
//      tiebreak order (wins → division → the table's pa/verdict chain), from the same StandingsVMw
//      the Bracket renders — the bracket explains itself instead of printing bare numbers.
//
// The pace clamp (Slower/Standard/Faster + the reduced-motion information-keeping path) lives in
// port/pace.ts; the Feed's turnover naming (INT/FUM/DEF TD badges), the 2PT chips and the
// chronological scoring order were ALREADY BUILT (feedVM.ts :92-128) and are NOT rebuilt here.
import type { FeedVM } from './feedVM.ts';
import type { StandingsVMw, StandingsRowVM } from './weekVM.ts';

export interface GameBall { team: string; driveNo: number; summary: string; pts: number; line: string; why: string }

// THE GAME BALL, honestly scoped (the S17 work order §3.7 — "no invented numbers"): the drive-level
// feed VM does NOT name individual scorers (FeedScore carries team/kind/pts/conv only — the engine
// flags player-level feed data as a later slice), so the ball goes to the DRIVE OF THE GAME — the
// highest-scoring drive the feed already names, with its own one-sentence summary — plus the
// turnover tally (every INT/FUM end is already named on its drive line below). A scoreless game
// yields null — never a fake pick.
export function gameBallOf(feed: FeedVM): GameBall | null {
  const scoring = (feed.drives ?? []).filter((d) => d.pts > 0);
  if (!scoring.length) return null;
  let best = scoring[0];
  for (const d of scoring) if (d.pts > best.pts || (d.pts === best.pts && d.n < best.n)) best = d;
  const turnovers = (feed.drives ?? []).filter((d) => d.end === 'INT' || d.end === 'FUM').length;
  const tds = scoring.filter((d) => d.end === 'TD').length;
  const fgs = scoring.filter((d) => d.end === 'FG').length;
  return {
    team: best.team,
    driveNo: best.n,
    summary: best.summary,
    pts: best.pts,
    line: `drive ${best.n} · ${best.pts} pts · the game's ${tds} TD${tds === 1 ? '' : 's'} and ${fgs} FG${fgs === 1 ? '' : 's'} across ${scoring.length} scoring drives`,
    why: `the feed's own drive data — no new math · ${turnovers} turnover${turnovers === 1 ? '' : 's'} named on their drive lines`,
  };
}

// the seed explanation: the engine's chain, in its own words, from the standings the bracket
// already receives. Division winners first (the engine's table sorts them so), then the wildcards
// by wins; a tied pair names the tiebreak the table applied (pa asc — the engine's documented
// order) instead of a bare number.
export function seedExplainOf(row: StandingsRowVM, league: StandingsVMw['league'], divisionWinners: readonly string[]): string {
  const isDivWinner = divisionWinners.includes(row.team);
  const tied = league.filter((r) => r !== row && r.w === row.w && Math.abs(parseFloat(r.winPct) - parseFloat(row.winPct)) < 1e-9);
  const base = `${row.seed}. ${row.team} — ${row.w}-${row.l}-${row.t} (${row.winPct} win pct), ${isDivWinner ? 'division winner (the engine seeds division winners first)' : 'wild card'}`;
  if (!tied.length) return base;
  const betterTied = tied.filter((r) => (r.seed ?? 99) < (row.seed ?? 99));
  if (betterTied.length) {
    const t = betterTied[0];
    return `${base} · tied on wins with ${t.team} — the engine's tiebreak (points allowed, lower first) puts ${t.team} ahead (${t.pa} < ${row.pa} pa)`;
  }
  const worseTied = tied.filter((r) => (r.seed ?? 0) > (row.seed ?? 0));
  if (worseTied.length) {
    const t = worseTied[0];
    return `${base} · tied on wins with ${t.team} — the engine's tiebreak (points allowed, lower first) puts this team ahead (${row.pa} < ${t.pa} pa)`;
  }
  return base;
}
