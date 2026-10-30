// Overtime rules for Colors v1 (P-206)
// Regular season: 10-minute period, both possessions guaranteed unless safety on first drive
// Playoffs: both possessions, 15-minute periods, play to win
// No ties in playoffs, ties possible in regular season

import type { Rng } from './rng.ts';

export type OvertimeType = 'regular' | 'playoffs';

export interface OvertimeState {
  period: number;
  timeRemaining: number; // seconds
  possessionsUsed: number;
  bothPossessionsDone: boolean;
  ended: boolean;
  result?: 'home' | 'away' | 'tie';
}

export function initOvertime(type: OvertimeType): OvertimeState {
  const periodTime = type === 'playoffs' ? 900 : 600; // 15 min or 10 min
  return {
    period: 1,
    timeRemaining: periodTime,
    possessionsUsed: 0,
    bothPossessionsDone: false,
    ended: false,
  };
}

export function processOvertimePossession(
  state: OvertimeState,
  type: OvertimeType,
  firstTeamScoredTD: boolean,
  firstTeamScoredFG: boolean,
  result: 'TD' | 'FG' | 'PUNT' | 'TURNOVER' | 'SAFETY'
): OvertimeState {
  const newState = { ...state };
  newState.possessionsUsed++;
  
  // Safety on first possession of OT
  if (newState.possessionsUsed === 1 && result === 'SAFETY') {
    newState.ended = true;
    newState.result = 'away'; // kicking team wins
    return newState;
  }
  
  // Both possessions guaranteed
  if (newState.possessionsUsed === 2) {
    newState.bothPossessionsDone = true;
  }
  
  // After both possessions, next score wins (sudden death)
  if (newState.bothPossessionsDone) {
    if (result === 'TD') {
      newState.ended = true;
      newState.result = 'home'; // current team wins
      return newState;
    }
    if (result === 'FG') {
      // If tied after both possessions, next score wins
      // This is simplified - full logic would track scores
      newState.ended = true;
      newState.result = 'home';
      return newState;
    }
    if (result === 'SAFETY') {
      newState.ended = true;
      newState.result = 'home';
      return newState;
    }
  }
  
  // Check if time expired
  if (newState.timeRemaining <= 0) {
    newState.ended = true;
    if (type === 'playoffs') {
      // Continue to next period
      newState.period++;
      const periodTime = 900;
      newState.timeRemaining = periodTime;
      newState.possessionsUsed = 0;
      newState.bothPossessionsDone = false;
      newState.ended = false;
      return newState;
    } else {
      // Regular season - tie
      newState.result = 'tie';
      return newState;
    }
  }
  
  return newState;
}
