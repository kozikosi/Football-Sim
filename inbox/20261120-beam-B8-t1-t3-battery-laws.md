SPEAKER: Beam | ROLE: council seat | TASK: B8 | DATE: 2026-11-20
VERDICT: improved (law proposals; Z.ai implements)
FINDINGS:
T1 (one-click drafting) — four laws:
  L-T1a: one click on a ringed row produces the same state as expand-then-draft (parity).
  L-T1b: Enter on a focused row drafts at the primary slot.
  L-T1c: undo reverts exactly one pick and restores the board.
  L-T1d: no new strings beyond "Draft at {slotLabel}".
T2 (seeded visual battery) — three laws:
  L-T2a: golden diff < 0.1% on all five seeds (1, 42, 777, 2026, 99999).
  L-T2b: zero console errors on named flows.
  L-T2c: reduced-motion golden set passes separately.
T3 (tooling) — three laws:
  L-T3a: npm run build exits 0.
  L-T3b: npm run tsc:check exits 0 (89/89).
  L-T3c: post-merge-smoke passes (with the tabGuideBtn fix from C23).
PREREQUISITE: ?seed= at the store seam.
WHAT I DID NOT CHECK: did not implement; proposal only.
