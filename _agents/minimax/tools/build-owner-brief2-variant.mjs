#!/usr/bin/env node
// build-owner-brief2-variant.mjs — the Owner's second brief (21 Oct) against the merge candidate.
//
// MiniMax · 21 Oct 2026. Dependency-free plain Node. Reads a build, writes a variant; never edits
// the input. Line-oriented edits, every anchor asserted: a miss aborts with the anchor name.
//
//   node build-owner-brief2-variant.mjs <base.html> <out.html>
//
// Team Comparison:  A1 drop "real" from the subtitle · A2 the "Ratings shown are effective ratings"
// note stays in the Draft Simulator and leaves the Team Comparison page · A3 the Unit Comparison table
// loses its parentheses and is regrouped into Offense / Defense.
// Guide:            B1 the Guide box goes · B2 the "Play the season" line is rewritten · B3
// "advanced stats (what caused sacks and big runs)" loses the parenthetical · B4 the tier list shows
// wins per +1 OVR instead of "x wins from a 70→90 upgrade", and the values table drops the
// "Wins, 70→90" column.
//
// The weight adjustments (K, WR2, RB1, CB2, DE1) are NOT applied here: they change the model's
// positional values, which is a separate, protected decision documented in
// _agents/minimax/notes/position-value-adjustments.md.

import fs from 'node:fs';
import crypto from 'node:crypto';

const [base, out] = process.argv.slice(2);
if (!base || !out) { console.error('usage: build-owner-brief2-variant.mjs <base.html> <out.html>'); process.exit(4); }

let lines = fs.readFileSync(base, 'utf8').split('\n');
const log = [];
const at = (needle, label) => {
  const hits = lines.map((l, i) => l.includes(needle) ? i : -1).filter(i => i >= 0);
  if (hits.length !== 1) { console.error(`ANCHOR ${hits.length ? 'NOT UNIQUE' : 'MISSING'}: ${label}`); process.exit(1); }
  return hits[0];
};
const patch = (needle, from, to, label) => {
  const i = at(needle, label);
  if (!lines[i].includes(from)) { console.error(`ANCHOR MISSING INSIDE LINE: ${label}`); process.exit(1); }
  lines[i] = lines[i].replace(from, to);
  log.push(label);
};
const replaceLine = (i, text, label) => { lines[i] = text; log.push(label); };
const replaceBlock = (startNeedle, endNeedle, newLines, label) => {
  const a = at(startNeedle, label + ' (start)');
  let b = -1;
  for (let k = a; k < lines.length; k++) { if (lines[k].includes(endNeedle)) { b = k; break; } }
  if (b < 0) { console.error('ANCHOR MISSING: ' + label + ' (end)'); process.exit(1); }
  lines.splice(a, b - a + 1, ...newLines);
  log.push(label);
};

// ---------------------------------------------------------------- A1 · the Team Comparison subtitle
patch("'Put any two real rosters side by side.'", "'Put any two real rosters side by side.'", "'Put any two rosters side by side.'",
  'A1 Team Comparison: the subtitle no longer says "real rosters"');

// ---------------------------------------------------------------- A2 · the effective-ratings note
patch('function renderLineupTableHTML(slotmapLeft, slotmapRight){', 'function renderLineupTableHTML(slotmapLeft, slotmapRight){', 'function renderLineupTableHTML(slotmapLeft, slotmapRight, showNote){',
  'A2a the lineup table takes a flag for the effective-ratings note');
patch('Ratings shown are effective ratings', '<p class="narr" style="margin:6px 0 0;">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>`;',
  '${showNote===false?\'\':\'<p class="narr" style="margin:6px 0 0;">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>\'}`;',
  'A2b the note is dropped only where the page asks for it');
patch('${renderLineupTableHTML(TEAM_DATA[a], TEAM_DATA[b])}', '${renderLineupTableHTML(TEAM_DATA[a], TEAM_DATA[b])}', '${renderLineupTableHTML(TEAM_DATA[a], TEAM_DATA[b], false)}',
  'A2c the Team Comparison page no longer carries the note (the Draft Simulator and the season view keep it)');

// ---------------------------------------------------------------- A3 · the Unit Comparison table
patch('function computeDetailMetrics(pool){', 'function computeDetailMetrics(pool){', 'function computeDetailMetrics(pool, keys){',
  'A3a the detail metrics can be computed for a chosen set of units');
patch('return DETAIL_KEYS.map(key=>{', 'return DETAIL_KEYS.map(key=>{', 'return (keys||DETAIL_KEYS).map(key=>{',
  'A3b the default unit set is unchanged for every other caller');
