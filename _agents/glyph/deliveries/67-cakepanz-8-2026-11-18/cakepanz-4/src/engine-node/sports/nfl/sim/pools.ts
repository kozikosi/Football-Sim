// 1c: the REAL pack. Phase 1's stratified pools of penalty-free nflverse plays, baked by tools/mathlab/phase1/bake.py and loaded here.
// A pool is a pmf over unique outcome tuples (cell x tuple x count rows): sampling a cell uniformly over plays and sampling a tuple by its count
// are the same distribution, so this is exactly the Python lab's pools, in a fraction of the bytes. Bin edges are PACK DATA (params.bins): the
// baker and this loader cut a state into a cell with the same numbers, so Python and TypeScript cannot disagree on a threshold.
// Hierarchy (as the lab): the finest cell with at least `minPool` plays wins; coarser pools back it up. Nothing here draws a random number: the
// pickers take a uniform u in [0,1) from the caller (a keyed draw), so a draw is a pure function of (game, event, tag).
// Pure: only comparisons, + - * /; no Math.exp/log/pow (the portability lint covers this folder).
import type { ModelPack } from '../../../core/pack.ts';
import { at } from '../../../core/at.ts';

export const CALL = { pass: 0, run: 1, punt: 2, fg: 3, kneel: 4, spike: 5 } as const;
export const OC = { comp: 0, inc: 1, sack: 2, int: 3, run: 4, punt: 5, fg: 6, kneel: 7, spike: 8 } as const;

export interface Bins { readonly dist: readonly number[]; readonly distC: readonly number[]; readonly ydl: readonly number[]; readonly ydlC: readonly number[]; readonly sd: readonly number[]; readonly sd3: readonly number[]; readonly yb: readonly number[] }
// A pool is the cumulative weights of its members, so one uniform picks one member: member k is chosen when cum[k-1] <= u*total < cum[k].
export interface Pool { readonly ids: Int32Array; readonly cum: Float64Array; readonly total: number }
export interface Tuples {
  readonly oc: Int8Array; readonly yards: Float64Array; readonly td: Int8Array; readonly deftd: Int8Array; readonly fum: Int8Array; readonly safety: Int8Array;
  readonly fg: Int8Array; readonly nd: Float64Array; readonly ndsame: Int8Array; readonly ndown: Float64Array; readonly delta: Float64Array;
  readonly pa: Int8Array; readonly ra: Int8Array; readonly comp: Int8Array; readonly sack: Int8Array;
}
export interface Pools {
  readonly id: string; readonly bins: Bins; readonly minPool: number; readonly minClock: number;
  readonly trans: 'empirical' | 'computed'; readonly clock: 'dt_f' | 'dt_pf';
  readonly tuples: Tuples;
  readonly rec: readonly Map<number, Pool>[];           // 4 levels, finest first; keyed by packed (call, down, distBin, ydlBin)
  readonly call: readonly Map<number, Pool>[];          // 5 levels; the member id is the call (0..5)
  readonly clockLate: readonly Map<number, Pool>[];     // 4 levels; the member id is the seconds
  readonly clockNon: readonly Map<number, Pool>[];      // 2 levels
  readonly kick: { readonly pool: Pool; readonly nd: Float64Array; readonly same: Int8Array; readonly dt: Float64Array };
  readonly xp: { readonly pGo2: number; readonly pMake2: number; readonly pMake1: number };
  readonly points: { readonly td: number; readonly fg: number; readonly safety: number };
  readonly halfSecs: number; readonly otSecs: number;
}

// ---- state -> bin helpers (pure) ----
// number of edges <= x (Python bisect_right)
export function binOf(edges: readonly number[], x: number): number {
  let lo = 0, hi = edges.length;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (at(edges, mid) <= x) lo = mid + 1; else hi = mid; }
  return lo;
}
// time bucket inside a half: 6 = quarters 1 and 3 (no clock pressure); 0..5 = quarter 2/4 by half seconds left
export function tmb(qtr: number, hs: number): number {
  if (qtr === 1 || qtr === 3) return 6;
  return hs <= 40 ? 0 : hs <= 120 ? 1 : hs <= 300 ? 2 : hs <= 600 ? 3 : hs <= 900 ? 4 : 5;
}
// mixed radix base 32 (every component is < 32): a cell is one integer, so lookups hash a number, not a string
const P = (a: number, b: number): number => a * 32 + b;
export const k2 = (a: number, b: number): number => P(a, b);
export const k3 = (a: number, b: number, c: number): number => P(P(a, b), c);
export const k4 = (a: number, b: number, c: number, d: number): number => P(P(P(a, b), c), d);
export const k6 = (a: number, b: number, c: number, d: number, e: number, f: number): number => P(P(P(P(P(a, b), c), d), e), f);

