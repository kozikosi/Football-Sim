// VLC V1 — TypeScript types for Claude's engine interface
// The engine stays pure (no React imports). React talks to it via this adapter.

export type SlotKey =
  | 'QB' | 'RB1' | 'RB2' | 'WR1' | 'WR2' | 'WR3' | 'WR4'
  | 'TE1' | 'TE2' | 'OT1' | 'OT2' | 'OG1' | 'OG2' | 'C'
  | 'DE1' | 'DE2' | 'DT1' | 'DT2' | 'DL5'
  | 'MIKE' | 'WILL' | 'SAM' | 'LB4'
  | 'CB1' | 'CB2' | 'CB3' | 'CB4'
  | 'SS' | 'SS2' | 'FS' | 'FS2'
  | 'K' | 'P' | 'FB';

export type TeamId = string;

export interface Player {
  name: string;
  pos: string;
  team: TeamId;
  ovr: number;
}

export interface SlotEntry {
  slot: SlotKey;
  player: Player | null;
}

export interface TeamRatings {
  offense: number;
  defense: number;
  olRun: number;
  olPass: number;
  passRush: number;
  coverage: number;
  frontRun: number;
  qb: number;
  rb: number;
  rec: number;
}

export interface GameResult {
  homeScore: number;
  awayScore: number;
  homeTeam: TeamId;
  awayTeam: TeamId;
  plays: PlayEvent[];
  mvp: Player | null;
}

export interface PlayEvent {
  time: number;
  team: TeamId;
  play: string;
  yards: number;
  tag: 'TD' | 'FG' | 'INT' | 'FUM' | 'FF' | 'FR' | 'SCK' | null;
}

export interface RNG {
  (): number;
}

export interface EngineAPI {
  // State
  getState(): EngineState;
  setRNG(rng: RNG): void;
  // Draft
  startDraft(teamId: TeamId): void;
  draftPick(slot: SlotKey, player: Player): void;
  // Lineup
  setLineup(slotmap: Record<SlotKey, Player | null>): void;
  // Game
  simulateGame(home: TeamId, away: TeamId): GameResult;
  simulateSeason(teamId: TeamId): SeasonResult;
  // Metrics
  teamRatings(slotmap: Record<SlotKey, Player | null>): TeamRatings;
  modelWeights(): Record<SlotKey, number>;
  slotWinsPerOvr(): Record<SlotKey, number>;
  adviseLineup(roster: Player[]): LineupAdvice[];
}

export interface EngineState {
  currentWeek: number;
  seasonPhase: 'draft' | 'preseason' | 'regular' | 'playoffs' | 'superbowl' | 'offseason';
  userTeam: TeamId | null;
  rosters: Record<TeamId, Record<SlotKey, Player | null>>;
}

export interface SeasonResult {
  record: { wins: number; losses: number; ties: number };
  playoffResult: string | null;
  superbowlWon: boolean;
  games: GameResult[];
}

export interface LineupAdvice {
  slot: SlotKey;
  current: Player | null;
  suggested: Player | null;
  reason: string;
  delta: number;
}

export interface TeamColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface ThemeState {
  teamId: TeamId | null;
  colors: TeamColors | null;
  darkMode: boolean;
}
