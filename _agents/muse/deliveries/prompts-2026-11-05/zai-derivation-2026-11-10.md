# Z.ai — Design a formula for the flex table (the derivation)

## What this is

The Owner wants you to think about the flex table's future: instead of 99 hand-set prices, **one formula that produces them**. This is a design and thinking task, not a build task. Do not build anything in the app for this — think, design, and write it up. The Owner particularly wants your thinking here, because you know the UI and the engine's numbers better than anyone on the council.

## The background (what you need to know)

- The live flex table is **99 rules** (23 at 12, 43 at 6, 10 at 2, 23 at 0), built by Claude at `97d7e9d` (D-picks + Owner corrections + the cross-side floor + item 3). The only live table is the Architect's branch.
- **44 rules are priced from D@90** (the displacement-aware theta distance, at theta 1.0, rounded to tiers 0/2/6/12 with cut points 1/4/9). **53 are Owner overrides** — the Owner's hand-set prices that supersede theta.
- **Inkling's P-322 design** (a council seat) derives prices from skill profiles: 9 skills (blocking, catching, coverage, range, rush, run, snapping, kicking, punting), a D term plus a skill-gap term (A) plus an uncertainty term (U), through the cut points 1/4/9. It reproduces the Owner's table at **88/99 exact, 11 off by one tier, 0 hard misses**. With the cross-side floor added as a term, it gives **93/99**. MUSE verified it (P-328) and ran it against the live 99-rule table; Claude independently implemented it and got the same numbers.
- **Claude's prototype** (`tools/mathlab/flexderive.mjs` on `architect/engine-and-seats`, commit `678bb06`) implements Inkling's design as a read-only script. It reproduces MUSE's 88/11/0 exactly. But the Owner is worried Claude is leaning too hard on Inkling's plan — he wants Claude to come up with his **own** design. The same applies to you: do not just re-implement Inkling's formula. Think independently.
- **The principle (settled):** the table's job is **ability distance** — how far apart the two jobs are — independent of how much the destination slot is worth. The optimizer's loss is penalty × slot weight, so a misfit into a 50-weight slot is already cheap through the weight term. Cutting its penalty as well prices value twice. A pure weight formula would also collapse distinct jobs (QB>FS and TE>FS would price the same if they land on the same slot). Do not use destination weight as a formula term. (MUSE tested this: weight alone gets 40/99, weight + groups gets 45/99, weight as an adjustment to Inkling gives net −1/0. It does not help.)
- **The DL5 reframing (Owner, 2026-11-10):** DL5 is a player who comes in for **blitzes and heavier defensive sets**, not a rotational substitute for a DT or EDGE — and since there are no injuries in the sim, **all players are starters**, even if DL5 does not play every snap. This bears on how DL5 is priced (the flex-dl5 derivation is currently the cheaper of role→DT and role→EDGE — if DL5 is a blitzer, the cost to fill it should reflect blitzing, not DT/EDGE similarity).

## What to do

**Design your own formula for deriving flex prices.** Do not just re-implement Inkling's. Think independently about:

1. **What skills matter?** Inkling uses 9 skills. MUSE outlined 15 (splitting blocking into pass/run, coverage into man/zone, catching into catching/routes; adding throwing and tackling — see `inbox/20261110-0500-muse-skills-outline.md` on council/muse). What skills would *you* use? More, fewer, different ones? Say why.
2. **How do the skills combine into a price?** Inkling uses D + A + U through cut points. Is that the right shape? Or should the formula be different — a different combination, a different way to measure the gap, a different set of cut points? Propose your own shape and justify it.
3. **How does it handle the hard cases?** The 6 Inkling residuals (CB>FS, CB>SS, EDGE>OLB, ILB>OLB, SS>DIME, SS>NICKEL — owner 0, model 2). The cross-side floor (WR>DB at 6 — owner 6, model 2 without the floor term). The DL5 reframing (a blitzer, not a rotational DT/EDGE). Say how your formula handles each, or why it treats them as explicit exceptions.
4. **How well does it reproduce the Owner's table?** Implement your formula (as a script, in Python or JavaScript — your choice), run it against the live 99-rule table (read it from `origin/architect/engine-and-seats:tools/mathlab/flex.json`, commit `97d7e9d`), and report: exact matches, off-by-one-tier, hard misses. Compare against Inkling's 88/99 (93/99 with floor). Does yours beat it? If not, say why yours is still worth considering (simpler, fewer constants, more principled, better on the hard cases).
5. **How would the UI present a derived table?** The derivation is the engine's inevitable direction. Think about how the UI shows a derived table instead of a hand-set one: show the reasoning (the skill gap, the D distance) instead of just a number? Show where the formula and the Owner disagree? File this as an IDEA or as a section in your write-up.

## What to deliver (all in one response — the batch rule)

You cannot push, so **complete ALL work before responding** and batch every completed piece into a single response (a single zip). If a piece is blocked, say so and explain the blocker — that is the only reason to respond with work outstanding. Do not respond until all work is complete.

Deliver:
- **Your derivation design** (a write-up: skills, formula shape, cut points, how it handles the hard cases, and why you chose it over Inkling's).
- **Your implementation** (a script that runs your formula against the live 99-rule table and emits a formula-versus-table diff — exact/off-by-one/hard counts, and the list of disagreements).
- **Your fit numbers** (exact/off-by-one/hard, compared against Inkling's 88/99 and 93/99-with-floor).
- **The UI presentation thinking** (how a derived table is shown, as an IDEA or a section).
- **Any IDEAs** that came out of the work (filed, not built).

## Boundaries

- Do not edit the engine, the flex table, or the Architect's branch. This is read-only analysis and design. Do not change any flex price.
- Do not re-pin the snapshot (it stays at `4ca9a071` for this track).
- Do not generate ratings. Do not change the brand. Do not touch Team Select (P-317 stays blocked on the Architect's store change).
- The derivation is a design task. Do not build it into the app. Do not build a UI for it. Think, design, write it up.

## Innovate

Think around this, not just through it. The flex table is 99 hand-set prices; a formula would make it easier to keep honest, and it would settle questions like the 3-4 / 4-3 gap and the low-weight principle by deriving the answer rather than hand-tuning it. If you see a cleaner way to express ability distance — a different skill set, a different combination, a different way to think about what makes two jobs "far apart" — propose it. If you see a way the UI could make a derived table *legible* (showing the reasoning, not just the number), say so. The Owner wants your independent thinking here, not a refinement of Inkling's plan. Brainstorm, improve, create new ideas — any thinking around the issue. The prompt tells you what to design, not how to think.
