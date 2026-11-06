#!/usr/bin/env node
/* arch-probe.js — structural measurements for a single-file build.
 * Read-only. No dependencies. Usage: node arch-probe.js <file.html>
 * Written by DS for the M-8 architecture review, 19 Oct 2026.
 * Line-span detection assumes the project's formatting (top-level function
 * bodies close with "}" in column 0); treat spans as approximate.
 */
const fs = require('fs');
const p = process.argv[2];
if (!p) { console.error('usage: node arch-probe.js <file.html>'); process.exit(4); }
const t = fs.readFileSync(p, 'utf8');
const bytes = Buffer.byteLength(t);
const L = t.split('\n');
const rows = [];
const say = (k, v) => rows.push([k, String(v)]);
const count = (s) => t.split(s).length - 1;

say('file', p);
say('bytes', bytes);
say('lines', L.length);

const scripts = [...t.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)];
const styles = [...t.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)];
const scriptBytes = scripts.reduce((a, m) => a + Buffer.byteLength(m[1]), 0);
const styleBytes = styles.map(m => Buffer.byteLength(m[1]));
const markup = t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '');
say('script blocks', `${scripts.length} (${scriptBytes} B, ${(100 * scriptBytes / bytes).toFixed(1)}%)`);
say('style blocks', `${styles.length} (${styleBytes.join(' + ')} B)`);
say('markup bytes', `${Buffer.byteLength(markup)} B (${(100 * Buffer.byteLength(markup) / bytes).toFixed(1)}%)`);

for (const tag of ['<!doctype', '<html', '</html>', '<body', '</body>', '<head', '</head>']) {
  say(tag, (t.match(new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length);
}

const script = scripts.map(m => m[1]).join('\n');
const SL = script.split('\n');
const fns = [];
for (let i = 0; i < SL.length; i++) {
  const m = SL[i].match(/^function\s+([A-Za-z_$][\w$]*)\s*\(/);
  if (!m) continue;
  let end = i;
  const trimmed = SL[i].trim();
  if (!(trimmed.endsWith('}') && SL[i].includes('{'))) {
    for (let j = i + 1; j < SL.length; j++) { if (SL[j].trim() === '}') { end = j; break; } }
  }
  fns.push({ name: m[1], start: i + 1, end: end + 1, lines: end - i + 1 });
}
say('top-level functions', fns.length);
const decls = SL.filter(l => /^(const|let|var)\s+[A-Za-z_$]/.test(l));
say('top-level declarations', decls.length);
const globals = SL.filter(l => /^(let|var)\s+/.test(l)).map(l => l.match(/^(?:let|var)\s+([A-Za-z_$][\w$]*)/)[1]);
say('mutable globals', `${globals.length}: ${globals.join(', ')}`);

say('longest functions', [...fns].sort((a, b) => b.lines - a.lines).slice(0, 10)
  .map(f => `${f.name} ${f.lines}L@${f.start}`).join('; '));

const dup = {};
fns.forEach(f => { dup[f.name] = (dup[f.name] || 0) + 1; });
const dups = Object.entries(dup).filter(([, n]) => n > 1);
say('duplicate function names', dups.length ? dups.map(([n, c]) => `${n}x${c}`).join(', ') : '0');

const dead = fns.filter(f => {
  const re = new RegExp('\\b' + f.name.replace(/\$/g, '\\$') + '\\b', 'g');
  return (script.match(re) || []).length <= 1;
}).map(f => f.name);
say('defined but never referenced', `${dead.length}: ${dead.slice(0, 20).join(', ')}${dead.length > 20 ? ' …' : ''}`);

say('document. refs', (script.match(/\bdocument\./g) || []).length);
say('unique getElementById ids', new Set([...script.matchAll(/getElementById\(\s*['"]([^'"]+)['"]\s*\)/g)].map(m => m[1])).size);
say('inline onclick handlers', (t.match(/\sonclick=/gi) || []).length);
say('addEventListener', (script.match(/addEventListener/g) || []).length);
say('Math.random calls', (script.match(/Math\.random\(\)/g) || []).length);
say('localStorage refs', (script.match(/localStorage/g) || []).length);

for (const k of ['const PLAYERS', 'const TEAM_DATA']) {
  const idx = L.findIndex(l => l.startsWith(k));
  say(k, idx >= 0 ? `line ${idx + 1}, ${Buffer.byteLength(L[idx])} B` : 'absent');
}
say('fitNoteHTML refs', (t.match(/fitNoteHTML/g) || []).length);

const css = styles.map(m => m[1]).join('\n');
const defined = new Set([...css.matchAll(/\.([A-Za-z][\w-]*)/g)].map(m => m[1]));
const used = new Set();
for (const m of t.matchAll(/class(?:Name)?\s*=\s*["'`]([^"'`]*)["'`]/g)) m[1].split(/\s+/).forEach(c => c && used.add(c));
for (const m of t.matchAll(/classList\.(?:add|remove|toggle|contains)\(\s*['"]([^'"]+)['"]/g)) used.add(m[1]);
const unused = [...defined].filter(c => !used.has(c));
say('css classes defined', defined.size);
say('css classes referenced', [...defined].filter(c => used.has(c)).length);
say('css classes never referenced', `${unused.length}: ${unused.slice(0, 25).join(', ')}${unused.length > 25 ? ' …' : ''}`);

say('largest lines', L.map((l, i) => ({ i: i + 1, n: Buffer.byteLength(l) })).sort((a, b) => b.n - a.n).slice(0, 6)
  .map(b => `${b.n}B@${b.i}`).join('; '));

console.log(rows.map(([k, v]) => k.padEnd(33) + v).join('\n'));
