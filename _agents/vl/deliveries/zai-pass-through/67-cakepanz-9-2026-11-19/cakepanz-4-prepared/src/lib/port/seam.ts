// port/seam.ts — THE ONE DOOR (M1). The ONLY file in the shell that imports src/engine/**.
// Everything the shell needs from the frozen snapshot crosses here, typed and named. The engine is
// consumed byte-identical to the pin — never forked, never patched, never re-implemented.
//   M1  one door   — grep "engine/" over src/lib/**/*.svelte returns zero hits; screens import this folder.
//   M2  one directory — delete src/engine/ and every error roots HERE (a missing module in one file).
//   M3  the swap test — replace src/engine/ with a new pin's snapshot, build + battery, zero edits here.
//   M4  the contract — SNAPSHOT.md (repo root) carries the pin, the sha256s, and the re-pin procedure.
//   M5  a thin seam — the app-touch count is measured in the battery (MERGE-GUIDE.md §seam).
import { createStore, freezePool, thawPool, parseRecord, restoreDraft, saveTo, loadFrom, SAVE_KEY } from '../../engine/sports/nfl/app/store.ts';
import type { Store, DraftStoreState, DraftStoreAction, SaveRecord, Status } from '../../engine/sports/nfl/app/store.ts';
import type { Player } from '../../engine/sports/nfl/engine/players.ts';
import { buildPool } from '../../engine/sports/nfl/engine/players.ts';
import { newDraft, DEFAULT_CONFIG, snakeOrder, openSlots, candidates, cpuChoose, applyPick, roundOf, runDraft } from '../../engine/sports/nfl/engine/draft.ts';
import type { DraftState, DraftConfig, Pick, Roster, Candidate } from '../../engine/sports/nfl/engine/draft.ts';
import { boardVM, slotLabel } from '../../engine/sports/nfl/view/draftBoard.ts';
import type { BoardVM, BoardRowVM, BoardHeaderVM, BoardSort, AlsoFitVM } from '../../engine/sports/nfl/view/draftBoard.ts';
import { goneOdds, goneChance } from '../../engine/sports/nfl/engine/goneodds.ts';
import type { GoneOdds } from '../../engine/sports/nfl/engine/goneodds.ts';
import { lineupFor, optimalLineup, adviseLineup, placementOf, valueOf, EMPTY_OVR, WINS_PER_UNIT } from '../../engine/sports/nfl/engine/lineup.ts';
import type { Lineup, Assignment } from '../../engine/sports/nfl/engine/lineup.ts';
import { fit, FLEX, EMERGENCY_PENALTY } from '../../engine/sports/nfl/engine/flex.ts';
import { SLOTS, SLOT_IDS, fieldSlots, WEIGHT, DL5_SHARE } from '../../engine/sports/nfl/engine/slots.ts';
import type { SlotId, SlotDef, Dest, Unit } from '../../engine/sports/nfl/engine/slots.ts';
import { TEAMS, TEAM_BY_NAME, DIVS, divisionTeams } from '../../engine/sports/nfl/engine/league.ts';
import type { TeamDef, Conf, Div } from '../../engine/sports/nfl/engine/league.ts';
import { TEAM_COLORS } from '../../engine/sports/nfl/view/teamColors.ts';
import { buildPool as _bp } from '../../engine/sports/nfl/engine/players.ts';
import { teamRatings, spotsOf, leagueBaseline, spotsFromRecord } from '../../engine/sports/nfl/engine/ratings.ts';
import type { Ratings, Spot, RatingKey } from '../../engine/sports/nfl/engine/ratings.ts';
import { returnerRating, returnerCandidates, pickReturner } from '../../engine/sports/nfl/engine/returner.ts';
import { netPts, slotWins, WEIGHT_UNIT_WINS } from '../../engine/sports/nfl/engine/value.ts';
import { makeRng, forkSeed } from '../../engine/core/rng.ts';
import type { Rng } from '../../engine/core/rng.ts';
import { startSeason, playWeek, fixtures, gameSeed, gameLabel, roundOfWeek, isFinished, table } from '../../engine/sports/nfl/engine/seasonrun.ts';
import type { RunState, Score } from '../../engine/sports/nfl/engine/seasonrun.ts';
import { simulateSeason, initialRanks, tds } from '../../engine/sports/nfl/engine/season.ts';
import type { SeasonResult, GameLog, LeagueTeam, Round, Record3 } from '../../engine/sports/nfl/engine/season.ts';
import { buildSchedule } from '../../engine/sports/nfl/engine/schedule.ts';
import type { Game } from '../../engine/sports/nfl/engine/schedule.ts';
import { seedPlayoffs } from '../../engine/sports/nfl/engine/standings.ts';
import type { Played, Seeding } from '../../engine/sports/nfl/engine/standings.ts';
import { newSeasonStats, addBox, leaders, seasonAwards, LEADER_KEYS } from '../../engine/sports/nfl/engine/awards.ts';
import type { SeasonStats, SeasonLine, Awards } from '../../engine/sports/nfl/engine/awards.ts';
import { buildBoxScore, lineOf, pointsOf, STAT_KEYS, blankStats } from '../../engine/sports/nfl/engine/boxscore.ts';
import type { BoxScore, PlayerLine, StatKey, Stats, GameSide } from '../../engine/sports/nfl/engine/boxscore.ts';
import { buildRecap, nickname, statLine, gradeOf, offensePts, defensePts } from '../../engine/sports/nfl/engine/recap.ts';
import type { Recap, RecapLine, TurnoverLine, StarLine } from '../../engine/sports/nfl/engine/recap.ts';
import { matchupModel, DEFAULT_PLAN } from '../../engine/sports/nfl/engine/matchup.ts';
import type { Matchup } from '../../engine/sports/nfl/engine/matchup.ts';
import type { Base } from '../../engine/sports/nfl/engine/slots.ts';
import { simulateGame } from '../../engine/sports/nfl/engine/drives.ts';
import type { GameResult } from '../../engine/sports/nfl/engine/drives.ts';
import { gameFeed } from '../../engine/sports/nfl/app/feed.ts';
import type { GameFeed, DriveEvent, ScoreKind, Conv } from '../../engine/sports/nfl/app/feed.ts';
import { serialize, restore, assertSlotMatchesKey } from '../../engine/sports/nfl/app/saves.ts';
import type { AnyEnvelope, DraftPayload, WeekPayload, SeasonPayload, DraftEnvelope, WeekEnvelope, SeasonEnvelope, GameScore, FrozenPlayer, FrozenPoolRow, DraftPick } from '../../engine/sports/nfl/app/saves.ts';
import { hydrateWeek, hydrateSeasonConsistency } from '../../engine/sports/nfl/app/hydrate.ts';
import type { HydrateResult } from '../../engine/sports/nfl/app/hydrate.ts';
import { toWeekPayload, fromWeekPayload, userGameSeed } from '../../engine/sports/nfl/app/weekmap.ts';
import type { LoadedWeek, WeekContext, MapResult } from '../../engine/sports/nfl/app/weekmap.ts';
import { userOutcome, statsDue } from '../../engine/sports/nfl/app/outcome.ts';
import type { UserOutcome } from '../../engine/sports/nfl/app/outcome.ts';
import { sha256Hex } from '../../engine/core/hash.ts';
import { createLocalStorageModule } from '../../engine/platform/localstorage.ts';
import type { StorageModule } from '../../engine/core/app.ts';
import { sportKey } from '../../engine/core/keys.ts';
import { SLOT_NAMES, SCHEMA_VERSION } from '../../engine/core/envelope.ts';
import type { SlotName, SaveMeta } from '../../engine/core/envelope.ts';
import { showInt, showDecimal, goneDisplay, ONE_DECIMAL_KINDS } from '../../engine/sports/nfl/engine/display.ts';
import type { OneDecimalKind } from '../../engine/sports/nfl/engine/display.ts';
import { stamps, drift, engineVersion } from '../../engine/sports/nfl/app/versions.ts';
import type { Drift } from '../../engine/sports/nfl/app/versions.ts';
import { teamIdentity } from '../../engine/sports/nfl/engine/plans.ts';
import type { Identity, Projection } from '../../engine/sports/nfl/engine/plans.ts';
import type { Plan, OffPlan, DefPlan } from '../../engine/sports/nfl/engine/specs.ts';
import type { PlanState } from '../../engine/sports/nfl/app/appstate.ts';

