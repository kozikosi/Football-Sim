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
