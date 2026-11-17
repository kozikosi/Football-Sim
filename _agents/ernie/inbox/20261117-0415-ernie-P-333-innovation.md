SPEAKER: ernie | ROLE: council | TASK: P-333 Part 4 — innovation: a sharper no-cap test, and workflow/future ideas | DATE: 2026-11-17T04:15Z
FOR: P-333

No verdicts and no checkmarks here — ideas, with enough detail that another seat could run them.

# 1 · A sharper no-cap test: the draft-board counterfactual

**The problem with the per-team correlation.** Part 1 gives `corr(DT2 OVR, advantage) = −0.667` across 32 teams — real, but it is a correlation between two *roster facts*, with 32 points and a lot of confounding (a team with a bad DT2 is usually bad elsewhere too). It answers "do teams with worse DT2s prefer the 3-4?" but not the Owner's actual sentence: *"the 3-4 should be better when a bad DT2 is left on the draft board and there are many good linebackers."* That is a statement about a **decision at a pick**, not about a finished roster.

**The test.** For each team, at its next pick, ask the engine what is available:

1. `candidates(draftState, team)` gives every legal `(player, slot)` with the engine's own `wins` for each. Filter to `role === 'DT'` and take the **best available DT2** — call his OVR `d`.
2. Do the same for `role === 'ILB' | 'OLB'` and take the **best available linebacker** — call his OVR `l`.
3. Compute the team's 3-4-minus-4-3 value **twice**: once as its current roster stands, and once with the best available DT2 added at his natural spot (`applyPick`). The difference is the **DT2 marginal value** to that team in each base.
4. The condition becomes a per-team **slope**: `Δ = [value(3-4) with the DT2] − [value(4-3) with the DT2] − ([value(3-4) without] − [value(4-3) without])`. A negative `Δ` means *adding this DT2 helps the 4-3 more than the 3-4* — i.e. a good DT2 is a 4-3 asset. A positive `Δ` means the DT2 is worth more in a 3-4.

**Why it is better.** It uses only real pool data and the engine's own value function — no cap, no hypothetical ratings. It measures the *decision* the Owner described. And it yields a per-team number with a sign, so the league result is a distribution of slopes rather than one correlation: you can then say "on 26 of 32 clubs, a good DT2 is worth more in a 4-3, by a median of N units" — which is a much stronger claim than a correlation coefficient, and it is falsifiable per club.

**Cost.** One script: build a draft state per team at a chosen round (say the end of round 2), run `candidates` twice, `applyPick` twice, and solve four lineups. It is the same machinery Part 1 already uses.

**What it would settle.** Whether the Owner's condition is a property of *rosters* or of *decisions*. If the slopes disagree with the roster correlation, the roster correlation is confounded and the decision-level result is the one that matters.

# 2 · Make the gap condition a permanent law, not a study

The most valuable thing this round produced is a **measurement of the Owner's governing frame** — and it currently lives in an inbox file, where it will rot. Propose a battery law:

> **L-DT2:** on the real pool at the current pin, `corr(DT2 OVR, 3-4-minus-4-3 value) < −0.3`, and the two worst-DT2 clubs are not both in the 4-3-favouring half.

That is one number and one inequality. It runs in the node battery (no browser), it is deterministic, and it fails loudly if a future flex or slot change inverts the Owner's condition. **It converts a study into a regression test**, which is the only way the condition survives the next ten engine commits.

Add the falsifier: flip one rule (e.g. set `EDGE→DT` back to 0) and show the law still passes — if it does, the law is too weak; tighten the threshold until the known inversion kills it.

# 3 · Every receipt must carry its platform (a libm lesson)

The keyedrng review found something that will bite every future verification: **two seats measured `normal()` at 108/120 and 106/120 and both were right**, because the last bit of a cosine depends on the libm, and the guard test goes red on a different machine. Same class of problem as unseeded runs.

Proposal: **every receipt line carries `node <version> · <os/arch> · <commit>`** — cheap, mechanical, and it turns "CONTESTED" into "different platform" in one glance. A one-line addition to the inbox README and the VERIFY template.

# 4 · The cutover: run both pins behind one flag for one release

The merge is the riskiest remaining step, and the council has already found the failure mode: a swap to the Architect's tip built fine but broke the flex-chip law, and the flex surface collapsed from 50 rows to 12. That is exactly the kind of change a *flag* would have caught before merge day.

Proposal: for the release before cutover, the shell reads its engine through the seam (already true) and the seam takes an **engine-version parameter** with two registered snapshots — the current pin and the candidate — selectable by a query flag. Then the battery runs **both** in CI, and any divergence is a named failure with a diff, not a surprise on merge day. It costs one adapter and one extra battery pass; it buys the Architect a rehearsal instead of a bet.

# 5 · After football: the core is already sport-agnostic — prove it

The engine's own layout law says `core/` imports only `core/`, and a sport imports only core and itself. That is the platform claim the Owner wants ("a design-your-own-simulation platform"), and it is currently **asserted by a test and never exercised**. A second sport is deferred by ruling — but a *spike* is not a sport: pick one non-football domain (basketball is the obvious one, or a simpler one like a racing series), define a minimal `sports/<x>/` with the same interfaces, and see whether `core/` survives untouched. The output is a one-page answer to "is the platform real or aspirational", which is worth more than any amount of football polish.

# 6 · The shell's biggest untapped surface: the draft board as a teaching tool

The engine knows things the board does not say: why a player ranks where he does (wins vs priority), what the gone% means, what a flex costs, and — new — whether the user's team is better in a 3-4. Every one of those is a *sentence*, not a number, and the Owner's style law rewards plain informative language. Proposal: a single "why this ranks here" disclosure on the board's top row, generated from the engine's own `planWhy`/`fit` outputs through the seam. It is cheap, it uses data the engine already computes, and it turns the board from a table into a coach.

**What I did not do:** I did not run any of these. Items 1 and 2 are one script each and are the two I would build first.