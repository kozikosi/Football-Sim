// 2a: the pass-class node, the first GLM node. P(class | state) for a pass play, class in {comp, inc, sack, int} (the pools pack's oc 0..3), as a multinomial logit on 15
// portable features, fitted by tools/mathlab/phase1/passclass.py. It replaces the POOL's class marginal; the outcome detail (yards, fumble, next spot) is still the pool's,
// drawn CONDITIONAL on the class: class first, then a tuple from the pool restricted to that class (the class-then-tuple sampler).
// The lambda seam is drive.ts's one tilt(): P_k proportional to p_k * exp(lambda * theta_k * gap). With lambda 0 or a gap of 0 the class probabilities are returned untouched.
// Pure and portable: + - * / comparisons, pmath.plog / pexp only (the portability lint covers this folder). The feature order and the order of operations are the contract with
// the Python lab (passclass.py feat / probs_pmath), checked bit for bit by test/nfl/passclass-vectors.json.
import type { ModelPack } from '../../../core/pack.ts';
import { at } from '../../../core/at.ts';
import { pexp, plog } from '../../../core/pmath.ts';
import type { Pool, Pools } from './pools.ts';

export const PASS_FEATURES = ['d2', 'd3', 'd4', 'lytg', 'ydl', 'rz', 'gl', 'own', 'sd', 'late', 'late_sd', 'late_trail', 'd3ytg', 'd1ytg', 'ytg'] as const;
export const PASS_CLASSES = ['comp', 'inc', 'sack', 'int'] as const;

export interface PassClass {
  readonly id: string;
  readonly intercept: readonly number[];                 // 4
  readonly coef: readonly (readonly number[])[];         // 4 x 15
  readonly theta: readonly number[];                     // 4: how a duty gap splits across the classes (NOT fitted yet)
  readonly lambda: number;                               // 0 = neutral teams
  readonly minClassPool: number;
}

export function passFeatures(down: number, ytg: number, ydl: number, sd: number, qtr: number, hs: number): number[] {
  const d = Math.min(down, 4), yt = Math.min(Math.max(ytg, 1), 30), lytg = plog(yt);
  const sdc = Math.min(Math.max(sd, -21), 21) / 10;
  const late = (qtr === 2 || qtr === 4) && hs <= 300 ? 1 : 0;
  return [
    d === 2 ? 1 : 0, d === 3 ? 1 : 0, d === 4 ? 1 : 0, lytg, ydl / 100,
    ydl <= 20 ? 1 : 0, ydl <= 5 ? 1 : 0, ydl >= 90 ? 1 : 0, sdc, late, late * sdc, late * (sd < 0 ? 1 : 0),
    (d >= 3 ? 1 : 0) * lytg, (d === 1 ? 1 : 0) * lytg, yt / 10,
  ];
}

// Softmax of the logits, max-subtracted. Sums in index order (a fixed order, so the bits do not depend on the engine).
export function passClassProbs(m: PassClass, x: readonly number[]): number[] {
  const z: number[] = [];
  for (let k = 0; k < 4; k++) { let acc = at(m.intercept, k); const row = at(m.coef, k); for (let j = 0; j < x.length; j++) acc += at(row, j) * at(x, j); z.push(acc); }
  let mx = at(z, 0);
  for (let k = 1; k < 4; k++) if (at(z, k) > mx) mx = at(z, k);
  const e = z.map((v) => pexp(v - mx));
  let s = at(e, 0);
  for (let k = 1; k < 4; k++) s += at(e, k);
  return e.map((v) => v / s);
}

// One uniform -> a class index.
export function pickClass(p: readonly number[], u: number): number {
  let acc = 0;
  for (let k = 0; k < p.length; k++) { acc += at(p, k); if (u < acc) return k; }
  return p.length - 1;
}

// ---- class-conditional pools ----
// The members of `pool` whose outcome class (tuples.oc) is `cls`, as a pool of their own (the same ids, the same weights). Cached per pool.
const subCache = new WeakMap<Pool, Map<number, Pool | undefined>>();
export function classPool(pool: Pool, oc: Int8Array, cls: number): Pool | undefined {
  let c = subCache.get(pool);
  if (c === undefined) { c = new Map(); subCache.set(pool, c); }
  if (c.has(cls)) return c.get(cls);
  const ids: number[] = [], cum: number[] = []; let total = 0;
  for (let k = 0; k < pool.ids.length; k++) {
    if (at(oc, at(pool.ids, k)) !== cls) continue;
    total += at(pool.cum, k) - (k === 0 ? 0 : at(pool.cum, k - 1));
    ids.push(at(pool.ids, k)); cum.push(total);
  }
  const sub = ids.length === 0 ? undefined : { ids: Int32Array.from(ids), cum: Float64Array.from(cum), total };
  c.set(cls, sub);
  return sub;
}

// The hierarchy of the pools node, applied to the CLASS-restricted pool: the first level whose pool holds at least `minn` plays OF THAT CLASS wins. A class that is rare in a cell
// (an interception in a short-yardage cell) therefore reads from a coarser cell instead of from three plays. At the coarsest level it takes what is there; `stat[slot]` counts that.
export function pickClassTuple(levels: readonly Map<number, Pool>[], keys: readonly number[], P: Pools, cls: number, minn: number, stat: number[], slot: number): Pool {
  let last: Pool | undefined;
  for (let L = 0; L < levels.length; L++) {
    const p = at(levels, L).get(at(keys, L));
    const sub = p === undefined ? undefined : classPool(p, P.tuples.oc, cls);
    if (sub !== undefined) { last = sub; if (sub.total >= minn) return sub; }
  }
  if (last !== undefined) return last;
  stat[slot] = (stat[slot] ?? 0) + 1;
  for (const q of at(levels, levels.length - 1).values()) { const sub = classPool(q, P.tuples.oc, cls); if (sub !== undefined) return sub; }
  throw new Error('passclass: no pool holds class ' + cls);
}

// ---- loading ----
type Rec = Record<string, unknown>;
const nums = (x: unknown, what: string, n: number): number[] => {
  if (!Array.isArray(x) || x.length !== n) throw new Error(`passclass: ${what} must be an array of ${n} numbers`);
  for (const v of x) if (typeof v !== 'number' || !Number.isFinite(v)) throw new Error(`passclass: ${what} must hold finite numbers`);
  return x as number[];
};
export function loadPassClass(pack: ModelPack): PassClass {
  const p = pack.params as Rec;
  if (JSON.stringify(p['features']) !== JSON.stringify(PASS_FEATURES)) throw new Error('passclass: the pack\'s feature list is not the one this code builds');
  if (JSON.stringify(p['classes']) !== JSON.stringify(PASS_CLASSES)) throw new Error('passclass: the pack\'s class list is not comp, inc, sack, int');
  const cf = p['coef'];
  if (!Array.isArray(cf) || cf.length !== 4) throw new Error('passclass: coef must have 4 rows');
  const lambda = p['lambda'], minC = pack.rules.values['minClassPool'];
  if (typeof lambda !== 'number' || !Number.isFinite(lambda) || lambda < 0) throw new Error('passclass: lambda must be a finite number >= 0');
  if (typeof minC !== 'number' || !(minC >= 1)) throw new Error('passclass: rules.minClassPool must be a number >= 1');
  return { id: pack.id, intercept: nums(p['intercept'], 'intercept', 4), coef: cf.map((r, k) => nums(r, 'coef[' + k + ']', PASS_FEATURES.length)), theta: nums(p['theta'], 'theta', 4), lambda, minClassPool: minC };
}
