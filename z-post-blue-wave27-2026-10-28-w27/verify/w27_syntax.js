#!/usr/bin/env node
// w27 syntax gate: node --check every <script> block of the built file
const fs = require('fs');
const { execFileSync } = require('child_process');
const html = fs.readFileSync(process.argv[2], 'utf8');
const blocks = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
let fail = 0;
blocks.forEach((m, i) => {
  const js = m[1];
  if (!js.trim()) return;
  const tmp = `/tmp/w27_blk_${i}.js`;
  fs.writeFileSync(tmp, js);
  try {
    execFileSync('node', ['--check', tmp], { stdio: 'pipe' });
    console.log(`block ${i}: OK (${js.length} B)`);
  } catch (e) {
    fail++;
    console.log(`block ${i}: SYNTAX FAIL\n${String(e.stderr).slice(0, 800)}`);
  }
});
console.log(fail ? `${fail} BLOCKS FAILED` : 'ALL SCRIPT BLOCKS PASS');
process.exit(fail ? 1 : 0);
