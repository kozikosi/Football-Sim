// THROWAWAY SPIKE, not product code and not a test. Calibration by exact moment matching: reweight the real play pools so each play type hits
// per-play targets taken from the strength model, solved without any simulation. Reads only; changes nothing. Needs the ratings file.
// Usage (repo root): node --experimental-strip-types tools/mathlab/spikes/2026-11-25-pool-tilt/moment.ts [leagueSeed=777] [kPass,kRush,kTD,kFG] [topPools=40]
import fs from 'node:fs';
const R = new URL('../../../../colors', import.meta.url).pathname;
const imp = (p: string) => import(R + '/' + p);
const { makePack } = await imp('src/core/pack.ts');
const { gameKeyOf } = await imp('src/core/keyedrng.ts');
const { pexp } = await imp('src/core/pmath.ts');
const { loadPools, sample, CALL, OC } = await imp('src/sports/nfl/sim/pools.ts');
const { runGame: runBase } = await imp('src/sports/nfl/sim/game.ts');
const { logHash } = await imp('src/core/events.ts');
const { runGame } = await import('./tiltgame.ts');
const P = loadPools(makePack(JSON.parse(fs.readFileSync(R + '/../data/packs/nfl-pools-fit2023-2025.json', 'utf8'))));
const T = P.tuples;
const ESS: number[] = [];
const feat = (j: number, call: number): number[] => {
  const to = T.oc[j] === OC.int || T.fum[j] === 1 ? 1 : 0;
  if (call === CALL.fg) return [0, 0, 0, 0, T.fg[j]];
  return call === CALL.pass ? [T.yards[j] / 10, 0, to, T.sack[j], T.td[j]] : [0, T.yards[j] / 5, to, 0, T.td[j]];
};
// ---- exact moment matching (no simulation at match time) ----
// offline, once per pack: how often each record pool is drawn from in neutral games
const visits = [new Map<any, number>(), new Map<any, number>(), new Map<any, number>()];
const slotOf = (call: number) => (call === CALL.pass ? 0 : call === CALL.run ? 1 : 2);
for (let n = 0; n < 3000; n++) runGame(P, gameKeyOf('visit:' + n), { sampler: (pl: any, _t: number, call: number, u: number) => {
  if (call === CALL.pass || call === CALL.run || call === CALL.fg) { const m = visits[slotOf(call)]!; m.set(pl, (m.get(pl) ?? 0) + 1); }
  return sample(pl, u); } });
