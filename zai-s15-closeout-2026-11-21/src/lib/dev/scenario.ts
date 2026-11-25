/**
 * Development-only reproducible scenarios for the S15 Cakepanz shell.
 *
 * This module deliberately uses the application's real data, store, board VM,
 * seed path, suggestion derivation, and brag-copy function. It does not invent
 * view-model rows or mutate the engine.
 *
 * Integration is intentionally separate: mount the drawer only behind
 * import.meta.env.DEV && ?dev, and pass the returned record through App.svelte's
 * existing loadDraft() path. See the adjacent integration note.
 */
import RATINGS from '../../data/madden27-ratings.csv?raw';
import FREE_AGENTS from '../../data/free-agents-old-ratings.csv?raw';
import IDS from '../../data/player-ids.csv?raw';
import {
  boardVM,
  buildPool,
  createStore,
  engineVersion,
  goneOdds,
  makeRng,
  sha256Hex,
  TEAMS,
} from '../port/seam.ts';
import type { BoardVM, SaveRecord } from '../port/seam.ts';
import { suggestIdsOf } from '../port/suggestWhy.ts';
import { seasonBragText } from '../port/bragText.ts';
import { seedToCode } from '../port/seedCode.ts';

export type ScenarioId = 'board-top-three' | 'share-paste' | 'finished-draft';

export interface ScenarioSnapshot {
  schema: 1;
  scenarioId: ScenarioId;
  seed: number;
  seedCode: string;
  teamIndex: number;
  teamName: string;
  status: 'drafting' | 'done' | 'share';
  screen: 'board' | 'complete' | 'share';
  record: SaveRecord | null;
  board: BoardVM | null;
  suggestedIds: string[];
  shareText: string;
  engineVersion: string;
}

const TEAM_INDEX = 0;
const SORT = 'wins' as const;
const DATASET_PLAYERS = buildPool(RATINGS, FREE_AGENTS, IDS);

function startRecord(seed: number, teamIndex: number): SaveRecord {
  const store = createStore(DATASET_PLAYERS);
  store.dispatch({ type: 'START', seed, userTeam: teamIndex });
  const state = store.getState();
  if (state.error || !state.record || !state.draft) {
    throw new Error('scenario START failed: ' + (state.error ?? 'missing draft state'));
  }
  return state.record;
}

function boardFor(record: SaveRecord): { board: BoardVM; suggestedIds: string[] } {
  const store = createStore(DATASET_PLAYERS);
  store.dispatch({ type: 'LOAD', record });
  const state = store.getState();
  if (state.error || !state.draft) {
    throw new Error('scenario LOAD failed: ' + (state.error ?? 'missing draft state'));
  }
  if (state.status === 'done') throw new Error('board scenario unexpectedly completed');
  const odds = goneOdds(state.draft, record.userTeam, makeRng(record.seed * 7 + 13), 30);
  const board = boardVM(state.draft, record.userTeam, odds, { sort: SORT });
  return { board, suggestedIds: suggestIdsOf(board.rows, board.sort) };
}

function finishDraft(seed: number, teamIndex: number): SaveRecord {
  const store = createStore(DATASET_PLAYERS);
  store.dispatch({ type: 'START', seed, userTeam: teamIndex });
  let state = store.getState();
  if (state.error || !state.record || !state.draft) {
    throw new Error('finished scenario START failed: ' + (state.error ?? 'missing draft state'));
  }

  // START and each PICK advance every CPU team until the user's next pick.
  // The selected player is always the first row of the real wins-sorted board.
  let userPicks = 0;
  while (state.status !== 'done') {
    if (!state.draft || !state.record) throw new Error('draft state disappeared before completion');
    const before = state.record.picks.length;
    const odds = goneOdds(state.draft, teamIndex, makeRng(seed * 7 + 13), 30);
    const board = boardVM(state.draft, teamIndex, odds, { sort: SORT });
    const choice = board.rows[0];
    if (!choice) throw new Error('no available board row before draft completion');

    store.dispatch({ type: 'PICK', playerId: choice.id, slot: choice.slotId });
    state = store.getState();
    if (state.error) throw new Error('finished scenario PICK failed: ' + state.error);
    if (!state.record || state.record.picks.length <= before) {
      throw new Error('finished scenario made no progress after PICK');
    }
    userPicks += 1;
    if (userPicks > 32) throw new Error('finished scenario exceeded the 32 user-pick limit');
  }

  if (!state.record || state.record.picks.length !== 1024) {
    throw new Error('finished scenario expected 1,024 picks; got ' + (state.record?.picks.length ?? 0));
  }
  return state.record;
}

