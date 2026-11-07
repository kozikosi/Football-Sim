// mathlab/weight-impact.mjs <html> <baseWeightsJson> <weightOverridesJson> — measures downstream effects of weight changes.
//   Usage: node weight-impact.mjs <html> <baseWeights> <overrides>
//   <baseWeights> = JSON object like DEFAULT_WEIGHTS (slot -> number)
//   <overrides>   = JSON object like {"QB": 1000, "WR1": 650, ...} (partial overrides allowed)
//   Prints: team ranking deltas, score deltas, flex decisions (which players end up in slots).
//   Exit 1 on failure. For the w79 weight change this is the verification harness.
import fs from 'fs';
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const html = process.argv[2];
const base = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
const over = JSON.parse(fs.readFileSync(process.argv[4], 'utf8'));

const b = await chromium.launch(), pg = await b.newPage();
const errs = [];
pg.on('pageerror', e => errs.push(String(e)));
await pg.goto('file://' + html);
await pg.waitForFunction(() => typeof slotWinsTable === 'function');

// apply overrides in memory
const res = await pg.evaluate(({ base, over }) => {
  const orig = JSON.stringify(weights);
  Object.assign(weights, over);
  // compute team scores before refresh? Just compute directly
  const teams = Object.keys(TEAM_DATA);
  const scored = teams.map(t => ({ team: t, score: computeScore(t) }));
  scored.sort((a, b2) => b2.score - a.score);
  const rankings = scored.map((r, i) => ({ rank: i + 1, team: r.team, score: r.score }));
  const scoresByTeam = {};
  scored.forEach(r => scoresByTeam[r.team] = r.score);
  // flex decisions: for a sample of players, what slots are they allowed into
  const flexDecisions = {};
  const TAGS = Object.keys(TAG_ROLE);
  const SLOTS = Object.keys(SLOT_DEST);
  TAGS.forEach(t => {
    flexDecisions[t] = {};
    SLOTS.forEach(s => { flexDecisions[t][s] = flexPenaltyFor(t, s); });
  });
  weights = Object.fromEntries(Object.entries(weights).map(([k, v]) => [k, v]));
  return { rankings, scoresByTeam, flexDecisions, err: errs.length ? errs.join(';') : null };
}, { base, over });

await b.close();
console.log(JSON.stringify(res, null, 2));
console.log('weight-impact OK');
