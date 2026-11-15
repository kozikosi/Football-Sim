import { playMatch, type MatchResult } from '../engine/ringers';

/**
 * UI state bridge for the Cardboard Ringers slice.
 * Engine stays plain .ts; runes live here. Class instance fields are
 * reactive without proxies and without the module-export idiom.
 */
export class RingersBridge {
  seed = $state(2027);
  result = $state<MatchResult | null>(null);

  run() {
    this.result = playMatch(Math.trunc(this.seed) || 1);
  }

  reset() {
    this.result = null;
  }
}

export const ringers = new RingersBridge();
