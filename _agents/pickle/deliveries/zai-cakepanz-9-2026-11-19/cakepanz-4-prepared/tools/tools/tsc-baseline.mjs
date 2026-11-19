#!/usr/bin/env node
// tsc ratchet: the per-file TypeScript error count may only go DOWN.
//   node tools/tsc-baseline.mjs            check  (exit 1 if any file grew or a new file errors)
//   node tools/tsc-baseline.mjs --write    ratchet: lower/remove entries; REFUSES to raise any count
//   node tools/tsc-baseline.mjs --init     first-time create (only if tsc-baseline.json is absent)
// Baseline: colors/tsc-baseline.json  { "total": N, "files": { "src/x.ts": n, ... } }
// tsc is run with the repo tsconfig; output is parsed, not trusted to exit code alone.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const basePath = join(root, "tsc-baseline.json");
const mode = process.argv[2] ?? "check";

const r = spawnSync("npx", ["tsc", "--noEmit", "-p", "tsconfig.json", "--pretty", "false"], {
  cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024,
});
const out = (r.stdout ?? "") + (r.stderr ?? "");
if (r.error) { console.error("tsc could not run:", r.error.message); process.exit(2); }

const counts = {};
for (const line of out.split("\n")) {
  const m = /^(.+?)\(\d+,\d+\): error TS\d+:/.exec(line);
  if (m) counts[m[1]] = (counts[m[1]] ?? 0) + 1;
  else if (/^error TS\d+:/.test(line)) counts["(global)"] = (counts["(global)"] ?? 0) + 1;
}
const total = Object.values(counts).reduce((a, b) => a + b, 0);
if (total === 0 && r.status !== 0) {
  console.error("tsc failed without parsable errors:\n" + out.slice(0, 2000));
  process.exit(2);
}

const sorted = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
const save = (files) => {
  const t = Object.values(files).reduce((a, b) => a + b, 0);
  writeFileSync(basePath, JSON.stringify({ total: t, files: sorted(files) }, null, 2) + "\n");
  return t;
};

if (mode === "--init") {
  if (existsSync(basePath)) { console.error("tsc-baseline.json exists; use --write to ratchet down."); process.exit(2); }
  console.log(`baseline created: ${save(counts)} errors in ${Object.keys(counts).length} files`);
  process.exit(0);
}
if (!existsSync(basePath)) { console.error("no tsc-baseline.json; run with --init once."); process.exit(2); }
const base = JSON.parse(readFileSync(basePath, "utf8")).files;

const grew = [], fixed = [];
for (const f of new Set([...Object.keys(base), ...Object.keys(counts)])) {
  const was = base[f] ?? 0, now = counts[f] ?? 0;
  if (now > was) grew.push(`${f}: ${was} -> ${now}`);
  else if (now < was) fixed.push(`${f}: ${was} -> ${now}`);
}

if (mode === "--write") {
  if (grew.length) { console.error("refusing to raise the baseline:\n  " + grew.join("\n  ")); process.exit(1); }
  const next = {};
  for (const [f, n] of Object.entries(counts)) next[f] = n;
  console.log(`ratcheted: ${Object.values(base).reduce((a, b) => a + b, 0)} -> ${save(next)}`);
  fixed.forEach((l) => console.log("  " + l));
  process.exit(0);
}

if (grew.length) {
  console.error(`tsc baseline FAILED: errors grew in ${grew.length} file(s):\n  ` + grew.join("\n  "));
  console.error("Fix the new errors; do not raise the baseline.");
  process.exit(1);
}
console.log(`tsc baseline OK: ${total} errors (pinned ${Object.values(base).reduce((a, b) => a + b, 0)}).`);
if (fixed.length) console.log(`${fixed.length} file(s) improved; run \`npm run tsc:ratchet\` to lock it in:\n  ` + fixed.join("\n  "));
