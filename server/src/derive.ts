// A finished run's ledger row, recomputed on the server from the accepted season envelope (contract Q8: the server never trusts a client number).
// Pure: no I/O. `perfect` = every game won, playoffs included, and the title won (20-0 for a #1 seed with the bye: 17 + 3).
// `undefeated` = regular season with no losses and no ties (17-0).
import type { SeasonEnvelope } from '../../colors/src/sports/nfl/app/saves.ts';
import type { RunRow } from './store.ts';

const ROUND_OUTCOME: Record<string, string> = { 'Wild Card': 'wild-card', Divisional: 'divisional', Conference: 'conference', 'Super Bowl': 'super-bowl-loss' };

export type Derived = { ok: true; row: RunRow } | { ok: false; message: string };

export function deriveRun(env: SeasonEnvelope): Derived {
  const p = env.payload;
  if (p.statsRecorded !== true) return { ok: false, message: 'run: season is not finished (statsRecorded is false)' };
  const me = p.userTeam;
  let w = 0, l = 0, t = 0, pf = 0, pa = 0, allWon = true, regGames = 0;
  let last: { round: string; won: boolean } | null = null;
  for (const g of p.userResults) {
    const mine = g.home === me ? g.hs : g.away === me ? g.as : null;
    const theirs = g.home === me ? g.as : g.away === me ? g.hs : null;
    if (mine === null || theirs === null) return { ok: false, message: 'run: a result does not involve the user team' };
    const won = mine > theirs;
    if (!won) allWon = false;
    if (g.round === undefined) {
      regGames++; pf += mine; pa += theirs;
      if (won) w++; else if (mine === theirs) t++; else l++;
    } else last = { round: g.round, won };
  }
  let outcome: string;
  if (last === null) outcome = 'missed-playoffs';
  else if (last.won && last.round === 'Super Bowl') outcome = 'champion';
  else if (!last.won && ROUND_OUTCOME[last.round] !== undefined) outcome = ROUND_OUTCOME[last.round];
  else return { ok: false, message: 'run: the last playoff game is a win before the Super Bowl, or an unknown round; the run is not finished' };
  if (regGames === 0) return { ok: false, message: 'run: no regular-season games' };
  const undefeated = l === 0 && t === 0;
  const perfect = allWon && outcome === 'champion';
  return {
    ok: true,
    row: {
      sport: env.sport, saveId: env.saveId, run: p.run, franchise: me, year: p.year, outcome, w, l, t, pf, pa, undefeated, perfect, confSeed: null,
      engineVersion: env.engineVersion, dataVersion: env.dataVersion, recordedAt: env.savedAt,
      detail: JSON.stringify({ seed: p.seed, results: p.userResults }),
    },
  };
}
