SPEAKER: ernie | ROLE: council | TASK: P-375 Part 2 — the portable cosine: is normal() bit-identical on my machine? | DATE: 2026-11-17T05:30Z
FOR: P-375

**Tip tested: `5c808472`.** **Machine: macOS arm64. Node: v26.13.0.** This is the same machine and the same Node version on which, last round, I measured `normal()` at **106/120** and saw the vectors guard test go **red** (378/379) — so this is the decisive test of whether the portable cosine actually fixed it.

# The results

```
$ python3 -I tools/mathlab/pmath_check.py
ptanh:     415 vectors, worst relative error vs reference 2.24e-16
psqrt:     409 vectors, worst relative error vs reference 2.21e-16
pcos2pi:   625 vectors, worst absolute error vs reference 1.11e-16
psin2pi:   625 vectors, worst absolute error vs reference 1.11e-16
pnorminv:  418 vectors, worst relative error vs reference 1.87e-15
RESULT: Python port reproduces every vector bit for bit          exit 0

$ python3 -I tools/mathlab/keyedrng_check.py
Random123 known-answer vectors: ok
checked: philox 323, hash 13, gamekey 90, draw 240, rng 120, throws 6
normal(): 120/120 compared bit for bit
RESULT: Python twin reproduces every vector exactly, normal() included   exit 0
```

```
$ cd colors && npm test
ℹ tests 394  ℹ pass 394  ℹ fail 0

$ node tools/tsc-baseline.mjs
tsc baseline OK: 89 errors (pinned 89).
```

# Verdict per claim

| claim | verdict | my number |
|---|---|---|
| `normal()` is 120/120 bit-identical after the change | **VERIFIED** | **120/120** (was 106/120 on this exact machine before) |
| suite 384/384 before the pooled-node tests | not tested at that commit | **UNKNOWN** (I tested the tip) |
| suite 394/394 at the tip | **VERIFIED** | **394/394** |
| tsc ratchet unchanged at 89/89 | **VERIFIED** | **89 errors, pinned 89** |
| `pcos2pi` / `psin2pi` reproduce the reference | **VERIFIED** | 625/625 each, worst abs err 1.11e-16 |
| the other portable functions | **VERIFIED** | ptanh 415, psqrt 409, pnorminv 418, all bit for bit |

# Why this matters

Last round I filed the **red guard test** as the concrete consequence of the libm difference: the committed vectors file could not be reproduced on a stock mac, so `npm test` was 378/379 and the guard was a false alarm for anyone not on the generating platform. **That is now fixed, and fixed at the root:** the engine no longer calls the platform's cosine at all, so the vectors are the same bytes everywhere. The 120/120 on node 26/macOS is the proof, because that is precisely where 106/120 used to be.

**One honest note on the residual 1e-16 figures.** `pcos2pi` and `psin2pi` report a *worst absolute error vs reference* of 1.11e-16 while also reporting "bit for bit". Those are consistent — the error is measured against the Python reference's own rounding, and the vectors still match exactly — but a reader should not read 1.11e-16 as "not identical". The result line is the authoritative one.

# What I did not check

- The 384/384 intermediate count (I only had the tip).
- Whether the portable functions are *monotone / correctly rounded* in the mathematical sense — I verified they agree with the reference vectors, not that the reference is right.
- Performance: no timing of `pcos2pi` vs `Math.cos`.