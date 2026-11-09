/* adapters/pancakes.stub.js — the 76 Pancakes adapter, TO BE FILLED by the port.
 *
 * HOW TO USE (Architect / port team):
 *   1. Copy this file to adapters/pancakes.js (or anywhere) and fill every key.
 *   2. Run:  node accept.js --file <76-pancakes-build> --adapter ./adapters/pancakes.js
 *   3. Acceptance = 84 pass · 0 fail · 0 skip. Anything SKIP means a key you did
 *      not fill; anything FAIL means a behavior the port does not reproduce.
 *
 * THE TWO KINDS OF KEY:
 *   sel / val / fixtures — WHERE the behavior lives (selectors, view values,
 *     probe-element recipes). Fill them with the port's equivalents.
 *   engine.* — WHAT the shell observed through its own internals. Each snippet is
 *     a page-context IIFE string returning a JSON-able object. For the port, write
 *     the SAME OBSERVATION against the port's own internals — the shapes the
 *     runner expects are documented on each key. Where the port exposes no
 *     equivalent (e.g. the retired recap generator), read the live surface that
 *     now carries the behavior instead — see the notes on engine.explainerProbe.
 *
 * A key left null/missing = its assertions SKIP (exit code 3). That is honest:
 * the panel reads "unrunnable", and the council decides whether the surface or
 * the adapter is missing. Never stub a key to force a pass.
 */
