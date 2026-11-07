// inpage-core.js — injected into a product build (READ-ONLY) by the Z.ai lab, 2026-11-08.
// Exposes window.zaiLab2 = { seed, witness, runSeason, replacement, flexPrice }.
// Every function treats the product as read-only: it may call engine functions and cache
// clears (_wTable/_wpoCache/_warCache), never assign protected constants.
window.zaiLab2 = (function () {
  'use strict';

  // ---- mulberry32 (same PRNG family the w79 zai-lab used; documented harness-level injection) ----
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const realRandom = Math.random;
  function seedRng(seed) {
    Math.random = mulberry32(seed);
    try { _wTable = null; _wpoCache = null; if (typeof _warCache !== 'undefined') _warCache.clear(); } catch (e) {}
    return { seeded: true, seed, sitesReplaced: 'Math.random (global; product RNG injection T-20261022-claude-2 still open)' };
  }

  // ---- T3a · raw-curve witness ----------------------------------------------------
  // Exports the RAW (uncalibrated by any Owner table) 50→100 wins curve per slot, straight
  // from slotWinsTable() — the deterministic matchup-model surface — beside whatever the
  // build ships as display weights (modelWeights() / DEFAULT_WEIGHTS / calibration).
  function witness() {
    const T = slotWinsTable();                 // raw curve cache of the build
    const perOvr = slotWinsPerOvr();
    const curves = {};
    ROSTER_SLOTS.forEach(s => {
      const arr = T[s];
      curves[s] = {
        raw_curve_50_100: arr.map(x => Math.round(x * 1e6) / 1e6),
        raw_span_70_90: Math.round((arr[40] - arr[20]) * 1e6) / 1e6,   // index 20 = 70, 40 = 90
        raw_slope_per_ovr: Math.round(perOvr[s] * 1e9) / 1e9,
        raw_wins_at_80_vs_80: Math.round((arr[30] - arr[20]) * 1e6) / 1e6,
      };
    });
    return {
      measured_by: 'slotWinsTable() (deterministic; best-plan matchupModel; all-else-80; k=17/POINTS_PER_WIN)',
      calibration_state: 'RAW — no Owner-table rescale applied on this surface',
      curves,
      modelWeights_output: (typeof modelWeights === 'function') ? modelWeights() : null,
      DEFAULT_WEIGHTS: (typeof DEFAULT_WEIGHTS !== 'undefined') ? JSON.parse(JSON.stringify(DEFAULT_WEIGHTS)) : null,
      display_weights: (typeof ZPB_SLOTS_W !== 'undefined') ? JSON.parse(JSON.stringify(ZPB_SLOTS_W)) : null,
      display_calibrated_span_70_90: (typeof slotWinsCalibrated === 'function') ? null : 'no calibrated-table function on this build',
    };
  }

  // ---- seeded draft (zai-lab w79 pattern, kept byte-compatible) --------------------
  function runDraft(seed) {
    Math.random = mulberry32(seed);
    try { _wTable = null; _wpoCache = null; } catch (e) {}
    const teamNames = Object.keys(TEAM_DATA);
    const rosters = [];
    for (let i = 0; i < 32; i++) rosters.push({ slots: {}, isUser: i === 0, teamName: teamNames[i] });
    draftSim = {
      userIndex: 0, rosters, teamNames,
      pool: PLAYERS.filter(p => POS_SLOT_MAP[p[1]]).sort((a, b) => (b[3] - a[3]) || (a[0] < b[0] ? -1 : 1)),
      order: buildSnakeOrder(), pos: 0, log: [], awaitingUser: false, undoUsedRound: null,
      bias: {}, noiseSd: {}, missP: {},
    };
    let guard = 0;
    while (draftSim.pos < draftSim.order.length && guard++ < 5000) {
      const t = draftSim.order[draftSim.pos];
      const roster = draftSim.rosters[t];
      if (firstOpenSlotAny(roster) === null) { draftSim.pos++; continue; }
      const pk = cpuPick(t);
      if (pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++;
    }
    return draftSim;
  }

  // ---- T1 · one seeded season on a seeded draft -------------------------------------
  function runSeason(seed) {
    runDraft(seed);
    optimizeCpuLineups();
    startSeason();
    let guard = 0;
    while (seasonState.phase === 'regular' && guard++ < 40) {
      if (!seasonState.weekSimulated) simulateCurrentWeek();
      advanceWeek();
    }
    if (seasonState.phase === 'regularReview') {
      startPlayoffs();
      const rounds = ['wildcard', 'divisional', 'champ', 'superbowl'];
      for (const r of rounds) {
        if (seasonState.phase !== 'playoffs') break;
        simulatePlayoffRound();
        if (seasonState.phase === 'playoffs' && seasonState.currentPlayoffRound !== r) {
          // advanced by simulatePlayoffRound already; loop continues
        } else if (seasonState.phase === 'playoffs') {
          advancePlayoffRound();
        }
      }
    }
    // ---- collect ----
    const S = seasonState;
    const standings = {};
    S.schedule.forEach(g => {
      if (!g.played || !g.result) return;
      const h = standings[g.home] = standings[g.home] || { team: g.home, w: 0, l: 0, t: 0, pf: 0, pa: 0, playoffWins: 0 };
      const a = standings[g.away] = standings[g.away] || { team: g.away, w: 0, l: 0, t: 0, pf: 0, pa: 0, playoffWins: 0 };
      const reg = g.week <= 17;
      const hs = g.result.homeScore, as = g.result.awayScore;
      if (reg) {
        h.pf += hs; h.pa += as; a.pf += as; a.pa += hs;
        if (hs > as) h.w++; else if (hs < as) a.w++; else { h.t++; a.t++; }
      } else {
        const winner = hs > as ? g.home : g.away;
        standings[winner].playoffWins++;
      }
    });
    // slot-season aggregation from the shell's own playerStats ledger
    const slotAgg = {}, statKeys = {};
    Object.values(S.playerStats).forEach(rec => {
      const s = rec.slot; if (!s) return;
      const A = slotAgg[s] = slotAgg[s] || { n: 0, gp: 0, st: {} };
      A.n++; A.gp += rec.gp;
      Object.entries(rec.st || {}).forEach(([k, v]) => { A.st[k] = (A.st[k] || 0) + v; statKeys[k] = 1; });
    });
    // team-game scores for distribution checks
    const scores = S.schedule.filter(g => g.played && g.result).map(g => [g.result.homeScore, g.result.awayScore]);
    return {
      seed,
      phase: S.phase,
      champion: S.champion || null,
      standings: Object.values(standings),
      slotAgg, statKeys: Object.keys(statKeys),
      scores,
      nGames: scores.length,
    };
  }

  // ---- T4 · replacement-level census ------------------------------------------------
  function replacement(seed) {
    const D = runDraft(seed);
    // The engine's replacementLevels() is live DURING a draft: N = starting spots still open
    // league-wide at that moment. Capture it at 25% / 50% / 75% of the draft order plus the
    // final state — the audit reports the median across checkpoints, not one invented point.
    const checkpoints = [0.25, 0.5, 0.75].map(f => Math.floor(D.order.length * f));
    const savedPos = D.pos;
    const samples = [];
    const poolAll = D.pool.concat();   // players still available at savedPos
    checkpoints.forEach(cp => {
      // reconstruct available-pool state at checkpoint cp: pool at draft start = remaining +
      // everything in the pick log; remove everything picked before cp.
      const taken = new Set(D.log.filter(l => l.overall <= cp).map(l => l.player[0]));
      const poolStart = D.pool.concat(D.log.map(l => l.player));
      const poolCp = poolStart.filter(p => !taken.has(p[0]));
      // roster fill state at cp: count filled slots per roster from log
      const fill = D.rosters.map(() => ({}));
      D.log.filter(l => l.overall <= cp).forEach(l => { fill[l.teamIndex][l.slot] = l.player; });
      const fakeRosters = D.rosters.map((r, i) => ({ slots: fill[i] }));
      samples.push({ at: cp, levels: replacementLevels(poolCp, fakeRosters), open: openByGroup(fakeRosters) });
    });
    D.pos = savedPos;
    optimizeCpuLineups();
    // who actually plays: the OVR distribution of players placed in starting lineups, by group
    const inLineup = {}, openSlots = {};
    D.rosters.forEach(r => {
      const lu = optimalLineup(r.slots);
      Object.entries(lu).forEach(([s, p]) => {
        const g = WV_SLOT_GROUP[s];
        (inLineup[g] = inLineup[g] || []).push(p[3]);
      });
    });
    const poolByG = {};
    const remaining = D.pool.map(p => p);
    remaining.forEach(p => { const g = WV_TAG_GROUP[p[1]]; if (g) (poolByG[g] = poolByG[g] || []).push(p[3]); });
    Object.values(poolByG).forEach(a => a.sort((x, y) => y - x));
    const nthBest = {};
    Object.entries(poolByG).forEach(([g, arr]) => { nthBest[g] = arr.slice(0, 12).map(x => Math.round(x * 10) / 10); });
    return {
      seed,
      replacementSamples: samples,
      medianReplacement_byGroup: Object.fromEntries(groupsUnion(samples).map(g => {
        const vals = samples.map(s => s.levels[g]).filter(v => v != null).sort((a, b) => a - b);
        return [g, vals.length ? vals[Math.floor(vals.length / 2)] : null];
      })),
      openSlots_at_checkpoints: samples.map(s => s.open),
      playersInLineups_byGroup: Object.fromEntries(Object.entries(inLineup).map(([g, a]) => [g, { n: a.length, mean: Math.round(a.reduce((x, y) => x + y, 0) / a.length * 10) / 10 }])),
      nthBestAvailable_afterDraft_byGroup: nthBest,
      poolSizes_byGroup: Object.fromEntries(Object.entries(poolByG).map(([g, a]) => [g, a.length])),
    };
  }
  function openByGroup(rosters) {
    const out = {};
    rosters.forEach(r => ROSTER_SLOTS.forEach(s => { if (!r.slots[s]) { const g = WV_SLOT_GROUP[s]; out[g] = (out[g] || 0) + 1; } }));
    return out;
  }
  function groupsUnion(samples) {
    const set = new Set();
    samples.forEach(s => Object.keys(s.levels).forEach(g => set.add(g)));
    return [...set];
  }

  // ---- T6 · flex opportunity-cost pricer (full re-optimization, paired casts) -------
  // Case: { tag:'TE', starOvrMin:85, flexSlot:'WR1' } — find rosters (seeded drafts) holding
  // an eligible star; for each, measure wins-proxy with the star at the natural slot vs at
  // the flex slot, BOTH with the rest of the lineup re-optimized by the shell's optimizer.
  // Wins proxy = bestUnitPts(off) + bestUnitPts(def) vs the all-80 league baseline,
  // converted with k = 17/POINTS_PER_WIN — the same surface slotWinsTable() uses, so flex
  // penalties, unit interactions and plan choice are all included.
  function flexPrice(cases, seeds, minOvr) {
    const lgBase = {}; ROSTER_SLOTS.forEach(s => { lgBase[s] = { ovr: 80 }; });
    const lg = teamRatings(lgBase);
    const k = 17 / POINTS_PER_WIN;
    const bOn = bestUnitPts(lg, lg, true), bOff = bestUnitPts(lg, lg, false);
    const winsProxy = (sm) => {
      const r = teamRatings(sm);
      return (bestUnitPts(r, lg, true) - bOn + bestUnitPts(r, lg, false) - bOff) * k;
    };
    const out = { cases: [] };
    cases.forEach(cs => {
      const rows = [];
      seeds.forEach(seed => {
        const D = runDraft(seed);
        optimizeCpuLineups();
        D.rosters.forEach((r, ti) => {
          const lu = optimalLineup(r.slots);
          // find the star in his natural slot for this case
          const natSlots = (NATURAL_SLOT_MAP[cs.tag] || []).filter(s => lu[s]);
          natSlots.sort((a, b) => lu[b][3] - lu[a][3]);
          const natSlot = natSlots[0];
          if (!natSlot) return;
          const star = lu[natSlot];
          if (star[3] < minOvr) return;
          if (star[1] !== cs.tag) return;
          // baseline: star natural, rest optimal (optimalLineup is the shell's Hungarian
          // assignment over slotWins(sl, effOvr(p, sl)) — the shell's own optimizer)
          const smBase = Object.fromEntries(Object.entries(lu).map(([s, p]) => [s, p]));
          // treatment: star flexed into cs.flexSlot, everyone else re-optimized BY THE SHELL
          const rosterFlex = Object.assign({}, r.slots);
          delete rosterFlex[natSlot];
          rosterFlex[cs.flexSlot] = star;                    // same player array; effOvr applies flexPenaltyFor
          const luFlex = optimalLineup(rosterFlex);          // full re-optimization, shell's own code
          const smFlex = Object.fromEntries(Object.entries(luFlex).map(([s, p]) => [s, p]));
          const flexPen = flexPenaltyFor(star[1], cs.flexSlot);
          const wBase = winsProxy(smBase), wFlex = winsProxy(smFlex);
          rows.push({ seed, team: r.teamName, star: star[0], pos: star[1], ovr: star[3], from: natSlot, to: cs.flexSlot, flexPen, wBase: Math.round(wBase * 1e4) / 1e4, wFlex: Math.round(wFlex * 1e4) / 1e4, loss: Math.round((wBase - wFlex) * 1e4) / 1e4 });
        });
      });
      out.cases.push({ case: cs, n: rows.length, rows });
    });
    return out;
  }

  window.addEventListener('error', () => {});
  return { seedRng, witness, runSeason, replacement, flexPrice };
})();
