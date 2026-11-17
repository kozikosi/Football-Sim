import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { makePack } from '../../src/core/pack.ts';
import type { PackBody } from '../../src/core/pack.ts';
import { callKeys, clockLateKeys, clockNonKeys, loadPools, pick, recKeys, sample } from '../../src/sports/nfl/sim/pools.ts';
import type { Pool, Pools } from '../../src/sports/nfl/sim/pools.ts';

// 1d: pooled-node conformance. The vectors are written by the LAB (tools/mathlab/phase1/poolvectors.py) from sim.py's own Pack class: raw plays, bisect on the lab's
// constants, first level with at least minn plays. For each state and node the lab records the size and a digest of the outcome multiset of the pool it picks. The
// TypeScript loader, fed the BAKED pack, must pick a pool of the same size and the same contents. The baker (numpy searchsorted), the pack format and this loader are all
// on the line; only the raw play table is shared with the oracle. Order inside a pool is irrelevant here, so the check does not depend on how plays are stored.
// Not covered, on purpose: a table HOLE (no pool for a key). The lab then takes an arbitrary pool; the product takes the largest and COUNTS it (pick()'s stat slot).
// The vectors skip those states and the file says how many (holes_skipped).
type Item = { s: number[]; n: number; d: string; clock?: string };
type V = { train: string; kick: string; minPool: number; minClock: number; call: Item[]; rec: Item[]; clockLate: Item[]; clockNon: Item[]; kick_digest: Record<string, { n: number; d: string }>; holes_skipped: Record<string, number> };

const fmt = (x: number): string => (Number.isNaN(x) ? 'null' : Number.isInteger(x) ? String(x) : String(x));
const cmp = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
const digest = (m: Map<string, number>): string => crypto.createHash('sha256').update([...m.entries()].sort((a, b) => cmp(a[0], b[0])).map(([k, c]) => `${k}|${c}`).join('\n')).digest('hex').slice(0, 16);
const counts = (p: Pool): number[] => Array.from(p.cum, (c, i) => c - (i ? (p.cum[i - 1] as number) : 0));
const bump = (m: Map<string, number>, k: string, c: number): void => { m.set(k, (m.get(k) ?? 0) + c); };

function load(packName: string, clock: 'dt_f' | 'dt_pf'): Pools {
  const body = JSON.parse(fs.readFileSync(new URL(`../../../data/packs/${packName}.json`, import.meta.url), 'utf8')) as PackBody;
  body.rules.values['clock'] = clock;
  return loadPools(makePack(body));
}
const tupleStr = (P: Pools, i: number): string => {
  const T = P.tuples;
  return [T.oc[i], T.yards[i], T.td[i], T.deftd[i], T.fum[i], T.safety[i], T.fg[i], T.nd[i], T.ndsame[i], T.ndown[i], T.delta[i], T.pa[i], T.ra[i], T.comp[i], T.sack[i]].map((x) => fmt(x as number)).join('|');
};
const poolDigest = (pool: Pool, label: (id: number) => string): string => {
  const m = new Map<string, number>(); const c = counts(pool);
  pool.ids.forEach((id, k) => bump(m, label(id), c[k] as number));
  return digest(m);
};
const stat = (): number[] => [];

