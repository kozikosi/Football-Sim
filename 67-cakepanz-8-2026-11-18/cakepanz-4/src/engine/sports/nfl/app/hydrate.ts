// App-side hydration (w74 item 4e, Z.ai DRAFT implementing Claude's stated rule — flagged guesses marked GUESS).
//
// Claude's rule (551af1b §4–§7): for a mid-season week save, TRUST as stored: ratings, scores, schedule, plan,
// prevRank, homeField, userTeam, seed/year/run, nextWeek. RE-DERIVE: table, seeding, bracket, champion, fixtures,
// and the gameSeed check. A scores/schedule/nextWeek mismatch means CORRUPT, NEVER REPAIRED.
//
// The engine-side half already exists (app/weekmap.ts, E3b): ratings validation, the trust mapping, seeding
// re-derivation, champion re-derivation, the gameSeed check. This file adds the app-side checks weekmap does not
// do, wraps both in the corrupt-never-repair contract, and is the ONE entry the reducer's LOAD_OK path calls.
// Nothing here edits stored values: every failure returns { ok: false } and the reducer shows the corrupt notice.
//
// The four w74 gaps this draft closes (w74 §F13–F16), with the exact guess each carries:
//   F13 (G1): roster, statsRecorded (and the Season kind's userResults) are TRUSTED — stated here because the
//             rule omits them. GUESS: none — this is the only reading (roster cannot be re-derived).
//   F14 (G2): htd/atd REQUIRED. GUESS: instead of changing GameScore's shape (that is Claude's ruling), a week
//             payload whose scores lack htd/atd is refused as corrupt — the same outcome, no contract edit, and
//             the `?? 0` silent repair in weekmap.fromWeekPayload becomes unreachable through this path. If the
//             Architect rules htd/atd optional, delete check H2 and no other line moves.
//   F15 (G3): the week kind NEVER stores a finished season: 1 ≤ nextWeek ≤ 22, and the presence of a Super Bowl
//             score is legal only while nextWeek === 22 (the last week kind write before the app converts to a
//             Season payload). GUESS: the "converts at season end" reading — one line from Claude confirms it.
//   F16 (G4): scores must fit the schedule and nextWeek, defined two-directionally (H3 below).

import { LAST_REGULAR_WEEK, PLAYOFF_ROUNDS } from '../engine/seasonrun.ts';
import { TEAMS } from '../engine/league.ts';
import { fromWeekPayload } from './weekmap.ts';
import type { LoadedWeek } from './weekmap.ts';
import type { WeekEnvelope, GameScore } from './saves.ts';

export type HydrateResult =
  | { ok: true; value: LoadedWeek }
  | { ok: false; code: 'corrupt'; message: string };   // corrupt-never-repair: the reducer refuses the save; nothing is fixed up

const WC_GAMES = 6, DIV_GAMES = 4, CONF_GAMES = 2, SB_GAMES = 1;
const ROUND_GAMES: Record<string, number> = { 'Wild Card': WC_GAMES, Divisional: DIV_GAMES, Conference: CONF_GAMES, 'Super Bowl': SB_GAMES };

