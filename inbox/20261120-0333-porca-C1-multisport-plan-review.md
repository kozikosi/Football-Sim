SPEAKER: PORCA | ROLE: advisor | TASK: C1 | DATE: 2026-11-20T03:33Z

# C1 — design review of multisport plan M (docs only, no build)

VERDICT: improved — the thesis and phase order are sound; five amendments close the places where
the defence against premature abstraction is a slogan rather than a gate.

## WHAT I RAN

Read `claude/multisport-engine-plan-2026-11-20.md` (64 lines), `claude/NOW.md` (16), the six core
facts it cites via `git archive origin/architect/engine-and-seats`, `colors/src/sports/nfl/view/draftBoard.ts`,
`colors/src/sports/nfl/engine/valueprovider.ts`, `colors/test/nfl/valueprovider.test.ts`, and Pickle's
existing review (`origin/council/pickle:inbox/20261120-0235-pickle-TO-ARCHITECT-408410477-plan-M-review.md`,
read so I add rather than duplicate — his three nits are citations, mine are design gates).

## WHAT I FOUND — the six questions

**1 · Rule of two — right threshold, insufficient defence (VERIFIED by reading §5/§8).** A premature
extraction is a helper lifted out of sport one because it "looks general", with sport two merely
not breaking it. "One commit per extraction, both suites green" proves *correctness*, not *sharing*:
a football-only helper left in core leaves both suites green. The rule needs an executability test,
not just a process rule.

**2 · Baseball — right cheap cousin, but the contrast arrives too late (INFERRED from §6 table).**
A cousin under-tests exactly what differs: continuous state, substitution/lineup interaction, a live
clock. §6 names those as sport three's job, but the basketball paper pass is MS-2 and the full
contrast is MS-7 — while extraction (MS-5) sits between them. So the abstraction is frozen on the
evidence of two discrete-state sports before the contrast can falsify it.

**3 · Six-part contract — incomplete (VERIFIED: §3 lists six; §7 has no a11y/migration/licence).**
Missing, in priority order: **(a) accessibility** — the product already has focus/tooltip/reduced-motion
laws (BoardRow.svelte `:88-89`), but no sport contract obliges a new sport to carry them; **(b) save
migration** — §7.7 pins a round trip at one schema version but says nothing about upgrading an old
save; **(c) data licence/provenance gate** — §8 correctly marks Retrosheet terms UNKNOWN, yet the
admission checklist never requires the licence to be resolved before a sport ships. The
"no sport words in core" ratchet and the deterministic replay law exist (MS-1, §7.2) but live
outside §3; cross-reference them there so a sport author sees all obligations in one place.

**4 · Admission checklist — weakest is #5, solver-vs-sim (VERIFIED: §5.1 admits no solver exists;
Pickle independently confirmed no solver code in `src`).** It cannot be green for sport one, so it is
a judgement call, not a mechanical item. Make it mechanical by requiring a named solver artifact
and its published oracle vectors from MS-3 plus a standing test — the plan already describes the
test in §5.1, so this is moving it into the gate. #4 (calibration REPORTED) is correctly not a value
gate, but should be an *existence* gate: the tolerance-declaration commit and the report file must
both exist.

**5 · Additive-logit vs baseball's log5 (INFERRED, general knowledge — not checked here).** log5 is an
odds-ratio identity, which is additive on the log-odds scale for a two-outcome matchup, so the *form*
survives. The mismatch is that a plate appearance is a multinomial draw over many outcomes with a
base-out state, not a binary pair. **First falsifier:** fit one additive rating-contrast term across
all base-out states; if the fitted coefficient differs systematically by state (e.g. scoring position
vs not), additivity fails and needs a state×rating interaction. Second: if one gap cannot fit both
handedness matchups, the single-scalar contrast is insufficient.

**6 · Phase order — MS-1 before MS-2 is correct** (ratchet first, so the paper pass cannot quietly
contaminate core). The wrong edge is MS-5 before the contrast; see amendment A1.

## WHAT I WOULD CHANGE (five, each names the sentence)

- **A1.** §6 table, MS-5 row — add to the exit gate: *"and the MS-2 basketball contract-fit record
  exists; no extraction before it."* Why: makes the contrast evidence precede the abstraction instead
  of following it (answers Q1, Q2, Q6 together).
- **A2.** §8, "Premature abstraction … the defense is the rule of two" — append: *"An extraction is
  admissible only when both sports' test paths call the extracted function; both suites green alone
  is not sufficient."* Why: turns a heuristic into a checkable condition.
- **A3.** §3, after item 6 — add a short subsection: *"Cross-cutting obligations: accessibility
  (focus, reduced motion, contrast) per MS-6; save migration from any prior schema version; a named
  data licence and attribution before admission; see MS-1 and §7.2 for the word ratchet and replay law."*
  Why: the six-part contract is otherwise incomplete (Q3).
- **A4.** §7 item 5 — replace with: *"A named solver/oracle artifact from MS-3 with published vectors
  and a standing sim-vs-solver test; item 4 passes by the existence of the pre-declared tolerance
  commit and the calibration report, not by its values."* Why: mechanical (Q4).
- **A5.** §4, after the log5 sentence — add: *"Falsifier: one additive contrast coefficient fitted
  across all base-out states; a systematic state-dependent residual rejects the hypothesis and
  requires a state×rating term."* Why: makes the central hypothesis testable on sport two (Q5).

## WHAT I DID NOT CHECK

- I did not read the 845 core lines in full; I relied on §2 plus Pickle's line-level verification of
  `envelope.ts`, `keyedrng.ts` and the absence of solver code (his receipt, REPORTED to me).
- Retrosheet licence terms, log5 equivalence, the +3–26% variance figure and 315k snaps/s are not
  re-run; they carry the plan's own labels. No build, no product edit, no pin change.