for (const [packName, vfile] of [['nfl-pools-fit2023-2025', 'poolnode-vectors-fit2023-2025.json'], ['nfl-pools-fit2016-2022', 'poolnode-vectors-fit2016-2022.json']] as const) {
  if (!fs.existsSync(new URL(`./${vfile}`, import.meta.url))) continue;
  const V = JSON.parse(fs.readFileSync(new URL(`./${vfile}`, import.meta.url), 'utf8')) as V;
  const Pf = load(packName, 'dt_f'), Ppf = load(packName, 'dt_pf');
  const tag = `${packName} (${V.call.length} call states, ${V.rec.length} record, ${V.clockLate.length} late clock, ${V.clockNon.length} non-late clock)`;

  test(`pool nodes vs the lab (${tag}): the call node picks the lab's pool, level by level`, () => {
    assert.equal(Pf.minPool, V.minPool);
    for (const v of V.call) {
      const [down, ytg, ydl, sd, qtr, hs] = v.s as [number, number, number, number, number, number], s = stat();
      const p = pick(Pf.call, callKeys(Pf.bins, down, ytg, ydl, sd, qtr, hs), Pf.minPool, s, 0);
      assert.equal(s[0] ?? 0, 0, 'hole ' + v.s);
      assert.equal(p.total, v.n, 'size ' + v.s); assert.equal(poolDigest(p, (id) => String(id)), v.d, 'contents ' + v.s);
    }
  });
  test(`pool nodes vs the lab (${tag}): the play-record node picks the lab's pool`, () => {
    for (const v of V.rec) {
      const [call, down, ytg, ydl] = v.s as [number, number, number, number], s = stat();
      const p = pick(Pf.rec, recKeys(Pf.bins, call, down, ytg, ydl), Pf.minPool, s, 0);
      assert.equal(s[0] ?? 0, 0, 'hole ' + v.s);
      assert.equal(p.total, v.n, 'size ' + v.s); assert.equal(poolDigest(p, (id) => tupleStr(Pf, id)), v.d, 'contents ' + v.s);
    }
  });
  test(`pool nodes vs the lab (${tag}): both clock nodes, both clock variants`, () => {
    for (const v of V.clockLate) {
      const P = v.clock === 'dt_f' ? Pf : Ppf, [oc, qtr, hs, sd] = v.s as [number, number, number, number], s = stat();
      const p = pick(P.clockLate, clockLateKeys(P.bins, oc, qtr, hs, sd), P.minClock, s, 0);
      assert.equal(s[0] ?? 0, 0); assert.equal(p.total, v.n, 'size ' + v.s); assert.equal(poolDigest(p, (id) => String(id)), v.d, `contents ${v.clock} ${v.s}`);
    }
    for (const v of V.clockNon) {
      const P = v.clock === 'dt_f' ? Pf : Ppf, [oc, y] = v.s as [number, number], s = stat();
      const p = pick(P.clockNon, clockNonKeys(P.bins, oc, y), P.minClock, s, 0);
      assert.equal(s[0] ?? 0, 0); assert.equal(p.total, v.n, 'size ' + v.s); assert.equal(poolDigest(p, (id) => String(id)), v.d, `contents ${v.clock} ${v.s}`);
    }
  });
  test(`pool nodes vs the lab (${tag}): the kickoff pool equals the lab's kickoffs under both clocks`, () => {
    for (const [clock, P] of [['dt_f', Pf], ['dt_pf', Ppf]] as const) {
      const m = new Map<string, number>(); const k = P.kick, c = counts(k.pool);
      k.pool.ids.forEach((id, i) => bump(m, `${fmt(k.nd[id] as number)}|${fmt(k.same[id] as number)}|${fmt(k.dt[id] as number)}`, c[i] as number));
      const want = V.kick_digest[clock]!;
      assert.equal(k.pool.total, want.n, clock); assert.equal(digest(m), want.d, clock);
    }
  });
}

// The sampler itself is not in the oracle (the lab indexes plays in game order, the pack stores a pmf over unique tuples), so it is checked against its definition:
// member k is chosen when cum[k-1] <= u * total < cum[k]. A linear scan is the definition; the binary search must equal it, including exactly at the boundaries.
test('sample(): the binary search equals the linear definition on real pools, at random u and exactly on every boundary', () => {
  const P = load('nfl-pools-fit2023-2025', 'dt_f');
  let seed = 7; const rnd = (): number => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296;
  const linear = (p: Pool, u: number): number => { const t = u * p.total; for (let k = 0; k < p.cum.length; k++) if (t < (p.cum[k] as number)) return p.ids[k] as number; return p.ids[p.ids.length - 1] as number; };
  const pools = [...P.call[0]!.values()].slice(0, 20).concat([...P.rec[3]!.values()], [P.kick.pool]);
  for (const p of pools) {
    for (let i = 0; i < 200; i++) { const u = rnd(); assert.equal(sample(p, u), linear(p, u)); }
    for (let k = 0; k < Math.min(p.cum.length, 60); k++) for (const t of [p.cum[k] as number, (p.cum[k] as number) - 1e-9]) { const u = t / p.total; if (u >= 0 && u < 1) assert.equal(sample(p, u), linear(p, u)); }
    assert.equal(sample(p, 0), p.ids[0]);
  }
});

test('pool nodes: the check can fail (a perturbed pool changes its digest; a wrong bin edge picks a different pool)', () => {
  const P = load('nfl-pools-fit2023-2025', 'dt_f');
  const p = pick(P.rec, recKeys(P.bins, 0, 3, 7, 40), P.minPool, stat(), 0);
  const base = poolDigest(p, (id) => tupleStr(P, id));
  assert.notEqual(poolDigest(p, (id) => tupleStr(P, id === p.ids[0] ? (p.ids[1] as number) : id)), base);
  const q = pick(P.rec, recKeys(P.bins, 0, 3, 8, 40), P.minPool, stat(), 0);       // ytg 7 vs 8 straddles the dist edge at 8
  assert.notEqual(q.total === p.total ? poolDigest(q, (id) => tupleStr(P, id)) : 'size differs', base);
});
