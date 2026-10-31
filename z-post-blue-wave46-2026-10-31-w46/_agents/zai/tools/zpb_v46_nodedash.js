// zpb_v46_nodedash.js — acorn-based visible-text dash replacement for one <script> block.
// Reads the block text on stdin, prints the patched block on stdout, plus a JSON report line on stderr.
const acorn = require('acorn');

const DOT = '\u00b7';

function dashReplace(raw) {
  // raw = exact source slice of the literal content (string value area or template quasi raw)
  let out = '';
  let i = 0;
  const n = raw.length;
  let rep = 0;
  while (i < n) {
    // unicode escapes first
    if (raw[i] === '\\' && raw[i+1] === 'u' && raw.slice(i+2, i+6) === '2014') { out += '\\u00b7'; i += 6; rep++; continue; }
    if (raw[i] === '\\' && raw[i+1] === 'u' && raw.slice(i+2, i+6) === '2013') { out += '\\u00b7'; i += 6; rep++; continue; }
    const c = raw[i];
    if (c === '\u2014') {
      if (raw[i-1] === ' ' && raw[i+1] === ' ') { out += ' ' + DOT + ' '; i += 1; }
      else { out += DOT; i += 1; }
      rep++; continue;
    }
    if (c === '\u2013') {
      const L = raw[i-1] || '', R = raw[i+1] || '';
      if (L !== ' ' && L !== '') out += ' ' + DOT + ' ';
      else if (L === ' ' && R !== ' ' && R !== '') out += DOT + ' ';
      else out += DOT;
      i += 1; rep++; continue;
    }
    if (c === ' ' && raw[i+1] === '-' && raw[i+2] === ' ') { out += ' ' + DOT + ' '; i += 3; rep++; continue; }
    out += c; i += 1;
  }
  return { out, rep };
}

let src = '';
process.stdin.on('data', d => src += d);
process.stdin.on('end', () => {
  const report = { total: 0, ranges: 0, parse: 'ok' };
  let ast = null;
  try {
    ast = acorn.parse(src, { ecmaVersion: 2022, allowReturnOutsideFunction: true, allowAwaitOutsideFunction: true });
  } catch (e1) {
    try {
      ast = acorn.parse(src, { ecmaVersion: 2022, allowReturnOutsideFunction: true, allowAwaitOutsideFunction: true, sourceType: 'module' });
    } catch (e2) {
      report.parse = 'FAIL: ' + e2.message;
      process.stderr.write(JSON.stringify(report) + '\n');
      process.stdout.write(src);
      return;
    }
  }
  // collect string literal + template quasi ranges (by offsets in src)
  const ranges = [];
  (function walk(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'Literal' && typeof node.value === 'string' && node.start != null && node.end != null) {
      // node.raw includes the quotes; content = raw minus quotes; simple approach: patch inside raw
      const raw = node.raw;
      const inner = raw.slice(1, -1);
      if (/[\u2014\u2013]| - |\\u201[43]/.test(inner)) {
        const { out, rep } = dashReplace(inner);
        if (rep) { ranges.push([node.start + 1, node.end - 1, out]); report.total += rep; report.ranges++; }
      }
    }
    if (node.type === 'TemplateLiteral') {
      node.quasis.forEach(q => {
        const raw = src.slice(q.start, q.end);
        if (/[\u2014\u2013]| - |\\u201[43]/.test(raw)) {
          const { out, rep } = dashReplace(raw);
          if (rep) { ranges.push([q.start, q.end, out]); report.total += rep; report.ranges++; }
        }
      });
    }
    for (const k in node) {
      if (k === 'type' || k === 'start' || k === 'end') continue;
      const v = node[k];
      if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === 'object' && v.type) walk(v);
    }
  })(ast);

  // apply from the end so offsets stay valid
  ranges.sort((a, b) => b[0] - a[0]);
  let outSrc = src;
  // verify no overlapping ranges
  for (let k = 1; k < ranges.length; k++) {
    if (ranges[k][1] > ranges[k-1][0]) { report.parse = 'OVERLAP at ' + ranges[k][0]; process.stderr.write(JSON.stringify(report) + '\n'); process.stdout.write(src); return; }
  }
  ranges.forEach(([a, b, text]) => { outSrc = outSrc.slice(0, a) + text + outSrc.slice(b); });
  process.stderr.write(JSON.stringify(report) + '\n');
  process.stdout.write(outSrc);
});
