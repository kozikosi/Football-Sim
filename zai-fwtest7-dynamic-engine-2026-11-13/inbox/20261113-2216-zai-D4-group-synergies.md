SPEAKER: zai | ROLE: High Councillor · Executor | TASK: D.4 — group synergies (the engine's missing non-additive term) | DATE: 2026-11-13T22:16Z
FOR: P-345 · the Owner · the Architect

**Position in one sentence (INFERRED, design):** a group is a **named unit the engine already composes** (the five OL, the three-and-CB1 secondary, the RB+FB backfield pair), its synergy value is measured as **whole-minus-sum-of-parts in the sim's own currency**, and it enters as one bounded bonus per unit — not as a new ratings layer.

## The shape (the design is genuinely open — this is one candidate, argued)

- **What is a group:** units with shared-field causality, where the engine's additivity provably underprices the composition. Start with three: **OL five** (run+pass synergy — a great line is worth more than five good linemen), **secondary** (CB1+CB2+FS/SS commutation — coverage synergies are the classic whole>parts), **backfield pair** (RB+FB lead-block complement). Do NOT start with "any combination the user built" — an open group definition is an unfalsifiable one.
- **How the value is measured:** the sim's own localWins table already measures slot values by presence (the machinery that produced WR1 1.607 / DT1 1.316). The same instrument measures a group: `synergy(unit) = localWins(with all five, minus the five individually substituted) − Σ(individual slot values)` — the whole minus the sum of the parts, in Wins, computable with zero new engine code (it is a batching script over seeded seasons, the D.8 pattern).
- **What it fluctuates by:** composition (swap one OL, the synergy recomputes) and opponent (the secondary's synergy is bigger against a four-WR offense — the matchup function from D.2 is the consumer). Its consistency obligations match Ruling 13: if synergy moves displayed numbers, it moves the UNDERLYING math only; the board's Wins stay the static truth.
- **The broadcast ruling (verbatim: "Group synergies — APPROVED, definitely. Broadcast to everyone")** is about the concept, and it is satisfied by this filing + the measurement instrument above.

## Receipt

- The measurement instrument is a seeded-batch script over the existing engine (N=1000 seasons, group present vs substituted-out, delta in Wins) — the same shape as the fixed-vs-fluctuating Lab bench (Beam's §5.2). Precisely nameable, ~1 day of scripting; not run this wave (the wave's compute budget went to the framework test + the D.8/B.4/D.5 receipts).
- Real-data anchor: the nflverse participation files (in the P-344 staging) identify which five OL played which snaps — the real-side validation is `team-game success rate | OL-composition-stability` (units that start the same five win more than the sum of their parts' individual grades predicts). Named cut, runnable when the staging carries the join.

## Failure mode

- **Double-count:** OL synergy and the OL-vs-DL matchup (D.2) both price the line — the guard is the same as D.2's: one measured quantity, two consumers, never two measurements of one thing.
- **The runaway unit:** if a full-elite-OL synergy exceeds the QB's slot value, the engine's own hierarchy ("a QB generally still needs to be the most important player", verbatim) breaks. Guard: synergy is a bounded bonus (≤ the group's lowest slot value), reviewed at the 11 diagnostic rows.

## The Owner-question it carries

Should the user **see** the synergy (a unit-grade line on the roster screen: "This line: +0.8 Wins above its parts")? My default: not in v1 — it is council-internal accounting until the measurement stabilizes; showing an unstable number trains the user to distrust the board. Consequence of showing early: another displayed number drifting under the consistency ruling.

Cross-references: D.2 (shared instrument), D.9 row 9, Beam §Q7-6 (same item, same test shape — cited, not re-derived).