module.exports = {
  name: '76 Pancakes (TODO: fill me)',

  // ---- DOM hooks -------------------------------------------------------
  // Every selector the runner queries. Give the port's equivalents.
  id: {
    // slotSelect: the draft-slot <select> (the battery sets 'Pittsburgh Steelers' + change)
    // startDraftBtn: the button that boots the draft
    // posFilter: the positions dropdown on the draft board
    // viewSwitch: the board's cards/table <select>
    // boardTable: the table view of the draft board
    // chips: the position-filter chip row
    // seasonHost: the season render host · seasonHostAlt: its fallback
    // simSeasonBtn · startSeasonBtn
  },
  sel: {
    backbar: null,            // the BACK TO <STAGE> bar
    posFilter: null,          // '#<id.posFilter>' equivalent
    viewSwitch: null,
    boardTable: null,
    chips: null,
    chipBtn: null,            // a position chip, carries data-tog="QB|RB|…" and class 'on' when lit
    chipOn: null,             // a lit chip · chipOff: an unlit chip
    chipAll: null,            // the ALL button (its <i> reads 'all on')
    chipNone: null,           // the CLEAR button (its <i> reads 'all off')
    fillsCell: null,          // the fills cell on the board table (carries 'x (-y)', never FLEX)
    pickerDd: null,           // the slot-picker trigger inside a fills cell
    tabBtnGuide: null, tabBtnDraft: null, tabBtnRankings: null,
    tabBtnPlayers: null, tabBtnGroups: null, tabBtnCompare: null,
    viewGuide: null, viewDraft: null, viewRankings: null,
    viewPlayers: null, viewGroups: null, viewCompare: null,
    viewGuideBarBtn: null,    // the Guide's top back-bar button
    viewCompareBarBtn: null,  // the Compare page's back-bar button
    seasonHost: null, seasonHostAlt: null,
    boxedDd: null,            // a boxed <details> dropdown (must be ZERO on the preseason flow)
    seasonSummaries: null,    // the preseason explainer summaries (runner greps the law strings)
    simSeasonBtn: null,
    simgame: null,            // the SIM GAME button (the family style reference)
    tabSibling: null,         // an inactive tab button (fallback style reference)
    // the command center (the season review's board):
    fxBoard: null,            // the board panel root
    rcTitle: null,            // its title (must read 'DRAFT COMMAND CENTER')
    fxSub: null,              // the retired subtitle (must be absent)
    fxSec: null,              // a section header line (must be absent in the rooms state; secProbe uses this class for the size probe)
    secProbe: null,           // the class to mount a throwaway probe at the retired section size
    fxMini: null, fxMiniLabel: null, gradeChip: null, fxMiniNums: null, fxTrack: null,
    fxCutcard: null, fxCardName: null, fxPos: null, fxNum: null,
    fxRatingLbl: null,        // the rating label (must read 'SEASON RATING')
    fxGapnum: null,           // the retired delta span (must be absent)
    fxCut: null,              // the CUT badge (fades on zpbCutFade — port may keep the name or update the runner's expectation WITH the Owner's word)
    fxCdtitle: null,          // the 'Cutdown Day' subtitle (centered, Cinzel Decorative)
    fxGoshine: null,          // the 20-0 shimmer (fxshine sweep, background-clip:text)
    fxCard: null,             // the retired two-bar cards (must be absent)
    fxFoot: null,             // the footer line (must read the 20-0 ask verbatim)
    porun: null, porunGo: null, sbfin: null,   // the playoff cinematic / its Continue / the SB page
    prname: null,             // a guide-ladder slot name
    linescore: null, scoreLine: null
  },
  val: {
    viewCards: null,          // the viewSwitch value that shows the cards view
    viewTable: null           // … and the table view
  },
  fixtures: {
    // Probe elements the runner mounts to read the THEME LAWS (V10/V12). For the
    // port: the same classes/vars the port's own styles key on.
    awcard: { classes: null, style: null, inner: null, target: null },
    pregame: { stageClass: null, starClass: null, inner: null, style: null }
  },

  // ---- engine snippets (page-context IIFE strings, JSON-able returns) ----
  engine: {
    /* V0 anchor. Return { med, cached, indep, allMed, n, take, draftedMin, draftedMax }
     *   med     = the build's cached normally-drafted median OVR (produced once)
     *   cached  = the stored value read back (same number)
     *   indep   = an INDEPENDENT recomputation: filter the draft-eligible pool the
     *             way the draft does, sort desc, take TOTAL_ROUNDS×32, median
     *   allMed  = the ALL-database median (76 in w76 — the assertion needs it to
     *             prove the drafted pool supersedes it)
     * If the port keeps no all-database median concept, say so to the council:
     * the V0 second assertion would need an Owner decision to re-anchor. */
    medianProbe: null,

    /* Boot the draft as the Steelers (or any fixed slot) so the board probes run. */
    bootDraft: null,

    /* Remove any open overlays/overlays-in-waiting between sections. */
    cleanup: null,

    /* V17. Return { n, sawFlex, sawNatural, bad[], sample[] } — open at least one
     * lineup slot-picker and read its chips: a flex chip '−N' and a NATURAL chip
     * must exist; no FLEX word anywhere. */
    pickerProbe: null,

    /* V13a. Boot the season into the preseason. Return { phase:'regular', preseason:true }. */
    seasonBoot: null,

    /* V11. Render up to 6 regular weeks until a box score exists. Return
     * { ls: <linescore borderTopColor>, score: <score-line borderTopColor or --accent> }. */
    linescoreProbe: null,

    /* V7. Sim to the end of the regular season. Return
     * { meanDisp, allInt, min, max, med } over a wide sample of displayed ratings
     * (integers, centered on the drafted-pool median ±3, bounded 0..99). */
    scaleProbe: null,

    /* Mount the shared season review (the command center's stage). */
    mountReview: null,

    /* V0c. Read the scale-explainer line wherever the port lives it (the Guide is
     * its lawful home). Return { genHas, genDrafted, genNoShort, liveNoShort,
     * genReads } — genReads = the median number the line prints (77 in w76). */
    explainerProbe: null,

    /* V6. Start the playoffs, force the user's team a wildcard berth, sim the
     * whole bracket. Return { phase:'complete', champion, cine, kicker, big, go,
     * stormEarly } — kicker must read 'WILD CARD ROUND'; the storm must wait. */
    playoffsRun: null,

    /* Return { label } — the live stage label ('SUPER BOWL' after the complete season). */
    stageLabel: null
  }
};