export function callKeys(B: Bins, down: number, ytg: number, ydl: number, sd: number, qtr: number, hs: number): number[] {
  const t = tmb(qtr, hs), h = qtr >= 3 ? 1 : 0, late = t <= 2, t4 = t <= 4;
  const d = binOf(B.dist, ytg), y = binOf(B.ydl, ydl), yc = binOf(B.ydlC, ydl), dc = binOf(B.distC, ytg), s9 = binOf(B.sd, sd), s3 = binOf(B.sd3, sd);
  return [
    k6(down, d, y, s9, t, h),
    k6(down, d, y, t4 ? s3 : 9, t4 ? Math.min(t, 4) : 6, t4 ? h : 0),
    k6(down, d, yc, late ? s3 : 9, late ? 3 : 6, late ? h : 0),
    k3(down, dc, yc),
    k2(down, yc),
  ];
}
export function recKeys(B: Bins, call: number, down: number, ytg: number, ydl: number): number[] {
  const y = binOf(B.ydl, ydl);
  return [k4(call, down, binOf(B.dist, ytg), y), k4(call, Math.min(down, 3), binOf(B.distC, ytg), y), k2(call, y), call];
}
export function clockLateKeys(B: Bins, oc: number, qtr: number, hs: number, sd: number): number[] {
  const h = qtr >= 3 ? 1 : 0, t = tmb(qtr, hs);
  return [k4(oc, h, t, binOf(B.sd3, sd)), k3(oc, h, t), k2(oc, t), oc];
}
export function clockNonKeys(B: Bins, oc: number, yards: number): number[] { return [k2(oc, binOf(B.yb, yards)), oc]; }

// First level whose pool has at least `minn` members; else the coarsest level's pool for the key; else (a hole) the largest pool at the coarsest level.
export function pick(levels: readonly Map<number, Pool>[], keys: readonly number[], minn: number, stat: number[], slot: number): Pool {
  for (let L = 0; L < levels.length; L++) {
    const p = at(levels, L).get(at(keys, L));
    if (p !== undefined && p.total >= minn) return p;
  }
  const last = at(levels, levels.length - 1);
  const p = last.get(at(keys, keys.length - 1));
  if (p !== undefined) return p;
  stat[slot] = (stat[slot] ?? 0) + 1;
  let best: Pool | undefined;
  for (const q of last.values()) if (best === undefined || q.total > best.total) best = q;
  if (best === undefined) throw new Error('pools: empty table');
  return best;
}
// One uniform -> one member id of the pool.
export function sample(pool: Pool, u: number): number {
  const target = u * pool.total;
  let lo = 0, hi = pool.cum.length - 1;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (target < at(pool.cum, mid)) hi = mid; else lo = mid + 1; }
  return at(pool.ids, lo);
}

// ---- loading ----
type Rec = Record<string, unknown>;
const rec = (x: unknown, what: string): Rec => { if (typeof x !== 'object' || x === null || Array.isArray(x)) throw new Error(`pools: ${what} must be an object`); return x as Rec; };
const arr = (x: unknown, what: string): unknown[] => { if (!Array.isArray(x)) throw new Error(`pools: ${what} must be an array`); return x; };
const nums = (x: unknown, what: string): number[] => {
  const a = arr(x, what);
  for (let i = 0; i < a.length; i++) if (typeof a[i] !== 'number' || !Number.isFinite(a[i] as number)) throw new Error(`pools: ${what}[${i}] must be a finite number`);
  return a as number[];
};
const numsOrNull = (x: unknown, what: string): (number | null)[] => {
  const a = arr(x, what);
  for (let i = 0; i < a.length; i++) if (a[i] !== null && (typeof a[i] !== 'number' || !Number.isFinite(a[i] as number))) throw new Error(`pools: ${what}[${i}] must be a number or null`);
  return a as (number | null)[];
};
function poolOf(members: Map<number, number>): Pool {          // member id -> weight
  const ids = [...members.keys()].sort((a, b) => a - b);
  const cum = new Float64Array(ids.length); let total = 0;
  for (let i = 0; i < ids.length; i++) { total += members.get(at(ids, i)) as number; cum[i] = total; }
  return { ids: Int32Array.from(ids), cum, total };
}
function addTo(map: Map<number, Map<number, number>>, key: number, id: number, w: number): void {
  let m = map.get(key);
  if (m === undefined) { m = new Map(); map.set(key, m); }
  m.set(id, (m.get(id) ?? 0) + w);
}
function finish(map: Map<number, Map<number, number>>): Map<number, Pool> {
  const out = new Map<number, Pool>();
  for (const [k, m] of map) out.set(k, poolOf(m));
  return out;
}

