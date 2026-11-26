// 1b vertical slice: the model pack the slice runs on. TOY NUMBERS, NOT CALIBRATED. They exist so one neutral drive can run end to end
// (pack -> keyed draws -> events -> folds -> box score view); the real pack comes from the pack builder (plan v3 section 2, track K), fitted on
// nflverse play-by-play as tools/mathlab/phase1 does in Python. Nothing here may be quoted as a football fact, and no test pins a toy number as a target.
// Rules are DATA (design section 4): scoring values, field-goal range and kickoff spots live in `rules.values`, not in the state machine.
import { makePack } from '../../../core/pack.ts';
import type { ModelPack } from '../../../core/pack.ts';

export interface Pmf { readonly v: readonly number[]; readonly w: readonly number[] }
export interface SliceParams {
  readonly passRate: { readonly d1: number; readonly d2: number; readonly d3: number; readonly d4: number; readonly longBump: number };
  readonly passResult: { readonly sack: number; readonly int: number; readonly inc: number; readonly cmp: number };   // sums to 1
  readonly theta: { readonly sack: number; readonly int: number; readonly inc: number; readonly cmp: number };       // shape: how a duty gap splits across outcomes
  readonly lambda: number;                                                                                           // impact scale; 0 = neutral teams (Phase 1)
  readonly fumble: number;                                                                                           // P(run fumble lost)
  readonly fg: { readonly a: number; readonly b: number; readonly snap: number };                                    // P(make) = 1/(1+exp(-(a - b*dist)))
  readonly xp: number;
  readonly yards: { readonly pass: Pmf; readonly run: Pmf; readonly sack: Pmf; readonly punt: Pmf };                  // sack = yards LOST (positive)
  readonly dt: { readonly complete: Pmf; readonly incomplete: Pmf; readonly run: Pmf; readonly sack: Pmf; readonly int: Pmf; readonly kick: Pmf };
}
export interface SliceRules {
  readonly pointsTd: number; readonly pointsFg: number; readonly pointsSafety: number;
  readonly fgMaxYdl: number; readonly goMaxYtg: number; readonly goMaxYdl: number; readonly longYtg: number;
  readonly kickoffYdl: number; readonly freeKickYdl: number; readonly touchbackYdl: number;
}

const pmf = (v: number[], w: number[]): { v: number[]; w: number[] } => ({ v, w });

export const toyPack: ModelPack = makePack({
  schema: 1,
  id: 'nfl-slice-toy-2026-11',
  rules: {
    sport: 'nfl', regime: 'slice-toy',
    values: { pointsTd: 6, pointsFg: 3, pointsSafety: 2, fgMaxYdl: 37, goMaxYtg: 2, goMaxYdl: 60, longYtg: 7, kickoffYdl: 75, freeKickYdl: 65, touchbackYdl: 80 },
  },
  params: {
    passRate: { d1: 0.5, d2: 0.55, d3: 0.62, d4: 0.6, longBump: 0.18 },
    passResult: { sack: 0.065, int: 0.022, inc: 0.313, cmp: 0.6 },
    theta: { sack: -1, int: -0.6, inc: -0.2, cmp: 0.3 },
    lambda: 0,
    fumble: 0.012,
    fg: { a: 5.39, b: 0.0953, snap: 17 },
    xp: 0.94,
    'yards.pass': pmf([2, 5, 8, 12, 18, 28, 45], [0.15, 0.25, 0.25, 0.17, 0.1, 0.06, 0.02]),
    'yards.run': pmf([-2, 0, 2, 4, 6, 9, 15, 30], [0.08, 0.1, 0.22, 0.25, 0.15, 0.1, 0.07, 0.03]),
    'yards.sack': pmf([3, 6, 9], [0.3, 0.5, 0.2]),
    'yards.punt': pmf([35, 40, 45, 50, 55], [0.15, 0.25, 0.3, 0.2, 0.1]),
    'dt.complete': pmf([6, 10, 32, 38, 42], [0.18, 0.2, 0.22, 0.22, 0.18]),
    'dt.incomplete': pmf([5, 7], [0.5, 0.5]),
    'dt.run': pmf([30, 36, 40], [0.3, 0.4, 0.3]),
    'dt.sack': pmf([30, 38], [0.5, 0.5]),
    'dt.int': pmf([10, 16], [0.5, 0.5]),
    'dt.kick': pmf([6, 9], [0.5, 0.5]),
  },
  provenance: { source: 'TOY: hand-set numbers for the 1b vertical slice. Not fitted, not calibrated, not from data.', fitDate: '2026-11-15', note: 'Replaced by the pack builder output (nflverse, tools/mathlab/phase1 port).' },
});

