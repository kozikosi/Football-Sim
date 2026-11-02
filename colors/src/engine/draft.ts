// The draft: 32 teams, a snake order, 32 rounds (one per roster spot), every player available from round 1.
// CPU front offices value a player the way the season does (wins above a replacement-level player at the spot he would fill),
// each with its own taste (per-group bias), noise and rate of misses, but in the early rounds nobody takes a player
// more than a few OVR below the best one on the board (Owner 31 Oct: "within around 5 OVR of the top OVR player on the
// board for the cpu picks", extremely suboptimal picks are fine in the later rounds). Pure: every draw comes from an Rng.
import { fit } from './flex.ts';
import type { Player, Role } from './players.ts';
import type { Rng } from './rng.ts';
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
  if (st.pos - st.replAt < 6) return st.repl;
  const demand: Partial<Record<Role, number>> = {};
  for (const r of st.rosters) for (const s of openSlots(r)) { const role = supplyRole(DEST_OF[s]); demand[role] = (demand[role] ?? 0) + 1; }
  const by: Partial<Record<Role, number[]>> = {};
  for (const p of st.pool) (by[p.role] ??= []).push(p.ovr);
  const out: Partial<Record<Role, number>> = {};
  for (const role of Object.keys(demand) as Role[]) { const a = by[role] ?? []; out[role] = a.length ? a[Math.min(demand[role] ?? 1, a.length) - 1] : 0; }
  st.repl = out; st.replAt = st.pos;
  return out;
}

export interface Candidate { player: Player; slot: SlotId; eff: number; wins: number }   // wins: weight x (eff - replacement), the model's value in weight-OVR units
// Every (player, open spot) pair that is natural or a listed flex (no emergency fills), best 16 per role.
export function candidates(st: DraftState, team: number): Candidate[] {
  const open = openSlots(st.rosters[team]), repl = replacement(st), seen: Partial<Record<Role, number>> = {}, out: Candidate[] = [];
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
  const top = st.pool.length ? st.pool[0].ovr : 0, r = roundOf(st), c = st.cfg;
  return r <= c.topFloorRounds ? top - c.topFloor : r <= c.midFloorRounds ? top - c.midFloor : -Infinity;
}
// The CPU's choice for `team`, with its own taste and noise; never below the round's floor.
export function cpuChoose(st: DraftState, team: number, rng: Rng): { player: Player; slot: SlotId } {
  const tr = st.traits[team], floor = floorFor(st);
  let cs = candidates(st, team).filter((c) => c.player.ovr >= floor);
  if (!cs.length) cs = candidates(st, team);
  if (!cs.length) return emergency(st, team);
  const scored = cs.map((c) => ({ c, v: c.wins * (tr.bias[DEST_OF[c.slot]] ?? 1) * Math.max(0.02, 1 + tr.noise * rng.normal()) + 0.002 * c.player.ovr }));
  scored.sort((a, b) => b.v - a.v);
  let k = 0;
  if (scored.length > 8 && rng.next() < tr.miss) k = Math.min(scored.length - 1, 3 + Math.min(9, Math.floor(Math.abs(rng.normal()) * 4)));
  return { player: scored[k].c.player, slot: scored[k].c.slot };
}
// No natural or flex fit left for any open spot: the best player left (not a QB) takes an open spot at the emergency price.
function emergency(st: DraftState, team: number): { player: Player; slot: SlotId } {
  const open = openSlots(st.rosters[team]);
  for (const p of st.pool) for (const s of open) if (fit(p.role, DEST_OF[s]).legal) return { player: p, slot: s };
  throw new Error('draft: no legal pick for team ' + team);
}

export function applyPick(st: DraftState, team: number, player: Player, slot: SlotId): Pick {
  if (st.order[st.pos] !== team) throw new Error(`draft: it is not team ${team}'s pick`);
  if (st.rosters[team][slot]) throw new Error('draft: spot already filled ' + slot);
  const i = st.pool.findIndex((p) => p.id === player.id);
  if (i < 0) throw new Error('draft: player already taken ' + player.id);
  if (!fit(player.role, DEST_OF[slot]).legal) throw new Error('draft: illegal fit');
  const top = st.pool[0].ovr;
  st.pool.splice(i, 1);
  st.rosters[team][slot] = player;
  const pick: Pick = { overall: st.pos + 1, round: roundOf(st), pickInRound: (st.pos % TEAMS_N) + 1, team, slot, player, ovrGap: top - player.ovr };
  st.log.push(pick); st.pos++;
  return pick;
}

// ---- how a user might pick (used by the calibration, and later as board advice) ----
export type UserPolicy = 'greedy' | 'top30' | 'favorites';
export function userChoose(st: DraftState, team: number, rng: Rng, policy: UserPolicy): { player: Player; slot: SlotId } {
  const cs = candidates(st, team);
  if (!cs.length) return emergency(st, team);
  if (policy === 'greedy') { cs.sort((a, b) => b.wins - a.wins || b.player.ovr - a.player.ovr); return cs[0]; }
  if (policy === 'top30') { cs.sort((a, b) => b.wins - a.wins); return rng.pick(cs.slice(0, 30)); }
  // favorites: takes the best-rated players with no regard to the spot's worth (any open spot he fits, the cheapest first)
  cs.sort((a, b) => b.player.ovr - a.player.ovr || WEIGHT[a.slot] - WEIGHT[b.slot]);
  const best = cs[0].player.ovr, same = cs.filter((c) => c.player.ovr === best);
  same.sort((a, b) => WEIGHT[a.slot] - WEIGHT[b.slot]);
  return same[0];
}

// Runs the whole draft; `user` (team index) picks by `policy`, everyone else by cpuChoose.
export function runDraft(st: DraftState, rng: Rng, user?: { team: number; policy: UserPolicy }): void {
  const r = rng.fork('picks'), ru = rng.fork('user');
  while (st.pos < st.order.length) {
    const team = st.order[st.pos];
    const c = user && user.team === team ? userChoose(st, team, ru, user.policy) : cpuChoose(st, team, r);
    applyPick(st, team, c.player, c.slot);
  }
}
