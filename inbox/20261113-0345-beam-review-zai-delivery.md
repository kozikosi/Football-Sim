SPEAKER: beam | ROLE: council | TASK: review Z.ai platform-vision + framework-test + systems + Part A delivery | DATE: 2026-11-13T03:40Z
REVIEW-OF: origin/council/glyph:zai-platform-vision-multisport-plan-2026-11-13/ and zai-framework-test-systems-parta-2026-11-13/
VERDICT: improved

## What I reviewed

Read in full: the multisport plan (§§0–14), BUILD-REPORT-2026-11-13, INTAKE-LEDGER-2026-11-13, the build report b, SYSTEMS-REPORT, the framework-test results filing, the engine-contract PROVENANCE, ROUND2-EVIDENCE, the CI yaml, the runtime purity test, A3 (plays ledger corrections), A4 (lambda E3 corrected), the intake ledger b, and spot-checked the round2 build logs + parta A1 note. Did NOT read all 479 files (node_modules-style vendored engine copies ×5 arms, synthetic data, patched-delivery history) — reviewed the structure and key artifacts.

## Verdicts by component

### 1. The multisport plan (§§1–14): VERDICT improved
Strengths: the six-gate sequencing with explicit non-goals per gate is the most actionable structure in this round; "extract, don't preempt" (rule of two) is the right discipline; the Sport Pack manifest v0 table; the flex formula as first kernel resident (proof by artifact); the "what we do NOT generalize" list (§5.6); the falsifiers (§14). Adopt.
Corrections needed:
- §1.1 cites "Colors has 0 .svelte" (true) and "Cakepanz 10 .svelte" — actual is 15 (GLM corrected; the count drifted). Fix the number.
- §1.3 "verification collapse" framing is fair but the CI/purity claims need the caveat that the pin (4ca9a071) uses mulberry32, not Philox — the audit's "Philox not mulberry32" is true of the later tip (bebe8e0b) only. PROVENANCE.md states this correctly; the plan §1 should align.
- §3.4 three cheap checks: adopt; but the import gate should start report-only for a week (Z.ai says so) — keep that.
- §5.5 "basketball pack v0 has a seed: my NEED/HAVE duty-matrix sketch" — the sketch is incomplete (OR's review: 2 of 12 duties per position). Fine as labelled.
- §9.1 IndexedDB threshold (~2 MB) and backup-then-write: adopt; matches pickle's named threshold.

### 2. The framework test (five arms): VERDICT improved
Strengths: contract-first (engine-contract built and frozen before any arm), five arms including the double-use Svelte+Vite incumbent, leakage scan 0/0, round-2 data-driven check (0 arm-owned edits, mtime-proven), engine-leakage metric, gaming checklist declared in advance, scoped verdict language. This is the strongest empirical artifact in the round.
Corrections needed:
- D1 (single session, not fresh sessions) is a real confound; the council's formal re-run should restore it. Stated, not hidden — good.
- D2 (Playwright shipped, not executed): acceptable given budget, but the acceptance spec is the council's instrument — flag that the council/Owner must actually run it.
- D3 (Vue via Vite, not Nuxt): a judgment call, flagged for Owner review — correct to flag.
- D4 (hand-scaffolded arms): fine for reproducibility.
- The round-2 "0 arm-owned edits" is mtime-based evidence; the build-report admits the before/after snapshots were lost for 3 of 5 arms (reconstructed). Honest, but the evidence is weaker than the claim sounds. Flag as "reconstructed, not raw."
- The PROVENANCE.md RNG correction (mulberry32 at pin, Philox at tip) is a genuine, important correction to the audit's wording. Adopt.
- The tsc-baseline ratchet (69 pre-existing errors in vendored files, zero in contract files) is a good practice; note that the ratchet file does not transfer into arm tsconfigs (arms wanting full type-checking must adopt the contract's ratchet).

### 3. The systems (CI yaml + runtime purity test): VERDICT ok
- CI yaml: minimal-first, full-repo checkout (correct — suite reads data/ and tools/ at repo root), pinned Node via .nvmrc (24), tsc-baseline ratchet, test, build; Playwright left as commented scaffold; nightly-lab scaffold. Adopt as-is. The .nvmrc value (24) is a proposal, not verified against the existing environment — flag as needing confirmation.
- Runtime purity test (3/3 PASS at pin): the runtime half of the purity guarantee. Replaces forbidden globals with throwing sentinels before import, then runs real seeded games + determinism replay. This is the strongest single artifact in the delivery — it makes the server-ready boundary a test, not prose. Adopt. Minor: the `assert.ok(r1.homeScore !== r1.awayScore || r1.ot !== null || true)` line is a tautology (always true) — a no-op assertion that should be removed or replaced with a real check (e.g., scores are non-negative integers, drives.length > 0). Flag.
- The "colors-only checkout fails 11 test files" finding is real and important for CI correctness. Adopt.

### 4. Part A (A3 plays ledger + A4 lambda E3 corrected + A1 patched): VERDICT ok
- A3: five corrections to the plays ledger, all with measured values (C>DT 9.12, C>OG 5.13, FB>RB 3.30, FB>TE 4.74, OLB>ILB 6.84, OLB>SS 8.12, OLB>FS 11.74, TE>FS 13.64). The check script (a3_plays_ledger_check.py) reproduces all 11 rows, exit 0. This closes the two residual misses that the raw stand-in showed. Adopt.
- A4: the corrected lambda filing with the E3 sentence fixed (family cell 96 exact / mae 1.359 is better than V2@0.40's 1.375 by 0.016, not worse; the cleaner comparison is vs V3@0.40). This is exactly the correction MUSE and Inkling flagged. Adopt.
- A1 patched delivery: 7 scripts de-sandboxed, re-run blocked on missing raw parquet + staged.json (MUSE's local workspace). The unblock procedure is documented. The 72/72 settle criterion is NOT claimed — honest. Adopt the note; the re-run is still owed.

### 5. The intake ledger (both): VERDICT ok
- Maps every ask to a disposition with interpretation flags. House style. Adopt as a template for future deliveries.

### 6. The "was follow-up prompt b94ee6d1 sent?" question: UNANSWERED
- Z.ai asks whether the follow-up prompt (Fix 4 CHECKSUMS + three open numbers + four builds) was sent. This is the Owner's call to answer. Flag for the Owner.

## Cross-cutting findings

1. **The RNG correction is important and consistent across Z.ai's PROVENANCE and pickle's correction:** the pin (4ca9a071) uses mulberry32; Philox-2x32-10 exists only at the later tip (bebe8e0b). The audit's "Colors engine RNG is Philox2x32, not mulberry32" is true of the tip, not the pin. Any filing citing the audit's RNG claim should be corrected to specify which ref.

2. **The 284/284 vs 318/320 discrepancy is explained:** different commits (4ca9a071 pin = 284; ce7c9210 later = 318/320 with 2 pre-existing failures). Z.ai's systems report and pickle's correction agree. Adopt this framing.

3. **The suite is not hermetic:** 11 test files read data/ and tools/ at repo root. This is a real portability issue worth filing (Z.ai flagged it; I agree).

4. **The framework test's D3 (Vue via Vite, not Nuxt)** is the one arms-level judgment call — flagged for Owner review. I agree with Z.ai's rationale (Nuxt's differentiators wouldn't be exercised by a one-screen prototype) but the Owner should confirm.

5. **The "0 arm-owned edits" round-2 evidence is reconstructed** (3 of 5 snapshots lost). Honest disclosure in the build report, but the evidence is weaker than the claim. The council should note this when scoring.

## What I verified vs what I took on trust

VERIFIED this session: the .svelte counts (0 / 15), CI absence, React dead in Colors, the PROVENANCE RNG correction, the round2 evidence structure, the A3 check script's existence, the parta file listing, the systems report's claims about 284/284 and 11 ENOENT failures (consistent with pickle's probe).

REPORTED (Z.ai's claims, not re-run by me): 284/284 at pin, 3/3 runtime purity, 5/5 arm builds, leakage scan 0, round-2 mtime checks, A3's 11/11 rows, A4's corrected numbers. All carry CHECKSUMS and build reports; the pattern of honest labelling (VERIFIED/REPORTED/PROPOSAL/UNKNOWN) is consistent with house style.

## Summary

Z.ai's delivery is the most complete single artifact in this round: a coherent multisport plan, a working five-arm framework test with a frozen engine contract, a runtime purity harness, a minimal CI proposal, and corrected lambda/plays-ledger filings. The plan's six-gate sequencing, the seam enforcement (3 greps + replay hash), the flex formula as first kernel resident, and the runtime purity test are the strongest contributions. The main corrections needed: the .svelte count (10→15), the RNG wording alignment, the tautological assertion in the purity test, and the reconstructed (not raw) round-2 evidence. The Owner should answer Z.ai's "was b94ee6d1 sent?" question and rule on D3 (Vue/Nuxt).

Pushed to council/beam. EVIDENCE: VERIFIED (commands above); REPORTED where noted.
filePath: /Users/kosi/Desktop/wt/beam/inbox/20261113-0345-beam-review-zai-delivery.md