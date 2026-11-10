# Council prompt — 2026-11-10: ZAI-D1 + the Owner's score changes, multisport design

**From MUSE (High Councillor). Read the state, take the top work, push often.**

## State

**ZAI-D1 is the leading derivation.** Z.ai designed his own formula ("the load-bearing deficit": `tier(M + 0.4·S)` over 17 scoped duties, NEED/HAVE split, no D term, no overrides, 0 fiat rows). It scores 95/99 on the live table. MUSE reviewed it (VERDICT improved, `inbox/20261110-0645-muse-P-322-ZAI-D1-review.md`) — fit verified by re-running his script, λ ablation verified, all six Inkling residuals at 0 by construction.

**The Owner gave feedback on all four ZAI-D1 residuals, and MUSE tested it.** The Owner's points: centers are shorter and much worse in one-on-one pass protection (worth an extra $10M/year); edges are the best athletes, so EDGE>RB at 6 is more accurate; OTs are that superior in one-on-one pass protection, so OT pass protection must be more heavily prioritized. MUSE tested each point by running Z.ai's own script:
- Raising the PBLK **weight** is the WRONG fix (PBLK 2.0 fixes TE>OT but breaks 4 rules; even 1.65 breaks 2). The weight punishes DL→OL moves that are priced correctly.
- Lowering the **center's PBLK score** is the right fix (C PBLK 9 → 6 fixes C>OG and moves C>OT from hard miss to off-by-one). The Owner accepted C PBLK **6 or 7** as honest.
- Raising **EDGE's CARRY (2 → 4)** fixes EDGE>RB naturally, breaks nothing.
- Lowering **TE's PBLK (5 → 4)** fixes TE>OT, breaks nothing.
- **All three together (EDGE CARRY 4 + C PBLK 6 + TE PBLK 4): 98/99, tier-error 1, 0 fiat rows.** Only C>OT remains (Owner 12, model 6). With C PBLK 7: 97/99 (C>OT and C>OG off by one). With C PBLK 4: 99/99, but the Owner did not choose 4.

Results: `inbox/20261110-0655-muse-ZAI-D1-KG-feedback.md`. Test script: `_agents/muse/deliveries/zai-kg-feedback-2026-11-10.py`.

**The Owner prefers Z.ai's model** — and specifically because the logic generalizes to multisport. A new design note is at `_agents/basketball/README.md` (DESIGN ONLY — basketball is not built until 76 Pancakes is finished and the repo is moved): the formula takes positions, duties, HAVE, NEED, and weights as inputs, so the same formula runs in any sport. Basketball sketch: PG, SG, SF, PF, C; duties like rim protection, ball handling, 3pt shooting.

**Claude's own derivation design is pending — update (2026-11-10, after this prompt was first written).** Claude filed a proposal (verbatim in `_agents/owner-notes/2026-11-10-claude-guard-proposal-verbatim.txt`): `price = tier(max(G, L))`, where G is a guard from slot weights only (`G = 20 × (1 − w_src/w_dst)`) and L is a duty-deficit score in ZAI-D1's style. MUSE verified it (`inbox/20261110-0715-muse-claude-guard-verify.md`): with the primary-slot mapping the guard fixes C>OT and TE>OT but breaks 4 rules (FB>RB, FB>TE, OLB>ILB, OLB>SS) — max(G, L) = 93/99, worse than ZAI-D1's 95/99. The role→weight mapping decides whether it works. **The Owner's direction (verbatim in `_agents/owner-notes/2026-11-10-claude-start-from-scratch-verbatim.txt` and `_agents/owner-notes/2026-11-10-pblk-scores-sufficient-slot-values-not-necessary-verbatim.txt`):** Claude should start from scratch and design the whole thing himself, including the ability side — don't build on Z.ai's L. And the pass-protection score changes were sufficient, so slot values are not necessary; Claude is free to move away from slot values entirely in his new design. A new prompt is at `_agents/muse/deliveries/prompts-2026-11-05/claude-derivation-own-design-2026-11-10.md` (the Owner has it; he sends it when Claude is available). Once Claude files his from-scratch design, the council will compare all three (Inkling, Z.ai, Claude) and find common ground.

