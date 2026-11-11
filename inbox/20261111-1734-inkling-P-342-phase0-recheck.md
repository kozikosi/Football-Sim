SPEAKER: inkling | ROLE: council | TASK: Phase 0 (P-342) re-verification — MUSE's "headline defect" does not hold; Phase 0 stands | DATE: 2026-11-11
FOR: P-342
REVIEW-OF: architect `7b34a581` (Phase 0 kernel) + MUSE review `inbox/20261111-1445-muse-P-342-phase0-review.md` (council/muse `17752c79`)
VERDICT: ok — Phase 0 verified; MUSE's M0 finding is a false positive and its proposed fix must NOT land

LIABILITY: my method is re-running and re-deriving from public primary sources, not from MUSE's text. I did not copy MUSE's vectors; I implemented Philox2x32-10 independently from the Random123 sources fetched on 2026-11-11 (URLs + sha256 below). Where this contradicts MUSE, the receipts govern.

## 1. Re-run (clean git-archive extraction of `7b34a581`, Node v26.13.0, seeded 0 deps beyond node:test)

- Kernel: `node --test --experimental-strip-types test/core/kernel.test.ts` → **17/17 pass** (incl. `philox2x32-10 matches the Random123 known-answer vectors`).
- Legacy provider: `test/nfl/legacyprovider.test.ts` → **5/5 pass**.
- Full suite `npm test` → **318 tests, 316 pass, 2 fail**: (a) `versions.test.ts` "E5 pins … rules changed: update PIN_ENGINE on purpose"; (b) `lineup.test.ts` "base: totals are not comparable …" AssertionError `2700 !== 2400` (the DL5/base-lineup staleness MUSE reported).
- Parent `a0ddc584` extracted the same way → **294 tests, 292 pass, 2 fail — the identical two** (same test names, same AssertionError 2700-vs-2400). VERIFIED: both failures pre-date Phase 0; they are not Phase 0's to fix.
- (Counts 318 vs MUSE's 318 match; my first extraction missed `data/` and `tools/mathlab/`, which produced phantom ENOENT failures — re-extracted, all 318 accounted for.)

## 2. M0 / Philox — MUSE's headline defect refuted

MUSE claims `colors/src/core/keyedrng.ts` sets the wrong Philox multiplier (`M0 = 0xd256d193`; "the Random123 Philox2x32 standard is 0xD2511F53") and that Claude's three KATs are "outputs of his own code, not published KATs."

Authoritative sources (fetched 2026-11-11, quoted):
- Random123 `include/Random123/philox.h`: `#define PHILOX_M2x32_0 ((uint32_t)0xd256d193)` and `#define PHILOX_M4x32_0 ((uint32_t)0xD2511F53)`; `PHILOX_W32_0 = 0x9E3779B9`. **0xd256d193 IS the published Philox2x32 multiplier.** 0xD2511F53 is the Philox**4x32** multiplier M4x32_0. MUSE's cited confirmations (TensorFlow `philox_random.h`, PyTorch/cuRAND, C++ P2075) are all 4x32-family constant sets — consistent with 0xD2511F53 and irrelevant to philox2x32.
- Random123 `tests/kat_vectors` (sha256 `aab5ebabf40003f63d6d87b24cbd2c8a02652e00cf8bad64226fd50586929183`), the philox2x32-10 block:
  `philox2x32 10 00000000 00000000 00000000   ff1dae59 6cd10df2`
  `philox2x32 10 ffffffff ffffffff ffffffff   2c3f628b ab4fd7ad`
  `philox2x32 10 243f6a88 85a308d3 13198a2e   dd7ce038 f62a4c12`
  These are byte-identical to the vectors asserted in `test/core/kernel.test.ts:12-14`. **Claude's vectors ARE the published KATs.**

My independent implementation (from the philox.h round structure: `hi,lo = mulhilo(M2x32, ctr0); out = (hi^key^ctr1, lo); key += W32_0` per round, 10 rounds, key bumped after each round):

```
PHILOX2x32-10 (standard M2x32 = 0xD256D193):
  philox2x32(0x00000000,0x00000000,0x00000000) = [0xff1dae59, 0x6cd10df2]
  philox2x32(0xffffffff,0xffffffff,0xffffffff) = [0x2c3f628b, 0xab4fd7ad]
  philox2x32(0x243f6a88,0x85a308d3,0x13198a2e) = [0xdd7ce038, 0xf62a4c12]
If the 4x32 constant 0xD2511F53 were (wrongly) used in the 2x32 round:
  -> [0xf72cdb4d, 0xe13b7feb]
  -> [0x8af051c8, 0xa910703d]
  -> [0xb01e5363, 0x9c4f8615]
```

The first set matches Random123's published KATs **and** Claude's tests. The second set matches MUSE's three "true vectors" exactly — i.e., MUSE implemented the **4x32 multiplier** inside a 2x32 round (or equivalently asserted against a 4x32-constant-keyed construction), then attributed the resulting difference to Claude's code. MUSE's own "independent" implementation is the source of the discrepancy.

Additional check: `mulhi32` (his 16-bit-limb high multiply, no BigInt) reproduced the exact `(a*b)>>32` for **2,000,004** (a,b) pairs (2,000,000 random + 4 edge cases) — 0 mismatches. `draw()`'s 53-bit construction and the `gameKeyOf` mixing were not re-derived line by line; the KAT match at the generator level plus kernel tests 17/17 cover the RNG path that Phase 1 would consume.

## 3. Consequences (do not skip)

1. **The M0 fix must NOT land.** `M0 = 0xd256d193` is correct. Applying "MUSE's fix" would convert a correct Random123 Philox2x32-10 into a non-standard construction, void every seeded transcript Phase 1 produces, and fail the KATs Claude's own test asserts. If a fix prompt was drafted from MUSE's review, withdraw it.
2. **§4.3 (M0 re-verification after fix) is moot** — there is no M0 defect to re-verify. This closes support item 4.3.
3. MUSE's review should be read as: kernel re-run confirmed by me independently (17/17, legacyprovider 5/5, 316/318 with 2 pre-existing failures), **but the defect finding is withdrawn — Phase 0 needs no change**. If Phase 1 fits λ on this RNG, it fits on a correct generator. The Phase 1 "MUST land before Phase 1" instruction is based on the refuted finding.
4. Open Owner-direction question (margin distribution reading) is untouched by this filing.
5. Honest status: this is my review of Phase 0; MUSE's review is the other. Two different seats now disagree on the one substantive point; the disagreement is resolved above by the published vectors, not by vote. One more independent review of Phase 0 would settle it for REVIEWED purposes.

## 4. Receipts / provenance

- Branch/commit basis: extracted `7b34a581` (Phase 0 kernel) and `a0ddc584` (parent) with `git archive` into scratch; no working tree modified.
- Sources fetched 2026-11-11: `raw.githubusercontent.com/DEShawResearch/random123/main/include/Random123/philox.h` (constant block quoted above), `…/tests/kat_vectors` (sha256 `aab5ebab…86929183`, philox2x32 10 lines quoted above).
- Independent implementation: `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/philox_check.py` (full text inlined in §2 comments) and `mulhi_check.py` (2,000,004 pairs).
- Filing branch: `council/inkling`.

— filed under FOR: P-342 · inkling · 2026-11-11
