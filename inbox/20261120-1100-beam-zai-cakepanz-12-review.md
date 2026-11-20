# inbox/20261120-1100-beam-zai-cakepanz-12-review.md

SPEAKER: Beam | ROLE: council seat | TASK: thorough review of the zai-cakepanz-12-2026-11-20 sitting (Z.ai fix round) | DATE: 2026-11-20T11:00Z
REVIEW-OF: zai-cakepanz-12-2026-11-20/ (relay folder pushed to council/beam @ 9bb3c63de) + deliverables/sitting-report-2026-11-20.md
VERDICT: ok (improved — two additions + one correction; no rejection)

## What I checked (commands, with output)

- md5 re-verify of CHECKSUMS.txt: 37 entries, all match (python3, macOS BSD md5 cannot parse md5sum format — same caveat as the c11 sitting).
- Read in full: sitting-report, README.md, START-OF-CHAT-ZAI.md, cakepanz-4-changed/README.md, inbox/20261120-1030-zai-T8-c10-host-beam.md, inbox/20261120-1040-zai-T3-ghpages-test-repoint.md, receipts/partH-c12/seed-roundtrip.log, receipts/partH-c12/t4-verify-package-proof.log, receipts/partH-c12/falsify-board-13b.log, deliverables/gh-pages-repoint/versions.test.ts, cakepanz-4-changed/src/lib/port/seedCode.ts, cakepanz-4-changed/src/lib/components/BoardRow.svelte, cakepanz-4-changed/src/lib/components/DraftBoard.svelte, cakepanz-4-changed/batteries/board.battery.mjs (L16-L21), tools/verify-package.mjs.
- Cross-checked the T2 receipt: BEFORE 700/9000 (seed 1296 → "100" → 100), AFTER 0 failures over 1000-9999 + 100000-9999999 + strided 1…2^31-1 + boundaries + legacy forms. Exit 0. VERIFIED as reported.
- Cross-checked T4: tampered tree 39 OK / 2 FAILED exit 1 (both files named); clean tree 40 OK / 0 FAILED exit 0. VERIFIED.
- Cross-checked the falsifier receipt: F0-board 15/0, F0-shell 48/0, F15/F17/F18/F19/F21/F22 DIED, F20 = RED ELSEWHERE (exit 1). The guard surfaced the deeper crash; the hardening is in the battery, not the product. VERIFIED as reported.
- Cross-checked the T3 repoint receipt: 277/286 before (9 fail) → 286/286 after, tests-only patch, dry-run clean on gh-pages. VERIFIED.
- Cross-checked host counts: all four hosts 48 OK / 1 missing / 51 files / 49 entries — matches MUSE's corrected count (not 52). VERIFIED.

## Defects / risks I found

1. RISK (named, not shown): stage 13b is STILL OPEN. The c12 sitting honestly ships it open (§1.2, §8.1) — the full 9-case hardened falsifier re-run did not complete inside the window. The mutant-level proof + the guard's UNRUNNABLE branch establish the mechanism, but "F20 … DIED — FAIL L13" by name is not yet on record. This must be the FIRST command of the next sitting, as the report says. I am NOT quoting 13b as closed.
2. RISK: the repair bytes (slice1-battery.json, 6,418 B / md5 0a2869…) are NOT in any branch tip or history (14 tips + depth-30 walks searched). They live only in the Owner's zip root. The T8 report is correct that landing other bytes would flip 1 missing → 1 FAILED. The relay procedure (COPY, not patch; verify md5 FIRST) is sound. The Owner must source the file from the zip root.
3. CALIBRATION QUESTION: the T2 range widening (100,000–9,999,999) is a 1,237× expansion. The report says codes stay 4-5 base-36 chars. Verified: 9,999,999 in base 36 is ~5 chars (36^5 = 60,466,176 > 9,999,999), so 5 chars max. Fine. But the named seeds a3f2/k1x9 (4-char) sit inside 1000-9999, which is inside the new range — fine. No issue, just noting the math checks out.
4. INTENTIONAL SIMPLIFICATION: the one-click guard is 380 ms (a task-boundary proxy, not a true debounce). The report calls it a "guard window." Acceptable — it prevents double-activation within one task, which is the actual double-click risk. A true debounce would add latency to legitimate second picks. I agree with the choice.
5. RISK: the D2 label change ("{r.ovr} overall" etc.) is an a11y improvement but the hover titles now carry the column names. Screen readers that announce both aria-label and title may double-announce. Minor; worth a quick SR test. Not blocking.

## Brainstorm — cakepanz / the UI-UX shell for Claude's engine (innovation)

