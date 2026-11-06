/* adapters/w76.js — the FROZEN REFERENCE adapter: the Z-post-blue w76 shell.
 *
 * This file is every shell-specific fact the acceptance battery needs about w76:
 * the DOM hooks (ids/classes/values) and the engine snippets (page-context calls
 * into the shell's own globals: zpbMedianOvr, seasonState, draftSim, the sim
 * chain…). It was extracted 1:1 from tools/w76/verify_w76.js — the battery that
 * ran 84/84 against Football-Sim-Z-post-blue-w76.html
 * (md5 4f363452a4ad33709244ca08d4ab3b00 · 1,830,164 B · gh-pages 367d8e3e).
 *
 * THE RULE FOR 76 PANCAKES: copy pancakes.stub.js, fill every key with the port's
 * equivalents. An engine snippet here is a VERBATIM w76 expression — for the port,
 * write the same OBSERVATION against the port's own internals (e.g. medianProbe
 * must still independently recompute the drafted pool and compare it to the
 * build's cached median). If a key cannot be filled, the surface it feeds is an
 * acceptance conversation, not a silent skip.
 */
module.exports = {
  name: 'Z-post-blue w76 (frozen reference shell)',
  base: 'Football-Sim-Z-post-blue-w76.html · md5 4f363452a4ad33709244ca08d4ab3b00 · 1,830,164 B',

  // ---------- DOM hooks ----------
  id: {
    slotSelect: 'draftSlotSelect',
    startDraftBtn: 'startDraftBtn',
    posFilter: 'draftPosFilter2',
    viewSwitch: 'draftView2',
    boardTable: 'draftTable2',
    chips: 'draftChips',
    seasonHost: 'draftResultsBody',
    seasonHostAlt: 'seasonHost',
    simSeasonBtn: 'simSeasonBtn',
    startSeasonBtn: 'startSeasonBtn'
  },

  sel: {
    backbar: '.zpb-backbar',
    posFilter: '#draftPosFilter2',
    viewSwitch: '#draftView2',
    boardTable: '#draftTable2',
    chips: '#draftChips',
    chipBtn: '#draftChips .zpb-srbtn[data-tog]',
    chipOn: '#draftChips .zpb-srbtn.on',
    chipOff: '#draftChips .zpb-srbtn[data-tog]:not(.on)',
    chipAll: '#draftChips [data-all]',
    chipNone: '#draftChips [data-none]',
    fillsCell: '#draftTable2 td.dc-fills',
    pickerDd: '#draftTable2 td.dc-fills .zpb-slotdd',
    tabBtnGuide: '#tabGuideBtn',
    tabBtnDraft: '#tabDraftBtn',
    tabBtnRankings: '#tabRankingsBtn',
    tabBtnPlayers: '#tabPlayersBtn',
    tabBtnGroups: '#tabGroupsBtn',
    tabBtnCompare: '#tabCompareBtn',
    viewGuide: '#viewGuide',
    viewDraft: '#viewDraft',
    viewRankings: '#viewRankings',
    viewPlayers: '#viewPlayers',
    viewGroups: '#viewGroups',
    viewCompare: '#viewCompare',
    viewGuideBarBtn: '#viewGuide .zpb-backbar button',
    viewCompareBarBtn: '#viewCompare .zpb-backbar button',
    seasonHost: '#draftResultsBody',
    seasonHostAlt: '#seasonHost',
    boxedDd: 'details.zpb-dd',
    seasonSummaries: '#draftResultsBody details summary',
    simSeasonBtn: '#simSeasonBtn',
    simgame: '.zpb-simgame',
    tabSibling: '.tabs .tabbtn:not(.active)',
    fxBoard: '.zpb-fx-board',
    fxMini: '.zpb-fx-mini',
    fxMiniLabel: '.zpb-fx-minibody b',
    gradeChip: '.zpb-rc-grade',
    fxMiniNums: '.zpb-fx-minibody i',
    fxTrack: '.zpb-fx-track',
    fxCutcard: '.zpb-fx-cutcard',
    fxPos: '.zpb-fx-pos',
    fxNum: '.zpb-fx-num',
    fxRatingLbl: '.zpb-fx-cutdown i',
    fxCardName: '.zpb-fx-hd b',
    fxGapnum: '.zpb-fx-gapnum',
    fxCut: '.zpb-fx-cut',
    fxCdtitle: '.zpb-fx-cdtitle',
    fxGoshine: '.zpb-fx-goshine',
    fxSec: '.zpb-fx-sec',
    rcTitle: '.zpb-rc-title',
    fxSub: '.zpb-fx-sub',
    fxCard: '.zpb-fx-card',
    fxFoot: '.zpb-fx-foot',
    secProbe: 'zpb-fx-sec',
    porun: '.zpb-porun',
    porunGo: '.zpb-porun-go',
    sbfin: '.zpb-sbfin',
    prname: '.zpb-prname',
    linescore: 'table.linescore',
    scoreLine: '.score-line'
  },

  val: {
    viewCards: 'cards',
    viewTable: 'table'
  },

  fixtures: {
    // V12 · the award-name probe element (classes + the nm/nm60 presets are the shell contract)
    awcard: {
      classes: ['zpb-pcard', 'zpb-awcard'],
      style: '--nm:#53382b;--nm60:#7a1f2b;',
      inner: '<b class="zpb-awname">Probe</b>',
      target: 'b'
    },
    // V10 · the pregame star probe element (the stage/star classes + the team-ink vars)
    pregame: {
      stageClass: 'zpb-replay',
      starClass: 'zpb-intro-star zpb-st-side',
      inner: '<b>T. Kelce</b><i>TE · 91 OVR</i>',
      style: '--tn:#8e5566;--tnd:#f2e4c8;--zr1:rgba(143,99,0,.07);--zr2:rgba(143,99,0,.03);position:static;'
    }
  },

  // ---------- engine snippets (page-context IIFE strings, verbatim w76 expressions) ----------
  engine: {
    // V0 · the veto (c) median: the build's own derivation vs an independent recomputation
    medianProbe: `(function(){
      if (!window.zpbMedianOvr) return { err: 'no zpbMedianOvr' };
      delete window.__zpbMedOvr;
      const m = zpbMedianOvr();
      const take = TOTAL_ROUNDS * 32;
      const pool = PLAYERS.filter(p => POS_SLOT_MAP[p[1]]).map(p => p[3]).sort((x, y) => y - x).slice(0, take).sort((x, y) => x - y);
      const i = pool.length >> 1;
      const indep = pool.length % 2 ? pool[i] : Math.round((pool[i - 1] + pool[i]) / 2);
      const all = PLAYERS.map(p => p[3]).slice().sort((x, y) => x - y);
      const j = all.length >> 1;
      const allMed = all.length % 2 ? all[j] : Math.round((all[j - 1] + all[j]) / 2);
      return { med: m, cached: window.__zpbMedOvr, indep, allMed, n: PLAYERS.length, take, draftedMin: pool[0], draftedMax: pool[pool.length - 1] };
    })()`,

    // boot the draft as the Steelers, live (on the clock) for the board probes
    bootDraft: `(function(){
      const s = document.getElementById('draftSlotSelect');
      if (s) { s.value = 'Pittsburgh Steelers'; s.dispatchEvent(new Event('change', { bubbles: true })); }
      document.getElementById('startDraftBtn').click();
    })()`,

    // close overlays + the welcome cleanup between sections
    cleanup: `(function(){
      try { if (window._zpbWelCleanup) window._zpbWelCleanup(); } catch (e) {}
      document.querySelectorAll('.zpb-fin,.zpb-restov,.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun,.zpb-victory,.zpb-ss-ov,.zpb-caution,.zpb-replay').forEach(f => f.remove());
    })()`,

    // V17 · the lineup slot-picker chip probe (fixtures off the live pool when the table has none)
    pickerProbe: `(function(){
      let dds = Array.from(document.querySelectorAll('#draftTable2 td.dc-fills .zpb-slotdd'));
      if (!dds.length) {
        dds = [document.body];
        const name = (draftSim.pool.find(p => { try { return openSlotsFor(draftSim.rosters[draftSim.userIndex], p).length >= 2; } catch (e) { return false; } }) || [])[0];
        if (!name) return { n: 0, sawFlex: false, sawNatural: false, bad: ['no flex-capable player in the pool'], sample: [] };
        document.body.dataset.chg = name;
      }
      let sawFlex = false, sawNatural = false, bad = [], sample = [];
      for (const dd of dds.slice(0, 12)) {
        const name = dd.dataset ? dd.dataset.chg : dd.getAttribute && dd.getAttribute('data-chg');
        if (dd === document.body) { }
        if (!name && dd !== document.body) continue;
        try { window.zpbSlotPop(dd, name); } catch (e) { bad.push('pop:' + e.message); continue; }
        const pop = document.querySelector('.zpb-slotpop');
        if (!pop) continue;
        const chips = Array.from(pop.querySelectorAll('.zpb-slotopt i')).map(i => i.textContent.trim());
        sample.push(chips.join('|'));
        if (chips.some(t => /FLEX/i.test(t))) bad.push('FLEX in ' + chips.join('|'));
        chips.forEach(t => { if (/^NATURAL$/.test(t)) sawNatural = true; if (/^-\\d+$/.test(t)) sawFlex = true; if (t && !/^(NATURAL|-\\d+)$/.test(t)) bad.push('odd chip ' + JSON.stringify(t)); });
        pop.remove();
        if (sawFlex && sawNatural) break;
      }
      return { n: dds.length, sawFlex, sawNatural, bad, sample: sample.slice(0, 4) };
    })()`,

    // V13a · boot the season into the preseason (quietly)
    seasonBoot: `(function(){
      try {
        try { if (draftSim && draftSim.pos < 32 * 26 && typeof simToEnd === 'function') simToEnd(); } catch (e) {}
        const b = document.getElementById('startSeasonBtn'); if (b) b.click(); else startSeason();
        return { phase: seasonState.phase, preseason: !!seasonState.preseason };
      } catch (e) { return { err: String(e) }; }
    })()`,

    // V11 · find a linescore within the first weeks and read its border against the score line
    linescoreProbe: `(function(){
      try {
        window.__zpbQuietSim = true;
        seasonState.preseason = false; seasonState.scriptLocked = true; // "Begin the season" — the weekly view replaces the preseason page
        const user = seasonUserTeam();
        let ls = null, sl = null;
        for (let w = 0; w < 6 && !ls; w++) {
          if (!seasonState.weekSimulated) simulateCurrentWeek();
          seasonState.weekSimulated = true;
          renderSeasonTab(document.getElementById('draftResultsBody') || document.body);
          ls = document.querySelector('table.linescore');
          sl = document.querySelector('.score-line');
          if (!ls) { if (seasonState.phase !== 'regular') break; advanceWeek(); }
        }
        if (!ls) return { err: 'no linescore rendered after 6 weeks' };
        return { ls: getComputedStyle(ls).borderTopColor, score: sl ? getComputedStyle(sl).borderTopColor : getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() };
      } catch (e) { return { err: String(e) }; }
    })()`,

    // V7 · the display scale read: integers, centered on the drafted-pool median
    scaleProbe: `(function(){
      try {
        window.__zpbQuietSim = true;
        simRestOfSeason();
        const S = seasonState;
        const rows = Object.values(S.playerStats || {}).filter(r => r._rating != null);
        const disp = rows.slice(0, 400).map(r => zpbDispRating(r));
        const mean = disp.reduce((a, b) => a + b, 0) / Math.max(1, disp.length);
        const rawMean = rows.reduce((a, r) => a + r._rating, 0) / Math.max(1, rows.length);
        return { n: disp.length, meanDisp: mean, rawMean, anchor: S._rtgMean, allInt: disp.every(d => Number.isInteger(d)), min: Math.min.apply(null, disp), max: Math.max.apply(null, disp), med: zpbMedianOvr() };
      } catch (e) { return { err: String(e) }; }
    })()`,

    // mount the shared season review (the command center's stage)
    mountReview: `(function(){
      try {
        seasonState.showReview = true;
        renderSeasonTab(document.getElementById('draftResultsBody') || document.getElementById('seasonHost'));
        return { phase: seasonState.phase };
      } catch (e) { return { err: String(e) }; }
    })()`,

    // V0c · the scale explainer: the retired generator's line + no live retired wording
    explainerProbe: `(function(){
      const out = (typeof generateRegularSeasonRecap === 'function') ? String(generateRegularSeasonRecap()) : '';
      const live = document.body.textContent || '';
      return {
        genHas: out.indexOf('THE PERFORMANCE SCALE') >= 0,
        genDrafted: /the drafted pool.s median OVR/.test(out),
        genNoShort: out.indexOf('counts the points he fell short') < 0,
        liveNoShort: live.indexOf('counts the points he fell short') < 0 && live.indexOf('the database\\u2019s median OVR') < 0,
        genReads: (out.match(/an average season reads (\\d+)/) || [])[1]
      };
    })()`,

    // V6 · run the whole playoff bracket with the user's team forced into it
    playoffsRun: `(function(){
      try {
        window.__zpbQuietSim = true; window.__zpbSBFinPending = false;
        startPlayoffs();
        const user = seasonUserTeam();
        const wc = seasonState.playoffRounds.wildcard;
        if (!wc.some(g => g.home === user || g.away === user)) {
          wc[0].home = wc[0].home === user ? wc[0].away : wc[0].home;
          wc[0].away = user; // the battery forces a berth so the round cards are testable every run
        }
        window.zpbSimRestOfPlayoffs();
        const ov = document.querySelector('.zpb-porun');
        return {
          phase: seasonState.phase, champion: seasonState.champion || null,
          cine: !!ov, kicker: ov ? (ov.querySelector('.zpb-porun-kicker') || {}).textContent : '',
          big: ov ? (ov.querySelector('.zpb-porun-big') || {}).textContent : '',
          go: !!ov && !!ov.querySelector('.zpb-porun-go'),
          stormEarly: !!document.querySelector('.zpb-sbfin')
        };
      } catch (e) { return { err: String(e) }; }
    })()`,

    // V8c · the stage label
    stageLabel: `(function(){ return { label: window.zpbStageLabel() }; })()`
  }
};
