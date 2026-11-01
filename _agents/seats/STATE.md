# STATE — the one place that says "where are we". Rewritten by the Architect at every handover.
UPDATED: 2026-10-27 (HST) · by: Architect (Claude)

PHASE: **governance + engine math. No UI, visual or copy work until the Owner says "go".** The V23 build has not started. Council work in this phase = ideas, measurements, reviews and tests about the math, the flex rules, the architecture and the process.
FOCUS: P-190, P-197, P-198, P-193, P-194, P-191, P-192, P-196, P-195

## Builds (pins live in BASELINES.md; verify bytes before trusting a name)
- **Pre-Colors** `Football-Sim-PreColors.html` (on `council/base`) sha256 `40233d6be00e987c…`, 657,486 B: the verified base V23 will be built from, by the Architect only.
- **Z-post-blue wave 13** md5 `0cef8bf7a5646bd283c1b687bf740e5c`, 1,247,161 B: Z.ai's prototype. A reference for taste and snippets, **not a build**. No further Z-post-blue waves unless the Owner orders one in chat.
- **V23**: not built.

## The math, in three lines
The position-value table (QB 1000, all tens, modern market logic) is **proposed** in `_agents/ENGINE-MATH-SPEC.md`, with the engine fitted to it by a lab in `tools/mathlab/` (VERIFIED: 29/29 spots reproduce incl. the new DIME slot, no real-world accuracy change, r 0.673 → 0.665 on 32 real rosters). Z.ai's "divide by 2.54" line is **not** an Owner rule (2.54 is the engine's own QB value). The new flex guide is in `tools/mathlab/flex.json` (REV 2, 95 rules, parsed from his text and tested in the live engine).

## Also done (VERIFIED in the lab, nothing in a product file)
Defensive posture cautious / balanced / aggressive (`ENGINE-MATH-SPEC.md` §11): 9 tests pass, EV-neutral, mirror-symmetric, omitted = unchanged. Direction for turning this into an interviewable project: `_agents/ARCHITECTURE-DIRECTION.md` (a proposal; nothing is decided until the Owner says so).

## Waiting on the Owner (nothing else is blocked)
Five approvals in `ENGINE-MATH-SPEC.md` §9: the 29-spot table (DIME 40, K 200) · retiring the 700-scale contract and moving to 29 draft rounds · is the REV 2 flex guide complete (unlisted = not allowed) · QB may flex to WR/S at −6 · NICKEL read literally.

## Branches
`council/base` rules and tools (Architect moves it, fast-forward only) · `council/<seat>` one per seat, only that seat's material (a relayed RETURN BLOCK is saved there by Beam with `tools/seat-save.mjs`; the Architect never writes to a seat's branch) · `architect/*` Architect work · `main` what the Owner pushes directly (Z.ai's package under `z-core/`, logos). Two unrelated histories (base vs main): read main with `git show origin/main:<path>`.

## How work moves (same for every seat)
1. Open chat → read your packet (this STATE is inside it). 2. Take the top item you can do from the ranked list; a REVIEW beats new work. 3. Do it; label claims VERIFIED / REPORTED / INFERRED / UNKNOWN. 4. End with a RETURN BLOCK. 5. The Owner (or Beam) saves it with `tools/seat-save.mjs`; the Architect collects `inbox/` with `tools/council-sync.mjs`; three different seats review; then the Architect builds.
