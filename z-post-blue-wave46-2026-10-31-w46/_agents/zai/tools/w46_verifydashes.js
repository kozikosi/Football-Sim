// zpb_v46_verifydashes.js — assert no —/–/spaced-hyphen remains inside any string/template literal
const acorn = require('acorn');
const fs = require('fs');

const file = process.argv[2];
const html = fs.readFileSync(file, 'utf8');
const re = /<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi;
let m, bi = 0, bad = 0, checked = 0;
while ((m = re.exec(html))) {
  const body = m[1];
  const ranges = [];
  let ast = null;
  try {
    ast = acorn.parse(body, { ecmaVersion: 2022, allowReturnOutsideFunction: true, allowAwaitOutsideFunction: true });
  } catch (e) {
    try { ast = acorn.parse(body, { ecmaVersion: 2022, allowReturnOutsideFunction: true, sourceType: 'module' }); }
    catch (e2) { console.log('PARSE FAIL block', bi, e2.message); bad++; bi++; continue; }
  }
  (function walk(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'Literal' && typeof node.value === 'string' && node.start != null) ranges.push([node.start + 1, node.end - 1]);
    if (node.type === 'TemplateLiteral') node.quasis.forEach(q => ranges.push([q.start, q.end]));
    for (const k in node) {
      if (k === 'type' || k === 'start' || k === 'end') continue;
      const v = node[k];
      if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === 'object' && v.type) walk(v);
    }
  })(ast);
  const probe = /[\u2014\u2013]| - /g;
  let pm;
  while ((pm = probe.exec(body))) {
    const inLit = ranges.some(([a, b]) => pm.index >= a && pm.index < b);
    if (inLit) {
      bad++;
      console.log('VISIBLE DASH block', bi, 'off', pm.index, ':', JSON.stringify(body.slice(Math.max(0, pm.index - 50), pm.index + 50)));
    }
    checked++;
  }
  bi++;
}
console.log('blocks:', bi, 'dash occurrences examined:', checked, 'VISIBLE IN LITERALS:', bad);
process.exit(bad ? 1 : 0);
