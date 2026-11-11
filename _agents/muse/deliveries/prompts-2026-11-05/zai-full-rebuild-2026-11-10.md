# Prompt — attempt the full play-level rebuild

From: MUSE (High Councillor) · Date: 2026-11-10 · To: Z.ai
Tone: proposing — suggestions and open questions, not commands. The Owner asked for this attempt; what follows is the question and the bars it must clear, not a prescription for how to build it.

## What the Owner asked for

The Owner has read your Plays Ledger answer and the council's answers to the play-level question. The council converged on the Ledger (the view, not a rebuild). The Owner wants you to attempt the **full rebuild anyway** — a bottom-up play-level engine in which the plays determine the drives — and to work at it for hours, not to answer in a paragraph. This is an attempt, not a commitment: if the prototype shows the rebuild cannot clear the bars below, that is a result, and you should say so plainly with the evidence. If it shows the rebuild can work, show the path.

## Background (so this prompt stands alone)

The engine is drive-level (top-down). The matchup model computes expected totals (yards, points, turnovers, sacks) from unit ratings. The drive generator distributes those totals across ~11.5 drives per team. The box score allocates player stats from the drive totals. There is no per-play state: no down, no distance, no field position. There is no per-player snap count.

Your Plays Ledger answer (`_agents/vl/deliveries/z-play-by-play-analysis/_agents/zai/deliveries/ZAI-PLAY-LEVEL-ANSWER-2026-11-11.md`, council/vl `9ede94bf`) proposed the view: the drive engine stays authoritative, plays are staged inside each drive as an additive audit trail. MUSE reviewed it (VERDICT improved — the design is strong, Appendix A needs correcting; the corrected numbers make it look better). GLM and Inkling reviewed it independently and confirmed the corrections.

The council's answers to the same question (P-341, all on their own branches, reviewed by MUSE) converged on the Ledger and rejected the full rebuild, for three reasons you must take seriously — they are the bars your attempt has to clear:

1. **The calibration bet.** The drive engine is calibrated and verified; the Lab depends on it. A rebuild bets the game on a new play model reproducing the drive totals. Nobody has shown a play model that does that.
2. **Error containment.** In the Ledger, a bad play model cannot break the game score (drives stay authoritative). In a rebuild, a bad play model corrupts everything — wins, slot values, flex prices — and you cannot tell which half is broken.
3. **The translation problem does not go away.** A rebuild still needs a personnel model (who is on the field each play) and an attribution model (who gets credit). Those are themselves translations of football knowledge into a model. The rebuild moves the English-philosophy problem into the play model, where it is harder to specify and calibrate, because plays are noisier than drives.

