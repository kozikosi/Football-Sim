#!/usr/bin/env node
// P-345 / P-347 innovation: the lambda variance budget.
// Inputs: (1) the live product roster (Football-Sim-PreColors.html, PLAYERS array)
//         (2) P-344 team-game summary 2016-2025 (council/muse c7540b04)
// Output: between/within decomposition of the four totals; team-quality spread;
//         the lambda budget (points per SD of team quality the engine must generate);
//         the 2025 attribution regression (what ratings actually bought);
//         the roster-persistence curve (beta_s vs 2025 roster, s=2016..2025, pooled windows);
//         the naive dispersion-matching bias on real data (DS D4);
//         the lambda=0 gate reading (which SD arm passes).
// Deterministic, no RNG. Read-only.

import { readFileSync } from 'node:fs';

const HTML = process.argv[2] || 'Football-Sim-PreColors.html';
const CSV  = process.argv[3] || '/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/p346-pickle/tgs.csv';

// ---------- 1. roster ----------
const html = readFileSync(HTML, 'utf8');
const m = html.match(/const PLAYERS\s*=\s*(\[[\s\S]*?\]);\s*\n/);
if (!m) { console.error('PLAYERS array not found'); process.exit(1); }
const players = JSON.parse(m[1]);
const OFF = new Set(['QB','HB','RB','FB','WR','TE','LT','LG','C','RG','RT']);
const DEF = new Set(['LEDG','REDG','DT','NT','MIKE','WILL','SAM','CB','FS','SS']);
const byTeam = new Map();
for (const p of players) {
  const [name, pos, team, ovr] = p;
  if (!byTeam.has(team)) byTeam.set(team, { off: [], def: [] });
  const t = byTeam.get(team);
  if (OFF.has(pos)) t.off.push(ovr);
  else if (DEF.has(pos)) t.def.push(ovr);
}
const top = (a, k) => a.slice().sort((x, y) => y - x).slice(0, k);
const teamQ = {};
for (const [team, t] of byTeam) {
  const o = top(t.off, 11), d = top(t.def, 11);
  if (o.length < 8 || d.length < 8) { console.error('thin roster', team, t.off.length, t.def.length); process.exit(1); }
  teamQ[team] = { off: o.reduce((s, x) => s + x, 0) / o.length, def: d.reduce((s, x) => s + x, 0) / d.length };
}
const ABBR = {
  'Arizona Cardinals':'ARI','Atlanta Falcons':'ATL','Baltimore Ravens':'BAL','Buffalo Bills':'BUF',
  'Carolina Panthers':'CAR','Chicago Bears':'CHI','Cincinnati Bengals':'CIN','Cleveland Browns':'CLE',
  'Dallas Cowboys':'DAL','Denver Broncos':'DEN','Detroit Lions':'DET','Green Bay Packers':'GB',
  'Houston Texans':'HOU','Indianapolis Colts':'IND','Jacksonville Jaguars':'JAX','Kansas City Chiefs':'KC',
  'Las Vegas Raiders':'LV','Los Angeles Chargers':'LAC','Los Angeles Rams':'LA','Miami Dolphins':'MIA',
  'Minnesota Vikings':'MIN','New England Patriots':'NE','New Orleans Saints':'NO','NY Giants':'NYG',
  'NY Jets':'NYJ','Philadelphia Eagles':'PHI','Pittsburgh Steelers':'PIT','San Francisco 49ers':'SF',
  'Seattle Seahawks':'SEA','Tampa Bay Buccaneers':'TB','Tennessee Titans':'TEN','Washington Commanders':'WAS'
};
const gByAbbr = {};
for (const [full, q] of Object.entries(teamQ)) {
  const a = ABBR[full];
  if (!a) { console.error('no abbr for', full); process.exit(1); }
  gByAbbr[a] = 0.5 * (q.off + q.def);
}
const gVals = Object.values(gByAbbr);
const gMean = gVals.reduce((s, x) => s + x, 0) / gVals.length;
const gSD = Math.sqrt(gVals.reduce((s, x) => s + (x - gMean) ** 2, 0) / gVals.length);
const Z = {}; for (const a in gByAbbr) Z[a] = (gByAbbr[a] - gMean) / gSD;

