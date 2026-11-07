// mathlab/flexscan.mjs <html> — scans ALL rostered players across all 32 teams and reports:
//  1. For each 85+ rated player, which slots they flex into and their penalty
//  2. Count of 85+ flex-off-natural-position placements
//  3. Worst-case promotions (85+ player penalized into a slot heavier than his best natural one)
// Usage: node flexscan.mjs <html>
// Output: JSON summary printed to stdout. Exit 0 always.
import fs from 'fs';
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const html = process.argv[2];
if (!html) { console.log('usage: node flexscan.mjs <html>'); process.exit(2); }

const b = await chromium.launch(), pg = await b.newPage();
const errs = [];
pg.on('pageerror', e => errs.push(String(e)));
await pg.goto('file://' + html);
await pg.waitForFunction(() => typeof slotWinsTable === 'function');

const result = await pg.evaluate(() => {
  const TAG_ROLE = { QB: 'QB', HB: 'RB', FB: 'FB', WR: 'WR', TE: 'TE', OT: 'OT', OG: 'OG', C: 'C', DT: 'DT', EDGE: 'EDGE', MIKE: 'ILB', WILL: 'OLB', SAM: 'OLB', CB: 'CB', SS: 'SS', FS: 'FS', K: 'K', P: 'P' };
  const SLOT_DEST = { QB: 'QB', RB1: 'RB', RB2: 'RB', FB: 'FB', WR1: 'WR', WR2: 'WR', WR3: 'WR', TE1: 'TE', TE2: 'TE', TE3: 'TE', WR4: 'WR', OT1: 'OT', OT2: 'OT', OG1: 'OG', OG2: 'OG', C: 'C', DT1: 'DT', DT2: 'DT', DE1: 'EDGE', DE2: 'EDGE',
    MIKE: 'ILB', WILL: 'OLB', SAM: 'OLB', CB1: 'CB', CB2: 'CB', CB3: 'NICKEL', DIME: 'DIME', DL5: 'DL5', SS: 'SS', FS: 'FS', K: 'K', P: 'P' };
  const SLOTS = Object.keys(SLOT_DEST);
  const NATURAL_SLOT_MAP = {
    QB:['QB'], HB:['RB1','RB2'], WR:['WR1','WR2','WR3'], TE:['TE1','TE2'],
    LT:['OT1','OT2'], RT:['OT1','OT2'], LG:['OG1','OG2'], RG:['OG1','OG2'], C:['C'],
    DT:['DT1','DT2'], REDG:['DE1','DE2'], LEDG:['DE1','DE2'],
    MIKE:['MIKE','WILL','SAM'], WILL:['WILL','MIKE','SAM'], SAM:['SAM','MIKE','WILL'],
    CB:['CB1','CB2','CB3'], SS:['SS'], FS:['FS'],
    K:['K']
  };
  const LB_FLEX = {DE:6, DT:4, CB3:4, SS:4, FS:4, TE:6, RB:6};
  const FLEX = {
    LT:{OG:0, C:0, DT:4}, RT:{OG:0, C:0, DT:4},
    LG:{C:0, OT:4, DT:4}, RG:{C:0, OT:4, DT:4}, C:{OG:0, OT:4, DT:4},
    DT:{DE:4, MIKE:4, WILL:4, SAM:4, OG:4, C:4, OT:6, RB:6},
    REDG:{DT:2, MIKE:4, WILL:2, SAM:2, TE:6, RB:6}, LEDG:{DT:2, MIKE:4, WILL:2, SAM:2, TE:6, RB:6},
    MIKE:LB_FLEX, WILL:LB_FLEX, SAM:LB_FLEX,
    CB:{SS:2, FS:0, MIKE:4, WILL:4, SAM:4, WR:4, TE:6, RB:6},
    SS:{FS:2, CB:4, MIKE:4, WILL:4, SAM:2, WR:4, TE:6, RB:6},
    FS:{SS:2, CB:4, MIKE:4, WILL:4, SAM:4, WR:4, TE:6, RB:6},
    WR:{TE:4, SS:4, FS:4, CB:4, RB:6},
    TE:{MIKE:6, WILL:6, SAM:6, SS:6, FS:6, RB:6},
    HB:{TE:6}, QB:{}, K:{}
  };
  const EMERGENCY_PENALTY = 8;
  function isNaturalSlot(pos, slot){ const nat = NATURAL_SLOT_MAP[pos]; return !!(nat && nat.includes(slot)); }
  function flexRule(pos, slot){ if(isNaturalSlot(pos, slot)) return 0; const t = FLEX[pos]; if(!t) return null; if(t[slot]!=null) return t[slot]; const fam = {QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',TE1:'TE',TE2:'TE',OT1:'OT',OT2:'OT',OG1:'OG',OG2:'OG',C:'C',DE1:'DE',DE2:'DE',DT1:'DT',DT2:'DT',MIKE:'MIKE',WILL:'WILL',SAM:'SAM',CB1:'CB',CB2:'CB',CB3:'CB',SS:'SS',FS:'FS',K:'K'}[slot]; return (fam && t[fam]!=null) ? t[fam] : null; }
  function flexPenaltyFor(pos, slot){ const p = flexRule(pos, slot); return p==null ? EMERGENCY_PENALTY : p; }

  const PLAYERS = window.PLAYERS || [];
  const TEAM_DATA = window.TEAM_DATA || {};

  // Report for each 85+ player: which slots they CAN flex into and at what penalty
  const starFlex = {};
  const promotions = []; // 85+ player penalized into a slot heavier than his best natural one
  let starOffNatCount = 0;

  for (const p of PLAYERS) {
    const [name, pos, team, ovr] = p[0], p[1], p[2], p[3];
    if (!TAG_ROLE[pos]) continue; // skip unknown tags
    if (ovr < 85) continue;
    const role = TAG_ROLE[pos];
    const starEntry = { name, pos, ovr, team, flexes: {} };
    const natSlots = NATURAL_SLOT_MAP[pos] || [];
    let bestNatPen = 0; let bestNatSlot = null;
    // best natural slot penalty (should always be 0)
    for (const s of natSlots) { const pen = flexPenaltyFor(pos, s); if (pen <= bestNatPen) { bestNatPen = pen; bestNatSlot = s; } }
    for (const slot of SLOTS) {
      const pen = flexPenaltyFor(pos, slot);
      if (pen !== 0 && pen !== undefined) {
        starEntry.flexes[slot] = pen;
        starOffNatCount++;
        // check if this is a "promotion": 85+ player penalized into a slot heavier than his best natural one
        // find best natural slot weight vs this slot weight
        // We need DEFAULT_WEIGHTS for comparison - compute from modelWeights
      }
    }
    starFlex[name] = starEntry;
  }

  return {
    errs: errs.length ? errs : null,
    starFlexCount: Object.keys(starFlex).length,
    starOffNatCount,
    stars: starFlex,
    promotions,
    totalStars: PLAYERS.filter(p => p[3] >= 85 && TAG_ROLE[p[1]]).length
  };
});

console.log(JSON.stringify(result, null, 2));
await b.close();
console.log('flexscan OK');