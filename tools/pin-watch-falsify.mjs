#!/usr/bin/env node
// Falsifier for pin-watch.mjs: mutates one engine file in a temp copy and
// asserts the tool exits 1 naming that file. Also asserts the clean copy passes.
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const tool = path.resolve('tools/pin-watch.mjs');
const src = '/tmp/scratchpad/deployed-engine/colors/src/sports/nfl/engine';
// clean (against itself) should pass when commit matches tree? Use d3bd vs d3bd.
let passOk = false;
try { execSync('node ' + tool + ' --tree ' + src + ' --commit d3bd81d2 --commit-tree colors/src/sports/nfl/engine', { stdio: 'pipe' }); passOk = true; } catch (e) { passOk = false; }
console.log('CLEAN-CASE (d3bd vs d3bd): ' + (passOk ? 'PASS (exit 0)' : 'FAIL (expected pass)'));
if (!passOk) process.exit(2);

// mutated case
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pw-'));
fs.cpSync(src, tmp, { recursive: true });
const target = path.join(tmp, 'awards.ts');
fs.appendFileSync(target, '\n// FALSIFIER MUTATION\n');
let mutatedOk = false, out = '';
try { execSync('node ' + tool + ' --tree ' + tmp + ' --commit d3bd81d2 --commit-tree colors/src/sports/nfl/engine', { stdio: 'pipe' }); }
catch (e) { mutatedOk = (e.status === 1); out = (e.stderr || e.stdout || '').toString(); }
console.log('MUTATED-CASE (appended to awards.ts): ' + (mutatedOk ? 'PASS (exit 1)' : 'FAIL (expected exit 1)'));
console.log(out.trim().split('\n').slice(0,6).join('\n'));
const namesFile = out.includes('awards.ts');
console.log('NAMES-FILE: ' + (namesFile ? 'YES' : 'NO'));
if (!mutatedOk || !namesFile) process.exit(3);
console.log('FALSIFIER: OK');