// ---------- 2. team-game data ----------
const rows = readFileSync(CSV, 'utf8').trim().split('\n');
const head = rows[0].split(',');
const col = Object.fromEntries(head.map((h, i) => [h, i]));
const data = rows.slice(1).map(l => l.split(','));
const num = (r, c) => parseFloat(r[col[c]]);
const REG = data.filter(r => r[col.season_type] === 'REG');
const seasons = [...new Set(REG.map(r => +r[col.season]))].sort();

function cellStats(rs, metric) {
  const cells = new Map();
  for (const r of rs) {
    const k = r[col.season] + '|' + r[col.team];
    if (!cells.has(k)) cells.set(k, []);
    cells.get(k).push(num(r, metric));
  }
  const means = [], vars = [], ns = [];
  for (const v of cells.values()) {
    const mu = v.reduce((s, x) => s + x, 0) / v.length;
    means.push(mu); ns.push(v.length);
    vars.push(v.reduce((s, x) => s + (x - mu) ** 2, 0) / Math.max(1, v.length - 1));
  }
  return { means, vars, ns };
}

function decompose(rs, metric) {
  const { means, vars, ns } = cellStats(rs, metric);
  const n = means.length;
  const gm = means.reduce((s, x) => s + x, 0) / n;
  const varMeans = means.reduce((s, x) => s + (x - gm) ** 2, 0) / (n - 1);
  const meanWithin = vars.reduce((s, x) => s + x, 0) / n;
  const meanN = ns.reduce((s, x) => s + x, 0) / n;
  const varBetween = Math.max(0, varMeans - meanWithin / meanN);
  const sdBetween = Math.sqrt(varBetween), sdWithin = Math.sqrt(meanWithin);
  const sdSeasonMean = Math.sqrt(varMeans);           // what a season-mean table shows
  const sdMixed = Math.sqrt(varBetween + meanWithin); // team-game population SD
  return { gm, varMeans, meanWithin, meanN, varBetween, sdBetween, sdWithin, sdSeasonMean, sdMixed,
           icc: varBetween / (varBetween + meanWithin), n };
}

// ---------- 3. attribution ----------
function ols(y) {
  const ts = Object.keys(y);
  const my = ts.reduce((s, t) => s + y[t], 0) / ts.length;
  let cov = 0, vz = 0;
  for (const t of ts) { cov += (y[t] - my) * Z[t]; vz += Z[t] * Z[t]; }
  const beta = cov / vz;
  let sse = 0; for (const t of ts) { const e = y[t] - my - beta * Z[t]; sse += e * e; }
  const sig = Math.sqrt(sse / (ts.length - 2));
  const se = sig / Math.sqrt(vz);
  const r2 = 1 - sse / ts.reduce((s, t) => s + (y[t] - my) ** 2, 0);
  return { beta, se, r2, n: ts.length };
}
const teamMeans = (rs, metric) => {
  const tm = {};
  for (const r of rs) { const t = r[col.team]; (tm[t] ||= []).push(num(r, metric)); }
  const y = {}; for (const t in tm) y[t] = tm[t].reduce((a, x) => a + x, 0) / tm[t].length;
  return y;
};
const b25 = ols(teamMeans(REG.filter(r => +r[col.season] === 2025), 'points'));
// persistence: season s means vs the 2025 roster, single season and 3-season windows
const persistSingle = seasons.map(s => ({ s, ...ols(teamMeans(REG.filter(r => +r[col.season] === s), 'points')) }));
const windows = [[2016, 2018], [2019, 2021], [2022, 2024], [2025, 2025]];
const persistWin = windows.map(([a, b]) => {
  const rs = REG.filter(r => +r[col.season] >= a && +r[col.season] <= b);
  const b1 = ols(teamMeans(rs, 'points'));
  return { label: a === b ? `${a}` : `${a}-${b}`, from: a, to: b, nGames: rs.length, ...b1 };
});

