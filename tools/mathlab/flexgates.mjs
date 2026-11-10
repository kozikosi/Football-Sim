// mathlab/flexgates.mjs [--sport sport-football.json] [--list] — READ-ONLY design prototype: "three gates". Sport-agnostic; all sport content is in the config.
// A flex price is the BINDING one of three independent lower bounds on the penalty, then rounded through cut points into the fixed tiers 0/2/6/12, with one more
// cut beyond which the flex is not allowed at all (so the same score also decides WHICH flexes exist; the Owner table lists 99 allowed pairs of ~300):
//   G  value guard  = refGap * (1 - w_src / w_dst), only when the destination slot is worth more. No-arbitrage: below it a star profits by moving up the value ladder.
//                     From slot weights only (verified: reproduces D@90, the Owner's base price, to within 2 OVR on 97/97 rules).
//   P  body gap     = how far the source role's body sits below the destination role's, in destination-population SDs, one-sided, over the player table's attributes. Measured.
//   C  craft gap    = levels of technique the destination needs that the source lacks, summed over tags. The only authored input (a 19 x 12 table of 0/1/2).
//   raw = max(G, kP*P, kC*C)   (--mode sum uses max(G, kP*P + kC*C)); price = tier(raw); >= last cut = not allowed.
// Constants fitted: kP, kC, 4 cuts (6). Authored: the craft table (a sport config, not retuned here). Nothing here writes flex.json or touches the engine.
import fs from 'fs';
const dir = new URL('.', import.meta.url);
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const cfg = JSON.parse(fs.readFileSync(new URL(arg('--sport', 'sport-football.json'), dir)));
const TIERS = [0, 2, 6, 12, 'X'];                                       // X = not allowed
const f = JSON.parse(fs.readFileSync(new URL(cfg.observed.file, dir)))[cfg.observed.key];
const out = []; const log = (...a) => { const s = a.join(' '); console.log(s); out.push(s); };

// ---- role body profiles from the player table (columns located from the right, so a comma in a name is harmless) ----
const lines = fs.readFileSync(new URL(cfg.data.csv, dir), 'utf8').split(/\r?\n/).filter(Boolean);
const head = lines[0].split(','), H = head.length, col = (n) => H - head.indexOf(n);
const byRole = {};
for (const l of lines.slice(1)) {
  const p = l.split(','), role = cfg.data.pos[p[p.length - col(cfg.data.posCol)]]; if (!role) continue;
  (byRole[role] ??= []).push(cfg.data.attrs.map((a) => +p[p.length - col(a)]));
}
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length, sd = (a) => { const m = mean(a); return Math.sqrt(mean(a.map((x) => (x - m) ** 2))) || 1; };
const body = (r) => { const rows = byRole[cfg.bodyOf?.[r] ?? r]; return cfg.data.attrs.map((_, i) => ({ m: mean(rows.map((x) => x[i])), s: sd(rows.map((x) => x[i])) })); };
const prof = Object.fromEntries(cfg.roles.map((r) => [r, body(r)]));

// ---- features for every ordered pair (src != dst); class from the observed table (not listed = X) ----
const pairs = [];
for (const a of cfg.sources) for (const b of cfg.roles) {
  if (a === b) continue;
  const G = cfg.weight[b] > cfg.weight[a] ? cfg.refGap * (1 - cfg.weight[a] / cfg.weight[b]) : 0;
  const P = Math.hypot(...prof[b].map((q, i) => Math.max(0, (q.m - prof[a][i].m) / q.s)));
  const C = cfg.craft.tags.reduce((n, t) => n + Math.max(0, (cfg.craft.level[b][t] ?? 0) - (cfg.craft.level[a][t] ?? 0)), 0);
  const own = f[a]?.[b], cls = own == null ? 4 : TIERS.indexOf(own);
  pairs.push({ k: `${a}>${b}`, a, b, G, P, C, Rm: cfg.room && cfg.room[a] !== cfg.room[b] ? 1 : 0, Sd: cfg.side && cfg.side[a] !== cfg.side[b] ? 1 : 0, own, cls, waived: (cfg.waive ?? []).includes(`${a}>${b}`) });
}
const selfListed = cfg.sources.filter((a) => f[a]?.[a] != null).length;     // ILB>ILB, OLB>OLB: price 0, same role, trivially right
const listed = pairs.filter((p) => p.own != null);

