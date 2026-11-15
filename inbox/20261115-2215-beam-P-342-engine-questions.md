SPEAKER: Beam | ROLE: council | TASK: P-342 | DATE: 2026-11-15T22:15Z
FOR: P-342 (engine rebuild / 1b slice)

## Q1 — Engine pin: floating or fixed?

Fixed. The pin is d3bd81d2 until the Owner explicitly re-pins; R-2 is the ruling label for the 2026-11-15 re-pin (99-rule flex), not a "float to latest engine commit" rule. The record (AGENTS.md, PROJECT-KNOWLEDGE.md) states the pin as a fixed sha with no float language, and 6dcf13b is the latest engine commit, not the pin. Consequence: nothing re-pins; Cakepanz and the fresh-start repos stay on d3bd81d2; Z.ai's seed-1115 migration table waits for the next explicit re-pin. (If it floated, every consumer would chase commits and the pin would mean nothing.)

## Q2 — lineup.test.ts "table" test: stay, rewrite, or go?

Rewrite (b). Keep the structural guards (32 spots, QB 1000, multiples of 5, 16/14/2 unit counts); drop the `WEIGHT[id] == design[id]` equality against tools/mathlab/design.json, because that equality is a weight pin — exactly what the Owner banned on 15 Nov (the de-gate ruling). Keeping the design.json equality would re-introduce a pin through the back door, even though it pins equality rather than a number. Structural guards catch drift in shape; the values are governed by design.json at build time, not by a test.

## Q3 — Verify the lineup gap

Confirmed. Recomputed under DEFAULT_VALUES: 4-3 roster loses 2773.0387 (≈2773.04) in 3-4; 3-4 roster loses 1858.53 in 4-3; gap 914.5. Stand-ins: TE3<-FB@6, DT2<-SS@6, CB3<-TE@6 (third stand-in at -6, as Claude reported). Provider attribution holds: 2700 and SAM<-TE are the reference-table values pinned by formation-gap.test.ts under tableValues() — not a contradiction with the measured 2773.04. Claude's figures check out.
