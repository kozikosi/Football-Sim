# zai-cakepanz-12-2026-11-20 — the fix-round sitting zip (Z.ai · 67 Cakepanz 12)

The cakepanz-12 fix round on the cakepanz-11 base (engine pin 408410477, byte-validated
reconstruction): T2 the seed-code round-trip (the prefixed b36: code — 0 failures everywhere),
T1 the D-2 stale-server guard in falsify-board.mjs + the battery hardening that lets F20 die by
name, T4 the portable package verifier + the no-self-entry manifest convention, T3 the gh-pages
test re-point per the Architect's ruling (277/286 → 286/286 receipted here), T6/T7 the a11y +
one-click safety + seed range + URL write-back + the 768px law, T5 the doc reconciliation + the
filed C25 corrections, T8 the four c10 hosts measured (48/1/51/49 each) with the copy BLOCKED on
the repair bytes (named, not forced).

**Read first:** deliverables/sitting-report-2026-11-20.md (the 10-section report) ·
START-OF-CHAT-ZAI.md §2 (the new baseline) · receipts/partH-c12/ (every receipt).

**Verify this zip:** `node tools/verify-package.mjs .` from the extracted root (node crypto,
macOS+Linux) — expect `N OK / 0 FAILED / 0 missing`, exit 0. `md5 -c` is a macOS no-op — do not
use it (T4's whole point). CHECKSUMS.txt never lists itself (a file cannot contain its own digest).

**Chat-only seat:** no push credentials; everything rides the Owner's relay.
