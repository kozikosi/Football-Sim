#!/usr/bin/env node
// owner-questions.mjs — the Owner's concept-question channel.
//
// MiniMax · 20 Oct 2026. Dependency-free plain Node (>= 18). No installs.
//
//   node owner-questions.mjs --list                 what is in the bank, by area
//   node owner-questions.mjs --status               open / answered, by area and priority
//   node owner-questions.mjs --next [n]             write the next n unanswered questions into the queue
//   node owner-questions.mjs --all                  write every unanswered question into the queue
//   node owner-questions.mjs --answer <id> "text"   record the Owner's answer (append-only)
//   node owner-questions.mjs --add "question" --area X --topic Y --priority Z --why W
//
// Files (all relative to SIM-PLATFORM/):
//   tools/question-bank.json     the bank — APPEND-ONLY, anyone may extend it
//   questions/OWNER-QUESTIONS.md the queue (generated; read-only for humans)
//   questions/ANSWERS.md          the answer log (append-only; the durable record)
//
// The tool READS the football build to cite the code each question concerns, and never writes to it.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const platform = path.resolve(here, "..");
const repo = path.resolve(platform, "..");
const BANK = path.join(here, "question-bank.json");
const QUEUE = path.join(platform, "questions", "OWNER-QUESTIONS.md");
const ANSWERS = path.join(platform, "questions", "ANSWERS.md");
const BUILD = path.join(repo, "NFL Draft Simulator v20 Claude.html");

const argv = process.argv.slice(2);
const flags = {};
const positional = [];
for (let i = 0; i < argv.length; i++) {
	if (argv[i].startsWith("--")) {
		const k = argv[i].slice(2);
		const next = argv[i + 1];
		flags[k] = next && !next.startsWith("--") ? argv[++i] : true;
	} else positional.push(argv[i]);
}

if (!fs.existsSync(BANK)) {
	console.error(`bank not found: ${BANK}`);
	process.exit(4);
}
const bank = JSON.parse(fs.readFileSync(BANK, "utf8"));

// --- answered state -----------------------------------------------------------------------
function answeredIds() {
	const out = new Map();
	if (!fs.existsSync(ANSWERS)) return out;
	const raw = fs.readFileSync(ANSWERS, "utf8");
	// ignore fenced code blocks (the format example lives in one)
	const txt = raw.replace(/```[\s\S]*?```/g, "");
	const re =
		/^##\s+(Q-OWNER-\d+)\b[^\n]*\n([\s\S]*?)(?=\n##\s+Q-OWNER-|\s*$)/gm;
	let m;
	while ((m = re.exec(txt))) {
		const date = (m[2].match(/- \*\*Answered:\*\*\s*([^\n*]+)/) || [
			undefined,
			"date unknown",
		])[1].trim();
		out.set(m[1], date);
	}
	return out;
}

// --- code anchors ---------------------------------------------------------------------------
let buildLines = null;
function findAnchors(anchor) {
	if (buildLines === null) {
		if (!fs.existsSync(BUILD)) return [];
		buildLines = fs.readFileSync(BUILD, "utf8").split("\n");
	}
	const hits = [];
	const esc = anchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const word = new RegExp(`(?<![\\w$])${esc}(?![\\w$])`);
	const loose = new RegExp(esc, "i");
	// pass 1: whole-word matches; pass 2 (only for anchors long enough to be unambiguous):
	// a loose substring match. Short anchors never fall back — 'MC' would match half the stylesheet.
	const wordHits = [],
		looseHits = [];
	for (let i = 0; i < buildLines.length; i++) {
		const line = buildLines[i];
		if (word.test(line))
			wordHits.push({ line: i + 1, text: line.trim().slice(0, 110) });
		else if (anchor.length >= 4 && loose.test(line))
			looseHits.push({ line: i + 1, text: line.trim().slice(0, 110) });
	}
	hits.push(...wordHits.slice(0, 2));
	if (!hits.length) hits.push(...looseHits.slice(0, 2));
	return hits;
}

