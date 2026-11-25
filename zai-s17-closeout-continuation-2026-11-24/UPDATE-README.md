# UPDATE-README.md — the 2026-11-24 sitting's zip (the review-consolidation pass)

## 4 · Changelog
- **2026-11-24:** the five consolidated s17-review findings closed at the delivered bytes —
  boot docs regenerated (ZAI.md / START §2 / README top block; the 2026-11-22 blocks HISTORICAL);
  the side-by-side capture contract fixed IN CODE (non-vacuity markers, LEFT s1–s3 re-driven
  through w89's own draft-setup UI, orphan renamed `new-only-…`; measured 41 captures / matrix
  COMPLETE / 0 fallbacks / 0 verdict fails); claims machine-checkable (`claims.json` +
  `scripts/check-claims.mjs`, composite step 17c — packaging phase 20 OK / 0 RED at these bytes);
  SHELL-STATUS freshness content-based (batteries emit `distHash`; the bare clock-age STALE flag
  is gone); the 2026-11-22 zip/SHA256SUMS claim RETRACTED in the hand-over; the lineage note
  `README-S17-PACKAGE-NOTE.md` filed; the R-13/Vite-8 migration receipt plan FILED (no dependency
  change). Measured: engine 430/430, node battery 37/37, contrast 2/0, seal 374 entries green +
  converse clean. WIP: the acceptance composite hit the sitting's time budget mid-gauntlet
  (steps 1–16 EXIT_CODE=0; 13b in flight — receipt is honestly partial, meta layer). **The next
  session relaunches `bash scripts/acceptance-run.sh`, then Phase C per ZAI.md.**

## Contents
- `zai-s17-closeout-2026-11-23/` — the corrected artifact of record (lineage: the S15 close-out
  continuation; the s17 folder name is the Owner's drop label — see README-S17-PACKAGE-NOTE.md).
- `_agents/zai/{ZAI.md,START-OF-CHAT-ZAI.md,END-OF-CHAT-ZAI.md}` — the workflow trio (the START
  copy carries the 2026-11-24 §2; the muse-maintained copy on `council/muse` should take this §2
  at the Owner's relay).
- `CHECKSUMS.txt` — md5sum format over every file in this zip (never lists itself); verified by
  `unzip -t` AND an extracted `md5sum -c` roundtrip before shipping.
- The zip's own sha256 rides BESIDE it as `SHA256SUMS-2026-11-24.txt` in the download area.
