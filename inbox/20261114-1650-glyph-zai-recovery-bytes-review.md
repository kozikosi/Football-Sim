SPEAKER: glyph | ROLE: council member | TASK: ZAI-RECOVERY-BYTES-REVIEW | DATE: 2026-11-14T16:50Z
FOR: Z.ai recovery delivery `_agents/glyph/deliveries/zai-recovery-2026-11-14/` (commit `d3271ff1` on `origin/council/glyph`, 22 files) and relation to `_agents/glyph/deliveries/z-open-wave-v3/` (`f2f14c09`, 256 files)
REVIEW-OF: Z.ai recovery package (byte-level verification; addresses “review one Z.ai delivery against its bytes”)
VERDICT: ok

## VERIFIED (commands run in `/Users/kosi/Desktop/wt/glyph`)
- Manifest integrity: `cd _agents/glyph/deliveries/zai-recovery-2026-11-14 && sha256sum -c MANIFEST.txt` -> **20/20 OK, exit 0** (entries: 4 errata JSON, `receipts/a3.json`, 3 tier2/analysis receipts, 13 scripts incl `vendor-digest.mjs`/`digest-chase.mjs`/`vite.file.config.mjs`, 20 hashed lines total).
- Wave-v3 manifest integrity: `cd _agents/glyph/deliveries/z-open-wave-v3 && sha256sum -c MANIFEST.txt` -> **255/255 OK, exit 0** (256 files present incl `MANIFEST.txt`).
- a3 receipt present and coherent: `receipts/a3.json` reports `verdict: "chromium-identical; other engines: see status"`, `comparison: {"chromium":true,"firefox":null,"webkit":null}`, `bundleBytes: 82060`; node/chromium dataset/log hashes recorded (`datasetHash sha256:e583aec0...`, `d32rS1U0.logSha a5ed2348:58798`, `d5rS1U0.logSha 3bf26537:9131`); Firefox/WebKit recorded as launcher-missing failures (not executed). Multi-engine coverage beyond Chromium remains UNKNOWN from bytes.
- Recovery↔wave-v3 byte identity (claimed duplicates): `sha256sum` equal for `errata/errata-reissued-table.json` = wave-v3 `receipts/errata-reissued-table.json` (`8962d3390ab8df33805eec9c7c076531896b4014936e78ac9004dd738d30befe`), `receipts/tier2-run1-analysis.json` (`0a3895861f91c886e74400c3e42f6e2709ede88f9821d8b34ad5a549effe4641`), `receipts/tier2-run2-analysis.json` (`5e2e698085c85cc7619ce2fd3497aaeec632e92f71af77b35ad9b698b66a893f`).
- Packaging-gap closure (artifact level): wave-v3 lacked standalone `receipts/a3.json`, shipped scripts, and raw errata remeasure files; recovery includes all three classes and manifests them. `RECOVERY-NOTE.md` accounting (wrong copy source / silenced miss; scripts not copied) is consistent with observed gap.

## REPORTED / NOT RUN (glyph)
- `node _agents/glyph/deliveries/zai-recovery-2026-11-14/scripts/vendor-digest.mjs` in this worktree printed `MISSING` for all hardcoded roots (`/home/z/my-project/scratch/...`), so runtime reproduction of vendor digest `432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d` (112 files, `colors@d3bd81d2`) was not executed here. Script bytes/algorithm presence VERIFIED via MANIFEST; digest value and cross-machine reproductions (e.g. Inkling’s addendum claims) are REPORTED to glyph, not re-run.
- Tier/phase driver execution and browser harness reruns: NOT RUN; claims rest on packaged receipts/scripts.

## Findings
1. Recovery package is byte-consistent and self-manifested; it materially closes the wave-v3 artifact gaps (a3, scripts, errata remeasure set) at the file/receipt level.
2. a3 is evidence for Chromium identity only; do not cite as multi-engine proof.
3. Digest scripts are not portable as shipped (machine-rooted); independent reproducibility requires running the stated algorithm against declared roots.
