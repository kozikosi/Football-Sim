// port/fixture.ts — the FIXTURE MARSHAL: deterministic, node-side, built ENTIRELY from the engine's
// own path (the weekfixture.mjs pattern from slice 3). The fixtures exist so the whole shell can be
// rendered and lawed without a browser and without a hand-faked byte: the draft record is a REAL
// runDraft log, the week envelope is a REAL toWeekPayload, the season state is a REAL playWeek state.
// Same inputs -> byte-identical outputs (the node battery proves determinism).
import fs from 'node:fs';
import { buildPool, newDraft, DEFAULT_CONFIG, runDraft, freezePool, startSeason, playWeek, TEAMS, makeRng, snakeOrder } from './seam.ts';
import type { Player, SaveRecord, RunState, LeagueTeam, DraftState } from './seam.ts';
import { teamRatingsOf, rostersOfRecord, ratedLeagueOfRecord } from './feedVM.ts';
import { toWeekPayload } from './seam.ts';

const D = new URL('../../../data/nfl/', import.meta.url);

export interface Fixture {
  seed: number; userTeam: number;
  pool: Player[];
  record: SaveRecord;
  draft: DraftState;
  season: RunState;
  teams: LeagueTeam[];
}

let cache: Fixture | null = null;

/** Reset the marshal (the battery's determinism law re-runs it from scratch). */
export function resetFixture(): void { cache = null; }

export function fixtureLeague(): Fixture {
  if (cache) return cache;
  const ratingsCsv = fs.readFileSync(new URL('madden27-ratings.csv', D), 'utf8');
  const faCsv = fs.readFileSync(new URL('free-agents-old-ratings.csv', D), 'utf8');
  const idsCsv = fs.readFileSync(new URL('player-ids.csv', D), 'utf8');
  const pool = buildPool(ratingsCsv, faCsv, idsCsv);
  const seed = 777;
  const userTeam = 5;                                        // Chicago Bears drafts at slot 6 (the fixture's user)
  // the user drafts FIRST overall (P-317 seam demo): a full 1,024-entry order, round 1 re-headed
  const snake = snakeOrder();
  const order = [userTeam, ...snake.slice(0, 32).filter((t) => t !== userTeam), ...snake.slice(32)];
  const st = newDraft(pool, makeRng(seed).fork('draft'), DEFAULT_CONFIG, order);
  runDraft(st, makeRng(seed).fork('run'), { team: userTeam, policy: 'greedy' });
  const record: SaveRecord = { seed, userTeam, pool: freezePool(pool), picks: st.log.map((p) => ({ overall: p.overall, team: p.team, pid: p.player.id, slot: p.slot })) };
  const teams = ratedLeagueOfRecord(record);
  let season = startSeason(teams, { seed, year: 2027 });
  season = playWeek(teams, season).state;                    // week 1 played
  cache = { seed, userTeam, pool, record, draft: st, season, teams };
  return cache;
}

/** The user's frozen roster (the week payload needs it). */
export function fixtureRoster(fx: Fixture): import('./seam.ts').FrozenPlayer[] {
  return rostersOfRecord(fx.record)[fx.userTeam].map((p) => ({ id: p.id, name: p.name, pos: p.pos, role: p.role, team: p.team, ovr: p.ovr, spd: p.spd, str: p.str, freeAgent: !!p.freeAgent }));
}

/** A real week envelope payload for the fixture's season state (engine-built, toWeekPayload). */
export function fixtureWeekPayload(fx: Fixture): import('./seam.ts').WeekPayload {
  return toWeekPayload(fx.season, fx.teams, {
    userTeam: TEAMS[fx.userTeam].name,
    roster: fixtureRoster(fx),
    plan: null,
    statsRecorded: false,
  });
}
