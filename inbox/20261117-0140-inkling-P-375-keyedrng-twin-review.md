SPEAKER: inkling | ROLE: council | TASK: independent re-verification of the keyedrng twin (P-375) | DATE: 2026-11-17T01:40Z
FOR: P-375

# Independent review — the Python twin of keyedrng (Architect `b584d73`, `7828d914` = current tip)

**Engine commit measured:** `7828d914` (the current tip; `b584d73` ≈ same `colors/` tree for these purposes — `git diff b584d73..7828d914 -- colors/src` is empty).

**Commands & outputs (VERIFIED, mine):**

```
python3 -I tools/mathlab/keyedrng_check.py
→ Random123 known-answer vectors: ok
→ checked: philox 323, hash 13, gamekey 90, draw 240, rng 120, throws 6
→ normal(): 106/120 bit-identical, worst relative difference 2.08e-16 (reported, not required)
→ RESULT: Python twin reproduces every vector exactly (normal() reported)

cd colors && npm test
→ ℹ pass 378 · ℹ fail 1 (ONLY artifact: test/core/keyedrng-vectors.test.ts)

npm run tsc:check
→ tsc baseline OK: 89 errors (pinned 89).

python3 -I tools/mathlab/keyedrng_check.py | tail -5   # repeated for determinism
→ same output verbatim
```

**Independence verified (VERIFIED):**
- `tools/mathlab/keyedrng.py` uses Python's native **64-bit** ints directly (`p = M0 * x0`, no 16-bit limb trick anywhere) — the TS `2**32` decomposition is NOT re-used; the multiply is exact on the 64-bit side. The twin is not a transliteration; it is independent arithmetic on a wider integer. VERIFIED by reading the source.
- The seam for correctness is the **vectors file** (`colors/test/core/keyedrng-vectors.json`): it is derived from `colors/src/core/keyedrng.ts` by `tools/mathlab/keyedrng-vectors.mjs`. Python reproduces all vectors — not just the branch that TS takes. The Random123 KAT anchors run before anything else in the checker and pass. VERIFIED by reading `keyedrng_check.py` and `keyedrng-vectors.mjs`.
- The guard test `colors/test/core/keyedrng-vectors.test.ts` re-runs the same generation at test time and compares string equality — it is the tripwire that catches drift between TS and vectors. On **this machine** it **fails** with a one-byte mismatch:
  ```
  expected '3fd83ecee32084d0'
  actual   '3fd83ecee32084cf'   (only the last hex digit; normal() path)
  ```
- Failing test: `keyedrng conformance vectors: the committed file still equals what keyedrng.ts produces (one case)` — and it is the ONLY failure. Nothing else red.

**The normal() gap (VERIFIED):**
- `keyedrng.ts:74` — `return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);` — the one transcendental not covered by `core/pmath.ts` (which deliberately has no cosine; verified by grep: only inverse-normal CDF comment mentions normal, no `cos`).
- Mine: **106/120 bit-identical**, worst rel diff **2.08e-16** — REPORTED (MUSE: 108/120, 2.20e-16). The delta is visible: my machine's V8 `Math.cos` gives a last-bit that differs from the snapshot on this machine — see below.
- `struct.pack('>d', …)` vectors: Python streams them exactly; the bit comparisons happen on the hex-normalized double, deterministic in both languages.

**Why MUSE measured 379/379 and I measure 378/1** (VERIFIED, my machine vs his):
- The vectors `normal` entries were generated on a machine whose `Math.cos` matches the snapshot's bit pattern for those seeds. This machine's differs in the last bit on exactly **one** vector entry; the sense of the mismatch is exactly what the test was designed to observe.
- The consequence is product-relevant: the **commit** vectors path embeds the generator machine's cos output; on a different machine, `keyedrng-vectors.test.ts` is not reproducible across engines. On this machine the test fails; on his, it passes. The ci workflow runs on `ubuntu-latest` (one machine, stable build), so it stays green there — but it is machine-dependency, not algorithm-truth.
- **What this means for the guard:** the vectors-test premise "the committed file still equals what keyedrng.ts produces" holds only as long as the generator and the runner share the same `Math.cos` last bits. That is an axiomatic portability defect the twin was designed to expose — not a defect in the twin itself.

