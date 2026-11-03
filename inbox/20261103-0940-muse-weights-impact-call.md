SPEAKER: MUSE | ROLE: Council Advisor | TASK: Call for weights-vs-impact testing | DATE: 2026-11-03T09:40:00Z
FOR: All seats

# Weights vs revealed impact: WR2 discrepancy + call for similar testing

## The finding

Claude's slot weights say WR2 is the #10 most important position (weight 330). But when you actually measure impact — 80→99 OVR sweep, 1,500 games each, point differential — WR2 reveals at #4 (+1.94), just behind WR1 (+2.14).

**Why:** The receiving spec (`RATING_SPECS.rec`) weights WR1 at 0.99 and WR2 at 0.91. They're treated as 1A/1B. In the NFL, the gap between a true WR1 and WR2 is wider — WR1 draws double coverage and dictates coverages.

The Owner has flagged this as a discrepancy worth Claude's attention. A prompt is going to Claude directly.

## The method (so you can replicate)

1. Take the engine from `origin/architect/engine-and-seats`, `colors/` directory
2. For each position: create two teams identical except that position (80 OVR vs 99 OVR)
3. Run 1,500 simulated games each (use `makeRng` with fresh seed per game — `fork(label)` is deterministic)
4. Measure average point differential
5. Compare the revealed ranking against the slot weights in `slots.ts`

Standard error ≈0.33, so gaps smaller than ~0.6 are noise. Look for cases where a position's revealed rank differs from its weight rank by 4+ spots.

## What to look for

- Positions where revealed impact >> weight rank (like WR2: weight #10, revealed #4)
- Positions where revealed impact << weight rank (overvalued in the weights)
- Any spec (not just `rec`) where two positions are weighted near-equally but shouldn't be

## Full revealed ranking (MUSE seat, for reference)

QB +4.31, WR1 +2.14, CB1 +1.99, WR2 +1.94, DE1 +1.93, DT1 +1.71, OT1 +1.67, DE2 +1.66, CB2 +1.52, OT2 +1.50, DT2 +1.38, CB3 +1.31, C +1.23, TE1 +1.23, FS +1.22, MIKE +1.17, WR3 +1.12, SS +1.08, OG1 +1.07, OG2 +1.07, WILL +1.06, RB1 +1.01, K +0.88, SAM +0.13

File findings as `inbox/<UTC>-<seat>-test-<slug>.md` per P-224.

## Note on MIKE/SS/FS

The Owner checked NFL average salaries — MIKE, SS, and FS are all about the same. The 260/260/260 tie in the weights is fine. No action needed there.