// ---------- re-exports: the contract surface the shell compiles against ----------
export type {
  // draft store
  Store, DraftStoreState, DraftStoreAction, SaveRecord, Status,
  // players + pool
  Player, FrozenPoolRow, FrozenPlayer,
  // draft
  DraftState, DraftConfig, Pick, Roster, Candidate,
  // board
  BoardVM, BoardRowVM, BoardHeaderVM, BoardSort, AlsoFitVM, GoneOdds,
  // lineup / slots
  Lineup, Assignment, SlotId, SlotDef, Dest, Unit, Base,
  // league
  TeamDef, Conf, Div,
  // ratings
  Ratings, Spot, RatingKey,
  // season
  RunState, Score, SeasonResult, GameLog, LeagueTeam, Round, Record3, Game,
  Played, Seeding,
  // awards / box / recap
  SeasonStats, SeasonLine, Awards, BoxScore, PlayerLine, StatKey, Stats, GameSide,
  Recap, RecapLine, TurnoverLine, StarLine,
  // matchup / drives / feed
  Matchup, GameResult, GameFeed, DriveEvent, ScoreKind, Conv,
  // saves
  AnyEnvelope, DraftPayload, WeekPayload, SeasonPayload, DraftEnvelope, WeekEnvelope, SeasonEnvelope,
  GameScore, DraftPick,
  HydrateResult, LoadedWeek, WeekContext, MapResult, UserOutcome,
  StorageModule, SlotName, SaveMeta, OneDecimalKind, Drift, Identity, Projection, Plan, OffPlan, DefPlan, PlanState,
  Rng,
};
export {
  // draft store (the only DraftStoreState/DraftStoreAction, F1)
  createStore, freezePool, thawPool, parseRecord, restoreDraft, saveTo, loadFrom, SAVE_KEY,
  // draft engine (newDraft carries the ORDER param — P-317's seam)
  newDraft, DEFAULT_CONFIG, snakeOrder, openSlots, candidates, cpuChoose, applyPick, roundOf, runDraft,
  // board
  boardVM, slotLabel, goneOdds, goneChance,
  // lineup
  lineupFor, optimalLineup, adviseLineup, placementOf, valueOf, EMPTY_OVR, WINS_PER_UNIT, fit, FLEX, EMERGENCY_PENALTY,
  SLOTS, SLOT_IDS, fieldSlots, WEIGHT, DL5_SHARE,
  // league + colors
  TEAMS, TEAM_BY_NAME, DIVS, divisionTeams, TEAM_COLORS,
  // ratings
  buildPool, teamRatings, spotsOf, leagueBaseline, spotsFromRecord, returnerRating, returnerCandidates, pickReturner,
  netPts, slotWins, WEIGHT_UNIT_WINS,
  // rng
  makeRng, forkSeed,
  // season stepping (the week stepper's engine half)
  startSeason, playWeek, fixtures, gameSeed, gameLabel, roundOfWeek, isFinished, table,
  simulateSeason, initialRanks, tds, buildSchedule, seedPlayoffs,
  // awards / box / recap
  newSeasonStats, addBox, leaders, seasonAwards, LEADER_KEYS,
  buildBoxScore, lineOf, pointsOf, STAT_KEYS, blankStats,
  buildRecap, nickname, statLine, gradeOf, offensePts, defensePts,
  // game-level
  matchupModel, teamIdentity, DEFAULT_PLAN, simulateGame, gameFeed,
  // saves + hydration
  serialize, restore, assertSlotMatchesKey, hydrateWeek, hydrateSeasonConsistency,
  toWeekPayload, fromWeekPayload, userGameSeed, userOutcome, statsDue,
  createLocalStorageModule, sportKey, SLOT_NAMES, SCHEMA_VERSION,
  // display + versions
  showInt, showDecimal, goneDisplay, ONE_DECIMAL_KINDS, stamps, drift, engineVersion, sha256Hex,
};