const TOP = Number(process.argv[4] ?? 40);
const tables = [CALL.pass, CALL.run, CALL.fg].map((call) => {
  const all = [...visits[slotOf(call)]!.entries()].sort((a, b) => b[1] - a[1]).slice(0, TOP);
  const W = all.reduce((s, x) => s + x[1], 0);
  const dim = call === CALL.pass ? 4 : call === CALL.run ? 3 : 1;
  const pools = all.map(([pl, v]) => {
    const n: number[] = [], f: number[][] = []; let prev = 0;
    for (let k = 0; k < pl.ids.length; k++) { n.push((pl.cum[k] - prev) / pl.total); prev = pl.cum[k]; const a = feat(pl.ids[k], call); f.push(call === CALL.pass ? [a[0]!, a[3]!, a[2]!, a[4]!] : call === CALL.run ? [a[1]!, a[2]!, a[4]!] : [a[4]!]); }
    const u = new Map<string, number>(), un: number[] = [], uf: number[][] = [];     // exact compression: rows with equal features merge
    for (let k = 0; k < n.length; k++) { const key = f[k]!.join(','); const at = u.get(key); if (at === undefined) { u.set(key, un.length); un.push(n[k]!); uf.push(f[k]!); } else un[at]! += n[k]!; }
    return { w: v / W, n: Float64Array.from(un), f: Float64Array.from(uf.flat()) };
  });
  return { dim, pools };
});
function moments(t: any, g: number[]) {
  const d = t.dim, M = new Float64Array(d), C = new Float64Array(d * d), m = new Float64Array(d), s = new Float64Array(d * d);
  for (const p of t.pools) {
    let z = 0; m.fill(0); s.fill(0); const f = p.f, n = p.n;
    for (let k = 0, o = 0; k < n.length; k++, o += d) { let e = 0, any = false; for (let c = 0; c < d; c++) e += g[c]! * f[o + c]!; const q = e === 0 ? n[k]! : n[k]! * pexp(e); z += q;
      for (let a = 0; a < d; a++) { const qa = q * f[o + a]!; if (qa === 0) continue; m[a]! += qa; for (let b = a; b < d; b++) s[a * d + b]! += qa * f[o + b]!; } }
    for (let a = 0; a < d; a++) { M[a]! += p.w * m[a]! / z; for (let b = a; b < d; b++) { const v = p.w * (s[a * d + b]! / z - (m[a]! / z) * (m[b]! / z)); C[a * d + b]! += v; if (b !== a) C[b * d + a]! += v; } }
  }
  return { M: Array.from(M), C: Array.from({ length: d }, (_, a) => Array.from(C.subarray(a * d, a * d + d))) };
}
function lin(A: number[][], b: number[]): number[] {
  const M = A.map((r, i) => [...r, b[i]!]), n = b.length;
  for (let i = 0; i < n; i++) { let p = i; for (let r = i + 1; r < n; r++) if (Math.abs(M[r]![i]!) > Math.abs(M[p]![i]!)) p = r; [M[i], M[p]] = [M[p]!, M[i]!];
    for (let r = 0; r < n; r++) if (r !== i) { const f = M[r]![i]! / M[i]![i]!; for (let k = i; k <= n; k++) M[r]![k]! -= f * M[i]![k]!; } }
  return M.map((r, i) => r[n]! / r[i]!);
}
const base0 = tables.map((t) => moments(t, new Array(t.dim).fill(0)).M);
let iters = 0, solves = 0, worst = 0;
function solveG(t: any, target: number[]): number[] {
  let g = new Array(t.dim).fill(0);
  for (let it = 0; it < 12; it++) {
    const { M, C } = moments(t, g); const res = target.map((v, i) => v - M[i]);
    const err = Math.max(...res.map((r, i) => Math.abs(r / target[i]!)));
    if (err < 1e-4) { worst = Math.max(worst, err); break; }
    iters++; const d = lin(C, res); g = g.map((v, i) => v + Math.max(-0.75, Math.min(0.75, d[i]!)));
  }
  solves++; return g;
}
const [kP, kR, kTD, kFG] = (process.argv[3] ?? '0.85,0.85,1.5,0.5').split(',').map(Number) as [number, number, number, number];
const { fixtureLeague } = await imp('test/nfl/fixture.ts');
const { matchupModel } = await imp('src/sports/nfl/engine/matchup.ts');
const { simulateGame } = await imp('src/sports/nfl/engine/drives.ts');
const { makeRng } = await imp('src/core/rng.ts');
const { teams, lg } = fixtureLeague(Number(process.argv[2] ?? 777));
const m0 = matchupModel(lg, lg, lg);
function tiltFor(m: any): G & { raw?: number[][] } {
  const rp = (m.expPass / m0.expPass) ** kP, rr = (m.expRush / m0.expRush) ** kR, to = m.lamTO / m0.lamTO, sk = m.lamSack / m0.lamSack;
  const pts = (m.structPts + m.extraPts) / (m0.structPts + m0.extraPts);
  const bp = base0[0]!, br = base0[1]!, bf = base0[2]!;
  const gp = solveG(tables[0], [bp[0] * rp, bp[1] * sk, bp[2] * to, bp[3] * pts ** kTD]);
  const gr = solveG(tables[1], [br[0] * rr, br[1] * to, br[2] * pts ** kTD]);
  const gf = [kFG * (pts - 1) / (1 - bf[0])];
  return { gp, gr, gf } as any;
}
function sampler2(gs: any[]) {
  const caches = [new Map<any, any>(), new Map<any, any>()];
  return (pl: any, team: number, call: number, u: number): number => {
    if (call !== CALL.pass && call !== CALL.run && call !== CALL.fg) return sample(pl, u);
    let c = caches[team]!.get(pl);
    if (!c) {
      const g = gs[team]; const cum = new Float64Array(pl.ids.length); let total = 0, sq = 0, prev = 0;
      for (let k = 0; k < pl.ids.length; k++) { const n = pl.cum[k] - prev; prev = pl.cum[k]; const a = feat(pl.ids[k], call);
        const e = call === CALL.pass ? g.gp[0] * a[0]! + g.gp[1] * a[3]! + g.gp[2] * a[2]! + g.gp[3] * a[4]! : call === CALL.run ? g.gr[0] * a[1]! + g.gr[1] * a[2]! + g.gr[2] * a[4]! : g.gf[0] * a[4]!;
        const t = pexp(e); total += n * t; sq += n * t * t; cum[k] = total; }
      ESS.push((total * total) / sq / pl.total); c = { cum, total }; caches[team]!.set(pl, c);
    }
    const target = u * c.total; let lo = 0, hi = c.cum.length - 1;
    while (lo < hi) { const m = (lo + hi) >> 1; if (target < c.cum[m]!) hi = m; else lo = m + 1; }
    return pl.ids[lo];
  };
}
function stats2(gs: any[], N: number, tag: string) {
  const sampler = sampler2(gs), m = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]; let w = 0; const q = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
  for (let n = 0; n < N; n++) {
    const o = runGame(P, gameKeyOf(tag + ':' + n), { sampler });
    for (const e of o.events) if (e.kind === 'snap') { const p = e.payload, x = m[p.team === 'A' ? 0 : 1]!; if (p.call === CALL.pass) x[0]! += p.yards; else if (p.call === CALL.run) x[1]! += p.yards; x[2]! += p.give ? 1 : 0; x[3]! += p.sack; }
    for (const e of o.events) if (e.kind === 'snap') { const p = e.payload, x = q[p.team === 'A' ? 0 : 1]!; if (p.call === CALL.pass) { x[0]!++; x[1]! += p.yards; x[2]! += p.sack; x[3]! += p.give ? 1 : 0; } else if (p.call === CALL.run) { x[4]!++; x[5]! += p.yards; } }
    m[0]![4]! += o.points[0]; m[1]![4]! += o.points[1]; w += o.points[0] > o.points[1] ? 1 : o.points[0] === o.points[1] ? 0.5 : 0;
  }
  return { m: m.map((r) => r.map((v) => v / N)), pp: q.map((x) => [x[1]! / x[0]!, x[2]! / x[0]!, x[3]! / x[0]!, x[5]! / x[4]!]), wp: w / N };
}
const zero = { gp: [0, 0, 0, 0], gr: [0, 0, 0], gf: [0] };
{ let same = true; for (let n = 0; n < 50; n++) if (logHash(runBase(P, gameKeyOf('off:' + n)).events) !== logHash(runGame(P, gameKeyOf('off:' + n), { sampler: sampler2([zero, zero]) }).events)) same = false;
  console.log('off switch: zero tilt reproduces the untilted log hash on 50 games:', same); ESS.length = 0; }
