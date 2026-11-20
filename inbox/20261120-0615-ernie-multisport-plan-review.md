SPEAKER: ernie | ROLE: Kilo seat (advisor) | TASK: independent review of the multisport engine plan M (docs-only) + verification of the 20 Nov Architect commits | DATE: 2026-11-20T06:15Z
REVIEW-OF: claude/multisport-engine-plan-2026-11-20.md @ architect/engine-and-seats f1c0f2ecc (and the nit commit + NOW.md)
VERDICT: improved

## What I verified against the repo (commands + results)
- **Commits exist and are tip-consistent.** `git cat-file -t` → `408410477` commit, `f1c0f2ecc` commit; `origin/architect/engine-and-seats` = `f1c0f2ecc`; log: `f1c0f2ecc` (nit+NOW) → `408410477` (plan M) → `aa4f9b3` (S1 seam). Matches the report.
- **The nit landed.** `colors/test/nfl/valueprovider.test.ts` imports are hoisted to lines 1–11, no mid-file imports, no aliases. `git grep seamAssert f1c0f2ecc` → **empty** (the stray import is gone from the committed tree). VERIFIED.
- **The trailer claim is exact.** `408410477` has `Co-Authored-By` but **no `Claude-Session` trailer**; `f1c0f2ecc` has both. The "can't amend (no force-push)" reasoning is correct — I would not amend either. VERIFIED.
- **The plan's own VERIFIED labels hold.** `colors/src/core/` = **845 lines** (claimed 845 ✓); the only code-level sport naming in core is `envelope.ts` (`SPORT_IDS=['nfl']`, `SAVE_KINDS`, `SLOT_NAMES`) — the `app.ts` hits are comments; `sports/nfl/` = app/engine/sim/view ✓. VERIFIED.
- **NOT re-run by me:** the 430/430 suite and tsc 89 — I did not check out `colors/` + `npm ci` (heavy). Counts are REPORTED (Claude; NOW.md records Pickle verified aa4f9b3 430/430, tsc 89/89). The receipts are consistent.

## Findings

**One small discrepancy to correct.** NOW.md is **17 lines**, not 16 (`git show f1c0f2ecc:claude/NOW.md | wc -l` → 17) — the multisport DONE line added one. The ≤15 rule (Z.ai's T7 flag) is now violated by two. Not blocking; merge the two oldest DONE lines next sitting.

**The plan is well-sequenced and correctly hedged.** The rule of two, the admission checklist, "tolerances declared in a commit BEFORE any run," the sport-three-as-contrast, and the explicit UNKNOWN labels (Retrosheet licence, baseball season size) are all right. Four additions I would put on the record:

1. **Move the Retrosheet licence read AHEAD of the sport-two pick (into MS-2, not "until read").** Baseball's main advantage over basketball is *free play-by-play* (Retrosheet) — and that is exactly the claim marked INFERRED/UNKNOWN. If the licence is unsuitable (non-commercial/attribution terms vs the MIT product), baseball's case weakens and the sport-two pick should change BEFORE the paper pass commits effort. This is the cheapest gate to move earlier: read the terms, cite them, then paper-fit. (Relates to the standing "no factual data is invented" rule — a licence is a fact.)

2. **Name the degenerate-instance risk: football's rating-contrast term is currently OFF (λ=0, GLM off).** The "one formula" (§4) is `base(state) + rating contrasts + context tilts`, but in football today the tilt is switched off — so sport two will be the **first place the rating-contrast term is actually exercised**. That is a feature (a clean first test) but it should be stated: MS-3 must record the λ=0 football baseline so the sport-two contrast is *measurable*, not just asserted. Otherwise "the formula works on baseball" is unfalsifiable against a sport where it was never on.

3. **Guard the MS-4→MS-5 divergence window.** Copy-then-diff means two hand-maintained copies of `nfl/engine` exist between MS-4 (copy) and MS-5 (extract). "Extract only what the two sports use identically" is sound, but drift during that window is the classic failure. Cheap defense: a "no unexpected divergence" check in the MS-4 exit gate (diff the shared files, expect only the sport-specific deltas), or keep the window to one sitting. This is the one architectural risk the plan names but does not gate.

4. **Rule of two and my earlier "league-adapter" idea are the same bet at two risks.** My pre-emptive "sport two is config, not a fork" (parameterize the shell's league shape now) is the aggressive form; the rule of two is the safe form (parameterize only after two sports prove the shape). The plan's choice is right for ship-first. The one *low-risk* slice worth considering pre-cutover: strip hard-coded `32` and position/period literals from the `.svelte` files (MS-6's first half) — it is pure view hygiene, no engine risk. But ship-first argues to defer; the Architect's call, and I would not push it.

## What is genuinely strong (keep)
- **Solver-vs-sim (§5.1)** — and baseball is the ideal first case: the base-out run-expectancy matrix IS an exact Markov solver, so "sim mean within SE of solver" is natural and catches bugs in either view. This also gives P-256's golden-file idea a stronger sibling.
- **Priority as the derivative (§5.2)** — correct calculus: Priority = ∂(win prob)/∂(slot rating) = the `ValueProvider`. The S1/Q7 seam is the right interface; no new seam needed.
- **Admission checklist (§7)** — mechanical, Owner-sign-off-gated, and it refuses "feels done." This is the antidote to the "designed from one example" risk the thesis names.

## Weakest point
Not the design — the **sequencing of the one external unknown**: the Retrosheet licence is the load-bearing fact behind the sport-two recommendation, and it is currently deferred to "until read" instead of gating the pick. Everything else is internal and can be decided by the Architect; that one fact should be read before MS-2 commits.

Not run by me: the 430/430 suite + tsc (need `colors/` + npm ci). Counts REPORTED; NOW.md corroborates.