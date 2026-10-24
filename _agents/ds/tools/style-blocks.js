#!/usr/bin/env node
/* style-blocks.js — census of the two <style> blocks in each build.
 * Read-only, no deps. Usage: node style-blocks.js <a.html> <b.html>
 * Written by DS for the Round-4 F2/F4 receipt, 20 Oct 2026.
 * Block 0 = the head inline <style>; block 1 = the main <style> after <body>.
 */
const fs = require("node:fs");

const [a, b] = process.argv.slice(2);
if (!a || !b) {
	console.error("usage: node style-blocks.js <a.html> <b.html>");
	process.exit(4);
}

function census(path) {
	const html = fs.readFileSync(path, "utf8");
	const ms = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)];
	return ms.map((m, i) => {
		const before = html.slice(0, m.index);
		const start = (before.match(/\n/g) || []).length + 1;
		const content = m[1];
		const end = start + (content.match(/\n/g) || []).length;
		return {
			index: i,
			start,
			end,
			content,
			bytes: Buffer.byteLength(content),
			opens: (content.match(/\{/g) || []).length,
			media: (content.match(/@media/g) || []).length,
			keyframes: (content.match(/@keyframes/g) || []).length,
			prefers: (content.match(/prefers-color-scheme/g) || []).length,
			colorScheme: (content.match(/color-scheme/g) || []).length,
			comments: content
				.split("\n")
				.map((line, n) => ({ line: line.trim(), n: n + 1 }))
				.filter((x) => x.line.includes("/*")),
			markers: content
				.split("\n")
				.map((line, n) => ({ line: line.trim(), n: n + 1 }))
				.filter((x) =>
					/v20 look|phone draft board|Season-first presentation/.test(x.line),
				),
			colorLines: content
				.split("\n")
				.map((line, n) => ({ line: line.trim(), n: n + 1 }))
				.filter((x) => x.line.includes("color-scheme")),
		};
	});
}

const A = census(a),
	B = census(b);
for (const [label, S] of [
	["A/v20", A],
	["B/donor", B],
]) {
	console.log(`\n${label}: ${S.length} style blocks`);
	for (const x of S) {
		console.log(
			`  block${x.index}: lines ${x.start}-${x.end}; ${x.bytes} B; opens ${x.opens}; @media ${x.media}; @keyframes ${x.keyframes}; prefers-color-scheme ${x.prefers}; color-scheme ${x.colorScheme}`,
		);
		for (const c of x.comments)
			console.log(`    comment ${x.start + c.n - 1}: ${c.line}`);
		for (const m of x.markers)
			console.log(`    marker  ${x.start + m.n - 1}: ${m.line}`);
		for (const c of x.colorLines)
			console.log(`    color   ${x.start + c.n - 1}: ${c.line}`);
	}
}

if (A[0] && B[0]) {
	const a0 = A[0].content,
		b0 = B[0].content;
	console.log(`\nblock0 exact same: ${a0 === b0}`);
	console.log(
		`block0 donor after color-scheme:light dark -> light equals v20: ${a0 === b0.replace("color-scheme:light dark", "color-scheme:light")}`,
	);
	console.log(`block0 bytes: v20 ${A[0].bytes} / donor ${B[0].bytes}`);
}
if (A[1] && B[1]) {
	console.log(
		`\nblock1 lines: v20 ${A[1].start}-${A[1].end} (${A[1].end - A[1].start + 1}) / donor ${B[1].start}-${B[1].end} (${B[1].end - B[1].start + 1})`,
	);
	console.log(`block1 bytes: v20 ${A[1].bytes} / donor ${B[1].bytes}`);
	console.log(
		`block1 opens: v20 ${A[1].opens} / donor ${B[1].opens}; @media ${A[1].media}/${B[1].media}; @keyframes ${A[1].keyframes}/${B[1].keyframes}`,
	);
	console.log(
		`block1 color-scheme occurrences: v20 ${A[1].colorScheme} / donor ${B[1].colorScheme} (both are prefers-color-scheme media queries)`,
	);
}
