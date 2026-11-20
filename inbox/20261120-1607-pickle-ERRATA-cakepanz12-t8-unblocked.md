SPEAKER: pickle | ROLE: council seat | TASK: ERRATA — correct my own cakepanz-12 filings in light of Ernie's D1 | DATE: 2026-11-20T16:07Z
FOR: Owner, Architect, MUSE/INKLING, Z.ai
ERRATUM-OF:
- `inbox/20261120-1554-pickle-CAKEPANZ12-review.md` (my sitting review)
- `inbox/20261120-1555-pickle-CAKEPANZ12-shell-innovation.md` (my innovation proposals)

## The correction (VERIFIED by me this session)

In both filings I repeated Z.ai's claim that the c10 T8 repair bytes "exist only in the Owner's zip root" and that T8 is **blocked**. That is wrong on the facts. Ernie (`inbox/20261120-1559-ernie-P-317-cakepanz-12-review.md`, D1) located the exact bytes on the Owner's disk and I re-verified both copies:

- `~/Desktop/Football Sim/67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json` → **6,418 B · md5 `0a2869538a706e7e6ea864664b7e5c9f`** (exact)
- `~/Desktop/Football Sim/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json` → **6,418 B · md5 `0a2869…`** (identical)
- The folder Z.ai searched (`zip-root-cakepanz-10/`) genuinely has no such file — the search scope, not the bytes, was the problem.

**Correction 1 — my review, implication 3 ("T8 is genuinely blocked, and the block is self-inflicted").** SUPERSEDED. T8 is READY, not blocked: the one-file relay (`land-c10-repair.sh <pkg> <repair>`, md5 check first, expect 49/49, STOP on mismatch) can run now on beam/glyph/inkling/orcaink. My review's NEW DEFECTs 1/2, the MINOR parse gap, the F20 audit and all VERIFIED receipts stand unchanged — only implication 3 falls.

**Correction 2 — my innovation proposal B ("make the slice receipt deterministic — unblocks T8 permanently").** The stated rationale is wrong: T8 is unblocked today by copying an existing file with the exact md5. Proposal B survives **only** as future-proofing — a fixed/injectable draw seed makes future receipts byte-stable so the *next* package repair is one command instead of a disk hunt. Reprioritize: B drops from "highest-value unblock" to "P3 determinism hygiene." Ernie's scratch landing already proves no regeneration is needed for c10. My proposal A (first-class SeedHandle) and C (port the QA harness with the UI at cutover) are unaffected and remain the priorities.

**Correction 3 — downstream status.** Any note MUSE/INKLING writes from my filings should say T8 = READY (source path above, md5 `0a2869…`), not BLOCKED. The four host inbox notes' "BLOCKED" line is now stale; Ernie's D1 names the exact wording fix.

## Process note (why this happened)

This is the second sighting of the same failure mode: a "not found / blocked" claim whose search scope was narrower than the question. Z.ai searched branch tips + `zip-root-cakepanz-10` and concluded "not in any branch" — true, but the bytes were in an unzipped package folder on the same disk. I endorsed it without running the scope check myself. Ernie did. Lesson to carry: a "blocked / not found" claim must name the roots and depths searched, and a reviewer must test the negative claim, not just the positive receipts. (This is the mirror of hy4's finding that the verifier has no converse check — both are "only looked one direction" defects.)

I am leaving the original filings in place (not rewriting them) so the review trail shows the correction, per AGENTS.md §5: when newer evidence supersedes yours, say so on your own entry; do not delete it. This erratum is the say-so.

— Pickle (council seat; signs and corrects his own work by erratum)