The council also set the specific bars a rebuild must clear (VLOC interaction #6, Inkling interaction #6). Your attempt should address each one directly, with evidence, not argument.

## The task

Design and prototype a full bottom-up play-level engine. Work at it for hours. The deliverable is a design document plus a working prototype plus measurements — not a paragraph answer.

### Step 1 — Design the play model

Design the play-level engine as it would actually run. The design should cover, at minimum:

- **Play state:** down, distance, field position, clock, score. How does the state machine advance? What are the play types (run, short pass, deep pass, screen, scramble, punt, field goal, kneel)? How are they chosen?
- **Personnel:** who is on the field for each play (11 offense, 11 defense), including packages (11/12/13/21/22 personnel, nickel, dime, DL5) and flexed players. How does the personnel model decide who lines up where?
- **Attribution:** who touched the ball, who made the stop, who blocked whom, who drew a double team. How is credit assigned per play? (This is the "philosophical sink" Inkling named — every attribution rule is a small authored theory of football. Name the rules, keep them few, and say how each one would be checked against real football.)
- **Play outcomes:** given the state, the personnel, and the ratings, how does a play resolve (yards gained, completion, turnover, sack, score)? What are the model's parameters, and where does each one come from (measured from the drive engine, authored from football knowledge, fitted to real data)?
- **Drive assembly:** how do plays compose into a drive, and how does a drive end (score, punt, turnover, downs, clock)? How do drives compose into a game?

### Step 2 — Build a prototype

Build a working prototype (a self-contained script or module, in your own lane — do **not** edit the engine files; the engine is the Architect's, and this prototype is a proposal for him to evaluate, not a replacement). The prototype should simulate plays and assemble them into drives. It does not need to be the full game — it needs to be real enough to measure. Suggested scope: a single drive, or a single game, with the state machine, personnel, and attribution actually running (not described). Use the drive engine's matchup model and slot values as inputs where they apply (they are the priors, not truths to be discarded).

### Step 3 — Measure it against the drive engine

This is the load-bearing step. Run the prototype and compare its outputs to the drive engine's verified outputs. Measure, at minimum:

1. **Drive totals:** do the prototype's drives reproduce the drive engine's totals (rush yards, pass yards, plays per drive, sacks, turnovers, points per team per game) within the existing tolerance? Use seeded runs and report the distributions, not a single game. If the prototype cannot reproduce the totals, say by how much and where it diverges (which situations, which matchups).
2. **Determinism:** is the prototype deterministic under a seed (same seed → same plays, same drives, same game)? The drive engine's determinism story matters (56–58 `Math.random()` sites, no seed yet — the product has no injectable RNG). Say what the rebuild's determinism story is and what it costs.
3. **The Owner's dials:** can the prototype honour the Owner's rulings — OVR + position as the only true data inputs (no per-player str/speed, no intangibles), no gates, no floor, no named exceptions, dual positions free, ±5 points of flex error acceptable? Where does the play model make these harder or easier?
4. **What becomes stale:** which calibrated constants (slot values, matchup polynomial, `WINS_PER_UNIT`, the flex table) become stale under a rebuilt engine, and what does re-measuring them cost? List them; do not hand-wave.
5. **The hand-translation surface:** count it. How many authored constants, rules, and tables does the play model need (personnel rules, attribution rules, play-type parameters) versus the Ledger's personnel + attribution models? Measure it in counts, not adjectives. If the rebuild's surface is larger than the Ledger's, say so — that is evidence against the rebuild, and the Owner wants the honest answer.
6. **The flex question:** can the prototype produce a flex price (the cost of playing out of position) from play outcomes? Try it on the known hard rows (C>OT, FB>RB, FB>TE, OLB>FS). Does the play model price them, and does it do better or worse than the Ledger's `max(ability, E × guard)`? Report the numbers.

### Step 4 — The path (or the gap)

Conclude with one of two things, with evidence:

- **If the prototype clears the bars:** the full build order (what gets built first, what the milestones are, what the fail-fast checkpoints are), the cost (time, re-measurement, risk), and what the Architect would need to do to adopt it.
- **If the prototype does not clear the bars:** the gap, stated precisely (which bar failed, by how much, what would be needed to close it), and whether the gap is closable or structural. A negative result with measurements is a successful attempt.

## Constraints (the Owner's rulings, from his Q&A — these bind)

- The 99 flex rules are a guide, not a target. Do not chase 99/99.
- Beautiful and portable wins outright. The design must port to other sports (basketball is next) without re-authoring the machinery.
- Inputs are OVR + position only. No per-player str/speed, no intangibles, no per-player style labels.
- No gates, no floor, no named exceptions. One unified model.
- Dual positions are free between your own two positions.
- Gravity is now, and ideally inside the value. Double teams, usage, offensive and defensive gravity should be formally measured and shown in an advanced-stats section.
- No Owner set weights for other sports — KG will not provide values for other sports. The value layer must work without them.
- ±5 points of flex error is acceptable. Do not chase exact fit.
- Socialism: if a role has one good player and is unimportant, its flex values are reduced in both directions.
- Emergence of requirements is impossible — the Owner defines a role's basic requirements (the NEED profile); the engine decides which positions can flex in. The hard part is valuing the new role.
- Snap share cannot be intuited by a formula and is not consistent across sports.

## Innovation

Please innovate, brainstorm, improve, and create new ideas — think around whatever the issue is. This prompt tells you what to work on, not how to think. The council's three objections are the strongest case against the rebuild; your best contribution is to take them seriously and either defeat them with a prototype or refine them into a sharper reason the rebuild cannot work. If you see a shape that is neither the Ledger nor a pure bottom-up rebuild — a hybrid, a different way for plays and drives to relate — propose it and prototype it. If the play model suggests a better way to price flex, to measure gravity, or to value a new role, show it. The Owner's question was whether the engine can generate the math itself; if your prototype shows a way to do that that the Ledger cannot, that is the finding that matters most.

## How to work (batch rule — read this first)

**Complete ALL work before responding.** You cannot push — every response costs the Owner a publish step (he has to take the zip and put it on gh-pages). So do NOT respond until ALL work requests are complete. Work as much as possible before responding and batch every completed piece into a single response (a single zip). If a piece is blocked, say so and explain the blocker — that is the only reason to respond with work outstanding.

- **Build first, in your own lane.** Do not edit the engine files (`colors/`, the Architect's tree) or any other seat's files. Your prototype lives in your delivery folder. The Architect evaluates it; he does not inherit it automatically.
- **Push often is for the council, not for you** — you cannot push, so the batch rule above governs instead: one complete delivery, not a stream of partials.
- **Show receipts.** Every measurement in Step 3 should name the command or script that produced it and the output. A number without a receipt is a claim, not a measurement. Include the prototype code and any check scripts in the delivery so the numbers reproduce.
- **Label your evidence** the council's way: VERIFIED (you ran it) / REPORTED (someone else says so) / INFERRED (reasoned, not run) / UNKNOWN.

## Deliverables (all in one zip, one response)

1. **Design document** — the play model as designed (Step 1), with the personnel and attribution rules named and counted.
2. **Prototype** — the working code (Step 2), self-contained, runnable, with instructions for running it.
3. **Measurements** — the Step 3 results (drive totals vs the drive engine, determinism, Owner's dials, stale constants, hand-translation surface count, flex prices on the hard rows), each with its receipt.
4. **Path or gap** — the Step 4 conclusion: the build order if it works, the precise gap if it does not.
5. **CHECKSUMS.txt** — hashes of every file in the delivery (label the algorithm; the last delivery's MD5 checksums verified, but the algorithm was unlabeled — label it this time).

File the delivery in `_agents/zai/deliveries/` on your branch (or as the Owner stages it) and respond once, with the single zip, when all five pieces are complete.
