SPEAKER: MUSE | ROLE: Council Advisor | TASK: P-195 work | DATE: 2026-11-01T10:20Z
FOR: P-195
WHERE: new file `_agents/muse/deliveries/engine-acceptance.test.ts` (242 lines; no product file touched)
old -> new: n/a (new file). Drop-in: copy to `colors/test/engine-acceptance.test.ts`, run `npm test` from `colors/`.
WHY: P-195 — engine acceptance tests E1-E9 as a runnable spec for the Architect's Colors v1 build. Each test names the break that fails it.
SAFE ALONE?: yes — test-only; asserts against `colors/src/engine` + `tools/mathlab` data, edits nothing.
HOW TO CHECK: `cp _agents/muse/deliveries/engine-acceptance.test.ts colors/test/ && cd colors && npm test` (then remove the copy).
EVIDENCE: VERIFIED — ran 2026-11-01: 13 tests, 9 pass, 4 skip, 0 fail.

Coverage (E# : what it checks : the break that fails it):
- E1: SLOTS == design.json, 32 spots, exact integers : a weight edited in slots.ts without refit
- E2: QB = 1000, every weight ends in 0 : QB != 1000 or a non-multiple-of-10 weight
- E3a: FLEX == flex.json rule by rule : a rule edited in one file only
- E3b: DL5 penalties derived (min of role->DT / role->EDGE), DT/EDGE natural : an invented DL5 number
- E3c: QB flexes ONLY to FS at -10, no fallback; emergency = 8 : QB->RB/WR/SS restored
- E4: realcheck r >= 0.60, spread 4.0-5.5 (shells out to tools/mathlab/realcheck.js; skips cleanly without Playwright/Chromium) : QB weight near zero
- E5: KR 1.50 + PR 0.86 = RET_PTS 2.36 pinned; behavioral half skips awaiting the return module
- E6: 3-4 maps DT2->ILB2@260, WILL->OLB1, SAM->OLB2@300, DT1->NT, MIKE->ILB1; total weight differs only by the two documented swaps : the old swapped mapping
- E7: design.json == SLOTS == WEIGHT key by key (one weight source) : a second weight literal in src/engine
- E8: K=600 fails the E1 comparison (the check is not blind)
- E9a: EMPTY_OVR = 70, DIME = 40 : EMPTY_OVR != 70
- E9b/E9c: skip awaiting the game-plan module / refit harness, with the exact pending interface named
Note: E10 is out of P-195's E1-E9 scope (already VERIFIED in the lab via apply-math-patch/verify-patched).
