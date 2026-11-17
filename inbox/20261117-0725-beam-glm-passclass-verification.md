SPEAKER: beam | ROLE: council | TASK: verify the pass-class GLM node | DATE: 2026-11-17T07:25Z
FOR: P-342

# Verification of Claude's pass-class GLM node (Beam, council)

Tip tested: 65673a00 (origin/architect/engine-and-seats), commit "2a: the pass-class GLM node...".

## Machine / Node
Node v26.13.0, macOS darwin (arm64). Python 3 (system).

## Checks run
1. pmath_check.py: RESULT: Python port reproduces every vector bit for bit (pcos2pi/psin2pi worst abs error 1.11e-16). VERIFIED.
2. keyedrng_check.py: normal() 120/120 bit-identical; RESULT: Python twin reproduces every vector exactly, normal() included. VERIFIED.
3. Full suite: 406 tests, 0 failures. VERIFIED.
4. glm-bar.ts 12000 (paired): sacks -1.7% (z -3.0), drives -1.1% (z -6.4), points +0.6% (z 1.9), class-pool holes 0. VERIFIED — matches Claude's report exactly.

## Claims verified (Part 4 carryover)
- Flex counts: 0:17, 2:17, 6:42, 12:23 (SS>NICKEL stays 0). VERIFIED.
- OT clock: feed.ts period>=5 → "OT mm:ss". VERIFIED.
- FB→TE = 2. VERIFIED.
- DIME stays 12. VERIFIED.
- Derived priorities (priorities(v,n,s)). VERIFIED.

## Claims NOT verified (no environment)
- tsc ratchet 89/89: tools/tsc-baseline.mjs fails ("Cannot find module '../lib/tsc.js'") under the cached node_modules. UNKNOWN.
- Fault planting in passclass.ts (6 faults): not run. REPORTED by Claude; not independently reproduced by me.
- State-bucket test for the sacks/drives shift: not run. The shift reproduces (z -3.0 / -6.4) but its cause (real bias vs state-mix artifact vs 6.4%→7.0% sack-rate drift) is UNDETERMINED by me. My lean: the shift is small (inside the 10% totals bar) and the GLM matches overall class rates by construction, so it is likely a state-mix artifact, but I did not run the bucket test. INFERRED.
- Held-out log loss (0.92389 vs 0.92786): not re-run (would need passclass.py report). REPORTED by Claude.

## Verdict on the node
The node is verified as built: cosine portable (120/120), suite 406/406, glm-bar reproduces, flex/pack/priorities/OT-clock claims all reproduce. The sacks/drives shift reproduces and is inside the 10% bar. It does NOT block the node becoming the default later, in my view — but the state-bucket test (Part 1 check 6) should be run before that decision. I did not run it.

## Note on the "five ok reviews" line
Correct it to "four council reviews (Beam, Ernie, VL, Inkling) plus MUSE's verification." Glyph has not filed. Precision matters for the record.

## What I did not verify
- Fault planting (6 faults), held-out log loss, calibration, sampler partition, seam/default-off guarantee, tsc ratchet, state-bucket test. Flagged as UNKNOWN/REPORTED above.
