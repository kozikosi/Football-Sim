import { serialize } from '../../colors/src/sports/nfl/app/saves.ts';
import type { FrozenPlayer, GameScore } from '../../colors/src/sports/nfl/app/saves.ts';
import type { SlotName } from '../../colors/src/core/envelope.ts';
import { handle } from '../src/api.ts';
import type { D1Like } from '../src/d1.ts';

export const T0 = new Date('2026-11-21T12:00:00.000Z');
const meta = (saveId: string, saveRevision: number) => ({ engineVersion: 'e1', dataVersion: 'sha256:' + 'a'.repeat(64), saveId, saveRevision, createdAt: T0.toISOString() });
const frozen = (i: number): FrozenPlayer => ({ id: 'p' + i, name: 'Player ' + i, pos: 'QB', role: 'QB1', team: 'X', ovr: 70, spd: 70, str: 70, freeAgent: false });
const roster = (): FrozenPlayer[] => Array.from({ length: 32 }, (_, i) => frozen(i));

export function draftEnv(slot: SlotName, saveId: string, rev: number, extraPool = 0): Record<string, unknown> {
  const pool = Array.from({ length: extraPool }, () => ['id', 'n'.repeat(40), 'QB', 'X', 70, 70, 70, 0]);
  return JSON.parse(serialize('draft', slot, meta(saveId, rev), { seed: 1, userTeam: 0, picks: [], pool }, T0));
}
export function game(week: number, home: string, away: string, hs: number, as: number, round?: string): GameScore { return round ? { week, home, away, hs, as, round } : { week, home, away, hs, as }; }
// n regular-season games for 'Me' with the given result string (W/L/T), then playoff games [round, W|L].
export function results(reg: string, playoff: [string, 'W' | 'L'][] = []): GameScore[] {
  const out: GameScore[] = [...reg].map((c, i) => game(i + 1, 'Me', 'Opp' + i, c === 'W' ? 30 : c === 'T' ? 20 : 10, c === 'L' ? 30 : 20 - (c === 'W' ? 10 : 0)));
  playoff.forEach(([round, r], i) => out.push(game(18 + i, 'Me', 'Po' + i, r === 'W' ? 27 : 13, r === 'W' ? 17 : 24, round)));
  return out;
}
export function seasonEnv(slot: SlotName, saveId: string, rev: number, userResults: GameScore[], opts: { statsRecorded?: boolean; userOutcome?: string; run?: number } = {}): Record<string, unknown> {
  return JSON.parse(serialize('season', slot, meta(saveId, rev), {
    seed: 7, year: 2026, run: opts.run ?? 0, userTeam: 'Me', roster: roster(), statsRecorded: opts.statsRecorded ?? true,
    table: [{ team: 'Me', w: 0, l: 0, t: 0, pf: 0, pa: 0 }], userResults, champion: 'Someone', userOutcome: opts.userOutcome ?? 'missed-playoffs',
  }, T0));
}
export function weekEnv(slot: SlotName, saveId: string, rev: number): Record<string, unknown> {
  return JSON.parse(serialize('week', slot, meta(saveId, rev), {
    seed: 7, year: 2026, run: 0, gameSeed: 1, nextWeek: 1, userTeam: 'Me', roster: roster(), ratings: {}, schedule: [], scores: [], plan: null, statsRecorded: true,
  }, T0));
}
export const W17 = 'W'.repeat(17);

export async function call(db: D1Like, user: string | null, method: string, path: string, body?: unknown, now: Date = T0): Promise<{ status: number; json: any; headers: Headers }> {
  const init: RequestInit = { method, headers: user ? { 'x-test-user': user, 'content-type': 'application/json' } : { 'content-type': 'application/json' } };
  if (body !== undefined) init.body = JSON.stringify(body);
  const res = await handle(new Request('http://x' + path, init), { DB: db }, async (r) => r.headers.get('x-test-user'), now);
  return { status: res.status, json: await res.json(), headers: res.headers };
}
