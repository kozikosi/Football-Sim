// A PLANTED BUG for tests, not engine code: the product's record hierarchy as it was until 18 Nov (level 1 merged 3rd and 4th downs, level 2 dropped the down), rebuilt from the level-0 cells,
// so that a test about the hierarchy's OUTCOMES can be shown to fail on a hierarchy that has the bug. Nothing in src/ uses it.
import { k2, k4 } from '../../src/sports/nfl/sim/pools.ts';
import type { Bins, Pool, Pools } from '../../src/sports/nfl/sim/pools.ts';

export const binOfEdges = (edges: readonly number[], x: number): number => edges.filter((e) => e <= x).length;

export function oldRecKeys(B: Bins, call: number, down: number, ytg: number, ydl: number): number[] {
  const y = binOfEdges(B.ydl, ydl);
  return [k4(call, down, binOfEdges(B.dist, ytg), y), k4(call, Math.min(down, 3), binOfEdges(B.distC, ytg), y), k2(call, y), call];
}

export function plantedOldLevels(P: Pools): Map<number, Pool>[] {
  const distCOf = (db: number): number => binOfEdges(P.bins.distC, db === 0 ? -1e9 : P.bins.dist[db - 1]!);
  const acc: Map<number, Map<number, number>>[] = [new Map(), new Map(), new Map(), new Map()];
  for (const [key, pool] of P.rec[0]!) {
    const yb = key % 32, db = Math.trunc(key / 32) % 32, down = Math.trunc(key / 1024) % 32, call = Math.trunc(key / 32768);
    const ks = [key, k4(call, Math.min(down, 3), distCOf(db), yb), k2(call, yb), call];
    let prev = 0;
    for (let i = 0; i < pool.ids.length; i++) {
      const w = pool.cum[i]! - prev; prev = pool.cum[i]!;
      ks.forEach((k, L) => { const m = acc[L]!.get(k) ?? new Map<number, number>(); m.set(pool.ids[i]!, (m.get(pool.ids[i]!) ?? 0) + w); acc[L]!.set(k, m); });
    }
  }
  return acc.map((lv) => new Map([...lv].map(([k, m]) => {
    const ids = [...m.keys()].sort((a, b) => a - b), cum = new Float64Array(ids.length); let t = 0;
    ids.forEach((id, i) => { t += m.get(id)!; cum[i] = t; });
    return [k, { ids: Int32Array.from(ids), cum, total: t }] as [number, Pool];
  })));
}
