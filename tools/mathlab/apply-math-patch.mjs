#!/usr/bin/env node
// mathlab/apply-math-patch.mjs <in.html> <out.html> <fit.json> <cfg.json>
// Applies the engine-math package to a COPY of Pre-Colors by exact-anchor text edits (the same literals the Architect's V23 build pastes).
// Every anchor must match exactly once or the script aborts without writing. It never writes into the repo's product files:
// refuses an output path that is a tracked Football-Sim-*.html in the repo root. Math layer only: the slot ORDER, draft rounds and every
// UI/draft consumer of ROSTER_SLOTS are NOT handled here (that is the V23 build); FB, P and DIME are appended at the end for measurement.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const [inF, outF, fitF, cfgF] = process.argv.slice(2);
if (!inF || !outF || !fitF || !cfgF) { console.error('usage: apply-math-patch.mjs <in.html> <out.html> <fit.json> <cfg.json>'); process.exit(2); }
if (/Football-Sim-[^/]*\.html$/.test(outF) && path.dirname(path.resolve(outF)) === path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..')) { console.error('refused: output would be a product file in the repo root'); process.exit(2); }
let h = fs.readFileSync(inF, 'utf8'); const fit = JSON.parse(fs.readFileSync(fitF)), cfg = JSON.parse(fs.readFileSync(cfgF));
const sha = s => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
const inSha = sha(h); const log = [];
const once = (label, find, repl) => {                         // exact string, exactly one occurrence
  const n = h.split(find).length - 1; if (n !== 1) { console.error(`ABORT anchor "${label}" matched ${n} times (need exactly 1)`); process.exit(1); }
  h = h.replace(find, () => repl); log.push(label);
};
const block = (label, startRe, endStr, repl) => {             // from a line start to the first closing "\n};"
  const m = h.match(startRe); if (!m) { console.error(`ABORT block "${label}" not found`); process.exit(1); }
  const a = m.index, b = h.indexOf(endStr, a); if (b < 0) { console.error(`ABORT block "${label}" has no end`); process.exit(1); }
  if (h.slice(a + 1).match(startRe) && (h.slice(a + 1).match(new RegExp(startRe.source, 'gm')) || []).length > 0) { console.error(`ABORT block "${label}" is not unique`); process.exit(1); }
  h = h.slice(0, a) + repl + h.slice(b + endStr.length); log.push(label);
};
const lit = o => '{' + Object.entries(o).map(([k, v]) => `${k}:${+(+v).toFixed(3)}`).join(', ') + '}';
const S = fit.snapped, P = cfg.patch, D = cfg.dime, L5 = cfg.dl5, RV = cfg.recv;   // L5: the DL5 rotation slot (fixed share, already inside the fitted spec weights)

block('RATING_SPECS', /^const RATING_SPECS = \{/m, '\n};', 'const RATING_SPECS = {\n' + Object.entries(S.RATING_SPECS).map(([k, v]) => ` ${k}: ${lit(v)}`).join(',\n') + '\n};');
block('DEF_SPECS', /^const DEF_SPECS = \{/m, '\n};', 'const DEF_SPECS = {\n' + Object.entries(S.DEF_SPECS).map(([k, v]) => ` ${k}: ${lit(v)}`).join(',\n') + '\n};');
block('PERS_REC', /^const PERS_REC = \{/m, '\n};', 'const PERS_REC = {\n' + Object.entries(S.PERS_REC).map(([k, v]) => ` '${k}': ${lit(v)}`).join(',\n') + '\n};');
// MC: change only the keys the fit moved, inside the one MC literal
{ const m = h.match(/^const MC = \{[^}]*\};/m); if (!m) { console.error('ABORT MC not found'); process.exit(1); }
  let t = m[0]; Object.entries(fit.mcOut).forEach(([k, v]) => { const re = new RegExp(`(\\b${k}:)\\s*[-0-9.]+`); if (!re.test(t)) { console.error('ABORT MC key ' + k); process.exit(1); } t = t.replace(re, `$1${v}`); });
  h = h.replace(m[0], () => t); log.push('MC'); }
once('constants', 'const RET_PTS = 2.36;', `const QB_RUN_C = ${P.qbRunC}, WR_BLK_C = ${P.wrBlkC}, WR_BLK_W = [${P.wrBlkW}], PUNT_PTS = ${fit.puntPts}, DIME_W = ${D.w};   // engine-math package (ENGINE-MATH-SPEC)\nconst RET_PTS = 2.36;`);
once('teamRatings', ' r.ret = retScore(slotmap);', ` r.ret = retScore(slotmap); r.p = slotOvr(slotmap,'P'); r.qbRunR = slotOvr(slotmap,'QB');\n r.wrBlk = (slotOvr(slotmap,'WR1')*WR_BLK_W[0] + slotOvr(slotmap,'WR2')*WR_BLK_W[1] + slotOvr(slotmap,'WR3')*WR_BLK_W[2]) / (WR_BLK_W[0]+WR_BLK_W[1]+WR_BLK_W[2]);`);
once('applyDefPlan', ' out.passRush = D.passRush - (isLeague?0:PLAN_K.defRush*f);', ' out.passRush = D.passRush - (isLeague?0:PLAN_K.defRush*f);\n if(D.covDime!=null) out.coverage = (1-DIME_W)*out.coverage + DIME_W*D.covDime;   // dime: a fixed passing-down share of coverage, NOT a plan option');
once('matchup terms', ' const retPts = RET_PTS*', ' const qbRun = QB_RUN_C*((O0.qbRunR!=null?O0.qbRunR:80)-(lg.qbRunR!=null?lg.qbRunR:80)), wrBlk = WR_BLK_C*((O0.wrBlk!=null?O0.wrBlk:80)-(lg.wrBlk!=null?lg.wrBlk:80));\n const puntPts = -PUNT_PTS*(Math.exp(((D0.p!=null?D0.p:80)-80)/45) - Math.exp(((lg.p!=null?lg.p:80)-80)/45));   // the defense\'s punter flips field position\n const retPts = RET_PTS*');
once('structPts', '+ kickPts + retPts - planCost;', '+ kickPts + retPts + puntPts + qbRun + wrBlk - planCost;');
once('channels', 'const channels = {run:PT_RUSH*(expRush-RUSH_BASE),', 'const channels = {run:PT_RUSH*(expRush-RUSH_BASE)+qbRun+wrBlk,');
// slots (math only; order not final)
{ const m = h.match(/^const ROSTER_SLOTS = \[([^\]]*)\];/m); if (!m) { console.error('ABORT ROSTER_SLOTS'); process.exit(1); }
  h = h.replace(m[0], () => `const ROSTER_SLOTS = [${m[1]},'FB','P','DIME'${L5 ? ",'DL5'" : ''}${RV ? ",'TE3','WR4'" : ''}];   // FB, P, DIME${L5 ? ', DL5' : ''}${RV ? ', TE3, WR4' : ''} appended for the math lab; V23 sets the real order`); log.push('ROSTER_SLOTS'); }
once('WV_OFF_SLOTS', "'OG2','C','K']);", `'OG2','C','K','FB'${RV ? ",'TE3','WR4'" : ''}]);`);
once('SLOT_FAMILY', "const SLOT_FAMILY = {QB:'QB',", `const SLOT_FAMILY = {FB:'FB',P:'P',DIME:'DIME',${L5 ? "DL5:'DL5'," : ''}${RV ? "TE3:'TE',WR4:'WR'," : ''}QB:'QB',`);
if (L5) once('NATURAL DL5', " DT:['DT1','DT2'], REDG:['DE1','DE2'], LEDG:['DE1','DE2'],\n MIKE:['MIKE','WILL','SAM']", " DT:['DT1','DT2','DL5'], REDG:['DE1','DE2','DL5'], LEDG:['DE1','DE2','DL5'],   // DL5: a natural spot for every lineman (STATIC_SLOTS, the starter-only value layer, is deliberately unchanged)\n MIKE:['MIKE','WILL','SAM']");
if (RV) once('NATURAL WR/TE', " QB:['QB'], HB:['RB1','RB2'], WR:['WR1','WR2','WR3'], TE:['TE1','TE2'],", " QB:['QB'], HB:['RB1','RB2'], WR:['WR1','WR2','WR3','WR4'], TE:['TE1','TE2','TE3'],   // WR4, TE3: fixed-share spots (spec 14); flex follows the WR / TE family");
fs.writeFileSync(outF, h);
console.log(`patched ${log.length} anchors: ${log.join(', ')}\n in sha256 ${inSha} -> out sha256 ${sha(h)} (${h.length} B) -> ${outF}`);
