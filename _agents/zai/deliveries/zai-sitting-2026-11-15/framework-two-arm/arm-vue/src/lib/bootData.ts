// bootData.ts — the two-arm build's framework-neutral data bootstrap: IDENTICAL BYTES in both arms.
// The engine (the vendored pin snapshot) + the view-model do the work; the framework only renders.
// fixture.json = the league log of draft seed 1000 (user: Chicago Bears), minted node-side BEFORE
// either arm was built (see ../two-arm-fixture.mjs) — the heaviest view: MIN @ CHI 21-11, 20 drives,
// 6 scoring drives, 3 turnovers. Both arms restore the same record and call the same feedVM.
import DATASET_RATINGS from '../data/madden27-ratings.csv?raw';
import DATASET_FA from '../data/free-agents-old-ratings.csv?raw';
import DATASET_IDS from '../data/player-ids.csv?raw';
import FIXTURE from '../fixture.json';
import { buildPool } from '../engine/sports/nfl/engine/players.ts';
import { freezePool } from '../engine/sports/nfl/app/store.ts';
import { feedVM } from './feedVM.ts';
import type { FeedVM } from './feedVM.ts';

export interface Fixture { seed: number; userTeam: number; picks: { overall: number; team: number; pid: string; slot: string }[] }

export function bootFeed(): FeedVM {
  const pool = buildPool(DATASET_RATINGS, DATASET_FA, DATASET_IDS);
  const fx = FIXTURE as Fixture;
  const record = { seed: fx.seed, userTeam: fx.userTeam, pool: freezePool(pool), picks: fx.picks };
  return feedVM(record, fx.seed, fx.userTeam);
}

// ---- four-slice extension (2026-11-15): the app boot behind the framework, framework-free, IDENTICAL
// BYTES in both arms. The screens and the reactive glue are the arms' own code; the draft store, the
// feed re-render for any team, the 32 teams, the save stamps and the persisted team choice are not
// framework concerns and live here, behind the same exclusion rule as before.
import { createStore } from '../engine/sports/nfl/app/store.ts';
import type { Store } from '../engine/sports/nfl/app/store.ts';
import type { FrozenPoolRow } from '../engine/sports/nfl/app/saves.ts';
import { stamps } from '../engine/sports/nfl/app/versions.ts';
import { TEAMS } from '../engine/sports/nfl/engine/league.ts';
import { sportKey } from '../engine/core/keys.ts';
import type { AppSaveMeta } from './savesService.ts';

export interface TeamRow { i: number; name: string; conf: string; div: string }

export interface AppBoot {
  store: Store;                                   // the REAL reducer (app/store.ts)
  feedFor: (userTeam: number) => FeedVM;          // the feed re-rendered for any team (engine-true)
  teams: TeamRow[];                               // the 32, engine order (real conf/div alignment)
  metaFor: (rec: { picks: readonly unknown[] }) => Promise<AppSaveMeta>;   // envelope stamps for a save write
  loadTeam: () => number | null;                  // the persisted team choice (null = never chosen)
  saveTeam: (team: number) => void;
  defaultTeam: number;                            // the fixture's user team (Chicago Bears)
  seed: number;                                   // the fixture seed (1000)
}

export function bootApp(): AppBoot {
  const pool = buildPool(DATASET_RATINGS, DATASET_FA, DATASET_IDS);
  const fx = FIXTURE as Fixture;
  const poolRows = freezePool(pool);
  const record = { seed: fx.seed, userTeam: fx.userTeam, pool: poolRows, picks: fx.picks };
  const saveId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : 'twoarm-' + Math.random().toString(36).slice(2);
  const createdAt = new Date().toISOString();
  let stampCache: { engineVersion: string; dataVersion: string } | null = null;
  const TEAM_KEY = sportKey('nfl', 'team');
  return {
    store: createStore(pool),
    feedFor: (userTeam: number) => feedVM(record, fx.seed, userTeam),
    teams: TEAMS.map((t, i) => ({ i, name: t.name, conf: t.conf, div: t.div })),
    metaFor: async (rec) => {
      if (!stampCache) stampCache = await stamps(poolRows);
      return { engineVersion: stampCache.engineVersion, dataVersion: stampCache.dataVersion, saveId, saveRevision: 1 + rec.picks.length, createdAt };
    },
    loadTeam: () => {
      try { const raw = localStorage.getItem(TEAM_KEY); if (raw === null) return null; const n = Number(JSON.parse(raw)); return Number.isInteger(n) && n >= 0 && n <= 31 ? n : null; }
      catch { return null; }
    },
    saveTeam: (team: number) => { try { localStorage.setItem(TEAM_KEY, JSON.stringify(team)); } catch { /* storage may refuse; the choice stays session-only */ } },
    defaultTeam: fx.userTeam,
    seed: fx.seed,
  };
}