const base = stats2([zero, zero], 20000, 'base');
const refc = [m0.expPass, m0.expRush, m0.lamTO, m0.lamSack];
const ratios = (m: any) => [m.expPass / refc[0]!, m.expRush / refc[1]!, m.lamTO / refc[2]!, m.lamSack / refc[3]!];
const score = teams.map((t: any, i: number) => ({ i, s: matchupModel(t.ratings, lg, lg).structPts - matchupModel(lg, t.ratings, lg).structPts })).sort((a: any, b: any) => a.s - b.s);
const pairs: [number, number][] = [];
for (let k = 0; k < 16; k++) pairs.push([score[31 - k].i, score[k].i]);
for (let k = 0; k < 16; k += 2) pairs.push([score[31 - k].i, score[30 - k].i]);
for (let k = 0; k < 16; k += 2) pairs.push([score[k + 1].i, score[k].i]);
const rows: any[] = []; const chErr = [0, 0, 0, 0]; let maxG = 0, ms = 0; const ppErr = [0, 0, 0, 0];
for (const [a, b] of pairs) {
  const ma = matchupModel(teams[a].ratings, teams[b].ratings, lg), mb = matchupModel(teams[b].ratings, teams[a].ratings, lg);
  const t0 = performance.now(); const ga: any = tiltFor(ma), gb: any = tiltFor(mb); ms += performance.now() - t0;
  for (const x of [ga, gb]) for (const v of [...x.gp, ...x.gr, ...x.gf]) maxG = Math.max(maxG, Math.abs(v));
  const play = stats2([ga, gb], 4000, 'p' + a + '-' + b);
  const ra = ratios(ma), rb = ratios(mb);
  for (let c = 0; c < 4; c++) chErr[c]! += (Math.abs(play.m[0]![c]! / (base.m[0]![c]! * ra[c]!) - 1) + Math.abs(play.m[1]![c]! / (base.m[1]![c]! * rb[c]!) - 1)) / 2;
  let w = 0, p0 = 0, p1 = 0; const L = 20000;
  for (let n = 0; n < L; n++) { const r = simulateGame(ma, mb, makeRng(n * 7919 + a * 101 + b), { playoff: false, homeField: 0 }); w += r.homeScore > r.awayScore ? 1 : r.homeScore === r.awayScore ? 0.5 : 0; p0 += r.homeScore; p1 += r.awayScore; }
  for (const [k, mm] of [[0, ma], [1, mb]] as const) { const rt = [(mm.expPass / m0.expPass) ** kP, mm.lamSack / m0.lamSack, mm.lamTO / m0.lamTO, (mm.expRush / m0.expRush) ** kR]; for (let c = 0; c < 4; c++) { const bpp = (base.pp[0]![c]! + base.pp[1]![c]!) / 2; ppErr[c]! += Math.abs(play.pp[k]![c]! / (bpp * rt[c]!) - 1) / 2; } }
  rows.push({ legacy: w / L, play: play.wp, lm: (p0 - p1) / L, pm: play.m[0]![4]! - play.m[1]![4]! });
}
const mean = (v: number[]) => v.reduce((s, x) => s + x, 0) / v.length;
const fit = (x: number[], y: number[]) => { const mx = mean(x), my = mean(y); let sxy = 0, sxx = 0, syy = 0; x.forEach((v, i) => { sxy += (v - mx) * (y[i]! - my); sxx += (v - mx) ** 2; syy += (y[i]! - my) ** 2; }); return { slope: +(sxy / sxx).toFixed(3), intercept: +(my - (sxy / sxx) * mx).toFixed(3), corr: +(sxy / Math.sqrt(sxx * syy)).toFixed(4) }; };
const d = rows.map((r) => Math.abs(r.play - r.legacy));
console.log('rows per table', tables.map((t) => t.pools.reduce((x: number, p: any) => x + p.n.length, 0)).join('/'), 'TOP', TOP);
console.log('league seed', process.argv[2] ?? 777, 'k', [kP, kR, kTD, kFG].join(','), 'pools used', tables.map((t) => t.pools.length).join('/'));
console.log(' channel mean abs rel error [passY, rushY, give, sacks]', chErr.map((x) => +(x / pairs.length).toFixed(4)), '| max|g|', maxG.toFixed(2), '| ESS p50/p1/min', [0.5, 0.01, 0].map((q) => +[...ESS].sort((x, y) => x - y)[Math.floor(q * (ESS.length - 1))]!.toFixed(3)).join('/'));
console.log(' PER-PLAY achieved vs target, mean abs rel error [passY/db, sack/db, give/db, rushY/car]', ppErr.map((x) => +(x / pairs.length).toFixed(4)));
console.log(' wp', fit(rows.map((r) => r.legacy), rows.map((r) => r.play)), 'mean|d|', mean(d).toFixed(4), 'max', Math.max(...d).toFixed(4));
console.log(' margin', fit(rows.map((r) => r.lm), rows.map((r) => r.pm)));
console.log(' solve ms per matchup (both teams)', (ms / pairs.length).toFixed(2), '| newton iters per solve', (iters / solves).toFixed(1));
