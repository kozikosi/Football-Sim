// NFL save payloads (the sport-specific half of the save envelope; the outer envelope is core/envelope.ts).
// Plain JSON only. Storage never imports this file: it moves envelopes and treats `payload` as opaque.
import { parseEnvelope, serialize as serializeEnvelope } from '../../../core/envelope.ts';
import type { Envelope, ParseResult, SaveMeta, SlotName } from '../../../core/envelope.ts';
export const SPORT = 'nfl' as const;
export type SaveKind = 'draft' | 'week' | 'season';

// A player frozen at the moment of the save (same fields as engine Player; copied so resume never touches the live pool).
export interface FrozenPlayer { id: string; name: string; pos: string; role: string; team: string; ovr: number; spd: number; str: number; freeAgent: boolean }
// Compact pool row for the mid-draft freeze: [pid, name, pos, team, ovr, spd, str, freeAgent 0|1]. Role is rederived from pos by the engine's table.
// The pid (E1) is in the row so a resume never needs the live crosswalk. (Layout changed from 7 to 8 columns on 3 Nov 2026, before any save shipped; schemaVersion stays 1.)
export type FrozenPoolRow = [string, string, string, string, number, number, number, 0 | 1];

export interface DraftPick { overall: number; team: number; pid: string; slot: string }

// draft: mid-draft. Replays nothing: the picks are a log, the pool is frozen.
export interface DraftPayload {
  seed: number; userTeam: number;
  picks: DraftPick[];            // every pick made so far, CPU and user, in order
  pool: FrozenPoolRow[];         // the whole board as it was when the draft began (about 90 K chars as tuples)
}
export interface GameScore { week: number; home: string; away: string; hs: number; as: number; round?: string; htd?: number; atd?: number }   // htd/atd (touchdown counts) are needed for seeding tiebreaks
// week: the rolling save at a game preview (one per slot).
export interface WeekPayload {
  seed: number; year: number;
  run: number;                   // run-it-back counter; feeds the schedule's year/prevRank so opponents change
  gameSeed: number;              // the seed of the game the preview is for: a refresh replays the SAME game
  nextWeek: number;              // week (or playoff round index) the preview is for
  userTeam: string;              // team name
  roster: FrozenPlayer[];        // the user's 32 frozen players
  ratings: Record<string, unknown>;       // team name to frozen ratings (shape owned by the engine, opaque to storage)
  schedule: { week: number; home: string; away: string; kind: string }[];
  scores: GameScore[];           // results so far: regular season in play order, then playoff games (those carry `round`)
  plan: Record<string, unknown> | null;   // the user's plan state once step 9 ports it
  statsRecorded: boolean;
  prevRank?: Record<string, number>;      // last year's ranks: next run-it-back's schedule input (written by app/weekmap.ts; older saves lack it)
  homeField?: number;                      // the season's home-field points when the engine was given one
}
// season: finished, pruned. No drives, no game logs.
export interface SeasonPayload {
  seed: number; year: number; run: number;
  userTeam: string;
  roster: FrozenPlayer[];
  table: { team: string; w: number; l: number; t: number; pf: number; pa: number }[];
  userResults: GameScore[];      // the user's regular-season and playoff games
  champion: string;
  userOutcome: 'missed-playoffs' | 'wild-card' | 'divisional' | 'conference' | 'super-bowl-loss' | 'champion';
  statsRecorded: boolean;        // flipped once, the moment the user is eliminated, in the same write that updates global stats
}


export type DraftEnvelope = Envelope<'nfl', 'draft', DraftPayload>;
export type WeekEnvelope = Envelope<'nfl', 'week', WeekPayload>;
export type SeasonEnvelope = Envelope<'nfl', 'season', SeasonPayload>;
export type AnyEnvelope = DraftEnvelope | WeekEnvelope | SeasonEnvelope;

const bad = (message: string): { ok: false; reason: 'corrupt'; message: string } => ({ ok: false, reason: 'corrupt', message });
const isObj = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);
const isInt = (x: unknown): x is number => typeof x === 'number' && Number.isInteger(x);
const isStr = (x: unknown): x is string => typeof x === 'string';

const frozenOk = (p: unknown): boolean => isObj(p) && isStr(p.id) && isStr(p.name) && isStr(p.pos) && isStr(p.role) && isStr(p.team) && isInt(p.ovr) && isInt(p.spd) && isInt(p.str) && typeof p.freeAgent === 'boolean';
const scoresOk = (a: unknown): boolean => Array.isArray(a) && a.every((g) => isObj(g) && isInt(g.week) && isStr(g.home) && isStr(g.away) && isInt(g.hs) && isInt(g.as));

