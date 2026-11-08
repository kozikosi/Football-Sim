#!/usr/bin/env node
// tools/mathlab/param-diff.mjs — CICCP-3 Q4 parameter diff: original -> calibrated -> position -> measured effect.
// Zero product bytes: it imports the engine and the frozen legacy coefficients, measures, and prints a markdown report.
// Two calibrations, kept apart (answer Q4, inbox/20261108-1200-architect-to-zai-ciccp3-answers.md):
//   Oct  (27-28 Oct) Pre-Colors knobs fitted to design x 0.00254        A = Pre-Colors as shipped, B = after the Oct fits (frozen legacy coefficients)
//   Nov  (6 Nov)     Colors specs refitted to the Owner's salary table   C = specs.ts now
// Measured effect = wins per +20 OVR (70 -> 90) per slot, shown in weight points (wins / 0.00254, QB ~ 1000).
//   A: Pre-Colors' own slotWinsPerOvr() (its sandboxed inline script). B and C: Colors derivedWeights('4-3').
//   node --experimental-strip-types tools/mathlab/param-diff.mjs <Football-Sim-PreColors.html> [--out FILE]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { sandboxEval } from './witness.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '../..');
const eng = path.join(root, 'colors/src/sports/nfl/engine');
const imp = (p) => import(pathToFileURL(p).href);
const args = process.argv.slice(2);
const oi = args.indexOf('--out');
const outFile = oi >= 0 ? args[oi + 1] : null;
const pre = args.find((a, i) => !a.startsWith('--') && !(oi >= 0 && i === oi + 1));
if (!pre) { console.error('usage: param-diff.mjs <Football-Sim-PreColors.html> [--out FILE]'); process.exit(2); }

const buf = fs.readFileSync(pre);
const preSha = crypto.createHash('sha256').update(buf).digest('hex').slice(0, 16);
if (preSha !== '40233d6be00e987c') { console.error(`NOT Pre-Colors (sha256 ${preSha}): stop`); process.exit(2); }

const { DEF_SPECS, PERS_REC, RATING_SPECS, RB_HEAVY, MC, PUNT_PTS } = await imp(path.join(eng, 'specs.ts'));
const { derivedWeights, WEIGHT_UNIT_WINS: U } = await imp(path.join(eng, 'value.ts'));
const { SLOT_IDS, WEIGHT } = await imp(path.join(eng, 'slots.ts'));
const { withLegacyCoefficients } = await imp(path.join(root, 'colors/test/nfl/golden/legacy-coefficients.ts'));
const fit = JSON.parse(fs.readFileSync(path.join(here, 'results/fit-precolors-2026-10-28-recv.json'), 'utf8'));
const cfg = JSON.parse(fs.readFileSync(path.join(here, 'cfg.json'), 'utf8'));

const clone = (o) => JSON.parse(JSON.stringify(o));
const tables = () => clone({ RATING_SPECS, DEF_SPECS, PERS_REC, RB_HEAVY: { RB_HEAVY }, MC: { kick: MC.kick } });
const C = tables();                                   // Nov refit = live specs.ts
const B = withLegacyCoefficients(tables);             // Oct calibrated = frozen legacy coefficients (Colors port of the Oct fits)
const A = { ...clone(fit.orig), MC: fit.origMC };     // original = Pre-Colors as shipped (fit input)

const LAYER = { RATING_SPECS: 'rating', DEF_SPECS: 'defence package', PERS_REC: 'personnel', RB_HEAVY: 'personnel', MC: 'monte-carlo' }; // my grouping, not Beam/VL's
const f = (v, d = 3) => { if (v == null) return '—'; const s = Number(v).toFixed(d); return s.includes('.') ? (s.replace(/\.?0+$/, '') || '0') : s; };
const ratio = (c, b) => (b == null || c == null || b === 0 ? '—' : `${(c / b).toFixed(2)}×`);
const flag = (c, b) => (b && c != null && (c / b > 10 || c / b < 0.1) ? ' FLAG' : '');

// ---- coefficient diff (original -> Oct calibrated -> Nov refit)
const coefRows = [];
for (const g of ['RATING_SPECS', 'DEF_SPECS', 'PERS_REC']) {
  for (const spec of Object.keys(C[g])) {
    const keys = [...new Set([...Object.keys(A[g]?.[spec] ?? {}), ...Object.keys(B[g][spec] ?? {}), ...Object.keys(C[g][spec] ?? {})])];
    for (const k of keys) coefRows.push({ layer: LAYER[g], g, spec, k, a: A[g]?.[spec]?.[k], b: B[g][spec]?.[k], c: C[g][spec]?.[k] });
  }
}
for (const k of Object.keys(C.RB_HEAVY.RB_HEAVY)) coefRows.push({ layer: LAYER.RB_HEAVY, g: 'RB_HEAVY', spec: 'RB_HEAVY', k, a: undefined, b: B.RB_HEAVY.RB_HEAVY[k], c: C.RB_HEAVY.RB_HEAVY[k] });
const coefTable = ['| layer | table.spec | slot | original (Pre-Colors) | Oct calibrated | Nov refit | Nov/Oct |', '|---|---|---|---:|---:|---:|---:|']
  .concat(coefRows.map((r) => `| ${r.layer} | ${r.g}.${r.spec} | ${r.k} | ${f(r.a)} | ${f(r.b)} | ${f(r.c)} | ${ratio(r.c, r.b)}${flag(r.c, r.b)} |`)).join('\n');