// ---------- 4. print ----------
const f = x => x.toFixed(3), f1 = x => x.toFixed(1), f2 = x => x.toFixed(2), f3 = x => x.toFixed(3);
const pct = x => (100 * x).toFixed(1) + '%';
console.log('# lambda variance budget — P-345/P-347 — pickle');
console.log('# roster:', HTML, '| players:', players.length, '| teams:', Object.keys(gByAbbr).length);
console.log('# data:', CSV, '| REG team-games:', REG.length, '| seasons:', seasons[0], '-', seasons[seasons.length - 1]);
console.log('\n## team quality (mean of top-11 OVR per side, 0.5/0.5)');
console.log(`mean ${f2(gMean)} OVR, SD ${f2(gSD)} OVR, range ${f2(Math.min(...gVals))}-${f2(Math.max(...gVals))}`);
const sortQ = Object.entries(gByAbbr).sort((a, b) => b[1] - a[1]);
console.log('top5:', sortQ.slice(0, 5).map(([t, v]) => t + ' ' + f1(v)).join(', '));
console.log('bot5:', sortQ.slice(-5).map(([t, v]) => t + ' ' + f1(v)).join(', '));

console.log('\n## variance decomposition (REG, team-season cells; 320 cells over 10 seasons)');
console.log('metric   mean    sdGame  sdBetween sdWithin   ICC  sdSeasonMean  lambdaBudget*');
const dec = {};
for (const metric of ['points', 'drives', 'plays', 'yards']) {
  const d = decompose(REG, metric); dec[metric] = d;
  console.log(`${metric.padEnd(7)} ${f2(d.gm).padStart(6)} ${f2(d.sdMixed).padStart(8)} ${f2(d.sdBetween).padStart(9)} ${f2(d.sdWithin).padStart(8)} ${f2(d.icc).padStart(6)} ${f2(d.sdSeasonMean).padStart(12)} ${f2(d.sdBetween).padStart(12)}`);
}
console.log('  * metalambda: with team quality G standardised (Var(G)=1), the engine at lambda must generate');
console.log('    between-team season-mean SD = lambda, because its own luck (sdWithin/sqrt(17)) is subtracted out.');
console.log(`    In OVR units: 1 OVR of team quality = ${f2(dec.points.sdBetween / gSD)} points/game (budget), ${f2(b25.beta / gSD)} (attribution).`);

console.log('\n## DS D4 on real data: dispersion matching vs the between-component');
const dP = dec.points;
const naiveGame = dP.sdMixed, naiveSeason = dP.sdSeasonMean, correct = dP.sdBetween;
console.log(`  correct ANOVA between-component : lambda = ${f2(correct)} pts/SD  (sdBetween)`);
console.log(`  naive team-game dispersion     : lambda = ${f2(naiveGame)} pts/SD  -> +${pct(naiveGame / correct - 1)}`);
console.log(`  naive season-mean dispersion    : lambda = ${f2(naiveSeason)} pts/SD  -> +${pct(naiveSeason / correct - 1)}`);
console.log(`  (DS D4 synthetic: +23% to +75% at residual shares 33-67%.)`);

console.log('\n## 2025 attribution (team-season mean points vs the 2025 roster quality)');
console.log(`beta = ${f(b25.beta)} pts/SD (SE ${f(b25.se)}, R2 ${f(b25.r2)}, n ${b25.n})  [OVR-conditional; attenuated by rating measurement error]`);

console.log('\n## roster-persistence: team mean points in year(s) vs the 2025 roster quality');
console.log('window      beta     SE     R2   games');
for (const w of persistWin) console.log(`${w.label.padEnd(9)} ${f(w.beta).padStart(6)} ${f(w.se).padStart(6)} ${f2(w.r2).padStart(6)} ${String(w.nGames).padStart(5)}`);

console.log('\n## the lambda-0 gate reading (which SD arm passes at ~10%)');
console.log('metric   sdWithin(engine@l=0)  sdGame(real)  gap');
for (const mt of ['points', 'drives', 'plays', 'yards']) {
  const d = dec[mt];
  console.log(`${mt.padEnd(7)} ${f2(d.sdWithin).padStart(18)} ${f2(d.sdMixed).padStart(13)} ${('-' + pct(1 - d.sdWithin / d.sdMixed)).padStart(8)}`);
}
console.log('  A lambda=0 engine can only produce sdWithin; all four are inside a 10% SD bar, so the SD arm of');
console.log('  the totals bar PASSES by construction and must not be read as the model working.');

