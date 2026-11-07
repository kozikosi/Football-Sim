#!/usr/bin/env node
// mech_validate.mjs — T1 · MECHANICS VALIDATION HARNESS v0 (Z.ai lab, 2026-11-08)
// Usage: node mech_validate.mjs <build.html> <out.json> [--seeds N]
//
// Runs N fully seeded seasons (mulberry32 replaces Math.random before any engine call —
// harness-level injection; product RNG injection T-20261022-claude-2 remains open) on the
// build's own draft+season machinery, aggregates by slot, and compares against hash-pinned
// nflverse 2024 inputs on the four-level ladder where THIS BUILD can be measured.
//
// Ladder handling (honest granularity — VERACITY-SYNTHESIS E5):
//   L-opportunity : engine playerStats ledger carries slot, gp and counting stats (rec,
//                   passYds, rushYds, sacks...) → comparable to real snap/target shares.
//   L-production  : per-slot season yardage/TD lines → comparable.
//   L-efficiency  : NOT measurable on this build (no per-play air-yards / YAC / coverage
//                   ledger exists in buildGameDetail — verified at source 2026-11-08).
//   L-team impact : wins, PF, PA distributions per season → comparable to real 2024.
// Pre-registered tolerance bands come from Beam's prereg (5pp group-share flag) and are
// restated in the output. FAIL → REPORT. Never auto-adjust anything.
import fs from 'node:fs';
import { openBuild, writeJSON, report, sha256 } from './lablib.mjs';

const args = process.argv.slice(2);
const file = args[0], out = args[1];
const seedsIx = args.indexOf('--seeds');
const NSEEDS = seedsIx > -1 ? parseInt(args[seedsIx + 1], 10) : 6;
const INPAGE = fs.readFileSync(new URL('./inpage-core.js', import.meta.url), 'utf8');

// pre-registered bands (written before running; from Beam bias-preregistration 2026-11-07 M4
// flag rule + practical-effect threshold per T12: 0.5 wins/season on team level)
const BANDS = {
  groupShareTolerancePP: 5,             // M4 flag rule
  teamWinsMeanBand: [7.0, 10.0],        // real NFL mean team wins is 8.5/17 by construction; sim should land inside ±1.5
  pfMeanBand: [17.0, 27.0],             // real 2024 NFL mean PF ≈ 22.8/gm
  practicalEffectWins: 0.5,             // T12: a smaller mean shift is a football-nothing
};

console.log('T1 mechanics validation v0 · build:', file);
console.log('build sha256:', sha256(file));
console.log('seeds:', NSEEDS, '· bands:', JSON.stringify(BANDS));

const { browser, page, boot, errors } = await openBuild(file, INPAGE);
console.log('BOOT ok · slots', boot.slots, '· season machinery:', boot.hasSeason, '· draft:', boot.hasDraft);

const seasons = [];
for (let i = 0; i < NSEEDS; i++) {
  const seed = 20261108 + i * 7919;
  const t0 = Date.now();
  const s = await page.evaluate(([sd]) => window.zaiLab2.runSeason(sd), [seed]);
  s.elapsedMs = Date.now() - t0;
  seasons.push(s);
  const wins = s.standings.map(x => x.w);
  const meanW = wins.reduce((a, b) => a + b, 0) / wins.length;
  console.log(`  seed ${seed}: phase=${s.phase} games=${s.nGames} meanW=${meanW.toFixed(2)} champ=${s.champion} (${s.elapsedMs}ms)`);
}
await browser.close();

// ---- aggregate across seeds ----
const slots = Object.keys(seasons[0].slotAgg);
const slotMeans = {};
slots.forEach(sl => {
  const per = seasons.map(s => s.slotAgg[sl]).filter(Boolean);
  const agg = { nTeams: per.length };
  Object.keys(per[0].st).forEach(k => {
    const vals = per.map(p => (p.st[k] || 0));
    agg[k] = report(vals.map((v, i) => v / per[i].gp), 0, 'per-game', {});
    agg[k + '_seasonMean'] = report(vals, 0, 'season-total-per-team', {});
  });
  slotMeans[sl] = agg;
});

// team-level distributions
const allWins = seasons.flatMap(s => s.standings.map(x => x.w + 0.5 * x.t));
const allPF = seasons.flatMap(s => s.standings.map(x => x.pf));
const allPA = seasons.flatMap(s => s.standings.map(x => x.pa));
const teamLevel = {
  winsPerTeam: report(allWins, BANDS.practicalEffectWins, 'wins/season', { band: BANDS.teamWinsMeanBand }),
  pfPerGame: report(allPF.map(x => x / 17), 0.5, 'points/game', { band: BANDS.pfMeanBand }),
  paPerGame: report(allPA.map(x => x / 17), 0.5, 'points/game', {}),
};