// --- selection ------------------------------------------------------------------------------
const PRIORITY_ORDER = { blocking: 0, now: 1, later: 2 };
function selectQuestions(n) {
	const done = answeredIds();
	const open = bank.filter((q) => !done.has(q.id));
	// round-robin across areas so no area starves; inside an area, blocking first, then bank order
	const byArea = new Map();
	for (const q of open) {
		if (!byArea.has(q.area)) byArea.set(q.area, []);
		byArea.get(q.area).push(q);
	}
	for (const list of byArea.values()) {
		list.sort(
			(a, b) =>
				(PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3),
		);
	}
	// areas with the most open questions and the highest priority come first
	const areas = [...byArea.keys()].sort((a, b) => {
		const pa = Math.min(
			...byArea.get(a).map((q) => PRIORITY_ORDER[q.priority] ?? 3),
		);
		const pb = Math.min(
			...byArea.get(b).map((q) => PRIORITY_ORDER[q.priority] ?? 3),
		);
		if (pa !== pb) return pa - pb;
		return byArea.get(b).length - byArea.get(a).length;
	});
	const out = [];
	let round = 0;
	while (out.length < n) {
		let added = false;
		for (const area of areas) {
			const list = byArea.get(area);
			if (list[round]) {
				out.push(list[round]);
				added = true;
				if (out.length >= n) break;
			}
		}
		if (!added) break;
		round++;
	}
	return out;
}

// --- the queue file --------------------------------------------------------------------------
function writeQueue(questions) {
	const done = answeredIds();
	const open = bank.filter((q) => !done.has(q.id));
	const now = new Date().toISOString().slice(0, 10);
	const lines = [];
	lines.push("# OWNER-QUESTIONS.md — the concept-question queue");
	lines.push("");
	lines.push(
		"> **Generated** by `tools/owner-questions.mjs` on " +
			now +
			". Do not hand-edit this file: edit `tools/question-bank.json` and re-run the generator.",
	);
	lines.push("> The durable record of answers is `ANSWERS.md` (append-only).");
	lines.push("");
	lines.push(
		`**Bank:** ${bank.length} questions · **open:** ${open.length} · **answered:** ${done.size} · **shown below:** ${questions.length}`,
	);
	lines.push("");
	lines.push("## How to answer (2 minutes each)");
	lines.push("");
	lines.push(
		'Reply in any order — by question ID. A sentence or two is enough; "ask me again with an example"',
	);
	lines.push(
		"is a valid answer and very welcome. The answer becomes a decision input for the Architect, so",
	);
	lines.push("the useful answer is the *rule*, not the example.");
	lines.push("");
	lines.push(
		'If you want to record an answer yourself: `node tools/owner-questions.mjs --answer Q-OWNER-03 "your answer"`.',
	);
	lines.push("");
	lines.push("---");
	lines.push("");
	lines.push("## The open queue");
	lines.push("");
	if (!questions.length) lines.push("_(no open questions)_\n");
	for (const q of questions) {
		lines.push(
			`### ${q.id} — ${q.topic}  \`[${q.priority}]\` · area: \`${q.area}\``,
		);
		lines.push("");
		lines.push(`**Question.** ${q.question}`);
		lines.push("");
		lines.push(`**Why it matters.** ${q.why}`);
		if (q.anchors?.length) {
			lines.push("");
			lines.push("**Code context** (read-only, cited for reference):");
			for (const a of q.anchors) {
				const hits = findAnchors(a);
				if (!hits.length) {
					lines.push(`- \`${a}\` — not found in the current build`);
					continue;
				}
				for (const h of hits)
					lines.push(`- \`${path.basename(BUILD)}:${h.line}\` — \`${h.text}\``);
			}
		}
		lines.push("");
		lines.push("> **Answer:**");
		lines.push("");
		lines.push("---");
		lines.push("");
	}
	lines.push("## Answered so far");
	lines.push("");
	if (!done.size) lines.push("_(none yet)_");
	else
		for (const [id, date] of [...done.entries()].sort())
			lines.push(`- **${id}** — answered ${date} (see \`ANSWERS.md\`)`);
	lines.push("");
	fs.writeFileSync(QUEUE, lines.join("\n"));
	return { now, open: open.length, done: done.size };
}

// --- commands --------------------------------------------------------------------------------
function cmdList() {
	const done = answeredIds();
	const areas = new Map();
	for (const q of bank) {
		if (!areas.has(q.area)) areas.set(q.area, []);
		areas.get(q.area).push(q);
	}
	console.log(
		"\nQuestion bank — " +
			bank.length +
			" questions, " +
			done.size +
			" answered\n",
	);
	for (const [area, list] of areas) {
		const blocking = list.filter((q) => q.priority === "blocking").length;
		const now = list.filter((q) => q.priority === "now").length;
		const later = list.filter((q) => q.priority === "later").length;
		console.log(
			`  ${area.padEnd(26)} ${String(list.length).padStart(3)}  (blocking ${blocking} · now ${now} · later ${later})`,
		);
	}
	console.log(
		`\n  IDs: ${bank.map((q) => q.id.replace("Q-OWNER-", "")).join(", ")}`,
	);
	console.log(
		"  write the next batch: node tools/owner-questions.mjs --next 5\n",
	);
}

