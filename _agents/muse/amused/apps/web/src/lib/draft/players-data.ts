// 1,941-player Madden 27 pool, pinned from data/nfl/madden27-ratings.csv (2026-11-01).
// Sorted by ovr desc. Split into players-{1,2}.ts for transport. Framework-free.
import { PLAYERS_1 } from './players-1.ts';
import { PLAYERS_2 } from './players-2.ts';

export type Player = { name: string; pos: string; team: string; ovr: number };
export const PLAYERS: Player[] = [...PLAYERS_1, ...PLAYERS_2];
