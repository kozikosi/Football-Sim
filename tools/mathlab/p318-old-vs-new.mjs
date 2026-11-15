// READ-ONLY lab tool for P-318 (guardrail 3: a same-seed old-vs-new table before merge). Never writes a product file.
//
//   run   node --experimental-strip-types tools/mathlab/p318-old-vs-new.mjs run <treeRoot> <out.json> [seeds=40]
//   diff  node --experimental-strip-types tools/mathlab/p318-old-vs-new.mjs diff <old.json> <new.json>
//   P318_VALUES=table on a post-P-318 tree runs it under the retired fitted table (tableValues()): the seam-neutrality check, it must equal the old tree exactly.
//
// `run` drafts N seeds in three modes on ONE tree (the tree is a plain checkout or a `git archive` of any commit: only APIs that exist
// both before and after P-318 are used: buildPool, newDraft, runDraft, lineupFor, teamRatings, netPts). `diff` prints the table.
// The common ruler is netPts (points per game against the league, from the matchup model): it is the same function in both trees, so
// "old valued by the table, new valued by the measured curve" does not move the ruler itself.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [, , cmd, a, b, c] = process.argv;

async function run(root, out, N) {
  const imp = (p) => import(pathToFileURL(path.join(root, 'colors/src', p)).href);
  const { buildPool } = await imp('sports/nfl/engine/players.ts');
  const { makeRng } = await imp('core/rng.ts');
  const { DEFAULT_CONFIG, newDraft, runDraft } = await imp('sports/nfl/engine/draft.ts');
  const { lineupFor } = await imp('sports/nfl/engine/lineup.ts');
  const { leagueBaseline, spotsOf, teamRatings } = await imp('sports/nfl/engine/ratings.ts');
  const { returnerRating } = await imp('sports/nfl/engine/returner.ts');
  const { netPts } = await imp('sports/nfl/engine/value.ts');
  let values;   // undefined = the tree's own default (the fitted table before P-318, MEASURED after)
  if (process.env.P318_VALUES === 'table') values = (await imp('sports/nfl/engine/valueprovider.ts')).tableValues();
  const read = (f) => fs.readFileSync(path.join(root, 'data/nfl', f), 'utf8');
  const pool = buildPool(read('madden27-ratings.csv'), read('free-agents-old-ratings.csv'), read('player-ids.csv'));
  const modes = [['cpu', undefined], ['greedy@5', { team: 5, policy: 'greedy' }], ['favorites@5', { team: 5, policy: 'favorites' }]];
  const res = { root, valuesMode: process.env.P318_VALUES ?? 'default', nodeVersion: process.version, seeds: N, runs: [] };
  const t0 = performance.now();
  for (let seed = 1; seed <= N; seed++) for (const [mode, user] of modes) {
    const rng = makeRng(seed), st = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG);
    runDraft(st, rng.fork('run'), user, values);
    const per = st.rosters.map((r) => {
      const pl = Object.values(r);
      return ['4-3', '3-4'].map((base) => { const l = lineupFor(pl, base, values); return { l, R: teamRatings(spotsOf(l), returnerRating(l)) }; });
    });
    const lg = leagueBaseline(per.map((x) => x[0].R));
    const net = per.map((x) => Math.max(netPts(x[0].R, lg), netPts(x[1].R, lg)));
    const best = per.map((x, i) => (netPts(x[0].R, lg) >= netPts(x[1].R, lg) ? x[0] : x[1]));
    let flexed = 0, flexed85 = 0;
    for (const x of best) for (const p of x.l.placements) if (p.penalty > 0 && p.player) { flexed++; if (p.player.ovr >= 85) flexed85++; }
    const m = net.reduce((s, v) => s + v, 0) / 32, sd = Math.sqrt(net.reduce((s, v) => s + (v - m) * (v - m), 0) / 32);
    res.runs.push({ seed, mode, picks: st.log.map((p) => p.player.id + '@' + p.slot), net: { mean: m, sd, min: Math.min(...net), max: Math.max(...net) }, flexed, flexed85,
      userNet: user ? net[user.team] : null });
  }
  res.ms = performance.now() - t0;
  fs.writeFileSync(out, JSON.stringify(res));
  console.log(`wrote ${out}: ${res.runs.length} drafts in ${(res.ms / 1000).toFixed(1)} s`);
}

function diff(oldF, newF) {
  const A = JSON.parse(fs.readFileSync(oldF, 'utf8')), B = JSON.parse(fs.readFileSync(newF, 'utf8'));
  const f = (x, d = 2) => x.toFixed(d);
  const L = [];
  L.push(`old: ${A.root} (${A.valuesMode})  new: ${B.root} (${B.valuesMode})  seeds: ${A.seeds}/${B.seeds}  node ${A.nodeVersion}/${B.nodeVersion}`);
  L.push('');
  L.push('| mode | drafts | identical picks (of 1024), mean | min | drafts with 0 differences | first divergence (pick), median | sd of team net pts old -> new | flexed starters/draft old -> new | flexed 85+ old -> new | user net pts old -> new |');
  L.push('|---|---|---|---|---|---|---|---|---|---|');
  for (const mode of ['cpu', 'greedy@5', 'favorites@5']) {
    const ra = A.runs.filter((r) => r.mode === mode), rb = B.runs.filter((r) => r.mode === mode);
    const same = [], first = [];
    let zero = 0;
    ra.forEach((r, i) => {
      const o = rb[i];
      if (o.seed !== r.seed) throw new Error('seed mismatch');
      let s = 0, fd = -1;
      for (let k = 0; k < r.picks.length; k++) { if (r.picks[k] === o.picks[k]) s++; else if (fd < 0) fd = k + 1; }
      same.push(s); if (fd < 0) zero++; else first.push(fd);
    });
    first.sort((x, y) => x - y);
    const mean = (g) => g.reduce((s, v) => s + v, 0) / g.length;
    const med = first.length ? first[Math.floor(first.length / 2)] : 'n/a';
    const un = (rs) => (rs[0].userNet === null ? 'n/a' : f(mean(rs.map((r) => r.userNet))));
    L.push(`| ${mode} | ${ra.length} | ${f(mean(same), 1)} | ${Math.min(...same)} | ${zero} | ${med} | ${f(mean(ra.map((r) => r.net.sd)))} -> ${f(mean(rb.map((r) => r.net.sd)))} | ${f(mean(ra.map((r) => r.flexed)), 1)} -> ${f(mean(rb.map((r) => r.flexed)), 1)} | ${f(mean(ra.map((r) => r.flexed85)), 2)} -> ${f(mean(rb.map((r) => r.flexed85)), 2)} | ${un(ra)} -> ${un(rb)} |`);
  }
  L.push('');
  L.push(`wall clock for all drafts: old ${f(A.ms / 1000, 1)} s, new ${f(B.ms / 1000, 1)} s (same machine, sequential; a rough cost signal, not a benchmark)`);
  console.log(L.join('\n'));
}

if (cmd === 'run') await run(a, b, Number(c ?? 40));
else if (cmd === 'diff') diff(a, b);
else { console.error('usage: run <treeRoot> <out.json> [seeds] | diff <old.json> <new.json>'); process.exit(2); }
