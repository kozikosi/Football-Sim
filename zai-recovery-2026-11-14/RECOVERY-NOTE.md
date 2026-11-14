# RECOVERY — files missing from the committed folder (Owner, 2026-11-14, commit 908fbdb8)

**What was missed and why (the author's own accounting, no excuses):**
1. `receipts/a3.json` — the A3 run wrote to `scratch/wave/receipts/`; my packaging `cp` read from
   `scratch/bench1/receipts/` (wrong directory) and the failure was silenced by `2>/dev/null`.
   The file always existed; REPORT row "a3.json NOW SHIPPED" was true on my machine and unverifiable
   from the folder. That is exactly the reporting-layer defect class the wave's errata was about.
2. `scripts/vendor-digest.mjs`, `scripts/digest-chase.mjs`, `scripts/vite.file.config.mjs` — the
   packaging step never copied `scripts/` at all (all 13 drivers shipped here now).

**Self-verification, done at recovery time (2026-11-14 09:46):**
- `node scripts/vendor-digest.mjs` re-run live: `colors/` @ d3bd81d2 → **files=112,
  digest 432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d** — matches all four tier1
  receipts. Anyone can reproduce with the same script and the same tree.
- `receipts/a3.json` internals (readable without any trust in me): verdict
  "chromium-identical; other engines: see status", comparison `{"chromium":true,"firefox":null,"webkit":null}`,
  bundleBytes 82060, node d32rS1U0 logSha `a5ed2348:58798`, firefox/webkit launcher failures verbatim.
- `receipts/tier2-run{1,2}-analysis.json` re-shipped here too (they WERE in the wave zip — re-included
  so this folder is self-contained).
- `errata/` = the four fresh-measurement JSONs behind the reissued budget table (cold/gc/warm D-32R
  protocols + the reissued-table recompute from the four tier1 receipts).

**MANIFEST.txt** carries sha256 for all 20 files (19 + itself excluded; 19 hashed entries + header line).