replaceBlock('function unitComparisonHTML(poolA, poolB){', 'return {html:`<table><tbody>${rows}</tbody></table>`, aUnits, bUnits, total:mA.length};',
  [
    '// Unit Comparison: the Owner\'s order, in two groups, with the parentheses taken out of the labels.',
    'const CMP_UNIT_GROUPS = [["Offense",["OFFENSE","QB","OL","RB","WR","TE","RUN","PASS"]],["Defense",["DEFENSE","DL","LB","SEC","RUND","PASSD"]]];',
    'const CMP_UNIT_KEYS = CMP_UNIT_GROUPS.reduce((a,g)=>a.concat(g[1]),[]);',
    'const cmpUnitLabel = key=>{ const d=GROUP_DEFS.find(g=>g.key===key); return d ? d.label.replace(/\\s*\\([^)]*\\)/g,\'\').trim() : key; };',
    'function unitComparisonHTML(poolA, poolB){',
    ' const mA = computeDetailMetrics(poolA, CMP_UNIT_KEYS), mB = computeDetailMetrics(poolB, CMP_UNIT_KEYS);',
    ' let rows=\'\', aUnits=0, bUnits=0, total=0;',
    ' CMP_UNIT_GROUPS.forEach(([gname, keys])=>{',
    '  rows += `<tr><td colspan="3" class="narr" style="text-transform:uppercase;letter-spacing:.05em;font-size:0.7rem;padding-top:12px;">${gname}</td></tr>`;',
    '  keys.forEach(k=>{',
    '   const ma=mA.find(m=>m.key===k), mb=mB.find(m=>m.key===k); if(!ma||!mb) return;',
    '   if(ma.avg>mb.avg) aUnits++; else if(mb.avg>ma.avg) bUnits++; total++;',
    '   rows += `<tr><td style="${ma.avg>mb.avg?\'font-weight:700;color:var(--good);\':\'\'}">${ma.avg.toFixed(1)}</td><td class="narr" style="text-align:center;">${cmpUnitLabel(k)}</td><td style="${mb.avg>ma.avg?\'font-weight:700;color:var(--good);\':\'\'}text-align:right;">${mb.avg.toFixed(1)}</td></tr>`;',
    '  });',
    ' });',
    ' return {html:`<table><tbody>${rows}</tbody></table>`, aUnits, bUnits, total};',
  ],
  'A3c the Unit Comparison table: the Owner\'s Offense/Defense order, a group header row for each, and the parentheses stripped from the labels (Primary Coverage is out, Linebackers is in — the row count is unchanged)');

// patch the first line at or after `anchorNeedle` that contains `from`
const patchAfter = (anchorNeedle, from, to, label) => {
  const a = at(anchorNeedle, label + ' (anchor)');
  for (let k = a; k < Math.min(a + 40, lines.length); k++) {
    if (lines[k].includes(from)) { lines[k] = lines[k].replace(from, to); log.push(label); return; }
  }
  console.error('ANCHOR MISSING AFTER: ' + label); process.exit(1);
};

// ---------------------------------------------------------------- A4 · the Team Comparison verdict and the default pairing
patch('verdict = `On your current weights, <b>${leader}</b> grades ${gap.toFixed(2)} points ahead of ${trailer}.',
  "verdict = `On your current weights, <b>${leader}</b> grades ${gap.toFixed(2)} points ahead of ${trailer}. ${a} holds the edge at ${edges.a} starting spots to ${b}'s ${edges.b}, and wins ${units.aUnits} of ${units.total} unit comparisons to ${b}'s ${units.bUnits}.`;",
  "verdict = '';",
  'A4a Team Comparison: the descriptive verdict sentence is no longer shown (the "pick two different teams" hint stays)');
patchAfter("homeCmpResult').innerHTML", '<p class="detail-item" style="margin-top:10px;">${verdict}</p>', '${verdict?`<p class="detail-item" style="margin-top:10px;">${verdict}</p>`:\'\'}',
  'A4b Team Comparison: the paragraph is only rendered when there is a hint to give');
patch("selA.value = (currentScored[0]||{}).team || teams[0];", "selA.value = (currentScored[0]||{}).team || teams[0];",
  "selA.value = teams.indexOf('Kansas City Chiefs')>=0 ? 'Kansas City Chiefs' : ((currentScored[0]||{}).team || teams[0]);",
  'A4c Team Comparison: the default pair is the Chiefs (A) against the Raiders (B)');
patch("selB.value = (currentScored[1]||{}).team || teams[1];", "selB.value = (currentScored[1]||{}).team || teams[1];",
  "selB.value = teams.indexOf('Las Vegas Raiders')>=0 ? 'Las Vegas Raiders' : ((currentScored[1]||{}).team || teams[1]);",
  'A4d Team Comparison: the second team defaults to the Raiders');

