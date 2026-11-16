// ERNIE — council probe, 2026-11-16. Node-side, no browser.
// Renders the shell's own feed view-model (src/lib/feedVM.ts) on the app tree's pinned snapshot and audits
// the strings the FEED SCREEN ACTUALLY DISPLAYS against the Owner's style laws (Part 11), plus the
// "no invented number" check (Part 9).
// Usage: node probe-feed-copy.mjs   (from the app tree root)
import { candidates } from './src/engine/sports/nfl/engine/draft.ts';
import { createStore, restoreDraft } from './src/engine/sports/nfl/app/store.ts';
import { feedVM } from './src/lib/feedVM.ts';
import { buildPool } from './src/engine/sports/nfl/engine/players.ts';
import fs from 'node:fs';

// the same pool the app builds at ?dev=1 (the bundled CSVs, verbatim)
const ratings = fs.readFileSync('./src/data/madden27-ratings.csv', 'utf8');
const fa = fs.readFileSync('./src/data/free-agents-old-ratings.csv', 'utf8');
const ids = fs.readFileSync('./src/data/player-ids.csv', 'utf8');
const players = buildPool(ratings, fa, ids);
const store = createStore(players);

let guard = 0;
while (store.getState().status !== 'done' && guard++ < 200) {
  const record = store.getState().record;
  if (!record) { store.dispatch({ type: 'START', seed: 1115, userTeam: 20 }); continue; }
  const st = restoreDraft(JSON.parse(JSON.stringify(record)));
  const c = candidates(st, record.userTeam);
  if (!c.length) break;
  store.dispatch({ type: 'PICK', playerId: c[0].player.id, slot: c[0].slot });
}
const record = JSON.parse(JSON.stringify(store.getState().record));
const vm = feedVM(record, record.seed, record.userTeam);

console.log('status      :', store.getState().status);
console.log('game        :', vm.away, vm.awayScore, '@', vm.home, vm.homeScore, '| drives', vm.drives.length);
console.log('lines       :');
for (const d of vm.drives) console.log('   ', d.period, d.clock, '|', d.team, '|', d.summary);

const all = vm.drives.map((d) => `${d.summary} ${(d.badges || []).map((b) => b.label).join(' ')}`).join('\n');
const count = (re) => (all.match(re) || []).length;
console.log('\n--- style-law audit over the rendered feed strings ---');
console.log('lines printing "touchdown"      :', count(/touchdown/gi));
console.log('lines printing "Turnover(s)"    :', count(/turnover/gi));
console.log('lines printing "expected scoring":', count(/expected scoring/gi));
console.log('lines printing "before kickoff" :', count(/before kickoff/gi));
console.log('badge labels used               :', [...new Set(vm.drives.flatMap((d) => (d.badges || []).map((b) => b.label)))].join(', '));
console.log('sample TD summaries             :', vm.drives.filter((d) => /touchdown/i.test(d.summary)).slice(0, 3).map((d) => d.summary));

// Part 9 — is any number in the view-model not from the engine? (a hard-coded table would show up as a
// literal in src/lib; we already grepped. Here we assert the VM's shape carries only engine-derived fields.)
const keys = Object.keys(vm.drives[0]).sort();
console.log('\n--- drive VM keys ---');
console.log(keys.join(', '));