const bothAB = coefRows.filter((r) => r.a != null && r.b != null);
const flagged = coefRows.filter((r) => r.b && r.c != null && (r.c / r.b > 10 || r.c / r.b < 0.1));
const sameAsSnapped = (() => { let n = 0, m = 0; for (const g of ['RATING_SPECS', 'DEF_SPECS', 'PERS_REC']) for (const [s, o] of Object.entries(fit.snapped[g] ?? {})) for (const [k, v] of Object.entries(o)) { m++; if (B[g][s]?.[k] === v) n++; } return [n, m]; })();

// ---- Monte-Carlo knobs and punter
const mcKeys = [...new Set([...Object.keys(A.MC), ...Object.keys(fit.mcOut), ...Object.keys(MC)])];
const mcRows = mcKeys.map((k) => ({ k, a: A.MC[k], b: fit.mcOut[k], c: MC[k] }));
const mcTable = ['| knob | original | Oct calibrated (fit 28 Oct) | Colors now | now/Oct |', '|---|---:|---:|---:|---:|']
  .concat(mcRows.map((r) => `| ${r.k} | ${f(r.a, 5)} | ${f(r.b, 5)} | ${f(r.c, 5)} | ${ratio(r.c, r.b)}${flag(r.c, r.b)} |`)).join('\n')
  + `\n| PUNT_PTS | n/a (lab patch adds it) | ${f(fit.puntPts, 5)} (cfg patch ${cfg.patch.puntPts}) | ${f(PUNT_PTS, 5)} | ${ratio(PUNT_PTS, fit.puntPts)}${flag(PUNT_PTS, fit.puntPts)} |`;

// ---- position roll-up and slot measurement
const posOf = (s) => (/^QB$/.test(s) ? 'QB' : /^(RB|FB)/.test(s) ? 'RB' : /^WR/.test(s) ? 'WR' : /^TE/.test(s) ? 'TE' : /^(OT|OG|C$)/.test(s) ? 'OL'
  : /^(DE|DT|DL)/.test(s) ? 'DL' : /^(MIKE|WILL|SAM)$/.test(s) ? 'LB' : /^(CB|DIME)/.test(s) ? 'CB' : /^(SS|FS)$/.test(s) ? 'S' : /^(K|P)$/.test(s) ? 'ST' : '?');
const E = sandboxEval(buf.toString('utf8'));
const rawA = E.slotWinsPerOvr();
const Mb = withLegacyCoefficients(() => derivedWeights('4-3'));
const Mc = derivedWeights('4-3');
const Ma = Object.fromEntries(Object.entries(rawA).map(([k, v]) => [k, (v * 20) / U])); // Pre-Colors reports wins per OVR point; x20 = wins per 70 -> 90
const octT = Object.fromEntries(Object.entries(cfg.targets).map(([k, v]) => [k, v / U]));
const rows = SLOT_IDS.map((s) => ({ pos: posOf(s), s, octT: octT[s], a: Ma[s], b: s === 'P' ? undefined : Mb[s], novT: WEIGHT[s], c: Mc[s] }));
const slotTable = ['| pos | slot | Oct target | A original | B Oct calibrated | Nov target (Owner) | C Nov refit | C − target |', '|---|---|---:|---:|---:|---:|---:|---:|']
  .concat(rows.map((r) => `| ${r.pos} | ${r.s} | ${f(r.octT, 0)} | ${f(r.a, 0)} | ${f(r.b, 0)} | ${f(r.novT, 0)} | ${f(r.c, 0)} | ${f(r.c - r.novT, 1)} |`)).join('\n');
const common = rows.filter((r) => r.a != null && r.b != null && r.octT != null);
const poss = [...new Set(common.map((r) => r.pos))];
const sum = (xs, k) => xs.reduce((t, r) => t + r[k], 0);
const posTable = ['| position | n | Σ Oct target | Σ A | Σ B | Σ Nov target | Σ C |', '|---|---:|---:|---:|---:|---:|---:|']
  .concat(poss.map((p) => { const xs = common.filter((r) => r.pos === p); return `| ${p} | ${xs.length} | ${f(sum(xs, 'octT'), 0)} | ${f(sum(xs, 'a'), 0)} | ${f(sum(xs, 'b'), 0)} | ${f(sum(xs, 'novT'), 0)} | ${f(sum(xs, 'c'), 0)} |`; })).join('\n');