// ---------------------------------------------------------------- B1 · the Guide box
{
  const i = at('Short reference sections for the terms the sim uses', 'B1 Guide: the "Guide / Short reference sections…" box is removed');
  if (!lines[i].includes('return `<div class="panel"')) { console.error('ANCHOR MISSING INSIDE LINE: B1'); process.exit(1); }
  lines[i] = "  return '' +";
  // the next line continues the concatenation: drop its leading "+" so the string still joins
  if (!/^\s*\+/.test(lines[i + 1])) { console.error('ANCHOR MISSING INSIDE LINE: B1 (continuation)'); process.exit(1); }
  lines[i + 1] = lines[i + 1].replace(/^\s*\+\s*/, ' ');
  log.push('B1 Guide: the "Guide / Short reference sections…" box is removed');
}

// ---------------------------------------------------------------- B2 · "Play the season"
patch('Seventeen games, a 14-team playoff', '<b>Play the season.</b> Seventeen games, a 14-team playoff, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself.',
  '<b>Play the season.</b> Seventeen-game regular season, the playoffs, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself.',
  'B2 Guide: the "Play the season" line is rewritten');

// ---------------------------------------------------------------- B3 · advanced stats
patch('advanced stats (what caused sacks and big runs)', 'advanced stats (what caused sacks and big runs)', 'advanced stats',
  'B3 Guide: "advanced stats" no longer carries the parenthetical');

// ---------------------------------------------------------------- B4 · the tier list and the values table
replaceBlock('function valueTiersHTML(){', "return `<ul class=\"gl\">${tiers.map(([n,f])=>{ const l = rows.filter(f); return l.length ? `<li><b>${n}</b> (${l[0].w.toFixed(1)}${l.length>1?'–'+l[l.length-1].w.toFixed(1):''} wins from a 70→90 upgrade): ${l.map(r=>slotName(r.s)).join(', ')}.</li>` : ''; }).join('')}</ul>`;",
  [
    'function valueTiersHTML(){',
    ' const wpo = slotWinsPerOvr();',
    ' const rows = ROSTER_SLOTS.map(s=>({s, w:slotWins(s,90)-slotWins(s,70), p:wpo[s]})).sort((a,b)=>b.p-a.p);',
    " const tiers = [['Franchise-changing', r=>r.w>=2],['High value', r=>r.w>=1&&r.w<2],['Solid value', r=>r.w>=0.7&&r.w<1],['Role players', r=>r.w>=0.3&&r.w<0.7],['Depth spots', r=>r.w<0.3]];",
    " return `<ul class=\"gl\">${tiers.map(([n,f])=>{ const l = rows.filter(f); return l.length ? `<li><b>${n}</b>: ${l.map(r=>`${slotName(r.s)} (+${r.p.toFixed(3)} per +1 OVR)`).join(', ')}.</li>` : ''; }).join('')}</ul>`;",
  ],
  'B4a Guide: the tier list shows each spot\'s wins per +1 OVR, and the "x wins from a 70→90 upgrade" ranges are gone');

replaceBlock('function slotRoleTableHTML(){', 'return `<table><thead><tr><th>Starting spot</th><th title="Extra wins per season if this spot goes from a 70 to a 90">Wins from a 70→90 upgrade</th><th>Wins per +1 rating</th>',
  [
    '// One row per starting spot, sorted by what one point of OVR is worth at that spot.',
    'function slotRoleTableHTML(){',
    ' const rows = slotRoleRows().map(r=>Object.assign({p:slotWinsPerOvr()[r.slot]}, r)).sort((a,b)=>b.p-a.p);',
    " const body = rows.map(r=>`<tr><td><b>${slotName(r.slot)}</b></td><td class=\"score\">${r.p>=0.0005?'+'+r.p.toFixed(3):'~0'}</td><td>${r.kick>0.5?'kicking only':`${(r.passShare*100).toFixed(0)}% pass · ${(r.runShare*100).toFixed(0)}% run`}</td><td class=\"narr\">${r.roles.join(' · ')}</td></tr>`).join('');",
    ' return `<table><thead><tr><th>Starting spot</th><th>Wins per +1 rating</th><th title="Of this spot\'s wins, how many come from the passing game vs the running game (offense) or from stopping the pass vs stopping the run (defense)">Where the wins come from</th><th title="How much of each team-wide rating this one spot makes up">Share of each team rating it feeds</th></tr></thead><tbody>${body}</tbody></table>`;',
  ],
  'B4b Guide: the values table drops the "Wins from a 70→90 upgrade" column and is sorted by wins per +1 OVR');

const h = lines.join('\n');
fs.writeFileSync(out, h);
console.log('written:', out, Buffer.byteLength(h), 'B');
console.log('sha256:', crypto.createHash('sha256').update(h).digest('hex'));
for (const l of log) console.log('  ' + l);

const s = h.slice(h.indexOf('<script>') + 8, h.lastIndexOf('</script>'));
fs.writeFileSync('/tmp/owner-brief2-variant-script.js', s);
console.log('script bytes:', s.length);
