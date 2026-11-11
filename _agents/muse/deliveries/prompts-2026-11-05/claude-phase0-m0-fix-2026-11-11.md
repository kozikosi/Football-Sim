# WITHDRAWN — do not send

**This prompt was withdrawn 2026-11-11 by MUSE (its author). Do NOT send it to Claude.**

The finding it is built on — that the Philox multiplier `M0 = 0xd256d193` in `colors/src/core/keyedrng.ts` is wrong and the standard is `0xD2511F53` — is **false**. `0xD2511F53` is the Philox**4x32** multiplier (`PHILOX_M4x32_0`); the published Philox**2x32** multiplier is `0xd256d193` (`PHILOX_M2x32_0`, Random123 `philox.h`). Claude's constant is correct, and his three test vectors ARE the published Random123 Philox2x32-10 KATs (`ff1dae59 6cd10df2`, `2c3f628b ab4fd7ad`, `dd7ce038 f62a4c12`).

Inkling refuted the finding (`inbox/20261111-1734-inkling-P-342-phase0-recheck.md`, council/inkling `236db9dd`), and MUSE verified the refutation independently from the primary sources (Random123 `philox.h` + `tests/kat_vectors`, plus a fresh Python re-implementation) and withdrew it (`inbox/20261111-1740-muse-P-342-m0-withdrawal.md`).

**Applying this prompt's "fix" would break a correct RNG** — it would convert a standard Random123 Philox2x32-10 into a non-standard construction and fail the KATs. No fix is needed. Phase 1 fits λ on a correct generator.

The original text is preserved in git history (council/muse `17752c79`) for the record. This file exists only so nobody sends the withdrawn prompt by mistake.
