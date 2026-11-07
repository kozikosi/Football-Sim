// _agents/vloc/deliveries/flexcap.mjs
//
// Configurable testing apparatus: "if I change one position weight (or flex penalty),
// what are the downstream effects on which 85+ OVR players play out of position?"
//
// Loads Football-Sim-PreColors.html in headless Chromium against the REAL engine:
//   - installs a configurable DEFAULT_WEIGHTS table in memory (restored after)
//   - applies a configurable flex-penalty transform to the engine's flexRule (default:
//     cap at 10: every 6 -> 10, every 12 -> 10; leave 0/2/4/10)
//   - reports every player who would rather play a non-natural slot than his best
//     natural slot, with emphasis on 85+ OVR (early-round/star) players
//   - ITERATIVE mode (node-driven loop): starting from a base weights table, repeatedly
//     raises the natural position weight of any position that still has 85+ flex-outs,
//     in increments of 50, until no 85+ player flexes out; reports residual cases that
//     cannot be fixed without moving an upper anchor weight.
//
// Never writes or modifies a product file. All numbers come from the live engine.
//
// usage: NODE_PATH=/Users/kosi/node_modules node flexcap.mjs [html] [mode]
//   mode: baseline | iterate   (default baseline)
//   --weights <json>   optional weights table (slot->weight); default = Owner's final table
// outputs: _agents/vloc/deliveries/flexcap-<mode>-<ISO>.json

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const HTML = path.resolve(process.argv[2] || 'Football-Sim-PreColors.html');
const MODE = (process.argv[3] || 'baseline').toLowerCase();
const WEIGHTS_ARG = process.argv.includes('--weights')
  ? process.argv[process.argv.indexOf('--weights') + 1]
  : null;
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);
const OUT = path.resolve(
  new URL('.', import.meta.url).pathname,
  `flexcap-${MODE}-${stamp}.json`
);

// ---- Owner's final weights (2026-11-06 directive), mapped to product slot keys ----
const OWNER_WEIGHTS = {
  QB: 1000, RB1: 250, RB2: 100, FB: 25,
  WR1: 650, WR2: 400, WR3: 100, WR4: 50,
  TE1: 250, TE2: 150,
  OT1: 500, OT2: 300, OG1: 400, OG2: 250, C: 150,
  DE1: 650, DE2: 300, DT1: 500, DT2: 300, DL5: 150,
  MIKE: 300, WILL: 150, SAM: 100, LB4: 5,
  CB1: 400, CB2: 250, CB3: 100, CB4: 50,
  SS: 300, SS2: 5, FS: 300, FS2: 5,
  K: 50, P: 50
};

// slots the Owner treats as upper anchors: never raised in iterative mode.
const UPPER_ANCHORS = new Set(['QB', 'WR1', 'DE1', 'OT1']);

// node-side replica of NATURAL_SLOT_MAP (position tag -> natural slots) to pick the
// slot weight to raise for each position tag during iteration.
const NATURAL_SLOTS_NODE = {
  QB: ['QB'], HB: ['RB1', 'RB2'], WR: ['WR1', 'WR2', 'WR3'], TE: ['TE1', 'TE2'],
  LT: ['OT1', 'OT2'], RT: ['OT1', 'OT2'], LG: ['OG1', 'OG2'], RG: ['OG1', 'OG2'], C: ['C'],
  DT: ['DT1', 'DT2'], REDG: ['DE1', 'DE2'], LEDG: ['DE1', 'DE2'],
  MIKE: ['MIKE', 'WILL', 'SAM'], WILL: ['WILL', 'MIKE', 'SAM'], SAM: ['SAM', 'MIKE', 'WILL'],
  CB: ['CB1', 'CB2', 'CB3'], SS: ['SS'], FS: ['FS'], K: ['K']
};
function bestNaturalSlotNode(pos, weights) {
  const nat = NATURAL_SLOTS_NODE[pos] || [];
  if (!nat.length) return null;
  return nat.reduce((b, s) => (weights[s] || 0) > (weights[b] || 0) ? s : b, nat[0]);
}

