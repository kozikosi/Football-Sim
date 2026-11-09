#!/usr/bin/env node
/**
 * Test script for slotWins local slope measurement with different spreads.
 * Tests ±3, ±5, ±7, ±10 spreads against the current 70→90 method.
 */

import { readFileSync } from "node:fs";
import vm from "node:vm";

const BUILD = "/Users/kosi/Desktop/wt/uk/Football-Sim-PreColors.html";
const html = readFileSync(BUILD, "utf8");
const blocks = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
let script = blocks.sort((a, b) => b.length - a.length)[0];

// In-memory guards for UI code that runs at init with an undefined argument.
const GUARDS = [
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

// Export from inside the script's own scope, immediately after slotWinsPerOvr
const ANCHOR = "return (_wpoCache = out);\n}";
const EXPORT =
    "\n;globalThis.__p={slotWins,slotWinsPerOvr,slotWinsTable,modelWeights,DEFAULT_WEIGHTS,ROSTER_SLOTS,FLEX,NATURAL_SLOT_MAP,PERS,bestUnitPts,teamRatings,matchupModel,WV_OFF_SLOTS,POINTS_PER_WIN,WV_SLOT_GROUP,WV_TAG_GROUP,SLOT_FAMILY,NATURAL_SLOT_MAP,flexRule,isNaturalSlot,flexPenaltyFor,effOvr,OFF_OPTS,DEF_OPTS,DEFAULT_DEF,NEUTRAL_OFF,slotWinsTable,staticReplacement,replacementLevels,PLAYERS,POS_SLOT_MAP,WINS_BASE};";
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

// ============================================================
// POOL POSITION AVERAGES (from madden27-ratings.csv)
// ============================================================
const POOL_AVG = {
    QB: 71.8,
    HB: 76.0,
    WR: 75.5,
    TE: 70.5,
    LT: 75.0,
    RT: 73.0,
    LG: 72.4,
    RG: 73.6,
    C: 71.4,
    DT: 73.9,
    REDG: 74.7,
    LEDG: 75.0,
    MIKE: 73.4,
    WILL: 72.3,
    SAM: 69.0,
    CB: 75.0,
    FS: 73.8,
    SS: 74.6,
    FB: 71.9,
    K: 78.3,
    P: 77.0,
    LS: 68.1,
};

// Map roster slots to pool position tags
const SLOT_TO_POOL_POS = {
    QB: 'QB',
    RB1: 'HB', RB2: 'HB',
    WR1: 'WR', WR2: 'WR', WR3: 'WR',
    TE1: 'TE', TE2: 'TE',
    OT1: 'LT', OT2: 'RT', // Use average of LT/RT
    OG1: 'LG', OG2: 'RG', // Use average of LG/RG
    C: 'C',
    DE1: 'REDG', DE2: 'LEDG', // Use average of REDG/LEDG
    DT1: 'DT', DT2: 'DT',
    MIKE: 'MIKE',
    WILL: 'WILL',
    SAM: 'SAM',
    CB1: 'CB', CB2: 'CB', CB3: 'CB',
    SS: 'SS',
    FS: 'FS',
    K: 'K',
};

// For slots that map to multiple pool positions, use average
function getSlotCenter(slot) {
    const pos = SLOT_TO_POOL_POS[slot];
    if (!pos) return 73.8; // overall average as fallback
    
    // Handle multi-position slots
    if (slot === 'OT1' || slot === 'OT2') {
        return (POOL_AVG.LT + POOL_AVG.RT) / 2; // 74.0
    }
    if (slot === 'OG1' || slot === 'OG2') {
        return (POOL_AVG.LG + POOL_AVG.RG) / 2; // 73.0
    }
    if (slot === 'DE1' || slot === 'DE2') {
        return (POOL_AVG.REDG + POOL_AVG.LEDG) / 2; // 74.85
    }
    return POOL_AVG[pos];
}

// Build base lineup with position-specific averages
function buildPositionSpecificBase() {
    const base = {};
    for (const slot of P.ROSTER_SLOTS) {
        base[slot] = { ovr: getSlotCenter(slot) };
    }
    return base;
}

// Get the position-specific base lineup ratings
const POS_BASE = buildPositionSpecificBase();
const POS_BASE_LG = P.teamRatings(POS_BASE);
const IS_OFF = P.WV_OFF_SLOTS;

// Compute baseline points for position-specific base
const k = 17 / P.POINTS_PER_WIN;
const b0_on = P.bestUnitPts(POS_BASE_LG, POS_BASE_LG, true);
const b0_off = P.bestUnitPts(POS_BASE_LG, POS_BASE_LG, false);
const B0 = { on: b0_on, off: b0_off };

// Compute slotWins at a given OVR for a slot, with everything else at position-specific averages
function slotWinsAt(slot, ovr) {
    const sm = Object.assign({}, POS_BASE);
    sm[slot] = { ovr };
    const lg = P.teamRatings(sm);
    const isOff = IS_OFF.has(slot);
    return (P.bestUnitPts(lg, POS_BASE_LG, isOff) - (isOff ? B0.on : B0.off)) * k;
}

// Compute local slope at center ± spread/2
function computeLocalSlope(slot, spread) {
    const center = getSlotCenter(slot);
    const half = spread / 2;
    const low = center - half;
    const high = center + half;
    const wLow = slotWinsAt(slot, low);
    const wHigh = slotWinsAt(slot, high);
    return (wHigh - wLow) / spread;
}

// Current method: 70→90 spread (20 points), everything else at 80
function currentSlope(slot) {
    return (P.slotWins(slot, 90) - P.slotWins(slot, 70)) / 20;
}

// ============================================================
// RUN TESTS
// ============================================================
const SPREADS = [3, 5, 7, 10];

console.log("=".repeat(120));
console.log("SLOT WINS LOCAL SLOPE MEASUREMENT — SPREAD COMPARISON");
console.log("=".repeat(120));
console.log("Current method: 70→90 (20-point spread), all other slots at 80");
console.log("New method: per-position center ± spread/2, all other slots at their position averages");
console.log("");

// Print headers
let header = "Slot".padEnd(6) + "Center".padEnd(8) + "Current".padEnd(10);
for (const s of SPREADS) {
    header += `±${(s/2).toFixed(0)} (${s})`.padEnd(12);
}
console.log(header);
console.log("-".repeat(120));

const results = {};

for (const slot of P.ROSTER_SLOTS) {
    const center = getSlotCenter(slot);
    const curr = currentSlope(slot);
    const row = { slot, center, current: curr, spreads: {} };
    
    let line = slot.padEnd(6) + center.toFixed(1).padEnd(8) + curr.toFixed(5).padEnd(10);
    
    for (const s of SPREADS) {
        const slope = computeLocalSlope(slot, s);
        row.spreads[s] = slope;
        line += slope.toFixed(5).padEnd(12);
    }
    console.log(line);
    results[slot] = row;
}

console.log("");
console.log("=".repeat(120));
console.log("ANALYSIS: Which slots move most between spreads?");
console.log("=".repeat(120));

// Analyze variation across spreads
for (const slot of P.ROSTER_SLOTS) {
    const slopes = SPREADS.map(s => results[slot].spreads[s]);
    const min = Math.min(...slopes);
    const max = Math.max(...slopes);
    const range = max - min;
    const cv = range / ((min + max) / 2); // coefficient of variation relative to mean
    results[slot].range = range;
    results[slot].cv = cv;
}

// Sort by range (most variation first)
const sortedByRange = P.ROSTER_SLOTS.slice().sort((a, b) => results[b].range - results[a].range);

console.log("\nSlots with most variation across spreads (range = max - min slope):");
console.log("Slot".padEnd(6) + "Range".padEnd(10) + "CV%".padEnd(8) + "Slopes (±3,±5,±7,±10)");
for (const slot of sortedByRange.slice(0, 10)) {
    const r = results[slot];
    const slopes = SPREADS.map(s => r.spreads[s].toFixed(5)).join(", ");
    console.log(`${slot.padEnd(6)} ${r.range.toFixed(5).padEnd(10)} ${(r.cv*100).toFixed(1).padEnd(8)} ${slopes}`);
}

console.log("\nSlots with least variation across spreads:");
for (const slot of sortedByRange.slice(-5)) {
    const r = results[slot];
    const slopes = SPREADS.map(s => r.spreads[s].toFixed(5)).join(", ");
    console.log(`${slot.padEnd(6)} ${r.range.toFixed(5).padEnd(10)} ${(r.cv*100).toFixed(1).padEnd(8)} ${slopes}`);
}

console.log("\n" + "=".repeat(120));
console.log("COMPARISON: Current (70→90) vs New (±5 spread)");
console.log("=".repeat(120));

console.log("Slot".padEnd(6) + "Current".padEnd(12) + "New(±5)".padEnd(12) + "Diff".padEnd(12) + "%Diff".padEnd(10) + "Center");
for (const slot of P.ROSTER_SLOTS) {
    const r = results[slot];
    const curr = r.current;
    const new5 = r.spreads[5];
    const diff = new5 - curr;
    const pctDiff = curr !== 0 ? (diff / Math.abs(curr)) * 100 : 0;
    console.log(`${slot.padEnd(6)} ${curr.toFixed(5).padEnd(12)} ${new5.toFixed(5).padEnd(12)} ${diff.toFixed(5).padEnd(12)} ${pctDiff.toFixed(1).padEnd(10)} ${r.center.toFixed(1)}`);
}

console.log("\n" + "=".repeat(120));
console.log("NON-LINEARITY CHECK: ±5 vs ±10 spread (should be similar if linear)");
console.log("=".repeat(120));

console.log("Slot".padEnd(6) + "±5".padEnd(12) + "±10".padEnd(12) + "Diff".padEnd(12) + "%Diff");
for (const slot of P.ROSTER_SLOTS) {
    const s5 = results[slot].spreads[5];
    const s10 = results[slot].spreads[10];
    const diff = s10 - s5;
    const pctDiff = s5 !== 0 ? (diff / Math.abs(s5)) * 100 : 0;
    console.log(`${slot.padEnd(6)} ${s5.toFixed(5).padEnd(12)} ${s10.toFixed(5).padEnd(12)} ${diff.toFixed(5).padEnd(12)} ${pctDiff.toFixed(1)}%`);
}

// Check D rules impact
console.log("\n" + "=".repeat(120));
console.log("D-RULES IMPACT (thetaprice's 4 proposed + 12 below-D rules)");
console.log("=".repeat(120));
// The D rules use slotWinsPerOvr for position comparisons
// Let's see how the ranking of slots changes

function getSlotRanking(slopeObj) {
    const arr = P.ROSTER_SLOTS.map(s => ({ slot: s, slope: slopeObj[s] }));
    arr.sort((a, b) => b.slope - a.slope);
    return arr.map((x, i) => ({ slot: x.slot, rank: i + 1, slope: x.slope }));
}

const currentRanking = getSlotRanking(Object.fromEntries(P.ROSTER_SLOTS.map(s => [s, results[s].current])));
const new5Ranking = getSlotRanking(Object.fromEntries(P.ROSTER_SLOTS.map(s => [s, results[s].spreads[5]])));

console.log("Slot".padEnd(6) + "CurrRank".padEnd(10) + "NewRank".padEnd(10) + "RankΔ".padEnd(8) + "CurrSlope".padEnd(12) + "NewSlope");
for (const cr of currentRanking) {
    const nr = new5Ranking.find(x => x.slot === cr.slot);
    const rankDelta = nr.rank - cr.rank;
    console.log(`${cr.slot.padEnd(6)} ${String(cr.rank).padEnd(10)} ${String(nr.rank).padEnd(10)} ${String(rankDelta).padEnd(8)} ${cr.slope.toFixed(5).padEnd(12)} ${nr.slope.toFixed(5)}`);
}

// Check rank inversions
console.log("\nRank inversions (slots that swap order):");
for (let i = 0; i < currentRanking.length - 1; i++) {
    for (let j = i + 1; j < currentRanking.length; j++) {
        const a = currentRanking[i].slot;
        const b = currentRanking[j].slot;
        const currOrder = results[a].current > results[b].current ? 1 : -1;
        const newOrder = results[a].spreads[5] > results[b].spreads[5] ? 1 : -1;
        if (currOrder !== newOrder) {
            console.log(`  ${a} vs ${b}: current ${results[a].current.toFixed(5)} > ${results[b].current.toFixed(5)}? ${currOrder===1}, new ${results[a].spreads[5].toFixed(5)} > ${results[b].spreads[5].toFixed(5)}? ${newOrder===1}`);
        }
    }
}

console.log("\n" + "=".repeat(120));
console.log("VORP VARIANT: Value Over Replacement (slotWins at center - slotWins at replacement)");
console.log("=".repeat(120));

// Compute static replacement levels (from the build's staticReplacement function)
const staticRepl = P.staticReplacement();
// Map slot to replacement group
const SLOT_TO_REPL_GROUP = P.WV_SLOT_GROUP;

console.log("Slot".padEnd(6) + "Center".padEnd(8) + "ReplGrp".padEnd(8) + "ReplOVR".padEnd(8) + "SlotWins(Center)".padEnd(16) + "SlotWins(Repl)".padEnd(14) + "VORP");
for (const slot of P.ROSTER_SLOTS) {
    const center = getSlotCenter(slot);
    const grp = SLOT_TO_REPL_GROUP[slot];
    const replOvr = staticRepl[grp] || 70;
    const wCenter = slotWinsAt(slot, center);
    const wRepl = slotWinsAt(slot, replOvr);
    const vorp = wCenter - wRepl;
    console.log(`${slot.padEnd(6)} ${center.toFixed(1).padEnd(8)} ${grp.padEnd(8)} ${String(replOvr).padEnd(8)} ${wCenter.toFixed(4).padEnd(16)} ${wRepl.toFixed(4).padEnd(14)} ${vorp.toFixed(4)}`);
}

console.log("\n" + "=".repeat(120));
console.log("RECOMMENDATION");
console.log("=".repeat(120));

// Analyze stability: compute average CV across all slots for each spread
console.log("\nStability analysis (average CV across all slots):");
for (const s of SPREADS) {
    const cvs = P.ROSTER_SLOTS.map(slot => {
        const slopes = SPREADS.map(sp => results[slot].spreads[sp]);
        // This is wrong - we need CV across spreads for each slot
        return null;
    });
}

// Better: for each slot, compute how much its slope changes when spread changes
// We want to know if the spread choice matters materially
const spreadChoices = [3, 5, 7, 10];
const spreadLabels = ['±1.5(3)', '±2.5(5)', '±3.5(7)', '±5(10)'];

console.log("\nFor each slot, slope at different spreads:");
console.log("Slot".padEnd(6), ...spreadLabels.map(l => l.padEnd(12)));
for (const slot of P.ROSTER_SLOTS) {
    let line = slot.padEnd(6);
    for (const s of spreadChoices) {
        line += results[slot].spreads[s].toFixed(5).padEnd(12);
    }
    console.log(line);
}

// Materiality threshold: does spread change D rules or weights?
// D rules use relative slopes between positions
// Weights are quantized from slotWinsPerOvr

console.log("\n" + "=".repeat(120));
console.log("WEIGHTS IMPACT: How would modelWeights change?");
console.log("=".repeat(120));

function computeWeights(slopeObj) {
    const maxSlope = Math.max(...P.ROSTER_SLOTS.map(s => Math.abs(slopeObj[s])));
    const weights = {};
    for (const slot of P.ROSTER_SLOTS) {
        const ideal = (Math.abs(slopeObj[slot]) / maxSlope) * 700;
        const quantized = Math.max(5, Math.round(ideal / 5) * 5);
        weights[slot] = quantized;
    }
    return weights;
}

const currentWeights = computeWeights(Object.fromEntries(P.ROSTER_SLOTS.map(s => [s, results[s].current])));
const new5Weights = computeWeights(Object.fromEntries(P.ROSTER_SLOTS.map(s => [s, results[s].spreads[5]])));

console.log("Slot".padEnd(6) + "CurrWt".padEnd(8) + "New5Wt".padEnd(8) + "ΔWt".padEnd(8) + "CurrRank".padEnd(10) + "NewRank");
const currWtRank = P.ROSTER_SLOTS.slice().sort((a,b) => currentWeights[b] - currentWeights[a]);
const new5WtRank = P.ROSTER_SLOTS.slice().sort((a,b) => new5Weights[b] - new5Weights[a]);
const currWtRankMap = Object.fromEntries(currWtRank.map((s,i) => [s, i+1]));
const new5WtRankMap = Object.fromEntries(new5WtRank.map((s,i) => [s, i+1]));

for (const slot of P.ROSTER_SLOTS) {
    const dw = new5Weights[slot] - currentWeights[slot];
    console.log(`${slot.padEnd(6)} ${String(currentWeights[slot]).padEnd(8)} ${String(new5Weights[slot]).padEnd(8)} ${String(dw).padEnd(8)} ${String(currWtRankMap[slot]).padEnd(10)} ${new5WtRankMap[slot]}`);
}

const weightChanges = P.ROSTER_SLOTS.filter(s => currentWeights[s] !== new5Weights[s]);
console.log(`\nSlots with weight changes: ${weightChanges.length}/26`);
if (weightChanges.length > 0) {
    console.log("Changed slots:", weightChanges.join(", "));
}

console.log("\n" + "=".repeat(120));
console.log("SUMMARY & RECOMMENDATION");
console.log("=".repeat(120));