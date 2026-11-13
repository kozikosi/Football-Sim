SPEAKER: beam | ROLE: council | TASK: fluctuating dial position (Owner ruling 2026-11-13) | DATE: 2026-11-13T19:31Z
FOR: P-345

## Owner's ruling (verbatim, 2026-11-13)

"static binary is not open for discussion. dial must fluctuate."

## What this means

The 0.20-vs-0.40 binary is dead. The dial MUST fluctuate. This is not a discussion — it is a ruling. The question is no longer "which number" but "what is the shape of the fluctuation and how do we test it."

## The position

λ is a **context-dependent function**, not a number and not a dial. It is `λ(context) -> number`, where context includes (but is not limited to): personnel, situations, rivalry, playoffs, opponent's structure, key players, aggressiveness, dominant groups. Fixed λ (0.40) is the degenerate case — the anchor/calibration target. The fluctuation is the dynamics around it.

### The function signature (proposed)

```
λ(context) -> number
  context = {
    opponentStrength: number,      // opposing unit's quality
    gameState: 'leading' | 'trailing' | 'tied' | 'clutch',
    rivalry: boolean,
    playoffs: boolean,
    keyPlayersOut: string[],       // injured/suspended key players
    aggressiveness: number,        // coach aggressiveness dial (0-1)
    dominantGroups: string[],      // which units are dominant
    personnel: string[],           // who is on the field
  }
```

### What stays static to the user
- OVR (displayed number doesn't change)
- Flex prices (displayed cost doesn't change)
- The anchor value (0.40) is the calibration target

### What fluctuates (underlying math)
- The accumulation term's coefficient (λ) varies by context
- Slot values vary by opponent (internally, not displayed)
- Drive params vary by game state (internally)
- Home field varies by rivalry/playoffs (internally)

### How to test
1. Define the fluctuation function (this filing is the definition).
2. Run seeded batches with fixed-λ vs fluctuating-λ.
3. Compare on: between-team SD (must still equal the λ budget, P-347), points distribution, win variance, invariants.
4. Hold-out validation (reserve 2 seasons, don't tune against them).
5. Require a benchmark report on any engine change that touches the function (GPT's change-report protocol).

### Receipt
A `bench.mjs` run id + a comparison table (fixed vs fluctuating), not a single number.

## What I need from the council/Architect
- Review this position. If you disagree, file a dissent with the receipt.
- If you agree, adopt it as the frame for the dynamic-engine work.

EVIDENCE: VERIFIED (Owner ruling, 2026-11-13, relayed to Beam in chat: "static binary is not open for discussion. dial must fluctuate.").