// ---- fit: for fixed (kP, kC) the best cuts for accuracy come from an exact DP over the sorted scores ----
function fitCuts(raw, cls, K) {
  const idx = [...raw.keys()].sort((i, j) => raw[i] - raw[j]), g = [];
  for (const i of idx) { const l = g[g.length - 1]; if (l && l.v === raw[i]) l.c[cls[i]]++; else { const c = Array(K).fill(0); c[cls[i]]++; g.push({ v: raw[i], c }); } }
  const m = g.length, cum = Array.from({ length: K }, () => Array(m + 1).fill(0));
  for (let k = 0; k < K; k++) for (let i = 0; i < m; i++) cum[k][i + 1] = cum[k][i] + g[i].c[k];
  const F = Array.from({ length: K }, () => Array(m + 1).fill(0)), A = Array.from({ length: K }, () => Array(m + 1).fill(0));
  for (let i = 0; i <= m; i++) F[0][i] = cum[0][i];
  for (let k = 1; k < K; k++) for (let i = 0; i <= m; i++) { let best = -1, bj = 0; for (let j = 0; j <= i; j++) { const v = F[k - 1][j] + cum[k][i] - cum[k][j]; if (v > best) { best = v; bj = j; } } F[k][i] = best; A[k][i] = bj; }
  const pos = []; let i = m; for (let k = K - 1; k >= 1; k--) { const j = A[k][i]; pos.unshift(j); i = j; }
  return { score: F[K - 1][m], cuts: pos.map((j) => (j === 0 ? g[0].v - 1e-6 : j === m ? g[m - 1].v + 1e-6 : (g[j - 1].v + g[j].v) / 2)) };
}
const rawOf = (p, kP, kC, mode, kR = 0, kS = 0) => (mode === 'add' ? p.G + kP * p.P + kC * p.C + kR * p.Rm + kS * p.Sd : mode === 'sum' ? Math.max(p.G, kP * p.P + kC * p.C) : Math.max(p.G, kP * p.P, kC * p.C));
const klass = (r, cuts) => { let k = 0; while (k < cuts.length && r >= cuts[k]) k++; return k; };
const KP = [0, 1, 2, 3, 4, 6], KC = [0, 1, 1.5, 2, 3, 4, 6], KR = cfg.room ? [0, 2, 4] : [0], KS = cfg.side ? [0, 3, 6] : [0];
function fit(train, mode, grid = [KP, KC]) {
  let best = null;
  for (const kP of grid[0]) for (const kC of grid[1]) {
    const raw = train.map((p) => rawOf(p, kP, kC, mode)), r = fitCuts(raw, train.map((p) => p.cls), 5);
    if (!best || r.score > best.score) best = { kP, kC, mode, cuts: r.cuts, score: r.score };
  }
  return best;
}
const predict = (m, p) => klass(rawOf(p, m.kP, m.kC, m.mode), m.cuts);
const acc = (m, set) => set.filter((p) => predict(m, p) === p.cls).length / set.length;
const stepDist = (x, y) => Math.abs(x - y);

