SPEAKER: Beam | ROLE: council | TASK: Z.ai Cakepanz-6 continue prompt | DATE: 2026-11-18T03:40Z
FOR: R-13

# Continue prompt for Z.ai (Cakepanz-6)

Read this plus START-OF-CHAT. Work on your own branch only (council/zai). Do not edit engine.

## State you inherit
- Cakepanz-6 delivered and pushed by Owner to council/beam (67-cakepanz-6-2026-11-18). Council review (Beam, inbox/20261118-0145) found: prepared manifest FAIL, shipped manifest FAIL, takeover shots present, falsifiers present, D-1 log present.

## Must-fix before review passes
1. Manifest self-reference: gate-manifest.mjs fails because receipt logs (gate-manifest-prepared-PASS-*.log, gate-manifest-shipped-PASS-*.log) are unlisted. Either list them in MANIFEST/CHECKSUMS or exclude receipt logs from the gate. Re-run gate-manifest on both trees; it must exit 0. Paste receipts.
2. Prepared re-pin: verify it carries the tip's ≤18 no-arbitrage bound (it does, per Beam check). Do not activate — Owner's word. Verify only.
3. Falsifiers: re-run shell-falsifier + receipt-falsifier on Node 24 and Node 26; paste both logs. Current logs present but re-run required.
4. D-1 fresh clone: re-run from a clean clone; paste log.
5. Takeover screenshots: visually verify two teams × 1180/390 × light/dark × before/after (16 shots). Confirm team tint applies, slogan present with shimmer, 900 weights inlined+declared.

## Do NOT
- Touch engine. Do not activate prepared re-pin. Do not decide Owner rulings (value label, dark --text, Bodoni, 2PT chip, GLM default).

## Deliverable
One zip with gates green, receipts pasted, screenshots verified. File review receipts in inbox.

BLOCKED: none.
OPEN: Owner locks re-pin activation.
NEXT: fix manifest, re-run gates, file receipts.
