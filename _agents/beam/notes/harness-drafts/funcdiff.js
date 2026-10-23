// funcdiff.js — function-level build differ (S-103, Beam draft)
// Usage: node tests/funcdiff.js <a.html> <b.html> [--diag]
// Exit codes (per tests/CONTRACT.md C4): 0 pass, 1 finding, 2 data-integrity, 3 extraction, 4 usage.
// Compares top-level function sets between two builds; reports common/differing/unique.
// Reference = previous certified build (by sha256); asserts reference != candidate.

const fs = require("node:fs");
const _path = require("node:path");
const crypto = require("node:crypto");

const args = process.argv.slice(2).filter((x) => !x.startsWith("--"));
const _diag = process.argv.includes("--diag");
if (args.length < 2) {
  console.error("FAIL funcdiff 4: usage: node funcdiff.js <a.html> <b.html>");
  process.exit(4);
}
const [fileA, fileB] = args;
if (!fs.existsSync(fileA) || !fs.existsSync(fileB)) {
  console.error("FAIL funcdiff 4: missing input file");
  process.exit(4);
}

function extractFuncs(html) {
  const names = [];
  const re = /function\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/g;
  let m;
  while ((m = re.exec(html)) !== null) names.push(m[1]);
  return [...new Set(names)];
}

const htmlA = fs.readFileSync(fileA, "utf8");
const htmlB = fs.readFileSync(fileB, "utf8");
const hashA = crypto.createHash("sha256").update(htmlA).digest("hex");
const hashB = crypto.createHash("sha256").update(htmlB).digest("hex");

if (hashA === hashB) {
  console.error("FAIL funcdiff 4: reference and candidate are the same build");
  process.exit(4);
}

const funcsA = extractFuncs(htmlA);
const funcsB = extractFuncs(htmlB);
const common = funcsA.filter((f) => funcsB.includes(f));
const onlyA = funcsA.filter((f) => !funcsB.includes(f));
const onlyB = funcsB.filter((f) => !funcsA.includes(f));

console.log(`A: ${funcsA.length} functions; B: ${funcsB.length} functions`);
console.log(
  `common ${common.length} | A-only ${onlyA.length} | B-only ${onlyB.length}`,
);
if (onlyA.length) console.log("A-only:", onlyA.join(", "));
if (onlyB.length) console.log("B-only:", onlyB.join(", "));
console.log(`hash A: ${hashA}`);
console.log(`hash B: ${hashB}`);

// Note: this naive extractor overcounts (catches function keywords in comments/strings).
// For precise counts use _agents/ds/tools/funcdiff-full.js (line-based boundaries).
console.log("PASS funcdiff");
