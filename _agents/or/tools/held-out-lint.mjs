#!/usr/bin/env node
// Held-out lint — checks that fit scripts do NOT read 2024–2025 data
// Run: node held-out-lint.mjs check
// Store: _agents/or/deliveries/held-out-lint.json

import * as fs from 'node:fs';
import * as path from 'node:path';

const LINT_PATH = path.join(new URL('.', import.meta.url).pathname, '../deliveries/held-out-lint.json');

function load() {
  if (!fs.existsSync(LINT_PATH)) return { passed: true, findings: [] };
  return JSON.parse(fs.readFileSync(LINT_PATH, 'utf8'));
}

function save(result) {
  fs.writeFileSync(LINT_PATH, JSON.stringify(result, null, 2));
}

function check() {
  const findings: string[] = [];
  const checkFile = (filePath: string, content: string) => {
    const m = content.match(/\b(202[4-5])\b/);
    if (m) findings.push(`${filePath}: contains hardcoded year ${m[0]}`);
  };
  const scriptDir = path.join(new URL('.', import.meta.url).pathname, '../../tools/mathlab');
  const dirs = [scriptDir, path.join(new URL('.', import.meta.url).pathname, '../../tools')];
  for (const d of dirs) {
    if (!fs.existsSync(d)) continue;
    for (const file of fs.readdirSync(d).filter(f => f.endsWith('.js') || f.endsWith('.ts') || f === 'fitlm.js')) {
      const fullPath = path.join(d, file);
      const content = fs.readFileSync(fullPath, 'utf8');
      checkFile(fullPath, content);
    }
  }
  const passed = findings.length === 0;
  save({ passed, findings });
  if (passed) {
    console.log('HELD-OUT LINT PASS — no fit scripts read 2024–2025 data');
  } else {
    console.log('HELD-OUT LINT FAIL — fit scripts read 2024–2025 data:');
    for (const f of findings) console.log('  ' + f);
  }
  return passed;
}

const cmd = process.argv[2];
switch (cmd) {
  case 'check': check(); break;
  default: console.error('usage: held-out-lint.mjs check'); process.exit(2);
}
