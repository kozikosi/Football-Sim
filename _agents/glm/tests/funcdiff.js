#!/usr/bin/env node
/**
 * funcdiff.js — PROTOTYPE v0 (GLM, 2026-10-21). Target home: tests/funcdiff.js
 * (per AGENTS.md verifier rule). Set-level only in v0: symmetric difference of
 * function NAMES between two builds. Body/change-level diff and the
 * "touched set == union of accepted submissions" comparison are next iterations.
 *
 * Usage: node funcdiff.js <buildA.html|js> <buildB.html|js>
 */
"use strict";
const fs = require("node:fs");

const RESERVED = new Set(
	(
		"if else for while do switch case catch finally try return throw new " +
		"delete typeof void in of instanceof with await yield debugger default this super function " +
		"var let const class extends break continue"
	).split(" "),
);

function scriptBodies(text) {
	if (!/<script[\s>]/i.test(text)) return text; // plain .js input
	const m = text.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi) || [];
	return m.join("\n");
}

function functionNames(text) {
	const code = scriptBodies(text);
	const names = new Map(); // name -> first decl site
	const add = (n, site) => {
		if (!RESERVED.has(n) && !names.has(n)) names.set(n, site);
	};
	// 1) function declarations + function expressions bound to identifiers:
	//    function foo(  |  foo = function(  |  foo = (a,b) =>  |  foo = async (
	for (const m of code.matchAll(/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g))
		add(m[1], m.index);
	for (const m of code.matchAll(
		/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?function\b/g,
	))
		add(m[1], m.index);
	for (const m of code.matchAll(
		/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\(/g,
	))
		add(m[1], m.index);
	// 2) object-literal / class method shorthand:  name(args) {  (line-anchored)
	for (const m of code.matchAll(
		/^[ \t]*([A-Za-z_$][\w$]*)\s*\([^()]*\)\s*\{/gm,
	))
		add(m[1], m.index);
	return names;
}

function load(p) {
	let t;
	try {
		t = fs.readFileSync(p, "utf8");
	} catch (e) {
		console.error(`funcdiff: cannot read ${p}: ${e.message}`);
		process.exit(2);
	}
	return t;
}

function main(a, b, c) {
	if (c) {
		console.error("funcdiff: exactly two inputs expected");
		process.exit(2);
	}
	const A = load(a),
		B = load(b);
	const fa = functionNames(A),
		fb = functionNames(B);
	const removed = [...fa.keys()].filter((k) => !fb.has(k)).sort();
	const added = [...fb.keys()].filter((k) => !fa.has(k)).sort();
	console.log(`A: ${a} — ${fa.size} function names`);
	console.log(`B: ${b} — ${fb.size} function names`);
	console.log(`REMOVED (in A, absent in B) — ${removed.length}:`);
	for (const n of removed) console.log(`  - ${n}`);
	console.log(`ADDED (in B, absent in A) — ${added.length}:`);
	for (const n of added) console.log(`  + ${n}`);
	if (!removed.length && !added.length)
		console.log("SET-IDENTICAL at name level.");
	// Exit 0 either way: this is a diff report, not a pass/fail gate. The gate
	// (set == union of accepted submissions) belongs to the verifier workflow.
}

main(process.argv[2], process.argv[3], process.argv[4]);
