# Council — innovation round on the new direction (P-345): brainstorm the play-level engine, don't just test it

This is a different kind of round. Follow-up 4 still stands — the testing work continues, the review backlog still needs seats, and if you came to test, test. This prompt is in addition: **the Owner wants the council to think, not only check.** The strongest members should take the thinking work here — Pickle is the one he named, and the record backs it: his P-341 answer (the fact-shaped vs worth-shaped split, the 15-row table that reproduces exactly, the E < 0.222 acceptance test for the FB straddle, the per-slot C>OG proposal) is the clearest statement of why the Ledger wins, and his P-141 review re-ran the Z-post-blue engine in node and found a real defect (playerWar = 0 for FB/P) nobody else had caught. That is the standard for this round: ideas with receipts, strong enough to become P-items.

## The new direction, as it stands

- **The Owner approved the direction + Phases 0 and 1 (11 Nov).** One play-level event-sourced model, two views (Monte Carlo + exact solver), strangler delivery — Claude's design (`a0ddc584`, REVIEWED, toy kernel reproduced 5 times). The old drive engine stays as the oracle and the plumbing until the new model earns the cutover. The totals bar is ~10% on most metrics ("general sense of realism, don't need to actually model 2025 nfl data").
- **Phase 0 kernel landed** (architect `7b34a58`): keyed RNG, event log, folds, model pack + legacy adapter; the gate passes (fold(log) deep-equals GameResult and BoxScore on 60 seeded games, playoff and overtime included). MUSE reviewed it (improved) — one real defect: the Philox multiplier is wrong (`0xD256D193`; the Random123 standard is `0xD2511F53`), and the three "known-answer vectors" are outputs of Claude's own code, not the published ones. Claude is being prompted to fix it before Phase 1. **If your idea touches the RNG, use the corrected constant.**
- **Phase 1 baseline is starting** (all λ = 0) with the P-344 data now delivered (nflverse 2016–2025, summaries + league means/SDs on council/muse `c7540b04`): points 22.78 ± 10.00, drives 11.09 ± 1.68, plays 81.46 ± 9.61, yards 343.67 ± 84.77.
- **Z.ai's full-rebuild attempt is the counter-data-point** (PLAYLED, council/glyph `0f8deac6`, MUSE-reviewed ok): the rebuild does NOT clear the bars today — possessions −27% (8.0 vs 10.9 drives), weak-side points −39%; the gap is located (chain-length), not closed. His verdict: the Ledger path (drive engine authoritative, plays staged inside drives) is the way forward. The Ledger Phase 1 is REVIEWED: FB 0.1265 play share (scarcity), DIME 0.0694 vs the engine's 0.15 (the live disagreement), WR1 trigger re-fired to 4.37 doubles/team-game.
- **The binding constraints** (Owner Q&A, unchanged): OVR + preferred position are the only true inputs; no gates, no floor, no named exceptions, no pair tables, no per-player style labels, no intangibles; the 99 rules are a guide, not a target; beautiful and portable wins over fit; dual positions free; gravity is now; 3-4 and 4-3 as close to even as possible.

## The questions — pick one and think it through

**1. λ identification — the largest risk in the design.** DS D4 (needs one more re-run): analytic dispersion matching overstates λ by 23–75%. DS D3: λ and θ are not separately identified — freeze θ. How do we identify λ from OVR-only data at all? Is there a different estimator (a moment, a calibration target, a held-out prediction) that identifies it cleanly? What data *would* identify it — and is that data public, or does it need the Owner? A better identification story is worth more than a better fit.

**2. The chain-length gap.** Z.ai's PLAYLED is −27% on possessions with the gap located (chain-length), not closed. What closes it — a drive-model artifact, a play-model problem, or a calibration issue? Is there a staging of plays inside drives that preserves the drive engine's totals exactly while giving the Ledger real plays? The Ledger path needs this answer.

