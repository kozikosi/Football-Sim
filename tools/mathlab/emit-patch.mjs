// mathlab/emit-patch.mjs <fit.json> <cfg.json> — prints the exact JS literals the V23 build pastes for the engine-math package.
import fs from 'fs';
const fit = JSON.parse(fs.readFileSync(process.argv[2])), cfg = JSON.parse(fs.readFileSync(process.argv[3]));
const lit = o => '{' + Object.entries(o).map(([k, v]) => `${k}:${+v.toFixed(3)}`).join(', ') + '}';
const out = [];
out.push('// RATING_SPECS (protected) — new composition weights');
out.push('const RATING_SPECS = {');
Object.entries(fit.snapped.RATING_SPECS).forEach(([k, v]) => out.push(` ${k}: ${lit(v)},`));
out.push('};');
out.push('// DEF_SPECS (protected)');
out.push('const DEF_SPECS = {'); Object.entries(fit.snapped.DEF_SPECS).forEach(([k, v]) => out.push(` ${k}: ${lit(v)},`)); out.push('};');
out.push('// PERS_REC (personnel receiving specs; TE/WR/RB shares follow the same fit)');
out.push('const PERS_REC = {'); Object.entries(fit.snapped.PERS_REC).forEach(([k, v]) => out.push(` '${k}': ${lit(v)},`)); out.push('};');
out.push('// MC (protected) — changed keys only; every other key keeps its current value');
const ch = Object.entries(fit.mcOut).filter(([k, v]) => Math.abs(v - fit.origMC[k]) > 1e-9);
out.push('//   ' + ch.map(([k, v]) => `${k}: ${fit.origMC[k]} -> ${v}`).join(' | '));
out.push('// NEW terms inside matchupModel (added to structPts; qbRun and wrBlk also to channels.run):');
out.push(`const QB_RUN_C = ${cfg.patch.qbRunC};   // points per QB OVR point vs league: scrambles and designed runs`);
out.push(`const WR_BLK_C = ${cfg.patch.wrBlkC}, WR_BLK_W = [${cfg.patch.wrBlkW}];   // points per average-WR1..3 OVR point: perimeter blocking and the light-box effect`);
out.push(`const PUNT_PTS = ${fit.puntPts};   // was 1.6`);
if (cfg.dime) { out.push(`// DIME: ROSTER_SLOTS gets 'DIME' (29 slots; TOTAL_ROUNDS follows); SLOT_FAMILY.DIME = 'DIME'; DEF_SPECS.covDime above; NOT a DEF_OPTS package.`); out.push(`const DIME_W = ${cfg.dime.w};   // = 10% snap share (Owner) x 1.5 passing-down leverage (INFERRED, P-196)`); out.push(`// in applyDefPlan, after coverage is computed (league AND team, so the baseline is consistent): out.coverage = (1-DIME_W)*out.coverage + DIME_W*D.covDime;`); }
if (cfg.dl5) { out.push(`// DL5: ROSTER_SLOTS gets 'DL5' (${cfg.dl5.share} = share of defensive snaps the 5th lineman plays, MEASURED, results/dl5-snap-measurement-2026-10-27.txt); SLOT_FAMILY.DL5 = 'DL5'; NATURAL_SLOT_MAP.DT/REDG/LEDG gain 'DL5'.`); out.push(`// No new matchup code: the rotation is already inside the weights above (each of ${cfg.dl5.dl.join(', ')} x (1 - ${cfg.dl5.share}/4); DL5 = ${cfg.dl5.share} x the mean of their weights) in passRush, frontRun, frontBase, frontNick, then fitted.`); out.push('// STATIC_SLOTS (starter-only value layer) is unchanged. Flex into DL5: results/flex-engine.js.txt (derived from the Owner guide by flexdl5.mjs; Owner approval pending).'); }
out.push('// in teamRatings: r.qbRunR = slotOvr(sm,"QB"); r.wrBlk = weighted mean of WR1..3 OVR using WR_BLK_W');
out.push('// in matchupModel: qbRun = QB_RUN_C*(O0.qbRunR - lg.qbRunR); wrBlk = WR_BLK_C*(O0.wrBlk - lg.wrBlk); structPts += qbRun + wrBlk;');
console.log(out.join('\n'));
