#!/usr/bin/env node
// task-validator-probe.mjs — adversarial test of tools/check-tasks.mjs (unmerged, branch
// claude/v21-and-council-ops). Each case builds a throwaway tasks/ directory, runs the
// validator against it, and records whether the validator behaved correctly.
//
// "expected" is what a correct validator must do: accept a legitimate item, reject an
// illegitimate one. A case is PASS when actual === expected; FAIL when it is not.
//
// Usage: node _agents/ds/tools/task-validator-probe.mjs <path-to-check-tasks.mjs>
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const validator = process.argv[2];
if (!validator) {
	console.error("usage: node task-validator-probe.mjs <path-to-check-tasks.mjs>");
	process.exit(2);
}

const SHA = "40233d6b";
const base = { base_build_sha: SHA, title: "Probe item" };
const good = {
	...base,
	id: "T-20261022-ds-1",
	state: "owner-accepted",
	seat: "ds",
	claimed_at: "2026-10-22",
	evidence: [{ command: "node probe.mjs", result: "ok" }],
	verification: { seat: "glm", command: "node probe.mjs", result: "ok" },
	owner_decision: "Owner approved in session",
};

const cases = [
	{ name: "valid: proposed, minimal", files: { "T-20261022-ds-2.json": { ...base, id: "T-20261022-ds-2", state: "proposed" } }, expect: 0 },
	{ name: "valid: full owner-accepted", files: { "T-20261022-ds-1.json": good }, expect: 0 },
	{
		name: "valid: hyphenated seat (nemo-super exists in this council)",
		files: { "T-20261022-nemo-super-1.json": { ...base, id: "T-20261022-nemo-super-1", state: "proposed" } },
		expect: 0,
	},
	{ name: "reject: id shape", files: { "bad.json": { ...base, id: "T-22-ds-1", state: "proposed" } }, expect: 1 },
	{ name: "reject: filename != id", files: { "wrong.json": { ...base, id: "T-20261022-ds-3", state: "proposed" } }, expect: 1 },
	{ name: "reject: unknown state", files: { "T-20261022-ds-4.json": { ...base, id: "T-20261022-ds-4", state: "done" } }, expect: 1 },
	{ name: "reject: accepted without seat", files: { "T-20261022-ds-5.json": { ...base, id: "T-20261022-ds-5", state: "accepted" } }, expect: 1 },
	{
		name: "reject: seat without claimed_at",
		files: { "T-20261022-ds-6.json": { ...base, id: "T-20261022-ds-6", state: "accepted", seat: "ds" } },
		expect: 1,
	},
	{
		name: "reject: implemented without evidence",
		files: { "T-20261022-ds-7.json": { ...base, id: "T-20261022-ds-7", state: "implemented", seat: "ds", claimed_at: "2026-10-22" } },
		expect: 1,
	},
	{
		name: "reject: evidence entry missing result",
		files: {
			"T-20261022-ds-8.json": {
				...base,
				id: "T-20261022-ds-8",
				state: "implemented",
				seat: "ds",
				claimed_at: "2026-10-22",
				evidence: [{ command: "node x" }],
			},
		},
		expect: 1,
	},
	{
		name: "reject: verified without verification block",
		files: {
			"T-20261022-ds-9.json": {
				...base,
				id: "T-20261022-ds-9",
				state: "verified",
				seat: "ds",
				claimed_at: "2026-10-22",
				evidence: [{ command: "node x", result: "ok" }],
			},
		},
		expect: 1,
	},
	{
		name: "reject: implementer verifies own work",
		files: {
			"T-20261022-ds-10.json": {
				...good,
				id: "T-20261022-ds-10",
				verification: { seat: "ds", command: "node x", result: "ok" },
			},
		},
		expect: 1,
	},
	{
		name: "reject: owner-accepted without owner_decision",
		files: { "T-20261022-ds-11.json": { ...good, id: "T-20261022-ds-11", owner_decision: undefined } },
		expect: 1,
	},
	{ name: "reject: uppercase sha", files: { "T-20261022-ds-12.json": { ...base, id: "T-20261022-ds-12", state: "proposed", base_build_sha: "40233D6B" } }, expect: 1 },
	{ name: "reject: invalid JSON", files: { "T-20261022-ds-13.json": "{not json" }, expect: 1 },
	{ name: "reject: duplicate id under two filenames", files: { "a.json": { ...base, id: "T-20261022-ds-14", state: "proposed" }, "b.json": { ...base, id: "T-20261022-ds-14", state: "proposed" } }, expect: 1 },
	// Deliberate gap probes: the validator may accept these, which would be a finding.
	{ name: "gap: claimed_at is not a date", files: { "T-20261022-ds-15.json": { ...good, id: "T-20261022-ds-15", claimed_at: "yesterday" } }, expect: 1 },
	{ name: "gap: sha of 9 hex chars", files: { "T-20261022-ds-16.json": { ...base, id: "T-20261022-ds-16", state: "proposed", base_build_sha: "40233d6ba" } }, expect: 1 },
];

let pass = 0;
const fails = [];
for (const c of cases) {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tasks-probe-"));
	for (const [name, body] of Object.entries(c.files)) {
		fs.writeFileSync(path.join(dir, name), typeof body === "string" ? body : JSON.stringify(body, null, 2));
	}
	let code = 0;
	let out = "";
	try {
		out = execFileSync(process.execPath, [validator, "--dir", dir], { encoding: "utf8", stdio: "pipe" });
	} catch (e) {
		code = e.status ?? 1;
		out = `${e.stdout || ""}${e.stderr || ""}`;
	}
	const ok = code === c.expect;
	if (ok) pass++;
	else fails.push({ name: c.name, expected: c.expect, actual: code, msg: out.split("\n").filter((l) => l.includes("✗")).slice(0, 2).join(" ") });
	fs.rmSync(dir, { recursive: true, force: true });
}

console.log(`cases: ${cases.length}   behaved correctly: ${pass}   did not: ${fails.length}\n`);
for (const f of fails) {
	console.log(`  ${f.name}`);
	console.log(`    expected exit ${f.expected}, got ${f.actual}${f.msg ? ` — ${f.msg}` : ""}`);
}
