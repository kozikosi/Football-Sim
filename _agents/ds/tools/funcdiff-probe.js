#!/usr/bin/env node
/* funcdiff-probe.js — top-level function set diff between two single-file builds.
 * Read-only, no deps. Usage: node funcdiff-probe.js <a.html> <b.html>
 * Approximate: assumes top-level bodies close with "}" in column 0 (project style).
 * Written by DS for the M-12 Round-2 re-analysis, 20 Oct 2026.
 */
const fs = require("node:fs");
const crypto = require("node:crypto");
const [a, b] = process.argv.slice(2);
if (!a || !b) {
  console.error("usage: node funcdiff-probe.js <a.html> <b.html>");
  process.exit(4);
}

function funcs(path) {
  const t = fs.readFileSync(path, "utf8");
  const script = [...t.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => m[1])
    .join("\n");
  const L = script.split("\n");
  const out = new Map();
  for (let i = 0; i < L.length; i++) {
    const m = L[i].match(/^function\s+([A-Za-z_$][\w$]*)\s*\(/);
    if (!m) continue;
    let end = i;
    const tr = L[i].trim();
    if (!(tr.endsWith("}") && L[i].includes("{"))) {
      for (let j = i + 1; j < L.length; j++) {
        if (L[j].trim() === "}") {
          end = j;
          break;
        }
      }
    }
    const body = L.slice(i, end + 1).join("\n");
    out.set(m[1], {
      body,
      hash: crypto.createHash("sha256").update(body).digest("hex").slice(0, 16),
      line: i + 1,
      lines: end - i + 1,
    });
  }
  return out;
}

const A = funcs(a),
  B = funcs(b);
const onlyA = [...A.keys()].filter((k) => !B.has(k));
const onlyB = [...B.keys()].filter((k) => !A.has(k));
const common = [...A.keys()].filter((k) => B.has(k));
const same = [],
  diff = [];
for (const k of common) (A.get(k).hash === B.get(k).hash ? same : diff).push(k);

console.log(`A: ${a}`);
console.log(`   ${A.size} top-level functions`);
console.log(`B: ${b}`);
console.log(`   ${B.size} top-level functions`);
console.log(
  `common ${common.length} | identical ${same.length} | differing ${diff.length}`,
);
console.log(`A-only ${onlyA.length}: ${onlyA.join(", ")}`);
console.log(`B-only ${onlyB.length}: ${onlyB.join(", ")}`);
console.log("differing common:");
for (const k of diff)
  console.log(
    `  ${k}  A@${A.get(k).line}(${A.get(k).lines}L)  B@${B.get(k).line}(${B.get(k).lines}L)`,
  );