// ---------- the port object (what controllers consume; keeps one import in the bindings) ----------
export const engine = {
  createStore, freezePool, thawPool, parseRecord, restoreDraft,
  newDraft, DEFAULT_CONFIG, snakeOrder, openSlots, roundOf,
  boardVM, slotLabel, goneOdds, goneChance, lineupFor, fit, SLOTS, SLOT_IDS, fieldSlots,
  TEAMS, TEAM_BY_NAME, DIVS, divisionTeams, TEAM_COLORS,
  buildPool, teamRatings, spotsOf, leagueBaseline, returnerRating, netPts,
  makeRng, forkSeed,
  startSeason, playWeek, fixtures, gameSeed, isFinished, roundOfWeek, table,
  simulateSeason, initialRanks, tds, seedPlayoffs, gameLabel,
  newSeasonStats, addBox, leaders, seasonAwards, buildBoxScore, blankStats, STAT_KEYS,
  buildRecap, statLine, matchupModel, teamIdentity, simulateGame, gameFeed,
  serialize, restore, assertSlotMatchesKey, hydrateWeek, hydrateSeasonConsistency,
  toWeekPayload, fromWeekPayload, userGameSeed, userOutcome, statsDue,
  createLocalStorageModule, sportKey, SLOT_NAMES, SCHEMA_VERSION,
  showInt, showDecimal, goneDisplay, stamps, drift, engineVersion,
};
export type EnginePort = typeof engine;
