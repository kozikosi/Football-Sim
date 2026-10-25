#!/usr/bin/env node
/**
 * mathcore-probe.mjs — dump slotWins / slotWinsPerOvr / modelWeights / FLEX
 * from a build, without a DOM.
 *
 * The build's init code needs a browser. The math does not. This loads the
 * real script in a vm, applies in-memory-only guards to UI functions that
 * receive undefined during init (the files on disk are never touched), and
 * exports the model objects from inside the script's own lexical scope.
 *
 * Read-only. Run: node _agents/ds/tools/mathcore-probe.mjs <build.html> [--json]
 */
import { readFileSync } from "node:fs";
import vm from "node:vm";

const BUILD = process.argv[2];
const AS_JSON = process.argv.includes("--json");
if (!BUILD) {
	console.error("usage: mathcore-probe.mjs <build.html> [--json]");
	process.exit(2);
}
const html = readFileSync(BUILD, "utf8");
const blocks = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
let script = blocks.sort((a, b) => b.length - a.length)[0];

// In-memory guards for UI code that runs at init with an undefined argument.
// These never reach disk; they only let the maths load.
const GUARDS = [
	// Top-level init calls: the model does not need them, and they need a DOM.
	["\ninitPlayerBrowser();", "\n"],
	["\ninitGroupRankings();", "\n"],
	["\ninitDraftSetup();", "\n"],
	["\npersonalWeights = {...DEFAULT_WEIGHTS}; weights = modelWeights(); buildControls(); render();", "\n"],
	["\nsetActiveTab('viewDraft','tabDraftBtn');", "\n"],
	[
		"function groupAvgFromPool(pool, def){",
		"function groupAvgFromPool(pool, def){ if(!def) return {avg:70, top:[]};",
	],
	["if(def.parts){", "if(def&&def.parts){"],
	["if(def.parts){ ", "if(def&&def.parts){ "],
];
for (const [from, to] of GUARDS) script = script.split(from).join(to);

// Export from inside the script's own scope, immediately after slotWinsPerOvr,
// which is before the DOM init that throws.
const ANCHOR = "return (_wpoCache = out);\n}";
const EXPORT =
	"\n;globalThis.__p={slotWins,slotWinsPerOvr,slotWinsTable,modelWeights,DEFAULT_WEIGHTS,ROSTER_SLOTS,FLEX,NATURAL_SLOT_MAP,PERS};";
if (!script.includes(ANCHOR)) {
	console.error("export anchor not found");
	process.exit(2);
}
script = script + EXPORT;

const stub = new Proxy(function () {}, {
	get: (_t, k) => (k === Symbol.toPrimitive ? () => 0 : stub),
	apply: () => stub,
	construct: () => stub,
	set: () => true,
});
const ctx = {
	console,
	Math,
	JSON,
	Date,
	Object,
	Array,
	String,
	Number,
	Boolean,
	isNaN,
	parseInt,
	parseFloat,
	setTimeout,
	clearTimeout,
	document: stub,
	window: stub,
	localStorage: stub,
	navigator: stub,
	MutationObserver: stub,
	requestAnimationFrame: stub,
	alert: () => {},
	confirm: () => true,
};
vm.createContext(ctx);

let initError = null;
try {
	vm.runInContext(script, ctx, { timeout: 120000 });
} catch (e) {
	initError = e;
}
if (!ctx.__p) {
	console.error("export missing — init threw before the anchor");
	console.error(initError ? initError.stack.split("\n").slice(0, 4).join("\n") : "no error captured");
	process.exit(2);
}
const P = ctx.__p;

// Causal test: restore the neutral 11-personnel baseline before anything reads
// the model, and see whether the valuation table returns to Pre-Colors.
if (process.argv.includes("--zero11")) {
	P.PERS["11"].runB = 0;
	P.PERS["11"].passB = 0;
}

const slots = P.ROSTER_SLOTS.slice();
const perOvr = P.slotWinsPerOvr();
const weights = P.modelWeights();
const out = { build: BUILD, slots: [], flex: P.FLEX, rosters: slots };

for (const s of slots) {
	out.slots.push({
		slot: s,
		w70: P.slotWins(s, 70),
		w80: P.slotWins(s, 80),
		w90: P.slotWins(s, 90),
		perOvr: perOvr[s],
		modelWeight: weights[s],
		defaultWeight: P.DEFAULT_WEIGHTS[s],
	});
}

// Inverse test: modelWeights is round(perOvr/max*700/5)*5, floored at 5.
const maxPer = Math.max(...slots.map((s) => Math.abs(perOvr[s])));
const rows = out.slots.map((r) => {
	const ideal = (Math.abs(r.perOvr) / maxPer) * 700;
	const got = r.modelWeight;
	const absErr = Math.abs(got - ideal);
	const relErr = ideal > 0 ? absErr / ideal : 0;
	return { slot: r.slot, perOvr: r.perOvr, ideal, got, absErr, relErr };
});
const worst = rows.slice().sort((a, b) => b.relErr - a.relErr)[0];
const maxAbs = rows.slice().sort((a, b) => b.absErr - a.absErr)[0];

out.inverse = {
	maxPerOvr: maxPer,
	worstRelative: { slot: worst.slot, relErr: worst.relErr },
	maxAbsolute: { slot: maxAbs.slot, absErr: maxAbs.absErr },
	quantisedTo5: rows.every((r) => Math.abs(r.got % 5) < 1e-9),
};

if (AS_JSON) {
	console.log(JSON.stringify(out, null, 1));
} else {
	console.log(`build: ${BUILD}`);
	console.log(`init: ${initError ? "threw after export (" + initError.message.slice(0, 60) + ")" : "clean"}`);
	console.log("");
	console.log("slot   w@70    w@80    w@90   perOvr   modelW  defaultW");
	for (const r of out.slots) {
		console.log(
			`${r.slot.padEnd(5)} ${r.w70.toFixed(4).padStart(7)} ${r.w80.toFixed(4).padStart(7)} ${r.w90.toFixed(4).padStart(7)}` +
				` ${r.perOvr.toFixed(5).padStart(8)} ${String(r.modelWeight).padStart(7)} ${String(r.defaultWeight).padStart(9)}`,
		);
	}
	console.log("");
	console.log(`inverse test — ideal = perOvr/max*700, got = round(ideal/5)*5 (floor 5)`);
	console.log(`  every modelWeight is a multiple of 5: ${out.inverse.quantisedTo5}`);
	console.log(`  worst relative error: ${(worst.relErr * 100).toFixed(3)}%  (${worst.slot})`);
	console.log(`  worst absolute error: ${maxAbs.absErr.toFixed(2)}  (${maxAbs.slot})`);
	console.log(`  max perOvr = ${maxPer.toFixed(6)}`);
}
