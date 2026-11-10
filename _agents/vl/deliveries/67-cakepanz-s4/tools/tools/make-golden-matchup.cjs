// Generates test/golden/matchup-precolors.json from the REAL Pre-Colors engine (the lab's patched copy), so the TypeScript
// port is checked against the original JavaScript, not against itself.
//   node ../tools/mathlab/apply-math-patch.mjs ../Football-Sim-PreColors.html /tmp/pre-math.html ../tools/mathlab/results/fit-precolors-2026-10-28-recv.json ../tools/mathlab/cfg.json
//   NODE_PATH=$(npm root -g) node tools/make-golden-matchup.cjs /tmp/pre-math.html test/golden/matchup-precolors.json
const { chromium } = require('playwright');
const fs = require('fs'), crypto = require('crypto');
const [html, out] = process.argv.slice(2);
if (!html || !out) { console.error('usage: make-golden-matchup.cjs <patched.html> <out.json>'); process.exit(2); }
const NAMES = ['QB','WR1','OT1','OT2','WR2','C','OG1','OG2','TE1','RB1','WR3','RB2','TE2','FB','TE3','WR4','DE1','DT1','DE2','DT2','DL5','MIKE','WILL','SAM','CB1','CB2','CB3','DIME','FS','SS','K','P'];
let x = 20261029;
const rnd = () => { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; };
const TEAMS = Array.from({ length: 8 }, () => NAMES.map(() => 55 + Math.floor(rnd() * 43)));
const PLANS = [
  { off: { pers: '11', strat: 'neutral' }, def: { pkg: 'nickel', focus: 'neutral' } },
  { off: { pers: '12', strat: 'run' }, def: { pkg: 'base', focus: 'run' } },
  { off: { pers: '13', strat: 'run' }, def: { pkg: 'base', focus: 'neutral' } },
  { off: { pers: '21', strat: 'neutral' }, def: { pkg: 'nickel', focus: 'pass' } },
  { off: { pers: '22', strat: 'run' }, def: { pkg: 'base', focus: 'run' } },
  { off: { pers: '11', strat: 'pass' }, def: { pkg: 'nickel', focus: 'pass' } },
  { off: { pers: '12', strat: 'pass' }, def: { pkg: 'nickel', focus: 'run' } },
  { off: { pers: '21', strat: 'pass' }, def: { pkg: 'base', focus: 'pass' } },
];
(async () => {
  const browser = await chromium.launch(), page = await browser.newPage();
  await page.goto('file://' + require('path').resolve(html));
  await page.waitForFunction(() => typeof matchupModel === 'function' && typeof teamRatings === 'function');
  const res = await page.evaluate(({ NAMES, TEAMS, PLANS }) => {
    const R = TEAMS.map((o) => { const sm = {}; NAMES.forEach((n, i) => { sm[n] = { ovr: o[i] }; }); return teamRatings(sm); });
    const lg = leagueBaseline(TEAMS.map((o) => { const sm = {}; NAMES.forEach((n, i) => { sm[n] = { ovr: o[i] }; }); return sm; }));
    const cases = [];
    for (let i = 0; i < R.length; i++) for (let j = 0; j < R.length; j++) if (i !== j && (i + j) % 3 === 0) PLANS.forEach((p, k) => {
      if ((i * 7 + j * 3 + k) % 4 !== 0) return;
      const m = matchupModel(R[i], R[j], lg, p);
      cases.push({ o: i, d: j, plan: p, expRush: m.expRush, expPass: m.expPass, lamTO: m.lamTO, lamSack: m.lamSack, structPts: m.structPts, channels: m.channels, sd: m.sd, vm: m.vm, planCost: m.planCost });
    });
    return { R, lg, cases };
  }, { NAMES, TEAMS, PLANS });
  await browser.close();
  const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex').slice(0, 16);
  const doc = { _source: 'Pre-Colors patched by tools/mathlab/apply-math-patch.mjs with fit-precolors-2026-10-28-recv.json + cfg.json; ratings and matchupModel evaluated in headless Chromium', precolorsSha16: '40233d6be00e987c', patchedSha16: sha(html), names: NAMES, teams: TEAMS, ratings: res.R, league: res.lg, cases: res.cases };
  fs.writeFileSync(out, JSON.stringify(doc));
  console.log('cases', res.cases.length, 'patched sha', doc.patchedSha16, 'bytes', fs.statSync(out).size);
})();
