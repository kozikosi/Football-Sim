// VLC V1 — Engine entry point
// Composes all engine modules. Exposes a single EngineAPI that React talks to.
// The engine is pure (no React, no DOM). Seeded RNG injected via setRNG() for step 6.

import type {
  EngineAPI,
  EngineState,
  GameResult,
  LineupAdvice,
  Player,
  RNG,
  SeasonResult,
  SlotKey,
  TeamRatings,
  TeamId,
} from '../types/engine';

import { engineWeights, setWeights, getWeights, setRNG, drawRNG, DEFAULT_WEIGHTS } from './weights';
import { teamRatings, RATING_SPECS } from './ratings';
import { NATURAL_SLOT_MAP, FLEX, adviseLineup, isNaturalSlot, flexPenaltyFor } from './flex';

// --- Engine state (in-memory; persisted to localStorage in the React layer) ---
let state: EngineState = {
  currentWeek: 1,
  seasonPhase: 'draft',
  userTeam: null,
  rosters: {},
};

let personalWeights: Record<SlotKey, number> | null = null;

export function createEngine(): EngineAPI {
  return {
    // --- State ---
    getState: () => ({ ...state, rosters: JSON.parse(JSON.stringify(state.rosters)) }),

    // --- RNG injection (step 6) ---
    setRNG: (rng) => setRNG(rng),
    drawRNG: () => drawRNG(),

    // --- Draft ---
    startDraft: (teamId) => {
      state.userTeam = teamId;
      state.seasonPhase = 'draft';
      state.currentWeek = 1;
      state.rosters = {};
    },

    draftPick: (slot, player) => {
      if (!state.userTeam) return;
      if (!state.rosters[state.userTeam]) state.rosters[state.userTeam] = {};
      const tm = state.rosters[state.userTeam];
      tm[slot] = player;
    },

    // --- Lineup ---
    setLineup: (slotmap) => {
      if (!state.userTeam) return;
      state.rosters[state.userTeam] = { ...state.rosters[state.userTeam], ...slotmap };
    },

    // --- Game ---
    simulateGame: (home, away): GameResult => {
      // Placeholder: Claude's full simulateGame lives here at build time.
      // VLC V1 keeps Claude's exact math; this is the integration seam.
      const plays: PlayEvent[] = [];
      let homeScore = 0;
      let awayScore = 0;

      for (let t = 0; t < 60; t += 5) {
        const draw = drawRNG();
        if (draw < 0.15) {
          const tm = draw < 0.075 ? home : away;
          const pts = draw < 0.05 ? 7 : 3;
          if (tm === home) homeScore += pts; else awayScore += pts;
          plays.push({
            time: t,
            team: tm,
            play: pts === 7 ? 'Pass TD' : 'FG',
            yards: pts === 7 ? 22 : 44,
            tag: pts === 7 ? 'TD' : 'FG',
          });
        }
      }

      const mvp: Player | null = null;
      return { homeScore, awayScore, homeTeam: home, awayTeam: away, plays, mvp };
    },

    simulateSeason: (teamId): SeasonResult => {
      return {
        record: { wins: 12, losses: 4, ties: 0 },
        playoffResult: 'Super Bowl Won',
        superbowlWon: true,
        games: [],
      };
    },

    // --- Metrics ---
    teamRatings: (slotmap) => teamRatings(slotmap as Record<SlotKey, { ovr: number } | null>),
    modelWeights,
    slotWinsPerOvr: () => {
      // Placeholder seam — real math from Claude at build time.
      const out: Record<SlotKey, number> = {} as Record<SlotKey, number>;
      for (const k of Object.keys(DEFAULT_WEIGHTS) as SlotKey[]) out[k] = 70;
      return out;
    },
    adviseLineup: (roster) => {
      const cur: Record<SlotKey, Player | null> = {} as Record<SlotKey, Player | null>;
      for (const p of roster) {
        const nat = NATURAL_SLOT_MAP[p.pos as SlotKey]?.[0];
        if (nat) cur[nat] = p;
      }
      return adviseLineup(roster, cur);
    },
  };
}

export { DEFAULT_WEIGHTS, RATING_SPECS, NATURAL_SLOT_MAP, FLEX, isNaturalSlot, flexPenaltyFor };
