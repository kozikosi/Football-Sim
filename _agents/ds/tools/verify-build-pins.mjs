#!/usr/bin/env node
/**
 * verify-build-pins.mjs — every named build must match its pinned sha256.
 *
 * Why: the repository has repeatedly quoted a filename beside another file's
 * hash. Nothing caught it.
 *
 * Rule: a hash is treated as a pin for a build only when the line names
 * exactly one build file. Lines naming several files are ambiguous and are
 * counted, not judged. A wrong hash in a live document is a CONFLICT. The same
 * in an archived or recovered snapshot is HISTORICAL: those legitimately quote
 * a superseded hash.
 *
 * Scope: root *.html, *_agents<slash>**<slash>prototypes/*.html* as builds;
 * root *.md and _agents/**<slash>*.md as documents.
 *
 * Usage:
 *   node _agents/ds/tools/verify-build-pins.mjs          # human report
 *   node _agents/ds/tools/verify-build-pins.mjs --json   # machine report
 * Exit: 0 no conflict, 1 any conflict.
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { basename, join, relative, sep } from "node:path";

const ROOT = process.cwd();
const HEX = /\b([0-9a-f]{8,64})\b/g;
const SKIP = new Set([
	".git",
	"node_modules",
	".kilo",
	".opencode",
	"_archive",
	"_agents-payload",
	"Football Sim",
	"SIM-PLATFORM",
	"worktrees",
]);
const HISTORICAL = ["recovered", "_archive"];

const isDir = (p) => {
	try {
		return statSync(p).isDirectory();
	} catch {
		return false;
	}
};

const walk = (dir, match, out = []) => {
	let names;
	try {
		names = readdirSync(dir);
	} catch {
		return out;
	}
	for (const name of names) {
		if (SKIP.has(name)) continue;
		const p = join(dir, name);
		if (isDir(p)) walk(p, match, out);
		else if (match(name, p)) out.push(p);
	}
	return out;
};

const builds = readdirSync(ROOT)
	.filter((n) => n.endsWith(".html") && !isDir(join(ROOT, n)))
	.map((n) => join(ROOT, n))
	.concat(
		walk(
			join(ROOT, "_agents"),
			(n, p) => n.endsWith(".html") && /(prototypes|builds)/.test(p),
		),
	);

const byName = new Map();
const byHash = new Map();
for (const p of builds) {
	const hash = createHash("sha256").update(readFileSync(p)).digest("hex");
	byName.set(basename(p), { hash, size: statSync(p).size });
	byHash.set(hash, basename(p));
}

const docs = readdirSync(ROOT)
	.filter((n) => n.endsWith(".md") && !isDir(join(ROOT, n)))
	.map((n) => join(ROOT, n))
	.concat(walk(join(ROOT, "_agents"), (n) => n.endsWith(".md")));

const conflicts = [];
const historical = [];
let ambiguous = 0;

for (const doc of docs) {
	const rel = relative(ROOT, doc);
	const isHist = HISTORICAL.some((h) => rel.split(sep).includes(h));
	const lines = readFileSync(doc, "utf8").split("\n");
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const named = [...byName.keys()].filter((n) => line.includes(n));
		if (!named.length) continue;
		const hashes = [...line.matchAll(HEX)].map((m) => m[1]);
		if (!hashes.length) continue;
		if (named.length > 1) {
			ambiguous++;
			continue;
		}
		const name = named[0];
		const real = byName.get(name);
		for (const quoted of hashes) {
			if (real.hash.startsWith(quoted)) continue;
			const owner = [...byHash.entries()].find(([full]) => full.startsWith(quoted));
			const rec = {
				doc: rel,
				line: i + 1,
				name,
				quoted,
				realHash: real.hash.slice(0, 12),
				realSize: real.size,
				belongsTo: owner ? owner[1] : null,
			};
			(isHist ? historical : conflicts).push(rec);
		}
	}
}

if (process.argv.includes("--json")) {
	console.log(JSON.stringify({ builds: byName.size, conflicts, historical, ambiguous }, null, 1));
} else {
	console.log(`builds on disk: ${byName.size}`);
	for (const [name, b] of byName) {
		console.log(`  ${name.padEnd(44)} ${b.hash.slice(0, 12)}  ${b.size} B`);
	}
	console.log("");
	console.log(`conflicts (live docs): ${conflicts.length}`);
	for (const f of conflicts.slice(0, 40)) {
		console.log(`  ${f.doc}:${f.line}`);
		console.log(`    names ${f.name}, quotes ${f.quoted}`);
		console.log(`    real        ${f.realHash}  ${f.realSize} B`);
		if (f.belongsTo) console.log(`    ${f.quoted} belongs to ${f.belongsTo}`);
	}
	if (conflicts.length > 40) console.log(`  … ${conflicts.length - 40} more`);
	console.log(`historical snapshots quoting a superseded hash: ${historical.length}`);
	console.log(`ambiguous lines naming several builds (not judged): ${ambiguous}`);
}

process.exit(conflicts.length ? 1 : 0);
