SPEAKER: glyph | ROLE: seat | TASK: v3-methodology-dissent (council-assignment C) | DATE: 2026-11-14T04:21Z

# v3 Methodology Dissent / Evidence from Scratch (Inkling Assignment C)

Scope: analysis/proposals only (no repo patches, no new arms, no engine ports). Two candidate frameworks only: Svelte 5 + Vite, Vue 3 + Vite.

## C1. Benchmark suite as it lives today in scaffolds
**Vue (VERIFIED):** `tests/smoke.spec.ts` (Playwright, base `http://localhost:5173`) asserts HTTP 200, `window.__pinia` defined, zero page errors. `e2e/vue.spec.ts` asserts root `h1` text `You did it!`. Vitest unit suite includes `src/**/*.spec.ts` (1 file / 1 test passed in B3). Assertions cover starter boot/hook/content, not draft-board/sim/recap pipeline.
```ts
import { test, expect } from '@playwright/test';

test('smoke: app boots and exposes __pinia', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));

  const res = await page.goto('http://localhost:5173');
  expect(res?.status()).toBe(200);

  const hasHook = await page.evaluate(() => typeof (window as any).__pinia !== 'undefined');
  expect(hasHook).toBe(true);
  expect(errors).toEqual([]);
});
```
```ts
import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('You did it!')
})
```
**Svelte (VERIFIED):** `tests/smoke.spec.ts` (base `http://localhost:5174`) asserts HTTP 200, `window.__SIM_STATE__` defined, zero page errors. `tests/demo.spec.ts` asserts visible `h1` at `/demo/playwright`. Vitest unit `src/**/*.spec.ts` (1/1). Starter/demo only.
```ts
import { test, expect } from '@playwright/test';

test('smoke: app boots and exposes __SIM_STATE__', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));

  const res = await page.goto('http://localhost:5174');
  expect(res?.status()).toBe(200);

  await page.waitForFunction(() => typeof (window as any).__SIM_STATE__ !== 'undefined');
  expect(errors).toEqual([]);
});
```
```ts
import { expect, test } from '@playwright/test';

test('has expected h1', async ({ page }) => {
	await page.goto('/demo/playwright');
	await expect(page.locator('h1')).toBeVisible();
});
```

**Additional assertions needed to evidence 'could host a working draft-board + simulator + recap pipeline' in a 20-hour sprint (proposal/spec, INFERRED):**
1. **Draft-board flow:** render team-on-clock, pick order/round context, available-player surface, and apply >=N selections with correct state progression (roster/board updates) under a deterministic seed/fixture.
2. **32-team × 32-round workload shape:** representative auto-draft or scripted progression across 1,024 base picks (or justified scaled slice) without desync/crash/console errors; measure responsiveness.
3. **Engine boundary/state contract:** UI consumes plain-TS engine outputs; observable transitions (pre-pick -> pick -> post-pick) and recap inputs derived from state, not placeholders.
4. **Recap rendering:** after simulated segment/game(s), render structured recap fields (scores/events/summary) matching engine-produced data.
5. **Stable test hooks:** selectors/testids for board, pick action, clock, recap; Playwright/Vitest assertions bound to contracts. (No tests written.)

