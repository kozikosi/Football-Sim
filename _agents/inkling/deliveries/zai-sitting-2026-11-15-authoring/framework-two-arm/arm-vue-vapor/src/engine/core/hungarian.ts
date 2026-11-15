// Minimum-cost assignment on a square cost matrix (Hungarian algorithm with potentials, O(n^3)).
// Deterministic: ties resolve by index order, so the same matrix always gives the same assignment.
// Returns `col[i]` = the column assigned to row i.
export function hungarian(cost: ReadonlyArray<ReadonlyArray<number>>): number[] {
  const n = cost.length;
  for (const row of cost) if (row.length !== n) throw new Error('hungarian: matrix must be square');
  const INF = Number.POSITIVE_INFINITY;
  const u = new Array<number>(n + 1).fill(0);
  const v = new Array<number>(n + 1).fill(0);
  const p = new Array<number>(n + 1).fill(0);   // p[j] = row matched to column j (1-based; 0 = none)
  const way = new Array<number>(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    p[0] = i;
    let j0 = 0;
    const minv = new Array<number>(n + 1).fill(INF);
    const used = new Array<boolean>(n + 1).fill(false);
    do {
      used[j0] = true;
      const i0 = p[j0];
      let delta = INF, j1 = 0;
      for (let j = 1; j <= n; j++) {
        if (used[j]) continue;
        const cur = cost[i0 - 1][j - 1] - u[i0] - v[j];
        if (cur < minv[j]) { minv[j] = cur; way[j] = j0; }
        if (minv[j] < delta) { delta = minv[j]; j1 = j; }
      }
      for (let j = 0; j <= n; j++) {
        if (used[j]) { u[p[j]] += delta; v[j] -= delta; } else minv[j] -= delta;
      }
      j0 = j1;
    } while (p[j0] !== 0);
    do { const j1 = way[j0]; p[j0] = p[j1]; j0 = j1; } while (j0 !== 0);
  }
  const col = new Array<number>(n).fill(-1);
  for (let j = 1; j <= n; j++) if (p[j] > 0) col[p[j] - 1] = j - 1;
  return col;
}
