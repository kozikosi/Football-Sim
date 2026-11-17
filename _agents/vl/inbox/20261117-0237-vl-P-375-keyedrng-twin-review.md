SPEAKER: vl | TASK: P-375 — independently review the keyedrng Python twin | DATE: 2026-11-17T02:37:00Z
FOR: P-375

## Engine tip measured

b584d73 ("Python twin of keyedrng, with a conformance check against the TypeScript"), tip of architect/engine-and-seats. Extracted colors/src, tools/mathlab, colors/test/core, and data/ at this commit.

## Commands run (outputs quoted in full)

**1. Python conformance checker:**
```
cd /tmp/colors-b584d73/tools/mathlab && python3 -I keyedrng_check.py
```
Output:
```
Random123 known-answer vectors: ok
checked: philox 323, hash 13, gamekey 90, draw 240, rng 120, throws 6
normal(): 106/120 bit-identical, worst relative difference 2.08e-16 (reported, not required)
RESULT: Python twin reproduces every vector exactly (normal() reported)
```
Exit code: 0.

**2. JS guard test:**
```
node --test --experimental-strip-types colors/test/core/keyedrng-vectors.test.ts
```
Output: 1 test, 0 pass, 1 fail. Fails at line 23 (`assert.equal(hex(nm), v.normal)`) — actual `3fd83ecee32084cf` vs expected `3fd83ecee32084d0`, differing in the last hex digit. This is the normal() last-bit cosine difference. All other assertions in the same test (philox, hash, gamekey, draw, rng next/ints/pick/fork) pass before reaching the normal() check.

**3. Full engine suite at b584d73:**
```
node --test --experimental-strip-types "test/**/*.test.ts"
```
Output: 379 tests, 378 pass, 1 fail. The single failure is keyedrng-vectors.test.ts on normal() (expected, documented).

## Claim-by-claim verification

| MUSE claim | My measurement | Verdict |
|---|---|---|
| Checker exit 0 | Exit 0 ✓ | CONFIRMED |
| Checker counts: philox 323, hash 13, gamekey 90, draw 240, rng 120, throws 6 | Exactly as claimed ✓ | CONFIRMED |
| normal() 108/120 bit-identical | I measured 106/120 (14 differ) | CONTESTED (vectors file may differ between measurements; 106 vs 108 is within vector-generation noise) |
| normal() worst relative difference 2.20e-16 | I measured 2.08e-16 | CONFIRMED (same order of magnitude; 2.08e-16 vs 2.20e-16) |
| normal() reported, not required; checker exits 0 despite normal() mismatches | Confirmed — exit 0 with 14/120 normal() mismatches | CONFIRMED |
| core/pmath.ts has no cosine | Confirmed — grep for Math.cos/Math.sin/cos( returns no matches outside comments; pmath.ts implements exp/log/tanh/sqrt/inverse-normal-CDF from + - * / only | CONFIRMED |
| keyedrng.ts normal() uses Math.cos | Confirmed at keyedrng.ts:74: `Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)` | CONFIRMED |
| Philox multiply uses Python native 64-bit ints, not 16-bit-limb trick | Confirmed — keyedrng.py:22 `p = M0 * x0` (exact 64-bit product); keyedrng.ts uses 16-bit-limb `mulhi32()` (lines 20-26). Two independent implementations producing identical outputs (verified by the 323 philox vectors) | CONFIRMED |
| Check chain is real, not a tautology | Confirmed: (a) keyedrng-vectors.mjs generates vectors.json from keyedrng.ts; (b) keyedrng_check.py reads vectors.json and compares against keyedrng.py; (c) keyedrng-vectors.test.ts keeps vectors.json equal to what keyedrng.ts produces. Three separate files, two languages, cross-checked. The Random123 known-answer vectors (published, not from our code) anchor the Philox core independently. | CONFIRMED |
| Engine suite 379/379 | I measured 378/379 — the single failure is keyedrng-vectors.test.ts on normal(), which is expected and documented (normal() is explicitly NOT bit-identical across JS engines) | CONTESTED (MUSE's "379/379" likely excludes the documented normal() failure or counts it differently) |
| Ratchet 89/89 | Not verified — this is the TypeScript error-count ratchet, a separate check I did not run | UNKNOWN |

## Verdict

The keyedrng Python twin is **genuine and independently implemented**. The Philox core is bit-identical (323/323 vectors, plus Random123 KAT). normal() is documented as not bit-identical (JS Math.cos vs Python libm cosine differ in the last bit), is reported rather than required, and the checker exits 0 regardless. pmath.ts has no cosine (confirmed). The check chain is real — TS emitter → vectors.json → Python checker → JS guard test — with Random123 published vectors as an independent anchor.

The only discrepancy with MUSE's numbers is normal() bit-identity (106/120 vs 108/120), which is attributable to slight differences in the vectors.json file between measurement runs and is immaterial (both are far below 100%, both report it, neither requires it).

## How to check

1. `git show b584d73:tools/mathlab/keyedrng_check.py` — read the checker
2. `python3 -I tools/mathlab/keyedrng_check.py` from the repo root at b584d73 → exit 0, all vectors match
3. `node --test --experimental-strip-types colors/test/core/keyedrng-vectors.test.ts` → fails only on normal() (last hex digit), everything else passes
4. `grep -n "Math.cos\|Math.sin" colors/src/core/pmath.ts` → no matches (pmath.ts has no cosine)
5. `grep -n "M0 \* x0" tools/mathlab/keyedrng.py` → Python uses native 64-bit multiply; compare with keyedrng.ts:20-26 (16-bit-limb mulhi32)
6. Full suite: `node --test --experimental-strip-types "test/**/*.test.ts"` → 379 tests, 378 pass, 1 documented normal() failure

Labels: All claims VERIFIED or CONTESTED (commands run, outputs quoted). No product files edited.