// ---- in-page measurement (self-contained: page globals + params only) ----
function measurePage(cfg) {
  const configWeights = cfg.weights;
  const flexCap = cfg.flexCap;
  // snapshot base penalties from the REAL engine flexRule for every eligible (pos, slot)
  const basePen = {}; // basePen[pos][slot] = penalty or null
  Object.keys(POS_SLOT_MAP).forEach(pos => {
    basePen[pos] = {};
    (POS_SLOT_MAP[pos] || []).forEach(s => {
      basePen[pos][s] = flexRule(pos, s);
    });
  });
  // apply transform: cap at flexCap (6->10, 12->10; leave 0/2/4 and <= cap).
  const capPen = {};
  Object.keys(basePen).forEach(pos => {
    capPen[pos] = {};
    Object.keys(basePen[pos]).forEach(s => {
      const p = basePen[pos][s];
      // Owner directive: 6 -> 10 and 12 -> 10; leave 0/2/4 and existing 10 as-is.
      capPen[pos][s] = p == null ? null : (p === 6 || p === 12 ? flexCap : p);
    });
  });

  const w = configWeights;
  const byPos = {};
  Object.keys(POS_SLOT_MAP).forEach(pos => {
    const natSlots = (NATURAL_SLOT_MAP[pos] || []).slice();
    const eligible = (POS_SLOT_MAP[pos] || []).slice();
    let bestNat = null, bestNatW = -1;
    natSlots.forEach(s => { const weight = w[s] || 0; if (weight > bestNatW) { bestNatW = weight; bestNat = s; } });
    const WN = bestNatW < 0 ? 0 : bestNatW;

    const flexDests = eligible.filter(s => !natSlots.includes(s) && capPen[pos][s] != null);
    const attractors = flexDests.map(s => {
      const WD = w[s] || 0;
      const P = capPen[pos][s];
      let threshold = null, flips = 'never';
      if (WD > WN) {
        threshold = P * WD / (WD - WN);
        flips = threshold < 0 ? 'any OVR' : `OVR > ${threshold.toFixed(1)}`;
      } else if (WD === WN && P === 0) {
        flips = 'equal weight, free (indifferent)';
      } else {
        flips = 'never (dest weight <= natural)';
      }
      return { slot: s, w: WD, pen: P, threshold, flips };
    });
    const liveAttractors = attractors.filter(a => a.w > WN);

    const players = PLAYERS.filter(p => p[1] === pos);
    const flexing = players.map(p => {
      const o = p[3];
      const natVal = WN * o;
      let bestFlex = null;
      liveAttractors.forEach(a => {
        const v = a.w * Math.max(0, o - a.pen);
        if (!bestFlex || v > bestFlex.v) bestFlex = { slot: a.slot, v, pen: a.pen, w: a.w };
      });
      const wouldFlex = bestFlex && bestFlex.v > natVal;
      let minWn = null;
      if (bestFlex && wouldFlex) {
        minWn = bestFlex.w * (o - bestFlex.pen) / o;
      }
      return {
        name: p[0], team: p[2], ovr: o, natSlot: bestNat, natW: WN,
        flexSlot: bestFlex ? bestFlex.slot : null, flexW: bestFlex ? bestFlex.w : null,
        flexPen: bestFlex ? bestFlex.pen : null, wouldFlex, minWn,
        gain: bestFlex ? +(bestFlex.v - natVal).toFixed(2) : 0
      };
    });
    const violations = flexing.filter(f => f.wouldFlex);
    const violations85 = violations.filter(f => f.ovr >= 85);

    byPos[pos] = {
      naturalSlot: bestNat, naturalW: WN,
      nPlayers: players.length, nFlex: violations.length, nFlex85: violations85.length,
      flexByOVR: {
        '85+': violations85.length,
        '80-84': violations.filter(f => f.ovr >= 80 && f.ovr < 85).length,
        '75-79': violations.filter(f => f.ovr >= 75 && f.ovr < 80).length,
        '<75': violations.filter(f => f.ovr < 75).length
      },
      attractors: liveAttractors.map(a => ({ slot: a.slot, w: a.w, pen: a.pen })),
      players: violations.map(f => ({
        name: f.name, team: f.team, ovr: f.ovr, flexSlot: f.flexSlot, flexW: f.flexW,
        flexPen: f.flexPen, minWn: f.minWn == null ? null : +f.minWn.toFixed(2),
        gain: f.gain
      })),
      violations85: violations85.map(f => ({
        name: f.name, team: f.team, ovr: f.ovr, flexSlot: f.flexSlot, flexW: f.flexW,
        flexPen: f.flexPen, minWn: f.minWn == null ? null : +f.minWn.toFixed(2),
        gain: f.gain
      }))
    };
  });

  const summary = Object.entries(byPos)
    .filter(([_, v]) => v.nFlex85 > 0)
    .map(([pos, v]) => {
      const req = Math.max(...v.players.map(f => f.minWn).filter(x => x != null), 0);
      return { pos, naturalSlot: v.naturalSlot, naturalW: v.naturalW, nFlex: v.nFlex, nFlex85: v.nFlex85,
        requiredMinNaturalW: +req.toFixed(2),
        attractors: v.attractors.map(a => `${a.slot} w=${a.w} pen=${a.pen}`).join('; ') };
    })
    .sort((a, b) => b.nFlex85 - a.nFlex85 || b.nFlex - a.nFlex);

  return { byPos, summary, nPositions: Object.keys(byPos).length };
}

