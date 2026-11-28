// port/domHooks.ts — the Wave B #3 ONE DOM-HOOK REGISTRY (hy4 #11/#4).
//
// Every battery, capture tool and probe drives the shell through THESE selectors — never through a
// selector inlined in the test. The registry is exported from the port (framework-neutral, plain
// TS), so the batteries import it like any other contract: when the shell's DOM moves, ONE rename
// here updates every driver, and the non-vacuity markers below ASSERT the registry still reaches
// its intended scene (the counterexample this exists for: the 2026-11-23 run's `tr.teamrow` click
// that hit a hidden rankings table and passed as a boot-state capture — hy4's drift case).
//
// LAW (node battery, N-hb-registry): every selector here is non-empty, starts with '.', '#' or
// 'button'/'text', and the SCENE assertions hold on a live served boot (shell battery S-hb-*):
// the board scene resolves boardRow/draftBtn/topBadge/heatStrip; the team-select scene resolves
// teamRow; the hub scene resolves hubRoot. A selector that drifts to a hidden or wrong-scene
// element FAILS the law by name — the registry cannot silently rot.

export const HOOKS = {
  // team select
  teamRow: '.cp-ts-team',
  // the draft board
  boardRoot: '.cp-rows',
  boardRow: '.cp-rows .cp-row',
  draftBtn: '.cp-rows .cp-row .cp-draftbtn',
  topRow: '.cp-row.cp-top3',
  topBadge: '.cp-toptag',
  rowMain: '.cp-rows .cp-row .cp-main',
  errorLine: '.cp-error',
  // the decision surface (Wave B #5)
  heatStrip: '.cp-heat',
  heatCell: '.cp-heat .cp-heatcell',
  confidence: '.cp-confidence',
  stateOrigin: '.cp-stateorigin',
  // the statusVM surfaces (Wave B #3)
  statusChip: '[data-status-phase]',
  // nav / shell
  navBtn: '.cp-navbtn',
  shareBtn: '.cp-sharebtn',
  seamChip: '.cp-seamcard',   // the dev-gated provenance chip (Wave B #1)
} as const;

// the scene table: each named scene must resolve its hooks ON A LIVE BOOT (asserted by the shell
// battery) — a hook listed for a scene that renders none of it is a drift, named loudly.
// item 5 W3 (HY4): the board scene carries the FULL hook set the Wave B surfaces ride — the heat
// strip, its cells, the pick-confidence line, the state-origin chip, the dev-gated seam card and
// the status chip. The waveB battery's W3 law holds the table to the shell source (every named
// selector must still appear in the .svelte sources it targets — a drift dies naming the hook).
export const SCENES: Record<string, readonly string[]> = {
  teamSelect: ['teamRow'],
  board: ['boardRoot', 'boardRow', 'draftBtn', 'statusChip', 'heatStrip', 'heatCell', 'confidence', 'stateOrigin', 'seamChip'],
  hub: ['navBtn', 'statusChip'],
};

export type HookId = keyof typeof HOOKS;
