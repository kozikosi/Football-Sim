import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const REQUIRED = ['SPEAKER', 'TASK', 'FOR'];

function lintFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const head = text.split(/\r?\n/).slice(0, 8).join('\n');
  const missing = REQUIRED.filter(k => !new RegExp(k + '\\s*:', 'i').test(head) && !new RegExp(k + '\\s*\\|', 'i').test(head));
  // also accept first-line SPEAKER: ... | TASK: ... form
  const first = text.split(/\r?\n/)[0] || '';
  const hasSpeaker = /SPEAKER\s*:/i.test(first) || /SPEAKER\s*\|/i.test(first);
  const hasTask = /TASK\s*:/i.test(first) || /TASK\s*\|/i.test(first);
  const m = [];
  if (!hasSpeaker) m.push('SPEAKER');
  if (!hasTask) m.push('TASK');
  // FOR: may appear on its own line
  if (!/^FOR:/im.test(text)) m.push('FOR');
  return m;
}

function scan(dir) {
  const bad = [];
  let files = 0;
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith('.md')) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (!st.isFile()) continue;
    files++;
    const m = lintFile(full);
    if (m.length) bad.push({ file: full, missing: m });
  }
  return { files, bad };
}

function selftest() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'beam-inbox-'));
  fs.writeFileSync(path.join(dir, 'good.md'), 'SPEAKER: x | TASK: y\n\nFOR: P-1\n');
  fs.writeFileSync(path.join(dir, 'bad.md'), 'hello world\n');
  const r = scan(dir);
  fs.rmSync(dir, { recursive: true, force: true });
  if (r.bad.length !== 1) throw new Error('selftest failed: expected 1 bad, got ' + r.bad.length);
  console.log('selftest: PASS');
}

const args = process.argv.slice(2);
if (args.includes('--selftest')) { selftest(); process.exit(0); }
const dir = args[0] || 'inbox';
const r = scan(dir);
console.log(JSON.stringify({ files: r.files, badCount: r.bad.length, bad: r.bad }, null, 2));