/** Build one deterministic scenario using the application's real store and view-model path. */
export function createScenario(seed: number, scenarioId: ScenarioId): ScenarioSnapshot {
  if (!Number.isSafeInteger(seed) || seed < 1 || seed > 2_147_483_647) {
    throw new Error('scenario seed must be an integer from 1 through 2147483647');
  }
  const teamName = TEAMS[TEAM_INDEX]?.name;
  if (!teamName) throw new Error('scenario team index is not present in TEAMS');

  if (scenarioId === 'board-top-three') {
    const record = startRecord(seed, TEAM_INDEX);
    const { board, suggestedIds } = boardFor(record);
    const snapshot: ScenarioSnapshot = {
      schema: 1, scenarioId, seed, seedCode: seedToCode(seed),
      teamIndex: TEAM_INDEX, teamName, status: 'drafting', screen: 'board',
      record, board, suggestedIds, shareText: '', engineVersion: engineVersion(),
    };
    assertScenario(snapshot);
    return snapshot;
  }

  if (scenarioId === 'share-paste') {
    const shareText = seasonBragText({
      w: 17, l: 0, t: 0, teamName, result: 'won the Super Bowl',
    }, '');
    const snapshot: ScenarioSnapshot = {
      schema: 1, scenarioId, seed, seedCode: seedToCode(seed),
      teamIndex: TEAM_INDEX, teamName, status: 'share', screen: 'share',
      record: null, board: null, suggestedIds: [], shareText, engineVersion: engineVersion(),
    };
    assertScenario(snapshot);
    return snapshot;
  }

  if (scenarioId === 'finished-draft') {
    const record = finishDraft(seed, TEAM_INDEX);
    const snapshot: ScenarioSnapshot = {
      schema: 1, scenarioId, seed, seedCode: seedToCode(seed),
      teamIndex: TEAM_INDEX, teamName, status: 'done', screen: 'complete',
      record, board: null, suggestedIds: [], shareText: '', engineVersion: engineVersion(),
    };
    assertScenario(snapshot);
    return snapshot;
  }

  const exhaustive: never = scenarioId;
  throw new Error('unknown scenario: ' + exhaustive);
}

/** A deliberately independent acceptance assertion for fixture integrity. */
export function assertScenario(snapshot: ScenarioSnapshot): void {
  if (snapshot.schema !== 1) throw new Error('unsupported scenario schema');
  if (snapshot.seedCode !== seedToCode(snapshot.seed)) throw new Error('scenario seed code mismatch');

  if (snapshot.scenarioId === 'board-top-three') {
    if (snapshot.status !== 'drafting' || snapshot.screen !== 'board' || !snapshot.record || !snapshot.board) {
      throw new Error('board-top-three must resolve to a live board and record');
    }
    if (snapshot.suggestedIds.length < 3) throw new Error('board-top-three requires at least three suggested rows');
    const rowIds = new Set(snapshot.board.rows.map((row) => row.id));
    if (snapshot.suggestedIds.some((id) => !rowIds.has(id))) throw new Error('suggestion points outside the rendered board');
    return;
  }

  if (snapshot.scenarioId === 'share-paste') {
    if (snapshot.status !== 'share' || snapshot.screen !== 'share') throw new Error('share-paste screen/status mismatch');
    if (!snapshot.shareText.includes('Can you go 20-0?')) throw new Error('share-paste is missing the locked brag slogan');
    if (snapshot.shareText.includes('b36:') || snapshot.shareText.includes('?seed=')) {
      throw new Error('share-paste must not leak the draft seed');
    }
    return;
  }

  if (snapshot.scenarioId === 'finished-draft') {
    if (snapshot.status !== 'done' || snapshot.screen !== 'complete' || !snapshot.record) {
      throw new Error('finished-draft must resolve to the Complete screen');
    }
    if (snapshot.record.picks.length !== 1024) throw new Error('finished-draft must contain exactly 1,024 picks');
  }
}

function canonical(value: unknown): string {
  if (value === undefined) return 'null';
  if (value === null || typeof value !== 'object') {
    const encoded = JSON.stringify(value);
    if (encoded === undefined) throw new Error('scenario snapshot contains a non-JSON value');
    return encoded;
  }
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  const object = value as Record<string, unknown>;
  return '{' + Object.keys(object).sort().filter((key) => object[key] !== undefined)
    .map((key) => JSON.stringify(key) + ':' + canonical(object[key])).join(',') + '}';
}

export function canonicalScenario(snapshot: ScenarioSnapshot): string {
  assertScenario(snapshot);
  return canonical(snapshot);
}

export interface ScenarioReceipt {
  receiptSchema: 1;
  scenarioId: ScenarioId;
  seed: number;
  seedCode: string;
  teamName: string;
  engineVersion: string;
  snapshotSha256: string;
  datasetSha256: string;
  snapshotBytes: number;
  status: ScenarioSnapshot['status'];
  screen: ScenarioSnapshot['screen'];
}

/** Create a stable receipt. Timestamps and machine-specific values are intentionally excluded. */
export async function createScenarioReceipt(snapshot: ScenarioSnapshot): Promise<ScenarioReceipt> {
  const bytes = new TextEncoder().encode(canonicalScenario(snapshot));
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const hash = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return {
    receiptSchema: 1,
    scenarioId: snapshot.scenarioId,
    seed: snapshot.seed,
    seedCode: snapshot.seedCode,
    teamName: snapshot.teamName,
    engineVersion: snapshot.engineVersion,
    snapshotSha256: hash,
    datasetSha256: await sha256Hex(RATINGS + '\\n' + FREE_AGENTS + '\\n' + IDS),
    snapshotBytes: bytes.byteLength,
    status: snapshot.status,
    screen: snapshot.screen,
  };
}

export const SCENARIO_IDS: readonly ScenarioId[] = [
  'board-top-three', 'share-paste', 'finished-draft',
];
