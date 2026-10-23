// supply-census.js — extract PLAYERS/ROSTER_SLOTS/NATURAL_SLOT_MAP/POS_SLOT_MAP from a build file
// and print the measured supply histogram. Usage: node supply-census.js <build.html>
const fs = require('fs');
const src = fs.readFileSync(process.argv[2], 'utf8');

function grab(name) {
  // lazy match to the FIRST "];" after the const declaration — inside these data
  // literals the sequence "];" can only terminate the statement.
  const re = new RegExp('const ' + name + ' = (\\[[\\s\\S]*?\\]);');
  const m = src.match(re);
  if (!m) return null;
  return Function('"use strict"; return (' + m[1] + ');')();
}

const PLAYERS = grab('PLAYERS');
const SLOTS = grab('ROSTER_SLOTS');
const NSM = grab('NATURAL_SLOT_MAP');
const PSM = grab('POS_SLOT_MAP');

console.log('record count:', PLAYERS.length, '| record widths:', [...new Set(PLAYERS.map(r => r.length))].join(','));
console.log('first record:', JSON.stringify(PLAYERS[0]).slice(0, 90));

const hist = {}, o76 = {}, led = {};
for (const r of PLAYERS) {
  const p = r[1];
  hist[p] = (hist[p] || 0) + 1;
  if (r[3] >= 76) o76[p] = (o76[p] || 0) + 1;
  if (r[3] >= 60) led[p] = (led[p] || 0) + 1;
}
console.log('\n-- position histogram (name@field-1 · total · ovr>=76 · ovr>=60) --');
Object.keys(hist).sort((a, b) => hist[b] - hist[a]).forEach(p =>
  console.log(String(p).padEnd(8) + String(hist[p]).padStart(5) + String(o76[p] || 0).padStart(6) + String(led[p] || 0).padStart(6)));

console.log('\nROSTER_SLOTS.length =', SLOTS.length);
console.log('ROSTER_SLOTS =', JSON.stringify(SLOTS));
console.log('\nNATURAL_SUPPLY_SLOT_MAP keys:', NSM ? JSON.stringify(Object.keys(NSM)) : 'NOT FOUND');
if (NSM) console.log('NATURAL_SLOT_MAP:', JSON.stringify(NSM));
console.log('POS_SLOT_MAP keys:', PSM ? JSON.stringify(Object.keys(PSM)) : 'NOT FOUND');
if (PSM) console.log('POS_SLOT_MAP:', JSON.stringify(PSM).slice(0, 700));
// slot-level demand master table: slot -> eligible records (natural pos count share)
const famDemand = {};
for (const s of SLOTS) famDemand[s] = (famDemand[s] || 0) + 1;	// slots here are per-team classes
console.log('\n-- per-team slot classes (' + SLOTS.length + ') --');
console.log(JSON.stringify(famDemand));
// the n-th best eligible OVR per covered position (for demand=n teams)
const sorted = {};
for (const r of PLAYERS) (sorted[r[1]] = sorted[r[1]] || []).push(r[3]);
console.log('\n-- demand-th best OVR / position (n = drafted instances pool-wide) --');
const trial = { QB: 32 };
const slotDemandPerPos = {};
console.log('fill in from note; raw per-position 32nd-best and 64th-best:');
for (const p of Object.keys(hist).sort()) {
  const s = (sorted[p] || []).sort((a, b) => b - a);
  const best = (n) => s && s.length >= n ? s[n - 1] : (s.length ? 'POOL_EXHAUSTED@' + s.length : 'NONE');
  console.log(String(p).padEnd(8) + '32nd: ' + String(best(32)).padStart(10) + ' 64th: ' + String(best(64)).padStart(16) + ' 96th: ' + String(best(96)).padStart(18));
}
