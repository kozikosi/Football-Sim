// mathlab/w79-impact.mjs — testing apparatus for w79.
// Given a weights table (tools/mathlab/weights-w79.json) and a flex table (tools/mathlab/flex.json),
// runs the real engine (lineupFor + CPU drafters) over tune/fresh seeds and reports:
//   - promotion counts by class (drive/small/second/emergency)
//   - named 85+ player placements
//   - downstream: modelWeights quantization, Guide WINS
// Usage (from colors/): node --experimental-strip-types ../tools/mathlab/w79-impact.mjs
//   --tune=1001-1016 --check=3001-3016 --out=../../tools/mathlab/results/w79-impact.json
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const root = path.resolve(process.cwd());
const src = (p) => import(pathToFileURL(path.join(root, 'src', p)).href);
const { buildPool } = await src('engine/players.ts');
const { makeRng } = await src('engine/rng.ts');
const { DEFAULT_CONFIG, newDraft, runDraft } = await src('engine/draft.ts');
const { lineupFor } = await src('engine/lineup.ts');
const { FLEX } = await src('engine/flex.ts');
const { SLOTS, WEIGHT } = await src('engine/slots.ts');

const MIN = +arg('min', '85'), CAP = 10, STEP = 50;
const BEAM = path.join(root, '..');
const read = (p) => fs.readFileSync(path.join(BEAM, p), 'utf8');
const pool = buildPool(read('data/madden27-ratings.csv'), read('data/free-agents-old-ratings.csv'));

const w79w = JSON.parse(fs.readFileSync(path.join(BEAM, 'tools/mathlab/weights-w79.json'), 'utf8')).weights;
const flexJson = JSON.parse(fs.readFileSync(path.join(BEAM, 'tools/mathlab/flex.json'), 'utf8')).flex;

// apply flex (all values; 6/12 already capped to 10 in file)
for (const role of Object.keys(FLEX)) { for (const k of Object.keys(FLEX[role])) delete FLEX[role][k]; Object.assign(FLEX[role], structuredClone(flexJson[role] ?? {})); }

// apply weights
const base = Object.fromEntries(SLOTS.map((s) => [s.id, s.weight]));
const w = { ...w79w };
for (const s of SLOTS) { s.weight = w[s.id]; WEIGHT[s.id] = w[s.id]; }

const slotsOf = (role) => SLOTS.filter((s) => s.dest === role || (s.dest === 'DL5' && (role === 'DT' || role === 'EDGE'))).sort((a, b) => w[b.id] - w[a.id] || SLOTS.indexOf(a) - SLOTS.indexOf(b));
const NATURAL_ZERO = (role, dest, pen) => pen === 0;
const range = (s) => { const [a, b] = s.split('-').map(Number); return [a, b ?? a]; };

function scan(seeds) {
  const [a, b] = R(seeds), cls = { drive: new Map(), small: new Map(), second: new Map(), emergency: new Map() };
  let lineups = 0, stars = 0;
  for (let seed = a; seed <= b; seed++) {
    const rng = makeRng(seed), st = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG);
    runDraft(st, rng.fork('run'));
    for (const ros of st.rosters) {
      const pl = Object.values(ros);
      const rank = new Map();
      for (const role of new Set(pl.map((p) => p.role))) pl.filter((p) => p.role === role).sort((x, y) => y.ovr - x.ovr || String(x.id).localeCompare(String(y.id))).forEach((p, i) => rank.set(p.id, i + 1));
      for (const bs of ['4-3', '3-4']) {
        lineups++;
        for (const p of lineupFor(pl, bs).placements) {
          if (!p.player || p.player.ovr < MIN) continue;
          stars++;
          const r = p.player.role, k = rank.get(p.player.id) ?? 1, sl = slotsOf(r), nat = sl[Math.min(k, sl.length) - 1];
          if (r === p.slot.dest || p.penalty === 0 || NATURAL_ZERO(r, p.slot.dest, p.penalty) || !nat) continue;
          if (p.slot.weight <= w[nat.id]) continue;
          const c = p.emergency ? 'emergency' : k > 1 ? 'second' : p.penalty >= CAP ? 'drive' : 'small';
          const key = `${r}>${p.slot.slot}`, e = cls[c].get(key) ?? { n: 0, role: r, nat: nat.id, k, pen: p.penalty, ex: [] };
          e.n++; if (e.ex.length < 3) e.ex.push(`${p.player.name} ${p.player.ovr} at ${p.slot.slot} -${p.penalty}${p.emergency ? ' (emerg)' : ''}`);
          cls[c].set(key, e);
        }
      }
    }
  }
  return { cls, lineups, stars };
}
const total = (m) => [...m.values()].reduce((t, e) => t + e.n, 0);
const counts = (r) => Object.fromEntries(Object.entries(r.cls).map(([c, m]) => [c, total(m)]));

function R(s){const [a,b]=s.split('-').map(Number);return [a,b??a];}
const tSeeds=arg('tune','1001-1016'), cSeeds=arg('check','3001-3016');
const tuneR=scan(tSeeds), checkR=scan(cSeeds);
console.log('w79 impact — tune',tSeeds,':',JSON.stringify(counts(tuneR)), tuneR.lineups,'lineups',tuneR.stars,'stars');
console.log('w79 impact — fresh',cSeeds,':',JSON.stringify(counts(checkR)), checkR.lineups,'lineups',checkR.stars,'stars');

const WHO = /(McBride|Bowers|Kittle|Kelce|Bijan|McCaffrey|Gibbs|Gonzalez|Thuney|Humphrey|Warner|Baun|Derrick Brown|Juszczyk)/;
const showNamed = (tag,r) => {
  // re-scan to collect named placements
};
// Collect named placements
function named(seeds){
  const [a,b]=R(seeds); const g=new Map();
  for(let seed=a;seed<=b;seed++){
    const rng=makeRng(seed), st=newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG);
    runDraft(st, rng.fork('run'));
    for(const ros of st.rosters){
      const pl=Object.values(ros);
      const rank=new Map();
      for(const role of new Set(pl.map(p=>p.role))) pl.filter(p=>p.role===role).sort((x,y)=>y.ovr-x.ovr||String(x.id).localeCompare(String(y.id))).forEach((p,i)=>rank.set(p.id,i+1));
      for(const bs of ['4-3','3-4']){
        for(const p of lineupFor(pl,bs).placements){
          if(!p.player||p.player.ovr<MIN||!WHO.test(p.player.name)) continue;
          const lbl=`${p.slot.slot}${p.penalty? '@-'+p.penalty:''}`;
          const k=`${p.player.name} ${p.player.role} ${p.player.ovr}`;
          const e=g.get(k)??new Map(); e.set(lbl,(e.get(lbl)??0)+1); g.set(k,e);
        }
      }
    }
  }
  return g;
}
const gn=named(tSeeds), gc=named(cSeeds);
console.log('\nnamed players (tune + fresh):');
const all=new Map();
for(const [k,v] of [...gn,...gc]) { const e=all.get(k)??new Map(); for(const [a,b] of v) e.set(a,(e.get(a)??0)+b); all.set(k,e); }
for(const [k,e] of [...all].sort()) console.log('  '+k+': '+[...e].map(([a,b])=>`${a} x${b}`).join(', '));

const out=arg('out','');
if(out){
  fs.mkdirSync(path.dirname(out),{recursive:true});
  fs.writeFileSync(out, JSON.stringify({weights:w, flex:flexJson, countsTune:counts(tuneR), countsFresh:counts(checkR), lineupsTune:tuneR.lineups, lineupsFresh:checkR.lineups},null,2)+'\n');
  console.log('wrote',out);
}