// Shape check for a draft payload (also used by the store when it loads a record). Returns the first problem, or null.
export function draftPayloadProblem(p: Record<string, unknown>): string | null {
  if (!isInt(p.seed)) return 'payload: bad seed';
  if (!isInt(p.userTeam) || p.userTeam < 0 || p.userTeam > 31) return 'draft: bad userTeam';
  if (!Array.isArray(p.picks) || !p.picks.every((k) => isObj(k) && isInt(k.overall) && isInt(k.team) && isStr(k.pid) && isStr(k.slot))) return 'draft: bad picks';
  if (!Array.isArray(p.pool) || !p.pool.every((r) => Array.isArray(r) && r.length === 8 && isStr(r[0]) && isStr(r[1]) && isStr(r[2]) && isStr(r[3]) && isInt(r[4]) && isInt(r[5]) && isInt(r[6]) && (r[7] === 0 || r[7] === 1))) return 'draft: bad pool';
  return null;
}
// Inner shape, by kind. Engine side only (storage must not need it). Returns the same envelope typed, or the first problem found.
export function parsePayload(env: Envelope<'nfl'>): ParseResult<AnyEnvelope> {
  const p = env.payload as unknown as Record<string, unknown>;
  if (!isInt(p.seed)) return bad('payload: bad seed');
  if (env.kind === 'draft') {
    const why = draftPayloadProblem(p);
    if (why) return bad(why);
  } else {
    if (!isInt(p.year) || !isInt(p.run) || p.run < 0) return bad(env.kind + ': bad year/run');
    if (!isStr(p.userTeam)) return bad(env.kind + ': bad userTeam');
    if (!Array.isArray(p.roster) || p.roster.length !== 32 || !p.roster.every(frozenOk)) return bad(env.kind + ': roster must be 32 frozen players');
    if (typeof p.statsRecorded !== 'boolean') return bad(env.kind + ': bad statsRecorded');
    if (env.kind === 'week') {
      if (!isInt(p.gameSeed) || !isInt(p.nextWeek) || p.nextWeek < 1) return bad('week: bad gameSeed/nextWeek');
      if (!isObj(p.ratings)) return bad('week: bad ratings');
      if (!Array.isArray(p.schedule) || !p.schedule.every((g) => isObj(g) && isInt(g.week) && isStr(g.home) && isStr(g.away) && isStr(g.kind))) return bad('week: bad schedule');
      if (!scoresOk(p.scores)) return bad('week: bad scores');
      if (p.plan !== null && !isObj(p.plan)) return bad('week: bad plan');
      if (p.prevRank !== undefined && !(isObj(p.prevRank) && Object.values(p.prevRank).every(isInt))) return bad('week: bad prevRank');
      if (p.homeField !== undefined && !(typeof p.homeField === 'number' && Number.isFinite(p.homeField))) return bad('week: bad homeField');
    } else {
      if (!Array.isArray(p.table) || !p.table.every((r) => isObj(r) && isStr(r.team) && isInt(r.w) && isInt(r.l) && isInt(r.t) && isInt(r.pf) && isInt(r.pa))) return bad('season: bad table');
      if (!scoresOk(p.userResults)) return bad('season: bad userResults');
      if (!isStr(p.champion)) return bad('season: bad champion');
      if (!['missed-playoffs', 'wild-card', 'divisional', 'conference', 'super-bowl-loss', 'champion'].includes(p.userOutcome as string)) return bad('season: bad userOutcome');
    }
  }
  return { ok: true, value: env as unknown as AnyEnvelope };
}


// Serialize an NFL save: stamps the envelope (sport 'nfl') and returns the JSON string storage writes.
export function serialize<K extends SaveKind, P>(kind: K, slot: SlotName, meta: SaveMeta, payload: P, now: Date): string {
  return serializeEnvelope(SPORT, kind, slot, meta, payload, now);
}
// Restore an NFL save: JSON text to a validated, typed envelope (outer + inner). Never throws. A save from another sport is refused, not read.
export function restore(text: string): ParseResult<AnyEnvelope> {
  let raw: unknown;
  try { raw = JSON.parse(text); } catch { return bad('envelope: not JSON'); }
  const outer = parseEnvelope(raw);
  if (!outer.ok) return outer;
  if (outer.value.sport !== SPORT) return bad('envelope: this is a ' + outer.value.sport + ' save, not an nfl save');
  return parsePayload(outer.value as Envelope<'nfl'>);
}