// A pack with the pass-duty impact scale switched on (lambda > 0), for the seam test. Same everything else, a different hash.
export function withLambda(base: ModelPack, lambda: number): ModelPack {
  const { hash: _h, ...body } = base;
  return makePack({ ...body, id: body.id + `-lambda${lambda}`, params: { ...body.params, lambda } });
}

function num(o: unknown, k: string): number {
  const x = (o as Record<string, unknown>)[k];
  if (typeof x !== 'number' || !Number.isFinite(x)) throw new Error(`pack: ${k} must be a finite number`);
  return x;
}
function obj(p: ModelPack, k: string): Record<string, unknown> {
  const x = (p.params as Record<string, unknown>)[k];
  if (typeof x !== 'object' || x === null || Array.isArray(x)) throw new Error(`pack: params.${k} must be an object`);
  return x as Record<string, unknown>;
}
function readPmf(p: ModelPack, k: string): Pmf {
  const o = obj(p, k), v = o['v'], w = o['w'];
  if (!Array.isArray(v) || !Array.isArray(w) || v.length === 0 || v.length !== w.length) throw new Error(`pack: ${k} needs equal-length v and w`);
  if (!v.every((x) => typeof x === 'number') || !w.every((x) => typeof x === 'number' && x >= 0)) throw new Error(`pack: ${k} holds non-numbers or negative weights`);
  if ((w as number[]).reduce((a, b) => a + b, 0) <= 0) throw new Error(`pack: ${k} weights sum to zero`);
  return { v: v as number[], w: w as number[] };
}
// Validates the shapes once, so the state machine reads typed numbers and a broken pack fails at load, not three plays in.
export function readParams(p: ModelPack): SliceParams {
  const pr = obj(p, 'passRate'), res = obj(p, 'passResult'), th = obj(p, 'theta'), fg = obj(p, 'fg');
  const out: SliceParams = {
    passRate: { d1: num(pr, 'd1'), d2: num(pr, 'd2'), d3: num(pr, 'd3'), d4: num(pr, 'd4'), longBump: num(pr, 'longBump') },
    passResult: { sack: num(res, 'sack'), int: num(res, 'int'), inc: num(res, 'inc'), cmp: num(res, 'cmp') },
    theta: { sack: num(th, 'sack'), int: num(th, 'int'), inc: num(th, 'inc'), cmp: num(th, 'cmp') },
    lambda: num(p.params, 'lambda'), fumble: num(p.params, 'fumble'), xp: num(p.params, 'xp'),
    fg: { a: num(fg, 'a'), b: num(fg, 'b'), snap: num(fg, 'snap') },
    yards: { pass: readPmf(p, 'yards.pass'), run: readPmf(p, 'yards.run'), sack: readPmf(p, 'yards.sack'), punt: readPmf(p, 'yards.punt') },
    dt: { complete: readPmf(p, 'dt.complete'), incomplete: readPmf(p, 'dt.incomplete'), run: readPmf(p, 'dt.run'), sack: readPmf(p, 'dt.sack'), int: readPmf(p, 'dt.int'), kick: readPmf(p, 'dt.kick') },
  };
  const s = out.passResult.sack + out.passResult.int + out.passResult.inc + out.passResult.cmp;
  if (Math.abs(s - 1) > 1e-9) throw new Error('pack: passResult must sum to 1, got ' + s);
  return out;
}
export function readRules(p: ModelPack): SliceRules {
  const v = p.rules.values, g = (k: string): number => { const x = v[k]; if (typeof x !== 'number') throw new Error(`pack: rules.${k} must be a number`); return x; };
  return { pointsTd: g('pointsTd'), pointsFg: g('pointsFg'), pointsSafety: g('pointsSafety'), fgMaxYdl: g('fgMaxYdl'), goMaxYtg: g('goMaxYtg'), goMaxYdl: g('goMaxYdl'), longYtg: g('longYtg'), kickoffYdl: g('kickoffYdl'), freeKickYdl: g('freeKickYdl'), touchbackYdl: g('touchbackYdl') };
}
