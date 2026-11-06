// _agents/vloc/deliveries/flex-measure.mjs
// Read-only engine measurement: which positions' players would rather play a different
// (higher-weighted) slot under the Owner's 2026-11-06 final weights, i.e. "flex out"
// of their natural position, with emphasis on early-round (high-OVR) players.
//
// Loads Football-Sim-PreColors.html in headless Chromium, measures the REAL engine
// (FLEX table, NATURAL_SLOT_MAP, POS_SLOT_MAP, slotWins curves, PLAYERS pool),
// temporarily installs the Owner's DEFAULT_WEIGHTS in memory (restored after),
// and reports, per position, the flex destinations that beat the best natural slot,
// the OVR threshold at which the flip happens, and how many roster players would flex.
//
// Never writes or modifies a product file.
//
// usage: NODE_PATH=/Users/kosi/node_modules node _agents/vloc/deliveries/flex-measure.mjs [html]

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const HTML = path.resolve(process.argv[2] || 'Football-Sim-PreColors.html');
const OUT = path.resolve(new URL('.', import.meta.url).pathname, 'flex-measure-2026-11-06.json');

// Owner's final weights, verbatim from the 2026-11-06 directive, mapped to product slot keys.
const OWNER = {
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

function measurePage() {
  // Owner's final weights, verbatim from the 2026-11-06 directive, mapped to product slot keys.
  const ownerTable = { QB: 1000, RB1: 250, RB2: 100, FB: 25,
    WR1: 650, WR2: 400, WR3: 100, WR4: 50,
    TE1: 250, TE2: 150,
    OT1: 500, OT2: 300, OG1: 400, OG2: 250, C: 150,
    DE1: 650, DE2: 300, DT1: 500, DT2: 300, DL5: 150,
    MIKE: 300, WILL: 150, SAM: 100, LB4: 5,
    CB1: 400, CB2: 250, CB3: 100, CB4: 50,
    SS: 300, SS2: 5, FS: 300, FS2: 5,
    K: 50, P: 50 };
  const ownerKeys = Object.keys(ownerTable);

  // Temporarily install Owner defaults so modelWeights()/display reflect them, then restore.
  const savedDefaults = { ...DEFAULT_WEIGHTS };
  ownerKeys.forEach(k => { if (k in DEFAULT_WEIGHTS) DEFAULT_WEIGHTS[k] = ownerTable[k]; });
  const mwWithOwnerDefaults = modelWeights();
  Object.keys(savedDefaults).forEach(k => { DEFAULT_WEIGHTS[k] = savedDefaults[k]; });

  const wpo = slotWinsPerOvr(); // revealed impact, weight-independent on this build

  // ---- per-position flex-out analysis ----
  const byPos = {};
  Object.keys(POS_SLOT_MAP).forEach(pos => {
    const natSlots = (NATURAL_SLOT_MAP[pos] || []).slice();
    const eligible = (POS_SLOT_MAP[pos] || []).slice(); // allowed slots, sorted by penalty asc
    // slot -> penalty (natural = 0)
    const penOf = {};
    eligible.forEach(s => { penOf[s] = flexPenaltyFor(pos, s); });
    // best natural slot (highest owner weight, penalty 0)
    let bestNat = null, bestNatW = -1;
    natSlots.forEach(s => { const w = ownerTable[s] || 0; if (w > bestNatW) { bestNatW = w; bestNat = s; } });
    const WN = bestNatW < 0 ? 0 : bestNatW;

    // flex destinations: eligible, non-natural, allowed (penalty defined)
    const flexDests = eligible.filter(s => !natSlots.includes(s) && penOf[s] != null);

    const destInfo = flexDests.map(s => {
      const WD = ownerTable[s] || 0;
      const P = penOf[s];
      let threshold = null, flips = 'never';
      if (WD > WN) {
        // WD*(o-P) > WN*o  =>  o*(WD-WN) > P*WD  =>  o > P*WD/(WD-WN)
        threshold = P * WD / (WD - WN);
        flips = threshold < 0 ? 'any OVR' : `OVR > ${threshold.toFixed(1)}`;
      } else if (WD === WN && P === 0) {
        flips = 'equal weight, free (indifferent)';
      } else {
        flips = 'never (dest weight <= natural)';
      }
      return { slot: s, fam: SLOT_FAMILY[s] || s, w: WD, pen: P, threshold, flips };
    });
    // only destinations that can ever beat the natural slot (WD > WN)
    const attractors = destInfo.filter(d => d.w > WN);

    // players at this position who would flex, using best-natural vs best-attractor
    const players = PLAYERS.filter(p => p[1] === pos);
    const flexing = players.map(p => {
      const o = p[3];
      const natVal = WN * o;
      let bestFlex = null;
      attractors.forEach(d => {
        const v = d.w * (o - d.pen);
        if (!bestFlex || v > bestFlex.v) bestFlex = { slot: d.slot, v, pen: d.pen, w: d.w, threshold: d.threshold };
      });
      const wouldFlex = bestFlex && bestFlex.v > natVal;
      return { name: p[0], team: p[2], ovr: o, natSlot: bestNat, natW: WN,
               flexSlot: bestFlex ? bestFlex.slot : null, flexW: bestFlex ? bestFlex.w : null,
               flexPen: bestFlex ? bestFlex.pen : null, wouldFlex, gain: bestFlex ? (bestFlex.v - natVal) : 0 };
    });
    const nFlex = flexing.filter(f => f.wouldFlex).length;

    // real-engine cross-check (weight-independent slotWins on this build): does the
    // matchup model itself make the flex destination more valuable than natural?
    const realCheck = flexing.map(f => {
      if (!f.flexSlot) return null;
      const o = f.ovr;
      const realNat = slotWins(f.natSlot, o);
      const realFlex = slotWins(f.flexSlot, Math.max(50, o - f.flexPen));
      return { name: f.name, ovr: o, natSlot: f.natSlot, flexSlot: f.flexSlot,
               realNatWins: +realNat.toFixed(4), realFlexWins: +realFlex.toFixed(4),
               realPrefersFlex: realFlex > realNat };
    }).filter(Boolean);

    byPos[pos] = {
      naturalSlot: bestNat, naturalW: WN,
      attractors: attractors.map(d => ({ slot: d.slot, w: d.w, pen: d.pen, threshold: +d.threshold.toFixed(2) })),
      nPlayers: players.length, nFlex,
      flexPct: players.length ? +(100 * nFlex / players.length).toFixed(1) : 0,
      flexByOVR: { '85+': flexing.filter(f => f.wouldFlex && f.ovr >= 85).length,
                   '80-84': flexing.filter(f => f.wouldFlex && f.ovr >= 80 && f.ovr < 85).length,
                   '75-79': flexing.filter(f => f.wouldFlex && f.ovr >= 75 && f.ovr < 80).length,
                   '<75': flexing.filter(f => f.wouldFlex && f.ovr < 75).length },
      players: flexing.filter(f => f.wouldFlex),
      realCheck: realCheck.slice(0, 12),
      realCheckSummary: realCheck ? { n: realCheck.length, nPrefersFlex: realCheck.filter(r => r.realPrefersFlex).length } : null
    };
  });

  // summary: positions that flex out at all, ranked by how many early-round (85+) players flex
  const summary = Object.entries(byPos)
    .filter(([_, v]) => v.nFlex > 0)
    .map(([pos, v]) => ({ pos, naturalSlot: v.naturalSlot, naturalW: v.naturalW,
                          nFlex: v.nFlex, nFlex85: v.flexByOVR['85+'],
                          attractors: v.attractors.map(a => `${a.slot} w=${a.w} pen=${a.pen} thr>OVR${a.threshold}`).join('; ') }))
    .sort((a, b) => b.nFlex85 - a.nFlex85 || b.nFlex - a.nFlex);

  return { mwWithOwnerDefaults, wpo, byPos, summary, nPositions: Object.keys(byPos).length };
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + HTML);
  await page.waitForFunction(() => typeof POS_SLOT_MAP === 'object' && typeof flexPenaltyFor === 'function', null, { timeout: 60000 });
  const m = await page.evaluate(measurePage);
  await browser.close();

  const result = {
    when: new Date().toISOString(),
    build: HTML,
    weights: 'Owner final 2026-11-06 (QB 1000; WR1/DE1 650; OT1/DT1 500; CB1/SS/FS/MIKE 300; CB 400→WR1 -4 case)',
    nPositions: m.nPositions, pageErrors: errs.length,
    summary: m.summary,
    byPos: m.byPos
  };
  fs.writeFileSync(OUT, JSON.stringify(result, null, 1) + '\n');

  // ---- console report ----
  const pad = (s, n) => String(s).padEnd(n);
  console.log('== FLEX-OUT ANALYSIS: positions whose players prefer a higher-weighted slot ==');
  console.log(`weights basis: Owner final 2026-11-06 table (product slots). Build: ${HTML}`);
  console.log(`positions with any flex-out: ${m.summary.length} of ${m.nPositions}`);
  console.log('\n| position | natural slot (w) | flex-out count | early (85+) | attractor(s): slot w=W pen=P flip-if-OVR>T |');
  console.log('|----------|------------------|----------------|-------------|--------------------------------------------|');
  m.summary.forEach(r => {
    console.log(`| ${pad(r.pos, 8)} | ${pad(r.naturalSlot + ' (' + r.naturalW + ')', 18)} | ${pad(r.nFlex, 14)} | ${pad(r.nFlex85, 11)} | ${r.attractors} |`);
  });
  console.log('\nNote: threshold computed as OVR > pen*destW/(destW-natW). An "85+" flex-out means a starter-calibre player');
  console.log('drafted in roughly the first 10 rounds would rather play the attractor slot. Details in', OUT);
  process.exit(errs.length > 0 ? 3 : 0);
})().catch(e => { console.error(e); process.exit(4); });
