#!/usr/bin/env node

// id-census.mjs — which DOM ids does the code depend on, and does the markup actually have them?
//
// MiniMax · 20 Oct 2026. Dependency-free plain Node (>= 18). Read-only on the build.
//
//   node id-census.mjs "<build.html>" [--json]
//
// Why this exists (council work package W6, "scan markup IDs referenced by code and identify
// missing or unused IDs"): a missing id is a runtime crash, not a visual nit — the E2E protocol
// drives the build by id, and a build whose ids drifted from its script fails the gate for
// reasons that look like flakiness. This census is mechanical: it reads the ids the CODE asks
// for and the ids the MARKUP provides, and it names the difference.
//
// What it reports:
//   referenced-but-absent  — the code asks for an id the markup never defines (crash risk)
//   defined-but-unused    — the markup defines an id no code path asks for (dead markup)
//   defined-in-js-only    — the id exists only inside a template string (created at runtime)
//   duplicates            — the same id defined more than once in the static markup
// It deliberately does NOT judge dead markup or decide what should be renamed; it reports.

import crypto from "node:crypto";
import fs from "node:fs";

const argv = process.argv.slice(2);
const file = argv.find((a) => !a.startsWith("--"));
if (!file || !fs.existsSync(file)) {
	console.error("usage: id-census.mjs <build.html> [--json]");
	process.exit(4);
}
const html = fs.readFileSync(file, "utf8");
const sha = crypto.createHash("sha256").update(html).digest("hex");

// 1 · ids the code asks for
const referenced = new Map(); // id -> first line
const addRef = (id, line) => {
	if (typeof id === "string" && id && !referenced.has(id))
		referenced.set(id, line);
};
const lines = html.split("\n");
lines.forEach((l, i) => {
	for (const m of l.matchAll(/getElementById\(\s*'([^']+)'\s*\)/g))
		addRef(m[1], i + 1);
	for (const m of l.matchAll(/getElementById\(\s*"([^"]+)"\s*\)/g))
		addRef(m[1], i + 1);
	for (const m of l.matchAll(/querySelector\(\s*['"]#([A-Za-z][\w-]*)['"]/g))
		addRef(m[1], i + 1);
	for (const m of l.matchAll(/\$\(\s*['"]#([A-Za-z][\w-]*)['"]/g))
		addRef(m[1], i + 1);
});

// 2 · ids the static markup defines (outside <script>) vs ids created inside script strings
const scriptStart = html.indexOf("<script");
const scriptEnd = html.lastIndexOf("</script>");
const staticHtml =
	scriptStart > 0 ? html.slice(0, scriptStart) + html.slice(scriptEnd) : html;
const scriptHtml = scriptStart > 0 ? html.slice(scriptStart, scriptEnd) : "";
const staticIds = new Map(); // id -> count
for (const m of staticHtml.matchAll(/id="([^"]+)"/g))
	staticIds.set(m[1], (staticIds.get(m[1]) || 0) + 1);
const jsIds = new Map();
for (const m of scriptHtml.matchAll(/id="([^"]+)"/g))
	jsIds.set(m[1], (jsIds.get(m[1]) || 0) + 1);
// ids assigned at runtime through a property: el.id = 'x'  (the Lineup editor's container)
for (const m of scriptHtml.matchAll(/\.id\s*=\s*['"]([^'"]+)['"]/g))
	jsIds.set(m[1], (jsIds.get(m[1]) || 0) + 1);

const isRealId = (id) => id && !/[${}]/.test(id) && !/^\s*$/.test(id);
for (const k of [...staticIds.keys()]) if (!isRealId(k)) staticIds.delete(k);
for (const k of [...jsIds.keys()]) if (!isRealId(k)) jsIds.delete(k);
const defined = new Set([...staticIds.keys(), ...jsIds.keys()]);
const missing = [...referenced.entries()]
	.filter(([id]) => !defined.has(id))
	.sort();
const unused = [...defined].filter((id) => !referenced.has(id)).sort();
const duplicates = [...staticIds.entries()]
	.filter(([, n]) => n > 1)
	.sort((a, b) => b[1] - a[1]);
const jsOnly = [...jsIds.keys()].filter((id) => !staticIds.has(id)).sort();

const report = {
	file,
	sha256: sha,
	bytes: html.length,
	counts: {
		referenced: referenced.size,
		definedStatic: staticIds.size,
		definedInJs: jsIds.size,
		definedTotal: defined.size,
	},
	referencedButAbsent: missing.map(([id, line]) => ({
		id,
		firstReferencedAtLine: line,
	})),
	definedButUnused: unused,
	definedInJsOnly: jsOnly,
	duplicateStaticIds: duplicates.map(([id, n]) => ({ id, count: n })),
};

if (argv.includes("--json")) {
	console.log(JSON.stringify(report, null, 2));
	process.exit(0);
}
console.log(`\n${file}\n  sha256 ${sha} · ${html.length} bytes\n`);
console.log(`  ids referenced by code : ${report.counts.referenced}`);
console.log(`  ids in the static markup: ${report.counts.definedStatic}`);
console.log(`  ids created in JS only : ${report.counts.definedInJs}`);
console.log(`  ids defined (union)    : ${report.counts.definedTotal}`);
console.log(
	`\n  referenced but ABSENT  : ${missing.length}${missing.length ? "" : "  (none)"}`,
);
for (const m of report.referencedButAbsent)
	console.log(
		`     ${m.id}  (first referenced at line ${m.firstReferencedAtLine})`,
	);
console.log(`  defined but unused    : ${unused.length}`);
for (const u of unused)
	console.log(`     ${u}${jsIds.has(u) ? "  (created in JS)" : ""}`);
console.log(
	`  duplicate static ids  : ${duplicates.length}${duplicates.length ? "" : "  (none)"}`,
);
for (const d of duplicates) console.log(`     ${d.id} x${d.count}`);
console.log("");
