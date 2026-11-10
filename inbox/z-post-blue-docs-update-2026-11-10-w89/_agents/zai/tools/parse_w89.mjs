// w89 parse gate: every <script> block must parse as JS; every <style> must be balanced.
import fs from 'node:fs';
import vm from 'node:vm';

const file = process.argv[2] || 'w89.html';
const html = fs.readFileSync(file, 'utf8');
const blocks = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map((m, i) => ({ i, code: m[1] }));
let fails = 0;
console.log(`script blocks: ${blocks.length}`);
for (const b of blocks) {
  if (!b.code.trim()) continue;
  try { new vm.Script(b.code, { filename: `block-${b.i}` }); }
  catch (e) { console.log(`FAIL block ${b.i}: ${String(e).slice(0, 160)}`); fails++; }
}
const styles = [...html.matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/g)].map(m => m[1]);
console.log(`style blocks: ${styles.length}`);
for (let i = 0; i < styles.length; i++) {
  const s = styles[i];
  if ((s.match(/{/g) || []).length !== (s.match(/}/g) || []).length) { console.log(`FAIL style ${i}: braces unbalanced`); fails++; }
}
// the tag census
const openDivs = (html.match(/<div\b/g) || []).length, closeDivs = (html.match(/<\/div>/g) || []).length;
console.log(`div open/close: ${openDivs}/${closeDivs}`);
const detO = (html.match(/<details\b/g) || []).length, detC = (html.match(/<\/details>/g) || []).length;
console.log(`details open/close: ${detO}/${detC}`);
const tabO = (html.match(/<table\b/g) || []).length, tabC = (html.match(/<\/table>/g) || []).length;
console.log(`table open/close: ${tabO}/${tabC}`);
console.log(fails ? `\n${fails} FAILURES` : '\nALL PARSE CHECKS PASSED');
