// mathlab/check-design.mjs <fit.json> — test E1/E2: engine-derived integers equal the design table (tens, QB=1000), no inversions at gap>=30.
// Exit 1 on failure. Unit: 1 weight = 0.00254 wins (QB 1000 = 2.54).
import fs from 'fs';
const fit = JSON.parse(fs.readFileSync(process.argv[2])), d = JSON.parse(fs.readFileSync(new URL('./design.json', import.meta.url)));
let bad = 0; const fail = m => { console.log('FAIL', m); bad++; };
if (d.QB !== 1000) fail('QB is not 1000');
Object.entries(d).forEach(([s, v]) => { if (v % 10) fail(`${s}=${v} does not end in 0`); });
const der = {}; Object.keys(d).forEach(s => { der[s] = Math.round(fit.final[s] / 0.00254 / 10) * 10; if (Math.abs(der[s] - d[s]) > 10) fail(`${s}: design ${d[s]} derived ${der[s]}`); });
const ks = Object.keys(d); let inv = 0;
ks.forEach(a => ks.forEach(b => { if (d[a] >= d[b] + 30 && der[a] < der[b]) { inv++; fail(`inversion ${a}(${d[a]}) vs ${b}(${d[b]}) derived ${der[a]}<${der[b]}`); } }));
console.log('slots', ks.length, 'max |derived-design|', Math.max(...ks.map(s => Math.abs(der[s] - d[s]))), 'inversions', inv);
console.log(bad ? 'E1/E2 FAIL ' + bad : 'E1/E2 PASS');
process.exit(bad ? 1 : 0);