const maxDev = (xs, g, t) => xs.filter((r) => r[g] != null && r[t] != null).reduce((m, r) => (Math.abs(r[g] - r[t]) > m.v ? { v: Math.abs(r[g] - r[t]), s: r.s } : m), { v: 0, s: '' });
const dA = maxDev(rows, 'a', 'octT'), dB = maxDev(rows, 'b', 'octT'), dBn = maxDev(rows, 'b', 'novT'), dC = maxDev(rows, 'c', 'novT');
const pctText = (d) => `${d.v.toFixed(1)} pts at ${d.s}`;

let head = '';
try { head = (await import('node:child_process')).execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim(); } catch { head = 'unknown'; }
const md = `# Q4 parameter diff: original -> calibrated -> position -> measured effect

Generated by \`node --experimental-strip-types tools/mathlab/param-diff.mjs Football-Sim-PreColors.html --out <this file>\` (engine at ${head}, Pre-Colors sha256 ${preSha}). Every number below is computed by that command from the engine, the frozen legacy coefficients and \`results/fit-precolors-2026-10-28-recv.json\`; nothing is typed by hand. Two calibrations, kept apart: **Oct** (27-28 Oct, Pre-Colors knobs fitted to design x 0.00254) and **Nov** (6 Nov, Colors specs refitted to the Owner's salary table). Measured effect = wins per +20 OVR (70 -> 90) in weight points (wins / 0.00254; QB ~ 1000).

Stages: **A** original = Pre-Colors as shipped (its own \`slotWinsPerOvr\`); **B** Oct calibrated = frozen legacy coefficients run in the Colors engine (\`withLegacyCoefficients\`); **C** Nov refit = \`specs.ts\` now. "Layer" is MY grouping of the tables (rating / defence package / personnel / monte-carlo), not Beam's or VL's layer-audit columns, which are not defined anywhere in this repo (UNKNOWN: send the column list).

## 1. Measured effect, per slot (VERIFIED)
${slotTable}

Max |measured − target|: A vs Oct target ${pctText(dA)} (the unfitted original); B vs Oct target ${pctText(dB)}; B vs Nov target ${pctText(dBn)}; C vs Nov target ${pctText(dC)} (Owner limit 50). P is not shown for B: \`PUNT_PTS\` is a const that the legacy swap does not replace. A has ${Object.keys(rawA).length} slots (not in Pre-Colors: ${SLOT_IDS.filter((s) => rawA[s] == null).join(', ')}); "—" = not measured there.

## 2. Position roll-up (the "position" stage)
Slots measured in A, B and the Oct target (n per row). Σ is in weight points.

${posTable}

## 3. Monte-Carlo knobs and punter
${mcTable}

## 4. Coefficient diff (original -> Oct -> Nov)
${coefTable}

## 5. What the numbers say (computed)
- ${flagged.length} of ${coefRows.filter((r) => r.b != null).length} coefficients moved more than 10× or less than 0.1× in the Nov refit (marked FLAG). Largest: ${flagged.slice().sort((x, y) => Math.abs(Math.log(y.c / y.b)) - Math.abs(Math.log(x.c / x.b))).slice(0, 5).map((r) => `${r.g}.${r.spec}.${r.k} ${f(r.b)} -> ${f(r.c)}`).join('; ') || 'none'}.
- Original -> Oct (rows where both exist, ${bothAB.length}): median |Oct/original − 1| = ${(() => { const d = bothAB.filter((r) => r.a).map((r) => Math.abs(r.b / r.a - 1)).sort((x, y) => x - y); return (d[Math.floor(d.length / 2)] * 100).toFixed(1); })()}%.
- Cross-check: ${sameAsSnapped[0]} of ${sameAsSnapped[1]} coefficients in the 28 Oct fit's \`snapped\` tables equal the frozen legacy coefficients.
- The Nov refit rescales one multiplier per spot across every spec row of that spot (\`calibrate-weights.mjs\`, cap 0.01 to 80), so large multipliers on the rb and rec rows mean those rows absorb a large share of the salary-table weight; whether that is the right place for it is an Owner/Architect question, not a measured fact.
`;
if (outFile) { fs.writeFileSync(outFile, md); console.log(`wrote ${outFile} (${md.length} B)`); } else process.stdout.write(md);
if (!(dC.v <= 50)) { console.error(`FAIL: Nov refit max deviation ${dC.v} > 50`); process.exit(1); }
console.log(`PARAM-DIFF OK · ${coefRows.length} coefficient rows · ${rows.length} slots · C max dev ${dC.v.toFixed(1)}`);
