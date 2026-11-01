#!/usr/bin/env node
/* w49_nodecheck.js — every <script> block in the w49 build parses clean (new Function). */
const fs = require('fs');
const FILE = '/home/z/my-project/download/Football-Sim-Z-post-blue-w50.html';
let PASS = 0, FAIL = 0;
const html = fs.readFileSync(FILE, 'utf-8');
const re = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g;
let m, i = 0;
while ((m = re.exec(html))) {
  i++;
  const body = m[1];
  if (!body.trim()) continue;
  try { new Function(body); PASS++; }
  catch (e) { FAIL++; console.log(`FAIL  script #${i}: ${String(e).slice(0, 100)}`); }
}
console.log(`w49_nodecheck: ${PASS} clean · ${FAIL} failed (${i} script blocks)`);
process.exit(FAIL ? 1 : 0);
