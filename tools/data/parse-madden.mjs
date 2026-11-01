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
// Anchor on the position + team lines (a name line is sometimes printed once, not twice).
for (let j = 2; j < L.length - 8; j++) {
  const pos = L[j], team = L[j+1];
  if (!POS.has(pos) || !TEAMS.has(team)) continue;
  const abil = L[j-1];                           // 'X-Factor' or blank (never a number)
  if (abil !== 'X-Factor' && abil !== '') continue;
  const name = L[j-2];
  if (!name || /^\d+$/.test(name)) { problems.push(`line ${j+1}: no name`); continue; }
  const nums = []; let k = j + 2;
  while (k < L.length && /^\d+$/.test(L[k])) { nums.push(+L[k]); k++; }
  const v = nums.filter(n => n >= 10).slice(0, 7); // trailing footnotes (e.g. 11) fall beyond the 7th value
  if (v.length !== 7) { problems.push(`line ${j+1} ${name}: ${v.length} values (${nums.join(',')})`); continue; }
  const key = name + '|' + pos + '|' + team;
  if (seen.has(key)) { problems.push(`line ${j+1} ${name}: duplicate block`); continue; }
  seen.add(key);
  rows.push({ name, pos, team, ovr: v[0], spd: v[1], str: v[2] });
}
const q = s => /[",]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
fs.writeFileSync(out, 'name,pos,team,ovr,spd,str\n' + rows.map(r => [q(r.name), r.pos, q(r.team), r.ovr, r.spd, r.str].join(',')).join('\n') + '\n');
console.log('players', rows.length, 'problems', problems.length);
problems.slice(0, 15).forEach(p => console.log('  ' + p));
process.exit(problems.length ? 1 : 0);
