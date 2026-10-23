#!/usr/bin/env node
// verify-anchors.mjs — check the council document's quoted strings against the build Claude will edit.
//
// MiniMax · 22 Oct 2026. Dependency-free plain Node. Read-only.
//
//   node verify-anchors.mjs <document.md> <build.html>
//
// The document states changes as "old -> new" and as table rows with a "Now" and a "Becomes" column.
// For every quoted string this tool can classify:
//   OLD  (left of an arrow, or in a cell before the last one)  -> it must exist in the build
//   NEW  (right of an arrow, or in the last cell)               -> it must NOT exist yet
// A missing OLD string means the document describes text the build does not contain: that anchor
// will not apply as written. A NEW string that already exists means that change is already applied.
// Both are the failure modes a line number alone cannot catch.

import fs from "node:fs";

const [docPath, buildPath] = process.argv.slice(2);
if (!docPath || !buildPath) {
  console.error("usage: verify-anchors.mjs <document.md> <build.html>");
  process.exit(4);
}
const doc = fs.readFileSync(docPath, "utf8");
const build = fs.readFileSync(buildPath, "utf8");
const norm = (s) => s.replace(/\s+/g, " ").trim();
const flat = norm(build);
const lower = flat.toLowerCase();
const quoted = (s) =>
  [...s.matchAll(/[“"`]([^“”"`]{6,110})[”"`]/g)]
    .map((m) => m[1])
    .filter(
      (x) =>
        /[A-Za-z]/.test(x) &&
        !/^[a-f0-9]{12,}$/i.test(x) &&
        !/\.(md|html|mjs|js|png)$/i.test(x),
    );

const lines = doc.split("\n");
const oldStrings = [],
  newStrings = [];
let section = "(top)";
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  const h = l.match(/^#{2,4}\s+(.*)$/);
  if (h) section = h[1].trim();
  if (l.trim().startsWith("|") && l.trim().endsWith("|")) {
    const cells = l.trim().slice(1, -1).split("|");
    for (const c of cells.slice(0, -1))
      for (const q of quoted(c)) oldStrings.push({ q, line: i + 1, section });
    for (const q of quoted(cells[cells.length - 1]))
      newStrings.push({ q, line: i + 1, section });
  } else if (l.includes("->")) {
    const a = l.indexOf("->");
    for (const q of quoted(l.slice(0, a)))
      oldStrings.push({ q, line: i + 1, section });
    for (const q of quoted(l.slice(a + 2)))
      newStrings.push({ q, line: i + 1, section });
  }
}
// A literal build string is one that could plausibly appear verbatim in the HTML: no ellipsis, no
// placeholder words, not a command, not a document label, and it reads like a phrase.
const isLiteral = (q) => {
  if (/\u2026|\.\.\./.test(q)) return false; // ellipsis = a pattern
  if (/^(node|npm|git|cd )/.test(q)) return false; // a command
  if (/\bthe x\b|\bthe y\b|\bx\b|\by\b|\bxx\b/i.test(q)) return false; // placeholders
  if (/^[A-Z0-9 &/-]{4,}$/.test(q) && !/[a-z]{3}/.test(q)) return false; // an ALLCAPS label
  if (/^P\d|^R\d|^C\d/.test(q)) return false; // a document label
  if (q.length < 10 || !q.includes(" ")) return false; // a phrase, not a token
  return true;
};
const uniq = (a) => {
  const seen = new Set();
  return a.filter((x) => {
    const k = norm(x.q);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};
const O = uniq(oldStrings).filter((x) => isLiteral(x.q)),
  N = uniq(newStrings).filter((x) => isLiteral(x.q));

const count = (s) => flat.split(norm(s)).length - 1;
const missing = [],
  already = [],
  ok = [];
for (const x of O) {
  const c = count(x.q);
  if (c === 0) {
    const probe = norm(x.q).slice(0, 38);
    if (probe.length > 16 && lower.includes(probe.toLowerCase()))
      already.push({ ...x, note: "prefix match only" });
    else missing.push(x);
  } else ok.push({ ...x, count: c });
}
const applied = [];
for (const x of N) {
  if (count(x.q) > 0) applied.push({ ...x, count: count(x.q) });
}

console.log(`document: ${docPath}\nbuild:    ${buildPath}`);
console.log(
  `quoted OLD strings: ${O.length}  |  found in the build: ${ok.length}  |  missing: ${missing.length}  |  prefix-only: ${already.length}`,
);
console.log(
  `quoted NEW strings: ${N.length}  |  already present (change already applied): ${applied.length}`,
);
if (missing.length) {
  console.log(
    "\n--- OLD strings the document says are in the build, and are not ---",
  );
  for (const m of missing.slice(0, 40))
    console.log(
      `  l.${m.line}  [${m.section}]  ${JSON.stringify(m.q.slice(0, 92))}`,
    );
  if (missing.length > 40) console.log(`  … and ${missing.length - 40} more`);
}
if (already.length) {
  console.log(
    "\n--- OLD strings that only partly match (a near miss: check the wording) ---",
  );
  for (const m of already.slice(0, 20))
    console.log(
      `  l.${m.line}  [${m.section}]  ${JSON.stringify(m.q.slice(0, 88))}`,
    );
}
if (applied.length) {
  console.log(
    "\n--- NEW strings that are ALREADY in the build (these changes are already applied) ---",
  );
  for (const m of applied.slice(0, 25))
    console.log(
      `  l.${m.line}  [${m.section}]  ${JSON.stringify(m.q.slice(0, 88))}`,
    );
  if (applied.length > 25) console.log(`  … and ${applied.length - 25} more`);
}
const refs = [...doc.matchAll(/(?:candidate line|l\.|line\s)(\d{2,5})/g)].map(
  (m) => Number(m[1]),
);
console.log(
  `\nline references: ${refs.length}, highest ${refs.length ? Math.max(...refs) : 0}; the build has ${build.split("\n").length} lines`,
);
