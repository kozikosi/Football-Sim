// mathlab/rolesurplus.mjs — READ-ONLY. Can the guard's star convention (20 OVR for every role) be replaced by a number each role carries in its OWN OVR data?
//   guard(src>dst) = s * (1 - w_src / w_dst)  when w_dst > w_src   (algebra: the zero-prize price for a star with surplus s over his in-position replacement)
//   flexunify uses s = 20 for every role. Here s_role = (top-decile starter OVR) - (first non-starter OVR), from data/nfl/madden27-ratings.csv (OVR + position only: the Owner's Q2 input rule).
//   Test: how many of the Owner's rules sit BELOW the guard (a violation = the Owner prices a move cheaper than the no-arbitrage price)?
// No engine, flex.json or flex.ts edit; no test suite. Run: node tools/mathlab/rolesurplus.mjs
import fs from 'fs';
import { parseCsv } from '../../colors/src/sports/nfl/engine/players.ts';
import { fieldSlots } from '../../colors/src/sports/nfl/engine/slots.ts';
const dir = new URL('.', import.meta.url);
const pool = parseCsv(fs.readFileSync(new URL('../../data/nfl/madden27-ratings.csv', import.meta.url), 'utf8'), false).filter((p) => p.team !== 'Free Agent');
const w = JSON.parse(fs.readFileSync(new URL('sport-football.json', dir))).weight;
const rules = JSON.parse(fs.readFileSync(new URL('flex.json', dir))).flex;
const slots = fieldSlots('4-3'); const out = []; const log = (...a) => { const s = a.join(' '); console.log(s); out.push(s); };
log('# rolesurplus: role-specific star surplus vs the constant 20 (read-only, 10 Nov 2026)');
log('\nrole  starters(32 teams)  pool  star(P90 of starters)  replacement(first non-starter)  s_role');
const S = {};
for (const r of Object.keys(w)) {
  const n = 32 * slots.filter((s) => s.dest === r).length, ovr = pool.filter((p) => p.role === r).map((p) => p.ovr).sort((a, b) => b - a);
  if (!n || ovr.length <= n) { log(`${r.padEnd(6)} ${String(n).padStart(3)}  ${String(ovr.length).padStart(4)}  (no data: no slot of its own or pool no larger than the starter count; s_role = 20 fallback)`); S[r] = 20; continue; }
  const star = ovr[Math.round(0.1 * n)], rep = ovr[n]; S[r] = star - rep;
  log(`${r.padEnd(6)} ${String(n).padStart(3)}  ${String(ovr.length).padStart(4)}  ${String(star).padStart(3)}  ${String(rep).padStart(3)}  ${String(S[r]).padStart(3)}`);
}
const G = (s, t, sv) => (w[t] > w[s] ? sv * (1 - w[s] / w[t]) : 0);
const rows = [];
for (const [s, row] of Object.entries(rules)) for (const [t, price] of Object.entries(row)) if (w[s] !== undefined && w[t] !== undefined && s !== t) rows.push({ s, t, price, g20: G(s, t, 20), gr: G(s, t, S[s]) });
const viol = (k, th) => rows.filter((r) => r.price < r[k] - th);
log(`\nOwner rules compared: ${rows.length} (source and destination both have a role weight)`);
for (const [k, name] of [['g20', 'constant s = 20 (flexunify today)'], ['gr', 's = role surplus from OVR data']]) {
  const v = viol(k, 1);
  log(`\n${name}: ${v.length} rules priced more than 1 OVR below the guard`);
  for (const r of v.sort((a, b) => (b[k] - b.price) - (a[k] - a.price))) log(`  ${r.s}>${r.t}: Owner ${r.price}, guard ${r[k].toFixed(1)}`);
}
const above = (k) => rows.filter((r) => r[k] > 0.5).length;
log(`\nRules with a guard above 0.5 (the guard is doing something): s=20: ${above('g20')}, role surplus: ${above('gr')}`);
log('\nSelected rows (Owner / guard s=20 / guard role-surplus):');
for (const [s, t] of [['FB', 'RB'], ['FB', 'TE'], ['C', 'OG'], ['C', 'OT'], ['C', 'DT'], ['TE', 'OT'], ['RB', 'WR'], ['EDGE', 'SS'], ['RB', 'SS'], ['OG', 'OT'], ['DT', 'OT']]) {
  const r = rows.find((x) => x.s === s && x.t === t); if (r) log(`  ${s}>${t}: ${r.price} / ${r.g20.toFixed(1)} / ${r.gr.toFixed(1)}`);
}
fs.writeFileSync(new URL('./results/rolesurplus-2026-11-10.md', import.meta.url), out.join('\n') + '\n');
