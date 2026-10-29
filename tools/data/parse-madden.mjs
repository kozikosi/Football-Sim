// Parse a pasted Madden ratings page into name,pos,team,ovr,spd,str (Architect, 28 Oct 2026).
// usage: node tools/data/parse-madden.mjs <raw.txt> <out.csv>
// Block shape in the paste: name, name (repeated), ability (X-Factor or blank), pos, team, then
// OVR SPD STR AGI COD INJ AWR with stray one-digit footnote numbers (1-9) mixed in. Real ratings are never 1-9.
import fs from 'fs';
const [,, inp, out] = process.argv;
if (!inp || !out) { console.error('usage: parse-madden.mjs raw.txt out.csv'); process.exit(4); }
const L = fs.readFileSync(inp, 'utf8').split(/\r?\n/).map(s => s.trim());
const POS = new Set(['QB','HB','FB','WR','TE','LT','LG','C','RG','RT','LEDG','REDG','DT','MIKE','WILL','SAM','CB','SS','FS','K','P','LS']);
const TEAMS = new Set(['Buffalo Bills','Miami Dolphins','New England Patriots','NY Jets','Baltimore Ravens','Cincinnati Bengals','Cleveland Browns','Pittsburgh Steelers','Houston Texans','Indianapolis Colts','Jacksonville Jaguars','Tennessee Titans','Denver Broncos','Kansas City Chiefs','Las Vegas Raiders','Los Angeles Chargers','Dallas Cowboys','NY Giants','Philadelphia Eagles','Washington Commanders','Chicago Bears','Detroit Lions','Green Bay Packers','Minnesota Vikings','Atlanta Falcons','Carolina Panthers','New Orleans Saints','Tampa Bay Buccaneers','Arizona Cardinals','Los Angeles Rams','San Francisco 49ers','Seattle Seahawks']);
const rows = [], problems = []; const seen = new Set();
for (let i = 0; i < L.length - 6; i++) {
  if (!L[i] || L[i] !== L[i+1] || /^\d+$/.test(L[i])) continue;
  // ability line, then pos, then team
  let j = i + 2; if (L[j] === 'X-Factor' || L[j] === '') j++; else if (POS.has(L[j])) {}
  const pos = L[j], team = L[j+1];
  if (!POS.has(pos) || !(TEAMS.has(team) || team === 'Free Agents' || team === 'Free Agent')) { if (POS.has(pos)) problems.push(`line ${i+1} ${L[i]}: team "${team}"`); continue; }
  const nums = []; let k = j + 2;
  while (k < L.length && /^\d+$/.test(L[k])) { nums.push(+L[k]); k++; }
  const v = nums.filter(n => n >= 10).slice(0, 7); // trailing footnotes (e.g. 11) fall beyond the 7th value
  if (v.length !== 7) { problems.push(`line ${i+1} ${L[i]}: ${v.length} values (${nums.join(',')})`); continue; }
  const key = L[i] + '|' + pos + '|' + team;
  if (seen.has(key)) continue; seen.add(key);
  rows.push({ name: L[i], pos, team, ovr: v[0], spd: v[1], str: v[2] });
  i = k - 1;
}
const q = s => /[",]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
fs.writeFileSync(out, 'name,pos,team,ovr,spd,str\n' + rows.map(r => [q(r.name), r.pos, q(r.team), r.ovr, r.spd, r.str].join(',')).join('\n') + '\n');
console.log('players', rows.length, 'problems', problems.length);
problems.slice(0, 15).forEach(p => console.log('  ' + p));
process.exit(problems.length ? 1 : 0);
