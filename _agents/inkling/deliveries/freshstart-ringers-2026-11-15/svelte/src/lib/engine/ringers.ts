/**
 * Cardboard Ringers — framework-comparison test slice (2026-11-15, Inkling).
 * SYNTHETIC FIXTURE. Invented players and ratings for testing only.
 * Not real NFL players, not real ratings, not derived from any dataset.
 * One match = 24 plays, AUR opens, possession alternates each play.
 * Deterministic from a seeded mulberry32 stream.
 */

export type TeamId = 'AUR' | 'BRB';
export type Pos = 'QB' | 'RB' | 'WR';

export interface RingerCard {
  id: string;
  name: string;
  team: TeamId;
  pos: Pos;
  jersey: number;
  power: number; // synthetic OVR proxy, 70-99
  speed: number; // synthetic, 60-99
}

export const RINGERS_FIXTURE: readonly RingerCard[] = [
  { id: 'aur-qb', name: 'Cassian Vale', team: 'AUR', pos: 'QB', jersey: 12, power: 88, speed: 74 },
  { id: 'aur-rb', name: 'Dray Marlow', team: 'AUR', pos: 'RB', jersey: 28, power: 83, speed: 90 },
  { id: 'aur-wr', name: 'Pella Quill', team: 'AUR', pos: 'WR', jersey: 10, power: 79, speed: 93 },
  { id: 'brb-qb', name: 'Odo Reeve', team: 'BRB', pos: 'QB', jersey: 7, power: 85, speed: 70 },
  { id: 'brb-rb', name: 'Sorrel Dunn', team: 'BRB', pos: 'RB', jersey: 31, power: 86, speed: 78 },
  { id: 'brb-wr', name: 'Ivo Karst', team: 'BRB', pos: 'WR', jersey: 19, power: 74, speed: 88 },
] as const;

export const TEAM_META: Record<TeamId, { name: string; short: string }> = {
  AUR: { name: 'Aurora Aviators', short: 'AUR' },
  BRB: { name: 'Bramble Barons', short: 'BRB' },
};

export interface MatchEvent { play: number; side: TeamId; text: string }
export interface PlayerLine {
  id: string; name: string; team: TeamId; pos: Pos; ovr: number;
  touches: number; yards: number; bigPlays: number; turnovers: number;
}
export interface MatchResult {
  seed: number;
  events: MatchEvent[];
  lines: PlayerLine[];
  score: Record<TeamId, number>;
  yards: Record<TeamId, number>;
  winner: TeamId | 'DRAW';
  winnerName: string;
}

/** mulberry32 — small, fast, deterministic. Demo/test use only. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next() {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const cardOf = (id: string): RingerCard => RINGERS_FIXTURE.find((p) => p.id === id)!;
const teamCards = (team: TeamId): RingerCard[] => RINGERS_FIXTURE.filter((p) => p.team === team);

/** Weighted pick by power (seeded). */
function pickStriker(team: TeamId, rand: () => number): RingerCard {
  const cards = teamCards(team);
  const total = cards.reduce((sum, c) => sum + c.power, 0);
  let roll = rand() * total;
  for (const c of cards) {
    roll -= c.power;
    if (roll <= 0) return c;
  }
  return cards[cards.length - 1]!;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export function playMatch(seed: number): MatchResult {
  const rand = mulberry32(seed);
  const events: MatchEvent[] = [];
  const stats = new Map<string, PlayerLine>(
    RINGERS_FIXTURE.map((c) => [c.id, {
      id: c.id, name: c.name, team: c.team, pos: c.pos, ovr: c.power,
      touches: 0, yards: 0, bigPlays: 0, turnovers: 0,
    }]),
  );
  const score: Record<TeamId, number> = { AUR: 0, BRB: 0 };
  const yards: Record<TeamId, number> = { AUR: 0, BRB: 0 };
  const defenseOf = (striker: RingerCard): RingerCard =>
    cardOf(RINGERS_FIXTURE.find((p) => p.team !== striker.team && p.pos === striker.pos)!.id);

  for (let play = 1; play <= 24; play++) {
    const side: TeamId = play % 2 === 1 ? 'AUR' : 'BRB';
    const striker = pickStriker(side, rand);
    const defender = defenseOf(striker);
    const turnedOver = rand() < 0.075 + Math.max(0, defender.power - striker.power) * 0.004;

    const line = stats.get(striker.id)!;
    line.touches += 1;

    if (turnedOver) {
      line.turnovers += 1;
      events.push({ play, side, text: `${TEAM_META[side].name} — ${striker.name} turns it over (matched by ${defender.name}).` });
      continue;
    }

    const gain = clamp(Math.round(2 + Math.pow(rand(), 1.35) * 66 + (striker.power - defender.power) * 1.1), 0, 99);
    line.yards += gain;
    if (gain >= 45) line.bigPlays += 1;
    yards[side] += gain;

    if (gain >= 58) {
      score[side] += 7;
      events.push({ play, side, text: `${TEAM_META[side].name} — ${striker.name} goes the distance: TD, 7 points. (${gain} yards)` });
    } else if (gain >= 33) {
      score[side] += 3;
      events.push({ play, side, text: `${TEAM_META[side].name} — ${striker.name} drives it through: 3 points. (${gain} yards)` });
    } else {
      events.push({ play, side, text: `${TEAM_META[side].name} — ${striker.name} for ${gain} yards.` });
    }
  }

  const winner: TeamId | 'DRAW' = score.AUR === score.BRB
    ? (yards.AUR === yards.BRB ? 'DRAW' : yards.AUR > yards.BRB ? 'AUR' : 'BRB')
    : score.AUR > score.BRB ? 'AUR' : 'BRB';

  return {
    seed,
    events,
    lines: [...stats.values()],
    score,
    yards,
    winner,
    winnerName: winner === 'DRAW' ? 'Draw' : TEAM_META[winner].name,
  };
}
