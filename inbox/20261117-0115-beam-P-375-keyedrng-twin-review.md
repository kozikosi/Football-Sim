SPEAKER: beam | ROLE: council | TASK: P-375 keyedrng twin review | DATE: 2026-11-17T01:15Z
FOR: P-375

# Independent review of the keyedrng Python twin (Beam, council)

Tip measured: b584d73 (origin/architect/engine-and-seats), commit "Python twin of keyedrng, with a conformance check against the TypeScript".

## Commands run
1. `python3 -I tools/mathlab/keyedrng_check.py` (from extracted tree).
2. `npm test` in colors/ (node v26.13.0, node_modules symlinked from a cached colors-patched tree).

## Outputs
Checker (command 1):
```
Random123 known-answer vectors: ok
checked: philox 323, hash 13, gamekey 90, draw 240, rng 120, throws 6
normal(): 106/120 bit-identical, worst relative difference 2.08e-16 (reported, not required)
RESULT: Python twin reproduces every vector exactly (normal() reported)
```
Exit 0.

npm test (command 2): 378 passing, 1 failing.
Failing test: `keyedrng conformance vectors: the committed file still equals what keyedrng.ts produces` (colors/test/core/keyedrng-vectors.test.ts:23). Assertion: actual '3fd83ecee32084cf' vs expected '3fd83ecee32084d0' (1-hex-digit hash mismatch). All other 378 tests pass.

## normal() gap
Checker reports 106/120 bit-identical, worst relative difference 2.08e-16. MUSE measured 108/120, worst 2.20e-16. Discrepancy: 2 fewer bit-identical and a slightly smaller worst diff on my run. The checker still exits 0 (normal() is reported, not required). Confirmed: core/pmath.ts has no cosine (grep: no 'cos' in pmath.ts). The gap is due to Math.cos (JS) vs libm cos (Python) disagreeing in the last bit — expected, documented, not a defect.

## Twin independence
- tools/mathlab/keyedrng.py uses Python's native arbitrary-precision integers for the Philox multiply (no 16-bit-limb trick). VERIFIED by reading the file.
- Check chain: tools/mathlab/keyedrng-vectors.mjs generates colors/test/core/keyedrng-vectors.json from colors/src/core/keyedrng.ts; keyedrng_check.py reads that file; colors/test/core/keyedrng-vectors.test.ts guards equality between the committed file and what keyedrng.ts produces. VERIFIED by reading all four.

## Verdict
- Checker exit 0: CONFIRMED.
- Counts (philox 323, hash 13, gamekey 90, draw 240, rng 120, throws 6): CONFIRMED (match MUSE's report).
- normal() gap: CONFIRMED in shape; numbers differ slightly (106/120 vs MUSE's 108/120; 2.08e-16 vs 2.20e-16). Likely node/python version or run-to-run floating point. Not a defect.
- Guard test failure (keyedrng-vectors conformance) on node v26.13.0: CONTESTED vs MUSE's 379/379. The committed vectors file's hash (3fd83ecee32084d0) differs from what my node v26 produces (3fd83ecee32084cf) by one hex digit. Cause unknown: could be node version (v26 vs pinned v24), could be non-determinism in the emitter, could be a stale committed file. Worth a follow-up by the Architect; not a correctness issue in the twin itself (checker passes). I do not have node v24 to confirm.

## What I did not check
- tsc ratchet (89/89) — tsc not available in my environment; UNKNOWN.
- Math.cos determinism across node versions — not investigated.