**Other open reviews:** P-287 Slice 5 needs **one more** review (MUSE improved + Inkling improved). P-328 needs **two more** (MUSE only). R4 verification is still open (no seat has verified MUSE's R4 independently — the 99/99 Inkling-based variant with 6 overrides + floor + discount + exclusion + re-fit cut).

## Work to take (in order)

**A. Verify the ZAI-D1 + Owner score changes independently.** Re-implement the formula from Z.ai's write-up (don't re-run MUSE's script), apply the three score changes (EDGE CARRY 4, C PBLK 6, TE PBLK 4), and confirm 98/99 with only C>OT off by one. Also try C PBLK 7 and confirm 97/99. Report any disagreement with MUSE's numbers. This is the highest-value verification — the score changes are the Owner's own football reasoning, and they need a second seat's check before they become the working derivation.

**B. Review the basketball folder.** Read `_agents/basketball/README.md` and say whether the multisport generalization is well defined: is the formula truly sport-agnostic? Is the basketball duty sketch a sensible starting point? What's missing? This is a design review, not a build — basketball is not built until 76 Pancakes ships.

**C. Review P-287 Slice 5.** One more seat needed for REVIEWED. The Slice 5 tree is staged on council/uk (`deliveries/67-cakepanz-s5/`). MUSE's review (`inbox/20261110-0515-muse-P-287-slice5-review.md`) and Inkling's (`inbox/20261110-0559-inkling-P-287-slice5-review.md`) are both VERDICT improved.

**D. Review P-328.** Two more seats needed. MUSE's review (`inbox/20261110-0335-muse-P-328-review.md`, VERDICT ok) verified Inkling's P-322 design at 97/8/0. The script is `_agents/muse/deliveries/p328-verify-2026-11-10.py`.

**E. Verify R4 independently.** Re-implement MUSE's R4 variant (Inkling's formula + cross-side floor + same-group A halved excluding FS↔SS + cuts 1.5/4/9 + EDGE>OLB override) and confirm 99/99. Compare R4 vs ZAI-D1 on principle-vs-fit terms: R4 fits perfectly but has 6 overrides + floor + discount + exclusion + re-fit cut; ZAI-D1 fits 98/99 (with the Owner's scores) with 0 fiat rows. Which is the better working derivation? Filing: `inbox/20261110-0700-<seat>-P-322-R4-verify.md`.

**F. Design your own derivation.** For seats that haven't filed one: design your own formula (your own skills, your own combination), score it against the live 99-rule table, and report exactly where it disagrees and why. Use ZAI-D1 (98/99 with the Owner's scores) as the baseline to beat.

## How to work

- Take the top available item and do it, or leave it. Work comes from this prompt and QUEUE.md — never assign work to a named agent.
- **Push as often as possible.** Commit and push after every finished file/task, not just at session end. A timed-out chat loses unpushed work; a pushed commit survives it. If mid-task and the chat is getting long, push what exists (even as a WIP commit) and say so in the bulletin entry.
- Reviews go in the repo-ROOT `inbox/<UTC>-<seat>-<ID>-<slug>.md` with a VERDICT (ok / improved / blocked) and evidence labels (VERIFIED / REPORTED / INFERRED / UNKNOWN). No agent reviews the same item twice.
- **Innovate.** When you work a derivation or a review, think around the problem: is there a duty nobody has named? A simpler combination? A way to capture C>OT naturally? A basketball duty the sketch misses? Bring new ideas, even if they don't fit the current framing. The Owner wants the council to brainstorm and improve, not just verify.

## Paste instruction for the Owner

`git fetch origin && git show origin/council/muse:_agents/muse/deliveries/prompts-2026-11-05/council-prompt-2026-11-10-derivation-ZAI-D1.md`
