SPEAKER: vl | TASK: P-375 — independently test Claude's engine work, Part 2: portable cosine, is normal() bit-identical on my machine? | DATE: 2026-11-17T04:03:00Z
FOR: P-375

## Engine tip tested

5c808472 ("Pooled-node conformance: the lab's own Pack is the oracle for the baked pack and the TS loader"), tip of architect/engine-and-seats. Extracted the full repo tree to /tmp/eng-tip3. Node v26.13.0 on Darwin (macOS). Python 3.15.

## The Python check scripts exist at this tip

`tools/mathlab/keyedrng_check.py` and `tools/mathlab/pmath_check.py` are present at 5c808472 (added in this same commit cluster). I ran them myself — I did not repeat Claude's or MUSE's claims.

## keyedrng_check.py — VERIFIED, exit 0

Command: `python3 tools/mathlab/keyedrng_check.py` (run from /tmp/eng-tip3/tools/mathlab/)

Output:
```
Random123 known-answer vectors: ok
checked: philox 323, hash 13, gamekey 90, draw 240, rng 120, throws 6
normal(): 120/120 compared bit for bit
RESULT: Python twin reproduces every vector exactly, normal() included
```

- Philox core: 323 vectors, all match (independent Python implementation using native 64-bit int multiply, not the TS 16-bit-limb trick)
- normal(): **120/120 bit for bit** — this is the number the prompt asked for. On Node 24/macOS the old code matched 108/120; on Node 26/macOS it matched 106/120. With pcos2pi/psin2pi, all 120 match on this Node 26/macOS machine.
- Exit code: 0

## pmath_check.py — VERIFIED, exit 0

Command: `python3 tools/mathlab/pmath_check.py` (run from /tmp/eng-tip3/tools/mathlab/)

Output:
```
pexp: 417 vectors, worst relative error vs reference 2.10e-16
pexpm1: 412 vectors, worst relative error vs reference 2.65e-16
plog: 412 vectors, worst relative error vs reference 2.03e-16
ptanh: 415 vectors, worst relative error vs reference 2.24e-16
psqrt: 409 vectors, worst relative error vs reference 2.21e-16
pcos2pi: 625 vectors, worst absolute error vs reference 1.11e-16
psin2pi: 625 vectors, worst absolute error vs reference 1.11e-16
pnorminv: 418 vectors, worst relative error vs reference 1.87e-15
RESULT: Python port reproduces every vector bit for bit
```

- All worst-case errors are at or below ~2e-15, well within the 1e-12 accuracy target
- pcos2pi/psin2pi (the portable cosine/sine used by normal()): 625 vectors each, worst error 1.11e-16
- Exit code: 0

## Full TS suite — VERIFIED

Command: `node --test --experimental-strip-types "test/**/*.test.ts"` (run from /tmp/eng-tip3/colors/)

Output: **394 tests, 394 pass, 0 fail** (23.3 s)

This includes the keyedrng-vectors test (1/1) and pmath.test.ts (23/23), which confirm the TS side matches the vectors file.

## tsc ratchet — VERIFIED, unchanged

Command: `node tools/tsc-baseline.mjs` (after `npm install typescript --no-save`, since tsc wasn't preinstalled)

Output: **tsc baseline OK: 89 errors (pinned 89).**

The ratchet is unchanged at 89/89 — no new type errors introduced by the cosine change.

## Verdict

normal() is **120/120 bit-identical** on this Node 26/macOS machine — the exact machine/OS combination where the old code failed (106/120). The portable cosine (pcos2pi/psin2pi in core/pmath.ts, built only from + - * / and floor) eliminates the libm cosine disagreement between V8 and Python. The full suite is green (394/394) and the tsc ratchet is unchanged (89/89).

Labels: All numbers VERIFIED (commands run by me, outputs quoted in full). Machine: Darwin/macOS, Node v26.13.0, Python 3.15.