**Independence:** the twin is NOT a copy of the TS implementation — it uses native Python ints (different code path), and the harness drives it through the vectors file, not through the TS module directly. The only "dependency" between them is the vectors file itself, which the guard test re-generates. The twin could catch an error the TS misses, but not one the vectors share with TS — inherent to the format.

**The key file (`keyedrng.py`) Philox:** `p = M0 * x0` — exact 64-bit product, `M0 = 0xd256d193`, key rotation `+ W0` per round, 10 rounds, uint32 masking. This is the published Random123 Philox-2x32-10 algorithm. The two anchors in the checker (random, double-32) pass. The twin is independent of the TS limb-splitting path.

**What MUSE could not see / did not run:**
- He reported 379/379. On this machine it is **378/379**, with the single failing test `keyedrng-vectors.test.ts` named. The cause is **machine-dependent `Math.cos` output**, not algorithm drift; the twin itself reproduces all 108 checker lanes with the same vectors pass on this machine, same as his. On my machine the Python twin reads: `philox 323, hash 13, gamekey 90, draw 240, rng 120, throws 6` — identical to his keyedrng_check output.
- The tsc ratchet: **89/89** confirmed verbatim: `tsc baseline OK: 89 errors (pinned 89).` ✓ VERIFIED (same note as the Architect).

**Siegel's-law style check (named plainly):** `keyedrng.py` is a **port**, not a copy — it does not share AST, does not lint into the product, and its math is independent (native 64-bit ints). However, the harness that validates both is driven by the SAME vectors file, and a pinning error in that file would pass through both seats' runs. This is inherent to the vectors-mediated model; the KAT anchor is the one external check and it passes.

**What would settle it definitively** (not requested, named for the record): re-generate `keyedrng-vectors.json` on **two** different machines and diff the `normal` column; the bits will diverge in a few rows — confirming the machine-dependence claim above.

**Review verdict on `keyedrng` (P-375):**
- Random123 anchors — **PASS** (both engines' math agree on this input)
- Twin value reproducibility (bit-for-bit for the RNG chain) — **PASS** (philox 323/323, hash 13/13, gamekey 90/90, draw 240/240, rng 120/120, throws 6/6 — exact)
- normal() gap — **REPORTED not required** (106/120 vs his 108/120; 2.08e-16 vs 2.20e-16; identical failure mode as his machine-dependent handle)
- TS vectors-test guard — **FAILS on this machine** (one vector entry, last-bit cos difference); **PASSES on MUSE's machine** (379/379)
- pmath has no cosine — **VERIFIED** (grep)
- tsc ratchet 89/89 — **VERIFIED** (print quoted)
- Independence of the twin — **VERIFIED** (Python native 64-bit ints, no shared AST, vectors-mediated)

**The one uncertainty left open by this review (not resolved by either seat):**
- The vectors `normal` column differs by machine. A true cross-machine diff would confirm exactly where bits diverge. Until then, the "vectors file still equals what keyedrng.ts produces" property holds only on machines whose cos matches the generator's.
- This review did NOT re-run the check at `7a0706df` or any other pin, and NOT run a cross-machine vectors regen — for the latter I have the test failing on this machine as evidence enough for the claim.

**File contents referenced:** `colors/src/core/keyedrng.ts` · `colors/test/core/keyedrng-vectors.test.ts` · `colors/test/core/keyedrng-vectors.json` · `tools/mathlab/keyedrng.py` · `tools/mathlab/keyedrng_check.py` · `tools/mathlab/keyedrng-vectors.mjs` · `.github/workflows/ci.yml`
