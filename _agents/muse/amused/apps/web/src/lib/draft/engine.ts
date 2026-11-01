// Draft engine for amused v1 — framework-free state machine.
// Snake draft, 32 teams, N rounds. The user's team picks manually;
// the other 31 auto-pick by BPA tilted toward positional need.
// A real RNG seed makes the draft reproducible; the auto heuristic is
// deliberately simple (v1) — the engine-core SportSpec will drive v2.
import { PLAYERS, type Player } from './players-data.ts';
import { makeRng, type Rng } from '../../../../../packages/engine-core/src/rng.ts';

export type Pick = {
  overall: number;
  round: number;
  team: string;
  player: Player;
  userPick: boolean;
};

export const ROUNDS = 12;
const TEAMS32 = [
  'Arizona Cardinals','Atlanta Falcons','Baltimore Ravens','Buffalo Bills',
  'Carolina Panthers','Chicago Bears','Cincinnati Bengals','Cleveland Browns',
  'Dallas Cowboys','Denver Broncos','Detroit Lions','Green Bay Packers',
  'Houston Texans','Indianapolis Colts','Jacksonville Jaguars','Kansas City Chiefs',
  'Las Vegas Raiders','Los Angeles Chargers','Los Angeles Rams','Miami Dolphins',
  'Minnesota Vikings','New England Patriots','New Orleans Saints','New York Giants',
  'New York Jets','Philadelphia Eagles','Pittsburgh Steelers','San Francisco 49ers',
  'Seattle Seahawks','Tampa Bay Buccaneers','Tennessee Titans','Washington Commanders',
];

// Positional need: counts per team; the auto-picker favors the emptiest slot.
const NEED_ORDER = ['QB','RB','WR','TE','OT','OG','C','DE','DT','LB','CB','S','K'];

function needOf(roster: Player[]): string {
  const counts: Record<string, number> = {};
  for (const p of roster) counts[p.pos] = (counts[p.pos] || 0) + 1;
  let best = NEED_ORDER[0], bestN = Infinity;
  for (const pos of NEED_ORDER) {
    const n = counts[pos] || 0;
    if (n < bestN) { bestN = n; best = pos; }
  }
  return best;
}

export class Draft {
  readonly userTeam: string;
  readonly order: string[];          // snake pick order, team per overall pick
  picks: Pick[] = [];
  private pool: Player[];
  private rosters = new Map<string, Player[]>();
  private rng: Rng;
  private cursor = 0;

  constructor(userTeam: string, seed = 20261101) {
    this.userTeam = userTeam;
    this.rng = makeRng(seed);
    // Shuffle team order once for the snake (seeded)
    const shuffled = [...TEAMS32];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng.next() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.order = [];
    for (let r = 0; r < ROUNDS; r++) {
      const seq = r % 2 === 0 ? shuffled : [...shuffled].reverse();
      this.order.push(...seq);
    }
    this.pool = [...PLAYERS];
    for (const t of TEAMS32) this.rosters.set(t, []);
  }

  get done(): boolean { return this.cursor >= this.order.length; }
  get currentTeam(): string { return this.order[this.cursor]; }
  get isUserTurn(): boolean { return !this.done && this.currentTeam === this.userTeam; }
  get round(): number { return Math.floor(this.cursor / 32) + 1; }

  /** Available players, optionally filtered by position, top-first. */
  available(pos?: string, limit = 60): Player[] {
    const out: Player[] = [];
    for (const p of this.pool) {
      if (pos && p.pos !== pos) continue;
      out.push(p);
      if (out.length >= limit) break;
    }
    return out;
  }

  /** The user drafts a player (must be their turn and the player available). */
  userPick(player: Player): Pick | null {
    if (!this.isUserTurn) return null;
    const i = this.pool.indexOf(player);
    if (i < 0) return null;
    return this.commit(player, true);
  }

  /** Advance all auto picks until it's the user's turn or the draft ends. */
  autoAdvance(): Pick[] {
    const made: Pick[] = [];
    while (!this.done && !this.isUserTurn) {
      made.push(this.autoPick());
    }
    return made;
  }

  private autoPick(): Pick {
    const team = this.currentTeam;
    const roster = this.rosters.get(team)!;
    const need = needOf(roster);
    // BPA at need, with a little seeded jitter so teams diverge
    const cands = this.pool.filter((p) => p.pos === need).slice(0, 5);
    const pool2 = cands.length ? cands : this.pool.slice(0, 5);
    const player = pool2[Math.floor(this.rng.next() * pool2.length)];
    return this.commit(player, false);
  }

  private commit(player: Player, userPick: boolean): Pick {
    const i = this.pool.indexOf(player);
    this.pool.splice(i, 1);
    const team = this.order[this.cursor];
    this.rosters.get(team)!.push(player);
    const pick: Pick = {
      overall: this.cursor + 1,
      round: Math.floor(this.cursor / 32) + 1,
      team, player, userPick,
    };
    this.picks.push(pick);
    this.cursor++;
    return pick;
  }

  rosterOf(team: string): Player[] { return this.rosters.get(team) ?? []; }

  /** All rosters, for saving. */
  allRosters(): Map<string, Player[]> { return new Map(this.rosters); }
}
