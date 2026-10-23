#!/usr/bin/env node
/* funcdiff-full.js — full-body top-level function diff, line-based boundaries.
 * Read-only, no deps. Usage: node funcdiff-full.js <a.html> <b.html> [--diag]
 *
 * Round-2's funcdiff-probe stopped at the first trimmed "}", which truncates
 * any function containing a nested close. This tool takes the boundary as the
 * last "}" line before the next top-level "function" line, then hashes the
 * whole span. Validate against the three S-102 anchors before trusting it.
 */
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const crypto = require("node:crypto");
const { spawnSync } = require("node:child_process");
const [a, b] = process.argv
	.slice(2)
	.filter(
		(x) =>
			x !== "--diag" &&
			x !== "--classify" &&
			x !== "--hashes" &&
			!x.startsWith("--diff="),
	);
const diag = process.argv.includes("--diag");
const classify = process.argv.includes("--classify");
const hashes = process.argv.includes("--hashes");
const diffName = (
	process.argv.find((x) => x.startsWith("--diff=")) || ""
).slice(7);
const PIN_NAMES = [
	"setActiveTab",
	"cpuPick",
	"fitNoteHTML",
	"renderDraftBoard2",
	"buildDefenseDetail",
	"dramaticEnding",
	"turnoverParagraph",
	"playByPlay",
	"generateGameSummary",
	"matchupTagHTML",
	"renderPlayoffsView",
	"renderGuideHTML",
	"render100",
	"renderSeasonTab",
	"renderSeasonTabInner",
	"finishDraft2",
	"renderDraftResults",
];
const SETDIFF_NAMES = [
	"updateStepper",
	"seasonToast",
	"goSeason",
	"meetingInfo",
	"meetingTagText",
];
if (!a || !b) {
	console.error("usage: node funcdiff-full.js <a.html> <b.html> [--diag]");
	process.exit(4);
}

function scan(path) {
	const html = fs.readFileSync(path, "utf8");
	const m = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/);
	if (!m) throw new Error(`no script block: ${path}`);
	const contentOffset = m.index + m[0].indexOf(">") + 1;
	const baseLine = (html.slice(0, contentOffset).match(/\n/g) || []).length + 1;
	const L = m[1].split("\n");
	const starts = [];
	for (let i = 0; i < L.length; i++) {
		const f = L[i].match(/^function\s+([A-Za-z_$][\w$]*)\s*\(/);
		if (f) starts.push({ name: f[1], i });
	}
	const out = new Map();
	for (let k = 0; k < starts.length; k++) {
		const { name, i } = starts[k];
		const next = k + 1 < starts.length ? starts[k + 1].i : L.length;
		let end = i;
		for (let j = next - 1; j > i; j--) {
			if (L[j].trim() === "}") {
				end = j;
				break;
			}
		}
		const body = L.slice(i, end + 1).join("\n");
		out.set(name, {
			start: baseLine + i,
			end: baseLine + end,
			lines: end - i + 1,
			body,
			hash: crypto.createHash("sha256").update(body).digest("hex").slice(0, 12),
			next: k + 1 < starts.length ? starts[k + 1].name : "EOF",
		});
	}
	return { out, L, baseLine };
}

const A = scan(a),
	B = scan(b);
const aN = new Set(A.out.keys()),
	bN = new Set(B.out.keys());
const common = [...aN].filter((n) => bN.has(n)).sort();
const changed = [],
	same = [];
for (const n of common) {
	const x = A.out.get(n),
		y = B.out.get(n);
	if (x.body === y.body) same.push(n);
	else changed.push(n);
}
const aOnly = [...aN].filter((n) => !bN.has(n)).sort();
const bOnly = [...bN].filter((n) => !aN.has(n)).sort();
console.log(`A: ${aN.size} functions; B: ${bN.size} functions`);
console.log(
	`common ${common.length} | identical ${same.length} | differing ${changed.length}`,
);
console.log(`A-only ${aOnly.length}: ${aOnly.join(", ")}`);
console.log(`B-only ${bOnly.length}: ${bOnly.join(", ")}`);
console.log("differing:");
for (const n of changed) {
	let ws = "";
	if (classify) {
		const norm = (s) => s.replace(/\s+/g, " ").trim();
		ws =
			norm(A.out.get(n).body) === norm(B.out.get(n).body)
				? "  [ws-only]"
				: "  [substantive]";
	}
	console.log(
		`  ${n}: A ${A.out.get(n).start}-${A.out.get(n).end} (${A.out.get(n).lines}L) | B ${B.out.get(n).start}-${B.out.get(n).end} (${B.out.get(n).lines}L)${ws}`,
	);
}
if (diffName) {
	const x = A.out.get(diffName),
		y = B.out.get(diffName);
	if (!x || !y) {
		console.error(`no such common function: ${diffName}`);
		process.exit(4);
	}
	const pa = path.join(os.tmpdir(), "funcdiff-a.txt"),
		pb = path.join(os.tmpdir(), "funcdiff-b.txt");
	fs.writeFileSync(pa, `${x.body}\n`);
	fs.writeFileSync(pb, `${y.body}\n`);
	const d = spawnSync("diff", ["-u", pa, pb], { encoding: "utf8" });
	console.log(`\n--- ${diffName} (A=v20, B=donor) ---`);
	console.log(d.stdout || "(no diff)");
}
const anchors = ["startDraft2", "startSeason", "runLeague100"];
console.log("S-102 anchors:");
for (const n of anchors) {
	const x = A.out.get(n),
		y = B.out.get(n);
	console.log(
		`  ${n}: A ${x ? `${x.start}-${x.end}` : "—"} | B ${y ? `${y.start}-${y.end}` : "—"}`,
	);
}
if (hashes) {
	console.log("hash pins (12-hex, full body; v20 / donor):");
	for (const n of PIN_NAMES) {
		const x = A.out.get(n),
			y = B.out.get(n);
		console.log(`  ${n}\t${x ? x.hash : "—"}\t${y ? y.hash : "—"}`);
	}
	console.log("set diffs:");
	for (const n of SETDIFF_NAMES) {
		const x = A.out.get(n),
			y = B.out.get(n);
		console.log(`  ${n}\t${x ? x.hash : "—"}\t${y ? y.hash : "—"}`);
	}
}
if (diag) {
	console.log("diagnostics (last function before next):");
	for (const n of [
		"setActiveTab",
		"cpuPick",
		"render100",
		"finishDraft2",
		"renderDraftResults",
		"runLeague100",
	]) {
		for (const [label, S] of [
			["A", A],
			["B", B],
		]) {
			const x = S.out.get(n);
			if (!x) continue;
			const nextLine = x.end - S.baseLine + 1;
			console.log(
				`  ${label} ${n}: ${x.start}-${x.end}, next=${x.next}, lineAfter=${JSON.stringify(S.L[nextLine] || "")}`,
			);
		}
	}
}
