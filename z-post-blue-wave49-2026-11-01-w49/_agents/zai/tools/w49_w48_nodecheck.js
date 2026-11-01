#!/usr/bin/env node
/* w47_nodecheck.js — node --check equivalent for every <script> block in the w48 build. */
const fs = require('fs');
const { execFileSync } = require('child_process');
const os = require('os');
const path = require('path');
const FILE = process.argv[2] || '/home/z/my-project/download/Football-Sim-Z-post-blue-w49.html';
const html = fs.readFileSync(FILE, 'utf8');
const re = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g;
let m, i = 0, fail = 0;
while ((m = re.exec(html))) {
  i++;
  const code = m[1];
  if (!code.trim()) continue;
  const tmp = path.join(os.tmpdir(), 'w48_blk' + i + '.js');
  fs.writeFileSync(tmp, code);
  try {
    execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' });
    const id = (m[0].match(/id="([^"]+)"/) || [])[1] || ('#' + i);
    console.log('PASS', id, '(' + code.length + ' chars)');
  } catch (e) {
    fail++;
    console.log('FAIL block', i, '\n' + String(e.stderr).slice(0, 800));
  }
}
console.log(fail ? 'FAILURES: ' + fail : 'ALL ' + i + ' SCRIPT BLOCKS CLEAN');
process.exit(fail ? 1 : 0);
