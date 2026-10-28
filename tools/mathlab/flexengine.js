// mathlab/flexengine.js <html> — compiles flex.json into the ENGINE's table form (dataset tag -> slot -> penalty), loads it into the
// live engine in memory, then asks the engine's OWN flexPenaltyFor() for every tag x slot and checks the Owner's guide holds.
// Writes results/flex-compiled.json + results/flex-engine.js.txt (the literals the V23 build pastes). Exit 1 on any failure.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const { installDime, installDL5 } = require('./inpage.js');
const G = JSON.parse(fs.readFileSync(path.join(__dirname, 'flex.json'))).flex;
const ADD = JSON.parse(fs.readFileSync(path.join(__dirname, 'flex-dl5.json')));   // DL5 destination, derived from the guide by flexdl5.mjs (Owner approval pending)
Object.entries(ADD.flex).forEach(([r, t]) => Object.assign(G[r], t));
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'cfg.json')));
// dataset tag -> guide role   (LS has no slot; it is excluded from the pool by the product)
const TAG_ROLE = { QB: 'QB', HB: 'RB', FB: 'FB', WR: 'WR', TE: 'TE', LT: 'OT', RT: 'OT', LG: 'OG', RG: 'OG', C: 'C', DT: 'DT', REDG: 'EDGE', LEDG: 'EDGE', MIKE: 'ILB', WILL: 'OLB', SAM: 'OLB', CB: 'CB', SS: 'SS', FS: 'FS', K: 'K', P: 'P' };
// slot -> the guide's destination name. CB3 is the NICKEL slot; DIME is the 6th DB. CB1/CB2 are plain CB.
const SLOT_DEST = { QB: 'QB', RB1: 'RB', RB2: 'RB', FB: 'FB', WR1: 'WR', WR2: 'WR', WR3: 'WR', TE1: 'TE', TE2: 'TE', OT1: 'OT', OT2: 'OT', OG1: 'OG', OG2: 'OG', C: 'C', DT1: 'DT', DT2: 'DT', DE1: 'EDGE', DE2: 'EDGE',
  MIKE: 'ILB', WILL: 'OLB', SAM: 'OLB', CB1: 'CB', CB2: 'CB', CB3: 'NICKEL', DIME: 'DIME', DL5: 'DL5', SS: 'SS', FS: 'FS', K: 'K', P: 'P' };