// ---- ladder checks vs real data (only rungs the build can reach) ----
// real 2024 group shares from snap_counts (hash-pinned in anchors_2024.json, built separately)
const realPath = process.env.REAL_ANCHORS || '/tmp/nflverse/real_anchors_2024.json';
let ladder = { note: 'real_anchors_2024.json not found — engine-side distributions only', path: realPath };
if (fs.existsSync(realPath)) {
  const real = JSON.parse(fs.readFileSync(realPath, 'utf8'));
  // ---- L-production rung, like-for-like ----
  // skill: QB = passYds + 20·passTD; RB = rush + rec (yds + 20·TD); WR/TE = rec (yds + 20·TD).
  // defense: sacks by DL/LB/DB; dint (defensive INTs) by DL/LB/DB. Same unit rules on both sides.
  const stat = {};   // slot -> summed stat dict across seeds
  slots.forEach(sl => {
    stat[sl] = seasons.reduce((a, s) => { const A = s.slotAgg[sl]; if (!A) return a; Object.entries(A.st).forEach(([k, v]) => a[k] = (a[k] || 0) + v); return a; }, {});
  });
  const td = x => 20 * x;
  const skUnits = {
    QB: (stat.QB.passYds || 0) + td(stat.QB.passTD || 0),
    RB: (stat.RB1.rushYds || 0) + (stat.RB2.rushYds || 0) + (stat.RB1.recYds || 0) + (stat.RB2.recYds || 0)
      + td((stat.RB1.rushTD || 0) + (stat.RB2.rushTD || 0) + (stat.RB1.recTD || 0) + (stat.RB2.recTD || 0)),
    WR: (stat.WR1.recYds || 0) + (stat.WR2.recYds || 0) + (stat.WR3.recYds || 0) + td((stat.WR1.recTD || 0) + (stat.WR2.recTD || 0) + (stat.WR3.recTD || 0)),
    TE: (stat.TE1.recYds || 0) + (stat.TE2.recYds || 0) + td((stat.TE1.recTD || 0) + (stat.TE2.recTD || 0)),
  };
  const skTot = Object.values(skUnits).reduce((a, b) => a + b, 0);
  const engineSkill = Object.fromEntries(Object.entries(skUnits).map(([g, v]) => [g, Math.round(v / skTot * 1000) / 1000]));
  const dgrp = { DL: ['DE1', 'DE2', 'DT1', 'DT2'], LB: ['MIKE', 'WILL', 'SAM'], DB: ['CB1', 'CB2', 'CB3', 'SS', 'FS'] };
  const gsum = (keys, k) => keys.reduce((a, s) => a + (stat[s][k] || 0), 0);
  const engineSacks = Object.fromEntries(Object.entries(dgrp).map(([g, ks]) => [g, Math.round(gsum(ks, 'sack') * 1000) / 1000]));
  const engineInts = Object.fromEntries(Object.entries(dgrp).map(([g, ks]) => [g, Math.round(gsum(ks, 'dint') * 1000) / 1000]));
  const sackTot = Object.values(engineSacks).reduce((a, b) => a + b, 0) || 1;
  const intTot = Object.values(engineInts).reduce((a, b) => a + b, 0) || 1;
  const engineSackShare = Object.fromEntries(Object.entries(engineSacks).map(([g, v]) => [g, Math.round(v / sackTot * 1000) / 1000]));
  const engineIntShare = Object.fromEntries(Object.entries(engineInts).map(([g, v]) => [g, Math.round(v / intTot * 1000) / 1000]));
  const flag = (eng, rea) => Object.keys(rea).filter(g => Math.abs(100 * (eng[g] || 0) - 100 * rea[g]) > BANDS.groupShareTolerancePP)
    .map(g => ({ group: g, enginePP: Math.round(100 * (eng[g] || 0) * 10) / 10, realPP: Math.round(100 * rea[g] * 10) / 10, deltaPP: Math.round((100 * (eng[g] || 0) - 100 * rea[g]) * 10) / 10 }));
  ladder = {
    note: 'like-for-like production rungs (yard+TD units skill; sacks and INTs defense). Snap shares recorded as reference only.',
    realSource: { player_stats: real.source.player_stats, snap_counts: real.source.snap_counts, player_stats_def: real.source.player_stats_def },
    realGroupSnapShare_reference: real.groups,
    skillProduction: { engine: engineSkill, real2024: real.skill_production_shares, flags: flag(engineSkill, real.skill_production_shares) },
    defenseSacks: { engine: engineSackShare, real2024: real.defense_production_shares.sacks, flags: flag(engineSackShare, real.defense_production_shares.sacks) },
    defenseINTs: { engine: engineIntShare, real2024: real.defense_production_shares.interceptions, flags: flag(engineIntShare, real.defense_production_shares.interceptions) },
    notMeasurableThisBuild: ['efficiency ladder rung (no per-play air-yards/YAC/coverage ledger in buildGameDetail — verified at source 2026-11-08)', 'completion% by air-yard bucket', 'INT rate by coverage role', 'YAC by slot'],
  };
}

const doc = {
  schema: 'zai-t1-mech-validate/0',
  tool: 'mech_validate.mjs (T1 v0)',
  build: { file: file.split('/').pop(), sha256: sha256(file) },
  method: { seeds: NSEEDS, rng: 'mulberry32 replaces Math.random before every engine call (harness-level; product RNG T-20261022-claude-2 open)', perSeed: 'draft(snake, cpuPick) → optimizeCpuLineups → startSeason → 17 wk → playoffs' },
  bands: BANDS,
  seasons: seasons.map(s => ({ seed: s.seed, phase: s.phase, champion: s.champion, nGames: s.nGames, elapsedMs: s.elapsedMs })),
  teamLevel, slotMeans, ladder,
  console_errors: errors,
  generated: '2026-11-08',
};
writeJSON(out, doc);

console.log('\nTEAM LEVEL  wins mean', teamLevel.winsPerTeam.mean, 'ci95', teamLevel.winsPerTeam.ci95, teamLevel.winsPerTeam.practicalFlag);
console.log('            PF/gm  mean', teamLevel.pfPerGame.mean, 'ci95', teamLevel.pfPerGame.ci95);
if (ladder.flags) console.log('LADDER FLAGS', JSON.stringify(ladder.flags));
console.log('LADDER', ladder.note);
