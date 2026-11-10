# Questionnaire — the flex derivation decisions (for the Owner)

**From:** MUSE (High Councillor) · **Date:** 2026-11-10 · **Purpose:** you asked for a questionnaire so you can make decisions anywhere there is tension, or about general concepts or specific mechanisms. This is written for a total layman — no formulas, no jargon without an explanation. Answer as much or as little as you like; skip anything that doesn't matter to you.

---

## First, the setup in plain English

**What is a flex price?** When you play a player out of his natural position — a tight end at safety, a center at tackle — he plays worse. The flex price is how much worse, in overall-rating points: 0 (free), 2 (slight), 6 (real), or 12 (heavy). Your hand-priced table has 99 of these moves.

**What has the council been doing?** Instead of you hand-pricing every move forever, the council has been trying to find a *formula* that derives the prices from a few inputs — so the same formula can price football moves, and later basketball moves, without anyone hand-writing each one. The formula is judged against your 99 rules: how many does it get exactly right?

**What does "the 99 are a guide" mean?** Your words: you don't care about hitting 99/99. The 99 rules are your judgment, and the formula should be judged on whether it captures your judgment — not on whether it matches every single number. A formula that gets 98/99 with one honest, explained miss can be better than one that gets 99/99 by cheating (adding hidden exceptions).

**The two ingredients.** Every design the council produced has the same two ingredients, and this is the most important thing to understand:
1. **Can this body do that job?** A safety who can't cover is not rescued by being fast. The price is set by what the destination job demands that the source body lacks. (The council calls this the "ability layer.")
2. **Can you cheat by moving talent up the value ladder?** A cheap player moving to an expensive spot has to pay at least the value difference — or everyone would do it. A $2M player moving into a $20M job can't be free. (The council calls this the "guard" or "value ladder." It comes from the slot weights alone — no fitting, no hand-tuning.)

**What are "pins" / "exceptions"?** Sometimes the formula gets a row wrong and the only fix is to tell it "this one costs X because the Owner says so." That's a pin — a named, visible exception. A formula with 0 pins derives everything; a formula with 11 pins has 11 hand-written exceptions. Fewer pins is more honest, but a few named pins for your deliberate judgments can be fine.

---

## Part 1 — The big-picture questions

**Q1. What should a flex price feel like to a player?**
When someone moves a player out of position in your game, what should the experience be? A realistic cost (the player is genuinely worse at the new job)? A fun tax (you can do it, but it stings)? Something that mostly stops silly moves but allows creative ones? There is no wrong answer — it shapes how harsh the formula should be.

**Q2. How close does the formula need to get to your 99 rules?**
The council's best designs land at 98/99 (one honest miss), 99/99 (with 3 named exceptions), or 84/99 (zero exceptions, simpler). Which of these feels right to you?
- (a) 98/99 with one named, explained miss — the most honest.
- (b) 99/99 with 3 named exceptions — perfect, but with 3 hand-written rows.
- (c) 84/99 with zero exceptions — simpler and cleaner, but 15 rows off by one step.
- (d) Something else — tell me what "good enough" looks like.

**Q3. What matters more: the formula being beautiful and portable, or it matching your 99 exactly?**
You said the most beautiful formula that is also the most portable wins. If a beautiful, portable formula gets 84/99 and an uglier, football-only formula gets 99/99, which do you pick? Or is there a floor — a fit below which beauty doesn't matter?

**Q4. Should the game show simple labels while the engine uses exact numbers?**
Claude's proposal, which the council's measurements support: compute the exact penalty underneath (a sliding scale — the engine sees the difference between 5.9 and 6.1), but show the player simple labels (Free / Slight / Real / Heavy). The labels are real — they cluster where your judgment clusters — but the engine keeps the fine differences. Does that split feel right? Or should the engine use the same simple labels the player sees?