const SLOTS = Object.keys(SLOT_DEST);
const ownDest = role => (role === 'CB' ? ['CB', 'NICKEL'] : ADD.natural.includes(role) ? [role, 'DL5'] : [role]);   // a CB is natural at CB1, CB2 and the nickel slot; DIME is a free flex by the guide
const compiled = { FLEX: {}, NATURAL: {} }, problems = [];
Object.entries(TAG_ROLE).forEach(([tag, role]) => {
  const nat = SLOTS.filter(s => ownDest(role).includes(SLOT_DEST[s]));
  compiled.NATURAL[tag] = nat;
  const f = {};
  SLOTS.forEach(s => { if (nat.includes(s)) return; const p = (G[role] || {})[SLOT_DEST[s]]; if (p != null) f[s] = p; });
  compiled.FLEX[tag] = f;
});
// guide property: wherever CB (non-nickel) is allowed for a role, NICKEL must be allowed too (CB3 needs the NICKEL key only)
Object.entries(G).forEach(([r, t]) => { if (t.CB != null && t.NICKEL == null && r !== 'CB') problems.push(`${r}: CB allowed but NICKEL not listed`); });
function expected(tag, slot) { const role = TAG_ROLE[tag]; if (compiled.NATURAL[tag].includes(slot)) return 0; const p = (G[role] || {})[SLOT_DEST[slot]]; return p == null ? 8 : p; }   // 8 = EMERGENCY_PENALTY
(async () => {
  const b = await chromium.launch(), pg = await b.newPage(); const errs = []; pg.on('pageerror', e => errs.push(String(e)));
  await pg.goto('file://' + process.argv[2]); await pg.waitForFunction(() => typeof slotWinsTable === 'function');
  await pg.evaluate(`(${installDime.toString()})(${JSON.stringify(cfg.dime)})`);
  if (cfg.dl5) await pg.evaluate(`(${installDL5.toString()})(${JSON.stringify(cfg.dl5)})`);
  const got = await pg.evaluate(({ C, tags, slots }) => {
    Object.keys(FLEX).forEach(k => delete FLEX[k]); Object.keys(NATURAL_SLOT_MAP).forEach(k => delete NATURAL_SLOT_MAP[k]);
    Object.assign(FLEX, C.FLEX); Object.assign(NATURAL_SLOT_MAP, C.NATURAL);
    const o = {}; tags.forEach(t => { o[t] = {}; slots.forEach(s => { o[t][s] = flexPenaltyFor(t, s); }); }); return { o, EMERG: EMERGENCY_PENALTY };
  }, { C: compiled, tags: Object.keys(TAG_ROLE), slots: SLOTS });
  let bad = problems.length; problems.forEach(p => console.log('FAIL', p));
  let allowed = 0, cells = 0;
  Object.keys(TAG_ROLE).forEach(t => SLOTS.forEach(s => { cells++; const e = expected(t, s), g = got.o[t][s]; if (e !== g) { console.log(`FAIL engine ${t}@${s}: guide ${e}, engine ${g}`); bad++; } if (g < 8) allowed++; }));
  Object.keys(TAG_ROLE).forEach(t => { if (!compiled.NATURAL[t].length) { console.log('FAIL tag with no natural slot', t); bad++; } });
  // spot checks straight from the Owner's text (independent of the tables above)
  const spot = [['QB', 'WR1', 6], ['HB', 'FB', 2], ['FB', 'RB1', 4], ['WR', 'CB3', 4], ['WR', 'CB1', 6], ['CB', 'DIME', 0], ['SS', 'CB3', 0], ['SS', 'CB1', 6], ['FS', 'CB1', 4], ['WILL', 'MIKE', 2], ['MIKE', 'WILL', 0],
    ['REDG', 'WILL', 2], ['REDG', 'MIKE', 4], ['LT', 'FB', 4], ['LG', 'OT1', 4], ['P', 'K', 2], ['K', 'P', 0], ['TE', 'DIME', 6], ['TE', 'WR1', 2], ['DT', 'OT1', 6], ['WR', 'DIME', 4], ['CB', 'WR1', 4], ['QB', 'RB1', 8],
    ['DT', 'DL5', 0], ['REDG', 'DL5', 0], ['LEDG', 'DL5', 0], ['LT', 'DL5', 4], ['LG', 'DL5', 4], ['C', 'DL5', 4], ['MIKE', 'DL5', 4], ['WILL', 'DL5', 4], ['SAM', 'DL5', 4], ['TE', 'DL5', 6], ['CB', 'DL5', 8], ['QB', 'DL5', 8], ['WR', 'DL5', 8], ['HB', 'DL5', 8], ['DT', 'DT1', 0]];
  spot.forEach(([t, s, p]) => { const g = got.o[t][s]; if (g !== p) { console.log(`FAIL spot ${t}@${s}: Owner text says ${p}, engine ${g}`); bad++; } });
  console.log('tags', Object.keys(TAG_ROLE).length, 'slots', SLOTS.length, 'cells', cells, 'allowed (penalty<8)', allowed, 'spot checks', spot.length, 'page errors', errs.length);
  const out = path.join(__dirname, 'results');
  fs.writeFileSync(path.join(out, 'flex-compiled.json'), JSON.stringify(compiled, null, 1));
  const L = o => '{' + Object.entries(o).map(([k, v]) => `${k}:${typeof v === 'object' && !Array.isArray(v) ? L(v) : JSON.stringify(v)}`).join(', ') + '}';
  fs.writeFileSync(path.join(out, 'flex-engine.js.txt'), '// FLEX (protected): dataset tag -> exact slot -> penalty. CB3 = the NICKEL slot; DIME = 6th DB. Natural slots carry no entry.\nconst FLEX = {\n' + Object.entries(compiled.FLEX).map(([t, f]) => ` ${t}:${L(f)},`).join('\n') + '\n};\n// NATURAL_SLOT_MAP (protected)\nconst NATURAL_SLOT_MAP = {\n' + Object.entries(compiled.NATURAL).map(([t, a]) => ` ${t}:${JSON.stringify(a)},`).join('\n') + '\n};\n');
  console.log(bad ? 'FLEXENGINE FAIL ' + bad : 'FLEXENGINE OK: the engine reproduces the Owner guide on every tag x slot');
  await b.close(); process.exit(bad ? 1 : 0);
})();