// ---- iterative: raise lower natural weights by +50 until no 85+ flex-outs ----
async function iterateWeights(page, startWeights, flexCap, maxRounds = 40) {
  const weights = { ...startWeights };
  const rounds = [];
  let stuck = false;
  for (let round = 0; round < maxRounds; round++) {
    const m = await page.evaluate(measurePage, { weights, flexCap });
    rounds.push({ round, weights: { ...weights }, summary: m.summary });
    if (m.summary.length === 0) break;
    let changed = false;
    m.summary.forEach(({ pos, requiredMinNaturalW }) => {
      const natSlot = bestNaturalSlotNode(pos, weights);
      if (!natSlot || UPPER_ANCHORS.has(natSlot)) return;
      const required = Math.max(requiredMinNaturalW, weights[natSlot] || 0);
      const target = Math.ceil(required / 50) * 50;      // smallest 50-multiple >= required
      const next = target > required ? target : target + 50; // strictly exceed required
      if (next > weights[natSlot]) {
        weights[natSlot] = next;
        changed = true;
      }
    });
    if (!changed) { stuck = true; break; }
  }
  const final = await page.evaluate(measurePage, { weights, flexCap });
  return { weights, rounds, final, stuck };
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + HTML);
  await page.waitForFunction(() => typeof POS_SLOT_MAP === 'object' && typeof flexRule === 'function', null, { timeout: 60000 });

  let result;
  if (MODE === 'iterate') {
    const start = WEIGHTS_ARG ? JSON.parse(fs.readFileSync(path.resolve(WEIGHTS_ARG), 'utf8')) : OWNER_WEIGHTS;
    const it = await iterateWeights(page, start, 10);
    result = { mode: 'iterate', startWeights: start, ...it };
  } else {
    const w = WEIGHTS_ARG ? JSON.parse(fs.readFileSync(path.resolve(WEIGHTS_ARG), 'utf8')) : OWNER_WEIGHTS;
    const m = await page.evaluate(measurePage, { weights: w, flexCap: 10 });
    result = { mode: 'baseline', weights: w, byPos: m.byPos, summary: m.summary, nPositions: m.nPositions };
  }

  result.when = stamp;
  result.build = HTML;
  result.flexCap = 10;
  result.pageErrors = errs.length;
  fs.writeFileSync(OUT, JSON.stringify(result, null, 1) + '\n');

  console.log(`== FLEXCAP ${MODE.toUpperCase()} (flex cap 10; Owner base weights) ==`);
  console.log(`build: ${HTML} | page errors: ${errs.length}`);
  if (MODE === 'iterate') {
    console.log('rounds:', result.rounds.length, '| stuck:', result.stuck);
    console.log('final weights:');
    Object.entries(result.weights).forEach(([k, v]) => console.log(`  ${k.padEnd(5)}: ${v}`));
    console.log(`residual 85+ flex-out positions: ${result.final.summary.length}`);
    result.final.summary.forEach(r => {
      console.log(`  ${r.pos.padEnd(6)} nat=${r.naturalSlot.padEnd(5)} w=${String(r.naturalW).padEnd(4)} 85+=${String(r.nFlex85).padEnd(4)} needNatW>${r.requiredMinNaturalW} | ${r.attractors}`);
    });
    if (result.final.summary.length === 0) {
      console.log('NO 85+ flex-outs remain — all stars prefer their natural slot.');
    } else {
      console.log('RESIDUAL cases remain — need the Owner call (raise an upper anchor or accept the flex).');
    }
  } else {
    console.log(`positions with 85+ flex-outs: ${result.summary.length}`);
    result.summary.forEach(r => {
      console.log(`  ${r.pos.padEnd(6)} nat=${r.naturalSlot.padEnd(5)} w=${String(r.naturalW).padEnd(4)} 85+=${String(r.nFlex85).padEnd(4)} needNatW>${r.requiredMinNaturalW} | ${r.attractors}`);
    });
  }
  console.log(`evidence: ${OUT}`);
  await browser.close();
  process.exit(errs.length > 0 ? 3 : 0);
})().catch(e => { console.error(e); process.exit(4); });