**Q5. What does "portable to basketball" mean to you?**
Same formula, different positions and duties — so basketball reuses the football math with new inputs? Or just the same *idea* (jobs demand things, bodies supply things, the price is the gap)? How much sameness do you actually need?

---

## Part 2 — The two ingredients

**Q6. Do you agree both ingredients matter?**
Ingredient 1 (can this body do that job?) and ingredient 2 (can you cheat by moving talent up the value ladder?). Is there a move where you think only one of them should count? For example: a great athlete moving to a cheap spot — should he pay for what he can't do, even though he's moving *down* the ladder?

**Q7. How should the two ingredients combine?**
When both ingredients say something, how do they add up? Two options the council measured:
- (a) **Take the worse one.** The price is whichever ingredient costs more. (A safety who can't cover pays for the coverage gap; a cheap player moving to an expensive spot pays for the value gap — whichever is bigger wins.) This is what Inkling's merge does, and it measured better.
- (b) **Add them together.** The price is the ability gap PLUS the value gap. This is what Claude's design does, and it measured better *under his* ability layer — but worse under Z.ai's.
- The honest answer from the council is that it depends on which ability layer you pick. Do you have a gut feeling — should the price be "the worse of the two" or "both added up"?

**Q8. There's a third idea: the price of LOSING the player from his old spot.**
The center is the hub of the offensive line — he calls the protections, he snaps the ball, everyone else lines up by him. When he leaves to play tackle, the whole line has to reorganize. That's a cost the first two ingredients don't capture (they only look at what the new job demands). Z.ai tested a fix: one number per role for "how much does it cost when this player leaves?" For the center it's 3 points, and it closes the one remaining miss. Should the formula price what you lose at the old spot? Or is that already covered by the first two ingredients?

---

## Part 3 — The specific decisions (where the council disagrees)

**Q9. The three "just-in-case" exceptions.**
The merge gets 99/99 only by keeping three named exceptions: a fullback moving to running back, a fullback moving to tight end, and a center moving to guard. In all three cases the formula says "this should cost more than you priced it" — but you priced them low on purpose (a fullback is a just-in-case body; a center moving to guard is cheap because guards are better athletes). Should the formula keep three named exceptions for these? Or should we change the formula so it matches them naturally (and risk breaking other rows)?

**Q10. The floor — should we delete it?**
Right now there's a rule: any player switching from offense to defense (or vice versa) costs at least 6. Inkling measured that the ability layer *already* prices every cross-side move at 6 or more — so the floor does nothing. It's dead weight. Should we delete it? Or keep it as a safety net in case a future version of the formula prices a cross-side move too cheaply? (The fullback is exempt either way — players who can play fullback for free stay free.)

**Q11. Center to tackle (your 12) — which explanation feels right?**
Your table prices center-to-tackle at 12 (heavy). The formula can now reach 12 two ways:
- (a) **The value ladder:** a center is a cheap spot, a tackle is an expensive spot, so the guard alone prices it at 12. No extra mechanism needed.
- (b) **The exit premium:** the 12 is about what you *lose* at center (the hub, the line calls), not about what the tackle job demands. A worse body (a defensive tackle) moving to tackle only costs 6 — which proves the 12 isn't about the tackle job.
- (c) **Just accept it as the one honest miss** (98/99) and name it.
Which explanation feels true to you in football terms? Or do you not care which mechanism, as long as the number is 12?

**Q12. The center's pass-blocking score — do you agree it must be a pair?**
Your change (center's pass-blocking from 9 down to 6) only works honestly if it moves as a pair: the center's *body* goes to 6 AND the center's *job* goes to 6. If only the body moves, the center's own job demands more pass-blocking than his body has — which breaks the rule that every job must be doable by its own starter. Two seats verified the pair changes nothing in the fit. Do you agree the pair is the honest form? (This is a small detail, but it affects how duty scores get edited in the future.)

**Q13. Which ability layer should Claude build on?**
The council's favorite is Z.ai's (98/99, zero exceptions, the most principled). Inkling's merge adds the guard on top (99/99 with 3 named exceptions). VLOC's is simpler but gets 84/99. Super's is new but gets 50 exact. Glyph's is a framework, not a calibrated answer yet (60/99). Do you want Claude to:
- (a) Build the merge (Z.ai's ability + the guard, 3 named exceptions)?
- (b) Build Z.ai's ability layer alone first (98/99), and add the guard later?
- (c) Build his own merged version from scratch (his proposal) and compare it against the council's?
- (d) Something else?

**Q14. OR's 5-skill design — physical attributes vs job duties.**
OR submitted a design built on five physical attributes: strength, speed, height, technique, mentality. Every position gets five numbers, and the price comes from how different the two profiles are. It gets 25/99 exact — the lowest fit in the field — but OR argues it's the most portable and beautiful (one formula, any sport, five numbers per role). The rest of the council converged on *job duties* (what the job demands: pass-blocking, coverage, snapping) rather than physical attributes, and you said you prefer positional requirements over arbitrary attributes. Does OR's attribute-based design feel wrong to you? Or is there something in it worth keeping — for example, height as a first-class skill in basketball, or the idea of charging for how *different* two profiles are (not just what one lacks)?

**Q15. The 190 moves your table doesn't price.**
There are 289 possible position-to-position moves (17 roles × 17 roles), but your table only prices 99. What should happen to the other 190?
- (a) **Free (0).** If you didn't price it, it costs nothing. (This is OR's convention.)
- (b) **Forbidden.** If you didn't price it, you can't do it. (This is closest to how the current table works — only listed moves are allowed.)
- (c) **Priced by the formula.** The formula prices all 289, and your 99 are the test set. (This is what a real derivation would do — but Claude found that "which moves exist" is not derivable from the formula alone; his best rule for guessing which moves are allowed got 80%.)
This matters because it decides whether the formula is a *pricing* tool (for moves you've already allowed) or a *permission* tool (it decides which moves exist).

**Q16. Basketball — who writes the first table?**
Everyone agrees: before anyone writes basketball duty lists, the first step is a small hand-priced table (about 25 cells) of basketball moves — the oracle the formula gets tested against. Do you agree? And would you write that oracle yourself, or should the council draft one for you to correct?

**Q17. A small measurement disagreement — does it matter?**
Three rows (center-to-defensive-tackle, center-to-guard, outside-linebacker-to-tight-end) where Inkling's check of the guard differs slightly from Claude's and mine (by 2–3 points out of 20). The direction is confirmed — the guard works — but the exact numbers differ by a hair. Does this matter to you, or is the direction confirmed enough to proceed and reconcile the detail later?

---

## Part 4 — The process questions

**Q18. Merge now, or ability-only now and guard later?**
Inkling says the merge is measured and ready (99/99 with 3 pins) — build it now. VL says adopt Z.ai's ability layer now (98/99) and add the guard next round — more cautious. Glyph splits the difference (ability now, merge as the evolution). Which pace do you want?

**Q19. Who builds it, and when?**
Claude is the Architect and sole implementer. Do you want him to build the merged version now (he asked "do you want me to go ahead?"), or do you want to decide the shape first from this questionnaire and then have him build exactly that?

**Q20. What does "done" look like?**
When will you know the derivation is good enough to adopt? Is it a number (98/99? 99/99 with 3 pins?)? Is it a feeling (the formula's disagreements are all ones you agree with)? Is it a test (it prices a basketball move correctly without being told)? Tell me what the finish line is.

---

## How to answer

Reply in chat, or write your answers on this file — whatever is easier. Number your answers (Q1, Q2, ...) so I can map them. Skip anything that doesn't matter. If a question is confusing, say so — that tells me the explanation needs work, which is itself useful.

**What happens next:** I'll take your answers, write up the decisions, and (if you want) draft the prompt for Claude to build the merged version in the shape you chose.
