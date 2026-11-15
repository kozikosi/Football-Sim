// Cardboard Ringers — the framework-free core.
//
// This file is SHARED and must stay byte-identical across the Vue and Svelte arms.
// It is plain TypeScript with erasable syntax only (no enums, no namespaces, no
// parameter properties), so `node` can import it directly with type stripping —
// which is what lets `scripts/ringers-probe.mjs` re-derive the truth node-side
// instead of asserting against constants.
//
// Slice: 2 teams x 3 roster slots, one match, one table.

export type SlotId = 'QB' | 'RB' | 'WR';

export interface Slot {
  id: SlotId;
  player: string;
  rating: number;
}

export interface Team {
  id: string;
  name: string;
  ink: string;
  slots: Slot[];
}

export interface SlotResult {
  teamId: string;
  teamName: string;
  slotId: SlotId;
  player: string;
  rating: number;
  yards: number;
  points: number;
  label: string;
}

export interface MatchResult {
  seed: number;
  homeId: string;
  awayId: string;
  homeScore: number;
  awayScore: number;
  winner: 'home' | 'away' | 'tie';
  rows: SlotResult[];
  log: string[];
}

export const HOME: Team = {
  id: 'cr',
  name: 'Cardboard Ringers',
  ink: '#c8a48f',
  slots: [
    { id: 'QB', player: 'Dante Ferrer', rating: 88 },
    { id: 'RB', player: 'Ovie Nkemdi', rating: 81 },
    { id: 'WR', player: 'Cyrus Bell', rating: 76 },
  ],
};

export const AWAY: Team = {
  id: 'sk',
  name: 'Styrofoam Kings',
  ink: '#8fb3c8',
  slots: [
    { id: 'QB', player: 'Ruben Vasquez', rating: 74 },
    { id: 'RB', player: 'Tobi Adeyemi', rating: 86 },
    { id: 'WR', player: 'Marek Dolny', rating: 79 },
  ],
};

export const TEAMS: Team[] = [HOME, AWAY];

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function driveLabel(yards: number): { points: number; label: string } {
  if (yards >= 100) return { points: 7, label: 'touchdown' };
  if (yards >= 60) return { points: 3, label: 'field goal' };
  return { points: 0, label: 'stopped' };
}

export function simulateMatch(seed: number): MatchResult {
  const rnd = mulberry32(seed);
  const rows: SlotResult[] = [];
  const log: string[] = [];
  let homeScore = 0;
  let awayScore = 0;

  for (const team of TEAMS) {
    for (const slot of team.slots) {
      const roll = rnd();
      const yards = Math.round(18 + (slot.rating - 60) * 1.7 + roll * 46);
      const outcome = driveLabel(yards);
      rows.push({
        teamId: team.id,
        teamName: team.name,
        slotId: slot.id,
        player: slot.player,
        rating: slot.rating,
        yards,
        points: outcome.points,
        label: outcome.label,
      });
      if (team.id === HOME.id) {
        homeScore += outcome.points;
      } else {
        awayScore += outcome.points;
      }
      log.push(
        `${team.name}, ${slot.id} ${slot.player}: ${yards} yards, ${outcome.label}` +
          (outcome.points > 0 ? ` (${outcome.points} points).` : '.')
      );
    }
  }

  const winner: MatchResult['winner'] =
    homeScore > awayScore ? 'home' : homeScore < awayScore ? 'away' : 'tie';

  return {
    seed,
    homeId: HOME.id,
    awayId: AWAY.id,
    homeScore,
    awayScore,
    winner,
    rows,
    log,
  };
}