## C2. Workload shaping (live engine, not assumed)
**Live code (VERIFIED, `origin/architect/engine-and-seats`):** `colors/src/sports/nfl/engine/draft.ts` sets `TEAMS_N = 32`, `ROUNDS = SLOT_IDS.length` (32 roster spots => 32 rounds); `snakeOrder(teams, rounds)` yields 32×32 = **1,024 base picks**. `cpuChoose`/`candidates` evaluate `(player, open slot)` fits (natural/listed flex, no emergency) with 'best 16 per role' cap in pool scan and floor/bias/noise logic.
```ts
// The draft: 32 teams, a snake order, 32 rounds (one per roster spot), every player available from round 1.
// CPU front offices value a player the way the season does (wins above a replacement-level player at the spot he would fill),
// each with its own taste (per-group bias), noise and rate of misses, but in the early rounds nobody takes a player
// more than a few OVR below the best one on the board (Owner 31 Oct: "within around 5 OVR of the top OVR player on the
// board for the cpu picks", extremely suboptimal picks are fine in the later rounds). Pure: every draw comes from an Rng.
import { fit } from './flex.ts';
import type { Player, Role } from './players.ts';
import type { Rng } from '../../../core/rng.ts';
import { at } from '../../../core/at.ts';
import { SLOTS, SLOT_IDS, WEIGHT } from './slots.ts';
import type { Dest, SlotId } from './slots.ts';

export const TEAMS_N = 32;
export const ROUNDS = SLOT_IDS.length;              // 32 spots, so 32 rounds: every team fills every spot
const DEST_OF = Object.fromEntries(SLOTS.map((s) => [s.id, s.dest])) as Record<SlotId, Dest>;
// the role whose supply sets the replacement level for a spot's destination
const supplyRole = (d: Dest): Role => (d === 'NICKEL' || d === 'DIME' ? 'CB' : d === 'DL5' ? 'DT' : d);

export interface DraftConfig {
  topFloor: number;        // rounds 1..topFloorRounds: nobody takes a player more than this far below the best on the board
  topFloorRounds: number;
  midFloor: number;        // the following rounds up to midFloorRounds
  midFloorRounds: number;
  kpFirstRound: number;    // kickers and punters are not taken before this round (real drafts: rounds 5-7; INFERRED mapping to 32 rounds)
  noiseMax: number;        // team noise sd is uniform in [0.05, noiseMax]
  missMax: number;         // team miss probability is uniform in [0, missMax]
  biasSd: number;          // sd of ln(group bias)
  hyperP: number;          // chance that a group is hyper-valued or nearly ignored by a team
  replFloor: number;       // replacement level is never below this
}
export const DEFAULT_CONFIG: DraftConfig = {
  topFloor: 5, topFloorRounds: 4, midFloor: 10, midFloorRounds: 8, kpFirstRound: 6,
  noiseMax: 1.5, missMax: 0.6, biasSd: 0.5, hyperP: 0.15, replFloor: 72,
};

export type Roster = Partial<Record<SlotId, Player>>;
export interface Pick { overall: number; round: number; pickInRound: number; team: number; slot: SlotId; player: Player; ovrGap: number }
export interface Traits { noise: number; miss: number; bias: Record<string, number> }
export interface DraftState {
  cfg: DraftConfig; order: number[]; pos: number; pool: Player[];   // pool sorted by OVR, best first (ties by id)
  rosters: Roster[]; traits: Traits[]; log: Pick[]; repl: Partial<Record<Role, number>>; replAt: number;
}

export function snakeOrder(teams = TEAMS_N, rounds = ROUNDS): number[] {
  const out: number[] = [];
  for (let r = 0; r < rounds; r++) for (let i = 0; i < teams; i++) out.push(r % 2 === 0 ? i : teams - 1 - i);
  return out;
}
const byOvr = (a: Player, b: Player) => b.ovr - a.ovr || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
const GROUPS = Array.from(new Set(SLOTS.map((s) => s.dest as string)));

export function newDraft(players: readonly Player[], rng: Rng, cfg: DraftConfig = DEFAULT_CONFIG, order: number[] = snakeOrder()): DraftState {
  const pool = players.filter((p) => p.role !== 'LS').slice().sort(byOvr);
  const tr = rng.fork('traits');
  const traits: Traits[] = Array.from({ length: TEAMS_N }, () => ({
    noise: 0.05 + tr.next() * (cfg.noiseMax - 0.05), miss: tr.next() * cfg.missMax,
    bias: Object.fromEntries(GROUPS.map((g) => {
      const u = tr.next();
      return [g, u < cfg.hyperP / 2 ? 0.05 + tr.next() * 0.3 : u < cfg.hyperP ? 2 + tr.next() * 3 : Math.exp(cfg.biasSd * tr.normal())];
    })),
  }));
  return { cfg, order, pos: 0, pool, rosters: Array.from({ length: TEAMS_N }, () => ({})), traits, log: [], repl: {}, replAt: -99 };
}
export const roundOf = (st: DraftState): number => Math.floor(st.pos / TEAMS_N) + 1;
export const openSlots = (r: Roster): SlotId[] => SLOT_IDS.filter((s) => !r[s]);

// Replacement level per role: the OVR of the Nth best player left, N = how many open spots across the league want that role.
function replacement(st: DraftState): Partial<Record<Role, number>> {
  if (st.pos === st.replAt) return st.repl;
  const demand: Partial<Record<Role, number>> = {};
  for (const r of st.rosters) for (const s of openSlots(r)) { const role = supplyRole(DEST_OF[s]); demand[role] = (demand[role] ?? 0) + 1; }
  const by: Partial<Record<Role, number[]>> = {};
  for (const p of st.pool) (by[p.role] ??= []).push(p.ovr);
  const out: Partial<Record<Role, number>> = {};
  for (const role of Object.keys(demand) as Role[]) { const a = by[role] ?? []; out[role] = a.length ? at(a, Math.min(demand[role] ?? 1, a.length) - 1) : 0; }
  st.repl = out; st.replAt = st.pos;
  return out;
}

export interface Candidate { player: Player; slot: SlotId; eff: number; wins: number }   // wins: weight x (eff - replacement), the model's value in weight-OVR units
// Every (player, open spot) pair that is natural or a listed flex (no emergency fills), best 16 per role.
export function candidates(st: DraftState, team: number): Candidate[] {
  const open = openSlots(at(st.rosters, team)), repl = replacement(st), seen: Partial<Record<Role, number>> = {}, out: Candidate[] = [];
  const round = roundOf(st);
  for (const p of st.pool) {
    const n = (seen[p.role] = (seen[p.role] ?? 0) + 1);
    if (n > 16) continue;
    if ((p.role === 'K' || p.role === 'P') && round < st.cfg.kpFirstRound) continue;
    for (const s of open) {
      const f = fit(p.role, DEST_OF[s]);
      if (!f.legal || f.emergency) continue;
      const eff = p.ovr - f.penalty, rl = Math.max(repl[supplyRole(DEST_OF[s])] ?? 0, st.cfg.replFloor);
      out.push({ player: p, slot: s, eff, wins: WEIGHT[s] * (eff - rl) });
    }
  }
  return out;
}

function floorFor(st: DraftState): number {
  const top = st.pool.length ? at(st.pool, 0).ovr : 0, r = roundOf(st), c = st.cfg;
  return r <= c.topFloorRounds ? top - c.topFloor : r <= c.midFloorRounds ? top - c.midFloor : -Infinity;
}
// The CPU's choice for `team`, with its own taste and noise; never below the round's floor.
export function cpuChoose(st: DraftState, team: number, rng: Rng): { player: Player; slot: SlotId } {
  const tr = at(st.traits, team), floor = floorFor(st);
  let cs = candidates(st, team).filter((c) => c.player.ovr >= floor);
  if (!cs.length) cs = candidates(st, team);
  if (!cs.length) return emergency(st, team);
  const scored = cs.map((c) => ({ c, v: c.wins * (tr.bias[DEST_OF[c.slot]] ?? 1) * Math.max(0.02, 1 + tr.noise * rng.normal()) + 0.002 * c.player.ovr }));
  scored.sort((a, b) => b.v - a.v);
  let k = 0;
  if (scored.length > 8 && rng.next() < tr.miss) k = Math.min(scored.length - 1, 3 + Math.min(9, Math.floor(Math.abs(rng.normal()) * 4)));
  const chosen = at(scored, k).c;
  return { player: chosen.player, slot: chosen.slot };
}
// No natural or flex fit left for any open spot: the best player left (not a QB) takes an open spot at the emergency price.
function emergency(st: DraftState, team: number): { player: Player; slot: SlotId } {
  const open = openSlots(at(st.rosters, team));
  for (const p of st.pool) for (const s of open) if (fit(p.role, DEST_OF[s]).legal) return { player: p, slot: s };
  throw new Error('draft: no legal pick for team ' + team);
}

export function applyPick(st: DraftState, team: number, player: Player, slot: SlotId): Pick {
  if (st.order[st.pos] !== team) throw new Error(`draft: it is not team ${team}'s pick`);
  if (at(st.rosters, team)[slot]) throw new Error('draft: spot already filled ' + slot);
  const i = st.pool.findIndex((p) => p.id === player.id);
  if (i < 0) throw new Error('draft: player already taken ' + player.id);
  if (!fit(player.role, DEST_OF[slot]).legal) throw new Error('draft: illegal fit');
  const top = at(st.pool, 0).ovr;
  st.pool.splice(i, 1);
  at(st.rosters, team)[slot] = player;
  const pick: Pick = { overall: st.pos + 1, round: roundOf(st), pickInRound: (st.pos % TEAMS_N) + 1, team, slot, player, ovrGap: top - player.ovr };
  st.log.push(pick); st.pos++;
  return pick;
}

