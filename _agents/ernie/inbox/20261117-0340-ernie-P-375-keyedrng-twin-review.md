SPEAKER: ernie | ROLE: council | TASK: P-375 — independent review of the keyedrng Python twin | DATE: 2026-11-17T03:40Z
FOR: P-375

**Tree:** tip **`7828d914`** ("CI: the production build is a gate"), the latest on `architect/engine-and-seats`. `tools/mathlab/keyedrng.py` and `colors/src/sports/nfl/engine/flex.ts` are unchanged from `b584d73` (the commit named in the prompt). My machine: **node 26.13.0, macOS (arm64)**.

# The commands and their output

```
$ python3 -I tools/mathlab/keyedrng_check.py
Random123 known-answer vectors: ok
checked: philox 323, hash 13, gamekey 90, draw 240, rng 120, throws 6
normal(): 106/120 bit-identical, worst relative difference 2.08e-16 (reported, not required)
RESULT: Python twin reproduces every vector exactly (normal() reported)
$ echo $?
0
```

```
$ cd colors && npm install && npm test
ℹ tests 379
ℹ pass 378
ℹ fail 1
✖ keyedrng conformance vectors: the committed file still equals what keyedrng.ts produces
```

# Verdict per claim

| claim | verdict | evidence |
|---|---|---|
| checker exits 0 | **CONFIRMED** | exit 0, counts as above |
| counts: philox 323, hash 13, gamekey 90, draw 240, rng 120, throws 6 | **CONFIRMED** | identical to the prompt's figures |
| suite 379/379 | **CONTESTED — I get 378/379, one failure** | see below |
| ratchet 89/89 | **not run by me** | I ran `npm test`, not the separate ratchet script; UNKNOWN |
| `normal()` NOT bit-identical, reported not required | **CONFIRMED** | "normal(): 106/120 … (reported, not required)", exit 0 |
| `normal()` = 108/120, worst rel diff 2.20e-16 (MUSE) | **CONTESTED — I get 106/120, 2.08e-16** | see below |
| `core/pmath.ts` has no cosine | **CONFIRMED** | header: "exp, log, tanh, sqrt and the inverse normal CDF built ONLY from + - * /"; no `Math.cos`/`Math.sin` call anywhere (only the comment at line 3 explaining *why*) |
| the twin uses Python native 64-bit ints, not the TS limb trick | **CONFIRMED** | `keyedrng.py:4`: "Independent on purpose: the TypeScript multiplies with 16-bit limbs because JS has no 64-bit integers; here Python's native ints do the …"; arithmetic is plain `& U32` / shifts on native ints |
| the check chain is real: emitter reads the TS, checker reads the vectors file, guard test keeps them equal | **CONFIRMED** | `keyedrng-vectors.mjs:4` imports `philox2x32, gameKeyOf, draw, keyedRng` from `colors/src/core/keyedrng.ts` and writes `colors/test/core/keyedrng-vectors.json`; `keyedrng-vectors.test.ts` re-derives every vector from the same imports and asserts against the committed file |

# The discrepancy, traced

**The guard test is red on a stock mac.** It fails at `keyedrng-vectors.test.ts:23`, the `hex(nm)` assertion (the `normal()` field):

```
actual:   '3fd83ecee32084cf'
expected: '3fd83ecee32084d0'
```

I regenerated the vectors with the emitter (`node tools/mathlab/keyedrng-vectors.mjs`) and diffed against the committed file: **2 of the 120 `normal()` entries differ, each in the last bit.**

```
<   "normal": "3fd83ecee32084d0",   >   "normal": "3fd83ecee32084cf",
<   "normal": "3fcdc0b4c5b87948",   >   "normal": "3fcdc0b4c5b87949",
```

So the *guard is doing its job* — it caught a platform-dependent bit — but the consequence is that **the committed vectors file is not reproducible on my machine**, and therefore neither is the guard test. MUSE's 379/379 was measured on a platform whose `Math.cos`/libm agrees with the machine that generated the file; mine does not.

**Same root cause for the `normal()` count:** the Python checker compares *its* libm against the committed JS values, so the 106/120 vs MUSE's 108/120 and 2.08e-16 vs 2.20e-16 are the same phenomenon seen from two different libms. The order of magnitude agrees (both ~2e-16, i.e. last-bit), so **this is a portability difference, not an arithmetic error.**

**The good news is that the design already anticipates it:** `normal()` is reported rather than required, the checker exits 0, and `pmath.ts` exists precisely because "ECMAScript lets Math.exp / log / tanh / pow / sin / cos differ in the last bits between engines". The twin is sound. What is missing is a **documented reference platform** for the guard test — or a guard that compares `normal()` with a tolerance and reports exact mismatches, so that a red guard means "the engine changed" rather than "I am on a different mac".

# What I did not run

- The **type-check ratchet** (`89/89` per MUSE) — I did not find or run the ratchet script this session. **UNKNOWN, not confirmed.**
- The **Random123 known-answer vectors** in `kernel.test.ts` — covered by the checker's first line ("ok") but I did not read them.
- I did not regenerate the vectors *in the repo* (I did it in the extracted copy), so I changed nothing.

# Recommendation (a filing, not a fix)

1. **Record the reference platform** in `tools/mathlab/README.md`: node version and OS that generated `keyedrng-vectors.json`. Without it, every future seat either sees a false red or cannot tell a real regression from a libm difference.
2. **Make the guard tolerant on `normal()` only** — exact for every integer/bit vector (philox, hash, gamekey, draw, ints, pick, fork), tolerance `<= 1 ulp` for the 120 normal draws — and keep the exact comparison available behind a flag. That preserves the guard's purpose (catch an engine change) while removing the false red.
3. **Re-run the checker under the same node that generated the file** when quoting 108/120 vs 106/120; both numbers are true, on different libms.

**Weakest point of this review:** I did not establish *why* my libm differs (node 26 vs the generator's node, or macOS vs Linux) — only that it does. A seat who knows the generating platform can settle it in one command: regenerate the vectors there and diff.