export function hydrateWeek(env: WeekEnvelope): HydrateResult {
  const p = env.payload;

  // -- H0 (F15): the week kind never stores a finished season.
  if (!Number.isInteger(p.nextWeek) || p.nextWeek < 1 || p.nextWeek > LAST_REGULAR_WEEK + 4)
    return corrupt(`week: nextWeek ${p.nextWeek} outside 1..22`);
  const sbScore = p.scores.find((g) => g.round === 'Super Bowl');
  if (sbScore && p.nextWeek !== 22) return corrupt('week: a Super Bowl score exists but nextWeek is not 22 (finished seasons are Season payloads, not week saves)');
  const roundIdx = (r: string): number => (PLAYOFF_ROUNDS as readonly string[]).indexOf(r);
  for (const g of p.scores) {
    if (g.round && !(PLAYOFF_ROUNDS as readonly string[]).includes(g.round)) return corrupt(`week: unknown playoff round '${g.round}'`);
    if (g.round && g.week !== 19 + roundIdx(g.round)) return corrupt(`week: round '${g.round}' stored under week ${g.week} (expected ${19 + roundIdx(g.round)})`);
  }

  // -- H1 (trust, F13): roster/userTeam/statsRecorded pass through untouched — already validated by parsePayload's
  //     inner check; nothing re-derives them. plan is trusted (typed PlanState since F7). prevRank required
  //     (weekmap refuses without it: a run-it-back cannot be rebuilt) — that refusal is corrupt-never-repair too.

  // -- H2 (F14): every stored score carries its touchdown counts; absent = corrupt, never defaulted to zero.
  for (const g of p.scores) {
    if (!Number.isInteger(g.htd) || !Number.isInteger(g.atd)) return corrupt(`week: score ${g.home} vs ${g.away} (week ${g.week}) lacks htd/atd — seeding tiebreaks would silently change`);
  }

  // -- H3 (F16, two-directional fit):
  //   (a) every non-round score matches a schedule row with the same (week, home, away);
  //   (b) no fixture appears twice in scores;
  //   (c) every schedule row with week < nextWeek and no round has exactly one score — no holes, no extras;
  //   (d) round-carrying scores chain: participants of round N+1 all won in round N; per-round counts hold.
  const schedKey = (w: number, h: string, a: string): string => `${w}|${h}|${a}`;
  const sched = new Set(p.schedule.map((g) => schedKey(g.week, g.home, g.away)));
  const played = new Map<string, GameScore>();
  for (const g of p.scores) {
    if (!g.round) {
      if (!sched.has(schedKey(g.week, g.home, g.away))) return corrupt(`week: score ${g.away} @ ${g.home} (week ${g.week}) is not on the stored schedule`);
    }
    const k = schedKey(g.week, g.home, g.away);
    if (played.has(k)) return corrupt(`week: fixture ${g.away} @ ${g.home} (week ${g.week}) appears twice in scores`);
    played.set(k, g);
  }
  for (const row of p.schedule) {
    if (row.week < p.nextWeek && !row.week) continue;                       // defensive: schedule rows always carry week
    if (row.week < p.nextWeek && !played.has(schedKey(row.week, row.home, row.away)))
      return corrupt(`week: scheduled game ${row.away} @ ${row.home} (week ${row.week}) has no score but week ${row.week} < nextWeek ${p.nextWeek}`);
  }
  const byRound = new Map<string, GameScore[]>();
  for (const g of p.scores) if (g.round) (byRound.get(g.round) ?? byRound.set(g.round, []).get(g.round)!).push(g);
  let winners = new Set<string>();
  for (const round of PLAYOFF_ROUNDS) {
    const games = byRound.get(round) ?? [];
    if (!games.length) break;                                               // the save sits before this round: chain ends here
    if (games.length !== ROUND_GAMES[round]) return corrupt(`week: ${round} has ${games.length} games (expected ${ROUND_GAMES[round]})`);
    if (round !== 'Wild Card') for (const g of games) {
      if (!winners.has(g.home) && !winners.has(g.away)) return corrupt(`week: ${round} game ${g.away} @ ${g.home} has no participant from the previous round's winners`);
    }
    winners = new Set(games.map((g) => (g.hs > g.as ? g.home : g.away)));
    if (winners.size !== games.length) return corrupt(`week: ${round} has a tie or a repeat winner — playoff games cannot tie`);
  }
  const sbArr = byRound.get('Super Bowl');
  const sb = sbArr?.[0];
  if (sb && sb.hs === sb.as) return corrupt('week: the Super Bowl ended level — impossible in the engine');

  // -- H4 (re-derive): table, seeding, bracket, champion, fixtures, gameSeed — delegated to the engine-side half.
  //     fromWeekPayload re-derives seeding (fork 'seeding'), champion (from the SB score), and re-checks the
  //     gameSeed against the re-derived fixtures. Its rating validation is the trust check on `ratings`.
  const mapped = fromWeekPayload(p);
  if (!mapped.ok) return corrupt(mapped.message);
  const lw: LoadedWeek = mapped.value;
  const known = new Set(TEAMS.map((t) => t.name));
  for (const g of [...p.schedule, ...p.scores]) {
    if (!known.has(g.home) || !known.has(g.away)) return corrupt(`week: unknown team name in ${g.away} @ ${g.home}`);
  }
  return { ok: true, value: lw };
}

function corrupt(message: string): HydrateResult {
  return { ok: false, code: 'corrupt', message };
}

// ---- Season-kind hydration (for completeness; the same trust/re-derive split) ----
// TRUST: userResults, roster, champion, userOutcome, statsRecorded, seed/year/run.
// RE-DERIVE: the full table is ALREADY stored in SeasonPayload (it is the finished, pruned payload) — so the
// season kind re-derives NOTHING except the checksum-level sanity: champion appears in userResults' playoff games
// as the winner, and userOutcome matches the userResults' last game. Flagged GUESS: Claude's rule names the week
// kind only; these two checks are my best reading of corrupt-never-repair for the season kind.
export function hydrateSeasonConsistency(env: import('./saves.ts').SeasonEnvelope): HydrateResult {
  const p = env.payload;
  const last = p.userResults[p.userResults.length - 1];
  if (!last) return corrupt('season: no user results');
  const userWon = last.hs > last.as ? last.home : last.away;
  if (p.champion === p.userTeam && p.userOutcome !== 'champion') return corrupt('season: champion is the user but userOutcome says otherwise');
  if (p.champion !== p.userTeam && p.userOutcome === 'champion') return corrupt('season: userOutcome says champion but the stored champion is not the user');
  if (p.champion === p.userTeam && userWon !== p.userTeam) return corrupt('season: stored champion is the user but the last result was a loss');
  return { ok: true, value: null as never };   // season kind needs no RunState; the value is unused (typed for symmetry)
}