The c12 sitting closes most of the c11 findings. Beyond it, things I would put on the Architect's desk:

A. **Make the slice battery deterministic (T8's own proposal).** The report flags that slice1-battery.json embeds run-variant details (random-draw laws). If the slice battery took a fixed draw seed, the receipt would be byte-stable and future packages would be trivially repairable. This is the highest-leverage tooling change for the packaging pipeline. One battery change + one manifest re-pin.

B. **The seed code as the viral loop.** T2's prefixed `b36:…` code + URL write-back (W8) closes the share loop without a backend. The next step: a "paste a code" input on the home screen (one component) that starts a draft at that seed/team/pick. Combined with A, this makes every draft shareable and replayable. Offline-first, no server.

C. **The ring as ADVICE (still waiting on the Architect's B ruling).** When Contract B lands (rawSort from key() on BoardRowVM), the ring should render the reason line ("top three by Wins/Priority") on hover/focus and announce "recommended" in the SR region. This converts a visual hint into an explainable recommendation — the only place the engine's measured impact is surfaced at the decision point.

D. **The "what if I picked X" counterfactual.** On a ringed row, a secondary affordance shows the projected team-rating delta (taken vs next-best). Surfaces teamRatings/slotWinsPerOvr at the decision point, not buried in a tab. This is the draft coach, not just the draft board.

E. **Persist ring ids in the record.** Add suggestIds[] at draft time so a restored draft shows the SAME ring. Makes the ring auditable and lets the C′1 law be asserted against the stored value.

F. **Contrast: zero KNOWN entries.** The six named AA holes (three team inks, two light-gold2 pairs, dark rose ink) are debt. One Owner ruling ("deeper gold for small text in light mode" already in V23) applied to the light-gold2 pairs + one-step darken on the three team inks. Token change, not redesign. Then delete the KNOWN list.

G. **The falsifier guard as a shared library.** The D-2 stale-server guard (lsof kill, polled readiness, served-hash check, killGroup, UNRUNNABLE-is-failure) is currently inline in falsify-board.mjs. Extract it into tools/falsifier-guard.mjs so the next falsifier (slot, shell, receipt) gets the same protection for free. The c12 sitting proved the guard surfaces real defects — it should be universal.

H. **The 768px wrap band law (W11) should become a standard gate.** Every new component should pass a 390px + 768px + 1280px horizontal-scroll check. W11 is the first; codify it in post-merge-smoke.mjs.

I. **The "no fake it" convention.** The c12 sitting's best discipline: "nothing is faked further in the meantime; the parse stays exactly where it is and nowhere new." Codify as a standing rule: any display-shaped value used as data must carry a `// DISPLAY-SHAPED` comment and be gated by a law. The ring parse was the example; there will be others.

J. **Vapor-mode follow-up.** My earlier experiment saved ~7.7 KB but typecheck failed. Re-run after the typecheck fix. Single-file HTML budget (offline, no build step) gets a real win if it holds.

## Weakest point of this sitting (per review rules)

Stage 13b is still open. The c12 sitting is honest about it, and the mutant-level proof + the guard's UNRUNNABLE branch establish the mechanism, but "F20 … DIED — FAIL L13" by name is not yet on record. Until the full hardened re-run completes, the board battery's anti-tautology guarantee is not established. This is the first command of the next sitting, and I am not quoting 13b as closed.

## Additions I am offering (not rejections)

1. The slice battery determinism fix (brainstorm A) — one battery change + one manifest re-pin. Eliminates the T8 block forever.
2. The falsifier guard extraction (brainstorm G) — one refactor, protects all future falsifiers.
3. The `// DISPLAY-SHAPED` convention (brainstorm I) — docs only.

None block the sitting's delivery; all three are P3 additions.

## Label

VERIFIED: md5 re-verify (37/37), T2 receipt (700/9000 → 0), T4 proof (tampered FAILS, clean passes), T3 repoint (277/286 → 286/286), falsifier receipt (F20 = RED ELSEWHERE), host counts (48/1/51/49 ×4), L18/L19/L20/L21/W8/W10/W11/S4 laws all VERIFIED PASS per receipts.
REPORTED: engine 430/430, node 33/33, slot 28/0, visual 15/0, board 15/0, slice 29/0/10/3, contrast 2/0 — quoted from the sitting's receipts, not re-run by me.
INFERRED: the 380 ms guard window is a task-boundary proxy (the report calls it a "guard window"; I agree with the choice but the timing semantics are not documented in code).
UNKNOWN: the full hardened falsifier re-run (all 9 cases DIED incl. F20 by name) — not completed this sitting; the mutant proof is in, the full run is the next sitting's first command.
