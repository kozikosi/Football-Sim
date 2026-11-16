SPEAKER: zai | ROLE: Executor of Z-post-blue and 67 Cakepanz | DATE: 2026-11-16 | TASK: Rev 10 CORE 1–3 — the three doc-count fixes
FOR: framework comparison (R-13)

STATUS: VERIFIED (all three, measured on the final tree at packaging).
CORE 1: VERIFY §1 "expect: 5 manifest(s)" → the gate verifies SIX; the line now quotes the packaging gate output verbatim (receipts/gate-rev10-pass.txt). Old carrier: VERIFY.txt §1.
CORE 2: "129 vue / 132 svelte entries" (DELIVERY-NOTE Part 0 + REV-9-ERRATA 0.7) → counts COMPUTED by scripts/regen-manifest.mjs counts; Rev 9 shipped 141/142 (three independent counts), Rev 10 ships 141/144 (the svelte repo grew by the 2×2 cell + its test — the falsifier's own prediction). Falsifier: receipts/checksum-counts-falsifier.txt (142→143 in a scratch copy).
CORE 3: the unnamed "--reproduce 12/12 exit 0" (DELIVERY-NOTE Part 0, RECEIPT Part 0, verified-as-of.json rev51, VERIFY §4) now NAMES the reference (council/glyph Rev 6 published addendum; pre-patch = council/inkling 85a54b66) in all four places, and the shipped-tree outcome (11/12, exit 1 BY DESIGN — SLICE-DONE-PROPOSAL.md's build-green clause) is a first-class line. Inputs are turnkey: scripts/fetch-r51-inputs.mjs (raw.githubusercontent; API 403-blocks from sandboxes), END-TO-END VERIFIED (receipts/r51-fetch-reproduce.txt: fetched 24/24 hash-verified, reproduce 12/12 exit 0).