function cmdStatus() {
	const done = answeredIds();
	const open = bank.filter((q) => !done.has(q.id));
	const byPri = (p) => ({
		open: open.filter((q) => q.priority === p).length,
		done: bank.filter((q) => q.priority === p && done.has(q.id)).length,
	});
	console.log(`\nStatus — ${done.size} answered of ${bank.length}\n`);
	for (const p of ["blocking", "now", "later"]) {
		const s = byPri(p);
		console.log(
			`  ${p.padEnd(10)} open ${String(s.open).padStart(3)}   answered ${String(s.done).padStart(3)}`,
		);
	}
	const areas = new Map();
	for (const q of open) areas.set(q.area, (areas.get(q.area) || 0) + 1);
	console.log("\n  open by area:");
	for (const [a, n] of [...areas.entries()].sort((x, y) => y[1] - x[1]))
		console.log(`    ${a.padEnd(26)} ${n}`);
	console.log("");
}

function cmdAdd() {
	const text = positional[0];
	if (!text) {
		console.error("--add needs the question text");
		process.exit(4);
	}
	const area = typeof flags.area === "string" ? flags.area : "general";
	const topic =
		typeof flags.topic === "string" ? flags.topic : text.slice(0, 60);
	const priority = typeof flags.priority === "string" ? flags.priority : "now";
	const why = typeof flags.why === "string" ? flags.why : "";
	const anchors =
		typeof flags.anchors === "string"
			? flags.anchors
					.split(",")
					.map((s) => s.trim())
					.filter(Boolean)
			: [];
	const nums = bank
		.map((q) => Number(q.id.replace("Q-OWNER-", "")))
		.filter((n) => Number.isFinite(n));
	const id = `Q-OWNER-${String(Math.max(0, ...nums) + 1).padStart(2, "0")}`;
	const entry = {
		id,
		area,
		priority,
		topic,
		question: text,
		why,
		anchors,
		added: new Date().toISOString().slice(0, 10),
		source: "council",
	};
	fs.writeFileSync(
		BANK,
		`${JSON.stringify([...bank, entry], null, 2)}\n`,
		"utf8",
	);
	console.log(`added ${id} to the bank (${area}, ${priority})`);
}

function cmdAnswer() {
	const id = positional[0];
	const text = positional.slice(1).join(" ").trim();
	if (!id || !text) {
		console.error("--answer needs <id> and the answer text");
		process.exit(4);
	}
	const q = bank.find((x) => x.id === id);
	if (!q) {
		console.error(`no such question in the bank: ${id}`);
		process.exit(4);
	}
	const now = new Date().toISOString().slice(0, 10);
	if (!fs.existsSync(ANSWERS)) {
		fs.writeFileSync(
			ANSWERS,
			"# ANSWERS.md — the Owner's recorded concept answers\n\nAppend-only. Each entry is an Owner decision input for the Architect and the council.\n\n",
		);
	}
	const body = fs.readFileSync(ANSWERS, "utf8");
	const entry = `\n## ${id} — ${q.topic}\n\n- **Answered:** ${now}\n- **By:** Owner\n- **Area:** ${q.area} · **Priority:** ${q.priority}\n- **Question:** ${q.question}\n- **Answer:** ${text}\n`;
	if (new RegExp(`^##\\s+${id}\\b`, "m").test(body)) {
		console.error(
			id +
				" already has an answer in ANSWERS.md — append a new dated entry rather than replacing it.",
		);
		process.exit(1);
	}
	fs.writeFileSync(ANSWERS, body.replace(/\s*$/, "\n") + entry, "utf8");
	console.log(`recorded ${id} → ANSWERS.md`);
}

if (flags.list) cmdList();
else if (flags.status) cmdStatus();
else if (flags.answer) cmdAnswer();
else if (flags.add) cmdAdd();
else if (flags.all) {
	const res = writeQueue(selectQuestions(bank.length));
	console.log(
		`queue written: ${QUEUE} (${res.now}, ${res.open} open, ${res.done} answered)`,
	);
} else if (flags.next !== undefined) {
	const n = Number(positional[0]) || 5;
	const res = writeQueue(selectQuestions(n));
	console.log(
		`queue written: ${QUEUE}\n  ${res.now} · ${res.open} open in the bank · ${res.done} answered · ${n} shown`,
	);
	for (const q of selectQuestions(n))
		console.log(
			`  ${q.id}  [${q.priority.padEnd(8)}] ${q.area.padEnd(24)} ${q.topic}`,
		);
} else {
	console.log(
		'usage: node owner-questions.mjs --list | --status | --next [n] | --all | --answer <id> "text" | --add "q" --area X --topic Y --priority Z --why W',
	);
	process.exit(4);
}
