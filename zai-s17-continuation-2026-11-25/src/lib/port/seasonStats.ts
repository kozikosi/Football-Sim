// port/seasonStats.ts — the season statistics accumulator: as the stepper plays weeks, every game's
// box score (the engine's buildBoxScore) is folded into the engine's SeasonStats (awards.ts). The
// awards and the stats table read THIS accumulation — the engine's own addBox is the only writer.
import { newSeasonStats, addBox, buildBoxScore, blankStats } from './seam.ts';
import type { SeasonStats, GameResult, BoxScore, PlayerLine, Player } from './seam.ts';
import { teamRatingsOf } from './feedVM.ts';

export interface PlayedGame { home: string; away: string; round: string | null; result: GameResult }

/** The engine's GameSide for a roster (lineup + returner via the engine's own pick). */
function sideOf(team: string, roster: Player[]): { team: string; lineup: import('./seam.ts').Lineup; returnerId?: string | null } {
  const { lineup } = teamRatingsOf(roster);
  const ret = lineup.placements.map((p) => p.player).find(Boolean);
  return { team, lineup, returnerId: ret?.id ?? null };
}

export class SeasonStatsAccumulator {
  ss: SeasonStats = newSeasonStats();
  boxes: BoxScore[] = [];

  /** Fold one played week's games (rosters indexed by TEAMS order). */
  addWeek(games: PlayedGame[], rosters: Player[][]): void {
    for (const g of games) {
      const hi = teamIndexOf(g.home), ai = teamIndexOf(g.away);
      if (hi < 0 || ai < 0) continue;
      const box = buildBoxScore(g.result, sideOf(g.home, rosters[hi] ?? []), sideOf(g.away, rosters[ai] ?? []), makeRngFork());
      this.boxes.push(box);
      addBox(this.ss, box);
    }
  }
}

import { makeRng } from './seam.ts';
let forkCounter = 0;
const makeRngFork = () => makeRng(0x5ea7 + forkCounter++).fork('boxscore');

import { TEAMS } from './seam.ts';
const teamIndexOf = (name: string): number => TEAMS.findIndex((t) => t.name === name);

export const blankLine = (): PlayerLine['stats'] => blankStats();
