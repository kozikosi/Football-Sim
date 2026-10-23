#!/usr/bin/env node
/**
 * ln2-probe.mjs — is `PERS['11'].runB/passB = Math.LN2` a sign error?
 *
 * Method: load the real build, export its own `matchupModel` (no copy, no
 * reimplementation), then run one fixed fixture under several coefficient arms.
 * The fixture is an all-80 team against an all-80 league, so every unit delta is
 * zero and the ONLY thing that differs between arms is the personnel term.
 *
 * Read-only. Run: node _agents/ds/tools/ln2-probe.mjs <build.html>
 */
import { readFileSync } from "node:fs";
import vm from "node:vm";

const BUILD = process.argv[2] || "_agents/pickle/builds/Football-Sim-PreColors.html";
const html = readFileSync(BUILD, "utf8");

// Largest <script> block = the application.
const blocks = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const script = blocks.sort((a, b) => b.length - a.length)[0];

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
	globalThis: null,
	localStorage: stub,
	navigator: stub,
	MutationObserver: stub,
	requestAnimationFrame: stub,
	alert: () => {},
	confirm: () => true,
};
ctx.globalThis = ctx;
vm.createContext(ctx);

// Export the lexically-scoped model objects, which are `const` and so do not
// land on the context object. Appending inside the same script sees them.
const EXPORT =
	";globalThis.__p={PERS,matchupModel,PLAN_K,STRAT,DEF_FOCUS,RUSH_BASE,PASS_BASE,BASE_PTS,PT_RUSH,PT_PASS};";

// The document's init code needs a DOM and throws. The model does not: slice the
// contiguous model region — clampNum through the end of matchupModel — which is
// self-contained and pure.
const start = script.indexOf("function clampNum");
const end = script.indexOf("function quarterTotals(");
if (start < 0 || end < 0 || end <= start) {
	console.error("model region not found");
	process.exit(2);
}
const model = script.slice(start, end);

try {
	vm.runInContext(model + EXPORT, ctx, { timeout: 30000 });
} catch (e) {
	console.error("model did not load:", e.message);
	process.exit(2);
}
const P = ctx.__p;
if (!P) {
	console.error("probe export missing");
	process.exit(2);
}

const unit = 80;
const team = {
	qb: unit,
	rb: unit,
	olRun: unit,
	olPass: unit,
	rec: unit,
	kicker: unit,
	ret: 82,
	te1: unit,
	te2: unit,
	rbHeavy: unit,
	rec11: unit,
	rec12: unit,
	rec13: unit,
	rec21: unit,
	rec22: unit,
	frontBase: unit,
	frontNick: unit,
	covBase: unit,
	covNick: unit,
	passRush: unit,
};
const lg = { ...team };
const plan = { off: { pers: "11", strat: "neutral" }, def: { pkg: "nickel", focus: "neutral" } };

const arms = [
	{ name: "A  Pre-Colors (anchor)", runB: 0.0, passB: 0.0 },
	{ name: "B  drift 044d1759", runB: Math.LN2, passB: Math.LN2 },
	{ name: "C  MOC proposal", runB: 0.07, passB: -0.035 },
	{ name: "D  run-only, pass neutral", runB: 0.07, passB: 0.0 },
	{ name: "E  sign flipped", runB: -0.07, passB: 0.035 },
];

const base = { ...P.PERS["11"] };
const rows = [];
for (const a of arms) {
	P.PERS["11"].runB = a.runB;
	P.PERS["11"].passB = a.passB;
	const m = P.matchupModel(team, team, lg, plan);
	rows.push({
		arm: a.name,
		runB: a.runB,
		passB: a.passB,
		expRush: m.expRush,
		expPass: m.expPass,
		passShare: m.expPass / (m.expRush + m.expPass),
		structPts: m.structPts,
		lamTO: m.lamTO,
		lamSack: m.lamSack,
	});
}
P.PERS["11"].runB = base.runB;
P.PERS["11"].passB = base.passB;

const b = rows[0];
console.log(`build: ${BUILD}`);
console.log(`11 personnel in this build: runB=${base.runB} passB=${base.passB}`);
console.log("");
console.log("arm                        runB     passB    rushYd   passYd  pass%   pts    vs A");
for (const r of rows) {
	console.log(
		`${r.arm.padEnd(26)} ${r.runB.toFixed(3).padStart(6)} ${r.passB.toFixed(3).padStart(8)}` +
			` ${r.expRush.toFixed(1).padStart(8)} ${r.expPass.toFixed(1).padStart(8)}` +
			` ${(r.passShare * 100).toFixed(2).padStart(6)} ${r.structPts.toFixed(2).padStart(6)}` +
			` ${(r.structPts - b.structPts >= 0 ? "+" : "") + (r.structPts - b.structPts).toFixed(2)}`,
	);
}
console.log("");
console.log("sibling terms (from the build):");
for (const k of ["11", "12", "13", "21", "22"]) {
	console.log(
		`  ${k}: runB=${P.PERS[k].runB.toFixed(3)} passB=${P.PERS[k].passB.toFixed(3)} run=${P.PERS[k].run.toFixed(2)} pc=${P.PERS[k].pc}`,
	);
}
console.log("");
console.log(`exp(ln2) = ${Math.exp(Math.LN2).toFixed(6)}`);
console.log(`softCap bounds: rush hi=${0.42} pass hi=${0.29}`);
