// mathlab/flexunify.mjs — READ-ONLY design prototype ("one operator"): every flex price is a soft-max (p-norm) over lower bounds, and the value guard is just one more coordinate.
//   price(src->dst) = s * || ( W_d * max(0, need_dst[d] - have_src[d]) for loaded duties d , G(src,dst) ) ||_k
//   G = 20 * (1 - v_src / v_dst) when v_dst > v_src (no-arbitrage), v = the engine-measured marginal value of the slot (gravity included when the engine models it).
//   k = ONE dial: k=1 adds the constraints, k=inf takes the worst one. Same operator inside the ability layer and across ability/guard (Owner Q7: adjustable blend).
// Variants compared (all vs the Owner's 99, which are a guide: mean error in points + Spearman first, exact tiers last):
//   zai      ZAI-D1 as written (M + 0.4 S, cuts 1/4/9)           [baseline, no guard]
//   zai+G    ZAI-D1 ability, max(L, G)                            [93/99 per MUSE; the guard-as-gate-free variant]
//   U-need   p-norm over NEED/HAVE duty gaps + G, fit (k, s)
//   U-self   NO NEED table: a role's duty importance is its own profile level (single vector per role), + G, fit (k, s, gamma)
// Honesty: constants (k, s, gamma) are fit on the 99; --loro refits blind to one role at a time and prices it. Nothing here writes flex.json or touches the engine.
import fs from 'fs';
const dir = new URL('.', import.meta.url);
const live = JSON.parse(fs.readFileSync(new URL('flex.json', dir))).flex;
const cfg = JSON.parse(fs.readFileSync(new URL('sport-football.json', dir)));
const P = JSON.parse(fs.readFileSync(new URL('flexunify-profiles.json', dir)));
const v = cfg.weight, REF = cfg.refGap, D = P.duties, TIERS = [0, 2, 6, 12];
const roles = cfg.roles, srcRoles = cfg.sources;
const out = []; const log = (...a) => { const s = a.join(' '); console.log(s); out.push(s); };
const haveOf = (r) => Object.fromEntries(D.map((d, i) => [d, (P.have[r] ?? P.have[cfg.bodyOf?.[r]])[i]]));
const loaded = (dst, d) => !(P.scope[d] && !P.scope[d].includes(dst));
const G = (s, t) => (v[t] > v[s] ? REF * (1 - v[s] / v[t]) : 0);
const pn = (a, k) => (k === Infinity ? Math.max(0, ...a) : Math.pow(a.reduce((x, y) => x + Math.pow(y, k), 0), 1 / k));
const tier = (x) => (x < 1 ? 0 : x < 4 ? 2 : x < 9 ? 6 : 12);
// ability-gap vectors
const gapsNeed = (s, t) => { const h = haveOf(s); return Object.entries(P.need[t]).filter(([d]) => loaded(t, d)).map(([d, n]) => P.W[d] * Math.max(0, n - h[d])); };
const gapsSelf = (s, t, gam, ds = null) => { const h = haveOf(s), ht = haveOf(t); return D.filter((d) => loaded(t, d)).map((d) => P.W[d] * Math.pow(ht[d] / 10, gam) * Math.max(0, ht[d] - h[d])); };
const zai = (s, t) => { const g = gapsNeed(s, t).sort((a, b) => b - a); return g.length ? g[0] + 0.4 * g.slice(1).reduce((x, y) => x + y, 0) : 0; };
const MODEL = {
  zai: (s, t) => zai(s, t),
  'zai+G': (s, t) => Math.max(zai(s, t), G(s, t)),
  'U-need': (s, t, m) => pn([...gapsNeed(s, t).map((x) => m.s * x), G(s, t)], m.k),      // the guard is a convention (20), never scaled by the fit
  'U-self': (s, t, m) => pn([...gapsSelf(s, t, m.gam).map((x) => m.s * x), G(s, t)], m.k),
  'zai~G': (s, t, m) => pn([zai(s, t), m.a * G(s, t)], m.q),                              // Z.ai's ability layer unchanged; ONE dial q blends it with the guard, a weighs the guard
};
// pairs
const pairs = []; for (const s of srcRoles) for (const t of roles) { if (s === t) continue; pairs.push({ k: `${s}>${t}`, s, t, own: live[s]?.[t] ?? null }); }
const L = pairs.filter((p) => p.own != null);
const rank = (a) => { const o = a.map((x, i) => [x, i]).sort((p, q) => p[0] - q[0]); const r = Array(a.length); let i = 0; while (i < o.length) { let j = i; while (j + 1 < o.length && o[j + 1][0] === o[i][0]) j++; for (let q = i; q <= j; q++) r[o[q][1]] = (i + j) / 2; i = j + 1; } return r; };
const spearman = (a, b) => { const x = rank(a), y = rank(b), n = a.length, mx = x.reduce((p, q) => p + q) / n, my = y.reduce((p, q) => p + q) / n; let sxy = 0, sxx = 0, syy = 0; for (let i = 0; i < n; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) ** 2; syy += (y[i] - my) ** 2; } return sxy / Math.sqrt(sxx * syy); };
const score = (name, m, set = L) => { const pr = set.map((p) => MODEL[name](p.s, p.t, m)); const mae = set.reduce((a, p, i) => a + Math.abs(pr[i] - p.own), 0) / set.length; const ex = set.filter((p, i) => tier(pr[i]) === p.own).length; return { mae, ex, rho: spearman(pr, set.map((p) => p.own)), pr }; };
const KS = [1, 1.5, 2, 3, 4, 6, Infinity], SS = Array.from({ length: 31 }, (_, i) => 0.5 + i * 0.05), GAMS = [0, 1, 2];
function fit(name, set) { let best = null; for (const k of KS) for (const s of SS) for (const gam of name === 'U-self' ? GAMS : [0]) { const m = { k, s, gam }; const sc = score(name, m, set); if (!best || sc.mae < best.mae) best = { ...m, mae: sc.mae }; } return best; }
log(`flexunify | ${L.length} Owner rules (excl. same-role) of ${pairs.length} ordered pairs | slot values v from sport-football.json (slots.ts a722681 + WILL/C bumps)`);
const fits = {};
for (const name of ['zai', 'zai+G', 'U-need', 'U-self']) {
  const m = name.startsWith('U-') ? fit(name, L) : { k: '-', s: 1, gam: 0 }; fits[name] = m; const sc = score(name, m);
  log(`${name.padEnd(7)} k=${m.k} s=${m.s?.toFixed?.(2)} gam=${m.gam} | mean error ${sc.mae.toFixed(2)} OVR | Spearman ${sc.rho.toFixed(3)} | exact tiers ${sc.ex}/${L.length}`);
}
// leave-one-role-out: refit blind to role r (drop every pair touching r), price the dropped pairs
for (const name of ['U-need', 'U-self']) { let e = 0, n = 0, ex = 0; const per = []; for (const r of roles) { const held = L.filter((p) => p.s === r || p.t === r); if (!held.length) continue; const m = fit(name, L.filter((p) => p.s !== r && p.t !== r)); const sc = score(name, m, held); e += sc.mae * held.length; n += held.length; ex += sc.ex; per.push([r, sc.mae, held.length]); }
  log(`LORO ${name}: held-out mean error ${(e / n).toFixed(2)} OVR over ${n} cases, exact tiers ${ex}/${n}; worst roles ${per.sort((a, b) => b[1] - a[1]).slice(0, 4).map(([r, x, c]) => `${r} ${x.toFixed(1)}(${c})`).join(', ')}`); }
