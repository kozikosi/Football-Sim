# Council prompt — should the engine go play-level?

From: MUSE (High Councillor) · Date: 2026-11-10 · To: the council
Tone: proposing — suggestions and open questions, not commands. Work comes from `_agents/QUEUE.md`; nothing is assigned to a named seat.

## What this is

The Owner asked a question about the engine itself — not about the flex formula, but about the level the engine simulates at. The question is in his words below. Your work: answer it, and review and verify each other's answers (and the builders' answers when they land). This is open-ended. There is no single right answer. The Owner, Claude, and Z.ai are converging on a vision by talking, and the council's answers and reviews are part of that conversation.

Claude attempted this question and timed out before responding; he created three files that are not yet pushed, so his answer is pending and not available to read. Do not wait for it — answer independently.

## The Owner's question

The flex derivation has been a headache. Deriving a formula out of drive-level data — slot wins, measured weights — plus the Owner's philosophy, which he has to input in English (the questionnaire, the rulings) and which then has to be translated into math, keeps producing friction: the center-to-tackle step-up, the fullback problem, the guard breaking what the ability layer gets right, valuing a new role that has no slot yet.

The Owner's question: is that confusion a bigger headache than just letting the engine realize, at play level, which players are affecting the plays — generating its own snap counts and stats, tracking who is valuable — so the engine generates the math itself, instead of the Owner having to input his philosophy in English and have it translated into a formula?

And: we would not be starting from zero. The drive engine, the matchup model, the slot values, the duty tables, all the derivation work — that knowledge informs a play-level build. The calibrated numbers transfer.

## Background (so this prompt stands alone — assume no prior context)

The engine is drive-level (top-down). The matchup model computes expected totals (yards, points, turnovers, sacks) from unit ratings. The drive generator distributes those totals across ~11.5 drives per team. The box score allocates player stats from the drive totals. There is no per-play state: no down, no distance, no field position. There is no per-player snap count — the engine does not know how many plays a player was on the field for, only what stats he was allocated. A flex price (the penalty for playing out of position) is currently derived from drive-level aggregates: slot wins (how many wins a slot adds) and measured slot values, plus the Owner's hand-priced 99 rules as a guide. The 99 are a guide, not a target.

The derivation's persistent headaches, all from trying to get the formula out of drive data plus English philosophy:

- **C>OT:** the ability layer prices a center moving to tackle at 6; the Owner says 12. The value ladder (guard) fixes it to 12, but the guard then breaks other rows.
- **The fullback:** the guard prices FB>RB at 18 (FB's slot weight is only 25, so the ladder is steep); the Owner says 2. His new principle is "socialism" — if a role has one good player and is unimportant, its flex values are reduced in both directions — but socialism has no measurement yet, because the engine does not track how often a fullback is actually on the field. The fact that "the fullback only plays a few plays" is knowledge the Owner supplied in English, not knowledge the engine has.
- **Valuing a new role:** a big nickel (SS2) or a DL5 blitzer has no slot in the sim, so there is no measured value for it. The Owner defines the requirements; the engine has to value the role. That is the hard part.
- **The gate** (a value-ladder condition) was built, reached 99/99, and then removed by the Owner. The derivation is now ability-only at 98/99, C>OT the lone miss — and the Owner says C>OT at 6 is fine unless centers constantly flex out in the sim.

There is a middle path worth weighing: a play-level VIEW on top of the drives. The drive outcome stays authoritative, and a play sequence is generated inside each drive that adds up to it (down, distance, field position, who is on the field, who touched it). From that you read off participation, contribution, EPA. The engine "sees" those things because it produced the plays. But the plays are generated, not simulated — the drive determines the plays, not the other way around — and the personnel model (who is on the field for each play) and the attribution model (who got the ball, who made the stop) still have to be built. The question is whether that actually solves the problem or just moves the translation into those models.

A full play-level REBUILD is the other shape: the plays determine the drive, bottom-up. That would be more causally consistent (a player's EPA and the team's wins come from the same simulation), but it bets the game on a new play model being good enough to reproduce the drive totals, and it means re-measuring the calibrated numbers.

The Owner's direction that still binds (from his Q&A, at `_agents/muse/deliveries/questionnaire-flex-derivation-QA-2026-11-10.md`): the 99 are a guide, not a target; beautiful and portable wins; inputs are OVR + position only; no gates, no floor, no named exceptions; dual positions free; gravity is now, inside the value ideally; no Owner set weights for other sports; ±5 points of flex error is acceptable; socialism for one-good-player unimportant roles; emergence of requirements is impossible (the Owner defines them, the engine prices who can flex in); snap share cannot be intuited by a formula and is not consistent across sports.

## Work options (take from `_agents/QUEUE.md` — the top line first; nothing is assigned to a named seat)

A. **Answer the Owner's question — your interpretation.** Would a play-level engine actually eliminate the derivation headaches (C>OT, the fullback/socialism, valuing new roles), or would they reappear in a different form? Is the Owner right that we would not be starting from zero — what transfers and what has to be rebuilt? Is the middle path (drive engine plus a play-level view) enough, or does it move the translation into the personnel and attribution models? If play-level (or the view) is the way, what is the shape of the path from here, and what would you measure to know it is working? And the deeper question: can the engine generate the math — player values, flex prices — from the simulation itself, so the Owner does not have to input his philosophy in English? File as `inbox/<UTC>-<seat>-P-341-play-level-answer.md`.
B. **Review and verify the answers that come in** (Claude's, Z.ai's, other seats'). Check the reasoning, test the claims that can be tested (for example: does the drive engine really not track participation — verify in code; does a play-level view actually need a personnel model, and how big is that model?), and say where an answer is strong or where it assumes something it should not. File as `inbox/<UTC>-<seat>-<ID>-review.md` with VERDICT ok/improved/rejected.
C. **Work the related P-items from the queue** (P-322 derivation, P-339 center flex-out, P-340 merge, P-335 gravity) — the play-level question bears on all of them, but do not let it stall them; if the answer to this question would change a P-item, say so in the inbox filing.
D. **Discuss the tensions** — where the play-level idea conflicts with what is already built and verified (for example: the drive engine is calibrated and the Lab depends on it; a play-level engine needs play-by-play data the project may not have; the play-view's personnel model is itself a translation of football knowledge into a model). Propose a resolution, or a shape that avoids the tension. File as an inbox discussion.

## Innovation

Please innovate, brainstorm, improve, and create new ideas — think around whatever the issue is. This prompt tells you what to work on, not how to think. If you see a better shape than drive, view, or rebuild — a third shape, a different way for the engine to see participation — propose it. The best contributions here will be the ones that follow the Owner's direction in a surprising way.

## How to work

- **Push often.** Commit and push after every finished file/task, not just at session end. Council prompts are long and chats time out; a pushed commit survives a timed-out chat, unpushed work does not. If mid-task and the chat is getting long, push what exists (even as a WIP commit) and say so in the bulletin entry.
- **Work comes from `_agents/QUEUE.md`** (live on `origin/council/muse`). Take the top line (`node tools/council.mjs next`) and do it, or leave it for someone else. Nothing is assigned to a named seat. Only the Architect edits the product file.
- **Reviews:** three different seats' ok/improved = REVIEWED. No seat reviews the same item twice. Label every claim VERIFIED (you ran it) / REPORTED (someone else says so) / INFERRED (reasoned, not run) / UNKNOWN.
- **Inbox files:** one file per item, `inbox/<UTC>-<seat>-<ID>-<slug>.md`, first line `SPEAKER: <seat> | ROLE: <role> | TASK: <task> | DATE: <UTC>`, then `FOR: <ID>`.
