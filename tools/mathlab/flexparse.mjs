// mathlab/flexparse.mjs — re-derives the flex rules from the Owner's VERBATIM text and compares them with flex.json.
// Guards against a transcription slip in flex.json. usage: node flexparse.mjs [notes.txt]   (exit 1 on any difference)
import fs from 'fs';
const file = process.argv[2] || new URL('../../_agents/owner-notes/2026-10-26-dime-and-flex-guide-rev2.txt', import.meta.url);
const txt = fs.readFileSync(file, 'utf8');
const body = txt.split('=====BEGIN FLEX GUIDE REV 2=====')[1].split('=====END FLEX GUIDE REV 2=====')[0];
const HEAD = { 'QUARTERBACK': ['QB'], 'RUNNING BACK': ['RB'], 'FULL BACK': ['FB'], 'WIDE RECEIVER': ['WR'], 'TIGHT END': ['TE'], 'OFFENSIVE TACKLE': ['OT'], 'OFFENSIVE GUARD': ['OG'],
  'CENTER': ['C'], 'DEFENSIVE TACKLE': ['DT'], 'DEFENSIVE EDGE': ['EDGE'], 'MIKE / ILB': ['ILB'], 'WILL / SAM / OLB': ['OLB'], 'STRONG SAFETY': ['SS'], 'FREE SAFETY': ['FS'],
  'CORNERBACK': ['CB'], 'KICKER': ['K'], 'PUNTER': ['P'] };
const TOK = { QB: ['QB'], RB: ['RB'], FB: ['FB'], WR: ['WR'], TE: ['TE'], OT: ['OT'], OG: ['OG'], C: ['C'], DT: ['DT'], DE: ['EDGE'], LB: ['ILB', 'OLB'], ILB: ['ILB'], MIKE: ['ILB'], OLB: ['OLB'], WILL: ['OLB'], SAM: ['OLB'],
  S: ['SS', 'FS'], SS: ['SS'], FS: ['FS'], CB: ['CB'], NICKEL: ['NICKEL'], DIME: ['DIME'], K: ['K'], P: ['P'] };
const rules = {}; let cur = null, bad = 0; const fail = m => { console.log('FAIL', m); bad++; };
for (const raw of body.split('\n')) {
  const line = raw.trim(); if (!line) continue;
  const up = line.toUpperCase();
  if (HEAD[up]) { cur = HEAD[up][0]; rules[cur] = rules[cur] || {}; continue; }      // header first: "FREE SAFETY" is a header, not a rule
  const m = up.match(/^(FREE|-\s*([246]))\s+(.+?)[,\s]*$/);
  if (!m) { fail('unparsed line: ' + line); continue; }
  if (!cur) { fail('rule before header: ' + line); continue; }
  const pen = m[1] === 'FREE' ? 0 : +m[2];
  m[3].split(',').map(s => s.trim()).filter(Boolean).forEach(t => {
    if (!TOK[t]) return fail('unknown token ' + t + ' in ' + line);
    TOK[t].forEach(d => { if (rules[cur][d] != null && rules[cur][d] !== pen) fail(`${cur}->${d} given as ${rules[cur][d]} and ${pen}`); rules[cur][d] = pen; });
  });
}
// the guide's section "MIKE / ILB" is both MIKE and ILB; "WILL / SAM / OLB" is all three. Both map to one role each. QB row "S" means SS+FS.
const j = JSON.parse(fs.readFileSync(new URL('./flex.json', import.meta.url))).flex;
const keys = new Set([...Object.keys(rules), ...Object.keys(j)]);
let n = 0;
keys.forEach(f => new Set([...Object.keys(rules[f] || {}), ...Object.keys(j[f] || {})]).forEach(d => {
  n++; const a = (rules[f] || {})[d], b = (j[f] || {})[d];
  if (a !== b) fail(`${f}->${d}: text says ${a}, flex.json says ${b}`);
}));
console.log('roles parsed', Object.keys(rules).length, 'rules parsed', Object.values(rules).reduce((a, t) => a + Object.keys(t).length, 0), 'compared', n);
console.log(bad ? 'FLEXPARSE FAIL ' + bad : 'FLEXPARSE OK (flex.json equals the Owner text)');
process.exit(bad ? 1 : 0);