log('dial sweep, Z.ai ability + guard: price = || (L, a*G) ||_q   [exact tiers / mean error / centre-out arbitrage rows (C>X price < G - 1)]');
for (const q of [1, 2, 4, Infinity]) log(`  q=${q}: ` + [0, 0.25, 0.5, 0.75, 1].map((a) => { const m = { a, q }; const sc = score('zai~G', m); const arb = ['OG', 'OT', 'DT', 'EDGE'].filter((t) => MODEL['zai~G']('C', t, m) < G('C', t) - 1).length; return `a=${a}: ${sc.ex}/${L.length} ${sc.mae.toFixed(2)} C-arb ${arb}`; }).join(' | '));
{ // zai has no fitted constants of its own beyond Z.ai's, so its LORO is its in-sample row; report the two guard-free baselines alongside for scale
  const sc = score('zai', {}); log(`(zai constants are Z.ai's fixed lambda 0.4 and cuts 1/4/9, authored profile tables fit to the 99 by hand: its held-out accuracy is UNMEASURED)`); }
// sweep k for U-need, scale refit each k: how malleable is the blend
log('k sweep (U-need, s refit): ' + KS.map((k) => { let b = null; for (const s of SS) { const sc = score('U-need', { k, s }); if (!b || sc.mae < b.mae) b = { s, ...sc }; } return `k=${k}: err ${b.mae.toFixed(2)} ex ${b.ex}`; }).join(' | '));
// disagreements for the chosen model
const MM = fits['U-need']; const sc = score('U-need', MM);
const dis = L.map((p, i) => ({ k: p.k, own: p.own, raw: sc.pr[i], g: G(p.s, p.t) })).filter((r) => Math.abs(r.raw - r.own) >= 3.5).sort((a, b) => Math.abs(b.raw - b.own) - Math.abs(a.raw - a.own));
log(`U-need disagreements >= 3.5 points (${dis.length}): owner -> model [G]`); dis.forEach((r) => log(`  ${r.k}: ${r.own} -> ${r.raw.toFixed(1)} [G ${r.g.toFixed(1)}]`));
// natural output: what integers does the engine produce?
const all = pairs.map((p) => MODEL['U-need'](p.s, p.t, MM)); const hist = {}; for (const x of all) { const b = Math.min(20, Math.round(x)); hist[b] = (hist[b] ?? 0) + 1; }
log(`natural integer output over all ${pairs.length} pairs (rounded, 20 = cap bucket): ` + Object.entries(hist).map(([b, c]) => `${b}:${c}`).join(' '));
const histL = {}; for (const p of L) { const b = Math.min(20, Math.round(MODEL['U-need'](p.s, p.t, MM))); histL[b] = (histL[b] ?? 0) + 1; }
log(`  on the Owner's ${L.length} rules: ` + Object.entries(histL).map(([b, c]) => `${b}:${c}`).join(' '));
// support: prohibition falls out of the price? forbidden iff price >= threshold
const allRaw = pairs.map((p, i) => ({ ...p, raw: all[i] })); let bestT = null;
for (const T of [8, 10, 12, 14, 16, 18, 20, 24]) { const ok = allRaw.filter((p) => (p.raw < T) === (p.own != null)).length; if (!bestT || ok > bestT.ok) bestT = { T, ok }; log(`  allowed iff price < ${T}: ${(100 * ok / allRaw.length).toFixed(1)}% right (majority baseline "all forbidden" ${(100 * (pairs.length - L.length) / pairs.length).toFixed(1)}%)`); }
// center diagnostic: price vs guard for every C>X, and arbitrage rows (price below the no-arbitrage guard) per model
log('center diagnostic (C>X: owner / zai / zai+G / U-need / G):'); for (const t of roles) if (t !== 'C') { const row = [live.C?.[t] ?? '-', MODEL.zai('C', t).toFixed(1), MODEL['zai+G']('C', t).toFixed(1), MODEL['U-need']('C', t, MM).toFixed(1), G('C', t).toFixed(1)]; if (G('C', t) > 0.5 || live.C?.[t] != null) log(`  C>${t}: ${row.join(' / ')}`); }
for (const name of ['zai', 'zai+G', 'U-need', 'U-self']) { const arb = pairs.filter((p) => MODEL[name](p.s, p.t, fits[name]) < G(p.s, p.t) - 1); log(`arbitrage rows (price < guard - 1) in ${name}: ${arb.length} of ${pairs.length}${name === 'zai' ? ' | ' + arb.filter((p) => G(p.s, p.t) >= 4).map((p) => `${p.k} (${MODEL.zai(p.s, p.t).toFixed(1)} vs ${G(p.s, p.t).toFixed(1)})`).join(', ') : ''}`); }
// prohibition candidates: forbidden iff the destination's core duty is (nearly) absent from the source
{ const core = (t) => Object.entries(P.need[t] ?? {}).filter(([d]) => loaded(t, d)).sort((a, b) => P.W[b[0]] * b[1] - P.W[a[0]] * a[1])[0];
  for (const f of [0.3, 0.5, 0.6, 0.7, 0.8]) { const ok = pairs.filter((p) => { if (!P.need[p.t]) return true; const [d, n] = core(p.t); return ((haveOf(p.s)[d] >= f * n) ? 1 : 0) === (p.own != null ? 1 : 0); }).length; log(`  allowed iff source has >= ${f} of the core duty: ${(100 * ok / pairs.length).toFixed(1)}% right`); } }