// ---- how a user might pick (used by the calibration, and later as board advice) ----
export type UserPolicy = 'greedy' | 'top30' | 'favorites';
export function userChoose(st: DraftState, team: number, rng: Rng, policy: UserPolicy): { player: Player; slot: SlotId } {
  const cs = candidates(st, team);
```
`colors/src/sports/nfl/engine/slots.ts` (excerpt, VERIFIED):
```ts
// The 32-spot table (ENGINE-MATH-SPEC REV 5, Owner-approved; QB = 1000; 3 Nov re-measured after the Owner-approved receiving-spec and focus-dial changes, nearest 5, error at most 2.5) and the
// formations that decide which spots are on the field. Pure data and small functions: no DOM, no randomness.
//
// A SLOT is a roster spot (the draft fills 32 of them, one per round). A SLOT's `dest` is the name the flex guide
// uses for it (a role, or NICKEL = the CB3 spot, DIME = the sixth defensive back, DL5 = the rotational fifth lineman).
import type { Role } from './players.ts';

export type Dest = Role | 'NICKEL' | 'DIME' | 'DL5';
export type SlotId =
  | 'QB' | 'RB1' | 'RB2' | 'FB' | 'WR1' | 'WR2' | 'WR3' | 'WR4' | 'TE1' | 'TE2' | 'TE3'
  | 'OT1' | 'OT2' | 'OG1' | 'OG2' | 'C'
  | 'DE1' | 'DE2' | 'DT1' | 'DT2' | 'DL5' | 'MIKE' | 'WILL' | 'SAM'
  | 'CB1' | 'CB2' | 'CB3' | 'DIME' | 'SS' | 'FS' | 'K' | 'P';
export type Unit = 'offense' | 'defense' | 'special';

export interface SlotDef { id: SlotId; weight: number; dest: Dest; unit: Unit }

// Weights are the engine's fitted inputs (lineup and draft maths), in one fixed unit (1 point = 0.00254 wins over a 70 -> 90 upgrade).
// Owner 8 Nov: the salary table they were fitted to is retired (reference only); the DISPLAYED weights are measuredDisplayWeights() in value.ts.
// Source: _agents/ENGINE-MATH-SPEC.md section 2 plus REV 4 (DL5 140) and REV 5 (TE3 10, WR4 10); equal to
// tools/mathlab/design.json, which a test compares key by key.
export const SLOTS: readonly SlotDef[] = [
  { id: 'QB', weight: 1000, dest: 'QB', unit: 'offense' },
  { id: 'WR1', weight: 650, dest: 'WR', unit: 'offense' },
  { id: 'OT1', weight: 500, dest: 'OT', unit: 'offense' },
  { id: 'OT2', weight: 300, dest: 'OT', unit: 'offense' },
  { id: 'WR2', weight: 400, dest: 'WR', unit: 'offense' },
  { id: 'C', weight: 150, dest: 'C', unit: 'offense' },
  { id: 'OG1', weight: 400, dest: 'OG', unit: 'offense' },
  { id: 'OG2', weight: 250, dest: 'OG', unit: 'offense' },
  { id: 'TE1', weight: 250, dest: 'TE', unit: 'offense' },
  { id: 'RB1', weight: 250, dest: 'RB', unit: 'offense' },
  { id: 'WR3', weight: 100, dest: 'WR', unit: 'offense' },
  { id: 'RB2', weight: 100, dest: 'RB', unit: 'offense' },
  { id: 'TE2', weight: 150, dest: 'TE', unit: 'offense' },
  { id: 'FB', weight: 25, dest: 'FB', unit: 'offense' },
  { id: 'TE3', weight: 50, dest: 'TE', unit: 'offense' },
  { id: 'WR4', weight: 50, dest: 'WR', unit: 'offense' },
  { id: 'DE1', weight: 650, dest: 'EDGE', unit: 'defense' },
  { id: 'DT1', weight: 500, dest: 'DT', unit: 'defense' },
  { id: 'DE2', weight: 300, dest: 'EDGE', unit: 'defense' },
  { id: 'DT2', weight: 300, dest: 'DT', unit: 'defense' },
  { id: 'DL5', weight: 150, dest: 'DL5', unit: 'defense' },
  { id: 'MIKE', weight: 300, dest: 'ILB', unit: 'defense' },
  { id: 'WILL', weight: 150, dest: 'OLB', unit: 'defense' },
  { id: 'SAM', weight: 100, dest: 'OLB', unit: 'defense' },
  { id: 'CB1', weight: 400, dest: 'CB', unit: 'defense' },
  { id: 'CB2', weight: 250, dest: 'CB', unit: 'defense' },
  { id: 'CB3', weight: 100, dest: 'NICKEL', unit: 'defense' },
  { id: 'DIME', weight: 50, dest: 'DIME', unit: 'defense' },
  { id: 'FS', weight: 300, dest: 'FS', unit: 'defense' },
  { id: 'SS', weight: 300, dest: 'SS', unit: 'defense' },
  { id: 'K', weight: 50, dest: 'K', unit: 'special' },
  { id: 'P', weight: 50, dest: 'P', unit: 'special' },
];

export const SLOT_IDS: readonly SlotId[] = SLOTS.map((s) => s.id);
export const WEIGHT: Readonly<Record<SlotId, number>> = Object.fromEntries(SLOTS.map((s) => [s.id, s.weight])) as Record<SlotId, number>;

export type Base = '4-3' | '3-4';

// One spot as it plays under a formation. `row` is the spot whose weights and spec rows the math uses for it
// (Owner 25 Oct: "OLB are treated the same as WILLs, ILB the same as MIKEs"), `label` is the name the user sees.
export interface FieldSlot { slot: SlotId; dest: Dest; row: SlotId; weight: number; label: string }

const LABEL: Partial<Record<SlotId, string>> = {
  WR1: 'WR1', MIKE: 'MIKE', WILL: 'WILL', SAM: 'SAM', CB3: 'Nickel', DE1: 'DE1', DE2: 'DE2',
};

// 4-3: every spot plays as itself. 3-4 (Owner 2 Nov, relayed by KG; supersedes the 25 and 29 Oct rulings): the same position
// carries the same weight in both bases, so 4-3 or 3-4 is a pure personnel decision. DT2 is traded for ILB2, who is rated as
// DT2 (weight 300); WILL becomes OLB1 (rated as WILL); SAM becomes OLB2 and keeps the SAM rating (weight 30); DT1 is the nose
// tackle; MIKE is ILB1. The old "OLB2 equal with DT2" ruling is dead. DL5 and the DB spots are unchanged in a 3-4 (a 3-4 DL5
// is INFERRED to stay a rotational lineman; not measured).
export function fieldSlots(base: Base): FieldSlot[] {
  return SLOTS.map((s): FieldSlot => {
    const plain: FieldSlot = { slot: s.id, dest: s.dest, row: s.id, weight: s.weight, label: LABEL[s.id] ?? s.id };
    if (base === '4-3') return plain;
    switch (s.id) {
      case 'DT1': return { ...plain, label: 'NT' };
      case 'MIKE': return { ...plain, label: 'ILB1' };
      case 'DT2': return { slot: 'DT2', dest: 'ILB', row: 'DT2', weight: WEIGHT.DT2, label: 'ILB2' };
      case 'WILL': return { slot: 'WILL', dest: 'OLB', row: 'WILL', weight: WEIGHT.WILL, label: 'OLB1' };
      case 'SAM': return { ...plain, label: 'OLB2' };
      default: return plain;
    }
  });
}

// DL5, the rotational fifth lineman (Owner 27 and 29 Oct): he comes on for rotation and for heavy defensive sets, stopping
// the run on x & short and especially near the goal line, and he plays more when the user chooses aggressive defence and
// blitzes a lot. The share of defensive snaps he is on the field:
//  * balanced 0.33 is MEASURED (1,632 team-games 2023-25, spec 12.1) and already includes short-yardage snaps;
//  * cautious = balanced (the Owner named no change);
//  * aggressive 0.40 is INFERRED (the top of the measured middle half is 0.44; spec 12.4 shows the value moves 137 -> 167).
// The drive generator (step 6) raises it per play on short-yardage and goal-line downs; this is the season-long average.
export type Posture = 'cautious' | 'balanced' | 'aggressive';
export const DL5_SHARE: Readonly<Record<Posture, number>> = { cautious: 0.33, balanced: 0.33, aggressive: 0.40 };
```
`colors/src/sports/nfl/engine/season.ts` (excerpt, VERIFIED):
```ts
// A season: the schedule, every game through the drive generator, standings, seeding and the playoffs to the Super Bowl.
// Plans: each team plays its coaching identity (teamIdentity: the plan it would pick against an average opponent). Week-by-week mixed plans
// (Pre-Colors choosePlans/samplePlans) and the user's own plan choices are not ported yet.
import { simulateGame } from './drives.ts';
import type { GameResult } from './drives.ts';
import { TEAM_BY_NAME, TEAMS, DIVS, divisionTeams } from './league.ts';
import type { Conf } from './league.ts';
import { matchupModel } from './matchup.ts';
import type { Plan } from './specs.ts';
import { teamIdentity } from './plans.ts';
import { leagueBaseline } from './ratings.ts';
import type { Ratings } from './ratings.ts';
import type { Rng } from '../../../core/rng.ts';
import { at, need } from '../../../core/at.ts';
import { buildSchedule } from './schedule.ts';
import type { Game } from './schedule.ts';
import { seedPlayoffs } from './standings.ts';
import type { Played, Seeding } from './standings.ts';

export interface LeagueTeam { name: string; ratings: Ratings }
export type Round = 'Wild Card' | 'Divisional' | 'Conference' | 'Super Bowl';
export interface GameLog { week: number; round?: Round; kind: Game['kind'] | 'playoff'; home: string; away: string; homeField?: number | undefined; result: GameResult }
export interface Record3 { w: number; l: number; t: number; pf: number; pa: number }
export interface SeasonResult {
  year: number; schedule: Game[]; games: GameLog[]; playoffs: GameLog[]; seeding: Seeding;
  table: Record<string, Record3>; champion: string; finalists: [string, string]; nextRank: Record<string, number>;
}

// last season's division finish for a first season: by team strength (offence + defence)
export function initialRanks(teams: readonly LeagueTeam[]): Record<string, number> {
  const by = Object.fromEntries(teams.map((t) => [t.name, t.ratings])) as Record<string, Ratings>, rank: Record<string, number> = {};
  for (const c of ['AFC', 'NFC'] as const) for (const d of DIVS) divisionTeams(c, d).sort((a, b) => need(by, b).off + need(by, b).def - need(by, a).off - need(by, a).def).forEach((n, i) => (rank[n] = i + 1));
  return rank;
}

export function simulateSeason(teams: readonly LeagueTeam[], rng: Rng, opts: { year: number; prevRank?: Record<string, number>; homeField?: number }): SeasonResult {
  if (teams.length !== 32) throw new Error('season: 32 teams needed');
  const by = new Map(teams.map((t) => [t.name, t.ratings]));
  for (const t of TEAMS) if (!by.has(t.name)) throw new Error('season: missing team ' + t.name);
  const lg = leagueBaseline(teams.map((t) => t.ratings));
  const plan = new Map<string, Plan>();
  for (const t of teams) { const id = teamIdentity(t.ratings, lg); plan.set(t.name, { off: id.off, def: id.def }); }
  const play = (home: string, away: string, playoff: boolean, label: string, hf?: number): GameResult => {
    const H = by.get(home)!, A = by.get(away)!;
    const mh = matchupModel(H, A, lg, { off: plan.get(home)!.off, def: plan.get(away)!.def }), ma = matchupModel(A, H, lg, { off: plan.get(away)!.off, def: plan.get(home)!.def });
    return simulateGame(mh, ma, rng.fork(label), { playoff, homeField: hf ?? opts.homeField });
  };
  const schedule = buildSchedule(rng.fork('schedule'), opts.year, opts.prevRank ?? initialRanks(teams));
  const games: GameLog[] = schedule.slice().sort((a, b) => a.week - b.week).map((g) => ({ week: g.week, kind: g.kind, home: g.home, away: g.away, result: play(g.home, g.away, false, `w${g.week}:${g.home}`) }));
  const played: Played[] = games.map((g) => ({ home: g.home, away: g.away, hs: g.result.homeScore, as: g.result.awayScore, htd: tds(g.result, 'home'), atd: tds(g.result, 'away') }));
  const table: Record<string, Record3> = Object.fromEntries(TEAMS.map((t) => [t.name, { w: 0, l: 0, t: 0, pf: 0, pa: 0 }]));
  for (const p of played) {
    const h = need(table, p.home), a = need(table, p.away);
    h.pf += p.hs; h.pa += p.as; a.pf += p.as; a.pa += p.hs;
    if (p.hs > p.as) { h.w++; a.l++; } else if (p.hs < p.as) { a.w++; h.l++; } else { h.t++; a.t++; }
  }
  const seeding = seedPlayoffs(played, rng.fork('seeding'));
  const playoffs: GameLog[] = [];
  const meet = (round: Round, hi: string, lo: string, week: number): string => {
    const hf = round === 'Super Bowl' ? 0 : opts.homeField, r = play(hi, lo, true, `po:${round}:${hi}`, hf);
    playoffs.push({ week, round, kind: 'playoff', home: hi, away: lo, homeField: hf, result: r });
    return r.homeScore > r.awayScore ? hi : lo;
  };
  const champs: Record<Conf, string> = { AFC: '', NFC: '' };
  for (const conf of ['AFC', 'NFC'] as const) {
    const s = seeding.seeds[conf], seedOf = (t: string) => s.indexOf(t) + 1;
    const wc = ([[2, 7], [3, 6], [4, 5]] as const).map(([h, l]) => meet('Wild Card', at(s, h - 1), at(s, l - 1), 19));
    const alive = [at(s, 0), ...wc].sort((a, b) => seedOf(a) - seedOf(b));      // the #1 seed and the three winners
    const lowest = at(alive, alive.length - 1);
    const dv = [meet('Divisional', at(alive, 0), lowest, 20), meet('Divisional', at(alive, 1), at(alive, 2), 20)].sort((a, b) => seedOf(a) - seedOf(b));
    champs[conf] = meet('Conference', at(dv, 0), at(dv, 1), 21);
  }
  const hostIsAfc = opts.year % 2 === 1;   // the designated home team of the Super Bowl alternates; there is no home-field edge
  const [sbHome, sbAway] = hostIsAfc ? [champs.AFC, champs.NFC] : [champs.NFC, champs.AFC];
  const champion = meet('Super Bowl', sbHome, sbAway, 22);
  return { year: opts.year, schedule, games, playoffs, seeding, table, champion, finalists: [sbHome, sbAway], nextRank: seeding.divisionRank };
}
export function tds(r: GameResult, side: 'home' | 'away'): number { return r.events.filter((e) => e.side === side && (e.kind === 'TD' || e.kind === 'DEF_TD')).length; }
export { TEAM_BY_NAME };
```

**Per-unit work (INFERRED):** per pick — generate/score candidates over role-capped pool × open slots (flex legality/penalty, replacement demand, weights), choose, mutate pool/roster/log; UI hot path is repeated reactive list/board updates over 1,024 picks plus downstream season sim/render.

**Proposed measurements/harness (spec):** (a) plain-TS micro/bench of 1,024-pick draft + season steps across seeds (framework-neutral baseline); (b) Playwright-driven UI runs in prod builds advancing picks/auto-draft chunks capturing Performance long tasks, update latency, total time, console errors; (c) full-run stress (1,024 picks + season/recap) with identical data/seeds/browser/profile; (d) report medians/p95/distributions. All require Owner-authorized scope/data — UNKNOWN until executed.

## C3. Type-safety surface for `{ team: TeamRecord, onPick: (slotId: SlotId) => void }`
**Vue 3 (`<script setup lang="ts">`, `defineProps`/`defineEmits` sketch, INFERRED):**
```vue
<script setup lang="ts">
import type { SlotId, TeamRecord } from './types'
const props = defineProps<{ team: TeamRecord }>()
const emit = defineEmits<{ pick: [slotId: SlotId] }>()
function choose(slotId: SlotId) { emit('pick', slotId) }
</script>
```
Compile-time prop typing via generic `defineProps`; typed emits/signatures supported. Template inference/tooling quality depends on Volar/vue-tsc.

**Svelte 5 (`$props()` + interface sketch, INFERRED):**
```svelte
<script lang="ts">
  import type { SlotId, TeamRecord } from './types'
  interface Props { team: TeamRecord; onPick: (slotId: SlotId) => void }
  let { team, onPick }: Props = $props();
</script>
```
Props/callback typed via TS interface and destructured `$props()`; callback contract explicit. Relative compile-time safety vs Vue emits/props is pattern- and tooling-dependent — **UNKNOWN** as a blanket winner without concrete checks.

## C4. Observability substrate (snapshot/replay/recap diffs) — proposal & question
**Minimum substrate (INFERRED):** framework-neutral, deterministic, serializable engine core (seeded RNG/state transitions) emitting event logs/snapshots; replay by reapplying events/seeds; structured recap outputs diffable as data. UI tests assert projections of those artifacts.

**Scaffold runners (VERIFIED):** Vue — Vitest (jsdom) + `@vue/test-utils`, Playwright e2e (5173). Svelte — Vitest (node env per config) + Playwright e2e (5174); Svelte component-testing setup for jsdom/rendered snapshots not evidenced beyond current config (UNKNOWN). Both can host Playwright flows; engine snapshot/replay tests fit best in plain TS/Vitest if engine is isolated.

**QUESTION to Owner:** Should snapshot/replay/recap-diff tests be implemented in the plain-TS engine layer before UI/framework integration work? (No answer assumed.)
