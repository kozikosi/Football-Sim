// The user's season outcome and the "record stats exactly once" rule (Owner, 1 Nov): stats are recorded ONCE, the moment the user's team is
// eliminated (misses the playoffs, loses in any round, or wins the title), and the slot is flagged `statsRecorded`. Abandoned runs record nothing.
// Pure: derived from the run state, so a refresh at any point gives the same answer. Storage does the write; the flag and the global stats
// change in that one write (see SeasonPayload.statsRecorded).
import { TEAM_BY_NAME } from '../engine/season.ts';
import type { Round } from '../engine/season.ts';
import type { RunState, Score } from '../engine/seasonrun.ts';

export type UserOutcome = 'missed-playoffs' | 'wild-card' | 'divisional' | 'conference' | 'super-bowl-loss' | 'champion';
export const ROUND_OUTCOME: Readonly<Record<Round, UserOutcome>> = { 'Wild Card': 'wild-card', Divisional: 'divisional', Conference: 'conference', 'Super Bowl': 'super-bowl-loss' };

const winnerOf = (g: Score): string | null => (g.hs > g.as ? g.home : g.as > g.hs ? g.away : null);

// null = the user is still alive (regular season in progress, a bye week, or a playoff run that has not ended).
export function userOutcome(s: RunState, userTeam: string): UserOutcome | null {
  const t = TEAM_BY_NAME[userTeam];
  if (!t) throw new Error('outcome: unknown team ' + userTeam);
  if (!s.seeding) return null;                                           // fixed once week 18 is played
  if (!s.seeding.seeds[t.conf].includes(userTeam)) return 'missed-playoffs';
  for (const g of s.playoffs) {
    if (g.home !== userTeam && g.away !== userTeam) continue;
    const w = winnerOf(g);
    if (w === null) continue;                                            // a playoff game is always played to a winner; a tie cannot end a run
    if (w !== userTeam) return ROUND_OUTCOME[g.round as Round];
    if (g.round === 'Super Bowl') return 'champion';
  }
  return null;
}

// The outcome to record NOW, or null: only when the user has been eliminated and nothing was recorded yet.
export function statsDue(s: RunState, userTeam: string, statsRecorded: boolean): UserOutcome | null {
  if (statsRecorded) return null;
  return userOutcome(s, userTeam);
}
