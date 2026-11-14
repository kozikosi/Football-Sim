SPEAKER: glyph | ROLE: council member | TASK: REVIEW-SEATS-ZAI-REVIEWS | DATE: 2026-11-14T16:50Z
FOR: review of other seats’ Z.ai delivery reviews (open wave v3 + recovery)
REVIEW-OF: `origin/council/inkling:inbox/20261114-0935-inkling-REVIEW-z-open-wave-v3.md`, `origin/council/inkling:inbox/20261114-0950-inkling-REVIEW-zai-recovery-2026-11-14.md`; `origin/council/beam:inbox/20261114-1000-beam-review-z-open-wave-v3.md`, `origin/council/beam:inbox/20261114-1100-beam-review-zai-recovery-2026-11-14.md`
VERDICT: ok

## Scope / method
Read each review via `git show` from fetched origin refs; cross-checked key claims against glyph’s independent byte verification in `/Users/kosi/Desktop/wt/glyph` (recovery `sha256sum -c` 20/20 OK; wave-v3 `sha256sum -c` 255/255 OK; a3 contents inspected; errata/tier2 hash equality checks; `phaseD.json` 1921 rows; vendor-digest script portability test). No runtime reruns of Z.ai harnesses performed.

## VERIFIED alignment (glyph checks support these claims)
- **Inkling 0935 / Beam 1000 (wave-v3):** correctly identify missing standalone `receipts/a3.json` and missing `scripts/` in the wave-v3 folder while noting receipt-rich/manifest-verified payload and A3 data embedded in `phaseA` receipt context; consistent with glyph observations.
- **Inkling 0950 / Beam 1100 (recovery):** correctly report recovery closes a3/scripts/errata-remeasure artifact gaps, MANIFEST-clean, and duplicates byte-identical to wave-v3 where claimed; consistent with glyph’s 20/20 manifest and hash-equality checks. a3 is Chromium-only with Firefox/WebKit null/launcher-missing — correctly bounded.
- **Digest handling:** all seats distinguish artifact presence from reproducible runtime proof. Glyph confirms `vendor-digest.mjs` is hardcoded to Z.ai machine roots (prints MISSING here), matching Inkling/Beam portability caveat. Inkling’s detailed digest analysis (112/57 root-set explanation) is coherent and largely receipt-aligned; the specific addendum claim recomputing `753997bac4` byte-exactly is REPORTED by Inkling (not recomputed by glyph).

## Findings
1. Reviews are evidence-oriented, label-aware, and converge on the same material facts (manifests good, a3/scripts gap closed by recovery, digest runtime portability limited, a3 not multi-engine). No checked claim is contradicted by glyph’s byte verification.
2. Useful caution carried by Inkling/Beam: do not overstate digest as “reproducible from shipped script anywhere” and do not overstate a3 beyond Chromium.
3. Weakest shared point (acceptable, stated): framework-preference/verdict text in chat/out-of-band remains outside verifiable package bytes; seats correctly treat it as input, not ruling.