export function loadPools(pack: ModelPack): Pools {
  const rv = pack.rules.values, num = (k: string): number => { const x = rv[k]; if (typeof x !== 'number') throw new Error(`pools: rules.${k} must be a number`); return x; };
  const sv = (k: string): string => { const x = rv[k]; if (typeof x !== 'string') throw new Error(`pools: rules.${k} must be a string`); return x; };
  const trans = sv('trans'), clock = sv('clock');
  if (trans !== 'empirical' && trans !== 'computed') throw new Error('pools: rules.trans must be empirical or computed');
  if (clock !== 'dt_f' && clock !== 'dt_pf') throw new Error('pools: rules.clock must be dt_f or dt_pf');
  const p = rec(pack.params, 'params');
  const b = rec(p['bins'], 'bins');
  const bins: Bins = { dist: nums(b['dist'], 'bins.dist'), distC: nums(b['distC'], 'bins.distC'), ydl: nums(b['ydl'], 'bins.ydl'), ydlC: nums(b['ydlC'], 'bins.ydlC'), sd: nums(b['sd'], 'bins.sd'), sd3: nums(b['sd3'], 'bins.sd3'), yb: nums(b['yb'], 'bins.yb') };

  // tuples (columnar)
  const T = rec(p['tuples'], 'tuples'), nT = nums(T['oc'], 'tuples.oc').length;
  const col = (k: string): number[] => { const c = nums(T[k], 'tuples.' + k); if (c.length !== nT) throw new Error(`pools: tuples.${k} has ${c.length} rows, expected ${nT}`); return c; };
  const colN = (k: string): Float64Array => {                    // null -> NaN (an unknown spot, as in the lab)
    const c = numsOrNull(T[k], 'tuples.' + k); if (c.length !== nT) throw new Error(`pools: tuples.${k} has ${c.length} rows, expected ${nT}`);
    return Float64Array.from(c, (v) => (v === null ? NaN : v));
  };
  const tuples: Tuples = {
    oc: Int8Array.from(col('oc')), yards: Float64Array.from(col('yards')), td: Int8Array.from(col('td')), deftd: Int8Array.from(col('deftd')), fum: Int8Array.from(col('fum')),
    safety: Int8Array.from(col('safety')), fg: Int8Array.from(col('fg')), nd: colN('nd'), ndsame: Int8Array.from(col('ndsame')), ndown: colN('ndown'), delta: colN('delta'),
    pa: Int8Array.from(col('pa')), ra: Int8Array.from(col('ra')), comp: Int8Array.from(col('comp')), sack: Int8Array.from(col('sack')),
  };

  // record pools: level 0 rows, coarser levels are sums of them
  const R = rec(p['rec'], 'rec');
  const rc = nums(R['call'], 'rec.call'), rd = nums(R['down'], 'rec.down'), rdb = nums(R['db'], 'rec.db'), ryb = nums(R['yb'], 'rec.yb'), rt = nums(R['tid'], 'rec.tid'), rn = nums(R['n'], 'rec.n');
  const nR = rc.length;
  for (const [k, c] of [['down', rd], ['db', rdb], ['yb', ryb], ['tid', rt], ['n', rn]] as const) if (c.length !== nR) throw new Error(`pools: rec.${k} has ${c.length} rows, expected ${nR}`);
  const L0 = new Map<number, Map<number, number>>(), L1 = new Map<number, Map<number, number>>(), L2 = new Map<number, Map<number, number>>(), L3 = new Map<number, Map<number, number>>();
  // distC from the dist BIN: distC edges are a subset of dist edges, so a dist bin lies wholly inside one distC bin (checked once below)
  const distCOfBin: number[] = [];
  for (let d = 0; d <= bins.dist.length; d++) {
    const lo = d === 0 ? -Infinity : at(bins.dist, d - 1), hi = d === bins.dist.length ? Infinity : at(bins.dist, d);
    const a = binOf(bins.distC, Number.isFinite(lo) ? lo : -1e9), c = binOf(bins.distC, Number.isFinite(hi) ? hi - 1e-9 : 1e9);
    if (a !== c) throw new Error('pools: distC edges are not a subset of dist edges');
    distCOfBin.push(a);
  }
  let records = 0;
  for (let i = 0; i < nR; i++) {
    const call = at(rc, i), down = at(rd, i), db = at(rdb, i), yb = at(ryb, i), tid = at(rt, i), n = at(rn, i);
    if (!(tid >= 0 && tid < nT)) throw new Error(`pools: rec.tid[${i}] = ${tid} outside 0..${nT - 1}`);
    if (!(n > 0)) throw new Error(`pools: rec.n[${i}] must be positive`);
    records += n;
    addTo(L0, k4(call, down, db, yb), tid, n);
    addTo(L1, k4(call, Math.min(down, 3), at(distCOfBin, db), yb), tid, n);
    addTo(L2, k2(call, yb), tid, n);
    addTo(L3, call, tid, n);
  }
  const counts = rec(p['counts'], 'counts');
  if (counts['records'] !== records) throw new Error(`pools: rec rows hold ${records} plays, counts.records says ${String(counts['records'])}`);

  // call pools
  const callLevels: Map<number, Pool>[] = [];
  arr(p['call'], 'call').forEach((lv, L) => {
    const o = rec(lv, 'call[' + L + ']'), keys = arr(o['keys'], 'call.keys'), cnt = arr(o['counts'], 'call.counts');
    if (keys.length !== cnt.length) throw new Error(`pools: call[${L}] keys and counts differ in length`);
    const m = new Map<number, Map<number, number>>();
    keys.forEach((kr, r) => {
      const ks = nums(kr, 'call key'), cs = nums(cnt[r], 'call counts');
      const key = ks.length === 6 ? k6(at(ks, 0), at(ks, 1), at(ks, 2), at(ks, 3), at(ks, 4), at(ks, 5)) : ks.length === 3 ? k3(at(ks, 0), at(ks, 1), at(ks, 2)) : ks.length === 2 ? k2(at(ks, 0), at(ks, 1)) : NaN;
      if (Number.isNaN(key)) throw new Error(`pools: call[${L}] has a key of length ${ks.length}`);
      cs.forEach((c, call) => { if (c > 0) addTo(m, key, call, c); });
    });
    callLevels.push(finish(m));
  });
  if (callLevels.length !== 5) throw new Error(`pools: expected 5 call levels, got ${callLevels.length}`);

  // clock pools for the pack's chosen clock variant
  const clk = rec(rec(p['clock'], 'clock')[clock], 'clock.' + clock);
  const clockLevels = (part: string, want: number): Map<number, Pool>[] => {
    const lv = arr(clk[part], 'clock.' + part);
    if (lv.length !== want) throw new Error(`pools: clock.${part} must have ${want} levels`);
    return lv.map((x, L) => {
      const o = rec(x, `clock.${part}[${L}]`), keys = arr(o['keys'], 'clock keys'), dts = nums(o['dt'], 'clock dt'), ns = nums(o['n'], 'clock n');
      if (keys.length !== dts.length || keys.length !== ns.length) throw new Error(`pools: clock.${part}[${L}] columns differ in length`);
      const m = new Map<number, Map<number, number>>();
      keys.forEach((kr, r) => {
        const ks = nums(kr, 'clock key');
        const key = ks.length === 4 ? k4(at(ks, 0), at(ks, 1), at(ks, 2), at(ks, 3)) : ks.length === 3 ? k3(at(ks, 0), at(ks, 1), at(ks, 2)) : ks.length === 2 ? k2(at(ks, 0), at(ks, 1)) : ks.length === 1 ? at(ks, 0) : NaN;
        if (Number.isNaN(key)) throw new Error(`pools: clock.${part}[${L}] has a key of length ${ks.length}`);
        addTo(m, key, at(dts, r), at(ns, r));
      });
      return finish(m);
    });
  };

  // kickoffs
  const K = rec(p['kick'], 'kick'), kn = nums(K['n'], 'kick.n'), kdt = nums(K[clock === 'dt_f' ? 'dtf' : 'dtpf'], 'kick.dt'), knd = numsOrNull(K['nd'], 'kick.nd'), ksame = nums(K['same'], 'kick.same');
  if (kn.length !== kdt.length || kn.length !== knd.length || kn.length !== ksame.length) throw new Error('pools: kick columns differ in length');
  const kcum = new Float64Array(kn.length); let kt = 0;
  for (let i = 0; i < kn.length; i++) { kt += at(kn, i); kcum[i] = kt; }
  const X = rec(p['xp'], 'xp');
  const xpv = (k: string): number => { const x = X[k]; if (typeof x !== 'number' || !(x >= 0 && x <= 1)) throw new Error(`pools: xp.${k} must be a probability`); return x; };

  return {
    id: pack.id, bins, minPool: num('minPool'), minClock: num('minClock'), trans, clock, tuples,
    rec: [finish(L0), finish(L1), finish(L2), finish(L3)], call: callLevels,
    clockLate: clockLevels('late', 4), clockNon: clockLevels('nonlate', 2),
    kick: { pool: { ids: Int32Array.from(kn.map((_, i) => i)), cum: kcum, total: kt }, nd: Float64Array.from(knd, (v) => (v === null ? NaN : v)), same: Int8Array.from(ksame), dt: Float64Array.from(kdt) },
    xp: { pGo2: xpv('pGo2'), pMake2: xpv('pMake2'), pMake1: xpv('pMake1') },
    points: { td: num('pointsTd'), fg: num('pointsFg'), safety: num('pointsSafety') },
    halfSecs: num('halfSecs'), otSecs: num('otSecs'),
  };
}