console.log('\n## margin parity target (the quantity the parity anchor is about)');
const marg = {};
const PF = teamMeans(REG, 'points');
const PA = {};
for (const r of REG) { const t = r[col.team]; (PA[r[col.season] + '|' + t] ||= []).push(num(r, 'points')); }
// season-mean margin per team-season, between-team SD
const cs = cellStats(REG, 'points'); // for means only, use per-cell recompute below
const cellMargin = new Map();
for (const r of REG) {
  const k = r[col.season] + '|' + r[col.team];
  const gid = r[col.game_id];
  // pair PF/PA by game_id + team: compute from the two rows of the same game
}
// simpler: per cell, sum(points) - sum(points of opponents) over games
const cellAgg = new Map();
for (const r of REG) {
  const k = r[col.season] + '|' + r[col.team];
  if (!cellAgg.has(k)) cellAgg.set(k, { pf: 0, pa: 0, n: 0 });
  const a = cellAgg.get(k); a.pf += num(r, 'points'); a.n++;
}
// join opponents by game_id
const gidRows = new Map();
for (const r of REG) { const g = r[col.game_id]; (gidRows.get(g) || gidRows.set(g, []).get(g)).push(r); }
for (const [g, rs] of gidRows) {
  if (rs.length !== 2) continue;
  for (const r of rs) {
    const k = r[col.season] + '|' + r[col.team];
    const opp = rs.find(x => x !== r);
    cellAgg.get(k).pa += num(opp, 'points');
  }
}
const mMeans = []; for (const a of cellAgg.values()) mMeans.push((a.pf - a.pa) / a.n);
const mMean = mMeans.reduce((s, x) => s + x, 0) / mMeans.length;
const mVar = mMeans.reduce((s, x) => s + (x - mMean) ** 2, 0) / (mMeans.length - 1);
console.log(`season-mean margin: between-team SD = ${f2(Math.sqrt(mVar))} points/game (mean ${f2(mMean)}), n=${mMeans.length} team-seasons`);
// game-level margin SD (for the win-probability bridge to the Lab's wins)
let sq = 0, cnt = 0;
for (const [g, rs] of gidRows) { if (rs.length !== 2) continue; const d = num(rs[0], 'points') - num(rs[1], 'points'); sq += d * d; cnt++; }
const sdGameMargin = Math.sqrt(sq / cnt);
const phi0 = 0.3989422804014327;
const sdSeasonMargin = Math.sqrt(mVar);
const winsPerSD = 17 * phi0 * sdSeasonMargin / sdGameMargin;
console.log(`game margin SD = ${f2(sdGameMargin)}; phi(0)=${f3(phi0)} -> wins per SD of team quality = 17*phi(0)*${f2(sdSeasonMargin)}/${f2(sdGameMargin)} = ${f2(winsPerSD)} (INFERRED: normal win model)`);

console.log('\n## per-season between-team SD of season-mean points (stability of the budget)');
let sds = [];
for (const s of seasons) { const d = decompose(REG.filter(r => +r[col.season] === s), 'points'); sds.push(d.sdBetween); console.log(`  ${s}: ${f2(d.sdBetween)}`); }
console.log(`  mean ${f2(sds.reduce((a, x) => a + x, 0) / sds.length)}, range ${f2(Math.min(...sds))}-${f2(Math.max(...sds))}`);

console.log('\n## 2025 sanity: Z (2025 roster) vs real 2025 REG points/game');
const y25 = teamMeans(REG.filter(r => +r[col.season] === 2025), 'points');
const bt = Object.keys(Z).sort((a, b) => Z[b] - Z[a]);
console.log('team  Z     ppg');
for (const t of bt) console.log(`${t.padEnd(4)} ${Z[t] >= 0 ? ' ' : ''}${f2(Z[t])}  ${f2(y25[t] ?? 0)}`);

console.log('\n## the band');
console.log(`attribution floor  beta_2025 = ${f(b25.beta)} pts/SD (SE ${f(b25.se)})`);
console.log(`parity budget      lambda     = ${f(dec.points.sdBetween)} pts/SD`);
console.log(`band width ${f2(dec.points.sdBetween - b25.beta)} pts/SD; ratio ${f(dec.points.sdBetween / b25.beta)}`);
