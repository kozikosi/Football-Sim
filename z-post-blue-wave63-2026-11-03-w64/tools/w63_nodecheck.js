/* w61_nodecheck.js — every inline <script> block must parse (the w57 pattern, pointed at w61). */
const fs = require('fs');
const path = '/home/z/my-project/work/w63/Football-Sim-Z-post-blue-w63.html';
const html = fs.readFileSync(path, 'utf8');
let pass = 0, fail = 0;
const re = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g;
let m, i = 0;
while ((m = re.exec(html))) {
  i++;
  const code = m[1];
  if (!code.trim()) continue;
  try { new Function(code); pass++; }
  catch (e) { fail++; console.log(`FAIL script #${i}: ${String(e).slice(0, 200)}`); }
}
console.log(`w63_nodecheck: ${pass} scripts parse · ${fail} fail`);
process.exit(fail ? 1 : 0);