// ---- run ----
const T4 = [0, 2, 6, 12], fiat = listed.filter((p) => p.waived), L = listed.filter((p) => !p.waived);
log(`flexgates | ${cfg.name ?? arg('--sport', 'sport-football.json')} | ${pairs.length} ordered pairs: ${listed.length} allowed in the table (+${selfListed} same-role rules at 0), ${pairs.length - listed.length} not allowed | waivers (fiat) ${fiat.map((p) => p.k).join(' ') || 'none'}`);
// 1. PRICE model, support given (the setting Inkling and Z.ai were scored in): fit kP, kC and the 3 price cuts on the allowed pairs
const fit4 = (set, mode, grid = [KP, KC, KR, KS]) => { let best = null; for (const kP of grid[0]) for (const kC of grid[1]) for (const kR of grid[2] ?? [0]) for (const kS of grid[3] ?? [0]) { const raw = set.map((p) => rawOf(p, kP, kC, mode, kR, kS)), r = fitCuts(raw, set.map((p) => p.cls), 4); if (!best || r.score > best.score) best = { kP, kC, kR, kS, mode, cuts: r.cuts, score: r.score }; } return best; };
const pr = (m, p) => klass(rawOf(p, m.kP, m.kC, m.mode, m.kR, m.kS), m.cuts);
const modes = {}; for (const mode of ['max', 'sum', 'add']) { modes[mode] = fit4(L, mode); const m = modes[mode]; log(`price, mode ${mode.padEnd(3)}: kP ${m.kP} kC ${m.kC} kR ${m.kR} kS ${m.kS} cuts ${m.cuts.map((c) => c.toFixed(2)).join(' / ')} | exact ${m.score + fiat.length + selfListed}/${listed.length + selfListed} (fiat ${fiat.length})`); }
const M = Object.values(modes).sort((x, y) => y.score - x.score)[0];
const d = L.map((p) => Math.abs(pr(M, p) - p.cls));
log(`price, chosen ${M.mode}: exact ${d.filter((x) => x === 0).length + fiat.length + selfListed}/${listed.length + selfListed}, off by one ${d.filter((x) => x === 1).length}, hard ${d.filter((x) => x > 1).length}   [baselines on the same 99: Inkling 88 (93 with floor), Z.ai 95 (98 with MUSE edits)]`);
for (const [name, grid] of [['guard only', [[0], [0], [0], [0]]], ['guard + body', [KP, [0], [0], [0]]], ['guard + craft', [[0], KC, [0], [0]]], ['body + craft', [KP, KC, [0], [0]]], ['guard+craft+rooms', [[0], KC, KR, KS]], ['all five', [KP, KC, KR, KS]]]) { const m = fit4(L, M.mode, grid); log(`  ablation ${name.padEnd(14)} exact ${m.score + fiat.length + selfListed}/${listed.length + selfListed}`); }
let rnd = 12345; const rand = () => (rnd = (rnd * 1664525 + 1013904223) % 4294967296) / 4294967296;
let ok = 0, n = 0; for (let rep = 0; rep < 5; rep++) { const o = L.map((_, i) => i).sort(() => rand() - 0.5); for (let k = 0; k < 5; k++) { const t = new Set(o.filter((_, i) => i % 5 === k)); const m = fit4(L.filter((_, i) => !t.has(i)), M.mode); for (const i of t) { n++; ok += pr(m, L[i]) === L[i].cls; } } }
log(`  5-fold CV (5 repeats), exact on held-out allowed pairs: ${(100 * ok / n).toFixed(1)}%  (in-sample ${(100 * M.score / L.length).toFixed(1)}%)`);
let lo = 0, ln = 0; const per = []; for (const r of cfg.roles) { const t = L.filter((p) => p.a === r || p.b === r); if (!t.length) continue; const m = fit4(L.filter((p) => p.a !== r && p.b !== r), M.mode), h = t.filter((p) => pr(m, p) === p.cls).length; lo += h; ln += t.length; per.push([r, h / t.length, t.length]); }
log(`  leave-one-role-out (constants fit blind to the role, then it is priced): exact ${(100 * lo / ln).toFixed(1)}% over ${ln} cases; hardest: ${per.sort((x, y) => x[1] - y[1]).slice(0, 4).map(([r, a, c]) => `${r} ${(100 * a).toFixed(0)}% of ${c}`).join(', ')}`);
const bind = (p) => { const g = p.G, b = M.kP * p.P, c = M.kC * p.C, mx = M.mode === 'add' ? g : Math.max(g, b, c); return rawOf(p, M.kP, M.kC, M.mode, M.kR, M.kS) === 0 ? 'none' : M.mode === 'add' ? 'all' : g === mx ? 'guard' : c >= b ? 'craft' : 'body'; };
const bc = {}; for (const p of L) { const k = bind(p); bc[k] = (bc[k] ?? 0) + 1; }
log(`  binding gate on the ${L.length} priced pairs: ${Object.entries(bc).map(([k, v]) => `${k} ${v}`).join(', ')}`);
const miss = L.filter((p) => pr(M, p) !== p.cls);
log(`  disagreements (${miss.length}): owner -> model [raw; G/P/C]`);
for (const p of miss) log(`    ${p.k}: ${p.own} -> ${T4[pr(M, p)]} [${rawOf(p, M.kP, M.kC, M.mode, M.kR, M.kS).toFixed(1)}; ${p.G.toFixed(1)}/${p.P.toFixed(1)}/${p.C}]`);
// 2. SUPPORT model (which flexes exist): allowed iff body gap <= tP and craft gap <= tC. Not a cap on the price score: one joint score reaches only ~75% against a 68% majority baseline.
const sup = (set) => { let best = null; for (let tP = 0.5; tP <= 5; tP += 0.25) for (let tC = 1; tC <= 8; tC++) { const h = set.filter((p) => ((p.P <= tP && p.C <= tC) ? 1 : 0) === (p.own != null ? 1 : 0)).length; if (!best || h > best.h) best = { tP, tC, h }; } return best; };
const S = sup(pairs), sp = (m, p) => ((p.P <= m.tP && p.C <= m.tC) ? 1 : 0) === (p.own != null ? 1 : 0);
let sOk = 0, sN = 0; for (let rep = 0; rep < 5; rep++) { const o = pairs.map((_, i) => i).sort(() => rand() - 0.5); for (let k = 0; k < 5; k++) { const t = new Set(o.filter((_, i) => i % 5 === k)), m = sup(pairs.filter((_, i) => !t.has(i))); for (const i of t) { sN++; sOk += sp(m, pairs[i]); } } }
let sl = 0, sln = 0; for (const r of cfg.roles) { const t = pairs.filter((p) => p.a === r || p.b === r), m = sup(pairs.filter((p) => p.a !== r && p.b !== r)); sl += t.filter((p) => sp(m, p)).length; sln += t.length; }
log(`support: allowed iff body gap <= ${S.tP} and craft gap <= ${S.tC} | in-sample ${(100 * S.h / pairs.length).toFixed(1)}% | 5-fold CV ${(100 * sOk / sN).toFixed(1)}% | leave-one-role-out ${(100 * sl / sln).toFixed(1)}% | majority baseline (all not allowed) ${(100 * (pairs.length - listed.length) / pairs.length).toFixed(1)}%`);
const fa = pairs.filter((p) => p.own == null && p.P <= S.tP && p.C <= S.tC).length, fn = listed.filter((p) => !(p.P <= S.tP && p.C <= S.tC)).length;
log(`  support errors: ${fa} pairs allowed by the rule but absent from the table, ${fn} table pairs the rule forbids`);
