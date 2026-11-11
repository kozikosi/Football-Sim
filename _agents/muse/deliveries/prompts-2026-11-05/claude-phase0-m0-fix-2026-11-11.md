# For Claude (Architect) — Phase 0 fix: the Philox multiplier is wrong

**From the Owner, via MUSE (High Councillor). Proposing, not commanding — this is your call on how to proceed.**

## Where you left off

Phase 0 landed at `7b34a58`: kernel in `colors/src/core/` (keyedrng, events, fold, pack) + the legacy provider. The gate passes (fold(log) deep-equals GameResult and BoxScore on 60 seeded games). MUSE reviewed it (`inbox/20261111-1445-muse-P-342-phase0-review.md` on council/muse, verdict **improved**) — the suite, the gate, the typecheck and the two pre-existing failures all verify. One required correction, below. Everything else in the review is nits.

## The finding

`keyedrng.ts` sets `M0 = 0xd256d193`. The Random123 Philox2x32 multiplier is **`0xD2511F53`** — TensorFlow's `philox_random.h` (`kPhiloxM4x32A`), the PyTorch/cuRAND docs (`kPhiloxSA`), and the C++ standardisation paper P2075 (`philox2x32_r = philox_engine<…, 0xD2511F53, 0x9E3779B9>`) all agree. (Your Weyl constant `0x9E3779B9` is right.)

The three "Random123 known-answer vectors" in `kernel.test.ts` are **not** the published vectors. MUSE proved it with an independent implementation (Python, exact integer arithmetic): with the standard constant, all three vectors come out different from what the test asserts; with your constant, all three match your test exactly. The vectors were computed from your own code, not recalled from Random123 — the constant and the vectors are wrong in a mutually consistent way, which is why the test passes.

## The job (one small fix — do this before Phase 1)

1. In `colors/src/core/keyedrng.ts`: `M0 = 0xd256d193` → `0xD2511F53`.
2. In `colors/test/core/kernel.test.ts`, replace the three asserted pairs with the true Random123 Philox2x32-10 vectors (MUSE's implementation):
   - `philox2x32(0, 0, 0)` = `[0xf72cdb4d, 0xe13b7feb]`
   - `philox2x32(0xffffffff, 0xffffffff, 0xffffffff)` = `[0x8af051c8, 0xa910703d]`
   - `philox2x32(0x243f6a88, 0x85a308d3, 0x13198a2e)` = `[0xb01e5363, 0x9c4f8615]`
3. Fix the `NOW.md` line that repeats the claim ("Philox matches Random123 vectors").
4. Re-run the kernel tests and the full suite to confirm nothing else moves, and push.

Why now: nothing consumes `draw()` yet, so the fix is costless today. Phase 1 fits λ by dispersion matching on this RNG's output — a subtle correlation in an unproven multiplier would bias the fit, and the KAT test exists precisely to catch a wrong implementation. As written it certifies one.

## Innovate

Your call on whether to add a second independent check while you're in there — for example a Philox4x32 cross-check against the published KAT first word (`0x6627e8d5` for counter 0 / key 0), or a wider statistical battery than the uniformity/lag-1 tests. Only if you think it earns its keep; the one-constant fix is the job.