// emergence: slots defined only by a demand mix; price falls out. need mixture = weighted union of existing roles' needs
const mix = (parts) => { const o = {}; for (const [r, a] of parts) for (const [d, n] of Object.entries(P.need[r])) o[d] = (o[d] ?? 0) + a * n; return o; };
function slotPrice(demand, vSlot, s, m) { const h = haveOf(s); const g = Object.entries(demand).filter(([d]) => loaded('EDGE', d) || !P.scope[d]).map(([d, n]) => P.W[d] * Math.max(0, n - h[d])); const gg = vSlot > v[s] ? REF * (1 - v[s] / vSlot) : 0; return m.s * pn([...g, gg], m.k); }
const demos = { 'DL5 blitzer (0.7 EDGE + 0.3 DT demand, v=300)': [mix([['EDGE', 0.7], ['DT', 0.3]]), 300, ['DT', 'EDGE', 'OLB', 'ILB', 'OG']], 'Big nickel (0.5 SS + 0.3 OLB + 0.2 CB demand, v=100)': [mix([['SS', 0.5], ['OLB', 0.3], ['CB', 0.2]]), 100, ['SS', 'OLB', 'ILB', 'CB', 'FS', 'WR', 'TE']] };
for (const [nm, [dem, vs, srcs]] of Object.entries(demos)) log(`emergent slot ${nm}: ` + srcs.map((s) => `${s} ${slotPrice(dem, vs, s, MM).toFixed(1)}`).join(', '));
// dual positions: holdings set H; price to play role t = min over h in H of price(h>t); own positions free
const dual = (H, t) => (H.includes(t) ? 0 : Math.min(...H.map((h) => MODEL['U-need'](h, t, MM))));
log(`dual positions (holdings {CB,WR}): play WR ${dual(['CB', 'WR'], 'WR')}, play CB ${dual(['CB', 'WR'], 'CB')}, play NICKEL ${dual(['CB', 'WR'], 'NICKEL').toFixed(1)} (vs CB alone ${MODEL['U-need']('CB', 'NICKEL', MM).toFixed(1)}), play FS ${dual(['CB', 'WR'], 'FS').toFixed(1)}, play RB ${dual(['CB', 'WR'], 'RB').toFixed(1)}`);
fs.writeFileSync(new URL('results/flexunify-2026-11-10.md', dir), '```\n' + out.join('\n') + '\n```\n');
