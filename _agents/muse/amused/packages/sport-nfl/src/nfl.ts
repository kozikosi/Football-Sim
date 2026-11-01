// The NFL SportSpec — the league's data (slots, flex, bases) behind the amused contract.
// The game model (simulate) is PENDING the Architect's game-model interface; until then
// this package is the verified data layer the draft and UI build on.
import type { Rng, SportSpec, Scenario, SimResult } from '../../engine-core/src/sport-spec.ts';
import { SLOTS, EMPTY_OVR } from './slots.ts';
import { FLEX } from './flex.ts';

export const NFL: SportSpec = {
  id: 'nfl',
  slots: SLOTS,
  flex: FLEX,
  bases: ['4-3', '3-4'],
  emptyOvr: EMPTY_OVR,
  // Wins per (weight point x OVR point): 0.00254 wins over a 70->90 upgrade / 20 OVR points.
  weightUnitWins: 0.00254 / 20,

  validateScenario(s: Scenario): string[] {
    const problems: string[] = [];
    if (s.sportId !== 'nfl') problems.push(`sportId ${s.sportId} != nfl`);
    if (!Number.isInteger(s.seed)) problems.push('seed must be an integer');
    return problems;
  },

  simulate(scenario: Scenario, _rng: Rng): SimResult {
    const problems = this.validateScenario(scenario);
    if (problems.length) throw new Error('invalid scenario: ' + problems.join('; '));
    // PENDING: the game model. Asked of the Architect 2026-11-01 (one-page engine roadmap:
    // the intended game-model module interface for colors/src/engine).
    throw new Error('NFL.simulate: game model pending — data layer only in v1');
  },
};
