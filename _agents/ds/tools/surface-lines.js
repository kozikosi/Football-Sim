#!/usr/bin/env node
/* surface-lines.js — file-line ranges for the 14-function merge surface.
 * Read-only, no deps. Usage: node surface-lines.js <a.html> <b.html>
 * Written by DS for the M-19 Round-3 assignment, 20 Oct 2026.
 *
 * The project style closes top-level functions with "}" in column 0; this
 * scanner uses that style (same assumption as funcdiff-probe.js). Each
 * range is a pair of 1-based *file* lines, not script-relative lines.
 */
const fs = require("node:fs");
const crypto = require("node:crypto");

const [a, b] = process.argv.slice(2);
if (!a || !b) {
	console.error("usage: node surface-lines.js <a.html> <b.html>");
	process.exit(4);
}

const SURFACE = [
	"setActiveTab",
	"cpuPick",
	"fitNoteHTML",
	"renderDraftBoard2",
	"buildDefenseDetail",
	"turnoverParagraph",
	"playByPlay",
	"matchupTagHTML",
	"renderGuideHTML",
	"render100",
	"renderSeasonTab",
	"renderSeasonTabInner",
	"finishDraft2",
	"renderDraftResults",
];
const SETDIFF = [
	"updateStepper",
	"seasonToast",
	"goSeason",
	"meetingInfo",
	"meetingTagText",
];
const ANCHORS = ["startDraft2", "startSeason", "runLeague100"];

function scan(path) {
	const html = fs.readFileSync(path, "utf8");
	const m = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/);
	if (!m) throw new Error(`no script block: ${path}`);
	const contentOffset = m.index + m[0].indexOf(">") + 1;
	const baseLine = (html.slice(0, contentOffset).match(/\n/g) || []).length + 1;
	const L = m[1].split("\n");
	const out = new Map();
	for (let i = 0; i < L.length; i++) {
		const f = L[i].match(/^function\s+([A-Za-z_$][\w$]*)\s*\(/);
		if (!f) continue;
		let end = -1;
		for (let j = i + 1; j < L.length; j++) {
			if (L[j] === "}" || L[j].trim() === "}") {
				end = j;
				break;
			}
		}
		if (end < 0) throw new Error(`unclosed function ${f[1]} in ${path}`);
		out.set(f[1], {
			start: baseLine + i,
			end: baseLine + end,
			lines: end - i + 1,
			body: L.slice(i, end + 1).join("\n"),
			hash: crypto
				.createHash("sha256")
				.update(L.slice(i, end + 1).join("\n"))
				.digest("hex")
				.slice(0, 12),
		});
	}
	return { out, html, baseLine };
}

const A = scan(a),
	B = scan(b);
const rows = [];
for (const name of SURFACE) {
	const x = A.out.get(name),
		y = B.out.get(name);
	rows.push({
		name,
		a: x ? `${x.start}-${x.end}` : "—",
		b: y ? `${y.start}-${y.end}` : "—",
		aL: x ? x.lines : 0,
		bL: y ? y.lines : 0,
		same: x && y ? x.body === y.body : false,
		aHash: x ? x.hash : "—",
		bHash: y ? y.hash : "—",
	});
}
console.log(
	"| # | function | v20 lines | donor lines | v20/donor ln | same body |",
);
console.log("|---|---|---|---|---|---|");
rows.forEach((r, i) =>
	console.log(
		`| ${i + 1} | \`${r.name}\` | ${r.a} | ${r.b} | ${r.aL}/${r.bL} | ${r.same ? "yes" : "no"} |`,
	),
);
console.log("\nSet diffs (not in the 14):");
for (const name of SETDIFF) {
	const x = A.out.get(name),
		y = B.out.get(name);
	console.log(
		`- \`${name}\`: v20 ${x ? `${x.start}-${x.end}` : "—"}; donor ${y ? `${y.start}-${y.end}` : "—"}; hashes ${x ? x.hash : "—"}/${y ? y.hash : "—"}`,
	);
}
console.log("\nS-102 anchors (v20):");
for (const name of ANCHORS) {
	const x = A.out.get(name),
		y = B.out.get(name);
	console.log(
		`- \`${name}\`: v20 ${x ? `${x.start}-${x.end}` : "—"}; donor ${y ? `${y.start}-${y.end}` : "—"}; hashes ${x ? x.hash : "—"}/${y ? y.hash : "—"}`,
	);
}
console.log("\nPhone-layout block:");
for (const [label, S] of [
	["v20", A],
	["donor", B],
]) {
	const L = S.html.split("\n");
	const i = L.findIndex((l) => l.includes("phone layout:"));
	if (i < 0) {
		console.log(`- ${label}: not found`);
		continue;
	}
	let end = i;
	for (let j = i; j < L.length; j++)
		if (L[j] === "})();") {
			end = j;
			break;
		}
	console.log(`- ${label}: ${i + 1}-${end + 1}`);
}