**3. The two-view design.** Claude's one model, two views (Monte Carlo + exact solver). Is that the right shape? Where does the exact solver actually pay — and where is it a second implementation to maintain for nothing? What would a better decomposition look like: a single view, a different split between the stochastic and the exact parts, a third view (a fast approximate solver for the draft board)?

**4. Gravity as a formally measured stat (P-335).** Double teams, usage, defensive gravity — measured and shown in advanced stats, possibly inside the formula itself. How do you measure gravity from an event log? What does the event schema need to carry that it doesn't (a double-team flag? a coverage assignment? a usage share per play)? What is the cleanest first measurement — one number per game that would convince the Owner it is real?

**5. Dual positions (P-336).** Free between your own two positions, assigned by the Owner (Jokic PG+C, Travis Hunter CB+WR). How does the engine represent a two-position player — one player, two slots, or two entries? What breaks: the draft board (does he appear twice?), the lineup (does he occupy one slot or two?), the flex pricing (is the second position free, or free *up to* something)?

**6. Late-round draft seamlessness (P-337).** Last rounds simple, first ten deep fun. What does the draft need — in the model, not just the UI — to make the last rounds feel simple without being empty? Is there a point where the board should stop ranking and start suggesting?

**7. Position testing (P-338).** Which positions NOT in the game should be tested — big nickels / SS2s, the DL5 blitzer, others — and what would their value, drift, and flex penalty look like? Which positions are *naturally* prohibited (no formula needed, the engine just never sends anyone there), and how would you know?

**8. A sharper Phase 1 gate.** The ~10% totals bar is the Owner's, and the margin distribution is shape-only. Is there a sharper gate — one number, or one falsifiable prediction, that would tell us in Phase 1 whether the play-level model is on the right track? What would falsify it?

**9. Folds as the product surface.** Recap, standings, stat leaders as folds over the log — the game after play N, counterfactuals, branching from any event. What becomes possible that the old engine couldn't do, and what should the first fold-built feature be?

## What to file

- Ideas as inbox filings: `inbox/<UTC>-<seat>-P-345-<slug>.md`, first line `SPEAKER: … | ROLE: … | TASK: … | DATE: …`, then `FOR: P-345`. Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN, as usual.
- A good filing: the idea, why it matters, what would falsify it or prove it, and what it would take to test (data, a script, or a prototype that runs). A prototype that runs and prints a number beats a paragraph that asserts one. If your idea needs data that doesn't exist yet, say exactly what it is — that is a useful filing.
- **No verdicts, no checkmarks on this round.** Ideas are not reviewed into REVIEWED; the Owner decides which ones become P-items. Discussion rounds are welcome: read another seat's idea, extend it or break it, file your own.
- If you find a real defect in the design or the direction, say so plainly with the receipt (command + output). A negative result with measurements counts — "this shape cannot identify λ, here is the proof" is a successful filing.

## How to work

- Take a question above, do it or file it, and push after every finished file/task — commit and push often, WIP if a chat gets long. A timed-out chat loses unpushed work; a pushed commit survives it.
- **Oracle discipline:** before re-running any derivation, check your flex.json rule count. 99 rules = live (architect `97d7e9d` or the corrected council/muse mirror). 107 rules = retired REV 4 — do not use it. Name the oracle (branch + commit + rule count) in your filing's method.
- Do not assign work to a named agent. Do not touch the product file or the engine — only the Architect builds those. Do not review your own work.
- If you find an error in MUSE's numbers, correct the record — Inkling and Glyph both did, and the record is better for it.

## Innovate

This is the innovation round, so the section is the job: the Owner has said he wants the best, most beautiful formula and engine possible and does not care about the time and cost of the work. Design for that, not for the fastest fit — and if the best idea you have contradicts something already decided, file it anyway with the evidence. The direction is a feeling that can be adjusted, and the council's job in this round is to give the Owner something worth adjusting it toward.
